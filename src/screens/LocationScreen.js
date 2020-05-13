import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default function LocationScreen() {
  const [location, setLocation] = useState("");

  const getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let result = await Location.getCurrentPositionAsync({});

      if (result) {
        setLocation(result);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Enable Location</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={!location ? styles.button : styles.locationNotAllowedButton}
          onPress={getLocation}
        >
          <Text style={styles.buttonText}>Allow Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={location ? styles.button : styles.locationNotAllowedButton}
        >
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
  locationNotAllowedButton: {
    alignItems: "center",
    backgroundColor: "#8A8F9E",
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
