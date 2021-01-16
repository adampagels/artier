import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase/app";

export default function ProfileHeaderButtons(props) {
  const logOutUser = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={styles.icon}>
        <MaterialIcons name="add-a-photo" size={21} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity onPress={logOutUser} style={styles.icon}>
        <AntDesign name="logout" size={17} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    opacity: 0.5,
  },
  icon: {
    alignItems: "center",
    borderColor: "#333",
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: "center",
    height: 40,
    marginLeft: 120,
    marginRight: 120,
    width: 40,
  },
});
