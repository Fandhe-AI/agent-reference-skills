---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-integration

## Signature / Usage

Owner skill: `gcp-integration` (status: 収録済み). gcloud groups: —.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| Cloud Integrations | `integrations.googleapis.com` (v1, v2) | — | — | `integrations.` | 20 | — | — | https://cloud.google.com/application-integration | 収録済み |
| Connectors | `connectors.googleapis.com` (v1, v2) | Enables users to create and manage connections to Google Cloud services and third-party business applications using the Connectors interface. | — | `connectors.` | 14 | — | — | https://cloud.google.com/apigee/docs/api-platform/connectors/about-connectors | 収録済み |
| Data Connectors | — | — | — | `dataconnectors.` | 6 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/dataconnectors | 収録済み |

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
