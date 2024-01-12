import { GET_LISTCHECK_ID,GET_LISTCHECK_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function listCheckReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LISTCHECK_ID:

            return {...state,data:action.payload.data};
        
        case GET_LISTCHECK_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}