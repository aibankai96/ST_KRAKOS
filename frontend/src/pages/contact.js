export function renderContact(container) {
    container.innerHTML = `
        <section class="contact-page">
            <div class="container">
                <h1>Skontaktuj się z nami</h1>
                <p class="contact-intro">Masz pytania? Chcesz dowiedzieć się więcej o naszych usługach? Napisz do nas!</p>
                
                <div class="contact-wrapper">
                    <form id="contact-form" class="contact-form">
                        <div class="form-group">
                            <label for="name">Imię i nazwisko</label>
                            <input type="text" id="name" name="name" placeholder="Jan Kowalski" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="jan@example.com" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="subject">Temat</label>
                            <input type="text" id="subject" name="subject" placeholder="Temat wiadomości" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Wiadomość</label>
                            <textarea id="message" name="message" rows="6" placeholder="Twoja wiadomość..." required></textarea>
                        </div>
                        
                        <button type="submit" class="submit-btn">Wyślij wiadomość</button>
                        <div id="form-message" class="form-message"></div>
                    </form>
                    
                    <div class="contact-info">
                        <h2>Informacje kontaktowe</h2>
                        <div class="info-item">
                            <strong>Email:</strong>
                            <p>kontakt@stkrakos.pl</p>
                        </div>
                        <div class="info-item">
                            <strong>Telefon:</strong>
                            <p>+48 123 456 789</p>
                        </div>
                        <div class="info-item">
                            <strong>Adres:</strong>
                            <p>Kraków, Polska</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
    
    setupContactForm()
}

function setupContactForm() {
    const form = document.getElementById('contact-form')
    if (!form) return
    
    const nameInput = form.name
    const emailInput = form.email
    const subjectInput = form.subject
    const messageInput = form.message
    
    nameInput.addEventListener('blur', () => validateName(nameInput))
    emailInput.addEventListener('blur', () => validateEmail(emailInput))
    subjectInput.addEventListener('blur', () => validateSubject(subjectInput))
    messageInput.addEventListener('blur', () => validateMessage(messageInput))
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const isValid = 
            validateName(nameInput) &&
            validateEmail(emailInput) &&
            validateSubject(subjectInput) &&
            validateMessage(messageInput)
        
        if (!isValid) {
            return
        }
        
        const messageDiv = document.getElementById('form-message')
        const submitBtn = form.querySelector('.submit-btn')
        
        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim()
        }
        
        submitBtn.disabled = true
        submitBtn.textContent = 'Wysyłanie...'
        messageDiv.textContent = ''
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            messageDiv.textContent = 'Dziękujemy! Twoja wiadomość została wysłana.'
            messageDiv.className = 'form-message success'
            form.reset()
            clearValidationErrors()
        } catch (error) {
            messageDiv.textContent = 'Wystąpił błąd. Spróbuj ponownie.'
            messageDiv.className = 'form-message error'
        } finally {
            submitBtn.disabled = false
            submitBtn.textContent = 'Wyślij wiadomość'
        }
    })
}

function validateName(input) {
    const value = input.value.trim()
    if (value.length < 2) {
        showError(input, 'Imię i nazwisko musi mieć minimum 2 znaki')
        return false
    }
    if (value.length > 100) {
        showError(input, 'Imię i nazwisko nie może przekraczać 100 znaków')
        return false
    }
    clearError(input)
    return true
}

function validateEmail(input) {
    const value = input.value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
        showError(input, 'Podaj poprawny adres email')
        return false
    }
    clearError(input)
    return true
}

function validateSubject(input) {
    const value = input.value.trim()
    if (value.length < 3) {
        showError(input, 'Temat musi mieć minimum 3 znaki')
        return false
    }
    if (value.length > 200) {
        showError(input, 'Temat nie może przekraczać 200 znaków')
        return false
    }
    clearError(input)
    return true
}

function validateMessage(input) {
    const value = input.value.trim()
    if (value.length < 10) {
        showError(input, 'Wiadomość musi mieć minimum 10 znaków')
        return false
    }
    if (value.length > 2000) {
        showError(input, 'Wiadomość nie może przekraczać 2000 znaków')
        return false
    }
    clearError(input)
    return true
}

function showError(input, message) {
    clearError(input)
    input.classList.add('error')
    const errorDiv = document.createElement('div')
    errorDiv.className = 'field-error'
    errorDiv.textContent = message
    input.parentNode.appendChild(errorDiv)
}

function clearError(input) {
    input.classList.remove('error')
    const errorDiv = input.parentNode.querySelector('.field-error')
    if (errorDiv) {
        errorDiv.remove()
    }
}

function clearValidationErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.remove())
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'))
}
