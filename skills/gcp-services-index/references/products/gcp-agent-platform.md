---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-agent-platform

## Signature / Usage

Owner skill: `gcp-agent-platform` (status: 未収録（予定）). gcloud groups: `agent-identity`, `agent-registry`, `ai`, `ai-platform`, `developer-knowledge`, `gemini`, `ml`, `mldiagnostics`, `vector-search`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| AI Platform | `ml.googleapis.com` (v1) | An API to enable creating and using machine learning models. | `ml` | `ml.` | 9 | — | — | https://cloud.google.com/ml/ | 未収録（予定） |
| AI Platform Data Labeling Service | `datalabeling.googleapis.com` (v1beta1) | Public API for Google Cloud AI Data Labeling Service. | — | `datalabeling.` | 4 | — | Shut down | https://cloud.google.com/data-labeling/docs/ | 未収録（予定） |
| AutoML | — | — | — | `automl.` | 5 | — | Shut down | https://docs.cloud.google.com/iam/docs/roles-permissions/automl | 未収録（予定） |
| Customer Experience Insights | `contactcenterinsights.googleapis.com` (v1) | — | — | `contactcenterinsights.` | 6 | — | — | https://cloud.google.com/contact-center/insights/docs | 未収録（予定） |
| Discovery Engine | `discoveryengine.googleapis.com` (v1, v1alpha, v1beta) | Discovery Engine API. | — | `discoveryengine.` | 17 | Vertex AI Search | — | https://cloud.google.com/generative-ai-app-builder/docs/ | 未収録（予定） |
| Gemini Cloud Assist | — | — | — | `geminicloudassist.` | 10 | Duet AI in Google Cloud | — | https://docs.cloud.google.com/iam/docs/roles-permissions/geminicloudassist | 未収録（予定） |
| Gemini Code Assist Management | — | — | — | `geminicodeassistmanagement.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/geminicodeassistmanagement | 未収録（予定） |
| Gemini Enterprise Agent Platform | `aiplatform.googleapis.com` (v1, v1beta1) | Build, scale, govern, and optimize sophisticated agents and models. | — | `aiplatform.` | 48 | Vertex AI | — | https://cloud.google.com/vertex-ai/ | 未収録（予定） |
| Gemini Enterprise for Customer Experience | `ces.googleapis.com` (v1, v1beta) | — | — | `ces.` | 11 | — | — | https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps | 未収録（予定） |
| Gemini for Google Cloud API | — | — | — | `cloudaicompanion.` | 15 | Duet AI in Google Cloud | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudaicompanion | 未収録（予定） |
| Google Cloud Contact Center as a Service | `contactcenteraiplatform.googleapis.com` (v1alpha1) | — | — | `contactcenteraiplatform.` | 3 | — | — | https://cloud.google.com/solutions/contact-center-ai-platform | 未収録（予定） |
| Recommendations | — | — | — | `automlrecommendations.` | 5 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/automlrecommendations | 未収録（予定） |
| SecLM | — | — | — | `seclm.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/seclm | 未収録（予定） |
| Vector Search | — | — | — | `vectorsearch.` | 6 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/vectorsearch | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Lifecycle (AutoML): Shut down. Dates: Legacy AutoML Vision/Video Intelligence July 31, 2024; Tables July 24, 2024; Natural Language Aug 7, 2024 (deprecated Jan 23 / Jul 31, 2023). AutoML Video July 31, 2025; AutoML Text June 15, 2025; AutoML Translation Sept 30, 2025. Successor: Vertex AI (Gemini tuning for Video/Text; Cloud Translation - Advanced for Translation). Source: https://docs.cloud.google.com/vertex-ai/docs/deprecations.md.txt (retrieved 2026-11-14).
- Lifecycle (AI Platform Data Labeling Service): Shut down. Dates: Legacy AI Platform Data Labeling Service: deprecated January 23, 2023, shutdown January 31, 2025; Vertex AI Data Labeling Service: deprecated June 30, 2023, shutdown October 3, 2024. Successor: Google Cloud console labels / partners (Labelbox, Snorkel via Marketplace). Source: https://docs.cloud.google.com/vertex-ai/docs/deprecations.md.txt (retrieved 2026-11-14).
- Lifecycle information covers only products confirmed against official pages as of 2026-11-14 (see `../lifecycle/shutdown-and-deprecated.md`); a product without a Lifecycle entry is not confirmed to be available. Check the official product page before use.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
