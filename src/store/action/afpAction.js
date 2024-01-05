import axios from 'axios';
import config from "../constant/services.json";
import { GET_AFP_ID,GET_AFP_ALL } from '../constant/constant';

export const getAfpAIdService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.afp.urlAfp);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_AFP_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getAfpAllService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.afp.urlAfp);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_AFP_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createAfpService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.afp.urlAfp,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateAfpService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.put(config.urlProd+config.afp.urlAfp + body.id,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteAfpService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.afp.urlAfp + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};