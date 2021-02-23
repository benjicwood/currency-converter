<template>

  <div class="home">

    <input type="number" v-model="$store.state.selectedCurrencyValue" @change="onChangeSelectedCurrencyValue($event)">

    <select @change="onChangeSelectedCurrency($event)">
      <option selected>{{ selectedCurrency.name }}</option>
      <option v-for="(currency, index) in $store.state.selectedCurrencyExchangeRates" :key="index" :value="currency.code">{{currency.name}}</option>
    </select>

    <div>
      <Spinner v-if="!$store.state.selectedCurrency || !$store.state.comparedCurrency" />
      <p v-else>=</p>
    </div>

    <input type="number" v-model="$store.state.comparedCurrencyValue" @change="onChangeComparedCurrencyValue($event)">
    
    <select @change="onChangeComparedCurrency($event)">
      <option v-for="(currency, index) in $store.state.selectedCurrencyExchangeRates" :key="index" :value="currency.code">{{currency.name}}</option>
    </select>

  </div>
</template>

<script>
import Spinner from '@/components/Spinner'

export default {
  name: 'Home',
  components: {
    Spinner
  },
  data() {
    return {
      selectedCurrency: {
        code: 'GBP',
        name: 'U.K. Pound Sterling',
      },
      comparedCurency: 'usd',
    }
  },
  methods: {
    getSelectedCurrencyExchangeRates() {
      this.$store.dispatch('getSelectedCurrencyExchangeRates', this.selectedCurrency.code.toLowerCase())
    },

    onChangeSelectedCurrency(event) {
      this.selectedCurrency.code = event.target.value
      this.selectedCurrency.name = this.$store.state.selectedCurrencyExchangeRates[event.target.value.toLowerCase()].name

      this.$store.dispatch('getSelectedCurrencyExchangeRates', this.selectedCurrency.code)
      this.$store.dispatch('History/addConversionToHistory', this.$store.state)
    },

    onChangeSelectedCurrencyValue(event) {
      this.$store.dispatch('setSelectedCurrencyValue', event.target.value)
      this.$store.dispatch('History/addConversionToHistory', this.$store.state)
    },

    onChangeComparedCurrency(event) {
      let currencyCode = event.target.value.toLowerCase()
      this.$store.dispatch('setComparedCurrency', currencyCode)
      this.$store.dispatch('History/addConversionToHistory', this.$store.state)
    },

    onChangeComparedCurrencyValue(event) {
      this.$store.dispatch('setComparedCurrencyValue', event.target.value)
      this.$store.dispatch('History/addConversionToHistory', this.$store.state)
    },

  },
  mounted() {
    // get and set initial values
    this.getSelectedCurrencyExchangeRates()
  }

}
</script>

<style lang="scss" scoped>
@mixin border {
  border: 2px solid #2c3e50;
  border-radius: 4px;
}

input[type=number] {
  @include border;
  width: 100px;
  height: 25px;
  margin-right: 10px;
}

select {
  @include border;
  height: 32px;
  width: 300px;
}


</style>
