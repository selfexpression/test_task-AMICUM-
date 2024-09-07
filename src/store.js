import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    theme: 'dark',
    certificationDate: '2024-12-31',
    testResults: {
      totalTests: 10,
      completedTests: 7,
    },
    preShiftTraining: null,
    briefing: null,
    currentDate: null,
    currentTime: null,
    timerId: null,
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme
    },
    setCurrentDate(state, date) {
      state.currentDate = date
    },
    setCurrentTime(state, time) {
      state.currentTime = time
    },
    setTimerId(state, timerId) {
      state.timerId = timerId
    },
  },
  getters: {
    daysLeft(state) {
      const today = new Date()
      const certificationDate = new Date(state.certificationDate)
      const timeDiff = certificationDate - today
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

      return daysLeft
    },

    testCompletionPercentage(state) {
      return (
        (state.testResults.completedTests / state.testResults.totalTests) * 100
      )
    },
  },
  actions: {
    updateCurrentDateAndTime({ commit }) {
      const today = new Date().toLocaleDateString()
      const time = new Date()
        .toLocaleTimeString()
        .split(':')
        .filter((_, index) => index !== 2)
        .join(':')

      commit('setCurrentDate', today)
      commit('setCurrentTime', time)
    },
    startTimer({ dispatch, commit }) {
      const timerId = setInterval(() => {
        dispatch('updateCurrentDateAndTime')
      }, 1000)

      commit('setTimerId', timerId)
    },
    stopTimer({ state, commit }) {
      if (state.timerId) {
        clearInterval(state.timerId)
        commit('setTimerId', null)
      }
    },
  },
})
