<template>
  <div class="columns is-desktop">
    <div class="card column is-4 is-offset-4" id="loginCard">
      <div class="card-header">
        <p class="card-header-title">Login to Matched Betting Tracker</p>
      </div>
      <div class="card-content">
        <form id="input-box">
          <section>
            <b-field label="Email" label-position="Inside">
              <b-input icon="email" id="email" type="email" v-model="email" required></b-input>
            </b-field>
            <b-field label="Password" label-position="Inside">
              <b-input icon="key" id="password" type="password" v-model="password" required>
              </b-input>
            </b-field>
            <br />
            <div class="buttons">
              <b-button native-type="submit" type="is-primary" @click="handleSubmit">
                Login
              </b-button>
              <router-link to="register">
                <b-button outlined type="is-primary">
                  Register
                </b-button>
              </router-link>
            </div>
            <p>
              <b>OR,</b>
            </p>
            <br />
            <b-button
              size="is-medium"
              icon-left="google"
              type="is-secondary"
              @click="redirectToGoogle">
              &nbsp;&nbsp;&nbsp;Sign in with Google
            </b-button>
          </section>
        </form>
      </div>
    </div>
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
    redirectToGoogle() {
      // redirects to google login
      this.$http
        .post('http://localhost:4000/user/oauth/redirect')
        .then((response) => {
          // response = { url: google Redirect url }
          window.location = response.data.url;
        })
        .catch((error) => {
          console.error(error.response.status);
          this.server_msg = 'Server Error . Please try again later';
        });
    },
  },
};
</script>

<style>
#loginCard {
  margin-top: 20px;
}
</style>
