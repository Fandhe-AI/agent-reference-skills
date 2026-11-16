---
source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/installing-config-sync
---

# Install Config Sync with custom settings

Advanced installation and configuration of Config Sync: install on individual clusters (Google Cloud console, Google Cloud CLI, or Terraform), configure the root repository (source type, format, authentication), and verify the result. When installed via console or gcloud, Config Sync automatically creates a RootSync named `root-sync`.

## Signature / Usage

### Install with gcloud

All clusters must be registered to a fleet first. Enable the `ConfigManagement` fleet feature:

```bash
gcloud beta container fleet config-management enable
```

Create `apply-spec.yaml`. You can set only `spec.configSync.enabled: true` and configure sources later with `kubectl`.

```yaml
# apply-spec.yaml

     applySpecVersion: 1
     spec:
       configSync:
         enabled: true
         # If you don't have a source of truth yet, omit the
         # following fields. You can configure them later.
         sourceType: SOURCE_TYPE
         sourceFormat: FORMAT
         syncRepo: REPO
         syncRev: REVISION
         secretType: SECRET_TYPE
         gcpServiceAccountEmail: EMAIL
         metricsGcpServiceAccountEmail: METRICS_EMAIL
         policyDir: DIRECTORY
         preventDrift: false
```

Apply it to a membership:

```bash
gcloud beta container fleet config-management apply \
    --membership=MEMBERSHIP_NAME \
    --config=CONFIG_YAML_PATH \
    --project=PROJECT_ID
```

Find the membership name with `gcloud container fleet memberships list`.

### Override resource requests and limits

Use `deploymentOverrides` (only for Deployments that are not root/namespace reconcilers, and only requests/limits, not replicas):

```yaml
applySpecVersion: 1
spec:
  configSync:
    enabled: true
    # ... other fields...
    deploymentOverrides:
    - name: reconciler-manager
      namespace: config-management-system
      containers:
      - name: reconciler-manager
        cpuRequest: 50m
        cpuLimit: 100m
        memoryRequest: 256Mi
        memoryLimit: 512Mi
```

```bash
gcloud beta container fleet config-management apply \
    --membership=MEMBERSHIP_NAME \
    --config=apply-spec.yaml \
    --project=PROJECT_ID
```

For reconcilers use `spec.override.resources` on the RootSync/RepoSync.

### Verify the installation

```bash
nomos status
```

A successful installation shows `SYNCED` or `PENDING`. In the console, the **Packages** tab shows **Installed** and, for a configured source, **Synced**.

## Options / Props

| Field / placeholder | Description |
|---------------------|-------------|
| `SOURCE_TYPE` | `git`, `oci`, or `helm`; default `git` |
| `FORMAT` | `unstructured` or `hierarchy` (case-sensitive); default `hierarchy`, `unstructured` recommended |
| `REPO` | Source URL (required). Git/Helm URLs use HTTPS or SSH (no protocol means HTTPS; use SSH URL with `ssh` secret type). OCI: `LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/PACKAGE_NAME`, defaults to the `latest` tag; pin with `:TAG` or `@sha256:DIGEST` |
| `REVISION` | Git tag, full hash (not abbreviated), or branch |
| `SECRET_TYPE` (git) | `none`, `ssh`, `cookiefile`, `token`, `gcpserviceaccount` (needs an IAM policy binding afterwards), `gcenode` (only if Workload Identity Federation for GKE is not enabled), `githubapp` |
| `SECRET_TYPE` (oci) | `none`, `token`, `gcenode` (Compute Engine default service account; only without Workload Identity Federation for GKE), `gcpserviceaccount` |
| `SECRET_TYPE` (helm) | `token`, `gcenode`, `gcpserviceaccount` |
| `EMAIL` | Google service account email when `secretType` is `gcpserviceaccount`, for example `acm@PROJECT_ID.iam.gserviceaccount.com` |
| `METRICS_EMAIL` | GSA for exporting metrics to Cloud Monitoring; needs `roles/monitoring.metricWriter`; the KSA `default` in `config-management-monitoring` must be bound to it |
| `DIRECTORY` | Directory to sync, relative to the repository root; default is the root |
| `preventDrift` | Enables the admission webhook (drift prevention) |

## Notes

- Limitation: `helm` as source type can't be configured through the Google Cloud console or CLI; use the Kubernetes API or declare it in another source of truth.
- Private sources: grant Config Sync read-only access (Git, or OCI/Helm); public sources need nothing. Review cluster requirements before installing.
- OCI layers must be compressed as `tar` or `tar+gzip`; other formats (for example `tar+bz2`) aren't recognized, and switching from a valid repo to an unsupported OCI image prunes managed resources without an error.
- Console "Deploy Package" sets Cluster scoped sync (creates a RootSync) or Namespace scoped sync (creates a RepoSync). For OCI only Workload Identity authentication is selectable in the console. Helm charts require the Google Cloud CLI.
- Terraform uses `google_gke_hub_feature_membership` with `configmanagement` / `config_sync` blocks; `enabled = true` is required (introduced in Terraform provider 5.41.0).
- The source also shows Console and Terraform; they're omitted here. The `apply-spec.yaml` block is verbatim (including its source indentation).
- Source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/installing-config-sync (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [config-sync-architecture.md](./config-sync-architecture.md)
- [config-sync-sources-of-truth.md](./config-sync-sources-of-truth.md)
- [config-sync-configs.md](./config-sync-configs.md)
