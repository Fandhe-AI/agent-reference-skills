# @packageDocumentation

Modifier tag that marks a comment block as documentation for the entire file, rather than for the declaration that immediately follows it.

## Signature / Usage

```
/**
 * File description
 * @packageDocumentation
 */
```

The `@packageDocumentation` tag indicates that a comment block documents the file itself, rather than the declaration that immediately follows it.

A comment block carrying this tag must be placed as the first comment in the file. It is recommended to place it before any `import` statements; without this tag, a comment preceding an `import` statement would otherwise be interpreted as documentation for that import.

The `@module` tag provides equivalent functionality and is recommended when it is semantically clearer.

### Basic usage

```typescript
// file1.ts
/**
 * This is the doc comment for file1.ts
 *
 * @packageDocumentation
 */
import * as lib from "lib";
```

### Detailed file documentation

```typescript
/**
 * User authentication module.
 *
 * This module provides a JWT-based authentication flow.
 * Integration with OAuth 2.0 providers is also supported.
 *
 * @packageDocumentation
 */
import { sign, verify } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

export class AuthService {
    // ...
}
```

## Notes

- Must be placed as the first comment in the file
- Recommended to be placed before any `import` statements
- Follows the TSDoc spec: https://tsdoc.org/pages/tags/packagedocumentation/
- `@module` provides an equivalent alternative

## Related

- [@module](../tags-block/module.md)
