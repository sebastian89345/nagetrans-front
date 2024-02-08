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
import { getVehicleDocumentAllService , deleteVehicleDocumentService  } from "../../../store/action/vehicleDocumentAction";

//Alertas 
import Swal from 'sweetalert2';

//Roles existentes
import roleService from '../../../libs/helpers/role.json'

function List() {

  const { adminstrador } = roleService;
  const [view, setView] = useState({list:true,create:false,update:false});
  const [infoUpdate, setInfoUpdate] = useState({});
  const [dataListDriver, setDataListDriver] = useState([]);
  const dataList = useSelector((store) => store.vehicleDocumentReducer);
  const dataListLogin = useSelector((store) => store.loginReducer);
  const dispatch = useDispatch();

  //Aqui hago la consulta a la base de datos y la agrego el payload al redux
  useEffect(() => {
    dispatch(getVehicleDocumentAllService());
  }, [dispatch])

  useEffect(() => {
    let resultadosFiltrados = dataList.data.filter(objeto => objeto.users[0].show === "Si");
    setDataListDriver(resultadosFiltrados)
  }, [dataList])
  
  //Esto es para actulizar la lista en el create y update y nada mas
  const getAll = () => {
    dispatch(getVehicleDocumentAllService());
  }

  const handleCreate = () => {
    if (dataListLogin.data.response.data.role[0]._id === adminstrador) {
      setView({list:false,create:true})
    } else {
      Swal.fire({
        title: "Acceso denegado!",
        text: "Acceso no autorizado, para crear un nuevo documento",
        icon: "warning"
      });
    }
  }

  const deleteInfo = (id) => {
    if (dataListLogin.data.response.data.role[0]._id === adminstrador) {
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
    } else {
      Swal.fire({
        title: "Acceso denegado!",
        text: "Acceso no autorizado, para eliminar este documento",
        icon: "warning"
      });
    }
    
  }

  const alertDelete = async (id) => {
    let response = await dispatch(deleteVehicleDocumentService(id));
    if(response.error === undefined){
      switch (response.response.status) {
        case 200:
            //Aquí actulizo la informacion
            dispatch(getVehicleDocumentAllService());
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

  const selectList = () => {
    if (dataListLogin.data.response.data.role[0]._id === adminstrador) {
      return <DefaultTable data={dataListDriver} nms={"vehicleDocument"} deleteId={deleteInfo} updateId={updateInfo} />
    } else {
      let resultadosFiltrados = dataList.data.filter(objeto => objeto.users[0]._id === dataListLogin.data.response.data._id);
      return <DefaultTable data={resultadosFiltrados} nms={"vehicleDocument"} deleteId={deleteInfo} updateId={updateInfo} />
    }
  }

  return (
    <div className='list-vehicleDocument-main'>
      { view.list === true ?
        <>
          <div className='list-vehicleDocument-main-button'>
            <button onClick={handleCreate} type="button" className="list-vehicleDocument-button-title btn btn-primary">Crear</button>
          </div> 
          {selectList()}
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