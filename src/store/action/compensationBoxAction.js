import axios from 'axios';
import config from "../constant/services.json";
import { GET_COMPENSATIONBOX_ID,GET_COMPENSATIONBOX_ALL } from '../constant/constant';

export const getCompensationBoxAIdService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.compensationbox.urlCompensationbox);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_COMPENSATIONBOX_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getCompensationBoxAllService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.compensationbox.urlCompensationbox);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_COMPENSATIONBOX_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createCompensationBoxService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.compensationbox.urlCompensationbox,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateCompensationBoxService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.put(config.urlProd+config.compensationbox.urlCompensationbox + body.id,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteCompensationBoxService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.compensationbox.urlCompensationbox + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};