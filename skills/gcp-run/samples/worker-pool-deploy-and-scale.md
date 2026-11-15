---
source: https://docs.cloud.google.com/run/docs/deploy-worker-pools
---

# Deploy and Manually Scale a Cloud Run Worker Pool

Deploy a worker pool for continuous background work (no inbound HTTP endpoint), connect it to a VPC with Direct VPC, scale it with a fixed instance count, and disable it.

## Signature / Usage

`WORKER_POOL` and `WORKERPOOL` below are the same worker pool name; each block keeps the spelling of its source page.

### 1. Deploy a new worker pool

```bash
gcloud run worker-pools deploy WORKER_POOL --image IMAGE_URL
```

From source instead (the Cloud Build service account needs `roles/run.builder`, as in the source deploy sample):

```bash
gcloud run worker-pools deploy WORKERPOOL --source .
```

### 2. Optional: Direct VPC egress

```bash
gcloud run worker-pools deploy WORKER_POOL \
    --image=IMAGE_URL \
    --network=NETWORK \
    --subnet=SUBNET \
    --network-tags=NETWORK_TAG_NAMES \
    --region=REGION
```

### 3. Scale manually

Setting `--instances` switches the pool to manual scaling and does not create a new revision.

```bash
gcloud run worker-pools update WORKER_POOL \
   --instances=INSTANCE_COUNT
```

### 4. Disable the pool

```bash
gcloud run worker-pools update WORKER_POOL --instances=0
```

### 5. Export, edit and apply the configuration

```bash
gcloud run worker-pools describe WORKER_POOL --format export > worker-pool.yaml
```

Edit `worker-pool.yaml`. If the exported file has `spec.template.metadata.name` (a revision name), delete it or set a new revision name before applying; revision names are immutable, so reusing the existing name with a changed configuration is rejected.

```bash
gcloud run worker-pools replace worker-pool.yaml
```

## Options / Props

| Item | Value |
|---|---|
| Worker pool name | 49 characters or fewer; unique per region and project; must not equal an existing service name |
| `--instances` | Instance count; `0` disables the pool |
| Sidecars | Up to 10 containers per instance including the worker pool container |
| Roles | `roles/run.developer` on the pool, `roles/iam.serviceAccountUser` on the identity, `roles/artifactregistry.reader` on the image repository |

## Notes

- Worker pools have no load-balanced endpoint or URL and do not autoscale. With manual scaling every requested instance is billed as active, even if idle.
- Source inconsistency: the official pages disable a worker pool with `--instances=0` (step 4); the gcloud help for `gcloud run worker-pools update` says the `--instances` value should be a positive integer.
- Any configuration change creates a new immutable revision. A successful deployment does not mean the container is healthy; configure startup probes and liveness checks.
- Without `--image` or `--source` the deploy command tries to deploy the current directory from source, so always pass `--image` in step 1.
- Run the pool as a dedicated user-managed service account rather than the Compute Engine default one.
- Direct VPC supports ingress for worker pools as well (the source's ingress-only command omits `--network-tags`). Connectors do not support ingress.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- The `gcloud run` commands that omit `--region` follow the source; pass `--region=REGION` or set the `run/region` property (for example `gcloud config set run/region REGION`), otherwise gcloud prompts for a region or, in non-interactive runs, fails. `gcloud run worker-pools replace` has no `--region` flag.
- Source: https://docs.cloud.google.com/run/docs/deploy-worker-pools (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/workerpools/deploy-source-code (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/workerpools/manual-scaling (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [direct-vpc-egress-and-connector.md](./direct-vpc-egress-and-connector.md)
- [deploy-service-from-source.md](./deploy-service-from-source.md)
- Worker pool quickstart: https://docs.cloud.google.com/run/docs/quickstarts/workerpools/deploy-workerpool
