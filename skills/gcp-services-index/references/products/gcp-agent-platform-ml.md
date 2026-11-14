---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-agent-platform-ml

## Signature / Usage

Owner skill: `gcp-agent-platform-ml` (status: 未収録（予定）). gcloud groups: `colab`, `notebooks`, `workbench`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Docs | Status |
|---|---|---|---|---|---|---|---|---|
| Notebooks | `notebooks.googleapis.com` (v1, v2) | Notebooks API is used to manage notebook resources in Google Cloud. | `notebooks` | `notebooks.` | 7 | — | https://cloud.google.com/notebooks/docs/ | 未収録（予定） |
| Visual Inspection AI | — | — | — | `visualinspection.` | 5 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/visualinspection | 未収録（予定） |

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
