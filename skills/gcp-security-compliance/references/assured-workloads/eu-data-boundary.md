---
source: https://docs.cloud.google.com/assured-workloads/docs/control-packages/eu-data-boundary
---

# EU Data Boundary

Controls applied to EU Data Boundary workloads in Assured Workloads: EU-only data location controls, the list of supported products with their API endpoints, and product-specific restrictions and organization policy constraints. The package is in the Free tier (no additional charges); technical support is available with Standard, Enhanced or Premium Cloud Customer Care subscriptions and cases are routed to global support personnel (for more restrictive support personnel controls consider the EU Data Boundary and Support package).

## Signature / Usage

### Disable the `_default` sink for BigQuery logs

BigQuery uses Cloud Logging for some of your log data. To maintain compliance, disable your `_default` logging buckets or restrict `_default` buckets to in-scope regions with the following command:

```bash
gcloud alpha logging settings update --organization=ORGANIZATION_ID --disable-default-sink
```

This organization setting applies only to projects created after it is set; it does not disable the `_Default` sink of existing projects or move existing log buckets. In each existing project, also disable the `_Default` sink (or route the logs you keep to a log bucket in an in-scope location):

Adapted (not in the official docs): `--project=PROJECT_ID` added so the command targets the project explicitly.

```bash
gcloud logging sinks update _Default --disabled --project=PROJECT_ID
```

## Options / Props

### Supported products and API endpoints

