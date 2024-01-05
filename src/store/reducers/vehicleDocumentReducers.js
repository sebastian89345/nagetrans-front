import { GET_VEHICLEDOCUMENT_ID,GET_VEHICLEDOCUMENT_ALL } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function vehicleDocumentReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VEHICLEDOCUMENT_ID:

            return {...state,data:action.payload.data};
        
        case GET_VEHICLEDOCUMENT_ALL:
            
            return {...state,data:action.payload.data};

        default:
            return state;
    }
}