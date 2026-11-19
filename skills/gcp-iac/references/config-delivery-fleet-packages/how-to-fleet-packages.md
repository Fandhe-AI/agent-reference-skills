---
source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/fleet-packages
---

# Deploy fleet packages

Use Config Sync fleet packages to deploy Kubernetes resources across clusters registered to a fleet. After a fleet package is created, clusters added to the fleet later automatically receive the Kubernetes configuration files from the Git repository. A `FleetPackage` is a declarative API that deploys raw Kubernetes manifests; the resources must be already hydrated (WET).

## Signature / Usage

### Before you begin

Prerequisites: a Git repository with the Kubernetes resources; the Google Cloud CLI (`gcloud`, `nomos`; run `gcloud components update` for the latest version; set the `compute/region` and `compute/zone` properties to avoid `One of [--zone, --region] must be supplied: Please specify location`); clusters registered to a fleet; a Cloud Build connection to a supported provider such as GitHub or GitLab (once per repository), located in `us-central1`; IAM roles granted to the user registering the cluster.

```bash
gcloud services enable anthosconfigmanagement.googleapis.com configdelivery.googleapis.com
```

```bash
gcloud config set config_delivery/location us-central1
```

The source also sets the fleet host project as the default project (`gcloud config set project PROJECT_ID`).

### Install Config Sync (gcloud)

```bash
gcloud beta container fleet config-management enable
```

Create `apply-spec.yaml`:

```yaml
applySpecVersion: 1
spec:
  configSync:
    enabled: true
```

```bash
gcloud beta container fleet config-management apply \
    --membership=MEMBERSHIP_NAME \
    --config=apply-spec.yaml
```

Replace `MEMBERSHIP_NAME` with the fleet membership name chosen at registration (`gcloud container fleet memberships list` shows it).

### Create a service account for Cloud Build

```bash
gcloud iam service-accounts create "SERVICE_ACCOUNT_NAME"
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
   --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" \
   --role='roles/configdelivery.resourceBundlePublisher'
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
   --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" \
   --role='roles/logging.logWriter'
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
   --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" \
   --role='roles/artifactregistry.writer'
```

If prompted for a condition, select `None`.

### Create a fleet package

`fleetpackage-spec.yaml`:

```yaml
resourceBundleSelector:
  cloudBuildRepository:
    name: projects/PROJECT_ID/locations/us-central1/connections/CONNECTION_NAME/repositories/REPOSITORY_NAME
    tag: TAG
    serviceAccount: projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
    path: CONFIG_FILE_PATH
    # Match all files and directories to generate variants
    variantsPattern: "*"
target:
  fleet:
    project: projects/PROJECT_ID
rolloutStrategy:
  rolling:
    maxConcurrent: MAX_CLUSTERS
variantSelector:
  variantNameTemplate: "VARIANT_NAME"
# set the state to SUSPENDED to pause new rollouts
# set the state back to ACTIVE to resume rollouts
# state: SUSPENDED
```

```bash
gcloud container fleet packages create FLEET_PACKAGE_NAME \
    --source=fleetpackage-spec.yaml
```

```bash
gcloud container fleet packages list
```

After a few seconds the `MESSAGES` field shows `Build status: WORKING`; when the build trigger completes, the package's `STATE` is `ACTIVE` and `ACTIVE_ROLLOUT` names the rollout.

### Update a fleet package

Edit the spec (for example `maxConcurrent`, `state: SUSPENDED`, or `tag`), then:

```bash
gcloud container fleet packages update FLEET_PACKAGE_NAME \
    --source=fleetpackage-spec.yaml
```

### Inspect resource bundles and releases

```bash
gcloud container fleet packages resource-bundles describe flpkg-rb-FLEET_PACKAGE_NAME
```

```bash
gcloud container fleet packages resource-bundles releases list \
    --resource-bundle flpkg-rb-FLEET_PACKAGE_NAME
```

```bash
gcloud container fleet packages resource-bundles releases describe RELEASE_NAME\
    --resource-bundle flpkg-rb-FLEET_PACKAGE_NAME
```

### Manage rollouts

```bash
gcloud container fleet packages rollouts list --fleet-package FLEET_PACKAGE_NAME
```

```bash
gcloud container fleet packages rollouts describe ROLLOUT_NAME --fleet-package FLEET_PACKAGE_NAME
```

```bash
gcloud container fleet packages rollouts suspend ROLLOUT_NAME --fleet-package FLEET_PACKAGE_NAME
```

```bash
gcloud container fleet packages rollouts resume ROLLOUT_NAME --fleet-package FLEET_PACKAGE_NAME
```

```bash
gcloud container fleet packages rollouts abort ROLLOUT_NAME --fleet-package FLEET_PACKAGE_NAME
```

### Deploy to a subset of clusters

Fleet packages support only fleet membership labels; GKE cluster labels are not supported. Optionally add labels to each membership (`gcloud container fleet memberships list` shows the names):

```bash
gcloud container fleet memberships update MEMBERSHIP_NAME \
    --update-labels=KEY=VALUE
```

