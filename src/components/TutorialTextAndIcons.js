import React, { useEffect } from "react";
import { Text, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TutorialTextAndIcons(props) {
  const dislikeTopTextFade = new Animated.Value(0);
  const dislikeBottomTextFade = new Animated.Value(0);
  const swipeLeftIconMove = new Animated.Value(0);
  const likeTopTextFade = new Animated.Value(0);
  const likeBottomTextFade = new Animated.Value(0);
  const swipeRightIconMove = new Animated.Value(0);
  const buttonsTopTextFade = new Animated.Value(0);
  const buttonsDislikeTextFade = new Animated.Value(0);
  const buttonsLikeTextFade = new Animated.Value(0);

  Animated.timing(dislikeTopTextFade, {
    toValue: 1,
    delay: 1600,
    duration: 800,
  }).start();

  Animated.timing(dislikeBottomTextFade, {
    toValue: 1,
    delay: 2400,
    duration: 800,
  }).start();

  Animated.timing(likeTopTextFade, {
    toValue: 1,
    delay: 5000,
    duration: 800,
  }).start();

  Animated.timing(likeBottomTextFade, {
    toValue: 1,
    delay: 5700,
    duration: 800,
  }).start();

  Animated.timing(buttonsTopTextFade, {
    toValue: 1,
    delay: 8500,
    duration: 800,
  }).start();

  Animated.timing(buttonsDislikeTextFade, {
    toValue: 1,
    delay: 9600,
    duration: 800,
  }).start();

  Animated.timing(buttonsLikeTextFade, {
    toValue: 1,
    delay: 10500,
    duration: 800,
  }).start();

  Animated.sequence([
    Animated.timing(swipeLeftIconMove, {
      toValue: -20,
      delay: 2800,
      duration: 500,
    }),
    Animated.timing(swipeLeftIconMove, {
      toValue: 0,
      duration: 500,
    }),
    Animated.timing(swipeLeftIconMove, {
      toValue: -20,
      duration: 500,
    }),
    Animated.timing(swipeLeftIconMove, {
      toValue: 0,
      duration: 500,
    }),
  ]).start();

  Animated.sequence([
    Animated.timing(swipeRightIconMove, {
      toValue: 20,
      delay: 6200,
      duration: 500,
    }),
    Animated.timing(swipeRightIconMove, {
      toValue: 0,
      duration: 500,
    }),
    Animated.timing(swipeRightIconMove, {
      toValue: 20,
      duration: 500,
    }),
    Animated.timing(swipeRightIconMove, {
      toValue: 0,
      duration: 500,
    }),
  ]).start();

  return (
    <>
      <Animated.View
        style={[
          {
            opacity: dislikeTopTextFade,
          },
        ]}
      >
        <Text style={props.styles.dislikeTopText}>
          Don't like{"\n"}what you see?
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          {
            transform: [{ translateX: swipeLeftIconMove }],
          },
        ]}
      >
        <MaterialCommunityIcons
          style={props.styles.swipeLeftIcon}
          name="gesture-swipe-left"
          size={70}
          color="white"
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            opacity: dislikeBottomTextFade,
          },
        ]}
      >
        <Text style={props.styles.dislikeBottomText}>Swipe left!</Text>
      </Animated.View>
      <Animated.View
        style={[
          {
            opacity: likeTopTextFade,
          },
        ]}
      >
        <Text style={props.styles.likeTopText}>Like what{"\n"}you see?</Text>
      </Animated.View>
      <Animated.View
        style={[
          {
            transform: [{ translateX: swipeRightIconMove }],
          },
        ]}
      >
        <MaterialCommunityIcons
          style={props.styles.swipeRightIcon}
          name="gesture-swipe-right"
          size={70}
          color="white"
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            opacity: likeBottomTextFade,
          },
        ]}
      >
        <Text style={props.styles.likeBottomText}>Swipe right!</Text>
      </Animated.View>
      <Animated.View
        style={[
          {
            opacity: buttonsTopTextFade,
          },
        ]}
      >
        <Text style={props.styles.buttonsTopText}>Too lazy to swipe?</Text>
      </Animated.View>
      <Animated.View
        style={[
          {
            opacity: buttonsDislikeTextFade,
          },
        ]}
      >
        <Text style={props.styles.buttonsBottomDislikeText}>
          Tap the{"\n"}thumbs down
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          {
            opacity: buttonsLikeTextFade,
          },
        ]}
      >
        <Text style={props.styles.buttonsBottomLikeText}>
          Tap the{"\n"}thumbs up
        </Text>
      </Animated.View>
      <MaterialCommunityIcons
        style={props.styles.dislikeArrow}
        name="arrow-down-bold"
        size={30}
        color="white"
      />
      <MaterialCommunityIcons
        style={props.styles.likeArrow}
        name="arrow-down-bold"
        size={30}
        color="white"
      />
    </>
  );
}
