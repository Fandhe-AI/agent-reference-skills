---
source: https://docs.cloud.google.com/firewall/docs/about-firewalls
---

# Cloud NGFW overview

Cloud Next Generation Firewall (Cloud NGFW) is a distributed cloud firewall service that provides stateful inspection and Layer 7 application control for north-south traffic (entering or leaving a VPC network) and east-west traffic (within VPC networks). Enterprise-tier features add intrusion detection and prevention, Advanced malware sandbox (WildFire) and URL filtering.

## Signature / Usage

### Create a rule in a network firewall policy

Rules live in hierarchical, global network or regional network firewall policies. The two examples below create a priority 10 rule in a global policy and in a regional policy (the regional one uses the default `compute/region` property or `--firewall-policy-region`).

Adapted (not in the official docs): `--layer4-configs=tcp:80` and `--src-ip-ranges=192.0.2.0/24` are added because gcloud 593.0.0 rejects the help example ("argument --layer4-configs: Must be specified") and an ingress rule needs a source range or secure tag; replace the documentation range with your own source range.

```bash
gcloud compute network-firewall-policies rules create 10 \
  --firewall-policy=my-policy --action=allow \
  --layer4-configs=tcp:80 --src-ip-ranges=192.0.2.0/24 \
  --description="example rule" --global-firewall-policy
```

```bash
gcloud compute network-firewall-policies rules create 10 \
  --firewall-policy=my-policy --action=allow \
  --layer4-configs=tcp:80 --src-ip-ranges=192.0.2.0/24 \
  --description="example rule"
```

## Options / Props

### Key features

| Feature | Description |
|---|---|
| Distributed firewall service | Applies firewall rules to VM instances, VM-based resources and supported load balancers in a VPC network to allow traffic, deny traffic or send traffic to inspection. |
| Global and regional network firewall policies | Group rules into policy objects applied across multiple VPC networks, globally or within a region. |
| Hierarchical firewall policies | Group rules into policy objects applied across the organization or to specific folders. |
| Multi-layer security | Controls at Layer 3, Layer 4 and Layer 7. |
| Micro-segmentation | Secure tags enable identity-based rules for internal and external traffic. |
| Load balancer integration | Applies to the managed Envoy proxies behind internal Application Load Balancers and internal proxy Network Load Balancers. Layer 3 / Layer 4 filtering for both types; Layer 7 filtering (Preview) only for cross-region internal Application Load Balancers. Internal proxy Network Load Balancers don't support Layer 7 inspection. |

### Tiers

| Tier | Summary |
|---|---|
| Cloud NGFW Essentials | Foundational tier: rules on IP ranges, ports and protocols. Offered at no cost. |
| Cloud NGFW Standard | Extends Essentials with FQDN objects and threat intelligence. |
| Cloud NGFW Enterprise | Layer 7 security: URL filtering, Advanced malware sandbox, intrusion detection and prevention. |

### Supported VPC networks

| Network | Supported firewall policies |
|---|---|
| Regular VPC network | Global network, regional network and hierarchical firewall policies; also VPC firewall rules. |
| Remote Direct Memory Access (RDMA) network | Regional network firewall policies. |

### Supported Envoy-based load balancers

| Policy type | Tier | Supported load balancers |
|---|---|---|
| Global network firewall policies | Essentials and Standard | Regional internal Application Load Balancers; cross-region internal Application Load Balancers; regional internal proxy Network Load Balancers; cross-region internal proxy Network Load Balancers |
| Global network firewall policies | Enterprise | Cross-region internal Application Load Balancers (Preview) |
| Regional network firewall policies | Essentials and Standard | Regional internal Application Load Balancers; cross-region internal Application Load Balancers; regional internal proxy Network Load Balancers; cross-region internal proxy Network Load Balancers |
| Regional network firewall policies | Enterprise | Not supported |
| Hierarchical firewall policies | All tiers | Not supported |
| VPC firewall rules | All tiers | Not supported |

## Notes

- Network firewall policy and VPC firewall rule resources are machine-generated `gcloud compute ...` pages; the full flag list is in the `gcp-compute` skill. Cloud Armor and VPC Service Controls are in `gcp-security` (planned).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/rules/create (gcloud 593.0.0 help); the source page has no code block.
- Adapted from the official docs: the help example for `network-firewall-policies rules create` omitted the required `--layer4-configs` and, for an ingress rule, `--src-ip-ranges` / `--src-secure-tags`; `--layer4-configs=tcp:80 --src-ip-ranges=192.0.2.0/24` was added.
- Source: https://docs.cloud.google.com/firewall/docs/about-firewalls (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [ngfw-tiers.md](./ngfw-tiers.md)
- [tags-firewalls-overview.md](./tags-firewalls-overview.md)
- [about-firewall-endpoints.md](./about-firewall-endpoints.md)
- [quotas.md](./quotas.md)
