---
source: https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html
---

# JS Projects Utilizing TypeScript

How to add type checking to JavaScript files using TypeScript. The type system has different levels of strictness when working with a codebase.

## Signature / Usage

```js
// @ts-check
/** @type {number} */
var x;

x = 0; // OK
// @ts-expect-error
x = false; // Not OK
```

## Notes

- Strictness levels, each a move towards a safer type system (not every project needs that level of verification):
  - A type-system based only on inference with JavaScript code
  - Incremental typing in JavaScript via JSDoc
  - Using `// @ts-check` in a JavaScript file
  - TypeScript code
  - TypeScript with `strict` enabled
- TypeScript with JavaScript: an editor that uses TypeScript to provide tooling such as auto-complete, jump to symbol and refactoring tools like rename.
- Providing type hints via JSDoc: in a `.js` file types can often be inferred; when they cannot, specify them with JSDoc syntax. JSDoc annotations before a declaration set the type of that declaration. Without `@ts-check`, `x = false` in `/** @type {number} */ var x;` raises no error in a JS project.
- `// @ts-check` on the first line of a `.js` file makes TypeScript raise errors for that file. For many JavaScript files, switch to a `jsconfig.json`.
- `// @ts-nocheck` skips checking of a file.
- `// @ts-ignore` or `// @ts-expect-error` on the preceding line ignores errors on a specific line.
- Changed (7.0): JavaScript support differs between TypeScript 6.0 and 7.0 (Go-native compiler); see type-checking-javascript-files.md and the "JavaScript support" section of https://github.com/microsoft/typescript-go/blob/typescript/v7.0.2/CHANGES.md.

## Related

- [Type Checking JavaScript Files](./type-checking-javascript-files.md)
- [JSDoc Reference - Types](./jsdoc-types.md)
- [Creating .d.ts Files from .js files](./creating-dts-from-js.md)
