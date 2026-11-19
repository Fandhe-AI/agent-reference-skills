---
source: https://docs.cloud.google.com/knowledge-catalog/docs/create-enrichment-tasks
---

# Create Enrichment Tasks

Preview. Knowledge Studio enrichment tasks extract business context from schemas, SOPs, code repositories and query logs. The task is created in the Google Cloud console wizard (Define, Scope, Improve, Run panes) with target resources, knowledge signals, evaluation benchmarks and a schedule. The source has no gcloud or REST form.

## Signature / Usage

### Define pane: Goal

The **Goal** field takes natural-language guidance on the business mission and AI capability goals for the context set. Example from the source:

```text
Curate and maintain the authoritative context set for the
`subscription_revenue` domain. Focus on resolving metric discrepancies
between `gross_sales`, `net_billed_revenue`, and `discount_applied`.
Ensure all customer join keys (e.g. `customer_id`, `subscription_fk`)
have explicit column documentation, and establish parameterized query
templates for Monthly Recurring Revenue (MRR) and Churn Rate calculations.
```

### Wizard flow

1. Console: **Knowledge Studio** page, **Enrichments**, **+ Create enrichment task**.
2. **Define**: Display name, Task ID (unique or auto-generated), Goal.
3. **Scope**: Project, Context set, Enrichment task region (multi-region or `global` context sets only), Resources to enrich, optional Knowledge signals.
4. **Improve** (optional): Evaluation set, Curation set, Publishing (auto-publish), Self-learning.
5. **Run**: Run as (execution service account), Trigger, Notifications; verify the Summary and click **Create**.

## Options / Props

### Required roles (three identities)

| Identity | Role | Resource | Purpose |
|---|---|---|---|
| End user | `roles/dataplex.dataScanEditor` or `roles/dataplex.editor` | Project | Create, modify and run enrichment tasks |
| End user | `roles/iam.serviceAccountUser` | Execution service account | Attach the execution service account |
| Execution service account | `roles/serviceusage.serviceUsageConsumer` | Project containing the task | Consume APIs during execution |
| Execution service account | `roles/bigquery.dataViewer` | Target BigQuery datasets and tables | View target data |
| Execution service account | `roles/biglake.viewer` | Target Lakehouse catalogs, namespaces, tables | View Lakehouse assets (when enriching them) |
| Execution service account | `roles/dataplex.contentEditor` | Target context set | Write metadata into context sets |
| Execution service account | `roles/dataplex.catalogEditor` | Project | Write metadata into context sets |
| Execution service account | `roles/dataplex.catalogViewer` | Project | Write metadata into context sets |
| Execution service account (optional) | `roles/bigquery.jobUser` | Task project | Only if job creation is moved inside a VPC Service Controls perimeter |
| Execution service account (optional) | `roles/dataplex.workflowApprover` | Project | Auto-publish |
| Execution service account (optional) | `roles/logging.privateLogViewer` | Project that owns the Gemini Enterprise app | Self-learning from Logging trace logs |
| Execution service account (optional) | `roles/bigquery.dataViewer` and `roles/bigquery.jobUser` | Agent analytics table (or dataset) / project containing it | Self-learning from a BigQuery agent analytics table |
| Knowledge Catalog Service Agent | `roles/iam.serviceAccountTokenCreator` | Execution service account | Impersonate it to run the task |
| Knowledge Catalog Service Agent | `roles/bigquery.dataViewer` | Projects or datasets with the target tables | Backend profiling and validation queries |
| Knowledge Catalog Service Agent (recommended) | `roles/bigquery.resourceViewer` | Projects where queries run | Query-history analysis; if not granted, the agent skips it without failing the run |

### Permissions

