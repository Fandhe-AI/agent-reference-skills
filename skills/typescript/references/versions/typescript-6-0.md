---
source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html
---

# TypeScript 6.0

Transition release preparing for the native TypeScript 7.0: new inference, module-resolution and lib features, plus new defaults and deprecations (see the deprecations page).

## Signature / Usage

```json
{
  "name": "my-package",
  "type": "module",
  "imports": {
    "#/*": "./dist/*"
  }
}
```

Subpath imports starting with `#/` are supported under `moduleResolution` `nodenext` and `bundler` (supported in newer Node.js 20 releases).

## Options / Props

| Feature | Description |
|---------|-------------|
| Less context-sensitivity on `this`-less functions | A function whose `this` is never used is not contextually sensitive, so method-syntax callbacks infer like arrow functions regardless of property order |
| `#/` subpath imports | `imports` keys may start with `#/` under `nodenext` / `bundler` |
| `--moduleResolution bundler` with `--module commonjs` | New allowed combination; suited as an upgrade path from `--moduleResolution node` |
| `--stableTypeOrdering` | Makes 6.0's type ordering match 7.0's (deterministic union/property ordering); can slow type-checking by up to 25% |
| `es2025` for `target` and `lib` | New types for built-ins (e.g. `RegExp.escape`); moves `Promise.try`, `Iterator` methods, `Set` methods from `esnext` into `es2025` |
| `Temporal` types | Built-in types via `--target esnext` or `"lib": ["esnext"]` (or `esnext.temporal`) |
| `getOrInsert` / `getOrInsertComputed` | New `Map` / `WeakMap` methods in the `esnext` lib |
| `RegExp.escape` | In the `es2025` lib |
| `dom` lib | Now contains `dom.iterable` and `dom.asynciterable` (those names remain as empty files) |
| `--ignoreConfig` | Skip the error when file arguments are given while a `tsconfig.json` exists |

## Notes

- Inference example (the second call now works in 6.0):

```ts
declare function callIt<T>(obj: {
    produce: (x: number) => T,
    consume: (y: T) => void,
}): void;

callIt({
    consume(y) { return y.toFixed(); },
    produce(x: number) { return x * 2; },
});
```

- `getOrInsert`:

```ts
function processOptions(compilerOptions: Map<string, unknown>) {
    let strictValue = compilerOptions.getOrInsert("strict", true);
    // ...
}
```

- `getOrInsertComputed` takes a callback called only when the key is absent; the callback receives the key.
- `--stableTypeOrdering` is intended only to diagnose differences between 6.0 and 7.0, not as a long-term feature. Type errors that appear with it are usually inference differences; add explicit type arguments or variable annotations.
- 6.0 continues to be API compatible with TypeScript 5.9. Default changes and deprecations are on the deprecations page; 7.0 removes the deprecated options.
- Subpath imports `#/` and `moduleResolution`: see the modules reference pages.

## Related

- [TypeScript 6.0 Breaking Changes and Deprecations](./typescript-6-0-deprecations.md)
- [TypeScript 7.0 (native Go port)](./typescript-7-0.md)
- [TypeScript 5.9](./typescript-5-9.md)
