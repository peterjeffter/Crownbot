// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Function to update the navigation button based on the current page
function updateNavigationButton() {
  const isIndexPage = window.location.pathname === '/index.html'; // Check if we're on the homepage
  
  if (isIndexPage) {
    // Hide the "Back" button on the homepage (default Close button will appear)
    Telegram.WebApp.BackButton.hide();
  } else {
    // Show the "Back" button on all other pages
    Telegram.WebApp.BackButton.show();
    Telegram.WebApp.BackButton.onClick(() => {
      window.history.back(); // Navigate to the previous page
    });
  }
}

// Call the function initially to set up the button
updateNavigationButton();

// Listen for changes in navigation (if the user uses the browser's back/forward buttons)
window.addEventListener('popstate', updateNavigationButton);
