---
source: https://docs.cloud.google.com/knowledge-catalog/docs/quickstart-business-glossary
---

# Create and use a business glossary (quickstart)

Knowledge Catalog (formerly Dataplex Universal Catalog) business glossaries establish a standardized vocabulary for data assets. The quickstart builds a retail glossary with a category hierarchy (up to 3 levels deep), defines terms with synonyms and related terms, attaches terms to BigQuery columns, and searches for data by business context.

## Signature / Usage

### Create the sample BigQuery table

Run in the BigQuery query editor to create the dataset and table whose columns receive business terms:

```sql
CREATE SCHEMA omnichannel_prod OPTIONS(location="us");
CREATE TABLE omnichannel_prod.daily_stock_summary (
  sku STRING,
  buffer_qty INT64,
  order_lead_time INT64
);
INSERT INTO omnichannel_prod.daily_stock_summary (sku, buffer_qty, order_lead_time)
VALUES
  ('SH001', 50, 7),
  ('BT002', 20, 14),
  ('SH003', 60, 5),
  ('BT004', 30, 10),
  ('SH005', 70, 7),
  ('BT006', 40, 12),
  ('SH007', 80, 6);
```

### Workflow (Console)

1. Create the glossary `Global Retail Operations Glossary` with location `us (multiple regions in United States)` (multi-regions offer higher availability and resilience; single regions help meet data residency requirements).
2. Create the category `Supply Chain & Logistics`, then the sub-category `Inventory Levels` under it.
3. In `Inventory Levels`, add the terms `Safety Stock Level` (with a description), `Buffer Stock` (synonym of `Safety Stock Level`) and `Lead Time` (related to `Buffer Stock`).
4. In Knowledge Catalog Search, open the `daily_stock_summary` table, select the **Schema** tab, and use **Add business term** on `buffer_qty` (`Safety Stock Level`) and `order_lead_time` (`Lead Time`).
5. Search with `term: "Safety Stock Level"` or `term: "Lead Time"`; the table is returned. The term page lists linked assets under **Related entries**.

## Options / Props

### Required roles

| Role | Role ID | Granted on |
|------|---------|------------|
| Dataplex Catalog Admin | `roles/dataplex.catalogAdmin` | The Knowledge Catalog resource project |
| BigQuery Data Editor | `roles/bigquery.dataEditor` | The project where you use BigQuery |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/quickstart-business-glossary (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The source describes the glossary, category, term and search steps in the Google Cloud console only; no API or gcloud forms are shown.
- For large glossaries the source points to the Knowledge Catalog bulk import (JSON or CSV files); see [import-export-glossaries-entrylinks-overview.md](./import-export-glossaries-entrylinks-overview.md).
- Cleanup deletes the glossary (categories first, then terms, then the glossary) and the `omnichannel_prod` dataset; do this on a disposable project.
- The tables themselves and their SQL are covered by the gcp-bigquery skill; Knowledge Catalog catalogs them.

## Related

- [import-export-glossaries-entrylinks-overview.md](./import-export-glossaries-entrylinks-overview.md)
- [data-products-overview.md](./data-products-overview.md)
