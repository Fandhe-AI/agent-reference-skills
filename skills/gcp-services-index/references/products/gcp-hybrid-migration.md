---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-hybrid-migration

## Signature / Usage

Owner skill: `gcp-hybrid-migration` (status: 未収録（予定）). gcloud groups: `device-run`, `migration`, `mps`, `vmware`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Docs | Status |
|---|---|---|---|---|---|---|---|---|
| Appliance Activation Service | — | — | — | `applianceactivation.` | 5 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/applianceactivation | 未収録（予定） |
| GDC Hardware Management API | — | — | — | `gdchardwaremanagement.` | 4 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/gdchardwaremanagement | 未収録（予定） |
| Google Cloud Migration Center | `migrationcenter.googleapis.com` (v1, v1alpha1) | A unified platform that helps you accelerate your end-to-end cloud journey from your current on-premises or cloud environments to Google Cloud. | — | `migrationcenter.` | 5 | — | https://cloud.google.com/migration-center | 未収録（予定） |
| Google Cloud VMware Engine | `vmwareengine.googleapis.com` (v1) | The Google VMware Engine API lets you programmatically manage VMware environments. | `vmware` | `vmwareengine.` | 7 | — | https://cloud.google.com/solutions/vmware-as-a-service | 未収録（予定） |
| Migrate to Virtual Machines | — | — | — | `cloudmigration.` | 3 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudmigration | 未収録（予定） |
| Rapid Migration Assessment | `rapidmigrationassessment.googleapis.com` (v1) | The Rapid Migration Assessment service is our first-party migration assessment and planning tool. | — | `rapidmigrationassessment.`, `rma.` | 4 | — | https://cloud.google.com/migration-center | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
