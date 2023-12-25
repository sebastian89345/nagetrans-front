import { GET_BRAND_ID,GET_BRAND_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function brandReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BRAND_ID:

            return {...state,data:action.payload.data};
        
        case GET_BRAND_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}