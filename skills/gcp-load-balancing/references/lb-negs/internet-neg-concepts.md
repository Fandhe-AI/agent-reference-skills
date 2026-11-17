---
source: https://docs.cloud.google.com/load-balancing/docs/negs/internet-neg-concepts
---

# Internet network endpoint groups overview

An internet NEG defines an external backend (a backend outside Google Cloud reachable over the internet; also called custom origin or external endpoint) for a load balancer. The Google Cloud load balancer is the frontend: it terminates user connections at the Google edge, proxies to the external backend over Google's backbone, and with global load balancers can cache the content with Cloud CDN. Internet NEGs can be used only on the Premium Network Service Tier.

## Signature / Usage

### Create a NEG

```bash
gcloud compute network-endpoint-groups create my-neg \
    --zone=us-central1-a --network=my-network --subnet=my-subnetwork
```

This is the gcloud help example for a zonal NEG; internet NEGs are created with `--network-endpoint-type=internet-ip-port` or `internet-fqdn-port` and no zone for global NEGs. The full flag list is in the `gcp-compute` skill (https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-endpoint-groups/create).

## Options / Props

### Global internet NEGs (global external ALB, classic ALB)

| Endpoint type | Endpoint definition | Health checks | Server certificate validation |
|---|---|---|---|
| `INTERNET_FQDN_PORT` | Publicly resolvable FQDN and optional port, for example `backend.example.com:443`; must resolve in Google's public DNS; one endpoint per NEG | Not supported | Always validated against public CA certificates |
| `INTERNET_IP_PORT` | Publicly routable IP (not RFC 1918) and optional port, for example `8.8.8.8:443`; one endpoint per NEG | Not supported | Not validated |

### Regional internet NEGs (regional external / regional internal ALB, regional external / regional internal proxy NLB)

| Endpoint type | Endpoint definition | Health checks | Server certificate validation |
|---|---|---|---|
| `INTERNET_FQDN_PORT` | Publicly or privately resolvable FQDN and a required port (specify per endpoint, as NEG default port, or both); resolution follows Cloud DNS name resolution order; up to 256 endpoints per NEG | Distributed Envoy health checks (optional) | Not validated; use backend authenticated TLS |
| `INTERNET_IP_PORT` | Publicly routable IP (not RFC 1918) and a port; up to 256 endpoints per NEG | Distributed Envoy health checks (optional) | Not validated; use backend authenticated TLS |

### Backend service rules

| Item | Global NEGs | Regional NEGs |
|---|---|---|
| NEGs per backend service | 1 | Up to 50 |
| Endpoints per NEG | 1 (no load balancing; no rate / connection / utilization modes) | Up to 256; all endpoints pooled, Envoy algorithms (see `localityLbPolicy` of the regional backend service API) |
| Health checks | Backend service cannot reference one | Distributed Envoy health checks |
| Other backend types on same service | Not allowed (no zonal NEGs or instance groups) | Not allowed |

### Egress and allowlisting

| NEG scope | How to enable the backend to receive requests |
|---|---|
| Global | Allowlist Google's egress IP ranges; look them up from the `_cloud-eoips.googleusercontent.com` DNS TXT record with `dig` or `nslookup` |
| Regional | Create a Cloud NAT gateway for the proxy-only subnet with endpoint type `ENDPOINT_TYPE_MANAGED_PROXY_LB`; automatic or manual NAT IPs |

## Notes

