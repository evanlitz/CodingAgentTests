# Task Manager CLI - Project Goals

Build a fully-featured command-line task manager with persistence, priorities, filtering, and comprehensive testing.

## Objective

Create a production-ready CLI tool that demonstrates the autonomous agent's ability to:
- Build clean, modular architecture
- Implement CRUD operations
- Handle file I/O and data persistence
- Write comprehensive tests
- **Learn patterns across similar tasks** (memory system validation)

---

## Phase 1: Core Functionality

### Task 1: Project Setup & Basic Commands
- [ ] Create src/task.js with CLI argument parsing
- [ ] Create src/storage.js for JSON file operations
- [ ] Implement `add` command (add new task)
- [ ] Implement `list` command (show all tasks)
- [ ] Create tasks.json storage file
- [ ] Add basic error handling

**Expected files:**
- `src/task.js` - Main CLI entry point
- `src/storage.js` - JSON read/write operations
- `tasks.json` - Task storage (empty array initially)

**Expected behavior:**
```bash
node src/task.js add "Buy groceries"
# Output: ✅ Task added: #1 "Buy groceries"

node src/task.js list
# Output:
# 📋 Your Tasks:
#  [1] [ ] Buy groceries
```

**Memory validation:**
- First task, no predictions
- Codebase map built
- Pattern created: "CLI command"

---

### Task 2: Complete & Delete Operations
- [ ] Implement `done` command (mark task complete)
- [ ] Implement `delete` command (remove task)
- [ ] Update storage.js to handle modifications
- [ ] Add task status tracking (pending/completed)
- [ ] Add colored output (green for completed, white for pending)

**Expected files:**
- Update `src/task.js` with new commands
- Update `src/storage.js` with update/delete methods

**Expected behavior:**
```bash
node src/task.js done 1
# Output: ✅ Task #1 marked as complete

node src/task.js delete 2
# Output: 🗑️  Task #2 deleted
```

**Memory validation:**
- Pattern match with Task 1 (~30-50% confidence)
- Suggests: `src/task.js`, `src/storage.js`
- Cache hits on reading existing files

---

### Task 3: Data Persistence & Validation
- [ ] Ensure tasks persist across runs
- [ ] Add input validation (empty tasks, invalid IDs)
- [ ] Add confirmation for delete operations
- [ ] Handle edge cases (empty list, invalid commands)
- [ ] Create tests for storage operations

**Expected files:**
- Update `src/storage.js` with validation
- Create `tests/storage.test.js`

**Expected behavior:**
```bash
node src/task.js add ""
# Output: ❌ Error: Task description cannot be empty

node src/task.js delete 999
# Output: ❌ Error: Task #999 not found
```

**Memory validation:**
- Medium confidence prediction (~50-60%)
- File suggestions appear
- Cache hit rate: ~25-35%

---

## Phase 2: Enhanced Features

### Task 4: Priority Levels
- [ ] Add priority field to tasks (low/medium/high)
- [ ] Implement `add` with --priority flag
- [ ] Color-code priorities in list view
- [ ] Sort tasks by priority
- [ ] Update tests for priorities

**Expected files:**
- Update `src/task.js` with priority handling
- Update `src/storage.js` schema
- Create `tests/priority.test.js`

**Expected behavior:**
```bash
node src/task.js add "Fix bug" --priority high
# Output: ✅ Task added: #3 "Fix bug" (Priority: HIGH)

node src/task.js list
# Output:
# 📋 Your Tasks:
#  [3] [ ] Fix bug (🔴 HIGH)
#  [1] [x] Buy groceries (🟢 LOW)
```

**Memory validation:**
- Pattern: "add feature to CRUD command" (~70% confidence)
- Suggests: `src/task.js`, `src/storage.js`, tests
- Cache hit rate: ~40%

---

### Task 5: Due Dates & Sorting
- [ ] Add due date field to tasks
- [ ] Implement `add` with --due flag
- [ ] Show overdue tasks in red
- [ ] Implement `sort` command (by date, priority, status)
- [ ] Add date formatting and validation

**Expected files:**
- Update `src/task.js` with date handling
- Create `src/utils/dateHelper.js`
- Update tests

**Expected behavior:**
```bash
node src/task.js add "Submit report" --due 2024-12-31
# Output: ✅ Task added: #4 "Submit report" (Due: Dec 31, 2024)

node src/task.js list --sort due
# Output: Tasks sorted by due date
```

