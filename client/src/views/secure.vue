<template>
  <div id="secure">
    <!-- Navbar Component -->
    <Navbar></Navbar>
    <section>
      <b-modal
        :active.sync="isAddModalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        :can-cancel="['escape', 'outside']"
        aria-modal
        :destroy-on-hide="true"
        :height="60"
      >
        <AddBets></AddBets>
      </b-modal>
    </section>
    <section>
      <b-modal
        :active.sync="isEditModalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        :can-cancel="['escape', 'outside']"
        aria-modal
        :height="60"
      >
        <EditBets
          v-bind:betData="betToEdit"
          v-bind:betType="betTypeToEdit"
          v-if="isEditModalActive"
        >
        </EditBets>
      </b-modal>
    </section>
    <section>
      <b-modal
        :active.sync="isCalculatorModalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        :can-cancel="['escape', 'outside']"
        aria-modal
        :height="60"
      >
        <Calculators v-if="isCalculatorModalActive">
        </Calculators>
      </b-modal>
    </section>
    <div class="columns">
      <div class="column is-2">
        <SideBar
          @view-bets="
            ViewBetsTable = true;
            ViewStats = false;
            ViewSettleBets = false;
          "
          @view-stats="
            ViewStats = true;
            ViewBetsTable = false;
            ViewSettleBets = false;
          "
          @view-dashboard="
            ViewBetsTable = true;
            ViewStats = true;
            ViewSettleBets = true;
          "
          @add-bet="isAddModalActive = true"
          @calculators="isCalculatorModalActive = true"
        >
        </SideBar>
      </div>
      <div class="container main-content column">
        <div class="tile is-ancestor" v-if="ViewStats">
          <div class="tile is-parent">
            <article
              class="tile is-child box notification is-info"
            >
              <p class="title">Average conversion 💸</p>
              <p class="subtitle">
                {{ average_conversion }}
              </p>
            </article>
          </div>
          <div class="tile is-parent">
            <article
              class="tile is-child box notification is-success"
            >
              <p class="title">Total profits 📈</p>
              <p class="subtitle">{{ total_profits }}</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article
              class="tile is-child box notification is-primary"
            >
              <p class="title">Biggest win 😃</p>
              <p class="subtitle">{{ biggest_win }}</p>
            </article>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div
            class="tile is-8 is-vertical"
            v-if="ViewBetsTable"
          >
            <div class="tile is-parent">
              <article class="tile is-child box is-info">
                <div class="level">
                  <p class="title level-right">
                    🚀 Your bets
                  </p>
                  <b-button
                    class="level-left button is-primary"
                    icon-left="plus"
                    @click="isAddModalActive = true"
                    >Add Bet</b-button
                  >
                </div>
                <BetsTable
                  v-if="betData != ''"
                  v-bind:perPage="perPage"
                  :isPaginated="true"
                  v-bind:betData="betData"
                  @update-bet-data="getBetData()"
                  @edit-bet-data="editBetData"
                >
                </BetsTable>
                <div v-else class="empty-box">
                  <b-message type="is-info" has-icon>
                    No bets have been placed yet. Please
                    click on the 'Add bet' button to add
                    your first bet. If you have any
                    confusion regarding how to use this app.
                    Please consult the <a href="#">FAQs</a>.
                  </b-message>
                </div>
              </article>
            </div>
          </div>
          <div
            class="tile is-4 is-vertical"
            v-if="ViewSettleBets"
          >
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">Upcoming matches</p>
                <article>
                  <a
                    v-for="match in latestMatches[0].matches.slice(
                      4
                    )"
                    :key="match.commence_time"
                    class="panel-block"
                  >
                  <b-tooltip :label="(new Date(match.commence_time * 1000)).toDateString()"
                  type="is-dark">
                    <span class="panel-icon">
                      <i
                        class="fas fa-futbol"
                        aria-hidden="true"
                      ></i>
                    </span>
                    {{ getMatchupString(match.teams) }}
                    <div class="badge">
                    <b-tag type="is-info"> {{ match.sport_nice }}</b-tag>
                    </div>
                  </b-tooltip>
                  </a>
                </article>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import AWS from 'aws-sdk';
import Navbar from '../components/Navbar.vue';
import BetsTable from '../components/BetsTable.vue';
import SideBar from '../components/SideBar.vue';
import Footer from '../components/Footer.vue';
import AddBets from '../components/AddBets.vue';
import EditBets from '../components/EditBets.vue';
import Calculators from '../components/Calculators.vue';

AWS.config.update({
  region: process.env.VUE_APP_AWS_REGION,
  accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();

export default {
  name: 'Secure',
  data() {
    return {
      isAddModalActive: false,
      isEditModalActive: false,
      isCalculatorModalActive: false,
      isViewBetsTable: false,
      isViewStats: false,
      ViewStats: true,
      ViewBetsTable: true,
      ViewSettleBets: true,
      perPage: '5',
      betToEdit: {},
      server_msg: '',
      betTypeToEdit: '',
    };
  },
  components: {
    Navbar,
    BetsTable,
    EditBets,
    AddBets,
    Calculators,
    SideBar,
    Footer,
  },
  created() {
    this.getBetData();
    this.getLatestMatches();
  },
  methods: {
    getBetData() {
      this.$store.dispatch('betData/updateFromServer');
    },
    editBetData(bet) {
      Object.assign(this.betToEdit, bet);
      this.betTypeToEdit = bet.type;
      if (bet.type === this.betToEdit.type) this.isEditModalActive = true;
    },
    getLatestMatches() {
      const params = {
        TableName: process.env.VUE_APP_AWS_TABLE_NAME,
        ProjectionExpression: 'id, betsDate, matches',
      };
      docClient.scan(params, this.onScan);
    },
    onScan(err, data) {
      if (err) {
        console.error(
          'Unable to scan the table. Error JSON:',
          JSON.stringify(err, null, 2),
        );
      } else {
        this.$store.dispatch('latestMatches/updateMatches', [...data.Items]);
      }
    },
    getMatchupString(teamArray) {
      return teamArray.reduce((acc, team, index) => {
        if (index !== teamArray.length - 1) return `${acc} ${team} vs`;
        return `${acc} ${team}`;
      }, '');
    },
  },
  computed: {
    total_profits() {
      const totalProfit = this.betData.reduce(
        (accumulator, currentValue) => {
          if (!Number.isNaN(Number(currentValue.profits))) {
            return accumulator + currentValue.profits;
          }
          return accumulator;
        },
        0,
      );
      return `AUD ${totalProfit}`;
    },
    biggest_win() {
      const biggestWin = this.betData.reduce((p, v) => {
        if (!Number.isNaN(Number(v.profits))) {
          return p > v.profits ? p : v.profits;
        }
        return p;
      }, 0);
      return `AUD ${biggestWin}`;
    },
    average_conversion() {
      if (this.betData.length === 0) return '0 % conversion';
      const totalSuccess = this.betData.reduce((p, v) => {
        if (!Number.isNaN(Number(v.profits))) {
          return v.profits > 0 ? 1 + p : p;
        }
        return p;
      }, 0);
      const averageConversion = (totalSuccess / this.betData.length) * 100;
      return `${averageConversion} %`;
    },
    latestMatches() {
      return this.$store.state.latestMatches.matchArray;
    },
    betData() {
      return this.$store.state.betData.betData;
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

.empty-box {
  height: 350px;
}

.badge{
  margin-left: 0.2em;
}
</style>