| Supported product | API endpoints | Restrictions or limitations |
|---|---|---|
| AI Protection | `securitycenter.googleapis.com` | None |
| Access Approval | `accessapproval.googleapis.com` | None |
| Access Context Manager | `accesscontextmanager.googleapis.com` | None |
| Access Transparency | `accessapproval.googleapis.com` | None |
| Agent Assist | `dialogflow.googleapis.com` | None |
| AlloyDB for PostgreSQL | `alloydb.googleapis.com` | None |
| Cloud Service Mesh | `mesh.googleapis.com` `meshca.googleapis.com` `meshconfig.googleapis.com` `opsconfigmonitoring.googleapis.com` | None |
| Apigee | `apigee.googleapis.com` | None |
| App Hub | `apphub.googleapis.com` | None |
| Artifact Registry | `artifactregistry.googleapis.com` | None |
| Audit Manager | `auditmanager.googleapis.com` | None |
| AutoML Tables | `automl.googleapis.com` | None |
| Backup and DR Service | `backupdr.googleapis.com` | None |
| Backup for Google Kubernetes Engine (GKE) | `gkebackup.googleapis.com` | None |
| BigQuery | `bigquery.googleapis.com` `bigqueryconnection.googleapis.com` `bigquerydatapolicy.googleapis.com` `bigquerymigration.googleapis.com` `bigqueryreservation.googleapis.com` `bigquerystorage.googleapis.com` | Affected features (BigQuery section) |
| BigQuery Data Transfer Service | `bigquerydatatransfer.googleapis.com` | None |
| Bigtable | `bigtable.googleapis.com` `bigtableadmin.googleapis.com` | None |
| Binary Authorization | `binaryauthorization.googleapis.com` | None |
| Certificate Authority Service | `privateca.googleapis.com` | None |
| Certificate Manager | `certificatemanager.googleapis.com` | None |
| Cloud Asset Inventory | `cloudasset.googleapis.com` | None |
| Cloud Build | `cloudbuild.googleapis.com` | None |
| Cloud DNS | `dns.googleapis.com` | None |
| Cloud Data Fusion | `datafusion.googleapis.com` | None |
| Cloud Deploy | `clouddeploy.googleapis.com` | None |
| Cloud Domains | `domains.googleapis.com` | None |
| Cloud External Key Manager (Cloud EKM) | `cloudekm.googleapis.com` `cloudkms.googleapis.com` | None |
| Cloud HSM | `cloudkms.googleapis.com` | None |
| Cloud Interconnect | `compute.googleapis.com` | None |
| Cloud Key Management Service (Cloud KMS) | `cloudkms.googleapis.com` | None |
| Cloud Load Balancing | `compute.googleapis.com` | None |
| Cloud Logging | `logging.googleapis.com` | Affected features (Cloud Logging section) |
| Cloud Monitoring | `monitoring.googleapis.com` `stackdriver.googleapis.com` | None |
| Cloud NAT | `compute.googleapis.com` | None |
| Cloud Next Generation Firewall Standard | `compute.googleapis.com` `networksecurity.googleapis.com` | None |
| Cloud OS Login API | `oslogin.googleapis.com` | None |
| Cloud Router | `compute.googleapis.com` | None |
| Cloud Run | `run.googleapis.com` | Affected features (the source links a Cloud Run feature anchor that has no matching section on the page) |
| Cloud Run functions | `cloudfunctions.googleapis.com` `run.googleapis.com` | None |
| Cloud SQL | `sqladmin.googleapis.com` | None |
| Cloud SQL for PostgreSQL | `sqladmin.googleapis.com` | None |
| Cloud Scheduler | `cloudscheduler.googleapis.com` | None |
| Cloud Storage | `storage.googleapis.com` | None |
| Cloud Tasks | `cloudtasks.googleapis.com` | None |
| Cloud Trace | `cloudtrace.googleapis.com` | None |
| Cloud VPN | `compute.googleapis.com` | None |
| Cloud Vision API | `vision.googleapis.com` | None |
| Cloud Workstations | `workstations.googleapis.com` | None |
| Compliance Manager | `cloudsecuritycompliance.googleapis.com` | None |
| Compute Engine | `compute.googleapis.com` | Affected features and organization policy constraints (Compute Engine section) |
| Config Sync | `anthosconfigmanagement.googleapis.com` | None |
| Google Kubernetes Engine (GKE) Connect | `connectgateway.googleapis.com` `gkeconnect.googleapis.com` | None |
| Context-Aware Access | `accesscontextmanager.googleapis.com` | None |
| Dialogflow CX | `dialogflow.googleapis.com` | None |
| Customer Experience Insights | `contactcenterinsights.googleapis.com` | None |
| Data Security Posture Management | Not applicable | None |
| Data Studio Pro | `datastudio.googleapis.com` | None |
| Database Center | `databasecenter.googleapis.com` | None |
| Dataflow | `dataflow.googleapis.com` `datapipelines.googleapis.com` | None |
| Dataform | `dataform.googleapis.com` | None |
| Document AI | `documentai.googleapis.com` | None |
| Essential Contacts | `essentialcontacts.googleapis.com` | None |
| Eventarc | `eventarc.googleapis.com` | None |
| Filestore | `file.googleapis.com` | None |
| Firebase Security Rules | `firebaserules.googleapis.com` | None |
| Firestore | `datastore.googleapis.com` `firestore.googleapis.com` | Organization policy constraints (Firestore section) |
| Flow Analyzer | `networkmanagement.googleapis.com` | None |
| Google Kubernetes Engine (GKE) Hub | `gkehub.googleapis.com` | None |
| Google Kubernetes Engine (GKE) Identity Service | `anthosidentityservice.googleapis.com` | None |
| Google Kubernetes Engine (GKE) Image streaming | `containerfilesystem.googleapis.com` | None |
| Gemini Enterprise | `discoveryengine.googleapis.com` | Affected features (Gemini Enterprise section) |
| Gemini Enterprise Agent Platform Workbench | `aiplatform.googleapis.com` `notebooks.googleapis.com` | None |
| Generative AI on Vertex AI | `aiplatform.googleapis.com` | None |
| Google Cloud Armor | `compute.googleapis.com` `networksecurity.googleapis.com` | Affected features (the source links a Cloud Armor feature anchor; see the Compute Engine constraint `compute.disableGlobalCloudArmorPolicy` below) |
| Google Cloud Managed Service for Apache Kafka | `managedkafka.googleapis.com` | None |
| Google Cloud NetApp Volumes | `netapp.googleapis.com` | Affected features (NetApp Volumes section) |
| Google Kubernetes Engine (GKE) | `container.googleapis.com` `containersecurity.googleapis.com` | None |
| Google Security Operations SIEM | `chronicle.googleapis.com` `chronicleservicemanager.googleapis.com` | None |
| Google Security Operations SOAR | Not applicable | None |
| Identity and Access Management (IAM) | `iam.googleapis.com` `policytroubleshooter.googleapis.com` | None |
| Identity-Aware Proxy (IAP) | `iap.googleapis.com` | None |
| Infrastructure Manager | `config.googleapis.com` | None |
| Integration Connectors | `connectors.googleapis.com` | None |
| Knowledge Catalog | `dataplex.googleapis.com` `datalineage.googleapis.com` | Affected features (Knowledge Catalog section) |
| Looker (Google Cloud core) | `looker.googleapis.com` | None |
| Managed Service for Apache Airflow | `composer.googleapis.com` | None |
| Managed Service for Apache Spark | `dataproc-control.googleapis.com` `dataproc.googleapis.com` | None |
| Memorystore for Redis | `redis.googleapis.com` | None |
| Migrate to Containers | Not applicable | None |
| Model Armor | `modelarmor.googleapis.com` | None |
| Network Connectivity Center | `networkconnectivity.googleapis.com` | None |
| NotebookLM Enterprise | `discoveryengine.googleapis.com` | None |
| Organization Policy Service | `orgpolicy.googleapis.com` | None |
| Persistent Disk | `compute.googleapis.com` | None |
| Personalized Service Health | `servicehealth.googleapis.com` | None |
| Privileged Access Manager | `privilegedaccessmanager.googleapis.com` | None |
| Pub/Sub | `pubsub.googleapis.com` | Organization policy constraints (Pub/Sub section) |
| Resource Manager | `cloudresourcemanager.googleapis.com` | None |
| Resource Settings | `resourcesettings.googleapis.com` | None |
| Secret Manager | `secretmanager.googleapis.com` | None |
| Secure Source Manager | `securesourcemanager.googleapis.com` | None |
| Secure Web Proxy | `networkservices.googleapis.com` `networksecurity.googleapis.com` | None |
| Security Command Center | `containerthreatdetection.googleapis.com` `securitycenter.googleapis.com` `securitycentermanagement.googleapis.com` `securityposture.googleapis.com` `websecurityscanner.googleapis.com` | None |
| Sensitive Data Protection | `dlp.googleapis.com` | None |
| Serverless VPC Access | `vpcaccess.googleapis.com` | None |
| Service Management | `servicemanagement.googleapis.com` | None |
| Spanner | `spanner.googleapis.com` | Affected features and organization policy constraints (Spanner section) |
| Speech-to-Text | `speech.googleapis.com` | None |
| Storage Transfer Service | `storagetransfer.googleapis.com` | None |
| Text-to-Speech | `texttospeech.googleapis.com` | None |
| Cloud Service Mesh | `trafficdirector.googleapis.com` | None |
| VM Manager | `osconfig.googleapis.com` | None |
| VPC Service Controls | `accesscontextmanager.googleapis.com` `accesscontextintelligence.googleapis.com` | None |
| Vertex AI Batch prediction | `aiplatform.googleapis.com` | None |
| Vertex AI Model Monitoring | `aiplatform.googleapis.com` | None |
| Vertex AI Model Registry | `aiplatform.googleapis.com` | None |
| Vertex AI Online prediction | `aiplatform.googleapis.com` | None |
| Vertex AI Pipelines | `aiplatform.googleapis.com` | None |
| Agent Search | `discoveryengine.googleapis.com` | None |
| Vertex AI Training | `aiplatform.googleapis.com` | None |
| Vertex AI Tuning | `aiplatform.googleapis.com` | None |
| Vertex AI Vector Search | `aiplatform.googleapis.com` | None |
| Virtual Private Cloud (VPC) | `compute.googleapis.com` `servicedirectory.googleapis.com` `servicenetworking.googleapis.com` | None |
| Web Risk | `webrisk.googleapis.com` | None |
| Workflows | `workflowexecutions.googleapis.com` `workflows.googleapis.com` | None |
| Workload Identity Federation | `iam.googleapis.com` `sts.googleapis.com` | None |

