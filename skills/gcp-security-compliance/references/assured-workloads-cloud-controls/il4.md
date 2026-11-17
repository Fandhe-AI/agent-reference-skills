---
source: https://docs.cloud.google.com/assured-workloads/docs/control-packages/il4
---

# Data Boundary for Impact Level 4 (IL4)

The set of controls Assured Workloads applies to Data Boundary for IL4 workloads: data residency (US-only regions), supported Google Cloud products and API endpoints, and per-product restrictions and limitations, including the organization policy constraints set by default on Data Boundary for IL4 folders. The source recommends seeking independent legal advice about your responsibilities; it is not legal advice.

## Signature / Usage

### Disable the `_default` log sink (BigQuery and Cloud Logging)

BigQuery uses Cloud Logging for some log data. The source says to disable your `_default` logging buckets, or restrict them to in-scope regions, with:

```bash
gcloud alpha logging settings update --organization=ORGANIZATION_ID --disable-default-sink
```

This organization setting applies only to projects created after it is set; it does not disable the `_Default` sink of existing projects or move existing log buckets. In each existing project, also disable the `_Default` sink (or route the logs you keep to a log bucket in an in-scope location):

Adapted (not in the official docs): `--project=PROJECT_ID` added so the command targets the project explicitly.

```bash
gcloud logging sinks update _Default --disabled --project=PROJECT_ID
```

### Change a Windows VM password when `compute.disableInstanceDataAccessApis` is enforced

Enforcing the constraint prevents generating credentials on Windows Server VMs. Enable SSH for Windows VMs, then run the command, replacing `VM_NAME`, `USERNAME` and `PASSWORD`:

```bash
gcloud compute ssh VM_NAME --command "net user USERNAME PASSWORD"
```

## Options / Props

### Program terms

| Item | Detail |
|------|--------|
| Data residency | The control package sets data location controls to support US-only regions |
| Support | Enhanced or Premium Cloud Customer Care subscriptions; support cases routed to US Persons located in the US |
| Pricing | Included in Assured Workloads' Premium tier; see https://docs.cloud.google.com/assured-workloads/pricing |
| Jurisdictional console | Optional (not required): `console.us.cloud.google.com`, or `console.us.cloud.google` for federated identity users |

### Prerequisites

| Requirement |
|-------------|
| Create a Data Boundary for IL4 folder with Assured Workloads and deploy IL4 workloads only in that folder |
| Enable and use only in-scope services |
| Don't use Google Cloud MCP servers unless otherwise noted (no data residency controls for in-use and in-transit data); block them per "Control Google Cloud MCP servers use with IAM" |
| Don't change default organization policy constraint values unless you accept the data residency risks |
| Don't store technical data in user-defined or security configuration information: error messages, console output, attribute data, service configuration data, network packet headers, resource identifiers, data labels |

### Google Cloud-wide organization policy constraints

| Constraint | Default value / description |
|------------|-----------------------------|
| `gcp.resourceLocations` | `allowedValues`: `us`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. No resources can be created in other regions, multi-regions, or locations; some resources may be out of scope. Making it less restrictive potentially undermines data residency |
| `gcp.restrictNonCmekServices` | List of in-scope API service names, including `bigquerydatatransfer.googleapis.com`; each listed service requires CMEK. Removing a service means new at-rest data is encrypted with Google's own keys (existing data stays encrypted by your key) |
| `gcp.restrictServiceUsage` | Allows all supported products and API endpoints; restricts runtime access to other services |
| `gcp.restrictTLSVersion` | Denies `TLS_1_0` and `TLS_1_1` |

### Product-specific organization policy constraints

| Constraint | Value and effect |
|------------|------------------|
| `cloudkms.allowedProtectionLevels` | Allows CryptoKeys with protection levels `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC` |
| `compute.disableGlobalCloudArmorPolicy` | True. Disables creation of new global Cloud Armor security policies and adding or modifying rules in existing global policies; removal of rules and description/listing changes are not restricted; regional policies unaffected; existing policies remain in effect |
| `compute.disableGlobalLoadBalancing` | True. Disables creation of global load balancing products; changing it may affect data residency or sovereignty |
| `compute.disableInstanceDataAccessApis` | True. Disables `instances.getSerialPortOutput()` and `instances.getScreenshot()`; prevents generating credentials on Windows Server VMs |
| `compute.restrictNonConfidentialComputing` | (Optional) not set; set for defense-in-depth |
| `compute.trustedImageProjects` | (Optional) not set; constrains image storage and disk instantiation to the listed projects |
| `pubsub.managed.disableSubscriptionMessageTransforms` | True. Disables Single Message Transforms on subscriptions; changing it might affect residency or sovereignty |
| `pubsub.managed.disableTopicMessageTransforms` | True. Disables Single Message Transforms on topics; changing it may affect residency or sovereignty |
| `constraints/osconfig.restrictInlineScriptAndOutputFileUsage` | Optionally enable to restrict OS policy resources that use inline scripts or binary output files |

