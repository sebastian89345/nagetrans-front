import React, { useState, useEffect } from 'react'

//Hoja de estilos
import './Create.css';

// Redux
import { useSelector , useDispatch } from "react-redux";

//Reducers
import { createDriverDocumentService } from "../../../store/action/driverDocumentAction";
import { getUserAIdService } from "../../../store/action/userAction";
import { getArlAllService } from "../../../store/action/arlAction";
import { getAfpAllService } from "../../../store/action/afpAction";
import { getEpsAllService } from "../../../store/action/epsAction";
import { getCompensationBoxAllService } from "../../../store/action/compensationBoxAction";

//Alertas 
import Swal from 'sweetalert2';

//Imagenes
import arrow from '../../../assets/img/bx-chevron-left.svg';

//id de los roles
import roleService from '../../../libs/helpers/role.json';

function Create({ setView,getAll }) {

  const { conductor } = roleService;
  const [inputnumberLicense, setInputnumberLicense] = useState("");
  const [inputexpirationLicense, setInputexpirationLicense] = useState("");
  const [inputstartLicense, setInputstartLicense] = useState("");
  // const [inputexpirationTimeLicense, setInputexpirationTimeLicense] = useState("");
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
  const dataListUser = useSelector((store) => store.userReducer);
  const dataListAfp = useSelector((store) => store.afpReducer);
  const dataListArl = useSelector((store) => store.arlReducer);
  const dataListEps = useSelector((store) => store.epsReducer);
  const dataListCompensationBox = useSelector((store) => store.compesationBoxReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getUserAIdService())
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
  
  const returnWindow = () => {
    getAll();
    setView({list:true})
  }

  const create = async () => {
    //Aquí comienza las peticiones y demas
    let body = {  }
    let response = await dispatch(createDriverDocumentService(body));
    if(response.error === undefined){
      switch (response.response.status) {
        case 201:
            Swal.fire({
              title: "Creado!",
              text: "Fue creado con exito",
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
        text: "Eror al crear el usuario",
        icon: "error"
      });
    }
  }

  return (
    <div className='driverDocument-create-card-main'>
        <div className='driverDocument-create-card card'>
            <div className='card-body'>
              <div>
                <img onClick={returnWindow} src={arrow} className='driverDocument-create-img' alt='img' />
              </div>
              <div className=' text-center'>
                <p className='driverDocument-create-title'>Crear un documento del conductor</p>
              </div>
              
                <div className='mt-4 user-create-main-input'>
                    <input value={inputnumberLicense} onChange={(e) => setInputnumberLicense(e.target.value)} type="text" className="user-create-input form-control" placeholder="Usuario" />
                </div>

                <div className='mt-4 user-create-main-input'>
                    <input value={inputexpirationLicense} onChange={(e) => setInputexpirationLicense(e.target.value)} type="text" className="user-create-input form-control" placeholder="Usuario" />
                </div>

                <div className='mt-4 user-create-main-input'>
                    <input value={inputstartLicense} onChange={(e) => setInputstartLicense(e.target.value)} type="text" className="user-create-input form-control" placeholder="Usuario" />
                </div>

                <div className='mt-4 user-create-main-input form-group'>
                  <select value={opcionSelectUser} onChange={(e) => setOpcionSelectUser(e.target.value)} className='user-create-input form-control'>
                    <option value="">Selecciona una opción - conductor</option>
                    {opcionUser.map((opcion, index) => (
                      <option key={index} value={opcion._id}>
                        {opcion.dni}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='mt-4 user-create-main-input form-group'>
                  <select value={opcionSelectArl} onChange={(e) => setOpcionSelectArl(e.target.value)} className='user-create-input form-control'>
                    <option value="">Selecciona una opción - ARL</option>
                    {opcionArl.map((opcion, index) => (
                      <option key={index} value={opcion._id}>
                        {opcion.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='mt-4 user-create-main-input form-group'>
                  <select value={opcionSelectAfp} onChange={(e) => setOpcionSelectAfp(e.target.value)} className='user-create-input form-control'>
                    <option value="">Selecciona una opción - AFP</option>
                    {opcionAfp.map((opcion, index) => (
                      <option key={index} value={opcion._id}>
                        {opcion.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='mt-4 user-create-main-input form-group'>
                  <select value={opcionSelectEps} onChange={(e) => setOpcionSelectEps(e.target.value)} className='user-create-input form-control'>
                    <option value="">Selecciona una opción - EPS</option>
                    {opcionEps.map((opcion, index) => (
                      <option key={index} value={opcion._id}>
                        {opcion.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='mt-4 user-create-main-input form-group'>
                  <select value={opcionSelectCompensationBox} onChange={(e) => setOpcionSelectCompensationBox(e.target.value)} className='user-create-input form-control'>
                    <option value="">Selecciona una opción - caja de compensacion</option>
                    {opcionCompensationBox.map((opcion, index) => (
                      <option key={index} value={opcion._id}>
                        {opcion.name}
                      </option>
                    ))}
                  </select>
                </div>

              <div className='mt-4 text-center'>
                <button onClick={create} type="button" className="driverDocument-create-button btn btn-primary">Guardar</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Create