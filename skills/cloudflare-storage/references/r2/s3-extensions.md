---
source: https://developers.cloudflare.com/r2/api/s3/extensions/
---

# S3 API extensions

R2 extensions on top of the basic S3 API: Unicode metadata, auto-creating buckets, conditional operations, MERGE metadata directive, and extended `ListBuckets`.

## Signature / Usage

Implicit bucket creation on upload (`cf-create-bucket-if-missing: true` on `PutObject` / `CreateMultipartUpload`) issues:

```txt
PUT / HTTP/1.1
Host: bucket.account.r2.cloudflarestorage.com
<CreateBucketConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <LocationConstraint>auto</LocationConstraint>
</CreateBucketConfiguration>
```

## Options / Props

`httpMetadata` mapping:

| HTTP Header | Property Name |
| --- | --- |
| `Content-Encoding` | `httpMetadata.contentEncoding` |
| `Content-Type` | `httpMetadata.contentType` |
| `Content-Language` | `httpMetadata.contentLanguage` |
| `Content-Disposition` | `httpMetadata.contentDisposition` |
| `Cache-Control` | `httpMetadata.cacheControl` |
| `Expires` | `httpMetadata.expires` |

`ListBuckets` search parameters (headers take precedence):

| Search parameter | HTTP Header | Meaning |
| --- | --- | --- |
| `prefix` | `cf-prefix` | Show buckets with this prefix only. |
| `start-after` | `cf-start-after` | Show buckets whose name appears lexicographically in the account. |
| `continuation-token` | `cf-continuation-token` | Resume listing from a previously returned continuation token. |
| `max-keys` | `cf-max-keys` | Return this maximum number of buckets. Default and max is `1000`. |

`ListBuckets` response:

| XML Response Element | HTTP Response Header | Meaning |
| --- | --- | --- |
| `IsTruncated` | `cf-is-truncated` | This is set to `true` if the list of buckets returned is not all the buckets on the account. |
| `NextContinuationToken` | `cf-next-continuation-token` | This is set to continuation token to pass on a subsequent `ListBuckets` to resume the listing. |
| `StartAfter` | | This is the start-after value that was passed in on the request. |
| `KeyCount` | | The number of buckets returned. |
| `ContinuationToken` | | The continuation token that was supplied in the request. |
| `MaxKeys` | | The max keys that were specified in the request. |

`CopyObject` destination conditions (beta): `cf-copy-destination-if-match`, `cf-copy-destination-if-none-match`, `cf-copy-destination-if-modified-since`, `cf-copy-destination-if-unmodified-since`.

## Notes

- Unicode metadata: the Workers R2 API supports Unicode in `customMetadata` keys and values natively; these map to `x-amz-meta-` headers in the S3 API. R2 follows RFC 2047, decoding `x-amz-meta-*` values before storage and RFC 2047-encoding Unicode values on retrieval. The length limit applies to the decoded value.
- Metadata variance: if metadata keys contain Unicode, they are stripped through the S3 API and `x-amz-missing-meta` is set to the number of omitted keys.
- Auto-create: HTTP `100` is not supported by Cloudflare, hence the header. Useful for per-customer buckets created on first upload; `ListBuckets` extension supports accounts with more than 1,000 buckets.
- `PutObject` supports `If-Match`, `If-None-Match`, `If-Modified-Since`, `If-Unmodified-Since`, evaluated atomically; `If-None-Match: *` gives create-once semantics. A `NoSuchKey` read is not proof a prior write failed if its outcome is unknown.
- `x-amz-metadata-directive` accepts `MERGE` in addition to `COPY` and `REPLACE`: copies source metadata keys and replaces those specified. Cannot remove source keys; use `REPLACE` instead.
- `cf-copy-destination-if-*` failures return `412 PreconditionFailed`. They are checked at commit time while `x-amz-copy-source-if-*` is checked at source selection, so they are not atomic relative to each other.
- If using Unicode in object key names, see Unicode interoperability.

## Related

- [S3 API compatibility](./s3-api-compatibility.md)
- [Unicode interoperability](./reference-unicode-interoperability.md)
- [Consistency model](./reference-consistency.md)
- [Workers API reference](./workers-api-reference.md)
