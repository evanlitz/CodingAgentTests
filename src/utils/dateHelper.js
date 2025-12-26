const { parseISO, isBefore, startOfDay, format, isValid, parse } = require('date-fns');

/**
 * Validate a date string
 * @param {string} dateString - The date string to validate
 * @returns {Object} Object with isValid boolean and error message if invalid
 */
function validateDate(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return { isValid: false, error: 'Date is required and must be a string' };
  }

  // Try to parse as ISO format (YYYY-MM-DD)
  try {
    const date = parseISO(dateString);
    
    if (!isValid(date)) {
      return { 
        isValid: false, 
        error: 'Invalid date format. Please use YYYY-MM-DD (e.g., 2024-12-31)' 
      };
    }

    // Check if the date string matches the expected format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return { 
        isValid: false, 
        error: 'Invalid date format. Please use YYYY-MM-DD (e.g., 2024-12-31)' 
      };
    }

    return { isValid: true, date };
  } catch (error) {
    return { 
      isValid: false, 
      error: 'Invalid date format. Please use YYYY-MM-DD (e.g., 2024-12-31)' 
    };
  }
}

/**
 * Format a date string for display
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @param {string} formatString - Format string (default: 'MMM dd, yyyy')
 * @returns {string} Formatted date string
 */
function formatDate(dateString, formatString = 'MMM dd, yyyy') {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) {
      return dateString; // Return original if invalid
    }
    return format(date, formatString);
  } catch (error) {
    return dateString; // Return original if formatting fails
  }
}

/**
 * Check if a task is overdue
 * @param {Object} task - The task to check
 * @returns {boolean} True if task is overdue, false otherwise
 */
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

/**
 * Parse various date formats to ISO format (YYYY-MM-DD)
 * @param {string} dateString - The date string to parse
 * @returns {Object} Object with success boolean and ISO date string or error
 */
function parseToISO(dateString) {
  const validation = validateDate(dateString);
  if (validation.isValid) {
    return { success: true, isoDate: dateString };
  }
  
  // Try common alternative formats
  const formats = [
    'MM/dd/yyyy',
    'dd/MM/yyyy',
    'yyyy/MM/dd',
    'MMM dd, yyyy',
    'MMMM dd, yyyy',
    'dd MMM yyyy'
  ];

  for (const formatStr of formats) {
    try {
      const date = parse(dateString, formatStr, new Date());
      if (isValid(date)) {
        return { success: true, isoDate: format(date, 'yyyy-MM-dd') };
      }
    } catch (error) {
      continue;
    }
  }

  return { 
    success: false, 
    error: 'Unable to parse date. Please use YYYY-MM-DD format (e.g., 2024-12-31)' 
  };
}

/**
 * Get relative date description (e.g., "Today", "Tomorrow", "In 3 days")
 * @param {string} dateString - ISO date string
 * @returns {string} Relative date description
 */
function getRelativeDate(dateString) {
  try {
    const date = startOfDay(parseISO(dateString));
    const today = startOfDay(new Date());
    
    const diffInMs = date.getTime() - today.getTime();
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) {
      const absDiff = Math.abs(diffInDays);
      if (absDiff === 1) return 'Yesterday';
      return `${absDiff} days ago`;
    } else if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Tomorrow';
    } else if (diffInDays <= 7) {
      return `In ${diffInDays} days`;
    } else {
      return formatDate(dateString);
    }
  } catch (error) {
    return dateString;
  }
}

module.exports = {
  validateDate,
  formatDate,
  isTaskOverdue,
  parseToISO,
  getRelativeDate
};
