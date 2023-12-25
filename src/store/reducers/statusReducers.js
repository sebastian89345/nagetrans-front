import { GET_STATUS_ID,GET_STATUS_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function statusReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STATUS_ID:

            return {...state,data:action.payload.data};
        
        case GET_STATUS_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}