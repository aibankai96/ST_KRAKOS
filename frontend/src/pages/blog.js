import { generateContent } from '../api/client.js'
import { updateSEO } from '../utils/seo.js'
import { addSocialShareButtons } from '../utils/social.js'

let articles = JSON.parse(localStorage.getItem('blogArticles') || '[]')

export function renderBlog(container) {
    updateSEO(
        'Blog ST KRAKOS - Artykuły o AI i technologii',
        'Czytaj najnowsze artykuły o sztucznej inteligencji, automatyzacji i nowoczesnych technologiach',
        'blog, AI, artykuły, technologia'
    )
    container.innerHTML = `
        <section class="blog-page">
            <div class="container">
                <div class="blog-header">
                    <h1>Blog ST KRAKOS</h1>
                    <button class="ai-generate-btn" id="generate-article-btn">✨ Wygeneruj artykuł przez AI</button>
                </div>
                
                <div class="article-generator" id="article-generator" style="display: none;">
                    <h2>Generator Artykułów AI</h2>
                    <form id="article-form">
                        <div class="form-group">
                            <label for="article-title">Tytuł artykułu</label>
                            <input type="text" id="article-title" name="title" placeholder="np. Przyszłość AI w biznesie" required>
                        </div>
                        <div class="form-group">
                            <label for="article-topic">Temat artykułu</label>
                            <textarea id="article-topic" name="topic" rows="4" placeholder="Opisz temat artykułu, który chcesz wygenerować..." required></textarea>
                        </div>
                        <button type="submit" class="generate-btn">Wygeneruj artykuł</button>
                    </form>
                </div>
                
                <div class="articles-grid" id="articles-grid">
                    ${renderArticles()}
                </div>
            </div>
        </section>
    `
    
    setupBlogHandlers()
}

function renderArticles() {
    if (articles.length === 0) {
        return '<div class="no-articles"><p>Brak artykułów. Wygeneruj pierwszy artykuł przez AI!</p></div>'
    }
    
    return articles.map((article, index) => `
        <article class="article-card" data-id="${article.id}">
            <div class="article-header">
                <h2>${escapeHtml(article.title)}</h2>
                <span class="article-date">${formatDate(article.createdAt)}</span>
            </div>
            <div class="article-content">${truncateText(article.content, 200)}</div>
            <button class="read-more-btn" data-id="${article.id}">Czytaj więcej</button>
        </article>
    `).join('')
}

function setupBlogHandlers() {
    const generateBtn = document.getElementById('generate-article-btn')
    const generator = document.getElementById('article-generator')
    const form = document.getElementById('article-form')
    
    generateBtn?.addEventListener('click', () => {
        generator.style.display = generator.style.display === 'none' ? 'block' : 'none'
    })
    
    form?.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        const title = formData.get('title')
        const topic = formData.get('topic')
        
        const submitBtn = form.querySelector('.generate-btn')
        submitBtn.disabled = true
        submitBtn.textContent = 'Generowanie...'
        
        try {
            const prompt = `Napisz artykuł na temat: ${topic}. Artykuł powinien być profesjonalny, zawierać około 500-800 słów, być podzielony na akapity i zawierać praktyczne informacje.`
            const result = await generateContent(prompt)
            
            if (result.success && result.content) {
                const newArticle = {
                    id: Date.now(),
                    title: title,
                    content: result.content,
                    createdAt: new Date().toISOString()
                }
                articles.unshift(newArticle)
                localStorage.setItem('blogArticles', JSON.stringify(articles))
                
                const grid = document.getElementById('articles-grid')
                grid.innerHTML = renderArticles()
                setupArticleClickHandlers()
                
                form.reset()
                generator.style.display = 'none'
                alert('Artykuł został wygenerowany i zapisany!')
            } else {
                throw new Error('Błąd generowania artykułu')
            }
        } catch (error) {
            alert('Błąd generowania artykułu: ' + error.message)
        } finally {
            submitBtn.disabled = false
            submitBtn.textContent = 'Wygeneruj artykuł'
        }
    })
    
    setupArticleClickHandlers()
}

function setupArticleClickHandlers() {
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const articleId = parseInt(e.target.getAttribute('data-id'))
            showArticle(articleId)
        })
    })
}

function showArticle(articleId) {
    const article = articles.find(a => a.id === articleId)
    if (!article) return
    
    updateSEO(
        `${article.title} - Blog ST KRAKOS`,
        article.content.substring(0, 160),
        'blog, artykuł, AI'
    )
    
    const container = document.getElementById('content')
    container.innerHTML = `
        <section class="article-page">
            <div class="container">
                <button class="back-btn" onclick="window.history.back()">← Powrót</button>
                <article class="full-article">
                    <h1>${escapeHtml(article.title)}</h1>
                    <div class="article-meta">
                        <span>Opublikowano: ${formatDate(article.createdAt)}</span>
                    </div>
                    <div class="article-body">${formatArticleContent(article.content)}</div>
                    <div id="social-share-container"></div>
                </article>
            </div>
        </section>
    `
    
    const shareContainer = document.getElementById('social-share-container')
    if (shareContainer) {
        addSocialShareButtons(shareContainer, window.location.href, article.title)
    }
}

function formatArticleContent(content) {
    return content.split('\n\n').map(para => {
        if (para.trim()) {
            return `<p>${escapeHtml(para.trim())}</p>`
        }
        return ''
    }).join('')
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return escapeHtml(text)
    return escapeHtml(text.substring(0, maxLength)) + '...'
}

function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

function escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}

