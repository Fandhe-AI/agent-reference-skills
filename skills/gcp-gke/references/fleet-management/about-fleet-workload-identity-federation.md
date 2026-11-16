---
source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/about-fleet-workload-identity-federation
---

# About fleet Workload Identity Federation

Fleet Workload Identity Federation authenticates requests from fleet workloads to Google Cloud APIs. It extends Workload Identity Federation for GKE to all fleet member clusters (including clusters in other projects or outside Google Cloud) through a fleet-wide Google-managed workload identity pool.

## Signature / Usage

### Principal identifier syntax

```text
PREFIX://iam.googleapis.com/projects/FLEET_PROJECT_NUMBER/locations/global/workloadIdentityPools/WORKLOAD_IDENTITY_POOL_NAME/SELECTOR
```

### Supported principal identifiers

All Pods that use a specific Kubernetes ServiceAccount, selected by name:

```text
principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/NAMESPACE/sa/SERVICEACCOUNT
```

Selected by UID:

```text
principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/kubernetes.serviceaccount.uid/SERVICEACCOUNT_UID
```

## Options / Props

| Field | Description |
|---|---|
| `PREFIX` | `principal` or `principalSet`, depending on the Kubernetes resource selected by `SELECTOR` |
| `FLEET_PROJECT_NUMBER` / `PROJECT_NUMBER` | Numerical project number of the fleet host project (not the project ID) |
| `PROJECT_ID` / `FLEET_HOST_PROJECT_ID` | Project ID of the fleet host project |
| `WORKLOAD_IDENTITY_POOL_NAME` | Google-managed pool: `FLEET_HOST_PROJECT_ID.svc.id.goog`. Self-managed pool (Preview): `POOL_NAME.global.POOL_HOST_PROJECT_NUMBER.workload.id.goog` |
| `NAMESPACE`, `SERVICEACCOUNT` | Kubernetes namespace and ServiceAccount name |
| `SERVICEACCOUNT_UID` | UID of the `ServiceAccount` object in the API server |

Identity sameness models:

| Model | Description |
|---|---|
| Implicit identity sameness | All workloads use the Google-managed pool; every workload sharing a principal identifier shares access |
| Explicit identity sameness (Preview) | A self-managed pool provides identities only to workloads in clusters configured to use it for a specific fleet namespace |

## Notes

- Credential flow: (1) deploy a ConfigMap in the namespace holding the workload identity pool, identity provider and ServiceAccount token path (it works as the ADC file); (2) create an IAM allow policy granting access to the principal identifier; (3) in the Pod set `GOOGLE_APPLICATION_CREDENTIALS` to the ConfigMap mount path, add a projected volume containing the ServiceAccount token and the ConfigMap, and mount it in the container. At call time ADC exchanges the ServiceAccount JWT for a short-lived federated access token from Security Token Service, and IAM authorizes the principal identifier.
- Identity sameness: principals sharing an identifier across the entire fleet, regardless of cluster project, are treated as the same. Granting a role to the `default` ServiceAccount in the `backend` namespace gives every such workload in the fleet the same access.
- In mixed-trust environments, standalone clusters in the fleet host project also use the host project's Google-managed pool, so implicit sameness can cause unintended access. Use team scopes and fleet namespaces, and optionally a self-managed pool (Preview, subject to Pre-GA Offerings Terms). Use the Google-managed pool only if every cluster has a similar trust level. Self-managed pools suit multiple trust levels in a fleet or project, and team-scope best practices.
- Lightweight memberships cannot use fleet Workload Identity Federation. The Connect Agent on some cluster types also uses it, and Cloud Service Mesh requires it for cross-project use.
- Never grant `roles/owner` or `roles/editor` to a principal identifier; keep `PROJECT_NUMBER` (digits) and `PROJECT_ID` distinct.
- Workload Identity Federation for GKE and fleet Workload Identity Federation are distinct from Workload Identity Federation for external workloads (AWS / Azure / OIDC), which is in `gcp-foundation`.
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/about-fleet-workload-identity-federation (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [fleet-concepts.md](./fleet-concepts.md)
- [register-gke.md](./register-gke.md)
- [team-management-overview.md](./team-management-overview.md)
