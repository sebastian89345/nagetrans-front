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
  const [engineOilIndicator, setEngineOilIndicator] = useState(false);
  const [fuelLevel, setFuelLevel] = useState(false);
  const [whistle, setWhistle] = useState(false);
  const [batteryIndicator, setBatteryIndicator] = useState(false);
  const [emergencyBrake, setEmergencyBrake] = useState(false);
  const [chairCushions, setChairCushions] = useState(false);
  const [wiperWasher, setWiperWasher] = useState(false);
  const [internalLights, setInternalLights] = useState(false);
  const [instrumentSpeedometerDashboard, setInstrumentSpeedometerDashboard] = useState(false);
  const [engineOil, setEngineOil] = useState(false);
  const [hydraulicOilSteering, setHydraulicOilSteering] = useState(false);
  const [coolantLiquid, setCoolantLiquid] = useState(false);
  const [brakeFluid, setBrakeFluid] = useState(false);
  const [fuelcap, setFuelcap] = useState(false);
  const [beltTension, setBeltTension] = useState(false);
  const [mirrorGlass, setMirrorGlass] = useState(false);
  const [highLowBeams, setHighLowBeams] = useState(false);
  const [turnSignals, setTurnSignals] = useState(false);
  const [logoPlates, setLogoPlates] = useState(false);
  const [tires, setTires] = useState(false);
  const [deviceSpeed, setDeviceSpeed] = useState(false);
  const [safetyBelts, setSafetyBelts] = useState(false);
  const [firstaidkit, setFirstaidkit] = useState(false);
  const [largeTent, setLargeTent] = useState(false);
  const [extinguisher, setExtinguisher] = useState(false);
  const [dateExtinguisherExpiration, setDateExtinguisherExpiration] = useState("");
  const [roadTeam, setRoadTeam] = useState(false);
  const [spareTire, setSpareTire] = useState(false);
  const [observation, setObservation] = useState("");
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
    
    //Toogle
    setEngineOilIndicator(false);
    setFuelLevel(false);
    setWhistle(false);
    setBatteryIndicator(false);
    setEmergencyBrake(false);
    setChairCushions(false);
    setWiperWasher(false);
    setInternalLights(false);
    setInstrumentSpeedometerDashboard(false);
    setEngineOil(false);
    setHydraulicOilSteering(false);
    setCoolantLiquid(false);
    setBrakeFluid(false);
    setFuelcap(false);
    setBeltTension(false);
    setMirrorGlass(false);
    setHighLowBeams(false);
    setHighLowBeams(false);
    setTurnSignals(false);
    setLogoPlates(false);
    setTires(false);
    setDeviceSpeed(false);
    setSafetyBelts(false);
    setFirstaidkit(false);
    setLargeTent(false);
    setExtinguisher(false);
    setRoadTeam(false);
    setSpareTire(false);

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

    const oilChangeError = validateField(oilChange, 'kilometraje actual', /\S/, 1);
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
      engineOilIndicator:engineOilIndicator,
      fuelLevel:fuelLevel,
      whistle:whistle,
      batteryIndicator:batteryIndicator,
      emergencyBrake:emergencyBrake,
      chairCushions:chairCushions,
      wiperWasher:wiperWasher,
      internalLights:internalLights,
      instrumentSpeedometerDashboard:instrumentSpeedometerDashboard,
      engineOil:engineOil,
      hydraulicOilSteering:hydraulicOilSteering,
      coolantLiquid:coolantLiquid,
      brakeFluid:brakeFluid,
      fuelcap:fuelcap,
      beltTension:brakeFluid,
      mirrorGlass:mirrorGlass,
      highLowBeams:highLowBeams,
      turnSignals:turnSignals,
      logoPlates:logoPlates,
      tires:tires,
      deviceSpeed:deviceSpeed,
      safetyBelts:safetyBelts,
      firstaidkit:firstaidkit,
      extinguisher:extinguisher,
      roadTeam:roadTeam,
      spareTire:spareTire,
      observation:observation,
      largeTent:largeTent 
    }

    let newObjt = {};
    for (let propiedad in body) {
      if (body.hasOwnProperty(propiedad)) {
        // console.log(propiedad);
        // console.log(body[propiedad]);
        if(body[propiedad] === true){
          newObjt[`${propiedad}`] = `Bueno`;
        } else if (body[propiedad] === false) {
          newObjt[`${propiedad}`] = `Malo`;
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

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Indicador de aceite de motor :</label>
                <label className="toggle-container">
                  <input type="checkbox" className="toggle-checkbox" checked={engineOilIndicator} onChange={(e) => setEngineOilIndicator(!engineOilIndicator)} />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Nivel de combustible :</label>
                <label className="toggle-container">
                  <input type="checkbox" className="toggle-checkbox" checked={fuelLevel} onChange={(e) => setFuelLevel(!fuelLevel)} />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Pito :</label>
                <label className="toggle-container">
                  <input type="checkbox" className="toggle-checkbox" checked={whistle} onChange={(e) => setWhistle(!whistle)} />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Indicador de bateria :</label>
                <label className="toggle-container">
                  <input checked={batteryIndicator} onChange={(e) => setBatteryIndicator(!batteryIndicator)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Freno de emergencia :</label>
                <label className="toggle-container">
                  <input checked={emergencyBrake} onChange={(e) => setEmergencyBrake(!emergencyBrake)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Cojineria y sillas :</label>
                <label className="toggle-container">
                  <input checked={chairCushions} onChange={(e) => setChairCushions(!chairCushions)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Limpia parabrisas (Estado, nivel de agua) :</label>
                <label className="toggle-container">
                  <input checked={wiperWasher} onChange={(e) => setWiperWasher(!wiperWasher)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Luces internas :</label>
                <label className="toggle-container">
                  <input checked={internalLights} onChange={(e) => setInternalLights(!internalLights)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Tablero velocimetro instrumentos :</label>
                <label className="toggle-container">
                  <input checked={instrumentSpeedometerDashboard} onChange={(e) => setInstrumentSpeedometerDashboard(!instrumentSpeedometerDashboard)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Nivel de aceite Motor :</label>
                <label className="toggle-container">
                  <input checked={engineOil} onChange={(e) => setEngineOil(!engineOil)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Nivel de aceite hidráulico dirección :</label>
                <label className="toggle-container">
                  <input checked={hydraulicOilSteering} onChange={(e) => setHydraulicOilSteering(!hydraulicOilSteering)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Nivel de liquido refrigerante :</label>
                <label className="toggle-container">
                  <input checked={coolantLiquid} onChange={(e) => setCoolantLiquid(!coolantLiquid)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Nivel de liquido de frenos :</label>
                <label className="toggle-container">
                  <input checked={brakeFluid} onChange={(e) => setBrakeFluid(!brakeFluid)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Tapa de combustible :</label>
                <label className="toggle-container">
                  <input checked={fuelcap} onChange={(e) => setFuelcap(!fuelcap)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Tension de la correa :</label>
                <label className="toggle-container">
                  <input checked={beltTension} onChange={(e) => setBeltTension(!beltTension)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Vidrios y espejos :</label>
                <label className="toggle-container">
                  <input checked={mirrorGlass} onChange={(e) => setMirrorGlass(!mirrorGlass)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Luces altas y bajas :</label>
                <label className="toggle-container">
                  <input checked={highLowBeams} onChange={(e) => setHighLowBeams(!highLowBeams)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Luces direccionales (delanteras-traseras) :</label>
                <label className="toggle-container">
                  <input checked={turnSignals} onChange={(e) => setTurnSignals(!turnSignals)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Placas y logos :</label>
                <label className="toggle-container">
                  <input checked={logoPlates} onChange={(e) => setLogoPlates(!logoPlates)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Llantas (Desgaste, presión de aire) :</label>
                <label className="toggle-container">
                  <input checked={tires} onChange={(e) => setTires(!tires)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Dispositivo de velocidad :</label>
                <label className="toggle-container">
                  <input checked={deviceSpeed} onChange={(e) => setDeviceSpeed(!deviceSpeed)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Cinturones de seguridad :</label>
                <label className="toggle-container">
                  <input checked={safetyBelts} onChange={(e) => setSafetyBelts(!safetyBelts)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Botiquin :</label>
                <label className="toggle-container">
                  <input checked={firstaidkit} onChange={(e) => setFirstaidkit(!firstaidkit)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Estado de la carpa,cierres y correas :</label>
                <label className="toggle-container">
                  <input checked={largeTent} onChange={(e) => setLargeTent(!largeTent)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

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
                <label htmlFor="exampleInputEmail1">Equipo de carretera :</label>
                <label className="toggle-container">
                  <input checked={roadTeam} onChange={(e) => setRoadTeam(!roadTeam)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Llantas de repuesto :</label>
                <label className="toggle-container">
                  <input checked={spareTire} onChange={(e) => setSpareTire(!spareTire)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

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