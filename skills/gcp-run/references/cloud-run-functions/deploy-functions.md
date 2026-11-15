---
source: https://docs.cloud.google.com/run/docs/deploy-functions
---

# Deploy Cloud Run functions

Deploy and modify a Cloud Run function from the console, gcloud CLI, or Terraform. Deployments use Google Cloud's buildpacks and Cloud Build to build container images from source (no local Docker needed) and store them in Artifact Registry, which auto-creates the `cloud-run-source-deploy` repository if the project has none with that name.

## Signature / Usage

### Enable APIs

```bash
gcloud services enable artifactregistry.googleapis.com \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    logging.googleapis.com
```

Optionally, enable the Eventarc API to use event triggers:

```bash
gcloud services enable eventarc.googleapis.com
```

### Grant Cloud Run Builder to the Cloud Build service account

Cloud Build uses the Compute Engine default service account by default. Replace `PROJECT_NUMBER` with your project number and `PROJECT_ID` with your project ID. The grant takes a couple of minutes to propagate.

```bash
  gcloud projects add-iam-policy-binding PROJECT_ID \
      --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
      --role=roles/run.builder
```

### Deploy a function (gcloud)

```bash
gcloud components update
```

Run in the directory containing the sample code:

```bash
gcloud run deploy FUNCTION \
       --source . \
       --function FUNCTION_ENTRYPOINT \
       --base-image BASE_IMAGE \
       --region REGION
```

Replace `FUNCTION` (name; prompted if omitted), `FUNCTION_ENTRYPOINT` (function name or fully-qualified class name in your source), `BASE_IMAGE` (e.g. `nodejs24`, `python314`, `go127`, `java25`, `dotnet10`, `ruby40`, `php85`), and `REGION` (e.g. `europe-west1`).

Optional: `--allow-unauthenticated` for a public HTTP function such as a webhook (assigns the Cloud Run Invoker role to the special identifier `allUsers`). Omit it for event-triggered or authenticated services.

### Add an Eventarc trigger

```bash
gcloud eventarc triggers create EVENTARC_TRIGGER_NAME \
    --location=EVENTARC_TRIGGER_LOCATION \
    --destination-run-service=FUNCTION \
    --destination-run-region=REGION \
    --event-filters="type=EVENTARC_FILTER_TYPE" \
    --event-filters="EVENTARC_EVENT_FILTER" \
    --service-account=EVENTARC_TRIGGER_SERVICE_ACCOUNT
```

### Specify your own Artifact Registry repository

```bash
gcloud run deploy FUNCTION \
  --source . \
  --function FUNCTION_ENTRYPOINT \
  --base-image BASE_IMAGE \
  --region REGION \
  --image IMAGE_URL
```

`IMAGE_URL` example: `REGION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/FUNCTION`. The image name must match the function name; if only a repository path is given, the function name is used.

### Modify configuration or code

Update configuration with `gcloud run services update SERVICE` plus the flags to change. Re-deploy code with the `gcloud run deploy FUNCTION --source . --function ... --base-image ... --region ...` command above. `--base-image` also accepts a full path such as `us-central1-docker.pkg.dev/serverless-runtimes/google-24-full/runtimes/nodejs24` or an alias such as `google-24/nodejs24` or `google-24-full/nodejs24`.

### Disable the deployment health check

```bash
gcloud run deploy --image IMAGE_URL --no-deploy-health-check
```

Use `--deploy-health-check` to re-enable. YAML form:

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    metadata:
      annotations:
        run.googleapis.com/health-check-disabled: 'true'
```

### Deploy from a custom source bucket

Package sources into a gzipped archive (`.tar.gz`), upload it to your bucket, and deploy with `--source=gs://BUCKET_NAME/OBJECT_PATH` (needed e.g. for CMEK).

## Options / Props

| Role | Granted to | Purpose |
| --- | --- | --- |
| `roles/run.sourceDeveloper` | Deployer, on project | Build and deploy from source |
| `roles/serviceusage.serviceUsageConsumer` | Deployer, on project | Build and deploy from source |
| `roles/iam.serviceAccountUser` | Deployer, on the Cloud Run service identity | Deploy as the service identity |
| `roles/run.builder` | Cloud Build service account (Compute Engine default SA unless overridden) | Build sources |
| Eventarc (optional): `roles/cloudbuild.builds.editor`, `roles/run.admin`, `roles/iam.serviceAccountCreator`, `roles/run.invoker`, `roles/eventarc.admin`, `roles/resourcemanager.projectIamAdmin`, `roles/serviceusage.serviceUsageConsumer`, `roles/storage.admin` | The service account the source calls "your service account" when using Eventarc: a setup / deployer-level set, not the trigger's service account (see Notes) | Event triggers |

| Optional deploy flag area | Purpose |
| --- | --- |
| Build environment variables | Env vars during the build step (e.g. build-time certificates) |
| Worker pool | Which worker pool to use in a VPC Service Controls secured build context |
| Custom build service account | Alternative to the default build service account for increased security |
| Automatic base image updates | Flag to disable automatic updates; functions have automatic security updates enabled by default |

