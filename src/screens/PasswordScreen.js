import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  setPassword,
  registerUser,
  setFirstTimeUser,
} from "./../redux/actions/user";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { useFonts, NotoSansJP_700Bold } from "@expo-google-fonts/dev";

export default function PasswordScreen() {
  const [userPassword, setUserPassword] = useState("");
  const [isReady, setReady] = useState(false);
  const [fontsLoaded] = useFonts({
    NotoSansJP_700Bold,
  });
  const dispatch = useDispatch();

  const setPasswordAndRegister = () => {
    dispatch(setPassword(userPassword));
    dispatch(registerUser());
    dispatch(setFirstTimeUser(true));
  };

  const _cacheResourcesAsync = async () => {
    const images = [require("../assets/passwordBG.jpg")];

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
          source={require("../assets/passwordBG.jpg")}
          style={styles.background}
        />
      )}
      {fontsLoaded && (
        <Text style={styles.loginTitle}>My{"\n"}password is</Text>
      )}
      <View style={styles.form}>
        <View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(userPassword) => setUserPassword(userPassword)}
            value={userPassword}
            autoCorrect={false}
            placeholder={"Password"}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setPasswordAndRegister()}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
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
    top: -490,
    width: "340%",
  },
  loginTitle: {
    color: "#f6f6e9",
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 54,
    marginTop: 60,
    alignSelf: "flex-start",
    borderTopWidth: 3,
    borderColor: "red",
    marginHorizontal: 30,
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
    marginTop: 98,
  },
  input: {
    backgroundColor: "#f6f6e9",
    borderRadius: 15,
    color: "#49A244",
    fontSize: 15,
    height: 40,
    marginTop: 20,
    paddingLeft: 10,
    shadowColor: "#333",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#f6f6e9",
    borderRadius: 1000,
    justifyContent: "center",
    height: 20,
    marginBottom: 30,
    marginTop: 20,
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
    color: "#49A244",
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
  },
});
