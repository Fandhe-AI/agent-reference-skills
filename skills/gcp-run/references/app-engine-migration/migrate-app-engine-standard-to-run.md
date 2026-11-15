---
source: https://docs.cloud.google.com/appengine/migration-center/run/migrate-app-engine-standard-to-run
---

# Deploy an existing App Engine standard app to Cloud Run (Preview)

Deploy an existing standard environment app (second-generation runtimes that do not use legacy bundled services) to Cloud Run with `gcloud beta app migrate-to-run`. The new Cloud Run service is a replica that does not affect the existing App Engine app or its traffic. Pre-GA terms apply.

## Signature / Usage

### Before you begin

```bash
gcloud auth login
gcloud config set project PROJECT_ID
gcloud config set run/region REGION
gcloud components update
```

Replace `PROJECT_ID` with your project ID and `REGION` with the Cloud Run region. Enable the Cloud Run Admin API and Artifact Registry API.

### Check for incompatible features (run where `app.yaml` is located)

```bash
gcloud beta app migrate-to-run --dry-run
```

### Grant the Cloud Run Builder role to the Cloud Build service account

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
    --role=roles/run.builder
```

Replace `PROJECT_NUMBER` with the project number and `PROJECT_ID` with the project ID. Propagation takes a couple of minutes.

### Strategy 1 (recommended): use the local `app.yaml`

```bash
gcloud beta app migrate-to-run
```

This generates `service.yaml` next to `app.yaml`. At the prompt `Proceed with the deployment?` enter `Y` to build from source and deploy.

If `app.yaml` is elsewhere:

```bash
gcloud beta app migrate-to-run --appyaml=PATH
```

Generate `service.yaml` without deploying:

```bash
gcloud beta app migrate-to-run --export-only=EXPORT_PATH
```

### Strategy 2: use a previously built image

```bash
gcloud beta app migrate-to-run --service=SERVICE --version=VERSION --from-image
```

`SERVICE` is the App Engine service name and `VERSION` its version ID. This uses the image of the active deployment and does not capture local `app.yaml` changes. Export only:

```bash
gcloud beta app migrate-to-run --service=SERVICE \
    --version=VERSION \
    --from-image \
    --export-only=EXPORT_PATH
```

### Test the service

The service is private by default, so opening its URL returns `403 Forbidden`. Test privately with `gcloud run services proxy` (recommended) or enable public access.

## Options / Props

### Required roles

| Account | Roles |
|---|---|
| Deployer (build and deploy from source) | `roles/run.sourceDeveloper`, `roles/serviceusage.serviceUsageConsumer` on the project; `roles/iam.serviceAccountUser` on the Cloud Run service identity |
| Cloud Build service account (Compute Engine default unless overridden) | `roles/run.builder` |
| Deployer (previously built image) | `roles/appengine.deployer` (contains `appengine.versions.exportAppImage`), `roles/run.developer`, `roles/artifactregistry.reader`, `roles/iam.serviceAccountUser` on the Cloud Run service identity |
| Optional: view cost savings in Migration hub | `recommender.appengineVersionCostRecommendations.list` (in App Engine Deployer and `roles/appengine.appViewer`) |

### Incompatible features and solutions

| `app.yaml` setting | Solution |
|---|---|
| `inbound_services: - warmup` | Delete it. Cloud Run warms instances via the container entrypoint; use startup probes or minimum instances if needed. |
| `error_handlers` | Delete it; handle errors in app code, or configure custom error responses at Cloud Load Balancing. |
| `handlers` (URL and static file handlers) | Delete, or keep only a catch-all (`url: /.*` or `url: .*` with `script: auto`). Serve static files from the service or Cloud Storage; route in app code or Cloud Load Balancing. |
| `build_env_variables` | Migration hub reports it as blocking; the gcloud command does not report it and applies it to the source build. Delete it; set build environment variables when deploying from source, or runtime environment variables on the service. |
| `basic_scaling` | Warning; `max_instances` is used as Cloud Run's maximum instances. Verify Cloud Run autoscaling suffices. |
| Values outside Cloud Run limits | Warning when outside: CPU 8 vCPUs; memory 512 MiB to 32 GiB; minimum, maximum or manual instances 1,000; concurrent requests per instance 1,000. More than 1,000 instances requires a quota increase. |
| `app_engine_apis: true` (bundled services) | Delete; migrate to Google Cloud APIs or third-party alternatives. |
| First-generation runtimes (for example `runtime: python27`) | Upgrade to a supported second-generation runtime first. |

## Notes

- Preview: pre-GA features are offered "as is" with limited support.
- Cloud Run services are private by default (App Engine services are public by default); services use the `run.app` domain.
- The Cloud Build service account defaults to the Compute Engine default service account; the source allows a new or the same user-managed service account for Cloud Run, and recommends enforcing the `iam.automaticIamGrantsForDefaultServiceAccounts` organization policy constraint and replacing the Editor role with narrower roles on default service accounts. Prefer a dedicated user-managed service account.
- The source also shows Console (Migration hub) steps; not reproduced.
- Source: https://docs.cloud.google.com/appengine/migration-center/run/migrate-app-engine-standard-to-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [compare-gae-with-run.md](./compare-gae-with-run.md)
- [migrate-app-engine-flexible-to-run.md](./migrate-app-engine-flexible-to-run.md)
