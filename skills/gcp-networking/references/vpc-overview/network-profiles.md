---
source: https://docs.cloud.google.com/vpc/docs/network-profiles
---

# Network profiles for specific use cases

A network profile defines a specific use case for a VPC network. A network created with a profile behaves differently from a regular VPC network, and the only use case currently described is RDMA NICs for AI workloads.

## Signature / Usage

```bash
gcloud compute network-profiles list
```

## Options / Props

| Property | Description |
|---|---|
| `name` | Resource name of the profile; always starts with a location (region or zone). |
| `description` | Description of the profile. |
| `location` | Region or zone of the profile. |
| `features` | Features the profile enables and disables. |

| Rule | Detail |
|---|---|
| Definition | Predefined by Google Cloud; you cannot create a profile or modify its properties. |
| Association | Only when you create the VPC network; the profile cannot be changed afterwards. Networks without a profile are regular VPC networks. |
| Location | Resources using a network with a profile must be in the profile's location. |

| Available profile | Purpose |
|---|---|
| No profile | Regular VPC network. |
| RDMA network profiles | Configure a VPC network to support RDMA NICs; enables zonal workloads that depend on RDMA connectivity, such as AI workloads. |

## Notes

- A profile enables features not available in regular networks (for example RDMA NICs) and limits feature combinations incompatible with its use case. The default MTU can differ from the regular 1,460 bytes.
- The source has no code; the snippet is taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-profiles/list (gcloud 593.0.0 help). Full flags are in the `gcp-compute` skill. AI Hypercomputer docs cover running AI workloads.
- Source: https://docs.cloud.google.com/vpc/docs/network-profiles (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc.md](./vpc.md)
- [mtu.md](./mtu.md)
