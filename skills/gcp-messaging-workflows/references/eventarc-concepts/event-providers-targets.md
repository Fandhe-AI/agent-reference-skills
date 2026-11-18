---
source: https://docs.cloud.google.com/eventarc/standard/docs/event-providers-targets
---

# Eventarc Standard event providers and destinations

Supported events are routed from an event provider (the source) to an event destination (the target). Choose a source, target, and event type, then create an Eventarc Standard trigger. With the gcloud CLI you can list Eventarc providers and retrieve their details, including supported events.

## Signature / Usage

### Create a trigger for a Pub/Sub direct event

```bash
gcloud eventarc triggers create trigger-pubsub \
    --destination-run-service=hello \
    --destination-run-region=us-central1 \
    --location=us-central1 \
    --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
    --transport-topic=projects/your-projectid/topics/your-topic
```

## Options / Props

### Sources, targets, and event types

| Item | Supported values |
|---|---|
| Source (event provider) | Google sources (events sent from Google providers directly or through Cloud Audit Logs entries); third-party (events from eligible third-party providers) |
| Target (event destination) | Cloud Run functions (using the Cloud Run functions interface); Cloud Run; Google Kubernetes Engine (GKE), including public endpoints of private and public services in a GKE cluster; internal HTTP endpoints in a VPC network; Workflows |
| Event type | Cloud Audit Logs events (a log is produced through Cloud Audit Logs); direct events (unmediated, such as an object update in Cloud Storage or a message published to Pub/Sub); third-party events (non-Google provider that offers an Eventarc source) |

### Providers with audit log events only

| Provider | Provider | Provider | Provider |
|---|---|---|---|
| Access Approval | Access Context Manager | AI Platform (under Vertex AI) | analyticshub.googleapis.com |
| API Keys | Apigee | Apigee Connect | App Engine |
| Artifact Analysis | Artifact Registry | Assured Workloads | Bare Metal Solution |
| BigQuery | BigQuery BI Engine | BigQuery Connection API | BigQuery Data Transfer |
| BigQuery Migration | BigQuery Reservation | bigquerydatapolicy.googleapis.com | Binary Authorization |
| Certificate Authority | Cloud AI Data Labeling | Cloud Asset | Cloud AutoML (under Vertex AI) |
| Cloud Bigtable Admin | Cloud Billing | Cloud Build | Cloud Datastore |
| Cloud Deployment Manager | Cloud Dialogflow | Cloud DNS | Cloud Error Reporting |
| Cloud Filestore | Cloud Firebase | Cloud Gaming | Cloud Healthcare |
| Cloud IAM | Cloud IAM Service Account Credentials | Cloud Identity | Cloud Key Management Service (KMS) |
| Cloud Life Sciences | Cloud Logging | Cloud Machine Learning Engine | Cloud Managed Microsoft Active Directory |
| Cloud Monitoring | Cloud OS Config | Cloud OS Login | Cloud Profiler |
| Cloud Resource Manager | Cloud Retail | Cloud Run | Cloud Scheduler |
| Cloud Search | Cloud Service Mesh | Cloud Source Repositories | Cloud SQL |
| Cloud Tasks | Cloud TPU | Cloud Trace | Cloud Translation |
| Cloud Video Intelligence | Cloud Vision | Compute Engine | Contact Center AI |
| contactcenteraiplatform.googleapis.com | Data Pipeline | dataform.googleapis.com | datalineage.googleapis.com |
| documentai.googleapis.com | Essential Contacts | Firebase Storage | GCE Serial Port |
| Google Domains | Google Kubernetes Engine (GKE) | Google Workspace Admin | Identity Toolkit |
| Identity-Aware Proxy (IAP) | Managed Service for Apache Airflow (formerly Cloud Composer) | Managed Service for Apache Spark (formerly Cloud Dataproc) | Mesh certificate authority |
| migrationcenter.googleapis.com | Network Security | OAuth 2.0 | On-Demand Scanning |
| Pub/Sub Lite | publicca.googleapis.com | reCAPTCHA Enterprise | Recommendations |
| Recommender | Remote Build Execution | Resource Settings | Secret Manager |
| securedlandingzone.googleapis.com | Security Command Center | Security Token Service API | Sensitive Data Protection |
| Serverless VPC Access | Service Consumer Management | Service Directory | Service Management |
| Service Usage | timeseriesinsights.googleapis.com | Transparency and Control Center Audit Logging | VMware Engine |
| Web Security Scanner | Workflow executions |  |  |

