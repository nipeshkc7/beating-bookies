<template>
  <section class="card">
    <b-tabs v-model="activeTab">
      <b-tab-item label="Back/Lay bets">
        <form action>
          <div class="modal-card" style="width: auto;height:auto;">
            <section class="modal-card-body">
              <b-field grouped>
              <b-field label="Title" expanded>
                <b-input placeholder="Bet title"></b-input>
              </b-field>
              <b-field label="SNR" :label-position="labelPosition">
                <b-select placeholder="Select option">
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </b-select>
              </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Back Amount" expanded>
                    <b-input type="number" step="0.01" placeholder="Back Amount"></b-input>
                </b-field>
                <b-field label="Back Odds">
                    <b-input type="number" step="0.01" placeholder="Back Odds"></b-input>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Lay Amount" expanded>
                    <b-input type="number" step="0.01" placeholder="Lay Amount"></b-input>
                </b-field>
                <b-field label="Lay Odds">
                    <b-input type="number" step="0.01" placeholder="Lay Odds"></b-input>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Profits" expanded>
                    <b-input placeholder="Profits"></b-input>
                </b-field>
              <b-field label="Results" :label-position="labelPosition">
                <b-select placeholder="Select option">
                  <option value="undecided">undecided</option>
                  <option value="win">Back wins</option>
                  <option value="lose">Back Lose</option>
                </b-select>
              </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="BF %" expanded>
                <b-input type="number" placeholder="Betfair commission" value='5'></b-input>
              </b-field>
              <b-field label="Date">
                <b-input type="date" placeholder="Date"></b-input>
              </b-field>
            </b-field>
            </section>
            <footer class="modal-card-foot">
              <button class="button" type="button" @click="$parent.close()">Close</button>
              <button class="button is-primary">Add Bet</button>
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
      activeBet: 0,
    };
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
