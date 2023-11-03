import React, { useState,useEffect } from 'react'

//Hoja de estilos
import './Create.css';

// Redux
import { useSelector , useDispatch } from "react-redux";

//Reducers
import { createRoleService } from "../../../store/action/roleAction";

function Create() {

  const [inputName, setInputName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    


  }, [dispatch])
  
  const handleOnchange = (e) => {
    // console.log(e);
    setInputName(e.target.value);
  }

  const createRole = async () => {
    let body = {
      name:inputName
    }
    dispatch(createRoleService(body));
  }

  return (
    <div>
        <div className='card'>
            <div className='card-body'>
              <div className=' text-center'>
                <p className='role-create-title'>Crear un nuevo rol</p>
              </div>
              <div className='mt-4'>
                <input value={inputName} onChange={handleOnchange} type="text" className="role-create-input form-control" placeholder="Nombre del rol" />
              </div>
              <div className='mt-4 text-center'>
                <button onClick={createRole} type="button" className="role-create-button btn btn-primary">Guardar</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Create