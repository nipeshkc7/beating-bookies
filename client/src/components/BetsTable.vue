<template>
  <section>
    <b-table :data="data" :columns="columns" :per-page="perPage" :paginated="isPaginated">
    </b-table>
    {{ betData }}
  </section>
</template>

<script>
export default {
  name: 'BetsTable',
  props: {
    perPage: String,
    isPaginated: Boolean,
  },
  created() {
    this.getBetData();
  },
  methods: {
    getBetData() {
      this.$http
        .get('http://localhost:4000/bets/getAll', {
          params: {
            user_id: JSON.parse(localStorage.getItem('user')).id,
          },
        })
        .then((response) => {
          this.betData = Array.from(response.data);
          console.log(this.betData);
        })
        .catch((error) => {
          if (error.response.status === 401) this.server_msg = 'Cannot get Bet data';
          else this.server_msg = 'Server Error . Please try again later';
        });
    },
  },
  data() {
    return {
      betData: [],
      data: [
        {
          id: 1,
          first_name: 'Jesse',
          last_name: 'Simmons',
          date: '2016-10-15 13:43:27',
          gender: 'Male',
        },
        {
          id: 2,
          first_name: 'John',
          last_name: 'Jacobs',
          date: '2016-12-15 06:00:53',
          gender: 'Male',
        },
        {
          id: 3,
          first_name: 'Tina',
          last_name: 'Gilbert',
          date: '2016-04-26 06:26:28',
          gender: 'Female',
        },
        {
          id: 4,
          first_name: 'Clarence',
          last_name: 'Flores',
          date: '2016-04-10 10:28:46',
          gender: 'Male',
        },
        {
          id: 5,
          first_name: 'Anne',
          last_name: 'Lee',
          date: '2016-12-06 14:38:38',
          gender: 'Female',
        },
        {
          id: 6,
          first_name: 'Anne',
          last_name: 'Lee',
          date: '2016-12-06 14:38:38',
          gender: 'Female',
        },
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '100',
          numeric: true,
          searchable: true,
        },
        {
          field: 'first_name',
          label: 'First Name',
          searchable: true,
        },
        {
          field: 'last_name',
          label: 'Last Name',
          searchable: true,
        },
        {
          field: 'date',
          label: 'Date',
          centered: true,
        },
        {
          field: 'gender',
          label: 'Gender',
        },
      ],
    };
  },
};
</script>
