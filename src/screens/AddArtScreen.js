import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import "firebase/firestore";
import * as firebase from "firebase/app";
import { fetchAllArt } from "./../redux/actions/art";
import { useDispatch, useSelector } from "react-redux";

export default function AddArtScreen() {
  const dispatch = useDispatch();
  const art = useSelector((state) => state.artReducer.allArt);
  const { uid } = firebase.auth().currentUser;
  const userArt = art.filter((art) => art.data.uid === uid);
  const userArtImages = [
    { uri: userArt[0] && userArt[0].data.image.uri },
    { uri: userArt[1] && userArt[1].data.image.uri },
    { uri: userArt[2] && userArt[2].data.image.uri },
    { uri: userArt[3] && userArt[3].data.image.uri },
  ];

  useEffect(() => {
    const { uid } = firebase.auth().currentUser;
    const unsubscribe = firebase
      .firestore()
      .collection("art")
      .where("uid", "==", uid)
      .onSnapshot(() => {
        dispatch(fetchAllArt());
      });
    return () => unsubscribe();
  }, []);

  const pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
      }).catch((error) => console.log(error));

      if (!result.cancelled) {
        firebase
          .firestore()
          .collection("art")
          .add({
            image: result,
            uid: (firebase.auth().currentUser || {}).uid,
            likes: {},
            dislikes: {},
          });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Add Art</Text>
      <FlatList
        contentContainerStyle={{
          flexDirection: "column",
          marginTop: 180,
        }}
        scrollEnabled={false}
        numColumns={2}
        data={userArtImages}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <ImageBackground
              source={{ uri: item.uri }}
              style={styles.background}
              imageStyle={{ borderRadius: 25 }}
            >
              {item.uri ? (
                <Ionicons
                  name="md-remove-circle"
                  size={50}
                  color="red"
                  style={{
                    shadowColor: "#E9446A",
                    shadowOffset: {
                      width: 0,
                      height: 0,
                      shadowRadius: 10,
                      shadowOpacity: 0.4,
                    },
                    position: "absolute",
                    right: -10,
                    bottom: -18,
                    backgroundColor: "white",
                  }}
                />
              ) : (
                <TouchableOpacity>
                  <Ionicons
                    name="ios-add-circle"
                    size={50}
                    color={"red"}
                    onPress={() => pickImage()}
                    style={{
                      shadowColor: "#E9446A",
                      shadowOffset: {
                        width: 0,
                        height: 0,
                        shadowRadius: 10,
                        shadowOpacity: 0.4,
                      },
                      position: "absolute",
                      right: -10,
                      bottom: -217,
                      backgroundColor: "white",
                    }}
                  />
                </TouchableOpacity>
              )}
            </ImageBackground>
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
  background: {
    height: "100%",
    borderRadius: 20,
    resizeMode: "stretch",
  },
  listItem: {
    backgroundColor: "#B8BBC4",
    width: 160,
    height: 200,
    margin: 10,
    borderRadius: 30,
  },
});
