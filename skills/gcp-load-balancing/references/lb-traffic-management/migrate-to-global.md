---
source: https://docs.cloud.google.com/load-balancing/docs/https/migrate-to-global
---

# Migration overview

Differences between the classic Application Load Balancer and the global external Application Load Balancer, and how resources are migrated by moving backend services, backend buckets and forwarding rules from load balancing scheme `EXTERNAL` to `EXTERNAL_MANAGED` through staged migration states, with rollback possible for 90 days.

## Signature / Usage

The source page is conceptual and has no code. The detailed gcloud steps are in "Migrate resources from classic Application Load Balancer". The final step changes a forwarding rule to the `EXTERNAL_MANAGED` scheme; a forwarding rule on that scheme looks like this.

```bash
gcloud compute forwarding-rules create http-content-rule \
    --load-balancing-scheme=EXTERNAL_MANAGED \
    --address=lb-ipv4-1 \
    --network-tier=PREMIUM \
    --global \
    --target-http-proxy=http-lb-proxy \
    --ports=80
```

## Options / Props

### Migration states

| State | Meaning |
|---|---|
| `PREPARE` | Prepares the resource; takes about six minutes before it can send traffic through the global external infrastructure. |
| `TEST_BY_PERCENTAGE` | Optional. Sends a percentage of classic traffic through the global external infrastructure. Start small, monitor logs, then increase to 100%. Advanced global features can't be used in this state. |
| `TEST_ALL_TRAFFIC` | Sends all traffic through the global external infrastructure (about six minutes). Must be reached before changing the scheme. Advanced features can't be used in this state. |

### Features only in the classic Application Load Balancer

| Features only in the classic Application Load Balancer |
|---|
| Standard Network Tier. |
| GKE Ingress controller (for global external Application Load Balancers on GKE use the GKE Gateway controller). |

### Data plane differences (classic vs global external)

| Event | Classic | Global external |
|---|---|---|
| All backends unhealthy | HTTP 502 | HTTP 503 |
| Banned SSL cipher | HTTP 502 | HTTP 503 |
| Early upstream connection reset by backend | HTTP 502 | HTTP 503 |
| Failed connection upgrade (e.g. Websockets) | HTTP 400 | HTTP 403 |
| Header too large | HTTP 413 | HTTP 431 |
| URL map configuration limits | Differ significantly; see Quotas: URL maps | Differ significantly; see Quotas: URL maps |
| Custom HTTP method with no body | Adds `Transfer Encoding: Chunked` to backend request | Adds `Content-Length: 0` |
| `X-Forwarded-For` delimiter | `', '` between IPs | `','` (no space) |
| Header case | Preserved | All header keys lowercased |
| Repeated headers of same name | Allowed | May be combined into one header, values comma separated (RFC 7230) |
| (HTTP/1.1) Invalid header name | Allowed | HTTP 502 |
| (HTTP/1.1) Repeated same `Content-Length` | Allowed | HTTP 502 |
| (HTTP/1.1) Multiple hosts in header | Accepted if the first is valid | HTTP 502 if any is invalid |
| (HTTP/1.1) `Connection: Keep-Alive` | `Keep-Alive` header added to backend requests by default | Not added by default |
| Backslashes in request | Unchanged | Converted to forward slash |
| Duplicate slashes | Not merged | Merged |
| `#` in request path | Allowed | HTTP 400 |
| (HTTP/1.1) Illegal characters in path (e.g. `\x7f\x7f`) | Allowed | HTTP 502 |
| Request includes a port number | Port ignored; only hostname matched (`example.com:5000` matches `example.com`) | Hostname and port both matched (`example.com:5000` matches `example.com:5000`, else default backend service) |

### Migration headers

| Header | Meaning |
|---|---|
| `X-External-Managed-Migration-Scheme-Override` | Request header; `EXTERNAL` routes the request to the classic infrastructure, `EXTERNAL_MANAGED` to the global external infrastructure. |
| `X-External-Managed-Migration-Selected-Scheme` | Request and response header; shows the scheme used (`EXTERNAL` or `EXTERNAL_MANAGED`); passed to the backend and returned to the client. |

## Notes

- Migration order: 1. All backend services attached to the forwarding rules (`PREPARE`, optional `TEST_BY_PERCENTAGE`, `TEST_ALL_TRAFFIC`, then change scheme to `EXTERNAL_MANAGED`, about six minutes). 2. All backend buckets attached to the forwarding rules (`PREPARE`, optional `TEST_BY_PERCENTAGE`, `TEST_ALL_TRAFFIC`); backend buckets have no load balancing scheme. 3. Forwarding rules: change the scheme to `EXTERNAL_MANAGED` (about six minutes), only after all attached backend services and buckets are migrated.
- Rollback to classic is possible within 90 days of changing the scheme; afterwards it can't be rolled back. Rolling back a backend service to `EXTERNAL` requires rolling back the forwarding rule; rolling back a forwarding rule doesn't require rolling back the backend services. Rollback order: remove new global advanced traffic management features, roll back forwarding rules, then backend buckets and backend services (`TEST_ALL_TRAFFIC`, optional `TEST_BY_PERCENTAGE`, `PREPARE`, then revert). Rollback and migration change live traffic routing and can break connectivity; try them on a disposable load balancer first.
- Session affinity: `TEST_BY_PERCENTAGE` breaks client IP affinity for the shifted percentage until re-established, sends the percentage of cookie-less traffic to the global external fleet while cookie traffic stays on the fleet that generated the cookie, and setting 0%, leaving it unset, or `PREPARE` invalidates existing cookies directed to the global fleet. Changing the scheme to `EXTERNAL_MANAGED` invalidates all cookies generated by the classic fleet (the global fleet ignores them and creates a new one).
- After migration you might see more connections to backends (especially HTTP/1.1) and higher backend memory use; monitor backend resource usage.
- Check schemes in the global external Application Load Balancer logging and monitoring dashboards and the migration headers above.
- Snippet taken from https://docs.cloud.google.com/load-balancing/docs/https/setting-up-global-http-https-redirect (forwarding rule with `EXTERNAL_MANAGED`). The migration page itself has no code samples, and this command is not a migration step: in gcloud 593.0.0 the backend service migration state is set with `--external-managed-migration-state` (and `--external-managed-migration-testing-percentage`) and its scheme with `--load-balancing-scheme` of `gcloud compute backend-services update`; the backend bucket migration state is set on the forwarding rule with `--external-managed-backend-bucket-migration-state` (and `--external-managed-backend-bucket-migration-testing-percentage`) of `gcloud compute forwarding-rules update`, and the forwarding rule scheme with `--load-balancing-scheme` of the same command (see the flag lists in the `gcp-compute` skill).
- Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source: https://docs.cloud.google.com/load-balancing/docs/https/migrate-to-global (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [traffic-management-global.md](./traffic-management-global.md)
- [url-map-concepts.md](./url-map-concepts.md)
- Migrate resources: https://docs.cloud.google.com/load-balancing/docs/https/migrate-from-classic-global
- Roll back: https://docs.cloud.google.com/load-balancing/docs/https/roll-back-migrated-resources
