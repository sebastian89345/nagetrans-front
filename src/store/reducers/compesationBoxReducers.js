import { GET_COMPENSATIONBOX_ID,GET_COMPENSATIONBOX_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function compensationBoxReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMPENSATIONBOX_ID:

            return {...state,data:action.payload.data};
        
        case GET_COMPENSATIONBOX_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}