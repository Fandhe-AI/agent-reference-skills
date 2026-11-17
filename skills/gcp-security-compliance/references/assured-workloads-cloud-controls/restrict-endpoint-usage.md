---
source: https://docs.cloud.google.com/docs/security/compliance/restrict-endpoint-usage
---

# Restrict endpoint usage

The Restrict Endpoint Usage organization policy constraint (`constraints/gcp.restrictEndpointUsage`) lets administrators control which Google Cloud API endpoints (global, locational, regional) can be used within a resource hierarchy. It is a list constraint set as a denylist: requests to any supported service endpoint that is not explicitly denied are allowed. Updates apply immediately to all in-scope resources, with eventual consistency.

## Signature / Usage

### Set the policy with gcloud

Create a YAML file with the policy to be updated:

```yaml
constraint: constraints/gcp.restrictEndpointUsage
listPolicy:
    deniedValues:
    - storage.googleapis.com
    - content-bigqueryreservation.googleapis.com
    - bigquerystorage.mtls.googleapis.com
    - logging.googleapis.com
```

Replace `RESOURCE_TYPE` (`project` or `folder`, for example `project`) and `RESOURCE_ID` (the project or folder ID, for example `8767234`) before running the command.

```bash
gcloud resource-manager org-policies set-policy \
--RESOURCE_TYPE='RESOURCE_ID' /tmp/policy.yaml
```

The response contains the newly set organization policy:

```text
constraint: constraints/gcp.restrictEndpointUsage
etag: CKCRl6oGEPjG-tMB
listPolicy:
  deniedValues:
  - storage.googleapis.com
  - content-bigqueryreservation.googleapis.com
  - bigquerystorage.mtls.googleapis.com
  - logging.googleapis.com
updateTime: '2023-11-04T04:29:20.444507Z'
```

### Example denied request

A curl request using the denied endpoint `storage.googleapis.com` fails:

```bash
curl -X GET \
-H "Authorization: Bearer OAUTH2_TOKEN" \
-o "SAVE_TO_LOCATION" \
"https://storage.googleapis.com/storage/v1/b/BUCKET_NAME/o/OBJECT_NAME?alt=media"
```

```text
Access to projects/foo-123 through endpoint storage.googleapis.com was denied by
the constraints/gcp.restrictEndpointUsage organization policy constraint. To
access this resource, please use an allowed endpoint.
```

## Options / Props

### Endpoint types

| Type | Format | Behavior |
|------|--------|----------|
| Global | `SERVICE.googleapis.com` | No location in the hostname. TLS is terminated as close to the client as possible (high availability, low latency); no regional isolation or data residency compliance. |
| Locational | `LOCATION-SERVICE.googleapis.com` (`LOCATION` such as `us-central1`, `europe-west1` or `us`) | Supported by a limited number of services; availability varies. Being replaced by regional endpoints. Don't support data residency compliant connections from on-premises through the internet, or failure domain isolation. |
| Regional (public) | `SERVICE.REGION.rep.googleapis.com` | Scoped to a single region; traffic is processed and TLS terminated entirely within that region. Operations on global, multi-regional and out-of-region regional resources are typically not supported. |
| Regional (private) | `SERVICE.REGION.p.rep.googleapis.com` | `.p.` indicates a private target intended for Private Service Connect connectivity. |

### Setting the policy

| Item | Value |
|------|-------|
| Required role | Organization Policy Administrator (`roles/orgpolicy.policyAdmin`) |
| Levels | Organization, folder, project; overridable at lower levels |
| Constraint type | List constraint; add and remove endpoints in `denied_values` |
| Console policy type | Deny (list of denied endpoints); enter hostnames such as `bigquery.googleapis.com` |
| Inheritance options | Merge with parent, Replace |
| Value-group prefix | `in:` (group names are validated; an invalid name makes the policy setting fail) |

### Supported API endpoints (primary global endpoints)

