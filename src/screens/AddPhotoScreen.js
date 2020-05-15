import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AddPhotoScreen() {
  return (
    <View style={styles.container}>
      <Text>AddPhotoScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
