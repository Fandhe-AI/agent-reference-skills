---
source: https://docs.cloud.google.com/security-command-center/docs/custom-modules-sha-overview
---

# Overview of custom modules for Security Health Analytics

Custom modules extend Security Health Analytics (SHA) with custom detectors that scan the Google Cloud resources and policies you specify, using rules you define to check for vulnerabilities, misconfigurations or compliance violations. Available on the Premium and Enterprise (Deprecated) service tiers; the Enterprise tier shuts down on May 21, 2027 and organizations on it move to Premium on or after that date. Definitions are YAML with Common Expression Language (CEL) expressions; the Google Cloud console writes most of the YAML but you still code the CEL.

## Signature / Usage

### Create a custom module from a YAML definition (gcloud)

The gcloud 593.0.0 help gives this example for creating an SHA custom module for organization 123 from a YAML custom configuration file:

```bash
gcloud scc manage custom-modules sha create \
    --organization=organizations/123 \
    --display-name="test_display_name" \
    --enablement-state="ENABLED" \
    --custom-config-from-file=custom_config.yaml
```

## Options / Props

### Predefined detectors vs custom modules

| Aspect | Predefined detectors | Custom modules |
|--------|----------------------|----------------|
| Detection capability | Predefined detection logic | Broader detection capabilities; you define the rules |
| Attack path simulation | Findings can include attack exposure scores and attack paths | Not supported; findings don't include attack exposure scores or attack paths |
| Scan modes | Real-time, batch, or mixed-mode | Run alongside the predefined detectors in real-time, batch, or mixed-mode |

### Required IAM permissions and roles

| Permissions | Roles |
|-------------|-------|
| `securitycentermanagement.securityHealthAnalyticsCustomModules.create`, `.update`, `.delete`, `.list`, `.get`, `.simulate`, `.test`; `securitycentermanagement.effectiveSecurityHealthAnalyticsCustomModules.list`, `.get` | `roles/securitycentermanagement.shaCustomModulesEditor`, `roles/securitycenter.settingsEditor`, `roles/securitycenter.admin` |
| `securitycentermanagement.securityHealthAnalyticsCustomModules.list`, `.get`, `.simulate`, `.test`; `securitycentermanagement.effectiveSecurityHealthAnalyticsCustomModules.list`, `.get` | `roles/securitycentermanagement.shaCustomModulesViewer`, `roles/securitycenter.settingsViewer`, `roles/securitycenter.adminViewer`, `roles/securitycenter.admin` |

### Quotas

| Item | Limit |
|------|-------|
| Custom modules (creation) | 100 by default; increase on request |
| CustomModules Read Requests (Get, List) | 1,000 API calls per minute, per organization |
| CustomModules Write Requests (Create, Update, Delete) | 60 API calls per minute, per organization |
| CustomModules Test Requests | 12 API calls per minute, per organization |

### Supported resource types

