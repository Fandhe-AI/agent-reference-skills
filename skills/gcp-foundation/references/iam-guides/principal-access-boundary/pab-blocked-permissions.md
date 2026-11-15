---
source: https://docs.cloud.google.com/iam/docs/pab-blocked-permissions
---

# Principal Access Boundary blocked permissions

Lists which permissions Principal Access Boundary (PAB) policies can block for each enforcement version (1 to 4). Permissions not listed cannot be blocked, so PAB has no effect on access attempts that use them.

## Signature / Usage

Set the enforcement version in the policy details (see the edit page for the full request):

```
{
  "details": {
    "rules": [
      PAB_RULES
    ],
    "enforcementVersion": "ENFORCEMENT_VERSION"
  }
}
```

Accepted `ENFORCEMENT_VERSION` values: `1`, `2`, `3`, `4`, `latest`.

Snippet taken from https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies-edit:

```bash
gcloud iam principal-access-boundary-policies update PAB_POLICY_ID \
    --organization=ORG_ID --location=global \
    --details-enforcement-version=ENFORCEMENT_VERSION
```

## Options / Props

Each version can block everything in the previous versions plus the additions below. `*` is a wildcard for all permissions matching the pattern. "Exceptions" are matching permissions that cannot be blocked. The current default enforcement version is `4` (used for new policies without a version and for `latest`).

### Enforcement version 4 (adds)

| Service | Permissions | Exceptions |
|---|---|---|
| BigQuery sharing | `analyticshub.googleapis.com/dataExchanges.*` | None |
| BigQuery | `bigquery.googleapis.com/{capacityCommitments,datasources,readsessions,reservations,transfers}.*` | None |
| Cloud Deploy | `clouddeploy.googleapis.com/*.*` | None |
| Filestore | `file.googleapis.com/*.*` | None |
| Network Connectivity Center | `networkconnectivity.googleapis.com/{groups,hubRouteTables,hubRoutes,hubs,internalRanges,policyBasedRoutes,regionalEndpoints,spokes}.*` | None |
| Certificate Authority Service | `privateca.googleapis.com/*.*` | None |
| IAM | `iam.googleapis.com/{oauthClientCredentials,oauthClients,workforcePoolProviderKeys,workforcePoolProviders,workforcePoolSubjects,workforcePools,workloadIdentityPoolNamespaces,workloadIdentityPoolProviderKeys,workloadIdentityPoolProviders,workloadIdentityPools}.*` | `iam.googleapis.com/*.createPolicyBinding`, `*.deletePolicyBinding`, `*.searchPolicyBindings`, `*.updatePolicyBinding` |
| Live Stream, Document AI, Security Center Management API, Web Security Scanner, Security Command Center, Cloud Quotas, Recommender, App Hub, Backup for GKE, Managed Service for Apache Airflow, Firebase Storage, Cloud Workstations, Confidential Computing, Contact Center as a Service, Datastream, Infrastructure Manager, Parallelstore, Policy Simulator, Secret Manager, Serverless VPC Access, Service Usage, Cloud Asset Inventory, Kubernetes Metadata API | `<service>.googleapis.com/*.*` (`livestream`, `documentai`, `securitycentermanagement`, `cloudsecurityscanner`, `securitycenter`, `cloudquotas`, `recommender`, `apphub`, `gkebackup`, `composer`, `firebasestorage`, `workstations`, `confidentialcomputing`, `contactcenteraiplatform`, `datastream`, `config`, `parallelstore`, `policysimulator`, `secretmanager`, `vpcaccess`, `serviceusage`, `cloudasset`, `kubernetesmetadata`) | None |
| AlloyDB for PostgreSQL | `alloydb.googleapis.com/*.*` | `alloydb.googleapis.com/databases.*` |
| Cloud Integrations | `integrations.googleapis.com/*.*` | Many `apigee*`, `security*`, `workflows.*`, `locations.*`, `integrations.deploy`, `integrations.update`, `sfdcchannels.create/list` patterns (full list on the source page) |
| Cloud Data Fusion | `datafusion.googleapis.com/{instances,locations,operations}.*`, `namespaces.getIamPolicy`, `namespaces.list`, `namespaces.setIamPolicy` | None |
| Cloud KMS | `cloudkms.googleapis.com/*.*` | `cloudkms.googleapis.com/locations.get`, `locations.list` |
| Translation | `cloudtranslate.googleapis.com/*.*` | `custommodels.*`, `translationmemories.*` |
| Database Migration Service | `datamigration.googleapis.com/*.*` | `mappingrules.*` |
| Dataform | `dataform.googleapis.com/*.*` | `comments.*`, `commentsnested.*`, `commentthreads.*`, `commentthreadsnested.*` |
| Service Management | `servicemanagement.googleapis.com/` `consumers.getIamPolicy`, `consumers.setIamPolicy`, `services.{create,delete,get,getIamPolicy,list,setIamPolicy,update}` | None |
| Backup and Disaster Recovery | `backupdr.googleapis.com/` many `backupPlanAssociations.*ForAlloydbCluster/CloudSqlInstance/ComputeDisk/ComputeInstance`, `backupPlanRevisions.*`, `backupPlans.*`, `backupVaults.*`, `bvbackups.*`, `bvdataSources.*` (selected), `compute.*`, `dataSourceReferences.*` (selected), `locations.*`, `managementServers.*` (selected), `operations.*`, `serviceConfig.*` | `bvbackups.useReadOnlyForAlloydbCluster`, `useReadOnlyForCloudSqlInstance`, `useReadOnlyForFilestoreInstance` |
| Sensitive Data Protection | `dlp.googleapis.com/{charts,columnDataProfiles,connections,deidentifyTemplates,estimates,fileStoreProfiles,inspecttemplates,jobTriggers,jobs,projectDataProfiles,storedInfoTypes,subscriptions,tableDataProfiles}.*` | None |
| Secure Source Manager | `securesourcemanager.googleapis.com/{branchRules,hooks,issuecomments,issues,locations,operations,prcomments,pullRequests}.*` plus selected `instances.*` and `repositories.*` permissions | None |
| Connectors | `connectors.googleapis.com/*.*` | `connections.executeSqlQuery`, `connections.generateOpenAPISpec`, `connections.listenEvent` |
| Dataproc Metastore | `metastore.googleapis.com/{backups,federations,imports,locations,operations,services}.*` plus selected `databases.*` / `tables.*` | `federations.use`, `services.use` |

