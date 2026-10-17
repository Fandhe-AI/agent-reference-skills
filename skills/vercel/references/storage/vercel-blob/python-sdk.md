# Vercel Blob Python SDK

Upload, download, inspect, list, copy, and delete blobs from Python. Asynchronous API in `vercel.blob`, matching synchronous API in `vercel.blob.sync`.

## Signature / Usage

```bash
uv add vercel
```

```python
import asyncio

from vercel import blob


async def main() -> None:
    uploaded = await blob.put_blob(
        "reports/summary.txt",
        b"Quarterly summary",
        access="private",  # or "public"
        add_random_suffix=True,
    )
    print(uploaded.url)


asyncio.run(main())
```

Requires Python 3.10+. The `vercel` package includes the Blob SDK from the `vercel-blob` package; install only `vercel-blob` for Blob alone. This page's source documents `vercel-blob` 0.5.0 and later; earlier `vercel-blob` releases on PyPI are an unrelated package without `vercel.blob`.

## Authentication

Credentials resolve in this order:

1. Vercel OIDC token (current Vercel request or `VERCEL_OIDC_TOKEN`) paired with `BLOB_STORE_ID`
2. `BLOB_READ_WRITE_TOKEN`, then `VERCEL_BLOB_READ_WRITE_TOKEN`

An OIDC token without `BLOB_STORE_ID` (and no read-write token) raises `BlobCredentialsError`. `BLOB_STORE_ID` may include the `store_` prefix. Locally, run `vercel link` and `vercel env pull`, then load `.env.local` (e.g. `python-dotenv`).

## Functions

| Function | Description |
|----------|-------------|
| `put_blob(pathname, body, *, access, content_length=None, content_type=None, add_random_suffix=False, allow_overwrite=False, cache_control_max_age=None)` | Upload bytes or a stream. Returns `PutResult` (`url`, `download_url`, `pathname`, `content_type`, `content_disposition`, `etag`). |
| `multipart_upload_blob(pathname, access=..., ...)` | Context manager (`async with`); `upload.upload_part(body, *, content_length=None)`; publishes on successful exit; `upload.result` is a `PutResult`. |
| `get_blob(pathname_or_url, access=...)` | Download fully into memory. Returns `GetResult` (`metadata`: `DownloadMetadata`, `body`: `bytes`). |
| `stream_blob(pathname_or_url, access=...)` | Context manager; iterate chunks (max 64 KiB each); `download.metadata` available before reading; `await download.aclose()`. |
| `head_blob(pathname_or_url)` | Metadata only. `HeadResult`: `url`, `download_url`, `pathname`, `size`, `etag`, `uploaded_at`, `content_type`, `content_disposition`, `cache_control`. |
| `query_blobs(*, prefix=None, page_size=None, cursor=None)` | Async iterator of `ListBlob` (`url`, `download_url`, `pathname`, `size`, `uploaded_at`, `etag`) across nested folders; follows cursors. `page_size` 1 to 1,000. |
| `query_blob_entries(*, prefix=None, page_size=None, cursor=None)` | One folder level: yields `ListBlob` and `BlobPrefix` (`.prefix`). Nonempty `prefix` must end with `/`. |
| `copy_blob(source, pathname, *, access, content_type=None, add_random_suffix=False, allow_overwrite=False, cache_control_max_age=None, if_match=None)` | Server-side copy within the same store. Returns `CopyResult` (same fields as `PutResult`). `if_match` checks the source ETag. |
| `delete_blob(target_or_list, *, if_match=None)` | Delete one blob or up to 1,000 per request. Returns `None`. `if_match` only with a single target. |

`DownloadMetadata` fields: `url`, `status_code`, `size`, `content_type`, `content_disposition`, `cache_control`, `etag`, `last_modified`, `headers`.

Streaming upload (async; `content_length` required for streaming sources):

```python
async def read_in_thread(file: BinaryIO) -> AsyncIterator[bytes]:
    while chunk := await asyncio.to_thread(file.read, CHUNK_SIZE):
        yield chunk

with open("report.pdf", "rb") as file:
    await blob.put_blob(
        "reports/report.pdf",
        read_in_thread(file),
        access="private",
        content_length=os.fstat(file.fileno()).st_size,
    )
```

Multipart upload:

```python
async with blob.multipart_upload_blob("videos/intro.bin", access="private") as upload:
    await upload.upload_part(first_part(), content_length=PART_SIZE)
    await upload.upload_part(b"tail")
result = upload.result
```

Synchronous API:

```python
from vercel.blob import sync as blob

uploaded = blob.put_blob("hello.txt", b"Hello, Blob!", access="private")
try:
    result = blob.get_blob(uploaded.url, access="private")
finally:
    blob.delete_blob(uploaded.url)
```

## Streaming sources

