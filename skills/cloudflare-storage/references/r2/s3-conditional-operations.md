---
source: https://developers.cloudflare.com/r2/api/s3/conditional-operations/
---

# Conditional operations

Use conditional headers on R2 S3 API writes, including create-only `PutObject` and `CompleteMultipartUpload` requests.

## Signature / Usage

Update an object only if it has not changed (read the current ETag, then send it in `If-Match`; a mismatch fails with `412 PreconditionFailed`):

```sh
aws s3api put-object \
  --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com \
  --bucket <BUCKET> \
  --key <KEY> \
  --body <FILE> \
  --if-match '"<ETAG>"'
```

Complete a multipart upload only if `<KEY>` does not exist in `<BUCKET>` (the request must be signed with AWS Signature Version 4):

```http
POST /<BUCKET>/<KEY>?uploadId=<UPLOAD_ID> HTTP/1.1
Host: <ACCOUNT_ID>.r2.cloudflarestorage.com
If-None-Match: *
Content-Type: application/xml

<CompleteMultipartUpload>
  <Part>
    <PartNumber>1</PartNumber>
    <ETag>"bce6bf66aeb76c7040fdd5f4eccb78e6"</ETag>
  </Part>
  <Part>
    <PartNumber>2</PartNumber>
    <ETag>"8165449fc15bbf43d3b674595cbcc406"</ETag>
  </Part>
</CompleteMultipartUpload>
```

With the AWS CLI, pass the `--if-none-match` option:

```sh
aws s3api complete-multipart-upload \
  --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com \
  --bucket <BUCKET> \
  --key <KEY> \
  --upload-id <UPLOAD_ID> \
  --multipart-upload file://parts.json \
  --if-none-match "*"
```

A failed condition returns `412` with this error (unless a bucket lock rule blocks the write first):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Error>
  <Code>PreconditionFailed</Code>
  <Message>At least one of the pre-conditions you specified did not hold.</Message>
