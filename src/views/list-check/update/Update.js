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
  const [observation, setObservation] = useState("");
  //ESTADO DE PRESENTACIÓN
  const [opcionInternalToilet, setOpcionInternalToilet] = useState([]);
  const [opcionExternalToilet, setOpcionExternalToilet] = useState([]);
  const [opcionCans, setOpcionCans] = useState([]);
  const [opcionPaint, setOpcionPaint] = useState([]);
  //ESTADO DE COMODIDAD
  const [opcionAirConditioning, setOpcionAirConditioning] = useState([]);
  const [opcionChairs, setOpcionChairs] = useState([]);
  const [opcionLighter, setOpcionLighter] = useState([]);
  const [opcionInteriorOrCeilingLight, setOpcionInteriorOrCeilingLight] = useState([]);
  //NIVELES Y PERDIDA DE LIQUIDOS
  const [opcionEngineOilLevel, setOpcionEngineOilLevel] = useState([]);
  const [opcionBrakeFluidLevel, setOpcionBrakeFluidLevel] = useState([]);
  const [opcionRadiatorWaterLevel, setOpcionRadiatorWaterLevel] = useState([]);
  const [opcionBatteryWaterLevel, setOpcionBatteryWaterLevel] = useState([]);
  const [opcionHydraulicOilLevel, setOpcionHydraulicOilLevel] = useState([]);
  const [opcionAcpmLeaks, setOpcionAcpmLeaks] = useState([]);
  const [opcionWaterLeaks, setOpcionWaterLeaks] = useState([]);
  const [opcionTransmissionOilLeaks, setOpcionTransmissionOilLeaks] = useState([]);
  const [opcionBoxOilLeak, setOpcionBoxOilLeak] = useState([]);
  const [opcionBrakeFluidLeaks, setOpcionBrakeFluidLeaks] = useState([]);
  //TABLERO DE CONTROL
  const [opcionTableLight, setOpcionTableLight] = useState([]);
  const [opcionFuelLevel, setOpcionFuelLevel] = useState([]);
  const [opcionOdometer, setOpcionOdometer] = useState([]);
  const [opcionWhistle, setOpcionWhistle] = useState([]);
  const [opcionTachometer, setOpcionTachometer] = useState([]);
  const [opcionSpeedometer, setOpcionSpeedometer] = useState([]);
  const [opcionOilIndicator, setOpcionOilIndicator] = useState([]);
  const [opcionTemperatureIndicator, setOpcionTemperatureIndicator] = useState([]);
  //SEGURIDAD PASIVA
  const [opcionSeatBelts, setOpcionSeatBelts] = useState([]);
  const [opcionAirbags, setOpcionAirbags] = useState([]);
  const [opcionCrystals, setOpcionCrystals] = useState([]);
  const [opcionHeadrest, setOpcionHeadrest] = useState([]);
  const [opcionMirrorStatus, setOpcionMirrorStatus] = useState([]);
  const [opcionRightSideMirror, setOpcionRightSideMirror] = useState([]);
  const [opcionLeftSideMirror, setOpcionLeftSideMirror] = useState([]);
  const [opcionRearViewMirror, setOpcionRearViewMirror] = useState([]);
  //SEGURIDAD ACTIVA
  const [opcionAddressStatus, setOpcionAddressStatus] = useState([]);
  const [opcionFrontSuspensionCondition, setOpcionFrontSuspensionCondition] = useState([]);
  const [opcionShockAbsorbers, setOpcionShockAbsorbers] = useState([]);
  const [opcionRearSuspensionStatus, setOpcionRearSuspensionStatus] = useState([]);
  const [opcionWindshieldCondition, setOpcionWindshieldCondition] = useState([]);
  const [opcionFrontGlass, setOpcionFrontGlass] = useState([]);
  //ESTADO LUCES
  const [opcionMediumLights, setOpcionMediumLights] = useState([]);
  const [opcionHighBeams, setOpcionHighBeams] = useState([]);
  const [opcionLowLights, setOpcionLowLights] = useState([]);
  const [opcionLeftDirectionalFront, setOpcionLeftDirectionalFront] = useState([]);
  const [opcionDirectionalRightFront, setOpcionDirectionalRightFront] = useState([]);
  const [opcionLeftDirectionalRear, setOpcionLeftDirectionalRear] = useState([]);
  const [opcionDirectionalRightRear, setOpcionDirectionalRightRear] = useState([]);
  const [opcionParkingLights, setOpcionParkingLights] = useState([]);
  const [opcionBrakeLight, setOpcionBrakeLight] = useState([]);
  const [opcionReverseLight, setOpcionReverseLight] = useState([]);
  const [opcionExplorerFogLights, setOpcionExplorerFogLights] = useState([]);
  //ESTADO LLANTAS
  const [opcionRightFront, setOpcionRightFront] = useState([]);
  const [opcionLeftFront, setOpcionLeftFront] = useState([]);
  const [opcionRightRear, setOpcionRightRear] = useState([]);
  const [opcionRearLeft, setOpcionRearLeft] = useState([]);
  const [opcionReplacement, setOpcionReplacement] = useState([]);
  const [opcionTireAirPressure, setOpcionTireAirPressure] = useState([]);
  //FRENOS
  const [opcionBrakeCondition, setOpcionBrakeCondition] = useState([]);
  const [opcionHandBrake, setOpcionHandBrake] = useState([]);
  const [opcionTablets, setOpcionTablets] = useState([]);
  //EQUIPO DE CARRETERA
  const [opcionOneJackWithTheCapacityToRaiseTheVehicle, setOpcionOneJackWithTheCapacityToRaiseTheVehicle] = useState([]);
  const [opcionOneReflectiveVest, setOpcionOneReflectiveVest] = useState([]);
  const [opcionTwoBlocksToBlockTheVehicle, setOpcionTwoBlocksToBlockTheVehicle] = useState([]);
  const [opcionTwoRoadSigns, setOpcionTwoRoadSigns] = useState([]);
  const [opcionOnePairOfIndustrialGloves, setOpcionOnePairOfIndustrialGloves] = useState([]);
  const [opcionOneCrosshead, setOpcionOneCrosshead] = useState([]);
  const [opcionFireExtinguisher, setOpcionFireExtinguisher] = useState([]);
  const [opcionFlashLight, setOpcionFlashLight] = useState([]);
  const [opcionToolBox, setOpcionToolBox] = useState([]);
  const [opcionFirstAidKit, setOpcionFirstAidKit] = useState([]);
  //DOCUMENTOS DEL VEHÍCULO
  const [opcionSoat, setOpcionSoat] = useState([]);
  const [opcionTechnomechanicalReviewAndGasCertification, setOpcionTechnomechanicalReviewAndGasCertification] = useState([]);
  const [opcionContractualAndNonContractualInsurance, setOpcionContractualAndNonContractualInsurance] = useState([]);
  const [opcionPreventive, setOpcionPreventive] = useState([]);
  const [opcionOperationCard, setOpcionOperationCard] = useState([]);
  const [opcionPropertyCard, setOpcionPropertyCard] = useState([]);
  const [opcionDrivingLicense, setOpcionDrivingLicense] = useState([]);
  // End
  // OPCION SELECT
  //ESTADO DE PRESENTACIÓN
  const [opcionSelectInternalToilet, setOpcionSelectInternalToilet] = useState('');
  const [opcionSelectExternalToilet, setOpcionSelectExternalToilet] = useState('');
  const [opcionSelectCans, setOpcionSelectCans] = useState('');
  const [opcionSelectPaint, setOpcionSelectPaint] = useState('');
  //ESTADO DE COMODIDAD
  const [opcionSelectAirConditioning, setOpcionSelectAirConditioning] = useState('');
  const [opcionSelectChairs, setOpcionSelectChairs] = useState('');
  const [opcionSelectLighter, setOpcionSelectLighter] = useState('');
  const [opcionSelectInteriorOrCeilingLight, setOpcionSelectInteriorOrCeilingLight] = useState('');
  //NIVELES Y PERDIDA DE LIQUIDOS
  const [opcionSelectEngineOilLevel, setOpcionSelectEngineOilLevel] = useState('');
  const [opcionSelectBrakeFluidLevel, setOpcionSelectBrakeFluidLevel] = useState('');
  const [opcionSelectRadiatorWaterLevel, setOpcionSelectRadiatorWaterLevel] = useState('');
  const [opcionSelectBatteryWaterLevel, setOpcionSelectBatteryWaterLevel] = useState('');
  const [opcionSelectHydraulicOilLevel, setOpcionSelectHydraulicOilLevel] = useState('');
  const [opcionSelectAcpmLeaks, setOpcionSelectAcpmLeaks] = useState('');
  const [opcionSelectWaterLeaks, setOpcionSelectWaterLeaks] = useState('');
  const [opcionSelectTransmissionOilLeaks, setOpcionSelectTransmissionOilLeaks] = useState('');
  const [opcionSelectBoxOilLeak, setOpcionSelectBoxOilLeak] = useState('');
  const [opcionSelectBrakeFluidLeaks, setOpcionSelectBrakeFluidLeaks] = useState('');
  //TABLERO DE CONTROL
  const [opcionSelectTableLight, setOpcionSelectTableLight] = useState('');
  const [opcionSelectFuelLevel, setOpcionSelectFuelLevel] = useState('');
  const [opcionSelectOdometer, setOpcionSelectOdometer] = useState('');
  const [opcionSelectWhistle, setOpcionSelectWhistle] = useState('');
  const [opcionSelectTachometer, setOpcionSelectTachometer] = useState('');
  const [opcionSelectSpeedometer, setOpcionSelectSpeedometer] = useState('');
  const [opcionSelectOilIndicator, setOpcionSelectOilIndicator] = useState('');
  const [opcionSelectTemperatureIndicator, setOpcionSelectTemperatureIndicator] = useState('');
  //SEGURIDAD PASIVA
  const [opcionSelectSeatBelts, setOpcionSelectSeatBelts] = useState('');
  const [opcionSelectAirbags, setOpcionSelectAirbags] = useState('');
  const [opcionSelectCrystals, setOpcionSelectCrystals] = useState('');
  const [opcionSelectHeadrest, setOpcionSelectHeadrest] = useState('');
  const [opcionSelectMirrorStatus, setOpcionSelectMirrorStatus] = useState('');
  const [opcionSelectRightSideMirror, setOpcionSelectRightSideMirror] = useState('');
  const [opcionSelectLeftSideMirror, setOpcionSelectLeftSideMirror] = useState('');
  const [opcionSelectRearViewMirror, setOpcionSelectRearViewMirror] = useState('');
  //SEGURIDAD ACTIVA
  const [opcionSelectAddressStatus, setOpcionSelectAddressStatus] = useState('');
  const [opcionSelectFrontSuspensionCondition, setOpcionSelectFrontSuspensionCondition] = useState('');
  const [opcionSelectShockAbsorbers, setOpcionSelectShockAbsorbers] = useState('');
  const [opcionSelectRearSuspensionStatus, setOpcionSelectRearSuspensionStatus] = useState('');
  const [opcionSelectWindshieldCondition, setOpcionSelectWindshieldCondition] = useState('');
  const [opcionSelectFrontGlass, setOpcionSelectFrontGlass] = useState('');
  //ESTADO LUCES
  const [opcionSelectMediumLights, setOpcionSelectMediumLights] = useState('');
  const [opcionSelectHighBeams, setOpcionSelectHighBeams] = useState('');
  const [opcionSelectLowLights, setOpcionSelectLowLights] = useState('');
  const [opcionSelectLeftDirectionalFront, setOpcionSelectLeftDirectionalFront] = useState('');
  const [opcionSelectDirectionalRightFront, setOpcionSelectDirectionalRightFront] = useState('');
  const [opcionSelectLeftDirectionalRear, setOpcionSelectLeftDirectionalRear] = useState('');
  const [opcionSelectDirectionalRightRear, setOpcionSelectDirectionalRightRear] = useState('');
  const [opcionSelectParkingLights, setOpcionSelectParkingLights] = useState('');
  const [opcionSelectBrakeLight, setOpcionSelectBrakeLight] = useState('');
  const [opcionSelectReverseLight, setOpcionSelectReverseLight] = useState('');
  const [opcionSelectExplorerFogLights, setOpcionSelectExplorerFogLights] = useState('');
  //ESTADO LLANTAS
  const [opcionSelectRightFront, setOpcionSelectRightFront] = useState('');
  const [opcionSelectLeftFront, setOpcionSelectLeftFront] = useState('');
  const [opcionSelectRightRear, setOpcionSelectRightRear] = useState('');
  const [opcionSelectRearLeft, setOpcionSelectRearLeft] = useState('');
  const [opcionSelectReplacement, setOpcionSelectReplacement] = useState('');
  const [opcionSelectTireAirPressure, setOpcionSelectTireAirPressure] = useState('');
  //FRENOS
  const [opcionSelectBrakeCondition, setOpcionSelectBrakeCondition] = useState('');
  const [opcionSelectHandBrake, setOpcionSelectHandBrake] = useState('');
  const [opcionSelectTablets, setOpcionSelectTablets] = useState('');
  //EQUIPO DE CARRETERA
  const [opcionSelectOneJackWithTheCapacityToRaiseTheVehicle, setOpcionSelectOneJackWithTheCapacityToRaiseTheVehicle] = useState('');
  const [opcionSelectOneReflectiveVest, setOpcionSelectOneReflectiveVest] = useState('');
  const [opcionSelectTwoBlocksToBlockTheVehicle, setOpcionSelectTwoBlocksToBlockTheVehicle] = useState('');
  const [opcionSelectTwoRoadSigns, setOpcionSelectTwoRoadSigns] = useState('');
  const [opcionSelectOnePairOfIndustrialGloves, setOpcionSelectOnePairOfIndustrialGloves] = useState('');
  const [opcionSelectOneCrosshead, setOpcionSelectOneCrosshead] = useState('');
  const [opcionSelectFireExtinguisher, setOpcionSelectFireExtinguisher] = useState('');
  const [opcionSelectFlashLight, setOpcionSelectFlashLight] = useState('');
  const [opcionSelectToolBox, setOpcionSelectToolBox] = useState('');
  const [opcionSelectFirstAidKit, setOpcionSelectFirstAidKit] = useState('');
  //DOCUMENTOS DEL VEHÍCULO
  const [opcionSelectSoat, setOpcionSelectSoat] = useState('');
  const [opcionSelectTechnomechanicalReviewAndGasCertification, setOpcionSelectTechnomechanicalReviewAndGasCertification] = useState('');
  const [opcionSelectContractualAndNonContractualInsurance, setOpcionSelectContractualAndNonContractualInsurance] = useState('');
  const [opcionSelectPreventive, setOpcionSelectPreventive] = useState('');
  const [opcionSelectOperationCard, setOpcionSelectOperationCard] = useState('');
  const [opcionSelectPropertyCard, setOpcionSelectPropertyCard] = useState('');
  const [opcionSelectDrivingLicense, setOpcionSelectDrivingLicense] = useState('');
  // End

  // OPCIO SELECT
  const [errorUser, setErrorUser] = useState("");
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
      //ESTADO DE PRESENTACIÓN
      setOpcionInternalToilet([{value:"Si"},{value:"No"}]);
      setOpcionExternalToilet([{value:"Si"},{value:"No"}]);
      setOpcionCans([{value:"Si"},{value:"No"}]);
      setOpcionPaint([{value:"Si"},{value:"No"}]);
      //ESTADO DE COMODIDAD
      setOpcionAirConditioning([{value:"Si"},{value:"No"}]);
      setOpcionChairs([{value:"Si"},{value:"No"}]);
      setOpcionLighter([{value:"Si"},{value:"No"}]);
      setOpcionInteriorOrCeilingLight([{value:"Si"},{value:"No"}]);
      //NIVELES Y PERDIDA DE LIQUIDOS
      setOpcionEngineOilLevel([{value:"Si"},{value:"No"}]);
      setOpcionBrakeFluidLevel([{value:"Si"},{value:"No"}]);
      setOpcionRadiatorWaterLevel([{value:"Si"},{value:"No"}]);
      setOpcionBatteryWaterLevel([{value:"Si"},{value:"No"}]);
      setOpcionHydraulicOilLevel([{value:"Si"},{value:"No"}]);
      setOpcionAcpmLeaks([{value:"Si"},{value:"No"}]);
      setOpcionWaterLeaks([{value:"Si"},{value:"No"}]);
      setOpcionTransmissionOilLeaks([{value:"Si"},{value:"No"}]);
      setOpcionBoxOilLeak([{value:"Si"},{value:"No"}]);
      setOpcionBrakeFluidLeaks([{value:"Si"},{value:"No"}]);
      //TABLERO DE CONTROL
      setOpcionTableLight([{value:"Si"},{value:"No"}]);
      setOpcionFuelLevel([{value:"Si"},{value:"No"}]);
      setOpcionOdometer([{value:"Si"},{value:"No"}]);
      setOpcionWhistle([{value:"Si"},{value:"No"}]);
      setOpcionTachometer([{value:"Si"},{value:"No"}]);
      setOpcionSpeedometer([{value:"Si"},{value:"No"}]);
      setOpcionOilIndicator([{value:"Si"},{value:"No"}]);
      setOpcionTemperatureIndicator([{value:"Si"},{value:"No"}]);
      //SEGURIDAD PASIVA
      setOpcionSeatBelts([{value:"Si"},{value:"No"}]);
      setOpcionAirbags([{value:"Si"},{value:"No"}]);
      setOpcionCrystals([{value:"Si"},{value:"No"}]);
      setOpcionHeadrest([{value:"Si"},{value:"No"}]);
      setOpcionMirrorStatus([{value:"Si"},{value:"No"}]);
      setOpcionRightSideMirror([{value:"Si"},{value:"No"}]);
      setOpcionLeftSideMirror([{value:"Si"},{value:"No"}]);
      setOpcionRearViewMirror([{value:"Si"},{value:"No"}]);
      //SEGURIDAD ACTIVA
      setOpcionAddressStatus([{value:"Si"},{value:"No"}]);
      setOpcionFrontSuspensionCondition([{value:"Si"},{value:"No"}]);
      setOpcionShockAbsorbers([{value:"Si"},{value:"No"}]);
      setOpcionRearSuspensionStatus([{value:"Si"},{value:"No"}]);
      setOpcionWindshieldCondition([{value:"Si"},{value:"No"}]);
      setOpcionFrontGlass([{value:"Si"},{value:"No"}]);
      //ESTADO LUCES
      setOpcionMediumLights([{value:"Si"},{value:"No"}]);
      setOpcionHighBeams([{value:"Si"},{value:"No"}]);
      setOpcionLowLights([{value:"Si"},{value:"No"}]);
      setOpcionLeftDirectionalFront([{value:"Si"},{value:"No"}]);
      setOpcionDirectionalRightFront([{value:"Si"},{value:"No"}]);
      setOpcionLeftDirectionalRear([{value:"Si"},{value:"No"}]);
      setOpcionDirectionalRightRear([{value:"Si"},{value:"No"}]);
      setOpcionParkingLights([{value:"Si"},{value:"No"}]);
      setOpcionBrakeLight([{value:"Si"},{value:"No"}]);
      setOpcionReverseLight([{value:"Si"},{value:"No"}]);
      setOpcionExplorerFogLights([{value:"Si"},{value:"No"}]);
      //ESTADO LLANTAS
      setOpcionRightFront([{value:"Si"},{value:"No"}]);
      setOpcionLeftFront([{value:"Si"},{value:"No"}]);
      setOpcionRightRear([{value:"Si"},{value:"No"}]);
      setOpcionRearLeft([{value:"Si"},{value:"No"}]);
      setOpcionReplacement([{value:"Si"},{value:"No"}]);
      setOpcionTireAirPressure([{value:"Si"},{value:"No"}]);
      //FRENOS
      setOpcionBrakeCondition([{value:"Si"},{value:"No"}]);
      setOpcionHandBrake([{value:"Si"},{value:"No"}]);
      setOpcionTablets([{value:"Si"},{value:"No"}]);
      //EQUIPO DE CARRETERA
      setOpcionOneJackWithTheCapacityToRaiseTheVehicle([{value:"Si"},{value:"No"}]);
      setOpcionOneReflectiveVest([{value:"Si"},{value:"No"}]);
      setOpcionTwoBlocksToBlockTheVehicle([{value:"Si"},{value:"No"}]);
      setOpcionTwoRoadSigns([{value:"Si"},{value:"No"}]);
      setOpcionOnePairOfIndustrialGloves([{value:"Si"},{value:"No"}]);
      setOpcionOneCrosshead([{value:"Si"},{value:"No"}]);
      setOpcionFireExtinguisher([{value:"Si"},{value:"No"}]);
      setOpcionFlashLight([{value:"Si"},{value:"No"}]);
      setOpcionToolBox([{value:"Si"},{value:"No"}]);
      setOpcionFirstAidKit([{value:"Si"},{value:"No"}]);
      //DOCUMENTOS DEL VEHÍCULO
      setOpcionSoat([{value:"Si"},{value:"No"}]);
      setOpcionTechnomechanicalReviewAndGasCertification([{value:"Si"},{value:"No"}]);
      setOpcionContractualAndNonContractualInsurance([{value:"Si"},{value:"No"}]);
      setOpcionPreventive([{value:"Si"},{value:"No"}]);
      setOpcionOperationCard([{value:"Si"},{value:"No"}]);
      setOpcionPropertyCard([{value:"Si"},{value:"No"}]);
      setOpcionDrivingLicense([{value:"Si"},{value:"No"}]);
      // End
  }, [dataListUser,conductor])

  useEffect(() => {
    setOpcionSelectUser(infoUpdate.item.userDriver[0]._id);
    setOilChange(infoUpdate.item.oilChange);
    setCurrentKm(infoUpdate.item.currentKm);
    setObservation(infoUpdate.item.observation);

    //ESTADO DE PRESENTACIÓN
    setOpcionSelectInternalToilet(infoUpdate.item.internalToilet);
    setOpcionSelectExternalToilet(infoUpdate.item.externalToilet);
    setOpcionSelectCans(infoUpdate.item.cans);
    setOpcionSelectPaint(infoUpdate.item.paint);
    //ESTADO DE COMODIDAD
    setOpcionSelectAirConditioning(infoUpdate.item.airConditioning);
    setOpcionSelectChairs(infoUpdate.item.chairs);
    setOpcionSelectLighter(infoUpdate.item.lighter);
    setOpcionSelectInteriorOrCeilingLight(infoUpdate.item.interiorOrCeilingLight);
    //NIVELES Y PERDIDA DE LIQUIDOS
    setOpcionSelectEngineOilLevel(infoUpdate.item.engineOilLevel);
    setOpcionSelectBrakeFluidLevel(infoUpdate.item.brakeFluidLevel);
    setOpcionSelectRadiatorWaterLevel(infoUpdate.item.radiatorWaterLevel);
    setOpcionSelectBatteryWaterLevel(infoUpdate.item.batteryWaterLevel);
    setOpcionSelectHydraulicOilLevel(infoUpdate.item.hydraulicOilLevel);
    setOpcionSelectAcpmLeaks(infoUpdate.item.acpmLeaks);
    setOpcionSelectWaterLeaks(infoUpdate.item.waterLeaks);
    setOpcionSelectTransmissionOilLeaks(infoUpdate.item.transmissionOilLeaks);
    setOpcionSelectBoxOilLeak(infoUpdate.item.boxOilLeak);
    setOpcionSelectBrakeFluidLeaks(infoUpdate.item.brakeFluidLeaks);
    //TABLERO DE CONTROL
    setOpcionSelectTableLight(infoUpdate.item.tableLight);
    setOpcionSelectFuelLevel(infoUpdate.item.fuelLevel);
    setOpcionSelectOdometer(infoUpdate.item.odometer);
    setOpcionSelectWhistle(infoUpdate.item.whistle);
    setOpcionSelectTachometer(infoUpdate.item.tachometer);
    setOpcionSelectSpeedometer(infoUpdate.item.speedometer);
    setOpcionSelectOilIndicator(infoUpdate.item.oilIndicator);
    setOpcionSelectTemperatureIndicator(infoUpdate.item.temperatureIndicator);
    //SEGURIDAD PASIVA
    setOpcionSelectSeatBelts(infoUpdate.item.seatBelts);
    setOpcionSelectAirbags(infoUpdate.item.airbags);
    setOpcionSelectCrystals(infoUpdate.item.crystals);
    setOpcionSelectHeadrest(infoUpdate.item.headrest);
    setOpcionSelectMirrorStatus(infoUpdate.item.status);
    setOpcionSelectRightSideMirror(infoUpdate.item.rightSideMirror);
    setOpcionSelectLeftSideMirror(infoUpdate.item.leftSideMirror);
    setOpcionSelectRearViewMirror(infoUpdate.item.rearViewMirror);
    //SEGURIDAD ACTIVA
    setOpcionSelectAddressStatus(infoUpdate.item.addressStatus);
    setOpcionSelectFrontSuspensionCondition(infoUpdate.item.frontSuspensionCondition);
    setOpcionSelectShockAbsorbers(infoUpdate.item.shockAbsorbers);
    setOpcionSelectRearSuspensionStatus(infoUpdate.item.rearSuspensionStatus);
    setOpcionSelectWindshieldCondition(infoUpdate.item.windshieldCondition);
    setOpcionSelectFrontGlass(infoUpdate.item.frontGlass);
    //ESTADO LUCES
    setOpcionSelectMediumLights(infoUpdate.item.mediumLights);
    setOpcionSelectHighBeams(infoUpdate.item.highBeams);
    setOpcionSelectLowLights(infoUpdate.item.lowLights);
    setOpcionSelectLeftDirectionalFront(infoUpdate.item.leftDirectionalFront);
    setOpcionSelectDirectionalRightFront(infoUpdate.item.directionalRightFront);
    setOpcionSelectLeftDirectionalRear(infoUpdate.item.leftDirectionalRear);
    setOpcionSelectDirectionalRightRear(infoUpdate.item.directionalRightRear);
    setOpcionSelectParkingLights(infoUpdate.item.parkingLights);
    setOpcionSelectBrakeLight(infoUpdate.item.brakeLight);
    setOpcionSelectReverseLight(infoUpdate.item.reverseLight);
    setOpcionSelectExplorerFogLights(infoUpdate.item.explorerFogLights);
    //ESTADO LLANTAS
    setOpcionSelectRightFront(infoUpdate.item.rightFront);
    setOpcionSelectLeftFront(infoUpdate.item.leftFront);
    setOpcionSelectRightRear(infoUpdate.item.rightRear);
    setOpcionSelectRearLeft(infoUpdate.item.rearLeft);
    setOpcionSelectReplacement(infoUpdate.item.replacement);
    setOpcionSelectTireAirPressure(infoUpdate.item.tireAirPressure);
    //FRENOS
    setOpcionSelectBrakeCondition(infoUpdate.item.brakeCondition);
    setOpcionSelectHandBrake(infoUpdate.item.handBrake);
    setOpcionSelectTablets(infoUpdate.item.tablets);
    //EQUIPO DE CARRETERA
    setOpcionSelectOneJackWithTheCapacityToRaiseTheVehicle(infoUpdate.item.oneJackWithTheCapacityToRaiseTheVehicle);
    setOpcionSelectOneReflectiveVest(infoUpdate.item.oneReflectiveVest);
    setOpcionSelectTwoBlocksToBlockTheVehicle(infoUpdate.item.twoBlocksToBlockTheVehicle);
    setOpcionSelectTwoRoadSigns(infoUpdate.item.twoRoadSigns);
    setOpcionSelectOnePairOfIndustrialGloves(infoUpdate.item.onePairOfIndustrialGloves);
    setOpcionSelectOneCrosshead(infoUpdate.item.oneCrosshead);
    setOpcionSelectFireExtinguisher(infoUpdate.item.fireExtinguisher);
    setOpcionSelectFlashLight(infoUpdate.item.flashLight);
    setOpcionSelectToolBox(infoUpdate.item.toolBox);
    setOpcionSelectFirstAidKit(infoUpdate.item.firstAidKit);
    //DOCUMENTOS DEL VEHÍCULO
    setOpcionSelectSoat(infoUpdate.item.soat);
    setOpcionSelectTechnomechanicalReviewAndGasCertification(infoUpdate.item.technomechanicalReviewAndGasCertification);
    setOpcionSelectContractualAndNonContractualInsurance(infoUpdate.item.contractualAndNonContractualInsurance);
    setOpcionSelectPreventive(infoUpdate.item.preventive);
    setOpcionSelectOperationCard(infoUpdate.item.operationCard);
    setOpcionSelectPropertyCard(infoUpdate.item.propertyCard);
    setOpcionSelectDrivingLicense(infoUpdate.item.drivingLicense);
    // End
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
    if(validates) { 
        let body = { 
          id:infoUpdate.item._id,
          userDriver:opcionSelectUser,
          oilChange:oilChange,
          currentKm:currentKm,
          observation:observation,
          internalToilet:opcionSelectInternalToilet,
          externalToilet:opcionSelectExternalToilet,
          cans:opcionSelectCans,
          paint:opcionSelectPaint,
          //ESTADO DE COMODIDAD
          airConditioning:opcionSelectAirConditioning,
          chairs:opcionSelectChairs,
          lighter:opcionSelectLighter,
          orCeilingLight:opcionSelectInteriorOrCeilingLight,
          //NIVELES Y PERDIDA DE LIQUIDOS
          engineOilLevel:opcionSelectEngineOilLevel,
          brakeFluidLevel:opcionSelectBrakeFluidLevel,
          radiatorWaterLevel:opcionSelectRadiatorWaterLevel,
          batteryWaterLevel:opcionSelectBatteryWaterLevel,
          hydraulicOilLevel:opcionSelectHydraulicOilLevel,
          acpmLeaks:opcionSelectAcpmLeaks,
          waterLeaks:opcionSelectWaterLeaks,
          transmissionOilLeaks:opcionSelectTransmissionOilLeaks,
          boxOilLeak:opcionSelectBoxOilLeak,
          brakeFluidLeaks:opcionSelectBrakeFluidLeaks,
          //TABLERO DE CONTROL
          tableLight:opcionSelectTableLight,
          fuelLevel:opcionSelectFuelLevel,
          odometer:opcionSelectOdometer,
          whistle:opcionSelectWhistle,
          tachometer:opcionSelectTachometer,
          speedometer:opcionSelectSpeedometer,
          oilIndicator:opcionSelectOilIndicator,
          temperatureIndicator:opcionSelectTemperatureIndicator,
          //SEGURIDAD PASIVA
          seatBelts:opcionSelectSeatBelts,
          airbags:opcionSelectAirbags,
          crystals:opcionSelectCrystals,
          headrest:opcionSelectHeadrest,
          mirrorStatus:opcionSelectMirrorStatus,
          rightSideMirror:opcionSelectRightSideMirror,
          leftSideMirror:opcionSelectLeftSideMirror,
          rearViewMirror:opcionSelectRearViewMirror,
          //SEGURIDAD ACTIVA
          addressStatus:opcionSelectAddressStatus,
          frontSuspensionCondition:opcionSelectFrontSuspensionCondition,
          shockAbsorbers:opcionSelectShockAbsorbers,
          rearSuspensionStatus:opcionSelectRearSuspensionStatus,
          windshieldCondition:opcionSelectWindshieldCondition,
          frontGlass:opcionSelectFrontGlass,
          //ESTADO LUCES
          mediumLights:opcionSelectMediumLights,
          highBeams:opcionSelectHighBeams,
          lowLights:opcionSelectLowLights,
          leftDirectionalFront:opcionSelectLeftDirectionalFront,
          directionalRightFront:opcionSelectDirectionalRightFront,
          leftDirectionalRear:opcionSelectLeftDirectionalRear,
          directionalRightRear:opcionSelectDirectionalRightRear,
          parkingLights:opcionSelectParkingLights,
          brakeLight:opcionSelectBrakeLight,
          reverseLight:opcionSelectReverseLight,
          explorerFogLights:opcionSelectExplorerFogLights,
          //ESTADO LLANTAS
          rightFront:opcionSelectRightFront,
          leftFront:opcionSelectLeftFront,
          rightRear:opcionSelectRightRear,
          rearLeft:opcionSelectRearLeft,
          replacement:opcionSelectReplacement,
          tireAirPressure:opcionSelectTireAirPressure,
          //FRENOS
          brakeCondition:opcionSelectBrakeCondition,
          handBrake:opcionSelectHandBrake,
          tablets:opcionSelectTablets,
          //EQUIPO DE CARRETERA
          oneJackWithTheCapacityToRaiseTheVehicle:opcionSelectOneJackWithTheCapacityToRaiseTheVehicle,
          oneReflectiveVest:opcionSelectOneReflectiveVest,
          twoBlocksToBlockTheVehicle:opcionSelectTwoBlocksToBlockTheVehicle,
          twoRoadSigns:opcionSelectTwoRoadSigns,
          onePairOfIndustrialGloves:opcionSelectOnePairOfIndustrialGloves,
          oneCrosshead:opcionSelectOneCrosshead,
          fireExtinguisher:opcionSelectFireExtinguisher,
          flashLight:opcionSelectFlashLight,
          toolBox:opcionSelectToolBox,
          firstAidKit:opcionSelectFirstAidKit,
          //DOCUMENTOS DEL VEHÍCULO
          soat:opcionSelectSoat,
          technomechanicalReviewAndGasCertification:opcionSelectTechnomechanicalReviewAndGasCertification,
          contractualAndNonContractualInsurance:opcionSelectContractualAndNonContractualInsurance,
          preventive:opcionSelectPreventive,
          operationCard:opcionSelectOperationCard,
          propertyCard:opcionSelectPropertyCard,
          drivingLicense:opcionSelectDrivingLicense
          // End
        }
        let response = await dispatch(updateListCheckService(body));
        if(response.error === undefined){
          switch (response.response.status) {
            case 200:
                Swal.fire({
                  title: "Editado!",
                  text: "Fue editado con exito",
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
            text: "Eror al editarlo",
            icon: "error"
          });
        }
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

              <div className='driverDocument-create-position-content-form'>
                <div className='driverDocument-create-content-form'>

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

                  {/* Start */}

                  {/* ESTADO DE PRESENTACIÓN */}

                    <div className='mt-4 listCheck-create-main-input form-group'>
                      <label htmlFor="exampleInputEmail1">Aseo interno :</label>
                      <select value={opcionSelectInternalToilet} onChange={(e) => setOpcionSelectInternalToilet(e.target.value)} className='listCheck-create-input form-control'>
                        {opcionInternalToilet.map((opcion, index) => (
                          <option key={index} value={opcion.value}>
                            {opcion.value}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='mt-4 listCheck-create-main-input form-group'>
                      <label htmlFor="exampleInputEmail1">Aseo externo :</label>
                      <select value={opcionSelectExternalToilet} onChange={(e) => setOpcionSelectExternalToilet(e.target.value)} className='listCheck-create-input form-control'>
                        {opcionExternalToilet.map((opcion, index) => (
                          <option key={index} value={opcion.value}>
                            {opcion.value}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='mt-4 listCheck-create-main-input form-group'>
                      <label htmlFor="exampleInputEmail1">Latas :</label>
                      <select value={opcionSelectCans} onChange={(e) => setOpcionSelectCans(e.target.value)} className='listCheck-create-input form-control'>
                        {opcionCans.map((opcion, index) => (
                          <option key={index} value={opcion.value}>
                            {opcion.value}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='mt-4 listCheck-create-main-input form-group'>
                      <label htmlFor="exampleInputEmail1">Pintura :</label>
                      <select value={opcionSelectPaint} onChange={(e) => setOpcionSelectPaint(e.target.value)} className='listCheck-create-input form-control'>
                        {opcionPaint.map((opcion, index) => (
                          <option key={index} value={opcion.value}>
                            {opcion.value}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ESTADO DE COMODIDAD */}

                    <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Aire Acondicionado :</label>
                        <select value={opcionSelectAirConditioning} onChange={(e) => setOpcionSelectAirConditioning(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionAirConditioning.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Silletería (Anclaje, estado) :</label>
                        <select value={opcionSelectChairs} onChange={(e) => setOpcionSelectChairs(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionChairs.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Encendedor :</label>
                        <select value={opcionSelectLighter} onChange={(e) => setOpcionSelectLighter(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionLighter.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Luz Interior o de techo :</label>
                        <select value={opcionSelectInteriorOrCeilingLight} onChange={(e) => setOpcionSelectInteriorOrCeilingLight(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionInteriorOrCeilingLight.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* ESTADO DE COMODIDAD */}

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Nivel de Aceite de motor :</label>
                        <select value={opcionSelectEngineOilLevel} onChange={(e) => setOpcionSelectEngineOilLevel(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionEngineOilLevel.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Nivel de liquido de frenos :</label>
                        <select value={opcionSelectBrakeFluidLevel} onChange={(e) => setOpcionSelectBrakeFluidLevel(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionBrakeFluidLevel.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Nivel de agua del radiador :</label>
                        <select value={opcionSelectRadiatorWaterLevel} onChange={(e) => setOpcionSelectRadiatorWaterLevel(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionRadiatorWaterLevel.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Nivel de agua de la batería :</label>
                        <select value={opcionSelectBatteryWaterLevel} onChange={(e) => setOpcionSelectBatteryWaterLevel(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionBatteryWaterLevel.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Nivel de aceite hidráulico :</label>
                        <select value={opcionSelectHydraulicOilLevel} onChange={(e) => setOpcionSelectHydraulicOilLevel(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionHydraulicOilLevel.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Fugas de A.C.P.M :</label>
                        <select value={opcionSelectAcpmLeaks} onChange={(e) => setOpcionSelectAcpmLeaks(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionAcpmLeaks.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Fugas de Agua :</label>
                        <select value={opcionSelectWaterLeaks} onChange={(e) => setOpcionSelectWaterLeaks(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionWaterLeaks.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Fugas de Aceite de transmisión :</label>
                        <select value={opcionSelectTransmissionOilLeaks} onChange={(e) => setOpcionSelectTransmissionOilLeaks(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionTransmissionOilLeaks.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Fuga aceite de caja :</label>
                        <select value={opcionSelectBoxOilLeak} onChange={(e) => setOpcionSelectBoxOilLeak(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionBoxOilLeak.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Fugas de líquidos de frenos :</label>
                        <select value={opcionSelectBrakeFluidLeaks} onChange={(e) => setOpcionSelectBrakeFluidLeaks(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionBrakeFluidLeaks.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>


                      {/* TABLERO DE CONTROL */}

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Luces de Tablero :</label>
                        <select value={opcionSelectTableLight} onChange={(e) => setOpcionSelectTableLight(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionTableLight.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Nivel de Combustible :</label>
                        <select value={opcionSelectFuelLevel} onChange={(e) => setOpcionSelectFuelLevel(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionFuelLevel.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Odómetro :</label>
                        <select value={opcionSelectOdometer} onChange={(e) => setOpcionSelectOdometer(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionOdometer.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Pito :</label>
                        <select value={opcionSelectWhistle} onChange={(e) => setOpcionSelectWhistle(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionWhistle.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Tacómetro :</label>
                        <select value={opcionSelectTachometer} onChange={(e) => setOpcionSelectTachometer(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionTachometer.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Velocímetro :</label>
                        <select value={opcionSelectSpeedometer} onChange={(e) => setOpcionSelectSpeedometer(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionSpeedometer.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Indicador de Aceite :</label>
                        <select value={opcionSelectOilIndicator} onChange={(e) => setOpcionSelectOilIndicator(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionOilIndicator.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Indicador de Temperatura :</label>
                        <select value={opcionSelectTemperatureIndicator} onChange={(e) => setOpcionSelectTemperatureIndicator(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionTemperatureIndicator.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* SEGURIDAD PASIVA */}

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Cinturones de Seguridad :</label>
                        <select value={opcionSelectSeatBelts} onChange={(e) => setOpcionSelectSeatBelts(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionSeatBelts.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Airbags :</label>
                        <select value={opcionSelectAirbags} onChange={(e) => setOpcionSelectAirbags(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionAirbags.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Cristales (Vidrios) :</label>
                        <select value={opcionSelectCrystals} onChange={(e) => setOpcionSelectCrystals(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionCrystals.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Apoyacabezas :</label>
                        <select value={opcionSelectHeadrest} onChange={(e) => setOpcionSelectHeadrest(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionHeadrest.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Estado Espejos :</label>
                        <select value={opcionSelectMirrorStatus} onChange={(e) => setOpcionSelectMirrorStatus(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionMirrorStatus.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Espejo Lateral Derecho :</label>
                        <select value={opcionSelectRightSideMirror} onChange={(e) => setOpcionSelectRightSideMirror(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionRightSideMirror.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Espejo Lateral Izquierdo :</label>
                        <select value={opcionSelectLeftSideMirror} onChange={(e) => setOpcionSelectLeftSideMirror(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionLeftSideMirror.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Espejo Retrovisor :</label>
                        <select value={opcionSelectRearViewMirror} onChange={(e) => setOpcionSelectRearViewMirror(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionRearViewMirror.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* SEGURIDAD ACTIVA */}

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Estado de la Dirección :</label>
                        <select value={opcionSelectAddressStatus} onChange={(e) => setOpcionSelectAddressStatus(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionAddressStatus.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Estado Suspensión Delantera :</label>
                        <select value={opcionSelectFrontSuspensionCondition} onChange={(e) => setOpcionSelectFrontSuspensionCondition(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionFrontSuspensionCondition.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Amortiguadores :</label>
                        <select value={opcionSelectShockAbsorbers} onChange={(e) => setOpcionSelectShockAbsorbers(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionShockAbsorbers.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Estado suspensión Trasera :</label>
                        <select value={opcionSelectRearSuspensionStatus} onChange={(e) => setOpcionSelectRearSuspensionStatus(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionRearSuspensionStatus.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Estado Parabrisas :</label>
                        <select value={opcionSelectWindshieldCondition} onChange={(e) => setOpcionSelectWindshieldCondition(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionWindshieldCondition.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Vidrio Frontal :</label>
                        <select value={opcionSelectFrontGlass} onChange={(e) => setOpcionSelectFrontGlass(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionFrontGlass.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* ESTADO LUCES */}

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Luces Medias :</label>
                        <select value={opcionSelectMediumLights} onChange={(e) => setOpcionSelectMediumLights(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionMediumLights.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Luces Altas :</label>
                        <select value={opcionSelectHighBeams} onChange={(e) => setOpcionSelectHighBeams(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionHighBeams.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Luces Bajas :</label>
                        <select value={opcionSelectLowLights} onChange={(e) => setOpcionSelectLowLights(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionLowLights.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Direccional Izquie. Delant. :</label>
                        <select value={opcionSelectLeftDirectionalFront} onChange={(e) => setOpcionSelectLeftDirectionalFront(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionLeftDirectionalFront.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Direccional Derec. Delant. :</label>
                        <select value={opcionSelectDirectionalRightFront} onChange={(e) => setOpcionSelectDirectionalRightFront(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionDirectionalRightFront.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Direccional Izquie. Trasera :</label>
                        <select value={opcionSelectLeftDirectionalRear} onChange={(e) => setOpcionSelectLeftDirectionalRear(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionLeftDirectionalRear.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Direccional Derec. Trasera :</label>
                        <select value={opcionSelectDirectionalRightRear} onChange={(e) => setOpcionSelectDirectionalRightRear(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionDirectionalRightRear.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Luces de Parqueo :</label>
                        <select value={opcionSelectParkingLights} onChange={(e) => setOpcionSelectParkingLights(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionParkingLights.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Luz Freno :</label>
                        <select value={opcionSelectBrakeLight} onChange={(e) => setOpcionSelectBrakeLight(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionBrakeLight.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Luz Reverso :</label>
                        <select value={opcionSelectReverseLight} onChange={(e) => setOpcionSelectReverseLight(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionReverseLight.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">L. Antiniebla Exploradoras :</label>
                        <select value={opcionSelectExplorerFogLights} onChange={(e) => setOpcionSelectExplorerFogLights(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionExplorerFogLights.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/*  ESTADO LLANTAS */}

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Delantera Derecha :</label>
                        <select value={opcionSelectRightFront} onChange={(e) => setOpcionSelectRightFront(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionRightFront.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Delantera Izquierda :</label>
                        <select value={opcionSelectLeftFront} onChange={(e) => setOpcionSelectLeftFront(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionLeftFront.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Trasera Derecha :</label>
                        <select value={opcionSelectRightRear} onChange={(e) => setOpcionSelectRightRear(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionRightRear.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Trasera Izquierda :</label>
                        <select value={opcionSelectRearLeft} onChange={(e) => setOpcionSelectRearLeft(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionRearLeft.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Repuesto :</label>
                        <select value={opcionSelectReplacement} onChange={(e) => setOpcionSelectReplacement(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionReplacement.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Presión aire llanta :</label>
                        <select value={opcionSelectTireAirPressure} onChange={(e) => setOpcionSelectTireAirPressure(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionTireAirPressure.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                     {/* FRENOS */}

                     <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Estado de los Frenos :</label>
                        <select value={opcionSelectBrakeCondition} onChange={(e) => setOpcionSelectBrakeCondition(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionBrakeCondition.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Freno de Mano :</label>
                        <select value={opcionSelectHandBrake} onChange={(e) => setOpcionSelectHandBrake(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionHandBrake.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Pastillas :</label>
                        <select value={opcionSelectTablets} onChange={(e) => setOpcionSelectTablets(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionTablets.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                     {/* EQUIPO DE CARRETERA */}

                     <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">1 gato con capacidad para elevar el vehículo :</label>
                        <select value={opcionSelectOneJackWithTheCapacityToRaiseTheVehicle} onChange={(e) => setOpcionSelectOneJackWithTheCapacityToRaiseTheVehicle(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionOneJackWithTheCapacityToRaiseTheVehicle.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">1 chaleco reflectivo :</label>
                        <select value={opcionSelectOneReflectiveVest} onChange={(e) => setOpcionSelectOneReflectiveVest(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionOneReflectiveVest.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">2 tacos para bloquear el vehículo :</label>
                        <select value={opcionSelectTwoBlocksToBlockTheVehicle} onChange={(e) => setOpcionSelectTwoBlocksToBlockTheVehicle(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionTwoBlocksToBlockTheVehicle.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">2 señales de carretera; conos o triangulos :</label>
                        <select value={opcionSelectTwoRoadSigns} onChange={(e) => setOpcionSelectTwoRoadSigns(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionTwoRoadSigns.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">1 par de guantes industriales :</label>
                        <select value={opcionSelectOnePairOfIndustrialGloves} onChange={(e) => setOpcionSelectOnePairOfIndustrialGloves(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionOnePairOfIndustrialGloves.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">1 cruceta :</label>
                        <select value={opcionSelectOneCrosshead} onChange={(e) => setOpcionSelectOneCrosshead(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionOneCrosshead.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">extinguidor de fuego( capacidad mín. 5 lb) :</label>
                        <select value={opcionSelectFireExtinguisher} onChange={(e) => setOpcionSelectFireExtinguisher(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionFireExtinguisher.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Linterna :</label>
                        <select value={opcionSelectFlashLight} onChange={(e) => setOpcionSelectFlashLight(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionFlashLight.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">caja de herramientas (alicates, destornilladores de pala y estrella, llave de expansión y fijas) :</label>
                        <select value={opcionSelectToolBox} onChange={(e) => setOpcionSelectToolBox(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionToolBox.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Botiquín de primeros auxilios :</label>
                        <select value={opcionSelectFirstAidKit} onChange={(e) => setOpcionSelectFirstAidKit(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionFirstAidKit.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* DOCUMENTOS DEL VEHÍCULO */}

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Soat :</label>
                        <select value={opcionSelectSoat} onChange={(e) => setOpcionSelectSoat(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionSoat.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Revisión tecnomecánica y certificación de gases :</label>
                        <select value={opcionSelectTechnomechanicalReviewAndGasCertification} onChange={(e) => setOpcionSelectTechnomechanicalReviewAndGasCertification(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionTechnomechanicalReviewAndGasCertification.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Seguro contractual y extracontractual :</label>
                        <select value={opcionSelectContractualAndNonContractualInsurance} onChange={(e) => setOpcionSelectContractualAndNonContractualInsurance(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionContractualAndNonContractualInsurance.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Preventiva :</label>
                        <select value={opcionSelectPreventive} onChange={(e) => setOpcionSelectPreventive(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionPreventive.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Tarjeta de operación :</label>
                        <select value={opcionSelectOperationCard} onChange={(e) => setOpcionSelectOperationCard(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionOperationCard.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Tarjeta de propiedad :</label>
                        <select value={opcionSelectPropertyCard} onChange={(e) => setOpcionSelectPropertyCard(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionPropertyCard.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4 listCheck-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Licencia de conducción :</label>
                        <select value={opcionSelectDrivingLicense} onChange={(e) => setOpcionSelectDrivingLicense(e.target.value)} className='listCheck-create-input form-control'>
                          {opcionDrivingLicense.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                  {/* End */}

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
        </div>
    </div>
  )
}

export default Update