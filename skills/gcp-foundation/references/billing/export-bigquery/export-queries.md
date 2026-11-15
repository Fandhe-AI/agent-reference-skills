---
source: https://docs.cloud.google.com/billing/docs/how-to/bq-examples
---

# Cloud Billing Export: Example BigQuery Queries

SQL examples for the standard usage cost, detailed usage cost, and pricing exports.

## Signature / Usage

Name the table with three dot-separated parts: `project-ID.dataset_name.BQ_table_name`. Generate an equivalent query from a Billing Report with its "Generate query" feature.

Invoice total per month (`total_exact` avoids floating-point rounding by summing as `NUMERIC`):

```sql
SELECT
  invoice.month,
  SUM(cost)
    + SUM(IFNULL((SELECT SUM(c.amount)
                  FROM UNNEST(credits) c), 0))
    AS total,
  (SUM(CAST(cost AS NUMERIC))
    + SUM(IFNULL((SELECT SUM(CAST(c.amount AS NUMERIC))
                  FROM UNNEST(credits) AS c), 0)))
    AS total_exact
FROM `project-ID.dataset.gcp_billing_export_v1_XXXXXX-XXXXXX-XXXXXX`
GROUP BY 1
ORDER BY 1 ASC
;
```

Group cost by the value of one label key (the key filter is in the JOIN condition so unlabeled cost is kept):

```sql
SELECT
  labels.value as environment,
  SUM(cost) as cost
FROM `project-ID.dataset.gcp_billing_export_v1_XXXXXX-XXXXXX-XXXXXX`
LEFT JOIN UNNEST(labels) as labels
  ON labels.key = "environment"
GROUP BY environment;
```

Costs and credits by project for one invoice month:

```sql
SELECT
  project.name,
  TO_JSON_STRING(project.labels) as project_labels,
  sum(cost) as total_cost,
  SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as total_credits
FROM `project-ID.dataset.gcp_billing_export_v1_XXXXXX-XXXXXX-XXXXXX`
WHERE invoice.month = "202006"
GROUP BY 1, 2
ORDER BY 1;
```

Committed use discount fees and credits:

```sql
SELECT
    invoice.month AS invoice_month,
    SUM(cost) as commitment_fees
FROM `project-ID.dataset.gcp_billing_export_v1_XXXXXX-XXXXXX-XXXXXX`
WHERE LOWER(sku.description) LIKE "commitment%"
GROUP BY 1
```

```sql
SELECT
    invoice.month AS invoice_month,
    SUM(credits.amount) as CUD_credits
FROM `project-ID.dataset.gcp_billing_export_v1_XXXXXX-XXXXXX-XXXXXX`
LEFT JOIN UNNEST(credits) AS credits
WHERE credits.type = "COMMITTED_USAGE_DISCOUNT"
GROUP BY 1
```

Cost by resource tag (detailed export), and untagged cost:

```sql
SELECT
  invoice.month AS invoice_month,
  tag.value AS cost_center,
  ROUND((SUM(CAST(cost AS NUMERIC))
    + SUM(IFNULL((SELECT SUM (CAST(c.amount AS NUMERIC))
                  FROM UNNEST(credits) AS c), 0))), 2)
    AS net_cost
FROM `project-ID.dataset.gcp_billing_export_resource_v1_XXXXXX-XXXXXX-XXXXXX`, UNNEST(tags) AS tag
WHERE tag.key = "cost_center" AND tag.namespace = "821092389413"
GROUP BY invoice.month, tag.value
ORDER BY invoice.month, tag.value;
```

```sql
SELECT
 invoice.month AS invoice_month,
 ROUND((SUM(CAST(cost AS NUMERIC))
   + SUM(IFNULL((SELECT SUM(CAST(c.amount AS NUMERIC))
                 FROM UNNEST(credits) AS c), 0))), 2)
   AS net_cost
FROM
 `project-ID.dataset.gcp_billing_export_v1_XXXXXX-XXXXXX-XXXXXX`
WHERE "color" NOT IN (SELECT key FROM UNNEST(tags))
GROUP BY invoice_month
ORDER BY invoice_month;
```

Late-monetized usage or corrections on an invoice month:

```sql
SELECT
  SUM(cost)
    + SUM(IFNULL((SELECT SUM(c.amount)
      FROM   UNNEST(credits) c), 0))
    AS total
FROM `project-ID.dataset.gcp_billing_export_v1_XXXXXX-XXXXXX-XXXXXX`
WHERE
  invoice.month = '202403' AND
    DATE(TIMESTAMP_TRUNC(usage_start_time, Day, 'US/Pacific')) < '2024-03-01';
```

Resource-level cost per invoice (detailed export):

```sql
SELECT
  invoice.month,
  resource.name,
  SUM(cost)
    + SUM(IFNULL((SELECT SUM(c.amount)
                  FROM UNNEST(credits) c), 0))
    AS total,
  (SUM(CAST(cost AS NUMERIC))
    + SUM(IFNULL((SELECT SUM(CAST(c.amount AS NUMERIC))
                  FROM UNNEST(credits) AS c), 0)))
    AS total_exact
FROM `project-ID.dataset.gcp_billing_export_resource_v1_XXXXXX-XXXXXX-XXXXXX`
GROUP BY 1, 2
ORDER BY 1 ASC, 2 ASC
;
```

List prices for a SKU (pricing export; SKU `2DA5-55D3-E679` is Cloud Run - Requests in the official example):

```sql
SELECT sku.id,  sku.description, list_price.*
FROM `project-ID.dataset.cloud_pricing_export`
WHERE DATE(pricing_as_of_time) = "2020-07-20"
      AND sku.id = "2DA5-55D3-E679"
;
```

## Options / Props

| Export | Table name | Notes |
|--------|------------|-------|
| Standard | `gcp_billing_export_v1_<BILLING-ACCOUNT-ID>` | Queries here also run on the detailed table |
| Detailed | `gcp_billing_export_resource_v1_<BILLING-ACCOUNT-ID>` | Adds `resource.name`, `tags`, GKE breakdown |
| Pricing | `cloud_pricing_export` | Partitioned; use `_PARTITIONTIME` or `pricing_as_of_time` |
| Labels / credits | Repeated fields | Use `UNNEST`; filter `credits.name` / `credits.type` with `LEFT JOIN UNNEST` |

## Notes

- FOCUS-export queries are not on this page; use the FinOps Foundation FOCUS use cases (v1.0 to v1.2).
- `invoice.month` is a `YYYYMM` string. Cost types include regular, tax, adjustment, rounding_error; use `GROUP BY` on `cost_type` to separate them.
- Because a label key filter in WHERE would drop unlabeled cost, filter in the LEFT JOIN condition instead (totals then match a group-by-label-map query).
- Legacy SQL does not support `TO_JSON_STRING`; use Standard SQL.
- The official page also covers resource-hierarchy ancestry filters, joining pricing with detailed usage, GKE cost breakdown, product/geo taxonomy SKU lookup, system labels, and Vertex AI reservation analysis; see the source page.
- Querying incurs BigQuery cost; preview estimated bytes before running large queries.
- Source: https://docs.cloud.google.com/billing/docs/how-to/bq-examples
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [export-setup.md](./export-setup.md)
- gcp-bigquery (query syntax and cost control)
