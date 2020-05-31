import React, { useEffect } from "react";
import { Animated, Text } from "react-native";

export default function HorizontalTutorialCardLines(props) {
  const fadeAnimation = new Animated.Value(0);

  const fade = setTimeout(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      delay: props.item.index * 100,
      duration: props.item.index == 0 ? 1400 : 800,
    }).start();
  }, 150);

  useEffect(() => {
    return () => {
      clearTimeout(fade);
    };
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnimation,
        },
      ]}
    >
      <Text style={props.styles}>{props.item.index}</Text>
    </Animated.View>
  );
}
