import { GET_ROLE_ALL,CREATE_ROLE,UPDATE_ROLE,DELETE_ROLE } from "../constant/constant";

const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function roleReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROLE_ALL:
            
            return {...state,data:action.payload.data};

        case CREATE_ROLE:
            
            return {...state,data:action.payload.data};

        case UPDATE_ROLE:
            
            return {...state,data:action.payload.data};

        case DELETE_ROLE:
            
            return {...state,data:action.payload.data};
    
        default:
            return state;
    }
}