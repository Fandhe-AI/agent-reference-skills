---
source: https://backupdr.googleapis.com/$discovery/rest?version=v1
---

# Backup and DR Service API message schemas (backupdr) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/backupdr/`.

### `AbandonBackupRequest`

- request message for AbandonBackup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `AcceleratorConfig`

- A specification of the type and number of accelerator cards attached to the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorCount` | integer (int32) | Optional. The number of the guest accelerator cards exposed to this instance. |
| `acceleratorType` | string | Optional. Full or partial URL of the accelerator type resource to attach to this instance. |

### `AccessConfig`

- An access configuration attached to an instance's network interface. Only one access config per instance is supported.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `externalIpv6` | string | Optional. The external IPv6 address of this access configuration. |
| `externalIpv6PrefixLength` | integer (int32) | Optional. The prefix length of the external IPv6 range. |
| `name` | string | Optional. The name of this access configuration. |
| `natIP` | string | Optional. The external IP address of this access configuration. |
| `networkTier` | string enum | Optional. This signifies the networking tier used for configuring this access Values: `NETWORK_TIER_UNSPECIFIED`, `PREMIUM`, `STANDARD`. |
| `publicPtrDomainName` | string | Optional. The DNS domain name for the public PTR record. |
| `setPublicPtr` | boolean | Optional. Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name. |
| `type` | string enum | Optional. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. In ipv6AccessConfigs, the default and only option is DIRECT_IPV6. Values: `ACCESS_TYPE_UNSPECIFIED`, `ONE_TO_ONE_NAT`, `DIRECT_IPV6`. |

### `AdvancedMachineFeatures`

- Specifies options for controlling advanced machine features.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableNestedVirtualization` | boolean | Optional. Whether to enable nested virtualization or not (default is false). |
| `enableUefiNetworking` | boolean | Optional. Whether to enable UEFI networking for instance creation. |
| `threadsPerCore` | integer (int32) | Optional. The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed. |
| `visibleCoreCount` | integer (int32) | Optional. The number of physical cores to expose to an instance. Multiply by the number of threads per core to compute the total number of virtual CPUs to expose to the instance. If unset, the number of cores is inferred from the instance's nominal CPU count and the underlying platform's SMT width. |

### `AliasIpRange`

- An alias IP range attached to an instance's network interface.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipCidrRange` | string | Optional. The IP alias ranges to allocate for this interface. |
| `subnetworkRangeName` | string | Optional. The name of a subnetwork secondary IP range from which to allocate an IP alias range. If not specified, the primary range of the subnetwork is used. |

### `AllocationAffinity`

- Specifies the reservations that this instance can consume from.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumeReservationType` | string enum | Optional. Specifies the type of reservation from which this instance can consume Values: `TYPE_UNSPECIFIED`, `NO_RESERVATION`, `ANY_RESERVATION`, `SPECIFIC_RESERVATION`. |
| `key` | string | Optional. Corresponds to the label key of a reservation resource. |
| `values` | array<string> | Optional. Corresponds to the label values of a reservation resource. |

### `AlloyDBClusterBackupPlanAssociationProperties`

- Properties for an AlloyDB cluster backup plan association.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterUid` | string | Output only. The cluster UID of the AlloyDB cluster. |

### `AlloyDBClusterDataSourceProperties`

- AlloyDBClusterDataSourceProperties represents the properties of a AlloyDB cluster resource that are stored in the DataSource. .
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterUid` | string | Output only. The cluster UID of the AlloyDB cluster backed up by the datasource. |
| `name` | string | Output only. Name of the AlloyDB cluster backed up by the datasource. |
| `pitrWindows` | array<AlloyDbPitrWindow> | Output only. Point in time recovery windows. The order is guaranteed to be ascending by start time. |

### `AlloyDBClusterDataSourceReferenceProperties`

- AlloyDBClusterDataSourceReferenceProperties represents the properties of an AlloyDB cluster that are stored in the DataSourceReference.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. Name of the AlloyDB cluster backed up by the datasource. Format: projects/{project}/locations/{location}/clusters/{cluster} |

### `AlloyDbClusterBackupProperties`

- AlloyDbClusterBackupProperties represents AlloyDB cluster backup properties. .
- Version: v1

| Field | Type | Description |
|---|---|---|
| `chainId` | string | Output only. The chain id of this backup. Backups belonging to the same chain are sharing the same chain id. This property is calculated and maintained by BackupDR. |
| `databaseVersion` | string | Output only. The PostgreSQL major version of the AlloyDB cluster when the backup was taken. |
| `description` | string | An optional text description for the backup. |
| `storedBytes` | string (int64) | Output only. Storage usage of this particular backup |

### `AlloyDbPitrWindow`

- Point in time recovery window for an AlloyDB cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Output only. The end time of the PITR window. It is not set if the corresponding Backup Plan Association is active. |
| `logRetentionDays` | string (int64) | Output only. Log retention days for the PITR window. |
| `startTime` | string (google-datetime) | Output only. The start time of the PITR window. |

### `AppliedAutoProtectionPolicy`

- AppliedAutoProtectionPolicy is a read-only view of AutoProtectionPolicy and AutoProtectionPolicyBinding resources that apply to a given workload project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlanDetails` | array<BackupPlanDetail> | Output only. The set of backup plan configurations, mirroring the backup_plan_details from the source AutoProtectionPolicy. Each element specifies a backup plan for a given resource type. |
| `bindingEvaluationSummary` | BindingEvaluationSummary | Output only. The summary of the last policy application when the job has run. |
| `createTime` | string (google-datetime) | Output only. Timestamp indicating when the binding was last created. |
| `criteria` | Criteria | Output only. The criteria resources must meet for this rule to apply. From AutoProtectionPolicy.criteria. |
| `name` | string | Identifier. Canonical resource name. Format: projects/{workload-project-number}/locations/{location}/appliedAutoProtectionPolicies/{id}. |
| `sourceBinding` | string | Output only. The full resource name of the AutoProtectionPolicyBinding that applies the source policy to a scope including this workload project. e.g., projects/{admin-project}/locations/{location}/autoProtectionPolicies/{policy_id}/autoProtectionPolicyBindings/{binding_id}. |
| `status` | string enum | Output only. The status of the applied auto protection policy. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETION_INITIATED`. |
| `updateTime` | string (google-datetime) | Output only. Timestamp indicating when the binding was last modified. |

### `AttachedDisk`

- An instance-attached disk resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoDelete` | boolean | Optional. Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance). |
| `boot` | boolean | Optional. Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem. |
| `deviceName` | string | Optional. This is used as an identifier for the disks. This is the unique name has to provided to modify disk parameters like disk_name and replica_zones (in case of RePDs) |
| `diskEncryptionKey` | CustomerEncryptionKey | Optional. Encrypts or decrypts a disk using a customer-supplied encryption key. |
| `diskInterface` | string enum | Optional. Specifies the disk interface to use for attaching this disk. Values: `DISK_INTERFACE_UNSPECIFIED`, `SCSI`, `NVME`, `NVDIMM`, `ISCSI`. |
| `diskSizeGb` | string (int64) | Optional. The size of the disk in GB. |
| `diskType` | string | Optional. Output only. The URI of the disk type resource. For example: projects/project/zones/zone/diskTypes/pd-standard or pd-ssd |
| `diskTypeDeprecated` | string enum | Specifies the type of the disk. Values: `DISK_TYPE_UNSPECIFIED`, `SCRATCH`, `PERSISTENT`. |
| `guestOsFeature` | array<GuestOsFeature> | Optional. A list of features to enable on the guest operating system. Applicable only for bootable images. |
| `index` | string (int64) | Optional. A zero-based index to this disk, where 0 is reserved for the boot disk. |
| `initializeParams` | InitializeParams | Optional. Specifies the parameters to initialize this disk. |
| `kind` | string | Optional. Type of the resource. |
| `license` | array<string> | Optional. Any valid publicly visible licenses. |
| `mode` | string enum | Optional. The mode in which to attach this disk. Values: `DISK_MODE_UNSPECIFIED`, `READ_WRITE`, `READ_ONLY`, `LOCKED`. |
| `savedState` | string enum | Optional. Output only. The state of the disk. Values: `DISK_SAVED_STATE_UNSPECIFIED`, `PRESERVED`. |
| `source` | string | Optional. Specifies a valid partial or full URL to an existing Persistent Disk resource. |
| `type` | string enum | Optional. Specifies the type of the disk. Values: `DISK_TYPE_UNSPECIFIED`, `SCRATCH`, `PERSISTENT`. |

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `AutoProtectionDetails`

- AutoProtectionDetails contains the protection details of a resource from the current binding's perspective.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlanAssociation` | string | Output only. Resource name of backup plan association linked to the resource, if any. Format: projects/{project}/locations/{location}/backupPlanAssociations/{backupPlanAssociationId} |
| `dataSource` | string | Output only. Resource name of the datasource linked to the resource, if any. Format: projects/{project}/locations/{location}/backupVaults/{backupVaultId}/dataSources/{dataSourceId} |
| `error` | Status | Output only. Error during last sync for protection/unprotection, if any. |
| `state` | string enum | Output only. Protection state of the resource from the current binding's perspective. Output only. Values: `STATE_UNSPECIFIED`, `PROTECTED`, `PROTECTION_FAILED`, `UNPROTECTING`, `UNPROTECTION_FAILED`. |

### `AutoProtectionPolicy`