</Error>
```

## Options / Props

Operations that accept conditional headers:

| Operation | Supported headers |
| --- | --- |
| `CreateMultipartUpload` (early check at initiation only) | `If-Match`, `If-None-Match`, `If-Modified-Since`, `If-Unmodified-Since` |
| `CompleteMultipartUpload` | `If-Match`, `If-None-Match`, `If-Modified-Since`, `If-Unmodified-Since` |
| `CopyObject` (destination conditions, beta) | `cf-copy-destination-if-match`, `cf-copy-destination-if-none-match`, `cf-copy-destination-if-modified-since`, `cf-copy-destination-if-unmodified-since` |
| `PutObject` | `If-Match`, `If-None-Match`, `If-Modified-Since`, `If-Unmodified-Since` |

Condition values (the write commits only if every condition passes):

| Header | Value | Write succeeds when | If the key does not exist |
| --- | --- | --- | --- |
| `If-Match` | `*`, or one or more ETags | The current ETag matches one of the listed ETags. `*` matches any object. | Fails |
| `If-None-Match` | `*`, or one or more ETags | The current ETag matches none of the listed ETags. `*` matches any object. | Succeeds |
| `If-Modified-Since` | HTTP date | The object was last modified after the given date. | Fails |
| `If-Unmodified-Since` | HTTP date | The object was not modified after the given date. | Succeeds |

## Notes

- Evaluation rules: wrap each ETag in double quotes and separate multiple ETags with commas (`If-Match: "bce6bf66aeb76c7040fdd5f4eccb78e6", "8165449fc15bbf43d3b674595cbcc406"`). `If-Match` uses strong comparison, so weak ETags (`W/"..."`) never match; `If-None-Match` uses weak comparison. Send dates in HTTP date format (for example `Wed, 21 Oct 2026 07:28:00 GMT`); R2 compares dates at one-second precision. When an object exists at the key, `If-Modified-Since` is ignored if `If-None-Match` is also present and passes, and `If-Unmodified-Since` is ignored if `If-Match` is also present and passes. When the key does not exist, `If-Modified-Since` always fails.
- Atomicity: conditions are evaluated at the moment the write commits, as part of the same write that commits the object, never against an older snapshot. Competing conditional writes to the same key are serialized. When two or more clients concurrently write a previously absent key with `If-None-Match: *`, at most one request succeeds while its object exists; every other request evaluated while that object exists fails with `412 PreconditionFailed`. If the object is deleted before another pending request commits, that request can also succeed. A write without conditional headers always overwrites any existing object at the key.
- Conditional multipart uploads: to create a multipart object only if its key does not exist (useful above the `PutObject` size limit), send `If-None-Match: *` on `CompleteMultipartUpload` itself. Conditions sent only on `CreateMultipartUpload` do not provide create-only semantics. If two clients each complete a different upload for the same absent key with `If-None-Match: *`, at most one completion succeeds while its object exists. If any other write creates the key after the upload was initiated, a completion with `If-None-Match: *` fails as long as that object still exists. A `CompleteMultipartUpload` without conditional headers overwrites any existing object, regardless of conditions sent on `CreateMultipartUpload`.
- Conditions on `CreateMultipartUpload`: evaluated against the object at the key when the upload is initiated. If a condition fails, the request returns `412 PreconditionFailed` and no upload ID is created, so there is nothing to abort. Conditions are not stored with the upload ID and are not re-evaluated at completion, so an upload that passes the check can still overwrite an object created later unless `CompleteMultipartUpload` carries its own conditions. Send conditions on `CompleteMultipartUpload` to enforce create-only semantics; optionally also on `CreateMultipartUpload` to avoid uploading parts for a key that already exists.
- Condition failures: a failure on `CompleteMultipartUpload` aborts the upload. The upload ID cannot be reused and its uploaded parts are discarded; subsequent `UploadPart`, `ListParts`, and `CompleteMultipartUpload` requests for it return `404 NoSuchUpload`, while `AbortMultipartUpload` still succeeds. To retry, start a new multipart upload and upload the parts again. If a bucket lock rule protects the existing object at the key, R2 returns `409 ObjectLockedByBucketPolicy` instead of `412`, even when a conditional header would also fail; a `409` is not a condition failure, so the upload is not aborted and its parts are not discarded.
- Ambiguous writes: if a write times out or the connection drops before a response, the write may still commit, and a `HeadObject` returning `404 NoSuchKey` during this time does not prove the write failed. The procedures below assume the original write used `If-None-Match: *`. To tell your write apart from others (an ETag identifies content, not the client; identical content produces the same ETag), attach a unique custom metadata value such as `x-amz-meta-write-id: <UUID>` on `PutObject`, or on `CreateMultipartUpload` for multipart uploads; `HeadObject` returns it in the `x-amz-meta-write-id` response header.
- Reconcile an ambiguous `PutObject`: retry the same request including `If-None-Match: *` and the same `x-amz-meta-write-id`. `200 OK` means the retry committed your object (the original cannot commit while an object exists at the key). `412 PreconditionFailed` means an object already exists: send `HeadObject` and compare `x-amz-meta-write-id`; a match means the original committed, a different value means another client created the object, and `404 NoSuchKey` means it was deleted after the retry. In the last two cases the original request may still be pending and can commit if the key becomes absent before it completes.
- Reconcile an ambiguous completion: R2 continues processing a `CompleteMultipartUpload` after the client disconnects. Retry the same request with the same upload ID, part list, and conditional headers. `200 OK`: the retry committed your object, and the original can no longer commit because an upload ID can only be completed once. `412 PreconditionFailed`: another object already exists at the key; your upload was not committed and is now aborted. `409 ObjectLockedByBucketPolicy`: a bucket lock rule protects the object; the retry did not commit and did not abort the upload, and the response does not show whether the original committed, so compare `x-amz-meta-write-id` via `HeadObject`. `404 NoSuchUpload`: the upload is no longer in progress; either the original completion committed the object, or the upload was aborted (by a failed condition, `AbortMultipartUpload`, or lifecycle expiration).
- R2 removes an upload in the same atomic commit that either creates the object or aborts the upload. After any request returns `404 NoSuchUpload` for an upload ID, no pending completion for it can commit; a later `HeadObject` shows the current state of the key. If the `x-amz-meta-write-id` matches the value sent on `CreateMultipartUpload`, your upload was committed; if it differs or the key does not exist, it was not committed, or the object was deleted or overwritten after commit. Without a unique metadata value you can compare the `ETag` with the ETag expected for your parts (see Upload objects, Multipart upload ETags); a match shows identical content but not which client wrote it.
- Destination conditions on `CopyObject` are in beta. They use R2-specific `cf-copy-destination-if-*` headers, separate from the standard `x-amz-copy-source-if-*` headers, which apply to the source object. R2 checks source conditions when it selects the source and destination conditions when it commits the copy, so the two sets are not evaluated atomically. See S3 API extensions.
- Distinct from HTTP conditional requests on the Workers API (`onlyIf` on `get()` / `put()`), which are documented in the Workers API reference.
- Source: https://developers.cloudflare.com/r2/api/s3/conditional-operations/ (production `34d908a`, fetched 2026-11-14)

## Related

- [Consistency model](./reference-consistency.md)
- [S3 API extensions](./s3-extensions.md)
- [S3 API compatibility](./s3-api-compatibility.md)
- [Error codes](./api-error-codes.md)
- [Upload objects](./objects-upload.md)
- [Bucket locks](./buckets-bucket-locks.md)
