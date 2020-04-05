<template>
  <section>
    <Navbar></Navbar>
    <div class="columns">
      <div class="column container">
        <section class="card main-container">
          <form action @submit.prevent="updateDetails()">
            <div class="modal-card">
              <section class="modal-card-body">
                <b-field label="Name">
                  <b-input v-model="user.new_name" required></b-input>
                </b-field>
                <b-field label="Email">
                  <b-input v-model="user.new_email" required></b-input>
                </b-field>
                <b-field label="password">
                  <b-input type="password" v-model="user.new_password" required></b-input>
                </b-field>
                <b-field label="Confirm password">
                  <b-input type="password" v-model="confirm_password" required></b-input>
                </b-field>
              </section>
              <footer class="modal-card-foot">
                <button native-type="submit" class="button is-primary">
                  Update
                </button>
              </footer>
            </div>
          </form>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'account',
  components: {
    Navbar,
  },
  data() {
    return {
      user: {
        new_name: JSON.parse(localStorage.getItem('user')).name,
        new_email: JSON.parse(localStorage.getItem('user')).email,
        new_password: '',
        old_email: JSON.parse(localStorage.getItem('user')).email,
      },
      confirm_password: '',
      ViewStats: true,
      ViewBetsTable: true,
      ViewSettleBets: true,
    };
  },
  created() {
    this.getCurrentDetails();
  },
  methods: {
    getCurrentDetails() {
      console.log('getcurrentdetails');
    },
    updateDetails() {
      if (this.confirm_password !== this.user.new_password) {
        this.failureMsg('Passwords dont match');
      }
      this.$http
        .post(`${process.env.VUE_APP_SERVER_URL}user/updateUser`, { // fix URL
          ...this.user,
        })
        .then((response) => {
          this.successMsg('Successfully updated details');
          const user = JSON.parse(localStorage.getItem('user'));
          user.name = this.user.new_name;
          user.email = this.user.new_email;
          localStorage.setItem('user', JSON.stringify(user));
          console.log(response);
        })
        .catch((error) => {
          this.failureMsg(error);
        });
    },
    successMsg(msg) {
      this.$buefy.toast.open({
        duration: 5000,
        message: msg.toString(),
        position: 'is-top',
        type: 'is-success',
      });
    },
    failureMsg(msg) {
      this.$buefy.toast.open({
        duration: 5000,
        message: msg.toString(),
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
  },
};
</script>

<style scoped>
  .main-container{
    padding:80px 90px 230px 90px;
  }
</style>