- An AutoprotectionPolicy is a policy resource designed to automate backup management, moving from manual per-resource protection to a bulk approach. The policy dynamically discovers and applies a specified backup plan to all eligible resources that match its defined scope and criteria.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlanDetails` | array<BackupPlanDetail> | Required. The backup plan details for matching resources. |
| `bindingSummary` | BindingSummary | Output only. Summary of total count of different containers covered through this policy. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the policy was created. |
| `criteria` | Criteria | Required. The criteria for matching resources. |
| `description` | string | Optional. A description of the policy. The description must be at most 2048 characters. |
| `etag` | string | Output only. The etag for the policy. If this is provided on update, it must match the server's etag. |
| `name` | string | Output only. Identifier. The resource name of the AutoProtectionPolicy. Format: `projects/{project}/locations/{location}/autoProtectionPolicies/{auto_protection_policy}` |
| `policyEvaluationSummary` | PolicyEvaluationSummary | Output only. Summary of last policy evaluation when job was run per workload type. |
| `state` | string enum | Output only. The current state of the AutoProtectionPolicy. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `UPDATING`, `DELETING`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the policy was last updated. |

### `AutoProtectionPolicyBinding`

- An AutoProtectionPolicyBinding (APPA) acts as the bridge between an AutoProtectionPolicy and the scope (Project) where the policy should be applied.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindingEvaluationSummary` | BindingEvaluationSummary | Output only. Summaries of the last policy application when the job has run, with one entry per resource type specified in the AutoProtectionPolicy. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the binding was created. |
| `description` | string | Optional. A description of the binding. The description must be at most 2048 characters. |
| `etag` | string | Optional. Output only. The etag for the binding. If this is provided on update, it must match the server's etag. |
| `name` | string | Output only. Identifier. The resource name of the AutoProtectionPolicyBinding. Format: `projects/{project}/locations/{location}/autoProtectionPolicies/{auto_protection_policy}/bindings/{binding}` |
| `scope` | string | Required. Immutable. Resource Id of target container on which policy will be applied. Format: projects/{project_id} |
| `state` | string enum | Output only. The current state of the AutoProtectionPolicyBinding. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETION_INITIATED`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the binding was last updated. |

### `Backup`

- Message describing a Backup object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alloyDbBackupProperties` | AlloyDbClusterBackupProperties | Output only. AlloyDB specific backup properties. |
| `backupApplianceBackupProperties` | BackupApplianceBackupProperties | Output only. Backup Appliance specific backup properties. |
| `backupApplianceLocks` | array<BackupLock> | Optional. The list of BackupLocks taken by the accessor Backup Appliance. |
| `backupRetentionInheritance` | string enum | Output only. Setting for how the enforced retention end time is inherited. This value is copied from this backup's BackupVault. Values: `BACKUP_RETENTION_INHERITANCE_UNSPECIFIED`, `INHERIT_VAULT_RETENTION`, `MATCH_BACKUP_EXPIRE_TIME`. |
| `backupType` | string enum | Output only. Type of the backup, unspecified, scheduled or ondemand. Values: `BACKUP_TYPE_UNSPECIFIED`, `SCHEDULED`, `ON_DEMAND`, `ON_DEMAND_OPERATIONAL`. |
| `cloudSqlInstanceBackupProperties` | CloudSqlInstanceBackupProperties | Output only. Cloud SQL specific backup properties. |
| `computeInstanceBackupProperties` | ComputeInstanceBackupProperties | Output only. Compute Engine specific backup properties. |
| `consistencyTime` | string (google-datetime) | Output only. The point in time when this backup was captured from the source. |
| `createTime` | string (google-datetime) | Output only. The time when the instance was created. |
| `description` | string | Output only. The description of the Backup instance (2048 characters or less). |
| `diskBackupProperties` | DiskBackupProperties | Output only. Disk specific backup properties. |
| `enforcedRetentionEndTime` | string (google-datetime) | Optional. The backup can not be deleted before this time. |
| `etag` | string | Optional. Server specified ETag to prevent updates from overwriting each other. |
| `expireTime` | string (google-datetime) | Optional. When this backup is automatically expired. |
| `filestoreInstanceBackupProperties` | FilestoreInstanceBackupProperties | Output only. Filestore specific backup properties. |
| `gcpBackupPlanInfo` | GCPBackupPlanInfo | Output only. Configuration for a Google Cloud resource. |
| `gcpResource` | BackupGcpResource | Output only. Unique identifier of the GCP resource that is being backed up. |
| `kmsKeyVersions` | array<string> | Optional. Output only. The list of KMS key versions used to encrypt the backup. |
| `labels` | object | Optional. Resource labels to represent user provided metadata. No labels currently defined. |
| `name` | string | Output only. Identifier. Name of the backup to create. It must have the format`"projects//locations//backupVaults//dataSources/{datasource}/backups/{backup}"`. `{backup}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the datasource. |
| `netappVolumeBackupProperties` | NetAppVolumeBackupProperties | Output only. NetApp Volume specific backup properties. |
| `resourceSizeBytes` | string (int64) | Output only. source resource size in bytes at the time of the backup. |
| `satisfiesPzi` | boolean | Optional. Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Optional. Output only. Reserved for future use. |
| `serviceLocks` | array<BackupLock> | Output only. The list of BackupLocks taken by the service to prevent the deletion of the backup. |
| `state` | string enum | Output only. The Backup resource instance state. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `ERROR`, `UPLOADING`. |
| `updateTime` | string (google-datetime) | Output only. The time when the instance was updated. |
| `verificationSummary` | VerificationSummary | Output only. The restore verification status of the backup. |

### `BackupApplianceBackupConfig`

- BackupApplianceBackupConfig captures the backup configuration for applications that are protected by Backup Appliances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applicationName` | string | The name of the application. |
| `backupApplianceId` | string (int64) | The ID of the backup appliance. |
| `backupApplianceName` | string | The name of the backup appliance. |
| `hostName` | string | The name of the host where the application is running. |
| `slaId` | string (int64) | The ID of the SLA of this application. |
| `slpName` | string | The name of the SLP associated with the application. |
| `sltName` | string | The name of the SLT associated with the application. |

### `BackupApplianceBackupProperties`

- BackupApplianceBackupProperties represents BackupDR backup appliance's properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `finalizeTime` | string (google-datetime) | Output only. The time when this backup object was finalized (if none, backup is not finalized). |
| `generationId` | integer (int32) | Output only. The numeric generation ID of the backup (monotonically increasing). |
| `recoveryRangeEndTime` | string (google-datetime) | Optional. The latest timestamp of data available in this Backup. |
| `recoveryRangeStartTime` | string (google-datetime) | Optional. The earliest timestamp of data available in this Backup. |

### `BackupApplianceLockInfo`

