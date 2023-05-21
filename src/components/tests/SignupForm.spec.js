import { mount } from '@vue/test-utils'
import { jest, global, describe, it, expect } from '@jest/globals'
import SignUpForm from './SignUpForm.vue'

describe('SignUpForm', () => {
  it('should display error message when password is missing', async () => {
    const wrapper = mount(SignUpForm)

    await wrapper.find('#firstName').setValue('Thomas')
    await wrapper.find('#lastName').setValue('Shelby')
    await wrapper.find('#email').setValue('thomas@shelby.co.uk')

    await wrapper.find('.submit-button').trigger('click')

    expect(wrapper.find('.error-message').text()).toBe('Password is required.')
  })

  it('should display error message when password is less than 8 characters long', async () => {
    const wrapper = mount(SignUpForm)

    await wrapper.find('#firstName').setValue('Thomas')
    await wrapper.find('#lastName').setValue('Shelby')
    await wrapper.find('#email').setValue('thomas@shelby.co.uk')
    await wrapper.find('#password').setValue('abc')

    await wrapper.find('.submit-button').trigger('click')

    expect(wrapper.find('.error-message').text()).toBe(
      'Password must be at least 8 characters long.'
    )
  })

  it('should display error message when password does not contain both lowercase and uppercase letters', async () => {
    const wrapper = mount(SignUpForm)

    await wrapper.find('#firstName').setValue('Thomas')
    await wrapper.find('#lastName').setValue('Shelby')
    await wrapper.find('#email').setValue('thomas@shelby.co.uk')
    await wrapper.find('#password').setValue('password')

    await wrapper.find('.submit-button').trigger('click')

    expect(wrapper.find('.error-message').text()).toBe(
      'Password must contain both lowercase and uppercase letters.'
    )
  })

  it('should display error message when password contains first name or last name', async () => {
    const wrapper = mount(SignUpForm)

    await wrapper.find('#firstName').setValue('Thomas')
    await wrapper.find('#lastName').setValue('Shelby')
    await wrapper.find('#email').setValue('thomas@shelby.co.uk')
    await wrapper.find('#password').setValue('Shelby123')

    await wrapper.find('.submit-button').trigger('click')

    expect(wrapper.find('.error-message').text()).toBe(
      'Password should not contain your first or last name.'
    )
  })

  it('should display error message and handle server error', async () => {
    const wrapper = mount(SignUpForm)

    await wrapper.find('#firstName').setValue('Thomas')
    await wrapper.find('#lastName').setValue('Shelby')
    await wrapper.find('#email').setValue('thomas@shelby.co.uk')
    await wrapper.find('#password').setValue('Pa$$w0rd')

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false
      })
    )

    await wrapper.find('.submit-button').trigger('click')

    // Check if error message is displayed
    expect(wrapper.find('.signupError-message').exists()).toBe(true)
  })
})
