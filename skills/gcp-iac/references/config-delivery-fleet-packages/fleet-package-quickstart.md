---
source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/tutorials/fleet-package-quickstart
---

# Deploy resources across a fleet (tutorial)

Tutorial that deploys Kubernetes manifests to a fleet of clusters with a fleet package: connect a GitHub repository to Cloud Build, create two GKE Autopilot clusters registered to a fleet, install Config Sync as a fleet default, and roll out an nginx Deployment. Billable components: GKE and Cloud Build (see the pricing pages).

## Signature / Usage

### Connect to Git

Create a GitHub repository named `fleet-package-tutorial` (the source keeps visibility **Public**), then in Cloud Build **Repositories (2nd gen)** create a host connection in region `us-central1` named `fleet-package-quickstart-connection` and link the repository. This is console-only in the source.

### Create clusters

```bash
gcloud container clusters create-auto cluster1 \
  --project=PROJECT_ID \
  --region=REGION \
  --fleet-project=PROJECT_ID \
  --release-channel=rapid
```

```bash
gcloud container clusters create-auto cluster2 \
  --project=PROJECT_ID \
  --region=REGION \
  --fleet-project=PROJECT_ID \
  --release-channel=rapid
```

Replace `REGION` with the region for the cluster, such as `us-central1`. Each cluster can take up to 15 minutes to create.

### Set up a service account for Cloud Build

Adapted (not in the official docs): `--project=PROJECT_ID` is added, as in the cluster commands, so the account is created in the project the role bindings below refer to.

```bash
gcloud iam service-accounts create "quickstart-service-account" --project=PROJECT_ID
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
   --member="serviceAccount:quickstart-service-account@PROJECT_ID.iam.gserviceaccount.com" \
   --role='roles/configdelivery.resourceBundlePublisher'
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
   --member="serviceAccount:quickstart-service-account@PROJECT_ID.iam.gserviceaccount.com" \
   --role='roles/logging.logWriter'
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
   --member="serviceAccount:quickstart-service-account@PROJECT_ID.iam.gserviceaccount.com" \
   --role='roles/artifactregistry.writer'
```

If prompted for a condition, select `None`.

### Commit a manifest and publish a release

Create `deployment.yaml` in the repository on `main`, then draft and publish a release with the new tag `v1.0.0`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - image: nginx:1.14.2
        name: nginx
        ports:
        - containerPort: 80
```

### Create the fleet package

`fleet-package.yaml` targets all clusters in the fleet (no cluster selector) and deploys the `deployment` variant derived from `deployment.yaml`:

```yaml
resourceBundleSelector:
  cloudBuildRepository:
    name: projects/PROJECT_ID/locations/us-central1/connections/fleet-package-quickstart-connection/repositories/REPOSITORY_NAME
    tag: v1.0.0
    serviceAccount: projects/PROJECT_ID/serviceAccounts/quickstart-service-account@PROJECT_ID.iam.gserviceaccount.com
    path:
    # Match all files (including deployment.yaml) to generate variants
    variantsPattern: "*.yaml"
target:
  fleet:
    project: projects/PROJECT_ID
rolloutStrategy:
  rolling:
    maxConcurrent: 1
variantSelector:
  # Explicitly match the variant generated from "deployment.yaml"
  variantNameTemplate: "deployment"
```

Replace `REPOSITORY_NAME` with the repository name from Cloud Build, usually `USERNAME-REPOSITORY_NAME`.

Adapted (not in the official docs): `--location=us-central1` is added; the tutorial never sets the `config_delivery/location` property.

```bash
gcloud container fleet packages create fp-nginx \
   --source=fleet-package.yaml \
   --project=PROJECT_ID \
   --location=us-central1
```

Adapted (not in the official docs): `--location=us-central1` and `--project=PROJECT_ID` are added, as in the create command.

```bash
gcloud container fleet packages list --location=us-central1 --project=PROJECT_ID
```

Because `maxConcurrent` is `1`, the service waits until `nginx-deployment` is fully deployed on one cluster before starting the second; `maxConcurrent: 2` or higher deploys to both simultaneously. Autopilot may show availability errors while it adjusts resource requests.

## Options / Props

| Item | Value |
|------|-------|
| Connection name | `fleet-package-quickstart-connection` |
| Connection / package region | `us-central1` only (fleet packages are Preview) |
| Service account | `quickstart-service-account` |
| Roles | `roles/configdelivery.resourceBundlePublisher`, `roles/logging.logWriter`, `roles/artifactregistry.writer` |
| Release tag | `v1.0.0` |
| Fleet package | `fp-nginx` |

## Notes

- Preview: the tutorial states "Fleet packages (Preview) supports only `us-central1`"; the Cloud Build connection and fleet package must be in the same region.
- Config Sync is installed as a fleet default in the Google Cloud console (Feature Manager, **Configure**, **Customize fleet settings**, then **Sync to fleet settings** for both clusters); this enables `anthosconfigmanagement.googleapis.com` if not already enabled. Wait until Config Sync shows as Installed.
- The source says to keep **Public** selected as the repository visibility.
- The project-level role bindings go to a dedicated service account.
- Corrected from the official docs: `gcloud container fleet packages create fp-nginx --source=fleet-package.yaml --project=PROJECT_ID` and `gcloud container fleet packages list` had no `--location`. The tutorial does not run `gcloud config set config_delivery/location us-central1` (the how-to page does), and gcloud 593.0.0 resolves the location only from `--location` or that property (`properties.VALUES.config_delivery.location.Get(required=True)`, no default), so the commands fail without it.
- Corrected from the official docs: `gcloud iam service-accounts create "quickstart-service-account"` and `gcloud container fleet packages list` had no `--project`, while the cluster commands pass `--project=PROJECT_ID` and the role bindings and `fleet-package.yaml` refer to `quickstart-service-account@PROJECT_ID.iam.gserviceaccount.com`; without it both commands use the default project of the gcloud configuration.
- Clean up: the tutorial deletes the whole project (everything in it is deleted and custom project IDs are lost) and the GitHub repository. Use a disposable project; deleting selected resources instead preserves project-ID-based URLs.
- The source also shows the Google Cloud console and GitHub UI steps; their click-paths are omitted.
- Source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/tutorials/fleet-package-quickstart (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-fleet-packages.md](./concepts-fleet-packages.md)
- [how-to-fleet-packages.md](./how-to-fleet-packages.md)