| Service | Resource types |
|---------|----------------|
| Access Context Manager | `accesscontextmanager.googleapis.com/AccessLevel`, `AccessPolicy`, `ServicePerimeter` |
| Gemini Enterprise Agent Platform | `aiplatform.googleapis.com/BatchPredictionJob`, `CustomJob`, `Dataset`, `Endpoint`, `Featurestore`, `HyperparameterTuningJob`, `Index`, `MetadataStore`, `Model`, `NotebookRuntimeTemplate`, `SpecialistPool`, `Tensorboard`, `TrainingPipeline` |
| AlloyDB | `alloydb.googleapis.com/Backup`, `Cluster`, `Instance` |
| API keys | `apikeys.googleapis.com/Key` |
| Artifact Registry Repository | `artifactregistry.googleapis.com/Repository` |
| BigQuery | `bigquery.googleapis.com/Dataset`, `Model`, `Table`; `bigquerydatatransfer.googleapis.com/TransferConfig` |
| Cloud Billing Project Billing Info | `cloudbilling.googleapis.com/ProjectBillingInfo` |
| Cloud Run functions | `cloudfunctions.googleapis.com/CloudFunction` |
| Cloud KMS | `cloudkms.googleapis.com/CryptoKey`, `CryptoKeyVersion`, `ImportJob`, `KeyRing` |
| Resource Manager | `cloudresourcemanager.googleapis.com/Folder`, `Organization`, `Project`, `TagBinding` |
| Managed Service for Apache Airflow Environment | `composer.googleapis.com/Environment` |
| Compute Engine | `compute.googleapis.com/Address`, `Autoscaler`, `BackendBucket`, `BackendService`, `Commitment`, `Disk`, `Firewall`, `FirewallPolicy`, `ForwardingRule`, `GlobalForwardingRule`, `HealthCheck`, `Image`, `Instance`, `InstanceGroup`, `InstanceGroupManagers`, `InstanceTemplate`, `InterconnectAttachment`, `MachineImage`, `Network`, `NetworkEndpointGroup`, `NodeGroup`, `NodeTemplate`, `PacketMirroring`, `Project`, `RegionBackendService`, `RegionDisk`, `Reservation`, `ResourcePolicy`, `Route`, `Router`, `SecurityPolicy`, `Snapshot`, `SslCertificate`, `SslPolicy`, `Subnetwork`, `TargetHttpProxy`, `TargetHttpsProxy`, `TargetInstance`, `TargetPool`, `TargetSslProxy`, `TargetVpnGateway`, `UrlMap`, `VpnGateway`, `VpnTunnel` |
| Google Kubernetes Engine | `container.googleapis.com/Cluster`, `NodePool` |
| Dataflow | `dataflow.googleapis.com/Job` |
| Cloud Data Fusion | `datafusion.googleapis.com/Instance` |
| Managed Service for Apache Spark | `dataproc.googleapis.com/AutoscalingPolicy`, `Batch`, `Cluster`, `Job` |
| Datastream | `datastream.googleapis.com/ConnectionProfile`, `PrivateConnection`, `Stream` |
| Dialogflow CX | `dialogflow.googleapis.com/Agent` |
| Sensitive Data Protection | `dlp.googleapis.com/DeidentifyTemplate`, `DlpJob`, `InspectTemplate`, `JobTrigger`, `StoredInfoType` |
| Cloud DNS | `dns.googleapis.com/ManagedZone`, `Policy` |
| Filestore | `file.googleapis.com/Instance` |
| GKE Fleet (also known as fleets) | `gkehub.googleapis.com/Feature`, `Membership` |
| IAM | `iam.googleapis.com/Role`, `ServiceAccountKey` |
| Kubernetes | `k8s.io/Namespace`, `Node`, `Pod`, `Service`; `apps.k8s.io/DaemonSet`, `Deployment`, `ReplicaSet`, `StatefulSet`; `batch.k8s.io/CronJob`; `networking.k8s.io/Ingress`, `NetworkPolicy`; `rbac.authorization.k8s.io/ClusterRole`, `ClusterRoleBinding`, `Role`, `RoleBinding` |
| Cloud Logging | `logging.googleapis.com/LogBucket`, `LogMetric`, `LogSink` |
| Cloud Monitoring | `monitoring.googleapis.com/AlertPolicy`, `NotificationChannel` |
| NetApp Volumes | `netapp.googleapis.com/Snapshot`, `Volume` |
| Gemini Enterprise Agent Platform Workbench | `notebooks.googleapis.com/Instance` |
| Organization Policy Service v2 | `orgpolicy.googleapis.com/CustomConstraint`, `Policy` |
| Certificate Authority Service | `privateca.googleapis.com/Certificate`, `CertificateRevocationList` |
| Pub/Sub | `pubsub.googleapis.com/Snapshot`, `Subscription`, `Topic` |
| Memorystore for Redis | `redis.googleapis.com/Cluster`, `Instance` |
| Cloud Run | `run.googleapis.com/DomainMapping`, `Execution`, `Job`, `Revision`, `Service` |
| Secret Manager | `secretmanager.googleapis.com/Secret`, `SecretVersion` |
| Service Usage | `serviceusage.googleapis.com/Service` |
| Spanner | `spanner.googleapis.com/Backup`, `Database`, `Instance` |
| Cloud SQL for MySQL | `sqladmin.googleapis.com/BackupRun`, `Instance` |
| Cloud Storage | `storage.googleapis.com/Bucket` |
| Google Cloud VMware Engine | `vmwareengine.googleapis.com/Cluster`, `ExternalAccessRule`, `ExternalAddress`, `NetworkPeering`, `NetworkPolicy`, `PrivateCloud`, `PrivateConnection`, `VmwareEngineNetwork` |
| VPC Connector | `vpcaccess.googleapis.com/Connector` |
| Cloud Workstations | `workstations.googleapis.com/Workstation`, `WorkstationConfig` |

## Notes

- Example: the predefined `PUBLIC_SQL_INSTANCE` checks whether `authorizedNetworks` of Cloud SQL instances is `0.0.0.0/0`. A custom module can also check IP addresses with specific prefixes (wildcards), the `state` property (for example ignore `MAINTENANCE`), and the `region` property (findings only for public IPs in specific regions).
- Apply the roles at the organization, folder or project level.
- Request increases on the **Quotas** page of the Google Cloud console.
- During a scan each custom detector is applied to all matching assets in each organization, folder or project where it is enabled; findings are written to Security Command Center. The configuration of a custom module determines the resources the detector checks, the properties it evaluates and the information it returns.
- You can create custom modules for any resource or asset Security Command Center supports; the table above is the source's supported list. Within a table row, resource types shown without a domain prefix share the prefix of the first entry in that row (the source lists each type in full).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/custom-modules/sha/create (gcloud 593.0.0 help); the source page has no code block. Required flags in that help: `--custom-config-from-file`, `--display-name`, `--enablement-state`, and one of `--folder` / `--organization` / `--parent` / `--project`.
- The source also links to the pages for creating, coding (YAML and CEL, example definition) and testing custom modules; they are not part of this category.
- Source: https://docs.cloud.google.com/security-command-center/docs/custom-modules-sha-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-health-analytics-overview.md](./security-health-analytics-overview.md)
- [use-security-health-analytics.md](./use-security-health-analytics.md)
