---
source: https://docs.cloud.google.com/python/docs/reference
---

# Python package names

Maps Google Cloud services to their Python Cloud Client Library PyPI packages. Most are `google-cloud-<name>`, but package names, reference directory names and import names can differ.

## Signature / Usage

### Source table excerpt (four contiguous rows, verbatim)

```markdown
| Routes API | [google-maps-routing](https://googleapis.dev/python/routing/latest) |
| SaaS Runtime | [google-cloud-saasplatform-saasservicemgmt](https://cloud.google.com/python/docs/reference/google-cloud-saasplatform-saasservicemgmt/latest) |
| Secret Manager | [google-cloud-secret-manager](https://cloud.google.com/python/docs/reference/secretmanager/latest) |
| Secure Source Manager | [google-cloud-securesourcemanager](https://cloud.google.com/python/docs/reference/securesourcemanager/latest) |
```

### Selected services

| Service | Package(s) |
| --- | --- |
| BigQuery Storage | `google-cloud-bigquery-storage` |
| BigQuery Connection API | `google-cloud-bigquery-connection` |
| Bigtable | `google-cloud-bigtable` |
| Cloud Run | `google-cloud-run` |
| Cloud Run functions | `google-cloud-functions` |
| Cloud Storage | `google-cloud-storage`, `google-cloud-storage-control` |
| Cloud Tasks | `google-cloud-tasks` |
| Cloud Scheduler | `google-cloud-scheduler` |
| Cloud Build | `google-cloud-build` |
| Artifact Registry | `google-cloud-artifact-registry` |
| Cloud Key Management Service | `google-cloud-kms` |
| Secret Manager | `google-cloud-secret-manager` |
| Cloud Logging | `google-cloud-logging` |
| Cloud Monitoring | `google-cloud-monitoring`, `google-cloud-monitoring-dashboards`, `google-cloud-monitoring-metrics-scopes` |
| Cloud Trace | `google-cloud-trace` |
| Error Reporting | `google-cloud-error-reporting` |
| Compute Engine | `google-cloud-compute`, `google-cloud-compute-v1beta` |
| Cloud SQL Admin API | `google-cloud-sql` |
| Firestore | `google-cloud-firestore` |
| Firestore in Datastore mode | `google-cloud-datastore` |
| Spanner | `google-cloud-spanner` |
| Pub/Sub | `google-cloud-pubsub` |
| Pub/Sub Lite | `google-cloud-pubsublite` |
| Identity and Access Management | `google-cloud-iam` |
| Resource Manager | `google-cloud-resource-manager` |
| Service Usage | `google-cloud-service-usage` |
| API Keys API | `google-cloud-api-keys` |
| Cloud Billing | `google-cloud-billing` |
| Eventarc | `google-cloud-eventarc` |
| Workflows | `google-cloud-workflows` |
| Vertex AI | `google-cloud-aiplatform` |
| Document AI | `google-cloud-documentai` |
| Cloud Vision | `google-cloud-vision` |
| Speech-to-Text | `google-cloud-speech` |
| Text-to-Speech | `google-cloud-texttospeech` |
| Cloud Translation | `google-cloud-translate` |
| Kubernetes Engine API | `google-cloud-container` |
| Memorystore for Redis | `google-cloud-memorystore`, `google-cloud-redis`, `google-cloud-redis-cluster` |
| Sensitive Data Protection | `google-cloud-dlp` |
| Chat API | `google-apps-chat` |
| Analytics Data API | `google-analytics-data` |
| Places API | `google-maps-places` |

## Notes

- Selection: the source table has about 180 service rows; this page keeps a selected subset. Find the rest at the source URL. The retrieved Python table has no plain BigQuery row; only the BigQuery Connection, Data Transfer, Migration, Reservation, Storage and similar packages appear.
- Names differ from Node.js in places (for example Cloud Build is `@google-cloud/cloudbuild` in Node.js vs `google-cloud-build` in Python; Text-to-Speech is `@google-cloud/text-to-speech` vs `google-cloud-texttospeech`).
- Other prefixes in the table: `google-apps-*`, `google-analytics-*`, `google-maps-*`, `google-shopping-merchant-*`, `google-ads-*`, and `grafeas`.
- This is the Google Cloud client library family (`google-cloud-*`), distinct from the REST-only Google API Client Libraries (see `client-libraries-explained.md`) and from the `google-genai` Gemini SDK (`google-gemini-api` skill).
- Source: https://docs.cloud.google.com/python/docs/reference (retrieved 2026-11-16; CC BY 4.0)

## Related

- [nodejs-packages.md](./nodejs-packages.md)
- [rust-packages.md](./rust-packages.md)
- [client-libraries-explained.md](./client-libraries-explained.md)
