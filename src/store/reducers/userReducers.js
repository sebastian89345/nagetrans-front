import { GET_USER_ID,GET_USER_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_ID:

            return {...state,data:action.payload.data};
        
        case GET_USER_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}