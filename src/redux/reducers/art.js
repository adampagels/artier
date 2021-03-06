import {
  FETCH_ALL_ART,
  LIKE_ART,
  DISLIKE_ART,
  DELETE_ART,
} from "../actions/art";

const initialState = {
  allArt: [],
};

const artReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ART:
      return { ...state, allArt: action.payload };
    case LIKE_ART:
      return state;
    case DISLIKE_ART:
      return state;
    case DELETE_ART:
      return state;
    default:
      return state;
  }
};

export default artReducer;
