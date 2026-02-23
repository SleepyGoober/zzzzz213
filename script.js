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

// Donation tracking variables
let currentDonationAmount = 4.69;
const goalAmount = 10000;

// Function to update the donation goal progress with animation
function updateDonationProgress(currentAmount) {
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    
    const percentage = (currentAmount / goalAmount) * 100;
    
    // Force animation by resetting height, then updating it
    progressBar.style.transition = 'none';
    progressBar.style.height = '0%';
    
    // Trigger reflow to ensure the animation restarts
    void progressBar.offsetHeight;
    
    progressBar.style.transition = 'height 0.5s';
    progressBar.style.height = `${percentage}%`;
    progressText.textContent = `$${currentAmount.toFixed(2)} / $${goalAmount}`;
}

// Function to add a new donation and animate the progress
function addDonation(donationAmount) {
    currentDonationAmount += donationAmount;
    updateDonationProgress(currentDonationAmount);
    console.log(`Donation added! New total: $${currentDonationAmount.toFixed(2)}`);
}

// Initialize the progress bar with current amount
updateDonationProgress(currentDonationAmount);