---
source: https://developers.cloudflare.com/r2/buckets/cors/
---

# Configure CORS

Set Cross-Origin Resource Sharing policies on an R2 bucket so browsers can access objects, via public buckets, presigned URLs, or custom domains.

## Signature / Usage

Dashboard policy (bucket **Settings** > **CORS Policy** > **Add CORS policy** > **JSON** tab):

```json
[
  {
    "AllowedOrigins": ["https://example.com"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["Content-Type"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

Wrangler (`cors.json`):

```json
{
  "rules": [
    {
      "allowed": {
        "origins": ["https://example.com"],
        "methods": ["GET"]
      }
    }
  ]
}
```

```sh
npx wrangler r2 bucket cors set <BUCKET_NAME> --file cors.json
npx wrangler r2 bucket cors list <BUCKET_NAME>
```

## Options / Props

| Field Name | Description | Example |
| --- | --- | --- |
| `AllowedOrigins` | Specifies the value for the `Access-Control-Allow-Origin` header R2 sets when requesting objects in a bucket from a browser. | If a website at `www.test.com` needs to access resources (e.g. fonts, scripts) on a custom domain of `static.example.com`, you would set `https://www.test.com` as an `AllowedOrigin`. |
| `AllowedMethods` | Specifies the value for the `Access-Control-Allow-Methods` header R2 sets when requesting objects in a bucket from a browser. | `GET`, `POST`, `PUT` |
| `AllowedHeaders` | Specifies the value for the `Access-Control-Allow-Headers` header R2 sets when requesting objects in this bucket from a browser. Cross-origin requests that include custom headers (e.g. `x-user-id`) should specify these headers as `AllowedHeaders`. | `x-requested-by`, `User-Agent` |
| `ExposeHeaders` | Specifies the headers that can be exposed back, and accessed by, the JavaScript making the cross-origin request. Headers beyond the safelisted response headers, such as `Content-Encoding` or `cf-cache-status`, must be specified here. | `Content-Encoding`, `cf-cache-status`, `Date` |
| `MaxAgeSeconds` | Specifies the amount of time (in seconds) browsers are allowed to cache CORS preflight responses. Browsers may limit this to 2 hours or less, even if the maximum value (86400) is specified. | `3600` |

## Notes

- Presigned URLs: browsers enforce CORS, so without a policy browser uploads/downloads fail even if the URL is valid. Set `AllowedMethods` to the operations used (`GET`, `PUT`, `HEAD`, `DELETE`) and `AllowedHeaders` to headers the client sends. Expired presigned URLs return `403` `ExpiredRequest` without CORS headers, so browser JavaScript cannot read the error body.
- Custom domains connected to a bucket with a CORS policy return CORS headers automatically for cross-origin requests with a valid `Origin` header. `curl` shows no `Access-Control-*` headers unless `Origin` is sent. After changing a CORS policy on a domain already serving traffic, purge the cache for that hostname.
- `AllowedOrigins` must be `*` or a valid `scheme://host[:port]` pattern (no path component). At most one `*` wildcard; it can span periods (`https://*.example.com` matches `https://a.b.example.com` but not `https://example.com`). Ports cannot contain wildcards; list each localhost origin separately.
- Invalid: `https://static.example.com/` or `https://static.example.com/fonts/Calibri.woff2` (path included).
- CORS rule propagation can in rare cases take up to 30 seconds. Debug by inspecting the blocked network request: check origin, method, and headers against the rule.
- Only cross-origin requests (with an `Origin` header matching `AllowedOrigins`) receive CORS response headers.

## Related

- [Public buckets](./buckets-public-buckets.md)
- [Presigned URLs](./s3-presigned-urls.md)
- [Troubleshooting](./platform-troubleshooting.md)
