---
source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/best-practices
---

# Best practices for Cloud Interconnect

Guidance for planning and configuring Cloud Interconnect: project layout, redundant connections with enough failover capacity, active-active VLAN attachments, failover between regions, and consistent MTU.

## Signature / Usage

### Group redundant connections to track the intended SLA level

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/create (gcloud 593.0.0 help). The source recommends creating redundant connections using connection groups.

```bash
gcloud compute interconnects groups create \
    example-interconnect-group \
    --intended-topology-capability=PRODUCTION_NON_CRITICAL \
    --interconnects=interconnect-1,interconnect-2
```

## Options / Props

### Capacity guidance per edge availability domain

| Type of capacity | Guidance |
|---|---|
| Connection capacity | Each edge availability domain must carry all your production traffic |
| VLAN attachment capacity | Each edge availability domain must also have enough attachment capacity for all production traffic of the target VPC network; for multiple VPC networks create attachments from each VPC network to each connection and size per network |

Rule of thumb: connections protect up to 50% of aggregate capacity when split evenly between edge availability domains; above 50% may be throttled during congestion. Example: 100 Gbps of protected traffic needs redundant connections of at least 200 Gbps.

Example with `vpc-1` and `vpc-2` each receiving 2 Gbps: in each of two edge availability domains use 1 x 10 Gbps connection capacity and 2 x 1 Gbps attachments to `vpc-1` plus 2 x 1 Gbps to `vpc-2`.

### Scenarios

| Scenario | Setup | Result |
|---|---|---|
| 1: Sufficient capacity | 2 connections of 1 x 10 Gbps, attachments 1 x 10 Gbps each, one region; workload 10 Gbps | Works in normal operation and failover |
| 2: Insufficient capacity during failover | 2 connections of 1 x 100 Gbps, attachments 2 x 50 Gbps each; workload 150 Gbps | Fails over to 100 Gbps: congestion and loss. Need at least 200 Gbps connection capacity and 3 x 50 Gbps attachment capacity in each domain |
| 3: Imbalanced attachments | 2 x 100 Gbps connections; attachments 2 x 10 Gbps in domain 1 (updated) and 1 x 10 Gbps in domain 2; workload 20 Gbps | Survives loss of domain 2 only; need at least 2 x 10 Gbps of attachment capacity in each domain |

### MTU behavior on VLAN attachments

| Situation | Behavior |
|---|---|
| TCP SYN and SYN-ACK | MSS clamped to fit the attachment MTU (for 1,500 bytes MTU, MSS 1,460) |
| IP packets up to the MTU | Unchanged |
| Packets from Google Cloud resources exceeding the attachment MTU | Dropped; Fragmentation Needed (ICMP) or Packet Too Big (ICMPv6) is sent whether or not DF is set. Allow ingress ICMP / ICMPv6 in VPC firewall rules or firewall policy rules; internal passthrough Network Load Balancer and internal protocol forwarding rules must use `L3_DEFAULT` |
| Packets received from on-premises | Attachment MTU not enforced; the receiving resource enforces its own (for VMs, the VPC network MTU) |
| HA VPN over Cloud Interconnect | Gateway MTU 1440 bytes; payload MTU smaller depending on ciphers |

## Notes

- Warning: after a Cloud Interconnect connection is created in a project it cannot be moved to another project or renamed. Provision physical connections (ports) in a separate project in the same organization; place VLAN attachments in other projects. In Shared VPC, configure VLAN attachments (not ports) in the host project.
- Prefer active-active VLAN attachments; with active/passive, test failover before adding production traffic.
- Warning: with ECMP across active-active attachments use flow-based hashing on on-premises devices. Per-packet load balancing (round-robin, random) is not supported and can cause services such as Private Service Connect to close TCP connections.
- Cross-region failover: egress prefers the lowest-metric path, normally the local region's attachments even if overloaded; traffic leaves only if all local attachments are down. Each of the four connections in the production topology needs enough attachment capacity for all production traffic.
- Use the same MTU on all attachments of a VPC network and the same value on the VPC network; mismatches (different attachment MTUs, or attachment MTU lower than the VPC MTU) can drop packets, especially non-TCP.
- Configured attachment capacity may exceed the connection capacity, but real traffic cannot.
- Source: https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/best-practices (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/create (gcloud 593.0.0 help).

## Related

- [overview.md](./overview.md)
- [dedicated-overview.md](./dedicated-overview.md)
- [partner-overview.md](./partner-overview.md)
- [quotas.md](./quotas.md)
