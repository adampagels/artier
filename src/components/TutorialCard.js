import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import VerticalTutorialCardLines from "./VerticalTutorialCardLines";
import HorizontalTutorialCardLines from "./HorizontalTutorialCardLines";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      <Text style={styles.dislikeTopText}>Don't like{"\n"}what you see?</Text>
      <MaterialCommunityIcons
        style={styles.swipeLeftIcon}
        name="gesture-swipe-left"
        size={70}
        color="white"
      />
      <Text style={styles.dislikeBottomText}>Swipe left!</Text>
      <Text style={styles.likeTopText}>Like what{"\n"}you see?</Text>
      <MaterialCommunityIcons
        style={styles.swipeRightIcon}
        name="gesture-swipe-right"
        size={70}
        color="white"
      />
      <Text style={styles.likeBottomText}>Swipe right!</Text>
      <Text style={styles.buttonsTopText}>Too lazy to swipe?</Text>
      <Text style={styles.buttonsBottomDislikeText}>
        Tap the{"\n"}thumbs down
      </Text>
      <Text style={styles.buttonsBottomLikeText}>Tap the{"\n"}thumbs up</Text>
      <MaterialCommunityIcons
        style={styles.dislikeArrow}
        name="arrow-down-bold"
        size={30}
        color="white"
      />
      <MaterialCommunityIcons
        style={styles.likeArrow}
        name="arrow-down-bold"
        size={30}
        color="white"
      />
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
    marginBottom: 140,
    marginRight: 15,
    color: "white",
  },
  dislikeTopText: {
    position: "absolute",
    color: "white",
    left: 20,
    top: 70,
    textAlign: "center",
    fontSize: 17,
  },
  dislikeBottomText: {
    position: "absolute",
    color: "white",
    left: 33,
    top: 240,
    fontSize: 17,
  },
  swipeLeftIcon: {
    position: "absolute",
    left: 60,
    top: 135,
  },
  likeTopText: {
    position: "absolute",
    color: "white",
    right: 43,
    top: 70,
    textAlign: "center",
    fontSize: 17,
  },
  likeBottomText: {
    position: "absolute",
    color: "white",
    right: 29,
    top: 240,
    fontSize: 17,
  },
  swipeRightIcon: {
    position: "absolute",
    right: 45,
    top: 135,
  },
  buttonsTopText: {
    position: "absolute",
    color: "white",
    right: 100,
    bottom: 120,
    fontSize: 17,
  },
  buttonsBottomDislikeText: {
    position: "absolute",
    color: "white",
    right: 195,
    bottom: 60,
    fontSize: 17,
    textAlign: "center",
  },
  buttonsBottomLikeText: {
    position: "absolute",
    color: "white",
    left: 215,
    bottom: 60,
    fontSize: 17,
    textAlign: "center",
  },
  dislikeArrow: {
    position: "absolute",
    color: "white",
    left: 250,
    bottom: 20,
    textAlign: "center",
  },
  likeArrow: {
    position: "absolute",
    color: "white",
    left: 50,
    bottom: 20,
    textAlign: "center",
  },
});
