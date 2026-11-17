---
source: https://docs.cloud.google.com/load-balancing/docs/forwarding-rule-concepts
---

# Forwarding rules overview

A forwarding rule (IP address, IP protocol, ports) plus its IP address is the frontend of a Google Cloud load balancer. Depending on the load balancer it points to a backend service, target proxy or target pool, is internal or external, and is global or regional.

## Signature / Usage

With the gcloud CLI or API you configure the forwarding rule explicitly (the console sets it up implicitly). Global rule to a target HTTP proxy:

```bash
gcloud compute forwarding-rules create RULE_NAME --global \
    --target-http-proxy=PROXY --ports=8080 --address=ADDRESS
```

### Change the IP address of a forwarding rule

The IP address, port and protocol of an existing forwarding rule cannot be changed. Delete and recreate it (`gcloud compute forwarding-rules delete`, then `create`; or REST `forwardingRules.delete` / `forwardingRules.insert`). Use `--global` for global rules and `--region=REGION` for regional rules.

## Options / Props

### Scheme, protocol and IP protocol options

| Product | Scheme | IP protocol options |
|---------|--------|---------------------|
| Global external Application LB | `EXTERNAL_MANAGED` | TCP |
| Classic Application LB | `EXTERNAL` | TCP |
| Regional external Application LB | `EXTERNAL_MANAGED` | TCP |
| Cross-region / regional internal Application LB | `INTERNAL_MANAGED` | TCP |
| Global external proxy Network LB | `EXTERNAL_MANAGED` | TCP (SSL is handled by a target SSL proxy; see Notes) |
| Classic proxy Network LB | `EXTERNAL` | TCP (SSL is handled by a target SSL proxy; see Notes) |
| Regional external proxy Network LB | `EXTERNAL_MANAGED` | TCP |
| Regional / cross-region internal proxy Network LB | `INTERNAL_MANAGED` | TCP |
| Global external passthrough Network LB (Preview) | `EXTERNAL_PASSTHROUGH` | TCP, UDP, or `L3_DEFAULT` |
| Regional external passthrough Network LB | `EXTERNAL` | TCP, UDP, or `L3_DEFAULT` |
| Internal passthrough Network LB | `INTERNAL` | TCP, UDP, or `L3_DEFAULT` |
| Cloud Service Mesh | `INTERNAL_SELF_MANAGED` | TCP |

### Ports

| Product (scheme) | Target | Port requirement |
|------------------|--------|------------------|
| All Application LBs, all proxy Network LBs | Target HTTP(S)/TCP/SSL proxy | Exactly one port from 1-65535 |
| Global / regional external passthrough, internal passthrough | Backend service | TCP or UDP: a list of up to five ports (contiguous or not), or a single contiguous range, or all ports (`--ports=ALL` or `allPorts` true). `L3_DEFAULT`: all ports required |
| Regional external passthrough (`EXTERNAL`) | Target pool | Single contiguous range; port optional, if omitted all ports 1-65535 are forwarded |
| Cloud Service Mesh | Target HTTP(S) proxy | Single value; no two Cloud Service Mesh forwarding rules in a VPC network may share an IP and port |
| Classic VPN | Target VPN gateway | Exactly one of 500, 4500 |

### IP addresses

| Product | IP scope and tier | Notes |
|---------|-------------------|-------|
| Global external Application LB, global external proxy Network LB | Global external IPv4/IPv6; Premium only | Reservable (optional) |
| Classic Application LB, classic proxy Network LB | Premium: global external IPv4 or IPv6 and global rule. Standard: regional external IPv4 and regional rule | IPv6 with a global external address (Premium) |
| Regional external Application LB, regional external proxy Network LB | Regional; Premium or Standard | External IPv6 supported in Premium Tier |
| Cross-region internal Application LB / proxy Network LB | Regional internal address in the regional subnet; global forwarding rule | Differs from the anycast IP of global external |
| Regional internal Application LB / proxy Network LB | Regional internal; address in the primary IPv4 range of the subnet | IPv6 format: https://docs.cloud.google.com/load-balancing/docs/ipv6#ipv6-address-format |
| Global external passthrough Network LB (Preview) | Global; Premium; two IPs per parent rule (availability groups `AG0`, `AG1`), same IP version | IPv6 requires a `/96` range from a Google-owned pool |
| Regional external passthrough Network LB | Regional; Premium or Standard | IPv6 needs a backend service-based LB; IPv6 from the subnet's external IPv6 range; rule tier must match the subnet's IPv6 tier |
| Internal passthrough Network LB | Regional; Premium | IPv4 from the primary subnet range; IPv6 a `/96` from the subnet's `/64` internal range |
| Cloud Service Mesh | Global internal; not reservable | 0.0.0.0, 127.0.0.1 or any RFC 1918 address; unique IP required |
| Classic VPN | Regional external; reservation required | IPv6 not supported |

### Multiple forwarding rules on one IP

