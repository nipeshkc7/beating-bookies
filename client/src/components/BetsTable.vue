<template>
  <section>
    <b-table :data="betData" :columns="columns" :per-page="perPage" :paginated="isPaginated">
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
      ],
    };
  },
};
</script>
