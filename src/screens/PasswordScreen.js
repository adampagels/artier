import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PasswordScreen(props) {
  const navigateToLocationScreen = () => {
    props.navigation.navigate("Location");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>PasswordScreen</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToLocationScreen}
      >
        <Text style={styles.buttonText}>Continue</Text>
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