### Enforcement version 3 (adds, plus versions 1 and 2)

| Service | Permissions | Exceptions |
|---|---|---|
| Essential Contacts | `essentialcontacts.googleapis.com/contacts.*` | None |
| IAM | `iam.googleapis.com/{denypolicies,roles,serviceAccountKeys,serviceAccounts}.*` | `serviceAccounts.createTagBinding`, `deleteTagBinding`, `getCertificateAs`, `listEffectiveTags`, `listTagBindings` |
| Managed Service for Apache Spark | `dataproc.googleapis.com/{autoscalingPolicies,batches,clusters,jobs,operations,sessionTemplates,sessions,workflowTemplates}.*` | None |
| Service Management | `servicemanagement.googleapis.com/services.check`, `services.report` | None |
| Bigtable / Bigtable Admin / Cloud SQL / Network Management / Cloud Service Mesh (trafficdirector) / Artifact Registry / Pub/Sub / Workflows / Google Distributed Cloud (gkeonprem) / Cloud DNS / Organization Policy / Cloud Run functions / Spanner / GKE | `bigtable`, `bigtableadmin`, `cloudsql`, `networkmanagement`, `trafficdirector`, `artifactregistry`, `pubsub`, `workflows`, `gkeonprem`, `dns`, `orgpolicy`, `cloudfunctions`, `spanner`, `container` `.googleapis.com/*.*` | None |
| Network Services | `networkservices.googleapis.com/{endpointPolicies,gateways,grpcRoutes,httpRoutes,httpfilters,meshes,route_views,serviceBindings,serviceLbPolicies,tcpRoutes,tlsRoutes}.*` | None |
| Compute Engine | `compute.googleapis.com/` addresses, backendBuckets, backendServices, firewalls, forwardingRules, networks, subnetworks, routes, health checks, target proxies/pools, urlMaps, VPN gateways, interconnects, and related networking resources (`*.*`; full list on the source page) | None |
| API Keys | `apikeys.googleapis.com/apikeys.*`, `apikeys.googleapis.com/keys.*` (named `serviceusage.apiKeys.*` in the IAM v1 API) | None |
| Firestore | `datastore.googleapis.com/{backupSchedules,databases,entities,indexes,locations,operations,userCreds}.*`, `backups.delete/get/list` | None |
| Cloud KMS | `cloudkms.googleapis.com/{autokeyConfigs,ekmConfigs,importJobs,keyHandles,keyRings}.*` and selected `cryptoKeyVersions.*` | `importJobs.useToImport` |
| Knowledge Catalog | `dataplex.googleapis.com/{aspectTypes,datascans,entries,entryTypes,metadataJobs}.*` and selected `entryGroups.*` | None |
| Data Lineage API | `datalineage.googleapis.com/{events,locations,operations,processes,runs}.*` | None |
| GKE Hub | `gkehub.googleapis.com/fleets.*` | None |

### Enforcement version 2 (adds, plus version 1)

