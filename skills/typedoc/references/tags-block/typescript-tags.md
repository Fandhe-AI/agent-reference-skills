# TypeScript Tags

TypeScript-specific block tags that TypeDoc recognizes for compatibility. This page covers `@type`, `@yields`, `@jsx`, `@typedef`, `@extends`, `@augments`, `@satisfies`, and `@callback`.

## Signature / Usage

```
@type {Type}
@yields {Type} description
@jsx pragma
@typedef {Type} Name
@extends {Type}
@augments {Type}
@satisfies {Type}
@callback Name
```

TypeDoc recognizes these TypeScript-specific block tags for compatibility. It assigns no special behavior to them and strips them from the generated documentation.

These tags are parsed as block tags, but none of them are reflected in TypeDoc's documentation output. They are recognized only for compatibility with TypeScript's JSDoc support.

### Recognized tags

| Tag | Description |
|------|------|
| `@type` | Specifies the type of a variable or property (JSDoc) |
| `@yields` | Documents the yield type of a generator function |
| `@jsx` | Specifies a JSX pragma |
| `@typedef` | Defines a custom type (JSDoc) |
| `@extends` | Documents class inheritance (JSDoc) |
| `@augments` | Synonym for `@extends` |
| `@satisfies` | Corresponds to TypeScript 5.0's satisfies operator (JSDoc) |
| `@callback` | Defines the type of a callback function (JSDoc) |

```javascript
/**
 * @type {string}
 */
let name;

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {number} age
 */

/**
 * @extends {Base}
 */
class Derived extends Base {}

/**
 * @callback RequestHandler
 * @param {Request} req
 * @param {Response} res
 */

/**
 * @satisfies {Config}
 */
const config = { /* ... */ };
```

## Notes

- All of these tags are stripped from the generated documentation by TypeDoc
- No special behavior or display is applied
- Recognized purely to maintain compatibility with TypeScript's JSDoc support
- `@satisfies` is supported from TypeScript 5.0 onward
- Used mainly in JavaScript projects that rely on the TypeScript type system

## Related

- [@param](./param.md) -- documenting parameters (used together in JSDoc projects)
- [@template](./template.md) -- documenting type parameters (for JSDoc projects)
- [@import](./import.md) -- importing types in JSDoc
- [TypeScript JSDoc reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
