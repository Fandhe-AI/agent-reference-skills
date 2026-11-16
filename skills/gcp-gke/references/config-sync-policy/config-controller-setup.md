---
source: https://docs.cloud.google.com/kubernetes-engine/config-controller/docs/setup
---

# Set up Config Controller

Config Controller provides a managed, Kubernetes-based control plane pre-installed with Policy Controller, Config Sync, and Config Connector, so Google Cloud resources can be managed with Kubernetes tooling and GitOps. This page covers creating, confirming, configuring, and deleting an instance.

## Signature / Usage

### Before you begin

```bash
gcloud components install kubectl
```

```bash
gcloud config set project PROJECT_ID
```

```bash
gcloud services enable krmapihosting.googleapis.com \
    container.googleapis.com  \
    cloudresourcemanager.googleapis.com \
    serviceusage.googleapis.com
```

### Create an instance

Autopilot-backed (creation can take up to 15 minutes; control plane exposed on the internal endpoint only):

```bash
gcloud anthos config controller create CONFIG_CONTROLLER_NAME \
    --location=LOCATION \
    --full-management
```

Standard-backed (more customization options):

```bash
gcloud anthos config controller create CONFIG_CONTROLLER_NAME \
    --location=LOCATION
```

### Confirm the instance

Status should be `RUNNING` (`CREATING` means wait; `ERROR` means contact Google Cloud Support):

```bash
gcloud anthos config controller list --location=LOCATION
```

```bash
gcloud anthos config controller get-credentials CONFIG_CONTROLLER_NAME \
    --location LOCATION
```

### Configure Config Connector

Grant the Config Controller service account permissions to manage resources:

```bash
export SA_EMAIL="$(kubectl get ConfigConnectorContext -n config-control \
    -o jsonpath='{.items[0].spec.googleServiceAccount}' 2> /dev/null)"
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member "serviceAccount:${SA_EMAIL}" \
    --role "ROLE" \
    --project PROJECT_ID
```

If that fails, check that controllers are ready:

```bash
kubectl wait pod --all --all-namespaces --for=condition=Ready
```

### Configure Policy Controller

