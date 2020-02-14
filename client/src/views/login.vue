<template>
  <div>
    <h4>Login</h4>
    {{server_msg}}
    <form>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>
      </div>
      <div>
        <button type="submit" @click="handleSubmit">Login</button>
        <button type="submit" @click="redirectToGoogle">Continue with google</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      server_msg: '',
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        this.$http
          .post('http://localhost:4000/user/login', {
            email: this.email,
            password: this.password,
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
            if (error.response.status === 401) this.server_msg = 'Wrong username or password';
            else this.server_msg = 'Server Error . Please try again later';
          });
      }
    },
    redirectToGoogle() { // redirects to google login
      if (this.password.length > 0) {
        this.$http
          .post('http://localhost:4000/user/oauth/redirect')
          .then((response) => { // response = { url: google Redirect url }
            window.location = response.data.url;
          })
          .catch((error) => {
            console.error(error.response.status);
            this.server_msg = 'Server Error . Please try again later';
          });
      }
    },
  },
};
</script>
