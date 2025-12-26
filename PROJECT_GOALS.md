# Discord Bot - Project Goals

Build a feature-rich Discord bot with commands, event handlers, and utility functions.

## Objective

Create a production-ready Discord bot that demonstrates the autonomous agent's ability to:
- Build modular, scalable code
- Implement best practices
- Write comprehensive tests
- Create documentation
- Learn patterns across similar tasks (memory system validation)

---

## Phase 1: Core Setup & Basic Commands

### Task 1: Project Setup & Basic Bot
- [x] Create src/index.js with Discord client setup
- [ ] Create src/config.js for environment variables
- [ ] Create .env.example with required tokens
- [ ] Add basic ready event handler
- [ ] Add connection error handling

**Files to create:**
- `src/index.js` - Main bot entry point
- `src/config.js` - Configuration loader
- `.env.example` - Environment variable template

### Task 2: Command Handler System
- [ ] Create src/commands/ directory structure
- [ ] Create src/handlers/commandHandler.js
- [ ] Implement dynamic command loading
- [ ] Add command registration system
- [ ] Add error handling for commands

**Files to create:**
- `src/handlers/commandHandler.js` - Command loader
- `src/commands/ping.js` - Example ping command

### Task 3: Basic Utility Commands
- [ ] Create !ping command (latency check)
- [ ] Create !help command (list all commands)
- [ ] Create !info command (bot information)
- [ ] Add command descriptions and usage
- [ ] Add tests for utility commands

**Files to create:**
- `src/commands/ping.js`
- `src/commands/help.js`
- `src/commands/info.js`
- `tests/commands/utility.test.js`

---

## Phase 2: Fun & Interactive Commands

### Task 4: Fun Commands Module
- [ ] Create !joke command (random jokes)
- [ ] Create !quote command (inspirational quotes)
- [ ] Create !8ball command (magic 8-ball)
- [ ] Create !roll command (dice roller)
- [ ] Add tests for fun commands

**Files to create:**
- `src/commands/joke.js`
- `src/commands/quote.js`
- `src/commands/8ball.js`
- `src/commands/roll.js`
- `tests/commands/fun.test.js`

**Expected Memory Benefit:**
- Pattern recognition: "command creation"
- File suggestions: Similar structure to Task 3
- Cost prediction: ~$0.03-0.05 per command

### Task 5: Data Utilities Module
- [ ] Create src/utils/storage.js (JSON file storage)
- [ ] Create !remindme command (set reminders)
- [ ] Create !todo command (personal todo list)
- [ ] Implement data persistence
- [ ] Add tests for storage utility

**Files to create:**
- `src/utils/storage.js`
- `src/commands/remindme.js`
- `src/commands/todo.js`
- `tests/utils/storage.test.js`

---

## Phase 3: Advanced Features

### Task 6: Moderation Commands
- [ ] Create !kick command (kick users)
- [ ] Create !ban command (ban users)
- [ ] Create !warn command (warn users)
- [ ] Add permission checks
- [ ] Add moderation logs

**Files to create:**
- `src/commands/moderation/kick.js`
- `src/commands/moderation/ban.js`
- `src/commands/moderation/warn.js`
- `src/utils/permissions.js`
- `tests/commands/moderation.test.js`

**Expected Memory Benefit:**
- Pattern: "moderation commands" (distinct from fun commands)
- Suggests: `src/utils/permissions.js` for all mod commands
- Complexity: Medium-high (permission checks)

### Task 7: Event Handlers
- [ ] Create src/events/ directory
- [ ] Create messageCreate event handler
- [ ] Create guildMemberAdd event (welcome message)
- [ ] Create guildMemberRemove event
- [ ] Add event registration system

**Files to create:**
- `src/events/messageCreate.js`
- `src/events/guildMemberAdd.js`
- `src/events/guildMemberRemove.js`
- `src/handlers/eventHandler.js`

### Task 8: API Integration Commands
- [ ] Create !weather command (weather API)
- [ ] Create !crypto command (cryptocurrency prices)
- [ ] Create src/utils/api.js (API helper)
- [ ] Add rate limiting
- [ ] Add error handling for API failures

**Files to create:**
- `src/commands/weather.js`
- `src/commands/crypto.js`
- `src/utils/api.js`
- `tests/utils/api.test.js`

---

## Phase 4: Polish & Documentation

### Task 9: Comprehensive Testing
- [ ] Add tests for all commands
- [ ] Add integration tests
- [ ] Create test mocks for Discord.js
- [ ] Add test coverage reporting
- [ ] Fix any failing tests

**Files to create:**
- `tests/setup.js` - Test configuration
- `tests/mocks/discord.js` - Discord.js mocks
- Various test files for coverage

**Expected Memory Benefit:**
- High cache hit rate (reading existing command files)
- Pattern: "testing commands"
- File suggestions: All command files for testing

### Task 10: Documentation & README
- [ ] Create comprehensive README.md
- [ ] Document all commands with examples
- [ ] Create CONTRIBUTING.md
- [ ] Add JSDoc comments to all functions
- [ ] Create deployment guide

**Files to create:**
- `README.md` - Project documentation
- `CONTRIBUTING.md` - Contribution guidelines
- `docs/COMMANDS.md` - Command reference
- `docs/DEPLOYMENT.md` - Deployment guide

---

## Memory System Validation Checkpoints

Track these metrics as the agent completes tasks:

**Phase 1 (File Cache):**
- ✅ Cache hits when re-reading config files
- ✅ Cache hits when reading command templates

**Phase 2 (Codebase Map):**
- ✅ Map shows all commands in src/commands/
- ✅ No repeated list_directory calls
- ✅ Instant map loading on Tasks 2+

**Phase 3 (Task History):**
- ✅ Task 1: No prediction (first task)
- ✅ Task 2-3: Low confidence predictions (~30-50%)
- ✅ Task 4-6: Medium confidence (~60-80%)
- ✅ Task 7+: High confidence (80-100%)
- ✅ File suggestions appear (e.g., "tasks like this modify src/commands/*.js")
- ✅ Cost predictions accurate within ±20%

---

## Success Metrics

By the end of this project, the agent should have:
- ✅ 10+ commands implemented
- ✅ Modular, maintainable code structure
- ✅ Comprehensive test coverage (>80%)
- ✅ Full documentation
- ✅ Learned 4-5 distinct task patterns
- ✅ Demonstrated 60-70% API cost reduction

---

## Notes

- This project is designed to showcase memory system capabilities
- Tasks progress from simple to complex
- Similar tasks (commands) will trigger pattern recognition
- Agent will learn optimal file structures and reuse them
- By Task 5+, agent should predict costs accurately and suggest relevant files

**Ready to start!** Run `npm run agent:once` to begin with Task 1.
