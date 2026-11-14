---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-databases-relational

## Signature / Usage

Owner skill: `gcp-databases-relational` (status: 未収録（予定）). gcloud groups: `alloydb`, `database-migration`, `spanner`, `sql`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| AlloyDB for PostgreSQL | `alloydb.googleapis.com` (v1, v1alpha, v1beta) | AlloyDB for PostgreSQL is an open source-compatible database service that provides a powerful option for migrating, modernizing, or building commercial-grade applications. It offers full compatibility with standard PostgreSQL, and is more than 4x faster for transactional workloads and up to 100x faster for analytical queries than standard PostgreSQL in our performance tests. AlloyDB for PostgreSQL offers a 99.99 percent availability SLA inclusive of maintenance. AlloyDB is optimized for the most demanding use cases, allowing you to build new applications that require high transaction throughput, large database sizes, or multiple read resources; scale existing PostgreSQL workloads with no application changes; and modernize legacy proprietary databases. | `alloydb` | `alloydb.` | 7 | — | — | https://cloud.google.com/alloydb/ | 未収録（予定） |
| Cloud SQL | — | — | `sql` | `cloudsql.` | 8 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsql | 未収録（予定） |
| Database Insights | — | — | — | `databaseinsights.` | 12 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/databaseinsights | 未収録（予定） |
| Database Migration Service | `datamigration.googleapis.com` (v1, v1beta1) | Manage Cloud Database Migration Service resources on Google Cloud Platform. | `database-migration` | `datamigration.` | 3 | — | — | https://cloud.google.com/database-migration/ | 未収録（予定） |
| Spanner | `spanner.googleapis.com` (v1) | Cloud Spanner is a managed, mission-critical, globally consistent and scalable relational database service. | `spanner` | `spanner.` | 14 | — | — | https://cloud.google.com/spanner/ | 未収録（予定） |
| Studio Query | — | — | — | `databasesconsole.` | 4 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/databasesconsole | 未収録（予定） |

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