| Product | Global API endpoints | Product | Global API endpoints | Product | Global API endpoints |
|---|---|---|---|---|---|
| API Gateway | `apigateway.googleapis.com` | API keys | `apikeys.googleapis.com` | Access Approval | `accessapproval.googleapis.com` |
| Access Context Manager | `accesscontextmanager.googleapis.com` | Agent Identity API | `agentidentity.googleapis.com` | Agent Identity Credentials API | `agentidentitycredentials.googleapis.com` |
| Agent Registry | `agentregistry.googleapis.com`, `apphubendpoint.googleapis.com` | Apigee API hub | `apihub.googleapis.com` | Apigee API Management API | `apim.googleapis.com` |
| Apigee Connect API | `apigeeconnect.googleapis.com` | Apigee portal API | `apigeeportal.googleapis.com` | Apigee Registry API | `apigeeregistry.googleapis.com` |
| Apigee | `apigee.googleapis.com` | App Config Manager API | `appconfigmanager.googleapis.com` | Application Design Center | `designcenter.googleapis.com` |
| Application Integration | `integrations.googleapis.com` | Artifact Analysis | `containeranalysis.googleapis.com`, `ondemandscanning.googleapis.com` | Artifact Registry | `artifactregistry.googleapis.com` |
| Assured Open Source Software | `assuredoss.googleapis.com` | Assured Workloads | `assuredworkloads.googleapis.com` | Audit Manager | `auditmanager.googleapis.com` |
| Authorization Toolkit API | `authztoolkit.googleapis.com` | Backup and DR Service | `backupdr.googleapis.com` | Backup for GKE | `gkebackup.googleapis.com` |
| Batch | `batch.googleapis.com` | Chrome Enterprise Premium | `beyondcorp.googleapis.com` | Lakehouse | `biglake.googleapis.com` |
| BigQuery Connections | `bigqueryconnection.googleapis.com` | BigQuery Data Policy | `bigquerydatapolicy.googleapis.com` | BigQuery Data Transfer | `bigquerydatatransfer.googleapis.com` |
| BigQuery Migration | `bigquerymigration.googleapis.com` | BigQuery Reservation | `bigqueryreservation.googleapis.com` | BigQuery Saved Query API | `bigquery-sq.googleapis.com` |
| BigQuery Storage | `bigquerystorage.googleapis.com` | BigQuery | `bigquery.googleapis.com`, `www.googleapis.com (BigQuery)` | Binary Authorization | `binaryauthorization.googleapis.com` |
| Blockchain Analytics | `blockchain.googleapis.com` | Blockchain Node Engine | `blockchainnodeengine.googleapis.com` | Blockchain Validator Manager | `blockchainvalidatormanager.googleapis.com` |
| Business AI Code API | `businessaicode.googleapis.com` | Capacity Planner | `capacityplanner.googleapis.com` | Certificate Authority Service | `privateca.googleapis.com` |
| Certificate Manager | `certificatemanager.googleapis.com` | Cloud Asset Inventory | `cloudasset.googleapis.com` | Bigtable | `bigtable.googleapis.com`, `bigtableadmin.googleapis.com` |
| Cloud Billing | `cloudbilling.googleapis.com` | Cloud Build | `cloudbuild.googleapis.com` | Cloud CDN | `compute.googleapis.com` |
| Cloud Commerce Producer API | `cloudcommerceproducer.googleapis.com` | Managed Service for Apache Airflow | `composer.googleapis.com` | Cloud Controls Partner API | `cloudcontrolspartner.googleapis.com` |
| Cloud DNS | `dns.googleapis.com` | Cloud Data Fusion | `datafusion.googleapis.com` | Cloud Deploy | `clouddeploy.googleapis.com` |
| Cloud Deployment Manager | `runtimeconfig.googleapis.com`, `deploymentmanager.googleapis.com` | Cloud Domains | `domains.googleapis.com` | Cloud Healthcare API | `healthcare.googleapis.com` |
| Cloud Interconnect | `compute.googleapis.com` | Cloud Intrusion Detection System | `ids.googleapis.com` | Cloud Key Management Service | `cloudkms.googleapis.com` |
| Cloud Life Sciences | `lifesciences.googleapis.com` | Cloud Load Balancing | `compute.googleapis.com` | Cloud Logging | `logging.googleapis.com` |
| Cloud Monitoring | `monitoring.googleapis.com` | Cloud NAT | `compute.googleapis.com` | Cloud Natural Language API | `language.googleapis.com` |
| Cloud Next Generation Firewall Enterprise | `networksecurity.googleapis.com` | Cloud Next Generation Firewall Essentials | `compute.googleapis.com`, `networksecurity.googleapis.com` | Cloud Next Generation Firewall Standard | `compute.googleapis.com`, `networksecurity.googleapis.com` |
| Cloud OS Login API | `oslogin.googleapis.com` | Cloud Quotas | `cloudquotas.googleapis.com` | Cloud Router | `compute.googleapis.com` |
| Cloud Run | `run.googleapis.com` | Cloud SQL | `sqladmin.googleapis.com` | Cloud Scheduler | `cloudscheduler.googleapis.com` |
| Cloud Service Mesh | `meshconfig.googleapis.com`, `networksecurity.googleapis.com`, `networkservices.googleapis.com`, `trafficdirector.googleapis.com` | Spanner | `spanner.googleapis.com` | Cloud Storage | `storage.googleapis.com`, `storage-download.googleapis.com`, `storage-upload.googleapis.com`, `www.googleapis.com (Cloud Storage)` |
| Cloud Support API | `cloudsupport.googleapis.com` | Cloud Tasks | `cloudtasks.googleapis.com` | Cloud Tool Results API | `toolresults.googleapis.com` |
| Cloud TPU API | `tpu.googleapis.com` | Cloud Trace API | `cloudtrace.googleapis.com` | Cloud VPN | `compute.googleapis.com` |
| Cloud Workstations | `workstations.googleapis.com` | Cluster Director | `hypercomputecluster.googleapis.com` | Commerce Agreement Publishing API | `commerceagreementpublishing.googleapis.com` |
| Commerce Business Enablement API | `commercebusinessenablement.googleapis.com` | Commerce Price Management API | `commercepricemanagement.googleapis.com` | Compliance Manager | `cloudsecuritycompliance.googleapis.com` |
| Compute Engine | `compute.googleapis.com` | Confidential Computing | `confidentialcomputing.googleapis.com` | Connect | `gkeconnect.googleapis.com` |
| Connect gateway | `connectgateway.googleapis.com` | Contact Center AI Platform API | `contactcenteraiplatform.googleapis.com` | Container Threat Detection | `containerthreatdetection.googleapis.com` |
| Content Warehouse API | `contentwarehouse.googleapis.com` | Context-Aware Access | `accesscontextmanager.googleapis.com` | Continuous Validation API | `continuousvalidation.googleapis.com` |
| Dialogflow CX | `dialogflow.googleapis.com` | Data Labeling API | `datalabeling.googleapis.com` | Data Security Posture Management API | `dspm.googleapis.com` |
| Database Center | `databasecenter.googleapis.com` | Database Migration Service | `datamigration.googleapis.com` | Dataform | `dataform.googleapis.com` |
| Dataflow | `dataflow.googleapis.com` | Knowledge Catalog | `dataplex.googleapis.com`, `datalineage.googleapis.com` | Managed Service for Apache Spark | `dataproc.googleapis.com` |
| Dataproc on GDC | `dataprocgdc.googleapis.com` | Datastream | `datastream.googleapis.com` | Developer Connect | `developerconnect.googleapis.com` |
| Google Distributed Cloud | `opsconfigmonitoring.googleapis.com`, `gdcvmmanager.googleapis.com`, `gdchardwaremanagement.googleapis.com` | Distributed Cloud Edge Container API | `edgecontainer.googleapis.com` | Distributed Cloud Edge Network API | `edgenetwork.googleapis.com` |
| Document AI | `documentai.googleapis.com` | Enterprise Knowledge Graph | `enterpriseknowledgegraph.googleapis.com` | Error Reporting | `clouderrorreporting.googleapis.com` |
| Essential Contacts | `essentialcontacts.googleapis.com` | Eventarc API | `eventarc.googleapis.com` | Filestore | `file.googleapis.com` |
| Firestore | `firestore.googleapis.com` | Firestore in Datastore mode (Datastore) | `datastore.googleapis.com` | Financial Services API | `financialservices.googleapis.com` |
| Firebase AI Logic | `firebasevertexai.googleapis.com` | Firebase App Hosting | `firebaseapphosting.googleapis.com` | Firebase Data Connect | `firebasedataconnect.googleapis.com` |
| Firebase Security Rules | `firebaserules.googleapis.com` | Generative AI on Gemini Enterprise Agent Platform | `aiplatform.googleapis.com` | GKE Dataplane Management | `gkedataplanemanagement.googleapis.com` |
| GKE Enterprise Edge API | `anthosedge.googleapis.com` | GKE Fleet (Fleet) | `gkehub.googleapis.com` | GKE Multi-Cloud | `gkemulticloud.googleapis.com` |
| GKE On-Prem API | `gkeonprem.googleapis.com` | Gemini Enterprise | `discoveryengine.googleapis.com` | Gemini for Google Cloud API | `cloudaicompanion.googleapis.com` |
| Google Antigravity for Enterprise | `businessaicode.googleapis.com` | Google Cloud API | `cloud.googleapis.com` | Google Cloud Armor | `compute.googleapis.com` |
| Google Cloud Migration Center | `migrationcenter.googleapis.com` | Google Cloud NetApp Volumes | `netapp.googleapis.com` | Google Cloud Observability | `stackdriver.googleapis.com` |
| Google Kubernetes Engine | `container.googleapis.com`, `configdelivery.googleapis.com` | Google Security Operations Partner API | `chroniclepartner.googleapis.com` | Google Security Operations | Restricting global API endpoints isn't supported. |
| Google Workspace add-ons | `gsuiteaddons.googleapis.com` | Identity and Access Management | `iam.googleapis.com` | Identity-Aware Proxy | `iap.googleapis.com` |
| Image streaming | `containerfilesystem.googleapis.com` | Immersive Stream | `stream.googleapis.com` | Infrastructure Manager | `config.googleapis.com` |
| Integration Connectors | `connectors.googleapis.com` | KRM API Hosting | `krmapihosting.googleapis.com` | Live Stream API | `livestream.googleapis.com` |
| Looker API | `looker.googleapis.com` | AlloyDB for PostgreSQL | `alloydb.googleapis.com` | BigQuery Engine for Apache Flink | `managedflink.googleapis.com` |
| Managed Kafka API | `managedkafka.googleapis.com` | Google Cloud Managed Lustre | `lustre.googleapis.com` | Media Asset Manager | `mediaasset.googleapis.com` |
| Memorystore for Memcached | `memcache.googleapis.com` | Memorystore for Redis | `redis.googleapis.com` | Memorystore for Valkey | `memorystore.googleapis.com` |
| Microservices API | `microservices.googleapis.com` | Model Armor | `modelarmor.googleapis.com` | Network Connectivity Center | `networkconnectivity.googleapis.com` |
| NCC Gateway | `networkconnectivity.googleapis.com`, `networksecurity.googleapis.com` | Network Intelligence Center | `networkmanagement.googleapis.com` | Network Service Tiers | `compute.googleapis.com` |
| Persistent Disk | `compute.googleapis.com` | Oracle Database@Google Cloud | `oracledatabase.googleapis.com` | Parallelstore | `parallelstore.googleapis.com` |
| Parameter Manager | `parametermanager.googleapis.com` | Policy Analyzer | `policyanalyzer.googleapis.com` | Policy Troubleshooter | `policytroubleshooter.googleapis.com` |
| Privileged Access Manager | `privilegedaccessmanager.googleapis.com` | Progressive Rollout | `progressiverollout.googleapis.com` | Pub/Sub | `pubsub.googleapis.com` |
| Public Certificate Authority | `publicca.googleapis.com` | Recommender | `recommender.googleapis.com` | Remote Build Execution | `remotebuildexecution.googleapis.com` |
| AI Commerce Search API | `retail.googleapis.com` | Cyber Insurance Hub | `riskmanager.googleapis.com` | SaaS Service Management API | `saasservicemgmt.googleapis.com` |
| SecLM API | `seclm.googleapis.com` | Secret Manager | `secretmanager.googleapis.com` | Secure Source Manager | `securesourcemanager.googleapis.com` |
| Secure Web Proxy | `networksecurity.googleapis.com`, `networkservices.googleapis.com` | Security Command Center | `securitycenter.googleapis.com`, `securitycentermanagement.googleapis.com`, `securityposture.googleapis.com` | Sensitive Data Protection | `dlp.googleapis.com` |
| Service Account Credentials API | `iamcredentials.googleapis.com` | Service Directory | `servicedirectory.googleapis.com` | Personalized Service Health | `servicehealth.googleapis.com` |
| Service Networking | `servicenetworking.googleapis.com` | Service Usage | `serviceusage.googleapis.com` | Speaker ID | `speakerid.googleapis.com` |
| Speech-to-Text | `speech.googleapis.com` | Storage Insights | `storageinsights.googleapis.com` | Storage Transfer Service | `storagebatchoperations.googleapis.com`, `storagetransfer.googleapis.com` |
| Text-to-Speech | `texttospeech.googleapis.com` | Timeseries Insights API | `timeseriesinsights.googleapis.com` | Transcoder API | `transcoder.googleapis.com` |
| Transfer Appliance | `transferappliance.googleapis.com` | VM Manager | `osconfig.googleapis.com` | Agent Platform API | `aiplatform.googleapis.com` |
| Vector Search | `aiplatform.googleapis.com` | Gemini Enterprise Agent Platform Workbench | `notebooks.googleapis.com` | Video Search API | `cloudvideosearch.googleapis.com` |
| Video Stitcher API | `videostitcher.googleapis.com` | Cloud Vision | `vision.googleapis.com` | Virtual Private Cloud (VPC) | `compute.googleapis.com` |
| Web Risk | `webrisk.googleapis.com` | Web Security Scanner | `websecurityscanner.googleapis.com` | Workflows | `workflows.googleapis.com`, `workflowexecutions.googleapis.com` |
| Workload Certificate API | `workloadcertificate.googleapis.com` | Workload Manager | `workloadmanager.googleapis.com` |  |  |

