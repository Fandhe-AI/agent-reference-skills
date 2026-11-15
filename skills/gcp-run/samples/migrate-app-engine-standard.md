---
source: https://docs.cloud.google.com/appengine/migration-center/run/migrate-app-engine-standard-to-run
---

# Migrate an App Engine Standard App to Cloud Run (Preview)

Check an App Engine standard app for incompatible `app.yaml` settings, then deploy a replica to Cloud Run with `gcloud beta app migrate-to-run` and test it privately.

## Signature / Usage

Pre-GA terms apply. The new Cloud Run service is a replica; the existing App Engine app and its traffic are not affected. Enable the Cloud Run Admin API and Artifact Registry API.

### 1. Set up gcloud

```bash
gcloud auth login
gcloud config set project PROJECT_ID
gcloud config set run/region REGION
gcloud components update
```

### 2. Check for incompatible features (run where `app.yaml` is located)

```bash
gcloud beta app migrate-to-run --dry-run
```

### 3. Grant Cloud Run Builder to the Cloud Build service account

Replace `PROJECT_NUMBER` with the project number; propagation takes a couple of minutes.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
    --role=roles/run.builder
```

### 4. Migrate from the local `app.yaml` (recommended)

This generates `service.yaml` next to `app.yaml`; at `Proceed with the deployment?` enter `Y` to build from source and deploy.

```bash
gcloud beta app migrate-to-run
```

If `app.yaml` is elsewhere, or to generate `service.yaml` without deploying:

```bash
gcloud beta app migrate-to-run --appyaml=PATH
```

```bash
gcloud beta app migrate-to-run --export-only=EXPORT_PATH
```

### 5. Or reuse a previously built image

In this step `SERVICE` is the App Engine service name and `VERSION` its version ID. This does not capture local `app.yaml` changes.

```bash
gcloud beta app migrate-to-run --service=SERVICE --version=VERSION --from-image
```

### 6. Test privately

In this step `SERVICE` is the new Cloud Run service (the name the migration created or printed), not the App Engine service. The service is private by default, so its URL returns `403 Forbidden`. Proxy it to localhost with your own identity:

```bash
gcloud run services proxy SERVICE --project PROJECT-ID
```

## Options / Props

| `app.yaml` setting | Solution |
|---|---|
| `inbound_services: - warmup` | Delete; use startup probes or minimum instances |
| `error_handlers` | Delete; handle errors in code or at Cloud Load Balancing |
| `handlers` | Delete, or keep only a catch-all (`url: /.*` with `script: auto`); route in code or the load balancer |
| `build_env_variables` | Delete; set build env vars at source deploy or runtime env vars on the service |
| `basic_scaling` | Warning; `max_instances` becomes Cloud Run maximum instances |
| `app_engine_apis: true` | Delete; migrate to Google Cloud APIs or alternatives |
| First-generation runtimes (for example `python27`) | Upgrade to a supported second-generation runtime first |

Limits that raise a warning when exceeded: 8 vCPUs, memory 512 MiB to 32 GiB, 1,000 instances, 1,000 concurrent requests per instance.

| Account | Roles |
|---|---|
| Deployer (from source) | `roles/run.sourceDeveloper`, `roles/serviceusage.serviceUsageConsumer` on the project; `roles/iam.serviceAccountUser` on the service identity |
| Deployer (previously built image) | `roles/appengine.deployer`, `roles/run.developer`, `roles/artifactregistry.reader`, `roles/iam.serviceAccountUser` |
| Cloud Build service account | `roles/run.builder` |

## Notes

- Preview: pre-GA features are offered "as is" with limited support. Cloud Run services are private by default (App Engine services are public by default) and use the `run.app` domain.
- Cloud Run service identity: the source lets you create a new service account or use the same user-managed service account in Cloud Run that you use for the App Engine standard environment.
- Cloud Build service account: it defaults to the Compute Engine default service account, and `gcloud beta app migrate-to-run` has no flag to choose another build service account (see https://docs.cloud.google.com/sdk/gcloud/reference/beta/app/migrate-to-run). Restrict that account's roles instead: the source recommends enforcing the `iam.automaticIamGrantsForDefaultServiceAccounts` organization policy constraint and replacing the Editor role with narrower roles on default service accounts.
- Source: https://docs.cloud.google.com/appengine/migration-center/run/migrate-app-engine-standard-to-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/authenticating/developers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-service-from-source.md](./deploy-service-from-source.md)
- [gradual-rollout-with-tags.md](./gradual-rollout-with-tags.md)
- Flexible environment: https://docs.cloud.google.com/appengine/migration-center/run/migrate-app-engine-flexible-to-run
