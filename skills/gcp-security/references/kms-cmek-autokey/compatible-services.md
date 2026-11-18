---
source: https://docs.cloud.google.com/kms/docs/compatible-services
---

# Compatible services

List of Google Cloud services that integrate with Cloud KMS: CMEK integrations (data at rest encrypted with your key), CMEK-compliant services (ephemeral in-memory keys only), and other ways to use Cloud KMS. All CMEK-integrated services in the list support software and hardware (HSM) keys.

## Signature / Usage

Cloud Storage with a CMEK as the bucket default key (the key path is an Autokey key; any CMEK key path works the same way):

```bash
gcloud storage buckets create gs://BUCKET_NAME \
    --location=LOCATION \
    --default-encryption-key=projects/KEY_PROJECT_ID/locations/LOCATION/keyRings/autokey/cryptoKeys/KEY_NAME
```

## Options / Props

### CMEK integrations

| Service | Protected with CMEK | EKM | Topic |
|---|---|---|---|
| Agent Assist | Data at rest | Yes | agent-assist/docs/cmek |
| Agent Retrieval | Data associated with Collections | Yes | gemini-enterprise-agent-platform/build/vector-search-2/cmek |
| Agent Search | Data at rest | No | generative-ai-app-builder/docs/cmek |
| AlloyDB for PostgreSQL | Data written to databases | Yes | alloydb/docs/cmek |
| Anti Money Laundering AI | Data in AML AI instance resources | No | financial-services/anti-money-laundering/docs/cmek |
| Apigee | Data at rest | No | apigee/docs/api-platform/get-started/cmek-concepts |
| Apigee API hub | Data at rest | Yes | apigee/docs/apihub/provision#step-encryption |
| Application Integration | Data at rest | Yes | application-integration/docs/cmek |
| Artifact Registry | Data in repositories | Yes | artifact-registry/docs/cmek |
| Backup and DR Service | Backup Vault Container | Yes | backup-disaster-recovery/docs/concepts/cmek#backup-vault-container |
| Backup and DR Service | Backups at rest | Yes | backup-disaster-recovery/docs/concepts/cmek#backups-at-rest |
| Backup for GKE | Data in Backup for GKE | Yes | kubernetes-engine/docs/add-on/backup-for-gke/concepts/about-cmek |
| BigQuery | Data in BigQuery | Yes | bigquery/docs/customer-managed-encryption |
| Bigtable | Data at rest | Yes | bigtable/docs/cmek |
| Cloud Data Fusion | Environment data | Yes | data-fusion/docs/how-to/customer-managed-encryption-keys |
| Cloud Healthcare API | Cloud Healthcare API datasets | Yes | healthcare-api/docs/cmek |
| Cloud Logging | Data in the Log Router | Yes | logging/docs/routing/managed-encryption |
| Cloud Logging | Data in Logging storage | Yes | logging/docs/routing/managed-encryption-storage |
| Cloud Run | Container image | Yes | run/docs/securing/using-cmek |
| Cloud Run functions | Data in Cloud Run functions | Yes | functions/docs/securing/cmek |
| Cloud SQL | Data written to databases | Yes | sql/docs/mysql/configure-cmek |
| Cloud SQL | Standard and enhanced backups | Yes | sql/docs/mysql/backup-recovery/backups |
| Cloud Storage | Data in storage buckets | Yes | storage/docs/encryption/using-customer-managed-keys |
| Cloud Tasks | Task body and header at rest | Yes | tasks/docs/use-cmek |
| Cloud TPU | Persistent disks | No | tpu/docs/cmek-tpu |
| Cloud Workstations | Data on VM disks | Yes | workstations/docs/encrypt-workstation-resources |
| Colab Enterprise | Runtimes and notebook files | No | colab/docs/cmek |
| Compute Engine | Persistent disks | Yes | compute/docs/disks/customer-managed-encryption#encrypt_a_new_persistent_disk_with_cmek |
| Compute Engine | Snapshots | Yes | compute/docs/disks/customer-managed-encryption#create_snapshot |
| Compute Engine | Custom images | Yes | compute/docs/disks/customer-managed-encryption#encrypt_an_imported_image |
| Compute Engine | Machine images | Yes | compute/docs/machine-images/create-machine-images#create-image-from-instance |
| Conversational Analytics API | DataAgent resources (context, instructions, examples) | No | gemini/data-agents/conversational-analytics-api/cmek#protect-data-agent |
| Conversational Analytics API | Conversation resources (messages, state history) | No | gemini/data-agents/conversational-analytics-api/cmek#protect-conversation |
| Customer Experience Insights | Data at rest | Yes | contact-center/insights/docs/cmek |
| Data Studio | Data at rest | Yes | data-studio/cmek |
| Database Migration Service Homogeneous Migrations | MySQL migrations - data written to databases | Yes | sql/docs/mysql/configure-cmek |
| Database Migration Service Homogeneous Migrations | PostgreSQL migrations - Data written to databases | Yes | sql/docs/postgres/configure-cmek |
| Database Migration Service Homogeneous Migrations | PostgreSQL to AlloyDB migrations - Data written to databases | Yes | alloydb/docs/use-cmek |
| Database Migration Service Homogeneous Migrations | SQL Server migrations - Data written to databases | Yes | sql/docs/sqlserver/configure-cmek |
| Database Migration Service Heterogeneous Migrations | Oracle to PostgreSQL data at rest | Yes | database-migration/docs/oracle-to-postgresql/cmek-for-migration-jobs |
| Dataflow | Pipeline state data | Yes | dataflow/docs/guides/customer-managed-encryption-keys |
| Dataform | Data in repositories | Yes | dataform/docs/cmek |
| Dataproc Metastore | Data at rest | Yes | dataproc-metastore/docs/cmek |
| Datastream | Data in transit | Yes | datastream/docs/use-cmek |
| Dialogflow CX | Data at rest | Yes | dialogflow/cx/docs/concept/cmek |
| Document AI | Data at rest and data in use | Yes | document-ai/docs/cmek |
| Eventarc Advanced (Preview) | Data at rest | Yes | eventarc/advanced/docs/use-cmek |
| Eventarc Standard | Data at rest | Yes | eventarc/docs/use-cmek |
| Filestore | Data at rest | Yes | filestore/docs/cmek |
| Firestore | Data at rest | Yes | firestore/docs/use-cmek |
| Gemini Code Assist | Data at rest | No | gemini/docs/codeassist/encrypt-data-cmek |
| Gemini Enterprise | Data at rest | No | agentspace/agentspace-enterprise/docs/cmek |
| Gemini Enterprise - Gemini Notebook for business | Data at rest | No | agentspace/notebooklm-enterprise/docs/cmek |
| Google Cloud Managed Lustre | Data at rest | Yes | managed-lustre/docs/cmek |
| Google Cloud Managed Service for Apache Kafka | Data associated with topics | Yes | managed-service-for-apache-kafka/docs/encryption |
| Google Cloud NetApp Volumes | Data at rest | Yes | netapp/volumes/docs/configure-and-use/cmek/create-cmek-policy |
| Google Cloud Observability (Preview) | Data at rest | Yes | stackdriver/docs/observability/set-defaults-for-observability-buckets |
| Google Distributed Cloud | Data on Edge nodes | Yes | distributed-cloud/edge/latest/docs/security#storage |
| Google Kubernetes Engine | Data on VM disks | Yes | kubernetes-engine/docs/how-to/using-cmek |
| Google Kubernetes Engine | Application-layer secrets | Yes | kubernetes-engine/docs/how-to/encrypting-secrets |
| Integration Connectors | Data at rest | Yes | integration-connectors/docs/encryption |
| Knowledge Catalog | Data at rest | Yes | dataplex/docs/cmek |
| Looker (Google Cloud core) | Data at rest | Yes | looker/docs/looker-core-cmek |
| Managed Service for Apache Airflow | Environment data | Yes | composer/docs/cmek |
| Managed Service for Apache Spark | Cluster data on VM disks | Yes | dataproc/docs/concepts/configuring-clusters/customer-managed-encryption |
| Managed Service for Apache Spark | Serverless data on VM disks | Yes | dataproc-serverless/docs/guides/cmek-serverless |
| Memorystore for Redis | Data at rest | Yes | memorystore/docs/redis/cmek |
| Memorystore for Redis Cluster | Data at rest | Yes | memorystore/docs/cluster/use-cmek |
| Memorystore for Valkey | Data at rest | Yes | memorystore/docs/valkey/use-cmek |
| Migrate to Virtual Machines | Data migrated from VMware, AWS, and Azure VM sources | Yes | migrate/virtual-machines/docs/5.0/migrate/cmek#migration-data |
| Migrate to Virtual Machines | Data migrated from disk and machine image sources | Yes | migrate/virtual-machines/docs/5.0/migrate/cmek#target-disk-machine-images |
| Migrate to Virtual Machines | Data on target VM instances and VM disks | Yes | migrate/virtual-machines/docs/5.0/migrate/cmek#data-target-vm-vm-disks |
| Parameter Manager | Parameter version payloads | Yes | secret-manager/parameter-manager/docs/cmek |
| Pub/Sub | Data associated with topics | Yes | pubsub/docs/cmek |
| Secret Manager | Secret payloads | Yes | secret-manager/docs/cmek |
| Secure Source Manager | Instances | Yes | secure-source-manager/docs/cmek |
| Security Command Center | Data at rest | Yes | security-command-center/docs/cmek |
| Service Extensions (Preview) | Plugins data | No | service-extensions/docs/cmek |
| Spanner | Data at rest | Yes | spanner/docs/cmek |
| Speech-to-Text | Data at rest | Yes | speech-to-text/v2/docs/encryption |
| Vector Search | Data at rest | No | gemini-enterprise-agent-platform/machine-learning/general/cmek |
| Vertex AI | Data associated with resources | Yes | vertex-ai/docs/general/cmek |
| Vertex AI Workbench managed notebooks (Deprecated) | User data at rest | No | vertex-ai/docs/workbench/managed/cmek |
| Vertex AI Workbench user-managed notebooks (Deprecated) | Data on VM disks | No | vertex-ai/docs/workbench/user-managed/cmek |
| Vertex AI Workbench instances | Data on VM disks | Yes | vertex-ai/docs/workbench/instances/cmek |
| Workflows | Data at rest | Yes | workflows/docs/use-cmek |
| Workload Manager | Custom rule type evaluation data | Yes | workload-manager/docs/evaluate/custom-rules/enable-cmek |

