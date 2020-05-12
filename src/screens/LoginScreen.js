import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function LoginScreen(props) {
  const navigateToNameScreen = () => {
    props.navigation.navigate("Name");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>LoginScreen</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToNameScreen}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#494E58",
    borderRadius: 50,
    justifyContent: "center",
    height: 50,
    marginHorizontal: 80,
  },
  buttonText: {
    color: "#fefefe",
    fontWeight: "500",
  },
});
