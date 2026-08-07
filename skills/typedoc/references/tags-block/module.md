# @module

Block tag indicating that a comment refers to the entire file, with an optional module rename.

## Signature / Usage

```
@module
```

or

```
@module Module Name
```

The `@module` tag marks a comment as referring to the entire file rather than a specific declaration. You can optionally specify a module name to rename it when TypeDoc's automatic naming is inaccurate.

**Placement rule**: a comment block using `@module` must be the first comment in the file, ideally placed before any `import` statements.

TSDoc's `@packageDocumentation` tag has similar functionality but cannot rename the module.

If neither `@module` nor `@packageDocumentation` is included, a file-level comment may be misinterpreted as documentation for the next `import` statement.

### Renaming the module

```typescript
/**
 * This is the doc comment for the module
 * @module my-module
 */

import { something } from "somewhere";
```

### Without renaming the module

```typescript
/**
 * This is the doc comment for the module
 * @module
 */

import { something } from "somewhere";
```

### Incorrect usage

```typescript
// No @module tag -- this comment is treated as documentation for the import statement below
/**
 * This comment will be associated with the import below, not the module
 */
import { something } from "somewhere";
```

## Notes

- Must be placed in the first comment block of the file
- Recommended to place it before any `import` statements
- A file-level comment without `@module` is interpreted as documentation for the next declaration
- `@packageDocumentation` is an alternative without renaming capability

## Related

- [@mergeModuleWith](./mergeModuleWith.md) -- merging modules
- `@packageDocumentation` -- the TSDoc-standard file-level documentation tag
