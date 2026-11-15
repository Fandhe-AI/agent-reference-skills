---
source: https://docs.cloud.google.com/storage/docs/cross-origin
---

# Cross-origin resource sharing (CORS)

Cloud Storage supports CORS at the bucket level so browser scripts from other origins can access bucket resources. The JSON and XML APIs handle CORS differently.

## Signature / Usage

Either XML API request URL form returns CORS headers:

```text
storage.googleapis.com/BUCKET_NAME
```

```text
BUCKET_NAME.storage.googleapis.com
```

Multiple methods in the XML API use separate elements:

```xml
<Methods>
  <Method>PUT</Method>
  <Method>GET</Method>
</Methods>
```

In the JSON API use arrays, for example `"method": ["GET", "PUT"]`. Wildcard origin: `"origin": ["*"]` (JSON) or `<Origin>*</Origin>` (XML).

### How requests work

- Simple request: browser adds `Origin`; Cloud Storage compares method and `Origin` to the bucket CORS configuration and, on match, returns `Access-Control-Allow-Origin` (same value as `Origin`); the browser accepts or rejects.
- Preflighted request (non-`GET`/`HEAD`/`POST` method, `POST` with `Content-Type` other than `text/plain`, `application/x-www-form-urlencoded` or `multipart/form-data`, or custom headers such as `X-PINGOTHER`): browser first sends `OPTIONS` with the requested method and headers; if not allowed the main request is not sent.

## Options / Props

| Field | XML API response | JSON API response |
|---|---|---|
| `origin` | Returns `Access-Control-Allow-Origin` only on a match; wildcard `<Origin>*</Origin>` allowed | Returns `Access-Control-Allow-Origin` set to the request origin |
| `method` | Supports `DELETE`, `GET`, `HEAD`, `POST`, `PUT`; checks `Access-Control-Request-Methods`; no match returns `200` without CORS headers. Do not specify `OPTIONS`. | Returns `Access-Control-Allow-Methods`: `DELETE`, `GET`, `HEAD`, `PATCH`, `POST`, `PUT` |
| `responseHeader` | Preflight: checks `Access-Control-Request-Headers`; no match returns no CORS headers; value returned in `Access-Control-Allow-Headers` | Returns `Access-Control-Allow-Headers` equal to `Access-Control-Request-Headers` |
| `maxAgeSeconds` (optional) | Returns `Access-Control-Max-Age`; default `3600` if omitted | Returns `Access-Control-Max-Age` default `3600` |

Field names above are JSON API names; for the XML API use its XML format (Set Bucket CORS).

| Property | XML API | JSON API |
|---|---|---|
| Credentials | Never returns `Access-Control-Allow-Credentials`; credentials not supported | Simple requests: `Access-Control-Allow-Credentials` set to true if approved. Preflight with empty `Access-Control-Request-Method`: sets it true and rejects with `404 - Not Found` |
| Exposed headers | Simple requests: `Access-Control-Expose-Headers` lists the response headers in your CORS configuration | Simple requests: returns values from `Access-Control-Request-Headers` if part of a list of common HTTP headers |

## Notes

- JSON API endpoints always allow CORS requests and return default values regardless of the bucket configuration. Caution: when you set a CORS configuration using the JSON API, requests from all origins are accepted regardless of the `origin` field value.
- XML API endpoints allow CORS only per the bucket configuration.
- The authenticated browser download endpoint `storage.cloud.google.com` does not allow CORS requests (the console provides this endpoint as an object's public URL link).
- The wildcard origin `*` helps testing; in most cases restrict origins to prevent unwanted usage of your resources.
- For resumable uploads from browsers, include the client's `Origin` in the initial request, since CORS headers are determined there.
- To let scripts hosted in Cloud Storage access an external site, dedicate a specific bucket and have the site serve `Access-Control-Allow-Origin: https://mybucket.storage.googleapis.com` instead of `https://storage.googleapis.com`.
- Browsers' `XMLHttpRequest` handles CORS headers; no new client code is needed.
- The source also links to setup steps and CORS configuration samples.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/cross-origin (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [resumable-uploads.md](./resumable-uploads.md)
