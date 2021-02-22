import { createStore } from 'vuex'

import axios from 'axios'

export default createStore({
  state: {
    selectedCurrency: null,
    selectedCurrencyValue: 1,
    selectedCurrencyExchangeRates: null,
    comparedCurrency: null,
    comparedCurrencyValue: null,
    comparedCurrencyExchangeRates: null,
    history: [],
  },

  mutations: {
    getSelectedCurrencyExchangeRates(state, currencyRates) {
      state.selectedCurrencyExchangeRates = currencyRates
      state.comparedCurrency = Object.values(state.selectedCurrencyExchangeRates)[0]
      state.comparedCurrencyValue = state.comparedCurrency.rate * state.selectedCurrencyValue
      state.currencyList = Object.keys(currencyRates)
    },
    setSelectedCurrency(state, currency) {
      state.selectedCurrency = currency
    },
    setComparedCurrency(state, currency) {
      state.comparedCurrency = state.selectedCurrencyExchangeRates[currency]
      state.comparedCurrencyValue = state.comparedCurrency.rate / state.selectedCurrencyValue
      state.history.push(`${state.selectedCurrencyValue} ${state.selectedCurrency} converted to ${state.comparedCurrencyValue} ${state.comparedCurrency.name}`)
    },
    setComparedCurrencyValue(state, value) {
      state.comparedCurrencyValue = value
      state.selectedCurrencyValue = state.comparedCurrency.inverseRate * state.comparedCurrencyValue
    },
    setSelectedCurrencyValue(state, value) {
      state.selectedCurrencyValue = value
      state.comparedCurrencyValue = state.comparedCurrency.rate * value
    }
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
    }
  },

  getters: {
    getHistory: state => state.history
  },

  modules: {}
})
