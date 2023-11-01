import axios from 'axios';
import config from "../constant/services.json";
import { GET_ROLE_ALL,CREATE_ROLE } from '../constant/constant';

export const getRoleAllService = (token) => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlDev+config.role.urlRole);
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
        const res = await axios.post(config.urlDev+config.role.urlRole,body);
        console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: CREATE_ROLE,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const updateRoleService = (body,token) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlDev+config.role.urlRole,body);
        console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: CREATE_ROLE,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const deleteRoleService = (id,token) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlDev+config.role.urlRole + id);
        console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: CREATE_ROLE,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};