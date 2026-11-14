---
source: https://docs.cloud.google.com/docs/quotas/overview
---

# Cloud Quotas Overview and Permissions

Quotas limit how much of a resource a project (or folder / organization) can use; system limits are fixed. Covers quota types, hierarchy and location scope, running out of quota, adjustments, and the IAM permissions involved.

## Signature / Usage

The official overview page has no code. Snippet taken from https://docs.cloud.google.com/service-usage/docs/quotas (look up quota metric names for a service):

```bash
gcloud beta quotas info list --project=PROJECT_ID_OR_NUMBER \
    --service=serviceusage.googleapis.com --format="value(metric)"
```

## Options / Props

| Quota type | Meaning |
|------------|---------|
| Allocation | How much of a resource is allocated to you (for example number of VMs in a project) |
| Rate | Amount consumable over a time period (per minute, per 100 seconds, per day) |
| Concurrent | Number of operations running at once (usually long-running operations) |

| Hierarchy level | Scope |
|-----------------|-------|
| Project | Use in one project does not affect another |
| Folder | Child folders and projects contribute to the folder's usage |
| Organization | Child folders and projects contribute; use outside the organization does not |
| User / service account | For example the number of projects an identity can create |

| Location scope | Scope |
|----------------|-------|
| Global | Across all regions and zones |
| Regional | All zones in a region contribute; other regions unaffected |
| Zonal | One zone; a regional quota shared across zones can still be reduced by zonal use |

Permissions:

| Task | Permissions |
|------|-------------|
| View quota (console or Cloud Quotas API) | `resourcemanager.projects.get` (plus `resourcemanager.folders.get` / `resourcemanager.organizations.get` for folder / organization view), `monitoring.timeSeries.list`, `serviceusage.services.list`, `cloudquotas.quotas.get` |
| Change quota (project, folder, organization) | `serviceusage.quotas.update`, `cloudquotas.quotas.update` (in Owner, Editor, Quota Administrator, Service Usage Admin) |
| View quota increase requests | `resourcemanager.projects.get`, `serviceusage.services.list`, `serviceusage.quotas.get` |
| Create quota alert policy | `monitoring.alertPolicies.create` |

Roles: Quota Viewer `roles/servicemanagement.quotaViewer` (view); Quota Administrator `roles/servicemanagement.quotaAdmin` (request adjustments). Quota Administrator can be granted at project, folder (applies to all its projects), or organization level (inherits down).

## Notes

- When quota runs out, the task fails (quota error) until enough quota is available. Allocation quotas: free quota by deleting unused resources. Rate quotas recover on their own: per-day quotas reset at midnight Pacific Time; per-minute quotas reset one minute after your first request in a rolling window.
- Quota values are specific to each project / folder / organization; free-trial accounts may have lower values, which rise when billing is enabled.
- Adjustment requests are mostly evaluated automatically (resource availability, account age, other undisclosed criteria) and can escalate to human review; increases may require an advance payment applied as account credit. No paid support plan is needed. The quota adjuster can request automatically given enough usage history.
- System limits (maximum file sizes, schema limits) cannot be changed; see each product's quotas and limits page.
- Terminology, quota-related pricing, and billing questions pages are not reproduced here.
- Source: https://docs.cloud.google.com/docs/quotas/overview
- Source: https://docs.cloud.google.com/docs/quotas/permissions
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [view-manage-quotas.md](./view-manage-quotas.md)
- [quota-project-and-alerts.md](./quota-project-and-alerts.md)
- [../service-usage/access-control-and-quotas.md](../service-usage/access-control-and-quotas.md)
