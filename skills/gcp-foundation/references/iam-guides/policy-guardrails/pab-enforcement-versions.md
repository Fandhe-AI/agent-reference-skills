---
source: https://docs.cloud.google.com/iam/docs/pab-blocked-permissions
---

# Principal Access Boundary Enforcement Versions

Principal Access Boundary (PAB) policies can only block permissions included in the policy's enforcement version. Permissions outside that version are not affected by the policy.

## Signature / Usage

Set the version when creating the policy; updating it changes which permissions can be blocked. New policies without a version, and policies that use `latest`, get the default version (currently `4`). Each version also blocks everything in earlier versions (v4 includes v1-v3, v3 includes v1-v2, v2 includes v1).

```text
# Wildcard patterns used in the tables
SERVICE_FQDN/*.*        all permissions of the service
SERVICE_FQDN/RESOURCE.* all permissions of the resource
```

## Options / Props

### Version 1 (base)

| Service | Permissions | Exceptions |
|---|---|---|
| Access Approval | `accessapproval.googleapis.com/requests.list`, `serviceaccounts.get`, `settings.*` | None |
| Access Context Manager | `accesscontextmanager.googleapis.com/*` | `accesscontextmanager.googleapis.com/gcpUserAccessBindings.*` |
| BigQuery | `bigquery.googleapis.com/datasets.{create,delete,get,setIamPolicy,update}`, `jobs.{create,delete,list,get}`, `models.{create,delete,list,updateMetadata}`, `routines.{create,delete,list,update}` | None |
| Binary Authorization | `binaryauthorization.googleapis.com/*` | None |
| Cloud Logging | `logging.googleapis.com/logEntries.create`, `logMetrics.*` | None |
| Cloud Run | `run.googleapis.com/` authorizeddomains.*, configurations.{get,list}, domainmappings.*, services.{create,delete,get,list,update}, executions.*, jobs.{create,delete,get,list,run}, revisions.*, routes.{get,list}, tasks.* | None |
| Cloud Storage | `storage.googleapis.com/buckets.{get,getIamPolicy,list,setIamPolicy,update}`, `hmacKeys.update`, `objects.{delete,get,setRetention}` | None |
| Dataflow | `dataflow.googleapis.com/messages.list`, `metrics.get`, `snapshots.list`, `workItems.*`, `jobs.*` | `dataflow.googleapis.com/jobs.snapshot` |
| Firestore | `datastore.googleapis.com/databases.{create,delete,get,getMetadata,list}` | None |
| Firebase Security Rules | `firebaserules.googleapis.com/*` | None |
| GKE Hub | `gkehub.googleapis.com/` membershipbindings.*, rbacrolebindings.*, features.*, fleet.{create,get,patch}, locations.*, memberships.*, scopes.* | `gkehub.googleapis.com/*.{createTagBinding,deleteTagBinding,listEffectiveTags,listTagBindings}` |
| Pub/Sub | `pubsub.googleapis.com/*` | `*.getIamPolicy`, `*.setIamPolicy`, `schemas.delete`, `schemas.validate`, `subscriptions.consume` |
| Memorystore for Redis | `redis.googleapis.com/instances.{create,delete,failover,get,getAuthString,list,update,upgrade}` | None |
| Gemini Enterprise Agent Platform | `aiplatform.googleapis.com/*` | `aiplatform.googleapis.com/operations.*` |

### Version 2 (adds)

| Service | Permissions | Exceptions |
|---|---|---|
| Access Context Manager | `accesscontextmanager.googleapis.com/*` | None |
| Artifact Analysis | `containeranalysis.googleapis.com/*` | None |
| BigQuery | `rowAccessPolicies.*`, `datasets.*`, `jobs.*`, `models.*`, `routines.*`, `tables.*` | None |
| BigQuery Data Policy | `bigquerydatapolicy.googleapis.com/*` | None |
| BigQuery Data Transfer Service | `bigquerydatatransfer.googleapis.com/transfers.*` | None |
| Chrome Enterprise Premium | `beyondcorp.googleapis.com/*` | None |
| Cloud Asset Inventory | `cloudasset.googleapis.com/*` | None |
| Cloud Billing | `billing.googleapis.com/budgets.*` | None |
| Cloud Build | `cloudbuild.googleapis.com/*` | None |
| Cloud Monitoring | `monitoring.googleapis.com/*` | `metricsScopes.link`, `timeSeries.list` |
| Cloud Service Mesh | `meshconfig.googleapis.com/*` | None |
| Cloud Storage | `bucketOperations.*`, `buckets.*`, `managedFolders.*`, `multipartUploads.*`, `folders.*`, `hmacKeys.*`, `objects.*` | None |
| Cloud Trace | `cloudtrace.googleapis.com/*` | None |
| Compute Engine | `networkAttachments.*`, `networkEdgeSecurityServices.*`, `regionSecurityPolicies.*`, `securityPolicies.*`, `serviceAttachments.*`, `routers.*` | None |
| Firebase Security Rules | `firebaserules.googleapis.com/*` | None |
| GKE Multi-Cloud | `gkemulticloud.googleapis.com/*` | None |
| Identity-Aware Proxy | `iap.googleapis.com/*` | None |
| Memorystore for Redis | `redis.googleapis.com/*` | None |
| Network Management API | `networkmanagement.googleapis.com/*` | None |
| Network Services | `edgeCacheKeysets.*`, `edgeCacheOrigins.*`, `edgeCacheServices.*` | None |
| Google Cloud Fraud Defense | `recaptchaenterprise.googleapis.com/*` | None |
| Resource Manager | `cloudresourcemanager.googleapis.com/*` | `*.createPolicyBinding`, `*.deletePolicyBinding`, `*.searchPolicyBindings`, `*.updatePolicyBinding` |
| Video Stitcher API | `videostitcher.googleapis.com/*` | None |

