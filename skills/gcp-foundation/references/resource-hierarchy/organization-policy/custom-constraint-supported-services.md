---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/custom-constraint-supported-services
---

# Custom Constraint Supported Services

Which Google Cloud services support custom constraints, and where each service documents its resource types and fields. Each service defines the fields usable in a custom constraint condition; not all attributes are available.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/resource-manager/docs/organization-policy/creating-managing-custom-constraints (set up and check a constraint on a supported resource type):

```bash
gcloud org-policies set-custom-constraint CONSTRAINT_PATH
gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID
```

Find the supported `resourceTypes` / fields / methods (`CREATE`, `UPDATE`) on the per-service page below. Page URLs are relative to `https://docs.cloud.google.com/`.

## Options / Props

Deduplicated from the official table (the official table has one row per resource type; only the service, its documentation page, and launch status are kept here). Status GA unless marked Preview.

| Service | Per-service documentation | Status |
|---------|---------------------------|--------|
| Access Context Manager | access-context-manager/docs/custom-constraints | GA |
| AI Platform Training | vertex-ai/docs/training/custom-constraints | GA |
| AlloyDB for PostgreSQL | alloydb/docs/alloydb-custom-constraints | Preview |
| BigQuery sharing | bigquery/docs/analytics-hub-custom-constraints | Preview |
| API keys | api-keys/docs/custom-constraints | GA |
| Application Integration | application-integration/docs/custom-constraints | Preview |
| Artifact Registry | artifact-registry/docs/custom-constraints | GA |
| Cloud Armor | armor/docs/custom-constraints | GA |
| Artifact Analysis | artifact-analysis/docs/custom-constraints | GA |
| Backup for GKE | kubernetes-engine/docs/add-on/backup-for-gke/how-to/create-custom-constraints | GA |
| Backup and DR Service | backup-disaster-recovery/docs/customconstraints | GA |
| BigQuery | bigquery/docs/custom-constraints | GA |
| Cloud Bigtable Admin API | bigtable/docs/custom-constraints | GA |
| Binary Authorization | binary-authorization/docs/binary-authorization-custom-constraints | GA |
| BigQuery Migration Service | bigquery/docs/migration-custom-org-policies | Preview |
| BigQuery Data Transfer Service | bigquery/docs/transfer-custom-constraints | GA |
| Cloud Build | build/docs/custom-constraints | GA |
| Certificate Authority Service | resource-manager/docs/organization-policy/certificate-authority-service/docs/custom-constraints | GA |
| Contact Center as a Service | contact-center/ccai-platform/docs/ccaip-custom-constraints | Preview |
| Certificate Manager | certificate-manager/docs/custom-constraints | GA |
| Identity Platform | identity-platform/docs/admin/org-policy-custom-constraints | GA |
| Cloud Quotas | docs/quotas/custom-constraints | Preview |
| Cloud Run functions | functions/docs/securing/custom-constraints | GA |
| Cloud Run | run/docs/securing/custom-constraints | GA |
| Colab Enterprise | colab/docs/custom-constraints | Preview / GA |
| Cloud Composer | composer/docs/latest/create-custom-constraints | GA |
| Compute Engine | compute/docs/access/custom-constraints | GA |
| Resource Manager | resource-manager/docs/custom-constraints | Preview |
| Cloud Data Fusion | data-fusion/docs/how-to/create-custom-constraints | GA |
| Data Lineage API | dataplex/docs/lineage-custom-constraints | GA |
| Dataflow | dataflow/docs/custom-constraints | GA |
| Dataform | dataform/docs/create-custom-constraints | GA |
| Dataplex Universal Catalog | dataplex/docs/dataplex-custom-constraints | GA |
| Dataproc Metastore | dataproc-metastore/docs/org-policy-custom-constraints | GA |
| Dataproc | dataproc/docs/concepts/dataproc-custom-constraints | GA |
| Serverless for Apache Spark | dataproc-serverless/docs/guides/dataproc-serverless-custom-constraints | GA / Preview |
| Datastream | datastream/docs/custom-constraints | GA |
| Cloud Deploy | deploy/docs/custom-org-policy | GA |
| Developer Connect | developer-connect/docs/custom-constraints | GA |
| Database Migration Service | database-migration/docs/custom-constraints | GA |
| Cloud DNS | dns/docs/create-custom-constraints | GA |
| Essential Contacts | resource-manager/docs/essentialcontacts-custom-org-policies | GA |
| Eventarc | eventarc/standard/docs/custom-constraints, eventarc/advanced/docs/custom-constraints | GA |
| Filestore | filestore/docs/create-custom-constraints | GA |
| Firestore | firestore/docs/custom-constraints | GA |
| Cloud Next Generation Firewall | firewall/docs/custom-constraints, firewall/docs/custom-constraints-fw-policy | GA |
| GKE attached clusters | kubernetes-engine/multi-cloud/docs/attached/eks/how-to/setup-custom-constraints | GA |
| GKE on AWS | kubernetes-engine/multi-cloud/docs/aws/how-to/setup-custom-constraints | GA |
| GKE on Azure | kubernetes-engine/multi-cloud/docs/azure/how-to/setup-custom-constraints | GA |
| GKE | kubernetes-engine/docs/how-to/custom-org-policies | GA |
| GKE On-Prem API | kubernetes-engine/distributed-cloud/reference/custom-constraints | GA |
| Cloud Healthcare API | healthcare-api/docs/custom-org-policy | GA |
| Hub (GKE fleet) | resource types `gkehub.googleapis.com/` Feature, Fleet, Membership, MembershipBinding, MembershipFeature, Namespace, RBACRoleBinding, Scope | GA |
| Identity and Access Management | iam/docs/org-policy-custom-constraints, iam/docs/service-accounts-custom-constraints, iam/docs/workload-identity-federation-custom-constraints, iam/docs/managed-workload-identity-custom-constraints (Preview) | GA |
| Identity-Aware Proxy | iap/docs/custom-org-policies | GA |
| Infrastructure Manager | infrastructure-manager/docs/custom-constraints | GA |
| Cloud Interconnect | network-connectivity/docs/interconnect/how-to/custom-constraints | GA |
| Cloud Key Management Service | kms/docs/custom-org-policies | GA |
| Live Stream API | livestream/docs/custom-constraints | GA |
| Cloud Load Balancing | load-balancing/docs/custom-constraints (some via compute/docs/access/custom-constraints) | GA |
| Cloud Logging | logging/docs/custom-constraints | GA |
| Managed Service for Apache Kafka | managed-service-for-apache-kafka/docs/custom-constraints | GA |
| Service Management | service-infrastructure/docs/service-management/custom-constraints | Preview |
| Memorystore (Redis) | memorystore/docs/redis/custom-constraints | GA |
| Memorystore for Redis Cluster | memorystore/docs/cluster/custom-constraints | GA |
| Cloud Monitoring | monitoring/docs/custom-constraints | GA |
| Network Connectivity | network-connectivity/docs/network-connectivity-center/how-to/org-policy-constraints, vpc/docs/custom-constraints | GA |
| Private Service Connect | vpc/docs/custom-constraints | GA |
| Pub/Sub | pubsub/docs/custom-constraints | GA |
| reCAPTCHA | recaptcha/docs/custom-constraints | GA |
| Cloud Router, Cloud NAT | network-connectivity/docs/router/how-to/custom-constraints | GA |
| Web Security Scanner / Security Command Center | security-command-center/docs/org-policy-custom-constraints | GA |
| Security posture | security-command-center/docs/security-posture-custom-constraints | GA |
| Secret Manager | secret-manager/docs/secret-manager-custom-constraints | GA |
| Serverless VPC Access | vpc/docs/configure-serverless-vpc-access#custom-constraints | GA |
| Service Extensions | service-extensions/docs/custom-constraints | GA |
| Cloud Service Mesh | service-mesh/v1.25/docs/service-routing/custom-constraints | GA |
| Spanner | spanner/docs/spanner-custom-constraints | GA |
| Cloud SQL | sql/docs/mysql/org-policy/custom-org-policy | GA |
| Secure Source Manager | secure-source-manager/docs/custom-constraints | GA |
| Cloud Storage | storage/docs/custom-constraints | GA |
| Storage Transfer Service | storage-transfer/docs/custom-constraints | GA |
| Vector Search | vertex-ai/docs/vector-search/custom-constraints | GA |
| Vertex AI | vertex-ai/docs/prediction/custom-constraints, vertex-ai/docs/predictions/custom-constraints | Preview |
| Vertex ML Metadata | vertex-ai/docs/ml-metadata/use-custom-constraints | GA |
| Vertex AI Pipelines | vertex-ai/docs/pipelines/use-custom-constraints | Preview |
| Video Stitcher API | video-stitcher/docs/how-to/create-custom-constraints | GA |
| Virtual Private Cloud | vpc/docs/custom-constraints | GA |
| Cloud VPN | network-connectivity/docs/vpn/how-to/custom-constraints | GA |
| Workflows | workflows/docs/custom-constraints | GA |
| Cloud Workstations | workstations/docs/custom-constraints | GA |

## Notes

- Per-service pages define the resource types, fields, and method support; consult them before writing a CEL condition.
- Sample custom constraints are in the custom organization policy library on GitHub (GoogleCloudPlatform/professional-services).
- Security Command Center can scan for organization policy findings (see the Organization Policy vulnerability findings page); KMS and Secret Manager custom constraints are enforced in gcp-security territory but constraint authoring stays here.
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/custom-constraint-supported-services
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [custom-constraints.md](./custom-constraints.md)
- [overview.md](./overview.md)
