import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUsername } from "./../redux/actions/user";

export default function NameScreen(props) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const navigateToEmailScreen = () => {
    props.navigation.navigate("Email");
    dispatch(setUsername(name));
  };

  return (
    <View style={styles.container}>
      <Text>My first first name is</Text>
      <View style={styles.form}>
        <View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(name) => setName(name)}
            value={name}
            autoCorrect={false}
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
