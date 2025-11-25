export function shareOnFacebook(url, text) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
}

export function shareOnTwitter(url, text) {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
}

export function shareOnLinkedIn(url, text) {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
}

export function addSocialShareButtons(container, url, text) {
    container.innerHTML = `
        <div class="social-share">
            <span>Udostępnij:</span>
            <button class="social-btn facebook" data-platform="facebook">Facebook</button>
            <button class="social-btn twitter" data-platform="twitter">Twitter</button>
            <button class="social-btn linkedin" data-platform="linkedin">LinkedIn</button>
        </div>
    `
    
    container.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.getAttribute('data-platform')
            if (platform === 'facebook') {
                shareOnFacebook(url, text)
            } else if (platform === 'twitter') {
                shareOnTwitter(url, text)
            } else if (platform === 'linkedin') {
                shareOnLinkedIn(url, text)
            }
        })
    })
}

