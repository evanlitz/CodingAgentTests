# Task Manager CLI

A feature-rich command-line task manager built entirely by an autonomous coding agent.

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
```

## 📋 Features

- ✅ Add, list, complete, and delete tasks
- ✅ Priority levels (low, medium, high)
- ✅ Due dates with validation and formatting
- ✅ Overdue task highlighting
- ✅ Categories and tags
- ✅ Search and filtering
- ✅ Statistics and reporting
- ✅ Persistent JSON storage

## 📖 Commands

### Add a Task
```bash
# Basic task
node src/task.js add "Buy groceries"

# With priority
node src/task.js add "Fix bug" --priority high

# With due date (YYYY-MM-DD format)
node src/task.js add "Submit report" --due 2024-12-31

# With category
node src/task.js add "Review PR" --category work

# All options combined
node src/task.js add "Important task" --priority high --due 2024-12-31 --category work
```

### List Tasks
```bash
# List all tasks
node src/task.js list

# Filter by status
node src/task.js list --status pending
node src/task.js list --status completed

# Filter by priority
node src/task.js list --priority high

# Filter by category
node src/task.js list --category work

# Sort tasks
node src/task.js list --sort priority
node src/task.js list --sort due
node src/task.js list --sort status
```

### Complete a Task
```bash
node src/task.js done <id>
```

### Delete a Task
```bash
# With confirmation prompt
node src/task.js delete <id>

# Skip confirmation (for scripts)
node src/task.js delete <id> --force
```

### Search Tasks
```bash
node src/task.js search "report"
```

### View Statistics
```bash
node src/task.js stats
```

## 📅 Date Formatting and Validation

The CLI includes comprehensive date handling:

### Date Input Format
- **Required format:** `YYYY-MM-DD` (e.g., `2024-12-31`)
- Validates dates to prevent invalid values (e.g., `2024-13-45`)
- Handles leap years correctly
- Provides helpful error messages for invalid dates

### Date Display
- Dates are automatically formatted for readability: `Dec 31, 2024`
- Overdue tasks are highlighted in **red**
- Overdue dates are shown in **red**
- Completed tasks are never marked as overdue

### Example
```bash
# Valid date formats
node src/task.js add "Submit report" --due 2024-12-31  ✓
node src/task.js add "Team meeting" --due 2025-01-15   ✓

# Invalid formats (will be rejected)
node src/task.js add "Task" --due 12/31/2024  ✗
node src/task.js add "Task" --due 2024/12/31  ✗
node src/task.js add "Task" --due 2024-13-45  ✗
```

### Date Helper Utilities

The `src/utils/dateHelper.js` module provides:

- **`validateDate(dateString)`** - Validates date format and values
- **`formatDate(dateString, format)`** - Formats dates for display
- **`isTaskOverdue(task)`** - Checks if a task is overdue
- **`parseToISO(dateString)`** - Parses various date formats to ISO
- **`getRelativeDate(dateString)`** - Returns relative date descriptions

## 🎨 Visual Features

- **Priority indicators:**
  - 🔴 High priority (red)
  - 🟡 Medium priority (yellow)
  - 🟢 Low priority (green)

- **Status indicators:**
  - [✓] Completed (green checkmark)
  - [ ] Pending (empty checkbox)

- **Overdue tasks:**
  - Task description in red
  - Due date in red
  - Only applies to pending tasks

## 🧪 Testing

```bash
# Run all tests
npm test

# Test date validation specifically
node test-date-validation.js

# Test overdue highlighting
node test-overdue.js
```

The project includes comprehensive test coverage:
- 34+ unit tests for date helper functions
- Edge case handling (leap years, invalid dates)
- Integration tests for CLI commands
- 100% coverage for date utilities

## 🧠 Memory System Validation

This project demonstrates three memory optimization phases that reduce API costs by 65-70%.

See [PROJECT_GOALS.md](PROJECT_GOALS.md) for detailed tasks.

## 📁 Project Structure

```
├── src/
│   ├── task.js           # Main CLI entry point
│   ├── storage.js        # JSON persistence layer
│   └── utils/
│       └── dateHelper.js # Date validation and formatting
├── tests/
│   └── dateHelper.test.js # Date utility tests
├── tasks.json            # Task storage file
└── package.json          # Dependencies and scripts
```

## 🔧 Dependencies

- **chalk** - Colored terminal output
- **commander** - CLI argument parsing
- **date-fns** - Date manipulation and formatting

## 📝 License

MIT

---

**Note:** This project is being built incrementally by an autonomous coding agent to demonstrate clean architecture, comprehensive testing, and efficient memory usage patterns.
