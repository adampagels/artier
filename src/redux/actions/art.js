import "firebase/firestore";
import * as firebase from "firebase/app";

export const FETCH_ALL_ART = "FETCH_ALL_ART";
export const LIKE_ART = "LIKE_ART";
export const DISLIKE_ART = "DISLIKE_ART";
export const DELETE_ART = "DELETE_ART";

export const fetchAllArt = () => {
  return function (dispatch) {
    let artData = [];
    firebase
      .firestore()
      .collection("art")
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
        ["likes." + user + userId]: user,
      })
      .then(() => {
        dispatch({ type: "LIKE_ART" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const dislikeArt = (artId, user, userId) => {
  return function (dispatch) {
    firebase
      .firestore()
      .collection("art")
      .doc(artId)
      .update({
        ["dislikes." + user + userId]: user,
        ["dislikes." + "uid" + userId]: userId,
      })
      .then(() => {
        dispatch({ type: "DISLIKE_ART" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteArt = (id) => {
  return function (dispatch) {
    firebase
      .firestore()
      .collection("art")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_ART" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
