---
source: https://docs.cloud.google.com/nodejs/docs/reference
---

# Node.js package names

Maps Google Cloud services to their Node.js Cloud Client Library npm packages. Most are `@google-cloud/<name>`, but several families use other scopes.

## Signature / Usage

### Source table excerpt (four contiguous rows, verbatim)

```markdown
| Routes API | [@googlemaps/routing](https://cloud.google.com/nodejs/docs/reference/routing/latest) |
| SaaS Runtime | [@google-cloud/saasservicemgmt](https://cloud.google.com/nodejs/docs/reference/saasservicemgmt/latest) |
| Secret Manager | [@google-cloud/secret-manager](https://cloud.google.com/nodejs/docs/reference/secret-manager/latest) |
| Secure Source Manager | [@google-cloud/securesourcemanager](https://cloud.google.com/nodejs/docs/reference/securesourcemanager/latest) |
```

### Selected services

Reference pages follow the pattern `https://cloud.google.com/nodejs/docs/reference/<dir>/latest`, where `<dir>` is not always the package name (for example `@google-cloud/secret-manager` is under `secret-manager`, `@google-cloud/subscriptions` under `workspaceevents`).

| Service | Package(s) |
| --- | --- |
| BigQuery | `@google-cloud/bigquery` |
| BigQuery Storage | `@google-cloud/bigquery-storage`, `@google-cloud/bigquery-storage-api` |
| Bigtable | `@google-cloud/bigtable`, `@google-cloud/bigtable-api` |
| Cloud Run | `@google-cloud/run` |
| Cloud Run functions | `@google-cloud/functions` |
| Cloud Storage | `@google-cloud/storage`, `@google-cloud/storage-control` |
| Cloud Tasks | `@google-cloud/tasks` |
| Cloud Scheduler | `@google-cloud/scheduler` |
| Cloud Build | `@google-cloud/cloudbuild` |
| Artifact Registry | `@google-cloud/artifact-registry` |
| Cloud Key Management Service | `@google-cloud/kms` |
| Secret Manager | `@google-cloud/secret-manager` |
| Cloud Logging | `@google-cloud/logging`, `@google-cloud/logging-api` |
| Cloud Monitoring | `@google-cloud/monitoring`, `@google-cloud/monitoring-dashboards` |
| Compute Engine | `@google-cloud/compute` |
| Cloud SQL Admin API | `@google-cloud/sql` |
| Firestore | `@google-cloud/firestore`, `@google-cloud/firestore-api` |
| Firestore in Datastore mode | `@google-cloud/datastore`, `@google-cloud/datastore-api` |
| Spanner | `@google-cloud/spanner`, `@google-cloud/spanner-api` |
| Pub/Sub | `@google-cloud/pubsub`, `@google-cloud/pubsub-api` |
| Identity and Access Management | `@google-cloud/iam` |
| IAM Service Account Credentials API | `@google-cloud/iam-credentials` |
| Resource Manager | `@google-cloud/resource-manager` |
| Service Usage | `@google-cloud/service-usage` |
| API Keys API | `@google-cloud/apikeys` |
| Cloud Billing | `@google-cloud/billing` |
| Eventarc | `@google-cloud/eventarc` |
| Workflows | `@google-cloud/workflows` |
| Vertex AI | `@google-cloud/agentplatform`, `@google-cloud/aiplatform` |
| Document AI | `@google-cloud/documentai` |
| Cloud Vision | `@google-cloud/vision` |
| Speech-to-Text | `@google-cloud/speech` |
| Text-to-Speech | `@google-cloud/text-to-speech` |
| Cloud Translation | `@google-cloud/translate` |
| Kubernetes Engine API | `@google-cloud/container` |
| Memorystore for Redis | `@google-cloud/memorystore`, `@google-cloud/redis`, `@google-cloud/redis-cluster` |
| Sensitive Data Protection | `@google-cloud/dlp` |
| Chat API | `@google-apps/chat` |
| Analytics Data API | `@google-analytics/data` |
| Places API | `@googlemaps/places` |
| Google Ad Manager API | `@google-ads/admanager` |

## Notes

- Selection: the source table has about 180 service rows; this page keeps a selected subset. Find the rest at the source URL.
- Scopes seen in the table besides `@google-cloud/*`: `@google-apps/*`, `@google-analytics/*`, `@googlemaps/*`, `@google-shopping/*`, `@google-ads/*`, `@google/area120-tables`.
- Some services map to several packages (listed above for BigQuery Storage, Bigtable, Firestore, Spanner, Pub/Sub, Logging); the source does not say how they differ.
- Vertex AI lists `@google-cloud/agentplatform` and `@google-cloud/aiplatform`; Gemini via `google-genai` is the `google-gemini-api` skill, not this family.
- This is the Google Cloud client library family, distinct from `googleapis` (Node.js Google API Client Library for REST discovery APIs).
- Source: https://docs.cloud.google.com/nodejs/docs/reference (retrieved 2026-11-16; CC BY 4.0)

## Related

- [python-packages.md](./python-packages.md)
- [rust-packages.md](./rust-packages.md)
- [client-libraries-explained.md](./client-libraries-explained.md)
