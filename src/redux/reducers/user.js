import { SET_USERNAME } from "../actions/user";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
