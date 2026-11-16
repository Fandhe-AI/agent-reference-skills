---
source: https://docs.cloud.google.com/kubernetes-engine/enterprise/multicluster-management/gateway/setup
---

# Set up the Connect gateway

Platform administrator guide: enable APIs, verify cluster registration, grant IAM roles and configure RBAC so users and service accounts can use the Console and `kubectl` through the Connect gateway with their individual IDs (Google Groups need a separate setup).

## Signature / Usage

### Enable APIs

`connectgateway.googleapis.com` is not needed if users only authenticate through the Console; the other APIs are.

```bash
gcloud services enable --project=PROJECT_ID  \
    connectgateway.googleapis.com \
    gkeconnect.googleapis.com \
    gkehub.googleapis.com \
    cloudresourcemanager.googleapis.com
```

### Verify registered clusters

```bash
gcloud container fleet memberships list
```

### Grant roles for `kubectl` access

Replace `MEMBER` with `user:alice@example.com` or `serviceAccount:test_sa@example-project.iam.gserviceaccount.com`, and `GATEWAY_ROLE` with `roles/gkehub.gatewayAdmin`, `roles/gkehub.gatewayReader` or `roles/gkehub.gatewayEditor`.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=MEMBER \
    --role=GATEWAY_ROLE
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=MEMBER \
    --role=roles/gkehub.viewer
```

### Grant roles for Console access (clusters outside Google Cloud)

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=MEMBER \
    --role=roles/container.viewer
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=MEMBER \
    --role=roles/gkehub.viewer
```

### Optional `cloud-console-reader` ClusterRole

```bash
cat <<EOF > cloud-console-reader.yaml
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: cloud-console-reader
rules:
- apiGroups: [""]
  resources: ["nodes", "persistentvolumes", "pods"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["storage.k8s.io"]
  resources: ["storageclasses"]
  verbs: ["get", "list", "watch"]
EOF
kubectl apply -f cloud-console-reader.yaml
```

### Generate and apply RBAC with gcloud

```bash
gcloud container fleet memberships generate-gateway-rbac  \
    --membership=MEMBERSHIP_NAME \
    --role=ROLE \
    --users=USERS \
    --project=PROJECT_ID \
    --kubeconfig=KUBECONFIG_PATH \
    --context=KUBECONFIG_CONTEXT \
    --apply
```

### RBAC with kubectl (cluster-admin example for two users)

```bash
cat <<EOF > /tmp/gateway-rbac.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: gateway-impersonate
rules:
- apiGroups:
  - ""
  resourceNames:
  - dana@example.com
  - test@example-project.iam.gserviceaccount.com
  resources:
  - users
  verbs:
  - impersonate
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: gateway-impersonate
roleRef:
  kind: ClusterRole
  name: gateway-impersonate
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: ServiceAccount
  name: connect-agent-sa
  namespace: gke-connect
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: gateway-cluster-admin
subjects:
- kind: User
  name: dana@example.com
- kind: User
  name: test@example-project.iam.gserviceaccount.com
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
EOF
# Apply policies to the cluster.
kubectl apply --kubeconfig=KUBECONFIG_PATH  -f /tmp/gateway-rbac.yaml
```

## Options / Props

| Role | Purpose |
|---|---|
| `roles/gkehub.gatewayAdmin` | Access the Connect gateway API with `kubectl`; includes `gkehub.gateway.stream` (needed for `attach`, `cp`, `exec`, which have extra requirements) |
| `roles/gkehub.gatewayReader` | Read-only access to connected clusters |
| `roles/gkehub.gatewayEditor` | Read / write access to connected clusters |
| `roles/gkehub.viewer` | Retrieve cluster `kubeconfigs`; view clusters outside Google Cloud in the Console |
| `roles/container.viewer` | View the GKE Clusters page and container resources in the Console |
| `roles/serviceusage.serviceUsageAdmin` | Enable APIs (`serviceusage.services.enable`) |
| `roles/resourcemanager.projectIamAdmin` | Grant IAM permissions to users and service accounts |

`generate-gateway-rbac` placeholders: `MEMBERSHIP_NAME` (membership name), `ROLE` (an existing role such as `clusterrole/cluster-admin`, `clusterrole/cloud-console-reader`, `role/mynamespace/namespace-reader`), `USERS` (comma-separated emails), `PROJECT_ID` (project where the cluster is registered), `KUBECONFIG_PATH` (usually `$HOME/.kube/config`), `KUBECONFIG_CONTEXT` (see `kubectl config current-context`).

## Notes

- The source assumes you have `roles/owner`; otherwise a project owner must grant `roles/serviceusage.serviceUsageAdmin` and `roles/resourcemanager.projectIamAdmin` (via `gcloud projects add-iam-policy-binding PROJECT_ID --member user:USER_EMAIL_ADDRESS --role=...`). `roles/owner` is a very broad role; prefer the narrower roles above.
- Only clusters registered to the project's fleet are reachable. Clusters on-premises and on other public clouds are registered automatically; GKE clusters on Google Cloud and attached clusters must be registered separately.
- Two RBAC policies are needed per cluster: an impersonation policy for the Connect agent, and a permissions policy for the user (cluster-level role or namespace-level role).
- Blast radius: the kubectl example binds `cluster-admin` to named users, giving them full control of the cluster. Grant the narrowest role (for example `cloud-console-reader` or a namespace role) where possible.
- The source recommends managing these policies with Policy Controller and Config Sync rather than applying them directly with `kubectl`; use `generate-gateway-rbac` in dry-run mode to output the policies instead of applying them.
- VPC Service Controls can be used if the gateway APIs are reachable inside the perimeter. The source links the reference page under `container/hub/memberships/generate-gateway-rbac`; the command group is now `gcloud container fleet` (formerly `container hub`).
- The source also shows sample command output and the use of the Console; omitted here.
- Source: https://docs.cloud.google.com/kubernetes-engine/enterprise/multicluster-management/gateway/setup (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-gateway.md](./connect-gateway.md)
- [connect-agent.md](./connect-agent.md)
- [register-gke.md](./register-gke.md)
