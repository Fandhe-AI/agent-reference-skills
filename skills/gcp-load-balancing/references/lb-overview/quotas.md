---
source: https://docs.cloud.google.com/load-balancing/docs/quotas
---

# Quotas and limits (Cloud Load Balancing)

Quotas have defaults and can usually be raised; system limits are fixed. Quotas are generally per project (shared by all applications and IPs in it); a quota does not guarantee resource availability.

## Signature / Usage

### Check your quota

```bash
gcloud compute project-info describe --project PROJECT_ID
```

Check used quota in a region (replace `example-region` with your region):

```bash
gcloud compute regions describe example-region
```

Exceeding a quota with gcloud prints `quota exceeded` and exits with code `1`; an API request returns `413 Request Entity Too Large`. Adjust most quotas in the console (https://docs.cloud.google.com/docs/quotas/help/request_increase). Monitor quota usage with the `serviceruntime.googleapis.com/quota/allocation/usage` metric on the `Consumer Quota` resource type, filtered by `service` and `quota_metric`.

## Options / Props

### Roles

| Task | Required role |
|------|---------------|
| Check quotas | `roles/owner`, `roles/editor` or `roles/servicemanagement.quotaViewer` |
| Modify or request quota | `roles/owner`, `roles/editor`, `roles/servicemanagement.quotaAdmin`, or a custom role with `serviceusage.quotas.update` |

### Backends and NEGs

| Item | Limit | Notes |
|------|-------|-------|
| Instance groups | Quota, per project and per region | Zonal groups charge the region of their zone |
| Zonal and regional NEGs | Quota, per project and per region | Excludes global internet, Private Service Connect and serverless NEGs |
| Global NEGs | Quota, global per project | Global internet, Private Service Connect, serverless NEGs |
| Instance group / `GCE_VM_IP_PORT` / `GCE_VM_IP` / regional internet NEG backends per backend service | 50 | Not configurable; with failover, up to 50 primary and 50 backup per backend service |
| Instance group or `GCE_VM_IP` NEG backends per global external passthrough backend service | 25 | Not configurable |
| Endpoints per `GCE_VM_IP_PORT` / `GCE_VM_IP` zonal NEG | 10,000 each | Cannot be increased |
| Endpoints per hybrid NEG (`NON_GCP_PRIVATE_IP_PORT`) | 10,000 | Cannot be increased |
| Endpoints per global internet NEG / serverless NEG / Private Service Connect NEG | 1 each | Cannot be increased |
| Endpoints per regional internet NEG | 256 | Cannot be increased |
| Endpoints per port mapping NEG | 1,000 | Cannot be increased |
| Target pools, backend buckets | Quota, per project | Backend bucket quotas: `GLOBAL_INTERNAL_MANAGED_BACKEND_BUCKETS`, `REGIONAL_EXTERNAL_MANAGED_BACKEND_BUCKETS`, `REGIONAL_INTERNAL_MANAGED_BACKEND_BUCKETS` (each per project) |

### VMs per instance group

| Backend service type | Limit |
|----------------------|-------|
| Pass-through, regional MIG | 2,000 |
| Pass-through, zonal MIG / zonal unmanaged | 1,000 / 2,000 |
| Proxy, regional MIG | Smaller of 2,000 and 10,000 / (ports in the named port with the most ports) |
| Proxy, zonal MIG | Smaller of 1,000 and 10,000 / (same) |
| Proxy, zonal unmanaged | Smaller of 2,000 and 10,000 / (same) |

### Backend services

| Item | Limit |
|------|-------|
| Classic Application / classic proxy | Quota `GLOBAL_EXTERNAL_PROXY_LB_BACKEND_SERVICES`, per project |
| Global external Application / proxy | Quota `GLOBAL_EXTERNAL_MANAGED_BACKEND_SERVICES`, per project |
| Regional external Application / proxy | Quota `REGIONAL_EXTERNAL_MANAGED_BACKEND_SERVICES`, per region per project |
| Cross-region internal Application / proxy | Quota `GLOBAL_INTERNAL_MANAGED_BACKEND_SERVICES` |
| Regional internal Application / proxy | Quota `REGIONAL_INTERNAL_MANAGED_BACKEND_SERVICES`, per region per project |
| Global external passthrough | Quota `GLOBAL_EXTERNAL_NETWORK_LB_BACKEND_SERVICES`, per project |
| Regional external passthrough | Quota `REGIONAL_EXTERNAL_NETWORK_LB_BACKEND_SERVICES`, per region per project |
| Internal passthrough | Quota `REGIONAL_INTERNAL_LB_BACKEND_SERVICES`, per region per project |
| Cloud Service Mesh | Quotas `GLOBAL_INTERNAL_TRAFFIC_DIRECTOR_BACKEND_SERVICES`, `REGIONAL_INTERNAL_TRAFFIC_DIRECTOR_BACKEND_SERVICES` |
| Backend services per Application LB | Varies with URL map |
| Backend services per proxy or passthrough Network LB | 1 (cannot change) |
| Named ports per Application / proxy backend service | 1 (instance group backends only) |
| Named ports per passthrough backend service | 0 (`portName` ignored) |
| Distinct projects whose URL maps reference one backend service | 10 (cannot be increased) |
| Configured primary or failover backends on an internal passthrough backend service | 250 without backend subsetting; 2000 with it (cannot be increased; extra backends never receive new connections) |

### Forwarding rules

| Item | Limit |
|------|-------|
| Classic Application / classic proxy | Quota `FORWARDING_RULES`, per project (Classic VPN gateway rules also count) |
| Global external Application / proxy | Quota `GLOBAL_EXTERNAL_MANAGED_FORWARDING_RULES`, per project |
| Regional external Application / proxy | `REGIONAL_EXTERNAL_MANAGED_FORWARDING_RULES_PER_REGION_PER_NETWORK`, per region per network |
| Cross-region internal Application / proxy | `GLOBAL_INTERNAL_MANAGED_FORWARDING_RULES_PER_REGION_PER_NETWORK` |
| Regional internal Application / proxy | `REGIONAL_INTERNAL_MANAGED_FORWARDING_RULES_PER_REGION_PER_NETWORK` |
| Global external passthrough | `GLOBAL_EXTERNAL_NETWORK_LB_FORWARDING_RULES`, per project; parent rules only (two child rules per parent are not counted); during Preview fixed at 10 per project, cannot be increased |
| Regional external passthrough | `EXTERNAL_NETWORK_LB_FORWARDING_RULES`, per region per project (backend service and target pool) |
| Internal passthrough | `INTERNAL_FORWARDING_RULES_PER_NETWORK`, across all regions of a VPC network |
| Discrete ports per rule (internal passthrough and backend service-based regional external passthrough) | 5; alternatives are one contiguous range or all ports |
| Passthrough backend services per forwarding rule | 1 |
| Internal forwarding rules sharing one internal IP (internal passthrough and internal proxy) | 10 (cannot be increased) |
| Source IP ranges per steering forwarding rule (regional external passthrough) | 64 (cannot be increased) |
| External protocol forwarding rules | `EXTERNAL_PROTOCOL_FORWARDING_RULES`, per region per project |
| Internal protocol forwarding rules | `INTERNAL_FORWARDING_RULES_WITH_TARGET_INSTANCE_PER_NETWORK`, per network |
| Cloud Service Mesh | `INTERNAL_TRAFFIC_DIRECTOR_FORWARDING_RULES` |

### Target proxies, SSL, health checks, TLS routes

| Item | Limit |
|------|-------|
| Target HTTP / HTTPS / SSL / TCP proxies, health checks, SSL certificates | Quotas, per project (health checks cover global, regional and legacy) |
| SSL policies per target HTTPS or SSL proxy | 1 |
| Compute Engine SSL certificates per target proxy | 15 |
| Certificate Manager certificate maps per target proxy / certificates per target proxy | 1 / 100 |
| Global TLS routes `TLSROUTES`; regional `REGIONAL_TLSROUTES` | Quotas, per project (regional also per region) |
| SNI hostnames per TLS route / per target proxy across TLS routes | 16 / 1000 |
| Global / regional SSL policies | Quotas, per project / per region per project |
| Key types, global self-managed certs | RSA-2048, ECDSA P-256 |
| Key type, global publicly trusted Google-managed certs | RSA-2048 |
| Key types, regional self-managed certs | RSA-2048, RSA-3072, RSA-4096, ECDSA P-256, ECDSA P-384 |
| Domains per Google-managed certificate | 100 |
| Domain name length, Google-managed | 64 bytes (first domain only; others up to 253) |
| Total length of all domains, Google-managed | 6300 bytes |

### URL maps (cannot be increased)

| Item | External Application | Internal Application |
|------|----------------------|----------------------|
| Host rules, path matchers per URL map | 1000 | 2000 |
| Path rules or route rules per path matcher; hosts per host rule; predicates per path matcher | 1000 each | 1000 each |
| Backend services or buckets per URL map | 2500 | 2500 |
| Weighted backend services per route action | 10 (not supported by classic) | 10 |
| `pathTemplateMatch` predicates per path matcher | 100 (not supported by classic) | 100 |
| Regular expressions per path matcher | 5 for regional external; n/a for global | 5 |
| Regular expressions per URL map | 1 for global external; n/a for regional | n/a |
| Characters per regular expression | 250 | 250 |
| Distinct projects whose backend services one URL map can reference | 1000 (not applicable to global external, which uses the 2500 limit) | 1000 |
| Maximum URL map data size | 1 MB global/regional external; 64 KB classic | 1 MB |
| URL map tests | 10000 classic; 100 global or regional external | not supported |

### Routing configuration size

| Load balancers | Quota |
|----------------|-------|
| Global external and classic Application | `GLOBAL_EXTERNAL_PROXY_LB_CONFIG`, per project |
| Regional external Application and proxy Network | `REGIONAL_EXTERNAL_PROXY_LB_CONFIG_PER_REGION_PER_VPC_NETWORK` |
| Cross-region internal Application and proxy Network | `CROSS_REGIONAL_INTERNAL_PROXY_LB_CONFIG_PER_REGION_PER_VPC_NETWORK`, per VPC network |
| Regional internal Application and proxy Network | `REGIONAL_INTERNAL_PROXY_LB_CONFIG_PER_REGION_PER_VPC_NETWORK` |

### Header size and custom headers (Application LBs, cannot be increased)

| Item | Limit |
|------|-------|
| Client request URL plus headers, global external | 60 KiB (up to 6 KiB used internally) |
| Client request URL plus headers, classic | 64 KiB (up to 6 KiB used internally) |
| Backend response headers, external | About 128 KB |
| Backend request / response headers, internal | 60 KB each |
| Custom request / response headers per backend service | 16 each; 8 KB total each (before variable expansion) |
| Header lowercasing | Always, except classic with HTTP/1.1 |

### Queries per second

| Item | Limit |
|------|-------|
| QPS per instance group or NEG, global external | Configurable with `RATE` balancing mode; limited by backends |
| Regional external and internal Application, per region per network | Depends on request size and configuration; limited by backends and regional proxy capacity; contact support to raise. Serverless NEGs: 5000 QPS per project and region across all regional external and internal Application LBs |
| Pre-warming the regional proxy pool | Contact support if bursts exceed 100k QPS |

### Policies

| Item | Limit |
|------|-------|
| ServiceLbPolicies | Quota, per project (classic and global external Application LBs) |
| Server TLS policies | Global quota per project (classic, global external, cross-region internal); regional quota per region per project (regional external and internal) |
| Authorization policies | Quotas per project per scope; forwarding rules per policy 50; policies per forwarding rule 5; HTTP rules per policy 5; sources per rule 1; operations per rule 1; principals 25 (global external) or 50 (others); IP blocks, resources, headers, hosts, methods, paths 10 each; authorization extensions per policy 1 |
| Service rate limiting policies (Preview, regional internal Application) | Quota per region per project; targets per policy 50; policies per target 1; HTTP rules 5; matchers per type 10 (principal 30); buckets 10; actions per rule 10; keys per bucket 3 (min 1); user overrides per bucket 10 |
| Trust config (classic and global external Application) | 1 trust store; 200 trust anchors plus intermediates (100 intermediates); 10 name constraints; 10 intermediates sharing Subject and SPKI; chain depth 10; 100 intermediate evaluations; allowlist 500 certificates; key types RSA-2048, RSA-3072, RSA-4096, ECDSA P-256, ECDSA P-384 |
| Public delegated prefixes with variable prefix length | Quota per project; default 40 |

## Notes

- VMs per instance group: Default maximum load-balanced VMs: 2,000 for regional MIGs, 1,000 for zonal MIGs, 2,000 for zonal unmanaged groups.
- VMs per instance group: Divide 10,000 by the highest number of ports in any one named port, discard the remainder, and compare with the group limit. Contact support to raise proxy limits.
- URL maps (cannot be increased): Predicates per path matcher count match conditions across all rules. Example: route rule A with one `prefixMatch` and three header matches plus route rule B with one `fullPathMatch` and two query parameter matches gives 1 + 3 + 1 + 2 = 7.
- Routing configuration size: Measured in quota units; scales with the number of forwarding rules referencing the URL map or TLS route (50,000 units referenced by three rules uses 150,000).
- Policies: Trust config size quotas: `certificatemanager.googleapis.com/trust-config-size` (global) and `.../regional-trust-config-size`. Usage is 1 unit per kB of each PEM (rounded up), 1 unit per 32 allowlisted certificates, 1 unit per 4 SPIFFE trust domains, plus 2 units fixed overhead (example: 4 certificates of 3.5, 5, 4.5, 6 kB = 20, 10 allowlisted = 1, 5 SPIFFE domains = 2, overhead 2: total 25).
- Deprecated quotas no longer enforced: `EXTERNAL_MANAGED_FORWARDING_RULES` (use the regional external managed per-region-per-network quota); `INTERNAL_MANAGED_FORWARDING_RULES_PER_NETWORK` (replacement quotas per region of a VPC network: `GLOBAL_INTERNAL_MANAGED_FORWARDING_RULES_PER_REGION_PER_NETWORK` and `REGIONAL_INTERNAL_MANAGED_FORWARDING_RULES_PER_REGION_PER_NETWORK`); `INTERNAL_MANAGED_FORWARDING_RULES_PEERING_GROUP` (no replacement quota; Google Cloud enforces the global and regional internal managed per-region-per-network quotas in each region of each VPC network); `INTERNAL_FORWARDING_RULES_PER_PEERING_GROUP` (no replacement quota; Google Cloud enforces `INTERNAL_FORWARDING_RULES_PER_NETWORK` in each VPC network); `INTERNAL_FORWARDING_RULES_WITH_TARGET_INSTANCE_PER_PEERING_GROUP` (no replacement quota; Google Cloud enforces `INTERNAL_FORWARDING_RULES_WITH_TARGET_INSTANCE_PER_NETWORK` in each VPC network); `BACKEND_SERVICES` (use load balancer specific backend service quotas).
- Most rows above name the quota; the source links each to the Quotas page and lists `limit`, `usage`, `exceeded` metrics under `compute.googleapis.com/quota/<name>/`. Default values are shown only in the console and are not copied.
- Certificate Manager quotas are at https://docs.cloud.google.com/certificate-manager/docs/quotas#resource_quotas_and_limits; see also https://docs.cloud.google.com/vpc/docs/quota and https://docs.cloud.google.com/compute/quotas.
- The source also shows a Console path for checking quotas.
- Google Cloud Load Balancing is not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source: https://docs.cloud.google.com/load-balancing/docs/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [forwarding-rule-concepts.md](./forwarding-rule-concepts.md)
- [features.md](./features.md)
- [load-balancing-overview.md](./load-balancing-overview.md)
