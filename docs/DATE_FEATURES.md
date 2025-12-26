# Date Formatting and Validation Feature Documentation

## Overview

The Task Manager CLI includes comprehensive date handling capabilities through the `src/utils/dateHelper.js` module. This feature ensures data integrity, provides user-friendly date displays, and helps users track overdue tasks.

## Features

### 1. Date Validation

The CLI validates all date inputs to ensure they are in the correct format and represent valid calendar dates.

**Input Format:** `YYYY-MM-DD` (ISO 8601)

**Examples:**
```bash
✓ Valid:   2024-12-31
✓ Valid:   2025-01-01
✓ Valid:   2024-02-29  (leap year)

✗ Invalid: 2024/12/31  (wrong separator)
✗ Invalid: 12-31-2024  (wrong order)
✗ Invalid: 2024-13-01  (invalid month)
✗ Invalid: 2023-02-29  (not a leap year)
✗ Invalid: 2024-1-5    (missing leading zeros)
```

**Validation Rules:**
- Must be a string
- Must match YYYY-MM-DD format exactly
- Must represent a valid calendar date
- Handles leap years correctly
- Provides helpful error messages

### 2. Date Formatting

Dates are automatically formatted for human-readable display throughout the CLI.

**Default Format:** `MMM dd, yyyy` (e.g., "Dec 31, 2024")

**Examples:**
```
2024-12-31 → Dec 31, 2024
2025-01-01 → Jan 01, 2025
2024-06-15 → Jun 15, 2024
```

**Custom Formats:**
The `formatDate()` function supports custom date-fns format strings:
```javascript
formatDate('2024-12-31', 'MMMM dd, yyyy')  // "December 31, 2024"
formatDate('2024-12-31', 'yyyy/MM/dd')      // "2024/12/31"
formatDate('2024-12-31', 'MMM dd')          // "Dec 31"
```

### 3. Overdue Task Detection

The CLI automatically detects and highlights overdue tasks.

**Behavior:**
- Tasks with due dates before today are marked as overdue
- Completed tasks are never marked as overdue
- Overdue tasks appear in **red** (both description and due date)
- Task status icons remain their normal color

**Example:**
```
Pending task due yesterday:     [ ] Fix bug (Due: Dec 25, 2024)  ← Red text
Pending task due tomorrow:      [ ] Review PR (Due: Dec 28, 2024)  ← Gray text
Completed task (was overdue):   [✓] Submit report (Due: Dec 20, 2024)  ← Normal colors
```

### 4. Relative Date Descriptions

Get user-friendly relative date descriptions:

```javascript
Today's date       → "Today"
Tomorrow           → "Tomorrow"
Yesterday          → "Yesterday"
2 days from now    → "In 2 days"
5 days ago         → "5 days ago"
30 days from now   → "Jan 25, 2025" (formatted date)
```

### 5. Flexible Date Parsing

While the CLI requires ISO format input, the `parseToISO()` utility can parse multiple formats:

**Supported Formats:**
- `YYYY-MM-DD` (ISO format)
- `MM/dd/yyyy` (US format)
- `dd/MM/yyyy` (European format)
- `yyyy/MM/dd` (Alternative ISO)
- `MMM dd, yyyy` (e.g., "Dec 31, 2024")
- `MMMM dd, yyyy` (e.g., "December 31, 2024")
- `dd MMM yyyy` (e.g., "31 Dec 2024")

## API Reference

### `validateDate(dateString)`

Validates a date string against the required format and checks for valid date values.

**Parameters:**
- `dateString` (string): The date string to validate

**Returns:**
```javascript
{
  isValid: boolean,      // true if valid, false otherwise
  error?: string,        // Error message if invalid
  date?: Date           // Parsed Date object if valid
}
```

**Examples:**
```javascript
validateDate('2024-12-31')
// → { isValid: true, date: Date(...) }

validateDate('2024/12/31')
// → { isValid: false, error: 'Invalid date format. Please use YYYY-MM-DD...' }

validateDate('2024-13-01')
// → { isValid: false, error: 'Invalid date format. Please use YYYY-MM-DD...' }
```

### `formatDate(dateString, formatString = 'MMM dd, yyyy')`

Formats an ISO date string for display.

