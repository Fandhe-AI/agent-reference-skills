---
source: https://vite.dev/guide/features#webassembly
---

# WebAssembly

Vite supports importing pre-compiled `.wasm` files either directly as an ES module, or with `?init` for explicit control over instantiation.

## Signature / Usage

ESM integration: Vite reads the module's imports and exports from the binary, instantiates it, and re-exposes its exports as named ES module exports.

```js
import { add } from './add.wasm'

console.log(add(1, 2)) // 3
```

Manual initialization with `?init` (default export is an init function returning a Promise of `WebAssembly.Instance`):

```js
import init from './example.wasm?init'

init().then((instance) => {
  instance.exports.test()
})
```

The init function can take an importObject passed to `WebAssembly.instantiate` as its second argument:

```js
init({
  imports: {
    someFunc: () => {
      /* ... */
    },
  },
}).then(() => {
  /* ... */
})
```

Accessing the `Module` object (e.g. to instantiate multiple times) via an explicit URL import:

```js
import wasmUrl from 'foo.wasm?url'

const main = async () => {
  const responsePromise = fetch(wasmUrl)
  const { module, instance } =
    await WebAssembly.instantiateStreaming(responsePromise)
  /* ... */
}

main()
```

TypeScript declaration file `add.d.wasm.ts` (requires `allowArbitraryExtensions` in `tsconfig.json`):

```ts
export function add(a: number, b: number): number
```

## Notes

- If the WebAssembly module declares imports, Vite resolves them from JavaScript modules: each import's module name is an import specifier (resolved relative to the `.wasm` file) and requested members are wired into the instance automatically.
- Follows the WebAssembly/ES Module Integration proposal. Because instantiation is asynchronous, a directly imported `.wasm` file behaves as an async module and requires top-level `await` support.
- Without `allowArbitraryExtensions` TypeScript reports errors like `Module '"*.wasm"' has no exported member 'add'`; with it enabled TypeScript looks for `{filename}.d.wasm.ts`.
- In production builds, `.wasm` files smaller than `assetsInlineLimit` are inlined as base64 strings; otherwise they are treated as a static asset and fetched on demand.
- For SSR builds only Node.js compatible runtimes are supported: both direct `.wasm` imports and `.wasm?init` rely on `node:fs`.

## Related

- [Static Assets](./static-assets.md)
- [build.assetsInlineLimit](../config-build/build-assets-inline-limit.md)
