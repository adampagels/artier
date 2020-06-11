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
import { setUsername } from "./../redux/actions/user";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { useFonts, NotoSansJP_700Bold } from "@expo-google-fonts/dev";

export default function NameScreen(props) {
  const [name, setName] = useState("");
  const [isReady, setReady] = useState(false);
  const [fontsLoaded] = useFonts({
    NotoSansJP_700Bold,
  });
  const dispatch = useDispatch();

  const navigateToEmailScreen = () => {
    props.navigation.navigate("Email");
    dispatch(setUsername(name));
  };

  const _cacheResourcesAsync = async () => {
    const images = [require("../assets/nameBG.jpg")];

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
          source={require("../assets/nameBG.jpg")}
          style={styles.background}
        />
      )}
      {fontsLoaded && (
        <Text style={styles.loginTitle}>My first{"\n"}name is</Text>
      )}
      <View style={styles.form}>
        <View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(name) => setName(name)}
            value={name}
            autoCorrect={false}
            placeholder={"First Name"}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToEmailScreen}>
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
    top: -700,
    width: "350%",
  },
  loginTitle: {
    color: "#f6f6e9",
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 60,
    marginTop: 60,
    alignSelf: "flex-start",
    borderTopWidth: 3,
    borderColor: "red",
    marginHorizontal: 30,
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
    marginTop: 80,
  },
  input: {
    backgroundColor: "#f6f6e9",
    borderRadius: 15,
    color: "#F95175",
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
    color: "#F95175",
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
  },
});
