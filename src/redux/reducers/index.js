import { combineReducers } from "redux";
import artReducer from "./art";
import userReducer from "./user";

const rootReducer = combineReducers({
  artReducer,
  userReducer,
});

export default rootReducer;
