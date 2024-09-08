<template>
  <div class="home-page">
    <DashboardOverview />
    <QuickAccess />
  </div>
</template>

<script>
import DashboardOverview from './DashboardOverview.vue'
import QuickAccess from './QuickAccess.vue'

export default {
  components: {
    DashboardOverview,
    QuickAccess,
  },
}
</script>

<style scoped>
.home-page {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
}
</style>
