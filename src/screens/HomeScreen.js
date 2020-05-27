import React, { useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllArt, likeArt, dislikeArt } from "./../redux/actions/art";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Swiper from "react-native-deck-swiper";
import Card from "../components/Card";
import IconButton from "../components/IconButton";

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const art = useSelector((state) => state.artReducer.allArt);
  const { uid, displayName } = firebase.auth().currentUser;
  const displayNameAndUid = displayName + uid;

  const otherUsersArt = art.filter(
    (art) =>
      art.data.likes[displayNameAndUid] !== displayName &&
      art.data.dislikes[displayNameAndUid] !== displayName &&
      art.data.uid !== uid
  );

  useEffect(() => {
    props.navigation.navigate("addArtModal");
    dispatch(fetchAllArt());
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Swiper
        ref={(swiper) => {
          swiper = swiper;
        }}
        cards={otherUsersArt}
        renderCard={(card) => <Card card={card} />}
        onSwipedRight={(card) => {
          dispatch(likeArt(otherUsersArt[card].id, displayName, uid));
        }}
        onSwipedLeft={(card) => {
          dispatch(dislikeArt(otherUsersArt[card].id, displayName, uid));
        }}
        onSwipedAll={() => {
          console.log("onSwipedAll");
        }}
        cardIndex={0}
        backgroundColor={"#f6f6e9"}
        stackSize={3}
        verticalSwipe={false}
      ></Swiper>
      <View style={styles.buttonsContainer}>
        <IconButton
          name="ios-thumbs-down"
          onPress={() => console.log("left")}
          color="white"
          backgroundColor="#FE0F00"
        />
        <IconButton
          name="ios-thumbs-up"
          onPress={() => console.log("right")}
          color="white"
          backgroundColor="#088001"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  buttonsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 570,
  },
});
