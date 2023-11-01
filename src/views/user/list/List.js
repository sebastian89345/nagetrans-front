import React,{ useState } from 'react'

//Componentes
import DefaultTable from '../../../components/Table/defaultTable/DefaultTable';

//Hoja de estilos
import './List.css';

//views 
import UpdateUser from '../update/Update';
import CreateUsers from '../create/Create';

function List() {

 const [view, setView] = useState({list:true,create:false,update:false})
  const data = [
    { dni:"1007843640",name:"juan sebastian",surname:"quiroz soto",email:"jquirozsoto3@gmail.com",phone:"3147961800",date:"11/10/2023 06:06:20 a.m" },
    { dni:"1007843641",name:"carlos",surname:"quiroz soto",email:"jquirozsoto3@gmail.com",phone:"3147961800",date:"11/10/2023 06:06:20 a.m" },
    { dni:"1007843642",name:"maria juliana",surname:"naged salazar",email:"jquirozsoto3@gmail.com",phone:"3147961800",date:"11/10/2023 06:06:20 a.m" },
    { dni:"1007843643",name:"andres",surname:"alfonso martinez",email:"jquirozsoto3@gmail.com",phone:"3147961800",date:"11/10/2023 06:06:20 a.m" },
    { dni:"1007843644",name:"jorge",surname:"naged",email:"jquirozsoto3@gmail.com",phone:"3147961800",date:"11/10/2023 06:06:20 a.m" },
    { dni:"1007843645",name:"esteban",surname:"mosquera",email:"jquirozsoto3@gmail.com",phone:"3147961800",date:"11/10/2023 06:06:20 a.m" }
  ]

  const handleClick = () => {
    setView({list:false,create:true})
  }

  return (
    <div className='list-user-main'>
      { view.list === true ?
        <>
          <div className='list-user-main-button'>
            <button onClick={handleClick} type="button" className="list-user-button-title btn btn-primary">Crear</button>
          </div>
          <DefaultTable data={data} nms={"user"} />
        </>
        : view.create === true ?
          <CreateUsers />
        : view.update === true ?
          <UpdateUser />
        : <></>
      }
    </div>
  )
}

export default List