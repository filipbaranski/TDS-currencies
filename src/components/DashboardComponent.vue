<script setup lang="ts">
import { onMounted } from 'vue'
import { useCurrenciesStore } from '@/stores/currencies'

onMounted(() => {
  useCurrenciesStore().fetchCurrencies()
  useCurrenciesStore().fetchConversion()
})
</script>

<template>
  <p>Test</p>
</template>
