import React from 'react';

// Hoja de estilos
import './page-not-found.css';

// React-router-dom
import { useNavigate } from 'react-router-dom';

function PageNotFound() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  return (
    <>
      <section className="page_404">
        <div className="container">
          <div className="row">	
            <div className="pageNotFound-position col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>
                
                <div className="contant_box_404">
                  <h3 className="h2"> Parece que estás perdido </h3>
                  <p>¡La página que estás buscando no está disponible!</p>
                  <p className='pageNotFound-text' onClick={handleClick}>volver al inicio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PageNotFound