| Service | Permissions | Exceptions |
|---|---|---|
| Access Context Manager, Artifact Analysis, BigQuery Data Policy, Chrome Enterprise Premium, Cloud Asset Inventory, Cloud Build, Cloud Service Mesh, Cloud Trace, Firebase Security Rules, GKE Multi-Cloud, Identity-Aware Proxy, Memorystore for Redis, Network Management API, Fraud Defense, Video Stitcher | `accesscontextmanager`, `containeranalysis`, `bigquerydatapolicy`, `beyondcorp`, `cloudasset`, `cloudbuild`, `meshconfig`, `cloudtrace`, `firebaserules`, `gkemulticloud`, `iap`, `redis`, `networkmanagement`, `recaptchaenterprise`, `videostitcher` `.googleapis.com/*` | None |
| BigQuery | `bigquery.googleapis.com/{rowAccessPolicies,datasets,jobs,models,routines,tables}.*` | None |
| BigQuery Data Transfer | `bigquerydatatransfer.googleapis.com/transfers.*` | None |
| Cloud Billing | `billing.googleapis.com/budgets.*` | None |
| Cloud Monitoring | `monitoring.googleapis.com/*` | `metricsScopes.link`, `timeSeries.list` |
| Cloud Storage | `storage.googleapis.com/{bucketOperations,buckets,managedFolders,multipartUploads,folders,hmacKeys,objects}.*` | None |
| Compute Engine | `compute.googleapis.com/{networkAttachments,networkEdgeSecurityServices,regionSecurityPolicies,securityPolicies,serviceAttachments,routers}.*` | None |
| Network Services | `networkservices.googleapis.com/{edgeCacheKeysets,edgeCacheOrigins,edgeCacheServices}.*` | None |
| Resource Manager | `cloudresourcemanager.googleapis.com/*` | `*.createPolicyBinding`, `*.deletePolicyBinding`, `*.searchPolicyBindings`, `*.updatePolicyBinding` |

### Enforcement version 1

| Service | Permissions | Exceptions |
|---|---|---|
| Access Approval | `requests.list`, `serviceaccounts.get`, `settings.*` | None |
| Access Context Manager | `accesscontextmanager.googleapis.com/*` | `gcpUserAccessBindings.*` |
| BigQuery | selected `datasets.*`, `jobs.*`, `models.*`, `routines.*` create / delete / list / get / update permissions | None |
| Binary Authorization | `binaryauthorization.googleapis.com/*` | None |
| Cloud Logging | `logEntries.create`, `logMetrics.*` | None |
| Cloud Run | `authorizeddomains.*`, `domainmappings.*`, `executions.*`, `revisions.*`, `tasks.*`, selected `services.*`, `jobs.*`, `configurations.*`, `routes.*` | None |
| Cloud Storage | `buckets.get/getIamPolicy/list/setIamPolicy/update`, `hmacKeys.update`, `objects.delete/get/setRetention` | None |
| Dataflow | `messages.list`, `metrics.get`, `snapshots.list`, `workItems.*`, `jobs.*` | `jobs.snapshot` |
| Firestore | `databases.create/delete/get/getMetadata/list` | None |
| Firebase Security Rules | `firebaserules.googleapis.com/*` | None |
| GKE Hub | `membershipbindings.*`, `rbacrolebindings.*`, `features.*`, `fleet.create/get/patch`, `locations.*`, `memberships.*`, `scopes.*` | `*.createTagBinding`, `*.deleteTagBinding`, `*.listEffectiveTags`, `*.listTagBindings` |
| Pub/Sub | `pubsub.googleapis.com/*` | `*.getIamPolicy`, `*.setIamPolicy`, `schemas.delete`, `schemas.validate`, `subscriptions.consume` |
| Memorystore for Redis | `instances.create/delete/failover/get/getAuthString/list/update/upgrade` | None |
| Gemini Enterprise Agent Platform | `aiplatform.googleapis.com/*` | `operations.*` |

## Notes

- This page condenses the official tables: very long permission lists (Compute Engine networking, Backup and DR, Secure Source Manager, Integrations exceptions, Cloud KMS `cryptoKeyVersions`) are abbreviated; consult the source for the exact per-permission list.
- A service listed in an earlier version with a narrower set is widened in later versions (for example Pub/Sub in version 1 excludes IAM policy permissions; version 3 blocks `pubsub.googleapis.com/*.*`).
- Updating a policy's enforcement version changes which permissions it can block, which may newly deny access that was previously unaffected; test with Policy Simulator first.
- Source: https://docs.cloud.google.com/iam/docs/pab-blocked-permissions (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [Principal Access Boundary policies](./principal-access-boundary-policies.md)
- [Edit Principal Access Boundary policies](./pab-policies-edit.md)
