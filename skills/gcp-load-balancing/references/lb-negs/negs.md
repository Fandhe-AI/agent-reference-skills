---
source: https://docs.cloud.google.com/load-balancing/docs/negs
---

# Network endpoint groups overview

A network endpoint group (NEG) is a configuration object that specifies a group of backend endpoints or services. NEGs let Google Cloud load balancers serve VM instance group-based, serverless and containerized workloads, and distribute traffic at a finer granularity (for example per Pod instead of per VM for GKE). NEGs are configured as backends of load balancers; certain NEG types can also be used with Cloud Service Mesh. This page compares the six NEG types.

## Signature / Usage

### List NEGs in a project

```bash
gcloud compute network-endpoint-groups list
```

The full flag list for `gcloud compute network-endpoint-groups ...` is in the `gcp-compute` skill; see also https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-endpoint-groups/list.

## Options / Props

### NEG type comparison

| NEG type | NetworkEndpointType API name | Number of endpoints | Scope | Routing | Health checks (backend services) |
|---|---|---|---|---|---|
| Zonal | `GCE_VM_IP`, `GCE_VM_IP_PORT` | 1 or more | Zonal | VPC network | Centralized health checks for `GCE_VM_IP_PORT` and `GCE_VM_IP` endpoints |
| Internet | `INTERNET_IP_PORT` (IP must not be RFC 1918), `INTERNET_FQDN_PORT` | Global NEGs: 1; regional NEGs: 256 | Global or regional | Internet | Global NEGs with GFE-based load balancers: not supported; global NEGs with Cloud Service Mesh: distributed Envoy health checks from the IPs of your self-managed Envoy proxies; regional NEGs: distributed Envoy health checks from the proxy-only subnet IPs |
| Serverless | `SERVERLESS` (FQDN of an App Engine, Cloud Run functions, API Gateway or Cloud Run resource) | 1 | Regional | To Google APIs and Services | Not applicable |
| Hybrid connectivity | `NON_GCP_PRIVATE_IP_PORT` (IP:Port of a non-Compute Engine VM routable over hybrid connectivity) | 1 or more | Zonal | To on-premises or another cloud network via Cloud Interconnect VLAN attachment, Cloud VPN tunnel or Router appliance VM | Centralized for global external ALB, classic ALB, global external proxy NLB, classic proxy NLB; distributed Envoy for regional external / regional internal / cross-region internal ALB and regional external / regional internal / cross-region internal proxy NLB |
| Private Service Connect | `PRIVATE_SERVICE_CONNECT` (Google-managed regional or global API endpoint, or a managed service published with Private Service Connect) | 1 | Regional | See "Private Service Connect: Supported load balancers and targets" | Not applicable |
| Port mapping | `GCE_VM_IP_PORTMAP` (maps a client port of a Private Service Connect endpoint to a service port and producer VM) | 1 or more | Regional | To a service producer VPC network through a Private Service Connect endpoint and service attachment | Not applicable |

### Load balancers per NEG type

| NEG type | Supported by |
|---|---|
| Zonal `GCE_VM_IP` | Internal passthrough Network Load Balancer; regional and global external passthrough Network Load Balancer |
| Zonal `GCE_VM_IP_PORT` | Regional / cross-region internal proxy NLB; regional external proxy NLB; regional and cross-region internal ALB; global external ALB; classic ALB; regional external ALB; global external proxy NLB; classic proxy NLB; Cloud Service Mesh |
| Global internet | Cloud CDN; global external ALB; classic ALB; Cloud Service Mesh (`INTERNET_FQDN_PORT` only) |
| Regional internet | Regional external ALB; regional internal ALB; regional external proxy NLB; regional internal proxy NLB |
| Serverless | Global external ALB; classic ALB; regional external ALB (Cloud Run); regional internal ALB and cross-region internal ALB (Cloud Run and Cloud Run functions 2nd gen only); API Gateway via external ALB |
| Hybrid connectivity | External ALB (global, classic, regional); internal ALB (cross-region, regional); external proxy NLB (global, classic, regional); internal proxy NLB (regional, cross-region); Cloud Service Mesh |
| Private Service Connect | Cross-region internal ALB; regional internal ALB; global external ALB (not classic ALB); regional external ALB; global external proxy NLB (not classic proxy NLB; associate via the Google Cloud CLI or an API request); regional internal proxy NLB; cross-region internal proxy NLB; regional external proxy NLB |
| Port mapping | Private Service Connect port mapping |

## Notes

- Google Cloud Load Balancing — not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Only `GCE_VM_IP_PORT` endpoints support IPv4 and IPv6 (dual stack) zonal NEGs.
- The source page links end-to-end setup guides for each NEG type and load balancer; they are not part of this category.
- ALB = Application Load Balancer, NLB = Network Load Balancer (abbreviations used in this table only).
- Snippet taken from https://docs.cloud.google.com/load-balancing/docs/negs/setting-up-zonal-negs (the source overview page has no code block).
- Source: https://docs.cloud.google.com/load-balancing/docs/negs (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [zonal-neg-concepts.md](./zonal-neg-concepts.md)
- [internet-neg-concepts.md](./internet-neg-concepts.md)
- [serverless-neg-concepts.md](./serverless-neg-concepts.md)
- [hybrid-neg-concepts.md](./hybrid-neg-concepts.md)
- [setting-up-zonal-negs.md](./setting-up-zonal-negs.md)
