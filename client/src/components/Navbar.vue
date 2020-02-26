<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          class="logo"
          src="@/assets/logo.png"
          alt="Beating bookies - Matched betting tracker"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="#">Home</b-navbar-item>
      <b-navbar-item href="#">About Us</b-navbar-item>
      <b-navbar-item href="#">Contact</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="router-link" :to="{ path: '/register' }">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">Log in</a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.logo{
    margin:0;
    padding: 0;
    width:110px;
    max-height:none;
}
</style>
