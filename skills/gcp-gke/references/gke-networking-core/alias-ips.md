---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/alias-ips
---

# About VPC-native clusters

VPC-native clusters make Pod IP addresses natively routable within the VPC network. IPv4 and dual-stack clusters use alias IP ranges; single-stack IPv6 clusters (Preview) allocate node and Pod subranges directly from the subnetwork CIDR. VPC-native is the default network mode for all new clusters. This page covers IP range allocation, sizing, sharing and dual-stack networking.

## Signature / Usage

### Share a secondary range between clusters

Pass an existing Pod secondary range by name with `--cluster-secondary-range-name` on the command line (not possible in the console). For a Services range, no separate sharing flag is required: give each cluster the same user-managed subnet secondary range as its Services range (`--services-secondary-range-name`); user-managed ranges only. Shared Services ranges must not match this pattern:

```text
^gke-.*-services-[abcdef0-9]{8}
```

### Range exhaustion error

This message means the subnet primary range or the Pod secondary range is exhausted:

```text
Instance [node name] creation failed: IP space of [cluster subnet] is
exhausted
```

Fix by expanding the primary subnet, or adding Pod ranges with discontiguous multi-Pod CIDR.

## Options / Props

### Address allocation

| Object | Source |
| --- | --- |
| Nodes | Subnet primary IPv4 range (4 addresses reserved; first two and last two) |
| Pods (IPv4) | One or more subnet secondary ranges; default `/24` alias range (256 addresses) per node for up to 110 Pods |
| Services (IPv4) | GKE-managed `34.118.224.0/20` (Autopilot 1.27+ and Standard 1.29+), or a user subnet secondary range separate from Pods |
| Nodes / Pods (dual-stack IPv6) | Node `/96` range; node IP is first `/128`; Pods from a `/112` per node |
| Services (IPv6) | `2600:2D00:0:4::0:0/64` (private; not routable on the internet) |
| Single-stack IPv6 (Preview) | Each node gets a `/96` from the subnet `/64`; Pods get a `/112` subset |

### Flags

| Flag | Purpose |
| --- | --- |
| `--services-ipv4-cidr` | Custom Services range; a size only (for example `/22`) still draws from the GKE-managed range |
| `--services-secondary-range-name` | Use a named user-managed Services range |
| `--cluster-ipv4-cidr=/17` | Size only; GKE selects an available Pod secondary range |
| `--cluster-secondary-range-name` | Use (and share) an existing named Pod secondary range |
| `--private-endpoint-subnetwork` | Provision the Private Service Connect control plane endpoint from a custom subnet |
| `--ipv6-access-type` | `EXTERNAL`: external routable IPv6 from `2600:1900/28`. `INTERNAL`: from `fd20::/20`, not internet-routable; Cloud NAT does not support IPv6 |

### Max nodes by subnet primary range

| Primary range | Default subnet | PSC cluster without `private-endpoint-subnetwork` |
| --- | --- | --- |
| /29 (minimum) | 4 | 3 |
| /28 | 12 | 11 |
| /27 | 28 | 27 |
| /26 | 60 | 59 |
| /25 | 124 | 123 |
| /24 | 252 | 251 |
| /23 | 508 | 507 |
| /22 | 1,020 | 1,019 |
| /21 | 2,044 | 2,043 |
| /20 (auto mode default) | 4,092 | 4,091 |
| /19 | 8,188 | 8,187 |
| /9 (maximum) | 8,388,604 | 8,388,603 |

Formulas: `N = 2^(32-S) - 4` (S between 9 and 29); `S = 32 - ceil(log2(N+4))`; for PSC clusters without the flag reduce N by 1.

### Max Pods from a Pod CIDR

`M = 31 - ceil(log2(Q))`, `HM = 32 - M`, `HD = 32 - DS`, `MN = 2^(HD-HM)`, `MP = MN * Q` (Q = max Pods per node). The source says "For Autopilot clusters, the value of `Q` is fixed at 32"; on Autopilot 1.28 and later the maximum Pods per node is set dynamically between 8 and 256, so use the actual value for your nodes (see Notes). Example: `/17` with Q=32 gives M = 26, HM = 6, HD = 15, MN = 2^(15-6) = 512 nodes and MP = 512 * 32 = 16,384 Pods.

### Max Services by Services secondary range

| Range | Services |
| --- | --- |
| /28 (smallest, user-managed) | 16 |
| /27 (smallest, GKE-managed) | 32 |
| /26 | 64 |
| /25 | 128 |
| /24 | 256 |
| /23 | 512 |
| /22 | 1,024 |
| /21 | 2,048 |
| /20 (GKE-managed default) | 4,096 |
| /19 | 8,192 |
| /18 | 16,384 |
| /17 | 32,768 |
| /16 (largest) | 65,536 |

### Dual-stack restrictions

- Only VPC-native clusters with GKE Dataplane V2; only custom-mode VPC subnets; GKE 1.24 or later.
- No single-stack IPv6 Pods/nodes in dual-stack clusters; no Private Google Access over IPv6; Windows nodes do not support IPv6.
- Extra memory per node. IPv6 (AAAA) with Cloud DNS requires GKE 1.26.0-gke.2200 or later.
- Dual-stack Services: `ClusterIP`, `NodePort`; `LoadBalancer` on new clusters running 1.29 or later. Set `ipFamilies` and `ipFamilyPolicy`.

## Notes

- Pod range smaller than `/21` in user-managed mode risks exhaustion; the smallest range without discontiguous multi-Pod CIDR is `/28` (1 node, max 8 Pods).
- Pod ranges cannot be shrunk; subnet primary range can be expanded but not reduced. If the cluster uses authorized networks, add the expanded range. The Services secondary range cannot change after creation.
- Shared VPC: secondary ranges cannot be managed by GKE; a Network Admin in the host project must create the subnet and ranges first.
- GKE-managed and additional Pod ranges are not shareable. Sharing a Services range is not supported with VPC-scope Cloud DNS for GKE. Shared ranges let one cluster starve the others.
- Corrected from the official docs: the source's sharing section says "To share a secondary IP address range for services, pass it on the command line with `--cluster-secondary-range`", but gcloud has no `--cluster-secondary-range` flag and `--cluster-secondary-range-name` sets the Pod range (`gcloud container clusters create --help`, gcloud 593.0.0, retrieved 2026-11-14), and the same page states "There is no separate configuration flag required to share a common IPv4 address range for Services" — use the same range with `--services-secondary-range-name` on each cluster. The Pod range sharing flag is written here as `--cluster-secondary-range-name` for the same reason.
- Source inconsistency: this page fixes Autopilot `Q` at 32, while the quotas page says Autopilot Pods per node are "Set dynamically between 8 and 256; 32 for versions earlier than 1.28" (see quotas.md). The `Q` = 32 calculation applies to Autopilot clusters earlier than 1.28; on later versions compute with the Pods-per-node value your nodes actually use.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/alias-ips (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- The source has no executable code; the fenced blocks are the verbatim regular expression and error text from the page.

## Related

- [network-isolation.md](./network-isolation.md)
- [dataplane-v2.md](./dataplane-v2.md)
- [kube-dns.md](./kube-dns.md)
