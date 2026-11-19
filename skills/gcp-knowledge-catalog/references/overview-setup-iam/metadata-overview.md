---
source: https://docs.cloud.google.com/knowledge-catalog/docs/metadata-overview
---

# About metadata (Knowledge Catalog metamodel)

Knowledge Catalog organizes metadata through a modular hierarchy of containers, assets, schemas and relationships: entry groups organize entries; aspect types define schemas for aspects; entry types enforce required aspects; entry link types define the relationships (entry links) between entries and business terms.

## Signature / Usage

### Create a custom entry group

```bash
gcloud dataplex entry-groups create test-entry-group \
    --location=us-central1 --project=test-project \
    --description='test description' \
    --display-name='test display name'
```

### Metamodel elements

| Element | System-managed (built-in) | User-defined (custom) |
|---|---|---|
| Entry groups | Predefined per project for Google Cloud services (for example `@bigquery`, `@spanner`, `@pubsub`). | Created by users to group custom data assets and permissions. |
| Entries | Populated automatically from Google Cloud sources (BigQuery tables, views, datasets, models). | Created by users for bespoke sources, files, or third-party databases. |
| Aspect types | Predefined templates (`Schema`, `Overview`, `Contacts`, `DataQuality`, `Lineage`). | Created by users (for example PII classification, SLA tiers). |
| Aspects | Populated from source systems, query logs, or automated scans. | Created by users, pipelines, or agents; attached to entries, columns, or entry links. |
| Entry types | Predefined templates for Google Cloud resource types. | Define mandatory and optional aspects for custom assets. |
| Entry links | Built-in types (`synonym`, `definition`, `schema-join`, `related`). | Instances created between specific entries or columns. |

### Concepts

- Entry group (`EntryGroup`): regional container for entries and entry links; the administrative and security boundary (IAM, location and project attribution). System entry groups are created per project automatically; custom ones are created by you.
- Entry (`Entry`): one data asset. Has an entry identifier, an entry type, aspects, and schema paths (columns). Columns are populated when an aspect of type `schema` is attached; nested fields use dot notation (for example `customer.address.postal_code`).
- Aspect type (`AspectType`): reusable schema template; every aspect is an instance of one. System-defined or custom; custom ones define a `metadata_template`.
- Aspect (`Aspect`): fields conforming to an aspect type, attached to an entry, an entry path (column), or an entry link. Aspects are encapsulated within their parent entry or entry link, so reads and writes are atomic.
- Entry type (`EntryType`): governance template; on entry creation Knowledge Catalog validates that all aspect types marked `required` are present and valid.
- Entry link (`EntryLink`) / entry link type (`EntryLinkType`): relationship between two entries or columns. Symmetric (non-directional): `synonym`, `related`, `schema-join`. Asymmetric (directional): `definition` (glossary term to a column). Aspects can be attached to entry links except `schema-join` links.
- Business glossary: glossaries, categories and business terms; `definition` or `synonym` entry links map terms to entries and column paths.

## Options / Props

### Field data types for a custom aspect type `metadata_template`

| Field data type | Description | Example use case |
|---|---|---|
| `string` | Text value (UTF-8). | Owner email, data classification label, department name. |
| `integer` / `number` | Numeric values (integers or floating-point numbers). | Data retention days, SLA target percentage, priority rank. |
| `boolean` | True or false flag. | `contains_pii: true`, `is_certified: false`. |
| `enum` | A predefined list of allowed string values. | Environment: `["DEV", "STAGING", "PROD"]`. |
| `datetime` / `timestamp` | ISO 8601 formatted date and time. | Last certified date, compliance review deadline. |
| `record` | A nested structured object containing child fields. | `ContactInfo { name: string, email: string, phone: string }`. |
| `array` | A list of repeated values of any primitive or record type. | List of secondary data owners. |
| `map` | Key-value string pairs for extensible attributes. | Custom deployment tags: `{"cost_center": "1042", "tier": "gold"}`. |

### Project and location constraints

| Resource | Location rule | Project rule |
|---|---|---|
| Entries | The entry's location must match the location of its `EntryType`, or the `EntryType` must be `global`. | Can reference global or same-project entry types. |
| Aspects on entries | The `AspectType` must be stored in the same location as the entry, or be `global`. | Can reference global or same-project aspect types. |
| Entry links | The entry link's location must match its `EntryLinkType`, or the `EntryLinkType` must be `global`. | Can link entries across different projects within the same organization. |
| Entry types | Composed of aspect types in the same location as the entry type, or `global` aspect types. | If an entry type references custom aspect types, they must be in the same project and location. |

### Supported Google Cloud sources (automatic ingestion)

| Area | Sources |
|---|---|
| Analytics and lakehouse | BigQuery datasets, tables, views, models, routines, connections, linked datasets, graphs; BigQuery sharing (formerly Analytics Hub) exchanges and listings; Dataform repositories and code assets; Dataproc Metastore services, databases, tables; Iceberg REST Catalog tables (Google Cloud Lakehouse runtime catalog IRC, Databricks Unity IRC, AWS Glue Data Catalog IRC, Snowflake Horizon IRC); Apache Hive tables; SAP Business Data Cloud (BDC) Delta Lake tables; Apache Iceberg tables managed by the Lakehouse runtime catalog. |
| AI and machine learning | Vertex AI models, datasets, feature groups, feature views, online store instances; Gemini Data Analytics (GDA) agents. |
| Business intelligence | Looker (Google Cloud core) instances, dashboards, dashboard elements, Looks, LookML dashboards, LookML dashboard elements, LookML projects, models, Explores, views, agents. |
| Databases | Bigtable instances, clusters, tables (including column family details); Spanner instances, databases, tables, views. |
| Streaming and messaging | Pub/Sub topics; Datastream streams, connections, private connectivity. |
| Unstructured data | Automatic discovery of Cloud Storage data. |
| Operational databases | AlloyDB for PostgreSQL clusters, instances, databases, schemas, tables, views (metadata only from primary instances, not read replicas); Cloud SQL instances, databases, schemas, tables, views (primary instances only). |

### Pricing

| Item | Charge |
|---|---|
| Stored metadata volume | Charged under the metadata storage SKU (see https://cloud.google.com/products/knowledge-catalog/pricing). |
| Creating and managing metamodel resources (entry types, aspect types, entry groups, entries, entry links) | No charge. |
| Search API calls and search queries in the Google Cloud console | No charge. |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/metadata-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entry-groups/create (gcloud 593.0.0 help); the page itself has no fenced code.
- Knowledge Catalog was formerly Dataplex Universal Catalog; API, gcloud and IAM names stay `dataplex`.
- Metadata change feeds publish entry creation, update and deletion notifications to a Pub/Sub topic you configure (the Pub/Sub topic itself is covered by `gcp-messaging-workflows`).
- BigQuery tables are covered by `gcp-bigquery`; Knowledge Catalog catalogs them.
- Third-party sources are imported with Knowledge Catalog connectors or a managed connectivity pipeline.

## Related

- [introduction.md](./introduction.md)
- [about-context.md](./about-context.md)
- [fully-qualified-names.md](./fully-qualified-names.md)
