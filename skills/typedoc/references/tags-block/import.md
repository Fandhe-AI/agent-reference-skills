# @import

Block tag for declaring type imports in JavaScript projects.

## Signature / Usage

```
@import { TypeName } from "module-name"
```

The `@import` tag is recognized for use in JavaScript projects. It leverages a TypeScript 5.5+ feature to declare type imports through JSDoc comments in JavaScript files.

Comments containing `@import` are ignored by TypeDoc. In other words, the purpose of this tag is to provide type information to the TypeScript compiler, and it has no effect on the generated documentation.

```javascript
/** @import { SomeType } from "some-module" */

/**
 * @param {SomeType} myValue
 */
function doSomething(myValue) {
    // ...
}
```

## Notes

- A tag exclusive to JavaScript projects
- Corresponds to a feature introduced in TypeScript 5.5+
- The entire comment block containing `@import` is ignored by TypeDoc
- It never appears in the generated documentation
- TypeScript projects should use normal `import` statements instead

## Related

- [TypeScript 5.5 release notes - @import JSDoc tag](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#the-jsdoc-import-tag)
