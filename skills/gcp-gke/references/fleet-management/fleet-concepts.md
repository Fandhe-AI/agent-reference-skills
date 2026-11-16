---
source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-concepts
---

# How fleets work

Fleets are a Google Cloud concept for logically organizing clusters and other resources, so that you can use multi-cluster capabilities and apply consistent policies. This page covers fleet terminology and the core concepts: grouping, sameness, exclusivity, high trust, team scopes and fleet-enabled components.

## Signature / Usage

### Terminology

- Fleet-aware resources: Google Cloud project resources that can be logically grouped and managed as fleets. Only Kubernetes clusters can currently be fleet members.
- Fleet host project: the Google Cloud project the fleet is rooted in. A project can have only a single fleet (or none).

### Sameness

Different types of sameness provide different benefits:

| Sameness property | Lets you... |
|---|---|
| A namespace is considered the same across multiple clusters. | Grant access to users across the clusters; aggregate metrics and logs across the clusters. |
| A combination of namespace and service name is considered the same across multiple clusters. Same-named services in the same namespace use the same label selector. | Route traffic within and across the clusters using Cloud Service Mesh; use GKE multi-cluster Services; use Multi Cluster Ingress and multi-cluster Gateway to target multi-cluster Services. |
| A combination of namespace and service account (identity) is considered the same across multiple clusters. | Write IAM policies once for a set of workloads; write Cloud Service Mesh authorization policies once; authenticate to peers in a mesh using SPIFFE certificates. |

Namespace sameness: a namespace with the same name in different clusters is considered the same by many fleet features. Namespaces are allocated for the entire fleet, not per cluster, so namespace sameness requires consistent namespace ownership across the fleet. Fleet team management lets you create namespaces defined across a subset of member clusters (a team scope) instead.

Identity sameness with fleet Workload Identity Federation: services in a fleet share a common identity when they access external resources. For example, services in the `backend` namespace map to one Google Cloud service account (`back`) that can be authorized once on Cloud Storage, Cloud SQL and so on.

### List fleet memberships

```bash
gcloud container fleet memberships list \
  --project=PROJECT_ID
```

## Options / Props

Which features require sameness:

| Feature | Supports gradual sameness adoption | Namespace sameness | Service sameness | Identity sameness |
|---|---|---|---|---|
| Fleets | N/A | No | No | No |
| Binary Authorization | N/A | No | No | No |
| Inter-node transparent encryption | N/A | No | No | No |
| Fully Qualified Domain Name-based Network Policy | N/A | No | No | No |
| Connect gateway | N/A | No | No | No |
| Config Sync | N/A | No | No | No |
| Policy Controller | N/A | No | No | No |
| GKE Security Posture | N/A | No | No | No |
| Advanced Vulnerability Insights | N/A | No | No | No |
| Compliance Posture | N/A | No | No | No |
| Rollout sequencing | N/A | No | No | No |
| Team management | Yes | Yes | Yes | No |
| Multi Cluster Ingress | Yes | Yes | Yes | Yes |
| Multi Cluster Services | Yes | Yes | Yes | Yes |
| Fleet Workload Identity Federation | No | Yes | Yes | Yes |
| Cloud Service Mesh | No | Yes | Yes | Yes |

## Notes

- Exclusivity: fleet-aware resources can only be members of a single fleet at any time; Google Cloud tools and components enforce this.
- High trust: service, workload identity and mesh identity sameness rely on high trust between fleet members. Clusters protect against blast radius, availability and noisy-neighbor concerns, but are not a strong isolation boundary for policy and governance, because administrators of any member can potentially affect services in other members. Clusters not trusted by the fleet administrator should be placed in their own fleets.
- Because of identity sameness, an untrusted cluster in the fleet can create a `backend` namespace and access managed services as the `backend` of other clusters.
- Team scopes: a team scope subdivides a fleet into groups of clusters for an application team. A cluster can be associated with no teams, one team or multiple teams. Using team scopes to sequence cluster upgrade rollouts requires each cluster to be associated with a single team. A team scope can have explicit fleet namespaces, considered the same across the scope.
- Fleet-enabled components: workload identity pools, Cloud Service Mesh, Config Sync, Policy Controller, Multi Cluster Ingress.
- The source also includes diagrams, which are omitted here. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-creation (the source page has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-concepts (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-creation (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [plan-fleets.md](./plan-fleets.md)
- [fleet-features.md](./fleet-features.md)
- [about-fleet-workload-identity-federation.md](./about-fleet-workload-identity-federation.md)
- [team-management-overview.md](./team-management-overview.md)
