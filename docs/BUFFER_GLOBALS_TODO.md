# Buffer Globals TODO - Technical Debt Documentation

## Issue Description

Found in `node_modules/@types/node/buffer.buffer.d.ts`:

```typescript
// TODO: remove globals in future version
/**
 * @deprecated This is intended for internal use, and will be removed once `@types/node` no longer supports
 * TypeScript versions earlier than 5.7.
 */
type NonSharedBuffer = Buffer<ArrayBuffer>;
/**
 * @deprecated This is intended for internal use, and will be removed once `@types/node` no longer supports
 * TypeScript versions earlier than 5.7.
 */
type AllowSharedBuffer = Buffer<ArrayBufferLike>;
```

## Current Status

- **Project TypeScript Version**: 5.3.3
- **@types/node Version**: 20.10.0
- **Issue**: The file contains deprecated global type aliases that are pending removal

## Background

These type aliases (`NonSharedBuffer` and `AllowSharedBuffer`) were created for backward compatibility with TypeScript versions prior to 5.7. They are marked as deprecated and intended for internal use only within the `@types/node` package.

## Why This Exists

TypeScript 5.7 introduced improvements to how ArrayBuffer types are handled. The `@types/node` maintainers are waiting to fully adopt these improvements until they drop support for older TypeScript versions.

## Proper Resolution Path

Since this is a third-party dependency maintained by the DefinitelyTyped community, the proper way to address this TODO is:

### Option 1: Upgrade Dependencies (Recommended)
1. Upgrade TypeScript to version 5.7 or later
2. Upgrade `@types/node` to a version that has removed these globals
3. Test the project to ensure no breaking changes

```bash
npm install --save-dev typescript@latest @types/node@latest
npm test
```

### Option 2: Contribute Upstream
If you want to help resolve this:
1. Check if TypeScript 5.7+ is now widely adopted
2. Submit a PR to DefinitelyTyped to remove the deprecated globals
3. Repository: https://github.com/DefinitelyTyped/DefinitelyTyped

### Option 3: Monitor Status (Current)
- These types are already marked as deprecated
- They will be automatically removed in a future version of `@types/node`
- No action required unless you're directly using these types (which you shouldn't be)

## Impact Assessment

**Risk Level**: Low
- These are internal types marked as deprecated
- The project likely does not use these types directly
- When removed upstream, it will not affect properly written code

**Action Required**: None immediately
- The deprecation warnings serve as sufficient notice
- The types will be removed by the `@types/node` maintainers when appropriate

## Verification

To check if your code uses these deprecated types:

```bash
# Search for usage of deprecated types
grep -r "NonSharedBuffer" src/
grep -r "AllowSharedBuffer" src/
```

If no results are found, your code is not affected.

## Timeline

- **Short term**: No action needed
- **Medium term**: Monitor for `@types/node` updates that remove these types
- **Long term**: Upgrade to TypeScript 5.7+ and updated @types/node when convenient

## Notes for Future Maintainers

- Do not modify files in `node_modules` directly
- Changes to `node_modules` are overwritten on `npm install`
- This is a third-party package concern, not a project-level issue
- Trust the DefinitelyTyped maintainers to handle the deprecation cycle properly

## Related Links

- [TypeScript 5.7 Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-7.html)
- [DefinitelyTyped Repository](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [@types/node Package](https://www.npmjs.com/package/@types/node)

---

**Last Updated**: 2025-12-24  
**Status**: Documented, monitoring for upstream resolution