### Providers with direct events

| Provider | Direct events | Audit logs |
|---|---|---|
| AlloyDB for PostgreSQL | Yes | Yes |
| API Gateway | Yes | No |
| Apigee API hub | Yes | No |
| Apigee Registry | Yes | No |
| Backup for GKE | Yes | No |
| Batch | Yes | Yes |
| BeyondCorp | Yes | Yes |
| Certificate Manager | Yes | No |
| Cloud Data Fusion | Yes | Yes |
| Cloud Deploy | Yes | Yes |
| Cloud Firestore | Yes | Yes |
| Cloud Memorystore for Memcached | Yes | Yes |
| Cloud Pub/Sub | Yes | Yes |
| Cloud Run functions (formerly Cloud Functions) | Yes | Yes |
| Cloud Speech-to-Text | Yes | No |
| Cloud Storage | Yes | Yes |
| Database Migration | Yes | Yes |
| Dataflow | Yes | No |
| Dataproc Metastore | Yes | Yes |
| Datastream | Yes | Yes |
| Eventarc | Yes (preview) | Yes |
| Firebase Alerts | Yes | No |
| Firebase Authentication | Yes (preview) | No |
| Firebase Data Connect | Yes | Yes |
| Firebase Realtime Database | Yes (preview) | Yes |
| Firebase Remote Config | Yes | No |
| Firebase Test Lab | Yes | No |
| Gemini Cloud Assist | Yes (preview) | Yes |
| GKE Hub | Yes | Yes |
| Google Cloud Memorystore for Redis | Yes | Yes |
| Knowledge Catalog (formerly Cloud Dataplex) | Yes | No |
| Network Connectivity | Yes | Yes |
| Network Management | Yes | Yes |
| Network Services | Yes | Yes |
| Notebooks | Yes | Yes |
| Transcoder | Yes | No |
| Vision AI | Yes | Yes |
| VM Migration | Yes | Yes |
| Workflows | Yes | Yes |

### Third-party providers (preview)

| Provider | Destinations listed |
|---|---|
| Check Point CloudGuard | Cloud Run, GKE, Workflows |
| Datadog | Cloud Run, GKE, Workflows |
| ForgeRock | Cloud Run, GKE, Workflows |
| Lacework | Cloud Run, GKE, Workflows |

## Notes

- Providers with audit log events only: Event type: audit log events. Destinations: Cloud Run, GKE, Workflows (and the internal HTTP endpoint trigger).
- Providers with direct events: Every provider below is listed for the Cloud Run, GKE, and Workflows destinations in the source; "Audit logs" says whether audit log events are also supported.
- Preview (Pre-GA Offerings Terms, "as is", limited support) while Eventarc is GA: sources: events sent directly from Eventarc, Firebase Authentication, Firebase Realtime Database, Gemini Cloud Assist; source: third-party events sent directly from third-party providers; target: GKE as an event destination; target: internal HTTP endpoints in a VPC network as an event destination.
- If both direct and audit log events are supported for the event you want to route, the source recommends a trigger that filters for the direct event (see Event routes).
- The Internal HTTP endpoint destination is listed for "All event providers" with audit log, direct, and third-party events; see "Route events to an internal HTTP endpoint in a VPC network" in the Standard docs.
- Cloud Source Repositories: effective June 17, 2024 it is not available to new customers; organizations that used it before June 17, 2024 are not affected. New projects not connected to an organization cannot enable the API.
- Per-provider instruction pages (`.../eventarc/standard/docs/run/route-trigger-*`) and the supported-events reference (https://docs.cloud.google.com/eventarc/docs/reference/supported-events) are outside this page. The source table links each provider and event type to them; the provider tables above condense it.
- Snippet taken from https://docs.cloud.google.com/eventarc/docs/understand-locations (the source page has no code).
- Source: https://docs.cloud.google.com/eventarc/standard/docs/event-providers-targets (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [eventarc-standard-overview.md](./eventarc-standard-overview.md)
- [event-types.md](./event-types.md)
- [understand-locations.md](./understand-locations.md)
