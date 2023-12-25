import axios from 'axios';
import config from "../constant/services.json";
import { GET_BRAND_ID,GET_BRAND_ALL } from '../constant/constant';

export const getBrandAIdService = (token) => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.brand.urlBrand);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_BRAND_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getBrandAllService = (token) => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.brand.urlBrand);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_BRAND_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createBrandService = (body,token) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.brand.urlBrand,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateBrandService = (body,token) => async (dispatch, getState) => {
    try {
        const res = await axios.put(config.urlProd+config.brand.urlBrand + body.id,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteBrandService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.brand.urlBrand + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};