Then add `target.fleet.selector.matchLabels` with `KEY: "VALUE"` to the spec (a complete example is under "Deployment to a subset of clusters" in [concepts-fleet-packages.md](./concepts-fleet-packages.md)) and create or update the fleet package with the commands above.

### Deploy variant resources to clusters

Adapted (not in the official docs): the source repeats `target:` twice and mis-indents `variantSelector:`; the duplicate block is removed and `variantNameTemplate` is nested under a top-level `variantSelector`.

```yaml
resourceBundleSelector:
  cloudBuildRepository:
    name: projects/PROJECT_ID/locations/us-central1/connections/CONNECTION_NAME/repositories/REPOSITORY_NAME
    tag: TAG
    serviceAccount: projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
    path: CONFIG_FILE_PATH
    variantsPattern: VARIANT_PATTERN
target:
  fleet:
    project: projects/PROJECT_ID
rolloutStrategy:
  rolling:
    maxConcurrent: MAX_CLUSTERS
variantSelector:
  variantNameTemplate: VARIANT_NAME_TEMPLATE
```

### Delete a fleet package

```bash
gcloud container fleet packages delete FLEET_PACKAGE_NAME --force
```

## Options / Props

### Placeholders

| Placeholder | Description |
|-------------|-------------|
| `SERVICE_ACCOUNT_NAME` | Alphanumeric ID, 6 to 30 characters (for example `my-service-account`); the name can't be changed after creation. |
| `CONNECTION_NAME` | Name chosen when connecting the Git host to Cloud Build (`gcloud builds connections list`). |
| `REPOSITORY_NAME` | Repository name; identical to the value entered in the Cloud Build connection. |
| `TAG` | Git tag; must be a full semantic version with major, minor and patch (`v1.0.0` is valid; `v1` and `v1.0` are invalid). |
| `CONFIG_FILE_PATH` | Path to the Kubernetes resources in the repository; omit if files are at the repository root. |
| `MAX_CLUSTERS` | Maximum number of clusters deployed to at one time (`1` deploys one cluster at a time). |
| `VARIANT_NAME` | Variant to deploy; must match a filename without extension or a directory name (`prod.yaml` gives `prod`). For default behavior set `default` and keep a `default.yaml` in the repository. |
| `VARIANT_PATTERN` | Glob such as `*` (all files and directories) or `*.yaml` (files only). |
| `VARIANT_NAME_TEMPLATE` | String or template such as `${membership.labels['env']}` or `${membership.location}`. |
| `KEY` / `VALUE` | Membership label. Keys must start with a lowercase character and contain only hyphens, underscores, lowercase characters and numbers; values only hyphens, underscores, lowercase characters and numbers. An existing label's value is modified. |
| `RELEASE_NAME` | Release name from the `releases list` output. |
| `FLEET_PACKAGE_NAME` | Package name; the resource bundle name is automatically prefixed with `flpkg-rb-`. |

### Service account roles

| Role | Purpose |
|------|---------|
| `roles/configdelivery.resourceBundlePublisher` | Resource Bundle Publisher; fetch resources from Git |
| `roles/logging.logWriter` | Logs Writer |
| `roles/artifactregistry.writer` | Artifact Registry Writer |

### Rollout states

| State | Meaning |
|-------|---------|
| `SUSPENDED` | Ongoing rollout suspended; in-progress package updates continue, no further updates are scheduled. |
| `IN_PROGRESS` | State of a resumed rollout; updates deploy to target clusters as planned. |
| `ABORTED` | Cancelled rollout; all pending package updates are cancelled. |

## Notes

- The Cloud Build connection and the `FleetPackage` must be in `us-central1`; the `ConfigDelivery` API is available only there.
- A `state: SUSPENDED` fleet package lets in-progress rollouts continue and creates no new rollouts until set back to `ACTIVE`.
- Destructive: `gcloud container fleet packages delete ... --force` also deletes the Kubernetes resources deployed on your clusters and the rollout history. Try it on a disposable project first.
- The three role bindings are project-level grants to a dedicated service account.
- Ensure `variantsPattern` yields unique variant names; a collision such as `app1/deploy.yaml` and `app2/deploy.yaml` (both `deploy`) might fail the rollout.
- Dropped block: the source's label-selector spec places `KEY: "VALUE"` at column 0 after `matchLabels:`, so it is not valid YAML as printed; the concepts page's `country: "us"` example shows the same selector.
- Corrected from the official docs: the variants spec repeats `target:` / `fleet:` / `project: projects/PROJECT_ID` after `rolloutStrategy` (a duplicate key), then has ` variantSelector:` indented by one space and `variantNameTemplate: VARIANT_NAME_TEMPLATE` at column 0; the duplicate block is removed and `variantNameTemplate` is nested under a top-level `variantSelector`.
- The source also shows the Google Cloud console for installing Config Sync; the troubleshooting section only links to Cloud Build troubleshooting.
- The gcloud command group is generated in `gcp-gke`; this page covers the concepts and workflow. The `FleetPackage` field reference is at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/reference/rest.
- Source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/fleet-packages (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-fleet-packages.md](./concepts-fleet-packages.md)
- [fleet-package-quickstart.md](./fleet-package-quickstart.md)
