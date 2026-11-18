---
source: https://docs.cloud.google.com/eventarc/standard/docs/overview
---

# Eventarc Standard overview

Eventarc Standard routes state-change events between decoupled microservices. Events from Google providers (sent directly from the source, or through Cloud Audit Logs entries) use Pub/Sub as the transport layer and are delivered to destinations through Pub/Sub push subscriptions. Delivery, security, authorization, observability, and error handling are managed for you. You can manage it from the Google Cloud console, the gcloud CLI, or the Eventarc API.

## Signature / Usage

### Create a trigger with a location and destination region

```bash
gcloud eventarc triggers create trigger-pubsub \
    --destination-run-service=hello \
    --destination-run-region=us-central1 \
    --location=us-central1 \
    --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
    --transport-topic=projects/your-projectid/topics/your-topic
```

## Options / Props

### Event destinations

| Destination | Detail |
|---|---|
| Cloud Run | Build an event receiver service; see Event routes for routing options |
| Cloud Run functions | All event-driven functions use Eventarc triggers; any Eventarc event type can trigger a function |
| GKE | Public endpoints of private and public services in a GKE cluster. Grant the Eventarc service account the needed permissions; enable Workload Identity Federation for GKE on the cluster (required to set up the event forwarder). The event forwarder pulls events from Pub/Sub and forwards them; Eventarc manages its lifecycle and restores it if deleted |
| Internal HTTP endpoints in a VPC network | Requires a network attachment ID on the trigger |
| Workflows | Needs an IAM service account email that the trigger uses to invoke workflow executions; events are passed as runtime arguments |

### Delivery and limits

| Aspect | Detail |
|---|---|
| Providers | More than 130 Google providers |
| Cloud Audit Logs events | Delivered in under a minute; a CAL trigger can take up to two minutes to propagate and filter events after creation |
| Pub/Sub events | Delivered in seconds |
| Ordering | No in-order, first-in-first-out delivery guarantee |
| Latency and throughput | Best effort |
| Default message retention | 24 hours with an exponential backoff delay |
| Payload encoding | `application/json` or `application/protobuf` depending on provider; not supported for custom sources, third-party providers, or direct events from Pub/Sub |
| Trigger update | An event generated before an update is routed by the previous filtering and delivered to the original destination within three days of generation; new filtering applies to events generated after the update |

### Event filter types

| Type | Filter |
|---|---|
| Cloud Audit Logs | `type=google.cloud.audit.log.v1.written`, with `serviceName` and `methodName` values from the audit logs |
| Direct events | Specific types, for example `type=google.cloud.storage.object.v1.finalized` or `type=google.cloud.pubsub.topic.v1.messagePublished` |

## Notes

- Preview (subject to Pre-GA Offerings Terms) while Eventarc Standard is GA: Google Kubernetes Engine as an event destination; internal HTTP endpoints in a VPC network as an event destination; third-party events sent directly from third-party providers.
- Trigger location: regional triggers, or for some events a global trigger that receives events from all regions. Set the trigger location to match the location of the service generating events to avoid performance and data residency issues. Use `--location` per command; for Cloud Run, if `--destination-run-region` is not specified the service is assumed to be in the trigger's region.
- Cloud Storage triggers can fail if an event originates from a region not permitted by your Pub/Sub message storage policy while `"enforceInTransit": true`; for a multi-region trigger, allow all source regions within it.
- Pub/Sub subscriptions created for Eventarc persist regardless of activity and do not expire. Update the retry policy through the associated subscription. For Cloud Run destinations (including Cloud Run functions) you can configure a single delivery attempt with no retries; this is the default when you create the trigger in the Google Cloud console for a Cloud Run destination.
- Backwards-compatible changes: optional filtering attributes, output-only attributes, and optional payload fields.
- Workflows destinations: use a service account with the least privileges necessary to access the required resources.
- An event payload in JSON is larger than in Protobuf, which can affect reliability against destination event size limits.
- Compliance: Eventarc Standard is compliant with specific certifications; Eventarc Advanced is not and can be disabled with a custom organization policy. Compliance does not apply to Preview features.
- Quotas and limits: https://docs.cloud.google.com/eventarc/docs/quotas (Workflows has its own limits).
- Source: https://docs.cloud.google.com/eventarc/standard/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/eventarc/docs/understand-locations (the overview itself has no code).

## Related

- [overview.md](./overview.md)
- [eventarc-advanced-overview.md](./eventarc-advanced-overview.md)
- [event-providers-targets.md](./event-providers-targets.md)
- [understand-locations.md](./understand-locations.md)
- [cloudevents.md](./cloudevents.md)
