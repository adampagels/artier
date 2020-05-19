import "firebase/firestore";
import * as firebase from "firebase/app";

export const FETCH_ALL_ART = "FETCH_ALL_ART";
export const LIKE_ART = "LIKE_ART";

export const fetchAllArt = () => {
  return function (dispatch) {
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
        dispatch({ type: "FETCH_ALL_ART", payload: artData });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const likeArt = (artId, user, userId) => {
  return function (dispatch) {
    firebase
      .firestore()
      .collection("art")
      .doc(artId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion({
          user: user,
          userId: userId,
        }),
      })
      .then(() => {
        dispatch({ type: "LIKE_ART" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
