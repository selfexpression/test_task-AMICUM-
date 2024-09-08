<template>
  <div class="container">
    <DashboardOverview />
    <QuickAccess />
  </div>
</template>

<script>
import DashboardOverview from '@/components/DashboardOverview'
import QuickAccess from '@/components/QuickAccess'

export default {
  components: {
    DashboardOverview,
    QuickAccess,
  },
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
}
</style>
