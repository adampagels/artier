import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, NotoSansJP_700Bold } from "@expo-google-fonts/dev";

export default function MasterpiecesScreen() {
  const art = useSelector((state) => state.artReducer.allArt);
  const [fontsLoaded] = useFonts({
    NotoSansJP_700Bold,
  });

  const highestRatedArt = art.sort((artwork1, artwork2) => {
    return (
      Object.values(artwork2.data.likes).length -
      Object.values(artwork1.data.likes).length
    );
  });

  return (
    <View style={styles.container}>
      {fontsLoaded && <Text style={styles.title}>Masterpieces</Text>}
      <FlatList
        horizontal={true}
        data={highestRatedArt}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {Object.values(item.data.likes).length > 0 && (
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 50,
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
                  style={{ height: 400, width: 300, borderRadius: 5 }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fefefe",
    flex: 1,
  },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 3,
  },
  background: {
    height: "220%",
    opacity: 0.3,
    position: "absolute",
    resizeMode: "contain",
    top: -700,
    width: "250%",
  },
  title: {
    color: "#333",
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 48,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginTop: 100,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  subTitle: {
    color: "#333",
    fontSize: 25,
    fontWeight: "600",
    marginHorizontal: 30,
    marginTop: 10,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
});
