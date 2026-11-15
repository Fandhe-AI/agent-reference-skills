---
source: https://docs.cloud.google.com/iam/docs/service-agents
---

# Service Agents Reference

Service agents are Google-managed service accounts that let a Google Cloud service access your resources. The official page lists every public service's agent email domain and the role granted automatically on the project. This page keeps the conventions and representative entries; consult the official page for the full table (hundreds of rows).

## Signature / Usage

Email address patterns seen on the page (`gcp-sa-*` domain differs per service):

```text
service-PROJECT_NUMBER@gcp-sa-SERVICE.iam.gserviceaccount.com           (project-level, common form)
service-pPROJECT_NUMBER@gcp-sa-accessapproval.iam.gserviceaccount.com   (project)
service-fFOLDER_NUMBER@gcp-sa-accessapproval.iam.gserviceaccount.com    (folder)
service-oORGANIZATION_NUMBER@gcp-sa-accessapproval.iam.gserviceaccount.com (organization)
service-folder-FOLDER_NUMBER@gcp-sa-logging.iam.gserviceaccount.com
service-org-ORGANIZATION_NUMBER@gcp-sa-logging.iam.gserviceaccount.com
c-PROJECT_NUMBER-IDENTIFIER@gcp-sa-alloydb.iam.gserviceaccount.com      (per-resource agent)
```

## Options / Props

Representative service agents (email, granted role on the project):

| Service | Service agent email | Role |
|---|---|---|
| Cloud Pub/Sub (`pubsub.googleapis.com`) | `service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com` | `roles/pubsub.serviceAgent` |
| Compute Engine (`compute.googleapis.com`) | `service-PROJECT_NUMBER@compute-system.iam.gserviceaccount.com` | `roles/compute.serviceAgent` |
| Kubernetes Engine (`container.googleapis.com`) | `service-PROJECT_NUMBER@container-engine-robot.iam.gserviceaccount.com` | `roles/container.serviceAgent` |
| Kubernetes Engine node agent | `service-PROJECT_NUMBER@gcp-sa-gkenode.iam.gserviceaccount.com` | `roles/container.defaultNodeServiceAgent` |
| Cloud Build (`cloudbuild.googleapis.com`) | `service-PROJECT_NUMBER@gcp-sa-cloudbuild.iam.gserviceaccount.com` | `roles/cloudbuild.serviceAgent` |
| Cloud KMS (`cloudkms.googleapis.com`) | `service-PROJECT_NUMBER@gcp-sa-cloudkms.iam.gserviceaccount.com` | `roles/cloudkms.serviceAgent` |
| Artifact Registry | `service-PROJECT_NUMBER@gcp-sa-artifactregistry.iam.gserviceaccount.com` | `roles/artifactregistry.serviceAgent` |
| Cloud Dataflow | `service-PROJECT_NUMBER@dataflow-service-producer-prod.iam.gserviceaccount.com` | `roles/dataflow.serviceAgent` |
| Cloud SQL (`sqladmin.googleapis.com`) | `service-PROJECT_NUMBER@gcp-sa-cloud-sql.iam.gserviceaccount.com` | `roles/cloudsql.serviceAgent` |
| Cloud Scheduler | `service-PROJECT_NUMBER@gcp-sa-cloudscheduler.iam.gserviceaccount.com` | `roles/cloudscheduler.serviceAgent` |
| Cloud Spanner | `service-PROJECT_NUMBER@gcp-sa-spanner.iam.gserviceaccount.com` | `roles/spanner.serviceAgent` |
| Eventarc | `service-PROJECT_NUMBER@gcp-sa-eventarc.iam.gserviceaccount.com` | `roles/eventarc.serviceAgent` |
| Vertex AI primary (`aiplatform.googleapis.com`) | `service-PROJECT_NUMBER@gcp-sa-aiplatform.iam.gserviceaccount.com` | `roles/aiplatform.serviceAgent` |
| App Engine standard | `service-PROJECT_NUMBER@gcp-gae-service.iam.gserviceaccount.com` | `roles/appengine.serviceAgent` |
| Secret Manager | `service-PROJECT_NUMBER@gcp-sa-secretmanager.iam.gserviceaccount.com` | None |
| Cloud Bigtable | `service-PROJECT_NUMBER@gcp-sa-bigtable.iam.gserviceaccount.com` | None |

## Notes

- Google Cloud creates a service agent at some point after you enable and use an API that needs one. For declarative or policies-as-code setups, you can trigger service agent creation yourself before use (see create-service-agents) after identifying the agent.
- Warning from the page: grant a service agent role only to service agents. Some service agent roles are very powerful and their permissions can change without notice; use a predefined or custom role for other principals.
- Service agents are added at any time; creation time and email format are subject to change.
- Agents listed as "primary" are the main agent for the API; others are secondary, folder or organization scoped, or per-resource. Some agents are granted no role.
- Deny policies: do not deny permissions to service agents (it can break services); exempt them with the `type/ServiceAgent` principal set (see principal-identifier-formats).
- Source: https://docs.cloud.google.com/iam/docs/service-agents
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [principal-identifier-formats.md](../principal-identifiers/principal-identifier-formats.md)
- [troubleshoot-org-policies.md](../iam-troubleshooting/troubleshoot-org-policies.md)
