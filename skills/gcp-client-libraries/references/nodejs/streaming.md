---
source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md
---

# Streaming methods

Server-streaming, bidirectional and client-streaming methods return Node.js streams. Where `CallOptions` go depends on the stream kind.

## Signature / Usage

### Server streaming

The result is an `EventEmitter` that emits `data` for every new response.

```ts
const stream = client.sampleServerStreamingMethod(request);
stream.on('data', (response) => { /* handle response */ });
stream.on('error', (err) => { /* handle error */ });
stream.on('end', () => { /* API call completed */ });
```

```ts
stream.cancel();
```

```ts
const stream = client.sampleServerStreamingMethod(request, options);
```

### Bi-directional streaming

The stream is readable and writable; `.write()` takes request objects and responses arrive in `data`.

```ts
const stream = client.sampleBidiStreamingMethod();
stream.on('data', (response) => { /* process response */ });
stream.on('error', (err) => { /* handle error */ });
stream.on('end', () => { /* API call completed */ });

stream.write(request1);
stream.write(request2);
stream.end();
```

```ts
const stream = client.sampleBidiStreamingMethod(options);
```

### Client streaming

Returns a writable stream; the result is delivered through a callback.

```ts
const stream = client.sampleClientStreamingMethod(callback);
stream.write(request1);
stream.write(request2);
stream.end();
// callback(err, response) will be called
```

```ts
const stream = client.sampleClientStreamingMethod(options, callback);
```

## Options / Props

| Stream kind | Position of `CallOptions` |
|-------------|---------------------------|
| Server streaming | Second parameter (after `request`) |
| Bi-directional | The only parameter |
| Client streaming | First parameter (before `callback`) |

`StreamType` enum (`streaming.d.ts`): `SERVER_STREAMING = 1`, `CLIENT_STREAMING = 2`, `BIDI_STREAMING = 3`.

## Notes

- Call `stream.cancel()` to cancel a running call (server-streaming and bidi are documented; `StreamProxy` exposes `cancel()`).
- Server streaming retry: `CallOptions.retryRequestOptions` is "only relevant to server streaming calls" and will be deprecated; `RetryOptions.getResumptionRequestFn` is "only used with server streaming retries"; `gaxServerStreamingRetries` is a `ClientOptions` flag with no docstring. See `retry-timeout.md`.
- Paginated `*Stream` methods are covered in `auto-pagination.md`.
- Blocks are fragments using placeholder method names.
- Applies to `google-gax` 6.17.0 (npm).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/streamingCalls/streaming.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/gax.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/clientInterface.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)

## Related

- [call-options.md](./call-options.md)
- [retry-timeout.md](./retry-timeout.md)
- [auto-pagination.md](./auto-pagination.md)
