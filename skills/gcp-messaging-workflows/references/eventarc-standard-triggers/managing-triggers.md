---
source: https://docs.cloud.google.com/eventarc/docs/managing-triggers
---

# Managing Eventarc Triggers

List, describe, update and delete Eventarc triggers with the Google Cloud console, the gcloud CLI or the Eventarc REST API (`eventarc.googleapis.com/v1`). Updates are supported for Cloud Run, GKE and Workflows destinations, and which fields can be updated depends on the destination.

## Signature / Usage

### List triggers

```bash
gcloud eventarc triggers list --location=-
```

This lists trigger name, type, destination and status in all locations. REST: `projects.locations.triggers.list`.

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://eventarc.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/triggers"
```

### Describe a trigger

```bash
gcloud eventarc triggers describe TRIGGER \
    --location=LOCATION
```

Example output:

```text
  createTime: '2023-03-16T13:40:44.889670204Z'
  destination:
    cloudRun:
      path: /
      region: us-central1
      service: hello
  eventDataContentType: application/protobuf
  eventFilters:
  - attribute: serviceName
    value: cloudscheduler.googleapis.com
  - attribute: methodName
    value: google.cloud.scheduler.v1.CloudScheduler.DeleteJob
  - attribute: type
    value: google.cloud.audit.log.v1.written
  name: projects/project-name/locations/us-central1/triggers/name-of-trigger
  serviceAccount: project-number-compute@developer.gserviceaccount.com
  transport:
    pubsub:
      subscription: projects/project-name/subscriptions/eventarc-us-central1-name-of-trigger-sub-034
      topic: projects/project-name/topics/eventarc-us-central1-name-of-trigger-931
```

REST: `projects.locations.triggers.get` (`GET .../locations/LOCATION/triggers/TRIGGER_NAME`).

### Update a trigger: Cloud Run

```bash
gcloud eventarc triggers update TRIGGER \
    --location=LOCATION \
    --event-filters=NEW_EVENT_FILTERS \
    --service-account=NEW_SERVICE_ACCOUNT \
    --destination-run-region=NEW_REGION \
    --destination-run-service=NEW_SERVICE \
    --destination-run-path=NEW_PATH \
    --event-data-content-type="NEW_EVENT_DATA_TYPE" \
    --max-retry-attempts=1
```

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud eventarc triggers update my-cloud-run-trigger \
    --service-account="new-serviceaccount@${PROJECT_ID}.iam.gserviceaccount.com"
```

### Update a trigger: GKE (Pre-GA)

This also applies to the public endpoints of private and public services running in a GKE cluster.

```bash
gcloud eventarc triggers update TRIGGER \
    --location=LOCATION \
    --destination-gke-namespace=NEW_NAMESPACE \
    --destination-gke-service=NEW_SERVICE \
    --destination-gke-path=NEW_PATH \
    --event-data-content-type="NEW_EVENT_DATA_TYPE"
```

```bash
gcloud eventarc triggers update my-gke-trigger \
    --destination-gke-service=helloworld-events
```

### Update a trigger: Workflows

```bash
gcloud eventarc triggers update TRIGGER \
    --location=LOCATION \
    --event-filters=NEW_EVENT_FILTERS \
    --service-account=NEW_SERVICE_ACCOUNT \
    --destination-workflow=NEW_DESTINATION_WORKFLOW \
    --destination-workflow-location=NEW_DESTINATION_WORKFLOW_LOCATION \
    --event-data-content-type="NEW_EVENT_DATA_TYPE"
```

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud eventarc triggers update my-workflows-trigger \
    --service-account="new-serviceaccount@${PROJECT_ID}.iam.gserviceaccount.com"
