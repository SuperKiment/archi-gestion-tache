import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../Footer.vue'

describe('Footer Component', () => {
  it('se rend correctement', () => {
    const wrapper = mount(Footer)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
  })
  
  it('contient le texte de copyright', () => {
    const wrapper = mount(Footer)
    const currentYear = new Date().getFullYear()
    expect(wrapper.text()).toContain(`© ${currentYear}`)
  })
}) 