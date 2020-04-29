<template>
  <div class="contact">
    <Navbar></Navbar>
    <div class="container is-fluid">
      <div class="content">
      <h1 class="title">Get In touch</h1>
      <p>Email: <a href="#"> nipeshkc7@gmail.com</a>
         <br>Phone: <a href="#"> 0416918059 </a>
      </p>
      <p> Developer website: <a href="https://arpankc.com"> ArpanKc.com </a> </p>
    <br>
    <br>
      </div>
    <Footer></Footer>
  </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'contact',
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
  height:500px;
}
#contact{
    height:500px;
}
.content{
    height: 100%;
}
</style>
