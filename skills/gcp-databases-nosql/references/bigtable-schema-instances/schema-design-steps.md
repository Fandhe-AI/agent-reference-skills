---
source: https://docs.cloud.google.com/bigtable/docs/schema-design-steps
---

# Design a schema

The ideal Bigtable schema depends on use case, access patterns and the data you store. This page outlines the process: gather information, design, test with realistic data, then refine using Key Visualizer and Cloud Monitoring.

## Signature / Usage

Create a table with the planned column families to test the schema (cbt commands from the quickstart).

```bash
cbt createtable my-table
```

```bash
cbt createfamily my-table cf1
```

```bash
cbt ls my-table
```

## Options / Props

| Phase | Steps |
|-------|-------|
| Before you begin | Create or identify an instance to test the schema |
| Gather information | Identify the data (format: raw bytes, strings, protobufs, json; what an entity is; whether it is time-based); identify and rank the queries |
| Design | Plan row key pattern, column families and column qualifiers; follow schema design guidelines and, for time-based data, the time series guidelines |
| Test | Create the table; load at least 30 GB of test data with your planned row keys (stay below storage utilization per node limits); run a heavy load test for several minutes; run a one-hour simulation; review with Key Visualizer and Cloud Monitoring |
| Refine | Revise (hotspots: different row keys; latency: check rows over 100 MB; filters needed: normalize so reads are a single row or row range); retest until Key Visualizer shows the design is optimal |

## Notes

- If you plan to query with SQL instead of `ReadRows`, see the GoogleSQL for Bigtable overview and Manage row key schemas (https://docs.cloud.google.com/bigtable/docs/googlesql-overview, https://docs.cloud.google.com/bigtable/docs/manage-row-key-schemas); to query views, see Tables and views.
- Snippet taken from https://docs.cloud.google.com/bigtable/docs/create-instance-write-data-cbt-cli; the source page itself has no code. `cbt` is installed with `gcloud components install cbt` and is configured with a `~/.cbtrc` file.
- Bigtable: wide-column NoSQL database, not a relational database; its SQL (GoogleSQL for Bigtable) is not Cloud SQL / Spanner (`gcp-databases-relational`).
- Source: https://docs.cloud.google.com/bigtable/docs/schema-design-steps (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [schema-design.md](./schema-design.md)
- [schema-design-time-series.md](./schema-design-time-series.md)
- [tables-and-views.md](./tables-and-views.md)
- [create-instance-write-data-cbt-cli.md](./create-instance-write-data-cbt-cli.md)
