<template>
  <div>
    <Navbar></Navbar>
    <div class="columns">
      <div class="card column is-4 is-offset-4" id="loginCard">
        <div class="card-header">
          <p class="card-header-title">Sign In with Email</p>
        </div>
        <div class="card-content">
          <form id="input-box">
            <section>
              <b-field label="Email" label-position="Inside">
                <b-input
                  icon="email"
                  placeholder="Enter your email"
                  id="email"
                  type="email"
                  v-model="email"
                  required
                ></b-input>
              </b-field>
              <b-field label="Password" label-position="Inside">
                <b-input
                  icon="key"
                  placeholder="Enter your Password"
                  id="password"
                  type="password"
                  v-model="password"
                  required
                ></b-input>
              </b-field>
              <br />
              <div>
                  <b-button
                  native-type="submit" class="is-pulled-left" type="is-primary"
                  @click="handleSubmit">
                    Login
                  </b-button>
                  <b-button outlined type="is-secondary" class="is-pulled-right"
                  tag="router-link" :to="{ path: '/register' }">
                      Register
                  </b-button>
              </div>
              <br/>
              <br/>
              <div class="columns OR">
                <div class="column">
                  <b>OR,</b>
                </div>
              </div>
              <div class="columns">
                <b-button
                  class="column is-12 is-full-mobile"
                  size="is-medium"
                  icon-left="google"
                  type="is-secondary"
                  @click="redirectToGoogle"
                >&nbsp;&nbsp;&nbsp;Sign in with Google</b-button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      server_msg: '',
    };
  },
  components: {
    Navbar,
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        this.$http
          .post(`${process.env.VUE_APP_SERVER_URL}user/login`, {
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
            if (error.response.status === 401) {
              this.$buefy.notification.open({
                message: 'Email or password does not exist.',
                position: 'is-top',
                type: 'is-danger',
              });
            } else {
              this.$buefy.notification.open({
                message: 'Server error. Please try again later',
                position: 'is-top',
                type: 'is-danger',
              });
            }
          });
      }
    },
    redirectToGoogle() {
      // redirects to google login
      this.$http
        .post(`${process.env.VUE_APP_SERVER_URL}user/oauth/redirect`)
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
  margin-top: 50px;
}

.OR{
  text-align: center;
}
</style>
