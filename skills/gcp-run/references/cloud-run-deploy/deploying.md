---
source: https://docs.cloud.google.com/run/docs/deploying
---

# Deploy container images to Cloud Run services

Deploy a container image as a new service or a new revision. Cloud Run imports the image and keeps its own copy while a serving revision uses it, so new instances start without pulling from your registry. Every configuration change creates an immutable revision; a tag is resolved to a digest at deploy time.

## Signature / Usage

### Deploy a new service (gcloud)

```bash
gcloud run deploy SERVICE --image IMAGE_URL
```

For a public API or website add `--allow-unauthenticated` (assigns Cloud Run Invoker to `allUsers`); `--no-allow-unauthenticated` disallows public access. If neither flag is given you are prompted. If `--image` is omitted the command tries to deploy from source. To deploy to a region other than the `run/region` property:

```bash
gcloud run deploy SERVICE --region REGION
```

Image references can use a tag (`us-docker.pkg.dev/my-project/container/my-image:latest`) or a digest (`...my-image@sha256:41f34ab970ee...`). Supply your own revision suffix with `--revision-suffix`.

### Deploy from a YAML file

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    spec:
      containers:
      - image: IMAGE
```

```bash
gcloud run services replace service.yaml
```

To change an existing service via YAML (this replaces the whole configuration; avoid mixing with console/gcloud changes):

```bash
gcloud run services describe SERVICE --format export > service.yaml
```

### Deploy a Compose file

```yaml
services:
  web:
    image: IMAGE
    ports:
      - "8080:8080"
```

```bash
gcloud run compose up compose.yaml
```

### REST API

Adapted (not in the official docs): the body's keys are quoted so it is valid JSON, and the URL is quoted so the `?` query string is not treated as a glob in zsh.

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X POST \
  -d '{"template": {"containers": [{"image": "IMAGE_URL"}]}}' \
  "https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services?serviceId=SERVICE"
```

A new revision uses `-X PATCH` against `.../services/SERVICE` with the same body. Get a token with `gcloud auth print-access-token` (or from the metadata server inside Cloud Run).

### Validate with dry run (Preview)

Validates configuration, skips the build for source deploys, sets no IAM policies, prints a success message:

```bash
gcloud beta run deploy SERVICE \
    --image IMAGE_URL \
    --dry-run
```

### Deploy with sidecars

```bash
gcloud run deploy SERVICE \
 --container INGRESS_CONTAINER_NAME \
 --image='INGRESS_IMAGE' \
 --port='CONTAINER_PORT' \
 --container SIDECAR_CONTAINER_NAME \
 --image='SIDECAR_IMAGE'
```

Per-container flags follow each `--container`; all non-container-level flags (for example `--execution-environment=gen2`) must come before the first `--container` or the command fails. YAML form:

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  annotations:
  name: SERVICE
spec:
  template:
    spec:
      containers:
      - image: INGRESS_IMAGE
        ports:
          - containerPort: CONTAINER_PORT
      - image: SIDECAR_IMAGE
```

Containers talk over localhost (`http://localhost:5000`) or by container name (`http://sidecar:5000`).

### Disable the deployment health check

```bash
gcloud run deploy --image IMAGE_URL --no-deploy-health-check
```

Use `--deploy-health-check` to re-enable. YAML: annotation `run.googleapis.com/health-check-disabled: 'true'` in `spec.template.metadata.annotations`.

## Options / Props

### Required roles

| Role | Scope |
|---|---|
| Cloud Run Developer (`roles/run.developer`) | the service |
| Service Account User (`roles/iam.serviceAccountUser`) | the service identity |
| Artifact Registry Reader (`roles/artifactregistry.reader`) | the repository of the image |
| Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`) | the service identity, only when deploying with a cross-project service account |

### Registries and limits

- Artifact Registry is recommended; public Docker Hub and GitHub Container Registry images work and are cached for up to one hour. Other or private registries (JFrog, Nexus, private GHCR): use an Artifact Registry remote repository (also recommended for availability of Docker Hub/GHCR images). Use Docker Hub only for popular images (Docker Official Images, Docker Sponsored OSS).
- Image layers larger than 9.9 GB are not supported when deploying from Docker Hub or an Artifact Registry remote repository with an external registry.
- Service names: 49 characters or less, unique per region and project, not changeable, publicly visible.
- Sidecars: up to 10 containers per instance including the ingress container; one ingress container with `containerPort` (no default port with sidecars; only one container exposes it); shared network namespace and optional in-memory shared volume. Under request-based billing sidecars get CPU only while a request is processed or the ingress container starts; use instance-based billing for sidecar work outside requests and a startup probe to avoid CPU throttling at startup. Use healthchecks for container startup order.

### Cross-project images

Grant the Cloud Run service agent (suffix `@serverless-robot-prod.iam.gserviceaccount.com`, shown under "Include Google-provided role grants") Artifact Registry Reader on the project or, more securely, on the repository that holds the images; the deployer needs the roles above.

### Adapting containers

Move mounts to Cloud Run configuration (init scripts must assume mounts exist); prefer non-root with the Dockerfile `USER` instruction; `setuid` binaries fail (use `--cap-drop=setuid` locally); test root containers under user namespaces.

## Notes

- `--allow-unauthenticated` / `allUsers` makes the service publicly accessible; use only for intentionally public content.
- Corrected from the official docs: the REST body `'{template: {containers: [{image: "IMAGE_URL"}]}}'` has unquoted keys (not valid JSON); the keys are quoted, and the URL `https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services?serviceId=SERVICE` is wrapped in double quotes.
- The source also shows Console, Terraform, Cloud Code, MCP (`deploy_service_from_image`, `/deploy` prompt) and client library forms.
- Source: https://docs.cloud.google.com/run/docs/deploying (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [containers.md](./containers.md)
- [deploy-container.md](./deploy-container.md)
- [deploy-nodejs-service.md](./deploy-nodejs-service.md)
