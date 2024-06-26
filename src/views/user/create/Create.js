import React, { useState,useEffect } from 'react'

//Hoja de estilos
import './Create.css';

// Redux
import {  useSelector , useDispatch } from "react-redux";

//Reducers
import { createUserService } from "../../../store/action/userAction";
import { getRoleAllService } from "../../../store/action/roleAction";
import { getStatusAllService } from "../../../store/action/statusAction";
import { getBrandAllService } from "../../../store/action/brandAction";
import { getModelAllService } from "../../../store/action/modelAction";
import { getTypeAllService } from "../../../store/action/typeAction";

//Alertas 
import Swal from 'sweetalert2';

//Imagenes
import arrow from '../../../assets/img/bx-chevron-left.svg';

//id de los roles
import roleService from '../../../libs/helpers/role.json';

function Create({ setView,getAll }) {

  const { adminstrador,conductor,vehiculo,asociado } = roleService;
  const [inputUser, setInputUser] = useState("");
  const [inputDni, setInputDni] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputSurname, setInputSurname] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputPlaca, setInputPlaca] = useState("");
  const [inputInternalNumber, setInputInternalNumber] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorUser, setErrorUser] = useState('');
  const [errorDni, setErrorDni] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorSurname, setErrorSurname] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorPlaca, setErrorPlaca] = useState('');
  const [errorInternalNumber, setErrorInternalNumber] = useState('');
  const [errorRole, setErrorRole] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [errorBrand, setErrorBrand] = useState('');
  const [errorModel, setErrorModel] = useState('');
  const [errorType, setErrorType] = useState('');
  const [errorShow, setErrorShow] = useState('');
  const [opcionRole, setOpcionRole] = useState([]);
  const [opcionStatus, setOpcionStatus] = useState([]);
  const [opcionShow, setOpcionShow] = useState([]);
  const [opcionBrand, setOpcionBrand] = useState([]);
  const [opcionModel, setOpcionModel] = useState([]);
  const [opcionType, setOpcionType] = useState([]);
  const [opcionSelectRole, setOpcionSelectRole] = useState('');
  const [opcionSelectStatus, setOpcionSelectStatus] = useState('');
  const [opcionSelectShow, setOpcionSelectShow] = useState('');
  const [opcionSelectBrand, setOpcionSelectBrand] = useState('');
  const [opcionSelectModel, setOpcionSelectModel] = useState('');
  const [opcionSelectType, setOpcionSelectType] = useState('');
  const dataListRole = useSelector((store) => store.roleReducer);
  const dataListStatus = useSelector((store) => store.statusReducer);
  const dataListBrand = useSelector((store) => store.brandReducer);
  const dataListModel = useSelector((store) => store.modelReducer);
  const dataListType = useSelector((store) => store.typeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getRoleAllService())
      dispatch(getStatusAllService())
      dispatch(getBrandAllService())
      dispatch(getModelAllService())
      dispatch(getTypeAllService())
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    setOpcionRole(dataListRole.data);
    setOpcionStatus(dataListStatus.data);
    setOpcionShow([{value:"Si"},{value:"No"}])
  }, [dataListRole,dataListStatus])

  useEffect(() => {
    setOpcionBrand(dataListBrand.data);
    setOpcionModel(dataListModel.data);
    setOpcionType(dataListType.data);
  }, [dataListBrand,dataListModel,dataListType])
  
  const returnWindow = () => {
    getAll();
    setView({list:true})
  }

  const resetInput = () => {
    //Este formatea los inputs
    setInputUser("")
    setInputDni("")
    setInputName("")
    setInputSurname("")
    setInputPhone("")
    setInputEmail("")
    setInputPassword("")
    setInputPlaca("")
    setInputInternalNumber("")

    //Este formatea los select
    setOpcionSelectStatus("")
    setOpcionSelectBrand("")
    setOpcionSelectModel("")
    setOpcionSelectType("")
    setOpcionSelectShow("")

    //Este formatea los mensajes de errores
    setErrorUser("")
    setErrorPlaca("")
    setErrorDni("")
    setErrorName("")
    setErrorSurname("")
    setErrorPhone("")
    setErrorEmail("")
    setErrorPassword("")
    setErrorRole("")
    setErrorStatus("")
    setErrorBrand("")
    setErrorModel("")
    setErrorType("")
    setErrorShow("")
    setErrorInternalNumber("")
  }

  const handleChangeRole = (e) => {
    resetInput();
    setOpcionSelectRole(e.target.value);
  }

  const handleChangeDni = (e) => {
    // valida que solo se escriban numeros
    const esValido = e.target.validity.valid;
    if (esValido) {
      setInputDni(e.target.value);
    }
  } 

  const handleChangePhone = (e) => {
    // valida que solo se escriban numeros
    const esValido = e.target.validity.valid;
    if (esValido) {
      setInputPhone(e.target.value);
    }
  } 

  const handleChangeInternalNumber = (e) => {
    // valida que solo se escriban numeros
    const esValido = e.target.validity.valid;
    if (esValido) {
      setInputInternalNumber(e.target.value);
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

  const validateVehicle = () => {
    let isValid = true;

    const userError = validateField(inputUser, 'usuario', /^.+$/, 4);
    if (userError) {
      setErrorUser(userError);
      isValid = false;
    } else {
      setErrorUser("");
    }

    const vinError = validateField(inputPlaca, 'vin', /^.+$/, 4);
    if (vinError) {
      setErrorPlaca(vinError);
      isValid = false;
    } else {
      setErrorPlaca("");
    }

    const inputInternalNumberError = validateField(inputInternalNumber, 'Numero interno', /^[0-9]+$/, 1);
    if (inputInternalNumberError) {
      setErrorInternalNumber(inputInternalNumberError);
      isValid = false;
    } else {
      setErrorInternalNumber("");
    }

    const emailError = validateField(inputEmail, 'correo', /^.+$/, 4);
    if (emailError) {
      setErrorEmail(emailError);
      isValid = false;
    } else {
      setErrorEmail("");
    }

    const brandError = validateField(opcionSelectBrand, 'marca', /\S/, 1);
    if (brandError) {
      setErrorBrand(brandError);
      isValid = false;
    } else {
      setErrorBrand("");
    }

    const modelError = validateField(opcionSelectModel, 'modelo', /\S/, 1);
    if (modelError) {
      setErrorModel(modelError);
      isValid = false;
    } else {
      setErrorModel("");
    }

    const typeError = validateField(opcionSelectType, 'tipo', /\S/, 1);
    if (typeError) {
      setErrorType(typeError);
      isValid = false;
    } else {
      setErrorType("");
    }

    const roleError = validateField(opcionSelectRole, 'rol', /\S/, 1);
    if (roleError) {
      setErrorRole(roleError);
      isValid = false;
    } else {
      setErrorRole("");
    }

    const statusError = validateField(opcionSelectStatus, 'estado', /\S/, 1);
    if (statusError) {
      setErrorStatus(statusError);
      isValid = false;
    } else {
      setErrorStatus("");
    }

    const showError = validateField(opcionSelectShow, 'mostrar', /\S/, 1);
    if (showError) {
      setErrorShow(showError);
      isValid = false;
    } else {
      setErrorShow("");
    }

    const passwordError = validateField(inputPassword, 'contraseña', /^[a-zA-Z0-9_]+$/, 4);
    if (passwordError) {
      setErrorPassword(passwordError);
      isValid = false;
    } else {
      setErrorPassword("");
    }

    // Puedes agregar más bloques de validaciones para otros campos si es necesario
    return isValid;

  }

  const validateDriver = () => {
    let isValid = true;

    const userError = validateField(inputUser, 'usuario', /^[a-zA-ZñÑ0-9\s]+$/, 4);
    if (userError) {
      setErrorUser(userError);
      isValid = false;
    } else {
      setErrorUser("");
    }

    const dniError = validateField(inputDni, 'cedula', /^[0-9]+$/, 4);
    if (dniError) {
      setErrorDni(dniError);
      isValid = false;
    } else {
      setErrorDni("");
    }

    const nameError = validateField(inputName, 'nombres', /^[a-zA-ZñÑ0-9\s]+$/, 4);
    if (nameError) {
      setErrorName(nameError);
      isValid = false;
    } else {
      setErrorName("");
    }

    const surnameError = validateField(inputSurname, 'apellidos', /^[a-zA-ZñÑ0-9\s]+$/, 4);
    if (surnameError) {
      setErrorSurname(surnameError);
      isValid = false;
    } else {
      setErrorSurname("");
    }

    const phoneError = validateField(inputPhone, 'telefono', /^[0-9]+$/, 4);
    if (phoneError) {
      setErrorPhone(phoneError);
      isValid = false;
    } else {
      setErrorPhone("");
    }

    const emailError = validateField(inputEmail, 'correo', /^.+$/, 4);
    if (emailError) {
      setErrorEmail(emailError);
      isValid = false;
    } else {
      setErrorEmail("");
    }

    const roleError = validateField(opcionSelectRole, 'role', /\S/, 1);
    if (roleError) {
      setErrorRole(roleError);
      isValid = false;
    } else {
      setErrorRole("");
    }

    const statusError = validateField(opcionSelectStatus, 'estado', /\S/, 1);
    if (statusError) {
      setErrorStatus(statusError);
      isValid = false;
    } else {
      setErrorStatus("");
    }

    const showError = validateField(opcionSelectShow, 'mostrar', /\S/, 1);
    if (showError) {
      setErrorShow(showError);
      isValid = false;
    } else {
      setErrorShow("");
    }

    const passwordError = validateField(inputPassword, 'contraseña', /^[a-zA-Z0-9_]+$/, 4);
    if (passwordError) {
      setErrorPassword(passwordError);
      isValid = false;
    } else {
      setErrorPassword("");
    }

    // Puedes agregar más bloques de validaciones para otros campos si es necesario
    return isValid;
  };

  const create = async () => {
    if (opcionSelectRole === adminstrador || opcionSelectRole === conductor ) {
      let validateDrivers = validateDriver();
      let body = { 
        user:inputUser,dni:inputDni,names:inputName,
        surnames:inputSurname,phoneNumber:inputPhone,
        email:inputEmail,role:opcionSelectRole,
        status:opcionSelectStatus,password:inputPassword,
        show:opcionSelectShow 
      }
      if (validateDrivers) {
        createUser(body);
      }

    } else if (opcionSelectRole === vehiculo || opcionSelectRole === asociado ) {
      
      let validateVehicles = validateVehicle();
      let body = { 
        user:inputUser,
        placa:inputPlaca,
        internalNumber:parseFloat(inputInternalNumber),
        email:inputEmail,
        role:opcionSelectRole,
        status:opcionSelectStatus,
        brand:opcionSelectBrand,
        model:opcionSelectModel,
        types:opcionSelectType,
        password:inputPassword,
        show:opcionSelectShow 
      }
      console.log(body);
      if (validateVehicles) {
        createUser(body);
      }

    } else if (opcionSelectRole === "") {
      const roleError = validateField(opcionSelectRole, 'role', /\S/, 1);
      if (roleError) {
        setErrorRole(roleError);
      } else {
        setErrorRole("");
      }
    }
  }

  const createUser = async (body) => {
      // Aquí comienza las peticiones y demas
      let response = await dispatch(createUserService(body));
      if(response.error === undefined){
        switch (response.response.status) {
          case 201:
              resetInput();
              setOpcionSelectRole("")
              Swal.fire({
                title: "Creado!",
                text: "Fue creado con exito",
                icon: "success"
              });
            break;
            case 400:
              console.log(response.response);
              Swal.fire({
                title: "Error!",
                text: "Este usuario ,vin o dni ya existen",
                icon: "error"
              });
            break;
          default:
              console.log(response.response);
              Swal.fire({
                title: "Error!",
                text: "Ocurrio un error al crearlo",
                icon: "error"
              });
            break;
        }
      } else {
        console.log(response.error);
        Swal.fire({
          title: "Error!",
          text: "Eror al crear el usuario",
          icon: "error"
        });
      }
  }

  return (
    <div className='user-create-card-main'>
        <div className='user-create-card card'>
            <div className='card-body'>
              <div>
                <img onClick={returnWindow} src={arrow} className='user-create-img' alt='img' />
              </div>
              <div className='text-center'>
                <p className='user-create-title'>Crear un Nuevo Usuario</p>
              </div>

              <div className='user-create-position-content-form'>
                <div className='user-create-content-form'>

                  <div className='mt-4 user-create-main-input'>
                    <label htmlFor="exampleInputEmail1">Usuario:</label>
                    <input value={inputUser} onChange={(e) => setInputUser(e.target.value)} type="text" className="user-create-input form-control" placeholder="Usuario" />
                  </div>

                  <div className='mt-4'>
                    {errorUser && <p style={{ color: 'red' }}>{errorUser}</p>}
                  </div>

                  { opcionSelectRole === adminstrador || opcionSelectRole === conductor  ? 
                    <>
                      <div className='mt-4 user-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Cédula:</label>
                        <input value={inputDni} onChange={handleChangeDni} pattern="[0-9]{0,13}" type="text" className="user-create-input form-control" placeholder="Cedula" />
                      </div>

                      <div className='mt-4'>
                        {errorDni && <p style={{ color: 'red' }}>{errorDni}</p>}
                      </div>

                      <div className='mt-4 user-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Nombres:</label>
                        <input value={inputName} onChange={(e) => setInputName(e.target.value)} type="text" className="user-create-input form-control" placeholder="Nombres" />
                      </div>

                      <div className='mt-4'>
                        {errorName && <p style={{ color: 'red' }}>{errorName}</p>}
                      </div>

                      <div className='mt-4 user-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Apellidos:</label>
                        <input value={inputSurname} onChange={(e) => setInputSurname(e.target.value)} type="text" className="user-create-input form-control" placeholder="Apellidos" />
                      </div>

                      <div className='mt-4'>
                        {errorSurname && <p style={{ color: 'red' }}>{errorSurname}</p>}
                      </div>

                      <div className='mt-4 user-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Teléfono:</label>
                        <input value={inputPhone} onChange={handleChangePhone} pattern="[0-9]{0,13}" type="text" className="user-create-input form-control" placeholder="Telefono" />
                      </div>

                      <div className='mt-4'>
                        {errorPhone && <p style={{ color: 'red' }}>{errorPhone}</p>}
                      </div>
                    </> 
                    : opcionSelectRole === vehiculo || opcionSelectRole === asociado  ? 
                    <>
                      <div className='mt-4 user-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Placa:</label>
                          <input value={inputPlaca} onChange={(e) => setInputPlaca(e.target.value)} type="text" className="user-create-input form-control" placeholder="Placa" />
                      </div>

                      <div className='mt-4'>
                        {errorPlaca && <p style={{ color: 'red' }}>{errorPlaca}</p>}
                      </div>

                      <div className='mt-4 user-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Número Interno:</label>
                          <input value={inputInternalNumber} onChange={handleChangeInternalNumber} pattern="[0-9]{0,13}" type="text" className="user-create-input form-control" placeholder="Número interno" />
                      </div>

                      <div className='mt-4'>
                        {errorInternalNumber && <p style={{ color: 'red' }}>{errorInternalNumber}</p>}
                      </div>

                      <div className='mt-4 user-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Marca del Vehículo:</label>
                        <select value={opcionSelectBrand} onChange={(e) => setOpcionSelectBrand(e.target.value)} className='user-create-input form-control'>
                          <option value="">Selecciona una Opción</option>
                          {opcionBrand.map((opcion, index) => (
                            <option key={index} value={opcion._id}>
                              {opcion.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4'>
                        {errorBrand && <p style={{ color: 'red' }}>{errorBrand}</p>}
                      </div>

                      <div className='mt-4 user-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Modelo del Vehículo:</label>
                        <select value={opcionSelectModel} onChange={(e) => setOpcionSelectModel(e.target.value)} className='user-create-input form-control'>
                          <option value="">Selecciona una Opción</option>
                          {opcionModel.map((opcion, index) => (
                            <option key={index} value={opcion._id}>
                              {opcion.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4'>
                        {errorModel && <p style={{ color: 'red' }}>{errorModel}</p>}
                      </div>

                      <div className='mt-4 user-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Tipo de Vehículo:</label>
                        <select value={opcionSelectType} onChange={(e) => setOpcionSelectType(e.target.value)} className='user-create-input form-control'>
                          <option value="">Selecciona una Opción</option>
                          {opcionType.map((opcion, index) => (
                            <option key={index} value={opcion._id}>
                              {opcion.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4'>
                        {errorType && <p style={{ color: 'red' }}>{errorType}</p>}
                      </div>

                    </> 
                    : <></>
                  }

                  <div className='mt-4 user-create-main-input'>
                    <label htmlFor="exampleInputEmail1">Correo:</label>
                    <input value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} type="text" className="user-create-input form-control" placeholder="Correo" />
                  </div>

                  <div className='mt-4'>
                    {errorEmail && <p style={{ color: 'red' }}>{errorEmail}</p>}
                  </div>

                  <div className='mt-4 user-create-main-input form-group'>
                    <label htmlFor="exampleInputEmail1">Rol del Usuario:</label>
                    <select value={opcionSelectRole} onChange={handleChangeRole} className='user-create-input form-control'>
                      <option value="">Selecciona una Opción</option>
                      {opcionRole.map((opcion, index) => (
                        <option key={index} value={opcion._id}>
                          {opcion.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='mt-4'>
                    {errorRole && <p style={{ color: 'red' }}>{errorRole}</p>}
                  </div>

                  <div className='mt-4 user-create-main-input form-group'>
                    <label htmlFor="exampleInputEmail1">Estado del Usuario:</label>
                    <select value={opcionSelectStatus} onChange={(e) => setOpcionSelectStatus(e.target.value)} className='user-create-input form-control'>
                      <option value="">Selecciona una Opción</option>
                      {opcionStatus.map((opcion, index) => (
                        <option key={index} value={opcion._id}>
                          {opcion.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='mt-4'>
                    {errorStatus && <p style={{ color: 'red' }}>{errorStatus}</p>}
                  </div>

                  <div className='mt-4 user-create-main-input form-group'>
                    <label htmlFor="exampleInputEmail1">Mostrar:</label>
                    <select value={opcionSelectShow} onChange={(e) => setOpcionSelectShow(e.target.value)} className='user-create-input form-control'>
                      <option value="">Selecciona una Opción</option>
                      {opcionShow.map((opcion, index) => (
                        <option key={index} value={opcion.value}>
                          {opcion.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='mt-4'>
                    {errorShow && <p style={{ color: 'red' }}>{errorShow}</p>}
                  </div>

                  <div className='mt-4 user-create-main-input'>
                    <label htmlFor="exampleInputEmail1">Contraseña:</label>
                    <input value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} type="password" className="user-create-input form-control" placeholder="Contraseña" />
                  </div>
                  
                  <div className='mt-4'>
                    {errorPassword && <p style={{ color: 'red' }}>{errorPassword}</p>}
                  </div>

                  <div className='mt-4 text-center'>
                    <button onClick={create} type="button" className="user-create-button btn btn-primary">Guardar</button>
                  </div>

                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Create