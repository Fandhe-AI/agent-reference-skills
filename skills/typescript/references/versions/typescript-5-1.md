---
source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-1.html
---

# TypeScript 5.1

Easier implicit returns for `undefined`-returning functions, unrelated getter/setter types, `JSX.ElementType`, namespaced JSX attributes, and `typeRoots` behavior changes.

## Signature / Usage

```ts
declare function takesFunction(f: () => undefined): undefined;

// ✅ Works in TypeScript 5.1!
function f4(): undefined {
    // no returns
}
// ✅ Works in TypeScript 5.1!
takesFunction((): undefined => {
    // no returns
});
```

## Options / Props

| Feature | Description |
|---------|-------------|
| `undefined`-returning functions | May have no `return`; a function with no return expressions passed where `() => undefined` is expected infers `undefined`; under `--noImplicitReturns` not every path needs an explicit `return` |
| Unrelated getter/setter types | `get` and `set` accessors may have completely unrelated types, given explicit annotations |
| `JSX.ElementType` | Specifies precisely what is valid as a JSX tag (function / class components, intrinsic tags), decoupled from `JSX.Element` |
| Namespaced JSX attributes | `<Foo a:b="hello" />`; namespaced tags looked up on `JSX.IntrinsicElements` |
| `typeRoots` in module resolution | If the lookup strategy cannot resolve a path, packages resolve relative to `typeRoots` |
| Move declarations to existing files (preview), linked cursors for JSX tags, `@param` snippet completions | Editor features |

## Notes

- Unrelated accessor types example:

```ts
class SafeBox {
    #value: string | undefined;
    // Only accepts strings!
    set value(newValue: string) {
    }
    // Must check for 'undefined'!
    get value(): string | undefined {
        return this.#value;
    }
}
```

- Breaking: ES2020 and Node.js 14.17 are minimum runtime requirements to run TypeScript 5.1.
- Breaking: an explicit `typeRoots` disables upward walks for `node_modules/@types`; add `./node_modules/@types` (and any shared monorepo path) to `typeRoots` if `TS2688` errors appear.

## Related

- [TypeScript 5.2](./typescript-5-2.md)
- [TypeScript 5.0](./typescript-5-0.md)