- BackupApplianceLockInfo contains metadata about the backupappliance that created the lock.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupApplianceId` | string (int64) | Required. The ID of the backup/recovery appliance that created this lock. |
| `backupApplianceName` | string | Required. The name of the backup/recovery appliance that created this lock. |
| `backupImage` | string | The image name that depends on this Backup. |
| `jobName` | string | The job name on the backup/recovery appliance that created this lock. |
| `lockReason` | string | Required. The reason for the lock: e.g. MOUNT/RESTORE/BACKUP/etc. The value of this string is only meaningful to the client and it is not interpreted by the BackupVault service. |
| `slaId` | string (int64) | The SLA on the backup/recovery appliance that owns the lock. |

### `BackupConfigDetails`

- BackupConfigDetails has information about how the resource is configured for backups and about the most recent backup taken for this configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applicableResource` | string | Output only. The full resource name (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the resource that is applicable for the backup configuration. Example: "//compute.googleapis.com/projects/{project}/zones/{zone}/instances/{instance}" |
| `backupConfigSource` | string | Output only. The full resource name of the backup config source resource. For example, "//backupdr.googleapis.com/v1/projects/{project}/locations/{region}/backupPlans/{backupplanId}" or "//compute.googleapis.com/projects/{project}/locations/{region}/resourcePolicies/{resourcePolicyId}". |
| `backupConfigSourceDisplayName` | string | Output only. The display name of the backup config source resource. |
| `backupDrPlanConfig` | BackupDrPlanConfig | Google Cloud Backup and DR's Backup Plan specific data. |
| `backupDrTemplateConfig` | BackupDrTemplateConfig | Google Cloud Backup and DR's Template specific data. |
| `backupLocations` | array<BackupLocation> | The locations where the backups are to be stored. |
| `backupVault` | string | Output only. The full resource name (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the backup vault that will store the backups generated through this backup configuration. Example: "//backupdr.googleapis.com/v1/projects/{project}/locations/{region}/backupVaults/{backupvaultId}" |
| `latestSuccessfulBackupTime` | string (google-datetime) | Output only. Timestamp of the latest successful backup created via this backup configuration. |
| `pitrSettings` | PitrSettings | Output only. Point in time recovery settings of the backup configuration resource. |
| `state` | string enum | Output only. The state of the backup config resource. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `INACTIVE`, `ERROR`. |
| `type` | string enum | Output only. The type of the backup config resource. Values: `TYPE_UNSPECIFIED`, `CLOUD_SQL_INSTANCE_BACKUP_CONFIG`, `COMPUTE_ENGINE_RESOURCE_POLICY`, `BACKUPDR_BACKUP_PLAN`, `BACKUPDR_TEMPLATE`. |

### `BackupConfigInfo`

- BackupConfigInfo has information about how the resource is configured for Backup and about the most recent backup to this vault.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupApplianceBackupConfig` | BackupApplianceBackupConfig | Configuration for an application backed up by a Backup Appliance. |
| `gcpBackupConfig` | GcpBackupConfig | Configuration for a Google Cloud resource. |
| `lastBackupError` | Status | Output only. If the last backup failed, this field has the error message. |
| `lastBackupState` | string enum | Output only. The status of the last backup to this BackupVault Values: `LAST_BACKUP_STATE_UNSPECIFIED`, `FIRST_BACKUP_PENDING`, `SUCCEEDED`, `FAILED`, `PERMISSION_DENIED`. |
| `lastSuccessfulBackupConsistencyTime` | string (google-datetime) | Output only. If the last backup were successful, this field has the consistency date. |

### `BackupDrPlanConfig`

- BackupDrPlanConfig has additional information about Google Cloud Backup and DR's Plan backup configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupDrPlanRules` | array<BackupDrPlanRule> | Backup rules of the backup plan resource. |

### `BackupDrPlanRule`

- BackupDrPlanRule has rule specific information of the backup plan resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastSuccessfulBackupTime` | string (google-datetime) | Output only. Timestamp of the latest successful backup created via this backup rule. |
| `ruleId` | string | Output only. Unique Id of the backup rule. |

### `BackupDrTemplateConfig`

- Provides additional information about Google Cloud Backup and DR's Template backup configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `firstPartyManagementUri` | string | Output only. The URI of the BackupDr template resource for the first party identity users. |
| `thirdPartyManagementUri` | string | Output only. The URI of the BackupDr template resource for the third party identity users. |

### `BackupGcpResource`

- Minimum details to identify a Google Cloud resource for a backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcpResourcename` | string | Name of the Google Cloud resource. |
| `location` | string | Location of the resource: //"global"/"unspecified". |
| `type` | string | Type of the resource. Use the Unified Resource Type, eg. compute.googleapis.com/Instance. |

### `BackupLocation`

- BackupLocation represents a cloud location where a backup can be stored.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locationId` | string | Output only. The id of the cloud location. Example: "us-central1" |
| `type` | string enum | Output only. The type of the location. Values: `TYPE_UNSPECIFIED`, `ZONAL`, `REGIONAL`, `MULTI_REGIONAL`. |

### `BackupLock`

- BackupLock represents a single lock on a Backup resource. An unexpired lock on a Backup prevents the Backup from being deleted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupApplianceLockInfo` | BackupApplianceLockInfo | If the client is a backup and recovery appliance, this contains metadata about why the lock exists. |
| `lockUntilTime` | string (google-datetime) | Required. The time after which this lock is not considered valid and will no longer protect the Backup from deletion. |
| `serviceLockInfo` | ServiceLockInfo | Output only. Contains metadata about the lock exist for Google Cloud native backups. |

### `BackupPlan`

- A `BackupPlan` specifies some common fields, such as `description` as well as one or more `BackupRule` messages. Each `BackupRule` has a retention policy and defines a schedule by which the system is to perform backup workloads.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupRules` | array<BackupRule> | Optional. The backup rules for this `BackupPlan`. |
| `backupVault` | string | Required. Resource name of backup vault which will be used as storage location for backups. Format: projects/{project}/locations/{location}/backupVaults/{backupvault} |
| `backupVaultServiceAccount` | string | Output only. The Google Cloud service account to be used by the BackupVault for taking backups. Specify the email address of the Backup Vault Service Account. |
| `computeInstanceBackupPlanProperties` | ComputeInstanceBackupPlanProperties | Optional. Defines optional properties specific to backups of compute instance-based resources, such as Compute Engine. This includes settings like whether to perform a guest flush. |
| `createTime` | string (google-datetime) | Output only. When the `BackupPlan` was created. |
| `description` | string | Optional. The description of the `BackupPlan` resource. The description allows for additional details about `BackupPlan` and its use cases to be provided. An example description is the following: "This is a backup plan that performs a daily backup at 6pm and retains data for 3 months". The description must be at most 2048 characters. |
| `diskBackupPlanProperties` | DiskBackupPlanProperties | Optional. Defines optional properties specific to backups of disk-based resources, such as Compute Engine Persistent Disks. This includes settings like whether to perform a guest flush. |
| `etag` | string | Optional. `etag` is returned from the service in the response. As a user of the service, you may provide an etag value in this field to prevent stale resources. |
| `labels` | object | Optional. This collection of key/value pairs allows for custom labels to be supplied by the user. Example, {"tag": "Weekly"}. |
| `logRetentionDays` | string (int64) | Optional. Applicable only for Cloud SQL resource_type. Configures how long logs will be stored. It is defined in “days”. This value should be greater than or equal to minimum enforced log retention duration of the backup vault. |
| `maxCustomOnDemandRetentionDays` | integer (int32) | Optional. Optional field to configure the maximum number of days for which a backup can be retained. This field is only applicable for on-demand backups taken with custom retention value. |
| `name` | string | Output only. Identifier. The resource name of the `BackupPlan`. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}` |
| `resourceType` | string | Required. The resource type to which the `BackupPlan` will be applied. Examples include, "compute.googleapis.com/Instance", "sqladmin.googleapis.com/Instance", "alloydb.googleapis.com/Cluster", "compute.googleapis.com/Disk". |
| `revisionId` | string | Output only. The user friendly revision ID of the `BackupPlanRevision`. Example: v0, v1, v2, etc. |
| `revisionName` | string | Output only. The resource id of the `BackupPlanRevision`. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}/revisions/{revision_id}` |
| `state` | string enum | Output only. The `State` for the `BackupPlan`. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `INACTIVE`, `UPDATING`. |
| `supportedResourceTypes` | array<string> | Output only. All resource types to which backupPlan can be applied. |
| `updateTime` | string (google-datetime) | Output only. When the `BackupPlan` was last updated. |

### `BackupPlanAssociation`

- A BackupPlanAssociation represents a single BackupPlanAssociation which contains details like workload, backup plan etc
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alloydbClusterBackupPlanAssociationProperties` | AlloyDBClusterBackupPlanAssociationProperties | Output only. AlloyDB cluster's backup plan association properties. |
| `autoProtectionPolicyBinding` | string | Output only. The resource name of the `AutoProtectionPolicyBinding` that manages this association, if any. Format: `projects/{project}/locations/{location}/autoProtectionPolicies/{policy}/bindings/{binding}`. |
| `backupPlan` | string | Required. Resource name of backup plan which needs to be applied on workload. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId} |
| `backupPlanRevisionId` | string | Output only. The user friendly revision ID of the `BackupPlanRevision`. Example: v0, v1, v2, etc. |
| `backupPlanRevisionName` | string | Output only. The resource id of the `BackupPlanRevision`. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}/revisions/{revision_id}` |
| `cloudSqlInstanceBackupPlanAssociationProperties` | CloudSqlInstanceBackupPlanAssociationProperties | Output only. Cloud SQL instance's backup plan association properties. |
| `createTime` | string (google-datetime) | Output only. The time when the instance was created. |
| `dataSource` | string | Output only. Resource name of data source which will be used as storage location for backups taken. Format : projects/{project}/locations/{location}/backupVaults/{backupvault}/dataSources/{datasource} |
| `filestoreInstanceBackupPlanAssociationProperties` | FilestoreInstanceBackupPlanAssociationProperties | Output only. Filestore instance's backup plan association properties. |
| `name` | string | Output only. Identifier. The resource name of BackupPlanAssociation in below format Format : projects/{project}/locations/{location}/backupPlanAssociations/{backupPlanAssociationId} |
| `netappVolumeBackupPlanAssociationProperties` | NetAppVolumeBackupPlanAssociationProperties | Output only. NetApp volume backup plan association properties. |
| `resource` | string | Required. Immutable. Resource name of workload on which the backup plan is applied. The format can either be the resource name (e.g., "projects/my-project/zones/us-central1-a/instances/my-instance") or the full resource URI (e.g., "https://www.googleapis.com/compute/v1/projects/my-project/zones/us-central1-a/instances/my-instance"). |
| `resourceType` | string | Required. Immutable. Resource type of workload on which backupplan is applied |
| `rulesConfigInfo` | array<RuleConfigInfo> | Output only. The config info related to backup rules. |
| `state` | string enum | Output only. The BackupPlanAssociation resource state. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `INACTIVE`, `UPDATING`, `PAUSED`. |
| `updateTime` | string (google-datetime) | Output only. The time when the instance was updated. |

### `BackupPlanDetail`

- BackupPlanDetail defines configuration of protection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlan` | string | Required. The resource name of the BackupPlan to apply to resources that match the policy's criteria. This backup plan must be in the same location as AutoProtectionPolicy. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId} |
| `resourceType` | string | Required. The type of resource that this policy will automatically protect. Allowed values are, `compute.googleapis.com/Instance` and `compute.googleapis.com/Disk` are supported. |

### `BackupPlanRevision`

- `BackupPlanRevision` represents a snapshot of a `BackupPlan` at a point in time.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlanSnapshot` | BackupPlan | The Backup Plan being encompassed by this revision. |
| `createTime` | string (google-datetime) | Output only. The timestamp that the revision was created. |
| `name` | string | Output only. Identifier. The resource name of the `BackupPlanRevision`. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}/revisions/{revision}` |
| `revisionId` | string | Output only. The user friendly revision ID of the `BackupPlanRevision`. Example: v0, v1, v2, etc. |
| `state` | string enum | Output only. Resource State Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `INACTIVE`. |

### `BackupRule`

- `BackupRule` binds the backup schedule to a retention policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupRetentionDays` | integer (int32) | Required. Configures the duration for which backup data will be kept. It is defined in “days”. The value should be greater than or equal to minimum enforced retention of the backup vault. Minimum value is 1 and maximum value is 36159 for custom retention on-demand backup. Minimum and maximum values are workload specific for all other rules. Note: Longer retention can lead to higher storage costs post introductory trial. We recommend starting with a short duration of 3 days or less. |
| `ruleId` | string | Required. Immutable. The unique id of this `BackupRule`. The `rule_id` is unique per `BackupPlan`.The `rule_id` must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens. Pattern, /a-z{,62}/. |
| `standardSchedule` | StandardSchedule | Optional. Defines a schedule that runs within the confines of a defined window of time. |

### `BackupRule` (v1beta)

- `BackupRule` binds the backup schedule to a retention policy.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `backupRetentionDays` | integer (int32) | Required. Configures the duration for which backup data will be kept. It is defined in “days”. The value should be greater than or equal to minimum enforced retention of the backup vault. Minimum value is 1 and maximum value is 36159 for custom retention on-demand backup. Minimum and maximum values are workload specific for all other rules. Note: Longer retention can lead to higher storage costs post introductory trial. We recommend starting with a short duration of 3 days or less. |
| `backupVault` | string | Optional. Resource name of backup vault which will be used as storage location for backups generated by this rule. Format: projects/{project}/locations/{location}/backupVaults/{backup_vault} |
| `backupVaultServiceAccount` | string | Output only. The service account used by the BackupVault to take backups. |
| `ruleId` | string | Required. Immutable. The unique id of this `BackupRule`. The `rule_id` is unique per `BackupPlan`.The `rule_id` must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens. Pattern, /a-z{,62}/. |
| `standardSchedule` | StandardSchedule | Optional. Defines a schedule that runs within the confines of a defined window of time. |

### `BackupSelectionConfig`

- Configuration for selecting a backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataSource` | string | Required. Immutable. The fully qualified URI of the backupdr data source. |

