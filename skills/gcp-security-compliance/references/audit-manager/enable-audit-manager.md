---
source: https://docs.cloud.google.com/audit-manager/docs/enable-audit-manager
---

# Enable Audit Manager

Enable the Audit Manager API (`auditmanager.googleapis.com`) on a project, or on an organization with a `gcloud beta services enable` command, so that you can audit folders and projects with built-in or custom frameworks. Enabling creates the Audit Manager service agent.

## Signature / Usage

### Enable on an organization

If required, first update the Restrict service usage organization policy constraint to include `auditmanager.googleapis.com`. To enable on a single project, enable the Audit Manager API for that project (Console only).

```bash
gcloud beta services enable auditmanager.googleapis.com \
   --organization=ORGANIZATION_ID
```

Replace `ORGANIZATION_ID` with your Google Cloud organization ID.

### Service agent addresses

Project-level enablement:

```text
service-PROJECT_NUMBER@gcp-sa-audit-manager.iam.gserviceaccount.com
```

Organization-level enablement:

```text
service-org-ORGANIZATION_ID@gcp-sa-audit-manager.iam.gserviceaccount.com
```

## Options / Props

| Item | Value |
|---|---|
| Role needed to enable APIs | Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`), which contains `serviceusage.services.enable` |
| API | `auditmanager.googleapis.com` |
| Org policy | Restrict service usage constraint must allow the API, if used |
| Next steps | Configure Audit Manager for VPC Service Controls perimeters; set up permissions for auditors; enroll resources |

## Notes

- Audit Manager doesn't support the jurisdictional console (Assured Workloads).
- The service agent is created when you enable Audit Manager. The organization-level command uses the `beta` track.
- If you use VPC Service Controls, configure Audit Manager to support service perimeters (see the Audit Manager VPC Service Controls page on docs.cloud.google.com). Perimeter changes can be disruptive; try them on a disposable project or in dry-run mode first.
- Console enablement steps are omitted; see the source page.
- Snippet taken from https://docs.cloud.google.com/audit-manager/docs/enroll-resource (the service agent address blocks; the same addresses appear inline on the source page).
- Source: https://docs.cloud.google.com/audit-manager/docs/enable-audit-manager (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [enroll-resource.md](./enroll-resource.md)
- [overview.md](./overview.md)
