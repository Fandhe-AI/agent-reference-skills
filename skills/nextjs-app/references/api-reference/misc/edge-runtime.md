# Edge Runtime

Next.js has two server runtimes: the Node.js Runtime (default, full Node.js API access, used for rendering), and the Edge Runtime, a more limited Web-standard API set used in Proxy.

## Signature / Usage

```javascript filename="proxy.ts"
export const config = {
  unstable_allowDynamic: [
    // allows a single file
    '/lib/utilities.js',
    // use a glob to allow anything in the function-bind 3rd party module
    '**/node_modules/function-bind/**',
  ],
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| unstable_allowDynamic | `string \| string[]` (glob) | Relaxes the dynamic-code-evaluation check for specific files, relative to the app root folder. |

## Notes

- Supports Web Standard APIs: network (`fetch`, `Request`, `Response`, `Headers`, `FormData`, `WebSocket`, ...), encoding (`TextEncoder`/`TextDecoder`, `atob`/`btoa`, ...), streams (`ReadableStream`, `WritableStream`, `TransformStream`, ...), crypto (`crypto`, `SubtleCrypto`, `CryptoKey`), and most global JS objects, plus the Next.js `AsyncLocalStorage` polyfill and `process.env`.
- Does not support all Node.js APIs — no filesystem access — and does not support Incremental Static Regeneration (ISR).
- `require()` is not allowed; use ES Modules. `node_modules` can be used only if they implement ESM and avoid native Node.js APIs.
- `eval`, `new Function(evalString)`, `WebAssembly.compile`, and `WebAssembly.instantiate` are disabled and will not work.
- Unreachable dynamic-code-evaluation statements that survive treeshaking will throw a runtime error if actually executed on the Edge; use `unstable_allowDynamic` in the Proxy config to allow specific files.

## Related

- [Proxy](../file-conventions/proxy.md)
- [loading.js](../file-conventions/loading.md)
