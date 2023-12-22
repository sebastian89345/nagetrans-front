import { GET_ROLE_ID,GET_ROLE_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function roleReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROLE_ID:

            return {...state,data:action.payload.data};
        
        case GET_ROLE_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}