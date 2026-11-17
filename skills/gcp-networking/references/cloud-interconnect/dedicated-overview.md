---
source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/dedicated-overview
---

# Dedicated Interconnect overview

Dedicated Interconnect provides direct physical connections between your on-premises network and Google's network, for transferring large amounts of data more cost-effectively than extra public internet bandwidth.

## Signature / Usage

### Order a Dedicated Interconnect connection

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/create (gcloud 593.0.0 help). Ordering allocates ports and generates an LOA-CFA; the full flag list is in the `gcp-compute` skill.

```bash
gcloud compute interconnects create example-interconnect \
    --customer-name="Example Customer Name" \
    --interconnect-type=DEDICATED \
    --link-type=LINK_TYPE_ETHERNET_10G_LR \
    --location=example-zone1-1 --requested-link-count=1 \
    --noc-contact-email=noc@example.com \
    --description="Example interconnect"
```

### Create an interconnect group for an intended SLA level

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/create (gcloud 593.0.0 help).

```bash
gcloud compute interconnects groups create \
    example-interconnect-group \
    --intended-topology-capability=PRODUCTION_CRITICAL \
    --description="Example interconnect group"
```

## Options / Props

### Requirements at the colocation facility

| Requirement | Value |
|---|---|
| Optics (at least one) | 10-Gbps single mode fiber 10GBASE-LR (1310 nm); 100-Gbps 100GBASE-LR4; 400-Gbps 400GBASE-LR4 |
| Maximum fiber length | 10 km for 10GBASE-LR, 100GBASE-LR4, 400GBASE-LR; beyond that use a lit wavelength, DWDM or other managed circuit |
| Other | IPv4 link local addressing; LACP (even for a single circuit); EBGP-4 with multi-hop; 802.1Q VLANs |

### Port capacity (link type)

| Link type | Range |
|---|---|
| 10 Gbps | 1 x 10 Gbps up to 8 x 10 Gbps (80 Gbps) |
| 100 Gbps | 1 x 100 Gbps up to 8 x 100 Gbps (800 Gbps) |
| 400 Gbps | 1 x 400 Gbps up to 8 x 400 Gbps (3200 Gbps) |

### VLAN attachment MTU and stack types

| Item | Value |
|---|---|
| MTU | 1440, 1460, 1500 or 8896 bytes; 8896 (jumbo) only on unencrypted IPv4 and IPv6 attachments; Google API Client Library requests use 1440 MTU packets regardless |
| Stack type | Single stack (IPv4 only, the default) or dual stack (IPv4 and IPv6) |
| BGP sessions, IPv4 only | IPv4 BGP |
| BGP sessions, IPv4 and IPv6 | IPv4 BGP with or without MP-BGP; IPv6 BGP with or without MP-BGP; both IPv4 BGP and IPv6 BGP without MP-BGP |

### Redundancy topology requirements

| Level | Requirement |
|---|---|
| Critical production (99.99%) | At least four connections: two in one metro and two in another; connections in the same metro in different edge availability domains |
| Non-critical production (99.9%) | At least two connections in the same metro, in different edge availability domains (same or different facility) |
| No SLA | Group without an intended reliability level |

### Connection groups

| Group type | Contains | Rules |
|---|---|---|
| Interconnect groups | Cloud Interconnect connections | A connection can be in more than one group; the group must be in the same project as its resources |
| Attachment groups | VLAN attachments | An attachment can be in only one group; all attachments must use the same VPC network |

## Notes

- The link type chosen when creating a connection cannot be changed later; create a new connection for higher capacity.
- Connection groups are informational and organizational only and never change the behavior of connections or attachments.
- Fixed port pricing for outbound transfers applies to local connections (metro matches the destination region) and remote connections. Regions that offer fixed pricing only for remote connections: `us-west1`, `us-east1`, `europe-west4`, `europe-north1`, `asia-east1`. Request it from your account team.
- ECMP balances egress across connections only if Cloud Routers receive the same announcement with equal cost (same CIDR range and MED); traffic is balanced by each attachment's configured capacity.
- Availability means ICMP `ping` works between a VM in a region and a correctly configured on-premises machine through at least one redundant connection.
- IPv6: use dual-stack or IPv6-only subnets with internal IPv6 ranges and IPv6-enabled VMs, then configure VLAN attachments. Custom IP ranges must be given at VLAN creation; IPv6 custom ranges can be added when upgrading the stack type from `IPV4_ONLY` to `IPV4_IPV6`.
- For provisioning issues, reply to the LOA-CFA email for faster support than a support case.
- The source page contains no commands; step-by-step provisioning is on the Dedicated Interconnect "Provisioning overview" page (https://docs.cloud.google.com/network-connectivity/docs/interconnect/how-to/dedicated/provisioning-overview).
- Ordering a connection and deleting groups or attachments affect connectivity and billing; try them on a disposable resource first.
- Source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/dedicated-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/create and https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/create (gcloud 593.0.0 help).

## Related

- [overview.md](./overview.md)
- [terminology.md](./terminology.md)
- [best-practices.md](./best-practices.md)
- [quotas.md](./quotas.md)
