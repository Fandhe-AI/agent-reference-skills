---
source: https://docs.cloud.google.com/run/docs/deploying-source-code
---

# Deploy services from source code

Deploy a new service or revision directly from source with one command: `gcloud run deploy` with `--source`. The command defaults to source deployment if neither `--image` nor `--source` is given. Two modes: deploy from source with build (default; Google Cloud's buildpacks + Cloud Build) and deploy prebuilt source (Preview; bypasses Cloud Build).

## Signature / Usage

### Deploy from source with build

```bash
gcloud run deploy SERVICE --source .
```

Run from the source directory (a Dockerfile is used if present, otherwise buildpacks detect the language). Answer `y` to API-enable prompts and give platform/region if no defaults are set. The new revision serves 100% of traffic.

Grant Cloud Run Builder to the Compute Engine default service account (the default Cloud Build service account), wait a couple of minutes for propagation:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
    --role=roles/run.builder
```

Replace `PROJECT_NUMBER` with the project number and `PROJECT_ID` with the project ID.

### Deploy a Compose file from source

```yaml
services:
  web:
    build: .
    ports:
      - "8080:8080"
```

```bash
gcloud run compose up compose.yaml
```

### Deploy prebuilt source (Preview, no build)

Enable APIs and install dependencies locally first (no build runs):

```bash
gcloud services enable run.googleapis.com \
  storage.googleapis.com
```

```bash
gcloud beta run deploy SERVICE_NAME \
  --source APPLICATION_PATH \
  --no-build \
  --base-image=BASE_IMAGE \
  --command=COMMAND \
  --args=ARG
```

`BASE_IMAGE` example: `us-central1-docker.pkg.dev/serverless-runtimes/google-24/runtimes/nodejs24` or alias `nodejs24`; `osonly24` deploys a precompiled binary. `COMMAND` and `ARG` are optional (inferred from the base image otherwise).

Node.js example (after `npm install` in `helloworld`):

```bash
gcloud beta run deploy helloworld \
 --source . \
 --region=REGION \
 --no-build \
 --base-image=nodejs24
```

Python example: vendor dependencies first:

```bash
pip3 install -r requirements.txt --target=./vendor
```

### Prebuilt source via Cloud Storage and YAML

```bash
gcloud storage buckets create gs://BUCKET_NAME --location=BUCKET_LOCATION
```

```bash
tar -cvzf ARCHIVE_NAME APPLICATION_PATH
```

```bash
gcloud storage cp ARCHIVE_NAME gs://BUCKET_NAME
```

Adapted (not in the official docs): the source writes `apiVersion: serving.knative.dev/v2`; Cloud Run's Knative Serving API is v1, so it is written as `serving.knative.dev/v1` here.

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
 name: SERVICE_NAME
spec:
 template:
   metadata:
     annotations:
       run.googleapis.com/sources: '{"": "gs://BUCKET_NAME/ARCHIVE_NAME"}'
       run.googleapis.com/base-images: '{"": "BASE_IMAGE"}'
   spec:
     containers:
     - image: scratch
       command:
       - COMMAND
       args:
       - ARG1
       - ARG-N
     runtimeClassName: run.googleapis.com/linux-base-image-update
```

```bash
gcloud run services replace service.yaml
```

Use the same region for the bucket and the service (extraction can time out otherwise).

## Options / Props

### Supported languages (buildpacks)

Go, Node.js, Python, Java (including Kotlin, Groovy, Scala; Maven or Gradle with all plugins in the build file), .NET, Ruby, PHP, and OS only. Dockerfile sources are also supported.

### Required roles (deployer and Cloud Build service account)

| Role | Scope |
|---|---|
| Cloud Run Source Developer (`roles/run.sourceDeveloper`) | project |
| Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`) | project |
| Service Account User (`roles/iam.serviceAccountUser`) | Cloud Run service identity |
| Cloud Run Builder (`roles/run.builder`) | to the Cloud Build service account, on the project |

Enable the Cloud Run Admin API (and the Cloud Build API for builds) first; enabling APIs needs `serviceusage.services.enable` (Owner or Service Usage Admin).

### Limitations

| Mode | Limitation |
|---|---|
| With build | Only in regions supported by both Artifact Registry and Cloud Build; not fully customizable (use `gcloud builds submit` + `gcloud run deploy --image` for control) |
| With build | Buildpacks set source file Last Modified Date to Jan 1, 1980 (reproducible builds); consider disabling `etag` and `Last-Modified` headers for static files |
| With build | Always uses `gcr.io/buildpacks/builder:latest`; use a specific builder if your language/OS config is missing |
| Prebuilt | Services only; supported runtimes only (no Dockerfile); archive `.tar.gz` of 250 MiB or less; x86-compatible binaries; fully self-contained (base image has minimal OS and a few language libraries) |

### Other facts

- Source deployments store images in an Artifact Registry repository named `cloud-run-source-deploy` in the deploy region, created automatically if missing.
- Security fixes for base images are applied only at deploy time unless automatic security updates are enabled for the service.
- MCP: agents can use `deploy_service_from_archive` (with a bucket) or `deploy_service_from_file_contents` (50 MiB or less, no external dependencies), or the `/deploy` prompt.

## Notes

- The source grants `roles/run.builder` on the project to the Compute Engine default service account, which Cloud Build uses by default. To use a dedicated user-managed service account instead, pass `--build-service-account=BUILD_SERVICE_ACCOUNT` to `gcloud run deploy --source` (the flag applies only to source deploy builds) and grant `roles/run.builder` to that account rather than to the default one (see https://docs.cloud.google.com/run/docs/configuring/services/build-service-account); keep the project's `iam.automaticIamGrantsForDefaultServiceAccounts` constraint enforced (the source recommends replacing the Editor role on default service accounts with less permissive roles).
- Corrected from the official docs: the prebuilt-source service YAML uses `apiVersion: serving.knative.dev/v2`; changed to `serving.knative.dev/v1`, which every other Cloud Run Service YAML uses and `gcloud run services replace` sends to the v1 Admin API.
- `gcr.io/buildpacks/builder:latest` is Google's buildpacks builder image named in the source, not the shut-down Container Registry as a push target.
- Omitted from this page: the source's REST example (its JSON body has a broken quote around the bucket name) and the Terraform form; the source also shows Python example `requirements.txt` and `main.py` for prebuilt source.
- Source: https://docs.cloud.google.com/run/docs/deploying-source-code (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-services.md](./managing-services.md)
- [managing-revisions.md](./managing-revisions.md)
- [rollouts-rollbacks-traffic-migration.md](./rollouts-rollbacks-traffic-migration.md)