### `BackupVault`

- Message describing a BackupVault object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessRestriction` | string enum | Optional. Restricts access to certain sources and destinations for data being sent into, or restored from, the backup vault. Defaults to WITHIN_ORGANIZATION if not provided during creation. Values: `ACCESS_RESTRICTION_UNSPECIFIED`, `WITHIN_PROJECT`, `WITHIN_ORGANIZATION`, `UNRESTRICTED`, `WITHIN_ORG_BUT_UNRESTRICTED_FOR_BA`. |
| `annotations` | object | Optional. User annotations. See https://google.aip.dev/128#annotations Stores small amounts of arbitrary data. |
| `backupCount` | string (int64) | Output only. The number of backups in this backup vault. |
| `backupMinimumEnforcedRetentionDuration` | string (google-duration) | Required. The default and minimum enforced retention for each backup within the backup vault. The enforced retention for each backup can be extended. Note: Longer minimum enforced retention period impacts potential storage costs post introductory trial. We recommend starting with a short duration of 3 days or less. |
| `backupRetentionInheritance` | string enum | Optional. Setting for how a backup's enforced retention end time is inherited. Values: `BACKUP_RETENTION_INHERITANCE_UNSPECIFIED`, `INHERIT_VAULT_RETENTION`, `MATCH_BACKUP_EXPIRE_TIME`. |
| `createTime` | string (google-datetime) | Output only. The time when the instance was created. |
| `deletable` | boolean | Output only. Set to true when there are no backups nested under this resource. |
| `description` | string | Optional. The description of the BackupVault instance (2048 characters or less). |
| `effectiveTime` | string (google-datetime) | Optional. Time after which the BackupVault resource is locked. |
| `encryptionConfig` | EncryptionConfig | Optional. The encryption config of the backup vault. |
| `etag` | string | Optional. Server specified ETag for the backup vault resource to prevent simultaneous updates from overwiting each other. |
| `labels` | object | Optional. Resource labels to represent user provided metadata. No labels currently defined: |
| `name` | string | Output only. Identifier. Name of the backup vault to create. It must have the format`"projects/{project}/locations/{location}/backupVaults/{backupvault}"`. `{backupvault}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the project and location. |
| `serviceAccount` | string | Output only. Service account used by the BackupVault Service for this BackupVault. The user should grant this account permissions in their workload project to enable the service to run backups and restores there. |
| `state` | string enum | Output only. The BackupVault resource instance state. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `ERROR`, `UPDATING`. |
| `totalStoredBytes` | string (int64) | Output only. Total size of the storage used by all backup resources. |
| `uid` | string | Output only. Immutable after resource creation until resource deletion. |
| `updateTime` | string (google-datetime) | Output only. The time when the instance was updated. |

### `BackupWindow`

- `BackupWindow` defines a window of the day during which backup jobs will run.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endHourOfDay` | integer (int32) | Required. The hour of day (1-24) when the window end for example if value of end hour of day is 10 that mean backup window end time is 10:00. End hour of day should be greater than start hour of day. 0 <= start_hour_of_day < end_hour_of_day <= 24 End hour of day is not include in backup window that mean if end_hour_of_day= 10 jobs should start before 10:00. |
| `startHourOfDay` | integer (int32) | Required. The hour of day (0-23) when the window starts for example if value of start hour of day is 6 that mean backup window start at 6:00. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `BindingEvaluationSummary`

- BindingEvaluationSummary contains the summary of the last run of job that applies policy to matching resources for a given binding.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failedResourceCount` | string (int64) | Output only. The number of matching resources whose protection failed during job run. |
| `matchingResourceCount` | string (int64) | Output only. The number of resources that currently match the policy's criteria. |
| `protectedResourceCount` | string (int64) | Output only. The number of matching resources that are successfully protected. |

### `BindingMatchingResource`

- BindingMatchingResource contains the details of a resource that matches the criteria of a binding.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoProtectionDetails` | AutoProtectionDetails | Output only. The auto protection details of the resource from the current binding's perspective. |
| `lastEvaluationTime` | string (google-datetime) | Output only. The timestamp when the resource was last evaluated for protection. |
| `name` | string | Identifier. The resource name of the `BindingMatchingResource`. Format: `projects/{project}/locations/{location}/autoProtectionPolicies/{auto_protection_policy}/bindings/{binding}/matchingResources/{matching_resource}` |
| `resource` | string | Required. Immutable. Resource name of the workload that matches the criteria of the binding. The format can be either a relative resource name (e.g., `projects/my-project/zones/us-central1-a/instances/my-instance`) or a schemeless full resource name (e.g., `//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance`). |

### `BindingSummary`

- BindingSummary contains count of different containers covered through this policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectCount` | string (int64) | Output only. Total count of Projects protected with this policy. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CleanupPhaseInfo`

- Info for Cleanup phase execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cleanupDuration` | string (google-duration) | Output only. Time taken to perform the cleanup of restored resource. |
| `cleanupTime` | string (google-datetime) | Output only. The time when the resources will be cleaned up. |
| `endTime` | string (google-datetime) | Output only. End time of the phase. |
| `error` | Status | Output only. Error details if the phase failed. |
| `failureCleanupRule` | RestoreVerificationCleanupRule | Output only. Snapshot of cleanup rule provided for this execution when execution is failed. |
| `phaseState` | string enum | Output only. The state of this phase. Values: `PHASE_STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMED_OUT`, `SKIPPED`, `WAITING`. |
| `startTime` | string (google-datetime) | Output only. Start time of the phase. |
| `successCleanupRule` | RestoreVerificationCleanupRule | Output only. Snapshot of cleanup rule provided for this execution when execution is successful. |

### `CloudSqlInstanceBackupPlanAssociationProperties`

- Cloud SQL instance's BPA properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceCreateTime` | string (google-datetime) | Output only. The time when the instance was created. |

### `CloudSqlInstanceBackupProperties`

- CloudSqlInstanceBackupProperties represents Cloud SQL Instance Backup properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseInstalledVersion` | string | Output only. The installed database version of the Cloud SQL instance when the backup was taken. |
| `finalBackup` | boolean | Output only. Whether the backup is a final backup. |
| `instanceCreateTime` | string (google-datetime) | Output only. The instance creation timestamp. |
| `instanceDeleteTime` | string (google-datetime) | Output only. The instance delete timestamp. |
| `instanceTier` | string | Output only. The tier (or machine type) for this instance. Example: `db-custom-1-3840` |
| `sourceInstance` | string | Output only. The source instance of the backup. Format: projects/{project}/instances/{instance} |

### `CloudSqlInstanceDataSourceProperties`

- CloudSqlInstanceDataSourceProperties represents the properties of a Cloud SQL resource that are stored in the DataSource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseInstalledVersion` | string | Output only. The installed database version of the Cloud SQL instance. |
| `instanceCreateTime` | string (google-datetime) | Output only. The instance creation timestamp. |
| `instanceTier` | string | Output only. The tier (or machine type) for this instance. Example: `db-custom-1-3840` |
| `name` | string | Output only. Name of the Cloud SQL instance backed up by the datasource. Format: projects/{project}/instances/{instance} |

### `CloudSqlInstanceDataSourceReferenceProperties`

- CloudSqlInstanceDataSourceReferenceProperties represents the properties of a Cloud SQL resource that are stored in the DataSourceReference.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseInstalledVersion` | string | Output only. The installed database version of the Cloud SQL instance. |
| `instanceCreateTime` | string (google-datetime) | Output only. The instance creation timestamp. |
| `instanceTier` | string | Output only. The tier (or machine type) for this instance. Example: `db-custom-1-3840` |
| `name` | string | Output only. Name of the Cloud SQL instance backed up by the datasource. Format: projects/{project}/instances/{instance} |

### `CloudSqlInstanceInitializationConfig`

- CloudSqlInstanceInitializationConfig contains the configuration for initializing a Cloud SQL instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `edition` | string enum | Required. The edition of the Cloud SQL instance. Values: `EDITION_UNSPECIFIED`, `ENTERPRISE`, `ENTERPRISE_PLUS`. |

### `ComputeInstanceBackupPlanProperties`

- Properties for a compute instance backup plan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bootDiskOnly` | boolean | Optional. If true, only the boot disk will be backed up. |
| `diskExclusionLabels` | DiskExclusionLabels | Optional. Labels used to identify disks for exclusion from the backup. If a disk carries any of these labels, it will be excluded (OR logic). |
| `guestFlush` | boolean | Optional. Indicates whether to perform a guest flush operation before taking a compute backup. When set to false, the system will create crash-consistent backups. Default value is false. |

### `ComputeInstanceBackupPlanProperties` (v1beta)

- Properties for a compute instance backup plan.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `guestFlush` | boolean | Optional. Indicates whether to perform a guest flush operation before taking a compute backup. When set to false, the system will create crash-consistent backups. Default value is false. |

### `ComputeInstanceBackupProperties`

