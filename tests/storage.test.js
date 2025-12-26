const fs = require('fs');
const path = require('path');
const { 
  getTasks, 
  saveTasks, 
  addTask, 
  updateTask, 
  deleteTask 
} = require('../src/storage');

// Mock the tasks.json file path
const TASKS_FILE = path.join(__dirname, '..', 'tasks.json');

describe('Storage Operations', () => {
  let originalTasks;

  beforeEach(() => {
    // Backup existing tasks
    try {
      originalTasks = fs.readFileSync(TASKS_FILE, 'utf8');
    } catch (error) {
      originalTasks = null;
    }
    // Start with empty tasks
    saveTasks([]);
  });

  afterEach(() => {
    // Restore original tasks
    if (originalTasks) {
      fs.writeFileSync(TASKS_FILE, originalTasks, 'utf8');
    } else {
      try {
        fs.unlinkSync(TASKS_FILE);
      } catch (error) {
        // File might not exist, that's ok
      }
    }
  });

  describe('getTasks', () => {
    test('should return empty array when no tasks exist', () => {
      const tasks = getTasks();
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.length).toBe(0);
    });

    test('should return all tasks from storage', () => {
      const testTasks = [
        { id: 1, description: 'Task 1', status: 'pending' },
        { id: 2, description: 'Task 2', status: 'completed' }
      ];
      saveTasks(testTasks);
      
      const tasks = getTasks();
      expect(tasks).toEqual(testTasks);
      expect(tasks.length).toBe(2);
    });

    test('should handle corrupted file gracefully', () => {
      fs.writeFileSync(TASKS_FILE, 'invalid json', 'utf8');
      const tasks = getTasks();
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.length).toBe(0);
    });
  });

  describe('saveTasks', () => {
    test('should save tasks to file', () => {
      const testTasks = [
        { id: 1, description: 'Test task', status: 'pending' }
      ];
      saveTasks(testTasks);
      
      const savedData = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
      expect(savedData).toEqual(testTasks);
    });

    test('should overwrite existing tasks', () => {
      saveTasks([{ id: 1, description: 'First' }]);
      saveTasks([{ id: 2, description: 'Second' }]);
      
      const tasks = getTasks();
      expect(tasks.length).toBe(1);
      expect(tasks[0].id).toBe(2);
    });

    test('should save empty array', () => {
      saveTasks([{ id: 1, description: 'Task' }]);
      saveTasks([]);
      
      const tasks = getTasks();
      expect(tasks.length).toBe(0);
    });
  });

  describe('addTask', () => {
    test('should add a new task', () => {
      const newTask = {
        id: 1,
        description: 'New task',
        status: 'pending',
        priority: 'medium'
      };
      
      const added = addTask(newTask);
      expect(added).toEqual(newTask);
      
      const tasks = getTasks();
      expect(tasks.length).toBe(1);
      expect(tasks[0]).toEqual(newTask);
    });

    test('should add multiple tasks', () => {
      addTask({ id: 1, description: 'Task 1', status: 'pending' });
      addTask({ id: 2, description: 'Task 2', status: 'pending' });
      
      const tasks = getTasks();
      expect(tasks.length).toBe(2);
    });

    test('should preserve task properties', () => {
      const task = {
        id: 1,
        description: 'Complex task',
        status: 'pending',
        priority: 'high',
        dueDate: '2024-12-31',
        category: 'work',
        createdAt: new Date().toISOString()
      };
      
      addTask(task);
      const tasks = getTasks();
      expect(tasks[0]).toEqual(task);
    });
  });

  describe('updateTask', () => {
    beforeEach(() => {
      saveTasks([
        { id: 1, description: 'Task 1', status: 'pending', priority: 'low' },
        { id: 2, description: 'Task 2', status: 'pending', priority: 'high' }
      ]);
    });

    test('should update task status', () => {
      const updated = updateTask(1, { status: 'completed' });
      expect(updated.status).toBe('completed');
      expect(updated.description).toBe('Task 1');
    });

    test('should update multiple properties', () => {
      const updates = {
        description: 'Updated description',
        priority: 'high',
        dueDate: '2024-12-31'
      };
      
      const updated = updateTask(1, updates);
      expect(updated.description).toBe('Updated description');
      expect(updated.priority).toBe('high');
      expect(updated.dueDate).toBe('2024-12-31');
    });

    test('should throw error for non-existent task', () => {
      expect(() => {
        updateTask(999, { status: 'completed' });
      }).toThrow('Task #999 not found');
    });

    test('should only update specified task', () => {
      updateTask(1, { status: 'completed' });
      
      const tasks = getTasks();
      expect(tasks[0].status).toBe('completed');
      expect(tasks[1].status).toBe('pending');
    });

    test('should preserve other task properties', () => {
      const original = getTasks()[0];
      updateTask(1, { status: 'completed' });
      
      const updated = getTasks()[0];
      expect(updated.id).toBe(original.id);
      expect(updated.description).toBe(original.description);
      expect(updated.priority).toBe(original.priority);
    });
  });

  describe('deleteTask', () => {
    beforeEach(() => {
      saveTasks([
        { id: 1, description: 'Task 1', status: 'pending' },
        { id: 2, description: 'Task 2', status: 'completed' },
        { id: 3, description: 'Task 3', status: 'pending' }
      ]);
    });

    test('should delete existing task', () => {
      const result = deleteTask(2);
      expect(result).toBe(true);
      
      const tasks = getTasks();
      expect(tasks.length).toBe(2);
      expect(tasks.find(t => t.id === 2)).toBeUndefined();
    });

    test('should throw error for non-existent task', () => {
      expect(() => {
        deleteTask(999);
      }).toThrow('Task #999 not found');
    });

    test('should delete first task', () => {
      deleteTask(1);
      
      const tasks = getTasks();
      expect(tasks.length).toBe(2);
      expect(tasks[0].id).toBe(2);
    });

    test('should delete last task', () => {
      deleteTask(3);
      
      const tasks = getTasks();
      expect(tasks.length).toBe(2);
      expect(tasks[tasks.length - 1].id).toBe(2);
    });

    test('should delete all tasks one by one', () => {
      deleteTask(1);
      deleteTask(2);
      deleteTask(3);
      
      const tasks = getTasks();
      expect(tasks.length).toBe(0);
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle rapid consecutive operations', () => {
      addTask({ id: 1, description: 'Task 1', status: 'pending' });
      updateTask(1, { status: 'completed' });
      addTask({ id: 2, description: 'Task 2', status: 'pending' });
      deleteTask(1);
      
      const tasks = getTasks();
      expect(tasks.length).toBe(1);
      expect(tasks[0].id).toBe(2);
    });

    test('should handle empty task object', () => {
      const emptyTask = {};
      addTask(emptyTask);
      
      const tasks = getTasks();
      expect(tasks.length).toBe(1);
      expect(tasks[0]).toEqual(emptyTask);
    });

    test('should handle tasks with special characters', () => {
      const task = {
        id: 1,
        description: 'Task with "quotes" and \'apostrophes\' & symbols',
        status: 'pending'
      };
      
      addTask(task);
      const tasks = getTasks();
      expect(tasks[0].description).toBe(task.description);
    });

    test('should handle very long task descriptions', () => {
      const longDescription = 'A'.repeat(1000);
      const task = {
        id: 1,
        description: longDescription,
        status: 'pending'
      };
      
      addTask(task);
      const tasks = getTasks();
      expect(tasks[0].description).toBe(longDescription);
    });
  });
});
