---
source: https://docs.cloud.google.com/security-command-center/docs/concepts-event-threat-detection-overview#sensitive_roles
---

# Sensitive IAM roles and permissions

Defines which IAM roles Event Threat Detection treats as sensitive. Detections such as IAM Anomalous Grant and unsafe Google Group changes generate findings only if the change involves high- or medium-sensitivity roles, and the sensitivity sets the finding severity. Granting sensitive roles is considered dangerous when the grantee is an external member or an abnormal identity (for example a principal inactive for a long time). Applies to the Premium and Enterprise (Deprecated) service tiers.

## Signature / Usage

### Finding categories that use the sensitive roles

The source lists these finding categories (and subrules) as using all sensitive roles; the table below adds the subrule that uses only a subset.

```text
- Persistence: IAM Anomalous Grant
  - Subrule: `external_service_account_added_to_policy`
  - Subrule: `external_member_added_to_policy`
- Privilege Escalation: Sensitive Role Granted To Hybrid Group
- Privilege Escalation: Dormant Service Account Granted Sensitive Role
```

## Options / Props

### Severity by sensitivity (non-AI findings)

| Sensitivity | Meaning | Finding severity |
|---|---|---|
| High | Roles that control critical services in organizations, including billing, firewall settings and logging. | High |
| Medium | Editing permissions that change Google Cloud resources, and viewing / executing permissions on data storage services that often hold sensitive data. | High if granted at the organization level; Medium if granted lower in the hierarchy (folders, projects, buckets, and others) |

### Finding categories that use these roles

| Finding category | Roles used |
|---|---|
| Persistence: IAM Anomalous Grant, subrules `external_service_account_added_to_policy` and `external_member_added_to_policy` | All sensitive roles |
| Privilege Escalation: Sensitive Role Granted To Hybrid Group | All sensitive roles |
| Privilege Escalation: Dormant Service Account Granted Sensitive Role | All sensitive roles |
| Persistence: IAM Anomalous Grant, subrule `service_account_granted_sensitive_role_to_member` | A subset (basic IAM roles and certain data storage roles); targets external and internal members |

### High-sensitivity roles

| Category | Roles |
|---|---|
| Basic roles (thousands of permissions across all services) | `roles/owner`, `roles/editor` |
| Security roles | `roles/cloudkms.*`, `roles/cloudsecurityscanner.*`, `roles/dlp.*`, `roles/iam.*`, `roles/secretmanager.*`, `roles/securitycenter.*` (all roles of Cloud KMS, Web Security Scanner, Sensitive Data Protection, IAM, Secret Manager, Security Command Center) |
| Logging roles | `roles/errorreporting.*`, `roles/logging.*`, `roles/stackdriver.*` (all Error Reporting, Cloud Logging, Cloud Monitoring roles) |
| Personal information roles (PII, banking and contact information) | `roles/billing.*`, `roles/healthcare.*`, `roles/essentialcontacts.*` |
| Networking roles | `roles/dns.*`, `roles/domains.*`, `roles/networkconnectivity.*`, `roles/networkmanagement.*`, `roles/privateca.*` |
| Service roles | `roles/cloudasset.*`, `roles/servicedirectory.*`, `roles/servicemanagement.*`, `roles/servicenetworking.*`, `roles/serviceusage.*` |
| Compute Engine roles (all Compute Engine Admin and Editor roles) | `roles/compute.admin`, `roles/compute.instanceAdmin`, `roles/compute.instanceAdmin.v1`, `roles/compute.loadBalancerAdmin`, `roles/compute.networkAdmin`, `roles/compute.orgFirewallPolicyAdmin`, `roles/compute.orgFirewallPolicyUser`, `roles/compute.orgSecurityPolicyAdmin`, `roles/compute.orgSecurityPolicyUser`, `roles/compute.orgSecurityResourceAdmin`, `roles/compute.osAdminLogin`, `roles/compute.publicIpAdmin`, `roles/compute.securityAdmin`, `roles/compute.storageAdmin`, `roles/compute.xpnAdmin` |

### Medium-sensitivity roles by category

