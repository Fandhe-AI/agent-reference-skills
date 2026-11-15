---
source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md
---

# Calling API methods and per-call options

Regular (unary) client methods return a cancellable promise that resolves to a tuple. The second parameter is a `CallOptions` object that overrides the default retry settings, timeouts and pagination behavior for that one call.

## Signature / Usage

### Await a call

```ts
const [response] = await client.sampleMethod(request);
```

### Promise style

Adapted (not in the official docs): the destructuring parameter is parenthesized (`([response]) =>`), the method name is `sampleMethod` as in the rest of the HOWTO, and a `.catch` handler is added so a failed call is not an unhandled rejection.

```ts
client.sampleMethod(request).then(([response]) => { /* handle response */ }).catch(err => { /* handle error */ });
```

### Cancel a running call

Adapted (not in the official docs): a rejection handler is attached before `promise.cancel()`, because cancelling rejects the promise and an unhandled rejection terminates the Node.js process.

```ts
const promise = client.sampleMethod(request);
promise.catch(err => { /* handle error */ });
// the returned promise can be canceled:
promise.cancel();
```

### Override call options

```ts
const [response] = await client.sampleMethod(request, options);
```

`CallOptions` in `google-gax` 6.17.0 (`gax.d.ts`):

```ts
export interface CallOptions {
    timeout?: number;
    retry?: Partial<RetryOptions> | null;
    autoPaginate?: boolean;
    maxResults?: number;
    maxRetries?: number;
    otherArgs?: {
        [index: string]: any;
    };
    bundleOptions?: BundleOptions | null;
    isBundling?: boolean;
    longrunning?: BackoffSettings;
    apiName?: string;
    retryRequestOptions?: RetryRequestOptions;
    enableTelemetryTracing?: boolean;
    enableTelemetryLogging?: boolean;
    /**
     * Internal context used by resumable upload methods. Populated by
     * GAPIC-generated client libraries; do not set manually.
     */
    resumableUpload?: ResumableUploadContext;
    /**
     * An AbortSignal to cancel the ongoing non-streaming API call.
     */
    signal?: AbortSignal;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `timeout` | number | Client-side timeout for API calls (unit not stated in the source). Ignored for retrying calls. |
| `retry` | `Partial<RetryOptions> \| null` | Whether and how to retry on transient errors. `null`: the call will not retry. See `retry-timeout.md`. |
| `autoPaginate` | boolean | `false`: page unrolling is not performed. See `auto-pagination.md`. |
| `maxResults` | number | Paged calls stop when this many elements were returned; by default the pages are unrolled to the end. |
| `maxRetries` | number | Declared in `CallOptions`; no docstring. |
| `longrunning` | `BackoffSettings` | Backoff settings used for polling. See `long-running-operations.md`. |
| `signal` | `AbortSignal` | Cancels the ongoing non-streaming call. |
| `otherArgs` | object | Additional arguments passed to the API call. |
| `isBundling` | boolean | `false` suppresses bundling for bundled methods. |
| `retryRequestOptions` | `RetryRequestOptions` | Only relevant to server streaming; "Will be deprecated in a future release". |
| `enableTelemetryTracing`, `enableTelemetryLogging` | boolean | Per-call telemetry switches; see `nodejs-observability.md`, `logging.md`. |

## Notes

- Streaming methods take the options in a different position; see `streaming.md`.
- Source inconsistency: the `CallOptions` JSDoc in `gax.d.ts` lists `pageToken` as a property, but the `CallOptions` interface does not declare it (`CallSettings` does). The interface is followed here.
- `@google-cloud/library` / `SampleClient` are placeholders; the HOWTO blocks are fragments.
- Corrected from the official docs: the HOWTO wrote `client.doStuff(request).then([response] => { /* handle response */ });` (a syntax error: an arrow function with a destructured parameter needs parentheses; it also has no rejection handler).
- Corrected from the official docs: the HOWTO wrote `const promise = client.sampleMethod(request);` / `promise.cancel();` with no rejection handler.
- From the function body of `OngoingCall.cancel()` and `OngoingCallPromise` in `build/src/call.js` of `google-gax` 6.17.0 (not documented in a docstring): `cancel()` rejects the returned promise with a `GoogleError` whose `code` is `Status.CANCELLED`, or goes through the transport's canceller.
- Applies to `google-gax` 6.17.0 (npm).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/gax.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/call.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)

## Related

- [retry-timeout.md](./retry-timeout.md)
- [long-running-operations.md](./long-running-operations.md)
- [streaming.md](./streaming.md)
- [auto-pagination.md](./auto-pagination.md)