### Locational and regional API endpoints listed in the source

| Product | Type | Endpoints |
|---|---|---|
| Lakehouse | Regional | `biglake.LOCATION.rep.googleapis.com` for LOCATION = `asia-south1`, `asia-south2`, `europe-west1`, `europe-west10`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central2`, `northamerica-northeast1`, `northamerica-northeast2`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4` |
| Business AI Code API | Regional | `businessaicode.LOCATION.rep.googleapis.com` for LOCATION = `eu`, `us` |
| Dialogflow CX | Locational | `LOCATION-dialogflow.googleapis.com` for LOCATION = `asia-northeast1`, `asia-northeast3`, `asia-south1`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `eu`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `us-central1`, `us`, `us-east1`, `us-west1` |
| Document AI | Locational | `LOCATION-documentai.googleapis.com` for LOCATION = `asia-south1`, `asia-southeast1`, `australia-southeast1`, `eu`, `europe-west2`, `europe-west3`, `northamerica-northeast1`, `us` |
| Firestore | Locational | `LOCATION-firestore.googleapis.com` for LOCATION = `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `eur3`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `europe-west10`, `europe-west12`, `me-central1`, `me-central2`, `me-west1`, `nam5`, `nam7`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4` |
| Firestore | Regional | `firestore.LOCATION.rep.googleapis.com` for LOCATION = `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4` |
| Firestore in Datastore mode (Datastore) | Locational | `LOCATION-datastore.googleapis.com` for LOCATION = `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `eur3`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `europe-west10`, `europe-west12`, `me-central1`, `me-central2`, `me-west1`, `nam5`, `nam7`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4` |
| Firestore in Datastore mode (Datastore) | Regional | `datastore.LOCATION.rep.googleapis.com` for LOCATION = `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4` |
| Generative AI on Gemini Enterprise Agent Platform | Locational | `LOCATION-aiplatform.googleapis.com` for LOCATION = `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `europe-west10`, `europe-west12`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8` |
| Generative AI on Gemini Enterprise Agent Platform | Regional | `aiplatform.LOCATION.rep.googleapis.com` for LOCATION = `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `europe-west10`, `europe-west12`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`, `us` |
| Gemini Enterprise | Locational | `LOCATION-discoveryengine.googleapis.com` for LOCATION = `eu`, `us` |
| Google Antigravity for Enterprise | Regional | `businessaicode.LOCATION.rep.googleapis.com` for LOCATION = `eu`, `us` |
| Google Security Operations | Locational | `LOCATION-chronicle.googleapis.com` for LOCATION = `africa-south1`, `asia-northeast1`, `asia-south1`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `eu`, `europe-west2`, `europe-west3`, `europe-west6`, `europe-west9`, `europe-west12`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast2`, `southamerica-east1`, `us` |
| Google Security Operations | Regional | `chronicle.LOCATION.rep.googleapis.com` for LOCATION = `africa-south1`, `asia-northeast1`, `asia-south1`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `eu`, `europe-west2`, `europe-west3`, `europe-west6`, `europe-west9`, `europe-west12`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast2`, `southamerica-east1`, `us` |
| Speech-to-Text | Locational | `LOCATION-speech.googleapis.com` for LOCATION = `asia-northeast1`, `asia-northeast3`, `asia-south1`, `asia-southeast1`, `australia-southeast1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `northamerica-northeast1`, `southamerica-east1`, `us-central1`, `us-east1`, `us-east4`, `us-west1` |
| Agent Platform API | Locational | `LOCATION-aiplatform.googleapis.com` for LOCATION = `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `europe-west10`, `europe-west12`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8` |
| Agent Platform API | Regional | `aiplatform.LOCATION.rep.googleapis.com` for LOCATION = `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `europe-west10`, `europe-west12`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`, `us` |
| Vector Search | Locational | `LOCATION-aiplatform.googleapis.com` for LOCATION = `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `europe-west10`, `europe-west12`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8` |
| Vector Search | Regional | `aiplatform.LOCATION.rep.googleapis.com` for LOCATION = `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `europe-west10`, `europe-west12`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`, `us` |
| Cloud Vision | Locational | `LOCATION-vision.googleapis.com` for LOCATION = `eu`, `us` |
| Workflows | Locational | `LOCATION-workflowexecutions.googleapis.com` for LOCATION = `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-southwest1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `europe-west10`, `europe-west12`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4` |

### Product notes

| Product | Notes |
|---|---|
| BigQuery | `www.googleapis.com/.../bigquery/...` is a legacy API endpoint format. Your organization should use the newer APIs instead. You can add `www.googleapis.com (BigQuery)` to the Restrict Endpoint Usage policy constraint to avoid accidental use of the old APIs. |
| Business AI Code API | Supports Google Antigravity in Gemini Enterprise and Gemini Code Assist. |
| Cloud Storage | The endpoints `storage-download.googleapis.com`, `storage-upload.googleapis.com`, and `www.googleapis.com/.../storage/...` are legacy API endpoint formats. Your organization should use the newer `storage.googleapis.com` API endpoint instead. To prevent accidental use of the legacy APIs, you can add `storage-download.googleapis.com`, `storage-upload.googleapis.com`, and `www.googleapis.com (Cloud Storage)` to the Restrict Endpoint Usage policy constraint denylist. Some Cloud Storage operations are not supported when using locational endpoints. See [Locational endpoints](https://docs.cloud.google.com/storage/docs/locational-endpoints#supported-operations) for more information. If you configured the Restrict Endpoint Usage constraint to restrict global endpoints, you can use the Google Cloud console to perform these operations. These operations don't carry Customer Data as defined in the data residency service terms, and you can use them in the Google Cloud console without violating ITAR compliance. [Virtual hosted-style endpoints](https://docs.cloud.google.com/storage/docs/request-endpoints#xml-api) for the global endpoint are not supported at this time (e.g. `https://BUCKET_NAME.storage.googleapis.com`). |
| Generative AI on Gemini Enterprise Agent Platform | Shares underlying API endpoints with Gemini Enterprise Agent Platform and Vector Search. Endpoint restrictions applied to these endpoints affect all Vertex AI services. You can also manage access using the curated `in:*-aiplatform-endpoints` value groups (such as `in:global-aiplatform-endpoints`, `in:aiplatform-us-endpoints`, and `in:non-us-aiplatform-endpoints`). |
| Agent Platform API | Shares underlying API endpoints with Generative AI on Gemini Enterprise Agent Platform and Vector Search. Endpoint restrictions applied to these endpoints affect all Vertex AI services. You can also manage access using the curated `in:*-aiplatform-endpoints` value groups (such as `in:global-aiplatform-endpoints`, `in:aiplatform-us-endpoints`, and `in:non-us-aiplatform-endpoints`). |
| Vector Search | Shares underlying API endpoints with Gemini Enterprise Agent Platform and Generative AI on Gemini Enterprise Agent Platform. Endpoint restrictions applied to these endpoints affect all Vertex AI services. You can also manage access using the curated `in:*-aiplatform-endpoints` value groups (such as `in:global-aiplatform-endpoints`, `in:aiplatform-us-endpoints`, and `in:non-us-aiplatform-endpoints`). |

