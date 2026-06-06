# Auto-fix

Automatically remove unused exports, dependencies, and files detected by knip.

```sh
# Remove unused exports and dependencies
knip --fix

# Also remove unused files (requires explicit opt-in)
knip --fix --allow-remove-files

# Fix only specific issue types
knip --fix-type exports,types

# Fix and auto-format with Biome/Prettier/dprint
knip --fix --format
```

Before and after example for unused exports:

```typescript
// Before
export const unused = 1;
export default class MyClass {}

// After (export keywords removed)
const unused = 1;
class MyClass {}
```

Before and after for `package.json` dependencies:

```json
// Before
{ "dependencies": { "rimraf": "*", "unused-dep": "*" } }

// After
{ "dependencies": { "rimraf": "*" } }
```

## Notes

- Always use version control (Git) before running `--fix` to be able to review and undo changes
- `--fix-type` accepts: `dependencies`, `exports`, `types`, `files`, `catalog`
- Auto-fix does NOT add unlisted/missing dependencies — install them separately after fixing
- After fixing dependencies, run `npm install` (or equivalent) to update the lockfile