- ComputeInstanceBackupProperties represents Compute Engine instance backup properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canIpForward` | boolean | Enables instances created based on these properties to send packets with source IP addresses other than their own and receive packets with destination IP addresses other than their own. If these instances will be used as an IP gateway or it will be set as the next-hop in a Route resource, specify `true`. If unsure, leave this set to `false`. See the https://cloud.google.com/vpc/docs/using-routes#canipforward documentation for more information. |
| `description` | string | An optional text description for the instances that are created from these properties. |
| `disk` | array<AttachedDisk> | An array of disks that are associated with the instances that are created from these properties. |
| `excludedDisks` | array<string> | Optional. List of disks excluded from the backup. |
| `guestAccelerator` | array<AcceleratorConfig> | A list of guest accelerator cards' type and count to use for instances created from these properties. |
| `guestFlush` | boolean | Optional. Indicates whether to perform a guest flush operation before taking a compute backup. When set to false, the system will create crash-consistent backups. Default value is false. |
| `includedDisks` | array<string> | Optional. List of disks included in the backup. |
| `keyRevocationActionType` | string enum | KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified. Values: `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `NONE`, `STOP`. |
| `labels` | object | Labels to apply to instances that are created from these properties. |
| `machineType` | string | The machine type to use for instances that are created from these properties. |
| `metadata` | Metadata | The metadata key/value pairs to assign to instances that are created from these properties. These pairs can consist of custom metadata or predefined keys. See https://cloud.google.com/compute/docs/metadata/overview for more information. |
| `minCpuPlatform` | string | Minimum cpu/platform to be used by instances. The instance may be scheduled on the specified or newer cpu/platform. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: Intel Haswell` or `minCpuPlatform: Intel Sandy Bridge`. For more information, read https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform. |
| `networkInterface` | array<NetworkInterface> | An array of network access configurations for this interface. |
| `scheduling` | Scheduling | Specifies the scheduling options for the instances that are created from these properties. |
| `serviceAccount` | array<ServiceAccount> | A list of service accounts with specified scopes. Access tokens for these service accounts are available to the instances that are created from these properties. Use metadata queries to obtain the access tokens for these instances. |
| `sourceInstance` | string | The source instance used to create this backup. This can be a partial or full URL to the resource. For example, the following are valid values: -https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance -projects/project/zones/zone/instances/instance |
| `tags` | Tags | A list of tags to apply to the instances that are created from these properties. The tags identify valid sources or targets for network firewalls. The setTags method can modify this list of tags. Each tag within the list must comply with RFC1035 (https://www.ietf.org/rfc/rfc1035.txt). |

### `ComputeInstanceBackupProperties` (v1beta)

- ComputeInstanceBackupProperties represents Compute Engine instance backup properties.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `canIpForward` | boolean | Enables instances created based on these properties to send packets with source IP addresses other than their own and receive packets with destination IP addresses other than their own. If these instances will be used as an IP gateway or it will be set as the next-hop in a Route resource, specify `true`. If unsure, leave this set to `false`. See the https://cloud.google.com/vpc/docs/using-routes#canipforward documentation for more information. |
| `description` | string | An optional text description for the instances that are created from these properties. |
| `disk` | array<AttachedDisk> | An array of disks that are associated with the instances that are created from these properties. |
| `guestAccelerator` | array<AcceleratorConfig> | A list of guest accelerator cards' type and count to use for instances created from these properties. |
| `guestFlush` | boolean | Optional. Indicates whether to perform a guest flush operation before taking a compute backup. When set to false, the system will create crash-consistent backups. Default value is false. |
| `keyRevocationActionType` | string enum | KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified. Values: `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `NONE`, `STOP`. |
| `labels` | object | Labels to apply to instances that are created from these properties. |
| `machineType` | string | The machine type to use for instances that are created from these properties. |
| `metadata` | Metadata | The metadata key/value pairs to assign to instances that are created from these properties. These pairs can consist of custom metadata or predefined keys. See https://cloud.google.com/compute/docs/metadata/overview for more information. |
| `minCpuPlatform` | string | Minimum cpu/platform to be used by instances. The instance may be scheduled on the specified or newer cpu/platform. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: Intel Haswell` or `minCpuPlatform: Intel Sandy Bridge`. For more information, read https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform. |
| `networkInterface` | array<NetworkInterface> | An array of network access configurations for this interface. |
| `scheduling` | Scheduling | Specifies the scheduling options for the instances that are created from these properties. |
| `serviceAccount` | array<ServiceAccount> | A list of service accounts with specified scopes. Access tokens for these service accounts are available to the instances that are created from these properties. Use metadata queries to obtain the access tokens for these instances. |
| `sourceInstance` | string | The source instance used to create this backup. This can be a partial or full URL to the resource. For example, the following are valid values: -https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance -projects/project/zones/zone/instances/instance |
| `tags` | Tags | A list of tags to apply to the instances that are created from these properties. The tags identify valid sources or targets for network firewalls. The setTags method can modify this list of tags. Each tag within the list must comply with RFC1035 (https://www.ietf.org/rfc/rfc1035.txt). |

### `ComputeInstanceDataSourceProperties`

- ComputeInstanceDataSourceProperties represents the properties of a ComputeEngine resource that are stored in the DataSource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | The description of the Compute Engine instance. |
| `machineType` | string | The machine type of the instance. |
| `name` | string | Name of the compute instance backed up by the datasource. |
| `totalDiskCount` | string (int64) | The total number of disks attached to the Instance. |
| `totalDiskSizeGb` | string (int64) | The sum of all the disk sizes. |

### `ComputeInstanceRestoreProperties`

- ComputeInstanceRestoreProperties represents Compute Engine instance properties to be overridden during restore.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advancedMachineFeatures` | AdvancedMachineFeatures | Optional. Controls for advanced machine-related behavior features. |
| `canIpForward` | boolean | Optional. Allows this instance to send and receive packets with non-matching destination or source IPs. |
| `confidentialInstanceConfig` | ConfidentialInstanceConfig | Optional. Controls Confidential compute options on the instance |
| `deletionProtection` | boolean | Optional. Whether the resource should be protected against deletion. |
| `description` | string | Optional. An optional description of this resource. Provide this property when you create the resource. |
| `disks` | array<AttachedDisk> | Optional. Array of disks associated with this instance. Persistent disks must be created before you can assign them. Source regional persistent disks will be restored with default replica zones if not specified. |
| `displayDevice` | DisplayDevice | Optional. Enables display device for the instance. |
| `guestAccelerators` | array<AcceleratorConfig> | Optional. A list of the type and count of accelerator cards attached to the instance. |
| `hostname` | string | Optional. Specifies the hostname of the instance. The specified hostname must be RFC1035 compliant. If hostname is not specified, the default hostname is \[INSTANCE_NAME\].c.\[PROJECT_ID\].internal when using the global DNS, and \[INSTANCE_NAME\].\[ZONE\].c.\[PROJECT_ID\].internal when using zonal DNS. |
| `instanceEncryptionKey` | CustomerEncryptionKey | Optional. Encrypts suspended data for an instance with a customer-managed encryption key. |
| `keyRevocationActionType` | string enum | Optional. KeyRevocationActionType of the instance. Values: `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `NONE`, `STOP`. |
| `labels` | object | Optional. Labels to apply to this instance. |
| `machineType` | string | Optional. Full or partial URL of the machine type resource to use for this instance. |
| `metadata` | Metadata | Optional. This includes custom metadata and predefined keys. |
| `minCpuPlatform` | string | Optional. Minimum CPU platform to use for this instance. |
| `name` | string | Required. Name of the compute instance. |
| `networkInterfaces` | array<NetworkInterface> | Optional. An array of network configurations for this instance. These specify how interfaces are configured to interact with other network services, such as connecting to the internet. Multiple interfaces are supported per instance. Required to restore in different project or region. |
| `networkPerformanceConfig` | NetworkPerformanceConfig | Optional. Configure network performance such as egress bandwidth tier. |
| `params` | InstanceParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `privateIpv6GoogleAccess` | string enum | Optional. The private IPv6 google access type for the VM. If not specified, use INHERIT_FROM_SUBNETWORK as default. Values: `INSTANCE_PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED`, `INHERIT_FROM_SUBNETWORK`, `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE`, `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE`. |
| `reservationAffinity` | AllocationAffinity | Optional. Specifies the reservations that this instance can consume from. |
| `resourcePolicies` | array<string> | Optional. Resource policies applied to this instance. By default, no resource policies will be applied. |
| `scheduling` | Scheduling | Optional. Sets the scheduling options for this instance. |
| `serviceAccounts` | array<ServiceAccount> | Optional. A list of service accounts, with their specified scopes, authorized for this instance. Only one service account per VM instance is supported. |
| `tags` | Tags | Optional. Tags to apply to this instance. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during instance creation. |

### `ComputeInstanceTargetEnvironment`

- ComputeInstanceTargetEnvironment represents Compute Engine target environment to be used during restore.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `project` | string | Required. Target project for the Compute Engine instance. |
| `useProjectServiceAccount` | boolean | Optional. Whether to use the project service account for the Compute Engine instance restore. |
| `zone` | string | Required. The zone of the Compute Engine instance. |

### `ConfidentialInstanceConfig`

- A set of Confidential Instance options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableConfidentialCompute` | boolean | Optional. Defines whether the instance should have confidential compute enabled. |

### `Criteria`

- Criteria specifies a set of criteria for matching resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `matchingConditions` | array<MatchingCondition> | Required. A list of matching conditions that a resource must meet to be protected by the policy. |

### `CustomerEncryptionKey`

- A customer-supplied encryption key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. The name of the encryption key that is stored in Google Cloud KMS. |
| `kmsKeyServiceAccount` | string | Optional. The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. |
| `rawKey` | string | Optional. Specifies a 256-bit customer-supplied encryption key. |
| `rsaEncryptedKey` | string | Optional. RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. |

### `DataSource`

