import axios from 'axios';
import config from "../constant/services.json";
import { GET_LISTCHECK_ID,GET_LISTCHECK_ALL } from '../constant/constant';

export const getListCheckAIdService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.listCheck.urlListCheck);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_LISTCHECK_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getListCheckAllService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.listCheck.urlListCheck);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_LISTCHECK_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createListCheckService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.listCheck.urlListCheck,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateListCheckService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.put(config.urlProd+config.listCheck.urlListCheck + body.id,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteListCheckService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.listCheck.urlListCheck + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};