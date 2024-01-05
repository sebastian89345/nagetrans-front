import axios from 'axios';
import config from "../constant/services.json";
import { GET_VEHICLEDOCUMENT_ID,GET_VEHICLEDOCUMENT_ALL } from '../constant/constant';

export const getVehicleDocumentAIdService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.vehicleDocument.urlVehicleDocument);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_VEHICLEDOCUMENT_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getVehicleDocumentAllService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.vehicleDocument.urlVehicleDocument);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_VEHICLEDOCUMENT_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createVehicleDocumentService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.vehicleDocument.urlVehicleDocument,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateVehicleDocumentService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.put(config.urlProd+config.vehicleDocument.urlVehicleDocument + body.id,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteVehicleDocumentService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.vehicleDocument.urlVehicleDocument + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};