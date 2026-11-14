# JSDoc & TSDoc Tags

Annotate exports with JSDoc tags to control knip reporting without changing configuration files.

```typescript
// Prevent reporting as unused in non-entry files
/** @public */
export function publicApi() {}

// Mark as internal — excluded from production mode reporting
/** @internal */
export function internalHelper() {}

// Prevent duplicate export warning
export const Component = () => {};
/** @alias */
export default Component;
```

Use custom tags to selectively exclude exports:

```sh
# Exclude exports tagged with @lintignore or @internal
knip --tags=-lintignore,-internal
```

```typescript
/** @lintignore */
export const legacyExport = 'kept for compatibility';
```

## Notes

- Tags are recognized in `/** ... */` JSDoc comments, and (per the 6.45.1 docs) also in regular block comments (`/* ... */`) and standalone line comments (`// @lintignore`) before a declaration; tags in consecutive comments are combined and trailing `//` comments are ignored
- `@public` and `@beta` are functionally identical: both prevent unused export reporting and work with `--include-entry-exports`
- Use the `tags` config option to define custom tag behavior persistently: `{ "tags": ["-lintignore"] }`
- When a tag exclusion becomes unnecessary (the export is no longer unused), knip reports a "tag hint" to clean it up
