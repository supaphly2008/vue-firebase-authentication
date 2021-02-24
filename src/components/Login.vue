<template>
  <div class="columns" v-if="!isUserAuth">
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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      email: null,
      password: null,
      validationErrors: [],
    };
  },
  computed: {
    ...mapGetters(["isUserAuth"]),
  },
  methods: {
    ...mapActions(["signInAction"]),
    signIn() {
      this.signInAction({ email: this.email, password: this.password });
    },
    validate() {
      this.resetError();
      if (!this.email) {
        this.validationErrors.push("<strong>E-mail</strong> cannot be empty");
      }
      if (!this.password) {
        this.validationErrors.push("<strong>Password</strong> cannot be empty");
      }
      if (!this.validationErrors.length) {
        this.signIn();
      }
    },
    resetError() {
      this.validationErrors = [];
    },
  },
};
</script>