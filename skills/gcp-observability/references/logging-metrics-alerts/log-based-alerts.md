---
source: https://docs.cloud.google.com/logging/docs/alerting/log-based-alerts
---

# Log-based alerting policies

A log-based alerting policy notifies you whenever a specific message appears in your included logs. It uses a single `LogMatch` condition, and can be created from the Logs Explorer or with the Cloud Monitoring API. It does not derive counts (use log-based metrics) and does not cover alerting policies on metric data or SQL query results.

## Signature / Usage

### Query that selects the log entries (Logs Explorer)

Entries in `syslog` with `NOTICE` severity whose `jsonPayload.result` is not a valid IPv4 address:

Adapted (not in the official docs): the IPv4 regular expression is changed so that a trailing dot (for example `1.2.3.4.`) does not match as valid.

```text
log_id("syslog")
severity = "NOTICE"
jsonPayload.result !~ "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
```

Documentation text for the policy (Markdown and variables are supported):

```text
Log-based alerting policy in project ${project} detected an invalid IPv4 value.
```

### Test by writing a log entry (`logEntries.write` request body)

Replace `PROJECT_ID` with your project ID.

Adapted (not in the official docs): trailing commas removed because the source's JSON was invalid, and the IPv4 regular expression is changed so that a trailing dot does not match as valid.

```json
{
  "entries": [
    {
      "logName": "projects/PROJECT_ID/logs/syslog",
      "jsonPayload": {
        "type": "Configuration change",
        "action": "Set network address",
        "result": "999.027.405.1"
      },
      "severity": "NOTICE",
      "resource": {
        "type": "generic_task",
        "labels": {
          "project_id": "PROJECT_ID",
          "location": "us-east1",
          "namespace": "fake-task-2",
          "job": "write-log-entry",
          "task_id": "11"
        }
      }
    }
  ]
}
```

### Audit-log scenarios

Human access of Secret Manager secrets (principal that does not end with `gserviceaccount.com`):

Adapted (not in the official docs): the service-account domain match escapes the dots so that only addresses in a `gserviceaccount.com` domain are excluded.

```text
protoPayload.@type = "type.googleapis.com/google.cloud.audit.AuditLog"
protoPayload.serviceName = "secretmanager.googleapis.com"
protoPayload.methodName =~ "AccessSecretVersion$"
protoPayload.authenticationInfo.principalEmail !~ "@([a-z0-9-]+[.])*gserviceaccount[.]com$"
```

Decryption by a human user in Cloud KMS:

Adapted (not in the official docs): the service-account domain match escapes the dots so that only addresses in a `gserviceaccount.com` domain are excluded.

```text
protoPayload.@type = "type.googleapis.com/google.cloud.audit.AuditLog"
protoPayload.serviceName = "cloudkms.googleapis.com"
protoPayload.methodName = "Decrypt"
protoPayload.authenticationInfo.principalEmail !~ "@([a-z0-9-]+[.])*gserviceaccount[.]com$"
```

### Create with the Monitoring API

Save the `AlertPolicy` as `alert-invalid-ip.json`, then create it with `gcloud monitoring policies create`.

Adapted (not in the official docs): trailing commas removed (invalid JSON in the source); this is the first form of the source, which has the balanced `log_id("syslog")`.

```json
{
  "displayName": "Network address: invalid IPv4 value (API)",
  "documentation": {
    "content": "Log-based alerting policy in project ${project} detected an invalid IPv4 value.",
    "mimeType": "text/markdown"
  },
  "conditions": [
    {
      "displayName": "Log match condition: invalid IP addr (API)",
      "conditionMatchedLog": {
        "filter": "log_id(\"syslog\") severity = \"NOTICE\" jsonPayload.result !~ \"^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$\""
      }
    }
  ],
  "combiner": "OR",
  "alertStrategy": {
    "notificationRateLimit": {
      "period": "300s"
    },
    "autoClose": "604800s"
  },
  "notificationChannels": [
    "projects/PROJECT_ID/notificationChannels/CHANNEL_ID"
  ]
}
```

```bash
gcloud monitoring policies create --policy-from-file="alert-invalid-ip.json"
```

The command returns the new policy's resource name:

```text
Created alerting policy [projects/PROJECT_ID/alertPolicies/POLICY_ID].
```

### Extract labels from the log entry (fragments)

`labelExtractors` in the `conditionMatchedLog` object, and the documentation variable that uses the extracted label:

```text
"labelExtractors": {
  "vm_identifier": "EXTRACT(labels.\"compute.googleapis.com/resource_id\")"
}
```

