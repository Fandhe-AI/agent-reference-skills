---
source: https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html
---

# Creating .d.ts Files from .js files

Since TypeScript 3.7, `.d.ts` files can be generated from JavaScript using JSDoc syntax, so the TypeScript editor experience is available without porting the project or maintaining `.d.ts` files by hand.

## Signature / Usage

```jsonc
{
  // Change this to match your project
  "include": ["src/**/*"],

  "compilerOptions": {
    // Tells TypeScript to read JS files, as
    // normally they are ignored as source files
    "allowJs": true,
    // Generate d.ts files
    "declaration": true,
    // This compiler run should
    // only output d.ts files
    "emitDeclarationOnly": true,
    // Types should go into this directory.
    // Removing this would place the .d.ts files
    // next to the .js files
    "outDir": "dist",
    // go to js file when using IDE functions like
    // "Go to Definition" in VSCode
    "declarationMap": true
  }
}
```

CLI equivalent:

```sh
npx -p typescript tsc src/**/*.js --declaration --allowJs --emitDeclarationOnly --outDir types
```

## Notes

- Up to four steps: add TypeScript to dev dependencies; add a `tsconfig.json`; run the compiler to generate the d.ts files; (optional) edit `package.json` to reference the types.
- Make sure the generated files are included in the published package if they are in the project's `.gitignore`.
- TypeScript replicates node resolution for modules in `package.json`, with an additional step for `.d.ts`: first the optional `types` field, then `"main"`, finally `index.d.ts` in the root.

| Package.json | Location of default .d.ts |
| --- | --- |
| No "types" field | checks "main", then index.d.ts |
| "types": "main.d.ts" | main.d.ts |
| "types": "./dist/main.js" | ./dist/main.d.ts |

If `"types"` is absent, `"main"` is used:

| Package.json | Location of default .d.ts |
| --- | --- |
| No "main" field | index.d.ts |
| "main":"index.js" | index.d.ts |
| "main":"./dist/index.js" | ./dist/index.d.ts |

- To test `.d.ts` files, the source suggests tsd (https://github.com/SamVerschueren/tsd) or TSTyche (https://github.com/tstyche/tstyche).
- Changed (7.0): the declaration emit and JavaScript parsing were rewritten in the Go compiler. `.d.ts` emit from `.js` input has substantially changed behavior; supported tags are expected to be emitted with correct semantics, but matching the TypeScript 6.0 output exactly is a non-goal. Declaration generation is not well-defined in the presence of errors (including those suppressed with `ts-ignore` / `ts-expect-error`). Source: https://github.com/microsoft/typescript-go/blob/typescript/v7.0.2/CHANGES.md ("Declaration Emit").

## Related

- [JS Projects Utilizing TypeScript](./intro-to-js-with-ts.md)
- [Type Checking JavaScript Files](./type-checking-javascript-files.md)
- [JSDoc Reference - Types](./jsdoc-types.md)
