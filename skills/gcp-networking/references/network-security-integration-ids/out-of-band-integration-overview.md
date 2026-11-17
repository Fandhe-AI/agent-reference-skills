---
source: https://docs.cloud.google.com/network-security-integration/docs/out-of-band/out-of-band-integration-overview
---

# Out-of-band integration overview

Out-of-band integration is Network Security Integration Packet Mirroring: it clones network traffic according to mirroring rules in a firewall policy and sends the copy, GENEVE-encapsulated, to your virtual appliance deployments for deep packet inspection. It captures all packet data, including IP payloads and headers. It is a zonal service that supports regional deployments; cross-zonal traffic is charged if consumer and producer of a mirroring deployment are in different zones, so create a producer deployment in the same zone as the mirroring source.

## Signature / Usage

### Create a mirroring endpoint group (consumer)

```bash
gcloud network-security mirroring-endpoint-groups create \
    my-endpoint-group --project=my-project --location=global \
    --mirroring-deployment-group=my-deployment-group
```

## Options / Props

### Modes

| Feature | Direct mode (default) | Broker mode (Preview) |
|---------|-----------------------|-----------------------|
| Destinations | One producer network | Multiple producer networks |
| Traffic hops | 1 | 2 (consumer to Google-managed broker, then broker to producers) |
| GENEVE metadata | Network ID, Endpoint ID, Profile ID | Network ID, Endpoint ID, Profile ID, Timestamp, Network Stable ID |
| Extra component | none | Mirroring endpoints (Google-managed zonal broker, Preview) |

### Components

| Side | Component | Description |
|------|-----------|-------------|
| Producer | Collector instances behind an internal passthrough Network Load Balancer | The forwarding rule must be configured for Packet Mirroring (`--is-mirroring-collector`); non-mirrored traffic sent to it is dropped. |
| Producer | Mirroring deployment | Zonal; points to the forwarding rule. Collector instances can be anywhere in the region. |
| Producer | Mirroring deployment group | Groups deployments across locations in a project. |
| Consumer | Mirroring endpoint group | Project-level; corresponds to a producer's deployment group. Mode is direct (default) or broker (Preview). |
| Consumer | Mirroring endpoint group association | Links a consumer VPC network to the endpoint group. Without it, mirroring rules are ignored. |
| Consumer | Mirroring endpoint (Preview) | Google-managed zonal broker; one per zone per endpoint group; broker mode only. |

### Roles for mirroring endpoint group associations

| Role | ID |
|------|----|
| Mirroring Endpoint Admin | `roles/networksecurity.mirroringAdmin` |
| Mirroring Endpoint Network Admin | `roles/networksecurity.mirroringEndpointNetworkAdmin` |

### Mirroring rule actions

| Action | Effect |
|--------|--------|
| `MIRROR` | Mirror the flow; stop evaluating lower priority mirroring rules. |
| `DO_NOT_MIRROR` | Don't mirror; stop evaluating lower priority mirroring rules (negative filter). |
| `GOTO_NEXT` | Continue evaluation at the next rule / lower level. Default when no rule matches. |

Firewall policy rule actions are `ALLOW`, `DENY` and `GOTO_NEXT`. Mirroring rules are evaluated by priority, `0` is highest, and each priority must be unique within a policy. Ingress: firewall rules first, blocked packets are not mirrored. Egress: mirroring rules first, then egress firewall rules.

### VPC Packet Mirroring vs Network Security Integration Packet Mirroring

| Attribute | VPC Packet Mirroring | NSI Packet Mirroring |
|-----------|----------------------|----------------------|
| Encapsulation | None | GENEVE |
| Semantics | Per packet | Session based; `mirror` or `do-not-mirror` |
| Filters | src / dst IP, protocols | Same plus destination port ranges |
| Your network appliances support | No | Yes |
| Supported by hierarchical firewall policies | No | No |
| Supported by regional network firewall policies | No | No |
| Supported by global network firewall policies | No | Yes |

NSI Packet Mirroring takes precedence at the workload level: the data plane disregards existing VPC Packet Mirroring configuration (for example ICMP mirroring stops) once an NSI mirroring configuration applies.

### Limitations

- Producer internal load balancer must be an internal passthrough Network Load Balancer with an instance group backend; NEG backends aren't supported.
- Matching packets (original and mirrored) are processed at a slower rate; mirroring isn't recommended for 3rd generation machine families and later.
- Regional network firewall policies don't support Packet Mirroring; mirroring rules don't support source secure tags.
- One forwarding rule can be associated with one mirroring deployment (same project as the load balancer; zone within the load balancer's region).
- A VPC can have at most one mirroring endpoint group association.
- Broker mode (Preview): mirroring endpoint and mirroring deployment must be in the same zone.

## Notes

- Broker mode and mirroring endpoints are Preview ("Pre-GA Offerings Terms" apply; "as is", limited support).
- Don't configure producer and consumer in the same VPC network (mirroring loop). Producer-side: one ingress firewall policy rule allowing GENEVE on UDP port `6081` from the producer subnet gateway address or local subnet range, plus health check probes from the internal passthrough Network Load Balancer.
- Firewall Rules Logging doesn't log mirrored packets. To mirror traffic between Pods on the same GKE node, enable intranode visibility.
- Mirrored traffic contains full payloads; restrict access to collectors and to the roles above.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/mirroring-endpoint-groups/create (gcloud 593.0.0 help). The source page itself has no code.
- Corrected from the official docs: the source writes the flag as `--is_mirroring_collector`; the gcloud 593.0.0 help for `gcloud compute forwarding-rules create` lists it as `--is-mirroring-collector` ("If set, this forwarding rule can be used as a collector for packet mirroring. This can only be specified for forwarding rules with the LOAD_BALANCING_SCHEME set to INTERNAL").
- Source: https://docs.cloud.google.com/network-security-integration/docs/out-of-band/out-of-band-integration-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [nsi-overview.md](./nsi-overview.md)
- [security-profiles-overview.md](./security-profiles-overview.md)
- [security-profile-groups-overview.md](./security-profile-groups-overview.md)
- [nsi-quotas.md](./nsi-quotas.md)
- [ids-overview.md](./ids-overview.md)
