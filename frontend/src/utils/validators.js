const ERR_MSG = {
    name: 'Imię i nazwisko musi mieć 2-100 znaków',
    email: 'Podaj poprawny adres email',
    subject: 'Temat musi mieć 3-200 znaków',
    message: 'Wiadomość musi mieć 10-2000 znaków'
}
const LIMITS = {
    name: { min: 2, max: 100 },
    subject: { min: 3, max: 200 },
    message: { min: 10, max: 2000 }
}
const lengthCheck = (v, min, max, err) => {
    const t = v.trim()
    return (t.length >= min && t.length <= max) ? true : err
}
export const validators = {
    name: (v) => lengthCheck(v, LIMITS.name.min, LIMITS.name.max, ERR_MSG.name),
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? true : ERR_MSG.email,
    subject: (v) => lengthCheck(v, LIMITS.subject.min, LIMITS.subject.max, ERR_MSG.subject),
    message: (v) => lengthCheck(v, LIMITS.message.min, LIMITS.message.max, ERR_MSG.message)
}
export const validateField = (input, validator) => {
    const result = validator(input.value)
    return result === true ? (clearError(input), true) : (showError(input, result), false)
}
export const showError = (input, message) => {
    clearError(input)
    input.classList.add('error')
    input.parentNode.appendChild(Object.assign(document.createElement('div'), { className: 'field-error', textContent: message }))
}
export const clearError = (input) => {
    input.classList.remove('error')
    input.parentNode.querySelector('.field-error')?.remove()
}
export const clearValidationErrors = () => {
    document.querySelectorAll('.field-error, .error').forEach(el => el.remove() || el.classList.remove('error'))
}
