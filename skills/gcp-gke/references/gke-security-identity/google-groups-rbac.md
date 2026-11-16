---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/google-groups-rbac
---

# Configure Google Groups for RBAC

Assign Kubernetes RBAC permissions to members of Google Groups in Google Workspace, so group membership is managed outside GKE. Works on new and existing Standard and Autopilot clusters.

## Signature / Usage

### Create a Standard cluster with Google Groups for RBAC

```bash
gcloud container clusters create CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --security-group="gke-security-groups@DOMAIN"
```

### Create an Autopilot cluster

```bash
gcloud container clusters create-auto CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --security-group="gke-security-groups@DOMAIN"
```

### Update an existing cluster

```bash
gcloud container clusters update CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --security-group="gke-security-groups@DOMAIN"
```

Replace `CLUSTER_NAME`, `CONTROL_PLANE_LOCATION` (region for regional clusters, zone for zonal) and `DOMAIN` (domain of the `gke-security-groups` group you created).

### Verify access with `kubectl auth can-i`

```bash
kubectl auth can-i get pods \
    --namespace=dev \
    --as=USER \
    --as-group=GROUP
```

`USER` is a member of the group (such as `gke-user@example.com`), `GROUP` the group to impersonate (such as `gke-dev-users@example.com`). Output is `yes` or `no`.

### Verify with audit logs (Logs Explorer query)

```text
resource.type="k8s_cluster"
resource.labels.location="CLUSTER_LOCATION"
resource.labels.cluster_name="CLUSTER_NAME"
protoPayload.resourceName="authorization.k8s.io/v1/selfsubjectaccessreviews"
protoPayload.authenticationInfo.principalEmail="EMAIL_ADDRESS"
```

## Options / Props

| Item | Value |
|---|---|
| Requirement | Google Workspace or any edition of Cloud Identity |
| Required parent group | `gke-security-groups` (name is required) with **View Members** permission for **Group Members** |
| Limit | Up to 2000 groups under the security group per user, including nested memberships |
| Membership cache | Group membership cached briefly (a few minutes to propagate); user credential caching on the cluster is about one hour |

## Notes

- Setup: create `gke-security-groups`; create groups for sets of users (each with View members permission for Group members); add those groups as nested groups of `gke-security-groups`. Don't add individual users to `gke-security-groups`.
- References to Google Groups in RoleBinding / ClusterRoleBinding are case-sensitive; use the exact group name.
- Effects of deleting groups: deleting `gke-security-groups` makes all Google Groups for RBAC grants fail (recreating it requires re-running the update command so the cluster uses the new group ID); deleting a member group breaks its bindings (recreate a group with exactly the same name and nest it again).
- Verifying through logs: no `kubectl` interaction for at least one hour beforehand (authentication is cached for one hour), enable Data Access audit logs for the Kubernetes Engine API (Admin Read, Data Read, Data Write; incurs charges, disable after testing). The `authorization.k8s.io/decision` label gives allow or deny, and `authorization.k8s.io/reason` names the Google group mapped to the Kubernetes group. The test command in the source is `kubectl create ns helloworld`.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/google-groups-rbac (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [role-based-access-control.md](./role-based-access-control.md)
- [access-control.md](./access-control.md)
- [rbac-best-practices.md](./rbac-best-practices.md)
