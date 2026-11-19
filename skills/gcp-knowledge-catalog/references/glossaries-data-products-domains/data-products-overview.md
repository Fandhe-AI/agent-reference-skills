---
source: https://docs.cloud.google.com/knowledge-catalog/docs/data-products-overview
---

# About data products

Data products in Knowledge Catalog (formerly Dataplex Universal Catalog) package related catalog assets into one curated unit that solves a specific business problem. Producers add context (description, documentation, aspects) and a contract; consumers discover the product, evaluate it and request self-service access.

## Signature / Usage

Snippet borrowed from the consumer page (the overview itself shows no code). Searches for data products with `searchEntries`:

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-d \
  '{
  "query": "ADDITIONAL_KEYWORDS (type=(DATA_PRODUCT))",
  "pageSize": 10
  }' \
"https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/global:searchEntries"
```

### Owner journey

- Create: configure the unique name, project, region and description; add assets; configure access groups mapped to Google Groups or service accounts; optionally assign a default IAM role to an access group (applied to all supported assets); assign IAM roles to access groups for specific assets; add a contract (a system aspect) for the refresh cadence, frequency and threshold.
- Manage: update basic details, assets, permissions, supplementary aspects and rich text documentation; grant consumers access to discover and request access.

### Consumer journey

- Discover with Knowledge Catalog Search (keywords or natural language) and review overview, assets, contract and aspects.
- Request access from the data product owner.
- Use the assets (for example, query a BigQuery table in BigQuery studio). For applications outside Google Cloud, expose the product through an external metadata gateway (the Knowledge Catalog remote MCP server).

## Options / Props

### Key concepts

| Concept | Description |
|---------|-------------|
| Data product | Curated, logical grouping of data assets packaged to be discoverable, trusted and accessible |
| Asset | Pointer to a physical data resource such as a BigQuery dataset, table or view; a product has one or more assets |
| Access group | Maps user-friendly roles (such as `Reader`, `Analyst`) to Google Groups or service accounts; owners can set a default IAM role for all supported assets |
| Data product owner / producer | Individual or team that creates and manages the product (quality, access, documentation) |
| Data product consumer | Individual, team or AI agent that consumes data products |
| Contract | Agreement between owner and consumers on terms such as refresh schedule and quality standards |

### Supported assets

| Source | Asset types |
|--------|-------------|
| BigQuery | Datasets, tables, views, routines, models, external tables, graphs |
| Gemini Enterprise Agent Platform | Datasets, models; Agent Platform feature groups, feature online stores, feature views |
| Cloud Storage | Buckets |
| Iceberg REST Catalog | Catalogs, namespaces, tables |
| Looker (Google Cloud core) | User-defined dashboards and dashboard elements, Looks, Explores, LookML projects, LookML models, LookML views |
| Bigtable | Instances, tables, materialized views, logical views, authorized views |
| Spanner | Databases |
| Gemini Data Analytics | Data agents |

### Limitations

| Area | Limitation |
|------|------------|
| Location | Data products and their underlying assets must reside in the same Google Cloud location |
| BigQuery models and graphs | Access is managed through IAM conditions on the parent dataset's IAM policy and is subject to the limitations of IAM conditions |
| Looker: service accounts | Not supported; Google Group mirroring in Looker (Google Cloud core) supports only human user identities |
| Looker: default access group roles | Not applied to Looker assets and marked `unsupported`; configure access group permissions on each asset |
| Looker: permission sync | Role names on a Looker asset are informational; producers must configure folder access levels and Looker roles for the mirrored group manually |
| Looker: LookML dashboards | LookML dashboards and dashboard elements are not supported as assets even if listed in the console; copy them as user-defined dashboards |
| Cloud Storage | Zonal buckets are not supported |
| Quotas | See the quotas page section "Quotas for data products API requests" |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/data-products-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/use-data-products
- The BigQuery tables, views and models inside a data product are covered by the gcp-bigquery skill; Knowledge Catalog catalogs and packages them.
- Example in the source: an "Ecommerce Business Data" product with BigQuery tables `order_details` and `user_traffic`, view `user_demographics`, `Reader` and `Writer` access groups, a weekly 8:00 AM PST refresh contract and documentation with sample queries.

## Related

- [use-data-products.md](./use-data-products.md)
- [data-domains-overview.md](./data-domains-overview.md)
- [about-governance-workflows.md](./about-governance-workflows.md)
