---
source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md
---

# HTTP/1.1 REST fallback mode

By default gax-based clients use gRPC (`@grpc/grpc-js`, based on the Node.js `http2` module). The `fallback` option switches to an HTTP/1.1 transport that sends and receives JSON, for non-Node.js environments or when gRPC cannot be used.

## Signature / Usage

Constructor option in `fallback.d.ts` (`GrpcClient` constructor, google-gax 6.17.0):

```ts
        /**
         * Fallback mode to use instead of gRPC.
         * A string is accepted for compatibility, all non-empty string values enable the HTTP REST fallback.
         */
        fallback?: boolean | string;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fallback` | `boolean \| 'rest' \| 'proto'` (`ClientOptions`) | `false`, unless the `window` object is defined | `true` enables HTTP fallback. For compatibility, any non-empty string is treated as `true`. |

## Notes

- In a browser context (`window` defined) fallback is enabled automatically; set `fallback` to `false` to override.
- A special browser-compatible transport is used instead of gRPC and sends/receives JSON over HTTP.
- Source inconsistency: the HOWTO says `true` or `false` (or any non-empty string); `clientInterface.d.ts` types the client option as `boolean | 'rest' | 'proto'`, while `fallback.d.ts` types the fallback `GrpcClient` option as `boolean | string`. The meaning of `'proto'` is not documented in the sources.
- `GoogleError.httpStatusCode` ("The HTTP response status received by the REST fallback transport", `googleError.d.ts`) is undefined for gRPC calls.
- The fallback `createApiCall` docstring in `fallback.d.ts` reads "Throws exception on unsupported streaming calls".
- Applies to `google-gax` 6.17.0 (npm). The snippet is a fragment (no import context).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/fallback.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/clientInterface.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/googleError.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)

## Related

- [client-options.md](./client-options.md)
- [streaming.md](./streaming.md)
