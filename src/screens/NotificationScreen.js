import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { useSelector } from "react-redux";

export default function NotificationScreen() {
  const art = useSelector((state) => state.artReducer.userArt);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={art}
        scrollEnabled={false}
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
                  {Object.values(item.data.likes) + " liked your art"}
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
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
