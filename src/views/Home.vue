<template>
  <div class="home">

    <input type="text" v-model="$store.state.selectedCurrencyValue" @change="onChangeSelectedCurrencyValue($event)">

    <select @change="onChangeSelectedCurrency($event)">
      <option selected>{{ selectedCurrency.name }}</option>
      <option v-for="(currency, index) in $store.state.selectedCurrencyExchangeRates" :key="index" :value="currency.code">{{currency.name}}</option>
    </select>

    <p>=</p>

    <input type="text" v-model="$store.state.comparedCurrencyValue" @change="onChangeComparedCurrencyValue($event)">
    
    <select @change="onChangeComparedCurrency($event)">
      <option v-for="(currency, index) in $store.state.selectedCurrencyExchangeRates" :key="index" :value="currency.code">{{currency.name}}</option>
    </select>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      selectedCurrency: {
        code: 'gbp',
        name: 'U.K. Pound Sterling',
      },
      comparedCurency: 'usd',
    }
  },
  methods: {
    getSelectedCurrencyExchangeRates() {
      this.$store.dispatch('getSelectedCurrencyExchangeRates', this.selectedCurrency.code)
    },

    onChangeSelectedCurrency(event) {
      this.selectedCurrency.code = event.target.value
      this.selectedCurrency.name = this.$store.state.selectedCurrencyExchangeRates[event.target.value.toLowerCase()].name

      this.$store.dispatch('getSelectedCurrencyExchangeRates', this.selectedCurrency.code)
    },

    onChangeSelectedCurrencyValue(event) {
      this.$store.dispatch('setSelectedCurrencyValue', event.target.value)
    },

    onChangeComparedCurrency(event) {
      let currencyCode = event.target.value.toLowerCase()
      this.$store.dispatch('setComparedCurrency', currencyCode)
    },

    onChangeComparedCurrencyValue(event) {
      this.$store.dispatch('setComparedCurrencyValue', event.target.value)
    },

  },
  mounted() {
    this.getSelectedCurrencyExchangeRates()
  }

}
</script>

<style lang="scss" scoped>
input {
  width: 100px;
  margin-right: 10px;
}
</style>
