---
source: https://docs.cloud.google.com/run/docs/deploy-worker-pools
---

# Deploy worker pools to Cloud Run

Deploy container images to a new Cloud Run worker pool or a new revision of an existing one. Worker pools are designed for continuous background work; unlike services they have no load-balanced endpoint/URL and do not support autoscaling.

## Signature / Usage

### Deploy a new worker pool

Image can use a tag (`us-docker.pkg.dev/my-project/container/my-image:latest`) or a digest (`...@sha256:41f34ab970ee...`). A tag is resolved to a digest; revisions are immutable.

```bash
gcloud run worker-pools deploy WORKER_POOL --image IMAGE_URL
```

Deploy to a different region than the `run/region` property:

Adapted (not in the official docs): added `--image IMAGE_URL`; without `--image` or `--source` the deploy command deploys the current directory from source.

```bash
gcloud run worker-pools deploy WORKER_POOL --image IMAGE_URL --region REGION
```

YAML (`worker-pool.yaml`):

```yaml
apiVersion: run.googleapis.com/v1
kind: WorkerPool
metadata:
  name: WORKER_POOL
spec:
  template:
    spec:
      containers:
      - image: IMAGE
```

```bash
gcloud run worker-pools replace worker-pool.yaml
```

REST:

Adapted (not in the official docs): quoted the JSON keys so the body is valid JSON, and double-quoted the URL so `?` is not globbed by the shell (zsh aborts with "no matches found").

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X POST \
  -d '{"template": {"containers": [{"image": "IMAGE_URL"}]}}' \
  "https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/workerPools?workerPoolId=WORKER_POOL"
```

### Deploy a new revision

Any configuration change creates a new immutable revision, even with the same image.

```bash
gcloud run worker-pools deploy WORKER_POOL --image IMAGE_URL
```

```bash
gcloud run worker-pools describe WORKER_POOL --format export > worker-pool.yaml
```

```bash
gcloud run worker-pools replace worker-pool.yaml
```

Adapted (not in the official docs): removed a stray `>` after `WORKER_POOL` in the URL (it would be parsed by the shell as a redirect), and quoted the JSON keys so the body is valid JSON.

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X PATCH \
  -d '{"template": {"containers": [{"image": "IMAGE_URL"}]}}' \
  "https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/workerPools/WORKER_POOL?forceNewRevision=true"
```

### Validate with dry run (Preview)

```bash
gcloud beta run worker-pools deploy WORKER_POOL \
    --image IMAGE_URL \
    --dry-run
```

### Sidecars

```bash
gcloud run worker-pools deploy WORKER_POOL \
 --container WORKER_POOL_CONTAINER_NAME \
 --image='WORKER_POOL_IMAGE' \
 --container SIDECAR_CONTAINER_NAME \
 --image='SIDECAR_IMAGE'
```

```bash
gcloud run worker-pools deploy WORKER_POOL \
  --container CONTAINER_1_NAME \
  --image='WORKER_POOL_IMAGE' \
  --set-env-vars=KEY=VALUE \
  --container SIDECAR_CONTAINER_NAME \
  --image='SIDECAR_IMAGE' \
  --set-env-vars=KEY_N=VALUE_N
```

Adapted (not in the official docs): the source repeats the `containers:` key twice, which is invalid YAML; merged into one list.

```yaml
apiVersion: run.googleapis.com/v1
kind: WorkerPool
metadata:
  name: WORKER_POOL
spec:
  template:
    spec:
      containers:
      - name: CONTAINER_NAME
        image: IMAGE_URL
      - name: SIDECAR_CONTAINER_NAME
        image: SIDECAR_IMAGE_URL
```

## Options / Props

| Item | Value |
| --- | --- |
| Worker pool name | 49 characters or fewer; unique per region and project; must not equal an existing service name in the project; cannot be changed; publicly visible |
| Sidecars | up to 10 containers per instance including the worker pool container; shared network namespace; shared in-memory volume |
| Image layer size from Docker Hub / remote repository | not supported above 9.9 GB |
| `--revision-suffix` | supply your own revision suffix (otherwise assigned automatically) |
| REST `forceNewRevision=true` | create a new revision even if no change is detected |
| `--dry-run` (Preview) | validates configuration, skips the build for source deploys, prints a success message |

| Role | Scope |
| --- | --- |
| Cloud Run Developer (`roles/run.developer`) | the worker pool |
| Service Account User (`roles/iam.serviceAccountUser`) | the identity the worker pool uses |
| Artifact Registry Reader (`roles/artifactregistry.reader`) | the repository of the deployed image |

## Notes

- Without `--image` the deploy command tries to deploy from source (see deploy-source-code). Artifact Registry is recommended; Docker Hub / GitHub Container Registry public images are cached up to one hour; other registries need an Artifact Registry remote repository.
- A successful deployment does not mean the container is healthy; configure startup probes and liveness checks and watch the logs.
- Cross-project images: grant the Cloud Run service agent (`...@serverless-robot-prod.iam.gserviceaccount.com`, visible with "Include Google-provided role grants") Artifact Registry Reader (or Storage Object Viewer for Container Registry) on the project owning the registry; for stronger security grant only on the specific repository or bucket.
- Containers that depend on each other need healthchecks so Cloud Run follows startup order; without them it tries to start all containers.
- Source inconsistency: the single-container YAML uses `image: IMAGE` while the replacement list names `IMAGE_URL`; kept verbatim.
- Corrected from the official docs: curl URL `workerPools/WORKER_POOL>?forceNewRevision=true` (stray `>`) and the sidecar YAML with two `containers:` keys.
- Corrected from the official docs: the REST create and update bodies were `'{template: {containers: [{image: "IMAGE_URL"}]}}'` (unquoted keys, not valid JSON), and the create URL `https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/workerPools?workerPoolId=WORKER_POOL` was unquoted.
- Adapted from the official docs: the "different region" command was `gcloud run worker-pools deploy WORKER_POOL --region REGION` (no `--image`, so it would start a source deploy); `--image IMAGE_URL` was added.
- The source also shows Console and Terraform forms, and the Cloud Run region list, omitted here.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`).
- Source: https://docs.cloud.google.com/run/docs/deploy-worker-pools (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-source-code.md](./deploy-source-code.md)
- [quickstart-deploy-workerpool.md](./quickstart-deploy-workerpool.md)
- [managing-workerpools.md](./managing-workerpools.md)
- [manual-scaling.md](./manual-scaling.md)
