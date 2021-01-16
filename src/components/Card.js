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
    borderRadius: 5,
    justifyContent: "center",
    height: 500,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  background: {
    borderRadius: 5,
    height: "100%",
    resizeMode: "stretch",
  },
});
