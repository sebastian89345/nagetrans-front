import React, { useState } from 'react'

//Hoja de estilos
import './Create.css';

// Redux
import {  useDispatch } from "react-redux";

//Reducers
import { createRoleService } from "../../../store/action/roleAction";

//Alertas 
import Swal from 'sweetalert2';

//Imagenes
import arrow from '../../../assets/img/bx-chevron-left.svg';

function Create({ setView,getAll }) {

  const [inputName, setInputName] = useState("");
  const [error, setError] = useState('');
  const dispatch = useDispatch();

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
      let response = await dispatch(createRoleService(body));
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
    <div className='role-create-card-main'>
        <div className='role-create-card card'>
            <div className='card-body'>
              <div>
                <img onClick={returnWindow} src={arrow} className='role-create-img' alt='img' />
              </div>
              <div className=' text-center'>
                <p className='role-create-title'>Crear un nuevo rol</p>
              </div>
              <div className='mt-4'>
                <input value={inputName} onChange={(e) => setInputName(e.target.value)} type="text" className="role-create-input form-control" placeholder="Nombre del rol" />
              </div>
              <div className='mt-4'>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
              <div className='mt-4 text-center'>
                <button onClick={create} type="button" className="role-create-button btn btn-primary">Guardar</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Create