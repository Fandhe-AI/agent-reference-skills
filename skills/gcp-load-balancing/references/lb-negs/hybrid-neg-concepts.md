---
source: https://docs.cloud.google.com/load-balancing/docs/negs/hybrid-neg-concepts
---

# Hybrid connectivity network endpoint groups overview

A hybrid connectivity NEG holds `IP:port` endpoints (type `NON_GCP_PRIVATE_IP_PORT`) of on-premises or other-cloud services that the load balancer reaches over Cloud VPN, Cloud Interconnect or Router appliance VMs. Supported on external Application Load Balancers (global, classic, regional), internal Application Load Balancers (cross-region, regional), external proxy Network Load Balancers (global, classic, regional) and internal proxy Network Load Balancers (regional, cross-region). Hybrid NEGs are zonal.

## Signature / Usage

### Create a NEG

```bash
gcloud compute network-endpoint-groups create my-neg \
    --zone=us-central1-a --network=my-network --subnet=my-subnetwork
```

This is the gcloud help example for a zonal NEG; hybrid NEGs are created with `--network-endpoint-type=non-gcp-private-ip-port`. The full flag list is in the `gcp-compute` skill (https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-endpoint-groups/create).

## Options / Props

### Backend service requirements

| Item | Requirement |
|---|---|
| Load balancing scheme | `EXTERNAL_MANAGED` (global / regional external ALB, global / regional external proxy NLB); `EXTERNAL` (classic ALB, classic proxy NLB); `INTERNAL_MANAGED` (internal ALB, internal proxy NLB); `INTERNAL_SELF_MANAGED` for Cloud Service Mesh multi-environment deployments |
| Protocol | `HTTP`, `HTTPS` or `HTTP2` for ALBs; `TCP` or `SSL` for proxy NLBs |
| Balancing mode | `RATE` for ALBs; `CONNECTION` for proxy NLBs |
| Mixed backends | One backend service may hold `GCE_VM_IP_PORT` zonal NEGs (Google Cloud) plus hybrid NEGs; no other mix; Cloud Service Mesh does not support mixed types; GKE mixed NEG backends only with standalone NEGs |
| Endpoint type | Each hybrid NEG holds only `NON_GCP_PRIVATE_IP_PORT` endpoints, none inside a Google Cloud VPC network (for example internal passthrough NLB forwarding rule IPs): traffic may be dropped |
| Adding endpoints | Update the backends attached to the backend service |

### Health checks

| Load balancer | Mechanism |
|---|---|
| Global external ALB, classic ALB, global external proxy NLB, classic proxy NLB | Centralized health checks (required); allow `35.191.0.0/16` and `130.211.0.0/22` and advertise them from Cloud Router |
| Regional external / regional internal / cross-region internal ALB; regional external / regional internal / cross-region internal proxy NLB | Distributed Envoy health checks; each backend service needs a health check; probes originate from the region's proxy-only subnet, which must be allowed in the external firewall and advertised by Cloud Router |

### Network connectivity requirements

| Requirement | Detail |
|---|---|
| VPC network | Used for hybrid connectivity and load balancer resources; on-premises, other-cloud and Google Cloud subnet ranges must not overlap (subnet routes win on overlap). A different VPC network in the same project is allowed if connected by VPC Network Peering or as VPC spokes on the same Network Connectivity Center hub |
| Hybrid connectivity | Cloud Interconnect VLAN attachments, Cloud VPN tunnels with Cloud Router, or Router appliance VMs; high availability recommended; Cloud Router with global dynamic routing; regional dynamic routing and static routes are not supported |
| Cloud Router advertisements | Health check ranges `35.191.0.0/16` and `130.211.0.0/22` (global external ALB, classic ALB, global external proxy NLB, classic proxy NLB); the region's proxy-only subnet range (all Envoy-based load balancers, also needed for distributed Envoy health checks) |
| External firewall rules | Ingress allow from health-check probes (`35.191.0.0/16`, `130.211.0.0/22`); ingress allow for load-balanced traffic; for Envoy-based load balancers also allow the region's proxy-only subnet |

