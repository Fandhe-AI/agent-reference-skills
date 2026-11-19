---
source: https://docs.cloud.google.com/data-catalog/docs/concepts/overview
---

# Data Catalog overview

Data Catalog is a central inventory of an organization's data assets. It automatically catalogs metadata from Google Cloud sources, indexes Cloud Storage table and fileset metadata through discovery, and surfaces through Knowledge Catalog's governed organization-wide metadata search.

## Signature / Usage

Use the Knowledge Catalog equivalent (the example from the `gcloud dataplex entries search` help):

```bash
gcloud dataplex entries search 'foo' --project=my-project
```

Data Catalog search was shut down on June 1, 2026 (see Notes); the deprecated command is kept for reference only:

```bash
gcloud data-catalog search 'foo' --include-project-ids=my-project
```

## Options / Props

### Main functions

| Function |
|---|
| Searching for data entries for which you have access |
| Tagging data entries with metadata |
| Providing column-level security for BigQuery tables |

Data Catalog can also build on the results of a Sensitive Data Protection scan to identify sensitive data in the form of tag templates.

### Assets cataloged automatically for a project

| Source | Assets |
|---|---|
| BigQuery sharing (formerly Analytics Hub) | Linked datasets |
| BigQuery | Datasets, tables, models, routines and connections |
| Bigtable | Instances, clusters and tables (including column family details) |
| Knowledge Catalog | Lakes, zones, tables and filesets |
| Dataproc Metastore | Services, databases and tables |
| Pub/Sub | Topics |
| Spanner | Instances, databases, tables and views |
| Vertex AI | Models, datasets and Vertex AI Feature Store resources |

### Ways to access

| Method |
|---|
| Knowledge Catalog in the Google Cloud console |
| `gcloud` command-line tool (`gcloud data-catalog`) |
| Data Catalog APIs |
| Cloud Client Libraries |

## Notes

- Adapted from the official docs: the page shows only `gcloud data-catalog search 'foo' --include-project-ids=my-project`. Data Catalog search is deprecated (gcloud help: "Please use gcloud dataplex entries search instead") and its shutdown date is June 1, 2026, before the 2026-11-19 retrieval date, so the `gcloud dataplex entries search QUERY --project=PROJECT` form (gcloud 593.0.0 help) is shown first and the Data Catalog command is kept as a shut-down legacy form. The same applies to `gcloud data-catalog` and the Data Catalog APIs listed under Ways to access: they are historical (Policy Tag Manager remains served under `datacatalog.googleapis.com`, see Notes).
- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says the deprecation "applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates)" while "The Policy Tag Manager service (taxonomies and policy tags) ... isn't deprecated" (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19).
- Deprecated: the gcloud help for `data-catalog search` says "(DEPRECATED) This command is deprecated. Please use gcloud dataplex entries search instead."
- Search is predicate-based over technical and business metadata; you need permission to read an entry's metadata. Data Catalog doesn't index the data inside an entry, only the metadata that describes it. Metadata sourced from the underlying storage system is read-only in Data Catalog; edit it in the underlying system. Data Catalog also catalogs data in BigQuery projects that contain public datasets.
- If a project name contains `:`, Knowledge Catalog doesn't catalog `FeatureView` and `Feature` resources created in that project.
- Non-Google Cloud assets: use community-contributed connectors or build on the Data Catalog APIs for custom entries.
- Column-level security for BigQuery tables (Policy Tag Manager) is in `gcp-bigquery`; the BigQuery tables themselves are in `gcp-bigquery` and Knowledge Catalog catalogs them.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/search (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/data-catalog/docs/concepts/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [deprecations.md](./deprecations.md)
- [lineage-data-catalog.md](./lineage-data-catalog.md)
