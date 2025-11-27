import { validators, validateField, showError, clearError, clearValidationErrors } from '../src/utils/validators.js'

describe('Validators', () => {
    let input

    beforeEach(() => {
        input = document.createElement('input')
        input.type = 'text'
        document.body.appendChild(input)
    })

    afterEach(() => {
        document.body.removeChild(input)
    })

    test('validateField - name valid', () => {
        input.value = 'Jan Kowalski'
        expect(validateField(input, validators.name)).toBe(true)
    })

    test('validateField - name too short', () => {
        input.value = 'J'
        expect(validateField(input, validators.name)).toBe(false)
    })

    test('validateField - email valid', () => {
        input.value = 'test@example.com'
        expect(validateField(input, validators.email)).toBe(true)
    })

    test('validateField - email invalid', () => {
        input.value = 'invalid-email'
        expect(validateField(input, validators.email)).toBe(false)
    })

    test('showError adds error class and message', () => {
        showError(input, 'Test error')
        expect(input.classList.contains('error')).toBe(true)
        expect(input.parentNode.querySelector('.field-error')).toBeTruthy()
    })

    test('clearError removes error', () => {
        showError(input, 'Test error')
        clearError(input)
        expect(input.classList.contains('error')).toBe(false)
        expect(input.parentNode.querySelector('.field-error')).toBeFalsy()
    })
})
