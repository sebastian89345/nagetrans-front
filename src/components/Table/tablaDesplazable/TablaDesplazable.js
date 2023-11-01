import React from 'react';

const TablaDesplazable = () => {
  const datos = [
    { id: 1, nombre: 'Ejemplo 1', descripcion: 'Descripción 1' },
    { id: 2, nombre: 'Ejemplo 2', descripcion: 'Descripción 2' },
    // ... más datos ...
  ];

  return (
    <div style={{ maxHeight: '300px', overflowY: 'scroll' , overflowX: 'scroll' }}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.nombre}</td>
              <td>{dato.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaDesplazable;
