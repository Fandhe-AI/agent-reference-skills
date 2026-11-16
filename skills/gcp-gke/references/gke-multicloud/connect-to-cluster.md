---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/connect-to-cluster
---

# Connect to your CNCF-conformant attached cluster

Three methods, all enabled by connect gateway, to connect to an attached cluster: as a Google user, as a member of a Google group, or as a non-Google (external) user or group. The page is for IT administrators and operators; the cluster must already be attached.

## Signature / Usage

### Method 1: Google user

Enable the APIs:

```bash
gcloud services enable --project=PROJECT_ID \
    connectgateway.googleapis.com \
    cloudresourcemanager.googleapis.com
```

RBAC: users listed in `--admin-users` at registration are granted administrator automatically; otherwise create a Kubernetes RBAC manifest manually. Then get credentials:

```bash
gcloud container fleet memberships get-credentials CLUSTER_NAME
```

### Method 2: Google groups

Prerequisites: latest gcloud CLI; attached cluster version 1.26.0-gke.8, 1.27.0-gke.5, 1.28.0-gke.2 or later. Enable the same two APIs as above, create a group `gke-security-groups` in your project's domain, create sub-groups under it, add users to the sub-groups, then grant a gateway role to each group (`roles/gkehub.gatewayAdmin`, `roles/gkehub.gatewayEditor` or `roles/gkehub.gatewayReader`):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member=group:GROUP_NAME@DOMAIN \
  --role=GATEWAY_ROLE
```

Define the group's permission on the cluster in RBAC (the source example binds the Google group `cluster-admin-team@example.com` to `cluster-admin`):

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: gateway-cluster-admin-group
subjects:
- kind: Group
  name: cluster-admin-team@example.com
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
```

Adapted (not in the official docs): `-kubeconfig=` corrected to the valid `--kubeconfig=` flag.

```bash
kubectl apply --kubeconfig=KUBECONFIG_PATH -f FILENAME
```

### Method 3: external identities (workforce identity federation)

Prerequisites: latest gcloud CLI; attached cluster version 1.27.0-gke.5, 1.28.0-gke.2 or later; configure workforce identity federation (Azure AD, Okta, or other). Optionally grant `gkemulticloud.admin` (only needed to create or update clusters, not to access one).

Adapted (not in the official docs): `subject SUBJECT_VALUE` (space) corrected to `subject/SUBJECT_VALUE` to match the principal identifier format.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --role="roles/gkemulticloud.admin" \
  --member="principal://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/subject/SUBJECT_VALUE"
```

Groups:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --role="roles/gkemulticloud.admin" \
  --member="principalSet://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/group/GROUP_ID"
```

Grant access when attaching or updating:

Adapted (not in the official docs): same `subject/SUBJECT_VALUE` correction; the `[register|update]` template bracket (a shell glob) is replaced with `update`. Use `register` instead of `update` with the same two flags when attaching, together with the registration flags from the attach page.

```bash
gcloud container attached clusters update CLUSTER_NAME \
    --location=GOOGLE_CLOUD_REGION \
    --admin-users=principal://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/subject/SUBJECT_VALUE \
    --admin-groups=principalSet://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/group/GROUP_ID
```

## Options / Props

| Placeholder | Description |
| --- | --- |
| `PROJECT_ID` | Google Cloud project ID |
| `CLUSTER_NAME` | Cluster whose credentials you want |
| `GROUP_NAME`, `DOMAIN` | Group name and Google Workspace domain |
| `GATEWAY_ROLE` | `roles/gkehub.gatewayAdmin`, `roles/gkehub.gatewayEditor` or `roles/gkehub.gatewayReader` |
| `WORKFORCE_POOL_ID` | ID of the workforce identity pool |
| `SUBJECT_VALUE` | ID of an external user, for example an email address |
| `GROUP_ID` | ID of an external group |
| `GOOGLE_CLOUD_REGION` | Region administering the cluster |
| `KUBECONFIG_PATH`, `FILENAME` | kubeconfig path; RBAC manifest file |

## Notes

- Corrected from the official docs: the source shows `kubectl apply -kubeconfig=KUBECONFIG_PATH -f FILENAME` and `.../subject SUBJECT_VALUE` (with a space) in the member and `--admin-users` values.
- Corrected from the official docs: the source shows `gcloud container attached clusters [register|update] CLUSTER_NAME` with no `--location` flag; `update` requires it.
- The example binding grants `cluster-admin` to a group; the blast radius is full cluster control for every member of that group, so use narrower ClusterRoles where possible and a dedicated group.
- Required API roles and permissions: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/genericreference/api-permissions (URL as written in the source).
- Console login with your Cloud Identity: https://docs.cloud.google.com/anthos/multicluster-management/console/logging-in#log_in_using_your_identity
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/connect-to-cluster (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [attach-cluster-generic.md](./attach-cluster-generic.md)
- [update-cluster.md](./update-cluster.md)
- [attached-workload-identity.md](./attached-workload-identity.md)
