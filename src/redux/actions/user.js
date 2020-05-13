export const SET_USERNAME = "SET_USERNAME";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_LOCATION = "SET_LOCATION";

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
