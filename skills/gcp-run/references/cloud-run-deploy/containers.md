---
source: https://docs.cloud.google.com/run/docs/building/containers
---

# Build and deploy container images (Building containers)

Cloud Run can deploy source directly, but you can also build an image yourself (any tool that respects the container contract) and deploy the image to any Cloud Run resource. This page covers building with Cloud Build (Dockerfile or Google Cloud's buildpacks), local Docker, and `pack`.

## Signature / Usage

### Prepare Artifact Registry

```bash
gcloud artifacts repositories create REPOSITORY \
    --repository-format=docker \
    --location=LOCATION \
    --description="DESCRIPTION" \
    --immutable-tags \
    --async
```

```bash
gcloud auth configure-docker LOCATION-docker.pkg.dev
```

Replace `LOCATION` with the region of your repository, for example `us-west2`.

### Build with Cloud Build and a Dockerfile

In the folder with sources and `Dockerfile`:

```bash
gcloud builds submit --tag IMAGE_URL
```

`IMAGE_URL` example: `us-docker.pkg.dev/cloudrun/container/hello:latest`. For Artifact Registry the format is `LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/PATH:TAG` and the repository must already exist.

### Build locally with Docker and push

```bash
docker build . --tag IMAGE_URL
```

On a Mac with Apple silicon, add `--platform linux/amd64`.

```bash
docker push IMAGE_URL
```

### Build with Google Cloud's buildpacks

Cloud Build:

```bash
gcloud builds submit --pack image=IMAGE_URL
```

`pack` CLI (requires Docker and `pack` installed); builds and pushes:

```bash
pack build --publish IMAGE_URL
```

## Options / Props

| Item | Detail |
|---|---|
| Service requirement | Built with any tool, respecting the container contract; code must listen on the port in `PORT` (injected by Cloud Run) |
| Supported registries | Artifact Registry (recommended); see the deploying page for Docker Hub / GitHub Container Registry |
| Build methods | Cloud Build + Dockerfile; local `docker build`; Cloud Build `--pack`; local `pack build --publish` |

## Notes

- Do not include `~/.config/gcloud/gce` in the image; it is generated when gcloud runs during an image build and can cause authentication problems on Cloud Run.
- Use `.dockerignore` to exclude local files from the build context.
- Common reasons to decouple build and deploy: CI/CD pipelines and infrastructure as code (YAML or Terraform referencing an image URL).
- Related: Java images can be built with Jib; continuous deployment with Cloud Build triggers; jobs can use the built image too.
- Dockerfile authoring in general is covered by the `docker` skill.
- Source: https://docs.cloud.google.com/run/docs/building/containers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploying.md](./deploying.md)
- [deploy-container.md](./deploy-container.md)
