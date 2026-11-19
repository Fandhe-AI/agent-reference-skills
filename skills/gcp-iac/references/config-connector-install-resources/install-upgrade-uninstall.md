---
source: https://docs.cloud.google.com/config-connector/docs/how-to/install-upgrade-uninstall
---

# Installing Config Connector with the GKE add-on

Install, configure, upgrade and uninstall Config Connector through the GKE Config Connector add-on (GKE Standard clusters only; the add-on version is tied to the cluster's GKE minor version).

## Signature / Usage

### Requirements

- GKE version 1.15.11-gke.5 and later, 1.16.8-gke.8 and later, or 1.17.4-gke.5 and later.
- A workload identity pool and Kubernetes Engine Monitoring enabled on the clusters where you enable Config Connector.
- If Config Connector was manually installed before, uninstall it first (cluster mode or namespaced mode).
- When you enable the add-on, Config Connector creates a namespace `configconnector-operator-system`; do not change or add resources there.

### Create a cluster with the add-on

`CHANNEL` supports `rapid` and `regular`.

```bash
gcloud container clusters create CLUSTER_NAME \
    --release-channel CHANNEL \
    --addons ConfigConnector \
    --workload-pool=PROJECT_ID.svc.id.goog \
    --logging=SYSTEM \
    --monitoring=SYSTEM
```

### Enable the add-on on an existing cluster

Set up Workload Identity Federation for GKE on the cluster first. Enabling it on an existing cluster does not automatically enable it on existing node pools; enable it on all node pools because Config Connector could run on any of them:

```bash
gcloud container node-pools update NODE_POOL \
    --workload-metadata=GKE_METADATA \
    --cluster CLUSTER_NAME
```

```bash
gcloud container clusters update CLUSTER_NAME \
    --update-addons ConfigConnector=ENABLED
```

### Create an identity (once per cluster)

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/editor"
```

```bash
gcloud iam service-accounts add-iam-policy-binding \
SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
  --member="serviceAccount:PROJECT_ID.svc.id.goog[cnrm-system/cnrm-controller-manager]" \
  --role="roles/iam.workloadIdentityUser"
```

### Configure Config Connector (cluster mode)

The add-on automatically creates a `ConfigConnector` resource in namespaced mode for legacy reasons; to use cluster mode, apply `configconnector.yaml`:

```yaml
# configconnector.yaml
apiVersion: core.cnrm.cloud.google.com/v1beta1
kind: ConfigConnector
metadata:
  # the name is restricted to ensure that there is only one
  # ConfigConnector resource installed in your cluster
  name: configconnector.core.cnrm.cloud.google.com
spec:
  mode: cluster
  googleServiceAccount: "SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com"
  # Setting `stateIntoSpec` to `Absent` is recommended. It means setting `cnrm.cloud.google.com/state-into-spec`
  # annotation to `absent` for all Config Connector resources created in the cluster in the future.
  # It prevents Config Connector from populating unspecified fields into the spec.
  stateIntoSpec: Absent
```

```bash
kubectl apply -f configconnector.yaml
```

### Specify where to create resources

```bash
kubectl create namespace NAMESPACE
```

Project, folder or organization (choose one):

```bash
kubectl annotate namespace \
NAMESPACE cnrm.cloud.google.com/project-id=PROJECT_ID
```

```bash
kubectl annotate namespace \
NAMESPACE cnrm.cloud.google.com/folder-id=FOLDER_ID
```

```bash
kubectl annotate namespace \
NAMESPACE cnrm.cloud.google.com/organization-id=ORGANIZATION_ID
```

### Verify the installation

Components run in the `cnrm-system` namespace. The controller Pod can take several minutes to start.

```bash
kubectl wait -n cnrm-system \
      --for=condition=Ready pod --all
```

```text
pod/cnrm-controller-manager-0 condition met
```

### Uninstall

Remove the CRDs and controller components, then disable the add-on:

```bash
kubectl delete ConfigConnector configconnector.core.cnrm.cloud.google.com --wait=true
```

```bash
gcloud container clusters update CLUSTER_NAME --update-addons ConfigConnector=DISABLED
```

## Options / Props

### Example GKE minor version to Config Connector version mapping

| GKE minor version | Config Connector version |
|---|---|
| 1.20 | 1.69.0 |
| 1.21 | 1.69.0 |
| 1.22 | 1.71.0 |
| 1.23 | 1.82.0 |
| 1.24 | 1.89.0 |

## Notes

- The mapping table is only an example and must not be relied on to determine which Config Connector version a cluster gets.
- Upgrades of the add-on are managed by Google Cloud; resources in your cluster are preserved. The version depends entirely on the cluster's GKE minor version: the add-on is upgraded when the cluster moves to a minor version mapped to a newer Config Connector version (this can take up to one week), or when Google Cloud re-maps a minor version that is new enough not to be available on the Regular or Stable release channels. Google Cloud does not roll out new versions to minor versions old enough to be on Regular or Stable, except in emergencies where a widespread issue has been detected.
- To get the latest version, the source recommends manual installation (and its switch procedure); the add-on is often behind by up to 12 months or more, and Config Controller is more current than the add-on but can still lag behind manual installation.
- Cluster-mode identity grants `roles/editor`, a broad basic role. The source says it allows most Config Connector functionality except project and organization wide configuration such as IAM modifications, and that in production you should set more granular permissions.
- Do not uninstall Config Connector from a Config Controller cluster; the source calls this an unsupported change that can cause unexpected behavior. Uninstalling removes the CRDs and controller; try it on a disposable cluster first.
- Location: set the `compute/region` (or `compute/zone` for zonal clusters) property, or pass the location, to avoid `One of [--zone, --region] must be supplied: Please specify location`; you might need to specify the location if the cluster differs from the default.
- The source also shows Google Cloud console steps for creating, enabling and disabling the add-on.
- Config Connector manages Google Cloud resources as Kubernetes objects; the GKE cluster itself and Config Sync are in `gcp-gke`.
- Source: https://docs.cloud.google.com/config-connector/docs/how-to/install-upgrade-uninstall (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [installation-types.md](./installation-types.md)
- [install-manually.md](./install-manually.md)
- [organizing-resources-overview.md](./organizing-resources-overview.md)
- [namespaces-and-projects.md](./namespaces-and-projects.md)
