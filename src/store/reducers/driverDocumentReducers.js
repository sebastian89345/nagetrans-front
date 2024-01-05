import { GET_DRIVERDOCUMENT_ID,GET_DRIVERDOCUMENT_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function driverDocumentReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DRIVERDOCUMENT_ID:

            return {...state,data:action.payload.data};
        
        case GET_DRIVERDOCUMENT_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}