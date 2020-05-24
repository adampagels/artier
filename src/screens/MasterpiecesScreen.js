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
import { Ionicons } from "@expo/vector-icons";

export default function MasterpiecesScreen() {
  const art = useSelector((state) => state.artReducer.allArt);

  const highestRatedArt = art.sort((artwork1, artwork2) => {
    return (
      Object.values(artwork2.data.likes).length -
      Object.values(artwork1.data.likes).length
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={highestRatedArt.splice(0, 10)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              width: 350,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {Object.values(item.data.likes).length > 0 && (
              <View
                style={{
                  marginTop: 60,
                  shadowColor: "#333",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowRadius: 6,
                  shadowOpacity: 0.3,
                  elevation: 2,
                }}
              >
                <Image
                  source={{ uri: item.data.image.uri }}
                  style={{ height: 400, width: 300 }}
                ></Image>
                <View style={styles.interactionContainer}>
                  <Ionicons name="ios-thumbs-up" size={40} color={"#088001"} />
                  <Text
                    style={{
                      color: "#088001",
                      fontSize: 30,
                      marginTop: 5,
                      marginLeft: 10,
                    }}
                  >
                    {Object.values(item.data.likes).length}
                  </Text>
                  <Ionicons
                    name="ios-thumbs-down"
                    size={40}
                    color={"#FE0F00"}
                    style={{ marginLeft: 40, marginTop: 7 }}
                  />
                  <Text
                    style={{
                      color: "#FE0F00",
                      fontSize: 30,
                      marginTop: 5,
                      marginLeft: 10,
                    }}
                  >
                    {Object.values(item.data.dislikes).length}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 3,
  },
});
