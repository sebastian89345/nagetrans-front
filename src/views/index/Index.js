import React, { useEffect,useState } from 'react'

//Estilos
import './index.css';

//Imagenes
import camioneta1 from "../../assets/img/backGroud1.jpeg"
import camioneta2 from "../../assets/img/backGroud2.jpeg"
import services1 from "../../assets/img/services1.png"
import services2 from "../../assets/img/services2.png"
import services3 from "../../assets/img/services3.png"
import mision from '../../assets/img/MISION.png'
import vision from '../../assets/img/vision.png'

//Libreria del slider
import SimpleSlider from "../../components/slider/SimpleSlider";

//react router dom
import { useNavigate } from "react-router-dom";

//Alertas 
import Swal from 'sweetalert2';

//Actions
import { postSendEmail } from "../../store/action/sendEmailAction";

function Index() {
  
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Sticky Header
  useEffect(() => {
    window.addEventListener("scroll", function() {
      let scroll = document.documentElement.scrollTop;

      if(window.location.pathname === "/"){
        if (scroll >= 100) {
          document.querySelector(".top-nav").classList.add("light-header");
        } else {
          document.querySelector(".top-nav").classList.remove("light-header");
        }
      }

    });

    // document.addEventListener("DOMContentLoaded", function() {
    //   var theYear = new Date().getFullYear();
    //   document.getElementById('year').innerHTML = theYear;
    // });
  }, [])

  const navigateLogin = () => {
    navigate("/login");
  }

  const handleNavigatePqrs = () => {
    navigate("/pqrs");
  }

  // valida que solo se escriban numeros
  const handleChangePhoneNumber = (e) => {
    const esValido = e.target.validity.valid;
    if (esValido) {
      setPhoneNumber(e.target.value);
    }
  } 

  const validateField = (value, fieldName, regex, minLength, customErrorMessage) => {
    if (value.trim() === '') {
      return `El campo ${fieldName} no puede estar en blanco.`;
    }

    if (regex && !regex.test(value)) {
      return customErrorMessage || `El campo ${fieldName} no cumple con el formato esperado.`;
    }

    if (value.length < minLength) {
      return `El campo ${fieldName} debe tener al menos ${minLength} caracteres.`;
    }

    return null; // Indica que la validación fue exitosa
  };

  const validate = () => {
    let isValid = true;

    const nameError = validateField(name, 'nombres', /^[a-zA-ZñÑ0-9\s]+$/, 4);
    if (nameError) {
      setErrorName(nameError);
      isValid = false;
    } else {
      setErrorName("");
    }

    const phoneNumberError = validateField(phoneNumber, 'celular', /^[a-zA-ZñÑ0-9\s]+$/, 4);
    if (phoneNumberError) {
      setErrorPhoneNumber(phoneNumberError);
      isValid = false;
    } else {
      setErrorPhoneNumber("");
    }

    const emailError = validateField(email, 'correo', /^.+$/, 4);
    if (emailError) {
      setErrorEmail(emailError);
      isValid = false;
    } else {
      setErrorEmail("");
    }

    const messageError = validateField(message, 'mensaje', /^.+$/, 4);
    if (messageError) {
      setErrorMessage(messageError);
      isValid = false;
    } else {
      setErrorMessage("");
    }

    // Puedes agregar más bloques de validaciones para otros campos si es necesario
    return isValid;
  }

  const resetInput = () => {
    setName("")
    setPhoneNumber("")
    setEmail("")
    setMessage("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validateContant = validate();
    if (validateContant) {
      let body = {
        interface:"contact",
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        message:message
      }
      let result = await postSendEmail(body);
      // console.log(result);
      switch (result.status) {
        case 200:
          resetInput();
          Swal.fire({
            title: "Mensaje enviado!",
            // text: "Nos contactaermos contigo",
            icon: "success"
          });
          break;
        default:
          Swal.fire({
            title: "No se pudo enviar el mensaje",
            // text: "El mensaje se envío con exito",
            icon: "error"
          });
          break;
      }
    }
  }

  return (
    <>
    
      <nav className="navbar navbar-expand-md fixed-top top-nav">
        <div className="container">
            <p className="navbar-brand"><strong>Nagetrans</strong></p>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"><i className="fa fa-bars" aria-hidden="true"></i></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
              {/* active */}
                <li className="nav-item">
                  <a className="nav-link" href="/#">INICIO <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#aboutUs">QUIENES SOMOS</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#services">SERVICIOS</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#client">CLIENTES</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#contact">CONTACTO</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#pqrs">PQRS</a>
                </li>
              </ul>
            </div>	
        </div>
      </nav>

      <section id="carouselExampleCaptions" className="intro carousel slide bg-overlay-light">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1" className=""></li>
        </ol>
        <div className="index-change-carousel carousel-inner" role="listbox">
          <div className="carousel-item active">
            <img className="d-block img-fluid index-img-carousel" alt="First slide" src={camioneta1} />
            <div className="carousel-caption ">
                <h2 className="display-4 text-white mb-2 mt-4">NAGETRANS ZOMAC SAS</h2>
                <p className="text-white mb-3 px-5 lead">Nuestro compromiso es llevar a tu equipo con seguridad y puntualidad</p>
                <a href="/#services" className="btn btn-danger btn-capsul px-4 py-2">Ver servicios</a>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block img-fluid index-img-carousel" alt="First slide" src={camioneta2} />
            <div className="carousel-caption ">
                <h2 className="display-4 text-white mb-2 mt-4">EXPLORA LA EFICIENCIA EN CADA SERVICIO</h2>
                <p className="text-white mb-3 px-5 lead">Nagetrans zomac SAS, tu socio de transporte confiable</p>
                <a href="/#contact" className="btn btn-danger btn-capsul px-4 py-2">Más información</a>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </section>

      <section id='aboutUs' className="info-section">
        <div className="container">
          <div className="head-box text-center mb-5">
            <h2 className='index-font-title'>SOBRE NOSOTROS</h2>
            <h6 className="text-underline-primary">Operador logístico y de Transporte Nagetrans Zomac S.A.S. Es una Empresa de servicios especialesde Transporte Terrestre Automotor de pasajeros en la región de Urabá</h6>
          </div>
          <div className="three-panel-block mt-5">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="service-block-overlay text-center mb-5 p-lg-3">
                  {/* <i className="fa fa-laptop box-circle-solid mt-3 mb-3" aria-hidden="true"></i> */}
                  <img className='index-abot-us-img' src={mision} alt='mision' />
                  <p className="px-4 text-justify">En Nagetrans Zomac SAS, no solo ofrecemos servicios de logística y coordinación de transporte;contribuimos en el desarrollo de la región de Urabá. Nos dedicamos al crecimiento constante para ser el motor que impulsa el progreso,respaldados por una flota de vehículos y camionetas doble cabina en condiciones óptimas de seguridad.</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="service-block-overlay text-center mb-5 p-lg-3">
                  {/* <i className="fa fa-calendar box-circle-solid mt-3 mb-3" aria-hidden="true"></i> */}
                  <img className='index-abot-us-img' src={vision} alt='vision' />
                  <p className="px-4 text-justify">Será una empresa reconocida en el sector servicios de logística y transporte de la región, preferida por su calidez humana y con alta recordación por su excelente orientación al cliente, basada en la cultura de calidad, compromiso integral de todo nuestro equipo de trabajo.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section id='services' className="info-section">
        <div className="container">
          <div className="head-box text-center mb-5">
            <h2 className='index-font-title'>NUESTROS SERVICIOS</h2>
            <h6 className="text-underline-primary">Operador logístico y de Transporte Nagetrans Zomac S.A.S. Es una Empresa de servicios especialesde Transporte Terrestre Automotor de pasajeros en la región de Urabá</h6>
          </div>
          <div className="three-panel-block mt-5">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="service-block-overlay text-center mb-5 p-lg-3">
                  <div className='mb-3'>
                    <img src={services1} alt='services 1' />
                  </div>
                  <h3>Transporte Terrestre Empresarial y Personal</h3>
                  <p className="px-4">Adaptamos nuestros servicios para satisfacer las necesidades tanto empresariales como personales de nuestros clientes.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="service-block-overlay text-center mb-5 p-lg-3">
                  <div className='mb-3'>
                    <img src={services2} alt='services 2' />
                  </div>
                  <h3>Flota Especializada</h3>
                  <p className="px-4">Contamos con una flota de camionetas doblecabina 4x4, equipadas con platón, garantizando versatilidad y capacidad para diversos tipos decarga.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="service-block-overlay text-center mb-5 p-lg-3">
                  <div className='mb-3'>
                    <img src={services3} alt='services 3' />
                  </div>
                  <h3>Rastreo Satelital</h3>
                  <p className="px-4">Utilizamos tecnología de rastreo satelital para proporcionar a nuestros clientes visibilidad en tiempo real de los vehiculos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='client' className="info-section">
        <div className="container">
          <div className="head-box text-center mb-5">
            <h2 className='index-font-title'>NUESTROS CLIENTES</h2>
            <h6 className="text-underline-primary">En Nagetrans Zomac S.A.S, nos enorgullece haber colaborado con diversas empresas y organizaciones en la región de Urabá, brindando soluciones logísticas y de transporte adaptadas a sus necesidades únicas. Algunos de nuestros clientes destacados incluyen</h6>
          </div>
          <div className="text-center">
            <SimpleSlider />
          </div>
        </div>
      </section>

      <section id='contact' className="info-section">
        <div className="container">
          <div className="head-box text-center mb-5">
            <h2 className='index-font-title'>CONTÁCTANOS</h2>
            <h6 className="text-underline-primary">Estamos aquí para responder tus preguntas, brindarte información adicional o colaborar contigo en soluciones logísticas personalizadas. No dudes en ponerte en contacto con Nagetrans Zomac S.A.Sa través de los siguientes medios</h6>
          </div>
          <div>
            
            <div className="login-card-container">
              <div className="index-container-flex">
                  <div className="index-container-form-two">
                    <div className="login-container-card-two">
                      <div className='mb-3'>
                        <p className='index-sub-title'>Déjanos tus datos y nos contactaremos contigo</p>
                      </div>

                      <form onSubmit={handleSubmit} component="form">

                        <div className="form-group">
                          <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control login-input" placeholder="Nombres y apellidos" />
                        </div>

                        <div className='mb-4'>
                          {errorName && <p style={{ color: 'red' }}>{errorName}</p>}
                        </div>

                        <div className="form-group">
                          <input value={phoneNumber} onChange={handleChangePhoneNumber} pattern="[0-9]{0,13}" type="text" className="form-control login-input" placeholder="Número de celular o whatsapp" />
                        </div>

                        <div className='mb-4'>
                          {errorPhoneNumber && <p style={{ color: 'red' }}>{errorPhoneNumber}</p>}
                        </div>

                        <div className="form-group">
                          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control login-input" placeholder="Correo electrónico" />
                        </div>

                        <div className='mb-4'>
                          {errorEmail && <p style={{ color: 'red' }}>{errorEmail}</p>}
                        </div>

                        <div className="form-group">
                          <textarea value={message} onChange={(e) => setMessage(e.target.value)} type="text" className="form-control login-input" placeholder="Mensaje" />
                        </div>

                        <div className='mb-4'>
                          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        </div>

                        <div className="form-group">
                          <button type="submit" className="login-btn-login btn btn-danger">Enviar</button>
                        </div>
                        
                      </form>

                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      <section id='pqrs' className="info-section">
        <div className="container">
          <div className="head-box text-center mb-5">
            <h2 className='index-font-title'>PQRS</h2>
            <h6 className="text-underline-primary">En Nagetrans Zomac S.A.S, valoramos la retroalimentación de nuestros clientes y nos esforzamos por mejorar continuamente nuestros servicios. Utiliza nuestro sistema de PQRS para hacernos llegar tus Peticiones, Quejas, Reclamos o Sugerencias. Tu opinión es fundamental para nosotros</h6>
          </div>
          <div className="three-panel-block mt-5">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="text-center mb-5 p-lg-3">
                  <h3>¿Cómo Funciona?</h3>
                  <p className="px-4 text-justify mb-2">1. Peticiones: Si necesitas información adicional, cambios en tus servicios o cualquier solicitud específica,estaremos encantados de atenderte.</p>
                  <p className="px-4 text-justify mb-2">2. Quejas: Si experimentas algún inconveniente odescontento con nuestros servicios, por favor, háznoslo saber para que podamos abordar el problema demanera eficaz.</p>
                  <p className="px-4 text-justify mb-2">3. Reclamos: Si sientes que no hemos cumplido con tus expectativas, queremos saberlo. Tu reclamo es una oportunidad para mejorar.</p>
                  <p className="px-4 text-justify mb-2">4. Sugerencias: Valoramos tus ideas y sugerencias para innovar y optimizar nuestros servicios. Cuéntanos cómo podemos mejorar.</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="text-center mb-5 p-lg-3">
                  <h3>Proceso de PQRS:</h3>
                  <p className="px-4 text-justify mb-1">1. Completa nuestro formulario de PQRS en línea.</p>
                  <p className="px-4 text-justify mb-1">2. Nos pondremos en contacto contigo para confirmar la recepción de tu solicitud.</p>
                  <p className="px-4 text-justify mb-1">3. Evaluaremos tu caso y tomaremos las medidas necesarias.</p>
                  <p className="px-4 text-justify mb-3">4. Te proporcionaremos una respuesta o solución en el menor tiempo posible.</p>
                  <h3>Formulario de PQRS:</h3>
                  <p onClick={handleNavigatePqrs} className="index-pqrs-text-link-form px-4 text-justify mb-3">Dar click, para llenar el formulario</p>
                  <h3>Atención Personalizada:</h3>
                  <p className="px-4 text-justify mb-1">Si prefieres una atención más directa, puedes comunicarte con nuestro equipo de atención al cliente a través de los siguientes medios:</p>
                  <p className="px-4 text-justify mb-1">1. Teléfono: 315 621 25 82 / 318 332 47 67</p>
                  <p className="px-4 text-justify mb-3">2. Correo Electrónico: nagetrans@gmail.com</p>
                  <p className="px-4 text-justify mb-1">En Nagetrans Zomac S.A.S, tu satisfacción es nuestra prioridad. Estamos aquí para escucharte y mejorar juntos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="footer" className="info-section">
        <div className="container">
          <div className="row text-center text-xs-center text-sm-left text-md-left justify-content-center">
            {/* <div className="col-xs-12 col-sm-4 col-md-4">
              <h5>Quick links</h5>
              <ul className="list-unstyled quick-links">
                <li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>Correo:</a></li>
                <li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>Celular:</a></li>
                <li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>Ubicación:</a></li>
                <li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>Get Started</a></li>
                <li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>Videos</a></li>
              </ul>
            </div> */}
            <div className="col-xs-12 col-sm-4 col-md-4">
              <h5>Información</h5>
              <ul className="list-unstyled quick-links">
                <li><p className='index-footer-p-text'><i className="fa fa-angle-double-right"></i>nagetrans@gmail.com</p></li>
                <li><p className='index-footer-p-text'><i className="fa fa-angle-double-right"></i>3156212582 / 3183324767</p></li>
                <li><p className='index-footer-p-text'><i className="fa fa-angle-double-right"></i>Apartado-Colombia</p></li>
                {/* <li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>Get Started</a></li>
                <li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>Videos</a></li> */}
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4">
              <h5>Acceso a afiliados</h5>
              <ul className="list-unstyled quick-links">
                <li><p className='index-footer-p-text' onClick={navigateLogin}><i className="fa fa-angle-double-right"></i>Acceso a empleados</p></li>
                <li><p className='index-footer-p-text'><i className="fa fa-angle-double-right"></i>Acceso a afiliados</p></li>
                {/* <li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>FAQ</a></li>
                <li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>Get Started</a></li>
                <li><a href="https://wwwe.sunlimetech.com" title="Design and developed by"><i className="fa fa-angle-double-right"></i>Imprint</a></li> */}
              </ul>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
              <ul className="list-unstyled list-inline social text-center">
                <li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-facebook"></i></a></li>
                <li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-twitter"></i></a></li>
                <li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-instagram"></i></a></li>
                <li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-google-plus"></i></a></li>
                <li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-envelope"></i></a></li>
              </ul>
            </div>
          </div>	 */}
            
          {/* <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
              <p><u><a href="https://www.nationaltransaction.com/">National Transaction Corporation</a></u> is a Registered MSP/ISO of Elavon, Inc. Georgia [a wholly owned subsidiary of U.S. Bancorp, Minneapolis, MN]</p>
              <p className="h6">© All right Reversed.<a className="text-green ml-2" href="https://www.sunlimetech.com">Sunlimetech</a></p>
            </div>
          </div>	 */}

        </div>
      </section>

    </>
  )
}

export default Index