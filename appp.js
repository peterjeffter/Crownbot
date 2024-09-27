let balance = 0;
let miningSessionActive = false;
let claimableRoses = 0; // To track roses available to claim
let miningStartTime = null; // To track when the mining session started
let countdownInterval = null; // To hold the countdown interval ID

function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
}

// Function to update the UI
function updateUI() {
    const balanceElement = document.getElementById('balance');
    const startMiningButton = document.getElementById('startMining');

    if (!balanceElement || !startMiningButton) return; // Check for element existence

    balanceElement.innerText = formatNumber(balance);

    if (miningSessionActive) {
        startMiningButton.style.backgroundColor = 'grey';
        startMiningButton.style.borderStyle = 'dotted';
        startMiningButton.disabled = true;

        // Calculate remaining time
        const currentTime = new Date().getTime();
        const sessionEndTime = miningStartTime + (3 * 60 * 60 * 1000); // 3 hours in milliseconds
        const remainingTime = Math.max(sessionEndTime - currentTime, 0);

        if (remainingTime <= 0) {
            endMiningSession(); // End session if time is up
        } else {
            startMiningButton.innerText = `Mining... ${formatTime(remainingTime)}`;
        }
    } else if (claimableRoses > 0) {
        startMiningButton.innerText = `Claim ${claimableRoses} Xtals`;
        startMiningButton.style.backgroundColor = 'rgb(121, 196, 78)';
        startMiningButton.disabled = false;
    } else {
        startMiningButton.innerText = 'Start Mining';
        startMiningButton.disabled = false;
    }
}

// Function to handle the end of the mining session
function endMiningSession() {
    claimableRoses = 1000; // Simulate mining 1000 roses
    miningSessionActive = false;
    miningStartTime = null;
    localStorage.removeItem('miningStartTime'); // Clear stored start time

    if (countdownInterval) {
        clearInterval(countdownInterval); // Clear the countdown interval
    }
    
    updateUI();
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

    miningStartTime = new Date().getTime();
    localStorage.setItem('miningStartTime', miningStartTime); // Store start time
    miningSessionActive = true;
    updateUI();

    // Calculate remaining time
    const sessionDuration = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    const endTime = miningStartTime + sessionDuration;

    // Countdown function to update the timer
    countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTime = Math.max(endTime - currentTime, 0);

        if (remainingTime <= 0) {
            clearInterval(countdownInterval); // Stop countdown
            endMiningSession(); // End session if time is up
        }

        updateUI();
    }, 1000); // Update every second
}

// Initialize UI
function initialize() {
    const storedStartTime = localStorage.getItem('miningStartTime');
    if (storedStartTime) {
        miningStartTime = parseInt(storedStartTime, 10);
        const currentTime = new Date().getTime();
        const sessionDuration = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
        if (currentTime >= (miningStartTime + sessionDuration)) {
            endMiningSession(); // Session expired
        } else {
            miningSessionActive = true;
            updateUI();
        }
    } else {
        updateUI(); // Update UI initially
    }
}

// Add event listener to the Start Mining button
document.getElementById('startMining').addEventListener('click', startMining);

// Initial UI update
initialize();

document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.nav-icon');
    const currentPage = window.location.href.split('/index.html').pop(); // Get the current page name

    icons.forEach(icon => {
        if (icon.getAttribute('href') === currentPage) {
            icon.classList.add('active'); // Add active class to the current page icon
        } else {
            icon.classList.remove('active'); // Remove active class from other icons
        }
    });
});

// loading.js

// Check if the page has been loaded during the session
if (!sessionStorage.getItem('pageLoaded')) {
    // First time loading in this session: Show loading screen
    window.addEventListener('load', function () {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');

        // Set a minimum display time for the loading screen (e.g., 3 seconds)
        setTimeout(() => {
            loadingScreen.style.display = 'none';  // Hide loading screen
            mainContent.style.display = 'flex';  // Show main content

            // Store in sessionStorage that the page has been loaded
            sessionStorage.setItem('pageLoaded', 'true');
        }, 3000); // Adjust the delay as needed (3000ms = 3 seconds)
    });
} else {
    // Page was already loaded in this session: Skip loading screen
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'flex';  // Show main content immediately
}



        
    window.Telegram.WebApp.ready();
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    
    if (user) {
        // Show authenticated user's name in the profile section or balance section
        const homeusername = document.getElementById('usernamehome');
        const profid = document.getElementById('idname')
        homeusername.innerHTML = `${user.username}`;
    
        console.log(`User ID: ${user.id}`);
        console.log(`First Name: ${user.first_name}`);
        console.log(`Last Name: ${user.username}`);
    } else {
        console.log('User is not authenticated via Telegram');
    }
