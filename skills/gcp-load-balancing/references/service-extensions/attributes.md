---
source: https://docs.cloud.google.com/service-extensions/docs/attributes
---

# Supported attributes

Attributes are request and connection values that an extension forwards to plugins or callouts. List them in the `forwardAttributes` field; unlisted attributes are not forwarded. Maximum 16 attributes per extension.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/service-extensions/docs/configure-traffic-extensions (the attributes page itself has no code). `forwardAttributes` is the last field of each extension.

```bash
cat >traffic-plugin.yaml <<EOF
    name: traffic-ext
    forwardingRules:
    - https://www.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/forwardingRules/http-content-rule
    loadBalancingScheme: EXTERNAL_MANAGED
    extensionChains:
    - name: "chain1"
      matchCondition:
        celExpression: 'request.host == "example.com"'
      extensions:
      - name: 'ext1'
        service: projects/PROJECT_ID/locations/LOCATION/wasmPlugins/WASM_PLUGIN
        failOpen: false
        supportedEvents:
        - RESPONSE_HEADERS
        forwardAttributes:
        - request.host
        - request.path
EOF
```

## Options / Props

### Request attributes

| Attribute | Type | Edge | Route | Traffic | Authz | CDN | Description |
|-----------|------|------|-------|---------|-------|-----|-------------|
| `request.method` | string | Yes | Yes | Yes | Yes | Yes | HTTP method such as `GET` or `POST` |
| `request.host` | string | Yes | Yes | Yes | Yes | Yes | Equivalent to `request.headers['host']` |
| `request.path` | string | Yes | Yes | Yes | Yes | Yes | Requested URL path |
| `request.query` | string | Yes | Yes | Yes | Yes | Yes | URL query as `name1=value&name2=value2` |
| `request.scheme` | string | Yes | Yes | Yes | Yes | Yes | `http` or `https`, lowercase |
| `request.origin` | string | No | No | Yes | Yes | No | `Origin` request header (CORS) |
| `request.user_agent_family` | string | Yes | No | Yes | No | No | Parsed user-agent family; global external Application Load Balancers only |
| `request.device_request_type` | string | Yes | No | Yes | No | No | Device classification; global external Application Load Balancers only |
| `request.backend_service_name` | string | No | No | Yes | Yes | No | Target backend service; not for edge extensions |
| `request.backend_service_project_number` | int | No | No | Yes | Yes | No | Project number of the backend service in Shared VPC; not for edge extensions |
| `request.mcp_method` | string | No | No | No | Yes | No | Model Context Protocol method name |

### Connection attributes

