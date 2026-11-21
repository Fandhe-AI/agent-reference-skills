---
source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-knowledge-catalog
---

# Use Knowledge Catalog with Federated Query Connectors

Preview. Gemini Enterprise (formerly Agentspace) integrates with Knowledge Catalog to give agents read-only tools to search for data a user has access to and look up technical and business context. No separate data store is needed.

## Signature / Usage

### Example workflow

A user asks "How many sales did we have this month for all cold weather products?". Step 2, semantic search discovery: the root agent searches Knowledge Catalog with search terms extracted from the question.

```json
["cold weather", "products", "orders", "sales"]
```

Step 3, context retrieval: for matching entries the user has access to, the agent looks up enriched context (technical metadata, usage patterns, business glossaries, LLM inference).

```yaml
simpleName: my-project.ecomm.products
type: BigQuery Table
terms: "Cold Weather Products; category IN ('Sweaters', 'Coats & Jackets')"
```

Step 4, query execution: the agent formulates and executes a read-only SQL query through the federated BigQuery connector.

```sql
-- Execute BigQuery read-only SQL
SELECT COUNT(order_id) FROM `my-project.ecomm.orders`
WHERE product_id IN (
  SELECT id FROM `my-project.ecomm.products`
  WHERE category IN ('Sweaters', 'Coats & Jackets')
);
```

### Permissions (end-user credentials)

The integration authenticates requests using end-user credentials, so the agent can only find and discover data assets that the authenticated user has IAM permission to view:

- Separation of metadata and data access with search result trimming: Knowledge Catalog enforces search result trimming based on the user's permissions in the underlying data source. If a user lacks read permissions (such as `roles/bigquery.dataViewer` or `roles/bigquery.metadataViewer`) on a dataset or table, that asset is automatically filtered out of catalog search results and cannot be discovered by the assistant.
- First-party Google Cloud data sources (BigQuery, AlloyDB for PostgreSQL, Spanner, Cloud SQL): permissions are inherited automatically; for example, granting BigQuery Data Viewer (`roles/bigquery.dataViewer`) gives access to search and discover the corresponding table and dataset metadata in Knowledge Catalog.
- Additional metadata and third-party data sources: for custom metadata, business glossaries or third-party data assets added to Knowledge Catalog, users need the required view permissions in Knowledge Catalog (such as `roles/dataplex.dataDomainEntryReader` or `roles/dataplex.catalogViewer`).

### Enable or disable Knowledge Catalog in your app

In the console Gemini Enterprise page, click the app, click **Configurations**, select the **Assistant** tab, use the **Enable Knowledge Catalog** toggle to turn the integration on or off, and click **Save and publish**.

## Notes

- Preview: subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms; Pre-GA features are available "as is" and might have limited support.
- The integration is automatically enabled when you attach a BigQuery, Spanner, Cloud SQL, or AlloyDB for PostgreSQL data store in federated query mode to the app. It appears as a configuration option on the **Assistant** tab, not as a data store. You can turn it on or off manually at any time, even without a companion Data Cloud connector.
- Read-only and uses internal APIs: you don't need to enable the Dataplex API or grant MCP tool permissions, and users don't need permissions to create or modify resources in Knowledge Catalog. Requests are authenticated with end-user credentials.
- Each cataloged data asset is stored as a metadata record called an *entry*. With enriched metadata (table schemas, column descriptions, business glossary terms, pre-verified sample queries called golden queries) the agent uses golden queries to prevent join hallucinations on complex schemas.
- Knowledge Catalog itself is covered by the `gcp-knowledge-catalog` skill (formerly Dataplex Universal Catalog).
- The source also shows a diagram and Console steps.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-knowledge-catalog (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-bigquery.md](./connect-bigquery.md)
- [create-data-store.md](./create-data-store.md)
