---
source: https://docs.cloud.google.com/run/docs/managing/workerpool-revisions
---

# Manage worker pool revisions

Each deployment or configuration update of a worker pool creates an immutable revision, so you can track configuration history and roll back. Inactive revisions consume no resources and incur no cost, so manual deletion is optional.

## Signature / Usage

### List revisions

```bash
gcloud run worker-pools list
```

Adapted (not in the official docs): added line-continuation backslashes; the source puts the flags on separate lines without them.

```bash
gcloud run worker-pools revisions list \
   --worker-pool=WORKER_POOL \
   --region=REGION
```

### Describe a revision

Adapted (not in the official docs): removed `--worker-pool=WORKER_POOL`, which is not a flag of `revisions describe` (gcloud rejects it as an unrecognized argument).

```bash
gcloud run worker-pools revisions describe REVISION --region=REGION
```

Adapted (not in the official docs): removed `--worker-pool=WORKER_POOL` (not a flag of `revisions describe`) and added line-continuation backslashes.

```bash
gcloud run worker-pools revisions describe REVISION \
    --region=REGION \
    --format yaml
```

### Delete a revision

Adapted (not in the official docs): added line-continuation backslashes; the source puts the flags on separate lines without them.

```bash
gcloud run worker-pools revisions delete REVISION \
    --region=REGION \
    --worker-pool=WORKER_POOL
```

## Options / Props

| Item | Value |
| --- | --- |
| Revisions retained per worker pool | up to 1000; older ones are deleted automatically |
| Cannot delete | the only revision, or the latest revision, of the worker pool |
| Revision name | automatic suffix, or a custom one via `--revision-suffix` on deploy |
| Status `RETIRED` | a non-current revision whose infrastructure Cloud Run retired |
| Required role | Cloud Run Developer (`roles/run.developer`) on the worker pool |

## Notes

- Revision deletion cannot be undone and does not delete the image from Artifact Registry; destructive, so try it on a disposable revision first.
- Corrected from the official docs: the multi-line gcloud commands (`revisions list`, `revisions describe ... --format yaml` and `revisions delete`) lacked `\` continuations.
- Corrected from the official docs: both `revisions describe` commands passed `--worker-pool=WORKER_POOL` (`gcloud run worker-pools revisions describe REVISION --region=REGION --worker-pool=WORKER_POOL`); the command takes only `WORKER_POOL_REVISION` and `--region`, so the flag was removed. `revisions list` and `revisions delete` do take `--worker-pool`.
- The source also shows Console steps, omitted here. Gradual rollouts, rollbacks and instance splits: https://docs.cloud.google.com/run/docs/workerpools/rollouts-rollbacks-splits
- Source: https://docs.cloud.google.com/run/docs/managing/workerpool-revisions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-workerpools.md](./managing-workerpools.md)
- [deploy-worker-pools.md](./deploy-worker-pools.md)
