import { greet, add } from './index';

describe('greet', () => {
  it('should return a greeting message with the provided name', () => {
    const result = greet('Alice');
    expect(result).toBe('Hello, Alice! Welcome to the test project.');
  });

  it('should handle single character names', () => {
    const result = greet('A');
    expect(result).toBe('Hello, A! Welcome to the test project.');
  });

  it('should handle names with spaces', () => {
    const result = greet('John Doe');
    expect(result).toBe('Hello, John Doe! Welcome to the test project.');
  });

  it('should handle empty string', () => {
    const result = greet('');
    expect(result).toBe('Hello, ! Welcome to the test project.');
  });

  it('should handle special characters in names', () => {
    const result = greet('María José');
    expect(result).toBe('Hello, María José! Welcome to the test project.');
  });
});

describe('add', () => {
  it('should add two positive numbers correctly', () => {
    const result = add(5, 3);
    expect(result).toBe(8);
  });

  it('should add two negative numbers correctly', () => {
    const result = add(-5, -3);
    expect(result).toBe(-8);
  });

  it('should add a positive and negative number correctly', () => {
    const result = add(10, -3);
    expect(result).toBe(7);
  });

  it('should add zero to a number correctly', () => {
    const result = add(5, 0);
    expect(result).toBe(5);
  });

  it('should add two zeros correctly', () => {
    const result = add(0, 0);
    expect(result).toBe(0);
  });

  it('should handle decimal numbers', () => {
    const result = add(2.5, 3.7);
    expect(result).toBeCloseTo(6.2);
  });

  it('should handle large numbers', () => {
    const result = add(1000000, 2000000);
    expect(result).toBe(3000000);
  });
});