| Category | Examples |
|---|---|
| Editing roles | Role names usually end with Admin, Owner, Editor or Writer, for example `roles/storage.objectAdmin`, `roles/file.editor`, `roles/source.writer`, `roles/container.developer` |
| Data storage roles | `roles/cloudsql.viewer`, `roles/cloudsql.client`, `roles/bigquery.dataViewer`, `roles/bigquery.user`, `roles/spanner.databaseReader`, `roles/spanner.databaseUser` |

### All medium-sensitivity roles (by service)

| Service | Roles |
|---|---|
| Access Approval | `roles/accessapproval.approver`, `roles/accessapproval.configEditor` |
| Access Context Manager | `roles/accesscontextmanager.gcpAccessAdmin`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` |
| Actions | `roles/actions.Admin` |
| AI Platform | `roles/ml.admin`, `roles/ml.developer`, `roles/ml.jobOwner`, `roles/ml.modelOwner`, `roles/ml.modelUser` |
| API Gateway | `roles/apigateway.admin` |
| App Engine | `roles/appengine.appAdmin`, `roles/appengine.appCreator`, `roles/appengine.serviceAdmin` |
| Artifact Analysis | `roles/containeranalysis.admin`, `roles/containeranalysis.notes.attacher`, `roles/containeranalysis.notes.editor`, `roles/containeranalysis.occurrences.editor` |
| AutoML | `roles/automl.admin`, `roles/automl.editor` |
| BigQuery | `roles/bigquery.admin`, `roles/bigquery.dataEditor`, `roles/bigquery.dataOwner`, `roles/bigquery.dataViewer`, `roles/bigquery.resourceAdmin`, `roles/bigquery.resourceEditor`, `roles/bigquery.resourceViewer`, `roles/bigquery.user` |
| Bigtable | `roles/bigtable.admin`, `roles/bigtable.reader`, `roles/bigtable.user` |
| Binary Authorization | `roles/binaryauthorization.attestorsAdmin`, `roles/binaryauthorization.attestorsEditor`, `roles/binaryauthorization.policyAdmin`, `roles/binaryauthorization.policyEditor` |
| Cloud Autoscaling | `roles/autoscaling.metricsWriter`, `roles/autoscaling.sitesAdmin`, `roles/autoscaling.stateWriter` |
| Cloud Build | `roles/cloudbuild.builds.builder`, `roles/cloudbuild.builds.editor` |
| Cloud Deployment Manager | `roles/deploymentmanager.editor`, `roles/deploymentmanager.typeEditor` |
| Cloud Endpoints | `roles/endpoints.portalAdmin` (Beta) |
| Cloud Monitoring | `roles/monitoring.admin`, `roles/monitoring.alertPolicyEditor`, `roles/monitoring.dashboardEditor`, `roles/monitoring.editor`, `roles/monitoring.metricWriter`, `roles/monitoring.notificationChannelEditor`, `roles/monitoring.servicesEditor`, `roles/monitoring.uptimeCheckConfigEditor` |
| Cloud Run | `roles/run.admin`, `roles/run.developer` |
| Cloud Run functions | `roles/cloudfunctions.admin`, `roles/cloudfunctions.developer`, `roles/cloudfunctions.invoker` |
| Cloud Runtime Configuration API | `roles/runtimeconfig.admin` |
| Cloud Scheduler | `roles/cloudscheduler.admin` |
| Cloud Source Repositories | `roles/source.admin`, `roles/source.writer` |
| Cloud SQL | `roles/cloudsql.admin`, `roles/cloudsql.editor`, `roles/cloudsql.client`, `roles/cloudsql.instanceUser`, `roles/cloudsql.viewer` |
| Cloud Storage | `roles/storage.admin`, `roles/storage.hmacKeyAdmin`, `roles/storage.objectAdmin`, `roles/storage.objectCreator`, `roles/storage.objectViewer`, `roles/storage.legacyBucketOwner`, `roles/storage.legacyBucketWriter`, `roles/storage.legacyBucketReader`, `roles/storage.legacyObjectOwner`, `roles/storage.legacyObjectReader` |
| Cloud Tasks | `roles/cloudtasks.admin`, `roles/cloudtasks.enqueuer`, `roles/cloudtasks.queueAdmin`, `roles/cloudtasks.taskDeleter` |
| Cloud TPU | `tpu.admin` (as written in the source) |
| Cloud Trace | `roles/cloudtrace.admin`, `roles/cloudtrace.agent` |
| Compute Engine | `roles/compute.imageUser`, `roles/compute.osLoginExternalUser`, `roles/osconfig.guestPolicyAdmin`, `roles/osconfig.guestPolicyEditor`, `roles/osconfig.osPolicyAssignmentAdmin`, `roles/osconfig.osPolicyAssignmentEditor`, `roles/osconfig.patchDeploymentAdmin` |
| Customer Usage Data Processing | `roles/dataprocessing.admin` |
| Dataflow | `roles/dataflow.admin`, `roles/dataflow.developer` |
| Managed Service for Apache Spark | `roles/dataproc.admin`, `roles/dataproc.editor` |
| Dataproc Metastore | `roles/metastore.admin`, `roles/metastore.editor` |
| Datastore | `roles/datastore.importExportAdmin`, `roles/datastore.indexAdmin`, `roles/datastore.owner`, `roles/datastore.user` |
| Eventarc | `roles/eventarc.admin`, `roles/eventarc.developer`, `roles/eventarc.eventReceiver` |
| Filestore | `roles/file.editor` |
| Firebase | `roles/firebase.admin`, `roles/firebase.analyticsAdmin`, `roles/firebase.developAdmin`, `roles/firebase.growthAdmin`, `roles/firebase.qualityAdmin`, `roles/firebaseabt.admin`, `roles/firebaseappcheck.admin`, `roles/firebaseappdistro.admin`, `roles/firebaseauth.admin`, `roles/firebasecrash.symbolMappingsAdmin`, `roles/firebasecrashlytics.admin`, `roles/firebasedatabase.admin`, `roles/firebasedynamiclinks.admin`, `roles/firebasehosting.admin`, `roles/firebaseinappmessaging.admin`, `roles/firebaseml.admin`, `roles/firebasenotifications.admin`, `roles/firebaseperformance.admin`, `roles/firebasepredictions.admin`, `roles/firebaserules.admin`, `roles/firebasestorage.admin`, `roles/cloudconfig.admin`, `roles/cloudtestservice.testAdmin` |
| Google Cloud VMware Engine | `vmwareengine.vmwareengineAdmin` (as written in the source) |
| Google Kubernetes Engine | `roles/container.admin`, `roles/container.clusterAdmin`, `roles/container.developer` |
| Google Kubernetes Engine Hub | `roles/gkehub.admin`, `roles/gkehub.gatewayAdmin`, `roles/gkehub.connect` |
| Google Security Operations Service Management | `roles/chroniclesm.admin` |
| Google Workspace | `roles/gsuiteaddons.developer` |
| Identity-Aware Proxy | `roles/iap.admin`, `roles/iap.settingsAdmin` |
| Identity Platform | `roles/identityplatform.admin` |
| Identity Toolkit | `roles/identitytoolkit.admin` |
| Managed Service for Microsoft Active Directory | `roles/managedidentities.admin`, `roles/managedidentities.domainAdmin`, `roles/managedidentities.viewer` |
| Memorystore for Redis | `roles/redis.admin`, `roles/redis.editor` |
| OAuthConfig | `roles/oauthconfig.editor` |
| On-Demand Scanning API | `roles/ondemandscanning.admin` |
| Ops Config Monitoring | `roles/opsconfigmonitoring.resourceMetadata.writer` |
| Organization Policy Service | `roles/axt.admin`, `roles/orgpolicy.policyAdmin` |
| Proximity Beacon | `roles/proximitybeacon.attachmentEditor`, `roles/proximitybeacon.beaconEditor` |
| Pub/Sub | `roles/pubsub.admin`, `roles/pubsub.editor` |
| Pub/Sub Lite | `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.publisher` |
| reCAPTCHA | `roles/recaptchaenterprise.admin`, `roles/recaptchaenterprise.agent` |
| Recommendations | `roles/automlrecommendations.admin`, `roles/automlrecommendations.editor` |
| Recommender | `roles/recommender.billingAccountCudAdmin`, `roles/recommender.cloudAssetInsightsAdmin`, `roles/recommender.cloudsqlAdmin`, `roles/recommender.computeAdmin`, `roles/recommender.firewallAdmin`, `roles/recommender.iamAdmin`, `roles/recommender.productSuggestionAdmin`, `roles/recommender.projectCudAdmin` |
| Resource Manager | `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.folderCreator`, `roles/resourcemanager.folderEditor`, `roles/resourcemanager.folderIamAdmin`, `roles/resourcemanager.folderMover`, `roles/resourcemanager.lienModifier`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.projectCreator`, `roles/resourcemanager.projectDeleter`, `roles/resourcemanager.projectIamAdmin`, `roles/resourcemanager.projectMover`, `roles/resourcemanager.tagAdmin` |
| Resource Settings | `roles/resourcesettings.admin` |
| AI Commerce Search API | `roles/retail.admin`, `roles/retail.editor` |
| Serverless VPC Access | `roles/vpcaccess.admin` |
| Service Consumer Management | `roles/serviceconsumermanagement.tenancyUnitsAdmin` |
| Spanner | `roles/spanner.admin`, `roles/spanner.backupAdmin`, `roles/spanner.backupWriter`, `roles/spanner.databaseAdmin`, `roles/spanner.restoreAdmin`, `roles/spanner.databaseReader`, `roles/spanner.databaseUser` |
| Storage Transfer Service | `roles/storagetransfer.admin`, `roles/storagetransfer.user` |
| Gemini Enterprise Agent Platform | `roles/aiplatform.admin`, `roles/aiplatform.featurestoreAdmin`, `roles/aiplatform.migrator`, `roles/aiplatform.user` |
| Vertex AI Workbench user-managed notebooks | `roles/notebooks.admin`, `roles/notebooks.legacyAdmin` |
| Workflows | `roles/workflows.admin`, `roles/workflows.editor` |

