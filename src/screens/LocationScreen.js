import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, registerUser } from "./../redux/actions/user";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

export default function LocationScreen() {
  const [isReady, setReady] = useState(false);
  const dispatch = useDispatch();
  const location = useSelector((state) => state.userReducer.location);

  const getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let result = await Location.getCurrentPositionAsync({});

      if (result) {
        dispatch(setLocation(result));
      }
    }
  };

  const _cacheResourcesAsync = async () => {
    const images = [require("../assets/locationBG.jpg")];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  return (
    <View style={styles.container}>
      {isReady === false ? (
        <AppLoading
          startAsync={_cacheResourcesAsync}
          onFinish={() => setReady(true)}
          onError={console.warn}
        />
      ) : (
        <Image
          source={require("../assets/locationBG.jpg")}
          style={styles.background}
        />
      )}
      <View>
        <Text style={styles.loginTitle}>Enable Location</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={!location ? styles.button : styles.locationNotAllowedButton}
          onPress={getLocation}
        >
          <Text style={styles.buttonText}>Allow{"\n"}Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={location ? styles.button : styles.locationNotAllowedButton}
          onPress={() => dispatch(registerUser())}
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
  background: {
    height: "220%",
    position: "absolute",
    resizeMode: "contain",
    top: -430,
    left: -200,
    width: "380%",
  },
  loginTitle: {
    color: "#f6f6e9",
    fontSize: 60,
    marginTop: 60,
    alignSelf: "flex-start",
    borderTopWidth: 3,
    borderColor: "red",
    marginHorizontal: 30,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#f6f6e9",
    borderRadius: 1000,
    justifyContent: "center",
    height: 20,
    marginBottom: 30,
    marginTop: 100,
    width: 10,
    padding: 55,
    shadowColor: "#333",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  buttonText: {
    alignContent: "center",
    color: "#FE7500",
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
  },
});
