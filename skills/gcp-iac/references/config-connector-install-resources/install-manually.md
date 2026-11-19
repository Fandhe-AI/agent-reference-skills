---
source: https://docs.cloud.google.com/config-connector/docs/how-to/install-manually
---

# Install Config Connector manually

Manual installation with the Config Connector operator gives control over the installed version and upgrade schedule. Namespaced mode (recommended) uses one IAM service account per namespace; cluster mode uses one shared IAM service account.

## Signature / Usage

### Before you begin

Create or identify a GKE cluster without Config Connector that has Workload Identity and Kubernetes Engine Monitoring enabled, and configure `kubectl` for it.

### Install the operator

Keep a copy of the bundle; it is needed to uninstall Config Connector.

```bash
gcloud storage cp gs://configconnector-operator/latest/release-bundle.tar.gz release-bundle.tar.gz
```

```bash
tar zxvf release-bundle.tar.gz
```

Autopilot:

```bash
kubectl apply -f operator-system/autopilot-configconnector-operator.yaml
```

Standard:

```bash
kubectl apply -f operator-system/configconnector-operator.yaml
```

Configure the operator for namespaced mode (`configconnector.yaml`):

```yaml
apiVersion: core.cnrm.cloud.google.com/v1beta1
kind: ConfigConnector
metadata:
  # the name is restricted to ensure that there is only ConfigConnector resource installed in your cluster
  name: configconnector.core.cnrm.cloud.google.com
spec:
  mode: namespaced
  stateIntoSpec: Absent
```

```bash
kubectl apply -f configconnector.yaml
```

### Namespaced mode: per namespace

Repeat for every namespace Config Connector should create resources from. The project where you install Config Connector is the host project; other projects are managed projects (they can be the same).

```bash
kubectl create namespace NAMESPACE
```

```bash
gcloud iam service-accounts create NAMESPACE_GSA --project HOST_PROJECT_ID
```

```bash
gcloud projects add-iam-policy-binding MANAGED_PROJECT_ID \
    --member="serviceAccount:NAMESPACE_GSA@HOST_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/owner"
```

```bash
gcloud iam service-accounts add-iam-policy-binding \
    NAMESPACE_GSA@HOST_PROJECT_ID.iam.gserviceaccount.com \
    --member="serviceAccount:HOST_PROJECT_ID.svc.id.goog[cnrm-system/cnrm-controller-manager-NAMESPACE]" \
    --role="roles/iam.workloadIdentityUser"
```

```bash
gcloud projects add-iam-policy-binding HOST_PROJECT_ID \
    --member="serviceAccount:NAMESPACE_GSA@HOST_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/monitoring.metricWriter"
```

`configconnectorcontext.yaml` (one `ConfigConnectorContext` per namespace):

```yaml
apiVersion: core.cnrm.cloud.google.com/v1beta1
kind: ConfigConnectorContext
metadata:
  # you need one ConfigConnectorContext per namespace
  name: configconnectorcontext.core.cnrm.cloud.google.com
  namespace: NAMESPACE
spec:
  googleServiceAccount: "NAMESPACE_GSA@HOST_PROJECT_ID.iam.gserviceaccount.com"
  stateIntoSpec: Absent
```

```bash
kubectl apply -f configconnectorcontext.yaml
```

```bash
kubectl get serviceaccount/cnrm-controller-manager-NAMESPACE  -n cnrm-system
```

```bash
kubectl wait -n cnrm-system \
    --for=condition=Ready pod \
    -l cnrm.cloud.google.com/component=cnrm-controller-manager \
    -l cnrm.cloud.google.com/scoped-namespace=NAMESPACE
```

### Stop managing resources in a namespace

List resources, delete each one, then delete the `ConfigConnectorContext`. Do not delete the `ConfigConnectorContext` until all Config Connector-managed resources are deleted.

```bash
kubectl get gcp -n NAMESPACE
```

```bash
kubectl delete -n NAMESPACE KIND NAME
```

```bash
kubectl delete -n NAMESPACE ConfigConnectorContext configconnectorcontext.core.cnrm.cloud.google.com
```

### Uninstall (namespaced mode)

```bash
kubectl delete ConfigConnectorContext --all -A --wait=false
```

```bash
kubectl delete ConfigConnector configconnector.core.cnrm.cloud.google.com \
    --wait=true
```

