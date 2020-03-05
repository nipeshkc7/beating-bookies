<template>
  <section class="card">
    <b-tabs v-model="activeTab">
      <b-tab-item label="Back/Lay bets">
        <form action>
          <div class="modal-card" style="width: auto">
            <section class="modal-card-body">
              <b-field label="Email">
                <b-input type="email" placeholder="Your email" required></b-input>
              </b-field>

              <b-field label="Password">
                <b-input type="password" password-reveal placeholder="Your password"
                required>
                </b-input>
              </b-field>

              <b-checkbox>Remember me</b-checkbox>
            </section>
            <footer class="modal-card-foot">
              <button class="button" type="button" @click="$parent.close()">Close</button>
              <button class="button is-primary">Login</button>
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
