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

### Compatible Node.js Modules
`async_hooks` (AsyncLocalStorage subset), `events`, `buffer`, `assert`, `util`

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

- Must use ES modules (`import`/`export`); add `"type": "module"` to `package.json` or use `.mjs` extension if not using a framework
- `node_modules` can be used if they implement ES Modules and don't use native Node.js APIs
- Check runtime with `typeof EdgeRuntime !== 'string'` (dead-code eliminated in Node.js)
- Env vars via `process.env`; reserved names (`constructor`, `hasOwnProperty`, etc.) are ignored

## Related

- [node-js-runtime.md](./node-js-runtime.md)
- [runtimes.md](./runtimes.md)
- [routing-middleware.md](./routing-middleware.md)
- [streaming.md](./streaming.md)
