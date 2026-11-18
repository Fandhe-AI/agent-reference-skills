---
source: https://docs.cloud.google.com/logging/docs/audit/understanding-audit-logs
---

# Understanding audit logs

Describes the structure of Cloud Audit Logs entries and how to read them: every audit log entry is a `LogEntry` whose `protoPayload` field contains an `AuditLog` object. Covers a sample entry, long-running operation and streaming API entries, and services that use the older `serviceData` field.

## Signature / Usage

### Sample audit log entry

An Admin Activity audit log entry written by App Engine for an IAM policy change (parts omitted by the source for brevity; the source's notation is not strict JSON):

```text
{
  protoPayload: {
    @type: "type.googleapis.com/google.cloud.audit.AuditLog",
    status: {},
    authenticationInfo: {
      principalEmail: "user@example.com"
    },
    serviceName: "appengine.googleapis.com",
    methodName: "SetIamPolicy",
    authorizationInfo: [...],
    serviceData: {
      @type: "type.googleapis.com/google.appengine.legacy.AuditData",
      policyDelta: { bindingDeltas: [
          action: "ADD",
          role: "roles/logging.privateLogViewer",
          member: "user:user@example.com"
      ], }
    },
    request: {
      resource: "my-gcp-project-id",
      policy: { bindings: [...], }
    },
    response: {
      bindings: [
        {
          role: "roles/logging.privateLogViewer",
          members: [ "user:user@example.com" ]
        }
      ],
    }
  },
  insertId: "53179D9A9B559.AD6ACC7.B40604EF",
  resource: {
    type: "gae_app",
    labels: { project_id: "my-gcp-project-id" }
  },
  timestamp: "2019-05-27T16:24:56.135Z",
  severity: "NOTICE",
  logName: "projects/my-gcp-project-id/logs/cloudaudit.googleapis.com%2Factivity",
}
```

### Query that selects the sample entry

Usable in the Logs Explorer, Logging API, or Google Cloud CLI; the project identifier is in the log name.

```text
resource.type = "gae_app"
logName = "projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Factivity"
```

For one instance of a resource type, add an instance qualifier:

Adapted (not in the official docs): `resource.instance_id` changed to `resource.labels.instance_id`, because the instance ID is a label of the `gce_instance` monitored resource.

```text
resource.type = "gce_instance"
resource.labels.instance_id = "INSTANCE_ID"
logName = "projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Factivity"
```

### Audit log names

```text
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Factivity
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fdata_access
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fsystem_event
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fpolicy

folders/FOLDER_ID/logs/cloudaudit.googleapis.com%2Factivity
folders/FOLDER_ID/logs/cloudaudit.googleapis.com%2Fdata_access
folders/FOLDER_ID/logs/cloudaudit.googleapis.com%2Fsystem_event
folders/FOLDER_ID/logs/cloudaudit.googleapis.com%2Fpolicy

billingAccounts/BILLING_ACCOUNT_ID/logs/cloudaudit.googleapis.com%2Factivity
billingAccounts/BILLING_ACCOUNT_ID/logs/cloudaudit.googleapis.com%2Fdata_access
billingAccounts/BILLING_ACCOUNT_ID/logs/cloudaudit.googleapis.com%2Fsystem_event
billingAccounts/BILLING_ACCOUNT_ID/logs/cloudaudit.googleapis.com%2Fpolicy

organizations/ORGANIZATION_ID/logs/cloudaudit.googleapis.com%2Factivity
organizations/ORGANIZATION_ID/logs/cloudaudit.googleapis.com%2Fdata_access
organizations/ORGANIZATION_ID/logs/cloudaudit.googleapis.com%2Fsystem_event
organizations/ORGANIZATION_ID/logs/cloudaudit.googleapis.com%2Fpolicy
```

Within a billing account, project, folder, or organization, the log names are typically abbreviated as `activity`, `data_access`, `system_event`, and `policy`.

### Read audit logs with gcloud

```bash
gcloud logging read "logName : projects/PROJECT_ID/logs/cloudaudit.googleapis.com" \
    --project=PROJECT_ID
```

Folder, organization, and billing-account forms use `--folder=FOLDER_ID`, `--organization=ORGANIZATION_ID`, and `--billing-account=BILLING_ACCOUNT_ID` with the matching `logName` prefix (full set on the overview page). Add `--freshness` to read logs more than 1 day old.

## Options / Props

### Interpreting an entry

| Question | Where to look |
|----------|---------------|
| Is it an audit log entry? | `protoPayload.@type` is `type.googleapis.com/google.cloud.audit.AuditLog`, and `logName` includes `cloudaudit.googleapis.com` |
| Which service wrote it? | `protoPayload.serviceName` (for example `compute.googleapis.com`, `cloudsql.googleapis.com`, `appengine.googleapis.com`) |
| Which operation? | `protoPayload.methodName` (more detail in `protoPayload.serviceData` or `metadata`) |
| Which resource? | `resource` field: resource type from the monitored resource list plus labels such as `project_id` |

### Long-running operations and streaming APIs

| Field | Meaning |
|-------|---------|
| `LogEntry.operation.id` and `LogEntry.operation.producer` | Same values for all entries of the same operation |
| `LogEntry.operation.first=true` | First entry written (call starts) |
| `LogEntry.operation.last=true` | Completion entry (operation completes or the streaming connection ended) |
| Neither first nor last | Streaming APIs may emit continuation entries indicating the stream remains open |

### Services using the `serviceData` field

| Service | Service data type |
|---------|-------------------|
| App Engine | `type.googleapis.com/google.appengine.v1.AuditData` |
| App Engine (Legacy) | `type.googleapis.com/google.appengine.legacy.AuditData` |
| BigQuery | `type.googleapis.com/google.cloud.bigquery.logging.v1.AuditData` |
| IAM | `type.googleapis.com/google.iam.v1.logging.AuditData` |
| Cloud Storage | `type.googleapis.com/google.iam.v1.logging.AuditData` |

## Notes

- Long-running operations and streaming APIs: `google.longrunning.Operations` methods that emit audit logs (`protoPayload.methodName`; `LogEntry.operation` isn't specified for these): `google.longrunning.Operations.ListOperations`, `google.longrunning.Operations.GetOperation`, `google.longrunning.Operations.CancelOperation`, `google.longrunning.Operations.WaitOperation`, `google.longrunning.Operations.DeleteOperation`.
- Long-running operations emit two audit logs (call and completion). If the operation completes immediately or fails, there is only one entry with both `first=true` and `last=true`. Some services don't populate `LogEntry.operation` when the operation fails; check the service's audit logging documentation.
- Audit log entries can contain principal emails, IP addresses, and request / response payloads (the sample includes `request` and `response`); don't copy them into tickets or chats without review.
- The sample uses unquoted keys and `...` elisions, so it is shown as `text`, not valid JSON.
- The source also shows the Logs Explorer console steps and the "Try this API" REST form for `entries.list`.
- Source: https://docs.cloud.google.com/logging/docs/audit/understanding-audit-logs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source writes `resource.instance_id = "INSTANCE_ID"`. A `MonitoredResource` has only `type` and `labels`, and the `gce_instance` instance ID is the `instance_id` label, so the filter is `resource.labels.instance_id`.

## Related

- [audit-logs-overview.md](./audit-logs-overview.md)
- [configure-data-access.md](./configure-data-access.md)
- [analyze-audit-logs.md](./analyze-audit-logs.md)
