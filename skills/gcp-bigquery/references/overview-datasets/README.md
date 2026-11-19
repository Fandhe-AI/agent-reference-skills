# Overview and datasets

| Name | Description | Path |
|------|-------------|------|
| BigQuery overview | Platform overview, architecture, use cases, Gemini in BigQuery features | [introduction.md](./introduction.md) |
| Resource hierarchy | Organization, folders, projects, datasets; quotas, billing, slots, organization patterns | [resource-hierarchy.md](./resource-hierarchy.md) |
| Overview of BigQuery storage | Columnar storage, table data types, billing models, read paths, deletion | [storage-overview.md](./storage-overview.md) |
| Introduction to datasets | Location, replication, disaster recovery, retention, external datasets, limitations | [datasets-intro.md](./datasets-intro.md) |
| Create datasets | CREATE SCHEMA, bq mk, client libraries, naming, permissions, hidden datasets | [datasets.md](./datasets.md) |
| Time travel and fail-safe | Retention windows, recovery, billing, limitations | [time-travel.md](./time-travel.md) |
| Restore deleted tables | `@TIME` decorator with `bq cp`, deletion cause, troubleshooting, limitations | [restore-deleted-tables.md](./restore-deleted-tables.md) |
| Access historical data | `FOR SYSTEM_TIME AS OF`, restore a table from a point in time, errors | [access-historical-data.md](./access-historical-data.md) |
| Introduction to table snapshots | Read-only point-in-time copies, limitations, storage costs | [table-snapshots-intro.md](./table-snapshots-intro.md) |
| Introduction to table clones | Writable lightweight copies, limitations, storage costs | [table-clones-intro.md](./table-clones-intro.md) |
| Manage default configuration settings | Organization / project defaults via `ALTER ... SET OPTIONS`, `default_location`, regional options, `INFORMATION_SCHEMA` option views | [default-configuration.md](./default-configuration.md) |
| Introduction to INFORMATION_SCHEMA | Metadata views, qualifiers, pricing, limitations | [information-schema-intro.md](./information-schema-intro.md) |
