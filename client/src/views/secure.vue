<template>
  <div id="secure">
    <Navbar></Navbar>
    <h1>Secure Area</h1>
    <p>This is a secure area</p>
    <button type="button" @click="fire">Fire</button>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Secure',
  data() {
    return {
      server_msg: '',
    };
  },
  components: {
    Navbar,
  },
  methods: {
    fire() {
      this.$http
        .post('http://localhost:4000/user/login', {
          email: 'nipeshkc7@gmail.com',
          password: 'nipesh62297',
        })
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('jwt', response.data.token);

          if (localStorage.getItem('jwt') != null) {
            this.$router.push('/secure');
          }
        })
        .catch((error) => {
          if (error.response.status === 401) this.server_msg = 'Wrong username or password';
          else this.server_msg = 'Server Error . Please try again later';
        });
    },
  },
};
</script>

<style scoped>
#secure {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;
}
</style>
