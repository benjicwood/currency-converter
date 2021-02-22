export const HistoryModule = {
  namespaced: true,

  state: {
    history: [],
  },

  mutations: {
    addConversionToHistory(state, value) {
      state.history.push({
        selectedCurrency: value.selectedCurrency,
        selectedCurrencyValue: value.selectedCurrencyValue,
        comparedCurrency: value.comparedCurrency.name,
        comparedCurrencyValue: value.comparedCurrencyValue
      })
    },
    deleteItemFromHistory(state, value) {
      state.history.splice(value, 1)
    },
  },

  actions: {
    addConversionToHistory({ commit }, state) {
      commit('addConversionToHistory', state)
    },
    deleteItemFromHistory({ commit }, value) {
      commit('deleteItemFromHistory', value)
    }
  },

  getters: {
    getHistory: state => state.history
  },

}