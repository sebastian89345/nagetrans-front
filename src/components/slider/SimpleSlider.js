import React from 'react';

//Imagenes del react-slick
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Imagenes normales
import img1 from '../../assets/img/foto1.png'
import img2 from '../../assets/img/foto2.png'
import img3 from '../../assets/img/foto3.png'
import img4 from '../../assets/img/foto4.png'
import img5 from '../../assets/img/foto5.png'

function SimpleSlider() {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Habilitar autoplay
    autoplaySpeed: 2000, // Intervalo de tiempo entre cada cambio de diapositiva (en milisegundos)
    cssEase: "linear"
  };

  return (
    <div>
      <p style={{color:'white'}} >s</p>
      <Slider {...settings}>
        <div>
          <img src={img1} alt="Slide 1" />
        </div>
        <div>
          <img src={img2} alt="Slide 2" />
        </div>
        <div>
          <img src={img3} alt="Slide 3" />
        </div>
        <div>
          <img src={img4} alt="Slide 4" />
        </div>
        <div>
          <img src={img5} alt="Slide 5" />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
