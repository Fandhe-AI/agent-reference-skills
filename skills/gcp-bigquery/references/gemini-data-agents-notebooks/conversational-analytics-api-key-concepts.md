---
source: https://docs.cloud.google.com/gemini/data-agents/conversational-analytics-api/key-concepts
---

# Conversational Analytics API key concepts

Key concepts for the Conversational Analytics API (`geminidataanalytics.googleapis.com` or regional endpoints): agent architecture, creator and consumer workflows, conversation modes, IAM roles and multi-agent systems.

## Signature / Usage

### How a data agent processes a question

1. **Input**: the question in natural language plus any context you provided earlier.
2. **Data sources**: Looker, BigQuery (tables or a graph), Data Studio, or database sources (AlloyDB, GoogleSQL for Spanner, Cloud SQL for MySQL, Cloud SQL for PostgreSQL in Preview in `v1beta`).
3. **Reasoning engine**: uses the available tools (SQL, Python, charts) in a reasoning loop.
4. **Output**: a stream of messages (text, data, charts) that may include citations linking response text to context sources such as glossary terms or example queries.

### Workflows

- Agent creator: create the agent with system instructions and data source connections, then share it and set role-based access.
- Agent consumer: find a shared agent, ask a question (single query or multi-turn), the agent reasons, and the agent responds.

### Multi-agent systems

A primary orchestrator agent delegates to specialized agents (for example sales or marketing). The API supports the open Agent-to-Agent (A2A) protocol for discovering capabilities, delegating queries and streaming SQL and chart artifacts.

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

### Conversation modes

| Mode | Behavior |
|---|---|
| Stateless | The agent doesn't store conversation history; each interaction is independent |
| Stateful | The agent retains context and history; recommended for better accuracy and personalized responses |

### IAM roles

| Role | Typical scope | What it enables |
|---|---|---|
| Gemini Data Analytics Data Agent Creator (`roles/geminidataanalytics.dataAgentCreator`) | Project | Create agents and inherit owner permissions on the agent |
| Gemini Data Analytics Data Agent Owner (`roles/geminidataanalytics.dataAgentOwner`) | Project, Agent | Edit, share or delete agents |
| Gemini Data Analytics Data Agent Editor (`roles/geminidataanalytics.dataAgentEditor`) | Agent, Project | Update an agent's configuration or context |
| Gemini Data Analytics Data Agent User (`roles/geminidataanalytics.dataAgentUser`) | Agent, Project | Chat with an agent |
| Gemini Data Analytics Data Agent Viewer (`roles/geminidataanalytics.dataAgentViewer`) | Project, Agent | List agents and get their details; can't edit |
| Gemini Data Analytics Data Query User (`roles/geminidataanalytics.queryDataUser`) | Project | Query supported database sources with the `QueryData` method |
| Gemini Data Analytics Stateless Chat User (`roles/geminidataanalytics.dataAgentStatelessUser`) | Project | Chat with an agent without storage of context or conversation history |

## Notes

- Snippet taken from https://docs.cloud.google.com/bigquery/docs/conversational-analytics (the `INFORMATION_SCHEMA.JOBS` query that counts jobs run by conversational analytics; replace `PROJECT_ID` and `REGION`). The source itself has no code block.
- Database sources are in Preview in `v1beta`.
- The source also links integration patterns and state management pages, which are not included in this scope.
- Source: https://docs.cloud.google.com/gemini/data-agents/conversational-analytics-api/key-concepts (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [conversational-analytics-api-overview.md](./conversational-analytics-api-overview.md)
- [conversational-analytics.md](./conversational-analytics.md)
