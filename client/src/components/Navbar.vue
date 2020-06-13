<template>
  <b-navbar :shadow='true'>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img class="logo" src="@/assets/logo.png" alt="Beating bookies - Matched betting tracker" />
      </b-navbar-item>
    </template>
    <template v-if="is_user_logged_in === false" slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">Home</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/About' }">About Us</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/Contact' }">Contact</b-navbar-item>
    </template>
    <template v-else slot="start">
          <b-navbar-item tag="router-link" :to="{ path: '/register' }">Home</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/About' }">About Us</b-navbar-item>
          <b-navbar-item
          class="remove-glow">
      <b-field position="is-centered" class="search-bar">
            <b-autocomplete label="" :data="searchResults"
              placeholder="Search matches"
              v-model="searchTerm"
              icon="magnify"
              @typing="search"
              :check-infinite-scroll="true">
              <template slot-scope="props">
                <div class="media">
                  <div class="media-content">
                    {{ getMatchupString(props.option.item.teams) }}
                  </div>
                  <div class="media-right">
                    <div class="badge">
                      <b-tag type="is-info"> {{ props.option.item.sport_nice }}</b-tag>
                    </div>
                  </div>
                </div>
              </template>
            </b-autocomplete>
      </b-field>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item v-if="is_user_logged_in === false"
       class="remove-glow"
       tag="router-link" :to="{ path: '/register' }">
        <div>
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
        </div>
      </b-navbar-item>
      <b-navbar-item v-if="is_user_logged_in === false"
      tag="router-link" :to="{ path: '/login' }"
      class="remove-glow">
        <div>
          <a class="button is-light">Log in</a>
        </div>
      </b-navbar-item>
      <b-navbar-item v-if="is_user_logged_in === true"
      class="remove-glow">
        <b>{{ username }}</b>
      </b-navbar-item>
      <b-navbar-item v-if="is_user_logged_in === true"
      tag="router-link" :to="{ path: '/account' }"
      class="remove-glow">
        <b-icon
          icon="account"
          size="is-medium">
        </b-icon>
      </b-navbar-item>
      <b-navbar-item v-if="is_user_logged_in === true"
      class="remove-glow">
        <b-icon
          icon="bell"
          size="is-medium">
        </b-icon>
      </b-navbar-item>
      <b-navbar-item v-if="is_user_logged_in === true"
      class="remove-glow">
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
import Fuse from 'fuse.js';

export default {
  name: 'Navbar',
  data() {
    return {
      is_user_logged_in: false,
      username: '',
      searchTerm: '',
      searchResults: [],
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
    search() {
      const fuse = new Fuse(this.$store.state.latestMatches.matchArray[0].matches, {
        keys: ['teams'],
      });
      console.log(fuse.search(this.searchTerm));
      this.searchResults = [...fuse.search(this.searchTerm)];
    },
    getMatchupString(teamArray) {
      return teamArray.reduce((acc, team, index) => {
        if (index !== teamArray.length - 1) return `${acc} ${team} vs`;
        return `${acc} ${team}`;
      }, '');
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

.remove-glow:hover{
  background-color: #FFFFFF;
}

.search-bar{
  width: 26em;
}
</style>
