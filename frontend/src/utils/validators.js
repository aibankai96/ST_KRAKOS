// Wspólny moduł walidacji formularzy - optymalizowany kod
export const validators = {
    name: (v) => { const t = v.trim(); return (t.length >= 2 && t.length <= 100) ? true : 'Imię i nazwisko musi mieć 2-100 znaków' },
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? true : 'Podaj poprawny adres email',
    subject: (v) => { const t = v.trim(); return (t.length >= 3 && t.length <= 200) ? true : 'Temat musi mieć 3-200 znaków' },
    message: (v) => { const t = v.trim(); return (t.length >= 10 && t.length <= 2000) ? true : 'Wiadomość musi mieć 10-2000 znaków' }
}

export function validateField(input, validator) {
    const result = validator(input.value)
    if (result === true) {
        clearError(input)
        return true
    }
    showError(input, result)
    return false
}

export function showError(input, message) {
    clearError(input)
    input.classList.add('error')
    const errorDiv = document.createElement('div')
    errorDiv.className = 'field-error'
    errorDiv.textContent = message
    input.parentNode.appendChild(errorDiv)
}

export function clearError(input) {
    input.classList.remove('error')
    input.parentNode.querySelector('.field-error')?.remove()
}

export function clearValidationErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.remove())
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'))
}

