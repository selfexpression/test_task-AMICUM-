import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    theme: 'dark',
    certification: {
      date: null,
      periodicity: 365,
    },
    testResults: {
      totalTests: null,
      completedTests: null,
    },
    preShiftTraining: null,
    briefing: null,
    currentDate: null,
    currentTime: null,
    timerId: null,
  },
  mutations: {
    setTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
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
    setInfoAboutTraining(state, payload) {
      const { certificationDate, testResults, preShiftTraining, briefing } =
        payload

      state.certification.date = certificationDate
      state.testResults = testResults
      state.preShiftTraining = preShiftTraining
      state.briefing = briefing
    },
  },
  getters: {
    daysLeft(state) {
      if (!state.certification.date) return

      const todayMs = new Date().getTime()
      const certificationDateMs = new Date(state.certification.date).getTime()
      const timeDiff = certificationDateMs - todayMs
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

      return daysLeft
    },

    testCompletionPercentage(state) {
      return (
        (state.testResults.completedTests / state.testResults.totalTests) * 100
      )
    },
    certificationDatePercentage(state, getters) {
      return (getters.daysLeft / state.certification.periodicity) * 100
    },
  },
  actions: {
    loadInfoAboutTraining({ commit }) {
      return new Promise(() => {
        setTimeout(() => {
          const payload = {
            certificationDate: '09/30/2024',
            testResults: {
              totalTests: 100,
              completedTests: 24,
            },
            preShiftTraining: true,
            briefing: false,
          }
          commit('setInfoAboutTraining', payload)
        }, 1000)
      })
    },
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
      }, 60000)

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
