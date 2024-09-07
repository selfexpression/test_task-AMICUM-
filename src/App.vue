<template>
  <div id="app">
    <DashboardOverview />
    <QuickAccess />
  </div>
</template>

<script>
import DashboardOverview from './components/DashboardOverview.vue'
import QuickAccess from './components/QuickAccess.vue'

export default {
  name: 'App',
  components: {
    QuickAccess,
    DashboardOverview,
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  margin: 0;
}

#app {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
}
</style>
