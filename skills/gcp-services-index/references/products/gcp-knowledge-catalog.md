---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-knowledge-catalog

## Signature / Usage

Owner skill: `gcp-knowledge-catalog` (status: 収録済み). gcloud groups: `datalineage`, `dataplex`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| Data Lineage API | `datalineage.googleapis.com` (v1) | — | `datalineage` | `datalineage.` | 4 | — | — | https://cloud.google.com/data-catalog | 収録済み |
| Knowledge Catalog | `dataplex.googleapis.com` (v1) | A unified, intelligent governance solution for data and AI assets. | `dataplex` | `dataplex.` | 59 | Dataplex Universal Catalog | — | https://cloud.google.com/dataplex/docs | 収録済み |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Lifecycle information covers only products confirmed against official pages as of 2026-11-14 (see `../lifecycle/shutdown-and-deprecated.md`); a product without a Lifecycle entry is not confirmed to be available. Check the official product page before use.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
