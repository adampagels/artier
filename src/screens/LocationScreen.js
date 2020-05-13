import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function LocationScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Enable Location</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Allow Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 330,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#494E58",
    borderRadius: 50,
    justifyContent: "center",
    height: 50,
    marginBottom: 30,
    marginHorizontal: 80,
  },
  buttonText: {
    color: "#fefefe",
    fontWeight: "500",
  },
});
