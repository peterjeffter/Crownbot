// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Function to update the button based on the current page
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

// Call the function initially to set up the button based on the current page
updateNavigationButton();

// Listen for navigation changes (for single-page apps or navigating back/forward)
window.addEventListener('popstate', updateNavigationButton);

// Function to programmatically navigate to a new page and update the button
function navigateTo(pageUrl) {
  window.history.pushState({}, '', pageUrl); // Simulate page navigation
  updateNavigationButton(); // Update the button based on the new page
}
