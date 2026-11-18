---
source: https://docs.cloud.google.com/eventarc/docs/understand-locations
---

# Understand Eventarc locations

Every Eventarc event workflow has three location dimensions: the event source, the Eventarc trigger that manages routing, and the target that processes the payload. Targets can be in a different region from the source, but trigger location requirements depend on the event provider. This page covers Eventarc Standard triggers.

## Signature / Usage

### Source location dictates trigger location

The Cloud Storage bucket is in `europe-west1`, so the trigger must also be in `europe-west1`; the target (Cloud Run service) can be in another region.

```bash
gcloud eventarc triggers create trigger-storage \
    --destination-run-service=hello \
    --destination-run-region=us-central1 \
    --location=europe-west1 \
    --event-filters="type=google.cloud.storage.object.v1.finalized" \
    --event-filters="bucket=my-bucket-in-europe-west1-region" \
    --service-account=$PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

### Cloud Audit Logs triggers

Single-region trigger for storage events from a `europe-west1` bucket (matches all buckets in that region, because audit log triggers cannot filter by bucket; use a direct Cloud Storage trigger to filter by bucket):

```bash
gcloud eventarc triggers create trigger-auditlog \
    --destination-run-service=hello \
    --destination-run-region=us-central1 \
    --location=europe-west1 \
    --event-filters="type=google.cloud.audit.log.v1.written" \
    --event-filters="serviceName=storage.googleapis.com" \
    --event-filters="methodName=storage.objects.create" \
    --service-account=$PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

Global trigger to match dual-region or multi-region buckets such as `eu` (matches all buckets in all regions for which the event filters match).

Adapted (not in the official docs): the source's example filters on the direct Cloud Storage event type, which cannot use `--location=global`; the filters are replaced with the audit log filters the surrounding text describes.

```bash
gcloud eventarc triggers create trigger-auditlog-global \
    --destination-run-service=hello \
    --destination-run-region=us-central1 \
    --location=global \
    --event-filters="type=google.cloud.audit.log.v1.written" \
    --event-filters="serviceName=storage.googleapis.com" \
    --event-filters="methodName=storage.objects.create" \
    --service-account=$PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

### Cloud Storage triggers (must match the bucket location)

```bash
gcloud eventarc triggers create trigger-storage \
    --destination-run-service=hello \
    --destination-run-region=us-central1 \
    --location=eu \
    --event-filters="type=google.cloud.storage.object.v1.finalized" \
    --event-filters="bucket=my-bucket-in-eu-multi-region" \
    --service-account=$PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

Mismatched bucket and trigger regions produce an error like:

```text
ERROR: (gcloud.eventarc.triggers.create) INVALID_ARGUMENT: The request was
invalid: Bucket "my-bucket-in-eu-multi-region" location "eu" does not match
trigger location "europe-west1". Try again by creating the trigger in "eu".
```

### Pub/Sub triggers (single region required)

```bash
gcloud eventarc triggers create trigger-pubsub \
    --destination-run-service=hello \
    --destination-run-region=us-central1 \
    --location=us-central1 \
    --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
    --transport-topic=projects/your-projectid/topics/your-topic
```

## Options / Props

### Trigger location by provider

| Provider | Supported trigger locations | `global` trigger |
|---|---|---|
| Cloud Audit Logs | Single-region locations; not supported in dual-region and multi-region locations. The event source's location dictates the trigger location (typically single-region) | Yes |
| Cloud Storage (direct events) | Single-region, dual-region, and multi-region; must match the bucket location | No |
| Pub/Sub (direct events) | Single-region locations only; the region is required even though topics are global | No |

## Notes

- The examples use the Compute Engine default service account (`$PROJECT_NUMBER-compute@developer.gserviceaccount.com`) as in the source. The Standard overview recommends, for Workflows destinations, "a service account with the least privileges necessary to access the required resources"; prefer a dedicated, least-privileged service account.
- Corrected from the official docs: the third Cloud Audit Logs example used `--event-filters="type=google.cloud.storage.object.v1.finalized"` and `--event-filters="bucket=my-bucket-in-europe-west1-region"` with `--location=global`, which contradicts the Cloud Storage section ("you can't create a global Eventarc trigger") and the text above it. The trigger name was also changed to avoid a clash with `trigger-storage`.
- Known issue: Cloud Audit Logs triggers for Compute Engine produce events from a single region, `us-central1`, regardless of the VM's location. Set the trigger location to `us-central1` or `global`.
- Because Eventarc Standard uses Pub/Sub as its transport layer, Cloud Storage triggers can fail if an event originates from a region not permitted by your Pub/Sub message storage policy while `"enforceInTransit": true`. For a multi-region trigger, allow all source regions within the multi-region.
- For Pub/Sub triggers, Eventarc configures geofencing so events persist only in the specified location; regional Pub/Sub service endpoints can keep all data in a single region.
- Multi-regional deployments and duplicates: each Pub/Sub trigger creates its own underlying subscription. Identical triggers in several regions on the same global topic each receive every message (fan-out), duplicating processing. To avoid it, create a single trigger in one region pointing to a global external application load balancer that routes to regional backends (for example Cloud Run services in several regions). Eventarc provides at-least-once delivery; make event handlers idempotent.
- To route events across projects, see the cross-project triggers tutorial https://docs.cloud.google.com/eventarc/docs/cross-project-triggers.
- Source: https://docs.cloud.google.com/eventarc/docs/understand-locations (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [eventarc-standard-overview.md](./eventarc-standard-overview.md)
- [event-providers-targets.md](./event-providers-targets.md)
- [event-types.md](./event-types.md)
