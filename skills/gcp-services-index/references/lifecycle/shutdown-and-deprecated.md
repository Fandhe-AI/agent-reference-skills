---
source: https://docs.cloud.google.com/terms/deprecation
---

# Shut-down and deprecated products

## Signature / Usage

| IAM service id | Product | Status | Dates | Successor | Owner skill | Evidence |
|---|---|---|---|---|---|---|
| `automl` | AutoML | Shut down | Legacy AutoML Vision/Video Intelligence July 31, 2024; Tables July 24, 2024; Natural Language Aug 7, 2024 (deprecated Jan 23 / Jul 31, 2023). AutoML Video July 31, 2025; AutoML Text June 15, 2025; AutoML Translation Sept 30, 2025 | Vertex AI (Gemini tuning for Video/Text; Cloud Translation - Advanced for Translation) | `gcp-agent-platform` | https://docs.cloud.google.com/vertex-ai/docs/deprecations.md.txt |
| `clouddebugger` | Cloud Debugger | Shut down | deprecated May 16, 2022; shut down May 31, 2023 | Snapshot Debugger (open source, archived Sept 7, 2023) | `gcp-observability` | https://docs.cloud.google.com/stackdriver/docs/deprecations/debugger-deprecation.md.txt |
| `cloudiot` | Cloud IoT | Shut down | IoT Core discontinued August 16, 2023 (not accepting new customers); Eventarc table: deprecated August 16, 2022, shutdown August 16, 2023 | — | `gcp-ai-apis` | https://cloud.google.com/terms/services/index-20230712 |
| `containerregistry` | Container Registry | Shut down | deprecated May 15, 2023; shut down March 18, 2025 (GKE read of images stopped June 03, 2025) | Artifact Registry | `gcp-devops` | https://docs.cloud.google.com/artifact-registry/docs/transition/transition-from-gcr.md.txt |
| `contentwarehouse` | Content Warehouse | Shut down | deprecated January 16, 2024 (Document AI deprecation table); no longer available after January 16, 2025 | — | `gcp-ai-apis` | https://docs.cloud.google.com/document-warehouse/docs/release-notes.md.txt |
| `datacatalog` | Data Catalog | Shut down | deprecated February 3, 2025; shutdown June 1, 2026 | Knowledge Catalog (Dataplex) | `gcp-bigquery` | https://docs.cloud.google.com/dataplex/docs/deprecations.md.txt |
| `datalabeling` | AI Platform Data Labeling Service | Shut down | Legacy AI Platform Data Labeling Service: deprecated January 23, 2023, shutdown January 31, 2025; Vertex AI Data Labeling Service: deprecated June 30, 2023, shutdown October 3, 2024 | Google Cloud console labels / partners (Labelbox, Snorkel via Marketplace) | `gcp-agent-platform` | https://docs.cloud.google.com/vertex-ai/docs/deprecations.md.txt |
| `dspm` | Data Security Posture Management | Deprecated | deprecated September 14, 2026; shutdown on or after February 1, 2027 | — | `gcp-security` | https://docs.cloud.google.com/security-command-center/docs/deprecations.md.txt |
| `gameservices` | Game Servers | Shut down | date not stated on official pages found | — | `OUT` | https://status.cloud.google.com/summary |
| `pubsublite` | Pub/Sub Lite | Deprecated | Effective January 31, 2027 turned down; unavailable to new customers after September 24, 2024; inactive-use access removed from July 15, 2025 | Google Cloud Managed Service for Apache Kafka or Pub/Sub | `gcp-messaging-workflows` | https://docs.cloud.google.com/pubsub/lite/docs.md.txt |
| `rapidmigrationassessment` | Rapid Migration Assessment | Shut down | end of sale July 30, 2024; shut down June 30, 2025 | — | `gcp-hybrid-migration` | https://docs.cloud.google.com/migration-center/docs/deprecations.md.txt |
| `resourcesettings` | Resource Settings | Shut down | deprecated November 7, 2023; shutdown October 1, 2024 | — | `gcp-foundation` | https://docs.cloud.google.com/resource-manager/docs/deprecations.md.txt |
| `source` | Cloud Source Repositories | Deprecated | End of Sale: unavailable to new customers effective June 17, 2024; shutdown date to be communicated at least one year in advance (not yet announced) | Alternatives listed in migration guide (e.g. GitHub, GitLab, Secure Source Manager) | `gcp-devops` | https://docs.cloud.google.com/source-repositories/docs/migration-guides.md.txt |
| `translationhub` | Translation Hub | Deprecated | deprecated June 30, 2025; shutdown September 20, 2026 (that date is already past as of 2026-11-15, but the page still says "will be shut down") | — | `gcp-ai-apis` | https://docs.cloud.google.com/translation-hub/docs/deprecations.md.txt |
| `deploymentmanager` | Cloud Deployment Manager | Deprecated | support ended 2026-04-01; new users blocked from 2026-06-30; shutdown on or after 2027-06-30 | Infrastructure Manager | `gcp-iac` | https://docs.cloud.google.com/deployment-manager/docs/deprecations |

```bash
grep -i "<product>" references/lifecycle/shutdown-and-deprecated.md
```

## Notes

- Confirmed against official pages on 2026-11-14; each entry cites the page that states the dates. A date that has already passed is shown as stated by the page.
- Not exhaustive: products whose lifecycle could not be confirmed are not listed here and are not claimed to be available.
- Source: https://docs.cloud.google.com/terms/deprecation

## Related

- [products/README.md](../products/README.md)
