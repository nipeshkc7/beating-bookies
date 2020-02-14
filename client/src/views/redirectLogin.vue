<template>
  <div>
    <div v-if="loading" class="loading">Loading...</div>
    <div>{{server_msg}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      server_msg: '',
      code: '',
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    console.log(this.$route.query.code);
    this.code = this.$route.query.code;
    this.oauth_login(this.$route.query.code);
  },
  methods: {
    oauth_login(code) {
      if (code) {
        this.$http
          .post('http://localhost:4000/user/oauth', {
            code: this.code,
          })
          .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('jwt', response.data.token);

            if (localStorage.getItem('jwt') != null) {
              this.$router.push('/secure');
            }
          })
          .catch((error) => {
            console.error(error.response.status);
            this.server_msg = 'Server error ! Please try again later';
          });
      }
    },
  },
};
</script>
