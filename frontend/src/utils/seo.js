const DEFAULTS = {
    title: 'ST KRAKOS - Strona Firmowa',
    description: 'ST KRAKOS - Innowacyjne rozwiązania z wykorzystaniem sztucznej inteligencji',
    ogTitle: 'ST KRAKOS',
    ogDescription: 'Innowacyjne rozwiązania z wykorzystaniem AI'
}
const SELECTORS = {
    meta: (attr, value) => `meta[${attr}="${value}"]`,
    structuredData: 'script[type="application/ld+json"]'
}
const getOrCreateMeta = (attr, value) => {
    let meta = document.querySelector(SELECTORS.meta(attr, value))
    if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attr, value)
        document.head.appendChild(meta)
    }
    return meta
}
const updateOGTags = (title, description) => {
    getOrCreateMeta('property', 'og:title').content = title || DEFAULTS.ogTitle
    getOrCreateMeta('property', 'og:description').content = description || DEFAULTS.ogDescription
    getOrCreateMeta('property', 'og:url').content = window.location.href
}
export function updateSEO(title, description, keywords = '') {
    document.title = title || DEFAULTS.title
    getOrCreateMeta('name', 'description').content = description || DEFAULTS.description
    if (keywords) getOrCreateMeta('name', 'keywords').content = keywords
    updateOGTags(title, description)
}
export function addStructuredData(data) {
    const script = document.querySelector(SELECTORS.structuredData) || (() => {
        const s = Object.assign(document.createElement('script'), { type: 'application/ld+json' })
        document.head.appendChild(s)
        return s
    })()
    script.textContent = JSON.stringify(data)
}
