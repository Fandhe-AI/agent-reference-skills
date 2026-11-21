---
source: https://docs.cloud.google.com/gemini/enterprise/docs/editions
---

# Compare editions of Gemini Enterprise and choose a product

Describes the Gemini Enterprise (formerly Agentspace) editions: Business, Standard, Plus, Pay-as-you-go and Frontline, how seats and pooled storage differ, and how Gemini Enterprise differs from consumer Gemini (`gemini.google.com`). It also compares Gemini Notebook Enterprise (AI research assistant over curated sources) with Gemini Enterprise (broad AI assistant and agentic platform). Subscriptions for Gemini Enterprise (Standard and Plus) include Gemini Notebook Enterprise, which is also available as a standalone product.

## Signature / Usage

### List subscriptions (and their edition) of a billing account

The source page has no code block. Its next steps point to the "View subscription details" procedure of the licenses page; this is that REST call (`v1alpha`). The **Subscription tier** field of a subscription shows its edition.

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X GET \
  -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: PROJECT_NUMBER" \
  "https://discoveryengine.googleapis.com/v1alpha/billingAccounts/BILLING_ACCOUNT_ID/billingAccountLicenseConfigs" )
```

### When to choose Gemini Notebook Enterprise

- Establish a single, AI-powered reference point for a topic or project using known, authoritative sources.
- Create targeted, chat-based Q&A experiences from a defined set of source documents.
- Efficiently generate specific documents (such as study guides, FAQs and timelines) from a curated knowledge base.
- Transform detailed, written information into interactive audio formats.
- Perform deep analysis and synthesis of information within a specific, limited set of documents.

### When to choose Gemini Enterprise

- Find answers when the search starting point across enterprise data is unknown.
- Generate diverse content (text, multi-modal) requiring synthesis from various sources.
- Build, deploy and invoke specialized AI agents for complex, multi-step business process automation.
- Automate workflows that require AI agents to interact with multiple internal and external systems.
- Provide comprehensive information retrieval across all enterprise data, including third-party SaaS applications.
- Upload a specific document and ask one-off questions about its contents.
- Analyze data in more complicated formats, such as Microsoft Excel, CSV, and images embedded within PDFs.

## Options / Props

### Compare features

| Feature | Gemini Enterprise Business | Gemini Enterprise Standard | Gemini Enterprise Plus | Gemini Enterprise Pay-as-you-go | Gemini Enterprise Frontline |
|---|---|---|---|---|---|
| Seats | 1-500 users | 1 or more users | 1 or more users | 1 minimum seat requirement to get started | 150 or more users of Standard or Plus editions |
| Storage and data indexing per user (footnote 1) | 25 GiB, pooled | 30 GiB, pooled | 75 GiB, pooled | Pay-as-you-go | 2 GiB, pooled |
| Access select, segment-relevant connectors | | | | | |
| Access the full data connector ecosystem | | | | | |
| Use permission-aware enterprise search | | | | | |
| Ground based on enterprise data from Google data sources and third-party data sources | | | | | |
| Get priority access to the latest Gemini models | | | | | |
| Get answers incorporating blended search and text generation | | | | | |
| Generate media (images and videos) | | | | | |
| Use Ground with Google Search | | | | | |
| Use Web Grounding | | | | | |
| Use permission-aware prebuilt tasks and agent actions | | | | | |
| Chat with published Gemini Notebook Enterprise notebooks | | | | | |
| Create and publish Gemini Notebook Enterprise notebooks | | | | | |
| Build and publish custom no-code agents using Gemini Enterprise no-code tools (preview) | | | | | |
| Use custom no-code agents built using Gemini Enterprise no-code tools (preview) | | | | | |
| Create and upload custom skills | | | | | |
| Use Google-managed skills and user-created skills shared with you | | | | | footnote 2 |
| Use Deep Research (Made by Google) | | | | | |
| Use Data Insights (Made by Google) | | | | | |
| Use your own full-code agents built outside of Gemini Enterprise | | | | | footnote 3 |
| Access the Agent Marketplace | | | | | |
| Access basic agent governance and administration | | | | | |
| Enterprise-grade security and compliance | | | | | |
| AI developer tools (footnote 4) | | | | | |
| Google Cloud console access (footnote 5) | | | | | |

### Gemini Enterprise compared to consumer Gemini

| Capability | Gemini Enterprise | Consumer Gemini (`gemini.google.com`) |
|---|---|---|
| Data privacy and model training | Customer prompts, responses, and enterprise data are not used to train foundation models. Governed by Google Cloud enterprise privacy terms. | Governed by consumer terms of service; interactions may be reviewed and used to improve Google products and models depending on consumer account settings. |
| Identity and access management | Managed by enterprise administrators using IAM, Workforce Identity Federation (SSO), and source-system access control lists (ACLs). | Individual consumer Google Accounts (`@gmail.com`). |
| Security and compliance | Supports VPC Service Controls, Customer-Managed Encryption Keys (CMEK), Data residency (`us`, `eu`, `global`), Access Transparency, and Cloud Audit Logs. | Consumer-grade security controls; no enterprise VPC perimeter, CMEK, or audit logging. |
| Enterprise data grounding | Built-in connectors (data ingestion, federated search, and actions) for enterprise systems such as Jira, Confluence, ServiceNow, SharePoint, and Google Cloud data stores. | Grounded primarily on Google Search and personal consumer extensions. |
| Administration and customization | Project-level administration in the Google Cloud console, custom assistant instructions and grounding thresholds, model availability controls, and custom agent deployment. | End-user interface with no organizational policy or project-level administrative controls. |
| Support and SLAs | Backed by Google Cloud Service Level Agreements (SLAs) and Cloud Customer Care. | Supported through the consumer Gemini Apps Help Center; not covered by Google Cloud Customer Care. |

### Product comparison (Gemini Notebook Enterprise and Gemini Enterprise)

| | Gemini Notebook Enterprise | Gemini Enterprise |
|---|---|---|
| Primary Goal | Centralized knowledge, content generation from your own documents | Enterprise-wide data search, multi-modal content generation, and agent orchestration |
| Input | Your uploaded documents, websites, and specific sources | Broad queries and data from across enterprise systems (Google and third-party SaaS) |
| Output | Synthesized insights, generated content (FAQs, timelines), interactive audio podcasts, and chat-based questions and answers confined to sources | Answers from diverse data, text and multi-modal content from across your enterprise, and automated actions by agents |
| User | Individual knowledge workers, small teams, content creators | Process owners, developers, IT, operations, business analysts, general knowledge seekers, and content creators |
| Complexity | Focused knowledge management and document-specific chat experiences | Orchestrating multi-agent systems for business processes and general AI assistance |
| Core Function | Understanding and extracting from unstructured text, generating content based on your sources | Comprehensive information retrieval, multi-modal content creation, and autonomous agent execution |

## Notes

- Source limitation: the editions twin keeps the feature rows of the comparison table but lost the per-edition availability marks (the cells are empty in the retrieved source), so availability per edition is not reproduced here; only the Frontline footnote marks survive. Check the official page for which edition includes each feature.
- Billing: if your project is linked to a self-serve (online) Cloud Billing account, you pay for Pay-as-you-go usage with prepaid credits, and if prepaid credits aren't set up yet you must buy credits to subscribe. If the project is linked to an invoiced Cloud Billing account, usage is billed on your monthly invoice.
- Footnote 1: storage and data indexing quotas are pooled across all users in a project and location, regardless of edition. Other feature quotas are pooled within each edition.
- Footnote 2: Frontline users can install skills themselves from **Browse skills**. They can't create or upload custom skills.
- Footnote 3: with Frontline, users can only access previously-developed agents that have been provisioned for them by their administrator.
- Footnote 4 (AI developer tools): the project must be linked to a Cloud Billing account such as an upgraded self-serve (online) billing account, an invoiced billing account, or a billing subaccount of an invoiced billing account. Included monthly seat credits apply strictly to first-party Gemini models. When an administrator enables partner models (Anthropic models---Claude Opus 5.5 and Claude Sonnet 5.5) in the AI developer tools settings, partner model usage is billed as pay-as-you-go usage. With a license-based edition you must turn on pay-as-you-go usage above quota. With a self-serve (online) billing account, usage is paid from prepaid credits; with an invoiced billing account or a billing subaccount of an invoiced billing account, usage is billed on the monthly invoice. Usage is subject to the project's monthly spend limit.
- Footnote 5: Gemini Enterprise Business edition is a SaaS application accessible through the web at business.gemini.google; administrators don't need Google Cloud console access, and there are no project numbers or project-level IAM roles to manage.
- Gemini Notebook Enterprise key features (source list): centralized knowledge, targeted chat confined to the notebook's information, one-click content (FAQs, timelines), interactive audio, content synthesis, data control (data remains under access control and isn't used for external model training), focus on sources you provide. Gemini Enterprise key features: enterprise-wide search, multi-modal content generation, advanced agentic platform, autonomous workflows, system integration, goal-oriented automation.
- The two products are complementary: Gemini Enterprise search often discovers new sources from Google systems and third-party SaaS applications, and users can add them directly to a Gemini Notebook Enterprise notebook.
- Snippet taken from https://docs.cloud.google.com/gemini/enterprise/docs/licenses (the "View subscription details" REST call; the REST resource is in `v1alpha` of the Discovery Engine API).
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/editions (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/choose-product (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [licenses.md](./licenses.md)
- [quickstart-gemini-enterprise.md](./quickstart-gemini-enterprise.md)
