<template>
  <b-navbar shadow="true">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img class="logo" src="@/assets/logo.png" alt="Beating bookies - Matched betting tracker" />
      </b-navbar-item>
    </template>
    <template v-if="is_user_logged_in === false" slot="start">
      <b-navbar-item href="#">Home</b-navbar-item>
      <b-navbar-item href="#">About Us</b-navbar-item>
      <b-navbar-item href="#">Contact</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item v-if="is_user_logged_in === false"
       tag="router-link" :to="{ path: '/register' }">
        <div>
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
        </div>
      </b-navbar-item>
      <b-navbar-item v-if="is_user_logged_in === false"
      tag="router-link" :to="{ path: '/login' }">
        <div>
          <a class="button is-light">Log in</a>
        </div>
      </b-navbar-item>
      <b-navbar-item v-if="is_user_logged_in === true">
        <b>{{ username }}</b>
      </b-navbar-item>
      <b-navbar-item v-if="is_user_logged_in === true">
        <b-icon
          icon="account"
          size="is-medium">
        </b-icon>
      </b-navbar-item>
      <b-navbar-item v-if="is_user_logged_in === true">
        <b-icon
          icon="bell"
          size="is-medium">
        </b-icon>
      </b-navbar-item>
      <b-navbar-item v-if="is_user_logged_in === true">
        <div>
          <a v-on:click="logout" class="button is-primary">
            <strong>Logout</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      is_user_logged_in: false,
      username: '',
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      if (localStorage.getItem('user')) {
        this.is_user_logged_in = true;
        const user = JSON.parse(localStorage.getItem('user'));
        this.username = user.name;
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push('/');
    },
  },
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.logo {
  margin: 0;
  padding: 0;
  width: 110px;
  max-height: none;
}
</style>
