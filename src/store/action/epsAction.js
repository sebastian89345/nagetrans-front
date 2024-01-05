import axios from 'axios';
import config from "../constant/services.json";
import { GET_EPS_ID,GET_EPS_ALL } from '../constant/constant';

export const getEpsAIdService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.eps.urlEps);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_EPS_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getEpsAllService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.eps.urlEps);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_EPS_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createEpsService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.eps.urlEps,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateEpsService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.put(config.urlProd+config.eps.urlEps + body.id,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteEpsService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.eps.urlEps + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};