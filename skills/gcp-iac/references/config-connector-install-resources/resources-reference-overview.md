---
source: https://docs.cloud.google.com/config-connector/docs/reference/overview
---

# Config Connector resources (supported resource list)

Config Connector supports the resources below, grouped by Google Cloud product. All Config Connector resources have the Kubernetes API group `cnrm.cloud.google.com`; each kind links to its own reference page under https://docs.cloud.google.com/config-connector/docs/reference/resource-docs/.

## Signature / Usage

List the kinds your installed version can create and manage.

```bash
kubectl get crds --selector cnrm.cloud.google.com/managed-by-kcc=true
```

## Options / Props

### Supported resources by product

| Google Cloud product | Config Connector resource kinds |
|---|---|
| Access Context Manager | `AccessContextManagerAccessLevel`, `AccessContextManagerAccessPolicy`, `AccessContextManagerServicePerimeter`, `AccessContextManagerServicePerimeterResource` |
| AlloyDB for PostgreSQL | `AlloyDBBackup`, `AlloyDBCluster`, `AlloyDBInstance`, `AlloyDBUser` |
| API Gateway | `APIGatewayAPI` |
| Apigee | `ApigeeEndpointAttachment`, `ApigeeEnvgroup`, `ApigeeEnvgroupAttachment`, `ApigeeEnvironment`, `ApigeeInstance`, `ApigeeInstanceAttachment`, `ApigeeOrganization` |
| App Hub | `AppHubApplication` |
| Artifact Registry | `ArtifactRegistryRepository` |
| BigQuery sharing | `BigQueryAnalyticsHubDataExchange`, `BigQueryAnalyticsHubListing` |
| BigQuery BigLake | `BigLakeTable` |
| BigQuery | `BigqueryConnectionConnection`, `BigQueryDataset`, `BigQueryJob`, `BigQueryRoutine`, `BigQueryTable`, `BigQueryDataTransferConfig` |
| Backup and DR | `BackupDRBackupPlan`, `BackupDRBackupPlanAssociation`, `BackupDRBackupVault` |
| BigQuery Reservation | `BigQueryReservationAssignment`, `BigQueryReservationReservation` |
| Bigtable | `BigtableAppProfile`, `BigtableGCPolicy`, `BigtableInstance`, `BigtableTable` |
| Cloud Billing Budget | `BillingBudgetsBudget` |
| Binary Authorization | `BinaryAuthorizationAttestor`, `BinaryAuthorizationPolicy` |
| Cloud Build | `CloudBuildTrigger`, `CloudBuildWorkerPool` |
| Cloud Asset Inventory | `AssetFeed`, `AssetSavedQuery` |
| Cloud Composer | `ComposerEnvironment` |
| Cloud Deploy | `CloudDeployDeliveryPipeline` |
| Cloud Quotas | `APIQuotaAdjusterSettings`, `APIQuotaPreference` |
| Cloud Run functions | `CloudFunctionsFunction` |
| Cloud Identity | `CloudIdentityGroup`, `CloudIdentityMembership` |
| Cloud Intrusion Detection System | `CloudIDSEndpoint` |
| Cloud Scheduler | `CloudSchedulerJob` |
| Certificate Manager | `CertificateManagerCertificate`, `CertificateManagerCertificateMap`, `CertificateManagerCertificateMapEntry`, `CertificateManagerDNSAuthorization` |
| Compute Engine | `ComputeAddress`, `ComputeBackendBucket`, `ComputeBackendService`, `ComputeDisk`, `ComputeExternalVPNGateway`, `ComputeFirewall`, `ComputeFirewallPolicy`, `ComputeFirewallPolicyAssociation`, `ComputeFirewallPolicyRule`, `ComputeForwardingRule`, `ComputeHealthCheck`, `ComputeHTTPHealthCheck`, `ComputeHTTPSHealthCheck`, `ComputeImage`, `ComputeInstance`, `ComputeInstanceGroup`, `ComputeInstanceGroupManager`, `ComputeInstanceTemplate`, `ComputeInterconnectAttachment`, `ComputeManagedSSLCertificate`, `ComputeNetwork`, `ComputeNetworkEndpointGroup`, `ComputeNetworkFirewallPolicy`, `ComputeNetworkFirewallPolicyAssociation`, `ComputeNetworkPeering`, `ComputeNodeGroup`, `ComputeNodeTemplate`, `ComputePacketMirroring`, `ComputeProjectMetadata`, `ComputeRegionNetworkEndpointGroup`, `ComputeReservation`, `ComputeResourcePolicy`, `ComputeRoute`, `ComputeRouter`, `ComputeRouterInterface`, `ComputeRouterNAT`, `ComputeRouterPeer`, `ComputeSecurityPolicy`, `ComputeServiceAttachment`, `ComputeSharedVPCHostProject`, `ComputeSharedVPCServiceProject`, `ComputeSnapshot`, `ComputeSSLCertificate`, `ComputeSSLPolicy`, `ComputeSubnetwork`, `ComputeTargetGrpcProxy`, `ComputeTargetHttpProxy`, `ComputeTargetHttpsProxy`, `ComputeTargetInstance`, `ComputeTargetPool`, `ComputeTargetSslProxy`, `ComputeTargetTcpProxy`, `ComputeTargetVPNGateway`, `ComputeURLMap`, `ComputeVPNGateway`, `ComputeVPNTunnel` |
| Config Controller | `ConfigControllerInstance` |
| Artifact Analysis | `ContainerAnalysisNote` |
| Data Catalog | `DataCatalogPolicyTag`, `DataCatalogTaxonomy` |
| Dataflow | `DataflowJob`, `DataflowFlexTemplateJob` |
| Dataform | `DataformRepository` |
| Cloud Data Fusion | `DatafusionInstance` |
| Managed Service for Apache Spark | `DataprocAutoscalingPolicy`, `DataprocCluster`, `DataprocWorkflowTemplate` |
| Dataproc Metastore | `MetastoreBackup` |
| Cloud Data Loss Prevention | `DLPDeidentifyTemplate`, `DLPInspectTemplate`, `DLPJobTrigger`, `DLPStoredInfoType` |
| Cloud DNS | `DNSManagedZone`, `DNSPolicy`, `DNSRecordSet` |
| Google Distributed Cloud | `EdgeContainerCluster`, `EdgeContainerNodePool`, `EdgeContainerVPNConnection`, `EdgeNetworkNetwork`, `EdgeNetworkSubnet` |
| Document AI | `DocumentAIProcessorVersion` |
| Essential Contacts | `EssentialContactsContact` |
| Eventarc | `EventarcTrigger` |
| Filestore | `FilestoreBackup`, `FilestoreInstance` |
| Firestore | `FirestoreDatabase`, `FirestoreIndex` |
| GKE attached clusters | `ContainerAttachedCluster` |
| GKE Hub | `GKEHubMembership`, `GKEHubFeature`, `GKEHubFeatureMembership` |
| Google Kubernetes Engine | `ContainerCluster`, `ContainerNodePool` |
| Identity and Access Management | `IAMAccessBoundaryPolicy`, `IAMAuditConfig`, `IAMCustomRole`, `IAMPartialPolicy`, `IAMPolicy`, `IAMPolicyMember`, `IAMServiceAccount`, `IAMServiceAccountKey`, `IAMWorkforcePool`, `IAMWorkforcePoolProvider`, `IAMWorkloadIdentityPool`, `IAMWorkloadIdentityPoolProvider` |
| Identity-Aware Proxy | `IAPBrand`, `IAPIdentityAwareProxyClient`, `IAPSettings` |
| Identity Platform | `IdentityPlatformOAuthIDPConfig`, `IdentityPlatformConfig`, `IdentityPlatformTenant`, `IdentityPlatformTenantOAuthIDPConfig` |
| Cloud Key Management Service | `KMSCryptoKey`, `KMSKeyRing`, `KMSAutokeyConfig`, `KMSImportJob`, `KMSKeyHandle` |
| Cloud Logging | `LoggingLink`, `LoggingLogBucket`, `LoggingLogExclusion`, `LoggingLogMetric`, `LoggingLogSink`, `LoggingLogView` |
| Google Cloud Managed Service for Apache Kafka | `ManagedKafkaCluster`, `ManagedKafkaTopic` |
| Memorystore for Memcached | `MemcacheInstance` |
| Memorystore for Valkey | `MemorystoreInstance` |
| Cloud Monitoring | `MonitoringAlertPolicy`, `MonitoringDashboard`, `MonitoringGroup`, `MonitoringMetricDescriptor`, `MonitoringMonitoredProject`, `MonitoringNotificationChannel`, `MonitoringService`, `MonitoringServiceLevelObjective`, `MonitoringUptimeCheckConfig` |
| Network Connectivity | `NetworkConnectivityHub`, `NetworkConnectivitySpoke` |
| Notebooks | `NotebooksInstance` |
| OS Config | `OSConfigGuestPolicy`, `OSConfigOSPolicyAssignment` |
| Organization Policy | `OrgPolicyCustomConstraint`, `OrgPolicyPolicy` |
| Private CA | `PrivateCACAPool`, `PrivateCACertificate`, `PrivateCACertificateAuthority`, `PrivateCACertificateTemplate` |
| Privileged Access Manager | `PrivilegedAccessManagerEntitlement` |
| Pub/Sub | `PubSubSchema`, `PubSubSnapshot`, `PubSubSubscription`, `PubSubTopic` |
| Pub/Sub Lite | `PubSubLiteReservation` |
| Memorystore | `RedisCluster`, `RedisInstance` |
| reCAPTCHA | `RecaptchaEnterpriseKey` |
| Resource Manager | `Folder`, `Project`, `ResourceManagerLien`, `ResourceManagerPolicy` |
| Cloud Run | `RunJob`, `RunService` |
| Secret Manager | `SecretManagerSecret`, `SecretManagerSecretVersion` |
| Secure Source Manager | `SecureSourceManagerInstance`, `SecureSourceManagerRepository` |
| Service Directory | `ServiceDirectoryEndpoint`, `ServiceDirectoryNamespace`, `ServiceDirectoryService` |
| Service Networking | `ServiceNetworkingConnection` |
| Service Usage | `Service`, `ServiceIdentity` |
| Cloud Source Repositories | `SourceRepoRepository` |
| Speech-to-Text | `SpeechCustomClass`, `SpeechPhraseSet`, `SpeechRecognizer` |
| Spanner | `SpannerBackupSchedule`, `SpannerDatabase`, `SpannerInstance` |
| Cloud SQL | `SQLDatabase`, `SQLInstance`, `SSLCert`, `SQLUser` |
| Cloud Storage | `StorageAnywhereCache`, `StorageBucket`, `StorageBucketAccessControl`, `StorageDefaultObjectAccessControl`, `StorageNotification` |
| Storage Transfer Service | `StorageTransferJob` |
| Tags | `TagsLocationTagBinding`, `TagsTagBinding`, `TagsTagKey`, `TagsTagValue` |
| Cloud Service Mesh | `NetworkSecurityAuthorizationPolicy`, `NetworkSecurityClientTLSPolicy`, `NetworkSecurityServerTLSPolicy`, `NetworkServicesEndpointPolicy`, `NetworkServicesGateway`, `NetworkServicesGRPCRoute`, `NetworkServicesHTTPRoute`, `NetworkServicesMesh`, `NetworkServicesTCPRoute`, `NetworkServicesTLSRoute` |
| Vertex AI | `VertexAIDataset`, `VertexAIEndpoint`, `VertexAIIndex`, `VertexAIMetadataStore` |
| Google Cloud VMware Engine | `VMwareEngineExternalAddress` |
| Serverless VPC Access | `VPCAccessConnector` |
| Cloud Workstations | `WorkstationCluster`, `WorkstationConfig`, `Workstation` |

### Resources no longer supported

| Google Cloud product | Config Connector resource | Deprecation version |
|---|---|---|
| Game Servers Realm | `GameServicesRealm` | 1.101.0 |

## Notes

- The reference documentation is based on the latest version. For another version, find that version's CRDs in the GitHub repository (the source gives version 1.89.0 as an example).
- The source recommends reviewing Config Connector best practices and troubleshooting for common issues.
- Snippet taken from https://docs.cloud.google.com/config-connector/docs/how-to/getting-started.
- Source: https://docs.cloud.google.com/config-connector/docs/reference/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [config-connector-overview.md](./config-connector-overview.md)
- [creating-resource-references.md](./creating-resource-references.md)
- [annotations.md](./annotations.md)
