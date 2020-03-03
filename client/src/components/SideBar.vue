<template>
    <div class="sideB">
        <b-menu>
            <b-menu-list>
                <b-menu-item icon="view-dashboard" label="Dashboard"></b-menu-item>
                <b-menu-item icon="plus" label="Add Bet(s)"></b-menu-item>
                <b-menu-item icon="format-list-checkbox" label="View your bets"></b-menu-item>
                <b-menu-item icon="wrench" active="true">
                <template slot="label" slot-scope="props">
                    Toolset
                    <b-icon class="is-pulled-right"
                    :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item icon="calculator" label="D2W Calculator"></b-menu-item>
                <b-menu-item icon="calculator" label="D3W Calculator"></b-menu-item>
                <b-menu-item icon="calculator" label="Back/Lay Calculator"></b-menu-item>
                </b-menu-item>
                <b-menu-item icon="account" label="My Account">
                <b-menu-item label="Edit account details"></b-menu-item>
                <b-menu-item label="Delete account"></b-menu-item>
                </b-menu-item>
                <b-menu-item icon="chart-bar" label="View Stats"></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions">
                <b-menu-item label="Logout"></b-menu-item>
            </b-menu-list>
        </b-menu>
    </div>
</template>

<script>
export default {
  name: 'SideBar',
  methods: {
    openNav() {
      document.getElementById('mySidenav').style.width = '250px';
    },
    closeNav() {
      document.getElementById('mySidenav').style.width = '90px';
    },
  },
};
</script>

<style scoped>
    .sideB {
        padding: 10px;
    }
</style>
