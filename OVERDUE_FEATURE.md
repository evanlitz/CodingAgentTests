# Overdue Tasks Feature Documentation

## Overview
The task manager now displays overdue tasks in red color to help users quickly identify tasks that need immediate attention.

## Feature Details

### What is an Overdue Task?
A task is considered overdue when:
1. It has a due date set
2. The due date is before today (current date)
3. The task status is "pending" (not completed)

### Visual Indicators
- **Task Description**: Shown in red color for overdue tasks
- **Due Date**: Also shown in red color to emphasize the overdue status
- **Completed Tasks**: Never marked as overdue, even if they had a past due date

## Implementation Details

### Dependencies
The feature uses the `date-fns` library for robust date handling:
- `parseISO`: Parses ISO 8601 date strings (YYYY-MM-DD)
- `isBefore`: Compares dates to check if one is before another
- `startOfDay`: Normalizes dates to start of day for accurate comparison

### Code Components

#### Helper Function: `isTaskOverdue(task)`
```javascript
function isTaskOverdue(task) {
  if (!task.dueDate || task.status === 'completed') {
    return false;
  }
  
  try {
    const today = startOfDay(new Date());
    const dueDate = startOfDay(parseISO(task.dueDate));
    return isBefore(dueDate, today);
  } catch (error) {
    // If date parsing fails, treat as not overdue
    return false;
  }
}
```

**Features:**
- Returns `false` for tasks without due dates
- Returns `false` for completed tasks (regardless of due date)
- Compares dates at the start of day level (ignores time)
- Handles invalid dates gracefully without crashing

### Commands Supporting Overdue Display

#### 1. List Command
```bash
node src/task.js list
```
Shows all tasks with overdue tasks highlighted in red.

Options:
- `--status <status>`: Filter by status
- `--priority <level>`: Filter by priority
- `--category <category>`: Filter by category
- `--sort <field>`: Sort tasks (priority, due, status)

#### 2. Search Command
```bash
node src/task.js search "report"
```
Shows matching tasks with overdue tasks highlighted in red.

#### 3. Stats Command
```bash
node src/task.js stats
```
Shows task statistics including count of overdue tasks.

Example output:
```
📊 Task Statistics:

   Total: 5 tasks
   Completed: 1 (20%) 
   Pending: 4 (80%) 
   Overdue: 2

   By Priority:
   🔴 High: 2
   🟡 Medium: 1
   🟢 Low: 2
```

## Usage Examples

### Example 1: Adding Tasks with Due Dates
```bash
# Add a task with an overdue date
node src/task.js add "Submit report" --due 2024-01-15

# Add a task with a future date
node src/task.js add "Plan meeting" --due 2025-12-31
```

### Example 2: Viewing Overdue Tasks
```bash
# List all tasks (overdue tasks shown in red)
node src/task.js list

# Sort by due date to see overdue tasks first
node src/task.js list --sort due

# Filter pending tasks to see only incomplete items
node src/task.js list --status pending
```

### Example 3: Completing Overdue Tasks
```bash
# Mark an overdue task as complete
node src/task.js done <task-id>

# Task will no longer appear in red after completion
node src/task.js list
```

## Testing

### Manual Test Cases

#### Test Case 1: Overdue Task Display
1. Add a task with past due date: `node src/task.js add "Test" --due 2024-01-01`
2. List tasks: `node src/task.js list`
3. **Expected**: Task description and due date appear in red

#### Test Case 2: Future Task Display
1. Add a task with future date: `node src/task.js add "Test" --due 2025-12-31`
2. List tasks: `node src/task.js list`
3. **Expected**: Task appears in normal colors (not red)

#### Test Case 3: Completed Overdue Task
1. Add overdue task: `node src/task.js add "Test" --due 2024-01-01`
2. Complete it: `node src/task.js done <task-id>`
3. List tasks: `node src/task.js list`
4. **Expected**: Task appears with green checkmark, NOT in red

#### Test Case 4: Statistics with Overdue Tasks
1. Create several tasks with various dates
2. Run: `node src/task.js stats`
3. **Expected**: Shows accurate count of overdue tasks

### Edge Cases Handled
- ✅ Tasks with no due date (never overdue)
- ✅ Tasks with invalid date formats (gracefully handled)
- ✅ Completed tasks with past due dates (not marked overdue)
- ✅ Date comparison at day level (ignores time)
- ✅ Timezone considerations (uses local date)

## Benefits

1. **Visual Clarity**: Instantly identify urgent tasks
2. **Prioritization**: Easier to focus on what needs attention
3. **User-Friendly**: Intuitive color coding (red = urgent)
4. **Comprehensive**: Works across list, search, and stats commands
5. **Safe**: Completed tasks not marked overdue
6. **Robust**: Handles edge cases and invalid data gracefully

## Future Enhancements

Potential improvements for future versions:
- Different colors for "due today" vs "overdue"
- Configurable warning period (e.g., highlight tasks due within 3 days)
- Email/notification for overdue tasks
- Snooze functionality for overdue tasks
- Auto-archiving of old overdue tasks

## Technical Notes

### Date Format
- Uses ISO 8601 format: `YYYY-MM-DD`
- Example: `2024-12-31`
- Stored as strings in JSON
- Parsed using `date-fns` for reliability

### Color Library
- Uses `chalk` for terminal colors
- Red: `chalk.red(text)`
- Compatible with most terminals
- Gracefully degrades on terminals without color support

### Performance
- Minimal performance impact
- Date comparison is O(1) per task
- No external API calls
- All processing done locally

## Conclusion

The overdue tasks feature enhances the task manager by providing visual feedback for time-sensitive tasks. It's implemented robustly with proper error handling and works seamlessly across all relevant commands.
