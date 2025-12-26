# Date Helper Utility

A comprehensive date validation and formatting utility for the Task Manager CLI.

## Overview

The `dateHelper.js` module provides a suite of functions for handling dates in the task manager application. It uses the `date-fns` library for robust date manipulation and formatting.

## Features

- **Date Validation**: Ensures dates are in the correct format (YYYY-MM-DD) and represent valid dates
- **Date Formatting**: Converts ISO date strings to human-readable formats
- **Overdue Detection**: Determines if tasks are past their due date
- **Multi-format Parsing**: Parses various date formats to ISO standard
- **Relative Dates**: Provides relative date descriptions (e.g., "Today", "Tomorrow", "3 days ago")

## Functions

### `validateDate(dateString)`

Validates that a date string is in the correct ISO format (YYYY-MM-DD) and represents a valid date.

**Parameters:**
- `dateString` (string): The date string to validate

**Returns:**
- Object with:
  - `isValid` (boolean): Whether the date is valid
  - `date` (Date): Parsed date object (if valid)
  - `error` (string): Error message (if invalid)

**Example:**
```javascript
const { validateDate } = require('./utils/dateHelper');

const result = validateDate('2024-12-31');
if (result.isValid) {
  console.log('Valid date:', result.date);
} else {
  console.error('Error:', result.error);
}
```

**Edge Cases:**
- Validates leap years correctly (2024-02-29 is valid, 2023-02-29 is not)
- Rejects dates with wrong separators (2024/12/31)
- Rejects dates without leading zeros (2024-1-5)
- Handles null, undefined, and non-string inputs gracefully

---

### `formatDate(dateString, formatString = 'MMM dd, yyyy')`

Formats an ISO date string for display.

**Parameters:**
- `dateString` (string): ISO date string (YYYY-MM-DD)
- `formatString` (string, optional): Format pattern (default: 'MMM dd, yyyy')

**Returns:**
- Formatted date string, or original string if invalid

**Example:**
```javascript
const { formatDate } = require('./utils/dateHelper');

formatDate('2024-12-31'); // "Dec 31, 2024"
formatDate('2024-12-31', 'MMMM dd, yyyy'); // "December 31, 2024"
formatDate('2024-12-31', 'yyyy/MM/dd'); // "2024/12/31"
```

**Common Format Patterns:**
- `'MMM dd, yyyy'` → "Dec 31, 2024"
- `'MMMM dd, yyyy'` → "December 31, 2024"
- `'yyyy-MM-dd'` → "2024-12-31"
- `'MM/dd/yyyy'` → "12/31/2024"
- `'dd MMM yyyy'` → "31 Dec 2024"

---

### `isTaskOverdue(task)`

Checks if a task is overdue based on its due date and status.

**Parameters:**
- `task` (Object): Task object with `dueDate` and `status` properties

**Returns:**
- `true` if task is overdue (past due date and not completed)
- `false` otherwise

**Example:**
```javascript
const { isTaskOverdue } = require('./utils/dateHelper');

const task = {
  dueDate: '2024-01-01',
  status: 'pending'
};

if (isTaskOverdue(task)) {
  console.log('Task is overdue!');
}
```

**Rules:**
- Returns `false` if task has no due date
- Returns `false` if task is completed (regardless of due date)
- Returns `false` if date parsing fails
- Compares dates at the start of day (ignores time)

---

### `parseToISO(dateString)`

Attempts to parse various date formats to ISO standard (YYYY-MM-DD).

**Parameters:**
- `dateString` (string): Date string in various formats

**Returns:**
- Object with:
  - `success` (boolean): Whether parsing succeeded
  - `isoDate` (string): ISO formatted date (if successful)
  - `error` (string): Error message (if failed)

**Example:**
```javascript
const { parseToISO } = require('./utils/dateHelper');

parseToISO('2024-12-31');      // { success: true, isoDate: '2024-12-31' }
parseToISO('12/31/2024');      // { success: true, isoDate: '2024-12-31' }
parseToISO('Dec 31, 2024');    // { success: true, isoDate: '2024-12-31' }
parseToISO('31/12/2024');      // { success: true, isoDate: '2024-12-31' }
parseToISO('not-a-date');      // { success: false, error: '...' }
```

