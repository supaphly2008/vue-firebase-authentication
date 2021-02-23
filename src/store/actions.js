import firebase from "firebase/app";

const actions = {
  signUpAction({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        commit("setUser", response.user);
      })
      .catch((error) => {
        commit("setError", error.message);
      });
  },
  signInAction({ commit }, payload) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((res) => {
        commit("setUser", res.user);
      })
      .catch((e) => {
        commit("setError", e.message);
      });
  },
};

export default actions;
