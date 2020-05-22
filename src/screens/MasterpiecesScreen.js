import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MasterpiecesScreen() {
  return (
    <View style={styles.container}>
      <Text>Masterpieces Screen</Text>
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
