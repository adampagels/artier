import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllArt, likeArt, dislikeArt } from "./../redux/actions/art";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Swiper from "react-native-deck-swiper";
import Card from "../components/Card";
import TutorialCard from "../components/TutorialCard";
import IconButton from "../components/IconButton";
import EmptyState from "../components/EmptyState";

export default function HomeScreen(props) {
  const [isEndofCards, setEndOfCards] = useState(false);
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

  let count = 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {!isEndofCards ? (
        <>
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
              setEndOfCards(true);
            }}
            onTapCard={(card) => {
              console.log(card);
              console.log(count);
            }}
            cardIndex={0}
            backgroundColor={"#fefefe"}
            stackSize={3}
            verticalSwipe={false}
          ></Swiper>
          <View style={styles.buttonsContainer}>
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
        </>
      ) : (
        <View style={{ marginTop: 180 }}>
          <EmptyState
            lineOne={"You've Reached"}
            lineTwo={"The End"}
            lineThree={"For Now..."}
          />
        </View>
      )}
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
    marginTop: 480,
  },
});
