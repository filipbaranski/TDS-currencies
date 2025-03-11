import { ref } from 'vue'
import { defineStore } from 'pinia'
import { client } from '@/utils/axios-instance'

type CurrencyType = {
  short_code: string
}

export const useCurrenciesStore = defineStore('currencies', () => {
  const from = ref(0)
  const to = ref(0)
  const currencyFrom = ref({} as CurrencyType)
  const currencyTo = ref({} as CurrencyType)
  const currencies = ref({})
  const isFetching = ref(false)
  const isError = ref(false)

  const fetchCurrencies = async () => {
    isFetching.value = true
    await client
      .get(`/currencies`, {
        params: {
          type: 'fiat',
        },
      })
      .then((response) => {
        currencies.value = response.data.response
        from.value = 1
        currencyFrom.value = response.data['113']
        currencyTo.value = response.data['48']
        fetchConversion('')
      })
  }

  const fetchConversion = async (mode: string) => {
    const fromParam =
      mode !== 'reversed' ? currencyFrom.value.short_code : currencyTo.value.short_code
    const toParam =
      mode !== 'reversed' ? currencyTo.value.short_code : currencyFrom.value.short_code
    const amount = mode !== 'reversed' ? from.value : to.value
    isFetching.value = true
    isError.value = false
    await client
      .get(`/convert`, {
        params: { from: fromParam, to: toParam, amount },
      })
      .then((response) => {
        if (mode !== 'reversed') to.value = response.data.value.toFixed(2)
        if (mode === 'reversed') from.value = response.data.value.toFixed(2)
      })
      .catch((err) => {
        console.log({ err })
        isError.value = true
      })
      .finally(() => {
        isFetching.value = false
      })
  }

  return {
    from,
    to,
    currencyFrom,
    currencyTo,
    currencies,
    isFetching,
    isError,
    fetchCurrencies,
    fetchConversion,
  }
})
