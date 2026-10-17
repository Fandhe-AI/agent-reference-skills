---
source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html
---

# TypeScript 5.2

`using` declarations and explicit resource management, decorator metadata, mixed named/anonymous tuple elements, and method calls on unions of arrays.

## Signature / Usage

```ts
class TempFile implements Disposable {
    #path: string;
    #handle: number;

    constructor(path: string) {
        this.#path = path;
        this.#handle = fs.openSync(path, "w+");
    }

    [Symbol.dispose]() {
        // Close the file and delete it.
        fs.closeSync(this.#handle);
        fs.unlinkSync(this.#path);
    }
}

export function doSomeWork() {
    using file = new TempFile(".some_temp_file");
    // use file...
}
```

## Options / Props

| Feature | Description |
|---------|-------------|
| `using` / `await using` | Block-scoped bindings disposed at end of scope in last-in-first-out order via `Symbol.dispose` / `Symbol.asyncDispose` |
| `Disposable`, `AsyncDisposable` | Global types |
| `DisposableStack`, `AsyncDisposableStack` | `defer`, `use`, `adopt`; themselves disposable |
| `SuppressedError` | Error subtype with `error` (most recent) and `suppressed` properties when disposal throws after another error |
| Decorator metadata | Decorator context gets `metadata`; read from class via `Symbol.metadata` |
| Labeled tuple elements | Labeled and unlabeled elements can mix; labels preserved when spreading |
| Unions of arrays | `string[] | number[]` methods (`filter`, `find`, `some`, `every`, `reduce`) callable via `(string | number)[]` |
| Type-only import extensions | `import type { T } from "./x.ts"` allowed regardless of `allowImportingTsExtensions` |

## Notes

- Runtime polyfills needed: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`; for `using` only the symbols:

```ts
Symbol.dispose ??= Symbol("Symbol.dispose");
Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");
```

- Set `target` to `es2022` or below and `lib` to include `esnext` or `esnext.disposable` (for decorator metadata, `esnext.decorators`, with `Symbol.metadata ??= Symbol("Symbol.metadata")`).
- Breaking changes: `module` and `moduleResolution` must agree when either is `node16` / `nodenext` (e.g. `--module esnext --moduleResolution node16` is rejected); `TupleType.labeledElementDeclarations` may hold `undefined`; merged declarations must all be exported or all local (also in ambient contexts).
- 5.3 notes that 5.2 optimized recursive type relation tracking with a `Set` (over 33% faster on a reported drizzle test case; the release notes text says "In TypeScript 5.3").

## Related

- [TypeScript 5.3](./typescript-5-3.md)
- [TypeScript 5.1](./typescript-5-1.md)
