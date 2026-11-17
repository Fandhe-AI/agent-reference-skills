---
source: https://docs.cloud.google.com/intrusion-detection-system/docs/best-practice
---

# Best practices for Cloud IDS

Guidance for deploying Cloud IDS endpoints, attaching packet mirroring policies and controlling cost.

## Signature / Usage

### Mirror only internet-bound traffic of tagged VMs

Example from the source: VPC `vpc-x` uses `10.0.0.0/8`; only internet-facing VMs in `subnet-x` tagged `tag-x` need inspection. Negation isn't supported by packet mirroring, so the CIDR list covers everything except `10.0.0.0/8`.

Adapted (not in the official docs): added the missing `\` line continuations, wrote `--filter-cidr-ranges`, `--mirrored-subnets` and `--mirrored-tags` as comma-separated lists without brackets or spaces (the brackets are gcloud help notation and would break the shell command), and added the required `--collector-ilb` flag, and removed `--mirrored-subnets=subnet-x`: mirrored subnets and mirrored tags each add VMs to the policy (all VMs in the subnet, plus all VMs with the tag), so keeping both would also mirror the untagged VMs of `subnet-x`. Use `tag-x` only on the internet-facing VMs of `subnet-x`, or list the VMs with `--mirrored-instances` instead.

```bash
gcloud compute packet-mirrorings create NAME \
    --network=vpc-x \
    --filter-cidr-ranges=128.0.0.0/1,64.0.0.0/2,32.0.0.0/3,16.0.0.0/4,0.0.0.0/5,12.0.0.0/6,8.0.0.0/7,11.0.0.0/8 \
    --mirrored-tags=tag-x \
    --collector-ilb=ENDPOINT_FORWARDING_RULE \
    --region=REGION
```

Replace `NAME` with the packet mirroring policy name, `ENDPOINT_FORWARDING_RULE` with the `endpoint_forwarding_rule` URL of the Cloud IDS endpoint (see configuring-ids.md) and `REGION` with its region. The full flag list is in the `gcp-compute` skill.

## Options / Props

| Topic | Recommendation |
|-------|----------------|
| Endpoints | Create an IDS endpoint in each region you monitor; multiple per region allowed. |
| Creation time | Allow up to 20 minutes for Cloud IDS to create and configure firewalls. |
| Severity | Chosen at creation; `informational` recommended for maximum visibility. |
| Capacity | 5 Gbps inspection per endpoint, spikes up to 17 Gbps; one endpoint per 5 Gbps of throughput. |
| Console mirroring | On the Packet mirroring page enable **Allow both ingress and egress traffic**; on the Cloud IDS page it is enabled automatically. |
| Policies | Attach more than one packet mirroring policy for multiple source types (subnets, instances, network tags); only subnets in the same region as the endpoint can be mirrored. |
| Subnets | Choose only the subnets whose traffic you want to mirror. |

## Notes

- Cost: Cloud IDS has a fixed cost per endpoint and a variable cost on inspected traffic volume. Mirroring all VPC traffic can produce unexpectedly high bills; start with critical assets, select VPCs, regions, subnets and flows deliberately, and use packet mirroring filters. Prices are on the Cloud IDS pricing page.
- Corrected from the official docs: the source command had no `\` line continuations, wrote `--filter-cidr-ranges=[128.0.0.0/1, 64.0.0.0/2, ...]`, `--mirrored-subnets=[subnet-x]`, `--mirrored-tags=[tag-x]` with brackets and spaces, and omitted `--collector-ilb`, which `gcloud compute packet-mirrorings create` requires (SYNOPSIS: `gcloud compute packet-mirrorings create NAME --collector-ilb=COLLECTOR_ILB --network=NETWORK ...`; configuring-ids.md passes it as `--collector-ilb=ENDPOINT_FORWARDING_RULE`).
- Mirroring all or broad traffic exposes full payloads to the endpoint; try the policy on a disposable test VPC network first.
- Corrected from the official docs: the source command passes both `--mirrored-subnets=[subnet-x]` and `--mirrored-tags=[tag-x]` for "only internet-facing VMs in subnet-x tagged tag-x". The Compute Engine API (`PacketMirroringMirroredResourceInfo`) defines `subnetworks` as "A set of subnetworks for which traffic from/to all VM instances will be mirrored" and `tags` as "Traffic from/to all VM instances that have one or more of these tags will be mirrored", so the two select a union, not an intersection; the example keeps only `--mirrored-tags`.
- Source: https://docs.cloud.google.com/intrusion-detection-system/docs/best-practice (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [ids-overview.md](./ids-overview.md)
- [configuring-ids.md](./configuring-ids.md)
