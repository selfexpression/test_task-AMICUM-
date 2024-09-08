<template>
  <div id="app" :class="theme">
    <DashboardOverview />
    <QuickAccess />
  </div>
</template>

<script>
import DashboardOverview from './components/DashboardOverview.vue'
import QuickAccess from './components/QuickAccess.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    QuickAccess,
    DashboardOverview,
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
    }),
  },
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  margin: 0;
  color: #f2f2f2;
}

#app {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;

  &.light {
    background-color: #ffffff;
  }

  &.dark {
    background-color: #56698f;
  }
}
</style>