### Version 3 (adds)

| Service | Permissions | Exceptions |
|---|---|---|
| Essential Contacts | `essentialcontacts.googleapis.com/contacts.*` | None |
| IAM | `iam.googleapis.com/denypolicies.*`, `roles.*`, `serviceAccountKeys.*`, `serviceAccounts.*` | `serviceAccounts.{createTagBinding,deleteTagBinding,getCertificateAs,listEffectiveTags,listTagBindings}` |
| Managed Service for Apache Spark | `dataproc.googleapis.com/` autoscalingPolicies.*, batches.*, clusters.*, jobs.*, operations.*, sessionTemplates.*, sessions.*, workflowTemplates.* | None |
| Service Management | `servicemanagement.googleapis.com/services.check`, `services.report` | None |
| Bigtable / Bigtable Admin | `bigtable.googleapis.com/*.*`, `bigtableadmin.googleapis.com/*.*` | None |
| Cloud SQL | `cloudsql.googleapis.com/*.*` | None |
| Network Services | `endpointPolicies.*`, `gateways.*`, `grpcRoutes.*`, `httpRoutes.*`, `httpfilters.*`, `meshes.*`, `route_views.*`, `serviceBindings.*`, `serviceLbPolicies.*`, `tcpRoutes.*`, `tlsRoutes.*` | None |
| Cloud Service Mesh | `trafficdirector.googleapis.com/*.*` | None |
| Network Management API | `networkmanagement.googleapis.com/*.*` | None |
| Compute Engine | addresses, backendBuckets, backendServices, externalVpnGateways, firewallPolicies, firewalls, forwardingRules, globalAddresses, globalForwardingRules, healthChecks, httpHealthChecks, httpsHealthChecks, interconnectAttachments, interconnectLocations, interconnectRemoteLocations, interconnects, networks, packetMirrorings, publicAdvertisedPrefixes, publicDelegatedPrefixes, regionBackendServices, regionFirewallPolicies, regionHealthChecks, regionSslPolicies, regionTargetHttpProxies, regionTargetTcpProxies, regionUrlMaps, routes, sslPolicies, subnetworks, targetGrpcProxies, targetHttpProxies, targetHttpsProxies, targetInstances, targetPools, targetSslProxies, targetTcpProxies, targetVpnGateways, urlMaps, vpnGateways (each `compute.googleapis.com/<resource>.*`) | None |
| Artifact Registry, Pub/Sub, Workflows, Google Distributed Cloud | `artifactregistry.googleapis.com/*.*`, `pubsub.googleapis.com/*.*`, `workflows.googleapis.com/*.*`, `gkeonprem.googleapis.com/*.*` | None |
| API Keys | `apikeys.googleapis.com/apikeys.*`, `apikeys.googleapis.com/keys.*` | None |
| Cloud DNS | `dns.googleapis.com/*.*` | None |
| Firestore | `datastore.googleapis.com/` backupSchedules.*, backups.{delete,get,list}, databases.*, entities.*, indexes.*, locations.*, operations.*, userCreds.* | None |
| Cloud KMS | `cloudkms.googleapis.com/` autokeyConfigs.*, cryptoKeyVersions.{create,destroy,get,list,restore,update,useToDecrypt,useToEncrypt,useToSign,useToVerify,viewPublicKey}, ekmConfigs.*, importJobs.*, keyHandles.*, keyRings.* | `importJobs.useToImport` |
| Organization Policy Service | `orgpolicy.googleapis.com/*.*` | None |
| Knowledge Catalog | `dataplex.googleapis.com/` aspectTypes.*, datascans.*, entries.*, entryGroups.{create,delete,get,getIamPolicy,import,list,setIamPolicy,update,useContactsAspect,useGenericAspect,useGenericEntry,useOverviewAspect,useSchemaAspect}, entryTypes.*, metadataJobs.* | None |
| Data Lineage API | `datalineage.googleapis.com/` events.*, locations.*, operations.*, processes.*, runs.* | None |
| GKE Hub | `gkehub.googleapis.com/fleets.*` | None |
| Cloud Run functions, Spanner, GKE | `cloudfunctions.googleapis.com/*.*`, `spanner.googleapis.com/*.*`, `container.googleapis.com/*.*` | None |

