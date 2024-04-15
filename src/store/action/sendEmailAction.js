import axios from 'axios';
import config from "../constant/services.json";

const postSendEmail = async (body) => {
    try {
        const res = await axios.post(config.urlProd+config.contact.urlContact,body)
        // console.log(res);
        if (res.data.status === 200) {
          return res.data
        } 
    } catch (error) {
      console.log(error);
    }
};

export { postSendEmail }
