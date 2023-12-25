import { GET_TYPE_ID,GET_TYPE_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function typeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TYPE_ID:

            return {...state,data:action.payload.data};
        
        case GET_TYPE_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}