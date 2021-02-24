<template>
  <div id="app">
    <Navbar />
    <section v-if="isUserAuth" class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          Welcome {{ getUser.email }}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-desktop">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
  },
};
</script>

<style lang="scss">
</style>