Allow Policy Controller to send metrics (`PROJECT_ID` is the cluster's project ID):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:PROJECT_ID.svc.id.goog[gatekeeper-system/gatekeeper-admin]" \
  --role=roles/monitoring.metricWriter
```

### Configure Config Sync

To sync from an external repository such as GitHub, set up Cloud NAT with GKE first (private cluster nodes have no outbound internet access). Save one manifest as `root-sync.yaml`.

Git (the source also has an OCI variant, see Notes):

```yaml
# root-sync.yaml
apiVersion: configsync.gke.io/v1beta1
kind: RootSync
metadata:
  name: ROOT_SYNC_NAME
  namespace: config-management-system
spec:
  sourceType: git
  sourceFormat: unstructured
  git:
    repo: ROOT_REPOSITORY
    revision: ROOT_REVISION
    branch: ROOT_BRANCH
    dir: ROOT_DIRECTORY
    auth: ROOT_AUTH_TYPE
    gcpServiceAccountEmail: ROOT_EMAIL
    secretRef:
      name: ROOT_SECRET_NAME
    noSSLVerify: ROOT_NO_SSL_VERIFY
    caCertSecretRef:
      name: ROOT_CA_CERT_SECRET_NAME
```

Helm:

Adapted (not in the official docs): the Helm manifest's `gcpServiceAccountEmail` and `secretRef` were indented under `auth` (invalid YAML for a scalar value); they are moved to the same level as `auth` under `helm`.

```yaml
# root-sync.yaml
apiVersion: configsync.gke.io/v1beta1
kind: RootSync
metadata:
  name: ROOT_SYNC_NAME
  namespace: config-management-system
spec:
  sourceType: helm
  sourceFormat: unstructured
  helm:
    repo: ROOT_HELM_REPOSITORY
    chart: HELM_CHART_NAME
    version: HELM_CHART_VERSION
    releaseName: HELM_RELEASE_NAME
    namespace: HELM_RELEASE_NAMESPACE
    values:
      foo:
        bar: VALUE_1
      baz:
      - qux: VALUE_2
        xyz: VALUE_3
    includeCRDs: HELM_INCLUDE_CRDS
    auth: ROOT_AUTH_TYPE
    gcpServiceAccountEmail: ROOT_EMAIL
    secretRef:
      name: ROOT_SECRET_NAME
    caCertSecretRef:
      name: ROOT_CA_CERT_SECRET_NAME
```

Apply and verify:

```bash
kubectl apply -f root-sync.yaml
```

```bash
kubectl describe rootsync ROOT_SYNC_NAME -n config-management-system
```

### Delete an instance

Clean up all Config Connector resources first; deleting the instance beforehand leaves them abandoned (still existing and billed, but unmanaged).

```bash
gcloud anthos config controller delete \
    --location=LOCATION CONFIG_CONTROLLER_NAME
```

## Options / Props

| Placeholder | Description |
|-------------|-------------|
| `CONFIG_CONTROLLER_NAME` | Instance name |
| `LOCATION` | Location, for example `us-central1` |
| `ROLE` | Predefined or custom role for the Config Controller service account; the source mentions `roles/owner` only for non-production environments |
| `ROOT_REPOSITORY` | Git URL (HTTPS or SSH), required |
| `ROOT_REVISION` | Tag, full hash, or branch; default `HEAD` |
| `ROOT_BRANCH` | Default `master`; `revision` takes precedence if both are set |
| `ROOT_DIRECTORY` | Directory to sync; default `/` |
| `ROOT_AUTH_TYPE` (git) | `none`, `ssh`, `cookiefile`, `token`, `gcpserviceaccount`, `gcenode` (only without Workload Identity Federation for GKE); required |
| `ROOT_AUTH_TYPE` (oci) | `none`, `gcenode` (same condition), `gcpserviceaccount`; required |
| `ROOT_AUTH_TYPE` (helm) | `none`, `token`, `gcenode`, `gcpserviceaccount`; required |
| `ROOT_EMAIL` | GSA email when auth is `gcpserviceaccount` |
| `ROOT_SECRET_NAME` | Secret name (optional); public key must be added to the Git provider. For Helm, used with `token` |
| `ROOT_NO_SSL_VERIFY` | `true` disables SSL verification; default `false` |
| `ROOT_CA_CERT_SECRET_NAME` | Secret holding the CA certificate under key `cert` (optional) |
| `ROOT_IMAGE` | `LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/PACKAGE_NAME`; defaults to `latest`; `:TAG` or `@sha256:DIGEST` to pin |
| `HELM_CHART_VERSION` | Optional; latest if unset |
| `HELM_RELEASE_NAMESPACE` | Optional; default `config-management-system`; only applies to templates using `{{ .Release.Namespace }}` |
| `HELM_INCLUDE_CRDS` | Default `false` |

## Notes

- Limitations: instances are fully managed and can't be registered with a fleet; Arm architecture isn't supported.
- Don't edit, update, or delete the GKE cluster that backs the instance; it can damage the instance.
- OCI layers must be `tar` or `tar+gzip`; other formats aren't recognized and switching to one prunes managed resources without an error.
- `roles/owner` is a broad grant; prefer a predefined or custom role scoped to the resources to be managed. Use `PROJECT_ID` (not the project number) in these commands.
- `gcloud anthos config controller delete` is destructive; try it on a disposable instance first. Config Controller is upgraded automatically by Google.
- Policy Controller is deprecated (end of support December 31, 2027); see [policy-controller-deprecation.md](./policy-controller-deprecation.md).
- Corrected from the official docs: the Helm manifest had `auth: ROOT_AUTH_TYPE` followed by more deeply indented `gcpServiceAccountEmail: ROOT_EMAIL` and `secretRef:` lines.
- The source also shows an OCI `RootSync` manifest (`sourceType: oci`, `oci.image` / `dir` / `auth` / `gcpServiceAccountEmail` / `caCertSecretRef`); it is omitted here to keep the page short (the `ROOT_AUTH_TYPE (oci)` and `ROOT_IMAGE` rows above still apply).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller (retrieved 2026-11-16; states Policy Controller end of support on December 31, 2027)
- Source: https://docs.cloud.google.com/kubernetes-engine/config-controller/docs/setup (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [config-controller-overview.md](./config-controller-overview.md)
- [config-sync-sources-of-truth.md](./config-sync-sources-of-truth.md)
- [installing-config-sync.md](./installing-config-sync.md)
