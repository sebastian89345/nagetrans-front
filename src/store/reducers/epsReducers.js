import { GET_EPS_ID,GET_EPS_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function brandReducer(state = initialState, action) {
    switch (action.type) {
        case GET_EPS_ID:

            return {...state,data:action.payload.data};
        
        case GET_EPS_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}