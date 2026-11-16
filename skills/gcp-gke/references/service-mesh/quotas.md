---
source: https://docs.cloud.google.com/service-mesh/quotas
---

# Quotas

Current content limits and request quotas for Cloud Service Mesh. Istio resources are translated into Traffic Director resources that count against these quotas. System limits cannot be changed.

## Signature / Usage

### Check quota

```bash
gcloud compute project-info describe --project PROJECT_ID
```

Check used quota in a region:

```bash
gcloud compute regions describe example-region
```

### Error shown when a URL map limit is exceeded

```
Value for field 'resource.hostRules[0].hosts' is too large:
maximum size 100 element(s);actual size 107.
```

## Options / Props

General: 100 queries per second (QPS) per Google Cloud project. All existing forwarding rule, backend service and other load-balancing limits per project apply to deployments based on Google Cloud load balancing and service routing APIs.

### URL map limits (load-balancing APIs, per project)

| Item | Limit |
|---|---|
| URL maps | Quota (per project) |
| Paths in path rules | 50 |
| Match rules in route rules | 50 |
| Host rules per URL map | 2,500 |
| Path matchers per URL map | 2,500 |
| Path rules per path matcher | 500 |
| Route rules per path matcher | 500 |
| Header matches per match rule | 50 |
| Query parameter matches per match rule | 50 |
| Metadata filters per match rule | 5 |
| Filter labels per metadata filter | 64 |
| Hosts per host rule | 100 |
| Tests per URL map | 100 |
| Size of URL maps | 524 KB |
| Weighted backend services per route action | 10 |

All URL map limits except the URL map count cannot be increased.

### Service routing API quotas (per project)

Meshes, Gateways, GrpcRoutes, HttpRoutes, TcpRoutes, TlsRoutes (service `networkservices.googleapis.com`; values are shown in the Quotas page).

### Network security API limits (per project)

| Item | Limit |
|---|---|
| clientTlsPolicy | 500 |
| serverTlsPolicy | 500 |
| AuthorizationPolicy | 500 |
| EndpointPolicy | 750 |

ServiceLbPolicies: quota per project (see the Quotas page).

### Roles

| Task | Required role |
|---|---|
| Check quotas | `roles/owner`, `roles/editor` or `roles/servicemanagement.quotaViewer` |
| Modify quotas / request more | `roles/owner`, `roles/editor`, `roles/servicemanagement.quotaAdmin`, or a custom role with `serviceusage.quotas.update` |

## Notes

- Exceeding a quota with `gcloud` prints a `quota exceeded` error and exits with code `1`; an API request returns HTTP `413 Request Entity Too Large`.
- Quotas apply per project and do not guarantee resource availability.
- Request increases in the Google Cloud console (Quotas page); some quotas rise automatically with use.
- Source: https://docs.cloud.google.com/service-mesh/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [service-routing-overview.md](./service-routing-overview.md)
- [provision-control-plane.md](./provision-control-plane.md)
