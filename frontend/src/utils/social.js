const shareUrls = {
    facebook: (url, text) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
    twitter: (url, text) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    linkedin: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
}

export const shareOnFacebook = (url, text) => window.open(shareUrls.facebook(url, text), '_blank', 'width=600,height=400')
export const shareOnTwitter = (url, text) => window.open(shareUrls.twitter(url, text), '_blank', 'width=600,height=400')
export const shareOnLinkedIn = (url) => window.open(shareUrls.linkedin(url), '_blank', 'width=600,height=400')

export const addSocialShareButtons = (container, url, text) => {
    container.innerHTML = `<div class="social-share">
        <span>Udostępnij:</span>
        <button class="social-btn facebook" data-platform="facebook">Facebook</button>
        <button class="social-btn twitter" data-platform="twitter">Twitter</button>
        <button class="social-btn linkedin" data-platform="linkedin">LinkedIn</button>
    </div>`
    const handlers = { facebook: () => shareOnFacebook(url, text), twitter: () => shareOnTwitter(url, text), linkedin: () => shareOnLinkedIn(url) }
    container.querySelectorAll('.social-btn').forEach(btn => btn.addEventListener('click', () => handlers[btn.getAttribute('data-platform')]?.()))
}

