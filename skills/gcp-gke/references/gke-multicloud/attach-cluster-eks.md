---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/eks/how-to/attach-cluster
---

# Attach your EKS cluster

Attaching means registering an Amazon EKS cluster with Google Cloud fleet management and installing the GKE attached clusters software on it. You can attach with the gcloud CLI or Terraform (samples: https://github.com/GoogleCloudPlatform/anthos-samples/tree/main/anthos-attached-clusters). The page is for IT administrators and operators.

## Signature / Usage

### List supported platform versions

```bash
gcloud container attached get-server-config  \
  --location=GOOGLE_CLOUD_REGION
```

### Attach an EKS cluster

1. Ensure kubeconfig has an entry for the cluster:

```bash
aws eks update-kubeconfig --region AWS_REGION \
  --name EKS_CLUSTER_NAME
```

2. Retrieve the OIDC issuer URL and save it:

```bash
aws eks describe-cluster \
  --region AWS_REGION \
  --name EKS_CLUSTER_NAME \
  --query "cluster.identity.oidc.issuer" \
  --output text
```

3. Store the kubeconfig context:

```bash
KUBECONFIG_CONTEXT=$(kubectl config current-context)
```

4. Register the cluster:

Adapted (not in the official docs): `--context` expands the `KUBECONFIG_CONTEXT` shell variable saved above instead of the literal placeholder.

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=eks \
  --issuer-url=ISSUER_URL \
  --context="${KUBECONFIG_CONTEXT}" \
  --kubeconfig=KUBECONFIG_PATH
```

### Authorize Cloud Logging / Cloud Monitoring (Kubernetes versions before 1.28)

```bash
gcloud projects add-iam-policy-binding GOOGLE_PROJECT_ID \
  --member="serviceAccount:GOOGLE_PROJECT_ID.svc.id.goog[gke-system/gke-telemetry-agent]" \
  --role=roles/gkemulticloud.telemetryWriter
```

## Options / Props

| Placeholder | Description |
| --- | --- |
| `AWS_REGION` | AWS region of the EKS cluster |
| `CLUSTER_NAME` | Cluster name (may equal `EKS_CLUSTER_NAME`); RFC 1123 Label Names |
| `GOOGLE_CLOUD_REGION` | Supported administrative region (closest is best practice; no user data stored there) |
| `PLATFORM_VERSION` | GKE attached clusters version to install |
| `PROJECT_NUMBER` | Fleet host project (number) |
| `ISSUER_URL` | OIDC issuer URL retrieved earlier |
| `KUBECONFIG_CONTEXT` / `KUBECONFIG_PATH` | kubeconfig context / path |
| `GOOGLE_PROJECT_ID` | The cluster's Google Cloud project ID (telemetry binding only) |

## Notes

- Platform version minor must equal or be one below the cluster's Kubernetes minor version (Kubernetes v1.22.\* can use platform 1.21.\* or 1.22.\*).
- Default quota: 50 attached clusters per project.
- If attaching fails, Google Cloud changes (for example the workload identity pool) are rolled back automatically and the EKS cluster is unaffected; retry after fixing the cause.
- Starting with Kubernetes 1.28 the telemetry binding is unnecessary. Before that it is project-wide, run once after the first cluster exists.
- Cluster requirements: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/eks/reference/cluster-prerequisites
- Corrected from the official docs: the source saves `KUBECONFIG_CONTEXT=$(kubectl config current-context)` but then passes the literal `--context=KUBECONFIG_CONTEXT`; the commands now use `--context="${KUBECONFIG_CONTEXT}"`.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/eks/how-to/attach-cluster (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [attach-cluster-generic.md](./attach-cluster-generic.md)
- [attach-cluster-aks.md](./attach-cluster-aks.md)
- [aws-deprecation-announcement.md](./aws-deprecation-announcement.md)
