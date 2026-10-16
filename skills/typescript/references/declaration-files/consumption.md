---
source: https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html
---

# Consumption

How to download and use d.ts files for a JavaScript library in your project.

## Signature / Usage

Getting declarations requires no tools apart from npm:

```cmd
npm install --save-dev @types/lodash
```

Then use the library with imports:

```ts
import * as _ from "lodash";
_.padStart("Hello TypeScript!", 20, " ");
```

Or, without modules, via the global variable:

```ts
_.padStart("Hello TypeScript!", 20, " ");
```

## Notes

- If the npm package already includes its declaration file (see Publishing), downloading the corresponding `@types` package is not needed.
- Works for both modules and global code.
- Declaration packages should have the same name as the npm package prefixed with `@types/`; otherwise the Yarn package search can find it.
- If the declaration file is not present, contribute one to DefinitelyTyped.

## Related

- [Publishing](./publishing.md)
- [Declaration Files Introduction](./introduction.md)
