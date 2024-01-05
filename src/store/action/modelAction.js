import axios from 'axios';
import config from "../constant/services.json";
import { GET_MODEL_ID,GET_MODEL_ALL } from '../constant/constant';

export const getModelAIdService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.model.urlModel);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_MODEL_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getModelAllService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.model.urlModel);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_MODEL_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createModelService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.model.urlModel,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateModelService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.put(config.urlProd+config.model.urlModel + body.id,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteModelService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.model.urlModel + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};