# telegram-sticker-bot

A Telegram bot for automated sticker management, search, and pack handling.

## ✨ Features

- Search and send stickers by keyword
- Manage sticker packs (create, add, remove)
- Automatic sticker processing (deduplication, resizing)
- Lightweight and easy to self-host

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/h1ntz0/telegram-sticker-bot.git
cd telegram-sticker-bot

# Install dependencies
pip install -r requirements.txt
```

## 🚀 Configuration

Create a `.env` file (or export environment variables):

```bash
BOT_TOKEN=your-telegram-bot-token
```

## 🚀 Usage

```bash
# Start the bot
python main.py
```

Then open your bot in Telegram and try:

```
/sticker search <keyword>
/sticker add <pack-name>
```

## 🛠️ Tech Stack

- [Python](https://www.python.org/)
- [Telegram Bot API](https://core.telegram.org/bots/api)

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

> **Note**: This is a draft README. Update the features, commands, and configuration to match the actual implementation.
