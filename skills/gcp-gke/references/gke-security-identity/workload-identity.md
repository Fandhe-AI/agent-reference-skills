---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
---

# Authenticate to Google Cloud APIs from GKE workloads

Enable Workload Identity Federation for GKE on clusters and node pools, grant IAM roles to Kubernetes ServiceAccount principals, verify the setup, optionally link a Kubernetes ServiceAccount to an IAM service account, and clean up.

## Signature / Usage

### Enable on an existing Standard cluster

```bash
gcloud container clusters update CLUSTER_NAME \
    --location=LOCATION \
    --workload-pool=PROJECT_ID.svc.id.goog
```

In Autopilot it is always enabled. On Standard it must be enabled on the cluster before node pools; existing node pools are unaffected, new node pools use it.

### Create a node pool with the GKE metadata server

```bash
gcloud container node-pools create NODEPOOL_NAME \
    --cluster=CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --workload-metadata=GKE_METADATA
```

### Update an existing node pool

```bash
gcloud container node-pools update NODEPOOL_NAME \
    --cluster=CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --workload-metadata=GKE_METADATA
```

### Configure authorization and principals

```bash
gcloud container clusters get-credentials CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION
```

```bash
kubectl create namespace NAMESPACE
```

```bash
kubectl create serviceaccount KSA_NAME \
    --namespace NAMESPACE
```

Grant a role to the ServiceAccount principal (`PROJECT_NUMBER` is the numerical project number, `PROJECT_ID` the project ID):

```bash
gcloud projects add-iam-policy-binding projects/PROJECT_ID \
    --role=roles/container.clusterViewer \
    --member=principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/NAMESPACE/sa/KSA_NAME \
    --condition=None
```

### Service mesh annotation (Istio / Cloud Service Mesh)

```yaml
metadata:
  annotations:
    proxy.istio.io/config: '{ "holdApplicationUntilProxyStarts": true }'
```

### Verify the setup

```bash
gcloud storage buckets create gs://BUCKET
```

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET \
    --role=roles/storage.objectViewer \
    --member=principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/NAMESPACE/sa/KSA_NAME \
    --condition=None
```

Save as `test-app.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
  namespace: NAMESPACE
spec:
  serviceAccountName: KSA_NAME
  containers:
  - name: test-pod
    image: google/cloud-sdk:slim
    command: ["sleep","infinity"]
    resources:
      requests:
        cpu: 500m
        memory: 512Mi
        ephemeral-storage: 10Mi
```

Standard clusters only: add this under the Pod `spec` to place Pods on node pools that use it (Autopilot rejects this nodeSelector).

Adapted (not in the official docs): the source's snippet lost the indentation of the label under `nodeSelector` (invalid YAML); the label is indented under the key.

```yaml
spec:
  nodeSelector:
    iam.gke.io/gke-metadata-server-enabled: "true"
```

```bash
kubectl apply -f test-app.yaml
kubectl get pods --namespace=NAMESPACE
kubectl exec -it pods/test-pod --namespace=NAMESPACE -- /bin/bash
```

Inside the Pod:

```bash
curl -X GET -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://storage.googleapis.com/storage/v1/b/BUCKET/o"
```

Expected output is `{ "kind": "storage#objects" }`.

### Alternative: link a Kubernetes ServiceAccount to an IAM service account

```bash
kubectl create namespace NAMESPACE
kubectl create serviceaccount KSA_NAME \
    --namespace=NAMESPACE
gcloud iam service-accounts create IAM_SA_NAME \
    --project=IAM_SA_PROJECT_ID
```

```bash
gcloud projects add-iam-policy-binding IAM_SA_PROJECT_ID \
    --member "serviceAccount:IAM_SA_NAME@IAM_SA_PROJECT_ID.iam.gserviceaccount.com" \
    --role "ROLE_NAME"
