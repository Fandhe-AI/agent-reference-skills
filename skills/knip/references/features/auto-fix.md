# Auto-fix

Source: https://knip.dev/features/auto-fix

## Overview

`--fix` automatically removes unused code:

- Remove `export` keyword from unused exports/re-exports/types
- Remove `export default` from unused default exports
- Remove unused enum and namespace members
- Remove unused `dependencies`/`devDependencies` from `package.json`
- Remove unused files (with `--allow-remove-files`)
- Remove unused catalog entries

**Important**: Use a VCS like Git to review and undo changes.

## CLI Flags

```sh
knip --fix
knip --fix --allow-remove-files
knip --fix-type exports,types
knip --fix --format
```

`--fix-type` accepts: `dependencies`, `exports`, `types`, `files`, `catalog`

`--format` auto-formats with Biome, deno fmt, dprint, or Prettier.

## Post-Fix Considerations

1. **Formatting**: Use `--format` or run a dedicated formatter
2. **Unused Variables**: Use ESLint/Biome for internal variables (beyond Knip's scope)
3. **Dependency Verification**: Review `package.json` changes and update lockfile
4. **Unlisted Dependencies**: Install missing dependencies identified by Knip

## Examples

### Exports

```javascript
// Before
export const unused = 1;
export default class MyClass {}

// After
const unused = 1;
class MyClass {}
```

### Re-exports

```javascript
// Before
export { Cat, Dog } from './pets';
export { Lion, Elephant } from './jungle';

// After
export { Elephant } from './jungle';
```

### Enum Members

```typescript
// Before
export enum Directions { North = 1, East = 2, South = 3, West = 4 }

// After
export enum Directions { North = 1, East = 2 }
```

### Dependencies

```json
// Before
{ "dependencies": { "rimraf": "*", "unused-dep": "*" } }

// After
{ "dependencies": { "rimraf": "*" } }
```

### CommonJS

```javascript
// Before
module.exports = { identifier, unused };

// After
module.exports = { identifier };
```

## Limitations

Auto-fix does NOT:
- Add unlisted dependencies
- Add unlisted binaries
- Resolve duplicate exports
