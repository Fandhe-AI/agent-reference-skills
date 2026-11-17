---
source: https://docs.cloud.google.com/network-security-integration/docs/in-band/in-band-integration-overview
---

# In-band integration overview

In-band integration lets you insert your own network security appliances, such as firewalls or intrusion detection systems, directly in the traffic path so they inspect traffic before it reaches its destination. It uses Cloud Next Generation Firewall and Packet Intercept technologies; Packet Intercept inserts appliances without modifying existing routing policies. Packets are processed before outbound packets are routed and after inbound routed packets are received, and GENEVE encapsulation transports packets between the sending or receiving VMs and the packet processing VMs.

## Signature / Usage

### Create an intercept endpoint group (consumer)

```bash
gcloud network-security intercept-endpoint-groups create \
    my-endpoint-group --project=my-project --location=global \
    --intercept-deployment-group=my-deployment-group
```

## Options / Props

### Components

| Side | Component | Scope / description |
|------|-----------|---------------------|
| Producer | VM instances | Host the appliance or custom software. Zonal unmanaged or zonal managed instance groups can be used. The producer configures, scales and maintains them. |
| Producer | Internal passthrough Network Load Balancer | Distributes traffic to the backend inspection VMs; its forwarding rule is the entry point. |
| Producer | Intercept deployment | Zonal resource that references the load balancer forwarding rule. |
| Producer | Intercept deployment group | Global resource that contains multiple zonal intercept deployments. |
| Consumer | Intercept endpoint group | Global, per-project resource that references the producer's intercept deployment group. |
| Consumer | Intercept endpoint group association | Global, per-project resource that connects an intercept endpoint group to one or more consumer VPC networks. |
| Consumer | Firewall rules | Hierarchical firewall policy or global network firewall policy rules that use the `apply_security_profile_group` action. |
| Consumer | Security profile | Global resource that references an intercept endpoint group. |
| Consumer | Security profile group | Global, organization-level and project-level resource that references a security profile. |

### Requirements for packet inspection

| Requirements for packet inspection |
|---|
| The rule using `apply_security_profile_group` belongs to a hierarchical firewall policy or global network firewall policy associated with a consumer VPC network. |
| The intercept endpoint group association links the consumer VPC network to the correct intercept endpoint group. |
| The rule's security profile group contains the security profile that references the same intercept endpoint group. Otherwise packets are not intercepted. |

### Limitations

| Limitations |
|---|
| Matching packets are processed at a slower rate (depends on machine type, packet size and CPU utilization; similar to egress rates to destinations outside a VPC network). |
| Regional network firewall policies don't support Packet Intercept. |
| Producer intercept deployments don't support instances with Dynamic NICs as backends. |
| Intercepted TCP sessions must begin with a SYN packet; for unknown connections the appliance drops non-SYN packets. Contact Cloud Support if traffic includes non-SYN initiators or split routing. |

## Notes

- Packet flow: 1. Intercept in the consumer VPC zone. Egress packets are intercepted before routing; ingress packets after routing. With an external IPv4 address or Cloud NAT, the source (egress) or destination (ingress) address is translated around the rule processing and inspection. 2. Encapsulate with GENEVE (original source and destination IPs preserved in the payload). 3. Send to a backend VM of the producer's internal passthrough Network Load Balancer, chosen by the zone of the intercepted VM and the intercept deployment group. 4. Process: producer VMs receive GENEVE on `UDP` port `6081`, extract, inspect, and (if permitted) re-encapsulate without altering original IPs, protocols and ports. 5. Return the packet to the consumer network using direct server return (DSR).
- Direct internet egress: The appliance sends inspected internet-bound traffic directly to the internet through its external interface and returns the response over GENEVE. Configure only the appliance (per its own documentation); no extra producer / consumer resource configuration, Cloud NAT or default internet routes are needed in consumer VPC networks. Traffic crosses the VPC boundary 2 hops instead of 4.
- Intercept firewall rules are stateful: after a new session matches, all subsequent ingress and egress packets of the session are intercepted and encapsulated with the security profile group in the GENEVE header.
- Caution (source): intercept rules can't process partial TCP sessions; non-SYN TCP packets that match a rule but don't belong to a tracked connection are dropped.
- Consumers can use multiple producers in a VPC network, and can run Cloud NGFW Enterprise firewall endpoints in parallel with in-band integration.
- Zonal affinity: a zonal intercept deployment can reference a regional internal passthrough Network Load Balancer with backends in multiple zones; healthy VMs in the originating zone are preferred.
- Example deployment (source Figure 1): consumer networks use firewall policy evaluation order `BEFORE_CLASSIC_FIREWALL`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/intercept-endpoint-groups/create (gcloud 593.0.0 help). The source page itself has no code. The full flag list is in the gcloud reference; the help text has other examples that use mirroring flags on intercept commands, which are not copied.
- Source: https://docs.cloud.google.com/network-security-integration/docs/in-band/in-band-integration-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [nsi-overview.md](./nsi-overview.md)
- [security-profiles-overview.md](./security-profiles-overview.md)
- [security-profile-groups-overview.md](./security-profile-groups-overview.md)
- [nsi-quotas.md](./nsi-quotas.md)