**Supported Formats:**
- ISO: `YYYY-MM-DD`
- US: `MM/dd/yyyy`
- European: `dd/MM/yyyy`
- Alt ISO: `yyyy/MM/dd`
- Text: `MMM dd, yyyy`, `MMMM dd, yyyy`, `dd MMM yyyy`

---

### `getRelativeDate(dateString)`

Converts a date to a relative description.

**Parameters:**
- `dateString` (string): ISO date string (YYYY-MM-DD)

**Returns:**
- Relative date description (string)

**Example:**
```javascript
const { getRelativeDate } = require('./utils/dateHelper');

getRelativeDate('2024-12-26'); // If today is 2024-12-26: "Today"
getRelativeDate('2024-12-27'); // If today is 2024-12-26: "Tomorrow"
getRelativeDate('2024-12-25'); // If today is 2024-12-26: "Yesterday"
getRelativeDate('2024-12-29'); // If today is 2024-12-26: "In 3 days"
getRelativeDate('2024-12-20'); // If today is 2024-12-26: "6 days ago"
getRelativeDate('2025-02-15'); // If today is 2024-12-26: "Feb 15, 2025"
```

**Relative Descriptions:**
- Same day: "Today"
- Next day: "Tomorrow"
- Previous day: "Yesterday"
- Within 7 days future: "In X days"
- Recent past: "X days ago"
- Beyond 7 days: Formatted date (e.g., "Feb 15, 2025")

---

## Usage in Task Manager CLI

### Date Validation

When adding a task with a due date, the date is validated:

```bash
# Valid date
node src/task.js add "Submit report" --due 2024-12-31
# ✅ Task added: #123 "Submit report" (Due: Dec 31, 2024)

# Invalid format
node src/task.js add "Submit report" --due 12/31/2024
# ❌ Error: Invalid date format. Please use YYYY-MM-DD (e.g., 2024-12-31)

# Invalid date values
node src/task.js add "Submit report" --due 2024-13-45
# ❌ Error: Invalid date format. Please use YYYY-MM-DD (e.g., 2024-12-31)
```

### Date Formatting

Dates are displayed in human-readable format throughout the CLI:

```bash
node src/task.js list
# 📋 Your Tasks:
#  [ ] [1] Submit report (Due: Dec 31, 2024)
#  [ ] [2] Review code (Due: Jan 15, 2025)
```

### Overdue Detection

Overdue tasks are automatically highlighted in red:

```bash
node src/task.js list
# 📋 Your Tasks:
#  [ ] [1] Old task (Due: Jan 01, 2024)  # Shown in red
#  [ ] [2] Future task (Due: Dec 31, 2025)  # Normal color
```

## Testing

The date helper utility has comprehensive test coverage with 34 unit tests covering:

- Valid and invalid date formats
- Edge cases (leap years, null values, invalid inputs)
- Date formatting with various patterns
- Overdue detection logic
- Multi-format parsing
- Relative date descriptions
- Integration scenarios

Run tests:
```bash
npm test tests/dateHelper.test.js
```

## Dependencies

- `date-fns`: Modern JavaScript date utility library
  - `parseISO`: Parse ISO 8601 date strings
  - `format`: Format dates with custom patterns
  - `isValid`: Check if date is valid
  - `parse`: Parse dates from strings
  - `isBefore`: Compare dates
  - `startOfDay`: Normalize dates to start of day

## Error Handling

All functions handle errors gracefully:

- Invalid inputs return appropriate error messages
- Date parsing errors don't crash the application
- Functions return sensible defaults when errors occur
- Error messages are user-friendly and actionable

## Best Practices

1. **Always validate dates** before saving to storage
2. **Use ISO format** (YYYY-MM-DD) for internal storage
3. **Format dates** for display to users
4. **Handle null/undefined** dates gracefully
5. **Normalize dates** to start of day for comparisons
6. **Provide helpful error messages** for validation failures

## Future Enhancements

Potential improvements for future versions:

- [ ] Support for time zones
- [ ] Recurring task dates
- [ ] Date range validation (e.g., not before today)
- [ ] Natural language date parsing ("tomorrow", "next week")
- [ ] Custom date format preferences
- [ ] Date calculation utilities (add days, weeks, etc.)
