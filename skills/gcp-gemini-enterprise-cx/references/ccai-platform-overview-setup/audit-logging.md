---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/audit-logging
---

# CCAI Platform audit logging

Cloud Audit Logs for the `contactcenteraiplatform.googleapis.com` API track administrative and data-access operations, for example when a CCAI Platform instance is created or deleted. They do not cover user actions inside the contact center (sign-ins, settings changes).

## Signature / Usage

### Find the audit logs

The Data Access methods below (`ADMIN_READ`) appear only after you enable Data Access audit logs (`ADMIN_READ`) for `contactcenteraiplatform.googleapis.com`: "Data Access audit logs are disabled by default for all services except some BigQuery services" (Enable Data Access audit logs). "Admin Activity audit logs are always written" (Cloud Audit Logs overview, https://docs.cloud.google.com/logging/docs/audit, retrieved 2026-11-18). In the Logs Explorer, paste the following query into the **Query** field and click **Run query**.

```text
protoPayload.serviceName="contactcenteraiplatform.googleapis.com"
```

### Permissions per method

- `CreateContactCenter` (LRO, Admin Activity): `contactcenteraiplatform.contactCenters.create - ADMIN_WRITE`
- `DeleteContactCenter` (LRO, Admin Activity): `contactcenteraiplatform.contactCenters.delete - ADMIN_WRITE`
- `UpdateContactCenter` (LRO, Admin Activity): `contactcenteraiplatform.contactCenters.update - ADMIN_WRITE`
- `GetContactCenter` (Data Access): `contactcenteraiplatform.contactCenters.get - ADMIN_READ`
- `ListContactCenters` (Data Access): `contactcenteraiplatform.contactCenters.list - ADMIN_READ`
- `QueryContactCenterQuota` (Data Access): `contactcenteraiplatform.contactCenters.queryQuota - ADMIN_READ`
- `google.cloud.contactcenteraiplatform.v1alpha1.WorkforceScheduling.GenerateShifts` (LRO, Data Access): `contactcenteraiplatform.locations.generateShifts - ADMIN_READ`
- `google.longrunning.Operations.CancelOperation` (Admin Activity): `contactcenteraiplatform.operations.cancel - ADMIN_WRITE`
- `google.longrunning.Operations.DeleteOperation` (Admin Activity): `contactcenteraiplatform.operations.delete - ADMIN_WRITE`
- `google.longrunning.Operations.GetOperation` (Data Access): `contactcenteraiplatform.operations.get - ADMIN_READ`
- `google.longrunning.Operations.ListOperations` (Data Access): `contactcenteraiplatform.operations.list - ADMIN_READ`

The log filter for a method is `protoPayload.methodName="<fully qualified method>"`, for example `google.cloud.contactcenteraiplatform.v1alpha1.ContactCenterAiPlatform.CreateContactCenter`.

## Options / Props

### Methods by permission type

| Permission type | Methods |
|---|---|
| `ADMIN_READ` | `google.cloud.contactcenteraiplatform.v1alpha1.ContactCenterAiPlatform.GetContactCenter` `google.cloud.contactcenteraiplatform.v1alpha1.ContactCenterAiPlatform.ListContactCenters` `google.cloud.contactcenteraiplatform.v1alpha1.ContactCenterAiPlatform.QueryContactCenterQuota` `google.cloud.contactcenteraiplatform.v1alpha1.WorkforceScheduling.GenerateShifts` (LRO) `google.longrunning.Operations.GetOperation` `google.longrunning.Operations.ListOperations` |
| `ADMIN_WRITE` | `google.cloud.contactcenteraiplatform.v1alpha1.ContactCenterAiPlatform.CreateContactCenter` (LRO) `google.cloud.contactcenteraiplatform.v1alpha1.ContactCenterAiPlatform.DeleteContactCenter` (LRO) `google.cloud.contactcenteraiplatform.v1alpha1.ContactCenterAiPlatform.UpdateContactCenter` (LRO) `google.longrunning.Operations.CancelOperation` `google.longrunning.Operations.DeleteOperation` |

## Notes

- Each IAM permission has a `type` property (`ADMIN_READ`, `ADMIN_WRITE`, `DATA_READ`, `DATA_WRITE`). Methods requiring `DATA_READ`, `DATA_WRITE` or `ADMIN_READ` generate Data Access audit logs; methods requiring `ADMIN_WRITE` generate Admin Activity audit logs. LRO methods usually generate two audit log entries, one when the operation starts and one when it ends.
- Methods that don't produce audit logs: `google.cloud.location.Locations.GetLocation`, `google.cloud.location.Locations.ListLocations`, `google.longrunning.Operations.WaitOperation`.
- Audit logs for user actions in the contact center (admins, managers, agents signing in or changing settings) are obtained from Cloud Support. Provide the Google Cloud project, the CCAI Platform URL, the region (for example `us-central1`), the Cloud Storage bucket (`gs://bucketname`) where Cloud Support uploads the logs (you must grant Cloud Support write access to it), and the start and end time and date with time zone (preferably UTC) within the last 30 days. Logs older than 30 days are deleted and cannot be provided.
- The source links to the Cloud Logging pages Enable Data Access audit logs and Cloud Logging pricing summary.
- The method names above are in the `v1alpha1` API; the `contactcenteraiplatform.v1alpha1` Discovery document has the matching REST methods (`projects.locations.contactCenters.create` / `delete` / `patch` / `get` / `list`, `projects.locations.queryContactCenterQuota`, `projects.locations.generateShifts`, `projects.locations.operations.cancel` / `delete` / `get` / `list`).
- The source shows the Console and Logs Explorer only.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/audit-logging (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/logging/docs/audit/configure-data-access (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-started.md](./get-started.md)
- [vpc-service-controls.md](./vpc-service-controls.md)
