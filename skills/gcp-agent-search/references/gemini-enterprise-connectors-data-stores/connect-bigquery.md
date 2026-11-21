---
source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-bigquery
---

# Connect to BigQuery

Creates a Gemini Enterprise (formerly Agentspace) data store that connects to BigQuery data, so that the agents of an app can analyze the data. Two connector modes: federated query (recommended, Preview) and data ingestion. The source describes Console steps only.

## Signature / Usage

### Connector modes

- **Federated query (recommended)** (Preview): connect to BigQuery data in place without incurring egress costs for copying and moving the data. Federated query sends your query directly to BigQuery across all datasets and tables that your identity has IAM permission to access, which is more efficient for analytical queries. Because queries run using your credentials, BigQuery IAM permissions, including row-level security, remain intact. In this mode Knowledge Catalog is automatically enabled on the **Assistant** tab of the app to give the agent tools to search for data that the user has access to and look up context. This mode uses the BigQuery MCP server.
- **Data ingestion**: copy data from a specific BigQuery table to the Gemini Enterprise data store. Data must be refreshed to reflect changes in the BigQuery table. This mode incurs egress costs for moving data to a new location, and existing IAM permissions aren't replicated into the data store.

### A query run through the federated BigQuery connector

Snippet taken from https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-knowledge-catalog: in its example workflow, after looking up table metadata in Knowledge Catalog, the agent formulates and executes a read-only SQL query through the federated BigQuery connector:

Adapted (not in the official docs): `ORDER_DATE_COLUMN` is a placeholder for the order-date column (a `DATE`) of your table; the source query has no date filter, so it counted orders of all periods.

```sql
-- Execute BigQuery read-only SQL
SELECT COUNT(order_id) FROM `my-project.ecomm.orders`
WHERE product_id IN (
  SELECT id FROM `my-project.ecomm.products`
  WHERE category IN ('Sweaters', 'Coats & Jackets')
)
AND ORDER_DATE_COLUMN >= DATE_TRUNC(CURRENT_DATE(), MONTH);
```

### Before you begin

- Admin role to create the data store: Gemini Enterprise Admin (`roles/discoveryengine.agentspaceAdmin`) or Discovery Engine Admin (`roles/discoveryengine.admin`).
- If the project is protected by a VPC Service Controls perimeter or has organization policy enforcement enabled, add `bigquery_mcp` to the `allowedDataSources` parameter in the `discoveryengine.managed.allowedDataSources` managed constraint (**Restrict allowed data sources for data connectors**).
- Federated query: the required IAM permissions depend on which BigQuery MCP tools (actions) you use. The most commonly applied roles for users who query or perform actions through the connector are BigQuery Job User (`roles/bigquery.jobUser`) on the project where the query executes (compute or billing project), and BigQuery Data Viewer (`roles/bigquery.dataViewer`) on the project where the data is stored (storage project), to access data in a query or through BigQuery metadata tools such as `get_table_info`. If write actions are enabled, grant BigQuery Data Editor (`roles/bigquery.dataEditor`) instead.
- Data ingestion from a source project that's different from the project that contains the data store: grant BigQuery Job User (`roles/bigquery.jobUser`) and BigQuery Data Editor (`roles/bigquery.dataEditor`) on the source BigQuery project to `service-PROJECT_NUMBER@gcp-sa-discoveryengine.iam.gserviceaccount.com` (where `PROJECT_NUMBER` is the project number of the project that contains the data store).

### Create a BigQuery data store (Console)

On the **Data stores** page, click **Create data store**, select BigQuery (search for "BigQuery" or find it under **First-party data sources**) and click **Add data source**. On the **Data** page select the connector mode:

- Federated query: select **Federated query (recommended)**; optionally, under **Advanced options**, enter the **Billing Project ID** for query execution (if empty, queries prompt the user for a billing project or rely on custom instructions); click **Continue**; on the **Actions** page select the BigQuery actions to enable (editable later).
- Data ingestion: select **Data ingestion**; for structured data choose **BigQuery table with your own schema** (auto-detected during import) or **BigQuery table with metadata** (you must define a Google-specified schema during import), or an option under **Specialized Data Import**; under **Synchronization frequency** choose **One time** or **Periodic** (cannot be changed after the data store is created); select the table in the **BigQuery path** field; click **Continue**.

On the **Configuration** page:

- **Location of your data connector**: the region where the metadata of the data store is stored; cannot be changed after the data store is created.
- **Data connector name**: cannot be changed after the data connector is created; entering a name generates a unique ID. **Tag (optional)**: a stable identifier for the connector across all versions.
- **Sensitive data protection policy**: format `projects/{project}/locations/{location}/contentPolicies/{policy}`; can be edited later.

Click **Create**.

## Notes

- Federated query is Preview: subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms; Pre-GA products and features are available "as is" and might have limited support.
- Discovery Engine Admin (`roles/discoveryengine.admin`) "Grants full access to all discoveryengine resources" (IAM role description), well beyond creating this data store; the source lists it as an alternative to Gemini Enterprise Admin.
- Users aren't required to have the MCP Tool User (`roles/mcp.toolUser`) role, even if the connector is configured to use actions that require that role.
- Caution: when ingesting from BigQuery, BigQuery permissions aren't imported with the data. After import, any user with sufficient Gemini Enterprise permissions can view the data, even without permission to view it in BigQuery.
- Ingestion status: on the data store's **Data** page, the **Activity** tab status changes from **In progress** to **Import completed**; ingestion can take several minutes to several hours.
- Pricing: in federated query mode, queries incur BigQuery compute costs when users run queries through the attached app; in data ingestion mode, importing data incurs BigQuery and Gemini Enterprise indexing costs even before the data store is attached to an app. See Gemini Enterprise pricing.
- The source shows only Console steps (no REST, gcloud or client code); the SQL block above comes from the Knowledge Catalog page, which describes the same federated connector.
- Snippet taken from https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-knowledge-catalog
- Corrected from the official docs: the question asks for "this month", but the source query has no date filter; the source names no date column of `my-project.ecomm.orders`, so the filter uses the placeholder `ORDER_DATE_COLUMN`.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-bigquery (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-knowledge-catalog.md](./connect-knowledge-catalog.md)
- [prepare-data.md](./prepare-data.md)
- [create-data-store.md](./create-data-store.md)