### Supported products and API endpoints

| Supported product | API endpoints | Restrictions |
|---|---|---|
| Access Context Manager | `accesscontextmanager.googleapis.com` | None |
| AlloyDB for PostgreSQL | `alloydb.googleapis.com` | None |
| Artifact Registry | `artifactregistry.googleapis.com` | None |
| BigQuery | `bigquery.googleapis.com`, `bigqueryconnection.googleapis.com`, `bigquerydatapolicy.googleapis.com`, `bigquerymigration.googleapis.com`, `bigqueryreservation.googleapis.com`, `bigquerystorage.googleapis.com` | Affected features and organization policy constraints |
| Certificate Authority Service | `privateca.googleapis.com` | None |
| Cloud Build | `cloudbuild.googleapis.com` | None |
| Cloud DNS | `dns.googleapis.com` | None |
| Cloud Data Fusion | `datafusion.googleapis.com` | None |
| Cloud External Key Manager (Cloud EKM) | `cloudkms.googleapis.com` | None |
| Cloud HSM | `cloudkms.googleapis.com` | None |
| Cloud Identity | `cloudidentity.googleapis.com` | None |
| Cloud Interconnect | `compute.googleapis.com` | Affected features |
| Cloud Key Management Service (Cloud KMS) | `cloudkms.googleapis.com` | Organization policy constraints |
| Cloud Logging | `logging.googleapis.com`, `monitoring.googleapis.com` | Affected features |
| Cloud Monitoring | `monitoring.googleapis.com` | Affected features |
| Cloud NAT | `compute.googleapis.com` | None |
| Cloud Router | `compute.googleapis.com` | None |
| Cloud Run | `run.googleapis.com` | Affected features |
| Cloud SQL | `sqladmin.googleapis.com` | None |
| Cloud Service Mesh | `mesh.googleapis.com`, `meshca.googleapis.com`, `meshconfig.googleapis.com`, `trafficdirector.googleapis.com` | None |
| Cloud Storage | `storage.googleapis.com` | None |
| Cloud Tasks | `cloudtasks.googleapis.com` | None |
| Cloud VPN | `compute.googleapis.com` | Affected features |
| Cloud Vision API | `vision.googleapis.com` | Affected features |
| Cloud Workstations | `workstations.googleapis.com` | Affected features |
| Compute Engine | `compute.googleapis.com` | Affected features and organization policy constraints |
| Google Kubernetes Engine (GKE) Connect Agent | `connectgateway.googleapis.com`, `gkeconnect.googleapis.com` | None |
| Dataflow | `dataflow.googleapis.com`, `datapipelines.googleapis.com` | None |
| Eventarc | `eventarc.googleapis.com` | None |
| External passthrough Network Load Balancer | `compute.googleapis.com` | None |
| Filestore | `file.googleapis.com` | None |
| Google Kubernetes Engine (GKE) Hub | `gkehub.googleapis.com` | None |
| Google Kubernetes Engine (GKE) Identity Service | `anthosidentityservice.googleapis.com` | None |
| Gemini Enterprise | `discoveryengine.googleapis.com` | Affected features |
| Generative AI on Vertex AI | `aiplatform.googleapis.com` | None |
| Google Cloud Armor | `compute.googleapis.com` | Affected features |
| Google Kubernetes Engine (GKE) | `container.googleapis.com`, `containersecurity.googleapis.com` | None |
| Google Security Operations SIEM | `chronicle.googleapis.com`, `chronicleservicemanager.googleapis.com` | None |
| Google Security Operations SOAR | Not applicable | None |
| Google Admin console | Not applicable | None |
| Identity and Access Management (IAM) | `iam.googleapis.com`, `policytroubleshooter.googleapis.com` | None |
| Identity-Aware Proxy (IAP) | `iap.googleapis.com` | Affected features |
| Internal passthrough Network Load Balancer | `compute.googleapis.com` | None |
| Knowledge Catalog | `dataplex.googleapis.com`, `datalineage.googleapis.com` | Affected features |
| Managed Service for Apache Airflow | `composer.googleapis.com` | None |
| Managed Service for Apache Spark | `dataproc-control.googleapis.com`, `dataproc.googleapis.com` | None |
| Memorystore for Redis | `redis.googleapis.com` | None |
| Network Connectivity Center | `networkconnectivity.googleapis.com` | None |
| Persistent Disk | `compute.googleapis.com` | None |
| Pub/Sub | `pubsub.googleapis.com` | Organization policy constraints |
| Regional external Application Load Balancer | `compute.googleapis.com` | None |
| Regional external proxy Network Load Balancer | `compute.googleapis.com` | None |
| Regional internal Application Load Balancer | `compute.googleapis.com` | None |
| Regional internal proxy Network Load Balancer | `compute.googleapis.com` | None |
| Resource Manager | `cloudresourcemanager.googleapis.com` | None |
| Secret Manager | `secretmanager.googleapis.com` | None |
| Sensitive Data Protection | `dlp.googleapis.com` | None |
| Spanner | `spanner.googleapis.com` | None |
| Speech-to-Text | `speech.googleapis.com` | Affected features |
| VPC Service Controls | `accesscontextmanager.googleapis.com`, `accesscontextintelligence.googleapis.com` | None |
| Vertex AI Batch prediction | `aiplatform.googleapis.com` | None |
| Vertex AI Model Monitoring | `aiplatform.googleapis.com` | None |
| Vertex AI Model Registry | `aiplatform.googleapis.com` | None |
| Vertex AI Online prediction | `aiplatform.googleapis.com` | None |
| Vertex AI Pipelines | `aiplatform.googleapis.com` | None |
| Agent Search | `discoveryengine.googleapis.com` | None |
| Vertex AI Training | `aiplatform.googleapis.com` | None |
| Virtual Private Cloud (VPC) | `compute.googleapis.com`, `servicenetworking.googleapis.com` | None |

