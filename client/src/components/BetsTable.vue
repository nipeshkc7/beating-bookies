<template>
  <section>
    <b-table :data="betData" :per-page="perPage" :paginated="isPaginated">
      <template slot-scope="props">
        <b-table-column field="title" label="Title">
          {{ props.row.title }}
        </b-table-column>
        <b-table-column field="type" label="Type">
          {{ props.row.type }}
        </b-table-column>
        <b-table-column field="stakes" label="Stakes">{{ props.row.stakes }}</b-table-column>
        <b-table-column field="winnings" label="Winnings">{{ props.row.winnings }}</b-table-column>
        <b-table-column field="profits" label="Profits">{{ props.row.profits }}</b-table-column>
        <b-table-column field="date_placed" label="Date Placed">
          {{ props.row.date_placed }}
        </b-table-column>
        <b-table-column field="actions" label="">
          <a @click="editBet({...props.row})">Edit</a>  |
          <a @click="deleteBet(props.row.bet_id, props.row.type)">Delete</a>
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>

export default {
  name: 'BetsTable',
  props: {
    perPage: String,
    isPaginated: Boolean,
    // betData: Array,
  },
  data() {
    return {
      betToEdit: {},
      isModalActive: false,
      columns: [
        {
          field: 'title',
          label: 'Title',
          searchable: true,
        },
        {
          field: 'type',
          label: 'Type',
          searchable: true,
        },
        {
          field: 'stakes',
          label: 'Stakes',
          centered: true,
        },
        {
          field: 'winnings',
          label: 'Winnings',
        },
        {
          field: 'profits',
          label: 'Profits',
        },
        {
          field: 'date_placed',
          label: 'Date Placed',
        },
        {
          field: 'Actions',
          label: 'Actions',
        },
      ],
    };
  },
  methods: {
    deleteBet(id, betType) {
      this.$http
        .post(`${process.env.VUE_APP_SERVER_URL}bets/deleteBet`, {
          id,
          betType,
        })
        .then(
          ((response) => {
            this.server_msg = response;
            this.successMsg('Deleted bet');
            this.$emit('update-bet-data');
          }),
        ).catch((error) => {
          this.server_msg = 'Server Error. Unable to delete bet';
          this.failureMsg(error);
        });
    },
    editBet(bet) {
      this.$emit('edit-bet-data', bet);
    },
    successMsg(msg) {
      this.$buefy.toast.open({
        duration: 3000,
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
  },
  computed: {
    betData() {
      return this.$store.state.betData.betData;
    },
  },
};
</script>
