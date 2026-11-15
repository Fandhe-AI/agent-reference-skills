---
source: https://docs.cloud.google.com/run/docs/triggering/storage-triggers
---

# Invoke with Cloud Storage triggers

Trigger a Cloud Run service or function, through Eventarc, whenever an object changes in a Cloud Storage bucket. The service and the bucket must be in the same Google Cloud project.

## Signature / Usage

### Create a trigger for a service

```bash
gcloud eventarc triggers create TRIGGER_NAME  \
    --location=LOCATION \
    --destination-run-service=DESTINATION_RUN_SERVICE  \
    --destination-run-region=DESTINATION_RUN_REGION \
    --event-filters="type=EVENT_FILTER_TYPE" \
    --event-filters="bucket=BUCKET" \
    --service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

### Deploy a function, then create its trigger

```bash
gcloud run deploy FUNCTION \
    --source . \
    --function FUNCTION_ENTRYPOINT \
    --base-image BASE_IMAGE_ID \
    --region REGION
```

```bash
gcloud eventarc triggers create TRIGGER_NAME  \
    --location=LOCATION \
    --destination-run-service=FUNCTION  \
    --destination-run-region=DESTINATION_RUN_REGION \
    --event-filters="type=EVENT_FILTER_TYPE" \
    --event-filters="bucket=BUCKET" \
    --service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

`EVENT_FILTER_TYPE` is one of the event types below, for example `google.cloud.storage.object.v1.finalized`. `BUCKET` is the globally unique bucket name.

## Options / Props

| Event | Event type (through Eventarc) | Occurs when |
|---|---|---|
| Object finalized | `google.cloud.storage.object.v1.finalized` | A new object is created, or an existing object is overwritten and Cloud Storage creates a new generation |
| Object deleted | `google.cloud.storage.object.v1.deleted` | An object is soft deleted |
| Object archived | `google.cloud.storage.object.v1.archived` | A live version of an object becomes a noncurrent version (Object Versioning) |
| Object metadata updated | `google.cloud.storage.object.v1.metadataUpdated` | The metadata of an existing object changes |

| Item | Detail |
|---|---|
| APIs to enable | Artifact Registry, Cloud Build, Cloud Run Admin API, Eventarc, Cloud Logging, Pub/Sub, Cloud Storage |
| Deployer roles | `roles/run.sourceDeveloper`, `roles/logging.viewAccessor`, `roles/resourcemanager.projectIamAdmin`, `roles/iam.serviceAccountAdmin`, `roles/iam.serviceAccountUser`, `roles/serviceusage.serviceUsageAdmin` |
| Notification limit | A bucket can have up to 10 notification configurations for a specific event; exceeding it makes further function deployments fail with `Cloud Storage bucket ...: Pub/Sub notification limit reached` |
| Delivery | Implemented with Pub/Sub notifications for Cloud Storage; subject to its delivery guarantees |
| `--event-filters` rules | `type` is required and cannot be changed; multiple filters must all match; no wildcards or regular expressions (`--event-filters-path-pattern` supports path patterns); `--max-retry-attempts` only accepts `1` |
| Propagation | A trigger can take up to two minutes to propagate and filter events |

## Notes

- Workaround for the 10-notification limit: create your own Pub/Sub topic, create a single Cloud Storage notification configuration (for example `OBJECT_FINALIZE`) sending to that topic, then create as many functions as needed triggered by that topic.
- Source inconsistency: this page says the deleted event occurs when an object is soft deleted; https://docs.cloud.google.com/storage/docs/pubsub-notifications describes `OBJECT_DELETE` as sent when an object has been permanently deleted, including objects replaced or deleted as part of the bucket's lifecycle configuration, and also for an object replaced by an upload of the same name when it does not become a noncurrent version.
- Use a user-managed service account for `SERVICE_ACCOUNT_NAME` with minimum permissions; if none is chosen the Console uses the Compute Engine default service account.
- Distance: Cloud Storage here is Google Cloud's object storage, distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). Cloud Run is distinct from Cloudflare Workers (`cloudflare-workers`) and Vercel Functions (`vercel`).
- The source also shows Console steps and refers to Terraform at https://docs.cloud.google.com/eventarc/docs/creating-triggers-terraform (not reproduced). Tutorials: https://docs.cloud.google.com/run/docs/tutorials/eventarc and https://docs.cloud.google.com/run/docs/tutorials/trigger-functions-storage
- Source: https://docs.cloud.google.com/run/docs/triggering/storage-triggers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [trigger-with-events.md](./trigger-with-events.md)
- [pubsub-triggers.md](./pubsub-triggers.md)
