---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/telemetry
---

# Telemetry API IAM roles and permissions

## Signature / Usage

Predefined roles of `telemetry` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Telemetry Admin (`roles/telemetry.admin`)

- Admin role for telemetry
- Permissions (8): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `telemetry.consumers.getIamPolicy`, `telemetry.consumers.setIamPolicy`, `telemetry.consumers.writeLogs`, `telemetry.consumers.writeMetrics`, `telemetry.consumers.writeTraces`, `telemetry.traces.write`

#### Telemetry Editor (`roles/telemetry.editor`)

- Editor role for telemetry
- Permissions (3): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `telemetry.traces.write`

#### Consumer Admin (`roles/telemetry.consumerAdmin`)

- Launch stage: Beta
- Grants permission management access to consumer resources.
- Permissions (2): `telemetry.consumers.getIamPolicy`, `telemetry.consumers.setIamPolicy`

#### Cloud Telemetry Logs Writer (`roles/telemetry.logsWriter`)

- Access to write logs.
- Permissions (1): `logging.logEntries.create`

#### Cloud Telemetry Metrics Writer (`roles/telemetry.metricsWriter`)

- Access to write metrics.
- Permissions (1): `monitoring.timeSeries.create`

#### Integrated Service Telemetry Logs Writer (`roles/telemetry.serviceLogsWriter`)

- Launch stage: Beta
- Allows an onboarded service to write log data to a destination.
- Permissions (1): `telemetry.consumers.writeLogs`

#### Integrated Service Telemetry Metrics Writer (`roles/telemetry.serviceMetricsWriter`)

- Launch stage: Beta
- Allows an onboarded service to write metrics data to a destination.
- Permissions (1): `telemetry.consumers.writeMetrics`

#### Integrated Service Telemetry Writer (`roles/telemetry.serviceTelemetryWriter`)

- Launch stage: Beta
- Allows an onboarded service to write all telemetry data to a destination.
- Permissions (3): `telemetry.consumers.writeLogs`, `telemetry.consumers.writeMetrics`, `telemetry.consumers.writeTraces`

#### Integrated Service Telemetry Traces Writer (`roles/telemetry.serviceTracesWriter`)

- Launch stage: Beta
- Allows an onboarded service to write trace data to a destination.
- Permissions (1): `telemetry.consumers.writeTraces`

#### Cloud Telemetry Traces Writer (`roles/telemetry.tracesWriter`)

- Access to write trace spans.
- Permissions (1): `telemetry.traces.write`

#### Cloud Telemetry Writer (`roles/telemetry.writer`)

- Full access to write all telemetry data.
- Permissions (3): `logging.logEntries.create`, `monitoring.timeSeries.create`, `telemetry.traces.write`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/telemetry.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `telemetry.consumers.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/telemetry.admin`, `roles/iam.securityAuditor`, `roles/telemetry.consumerAdmin` |
| `telemetry.consumers.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/telemetry.admin`, `roles/telemetry.consumerAdmin` |
| `telemetry.consumers.writeLogs` | `roles/admin`, `roles/owner`, `roles/telemetry.admin`, `roles/telemetry.serviceLogsWriter`, `roles/telemetry.serviceTelemetryWriter` |
| `telemetry.consumers.writeMetrics` | `roles/admin`, `roles/owner`, `roles/telemetry.admin`, `roles/telemetry.serviceMetricsWriter`, `roles/telemetry.serviceTelemetryWriter` |
| `telemetry.consumers.writeTraces` | `roles/admin`, `roles/owner`, `roles/telemetry.admin`, `roles/telemetry.serviceTelemetryWriter`, `roles/telemetry.serviceTracesWriter` |
| `telemetry.traces.write` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtrace.admin`, `roles/telemetry.admin`, `roles/telemetry.editor`, `roles/cloudtrace.agent`, `roles/firebaseapphosting.computeRunner`, `roles/telemetry.tracesWriter`, `roles/telemetry.writer` (+8 service agent roles) |

## Notes

- Roles and permissions of the `telemetry` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/telemetry (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
