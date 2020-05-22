import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { useSelector } from "react-redux";

export default function MasterpiecesScreen() {
  const art = useSelector((state) => state.artReducer.allArt);

  const highestRatedArt = art.sort((artwork1, artwork2) => {
    return (
      Object.values(artwork2.data.likes).length -
      Object.values(artwork1.data.likes).length
    );
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={highestRatedArt}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                alignContent: "right",
                width: 350,
              }}
            >
              {Object.values(item.data.likes).length > 0 && (
                <View
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "flex-end",
                    marginTop: 30,
                  }}
                >
                  <Text>
                    {Object.values(item.data.likes).length + " likes"}
                  </Text>
                  <Text>
                    {Object.values(item.data.dislikes).length + " dislikes "}
                  </Text>
                  <Image
                    source={{ uri: item.data.image.uri }}
                    style={{ height: 80, width: 80, marginLeft: 10 }}
                    imageStyle={{ borderRadius: 100 }}
                  ></Image>
                </View>
              )}
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
