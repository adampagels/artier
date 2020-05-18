import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function Card(props) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: props.card.data.image.uri }}
        style={styles.background}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
  },
  background: {
    height: "100%",
    resizeMode: "stretch",
  },
});