```bash
kubectl delete -f operator-system/configconnector-operator.yaml  --wait=true
```

### Cluster mode

Create the identity (once per cluster):

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

Choose where resources are created by annotating a namespace (project shown; the source also shows `cnrm.cloud.google.com/folder-id=FOLDER_ID` and `cnrm.cloud.google.com/organization-id=ORGANIZATION_ID`):

```bash
kubectl annotate namespace \
NAMESPACE cnrm.cloud.google.com/project-id=PROJECT_ID
```

```bash
kubectl wait -n cnrm-system \
      --for=condition=Ready pod --all
```

Uninstall (cluster mode) uses the same two commands as the namespaced-mode uninstall above, without the `ConfigConnectorContext` deletion.

### Upgrade

```bash
gcloud storage cp gs://configconnector-operator/latest/release-bundle.tar.gz release-bundle.tar.gz
tar zxvf release-bundle.tar.gz
kubectl apply -f operator-system/configconnector-operator.yaml
```

### Upgrade from non-operator installations

Config Connector 1.33.0 and higher supports only the GKE add-on or the operator. Remove the system non-CRD components (keeping the CRDs and your resources), then install the add-on or the operator:

```bash
kubectl delete sts,deploy,po,svc,roles,clusterroles,clusterrolebindings --all-namespaces -l cnrm.cloud.google.com/system=true --wait=true
kubectl delete validatingwebhookconfiguration abandon-on-uninstall.cnrm.cloud.google.com --ignore-not-found --wait=true
kubectl delete validatingwebhookconfiguration validating-webhook.cnrm.cloud.google.com --ignore-not-found --wait=true
kubectl delete mutatingwebhookconfiguration mutating-webhook.cnrm.cloud.google.com --ignore-not-found --wait=true
```

### Switch from the add-on to manual installation

Disable the add-on without deleting any `ConfigConnector` or `ConfigConnectorContext` objects, then install the manual operator:

```bash
gcloud container clusters update CLUSTER_NAME --update-addons ConfigConnector=DISABLED
```

## Notes

- Namespaced mode is more scalable and gives better permission isolation; it is recommended for multi-tenant clusters and for managing resources across multiple projects. Avoid cluster mode in multi-tenant environments: it uses one shared IAM service account, and any user who can create Config Connector resources in any namespace acts with that service account's full IAM permissions. Cluster mode suits managing resources within a single project without needing permission separation.
- Broad roles: the namespaced identity step grants `roles/owner` on the managed project (the source says to use `roles/editor` instead if you prefer editor access; editor allows most functionality except project or organization wide configuration such as IAM modifications). The cluster-mode identity grants `roles/editor`, and the source recommends more granular permissions in production.
- Downgrade: fully downgrading is not supported; to downgrade the operator and CRDs you must uninstall, reinstall Config Connector, and re-apply your resources. In Config Connector 1.123.1 and later you can roll back the operator version for namespaced-mode installations by setting `spec.version` in the `ConfigConnectorContext` of each namespace to the previous version. The controller can be rolled back by a maximum of 3 minor versions, always to the latest patch version of a given minor version.
- Switching from the add-on: the chosen manual operator version must be the same or later than the add-on version you used, to prevent CRD validation errors such as `KNV2009: Invalid value: "v1beta1": must appear in spec.versions`. Disabling the add-on deletes the `namespace-id` `ConfigMap` in `configconnector-operator-system`, so old `cnrm-controller-manager` `StatefulSets` are recreated.
- The controller Pod can take several minutes to start. All steps must be repeated for every namespace in namespaced mode.
- Destructive: in "Stop managing resources", `kubectl delete -n NAMESPACE KIND NAME` deletes the Config Connector resource, and by default the Google Cloud resource too unless it has `cnrm.cloud.google.com/deletion-policy: abandon` (see [managing-deleting-resources.md](./managing-deleting-resources.md)). Try the deletion and uninstall steps on a disposable project first.
- The source downloads the operator bundle from the unpinned `latest` path (`gs://configconnector-operator/latest/release-bundle.tar.gz`) and gives no checksum.
- Source: https://docs.cloud.google.com/config-connector/docs/how-to/install-manually (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [installation-types.md](./installation-types.md)
- [install-upgrade-uninstall.md](./install-upgrade-uninstall.md)
- [getting-started.md](./getting-started.md)
- [organizing-resources-overview.md](./organizing-resources-overview.md)
