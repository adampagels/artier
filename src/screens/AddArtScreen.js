import React, { useState, useEffect } from "react";
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

export default function AddArtScreen() {
  const [image, setImage] = useState([]);
  const uploadedArt = [
    { uri: image[0] && image[0].data.image.uri },
    { uri: image[1] && image[1].data.image.uri },
    { uri: image[2] && image[2].data.image.uri },
    { uri: image[3] && image[3].data.image.uri },
  ];

  useEffect(() => {
    fetchUserArt();
  }, [image]);

  const pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
      }).catch((error) => console.log(error));

      if (!result.cancelled) {
        setImage(result);
        firebase
          .firestore()
          .collection("art")
          .add({
            image: result,
            uid: (firebase.auth().currentUser || {}).uid,
          });
        return await uploadImage(result.uri);
      }
    }
  };

  const fetchUserArt = () => {
    let artData = [];
    let userId = (firebase.auth().currentUser || {}).uid;
    firebase
      .firestore()
      .collection("art")
      .where("uid", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          artData.push({ data: doc.data(), id: doc.id });
        });
        setImage(artData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadImage = async (uri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (error) {
          console.log(error);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      //Create a unique file name for each image uploaded
      let uriParts = uri.split("/");
      let imageName = uriParts[uriParts.length - 1];
      const ref = firebase.storage().ref().child(`${imageName}`);
      const snapshot = await ref.put(blob);
      blob.close();
    } catch (error) {
      console.log(error);
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
        data={uploadedArt}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <ImageBackground
              source={{ uri: item.uri }}
              style={styles.background}
              imageStyle={{ borderRadius: 25 }}
            >
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
