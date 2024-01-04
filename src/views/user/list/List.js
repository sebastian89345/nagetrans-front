import React,{ useState,useEffect } from 'react'

//Hoja de estilo
import './List.css';

//Componentes
import DefaultTable from '../../../components/Table/defaultTable/DefaultTable';

//Views
import Create from '../create/Create';
import Update from '../update/Update';

// Redux
import { useSelector , useDispatch } from "react-redux";

//Reducers
import { getUserAllService , deleteUserService  } from "../../../store/action/userAction";

//Alertas 
import Swal from 'sweetalert2';

function List() {
  const [view, setView] = useState({list:true,create:false,update:false});
  const [infoUpdate, setInfoUpdate] = useState({});
  const dataList = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();

  //Aqui hago la consulta a la base de datos y la agrego el payload al redux
  useEffect(() => {
    dispatch(getUserAllService());
  }, [dispatch])

  //Esto es para actulizar la lista en el create y update y nada mas
  const getAll = () => {
    dispatch(getUserAllService());
  }

  const handleCreate = () => {
    setView({list:false,create:true})
  }

  const deleteInfo = (id) => {
     Swal.fire({
      title: "¿ Estas seguro de eliminarlo ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        alertDelete(id);
      }
    });
  }

  const alertDelete = async (id) => {
    let response = await dispatch(deleteUserService(id));
    if(response.error === undefined){
      switch (response.response.status) {
        case 200:
            //Aquí actulizo la informacion
            dispatch(getUserAllService());
            Swal.fire({
              title: "Eliminado!",
              text: "Fue eliminado con exito",
              icon: "success"
            });
          break;
        default:
            console.log(response.response);
            Swal.fire({
              title: "Error!",
              text: "Ocurrio un error al eliminarlo",
              icon: "error"
            });
          break;
      }
    } else {
      console.log(response.error);
      Swal.fire({
        title: "Error!",
        text: "Ocurrio un error al eliminarlo",
        icon: "error"
      });
    }
  }

  const updateInfo = (id,item) => {
    setInfoUpdate({id:id,item:item})
    setView({list:false,update:true})
  }

  return (
    <div className='list-type-main'>
      { view.list === true ?
        <>
          <div className='list-type-main-button'>
            <button onClick={handleCreate} type="button" className="list-type-button-title btn btn-primary">Crear</button>
          </div> 
          <DefaultTable data={dataList.data} nms={"user"} deleteId={deleteInfo} updateId={updateInfo} />
        </>
        : view.create === true ?
          <Create setView={setView} getAll={getAll} />
        : view.update === true ?
          <Update infoUpdate={infoUpdate} setView={setView} getAll={getAll} />
        : <></>
      }
    </div>
  )
}

export default List