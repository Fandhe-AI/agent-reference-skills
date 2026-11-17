---
source: https://docs.cloud.google.com/security-command-center/docs/attack-exposure-supported-features
---

# Risk Engine feature support

Lists what Risk Engine supports for attack exposure scores and attack path simulations: finding classes, organization-level activation, required roles, size limits, and per-provider (Google Cloud, AWS, Azure) services and resource types. Premium and Enterprise (Deprecated) service tiers; organization-level activation only.

## Signature / Usage

### Google Cloud resource types supported with data-sensitivity classifications

Attack path simulations can set priority values automatically from Sensitive Data Protection discovery data-sensitivity classifications for only these data resource types.

```text
- `aiplatform.googleapis.com/Dataset`
- `bigquery.googleapis.com/Dataset`
- `sqladmin.googleapis.com/Instance`
- `storage.googleapis.com/Bucket`
```

## Options / Props

### Limits

| Limit | Value |
|------|------|
| Maximum number of active findings (per organization) | 250,000,000 |
| Maximum number of active assets (per organization) | 26,000,000 |
| Resource instances in a high-value resource set (per cloud service provider) | 1,000 |
| Resource value configurations per Google Cloud organization | 100 |

### Required roles (grant on the organization)

| Purpose | Role |
|------|------|
| View attack paths | `roles/securitycenter.attackPathsViewer` (Security Center Attack Paths Reader) |
| Attack paths from findings and issues (toxic combinations, chokepoints) | `roles/securitycenter.findingsViewer` |
| Attack paths for high-value resources | `roles/securitycenter.assetsViewer` and `roles/securitycenter.valuedResourcesViewer` |

### Supported finding categories

| Source | Categories |
|------|------|
| Risk Engine | Toxic combination and chokepoint findings |
| External Exposure (Preview) | `EXTERNALLY_EXPOSED_VM_INSTANCE` (Compute Engine or GKE resources with a direct public IP that allows host OS access) |
| Vulnerability Assessment for Google Cloud | `GCE OS vulnerability`, `GCE Software vulnerability`, `GKE OS vulnerability`, `GKE Software vulnerability` |
| GKE Security Posture | `GKE runtime OS vulnerability` |
| Mandiant Attack Surface Management | `Software vulnerability` |
| VM Manager | `OS Vulnerability` |
| Vulnerability Assessment for AWS (EC2) | `Software vulnerability` |

### Google Cloud services in simulations

| Services |
|------|
| Artifact Registry, BigQuery, Cloud Build, Cloud Run, Cloud Run functions, Managed Service for Apache Spark, Cloud Key Management Service, Cloud Load Balancing, Cloud NAT, Cloud Router, Cloud SQL, Cloud Storage, Compute Engine, Google Kubernetes Engine, Identity and Access Management, Resource Manager, Gemini Enterprise Agent Platform, Virtual Private Cloud (including subnets, firewall configurations and service control perimeters) |

### Google Cloud resource types for high-value sets

| Resource type |
|------|
| `aiplatform.googleapis.com/Dataset`, `Featurestore`, `MetadataStore`, `Model`, `ReasoningEngine`, `TrainingPipeline` |
| `artifactregistry.googleapis.com/Repository`, `bigquery.googleapis.com/Dataset` |
| `cloudbuild.googleapis.com/BitbucketServerConfig`, `BuildTrigger`, `Connection`, `GithubEnterpriseConfig`, `Repository`, `WorkerPool` |
| `cloudfunctions.googleapis.com/CloudFunction`, `compute.googleapis.com/Instance`, `container.googleapis.com/Cluster` |
| `dataproc.googleapis.com/Cluster`, `Job`; `run.googleapis.com/Job`, `Service` |
| `spanner.googleapis.com/Instance`, `sqladmin.googleapis.com/Instance`, `storage.googleapis.com/Bucket` |

### AWS (Enterprise (Deprecated) tier)

| Category | Supported |
|------|------|
| Services | IAM, STS, S3, WAFv2, EC2, ELB and ELBv2, RDS, KMS, ECR, ECS, ApiGateway and ApiGatewayv2, Organizations (Account Management Service), CloudFront, AutoScaling, Lambda, DynamoDB |
| High-value resource types | DynamoDB table, EC2 instance, Lambda function, RDS DBCluster, RDS DBInstance, S3 bucket |
| Data-sensitivity priority | Amazon S3 bucket |
| Security Health Analytics finding categories | 26 categories, among them Access keys rotated 90 days less, Credentials unused 45 days greater disabled, MFA enabled root user account, No root user account access key exists, Public access given RDS instance, Restricted SSH, S3 buckets configured block public access bucket settings, S3 default encryption KMS, VPC default security group closed (full list in the source) |

### Azure (Enterprise (Deprecated) tier)

| Category | Supported |
|------|------|
| Services | App Service, Azure Kubernetes Service (AKS), Virtual Network, Container Registry, Cosmos DB, Functions, Key Vault, MySQL database, Network security groups, PostgreSQL database, RBAC, Service Bus, SQL Database, Storage Account, Virtual Machine Scale Sets, Virtual Machines |
| High-value resource types | `Microsoft.Compute/virtualMachines` (Linux VM, Windows VM), `Microsoft.ContainerService/managedClusters`, `Microsoft.DBforMySQL/flexibleServers/databases`, `Microsoft.DBforPostgreSQL/flexibleServers/databases`, `Microsoft.DocumentDB/databaseAccounts`, `Microsoft.Sql/servers/databases`, `Microsoft.Storage/storageAccounts`, `Microsoft.Web/sites` (App Service, Function App) |
| Default high-value set | Same types as above except `Microsoft.ContainerService/managedClusters` |

## Notes

- The Enterprise service tier shuts down on May 21, 2027; organizations on it move automatically to Premium on or after May 21, 2027.
- If an organization exceeds the active finding or asset limits, attack path simulations do not run; contact Cloud Customer Care for an evaluation of a possible increase.
- Project-level activations are not supported. With a project or folder view in the console you can see attack exposure scores but not attack paths.
- Attack exposure scores can be used in the Google Cloud console, the Security Operations console or the Security Command Center API; toxic combination case scores and attack paths are in the Security Operations console only. Resource value configurations can also be created through the REST resource `organizations.resourceValueConfigs` (https://docs.cloud.google.com/security-command-center/docs/reference/rest/v1/organizations.resourceValueConfigs).
- Changes to attack exposure scores cannot trigger Pub/Sub notifications; findings sent to Pub/Sub at creation do not include a score because they are sent before it is calculated.
- Simulations for each cloud platform run independently; before the first resource value configuration for a provider exists, a provider-specific default high-value set applies. Azure connection: https://docs.cloud.google.com/security-command-center/docs/connect-scc-to-azure.
- Source: https://docs.cloud.google.com/security-command-center/docs/attack-exposure-supported-features (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [attack-exposure-learn.md](./attack-exposure-learn.md)
- [attack-exposure-define-high-value-resource-set.md](./attack-exposure-define-high-value-resource-set.md)
- [toxic-combinations-overview.md](./toxic-combinations-overview.md)
