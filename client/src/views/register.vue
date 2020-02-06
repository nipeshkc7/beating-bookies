<template>
  <div>
    <h4>Register</h4>
    {{server_msg}}
    <form>
      <label for="name">Name</label>
      <div>
        <input id="name" type="text" v-model="name" required autofocus />
      </div>

      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required />
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required />
      </div>

      <label for="password-confirm">Is this an administrator account?</label>
      <div>
        <select v-model="is_admin">
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </div>

      <div>
        <button type="submit" @click="handleSubmit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
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
            }
          })
          .catch(() => {
            this.server_msg = 'Failed to register new user';
          });
      } else {
        this.password = '';
        this.passwordConfirm = '';
        return alert('Passwords do not match');
      }
      return alert('');
    },
  },
};
</script>