| API | Accepted streaming sources |
|-----|----------------------------|
| `vercel.blob` | `AsyncByteReader`, object with `async def read()`, or `AsyncIterable[bytes]` |
| `vercel.blob.sync` | `SyncByteReader`, object with blocking `read()`, or `Iterable[bytes]` |

## Errors

Catch `BlobError` for any service error (exposes `status_code` and `code` when available).

| Error | Meaning |
|-------|---------|
| `BlobNotFoundError` | Blob doesn't exist. Also a `FileNotFoundError`. |
| `BlobAccessError` | Credentials can't access the blob. Also a `PermissionError`. |
| `BlobCredentialsError` | SDK couldn't resolve valid credentials. |
| `BlobStoreNotFoundError` | Store doesn't exist. |
| `BlobStoreSuspendedError` | Store is suspended. |
| `BlobContentTypeNotAllowedError` | Service rejected the content type. |
| `BlobFileTooLargeError` | Blob exceeds a size limit. |
| `BlobPreconditionFailedError` | ETag didn't match `if_match`, or the blob changed in flight. |
| `BlobServiceRateLimited` | Rate limited; `retry_after` seconds (or `0`). |
| `BlobServiceNotAvailable` | Service temporarily unavailable. |
| `BlobContentLengthError` | Streaming source didn't match `content_length`. |
| `BlobStreamError` | Malformed response or incorrect read. Also an `OSError`. |
| `BlobUnknownError` | Unrecognized failure. |

```python
try:
    metadata = await blob.head_blob("reports/summary.txt")
except blob.BlobNotFoundError:
    metadata = None
except blob.BlobServiceRateLimited as error:
    print(f"Retry in {error.retry_after} seconds")
    raise
```

## SDK sessions

The SDK creates and reuses a default session. Create one only for a custom HTTP client or Blob configuration; `session` comes from `vercel.api` (async or sync context manager, accepts `service_options` and `httpx_client_factory`).

```python
from vercel import blob
from vercel.api import session

async def resolve_credentials() -> blob.BlobCredentials:
    return blob.BlobCredentials(
        token=os.environ["ACME_BLOB_TOKEN"],
        store_id=os.environ["ACME_BLOB_STORE_ID"],
    )

options = blob.BlobServiceOptions(credentials_factory=resolve_credentials)
async with session(service_options=[options]):
    metadata = await blob.head_blob("reports/summary.txt")
```

`BlobCredentials` accepts `token`, `store_id`, `kind` (defaults to `CredentialKind.READ_WRITE`; `blob.CredentialKind.OIDC` for OIDC). `BlobServiceOptions`: `credentials_factory` (default OIDC and env resolver; async sessions accept sync or async callables), `base_url` (`VERCEL_BLOB_API_URL` or `https://vercel.com/api/blob`; override only for testing). Sync: `SyncBlobServiceOptions` from `vercel.blob.sync` with a sync factory and sync session.

## Notes

- `access` (`"public"` / `"private"`) is required for uploads, copies, and downloads and must match the store's access mode. `head_blob`, `delete_blob`, `query_blobs`, `query_blob_entries` take no `access`.
- Pathnames are literal object names. One leading slash is removed; empty pathnames, control characters, invalid Unicode, `//`, and `.` / `..` segments are rejected. Destination pathnames are limited to 950 UTF-16 code units. Pathname validation is not a shell-escaping or filesystem-safety guarantee.
- Delivery URLs must be HTTPS on `<store-id>.<access>.blob.vercel-storage.com`; fragments are removed, redirects are not followed, custom delivery domains are unsupported. A private delivery URL must belong to the store of your credentials.
- `put_blob` copies in-memory buffers at call time. Uploads of unknown length are unsupported; the SDK sends exactly `content_length` bytes, otherwise raises `BlobContentLengthError`. Async API raises `TypeError` for sync readers/iterables.
- Multipart: parts 1 byte to 5 GiB, at most 10,000 parts, every part but the last at least 5 MiB, upload one part at a time. No parts raises `BlobError` on exit (use `put_blob(pathname, b"", ...)` for an empty blob). There is no abort action; failed uploads leave sent parts.
- `copy_blob` does not inherit source content type or cache lifetime; pass them again. `delete_blob` of a missing blob succeeds; batch deletion is not atomic; deleted blobs can remain in CDN cache up to one minute.
- The SDK does not retry failed requests.
- Not supported in the Python SDK: conditional uploads/reads, renaming blobs, cache bypass on reads, client uploads, Signed URLs, optimized image uploads, upload progress callbacks. Use the JS SDK or Vercel CLI.
- Don't call the sync API from an active async event loop; don't mix sync Blob calls in an async session or the reverse.

## Related

- [@vercel/blob SDK](./blob-sdk.md)
- [Signed URLs](./signed-urls.md)
- [Client Upload](./client-upload.md)
