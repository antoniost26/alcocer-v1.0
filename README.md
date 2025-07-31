# Alcocer - A Private Community Scam Tracker Discord Bot

## Overview

Alcocer is a custom-built Discord bot designed to assist moderators and community members in a Gacha gaming server with the crucial task of scam prevention. It provides an automated system for tracking known scammers and their associated alt accounts, featuring a dedicated feedback system and a dynamic, regenerative list of scammer user IDs. This bot was created to streamline the moderation process and build a safer environment for community trades and interactions.

## Key Features

* **Dynamic Scammer List:** The bot maintains a list of known scammers' user IDs. This list is regenerative, meaning it can be completely deleted and then re-generated on command, ensuring the information stays up-to-date.

* **Automated Alt Account Tracking:** By monitoring messages from a specific external bot, Alcocer uses regular expressions to extract and store user IDs associated with alt accounts. This creates a powerful database to help identify users trying to evade bans.

* **Feedback System:** The bot includes a feedback mechanism that allows community members to report potential scammers or provide information, which is then reviewed by moderators.

* **Command-Based Management:** All primary functions, including adding and removing scammer IDs and triggering the list regeneration, are executed through specific commands sent within designated Discord channels.

* **Modular Command Structure:** All the bot's commands are organized in a dedicated `commands` folder, making the codebase clean, scalable, and easy to maintain.

## Project Structure

The project is structured to be straightforward and easy to navigate:
```
alcocer-v1.0/
├── commands/           # Contains all the command-specific logic
│   ├── command1.js
│   ├── command2.js
│   └── ...
├── src/                # Source files for core bot functionality
│   ├── bot.js
│   ├── database.js
│   └── ...
├── config.json         # Configuration file for bot token, channel IDs, etc.
├── package.json        # Node.js dependencies
└── README.md           # This file
```

## Technologies Used

* **Node.js:** The core runtime environment.

* **Discord.js:** The primary library for interacting with the Discord API.

* **MongoDB:** A database solution for storing scammer IDs and alt account information.

* **Regex:** Used for parsing and extracting user IDs from messages sent by other bots.

## Getting Started

### Prerequisites

* Node.js (v14.0.0 or higher)

* A Discord Bot Token

* A designated server and channels for bot commands and scammer list display

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/antoniost26/alcocer-v1.0.git](https://github.com/antoniost26/alcocer-v1.0.git)
    cd alcocer-v1.0
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Configuration

1.  Create a `config.json` file in the root directory.

2.  Populate it with your configurations and any necessary channel IDs.

    ```json
    {
      "scammer_channel_id": "YOUR_SCAMMER_LIST_CHANNEL_ID",
      "alt_tracker_channel_id": "YOUR_ALT_TRACKER_CHANNEL_ID",
      "admin_role_id": "YOUR_ADMIN_ROLE_ID"
    }
    ```
3. Create a copy of the .env template and include your own secrets (including your bot token).

### Running the Bot

To start the bot, run the following command in your terminal:

```bash
node src/bot.js
```

### Contributing
Contributions are welcome! If you find a bug or have a suggestion, please open an issue or submit a pull request. Although, the project was scraped as I am no longer part of said community.

### License
This project is licensed under the MIT License.
