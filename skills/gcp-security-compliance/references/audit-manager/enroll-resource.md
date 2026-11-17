---
source: https://docs.cloud.google.com/audit-manager/docs/enroll-resource
---

# Enroll a resource for auditing

To audit your environment you must enroll an organization, a folder, or a project in Audit Manager. Enrollment creates a Google-managed service agent that monitors the resource on your behalf and configures the specified Cloud Storage buckets as the destination for audit data.

## Signature / Usage

### Service agent email formats

Organization-level enablement:

```text
service-org-ORGANIZATION_ID@gcp-sa-audit-manager.iam.gserviceaccount.com
```

Folder-level enablement:

```text
service-folder-FOLDER_ID@gcp-sa-audit-manager.iam.gserviceaccount.com
```

Project-level enablement:

```text
service-PROJECT_NUMBER@gcp-sa-audit-manager.iam.gserviceaccount.com
```

### gcloud

Replace `RESOURCE_TYPE` (`organization`, `folder`, or `project`), `RESOURCE_ID` (for example `8767234`), and `BUCKET_URI` (for example `gs://testbucketauditmanager`).

```bash
gcloud audit-manager enrollments add \
    --RESOURCE_TYPE=RESOURCE_ID \
    --eligible-gcs-buckets=BUCKET_URI
```

### REST

`RESOURCE_TYPE` is `organizations`, `folders`, or `projects`.

```text
POST https://auditmanager.googleapis.com/v1/RESOURCE_TYPE/RESOURCE_ID/locations/global:enrollResource
```

Request body:

```json
{
  "destinations": [
    {
      "eligibleGcsBucket": "BUCKET_URI"
    }
  ]
}
```

Save the body in `request.json` and run:

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://auditmanager.googleapis.com/v1/RESOURCE_TYPE/RESOURCE_ID/locations/global:enrollResource"
```

A successful call returns a 2xx status code and an empty response.

## Options / Props

### Required roles and permissions

| Role / permission | Needed for |
|---|---|
| Audit Manager Admin (`roles/auditmanager.admin`) | Enrolling |
| Storage Admin (`roles/storage.admin`) or Storage Legacy Bucket Owner (`roles/storage.legacyBucketOwner`) | The destination buckets |
| `resourcemanager.organizations.setIamPolicy` | Enrolling an organization (additional) |
| `resourcemanager.folders.setIamPolicy` | Enrolling a folder (additional) |

### gcloud flags

| Flag | Description |
|---|---|
| `--organization` / `--folder` / `--project` | Exactly one; the resource to enroll |
| `--eligible-gcs-buckets` | Eligible Cloud Storage buckets (comma-separated URIs) where reports and evidence can be uploaded |

## Notes

- Enrolling a resource also enrolls its child resources (enrolling an organization enrolls its projects). If a parent is already enrolled and you enroll a child, the child is enrolled independently.
- You can enroll resources and set up buckets with Audit Manager or Compliance Manager; resources and buckets enrolled in one are available to both.
- To change the storage location after enrollment, update the enrollment with the new storage locations. The previous enrollment and storage locations are overwritten by the new request.
- Identify or create the destination Cloud Storage buckets before enrolling.
- Console steps (Audit Manager **Settings** page, **Enroll** in the **Status** column) and the PowerShell / cmd.exe variants are omitted; see the source page.
- Source: https://docs.cloud.google.com/audit-manager/docs/enroll-resource (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [enable-audit-manager.md](./enable-audit-manager.md)
- [run-audit.md](./run-audit.md)
- [overview.md](./overview.md)
