import React, { useEffect } from 'react'

//Estilos
import './index.css';

//Imagenes
import camioneta1 from "../../assets/img/865831723edcb9974ca2e1843ee622a0.jpg"
import camioneta2 from "../../assets/img/1230446564.jpg"

function Index() {

  useEffect(() => {
    // Sticky Header
    window.addEventListener("scroll", function() {
      var scroll = window.pageYOffset || document.documentElement.scrollTop;

      if (scroll >= 100) {
          document.querySelector(".top-nav").classList.add("light-header");
      } else {
          document.querySelector(".top-nav").classList.remove("light-header");
      }
    });

    document.addEventListener("DOMContentLoaded", function() {
      var theYear = new Date().getFullYear();
      document.getElementById('year').innerHTML = theYear;
    });
  }, [])
  
  return (
    <>
    {/* <!-- Top navigation --> */}
    <nav className="navbar navbar-expand-md fixed-top top-nav">
      <div className="container">
          <a className="navbar-brand"><strong>Nagetrans</strong></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><i className="fa fa-bars" aria-hidden="true"></i></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
            {/* active */}
              <li className="nav-item">
                <a className="nav-link" href="#">INICIO <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#aboutUs">QUIENES SOMOS</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">SERVICIOS</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">CLIENTES</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">CONTACTO</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">PQRS</a>
              </li>
            </ul>
          </div>	
      </div>
    </nav>

    {/* <!-- Intro Seven --> */}
    {/* h-auto */}
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
              <a href="#" className="btn btn-danger btn-capsul px-4 py-2">Ver servicios</a>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block img-fluid index-img-carousel" alt="First slide" src={camioneta2} />
          <div className="carousel-caption ">
              <h2 className="display-4 text-white mb-2 mt-4">EXPLORA LA EFICIENCIA EN CADA SERVICIO</h2>
        <p className="text-white mb-3 px-5 lead">Nagetrans zomac SAS, tu socio de transporte confiable</p>
        <a href="#" className="btn btn-danger btn-capsul px-4 py-2">Más información</a>
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

    {/* <!-- Info block 1 --> */}
    <section id='aboutUs' className="info-section">
      <div className="container">
        <div className="head-box text-center mb-5">
          <h2 className='index-font-title'>QUIENES SOMOS</h2>
          <h6 className="text-underline-primary">Operador logístico y de Transporte Nagetrans Zomac S.A.S. Es una Empresa de servicios especialesde Transporte Terrestre Automotor de pasajeros en la región de Urabá.</h6>
        </div>
        <div className="three-panel-block mt-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-block-overlay text-center mb-5 p-lg-3">
                <i className="fa fa-laptop box-circle-solid mt-3 mb-3" aria-hidden="true"></i>
                <h3>Responsive Design</h3>
                <p className="px-4">Never in all their history have men been able truly to conceive of the world as one a single sphere</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-block-overlay text-center mb-5 p-lg-3">
                <i className="fa fa-calendar box-circle-solid mt-3 mb-3" aria-hidden="true"></i>
                <h3>Integrated Calendar</h3>
                <p className="px-4">Never in all their history have men been able truly to conceive of the world as one a single sphere</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-block-overlay text-center mb-5 p-lg-3">
                <i className="fa fa-bug box-circle-solid mt-3 mb-3" aria-hidden="true"></i>
                <h3>Bug Free Solutions</h3>
                <p className="px-4">Never in all their history have men been able truly to conceive of the world as one a single sphere</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-block-overlay text-center p-lg-3">
                <i className="fa fa-cloud-upload box-circle-solid mt-3 mb-3" aria-hidden="true"></i>
                <h3>Cloud Storage</h3>
                <p className="px-4">Never in all their history have men been able truly to conceive of the world as one a single sphere</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-block-overlay text-center p-lg-3">
                <i className="fa fa-diamond box-circle-solid mt-3 mb-3" aria-hidden="true"></i>
                <h3>Premium Features</h3>
                <p className="px-4">Never in all their history have men been able truly to conceive of the world as one a single sphere</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-block-overlay text-center p-lg-3">
                <i className="fa fa-comments box-circle-solid mt-3 mb-3" aria-hidden="true"></i>
                <h3>24/7 Support</h3>
                <p className="px-4">Never in all their history have men been able truly to conceive of the world as one a single sphere</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

{/* <!-- Info block 1 --> */}
<section className="info-section bg-primary py-0">
	<div className="container-fluid">
		<div className="row">
            <div className="col-md-6 col-lg-6 content-half mt-md-0 pl-5 pt-4">
                <div className="head-box mb-5 pl-5 mt-2">
					<h2 className="text-white">Our Story</h2>
					<h6 className="text-white text-underline-rb-white">This is information panel</h6>
				</div>
                <ul className="pl-5">
                    <li>
                    	<i className="fa fa-laptop box-round-outline" aria-hidden="true"></i>
                    	<span className="list-content">
                    		<strong>Responsive Design</strong>
                    		<br/>Eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    	</span>
                	</li>
                    <li>
                    	<i className="fa fa-cloud-upload box-round-outline" aria-hidden="true"></i>
                    	<span className="list-content">
                    		<strong>Cloud Storage</strong>
                    		<br/>Eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    	</span>
                    </li>
                    <li>
                    	<i className="fa fa-diamond box-round-outline" aria-hidden="true"></i>
                    	<span className="list-content">
                    		<strong>Premium Features</strong>
                    		<br/>Eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    	</span>
                    </li>
                </ul>
            </div>
            <div className="col-md-6 p-0 m-0">
            	<img src="https://grafreez.com/wp-content/temp_demos/suffi/img/intro-bg.jpg" className="img-fluid" />
            </div>
        </div>
  </div>
</section>
{/* <!-- team style 1 --> */}
<section className="team-section py-5">
	<div className="container">
		<div className="row mb-5">
			<div className="head-box text-center mb-5 col-md-12">
				<h2>Meet Our Team</h2>
				<h6 className="text-underline-primary mb-5">This is information panel</h6>
			</div>
			<div className="col-md-4 mb-md-0 mb-sm-4">
				<div className="member-box anim-lf t-bottom">
			        <img className="img-fluid" src="https://grafreez.com/wp-content/temp_demos/suffi/img/t-member-01.jpg" alt="" />
			        <div className="overlay-content">
			          <h3 className="text-white ml-3 my-0">Jim Gorden</h3>
			          <p className="text-white ml-3 mb-3">Developer</p>
			          <span className="socail-l ml-3 mb-3">
			            <a href="#" className="mr-2"><i className="fa fa-facebook box-circle-solid"></i></a>
						<a href="#" className="mr-2"><i className="fa fa-twitter box-circle-solid"></i></a>
						<a href="#"><i className="fa fa-dribbble box-circle-solid"></i></a>
			          </span>
			        </div>
			    </div>
			</div>
			<div className="col-md-4 mb-md-0 mb-sm-4">
				<div className="member-box anim-lf t-bottom">
			        <img className="img-fluid" src="https://grafreez.com/wp-content/temp_demos/suffi/img/t-member-02.jpg" alt="" />
			        <div className="overlay-content">
			          <h3 className="text-white ml-3 my-0">Peyton Warren</h3>
			          <p className="text-white ml-3 mb-3">UI/UX</p>
			          <span className="socail-l ml-3 mb-3">
			            <a href="#" className="mr-2"><i className="fa fa-facebook box-circle-solid"></i></a>
						<a href="#" className="mr-2"><i className="fa fa-twitter box-circle-solid"></i></a>
						<a href="#"><i className="fa fa-dribbble box-circle-solid"></i></a>
			          </span>
			        </div>
			    </div>
			</div>
			<div className="col-md-4 mb-md-0 mb-sm-4">
				<div className="member-box anim-lf t-bottom">
			        <img className="img-fluid" src="https://grafreez.com/wp-content/temp_demos/suffi/img/t-member-03.jpg" alt="" />
			        <div className="overlay-content">
			          <h3 className="text-white ml-3 my-0">Craig Thompson</h3>
			          <p className="text-white ml-3 mb-3">Manager</p>
			          <span className="socail-l ml-3 mb-3">
			            <a href="#" className="mr-2"><i className="fa fa-facebook box-circle-solid"></i></a>
						<a href="#" className="mr-2"><i className="fa fa-twitter box-circle-solid"></i></a>
						<a href="#"><i className="fa fa-dribbble box-circle-solid"></i></a>
			          </span>
			        </div>
			    </div>
			</div>
		</div>
	</div>
</section>

    </>
  )
}

export default Index