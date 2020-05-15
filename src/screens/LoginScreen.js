import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
      <View>
        <Text>LoginScreen</Text>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(loginUser(userEmail, userPassword))}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToNameScreen}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
    marginTop: 200,
  },
  input: {
    borderColor: "#8A8F9E",
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 15,
    height: 40,
    marginTop: 20,
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
