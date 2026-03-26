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
let currentDonationAmount = 5; // Bray donated $5
const goalAmount = 1000;

// Leaderboard state
let leaderboard = [
    { name: 'Bray', amount: 5 },
    { name: 'unknown', amount: 0 },
    { name: 'unknown', amount: 0 },
    { name: 'unknown', amount: 0 },
    { name: 'unknown', amount: 0 }
];

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    container.innerHTML = '';
    leaderboard.forEach((entry, idx) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        item.innerHTML = `<p><strong>${idx + 1}. ${entry.name}</strong> - $${entry.amount.toFixed(2)}</p>`;
        container.appendChild(item);
    });
}

function updateDonationProgress(currentAmount, animate = true) {
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    const percentage = Math.min(100, (currentAmount / goalAmount) * 100);

    if (animate) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        void progressBar.offsetWidth;
        progressBar.style.transition = 'width 0.5s';
    } else {
        progressBar.style.transition = 'none';
    }

    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `$${currentAmount.toFixed(2)} / $${goalAmount.toLocaleString()}`;
}

function addDonation(donor, donationAmount) {
    donationAmount = Number(donationAmount);
    if (!donor || typeof donor !== 'string' || donor.trim() === '') donor = 'anonymous';
    if (Number.isNaN(donationAmount) || donationAmount <= 0) {
        alert('Please enter a valid donation amount greater than 0');
        return;
    }

    currentDonationAmount += donationAmount;
    updateDonationProgress(currentDonationAmount, true);

    const existing = leaderboard.find(item => item.name.toLowerCase() === donor.trim().toLowerCase());
    if (existing) {
        existing.amount += donationAmount;
    } else {
        leaderboard.push({ name: donor.trim(), amount: donationAmount });
    }

    leaderboard.sort((a, b) => b.amount - a.amount);
    leaderboard = leaderboard.slice(0, 5);
    if (leaderboard.length < 5) {
        while (leaderboard.length < 5) leaderboard.push({ name: 'unknown', amount: 0 });
    }

    renderLeaderboard();

    document.getElementById('donor-name').value = '';
    document.getElementById('donation-amount').value = '';
    console.log(`Donation added by ${donor}: $${donationAmount.toFixed(2)} (total: $${currentDonationAmount.toFixed(2)})`);
}

const donateButton = document.getElementById('donate-button');
if (donateButton) {
    donateButton.addEventListener('click', () => {
        const donorName = document.getElementById('donor-name').value;
        const donationAmount = document.getElementById('donation-amount').value;
        addDonation(donorName, donationAmount);
    });
}

renderLeaderboard();
updateDonationProgress(currentDonationAmount, false);