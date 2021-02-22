<template>
  <div class="history">
        <div v-for="(joke, index) in conversions" :key="index">
        <h1>{{ index + 1 }}: {{ joke }}</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'History',
  computed: {
    ...mapGetters({ conversions: 'getHistory' })
  }
}
</script>