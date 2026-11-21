---
source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/introduction-to-connectors-and-data-stores
---

# Introduction to Connectors and Data Stores, and third-party data sources

Connectors get data from Google and third-party data sources into Gemini Enterprise (formerly Agentspace), storing it in dedicated data stores. This page covers the core concepts (entity data stores, federation versus ingestion, schemas, regions, data syncs), the sync types and schedules, the checklists for Google and third-party data sources, and the list of supported third-party connectors by launch stage with the value used in the `discoveryengine.managed.allowedDataSources` organization policy. When you connect a third-party data source, Gemini Enterprise creates a data store and associates entity data stores with it for each specified entity; entity types are specific to the data source (for example Jira Cloud entities include issues, attachments, comments and worklogs).

## Signature / Usage

### Create a data store (REST)

Snippet taken from https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-cloud-storage: the `dataStores.create` call that creates a first-party data store through the Discovery Engine API.

Run the command by itself and type `DATA_STORE_DISPLAY_NAME` on one line at the prompt; `jq` (required) encodes it as a JSON string, and nothing is sent if the input ends first or the line is empty. A line that follows the command in the same paste or script is read as the value.

Adapted (not in the official docs): removed the trailing comma after `"CONTENT_REQUIRED"`, which makes the JSON body invalid. Also, the request body is built with `printf '%s\n' ... | jq -Rn '[inputs] as [...] | {...}'` from the values read by one `IFS= read -r` per placeholder (`DATA_STORE_DISPLAY_NAME`), rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"DATA_STORE_DISPLAY_NAME"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in these values cannot break the shell quoting or the JSON; every other field is unchanged. `printf` is a shell builtin, so these values reach `jq` on standard input, not in its arguments (the process list). The body is built in its own step (`BODY=$(... | jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN DATA_STORE_DISPLAY_NAME BODY; IFS= read -r DATA_STORE_DISPLAY_NAME &&
[ -n "$DATA_STORE_DISPLAY_NAME" ] &&
BODY=$(printf '%s\n' "$DATA_STORE_DISPLAY_NAME" |
jq -Rn '[inputs] as [$data_store_display_name] | {
  "displayName": $data_store_display_name,
  "industryVertical": "GENERIC",
  "solutionTypes": ["SOLUTION_TYPE_SEARCH"],
  "contentConfig": "CONTENT_REQUIRED"
}') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
curl -q --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/dataStores?dataStoreId=DATA_STORE_ID" \
--data @- )
```

### Sync types

- A full sync captures the entire state of the third-party app or service, including additions, updates and deletions; it replaces the existing contents of the data store.
- An incremental sync periodically captures entity data that has been added or updated since the last sync. It does not sync identity data or deletions of entity data.
- A full sync can be scheduled separately for entity data (an entity sync captures data specific to the third-party data source, for example Jira issues, worklogs, comments and attachments, and excludes identity information) and identity data (an identity sync captures data about user accounts associated with an ACL group).

### Sync schedules

- Full syncs of all identity data and entity data can be scheduled simultaneously for every 3 hours, 6 hours, 12 hours, 1 day, or 3 days.
- Independent full syncs of entity data: every 3 hours, 6 hours, 12 hours, 1 day, 3 days, 5 days, and every 7 days.
- Independent full syncs of identity data: every 30 minutes, 1 hour, 3 hours, 6 hours, 12 hours, 1 day, 3 days, 5 days, and every 7 days.
- Incremental syncs of updated or added entity data: every 3 hours, 6 hours, 12 hours, 1 day, 3 days, 5 days, or every 7 days; by default every 3 hours.

### Checklist for Google data sources

- Set up access control for your data source (Identity and permissions).
- Decide whether data should be federated or ingested (indexed).
- Decide how often the data should be synced.
- If you are using customer-managed encryption keys (CMEK), create multi-region keys.
- If you have personally identifiable information (PII) and intend to use autocomplete for query suggestions, see "protect against PII leaks".

Supported Google data sources named on the source page: Google Drive, Gmail, Google Calendar, People search (the text also names BigQuery and Spanner); the full list is on create-data-store.md.

### Checklist for third-party data sources

- Specific scopes and permissions must be configured for certain data sources: an administrator of the third-party application must review the required credentials and set up authentication and permissions.
- Set up access control for your data store (Identity and permissions).
- Decide whether data should be federated or ingested (indexed).
- If data is ingested, make sure that resources aren't restricted for the user credential that you use to ingest data into the data source.
- Decide how often the data should be synced.
- If you are using CMEK, create multi-region and single-region keys (Register single-region keys for third-party data stores).
- If you have PII and intend to use autocomplete for query suggestions, see "protect against PII leaks".
- If you want outbound traffic from the data store to originate from a fixed set of IP addresses (for example to allowlist them on the source system), and if the data store supports it, see "Configure static IP egress".

Third-party data sources shown on the introduction page: Microsoft Entra ID, Microsoft OneDrive, Microsoft Outlook, Microsoft SharePoint, Jira Cloud, Confluence Cloud, ServiceNow. The complete list follows under Options / Props.

### Private preview third-party sources

To connect data sources that are in private preview, contact your Google account team and request to be added to the allowlist:

- Connect Confluence Data Center On-premises with data ingestion
- Connect Jira Data Center On-premises with data ingestion

## Options / Props

### Connector and data store concepts

| Concept | Description |
|---|---|
| Data stores | Each data source supports a set of entity types (for example Jira Cloud has issues, attachments, comments and worklogs, which are unique to the data source). Gemini Enterprise creates a separate data store for each entity, so creating a data store in the Google Cloud console gives a collection of data stores representing these ingested data entities. |
| Data federation versus ingestion (indexing) | Data federation directly retrieves information from the data source; data isn't copied into the Gemini Enterprise index, so you don't need to worry about data storage, but because the data is not indexed search quality might be lower. Data ingestion (indexing) copies data into the Gemini Enterprise index, which can improve search quality but consumes more storage and time. If the connector supports both, select your preferred data connection method. |
| Unstructured data | The supported data format is specific to the data source and the entity type. If the content of an entity is stored in an unstructured format, such as PDF, HTML, DOCX, PPTX, XLSX and XLSM, Gemini Enterprise creates an unstructured data store. |
| Structured data | The supported data format is specific to the data source and the entity type. If the content of an entity is stored in a structured format, Gemini Enterprise creates a structured data store. |
| Data schemas | The data schema defines the data structure. When you import structured data, the system auto-detects the schema; you can use the auto-detected schema or define the schema using the API. |
| Data store regions | When ingesting data, select the region where you want to store the data, such as global, the US, or the EU. Data stored in the US or EU regions require data encryption: the default is Google-owned and Google-managed encryption keys; alternatively use customer-managed encryption keys. |
| Data syncs | A data sync pulls and updates identity data (such as roles, permissions and users) and entity data (such as data related to a specific data source) from the original data source. |

### Frequency recommendations (typical record counts)

| QPS | Record volume for 1-day sync | Record volume for 3-day sync | Record volume for 5-day sync | Record volume for 7-day sync |
|---|---|---|---|---|
| 5 | 432k | 1.296M | 2.16M | 3M |
| 10 | 864k | 2.592M | 4.32M | 6M |
| 20 | 1.7M | 5.1M | 8.5M | 11.9M |
| 50 | 4.3M | 12.9M | 21.5M | 30.1M |
| 100 | 8.6M | 25.8M | 43M | 60.2M |

### Third-party connectors: generally available

| Data source | Value for `allowedDataSources` |
|---|---|
| AirOps | `airops` |
| Airtable | `airtable` |
| Aiwyn Tax | `aiwyn_tax` |
| Apollo GraphOS | `apollo_graphos` |
| Asana | `asana` |
| Atlan | `atlan_mcp` |
| Attio | `attio` |
| Autodesk Product Help | `autodesk_product_help` |
| Blockscout | `blockscout` |
| Box | `box` |
| Campfire | `campfire` |
| Cisco Workspaces | `cisco_workspaces` |
| CoinDesk | `coindesk` |
| Confluence Cloud | `confluence` |
| Confluence Data Center | `confluence_server` |
| Crypto | `crypto` |
| Dropbox | `dropbox` |
| Egnyte | `egnyte` |
| Excalidraw | `excalidraw` |
| FactSet AI-Ready Data | `factset_ai_ready_data` |
| Finnhub | `finnhub` |
| Freshservice | `freshservice` |
| Fullstory | `fullstory` |
| GitHub | `github` |
| GitLab | `gitlab` |
| Globalping | `globalping` |
| Google Calendar | `google_calendar` |
| Google Drive | `google_drive` |
| Google Mail | `google_mail` |
| Grafana | `grafana` |
| Granted | `granted` |
| Guru | `guru` |
| Hex | `hex` |
| HubSpot | `hubspot` |
| Hugging Face | `huggingface` |
| iManage platform | `imanage_platform` |
| Intercom | `intercom` |
| Jira Cloud | `jira` |
| Jira Data Center | `jira_server` |
| Linear | `linear` |
| LumApps | `lumapps` |
| Mercury | `mercury_mcp` |
| Microsoft Entra ID | `azure_active_directory` |
| Microsoft Learn | `microsoft_learn` |
| Microsoft Outlook | `outlook` |
| Microsoft Teams | `teams` |
| Midpage | `midpage` |
| Monday | `monday` |
| NetDocuments | `netdocuments_us_vault` |
| Omni Analytics | `omni_analytics` |
| OneDrive | `onedrive` |
| Open Targets | `open_targets` |
| PagerDuty | `pagerduty` |
| pg-aiguide | `pg_aiguide` |
| Ramp | `ramp_mcp` |
| Relativity | `relativity` |
| S\&P Global - Deterministic Retrieval | `s_p_global` |
| Sanity | `sanity` |
| ServiceNow | `servicenow` |
| SharePoint | `sharepoint` |
| Slack | `slack` |
| Solve Intelligence | `solve_intelligence` |
| Sourcegraph | `sourcegraph` |
| Squarespace | `squarespace` |
| Streak | `streak` |
| Stripe | `stripe` |
| Tavily | `tavily` |

### Third-party connectors: public preview

| Data source | Value for `allowedDataSources` |
|---|---|
| Adobe | `adobe` |
| Adobe Workfront | `adobe_workfront` |
| AllTrails | `alltrails` |
| AWS Marketplace | `aws-marketplace` |
| Bitly | `bitly` |
| Calendly | `calendly` |
| Clay | `clay` |
| CMS Coverage | `healthcare_cms_coverage` |
| Cohesity | `cohesity` |
| CourtListener | `courtlistener` |
| Courtroom5 | `courtroom5` |
| Crossbeam | `crossbeam` |
| Custom MCP Server | `custom_mcp` |
| Descript | `descript` |
| Dice | `dice` |
| DirectBooker | `directbooker` |
| Docusign | `docusign` |
| D\&B Commercial Graph | `dun_and_bradstreet` |
| D\&B Finance Analytics | `d_b_finance_analytics` |
| D\&B Risk Analytics | `d_b_risk_analytics` |
| Daloopa | `daloopa` |
| Dynamics 365 | `dynamics365` |
| Epic EHR | `epic` |
| Fibery | `fibery` |
| Fiscal.ai | `fiscal_ai` |
| Gamma | `gamma` |
| GoDaddy | `godaddy` |
| Gong | `gong` |
| Google Chat | `google_chat` |
| Compute Engine | `google_compute_engine` |
| Google Stitch | `googlestitch` |
| ICD-10 Codes | `healthcare_icd10_cm` |
| Invideo | `invideo` |
| Kiwi | `kiwi` |
| Kiwi.com | `kiwi_com` |
| Lastminute | `lastminute` |
| LegalZoom | `legalzoom` |
| Lovable | `lovable` |
| MailerLite | `mailerlite` |
| Mermaid Chart | `mermaid_chart` |
| Microsoft Outlook (OpenAPI) | `outlookopenapi` |
| Miro | `miro` |
| MongoDB Atlas | `mongodb_atlas` |
| Moody's | `moody_s` |
| MSCI | `msci` |
| Nexla | `nexla_mcp_studio` |
| Notion | `notion` |
| NPPES NPI Registry | `healthcare_nppes_npi` |
| Oracle NetSuite | `oracle_netsuite` |
| PandaDoc | `pandadoc` |
| Pendo | `pendo_mcp` |
| Pendo EU | `pendo_mcp_eu` |
| Pendo Japan | `pendo_mcp_jpn` |
| Pylon | `pylon` |
| RxNorm Drug Vocabulary | `healthcare_rxnorm` |
| S\&P Global - Adaptive Retrieval | `s_p_global_adaptive_retrieval` |
| Salesforce | `salesforce` |
| ServiceM8 | `servicem8` |
| Shopify | `shopify` |
| Smartsheet | `smartsheet` |
| Starburst | `starburst` |
| Superhuman Mail | `superhuman_mail` |
| Supermetrics | `supermetrics` |
| Supabase | `supabase` |
| SurveyMonkey | `surveymonkey` |
| Taskrabbit | `taskrabbit` |
| Trivago | `trivago` |
| Twilio Docs | `twilio_docs` |
| Vanta | `vanta` |
| Viator | `viator` |
| Webex Meetings | `webex_meetings` |
| Windsor.ai | `windsor` |
| Wix | `wix` |
| Wrike | `wrike` |
| Zapier | `zapier` |
| Zendesk | `zendesk` |
| Zoho Books | `zohobooks` |
| Zoho CRM | `zohocrm` |
| Zoho Desk | `zohodesk` |
| Zoho Projects | `zohoprojects` |
| ZoomInfo | `zoominfo` |

## Notes

- Federated search: when using federated search or federated connectors, your query string is sent to all enabled third-party search backends. The query string might contain parts of the data in your search request and conversation history, and the third-party system can link the query with your identity. Once data is in the third-party system it is subject to that system's Terms of Service and privacy policies, not Google Cloud's.
- Incremental syncs must be scheduled more frequently than full syncs; for full syncs every 12 hours, incremental syncs can only be every 3 hours or every 6 hours. If incremental and full sync use the same frequency, the incremental sync is automatically paused and requires manual intervention to resume.
- Identity sync with full sync (source example): an identity sync maps `user_1` to `group_1` and `user_2` to `group_2`; a full sync of `page_1` (linked to `group_1`) and `page_2` (linked to `group_2`) gives `user_1` access to `page_1` and `user_2` access to `page_2`.
- Frequency recommendations: choose a sync frequency that aligns with the volume of records fetched and the recommended QPS; the actual number of records may vary by data source and configuration.
- Pausing a sync type cancels ongoing syncs of that type and stops scheduling new ones. Resuming schedules a new sync based on the last scheduled sync time and does not continue the interrupted sync.
- Third-party supported actions: not all third-party data stores support actions, such as data stores supporting limited functionality (federated search only or search only). The connect-third-party-data-source source lists actions per data store with launch dates (for example Adobe, Asana, Box, Confluence Cloud, GitHub, Jira Cloud, Microsoft OneDrive / Outlook / SharePoint / Teams, MongoDB Atlas, Notion, Salesforce, ServiceNow, Slack, Supabase, Zendesk); that per-action list is not reproduced here. Box supports the tools exposed by Box as actions (see the Box MCP tools documentation).
- Some third-party actions in the source can mutate or delete external data (for example MongoDB Atlas `Drop database`, `Delete many`, Supabase `Execute SQL`, GitHub `Merge pull request`); try connectors against a disposable account first.
- Visit the source-specific page of each connector (linked from the official list) for how to connect it.
- Different product from Integration Connectors (`gcp-integration` skill): these are Gemini Enterprise data connectors.
- Corrected from the official docs: the borrowed Cloud Storage `curl` body ended with `"CONTENT_REQUIRED",` before the closing brace; the trailing comma was removed.
- Snippet taken from https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-cloud-storage
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "DATA_STORE_DISPLAY_NAME"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq -Rn` from the values, which the `printf` builtin writes to its standard input (not its arguments), and sent with `--data @-` (`man jq` 1.7.1: `--raw-input / -R` "each line of text is passed to the filter as a string"; `inputs` "Outputs all remaining inputs, one by one.").
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/introduction-to-connectors-and-data-stores (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-third-party-data-source (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [create-data-store.md](./create-data-store.md)
- [set-up-custom-mcp-server.md](./set-up-custom-mcp-server.md)
- [prepare-data.md](./prepare-data.md)
