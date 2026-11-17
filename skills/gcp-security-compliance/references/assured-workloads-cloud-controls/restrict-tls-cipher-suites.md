---
source: https://docs.cloud.google.com/docs/security/compliance/restrict-tls-cipher-suites
---

# Restrict TLS cipher suites

The `gcp.restrictTLSCipherSuites` organization policy constraint denies requests made with less secure TLS cipher suites. It can be applied on organizations, folders, or projects, and works either as an allow list (only the listed suites are allowed) or as a deny list (listed suites are denied, all others allowed). The constraint applies to the resource node and all its children, and is enforced with eventual consistency (it can take up to tens of minutes to apply fully).

## Signature / Usage

### Set the policy with gcloud

Create a policy YAML file that references the constraint:

```yaml
constraint: constraints/gcp.restrictTLSCipherSuites
listPolicy:
  allowedValues:
  - in:CNSA-2.0-recommended-ciphers
  - is:TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA
```

Replace `RESOURCE_TYPE` with `organization`, `folder` or `project`; `RESOURCE_ID` with your organization ID, folder ID, project ID, or project number; and `POLICY_PATH` with the full path to the YAML file.

```bash
gcloud resource-manager org-policies set-policy \
--RESOURCE_TYPE RESOURCE_ID \
POLICY_PATH
```

The response returns the new organization policy:

```text
constraint: constraints/gcp.restrictTLSCipherSuites
etag: COS9qr0GELii6o0C
listPolicy:
  allowedValues:
  - in:CNSA-2.0-recommended-ciphers
  - is:TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA
updateTime: '2025-02-11T00:50:44.565875Z'
```

### Example error message

