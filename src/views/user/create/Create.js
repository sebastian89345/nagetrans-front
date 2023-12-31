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

function Create({ setView,getAll }) {

  const [inputUser, setInputUser] = useState("");
  const [inputDni, setInputDni] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputSurname, setInputSurname] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputVin, setInputVin] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState('');
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
  const dataListRole = useSelector((store) => store.roleService);
  const dataListStatus = useSelector((store) => store.statusService);
  const dataListBrand = useSelector((store) => store.brandService);
  const dataListModel = useSelector((store) => store.modelService);
  const dataListType = useSelector((store) => store.typeService);
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
    setInputUser("")
    setInputDni("")
    setInputName("")
    setInputSurname("")
    setInputPhone("")
    setInputEmail("")
    setInputPassword("")
    setInputVin("")
    setOpcionSelectStatus("")
    setOpcionSelectBrand("")
    setOpcionSelectModel("")
    setOpcionSelectType("")
    setOpcionSelectShow("")
  }

  const handleChangeRole = (e) => {
    resetInput();
    setOpcionSelectRole(e.target.value);
  }

  // const create = () => {
  //   console.log(opcionSelectRole);
  //   console.log(opcionSelectStatus);
  //   console.log(opcionSelectBrand);
  //   console.log(opcionSelectModel);
  //   console.log(opcionSelectType);
  //   console.log(opcionSelectShow);
  // }

  const validateInput = () => {
    let message = true;
    // Validaciones
    if (inputName.trim() === '') {
      setError('El campo no puede estar en blanco.');
      message = false;
      return message
    } else if (inputName.includes(' ')) {
      setError('El campo no puede contener espacios en blanco.');
      message = false;
      return message 
    } else if (inputName.length < 4) {
      setError(`El campo debe tener al menos ${4} caracteres.`);
      message = false;
      return message
    } else {
      setError('');
      message = true;
      return message
    }
  }

  const create = async () => {
    //Aqui estoy validando que el input cumpla con las validaciones
    let validate = validateInput();
    if(validate === true) {
      //Aquí comienza las peticiones y demas
      let body = { name:inputName }
      let response = await dispatch(createUserService(body));
      if(response.error === undefined){
        switch (response.response.status) {
          case 201:
              //Aquí estoy limpiando el input
              setInputName("")
              Swal.fire({
                title: "Creado!",
                text: "Fue creado con exito",
                icon: "success"
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
  }

  return (
    <div className='user-create-card-main'>
        <div className='user-create-card card'>
            <div className='card-body'>
              <div>
                <img onClick={returnWindow} src={arrow} className='user-create-img' alt='img' />
              </div>
              <div className=' text-center'>
                <p className='user-create-title'>Crear un nuevo usuario</p>
              </div>

              <div className='mt-4 user-create-main-input'>
                <input value={inputUser} onChange={(e) => setInputUser(e.target.value)} type="text" className="user-create-input form-control" placeholder="Usuario" />
              </div>

              { opcionSelectRole === "Administrador" || opcionSelectRole === "Conductor" ? 
                <>
                  <div className='mt-4 user-create-main-input'>
                      <input value={inputDni} onChange={(e) => setInputDni(e.target.value)} type="text" className="user-create-input form-control" placeholder="Cedula" />
                  </div>

                  <div className='mt-4 user-create-main-input'>
                    <input value={inputName} onChange={(e) => setInputName(e.target.value)} type="text" className="user-create-input form-control" placeholder="Nombres" />
                  </div>

                  <div className='mt-4 user-create-main-input'>
                    <input value={inputSurname} onChange={(e) => setInputSurname(e.target.value)} type="text" className="user-create-input form-control" placeholder="Apellidos" />
                  </div>

                  <div className='mt-4 user-create-main-input'>
                    <input value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} type="text" className="user-create-input form-control" placeholder="Telefono" />
                  </div>
                </> 
                : opcionSelectRole === "Vehiculo" || opcionSelectRole === "Asociado" ? 
                <>
                  <div className='mt-4 user-create-main-input'>
                      <input value={inputVin} onChange={(e) => setInputVin(e.target.value)} type="text" className="user-create-input form-control" placeholder="Vin" />
                  </div>

                  <div className='mt-4 user-create-main-input form-group'>
                    <select value={opcionSelectBrand} onChange={(e) => setOpcionSelectBrand(e.target.value)} className='user-create-input form-control'>
                      <option value="">Selecciona una opción - marca</option>
                      {opcionBrand.map((opcion, index) => (
                        <option key={index} value={opcion.name}>
                          {opcion.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='mt-4 user-create-main-input form-group'>
                    <select value={opcionSelectModel} onChange={(e) => setOpcionSelectModel(e.target.value)} className='user-create-input form-control'>
                      <option value="">Selecciona una opción - modelo</option>
                      {opcionModel.map((opcion, index) => (
                        <option key={index} value={opcion.name}>
                          {opcion.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='mt-4 user-create-main-input form-group'>
                    <select value={opcionSelectType} onChange={(e) => setOpcionSelectType(e.target.value)} className='user-create-input form-control'>
                      <option value="">Selecciona una opción - tipo</option>
                      {opcionType.map((opcion, index) => (
                        <option key={index} value={opcion.name}>
                          {opcion.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </> 
                : <></>
              }

              <div className='mt-4 user-create-main-input'>
                <input value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} type="email" className="user-create-input form-control" placeholder="Correo" />
              </div>

              <div className='mt-4 user-create-main-input form-group'>
                <select value={opcionSelectRole} onChange={handleChangeRole} className='user-create-input form-control'>
                  <option value="">Selecciona una opción - rol</option>
                  {opcionRole.map((opcion, index) => (
                    <option key={index} value={opcion.name}>
                      {opcion.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 user-create-main-input form-group'>
                <select value={opcionSelectStatus} onChange={(e) => setOpcionSelectStatus(e.target.value)} className='user-create-input form-control'>
                  <option value="">Selecciona una opción - estado</option>
                  {opcionStatus.map((opcion, index) => (
                    <option key={index} value={opcion.name}>
                      {opcion.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 user-create-main-input form-group'>
                <select value={opcionSelectShow} onChange={(e) => setOpcionSelectShow(e.target.value)} className='user-create-input form-control'>
                  <option value="">Selecciona una opción - mostrar</option>
                  {opcionShow.map((opcion, index) => (
                    <option key={index} value={opcion.value}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 user-create-main-input'>
                <input value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} type="text" className="user-create-input form-control" placeholder="Contraseña" />
              </div>
              
              <div className='mt-4'>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>

              <div className='mt-4 text-center'>
                <button onClick={create} type="button" className="user-create-button btn btn-primary">Guardar</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Create