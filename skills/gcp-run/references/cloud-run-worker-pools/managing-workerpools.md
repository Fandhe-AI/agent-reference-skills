---
source: https://docs.cloud.google.com/run/docs/managing/workerpools
---

# Manage Cloud Run worker pools

List worker pools, view details, disable a worker pool by scaling to zero, and delete worker pools. A worker pool is created the first time you deploy a container image to it.

## Signature / Usage

### List and describe

```bash
gcloud run worker-pools list
```

```bash
curl -H "Authorization: Bearer ACCESS_TOKEN" \
   -X GET \
   https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/workerPools
```

Adapted (not in the official docs): added line-continuation backslashes; the source wraps the flags onto separate lines without them, which the shell would run as separate commands.

```bash
gcloud run worker-pools describe WORKER_POOL \
    --region REGION \
    --format yaml
```

```bash
gcloud run worker-pools describe WORKER_POOL --format export > worker-pool.yaml
```

```bash
curl -H "Authorization: Bearer ACCESS_TOKEN" \
   -X GET \
   https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/workerPools/WORKER_POOL
```

### Disable (scale to zero)

```bash
gcloud run worker-pools update WORKER_POOL --instances=0
```

Adapted (not in the official docs): quoted the annotation value; the source writes it in backticks (`` `0` ``), which is not valid YAML.

```yaml
apiVersion: run.googleapis.com/v1
kind: WorkerPool
metadata:
  name: WORKER_POOL
  annotations:
    run.googleapis.com/scalingMode: manual
    run.googleapis.com/manualInstanceCount: "0"
```

```bash
gcloud run worker-pools replace worker-pool.yaml
```

Adapted (not in the official docs): quoted the URL so `?` is not globbed by the shell.

```bash
curl -H "Authorization: Bearer ACCESS_TOKEN" \
   -H "Content-Type: application/json" \
   -X PATCH \
   -d '{"scaling":{"manualInstanceCount":0}}' \
   "https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/workerPools/WORKER_POOL?update_mask=scaling.manualInstanceCount"
```

### Delete

```bash
gcloud run worker-pools delete WORKER_POOL --region REGION
```

```bash
curl -H "Authorization: Bearer ACCESS_TOKEN" \
   -X DELETE \
   https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/workerPools/WORKER_POOL
```

## Options / Props

| Item | Value |
| --- | --- |
| Required role | Cloud Run Developer (`roles/run.developer`) on the worker pool |
| Disable | set manual instance count to 0 (shuts down all instances) |
| Console label | "Scaling: Manual (Instances: )" |

## Notes

- Deleting a worker pool is permanent (no undo or restore), deletes all of its revisions, and does not remove images from Artifact Registry. The pool stays visible in gcloud until deletion completes but cannot be updated. Destructive: try it on a disposable worker pool first.
- Source inconsistency: this page disables a worker pool with `--instances=0`; the gcloud help for `gcloud run worker-pools update` says the `--instances` value should be a positive integer.
- Corrected from the official docs: wrapped gcloud flags without `\`, backticked YAML value `` `0` ``, and unquoted `update_mask` URL (quoted so `?` is not globbed).
- The source also shows Console and client library forms, omitted here. Filtering lists by label: https://docs.cloud.google.com/run/docs/configuring/workerpools/labels#label-listing
- Source: https://docs.cloud.google.com/run/docs/managing/workerpools (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-workerpool-revisions.md](./managing-workerpool-revisions.md)
- [manual-scaling.md](./manual-scaling.md)
- [deploy-worker-pools.md](./deploy-worker-pools.md)
