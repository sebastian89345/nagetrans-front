import React,{ useState,useEffect } from 'react'

//Hoja de estilos
import './Update.css';

// Redux
import {  useSelector,useDispatch } from "react-redux";

//Reducers
import { getUserAllService } from "../../../store/action/userAction";
import { updateListCheckService } from "../../../store/action/listCheckAction";

//Alertas 
import Swal from 'sweetalert2';

//Imagenes
import arrow from '../../../assets/img/bx-chevron-left.svg';

//id de los roles
import roleService from '../../../libs/helpers/role.json';

function Update({ infoUpdate,setView,getAll }) {

  const { conductor } = roleService;
  const [opcionUser, setOpcionUserS] = useState([]);
  const [opcionSelectUser, setOpcionSelectUser] = useState('');

  const [oilChange, setOilChange] = useState("");
  const [currentKm, setCurrentKm] = useState("");
  const [dateExtinguisherExpiration, setDateExtinguisherExpiration] = useState("");
  const [observation, setObservation] = useState("");

  const [opcionEngineOilIndicator, setOpcionEngineOilIndicator] = useState([]);
  const [opcionFuelLevel, setOpcionFuelLevel] = useState([]);
  const [opcionWhistle, setOpcionWhistle] = useState([]);
  const [opcionBatteryIndicator, setOpcionBatteryIndicator] = useState([]);
  const [opcionEmergencyBrake, setOpcionEmergencyBrake] = useState([]);
  const [opcionChairCushions, setOpcionChairCushions] = useState([]);
  const [opcionWiperWasher, setOpcionWiperWasher] = useState([]);
  const [opcionInternalLights, setOpcionInternalLights] = useState([]);
  const [opcionInstrumentSpeedometerDashboard, setOpcionInstrumentSpeedometerDashboard] = useState([]);
  const [opcionEngineOil, setOpcionEngineOil] = useState([]);
  const [opcionHydraulicOilSteering, setOpcionHydraulicOilSteering] = useState([]);
  const [opcionCoolantLiquid, setOpcionCoolantLiquid] = useState([]);
  const [opcionBrakeFluid, setOpcionBrakeFluid] = useState([]);
  const [opcionFuelcap, setOpcionFuelcap] = useState([]);
  const [opcionBeltTension, setOpcionBeltTension] = useState([]);
  const [opcionMirrorGlass, setOpcionMirrorGlass] = useState([]);
  const [opcionHighLowBeams, setOpcionHighLowBeams] = useState([]);
  const [opcionTurnSignals, setOpcionTurnSignals] = useState([]);
  const [opcionLogoPlates, setOpcionLogoPlates] = useState([]);
  const [opcionTires, setOpcionTires] = useState([]);
  const [opcionDeviceSpeed, setOpcionDeviceSpeed] = useState([]);
  const [opcionSafetyBelts, setOpcionSafetyBelts] = useState([]);
  const [opcionFirstaidkit, setOpcionFirstaidkit] = useState([]);
  const [opcionLargeTent, setOpcionLargeTent] = useState([]);
  const [opcionExtinguisher, setOpcionExtinguisher] = useState([]);
  const [opcionRoadTeam, setOpcionRoadTeam] = useState([]);
  const [opcionSpareTire, setOpcionSpareTire] = useState([]);
  const [opcionSelectEngineOilIndicator, setOpcionSelectEngineOilIndicator] = useState('');
  const [opcionSelectFuelLevel, setOpcionSelectFuelLevel] = useState('');
  const [opcionSelectWhistle, setOpcionSelectWhistle] = useState('');
  const [opcionSelectBatteryIndicator, setOpcionSelectBatteryIndicator] = useState('');
  const [opcionSelectEmergencyBrake, setOpcionSelectEmergencyBrake] = useState('');
  const [opcionSelectChairCushions, setOpcionSelectChairCushions] = useState('');
  const [opcionSelectWiperWasher, setOpcionSelectWiperWasher] = useState('');
  const [opcionSelectInternalLights, setOpcionSelectInternalLights] = useState('');
  const [opcionSelectInstrumentSpeedometerDashboard, setOpcionSelectInstrumentSpeedometerDashboard] = useState('');
  const [opcionSelectEngineOil, setOpcionSelectEngineOil] = useState('');
  const [opcionSelectHydraulicOilSteering, setOpcionSelectHydraulicOilSteering] = useState('');
  const [opcionSelectCoolantLiquid, setOpcionSelectCoolantLiquid] = useState('');
  const [opcionSelectBrakeFluid, setOpcionSelectBrakeFluid] = useState('');
  const [opcionSelectFuelcap, setOpcionSelectFuelcap] = useState('');
  const [opcionSelectBeltTension, setOpcionSelectBeltTension] = useState('');
  const [opcionSelectMirrorGlass, setOpcionSelectMirrorGlass] = useState('');
  const [opcionSelectHighLowBeams, setOpcionSelectHighLowBeams] = useState('');
  const [opcionSelectTurnSignals, setOpcionSelectTurnSignals] = useState('');
  const [opcionSelectLogoPlates, setOpcionSelectLogoPlates] = useState('');
  const [opcionSelectTires, setOpcionSelectTires] = useState('');
  const [opcionSelectDeviceSpeed, setOpcionSelectDeviceSpeed] = useState('');
  const [opcionSelectSafetyBelts, setOpcionSelectSafetyBelts] = useState('');
  const [opcionSelectFirstaidkit, setOpcionSelectFirstaidkit] = useState('');
  const [opcionSelectLargeTent, setOpcionSelectLargeTent] = useState('');
  const [opcionSelectExtinguisher, setOpcionSelectExtinguisher] = useState('');
  const [opcionSelectRoadTeam, setOpcionSelectRoadTeam] = useState('');
  const [opcionSelectSpareTire, setOpcionSelectSpareTire] = useState('');
  const [errorUser, setErrorUser] = useState("");
  const [errorDateExtinguisherExpiration, setErrorDateExtinguisherExpiration] = useState("");
  const [errorOilChange, setErrorOilChange] = useState("");
  const [errorCurrentKm, setErrorCurrentKm] = useState("");
  const dataListUser = useSelector((store) => store.userReducer);
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
    setOpcionUserS(resultadosFiltrados);
    setOpcionEngineOilIndicator([{value:"Bueno"},{value:"Malo"}]);
    setOpcionFuelLevel([{value:"Bueno"},{value:"Malo"}]);
    setOpcionWhistle([{value:"Bueno"},{value:"Malo"}]);
    setOpcionBatteryIndicator([{value:"Bueno"},{value:"Malo"}]);
    setOpcionEmergencyBrake([{value:"Bueno"},{value:"Malo"}]);
    setOpcionChairCushions([{value:"Bueno"},{value:"Malo"}]);
    setOpcionWiperWasher([{value:"Bueno"},{value:"Malo"}]);
    setOpcionInternalLights([{value:"Bueno"},{value:"Malo"}]);
    setOpcionInstrumentSpeedometerDashboard([{value:"Bueno"},{value:"Malo"}]);
    setOpcionEngineOil([{value:"Bueno"},{value:"Malo"}]);
    setOpcionHydraulicOilSteering([{value:"Bueno"},{value:"Malo"}]);
    setOpcionCoolantLiquid([{value:"Bueno"},{value:"Malo"}]);
    setOpcionBrakeFluid([{value:"Bueno"},{value:"Malo"}]);
    setOpcionFuelcap([{value:"Bueno"},{value:"Malo"}]);
    setOpcionBeltTension([{value:"Bueno"},{value:"Malo"}]);
    setOpcionMirrorGlass([{value:"Bueno"},{value:"Malo"}]);
    setOpcionHighLowBeams([{value:"Bueno"},{value:"Malo"}]);
    setOpcionTurnSignals([{value:"Bueno"},{value:"Malo"}]);
    setOpcionLogoPlates([{value:"Bueno"},{value:"Malo"}]);
    setOpcionTires([{value:"Bueno"},{value:"Malo"}]);
    setOpcionDeviceSpeed([{value:"Bueno"},{value:"Malo"}]);
    setOpcionSafetyBelts([{value:"Bueno"},{value:"Malo"}]);
    setOpcionFirstaidkit([{value:"Bueno"},{value:"Malo"}]);
    setOpcionLargeTent([{value:"Bueno"},{value:"Malo"}]);
    setOpcionExtinguisher([{value:"Bueno"},{value:"Malo"}]);
    setOpcionRoadTeam([{value:"Bueno"},{value:"Malo"}]);
    setOpcionSpareTire([{value:"Bueno"},{value:"Malo"}]);
  }, [dataListUser,conductor])

  useEffect(() => {
    setOpcionSelectUser(infoUpdate.item.userDriver[0]._id);  
    setOpcionSelectEngineOilIndicator(infoUpdate.item.engineOilIndicator);
    setOpcionSelectFuelLevel(infoUpdate.item.fuelLevel);
    setOpcionSelectWhistle(infoUpdate.item.whistle);
    setOpcionSelectBatteryIndicator(infoUpdate.item.batteryIndicator);
    setOpcionSelectEmergencyBrake(infoUpdate.item.emergencyBrake);
    setOpcionSelectChairCushions(infoUpdate.item.chairCushions);
    setOpcionSelectWiperWasher(infoUpdate.item.wiperWasher);
    setOpcionSelectInternalLights(infoUpdate.item.internalLights);
    setOpcionSelectInstrumentSpeedometerDashboard(infoUpdate.item.instrumentSpeedometerDashboard);
    setOpcionSelectEngineOil(infoUpdate.item.engineOil);
    setOpcionSelectHydraulicOilSteering(infoUpdate.item.hydraulicOilSteering);
    setOpcionSelectCoolantLiquid(infoUpdate.item.coolantLiquid);
    setOpcionSelectBrakeFluid(infoUpdate.item.brakeFluid);
    setOpcionSelectFuelcap(infoUpdate.item.fuelcap);
    setOpcionSelectBeltTension(infoUpdate.item.beltTension);
    setOpcionSelectMirrorGlass(infoUpdate.item.mirrorGlass);
    setOpcionSelectHighLowBeams(infoUpdate.item.highLowBeams);
    setOpcionSelectTurnSignals(infoUpdate.item.turnSignals);
    setOpcionSelectLogoPlates(infoUpdate.item.logoPlates);
    setOpcionSelectTires(infoUpdate.item.tires);
    setOpcionSelectDeviceSpeed(infoUpdate.item.deviceSpeed);
    setOpcionSelectSafetyBelts(infoUpdate.item.safetyBelts);
    setOpcionSelectFirstaidkit(infoUpdate.item.firstaidkit);
    setOpcionSelectLargeTent(infoUpdate.item.largeTent);
    setOpcionSelectExtinguisher(infoUpdate.item.extinguisher);
    setOpcionSelectRoadTeam(infoUpdate.item.roadTeam);
    setOpcionSelectSpareTire(infoUpdate.item.spareTire);
    setOilChange(infoUpdate.item.oilChange);
    setCurrentKm(infoUpdate.item.currentKm);
    setDateExtinguisherExpiration(infoUpdate.item.dateExtinguisherExpiration);
    setObservation(infoUpdate.item.observation);
  }, [infoUpdate])
  
  const returnWindow = () => {
    setView({list:true});
    getAll();
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

  const edit = async () => {
    let validates = validate();
    if (validates) {

    }
  }

  return (
    <div className='listCheck-update-card-main'>
        <div className='listCheck-update-card card'>
            <div className='card-body'>
              <div>
                <img onClick={returnWindow} src={arrow} className='listCheck-update-img' alt='img' />
              </div>
              <div className=' text-center'>
                <p className='listCheck-update-title'>Editar una preoperacional</p>
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

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Indicador de aceite de motor :</label>
                <select value={opcionSelectEngineOilIndicator} onChange={(e) => setOpcionSelectEngineOilIndicator(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionEngineOilIndicator.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Nivel de combustible :</label>
                <select value={opcionSelectFuelLevel} onChange={(e) => setOpcionSelectFuelLevel(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionFuelLevel.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Pito :</label>
                <select value={opcionSelectWhistle} onChange={(e) => setOpcionSelectWhistle(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionWhistle.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Indicador de bateria :</label>
                <select value={opcionSelectBatteryIndicator} onChange={(e) => setOpcionSelectBatteryIndicator(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionBatteryIndicator.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Freno de emergencia :</label>
                <select value={opcionSelectEmergencyBrake} onChange={(e) => setOpcionSelectEmergencyBrake(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionEmergencyBrake.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Cojineria y sillas :</label>
                <select value={opcionSelectChairCushions} onChange={(e) => setOpcionSelectChairCushions(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionChairCushions.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Limpia parabrisas (Estado, nivel de agua) :</label>
                <select value={opcionSelectWiperWasher} onChange={(e) => setOpcionSelectWiperWasher(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionWiperWasher.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Luces internas :</label>
                <select value={opcionSelectInternalLights} onChange={(e) => setOpcionSelectInternalLights(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionInternalLights.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Tablero velocimetro instrumentos :</label>
                <select value={opcionSelectInstrumentSpeedometerDashboard} onChange={(e) => setOpcionSelectInstrumentSpeedometerDashboard(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionInstrumentSpeedometerDashboard.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Nivel de aceite Motor :</label>
                <select value={opcionSelectEngineOil} onChange={(e) => setOpcionSelectEngineOil(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionEngineOil.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Nivel de aceite hidráulico dirección :</label>
                <select value={opcionSelectHydraulicOilSteering} onChange={(e) => setOpcionSelectHydraulicOilSteering(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionHydraulicOilSteering.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Nivel de liquido refrigerante :</label>
                <select value={opcionSelectCoolantLiquid} onChange={(e) => setOpcionSelectCoolantLiquid(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionCoolantLiquid.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Nivel de liquido de frenos :</label>
                <select value={opcionSelectBrakeFluid} onChange={(e) => setOpcionSelectBrakeFluid(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionBrakeFluid.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Tapa de combustible :</label>
                <select value={opcionSelectFuelcap} onChange={(e) => setOpcionSelectFuelcap(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionFuelcap.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              {/*  */}

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Tension de la correa :</label>
                <select value={opcionSelectBeltTension} onChange={(e) => setOpcionSelectBeltTension(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionBeltTension.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Tension de la correa :</label>
                <select value={opcionSelectMirrorGlass} onChange={(e) => setOpcionSelectMirrorGlass(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionMirrorGlass.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Luces altas y bajas :</label>
                <select value={opcionSelectHighLowBeams} onChange={(e) => setOpcionSelectHighLowBeams(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionHighLowBeams.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Luces direccionales (delanteras-traseras) :</label>
                <select value={opcionSelectTurnSignals} onChange={(e) => setOpcionSelectTurnSignals(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionTurnSignals.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Placas y logos :</label>
                <select value={opcionSelectLogoPlates} onChange={(e) => setOpcionSelectLogoPlates(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionLogoPlates.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Llantas (Desgaste, presión de aire) :</label>
                <select value={opcionSelectTires} onChange={(e) => setOpcionSelectTires(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionTires.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Dispositivo de velocidad :</label>
                <select value={opcionSelectDeviceSpeed} onChange={(e) => setOpcionSelectDeviceSpeed(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionDeviceSpeed.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Cinturones de seguridad :</label>
                <select value={opcionSelectSafetyBelts} onChange={(e) => setOpcionSelectSafetyBelts(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionSafetyBelts.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Botiquin :</label>
                <select value={opcionSelectFirstaidkit} onChange={(e) => setOpcionSelectFirstaidkit(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionFirstaidkit.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Estado de la carpa,cierres y correas :</label>
                <select value={opcionSelectLargeTent} onChange={(e) => setOpcionSelectLargeTent(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionLargeTent.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Extintor :</label>
                <select value={opcionSelectExtinguisher} onChange={(e) => setOpcionSelectExtinguisher(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionExtinguisher.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Vencimiento extintor :</label>
                <input value={dateExtinguisherExpiration} onChange={(e) => setDateExtinguisherExpiration(e.target.value)} type="date" className='listCheck-create-input form-control' />
              </div>

              <div className='mt-4'>
                {errorDateExtinguisherExpiration && <p style={{ color: 'red' }}>{errorDateExtinguisherExpiration}</p>}
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Equipo de carretera :</label>
                <select value={opcionSelectRoadTeam} onChange={(e) => setOpcionSelectRoadTeam(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionRoadTeam.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-4 listCheck-create-main-input form-group'>
                <label htmlFor="exampleInputEmail1">Llantas de repuesto :</label>
                <select value={opcionSelectSpareTire} onChange={(e) => setOpcionSelectSpareTire(e.target.value)} className='listCheck-create-input form-control'>
                  {opcionSpareTire.map((opcion, index) => (
                    <option key={index} value={opcion._id}>
                      {opcion.value}
                    </option>
                  ))}
                </select>
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
                <button onClick={edit} type="button" className="listCheck-update-button btn btn-primary">Guardar</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Update