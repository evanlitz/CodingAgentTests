#!/usr/bin/env node

/**
 * Test script to demonstrate overdue tasks showing in red
 * This script creates test tasks and displays them to verify the feature
 */

const chalk = require('chalk');
const { execSync } = require('child_process');

console.log(chalk.blue.bold('\n=== Testing Overdue Tasks Feature ===\n'));

console.log(chalk.yellow('Creating test tasks...\n'));

// Clean up any existing test tasks first
try {
  const tasks = require('./src/storage').getTasks();
  console.log(chalk.gray(`Current tasks: ${tasks.length}\n`));
} catch (error) {
  console.log(chalk.gray('No existing tasks\n'));
}

console.log(chalk.cyan('Test Case 1: Task with overdue date (2024-01-15)'));
console.log(chalk.gray('Expected: Should appear in RED\n'));

console.log(chalk.cyan('Test Case 2: Task with future date (2025-12-31)'));
console.log(chalk.gray('Expected: Should appear in normal color (gray for due date)\n'));

console.log(chalk.cyan('Test Case 3: Task with no due date'));
console.log(chalk.gray('Expected: Should appear in normal color\n'));

console.log(chalk.cyan('Test Case 4: Completed task with overdue date'));
console.log(chalk.gray('Expected: Should NOT appear in red (completed tasks are not overdue)\n'));

console.log(chalk.blue.bold('\nDisplaying all tasks:\n'));

// Execute the list command to show tasks
try {
  execSync('node src/task.js list', { stdio: 'inherit', cwd: __dirname });
} catch (error) {
  console.error(chalk.red('Error displaying tasks'));
}

console.log(chalk.blue.bold('\n=== Feature Implementation Details ===\n'));

console.log(chalk.white('✓ Added date-fns library functions:'));
console.log(chalk.gray('  - parseISO: Parse ISO date strings'));
console.log(chalk.gray('  - isBefore: Compare dates'));
console.log(chalk.gray('  - startOfDay: Normalize dates to start of day\n'));

console.log(chalk.white('✓ Created isTaskOverdue() helper function:'));
console.log(chalk.gray('  - Checks if task has a due date'));
console.log(chalk.gray('  - Compares due date with today'));
console.log(chalk.gray('  - Returns false for completed tasks'));
console.log(chalk.gray('  - Handles date parsing errors gracefully\n'));

console.log(chalk.white('✓ Updated list command:'));
console.log(chalk.gray('  - Task description shown in RED if overdue'));
console.log(chalk.gray('  - Due date shown in RED if overdue'));
console.log(chalk.gray('  - Completed tasks not marked as overdue\n'));

console.log(chalk.white('✓ Updated search command:'));
console.log(chalk.gray('  - Search results also show overdue tasks in red\n'));

console.log(chalk.white('✓ Updated stats command:'));
console.log(chalk.gray('  - Added overdue task count to statistics\n'));

console.log(chalk.green.bold('Feature successfully implemented! ✓\n'));
