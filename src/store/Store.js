import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import roleReducer from './reducers/roleReducers';
import statusReducer from './reducers/statusReducers';
import brandReducer from './reducers/brandReducers';
import modelReducer from './reducers/modelReducers';
import typeReducer from './reducers/typeReducers';
import userReducer from './reducers/userReducers';
import loginReducer from './reducers/loginReducers';

const rootReducer = combineReducers({
    roleReducer: roleReducer, 
    statusReducer: statusReducer, 
    brandReducer: brandReducer, 
    modelReducer: modelReducer, 
    typeReducer: typeReducer, 
    userReducer: userReducer, 
    loginReducer: loginReducer 
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}