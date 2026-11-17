---
source: https://docs.cloud.google.com/assured-workloads/access-transparency/docs/reading-logs
---

# Understanding and using Access Transparency logs

Contents of Access Transparency log entries (field descriptions, permission details, method names, justification reason codes) and how to view and monitor them.

## Signature / Usage

### View the logs

After Access Transparency is configured, assign a user or group the **Private Logs Viewer** role to control who can see the logs (see the Cloud Logging access control guide). Use this Logging filter:

```text
logName="projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Faccess_transparency"
```

Logs can also be monitored with the Cloud Monitoring API or Cloud Run functions. Optionally create a logs-based metric and an alerting policy (for example, alert if the number of Google personnel accesses in a period exceeds a threshold).

### Sample log entry

```text
{
 insertId:  "abcdefg12345"
 jsonPayload: {
  @type:  "type.googleapis.com/google.cloud.audit.TransparencyLog"
  location: {
   principalOfficeCountry:  "US"
   principalEmployingEntity:  "Google LLC"
   principalPhysicalLocationCountry:  "CA"
  }
  principalJobTitle: "Engineering"
  product: [
   0:  "Cloud Storage"
  ]
  reason: [
    detail:  "Case number: bar123"
    type:  "CUSTOMER_INITIATED_SUPPORT"
  ]
  permissionDetails:[
    0: {
     permissionType: "DATA_READ"
     logAccessed: true
   }
   1: {
     permissionType: "ADMIN_READ"
    }
  ]
  eventId: "asdfg12345asdfg12345asdfg12345"
  accesses: [
   0: {
    methodName: "GoogleInternal.Read"
    resourceName: "//googleapis.com/storage/buckets/BUCKET_NAME/objects/foo123"
    }
  ]
  accessApprovals: [
   0: "projects/123/approvalRequests/abcdef12345"
  ]
 }
 logName:  "projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Faccess_transparency"
 operation: {
  id:  "12345xyz"
 }
 receiveTimestamp:  "2017-12-18T16:06:37.400577736Z"
 resource: {
  labels: {
   project_id:  "1234567890"
  }
  type:  "project"
 }
 severity:  "NOTICE"
 timestamp:  "2017-12-18T16:06:24.660001Z"
}
```

## Options / Props

### Log fields

| Field | Description |
|---|---|
| `insertId` | Unique identifier for the log. |
| `@type` | Access Transparency log identifier. |
| `principalOfficeCountry` | ISO 3166-1 alpha-2 country code where the accessor has a permanent desk, `??` if unavailable, or a 3-character continent identifier where personnel are in a low-population country. |
| `principalEmployingEntity` | Entity that employs the Google personnel (for example, `Google LLC`). |
| `principalPhysicalLocationCountry` | ISO 3166-1 alpha-2 country code the access was made from, `??` if unavailable, or a 3-character continent identifier for low-population countries. |
| `principalJobTitle` | Job family of the Google identity. When it is `Support Agent`, the actor is an AI support agent and `principalPhysicalLocationCountry` and `principalOfficeCountry` are not provided (`??`). |
| `product` | Customer's Google Cloud product that was accessed. |
| `reason:detail` | Details of the reason, for example a support ticket ID. |
| `reason:type` | Access reason type (for example, `CUSTOMER_INITIATED_SUPPORT`). |
| `permissionDetails` | Permissions linked to an access; up to two `permissionType` details may be present. |
| `accesses:methodName` | Type of access, for example `GoogleInternal.Read`. |
| `accesses:resourceName` | Name of the resource that was accessed. |
| `accessApprovals` | Resource names of Access Approval requests that approved the access; subject to exclusions and supported services. Populated only if Access Approval is enabled for the accessed resources; logs published before March 24, 2021 do not have it. |
| `logName` | Name of the log location. |
| `operation:id` | Log cluster ID. |
| `receiveTimestamp` | Time the access was received by the logging pipeline. |
| `project_id` | Project associated with the accessed resource. |
| `type` | Type of resource accessed (for example, `project`). |
| `eventId` | Unique event ID for a single access justification (for example, one support case); all accesses under the same justification share it. |
| `severity` | Log severity. |
| `timestamp` | Time the log was written. |

### permissionType values

