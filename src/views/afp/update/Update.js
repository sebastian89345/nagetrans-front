import React,{ useState } from 'react'

//Hoja de estilos
import './Update.css';

// Redux
import {  useDispatch } from "react-redux";

//Reducers
import { updateAfpService } from "../../../store/action/afpAction";

//Alertas 
import Swal from 'sweetalert2';

//Imagenes
import arrow from '../../../assets/img/bx-chevron-left.svg'

function Update({ infoUpdate,setView,getAll }) {

  const [inputName, setInputName] = useState(infoUpdate.item.name);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const returnWindow = () => {
    setView({list:true});
    getAll();
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

  const edit = async () => {
    //Aqui estoy validando que el input cumpla con las validaciones
    let validate = validateInput();
    if(validate === true) { 
        //Aquí comienza las peticiones y demas
        let body = { id:infoUpdate.id, name:inputName }
        let response = await dispatch(updateAfpService(body));
        if(response.error === undefined){
          switch (response.response.status) {
            case 200:
                Swal.fire({
                  title: "Editado!",
                  text: "Fue editado con exito",
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
            text: "Eror al editarlo",
            icon: "error"
          });
        }
    }
  }

  return (
    <div className='afp-update-card-main'>
        <div className='afp-update-card card'>
            <div className='card-body'>
              <div>
                <img onClick={returnWindow} src={arrow} className='afp-update-img' alt='img' />
              </div>
              <div className=' text-center'>
                <p className='afp-update-title'>Editar AFP</p>
              </div>
              <div className='mt-4'>
                <input value={inputName} onChange={(e) => setInputName(e.target.value)} type="text" className="afp-update-input form-control" placeholder="Nombre de la afp" />
              </div>
              <div className='mt-4'>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
              <div className='mt-4 text-center'>
                <button onClick={edit} type="button" className="afp-update-button btn btn-primary">Guardar</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Update