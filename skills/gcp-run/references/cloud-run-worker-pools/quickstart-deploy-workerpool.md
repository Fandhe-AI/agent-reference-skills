---
source: https://docs.cloud.google.com/run/docs/quickstarts/workerpools/deploy-workerpool
---

# Quickstart: Deploy a sample worker pool to Cloud Run

Cloud Run worker pools run continuous background workloads, such as pulling messages from a queue, without handling inbound HTTP requests. The quickstart deploys a sample worker pool container and views the log message it continually writes.

## Signature / Usage

### Deploy (console)

Cloud Run > **Worker pools** > **Deploy container** > **Test with a sample container** > **Create**. Open the **Logs** tab; the worker pool continually writes `Cloud Run Worker Pool instance is running!`.

The source has no CLI commands for this quickstart. The equivalent documented deploy command (Snippet taken from https://docs.cloud.google.com/run/docs/deploy-worker-pools):

```bash
gcloud run worker-pools deploy WORKER_POOL --image IMAGE_URL
```

## Options / Props

| Role | Scope |
| --- | --- |
| Cloud Run Admin (`roles/run.admin`) | the worker pool |
| Service Account User (`roles/iam.serviceAccountUser`) | the service identity |
| Logs Viewer (`roles/logging.viewer`) | the project |

## Notes

- Clean up: the sample worker pool keeps writing logs until deleted (Worker pools > select > **Delete**); delete is destructive, so only do it on the sample. Artifact Registry storage of the image may be charged; delete the repository if unneeded.
- Deleting a whole project deletes everything in it and loses custom project IDs.
- Source: https://docs.cloud.google.com/run/docs/quickstarts/workerpools/deploy-workerpool (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/run/docs/deploy-worker-pools (retrieved 2026-11-15)

## Related

- [deploy-worker-pools.md](./deploy-worker-pools.md)
- [manual-scaling.md](./manual-scaling.md)
