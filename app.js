// Initialize variables
let balance = 0;
let miningSessionActive = false;
let claimableRoses = 0; // To track roses available to claim

// Function to update the UI
function updateUI() {
    const balanceElement = document.getElementById('balance');
    const startMiningButton = document.getElementById('startMining');

    // Update the balance display
    balanceElement.innerText = balance;

    if (miningSessionActive) {
        startMiningButton.innerText = 'Mining...';
        startMiningButton.disabled = true;
    } else if (claimableRoses > 0) {
        startMiningButton.innerText = `Claim ${claimableRoses} Xtals`;
        startMiningButton.disabled = false;
    } else {
        startMiningButton.innerText = 'Start Mining';
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
        claimableRoses = 1000; // Simulate mining 1000 roses
        miningSessionActive = false;
        updateUI();
    }, 3000); // Simulate the 3-hour delay in 3 seconds
}

// Add event listener to the Start Mining button
document.getElementById('startMining').addEventListener('click', startMining);

// Initial UI update
updateUI();