### Value groups

| Group | Group | Group | Group | Group |
|---|---|---|---|---|
| `global-accessapproval-endpoints` | `global-accesscontextintelligence-endpoints` | `global-agentidentity-endpoints` | `global-agentidentitycredentials-endpoints` | `global-agentregistry-endpoints` |
| `global-agentregistryendpoint-endpoints` | `global-alloydb-endpoints` | `global-anthosidentityservice-endpoints` | `global-apigee-endpoints` | `global-apikeys-endpoints` |
| `global-apphub-endpoints` | `global-artifactregistry-endpoints` | `global-auditmanager-endpoints` | `global-backupdr-endpoints` | `global-bigquery-connections-endpoints` |
| `global-bigquery-datapolicy-endpoints` | `global-bigquery-datatransfer-endpoints` | `global-bigquery-migration-endpoints` | `global-bigtable-endpoints` | `global-binaryauthorization-endpoints` |
| `global-cas-endpoints` | `global-certificatemanager-endpoints` | `global-cloudasset-endpoints` | `global-cloudbilling-endpoints` | `global-cloudbuild-endpoints` |
| `global-cloudquotas-endpoints` | `global-cloudscheduler-endpoints` | `global-cloudsecuritycompliance-endpoints` | `global-cloudtasks-endpoints` | `global-cloudtrace-endpoints` |
| `global-composer-endpoints` | `global-compute-endpoints` | `global-config-endpoints` | `global-connectgateway-endpoints` | `global-connectors-endpoints` |
| `global-container-endpoints` | `global-containeranalysis-endpoints` | `global-containerfilesystem-endpoints` | `global-containerthreatdetection-endpoints` | `global-databasecenter-endpoints` |
| `global-dataflow-endpoints` | `global-dataform-endpoints` | `global-datafusion-endpoints` | `global-datalineage-endpoints` | `global-dataplex-endpoints` |
| `global-dataproc-endpoints` | `global-datastore-endpoints` | `global-datastream-endpoints` | `global-developerconnect-endpoints` | `global-discoveryengine-endpoints` |
| `global-dlp-endpoints` | `global-dns-endpoints` | `global-documentai-endpoints` | `global-domains-endpoints` | `global-essentialcontacts-endpoints` |
| `global-eventarc-endpoints` | `global-filestore-endpoints` | `global-firebaserules-endpoints` | `global-firestore-endpoints` | `global-firestorekeyvisualizer-endpoints` |
| `global-gkebackup-endpoints` | `global-gkeconnect-endpoints` | `global-gkehub-endpoints` | `global-hypercomputecluster-endpoints` | `global-iam-endpoints` |
| `global-iap-endpoints` | `global-kms-endpoints` | `global-looker-endpoints` | `global-lustre-endpoints` | `global-managedkafka-endpoints` |
| `global-memcache-endpoints` | `global-memorystore-endpoints` | `global-meshconfig-endpoints` | `global-migrationcenter-endpoints` | `global-modelarmor-endpoints` |
| `global-monitoring-endpoints` | `global-netapp-endpoints` | `global-networkconnectivity-endpoints` | `global-networkmanagement-endpoints` | `global-networksecurity-endpoints` |
| `global-networkservices-endpoints` | `global-osconfig-endpoints` | `global-oslogin-endpoints` | `global-parametermanager-endpoints` | `global-policytroubleshooter-endpoints` |
| `global-privilegedaccessmanager-endpoints` | `global-progressiverollout-endpoints` | `global-pubsub-endpoints` | `global-recommender-endpoints` | `global-redis-endpoints` |
| `global-run-endpoints` | `global-secretmanager-endpoints` | `global-securesourcemanager-endpoints` | `global-securitycenter-endpoints` | `global-securitycentermanagement-endpoints` |
| `global-securityposture-endpoints` | `global-servicedirectory-endpoints` | `global-servicehealth-endpoints` | `global-servicenetworking-endpoints` | `global-serviceusage-endpoints` |
| `global-spanner-endpoints` | `global-speech-endpoints` | `global-sqladmin-endpoints` | `global-storagetransfer-endpoints` | `global-texttospeech-endpoints` |
| `global-tpu-endpoints` | `global-trafficdirector-endpoints` | `global-websecurityscanner-endpoints` | `global-workflowexecutions-endpoints` | `global-workflows-endpoints` |
| `global-workloadmanager-endpoints` | `global-workstations-endpoints` | `non-eu-aiplatform-endpoints` | `aiplatform-africa-endpoints` | `aiplatform-americas-non-us-endpoints` |
| `aiplatform-canada-endpoints` | `aiplatform-southamerica-endpoints` | `aiplatform-asia-endpoints` | `aiplatform-asia-east-endpoints` | `aiplatform-asia-northeast-endpoints` |
| `aiplatform-asia-south-endpoints` | `aiplatform-asia-southeast-endpoints` | `aiplatform-australia-endpoints` | `aiplatform-europe-non-eu-endpoints` | `aiplatform-middleeast-endpoints` |
| `aiplatform-us-endpoints` | `aiplatform-us-central-endpoints` | `aiplatform-us-east-endpoints` | `aiplatform-us-multi-endpoints` | `aiplatform-us-south-endpoints` |
| `aiplatform-us-west-a-endpoints` | `aiplatform-us-west-b-endpoints` | `global-aiplatform-endpoints` | `non-us-aiplatform-endpoints` | `aiplatform-eu-endpoints` |
| `aiplatform-eu-central-endpoints` | `aiplatform-eu-multi-endpoints` | `aiplatform-eu-north-endpoints` | `aiplatform-eu-southwest-endpoints` | `aiplatform-eu-west-a-endpoints` |
| `aiplatform-eu-west-b-endpoints` | `global-bigquery-endpoints` | `global-bigqueryreservation-endpoints` | `global-bigquerystorage-endpoints` | `global-logging-endpoints` |
| `global-storage-endpoints` |  |  |  |  |

