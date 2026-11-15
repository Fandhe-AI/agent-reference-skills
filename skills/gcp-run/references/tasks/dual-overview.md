---
source: https://docs.cloud.google.com/tasks/docs/dual-overview
---

# Cloud Tasks overview

Cloud Tasks separates independent pieces of work (tasks) from your main application flow and dispatches them asynchronously to handlers you create. A queue persists a task until it is executed successfully or its retries are exhausted, and can act as dispatch flow control. Delivery is "at least once", so handlers must be idempotent.

## Signature / Usage

The source has no code. Snippet taken from https://docs.cloud.google.com/tasks/docs/creating-queues (create and describe a queue):

```bash
gcloud tasks queues create QUEUE_ID \
    --location=LOCATION
```

```bash
gcloud tasks queues describe QUEUE_ID \
    --location=LOCATION
```

General workflow: create a worker, create a queue, create tasks and add them to the queue; the service returns OK once the task is durably stored; the task is passed to the worker, which returns a 2xx status code to finish.

## Options / Props

| Term | Definition |
| --- | --- |
| attempt | An attempt to run a task |
| attempt dispatch | The moment Cloud Tasks has sent the task to its target |
| attempt response | Worker response saying the task succeeded or failed |
| handler / worker | Application code that processes tasks |
| queue | A set of tasks with the same target type managed by a single configuration |
| rate limits | Rate at which a queue dispatches tasks, for first attempts and retries alike |
| retry | Multiple attempts to run a task, set via retry parameters |
| target type | HTTP endpoint or App Engine application |
| task | The fundamental unit of asynchronous work |

| Target | Response deadline |
| --- | --- |
| HTTP target (Cloud Run functions, Cloud Run, GKE, Compute Engine, on-premises) | default 10 minutes, maximum 30 minutes; a 200-299 response is required, otherwise the task is retried |
| App Engine target | 10 minutes with automatic scaling, up to 24 hours with manual scaling |

## Notes

- Cloud Tasks guarantees delivery but not delivery timing; unsuitable for interactive apps where a user waits for the result.
- Tasks with a payload (sent in the request body) must use POST or PUT.
- Task deduplication: a unique task name makes duplicate creation fail; names are remembered up to 24 hours after the task is deleted. Without a name Cloud Tasks generates one and deduplication does not apply. Do not rely on the `X-CloudTasks-TaskETA` / `X-AppEngine-TaskETA` headers for deduplication.
- HTTP targets that need authentication require two service accounts (the client application and the queue); see creating-http-target-tasks.
- App Engine targets: compatible with standard second-generation runtimes and flexible environment; the queue needs an App Engine app, handlers run in its region (also the `LOCATION_ID`), and one project holds one App Engine app whose region cannot change. `europe-west` and `us-central` in App Engine commands are `europe-west1` and `us-central1` in Cloud Tasks commands. To distribute across regions, target HTTP/S endpoints.
- Source inconsistency: this page says any HTTP response code from 200 to 299 is success; https://docs.cloud.google.com/run/docs/triggering/using-tasks says the Cloud Run service must return HTTP `200` to confirm success.
- Use cases: faster user responses, preserving requests during incidents, smoothing traffic spikes, managing third-party API call rates.
- Cloud Tasks is Google Cloud's managed task queue; it is distinct from BullMQ (`bullmq`), Inngest (`inngest`) and Cloudflare Queues (`cloudflare-stateful`), which are separate products with their own APIs.
- Source: https://docs.cloud.google.com/tasks/docs/dual-overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/tasks/docs/creating-queues (retrieved 2026-11-15)

## Related

- [creating-queues.md](./creating-queues.md)
- [configuring-queues.md](./configuring-queues.md)
- [creating-http-target-tasks.md](./creating-http-target-tasks.md)
- [access-control.md](./access-control.md)
- [locations.md](./locations.md)
- [quotas.md](./quotas.md)
