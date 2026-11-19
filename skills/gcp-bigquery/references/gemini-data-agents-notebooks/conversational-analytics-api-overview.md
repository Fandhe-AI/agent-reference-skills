---
source: https://docs.cloud.google.com/gemini/data-agents/conversational-analytics-api/overview
---

# Conversational Analytics API overview

The Conversational Analytics API (`geminidataanalytics.googleapis.com` or regional endpoints) lets developers build an AI-powered chat interface, or data agent, that answers natural language questions about structured data in BigQuery, Looker and Data Studio, and about database sources (AlloyDB, GoogleSQL for Spanner, Cloud SQL for MySQL, Cloud SQL for PostgreSQL) in Preview in `v1beta`. Besides multi-turn chat, the `QueryData` method runs single-turn queries.

## Signature / Usage

### Setup and build path

1. Enable the API, set up IAM access control, authenticate and connect a data source (BigQuery, Lakehouse, Looker, Data Studio, databases), optionally configure CMEK and organization policy constraints.
2. Build a data agent over HTTP or with the Python SDK, optionally orchestrate agents over A2A, guide behavior with authored context, render chart specifications (not supported for database sources), and configure conversation logging into a BigQuery table.

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

## Options / Props

### Key API operations

Replace the wildcards (`*`) with the project ID, location identifier (such as `global` or `us`) and resource ID. `v1` supports BigQuery, Looker and Data Studio; database sources are in Preview in `v1beta`, so use the `/v1beta/` paths for them.

| Operation | Method | Endpoint |
|---|---|---|
| Create an agent | `POST` | `/v1/projects/*/locations/*/dataAgents` |
| Create an agent synchronously | `POST` | `/v1/projects/*/locations/*/dataAgents:createSync` |
| Get an agent | `GET` | `/v1/projects/*/locations/*/dataAgents/*` |
| Get IAM policy | `POST` | `/v1/projects/*/locations/*/dataAgents/*:getIamPolicy` |
| Set IAM policy | `POST` | `/v1/projects/*/locations/*/dataAgents/*:setIamPolicy` |
| Update an agent | `PATCH` | `/v1/projects/*/locations/*/dataAgents/*` |
| Update an agent synchronously | `PATCH` | `/v1/projects/*/locations/*/dataAgents/*:updateSync` |
| List agents | `GET` | `/v1/projects/*/locations/*/dataAgents` |
| List accessible agents | `GET` | `/v1/projects/*/locations/*/dataAgents:listaccessible` |
| Delete an agent | `DELETE` | `/v1/projects/*/locations/*/dataAgents/*` |
| Delete an agent synchronously | `DELETE` | `/v1/projects/*/locations/*/dataAgents/*:deleteSync` |
| Create a conversation | `POST` | `/v1/projects/*/locations/*/conversations` |
| Chat (conversation reference, stateful) | `POST` | `/v1/projects/*/locations/*:chat` |
| Chat (data agent reference, stateless) | `POST` | `/v1/projects/*/locations/*:chat` |
| Chat (inline context, stateless) | `POST` | `/v1/projects/*/locations/*:chat` |
| Get a conversation | `GET` | `/v1/projects/*/locations/*/conversations/*` |
| List conversations | `GET` | `/v1/projects/*/locations/*/conversations` |
| List messages in a conversation | `GET` | `/v1/projects/*/locations/*/conversations/*/messages` |
| Delete a conversation | `DELETE` | `/v1/projects/*/locations/*/conversations/*` |
| Query data (databases, Preview) | `POST` | `/v1beta/projects/*/locations/*/conversations:queryData` |
| Get agent card (A2A) | `GET` | `/v1/a2a/projects/*/locations/*/agents/*/v1/card` |
| Send message (A2A) | `POST` | `/v1/a2a/projects/*/locations/*/agents/*/v1/message:send` |
| Send streaming message (A2A) | `POST` | `/v1/a2a/projects/*/locations/*/agents/*/v1/message:stream` |

### `creator_filter` values for list accessible agents

| Value | Returns |
|---|---|
| `NONE` (default) | All data agents accessible to the user, regardless of creator |
| `CREATOR_ONLY` | Accessible agents created by that user |
| `NOT_CREATOR_ONLY` | Accessible agents created by others |

## Notes

- The Data QnA API is deprecated; see the migration guide for key differences and required migration steps.
- The location in the request path must match the endpoint's location (for example `geminidataanalytics.us.rep.googleapis.com` with `/locations/us`).
- Getting or setting the IAM policy requires a Data Agent Owner role. Deleting a conversation requires the Topic Admin role or at least the `cloudaicompanion.topics.delete` permission.
- Stateful chat: Google Cloud stores and manages the conversation history. Stateless chat: your application must manage and provide the conversation history with each request.
- Support covers technical issues with the API service; general and custom code debugging are out of scope.
- Best-practice guides listed by the source: manage BigQuery costs (project, user and query-level spending limits), ask effective questions, data retention and deletion, quotas and limits, troubleshooting, known limitations, rendering Looker responses.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/conversational-analytics (the `INFORMATION_SCHEMA.JOBS` query that counts jobs run by conversational analytics; replace `PROJECT_ID` and `REGION`). The source itself has no code block.
- The API is Gemini Data Analytics (Gemini for Google Cloud), not the Gemini Developer API in `google-gemini-api`. AlloyDB, Spanner and Cloud SQL as database sources are covered in `gcp-databases-relational`.
- Source: https://docs.cloud.google.com/gemini/data-agents/conversational-analytics-api/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [conversational-analytics-api-key-concepts.md](./conversational-analytics-api-key-concepts.md)
- [conversational-analytics.md](./conversational-analytics.md)
