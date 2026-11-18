---
source: https://docs.cloud.google.com/sovereign-controls-by-partners/docs/data-boundaries/germany-data-boundary-tsi
---

# Germany Data Boundary by T-Systems

Controls applied on Germany Data Boundary by T-Systems folders in Sovereign Controls by Partners: supported products and API endpoints, organization policy constraints set by default, and per-product restrictions. Offering details are on the T-Systems site (https://www.t-systems.com/de/en/sovereign-cloud/solutions/sovereign-cloud-powered-by-google-cloud).

## Signature / Usage

### Commands named by the restrictions

Disable or regionalize the `_default` logging buckets (BigQuery restriction "Cloud Logging"). The source uses the `alpha` track; `gcloud logging settings update` also has `--organization` and `--disable-default-sink` in gcloud 593.0.0.

```bash
gcloud alpha logging settings update --organization=ORGANIZATION_ID --disable-default-sink
```

This organization setting applies only to projects created after it is set; it does not disable the `_Default` sink of existing projects or move existing log buckets. In each existing project, also disable the `_Default` sink (or route the logs you keep to a log bucket in an in-scope location):

Adapted (not in the official docs): `--project=PROJECT_ID` added so the command targets the project explicitly.

```bash
gcloud logging sinks update _Default --disabled --project=PROJECT_ID
```

Check and update the Google Cloud SDK (BigQuery requires version 403.0.0 or newer):

```bash
gcloud --version
```

```bash
gcloud components update
```

Set a Windows VM password when `compute.disableInstanceDataAccessApis` blocks credential generation (after enabling SSH for Windows VMs):

```bash
gcloud compute ssh VM_NAME --command "net user USERNAME PASSWORD"
```

## Options / Props

### Supported products and API endpoints

| Supported product | API endpoints | Restrictions or limitations |
|---|---|---|
| Access Context Manager | `accesscontextmanager.googleapis.com` | None |
| Access Transparency | `accessapproval.googleapis.com` | None |
| AlloyDB for PostgreSQL | `alloydb.googleapis.com` | None |
| Apigee | `apigee.googleapis.com` | None |
| Artifact Registry | `artifactregistry.googleapis.com` | None |
| Backup for Google Kubernetes Engine (GKE) | `gkebackup.googleapis.com` | None |
| BigQuery | `bigquery.googleapis.com`, `bigqueryconnection.googleapis.com`, `bigquerydatapolicy.googleapis.com`, `bigqueryreservation.googleapis.com`, `bigquerystorage.googleapis.com` | Affected features (BigQuery table below) |
| BigQuery Data Transfer Service | `bigquerydatatransfer.googleapis.com` | None |
| Bigtable | `bigtable.googleapis.com`, `bigtableadmin.googleapis.com` | Affected features |
| Binary Authorization | `binaryauthorization.googleapis.com` | None |
| Certificate Authority Service | `privateca.googleapis.com` | None |
| Cloud Build | `cloudbuild.googleapis.com` | Affected features |
| Cloud DNS | `dns.googleapis.com` | None |
| Cloud External Key Manager (Cloud EKM) | `cloudkms.googleapis.com` | None |
| Cloud HSM | `cloudkms.googleapis.com` | None |
| Cloud Interconnect | `compute.googleapis.com` | Affected features |
| Cloud Key Management Service (Cloud KMS) | `cloudkms.googleapis.com` | Organization policy constraints |
| Cloud Load Balancing | `compute.googleapis.com` | Affected features |
| Cloud Logging | `logging.googleapis.com` | Affected features |
| Cloud Monitoring | `monitoring.googleapis.com` | Affected features |
| Cloud NAT | `networkconnectivity.googleapis.com` | None |
| Cloud Router | `networkconnectivity.googleapis.com` | None |
| Cloud Run | `run.googleapis.com` | Affected features |
| Cloud SQL | `sqladmin.googleapis.com` | Affected features and organization policy constraints |
| Cloud Service Mesh | `mesh.googleapis.com`, `meshca.googleapis.com`, `meshconfig.googleapis.com`, `trafficdirector.googleapis.com`, `networkservices.googleapis.com` | None |
| Cloud Storage | `storage.googleapis.com` | Organization policy constraints |
| Cloud VPN | `compute.googleapis.com` | None |
| Cloud Workstations | `workstations.googleapis.com` | None |
| Compute Engine | `compute.googleapis.com` | Affected features and organization policy constraints |
| Google Kubernetes Engine (GKE) Connect | `gkeconnect.googleapis.com`, `connectgateway.googleapis.com` | None |
| Dataflow | `dataflow.googleapis.com`, `datapipelines.googleapis.com` | None |
| Eventarc | `eventarc.googleapis.com` | None |
| Filestore | `file.googleapis.com` | None |
| Firebase Security Rules | `firebaserules.googleapis.com` | None |
| Firestore | `firestore.googleapis.com` | None |
| Google Kubernetes Engine (GKE) Hub | `gkehub.googleapis.com` | None |
| Google Kubernetes Engine (GKE) Identity Service | `anthosidentityservice.googleapis.com` | None |
| Google Cloud Armor | `compute.googleapis.com`, `networksecurity.googleapis.com` | Affected features |
| Google Kubernetes Engine (GKE) | `container.googleapis.com`, `containersecurity.googleapis.com` | Affected features and organization policy constraints |
| Identity and Access Management (IAM) | `iam.googleapis.com`, `policytroubleshooter.googleapis.com` | None |
| Identity-Aware Proxy | `iap.googleapis.com` | None |
| Knowledge Catalog | `dataplex.googleapis.com`, `datalineage.googleapis.com` | Affected features |
| Managed Service for Apache Airflow | `composer.googleapis.com` | None |
| Managed Service for Apache Spark | `dataproc-control.googleapis.com`, `dataproc.googleapis.com` | Affected features |
| Memorystore for Redis | `redis.googleapis.com` | None |
| Network Connectivity Center | `networkconnectivity.googleapis.com` | None |
| Organization Policy Service | `orgpolicy.googleapis.com` | None |
| Persistent Disk | `compute.googleapis.com` | None |
| Pub/Sub | `pubsub.googleapis.com` | None |
| Resource Manager | `cloudresourcemanager.googleapis.com` | None |
| Secret Manager | `secretmanager.googleapis.com` | None |
| Secure Source Manager | `securesourcemanager.googleapis.com` | None |
| Sensitive Data Protection | `dlp.googleapis.com` | None |
| Spanner | `spanner.googleapis.com` | Affected features and organization policy constraints |
| Speech-to-Text | `speech.googleapis.com` | None |
| VPC Service Controls | `accesscontextmanager.googleapis.com`, `accesscontextintelligence.googleapis.com` | None |
| Virtual Private Cloud (VPC) | `compute.googleapis.com`, `servicenetworking.googleapis.com` | None |

### Google Cloud-wide organization policy constraints

| Organization policy constraint | Description |
|---|---|
| `gcp.resourceLocations` | `allowedValues`: `europe-west3`. Restricts creation of new resources to the selected values (no other regions, multi-regions or locations); some resources may be out of scope (see Resource locations supported services). Making it less restrictive potentially undermines data residency. |
| `gcp.restrictCmekCryptoKeyProjects` | `under:organizations/your-organization-name` (your Sovereign Controls by Partners organization); can be narrowed to a project or folder. Limits which folders or projects can provide Cloud KMS keys for CMEK at-rest encryption of in-scope services. |
| `gcp.restrictNonCmekServices` | All in-scope API service names: `aiplatform.googleapis.com`, `artifactregistry.googleapis.com`, `bigquery.googleapis.com`, `bigquerydatatransfer.googleapis.com`, `bigtable.googleapis.com`, `cloudfunctions.googleapis.com`, `composer.googleapis.com`, `compute.googleapis.com`, `container.googleapis.com`, `dataflow.googleapis.com`, `dataproc.googleapis.com`, `documentai.googleapis.com`, `integrations.googleapis.com`, `logging.googleapis.com`, `notebooks.googleapis.com`, `pubsub.googleapis.com`, `run.googleapis.com`, `secretmanager.googleapis.com`, `spanner.googleapis.com`, `sqladmin.googleapis.com`, `storage.googleapis.com`, `workstations.googleapis.com`. Each listed service requires CMEK; some features may be affected. Removing a service from the list may undermine data sovereignty because new at-rest data is encrypted with Google's own keys (existing data stays encrypted by your key). |
| `gcp.restrictServiceUsage` | Allows all supported products and API endpoints; determines which services can be used by restricting runtime access to their resources. |
| `gcp.restrictTLSVersion` | Denies `TLS_1_0` and `TLS_1_1`. |

### Cloud KMS organization policy constraints

| Organization policy constraint | Description |
|---|---|
| `cloudkms.allowedProtectionLevels` | Allows creating CryptoKeys with protection levels `EXTERNAL` and `EXTERNAL_VPC` only. |

### Cloud SQL

| Item | Description |
|---|---|
| Query insights (feature) | Usable only if application tags are not enabled; otherwise an error is returned. |
| `sql.restrictNoncompliantDiagnosticDataAccess` | Set to True. Applies additional data sovereignty and supportability controls to Cloud SQL resources. Changing it might affect data residency or data sovereignty. |
| `sql.restrictNoncompliantResourceCreation` | Set to True. Prevents creation of non-compliant Cloud SQL resources. Changing it might affect data residency or data sovereignty. |

### Cloud Storage organization policy constraints

| Organization policy constraint | Description |
|---|---|
| `storage.restrictAuthTypes` | Prevents HMAC authentication: `USER_ACCOUNT_HMAC_SIGNED_REQUESTS` and `SERVICE_ACCOUNT_HMAC_SIGNED_REQUESTS`. HMAC keys can access customer data without customer knowledge; keeping the set value is highly recommended. |
| `storage.uniformBucketLevelAccess` | Set to True. New buckets are managed with IAM policies instead of ACLs; a bucket created while enabled can never be managed with ACLs (permanent). |

### Compute Engine organization policy constraints

| Organization policy constraint | Description |
|---|---|
| `compute.enableComplianceMemoryProtection` | Set to True. Disables some internal diagnostic features to protect memory contents on infrastructure fault. Changing it may affect data residency or sovereignty. |
| `compute.disableGlobalCloudArmorPolicy` | Set to True. Disables creating new global Cloud Armor security policies and adding or modifying rules in existing global policies; doesn't restrict removing rules or changing the description and listing. Regional policies are unaffected; policies existing before enforcement remain in effect. |
| `compute.disableInstanceDataAccessApis` | Set to True. Globally disables `instances.getSerialPortOutput()` and `instances.getScreenshot()`; prevents generating credentials on Windows Server VMs (workaround: enable SSH for Windows VMs and use the `gcloud compute ssh --command` command above). |
| `compute.disableSshInBrowser` | Set to True. Disables SSH-in-browser in the console for VMs that use OS Login and App Engine flexible environment VMs. Changing it may affect data residency or sovereignty. |
| `compute.restrictNonConfidentialComputing` | (Optional) Not set. Set for defense-in-depth (see Confidential VM docs). |
| `compute.trustedImageProjects` | (Optional) Not set. Set for defense-in-depth; constrains image storage and disk instantiation to the listed projects and prevents unauthorized images or agents. |

### GKE and Spanner organization policy constraints

| Organization policy constraint | Description |
|---|---|
| `container.restrictNoncompliantDiagnosticDataAccess` | Set to True. Disables aggregate analysis of kernel issues, required to maintain sovereign control of a workload. Changing it may affect data residency or sovereignty. |
| `spanner.assuredWorkloadsAdvancedServiceControls` | Set to True. Applies additional data sovereignty and supportability controls to Spanner resources. |
| `spanner.disableMultiRegionInstanceIfNoLocationSelected` | Set to True. Disables creating multi-region Spanner instances. |

### BigQuery affected features

| Feature | Description |
|---|---|
| Enabling BigQuery on a new folder | Not automatically enabled on a new Assured Workloads folder (internal process normally ten minutes, can take much longer). Assured Workloads page, select the folder, **Folder Details**, **Allowed services**, **Review Available Updates**; if BigQuery services are listed click **Allow Services**; if not listed within 12 hours of folder creation contact Cloud Customer Care. Gemini in BigQuery is not supported. |
| Unsupported features | Interaction with remote data sources; externally-trained BQML models (internally-trained are supported); data masking with policy tags (data policies applied directly to columns are supported); GDrive export; remote functions; saved queries; workflow scheduling; BigQuery Studio notebooks; Gemini in BigQuery. It is your responsibility not to use them. |
| Unsupported integrations | Data Catalog API methods `CreateTag`, `SearchCatalog`, `Bulk tagging` and `Business Glossary`; your responsibility not to use them. |
| Supported BigQuery APIs | Datasets, Jobs, Models, Projects, Reservations (not enabled by default), Routines, Row Access Policies, Storage Read, Storage Write, Tables, Table Data. |
| Regions | All BigQuery EU regions except the EU multi-region. Compliance can't be guaranteed for datasets in the EU multi-region, a non-EU region or a non-EU multi-region. A table data list request using a different EU region than the dataset's fails with "dataset not found". |
| BigQuery CLI | Supported. |
| Google Cloud SDK | Version 403.0.0 or newer required to maintain data regionalization for technical data. |
| Administrator controls | BigQuery disables unsupported APIs, but administrators who can create Sovereign Controls by Partners folders can enable one; you are then notified of potential non-compliance through the Assured Workloads monitoring dashboard. |
| Loading data | BigQuery Data Transfer Service connectors for Google SaaS apps, external cloud storage providers and data warehouses are not supported; your responsibility not to use them. |
| Third-party transfers | BigQuery doesn't verify support for third-party transfers in BigQuery Data Transfer Service; verify it yourself. |
| Non-compliant BQML models | Externally-trained BQML models are not supported. |
| Query jobs | Create query jobs only within Sovereign Controls by Partners folders. |
| Queries on datasets in other projects | Sovereign Controls by Partners datasets can be queried from non-Sovereign Controls by Partners projects; place any query that reads or joins that data in Sovereign Controls by Partners folders; use `projectname.dataset.table` for the result table in the BigQuery CLI. |
| Cloud Logging | Disable your `_default` logging buckets or restrict them to in-scope regions using the `gcloud alpha logging settings update` command above. |

### Other affected features

| Product | Feature | Description |
|---|---|---|
| Bigtable | Data Boost | Disabled. |
| Bigtable | Split boundaries | A small subset of row keys defines split boundaries, which may include customer data and metadata; accessible by Google personnel for support and debugging and not subject to administrative access data controls in Sovereign Controls by Partners. |
| Cloud Build | Generating build provenance | Unsupported; builds with `options.requestedVerifyOption: VERIFIED` may fail, so remove that option. |
| Cloud Interconnect | High-availability (HA) VPN | Must enable HA VPN when using Cloud Interconnect with Cloud VPN, and follow the encryption and regionalization requirements for Cloud VPN. |
| Cloud Load Balancing | Google Cloud console | Not available in the console; use the API or gcloud. |
| Cloud Load Balancing | Regional load balancers | Use only regional load balancers: internal Application Load Balancer, regional external Application Load Balancer, internal passthrough Network Load Balancer, regional external passthrough Network Load Balancer. |
| Cloud Logging | Log sinks | Filters are stored as configuration; don't put Customer Data in filters. |
| Cloud Logging | Live tailing log entries | Filters are stored as configuration; tailing can query and transmit data across regions; don't put Customer Data in filters. |
| Cloud Logging | Log-based alerts; shortened URLs for Logs Explorer queries; saving queries in Logs Explorer; SQL-based alerting policies | Disabled. |
| Cloud Monitoring | Synthetic Monitor; Uptime checks; log panel widgets and error reporting panel widgets in Dashboards; Filter in `EventAnnotation`; `SqlCondition` in `alertPolicies` | Disabled. |
| Cloud Run | Unsupported features | Cloud Trace integration, Cloud Run functions, Eventarc triggers. |
| Compute Engine | Suspending and resuming a VM instance | Disabled (suspended-state disk can't use CMEK). |
| Compute Engine | Local SSDs | Disabled (can't use CMEK). |
| Compute Engine | Guest environment | Included scripts, daemons and binaries may access unencrypted at-rest and in-use data; updates may install by default; you can curate your own images or agents and optionally use `compute.trustedImageProjects`. |
| Compute Engine | OS policies in VM Manager | Inline scripts and binary output files in OS policy files are not CMEK-encrypted; don't include sensitive information; consider Cloud Storage buckets; `constraints/osconfig.restrictInlineScriptAndOutputFileUsage` restricts such resources. |
| Compute Engine | `instances.getSerialPortOutput()`, `instances.getScreenshot()` | Disabled; set `compute.disableInstanceDataAccessApis` to False to enable, or use the interactive serial port. |
| Knowledge Catalog | Attribute Store; Data Catalog | Deprecated and disabled (no search or metadata management in Data Catalog). |
| Knowledge Catalog | Data Quality and Data Profile Scan | Export of Data Quality Scan results is not supported. |
| Knowledge Catalog | Discovery; Data insights; Lakes and Zones | Disabled. |
| Managed Service for Apache Spark | Google Cloud console | The Jurisdictional Google Cloud console is not supported; use gcloud or the API. |
| Google Cloud Armor | Globally scoped security policies | Disabled by `compute.disableGlobalCloudArmorPolicy`. |
| Spanner | Split boundaries | A small subset of primary keys and indexed columns defines split boundaries (may include customer data and metadata); accessible by Google personnel for support and debugging; not subject to administrative access data controls. |

## Notes

- Unless otherwise noted, supported products are available through the Google Cloud console. A product not listed is unsupported and hasn't met the control requirements.
- Unsupported products may share an API endpoint with supported products, making them available to all users. Before using an unsupported product, accept the risks to data residency or data sovereignty.
- Google Cloud MCP servers aren't supported for any Germany Data Boundary by T-Systems product unless otherwise noted: no data residency controls for in-use and in-transit data with MCP servers. Ensure MCP server endpoints aren't used; to block access see Control Google Cloud MCP servers use with IAM.
- Using Cloud Logging with CMEK requires the steps in Enable CMEK for an organization in the Cloud Logging docs.
- `gcloud alpha logging settings update ... --disable-default-sink` disables the `_Default` sink organization-wide, which is disruptive to existing log routing; try it on a disposable organization or folder context first. The source shows the `alpha` track; the GA `gcloud logging settings update` accepts the same flags.
- The `gcloud compute ssh ... "net user USERNAME PASSWORD"` command puts the new password on the command line, where it can land in shell history and process lists; the source shows no safer alternative.
- Changing a constraint to be less restrictive (resource locations, `gcp.restrictNonCmekServices`, HMAC, the Compute and Spanner flags) can undermine data residency or sovereignty; `storage.uniformBucketLevelAccess` is permanent for buckets created while it is set. Cloud KMS key destruction is irreversible (see key-management.md).
- The `--disable-default-sink` and `--storage-location` settings of `logging settings update` apply only to newly created projects (gcloud 593.0.0 help: "It only applies to the newly created projects and will not affect the projects created before"), and the Cloud Logging default resource settings page says the locations of existing log buckets aren't changed (https://docs.cloud.google.com/logging/docs/default-settings, retrieved 2026-11-18). The per-project command is taken from https://docs.cloud.google.com/logging/docs/export/configure_export_v2 (retrieved 2026-11-18), with `--project` added; a disabled `_Default` sink stops storing logs that no other sink routes, so try it on a disposable project first.
- Source: https://docs.cloud.google.com/sovereign-controls-by-partners/docs/data-boundaries/germany-data-boundary-tsi (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [france-data-boundary-s3ns.md](./france-data-boundary-s3ns.md)
- [supported-products.md](./supported-products.md)
- [shared-responsibility.md](./shared-responsibility.md)
- [key-management.md](./key-management.md)
