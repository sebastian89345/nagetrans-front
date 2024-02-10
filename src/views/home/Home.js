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
import ListCheck from '../list-check/list/List';
import ListCheckDriver from '../list-check/create/Create';

// para navegar
import { useNavigate } from 'react-router-dom';

//id de los roles
import roleService from '../../libs/helpers/role.json';

// Redux
import {  useSelector, useDispatch } from "react-redux";

// actios
import { getVehicleDocumentAllService } from '../../store/action/vehicleDocumentAction'

function Home() {

    const { adminstrador,vehiculo } = roleService;
    const [runEffects, setRunEffects] = useState(false);
    const [newMtzVehicle, setNewMtzVehicle] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const dataListLogin = useSelector((store) => store.loginReducer);
    const dataListVehicleDocument = useSelector((store) => store.vehicleDocumentReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
      { name:"compensationBox",list:false,buttons:"", icon:"" },
      { name:"listCheckVehicle",list:false,buttons:"", icon:"" }
    ]); 

    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
    }, [width])

    //open list check
    useEffect(() => {
      if (dataListLogin.data.response.data.role[0]._id === vehiculo) {
        setChangeColor([
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
          { name:"compensationBox",list:false,buttons:"", icon:"" },
          { name:"listCheckVehicle",list:true,buttons:"", icon:"" }
        ])
      }
    }, [dataListLogin,vehiculo])

    //Aqui hago la peticion a los documentos del vehiculo 
    useEffect(() => {
      try {
        dispatch(getVehicleDocumentAllService())
      } catch (error) {
        console.log(error);
      }
    }, [dispatch])
    
    // Aqui hago la logica para las notificaciones
    useEffect(() => {
      if (dataListVehicleDocument.data.length > 0 && runEffects !== true) {
        let resultadosFiltrados = dataListVehicleDocument.data.filter(objeto => objeto.users[0].show === "Si");
        let newMtz = [];
        for (let i = 0; i < resultadosFiltrados.length; i++) {

          const element = resultadosFiltrados[i];
          // console.log(element);
          let obj = {};
           
          let expireSoat = formatDate(element.dateExpirationSoat);
          let expirationMechanicalTechnician = formatDate(element.dateExpirationMechanicalTechnician);
          let expirationCardOperations = formatDate(element.dateExpirationCardOperations);
          let expirationCardProperties = formatDate(element.dateExpirationCardProperties);
          let expirationSureRccece = formatDate(element.dateExpirationSureRccece);
          let expirationExtract = formatDate(element.dateExpirationExtract);
          let expirationPreventiveReview = formatDate(element.dateExpirationPreventiveReview);

          if(expireSoat < 8) { obj.expireSoat = element.dateExpirationSoat }
          if(expirationMechanicalTechnician < 8) { obj.expirationMechanicalTechnician = element.expirationMechanicalTechnician }
          if(expirationCardOperations < 8) { obj.expirationCardOperations = element.dateExpirationCardOperations }
          if(expirationCardProperties < 8) { obj.expirationCardProperties = element.dateExpirationCardProperties }
          if(expirationSureRccece < 8) { obj.expirationSureRccece = element.dateExpirationSureRccece }
          if(expirationExtract < 8) { obj.expirationExtract = element.dateExpirationExtract }
          if(expirationPreventiveReview < 8) { obj.expirationPreventiveReview = element.dateExpirationPreventiveReview }
          if (Object.keys(obj).length !== 0) { 
            obj.placa = element.users[0].placa
            newMtz.push(obj)
          }
          
        }
        setNewMtzVehicle(newMtz);
        setRunEffects(true);
      }
    }, [dataListVehicleDocument,dataListLogin,runEffects])

    // Función para formatear las fechas
    const formatDate = (date) => {
      //convierte las fechas a yyyy-mm-dd
      let result = date.split('-');
      let dayEx = result[0];
      let monthEx = result[1];
      let yearEx = result[2];
      let dateEx = yearEx+"-"+monthEx+"-"+dayEx

      //convierto y traigo la fecha actual
      const dateExpire = new Date(dateEx);
      const dateNow = new Date();

      // Calcular la diferencia en milisegundos
      let diferencia_ms = dateExpire - dateNow;

      // Convertir la diferencia de milisegundos a días
      let dias = Math.round(diferencia_ms / (1000 * 60 * 60 * 24));

      return dias;
    };

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
        { name:"compensationBox",list:false,buttons:"", icon:"" },
        { name:"listCheckVehicle",list:false,buttons:"", icon:"" }
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
            <button name={changeColor[13].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[13].buttons}  mb-1`}>
              <img className={`home-sidebar-icon ${changeColor[13].icon}`} src={iconTask} alt='nose' /> Lista de chequeo
            </button>
            <button name={changeColor[2].name} onClick={changeColorClick} className={`home-sidebar-links ${changeColor[2].buttons} mb-1`}>
                <img className={`home-sidebar-icon ${changeColor[2].icon}`} src={iconSheet} alt='nose' /> Papeles vehiculo
            </button>
          </>
        </> 
      }
      return Buttons;
    }
      
    const dashboards = () => {
      return <>
          {   changeColor[0].list === true ? 
              <ListCheck  />
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
            : changeColor[13].list === true ?
              <ListCheckDriver />
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
            <NavbarHome logout={logout} email={dataListLogin.data.response.data.email} user={dataListLogin.data.response.data.user} dataNotification={newMtzVehicle} />
            {dashboards()}
        </div>
      </div> 
      : <>
          <NavbarHome email={dataListLogin.data.response.data.email} user={dataListLogin.data.response.data.user} dataNotification={newMtzVehicle} />
          <div className='home-mobile-container'>
            <div id="offcanvasModal" className="home-offcanvas-modal">
              <div className="home-offcanvas-content">
                <div className='home-sidebar-container-close-img'>
                  <img className='home-close-img' onClick={closeSidebar} src={closeImg} alt="imagen del cerrar" />
                </div>
                <div className='home-mobile-sidebar-container-img'>
                    <img className='home-mobile-sidebar-img' src={logo} alt='logo de nagetrans' />
                    <div className='derecha'>
                      <p className='home-mobile-sidebar-title-email'>{dataListLogin.data.response.data.email}</p>
                      <p className='home-mobile-sidebar-title-user'>{dataListLogin.data.response.data.user}</p>
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