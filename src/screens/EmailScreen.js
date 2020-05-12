import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function EmailScreen(props) {
  const navigateToPasswordScreen = () => {
    props.navigation.navigate("Password");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>EmailScreen</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToPasswordScreen}
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
