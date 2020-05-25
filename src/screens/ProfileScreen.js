import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import * as firebase from "firebase/app";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const art = useSelector((state) => state.artReducer.allArt);
  const { uid, displayName } = firebase.auth().currentUser;
  const userArt = art.filter((art) => art.data.uid === uid);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hi, {displayName}</Text>
      <FlatList
        contentContainerStyle={{
          flexDirection: "column",
          marginTop: 30,
        }}
        scrollEnabled={false}
        numColumns={2}
        data={userArt}
        renderItem={({ item }) => (
          <View
            style={{
              shadowColor: "#333",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowRadius: 6,
              shadowOpacity: 0.3,
              elevation: 2,
              marginBottom: 30,
            }}
          >
            <View style={styles.listItem}>
              <ImageBackground
                source={{ uri: item.data.image.uri }}
                style={styles.background}
                imageStyle={{ borderRadius: 25 }}
              ></ImageBackground>
            </View>
            <View style={styles.interactionContainer}>
              <Ionicons name="ios-thumbs-up" size={27} color={"#088001"} />
              <Text
                style={{
                  color: "#088001",
                  fontSize: 17,
                  marginTop: 5,
                  marginLeft: 10,
                }}
              >
                {Object.values(item.data.likes).length}
              </Text>
              <Ionicons
                name="ios-thumbs-down"
                size={27}
                color={"#FE0F00"}
                style={{ marginLeft: 25, marginTop: 5 }}
              />
              <Text
                style={{
                  color: "#FE0F00",
                  fontSize: 17,
                  marginTop: 5,
                  marginLeft: 10,
                }}
              >
                {Object.values(item.data.dislikes).length}
              </Text>
            </View>
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
    justifyContent: "center",
    backgroundColor: "#f6f6e9",
  },
  title: {
    color: "#333",
    fontSize: 52,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginTop: 60,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    marginBottom: 30,
  },
  background: {
    height: "100%",
    borderRadius: 20,
    resizeMode: "stretch",
  },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 3,
  },
  listItem: {
    backgroundColor: "#B8BBC4",
    width: 140,
    height: 160,
    margin: 10,
    borderRadius: 30,
    marginBottom: 10,
  },
});
