<template>
  <section>
    <Navbar></Navbar>
    <div class="columns">
      <div class="column container">
        <section class="card main-container">
          <form action>
            <div class="modal-card">
              <section class="modal-card-body">
                <b-field label="Name">
                  <b-input v-model="user.name"></b-input>
                </b-field>
                <b-field label="Email">
                  <b-input v-model="user.email"></b-input>
                </b-field>
                <b-field label="password">
                  <b-input v-model="user.password"></b-input>
                </b-field>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-primary" @click="updateDetails()">Update</button>
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
        name: JSON.parse(localStorage.getItem('user')).name,
        email: JSON.parse(localStorage.getItem('user')).email,
        password: '',
      },
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
      if (this.user.name === '' || this.user.email === '' || this.user.password === '') {
        return;
      }
      this.$http
        .post(`${process.env.VUE_APP_SERVER_URL}user/updateUs`, { //fix URL
          ...this.user,
        })
        .then((response) => {
          this.successMsg('Successfully updated details');
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
