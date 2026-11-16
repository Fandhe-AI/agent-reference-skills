---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/access-control
---

# Access control

Overview of the differences and overlap between Identity and Access Management (IAM) and Kubernetes role-based access control (RBAC) in GKE. RBAC grants granular permissions to objects inside clusters; IAM manages Google Cloud resources (clusters and object types within clusters) at project level and above.

## Signature / Usage

### List the permissions of a GKE IAM role

```bash
gcloud iam roles describe roles/ROLE
```

Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/how-to/iam (the concept page itself has no code).

## Options / Props

### IAM vs Kubernetes RBAC

| Aspect | Kubernetes RBAC | IAM |
|---|---|---|
| Scope | Objects within a Kubernetes cluster and namespace | Google Cloud resources (project / folder / organization level) |
| Permission objects | `ClusterRole` / `Role`; granted with `RoleBinding` | Roles granted to principals in allow policies |
| Granularity | Can be scoped to a specific Kubernetes object or object type, with verbs | No way to grant permissions on specific Kubernetes objects; a role applies across all clusters in the project (or all child projects when applied at folder level) |
| Subjects | Google Cloud user, IAM service account, Kubernetes ServiceAccount, Google Workspace user, Google Workspace Google Group, users authenticated with X509 client certificates | User account, service account, Google Workspace Google Group, Google Workspace domain, Cloud Identity domain |
| Best fit | Primarily GKE, fine-grained permissions for every object and operation | Multiple Google Cloud components, no need for granular Kubernetes-specific permissions |

### IAM policy types

| Type | Purpose |
|---|---|
| Allow policies | Grant roles to principals |
| Deny policies | Prevent principals from using specific IAM permissions regardless of granted roles (project, folder or organization) |

### Recommended predefined roles

| Role | Audience |
|---|---|
| `roles/container.clusterViewer` | DevOps, engineers and application developers who only need to connect to the cluster |
| `roles/container.clusterAdmin` | Platform administrators and cluster operators managing one or more clusters in a project |

## Notes

- IAM and Kubernetes RBAC work together: RBAC controls access at cluster and namespace level, IAM at project level. An entity must have sufficient permissions at either level to work with resources in the cluster.
- Node service accounts must have at least `roles/container.defaultNodeServiceAccount` on the project. By default GKE uses the Compute Engine default service account; best practice is to create a custom service account for nodes with only the permissions GKE needs for system tasks (see https://docs.cloud.google.com/kubernetes-engine/security/configure-node-service-accounts#configure-custom-account).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/access-control (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source for the `gcloud iam roles describe` snippet: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/iam (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [iam.md](./iam.md)
- [role-based-access-control.md](./role-based-access-control.md)
- [rbac-best-practices.md](./rbac-best-practices.md)
- [google-groups-rbac.md](./google-groups-rbac.md)
