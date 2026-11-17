---
source: https://docs.cloud.google.com/load-balancing/docs/https/custom-headers-global
---

# Create custom headers in backend services

Custom request and response headers let a global external Application Load Balancer add headers (client latency, client geolocation, TLS parameters and more) to proxied HTTP(S) requests and responses. Custom request headers are supported on backend services; custom response headers on backend services and backend buckets.

## Signature / Usage

### Update gcloud (version 309.0.0 or later required)

```bash
gcloud components update
```

### Header flag format

```text
    --custom-request-header='HEADER_NAME:[HEADER_VALUE]'
```

```text
    --custom-request-header='X-Client-Geo-Location:{client_region},{client_city}'
```

For a client in Mountain View, California, the load balancer adds `X-Client-Geo-Location:US,Mountain View`.

### Custom request headers

Adapted (not in the official docs): the `[HEADER_VALUE]` square-bracket placeholders (optional-value markers in the source) are written as bare upper-case `HEADER_VALUE` placeholders so the flag value is a literal header string.

```bash
gcloud compute backend-services create BACKEND_SERVICE_NAME \
    --global-health-checks \
    --global \
    --protocol HTTPS \
    --health-checks https-basic-check \
    --custom-request-header='HEADER_NAME:HEADER_VALUE'
```

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --global \
    --custom-request-header='HEADER_1_NAME:HEADER_1_VALUE' \
    --custom-request-header='HEADER_2_NAME:HEADER_2_VALUE'
```

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --global \
    --no-custom-request-headers
```

REST: `PATCH` to `backendServices.patch`.

```text
PATCH https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendServices/BACKEND_SERVICE_NAME
"customRequestHeaders": [
   "client_city:Mountain View"
]
```

### Custom response headers

Adapted (not in the official docs): the source writes `(create | update)` and `[HEADER_VALUE]` and omits the line-continuation backslash, which is not runnable shell; the commands are written for `update` (`create` takes the same `--custom-response-header` flag), with bare `HEADER_VALUE` placeholders and a trailing `\`.

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --global \
    --custom-response-header='HEADER_NAME:HEADER_VALUE'
```

Adapted (not in the official docs): the same `update`, placeholder and line-continuation changes as in the example above.

```bash
gcloud compute backend-buckets update BACKEND_BUCKET_NAME \
    --custom-response-header='HEADER_NAME:HEADER_VALUE'
```

```bash
gcloud compute backend-buckets update gaming-lab \
    --custom-response-header='X-Frame-Options: DENY'
```

HSTS example:

```bash
gcloud compute backend-services update customer-bs-name \
    --global \
    --custom-response-header='Strict-Transport-Security: max-age=63072000'
```

REST: `backendBuckets.insert` / `backendBuckets.update` and `backendServices.insert` / `backendServices.update`.

```text
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendBuckets

PUT https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendBuckets/BACKEND_BUCKET_NAME

POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendServices

PUT https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendServices/BACKEND_SERVICE_NAME
```

Adapted (not in the official docs): the source writes `"customResponseHeaders":HEADER_NAME:[HEADER_VALUE]`, which is not valid JSON; `customResponseHeaders` is an array of `NAME:VALUE` strings, as in the request headers example above.

```text
"customResponseHeaders": [
   "HEADER_NAME:HEADER_VALUE"
]
```

## Options / Props

### Header name and value rules

