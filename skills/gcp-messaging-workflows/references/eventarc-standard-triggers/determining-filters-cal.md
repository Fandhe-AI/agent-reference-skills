---
source: https://docs.cloud.google.com/eventarc/docs/determining-filters-cal
---

# Determine Event Filters for Cloud Audit Logs

Eventarc triggers with `type=google.cloud.audit.log.v1.written` send requests to a destination when an audit log entry matches the trigger's filter. Matching uses `serviceName` (the service that wrote the audit log), `methodName` (the operation being audited) and `resourceName` (the resource being audited). To find exact values, generate the event and read its Cloud Audit Logs entry.

## Signature / Usage

### Identify event filters

1. Ensure the Data Access audit log types are enabled for your service (Audit Logs page, **Log Types** tab: select **Admin Read**, **Data Read** and **Data Write**, then **Save**). Services with auditing enabled by default are not listed.
2. Perform the operation (for example, store a file in a Cloud Storage bucket).
3. In Logs Explorer, query the entries, for example:

```text
resource.type="gcs_bucket" resource.labels.bucket_name="eventarc-bucket"
```

The `protoPayload` field distinguishes an audit log entry. Abbreviated example (not strict JSON):

```text
{
   protoPayload:{
      @type:"type.googleapis.com/google.cloud.audit.AuditLog",
      status:{},
      authenticationInfo:{},
      requestMetadata:{},
      serviceName:"storage.googleapis.com",
      methodName:"storage.objects.create",
      authorizationInfo:[],
      resourceName:"projects/_/buckets/eventarc-bucket/objects/random.txt",
      resourceLocation:{}
   },
   insertId:"il9evleafpdk",
   resource:{
      type:"gcs_bucket",
      labels:{
         project_id:"cloud-run-test",
         location:"us-central1",
         bucket_name:"eventarc-bucket"
      }
   },
   timestamp:"2021-03-05T15:55:20.754688805Z",
   severity:"INFO",
   logName:"projects/cloud-run-test/logs/cloudaudit.googleapis.com%2Fdata_access",
   receiveTimestamp:"2021-03-05T15:55:20.884984611Z"
}
```

### Retrieve event filter values

```bash
gcloud eventarc audit-logs-provider service-names list
```

```bash
gcloud eventarc audit-logs-provider method-names list \
     --service-name=SERVICE_NAME
```

Replace `SERVICE_NAME` with a `serviceName` value, for example `bigquery.googleapis.com`.

### Trigger examples

A Workflows destination, filtering audit logs written by `bigquery.googleapis.com` for `google.cloud.bigquery.v2.JobService.InsertJob`:

```bash
gcloud eventarc triggers create cal-workflows-trigger \
   --location=us-central1 \
   --destination-workflow=my-workflow \
   --destination-workflow-location=europe-west4 \
   --event-filters="type=google.cloud.audit.log.v1.written" \
   --event-filters="serviceName=bigquery.googleapis.com" \
   --event-filters="methodName=google.cloud.bigquery.v2.JobService.InsertJob" \
   --service-account=${TRIGGER_SA}@${PROJECT_ID}.iam.gserviceaccount.com
```

A Cloud Run destination, filtering audit logs written by `workflows.googleapis.com` for `google.cloud.workflows.v1.Workflows.GetWorkflow` on one resource:

```bash
gcloud eventarc triggers create cal-run-trigger \
   --location=us-central1 \
   --destination-run-service=helloworld-events \
   --destination-run-region=us-central1 \
   --event-filters="type=google.cloud.audit.log.v1.written" \
   --event-filters="serviceName=workflows.googleapis.com" \
   --event-filters="methodName=google.cloud.workflows.v1.Workflows.GetWorkflow" \
   --event-filters="resourceName=projects/_/locations/us-central1/workflows/test-workflow" \
   --service-account=${PROJECT_NUMBER}-compute@developer.gserviceaccount.com
```

### Oversized (split) audit log entries

```bash
gcloud logging read "split.index=0"
```

## Options / Props

| Filter attribute | Meaning |
|---|---|
| `type` | `google.cloud.audit.log.v1.written` |
| `serviceName` | The service that wrote the audit log (`protoPayload.serviceName`) |
| `methodName` | The operation being audited (`protoPayload.methodName`) |
| `resourceName` | The resource being audited (`protoPayload.resourceName`); supports path patterns |

| Audit log entry check | Expected value |
|---|---|
| `protoPayload.@type` | `type.googleapis.com/google.cloud.audit.AuditLog` |
| `logName` | Includes the domain `cloudaudit.googleapis.com` |

## Notes

- Data Access audit logs must be enabled for the service you are watching; Admin Read, Data Read and Data Write are the log types the source selects.
- `gcloud eventarc audit-logs-provider` no longer retrieves the latest provider `serviceName` and `methodName` values. The source recommends identifying the filter from a real audit log entry, or using the Google Cloud services with audit logs list (https://docs.cloud.google.com/logging/docs/audit/services).
- Eventarc is available in specific regions and in the `global` location for Cloud Audit Logs triggers; it is not available in dual-region and multi-region locations. With `global` you receive events from all locations for which the filters match (for example Cloud Storage buckets in the EU and US multi-regions).
- Cloud Logging splits audit log entries larger than its usage limit into several entries with a `split` field (a `LogSplit` object). Each split entry carries the same `serviceName`, `methodName` and `resourceName`, and Eventarc triggers deliver one event per split entry.
- The Cloud Run example uses the Compute Engine default service account, as in the source. See `roles-permissions.md` for the trigger service account and its roles; the Workflows example uses a `TRIGGER_SA` variable.
- Source: https://docs.cloud.google.com/eventarc/docs/determining-filters-cal (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-trigger-cloud-audit-logs-gcloud.md](./create-trigger-cloud-audit-logs-gcloud.md)
- [path-patterns.md](./path-patterns.md)
- [roles-permissions.md](./roles-permissions.md)
