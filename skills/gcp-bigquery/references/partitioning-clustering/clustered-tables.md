---
source: https://docs.cloud.google.com/bigquery/docs/clustered-tables
---

# Introduction to clustered tables

Clustered tables sort data in storage blocks by the values of up to four user-defined clustered columns. Queries that filter or aggregate on those columns scan only the relevant blocks (block pruning), which can improve performance and reduce cost. The cost of such a query cannot be estimated accurately before it runs, and clustering does not guarantee fewer slots.

## Signature / Usage

### Block pruning example

`ClusteredSalesData` is partitioned by `timestamp` and clustered by `customer_id`, with these blocks:

| Partition identifier | Block ID | Minimum value for customer_id in the block | Maximum value for customer_id in the block |
|---|---|---|---|
| 20160501 | B1 | 10000 | 19999 |
| 20160501 | B2 | 20000 | 24999 |
| 20160502 | B3 | 15000 | 17999 |
| 20160501 | B4 | 22000 | 27999 |

```sql
SELECT
  SUM(totalSale)
FROM
  `mydataset.ClusteredSalesData`
WHERE
  customer_id BETWEEN 20000
  AND 23000
  AND DATE(timestamp) = "2016-05-01"
```

The query scans the `timestamp`, `customer_id` and `totalSale` columns in blocks B2 and B4. B3 is pruned by the `DATE(timestamp) = "2016-05-01"` partition predicate; B1 is pruned by the `customer_id BETWEEN 20000 AND 23000` clustering predicate.

## Options / Props

### Cluster column types

Cluster columns must be top-level, non-repeated columns of one of these types:

| Type |
|---|
| `BIGNUMERIC` |
| `BOOL` |
| `DATE` |
| `DATETIME` |
| `GEOGRAPHY` |
| `INT64` |
| `NUMERIC` |
| `RANGE` |
| `STRING` |
| `TIMESTAMP` |

### Limitations

| Limitation | Detail |
|---|---|
| Query language | Only GoogleSQL can query clustered tables or write query results to them |
| Number of clustering columns | Up to four; combine with partitioning if you need more |
| `STRING` columns | Only the first 1,024 characters are used to cluster the data (values can be longer) |
| Altering an existing table to be clustered | Existing data is not automatically clustered; only new data written with the clustered columns is reclustered. Recluster existing data with an `UPDATE` statement (see "Modify clustering specification") |

### When clustering helps

| Condition | Effect |
|---|---|
| Unpartitioned tables or partitions larger than 64 MB | Likely to benefit; smaller ones usually see negligible improvement |
| Queries commonly filter on particular columns | Only matching blocks are scanned |
| Filters on high-cardinality columns | Detailed block metadata speeds up the queries |

### Add partitioning to clustering when

| Condition | Reason |
|---|---|
| You need a strict cost estimate before running | Clustered query cost is known only after the query runs; partitioning gives granular estimates |
| Partitioning yields at least 10 GB per partition on average | Many small partitions increase metadata and can slow metadata access |
| You continually update the table but want long-term storage pricing | Each partition is assessed separately; an unpartitioned table must be unedited for 90 consecutive days |

## Notes

- Cluster column order matters: with order `Order_Date`, `Country`, `Status`, a filter on `Order_Date` and `Country` is optimized, a filter on only `Country` and `Status` is not.
- Bytes processed equal the sum of bytes read in each referenced column in the scanned blocks. If a clustered table is referenced several times with different filters, each filter is charged for its blocks.
- Automatic reclustering runs in the background (within each partition for partitioned tables), has no effect on query capacity, and is a free operation along with batch load, table copy and export (subject to quotas and limits).
- Partitioned clustered tables are subject to the limits on partitioned tables. Pricing is not copied; see the BigQuery pricing page.
- Access control for tables: see "Control access to resources with IAM".
- Source: https://docs.cloud.google.com/bigquery/docs/clustered-tables (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [querying-clustered-tables.md](./querying-clustered-tables.md)
- [partitioned-tables.md](./partitioned-tables.md)
- [creating-partitioned-tables.md](./creating-partitioned-tables.md)
