/**
 * A simple greeting function that returns a personalized greeting message
 * @param name - The name of the person to greet
 * @returns A greeting message string
 */
export function greet(name: string): string {
  return `Hello, ${name}! Welcome to the test project.`;
}

/**
 * A simple function to add two numbers
 * @param a - The first number
 * @param b - The second number
 * @returns The sum of the two numbers
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Main function that demonstrates the simple functions
 */
function main(): void {
  const message = greet("World");
  console.log(message);
  
  const sum = add(5, 3);
  console.log(`5 + 3 = ${sum}`);
  
  console.log("Test project is running successfully!");
}

// Run the main function if this file is executed directly
if (require.main === module) {
  main();
}
