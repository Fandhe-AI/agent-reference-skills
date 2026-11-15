---
source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md
---

# Resumable uploads

Some APIs expose methods that upload large payloads through the resumable upload protocol. Such client methods return a `ResumableUploadSession` helper instead of the response: call `start()` with a `ResumableSource` and await `finished()`.

## Signature / Usage

### Upload

Adapted (not in the official docs): the progress callback logs only `bytesUploaded`, not `status.uploadUrl`, so the session URL does not end up in logs.

```ts
const uploadSource = client.getResumableSource(filePath);
const helper = await client.createResumableUpload(request);
await helper.start({
  uploadSource,
  chunkSize: 8 * 1024 * 1024, // 8MB chunks
  onProgress: status => {
    console.log(`Committed ${status.bytesUploaded} bytes`);
  },
});
const savedUploadUrl = helper.uploadUrl!;
const savedChunkSize = helper.chunkSize!;
const response = await helper.finished();
```

### Resume

Pass the saved URL and chunk size to `start()` on a new helper, with a new source for the same payload:

```ts
const uploadSource = client.getResumableSource(filePath);
const helper = await client.createResumableUpload();
await helper.start({
  uploadSource,
  resumeUrl: savedUploadUrl,
  chunkSize: savedChunkSize,
});
const response = await helper.finished();
```

## Options / Props

| Name | Description |
|------|-------------|
| `uploadSource` | `ResumableSource` from `getResumableSource()`. Must be a seekable stream (for example a file stream). |
| `chunkSize` | Chunk size in bytes (the example uses 8 MB). |
| `onProgress` | Progress callback (`status.bytesUploaded`, `status.uploadUrl`). |
| `resumeUrl` | Saved session URL, to resume an upload. |
| `globalDeadlineMs` | Overrides the global deadline: 10 minutes by default, scaled up for large payloads. |
| `helper.uploadUrl`, `helper.chunkSize` | Available once the upload has started; save them to resume after a process crash or network drop. |

## Notes

- Error categories: transient errors (retried with exponential backoff), state mismatches (recovered by querying the server for the committed byte offset), fatal errors (propagated to the caller).
- `CallOptions.resumableUpload` is internal context populated by generated libraries; "do not set manually".
- Service-specific methods only; `getResumableSource` / `createResumableUpload` names come from the HOWTO example. Blocks are fragments (`client` is a placeholder).
- The session URL (`helper.uploadUrl`, `status.uploadUrl`) can be reused to resume the upload; store it like a secret (not in logs, not in client-visible storage).
- Adapted from the official docs: the HOWTO logged ``console.log(`Committed ${status.bytesUploaded} bytes to ${status.uploadUrl}`)``; the session URL is removed from the log line.
- Applies to `google-gax` 6.17.0 (npm).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/gax.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)

## Related

- [call-options.md](./call-options.md)
- [client-instance.md](./client-instance.md)
