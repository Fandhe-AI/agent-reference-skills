---
source: https://docs.cloud.google.com/bigquery/docs/querying-clustered-tables
---

# Query clustered tables

Filtering on clustered columns lets BigQuery prune blocks and read less data. Clustered tables can be queried only with GoogleSQL, through the Console, `bq query`, the `jobs.insert` method (a query job configuration) or the client libraries. The best practices below use a sample table clustered by `customer_id`, `product_id`, `order_id` (in that sort order).

## Signature / Usage

Sample table:

```sql
CREATE TABLE
  `mydataset.ClusteredSalesData`
PARTITION BY
  DATE(timestamp)
CLUSTER BY
  customer_id,
  product_id,
  order_id AS
SELECT
  *
FROM
  `mydataset.SalesData`
```

### Filter clustered columns in sort order

Sort order is the column order in `CLUSTER BY`. Start with the first column; the ordering of names inside the filter expression does not matter. Optimized:

```sql
SELECT
  SUM(totalSale)
FROM
  `mydataset.ClusteredSalesData`
WHERE
  customer_id = 10000
  AND product_id LIKE 'gcp_analytics%'
```

Not optimal (skips `customer_id`):

```sql
SELECT
  SUM(totalSale)
FROM
  `mydataset.ClusteredSalesData`
WHERE
  product_id LIKE 'gcp_analytics%'
  AND order_id = 20000
```

### Avoid complex filter expressions

A clustered column inside a function prevents block pruning:

```sql
SELECT
  SUM(totalSale)
FROM
  `mydataset.ClusteredSalesData`
WHERE
  CAST(customer_id AS STRING) = "10000"
```

Use a simple filter instead:

```sql
SELECT
  SUM(totalSale)
FROM
  `mydataset.ClusteredSalesData`
WHERE
  customer_id = 10000
```

### Do not compare a clustered column to another column

This prevents block pruning:

```sql
SELECT
  SUM(totalSale)
FROM
  `mydataset.ClusteredSalesData`
WHERE
  customer_id = order_id
```

### Write query results into a clustered table (Python)

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

# TODO(developer): Set table_id to the ID of the destination table.
# table_id = "your-project.your_dataset.your_table_name"

sql = "SELECT * FROM `bigquery-public-data.samples.shakespeare`"
cluster_fields = ["corpus"]

job_config = bigquery.QueryJobConfig(
    clustering_fields=cluster_fields, destination=table_id
)

# Start the query, passing in the extra configuration.
client.query_and_wait(
    sql, job_config=job_config
)  # Make an API request and wait for job to complete.

table = client.get_table(table_id)  # Make an API request.
if table.clustering_fields == cluster_fields:
    print(
        "The destination table is written using the cluster_fields configuration."
    )
```

## Options / Props

### Required roles and permissions

| Role / permission | Needed for |
|---|---|
| `bigquery.jobs.create` on the project that runs the query | Running a query job. Included in `roles/bigquery.admin`, `roles/bigquery.jobUser`, `roles/bigquery.user` |
| `bigquery.tables.getData` on all tables and views the query references | Reading data. Included in `roles/bigquery.admin`, `roles/bigquery.dataOwner`, `roles/bigquery.dataEditor`, `roles/bigquery.dataViewer` |

## Notes

- When querying a view you need `bigquery.tables.getData` on all underlying tables and views, unless you use authorized views or authorized datasets (then no access to the underlying data is needed).
- Using the second or third clustered column alone still works but pruning is probably less effective; the first clustering column is usually the most effective.
- The source also shows Go and Java client samples, which are omitted here.
- Source: https://docs.cloud.google.com/bigquery/docs/querying-clustered-tables (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [clustered-tables.md](./clustered-tables.md)
- [creating-partitioned-tables.md](./creating-partitioned-tables.md)
