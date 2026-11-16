---
source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-concepts/plan-fleets
---

# Plan fleet resources

Practical guidance on organizing clusters into fleets, for new clusters and for existing clusters. The patterns work for many organizations but are not the only way; keep the number of fleets as small as necessary.

## Signature / Usage

### Audit existing clusters

Cloud Asset Inventory is one way to search an organization for Kubernetes cluster resources. After fleets are identified, create a new project per fleet, create a fleet in each project, and create and register clusters to the intended fleet.

```bash
gcloud container fleet memberships list \
  --project=PROJECT_ID
```

### Planning questions

- Are the resources related to one another? Resources with heavy cross-service communication, or in the same deployment environment (for example production), should be managed together.
- Who administers the resources? Unified (or at least mutually trusted) control is crucial to fleet integrity.

### Grouping patterns

- Business units: separate fleets if two business units' workloads (for example auditing and trading in a bank) cannot communicate for regulatory reasons. If units exist only for cost accounting with a common IT team, consider one fleet.
- Environment: a fleet should only contain clusters from one environment (typically dev, non-production/staging, production).
- Redundant instances: place clusters running the same application in multiple regions in the same fleet unless regulation requires otherwise.
- Cluster owners: if you use features that require sameness, aim for the same small set of admins across clusters (IAM `container.admin` and RBAC admin ClusterRoleBinding). Clusters whose admins do not mutually trust each other should not share a fleet.
- VPC perimeters: clusters within a VPC perimeter (for example a Shared VPC with VPC Service Controls) can be in a fleet together. Put restricted and non-restricted Shared VPCs in separate fleets, and plan VPC Service Controls and non-VPC Service Controls versions of each fleet in each environment (or at least prod and the environment before prod).

## Options / Props

| Limit | Value |
|---|---|
| Fleets per Google Cloud project | 1 (or none); the fleet can include clusters from multiple projects |
| Fleets per cluster | A cluster can be a member of only one fleet at a time |
| Clusters in a project | All clusters in a project must be in the same fleet, or not in a fleet; if a project already contains fleet members you cannot register a cluster from it to a different fleet |
| Default clusters per fleet | 250 (a higher limit can be requested) |
| Private clusters per VPC network | 75 |

## Notes

- If you plan to use Multi Cluster Ingress or multi-cluster Gateway, review the limits for `MultiClusterIngress` and `MultiClusterService` resources in a project, and review Compute Engine quotas and limits.
- Some fleet features have specific VPC requirements, for example all clusters within the same VPC network.
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-creation (the source page has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-concepts/plan-fleets (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-creation (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [fleet-concepts.md](./fleet-concepts.md)
- [fleet-features.md](./fleet-features.md)
- [fleet-creation.md](./fleet-creation.md)
- [quotas.md](./quotas.md)
