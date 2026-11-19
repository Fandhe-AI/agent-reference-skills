---
source: https://docs.cloud.google.com/bigquery/docs/conversational-analytics
---

# Conversational analytics overview

Conversational analytics in BigQuery lets you chat, in the Google Cloud console, with data agents or data sources by using natural language. It runs SQL or Graph Query Language (GQL) queries and returns natural language summaries, tabular results and generated charts. It is powered by Gemini for Google Cloud.

## Signature / Usage

### Identify and analyze agent-generated jobs

Jobs run by conversational analytics carry labels. Count them with `INFORMATION_SCHEMA.JOBS` (replace `PROJECT_ID` and `REGION`, for example `us` or `eu`):

```sql
SELECT
  COUNT(*) AS job_count
FROM
  `PROJECT_ID`.`region-REGION`.INFORMATION_SCHEMA.JOBS
WHERE
  EXISTS (
    SELECT 1
    FROM UNNEST(labels) AS label
    WHERE label.key = 'ca-bq-job' AND label.value = 'true'
  );
```

### Concepts

- **Data agents**: one or more knowledge sources (tables, views, graphs, UDFs; borderless Lakehouse tables) plus custom table and field metadata, instructions (synonyms, business terms, default filters and grouping), verified queries (previously known as golden queries; they support the AI and ML functions below and query parameters) and glossary terms (BigQuery custom glossary or imported Knowledge Catalog business glossary). Managed in the **Agent Catalog** tab.
- **Conversations**: persisted chats with a data agent or with data sources (tables, views, datasets, projects, graphs). Direct conversations have no agent context and can be less accurate.
- **Graph support**: GQL or the `GRAPH_EXPAND` table-valued function in SQL.

## Options / Props

### Job labels

| Label | Meaning |
|---|---|
| `ca-bq-job: true` | The job was run using conversational analytics |
| `data-agent-id: DATA_AGENT_ID` | The job was run by a data agent (ID segment of the agent resource name) |
| `conversation-id: CONVERSATION_ID` | The job is associated with a conversation (ID segment of the conversation resource name) |

### Supported AI and ML functions

| Category | Functions |
|---|---|
| Time series analysis | `AI.FORECAST`, `AI.DETECT_ANOMALIES`, `AI.CAUSAL_EFFECT`, `ML.TREND`, `ML.SEASONALITY`, `ML.DETECT_CHANGE_POINTS` |
| Statistical analysis and data profiling | `AI.KEY_DRIVERS`, `ML.CORRELATION`, `ML.DESCRIBE_DATA` |
| Predictive modeling | `AI.PREDICT` |
| Semantic search | `AI.SIMILARITY`, `AI.SEARCH` |
| Generative AI | `AI.GENERATE`, `AI.IF`, `AI.SCORE`, `AI.CLASSIFY`, `AI.AGG` |

### Locations

| Location |
|---|
| US MREP |
| EU MREP |
| `asia-northeast1` (Tokyo) |
| `northamerica-northeast1` (Montréal) |
| `northamerica-northeast2` (Toronto) |
| `us-east4` (Northern Virginia) |
| Global |

### Limits

| Item | Value |
|---|---|
| Knowledge sources per agent | At most 100 |
| Label limit on a job resource | 64 (system labels count toward it) |

## Notes

- Security: it can only access data you have permission to access, respects VPC-SC, can't perform write operations or run DML queries, can't execute remote functions, only accesses knowledge sources you select, and conversation history is only shared with you. Creating an agent requires query access to every knowledge source you add. Access uses the Conversational Analytics API IAM roles.
- Generative AI queries need the permissions described in "Permissions for AI functions" for end-user credentials. `AI.SEARCH` is used only on tables with autonomous embedding generation enabled; otherwise `AI.SIMILARITY` (real-time embedding generation) is used.
- Graph queries: GQL requires a BigQuery Enterprise or Enterprise Plus edition reservation; in projects with on-demand pricing, GQL queries fail with an error. `GRAPH_EXPAND` queries can run on-demand but the function doesn't support all graph types. Market basket analysis is supported through built-in SQL templates.
- Location defaults: all sources in one supported region uses that region; all in the US uses US MREP; all in the EU uses EU MREP; otherwise global. You can choose another location when you create an agent but can't change it after saving. Agents created prior to June 4, 2026 are in the global location.
- Prompt analytics (anonymized prompt data, not used to train foundational models) is enabled by default. To opt out before November 23, 2026 submit the opt-out form with project IDs; on or after November 23, 2026 apply the custom hierarchical Organization Policy constraint `constraints/gcp.disablePromptAnalytics`. Re-enable it in the console administrator settings after removing the constraint.
- Pricing: queries are charged at BigQuery compute pricing; see agent pricing. Dynamic Shared Quota can return temporary `429 Resource Exhausted` errors; retry after a short delay.
- Best practices: clean data first; join related tables in a view; run profile scans; scope agents (consider more agents if one needs more than 20 data sources, spans teams with different metric definitions, or favors one result type); context priority is verified queries, then glossaries, then agent instructions; add table and column descriptions; don't duplicate glossary definitions in Knowledge Catalog and the BigQuery custom glossary; set project, user and query-level spending limits.
- The source also shows Console steps for viewing job labels. The model-backed functions here run on Vertex AI (Agent Platform) models; the Gemini Developer API is in `google-gemini-api`. Data Studio and the Conversational Analytics API can access agents created in BigQuery.
- Source: https://docs.cloud.google.com/bigquery/docs/conversational-analytics (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [conversational-analytics-api-overview.md](./conversational-analytics-api-overview.md)
- [conversational-analytics-api-key-concepts.md](./conversational-analytics-api-key-concepts.md)
- [gemini-overview.md](./gemini-overview.md)
