<template>
  <div>
    <Navbar></Navbar>
    <div class="columns">
      <div class="card column is-4 is-offset-4" id="loginCard">
        <div class="card-header">
          <p class="card-header-title">Register</p>
        </div>
        <div class="card-content">
          <form id="input-box">
            <section>
              <b-field label="Name" label-position="Inside">
                <b-input icon="name" id="name" type="text" v-model="name" required>
                </b-input>
              </b-field>
              <b-field label="Email" label-position="Inside">
                <b-input icon="email" id="email" type="email" v-model="email" required>
                </b-input>
              </b-field>
              <b-field label="Password" label-position="Inside">
                <b-input icon="key" id="password" type="password" v-model="password" required>
                </b-input>
              </b-field>
              <b-field label="Password" label-position="Inside">
                <b-input
                icon="key"
                id="password-confirm"
                type="password"
                v-model="password_confirmation"
                required>
                </b-input>
              </b-field>
              <br />
              <div
                class="buttons"
              >
                  <b-button native-type="submit" type="is-primary" @click="handleSubmit">
                    Register
                  </b-button>
                  <router-link to="login">
                    <b-button outlined type="is-text"> Go Back</b-button>
                  </router-link>
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
  props: ['nextUrl'],
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      is_admin: null,
      server_msg: '',
    };
  },
  components: {
    Navbar,
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      if (
        this.password === this.password_confirmation
        && this.password.length > 0
      ) {
        let url = 'http://localhost:4000/user/register';
        if (this.is_admin !== null || this.is_admin === 1) {
          url = 'http://localhost:4000/user/register';
        }
        this.$http
          .post(url, {
            name: this.name,
            email: this.email,
            password: this.password,
            is_admin: this.is_admin,
          })
          .then((response) => {
            if (response.status === 200) {
              this.server_msg = response.data;
              this.email = '';
              this.password = '';
              this.password_confirmation = '';
              this.$buefy.notification.open({
                message: 'Successfully registered new user. Login to continue.',
                type: 'is-success',
              });
              this.$router.push('/login');
            }
          })
          .catch(() => {
            this.$buefy.notification.open({
              message: 'Unable to register user.',
              type: 'is-danger',
            });
          });
      } else {
        this.password = '';
        this.passwordConfirm = '';
        this.$buefy.notification.open({
          message: 'Passwords do not match',
          type: 'is-danger',
        });
      }
    },
  },
};
</script>
