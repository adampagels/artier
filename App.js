import React from "react";
import { firebaseConfig } from "./config";
import * as firebase from "firebase";
import Navigation from "./src/navigation/Navigation";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return <Navigation />;
}
