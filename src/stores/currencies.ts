import { defineStore } from 'pinia'
import { client } from '@/utils/axios-instance'

export const useCurrenciesStore = defineStore('currencies', {
  state: () => ({
    from: 0,
    to: 0,
    currencies: {},
    isFetching: false,
  }),
  // const doubleCount = computed(() => count.value * 2)
  actions: {
    async fetchCurrencies() {
      this.isFetching = true
      await client
        .get(`/currencies`, {
          params: {
            type: 'fiat',
          },
        })
        .then((response) => {
          this.currencies = response.data
        })
        .finally(() => {
          this.isFetching = false
        })
    },
    async fetchConversion() {
      this.isFetching = true
      await client
        .get(`/convert`, {
          params: {
            from: 'AFN',
            to: 'AFN',
            amount: 1,
          },
        })
        .then((response) => {
          this.currencies = response.data
        })
        .finally(() => {
          this.isFetching = false
        })
    },
  },
})
