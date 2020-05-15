import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { setEmail, setPassword } from "./../redux/actions/user";
import { useSelector } from "react-redux";

export default function LoginScreen(props) {
  const { email, password } = useSelector((state) => state);

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
              onChangeText={(email) => setEmail(email)}
              value={email}
              autoCorrect={false}
            ></TextInput>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(password) => setPassword(password)}
              value={password}
              autoCorrect={false}
            ></TextInput>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToNameScreen}>
        <Text style={styles.buttonText}>Register</Text>
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
    height: 50,
    justifyContent: "center",
    marginHorizontal: 80,
  },
  buttonText: {
    color: "#fefefe",
    fontWeight: "500",
  },
});
