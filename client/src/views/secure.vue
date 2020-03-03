<template>
  <div id="secure">
    <Navbar></Navbar>
    <div class="columns">
      <div class="column is-2">
        <SideBar></SideBar>
      </div>
      <div class="container main-content column">
        <!-- <h1 class="title">Dashboard</h1> -->
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box notification is-info">
              <p class="title">Average conversion</p>
              <p class="subtitle">{{ average_conversion }}</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box notification is-success">
              <p class="title">Total profits</p>
              <p class="subtitle">{{ total_profits }}</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box notification is-primary">
              <p class="title">Biggest win this week</p>
              <p class="subtitle">{{ biggest_win }}</p>
            </article>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-8 is-vertical">
            <div class="tile is-parent">
              <article class="tile is-child box is-info">
                <p class="title">Your bets ...</p>
                <BetsTable perPage="5" isPaginated="true"></BetsTable>
              </article>
            </div>
          </div>
          <div class="tile is-4 is-vertical">
            <div class="tile is-parent">
              <article class="tile is-child box notification is-info">
                <p class="title">ToDo:Settle these bets !</p>
                <p class="subtitle">{{ average_conversion }}</p>
              </article>
            </div>
            <!-- Can add another div here-->
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import BetsTable from '../components/BetsTable.vue';
import SideBar from '../components/SideBar.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Secure',
  data() {
    return {
      server_msg: '',
      average_conversion: '20%',
      total_profits: 'AUD 1000',
      biggest_win: 'AUD 258.20',
    };
  },
  components: {
    Navbar,
    BetsTable,
    SideBar,
    Footer,
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
.main-content {
  padding: 25px 20px 5px 0px;
}

.subtitle {
  font-size: "90px";
}
</style>
