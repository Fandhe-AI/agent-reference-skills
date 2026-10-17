# Wasm Runtime

Use WebAssembly (compiled from C, Go, Rust, etc.) in Vercel Functions or Routing Middleware when the runtime is `edge`, `nodejs`, or `bun`.

## Signature / Usage

```ts
// app/api/wasm/route.ts (Next.js App Router) — nodejs runtime (Fluid compute by default)
import path from 'node:path';
import fs from 'node:fs';
import type * as addWasmModule from '../../../add.wasm'; // import type definitions at the root of your project

const wasmBuffer = fs.readFileSync(path.resolve(process.cwd(), './add.wasm')); // path from root
const wasmPromise = WebAssembly.instantiate(wasmBuffer);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const num = Number(url.searchParams.get('number') || 10);
  const { add_one: addOne } = (await wasmPromise).instance
    .exports as typeof addWasmModule;

  return new Response(`got: ${addOne(num)}`);
}
```

## Steps

1. Compile the C / Go / Rust project to a `.wasm` binary and copy it to the root of your Next.js project (add a `.d.ts` definition for TypeScript)
2. Create a Next.js App Router route at `app/api/wasm/route.ts` that instantiates it (above)
3. Run locally with `vercel dev` and browse to `http://localhost:3000/api/wasm?number=12`, which returns `got: 13`

## Notes

- Pre-compiled WebAssembly can be imported with the `?module` suffix, giving a Wasm module that can be instantiated with `WebAssembly.instantiate()`
- In Edge Runtime, `WebAssembly.instantiate` requires the Wasm source to be provided via an import statement; a buffer or byte array cannot be used to compile the module dynamically at runtime
- Works in production and locally with `vercel dev`
- The official page labels the file `api/wasm/route.ts`; the named `GET` export and the three-levels-up `add.wasm` type import match a Next.js App Router route at `app/api/wasm/route.ts`, which serves `/api/wasm`.
- Source: https://vercel.com/docs/functions/runtimes/wasm

## Related

- [edge-runtime.md](./edge-runtime.md)
- [node-js-runtime.md](./node-js-runtime.md)
- [bun-runtime.md](./bun-runtime.md)
- [routing-middleware.md](./routing-middleware.md)
