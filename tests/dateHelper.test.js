const {
  validateDate,
  formatDate,
  isTaskOverdue,
  parseToISO,
  getRelativeDate
} = require('../src/utils/dateHelper');

describe('Date Helper Utility', () => {
  describe('validateDate', () => {
    test('should validate correct ISO date format (YYYY-MM-DD)', () => {
      const result = validateDate('2024-12-31');
      expect(result.isValid).toBe(true);
      expect(result.date).toBeDefined();
    });

    test('should reject invalid date format', () => {
      const result = validateDate('12/31/2024');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('YYYY-MM-DD');
    });

    test('should reject invalid date values', () => {
      const result = validateDate('2024-13-45');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should reject empty string', () => {
      const result = validateDate('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should reject null or undefined', () => {
      const result1 = validateDate(null);
      expect(result1.isValid).toBe(false);
      
      const result2 = validateDate(undefined);
      expect(result2.isValid).toBe(false);
    });

    test('should reject non-string input', () => {
      const result = validateDate(12345);
      expect(result.isValid).toBe(false);
    });

    test('should reject date with wrong separator', () => {
      const result = validateDate('2024/12/31');
      expect(result.isValid).toBe(false);
    });

    test('should reject date without leading zeros', () => {
      const result = validateDate('2024-1-5');
      expect(result.isValid).toBe(false);
    });
  });

  describe('formatDate', () => {
    test('should format ISO date to default format (MMM dd, yyyy)', () => {
      const result = formatDate('2024-12-31');
      expect(result).toBe('Dec 31, 2024');
    });

    test('should format date with custom format', () => {
      const result = formatDate('2024-12-31', 'yyyy/MM/dd');
      expect(result).toBe('2024/12/31');
    });

    test('should format date with full month name', () => {
      const result = formatDate('2024-01-15', 'MMMM dd, yyyy');
      expect(result).toBe('January 15, 2024');
    });

    test('should return original string if date is invalid', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('invalid-date');
    });

    test('should handle various valid dates', () => {
      expect(formatDate('2024-01-01')).toBe('Jan 01, 2024');
      expect(formatDate('2024-06-15')).toBe('Jun 15, 2024');
      expect(formatDate('2024-12-25')).toBe('Dec 25, 2024');
    });
  });

  describe('isTaskOverdue', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    test('should return true for overdue pending task', () => {
      const task = {
        dueDate: yesterday.toISOString().split('T')[0],
        status: 'pending'
      };
      expect(isTaskOverdue(task)).toBe(true);
    });

    test('should return false for future task', () => {
      const task = {
        dueDate: tomorrow.toISOString().split('T')[0],
        status: 'pending'
      };
      expect(isTaskOverdue(task)).toBe(false);
    });

    test('should return false for completed task even if overdue', () => {
      const task = {
        dueDate: yesterday.toISOString().split('T')[0],
        status: 'completed'
      };
      expect(isTaskOverdue(task)).toBe(false);
    });

    test('should return false for task without due date', () => {
      const task = {
        status: 'pending'
      };
      expect(isTaskOverdue(task)).toBe(false);
    });

    test('should return false for task with invalid date', () => {
      const task = {
        dueDate: 'invalid-date',
        status: 'pending'
      };
      expect(isTaskOverdue(task)).toBe(false);
    });

    test('should handle tasks with null dueDate', () => {
      const task = {
        dueDate: null,
        status: 'pending'
      };
      expect(isTaskOverdue(task)).toBe(false);
    });
  });

  describe('parseToISO', () => {
    test('should accept valid ISO format as-is', () => {
      const result = parseToISO('2024-12-31');
      expect(result.success).toBe(true);
      expect(result.isoDate).toBe('2024-12-31');
    });

    test('should parse MM/dd/yyyy format', () => {
      const result = parseToISO('12/31/2024');
      expect(result.success).toBe(true);
      expect(result.isoDate).toBe('2024-12-31');
    });

    test('should parse dd/MM/yyyy format', () => {
      const result = parseToISO('31/12/2024');
      expect(result.success).toBe(true);
      expect(result.isoDate).toBe('2024-12-31');
    });

    test('should parse text date format', () => {
      const result = parseToISO('Dec 31, 2024');
      expect(result.success).toBe(true);
      expect(result.isoDate).toBe('2024-12-31');
    });

    test('should return error for unparseable date', () => {
      const result = parseToISO('not-a-date');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getRelativeDate', () => {
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];

    test('should return "Today" for today\'s date', () => {
      const result = getRelativeDate(todayISO);
      expect(result).toBe('Today');
    });

    test('should return "Tomorrow" for tomorrow', () => {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowISO = tomorrow.toISOString().split('T')[0];
      const result = getRelativeDate(tomorrowISO);
      expect(result).toBe('Tomorrow');
    });

    test('should return "Yesterday" for yesterday', () => {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayISO = yesterday.toISOString().split('T')[0];
      const result = getRelativeDate(yesterdayISO);
      expect(result).toBe('Yesterday');
    });

    test('should return "In X days" for near future dates', () => {
      const future = new Date(today);
      future.setDate(future.getDate() + 3);
      const futureISO = future.toISOString().split('T')[0];
      const result = getRelativeDate(futureISO);
      expect(result).toBe('In 3 days');
    });

    test('should return "X days ago" for recent past dates', () => {
      const past = new Date(today);
      past.setDate(past.getDate() - 5);
      const pastISO = past.toISOString().split('T')[0];
      const result = getRelativeDate(pastISO);
      expect(result).toBe('5 days ago');
    });

    test('should return formatted date for dates beyond 7 days', () => {
      const future = new Date(today);
      future.setDate(future.getDate() + 30);
      const futureISO = future.toISOString().split('T')[0];
      const result = getRelativeDate(futureISO);
      expect(result).toMatch(/\w{3} \d{2}, \d{4}/); // Matches format like "Jan 15, 2024"
    });

    test('should handle invalid date gracefully', () => {
      const result = getRelativeDate('invalid-date');
      expect(result).toBe('invalid-date');
    });
  });

  describe('Integration scenarios', () => {
    test('should validate and format date in typical workflow', () => {
      const dateInput = '2024-12-31';
      
      // Step 1: Validate
      const validation = validateDate(dateInput);
      expect(validation.isValid).toBe(true);
      
      // Step 2: Format for display
      const formatted = formatDate(dateInput);
      expect(formatted).toBe('Dec 31, 2024');
      
      // Step 3: Check if overdue
      const task = { dueDate: dateInput, status: 'pending' };
      const overdue = isTaskOverdue(task);
      expect(typeof overdue).toBe('boolean');
    });

    test('should reject invalid date and provide helpful error', () => {
      const invalidDate = '2024/12/31';
      
      const validation = validateDate(invalidDate);
      expect(validation.isValid).toBe(false);
      expect(validation.error).toContain('YYYY-MM-DD');
    });

    test('should handle edge case dates correctly', () => {
      // Leap year date
      const leapYear = '2024-02-29';
      expect(validateDate(leapYear).isValid).toBe(true);
      expect(formatDate(leapYear)).toBe('Feb 29, 2024');
      
      // Non-leap year
      const nonLeapYear = '2023-02-29';
      expect(validateDate(nonLeapYear).isValid).toBe(false);
    });
  });
});
