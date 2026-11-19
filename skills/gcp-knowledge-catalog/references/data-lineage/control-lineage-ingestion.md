---
source: https://docs.cloud.google.com/knowledge-catalog/docs/control-lineage-ingestion
---

# About data lineage ingestion control

Knowledge Catalog (formerly Dataplex Universal Catalog) lets you turn automatic data lineage ingestion on or off across organizations, folders and projects, with per-service controls for integrations such as BigQuery and Managed Service for Apache Spark. This helps manage costs and governance, for example by disabling collection for development projects or high-volume workloads.

## Signature / Usage

The twin has no code. Disabling the Data Lineage API in a project stops lineage ingestion for all services in it; for per-service control, see the configure-lineage-ingestion page of the official docs.

```bash
gcloud services disable datalineage.googleapis.com --project=PROJECT_ID
```

## Options / Props

### Supported service integrations

| Integration | Ingestion control support | Default value |
|---|---|---|
| Managed Service for Apache Spark: Apache Spark clusters | Yes | Enabled |
| Managed Service for Apache Spark: Apache Hive clusters | Yes | Enabled |
| Managed Service for Apache Spark: serverless deployment | Yes | Enabled |
| BigQuery | Yes | Enabled |
| Managed Service for Apache Airflow | Yes | Enabled |
| Looker (Google Cloud core) | Yes | Enabled |
| Cloud Data Fusion | No | Enabled |
| Dataflow | No | Disabled from Dataflow side |
| Vertex AI Pipelines | No | Enabled |

### How the effective configuration is resolved

| Order | Level | Rule |
|---|---|---|
| 1 | Project | Used if a configuration is set |
| 2 | Nearest parent folder with an explicit configuration | Used if none at project level |
| 3 | Organization | Used if none at project or folder level |
| 4 | System default for the integration | Used if none at any level |

### Example: single service (Managed Service for Apache Spark)

| Resource | Configuration | Effective result |
|---|---|---|
| Organization `test-org` | Enabled | n/a |
| Folder `folder-a` | Disabled | n/a |
| Project `project-a` (no configuration) | none | Disabled (inherited from `folder-a`) |
| Folder `folder-b` | Enabled | n/a |
| Project `project-b` | Disabled | Disabled (overrides `folder-b` and `test-org`) |

### Example: multiple services (each resolved independently)

| Project | Managed Service for Apache Spark | BigQuery | Managed Service for Apache Airflow |
|---|---|---|---|
| `project-a` (BigQuery Disabled, Airflow Enabled; in `folder-a`) | Enabled (from `test-org`) | Disabled (project overrides `folder-a`) | Enabled (project) |
| `project-b` (no configuration; in `folder-a`) | Enabled (from `test-org`) | Enabled (from `folder-a`) | System default (Enabled where the Data Lineage API is active) |

## Notes

- The first configuration explicitly set while traversing upward (project, then folders, then organization) takes effect. A project-, folder- or organization-level setting takes precedence over service-specific settings: if lineage ingestion for a service is disabled at project level, no lineage is ingested for it.
- To manage ingestion in bulk, enable the Data Lineage API for all projects in a folder or organization with hierarchical service activation, then control ingestion per service integration at organization, folder or project level.
- Disabling the API stops new lineage ingestion and processing charges but previously ingested metadata keeps incurring storage charges until the 30-day retention window expires; try on a disposable project first.
- Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/use-lineage
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/control-lineage-ingestion (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-data-lineage.md](./about-data-lineage.md)
- [use-lineage.md](./use-lineage.md)
