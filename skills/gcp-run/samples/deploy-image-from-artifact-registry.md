---
source: https://docs.cloud.google.com/run/docs/deploying
---

# Deploy a Container Image from Artifact Registry

Create an Artifact Registry repository, build and push an image, deploy it as a Cloud Run service, and update it through a YAML export.

## Signature / Usage

`LOCATION` is the repository region (for example `us-west2`); `IMAGE_URL` has the form `LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/PATH:TAG` (`REPO_NAME` is the `REPOSITORY` created in step 1).

### 1. Prepare Artifact Registry

```bash
gcloud artifacts repositories create REPOSITORY \
    --repository-format=docker \
    --location=LOCATION \
    --description="DESCRIPTION" \
    --immutable-tags \
    --async
```

With `--async` the command returns before the repository exists; wait until the repository is created before pushing to it.

```bash
gcloud auth configure-docker LOCATION-docker.pkg.dev
```

### 2. Build and push

With Cloud Build, from the folder that holds the sources and `Dockerfile`:

```bash
gcloud builds submit --tag IMAGE_URL
```

Or locally with Docker (on a Mac with Apple silicon add `--platform linux/amd64`):

```bash
docker build . --tag IMAGE_URL
```

```bash
docker push IMAGE_URL
```

### 3. Deploy a new service

```bash
gcloud run deploy SERVICE --image IMAGE_URL
```

If you do not pass an authentication flag you are prompted; answer no to keep the service private. Without `--image` the command tries to deploy from source instead.

### 4. Change the configuration through YAML

```bash
gcloud run services describe SERVICE --format export > service.yaml
```

Edit `service.yaml` (for example set `spec.template.spec.containers[0].image`). If the exported file has `spec.template.metadata.name` (a revision name), delete it or set a new revision name before applying; revision names are immutable, so reusing the existing name with a changed configuration is rejected. Then apply it. YAML replaces the whole configuration; do not mix it with console or gcloud changes.

```bash
gcloud run services replace service.yaml
```

## Options / Props

| Role | Scope |
|---|---|
| Cloud Run Developer (`roles/run.developer`) | the service |
| Service Account User (`roles/iam.serviceAccountUser`) | the service identity |
| Artifact Registry Reader (`roles/artifactregistry.reader`) | the repository of the image |

## Notes

- Artifact Registry is the recommended registry; push to `LOCATION-docker.pkg.dev` rather than the legacy Container Registry host `gcr.io`.
- Cloud Run keeps its own copy of the image while a revision uses it; a tag is resolved to a digest at deploy time and every configuration change creates an immutable revision.
- Do not include `~/.config/gcloud/gce` in the image and use `.dockerignore` for local files. Dockerfile authoring in general is covered by the `docker` skill.
- The service identity defaults to the Compute Engine default service account; set a dedicated user-managed one with `--service-account` as in step 3 of the deploy-service-from-source sample.
- The code in the image must listen on the port in the `PORT` environment variable.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- The `gcloud run` commands that omit `--region` follow the source; pass `--region=REGION` or set the `run/region` property (for example `gcloud config set run/region REGION`), otherwise gcloud prompts for a region or, in non-interactive runs, fails.
- Source: https://docs.cloud.google.com/run/docs/building/containers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/deploying (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-service-from-source.md](./deploy-service-from-source.md)
- [secrets-env-and-volume.md](./secrets-env-and-volume.md)
- Service identity: https://docs.cloud.google.com/run/docs/securing/service-identity
