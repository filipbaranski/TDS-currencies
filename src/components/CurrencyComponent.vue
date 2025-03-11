<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies'
import { storeToRefs } from 'pinia'
const props = defineProps(['label', 'type'])
const currenciesStore = useCurrenciesStore()
const { from, to, currencyFrom, currencyTo, currencies } = storeToRefs(currenciesStore)

const mode = props.type === 'from' ? '' : 'reversed'
const handleInputChange = (e) => {
  if (props.type === 'to') to.value = e.target.value
  if (props.type === 'from') from.value = e.target.value
  useCurrenciesStore().fetchConversion(mode)
}

const handleSelect = (e) => {
  const selectedCurrencyName = e.target.value
  const currenciesArray = Object.values(currencies.value)
  const newValue = currenciesArray.filter((item) => item.name === selectedCurrencyName)
  if (props.type === 'to') currencyTo.value = newValue[0]
  if (props.type === 'from') currencyFrom.value = newValue[0]
  useCurrenciesStore().fetchConversion()
}
</script>

<template>
  <div>
    <p>{{ props.label }}:</p>
    <section class="currency-container">
      <input
        class="currency-input"
        type="number"
        min="0"
        :value="props.type === 'from' ? from : to"
        @input="handleInputChange"
      />
      <select
        :value="props.type === 'from' ? currencyFrom.name : currencyTo.name"
        @change="handleSelect"
      >
        <option :id="currency.id" v-bind:key="currency.short_code" v-for="currency in currencies">
          {{ currency.name }}
        </option>
      </select>
    </section>
  </div>
</template>

<style lang="css" scoped>
.currency-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  height: 30px;
  border: 1px solid grey;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

select {
  border: none;
}

.currency-input {
  border: none;
  padding: 0 20px;
  width: 100%;
}
</style>
