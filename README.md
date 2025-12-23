# Test Project

A simple Node.js TypeScript project built to demonstrate an autonomous agent's capabilities. This project showcases TypeScript configuration, build tools, and basic Node.js development patterns with comprehensive unit testing and CI/CD automation.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [CI/CD](#cicd)
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
- Automated CI/CD workflows with GitHub Actions

## ✨ Features

- **TypeScript Support**: Full TypeScript setup with strict mode enabled
- **Build System**: Automated compilation from TypeScript to JavaScript
- **Development Mode**: Quick testing with ts-node
- **Type Declarations**: Automatic .d.ts file generation for library usage
- **Source Maps**: Full source map support for debugging
- **Unit Testing**: Comprehensive test suite using Jest and ts-jest
- **CI/CD Automation**: GitHub Actions workflows for continuous integration and deployment
- **Code Quality**: ESLint integration with automated checks
- **Security Scanning**: CodeQL analysis and dependency auditing
- **Automated Updates**: Dependabot for keeping dependencies current

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
   - ESLint and related plugins

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
5 * 3 = 15
Test project is running successfully!
```

### Using in Your Code

You can import and use the exported functions in your own TypeScript/JavaScript files:

```typescript
import { greet, add, multiply } from './index';

const message = greet('Alice');
console.log(message); // Output: Hello, Alice! Welcome to the test project.

const sum = add(10, 20);
console.log(sum); // Output: 30

const product = multiply(6, 7);
console.log(product); // Output: 42
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
- `src/index.test.ts` - Tests for greet(), add(), and multiply() functions

The test suite includes:

- **greet() function tests (5 tests)**:
  - Basic greeting functionality
  - Single character names
  - Names with spaces
  - Empty strings
  - Special characters (e.g., María José)

- **add() function tests (7 tests)**:
  - Addition of positive numbers
  - Addition of negative numbers
  - Mixed positive and negative numbers
  - Addition with zero
  - Decimal number precision
  - Large numbers

- **multiply() function tests (10 tests)**:
  - Multiplication of positive numbers
  - Multiplication of negative numbers
  - Mixed sign multiplication
  - Multiplication by zero (both cases)
  - Multiplication by one (identity property)
  - Decimal number multiplication
  - Decimal multiplication with precision
  - Large number multiplication
  - Multiplication by negative one

**Total: 22 tests, all passing ✅**

For detailed testing documentation, see `TESTING.md`.

## 🔄 CI/CD

This project includes comprehensive GitHub Actions workflows for continuous integration and deployment.

### Available Workflows

1. **CI/CD Pipeline** (`ci.yml`)
   - Runs on every push and pull request
   - Tests across multiple OS (Ubuntu, Windows, macOS)
   - Tests with multiple Node.js versions (18.x, 20.x)
   - Automated linting, testing, and building
   - Code coverage reporting with Codecov integration
   - Security audits with npm audit

2. **Release Workflow** (`release.yml`)
   - Automated releases on version tags
   - Changelog generation
   - Build artifact archiving
   - Optional npm publishing

3. **CodeQL Security Scanning** (`codeql.yml`)
   - Advanced code security analysis
   - Weekly scheduled scans
   - Vulnerability detection
   - Code quality checks

4. **Dependabot** (`dependabot.yml`)
   - Automated dependency updates
   - Weekly checks for outdated packages
   - Grouped pull requests
   - GitHub Actions version updates

### Workflow Status

<!-- Add status badges here -->
```markdown
![CI/CD](https://github.com/YOUR_USERNAME/test-project/workflows/CI%2FCD%20Pipeline/badge.svg)
![CodeQL](https://github.com/YOUR_USERNAME/test-project/workflows/CodeQL%20Advanced%20Security/badge.svg)
```

### Using the Workflows

**Running Checks Locally:**
```bash
# Run the full check suite (lint + test)
npm run check

# Run individual checks
npm run lint:check
npm test
npm run build
```

**Creating a Release:**
```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

For detailed CI/CD documentation, see `.github/workflows/README.md`.

## 📁 Project Structure

```
test-project/
├── .github/                  # GitHub configuration
│   ├── workflows/           # GitHub Actions workflows
│   │   ├── ci.yml          # Main CI/CD pipeline
│   │   ├── release.yml     # Release automation
│   │   ├── codeql.yml      # Security scanning
│   │   └── README.md       # Workflow documentation
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml      # Dependabot configuration
├── src/                      # Source files
│   ├── index.ts             # Main application file
│   └── index.test.ts        # Unit tests
├── dist/                    # Compiled JavaScript (generated)
├── coverage/               # Test coverage reports (generated)
├── node_modules/           # Dependencies (generated)
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Dependency lock file
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest configuration
├── eslint.config.js        # ESLint configuration
├── .eslintrc.json          # ESLint rules
├── .eslintignore           # ESLint ignore patterns
├── .gitignore              # Git ignore patterns
├── PROJECT_GOALS.md        # Project objectives
├── TESTING.md              # Testing documentation
├── TSCONFIG_EXPLANATION.md # TypeScript config details
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
| `lint` | `npm run lint` | Run ESLint on source files |
| `lint:fix` | `npm run lint:fix` | Run ESLint and automatically fix issues |
| `lint:check` | `npm run lint:check` | Run ESLint with zero warnings tolerance |
| `check` | `npm run check` | Run both lint:check and test (CI validation) |

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

**Pre-commit checks:**
```bash
npm run check      # Run linting and tests
```

## 🛠️ Development

### Making Changes

1. Edit files in the `src/` directory
2. Run `npm run dev` to test your changes immediately
3. Run `npm run lint:fix` to fix linting issues
4. Run `npm test` to ensure all tests pass
5. Run `npm run build` to compile for production

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

ESLint is configured to enforce code quality standards:
- TypeScript-specific rules
- Best practice enforcement
- Automatic fixing for many issues

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
6. Ensure linting passes (`npm run lint:check`)
7. Add tests for any new functionality
8. Commit your changes (`git commit -m 'Add some amazing feature'`)
9. Push to the branch (`git push origin feature/amazing-feature`)
10. Open a Pull Request

Pull requests will automatically trigger CI/CD workflows that must pass before merging.

For detailed contribution guidelines, see the Pull Request template.

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

**Issue**: ESLint errors
- **Solution**: Try automatic fixing first:
  ```bash
  npm run lint:fix
  ```

**Issue**: CI/CD workflows not running
- **Solution**: Ensure workflows are enabled in repository settings and check branch names match trigger patterns.

---

## 📚 Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ts-jest Documentation](https://kulshekhar.github.io/ts-jest/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [ESLint Documentation](https://eslint.org/docs/latest/)

---

**Built by an Autonomous Agent** 🤖
