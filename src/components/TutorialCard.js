import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, FlatList } from "react-native";
import VerticalTutorialCardLines from "./VerticalTutorialCardLines";
import HorizontalTutorialCardLines from "./HorizontalTutorialCardLines";
import TutorialTextAndIcons from "./TutorialTextAndIcons";

export default function TutorialCard() {
  const isNewUserClosingModal = useSelector(
    (state) => state.userReducer.isNewUserClosingModal
  );
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
      {isNewUserClosingModal && (
        <>
          <TutorialTextAndIcons styles={styles} />
          <FlatList data={verticalLineData} renderItem={renderVerticalItem} />
          <FlatList
            horizontal={true}
            data={horizontalLineData}
            renderItem={renderHorizontalItem}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 5,
    height: 500,
    justifyContent: "center",
    opacity: 0.94,
    position: "absolute",
    shadowColor: "#333",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    top: 60,
    width: 335,
  },
  verticalRectangle: {
    backgroundColor: "white",
    color: "white",
    height: 20,
    marginTop: 15,
    width: 6,
  },
  horizontalRectangle: {
    color: "white",
    backgroundColor: "white",
    height: 6,
    marginBottom: 140,
    marginRight: 15,
    width: 20,
  },
  dislikeTopText: {
    color: "white",
    fontSize: 17,
    position: "absolute",
    right: 33,
    textAlign: "center",
    top: 70,
  },
  dislikeBottomText: {
    color: "white",
    fontSize: 17,
    position: "absolute",
    right: 45,
    top: 240,
  },
  swipeLeftIcon: {
    position: "absolute",
    right: 50,
    top: 135,
  },
  likeTopText: {
    color: "white",
    fontSize: 17,
    left: 47,
    position: "absolute",
    textAlign: "center",
    top: 70,
  },
  likeBottomText: {
    color: "white",
    fontSize: 17,
    left: 37,
    position: "absolute",
    top: 240,
  },
  swipeRightIcon: {
    left: 60,
    position: "absolute",
    top: 135,
  },
  buttonsTopText: {
    color: "white",
    fontSize: 17,
    position: "absolute",
    right: -70,
    top: 355,
  },
  buttonsBottomDislikeText: {
    color: "white",
    fontSize: 17,
    position: "absolute",
    right: 45,
    top: 400,
    textAlign: "center",
  },
  buttonsBottomLikeText: {
    color: "white",
    fontSize: 17,
    position: "absolute",
    right: -137,
    textAlign: "center",
    top: 400,
  },
  dislikeArrow: {
    bottom: 20,
    color: "white",
    left: 250,
    position: "absolute",
    textAlign: "center",
  },
  likeArrow: {
    bottom: 20,
    color: "white",
    left: 50,
    position: "absolute",
    textAlign: "center",
  },
});
