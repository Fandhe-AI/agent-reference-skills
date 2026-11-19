---
source: https://docs.cloud.google.com/knowledge-catalog/docs/deprecations
---

# Deprecations (Knowledge Catalog and Data Catalog)

The Google Cloud Terms of Service ("Discontinuation of Services") define the deprecation policy that applies to Knowledge Catalog and Data Catalog. After a feature is officially deprecated it remains available for at least the period defined in the Terms of Service, after which it is scheduled for shutdown. This page merges the Knowledge Catalog and Data Catalog deprecation pages.

## Signature / Usage

The Data Catalog search command is itself deprecated in favor of Knowledge Catalog entry search.

Use the Knowledge Catalog equivalent (the example from the `gcloud dataplex entries search` help):

```bash
gcloud dataplex entries search 'foo' --project=my-project
```

Data Catalog search was shut down on June 1, 2026 (see Notes); the deprecated command is kept for reference only:

```bash
gcloud data-catalog search 'foo' --include-project-ids=my-project
```

## Options / Props

### Knowledge Catalog deprecations

| Feature | Deprecated date | Shutdown date | Details |
|---|---|---|---|
| Attribute Store | February 18, 2025 | February 18, 2026 | Discontinued. |

### Data Catalog deprecations

| Feature | Deprecated date | Shutdown date | Details |
|---|---|---|---|
| Data Catalog | February 3, 2025 | June 1, 2026 | See "Transition from Data Catalog to Knowledge Catalog" (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) |

## Notes

- Adapted from the official docs: the page shows only `gcloud data-catalog search 'foo' --include-project-ids=my-project`. Data Catalog search is deprecated (gcloud help: "Please use gcloud dataplex entries search instead") and its shutdown date is June 1, 2026, before the 2026-11-19 retrieval date, so the `gcloud dataplex entries search QUERY --project=PROJECT` form (gcloud 593.0.0 help) is shown first and the Data Catalog command is kept as a shut-down legacy form. The same applies to `gcloud data-catalog` and the Data Catalog APIs listed under Ways to access: they are historical (Policy Tag Manager remains served under `datacatalog.googleapis.com`, see Notes).
- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says the deprecation "applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates)" while "The Policy Tag Manager service (taxonomies and policy tags) ... isn't deprecated" (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19).
- The Policy Tag Manager service, used for column-level access control and dynamic data masking in BigQuery, continues to be served under the `datacatalog.googleapis.com` API endpoint, which must remain enabled for projects that use BigQuery policy tags. Policy Tag Manager is in `gcp-bigquery`.
- Deprecated: the gcloud help for `data-catalog search` says "(DEPRECATED) This command is deprecated. Please use gcloud dataplex entries search instead."
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/search (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/deprecations (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/data-catalog/docs/deprecations (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [data-catalog-overview.md](./data-catalog-overview.md)
- [lineage-data-catalog.md](./lineage-data-catalog.md)
