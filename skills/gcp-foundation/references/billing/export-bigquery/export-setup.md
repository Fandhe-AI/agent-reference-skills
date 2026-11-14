---
source: https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery-setup
---

# Cloud Billing Export to BigQuery: Setup

Export types, required permissions, and the five setup steps (project, billing, Data Transfer Service API, dataset, enable export), plus update and disable procedures.

## Signature / Usage

Setup steps (console, Billing > Billing export):

1. Select or create a project (recommended: a separate FinOps / billing administration project linked to the same billing account as the exported data).
2. Verify billing is enabled on that project.
3. Enable the BigQuery Data Transfer Service API (required for the pricing export only), in the same project as the dataset.
4. Create a BigQuery dataset (Dataset ID such as `all_billing_data`, a multi-region EU or US location recommended, "Enable table expiration" cleared, encryption Google-managed or CMEK).
5. Billing export > BigQuery export tab > "Enable [data type] export" for each type > pick Projects and Dataset ID > Save. CUD metadata export uses a new linked dataset name (do not reuse an existing dataset).

Table names created in the dataset, and a fully qualified FROM clause (example values from the official page):

```text
gcp_billing_export_v1_<BILLING_ACCOUNT_ID>            (standard usage cost)
gcp_billing_export_resource_v1_<BILLING_ACCOUNT_ID>   (detailed usage cost)
cloud_pricing_export                                  (pricing)
cud_subscriptions_export                              (CUD metadata)
gcp_billing_immutable_<BILLING_ACCOUNT_ID>_<Location> (FOCUS immutable dataset)
gcp_billing_export_focus_<BILLING_ACCOUNT_ID>         (FOCUS table)

my-billing-project.my_billing_dataset.gcp_billing_export_resource_v1_010101-F0FFF0-10X10X
```

Row-level security on an export table requires granting the export service account full access (statement from the official page):

```sql
CREATE ROW ACCESS POLICY cloud_billing_export_policy
ON `__project_id__.__dataset_id__.__table_id__`
GRANT TO ('serviceAccount:billing-export-bigquery@system.gserviceaccount.com')
FILTER USING (TRUE);
```

## Options / Props

### Export types

| Export type | Content |
|-------------|---------|
| FOCUS usage cost (Preview) | Immutable Google-provided dataset (linked dataset Google pays for), FinOps FOCUS-normalized cost data; 2-year TTL |
| Standard usage cost | Account ID, invoice date, services, SKUs, projects, labels, locations, cost, usage, credits, adjustments, currency; for broad trends |
| Detailed usage cost | Standard plus resource-level data (for example a VM or SSD); for GKE breakdown also enable GKE cost allocation |
| Pricing data | Account ID, services, SKUs, products, geo metadata, pricing units, currency, aggregation, tiers; loaded once daily, up to 48 hours to first appear |
| CUD metadata (Preview) | Daily export of commitment metadata (billing account, product, consumption model, commitment amount, term) |
| Rebilling (resellers) | Channel Services data via Partner Sales Console |

### Permissions

| Export | Billing account | BigQuery / project |
|--------|-----------------|--------------------|
| Usage cost | Billing Account Costs Manager or Billing Account Administrator | BigQuery User on the dataset project |
| Pricing and CUD metadata | Billing Account Administrator | BigQuery Admin on the dataset project; `resourcemanager.projects.update` (in `roles/editor`) |
| New project | n/a | Project Creator; `resourcemanager.organizations.get`, `resourcemanager.projects.create` |

### Supported dataset locations

| Area | Locations |
|------|-----------|
| Multi-region | US, EU (all supported) |
| Americas | northamerica-northeast1, southamerica-east1, us-central1, us-east1, us-east4, us-west1, us-west2, us-west3, us-west4 |
| Asia Pacific | asia-east1, asia-east2, asia-northeast1, asia-northeast2, asia-northeast3, asia-south1, asia-southeast1, asia-southeast2, australia-southeast1 |
| Europe | europe-central2, europe-north1, europe-west1, europe-west2, europe-west3, europe-west4, europe-west6 |
| Middle East | me-central1, me-central2, me-west1 |

## Notes

- Enable export when you create the billing account: data is only as complete as the time the export was enabled. Multi-region (US/EU) datasets backfill from the start of the previous month (initial backfill up to five days); region datasets and pricing data are not retroactive. Re-enabling may leave a gap.
- Unsupported region gives an "Invalid dataset region" error and settings are not saved. Dataset location cannot be changed after creation.
- Do not enable table expiration; deleted export records cannot be backfilled. Do not insert data into or alter export tables (changes may stop the export or be deleted); consolidate old and new datasets with a UNION query or join instead.
- Changing the export project or dataset (disable first, then edit) does not backfill old data into the new dataset.
- CMEK must be enabled at dataset level (set a dataset default key and enable CMEK on each existing table with `bq`). CMEK organization policies (`restrictNonCmekServices`, `restrictCmekCryptoKeyProjects`) can make the export fail on existing or empty non-CMEK datasets.
- Table schemas can change; query through BigQuery views rather than referencing export columns directly.
- With VPC Service Controls, create ingress and egress rules for the CUD metadata export. Resource-level tags can take up to an hour to propagate; exported records reflect resource state at usage time and are not updated retroactively.
- BigQuery charges apply for storage and queries; loading is free. Standard export is cheaper to query than detailed; use detailed only for resource-level analysis.
- Source: https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery-setup
- Source: https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery
- Source: https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery-tables
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [export-queries.md](./export-queries.md)
- [../budgets-alerts/budgets.md](../budgets-alerts/budgets.md)
- gcp-bigquery (BigQuery datasets, tables, and queries in general)
