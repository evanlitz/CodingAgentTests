const chalk = require('chalk');

/**
 * Create a visual progress bar
 * @param {number} percentage - The percentage to display (0-100)
 * @param {number} width - The width of the progress bar in characters (default: 30)
 * @param {object} options - Additional options
 * @param {string} options.color - The color of the filled portion ('green', 'yellow', 'red', 'blue')
 * @param {string} options.char - The character to use for filled portions (default: '█')
 * @param {string} options.emptyChar - The character to use for empty portions (default: '░')
 * @param {boolean} options.showPercentage - Whether to show percentage text (default: true)
 * @returns {string} The formatted progress bar string
 */
function createProgressBar(percentage, width = 30, options = {}) {
  const {
    color = 'green',
    char = '█',
    emptyChar = '░',
    showPercentage = true
  } = options;

  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  
  // Calculate filled and empty portions
  const filledWidth = Math.round((clampedPercentage / 100) * width);
  const emptyWidth = width - filledWidth;
  
  // Create the bar strings
  const filledPart = char.repeat(filledWidth);
  const emptyPart = emptyChar.repeat(emptyWidth);
  
  // Apply color based on option
  let coloredFilled;
  switch (color) {
    case 'red':
      coloredFilled = chalk.red(filledPart);
      break;
    case 'yellow':
      coloredFilled = chalk.yellow(filledPart);
      break;
    case 'blue':
      coloredFilled = chalk.blue(filledPart);
      break;
    case 'cyan':
      coloredFilled = chalk.cyan(filledPart);
      break;
    case 'magenta':
      coloredFilled = chalk.magenta(filledPart);
      break;
    case 'green':
    default:
      coloredFilled = chalk.green(filledPart);
      break;
  }
  
  // Combine parts
  let bar = coloredFilled + chalk.gray(emptyPart);
  
  // Add percentage text if requested
  if (showPercentage) {
    const percentText = `${Math.round(clampedPercentage)}%`;
    bar = `[${bar}] ${percentText}`;
  } else {
    bar = `[${bar}]`;
  }
  
  return bar;
}

/**
 * Create a horizontal bar chart for multiple values
 * @param {Array<{label: string, value: number, total: number, color?: string}>} items - Items to display
 * @param {number} width - The width of each bar (default: 20)
 * @returns {string} The formatted bar chart
 */
function createBarChart(items, width = 20) {
  const lines = [];
  
  items.forEach(item => {
    const { label, value, total, color = 'blue' } = item;
    const percentage = total > 0 ? (value / total) * 100 : 0;
    const bar = createProgressBar(percentage, width, { 
      color, 
      showPercentage: false 
    });
    
    // Create the line with label, bar, and count
    const line = `   ${label.padEnd(15)} ${bar} ${value}`;
    lines.push(line);
  });
  
  return lines.join('\n');
}

/**
 * Get color based on percentage value
 * @param {number} percentage - The percentage value
 * @param {object} thresholds - Color thresholds
 * @returns {string} The color name
 */
function getProgressColor(percentage, thresholds = {}) {
  const {
    excellent = 80,
    good = 60,
    warning = 40
  } = thresholds;
  
  if (percentage >= excellent) return 'green';
  if (percentage >= good) return 'cyan';
  if (percentage >= warning) return 'yellow';
  return 'red';
}

/**
 * Create a mini progress indicator (compact version)
 * @param {number} percentage - The percentage to display (0-100)
 * @param {number} width - The width of the progress bar (default: 10)
 * @returns {string} The formatted mini progress bar
 */
function createMiniProgressBar(percentage, width = 10) {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  const filledWidth = Math.round((clampedPercentage / 100) * width);
  const emptyWidth = width - filledWidth;
  
  const color = getProgressColor(clampedPercentage);
  const filled = '▰'.repeat(filledWidth);
  const empty = '▱'.repeat(emptyWidth);
  
  let coloredFilled;
  switch (color) {
    case 'green':
      coloredFilled = chalk.green(filled);
      break;
    case 'cyan':
      coloredFilled = chalk.cyan(filled);
      break;
    case 'yellow':
      coloredFilled = chalk.yellow(filled);
      break;
    case 'red':
      coloredFilled = chalk.red(filled);
      break;
    default:
      coloredFilled = chalk.blue(filled);
  }
  
  return coloredFilled + chalk.gray(empty);
}

module.exports = {
  createProgressBar,
  createBarChart,
  getProgressColor,
  createMiniProgressBar
};