**Parameters:**
- `dateString` (string): ISO date string (YYYY-MM-DD)
- `formatString` (string, optional): date-fns format string (default: 'MMM dd, yyyy')

**Returns:** (string) Formatted date string, or original string if invalid

**Examples:**
```javascript
formatDate('2024-12-31')
// → 'Dec 31, 2024'

formatDate('2024-12-31', 'MMMM dd, yyyy')
// → 'December 31, 2024'

formatDate('invalid-date')
// → 'invalid-date' (returns original)
```

### `isTaskOverdue(task)`

Determines if a task is overdue based on its due date and status.

**Parameters:**
- `task` (Object): Task object with `dueDate` and `status` properties

**Returns:** (boolean) `true` if task is overdue, `false` otherwise

**Logic:**
- Returns `false` if task has no due date
- Returns `false` if task status is 'completed'
- Returns `true` if due date is before today (start of day)
- Returns `false` if date parsing fails

**Examples:**
```javascript
isTaskOverdue({ dueDate: '2024-01-01', status: 'pending' })
// → true (assuming today is after Jan 1, 2024)

isTaskOverdue({ dueDate: '2025-12-31', status: 'pending' })
// → false (future date)

isTaskOverdue({ dueDate: '2024-01-01', status: 'completed' })
// → false (completed tasks are never overdue)

isTaskOverdue({ status: 'pending' })
// → false (no due date)
```

### `parseToISO(dateString)`

Attempts to parse various date formats and convert to ISO format (YYYY-MM-DD).

**Parameters:**
- `dateString` (string): Date string in any supported format

**Returns:**
```javascript
{
  success: boolean,      // true if parsed successfully
  isoDate?: string,      // ISO formatted date if successful
  error?: string         // Error message if unsuccessful
}
```

**Examples:**
```javascript
parseToISO('2024-12-31')
// → { success: true, isoDate: '2024-12-31' }

parseToISO('12/31/2024')
// → { success: true, isoDate: '2024-12-31' }

parseToISO('Dec 31, 2024')
// → { success: true, isoDate: '2024-12-31' }

parseToISO('not-a-date')
// → { success: false, error: 'Unable to parse date...' }
```

### `getRelativeDate(dateString)`

Returns a human-readable relative date description.

**Parameters:**
- `dateString` (string): ISO date string (YYYY-MM-DD)

**Returns:** (string) Relative date description or formatted date

**Logic:**
- Past dates: "Yesterday", "2 days ago", etc.
- Today: "Today"
- Future dates: "Tomorrow", "In 3 days", etc.
- Dates beyond 7 days: Formatted date string

**Examples:**
```javascript
getRelativeDate('2024-12-26') // Assuming today is Dec 26
// → 'Today'

getRelativeDate('2024-12-27')
// → 'Tomorrow'

getRelativeDate('2024-12-25')
// → 'Yesterday'

getRelativeDate('2024-12-29')
// → 'In 3 days'

getRelativeDate('2025-02-01')
// → 'Feb 01, 2025'
```

## CLI Integration

### Adding Tasks with Due Dates

```bash
# Valid date format
node src/task.js add "Submit report" --due 2024-12-31
# Output: ✅ Task added: #123 "Submit report" (Due: Dec 31, 2024)

# Invalid date format
node src/task.js add "Task" --due 12/31/2024
# Output: ❌ Error: Invalid date format. Please use YYYY-MM-DD (e.g., 2024-12-31)

# Invalid date values
node src/task.js add "Task" --due 2024-13-45
# Output: ❌ Error: Invalid date format. Please use YYYY-MM-DD (e.g., 2024-12-31)
```

### Viewing Tasks with Formatted Dates

```bash
node src/task.js list

# Output:
# 📋 Your Tasks:
#
#  [ ] [1] Buy groceries
#  [ ] [2] Fix bug (Due: Dec 31, 2024)             ← Future date (gray)
#  [ ] [3] Submit report (Due: Dec 25, 2024)       ← Overdue (red)
#  [✓] [4] Team meeting (Due: Dec 20, 2024)        ← Completed (normal)
```

### Searching Tasks

Search results also display formatted dates and highlight overdue tasks:

```bash
node src/task.js search "report"

# Output:
# 🔍 Search results for "report":
#
#  [ ] [3] Submit report (Due: Dec 25, 2024)  ← Overdue (red if applicable)
```

