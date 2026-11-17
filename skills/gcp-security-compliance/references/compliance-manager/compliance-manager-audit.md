---
source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-audit
---

# Audit your environment with Compliance Manager

Compliance Manager audits (Premium and Enterprise (Deprecated) service tiers only) run against its frameworks to automate compliance assessments, collect evidence, and identify gaps. Audits can cover any Google Cloud folder or project and store results in Cloud Storage buckets. The workflow is Console-based: enroll resources with a bucket, run an audit, then view or download the artifacts.

## Signature / Usage

### Enroll a project through Audit Manager

Resources can also be enrolled through Audit Manager (step 1 below).

```bash
gcloud audit-manager enrollments add --project=123 \
    --eligible-gcs-buckets="gs://test-bucket-1,gs://my-bucket-2"
```

### Steps (Console)

1. Enroll the organization, folders, or projects with a Cloud Storage bucket (**Compliance** page, **Audit** tab, **Audit settings**, **Enroll**). You can also enroll through Audit Manager; enrolled resources and buckets are available to both.
2. Click **Run audit**, select one folder or project, a framework, and the processing location (select **global** if your location isn't listed), review the assessment plan (downloadable as ODS), choose the bucket, and click **Run Audit**.
3. View results from the **Status** column link; export reports as ODS and evidence as JSON, or download directly from the bucket.

## Options / Props

### Required IAM roles

| Purpose | Role (ID) | Granted on |
|---------|-----------|-----------|
| Audit | Compliance Manager Admin (`roles/cloudsecuritycompliance.admin`) | Organization, folder, or project |
| Bucket project (one of) | Storage Admin (`roles/storage.admin`), Storage Legacy Bucket Owner (`roles/storage.legacyBucketOwner`) | Project containing the bucket |
| Enroll an organization (one of) | Security Admin (`roles/iam.securityAdmin`), Organization Administrator (`roles/resourcemanager.organizationAdmin`) | Organization |
| Enroll a project | Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) | Project |
| Enroll a folder (one of) | `roles/iam.securityAdmin`, `roles/resourcemanager.organizationAdmin`, Folder Admin (`roles/resourcemanager.folderAdmin`), Folder IAM Admin (`roles/resourcemanager.folderIamAdmin`) | Folder |

### Artifacts

| Artifact | Format | Object name in the destination bucket | Description |
|----------|--------|---------------------------------------|-------------|
| Audit summary report | ODS | `audit-reports/audit_FRAMEWORK_NAME_TIMESTAMP/UNIQUE_ID/overall_report.ods` | Overview of how the folder or project aligns with the framework's cloud controls, plus a responsibilities matrix for shared responsibilities with Google. |
| Control overview report | ODS | `audit-reports/audit_FRAMEWORK_NAME_TIMESTAMP/UNIQUE_ID/CONTROL_ID.ods` | Evaluation results for one cloud control, with assessment details per compliance check including observations and expected values. Dates use MM/DD/YYYY. |
| Evidence | JSON | `audit-reports/audit_FRAMEWORK_NAME_TIMESTAMP/UNIQUE_ID/evidences/evidenceEVIDENCE_ID.json` | All resources evaluated per cloud control, including a raw dump of asset data and the command that was run. |

### Naming-convention values

| Value | Meaning |
|-------|---------|
| `FRAMEWORK_NAME` | Name of the framework |
| `TIMESTAMP` | When the report was generated |
| `UNIQUE_ID` | Unique ID for the report |
| `CONTROL_ID` | ID of the control |
| `EVIDENCE_ID` | Unique ID for the evidence |

### Audit summary report fields

| Control type | Description |
|--------------|-------------|
| Control Info | Description and requirement for the control. |
| Google Responsibility | Google Cloud responsibility and implementation details. |
| Customer Responsibility | Your responsibility and implementation details. |
| Assessment Status | `Non-Compliant` (compliance drift detected), `Compliant`, `Manual Review Needed` (artifacts produced but user input is required), `Skipped` (Compliance Manager can't evaluate the cloud control). |
| Control Report Link | Link to the control overview report. |

### Statuses on the Basic information page

| Status | Meaning |
|--------|---------|
| Compliant | Configurations that meet all requirements. |
| Violations | Misconfigurations detected against a control. |
| Manual review needed | Configurations you must validate manually. |
| Skipped | Configurations Compliance Manager skipped for a control. |

## Notes

- Required IAM roles: Organization-enrollment roles include `resourcemanager.organizations.setIamPolicy`; folder-enrollment roles include `resourcemanager.folders.setIamPolicy`.
- Prerequisites: a Cloud Storage bucket for audit data; the frameworks to audit applied to the right organization, folders, and projects; Audit Manager enabled; the organization policy for resource locations includes the locations where you process the audit (if you restrict locations); VPC Service Controls perimeters configured with the appropriate ingress and egress rules.
- Enrolling an organization lets you audit all folders and projects; enrolling a folder lets you audit the folders and projects within it. You can change the bucket after enrolling. Only one folder or project per audit.
- Starting an audit in the Premium or Enterprise tier within the first 48 hours is not recommended (see the overview page).
- The audit might take some time to complete; refresh the Audit page to view progress. To watch bucket changes, use an event-driven function or Pub/Sub notifications.
- Audit reports and evidence in Cloud Storage buckets are managed by Object Lifecycle Management rules, not Security Command Center retention policies (see the enable page).
- Console steps are condensed and the example control overview table is omitted; see the source page.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/audit-manager/enrollments/add
- Source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-audit (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [compliance-manager-overview.md](./compliance-manager-overview.md)
- [compliance-manager-enable.md](./compliance-manager-enable.md)
- [compliance-manager-apply-framework.md](./compliance-manager-apply-framework.md)
- [compliance-manager-monitor-framework.md](./compliance-manager-monitor-framework.md)