```text
Request is disallowed by organization's constraints/gcp.restrictTLSCipherSuites
constraint for 'projects/PROJECT_NUMBER'.
Access to service
'SERVICE_NAME.googleapis.com' attempted with a disallowed TLS Cipher Suite: 'TLS_Cipher_Suite_X`
To access this resource, please use an allowed TLS Cipher Suite.
```

`PROJECT_NUMBER` is the project number hosting the resource, `SERVICE_NAME` the in-scope service blocked by the policy, and `TLS_Cipher_Suite_X` the cipher suite used in the request.

### Test the policy

Replace `TLS_CIPHER_SUITE` (OpenSSL name, for example `ECDHE-ECDSA-AES128-SHA` for `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA`) and `PROJECT_ID` (the project containing the key ring).

Adapted (not in the official docs): `--verbose` removed: it prints the request headers, including the `Authorization` bearer token, to standard error.

```bash
curl --ciphers TLS_CIPHER_SUITE --tls-max 1.2 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID/locations/global/keyRings"
```

Concrete example with `PROJECT_ID` set to `my-project-id` and `TLS_CIPHER_SUITE` set to `ECDHE-ECDSA-AES128-SHA`.

Adapted (not in the official docs): removed the stray `GET` argument, which curl would treat as a second URL (the request is a GET by default). `--verbose` removed: it prints the request headers, including the `Authorization` bearer token, to standard error.

```bash
curl --ciphers ECDHE-ECDSA-AES128-SHA --tls-max 1.2 \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudkms.googleapis.com/v1/projects/my-project-id/locations/global/keyRings"
```

If the policy for `my-project-id` denies `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA`, the request fails with:

```text
Request is disallowed by organization's constraints/gcp.restrictTLSCipherSuites
constraint for 'projects/my-project-id'.
Access to service cloudkms.googleapis.com attempted with a disallowed TLS Cipher
Suite: `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA`.
To access this resource, please use an allowed TLS Cipher Suite.
```

## Options / Props

### Policy settings

| Item | Value |
|------|-------|
| Required role | Organization policy administrator (`roles/orgpolicy.policyAdmin`) on the organization |
| Levels | Organization, folder, project |
| List fields | `allowed_values` or `denied_values` |
| Value prefixes | `in:` for a value group, `is:` for a specific cipher suite string |
| Inheritance options | Merge with parent, Replace |
| Value-group validation | Names are validated when the policy is set; an invalid group name makes the call fail |

### Value groups (expanded over time by Google)

| Group | Direct members |
|---|---|
| `CNSA-2.0-recommended-ciphers` | `TLS_AES_256_GCM_SHA384`, `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`, `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384` |
| `NIST-800-52-recommended-ciphers` | `TLS_AES_128_GCM_SHA256`, `TLS_AES_256_GCM_SHA384`, `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA`, `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`, `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA`, `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`, `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA`, `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`, `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA`, `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384` |

### Supported cipher suites

| Suite |
|---|
| `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256` |
| `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256` |
| `TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256` |
| `TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256` |
| `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA` |
| `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA` |
| `TLS_RSA_WITH_AES_128_GCM_SHA256` |
| `TLS_RSA_WITH_AES_128_CBC_SHA` |
| `TLS_RSA_WITH_3DES_EDE_CBC_SHA` |
| `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384` |
| `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384` |
| `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA` |
| `TLS_RSA_WITH_AES_256_GCM_SHA384` |
| `TLS_RSA_WITH_AES_256_CBC_SHA` |
| `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA` |
| `TLS_AES_128_GCM_SHA256` (TLS 1.3 cipher suite) |
| `TLS_AES_256_GCM_SHA384` (TLS 1.3 cipher suite) |
| `TLS_CHACHA20_POLY1305_SHA256` (TLS 1.3 cipher suite) |

### Cipher suite preference (most to least preferred)

| Order | Family |
|---|---|
| 1 | AES-256 |
| 2 | AES-128 |
| 3 | ChaCha20 |

### Supported services (the constraint applies to global, locational, and regional endpoints)

| Product | API endpoint | Product | API endpoint | Product | API endpoint |
|---|---|---|---|---|---|
| AI Platform | `ml.googleapis.com` | API Gateway | `apigateway.googleapis.com` | API keys | `apikeys.googleapis.com` |
| Access Context Intelligence | `accesscontextintelligence.googleapis.com` | Access Context Manager | `accesscontextmanager.googleapis.com` | Agent Gateway | `networkservices.googleapis.com` |
| Agent Identity API | `agentidentity.googleapis.com` | Agent Identity Credentials API | `agentidentitycredentials.googleapis.com` | Agent Registry | `agentregistry.googleapis.com`, `apphubendpoint.googleapis.com` |
| AlloyDB for PostgreSQL | `alloydb.googleapis.com` | Apigee API hub | `apihub.googleapis.com` | Apigee API Management API | `apim.googleapis.com` |
| Apigee Connect API | `apigeeconnect.googleapis.com` | Apigee portal API | `apigeeportal.googleapis.com` | Apigee Registry API | `apigeeregistry.googleapis.com` |
| Apigee | `apigee.googleapis.com` | App Config Manager API | `appconfigmanager.googleapis.com` | App Engine | `appengine.googleapis.com` |
| App Hub | `apphub.googleapis.com` | Application Design Center | `designcenter.googleapis.com` | Application Integration | `integrations.googleapis.com` |
| Artifact Analysis | `containeranalysis.googleapis.com`, `ondemandscanning.googleapis.com` | Artifact Registry | `artifactregistry.googleapis.com` | Assured Open Source Software | `assuredoss.googleapis.com` |
| Assured Workloads | `assuredworkloads.googleapis.com` | Audit Manager | `auditmanager.googleapis.com` | Authorization Toolkit API | `authztoolkit.googleapis.com` |
| Backup and DR Service | `backupdr.googleapis.com` | Backup for GKE | `gkebackup.googleapis.com` | Bare Metal Solution | `baremetalsolution.googleapis.com` |
| Batch | `batch.googleapis.com` | Chrome Enterprise Premium | `beyondcorp.googleapis.com` | BigLake | `biglake.googleapis.com` |
| BigQuery BI Engine | `bigquerybiengine.googleapis.com` | BigQuery Connections | `bigqueryconnection.googleapis.com` | BigQuery Data Policy | `bigquerydatapolicy.googleapis.com` |
| BigQuery Data Transfer | `bigquerydatatransfer.googleapis.com` | BigQuery Migration | `bigquerymigration.googleapis.com` | BigQuery Reservation | `bigqueryreservation.googleapis.com` |
| BigQuery Saved Query API | `bigquery-sq.googleapis.com` | BigQuery Storage | `bigquerystorage.googleapis.com` | BigQuery | `bigquery.googleapis.com` |
| BigQuery sharing | `analyticshub.googleapis.com` | Bigtable | `bigtable.googleapis.com`, `bigtableadmin.googleapis.com` | Binary Authorization | `binaryauthorization.googleapis.com` |
| Blockchain Analytics | `blockchain.googleapis.com` | Blockchain Node Engine | `blockchainnodeengine.googleapis.com` | Blockchain Validator Manager | `blockchainvalidatormanager.googleapis.com` |
| Capacity Planner | `capacityplanner.googleapis.com` | Certificate Authority Service | `privateca.googleapis.com` | Certificate Manager | `certificatemanager.googleapis.com` |
| Cloud Asset Inventory | `cloudasset.googleapis.com` | Cloud Billing | `cloudbilling.googleapis.com` | Cloud Build | `cloudbuild.googleapis.com` |
| Cloud CDN | `compute.googleapis.com` | Cloud Commerce Consumer Procurement API | `cloudcommerceconsumerprocurement.googleapis.com` | Cloud Commerce Producer API | `cloudcommerceproducer.googleapis.com` |
| Managed Service for Apache Airflow | `composer.googleapis.com` | Cloud Controls Partner API | `cloudcontrolspartner.googleapis.com` | Cloud DNS | `dns.googleapis.com` |
| Cloud Data Fusion | `datafusion.googleapis.com` | Cloud Deploy | `clouddeploy.googleapis.com` | Cloud Deployment Manager | `runtimeconfig.googleapis.com`, `deploymentmanager.googleapis.com` |
| Cloud Domains | `domains.googleapis.com` | Cloud Healthcare API | `healthcare.googleapis.com` | Cloud Interconnect | `compute.googleapis.com` |
| Cloud Intrusion Detection System | `ids.googleapis.com` | Cloud Key Management Service | `cloudkms.googleapis.com`, `kmsinventory.googleapis.com` | Cloud Life Sciences | `lifesciences.googleapis.com`, `genomics.googleapis.com` |
| Cloud Load Balancing | `compute.googleapis.com` | Cloud Logging | `logging.googleapis.com` | Cloud Monitoring | `monitoring.googleapis.com` |
| Cloud NAT | `compute.googleapis.com` | Cloud Natural Language API | `language.googleapis.com` | Cloud Next Generation Firewall Essentials | `compute.googleapis.com`, `networksecurity.googleapis.com` |
| Cloud Next Generation Firewall Standard | `compute.googleapis.com`, `networksecurity.googleapis.com` | Cloud OS Login API | `oslogin.googleapis.com` | Cloud Quotas | `cloudquotas.googleapis.com` |
| Image streaming | `containerfilesystem.googleapis.com` | Cloud Router | `compute.googleapis.com` | Cloud Run | `run.googleapis.com`, `runapps.googleapis.com` |
| Cloud SQL | `cloudsql.googleapis.com`, `sqladmin.googleapis.com` | Cloud Scheduler | `cloudscheduler.googleapis.com` | Cloud Service Mesh | `meshconfig.googleapis.com`, `meshca.googleapis.com`, `networksecurity.googleapis.com`, `networkservices.googleapis.com` |
| Cloud Source Repositories | `sourcerepo.googleapis.com` | Cloud Storage | `storage.googleapis.com` | Cloud Support API | `cloudsupport.googleapis.com` |
| Cloud TPU | `tpu.googleapis.com` | Cloud Tasks | `cloudtasks.googleapis.com` | Cloud Tool Results API | `toolresults.googleapis.com` |
| Cloud Trace | `cloudtrace.googleapis.com` | Cloud Translation | `translate.googleapis.com` | Cloud VPN | `compute.googleapis.com` |
| Cloud Vision | `vision.googleapis.com` | Cloud Workstations | `workstations.googleapis.com` | Cluster Director | `hypercomputecluster.googleapis.com` |
| Commerce Agreement Publishing API | `commerceagreementpublishing.googleapis.com` | Commerce Business Enablement API | `commercebusinessenablement.googleapis.com` | Commerce Org Governance API | `commerceorggovernance.googleapis.com` |
| Commerce Price Management API | `commercepricemanagement.googleapis.com` | Compliance Manager | `cloudsecuritycompliance.googleapis.com` | Compute Engine | `compute.googleapis.com` |
| Confidential Computing | `confidentialcomputing.googleapis.com` | Connect | `gkeconnect.googleapis.com` | Connect gateway | `connectgateway.googleapis.com` |
| Contact Center AI Platform API | `contactcenteraiplatform.googleapis.com` | Container Threat Detection | `containerthreatdetection.googleapis.com` | Content Warehouse API | `contentwarehouse.googleapis.com` |
| Continuous Validation API | `continuousvalidation.googleapis.com` | Dialogflow CX | `dialogflow.googleapis.com` | Customer Experience Insights | `contactcenterinsights.googleapis.com` |
| Data Catalog | `datacatalog.googleapis.com` | Data Labeling API | `datalabeling.googleapis.com` | Data Security Posture Management API | `dspm.googleapis.com` |
| Data Studio | `datastudio.googleapis.com` | Database Center | `databasecenter.googleapis.com` | Database Migration Service | `datamigration.googleapis.com` |
| Dataflow | `dataflow.googleapis.com` | Dataform | `dataform.googleapis.com` | Knowledge Catalog | `dataplex.googleapis.com`, `datalineage.googleapis.com` |
| Dataproc Metastore | `metastore.googleapis.com` | Managed Service for Apache Spark | `dataproc.googleapis.com`, `dataprocrm.googleapis.com` | Dataproc on GDC | `dataprocgdc.googleapis.com` |
| Datastream | `datastream.googleapis.com` | Developer Connect | `developerconnect.googleapis.com` | Distributed Cloud Edge Container API | `edgecontainer.googleapis.com` |
| Distributed Cloud Edge Network API | `edgenetwork.googleapis.com` | Google Distributed Cloud | `opsconfigmonitoring.googleapis.com`, `gdcvmmanager.googleapis.com`, `gdchardwaremanagement.googleapis.com` | Earth Engine API | `earthengine.googleapis.com` |
| Enterprise Knowledge Graph | `enterpriseknowledgegraph.googleapis.com` | Error Reporting | `clouderrorreporting.googleapis.com` | Essential Contacts | `essentialcontacts.googleapis.com` |
| Eventarc | `eventarc.googleapis.com`, `eventarcpublishing.googleapis.com` | Fault Injection Testing | `faultinjectiontesting.googleapis.com` | Filestore | `file.googleapis.com` |
| Financial Services API | `financialservices.googleapis.com` | Firebase AI Logic | `firebasevertexai.googleapis.com` | Firebase App Hosting | `firebaseapphosting.googleapis.com` |
| Firebase Data Connect | `firebasedataconnect.googleapis.com` | Firebase Security Rules | `firebaserules.googleapis.com` | Firebase Storage API | `firebasestorage.googleapis.com` |
| Firestore | `firestore.googleapis.com`, `firestorekeyvisualizer.googleapis.com` | Firestore in Datastore mode (Datastore) | `datastore.googleapis.com` | GKE Dataplane Management | `gkedataplanemanagement.googleapis.com` |
| GKE Enterprise Edge API | `anthosedge.googleapis.com` | GKE Fleet (Fleet) | `gkehub.googleapis.com` | GKE Identity Service | `anthosidentityservice.googleapis.com` |
| GKE Multi-Cloud | `gkemulticloud.googleapis.com` | GKE On-Prem API | `gkeonprem.googleapis.com` | Gemini for Google Cloud API | `cloudaicompanion.googleapis.com` |
| Google Antigravity for Enterprise | `businessaicode.googleapis.com` | Google Cloud API | `cloud.googleapis.com` | Google Cloud Armor | `compute.googleapis.com` |
| Google Cloud Migration Center | `migrationcenter.googleapis.com`, `rapidmigrationassessment.googleapis.com` | Google Cloud NetApp Volumes | `netapp.googleapis.com` | Google Cloud Observability | `stackdriver.googleapis.com` |
| Google Cloud VMware Engine | `vmwareengine.googleapis.com` | Google Kubernetes Engine | `container.googleapis.com`, `containerfilesystem.googleapis.com`, `configdelivery.googleapis.com` | Google Security Operations Partner API | `chroniclepartner.googleapis.com` |
| Google Security Operations SIEM | `chronicle.googleapis.com`, `chronicleservicemanager.googleapis.com` | Google Workspace add-ons | `gsuiteaddons.googleapis.com` | Identity and Access Management | `iam.googleapis.com` |
| Identity-Aware Proxy | `iap.googleapis.com` | Immersive Stream | `stream.googleapis.com` | Infrastructure Manager | `config.googleapis.com` |
| Integration Connectors | `connectors.googleapis.com` | KRM API Hosting | `krmapihosting.googleapis.com` | License Manager API | `licensemanager.googleapis.com` |
| Live Stream API | `livestream.googleapis.com` | Looker | `looker.googleapis.com` | BigQuery Engine for Apache Flink | `managedflink.googleapis.com` |
| Managed Kafka API | `managedkafka.googleapis.com` | Google Cloud Managed Lustre | `lustre.googleapis.com` | Managed Service for Microsoft Active Directory | `managedidentities.googleapis.com` |
| Media Asset Manager | `mediaasset.googleapis.com` | Memorystore for Memcached | `memcache.googleapis.com` | Memorystore for Redis | `redis.googleapis.com` |
| Memorystore for Valkey | `memorystore.googleapis.com` | Microservices API | `microservices.googleapis.com` | Migrate to Virtual Machines | `vmmigration.googleapis.com` |
| Model Armor | `modelarmor.googleapis.com` | Network Connectivity Center | `networkconnectivity.googleapis.com` | Network Intelligence Center | `networkmanagement.googleapis.com` |
| Network Service Tiers | `compute.googleapis.com` | Oracle Database@Google Cloud | `oracledatabase.googleapis.com` | Parallelstore | `parallelstore.googleapis.com` |
| Parameter Manager | `parametermanager.googleapis.com` | Persistent Disk | `compute.googleapis.com` | Personalized Service Health | `servicehealth.googleapis.com` |
| Policy Intelligence | `policyanalyzer.googleapis.com`, `policysimulator.googleapis.com`, `policytroubleshooter.googleapis.com` | Privileged Access Manager | `privilegedaccessmanager.googleapis.com` | Progressive Rollout | `progressiverollout.googleapis.com` |
| Pub/Sub | `pubsub.googleapis.com` | Public Certificate Authority | `publicca.googleapis.com` | Recommender | `recommender.googleapis.com` |
| Remote Build Execution | `remotebuildexecution.googleapis.com` | AI Commerce Search API | `retail.googleapis.com` | Cyber Insurance Hub | `riskmanager.googleapis.com` |
| SaaS Service Management API | `saasservicemgmt.googleapis.com` | SecLM API | `seclm.googleapis.com` | Secret Manager | `secretmanager.googleapis.com` |
| Secure Source Manager | `securesourcemanager.googleapis.com` | Secured Landing Zone API | `securedlandingzone.googleapis.com` | Security Command Center | `securitycenter.googleapis.com`, `securitycentermanagement.googleapis.com`, `securityposture.googleapis.com` |
| Sensitive Data Protection | `dlp.googleapis.com` | Service Account Credentials API | `iamcredentials.googleapis.com` | Service Directory | `servicedirectory.googleapis.com` |
| Service Management | `servicemanagement.googleapis.com` | Service Networking | `servicenetworking.googleapis.com` | Service Usage | `serviceusage.googleapis.com` |
| Spanner | `spanner.googleapis.com` | Speaker ID | `speakerid.googleapis.com` | Speech-to-Text | `speech.googleapis.com` |
| Storage Insights | `storageinsights.googleapis.com` | Storage Transfer Service | `storagebatchoperations.googleapis.com`, `storagetransfer.googleapis.com` | Talent Solution | `jobs.googleapis.com` |
| Text-to-Speech | `texttospeech.googleapis.com` | Timeseries Insights API | `timeseriesinsights.googleapis.com` | Traffic Director API | `trafficdirector.googleapis.com` |
| Transcoder API | `transcoder.googleapis.com` | Transfer Appliance | `transferappliance.googleapis.com` | VM Manager | `osconfig.googleapis.com` |
| Agent Platform API | `aiplatform.googleapis.com` | Gemini Enterprise Agent Platform Workbench | `notebooks.googleapis.com` | Video Intelligence API | `videointelligence.googleapis.com` |
| Video Search API | `cloudvideosearch.googleapis.com` | Video Stitcher API | `videostitcher.googleapis.com` | Virtual Private Cloud (VPC) | `compute.googleapis.com` |
| Vision AI | `visionai.googleapis.com` | Visual Inspection AI | `visualinspection.googleapis.com` | Web Risk | `webrisk.googleapis.com` |
| Web Security Scanner | `websecurityscanner.googleapis.com` | Workflows | `workflows.googleapis.com`, `workflowexecutions.googleapis.com` | Workload Certificate API | `workloadcertificate.googleapis.com` |
| Workload Manager | `workloadmanager.googleapis.com` | reCAPTCHA Enterprise | `recaptchaenterprise.googleapis.com` |  |  |

### Unsupported services (constraint not applicable)

| Service |
|---|
| Apigee (`*.apigee.net`, `*.apigee.com`, `*.apigee.io`) |
| App Engine (`*.appspot.com`) |
| Cloud Run functions (`*.cloudfunctions.net`) |
| Cloud Run (`*.run.app`) |
| Private Service Connect |
| Custom domains |

## Notes

- Warning (from the source): avoid denying all of the supported cipher suites, as this effectively closes all access paths to the Google Cloud resource hierarchy (organization, folders, and projects). Setting the policy is disruptive for clients using denied suites; try it on a disposable or non-production project first.
- `TLS_AES_256_GCM_SHA384` cannot be added to a deny list (`denied_values`). It is Google Cloud's preferred TLS 1.3 cipher suite, so denying it might cause unintended connection disruptions.
- Recommended: create the organization policy in dry-run mode first (violations are audit logged, not denied); see https://docs.cloud.google.com/resource-manager/docs/organization-policy/dry-run-policy#create_dry_run_list_policy.
- The TLS handshake occurs before, and separately from, the policy check. During the handshake the server selects the most preferred cipher suite that both client and server support. The negotiated suite must also be allowed by the policy or the connection is denied; the policy owner must configure the policy and client applications so the negotiated suite is allowed.
- To restrict TLS cipher suites for the unsupported services, use Cloud Load Balancing with an SSL security policy (see the `gcp-load-balancing` skill).
- Tip: to order Google Chrome's cipher suites in a CNSA-recommended way, enable the `chrome://#cryptography-compliance-cnsa` flag.
- Corrected from the official docs: the second test command contained `--tls-max 1.2 \ GET -H ...`, where `GET` would be parsed as an extra URL; `GET` is removed.
- Denied requests also generate a Cloud Audit Logs entry (`policyViolationInfo.orgPolicyViolationInfo` with `constraint: "constraints/gcp.restrictTlsCipherSuites"` and `policyType: "LIST_CONSTRAINT"`); the source's example entry is omitted. For API requests that use third-party credentials, `authenticationInfo` might not occur in the audit log.
- The `curl` tests obtain an access token with `gcloud auth print-access-token` inside the command; the token is not printed, but it is visible in the process list while `curl` runs, so do not run them on shared hosts.
- The source also shows Console steps for setting the policy.
- Adapted from the official docs: the source runs these `curl` commands with `--verbose`, which writes the `Authorization` header and its token to standard error, where shared terminals and CI logs keep it; the flag is removed. Without it curl still reports the HTTP or TLS error.
- Source: https://docs.cloud.google.com/docs/security/compliance/restrict-tls-cipher-suites (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [restrict-endpoint-usage.md](./restrict-endpoint-usage.md)
- [il4.md](./il4.md)
