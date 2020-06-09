import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useFonts, FingerPaint_400Regular } from "@expo-google-fonts/dev";

export default function ProfileHeaderButtons(props) {
  const [isReady, setReady] = useState(false);
  const [fontsLoaded] = useFonts({
    FingerPaint_400Regular,
  });
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/emptyStateBG.jpg")}
        style={styles.background}
        onLoadEnd={() => setReady(true)}
      />
      {fontsLoaded && isReady && (
        <Text style={styles.text}>
          <Text style={{ color: "#133750" }}>
            {props.lineOne}
            {"\n"}{" "}
          </Text>
          <Text style={{ color: "#133750" }}>
            {" "}
            {props.lineTwo}
            {"\n"}{" "}
          </Text>
          <Text style={{ color: "#133750" }}>{props.lineThree}</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  background: {
    borderRadius: 300,
    height: 350,
    marginTop: 20,
    opacity: 0.9,
    width: 350,
  },
  text: {
    fontFamily: "FingerPaint_400Regular",
    fontSize: 20,
    opacity: 0.6,
    position: "absolute",
    right: 98,
    top: 150,
  },
});
