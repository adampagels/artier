import React, { useEffect } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllArt, likeArt, dislikeArt } from "./../redux/actions/art";
import { setNewUserClosingModal } from "./../redux/actions/user";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Swiper from "react-native-deck-swiper";
import Card from "../components/Card";
import TutorialCard from "../components/TutorialCard";
import IconButton from "../components/IconButton";

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const art = useSelector((state) => state.artReducer.allArt);
  const isNewUserClosingModal = useSelector(
    (state) => state.userReducer.isNewUserClosingModal
  );
  const isFirstTimeUser = useSelector(
    (state) => state.userReducer.isFirstTimeUser
  );
  const { uid, displayName } = firebase.auth().currentUser;
  const displayNameAndUid = displayName + uid;

  const swiperRef = React.createRef();

  const otherUsersArt = art.filter(
    (art) =>
      art.data.likes[displayNameAndUid] !== displayName &&
      art.data.dislikes[displayNameAndUid] !== displayName &&
      art.data.uid !== uid
  );

  useEffect(() => {
    isFirstTimeUser && props.navigation.navigate("addArtModal");
    dispatch(fetchAllArt());
  }, []);

  const logOutUser = () => {
    firebase.auth().signOut();
  };

  let count = 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Swiper
        ref={swiperRef}
        cards={otherUsersArt}
        renderCard={(card) => <Card card={card} />}
        onSwipedRight={(card) => {
          dispatch(likeArt(otherUsersArt[card].id, displayName, uid));
          count == card && count++;
        }}
        onSwipedLeft={(card) => {
          dispatch(dislikeArt(otherUsersArt[card].id, displayName, uid));
          count == card && count++;
        }}
        onSwipedAll={() => {
          console.log("onSwipedAll");
        }}
        onTapCard={(card) => {
          console.log(card);
          console.log(count);
        }}
        cardIndex={0}
        backgroundColor={"transparent"}
        stackSize={3}
        verticalSwipe={false}
      ></Swiper>
      <View style={styles.buttonsContainer}>
        <Text onPress={() => logOutUser()}>Logout</Text>
        <IconButton
          name="ios-thumbs-down"
          onPress={() => {
            swiperRef.current.swipeLeft();
            dispatch(dislikeArt(otherUsersArt[count].id, displayName, uid));
            count++;
          }}
          color="white"
          backgroundColor="#FE0F00"
        />

        <IconButton
          name="ios-thumbs-up"
          onPress={() => {
            swiperRef.current.swipeRight();
            dispatch(likeArt(otherUsersArt[count].id, displayName, uid));
            count++;
          }}
          color="white"
          backgroundColor="#088001"
        />
      </View>
      {(isFirstTimeUser || isNewUserClosingModal) && <TutorialCard />}
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
