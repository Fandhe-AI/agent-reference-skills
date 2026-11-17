---
source: https://docs.cloud.google.com/dns/docs/routing-policies-overview
---

# DNS routing policies and health checks

DNS routing policies on resource record sets in private or public zones steer traffic by weighted round robin (WRR), geolocation (optionally with a geofence), or failover, with health checking for internal load balancers and external endpoints.

## Signature / Usage

### Create a failover record set with health checking

Snippet taken from the `gcloud dns record-sets create` help EXAMPLES (see Notes). Primary data `config1` refers to a health-checked target; backup data is a geolocation policy; 10% of traffic trickles to the backup.

Adapted (not in the official docs): the help example puts a backslash-newline inside a single-quoted string, repeats `--zone` with two different values, and spells the flag `--routing_policy_type`, and writes the location `us-centra1`; the string is joined, one `--zone` kept, the flag spelled as in the SYNOPSIS (`--routing-policy-type`), and the location written `us-central1`.

```bash
gcloud dns record-sets create foo.bar.com. --type=A --ttl=60 \
    --routing-policy-type=FAILOVER \
    --routing-policy-primary-data='config1' \
    --routing-policy-backup-data-type=GEO \
    --routing-policy-backup-data='us-central1=1.2.3.4,2.3.4.5;us-west1=3.4.5.6,9.8.7.6' \
    --backup-data-trickle-ratio=0.1 \
    --enable-health-checking --zone=my_zone
```

## Options / Props

### Policy types

| Policy | Behavior |
|---|---|
| WRR | Per-target weights, 0 to 1000 inclusive. Supports manual active-active / active-passive and production/experiment splits. Cannot be combined with geolocation. |
| Geolocation | Maps source geography (Google Cloud regions) to targets; nearest match when no item matches exactly. Public DNS uses source IP or EDNS client subnet; private DNS uses the location of the packet sender (VM region, or region of the VPN tunnel / VLAN attachment / Router appliance for inbound server policy queries). |
| Geolocation with geofence | Keeps traffic in the geolocation even if all its endpoints are unhealthy: Cloud DNS returns all IPs unaltered. Without a geofence, traffic fails over to the next closest geolocation. |
| Failover | `active` set is returned normally; `backup` set is served when all `active` IPs are unhealthy. Trickle ratio to backup is a fraction 0 to 1 (typical `0.1`); 100% to backup triggers a manual failover. |

| Policy types |
|---|
| Routing policies can't be configured on forwarding zones, DNS peering zones, managed reverse lookup zones, or Service Directory zones. |
| Resolver caching until TTL expiry can make steering inexact. |
| Supported record types: `A` (private-zone and public-zone health checks), `AAAA` (public-zone health checks), and `CNAME`, `MX`, `SRV`, `TXT` (no health checks). |

### Health checks

| Target | Availability and behavior |
|---|---|
| Internal Application Load Balancer (regional and cross-region), internal proxy Network Load Balancer (Preview) | Private zones only. Cloud DNS considers the load balancer's own health; enable global access for regional load balancers. |
| Internal passthrough Network Load Balancer | Private zones only. Healthy when at least 20% (default) of backend instances are healthy; a load balancer with no backends counts as healthy, so specify at least one backend. |
| External endpoints (any public IP and port, including global/regional external Application Load Balancer VIPs, global external proxy Network Load Balancer VIP, on-premises) | Public zones only. Probes from three source regions you specify, three probers per region (nine per endpoint), at the check interval of 30 to 300 seconds. Probe source IPs are not fixed and may change. |

| Health checks |
|---|
| External health check protocols: TCP, HTTP, HTTPS (HTTP/HTTPS expect response code `200`; content-based string match is supported). The TCP request field and `proxyHeader` are not supported; SSL, HTTP/2, and gRPC are not supported. Default port is `80`. |
| Firewall rules must allow probes from any source IP on the configured port, otherwise endpoints are considered unhealthy. |
| With DNSSEC enabled on a health-checked zone, only a single IP address can be used per policy item (WRR or geolocation), and health-checked and non-health-checked IPs cannot be mixed in one policy. |
| When all IPs in a policy bucket are unhealthy: WRR redistributes among remaining healthy endpoints; geolocation without fencing moves to the next closest geography; with geofencing returns the closest VIP to the source region; failover switches to backup; if all buckets are unhealthy, Cloud DNS behaves as if all were healthy. |

### WRR and health check rules

| WRR and health check rules |
|---|
| Multiple targets all with weight 0 share traffic equally. |
| A new non-zero target becomes primary and takes all traffic; with more non-zero targets, the split is computed per request (weights 0, 25, 75 give 0, one-fourth, three-fourths). |
| Zero-weight targets without health checks are always healthy; if all non-zero records are unhealthy, zero-weight records are returned. If both kinds have health checks and all fail, non-zero records are returned. |
| Only IPs in the chosen weight bucket are returned, in randomized order when there are several. |

## Notes

- Health check logging records the health status when a health-checked name is queried; see the load balancing health-check-logging documentation (the `gcp-load-balancing` skill covers load balancers).
- Google Cloud DNS, not Cloudflare DNS.
- Adapted from the official docs: the gcloud help EXAMPLES block (https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/create, gcloud 593.0.0) printed `--zone=routing-policy-test ... --zone=my_zone`, `--routing_policy_type=FAILOVER` and a string broken by a backslash and newline (`'us-centra1=1.2.3.4,2.3.4.5;us-west\` + newline + `1=3.4.5.6,9.8.7.6'`); corrected as described above. The `$` prompt is removed.
- Corrected from the official docs: the help example writes the location `us-centra1`; the Cloud DNS routing policy guide writes this value as `us-central1` in its examples ("such as `asia-east1=198.51.100.1;us-central1=203.0.113.1`", https://docs.cloud.google.com/dns/docs/configure-routing-policies, retrieved 2026-11-17), so the example uses `us-central1`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/create (gcloud 593.0.0 help EXAMPLES).
- Source: https://docs.cloud.google.com/dns/docs/routing-policies-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [policies-overview.md](./policies-overview.md)
- [server-policies-overview.md](./server-policies-overview.md)
- [records-overview.md](./records-overview.md)
