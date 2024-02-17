import React, { useEffect, useState } from 'react'

//Hoja de estilos
import './Create.css';

// Redux
import {  useSelector,useDispatch } from "react-redux";

//Actions
import { getUserAllService } from "../../../store/action/userAction";
import { getListCheckAllService,createListCheckService } from "../../../store/action/listCheckAction";

//id de los roles
import roleService from '../../../libs/helpers/role.json';

//Alertas 
import Swal from 'sweetalert2';

function Create() {

  const { conductor } = roleService;
  const [runEffect, setRunEffect] = useState(false);
  const [createListCheck, setCreateListCheck] = useState(true);
  const [opcionUser, setOpcionUser] = useState([]);
  const [userVehicle, setUserVehicle] = useState([]);
  const [opcionSelectUser, setOpcionSelectUser] = useState('');
  const [oilChange, setOilChange] = useState("");
  const [currentKm, setCurrentKm] = useState("");
  const [observation, setObservation] = useState("");
  //ESTADO DE PRESENTACIÓN
  const [internalToilet, setInternalToilet] = useState(false);
  const [externalToilet, setExternalToilet] = useState(false);
  const [cans, setCans] = useState(false);
  const [paint, setPaint] = useState(false);
  //ESTADO DE COMODIDAD
  const [airConditioning, setAirConditioning] = useState(false);
  const [chairs, setChairs] = useState(false);
  const [lighter, setLighter] = useState(false);
  const [interiorOrCeilingLight, setInteriorOrCeilingLight] = useState(false);
  //NIVELES Y PERDIDA DE LIQUIDOS
  const [engineOilLevel, setEngineOilLevel] = useState(false);
  const [brakeFluidLevel, setBrakeFluidLevel] = useState(false);
  const [radiatorWaterLevel, setRadiatorWaterLevel] = useState(false);
  const [batteryWaterLevel, setBatteryWaterLevel] = useState(false);
  const [hydraulicOilLevel, setHydraulicOilLevel] = useState(false);
  const [acpmLeaks, setAcpmLeaks] = useState(false);
  const [waterLeaks, setWaterLeaks] = useState(false);
  const [transmissionOilLeaks, setTransmissionOilLeaks] = useState(false);
  const [boxOilLeak, setBoxOilLeak] = useState(false);
  const [brakeFluidLeaks, setBrakeFluidLeaks] = useState(false);
  //TABLERO DE CONTROL
  const [tableLight, setTableLight] = useState(false);
  const [fuelLevel, setFuelLevel] = useState(false);
  const [odometer, setOdometer] = useState(false);
  const [whistle, setWhistle] = useState(false);
  const [tachometer, setTachometer] = useState(false);
  const [speedometer, setSpeedometer] = useState(false);
  const [oilIndicator, setOilIndicator] = useState(false);
  const [temperatureIndicator, setTemperatureIndicator] = useState(false);
  //SEGURIDAD PASIVA
  const [seatBelts, setSeatBelts] = useState(false);
  const [airbags, setAirbags] = useState(false);
  const [crystals, setCrystals] = useState(false);
  const [headrest, setHeadrest] = useState(false);
  const [mirrorStatus, setMirrorStatus] = useState(false);
  const [rightSideMirror, setRightSideMirror] = useState(false);
  const [leftSideMirror, setLeftSideMirror] = useState(false);
  const [rearViewMirror, setRearViewMirror] = useState(false);
  //SEGURIDAD ACTIVA
  const [addressStatus, setAddressStatus] = useState(false);
  const [frontSuspensionCondition, setFrontSuspensionCondition] = useState(false);
  const [shockAbsorbers, setShockAbsorbers] = useState(false);
  const [rearSuspensionStatus, setRearSuspensionStatus] = useState(false);
  const [windshieldCondition, setWindshieldCondition] = useState(false);
  const [frontGlass, setFrontGlass] = useState(false);
  //ESTADO LUCES
  const [mediumLights, setMediumLights] = useState(false);
  const [highBeams, setHighBeams] = useState(false);
  const [lowLights, setLowLights] = useState(false);
  const [leftDirectionalFront, setLeftDirectionalFront] = useState(false);
  const [directionalRightFront, setDirectionalRightFront] = useState(false);
  const [leftDirectionalRear, setLeftDirectionalRear] = useState(false);
  const [directionalRightRear, setDirectionalRightRear] = useState(false);
  const [parkingLights, setParkingLights] = useState(false);
  const [brakeLight, setBrakeLight] = useState(false);
  const [reverseLight, setReverseLight] = useState(false);
  const [explorerFogLights, setExplorerFogLights] = useState(false);
  //ESTADO LLANTAS
  const [rightFront, setRightFront] = useState(false);
  const [leftFront, setLeftFront] = useState(false);
  const [rightRear, setRightRear] = useState(false);
  const [rearLeft, setRearLeft] = useState(false);
  const [replacement, setReplacement] = useState(false);
  const [tireAirPressure, setTireAirPressure] = useState(false);
  //FRENOS
  const [brakeCondition, setBrakeCondition] = useState(false);
  const [handBrake, setHandBrake] = useState(false);
  const [tablets, setTablets] = useState(false);
  //EQUIPO DE CARRETERA
  const [oneJackWithTheCapacityToRaiseTheVehicle, setOneJackWithTheCapacityToRaiseTheVehicle] = useState(false);
  const [oneReflectiveVest, setOneReflectiveVest] = useState(false);
  const [twoBlocksToBlockTheVehicle, setTwoBlocksToBlockTheVehicle] = useState(false);
  const [twoRoadSigns, setTwoRoadSigns] = useState(false);
  const [onePairOfIndustrialGloves, setOnePairOfIndustrialGloves] = useState(false);
  const [oneCrosshead, setOneCrosshead] = useState(false);
  const [fireExtinguisher, setFireExtinguisher] = useState(false);
  const [flashLight, setFlashLight] = useState(false);
  const [toolBox, setToolBox] = useState(false);
  const [firstAidKit, setFirstAidKit] = useState(false);
  //DOCUMENTOS DEL VEHÍCULO
  const [soat, setSoat] = useState(false);
  const [technomechanicalReviewAndGasCertification, setTechnomechanicalReviewAndGasCertification] = useState(false);
  const [contractualAndNonContractualInsurance, setContractualAndNonContractualInsurance] = useState(false);
  const [preventive, setPreventive] = useState(false);
  const [operationCard, setOperationCard] = useState(false);
  const [propertyCard, setPropertyCard] = useState(false);
  const [drivingLicense, setDrivingLicense] = useState(false);
  //end
  const [errorUser, setErrorUser] = useState("");
  const [errorOilChange, setErrorOilChange] = useState("");
  const [errorCurrentKm, setErrorCurrentKm] = useState("");
  const dataListUser = useSelector((store) => store.userReducer);
  const dataListLogin = useSelector((store) => store.loginReducer);
  const dataListListCheck = useSelector((store) => store.listCheckReducer);
  const dispatch = useDispatch();
  
  useEffect(() => {
    try {
      dispatch(getUserAllService())
      dispatch(getListCheckAllService())
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  //valida si el vehiculo ya registro una lista de chequeo el dia actual
  useEffect(() => {
    try {

      if(dataListListCheck.data.length > 0 && runEffect !== true) {

        //Realiza un filtro para la informacion
        const resultadosFiltrados = dataListListCheck.data.filter(objeto => objeto.userVehicle[0]._id === dataListLogin.data.response.data._id);

        // Ordena la matriz de objetos según la fecha
        resultadosFiltrados.sort(function(a, b) {
          // Convierte las cadenas de fecha en objetos de fecha para comparar
          let dateA = parseDate(a.date);
          let dateB = parseDate(b.date);
          // Compara las fechas
          return dateB - dateA; // De mayor a menor
        });

        // Compara la fecha de la ultima lista de chequeo de este usuario y la fecha actual
        let dateNow = date();
        let dates = setSpace(resultadosFiltrados[0].date);

        if (dates[0] === dateNow) {
          Swal.fire({
            title: "Preoperacional ya realizada!",
            text: "Este vehiculo , ya realizo su lista del día",
            icon: "warning"
          });
          setCreateListCheck(false);
        } else {
          setCreateListCheck(true);
        }

        setRunEffect(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dataListListCheck,dataListLogin,runEffect])
  
  // Carga las otras listas
  useEffect(() => {
    let resultadosFiltrados = dataListUser.data.filter(objeto => objeto.role[0]._id === conductor && objeto.show === "Si");
    setOpcionUser(resultadosFiltrados);
    setUserVehicle(dataListLogin.data.response.data._id);
  }, [dataListLogin,dataListUser,conductor])

  const date = () => {
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Formatear manualmente la fecha según el formato deseado
    const year = fechaActual.getFullYear();
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses son indexados desde 0
    const day = fechaActual.getDate().toString().padStart(2, '0');

    const fechaFormateada = `${day}-${month}-${year}`;
    return fechaFormateada;
  }

  // Función para convertir una cadena de fecha en un objeto Date
  const parseDate = (str) => {
    let parts = str.split(/[- :]/);
    // Asegúrate de usar el formato adecuado para el objeto Date
    return new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4]);
  }

  // Función para separar una cadena por espacios
  const setSpace = (str) => {
    let parts = str.split(/[ ]/);
    return parts
  }

  const resetInput = () => {
    //revision Interna
    // setWiperWasher(false);

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

    // Obtener la hora actual en Colombia
    const options = { timeZone: 'America/Bogota', hour12: true, hour: 'numeric', minute: 'numeric' };
    const horaActual = fechaActual.toLocaleTimeString('en-US', options);

    const fechaFormateada = `${day}-${month}-${year} ${horaActual}`;
    return fechaFormateada;
  }

  const setChangeToogle = () => {
    let body = {
       //revision Interna
      // wiperWasher:wiperWasher,
      
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
    if(createListCheck === true){
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
          observation:observation,
      }
        const objetoCombinado = { ...body, ...setChangeToogles };
        let response = await dispatch(createListCheckService(objetoCombinado));
        if(response.error === undefined){
          switch (response.response.status) {
            case 201:
                resetInput();
                setCreateListCheck(false);
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
    } else {
      Swal.fire({
        title: "Preoperacional ya realizada!",
        text: "Este vehiculo , ya realizo su lista del día",
        icon: "warning"
      });
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

              {/* ESTADO DE PRESENTACIÓN */}

            <h1 className="text-primary">Estado de presentación</h1>
    
            <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Aseo interno :</label>
                <label className="toggle-container">
                  <input checked={internalToilet} onChange={(e) => setInternalToilet(!internalToilet)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Aseo externo :</label>
                <label className="toggle-container">
                  <input checked={externalToilet} onChange={(e) => setExternalToilet(!externalToilet)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Latas :</label>
                <label className="toggle-container">
                  <input checked={cans} onChange={(e) => setCans(!cans)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Pintura :</label>
                <label className="toggle-container">
                  <input checked={paint} onChange={(e) => setPaint(!paint)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              {/* ESTADO DE COMODIDAD */}

              <h1 className="text-primary">Estado de comodidad</h1>
            
              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Aire acondicionado :</label>
                <label className="toggle-container">
                  <input checked={airConditioning} onChange={(e) => setAirConditioning(!airConditioning)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Silletería :</label>
                <label className="toggle-container">
                  <input checked={chairs} onChange={(e) => setChairs(!chairs)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Encendedor :</label>
                <label className="toggle-container">
                  <input checked={lighter} onChange={(e) => setLighter(!lighter)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Luz Interior o de techo :</label>
                <label className="toggle-container">
                  <input checked={interiorOrCeilingLight} onChange={(e) => setInteriorOrCeilingLight(!interiorOrCeilingLight)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              {/* NIVELES Y PERDIDA DE LIQUIDOS */}

              <h1 className="text-primary">Niveles y perdida de liquidos</h1>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Nivel de Aceite de motor :</label>
                <label className="toggle-container">
                  <input checked={engineOilLevel} onChange={(e) => setEngineOilLevel(!engineOilLevel)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Nivel de liquido de frenos :</label>
                <label className="toggle-container">
                  <input checked={brakeFluidLevel} onChange={(e) => setBrakeFluidLevel(!brakeFluidLevel)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Nivel de agua del radiador :</label>
                <label className="toggle-container">
                  <input checked={radiatorWaterLevel} onChange={(e) => setRadiatorWaterLevel(!radiatorWaterLevel)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Nivel de agua de la batería :</label>
                <label className="toggle-container">
                  <input checked={batteryWaterLevel} onChange={(e) => setBatteryWaterLevel(!batteryWaterLevel)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Nivel de aceite hidráulico :</label>
                <label className="toggle-container">
                  <input checked={hydraulicOilLevel} onChange={(e) => setHydraulicOilLevel(!hydraulicOilLevel)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Fugas de A.C.P.M :</label>
                <label className="toggle-container">
                  <input checked={acpmLeaks} onChange={(e) => setAcpmLeaks(!acpmLeaks)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Fugas de Agua :</label>
                <label className="toggle-container">
                  <input checked={waterLeaks} onChange={(e) => setWaterLeaks(!waterLeaks)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Fugas de Aceite de transmisión :</label>
                <label className="toggle-container">
                  <input checked={transmissionOilLeaks} onChange={(e) => setTransmissionOilLeaks(!transmissionOilLeaks)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Fuga aceite de caja :</label>
                <label className="toggle-container">
                  <input checked={boxOilLeak} onChange={(e) => setBoxOilLeak(!boxOilLeak)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Fugas de líquidos de frenos :</label>
                <label className="toggle-container">
                  <input checked={brakeFluidLeaks} onChange={(e) => setBrakeFluidLeaks(!brakeFluidLeaks)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              {/* TABLERO DE CONTROL */}

              <h1 className="text-primary">Tablero y control</h1>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Luces de Tablero :</label>
                <label className="toggle-container">
                  <input checked={tableLight} onChange={(e) => setTableLight(!tableLight)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Nivel de Combustible :</label>
                <label className="toggle-container">
                  <input checked={fuelLevel} onChange={(e) => setFuelLevel(!fuelLevel)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Odómetro :</label>
                <label className="toggle-container">
                  <input checked={odometer} onChange={(e) => setOdometer(!odometer)} type="checkbox" className="toggle-checkbox" />
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
                <label htmlFor="exampleInputEmail1">Tacómetro :</label>
                <label className="toggle-container">
                  <input checked={tachometer} onChange={(e) => setTachometer(!tachometer)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Velocímetro :</label>
                <label className="toggle-container">
                  <input checked={speedometer} onChange={(e) => setSpeedometer(!speedometer)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Indicador de Aceite :</label>
                <label className="toggle-container">
                  <input checked={oilIndicator} onChange={(e) => setOilIndicator(!oilIndicator)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Indicador de Temperatura :</label>
                <label className="toggle-container">
                  <input checked={temperatureIndicator} onChange={(e) => setTemperatureIndicator(!temperatureIndicator)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>
              
              {/* SEGURIDAD PASIVA */}

              <h1 className="text-primary">Seguridad pasiva</h1>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Cinturones de Seguridad :</label>
                <label className="toggle-container">
                  <input checked={seatBelts} onChange={(e) => setSeatBelts(!seatBelts)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Airbags :</label>
                <label className="toggle-container">
                  <input checked={airbags} onChange={(e) => setAirbags(!airbags)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Cristales (Vidrios) :</label>
                <label className="toggle-container">
                  <input checked={crystals} onChange={(e) => setCrystals(!crystals)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Apoyacabezas :</label>
                <label className="toggle-container">
                  <input checked={headrest} onChange={(e) => setHeadrest(!headrest)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Estado Espejos :</label>
                <label className="toggle-container">
                  <input checked={mirrorStatus} onChange={(e) => setMirrorStatus(!mirrorStatus)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Espejo Lateral Derecho :</label>
                <label className="toggle-container">
                  <input checked={rightSideMirror} onChange={(e) => setRightSideMirror(!rightSideMirror)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Espejo Lateral Izquierdo :</label>
                <label className="toggle-container">
                  <input checked={leftSideMirror} onChange={(e) => setLeftSideMirror(!leftSideMirror)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Espejo Retrovisor :</label>
                <label className="toggle-container">
                  <input checked={rearViewMirror} onChange={(e) => setRearViewMirror(!rearViewMirror)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              {/* SEGURIDAD ACTIVA */}

              <h1 className="text-primary">Seguridad activa</h1>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Estado de la Dirección :</label>
                <label className="toggle-container">
                  <input checked={addressStatus} onChange={(e) => setAddressStatus(!addressStatus)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Estado Suspensión Delantera :</label>
                <label className="toggle-container">
                  <input checked={frontSuspensionCondition} onChange={(e) => setFrontSuspensionCondition(!frontSuspensionCondition)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Amortiguadores :</label>
                <label className="toggle-container">
                  <input checked={shockAbsorbers} onChange={(e) => setShockAbsorbers(!shockAbsorbers)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Estado suspensión Trasera :</label>
                <label className="toggle-container">
                  <input checked={rearSuspensionStatus} onChange={(e) => setRearSuspensionStatus(!rearSuspensionStatus)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Estado Parabrisas :</label>
                <label className="toggle-container">
                  <input checked={windshieldCondition} onChange={(e) => setWindshieldCondition(!windshieldCondition)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Vidrio Frontal :</label>
                <label className="toggle-container">
                  <input checked={frontGlass} onChange={(e) => setFrontGlass(!frontGlass)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              {/* ESTADO LUCES */}

              <h1 className="text-primary">Estado luces</h1>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Luces Medias :</label>
                <label className="toggle-container">
                  <input checked={mediumLights} onChange={(e) => setMediumLights(!mediumLights)} type="checkbox" className="toggle-checkbox" />
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
                <label htmlFor="exampleInputEmail1">Direccional Izquie. Delant. :</label>
                <label className="toggle-container">
                  <input checked={leftDirectionalFront} onChange={(e) => setLeftDirectionalFront(!leftDirectionalFront)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Direccional Derec. Delant. :</label>
                <label className="toggle-container">
                  <input checked={directionalRightFront} onChange={(e) => setDirectionalRightFront(!directionalRightFront)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Direccional Izquie. Trasera :</label>
                <label className="toggle-container">
                  <input checked={leftDirectionalRear} onChange={(e) => setLeftDirectionalRear(!leftDirectionalRear)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Direccional Derec. Trasera :</label>
                <label className="toggle-container">
                  <input checked={directionalRightRear} onChange={(e) => setDirectionalRightRear(!directionalRightRear)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Luces de Parqueo :</label>
                <label className="toggle-container">
                  <input checked={parkingLights} onChange={(e) => setParkingLights(!parkingLights)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Luz Freno :</label>
                <label className="toggle-container">
                  <input checked={brakeLight} onChange={(e) => setBrakeLight(!brakeLight)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Luz Reverso :</label>
                <label className="toggle-container">
                  <input checked={reverseLight} onChange={(e) => setReverseLight(!reverseLight)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">L. Antiniebla Exploradoras :</label>
                <label className="toggle-container">
                  <input checked={explorerFogLights} onChange={(e) => setExplorerFogLights(!explorerFogLights)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              {/* ESTADO LLANTAS */}

              <h1 className="text-primary">Estado llantas</h1>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Delantera Derecha :</label>
                <label className="toggle-container">
                  <input checked={rightFront} onChange={(e) => setRightFront(!rightFront)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Delantera Izquierda :</label>
                <label className="toggle-container">
                  <input checked={leftFront} onChange={(e) => setLeftFront(!leftFront)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Trasera Derecha :</label>
                <label className="toggle-container">
                  <input checked={rightRear} onChange={(e) => setRightRear(!rightRear)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Trasera Izquierda :</label>
                <label className="toggle-container">
                  <input checked={rearLeft} onChange={(e) => setRearLeft(!rearLeft)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Repuesto :</label>
                <label className="toggle-container">
                  <input checked={replacement} onChange={(e) => setReplacement(!replacement)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Presión aire llanta :</label>
                <label className="toggle-container">
                  <input checked={tireAirPressure} onChange={(e) => setTireAirPressure(!tireAirPressure)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>
              
              {/* FRENOS */}

              <h1 className="text-primary">Frenos</h1>
             
              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Estado de los Frenos :</label>
                <label className="toggle-container">
                  <input checked={brakeCondition} onChange={(e) => setBrakeCondition(!brakeCondition)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Freno de Mano :</label>
                <label className="toggle-container">
                  <input checked={handBrake} onChange={(e) => setHandBrake(!handBrake)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Pastillas :</label>
                <label className="toggle-container">
                  <input checked={tablets} onChange={(e) => setTablets(!tablets)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              {/* EQUIPO DE CARRETERA */}

              <h1 className="text-primary">Equipo de carretera</h1>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">1 gato con capacidad para elevar el vehículo :</label>
                <label className="toggle-container">
                  <input checked={oneJackWithTheCapacityToRaiseTheVehicle} onChange={(e) => setOneJackWithTheCapacityToRaiseTheVehicle(!oneJackWithTheCapacityToRaiseTheVehicle)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">1 chaleco reflectivo :</label>
                <label className="toggle-container">
                  <input checked={oneReflectiveVest} onChange={(e) => setOneReflectiveVest(!oneReflectiveVest)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">2 tacos para bloquear el vehículo :</label>
                <label className="toggle-container">
                  <input checked={twoBlocksToBlockTheVehicle} onChange={(e) => setTwoBlocksToBlockTheVehicle(!twoBlocksToBlockTheVehicle)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">2 señales de carretera; conos o triangulos :</label>
                <label className="toggle-container">
                  <input checked={twoRoadSigns} onChange={(e) => setTwoRoadSigns(!twoRoadSigns)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">1 par de guantes industriales :</label>
                <label className="toggle-container">
                  <input checked={onePairOfIndustrialGloves} onChange={(e) => setOnePairOfIndustrialGloves(!onePairOfIndustrialGloves)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">1 cruceta :</label>
                <label className="toggle-container">
                  <input checked={oneCrosshead} onChange={(e) => setOneCrosshead(!oneCrosshead)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Extinguidor de fuego( capacidad mín. 5 lb) :</label>
                <label className="toggle-container">
                  <input checked={fireExtinguisher} onChange={(e) => setFireExtinguisher(!fireExtinguisher)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Linterna :</label>
                <label className="toggle-container">
                  <input checked={flashLight} onChange={(e) => setFlashLight(!flashLight)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">caja de herramientas (alicates, destornilladores de pala y estrella, llave de expansión y fijas) :</label>
                <label className="toggle-container">
                  <input checked={toolBox} onChange={(e) => setToolBox(!toolBox)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Botiquín de primeros auxilios :</label>
                <label className="toggle-container">
                  <input checked={firstAidKit} onChange={(e) => setFirstAidKit(!firstAidKit)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>              

              {/* DOCUMENTOS DEL VEHÍCULO */}

              <h1 className="text-primary">Documentos del vehiculo</h1>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Soat :</label>
                <label className="toggle-container">
                  <input checked={soat} onChange={(e) => setSoat(!soat)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Revisión Tecnomecánica y Certificación de Gases :</label>
                <label className="toggle-container">
                  <input checked={technomechanicalReviewAndGasCertification} onChange={(e) => setTechnomechanicalReviewAndGasCertification(!technomechanicalReviewAndGasCertification)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Seguro contractual y extracontractual :</label>
                <label className="toggle-container">
                  <input checked={contractualAndNonContractualInsurance} onChange={(e) => setContractualAndNonContractualInsurance(!contractualAndNonContractualInsurance)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Preventiva :</label>
                <label className="toggle-container">
                  <input checked={preventive} onChange={(e) => setPreventive(!preventive)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Tarjeta de operación :</label>
                <label className="toggle-container">
                  <input checked={operationCard} onChange={(e) => setOperationCard(!operationCard)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Tarjeta de propiedad :</label>
                <label className="toggle-container">
                  <input checked={propertyCard} onChange={(e) => setPropertyCard(!propertyCard)} type="checkbox" className="toggle-checkbox" />
                  <div className="toggle-slider"></div>
                </label>
              </div>

              <div className='mt-4 listCheck-create-main-input'>
                <label htmlFor="exampleInputEmail1">Licencia de conducción :</label>
                <label className="toggle-container">
                  <input checked={drivingLicense} onChange={(e) => setDrivingLicense(!drivingLicense)} type="checkbox" className="toggle-checkbox" />
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