| Condition | Rule |
|-----------|------|
| Protocol and port | Unique combination; passthrough LBs may add one `L3_DEFAULT` catch-all alongside protocol-specific rules |
| Scope | All regional or all global (exception: cross-region internal LBs use global rules with regional internal IPs) |
| Tier | Same Network Service Tier (external rules) |
| Scheme | Same, except: a regional external IP may be shared by regional external passthrough (`EXTERNAL`), regional external Application and proxy Network LBs (`EXTERNAL_MANAGED`); a regional internal IP with purpose `SHARED_LOADBALANCER_VIP` may be shared by internal passthrough (`INTERNAL`) and regional internal Application / proxy Network LBs (`INTERNAL_MANAGED`) |

## Notes

- Scheme, protocol and IP protocol options: The default IP protocol is `TCP`. `L3_DEFAULT` load balances TCP, UDP, ESP, GRE, ICMP, ICMPv6 for global and regional external passthrough, and TCP, UDP, ICMP, ICMPv6, SCTP, ESP, AH, GRE for internal passthrough.
- Network Service Tiers: global external Application and proxy Network LBs are always Premium; classic ones are global in Premium and effectively regional in Standard (backend services global, rules and IPs regional); regional external ones are Premium or Standard with regional resources; internal and global external passthrough are Premium. In Standard Tier the source marks regional external IPv6 for classic/regional external Application and proxy LBs as Preview, and Standard Tier for regional external passthrough as Preview. Standard Tier load balancers distribute only within a single region.
- A global external passthrough Network LB parent rule generates two read-only child rules. Multi-region backends for regional external passthrough need one load balancer per region.
- Target pool-based regional external passthrough supports only TCP or UDP and IPv4 only; backend service-based supports TCP, UDP, ESP, GRE, ICMP, ICMPv6 plus source-IP traffic steering and weighted load balancing.
- Ephemeral IPs stay constant while the rule exists; recreating a rule may assign a new IP. Reserve a static IP to keep it or share it across rules. Deleting a forwarding rule can break traffic, so try recreation on a disposable load balancer first.
- Telemetry policies (Preview): `TelemetryPolicy` Network Services resource configuring Cloud Trace distributed tracing for forwarding rules of global/regional external and regional/cross-region internal Application LBs.
- IAM conditions can check the rule's load balancing scheme (`INTERNAL` or `EXTERNAL`) to allow or deny creation. See https://docs.cloud.google.com/load-balancing/docs/access-control.
- Forwarding rules are also used for protocol forwarding, Classic VPN gateways and Cloud Service Mesh; this page covers load balancers only. Classic VPN is a legacy gateway type; see the `gcp-networking` skill for Cloud VPN.
- `EXTERNAL_MANAGED` backend services can attach to `EXTERNAL` rules but not the reverse.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/forwarding-rules/create (gcloud 593.0.0 help). The source page has no code. REST references: https://docs.cloud.google.com/compute/docs/reference/rest/v1/globalForwardingRules and https://docs.cloud.google.com/compute/docs/reference/rest/v1/forwardingRules; the full flag list is in the `gcp-compute` skill.
- Google Cloud Load Balancing is not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Clarified from the official docs: this page's source does not label the global external passthrough Network Load Balancer as Preview, but the load balancer overview (https://docs.cloud.google.com/load-balancing/docs/load-balancing-overview, retrieved 2026-11-17) and the load balancer selection page (https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer, retrieved 2026-11-17) do. The Preview label is added in the tables above.
- Source inconsistency: the source says "the regional external passthrough Network Load Balancer supports both Premium Tier and Standard Tier ([Preview])" for regional external IP addresses, but its forwarding rule table lists regional external passthrough as "Standard (IPv4 or IPv6 addresses) Premium (IPv4 or IPv6 addresses)" without a Preview label, and the passthrough Network Load Balancer backend service page (https://docs.cloud.google.com/load-balancing/docs/network/networklb-backend-service, retrieved 2026-11-17) says "Regional external passthrough Network Load Balancers support both Standard Tier and Premium Tier" and marks only external IPv6 in Standard Tier as Preview. The table above follows the table; the Preview statement in the Network Service Tiers note is the source's.
- Corrected from the official docs: the source table gives "TCP or SSL" as the IP protocol options for the global external and classic proxy Network Load Balancers, but `SSL` is not a forwarding rule IP protocol: the `ForwardingRule.IPProtocol` enum in the Compute Engine Discovery documents (v1 and beta, retrieved 2026-11-14) is `AH`, `ESP`, `ICMP`, `L3_DEFAULT`, `SCTP`, `TCP`, `UDP`. The same source page says "a forwarding rule points to either a TCP or an SSL target proxy", so SSL termination is configured on a target SSL proxy and the forwarding rule uses `TCP`. The full `--ip-protocol` flag of `gcloud compute forwarding-rules create` is in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/load-balancing/docs/forwarding-rule-concepts (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [load-balancer-resource-model.md](./load-balancer-resource-model.md)
- [choosing-load-balancer.md](./choosing-load-balancer.md)
- [quotas.md](./quotas.md)
