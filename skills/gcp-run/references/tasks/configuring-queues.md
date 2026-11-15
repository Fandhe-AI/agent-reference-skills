---
source: https://docs.cloud.google.com/tasks/docs/configuring-queues
---

# Configure queue routing, limits, and retries

Define queue-level routing, dispatch rate limits and retry behavior when creating or updating a queue. `gcloud tasks queues create` and `update` take identical configuration flags. Queue-level authentication overrides task-level authentication; queue-level routing overrides task-level routing.

## Signature / Usage

### Rate limits

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues update QUEUE_ID \
    --location=LOCATION \
    --max-dispatches-per-second=DISPATCH_RATE \
    --max-concurrent-dispatches=MAX_CONCURRENT_DISPATCHES
```

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues update QUEUE_ID \
    --location=LOCATION \
    --max-concurrent-dispatches=MAX_CONCURRENT_DISPATCHES
```

### Retry parameters

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues update QUEUE_ID \
    --location=LOCATION \
    --max-attempts=MAX_ATTEMPTS \
    --max-retry-duration=MAX_RETRY_DURATION \
    --min-backoff=MIN_INTERVAL \
    --max-backoff=MAX_INTERVAL \
    --max-doublings=MAX_DOUBLINGS
```

Verify:

```bash
gcloud tasks queues describe QUEUE_ID --location=LOCATION
```

### Queue-level routing for HTTP tasks

When updating an existing queue, pause it first and wait one minute after the change before resuming.

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues pause QUEUE_ID --location=LOCATION
```

```bash
curl -X PATCH -d @- -i \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  "https://cloudtasks.googleapis.com/v2/projects/PROJECT_ID/locations/LOCATION/queues/QUEUE_ID?updateMask=httpTarget.uriOverride" << EOF
{
  "httpTarget": {"uriOverride":{"host":"NEW_HOST"}}
}
EOF
```

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues resume QUEUE_ID --location=LOCATION
```

`ACCESS_TOKEN` comes from `gcloud auth application-default login` then `gcloud auth application-default print-access-token`; `PROJECT_ID` from `gcloud config get-value project`.

### Queue-level routing for App Engine tasks

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues update QUEUE_ID \
    --location=LOCATION \
    --routing-override=service:SERVICE,version:VERSION
```

Adapted (not in the official docs): added `--location=LOCATION`; without it gcloud uses the location of the project's App Engine app (and fails if there is none).

```bash
gcloud tasks queues update QUEUE_ID \
    --location=LOCATION \
    --clear-routing-override
```

## Options / Props

| gcloud flag | Meaning |
| --- | --- |
| `--max-dispatches-per-second` | Rate at which tokens in the bucket are refreshed (steady-state dispatch rate) |
| `--max-concurrent-dispatches` | Maximum number of tasks that can run at once |
| `--max-attempts` | Maximum attempts including the first; `-1` for unlimited |
| `--max-retry-duration` | Time limit measured from the first attempt; string ending in "s" (for example `5s`); `0s` for unlimited |
| `--min-backoff` / `--max-backoff` | Minimum / maximum wait between retries; string ending in "s" |
| `--max-doublings` | Times the retry interval doubles before growing linearly |
| `--routing-override` | `service:SERVICE,version:VERSION` for App Engine queue-level routing |

| API field | queue.yaml equivalent |
| --- | --- |
| `max_dispatches_per_second` | `rate` |
| `max_concurrent_dispatches` | `max_concurrent_requests` |
| `max_burst_size` (system-calculated from `max_dispatches_per_second`) | `bucket_size` |

## Notes

- Retry interval example: `MIN_INTERVAL` 10s, `MAX_INTERVAL` 300s, `MAX_DOUBLINGS` 3 gives 10s, 20s, 40s, 80s, 160s, 240s, 300s, 300s and so on. With unlimited attempts and duration the task retries until the maximum task retention limit (see quotas). Retrying stops only after both `MAX_ATTEMPTS` and `MAX_RETRY_DURATION` conditions are met, or the task succeeds; then the task is deleted.
- Rate limiting uses a token bucket; uneven load can let the actual dispatch rate exceed `max_dispatches_per_second` (possible downstream 429 / 503). A small `max_concurrent_dispatches` (API) or small `bucket_size` (`queue.yaml`) gives more control.
- Use either a `queue.yaml` file or the Cloud Tasks API to configure queues, not both: https://docs.cloud.google.com/tasks/docs/queue-yaml
- Queue-level routing is incompatible with Cloud KMS CMEK; with CMEK enabled you cannot create tasks on a queue with queue-level routing or apply it. To remove HTTP queue-level routing send a PATCH with empty payload and `updateMask` `httpTarget` (RPC: `update_mask` `http_target`). New configuration can take up to one minute to apply.
- A task-level retry configuration overrides the queue-level one: https://docs.cloud.google.com/tasks/docs/configure-retry-task
- Adapted from the official docs: the `gcloud tasks queues update`, `pause` and `resume` commands had no `--location` (for example `gcloud tasks queues pause QUEUE_ID`); `--location=LOCATION` was added so they act on the same queue as the `describe --location=LOCATION` verify step. Without it, `--location` defaults to the App Engine app's location "if there is an associated app" (https://docs.cloud.google.com/sdk/gcloud/reference/tasks/queues/update).
- Source: https://docs.cloud.google.com/tasks/docs/configuring-queues (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-queues.md](./creating-queues.md)
- [creating-http-target-tasks.md](./creating-http-target-tasks.md)
- [quotas.md](./quotas.md)
