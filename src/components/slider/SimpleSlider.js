import React,{useEffect,useState} from 'react';

//hojas de estilo
import './SimpleSlider.css';

//Imagenes del react-slick
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Imagenes normales
import img1 from '../../assets/img/foto1.jpg'
import img2 from '../../assets/img/foto2.png'
import img3 from '../../assets/img/foto3.jpg'
import img4 from '../../assets/img/foto4.jpg'
import img5 from '../../assets/img/foto5.jpg'
import img6 from '../../assets/img/foto6.png'
import img7 from '../../assets/img/foto7.jpg'
import img8 from '../../assets/img/foto8.png'
import img9 from '../../assets/img/foto9.png'
import img10 from '../../assets/img/foto10.jpg'
import img11 from '../../assets/img/foto11.png'
import img12 from '../../assets/img/foto12.png'
import img13 from '../../assets/img/foto13.jpg'
import img14 from '../../assets/img/foto14.webp'
import img15 from '../../assets/img/foto15.jpg'

function SimpleSlider() {

  const [settings, setSettings] = useState({})
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
  }, [width,settings])

  useEffect(() => {
    if(window.innerWidth > 992) {
      setSettings({
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear"
      })
    } else if(window.innerWidth > 500 && window.innerWidth < 991) {
      setSettings({
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear"
      })
    } else {
      setSettings({
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear"
      })
    }
  }, [width])
  
  return (
    <div>
      <p style={{color:'white'}} >s</p>
      <Slider {...settings}>
        <div className='d-flex justify-content-center'>
          <img className="simpleSlider-img" src={img1} alt="Slide 1" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img-foto2" src={img2} alt="Slide 2" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img" src={img3} alt="Slide 3" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img" src={img4} alt="Slide 4" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img" src={img5} alt="Slide 5" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img" src={img6} alt="Slide 6" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img" src={img7} alt="Slide 7" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img" src={img8} alt="Slide 8" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img-foto9" src={img9} alt="Slide 9" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img" src={img10} alt="Slide 10" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img" src={img11} alt="Slide 11" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img" src={img12} alt="Slide 12" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img" src={img13} alt="Slide 13" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img" src={img14} alt="Slide 14" />
        </div>
        <div className="d-flex justify-content-center">
          <img className="simpleSlider-img" src={img15} alt="Slide 15" />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
