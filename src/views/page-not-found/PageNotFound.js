import React from 'react';

// Hoja de estilos
import './page-not-found.css';

// React-router-dom
import { useNavigate } from 'react-router-dom';

function PageNotFound() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  }

  return (
    <>
      <div className='heigth flex flex-col items-center justify-center'>
          <p>404</p>
          <p>Esta pagina no fue encontrada</p>
          <p onClick={handleClick} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor">Volver al iniciar sessión</p>
      </div>
    </>
  )
}

export default PageNotFound