import {
  SET_USERNAME,
  SET_EMAIL,
  SET_PASSWORD,
  SET_LOCATION,
  ADD_USER_LOCATION,
  REGISTER_USER,
} from "../actions/user";

const initialState = {
  user: null,
  email: null,
  password: null,
  location: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, user: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_LOCATION:
      return { ...state, location: action.payload };
    case ADD_USER_LOCATION:
      return state;
    case REGISTER_USER:
      return state;
    default:
      return state;
  }
};

export default userReducer;
