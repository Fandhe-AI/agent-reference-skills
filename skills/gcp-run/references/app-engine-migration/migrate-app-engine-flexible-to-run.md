---
source: https://docs.cloud.google.com/appengine/migration-center/run/migrate-app-engine-flexible-to-run
---

# Deploy an existing App Engine flexible app to Cloud Run (Preview)

Deploy an existing flexible environment app to Cloud Run with `gcloud beta app migrate-to-run`, building from the local source and `app.yaml`. The new Cloud Run service is a replica and does not affect the existing App Engine app or its traffic. Pre-GA terms apply.

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

### Deploy using the local `app.yaml`

```bash
gcloud beta app migrate-to-run
```

This generates `service.yaml` next to `app.yaml`. At the prompt `Proceed with the deployment?` enter `Y` to build from source and deploy. If `app.yaml` is elsewhere:

```bash
gcloud beta app migrate-to-run --appyaml=PATH
```

Generate `service.yaml` without deploying:

```bash
gcloud beta app migrate-to-run --export-only=EXPORT_PATH
```

### Test the service

The service is private by default, so opening its URL returns `403 Forbidden`. Test privately with `gcloud run services proxy` (recommended) or enable public access.

## Options / Props

### Required roles

| Account | Roles |
|---|---|
| Deployer | `roles/run.sourceDeveloper`, `roles/serviceusage.serviceUsageConsumer` on the project; `roles/iam.serviceAccountUser` on the Cloud Run service identity |
| Cloud Build service account (Compute Engine default unless overridden) | `roles/run.builder` |

### Incompatible features and solutions

| `app.yaml` setting | Solution |
|---|---|
| `inbound_services: - warmup` | Delete it. Cloud Run warms instances via the container entrypoint; use startup probes or minimum instances if needed. |
| `error_handlers` | Delete it; handle errors in app code, or configure custom error responses at Cloud Load Balancing. |
| `handlers` | Delete the section. Serve static files from the service or Cloud Storage; route in app code or Cloud Load Balancing. |
| `build_env_variables` | Migration hub reports it as blocking; the gcloud command does not and applies it to the source build. Delete it; set build environment variables when deploying from source, or runtime environment variables on the service. |
| `basic_scaling` | Replace with `automatic_scaling` or `manual_scaling`; Migration hub blocks versions that use basic scaling. |
| Values outside Cloud Run limits | Warning when outside: CPU 8 vCPUs; memory 512 MiB to 32 GiB; minimum, maximum or manual instances 1,000; concurrent requests per instance 1,000. More than 1,000 instances requires a quota increase. |
| `network.forwarded_ports` with host mappings, protocols or multiple ports (for example `8080:8000`, `2222/udp`) | Specify only one numeric container port such as `8080`, or delete `forwarded_ports` and configure the container port in Cloud Run. Cloud Run accepts only inbound TCP on a single port; `/tcp` or `/udp` suffixes and host mappings fail the migration; with multiple ports only the first is configured. |
| `resources.disk_size_gb` | Delete it (warning, ignored). Cloud Run defaults to an in-memory file system, so file writes consume memory; use an ephemeral disk volume mount or Cloud Storage volume mount to avoid OOM. |

## Notes

- Preview: pre-GA features are offered "as is" with limited support.
- Cloud Run services are private by default (App Engine services are public by default); services use the `run.app` domain.
- The Cloud Build service account defaults to the Compute Engine default service account; the source allows a new or the same user-managed service account for Cloud Run, and recommends enforcing the `iam.automaticIamGrantsForDefaultServiceAccounts` organization policy constraint and replacing the Editor role with narrower roles on default service accounts. Prefer a dedicated user-managed service account.
- Unlike the standard guide there is no previously-built-image strategy for flexible apps.
- The source also shows Console (Migration hub) steps; not reproduced.
- Source: https://docs.cloud.google.com/appengine/migration-center/run/migrate-app-engine-flexible-to-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [compare-gae-with-run.md](./compare-gae-with-run.md)
- [migrate-app-engine-standard-to-run.md](./migrate-app-engine-standard-to-run.md)
