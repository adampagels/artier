import "firebase/firestore";
import * as firebase from "firebase/app";

export const SET_USERNAME = "SET_USERNAME";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_LOCATION = "SET_LOCATION";
export const ADD_USER_LOCATION = "ADD_USER_LOCATION";
export const REGISTER_USER = "REGISTER_USER";

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

export const setLocation = (location) => {
  return {
    type: "SET_LOCATION",
    payload: location,
  };
};

export const registerUser = () => {
  return (dispatch, getState) => {
    const state = getState();
    firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((userCredentials) => {
        userCredentials.user.updateProfile({
          displayName: state.user,
        });
        dispatch({ type: "REGISTER_USER" });
        dispatch(addUserLocation());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addUserLocation = () => {
  return function (dispatch, getState) {
    const state = getState();
    firebase
      .firestore()
      .collection("users")
      .add({
        email: state.email,
        location: state.location,
      })
      .then(() => {
        dispatch({ type: "ADD_USER_LOCATION" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
