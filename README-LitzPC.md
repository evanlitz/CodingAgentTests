# Task Manager CLI

A feature-rich command-line task manager built entirely by an autonomous coding agent.

## 🎯 About This Project

This is both:
- **A functional CLI tool** - Manage your tasks from the terminal
- **An AI testing ground** - Validates autonomous agent's memory system

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Add a task
node src/task.js add "Buy groceries"

# List tasks
node src/task.js list

# Mark as complete
node src/task.js done 1

# Delete a task
node src/task.js delete 2
```

## 📋 Commands

### Basic Operations
```bash
# Add task
node src/task.js add "Task description"

# List all tasks
node src/task.js list

# Mark task as done
node src/task.js done <id>

# Delete task
node src/task.js delete <id>
```

### Advanced Features
```bash
# Add with priority
node src/task.js add "Fix bug" --priority high

# Add with due date
node src/task.js add "Submit report" --due 2024-12-31

# Add with category
node src/task.js add "Review PR" --category work

# Search tasks
node src/task.js search "report"

# Filter tasks
node src/task.js filter --status pending --priority high

# Show statistics
node src/task.js stats

# Sort tasks
node src/task.js list --sort priority
```

## 🧠 Memory System Validation

This project demonstrates three memory optimization phases:

**Phase 1: File Cache**
- Caches `tasks.json` and source files
- Reduces redundant file reads
- Expected hit rate: 60-70% by task 10

**Phase 2: Codebase Map**
- Maps project structure once
- Eliminates repeated directory scanning
- Loads instantly after first build

**Phase 3: Task History**
- Learns patterns from similar tasks
- Predicts complexity and costs
- Suggests relevant files automatically

## 📊 Development Progress

See [PROJECT_GOALS.md](PROJECT_GOALS.md) for detailed tasks.

- [ ] Phase 1: Core Functionality (Tasks 1-3)
- [ ] Phase 2: Enhanced Features (Tasks 4-6)
- [ ] Phase 3: Advanced Operations (Tasks 7-8)
- [ ] Phase 4: Testing & Documentation (Tasks 9-10)

## 🧪 Testing

```bash
# Run all tests
npm test

# Test coverage
npm run test:coverage
```

## 📖 Documentation

- **[PROJECT_GOALS.md](PROJECT_GOALS.md)** - Development roadmap
- **[USAGE.md](docs/USAGE.md)** - Detailed usage guide (created in Task 10)

## 🛠️ Tech Stack

- **Node.js** - Runtime
- **chalk** - Terminal colors
- **commander** - CLI framework
- **date-fns** - Date handling
- **Jest** - Testing

## 📝 License

MIT

---

**Note:** This project is being built incrementally by an autonomous coding agent. Features will be added as tasks are completed.

**Current Status:** Ready for Task 1
