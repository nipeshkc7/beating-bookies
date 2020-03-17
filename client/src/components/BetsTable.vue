<template>
  <section>
    <b-table :data="betData" :per-page="perPage" :paginated="isPaginated">
      <template slot-scope="props">
        <b-table-column field="title" label="Title">
          {{ props.row.title }}
        </b-table-column>
        <b-table-column field="type" label="Type">{{ props.row.type }}</b-table-column>
        <b-table-column field="stakes" label="Stakes">{{ props.row.stakes }}</b-table-column>
        <b-table-column field="winnings" label="Winnings">{{ props.row.winnings }}</b-table-column>
        <b-table-column field="profits" label="Profits">{{ props.row.profits }}</b-table-column>
        <b-table-column field="date_placed" label="Date Placed">
          {{ props.row.date_placed }}
        </b-table-column>
        <b-table-column field="actions" label="">
          <a href="#">Edit</a>  |
          <a href="#">Delete</a>
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
    betData: Array,
  },
  data() {
    return {
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
};
</script>
