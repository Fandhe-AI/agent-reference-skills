---
source: https://docs.cloud.google.com/apis/docs/system-parameters
---

# System parameters

System parameters control common functionality across REST and gRPC APIs: API keys, response field masks, quota attribution and JSON formatting. They are passed as URL query parameters or HTTP headers; client libraries handle many of them automatically.

## Signature / Usage

### Mapping

- HTTP: URL query parameters or request headers. A parameter `$foo` is sent as `?$foo=xxx`, or `?%24foo=xxx` URL-encoded. The `$` prefix avoids conflicts with normal request parameters.
- gRPC: request headers with lowercase keys.
- Byte ranges use the standard HTTP `Range` header (for example `Range: bytes=0-1023`), which is not a Google system parameter.

Examples from the table:

```text
X-Goog-Api-Client: python/3.5.0 grpc-google-pubsub-v1/0.1.0-beta2 linux/2.7.0
x-goog-request-params: name=projects/my-project/locations/us-central1&foo=bar
```

## Options / Props

| URL query parameter | HTTP/gRPC header | Description |
| --- | --- | --- |
| — | `Authorization` | Authentication credentials |
| `$alt`, `alt` | — | Response format: `json` (default), `media`, `proto`, `sse` (JSON streams) |
| `$apiVersion` | `X-Goog-Api-Version` | API version; not all APIs support it |
| `$.xgafv` | — | JSON error format `1` or `2` (default); `1` only for Google API Client Libraries |
| `$callback`, `callback` | — | JSONP callback |
| `$ct` | `Content-Type` | Content-Type request header override |
| `$fields`, `fields` | `X-Goog-FieldMask` | `FieldMask` for response filtering; if empty all fields are returned unless documented otherwise |
| — | `X-HTTP-Method-Override` | Intended HTTP method; some proxies do not accept all methods |
| `$key`, `key` | `X-Goog-Api-Key` | Google API key |
| `passwd`, `password` | — | Reserved to prevent passwords in URLs |
| `$prettyPrint`, `prettyPrint` | — | Pretty-print JSON: `true` (default), `false` |
| `quotaUser` | `X-Goog-Quota-User` | Pseudo user id for per-user quotas; defaults to the authenticated principal, else client IP; a valid API key with service restrictions must identify the quota project, otherwise ignored |
| `$outputDefaults` | — | Output proto default values in JSON responses |
| `$unique` | — | Unique query parameter to disable request caching |
| — | `X-Goog-Api-Client` | Client identification: space-separated `NAME "/" SEMVER` list (`NAME` lowercase letters, digits, `-`) |
| — | `X-Goog-Request-Reason` | Reason recorded in audit logs (for example a support ticket number); letters, digits and spaces stay plain, other characters are base64 encoded |
| `$userProject` | `X-Goog-User-Project` | Caller-specified project for quota and billing; caller needs `serviceusage.services.use` on it |
| — | `X-Server-Timeout` | Server processing timeout in seconds (float); REST APIs only, where client-side timeout is not applicable |
| — | `x-goog-request-params` | URL query-string encoded extra gRPC parameters (`key1=value1&key2=value2`); keys are API-specific (routing such as `name=`, `parent=`, `grpc-location=`; BigQuery Storage Write uses `write_stream`) |

## Notes

- Changelog in source: 2026-10 `X-Goog-Api-Version` documented; 2026-06 `x-goog-request-params` updated; 2021-11 `x-goog-request-params` published; 2021-02 `quotaUser` published; 2020-07 OAuth 2.0 query parameters deprecated; 2019-10 `X-Server-Timeout`; 2017-10 `X-Goog-User-Project`.
- Quota project in client libraries is covered in the `authentication` category (and the `python` category's client options); ADC and quota-project gcloud setup belong to `gcp-foundation`.
- The `X-Goog-Api-Client` value is the source's illustrative example; `python/3.5.0` is not a supported runtime (floor: Python >= 3.10).
- API keys must come from an env var or Secret Manager, never be hard-coded.
- Source: https://docs.cloud.google.com/apis/docs/system-parameters (retrieved 2026-11-16; CC BY 4.0)

## Related

- [http-guidelines.md](./http-guidelines.md)
- [client-libraries-explained.md](./client-libraries-explained.md)
