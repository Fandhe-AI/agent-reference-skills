---
source: https://docs.cloud.google.com/storage/docs/xml-api/overview
---

# XML API overview

The Cloud Storage XML API is a RESTful interface: HTTP methods (`DELETE`, `GET`, `HEAD`, `POST`, `PUT`) give the method information, and an endpoint plus bucket/object names, headers and query parameters give the scoping information. It is useful for tools that must work across storage providers and for migrating from other providers.

## Signature / Usage

### Endpoints

```text
BUCKET_NAME.storage.googleapis.com/OBJECT_NAME
storage.googleapis.com/BUCKET_NAME/OBJECT_NAME
```

### Example request (list objects with a prefix)

```text
GET /?list-type=2&prefix=/europe/france/ HTTP/1.1
Host: travel-maps.storage.googleapis.com
Date: Wed, 17 Feb 2010 15:31:56 -0800
Content-Length: 0
Authorization: Bearer ya29.AHES6ZRVmB7fkLtd1XTmq6mo0S1wqZZi3-Lh_s-6Uw7p8vtgSwg
```

### Query string syntax

```text
PATH_TO_OBJECT/?PARAMETER=VALUE&PARAMETER=VALUE...
```

## Options / Props

### Common request headers

| Header | Description | Usage |
|---|---|---|
| `Authorization` | Authentication string | Required for all authenticated requests |
| `Content-Length` | Request body size in bytes | Required for all PUT and POST requests, except chunked transfers |
| `Content-Type` | MIME type of the body, such as `application/xml` | Recommended when the request has a body |
| `Date` | Date and time of the request | Required for all requests, except signed URLs, which can use `x-goog-date` |
| `Host` | URI for the request | Required for all requests |
| `x-goog-project-id` | Project ID to use | Required for creating or listing buckets, except in S3-interoperability use |

### Common response headers

| Header | Description |
|---|---|
| `Cache-Control` | Cache control setting for the response |
| `Content-Length` | Response body size in bytes |
| `Content-Type` | MIME type of the response body |
| `Date` | Date and time of the response |
| `ETag` | HTTP 1.1 entity tag to detect object change |

## Notes

- All requests must be authenticated except those to anonymously accessible objects or buckets, typically via the `Authorization` header. Use HTTPS so data is encrypted in transit. The API is compatible with HTTP/1.1, HTTP/2 and HTTP/3.
- The Bearer token in the example request is a placeholder illustration, not a usable credential.
- The XML API serves content from the same origin as the request endpoint. To serve browser content from a unique origin consider the JSON API or authenticated browser downloads.
- Extension headers use the `x-goog-` prefix. An error response includes an XML document in the body.
- The source also shows a sample `ListBucketResult` XML response.
- Alternatives named by the source: console / gcloud quickstarts, client libraries, Firebase SDKs, Google Drive.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/xml-api/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [interoperability.md](./interoperability.md)
- [hmackeys.md](./hmackeys.md)
- [quotas.md](./quotas.md)
