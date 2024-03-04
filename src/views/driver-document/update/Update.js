import React,{ useState, useEffect } from 'react'

//Hoja de estilos
import './Update.css';

// Redux
import {  useSelector,useDispatch } from "react-redux";

//Reducers
//Reducers
import { updateDriverDocumentService } from "../../../store/action/driverDocumentAction";
import { getUserAllService } from "../../../store/action/userAction";
import { getArlAllService } from "../../../store/action/arlAction";
import { getAfpAllService } from "../../../store/action/afpAction";
import { getEpsAllService } from "../../../store/action/epsAction";
import { getCompensationBoxAllService } from "../../../store/action/compensationBoxAction";

//Alertas 
import Swal from 'sweetalert2';

//Imagenes
import arrow from '../../../assets/img/bx-chevron-left.svg'

//id de los roles
import roleService from '../../../libs/helpers/role.json';

function Update({ infoUpdate,setView,getAll }) {

  const { conductor } = roleService;
  const [inputnumberLicense, setInputnumberLicense] = useState("");
  const [inputstartLicense, setInputstartLicense] = useState("");
  const [inputExpirationLicense, setInputExpirationLicense] = useState("");
  const [opcionUser, setOpcionUser] = useState([]);
  const [opcionAfp, setOpcionAfp] = useState([]);
  const [opcionArl, setOpcionArl] = useState([]);
  const [opcionEps, setOpcionEps] = useState([]);
  const [opcionCompensationBox, setOpcionCompensationBox] = useState([]);
  const [opcionSelectUser, setOpcionSelectUser] = useState('');
  const [opcionSelectAfp, setOpcionSelectAfp] = useState('');
  const [opcionSelectArl, setOpcionSelectArl] = useState('');
  const [opcionSelectEps, setOpcionSelectEps] = useState('');
  const [opcionSelectCompensationBox, setOpcionSelectCompensationBox] = useState('');
  const [errorUser, setErrorUser] = useState('');
  const [errorNumberLicense, setErrorNumberLicense] = useState('');
  const [errorStartLicense, setErrorStartLicense] = useState('');
  const [errorExpirationLicense, setErrorExpirationLicense] = useState('');
  const [errorAfp, setErrorAfp] = useState('');
  const [errorArl, setErrorArl] = useState('');
  const [errorEps, setErrorEps] = useState('');
  const [errorCompensationBox, setErrorCompensationBox] = useState('');
  const dataListUser = useSelector((store) => store.userReducer);
  const dataListAfp = useSelector((store) => store.afpReducer);
  const dataListArl = useSelector((store) => store.arlReducer);
  const dataListEps = useSelector((store) => store.epsReducer);
  const dataListCompensationBox = useSelector((store) => store.compesationBoxReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getUserAllService())
      dispatch(getArlAllService())
      dispatch(getAfpAllService())
      dispatch(getEpsAllService())
      dispatch(getCompensationBoxAllService())
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])
  
  useEffect(() => {
    let resultadosFiltrados = dataListUser.data.filter(objeto => objeto.dni !== undefined && objeto.role[0]._id === conductor && objeto.show === "Si");
    setOpcionUser(resultadosFiltrados);
    setOpcionAfp(dataListAfp.data);
    setOpcionArl(dataListArl.data);
    setOpcionEps(dataListEps.data);
    setOpcionCompensationBox(dataListCompensationBox.data);
  }, [dataListUser,dataListAfp,dataListArl,dataListEps,dataListCompensationBox,conductor])
  
  useEffect(() => {
    setOpcionSelectUser(infoUpdate.item.users[0]._id);
    setInputnumberLicense(infoUpdate.item.numberLicense);
    setInputstartLicense(formatDate(infoUpdate.item.startLicense));
    setInputExpirationLicense(formatDate(infoUpdate.item.expirationLicense));
    setOpcionSelectArl(infoUpdate.item.arl[0]._id);
    setOpcionSelectAfp(infoUpdate.item.afp[0]._id);
    setOpcionSelectEps(infoUpdate.item.eps[0]._id);
    setOpcionSelectCompensationBox(infoUpdate.item.compesationBox[0]._id);
    //eslint-disable-next-line
  }, [])
  
  // Función para formatear la fecha al formato yyyy-mm-dd
  const formatDate = (date) => {
    let result = date.split('-');
    let day = result[0];
    let month = result[1];
    let year = result[2];
    let dates = year+"-"+month+"-"+day
    // console.log(year+"-"+month+"-"+day);
    return dates
  };

  const returnWindow = () => {
    setView({list:true});
    getAll();
  }

  const handleChangeNumberLicense = (e) => {
    // valida que solo se escriban numeros
    const esValido = e.target.validity.valid;
    if (esValido) {
      setInputnumberLicense(e.target.value);
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

    const userError = validateField(opcionSelectUser, 'usuario', /\S/, 1);
    if (userError) {
      setErrorUser(userError);
      isValid = false;
    } else {
      setErrorUser("");
    }

    const numberLicenseError = validateField(inputnumberLicense, 'numero de licencia', /^[0-9]+$/, 4);
    if (numberLicenseError) {
      setErrorNumberLicense(numberLicenseError);
      isValid = false;
    } else {
      setErrorNumberLicense("");
    }

    const startLicenseError = validateField(inputstartLicense, 'comienzo de la licensia', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (startLicenseError) {
      setErrorStartLicense(startLicenseError);
      isValid = false;
    } else {
      setErrorStartLicense("");
    }

    const expirationtLicenseError = validateField(inputExpirationLicense, 'expiracion de la licensia', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (expirationtLicenseError) {
      setErrorExpirationLicense(expirationtLicenseError);
      isValid = false;
    } else {
      setErrorExpirationLicense("");
    }

    const arlError = validateField(opcionSelectArl, 'ARL', /\S/, 1);
    if (arlError) {
      setErrorArl(arlError);
      isValid = false;
    } else {
      setErrorArl("");
    }

    const afpError = validateField(opcionSelectAfp, 'AFP', /\S/, 1);
    if (afpError) {
      setErrorAfp(afpError);
      isValid = false;
    } else {
      setErrorAfp("");
    }

    const epsError = validateField(opcionSelectEps, 'EPS', /\S/, 1);
    if (epsError) {
      setErrorEps(epsError);
      isValid = false;
    } else {
      setErrorEps("");
    }

    const CompensationBoxError = validateField(opcionSelectUser, 'caja de compensacion', /\S/, 1);
    if (CompensationBoxError) {
      setErrorCompensationBox(CompensationBoxError);
      isValid = false;
    } else {
      setErrorCompensationBox("");
    }

    return isValid;
  };

  // Función para formatear la fecha al formato dd-mm-yyyy
  const formatDates = (date) => {
    const d = new Date(date);
    const day = d.getDate() + 1;
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    // console.log(`${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`);
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };

  const edit = async () => {
    let validates = validate();
    if(validates) { 
        let body = { 
          id:infoUpdate.item._id,
          users:opcionSelectUser,
          numberLicense:inputnumberLicense,
          startLicense:formatDates(inputstartLicense),
          expirationLicense:formatDates(inputExpirationLicense),
          arl:opcionSelectArl,afp:opcionSelectAfp,
          eps:opcionSelectEps,
          compesationBox:opcionSelectCompensationBox 
        }
        let response = await dispatch(updateDriverDocumentService(body));
        if(response.error === undefined){
          switch (response.response.status) {
            case 200:
                Swal.fire({
                  title: "Editado!",
                  text: "Fue editado con exito",
                  icon: "success"
                });
              break;
            default:
                console.log(response.response);
                Swal.fire({
                  title: "Error!",
                  text: "Ocurrio un error al crearlo",
                  icon: "error"
                });
              break;
          }
        } else {
          console.log(response.error);
          Swal.fire({
            title: "Error!",
            text: "Eror al editarlo",
            icon: "error"
          });
        }
    }
  }

  return (
    <div className='driverDocument-update-card-main'>
        <div className='driverDocument-update-card card'>
            <div className='card-body'>
              <div>
                <img onClick={returnWindow} src={arrow} className='driverDocument-update-img' alt='img' />
              </div>
              <div className=' text-center'>
                <p className='driverDocument-update-title'>Editar un Documento del Conductor</p>
              </div>
              <div className='driverDocument-create-position-content-form'>
                <div className='driverDocument-create-content-form'>

                    <div className='mt-4 driverDocument-create-main-input form-group'>
                      <label>Usuario:</label>
                      <select value={opcionSelectUser} onChange={(e) => setOpcionSelectUser(e.target.value)} className='user-create-input form-control'>
                        <option value="">Selecciona una Opción</option>
                        {opcionUser.map((opcion, index) => (
                          <option key={index} value={opcion._id}>
                            {opcion.dni + " " + opcion.names}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='mt-4'>
                        {errorUser && <p style={{ color: 'red' }}>{errorUser}</p>}
                    </div>

                    <div className='mt-4 user-create-main-input'>
                      <label>Número de la Licencia:</label>
                        <input value={inputnumberLicense} onChange={handleChangeNumberLicense} pattern="[0-9]{0,13}" type="text" className="user-create-input form-control" placeholder="Numero de licencia" />
                    </div>

                    <div className='mt-4'>
                        {errorNumberLicense && <p style={{ color: 'red' }}>{errorNumberLicense}</p>}
                      </div>

                    <div className='mt-4 user-create-main-input'>
                      <label>Inicio de la Licencia:</label>
                      <input value={inputstartLicense} onChange={(e) => setInputstartLicense(e.target.value)} type="date" className='user-create-input form-control' />
                    </div>

                    <div className='mt-4'>
                      {errorStartLicense && <p style={{ color: 'red' }}>{errorStartLicense}</p>}
                    </div>

                    <div className='mt-4 user-create-main-input'>
                      <label>Vencimiento de la Licencia:</label>
                      <input value={inputExpirationLicense} onChange={(e) => setInputExpirationLicense(e.target.value)} type="date" className='user-create-input form-control' />
                    </div>

                    <div className='mt-4'>
                      {errorExpirationLicense && <p style={{ color: 'red' }}>{errorExpirationLicense}</p>}
                    </div>

                    <div className='mt-4 user-create-main-input form-group'>
                      <label>ARL:</label>
                      <select value={opcionSelectArl} onChange={(e) => setOpcionSelectArl(e.target.value)} className='user-create-input form-control'>
                        <option value="">Selecciona una Opción</option>
                        {opcionArl.map((opcion, index) => (
                          <option key={index} value={opcion._id}>
                            {opcion.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='mt-4'>
                      {errorArl && <p style={{ color: 'red' }}>{errorArl}</p>}
                    </div>

                    <div className='mt-4 user-create-main-input form-group'>
                      <label>AFP:</label>
                      <select value={opcionSelectAfp} onChange={(e) => setOpcionSelectAfp(e.target.value)} className='user-create-input form-control'>
                        <option value="">Selecciona una Opción</option>
                        {opcionAfp.map((opcion, index) => (
                          <option key={index} value={opcion._id}>
                            {opcion.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='mt-4'>
                      {errorAfp && <p style={{ color: 'red' }}>{errorAfp}</p>}
                    </div>

                    <div className='mt-4 user-create-main-input form-group'>
                      <label>EPS:</label>
                      <select value={opcionSelectEps} onChange={(e) => setOpcionSelectEps(e.target.value)} className='user-create-input form-control'>
                        <option value="">Selecciona una Opción</option>
                        {opcionEps.map((opcion, index) => (
                          <option key={index} value={opcion._id}>
                            {opcion.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='mt-4'>
                      {errorEps && <p style={{ color: 'red' }}>{errorEps}</p>}
                    </div>

                    <div className='mt-4 user-create-main-input form-group'>
                      <label>Caja de Compensación:</label>
                      <select value={opcionSelectCompensationBox} onChange={(e) => setOpcionSelectCompensationBox(e.target.value)} className='user-create-input form-control'>
                        <option value="">Selecciona una Opción</option>
                        {opcionCompensationBox.map((opcion, index) => (
                          <option key={index} value={opcion._id}>
                            {opcion.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='mt-4'>
                      {errorCompensationBox && <p style={{ color: 'red' }}>{errorCompensationBox}</p>}
                    </div>

                  <div className='mt-4 text-center'>
                    <button onClick={edit} type="button" className="driverDocument-update-button btn btn-primary">Guardar</button>
                  </div>

                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Update