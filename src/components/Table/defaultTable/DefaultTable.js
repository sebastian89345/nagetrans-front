import React, { useState } from 'react';

//Hoja de estilos
import './DefaultTable.css';

const DefaultTable = ({ data , nms , updateId , deleteId }) => {

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
        <th scope="col">usuario</th>
        <th scope="col">Correo</th>
        <th scope="col">Rol</th>
        <th scope="col">Mostrar</th>
      </>
    } else if (nms === "driverDocument") {
      th = <>
        <th scope="col">usuario</th>
        <th scope="col">numero de licencia</th>
        <th scope="col">ARL</th>
        <th scope="col">AFP</th>
        <th scope="col">EPS</th>
        <th scope="col">Caja de compensacion</th>
      </>
    } else if (nms === "vehicleDocument") {
      th = <>
        <th scope="col">usuario</th>
        <th scope="col">Soat</th>
        <th scope="col">Tecnicomecanica</th>
        <th scope="col">Tarjeta de operaciones</th>
        <th scope="col">Tarjeta de propiedades</th>
        <th scope="col">Segurorccece</th>
        <th scope="col">Extracto</th>
        <th scope="col">Revision preventiva</th>
      </>
    } else if (nms === "listCheck") {

      th = <>
        <th scope="col">Placa</th>
        <th scope="col">Dni</th>
        <th scope="col">Kilometraje actual</th>
        <th scope="col">Proximo cambio de aceite</th>
        <th scope="col">Fecha</th>
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
      </>
    } else if (nms === "listCheck") {

      td = <>
        <td>{item.userVehicle[0].placa}</td>
        <td>{item.userDriver[0].dni}</td>
        <td>{item.currentKm}</td>
        <td>{item.oilChange}</td>
        <td>{item.date}</td>
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
        <div>
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
