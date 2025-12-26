#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const path = require('path');
const readline = require('readline');

// Create the CLI program
const program = new Command();

// Set up the CLI program
program
  .name('task')
  .description('A fully-featured command-line task manager')
  .version('1.0.0');

// Add command - Add a new task
program
  .command('add <description>')
  .description('Add a new task')
  .option('-p, --priority <level>', 'Set priority (low, medium, high)', 'medium')
  .option('-d, --due <date>', 'Set due date (YYYY-MM-DD)')
  .option('-c, --category <category>', 'Set task category')
  .action((description, options) => {
    try {
      const storage = require('./storage');
      
      // Validate description
      if (!description || description.trim() === '') {
        console.error(chalk.red('❌ Error: Task description cannot be empty'));
        process.exit(1);
      }

      // Create task object
      const task = {
        id: Date.now(),
        description: description.trim(),
        status: 'pending',
        priority: options.priority || 'medium',
        createdAt: new Date().toISOString()
      };

      // Add optional fields
      if (options.due) {
        task.dueDate = options.due;
      }
      if (options.category) {
        task.category = options.category;
      }

      // Save task
      storage.addTask(task);
      
      // Format output message
      let message = `✅ Task added: #${task.id} "${task.description}"`;
      if (options.priority && options.priority !== 'medium') {
        message += ` (Priority: ${options.priority.toUpperCase()})`;
      }
      if (options.due) {
        message += ` (Due: ${options.due})`;
      }
      if (options.category) {
        message += ` [${options.category}]`;
      }
      
      console.log(chalk.green(message));
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// List command - Show all tasks
program
  .command('list')
  .description('List all tasks')
  .option('-s, --status <status>', 'Filter by status (pending, completed)')
  .option('-p, --priority <level>', 'Filter by priority (low, medium, high)')
  .option('-c, --category <category>', 'Filter by category')
  .option('--sort <field>', 'Sort by field (priority, due, status)')
  .action((options) => {
    try {
      const storage = require('./storage');
      let tasks = storage.getTasks();

      // Apply filters
      if (options.status) {
        tasks = tasks.filter(task => task.status === options.status);
      }
      if (options.priority) {
        tasks = tasks.filter(task => task.priority === options.priority);
      }
      if (options.category) {
        tasks = tasks.filter(task => task.category === options.category);
      }

      // Apply sorting
      if (options.sort) {
        tasks = sortTasks(tasks, options.sort);
      }

      // Display tasks
      if (tasks.length === 0) {
        console.log(chalk.yellow('📋 No tasks found.'));
        return;
      }

      console.log(chalk.blue.bold('\n📋 Your Tasks:\n'));
      tasks.forEach(task => {
        const statusIcon = task.status === 'completed' ? chalk.green('[✓]') : chalk.white('[ ]');
        const priorityIcon = getPriorityIcon(task.priority);
        
        let line = ` ${statusIcon} [${task.id}] ${task.description}`;
        
        if (task.priority && task.priority !== 'medium') {
          line += ` ${priorityIcon}`;
        }
        if (task.dueDate) {
          line += ` ${chalk.gray(`(Due: ${task.dueDate})`)}`;
        }
        if (task.category) {
          line += ` ${chalk.cyan(`[${task.category}]`)}`;
        }

        console.log(line);
      });
      console.log('');
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Done command - Mark task as complete
program
  .command('done <id>')
  .description('Mark a task as complete')
  .action((id) => {
    try {
      const storage = require('./storage');
      const taskId = parseInt(id);
      
      if (isNaN(taskId)) {
        console.error(chalk.red('❌ Error: Invalid task ID'));
        process.exit(1);
      }

      storage.updateTask(taskId, { status: 'completed' });
      console.log(chalk.green(`✅ Task #${taskId} marked as complete`));
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Delete command - Remove a task
program
  .command('delete <id>')
  .description('Delete a task')
  .option('-f, --force', 'Skip confirmation prompt')
  .action(async (id, options) => {
    try {
      const storage = require('./storage');
      const taskId = parseInt(id);
      
      if (isNaN(taskId)) {
        console.error(chalk.red('❌ Error: Invalid task ID'));
        process.exit(1);
      }

      // Get the task to show it in the confirmation
      const tasks = storage.getTasks();
      const task = tasks.find(t => t.id === taskId);
      
      if (!task) {
        console.error(chalk.red(`❌ Error: Task #${taskId} not found`));
        process.exit(1);
      }

      // If force flag is provided, skip confirmation
      if (options.force) {
        storage.deleteTask(taskId);
        console.log(chalk.green(`🗑️  Task #${taskId} deleted`));
        return;
      }

      // Show task details and ask for confirmation
      console.log(chalk.yellow(`\nYou are about to delete:`));
      console.log(chalk.white(`  [${task.id}] ${task.description}`));
      
      const confirmed = await confirmAction('Are you sure you want to delete this task? (y/n): ');
      
      if (confirmed) {
        storage.deleteTask(taskId);
        console.log(chalk.green(`🗑️  Task #${taskId} deleted`));
      } else {
        console.log(chalk.blue('Delete operation cancelled.'));
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Search command - Search tasks by text
program
  .command('search <query>')
  .description('Search tasks by description')
  .action((query) => {
    try {
      const storage = require('./storage');
      const tasks = storage.getTasks();
      const results = tasks.filter(task => 
        task.description.toLowerCase().includes(query.toLowerCase())
      );

      if (results.length === 0) {
        console.log(chalk.yellow(`📋 No tasks found matching "${query}"`));
        return;
      }

      console.log(chalk.blue.bold(`\n🔍 Search results for "${query}":\n`));
      results.forEach(task => {
        const statusIcon = task.status === 'completed' ? chalk.green('[✓]') : chalk.white('[ ]');
        console.log(` ${statusIcon} [${task.id}] ${task.description}`);
      });
      console.log('');
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Stats command - Show task statistics
program
  .command('stats')
  .description('Show task statistics')
  .action(() => {
    try {
      const storage = require('./storage');
      const tasks = storage.getTasks();

      if (tasks.length === 0) {
        console.log(chalk.yellow('📊 No tasks to show statistics for.'));
        return;
      }

      const completed = tasks.filter(t => t.status === 'completed').length;
      const pending = tasks.filter(t => t.status === 'pending').length;
      const percentage = Math.round((completed / tasks.length) * 100);

      // Count by priority
      const priorities = { low: 0, medium: 0, high: 0 };
      tasks.forEach(task => {
        if (priorities[task.priority] !== undefined) {
          priorities[task.priority]++;
        }
      });

      console.log(chalk.blue.bold('\n📊 Task Statistics:\n'));
      console.log(`   Total: ${tasks.length} tasks`);
      console.log(`   ${chalk.green(`Completed: ${completed} (${percentage}%)`)} `);
      console.log(`   ${chalk.yellow(`Pending: ${pending} (${100 - percentage}%)`)} `);
      console.log('');
      console.log('   By Priority:');
      console.log(`   🔴 High: ${priorities.high}`);
      console.log(`   🟡 Medium: ${priorities.medium}`);
      console.log(`   🟢 Low: ${priorities.low}`);
      console.log('');
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Helper functions
function getPriorityIcon(priority) {
  switch (priority) {
    case 'high':
      return chalk.red('🔴 HIGH');
    case 'low':
      return chalk.green('🟢 LOW');
    case 'medium':
    default:
      return chalk.yellow('🟡 MEDIUM');
  }
}

function sortTasks(tasks, field) {
  const sorted = [...tasks];
  
  switch (field) {
    case 'priority':
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      break;
    case 'due':
      sorted.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      break;
    case 'status':
      sorted.sort((a, b) => {
        if (a.status === 'pending' && b.status === 'completed') return -1;
        if (a.status === 'completed' && b.status === 'pending') return 1;
        return 0;
      });
      break;
    default:
      break;
  }
  
  return sorted;
}

/**
 * Prompt user for confirmation
 * @param {string} question - The question to ask the user
 * @returns {Promise<boolean>} True if user confirmed (y/yes), false otherwise
 */
function confirmAction(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(chalk.yellow(question), (answer) => {
      rl.close();
      const normalized = answer.trim().toLowerCase();
      resolve(normalized === 'y' || normalized === 'yes');
    });
  });
}

// Parse command line arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
