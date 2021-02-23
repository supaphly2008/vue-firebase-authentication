<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <div class="card">
        <div class="card-content">
          <div
            v-if="validationErrors.length"
            class="notification is-danger is-light"
          >
            <button @click="resetError()" class="delete"></button>
            <div class="content">
              Please resolve the following error(s) before proceeding.
              <ul style="margin-top: 0.3em; margin-left: 1em">
                <li
                  v-for="(error, index) in validationErrors"
                  :key="`error-${index}`"
                  v-html="error"
                />
              </ul>
            </div>
          </div>
          <form>
            <div class="field">
              <label class="label">E-mail</label>
              <div class="control">
                <input
                  v-model="email"
                  class="input"
                  type="text"
                  autocomplete="email"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Repeat Password</label>
              <div class="control">
                <input
                  v-model="passwordRepeat"
                  class="input"
                  type="password"
                  autocomplete="new-password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="field">
              <p class="control">
                <button @click.prevent="validate()" class="button is-success">
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
  data() {
    return {
      email: null,
      password: null,
      passwordRepeat: null,
      validationErrors: [],
    };
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          console.log("success", res);
        })
        .catch((e) => {
          console.error("error", e);
        });
    },
    validate() {
      this.resetError();
      if (!this.email) {
        this.validationErrors.push("<strong>E-mail</strong> cannot be empty");
      }
      if (!/.+@.+/.test(this.email)) {
        this.validationErrors.push("<strong>E-mail</strong> must be valid");
      }
      if (!this.password) {
        this.validationErrors.push("<strong>Password</strong> cannot be empty");
      }
      if (!/.{6,}/.test(this.password)) {
        this.validationErrors.push(
          "<strong>Password</strong> must be at least 6 characters long"
        );
      }
      if (this.password !== this.passwordRepeat) {
        this.validationErrors.push("<strong>Password</strong> does not match");
      }
      // sign in when valid
      if (!this.validationErrors.length) {
        this.signUp();
      }
    },
    resetError() {
      this.validationErrors = [];
    },
  },
};
</script>