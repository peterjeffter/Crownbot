// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Function to update the navigation button based on the current page
function updateNavigationButton() {
  const isIndexPage = window.location.pathname === '/index.html';

  if (isIndexPage) {
    // Show the default "Close" button
    Telegram.WebApp.BackButton.hide(); // Hide the "Back" button
  } else {
    // Show the "Back" button instead of the "Close" button
    Telegram.WebApp.BackButton.show();
    Telegram.WebApp.BackButton.onClick(() => {
      window.history.back(); // Navigate to the previous page
    });
  }
}

// Call the function initially
updateNavigationButton();

// Listen for page changes (if using single-page apps or dynamically loading pages)
window.addEventListener('popstate', updateNavigationButton);
