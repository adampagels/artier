import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

export default function NotificationScreen() {
  const art = useSelector((state) => state.artReducer.userArt);
  const [isReady, setReady] = useState(false);

  const _cacheResourcesAsync = async () => {
    const images = [require("../assets/notificationBG.jpg")];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isReady === false ? (
        <AppLoading
          startAsync={_cacheResourcesAsync}
          onFinish={() => setReady(true)}
          onError={console.warn}
        />
      ) : (
        <Image
          source={require("../assets/notificationBG.jpg")}
          style={styles.background}
        />
      )}
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={art}
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
                    imageStyle={{ borderRadius: 100 }}
                  ></Image>
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
    justifyContent: "center",
  },
  notificationsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
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
  },
  title: {
    color: "#333",
    fontSize: 52,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginTop: 60,
  },
  background: {
    height: "220%",
    opacity: 0.3,
    position: "absolute",
    resizeMode: "contain",
    top: -700,
    width: "250%",
  },
});
