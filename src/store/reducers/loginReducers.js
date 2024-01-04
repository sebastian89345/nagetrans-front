import { LOGIN } from "../constant/constant";

const initialState = {
  data: [],
  loading: false,
  error: null
};

  export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
          return {...state,data:action.payload.data};
        default:
          return state;
    }
}