import { generatePage, generateContent } from '../api/client.js'

export function renderAdmin(container) {
    container.innerHTML = `
        <section class="admin-panel">
            <div class="container">
                <h1>Panel Generowania Stron AI</h1>
                <p class="admin-intro">Wygeneruj nową stronę internetową używając sztucznej inteligencji</p>
                
                <div class="admin-wrapper">
                    <div class="generator-form">
                        <h2>Generator Stron</h2>
                        <form id="page-generator-form">
                            <div class="form-group">
                                <label for="page-title">Tytuł strony</label>
                                <input type="text" id="page-title" name="title" placeholder="np. Oferta specjalna" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="page-type">Typ strony</label>
                                <select id="page-type" name="pageType" required>
                                    <option value="landing">Landing Page</option>
                                    <option value="about">O nas</option>
                                    <option value="product">Produkt/Usługa</option>
                                    <option value="blog">Blog/Artykuł</option>
                                    <option value="contact">Kontakt</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="ai-prompt">Prompt dla AI</label>
                                <textarea id="ai-prompt" name="prompt" rows="6" placeholder="Opisz, jaką stronę chcesz wygenerować. Np: 'Stwórz landing page dla firmy oferującej usługi AI z sekcją hero, o firmie, usługach i kontakcie'" required></textarea>
                                <small>Im bardziej szczegółowy prompt, tym lepszy wynik</small>
                            </div>
                            
                            <button type="submit" class="generate-btn" id="generate-btn">
                                <span class="btn-text">✨ Wygeneruj stronę</span>
                                <span class="btn-loading" style="display: none;">Generowanie...</span>
                            </button>
                        </form>
                    </div>
                    
                    <div class="preview-section">
                        <h2>Podgląd</h2>
                        <div id="preview-container" class="preview-container">
                            <div class="preview-placeholder">
                                <p>Wygenerowana strona pojawi się tutaj</p>
                            </div>
                        </div>
                        
                        <div class="preview-actions" id="preview-actions" style="display: none;">
                            <button class="action-btn save-btn" id="save-page">💾 Zapisz stronę</button>
                            <button class="action-btn edit-btn" id="edit-page">✏️ Edytuj</button>
                            <button class="action-btn download-btn" id="download-page">📥 Pobierz HTML</button>
                        </div>
                    </div>
                </div>
                
                <div class="editor-section" id="editor-section" style="display: none;">
                    <h2>Edytor treści</h2>
                    <div class="editor-wrapper">
                        <textarea id="content-editor" class="content-editor" rows="20"></textarea>
                        <div class="editor-actions">
                            <button class="action-btn save-btn" id="save-edited">💾 Zapisz zmiany</button>
                            <button class="action-btn cancel-btn" id="cancel-edit">❌ Anuluj</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
    
    setupGenerator()
}

let currentGeneratedHTML = ''

function setupGenerator() {
    const form = document.getElementById('page-generator-form')
    const generateBtn = document.getElementById('generate-btn')
    const previewContainer = document.getElementById('preview-container')
    const previewActions = document.getElementById('preview-actions')
    const editorSection = document.getElementById('editor-section')
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        const title = formData.get('title')
        const pageType = formData.get('pageType')
        const prompt = formData.get('prompt')
        
        generateBtn.disabled = true
        generateBtn.querySelector('.btn-text').style.display = 'none'
        generateBtn.querySelector('.btn-loading').style.display = 'inline'
        
        previewContainer.innerHTML = '<div class="loading-state">🔄 Generowanie strony przez AI...</div>'
        previewActions.style.display = 'none'
        
        try {
            const result = await generatePage(prompt, pageType)
            if (result.html) {
                currentGeneratedHTML = result.html
                const iframe = document.createElement('iframe')
                iframe.id = 'preview-iframe'
                iframe.style.width = '100%'
                iframe.style.height = '600px'
                iframe.style.border = 'none'
                iframe.srcdoc = result.html
                previewContainer.innerHTML = ''
                previewContainer.appendChild(iframe)
                previewActions.style.display = 'flex'
            } else {
                throw new Error('Brak HTML w odpowiedzi')
            }
        } catch (error) {
            previewContainer.innerHTML = `
                <div class="error-state">
                    <p>❌ Błąd generowania strony</p>
                    <p>${error.message}</p>
                </div>
            `
        } finally {
            generateBtn.disabled = false
            generateBtn.querySelector('.btn-text').style.display = 'inline'
            generateBtn.querySelector('.btn-loading').style.display = 'none'
        }
    })
    
    document.getElementById('save-page').addEventListener('click', () => {
        if (currentGeneratedHTML) {
            savePageToStorage(currentGeneratedHTML)
            alert('Strona została zapisana!')
        }
    })
    
    document.getElementById('edit-page').addEventListener('click', () => {
        if (currentGeneratedHTML) {
            const content = extractContentFromHTML(currentGeneratedHTML)
            document.getElementById('content-editor').value = content
            editorSection.style.display = 'block'
            editorSection.scrollIntoView({ behavior: 'smooth' })
        }
    })
    
    document.getElementById('download-page').addEventListener('click', () => {
        if (currentGeneratedHTML) {
            downloadHTML(currentGeneratedHTML)
        }
    })
    
    document.getElementById('save-edited').addEventListener('click', () => {
        const editedContent = document.getElementById('content-editor').value
        const updatedHTML = updateHTMLContent(currentGeneratedHTML, editedContent)
        currentGeneratedHTML = updatedHTML
        const iframe = document.createElement('iframe')
        iframe.id = 'preview-iframe'
        iframe.style.width = '100%'
        iframe.style.height = '600px'
        iframe.style.border = 'none'
        iframe.srcdoc = updatedHTML
        previewContainer.innerHTML = ''
        previewContainer.appendChild(iframe)
        editorSection.style.display = 'none'
        alert('Zmiany zostały zapisane!')
    })
    
    document.getElementById('cancel-edit').addEventListener('click', () => {
        editorSection.style.display = 'none'
    })
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }
    return text.replace(/[&<>"']/g, m => map[m])
}

function extractContentFromHTML(html) {
    try {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const body = doc.body
        if (body) {
            return body.innerHTML
        }
        return ''
    } catch (e) {
        return html
    }
}

function updateHTMLContent(html, newContent) {
    try {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        if (doc.body) {
            doc.body.innerHTML = newContent
        }
        return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML
    } catch (e) {
        return html
    }
}

function savePageToStorage(html) {
    const pages = JSON.parse(localStorage.getItem('generatedPages') || '[]')
    const newPage = {
        id: Date.now(),
        html: html,
        title: document.getElementById('page-title').value,
        createdAt: new Date().toISOString()
    }
    pages.push(newPage)
    localStorage.setItem('generatedPages', JSON.stringify(pages))
}

function downloadHTML(html) {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `strona-${Date.now()}.html`
    a.click()
    URL.revokeObjectURL(url)
}

