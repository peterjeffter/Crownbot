// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Function to update the navigation button based on the current page
function updateNavigationButton() {
  const isIndexPage = window.location.pathname === '/index.html'; // Check if we're on the homepage
  
  // Show the "Close" button on the homepage
  if (isIndexPage) {
    Telegram.WebApp.BackButton.hide(); // Hide the "Back" button on the homepage
    Telegram.WebApp.CloseButton.show(); // Show the "Close" button on the homepage
  } else {
    // Show the "Back" button on all other pages
    Telegram.WebApp.CloseButton.hide(); // Hide the "Close" button on other pages
    Telegram.WebApp.BackButton.show(); // Show the "Back" button
    Telegram.WebApp.BackButton.onClick(() => {
      window.history.back(); // Navigate to the previous page
    });
  }
}

// Call the function initially to set up the button
updateNavigationButton();

// Listen for changes in navigation (if the user uses the browser's back/forward buttons)
window.addEventListener('popstate', updateNavigationButton);
