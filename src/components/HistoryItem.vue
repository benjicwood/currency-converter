<template>
    <div class="history-item">
        <p>
          {{ `${ conversion.selectedCurrencyValue } ${ conversion.selectedCurrency } = ${ conversion.comparedCurrencyValue } ${ conversion.comparedCurrency }` }}
          <fa type="fas" icon="times-circle" class="delete-icon" @click="deleteHistoryItem(index)"></fa>
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'HistoryItem',
    props: {
        conversion: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        }
    },
    computed: {
    ...mapGetters({ conversions: 'getHistory' })
  },
  methods: {
    deleteHistoryItem(conversion) {
      this.$store.dispatch('History/deleteItemFromHistory', conversion)
    }
  }
}

</script>

<style lang="scss" scoped>
.history-item {
  border: 1px solid #2c3e50;
  border-radius: 5px;
  background-color: whitesmoke;
  margin: 10px 5px;
    &:hover {
      transform: scale(1.01, 1.01);
    }
}
.delete-icon {
  width: 25px;
  height: 25px;
  color: red;
  float: right;
  margin-right: 5px;
    &:hover {
      color: rgb(224, 3, 3);
    }
}
</style>