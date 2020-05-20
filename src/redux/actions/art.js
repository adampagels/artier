import "firebase/firestore";
import * as firebase from "firebase/app";

export const FETCH_ALL_ART = "FETCH_ALL_ART";
export const LIKE_ART = "LIKE_ART";

export const fetchAllArt = () => {
  return function (dispatch) {
    let artData = [];
    const { uid } = firebase.auth().currentUser;
    const uidForFilter = "uid" + uid;
    firebase
      .firestore()
      .collection("art")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          artData.push({ data: doc.data(), id: doc.id });
        });
        const otherUsersArt = artData.filter(
          (art) => art.data.likes[uidForFilter] !== uid && art.data.uid !== uid
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
        ["likes." + "uid" + userId]: userId,
      })
      .then(() => {
        dispatch({ type: "LIKE_ART" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