**Memory validation:**
- High confidence (~80%)
- Suggests: `src/utils/` for new utility
- Cache hit rate: ~45%

---

### Task 6: Categories & Tags
- [ ] Add category/tags field to tasks
- [ ] Implement `add` with --category flag
- [ ] Filter tasks by category
- [ ] Show category badges in list
- [ ] Update tests

**Expected files:**
- Update `src/task.js` with category handling
- Create `src/utils/formatter.js` for display
- Update tests

**Expected behavior:**
```bash
node src/task.js add "Review PR" --category work
# Output: ✅ Task added: #5 "Review PR" [work]

node src/task.js list --category work
# Output: Shows only work-related tasks
```

**Memory validation:**
- Very high confidence (~85-90%)
- Accurate cost predictions
- Cache hit rate: ~50%

---

## Phase 3: Advanced Operations

### Task 7: Search & Filtering
- [ ] Implement `search` command (text search)
- [ ] Implement `filter` command (by status, priority, category)
- [ ] Add case-insensitive search
- [ ] Support multiple filters
- [ ] Add tests for search/filter

**Expected files:**
- Create `src/commands/search.js`
- Create `src/commands/filter.js`
- Update `src/task.js` to use command modules

**Expected behavior:**
```bash
node src/task.js search "report"
# Output: Shows all tasks containing "report"

node src/task.js filter --status pending --priority high
# Output: Shows pending high-priority tasks
```

**Memory validation:**
- Pattern: "command module" (new pattern)
- High confidence on existing patterns
- Cache hit rate: ~55%

---

### Task 8: Statistics & Reporting
- [ ] Implement `stats` command (task statistics)
- [ ] Show completion percentage
- [ ] Show tasks by category
- [ ] Show tasks by priority distribution
- [ ] Create visual progress indicators

**Expected files:**
- Create `src/commands/stats.js`
- Create `src/utils/calculator.js`
- Update tests

**Expected behavior:**
```bash
node src/task.js stats
# Output:
# 📊 Task Statistics:
#    Total: 10 tasks
#    Completed: 6 (60%)
#    Pending: 4 (40%)
#
#    By Priority:
#    🔴 High: 2
#    🟡 Medium: 3
#    🟢 Low: 5
```

**Memory validation:**
- Multiple patterns recognized
- Very high confidence (90%+)
- Cache hit rate: ~60%

---

## Phase 4: Testing & Documentation

### Task 9: Comprehensive Testing
- [ ] Write tests for all commands
- [ ] Add integration tests
- [ ] Create test fixtures and mocks
- [ ] Add edge case tests
- [ ] Achieve >80% code coverage

**Expected files:**
- `tests/commands/add.test.js`
- `tests/commands/delete.test.js`
- `tests/commands/search.test.js`
- `tests/integration.test.js`
- `tests/fixtures/sample-tasks.json`

**Expected behavior:**
```bash
npm test
# Output: All tests pass with >80% coverage
```

**Memory validation:**
- Pattern: "testing" (distinct from command creation)
- VERY high cache hit rate (~65-70%) - reads all source files
- Suggests: ALL command and utility files

---

### Task 10: Documentation & Polish
- [ ] Write comprehensive README.md
- [ ] Add usage examples for all commands
- [ ] Create CLI help text (--help flag)
- [ ] Add JSDoc comments to all functions
- [ ] Create CONTRIBUTING.md

**Expected files:**
- Update `README.md` with full documentation
- Create `docs/USAGE.md` with examples
- Create `CONTRIBUTING.md`
- Add inline documentation

**Expected behavior:**
```bash
node src/task.js --help
# Output: Shows all available commands and usage
```

**Memory validation:**
- Pattern: "documentation"
- Highest cache hit rate (~70-75%) - reads everything
- Cost prediction very accurate (±5%)

---

## Success Criteria

✅ All 10 tasks completed
✅ Working CLI with 10+ commands
✅ Comprehensive test suite (>80% coverage)
✅ Full documentation
✅ 4-5 distinct patterns learned
✅ Cache hit rate >60% on final tasks
✅ Cost predictions accurate within ±15%
✅ 65%+ overall cost reduction demonstrated

---

## Ready to Build! 🚀

```bash
cd agent
npm run agent:once
```
