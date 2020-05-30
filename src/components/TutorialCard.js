import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import VerticalTutorialCardLines from "./VerticalTutorialCardLines";
import HorizontalTutorialCardLines from "./HorizontalTutorialCardLines";

export default function TutorialCard() {
  const verticalLineData = [
    { key: "1" },
    { key: "2" },
    { key: "3" },
    { key: "4" },
    { key: "5" },
    { key: "6" },
    { key: "7" },
    { key: "8" },
    { key: "9" },
    { key: "10" },
  ];

  const horizontalLineData = [
    { key: "1" },
    { key: "2" },
    { key: "3" },
    { key: "4" },
    { key: "5" },
    { key: "6" },
    { key: "7" },
    { key: "8" },
    { key: "9" },
    { key: "10" },
  ];

  const renderVerticalItem = (item) => {
    return (
      <VerticalTutorialCardLines
        item={item}
        styles={styles.verticalRectangle}
      ></VerticalTutorialCardLines>
    );
  };

  const renderHorizontalItem = (item) => {
    return (
      <HorizontalTutorialCardLines
        item={item}
        styles={styles.horizontalRectangle}
      ></HorizontalTutorialCardLines>
    );
  };

  return (
    <View style={styles.card}>
      <FlatList data={verticalLineData} renderItem={renderVerticalItem} />
      <FlatList
        horizontal={true}
        data={horizontalLineData}
        renderItem={renderHorizontalItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    opacity: 0.94,
    borderRadius: 5,
    justifyContent: "center",
    height: 500,
    width: 335,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    position: "absolute",
    top: 60,
    alignItems: "center",
  },
  verticalRectangle: {
    height: 20,
    width: 6,
    backgroundColor: "white",
    marginTop: 15,
    color: "white",
  },
  horizontalRectangle: {
    height: 6,
    width: 20,
    backgroundColor: "white",
    marginBottom: 110,
    marginRight: 15,
    color: "white",
  },
});
