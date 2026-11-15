---
source: https://docs.cloud.google.com/run/docs/function-triggers
---

# Cloud Run functions triggers

Overview of the triggers supported by Cloud Run functions: event-driven triggers (via Eventarc) and HTTP triggers.

## Signature / Usage

### Add an Eventarc trigger to a deployed function

Snippet taken from https://docs.cloud.google.com/run/docs/deploy-functions:

```bash
gcloud eventarc triggers create EVENTARC_TRIGGER_NAME \
    --location=EVENTARC_TRIGGER_LOCATION \
    --destination-run-service=FUNCTION \
    --destination-run-region=REGION \
    --event-filters="type=EVENTARC_FILTER_TYPE" \
    --event-filters="EVENTARC_EVENT_FILTER" \
    --service-account=EVENTARC_TRIGGER_SERVICE_ACCOUNT
```

## Options / Props

| Trigger type | Function type | Details |
| --- | --- | --- |
| Event-driven triggers | Event-driven (CloudEvent) functions | Reacts to events in your Google Cloud project. Must use Eventarc (Google's CloudEvents implementation). |
| HTTP triggers | HTTP functions | Reacts to HTTP(S) requests; other (non-Eventarc) Google Cloud services can invoke the function over HTTP(S). |

| Example | Kind | Page |
| --- | --- | --- |
| Pub/Sub events via Eventarc | Event-driven | https://docs.cloud.google.com/run/docs/triggering/pubsub-triggers |
| Cloud Storage events via Eventarc | Event-driven | https://docs.cloud.google.com/run/docs/triggering/storage-triggers |
| Firestore events via Eventarc | Event-driven | https://docs.cloud.google.com/run/docs/triggering/firestore-triggers |
| Other event triggers (any Eventarc event type, 90+ sources via Cloud Audit Logs) | Event-driven | https://docs.cloud.google.com/run/docs/triggering/trigger-with-events |
| HTTP request | HTTP | https://docs.cloud.google.com/run/docs/triggering/https-request |
| Workflows | HTTP | https://docs.cloud.google.com/run/docs/triggering/invoke-services-from-workflows |
| Cloud Scheduler | HTTP | https://docs.cloud.google.com/run/docs/triggering/using-scheduler |
| Cloud Tasks | HTTP | https://docs.cloud.google.com/run/docs/triggering/using-tasks |
| Pub/Sub push subscription | HTTP | https://docs.cloud.google.com/run/docs/tutorials/pubsub |

## Notes

- Every function on Cloud Run is a source-deployed service with an HTTP endpoint (`run.app` URL). Functions created with `gcloud functions` or the Cloud Functions v2 API have a `cloudfunctions.net` endpoint by default.
- You specify triggers when deploying in the console, or after deployment with the gcloud CLI.
- A function cannot be bound to more than one trigger at a time; deploy multiple functions with the same trigger settings to run several functions on the same event.
- Trigger binding is not instantaneous; it may take several minutes for a deployed function to start triggering on events.
- All event-driven functions use Eventarc for delivery; Pub/Sub and Cloud Storage triggers are particular Eventarc trigger types. Pub/Sub messages can also be routed directly over HTTP.
- Eventarc does not support direct events from Google Analytics for Firebase or Firebase Authentication.
- Integrations: Cloud Logging routes logs to a Pub/Sub topic (sinks) consumed by functions; Cloud Scheduler can call an HTTP function or publish to a Pub/Sub topic for an event-driven function; Cloud Tasks HTTP Target tasks can call an HTTP function and can throttle or rate-limit invocations; Gmail push notifications go to a Pub/Sub topic.
- Source: https://docs.cloud.google.com/run/docs/function-triggers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-functions.md](./deploy-functions.md)
- [write-functions.md](./write-functions.md)
- [comparison.md](./comparison.md)
