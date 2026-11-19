---
source: https://docs.cloud.google.com/bigquery/docs/introduction
---

# BigQuery overview

BigQuery is a fully managed, AI-ready data platform with a serverless architecture. You use SQL and Python to manage and analyze data with no infrastructure to provision. A storage layer (ingestion, storage, optimization) and a compute layer (analytics) run independently of each other over Google's petabit-scale network.

## Signature / Usage

### Query metadata with INFORMATION_SCHEMA

```sql
-- Returns metadata for tables in a single dataset.
SELECT * FROM myDataset.INFORMATION_SCHEMA.TABLES;
```

## Options / Props

### Key use cases

| Use case | Description |
|---|---|
| AI-assisted workflows | Generative AI, vector search, and Gemini assistive features |
| Machine learning and predictive analytics | Build, train, and deploy models with SQL or Python |
| Business intelligence and ad hoc analysis | Query terabytes in seconds and petabytes in minutes |
| Geospatial analysis | Location-based data with geographic information systems (GIS) |
| Data governance and semantic search | Built-in features powered by Knowledge Catalog |
| Continuous data ingestion | Streaming of structured and unstructured data; open table formats such as Apache Iceberg, Delta, and Apache Hudi |

### Interfaces

| Interface | Notes |
|---|---|
| Google Cloud console, BigQuery Studio | Python notebooks and version control for notebooks and saved queries |
| `bq` command-line tool | See the bq command-line tool reference |
| Client libraries | Python, Java, JavaScript, Go (code samples also for C#, Node.js, Ruby) |
| REST API and RPC API | Transform and manage data |
| ODBC and JDBC drivers | Third-party tools and existing applications |

### Gemini in BigQuery features

| Feature | Stage noted in source |
|---|---|
| Data insights | Not marked |
| Conversational analytics (data agents; direct conversations with tables, views, graphs, Lakehouse tables) | Not marked |
| BigQuery data canvas | Not marked |
| SQL generation tool, explain a SQL query, Python code generation tool, Python code completion | Not marked |
| Gemini Cloud Assist SQL / Python generation, convert comments to SQL, complete a SQL query, generate BigQuery DataFrames Python code | Preview |
| Data preparation (AI-generated transformation recommendations) | Not marked |
| Data Engineering Agent (data pipelines from natural-language prompts) | Not marked |
| Translation rules for the interactive SQL translator | Preview |

## Notes

- BigQuery storage is columnar, supports ACID transaction semantics, and is automatically replicated across multiple locations for high availability.
- Analytics: ANSI-standard SQL (ISO/IEC 9075 support) with joins, nested and repeated fields, analytic and aggregation functions, multi-statement queries, and spatial functions; pandas-compatible Python API through BigQuery DataFrames; BI Engine with Data Studio, Looker, Google Sheets, Tableau, and Power BI; BigQuery ML; external tables and federated queries over Cloud Storage, Bigtable, Spanner, and Google Sheets in Google Drive.
- Administration: IAM, jobs (load, export, query, copy), and reservations that switch between on-demand and capacity-based pricing.
- A free usage tier and a no-cost BigQuery sandbox are available.
- Gemini in BigQuery is part of the Gemini for Google Cloud product suite. It calls Google-hosted models; the Gemini Developer API and the `google-genai` SDK are in the `google-gemini-api` skill.
- The Snippet above is taken from https://docs.cloud.google.com/bigquery/docs/information-schema-intro (borrowed because this page has no code block).
- Load paths named in the source: streaming through the Storage Write API (gRPC), and batch loads from local files or Cloud Storage in Avro, Parquet, ORC, CSV, JSON, Datastore, and Firestore formats.
- Source: https://docs.cloud.google.com/bigquery/docs/introduction (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [resource-hierarchy.md](./resource-hierarchy.md)
- [storage-overview.md](./storage-overview.md)
- [datasets-intro.md](./datasets-intro.md)
- [information-schema-intro.md](./information-schema-intro.md)
