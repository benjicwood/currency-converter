<template>
  <div class="home">
      <p>{{ selectedCurrencyValue }} {{ selectedCurrency }}</p>
      <p v-if="$store.state.comparedCurrency"> equals {{ ($store.state.comparedCurrency.rate * selectedCurrencyValue).toFixed(2) }} {{ $store.state.comparedCurrency.name }}</p>
          <input type="text" v-model="selectedCurrencyValue" @change="onChangeSelectedCurrencyValue($event)">
              <!-- <select v-model="selectedCurrency" @change="onChangeCurrency($event)">
                <option v-for="(currency, idx) in $store.state.allCurrencies" :key="idx" :value="currency">{{currency}}</option>
              </select> -->
              <select @change="onChangeComparedCurrency($event)">
                <!-- <option value="selectedCurrency">{{selectedCurrency}}</option> -->
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
      selectedCurrency: 'gbp',
      selectedCurrencyValue: 1,
    }
  },
  methods: {
    getSelectedCurrencyExchangeRates() {
      this.$store.dispatch('getSelectedCurrencyExchangeRates', this.selectedCurrency)
    },
    onChangeSelectedCurrencyValue(event) {
      this.selectedCurrencyValue = event.target.value;
    },
    onChangeComparedCurrency(event) {
      let currencyCode = event.target.value.toLowerCase()
      this.$store.dispatch('setComparedCurrency', currencyCode)
    }
  },
  mounted() {
    this.getSelectedCurrencyExchangeRates()
  }

}
</script>

<style lang="scss" scoped>
input {
  width: 40px;
  margin-right: 10px;
}
</style>
