---
source: https://docs.cloud.google.com/network-security-integration/docs/nsi-overview
---

# Network Security Integration overview

Network Security Integration lets you integrate network security appliance VMs, including VMs running packet inspection and firewall software, into a VPC network without changing routes in the VPC network. It uses the Generic Network Virtualization Encapsulation (GENEVE) protocol to deliver original packets and metadata to the appliance VMs from one or more VPC networks, based on firewall rules that you create.

## Signature / Usage

### Create a producer intercept deployment group

```bash
gcloud network-security intercept-deployment-groups create \
    my-deployment-group --project=my-project --location=global \
    --network=my-network
```

## Options / Props

### Integration types

| Type | Behavior |
|------|----------|
| In-band | Routes packets to network appliance VMs for inspection; the appliance decides whether to allow or block the packets, so threats can be blocked before the traffic reaches its destination. Supports the direct internet egress deployment model for internet-bound packets. |
| Out-of-band | Routes a copy of packets to network appliance VMs for analysis, without affecting the original traffic flow. |

### Producer and consumer model

| Side | Contains | Key resources |
|------|----------|---------------|
| Producer | Network appliance VMs that provide traffic inspection and monitoring. One or more zonal deployments; each zonal deployment is an internal passthrough Network Load Balancer whose backend VMs are appliances you manage. | Zonal deployments, grouped into a single deployment group |
| Consumer | Google Cloud VMs whose traffic is secured or monitored. | An endpoint group (references the producer's deployment group) and rules in a global network firewall policy, or a hierarchical firewall policy for in-band integration |

| Producer and consumer model |
|---|
| This overview says consumer firewall rules use the `apply_security_profile_group` action; that is the in-band (intercept) case. For out-of-band integration the consumer uses mirroring rules whose actions are `MIRROR`, `DO_NOT_MIRROR` and `GOTO_NEXT` (see out-of-band-integration-overview.md). Rules can match traffic by multiple attributes such as IP addresses or IP ranges, and secure tags. |
| Depending on the configuration, Network Security Integration either intercepts or mirrors the traffic from one or more consumer networks, encapsulates it with GENEVE and sends it to the producer's appliances. |

## Notes

- Producer and consumer can be in the same organization (Figure 1 in the source) or in different projects.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/intercept-deployment-groups/create (gcloud 593.0.0 help). The source page itself has no code. The full flag list for `gcloud compute ...` resources is in the `gcp-compute` skill; Cloud NGFW firewall policies are covered in the `firewall` categories of this skill.
- Creating or deleting deployment groups affects traffic inspection for consumers; try on a disposable resource first.
- Clarified from the official docs: the overview says "These firewall rules use the `apply_security_profile_group` action", while the out-of-band integration overview (https://docs.cloud.google.com/network-security-integration/docs/out-of-band/out-of-band-integration-overview, retrieved 2026-11-17) says mirroring rules have the actions `MIRROR` ("permits mirroring of the traffic flow"), `DO_NOT_MIRROR` and `GOTO_NEXT`.
- Source: https://docs.cloud.google.com/network-security-integration/docs/nsi-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [in-band-integration-overview.md](./in-band-integration-overview.md)
- [out-of-band-integration-overview.md](./out-of-band-integration-overview.md)
- [security-profiles-overview.md](./security-profiles-overview.md)
- [security-profile-groups-overview.md](./security-profile-groups-overview.md)
- [nsi-quotas.md](./nsi-quotas.md)
