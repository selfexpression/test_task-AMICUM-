<template>
  <div id="app" :class="theme">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
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
  height: 100%;

  &.light {
    background-color: #ffffff;
  }

  &.dark {
    background-color: #56698f;
  }
}

a {
  text-decoration: none;
  color: currentColor;
}
</style>
