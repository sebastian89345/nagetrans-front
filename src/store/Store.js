import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import roleReducer from './reducers/roleReducers';
import statusReducer from './reducers/statusReducers';
import brandReducer from './reducers/brandReducers';
import modelReducer from './reducers/modelReducers';
import typeReducer from './reducers/typeReducers';
import userReducer from './reducers/userReducers';
import loginReducer from './reducers/loginReducers';
import arlReducer from './reducers/arlReducers';
import afpReducer from './reducers/afpReducers';
import epsReducer from './reducers/epsReducers';
import compesationBoxReducer from './reducers/compesationBoxReducers';
import driverDocumentReducer from './reducers/driverDocumentReducers';
import vehicleDocumentReducer from './reducers/vehicleDocumentReducers';
import listCheckReducers from './reducers/listCheckReducers';

const rootReducer = combineReducers({
    roleReducer: roleReducer, 
    statusReducer: statusReducer, 
    brandReducer: brandReducer, 
    modelReducer: modelReducer, 
    typeReducer: typeReducer, 
    userReducer: userReducer, 
    loginReducer: loginReducer,
    arlReducer: arlReducer, 
    afpReducer: afpReducer, 
    epsReducer: epsReducer, 
    compesationBoxReducer: compesationBoxReducer, 
    driverDocumentReducer: driverDocumentReducer, 
    vehicleDocumentReducer: vehicleDocumentReducer, 
    listCheckReducer: listCheckReducers 
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}