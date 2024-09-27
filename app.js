 // Initialize Telegram WebApp
    Telegram.WebApp.ready();

    // Function to update the navigation button based on the current page
    function updateNavigationButton() {
      const isIndexPage = window.location.pathname === '/index.html';

      if (isIndexPage) {
        // Show the default "Close" button on the index page
        Telegram.WebApp.BackButton.hide(); // Hide the "Back" button
      } else {
        // Show the "Back" button instead of the "Close" button on other pages
        Telegram.WebApp.BackButton.show();
        Telegram.WebApp.BackButton.onClick(() => {
          window.history.back(); // Navigate to the previous page
        });
      }
    }

    // Call the function initially to set up the button based on the current page
    updateNavigationButton();
