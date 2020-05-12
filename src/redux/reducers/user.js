import { SET_USERNAME, SET_EMAIL, SET_PASSWORD } from "../actions/user";

const initialState = {
  user: null,
  email: null,
  password: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, user: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export default userReducer;
