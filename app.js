// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Function to update the button based on the current page
function updateButton() {
  const isIndexPage = window.location.pathname === '/index.html';

  if (isIndexPage) {
    // If on index.html, show 'Close'
    Telegram.WebApp.MainButton.setText('Close');
    Telegram.WebApp.MainButton.onClick(() => {
      Telegram.WebApp.close();  // Closes the web app
    });
  } else {
    // If not on index.html, show 'Back'
    Telegram.WebApp.MainButton.setText('Back');
    Telegram.WebApp.MainButton.onClick(() => {
      window.history.back();  // Navigate back to the previous page
    });
  }

  // Make the MainButton visible
  Telegram.WebApp.MainButton.show();
}

// Call the function initially
updateButton();

// Listen for changes in navigation (for single-page apps)
window.addEventListener('popstate', updateButton);
