---
source: https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery-setup
---

# Export Cloud Billing Data to BigQuery and Query It

Enable the billing export into a dataset, then analyze cost with SQL.

## Signature / Usage

### Setup steps (console, Billing > Billing export)

1. Select or create a project (recommended: a separate FinOps / billing administration project linked to the same billing account).
2. Verify billing is enabled on that project.
3. Enable the BigQuery Data Transfer Service API (required for the pricing export only).
4. Create a BigQuery dataset (for example `all_billing_data`, multi-region EU or US, table expiration disabled).
5. Billing export > BigQuery export tab > Enable each export type > pick Projects and Dataset ID > Save.

### Tables created and a fully qualified name

```text
gcp_billing_export_v1_<BILLING_ACCOUNT_ID>            (standard usage cost)
gcp_billing_export_resource_v1_<BILLING_ACCOUNT_ID>   (detailed usage cost)
cloud_pricing_export                                  (pricing)
cud_subscriptions_export                              (CUD metadata)

my-billing-project.my_billing_dataset.gcp_billing_export_resource_v1_010101-F0FFF0-10X10X
```

### Invoice total per month

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

### Cost grouped by one label key

```sql
SELECT
  labels.value as environment,
  SUM(cost) as cost
FROM `project-ID.dataset.gcp_billing_export_v1_XXXXXX-XXXXXX-XXXXXX`
LEFT JOIN UNNEST(labels) as labels
  ON labels.key = "environment"
GROUP BY environment;
```

### Costs and credits by project for one invoice month

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

### Resource-level cost (detailed export)

```sql
SELECT
  invoice.month,
  resource.name,
  SUM(cost)
    + SUM(IFNULL((SELECT SUM(c.amount)
                  FROM UNNEST(credits) c), 0))
    AS total
FROM `project-ID.dataset.gcp_billing_export_resource_v1_XXXXXX-XXXXXX-XXXXXX`
GROUP BY 1, 2
ORDER BY 1 ASC, 2 ASC
;
```

## Options / Props

| Export type | Content |
|-------------|---------|
| Standard usage cost | Services, SKUs, projects, labels, locations, cost, credits |
| Detailed usage cost | Standard plus resource-level data |
| Pricing data | SKUs and list prices; loaded once daily |
| CUD metadata (Preview) | Daily commitment metadata |

## Notes

- Enable the export early: region datasets and pricing data are not backfilled, while multi-region (US/EU) datasets backfill from the start of the previous month.
- Dataset location cannot be changed after creation; do not enable table expiration or write into export tables.
- Query through BigQuery views because schemas can change; filter label keys in the `LEFT JOIN` condition so unlabeled cost is kept.
- Usage cost export needs Billing Account Costs Manager or Administrator plus BigQuery User on the dataset project. Querying incurs BigQuery cost.
- Source: https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery-setup (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/billing/docs/how-to/bq-examples (retrieved 2026-11-14)

## Related

- [export-setup.md](../references/billing/export-bigquery/export-setup.md)
- [export-queries.md](../references/billing/export-bigquery/export-queries.md)
- [budgets.md](../references/billing/budgets-alerts/budgets.md)
