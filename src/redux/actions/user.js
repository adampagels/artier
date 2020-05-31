import "firebase/firestore";
import * as firebase from "firebase/app";

export const SET_USERNAME = "SET_USERNAME";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_LOCATION = "SET_LOCATION";
export const ADD_USER_LOCATION = "ADD_USER_LOCATION";
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const SET_FIRST_TIME_USER = "SET_FIRST_TIME_USER";
export const SET_NEW_USER_CLOSING_MODAL = "SET_NEW_USER_CLOSING_MODAL";

export const setUsername = (user) => {
  return {
    type: "SET_USERNAME",
    payload: user,
  };
};

export const setEmail = (email) => {
  return {
    type: "SET_EMAIL",
    payload: email,
  };
};

export const setPassword = (password) => {
  return {
    type: "SET_PASSWORD",
    payload: password,
  };
};

export const registerUser = () => {
  return (dispatch, getState) => {
    const state = getState();
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        state.userReducer.email,
        state.userReducer.password
      )
      .then((userCredentials) => {
        userCredentials.user.updateProfile({
          displayName: state.userReducer.user,
        });
        dispatch({ type: "REGISTER_USER" });
        dispatch(addUserLocation());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const loginUser = (email, password) => {
  return function (dispatch) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: "LOGIN_USER" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setFirstTimeUser = (isFirstTimeUser) => {
  return {
    type: "SET_FIRST_TIME_USER",
    payload: isFirstTimeUser,
  };
};

export const setNewUserClosingModal = (isModalClosed) => {
  return {
    type: "SET_NEW_USER_CLOSING_MODAL",
    payload: isModalClosed,
  };
};
