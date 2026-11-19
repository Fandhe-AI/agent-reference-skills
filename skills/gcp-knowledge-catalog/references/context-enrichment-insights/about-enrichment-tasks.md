---
source: https://docs.cloud.google.com/knowledge-catalog/docs/about-enrichment-tasks
---

# About Enrichment Tasks

Preview. Knowledge Studio enrichment tasks automate metadata curation: an autonomous agent analyzes dataset schemas, query logs and enterprise documentation, then stages metadata proposals as change requests that populate a context set and ground downstream AI agents.

## Signature / Usage

### Example goal text for a task

The twin of the creation guide shows this natural-language Goal. Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/create-enrichment-tasks

```text
Curate and maintain the authoritative context set for the
`subscription_revenue` domain. Focus on resolving metric discrepancies
between `gross_sales`, `net_billed_revenue`, and `discount_applied`.
Ensure all customer join keys (e.g. `customer_id`, `subscription_fk`)
have explicit column documentation, and establish parameterized query
templates for Monthly Recurring Revenue (MRR) and Churn Rate calculations.
```

### Deployment lifecycle

1. Configure prerequisites (roles, service accounts, data profiling and AI data insights on frequently used tables).
2. Link external knowledge (Google Drive, external Git repositories).
3. Create the task (context set, target resources, knowledge signals, evaluation strategy).
4. Review the AI proposals (run diagnostics, descriptions, approve changes).

## Options / Props

### Core concepts

| Concept | Required | Description |
|---|---|---|
| Context set | Required | Bounded container of target data assets and metadata. Every task targets one context set; each context set can be enriched by only one task. Tasks don't overwrite descriptions on underlying BigQuery resources or create business glossary terms; they store descriptions, concepts and column-to-glossary links as overlay entries linked with `reference` entry links (`projects/dataplex-types/locations/global/entryLinkTypes/reference`). |
| Enrichment task | - | Configuration defining what the agent does: required context set and schedule, plus optional target assets, knowledge signals, evaluation sets, self-learning sources. |
| Enrichment job | - | Backend orchestration process within Knowledge Studio that executes a task. |
| Enrichment run | - | A single point-in-time execution; the console **Jobs** tab lists runs. |
| Knowledge signals | Optional | External reference materials (Cloud Storage files, glossaries, documentation URLs) that ground the agent. |
| Evaluation sets | Optional | Test questions and SQL in `.jsonl` format used to grade the agent's accuracy before publishing. |
| Self-learning sources | Optional | Gemini Enterprise app logs or BigQuery agent analytics used to find knowledge gaps. |

### Supported sources

| Kind | Sources |
|---|---|
| Data sources to enrich | BigQuery datasets and tables; Lakehouse catalogs, namespaces and tables. Third-party catalogs attached through Iceberg REST Catalog integrations (Databricks Unity, Snowflake Horizon, AWS Glue Data Catalog, SAP Business Data Cloud) are supported indirectly. |
| Knowledge signals (Google Cloud) | Cloud Storage buckets, folders or files (PDFs, CSVs, Markdown, configuration, datasets, unstructured text); Knowledge Catalog business glossaries in the same regional scope; Google Workspace (Google Drive Documents, Sheets, Slides, PDFs, files, text documents). |
| Knowledge signals (third party) | Microsoft SharePoint files under 5 MB (PDFs, Office files, text; excluding legacy formats or images); GitHub repositories (any readable text); Atlassian Confluence spaces and Jira projects. |
| Self-learning sources | Gemini Enterprise applications; BigQuery agent analytics tables. |

### Auto-publish conditions

The agent stages all proposals as change requests. A run with more than 250 metadata changes is split into chained batch change requests (Batch 1 of N, Batch 2 of N, and so on) approved in sequence. With auto-publishing enabled, the run is approved automatically only when all of the following hold:

| Condition | Value |
|---|---|
| Overall confidence score | At least 0.85 (85%) or your configured threshold |
| Validity checks | No proposal fails (for example, malformed SQL) |
| Evaluation set configured | Accuracy drops by no more than 5 percentage points (or your configured maximum quality drop) |

Deletion proposals are always staged in a separate Deletions change request for manual review, even with auto-publishing.

### Recommended configurations

| Configuration | Components | Auto-publish | Recommended for |
|---|---|---|---|
| Basic | Context set | Disabled | Testing; manually review all proposals. |
| Grounded | Context set, knowledge signals | Disabled | Production environments grounded in SOPs and glossaries. |
| Automated | Context set, knowledge signals, evaluation sets | Enabled | Scaling metadata operations; the evaluation set is the safety guardrail. |
| Self-learning | Context set, knowledge signals, evaluation sets, self-learning sources | Enabled | Advanced and autonomous catalogs. |

### Limits and Preview limitations

| Item | Value |
|---|---|
| Resources per task | Up to 500 total data resources (context set defaults plus added resources) |
| Tasks per context set | One |
| Compliance | No support for VPC Service Controls, CMEK, Data Residency (DRZ), Access Transparency (AXT), or Assured Workloads |
| Management interface | Google Cloud console only; direct public REST APIs and `gcloud` commands aren't available in Preview |
| Quotas | Per-project regional resource and rate quotas; see the Knowledge Studio enrichment tasks section of Quotas and limits |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support.
- Use one task and context set when up to 500 tables share a domain, steward team and refresh schedule; split into several context sets and tasks for distinct owners or approvers, different schedules or knowledge signals, or more than 500 target tables.
- If you enable Auto-publish, the source strongly recommends configuring an evaluation set; without it the agent might publish metadata that regresses downstream queries.
- Security: tasks run under a user-managed execution service account impersonated by the Dataplex Service Agent with short-lived credentials; customer traces, schemas and knowledge signals are never used to train Google's foundation models; PII is redacted from system logs and generation traces before proposals are written; the agent reaches private sources through a Private Service Connect interface and a customer-controlled egress proxy.
- Pricing: during Preview, running tasks and staging unapproved batch change requests are offered at no charge. Metadata storage charges begin when a change request is approved into the context set entry group (or auto-publish applies it). BigQuery query processing and Cloud Storage staging reads / writes in your project are charged when optional customer-managed resources are used.
- Knowledge Catalog (formerly Dataplex Universal Catalog) keeps the `dataplex` API, gcloud and IAM names; Lakehouse is the former BigLake. The BigQuery tables being enriched are covered by `gcp-bigquery`; Knowledge Catalog catalogs them.
- The source has no code of its own; the Goal text above is borrowed as stated.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/about-enrichment-tasks (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/create-enrichment-tasks

## Related

- [create-enrichment-tasks.md](./create-enrichment-tasks.md)
- [context-sets.md](./context-sets.md)
