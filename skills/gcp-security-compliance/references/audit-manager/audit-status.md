---
source: https://docs.cloud.google.com/audit-manager/docs/audit-status
---

# Get the status of an audit

Track an in-progress audit started with Audit Manager or Compliance Manager by describing its operation. Audits can take a long time, and the status helps you follow progress.

## Signature / Usage

Replace `RESOURCE_TYPE` (`organization`, `folder`, `project` for gcloud; `organizations`, `folders`, `projects` for REST), `RESOURCE_ID`, `LOCATION` (for example `us-central1`), and `AUDIT_OPERATION_ID` (the operation ID from the response when you ran the audit, for example `098234`).

### gcloud

```bash
gcloud audit-manager operations describe AUDIT_OPERATION_ID \
    --RESOURCE_TYPE=RESOURCE_ID \
    --location=LOCATION
```

Response:

```text
done: true
name: projects/PROJECT_ID/locations/LOCATION/operationDetails/AUDIT_OPERATION_ID
response:
  '@type': type.googleapis.com/google.cloud.auditmanager.v1.AuditReport
  gcsUri: gs://testbucketauditmanager
```

### REST

```text
GET https://auditmanager.googleapis.com/v1/RESOURCE_TYPE/RESOURCE_ID/locations/LOCATION/operationDetails/AUDIT_OPERATION_ID
```

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://auditmanager.googleapis.com/v1/RESOURCE_TYPE/RESOURCE_ID/locations/LOCATION/operationDetails/AUDIT_OPERATION_ID"
```

Response:

```text
{
  "name": "projects/PROJECT_ID/locations/LOCATION/operationDetails/AUDIT_OPERATION_ID",
  "done": true,
  "response": {
    "@type": "type.googleapis.com/google.cloud.auditmanager.v1.AuditReport",
    "gcsUri": "gs://testbucketauditmanager"
  }
}
```

## Options / Props

### Execution status types

| Status type | Description |
|---|---|
| `OPERATION_STATE_UNSPECIFIED` | An invalid state. |
| `OPERATION_STATE_NOT_STARTED` | The audit report generation process has not yet started. |
| `OPERATION_STATE_EVALUATION_IN_PROGRESS` | Audit Manager is evaluating the resources against compliance controls. |
| `OPERATION_STATE_EVALUATION_DONE` | Audit Manager has completed compliance evaluation. |
| `OPERATION_STATE_EVIDENCE_REPORT_GENERATION_IN_PROGRESS` | Audit Manager is creating an audit report from the evaluated data. |
| `OPERATION_STATE_EVIDENCE_REPORT_GENERATION_DONE` | Audit Manager has completed the generation of the audit report. |
| `OPERATION_STATE_EVIDENCE_UPLOAD_IN_PROGRESS` | Audit Manager is uploading the audit report and evidence to the destination. |
| `OPERATION_STATE_DONE` | The audit report generation process is completed. |
| `OPERATION_STATE_FAILED` | The audit report generation process has failed. |

### Additional status (when applicable)

| Field | Description |
|---|---|
| `failure_reason` | If the audit assessment fails, this field provides the reason for the failure. |
| `evaluation_percent_complete` | Progress of evaluation; starts at `0` before the process starts and is `100` when concluded. |
| `report_generation_percent_complete` | Progress of report generation; `0` before it starts, `100` when it completes. |
| `report_uploading_percent_complete` | Progress of report upload; `0` before it starts, `100` when it completes. |

### Roles

| Role | Notes |
|---|---|
| Audit Manager Admin (`roles/auditmanager.admin`) | One of these |
| Audit Manager Auditor (`roles/auditmanager.auditor`) | One of these |
| Compliance Manager Viewer (`roles/cloudsecuritycompliance.viewer`) | Required if you're auditing a framework created with Compliance Manager |

## Notes

- When an audit report is completed and uploaded, a link to the report is returned. If the audit assessment fails, the status is `OPERATION_STATE_FAILED` and `failure_reason` gives the reason.
- `gcloud audit-manager operations describe` takes `--folder`, `--organization`, or the global `--project`, plus `--location`.
- The Console **View audits** / **View assessments** page and the PowerShell / cmd.exe variants are omitted; see the source page.
- Source: https://docs.cloud.google.com/audit-manager/docs/audit-status (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [run-audit.md](./run-audit.md)
- [view-audit.md](./view-audit.md)