### Google Cloud-wide organization policy constraints

| Constraint | Description |
|---|---|
| `gcp.resourceLocations` | Set in `allowedValues` to: `eu-locations`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west3`, `europe-west4`, `europe-west8`, `europe-west9`, `europe-west10`, `europe-west12`. Restricts creation of new resources to these values; no resources can be created in other regions, multi-regions or locations. Some resources may be out of scope and cannot be restricted. Making the value less restrictive can undermine data residency. |
| `gcp.restrictServiceUsage` | Set to allow all supported products and API endpoints; determines which services can be used by restricting runtime access to their resources. |
| `gcp.restrictTLSVersion` | Set to deny `TLS_1_0` and `TLS_1_1`. |

### Compute Engine organization policy constraints

| Constraint | Description |
|---|---|
| `compute.disableGlobalCloudArmorPolicy` | Set to True. Disables creating new global Google Cloud Armor security policies and adding or modifying rules in existing global policies; does not restrict removing rules or changing the description and listing of global policies. Regional Cloud Armor security policies are unaffected. Global and regional policies that exist before enforcement remain in effect. |
| `compute.restrictNonConfidentialComputing` | (Optional) Value not set. Set it for additional defense-in-depth (see Confidential VM). |
| `compute.trustedImageProjects` | (Optional) Value not set. Set it for additional defense-in-depth; constrains image storage and disk instantiation to the listed projects and prevents use of unauthorized images or agents. |

### Other product constraints

| Product | Constraint | Description |
|---|---|---|
| Firestore | `firestore.managed.disableEnhancedTextSearch` | Set to True. Prevents enabling query enhancements for Firestore full text search. |
| Pub/Sub | `pubsub.managed.disableSubscriptionMessageTransforms` | Set to True. Disables Single Message Transforms (SMTs) on subscriptions. Changing it might affect data residency or data sovereignty. |
| Pub/Sub | `pubsub.managed.disableTopicMessageTransforms` | Set to True. Disables SMTs on topics. Changing it may affect data residency or data sovereignty. |
| Spanner | `spanner.assuredWorkloadsAdvancedServiceControls` | Set to True. Applies additional data sovereignty and supportability controls to Spanner resources. |
| Spanner | `spanner.disableMultiRegionInstanceIfNoLocationSelected` | Set to True. Disables creating multi-region Spanner instances to enforce data residency and data sovereignty. |

### Affected features

| Product | Feature | Description |
|---|---|---|
| BigQuery | Enabling BigQuery on a new folder | BigQuery is supported but not automatically enabled on a new Assured Workloads folder because of an internal configuration process that normally finishes in ten minutes but can take much longer. In the console, open the folder's details, click **Review Available Updates** in the **Allowed services** section, and click **Allow Services** to add the BigQuery services to the Resource Usage Restriction policy if listed. If they are not listed within 12 hours of folder creation, contact Cloud Customer Care. Gemini in BigQuery is not supported. |
| BigQuery | Unsupported features | Do not use in the BigQuery CLI: interaction with remote data sources; externally-trained BQML models (internally-trained are supported); data masking with policy tags (data policies applied directly to columns are supported); GDrive export; remote functions; saved queries; workflow scheduling; BigQuery Studio notebooks; Gemini in BigQuery. |
| BigQuery | BigQuery CLI | Supported. |
| BigQuery | Google Cloud SDK | Use version 403.0.0 or newer to maintain data regionalization guarantees for technical data; check with `gcloud --version` and update with `gcloud components update`. |
| BigQuery | Administrator controls | BigQuery disables unsupported APIs, but administrators who can create Assured Workloads folders can enable an unsupported API; you are then notified of potential non-compliance through the monitoring dashboard. |
| BigQuery | Loading data | BigQuery Data Transfer Service connectors for Google SaaS apps, external cloud storage providers and data warehouses are not supported; it is your responsibility not to use them for EU Data Boundary workloads. |
| BigQuery | Third-party transfers | BigQuery does not verify support for third-party transfers for the Data Transfer Service; verify support yourself. |
| BigQuery | Non-compliant BQML models | Externally-trained BQML models are not supported. |
| BigQuery | Query jobs | Create query jobs only within Assured Workloads folders. |
| BigQuery | Queries on datasets in other projects | BigQuery does not prevent Assured Workloads datasets from being queried from non-Assured Workloads projects; place any query that reads or joins Assured Workloads data in Assured Workloads folders (a fully-qualified table name `projectname.dataset.table` can name the result table in the BigQuery CLI). |
| BigQuery | Cloud Logging | Disable your `_default` logging buckets or restrict them to in-scope regions (see the command above). |
| Cloud Logging | Log sinks | Filters are stored as configuration and should not contain Customer Data. To use CMEK with Cloud Logging, complete the "Enable CMEK for an organization" steps in the Cloud Logging documentation. |
| Cloud Logging | Live tailing log entries | The session filter is stored as configuration and should not contain Customer Data; tailing can query and transmit data across regions. |
| Cloud Logging | SQL-based alerting policies | Disabled. |
| Compute Engine | Guest environment | Scripts, daemons and binaries in the guest environment may access unencrypted at-rest and in-use data, and updates may be installed by default depending on VM configuration. For more control, curate your own images or agents and optionally use `compute.trustedImageProjects`. |
| Compute Engine | OS policies in VM Manager | Inline scripts and binary output files in OS policy files are not encrypted with CMEK; do not include sensitive information, consider storing them in Cloud Storage buckets, and optionally enable `constraints/osconfig.restrictInlineScriptAndOutputFileUsage`. |
| Knowledge Catalog | Attribute Store | Deprecated and disabled. |
| Knowledge Catalog | Data Catalog | Deprecated and disabled; you cannot search or manage metadata in Data Catalog. |
| Knowledge Catalog | Lakes and Zones | Disabled; you cannot manage lakes, zones and tasks. |
| Gemini Enterprise | Web Grounding for Enterprise | Gemini Enterprise includes support for the Web Grounding for Enterprise feature. |
| Google Cloud NetApp Volumes | Supported service levels | Standard, Premium and Extreme. |
| Spanner | Split boundaries | Spanner uses a small subset of primary keys and indexed columns to define split boundaries, which may include customer data and metadata; they are accessible by Google personnel for technical support and debugging and are not subject to administrative access data controls in Assured Workloads. |

## Notes

- Supported products and API endpoints: Unless noted, supported products are accessible through the Google Cloud console. A product that is not listed is unsupported and has not met the control requirements for the EU Data Boundary; do not use it without due diligence and an understanding of the shared responsibility model. Unsupported products may share an API service endpoint with supported products, making them available to all users.
- Google Cloud MCP servers are not supported for any EU Data Boundary products unless otherwise noted. The package does not provide data residency controls for in-use and in-transit data with Google Cloud MCP servers; it is your responsibility to ensure MCP server endpoints are not used with EU Data Boundary products (the source points to the "Control Google Cloud MCP servers use with IAM" page).
- Difficult or impossible to reverse: the source strongly recommends not changing the values of the required organization policy constraints, because doing so may undermine data residency and the effects are difficult or impossible to reverse. Make sure automation that manages organization policies does not change these values unintentionally.
- The `gcloud alpha logging settings update --disable-default-sink` command changes organization-level log routing; try it on a test organization first. In gcloud 593.0.0 the flag is available on both the alpha and the GA `gcloud logging settings update`. Cloud Logging is covered by the `gcp-observability` skill.
- Source inconsistency: this page lists the denied TLS versions as `TLS_1_0` / `TLS_1_1`, while the Restrict TLS versions page uses `TLS_VERSION_1` / `TLS_VERSION_1_1`.
- The product table keeps the source's order and repeated rows (for example Cloud Service Mesh appears twice with different endpoints). Data Security Posture Management is listed in the source with no restrictions; this page does not add any date beyond what the source states.
- The "Affected features" anchors for Cloud Run and Google Cloud Armor point to sections that are not present on the page; the Cloud Armor global-policy limit is the Compute Engine constraint `compute.disableGlobalCloudArmorPolicy` above.
- The `--disable-default-sink` and `--storage-location` settings of `logging settings update` apply only to newly created projects (gcloud 593.0.0 help: "It only applies to the newly created projects and will not affect the projects created before"), and the Cloud Logging default resource settings page says the locations of existing log buckets aren't changed (https://docs.cloud.google.com/logging/docs/default-settings, retrieved 2026-11-18). The per-project command is taken from https://docs.cloud.google.com/logging/docs/export/configure_export_v2 (retrieved 2026-11-18), with `--project` added; a disabled `_Default` sink stops storing logs that no other sink routes, so try it on a disposable project first.
- Source: https://docs.cloud.google.com/assured-workloads/docs/control-packages/eu-data-boundary (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [control-packages.md](./control-packages.md)
- [data-residency.md](./data-residency.md)
- [locations.md](./locations.md)
- [restrict-tls-versions.md](./restrict-tls-versions.md)
