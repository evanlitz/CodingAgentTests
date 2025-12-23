# GitHub Actions Workflows

This directory contains automated CI/CD workflows for the test-project. These workflows ensure code quality, run tests, and automate releases.

## 📋 Table of Contents

- [Available Workflows](#available-workflows)
- [Workflow Details](#workflow-details)
- [Configuration](#configuration)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

## Available Workflows

### 1. CI/CD Pipeline (`ci.yml`)
**Triggers:** Push to main/master/develop, Pull Requests, Manual dispatch

Main continuous integration workflow that runs on every push and pull request.

**Jobs:**
- **build-and-test**: Builds and tests on multiple OS (Ubuntu, Windows, macOS) and Node versions (18.x, 20.x)
- **lint**: Runs ESLint to check code quality
- **type-check**: Validates TypeScript types without emitting files
- **test-coverage**: Generates and displays test coverage reports
- **security-audit**: Runs npm audit to check for security vulnerabilities
- **build-artifacts**: Archives build artifacts for later use

**Status Badge:**
```markdown
![CI/CD](https://github.com/YOUR_USERNAME/test-project/workflows/CI%2FCD%20Pipeline/badge.svg)
```

### 2. Release Workflow (`release.yml`)
**Triggers:** Push of version tags (v*.*.*), Manual dispatch

Automates the release process when a new version tag is pushed.

**Jobs:**
- Creates GitHub releases with changelogs
- Builds and uploads release artifacts
- Optional npm publishing (disabled by default)

**Usage:**
```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

### 3. CodeQL Security Scanning (`codeql.yml`)
**Triggers:** Push to main/master/develop, Pull Requests, Weekly schedule (Mondays at 6 AM UTC)

Advanced security scanning using GitHub's CodeQL engine.

**Features:**
- JavaScript/TypeScript code analysis
- Security vulnerability detection
- Code quality checks
- Automated security alerts

### 4. Dependabot (`dependabot.yml`)
**Triggers:** Automatic (weekly on Mondays at 9 AM)

Automated dependency updates for npm packages and GitHub Actions.

**Features:**
- Weekly dependency updates
- Grouped pull requests (dev dependencies, production dependencies)
- Automatic semantic versioning
- Labels and commit message formatting

## Workflow Details

### CI/CD Pipeline Workflow

#### Matrix Strategy
The main CI workflow uses a matrix strategy to test across multiple environments:

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [18.x, 20.x]
```

This creates 6 jobs (3 OS × 2 Node versions) to ensure compatibility.

#### Steps Breakdown

1. **Checkout Code**: Uses `actions/checkout@v4` to clone the repository
2. **Setup Node.js**: Configures Node.js with npm caching for faster builds
3. **Install Dependencies**: Runs `npm ci` for clean, reproducible installs
4. **Lint Check**: Runs `npm run lint:check` to verify code quality
5. **Test with Coverage**: Runs `npm run test:coverage` to execute tests
6. **Build Project**: Runs `npm run build` to compile TypeScript
7. **Upload Coverage**: Optionally uploads coverage to Codecov

#### Artifacts
Build artifacts are stored for 30 days:
- `dist-files`: Compiled JavaScript and type definitions
- `coverage-report`: Test coverage reports

### Release Workflow

The release workflow automates version releases:

#### Automatic Changelog
Generates a changelog from git commits between tags:
```bash
git log $(git describe --tags --abbrev=0 HEAD^)..HEAD --pretty=format:"- %s (%h)"
```

#### NPM Publishing
To enable npm publishing:
1. Add `NPM_TOKEN` to repository secrets
2. Change `if: false` to `if: true` in the publish step

### Security Features

#### npm Audit
Runs `npm audit` with moderate severity threshold:
```bash
npm audit --audit-level=moderate
```

#### CodeQL Analysis
- Scans for security vulnerabilities
- Checks code quality issues
- Runs extended security queries
- Weekly scheduled scans for proactive monitoring

### Dependabot Configuration

Dependabot automatically:
- Checks for outdated dependencies weekly
- Groups updates by dependency type (dev/production)
- Creates labeled pull requests
- Maintains consistent commit messages

## Configuration

### Required Secrets

For full functionality, configure these secrets in your repository:

1. **GITHUB_TOKEN** (automatically provided)
   - Used for: Creating releases, commenting on PRs
   
2. **CODECOV_TOKEN** (optional)
   - Used for: Uploading coverage reports to Codecov
   - Get it from: https://codecov.io
   
3. **NPM_TOKEN** (optional)
   - Used for: Publishing to npm registry
   - Get it from: https://www.npmjs.com/settings/[username]/tokens

### Adding Secrets

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the secret name and value

### Branch Protection

Recommended branch protection rules for `main`:

- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
  - Select: `build-and-test`, `lint`, `type-check`, `test-coverage`
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Do not allow bypassing the above settings

## Usage

### Running Workflows Manually

Some workflows support manual triggering via `workflow_dispatch`:

1. Go to **Actions** tab in your repository
2. Select the workflow (e.g., "CI/CD Pipeline")
3. Click **Run workflow**
4. Select the branch
5. Click **Run workflow** button

### Monitoring Workflows

View workflow runs:
1. Go to **Actions** tab
2. Click on a workflow run to see details
3. Click on individual jobs to see logs
4. Download artifacts if available

### Status Badges

Add workflow status badges to your README:

```markdown
![CI/CD](https://github.com/USERNAME/REPO/workflows/CI%2FCD%20Pipeline/badge.svg)
![CodeQL](https://github.com/USERNAME/REPO/workflows/CodeQL%20Advanced%20Security/badge.svg)
```

## Troubleshooting

### Common Issues

#### Workflow Not Triggering

**Issue**: Workflow doesn't run on push
- Check if the branch is in the trigger list
- Verify workflow file syntax (use a YAML validator)
- Check if workflows are enabled in repository settings

#### Build Failures

**Issue**: Tests pass locally but fail in CI
- Ensure all dependencies are in `package.json`
- Check for environment-specific code
- Verify Node.js version compatibility
- Look for timing-dependent tests

#### Permission Errors

**Issue**: "Resource not accessible by integration"
- Add required permissions to workflow:
  ```yaml
  permissions:
    contents: write
    pull-requests: write
  ```

#### Artifact Upload Failures

**Issue**: "Unable to upload artifact"
- Check artifact size (max 2GB per artifact)
- Verify the path exists
- Ensure the job completed successfully

#### Matrix Build Failures

**Issue**: Some matrix jobs fail while others pass
- Check OS-specific issues (path separators, line endings)
- Verify Node.js version compatibility
- Review logs for environment-specific errors

### Debug Mode

Enable debug logging:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add variable: `ACTIONS_STEP_DEBUG` = `true`
3. Re-run the workflow

### Getting Help

If you encounter issues:

1. Check the [GitHub Actions documentation](https://docs.github.com/en/actions)
2. Review workflow logs for error messages
3. Search [GitHub Community Forum](https://github.community)
4. Open an issue in this repository

## Best Practices

### Workflow Optimization

1. **Use caching**: Cache npm dependencies to speed up builds
   ```yaml
   - uses: actions/setup-node@v4
     with:
       cache: 'npm'
   ```

2. **Fail fast**: Use `fail-fast: true` in matrix strategies to stop on first failure
3. **Conditional steps**: Use `if` conditions to skip unnecessary steps
4. **Secrets management**: Never expose secrets in logs or artifacts

### Testing Workflows

Before pushing workflow changes:

1. Test locally using [act](https://github.com/nektos/act)
2. Use a feature branch to test workflow changes
3. Review logs carefully for security issues
4. Validate YAML syntax

### Maintenance

- Review and update workflow actions quarterly
- Monitor Dependabot PRs for action updates
- Keep Node.js versions up to date
- Adjust matrix strategy based on support needs

---

**Last Updated**: 2024
**Maintained By**: Autonomous Agent 🤖
