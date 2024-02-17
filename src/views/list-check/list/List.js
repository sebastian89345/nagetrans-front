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

//Alertas 
import Swal from 'sweetalert2';

// pdf-lib
import { PDFDocument, rgb } from 'pdf-lib';

//dowland
import download  from 'downloadjs';

//documentos
import pdfDiary from '../../../docs/pdfDiary.pdf';

function List() {
  const [view, setView] = useState({list:true,create:false,update:false});
  const [infoUpdate, setInfoUpdate] = useState({});
  const dataList = useSelector((store) => store.listCheckReducer);
  
  const [opcionPreoperacional, setOpcionPreoperacional] = useState([]);
  const [opcionSelectPreoperacional, setOpcionSelectPreoperacional] = useState('');
  const [inputstartLicense, setInputstartLicense] = useState("");
  const [dowmlandPdfDiary, setDowmlandPdfDiary] = useState([]);
  // const [dowmlandPdfMonthly, setDowmlandPdfMonthly] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpcionPreoperacional([{value:"Preoperacional diaria"},{value:"Preoperacional mensual"}])
  }, [dataList])
  
  //Aqui hago la consulta a la base de datos y la agrego el payload al redux
  useEffect(() => {
    dispatch(getListCheckAllService());
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

  const createPdf = async (element,i) => {
    console.log(element);
    const pdf = await fetch(pdfDiary).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdf);

    const page = pdfDoc.getPage(0);
    const { height } = page.getSize();

    // nit
    page.drawText('901158731-3', {
      x: 195,
      y: height - 98,
      size: 9,
      color: rgb(0, 0, 0 , 1),
    })

    // Fecha preoperacional
    page.drawText('23/12/2023', {
      x: 155,
      y: height - 143,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Placa
    page.drawText(element.userVehicle[0].placa, {
      x: 80,
      y: height - 153,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Modelo
    page.drawText(element.userVehicle[0].model[0].name, {
      x: 205,
      y: height - 153,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // // Marca
    page.drawText(element.userVehicle[0].brand[0].name, {
      x: 300,
      y: height - 153,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // // Clase
    page.drawText(element.userVehicle[0].types[0].name, {
      x: 430,
      y: height - 153,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })
    
    // Número interno
    page.drawText('0', {
      x: 125,
      y: height - 164,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Conductor
    page.drawText(element.userDriver[0].names + " " + element.userDriver[0].surnames, {
      x: 100,
      y: height - 174,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Kilometraje
    page.drawText(element.currentKm, {
      x: 325,
      y: height - 143,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Número tarjeta operación
    page.drawText('298455', {
      x: 390,
      y: height - 164,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Identificación del conductor
    page.drawText(element.userDriver[0].dni, {
      x: 405,
      y: height - 175,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Identificación del Propietario
    page.drawText('901158731', {
      x: 410,
      y: height - 186,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // DETALLE PREOPERACIONAL DIARIO

    // Limpia Parabrisas
    page.drawText(element.wiperWasher, {
      x: 475,
      y: height - 244,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Freno de Emergencia
    page.drawText(element.emergencyBrake, {
      x: 475,
      y: height - 257,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Pito
    page.drawText(element.whistle, {
      x: 475,
      y: height - 270,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Cinturones de Seguridad
    page.drawText(element.safetyBelts, {
      x: 475,
      y: height - 283,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Elevavidrios
    page.drawText(element.glassLifter, {
      x: 475,
      y: height - 296,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Iluminación
    page.drawText(element.lightning, {
      x: 475,
      y: height - 309,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Direccionales
    page.drawText(element.directionals, {
      x: 475,
      y: height - 322,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Estacionarias
    page.drawText(element.stationary, {
      x: 475,
      y: height - 335,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Luces Altas
    page.drawText(element.highBeams, {
      x: 475,
      y: height - 348,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Luces Bajas
    page.drawText(element.lowLights, {
      x: 475,
      y: height - 360,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Stop
    page.drawText(element.stop, {
      x: 475,
      y: height - 372,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Reverso
    page.drawText(element.reverse, {
      x: 475,
      y: height - 384,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Batería
    page.drawText(element.battery, {
      x: 475,
      y: height - 396,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Desgaste Llantas
    page.drawText(element.tireWear, {
      x: 475,
      y: height - 409,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Estado Llantas
    page.drawText(element.tireCondition, {
      x: 475,
      y: height - 422,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Presión Aire Llantas
    page.drawText(element.tireAirPressure, {
      x: 475,
      y: height - 435,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Fugas de Motor
    page.drawText(element.engineLeaks, {
      x: 475,
      y: height - 449,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Fugas en Frenos
    page.drawText(element.brakeLeaks, {
      x: 475,
      y: height - 463,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Tensión Correas
    page.drawText(element.beltTension, {
      x: 475,
      y: height - 476,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Filtros Húmedos
    page.drawText(element.wetFilters, {
      x: 475,
      y: height - 489,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Aceite de Motor
    page.drawText(element.motorOil, {
      x: 475,
      y: height - 501,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Aceite Transmisión
    page.drawText(element.transmissionOil, {
      x: 475,
      y: height - 512,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Refrigerante
    page.drawText(element.refrigerant, {
      x: 475,
      y: height - 523,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Agua Limpiabrisas
    page.drawText(element.windshieldWiperWater, {
      x: 475,
      y: height - 534,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Aditivos Radiador
    page.drawText(element.radiatorAdditives, {
      x: 475,
      y: height - 545,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Equipo de Carretera
    page.drawText(element.roadTeam, {
      x: 475,
      y: height - 556,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Botiquín
    page.drawText(element.firstAidKit, {
      x: 475,
      y: height - 567,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Extintor
    page.drawText(element.extinguisher, {
      x: 475,
      y: height - 578,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Cruceta
    page.drawText(element.crossPiece, {
      x: 475,
      y: height - 589,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Gato
    page.drawText(element.cat, {
      x: 475,
      y: height - 600,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Tacos
    page.drawText(element.tacos, {
      x: 475,
      y: height - 611,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Señales
    page.drawText(element.signs, {
      x: 475,
      y: height - 622,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Chaleco
    page.drawText(element.vest, {
      x: 475,
      y: height - 633,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Linterna
    page.drawText(element.flashlight, {
      x: 475,
      y: height - 644,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // ¿Porta Guantes?
    page.drawText(element.gloveHolder, {
      x: 475,
      y: height - 654,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // ¿Porta su Tapabocas?
    page.drawText(element.wearYourFaceMask, {
      x: 475,
      y: height - 665,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // ¿Porta Gel Antibacterial o Alcohol?
    page.drawText(element.antibacterialGelOrAlcoholHolder, {
      x: 475,
      y: height - 676,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    // Conductor
    page.drawText(element.userDriver[0].names + " " + element.userDriver[0].surnames, {
      x: 370,
      y: height - 726,
      size: 8,
      color: rgb(0, 0, 0 , 1),
    })

    const pdfBytes = await pdfDoc.save()
    return new Blob([pdfBytes], { type: "application/pdf" });
    // Trigger the browser to download the PDF document 
    // download(pdfBytes,`preoperacional_diaria.pdf`, "application/pdf");
  }

  // const dowlandPdfMonthly = () => {}

  return (
    <div className='list-listCheck-main'>
      { view.list === true ?
        <>
          <DefaultTable data={dataList.data} nms={"listCheck"} deleteId={deleteInfo} updateId={updateInfo} selectCheck={selectCheck} />

          <div className='mt-4 user-create-main-input form-group'>
            {/* <label htmlFor="exampleInputEmail1">Preoperacional:</label> */}
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
                <div className='mt-4 user-create-main-input'>
                  <label htmlFor="exampleInputEmail1">Mes de la preoperacional:</label>
                  <input value={inputstartLicense} onChange={(e) => setInputstartLicense(e.target.value)} type="date" className='list-listCheck-input-date form-control' />
                </div>
                <div>
                  {/* <button type='button' className='btn btn-danger' onCanPlay={dowlandPdfMonthly}>Descargar</button> */}
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