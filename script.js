function copyAddress(addressId) {
    const addressElement = document.getElementById(addressId);
    const card = addressElement.closest('.crypto-card');
    const feedback = card.querySelector('.copy-feedback');
    const button = card.querySelector('.copy-button');

    if (!navigator.clipboard || !navigator.clipboard.writeText) {
        feedback.textContent = 'Clipboard unavailable. Please copy the address manually.';
        return;
    }

    navigator.clipboard.writeText(addressElement.textContent.trim())
        .then(() => {
            feedback.textContent = 'Address copied to clipboard.';
            button.textContent = 'Copied';
            window.setTimeout(() => {
                button.textContent = 'Copy';
            }, 1800);
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
            feedback.textContent = 'Could not copy. Please try again or copy manually.';
        });
}

window.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;

    document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
}, { passive: true });
