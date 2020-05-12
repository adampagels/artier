import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { setPassword } from "./../redux/actions/user";

export default function PasswordScreen(props) {
  const [userPassword, setUserPassword] = useState("");
  const dispatch = useDispatch();

  const navigateToLocationScreen = () => {
    props.navigation.navigate("Location");
    dispatch(setPassword(userPassword));
  };

  return (
    <View style={styles.container}>
      <Text>My password is</Text>
      <View style={styles.form}>
        <View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(userPassword) => setUserPassword(userPassword)}
            value={userPassword}
            autoCorrect={false}
          ></TextInput>
        </View>
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
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
    marginTop: 250,
  },
  input: {
    borderColor: "#8A8F9E",
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 15,
    height: 40,
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
