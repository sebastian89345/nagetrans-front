import axios from 'axios';
import config from "../constant/services.json";
import { GET_STATUS_ID,GET_STATUS_ALL } from '../constant/constant';

export const getStatusAIdService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.status.urlStatus);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_STATUS_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getStatusAllService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.status.urlStatus);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_STATUS_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createStatusService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.status.urlStatus,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateStatusService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.put(config.urlProd+config.status.urlStatus + body.id,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteStatusService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.status.urlStatus + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};