- Message describing a DataSource object. Datasource object used to represent Datasource details for both admin and basic view.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupBlockedByVaultAccessRestriction` | boolean | Output only. This field is set to true if the backup is blocked by vault access restriction. |
| `backupConfigInfo` | BackupConfigInfo | Output only. Details of how the resource is configured for backup. |
| `backupCount` | string (int64) | Number of backups in the data source. |
| `configState` | string enum | Output only. The backup configuration state. Values: `BACKUP_CONFIG_STATE_UNSPECIFIED`, `ACTIVE`, `PASSIVE`, `PAUSED`. |
| `createTime` | string (google-datetime) | Output only. The time when the instance was created. |
| `dataSourceBackupApplianceApplication` | DataSourceBackupApplianceApplication | The backed up resource is a backup appliance application. |
| `dataSourceGcpResource` | DataSourceGcpResource | The backed up resource is a Google Cloud resource. The word 'DataSource' was included in the names to indicate that this is the representation of the Google Cloud resource used within the DataSource object. |
| `etag` | string | Server specified ETag for the ManagementServer resource to prevent simultaneous updates from overwiting each other. |
| `labels` | object | Optional. Resource labels to represent user provided metadata. No labels currently defined: |
| `name` | string | Output only. Identifier. Name of the datasource to create. It must have the format`"projects/{project}/locations/{location}/backupVaults/{backupvault}/dataSources/{datasource}"`. `{datasource}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the backup vault. |
| `state` | string enum | Output only. The DataSource resource instance state. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `ERROR`. |
| `totalStoredBytes` | string (int64) | The number of bytes (metadata and data) stored in this datasource. |
| `updateTime` | string (google-datetime) | Output only. The time when the instance was updated. |

### `DataSourceBackupApplianceApplication`

- BackupApplianceApplication describes a Source Resource when it is an application backed up by a BackupAppliance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applianceId` | string (int64) | Appliance Id of the Backup Appliance. |
| `applicationId` | string (int64) | The appid field of the application within the Backup Appliance. |
| `applicationName` | string | The name of the Application as known to the Backup Appliance. |
| `backupAppliance` | string | Appliance name. |
| `hostId` | string (int64) | Hostid of the application host. |
| `hostname` | string | Hostname of the host where the application is running. |
| `type` | string | The type of the application. e.g. VMBackup |

### `DataSourceBackupConfigInfo`

- Information of backup configuration on the DataSource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastBackupState` | string enum | Output only. The status of the last backup in this DataSource Values: `LAST_BACKUP_STATE_UNSPECIFIED`, `FIRST_BACKUP_PENDING`, `SUCCEEDED`, `FAILED`, `PERMISSION_DENIED`. |
| `lastSuccessfulBackupConsistencyTime` | string (google-datetime) | Output only. Timestamp of the last successful backup to this DataSource. |

### `DataSourceGcpResource`

- DataSourceGcpResource is used for protected resources that are Google Cloud Resources. This name is easeier to understand than GcpResourceDataSource or GcpDataSourceResource
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alloyDbClusterDatasourceProperties` | AlloyDBClusterDataSourceProperties | Output only. AlloyDBClusterDataSourceProperties has a subset of AlloyDB cluster properties that are useful at the Datasource level. Currently none of its child properties are auditable. If new auditable properties are added, the AUDIT annotation should be added. |
| `cloudSqlInstanceDatasourceProperties` | CloudSqlInstanceDataSourceProperties | Output only. CloudSqlInstanceDataSourceProperties has a subset of Cloud SQL Instance properties that are useful at the Datasource level. |
| `computeInstanceDatasourceProperties` | ComputeInstanceDataSourceProperties | ComputeInstanceDataSourceProperties has a subset of Compute Instance properties that are useful at the Datasource level. |
| `diskDatasourceProperties` | DiskDataSourceProperties | DiskDataSourceProperties has a subset of Disk properties that are useful at the Datasource level. |
| `filestoreInstanceDatasourceProperties` | FilestoreInstanceDataSourceProperties | Output only. FilestoreInstanceDataSourceProperties has a subset of FileStore instance properties that are useful at the Datasource level. |
| `gcpResourcename` | string | Output only. Full resource pathname URL of the source Google Cloud resource. |
| `location` | string | Location of the resource: //"global"/"unspecified". |
| `netappVolumeDatasourceProperties` | NetAppVolumeDataSourceProperties | Output only. NetAppVolumeDataSourceProperties has a subset of NetApp Volume properties that are useful at the Datasource level. |
| `type` | string | The type of the Google Cloud resource. Use the Unified Resource Type, eg. compute.googleapis.com/Instance. |

### `DataSourceGcpResourceInfo`

- The Google Cloud resource that the DataSource is associated with.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alloyDbClusterProperties` | AlloyDBClusterDataSourceReferenceProperties | Output only. The properties of the AlloyDB cluster. |
| `cloudSqlInstanceProperties` | CloudSqlInstanceDataSourceReferenceProperties | Output only. The properties of the Cloud SQL instance. |
| `filestoreInstanceProperties` | FilestoreInstanceDataSourceReferenceProperties | Output only. The properties of the Filestore instance. |
| `gcpResourcename` | string | Output only. The resource name of the Google Cloud resource. Ex: projects/{project}/zones/{zone}/instances/{instance} |
| `location` | string | Output only. The location of the Google Cloud resource. Ex: //"global"/"unspecified" |
| `netappVolumeProperties` | NetAppVolumeDataSourceReferenceProperties | Output only. The NetApp Volume properties. |
| `type` | string | Output only. The type of the Google Cloud resource. Ex: compute.googleapis.com/Instance |

### `DataSourceReference`

- DataSourceReference is a reference to a DataSource resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the DataSourceReference was created. |
| `dataSource` | string | Output only. The resource name of the DataSource. Format: projects/{project}/locations/{location}/backupVaults/{backupVault}/dataSources/{dataSource} |
| `dataSourceBackupConfigInfo` | DataSourceBackupConfigInfo | Output only. Information of backup configuration on the DataSource. |
| `dataSourceBackupConfigState` | string enum | Output only. The backup configuration state of the DataSource. Values: `BACKUP_CONFIG_STATE_UNSPECIFIED`, `ACTIVE`, `PASSIVE`, `PAUSED`. |
| `dataSourceBackupCount` | string (int64) | Output only. Number of backups in the DataSource. |
| `dataSourceGcpResourceInfo` | DataSourceGcpResourceInfo | Output only. The Google Cloud resource that the DataSource is associated with. |
| `name` | string | Identifier. The resource name of the DataSourceReference. Format: projects/{project}/locations/{location}/dataSourceReferences/{data_source_reference} |
| `totalStoredBytes` | string (int64) | Output only. Total size of the storage used by all backup resources for the referenced datasource. |

### `DiskBackupPlanProperties`

- Properties for a disk backup plan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `guestFlush` | boolean | Optional. Indicates whether to perform a guest flush operation before taking a disk backup. When set to false, the system will create crash-consistent backups. Default value is false. |

### `DiskBackupProperties`

- DiskBackupProperties represents the properties of a Disk backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessMode` | string | The access mode of the source disk. |
| `architecture` | string enum | The architecture of the source disk. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `X86_64`, `ARM64`. |
| `description` | string | A description of the source disk. |
| `enableConfidentialCompute` | boolean | Indicates whether the source disk is using confidential compute mode. |
| `guestFlush` | boolean | Optional. Defines if the guest flush is enabled for the source disk. Default value is false. |
| `guestOsFeature` | array<GuestOsFeature> | A list of guest OS features that are applicable to this backup. |
| `labels` | object | The labels of the source disk. |
| `licenses` | array<string> | A list of publicly available licenses that are applicable to this backup. This is applicable if the original image had licenses attached, e.g. Windows image. |
| `physicalBlockSizeBytes` | string (int64) | The physical block size of the source disk. |
| `provisionedIops` | string (int64) | The number of IOPS provisioned for the source disk. |
| `provisionedThroughput` | string (int64) | The number of throughput provisioned for the source disk. |
| `region` | string | Region and zone are mutually exclusive fields. The URL of the region of the source disk. |
| `replicaZones` | array<string> | The URL of the Zones where the source disk should be replicated. |
| `sizeGb` | string (int64) | Size(in GB) of the source disk. |
| `sourceDisk` | string | The source disk used to create this backup. |
| `storagePool` | string | The storage pool of the source disk. |
| `type` | string | The URL of the type of the disk. |
| `zone` | string | The URL of the Zone where the source disk. |

### `DiskDataSourceProperties`

- DiskDataSourceProperties represents the properties of a Disk resource that are stored in the DataSource. .
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | The description of the disk. |
| `name` | string | Name of the disk backed up by the datasource. |
| `sizeGb` | string (int64) | The size of the disk in GB. |
| `type` | string | The type of the disk. |

### `DiskExclusionLabels`

- Message for selective disk backup exclusion labels.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | array<LabelKeyValPair> | Optional. Labels used to identify disks for exclusion from the backup. If a disk carries any of these labels, it will be excluded (OR logic). |

### `DiskRestoreProperties`

- DiskRestoreProperties represents the properties of a Disk restore.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessMode` | string enum | Optional. The access mode of the disk. Values: `READ_WRITE_SINGLE`, `READ_WRITE_MANY`, `READ_ONLY_MANY`. |
| `architecture` | string enum | Optional. The architecture of the source disk. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `X86_64`, `ARM64`. |
| `description` | string | Optional. An optional description of this resource. Provide this property when you create the resource. |
| `diskEncryptionKey` | CustomerEncryptionKey | Optional. Encrypts the disk using a customer-supplied encryption key or a customer-managed encryption key. |
| `enableConfidentialCompute` | boolean | Optional. Indicates whether this disk is using confidential compute mode. Encryption with a Cloud KMS key is required to enable this option. |
| `guestOsFeature` | array<GuestOsFeature> | Optional. A list of features to enable in the guest operating system. This is applicable only for bootable images. |
| `instanceBackupSource` | RestoreDiskFromInstanceOptions | Provides options for creating a disk from a source Compute Instance backup. |
| `labels` | object | Optional. Labels to apply to this disk. These can be modified later using setLabels method. Label values can be empty. |
| `licenses` | array<string> | Optional. A list of publicly available licenses that are applicable to this backup. This is applicable if the original image had licenses attached, e.g. Windows image |
| `name` | string | Required. Name of the disk. |
| `physicalBlockSizeBytes` | string (int64) | Optional. Physical block size of the persistent disk, in bytes. If not present in a request, a default value is used. Currently, the supported size is 4096. |
| `provisionedIops` | string (int64) | Optional. Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. |
| `provisionedThroughput` | string (int64) | Optional. Indicates how much throughput to provision for the disk. This sets the number of throughput MB per second that the disk can handle. |
| `resourceManagerTags` | object | Optional. Resource manager tags to be bound to the disk. |
| `resourcePolicy` | array<string> | Optional. Resource policies applied to this disk. |
| `sizeGb` | string (int64) | Required. The size of the disk in GB. |
| `storagePool` | string | Optional. The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. |
| `type` | string | Required. URL of the disk type resource describing which disk type to use to create the disk. |

