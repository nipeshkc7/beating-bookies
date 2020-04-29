<template>
  <div class="about">
    <Navbar></Navbar>
    <div class="container is-fluid">
      <h1 class="title">Our Motivation</h1>
      <p>Matched-betting has been around for some time now and is quite popular in the UK
         with different services like odds-monkey providing people with tools to make Matched
         betting feasible for the average bettor. With growing number of Australians learning
         about this risk free betting technique, people are looking into services like odds-monkey
         but more relevant to the Aussie market. This led to a surge in popularity in platforms
         like BonusBank which gives out daily plays and a variety of toolset to make the process
         more efficient. However these services do not provide cloud-based storage for tracking
         and updating user's matched-betting activities.
        <br>
         Beating Bookies addresses these shortcomings by providing a free to use tracker that
         tracks user's bets, their profits and provides an interactive dashboard to see
         betting-related statistics. Additionally it provides calculators for placing different
         kinds of bets including back/lay bets, Dutch 2 way bets, Dutch 3 way bets.</p>
      <hr>
      <h1 class="title">About the Software</h1>
      <p>
        This application is free to use, made for matched-bettors, by matched-bettors.
         Used for tracking betting activities, profits along
          with matched-betting tools like dutching calculator, back-lay calculators.
           This application has support for Google Sign In and regular email sign in.
      </p>
      <div class="columns">
        <div class="column is-half">
          <img src="../assets/sc1.png">
        </div>
        <div class="column is-half">
          <img src="../assets/sc2.png">
        </div>
      </div>
      <hr>
      <h1 class="title">Contribution</h1>
      <p>
        Developers can cantribute to the codebase via Github at
        <a href="https://github.com/nipeshkc7/beatingbookies">BeatingBookies github repo</a>. The source code is licenced MIT.
      </p>
    </div>
    <br>
    <br>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'about',
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped>
.container{
  margin-top:32px;
  padding-right:70px;
}
img{
  padding:40px;
}
</style>
