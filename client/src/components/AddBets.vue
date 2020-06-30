<template>
  <section class="card">
    <b-tabs>
      <!-- Back/Lay bets form -->
      <b-tab-item label="Back/Lay bets">
        <form action>
          <div class="modal-card" style="width: auto;height:auto;">
            <section class="modal-card-body">
              <b-field grouped>
                <b-field label="Title" expanded>
                  <b-input v-model="blay_bet.title" placeholder="Bet title"></b-input>
                </b-field>
                <b-field label="SNR">
                  <b-select placeholder="Select option" v-model="blay_bet.snr" required>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </b-select>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Back Amount" expanded>
                  <b-input
                    v-model="blay_bet.back_amount"
                    type="number"
                    step="0.01"
                    placeholder="Back Amount"
                  ></b-input>
                </b-field>
                <b-field label="Back Odds">
                  <b-input
                    v-model="blay_bet.back_odds"
                    type="number"
                    step="0.01"
                    placeholder="Back Odds"
                  ></b-input>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Lay Amount" expanded>
                  <b-input
                    v-model="blay_bet.lay_amount"
                    type="number"
                    step="0.01"
                    placeholder="Lay Amount"
                  ></b-input>
                </b-field>
                <b-field label="Lay Odds">
                  <b-input
                    v-model="blay_bet.lay_odds"
                    type="number"
                    step="0.01"
                    placeholder="Lay Odds"
                  ></b-input>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Profits" expanded>
                  <b-input v-model="blay_bet.profits" placeholder="Profits"></b-input>
                </b-field>
                <b-field label="Results">
                  <b-select v-model="blay_bet.result" placeholder="Select option">
                    <option value="undecided">undecided</option>
                    <option value="win">Back wins</option>
                    <option value="lose">Back Lose</option>
                  </b-select>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="BF %" expanded>
                  <b-input
                    v-model="blay_bet.betfair_commission"
                    type="number"
                    placeholder="Betfair commission"
                  ></b-input>
                </b-field>
                <b-field label="Date">
                  <b-input
                    v-model="blay_bet.date_placed"
                    type="date"
                    placeholder="Date"
                  ></b-input>
                </b-field>
              </b-field>
            </section>
            <footer class="modal-card-foot">
              <button class="button" type="button" @click="$parent.close()">Close</button>
              <button class="button is-primary" @click="addBet()">Add Bet</button>
            </footer>
          </div>
        </form>
      </b-tab-item>
      <!-- Back/Lay bets tab END -->
      <!-- Dutch2Way bets tab -->
      <b-tab-item label="Dutch 2 way bets">
        <form action>
          <div class="modal-card">
            <section class="modal-card-body">
              <b-field grouped>
                <b-field label="Title" expanded>
                  <b-input v-model="d2w_bet.title" placeholder="Bet title"></b-input>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Team A Amount" expanded>
                  <b-input
                    v-model="d2w_bet.teamA_amount"
                    type="number"
                    step="0.01"
                    placeholder="Team A Amount"
                  ></b-input>
                </b-field>
                <b-field label="Team A Odds">
                  <b-input
                    v-model="d2w_bet.teamA_odds"
                    type="number"
                    step="0.01"
                    placeholder="Team A Odds"
                  ></b-input>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Team B Amount" expanded>
                  <b-input
                    v-model="d2w_bet.teamB_amount"
                    type="number"
                    step="0.01"
                    placeholder="Team B Amount"
                  ></b-input>
                </b-field>
                <b-field label="Team B Odds">
                  <b-input
                    v-model="d2w_bet.teamB_odds"
                    type="number"
                    step="0.01"
                    placeholder="Team B Odds"
                  ></b-input>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Profits" expanded>
                  <b-input v-model="d2w_bet.profits" placeholder="Profits"></b-input>
                </b-field>
                <b-field label="Results">
                  <b-select v-model="d2w_bet.result" placeholder="Select option">
                    <option value="undecided">undecided</option>
                    <option value="teamA">team A wins</option>
                    <option value="teamB">team B wins</option>
                  </b-select>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Date">
                  <b-input
                    v-model="d2w_bet.date_placed"
                    type="date"
                    placeholder="Date"
                  ></b-input>
                </b-field>
              </b-field>
            </section>
            <footer class="modal-card-foot">
              <button class="button" type="button" @click="closeModal()">Close</button>
              <button class="button is-primary" @click="addD2WBet()">Add Bet</button>
            </footer>
          </div>
        </form>
        </b-tab-item>
        <!-- Dutch2Way tab end -->
        <!-- Dutch3Way tab -->
      <b-tab-item label="Dutch 3 way">
        <form action>
          <div class="modal-card">
            <section class="modal-card-body">
              <b-field grouped>
                <b-field label="Title" expanded>
                  <b-input v-model="d3w_bet.title" placeholder="Bet title"></b-input>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Team A Amount" expanded>
                  <b-input
                    v-model="d3w_bet.teamA_amount"
                    type="number"
                    step="0.01"
                    placeholder="Team A Amount"
                  ></b-input>
                </b-field>
                <b-field label="Team A Odds">
                  <b-input
                    v-model="d3w_bet.teamA_odds"
                    type="number"
                    step="0.01"
                    placeholder="Team A Odds"
                  ></b-input>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Team B Amount" expanded>
                  <b-input
                    v-model="d3w_bet.teamB_amount"
                    type="number"
                    step="0.01"
                    placeholder="Team B Amount"
                  ></b-input>
                </b-field>
                <b-field label="Team B Odds">
                  <b-input
                    v-model="d3w_bet.teamB_odds"
                    type="number"
                    step="0.01"
                    placeholder="Team B Odds"
                  ></b-input>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Draw Amount" expanded>
                  <b-input
                    v-model="d3w_bet.draw_amount"
                    type="number"
                    step="0.01"
                    placeholder="Draw Amount"
                  ></b-input>
                </b-field>
                <b-field label="Draw Odds">
                  <b-input
                    v-model="d3w_bet.draw_odds"
                    type="number"
                    step="0.01"
                    placeholder="Draw Odds"
                  ></b-input>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Profits" expanded>
                  <b-input v-model="d3w_bet.profits" placeholder="Profits"></b-input>
                </b-field>
                <b-field label="Results">
                  <b-select v-model="d3w_bet.result" placeholder="Select option">
                    <option value="undecided">undecided</option>
                    <option value="teamA">team A wins</option>
                    <option value="teamB">team B wins</option>
                    <option value="draw">Draw</option>
                  </b-select>
                </b-field>
                <b-field label="Date">
                  <b-input
                    v-model="d3w_bet.date_placed"
                    type="date"
                    placeholder="Date"
                  ></b-input>
                </b-field>
              </b-field>
            </section>
            <footer class="modal-card-foot">
              <button class="button" type="button" @click="closeModal()">Close</button>
              <button class="button is-primary" @click="addD3WBet()">Add Bet</button>
            </footer>
          </div>
        </form>
      </b-tab-item>
      <!-- Dutch3Way tab end -->
    </b-tabs>
  </section>
