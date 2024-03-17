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
import { getListCheckAllService , deleteListCheckService  } from "../../../store/action/listCheckAction";
import { getUserAllService } from "../../../store/action/userAction";

//Alertas 
import Swal from 'sweetalert2';

// pdf-lib
import { PDFDocument, rgb } from 'pdf-lib';

//dowland
import download  from 'downloadjs';

//documentos
import pdfDiary from '../../../docs/pdfDiary.pdf';
import pdfMonthly from '../../../docs/pdfMonthly.pdf';

//id de los roles
import roleService from '../../../libs/helpers/role.json';

function List() {

  const { vehiculo } = roleService;
  const [view, setView] = useState({list:true,create:false,update:false});
  const [infoUpdate, setInfoUpdate] = useState({});
  const [opcionUserVehicle, setOpcionUserVehicle] = useState([]);
  const [opcionSelectUserVehicle, setOpcionSelectUserVehicle] = useState('');

  const [opcionPreoperacional, setOpcionPreoperacional] = useState([]);
  const [opcionSelectPreoperacional, setOpcionSelectPreoperacional] = useState('');
  const [dateMonthly, setDateMonthly] = useState("");
  const [dowmlandPdfDiary, setDowmlandPdfDiary] = useState([]);
  const dataList = useSelector((store) => store.listCheckReducer);
  const dataListUserVehicle = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpcionPreoperacional([{value:"Preoperacional diaria"},{value:"Preoperacional mensual"}])
  }, [dataList])
  
  //Aqui hago la consulta a la base de datos y la agrego el payload al redux
  useEffect(() => {
    dispatch(getListCheckAllService());
    dispatch(getUserAllService());
  }, [dispatch])

  useEffect(() => {
    const resultadosFiltrados = dataList.data;
    // Ordena la matriz de objetos según la fecha
    resultadosFiltrados.sort(function(a, b) {
      // Convierte las cadenas de fecha en objetos de fecha para comparar
      var dateA = parseDate(a.date);
      var dateB = parseDate(b.date);
      // Compara las fechas
      return dateB - dateA; // De mayor a menor
    });
  }, [dataList])

  useEffect(() => {
    let resultadosFiltrados = dataListUserVehicle.data.filter(objeto => objeto.role[0]._id === vehiculo);
    setOpcionUserVehicle(resultadosFiltrados);
  }, [dataListUserVehicle,vehiculo])

  // Función para convertir una cadena de fecha en un objeto Date
  function parseDate(str) {
    var parts = str.split(/[- :]/);
    // Asegúrate de usar el formato adecuado para el objeto Date
    return new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4]);
  }

  //Esto es para actulizar la lista en el create y update y nada mas
  const getAll = () => {
    dispatch(getListCheckAllService());
  }

  const deleteInfo = (id) => {
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
  }

  const alertDelete = async (id) => {
    let response = await dispatch(deleteListCheckService(id));
    if(response.error === undefined){
      switch (response.response.status) {
        case 200:
            //Aquí actulizo la informacion
            dispatch(getListCheckAllService());
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

  const selectCheck = (item) => {
    let newArray = [];
    for (let i = 0; i < dataList.data.length; i++) {
      const element = dataList.data[i];
      if(item._id === element._id){
        if (element.check === undefined) {
          element.check = true;
        } else if(element.check === true) {
          element.check = false;
        } else if (element.check === false) {
          element.check = true;  
        }
      }
      newArray.push(element);
    }
    setDowmlandPdfDiary(newArray);
  }

  const dowlandPdfDiary = async () => {
    for (let i = 0; i < dowmlandPdfDiary.length; i++) {
      const element = dowmlandPdfDiary[i];
      if(element.check === true) {
        // console.log(element);
        const pdfBytes = await createPdf(element,i);
        download(pdfBytes, `preoperacional_diaria_${i}.pdf`, "application/pdf");
        await esperar(1000);
      }
    }
  }

  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function dividirCadena(cadena, longitud) {
    let substrings = [];
    for (let i = 0; i < cadena.length; i += longitud) {
      substrings.push(cadena.substring(i, i + longitud));
    }
    return substrings;
  }

  const createPdf = async (element,i) => {
    // console.log(element);
    const pdf = await fetch(pdfDiary).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdf);

    const page = pdfDoc.getPage(0);
    const page1 = pdfDoc.getPage(1);
    const { height } = page.getSize();
    // const { height } = page1.getSize();

    // Fecha preoperacional
    let date = element.date.split(' ');
    page.drawText(date[0], {
      x: 156,
      y: height - 125,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Kilometraje
    page.drawText(element.currentKm, {
      x: 290,
      y: height - 125,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Cambio de aceite
    page.drawText(element.oilChange, {
      x: 490,
      y: height - 125,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })
    
    // Placa
    page.drawText(element.userVehicle[0].placa, {
      x: 80,
      y: height - 147,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Modelo
    page.drawText(element.userVehicle[0].model[0].name, {
      x: 215,
      y: height - 147,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Marca
    page.drawText(element.userVehicle[0].brand[0].name, {
      x: 340,
      y: height - 147,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Clase
    page.drawText(element.userVehicle[0].types[0].name, {
      x: 463,
      y: height - 147,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Número interno
    let internalNumberString = element.userVehicle[0].internalNumber.toString();
    page.drawText(internalNumberString, {
      x: 127,
      y: height - 171,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Identificación del conductor
    page.drawText(element.userDriver[0].dni, {
      x: 447,
      y: height - 171,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Conductor
    page.drawText(element.userDriver[0].names + ' ' + element.userDriver[0].surnames, {
      x: 107,
      y: height - 181,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Identificación del Propietario
    page.drawText("42691020", {
      x: 450,
      y: height - 181,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Propietario
    page.drawText("MARIA EDITH SALAZAR RAMIREZ", {
      x: 107,
      y: height - 193,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // ESTADO DE PRESENTACIÓN

    // Aseo interno
    page.drawText(element.internalToilet, {
      x: 500,
      y: height - 227,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Aseo externo
    page.drawText(element.externalToilet, {
      x: 500,
      y: height - 238,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Latas
    page.drawText(element.cans, {
      x: 500,
      y: height - 249,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Pintura
    page.drawText(element.paint, {
      x: 500,
      y: height - 260,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // ESTADO DE COMODIDAD

    // Aire Acondicionado
    page.drawText(element.airConditioning, {
      x: 500,
      y: height - 273,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Silletería (Anclaje, estado)
    page.drawText(element.chairs, {
      x: 500,
      y: height - 285,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Encendedor
    page.drawText(element.lighter, {
      x: 500,
      y: height - 296,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Luz Interior o de techo
    page.drawText(element.interiorOrCeilingLight, {
      x: 500,
      y: height - 307,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // NIVELES Y PERDIDA DE LIQUIDOS

    // Nivel de Aceite de motor
    page.drawText(element.engineOilLevel, {
      x: 500,
      y: height - 318,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Nivel de liquido de frenos
    page.drawText(element.brakeFluidLevel, {
      x: 500,
      y: height - 330,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Nivel de agua del radiador
    page.drawText(element.radiatorWaterLevel, {
      x: 500,
      y: height - 342,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Nivel de agua de la batería
    page.drawText(element.batteryWaterLevel, {
      x: 500,
      y: height - 353,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Nivel de aceite hidráulico
    page.drawText(element.hydraulicOilLevel, {
      x: 500,
      y: height - 364,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Fugas de A.C.P.M
     page.drawText(element.acpmLeaks, {
      x: 500,
      y: height - 374,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Fugas de Agua
    page.drawText(element.waterLeaks, {
      x: 500,
      y: height - 385,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Fugas de Aceite de transmisión
    page.drawText(element.transmissionOilLeaks, {
      x: 500,
      y: height - 396,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Fuga aceite de caja
    page.drawText(element.boxOilLeak, {
      x: 500,
      y: height - 407,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Fugas de líquidos de frenos
    page.drawText(element.brakeFluidLeaks, {
      x: 500,
      y: height - 418,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // TABLERO DE CONTROL

    // Luces de Tablero
    page.drawText(element.tableLight, {
      x: 500,
      y: height - 429,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Nivel de Combustible
    page.drawText(element.fuelLevel, {
      x: 500,
      y: height - 440,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Odómetro
    page.drawText(element.odometer, {
      x: 500,
      y: height - 451,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Pito
    page.drawText(element.whistle, {
      x: 500,
      y: height - 462,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Tacómetro
    page.drawText(element.tachometer, {
      x: 500,
      y: height - 473,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Velocímetro
    page.drawText(element.speedometer, {
      x: 500,
      y: height - 484,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Indicador de Aceite
    page.drawText(element.oilIndicator, {
      x: 500,
      y: height - 495,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Indicador de Temperatura
    page.drawText(element.temperatureIndicator, {
      x: 500,
      y: height - 506,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

     // SEGURIDAD PASIVA

     // Cinturones de Seguridad
    page.drawText(element.seatBelts, {
      x: 500,
      y: height - 517,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Airbags
    page.drawText(element.airbags, {
      x: 500,
      y: height - 528,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Cristales (Vidrios)
    page.drawText(element.crystals, {
      x: 500,
      y: height - 539,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Apoyacabezas
    page.drawText(element.headrest, {
      x: 500,
      y: height - 550,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Estado Espejos
    page.drawText(element.mirrorStatus, {
      x: 500,
      y: height - 561,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Espejo Lateral Derecho
    page.drawText(element.rightSideMirror, {
      x: 500,
      y: height - 572,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Espejo Lateral Izquierdo
    page.drawText(element.leftSideMirror, {
      x: 500,
      y: height - 583,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Espejo Retrovisor
    page.drawText(element.rearViewMirror, {
      x: 500,
      y: height - 594,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    //SEGURIDAD ACTIVA

    // Estado de la Dirección
    page.drawText(element.addressStatus, {
      x: 500,
      y: height - 604,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Estado Suspensión Delantera
    page.drawText(element.frontSuspensionCondition, {
      x: 500,
      y: height - 615,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Amortiguadores
    page.drawText(element.shockAbsorbers, {
      x: 500,
      y: height - 626,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Estado suspensión Trasera
    page.drawText(element.rearSuspensionStatus, {
      x: 500,
      y: height - 637,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Estado Parabrisas
    page.drawText(element.windshieldCondition, {
      x: 500,
      y: height - 648,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Vidrio Frontal
    page.drawText(element.frontGlass, {
      x: 500,
      y: height - 659,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    //Page 2

    //ESTADO LUCES

    // Luces Medias
    page1.drawText(element.mediumLights, {
      x: 500,
      y: height - 93,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Luces Altas
    page1.drawText(element.highBeams, {
      x: 500,
      y: height - 104,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Luces Bajas
    page1.drawText(element.lowLights, {
      x: 500,
      y: height - 115,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Direccional Izquie. Delant.
    page1.drawText(element.leftDirectionalFront, {
      x: 500,
      y: height - 127,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Direccional Derec. Delant.
    page1.drawText(element.directionalRightFront, {
      x: 500,
      y: height - 138,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Direccional Izquie. Trasera
    page1.drawText(element.leftDirectionalRear, {
      x: 500,
      y: height - 149,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Direccional Derec. Trasera
    page1.drawText(element.directionalRightRear, {
      x: 500,
      y: height - 161,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Luces de Parqueo
    page1.drawText(element.parkingLights, {
      x: 500,
      y: height - 172,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Luz Freno
    page1.drawText(element.brakeLight, {
      x: 500,
      y: height - 183,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Luz Reverso
    page1.drawText(element.reverseLight, {
      x: 500,
      y: height - 195,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // L. Antiniebla Exploradoras
    page1.drawText(element.explorerFogLights, {
      x: 500,
      y: height - 207,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    //ESTADO LLANTAS

    // Delantera Derecha
    page1.drawText(element.rightFront, {
      x: 500,
      y: height - 219,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Delantera Izquierda
    page1.drawText(element.leftFront, {
      x: 500,
      y: height - 230,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Trasera Derecha
    page1.drawText(element.rightRear, {
      x: 500,
      y: height - 242,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Trasera Izquierda
    page1.drawText(element.rearLeft, {
      x: 500,
      y: height - 254,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Repuesto
    page1.drawText(element.replacement, {
      x: 500,
      y: height - 266,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Presión aire llanta
    page1.drawText(element.tireAirPressure, {
      x: 500,
      y: height - 277,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    //FRENOS

    // Estado de los Frenos
    page1.drawText(element.brakeCondition, {
      x: 500,
      y: height - 288,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Freno de Mano
    page1.drawText(element.handBrake, {
      x: 500,
      y: height - 299,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Pastillas
    page1.drawText(element.tablets, {
      x: 500,
      y: height - 311,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    //EQUIPO DE CARRETERA

    // 1 gato con capacidad para elevar el vehículo
    page1.drawText(element.oneJackWithTheCapacityToRaiseTheVehicle, {
      x: 500,
      y: height - 322,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // 1 chaleco reflectivo
    page1.drawText(element.oneReflectiveVest, {
      x: 500,
      y: height - 334,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // 2 tacos para bloquear el vehículo
    page1.drawText(element.twoBlocksToBlockTheVehicle, {
      x: 500,
      y: height - 345,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // 2 señales de carretera; conos o triangulos
    page1.drawText(element.twoRoadSigns, {
      x: 500,
      y: height - 357,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // 1 par de guantes industriales
    page1.drawText(element.onePairOfIndustrialGloves, {
      x: 500,
      y: height - 368,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // 1 cruceta
    page1.drawText(element.oneCrosshead, {
      x: 500,
      y: height - 380,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Extinguidor de fuego( capacidad mín. 5 lb)
    page1.drawText(element.fireExtinguisher, {
      x: 500,
      y: height - 392,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Linterna
    page1.drawText(element.flashLight, {
      x: 500,
      y: height - 404,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // caja de herramientas ( alicates, destornilladores de pala y estrella, llave de expansión y fijas )
    page1.drawText(element.toolBox, {
      x: 500,
      y: height - 419,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Botiquín de primeros auxilios
    page1.drawText(element.firstAidKit, {
      x: 500,
      y: height - 437,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    //DOCUMENTOS DEL VEHÍCULO

    // Soat
    page1.drawText(element.soat, {
      x: 500,
      y: height - 449,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Revisión Tecnomecánica y Certificación de Gases
    page1.drawText(element.technomechanicalReviewAndGasCertification, {
      x: 500,
      y: height - 461,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // seguro contractual y extracontractual
    page1.drawText(element.contractualAndNonContractualInsurance, {
      x: 500,
      y: height - 473,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Preventiva
    page1.drawText(element.preventive, {
      x: 500,
      y: height - 485,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Tarjeta de operación
    page1.drawText(element.operationCard, {
      x: 500,
      y: height - 496,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Tarjeta de propiedad
    page1.drawText(element.propertyCard, {
      x: 500,
      y: height - 508,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Licencia de conducción
    page1.drawText(element.drivingLicense, {
      x: 500,
      y: height - 520,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Observacion
    if (element.observation !== "") {
      let trozos = dividirCadena(element.observation, 80);
      if (trozos.length === 1) {
        // Observacion 1
        page1.drawText(trozos[0], {
          x: 185,
          y: height - 534,
          size: 8,
          color: rgb(0, 0, 0 , 1),
        })
      } else if (trozos.length === 2) {
        // Observacion 1
        page1.drawText(trozos[0], {
          x: 185,
          y: height - 534,
          size: 8,
          color: rgb(0, 0, 0 , 1),
        })
        // Observacion 2
        page1.drawText(trozos[0], {
          x: 185,
          y: height - 542,
          size: 8,
          color: rgb(0, 0, 0 , 1),
        })
      } else if (trozos.length === 3) {
        // Observacion 1
        page1.drawText(trozos[0], {
          x: 185,
          y: height - 534,
          size: 8,
          color: rgb(0, 0, 0 , 1),
        })
        // Observacion 2
        page1.drawText(trozos[0], {
          x: 185,
          y: height - 542,
          size: 8,
          color: rgb(0, 0, 0 , 1),
        })
         // Observacion 3
         page1.drawText(trozos[0], {
          x: 185,
          y: height - 550,
          size: 8,
          color: rgb(0, 0, 0 , 1),
        })
      }
    }

    // Propietario
    page1.drawText("MARIA EDITH SALAZAR RAMIREZ", {
      x: 145,
      y: height - 590,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Conductor
    page1.drawText(element.userDriver[0].names + ' ' + element.userDriver[0].surnames, {
      x: 390,
      y: height - 590,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    const pdfBytes = await pdfDoc.save()
    return new Blob([pdfBytes], { type: "application/pdf" });
    // Trigger the browser to download the PDF document 
    // download(pdfBytes,`preoperacional_diaria.pdf`, "application/pdf");
  }

  const dowlandPdfMonthly = async () => {

    // ---- 1 -----

    //aquí , traigo la fecha y hago un split
    let spllitMonthly = dateMonthly.split("-");
    // console.log(spllitMonthly);

    //Aquí tomo la fecha del input y la convierto a fecha
    let dateMonthEnd = new Date(parseInt(spllitMonthly[0]), parseInt(spllitMonthly[1]) - 1, parseInt(spllitMonthly[2]));
    // console.log(dateMonthEnd);

    //Aquí reseteo la fecha , para que el día siempre sea 01
    const dateMonthStart = new Date(parseInt(spllitMonthly[0]), parseInt(spllitMonthly[1]) - 1, 0o1);
    // console.log(dateMonthStart);

    let mtz = [];

    for (let i = 0; i < dataList.data.length; i++) {
      const element = dataList.data[i];

      //aquí , traigo la fecha y hago un split
      let spllitMonthSpace = element.date.split(" ");
      let spllitMonth = spllitMonthSpace[0].split("-");
      const dates = new Date(parseInt(spllitMonth[2]), parseInt(spllitMonth[1]) - 1, spllitMonth[0]);
      // console.log(element.date);
      // console.log(dates);

      if(dates >= dateMonthStart && dates <= dateMonthEnd && element.userVehicle[0]._id === opcionSelectUserVehicle) {
        // console.log(element.date);
        element.day = spllitMonth[0];
        mtz.push(element)
      }
    }

    // ---- 2 -----

    //Cargo el documento
    const pdf = await fetch(pdfMonthly).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdf);

    const page0 = pdfDoc.getPage(0);
    // const page1 = pdfDoc.getPage(1);
    // const page2 = pdfDoc.getPage(2);
    const { height } = page0.getSize();

    //Aquí lleno la lista , pero de la informacion general
    await createFieldGeneralInformation(page0,mtz,height)

    let positionFiledsPdf = {};
    const increase = [
      {x:160},
      {x:180},
      {x:200},
      {x:220},
      {x:240},
      {x:260},
      {x:280},
      {x:300},
      {x:320},
      {x:340},
      {x:360},
      {x:380},
      {x:400},
      {x:420},
      {x:440},
      {x:460},
      {x:480},
      {x:500},
    ]

    //Aqui lleno la lista , de los demas campos
    for (let isn = 0; isn < mtz.length; isn++) {
      const element = mtz[isn];

      // ESTADO DE PRESENTACIÓN
      positionFiledsPdf.internalToilet = { x:increase[parseFloat(element.day)].x, y:height - 180 }
      positionFiledsPdf.externalToilet = { x:increase[parseFloat(element.day)].x, y:height - 194 }
      await createField(page0,element,positionFiledsPdf);
       
    }
    const pdfBytess = await pdfDoc.save();
    download(pdfBytess, `preoperacional_mensual.pdf`, "application/pdf");
  }

  const createField = async (page0,element,positionFiledsPdf) => {
    // ESTADO DE PRESENTACIÓN
    // Aseo interno
    page0.drawText(element.internalToilet, {
      x: positionFiledsPdf.internalToilet.x,
      y: positionFiledsPdf.internalToilet.y,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // // Aseo externo
    page0.drawText(element.externalToilet, {
      x: positionFiledsPdf.externalToilet.x,
      y: positionFiledsPdf.externalToilet.y,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    return page0
  }

  const createFieldGeneralInformation = (page0,mtz,height) => {
    let mtzStart = mtz[mtz.length -1];
    let mtzEnd = mtz[0];

    // console.log(mtzStart);
    // console.log(mtzEnd);
    // INFORMACIÓN GENERAL

    // Fecha preoperacional
    page0.drawText(mtzEnd.date, {
      x: 150,
      y: height - 106,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Placa
    page0.drawText(mtzEnd.userVehicle[0].placa, {
      x: 323,
      y: height - 106,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Modelo
    page0.drawText(mtzEnd.userVehicle[0].model[0].name, {
      x: 460,
      y: height - 106,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Marca
    page0.drawText(mtzEnd.userVehicle[0].brand[0].name, {
      x: 580,
      y: height - 106,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Clase
    page0.drawText(mtzEnd.userVehicle[0].types[0].name, {
      x: 705,
      y: height - 106,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Número interno:
    page0.drawText(mtzEnd.userVehicle[0].internalNumber.toString(), {
      x: 120,
      y: height - 129,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Número interno
    page0.drawText(mtzEnd.userVehicle[0].internalNumber.toString(), {
      x: 120,
      y: height - 129,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Propietario
    page0.drawText("MARIA EDITH SALAZAR RAMIREZ", {
      x: 100,
      y: height - 139,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Identificacion del propietario
    page0.drawText("42691020", {
      x: 560,
      y: height - 128,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Kilometraje inicial
    page0.drawText(mtzStart.currentKm, {
      x: 722,
      y: height - 128,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Kilometraje final
    page0.drawText(mtzEnd.currentKm, {
      x: 718,
      y: height - 140,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    return page0
  } 

  // const cratePdfMonth = async () => { 
   // if(element.day === "08") {
      //   // ESTADO DE PRESENTACIÓN
      //   positionFiledsPdf.internalToilet = { x:320, y:height - 180 }
      //   positionFiledsPdf.externalToilet = { x:320, y:height - 194 }
      //   await createField(page0,element,positionFiledsPdf);
      // } 
      // if (element.day === "11") {
      //   // ESTADO DE PRESENTACIÓN
      //   positionFiledsPdf.internalToilet = { x:380, y:height - 180 }
      //   positionFiledsPdf.externalToilet = { x:380, y:height - 194 }
      //   await createField(page0,element,positionFiledsPdf);
      // }
  // }

  return (
    <div className='list-listCheck-main'>
      { view.list === true ?
        <>
          <DefaultTable data={dataList.data} nms={"listCheck"} deleteId={deleteInfo} updateId={updateInfo} selectCheck={selectCheck} />

          <div className='mt-4 user-create-main-input form-group'>
            <select value={opcionSelectPreoperacional} onChange={(e) => setOpcionSelectPreoperacional(e.target.value)} className='list-listCheck-input form-control'>
              <option value="">Selecciona una opción</option>
              {opcionPreoperacional.map((opcion, index) => (
                <option key={index} value={opcion.value}>
                  {opcion.value}
                </option>
              ))}
            </select>
          </div>

          {
            opcionSelectPreoperacional === "Preoperacional diaria" ? 
              <>
                <div>
                  <button type='button' className='btn btn-danger' onClick={dowlandPdfDiary}>Descargar</button>
                </div>
              </> 
            : opcionSelectPreoperacional === "Preoperacional mensual" ? 
              <>
                <div className='mt-4 user-create-main-input form-group'>
                  <label htmlFor="exampleInputEmail1">Seleccione un vehículo:</label>
                  <select value={opcionSelectUserVehicle} onChange={(e) => setOpcionSelectUserVehicle(e.target.value)} className='list-listCheck-input-date form-control'>
                    <option value="">Selecciona una opción</option>
                    {opcionUserVehicle.map((opcion, index) => (
                      <option key={index} value={opcion._id}>
                        {opcion.placa}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='mt-3 user-create-main-input'>
                  <label htmlFor="exampleInputEmail1">Mes de la preoperacional:</label>
                  <input value={dateMonthly} onChange={(e) => setDateMonthly(e.target.value)} type="date" className='list-listCheck-input-date form-control' />
                </div>
                <div className='mt-3'>
                  <button type='button' className='btn btn-danger' onClick={dowlandPdfMonthly}>Descargar</button>
                </div>
              </> 
            : <></>
          }

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