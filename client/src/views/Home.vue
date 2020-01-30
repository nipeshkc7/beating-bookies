<template>
  <div>
    {{messages.name}}
  </div>
</template>

<script>
const API_URL = 'http://localhost:4000/dummy';

export default {
  name: 'home',
  data: () => ({
    error: '',
    messages: [],
    message: {
      username: 'Enter username',
      subject: '',
      message: 'this is a message',
      imageURL: '',
    },
  }),
  computed: {
    reversedMessages() {
      return ' ';
    },
  },
  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then((result) => {
        this.messages = result;
      });
  },
  methods: {
    addMessage() {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            const error = result.details
              .map(detail => detail.message)
              .join('. ');
            this.error = error;
          } else {
            this.error = '';
            this.showMessageForm = false;
            this.messages.push(result);
          }
        });
    },
  },
};
</script>

<style>
img {
  max-width: 300px;
  height: auto;
}
</style>
