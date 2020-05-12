export const SET_USERNAME = "SET_USERNAME";

export const setUsername = (user) => {
  return {
    type: "SET_USERNAME",
    payload: user,
  };
};
