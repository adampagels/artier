import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { loginUser } from "./../redux/actions/user";
import { useDispatch } from "react-redux";

export default function LoginScreen(props) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const dispatch = useDispatch();

  const navigateToNameScreen = () => {
    props.navigation.navigate("Name");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/loginBG.jpg")}
        style={styles.background}
      />
      <View>
        <Text style={styles.loginTitle}>ARTiER</Text>
        <View style={styles.form}>
          <View>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(userEmail) => setUserEmail(userEmail)}
              value={userEmail}
              autoCorrect={false}
            ></TextInput>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(userPassword) => setUserPassword(userPassword)}
              value={userPassword}
              autoCorrect={false}
            ></TextInput>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(loginUser(userEmail, userPassword))}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={navigateToNameScreen}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
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
    top: -490,
    width: "340%",
  },
  loginTitle: {
    color: "#f6f6e9",
    fontSize: 60,
    marginTop: 60,
    alignSelf: "center",
    borderTopWidth: 3,
    borderColor: "red",
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
    marginTop: 80,
  },
  input: {
    backgroundColor: "#f6f6e9",
    borderRadius: 15,
    color: "#8D5685",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f6f6e9",
    borderRadius: 1000,
    justifyContent: "center",
    height: 20,
    marginBottom: 30,
    marginRight: 30,
    marginLeft: 30,
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
  signUpButton: {
    alignItems: "center",
    borderRadius: 1000,
    borderColor: "#f6f6e9",
    borderWidth: 2,
    justifyContent: "center",
    height: 20,
    marginBottom: 30,
    marginRight: 30,
    marginLeft: 30,
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
    color: "#8D5685",
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
  },
  signUpButtonText: {
    color: "#f6f6e9",
    fontWeight: "bold",
    fontSize: 16,
    borderColor: "white",
    position: "absolute",
  },
});
