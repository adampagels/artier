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
import { fetchAllArt, deleteArt } from "./../redux/actions/art";
import {
  setNewUserClosingModal,
  setFirstTimeUser,
} from "./../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useFonts, NotoSansJP_700Bold } from "@expo-google-fonts/dev";

export default function AddArtScreen() {
  const dispatch = useDispatch();
  const art = useSelector((state) => state.artReducer.allArt);
  const { uid } = firebase.auth().currentUser;
  const userArt = art.filter((art) => art.data.uid === uid);
  const { showActionSheetWithOptions } = useActionSheet();
  const [fontsLoaded] = useFonts({
    NotoSansJP_700Bold,
  });
  const isFirstTimeUser = useSelector(
    (state) => state.userReducer.isFirstTimeUser
  );
  const userArtImages = [
    {
      uri: userArt[0] && userArt[0].data.image.uri,
      id: userArt[0] && userArt[0].id,
    },
    {
      uri: userArt[1] && userArt[1].data.image.uri,
      id: userArt[1] && userArt[1].id,
    },
    {
      uri: userArt[2] && userArt[2].data.image.uri,
      id: userArt[2] && userArt[2].id,
    },
    {
      uri: userArt[3] && userArt[3].data.image.uri,
      id: userArt[3] && userArt[3].id,
    },
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
    return () => {
      unsubscribe();
      isFirstTimeUser && dispatch(setNewUserClosingModal(true));
      dispatch(setFirstTimeUser(false));
    };
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

  const takePhoto = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

  const onActionPress = () => {
    const options = ["Choose From Library", "Take Picture", "Cancel"];
    const cancelButtonIndex = options.length - 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return pickImage();
          case 1:
            return takePhoto();
          default:
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {fontsLoaded && <Text style={styles.title}>Add Photos</Text>}
      <FlatList
        contentContainerStyle={{
          flexDirection: "column",
          marginTop: 80,
        }}
        scrollEnabled={false}
        numColumns={2}
        data={userArtImages}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <ImageBackground
              source={{ uri: item.uri }}
              style={styles.background}
              imageStyle={{ borderRadius: 25 }}
            >
              {item.uri ? (
                <TouchableOpacity
                  onPress={() => dispatch(deleteArt(item.id))}
                  style={{
                    position: "absolute",
                    right: -10,
                    bottom: -18,
                    borderRadius: 50,
                    backgroundColor: "#FE0F00",
                    height: 50,
                    width: 50,
                    alignItems: "center",
                    shadowColor: "#E9446A",
                    shadowOffset: {
                      width: 0,
                      height: 0,
                      shadowRadius: 10,
                      shadowOpacity: 0.4,
                    },
                  }}
                >
                  <Ionicons name="ios-remove" size={50} color="#f6f6e9" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => onActionPress()}
                  style={{
                    position: "absolute",
                    right: -10,
                    bottom: -18,
                    borderRadius: 50,
                    backgroundColor: "#FE0F00",
                    height: 50,
                    width: 50,
                    alignItems: "center",
                    shadowColor: "#E9446A",
                    shadowOffset: {
                      width: 0,
                      height: 0,
                      shadowRadius: 10,
                      shadowOpacity: 0.4,
                    },
                  }}
                >
                  <Ionicons name="ios-add" size={50} color="#f6f6e9" />
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
  title: {
    color: "#333",
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 37,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginTop: 70,
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