```

`ROLE_NAME` is a role such as `roles/spanner.viewer`.

```bash
gcloud iam service-accounts add-iam-policy-binding IAM_SA_NAME@IAM_SA_PROJECT_ID.iam.gserviceaccount.com \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:PROJECT_ID.svc.id.goog[NAMESPACE/KSA_NAME]"
```

```bash
kubectl annotate serviceaccount KSA_NAME \
    --namespace NAMESPACE \
    iam.gke.io/gcp-service-account=IAM_SA_NAME@IAM_SA_PROJECT_ID.iam.gserviceaccount.com
```

Optional, to get the identifier in IAM principal identifier syntax:

```bash
kubectl annotate serviceaccount KSA_NAME \
    --namespace=NAMESPACE \
    iam.gke.io/return-principal-id-as-email="true"
```

### Clean up

Revoke access (example for an Artifact Registry repository):

```bash
gcloud artifacts repositories remove-iam-policy-binding REPOSITORY_NAME \
    --location=REPOSITORY_LOCATION \
    --member='principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/NAMESPACE/sa/KSA_NAME' \
    --role='roles/artifactregistry.reader' \
    --all
```

Disable (Standard clusters only): first each node pool, then the cluster.

```bash
gcloud container node-pools update NODEPOOL_NAME \
    --cluster=CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --workload-metadata=GCE_METADATA
```

```bash
gcloud container clusters update CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --disable-workload-identity
```

## Options / Props

| Item | Value |
|---|---|
| Required roles for the setup | `roles/container.admin`, `roles/iam.serviceAccountAdmin` |
| Required API | IAM Service Account Credentials API enabled (plus the Kubernetes Engine API) |
| `--workload-pool` | `PROJECT_ID.svc.id.goog` |
| `--workload-metadata` | `GKE_METADATA` (use the GKE metadata server) or `GCE_METADATA` (disable on a node pool) |
| Pod nodeSelector (Standard) | `iam.gke.io/gke-metadata-server-enabled: "true"` |
| KSA annotations | `iam.gke.io/gcp-service-account`, `iam.gke.io/return-principal-id-as-email`, `iam.gke.io/credential-quota-project` |

## Notes

- Best practice: create new node pools (rather than updating existing ones) if the application also needs changes; include `--workload-metadata=GKE_METADATA` on creation so it fails when the cluster lacks Workload Identity Federation for GKE.
- Modifying an existing node pool immediately enables it for running workloads, stopping them from using the node's service account, which might cause disruptions. Disabling is destructive to those workloads' access: try the update, revoke and disable commands on a disposable cluster first. `--all` in the revoke example removes the binding for all conditions.
- Best practice is IAM principal identifiers (federated tokens); use the ServiceAccount-linking method only when a target API has limitations (https://docs.cloud.google.com/iam/docs/federated-identity-supported-services). For linking, both the IAM allow policy and the annotation are required. The member format is `PROJECT_ID.svc.id.goog[NAMESPACE/KSA_NAME]`.
- Grant roles on specific Google Cloud resources the application needs; the `roles/container.clusterViewer` binding is the source's example. Do not grant `roles/owner` / `roles/editor` to a Kubernetes ServiceAccount.
- Existing code that uses the instance metadata server or Google Cloud client libraries works without modification.
- Org policy can prevent exchanging ServiceAccount tokens for IAM service account tokens: https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts#disable_workload_identity_cluster_creation
- Troubleshooting: https://docs.cloud.google.com/kubernetes-engine/docs/troubleshooting/troubleshooting-security#workload-identity
- The source also shows Console steps and Cloud Shell activation steps.
- Corrected from the official docs: the nodeSelector snippet (`nodeSelector:` followed by an unindented `iam.gke.io/...` line).
- Omitted for size: the source's "use quota from a different project" steps (GKE 1.24 or later: grant `roles/serviceusage.serviceUsageConsumer` to the principal on the quota project, then annotate the KSA with `iam.gke.io/credential-quota-project`).
- Distinct from Workload Identity Federation for external workloads (AWS / Azure / OIDC), which is in `gcp-foundation`.
- The test Pod example uses the floating image tag `google/cloud-sdk:slim`; pin a specific tag or digest if you keep it beyond a quick test.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/workload-identity (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [workload-identity-concepts.md](./workload-identity-concepts.md)
- [iam.md](./iam.md)
