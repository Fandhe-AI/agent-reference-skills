---
source: https://docs.cloud.google.com/vpc/docs/legacy
---

# Legacy networks

Legacy networks are not recommended and can no longer be created; many newer Google Cloud features are not supported in them. Use VPC networks instead. Existing legacy networks are unaffected and keep operating.

## Signature / Usage

Borrowed gcloud command for finding existing networks to review (the source has no code):

```bash
gcloud compute networks list
```

## Options / Props

| Aspect | Legacy network | VPC network |
|---|---|---|
| Creation | No longer possible (the `IPv4Range` field is deprecated and unavailable for every project) | Supported |
| Address range | A single global RFC 1918 range, not divisible into subnets; instance IPs are not grouped by region or zone | Divided into regional subnets (zero or more per region) |
| Features | Some networking features unavailable | Full feature set |
| Routes | Starts with two: default route to outside and route to the overall legacy range | — |
| Firewall | User-created networks have a default allow-all egress and deny-all ingress rule | Every VPC network has two implied rules that cannot be removed |

### Replacing a legacy network

| Method | Detail |
|---|---|
| Single-region conversion tool (Preview) via `gcloud` or API | Converts to a custom mode VPC network. All resources must be in a single region (including stopped VMs) or conversion fails. One-way; traffic is not disrupted. The subnet has the same IP range as the whole legacy network, so new subnets need other valid ranges. GKE clusters must be upgraded after conversion. |
| Manual migration | Recreate resources in a VPC network. |

### What happens during conversion

| Resource | Result |
|---|---|
| Legacy network | Converted (not deleted) into a custom mode VPC network; the IPv4 range becomes the primary range of one subnet. Network and subnet keep the original name. |
| Subnet | Created with its subnet route in the region of the VMs; none is created if the network had no resources. |
| VM instances, internal forwarding rules, instance templates (nic0) | Reference the new subnet. |
| Custom static routes, firewall rules (plus two implied rules), VPN tunnels and gateways, Cloud Router, load balancers | Unchanged and keep working. |

## Notes

- Single-region conversion is Preview: subject to the "Pre-GA Offerings Terms"; features are available "as is" and might have limited support. The conversion cannot be reverted, so review it on a disposable network first.
- To move individual VMs out of a legacy network, see the Compute Engine page on migrating a VM between networks.
- The source has no code; the snippet is taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/list (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/vpc/docs/legacy (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc.md](./vpc.md)
- [subnets.md](./subnets.md)
