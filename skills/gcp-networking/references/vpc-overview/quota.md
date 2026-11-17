---
source: https://docs.cloud.google.com/vpc/docs/quota
---

# Quotas and limits (VPC)

Quotas and system limits for VPC networking. Quotas generally apply per Google Cloud project, are enforced by Cloud Quotas (changes can be requested or automated with the quota adjuster) and usually make the task fail when exceeded. System limits cannot be changed unless noted.

## Signature / Usage

### Check quotas

```bash
    gcloud compute project-info describe --project PROJECT_ID
```

Replace `PROJECT_ID` with your project ID. To check used quota in a region:

```bash
    gcloud compute regions describe example-region
```

Monitor per-project quotas with the Cloud Monitoring metric `serviceruntime.googleapis.com/quota/allocation/usage` on the `Consumer Quota` resource type, with label filters `service` and `quota_metric`.

## Options / Props

### Per-project quotas

| Quota | Description |
|---|---|
| GCE VM to internet egress bandwidth Mbps | Total egress from VMs in one region to destinations outside the VPC network (default internet gateway); charged to the project with the VMs. Excludes Private Google Access traffic and Google APIs traffic from VMs with external IPs. |
| Inter-region network egress bandwidth (Mbps) from Compute instances | Total egress from VMs in one region to destinations routable within a VPC network (next hops other than the default internet gateway); charged to the project with the VMs. |
| Shared VPC service projects per host project | Service projects attachable to a host project (see Shared VPC limits below). |
| Networks | Includes the removable `default` network. |
| Policy-based routes | Policy-based routes per project. |
| Routers | Cloud Routers per project, any network or region (per-region limit per network in Cloud Router quotas). |
| Packet Mirrorings | Packet Mirroring policies per project. |
| Internal IP addresses | Static regional internal IPv4 addresses per region. |
| Regional static internal IPv6 address ranges | Per region. |
| Static global internal IPv4 addresses | Global ranges per project, such as allocated ranges for private services access and PSC endpoints for global Google APIs. |
| Internal ranges | Internal range resources per project. |
| Static IP addresses | Static regional external IPv4 addresses per region. |
| Regional static external IPv6 address ranges | Per region. |
| Static IP addresses global | Static global external IP addresses. |
| In-use IP addresses | Static and ephemeral regional external IPs in use at once. |
| In-use IP addresses global | Static and ephemeral global external IPs in use at once. |
| Address move requests per minute | System limit, global. |
| Address move requests per minute per region | System limit per region. |
| Static BYOIP IP addresses | Regional BYOIP external IPs per region. Limit `STATIC-BYOIP-ADDRESSES-per-project-region`; metric `compute.googleapis.com/regional_static_byoip_addresses`. |
| Static BYOIP IP addresses global | Limit `STATIC-BYOIP-ADDRESSES-per-project`; metric `compute.googleapis.com/global_static_byoip_addresses`. |
| Public advertised prefixes | Limit `PUBLIC-ADVERTISED-PREFIXES-per-project`; metric `compute.googleapis.com/public_advertised_prefixes`. |
| Public V2 advertised prefixes create / delete / announce requests per minute | Apply to v1 and v2 prefixes (create, delete); announce is for regional prefixes. Limits `PublicAdvertisedPrefixV2CreateRequestsPerMinutePerProject`, `...DeleteRequestsPerMinutePerProject`, `...AnnounceRequestsPerMinutePerProject`. |
| Regional public delegated prefixes | Per region. Limit `PUBLIC-DELEGATED-PREFIXES-per-project-region`. |
| Global public delegated prefixes | Limit `PUBLIC-DELEGATED-PREFIXES-per-project`. |
| Regional public delegated prefixes create / delete / announce requests per minute per region | Limits `PublicDelegatedPrefixCreateRequestsPerMinPerProjectPerRegion`, `...DeleteRequestsPerMinPerProjectPerRegion`, `...AnnounceRequestsPerMinPerProjectPerRegion` (announce does not apply to withdraw). |
| Public delegated prefix with variable prefix length | Regional IPv6 PDPs per project per region. Limit `VARIABLE-IPV6-PUBLIC-DELEGATED-PREFIXES-per-project-region`. |
| PSC internal LB forwarding rules | Max PSC endpoints per consumer, per region per project: `PSC-INTERNAL-LB-FORWARDING-RULES-per-project-region`. |
| Number of Regional Endpoints per project per region | PSC endpoints to regional endpoints: `RegionalPerProjectRegionalEndpoints`. |
| PSC global GAPI routes per route table | Max PSC endpoints for global Google APIs propagated to VPC spokes of one Network Connectivity Center hub (Preview); each endpoint counts once regardless of spokes: `PerProjectPerHubPerRouteTablePscGlobalGoogleApiRoutes`. |
| Service attachments | Producer, per region per project: `SERVICE-ATTACHMENTS-per-project-region`. |
| Network attachments | Consumer, per region per project: `NETWORK-ATTACHMENTS-per-project-region`. |
| Service Connection Policies per project per region | `RegionalPerProjectServiceConnectionPolicies`. |
| Service Connection Maps per project per region | `RegionalPerProjectServiceConnectionMaps`. |
| Regional health aggregation policies / health sources / composite health checks | Per region per project: `REGIONAL-HEALTH-AGGREGATION-POLICIES-per-project-region`, `REGIONAL-HEALTH-SOURCES-per-project-region`, `REGIONAL-COMPOSITE-HEALTH-CHECKS-per-project-region`. |

