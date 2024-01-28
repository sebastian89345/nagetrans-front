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
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

//dowland
import download  from 'downloadjs';

//imagenes
import logoNagetrans from '../../../assets/img/logo.png'

function List() {
  const [view, setView] = useState({list:true,create:false,update:false});
  const [infoUpdate, setInfoUpdate] = useState({});
  const dataList = useSelector((store) => store.listCheckReducer);
  const dispatch = useDispatch();

  const [opcionPreoperacional, setOpcionPreoperacional] = useState([]);
  const [opcionSelectPreoperacional, setOpcionSelectPreoperacional] = useState('');
  const [inputstartLicense, setInputstartLicense] = useState("");
  const [dowmlandPdfDiary, setDowmlandPdfDiary] = useState([]);
  // const [dowmlandPdfMonthly, setDowmlandPdfMonthly] = useState([]);

  useEffect(() => {
    setOpcionPreoperacional([{value:"Preoperacional diaria"},{value:"Preoperacional mensual"}])
  }, [dataList])
  
  //Aqui hago la consulta a la base de datos y la agrego el payload al redux
  useEffect(() => {
    dispatch(getListCheckAllService());
  }, [dispatch])

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
    // console.log(dowmlandPdfDiary);

    const pdfDoc = await PDFDocument.create();

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const page = pdfDoc.addPage();
    const { width, height} = page.getSize();
    
    // console.log(width);
    // console.log(height);

    // Definir la altura y el ancho de las celdas
    const cellWidth = 515;
    const cellHeight = 640;

    // primer borde
    page.drawRectangle({
      x:40,
      y:140,
      width: cellWidth,
      height: cellHeight,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:2,
    });

    //texto
    page.drawText('REPORTE DIARIO REVISIÓN PREOPERACIONAL', {
      x: 70,
      y: height - 90,
      size: 12,
      font: timesRomanFont,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Nagetrans', {
      x: 180,
      y: height - 105,
      size: 10,
      font: timesRomanFont,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Nit: 901007799-6', {
      x: 180,
      y: height - 120,
      size: 10,
      font: timesRomanFont,
      color: rgb(0, 0, 0 ,1),
    })

    // Cargar la imagen desde tu proyecto de React
    const imagenBytes = await fetch(logoNagetrans).then((res) => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(imagenBytes);
    page.drawImage(pngImage, {
      x: 400,
      y: height - 130,
      width: 110,
      height: 70,
    })

    // bordes de los titulos
    page.drawRectangle({
      x:40,
      y: height - 145,
      width: cellWidth,
      height: 15,
      color:rgb(0.8, 0.8, 0.8),
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    //texto
    page.drawText('INFORMACIÓN GENERAL', {
      x: 230,
      y: height - 141,
      size: 10,
      font: timesRomanFont,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Fecha preoperacional: ', {
      x: 50,
      y: height - 160,
      size: 10,
      font: timesRomanFont,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('23/12/2023', {
      x: 160,
      y: height - 160,
      size: 9,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Placa: ', {
      x: 50,
      y: height - 170,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    //texto
    page.drawText('SWT714', {
      x: 85,
      y: height - 170,
      size: 9,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Modelo: ', {
      x: 170,
      y: height - 170,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    //texto
    page.drawText('2019', {
      x: 210,
      y: height - 170,
      size: 9,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Número interno: ', {
      x: 50,
      y: height - 180,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    //texto
    page.drawText('001714', {
      x: 130,
      y: height - 180,
      size: 9,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Conductor:', {
      x: 50,
      y: height - 190,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    //texto
    page.drawText('JORGE ALBERTO NAGED ORTIZ', {
      x: 110,
      y: height - 190,
      size: 9,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Propietario:', {
      x: 50,
      y: height - 200,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    page.drawText('OPERADOR LOGISTICO Y DE', {
      x: 110,
      y: height - 200,
      size: 9,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('TRANSPORTE NAGETRANS ZOMAC S.A.S.', {
      x: 50,
      y: height - 210,
      size: 9,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Kilometraje:', {
      x: 270,
      y: height - 160,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    //texto
    page.drawText('113.500', {
      x: 330,
      y: height - 160,
      size: 9,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Marca:', {
      x: 270,
      y: height - 170,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    //texto
    page.drawText('RENAULT', {
      x: 305,
      y: height - 170,
      size: 9,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Clase:', {
      x: 400,
      y: height - 170,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    //texto
    page.drawText('Camioneta', {
      x: 435,
      y: height - 170,
      size: 9,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Número tarjeta operación:', {
      x: 270,
      y: height - 180,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    //texto
    page.drawText('298455', {
      x: 400,
      y: height - 180,
      size: 9,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Identificación del conductor:', {
      x: 270,
      y: height - 190,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    //texto
    page.drawText('93180662', {
      x: 410,
      y: height - 190,
      size: 9,
      color: rgb(0, 0, 0 ,1),
    })

    //texto
    page.drawText('Identificación del Propietario:', {
      x: 270,
      y: height - 200,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    //texto
    page.drawText('901158731', {
      x: 415,
      y: height - 200,
      size: 10,
      color: rgb(0, 0, 0 ,1),
    })
   
    // bordes de los titulos
    page.drawRectangle({
      x:40,
      y: height - 230,
      width: cellWidth,
      height: 15,
      color:rgb(0.8, 0.8, 0.8),
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    //texto
    page.drawText('DETALLE PREOPERACIONAL DIARIO', {
      x: 210,
      y: height - 226,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    // 1 borde de los titulos
    page.drawRectangle({
      x:40,
      y: height - 245,
      width: 150,
      height: 15,
      color:rgb(0.8, 0.8, 0.8),
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // 2 borde de los titulos
    page.drawRectangle({
      x:190,
      y: height - 245,
      width: 215,
      height: 15,
      color:rgb(0.8, 0.8, 0.8),
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // 3 borde de los titulos
    page.drawRectangle({
      x:405,
      y: height - 245,
      width: 150,
      height: 15,
      color:rgb(0.8, 0.8, 0.8),
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    //texto
    page.drawText('GRUPO', {
      x: 100,
      y: height - 241,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    //texto
    page.drawText('DESCRIPCIÓN', {
      x: 270,
      y: height - 241,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    //texto
    page.drawText('CUMPLE', {
      x: 460,
      y: height - 241,
      size: 10,
      color: rgb(0, 0, 0 ,1),
      font: timesRomanFont,
    })

    // borde fila 1
    page.drawRectangle({
      x:40,
      y: height - 317,
      width: 150,
      height: 72,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde fila 2
    page.drawRectangle({
      x:190,
      y: height - 257,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2
    page.drawRectangle({
      x:190,
      y: height - 269,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2
    page.drawRectangle({
      x:190,
      y: height - 281,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2
    page.drawRectangle({
      x:190,
      y: height - 293,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2
    page.drawRectangle({
      x:190,
      y: height - 305,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2
    page.drawRectangle({
      x:190,
      y: height - 317,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde fila 3
    page.drawRectangle({
      x:405,
      y: height - 257,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 3
    page.drawRectangle({
      x:405,
      y: height - 269,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 3
    page.drawRectangle({
      x:405,
      y: height - 281,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 3
    page.drawRectangle({
      x:405,
      y: height - 293,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 3
    page.drawRectangle({
      x:405,
      y: height - 305,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 3
    page.drawRectangle({
      x:405,
      y: height - 317,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    //texto 1
    page.drawText('Revisión Interna', {
      x: 50,
      y: height - 260,
      size: 10,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Limpia Parabrisas', {
      x: 195,
      y: height - 254,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Freno de Emergencia', {
      x: 195,
      y: height - 266,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Pito', {
      x: 195,
      y: height - 278,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Cinturones de Seguridad', {
      x: 195,
      y: height - 290,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Elevavidrios', {
      x: 195,
      y: height - 302,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Iluminación', {
      x: 195,
      y: height - 314,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3 
    page.drawText('SI', {
      x: 475,
      y: height - 254,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3 
    page.drawText('SI', {
      x: 475,
      y: height - 266,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3 
    page.drawText('SI', {
      x: 475,
      y: height - 278,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3 
    page.drawText('SI', {
      x: 475,
      y: height - 290,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3 
    page.drawText('SI', {
      x: 475,
      y: height - 302,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3 
    page.drawText('SI', {
      x: 475,
      y: height - 314,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    // columna 1 - fila 2  
    page.drawRectangle({
      x:40,
      y: height - 438,
      width: 150,
      height: 120,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // columna 2 - fila 2  
    page.drawRectangle({
      x:190,
      y: height - 330,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2 
    page.drawRectangle({
      x:190,
      y: height - 342,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2 
    page.drawRectangle({
      x:190,
      y: height - 354,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2 
    page.drawRectangle({
      x:190,
      y: height - 366,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2 
    page.drawRectangle({
      x:190,
      y: height - 378,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2 
    page.drawRectangle({
      x:190,
      y: height - 390,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2 
    page.drawRectangle({
      x:190,
      y: height - 402,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2 
    page.drawRectangle({
      x:190,
      y: height - 414,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2 
    page.drawRectangle({
      x:190,
      y: height - 426,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 2 
    page.drawRectangle({
      x:190,
      y: height - 438,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

     // columna 3 - fila 2  
     page.drawRectangle({
      x:405,
      y: height - 330,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 3 
    page.drawRectangle({
      x:405,
      y: height - 342,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 3 
    page.drawRectangle({
      x:405,
      y: height - 354,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 3 
    page.drawRectangle({
      x:405,
      y: height - 366,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 3 
    page.drawRectangle({
      x:405,
      y: height - 378,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 3 
    page.drawRectangle({
      x:405,
      y: height - 390,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

     // borde 3 
     page.drawRectangle({
      x:405,
      y: height - 402,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

     // borde 3 
     page.drawRectangle({
      x:405,
      y: height - 414,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 3 
    page.drawRectangle({
      x:405,
      y: height - 426,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // borde 3 
    page.drawRectangle({
      x:405,
      y: height - 438,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    //texto 1
    page.drawText('Revisión Externa', {
      x: 50,
      y: height - 333,
      size: 10,
      color: rgb(0, 0, 0 ,1),
    })

    //texto - columna 2 - fila 2
    page.drawText('Direccionales', {
      x: 195,
      y: height - 327,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Estacionarias', {
      x: 195,
      y: height - 339,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Luces Altas', {
      x: 195,
      y: height - 351,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Luces Bajas', {
      x: 195,
      y: height - 363,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Stop', {
      x: 195,
      y: height - 375,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Reverso', {
      x: 195,
      y: height - 387,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Batería', {
      x: 195,
      y: height - 399,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Desgaste Llantas', {
      x: 195,
      y: height - 411,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Estado Llantas', {
      x: 195,
      y: height - 423,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Presión Aire Llantas', {
      x: 195,
      y: height - 435,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3 - columna 3 - fila 2
    page.drawText('SI', {
      x: 475,
      y: height - 327,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3
    page.drawText('SI', {
      x: 475,
      y: height - 339,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3
    page.drawText('SI', {
      x: 475,
      y: height - 351,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3
    page.drawText('SI', {
      x: 475,
      y: height - 363,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3
    page.drawText('SI', {
      x: 475,
      y: height - 375,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3
    page.drawText('SI', {
      x: 475,
      y: height - 387,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3
    page.drawText('SI', {
      x: 475,
      y: height - 399,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3
    page.drawText('SI', {
      x: 475,
      y: height - 411,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3
    page.drawText('SI', {
      x: 475,
      y: height - 423,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3
    page.drawText('SI', {
      x: 475,
      y: height - 435,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    // celda - columna 1 - fila 3  
    page.drawRectangle({
      x:40,
      y: height - 487,
      width: 150,
      height: 48,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // celda - columna 2 - fila 3  
    page.drawRectangle({
      x:190,
      y: height - 451,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // celda 2 
    page.drawRectangle({
      x:190,
      y: height - 463,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // celda 2 
    page.drawRectangle({
      x:190,
      y: height - 475,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // celda 2 
    page.drawRectangle({
      x:190,
      y: height - 487,
      width: 215,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // celda - columna 3 - fila 3  
    page.drawRectangle({
      x:405,
      y: height - 451,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // celda 3 
    page.drawRectangle({
      x:405,
      y: height - 463,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // celda 3 
    page.drawRectangle({
      x:405,
      y: height - 475,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    // celda 3 
    page.drawRectangle({
      x:405,
      y: height - 487,
      width: 150,
      height: 12,
      borderColor:rgb(0, 0, 0 ,1),
      borderWidth:0.5,
    });

    //texto - columna 1 - fila 3
    page.drawText('Motor', {
      x: 50,
      y: height - 455,
      size: 10,
      color: rgb(0, 0, 0 ,1),
    })

    //texto - columna 2 - fila 3
    page.drawText('Fugas de Motor', {
      x: 195,
      y: height - 448,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Fugas en Frenos', {
      x: 195,
      y: height - 460,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Tensión Correas', {
      x: 195,
      y: height - 472,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 2
    page.drawText('Filtros Húmedos', {
      x: 195,
      y: height - 484,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3 - columna 3 - fila 3
    page.drawText('SI', {
      x: 475,
      y: height - 448,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3
    page.drawText('SI', {
      x: 475,
      y: height - 460,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3
    page.drawText('SI', {
      x: 475,
      y: height - 472,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    //texto 3
    page.drawText('SI', {
      x: 475,
      y: height - 484,
      size: 8,
      color: rgb(0, 0, 0 ,1),
    })

    const pdfBytes = await pdfDoc.save()

    // Trigger the browser to download the PDF document
    download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
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
                  <button onClick={dowlandPdfDiary}>Descargar 1</button>
                </div>
              </> 
            : opcionSelectPreoperacional === "Preoperacional mensual" ? 
              <>
                <div className='mt-4 user-create-main-input'>
                  <label htmlFor="exampleInputEmail1">Mes de la preoperacional:</label>
                  <input value={inputstartLicense} onChange={(e) => setInputstartLicense(e.target.value)} type="date" className='list-listCheck-input-date form-control' />
                </div>
                <div>
                  {/* <button onCanPlay={dowlandPdfMonthly}>Descargar 2</button> */}
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