# Test Project

A simple Node.js TypeScript project built to demonstrate an autonomous agent's capabilities. This project showcases TypeScript configuration, build tools, and basic Node.js development patterns with comprehensive unit testing.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Development](#development)
- [TypeScript Configuration](#typescript-configuration)
- [Contributing](#contributing)
- [License](#license)

## 🔍 Overview

This project serves as a testing ground for autonomous agent development and includes:
- TypeScript with strict type checking enabled
- Modern ES2022 target compilation
- Modular function exports for reusability
- Comprehensive build and development scripts
- Unit testing with Jest

## ✨ Features

- **TypeScript Support**: Full TypeScript setup with strict mode enabled
- **Build System**: Automated compilation from TypeScript to JavaScript
- **Development Mode**: Quick testing with ts-node
- **Type Declarations**: Automatic .d.ts file generation for library usage
- **Source Maps**: Full source map support for debugging
- **Unit Testing**: Comprehensive test suite using Jest and ts-jest

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 16.x or higher (recommended: 18.x or 20.x)
- **npm**: Version 8.x or higher (comes with Node.js)

To verify your installations, run:

```bash
node --version
npm --version
```

## 🚀 Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd test-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install:
   - TypeScript (v5.3.3)
   - ts-node (for development)
   - @types/node (Node.js type definitions)
   - rimraf (for cleaning build artifacts)
   - jest (for testing)
   - ts-jest (TypeScript support for Jest)
   - @types/jest (Jest type definitions)

## 💻 Usage

### Running the Project

#### Option 1: Build and Run (Production Mode)

Compile TypeScript to JavaScript and run the compiled code:

```bash
npm run build
npm start
```

#### Option 2: Development Mode

Run directly with ts-node without building:

```bash
npm run dev
```

### Expected Output

When you run the project, you should see:

```
Hello, World! Welcome to the test project.
5 + 3 = 8
Test project is running successfully!
```

### Using in Your Code

You can import and use the exported functions in your own TypeScript/JavaScript files:

```typescript
import { greet, add } from './index';

const message = greet('Alice');
console.log(message); // Output: Hello, Alice! Welcome to the test project.

const result = add(10, 20);
console.log(result); // Output: 30
```

## 🧪 Testing

This project includes a comprehensive test suite using Jest.

### Running Tests

```bash
npm test
```

### Running Tests in Watch Mode

Automatically re-run tests when files change:

```bash
npm run test:watch
```

### Running Tests with Coverage

Generate a code coverage report:

```bash
npm run test:coverage
```

Coverage reports will show:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

### Test Structure

Tests are located alongside the source files with the `.test.ts` extension:
- `src/index.test.ts` - Tests for greet() and add() functions

The test suite includes:
- **greet() function tests**:
  - Basic greeting functionality
  - Single character names
  - Names with spaces
  - Empty strings
  - Special characters (e.g., María José)

- **add() function tests**:
  - Addition of positive numbers
  - Addition of negative numbers
  - Mixed positive and negative numbers
  - Addition with zero
  - Decimal number precision
  - Large numbers

## 📁 Project Structure

```
test-project/
├── src/                      # Source files
│   ├── index.ts             # Main application file with greet() and add() functions
│   └── index.test.ts        # Unit tests for index.ts
├── dist/                    # Compiled JavaScript output (generated)
│   ├── index.js            # Compiled JavaScript
│   ├── index.d.ts          # Type declarations
│   └── index.js.map        # Source maps
├── node_modules/           # Dependencies (generated)
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Dependency lock file
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest configuration
├── PROJECT_GOALS.md        # Project objectives and success criteria
├── TSCONFIG_EXPLANATION.md # Detailed TypeScript config documentation
├── TSCONFIG_SUMMARY.md     # TypeScript config summary
└── README.md              # This file
```

## 📜 Scripts

The following npm scripts are available:

| Script | Command | Description |
|--------|---------|-------------|
| `build` | `npm run build` | Compile TypeScript to JavaScript in the `dist/` directory |
| `start` | `npm start` | Run the compiled JavaScript from `dist/index.js` |
| `dev` | `npm run dev` | Run TypeScript directly using ts-node (no compilation needed) |
| `watch` | `npm run watch` | Watch for file changes and recompile automatically |
| `clean` | `npm run clean` | Remove the `dist/` directory and all compiled files |
| `test` | `npm test` | Run all unit tests with Jest |
| `test:watch` | `npm run test:watch` | Run tests in watch mode (auto-rerun on changes) |
| `test:coverage` | `npm run test:coverage` | Run tests with coverage report |

### Common Workflows

**Starting fresh development:**
```bash
npm run clean      # Remove old build artifacts
npm run dev        # Run in development mode
```

**Production build:**
```bash
npm run clean      # Remove old build artifacts
npm run build      # Compile TypeScript
npm start          # Run the compiled code
```

**Active development with auto-recompilation:**
```bash
npm run watch      # TypeScript will recompile on every file change
```

**Test-driven development:**
```bash
npm run test:watch # Tests will re-run on every file change
```

## 🛠️ Development

### Making Changes

1. Edit files in the `src/` directory
2. Run `npm run dev` to test your changes immediately
3. Run `npm test` to ensure all tests pass
4. Run `npm run build` to compile for production

### Adding New Dependencies

For runtime dependencies:
```bash
npm install <package-name>
```

For development dependencies:
```bash
npm install --save-dev <package-name>
```

For TypeScript type definitions:
```bash
npm install --save-dev @types/<package-name>
```

### Writing Tests

When adding new functions:

1. Create tests in the same directory with `.test.ts` extension
2. Import the functions to test
3. Use Jest's `describe` and `it` blocks to organize tests
4. Follow the existing test patterns for consistency

Example:
```typescript
import { myFunction } from './myModule';

describe('myFunction', () => {
  it('should do something specific', () => {
    const result = myFunction(input);
    expect(result).toBe(expected);
  });
});
```

### Code Quality

This project uses TypeScript's strict mode with comprehensive type checking:
- All strict type-checking options enabled
- No implicit any types
- Strict null checks
- Unused variables and parameters detection
- All code paths must return values

## ⚙️ TypeScript Configuration

The project uses a comprehensive TypeScript configuration with:

- **Target**: ES2022 (modern JavaScript features)
- **Module System**: CommonJS (Node.js compatibility)
- **Strict Mode**: Fully enabled with all strict checks
- **Output**: Source maps, type declarations, and declaration maps
- **Additional Checks**: Unused locals, unused parameters, implicit returns, and more

For detailed information about the TypeScript configuration, see:
- `TSCONFIG_EXPLANATION.md` - Detailed explanation of each option
- `TSCONFIG_SUMMARY.md` - Quick reference summary

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Ensure the code compiles without errors (`npm run build`)
5. Ensure all tests pass (`npm test`)
6. Add tests for any new functionality
7. Commit your changes (`git commit -m 'Add some amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

## 📄 License

This project is licensed under the ISC License. See the `LICENSE` file for details (or the `license` field in `package.json`).

---

## 🆘 Troubleshooting

### Common Issues

**Issue**: `npm install` fails
- **Solution**: Ensure you have Node.js 16+ installed and try clearing the npm cache:
  ```bash
  npm cache clean --force
  npm install
  ```

**Issue**: TypeScript compilation errors
- **Solution**: Check that all source files are in the `src/` directory and follow TypeScript syntax. Run `npm run build` to see detailed error messages.

**Issue**: `npm start` shows "Cannot find module"
- **Solution**: Make sure you've built the project first:
  ```bash
  npm run build
  npm start
  ```

**Issue**: Changes not reflected when running
- **Solution**: If using `npm start`, rebuild first. Alternatively, use `npm run dev` or `npm run watch` for automatic updates.

**Issue**: Tests are failing
- **Solution**: Make sure all dependencies are installed. Try:
  ```bash
  npm install
  npm test
  ```

---

## 📚 Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ts-jest Documentation](https://kulshekhar.github.io/ts-jest/)

---

**Built by an Autonomous Agent** 🤖