| Identity | Permissions |
|---|---|
| End user | `dataplex.agentTasks.create`, `dataplex.agentTasks.get`, `dataplex.agentTasks.getData`, `dataplex.agentTasks.list`, `dataplex.agentTasks.update`, `dataplex.agentTasks.delete`, `dataplex.agentTasks.run`, `iam.serviceAccounts.actAs` |
| Execution service account | `serviceusage.services.use`; `bigquery.datasets.get`, `bigquery.tables.get`, `bigquery.tables.getData`; `biglake.catalogs.get`, `biglake.namespaces.get`, `biglake.tables.get`, `biglake.tables.list`; `dataplex.entryGroups.getContextSet`, `dataplex.entryGroups.requestContextChanges`, `dataplex.entries.createContext`, `dataplex.entries.updateContext`, `dataplex.entries.getContext`, `dataplex.entries.listContext`, `dataplex.entryLinks.create`; `dataplex.entries.create`, `dataplex.entries.update`, `dataplex.entries.get`, `dataplex.entries.list`, `dataplex.entryGroups.create`, `dataplex.entryGroups.update`, `dataplex.entryGroups.requestChanges`; optional `bigquery.jobs.create`, `dataplex.changeRequests.use`, `logging.views.access`, `logging.logEntries.list` |
| Knowledge Catalog Service Agent | `iam.serviceAccounts.getAccessToken`, `iam.serviceAccounts.getOpenIdToken`, `iam.serviceAccounts.signJwt`, `iam.serviceAccounts.signBlob`; `bigquery.datasets.get`, `bigquery.tables.get`, `bigquery.tables.getData`; recommended `bigquery.jobs.listAll`, `resourcemanager.projects.get` |

### Scope pane settings

| Setting | Behavior |
|---|---|
| Context set | One task per context set per region; a context set already attached to a task is rejected with a link to the existing task. The context set can't be changed after creation. |
| Enrichment task region | Required for multi-region (such as `us`, `eu`) or `global` context sets; single-region context sets use their own region. |
| Resources to enrich | Up to 500 total resources across default and added resources. Added resources must match the context set location (a multi-region context set such as `us` matches single regions like `us-central1`; `global` accepts any region); mismatches fail task creation. An empty context set with no added resources builds a semantic knowledge base but enriches no tables. |
| BigQuery table full name | `//bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID` |
| Lakehouse asset full name | `//dataplex.googleapis.com/projects/PROJECT_ID/locations/LOCATION/lakes/LAKE_ID/zones/ZONE_ID/assets/ASSET_ID` |
| Cloud Storage knowledge signals | Bucket name, folder path ending with a slash (such as `bucket-name/folder/`) or file path; up to 1,000 Cloud Storage sources |
| Auth provider format | `projects/PROJECT_ID/locations/LOCATION/authProviders/PROVIDER_NAME` (URI patterns accept `*` wildcards, for example `https://github.com/test-org/*`); Google Workspace uses the execution service account's IAM permissions and needs no auth provider |

### Improve and Run pane settings

| Setting | Default / limit |
|---|---|
| Evaluation set / Curation set | Cloud Storage URI of a `.jsonl` file |
| Auto-publish above (confidence slider) | Default 85% |
| Maximum quality drop (needs an evaluation dataset) | Default 5% |
| Self-learning sources | Multiple Gemini Enterprise apps and BigQuery agent analytics tables; Gemini 3.8 Flash or later recommended |
| Trigger | On demand, or Scheduled (daily, weekly, monthly; all times UTC) |
| Notifications | Up to five email addresses, report after every run |
| Run duration | Typically 20 to 60 minutes, up to several hours for large datasets with curation and evaluation sets; execution logs can take 20 to 30 minutes to appear |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support.
- Grant the roles to the execution service account and the Knowledge Catalog Service Agent, not to your user account. The Service Agent email format is `service-PROJECT_NUMBER@gcp-sa-dataplex.iam.gserviceaccount.com`.
- When you select a service account, Policy Troubleshooter runs automatically; **Grant all** grants missing roles if you can modify IAM on those resources. **Grant access to BigQuery query history** grants `roles/bigquery.resourceViewer` (`bigquery.jobs.listAll`).
- Recommended before running: enable data profiling and AI data insights on frequently used target tables.
- With auto-publish on, deletion proposals are still held for manual review. Third-party connector setup is in Configure external connectors for enrichment tasks.
- The source shows only the Console wizard and this one Goal example; there is no gcloud, REST or client-library form.
- The BigQuery tables enriched are covered by `gcp-bigquery`; Knowledge Catalog (formerly Dataplex Universal Catalog, API / gcloud / IAM names stay `dataplex`) catalogs them. Lakehouse is the former BigLake.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/create-enrichment-tasks (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-enrichment-tasks.md](./about-enrichment-tasks.md)
- [context-sets.md](./context-sets.md)
