import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DashboardComponent from '../DashboardComponent.vue'

import { useCurrenciesStore } from '@/stores/currencies'
import { createPinia } from 'pinia'

describe('Header', () => {
  const mockCurrenciesStore = useCurrenciesStore(createPinia())

  it('renders properly', () => {
    const wrapper = mount(DashboardComponent)
    expect(wrapper.text()).toContain('Currency converter')
  })
})