| IAM Permission Type | Description |
|---|---|
| `ADMIN_READ` | Read access limited to configuration, log, or similar data. |
| `ADMIN_WRITE` | Read or write access limited to configuration, log, or similar data. |
| `DATA_READ` | Read access that may contain Customer Data. Indicates the administrator had permission to access Customer Data, not that Customer Data was accessed. |
| `DATA_WRITE` | Read or write access that may contain Customer Data; the administrator may have included permission to access at least one resource of Customer Data. |

### accesses:methodName values

| Method name | Description | Examples |
|---|---|---|
| `GoogleInternal.Read` | Read of customer content with a valid business justification via an internal administration API; does not mutate content. | Reading IAM permissions. |
| `GoogleInternal.Write` | Write via an internal API; can update content and/or configurations. | Setting IAM permissions for a resource; suspending a Compute Engine instance. |
| `GoogleInternal.Create` | Create via an internal API; creates new customer content. | Creating a Cloud Storage bucket; creating a Pub/Sub topic. |
| `GoogleInternal.Delete` | Delete via an internal API; mutates content and/or configurations. | Deleting a Cloud Storage object; deleting a BigQuery table. |
| `GoogleInternal.List` | List via an internal API; does not mutate. | Listing Compute Engine instances; listing Dataflow jobs. |
| `GoogleInternal.Update` | Modification via an internal API; mutates content and/or configurations. | Updating HMAC keys in Cloud Storage. |
| `GoogleInternal.Get` | Get via an internal API; does not mutate. | Retrieving an IAM policy; retrieving a Dataflow job. |
| `GoogleInternal.Query` | Query via an internal API; does not mutate. | Running a BigQuery query; AI Platform debugging console lookup. |

### Justification reason codes

| Reason | Description |
|---|---|
| `CUSTOMER_INITIATED_SUPPORT` | Customer-initiated support, for example "Case Number: ####". |
| `GOOGLE_INITIATED_SERVICE` | Google-initiated access for system management and troubleshooting: technical debugging for a complex support request or investigation; remediating technical issues such as storage failure or data corruption; proactive support by Technical Account Management teams (tagged with reason detail "TAM Support"). |
| `THIRD_PARTY_DATA_REQUEST` | Google-initiated access in response to a legal request or legal process, including legal process from the customer that requires Google to access the customer's own data. |
| `GOOGLE_INITIATED_REVIEW` | Google-initiated access for security, fraud, abuse, or compliance: account and data safety, confirming whether data is affected by an event such as a malware infection, confirming compliance with the Terms of Service, investigating complaints or abuse signals, checking consistency with compliance regimes (for example anti-money laundering). |
| `GOOGLE_RESPONSE_TO_PRODUCTION_ALERT` | Google-initiated access to maintain system reliability: confirm a suspected outage does not affect the customer; ensure backup and recovery from outages and failures. |

## Notes

- permissionType values: `permissionType` is the IAM permission type of the data access by the Google administrator; it indicates the maximum permission present, even if a lesser one would have sufficed.
- permissionType values: `logAccessed` is `true` when an admin or data read permission is limited to reading logging data (for example a `data_read` to Observability Analytics logs); it is omitted if the access is not a log.
- accesses:methodName values: Standard methods (`List`, `Get`, `Create`, `Update`, `Delete`), custom methods (any other API method, such as `Cancel`, `BatchGet`, `Move`, `Search`, `Undelete`), and `GoogleInternal` methods:
- `GoogleInternal` accesses are restricted to authorized personnel for justified, auditable access; the presence of a method does not indicate availability to all roles. Access Approval can restrict accesses by details (for example, permit only `CUSTOMER_INITIATED_SUPPORT` requests).
- Emergency access that meets strict criteria can be logged by Access Approval as `auto approved`; logging is uninterrupted in emergency scenarios.
- Automated access with no human involvement is out of scope for Access Transparency logs.
- For more control over workloads the source recommends Assured Workloads, which uses Key Access Justifications for externally-managed encryption keys.
- The source's log sample has no language tag and is not valid JSON, so it is shown as `text`. The source also shows a link to Google Workspace Access Transparency logs.
- Source: https://docs.cloud.google.com/assured-workloads/access-transparency/docs/reading-logs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-transparency-overview.md](./access-transparency-overview.md)
- [enable-access-transparency.md](./enable-access-transparency.md)
- [approval-request-details.md](./approval-request-details.md)
