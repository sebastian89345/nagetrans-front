// componentes de react
import React, { useState , useEffect } from 'react';

//hoja de estilos
import './Home.css';

// imagenes cargadas desde assets
import NavbarHome from '../../components/Navbar/NavbarHome/NavbarHome';
import iconUser from '../../assets/img/icon-user.png';
import iconGroupUser from '../../assets/img/bx-group1.png';
import iconTask from '../../assets/img/icon-task.png';
import iconSheet from '../../assets/img/icon-sheet.png';
import logo from '../../assets/img/logo.png';
import closeImg from '../../assets/img/close.png';
import iconCar from '../../assets/img/bx-car.png';
import iconCheckCircle from '../../assets/img/bx-check-circle.png';
import iconAccordion from '../../assets/img/bx-align-left.png';

//vistas 
import ListUser from '../user/list/List';
import ListRole from '../role/list/List';
import ListStatus from '../status/list/List';
import ListBrand from '../brand/list/List';
import ListModel from '../model/list/List';
import ListType from '../type/list/List';
import ListAfp from '../afp/list/List';
import ListArl from '../arl/list/List';
import ListEps from '../eps/list/List';
import ListCompensationBox from '../compensation-box/list/List';
import ListDriverDocument from '../driver-document/list/List';
import ListVehicleDocument from '../vehicle-document/list/List';

// para navegar
import { useNavigate } from 'react-router-dom';

//id de los roles
import roleService from '../../libs/helpers/role.json';

// Redux
import {  useSelector } from "react-redux";