### Per-network quotas

| Quota (name) | Description |
|---|---|
| Instances per VPC network (`INSTANCES_PER_NETWORK_GLOBAL`) | Total VM NICs in the network. Metrics `instances_per_vpc_network`. |
| IP aliases per VPC network (`ALIASES_PER_NETWORK_GLOBAL`) | Total alias IP ranges used by NICs, counted without regard to range size; also a per-NIC limit. Metrics `ip_aliases_per_vpc_network`. |
| Subnetwork ranges per VPC network (`SUBNET_RANGES_PER_NETWORK`) | Primary IPv4, secondary IPv4 and IPv6 ranges. Metrics `subnet_ranges_per_vpc_network`. |
| Subnetwork ranges per peering group (`SUBNET_RANGES_PEERING_GROUP`) | Local plus directly peered networks. Metrics `subnet_ranges_per_peering_group` (limit, usage). |
| Peerings per VPC network (`PEERINGS_PER_NETWORK`) | Other networks this one can peer with. Metrics `peerings_per_network`. |
| Static routes per network (`STATIC_ROUTES_PER_NETWORK`) | Aggregate of IPv4 and IPv6 static routes. Metrics `static_routes_per_vpc_network`. |
| Static routes per peering group (`STATIC_ROUTES_PER_PEERING_GROUP`) | Local plus directly peered. Metrics `static_routes_per_peering_group` (limit, usage). |
| Dynamic routes per region per peering group (`DYNAMIC_ROUTES_PER_REGION_PER_PEERING_GROUP`) | Per region, IPv4 plus IPv6 dynamic routes, local and peered. Metrics `dynamic_routes_per_region_per_peering_group` (limit, usage). |
| PSC Google APIs forwarding rules per VPC network (`PSC_GOOGLE_APIS_FORWARDING_RULES_PER_NETWORK`) | Total PSC endpoints for global Google APIs across regions. Cannot be increased. |
| PSC propagated connections per VPC network (`PSC_PROPAGATED_CONNECTIONS_PER_VPC_NETWORK`) | Propagated connections for published services and regional Google APIs in a consumer network. Cannot be increased. |
| PSC ILB consumer forwarding rules per producer VPC network (`PSC_ILB_CONSUMER_FORWARDING_RULES_PER_PRODUCER_NETWORK`) | Endpoints and propagated connections accessing a producer network, all regions. Endpoints count until deleted (even if the service attachment is deleted or rejects); propagated connections count until the endpoint is deleted. Metrics under `compute.googleapis.com/psc_ilb_consumer_forwarding_rules_per_producer_vpc_network/`. |

### Limits (generally cannot be increased)

