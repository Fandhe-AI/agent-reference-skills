---
source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-concepts/fleet-features
---

# Plan fleet features

Guidance on choosing and adopting fleet-enabled features, including which are low risk, which assume sameness, fleet-level defaults, and per-feature cluster, project and VPC requirements.

## Signature / Usage

### Audit before enabling sameness-based features

All fleet features (except basic fleet observability) are opt-in; adding an existing cluster to a fleet does not change its configuration. Check namespaces before enabling features that assume sameness. For each set of same-named namespaces across clusters, check that:

- in every cluster the same RBAC rules exist and the namespace principals are allowed access;
- the set of images used by Pods (minus hash/tag) is the same;
- the set of Secrets used by the Pods is identical.

Look out for ad hoc use of the `default` namespace for different purposes. For service sameness (Cloud Service Mesh, Multi Cluster Ingress, multi-cluster Gateway), make sure logically different services do not share the same `[namespace, name]` pair (for example `payments/api`).

To see which fleet features are enabled in the fleet host project:

```bash
gcloud container fleet features list
```

## Options / Props

Adoption groups:

| Group | Features |
|---|---|
| Ambient (no sameness, no effect on clusters) | Fleet-based rollout sequencing, fleet observability, security posture |
| Installed per cluster, sameness only for optional selectors | Config Sync (namespace and team scope selectors), Binary Authorization (scoped rules), Policy Controller (excluding namespaces from enforcement) |
| Advanced multi-cluster (require sameness, affect multiple clusters) | Fleet Workload Identity Federation, Cloud Service Mesh, multi-cluster Gateway, Multi Cluster Ingress, fleet team management |

Feature requirements:

| Feature | Cluster types | Project requirements | VPC requirements |
|---|---|---|---|
| Config Sync | All GKE supported clusters | None | None |
| Policy Controller | All GKE supported clusters | None | None |
| Cloud Service Mesh | See Cloud Service Mesh managed limitations | All clusters used with Cloud Service Mesh in the same project must be registered to the same fleet | GKE clusters must be in the same VPC network |
| Multi-cluster Services (MCS) | GKE on Google Cloud | None | See MCS on Shared VPC |
| Multi Cluster Ingress and multi-cluster Gateway | GKE on Google Cloud | Ingress/Gateway resources, GKE clusters, and fleet must be in the same project | Ingress/Gateway resources and GKE clusters must be in the same VPC network |
| Workload identity pools | Optimized for GKE on Google Cloud and Google Distributed Cloud on VMware; other clusters need additional setup | None | None |
| Binary Authorization | GKE on Google Cloud, Google Distributed Cloud on VMware and on bare metal | None | None |
| Advanced Vulnerability Insights, Security Posture, Compliance Posture, Fleet resource utilization metrics, Pod FQDN Network Policies, Inter-node transparent encryption, Rollout Sequencing | GKE on Google Cloud | None | None |
| Fleet logging, Connect gateway, Fleet team management | All | None | None |
| Config Controller | Not applicable | None | None |

## Notes

- Fleet-level defaults (Cloud Service Mesh, Config Sync, Policy Controller) apply automatically only to new clusters added to the fleet at cluster creation time. Existing clusters are not affected, even if already in the fleet; you can apply defaults to them later.
- Fleet-wide Workload Identity Federation uses one workload identity pool for the entire fleet, even across projects, with implicit identity, namespace and service sameness. In multi-project fleets, or when the fleet host project mixes fleet and non-fleet clusters, it has access-control considerations beyond Workload Identity Federation for GKE. This is distinct from Workload Identity Federation for external workloads (AWS / Azure / OIDC), covered by `gcp-foundation`.
- VPC: features needing a single VPC imply one fleet per VPC. Without such features, multiple VPCs can share a fleet (including hub-and-spoke topologies); this can leave fleets with one cluster.
- Multi-cluster networking: the gateway controller cannot span projects, so clusters using Multi Cluster Ingress or multi-cluster Gateway must be in the same project, fleet and VPC. For multi-project fleets use single-cluster Gateways and direct traffic (for example by DNS). These are Kubernetes Gateway API resources on GKE, not an HTTP framework router and not Cloud Load Balancing configured directly (planned `gcp-networking`).
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/manage-features (the source page has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/manage-features (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-concepts/fleet-features (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [fleet-concepts.md](./fleet-concepts.md)
- [plan-fleets.md](./plan-fleets.md)
- [manage-features.md](./manage-features.md)
- [about-fleet-workload-identity-federation.md](./about-fleet-workload-identity-federation.md)
