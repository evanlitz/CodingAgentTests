const fs = require('fs');
const path = require('path');

// Path to the tasks.json file
const TASKS_FILE = path.join(__dirname, '..', 'tasks.json');

/**
 * Get all tasks from storage
 * @returns {Array} Array of task objects
 */
function getTasks() {
  try {
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
}

/**
 * Save tasks to storage
 * @param {Array} tasks - Array of task objects
 */
function saveTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

/**
 * Add a new task
 * @param {Object} task - Task object to add
 * @returns {Object} The added task
 */
function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

/**
 * Update a task by ID
 * @param {number} id - Task ID
 * @param {Object} updates - Object with fields to update
 * @returns {Object} The updated task
 */
function updateTask(id, updates) {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    throw new Error(`Task #${id} not found`);
  }
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
  saveTasks(tasks);
  return tasks[taskIndex];
}

/**
 * Delete a task by ID
 * @param {number} id - Task ID
 * @returns {boolean} True if task was deleted
 */
function deleteTask(id) {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    throw new Error(`Task #${id} not found`);
  }
  
  tasks.splice(taskIndex, 1);
  saveTasks(tasks);
  return true;
}

module.exports = {
  getTasks,
  saveTasks,
  addTask,
  updateTask,
  deleteTask
};