### Affected features by product

| Product | Feature | Description |
|---|---|---|
| Google Cloud console | Console access | Optional Jurisdictional Google Cloud console (URLs above); not required |
| BigQuery | Enabling on a new folder | Not automatically enabled on a new Assured Workloads folder (internal configuration, normally ten minutes). In the Assured Workloads page open the folder > Allowed services > Review Available Updates, then click Allow Services if BigQuery services are listed; if not listed within 12 hours of folder creation, contact Cloud Customer Care. Gemini in BigQuery is not supported |
| BigQuery | Compliant APIs | `bigquery.googleapis.com`, `bigquerydatapolicy.googleapis.com`, `bigqueryconnection.googleapis.com`, `bigquerymigration.googleapis.com`, `bigquerystorage.googleapis.com`, `bigqueryreservation.googleapis.com`, `bigquerydatatransfer.googleapis.com`. The Reservations API is not enabled by default |
| BigQuery | Regions | IL4-compliant for all BigQuery US regions except the US multi-region; specifying a compliant region when creating datasets is your responsibility |
| BigQuery | Queries from non-IL4 projects | Not prevented; ensure any read or join on IL4 technical data runs in an IL4-compliant folder; query jobs only within Assured Workloads folders; use fully qualified `projectname.dataset.table` names |
| BigQuery | External sources | Google's responsibility is limited to the BigQuery Connection API capability |
| BigQuery | Unsupported features | Interaction with remote data sources; externally-trained BQML models (internally-trained supported); data masking with policy tags (data policies applied directly to columns supported); GDrive export; remote functions; saved queries; workflow scheduling; BigQuery Studio notebooks; Gemini in BigQuery |
| BigQuery | CLI / SDK | BigQuery CLI is supported; use Google Cloud SDK 403.0.0 or newer (`gcloud --version`, `gcloud components update`) |
| BigQuery | Administrator controls | Unsupported APIs are disabled, but administrators who can create Assured Workloads folders can enable one; non-compliance is shown in the Assured Workloads monitoring dashboard |
| BigQuery | Loading data | BigQuery Data Transfer Service connectors for Google SaaS apps, external cloud storage providers, and data warehouses are not supported; third-party transfers are not verified by BigQuery |
| Cloud Interconnect | HA VPN | Must enable HA VPN when using Interconnect with Cloud VPN and follow the Cloud VPN requirements |
| Cloud Logging | CMEK | Complete "Enable CMEK for an organization" in Cloud Logging docs |
| Cloud Logging | Log sinks / live tailing | Filters are stored as configuration; don't create filters that contain Customer Data |
| Cloud Logging | SQL-based alerting policies | Disabled |
| Cloud Monitoring | Synthetic Monitor, Uptime checks | Disabled |
| Cloud Run | Unsupported | Cloud Trace integration, Cloud Run functions, Eventarc triggers |
| Cloud Vision API | Endpoints | Use only the US endpoint `us-vision.googleapis.com`; the global `vision.googleapis.com` is not IL4-compliant |
| Cloud VPN | Endpoints | Use only Cloud VPN endpoints in an in-scope region; configure the gateway for an in-scope region only |
| Cloud Workstations | Cluster | Select only a Private gateway; use only a regional external Application Load Balancer for a custom domain |
| Compute Engine | Instance groups on global load balancers | Cannot be added (`compute.disableGlobalLoadBalancing`) |
| Compute Engine | Guest environment | Scripts, daemons, and binaries may access unencrypted at-rest and in-use data; updates may install by default; curate your own images or agents and optionally use `compute.trustedImageProjects` |
| Compute Engine | OS policies in VM Manager | Inline scripts and binary output files are not encrypted with CMEK; don't include sensitive information; consider Cloud Storage buckets |
| Compute Engine | `instances.getSerialPortOutput`, `instances.getScreenshot` | Disabled; set `compute.disableInstanceDataAccessApis` to False to enable, or enable the interactive serial port |
| Knowledge Catalog | Attribute Store, Data Catalog | Deprecated and disabled |
| Knowledge Catalog | Data insights, Lakes and Zones | Disabled |
| Gemini Enterprise | Web Grounding for Enterprise | Supported |
| Google Cloud Armor | Globally scoped security policies | Disabled by `compute.disableGlobalCloudArmorPolicy` |
| Identity-Aware Proxy | IAP for TCP forwarding | Not compliant with Data Boundary for IL4; not using it is your responsibility |
| Speech-to-Text | Custom Speech-to-Text models | Not compliant; not using them is your responsibility |