function Home() {

  const { adminstrador,vehiculo } = roleService;
  const [width, setWidth] = useState(window.innerWidth);
  const dataListLogin = useSelector((store) => store.loginReducer);
  const navigate = useNavigate();

    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
    }, [width])

    const [changeColor, setChangeColor] = useState([
      { name:"listCheck", list:false, buttons:"", icon:"" },
      { name:"user", list:false, buttons:"", icon:"" },
      { name:"documentVehicle", list:false, buttons:"", icon:"" },
      { name:"documentDriver", list:false, buttons:"", icon:"" },
      { name:"role", list:false, buttons:"", icon:"" },
      { name:"status", list:false, buttons:"", icon:"" },
      { name:"brand", list:false, buttons:"", icon:"" },
      { name:"model", list:false, buttons:"", icon:"" },
      { name:"type", list:false, buttons:"", icon:"" },
      { name:"arl",list:false,buttons:"", icon:"" },
      { name:"afp",list:false,buttons:"", icon:"" },
      { name:"eps",list:false,buttons:"", icon:"" },
      { name:"compensationBox",list:false,buttons:"", icon:"" }
    ]); 

    const closeSidebar = () => {
      const offcanvasModal = document.getElementById('offcanvasModal');
      offcanvasModal.style.left = '-300px';
    }

    // Función para resetear el estado a los valores iniciales
    const resetState = () => {
      return [
        { name:"listCheck",list:false,buttons:"", icon:"" },
        { name:"user",list:false,buttons:"", icon:"" },
        { name:"documentVehicle",list:false,buttons:"", icon:"" },
        { name:"documentDriver",list:false,buttons:"", icon:"" },
        { name:"role",list:false,buttons:"", icon:"" },
        { name:"status",list:false,buttons:"", icon:"" },
        { name:"brand",list:false,buttons:"", icon:"" },
        { name:"model",list:false,buttons:"", icon:"" },
        { name:"type",list:false,buttons:"", icon:"" },
        { name:"arl",list:false,buttons:"", icon:"" },
        { name:"afp",list:false,buttons:"", icon:"" },
        { name:"eps",list:false,buttons:"", icon:"" },
        { name:"compensationBox",list:false,buttons:"", icon:"" }
      ];
    };

    const changeColorClick = (e) => {
      const name = e.target.name;
      const resetChangeColors = resetState();
      let inmutabilidad = {...changeColor};
      inmutabilidad = resetChangeColors;
      const info = inmutabilidad.map(data => {
        if (data.name === name) {
            data.list = true;
            data.buttons = "home-sidebar-links-show";
            data.icon = "home-sidebar-icon-show";
          return data 
        }
        return data;
      });
      setChangeColor(info);
    }

    const buttons = () => {
      let Buttons;
      if( dataListLogin.data.response.data.role[0]._id === adminstrador){
        Buttons = <>
          {/* usuarios */}
          <>
            <button className="home-sidebar-links mb-1" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">
              <img className="home-sidebar-icon" src={iconAccordion} alt='nose' /> Modulo usuarios
            </button>
            <div id="multiCollapseExample1" className="collapse multi-collapse">
              <button name={changeColor[1].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[1].buttons} mb-1 ml-3`}>
                <img className={`home-sidebar-icon ${changeColor[1].icon}`} src={iconUser} alt='nose' /> Usuarios
              </button>
              <button name={changeColor[4].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[4].buttons} mb-1 ml-3`}>
                <img className={`home-sidebar-icon ${changeColor[4].icon}`} src={iconGroupUser} alt='nose' /> Rol
              </button>
              <button name={changeColor[5].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[5].buttons} mb-1 ml-3`}>
                <img className={`home-sidebar-icon ${changeColor[5].icon}`} src={iconCheckCircle} alt='nose' /> Estado
              </button>
              <button name={changeColor[6].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[6].buttons} mb-1 ml-3`}>
                <img className={`home-sidebar-icon ${changeColor[6].icon}`} src={iconCar} alt='nose' /> Marca
              </button>
              <button name={changeColor[7].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[7].buttons} mb-1 ml-3`}>
                <img className={`home-sidebar-icon ${changeColor[7].icon}`} src={iconCar} alt='nose' /> Modelo
              </button>
              <button name={changeColor[8].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[8].buttons} mb-1 ml-3`}>
                <img className={`home-sidebar-icon ${changeColor[8].icon}`} src={iconCar} alt='nose' /> Tipo
              </button>
            </div>
          </>
            {/* papeles del condutor */}
          <>
              <button className="home-sidebar-links mb-1" type="button" data-toggle="collapse" data-target=".multi-collapses" aria-expanded="false" aria-controls="multiCollapseExample3">
                <img className="home-sidebar-icon" src={iconAccordion} alt='nose' /> Modulo conductor
              </button>
              <div id="multiCollapseExample3" className="collapse multi-collapses">
                <button name={changeColor[3].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[3].buttons} mb-1`}>
                  <img className={`home-sidebar-icon ${changeColor[3].icon}`} src={iconSheet} alt='nose' /> Papeles conductor
                </button>
                <button name={changeColor[9].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[9].buttons} mb-1`}>
                  <img className={`home-sidebar-icon ${changeColor[9].icon}`} src={iconSheet} alt='nose' /> Arl
                </button>
                <button name={changeColor[10].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[10].buttons} mb-1`}>
                  <img className={`home-sidebar-icon ${changeColor[10].icon}`} src={iconSheet} alt='nose' /> Afp
                </button>
                <button name={changeColor[11].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[11].buttons} mb-1`}>
                  <img className={`home-sidebar-icon ${changeColor[11].icon}`} src={iconSheet} alt='nose' /> Eps
                </button>
                <button name={changeColor[12].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[12].buttons} mb-1`}>
                  <img className={`home-sidebar-icon ${changeColor[12].icon}`} src={iconSheet} alt='nose' /> Caja de compensacion
                </button>
              </div>
            </>
              {/* papeles del vehciculo */}
            <>
              <button name={changeColor[2].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[2].buttons} mb-1`}>
                <img className={`home-sidebar-icon ${changeColor[2].icon}`} src={iconSheet} alt='nose' /> Papeles vehiculo
              </button>
            </>
              {/* lista de chequeo */}
            <>
              <button name={changeColor[0].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[0].buttons}  mb-1`}>
                <img className={`home-sidebar-icon ${changeColor[0].icon}`} src={iconTask} alt='nose' /> Lista de chequeo
              </button>
            </>
          </>
      } else if ( dataListLogin.data.response.data.role[0]._id === vehiculo){
        Buttons = <>
          <>
              <>
                <button name={changeColor[0].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[0].buttons}  mb-1`}>
                  <img className={`home-sidebar-icon ${changeColor[0].icon}`} src={iconTask} alt='nose' /> Lista de chequeo
                </button>
              </>
          </>
        </> 
      }
      return Buttons;
    }
      
    const dashboards = () => {
      return <>
          {   changeColor[0].list === true ? 
              <ListUser  />
            : changeColor[1].list === true ?
              <ListUser />
            : changeColor[2].list === true ?
              <ListVehicleDocument />
            : changeColor[3].list === true ?
              <ListDriverDocument />
            : changeColor[4].list === true ?
              <ListRole />
            : changeColor[5].list === true ?
              <ListStatus />
            : changeColor[6].list === true ?
              <ListBrand />
            : changeColor[7].list === true ?
              <ListModel />
            : changeColor[8].list === true ?
              <ListType />
            : changeColor[9].list === true ?
              <ListArl />
            : changeColor[10].list === true ?
              <ListAfp />
            : changeColor[11].list === true ?
              <ListEps />
            : changeColor[12].list === true ?
              <ListCompensationBox />
            : <></> 
          }
      </>
    }

    const logout = () => {
      navigate("/login");
      window.location.reload();
    }

  return (
    <>
    {width > 1200
      ? <div className='home-contenedor'>
        <div className='home-fila0'>
          <div className='home-sidebar-container-logo'>
            <img className='home-sidebar-logo' src={logo} alt='logo' />
          </div>
          <div className='home-sidebar-container-links'>
            {buttons()}
          </div>
        </div>
        <div className='home-fila1'>
            <NavbarHome logout={logout} />
            {dashboards()}
        </div>
      </div> 
      : <>
          <NavbarHome />
          <div className='home-mobile-container'>
            <div id="offcanvasModal" className="home-offcanvas-modal">
              <div className="home-offcanvas-content">
                <div className='home-sidebar-container-close-img'>
                  <img className='home-close-img' onClick={closeSidebar} src={closeImg} alt="imagen del cerrar" />
                </div>
                <div className='home-mobile-sidebar-container-img'>
                    <img className='home-mobile-sidebar-img' src={logo} alt='logo de nagetrans' />
                    <div className='derecha'>
                      <p className='home-mobile-sidebar-title-email'>nagetrans@gmail.com</p>
                      <p className='home-mobile-sidebar-title-user'>SWT222</p>
                    </div>
                </div>
                <div className='home-mobile-sidebar-sidebar-list'>
                  {buttons()}
                </div>
                <div className='home-mobile-sidebar-sidebar-logout'>
                  <button onClick={logout} type="submit" className="home-mobile-sidebar-btn btn btn-danger">Cerrar sesion</button>
                </div>
              </div>
            </div>
            <div>
              {dashboards()}
            </div>
          </div>
      </>
      }
    </>
  )
}

export default Home