- Global internet NEGs (global external ALB, classic ALB): Without a port, the NEG default port is used; if none, `80` (HTTP) or `443` (HTTPS and HTTP/2). Global internet NEGs are powered by GFE, use a fixed set of egress IP addresses, and the backend must be reachable only over the internet (not Cloud VPN / Cloud Interconnect); Google API or service backends must be reachable on TCP `80` or `443` with `HTTP`, `HTTPS` or `HTTP/2`.
- Regional internet NEGs (regional external / regional internal ALB, regional external / regional internal proxy NLB): Regional internet NEGs are powered by managed Envoy proxies.
- Backend service rules: Backend service protocol must be `HTTP`, `HTTPS` or `HTTP2` (HTTPS or HTTP/2 strongly recommended so traffic over the public internet is encrypted and authenticated). The load balancing scheme must match the load balancer. SNI is sent only for `INTERNET_FQDN_PORT` endpoints (not for `INTERNET_IP_PORT`). Global FQDN certificate checks: signed by well-known CAs, not expired, valid signature, FQDN matches a SAN.
- Google Cloud Load Balancing — not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Global FQDN endpoints: the load balancer uses a DNS resolver in the Google Cloud region closest to the client, connects to the first IP in the DNS response and returns HTTP `502 (Bad Gateway)` if it is unreachable, even when other IPs exist. Unresolvable names (by the public DNS system) cannot be used. An unreachable backend or unresolvable FQDN also returns `502`.
- Regional FQDN endpoints: Envoy balances over all returned IPs (round robin, least request, and so on) and refreshes the list by DNS TTL; retry policies can force another IP. Private FQDNs require a Cloud DNS zone, DNS forwarding or DNS peering (see the Cloud DNS pages in the `gcp-networking` skill).
- Regional health checks: probes originate from the proxy-only subnet and are NAT-translated by Cloud NAT. gRPC health checks and PROXY protocol v1 health checks are not supported. Health status of these endpoints cannot be read from the console, API or gcloud. Every Envoy proxy probes independently, so health-check traffic can grow at `O(n^2)` in the worst case. Health check logs for distributed Envoy checks have no detailed health states.
- Manual NAT IPs: each Envoy in the proxy-only subnet consumes a whole IP address. Warning from the source: if you provision fewer NAT IP addresses than the number of assigned Envoy proxies, requests to the internet NEG might result in HTTP 5xx errors; alert on the `nat_allocation_failed` metric. Default limit is 50 manually allocated NAT IP addresses per gateway. Dynamic port allocation is supported. The NAT configuration applies to the whole proxy-only subnet (shared by all regional Envoy-based load balancers in the region); NAT gateways on proxy-only subnets do not support logging or monitoring (`--enable-logging` and `--log-filter` unsupported).
- Authentication to the external backend (Application Load Balancers only): custom request header with a shared key (for example 16 or more cryptographically random bytes; keep it out of source control); IAP with signed-JWT verification including the `aud` claim containing the load balancer's project number (IAP is incompatible with Cloud CDN and unsupported on proxy NLBs); Cloud CDN private origin authentication for private Amazon S3 buckets (Cloud CDN is not supported with regional ALBs). Global ALBs configure custom headers on the backend service or URL map (modifying `Host` not supported in the URL map); regional ALBs only on the URL map, and `Host` and `authority` are reserved.
- Header processing: global ALBs coalesce repeated headers (never `Set-Cookie`), proper-case headers for `HTTP` / `HTTPS` backend protocols, and add or append `Via` and `X-Forwarded-For`; regional Envoy-based load balancers have no special processing.
- Limitations: changing a load balancer's backend from an internet NEG to another backend type (or the reverse) causes about 30-90 seconds of downtime (global ALB clients see `502` with `failed_to_connect_to_backend`). Request mirroring, retry policies and traffic policies (locality policy, session affinity, outlier detection) are not supported with global internet NEGs.
- Making a backend reachable from the internet exposes it; keep authentication on the backend. Changing backend types is connectivity-breaking: try it on a disposable load balancer first.
- Pricing: Premium Tier internet egress, Cloud NAT and Cloud Load Balancing pricing pages (https://cloud.google.com/network-tiers/pricing#premium-pricing, https://cloud.google.com/nat/pricing, https://cloud.google.com/vpc/network-pricing#cloud-load-balancing).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-endpoint-groups/create (gcloud 593.0.0 help).
- Source inconsistency: the regional internet NEG endpoint table describes `INTERNET_FQDN_PORT` as "a fully qualified domain name and an optional port" and `INTERNET_IP_PORT` as "an optional port", but its footnote says "With regional internet NEGs, you are required to specify a port" (as a NEG default port, per endpoint, or both). This page follows the footnote.
- Source inconsistency: the source says "You can only use internet NEGs on the Premium network service tier", but it also describes regional internet NEGs for regional external load balancers, and the external Application Load Balancer page (https://docs.cloud.google.com/load-balancing/docs/https, retrieved 2026-11-17) says regional external Application Load Balancers can be configured in either Premium or Standard Tier. The Premium-only statement is the internet NEG page's own.
- Source: https://docs.cloud.google.com/load-balancing/docs/negs/internet-neg-concepts (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [negs.md](./negs.md)
- [hybrid-neg-concepts.md](./hybrid-neg-concepts.md)
- [serverless-neg-concepts.md](./serverless-neg-concepts.md)
