import { GET_ARL_ID,GET_ARL_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function arlReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ARL_ID:

            return {...state,data:action.payload.data};
        
        case GET_ARL_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}