| Item | Limit | Notes |
|---|---|---|
| Shared VPC host projects per organization | 100 | Request change through a support case. |
| Host projects a service project can attach to | 1 | Cannot be increased. |
| Primary IP ranges per subnet | 1 | Exactly one for IPv4-only and dual-stack. Cannot be increased. |
| Secondary IP ranges per subnet | 170 | Cannot be increased. |
| Network tags per route | 256 | Cannot be increased. |
| Public delegated prefixes per public advertised prefix | 10 | |
| Allocated IP ranges per private connection | 5,000 | Private services access. |
| MTU | 1,300 to 8,896 bytes inclusive | Common: 1460 (default), 1500, 8896. |
| Network interfaces per VM | Depends on machine type | |
| Alias IP ranges per network interface | 150 | Subject to the per-network quota; range size is not considered. |
| NICs per VPC network on one instance | 1 | Each NIC must connect to a unique network. |
| Idle TCP connection timeout | 10 minutes | Not changeable; use TCP keepalives. |
| Egress to internal IP | Depends on machine type | |
| Egress to external IP | All flows about 7 Gbps sustained, or 25 Gbps with per-VM Tier_1 networking; single flow 3 Gbps sustained | |
| Ingress to internal IP | No artificial limit | |
| Ingress to external IP | No more than 30 Gbps and 1,800,000 packets per second | |

### Firewall connection logging limits (per VM, connections logged in a 5-second interval; best effort)

| Machine type | Maximum |
|---|---|
| f1-micro | 100 |
| g1-small | 250 |
| 1 to 8 vCPUs | 500 per vCPU |
| More than 8 vCPUs | 4,000 (500 x 8) |

### Required roles

| Task | Role |
|---|---|
| Check quotas | `roles/owner`, `roles/editor` or `roles/servicemanagement.quotaViewer` |
| Modify or request quota | `roles/owner`, `roles/editor`, `roles/servicemanagement.quotaAdmin`, or a custom role with `serviceusage.quotas.update` |

## Notes

- Per-project quotas: Per-project quotas can be raised in the console; if the edit option is not available, file a support case.
- Per-project quotas: Forwarding rule quotas are in the load balancing quotas documentation (`gcp-load-balancing` skill).
- Per-network quotas: Each has `limit`, `usage` and `exceeded` metrics under `compute.googleapis.com/quota/<name>/` where noted; a per-network quota usually has a per-peering group counterpart with an effective limit. Increases via console, otherwise a support case.
- Per-network quotas: If dynamic routes exceed the per-peering-group limit: Google Cloud drops only peering dynamic routes (unpredictably which), never local dynamic routes (subject to Cloud Router limits), and still lets a peering be created without a warning.
- Per-network quotas: Deprecated, no longer enforced: Subnetworks (replaced by Subnetwork ranges per VPC network), Routes (replaced by Static routes per network), Instances per peering group (use Instances per VPC network), IP aliases per peering group (use IP aliases per VPC network).
- Limits (generally cannot be increased): Per-network limits above are enforced via internal quotas, so exceeding them yields `QUOTA_EXCEEDED` errors with the internal quota names.
- Effective limit of a per-peering group quota: The effective limit is calculated per selected network (Step 1; a peering group is the network plus its directly peered networks). Step 2: take the greater of the network's per-peering group limit and its per-network limit (use the group limit if no per-network quota exists). Step 3: list the same greater-of value for each directly peered network. Step 4: take the smallest value in that list. Step 5: the effective limit is the greater of the Step 2 and Step 4 values. Example (`INTERNAL_FORWARDING_RULES_PER_PEERING_GROUP` / `..._PER_NETWORK`: network-a 500/600, network-b 350/300, network-c 300/300, network-d 400/300; a-b, a-c, c-d peered): effective limits are network-a 600, network-b 600, network-c 400, network-d 400.
- Exceeding a quota with gcloud prints a `quota exceeded` error and exits with code `1`; an API request returns HTTP `413 Request Entity Too Large`.
- Quotas don't guarantee availability: a resource can be unavailable in a region or zone even when quota remains.
- Hybrid connectivity quotas are on the Cloud VPN, Cloud Interconnect and Cloud Router quota pages (https://docs.cloud.google.com/network-connectivity/docs/vpn/quotas, https://docs.cloud.google.com/network-connectivity/docs/interconnect/quotas, https://docs.cloud.google.com/network-connectivity/docs/router/quotas).
- Quotas apply per project and are shared across all applications and IP addresses in it. Numeric default values are not stated on this page; check the Quotas page in the console.
- The source also shows a Console path for checking quotas.
- Source: https://docs.cloud.google.com/vpc/docs/quota (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [subnets.md](./subnets.md)
- [mtu.md](./mtu.md)
- [vpc.md](./vpc.md)
