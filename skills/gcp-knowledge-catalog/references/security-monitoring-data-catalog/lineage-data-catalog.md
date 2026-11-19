---
source: https://docs.cloud.google.com/data-catalog/docs/lineage-data-catalog
---

# Data lineage with Data Catalog

Data lineage tracks where data comes from, where it is passed to, and what transformations are applied. Data lineage integration with Data Catalog is deprecated, while data lineage integration with Knowledge Catalog is generally available; you can track lineage for both Data Catalog entries and Knowledge Catalog entries.

## Signature / Usage

```bash
gcloud datalineage processes list --location=us
```

## Options / Props

### Role differences

| Use case | Role |
|---|---|
| Access the Data Catalog entry | Data Catalog Viewer (`roles/datacatalog.viewer`) instead of Dataplex Catalog Viewer (`roles/dataplex.catalogViewer`) |
| Other lineage roles | Same as with Knowledge Catalog (see "Predefined roles for data lineage" in the Knowledge Catalog IAM roles page) |

### Locations

| Location | Entries |
|---|---|
| Knowledge Catalog locations | Data Catalog and Knowledge Catalog entries |
| `asia` (Asia), `eu` (Europe), `us` (US) multi-regions | Data Catalog entries only (not Knowledge Catalog entries) |

## Notes

- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says the deprecation "applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates)" while "The Policy Tag Manager service (taxonomies and policy tags) ... isn't deprecated" (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19).
- Enable the Data Catalog API and the Data Lineage API in the project where you view lineage. Lineage is enabled per project, not per service: after enabling the Data Lineage API, lineage is reported automatically for multiple Google Cloud services in the project depending on their product-level lineage control.
- Limitations: for entries created in Data Catalog, the console shows detailed source and target information using the Data Catalog entry; for entries created in Knowledge Catalog, the console doesn't show detailed information if there is no equivalent Data Catalog entry.
- Data Catalog doesn't guarantee higher availability or reliability for multi-regions than for other regions.
- Billing: review the impact when enabling the Data Lineage API per project. For multi-regions (`eu`, `asia`, `us`) and BigQuery Omni, lineage processing is distributed to specific regions and costs depend on where processing is performed.
- The BigQuery tables whose lineage is tracked are in `gcp-bigquery`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/datalineage/processes/list (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/data-catalog/docs/lineage-data-catalog (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [data-catalog-overview.md](./data-catalog-overview.md)
- [deprecations.md](./deprecations.md)
