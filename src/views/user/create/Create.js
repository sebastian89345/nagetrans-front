import React, { useState,useEffect } from 'react'

//Hoja de estilos
import './Create.css';

// Redux
import {  useSelector , useDispatch } from "react-redux";

//Reducers
import { createUserService } from "../../../store/action/userAction";
import { getRoleAllService } from "../../../store/action/roleAction";
import { getStatusAllService } from "../../../store/action/statusAction";

//Alertas 
import Swal from 'sweetalert2';

//Imagenes
import arrow from '../../../assets/img/bx-chevron-left.svg';

function Create({ setView,getAll }) {

  const [inputName, setInputName] = useState("");
  const [error, setError] = useState('');
  const [opcionRole, setOpcionRole] = useState([]);
  const [opcionStatus, setOpcionStatus] = useState([]);
  const [opcionSelectRole, setOpcionSelectRole] = useState('');
  const [opcionSelectStatus, setOpcionSelectStatus] = useState('');
  const dataListRole = useSelector((store) => store.roleService);
  const dataListStatus = useSelector((store) => store.statusService);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoleAllService())
    dispatch(getStatusAllService())
  }, [dispatch])

  useEffect(() => {
    setOpcionRole(dataListRole.data);
    setOpcionStatus(dataListStatus.data);
  }, [dataListRole,dataListStatus])
  
  const returnWindow = () => {
    getAll();
    setView({list:true})
  }

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

  // Manejar cambios en la selección
  const handleChangeRole = (event) => {
    if (event.target.value === "") {
      console.log("Seleccione algo");
    } else {
      setOpcionSelectRole(event.target.value);
      console.log(event.target.value);
    }
  };

  // Manejar cambios en la selección
  const handleChangeStatus = (event) => {
    if (event.target.value === "") {
      console.log("Seleccione algo");
    } else {
      setOpcionSelectStatus(event.target.value);
      console.log(event.target.value);
    }
  };

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
              <div className='mt-4'>
                <input value={inputName} onChange={(e) => setInputName(e.target.value)} type="text" className="user-create-input form-control" placeholder="Nombre del usuario" />
              </div>

              <select value={opcionSelectRole} onChange={handleChangeRole}>
                <option value="">Selecciona una opción</option>
                {opcionRole.map((opcion, index) => (
                  <option key={index} value={opcion._id}>
                    {opcion.name}
                  </option>
                ))}
              </select>

              <select value={opcionSelectStatus} onChange={handleChangeStatus}>
                <option value="">Selecciona una opción</option>
                {opcionStatus.map((opcion, index) => (
                  <option key={index} value={opcion._id}>
                    {opcion.name}
                  </option>
                ))}
              </select>
              
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