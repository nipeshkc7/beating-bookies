<template>
  <div id="secure">
    <!-- Navbar Component -->
    <Navbar></Navbar>
    <section>
      <b-modal :active.sync="isModalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        :can-cancel="['escape','outside']"
        aria-modal
        :height="60"
        >
        <AddBets></AddBets>
      </b-modal>
    </section>
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
                <div class="level">
                  <p class="title level-right">Your bets ...</p>
                  <b-button class="level-left button is-primary" icon-left="plus"
                  @click="isModalActive = true">
                    Add Bet
                  </b-button>
                </div>
                <BetsTable perPage="5" :isPaginated="true" v-bind:betData="betData"></BetsTable>
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
import AddBets from '../components/AddBets.vue';

export default {
  name: 'Secure',
  data() {
    return {
      isModalActive: false,
      server_msg: '',
      betData: [],
    };
  },
  components: {
    Navbar,
    BetsTable,
    AddBets,
    SideBar,
    Footer,
  },
  created() {
    this.getBetData();
  },
  methods: {
    getBetData() {
      this.$http
        .get('http://localhost:4000/bets/getAll', {
          params: {
            user_id: JSON.parse(localStorage.getItem('user')).id,
          },
        })
        .then((response) => {
          this.betData = response.data;
        })
        .catch((error) => {
          if (error.response.status === 401) this.server_msg = 'Cannot get Bet data';
          else this.server_msg = 'Server Error . Please try again later';
        });
    },
  },
  computed: {
    total_profits() {
      const totalProfit = this.betData.reduce((accumulator, currentValue) => {
        if (!Number.isNaN(Number(currentValue.profits))) {
          return accumulator + currentValue.profits;
        }
        return accumulator;
      }, 0);
      return `AUD ${totalProfit}`;
    },
    biggest_win() {
      const biggestWin = this.betData.reduce((p, v) => {
        if (!Number.isNaN(Number(v.profits))) {
          return (p > v.profits ? p : v.profits);
        }
        return p;
      }, 0);
      return `AUD ${biggestWin}`;
    },
    average_conversion() {
      const totalSuccess = this.betData.reduce((p, v) => {
        if (!Number.isNaN(Number(v.profits))) {
          return (v.profits > 0 ? 1 + p : p);
        }
        return p;
      }, 0);
      const averageConversion = (totalSuccess / this.betData.length) * 100;
      return `${averageConversion} %`;
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
