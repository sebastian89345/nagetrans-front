import React, { useState } from 'react';

//Hoja de estilos
import './DefaultTable.css';

const DefaultTable = ({ data , nms , updateId , deleteId , selectCheck}) => {

  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 10; // Cambia este valor según tus necesidades

  // Filtra los datos según el valor del filtro
  const datosFiltrados = data.filter(item => {
    let response;
    if(nms === "user"){
      response =  item.user.toLowerCase().includes(filtro.toLowerCase())
    } else if (nms === "driverDocument") {
      response =  item.users[0].user.toLowerCase().includes(filtro.toLowerCase())
    } else if (nms === "vehicleDocument") {
      response =  item.users[0].user.toLowerCase().includes(filtro.toLowerCase())
    } else if (nms === "listCheck") {
      response =  item.userVehicle[0].placa.toLowerCase().includes(filtro.toLowerCase())
    } else if(nms === "role" || nms === "status" || nms === "brand" || nms === "model" || nms === "type" || nms === "arl" || nms === "afp" || nms === "eps" || nms === "compensationBox"){
      response = item.name.toLowerCase().includes(filtro.toLowerCase())
    } 
    return response ;
   }
  );

  // Calcula el índice de inicio y final para la paginación
  const indiceInicio = (paginaActual - 1) * filasPorPagina;
  const indiceFinal = indiceInicio + filasPorPagina;

  // Datos a mostrar en la página actual
  const datosPaginaActual = datosFiltrados.slice(indiceInicio, indiceFinal);

  // Calcula el número total de páginas
  const numeroTotalPaginas = Math.ceil(datosFiltrados.length / filasPorPagina);

  // Cambia la página actual
  const cambiarPagina = numeroPagina => {
   setPaginaActual(numeroPagina);
  };

  const responseTh = () => {
    let th ;
    if(nms === "user"){
      th = <>
        <th scope="col">Usuario</th>
        <th scope="col">Correo</th>
        <th scope="col">Rol</th>
        <th scope="col">Mostrar</th>
      </>
    } else if (nms === "driverDocument") {
      th = <>
        <th scope="col">Usuario</th>
        <th scope="col">Número de Licencia</th>
        <th scope="col">ARL</th>
        <th scope="col">AFP</th>
        <th scope="col">EPS</th>
        <th scope="col">Caja de Compensación</th>
      </>
    } else if (nms === "vehicleDocument") {
      th = <>
        <th className="DefaultTable-header-th-width" scope="col">Usuario</th>
        <th className="DefaultTable-header-th-width" scope="col">Soat</th>
        <th className="DefaultTable-header-th-width" scope="col">Técnico Mecánica</th>
        <th className="DefaultTable-header-th-width" scope="col">Tarjeta de Operación</th>
        <th className="DefaultTable-header-th-width" scope="col">Tarjeta de Propiedad</th>
        <th className="DefaultTable-header-th-width" scope="col">Seguro RCC RCE</th>
        <th className="DefaultTable-header-th-width" scope="col">Extracto</th>
        <th className="DefaultTable-header-th-width" scope="col">Revisión Preventiva</th>
        <th className="DefaultTable-header-th-width" scope="col">Inicio Soat</th>
        <th className="DefaultTable-header-th-width" scope="col">Venciento Soat</th>
        <th className="DefaultTable-header-th-width" scope="col">Inicio Técnico Mecánica</th>
        <th className="DefaultTable-header-th-width" scope="col">Venciento Técnico Mecánica</th>
        <th className="DefaultTable-header-th-width" scope="col">Inicio Tarjeta de Operación</th>
        <th className="DefaultTable-header-th-width" scope="col">Venciento Tarjeta de Operación</th>
        <th className="DefaultTable-header-th-width" scope="col">Inicio Tarjeta de Propiedad</th>
        <th className="DefaultTable-header-th-width" scope="col">Inicio Seguro RCC RCE</th>
        <th className="DefaultTable-header-th-width" scope="col">Venciento Seguro RCC RCE</th>
        <th className="DefaultTable-header-th-width" scope="col">Inicio Extracto</th>
        <th className="DefaultTable-header-th-width" scope="col">Venciento Extracto</th>
        <th className="DefaultTable-header-th-width" scope="col">Inicio Revisión Preventiva</th>
        <th className="DefaultTable-header-th-width" scope="col">Venciento Revisión Preventiva</th>
      </>
    } else if (nms === "listCheck") {
      th = <>
        <th className="DefaultTable-header-th-width" scope="col">Preoperacional Diaria</th>
        <th className="DefaultTable-header-th-width" scope="col">Placa</th>
        <th className="DefaultTable-header-th-width" scope="col">Cédula</th>
        <th className="DefaultTable-header-th-width" scope="col">Kilometraje Actual</th>
        <th className="DefaultTable-header-th-width" scope="col">Proxímo Cambio de Aceite</th>
        <th className="DefaultTable-header-th-width" scope="col">Fecha</th>
        {/* ESTADO DE PRESENTACIÓN */}
        <th className="DefaultTable-header-th-width" scope="col">Aseo Interno</th>
        <th className="DefaultTable-header-th-width" scope="col">Aseo Externo</th>
        <th className="DefaultTable-header-th-width" scope="col">Latas</th>
        <th className="DefaultTable-header-th-width" scope="col">Pintura</th>
        {/* ESTADO DE COMODIDAD */}
        <th className="DefaultTable-header-th-width" scope="col">Aire Acondicionado</th>
        <th className="DefaultTable-header-th-width" scope="col">Silletería</th>
        <th className="DefaultTable-header-th-width" scope="col">Encendedor</th>
        <th className="DefaultTable-header-th-width" scope="col">Luz Interior o de Techo</th>
        {/* NIVELES Y PERDIDA DE LIQUIDOS */}
        <th className="DefaultTable-header-th-width" scope="col">Nivel de Aceite de Motor</th>
        <th className="DefaultTable-header-th-width" scope="col">Nivel de Liquido de Frenos</th>
        <th className="DefaultTable-header-th-width" scope="col">Nivel de Agua del Radiador</th>
        <th className="DefaultTable-header-th-width" scope="col">Nivel de Agua de la Batería</th>
        <th className="DefaultTable-header-th-width" scope="col">Nivel de Aceite Hidráulico</th>
        <th className="DefaultTable-header-th-width" scope="col">Fugas de A.C.P.M</th>
        <th className="DefaultTable-header-th-width" scope="col">Fugas de Agua</th>
        <th className="DefaultTable-header-th-width" scope="col">Fugas de Aceite de Transmisión</th>
        <th className="DefaultTable-header-th-width" scope="col">Fuga Aceite de Caja</th>
        <th className="DefaultTable-header-th-width" scope="col">Fugas de Líquidos de Frenos</th>
        {/* TABLERO DE CONTROL */}
        <th className="DefaultTable-header-th-width" scope="col">Luces de Tablero</th>
        <th className="DefaultTable-header-th-width" scope="col">Nivel de Combustible</th>
        <th className="DefaultTable-header-th-width" scope="col">Odómetro</th>
        <th className="DefaultTable-header-th-width" scope="col">Pito</th>
        <th className="DefaultTable-header-th-width" scope="col">Tacómetro</th>
        <th className="DefaultTable-header-th-width" scope="col">Velocímetro</th>
        <th className="DefaultTable-header-th-width" scope="col">Indicador de Aceite</th>
        <th className="DefaultTable-header-th-width" scope="col">Indicador de Temperatura</th>
        {/* SEGURIDAD PASIVA */}
        <th className="DefaultTable-header-th-width" scope="col">Cinturones de Seguridad</th>
        <th className="DefaultTable-header-th-width" scope="col">Airbags</th>
        <th className="DefaultTable-header-th-width" scope="col">Cristales</th>
        <th className="DefaultTable-header-th-width" scope="col">Apoyacabezas</th>
        <th className="DefaultTable-header-th-width" scope="col">Estado Espejos</th>
        <th className="DefaultTable-header-th-width" scope="col">Espejo Lateral Derecho</th>
        <th className="DefaultTable-header-th-width" scope="col">Espejo Lateral Izquierdo</th>
        <th className="DefaultTable-header-th-width" scope="col">Espejo Retrovisor</th>
        {/* SEGURIDAD ACTIVA */}
        <th className="DefaultTable-header-th-width" scope="col">Estado de la Dirección</th>
        <th className="DefaultTable-header-th-width" scope="col">Estado Suspensión Delantera</th>
        <th className="DefaultTable-header-th-width" scope="col">Amortiguadores</th>
        <th className="DefaultTable-header-th-width" scope="col">Estado Suspensión Trasera</th>
        <th className="DefaultTable-header-th-width" scope="col">Estado Parabrisas</th>
        <th className="DefaultTable-header-th-width" scope="col">Vidrio Frontal</th>
        {/* ESTADO LUCES */}
        <th className="DefaultTable-header-th-width" scope="col">Luces Medias</th>
        <th className="DefaultTable-header-th-width" scope="col">Luces Altas</th>
        <th className="DefaultTable-header-th-width" scope="col">Luces Bajas</th>
        <th className="DefaultTable-header-th-width" scope="col">Direccional Izquie. Delant.</th>
        <th className="DefaultTable-header-th-width" scope="col">Direccional Derec. Delant.</th>
        <th className="DefaultTable-header-th-width" scope="col">Direccional Izquie. Trasera</th>
        <th className="DefaultTable-header-th-width" scope="col">Direccional Derec. Trasera</th>
        <th className="DefaultTable-header-th-width" scope="col">Luces de Parqueo</th>
        <th className="DefaultTable-header-th-width" scope="col">Luz Freno</th>
        <th className="DefaultTable-header-th-width" scope="col">Luz Reverso</th>
        <th className="DefaultTable-header-th-width" scope="col">L. Antiniebla Exploradoras</th>
        {/* ESTADO LLANTAS */}
        <th className="DefaultTable-header-th-width" scope="col">Delantera Derecha</th>
        <th className="DefaultTable-header-th-width" scope="col">Delantera Izquierda</th>
        <th className="DefaultTable-header-th-width" scope="col">Trasera Derecha</th>
        <th className="DefaultTable-header-th-width" scope="col">Trasera Izquierda</th>
        <th className="DefaultTable-header-th-width" scope="col">Repuesto</th>
        <th className="DefaultTable-header-th-width" scope="col">Presión Aire Llanta</th>
        {/* FRENOS */}
        <th className="DefaultTable-header-th-width" scope="col">Estado de los Frenos</th>
        <th className="DefaultTable-header-th-width" scope="col">Freno de Mano</th>
        <th className="DefaultTable-header-th-width" scope="col">Pastillas</th>
        {/* EQUIPO DE CARRETERA */}
        <th className="DefaultTable-header-th-width" scope="col">Gato</th>
        <th className="DefaultTable-header-th-width" scope="col">Chaleco Reflectivo</th>
        <th className="DefaultTable-header-th-width" scope="col">Tacos</th>
        <th className="DefaultTable-header-th-width" scope="col">Señales de Carretera</th>
        <th className="DefaultTable-header-th-width" scope="col">Guantes Industriales</th>
        <th className="DefaultTable-header-th-width" scope="col">Cruceta</th>
        <th className="DefaultTable-header-th-width" scope="col">Extinguidor de Fuego</th>
        <th className="DefaultTable-header-th-width" scope="col">Linterna</th>
        <th className="DefaultTable-header-th-width" scope="col">Caja de Herramientas</th>
        <th className="DefaultTable-header-th-width" scope="col">Botiquín</th>
        {/* DOCUMENTOS DEL VEHÍCULO */}
        <th className="DefaultTable-header-th-width" scope="col">Soat</th>
        <th className="DefaultTable-header-th-width" scope="col">Revisión Tecnomecánica y Certificación de Gases</th>
        <th className="DefaultTable-header-th-width" scope="col">Seguro Contractual y Extracontractual</th>
        <th className="DefaultTable-header-th-width" scope="col">Preventiva</th>
        <th className="DefaultTable-header-th-width" scope="col">Tarjeta de Operación</th>
        <th className="DefaultTable-header-th-width" scope="col">Tarjeta de Propiedad</th>
        <th className="DefaultTable-header-th-width" scope="col">Licencia de Conducción</th>
      </>
    } else if (nms === "role" || nms === "status" || nms === "brand" || nms === "model" || nms === "type" || nms === "arl" || nms === "afp" || nms === "eps" || nms === "compensationBox"){
      th = <>
        <th scope="col">Nombre</th>
      </>
    } 
    return th ;
  }

  const responseTd = (item) => {
    let td ;
    if(nms === "user") {
      td = <>
        <td>{item.user}</td>
        <td>{item.email}</td>
        <td>{item.role[0].name}</td>
        <td>{item.show}</td>
      </>
    } else if (nms === "driverDocument") {
      td = <>
        <td>{item.users[0].user}</td>
        <td>{item.numberLicense}</td>
        <td>{item.arl[0].name}</td>
        <td>{item.afp[0].name}</td>
        <td>{item.eps[0].name}</td>
        <td>{item.compesationBox[0].name}</td>
      </>
    } else if (nms === "vehicleDocument") {
      td = <>
        <td>{item.users[0].user}</td>
        <td>{item.soat}</td>
        <td>{item.mechanicalTechnician}</td>
        <td>{item.operationsCard}</td>
        <td>{item.propertyCards}</td>
        <td>{item.sureRccece}</td>
        <td>{item.extract}</td>
        <td>{item.preventiveReview}</td>
        <td>{item.dateStartSoat}</td>
        <td>{item.dateExpirationSoat}</td>
        <td>{item.dateStartMechanicalTechnician}</td>
        <td>{item.dateExpirationMechanicalTechnician}</td>
        <td>{item.dateStartCardOperations}</td>
        <td>{item.dateExpirationCardOperations}</td>
        <td>{item.dateStartCardProperties}</td>
        <td>{item.dateStartSureRccece}</td>
        <td>{item.dateExpirationSureRccece}</td>
        <td>{item.dateStartExtract}</td>
        <td>{item.dateExpirationExtract}</td>
        <td>{item.dateStartPreventiveReview}</td>
        <td>{item.dateExpirationPreventiveReview}</td>
      </>
    } else if (nms === "listCheck") {
      td = <>
        <td className='text-center'>
          <input type="checkbox" className="DefaultTable-check form-check-input" onChange={() => selectCheck(item)} />
        </td>
        <td>{item.userVehicle[0].placa}</td>
        <td>{item.userDriver[0].dni}</td>
        <td>{item.currentKm}</td>
        <td>{item.oilChange}</td>
        <td className='DefaultTable-table-width'>{item.date}</td>
        {/* ESTADO DE PRESENTACIÓN */}
        <td>{item.internalToilet}</td>
        <td>{item.externalToilet}</td>
        <td>{item.cans}</td>
        <td>{item.paint}</td>
        {/* ESTADO DE COMODIDAD */}
        <td>{item.airConditioning}</td>
        <td>{item.chairs}</td>
        <td>{item.lighter}</td>
        <td>{item.interiorOrCeilingLight}</td>
        {/* NIVELES Y PERDIDA DE LIQUIDOS */}
        <td>{item.engineOilLevel}</td>
        <td>{item.brakeFluidLevel}</td>
        <td>{item.radiatorWaterLevel}</td>
        <td>{item.batteryWaterLevel}</td>
        <td>{item.hydraulicOilLevel}</td>
        <td>{item.acpmLeaks}</td>
        <td>{item.waterLeaks}</td>
        <td>{item.transmissionOilLeaks}</td>
        <td>{item.boxOilLeak}</td>
        <td>{item.brakeFluidLeaks}</td>
        {/* TABLERO DE CONTROL */}
        <td>{item.tableLight}</td>
        <td>{item.fuelLevel}</td>
        <td>{item.odometer}</td>
        <td>{item.whistle}</td>
        <td>{item.tachometer}</td>
        <td>{item.speedometer}</td>
        <td>{item.oilIndicator}</td>
        <td>{item.temperatureIndicator}</td>
        {/* SEGURIDAD PASIVA */}
        <td>{item.seatBelts}</td>
        <td>{item.airbags}</td>
        <td>{item.crystals}</td>
        <td>{item.headrest}</td>
        <td>{item.mirrorStatus}</td>
        <td>{item.rightSideMirror}</td>
        <td>{item.leftSideMirror}</td>
        <td>{item.rearViewMirror}</td>
        {/* SEGURIDAD ACTIVA */}
        <td>{item.addressStatus}</td>
        <td>{item.frontSuspensionCondition}</td>
        <td>{item.shockAbsorbers}</td>
        <td>{item.rearSuspensionStatus}</td>
        <td>{item.windshieldCondition}</td>
        <td>{item.frontGlass}</td>
        {/* ESTADO LUCES */}
        <td>{item.mediumLights}</td>
        <td>{item.highBeams}</td>
        <td>{item.lowLights}</td>
        <td>{item.leftDirectionalFront}</td>
        <td>{item.directionalRightFront}</td>
        <td>{item.leftDirectionalRear}</td>
        <td>{item.directionalRightRear}</td>
        <td>{item.parkingLights}</td>
        <td>{item.brakeLight}</td>
        <td>{item.reverseLight}</td>
        <td>{item.explorerFogLights}</td>
        {/* ESTADO LLANTAS */}
        <td>{item.rightFront}</td>
        <td>{item.leftFront}</td>
        <td>{item.rightRear}</td>
        <td>{item.rearLeft}</td>
        <td>{item.replacement}</td>
        <td>{item.tireAirPressure}</td>
        {/* FRENOS */}
        <td>{item.brakeCondition}</td>
        <td>{item.handBrake}</td>
        <td>{item.tablets}</td>
        {/* EQUIPO DE CARRETERA */}
        <td>{item.oneJackWithTheCapacityToRaiseTheVehicle}</td>
        <td>{item.oneReflectiveVest}</td>
        <td>{item.twoBlocksToBlockTheVehicle}</td>
        <td>{item.twoRoadSigns}</td>
        <td>{item.onePairOfIndustrialGloves}</td>
        <td>{item.oneCrosshead}</td>
        <td>{item.fireExtinguisher}</td>
        <td>{item.flashLight}</td>
        <td>{item.toolBox}</td>
        <td>{item.firstAidKit}</td>
        {/* DOCUMENTOS DEL VEHÍCULO */}
        <td>{item.soat}</td>
        <td>{item.technomechanicalReviewAndGasCertification}</td>
        <td>{item.contractualAndNonContractualInsurance}</td>
        <td>{item.preventive}</td>
        <td>{item.operationCard}</td>
        <td>{item.propertyCard}</td>
        <td>{item.drivingLicense}</td>
      </>
  } else if (nms === "role" || nms === "status" || nms === "brand" || nms === "model" || nms === "type" || nms === "arl" || nms === "afp" || nms === "eps" || nms === "compensationBox") {
      td = <>
        <td>{item.name}</td>
      </>
    }
    return td ;
  }
  
  return (
    <>
      <div className='DefaultTable-main'>
        <div>
          <input className='component-table-input form-control' type="text" placeholder="Filtrar" value={filtro} onChange={e => setFiltro(e.target.value)} />
        </div>
        <div className='table-responsive'>
          <table className="table table-striped mt-3">
            <thead className='thead-dark'>
              <tr>
                {responseTh()}
                <th scope="col">Actualizar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {datosPaginaActual.map((item, index) => (
                <tr key={index}>
                  {responseTd(item)}
                  <td>
                    <button onClick={() => updateId(item._id,item)} type="button" className="btn btn-primary Default-table-edit mr-4">Editar</button>
                  </td>
                  <td>
                    <button onClick={() => deleteId(item._id)} type="button" className="btn btn-danger Default-table-delete">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='mt-2'>
          <ul className="pagination DefaultTable-pagination-main">
            {Array.from({ length: numeroTotalPaginas }, (_, index) => (
              <li
                key={index}
                className={`page-item ${paginaActual === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => cambiarPagina(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DefaultTable;
