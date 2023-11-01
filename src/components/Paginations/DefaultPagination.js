import React, { useState } from 'react';

const DefaultPagination = () => {
  // Crear datos de ejemplo para simular una lista de elementos
  const generateRandomData = (length) => {
    const data = [];
    for (let i = 1; i <= length; i++) {
      data.push({
        id: i,
        name: `Person ${i}`,
        age: Math.floor(Math.random() * 40) + 18,
      });
    }
    return data;
  };

  const [data] = useState(generateRandomData(100)); // Generar una lista de 100 elementos de ejemplo
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Cantidad de elementos por página

  // Calcula el índice del primer y último elemento en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generar los elementos de la paginación
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1>Lista de personas</h1>
      <ul className="list-group">
        {/* Renderizar los elementos de la página actual */}
        {currentItems.map((item) => (
          <li key={item.id} className="list-group-item">
            <strong>{item.name}</strong> - {item.age} años
          </li>
        ))}
      </ul>

      {/* Renderizar la paginación */}
      <nav>
        <ul className="pagination">
          <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(1)}>First</button>
          </li>
          <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item${number === currentPage ? ' active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(number)}>{number}</button>
            </li>
          ))}
          <li className={`page-item${currentPage === pageNumbers.length ? ' disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
          <li className={`page-item${currentPage === pageNumbers.length ? ' disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(pageNumbers.length)}>Last</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DefaultPagination;
