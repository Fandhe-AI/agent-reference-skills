# Edge Runtime

Built on V8; runs in isolated environments without containers or VMs. Executes closest to the user by default. Migration to Node.js is recommended for improved performance and reliability.

> **Warning:** Vercel recommends migrating from Edge to Node.js runtime for improved performance and reliability. Both runtimes run on fluid compute with Active CPU pricing.

## Signature / Usage

```ts
// app/api/my-function/route.ts (Next.js App Router)
export const runtime = 'edge'; // 'nodejs' is the default

export function GET(request: Request) {
  return new Response('Hello from Edge!', { status: 200 });
}
```

```ts
// api/handler.ts (other frameworks)
export const config = {
  runtime: 'edge',
  regions: ['iad1', 'hnd1'], // optional: pin to specific regions
};

export default function handler(request: Request) {
  return new Response('Hello!');
}
```

## Region Behavior

- Default: executes in the region **closest to the incoming request**
- Override with `regions` config array (or `preferredRegion` for Next.js App Router)
- Automatic failover to nearest CDN region on downtime (all plans)

## Supported APIs

### Network
`fetch`, `Request`, `Response`, `Headers`, `FormData`, `File`, `Blob`, `URLSearchParams`, `Event`, `EventTarget`, `PromiseRejectEvent`

### Encoding
`TextEncoder`, `TextDecoder`, `atob`, `btoa`

### Streams
`ReadableStream`, `WritableStream`, `TransformStream`, `WritableStreamDefaultWriter`, `ReadableStreamDefaultReader`, `ReadableStreamBYOBReader`

### Crypto
`crypto`, `SubtleCrypto`, `CryptoKey`

### Other Web Standard APIs
`AbortController`, `AbortSignal`, `DOMException`, `structuredClone`, `URLPattern`, `URL`, `console`, `setTimeout` / `setInterval` / `clearTimeout` / `clearInterval`, `Intl`, `JSON`, `Promise`, `Proxy`, `Reflect`, `WebAssembly`, `SharedArrayBuffer`, `Atomics`, `BigInt`, typed arrays (`Uint8Array`, `Float32Array`, ...), `Map` / `Set` / `WeakMap` / `WeakSet`, `Date`, `Math`, `RegExp`, `encodeURI` / `decodeURI` (and `Component` variants), standard JS error classes and other core globals

### Compatible Node.js Modules
`async_hooks` (AsyncLocalStorage subset), `events`, `buffer`, `assert`, `util`; importable with and without the `node:` prefix. `Buffer` is also exposed globally

## Limitations

| Limit | Value |
|-------|-------|
| Max duration (response start) | 25 seconds |
| Max streaming duration | 300 seconds |
| Bundle size — Hobby | 1 MB (after gzip) |
| Bundle size — Pro | 2 MB (after gzip) |
| Bundle size — Enterprise | 4 MB (after gzip) |

## Unsupported / Disabled APIs

| API | Reason |
|-----|--------|
| `eval` | Security |
| `new Function(evalString)` | Security |
| `WebAssembly.compile` | Dynamic code execution |
| `WebAssembly.instantiate` (from buffer) | Dynamic code execution |
| Most Node.js APIs (fs, net, etc.) | Not available |
| `require()` | Use `import` instead |

## Notes

- Edge Functions as a product are deprecated (docs page `/docs/functions/runtimes/edge/edge-functions`, "Edge Functions (Deprecated)"): do not use them for new projects; use Vercel Functions on the Node.js runtime (the default; remove `export const runtime = 'edge'`). The deprecation applies to standalone Edge Functions, not to Routing Middleware (Routing Middleware remains supported; note the deprecation page says it 'uses the edge runtime by default', but the current Routing Middleware docs state the `runtime` default is `nodejs` — see routing-middleware.md)
- Starting in Next.js 16.3, setting `runtime = 'edge'` is no longer supported; routes and pages run on Node.js (so the Next.js example above applies to earlier versions)
- `WebAssembly.instantiate` is listed as disabled (from a buffer) but the page also states it is supported when the Wasm source is provided via an `import` statement; dynamic compilation from a buffer or byte array at runtime is not possible
- Dynamic code execution (`eval`, `new Function`) leads to a runtime error; make sure libraries used do not rely on it
- Maximum 25 seconds to begin sending a response; streaming may continue beyond that and async work can continue in the background after the response. The code size limit includes JS code, imported libraries and files (such as fonts) bundled in the function
- Source: https://vercel.com/docs/functions/runtimes/edge (fetched 2026-11-14)
- Must use ES modules (`import`/`export`); add `"type": "module"` to `package.json` or use `.mjs` extension if not using a framework
- `node_modules` can be used if they implement ES Modules and don't use native Node.js APIs
- Check runtime with `typeof EdgeRuntime !== 'string'` (dead-code eliminated in Node.js)
- Env vars via `process.env`; reserved names (`constructor`, `hasOwnProperty`, etc.) are ignored

## Related

- [node-js-runtime.md](./node-js-runtime.md)
- [runtimes.md](./runtimes.md)
- [routing-middleware.md](./routing-middleware.md)
- [streaming.md](./streaming.md)
