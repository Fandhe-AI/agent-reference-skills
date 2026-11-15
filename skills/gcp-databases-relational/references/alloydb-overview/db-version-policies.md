---
source: https://docs.cloud.google.com/alloydb/docs/db-version-policies
---

# AlloyDB database version policies

Major and minor PostgreSQL-compatible version support policies, lifecycle timelines and deprecation schedules for AlloyDB for PostgreSQL. You choose the major version when you create a cluster; minor versions are updated automatically.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/alloydb/docs/cluster-create (the major version is fixed at creation):

```bash
gcloud alloydb clusters create CLUSTER_ID \
    --database-version=POSTGRES_VERSION \
    --password=PASSWORD \
    --region=REGION_ID \
    --project=PROJECT_ID \
    --network=NETWORK
```

## Options / Props

### Major version support timeline

| PostgreSQL compatible major version | AlloyDB regular support start | AlloyDB Omni GA date | AlloyDB extended support start | AlloyDB deprecation date |
|---|---|---|---|---|
| PostgreSQL 18 (default) | March 18, 2026 | April 9, 2026 | - | - |
| PostgreSQL 17 | September 22, 2025 | December 15, 2025 | February 1, 2030 | February 1, 2033 |
| PostgreSQL 16 | October 23, 2024 | April 8, 2025 | February 1, 2029 | February 1, 2032 |
| PostgreSQL 15 | January 19, 2024 | October 11, 2023 | February 1, 2028 | February 1, 2031 |
| PostgreSQL 14 | December 12, 2022 | Not applicable | February 1, 2027 | February 1, 2030 |

### Supported versions

| PostgreSQL-compatible version | AlloyDB minor version |
|---|---|
| PostgreSQL 18 (default) | 18.4 |
| PostgreSQL 17 | 17.10 |
| PostgreSQL 16 | 16.14 |
| PostgreSQL 15 | 15.18 |
| PostgreSQL 14 | 14.23 |

## Notes

- A cluster keeps its major version for its lifetime unless you upgrade it, either in place (https://docs.cloud.google.com/alloydb/docs/upgrade-db-inplace-major-version) or by migrating data to a new cluster (https://docs.cloud.google.com/alloydb/docs/cluster-upgrade).
- Regular support: Google aims to support a new PostgreSQL major version within five months of community GA. Regular support lasts as long as the community supports the version, no less than five years, and includes minor version updates, maintenance and security fixes.
- Extended support: three years after community end-of-life, to plan and perform the upgrade.
- Deprecation: end-of-support notices go to project owners at least 12 months ahead, at the end of the second year of extended support. Clusters still on a deprecated major version at the end of extended support are automatically upgraded to the default version.
- Minor versions: a new minor version is targeted every quarter (schedule can vary) and is applied automatically to all instances during a subsequent maintenance rollout. New instances run the most recent supported minor version of their major version.
- Security: critical fixes are backported and applied via a subsequent maintenance rollout, with a goal of one month; less severe fixes arrive in future minor versions.
- PostgreSQL 16, 17 and 18 compatibility: logical replication from the standby server isn't supported.
- Some AlloyDB features require a minimum major version; minimum versions are documented per feature.
- AlloyDB Omni version policies are covered on a separate Omni page and are out of scope here.
- The borrowed `gcloud alloydb clusters create` snippet puts the password on the command line: gcloud 593.0.0 has no prompt option (`--password` is required), so use a throwaway initial password and change it afterwards, or prefer IAM database authentication (see the cluster creation page's Notes). `POSTGRES_VERSION` takes the gcloud enum `POSTGRES_14`–`POSTGRES_18`.
- Source: https://docs.cloud.google.com/alloydb/docs/db-version-policies (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/cluster-create (borrowed snippet; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-create.md](./cluster-create.md)
- [overview.md](./overview.md)
