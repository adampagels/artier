import React from "react";
import { firebaseConfig } from "./config";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import Navigation from "./src/navigation/Navigation";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./src/redux/reducers/index";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

//Fix "can't find variable: Crypto" error
import { decode, encode } from "base-64";
global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = (byteArray) => {
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = Math.floor(256 * Math.random());
  }
};
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <Navigation />
      </ActionSheetProvider>
    </Provider>
  );
}
