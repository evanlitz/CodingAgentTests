# Documentation

This directory contains technical documentation for the project.

## Files

### BUFFER_GLOBALS_TODO.md
Comprehensive documentation about the "TODO: remove globals in future version" found in `node_modules/@types/node/buffer.buffer.d.ts`.

**Key Points:**
- Explains the deprecated `NonSharedBuffer` and `AllowSharedBuffer` types
- Describes why they exist (TypeScript < 5.7 compatibility)
- Provides impact assessment (Low risk)
- Outlines proper resolution paths

**Recommendation:** Review this document to understand the technical debt item and appropriate response.

### UPGRADE_GUIDE.md
Step-by-step guide for upgrading TypeScript and @types/node to resolve the buffer globals TODO.

**Includes:**
- Pre-upgrade checklist
- Detailed upgrade steps
- Common issues and solutions
- Rollback procedure
- Verification steps

**Use Case:** Follow this guide when ready to upgrade TypeScript to 5.7+ and remove the deprecated types.

## Scripts

### check-buffer-globals-status.sh
Automated script to check the status of the buffer globals TODO.

**Features:**
- Reports current TypeScript and @types/node versions
- Checks if deprecated types still exist
- Scans source code for usage of deprecated types
- Provides upgrade recommendations

**Usage:**
```bash
npm run check:buffer-globals
```

## Quick Start

If you're seeing the TODO comment about buffer globals:

1. **Understand the Issue**: Read `BUFFER_GLOBALS_TODO.md`
2. **Check Status**: Run `npm run check:buffer-globals`
3. **Plan Upgrade**: Review `UPGRADE_GUIDE.md` when ready to upgrade
4. **Monitor**: The issue will be resolved automatically in future @types/node versions

## Important Notes

⚠️ **Do not modify files in node_modules directly**
- Changes are overwritten on `npm install`
- This is a third-party package maintained by DefinitelyTyped
- The proper solution is upgrading dependencies or waiting for upstream fixes

✅ **Your code is likely not affected**
- The deprecated types are for internal use only
- The verification script confirms no usage in your source code
- This is a maintenance notice, not a critical issue

## Timeline

- **Current Status**: TODO present, types deprecated but functional
- **Short Term**: No action required
- **Medium Term**: Consider upgrading to TypeScript 5.7+ during maintenance windows
- **Long Term**: Types will be removed automatically in future @types/node versions

## Additional Resources

- [TypeScript Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)
- [DefinitelyTyped Repository](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [@types/node Package](https://www.npmjs.com/package/@types/node)

---

**Last Updated**: 2025-12-24  
**Maintained By**: Development Team
