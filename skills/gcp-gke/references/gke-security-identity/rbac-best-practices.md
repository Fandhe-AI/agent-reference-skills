---
source: https://docs.cloud.google.com/kubernetes-engine/docs/best-practices/rbac
---

# Best practices for GKE RBAC

Good practices for planning Kubernetes RBAC policies in GKE: least privilege, avoiding default roles and groups, namespace scoping, no wildcards, resource-name restriction, and service account hygiene.

## Signature / Usage

### Disable non-default bindings to default groups (cluster create or update)

Use one or both flags with `gcloud container clusters create` or `gcloud container clusters update`:

```text
--no-enable-insecure-binding-system-authenticated
--no-enable-insecure-binding-system-unauthenticated
```

Reference: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/create

### Find ClusterRoleBindings that reference default users and groups

```bash
kubectl get clusterrolebindings -o json \
  | jq -r '["Name"], ["---"], (.items[] | select((.subjects | length) > 0) | select(any(.subjects[]; .name == "system:anonymous" or .name == "system:unauthenticated" or .name == "system:authenticated")) | [.metadata.namespace, .metadata.name]) | @tsv'
```

Only `system:basic-user`, `system:discovery` and `system:public-info-viewer` should be listed. For each additional binding, list the role's permissions:

Adapted (not in the official docs): `$1` / `$0` are quoted as `"${1}"` / `"${0}"` because the values come from the cluster.

```bash
kubectl get clusterrolebinding CLUSTER_ROLE_BINDING_NAME -o json \
    | jq ' .roleRef.name +" " + .roleRef.kind' \
    | sed -e 's/"//g' \
    | xargs -l bash -c 'kubectl get "${1}" "${0}" -o yaml'
```

If unsafe, delete it (never delete the default `system:` bindings):

```bash
kubectl delete clusterrolebinding CLUSTER_ROLE_BINDING_NAME
```

### Find RoleBindings that reference default users and groups

```bash
kubectl get rolebindings -A -o json \
  | jq -r '["Namespace", "Name"], ["---", "---"], (.items[] | select((.subjects | length) > 0) | select(any(.subjects[]; .name == "system:anonymous" or .name == "system:unauthenticated" or .name == "system:authenticated")) | [.metadata.namespace, .metadata.name]) | @tsv'
```

The output should be blank. To find a RoleBinding by name across namespaces:

```bash
kubectl get rolebindings -A -o json \
  | jq -r '["Namespace", "Name"], ["---", "---"], (.items[] | select((.subjects | length) > 0) | select(.metadata.name == "ROLE_BINDING_NAME") | [.metadata.namespace, .metadata.name]) | @tsv'
```

List its role's permissions and delete an unsafe binding:

Adapted (not in the official docs): `$1` / `$0` are quoted as `"${1}"` / `"${0}"` because the values come from the cluster.

```bash
kubectl get rolebinding ROLE_BINDING_NAME --namespace ROLE_BINDING_NAMESPACE -o json \
    | jq ' .roleRef.name +" " + .roleRef.kind' \
    | sed -e 's/"//g' \
    | xargs -l bash -c 'kubectl get "${1}" "${0}" -o yaml --namespace ROLE_BINDING_NAMESPACE'
```

```bash
kubectl delete rolebinding ROLE_BINDING_NAME --namespace ROLE_BINDING_NAMESPACE
```

### Policy Controller constraint parameters (exclude cluster management components)

```yaml
parameters:
  allowedGroups:
  - system:masters
  allowedUsers:
  - system:addon-manager
```

