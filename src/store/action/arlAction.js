import axios from 'axios';
import config from "../constant/services.json";
import { GET_ARL_ID,GET_ARL_ALL } from '../constant/constant';

export const getArlAIdService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.arl.urlArl);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_ARL_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getArlAllService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.arl.urlArl);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_ARL_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createArlService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.arl.urlArl,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateArlService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.put(config.urlProd+config.arl.urlArl + body.id,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteArlService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.arl.urlArl + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};