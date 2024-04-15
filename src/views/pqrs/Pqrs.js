import React,{ useEffect, useState } from 'react'

//hoja de estilos
import './pqrs.css';

//Componentes reutilizables
import NavbarLogin from "../../components/Navbar/NavbarLogin/NavbarLogin";

//Alertas 
import Swal from 'sweetalert2';

//Actions
import { postSendEmail } from "../../store/action/sendEmailAction";

function Pqrs() {

  const [inputDni, setInputDni] = useState("");
  const [opcionPetition, setOpcionPetition] = useState([]);
  const [opcionTypeDni, setOpcionTypeDni] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputSurName, setInputSurName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputDescriptionApplication, setInputDescriptionApplication] = useState("");

  const [opcionSelectPetition, setOpcionSelectPetition] = useState('');
  const [opcionSelectTypeDni, setOpcionSelectTypeDni] = useState('');

  const [errorDni, setErrorDni] = useState('');
  const [errorTypeDni, setErrorTypeDni] = useState('');
  const [errorPetition, setErrorPetition] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorSurName, setErrorSurName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorDescriptionApplication, setErrorDescriptionApplication] = useState('');

  //information for select
  useEffect(() => {
    setOpcionPetition([{value:"Queja"},{value:"Reclamo"},{value:"Sugerencia"},{value:"Felicitación"}])
    setOpcionTypeDni([{value:"Cédula de Ciudadanía"},{value:"Cédula de extranjeria"},{value:"Tarjeta de identidad"}])
  }, [])

  const handleChangeDni = (e) => {
    // valida que solo se escriban numeros
    const esValido = e.target.validity.valid;
    if (esValido) {
      setInputDni(e.target.value);
    }
  } 

  const handleChangePhoneNumber = (e) => {
    // valida que solo se escriban numeros
    const esValido = e.target.validity.valid;
    if (esValido) {
      setInputPhoneNumber(e.target.value);
    }
  }

  const validateField = (value, fieldName, regex, minLength, customErrorMessage) => {
    if (value.trim() === '') {
      return `El campo ${fieldName} no puede estar en blanco.`;
    }

    if (regex && !regex.test(value)) {
      return customErrorMessage || `El campo ${fieldName} no cumple con el formato esperado.`;
    }

    if (value.length < minLength) {
      return `El campo ${fieldName} debe tener al menos ${minLength} caracteres.`;
    }

    return null; // Indica que la validación fue exitosa
  };

  const validate = () => {
    let isValid = true;

    const petitionError = validateField(opcionSelectPetition, 'peticion', /\S/, 1);
    if (petitionError) {
      setErrorPetition(petitionError);
      isValid = false;
    } else {
      setErrorPetition("");
    }

    const typeODniError = validateField(opcionSelectTypeDni, 'tipo de cedula', /\S/, 1);
    if (typeODniError) {
      setErrorTypeDni(typeODniError);
      isValid = false;
    } else {
      setErrorTypeDni("");
    }

    const dniError = validateField(inputDni, 'cedula', /^[0-9]+$/, 4);
    if (dniError) {
      setErrorDni(dniError);
      isValid = false;
    } else {
      setErrorDni("");
    }

    const nameError = validateField(inputName, 'Nombres', /^[a-zA-ZñÑ0-9\s]+$/, 4);
    if (nameError) {
      setErrorName(nameError);
      isValid = false;
    } else {
      setErrorName("");
    }

    const surNameError = validateField(inputSurName, 'apellidos', /^[a-zA-ZñÑ0-9\s]+$/, 4);
    if (surNameError) {
      setErrorSurName(surNameError);
      isValid = false;
    } else {
      setErrorSurName("");
    }

    const phoneNumberError = validateField(inputPhoneNumber, 'telefono', /^[0-9]+$/, 4);
    if (phoneNumberError) {
      setErrorPhoneNumber(phoneNumberError);
      isValid = false;
    } else {
      setErrorPhoneNumber("");
    }

    const emailError = validateField(inputEmail, 'correo', /^.+$/, 4);
    if (emailError) {
      setErrorEmail(emailError);
      isValid = false;
    } else {
      setErrorEmail("");
    }

    const descriptionApplicationError = validateField(inputDescriptionApplication, 'descipcion de la solicitud', /^.+$/, 4);
    if (descriptionApplicationError) {
      setErrorDescriptionApplication(descriptionApplicationError);
      isValid = false;
    } else {
      setErrorDescriptionApplication("");
    }

    // Puedes agregar más bloques de validaciones para otros campos si es necesario
    return isValid;
  }

  const resetInput = () => {
    setInputDni("")
    setOpcionSelectPetition("")
    setOpcionSelectTypeDni("")
    setInputName("")
    setInputSurName("")
    setInputEmail("")
    setInputPhoneNumber("")
    setInputDescriptionApplication("")
  }

  const handleClick = async () => {
    let validatePqrs = validate();
    if (validatePqrs) {
      let body = {
        interface:"pqrs",
        dni:inputDni,
        petition:opcionSelectPetition,
        name:inputName + " " + inputSurName,
        email:inputEmail,
        phoneNumber:inputPhoneNumber,
        message:inputDescriptionApplication
      }
      let result = await postSendEmail(body);
      // console.log(result);
      switch (result.status) {
        case 200:
          resetInput();
          Swal.fire({
            title: "Mensaje enviado!",
            // text: "Nos contactaermos contigo",
            icon: "success"
          });
          break;
        default:
          Swal.fire({
            title: "No se pudo enviar el mensaje",
            // text: "El mensaje se envío con exito",
            icon: "error"
          });
          break;
      }
    }
  }

  return (
    <>
      <NavbarLogin />
      <div className='pt-5 pb-5 container'>
        <div className="pqrs-container-form-two">
          <div className="pqrs-container-card-two"> 
            <div className='pqrs-main'>
              <div className='mt-4 pqrs-container-input'>
                <label htmlFor="exampleInputEmail1">Petición:</label>
                <select value={opcionSelectPetition} onChange={(e) => setOpcionSelectPetition(e.target.value)} className='pqrs-input form-control'>
                  <option value="">Selecciona una Opción</option>
                  {opcionPetition.map((opcion, index) => (
                    <option key={index} value={opcion.value}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4'>
                {errorPetition && <p style={{ color: 'red' }}>{errorPetition}</p>}
              </div>

              <div className='mt-4 pqrs-container-input'>
                <label htmlFor="exampleInputEmail1">Tipo de cédula:</label>
                <select value={opcionSelectTypeDni} onChange={(e) => setOpcionSelectTypeDni(e.target.value)} className='pqrs-input form-control'>
                  <option value="">Selecciona una Opción</option>
                  {opcionTypeDni.map((opcion, index) => (
                    <option key={index} value={opcion.value}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 pqrs-container-input'>
                {errorTypeDni && <p style={{ color: 'red' }}>{errorTypeDni}</p>}
              </div>

              <div className='mt-4 pqrs-container-input'>
                <label htmlFor="exampleInputEmail1">Cédula:</label>
                <input value={inputDni} onChange={handleChangeDni} pattern="[0-9]{0,13}" type="text" className="pqrs-input form-control" placeholder="Cedula" />
              </div>

              <div className='mt-4 pqrs-container-input'>
                {errorDni && <p style={{ color: 'red' }}>{errorDni}</p>}
              </div>

              <div className='mt-4 pqrs-container-input'>
                <label htmlFor="exampleInputEmail1">Nombres:</label>
                <input value={inputName} onChange={(e) => setInputName(e.target.value)} type="text" className="pqrs-input form-control" placeholder="Nombres" />
              </div>

              <div className='mt-4 pqrs-container-input'>
                {errorName && <p style={{ color: 'red' }}>{errorName}</p>}
              </div>

              <div className='mt-4 pqrs-container-input'>
                <label htmlFor="exampleInputEmail1">Apellidos:</label>
                <input value={inputSurName} onChange={(e) => setInputSurName(e.target.value)} type="text" className="pqrs-input form-control" placeholder="Apellidos" />
              </div>

              <div className='mt-4 pqrs-container-input'>
                {errorSurName && <p style={{ color: 'red' }}>{errorSurName}</p>}
              </div>

              <div className='mt-4 pqrs-container-input'>
                <label htmlFor="exampleInputEmail1">Telefono:</label>
                <input value={inputPhoneNumber} onChange={handleChangePhoneNumber} pattern="[0-9]{0,13}" type="text" className="pqrs-input form-control" placeholder="Telefono" />
              </div>

              <div className='mt-4 pqrs-container-input'>
                {errorPhoneNumber && <p style={{ color: 'red' }}>{errorPhoneNumber}</p>}
              </div>

              <div className='mt-4 pqrs-container-input'>
                <label htmlFor="exampleInputEmail1">Correo:</label>
                <input value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} type="text" className="pqrs-input form-control" placeholder="Correo" />
              </div>

              <div className='mt-4 pqrs-container-input'>
                {errorEmail && <p style={{ color: 'red' }}>{errorEmail}</p>}
              </div>

              <div className='mt-4 pqrs-container-input'>
                <label htmlFor="exampleInputEmail1">Descripción de la solicitud:</label>
                <textarea value={inputDescriptionApplication} onChange={(e) => setInputDescriptionApplication(e.target.value)} type="text" className="pqrs-input form-control" placeholder="Escriba su solicitud" />
              </div>

              <div className='mt-4 pqrs-container-input'>
                {errorDescriptionApplication && <p style={{ color: 'red' }}>{errorDescriptionApplication}</p>}
              </div>

              <div className='mt-4 text-center'>
                <button onClick={handleClick} type="button" className="user-create-button btn btn-primary">Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pqrs