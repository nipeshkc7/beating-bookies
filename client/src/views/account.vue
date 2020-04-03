<template>
  <section>
    <b-field label="Name">
      <b-input v-model="name"></b-input>
    </b-field>
    <b-field label="Email">
      <b-input v-model="email"></b-input>
    </b-field>
    <b-field label="password">
      <b-input v-model="name"></b-input>
    </b-field>
  </section>
</template>

<script>
export default {
  name: 'account',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
};
</script>
