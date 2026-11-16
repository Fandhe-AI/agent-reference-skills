---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control
---

# Configure role-based access control

Authorize actions on GKE cluster resources with built-in Kubernetes RBAC (enabled by default): define Roles and ClusterRoles, bind them to users, groups and service accounts, verify access, troubleshoot, and know the limitations.

## Signature / Usage

### Define permissions with a Role

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: accounting
  name: pod-reader
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

### Assign the Role with a RoleBinding

```yaml
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: pod-reader-binding
  namespace: accounting
subjects:
# Google Cloud user account
- kind: User
  name: janedoe@example.com
# Kubernetes service account
- kind: ServiceAccount
  name: johndoe
# IAM service account
- kind: User
  name: test-account@test-project.iam.gserviceaccount.com
# Google Group
- kind: Group
  name: accounting-group@example.com
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

### Inspect the discovery ClusterRole

```bash
kubectl get clusterroles system:discovery -o yaml
```

### Forbidden error for service accounts on VMs (missing `userinfo-email` scope)

Create a VM with the scope:

```bash
gcloud compute instances create INSTANCE_NAME \
    --service-account SERVICE_ACCOUNT_EMAIL \
    --scopes userinfo-email
```

Or bind by the service account's unique ID. First get the ID:

```bash
gcloud iam service-accounts describe SERVICE_ACCOUNT_EMAIL
```

Then create the binding:

```bash
kubectl create clusterrolebinding CLUSTERROLEBINDING_NAME \
    --clusterrole cluster-admin \
    --user UNIQUE_ID
```

## Options / Props

| Object | Scope / purpose |
|---|---|
| `ClusterRole` | Cluster-level grouping of resources and allowed operations; bind with `RoleBinding` or `ClusterRoleBinding` |
| `Role` | Namespaced grouping of resources and operations; bind with `RoleBinding` |
| `ClusterRoleBinding` | Assign a `ClusterRole` for all namespaces in the cluster |
| `RoleBinding` | Assign a `Role` or `ClusterRole` within a specific namespace |

### Subject types

| Subject type | `kind` | `name` |
|---|---|---|
| Google Cloud user account | `User` | Google Cloud registered email address |
| Kubernetes service account | `ServiceAccount` | Name of the Kubernetes ServiceAccount object in the cluster |
| IAM service account | `User` | Automatically generated IAM service account email address |
| Google Group on a verified domain | `Group` | Email of a Google Workspace Group that is a member of the `gke-security-groups` group |

## Notes

- GKE checks for an RBAC policy first; if none exists it checks IAM permissions. Users are authorized if they have sufficient permissions under either. Google Cloud users have no RoleBindings by default.
- Minimum IAM permission for users: `container.clusters.get` in the cluster's project (included in `container.clusterViewer`). It lets users authenticate to clusters but does not authorize actions inside them.
- RBAC roles are additive; there are no deny rules. Using a `RoleBinding` to bind a `ClusterRole` limits access to the namespace in the binding; use a `ClusterRoleBinding` for all namespaces. A `ClusterRole` can also cover cluster-scoped resources (nodes), non-resource endpoints (`/healthz`) and namespaced resources across all namespaces.
- You cannot create a Role granting permissions you do not hold; being bound to the Kubernetes `cluster-admin` ClusterRole through RBAC is sufficient (see the source inconsistency below). Creating or updating a role needs the same permissions or the `escalate` verb; a role binding needs the same permissions with the same scope or the `bind` verb. Permissions granted only through IAM do not satisfy this check (Forbidden: "attempting to grant RBAC permissions not currently held"); grant them via RBAC instead. GKE does not recommend granting `escalate` / `bind` because the caller can then grant any permission to any role.
- `kubectl auth can-i` without `--as` is authorized by IAM; with `--as` it is authorized by Kubernetes RBAC.
- Troubleshooting: the Admin activity audit log (enabled by default) records an `RBAC DENY` error with the user's implicit and explicit groups; `google groups` appears when Google Groups for RBAC is used.
- Authenticated requests are in `system:authenticated`, others in `system:unauthenticated`. `system:basic-user` allows `SelfSubjectAccessReviews`; `system:discovery` reads discovery APIs (may reveal CRDs); anonymous users get `system:public-info-viewer` (read-only `/healthz` and `/version`).
- The `clusterrolebinding ... --clusterrole cluster-admin --user UNIQUE_ID` example grants full cluster-admin to that identity cluster-wide; use it only for the service account you intend to fully trust and try it on a disposable cluster first. Never bind `cluster-admin` to `system:authenticated`, `system:anonymous` or all service accounts (see [rbac-best-practices.md](./rbac-best-practices.md)).
- Many apparent authorization failures are authentication failures (see https://docs.cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl#authentication).
- Source inconsistency: the source says "If you have been granted the `cluster-admin` IAM role, this is sufficient", but `cluster-admin` is a Kubernetes ClusterRole (the GKE IAM roles are `roles/container.*`, for example `roles/container.clusterAdmin`), and the same page says permissions granted only through IAM do not satisfy this check. This page describes it as an RBAC binding to the `cluster-admin` ClusterRole.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [iam.md](./iam.md)
- [google-groups-rbac.md](./google-groups-rbac.md)
- [rbac-best-practices.md](./rbac-best-practices.md)