### Version 4 (adds)

| Service | Permissions | Exceptions |
|---|---|---|
| BigQuery sharing | `analyticshub.googleapis.com/dataExchanges.*` | None |
| BigQuery | `capacityCommitments.*`, `datasources.*`, `readsessions.*`, `reservations.*`, `transfers.*` | None |
| IAM | `iam.googleapis.com/oauthClientCredentials.*`, `oauthClients.*`, `workforcePoolProviderKeys.*`, `workforcePoolProviders.*`, `workforcePoolSubjects.*`, `workforcePools.*`, `workloadIdentityPoolNamespaces.*`, `workloadIdentityPoolProviderKeys.*`, `workloadIdentityPoolProviders.*`, `workloadIdentityPools.*` | `iam.googleapis.com/*.{createPolicyBinding,deletePolicyBinding,searchPolicyBindings,updatePolicyBinding}` |
| Whole service (`*.*`) | `clouddeploy`, `file` (Filestore), `privateca`, `livestream`, `documentai`, `securitycentermanagement`, `cloudsecurityscanner`, `securitycenter`, `cloudquotas`, `recommender`, `apphub`, `gkebackup`, `composer`, `firebasestorage`, `workstations`, `confidentialcomputing`, `contactcenteraiplatform`, `datastream`, `config` (Infrastructure Manager), `parallelstore`, `policysimulator`, `secretmanager`, `vpcaccess`, `serviceusage`, `cloudasset`, `kubernetesmetadata` (all `.googleapis.com/*.*`) | None |
| Network Connectivity Center | `groups.*`, `hubRouteTables.*`, `hubRoutes.*`, `hubs.*`, `internalRanges.*`, `policyBasedRoutes.*`, `regionalEndpoints.*`, `spokes.*` | None |
| AlloyDB | `alloydb.googleapis.com/*.*` | `databases.*` |
| Cloud Integrations | `integrations.googleapis.com/*.*` | apigee\* resources, `integrations.{deploy,update}`, `locations.*`, security* resources, `sfdcchannels.{create,list}`, `workflows.*` (see official page for the full list) |
| Cloud Data Fusion | `instances.*`, `locations.*`, `namespaces.{getIamPolicy,list,setIamPolicy}`, `operations.*` | None |
| Cloud KMS | `cloudkms.googleapis.com/*.*` | `locations.get`, `locations.list` |
| Translation | `cloudtranslate.googleapis.com/*.*` | `custommodels.*`, `translationmemories.*` |
| Database Migration Service | `datamigration.googleapis.com/*.*` | `mappingrules.*` |
| Dataform | `dataform.googleapis.com/*.*` | `comments.*`, `commentsnested.*`, `commentthreads.*`, `commentthreadsnested.*` |
| Service Management | `consumers.{getIamPolicy,setIamPolicy}`, `services.{create,delete,get,getIamPolicy,list,setIamPolicy,update}` | None |
| Backup and Disaster Recovery | `backupdr.googleapis.com/` backupPlanAssociations.* variants, backupPlanRevisions.\*, backupPlans.*, backupVaults.*, bvbackups.*, bvdataSources.*, compute.*, dataSourceReferences.*, locations.*, managementServers.*, operations.*, serviceConfig.* | `bvbackups.useReadOnlyFor{AlloydbCluster,CloudSqlInstance,FilestoreInstance}` |
| Sensitive Data Protection | `dlp.googleapis.com/` charts.*, columnDataProfiles.*, connections.*, deidentifyTemplates.*, estimates.*, fileStoreProfiles.*, inspecttemplates.*, jobTriggers.*, jobs.*, projectDataProfiles.*, storedInfoTypes.*, subscriptions.*, tableDataProfiles.* | None |
| Secure Source Manager | `branchRules.*`, `hooks.*`, `instances.*` (selected), `issuecomments.*`, `issues.*`, `locations.*`, `operations.*`, `prcomments.*`, `pullRequests.*`, `repositories.*` (selected) | None |
| Connectors | `connectors.googleapis.com/*.*` | `connections.executeSqlQuery`, `connections.generateOpenAPISpec`, `connections.listenEvent` |
| Dataproc Metastore | `backups.*`, `federations.*`, `imports.*`, `locations.*`, `operations.*`, `services.*`, selected `databases.*` / `tables.*` | `federations.use`, `services.use` |

## Notes

- The tables above are condensed (grouped by service). Where a cell lists `{a,b}` alternatives or "selected", it abbreviates individual permissions; the official page is authoritative for exact entries.
- If PAB cannot block a permission, IAM cannot enforce the policy for that access attempt.
- Newer versions can block all permissions of earlier versions; raising the version widens enforcement and may start denying access that previously worked. Pin a version deliberately and test.
- Source: https://docs.cloud.google.com/iam/docs/pab-blocked-permissions
- Retrieved 2026-11-14. Content CC BY 4.0.

## Related

- [deny-policies.md](./deny-policies.md)
- [permission-errors-and-resource-names.md](./permission-errors-and-resource-names.md)
