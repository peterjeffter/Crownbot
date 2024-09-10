// Initialize variables
let balance = 0;
let miningSessionActive = false;
let claimableRoses = 0; // To track roses available to claim
const originalButtonColor = 'rgb(121, 196, 78)';


function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
}
// Function to update the UI
function updateUI() {
    const balanceElement = document.getElementById('balance');
    const startMiningButton = document.getElementById('startMining');

    // Update the balance display
    balanceElement.innerText = formatNumber(balance);

    if (miningSessionActive) {
        startMiningButton.innerText = 'Mining...';
        startMiningButton.style.backgroundColor = 'grey';
        startMiningButton.style.borderStyle = 'dotted';
        startMiningButton.disabled = true;
    } else if (claimableRoses > 0) {
        startMiningButton.innerText = `Claim ${claimableRoses} Xtals`;
        startMiningButton.style.backgroundColor = 'rgb(121, 196, 78)';
        startMiningButton.style.borderStyle = 'none';
        startMiningButton.disabled = false;
    } else {
        startMiningButton.innerText = 'Start Mining';
        startMiningButton.backgroundColor = originalButtonColor;
        startMiningButton.disabled = false;
    }
}

// Function to simulate mining
function startMining() {
    if (miningSessionActive) return;

    if (claimableRoses > 0) {
        // Handle claiming roses
        balance += claimableRoses;
        claimableRoses = 0;
        updateUI();
        return;
    }

    miningSessionActive = true;
    updateUI();

    // Simulate a mining session of 3 hours (set to 3 seconds for demonstration)
    setTimeout(() => {
        claimableRoses = 500000; // Simulate mining 1000 roses
        miningSessionActive = false;
        updateUI();
    }, 3000); // Simulate the 3-hour delay in 3 seconds
}

// Add event listener to the Start Mining button
document.getElementById('startMining').addEventListener('click', startMining);

// Initial UI update
updateUI();

// Telegram WebApp Authentication
window.Telegram.WebApp.ready();
const user = window.Telegram.WebApp.initDataUnsafe.user;

if (user) {

    console.log(`User ID: ${user.id}`);
    console.log(`First Name: ${user.first_name}`);
    console.log(`Last Name: ${user.last_name}`);
} else {
    console.log('User is not authenticated via Telegram');
}

