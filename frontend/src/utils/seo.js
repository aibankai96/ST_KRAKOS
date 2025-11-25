export function updateSEO(title, description, keywords = '') {
    document.title = title || 'ST KRAKOS - Strona Firmowa'
    
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.name = 'description'
        document.head.appendChild(metaDescription)
    }
    metaDescription.content = description || 'ST KRAKOS - Innowacyjne rozwiązania z wykorzystaniem sztucznej inteligencji'
    
    if (keywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]')
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta')
            metaKeywords.name = 'keywords'
            document.head.appendChild(metaKeywords)
        }
        metaKeywords.content = keywords
    }
    
    updateOGTags(title, description)
}

function updateOGTags(title, description) {
    const ogTitle = getOrCreateMeta('property', 'og:title')
    const ogDescription = getOrCreateMeta('property', 'og:description')
    const ogUrl = getOrCreateMeta('property', 'og:url')
    
    ogTitle.content = title || 'ST KRAKOS'
    ogDescription.content = description || 'Innowacyjne rozwiązania z wykorzystaniem AI'
    ogUrl.content = window.location.href
}

function getOrCreateMeta(attr, value) {
    let meta = document.querySelector(`meta[${attr}="${value}"]`)
    if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attr, value)
        document.head.appendChild(meta)
    }
    return meta
}

export function addStructuredData(data) {
    let script = document.querySelector('script[type="application/ld+json"]')
    if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(data)
}