## Notes

- Supported API endpoints (primary global endpoints): Each product may also support a `SERVICE_NAME.mtls.googleapis.com` variant or a `content-SERVICE_NAME.googleapis.com` variant of its global endpoint (for example `pubsub.mtls.googleapis.com`, `content-pubsub.googleapis.com`); use a value group to restrict all variants. Regional and locational endpoints for these products are also supported; see each product's API documentation for the full list.
- Value groups: Use the `in:` prefix (for example `in:global-kms-endpoints`). Google expands groups over time without requiring a policy change; group names are validated when the policy is set.
- Warning (from the source): an organization policy with this constraint makes violating service API requests fail, which can break workloads if the constraint is set on existing resources. The policy is applied with eventual consistency. Denying `storage.googleapis.com` or `logging.googleapis.com` as in the example is disruptive; test the policy on non-production projects and folders first and roll it out gradually.
- Recommended: set the policy in dry-run mode first (violations are audit logged but not denied); see "Create an organization policy in dry-run mode" in the Organization Policy documentation (https://docs.cloud.google.com/resource-manager/docs/organization-policy/dry-run-policy#create_dry_run_list_policy).
- Not to be confused with the Restrict Resource Location constraint (where resources can be created) or the Restrict Resource Service Usage constraint (which services can be used). Organization policies that contain this constraint are not data residency commitments.
- Denied requests return an error and generate an audit log entry (`policyViolationInfo.orgPolicyViolationInfo` with `checkedValue`, `constraintViolationInfo` of type `type.googleapis.com/google.cloud.audit.RestrictEndpointUsageViolationInfo`, `errorMessage` and `policyType: LIST_CONSTRAINT`); the source's example entry is omitted. If present, `tlsTerminationRegionCode` is the CLDR region code where TLS termination occurred, which helps determine whether data was decrypted outside your geographic boundaries. For API requests that use third-party credentials, `authenticationInfo` might not occur in the audit log.
- `OAUTH2_TOKEN` in the `curl` example is a bearer token; do not paste it into shared terminals, scripts or CI logs.
- Value groups: the source table also gives each group's description and its direct members (endpoint values, or nested groups for aggregates such as `aiplatform-us-endpoints` and `non-us-aiplatform-endpoints`); members are not repeated here.
- The source also shows Console steps for setting the policy.
- Source: https://docs.cloud.google.com/docs/security/compliance/restrict-endpoint-usage (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [restrict-tls-cipher-suites.md](./restrict-tls-cipher-suites.md)
- [il4.md](./il4.md)
