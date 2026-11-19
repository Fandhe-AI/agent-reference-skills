---
source: https://docs.cloud.google.com/knowledge-catalog/docs/upgrade-dataplex-universal-catalog
---

# Upgrade from Dataplex Universal Catalog to Knowledge Catalog

Dataplex Universal Catalog is now Knowledge Catalog. Existing configurations, APIs and deployments keep working without manual migration, data movement or downtime; data discovery, data lineage, data quality scans and business glossaries continue, and existing metadata and aspects transition automatically.

## Signature / Usage

### Commands keep the `dataplex` group

```bash
gcloud dataplex glossaries list --location=us-central1 \
  --project=test-dataplex
```

REST endpoints still use `dataplex.googleapis.com`, for example `https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/entryGroups`.

## Options / Props

### What keeps the `dataplex` name

| Surface | Unchanged identifier |
|---|---|
| REST API | `dataplex.googleapis.com` service endpoint. |
| RPC API | `dataplex.googleapis.com` service name and `google.cloud.dataplex.v1` package (for example `google.cloud.dataplex.v1.CatalogService`). |
| Client libraries | Package names and namespaces still use `dataplex`: `google-cloud-dataplex` for Python, `cloud.google.com/go/dataplex` for Go. |
| Google Cloud CLI | `gcloud dataplex` commands (for example `gcloud dataplex entries search`, `gcloud dataplex glossaries list`). |
| IAM | Roles and permissions keep the `dataplex` prefix: `roles/dataplex.catalogAdmin` (Dataplex Catalog Admin), `roles/dataplex.catalogEditor`, `roles/dataplex.catalogViewer`; permissions such as `dataplex.entries.get` and `dataplex.entryGroups.create`. |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/upgrade-dataplex-universal-catalog (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/glossaries/list (gcloud 593.0.0 help); the page itself has no fenced code.
- Unlike conventional passive catalogs, Knowledge Catalog curates metadata, business relationships and operational rules into a context graph and adds verified example queries and Model Context Protocol (MCP) integrations.
- Client-library details are in `gcp-client-libraries` (patterns) and the API reference at https://docs.cloud.google.com/knowledge-catalog/docs/reference/libraries.

## Related

- [introduction.md](./introduction.md)
- [iam-roles.md](./iam-roles.md)
