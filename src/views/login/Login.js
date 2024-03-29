// componentes de react
import React, { useState, useEffect } from "react";

//react router dom
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";

//Actions
import { loginApp } from "../../store/action/loginAction";

//Estilos css
import './Login.css';

//Alertas 
import Swal from 'sweetalert2';

//Componentes reutilizables
import NavbarLogin from "../../components/Navbar/NavbarLogin/NavbarLogin";

// imagenes 
import line from '../../assets/img/line.png';
import van from '../../assets/img/camioneta.png';

function Login() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
  }, [width])

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

  const validateLogin = () => {
    let isValid = true;

    const userError = validateField(userName, 'usuario', /^[a-zA-Z0-9_!@#$%^&*()-]+$/, 4);
    if (userError) {
      setErrorUser(userError);
      isValid = false;
    } else {
      setErrorUser("");
    }

    const passwordError = validateField(password, 'contraseña', /^[a-zA-Z0-9_]+$/, 4);
    if (passwordError) {
      setErrorPassword(passwordError);
      isValid = false;
    } else {
      setErrorPassword("");
    }

    // Puedes agregar más bloques de validaciones para otros campos si es necesario
    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validate = validateLogin();
    if (validate) {
      let response = await dispatch(loginApp(userName, password));
      if(response.error === undefined){
        switch (response.response.status) {
          case 200:
              navigate("/home");
            break;
          default:
              console.log(response.response);
              setErrorPassword("Usuario o contraseña incorrectos");
            break;
        }
      } else {
        console.log(response.error);
        Swal.fire({
          title: "Error!",
          text: "A ocurrido un error",
          icon: "error"
        });
      }
    }
  };

  return (
    <>
      {width > 992  
      ? <>
          <NavbarLogin />
          <div className="login-card-container container">
              <div className="login-container-flex">
                <div className="container login-position-img-van">
                    <img className="login-img-van" src={van} alt="camioneta que va arriba" />
                  </div>
                  <div className="container login-position-img-line">
                    <img className="login-img-line" src={line} alt="linea que pasa por el fondo" />
                  </div>
                  <div className="login-container-form-one">
                    <p className="login-form-one-title">Nagetrans</p>
                  </div>
                  <div className="login-container-form-two">
                    <div className="login-container-card-two">
                      <div className="form-group">
                        <p className="login-form-two-title">Iniciar sesion</p>
                      </div>
                      <form onSubmit={handleSubmit} component="form">
                        <div className="form-group">
                          <input type="text" value={userName} onChange={e => setUserName(e.target.value)} className="form-control login-input" placeholder="Usuario" />
                        </div>

                        <div className='mb-4'>
                          {errorUser && <p style={{ color: 'red' }}>{errorUser}</p>}
                        </div>

                        <div className="form-group">
                          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control login-input" placeholder="Contraseña" />
                        </div>

                        <div className='mb-4'>
                          {errorPassword && <p style={{ color: 'red' }}>{errorPassword}</p>}
                        </div>

                        <div className="form-group">
                          <button type="submit" className="login-btn-login btn btn-danger">Ingresar</button>
                        </div>
                        <div className="form-group login-center-title">
                          <p className="login-title-login">¿ Has olvidado la contraseña ?</p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
            </div>  
        </>
      : <>
        <div className="login-mobile-container-card">
          <div className="login-mobile-card">
            <div className="form-group">
              <img src={van} alt="camioneta" />
            </div>
            <div className="form-group center-text">
              <p className="login-mobile-text">Iniciar session</p>
            </div>
            <form onSubmit={handleSubmit} component="form">

              <div className="form-group">
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} className="form-control login-mobile-input" placeholder="Usuario" />
              </div>

              <div className='mb-4'>
                {errorUser && <p style={{ color: 'red' }}>{errorUser}</p>}
              </div>

              <div className="form-group">
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control login-mobile-input" placeholder="Contraseña" />
              </div>

              <div className='mb-4'>
                {errorPassword && <p style={{ color: 'red' }}>{errorPassword}</p>}
              </div>

              <div className="form-group">
                <p className="center-text login-mobile-text">Cambiar contraseña</p>
              </div>
              <div className="form-group">
                <button type="submit" className="login-mobile-button btn btn-danger">Ingresar</button>
              </div>
            </form>
            <div className="form-group">
              <button type="button" className="login-mobile-button btn btn-danger">Inicio</button>
            </div>
          </div>
        </div>        
      </>  
    }
  </>
  )
}

export default Login