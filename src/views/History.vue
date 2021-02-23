<template>
    <p class="sort-items-header">Sort By:</p>
    <div class="sort-items">
      <ul @click="sortBySourceCurrency">source currency</ul>
      <ul @click="sortByTargetCurrency">target currency</ul>
      <ul @click="sortByAmountToBeConverted">amount to be converted</ul>
      <ul @click="sortByConvertedAmount">converted amount</ul>
    </div>

  <div v-if="!conversions.length">
    <p>Your conversion history will be saved here</p>
  </div>
  <div v-else class="history-container">
    <HistoryItem v-for="(conversion, index) in conversions" :key="index" :conversion="conversion" :index="index" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import HistoryItem from "@/components/HistoryItem";

export default {
  name: "History",
  components: {
    HistoryItem,
  },
  computed: {
    ...mapGetters({ conversions: "History/getHistory" }),
  },
  methods: {
    sortBySourceCurrency() {
      this.conversions.sort((a, b) => (a.selectedCurrency > b.selectedCurrency) ? 1 : -1)
    },
    sortByTargetCurrency() {
      this.conversions.sort((a, b) => (a.comparedCurrency > b.comparedCurrency) ? 1 : -1)
    },
    sortByAmountToBeConverted() {
      this.conversions.sort((a, b) => b.selectedCurrencyValue - a.selectedCurrencyValue)

    },
    sortByConvertedAmount() {
      this.conversions.sort((a, b) => b.comparedCurrencyValue - a.comparedCurrencyValue)
    },
  }
};
</script>

<style lang="scss" scoped>
.history-container {
  border: 1px solid #2c3e50;
  border-radius: 5px;
  background-color: #42b983;
  padding: 5px;
}

.sort-items {
  display: flex;
  flex-direction: row;
  justify-content: center;
    ul {
    border: 1px solid #2c3e50;
    width: 20%;
    text-align: center;
    padding-left: 0;
      &:hover {
        font-weight: 600;
      }
    }
    &-header {
      margin-bottom: 0;
    }
}

.selected-sort-type {
  font-weight: 600;
}
</style>