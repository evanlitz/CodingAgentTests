# Testing Documentation

## Overview

This project uses Jest as its testing framework with ts-jest for TypeScript support. The test suite provides comprehensive coverage of the main functions: `greet()` and `add()`.

## Test Framework

- **Jest**: v30.2.0 - Modern JavaScript testing framework
- **ts-jest**: v29.4.6 - TypeScript preprocessor for Jest
- **@types/jest**: v30.0.0 - TypeScript type definitions for Jest

## Configuration

The Jest configuration is defined in `jest.config.js`:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
  ],
};
```

## Running Tests

### Basic Test Run
```bash
npm test
```

### Watch Mode (Auto-rerun on changes)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

## Test Suite Details

### File: `src/index.test.ts`

#### `greet()` Function Tests

1. **Basic functionality**: Verifies that the function returns a proper greeting with the provided name
2. **Single character names**: Tests edge case of single-letter names
3. **Names with spaces**: Ensures proper handling of full names (e.g., "John Doe")
4. **Empty string**: Tests edge case of empty input
5. **Special characters**: Validates support for international characters (e.g., "María José")

#### `add()` Function Tests

1. **Positive numbers**: Basic addition of two positive integers
2. **Negative numbers**: Addition of two negative integers
3. **Mixed signs**: Addition of positive and negative numbers
4. **Zero handling**: Tests addition with zero as one operand
5. **Both zeros**: Edge case of adding zero to zero
6. **Decimal numbers**: Tests floating-point arithmetic with `toBeCloseTo()` matcher
7. **Large numbers**: Validates handling of large integer values

## Test Results

All tests pass successfully:

```
Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
```

### Coverage Breakdown

- **greet()** function: 100% coverage (statement, branch, function, line)
- **add()** function: 100% coverage (statement, branch, function, line)

Note: The main() function and module entry point are not covered by tests as they are intended for CLI execution only. The exported functions have full coverage.

## Best Practices

1. **Test Organization**: Tests are grouped using `describe()` blocks by function
2. **Clear Naming**: Each test has a descriptive name explaining what it validates
3. **Edge Cases**: Tests cover edge cases (empty strings, zero, special characters, etc.)
4. **Precision Testing**: Floating-point comparisons use `toBeCloseTo()` for reliability
5. **Colocation**: Test files are placed next to source files for easy discovery

## Adding New Tests

When adding new functions to the project:

1. Create tests in the same directory with `.test.ts` extension
2. Import the functions you want to test
3. Use `describe()` to group related tests
4. Use `it()` or `test()` for individual test cases
5. Follow the AAA pattern: Arrange, Act, Assert

Example:
```typescript
import { myNewFunction } from './myModule';

describe('myNewFunction', () => {
  it('should perform expected behavior', () => {
    // Arrange
    const input = 'test input';
    
    // Act
    const result = myNewFunction(input);
    
    // Assert
    expect(result).toBe('expected output');
  });
});
```

## CI/CD Integration

The test suite is designed to be easily integrated into CI/CD pipelines. Tests will:
- Exit with code 0 on success
- Exit with code 1 on failure
- Output results in a CI-friendly format

## Troubleshooting

### Tests Not Running

If tests don't run, ensure:
1. All dependencies are installed: `npm install`
2. Jest is in devDependencies in package.json
3. jest.config.js exists in the project root

### Type Errors in Tests

If you see TypeScript errors in test files:
1. Verify @types/jest is installed
2. Check that your tsconfig.json includes the test files
3. Restart your IDE/editor to reload type definitions

### Coverage Reports Not Generating

If coverage reports don't appear:
1. Check that the collectCoverageFrom pattern in jest.config.js matches your file structure
2. Ensure you're using the `--coverage` flag or `npm run test:coverage`
3. Coverage reports are generated in the `coverage/` directory (ignored by git)
