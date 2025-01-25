// Function to copy cryptocurrency addresses to clipboard
function copyAddress(addressId) {
    const addressElement = document.getElementById(addressId);
    const addressText = addressElement.textContent;

    navigator.clipboard.writeText(addressText)
        .then(() => {
            alert(`Copied: ${addressText}`);
        })
        .catch(err => {
            console.error('Error copying to clipboard: ', err);
        });
}

// Function to open the information popup
function openPopup() {
    document.getElementById('info-popup').style.display = 'block';
}

// Function to close the information popup
function closePopup() {
    document.getElementById('info-popup').style.display = 'none';
}

// Event listener for closing the popup when clicking outside of it
window.onclick = function(event) {
    const popup = document.getElementById('info-popup');
    if (event.target === popup) {
        closePopup();
    }
};

// Optional: Add functionality to update the donation goal progress (mockup)
function updateDonationProgress(currentAmount, goalAmount) {
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    
    const percentage = (currentAmount / goalAmount) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `$${currentAmount} / $${goalAmount}`;
}

// Example of updating progress. You can call this function upon donation.
updateDonationProgress(0, 10000);