---
source: https://docs.cloud.google.com/eventarc/docs/retry-events
---

# Retry events (Eventarc Standard)

Eventarc Standard delivers events at least once. If a destination fails to acknowledge an event, Eventarc redelivers it. Retry behaviour matches its transport layer, Pub/Sub, and is controlled by the subscription retry policy of the Pub/Sub subscription that Eventarc creates for each trigger.

## Signature / Usage

### Identify the subscription

```bash
gcloud eventarc triggers describe TRIGGER_NAME \
    --location=LOCATION
```

Output (excerpt) that includes the subscription ID:

```text
  createTime: '2023-03-16T13:40:44.889670204Z'
  destination:
    cloudRun:
      path: /
      region: us-central1
      service: hello
  eventDataContentType: application/protobuf
  eventFilters:
  ...
  transport:
    pubsub:
      subscription: projects/PROJECT_ID/subscriptions/SUBSCRIPTION_ID
      topic: projects/PROJECT_ID/topics/TOPIC_ID
```

Or with the REST API (`projects.locations.triggers.get`):

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://eventarc.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/triggers/TRIGGER_NAME"
```

```json
{
  "name": "projects/PROJECT_ID/locations/LOCATION/triggers/TRIGGER_NAME",
  "uid": "d700773a-698b-47b2-a712-2ee10b690062",
  "createTime": "2022-12-06T22:44:04.744001514Z",
  "updateTime": "2022-12-06T22:44:09.116459550Z",
  "eventFilters": [
    {
      "attribute": "type",
      "value": "google.cloud.pubsub.topic.v1.messagePublished"
    }
  ],
  "serviceAccount": "SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com",
  "destination": {
    "workflow": "projects/PROJECT_ID/locations/LOCATION/workflows/WORKFLOW_NAME"
  },
  "transport": {
    "pubsub": {
      "topic": "projects/PROJECT_ID/topics/TOPIC_ID",
      "subscription": "projects/PROJECT_ID/subscriptions/SUBSCRIPTION_ID"
    }
  }
}
```

### Update the retry policy (gcloud)

Specify both flags to retry after an exponential backoff delay; an omitted flag reverts to its default.

```bash
gcloud pubsub subscriptions update SUBSCRIPTION_ID \
    --min-retry-delay=MIN_RETRY_DELAY \
    --max-retry-delay=MAX_RETRY_DELAY
```

To clear the retry policy and retry immediately, use `--clear-retry-policy`.

### Update the retry policy (REST)

Request body (`projects.subscriptions.patch`), saved as `request.json`:

```json
{
  "subscription": {
    "retryPolicy": {
      "minimumBackoff": "MIN_RETRY_DELAYs",
      "maximumBackoff": "MAX_RETRY_DELAYs"
    }
  },
  "updateMask": "retry_policy.maximum_backoff,retry_policy.minimum_backoff"
}
```

```bash
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://pubsub.googleapis.com/v1/projects/PROJECT_ID/subscriptions/SUBSCRIPTION_ID"
```

## Options / Props

### Default retry behaviour

| Setting | Value |
|---------|-------|
| Delivery | At least once |
| Retry policy | Exponential backoff delay, applied when the destination cannot acknowledge a message |
| Minimum backoff (default) | 10 seconds |
| Maximum backoff (default) | 600 seconds |
| Allowed range for each of min / max backoff | Between 0 and 600 seconds |
| Message retention duration (set by Eventarc) | 24 hours |
| Eventarc-created subscription ID prefix | `eventarc-REGION-` |
| Push backoff (Pub/Sub, after too many negative acknowledgments) | Delivery pauses for a span between 100 milliseconds and 60 seconds |

### Retries for Cloud Run destinations (including Cloud Run functions)

| Where the trigger is created | Default |
|------------------------------|---------|
| Google Cloud console from the Cloud Run page | A single delivery attempt, no retries |
| gcloud CLI, Terraform, or Console from the Eventarc page | Retries enabled |

## Notes

- If an event cannot be delivered within the message retention window, it is discarded unless a dead-letter topic is configured. Set the dead-letter topic when you create or update the Pub/Sub subscription, not when you create a Pub/Sub topic or when Eventarc creates one. Dead-letter topic setup and the Pub/Sub service agent grants it needs are described on the Pub/Sub "Handle message failures" page (https://docs.cloud.google.com/pubsub/docs/handling-failures#how-dead-letter-topics-work).
- The source recommends disabling retries when developing or testing Cloud Run destination code to avoid runaway retry attempts (cost and resource use), and enabling retries in production while following the best practices for handling retries (for example, a dead-letter topic).
- Errors that do not warrant retries: Events to a Workflows destination from any source are not retried if the workflow does not execute. Workflows acknowledges events as soon as the workflow execution starts; if the execution later fails it is not retried, so handle errors and retries inside the workflow.
- Duplicates: the CloudEvents combination of `source` and `id` is unique, so events with the same combination are duplicates. Make handlers idempotent: use the event ID as the idempotency key for external APIs; make mutations repeatable without changing the outcome; query database state in a transaction before mutating; make all side effects idempotent; persist which event IDs were processed; or clean up duplicates out-of-band.
- All retry and retention settings are configured through the Pub/Sub subscription retry policy associated with the trigger. Shortening retention or clearing the policy changes redelivery behaviour; try changes on a disposable project first.
- The source also shows Console, Terraform (an `import` block with `lifecycle { ignore_changes = [push_config] }`, because Eventarc manages the push configuration) and PowerShell forms; they are omitted here. Subscription limits are on the Pub/Sub resource limits page.
- Source: https://docs.cloud.google.com/eventarc/docs/retry-events (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [quickstart-pubsub.md](./quickstart-pubsub.md)
- [create-trigger-thirdparty.md](./create-trigger-thirdparty.md)
- [route-vpc-internal-endpoint-events.md](./route-vpc-internal-endpoint-events.md)
