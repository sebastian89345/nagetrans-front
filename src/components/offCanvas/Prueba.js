import React from 'react'
import './prueba.css'

function Prueba() {
  // const offcanvasModal = document.getElementById('offcanvasModal');
  
  const open = () => {
  const offcanvasModal = document.getElementById('offcanvasModal');
    offcanvasModal.style.left = '0';
  }

  const close = () => {
    const offcanvasModal = document.getElementById('offcanvasModal');
    offcanvasModal.style.left = '-300px';
  }

  return (
    <>
      <div>
        <button onClick={open} id="openModalButton">Abrir Offcanvas Modal</button>
      </div>

      <div id="offcanvasModal" className="offcanvas-modal">
        <div className="offcanvas-content">
          <button onClick={close} id="closeModalButton">Cerrar</button>
          <p>Contenido del modal aquí.</p>
        </div>
      </div>
    </>
  )
}

export default Prueba