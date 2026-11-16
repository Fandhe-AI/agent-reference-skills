---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/aks/how-to/attach-cluster
---

# Attach your AKS cluster

Attaching means registering an Azure AKS cluster with Google Cloud fleet management and installing the GKE attached clusters software on it. You can attach with the gcloud CLI or Terraform (samples: https://github.com/GoogleCloudPlatform/anthos-samples/tree/main/anthos-attached-clusters).

## Signature / Usage

### List supported platform versions

```bash
gcloud container attached get-server-config  \
  --location=GOOGLE_CLOUD_REGION
```

### Attach an AKS cluster

1. Ensure kubeconfig has an entry for the cluster:

```bash
az aks get-credentials -n AKS_CLUSTER_NAME \
  -g RESOURCE_GROUP
```

2. Store the kubeconfig context:

```bash
KUBECONFIG_CONTEXT=$(kubectl config current-context)
```

3a. Private OIDC issuer (default):

Adapted (not in the official docs): `--context` expands the `KUBECONFIG_CONTEXT` shell variable saved above instead of the literal placeholder.

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=aks \
  --context="${KUBECONFIG_CONTEXT}" \
  --has-private-issuer \
  --kubeconfig=KUBECONFIG_PATH
```

3b. Public OIDC issuer (experimental). Retrieve the issuer URL:

Adapted (not in the official docs): `az aks show` takes the Azure-side `AKS_CLUSTER_NAME` instead of `CLUSTER_NAME`.

```bash
az aks show -n AKS_CLUSTER_NAME \
  -g RESOURCE_GROUP \
  --query "oidcIssuerProfile.issuerUrl" -otsv
```

Then register:

Adapted (not in the official docs): `--context` expands the `KUBECONFIG_CONTEXT` shell variable saved above instead of the literal placeholder.

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=aks \
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
| `AKS_CLUSTER_NAME`, `RESOURCE_GROUP` | AKS cluster name and its resource group |
| `CLUSTER_NAME` | Cluster name (may equal `AKS_CLUSTER_NAME`); RFC 1123 Label Names |
| `GOOGLE_CLOUD_REGION` | Supported administrative region (closest is best practice; no user data stored there) |
| `PLATFORM_VERSION` | GKE attached clusters version to install |
| `PROJECT_NUMBER` | Fleet host project (number) |
| `ISSUER_URL` | OIDC issuer URL (public issuer only) |
| `KUBECONFIG_CONTEXT` / `KUBECONFIG_PATH` | kubeconfig context / path |
| `GOOGLE_PROJECT_ID` | The cluster's Google Cloud project ID (telemetry binding only) |

## Notes

- Platform version minor must equal or be one below the cluster's Kubernetes minor version (Kubernetes v1.22.\* can use platform 1.21.\* or 1.22.\*).
- Default quota: 50 attached clusters per project.
- If attaching fails, Google Cloud changes (for example the workload identity pool) are rolled back automatically and the AKS cluster is unaffected.
- Starting with Kubernetes 1.28 the telemetry binding is unnecessary. Before that it is project-wide, run once after the first cluster exists.
- Cluster requirements: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/aks/reference/cluster-prerequisites
- Corrected from the official docs: the source saves `KUBECONFIG_CONTEXT=$(kubectl config current-context)` but then passes the literal `--context=KUBECONFIG_CONTEXT`; the commands now use `--context="${KUBECONFIG_CONTEXT}"`.
- Corrected from the official docs: the source passes `CLUSTER_NAME` (the name registered in Google Cloud) to `az aks show -n`, while the same page uses `AKS_CLUSTER_NAME` for `az aks get-credentials` and allows the two names to differ; the issuer lookup now uses `AKS_CLUSTER_NAME`.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/aks/how-to/attach-cluster (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [attach-cluster-generic.md](./attach-cluster-generic.md)
- [attach-cluster-eks.md](./attach-cluster-eks.md)
- [azure-deprecation-announcement.md](./azure-deprecation-announcement.md)
