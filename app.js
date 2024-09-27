// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Function to update the navigation button based on the current page
function updateNavigationButton() {
  const isIndexPage = window.location.pathname === '/index.html'; // Adjust the path if your homepage has a different filename

  if (isIndexPage) {
    // Show the default "Close" button on the homepage
    Telegram.WebApp.BackButton.hide(); // Hide the "Back" button
  } else {
    // Show the "Back" button on any other page
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
