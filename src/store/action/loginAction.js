import axios from "axios";
import config from "../constant/services.json";
import { LOGIN } from "../constant/constant";

  export const loginApp = (user, password) => async (dispatch, getState) => {
    try {
      let body = { user, password }
      const res = await axios.post(config.urlProd+config.login.urlLogin,body);
      // console.log(res.data.response);
      if (res.status === 200) {
        dispatch({
          type: LOGIN,
          payload: {data:res.data.response},
        });
      }
      let result = res.data;
      return result;
    } catch (error) {
      console.log(error);
    }
  };