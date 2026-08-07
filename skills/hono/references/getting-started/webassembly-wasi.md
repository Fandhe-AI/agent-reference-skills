# WebAssembly (w/ WASI)

Run Hono inside a WASI-enabled WebAssembly component using StarlingMonkey and the Bytecode Alliance `jco` toolchain.

## Signature / Usage

```ts
// src/component.ts
import { Hono } from 'hono'
import { fire } from '@bytecodealliance/jco-std/wasi/0.2.6/http/adapters/hono/server'

const app = new Hono()
app.get('/hello', (c) => {
  return c.json({ message: 'Hello from WebAssembly!' })
})

fire(app)
export { incomingHandler } from '@bytecodealliance/jco-std/wasi/0.2.6/http/adapters/hono/server'
```

```sh
# bundle then componentize
jco componentize -w wit -o dist/component.wasm dist/component.js
jco serve dist/component.wasm
```

## Notes

- Requires `hono`, `@bytecodealliance/jco`, `@bytecodealliance/componentize-js`, `@bytecodealliance/jco-std`, and a bundler (rolldown, esbuild, or rollup); `componentize-js` only accepts a single bundled JS file
- Declare the HTTP handler export in `wit/component.wit`; fetch WASI interface deps with `wkg wit fetch`
- Project must use ES modules (`"type": "module"` in `package.json`); set `compilerOptions.module` to `nodenext`
- `jco serve` is development-only, not production-ready; production runtimes include `wasmtime` and other WASI-compatible hosts

## Related

- [Basic](./basic.md)