## Notes

- Supported products and API endpoints: Products not listed are unsupported and haven't met IL4 control requirements; unsupported products may share an API endpoint with supported ones. Google Cloud MCP servers aren't supported for any IL4 product unless noted. "Affected features" refers to the restrictions listed below.
- Changing the required organization policy constraint values may undermine data residency and is difficult or impossible to reverse; review any change with your authorizing agency, and update automated mechanisms that manage organization policies so these values aren't changed unintentionally.
- Changing a constraint such as `gcp.resourceLocations`, `gcp.restrictNonCmekServices`, or `compute.disableGlobalLoadBalancing` falls under that warning; try changes on a disposable folder first. Review usage of any unsupported product with your authorizing agency and the shared responsibility model.
- Deprecated: Data Catalog and Attribute Store are listed in the source as "deprecated and disabled" under Knowledge Catalog.
- The `gcloud compute ssh ... --command "net user USERNAME PASSWORD"` form places the new password on the command line, so it lands in shell history and process lists; rotate it afterwards. Do not print passwords in shared terminals or CI logs.
- The source uses the alpha track; in gcloud 593.0.0 `--disable-default-sink` is available on both `gcloud alpha logging settings update` and the GA `gcloud logging settings update` (Cloud Logging is covered by the planned `gcp-observability` skill). Disabling the `_default` sink changes log routing for the whole organization; verify first.
- `compute.restrictNonConfidentialComputing` and `compute.trustedImageProjects` are not set by default; the source marks them optional defense-in-depth.
- The `gcp.restrictNonCmekServices` row in the source lists `bigquerydatatransfer.googleapis.com` as an example ("including"); the source does not give the full default list.
- The source also shows Console steps (BigQuery enablement) and links to separate pages for data residency, locations, support, and pricing; those are not part of this page.
- The `--disable-default-sink` and `--storage-location` settings of `logging settings update` apply only to newly created projects (gcloud 593.0.0 help: "It only applies to the newly created projects and will not affect the projects created before"), and the Cloud Logging default resource settings page says the locations of existing log buckets aren't changed (https://docs.cloud.google.com/logging/docs/default-settings, retrieved 2026-11-18). The per-project command is taken from https://docs.cloud.google.com/logging/docs/export/configure_export_v2 (retrieved 2026-11-18), with `--project` added; a disabled `_Default` sink stops storing logs that no other sink routes, so try it on a disposable project first.
- Source: https://docs.cloud.google.com/assured-workloads/docs/control-packages/il4 (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [restrict-endpoint-usage.md](./restrict-endpoint-usage.md)
- [restrict-tls-cipher-suites.md](./restrict-tls-cipher-suites.md)
- [manage-frameworks.md](./manage-frameworks.md)