| Attribute | Type | Edge | Route | Traffic | Authz | CDN | Description |
|-----------|------|------|-------|---------|-------|-----|-------------|
| `source.ip` | string | Yes | Yes | Yes | Yes | No | Client IP address |
| `source.port` | int | Yes | Yes | Yes | Yes | Yes | Client source port |
| `source.client_region` | string | Yes | No | Yes | No | Yes | Two-letter ISO-3166-1 or CLDR region code (for example `US`, `DE`) |
| `source.client_region_subdivision` | string | Yes | No | Yes | No | No | Region subdivision code; global external Application Load Balancers only |
| `source.client_city` | string | Yes | No | Yes | No | No | Client city; global external Application Load Balancers only |
| `source.client_city_lat_long` | string | Yes | No | Yes | No | No | Latitude and longitude of the client city; global external Application Load Balancers only |
| `destination.ip` | string | No | No | Yes | Yes | No | IP address of the load balancer the client connects to |
| `destination.port` | int | No | No | Yes | Yes | No | Destination port |
| `connection.client_encrypted` | bool | No | No | Yes | Yes | No | `true` if encrypted (HTTPS, HTTP/2 or HTTP/3) |
| `connection.protocol` | string | No | No | Yes | Yes | No | `HTTP/1.0`, `HTTP/1.1`, `HTTP/2` or `HTTP/3` |
| `connection.sni` | string | Yes | No | Yes | Yes | Yes | Requested SNI of the downstream TLS connection |
| `connection.tls_version` | string | Yes | No | Yes | Yes | Yes | `TLSv1`, `TLSv1.1`, `TLSv1.2`, `TLSv1.3` or `QUIC` |
| `connection.tls_cipher_suite` | string | No | No | Yes | Yes | No | Four-digit hex cipher suite, for example `009C` |
| `connection.tls_ja3_fingerprint` | string | No | No | Yes | No | No | JA3 fingerprint (HTTPS, HTTP/2, HTTP/3) |
| `connection.tls_ja4_fingerprint` | string | Yes | No | Yes | No | No | JA4 fingerprint (HTTPS, HTTP/2, HTTP/3) |
| `connection.client_rtt_msec` | int | No | No | Yes | Yes | No | Client round-trip time in milliseconds |
| `connection.sha256_peer_certificate_digest` | string | Yes | No | Yes | Yes | No | Hex-encoded SHA-256 peer certificate hash |
| `connection.client_cert_present` | bool | No | No | Yes | Yes | No | `true` if the client provided a certificate |
| `connection.client_cert_chain_verified` | bool | No | No | Yes | Yes | No | `true` if the chain is verified against a configured `TrustStore` |
| `connection.client_cert_error` | string | No | No | Yes | Yes | No | Predefined mTLS error strings (see mTLS client validation modes) |
| `connection.client_cert_serial_number` | string | No | No | Yes | Yes | No | Client certificate serial number |
| `connection.client_cert_spiffe_id` | string | No | No | Yes | Yes | No | SPIFFE ID from the SAN field |
| `connection.client_cert_uri_sans` | string | No | No | Yes | Yes | No | Comma-separated, Base64-encoded URI SANs |
| `connection.client_cert_dnsname_sans` | string | No | No | Yes | Yes | No | Comma-separated, Base64-encoded DNSName SANs |
| `connection.client_cert_valid_not_before` | string | No | No | Yes | Yes | No | RFC 3339 timestamp before which the certificate isn't valid |
| `connection.client_cert_valid_not_after` | string | No | No | Yes | Yes | No | RFC 3339 timestamp after which the certificate isn't valid |
| `connection.client_cert_issuer_dn` | string | No | No | Yes | Yes | No | Base64-encoded DER of the `Issuer` field |
| `connection.client_cert_subject_dn` | string | No | No | Yes | Yes | No | Base64-encoded DER of the `Subject` field |
| `connection.client_cert_leaf` | string | No | No | Yes | Yes | No | Base64-encoded leaf certificate for an established, validated mTLS connection (RFC 9440) |
| `connection.client_cert_chain` | string | No | No | Yes | Yes | No | Comma-delimited, Base64-encoded chain in TLS order, excluding the leaf (RFC 9440) |

## Notes

- Applies to `LbEdgeExtension` (global external Application Load Balancers), `LbRouteExtension` / `LbTrafficExtension` (Application Load Balancers), `AuthzExtension` using `ext_proc`, and `CdnEdgeExtension` (Media CDN Edge Cache services). Columns: Edge = `LbEdge`, Route = `LbRoute`, Traffic = `LbTraffic`, Authz, CDN = `CdnEdge`.
- Not all attributes are supported for all extension types; use the tables.
- Attributes must be listed explicitly in `forwardAttributes`; the load balancer or Media CDN does not forward unlisted ones.
- `connection.client_cert_*` attributes are populated only when mTLS is enabled and the client presents a certificate.
- Use attributes in place of custom headers for edge and route extensions, which don't see load balancer custom headers.
- Plugins read attributes with `proxy_get_property`; callouts receive them in `ProcessingRequest.attributes`.
- Source inconsistency: the copied traffic plugin example references a regional forwarding rule (`regions/REGION/forwardingRules/...`) but the import command in the source uses `--location=global`; the configure traffic extensions page (https://docs.cloud.google.com/service-extensions/docs/configure-traffic-extensions, retrieved 2026-11-17) says the forwarding rule region "must match the value specified for the location of the plugin".
- Source: https://docs.cloud.google.com/service-extensions/docs/attributes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/service-extensions/docs/configure-traffic-extensions (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [plugins-overview.md](./plugins-overview.md)
- [callouts-overview.md](./callouts-overview.md)
- [configure-traffic-extensions.md](./configure-traffic-extensions.md)
- [lb-extensions-overview.md](./lb-extensions-overview.md)
