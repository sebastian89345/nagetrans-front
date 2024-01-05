import { GET_AFP_ID,GET_AFP_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function afpReducer(state = initialState, action) {
    switch (action.type) {
        case GET_AFP_ID:

            return {...state,data:action.payload.data};
        
        case GET_AFP_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}