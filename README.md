# Discord Bot - Built by Autonomous Agent

A feature-rich Discord bot created entirely by an autonomous coding agent to demonstrate AI-powered software development with memory optimization.

## 🎯 Project Purpose

This Discord bot serves dual purposes:
1. **Functional Bot** - A working Discord bot with useful commands
2. **AI Testing Ground** - Validates autonomous agent's memory system (Phases 1-3)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Discord Bot Token ([Get one here](https://discord.com/developers/applications))

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your Discord token to .env
DISCORD_TOKEN=your_bot_token_here

# Run the bot
npm start
```

## 📋 Commands

Commands will be added as the agent completes tasks. Check back here for updates!

### Utility Commands
- `!ping` - Check bot latency
- `!help` - List all commands
- `!info` - Bot information

### Fun Commands
- `!joke` - Get a random joke
- `!quote` - Inspirational quote
- `!8ball <question>` - Magic 8-ball
- `!roll <dice>` - Roll dice (e.g., !roll 2d6)

### Data Commands
- `!remindme <time> <message>` - Set a reminder
- `!todo <add|list|done>` - Manage todos

### Moderation (Admin only)
- `!kick @user` - Kick a user
- `!ban @user` - Ban a user
- `!warn @user` - Warn a user

## 🧪 Agent Memory System in Action

This project demonstrates three memory optimization phases:

**Phase 1: File Cache**
- Caches frequently read files
- Reduces redundant disk I/O
- Expected savings: 30-40%

**Phase 2: Codebase Map**
- Maps project structure once
- Eliminates repeated exploration
- Expected savings: 50-60%

**Phase 3: Task History**
- Learns from past tasks
- Predicts complexity and costs
- Suggests relevant files
- Expected savings: 10-20%

**Total Expected Savings: 70-80% API cost reduction**

## 📊 Development Progress

Track the agent's progress in [PROJECT_GOALS.md](PROJECT_GOALS.md)

- [ ] Phase 1: Core Setup (Tasks 1-3)
- [ ] Phase 2: Fun Commands (Tasks 4-5)
- [ ] Phase 3: Advanced Features (Tasks 6-8)
- [ ] Phase 4: Polish & Docs (Tasks 9-10)

## 🤖 Built With

- **Discord.js v14** - Discord API library
- **Node.js** - Runtime environment
- **Jest** - Testing framework
- **Autonomous Agent** - AI-powered development

## 📝 License

MIT

---

**Note:** This bot is being built incrementally by an autonomous coding agent. Features will be added progressively as tasks are completed.
