import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import * as firebase from "firebase/app";
import EmptyState from "../components/EmptyState";

export default function NotificationScreen() {
  const art = useSelector((state) => state.artReducer.allArt);
  const { uid } = firebase.auth().currentUser;
  const userArt = art.filter((art) => art.data.uid === uid);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      {userArt.length > 0 ? (
        <FlatList
          data={userArt}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View>
              {Object.values(item.data.likes).length > 0 && (
                <View style={styles.notificationsContainer}>
                  <View style={styles.likedUsersContainer}>
                    <Text style={styles.likedUsers}>
                      {Object.values(item.data.likes).length > 2
                        ? Object.values(item.data.likes)[0] +
                          " & " +
                          (Object.values(item.data.likes).length - 1) +
                          " others liked your art."
                        : Object.values(item.data.likes)
                            .toString()
                            .replace(/,/g, " and ") + " liked your art."}
                    </Text>
                  </View>
                  <View style={{ alignContent: "flex-end" }}>
                    <Image
                      source={{ uri: item.data.image.uri }}
                      style={styles.artwork}
                    ></Image>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <EmptyState
          lineOne={"Oops!"}
          lineTwo={"Nothing Here"}
          lineThree={"Yet..."}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fefefe",
    flex: 1,
    justifyContent: "center",
  },
  notificationsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
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
  likedUsersContainer: {
    marginRight: 50,
    marginTop: 30,
  },
  likedUsers: {
    color: "#333",
    fontWeight: "500",
  },
  artwork: {
    height: 80,
    width: 80,
    borderRadius: 5,
  },
  title: {
    color: "#333",
    fontSize: 52,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginTop: 100,
    marginBottom: 20,
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