| Rule | Detail |
|---|---|
| Format | Each header is a `header-name:header-value` string with a colon. |
| Name validity | Valid HTTP header-field name per RFC 7230. |
| `Host` | Can be configured, with limitations (see below). |
| Reserved names | Not `authority` (reserved; can't be modified for Envoy-based load balancers), `X-User-IP`, `CDN-Loop`. |
| Hop-by-hop headers | Not `Keep-Alive`, `Transfer-Encoding`, `TE`, `Connection`, `Trailer`, `Upgrade`. |
| Prefixes | Name must not begin with `X-Google`, `X-Goog-`, `X-GFE` or `X-Amz-`. |
| Duplicates | A name must not appear more than once in the list of added headers. |
| Value | Valid HTTP header field per RFC 7230 (obsolete forms disallowed); can be empty; can include `{variable}`. |

### `Host` header limits

| `Host` header limits |
|---|
| A custom `Host` request header can only replace an existing `Host` request header. |
| A custom `Host` response header can't be set with URL map header actions, but can be set in the backend service. |
| Custom `Host` headers (request and response) can't be appended or removed, and can't use variables. |

### Variables

| Variable | Description |
|---|---|
| `cdn_cache_id` | Location code and ID of the cache instance that served the request (same as `jsonPayload.cacheId` in Cloud CDN request logs). |
| `cdn_cache_status` | `hit`, `miss`, `revalidated`, `stale`, `uncacheable` or `disabled` for objects served by a Cloud CDN-enabled backend. |
| `origin_request_header` | Value of the request `Origin` header (CORS). |
| `client_rtt_msec` | Estimated smoothed round-trip time (SRTT, RFC 2988) between load balancer and client, in milliseconds. |
| `client_region` | Country / region code of the client IP (Unicode CLDR region code such as `US`, `FR`). |
| `client_region_subdivision` | Subdivision (province / state) as Unicode CLDR subdivision ID such as `USCA`, `CAON`. |
| `client_city` | City name, for example `Mountain View`; no canonical value list. Can contain US-ASCII letters, numbers, spaces and ``!#$%&'*+-.^_`\|~``. |
| `client_city_lat_long` | Latitude and longitude of the city, for example `37.386051,-122.083851`. |
| `client_ip_address` | Client IP; usually the next-to-last address in `X-Forwarded-For`, unless a proxy is used or the header was tampered with. |
| `client_port` | Client source port. |
| `client_encrypted` | `true` if client to load balancer is encrypted (HTTPS, HTTP/2, HTTP/3), else `false`. |
| `client_protocol` | `HTTP/1.0`, `HTTP/1.1`, `HTTP/2` or `HTTP/3`. |
| `device_request_type` | From `User-Agent`: `DESKTOP`, `GAME_CONSOLE`, `GAME_CONSOLE`, `MOBILE`, `SET_TOP_BOX`, `SMART_SPEAKER`, `SMART_TV`, `TABLET`, `UNDETERMINED`, `WEARABLE`. |
| `server_ip_address` | IP of the load balancer the client connects to; same as the last IP in `X-Forwarded-For`. |
| `server_port` | Destination port the client connects to. |
| `tls_sni_hostname` | SNI (RFC 6066) if provided; lowercased, trailing dot removed. |
| `tls_version` | `TLSv1`, `TLSv1.1`, `TLSv1.2`, `TLSv1.3`, or `QUIC` for QUIC clients. |
| `tls_cipher_suite` | Four hex digits per the IANA TLS Cipher Suite Registry, for example `009C`; empty for QUIC and unencrypted connections. |
| `tls_ja3_fingerprint` | JA3 fingerprint for HTTPS, HTTP/2 or HTTP/3 clients. |
| `tls_ja4_fingerprint` | JA4 fingerprint for HTTPS, HTTP/2 or HTTP/3 clients. |
| `user_agent_family` | `APPLE`, `APPLEWEBKIT`, `BLACKBERRY`, `DOCOMO`, `GECKO`, `GOOGLE`, `KHTML`, `KOREAN`, `MICROSOFT`, `MSIE`, `NETFRONT`, `NOKIA`, `OBIGO`, `OPERA`, `OPENWAVE`, `OTHER`, `POLARIS`, `SEMC`, `SMIT`, `TELECA`, `USER_DEFINED`. |
| `asn` | Autonomous System Number of the client IP. |
| `cloud_trace_id` | Trace ID extracted (or generated) from the HTTP request header. |
| `hostname` | Original hostname from the `Host` header, lowercased, trailing dot removed. |

### Mutual TLS variables (when mTLS is configured on the TargetHttpsProxy)

| Variable | Description |
|---|---|
| `client_cert_present` | `true` if the client provided a certificate. |
| `client_cert_chain_verified` | `true` if the chain verified against a configured `TrustStore`. |
| `client_cert_error` | Predefined error strings (see mTLS client validation modes). |
| `client_cert_sha256_fingerprint` | Base64 SHA-256 fingerprint. |
| `client_cert_serial_number` | Serial number; if longer than 50 bytes, `client_cert_error` is `client_cert_serial_number_exceeded_size_limit` and the value is empty. |
| `client_cert_spiffe_id` | SPIFFE ID from the SAN field; empty if invalid or longer than 2048 bytes (then `client_cert_error` is `client_cert_spiffe_id_exceeded_size_limit`). |
| `client_cert_uri_sans` | Comma-separated Base64 URI SANs (SPIFFE ID excluded); over 512 bytes sets `client_cert_uri_sans_exceeded_size_limit` and an empty list. |
| `client_cert_dnsname_sans` | Comma-separated Base64 DNSName SANs; over 512 bytes sets `client_cert_dnsname_sans_exceeded_size_limit` and an empty list. |
| `client_cert_valid_not_before` / `client_cert_valid_not_after` | RFC 3339 timestamps, for example `2022-07-01T18:05:09+00:00`. |
| `client_cert_issuer_dn` | Base64 DER Issuer; over 512 bytes adds `client_cert_issuer_dn_exceeded_size_limit` and empties it. |
| `client_cert_subject_dn` | Base64 DER Subject; over 512 bytes adds `client_cert_subject_dn_exceeded_size_limit` and empties it. |
| `client_cert_leaf` | Validated client leaf certificate, RFC 9440 encoding; over 16 KB unencoded adds `client_cert_validated_leaf_exceeded_size_limit` and empties it. |
| `client_cert_chain` | Comma-delimited validated chain without the leaf (RFC 9440); if leaf + chain exceed 16 KB before Base64, adds `client_cert_validated_chain_exceeded_size_limit` and empties it. |

### Limits

| Limits |
|---|
| All custom request headers on a backend service (name and value, before variable expansion): at most 8 KB or 16 request headers. |
| All custom response headers on a backend service (same measure): at most 8 KB or 16 response headers. |

## Notes

- Header transformations are best kept in the URL map (see the traffic management page). If both URL map and backend service set headers, both apply; for the same header the URL map takes precedence and the backend service setting is ignored.
- Custom request headers are added only to client requests, not to health check probes; a backend that needs a header for authorization can fail health checks. Response headers are set before the response returns to the client.
- Variables expand to empty strings when the value can't be determined (unknown geolocation, TLS not used, no `Origin` header, `{cdn_cache_status}` in a request header). Geographic values are estimates from the source IP of packets received by the load balancer, not from `X-Forwarded-For`.
- Added headers overwrite existing headers of the same name; names are case-insensitive (lower case on HTTP/2 backends). Leading and trailing whitespace in values is dropped. `{{` and `}}` produce literal `{` and `}`.
- `gcloud ... update --custom-request-header` replaces all headers already on the backend service. In gcloud flags, enclose the name and value in straight single quotes.
- Behavior change announced November 14, 2022 for custom headers on URL maps and backend services; projects with existing custom-header traffic before that date are unaffected (see the load balancing release notes).
- `device_request_type` lists `GAME_CONSOLE` twice in the source.
- Backend bucket response headers are added only when the client requests through the load balancer IP, not when it calls the Cloud Storage API directly; this is how headers such as `X-Frame-Options` are set for Cloud CDN with Cloud Storage.
- A `{cloud_trace_id}` response header returns a trace ID even when a Cloud Armor policy denies the request. If a Cloud Armor policy inserts a request header with the same name as a load balancer custom header, the load balancer value overwrites it.
- Adapted from the official docs: `--custom-request-header='HEADER_NAME:[HEADER_VALUE]'` (and the `[HEADER_n_VALUE]` forms) were written with bare `HEADER_VALUE` placeholders; `gcloud compute backend-services (create | update) BACKEND_SERVICE_NAME --custom-response-header='HEADER_NAME:[HEADER_VALUE]'` and the matching `backend-buckets (create | update)` command were written as `update` commands with `--global` (backend service) and a trailing `\` line continuation. `gcloud compute backend-services create` and `backend-buckets create` also accept `--custom-response-header`.
- Console steps for adding and removing headers are omitted; see the source page.
- Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Corrected from the official docs: the source shows the REST body fragment `"customResponseHeaders":HEADER_NAME:[HEADER_VALUE]`; the Compute Engine Discovery document (`compute.v1`) defines `BackendService.customResponseHeaders` as an array of strings, so the fragment is written as an array of `HEADER_NAME:HEADER_VALUE` strings.
- Clarified from the official docs: the `PUT` URLs (`update`) send the whole resource, so the `customResponseHeaders` fragment must be merged into the full backend service or backend bucket body; the same fragment alone is valid only with `PATCH` (`backendServices.patch` / `backendBuckets.patch`, which "supports PATCH semantics and uses the JSON merge patch format" in the Compute Engine Discovery document `compute.v1`). A JSON merge patch replaces the whole `customResponseHeaders` array, so list every header you want to keep.
- Source: https://docs.cloud.google.com/load-balancing/docs/https/custom-headers-global (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [traffic-management-global.md](./traffic-management-global.md)
- [setting-up-global-http-https-redirect.md](./setting-up-global-http-https-redirect.md)
- `gcloud compute backend-services update`: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services/update (full flag list in the `gcp-compute` skill)
