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
import { getRoleAllService } from "../../../store/action/roleAction";

//Alertas 
import Swal from 'sweetalert2';

function List() {
  const [view, setView] = useState({list:true,create:false,update:false})
  const dataListRole = useSelector((store) => store.roleService);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoleAllService());
  }, [dispatch])

  useEffect(() => {
    try {
      if (dataListRole.data.length > 0) {
          // console.log(dataListRole);
      }      
    } catch (error) {
      console.log(error);
    }
  }, [dataListRole])
  
  const handleClick = () => {
    setView({list:false,create:true})
  }

  const alertDelete = () => {
    Swal.fire('Estas seguro que deseas eliminar esta Información', 'success');
  }

  const deleteInfo = (id) => {
    alertDelete()
    console.log(id);
  }

  const updateInfo = (id,item) => {
    console.log(id);
    console.log(item);
  }

  return (
    <div className='list-role-main'>
      { view.list === true ?
        <>
          <div className='list-role-main-button'>
            <button onClick={handleClick} type="button" className="list-role-button-title btn btn-primary">Crear</button>
          </div>
          <DefaultTable data={dataListRole.data} nms={"role"} deleteId={deleteInfo} updateId={updateInfo} />
        </>
        : view.create === true ?
          <Create />
        : view.update === true ?
          <Update />
        : <></>
      }
    </div>
  )
}

export default List