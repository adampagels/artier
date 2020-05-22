import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllArt, likeArt, dislikeArt } from "./../redux/actions/art";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Swiper from "react-native-deck-swiper";
import Card from "../components/Card";

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const art = useSelector((state) => state.artReducer.allArt);
  const { uid, displayName } = firebase.auth().currentUser;
  const displayNameAndUid = displayName + uid;

  const logOutUser = () => {
    firebase.auth().signOut();
  };

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
      <Swiper
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
        backgroundColor={"red"}
        stackSize={3}
        verticalSwipe={false}
      ></Swiper>
      <Text onPress={() => logOutUser()}>Logout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
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
