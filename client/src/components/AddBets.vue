<template>
  <section class="card">
    <b-tabs>
      <b-tab-item label="Back/Lay bets">
        <form action>
          <div class="modal-card" style="width: auto;height:auto;">
            <section class="modal-card-body">
              <b-field grouped>
                <b-field label="Title" expanded>
                  <b-input v-model="blay_bet.title" placeholder="Bet title"></b-input>
                </b-field>
                <b-field label="SNR" :label-position="labelPosition">
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
                <b-field label="Results" :label-position="labelPosition">
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
      <b-tab-item label="Dutch 2 way bets">Dutch2Way</b-tab-item>
      <b-tab-item label="Dutch 3 way">Dutch3way</b-tab-item>
      <b-tab-item label="General bets">GeneralBet</b-tab-item>
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
        .post('http://localhost:4000/blay/addBet', {
          title: this.blay_bet.title,
          back_amount: this.blay_bet.back_amount,
          back_odds: this.blay_bet.back_odds,
          lay_amount: this.blay_bet.lay_amount,
          lay_odds: this.blay_bet.lay_odds,
          profits: this.blay_bet.profits,
          result: this.blay_bet.result,
          snr: this.blay_bet.snr,
          betfair_commission: this.blay_bet.betfair_commission,
          date_placed: this.blay_bet.date_placed,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (error.response.status === 401) this.server_msg = 'Cannot get Bet data';
          else this.server_msg = 'Server Error . Please try again later';
        });
    },
  },
};
</script>

<!-- title: "Collingwood vs Eastwood",
  back_amount: "100",
  back_odds: "1.1",
  lay_amount: "400",
  lay_odds: "2.1",
  profits: "300",
  result: "win",
  snr: "yes",
  betfair_commission: "20",
date_placed: "2019/02/02",-->

<style scoped>
section {
  min-height: 200px;
  width: auto;
}
</style>