```text
"documentation": {
  "content": "Log-based alerting policy in project ${project} detected an
   invalid IPv4 value on VM with ID ${log.extracted_label.vm_identifier}.",
  "mimeType": "text/markdown"
},
```

### Example: alert on a text string

```text
logName="projects/PROJECT_ID/logs/test-log"
textPayload:"Oops"
```

Write a matching entry to test (run in Cloud Shell):

```bash
gcloud logging write test-log --severity=ERROR --payload-type=text 'This log entry contains Oops'
```

## Options / Props

### API structure of a log-based policy

| Field | Detail |
|---|---|
| `conditions[]` | Exactly one condition. `displayName` is required. Condition type is `conditionMatchedLog` (`LogMatch`). |
| `conditionMatchedLog.filter` | The Logs Explorer query as a JSON string; quotes inside must be escaped with `\`. |
| `conditionMatchedLog.labelExtractors` | Optional map of label name to `EXTRACT(...)` / `REGEXP_EXTRACT(...)`. |
| `combiner` | Must be `"OR"`; multiple conditions aren't allowed. |
| `documentation.mimeType` | Required when `documentation` is set; the only valid value is `"text/markdown"`. |
| `alertStrategy.notificationRateLimit.period` | Minimum time between notifications, in seconds (example `300s` = 5 min). |
| `alertStrategy.autoClose` | Auto-close period, in seconds; default 7 days (`604800s`); minimum 1,800 seconds (30 minutes). |
| `notificationChannels[]` | Resource names `projects/PROJECT_ID/notificationChannels/CHANNEL_ID`. Channel IDs are not available in the Console; list them through the API. |

### Permissions and limits of behavior

| Item | Detail |
|---|---|
| Notification rule | Logging creates an internal notification rule; you need the `logging.notificationRules.create` permission to create a log-based policy. |
| Excluded logs | Log-based alerting policies don't operate on excluded logs. |
| Scope | They don't honor the Logs Explorer scope setting; project-level sinks that route an entry originating in a project to a log bucket cause policies defined in that project to scan it. |
| Client libraries | C#, Go, Java, Python and Ruby (library must include the `LogMatch` condition type). |

## Notes

- Requires billing enabled on the project and IAM permissions per https://docs.cloud.google.com/logging/docs/access-control#lba-permissions. Assured Workloads environments may restrict this feature.
- Don't extract the `timestamp` label: if you do, the policy won't create alerts or send notifications. You can't extract labels in the Console form; you can in the API.
- Reference variables with `${log.extracted_label.KEY}` in the documentation field.
- Adapted from the official docs: the `logEntries.write` body and the `AlertPolicy` JSON had trailing commas (`"result": "IP_ADDRESS",`-style); removed. The source's label-extractor variant wrote `log_id(\"syslog\" severity = ...` (unbalanced parenthesis, and a stray `)` at the end of the filter); the policy above uses the balanced form.
- The audit-log scenarios assume audit logging is enabled for Secret Manager (and Cloud KMS). Audit log entries can contain personal data such as principal emails; don't write credentials in test log entries.
- The test entry writes a real log entry to your project and triggers an alert and notification; use a test project and channel.
- The label-extractor and `documentation` blocks are `text` because they are excerpts of the source's JSON (`labelExtractors` goes inside `conditionMatchedLog`, next to `filter`).
- After a match, an alert opens in Cloud Monitoring; repeating the test within the notification period yields no new alert or notification. Defaults: autoclose 7 days; the example uses 5 min between notifications.
- The source also shows Console steps (Logs Explorer **Create log alert**, **Manage log alerts**, the Alerting **Policies** page with enable, disable, copy and delete) and an APIs Explorer flow.
- Source: https://docs.cloud.google.com/logging/docs/alerting/log-based-alerts (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source's expression `^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$` repeats "octet followed by a dot or end of string" four times, so `1.2.3.4.` is accepted as valid and the negated match does not fire on it. The examples require a dot after the first three octets only: `^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`.
- Corrected from the official docs: the source excludes service accounts with `principalEmail !~ "gserviceaccount.com$"`. In the regular expression `.` matches any character, so an address such as `user@gserviceaccountacom` would also be excluded and suppress the alert; the examples match the domain with literal dots: `@([a-z0-9-]+[.])*gserviceaccount[.]com$`.
- `protoPayload.methodName = "Decrypt"` is kept as in the source: the Cloud KMS audit logging reference gives the filter for the `Decrypt` method as `protoPayload.methodName="Decrypt"` (https://docs.cloud.google.com/kms/docs/audit-logging).

## Related

- [charts-and-alerts.md](./charts-and-alerts.md)
- [logs-based-metrics.md](./logs-based-metrics.md)
- [labels.md](./labels.md)
