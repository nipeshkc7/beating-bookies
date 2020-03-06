<template>
  <section class="card">
    <b-tabs v-model="activeTab">
      <b-tab-item label="Back/Lay bets">
        <form action>
          <div class="modal-card" style="width: auto;height:auto;">
            <section class="modal-card-body">
              <b-field label="Title">
                <b-input placeholder="Bet title"></b-input>
              </b-field>
              <b-field grouped>
                <b-field label="Back Amount">
                    <b-input placeholder="Bet title"></b-input>
                </b-field>
                <b-field label="Back Odds">
                    <b-input placeholder="Back Odds"></b-input>
                </b-field>
                <b-field label="Lay Amount">
                    <b-input placeholder="Lay Amount"></b-input>
                </b-field>
                <b-field label="Lay Odds">
                    <b-input placeholder="Lay Odds"></b-input>
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="Profits">
                    <b-input placeholder="Profits"></b-input>
                </b-field>
                <b-field label="Result">
                    <b-input placeholder="Result"></b-input>
                </b-field>
              </b-field>
              <b-field label="SNR" :label-position="labelPosition">
                <b-select placeholder="Select option">
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </b-select>
              </b-field>
              <b-field label="Betfair commission">
                <b-input placeholder="Betfair commission"></b-input>
              </b-field>
              <b-field label="Date">
                <b-input type="date" placeholder="Date"></b-input>
              </b-field>
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

<style scoped>
section {
  min-height: 200px;
  width: auto;
}
</style>
