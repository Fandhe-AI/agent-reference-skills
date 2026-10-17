---
source: https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
---

# Migrating from JavaScript

Start a JS to TS migration with a bare-bones `tsconfig.json`, then convert CommonJS modules and tighten checks.

```json
{
  "compilerOptions": {
    "outDir": "./built",
    "allowJs": true,
    "target": "es2015",
    "module": "commonjs"
  },
  "include": ["./src/**/*"]
}
```

```ts
// Node/CommonJS: var foo = require("foo");
import foo = require("foo");

foo.doStuff();

// module.exports = foo;
function foo2() {
  // ...
}
export = foo2;

// Overloads for a function that inspects `arguments`
function myCoolFunction(f: (x: number) => void, nums: number[]): void;
function myCoolFunction(f: (x: number) => void, ...nums: number[]): void;
function myCoolFunction() {
  // ...
}

declare var maybeList: string[] | null;
maybeList!.length; // postfix `!` asserts non-null
```

## Notes

- Layout assumed by the source: `src/` holds the `.js` inputs, `built/` receives output, `tsconfig.json` at the project root; running `tsc` then produces `built/`.
- Rename `.js` to `.ts` (or `.tsx` for JSX) one file at a time; use `noEmitOnError` to stop emit on errors and `noImplicitAny`, `strictNullChecks`, `noImplicitThis` to tighten.
- For missing declarations install `@types/<package>` (the source shows `npm install -S @types/lodash`).
- Version caveat: this sample is TypeScript 6.0-era text. In 6.0 `target: es5` is deprecated and removed in 7.0, so this sample uses `es2015` instead of the source's `"es5"`. Also, from 6.0 the default `module` is `esnext`, where `import foo = require("foo")` and `export = foo2` are not allowed; set `"module": "commonjs"` (or `nodenext`) explicitly to use them.
- The source's `tsconfig.json` has no `module` setting; `"module": "commonjs"` and `target: "es2015"` were added here for 6.0+ compatibility.
- The Gulp section of the source is intentionally not reproduced.
