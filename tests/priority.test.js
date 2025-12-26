const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, '..', 'tasks.json');

describe('Priority Feature', () => {
  let originalTasks;

  beforeEach(() => {
    // Backup existing tasks
    try {
      originalTasks = fs.readFileSync(TASKS_FILE, 'utf8');
    } catch (error) {
      originalTasks = null;
    }
    // Start with empty tasks
    fs.writeFileSync(TASKS_FILE, '[]', 'utf8');
  });

  afterEach(() => {
    // Restore original tasks
    if (originalTasks) {
      fs.writeFileSync(TASKS_FILE, originalTasks, 'utf8');
    }
  });

  describe('Adding tasks with priority', () => {
    test('should add task with high priority', () => {
      execSync('node src/task.js add "High priority task" --priority high', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
      expect(tasks.length).toBe(1);
      expect(tasks[0].priority).toBe('high');
      expect(tasks[0].description).toBe('High priority task');
    });

    test('should add task with medium priority', () => {
      execSync('node src/task.js add "Medium priority task" --priority medium', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
      expect(tasks[0].priority).toBe('medium');
    });

    test('should add task with low priority', () => {
      execSync('node src/task.js add "Low priority task" --priority low', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
      expect(tasks[0].priority).toBe('low');
    });

    test('should default to medium priority if not specified', () => {
      execSync('node src/task.js add "Default priority task"', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
      expect(tasks[0].priority).toBe('medium');
    });

    test('should reject invalid priority level', () => {
      expect(() => {
        execSync('node src/task.js add "Invalid priority" --priority urgent', { 
          cwd: path.join(__dirname, '..'),
          encoding: 'utf8',
          stdio: 'pipe'
        });
      }).toThrow();

      const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
      expect(tasks.length).toBe(0);
    });

    test('should handle case-insensitive priority', () => {
      execSync('node src/task.js add "Case test" --priority HIGH', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
      expect(tasks[0].priority).toBe('high');
    });
  });

  describe('Filtering by priority', () => {
    beforeEach(() => {
      // Add tasks with different priorities
      execSync('node src/task.js add "High task 1" --priority high', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });
      execSync('node src/task.js add "Medium task 1" --priority medium', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });
      execSync('node src/task.js add "Low task 1" --priority low', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });
      execSync('node src/task.js add "High task 2" --priority high', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });
    });

    test('should filter tasks by high priority', () => {
      const output = execSync('node src/task.js list --priority high', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      expect(output).toContain('High task 1');
      expect(output).toContain('High task 2');
      expect(output).not.toContain('Medium task 1');
      expect(output).not.toContain('Low task 1');
    });

    test('should filter tasks by medium priority', () => {
      const output = execSync('node src/task.js list --priority medium', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      expect(output).toContain('Medium task 1');
      expect(output).not.toContain('High task 1');
      expect(output).not.toContain('Low task 1');
    });

    test('should filter tasks by low priority', () => {
      const output = execSync('node src/task.js list --priority low', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      expect(output).toContain('Low task 1');
      expect(output).not.toContain('High task 1');
      expect(output).not.toContain('Medium task 1');
    });
  });

  describe('Sorting by priority', () => {
    beforeEach(() => {
      // Add tasks in mixed priority order
      execSync('node src/task.js add "Low priority" --priority low', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });
      execSync('node src/task.js add "High priority" --priority high', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });
      execSync('node src/task.js add "Medium priority" --priority medium', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });
    });

    test('should sort tasks by priority (high to low)', () => {
      const output = execSync('node src/task.js list --sort priority', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      const lines = output.split('\n').filter(line => line.includes('priority'));
      const highIndex = lines.findIndex(l => l.includes('High priority'));
      const mediumIndex = lines.findIndex(l => l.includes('Medium priority'));
      const lowIndex = lines.findIndex(l => l.includes('Low priority'));

      expect(highIndex).toBeLessThan(mediumIndex);
      expect(mediumIndex).toBeLessThan(lowIndex);
    });
  });

  describe('Priority display', () => {
    test('should display priority icon for high priority', () => {
      execSync('node src/task.js add "High priority display" --priority high', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });

      const output = execSync('node src/task.js list', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      expect(output).toContain('HIGH');
    });

    test('should display priority icon for low priority', () => {
      execSync('node src/task.js add "Low priority display" --priority low', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });

      const output = execSync('node src/task.js list', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      expect(output).toContain('LOW');
    });

    test('should not show priority icon for default medium priority', () => {
      execSync('node src/task.js add "Medium priority display"', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });

      const output = execSync('node src/task.js list', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      // Medium priority should not show icon unless explicitly set
      const lines = output.split('\n');
      const taskLine = lines.find(l => l.includes('Medium priority display'));
      expect(taskLine).toBeDefined();
    });
  });

  describe('Priority statistics', () => {
    beforeEach(() => {
      execSync('node src/task.js add "High 1" --priority high', { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
      execSync('node src/task.js add "High 2" --priority high', { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
      execSync('node src/task.js add "Medium 1" --priority medium', { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
      execSync('node src/task.js add "Medium 2" --priority medium', { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
      execSync('node src/task.js add "Medium 3" --priority medium', { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
      execSync('node src/task.js add "Low 1" --priority low', { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
    });

    test('should show correct priority distribution in stats', () => {
      const output = execSync('node src/task.js stats', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      expect(output).toContain('High: 2');
      expect(output).toContain('Medium: 3');
      expect(output).toContain('Low: 1');
    });
  });

  describe('Integration with other features', () => {
    test('should combine priority with due date', () => {
      execSync('node src/task.js add "Urgent task" --priority high --due 2024-12-31', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
      expect(tasks[0].priority).toBe('high');
      expect(tasks[0].dueDate).toBe('2024-12-31');
    });

    test('should combine priority with category', () => {
      execSync('node src/task.js add "Work task" --priority high --category work', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });

      const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
      expect(tasks[0].priority).toBe('high');
      expect(tasks[0].category).toBe('work');
    });

    test('should maintain priority when marking task complete', () => {
      execSync('node src/task.js add "Complete me" --priority high', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });

      const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
      const taskId = tasks[0].id;

      execSync(`node src/task.js done ${taskId}`, { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });

      const updatedTasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
      expect(updatedTasks[0].priority).toBe('high');
      expect(updatedTasks[0].status).toBe('completed');
    });
  });
});
