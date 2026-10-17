---
source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-4.html
---

# TypeScript 5.4

Preserved narrowing in closures after last assignments, `NoInfer<T>`, `Object.groupBy` / `Map.groupBy`, `--module preserve`, and checked import attributes.

## Signature / Usage

```ts
function createStreetLight<C extends string>(colors: C[], defaultColor?: NoInfer<C>) {
    // ...
}

createStreetLight(["red", "yellow", "green"], "blue");
//                                            ~~~~~~
// error!
// Argument of type '"blue"' is not assignable to parameter of type '"red" | "yellow" | "green" | undefined'.
```

## Options / Props

| Feature | Description |
|---------|-------------|
| Closure narrowing | Narrowing of parameters and `let` variables is preserved in non-hoisted closures created after the last assignment (not if assigned in any nested function) |
| `NoInfer<T>` | Utility type that blocks type inference from the wrapped position |
| `Object.groupBy` / `Map.groupBy` | Declarations added; need `target: esnext` or `lib` adjustment (expected under a future `es2024`) |
| `--module preserve` | Implies `moduleResolution: bundler`, `esModuleInterop: true`, `resolveJsonModule: true`; `import x = require()` emits `require()`, `import` emitted as-is |
| `require()` with `--moduleResolution bundler` | `import ... = require(...)` now usable with `module: preserve` |
| Checked import attributes | Checked against a global `ImportAttributes` interface |
| Quick fix | Adds missing parameters to functions called with too many arguments |

## Notes

- `--module preserve` example:

```json5
{
    "compilerOptions": {
        "module": "preserve",
        // ^ also implies:
        // "moduleResolution": "bundler",
        // "esModuleInterop": true,
        // "resolveJsonModule": true,
    }
}
```

- The syntax chosen (`import` vs `require`) selects the conditional-exports branch (`import` / `require`) under `preserve`.
- 5.4 was the last version in which the 5.0-deprecated options (`charset`, `target: ES3`, `importsNotUsedAsValues`, `noImplicitUseStrict`, `noStrictGenericChecks`, `keyofStringsOnly`, `suppressExcessPropertyErrors`, `suppressImplicitAnyIndexErrors`, `out`, `preserveValueImports`, `prepend`, implicit OS-specific `newLine`) work normally; they stop having effect in 5.5.
- Behavioral changes: more accurate conditional type constraints (a union is produced when `T extends Foo` cannot be proven); more aggressive reduction of intersections between type variables and primitives; improved template-string checks; error when a type-only import conflicts with a local value under `isolatedModules` (use `import type`); stricter enum assignability (known values must be identical); enum members cannot be named `Infinity`, `-Infinity`, `NaN`; mapped types over tuples with `any` rest elements keep element types.

## Related

- [TypeScript 5.5](./typescript-5-5.md)
- [TypeScript 5.3](./typescript-5-3.md)
