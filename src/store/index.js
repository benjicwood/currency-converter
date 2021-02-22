import { createStore } from 'vuex'

import axios from 'axios'

export default createStore({
  state: {
    selectedCurrency: null,
    selectedCurrencyExchangeRates: null,
    comparedCurrency: null,
    history: [],
  },

  mutations: {
    getSelectedCurrencyExchangeRates(state, currencyRates) {
      state.selectedCurrencyExchangeRates = currencyRates
      // state.currencyList = Object.keys(currencyRates)
    },
    setSelectedCurrency(state, currency) {
      state.selectedCurrency = currency
    },
    setComparedCurrency(state, currency) {
      console.log(state.history)
      state.comparedCurrency = state.selectedCurrencyExchangeRates[currency]
      state.history.push(`${state.selectedCurrency} converted to ${state.comparedCurrency.name}`)

    }
  },

  actions: {
    getSelectedCurrencyExchangeRates({ commit }, currency) {
      commit('setSelectedCurrency', currency)
      axios(`http://www.floatrates.com/daily/${currency}.json`).then(response => commit('getSelectedCurrencyExchangeRates', response.data))
    },
    setComparedCurrency({ commit }, currency) {
      commit('setComparedCurrency', currency)
    }
  },

  getters: {
    getHistory: state => state.history
  },

  modules: {}
})
