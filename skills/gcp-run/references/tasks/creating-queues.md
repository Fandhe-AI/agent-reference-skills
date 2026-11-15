---
source: https://docs.cloud.google.com/tasks/docs/creating-queues
---

# Create Cloud Tasks queues

Create, describe and troubleshoot Cloud Tasks queues. A queue name has three parts: project ID, location and queue ID. HTTP target tasks need no App Engine app; App Engine target tasks need an App Engine app whose region is where the queue and handlers run.

## Signature / Usage

### Create a queue

```bash
gcloud tasks queues create QUEUE_ID \
    --location=LOCATION
```

REST (`projects.locations.queues.create`), request body:

```json
{
  "name": "projects/PROJECT_ID/locations/LOCATION/queues/QUEUE_ID"
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://cloudtasks.googleapis.com/v2/projects/PROJECT_ID/locations/LOCATION/queues"
```

### Describe a queue

```bash
gcloud tasks queues describe QUEUE_ID \
    --location=LOCATION
```

Default output:

```yaml
name: projects/PROJECT_ID/locations/LOCATION/queues/QUEUE_ID
rateLimits:
  maxBurstSize: 100
  maxConcurrentDispatches: 1000
  maxDispatchesPerSecond: 500.0
retryConfig:
  maxAttempts: 100
  maxBackoff: 3600s
  maxDoublings: 16
  minBackoff: 0.100s
state: RUNNING
```

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://cloudtasks.googleapis.com/v2/projects/PROJECT_ID/locations/LOCATION/queues/QUEUE_ID"
```

### Troubleshoot

```bash
gcloud tasks queues list \
    --location=LOCATION
```

## Options / Props

| Item | Value |
| --- | --- |
| Default `rateLimits.maxDispatchesPerSecond` | 500 |
| Default `rateLimits.maxBurstSize` | 100 |
| Default `rateLimits.maxConcurrentDispatches` | 1000 |
| Default `retryConfig.maxAttempts` | 100 |
| Default `retryConfig.minBackoff` / `maxBackoff` | 0.100s / 3600s |
| Default `retryConfig.maxDoublings` | 16 |
| `state` | `RUNNING` after creation |

## Notes

- It can take a few minutes for a new queue to become available; wait at least one minute. Make sure a queue with the same ID does not exist; `queues list` covers one location only, so repeat per location.
- If the organization restricts resource locations and you want a queue in `us-central1` or `us-central2`, the policy must allow both regions.
- Logging for a queue is not enabled by default; see https://docs.cloud.google.com/tasks/docs/monitor#logging-queues. Check the queue quota on the Cloud Tasks API "Quotas & System limits" tab.
- For App Engine routing without an explicit service, the default service is used. `europe-west` / `us-central` in App Engine commands are `europe-west1` / `us-central1` in Cloud Tasks commands.
- The source also shows Console, PowerShell and APIs Explorer forms, omitted here.
- Source inconsistency: this page says "Using HTTP target tasks doesn't require an App Engine app"; https://docs.cloud.google.com/run/docs/triggering/using-tasks (HTTP tasks to Cloud Run) runs `gcloud tasks queues create QUEUE-ID` without `--location` and says to respond `y` if prompted to create an App Engine app.
- Source: https://docs.cloud.google.com/tasks/docs/creating-queues (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuring-queues.md](./configuring-queues.md)
- [dual-overview.md](./dual-overview.md)
- [quotas.md](./quotas.md)
- [locations.md](./locations.md)
