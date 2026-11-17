---
source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/supported-services
---

# Supported services

Lists the Google Cloud services that support Access Approval. GA means approval requests are generally available for the service; Preview means requests are supported but might change in backward-incompatible ways and are not subject to any SLA or deprecation policy.

## Signature / Usage

Enroll all supported services for a folder:

Adapted (not in the official docs): the help's `--folder=f1` is replaced by the `FOLDER_NUMBER` placeholder, because the gcloud 593.0.0 help defines `--folder` as a folder number (gcloud rejects `f1` with `Invalid value for [folder]: f1`).

```bash
gcloud access-approval settings update --folder=FOLDER_NUMBER \
  --enrolled_services=all
```

## Options / Props

### Supported Google Cloud services

| Supported service | Launch stage | Notes |
|---|---|---|
| Access Context Manager | GA | None |
| Access Transparency | GA | None |
| Agent Assist | GA | None |
| Agent Identity | GA | None |
| Agent Registry | GA | None |
| Agent Runtime on Gemini Enterprise Agent Platform | GA | None |
| Agent Search | GA | None |
| AlloyDB for PostgreSQL | GA | None |
| Apigee | GA | Not supported: Apigee portal; features in the Preview launch stage. Apigee Hybrid customers must upgrade to the latest version for full Access Approval support. |
| API keys | GA | None |
| App Engine | GA | Cloud Storage and Cloud SQL are the only compatible storage backends for App Engine supported by Access Approval. |
| App Hub | GA | None |
| App Topology | GA | Access Approval supports One Graph. |
| Application Design Center | GA | None |
| Application Integration | GA | None |
| Artifact Analysis | GA | None |
| Artifact Registry | GA | None |
| Automotive AI Agent | GA | None |
| Backup for GKE | GA | None |
| Backup and DR Service | GA | Workloads that depend on a management console and backup/recovery appliances are not supported. |
| BigQuery | GA | Some information about queries, tables, and datasets might not generate an Access Approval request when accessed by Cloud Customer Care. Viewing query text, table names, dataset names, and dataset access control lists might not generate requests (read-only pathway). Viewing query results and table or dataset data still generates Access Transparency logs. |
| BigQuery Data Transfer Service | GA | None |
| Bigtable | GA | None |
| Binary Authorization | GA | None |
| Certificate Authority Service | GA | None |
| Certificate Manager | GA | None |
| Chrome Enterprise Premium | GA | Supports the Chrome Enterprise Premium secure gateway. |
| Cloud Asset Inventory | GA | None |
| Audit Manager | GA | None |
| Cloud Billing | Preview | None |
| Cloud Build | GA | None |
| Managed Service for Apache Airflow | GA | None |
| Cloud Data Fusion | GA | None |
| Cloud Deploy | GA | None |
| Cloud DNS | GA | None |
| Cloud Domains | GA | None |
| Cloud External Key Manager (Cloud EKM) | GA | None |
| Fault Injection Testing | GA | None |
| Cloud Run functions | GA | None |
| Cloud Healthcare API | GA | None |
| Cloud Interconnect | GA | None |
| Cloud Key Management Service (Cloud KMS) | GA | None |
| Cloud Logging | GA | None |
| Cloud NAT | GA | None |
| Cloud Next Generation Firewall | GA | None |
| Cloud OS Login API | GA | None |
| Cloud Quotas | GA | None |
| Cloud Run | GA | None |
| Cloud Scheduler | GA | None |
| Cloud SQL | GA | None |
| Cloud Service Mesh | GA | None |
| Cloud Storage | GA | None |
| Cloud Tasks | GA | None |
| Cloud TPU | GA | None |
| Cloud Trace | GA | None |
| Cloud VPN | GA | None |
| Cloud Vision API | Preview | None |
| Cloud Workstations | GA | None |
| Compliance Manager | GA | None |
| Compute Engine | GA | None |
| Connect Agent | GA | None |
| Customer Experience Agent Studio | GA | None |
| Customer Experience Insights | GA | None |
| Database Center | GA | None |
| Database Insights API | GA | None |
| Database Migration Service | GA | None |
| Dataflow | GA | None |
| Dataform | GA | None |
| Knowledge Catalog | GA | None |
| Managed Service for Apache Spark | GA | None |
| Datastream | GA | None |
| Developer Connect | GA | None |
| Database Migration Service | GA | None |
| Google Distributed Cloud | GA | None |
| DNS Armor | GA | None |
| Document AI | GA | None |
| Eventarc | GA | None |
| External passthrough Network Load Balancer | GA | None |
| Filestore | GA | None |
| Firebase App Hosting | Preview | None |
| Firebase Data Connect | GA | None |
| Firebase Security Rules | GA | None |
| Firestore | GA | None |
| Flow Analyzer | GA | None |
| Gemini Data Analytics | GA | None |
| Gemini Enterprise | GA | None |
| Gemini Enterprise Agent Platform | GA | Currently supported: Online prediction; Batch prediction; Agent Platform Model Registry; AI Platform Training; Gemini Enterprise Agent Platform Pipelines; Agent Platform Model Monitoring; Vector Search; Gemini Enterprise Agent Platform model tuning. See the limitations of Access Transparency in Agent Platform. |
| Gemini Enterprise for Customer Experience | GA | None |
| GKE Connect | GA | None |
| GKE Hub | GA | None |
| GKE Hub API | GA | None |
| GKE Identity Service | GA | None |
| Google Cloud Armor | GA | Available for regional Cloud Armor security policies. Global Cloud Armor security policies won't generate Access Approval requests. |
| Google Cloud Managed Lustre | GA | None |
| Google Cloud Managed Service for Apache Kafka | GA | None |
| Google Cloud NetApp Volumes | GA | None |
| Google Cloud Observability | GA | None |
| Google Security Operations SIEM | GA | Available by request: contact Cloud Customer Care with the product name and ask for Access Approval to be enabled; confirm in Access Approval settings by checking the list of products. |
| Google Security Operations SOAR | GA | Available by request (same procedure as SIEM). |
| Google Kubernetes Engine | GA | None |
| Cloud HSM | GA | None |
| Identity and Access Management (IAM) | GA | Supports SCIM (System for Cross-domain Identity Management) through Workforce Identity Federation. |
| Identity-Aware Proxy | GA | None |
| Image streaming | GA | None |
| Infrastructure Manager | GA | None |
| Integration Connectors | GA | None |
| Internal passthrough Network Load Balancer | GA | None |
| Looker (Google Cloud core) | GA | None |
| Data Studio | GA | None |
| Memorystore for Redis | GA | None |
| Memorystore for Redis Cluster | GA | None |
| Memorystore for Valkey | GA | None |
| Model Armor | GA | None |
| Cloud Monitoring | GA | None |
| NCC Gateway | GA | None |
| Network Connectivity Center | GA | None |
| Org Lifecycle API | GA | None |
| Organization Policy Service | GA | None |
| Parameter Manager | GA | None |
| Persistent Disk | GA | None |
| Privileged Access Manager | GA | None |
| Pub/Sub | GA | None |
| regional external Application Load Balancer | GA | None |
| regional external proxy Network Load Balancer | GA | None |
| regional internal Application Load Balancer | GA | None |
| regional internal proxy Network Load Balancer | GA | None |
| Resource Manager | GA | None |
| Secret Manager | GA | None |
| Secure Source Manager | GA | None |
| Secure Web Proxy | GA | None |
| Security Command Center | GA | Supports the Security Command Center Premium tier. |
| Sensitive Data Protection | GA | None |
| Serverless VPC Access | GA | None |
| Service connectivity automation | GA | None |
| Service Management | GA | None |
| Service Usage | GA | None |
| Spanner | GA | None |
| Speaker ID | GA | None |
| Speech-to-Text | GA | None |
| Storage Intelligence | GA | None |
| Storage Transfer Service | GA | None |
| Text-to-Speech | GA | None |
| Unified Maintenance | GA | None |
| Virtual Private Cloud (VPC) | GA | None |
| VM Manager | GA | None |
| Web Risk | GA | None |
| Workflows | GA | None |
| Workforce Identity Federation | GA | None |
| Workload Identity Federation | GA | None |

## Notes

- Preview services in this list: Cloud Billing, Cloud Vision API, Firebase App Hosting. Everything else is GA.
- Enrollment can cover all supported services (default), GA services only, or selected services (see the overview page).
- Rows follow the source order; "None" means the source lists no note. The source lists Database Migration Service twice (both GA, no notes); both rows are kept.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/access-approval/settings/update (gcloud 593.0.0 help).
- Corrected from the official docs: the help example was `gcloud access-approval settings update --folder=f1 \` / `--enrolled_services=all`. The help states that for project and folder enrollments only `all` is supported for `--enrolled_services`; a comma-separated list of services applies to organizations.
- The source's links per service are omitted; see the official page for each service's documentation URL. Release notes: `https://docs.cloud.google.com/assured-workloads/access-approval/docs/release-notes`.
- Source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/supported-services (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-approval-overview.md](./access-approval-overview.md)
- [review-approve-access-requests-google-keys.md](./review-approve-access-requests-google-keys.md)
