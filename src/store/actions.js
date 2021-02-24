import firebase from "firebase/app";

const actions = {
  signUpAction({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        commit("setError", error.message);
      });
  },
  signInAction({ commit }, payload) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch((e) => {
        commit("setError", e.message);
      });
  },
  signOutAction({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setUser", null);
      })
      .catch((e) => {
        commit("setError", e.message);
      });
  },
  authAction({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
      return user ? commit("setUser", user) : commit("setUser", null);
    });
  },
};

export default actions;
