import "firebase/firestore";
import * as firebase from "firebase/app";

export const FETCH_ALL_ART = "FETCH_ALL_ART";
export const LIKE_ART = "LIKE_ART";
export const DISLIKE_ART = "DISLIKE_ART";
export const FETCH_USER_ART = "FETCH_USER_ART";

export const fetchAllArt = () => {
  return function (dispatch) {
    let artData = [];
    const { uid, displayName } = firebase.auth().currentUser;
    const displayNameAndUid = displayName + uid;
    firebase
      .firestore()
      .collection("art")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          artData.push({ data: doc.data(), id: doc.id });
        });
        const otherUsersArt = artData.filter(
          (art) =>
            art.data.likes[displayNameAndUid] !== displayName &&
            art.data.dislikes[displayNameAndUid] !== displayName &&
            art.data.uid !== uid
        );
        dispatch({ type: "FETCH_ALL_ART", payload: otherUsersArt });
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

export const fetchUserArt = () => {
  return function (dispatch) {
    let userArtData = [];
    const { uid } = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("art")
      .where("uid", "==", uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          userArtData.push({ data: doc.data(), id: doc.id });
        });
        dispatch({ type: "FETCH_USER_ART", payload: userArtData });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
