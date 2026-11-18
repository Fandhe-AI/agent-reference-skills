---
source: https://docs.cloud.google.com/logging/docs/central-log-storage
---

# Tutorial: aggregate and store your organization's logs

Create a log bucket, a project-level sink into it, and an organization-level non-intercepting aggregated sink that routes audit logs to the project; then grant read access to a log view and query in the Logs Explorer.

## Signature / Usage

### Create the log bucket

```bash
gcloud logging buckets create BUCKET_NAME \
  --location=LOCATION --project=PROJECT_ID
```

```bash
gcloud logging buckets list --project=PROJECT_ID
```

```text
gcloud logging buckets update BUCKET_NAME \
   --location=LOCATION --project=PROJECT_ID \
   --retention-days=365
```

### Create the project-level sink

Destination format for a log bucket (global endpoint `logging.googleapis.com` only; regional endpoints aren't supported):

```text
logging.googleapis.com/projects/PROJECT_ID/locations/LOCATION/buckets/BUCKET_NAME
```

```text
gcloud logging sinks create PROJECT_LEVEL_SINK_NAME SINK_DESTINATION \
  --project=PROJECT_ID \
  --log-filter='logName:cloudaudit.googleapis.com' \
  --description="Audit logs from my organization"
```

### Create the aggregated sink

```text
gcloud logging sinks create SINK_NAME \
  logging.googleapis.com/projects/PROJECT_ID  \
  --log-filter='logName:cloudaudit.googleapis.com' \
  --description="Audit logs from my organization" \
  --organization=ORGANIZATION_ID \
  --include-children
```

```text
gcloud logging sinks list --organization=ORGANIZATION_ID
```

```text
gcloud logging sinks describe SINK_NAME --organization=ORGANIZATION_ID
```

```text
writerIdentity: serviceAccount:o1234567890-ORGANIZATION_ID@gcp-sa-logging.iam.gserviceaccount.com
```

Grant that writer identity Logs Writer on the project that holds the log bucket (IAM page; don't include the `serviceAccount:` prefix when adding the principal).

### Restrict a log view with an IAM condition

Condition value (Resource > Name > Ends with):

```text
locations/LOCATION/buckets/BUCKET_NAME/views/_AllLogs
```

## Options / Props

### Placeholders

| Name | Meaning |
|---|---|
| `BUCKET_NAME` | Name of the log bucket |
| `LOCATION` | Bucket location; can't be changed after creation |
| `PROJECT_ID` | Project in which the bucket and project-level sink are created / that stores the bucket |
| `PROJECT_LEVEL_SINK_NAME`, `SINK_NAME` | Sink names; a sink can't be renamed |
| `SINK_DESTINATION` | The log bucket path above |
| `ORGANIZATION_ID` | Organization identifier |

### Required roles

| Task | Role |
|---|---|
| Create the aggregated sink | Logs Configuration Writer `roles/logging.configWriter` on the organization |
| Grant IAM roles to the service account and create the log bucket | Owner `roles/owner` on the project |
| Sink writer identity | Logs Writer on the destination project |
| View access to log entries | Logs Views Accessor `roles/logging.viewAccessor` with an IAM condition limited to the view |

## Notes

- `--include-children` is important: it routes entries from all projects and folders in the organization. The sink is non-intercepting, so entries are also routed by sinks in the originating project and you can store multiple copies.
- If the destination project is in a VPC Service Controls perimeter, add an ingress rule allowing the sink's service account (not needed for non-aggregated sinks).
- Without an IAM condition, Logs Views Accessor gives access to all log views on all user-defined log buckets in the project. Every log bucket gets an `_AllLogs` view containing all entries. Granting per view on the view's IAM policy is recommended for many views.
- Granting Logs Writer on the whole destination project gives the sink write access project-wide; the aggregated sink holds organization-wide audit logs including Data Access logs, which can contain personal data, so limit who can read the bucket.
- Extending retention to 365 days increases storage cost; shortening retention later deletes older entries. Test on a disposable project first.
- The source asks for Owner (`roles/owner`) on the project to grant IAM roles and create the log bucket. Owner is a basic role with full control of the project, including its IAM policy; grant it only to the person running the setup, or use narrower predefined or custom roles (see the Logging access control guide).
- The source also shows Console steps (IAM, Logs Explorer: Refine scope > Log view > `_AllLogs`) and verification by creating and deleting a Compute Engine VM to generate audit logs.
- Source: https://docs.cloud.google.com/logging/docs/central-log-storage (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [aggregated-sinks-overview.md](./aggregated-sinks-overview.md)
- [configure-export-v2.md](./configure-export-v2.md)
- [overview.md](./overview.md)
