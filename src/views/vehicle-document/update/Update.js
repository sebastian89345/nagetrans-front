import React,{ useState, useEffect } from 'react'

//Hoja de estilos
import './Update.css';

// Redux
import {  useSelector,useDispatch } from "react-redux";

//Reducers
import { updateVehicleDocumentService } from "../../../store/action/vehicleDocumentAction";
import { getUserAllService } from "../../../store/action/userAction";

//Alertas 
import Swal from 'sweetalert2';

//Imagenes
import arrow from '../../../assets/img/bx-chevron-left.svg'

//id de los roles
import roleService from '../../../libs/helpers/role.json';

function Update({ infoUpdate,setView,getAll }) {

  const { vehiculo } = roleService;
  const [opcionUser, setOpcionUser] = useState([]);
  const [opcionSoat, setOpcionSoat] = useState([]);
  const [opcionMechanicalTechnician, setOpcionMechanicalTechnician] = useState([]);
  const [opcionOperationsCard, setOpcionOperationsCard] = useState([]);
  const [opcionPropertyCards, setOpcionPropertyCards] = useState([]);
  const [opcionSureRccece, setOpcionSureRccece] = useState([]);
  const [opcionExtract, setOpcionExtract] = useState([]);
  const [opcionPreventiveReview, setOpcionPreventiveReview] = useState([]);
  const [inputDateStartSoat, setInputDateStartSoat] = useState("");
  const [inputDateStartMechanicalTechnician, setInputDateStartMechanicalTechnician] = useState("");
  const [inputDateStartCardOperations, setInputDateStartCardOperations] = useState("");
  const [inputDateStartCardProperties, setInputDateStartCardProperties] = useState("");
  const [inputDateStartSureRccece, setInputDateStartSureRccece] = useState("");
  const [inputDateStartPreventiveReview, setInputDateStartPreventiveReview] = useState("");
  const [inputDateStartExtract, setInputDateStartExtract] = useState("");
  const [inputDateExpirationSoat, setInputDateExpirationSoat] = useState("");
  const [inputDateExpirationMechanicalTechnician, setInputDateExpirationMechanicalTechnician] = useState("");
  const [inputDateExpirationCardOperations, setInputDateExpirationCardOperations] = useState("");
  const [inputDateExpirationCardProperties, setInputDateExpirationCardProperties] = useState("");
  const [inputDateExpirationSureRccece, setInputDateExpirationSureRccece] = useState("");
  const [inputDateExpirationExtract, setInputDateExpirationExtract] = useState("");
  const [inputDateExpirationPreventiveReview, setInputDateExpirationPreventiveReview] = useState("");
  const [opcionSelectUser, setOpcionSelectUser] = useState('');
  const [opcionSelectSoat, setOpcionSelectSoat] = useState('');
  const [opcionSelectMechanicalTechnician, setOpcionSelectMechanicalTechnician] = useState('');
  const [opcionSelectOperationsCard, setOpcionSelectOperationsCard] = useState('');
  const [opcionSelectPropertyCards, setOpcionSelectPropertyCards] = useState('');
  const [opcionSelectSureRccece, setOpcionSelectSureRccece] = useState('');
  const [opcionSelectExtract, setOpcionSelectExtract] = useState('');
  const [opcionSelectPreventiveReview, setOpcionSelectPreventiveReview] = useState('');
  const [errorUser, setErrorUser] = useState('');
  const [errorSoat, setErrorSoat] = useState('');
  const [errorMechanicalTechnician, setErrorMechanicalTechnician] = useState('');
  const [errorOperationsCard, setErrorOperationsCard] = useState('');
  const [errorPropertyCards, setErrorPropertyCards] = useState('');
  const [errorSureRccece, setErrorSureRccece] = useState('');
  const [errorExtract, setErrorExtract] = useState('');
  const [errorPreventiveReview, setErrorPreventiveReview] = useState('');
  const [errorDateStartSoat, setErrorDateStartSoat] = useState('');
  const [errorDateStartMechanicalTechnician, setErrorDateStartMechanicalTechnician] = useState('');
  const [errorDateStartCardOperations, setErrorDateStartCardOperations] = useState('');
  const [errorDateStartCardProperties, setErrorDateStartCardProperties] = useState('');
  const [errorDateStartSureRccece, setErrorDateStartSureRccece] = useState('');
  const [errorDateExpirationSoat, setErrorDateExpirationSoat] = useState('');
  const [errorDateExpirationMechanicalTechnician, setErrorDateExpirationMechanicalTechnician] = useState('');
  const [errorDateExpirationCardOperations, setErrorDateExpirationCardOperations] = useState('');
  const [errorDateExpirationCardProperties, setErrorDateExpirationCardProperties] = useState('');
  const [errorDateExpirationSureRccece, setErrorDateExpirationSureRccece] = useState('');
  const [errorDateStartExtract, setErrorDateStartExtract] = useState('');
  const [errorDateExpirationExtract, setErrorDateExpirationExtract] = useState('');
  const [errorDateStartPreventiveReview, setErrorDateStartPreventiveReview] = useState('');
  const [errorDateExpirationPreventiveReview, setErrorDateExpirationPreventiveReview] = useState('');
  const dataListUser = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getUserAllService())
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])
  
  useEffect(() => {
    let resultadosFiltrados = dataListUser.data.filter(objeto => objeto.role[0]._id === vehiculo && objeto.show === "Si");
    setOpcionUser(resultadosFiltrados);
    setOpcionSoat([{value:"Si"},{value:"No"}]);
    setOpcionMechanicalTechnician([{value:"Si"},{value:"No"}]);
    setOpcionOperationsCard([{value:"Si"},{value:"No"}]);
    setOpcionPropertyCards([{value:"Si"},{value:"No"}]);
    setOpcionSureRccece([{value:"Si"},{value:"No"}]);
    setOpcionExtract([{value:"Si"},{value:"No"}]);
    setOpcionPreventiveReview([{value:"Si"},{value:"No"}]);
  }, [dataListUser,vehiculo])
  
  useEffect(() => {
    setOpcionSelectUser(infoUpdate.item.users[0]._id);
    setOpcionSelectSoat(infoUpdate.item.soat);
    setOpcionSelectMechanicalTechnician(infoUpdate.item.mechanicalTechnician);
    setOpcionSelectOperationsCard(infoUpdate.item.operationsCard);
    setOpcionSelectPropertyCards(infoUpdate.item.propertyCards);
    setOpcionSelectSureRccece(infoUpdate.item.sureRccece);
    setOpcionSelectExtract(infoUpdate.item.extract);
    setOpcionSelectPreventiveReview(infoUpdate.item.preventiveReview);
    setInputDateStartSoat(infoUpdate.item.dateStartSoat);
    setInputDateStartMechanicalTechnician(infoUpdate.item.dateStartMechanicalTechnician);
    setInputDateStartCardOperations(infoUpdate.item.dateStartCardOperations);
    setInputDateStartCardProperties(infoUpdate.item.dateStartCardProperties);
    setInputDateStartSureRccece(infoUpdate.item.dateStartSureRccece);
    setInputDateStartExtract(infoUpdate.item.dateStartExtract);
    setInputDateStartPreventiveReview(infoUpdate.item.dateStartPreventiveReview);
    setInputDateExpirationSoat(infoUpdate.item.dateExpirationSoat);
    setInputDateExpirationMechanicalTechnician(infoUpdate.item.dateExpirationMechanicalTechnician);
    setInputDateExpirationCardOperations(infoUpdate.item.dateExpirationCardOperations);
    setInputDateExpirationCardProperties(infoUpdate.item.dateExpirationCardProperties);
    setInputDateExpirationSureRccece(infoUpdate.item.dateExpirationSureRccece);
    setInputDateExpirationExtract(infoUpdate.item.dateExpirationExtract);
    setInputDateExpirationPreventiveReview(infoUpdate.item.dateExpirationPreventiveReview);
    //eslint-disable-next-line
  }, [])
  
  const returnWindow = () => {
    setView({list:true});
    getAll();
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

    const soatError = validateField(opcionSelectSoat, 'soat', /\S/, 1);
    if (soatError) {
      setErrorSoat(soatError);
      isValid = false;
    } else {
      setErrorSoat("");
    }

    const mechanicalTechnicianError = validateField(opcionSelectMechanicalTechnician, 'tecnico mecanica', /\S/, 1);
    if (mechanicalTechnicianError) {
      setErrorMechanicalTechnician(mechanicalTechnicianError);
      isValid = false;
    } else {
      setErrorMechanicalTechnician("");
    }

    const operationsCardError = validateField(opcionSelectOperationsCard, 'tarjeta de operaciones', /\S/, 1);
    if (operationsCardError) {
      setErrorOperationsCard(operationsCardError);
      isValid = false;
    } else {
      setErrorOperationsCard("");
    }

    const propertyCardsError = validateField(opcionSelectPropertyCards, 'tarjeta de propiedades', /\S/, 1);
    if (propertyCardsError) {
      setErrorPropertyCards(propertyCardsError);
      isValid = false;
    } else {
      setErrorPropertyCards("");
    }
  
    const sureRcceceError = validateField(opcionSelectSureRccece, 'seguro rcc ece', /\S/, 1);
    if (sureRcceceError) {
      setErrorSureRccece(sureRcceceError);
      isValid = false;
    } else {
      setErrorSureRccece("");
    }
  
    const extractError = validateField(opcionSelectExtract, 'extracto', /\S/, 1);
    if (extractError) {
      setErrorExtract(extractError);
      isValid = false;
    } else {
      setErrorExtract("");
    }

    const preventiveReviewError = validateField(opcionSelectPreventiveReview, 'revision preventiva', /\S/, 1);
    if (preventiveReviewError) {
      setErrorPreventiveReview(preventiveReviewError);
      isValid = false;
    } else {
      setErrorPreventiveReview("");
    }

    const dateStartSoatError = validateField(inputDateStartSoat, 'inicio soat', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateStartSoatError) {
      setErrorDateStartSoat(dateStartSoatError);
      isValid = false;
    } else {
      setErrorDateStartSoat("");
    }

    const dateExpirationSoatError = validateField(inputDateExpirationSoat, 'vencimiento soat', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateExpirationSoatError) {
      setErrorDateExpirationSoat(dateExpirationSoatError);
      isValid = false;
    } else {
      setErrorDateExpirationSoat("");
    }

    const dateStartMechanicalTechnicianError = validateField(inputDateStartMechanicalTechnician, 'inicio tenicomecanica', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateStartMechanicalTechnicianError) {
      setErrorDateStartMechanicalTechnician(dateStartMechanicalTechnicianError);
      isValid = false;
    } else {
      setErrorDateStartMechanicalTechnician("");
    }

    const dateExpirationMechanicalTechnicianError = validateField(inputDateExpirationMechanicalTechnician, 'vencimiento tecnicomencanica', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateExpirationMechanicalTechnicianError) {
      setErrorDateExpirationMechanicalTechnician(dateExpirationMechanicalTechnicianError);
      isValid = false;
    } else {
      setErrorDateExpirationMechanicalTechnician("");
    }

    const dateStartCardOperationsError = validateField(inputDateStartCardOperations, 'inicio tarjeta de operaciones', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateStartCardOperationsError) {
      setErrorDateStartCardOperations(dateStartCardOperationsError);
      isValid = false;
    } else {
      setErrorDateStartCardOperations("");
    }

    const dateExpirationCardOperationsError = validateField(inputDateExpirationCardOperations, 'vencimiento tarjeta de operaciones', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateExpirationCardOperationsError) {
      setErrorDateExpirationCardOperations(dateExpirationCardOperationsError);
      isValid = false;
    } else {
      setErrorDateExpirationCardOperations("");
    }

    const dateStartCardPropertiesError = validateField(inputDateStartCardProperties, 'inicio tarjeta de propiedades', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateStartCardPropertiesError) {
      setErrorDateStartCardProperties(dateStartCardPropertiesError);
      isValid = false;
    } else {
      setErrorDateStartCardProperties("");
    }

    const dateExpirationCardPropertiesError = validateField(inputDateExpirationCardProperties, 'vencimiento tarjeta de propiedades', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateExpirationCardPropertiesError) {
      setErrorDateExpirationCardProperties(dateExpirationCardPropertiesError);
      isValid = false;
    } else {
      setErrorDateExpirationCardProperties("");
    }

    const dateStartSureRcceceError = validateField(inputDateStartSureRccece, 'inicio seguro rcc ece', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateStartSureRcceceError) {
      setErrorDateStartSureRccece(dateStartSureRcceceError);
      isValid = false;
    } else {
      setErrorDateStartSureRccece("");
    }

    const dateExpirationSureRcceceError = validateField(inputDateExpirationSureRccece, 'vencimiento seguro rcc ece', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateExpirationSureRcceceError) {
      setErrorDateExpirationSureRccece(dateExpirationSureRcceceError);
      isValid = false;
    } else {
      setErrorDateExpirationSureRccece("");
    }

    const DateStartExtractError = validateField(inputDateStartExtract, 'inicio extracto', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (DateStartExtractError) {
      setErrorDateStartExtract(DateStartExtractError);
      isValid = false;
    } else {
      setErrorDateStartExtract("");
    }

    const dateExpirationExtractError = validateField(inputDateExpirationExtract, 'vencimiento extracto', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateExpirationExtractError) {
      setErrorDateExpirationExtract(dateExpirationExtractError);
      isValid = false;
    } else {
      setErrorDateExpirationExtract("");
    }
 
    const dateStartPreventiveReviewError = validateField(inputDateStartPreventiveReview, 'inicio revision preventiva', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateStartPreventiveReviewError) {
      setErrorDateStartPreventiveReview(dateStartPreventiveReviewError);
      isValid = false;
    } else {
      setErrorDateStartPreventiveReview("");
    }

    const dateExpirationPreventiveReviewError = validateField(inputDateExpirationPreventiveReview, 'vencimiento revision preventiva', /^\d{4}-\d{2}-\d{2}$/, 4);
    if (dateExpirationPreventiveReviewError) {
      setErrorDateExpirationPreventiveReview(dateExpirationPreventiveReviewError);
      isValid = false;
    } else {
      setErrorDateExpirationPreventiveReview("");
    }


    return isValid;
  };

  const edit = async () => {
    let validates = validate();
    if(validates) { 
        let body = { 
          id:infoUpdate.item._id,
          users:opcionSelectUser,
          soat:opcionSelectSoat,
          mechanicalTechnician:opcionSelectMechanicalTechnician, 
          operationsCard:opcionSelectOperationsCard, 
          propertyCards:opcionSelectPropertyCards, 
          sureRccece:opcionSelectSureRccece, 
          extract:opcionSelectExtract, 
          preventiveReview:opcionSelectPreventiveReview, 
          dateStartSoat:inputDateStartSoat,
          dateStartMechanicalTechnician:inputDateStartMechanicalTechnician,
          dateStartCardOperations:inputDateStartCardOperations,
          dateStartCardProperties:inputDateStartCardProperties,
          dateStartSureRccece:inputDateStartSureRccece,
          dateStartExtract:inputDateStartExtract,
          dateStartPreventiveReview:inputDateStartPreventiveReview,
          dateExpirationSoat:inputDateExpirationSoat,
          dateExpirationMechanicalTechnician:inputDateExpirationMechanicalTechnician,
          dateExpirationCardOperations:inputDateExpirationCardOperations,
          dateExpirationCardProperties:inputDateExpirationCardProperties,
          dateExpirationSureRccece:inputDateExpirationSureRccece,
          dateExpirationExtract:inputDateExpirationExtract,
          dateExpirationPreventiveReview:inputDateExpirationPreventiveReview 
        }
        let response = await dispatch(updateVehicleDocumentService(body));
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
                <p className='driverDocument-update-title'>Editar un documento del conductor</p>
              </div>
              <div className='driverDocument-create-position-content-form'>
                <div className='driverDocument-create-content-form'>


                      <div className='mt-4 vehicleDocument-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Usuario:</label>
                        <select value={opcionSelectUser} onChange={(e) => setOpcionSelectUser(e.target.value)} className='user-create-input form-control'>
                          <option value="">Selecciona una opción</option>
                          {opcionUser.map((opcion, index) => (
                            <option key={index} value={opcion._id}>
                              {opcion.placa}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4'>
                        {errorUser && <p style={{ color: 'red' }}>{errorUser}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input form-group'>
                      <label htmlFor="exampleInputEmail1">Soat:</label>
                        <select value={opcionSelectSoat} onChange={(e) => setOpcionSelectSoat(e.target.value)} className='user-create-input form-control'>
                          <option value="">Selecciona una opción</option>
                          {opcionSoat.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4'>
                        {errorSoat && <p style={{ color: 'red' }}>{errorSoat}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input form-group'>
                      <label htmlFor="exampleInputEmail1">Tecnico mecanica:</label>
                        <select value={opcionSelectMechanicalTechnician} onChange={(e) => setOpcionSelectMechanicalTechnician(e.target.value)} className='user-create-input form-control'>
                          <option value="">Selecciona una opción</option>
                          {opcionMechanicalTechnician.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4'>
                        {errorMechanicalTechnician && <p style={{ color: 'red' }}>{errorMechanicalTechnician}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Tarjeta de operaciones:</label>
                        <select value={opcionSelectOperationsCard} onChange={(e) => setOpcionSelectOperationsCard(e.target.value)} className='user-create-input form-control'>
                          <option value="">Selecciona una opción</option>
                          {opcionOperationsCard.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4'>
                        {errorOperationsCard && <p style={{ color: 'red' }}>{errorOperationsCard}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Tarjeta de propiedades:</label>
                        <select value={opcionSelectPropertyCards} onChange={(e) => setOpcionSelectPropertyCards(e.target.value)} className='user-create-input form-control'>
                          <option value="">Selecciona una opción</option>
                          {opcionPropertyCards.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4'>
                        {errorPropertyCards && <p style={{ color: 'red' }}>{errorPropertyCards}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Seguro rcc ece:</label>
                        <select value={opcionSelectSureRccece} onChange={(e) => setOpcionSelectSureRccece(e.target.value)} className='user-create-input form-control'>
                          <option value="">Selecciona una opción</option>
                          {opcionSureRccece.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4'>
                        {errorSureRccece && <p style={{ color: 'red' }}>{errorSureRccece}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Extracto:</label>
                        <select value={opcionSelectExtract} onChange={(e) => setOpcionSelectExtract(e.target.value)} className='user-create-input form-control'>
                          <option value="">Selecciona una opción</option>
                          {opcionExtract.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4'>
                        {errorExtract && <p style={{ color: 'red' }}>{errorExtract}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input form-group'>
                        <label htmlFor="exampleInputEmail1">Revicion preventiva:</label>
                        <select value={opcionSelectPreventiveReview} onChange={(e) => setOpcionSelectPreventiveReview(e.target.value)} className='user-create-input form-control'>
                          <option value="">Selecciona una opción</option>
                          {opcionPreventiveReview.map((opcion, index) => (
                            <option key={index} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='mt-4'>
                        {errorPreventiveReview && <p style={{ color: 'red' }}>{errorPreventiveReview}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Inicio del soat:</label>
                        <input value={inputDateStartSoat} onChange={(e) => setInputDateStartSoat(e.target.value)} type="date" className='vehicleDocument-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateStartSoat && <p style={{ color: 'red' }}>{errorDateStartSoat}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                       <label htmlFor="exampleInputEmail1">Vencimiento del soat:</label>
                        <input value={inputDateExpirationSoat} onChange={(e) => setInputDateExpirationSoat(e.target.value)} type="date" className='vehicleDocument-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateExpirationSoat && <p style={{ color: 'red' }}>{errorDateExpirationSoat}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Inicio de la tecnicomecanico:</label>
                        <input value={inputDateStartMechanicalTechnician} onChange={(e) => setInputDateStartMechanicalTechnician(e.target.value)} type="date" className='vehicleDocument-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateStartMechanicalTechnician && <p style={{ color: 'red' }}>{errorDateStartMechanicalTechnician}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">vencimiento de la tecnicomecanico:</label>
                        <input value={inputDateExpirationMechanicalTechnician} onChange={(e) => setInputDateExpirationMechanicalTechnician(e.target.value)} type="date" className='user-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateExpirationMechanicalTechnician && <p style={{ color: 'red' }}>{errorDateExpirationMechanicalTechnician}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Inicio de la tarjeta operaciones:</label>
                        <input value={inputDateStartCardOperations} onChange={(e) => setInputDateStartCardOperations(e.target.value)} type="date" className='vehicleDocument-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateStartCardOperations && <p style={{ color: 'red' }}>{errorDateStartCardOperations}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Vencimiento de la tarjeta operaciones:</label>
                        <input value={inputDateExpirationCardOperations} onChange={(e) => setInputDateExpirationCardOperations(e.target.value)} type="date" className='user-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateExpirationCardOperations && <p style={{ color: 'red' }}>{errorDateExpirationCardOperations}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Inicio de la tarjeta propiedades:</label>
                        <input value={inputDateStartCardProperties} onChange={(e) => setInputDateStartCardProperties(e.target.value)} type="date" className='vehicleDocument-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateStartCardProperties && <p style={{ color: 'red' }}>{errorDateStartCardProperties}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Vencimiento de la tarjeta propiedades:</label>
                        <input value={inputDateExpirationCardProperties} onChange={(e) => setInputDateExpirationCardProperties(e.target.value)} type="date" className='user-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateExpirationCardProperties && <p style={{ color: 'red' }}>{errorDateExpirationCardProperties}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Inicio seguro rcc rce:</label>
                        <input value={inputDateStartSureRccece} onChange={(e) => setInputDateStartSureRccece(e.target.value)} type="date" className='vehicleDocument-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateStartSureRccece && <p style={{ color: 'red' }}>{errorDateStartSureRccece}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Vencimiento seguro rcc rce:</label>
                        <input value={inputDateExpirationSureRccece} onChange={(e) => setInputDateExpirationSureRccece(e.target.value)} type="date" className='user-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateExpirationSureRccece && <p style={{ color: 'red' }}>{errorDateExpirationSureRccece}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Inicio extracto:</label>
                        <input value={inputDateStartExtract} onChange={(e) => setInputDateStartExtract(e.target.value)} type="date" className='vehicleDocument-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateStartExtract && <p style={{ color: 'red' }}>{errorDateStartExtract}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Vencimiento extracto:</label>
                        <input value={inputDateExpirationExtract} onChange={(e) => setInputDateExpirationExtract(e.target.value)} type="date" className='user-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateExpirationExtract && <p style={{ color: 'red' }}>{errorDateExpirationExtract}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Inicio revision preventiva:</label>
                        <input value={inputDateStartPreventiveReview} onChange={(e) => setInputDateStartPreventiveReview(e.target.value)} type="date" className='vehicleDocument-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateStartPreventiveReview && <p style={{ color: 'red' }}>{errorDateStartPreventiveReview}</p>}
                      </div>

                      <div className='mt-4 vehicleDocument-create-main-input'>
                        <label htmlFor="exampleInputEmail1">Vencimiento revision preventiva:</label>
                        <input value={inputDateExpirationPreventiveReview} onChange={(e) => setInputDateExpirationPreventiveReview(e.target.value)} type="date" className='user-create-input form-control' />
                      </div>

                      <div className='mt-4'>
                        {errorDateExpirationPreventiveReview && <p style={{ color: 'red' }}>{errorDateExpirationPreventiveReview}</p>}
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