### Sensitive roles for AI findings

| Sensitivity | Roles |
|---|---|
| High | `roles/admin`, `roles/writer`, `roles/owner`, `roles/editor`, `roles/resourcemanager.organizationAdmin`, `roles/iam.securityAdmin` (basic, legacy basic and predefined roles) |
| Medium | All administrator, editor, owner and service agent roles for any Google Cloud service, plus `roles/cloudkms.cryptoKeyDecrypter`, `roles/compute.osAdminLogin`, `roles/compute.osLogin`, `roles/iam.serviceAccountTokenCreator`, `roles/iam.serviceAccountUser`, `roles/logging.configWriter`, `roles/logging.privateLogViewer`, `roles/secretmanager.secretAccessor` |
| Low | `roles/cloudfunctions.developer`, `roles/run.developer`, `roles/appengine.deployer`, `roles/iam.workloadIdentityUser`, `roles/iam.serviceAccountOpenIdTokenCreator`, `roles/artifactregistry.createOnPushWriter` |

## Notes

- Sensitive AI permissions include those that create, update, delete or export AI models and data, manage access control to AI services (for example `setIamPolicy`), and use AI capabilities such as making predictions; this also covers permissions to manage sensitive credentials such as Storage HMAC keys.
- The source lists `tpu.admin` and `vmwareengine.vmwareengineAdmin` without the `roles/` prefix; they are kept as written.
- Source inconsistency: in the source the Cloud Trace and Filestore entries link to other products' role pages; only the role names are kept here.
- Source: https://docs.cloud.google.com/security-command-center/docs/concepts-event-threat-detection-overview#sensitive_roles (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-event-threat-detection-overview.md](./concepts-event-threat-detection-overview.md)
- [event-threat-detection-rules.md](./event-threat-detection-rules.md)
- [how-to-use-event-threat-detection.md](./how-to-use-event-threat-detection.md)
