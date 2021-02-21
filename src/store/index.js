import { createStore } from 'vuex'

import axios from 'axios'

export default createStore({
  state: {
    selectedCurrency: null,
    selectedCurrencyExchangeRates: null,
    currencyList: null,
    comparedCurrency: null,
  },

  mutations: {
    getSelectedCurrencyExchangeRates(state, currencyRates) {
      state.selectedCurrencyExchangeRates = currencyRates
      state.currencyList = Object.keys(currencyRates)
    },
    setSelectedCurrency(state, currency) {
      state.selectedCurrency = currency
    },
    setComparedCurrency(state, currency) {
      state.comparedCurrency = state.selectedCurrencyExchangeRates[currency]
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

  modules: {}
})
