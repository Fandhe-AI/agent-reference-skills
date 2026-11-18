---
source: https://docs.cloud.google.com/app-hub/docs/supported-resources
---

# App Hub supported resources

Google Cloud resources (global, multi-regional and regional) that you can register as services or workloads of an App Hub application. To register them programmatically, use the URI format defined in the Cloud Asset Inventory asset names documentation. Supported-resource metadata (the resource URIs, `ServiceReference`) is ingested automatically when resources are created or destroyed; the ingestion is always on, and the ingested metadata is accessible only when you explicitly enable App Hub.

## Signature / Usage

### List services you can register (filtered by resource type)

Snippet taken from https://docs.cloud.google.com/app-hub/docs/register-resources (the supported resources page has no code block). Per that page, example filters are `service_properties.gcp_project=projects/PROJECT_ID` and `service_properties.gcp_project=projects/PROJECT_ID AND service_reference.uri~"forwardingRules"`.

```bash
gcloud apphub discovered-services list \
  --project=PROJECT_ID \
  --location=REGION \
  --filter=FILTER_EXPRESSION
```

## Options / Props

### Services

"(Preview)" marks resource types listed as Preview. An empty URI format means the source gives none.

| Product | Resource type | Registration type | URI format |
|---|---|---|---|
| Client App Manager | `clientappmanager.googleapis.com/ClientApp` (Preview) | Exclusive | — |
| Firebase | `firebaseapphosting.googleapis.com/Backend` (Preview) | Exclusive | — |
| Mesh Configuration | `networking.istio.io/VirtualService` | Exclusive | — |
| agentregistry.googleapis.com | `agentregistry.googleapis.com/GoogleMcpServer` (Preview) | Shared | — |
| agentregistry.googleapis.com | `agentregistry.googleapis.com/Service` (Preview) | Exclusive | — |
| Vertex AI | `aiplatform.googleapis.com/Dataset` | Exclusive | `//aiplatform.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/datasets/DATASET` |
| Vertex AI | `aiplatform.googleapis.com/Endpoint` | Exclusive | `//aiplatform.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/endpoints/ENDPOINT` |
| Vertex AI | `aiplatform.googleapis.com/FeatureOnlineStore` (Preview) | Exclusive | `//aiplatform.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/featureOnlineStores/FeatureOnlineStore` |
| Vertex AI | `aiplatform.googleapis.com/Featurestore` | Exclusive | `//aiplatform.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/featurestores/FEATURESTORE` |
| Vertex AI | `aiplatform.googleapis.com/MetadataStore` | Exclusive | `//aiplatform.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/metadataStores/METADATA_STORE` |
| Vertex AI | `aiplatform.googleapis.com/Model` | Exclusive | `//aiplatform.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/models/MODEL` |
| Vertex AI | `aiplatform.googleapis.com/NotebookExecutionJob` | Exclusive | `//aiplatform.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/notebookExecutionJobs/NOTEBOOK_EXECUTION_JOB` |
| Vertex AI | `aiplatform.googleapis.com/NotebookRuntime` | Exclusive | `//aiplatform.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/notebookRuntimes/NOTEBOOK_RUNTIME` |
| Vertex AI | `aiplatform.googleapis.com/PersistentResource` (Preview) | Exclusive | — |
| Vertex AI | `aiplatform.googleapis.com/Tensorboard` (Preview) | Exclusive | `//aiplatform.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/tensorboards/TENSORBOARD` |
| AlloyDB for PostgreSQL | `alloydb.googleapis.com/Cluster` | Exclusive | `//alloydb.googleapis.com/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER` |
| AlloyDB for PostgreSQL | `alloydb.googleapis.com/Instance` | Exclusive | `//alloydb.googleapis.com/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER/instances/INSTANCE` |
| API Gateway | `apigateway.googleapis.com/Api` (Preview) | Exclusive | `//apigateway.googleapis.com/projects/PROJECT_ID/locations/LOCATION/apis/API` |
| API Gateway | `apigateway.googleapis.com/Gateway` (Preview) | Exclusive | `//apigateway.googleapis.com/projects/PROJECT_ID/locations/LOCATION/gateways/GATEWAY` |
| Apigee API hub | `apihub.googleapis.com/Deployment` (Preview) | Exclusive | — |
| BigQuery | `bigquery.googleapis.com/Dataset` (Preview) | Exclusive | `//bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATA_SET` |
| Bigtable | `bigtableadmin.googleapis.com/AuthorizedView` (Preview) | Exclusive | `//bigtable.googleapis.com/projects/PROJECT_ID/instances/INSTANCE/tables/TABLE/authorizedViews/AUTHORIZED_VIEW` |
| Bigtable | `bigtableadmin.googleapis.com/Cluster` | Exclusive | `//bigtable.googleapis.com/projects/PROJECT_ID/instances/INSTANCE/clusters/CLUSTER` |
| Bigtable | `bigtableadmin.googleapis.com/Instance` | Exclusive | `//bigtable.googleapis.com/projects/PROJECT_ID/instances/INSTANCE` |
| Bigtable | `bigtableadmin.googleapis.com/LogicalView` (Preview) | Exclusive | `//bigtable.googleapis.com/projects/PROJECT_ID/instances/INSTANCE/logicalViews/LOGICAL_VIEW` |
| Bigtable | `bigtableadmin.googleapis.com/Table` (Preview) | Exclusive | `//bigtable.googleapis.com/projects/PROJECT_ID/instances/INSTANCE/tables/TABLE` |
| Cloud Build | `cloudbuild.googleapis.com/Connection` | Exclusive | `//cloudbuild.googleapis.com/projects/PROJECT_ID/locations/LOCATION/connections/CONNECTION` |
| Cloud Build | `cloudbuild.googleapis.com/Installation` (Preview) | Exclusive | — |
| Certificate Manager | `certificatemanager.googleapis.com/Certificate` (Preview) | Exclusive | `//certificatemanager.googleapis.com/projects/PROJECT_ID/locations/REGION/certificates/CERTIFICATE_NAME` |
| Certificate Manager | `certificatemanager.googleapis.com/CertificateMap` (Preview) | Exclusive | `//certificatemanager.googleapis.com/projects/PROJECT_ID/locations/global/certificateMaps/CERTIFICATE_MAP_NAME` |
| Cloud Run | `run.googleapis.com/Service` | Exclusive | `//run.googleapis.com/projects/PROJECT_ID/locations/LOCATION/services/SERVICE` |
| Cloud Tasks | `cloudtasks.googleapis.com/Queue` (Preview) | Exclusive | `//cloudtasks.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/queues/QUEUE` |
| Cloud Data Fusion | `datafusion.googleapis.com/Instance` | Exclusive | `//datafusion.googleapis.com/projects/PROJECT_ID/locations/LOCATION/instances/INSTANCE` |
| Dataform | `dataform.googleapis.com/Repository` (Preview) | Exclusive | `//dataform.googleapis.com/projects/PROJECT_ID/locations/LOCATION/repositories/REPOSITORY` |
| Dataproc Metastore | `metastore.googleapis.com/Service` | Exclusive | `//metastore.googleapis.com/projects/PROJECT_ID/locations/LOCATION/services/SERVICE` |
| Managed Service for Apache Spark | `dataproc.googleapis.com/Cluster` (Preview) | Exclusive | `//dataproc.googleapis.com/projects/PROJECT_ID/regions/REGION/clusters/CLUSTER` |
| Datastream | `datastream.googleapis.com/Stream` (Preview) | Exclusive | `//datastream.googleapis.com/projects/PROJECT_ID/locations/LOCATION/streams/STREAM` |
| Cloud Deploy | `clouddeploy.googleapis.com/CustomTargetType` | Exclusive | `//clouddeploy.googleapis.com/projects/PROJECT_ID/locations/LOCATION/customTargetTypes/CUSTOM_TARGET_TYPE` |
| Cloud Deploy | `clouddeploy.googleapis.com/DeliveryPipeline` | Exclusive | `//clouddeploy.googleapis.com/projects/PROJECT_ID/locations/LOCATION/deliveryPipelines/DELIVERY_PIPELINE` |
| Cloud Deploy | `clouddeploy.googleapis.com/Release` | Exclusive | `//clouddeploy.googleapis.com/projects/PROJECT_ID/locations/LOCATION/deliveryPipelines/DELIVERY_PIPELINE/releases/RELEASE` |
| Discovery Engine | `discoveryengine.googleapis.com/DataConnector` (Preview) | Shared | — |
| Eventarc | `eventarc.googleapis.com/Channel` (Preview) | Exclusive | `//eventarc.googleapis.com/projects/PROJECT_ID/locations/LOCATION/channels/CHANNEL` |
| Eventarc | `eventarc.googleapis.com/Trigger` (Preview) | Exclusive | `//eventarc.googleapis.com/projects/PROJECT_ID/locations/LOCATION/triggers/TRIGGER` |
| Financial Services | `financialservices.googleapis.com/Dataset` (Preview) | Exclusive | `//financialservices.googleapis.com/projects/PROJECT_ID/locations/LOCATION/instances/INSTANCE/datasets/DATASET` |
| Financial Services | `financialservices.googleapis.com/Instance` | Exclusive | `//financialservices.googleapis.com/projects/PROJECT_ID/locations/LOCATION/instances/INSTANCE` |
| Financial Services | `financialservices.googleapis.com/Model` (Preview) | Exclusive | `//financialservices.googleapis.com/projects/PROJECT_ID/locations/LOCATION/instances/INSTANCE/models/MODEL` |
| Firestore | `firestore.googleapis.com/Database` | Exclusive | `//firestore.googleapis.com/projects/PROJECT_NUMBER/databases/DATABASE` |
| Cloud Run functions (1st gen) | `cloudfunctions.googleapis.com/CloudFunction` (Preview) | Exclusive | `//cloudfunctions.googleapis.com/projects/PROJECT_ID/locations/LOCATION/functions/CLOUD_FUNCTION` |
| Cloud Run functions (1st gen) | `cloudfunctions.googleapis.com/Function` | Exclusive | `//cloudfunctions.googleapis.com/projects/PROJECT_ID/locations/LOCATION/functions/FUNCTION` |
| Compute Engine | `compute.googleapis.com/BackendService` | Exclusive | `//compute.googleapis.com/projects/PROJECT_ID/global/backendServices/BACKEND_SERVICE` |
| Compute Engine | `compute.googleapis.com/ForwardingRule` | Exclusive | `//compute.googleapis.com/projects/PROJECT_ID/regions/REGION/forwardingRules/FORWARDING_RULE`; `//compute.googleapis.com/projects/PROJECT_ID/global/forwardingRules/FORWARDING_RULE` |
| Compute Engine | `compute.googleapis.com/ServiceAttachment` (Preview) | Exclusive | `//compute.googleapis.com/projects/PROJECT_ID/regions/REGION/serviceAttachments/SERVICE_ATTACHMENT` |
| GKE Hub | `gkehub.googleapis.com/Fleet` (Preview) | Exclusive | `//gkehub.googleapis.com/projects/PROJECT_ID/locations/LOCATION/fleets/FLEET` |
| Google Kubernetes Engine | `container.googleapis.com/Cluster` (Preview) | Shared | `//container.googleapis.com/projects/PROJECT_ID/zones/ZONE/clusters/CLUSTER`; `//container.googleapis.com/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER` |
| Google Kubernetes Engine | `gateway.networking.k8s.io/Gateway` | Exclusive | `//container.googleapis.com/projects/PROJECT_ID/zones/ZONE/clusters/CLUSTER/k8s/namespaces/NAMESPACE/apis/gateway.networking.k8s.io/gateways/GATEWAY`; `//container.googleapis.com/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER/k8s/namespaces/NAMESPACE/apis/gateway.networking.k8s.io/gateways/GATEWAY` |
| Google Kubernetes Engine | `k8s.io/Service` | Exclusive | `//container.googleapis.com/projects/PROJECT_ID/zones/ZONE/clusters/CLUSTER/k8s/namespaces/NAMESPACE/services/SERVICE`; `//container.googleapis.com/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER/k8s/namespaces/NAMESPACE/services/SERVICE` |
| Google Kubernetes Engine | `networking.k8s.io/Ingress` (Preview) | Exclusive | `//container.googleapis.com/projects/PROJECT_ID/zones/ZONE/clusters/CLUSTER/k8s/namespaces/NAMESPACE/networking.k8s.io/ingresses/INGRESS`; `//container.googleapis.com/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER/k8s/namespaces/NAMESPACE/networking.k8s.io/ingresses/INGRESS` |
| GKE On-Prem API | `gkeonprem.googleapis.com/VmwareAdminCluster` (Preview) | Exclusive | `//gkeonprem.googleapis.com/projects/PROJECT_ID/locations/LOCATION/vmwareAdminClusters/VMWARE_ADMIN_CLUSTER` |
| GKE On-Prem API | `gkeonprem.googleapis.com/VmwareCluster` (Preview) | Exclusive | `//gkeonprem.googleapis.com/projects/PROJECT_ID/locations/LOCATION/vmwareClusters/VMWARE_CLUSTER` |
| Integration Connectors | `connectors.googleapis.com/Connection` (Preview) | Exclusive | `//connectors.googleapis.com/projects/PROJECT_ID/locations/LOCATION/connections/CONNECTION` |
| Live Stream API | `livestream.googleapis.com/Asset` (Preview) | Exclusive | `//livestream.googleapis.com/projects/PROJECT_ID/locations/LOCATION/assets/ASSET` |
| Cloud Logging | `logging.googleapis.com/LogBucket` | Exclusive | `//logging.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/buckets/BUCKET`; `//logging.googleapis.com/organizations/ORGANIZATION_ID/locations/LOCATION/buckets/BUCKET`; `//logging.googleapis.com/folders/FOLDER_ID/locations/LOCATION/buckets/BUCKET`; `//logging.googleapis.com/billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION/buckets/BUCKET`; `//logging.googleapis.com/accessPolicies/ACCESS_POLICY_ID/locations/LOCATION/buckets/BUCKET` |
| Managed Service for Microsoft Active Directory | `managedidentities.googleapis.com/Domain` | Exclusive | `//managedidentities.googleapis.com/projects/PROJECT_ID/locations/global/domains/DOMAIN` |
| Memorystore | `memorystore.googleapis.com/Instance` | Exclusive | `//memorystore.googleapis.com/projects/PROJECT_ID/locations/LOCATION/instances/INSTANCE` |
| Memorystore for Memcached | `memcache.googleapis.com/Instance` (Preview) | Exclusive | `//memcache.googleapis.com/projects/PROJECT_ID/locations/LOCATION/instances/INSTANCE` |
| Memorystore for Redis | `redis.googleapis.com/Cluster` | Exclusive | `//redis.googleapis.com/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER` |
| Memorystore for Redis | `redis.googleapis.com/Instance` | Exclusive | `//redis.googleapis.com/projects/PROJECT_ID/locations/LOCATION/instances/INSTANCE` |
| Network Connectivity | `networkconnectivity.googleapis.com/Group` (Preview) | Exclusive | `//networkconnectivity.googleapis.com/projects/PROJECT_ID/locations/global/hubs/HUB/groups/GROUP` |
| Network Connectivity | `networkconnectivity.googleapis.com/Hub` (Preview) | Exclusive | `//networkconnectivity.googleapis.com/projects/PROJECT_ID/locations/global/hubs/HUB` |
| Network Connectivity | `networkconnectivity.googleapis.com/InternalRange` | Exclusive | `//networkconnectivity.googleapis.com/projects/PROJECT_ID/locations/LOCATION/internalRanges/INTERNAL_RANGE` |
| Network Connectivity | `networkconnectivity.googleapis.com/PolicyBasedRoute` | Exclusive | — |
| Network Connectivity | `networkconnectivity.googleapis.com/Spoke` (Preview) | Exclusive | `//networkconnectivity.googleapis.com/projects/PROJECT_ID/locations/LOCATION/spokes/SPOKE` |
| Pub/Sub | `pubsub.googleapis.com/Subscription` | Exclusive | `//pubsub.googleapis.com/projects/PROJECT_ID/subscriptions/SUBSCRIPTION` |
| Pub/Sub | `pubsub.googleapis.com/Topic` | Exclusive | `//pubsub.googleapis.com/projects/PROJECT_ID/topics/TOPIC`; `//pubsub.googleapis.com/deleted-topic` |
| Secret Manager | `secretmanager.googleapis.com/Secret` | Exclusive | `//secretmanager.googleapis.com/projects/PROJECT_NUMBER/secrets/SECRET`; `//secretmanager.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/secrets/SECRET` |
| Spanner | `spanner.googleapis.com/Database` | Exclusive | `//spanner.googleapis.com/projects/PROJECT_ID/instances/INSTANCE/databases/DATABASE` |
| Spanner | `spanner.googleapis.com/Instance` | Exclusive | `//spanner.googleapis.com/projects/PROJECT_ID/instances/INSTANCE` |
| Cloud SQL | `sqladmin.googleapis.com/Instance` | Exclusive | `//cloudsql.googleapis.com/projects/PROJECT_ID/instances/INSTANCE` |
| Cloud Storage | `storage.googleapis.com/Bucket` | Exclusive | `//storage.googleapis.com/BUCKET` |
| Service Usage | `serviceusage.googleapis.com/Service` (Preview) | Exclusive | `//serviceusage.googleapis.com/projects/PROJECT_NUMBER/services/SERVICE` |
| Workflows | `workflows.googleapis.com/Workflow` (Preview) | Exclusive | `//workflows.googleapis.com/projects/PROJECT_ID/locations/LOCATION/workflows/WORKFLOW` |

