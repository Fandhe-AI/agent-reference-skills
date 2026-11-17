---
source: https://docs.cloud.google.com/load-balancing/docs/load-balancer-resource-model
---

# Cloud Load Balancing resource model

A load balancer is not a single API resource; it is a set of cooperating components that carry traffic from the frontend (forwarding rule) to the backends.

## Signature / Usage

Inspect the frontend of an existing load balancer:

```bash
gcloud compute forwarding-rules describe FORWARDING-RULE --global
```

## Options / Props

| Component | Used by | Role |
|-----------|---------|------|
| Forwarding rule | All | IP address, IP protocol and one or more ports on which the load balancer accepts traffic; with its IP address it is the frontend |
| Target proxy | Application Load Balancers, proxy Network Load Balancers | Terminates client connections and creates new connections to backends. The first connection ends in a GFE or in the proxy-only subnet (Envoy). A target HTTP(S) proxy uses a URL map; a target TCP proxy can optionally use TLS routes |
| Proxy-only subnet | Envoy-based load balancers | Pool of IPs reserved exclusively for Envoy proxies |
| SSL certificates | Forwarding rules referencing a target HTTPS proxy or target SSL proxy | Private key and certificate are required in the target proxy configuration |
| URL map | Application Load Balancers only | Routes a request to a backend service or backend bucket by HTTP attributes such as domain, path and query parameters |
| TLS route (`TLSRoute`) | Regional external, regional internal and cross-region internal proxy Network Load Balancers | Routes TCP traffic to backend services by SNI hostname in the TLS ClientHello, attached optionally to a target TCP proxy; enables TLS passthrough |
| Backend service | All | Protocol to backends, distribution and session settings, health checks, timeouts; backends are VM instance groups or network endpoint groups (NEGs) |
| Backend bucket | Application Load Balancers | Routes requests for static content to a Cloud Storage bucket |
| Health checks | All | Determine backend health with Layer 7 or Layer 4 protocols |
| Firewall rules | All | Ingress `allow` rules so health check probes reach backends |
| Backends | All | Final destination; each backend has a balancing mode |

## Notes

- Firewall rules: GFE-based load balancers need an ingress allow rule for the Google Front End CIDRs; Envoy-based ones need an ingress allow rule from the proxy-only subnet. See https://docs.cloud.google.com/load-balancing/docs/firewall-rules.
- Target proxies are only used by proxy-based load balancers; backend responses return to the target proxy, not directly to the client.
- Different load balancers support different backend types; a balancing mode (set when adding a backend to the backend service) evaluates capacity and determines distribution.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/forwarding-rules/describe (gcloud 593.0.0 help). The source page has no code.
- Google Cloud Load Balancing is not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`). Resource-level gcloud and REST pages are in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/load-balancing/docs/load-balancer-resource-model (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [forwarding-rule-concepts.md](./forwarding-rule-concepts.md)
- [load-balancing-overview.md](./load-balancing-overview.md)
- [choosing-load-balancer.md](./choosing-load-balancer.md)
