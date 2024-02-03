import React, { useEffect, useState } from 'react'

//Hoja de estilos
import './Create.css';

// Redux
import {  useSelector,useDispatch } from "react-redux";

//Actions
import { getUserAllService } from "../../../store/action/userAction";
import { createListCheckService } from "../../../store/action/listCheckAction";

//id de los roles
import roleService from '../../../libs/helpers/role.json';

//Alertas 
import Swal from 'sweetalert2';

function Create() {

  const { conductor } = roleService;
  const [opcionUser, setOpcionUser] = useState([]);
  const [userVehicle, setUserVehicle] = useState([]);
  const [opcionSelectUser, setOpcionSelectUser] = useState('');
  const [oilChange, setOilChange] = useState("");
  const [currentKm, setCurrentKm] = useState("");
  const [dateExtinguisherExpiration, setDateExtinguisherExpiration] = useState("");
  const [observation, setObservation] = useState("");
  //revision Interna
  const [wiperWasher, setWiperWasher] = useState(false);
  const [emergencyBrake, setEmergencyBrake] = useState(false);
  const [whistle, setWhistle] = useState(false);
  const [safetyBelts, setSafetyBelts] = useState(false);
  const [glassLifter, setGlassLifter] = useState(false);
  const [lightning, setLightning] = useState(false);
  //Revisión Externa
  const [directionals, setDirectionals] = useState(false);
  const [stationary, setStationary] = useState(false);
  const [highBeams, setHighBeams] = useState(false);
  const [lowLights, setLowLights] = useState(false);
  const [stop, setStop] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [battery, setBattery] = useState(false);
  const [tireWear, setTireWear] = useState(false);
  const [tireCondition, setTireCondition] = useState(false);
  const [tireAirPressure, setTireAirPressure] = useState(false);
  //Motor
  const [engineLeaks, setEngineLeaks] = useState(false); 
  const [brakeLeaks, setBrakeLeaks] = useState(false);
  const [beltTension, setBeltTension] = useState(false);
  const [wetFilters, setWetFilters] = useState(false); 
  //Niveles
  const [motorOil, setMotorOil] = useState(false);
  const [transmissionOil, setTransmissionOil] = useState(false);
  const [refrigerant, setRefrigerant] = useState(false);
  const [windshieldWiperWater, setWindshieldWiperWater] = useState(false);
  const [radiatorAdditives, setRadiatorAdditives] = useState(false);
  const [roadTeam, setRoadTeam] = useState(false);
  const [firstAidKit, setFirstAidKit] = useState(false);
  //Kit Herramientas
  const [extinguisher, setExtinguisher] = useState(false);
  const [crossPiece, setCrossPiece] = useState(false);
  const [cat, setCat] = useState(false);
  const [tacos, setTacos] = useState(false);
  const [signs, setSigns] = useState(false);
  const [vest, setVest] = useState(false);
  const [flashlight, setFlashlight] = useState(false);
  //Elementos de bioseguridad
  const [gloveHolder, setGloveHolder] = useState(false);
  const [wearYourFaceMask, setWearYourFaceMask] = useState(false);
  const [antibacterialGelOrAlcoholHolder, setAntibacterialGelOrAlcoholHolder] = useState(false);
  //end
  const [errorUser, setErrorUser] = useState("");
  const [errorDateExtinguisherExpiration, setErrorDateExtinguisherExpiration] = useState("");
  const [errorOilChange, setErrorOilChange] = useState("");
  const [errorCurrentKm, setErrorCurrentKm] = useState("");
  const dataListUser = useSelector((store) => store.userReducer);
  const dataListLogin = useSelector((store) => store.loginReducer);
  const dispatch = useDispatch();
  
  useEffect(() => {
    try {
      dispatch(getUserAllService())
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    let resultadosFiltrados = dataListUser.data.filter(objeto => objeto.role[0]._id === conductor && objeto.show === "Si");
    setOpcionUser(resultadosFiltrados);
    setUserVehicle(dataListLogin.data.response.data._id);
  }, [dataListLogin,dataListUser,conductor])
  
  const resetInput = () => {
    //revision Interna
    setWiperWasher(false);
    setEmergencyBrake(false);
    setWhistle(false);
    setSafetyBelts(false);
    setGlassLifter(false); 
    setLightning(false); 
    //Revisión Externa
    setDirectionals(false);
    setStationary(false);
    setHighBeams(false);
    setLowLights(false);
    setStop(false);
    setReverse(false);
    setBattery(false);
    setTireWear(false);
    setTireCondition(false);
    setTireAirPressure(false);
    //Motor
    setEngineLeaks(false);
    setBrakeLeaks(false);
    setBeltTension(false);
    setWetFilters(false);
    //Niveles
    setMotorOil(false);
    setTransmissionOil(false);
    setRefrigerant(false);
    setWindshieldWiperWater(false);
    setRadiatorAdditives(false);
    setRoadTeam(false);
    setFirstAidKit(false);
    //Kit Herramientas
    setExtinguisher(false);
    setCrossPiece(false);
    setCat(false);
    setTacos(false);
    setSigns(false);
    setVest(false);
    setFlashlight(false);
    //Elementos de bioseguridad
    setGloveHolder(false);
    setWearYourFaceMask(false);
    setAntibacterialGelOrAlcoholHolder(false);

    //Date
    setDateExtinguisherExpiration("");

    //Select
    setOpcionSelectUser("");

    //Input
    setOilChange("");
    setCurrentKm("");
    setObservation("");
  }

  const validateField = (value, fieldName, regex, minLength, customErrorMessage) => {
    if (value.trim() === '') {
      return `El campo ${fieldName} no puede estar en blanco.`;
    }

    if (regex && !regex.test(value)) {
      return customErrorMessage || `El campo ${fieldName} no cumple con el formato esperado.`;
    }

    if (value.length < minLength) {
      return `El campo ${fieldName} debe tener al menos ${minLength} caracteres.`;
    }

    return null; // Indica que la validación fue exitosa
  };

  const validate = () => {
    let isValid = true;

    const userError = validateField(opcionSelectUser, 'usuario', /\S/, 1);
    if (userError) {
      setErrorUser(userError);
      isValid = false;
    } else {
      setErrorUser("");
    }

    const dateExtinguisherExpirationError = validateField(dateExtinguisherExpiration, 'vencimiento extintor', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateExtinguisherExpirationError) {
      setErrorDateExtinguisherExpiration(dateExtinguisherExpirationError);
      isValid = false;
    } else {
      setErrorDateExtinguisherExpiration("");
    }

    const currentKmError = validateField(currentKm, 'kilometraje actual', /\S/, 1);
    if (currentKmError) {
      setErrorCurrentKm(currentKmError);
      isValid = false;
    } else {
      setErrorCurrentKm("");
    }

    const oilChangeError = validateField(oilChange, 'proximo cambio de aceite', /\S/, 1);
    if (oilChangeError) {
      setErrorOilChange(oilChangeError);
      isValid = false;
    } else {
      setErrorOilChange("");
    }

    return isValid;
  };

  const dateNow = () => {
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Formatear manualmente la fecha según el formato deseado
    const year = fechaActual.getFullYear();
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses son indexados desde 0
    const day = fechaActual.getDate().toString().padStart(2, '0');

    const fechaFormateada = `${year}-${month}-${day}`;
    return fechaFormateada;
  }

  const setChangeToogle = () => {
    let body = {
       //revision Interna
      wiperWasher:wiperWasher,
      emergencyBrake:emergencyBrake,
      whistle:whistle,
      safetyBelts:safetyBelts,
      glassLifter:glassLifter, 
      lightning:lightning, 
      //Revisión Externa 
      directionals:directionals,
      stationary:stationary,
      highBeams:highBeams,
      lowLights:lowLights,
      stop:stop,
      reverse:reverse,
      battery:battery,
      tireWear:tireWear,
      tireCondition:tireCondition,
      tireAirPressure:tireAirPressure,
      //Motor
      engineLeaks:engineLeaks,
      brakeLeaks:brakeLeaks,
      beltTension:beltTension,
      wetFilters:wetFilters,
      //Niveles
      motorOil:motorOil,
      transmissionOil:transmissionOil,
      refrigerant:refrigerant,
      windshieldWiperWater:windshieldWiperWater,
      radiatorAdditives:radiatorAdditives,
      roadTeam:roadTeam,
      firstAidKit:firstAidKit,
      //Kit Herramientas
      extinguisher:extinguisher,
      crossPiece:crossPiece,
      cat:cat,
      tacos:tacos,
      signs:signs,
      vest:vest,
      flashlight:flashlight,
      //Elementos de bioseguridad
      gloveHolder:gloveHolder,
      wearYourFaceMask:wearYourFaceMask,
      antibacterialGelOrAlcoholHolder:antibacterialGelOrAlcoholHolder
    }

    let newObjt = {};
    for (let propiedad in body) {
      if (body.hasOwnProperty(propiedad)) {
        // console.log(propiedad);
        // console.log(body[propiedad]);
        if(body[propiedad] === true){
          newObjt[`${propiedad}`] = `Si`;
        } else if (body[propiedad] === false) {
          newObjt[`${propiedad}`] = `No`;
        }
      }
    }
    return newObjt;
  }

  const create = async () => {
    let dateNows = dateNow();
    let validates = validate();
    if (validates) {
      let setChangeToogles = setChangeToogle();
      let body = { 
        userVehicle:userVehicle,
        userDriver:opcionSelectUser,
        date:dateNows,
        oilChange:oilChange,
        currentKm:currentKm,
        dateExtinguisherExpiration:dateExtinguisherExpiration,
        observation:observation,
    }
      const objetoCombinado = { ...body, ...setChangeToogles };
      let response = await dispatch(createListCheckService(objetoCombinado));
      if(response.error === undefined){
        switch (response.response.status) {
          case 201:
              resetInput();
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
          text: "Eror al crearlo",
          icon: "error"
        });
      }
    }
  }

  return (
    <div className='listCheck-create-card-main'>
        <div className='listCheck-create-card card'>
            <div className='card-body'>
              <div className=' text-center'>
                <p className='listCheck-create-title'>Crear una preoperacional</p>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Conductor :</label>
                <select value={opcionSelectUser} onChange={(e) => setOpcionSelectUser(e.target.value)} className='listCheck-create-input form-control'>
                  <option value="">Selecciona una opción</option>
                  {opcionUser.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.names}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4'>
                {errorUser && <p style={{ color: 'red' }}>{errorUser}</p>}
              </div>

              {/* Revision interna */}

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Limpia Parabrisas :</label>
                <label className="toggle-container">
                  <input checked={wiperWasher} onChange={(e) => setWiperWasher(!wiperWasher)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Freno de Emergencia :</label>
                <label className="toggle-container">
                  <input checked={emergencyBrake} onChange={(e) => setEmergencyBrake(!emergencyBrake)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>
              
              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Pito :</label>
                <label className="toggle-container">
                  <input checked={whistle} onChange={(e) => setWhistle(!whistle)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Cinturones de Seguridad :</label>
                <label className="toggle-container">
                  <input checked={safetyBelts} onChange={(e) => setSafetyBelts(!safetyBelts)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Elevavidrios :</label>
                <label className="toggle-container">
                  <input checked={glassLifter} onChange={(e) => setGlassLifter(!glassLifter)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Iluminación :</label>
                <label className="toggle-container">
                  <input checked={lightning} onChange={(e) => setLightning(!lightning)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>
              
              {/* Revisión Externa */}

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Direccionales :</label>
                <label className="toggle-container">
                  <input checked={directionals} onChange={(e) => setDirectionals(!directionals)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Estacionarias :</label>
                <label className="toggle-container">
                  <input checked={stationary} onChange={(e) => setStationary(!stationary)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Luces Altas :</label>
                <label className="toggle-container">
                  <input checked={highBeams} onChange={(e) => setHighBeams(!highBeams)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Luces Bajas :</label>
                <label className="toggle-container">
                  <input checked={lowLights} onChange={(e) => setLowLights(!lowLights)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Stop :</label>
                <label className="toggle-container">
                  <input checked={stop} onChange={(e) => setStop(!stop)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Reverso :</label>
                <label className="toggle-container">
                  <input checked={reverse} onChange={(e) => setReverse(!reverse)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Batería :</label>
                <label className="toggle-container">
                  <input checked={battery} onChange={(e) => setBattery(!battery)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Desgaste Llantas :</label>
                <label className="toggle-container">
                  <input checked={tireWear} onChange={(e) => setTireWear(!tireWear)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Estado Llantas :</label>
                <label className="toggle-container">
                  <input checked={tireCondition} onChange={(e) => setTireCondition(!tireCondition)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Presión Aire Llantas :</label>
                <label className="toggle-container">
                  <input checked={tireAirPressure} onChange={(e) => setTireAirPressure(!tireAirPressure)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              {/* Motor */}

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Fugas de Motor :</label>
                <label className="toggle-container">
                  <input checked={engineLeaks} onChange={(e) => setEngineLeaks(!engineLeaks)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Fugas en Frenos :</label>
                <label className="toggle-container">
                  <input checked={brakeLeaks} onChange={(e) => setBrakeLeaks(!brakeLeaks)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Tensión Correas :</label>
                <label className="toggle-container">
                  <input checked={beltTension} onChange={(e) => setBeltTension(!beltTension)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Filtros Húmedos :</label>
                <label className="toggle-container">
                  <input checked={wetFilters} onChange={(e) => setWetFilters(!wetFilters)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              {/* Niveles */}

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Aceite de Motor :</label>
                <label className="toggle-container">
                  <input checked={motorOil} onChange={(e) => setMotorOil(!motorOil)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Aceite Transmisión :</label>
                <label className="toggle-container">
                  <input checked={transmissionOil} onChange={(e) => setTransmissionOil(!transmissionOil)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Refrigerante :</label>
                <label className="toggle-container">
                  <input checked={refrigerant} onChange={(e) => setRefrigerant(!refrigerant)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Agua Limpiabrisas :</label>
                <label className="toggle-container">
                  <input checked={windshieldWiperWater} onChange={(e) => setWindshieldWiperWater(!windshieldWiperWater)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Aditivos Radiador :</label>
                <label className="toggle-container">
                  <input checked={radiatorAdditives} onChange={(e) => setRadiatorAdditives(!radiatorAdditives)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Equipo de Carretera :</label>
                <label className="toggle-container">
                  <input checked={roadTeam} onChange={(e) => setRoadTeam(!roadTeam)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Botiquín :</label>
                <label className="toggle-container">
                  <input checked={firstAidKit} onChange={(e) => setFirstAidKit(!firstAidKit)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              {/* Kit Herramientas */}

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Extintor :</label>
                <label className="toggle-container">
                  <input checked={extinguisher} onChange={(e) => setExtinguisher(!extinguisher)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Vencimiento extintor :</label>
                <input value={dateExtinguisherExpiration} onChange={(e) => setDateExtinguisherExpiration(e.target.value)} type="date" className='listCheck-create-input form-control' />
              </div>

              <div className='mt-4'>
                {errorDateExtinguisherExpiration && <p style={{ color: 'red' }}>{errorDateExtinguisherExpiration}</p>}
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Cruceta :</label>
                <label className="toggle-container">
                  <input checked={crossPiece} onChange={(e) => setCrossPiece(!crossPiece)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Gato :</label>
                <label className="toggle-container">
                  <input checked={cat} onChange={(e) => setCat(!cat)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Tacos :</label>
                <label className="toggle-container">
                  <input checked={tacos} onChange={(e) => setTacos(!tacos)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Señales :</label>
                <label className="toggle-container">
                  <input checked={signs} onChange={(e) => setSigns(!signs)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Chaleco :</label>
                <label className="toggle-container">
                  <input checked={vest} onChange={(e) => setVest(!vest)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Linterna :</label>
                <label className="toggle-container">
                  <input checked={flashlight} onChange={(e) => setFlashlight(!flashlight)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              {/* Elementos de bioseguridad */}

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">¿Porta Guantes? :</label>
                <label className="toggle-container">
                  <input checked={gloveHolder} onChange={(e) => setGloveHolder(!gloveHolder)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">¿Porta su Tapabocas? :</label>
                <label className="toggle-container">
                  <input checked={wearYourFaceMask} onChange={(e) => setWearYourFaceMask(!wearYourFaceMask)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">¿Porta Gel Antibacterial o Alcohol? :</label>
                <label className="toggle-container">
                  <input checked={antibacterialGelOrAlcoholHolder} onChange={(e) => setAntibacterialGelOrAlcoholHolder(!antibacterialGelOrAlcoholHolder)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              {/* no tocar */}

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Kilometraje actual :</label>
                <input value={currentKm} onChange={(e) => setCurrentKm(e.target.value)} type="text" className="listCheck-create-input form-control" placeholder="Kilometraje actual" />
              </div>

              <div className='mt-4'>
                {errorCurrentKm && <p style={{ color: 'red' }}>{errorCurrentKm}</p>}
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Proximo cambio de aceite :</label>
                <input value={oilChange} onChange={(e) => setOilChange(e.target.value)} type="text" className="listCheck-create-input form-control" placeholder="Proximo cambio de aceite" />
              </div>

              <div className='mt-4'>
                {errorOilChange && <p style={{ color: 'red' }}>{errorOilChange}</p>}
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Observacion :</label>
                <textarea value={observation} onChange={(e) => setObservation(e.target.value)} type="text" className="listCheck-create-input form-control" placeholder="Observacion" />
              </div>

              <div className='mt-4 text-center'>
                <button onClick={create} type="button" className="listCheck-create-button btn btn-primary">Guardar</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Create