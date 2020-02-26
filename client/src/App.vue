<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
<style>
#app {
  font-family: 'verdana';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}

@import "styles/bulma.css";
/* @import "~buefy/src/scss/buefy"; */

</style>
