import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton(props) {
  return (
    <TouchableOpacity
      style={[styles.singleButton, { backgroundColor: props.backgroundColor }]}
      onPress={props.onPress}
      activeOpacity={0.85}
    >
      <Ionicons
        style={styles.icon}
        name={props.name}
        size={40}
        color={props.color}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  singleButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    padding: 40,
    margin: 50,
  },
  icon: {
    position: "absolute",
  },
});
