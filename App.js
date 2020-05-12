import React from "react";
import { firebaseConfig } from "./config";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import Navigation from "./src/navigation/Navigation";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import userReducer from "./src/redux/reducers/user";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const store = createStore(userReducer, applyMiddleware(thunkMiddleware));
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