Cross-project / cross-region Artifact Registry repository: grant `roles/artifactregistry.reader` to the Cloud Run service agent (`service-FUNCTION_PROJECT_NUMBER@serverless-robot-prod.iam.gserviceaccount.com`) and to the deploying identity (for `gcloud functions deploy`, the Cloud Functions service agent `service-FUNCTION_PROJECT_NUMBER@gcf-admin-robot.iam.gserviceaccount.com`); grant `roles/artifactregistry.reader` and `roles/artifactregistry.writer` to the build service account. Also ensure network reachability, VPC-SC perimeter access, and note cross-region data transfer.

## Notes

- Console service names: begin with a letter, up to 49 characters (letters, numbers, hyphens), cannot end with a hyphen, unique per region and project; cannot be changed later and are publicly visible. The console flow also covers Eventarc trigger setup (trigger types Google Sources / Custom / Third-party), authentication, and optional settings; those Console steps are omitted here.
- `--allow-unauthenticated` and Terraform `allUsers` + `roles/run.invoker` make the service publicly accessible; use only for intentionally public content (webhooks).
- Source inconsistency: the Console and gcloud steps say the public option assigns the Invoker role to the special identifier `allUser`; the principal identifier is `allUsers`, as in the source's own Terraform sample (`google_cloud_run_v2_service_iam_member` with `member = "allUsers"`). This page writes `allUsers`.
- The default compute service account is used for builds and Eventarc triggers unless overridden; prefer dedicated service accounts (`gcp-foundation`): for builds, pass `--build-service-account=BUILD_SERVICE_ACCOUNT` to `gcloud run deploy --source` (the flag applies only to source deploy builds) and grant `roles/run.builder` to that account; for Eventarc triggers, pass `--service-account` to `gcloud eventarc triggers create`. The `iam.automaticIamGrantsForDefaultServiceAccounts` constraint prevents automatic Editor grants (enforced by default for organizations created after May 3, 2024); the source strongly recommends enforcing it and replacing Editor with less permissive roles (check with Policy Simulator).
- The source gives the `IMAGE_URL` example as `projects/PROJECT_NAME/locations/LOCATION/repositories/REPOSITORY_NAME/FUNCTION` (the resource-name form); the `gcloud run deploy` help says that with `--source` the image must be an Artifact Registry Docker URI, `$REGION-docker.pkg.dev/$PROJECT/$REPOSITORY` or `$REGION-docker.pkg.dev/$PROJECT/$REPOSITORY/$IMAGE_NAME`, so this page uses the Docker form with the project ID.
- The source says to package the custom-bucket source "into an archive (such as a ZIP file)"; the `gcloud run deploy --source` help documents "a gzipped archive file (.tar.gz) in Google Cloud Storage", so this page says `.tar.gz` (ZIP archives belong to `gcloud functions deploy`).
- The Eventarc role list (including `roles/resourcemanager.projectIamAdmin`, `roles/run.admin`, `roles/iam.serviceAccountCreator`, `roles/storage.admin`) is a broad, setup / deployer-level set; `projectIamAdmin` lets its holder grant itself any role. Do not grant it to a workload or trigger identity; give the trigger's service account only the roles listed in "Roles and permissions for Cloud Run targets" (https://docs.cloud.google.com/eventarc/docs/roles-permissions, linked from the source), with `roles/run.invoker` granted on the target function rather than the project.
- Under a domain restriction org policy that blocks unauthenticated invocations, access the service as in "Testing private services".
- Eventarc uses Pub/Sub as transport with a default retry policy that may not suit your function; after creating a trigger, update the Eventarc retry policy and configure a Pub/Sub dead-letter topic. The trigger's event type cannot be changed after creation (create a new trigger and delete the old one).
- Default source bucket: `run-sources-PROJECT_ID-REGION`; you are responsible for its ACLs and objects.
- Terraform: build the function into a container image ("building a function on scratch") and define `google_cloud_run_v2_service` with `build_config` (`function_target`, `image_uri`, `base_image`, `enable_automatic_updates = true`); the source's sample also adds a `google_cloud_run_v2_service_iam_member` granting `allUsers` invoker (remove it for a private service). Terraform sample omitted.
- Cloud Run is regional; the source lists Tier 1 and Tier 2 pricing regions (e.g. `us-central1`, `europe-west1`, `asia-northeast1` in Tier 1) — see https://docs.cloud.google.com/run/docs/locations. Multi-location use of Google Cloud products affects latency and cost.
- For `gcloud functions deploy`, the Cloud Functions v2 API and `google_cloudfunctions2_function`, see https://docs.cloud.google.com/functions/docs/deploy.
- Source inconsistency: this page adds triggers after deployment as separate Eventarc triggers whose destination is the function's Cloud Run service (`--destination-run-service=FUNCTION`), and https://docs.cloud.google.com/run/docs/managing/services refers to "a service with one or more Eventarc triggers"; https://docs.cloud.google.com/run/docs/function-triggers says "You cannot bind the same function to more than one trigger at a time" without saying which API it applies to. The comparison page (https://docs.cloud.google.com/run/docs/functions/comparison) ties deploy-time triggers to functions created with the Cloud Functions v2 API, so the one-trigger statement is best read as applying there.
- Source: https://docs.cloud.google.com/run/docs/deploy-functions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/managing/services (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/function-triggers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/functions/comparison (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [write-functions.md](./write-functions.md)
- [function-triggers.md](./function-triggers.md)
- [overview.md](./overview.md)
- [comparison.md](./comparison.md)