### `DiskTargetEnvironment`

- DiskTargetEnvironment represents the target environment for the disk.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `project` | string | Required. Target project for the disk. |
| `useProjectServiceAccount` | boolean | Optional. Whether to use the project service account for the disk restore. |
| `zone` | string | Required. Target zone for the disk. |

### `DisplayDevice`

- A set of Display Device options
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableDisplay` | boolean | Optional. Enables display for the Compute Engine VM |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EncryptionConfig`

- Message describing the EncryptionConfig of backup vault. This determines how data within the vault is encrypted at rest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. The Cloud KMS key name to encrypt backups in this backup vault. Must be in the same region as the vault. Some workload backups like compute disk backups may use their inherited source key instead. Format: projects/{project}/locations/{location}/keyRings/{ring}/cryptoKeys/{key} |

### `EndTrialRequest`

- Request message for ending a trial.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endReason` | string enum | Required. The reason for ending the trial. Values: `END_REASON_UNSPECIFIED`, `MOVE_TO_PAID`, `DISCONTINUED`. |

### `Entry`

- A key/value pair to be used for storing metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Optional. Key for the metadata entry. |
| `value` | string | Optional. Value for the metadata entry. These are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on values is that their size must be less than or equal to 262144 bytes (256 KiB). |

### `ExecutionSummary`

- Summary of the last execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastExecution` | string | Output only. The resource name of the last execution. Format: `projects/{project}/locations/{location}/restoreTemplates/{restore_template}/executions/{execution}` |
| `lastExecutionState` | string enum | Output only. The state of the last execution. Values: `EXECUTION_STATE_UNSPECIFIED`, `RUNNING`, `SUCCEEDED`, `FAILED`, `DELETING`. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FetchAccessTokenRequest`

- Request message for FetchAccessToken.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `generationId` | integer (int32) | Required. The generation of the backup to update. |

### `FetchAccessTokenResponse`

- Response message for FetchAccessToken.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | The token is valid until this time. |
| `readLocation` | string | The location in bucket that can be used for reading. |
| `token` | string | Input only. The downscoped token that was created. |
| `writeLocation` | string | The location in bucket that can be used for writing. |

### `FetchBackupPlanAssociationsForResourceTypeResponse`

- Response for the FetchBackupPlanAssociationsForResourceType method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlanAssociations` | array<BackupPlanAssociation> | Output only. The BackupPlanAssociations from the specified parent. |
| `nextPageToken` | string | Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `FetchBackupsForResourceTypeResponse`

- Response for the FetchBackupsForResourceType method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backups` | array<Backup> | The Backups from the specified parent. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `FetchDataSourceReferencesForResourceTypeResponse`

- Response for the FetchDataSourceReferencesForResourceType method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataSourceReferences` | array<DataSourceReference> | The DataSourceReferences from the specified parent. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `FetchMsComplianceMetadataRequest`

- Request message for GetMsComplianceMetadata
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | Required. The project id of the target project |

### `FetchMsComplianceMetadataResponse`

- Response message for GetMsComplianceMetadata
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isAssuredWorkload` | boolean | The ms compliance metadata of the target project, if the project is an Assured Workloads project, values will be true, otherwise false. |

### `FetchResourceBackupConfigsResponse`

- Response for FetchResourceBackupConfigs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `resourceBackupConfigs` | array<ResourceBackupConfig> | The list of ResourceBackupConfigs for the specified scope. |

### `FetchUsableBackupVaultsResponse`

- Response message for fetching usable BackupVaults.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupVaults` | array<BackupVault> | The list of BackupVault instances in the project for the specified location. If the '{location}' value in the request is "-", the response contains a list of instances from all locations. In case any location is unreachable, the response will only return backup vaults in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `FilestoreInstanceBackupPlanAssociationProperties`

- Filestore instance's BPA properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceCreateTime` | string (google-datetime) | Output only. The time when the instance was created. |

### `FilestoreInstanceBackupProperties`

- FilestoreInstanceBackupProperties represents the properties of a Filestore instance that are backed up by the datasource. .
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sourceInstance` | string | Output only. The source instance of the backup. |

### `FilestoreInstanceDataSourceProperties`

- FilestoreInstanceDataSourceProperties represents the properties of a Filestore resource that are stored in the DataSource. .
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceCreateTime` | string (google-datetime) | Output only. The instance creation timestamp. |
| `name` | string | Output only. Name of the Filestore instance backed up by the datasource. |

### `FilestoreInstanceDataSourceReferenceProperties`

- FilestoreInstanceDataSourceReferenceProperties represents the properties of a Filestore resource that are stored in the DataSourceReference. .
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceCreateTime` | string (google-datetime) | Output only. The instance creation timestamp. |
| `name` | string | Output only. Name of the Filestore instance backed up by the datasource. Format: projects/{project}/instances/{instance} |

### `FinalizeBackupRequest`

- Message for finalizing a Backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupId` | string | Required. Resource ID of the Backup resource to be finalized. This must be the same backup_id that was used in the InitiateBackupRequest. |
| `consistencyTime` | string (google-datetime) | The point in time when this backup was captured from the source. This will be assigned to the consistency_time field of the newly created Backup. |
| `description` | string | This will be assigned to the description field of the newly created Backup. |
| `recoveryRangeEndTime` | string (google-datetime) | The latest timestamp of data available in this Backup. This will be set on the newly created Backup. |
| `recoveryRangeStartTime` | string (google-datetime) | The earliest timestamp of data available in this Backup. This will set on the newly created Backup. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `retentionDuration` | string (google-duration) | The ExpireTime on the backup will be set to FinalizeTime plus this duration. If the resulting ExpireTime is less than EnforcedRetentionEndTime, then ExpireTime is set to EnforcedRetentionEndTime. |

### `GCPBackupPlanInfo`

- GCPBackupPlanInfo captures the plan configuration details of Google Cloud resources at the time of backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlan` | string | Resource name of backup plan by which workload is protected at the time of the backup. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId} |
| `backupPlanRevisionId` | string | The user friendly id of the backup plan revision which triggered this backup in case of scheduled backup or used for on demand backup. |
| `backupPlanRevisionName` | string | Resource name of the backup plan revision which triggered this backup in case of scheduled backup or used for on demand backup. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId}/revisions/{revisionId} |
| `backupPlanRuleId` | string | The rule id of the backup plan which triggered this backup in case of scheduled backup or used for |

### `GcpBackupConfig`

- GcpBackupConfig captures the Backup configuration details for Google Cloud resources. All Google Cloud resources regardless of type are protected with backup plan associations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoProtectionPolicyBinding` | string | Output only. The resource name of the `AutoProtectionPolicyBinding` that manages this datasource, if any. Format: `projects/{project}/locations/{location}/autoProtectionPolicies/{policy}/bindings/{binding}`. |
| `backupPlan` | string | The name of the backup plan. |
| `backupPlanAssociation` | string | The name of the backup plan association. |
| `backupPlanDescription` | string | The description of the backup plan. |
| `backupPlanRevisionId` | string | The user friendly id of the backup plan revision. E.g. v0, v1 etc. |
| `backupPlanRevisionName` | string | The name of the backup plan revision. |
| `backupPlanRules` | array<string> | The names of the backup plan rules which point to this backupvault |

### `GcpResource`

- Minimum details to identify a Google Cloud resource
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcpResourcename` | string | Name of the Google Cloud resource. |
| `location` | string | Location of the resource: //"global"/"unspecified". |
| `type` | string | Type of the resource. Use the Unified Resource Type, eg. compute.googleapis.com/Instance. |

### `GoogleCloudBackupdrV1OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalInfo` | object | Output only. AdditionalInfo contains additional Info related to backup plan association resource. |
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to 'Code.CANCELLED'. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleCloudBackupdrV1betaOperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `additionalInfo` | object | Output only. AdditionalInfo contains additional Info related to backup plan association resource. |
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to 'Code.CANCELLED'. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GuestOsFeature`

- Feature type of the Guest OS.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | The ID of a supported feature. Values: `FEATURE_TYPE_UNSPECIFIED`, `VIRTIO_SCSI_MULTIQUEUE`, `WINDOWS`, `MULTI_IP_SUBNET`, `UEFI_COMPATIBLE`, `SECURE_BOOT`, `GVNIC`, `SEV_CAPABLE`, `BARE_METAL_LINUX_COMPATIBLE`, `SUSPEND_RESUME_COMPATIBLE`, `SEV_LIVE_MIGRATABLE`, `SEV_SNP_CAPABLE`, `TDX_CAPABLE`, `IDPF`, `SEV_LIVE_MIGRATABLE_V2`. |

### `InitializeParams`

- Specifies the parameters to initialize this disk.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskName` | string | Optional. Specifies the disk name. If not specified, the default is to use the name of the instance. |
| `replicaZones` | array<string> | Optional. URL of the zone where the disk should be created. Required for each regional disk associated with the instance. |

### `InitializeServiceRequest`

- Request message for initializing the service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlanLocation` | string | Optional. The location where the BackupPlan will be created. This field is required for multi-region BackupVaults and is optional for regional BackupVaults. It is useful when creating a Backup Vault in a multi-region, allowing the BackupPlan to reside in a specific region within that multi-region. If this field is not provided, the BackupPlan will be created in the same location as specified in the `name` field. |
| `cloudSqlInstanceInitializationConfig` | CloudSqlInstanceInitializationConfig | Optional. The configuration for initializing a Cloud SQL instance. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `resourceType` | string | Required. The resource type to which the default service config will be applied. Examples include, "compute.googleapis.com/Instance" and "storage.googleapis.com/Bucket". |
| `validateOnly` | boolean | Optional. If set, validates the request and returns the result, but does not actually run it. |

