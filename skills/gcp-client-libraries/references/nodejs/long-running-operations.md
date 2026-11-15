---
source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md
---

# Long-running operations (LRO)

Methods expected to run longer return an `Operation` that holds the operation name and lets you poll status, wait for completion, cancel, or resume tracking by name.

## Signature / Usage

### Start and wait

```ts
const [operation] = await client.sampleLongRunningMethod(request);
```

```ts
const [response] = await operation.promise(); // polls the operation until complete
```

### Inspect status

```ts
console.log(operation.name);     // unique name
console.log(operation.done);     // true or false
console.log(operation.metadata); // current value of the metadata (often contains progress %)
console.log(operation.result);   // only if operation is completed
```

### Cancel

Adapted (not in the official docs): the promise returned by `operation.cancel()` is awaited, so a failed `cancelOperation` request is not an unhandled rejection.

```ts
await operation.cancel();
```

### Call options

```ts
const [operation] = await client.sampleLongRunningMethod(request, options);
```

### Resume by operation name

Adapted (not in the official docs): `client.` added; the HOWTO calls `checkSampleLongRunningMethodProgress` without the client receiver.

```ts
const operation = await client.checkSampleLongRunningMethodProgress(operationName);
// now check `operation.done`, `operation.metadata`, `operation.result`
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `longrunning` (`CallOptions`) | `BackoffSettings` | Backoff settings used for polling. |
| `operation.name` | string | Unique name of the operation. |
| `operation.done` | boolean | Whether the operation completed. |
| `operation.metadata` | object | Current metadata. |
| `operation.result` | object | Only if the operation is completed. |
| `operation.promise()` | `Promise` | Resolves on completion, rejects on operation error. Resolves to `[ResultType, MetadataType, raw Operation]` for `LROperation`. |
| `operation.getOperation()` | `Promise` / callback | Polls the current status (`longrunning.d.ts`). |
| `operation.cancel()` | `Promise` | Cancels the current polling API call and the operation; returns the promise of the `OperationsClient#cancelOperation` API request (`longrunning.d.ts`). |

## Notes

- Use `check...Progress` (for example `checkLongRunningRecognizeProgress` for `longRunningRecognize` in Speech-to-Text) to track an operation by name, e.g. in a Cloud Function that should not stay running while the operation runs.
- `Operation` is an `EventEmitter`; `promise()` wraps its `complete` and `error` events, and polling starts automatically once a `complete` listener is registered (`longrunning.d.ts`).
- Corrected from the official docs: the HOWTO wrote `await checkSampleLongRunningMethodProgress(operationName);` with no `client.`.
- Corrected from the official docs: the HOWTO wrote `operation.cancel();` without awaiting the returned promise.
- `@google-cloud/library` placeholders: all blocks are fragments.
- Applies to `google-gax` 6.17.0 (npm).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/longRunningCalls/longrunning.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/clientInterface.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)

## Related

- [call-options.md](./call-options.md)
- [retry-timeout.md](./retry-timeout.md)
