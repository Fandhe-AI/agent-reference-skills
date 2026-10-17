---
source: https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html
---

# Using Babel with TypeScript

Transpile with Babel and let `tsc` do type checking and `.d.ts` generation only.

```json
{
  "compilerOptions": {
    // Ensure that .d.ts files are created by tsc, but not .js files
    "declaration": true,
    "emitDeclarationOnly": true,
    // Ensure that Babel can safely transpile files in the TypeScript project
    "isolatedModules": true
  }
}
```

## Notes

- Heuristic from the source: if build output is mostly the same as the source, use `tsc`; if you need a pipeline with multiple outputs, use Babel (preset-typescript) for transpiling and `tsc` for type checking.
- Babel does not type check and cannot create `.d.ts` files, so run a separate `tsc` check using a `tsconfig.json` with the flags above.
- The source shows only the `compilerOptions` fragment; wrapping it in a complete object here is only for valid JSON, and the comments require a `tsconfig.json` (JSONC) context.