### `InitiateBackupRequest`

- request message for InitiateBackup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupId` | string | Required. Resource ID of the Backup resource. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `InitiateBackupResponse`

- Response message for InitiateBackup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | string | The name of the backup that was created. |
| `baseBackupGenerationId` | integer (int32) | The generation id of the base backup. It is needed for the incremental backups. |
| `newBackupGenerationId` | integer (int32) | The generation id of the new backup. |

### `InitiateDeleteAutoProtectionPolicyBindingRequest`

- Request message for initiating delete of an AutoProtectionPolicyBinding.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The current etag of the AutoProtectionPolicyBinding. If an etag is provided and does not match the current etag of the binding, deletion will be blocked and an ABORTED error will be returned. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `InstanceParams`

- Additional instance params.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Optional. Resource manager tags to be bound to the instance. |

### `KeyValuePair`

- KeyValuePair defines a key-value pair for matching resource labels.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Required. The key of the label to match. This must be in the format `{label_key}`. The key must match the regex Format:`\p{Ll}\p{Lo}{0,62}`. |
| `values` | array<string> | Required. The values of the label to match. There will be explicit “OR” between values of array. Each value must be in the format `{label_value}`. The value must match the regex Format: `[\\p{Ll}\\p{Lo}\\p{N}_-]{1,63}`. |

### `LabelKeyValPair`

- Message for a label key-value pair.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Key of the label. The key must follow the format: `\\p{Ll}\\p{Lo}{0,62}`. This means the key must start with a lowercase letter or a lowercase international character, followed by zero or more lowercase letters, lowercase international characters, numbers, underscores, or dashes. The key must be at most 63 characters long. International characters are allowed. |
| `value` | string | Value of the label. The value must follow the format: `[\\p{Ll}\\p{Lo}\\p{N}_-]{1,63}`. This means the value must be one or more lowercase letters, lowercase international characters, numbers, underscores, or dashes. The value must be at most 63 characters long. International characters are allowed. |

### `ListAppliedAutoProtectionPoliciesResponse`

- Response message for ListAppliedAutoProtectionPolicies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appliedAutoProtectionPolicies` | array<AppliedAutoProtectionPolicy> | A list of the AppliedAutoProtectionPolicy resources found. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. For example, "projects/my-project/locations/us-east1"\]. |

### `ListAutoProtectionPoliciesResponse`

- Response message for ListAutoProtectionPolicies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoProtectionPolicies` | array<AutoProtectionPolicy> | A list of the AutoProtectionPolicy resources found. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListAutoProtectionPolicyBindingsResponse`

- Response message for ListAutoProtectionPolicyBindings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoProtectionPolicyBindings` | array<AutoProtectionPolicyBinding> | A list of the AutoProtectionPolicyBindings resources found. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListBackupPlanAssociationsResponse`

- Response message for List BackupPlanAssociation
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlanAssociations` | array<BackupPlanAssociation> | The list of Backup Plan Associations in the project for the specified location. If the `{location}` value in the request is "-", the response contains a list of instances from all locations. In case any location is unreachable, the response will only return backup plan associations in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBackupPlanRevisionsResponse`

- The response message for getting a list of `BackupPlanRevision`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlanRevisions` | array<BackupPlanRevision> | The list of `BackupPlanRevisions` in the project for the specified location. If the `{location}` value in the request is "-", the response contains a list of resources from all locations. In case any location is unreachable, the response will only return backup plans in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. |
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListBackupPlanRevisions` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBackupPlansResponse`

- The response message for getting a list of `BackupPlan`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlans` | array<BackupPlan> | The list of `BackupPlans` in the project for the specified location. If the `{location}` value in the request is "-", the response contains a list of resources from all locations. In case any location is unreachable, the response will only return backup plans in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. BackupPlan |
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListBackupPlans` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBackupVaultsResponse`

- Response message for listing BackupVaults.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupVaults` | array<BackupVault> | The list of BackupVault instances in the project for the specified location. If the '{location}' value in the request is "-", the response contains a list of instances from all locations. In case any location is unreachable, the response will only return backup vaults in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBackupsResponse`

- Response message for listing Backups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backups` | array<Backup> | The list of Backup instances in the project for the specified location. If the '{location}' value in the request is "-", the response contains a list of instances from all locations. In case any location is unreachable, the response will only return data sources in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBindingMatchingResourcesResponse`

- The response message for getting a list of `BindingMatchingResources`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `matchingResources` | array<BindingMatchingResource> | The list of `BindingMatchingResources` in the project,location for the specified binding. |
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListBindingMatchingResources` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |

### `ListDataSourceReferencesResponse`

- Response for the ListDataSourceReferences method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataSourceReferences` | array<DataSourceReference> | The DataSourceReferences from the specified parent. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListDataSourcesResponse`

- Response message for listing DataSources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataSources` | array<DataSource> | The list of DataSource instances in the project for the specified location. If the '{location}' value in the request is "-", the response contains a list of instances from all locations. In case any location is unreachable, the response will only return data sources in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListManagementServersResponse`

- Response message for listing management servers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `managementServers` | array<ManagementServer> | The list of ManagementServer instances in the project for the specified location. If the '{location}' value in the request is "-", the response contains a list of instances from all locations. In case any location is unreachable, the response will only return management servers in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListResourceBackupConfigsResponse`

- Response for ListResourceBackupConfigs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `resourceBackupConfigs` | array<ResourceBackupConfig> | The list of ResourceBackupConfigs for the specified scope. |

### `ListRestoreTemplateExecutionsResponse`

- Response message for listing RestoreTemplateExecutions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results. |
| `restoreTemplateExecutions` | array<RestoreTemplateExecution> | The list of RestoreTemplateExecution instances. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListRestoreTemplatesResponse`

- Response message for listing RestoreTemplates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token which may be sent as `page_token` in a subsequent `ListRestoreTemplates` call. |
| `restoreTemplates` | array<RestoreTemplate> | The list of RestoreTemplates. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListRestoreVerificationPlanAssociationsResponse`

- Response message for ListRestoreVerificationPlanAssociations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `restoreVerificationPlanAssociations` | array<RestoreVerificationPlanAssociation> | The list of RestoreVerificationPlanAssociations. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListRestoreVerificationPlansResponse`

- The response message for getting a list of `RestoreVerificationPlans`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListRestoreVerificationPlans` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `restoreVerificationPlans` | array<RestoreVerificationPlan> | The list of `RestoreVerificationPlans` in the project for the specified location. If the `{location}` value in the request is "-", the response contains a list of resources from all locations. In case any location is unreachable, the response will only return restore verification plans in reachable locations and the 'unreachable' field will be populated with a list of unreachable locations. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `LocationMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `unsupportedFeatures` | array<string> | List of features that are not supported in the location. Values: `FEATURE_UNSPECIFIED`, `MANAGEMENT_SERVER`, `COMPUTE_INSTANCE`, `PROTECTION_SUMMARY`, `DISK`, `CLOUD_SQL`, `ALLOY_DB`, `FILESTORE`, `BV_AF`, `GOOGLE_CLOUD_NETAPP_VOLUME`, `CEP_MONITORING_COMPUTE_INSTANCE`, `CEP_MONITORING_DISK`, `BV_CUSTOM_PROBERS`, `FT_CUSTOM_PROBERS`. |

### `ManagementServer`

- ManagementServer describes a single BackupDR ManagementServer instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baProxyUri` | array<string> | Output only. The hostname or ip address of the exposed AGM endpoints, used by BAs to connect to BA proxy. |
| `createTime` | string (google-datetime) | Output only. The time when the instance was created. |
| `description` | string | Optional. The description of the ManagementServer instance (2048 characters or less). |
| `etag` | string | Optional. Server specified ETag for the ManagementServer resource to prevent simultaneous updates from overwiting each other. |
| `labels` | object | Optional. Resource labels to represent user provided metadata. Labels currently defined: 1. migrate_from_go= If set to true, the MS is created in migration ready mode. |
| `managementUri` | ManagementURI | Output only. The hostname or ip address of the exposed AGM endpoints, used by clients to connect to AGM/RD graphical user interface and APIs. |
| `name` | string | Output only. Identifier. The resource name. |
| `networks` | array<NetworkConfig> | Optional. VPC networks to which the ManagementServer instance is connected. For this version, only a single network is supported. This field is optional if MS is created without PSA |
| `oauth2ClientId` | string | Output only. The OAuth 2.0 client id is required to make API calls to the Backup and DR instance API of this ManagementServer. This is the value that should be provided in the 'aud' field of the OIDC ID Token (see openid specification https://openid.net/specs/openid-connect-core-1_0.html#IDToken). |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `state` | string enum | Output only. The ManagementServer state. Values: `INSTANCE_STATE_UNSPECIFIED`, `CREATING`, `READY`, `UPDATING`, `DELETING`, `REPAIRING`, `MAINTENANCE`, `ERROR`. |
| `type` | string enum | Optional. The type of the ManagementServer resource. Values: `INSTANCE_TYPE_UNSPECIFIED`, `BACKUP_RESTORE`. |
| `updateTime` | string (google-datetime) | Output only. The time when the instance was updated. |
| `workforceIdentityBasedManagementUri` | WorkforceIdentityBasedManagementURI | Output only. The hostnames of the exposed AGM endpoints for both types of user i.e. 1p and 3p, used to connect AGM/RM UI. |
| `workforceIdentityBasedOauth2ClientId` | WorkforceIdentityBasedOAuth2ClientID | Output only. The OAuth client IDs for both types of user i.e. 1p and 3p. |

### Shape of `AbandonBackupRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "requestId": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `backupdr` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://backupdr.googleapis.com/$discovery/rest?version=v1, https://backupdr.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