</template>

<script>
export default {
  name: 'AddBets',
  data() {
    return {
      server_msg: '',
      activeBet: 0,
      blay_bet: {
        title: '',
        back_amount: '',
        back_odds: '',
        lay_amount: '',
        lay_odds: '',
        profits: '',
        result: '',
        snr: '',
        betfair_commission: '5',
        date_placed: `${(new Date()).toISOString().split('T')[0]}`,
      },
      d2w_bet: {
        title: '',
        teamA_amount: '',
        teamB_amount: '',
        teamA_odds: '',
        teamB_odds: '',
        profits: '',
        result: '',
        date_placed: `${(new Date()).toISOString().split('T')[0]}`,
      },
      d3w_bet: {
        title: '',
        teamA_amount: '',
        teamB_amount: '',
        teamA_odds: '',
        teamB_odds: '',
        draw_amount: '',
        draw_odds: '',
        profits: '',
        result: '',
        date_placed: `${(new Date()).toISOString().split('T')[0]}`,
      },
    };
  },
  computed: {
    currentDate() {
      return `${(new Date()).toISOString().split('T')[0]}`;
    },
  },
  methods: {
    addBet() {
      this.$http
        .post(`${process.env.VUE_APP_SERVER_URL}blay/addBet`, {
          ...this.blay_bet,
        })
        .then((response) => {
          console.log(response);
          this.$store.dispatch('betData/updateFromServer');
          this.$parent.close();
        })
        .catch((error) => {
          this.failureMsg(error);
        });
    },
    addD2WBet() {
      this.$http
        .post(`${process.env.VUE_APP_SERVER_URL}d2w/addBet`, {
          ...this.d2w_bet,
        })
        .then((response) => {
          this.successMsg('Successfully added new bet');
          console.log(response);
        })
        .catch((error) => {
          this.failureMsg(error);
        });
    },
    addD3WBet() {
      this.$http
        .post(`${process.env.VUE_APP_SERVER_URL}d3w/addBet`, {
          ...this.d3w_bet,
        })
        .then((response) => {
          this.successMsg('Successfully added new bet');
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
    closeModal() {
    },
  },
};
</script>

<style scoped>
section {
  min-height: 200px;
  width: auto;
}
</style>
