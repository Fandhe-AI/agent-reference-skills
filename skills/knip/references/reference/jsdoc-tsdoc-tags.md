# JSDoc & TSDoc Tags

Source: https://knip.dev/reference/jsdoc-tsdoc-tags

## Overview

JSDoc/TSDoc tags create exceptions for unused/duplicate exports without new syntax or configuration.

**Note**: Adding tags to hide issues is usually not recommended.

## Format

JSDoc comments start with `/**`. Tags also work in regular block comments (`/* ... */`) and standalone line comments (`// ...`) before a declaration. These comments keep suppression tags out of JSDoc hover information. Tags in consecutive comments are combined. Trailing `//` comments are ignored.

```ts
// @lintignore
import Unresolved from './generated/lib.js';
```

## Tags

### Arbitrary Tags

Custom tags like `@lintignore`:

```sh
knip --tags=-lintignore,-internal
```

`-` excludes, `+` includes. When excluded tags become unnecessary, Knip reports a "tag hint".

### @public

Prevents reporting unused exports in non-entry files. Also creates exceptions with `--include-entry-exports`.

### @internal

Marks exports for internal use only. Exempted from production mode reporting.

### @alias

Prevents duplicate export warnings:

```typescript
export const Component = () => {};
/** @alias */
export default Component;
```

### @beta

Functions identically to `@public`.

## Notes

- The snippet is verbatim from the upstream Tags section of the 6.45.1 docs
- Source: https://knip.dev/reference/jsdoc-tsdoc-tags (knip@6.45.1 docs, retrieved 2026-11-14)
