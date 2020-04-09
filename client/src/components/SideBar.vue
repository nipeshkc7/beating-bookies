<template>
    <div class="sideB">
        <b-menu>
            <b-menu-list>
                <b-menu-item icon="view-dashboard" label="Dashboard"
                @click="$emit('view-dashboard')">
                </b-menu-item>
                <b-menu-item icon="plus" label="Add Bet(s)" @click="$emit('add-bet')">
                </b-menu-item>
                <b-menu-item icon="format-list-checkbox" label="View your bets"
                @click="$emit('view-bets')">
                </b-menu-item>
                <b-menu-item icon="wrench">
                <template slot="label" slot-scope="props">
                    Toolset
                    <b-icon class="is-pulled-right"
                    :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item icon="calculator" label="D2W Calculator" @click="$emit('calculators')">
                </b-menu-item>
                <b-menu-item icon="calculator" label="D3W Calculator" @click="$emit('calculators')">
                </b-menu-item>
                <b-menu-item icon="calculator" label="Back/Lay Calculator"
                @click="$emit('calculators')">
                </b-menu-item>
                </b-menu-item>
                <b-menu-item icon="account" label="My Account" @click="$router.push('/account')">
                <b-menu-item label="Edit account details" @click="$router.push('/account')">
                </b-menu-item>
                <b-menu-item label="Delete account" @click="$router.push('/account')"></b-menu-item>
                </b-menu-item>
                <b-menu-item icon="chart-bar" label="View Stats" @click="$emit('view-stats')">
                </b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions">
                <b-menu-item label="Logout" @click="logout"></b-menu-item>
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
    logout() {
      localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
    .sideB {
        padding: 10px;
    }
</style>
