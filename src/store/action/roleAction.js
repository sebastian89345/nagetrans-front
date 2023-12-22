import axios from 'axios';
import config from "../constant/services.json";
import { GET_ROLE_ID,GET_ROLE_ALL } from '../constant/constant';

export const getRoleAIdService = (token) => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.role.urlRole);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_ROLE_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getRoleAllService = (token) => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.role.urlRole);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_ROLE_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createRoleService = (body,token) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.role.urlRole,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateRoleService = (body,token) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.role.urlRole,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteRoleService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.role.urlRole + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};