import axios from 'axios';
import config from "../constant/services.json";
import { GET_TYPE_ID,GET_TYPE_ALL } from '../constant/constant';

export const getTypeAIdService = (token) => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.type.urlType);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_TYPE_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getTypeAllService = (token) => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.type.urlType);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_TYPE_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createTypeService = (body,token) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.type.urlType,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateTypeService = (body,token) => async (dispatch, getState) => {
    try {
        const res = await axios.put(config.urlProd+config.type.urlType + body.id,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteTypeService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.type.urlType + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};