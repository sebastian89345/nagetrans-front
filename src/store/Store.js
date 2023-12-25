import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import roleReducers from './reducers/roleReducers';
import statusReducers from './reducers/statusReducers';
import brandReducers from './reducers/brandReducers';
import modelReducers from './reducers/modelReducers';
import typeReducers from './reducers/typeReducers';
import userReducers from './reducers/userReducers';

const rootReducer = combineReducers({
    roleService: roleReducers, 
    statusService: statusReducers, 
    brandService: brandReducers, 
    modelService: modelReducers, 
    typeService: typeReducers, 
    userService: userReducers 
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}