<template>
  <div id="home">
    <Navbar></Navbar>
    <div class="columns level">
      <div class="illustration column is-half is-0-mobile">
        <img class="bannerPic" src="../assets/bannerpic.svg">
      </div>
      <div class="callToAction column is-half is-full-mobile">
        <div class="slogan title is-1">
          Make the most out of the Bookmakers !
        </div>
        <div class="subtitle">
          🚀 Join BB Now to start maximising your profits.
        </div>
        <div class="buttons buttonGroup">
            <b-button tag="router-link"
                to="/login"
                type="is-primary">
                Get Started
            </b-button>
            <b-button tag="router-link"
                to="/About"
                type="is-secondary">
                Learn More
            </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'home',
  data: () => ({
    error: '',
  }),
  components: {
    Navbar,
  },
  created() {
    this.wakeSleepingApp();
  },
  methods: {
    wakeSleepingApp() {
      console.log('Wake up sleeping backend');
      this.$http.get(`${process.env.VUE_APP_SERVER_URL}`)
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>

<style scoped>
  #home{
    position:fixed;
    top:0px;
    bottom:0px;
    left:0px;
    right:0px;
  }
  .callToAction{
    padding: 120px 40px;
  }
  .bannerPic{
    height: 80%;
    width: 80%;
    margin-left:90px;
    margin-right:0;
    margin-top: 10px;
    padding-top:20px;
  }
  @media only screen and (max-width: 600px) {
    .callToAction{
      padding: 40px 40px;
    }
  }

</style>
