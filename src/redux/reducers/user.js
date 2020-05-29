import {
  SET_USERNAME,
  SET_EMAIL,
  SET_PASSWORD,
  REGISTER_USER,
  LOGIN_USER,
  SET_FIRST_TIME_USER,
} from "../actions/user";

const initialState = {
  user: null,
  email: null,
  password: null,
  isFirstTimeUser: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, user: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_FIRST_TIME_USER:
      return { ...state, isFirstTimeUser: action.payload };
    case REGISTER_USER:
      return state;
    case LOGIN_USER:
      return state;
    default:
      return state;
  }
};

export default userReducer;