### CMEK-compliant services

| Service | Topic (docs.cloud.google.com/) |
|---|---|
| API Gateway | api-gateway/docs/cmek |
| Cloud Build | build/docs/securing-builds/cmek |
| Cloud Trace | trace/docs/storage-overview#obs-data-residency |
| Container Registry | container-registry/docs/using-encryption-keys |
| Cloud Vision | vision/docs/cmek |
| Storage Transfer Service | storage-transfer/docs/cmek |

### Other integrations with Cloud KMS

| Product | Topic (docs.cloud.google.com/) |
|---|---|
| Any service | kms/docs/encrypting-application-data (encrypt application data before transmitting or storing it) |
| Cloud Build | build/docs/securing-builds/use-encrypted-secrets-credentials |
| Sensitive Data Protection | sensitive-data-protection/docs/create-wrapped-key |

## Notes

- Topic paths in the tables are relative to https://docs.cloud.google.com/ except where a full URL is given. "EKM" = supported with external Cloud EKM keys.
- CMEK-compliant services don't store data long term, so they don't use CMEKs. A CMEK-compliant service either stores no data or only briefly (such as during batch processing); data is encrypted with an ephemeral key that exists only in memory and is flushed when no longer needed. Output may be stored in a CMEK-integrated service such as Cloud Storage.
- Preview and Deprecated markers are as in the source (Eventarc Advanced, Google Cloud Observability, Service Extensions are Preview; the two Vertex AI Workbench notebook rows are Deprecated).
- Irreversible or disruptive: disabling or destroying a CMEK makes data in the protected service inaccessible. Try it on a disposable resource first.
- Source: https://docs.cloud.google.com/kms/docs/compatible-services (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kms/docs/create-resource-with-autokey.

## Related

- [cmek.md](./cmek.md)
- [use-keys-google-cloud.md](./use-keys-google-cloud.md)
- [autokey-overview.md](./autokey-overview.md)