```

### Update a trigger: REST

Use `projects.locations.triggers.patch` with the optional `updateMask` query parameter. Request body template (placeholders are replaced with JSON values, so this is not valid JSON until filled in):

```text
{
  "serviceAccount": "SERVICE_ACCOUNT@PROJECT_ID.iam.gserviceaccount.com",
  "destination": DESTINATION,
  "eventFilters": EVENT_FILTER,
  "eventDataContentType": "CONTENT_TYPE",
  "retryPolicy": RETRY_POLICY
}
```

```bash
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://eventarc.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/triggers/TRIGGER_NAME?updateMask="UPDATE_FIELDS""
```

The response is an `Operation` with `metadata.verb` `update`; `"done": false` means the operation is still in progress.

### Delete a trigger

```bash
gcloud eventarc triggers delete TRIGGER
```

REST: `curl -X DELETE` against `https://eventarc.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/triggers/TRIGGER_NAME` (same bearer-token header as above); the response is an `Operation` with `metadata.verb` `delete`.

## Options / Props

### gcloud update placeholders

| Placeholder | Description |
|---|---|
| `TRIGGER` | ID of the trigger or a fully qualified identifier. |
| `LOCATION` | Location of the Eventarc trigger. |
| `NEW_EVENT_FILTERS` | Filter for event routing, for example `methodName=storage.objects.create` can be updated to `methodName=storage.objects.delete`. After creation the `type` event filter can't be changed; for a different event type, create a new trigger. |
| `NEW_SERVICE_ACCOUNT` | IAM service account email associated with the trigger. |
| `NEW_REGION` / `NEW_SERVICE` / `NEW_PATH` | Cloud Run destination region, service name and relative path. |
| `NEW_NAMESPACE` / `NEW_SERVICE` / `NEW_PATH` | GKE destination namespace, service name and relative path. |
| `NEW_DESTINATION_WORKFLOW` / `NEW_DESTINATION_WORKFLOW_LOCATION` | ID and location of the deployed destination workflow. |
| `NEW_EVENT_DATA_TYPE` | Payload encoding; depending on the event provider, `application/json` or `application/protobuf`. |
| `--max-retry-attempts=1` | Optional. Single delivery attempt with no retries; the only valid value is `1`. Applies only to Cloud Run destinations (including Cloud Run functions). Clear it with `--clear-max-retry-attempts`. |

### REST patch request fields

| Name | Description |
|---|---|
| `serviceAccount` | Optional. IAM service account email associated with the trigger. |
| `destination` | Optional. A `Destination`, for example `{"destination": {"workflow": "projects/my-project/locations/us-central1/workflows/my-first-workflow"}}` or `{"destination": {"cloudRun": {"service": "hello-world", "region": "us-central1"}}}`. |
| `eventFilters` | Optional. Only updating the method type for Cloud Audit Logs triggers is supported, for example `{"eventFilters": [{"attribute": "methodName", "value": "storage.buckets.create"}, {"attribute": "type", "value": "google.cloud.audit.log.v1.written"}, {"attribute": "serviceName", "value": "storage.googleapis.com"}]}`. Method types can't be updated for GKE destinations. |
| `eventDataContentType` | Optional. `application/json` or `application/protobuf`, depending on the event provider. |
| `retryPolicy` | Optional. `{"retryPolicy": {"maxAttempts": 1}}`; valid value `1` (single attempt, no retries), Cloud Run destinations only. |
| `updateMask` (query) | Optional comma-separated list of fields to update, for example `serviceAccount,destination`. If not provided, all provided fields are updated. |

## Notes

- Adapted from the official docs: unquoted shell variable expansions in the commands are double-quoted (`"${VAR}"`).
- Important: if you update a trigger before its generated event is delivered, the event is routed according to the previous filtering and delivered to the original destination within three days of the event generation. The new filtering applies to events generated after the update.
- Deleting a trigger also deletes any new Pub/Sub topic that Eventarc created when the trigger was created. Try deletes on a disposable project first.
- In the console you can't update unavailable fields such as the Event provider and Event destination.
- If the trigger condition indicates an issue with the Pub/Sub topic, see the Eventarc troubleshooting page ("Trigger is not delivering events").
- The source also shows Console steps and PowerShell (`Invoke-WebRequest`) forms, plus REST response samples, which are omitted here.
- Source: https://docs.cloud.google.com/eventarc/docs/managing-triggers (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [roles-permissions.md](./roles-permissions.md)
- [path-patterns.md](./path-patterns.md)
- [determining-filters-cal.md](./determining-filters-cal.md)
