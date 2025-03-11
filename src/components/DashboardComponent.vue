<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrenciesStore } from '@/stores/currencies'
import CurrencyComponent from './CurrencyComponent.vue'
const currenciesStore = useCurrenciesStore()
const { isError } = storeToRefs(currenciesStore)

onMounted(() => {
  useCurrenciesStore().fetchCurrencies()
})
</script>

<template>
  <h1>Currency converter</h1>
  <CurrencyComponent label="From" type="from" />
  <CurrencyComponent label="To" type="to" />
  <p v-if="isError">Oops, an error appeared. Try again.</p>
</template>
