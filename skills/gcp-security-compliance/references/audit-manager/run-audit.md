---
source: https://docs.cloud.google.com/audit-manager/docs/run-audit
---

# Schedule or run an audit

Audits collect evidence to assess an enrolled organization, folder, or project against supported frameworks. Run an on-demand audit or schedule a recurring one. An audit is a long-running operation that might take a few hours, depending on the number of resources in scope.

## Signature / Usage

Replace `RESOURCE_TYPE` with `organization`, `folder`, or `project` in flags (`organizations`, `folders`, `projects` in full resource names) and `RESOURCE_ID` with the resource ID, for example `8767234`. `LOCATION` is the Audit Manager API endpoint location (for example `us-central1`). `FRAMEWORK` is the framework resource name, for example `organizations/123456789/locations/global/frameworks/builtin-cis-v8` or, for a project-level custom framework, `projects/123456789/locations/global/frameworks/my-framework`.

### gcloud: generate an audit assessment (scope), optional

```bash
gcloud audit-manager audit-scopes generate \
    --RESOURCE_TYPE=RESOURCE_ID \
    --location=LOCATION \
    --compliance-framework=FRAMEWORK \
    --report-format=AUDIT_REPORT_FORMAT \
    --output-directory=OUTPUT_DIRECTORY \
    --output-file-name=OUTPUT_FILENAME
```

### gcloud: run an on-demand audit

```bash
gcloud audit-manager audit-reports generate \
    --RESOURCE_TYPE=RESOURCE_ID \
    --location=LOCATION \
    --compliance-framework=FRAMEWORK \
    --report-format=AUDIT_REPORT_FORMAT \
    --gcs-uri=BUCKET_URI
```

Response:

```text
done: false
name: projects/10398413/locations/987234/operations/operation-1726842525305-6228ddb4dca96-78a6db59-f9dd9a24

```

### gcloud: schedule an audit

```bash
gcloud audit-manager audit-schedules create \
    --RESOURCE_TYPE=RESOURCE_ID \
    --location=LOCATION \
    --audit-schedule-id=AUDIT_SCHEDULE_ID \
    --compliance-framework=FRAMEWORK \
    --report-format=AUDIT_REPORT_FORMAT \
    --gcs-uri=BUCKET_URI \
    --start-time=SCHEDULE_START_TIME \
    --frequency=FREQUENCY \
    --display-name="DISPLAY_NAME" \
    --end-time=SCHEDULE_END_TIME \
    --time-zone=TIME_ZONE
```

Response:

```text
complianceFramework: organizations/123456789/locations/global/frameworks/builtin-cis-v8
gcsUri: gs://my-bucket
name: projects/834/locations/us-central1/auditSchedules/my-schedule-id
reportFormat: AUDIT_REPORT_FORMAT_ODF
scheduleConfig:
  frequency: weekly
  startTime: '2026-10-25T10:00:00Z'
state: SCHEDULE_STATE_ACTIVE
```

### gcloud: view, pause, resume, stop schedules

```bash
gcloud audit-manager audit-schedules list \
    --RESOURCE_TYPE=RESOURCE_ID \
    --location=LOCATION
```

```bash
gcloud audit-manager audit-schedules describe \
    RESOURCE_TYPE/RESOURCE_ID/locations/LOCATION/auditSchedules/AUDIT_SCHEDULE_ID
```

```bash
gcloud audit-manager audit-schedules update \
    RESOURCE_TYPE/RESOURCE_ID/locations/LOCATION/auditSchedules/AUDIT_SCHEDULE_ID \
    --state=SCHEDULE_STATE
```

## Options / Props

### Placeholders

| Placeholder | Description |
|---|---|
| `AUDIT_REPORT_FORMAT` | Report format; only ODF is supported. gcloud `--report-format`: `odf` (the only choice in gcloud 593.0.0). REST `reportFormat`: `AUDIT_REPORT_FORMAT_ODF` |
| `OUTPUT_DIRECTORY`, `OUTPUT_FILENAME` | Where `audit-scopes generate` writes the scope report (for example `reports`, `scopeReport`; no file extension in the filename) |
| `BUCKET_URI` | Cloud Storage bucket, for example `gs://testbucketauditmanager` |
| `AUDIT_SCHEDULE_ID` | ID of the schedule, for example `my-schedule-id` |
| `FREQUENCY` | `daily`, `weekly`, `monthly`, `quarterly`, `annually` |
| `SCHEDULE_START_TIME` | First run, RFC 3339, for example `2026-10-25T10:00:00Z` |
| `SCHEDULE_END_TIME` | Optional; when the schedule stops, RFC 3339 |
| `DISPLAY_NAME` | Optional display name, for example `NIST 800-53 Weekly Audit` |
| `TIME_ZONE` | Optional IANA time zone, for example `America/New_York`; default `UTC`; used to interpret start and end times |
| `SCHEDULE_STATE` | `paused`, `active`, `deleted` |

### Roles

| Role | Purpose |
|---|---|
| Audit Manager Admin (`roles/auditmanager.admin`) or Audit Manager Auditor (`roles/auditmanager.auditor`) | Run or schedule an audit |

## Notes

- You can create a schedule for a specific framework and resource combination only if an active or paused schedule doesn't already exist for it.
- Audit resources must be enrolled first. In the Console, the **Choose storage bucket** step lists buckets from enrollment; if yours is missing, ask your administrator to enroll the resource with that bucket. Console options: schedule repeat (daily, weekly, monthly, quarterly, annually), time period, **Never ending** (runs until you manually stop it), optional **Configure parameters** for cloud controls, and an optional ODS audit-scope download.
- You can pause, resume, and stop recurring audits. To change a schedule, delete the existing scheduled audit and create a new one. Setting the state to `deleted` stops and deletes the schedule; this is irreversible, so try it on a disposable schedule first.
- The `audit-reports generate` response is a long-running operation: `name` identifies it (use it to track progress) and `done` is `false` until the assessment completes. Track it with the operation-status page ([audit-status.md](./audit-status.md)); the `done: false` response alone does not mean success.
- Parameter overrides: the gcloud 593.0.0 help adds `--parameter-overrides` to `audit-scopes generate`, `audit-reports generate`, and `audit-schedules create` for parameterized cloud controls. For schedules, overrides apply to every run and can't be changed after creation.
- Source inconsistency: the source gives `AUDIT_REPORT_FORMAT_ODF` as the `AUDIT_REPORT_FORMAT` value for `audit-scopes generate` and `audit-reports generate`, and `odf` for `audit-schedules create`. gcloud 593.0.0 rejects `AUDIT_REPORT_FORMAT_ODF` (`Invalid choice ... Valid choices are [odf]`); `AUDIT_REPORT_FORMAT_ODF` is the REST enum value.
- REST examples are omitted. Source inconsistency: the source's REST paths `auditScopesReport:generate` and `auditReport:generate` and its `destination.gcs_uri` body field differ from the Audit Manager v1 Discovery document (`auditScopeReports:generate`, `auditReports:generate`, top-level `gcsUri`); schedules use `auditSchedules` (create, list, get, patch with `updateMask=state`).
- PowerShell / cmd.exe variants, list / describe / update responses, and Console steps are omitted; see the source page.
- Source: https://docs.cloud.google.com/audit-manager/docs/run-audit (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [enroll-resource.md](./enroll-resource.md)
- [audit-status.md](./audit-status.md)
- [view-audit.md](./view-audit.md)
- [locations.md](./locations.md)