### Regional vs global placement

| Load balancer | Placement |
|---|---|
| External ALB / external proxy NLB | Global or regional depending on network tier; create hybrid NEGs in the regions where hybrid connectivity is configured |
| Cross-region internal ALB / cross-region internal proxy NLB | Multi-region; create hybrid NEGs in the regions of the hybrid connectivity |
| Regional internal ALB / regional internal proxy NLB | All components in the same region as the hybrid connectivity (for example the Cloud VPN gateway or VLAN attachment in REGION_A means backend service, hybrid NEG and forwarding rule in REGION_A); clients must be in that region unless global access is enabled |

## Notes

- Google Cloud Load Balancing — not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`). Cloud VPN, Interconnect and Cloud Router are in the `gcp-networking` skill.
- Pick a zone that minimizes distance to the remote environment (for example `europe-west3-a` for Frankfurt). Hybrid NEGs are zonal only; for regional availability the source suggests a regional internet NEG with an `INTERNET_FQDN_PORT` endpoint whose FQDN resolves to a private IP through a private Cloud DNS zone.
- Use cases: public clients through an external Application Load Balancer (Cloud Armor, Cloud CDN, Google-managed SSL certificates on global / classic; regional external ALB for single geolocation or Standard Tier), internal clients, and migration to cloud with weight-based traffic splitting (0% to 100%) on an internal ALB.
- Limitations: Cloud Router must use global dynamic routing; for regional Envoy-based load balancers hybrid connectivity must be in the same region as the load balancer, otherwise backends may look healthy while client requests are not forwarded. Encryption considerations for backends also apply: HA VPN is encrypted by default (IPsec), Cloud Interconnect is not.
- Distributed Envoy health checks: gRPC health checks and PROXY protocol v1 health checks are not supported; use unique endpoints across NEGs of the same backend service (the same endpoint in several NEGs gives undefined behavior); the console shows health status `N/A`; every Envoy probes independently so traffic can grow at `O(n^2)`; logs lack detailed health states. With mixed NEGs, allow `130.211.0.0/22` and `35.191.0.0/16` to the zonal NEG endpoints because zonal NEGs use centralized checks.
- Quota: hybrid NEGs count against NEG backends and endpoints per NEG quotas (https://docs.cloud.google.com/load-balancing/docs/quotas).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-endpoint-groups/create (gcloud 593.0.0 help).
- Source inconsistency: this page says the Google health check probe ranges for hybrid NEG backends are "`35.191.0.0/16` and `130.211.0.0/22`", but the health check concepts page (https://docs.cloud.google.com/load-balancing/docs/health-check-concepts, retrieved 2026-11-17) lists only `35.191.0.0/16` (IPv4) and `2600:2d00:1:b029::/64` (IPv6) for hybrid connectivity NEGs, and the external Application Load Balancer page (https://docs.cloud.google.com/load-balancing/docs/https, retrieved 2026-11-17) lists only `35.191.0.0/16` as health check source. Allow and advertise both IPv4 ranges when using hybrid NEGs with these load balancers.
- Source inconsistency: the Balancing mode row says `RATE` for Application Load Balancers, and the source says "must be `RATE` for Application Load Balancers", but the backend service page (https://docs.cloud.google.com/load-balancing/docs/backend-service, retrieved 2026-11-17) lists `RATE` as not available for backends with a long traffic duration and `IN_FLIGHT` as available (see backend-service.md in lb-backend-services).
- Source: https://docs.cloud.google.com/load-balancing/docs/negs/hybrid-neg-concepts (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [negs.md](./negs.md)
- [zonal-neg-concepts.md](./zonal-neg-concepts.md)
- [internet-neg-concepts.md](./internet-neg-concepts.md)
