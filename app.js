const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_TOKEN' with the token you got from BotFather
const bot = new TelegramBot('7710762858:AAH5ZFjQRCC1yX4Y1VBA1Qrgez2hhPVL32M', { polling: true });

// Listen for the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username; // Extract the user's Telegram username

    // Welcome message
    const welcomeMessage = `Hello ${username}, Welcome to the Crown Club. Enter to collect your crowns!`;

    // Inline keyboard with buttons arranged two per line
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Visit Our Channel", // Button text
                        url: "https://t.me/+9QJLJVYQLJU1Njdk" // Replace with your channel link
                    },
                    {
                        text: "Contact Support", // Second button text
                        url: "https://t.me/YourSupportUsername" // Replace with your support link or another action
                    }
                ],
                [
                    {
                        text: "Follow X", // Third button text
                        url: "https://x.com/crowntgbot?s=21" // Replace with your support link or another action
                    },
                    {
                        text: "YouTube", // Fourth button text
                        url: "https://youtube.com/@crown-bot?si=mzH-lUmANad5jqKz" // Replace with your YouTube link
                    }
                ]
            ]
        }
    };

    // Send the welcome message with the inline keyboard
    bot.sendMessage(chatId, welcomeMessage, options);
});


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