Use with the `NoUpdateServiceAccount` constraint template (https://docs.cloud.google.com/kubernetes-engine/enterprise/policy-controller/docs/latest/reference/constraint-template-library#noupdateserviceaccount).

## Options / Props

### Default roles, users and groups to avoid

| Name | Type | Description |
|---|---|---|
| `cluster-admin` | ClusterRole | Permission to do anything on any resource in the cluster |
| `system:anonymous` | User | Assigned to API requests with no authentication information; a binding gives any unauthenticated user the role's permissions |
| `system:unauthenticated` | Group | Same as above for unauthenticated requests |
| `system:authenticated` | Group | Assigned to any user signed in with a Google Account, including all Gmail accounts; not meaningfully different from `system:unauthenticated` |
| `system:masters` | Group | Bound to `cluster-admin` by default; adding subjects gives them full access |

### Guidelines

| Practice | Guidance |
|---|---|
| Least privilege | Grant minimum permissions; watch escalation risks such as `escalate` / `bind` verbs, `create` on PersistentVolumes and on CertificateSigningRequests |
| System roles | Don't delete or modify `system:`-prefixed roles and bindings; subjects shouldn't have `delete` / `update` on them |
| Default groups | Don't add subjects to `system:masters`; don't bind `system:unauthenticated`, `system:authenticated`, `system:anonymous`, or `cluster-admin` to your own subjects or default groups |
| Namespace scope | One namespace: `Role` + `RoleBinding`. Several: `ClusterRole` + a `RoleBinding` per namespace. Every namespace: `ClusterRole` + `ClusterRoleBinding`. Use as few namespaces as possible |
| Wildcards | Avoid `*`; name API groups, resources and verbs explicitly (`*` in `verbs` grants get, list, watch, patch, update, deletecollection, delete) |
| Split rules | Draft one rule per verb per resource, then merge rules with identical `verbs` lists |
| `resourceNames` | Restrict to named instances (for example the `seccomp-high` ConfigMap); can't be used for `list` and `create` verbs |
| RBAC modification | Don't bind roles with `bind`, `escalate`, `create`, `update` or `patch` on `rbac.authorization.k8s.io` to service accounts |
| Self-modification | Avoid letting Pods modify themselves; use Policy Controller (`NoUpdateServiceAccount`) where necessary |
| Service accounts | One Kubernetes ServiceAccount per workload; don't bind roles to the `default` ServiceAccount; set `automountServiceAccountToken=false` (default `true`) if the Pod doesn't call the API server; prefer `TokenRequest` API tokens over legacy Secret-based tokens (non-expiring, not rotated) |
| Review | Review RBAC regularly; a leftover RoleBinding for a deleted user could be inherited by a new user with the same name |

## Notes

- The `--no-enable-insecure-binding-system-*` flags require GKE version 1.30.1-gke.1283000 or later. They do not disable the default Kubernetes bindings, and updating an existing cluster does not delete existing non-default bindings; find and remove them afterwards.
- GKE clusters running version 1.28 and later don't allow binding `cluster-admin` to `system:anonymous`, `system:unauthenticated` or `system:authenticated`.
- To detect these bindings across clusters or a fleet, enable the standard tier of Kubernetes security posture scanning (https://docs.cloud.google.com/kubernetes-engine/docs/how-to/protect-workload-configuration#enable-security-posture).
- `kubectl delete clusterrolebinding` / `rolebinding` is destructive: review the role first and try it on a disposable cluster. Never delete the default `system:` ClusterRoleBindings; if the API server fails to reconcile them the cluster might become inaccessible.
- The source contrasts recommended and not-recommended rule YAML in tables; the rules are summarized in the guidelines above. Sample manifests: https://github.com/GoogleCloudPlatform/gke-rbac-best-practices
- Policy Controller is deprecated as of November 12, 2026 and reaches end of support on December 31, 2027; GKE clusters on version 1.39 and later don't support it (not stated in the source page; see the deprecation notice below). Check the current documentation before relying on the constraint.
- Source (Policy Controller end of support on December 31, 2027): https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller (retrieved 2026-11-16)
- Adapted from the official docs: the `xargs -l bash -c 'kubectl get $1 $0 ...'` commands quote `"${1}"` and `"${0}"` so the role name and kind read from the binding are not word-split or glob-expanded. `xargs -l` passes one input line per command and splits it on blanks into `$0` (role name) and `$1` (kind); Kubernetes role names and kinds contain no blanks.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/best-practices/rbac (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [role-based-access-control.md](./role-based-access-control.md)
- [access-control.md](./access-control.md)
- [google-groups-rbac.md](./google-groups-rbac.md)