### Workloads

| Product | Resource type | URI format |
|---|---|---|
| geminidataanalytics.googleapis.com | `geminidataanalytics.googleapis.com/DataAgent` (Preview) | — |
| Vertex AI | `aiplatform.googleapis.com/BatchPredictionJob` (Preview) | `//aiplatform.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/batchPredictionJobs/BATCH_PREDICTION_JOB` |
| Vertex AI | `aiplatform.googleapis.com/ReasoningEngine` | `//aiplatform.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/REASONING_ENGINE` |
| Vertex AI | `aiplatform.googleapis.com/TuningJob` (Preview) | `//aiplatform.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/tuningJobs/TUNING_JOB` |
| Cloud Build | `cloudbuild.googleapis.com/WorkerPool` | `//cloudbuild.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/workerPools/WORKER_POOL` |
| Cloud Run | `run.googleapis.com/Job` | `//run.googleapis.com/projects/PROJECT_ID/locations/LOCATION/jobs/JOB` |
| Cloud Run | `run.googleapis.com/WorkerPool` (Preview) | `//run.googleapis.com/projects/PROJECT_ID/locations/LOCATION/workerPools/WORKER_POOL` |
| Cloud Config Manager API | `config.googleapis.com/Deployment` (Preview) | `//config.googleapis.com/projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT` |
| Discovery Engine | `discoveryengine.googleapis.com/Agent` (Preview) | — |
| Discovery Engine | `discoveryengine.googleapis.com/Assistant` (Preview) | `//discoveryengine.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/collections/COLLECTION/engines/ENGINE/assistants/ASSISTANT` |
| Compute Engine | `compute.googleapis.com/InstanceGroup` | `//compute.googleapis.com/projects/PROJECT_ID/zones/ZONE/instanceGroups/INSTANCE_GROUP`; `//compute.googleapis.com/projects/PROJECT_ID/regions/REGION/instanceGroups/INSTANCE_GROUP` |
| Google Kubernetes Engine | `apps.k8s.io/DaemonSet` | `//container.googleapis.com/projects/PROJECT_ID/zones/ZONE/clusters/CLUSTER/k8s/namespaces/NAMESPACE/apps/daemonsets/DAEMONSET`; `//container.googleapis.com/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER/k8s/namespaces/NAMESPACE/apps/daemonsets/DAEMONSET` |
| Google Kubernetes Engine | `apps.k8s.io/Deployment` | `//container.googleapis.com/projects/PROJECT_ID/zones/ZONE/clusters/CLUSTER/k8s/namespaces/NAMESPACE/apps/deployments/DEPLOYMENT`; `//container.googleapis.com/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER/k8s/namespaces/NAMESPACE/apps/deployments/DEPLOYMENT` |
| Google Kubernetes Engine | `apps.k8s.io/StatefulSet` | `//container.googleapis.com/projects/PROJECT_ID/zones/ZONE/clusters/CLUSTER/k8s/namespaces/NAMESPACE/apps/statefulsets/STATEFULSET`; `//container.googleapis.com/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER/k8s/namespaces/NAMESPACE/apps/statefulsets/STATEFULSET` |
| Google Kubernetes Engine | `batch.k8s.io/CronJob` | `//container.googleapis.com/projects/PROJECT_ID/zones/ZONE/clusters/CLUSTER/k8s/namespaces/NAMESPACE/batch/cronjobs/CRONJOB`; `//container.googleapis.com/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER/k8s/namespaces/NAMESPACE/batch/cronjobs/CRONJOB` |
| Cloud Scheduler | `cloudscheduler.googleapis.com/Job` (Preview) | — |

## Notes

- Registration type: Exclusive resources register to one application; Shared (Discovery Engine `DataConnector`, agentregistry `GoogleMcpServer`, GKE `Cluster`) to multiple applications, with no attributes.
- Registered-resource telemetry for monitoring is described under application monitoring (https://docs.cloud.google.com/monitoring/docs/application-monitoring).
- Cloud Build `Connection` registers as a service and `WorkerPool` as a workload; Cloud Deploy `CustomTargetType`, `DeliveryPipeline` and `Release` register as services.
- Source: https://docs.cloud.google.com/app-hub/docs/supported-resources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [register-resources.md](./register-resources.md)
- [key-concepts.md](./key-concepts.md)
- [global-regional-applications.md](./global-regional-applications.md)
