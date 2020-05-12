export const SET_USERNAME = "SET_USERNAME";
export const SET_EMAIL = "SET_EMAIL";

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
