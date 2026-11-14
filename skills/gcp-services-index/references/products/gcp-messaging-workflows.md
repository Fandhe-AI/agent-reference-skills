---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-messaging-workflows

## Signature / Usage

Owner skill: `gcp-messaging-workflows` (status: 未収録（予定）). gcloud groups: `eventarc`, `managed-kafka`, `orchestration-pipelines`, `pubsub`, `workflows`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| Cloud Integrations | `integrations.googleapis.com` (v1, v2) | — | — | `integrations.` | 20 | — | — | https://cloud.google.com/application-integration | 未収録（予定） |
| Connectors | `connectors.googleapis.com` (v1, v2) | Enables users to create and manage connections to Google Cloud services and third-party business applications using the Connectors interface. | — | `connectors.` | 14 | — | — | https://cloud.google.com/apigee/docs/api-platform/connectors/about-connectors | 未収録（予定） |
| Data Connectors | — | — | — | `dataconnectors.` | 6 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/dataconnectors | 未収録（予定） |
| Eventarc | `eventarc.googleapis.com` (v1) | Build event-driven applications on Google Cloud Platform. | `eventarc` | `eventarc.` | 11 | — | — | https://cloud.google.com/eventarc | 未収録（予定） |
| Google Cloud Managed Service for Apache Kafka | `managedkafka.googleapis.com` (v1) | Manage Apache Kafka clusters and resources. | `managed-kafka` | `managedkafka.` | 14 | — | — | https://cloud.google.com/managed-service-for-apache-kafka/docs | 未収録（予定） |
| Pub/Sub | `pubsub.googleapis.com` (v1, v1beta1a, v1beta2) | Provides reliable, many-to-many, asynchronous messaging between applications. | `pubsub` | `pubsub.` | 6 | — | — | https://cloud.google.com/pubsub/docs | 未収録（予定） |
| Pub/Sub Lite | `pubsublite.googleapis.com` (v1) | — | — | `pubsublite.` | 6 | — | Deprecated | https://cloud.google.com/pubsub/lite/docs | 未収録（予定） |
| Workflows | `workflows.googleapis.com` (v1, v1beta) | Manage workflow definitions. To execute workflows and manage executions, see the Workflows Executions API. | `workflows` | `workflows.` | 5 | — | — | https://cloud.google.com/workflows | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Lifecycle (Pub/Sub Lite): Deprecated. Dates: Effective January 31, 2027 turned down; unavailable to new customers after September 24, 2024; inactive-use access removed from July 15, 2025. Successor: Google Cloud Managed Service for Apache Kafka or Pub/Sub. Source: https://docs.cloud.google.com/pubsub/lite/docs.md.txt (retrieved 2026-11-14).
- Lifecycle information covers only products confirmed against official pages as of 2026-11-14 (see `../lifecycle/shutdown-and-deprecated.md`); a product without a Lifecycle entry is not confirmed to be available. Check the official product page before use.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
