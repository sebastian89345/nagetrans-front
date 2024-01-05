import axios from 'axios';
import config from "../constant/services.json";
import { GET_DRIVERDOCUMENT_ID,GET_DRIVERDOCUMENT_ALL } from '../constant/constant';

export const getDriverDocumentAIdService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.driverDocument.urlDriverDocument);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_DRIVERDOCUMENT_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getDriverDocumentAllService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.driverDocument.urlDriverDocument);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_DRIVERDOCUMENT_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createDriverDocumentService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.driverDocument.urlDriverDocument,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateDriverDocumentService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.put(config.urlProd+config.driverDocument.urlDriverDocument + body.id,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteDriverDocumentService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.driverDocument.urlDriverDocument + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};