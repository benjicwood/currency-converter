import { createStore } from 'vuex'
import axios from 'axios'

import { HistoryModule } from '@/store/History'

export default createStore({
  state: {
    selectedCurrency: null,
    selectedCurrencyValue: '1.00',
    selectedCurrencyExchangeRates: null,
    comparedCurrency: null,
    comparedCurrencyValue: null,
    comparedCurrencyExchangeRates: null,
  },

  mutations: {
    getSelectedCurrencyExchangeRates(state, currencyRates) {
      state.selectedCurrencyExchangeRates = currencyRates
      state.comparedCurrency = Object.values(state.selectedCurrencyExchangeRates)[0]
      state.comparedCurrencyValue = parseFloat(state.comparedCurrency.rate * state.selectedCurrencyValue).toFixed(2)
      state.currencyList = Object.keys(currencyRates)
    },
    setSelectedCurrency(state, currency) {
      state.selectedCurrency = currency
    },
    setComparedCurrency(state, currency) {
      state.comparedCurrency = state.selectedCurrencyExchangeRates[currency]
      state.comparedCurrencyValue = parseFloat(state.comparedCurrency.rate * state.selectedCurrencyValue).toFixed(2)
    },
    setComparedCurrencyValue(state, value) {
      state.comparedCurrencyValue = value
      state.selectedCurrencyValue = parseFloat(state.comparedCurrency.inverseRate * state.comparedCurrencyValue).toFixed(2)
    },
    setSelectedCurrencyValue(state, value) {
      state.selectedCurrencyValue = parseFloat(value).toFixed(2)
      state.comparedCurrencyValue = parseFloat(state.comparedCurrency.rate * value).toFixed(2)
    },
  },

  actions: {
    getSelectedCurrencyExchangeRates({ commit }, currency) {
      commit('setSelectedCurrency', currency)
      axios(`http://www.floatrates.com/daily/${currency}.json`).then(response => commit('getSelectedCurrencyExchangeRates', response.data))
    },
    getComparedCurrencyExchangeRates({ commit }, currency) {
      axios(`http://www.floatrates.com/daily/${currency}.json`).then(response => commit('getComparedCurrencyExchangeRates', response.data))
    },
    setComparedCurrency({ commit }, currency) {
      commit('setComparedCurrency', currency)
    },
    setComparedCurrencyValue({ commit }, value) {
      commit('setComparedCurrencyValue', value)
    },
    setSelectedCurrencyValue({ commit }, value) {
      commit('setSelectedCurrencyValue', value)
    },
  },

  modules: {
    History: HistoryModule,
  }
})
