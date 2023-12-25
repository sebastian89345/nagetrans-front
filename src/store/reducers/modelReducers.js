import { GET_MODEL_ID,GET_MODEL_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function modelReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MODEL_ID:

            return {...state,data:action.payload.data};
        
        case GET_MODEL_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}