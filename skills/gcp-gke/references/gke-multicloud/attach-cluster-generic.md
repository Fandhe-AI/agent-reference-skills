---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/attach-cluster
---

# Attach your CNCF-conformant cluster

Register any conformant Kubernetes cluster with x86 nodes to Google Cloud fleet management with GKE attached clusters, so it appears in the Google Cloud console next to your GKE clusters. For EKS or AKS use the dedicated pages.

## Signature / Usage

### List supported platform versions

```bash
gcloud container attached get-server-config  \
  --location=GOOGLE_CLOUD_REGION
```

### Register: private OIDC issuer

First store the kubeconfig context:

```bash
KUBECONFIG_CONTEXT=$(kubectl config current-context)
```

Adapted (not in the official docs): `--context` expands the `KUBECONFIG_CONTEXT` shell variable saved above instead of the literal placeholder.

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=generic \
  --context="${KUBECONFIG_CONTEXT}" \
  --has-private-issuer \
  --kubeconfig=KUBECONFIG_PATH
```

### Register: public OIDC issuer

Retrieve the cluster's OIDC issuer URL first (distribution-specific), then:

Adapted (not in the official docs): `--context` expands the `KUBECONFIG_CONTEXT` shell variable saved above instead of the literal placeholder.

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=generic \
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
| `CLUSTER_NAME` | Cluster name; must comply with RFC 1123 Label Names |
| `GOOGLE_CLOUD_REGION` | Supported administrative region to administer the cluster from (closest region is best practice; no user data is stored there) |
| `PROJECT_NUMBER` | Fleet host project (number) to register with |
| `PLATFORM_VERSION` | GKE attached clusters version to install |
| `ISSUER_URL` | OIDC issuer URL (public issuer only) |
| `KUBECONFIG_CONTEXT` | Context in kubeconfig for the cluster |
| `KUBECONFIG_PATH` | Path to kubeconfig |
| `GOOGLE_PROJECT_ID` | The cluster's Google Cloud project ID |

## Notes

- Platform version: numbered like GKE (for example `1.21.5-gke.1`). Choose a version whose minor version equals or is one below the cluster's Kubernetes version (Kubernetes v1.22.\* can use platform 1.21.\* or 1.22.\*).
- Default quota is 50 attached clusters per project; contact Google Cloud support to increase.
- Starting with Kubernetes 1.28 the telemetry-agent binding is no longer necessary (permissions are granted automatically). Before that, the binding grants all clusters in the project upload access, is run once after creating your first cluster, and fails until at least one cluster exists because the pool `GOOGLE_PROJECT_ID.svc.id.goog` is not provisioned until then.
- The previous generation of GKE attached clusters is in maintenance mode and receives no new features, fixes, or support.
- Supported clusters: any CNCF-conformant cluster with x86 nodes; incompatibilities are documented at https://docs.cloud.google.com/anthos/docs/version-and-upgrade-support#anthos. Cluster requirements: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/reference/cluster-prerequisites
- Corrected from the official docs: the source saves `KUBECONFIG_CONTEXT=$(kubectl config current-context)` but then passes the literal `--context=KUBECONFIG_CONTEXT`; the commands now use `--context="${KUBECONFIG_CONTEXT}"`.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/attach-cluster (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [attach-cluster-eks.md](./attach-cluster-eks.md)
- [attach-cluster-aks.md](./attach-cluster-aks.md)
- [connect-to-cluster.md](./connect-to-cluster.md)
- [update-cluster.md](./update-cluster.md)
- [detach-cluster.md](./detach-cluster.md)