### Statistics

The stats command includes overdue task count:

```bash
node src/task.js stats

# Output:
# 📊 Task Statistics:
#    Total: 10 tasks
#    Completed: 6 (60%)
#    Pending: 4 (40%)
#    Overdue: 2                    ← Shows count of overdue tasks
#
#    By Priority:
#    🔴 High: 2
#    🟡 Medium: 3
#    🟢 Low: 5
```

## Testing

The date helper module includes comprehensive test coverage:

### Running Tests

```bash
# Run all tests
npm test

# Run date validation demo
node test-date-validation.js

# Run overdue feature demo
node test-overdue.js
```

### Test Coverage

- **34 unit tests** covering all date functions
- **Edge cases:** Leap years, invalid dates, null values, parsing errors
- **Integration tests:** CLI command validation, display formatting
- **100% code coverage** for `src/utils/dateHelper.js`

### Test Categories

1. **Validation Tests:**
   - Valid ISO formats
   - Invalid formats (wrong separator, order, etc.)
   - Invalid date values (month 13, day 45, etc.)
   - Edge cases (leap years, null, undefined, non-strings)

2. **Formatting Tests:**
   - Default format
   - Custom formats
   - Invalid date handling
   - Various month/day combinations

3. **Overdue Detection Tests:**
   - Past dates (overdue)
   - Future dates (not overdue)
   - Completed tasks (never overdue)
   - Tasks without due dates
   - Invalid dates (graceful handling)

4. **Parsing Tests:**
   - Multiple input formats
   - Successful conversions to ISO
   - Unparseable dates (error handling)

5. **Relative Date Tests:**
   - Today, Tomorrow, Yesterday
   - Near future/past (within 7 days)
   - Distant dates (beyond 7 days)
   - Invalid dates (graceful handling)

## Error Handling

The module includes robust error handling:

1. **Invalid Input Types:**
   - Null/undefined → Returns error message
   - Non-string values → Returns error message
   - Empty strings → Returns error message

2. **Invalid Date Formats:**
   - Wrong separators (/, .) → Helpful error message
   - Wrong order (MM-DD-YYYY) → Helpful error message
   - Missing leading zeros → Helpful error message

3. **Invalid Date Values:**
   - Month > 12 → Validation error
   - Day > 31 → Validation error
   - Feb 29 on non-leap years → Validation error

4. **Parsing Errors:**
   - Unparseable dates → Returns original string
   - Format failures → Graceful fallback

## Best Practices

### For Users

1. **Always use ISO format** when adding tasks: `YYYY-MM-DD`
2. **Include leading zeros** for months and days: `2024-01-05` not `2024-1-5`
3. **Use hyphens** as separators: `2024-12-31` not `2024/12/31`

### For Developers

1. **Always validate dates** before storing them
2. **Use formatDate()** for display, never show raw ISO strings
3. **Check isTaskOverdue()** before applying overdue styling
4. **Handle errors gracefully** - invalid dates shouldn't crash the app
5. **Test edge cases** - leap years, end of month, etc.

## Dependencies

The date helper module uses the **date-fns** library (v2.30.0):

- `parseISO` - Parse ISO date strings
- `format` - Format dates with custom patterns
- `parse` - Parse various date formats
- `isValid` - Validate Date objects
- `isBefore` - Compare dates
- `startOfDay` - Normalize dates to start of day

## Future Enhancements

Potential improvements for future versions:

1. **Time Support:**
   - Add time-of-day to due dates
   - Support for time zones
   - Hour/minute precision for due dates

2. **Natural Language Parsing:**
   - "tomorrow", "next week", "in 3 days"
   - "end of month", "next Monday"
   - Relative date input

3. **Recurring Tasks:**
   - Daily, weekly, monthly repetition
   - Custom recurrence patterns
   - Automatic due date updates

4. **Date Ranges:**
   - Start and end dates
   - Duration tracking
   - Date range filtering

5. **Calendar Integration:**
   - Export to .ics format
   - Import from calendar apps
   - Sync with external calendars

## Conclusion

The date formatting and validation feature provides a robust foundation for date handling in the Task Manager CLI. With comprehensive validation, user-friendly formatting, and excellent error handling, users can confidently manage task due dates while maintaining data integrity.
