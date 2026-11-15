---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools
---

# Cloud Run Worker Pools

Copy-paste gcloud commands for Cloud Run worker pools (continuous background workloads without an HTTP endpoint): deploy, manually scale, list revisions, read IAM policy, and delete.

## Signature / Usage

### Deploy a worker pool

```bash
gcloud run worker-pools deploy WORKER_POOL --image IMAGE_URL
```

Deploy to a region other than the `run/region` property:

Adapted (not in the official docs): added `--image IMAGE_URL`; without `--image` or `--source` the deploy command deploys the current directory from source.

```bash
gcloud run worker-pools deploy WORKER_POOL --image IMAGE_URL --region REGION
```

Validate the configuration without deploying. Available only in `gcloud beta run worker-pools deploy` (Preview):

```bash
gcloud beta run worker-pools deploy WORKER_POOL \
    --image IMAGE_URL \
    --dry-run
```

### Export, edit and re-apply as YAML

```bash
gcloud run worker-pools describe WORKER_POOL --format export > worker-pool.yaml
```

Edit `worker-pool.yaml`. If the exported file has `spec.template.metadata.name` (a revision name), delete it or set a new revision name before applying; revision names are immutable, so reusing the existing name with a changed configuration is rejected.

```bash
gcloud run worker-pools replace worker-pool.yaml
```

### List and describe

```bash
gcloud run worker-pools list
```

Adapted (not in the official docs): added line-continuation backslashes; the source wraps the flags onto separate lines without them, which the shell would run as separate commands.

```bash
gcloud run worker-pools describe WORKER_POOL \
    --region REGION \
    --format yaml
```

### Scale manually

Setting `--instances` switches the pool to manual scaling and does not create a new revision. Every requested instance is billed as an active instance, even if idle.

```bash
gcloud run worker-pools deploy WORKER_POOL \
    --instances=INSTANCE_COUNT \
    --image IMAGE_URL
```

```bash
gcloud run worker-pools update WORKER_POOL \
   --instances=INSTANCE_COUNT
```

### Disable a worker pool (scale to zero)

> **Warning**: Setting zero instances disables the worker pool. Try it on a disposable worker pool first.

```bash
gcloud run worker-pools update WORKER_POOL --instances=0
```

### List, describe and delete revisions

Adapted (not in the official docs): added line-continuation backslashes; the source puts the flags on separate lines without them.

```bash
gcloud run worker-pools revisions list \
   --worker-pool=WORKER_POOL \
   --region=REGION
```

Adapted (not in the official docs): removed `--worker-pool=WORKER_POOL`, which is not a flag of `revisions describe` (gcloud rejects it as an unrecognized argument).

```bash
gcloud run worker-pools revisions describe REVISION --region=REGION
```

> **Warning**: Deleting a revision cannot be undone. Try it on a disposable worker pool first.

Adapted (not in the official docs): added line-continuation backslashes; the source puts the flags on separate lines without them.

```bash
gcloud run worker-pools revisions delete REVISION \
    --region=REGION \
    --worker-pool=WORKER_POOL
```

### Read the IAM policy

```bash
gcloud run worker-pools get-iam-policy WORKER_POOL
```

### Delete a worker pool

> **Warning**: Deleting a worker pool is permanent (no undo or restore) and deletes all of its revisions. Try it on a disposable worker pool first.

```bash
gcloud run worker-pools delete WORKER_POOL --region REGION
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--image` | `worker-pools deploy` | Container image to deploy (a tag is resolved to a digest) |
| `--region` | most commands | Region of the worker pool |
| `--instances` | `worker-pools deploy`, `worker-pools update` | Manual instance count; `0` disables the pool |
| `--container` | `worker-pools deploy` | Starts per-container flags for sidecars (up to 10 containers) |
| `--revision-suffix` | `worker-pools deploy` | Custom revision suffix |
| `--dry-run` | `gcloud beta run worker-pools deploy` | Validate only (Preview) |

Worker pool names: 49 characters or fewer, unique per region and project, not equal to an existing service name, not changeable. Roles on the worker pool: Cloud Run Developer (`roles/run.developer`), Service Account User (`roles/iam.serviceAccountUser`) on the identity it uses, Artifact Registry Reader (`roles/artifactregistry.reader`) on the image repository.

## Notes

- Destructive commands on this page: `worker-pools delete` and `revisions delete`; `worker-pools update --instances=0` disables the pool. Try each on a disposable worker pool first.
- Source inconsistency: the official pages disable a worker pool with `--instances=0`; the gcloud help for `gcloud run worker-pools update` says the `--instances` value should be a positive integer.
- Adapted from the official docs: the "different region" deploy command had no `--image`, so it would start a source deploy; `--image IMAGE_URL` was added.
- Corrected from the official docs: multi-line `describe`, `revisions list` and `revisions delete` commands lacked `\` continuations, and both `revisions describe` commands passed `--worker-pool=WORKER_POOL`, which `revisions describe` does not accept (`revisions list` and `revisions delete` do).
- Worker pools have no load-balanced endpoint or URL and do not support autoscaling. A successful deployment does not mean the container is healthy; configure startup probes and liveness checks and watch the logs.
- YAML, REST and Console variants are omitted; see the official pages.
- Cloud Run is Google Cloud's serverless container platform, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- Command group reference: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools
- Source: https://docs.cloud.google.com/run/docs/deploy-worker-pools (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/managing/workerpools (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/workerpools/manual-scaling (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/managing/workerpool-revisions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/securing/managing-access (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [services.md](./services.md)
- [jobs.md](./jobs.md)
