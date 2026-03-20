# JSDoc & TSDoc Tags

Source: https://knip.dev/reference/jsdoc-tsdoc-tags

## Overview

JSDoc/TSDoc tags create exceptions for unused/duplicate exports without new syntax or configuration.

**Note**: Adding tags to hide issues is usually not recommended.

## Format

JSDoc comments must start with `/**` (not `//`).

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
