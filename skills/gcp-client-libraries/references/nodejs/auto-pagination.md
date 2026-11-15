---
source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md
---

# Auto-pagination

For paginated calls (for example `List*`), the client library fetches pages for you by default. Three styles: the `*Async` async iterator (recommended), the plain method returning all results, and the `*Stream` method; or disable auto-pagination to handle pages yourself.

## Signature / Usage

### Async iterator (recommended)

Adapted (not in the official docs): the method name `samplePaginagedMethodAsync` in the HOWTO is a typo; the text says the method is `samplePaginatedMethodAsync`.

```ts
const iterable = client.samplePaginatedMethodAsync(request);
for await (const response of iterable) {
  // process response
}
```

`*Async` fetches new pages as needed.

### All results at once

```ts
const [resultArray] = await client.samplePaginatedMethod(request);
```

### One page at a time

Adapted (not in the official docs): the HOWTO wrote `const request = {request, pageSize: 50}` (reads `request` in its own initializer, a ReferenceError); the request is spread into a new variable.

```ts
const pagedRequest = {...request, pageSize: 50};
const [resultArray, nextPageRequest, rawResponse] =
  await client.samplePaginatedMethod(pagedRequest, {autoPaginate: false});
```

### Stream

```ts
const stream = await client.samplePaginatedMethodStream(request);
stream.on('data', (response) => { /* process response */ });
stream.on('error', (err) => { /* handle error */ });
stream.on('end', () => { /* API call completed */ });
```

## Options / Props

| Name | Where | Description |
|------|-------|-------------|
| `autoPaginate` | `CallOptions` | `false` disables auto-pagination; the promise resolves to `[resultArray, nextPageRequest, rawResponse]`. |
| `pageSize` | request | To be set together with `autoPaginate: false`. |
| `maxResults` | `CallOptions` | Stop after this many response elements. |
| `resultArray` | result | Responses from the given page. |
| `nextPageRequest` | result | Request object to retrieve the next page. |
| `rawResponse` | result | Actual response from the server before it was converted to an array. |

## Notes

- The plain (no suffix) method merges all pages into one array. A large result sends many single-page requests under the hood, and they hit your quota.
- To specify `pageSize`, disable auto-pagination as shown.
- `PageDescriptor` (`pageDescriptor.d.ts`) has `requestPageTokenField`, `responsePageTokenField`, `requestPageSizeField`, `resourceField`, and `createStream` / `asyncIterate` / `createIterator`.
- The HOWTO ends this section with a "override call options" snippet that calls `sampleServerStreamingMethod`; it is a copy-paste leftover and is not reproduced. Call options go in the second parameter (see `call-options.md`).
- Corrected from the official docs: the HOWTO wrote `client.samplePaginagedMethodAsync(request)` (typo; its own text names `samplePaginatedMethodAsync`).
- Corrected from the official docs: the HOWTO wrote `const request = {request, pageSize: 50}` and passed `request`; replaced with `const pagedRequest = {...request, pageSize: 50}`.
- Fragments with placeholder method names. Applies to `google-gax` 6.17.0 (npm).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/paginationCalls/pageDescriptor.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)

## Related

- [call-options.md](./call-options.md)
- [streaming.md](./streaming.md)
