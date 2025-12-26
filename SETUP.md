# Discord Bot Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and add your Discord bot token:
```env
DISCORD_TOKEN=your_bot_token_here
BOT_PREFIX=!
NODE_ENV=development
```

### 3. Get Your Discord Bot Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Give your bot a name
4. Go to "Bot" section in the left sidebar
5. Click "Add Bot"
6. Under "Token", click "Reset Token" and copy it
7. Paste the token in your `.env` file

### 4. Enable Required Intents

In the Discord Developer Portal, under your bot's settings:
1. Go to "Bot" section
2. Scroll down to "Privileged Gateway Intents"
3. Enable the following:
   - ✅ Server Members Intent
   - ✅ Message Content Intent

### 5. Invite Bot to Your Server

1. In Discord Developer Portal, go to "OAuth2" → "URL Generator"
2. Select scopes:
   - ✅ bot
   - ✅ applications.commands (for slash commands, optional)
3. Select bot permissions:
   - ✅ Send Messages
   - ✅ Read Messages/View Channels
   - ✅ Read Message History
   - ✅ Add Reactions (optional)
   - ✅ Manage Messages (for moderation, optional)
   - ✅ Kick Members (for moderation, optional)
   - ✅ Ban Members (for moderation, optional)
4. Copy the generated URL and open it in your browser
5. Select your server and authorize the bot

### 6. Run the Bot

```bash
npm start
```

You should see output like:
```
🚀 Starting Discord bot...
📂 Environment: development
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Discord bot is online!
📝 Logged in as: YourBot#1234
🆔 Bot ID: 123456789012345678
🔧 Prefix: !
🌍 Environment: development
🏠 Servers: 1
👥 Users: 10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Project Structure

```
discord-bot/
├── src/
│   ├── index.js        # Main bot entry point
│   ├── config.js       # Configuration loader
│   ├── commands/       # Command modules (to be added)
│   ├── events/         # Event handlers (to be added)
│   └── utils/          # Utility functions (to be added)
├── tests/              # Test files
├── .env                # Environment variables (create this)
├── .env.example        # Environment template
└── package.json        # Project dependencies
```

## Troubleshooting

### Bot won't start
- ✅ Check that `DISCORD_TOKEN` is set in `.env`
- ✅ Verify token is valid (not expired or reset)
- ✅ Ensure no extra spaces in the token

### Bot connects but can't read messages
- ✅ Enable "Message Content Intent" in Discord Developer Portal
- ✅ Check bot has proper permissions in your server
- ✅ Verify bot role is positioned correctly (above roles it needs to manage)

### "Missing Access" errors
- ✅ Reinvite bot with correct permissions
- ✅ Check bot role permissions in server settings
- ✅ Ensure bot can access the channels where you're testing

## Development Mode

The bot includes debug logging in development mode. Set `NODE_ENV=development` in your `.env` file to see detailed logs.

## Next Steps

Once the bot is running:
1. Add command handlers (Task 2 in PROJECT_GOALS.md)
2. Implement basic commands like `!ping`, `!help` (Task 3)
3. Add fun commands and features (Tasks 4+)

For full development roadmap, see [PROJECT_GOALS.md](PROJECT_GOALS.md)
