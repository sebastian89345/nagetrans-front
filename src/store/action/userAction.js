import axios from 'axios';
import config from "../constant/services.json";
import { GET_USER_ID,GET_USER_ALL } from '../constant/constant';

export const getUserAIdService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.user.urlUser);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_USER_ID,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const getUserAllService = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(config.urlProd+config.user.urlUser);
        // console.log(res);
        let result = res.data.response.response;
        if (res.data.response.status === 200) {
            dispatch({
                type: GET_USER_ALL,
                payload: { data: result }
            });
        } 
    } catch (error) {
        console.log(error);
    }
};

export const createUserService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.post(config.urlProd+config.user.urlUser,body);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateUserService = (body) => async (dispatch, getState) => {
    try {
        const res = await axios.put(config.urlProd+config.user.urlUser + body.id,body);
        // console.log(res);
        let result = res.data;
        return result; 
    } catch (error) {
        console.log(error);
    }
};

export const deleteUserService = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(config.urlProd+config.user.urlUser + id);
        // console.log(res);
        let result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};