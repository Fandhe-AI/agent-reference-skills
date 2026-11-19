---
source: https://docs.cloud.google.com/bigquery/docs/editions-intro
---

# BigQuery editions

BigQuery has three editions (Standard, Enterprise, Enterprise Plus) for capacity-based pricing, alongside the on-demand (per TiB processed) model. You enable editions when you reserve capacity, and you can use editions and on-demand at the same time on a per-project basis. Editions are a property of compute, not storage.

## Signature / Usage

### Create a reservation

Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (the page shows no code). The example sets only `slot_capacity`; the reservation's edition is set with the `edition` option, which accepts `STANDARD`, `ENTERPRISE`, and `ENTERPRISE_PLUS`.

```sql
CREATE RESERVATION `admin_project.region-us.prod`
OPTIONS (
  slot_capacity = 100);
```

## Options / Props

### Administration features

| Feature | Standard | Enterprise | Enterprise Plus | On-demand |
|---|---|---|---|---|
| Pricing model | Slot-hours (1 minute minimum by default; opt in to BigQuery fluid scaling for no minimum duration) | Same as Standard | Same as Standard | Pay per query with free tier |
| Monthly SLO | >=99.9% | >=99.99% | >=99.99% | >=99.99% |
| Compliance controls (Assured Workloads) | No | No | Yes | Yes |
| BI Engine query acceleration | No | Yes | Yes | Yes |
| Workload management | Users cannot set the maximum concurrency target | Advanced (idle capacity sharing, target concurrency) | Advanced | No advanced workload management |
| Compute model | Autoscaling | Autoscaling + Baseline | Autoscaling + Baseline | On-demand |
| Maximum reservation size | 1,600 slots | Quota | Quota | Quota |
| Maximum reservations per administration project | 10 reservations per administration project, up to 16,000 slots per organization | 200 | 200 | No access to reservations |
| Commitment plans | No capacity commitments | 1-year commitment at 20% discount or 3-year commitment at 40% discount | Same as Enterprise | No capacity commitments |
| Assignments | Project assignments | Project, folder, or organization | Project, folder, or organization | No assignments |
| Supported assignment types | `QUERY`, `PIPELINE` | All assignment types | All assignment types | Not supported |
| Managed disaster recovery | No | No | Yes | No |
| Data export to Bigtable, Spanner, AlloyDB | No | Yes | Yes | No |

### Analysis features

| Feature | Standard | Enterprise | Enterprise Plus | On-demand |
|---|---|---|---|---|
| Data sharing (entity resolution, publish / subscribe to datasets, data clean room subscriptions, egress controls) | Yes | Yes | Yes | Yes |
| Materialized views | Query existing materialized views directly | Create, automatic and manual refresh, direct query, smart tuning | Same as Enterprise | Same as Enterprise |
| Cached results | Single-user caching | Cross-user caching | Cross-user caching | Single-user caching |
| Continuous queries | No | Yes | Yes | No |
| Search | `SEARCH` function without search indexes | Search indexes | Search indexes | Search indexes |
| Vector search | `VECTOR_SEARCH` function without vector indexes | Vector indexes | Vector indexes | Vector indexes |
| Unstructured data | SQL queries on object tables | Plus ML inference on object tables with remote models | Same as Enterprise | Same as Enterprise |
| Multi-cloud analytics (BigQuery Omni) | Not available | Yes | Not available | Yes |
| Integrated machine learning (BigQuery ML) | No | Yes | Yes | Yes |
| VPC Service Controls | No | Yes | Yes | Yes |
| Storage encryption | Google-owned and Google-managed keys | CMEK plus Google-managed | CMEK plus Google-managed | CMEK plus Google-managed |
| Fine-grained security (column-level access control, row-level security, dynamic and custom data masking) | No | Yes | Yes | Yes |
| BigQuery Graph | No | Yes | Yes | Yes |

## Notes

- To change the edition of a reservation, delete and recreate the reservation with the new edition type.
- Capacity commitments are not required to purchase slots, but can reduce costs. Slots from all editions are subject to the same quota; quota is not fulfilled per edition.
- Do not use edition tiers to restrict access to features, because the features assigned to each edition can change over time (for example, do not use Standard reservations to disallow BigQuery ML).
- Enterprise Plus supports Assured Workloads platform controls for FedRAMP, CJIS, IL4, and ITAR.
- Source table cells that list several documentation links were condensed to feature names; the source also lists the individual feature links.
- Source: https://docs.cloud.google.com/bigquery/docs/editions-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (retrieved 2026-11-19).
- Prices are not copied; see https://cloud.google.com/bigquery/pricing.

## Related

- [slots.md](./slots.md)
- [reservations-workload-management.md](./reservations-workload-management.md)
- [best-practices-costs.md](./best-practices-costs.md)
