---
source: https://www.typescriptlang.org/tsconfig/#JavaScript_Support_6247
---

# JavaScript Support options

Options that let JavaScript files participate in a TypeScript program: `allowJs`, `checkJs` and `maxNodeModuleJsDepth`.

## Signature / Usage

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  }
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `allowJs` | `false`, unless `checkJs` is set | — | Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files. |
| `checkJs` | — | — | Enable error reporting in type-checked JavaScript files. |
| `maxNodeModuleJsDepth` | — | — | Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`. |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default for that option.
- `allowJs`: lets JavaScript files be imported inside the project instead of only `.ts` / `.tsx`. Useful to add TypeScript files incrementally into JS projects, and together with `declaration` and `emitDeclarationOnly` to create declarations for JS files.
- `checkJs`: works in tandem with `allowJs`; it is the equivalent of including `// @ts-check` at the top of all JavaScript files in the project.
- `maxNodeModuleJsDepth`: the maximum dependency depth to search under `node_modules` and load JavaScript files; only usable when `allowJs` is enabled. Ideally it stays at 0 (the default) and `.d.ts` files define module shapes; turning it on costs speed and potential accuracy.
- Changed (7.0): JavaScript support in the Go-based compiler is intentionally trimmed so JS files expose TypeScript features with the same semantics: constructor functions (expando `this.x` / `prototype` assignments) are no longer supported (use `class`), Closure-specific features and several JSDoc tags/types are removed (`@class` / `@constructor`, `@enum`, Closure function types, standalone `?`), and `arguments` no longer implies a `...args: any[]` parameter. With `"strict": false`, omitting arguments for parameters typed `undefined`, `unknown` or `any` is now an error. `.d.ts` emit from `.js` input has substantially changed behavior. See typescript-go `CHANGES.md` (tag v7.0.2).

Constructor functions are no longer supported in 7.0; use classes (from CHANGES.md):

```js
class C {
  constructor() {
    this.property = 1;
  }
  method() {}
}
```

## Related

- [emit](./emit.md)
- [type-checking](./type-checking.md)
