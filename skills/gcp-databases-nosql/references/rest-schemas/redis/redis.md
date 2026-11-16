---
source: https://redis.googleapis.com/$discovery/rest?version=v1
---

# Google Cloud Memorystore for Redis API message schemas (redis)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/redis/`.

### `AOFConfig`

- Configuration of the AOF based persistence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appendFsync` | string enum | Optional. fsync configuration. Values: `APPEND_FSYNC_UNSPECIFIED`, `NO`, `EVERYSEC`, `ALWAYS`. |

### `AclPolicy`

- The ACL policy resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterAclPolicyAttachments` | array<ClusterAclPolicyAttachment> | Output only. The ACL policy attachment status for each attached cluster. |
| `createTime` | string (google-datetime) | Output only. The timestamp that the ACL policy was created. |
| `etag` | string | Output only. Etag for the ACL policy. |
| `name` | string | Identifier. Full resource path of the ACL policy. |
| `rules` | array<AclRule> | Required. The ACL rules within the ACL policy. |
| `state` | string enum | Output only. The state of the ACL policy. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `UPDATING`, `DELETING`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp that the ACL policy was last updated. |
| `version` | string (int64) | Output only. Deprecated: Used in drift resolution. |

### `AclPolicyInfo`

- Details of the applied ACL policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aclPolicyRevisionStatuses` | array<AclPolicyRevisionStatus> | Output only. A list of status for various revisions of this ACL policy on the cluster. |
| `appliedAclPolicy` | string | Output only. The resource name of the applied ACL policy. Format: "projects/{project}/locations/{location}/aclPolicies/{acl_policy}" |
| `appliedAclPolicyRevision` | string | Output only. The resource name of the applied ACL policy revision. Format: "projects/{project}/locations/{location}/aclPolicies/{acl_policy}/revisions/{revision}" |
| `appliedAclPolicyRevisionNumber` | string (int64) | Output only. The revision number of the applied ACL policy revision. |

### `AclPolicyRevision`

- The ACL policy revision resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachedClusters` | array<string> | Output only. A list of clusters that are attached to this ACL policy revision. |
| `createTime` | string (google-datetime) | Output only. The timestamp that the revision was created. |
| `name` | string | Identifier. The name of the ACL policy revision. Format: "projects/{project}/locations/{location}/aclPolicies/{acl_policy}/revisions/{revision}" |
| `revisionNumber` | string (int64) | Output only. The revision number of the ACL policy revision. |
| `snapshot` | AclPolicy | Output only. The snapshot of the ACL policy at the time of revision creation. |

### `AclPolicyRevisionStatus`

- AclPolicyRevisionStatus stores the per-revision status for an attached cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aclPolicyRevision` | string | Output only. The resource name of the ACL policy revision this status refers to. Format: "projects/{project}/locations/{location}/aclPolicies/{acl_policy}/revisions/{revision}" |
| `aclPolicyRevisionNumber` | string (int64) | Output only. The revision number of the ACL policy revision this status refers to. |
| `errorMessage` | string | Output only. Human-readable error message providing more details for FAILED states. |
| `state` | string enum | Output only. AclPolicyRevision state. Values: `STATE_UNSPECIFIED`, `APPLYING`, `APPLIED`, `FAILED`. |

### `AclRule`

- A single ACL rule which defines the policy for a user.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rule` | string | Required. The rule to be applied to the username. Ex: "on >password123 ~\* +@all" The format of the rule is defined by Redis OSS: https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/ |
| `username` | string | Required. Specifies the IAM user or service account to be added to the ACL policy. This username will be directly set on the Redis OSS. |

### `AddAuthTokenRequest`

- Request message for AddAuthToken.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authToken` | AuthToken | Required. The auth token to add. |

### `AddTokenAuthUserRequest`

- Request message for AddTokenAuthUser.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tokenAuthUser` | string | Required. The id of the token auth user to add. |

### `AuthToken`

- Auth token for the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create time of the auth token. |
| `name` | string | Identifier. Name of the auth token. Format: projects/{project}/locations/{location}/clusters/{cluster}/tokenAuthUsers/{token_auth_user}/authTokens/{auth_token} |
| `state` | string enum | Output only. State of the auth token. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`. |
| `token` | string | Output only. The service generated authentication token used to connect to the Redis cluster. |

### `AutomatedBackupConfig`

- The automated backup config for a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automatedBackupMode` | string enum | Optional. The automated backup mode. If the mode is disabled, the other fields will be ignored. Values: `AUTOMATED_BACKUP_MODE_UNSPECIFIED`, `DISABLED`, `ENABLED`. |
| `fixedFrequencySchedule` | FixedFrequencySchedule | Optional. Trigger automated backups at a fixed frequency. |
| `retention` | string (google-duration) | Optional. How long to keep automated backups before the backups are deleted. The value should be between 1 day and 365 days. If not specified, the default value is 35 days. |

### `AvailabilityConfiguration`

- Configuration for availability of database instance
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automaticFailoverRoutingConfigured` | boolean | Checks for existence of (multi-cluster) routing configuration that allows automatic failover to a different zone/region in case of an outage. Applicable to Bigtable resources. |
| `availabilityType` | string enum | Availability type. Potential values: \* `ZONAL`: The instance serves data from only one zone. Outages in that zone affect data accessibility. \* `REGIONAL`: The instance can serve data from more than one zone in a region (it is highly available). Values: `AVAILABILITY_TYPE_UNSPECIFIED`, `ZONAL`, `REGIONAL`, `MULTI_REGIONAL`, `AVAILABILITY_TYPE_OTHER`. |
| `crossRegionReplicaConfigured` | boolean | Checks for resources that are configured to have redundancy, and ongoing replication across regions |
| `externalReplicaConfigured` | boolean | — |
| `promotableReplicaConfigured` | boolean | — |

### `Backup`

- Backup of a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupFiles` | array<BackupFile> | Output only. List of backup files of the backup. |
| `backupType` | string enum | Output only. Type of the backup. Values: `BACKUP_TYPE_UNSPECIFIED`, `ON_DEMAND`, `AUTOMATED`. |
| `cluster` | string | Output only. Cluster resource path of this backup. |
| `clusterUid` | string | Output only. Cluster uid of this backup. |
| `createTime` | string (google-datetime) | Output only. The time when the backup was created. |
| `encryptionInfo` | EncryptionInfo | Output only. Encryption information of the backup. |
| `engineVersion` | string | Output only. redis-7.2, valkey-7.5 |
| `expireTime` | string (google-datetime) | Output only. The time when the backup will expire. |
| `name` | string | Identifier. Full resource path of the backup. the last part of the name is the backup id with the following format: \[YYYYMMDDHHMMSS\]\_\[Shorted Cluster UID\] OR customer specified while backup cluster. Example: 20240515123000_1234 |
| `nodeType` | string enum | Output only. Node type of the cluster. Values: `NODE_TYPE_UNSPECIFIED`, `REDIS_SHARED_CORE_NANO`, `REDIS_HIGHMEM_MEDIUM`, `REDIS_HIGHMEM_XLARGE`, `REDIS_STANDARD_SMALL`, `REDIS_HIGHCPU_MEDIUM`, `REDIS_STANDARD_LARGE`, `REDIS_HIGHMEM_2XLARGE`. |
| `replicaCount` | integer (int32) | Output only. Number of replicas for the cluster. |
| `shardCount` | integer (int32) | Output only. Number of shards for the cluster. |
| `state` | string enum | Output only. State of the backup. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `SUSPENDED`. |
| `totalSizeBytes` | string (int64) | Output only. Total size of the backup in bytes. |
| `uid` | string | Output only. System assigned unique identifier of the backup. |

### `BackupClusterRequest`

- Request for `BackupCluster`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupId` | string | Optional. The id of the backup to be created. If not specified, the default value (\[YYYYMMDDHHMMSS\]\_\[Shortened Cluster UID\] is used. |
| `ttl` | string (google-duration) | Optional. TTL for the backup to expire. Value range is 1 day to 100 years. If not specified, the default value is 100 years. |

### `BackupCollection`

- BackupCollection of a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cluster` | string | Output only. The full resource path of the cluster the backup collection belongs to. Example: projects/{project}/locations/{location}/clusters/{cluster} |
| `clusterUid` | string | Output only. The cluster uid of the backup collection. |
| `createTime` | string (google-datetime) | Output only. The time when the backup collection was created. |
| `kmsKey` | string | Output only. The KMS key used to encrypt the backups under this backup collection. |
| `lastBackupTime` | string (google-datetime) | Output only. The last time a backup was created in the backup collection. |
| `name` | string | Identifier. Full resource path of the backup collection. |
| `totalBackupCount` | string (int64) | Output only. Total number of backups in the backup collection. |
| `totalBackupSizeBytes` | string (int64) | Output only. Total size of all backups in the backup collection. |
| `uid` | string | Output only. System assigned unique identifier of the backup collection. |

### `BackupConfiguration`

- Configuration for automatic backups
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automatedBackupEnabled` | boolean | Whether customer visible automated backups are enabled on the instance. |
| `backupRetentionSettings` | RetentionSettings | Backup retention settings. |
| `pointInTimeRecoveryEnabled` | boolean | Whether point-in-time recovery is enabled. This is optional field, if the database service does not have this feature or metadata is not available in control plane, this can be omitted. |

### `BackupDRConfiguration`

- BackupDRConfiguration to capture the backup and disaster recovery details of database resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupdrManaged` | boolean | Indicates if the resource is managed by BackupDR. |

### `BackupDRMetadata`

- BackupDRMetadata contains information about the backup and disaster recovery metadata of a database resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupConfiguration` | BackupConfiguration | Backup configuration for this instance. |
| `backupRun` | BackupRun | Latest backup run information for this instance. |
| `backupdrConfiguration` | BackupDRConfiguration | BackupDR configuration for this instance. |
| `fullResourceName` | string | Required. Full resource name of this instance. |
| `lastRefreshTime` | string (google-datetime) | Required. Last time backup configuration was refreshed. |
| `resourceId` | DatabaseResourceId | Required. Database resource id. |

### `BackupFile`

- Backup is consisted of multiple backup files.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the backup file was created. |
| `fileName` | string | Output only. e.g: .rdb |
| `sizeBytes` | string (int64) | Output only. Size of the backup file in bytes. |

### `BackupRun`

- A backup run.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The time the backup operation completed. REQUIRED |
| `error` | OperationError | Information about why the backup operation failed. This is only present if the run has the FAILED status. OPTIONAL |
| `startTime` | string (google-datetime) | The time the backup operation started. REQUIRED |
| `status` | string enum | The status of this run. REQUIRED Values: `STATUS_UNSPECIFIED`, `SUCCESSFUL`, `FAILED`. |

### `CertChain`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificates` | array<string> | The certificates that form the CA chain, from leaf to root order. |

### `CertificateAuthority`

- Redis cluster certificate authority
- Version: v1

| Field | Type | Description |
|---|---|---|
| `managedServerCa` | ManagedCertificateAuthority | — |
| `name` | string | Identifier. Unique name of the resource in this scope including project, location and cluster using the form: `projects/{project}/locations/{location}/clusters/{cluster}/certificateAuthority` |

### `Cluster`

- A cluster instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aclPolicy` | string | Optional. The ACL policy to be applied to the cluster. |
| `aclPolicyInSync` | boolean | Optional. Output only. Deprecated: Indicates whether the ACL rules applied to the cluster are in sync. |
| `aclPolicyInfo` | AclPolicyInfo | Output only. Details of the applied ACL policy. |
| `allowFewerZonesDeployment` | boolean | Optional. Immutable. Deprecated, do not use. |
| `asyncClusterEndpointsDeletionEnabled` | boolean | Optional. If true, cluster endpoints that are created and registered by customers can be deleted asynchronously. That is, such a cluster endpoint can be de-registered before the forwarding rules in the cluster endpoint are deleted. |
| `authorizationMode` | string enum | Optional. The authorization mode of the Redis cluster. If not provided, auth feature is disabled for the cluster. Values: `AUTH_MODE_UNSPECIFIED`, `AUTH_MODE_IAM_AUTH`, `AUTH_MODE_DISABLED`, `AUTH_MODE_TOKEN_AUTH`. |
| `automatedBackupConfig` | AutomatedBackupConfig | Optional. The automated backup config for the cluster. |
| `availableMaintenanceVersions` | array<string> | Output only. This field is used to determine the available maintenance versions for the self service update. |
| `backupCollection` | string | Optional. Output only. The backup collection full resource name. Example: projects/{project}/locations/{location}/backupCollections/{collection} |
| `clusterEndpoints` | array<ClusterEndpoint> | Optional. A list of cluster endpoints. |
| `createTime` | string (google-datetime) | Output only. The timestamp associated with the cluster creation request. |
| `crossClusterReplicationConfig` | CrossClusterReplicationConfig | Optional. Cross cluster replication config. |
| `deletionProtectionEnabled` | boolean | Optional. The delete operation will fail when the value is set to true. |
| `discoveryEndpoints` | array<DiscoveryEndpoint> | Output only. Endpoints created on each given network, for Redis clients to connect to the cluster. Currently only one discovery endpoint is supported. |
| `effectiveMaintenanceVersion` | string | Output only. This field represents the actual maintenance version of the cluster. |
| `encryptionInfo` | EncryptionInfo | Output only. Encryption information of the data at rest of the cluster. |
| `gcsSource` | GcsBackupSource | Optional. Backups stored in Cloud Storage buckets. The Cloud Storage buckets need to be the same region as the clusters. Read permission is required to import from the provided Cloud Storage objects. |
| `kmsKey` | string | Optional. The KMS key used to encrypt the at-rest data of the cluster. |
| `labels` | object | Optional. Labels to represent user-provided metadata. |
| `maintenancePolicy` | ClusterMaintenancePolicy | Optional. ClusterMaintenancePolicy determines when to allow or deny updates. |
| `maintenanceSchedule` | ClusterMaintenanceSchedule | Output only. ClusterMaintenanceSchedule Output only Published maintenance schedule. |
| `maintenanceVersion` | string | Optional. This field can be used to trigger self service update to indicate the desired maintenance version. The input to this field can be determined by the available_maintenance_versions field. |
| `managedBackupSource` | ManagedBackupSource | Optional. Backups generated and managed by memorystore service. |
| `name` | string | Required. Identifier. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/clusters/{cluster_id}` |
| `nodeType` | string enum | Optional. The type of a redis node in the cluster. NodeType determines the underlying machine-type of a redis node. Values: `NODE_TYPE_UNSPECIFIED`, `REDIS_SHARED_CORE_NANO`, `REDIS_HIGHMEM_MEDIUM`, `REDIS_HIGHMEM_XLARGE`, `REDIS_STANDARD_SMALL`, `REDIS_HIGHCPU_MEDIUM`, `REDIS_STANDARD_LARGE`, `REDIS_HIGHMEM_2XLARGE`. |
| `ondemandMaintenance` | boolean | Optional. Input only. Ondemand maintenance for the cluster. This field can be used to trigger ondemand critical update on the cluster. |
| `persistenceConfig` | ClusterPersistenceConfig | Optional. Persistence config (RDB, AOF) for the cluster. |
| `preciseSizeGb` | number (double) | Output only. Precise value of redis memory size in GB for the entire cluster. |
| `pscConfigs` | array<PscConfig> | Optional. Each PscConfig configures the consumer network where IPs will be designated to the cluster for client access through Private Service Connect Automation. Currently, only one PscConfig is supported. |
| `pscConnections` | array<PscConnection> | Output only. The list of PSC connections that are auto-created through service connectivity automation. |
| `pscServiceAttachments` | array<PscServiceAttachment> | Output only. Service attachment details to configure Psc connections |
| `redisConfigs` | object | Optional. Key/Value pairs of customer overrides for mutable Redis Configs |
| `replicaCount` | integer (int32) | Optional. The number of replica nodes per shard. |
| `rotateServerCertificate` | boolean | Optional. Input only. Rotate the server certificates. |
| `satisfiesPzi` | boolean | Optional. Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Optional. Output only. Reserved for future use. |
| `serverCaMode` | string enum | Optional. Server CA mode for the cluster. Values: `SERVER_CA_MODE_UNSPECIFIED`, `SERVER_CA_MODE_GOOGLE_MANAGED_PER_INSTANCE_CA`, `SERVER_CA_MODE_GOOGLE_MANAGED_SHARED_CA`, `SERVER_CA_MODE_CUSTOMER_MANAGED_CAS_CA`. |
| `serverCaPool` | string | Optional. Customer-managed CA pool for the cluster. Only applicable for BYOCA i.e. if server_ca_mode is SERVER_CA_MODE_CUSTOMER_MANAGED_CAS_CA. Format: "projects/{project}/locations/{region}/caPools/{ca_pool}". |
| `shardCount` | integer (int32) | Optional. Number of shards for the Redis cluster. |
| `simulateMaintenanceEvent` | boolean | Optional. Input only. Simulate a maintenance event. |
| `sizeGb` | integer (int32) | Output only. Redis memory size in GB for the entire cluster rounded up to the next integer. |
| `state` | string enum | Output only. The current state of this cluster. Can be CREATING, READY, UPDATING, DELETING and SUSPENDED Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `UPDATING`, `DELETING`. |
| `stateInfo` | StateInfo | Output only. Additional information about the current state of the cluster. |
| `transitEncryptionMode` | string enum | Optional. The in-transit encryption for the Redis cluster. If not provided, encryption is disabled for the cluster. Values: `TRANSIT_ENCRYPTION_MODE_UNSPECIFIED`, `TRANSIT_ENCRYPTION_MODE_DISABLED`, `TRANSIT_ENCRYPTION_MODE_SERVER_AUTHENTICATION`. |
| `uid` | string | Output only. System assigned, unique identifier for the cluster. |
| `zoneDistributionConfig` | ZoneDistributionConfig | Optional. This config will be used to determine how the customer wants us to distribute cluster resources within the region. |

### `ClusterAclPolicyAttachment`

- ClusterAclPolicyAttachment stores the ACL policy status for an attached cluster for the revisions successfully applied, under application or failed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aclPolicyRevisionStatuses` | array<AclPolicyRevisionStatus> | Output only. A list of status for various revisions of this ACL policy on the cluster. |
| `cluster` | string | Output only. The resource name of the attached Cluster. Format: "projects/{project}/locations/{location}/clusters/{cluster}" |

### `ClusterEndpoint`

- ClusterEndpoint consists of PSC connections that are created as a group in each VPC network for accessing the cluster. In each group, there shall be one connection for each service attachment in the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connections` | array<ConnectionDetail> | Required. A group of PSC connections. They are created in the same VPC network, one for each service attachment in the cluster. |

### `ClusterMaintenancePolicy`

- Maintenance policy per cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the policy was created i.e. Maintenance Window or Deny Period was assigned. |
| `updateTime` | string (google-datetime) | Output only. The time when the policy was updated i.e. Maintenance Window or Deny Period was updated. |
| `weeklyMaintenanceWindow` | array<ClusterWeeklyMaintenanceWindow> | Optional. Maintenance window that is applied to resources covered by this policy. Minimum 1. For the current version, the maximum number of weekly_maintenance_window is expected to be one. |

### `ClusterMaintenanceSchedule`

- Upcoming maintenance schedule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Output only. The end time of any upcoming scheduled maintenance for this instance. |
| `startTime` | string (google-datetime) | Output only. The start time of any upcoming scheduled maintenance for this instance. |

### `ClusterPersistenceConfig`

- Configuration of the persistence functionality.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aofConfig` | AOFConfig | Optional. AOF configuration. This field will be ignored if mode is not AOF. |
| `mode` | string enum | Optional. The mode of persistence. Values: `PERSISTENCE_MODE_UNSPECIFIED`, `DISABLED`, `RDB`, `AOF`. |
| `rdbConfig` | RDBConfig | Optional. RDB configuration. This field will be ignored if mode is not RDB. |

### `ClusterWeeklyMaintenanceWindow`

- Time window specified for weekly operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | string enum | Optional. The day of the week for the maintenance window. This field is required. You can't use `DAY_OF_WEEK_UNSPECIFIED`. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `startTime` | TimeOfDay | Optional. The start time of the maintenance window in UTC. When you specify a maintenance window, `start_time` is required. |

### `Compliance`

- Contains compliance information about a security standard indicating unmet recommendations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `standard` | string | Industry-wide compliance standards or benchmarks, such as CIS, PCI, and OWASP. |
| `version` | string | Version of the standard or benchmark, for example, 1.1 |

### `ConfigBasedSignalData`

- Config based signal data. This is used to send signals to Condor which are based on the DB level configurations. These will be used to send signals for self managed databases.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullResourceName` | string | Required. Full Resource name of the source resource. |
| `lastRefreshTime` | string (google-datetime) | Required. Last time signal was refreshed |
| `resourceId` | DatabaseResourceId | Database resource id. |
| `signalBoolValue` | boolean | Signal data for boolean signals. |
| `signalType` | string enum | Required. Signal type of the signal Values: `SIGNAL_TYPE_UNSPECIFIED`, `SIGNAL_TYPE_OUTDATED_MINOR_VERSION`, `SIGNAL_TYPE_DATABASE_AUDITING_DISABLED`, `SIGNAL_TYPE_NO_ROOT_PASSWORD`, `SIGNAL_TYPE_EXPOSED_TO_PUBLIC_ACCESS`, `SIGNAL_TYPE_UNENCRYPTED_CONNECTIONS`, `SIGNAL_TYPE_EXTENDED_SUPPORT`, `SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY`, `SIGNAL_TYPE_VERSION_NEARING_END_OF_LIFE`, `SIGNAL_TYPE_LAST_BACKUP_OLD`, `SIGNAL_TYPE_NOT_PROTECTED_BY_AUTOMATIC_FAILOVER`. |

### `ConnectionDetail`

- Detailed information of each PSC connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pscAutoConnection` | PscAutoConnection | Detailed information of a PSC connection that is created through service connectivity automation. |
| `pscConnection` | PscConnection | Detailed information of a PSC connection that is created by the customer who owns the cluster. |

### `CrossClusterReplicationConfig`

- Cross cluster replication config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterRole` | string enum | Output only. The role of the cluster in cross cluster replication. Values: `CLUSTER_ROLE_UNSPECIFIED`, `NONE`, `PRIMARY`, `SECONDARY`. |
| `membership` | Membership | Output only. An output only view of all the member clusters participating in the cross cluster replication. This view will be provided by every member cluster irrespective of its cluster role(primary or secondary). A primary cluster can provide information about all the secondary clusters replicating from it. However, a secondary cluster only knows about the primary cluster from which it is replicating. However, for scenarios, where the primary cluster is unavailable(e.g. regional outage), a GetCluster request can be sent to any other member cluster and this field will list all the member clusters participating in cross cluster replication. |
| `primaryCluster` | RemoteCluster | Details of the primary cluster that is used as the replication source for this secondary cluster. This field is only set for a secondary cluster. |
| `secondaryClusters` | array<RemoteCluster> | List of secondary clusters that are replicating from this primary cluster. This field is only set for a primary cluster. |
| `updateTime` | string (google-datetime) | Output only. The last time cross cluster replication config was updated. |

### `CustomMetadataData`

- Any custom metadata associated with the resource. e.g. A spanner instance can have multiple databases with its own unique metadata. Information for these individual databases can be captured in custom metadata data
- Version: v1

| Field | Type | Description |
|---|---|---|
| `internalResourceMetadata` | array<InternalResourceMetadata> | Metadata for individual internal resources in an instance. e.g. spanner instance can have multiple databases with unique configuration. |

### `DatabaseResourceFeed`

- DatabaseResourceFeed is the top level proto to be used to ingest different database resource level events into Condor platform. Next ID: 13
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupdrMetadata` | BackupDRMetadata | BackupDR metadata is used to ingest metadata from BackupDR. |
| `configBasedSignalData` | ConfigBasedSignalData | Config based signal data is used to ingest signals that are generated based on the configuration of the database resource. |
| `databaseResourceSignalData` | DatabaseResourceSignalData | Database resource signal data is used to ingest signals from database resource signal feeds. |
| `feedTimestamp` | string (google-datetime) | Required. Timestamp when feed is generated. |
| `feedType` | string enum | Required. Type feed to be ingested into condor Values: `FEEDTYPE_UNSPECIFIED`, `RESOURCE_METADATA`, `OBSERVABILITY_DATA`, `SECURITY_FINDING_DATA`, `RECOMMENDATION_SIGNAL_DATA`, `CONFIG_BASED_SIGNAL_DATA`, `BACKUPDR_METADATA`, `DATABASE_RESOURCE_SIGNAL_DATA`. |
| `observabilityMetricData` | ObservabilityMetricData | Observability metric data. |
| `recommendationSignalData` | DatabaseResourceRecommendationSignalData | Database resource recommendation signal data. |
| `resourceHealthSignalData` | DatabaseResourceHealthSignalData | Database resource health signal data. |
| `resourceId` | DatabaseResourceId | Primary key associated with the Resource. resource_id is available in individual feed level as well. |
| `resourceMetadata` | DatabaseResourceMetadata | Database resource metadata. |
| `skipIngestion` | boolean | Optional. If true, the feed won't be ingested by DB Center. This indicates that the feed is intentionally skipped. For example, BackupDR feeds are only needed for resources integrated with DB Center (e.g., CloudSQL, AlloyDB). Feeds for non-integrated resources (e.g., Compute Engine, Persistent Disk) can be skipped. |

### `DatabaseResourceHealthSignalData`

- Common model for database resource health signal data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalMetadata` | object | Any other additional metadata |
| `compliance` | array<Compliance> | Industry standards associated with this signal; if this signal is an issue, that could be a violation of the associated industry standard(s). For example, AUTO_BACKUP_DISABLED signal is associated with CIS GCP 1.1, CIS GCP 1.2, CIS GCP 1.3, NIST 800-53 and ISO-27001 compliance standards. If a database resource does not have automated backup enable, it will violate these following industry standards. |
| `description` | string | Description associated with signal |
| `eventTime` | string (google-datetime) | Required. The last time at which the event described by this signal took place |
| `externalUri` | string | The external-uri of the signal, using which more information about this signal can be obtained. In GCP, this will take user to SCC page to get more details about signals. |
| `location` | string | This is used to identify the location of the resource. Example: "us-central1" |
| `name` | string | Required. The name of the signal, ex: PUBLIC_SQL_INSTANCE, SQL_LOG_ERROR_VERBOSITY etc. |
| `provider` | string enum | Cloud provider name. Ex: GCP/AWS/Azure/OnPrem/SelfManaged Values: `PROVIDER_UNSPECIFIED`, `GCP`, `AWS`, `AZURE`, `ONPREM`, `SELFMANAGED`, `PROVIDER_OTHER`. |
| `resourceContainer` | string | Closest parent container of this resource. In GCP, 'container' refers to a Cloud Resource Manager project. It must be resource name of a Cloud Resource Manager project with the format of "provider//", such as "projects/123". For GCP provided resources, number should be project number. |
| `resourceName` | string | Required. Database resource name associated with the signal. Resource name to follow CAIS resource_name format as noted here (internal link) |
| `signalClass` | string enum | Required. The class of the signal, such as if it's a THREAT or VULNERABILITY. Values: `CLASS_UNSPECIFIED`, `THREAT`, `VULNERABILITY`, `MISCONFIGURATION`, `OBSERVATION`, `ERROR`. |
| `signalId` | string | Required. Unique identifier for the signal. This is an unique id which would be mainatined by partner to identify a signal. |
| `signalSeverity` | string enum | The severity of the signal, such as if it's a HIGH or LOW severity. Values: `SIGNAL_SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |
| `signalType` | string enum | Required. Type of signal, for example, `AVAILABLE_IN_MULTIPLE_ZONES`, `LOGGING_MOST_ERRORS`, etc. Values: `SIGNAL_TYPE_UNSPECIFIED`, `SIGNAL_TYPE_NOT_PROTECTED_BY_AUTOMATIC_FAILOVER`, `SIGNAL_TYPE_GROUP_NOT_REPLICATING_ACROSS_REGIONS`, `SIGNAL_TYPE_NOT_AVAILABLE_IN_MULTIPLE_ZONES`, `SIGNAL_TYPE_NOT_AVAILABLE_IN_MULTIPLE_REGIONS`, `SIGNAL_TYPE_NO_PROMOTABLE_REPLICA`, `SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY`, `SIGNAL_TYPE_SHORT_BACKUP_RETENTION`, `SIGNAL_TYPE_LAST_BACKUP_FAILED`, `SIGNAL_TYPE_LAST_BACKUP_OLD`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_2_0`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_3`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_2`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_1`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_0`, `SIGNAL_TYPE_VIOLATES_CIS_CONTROLS_V8_0`, `SIGNAL_TYPE_VIOLATES_NIST_800_53`, `SIGNAL_TYPE_VIOLATES_NIST_800_53_R5`, `SIGNAL_TYPE_VIOLATES_NIST_CYBERSECURITY_FRAMEWORK_V1_0`, `SIGNAL_TYPE_VIOLATES_ISO_27001`, `SIGNAL_TYPE_VIOLATES_ISO_27001_V2022`, `SIGNAL_TYPE_VIOLATES_PCI_DSS_V3_2_1`, `SIGNAL_TYPE_VIOLATES_PCI_DSS_V4_0`, `SIGNAL_TYPE_VIOLATES_CLOUD_CONTROLS_MATRIX_V4`, `SIGNAL_TYPE_VIOLATES_HIPAA`, `SIGNAL_TYPE_VIOLATES_SOC2_V2017`, `SIGNAL_TYPE_LOGS_NOT_OPTIMIZED_FOR_TROUBLESHOOTING`, `SIGNAL_TYPE_QUERY_DURATIONS_NOT_LOGGED`, `SIGNAL_TYPE_VERBOSE_ERROR_LOGGING`, `SIGNAL_TYPE_QUERY_LOCK_WAITS_NOT_LOGGED`, `SIGNAL_TYPE_LOGGING_MOST_ERRORS`, `SIGNAL_TYPE_LOGGING_ONLY_CRITICAL_ERRORS`, `SIGNAL_TYPE_MINIMAL_ERROR_LOGGING`, `SIGNAL_TYPE_QUERY_STATISTICS_LOGGED`, `SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_CLIENT_HOSTNAME`, `SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_PARSER_STATISTICS`, `SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_PLANNER_STATISTICS`, `SIGNAL_TYPE_NOT_LOGGING_ONLY_DDL_STATEMENTS`, `SIGNAL_TYPE_LOGGING_QUERY_STATISTICS`, `SIGNAL_TYPE_NOT_LOGGING_TEMPORARY_FILES`, `SIGNAL_TYPE_CONNECTION_MAX_NOT_CONFIGURED`, `SIGNAL_TYPE_USER_OPTIONS_CONFIGURED`, `SIGNAL_TYPE_EXPOSED_TO_PUBLIC_ACCESS`, `SIGNAL_TYPE_UNENCRYPTED_CONNECTIONS`, `SIGNAL_TYPE_NO_ROOT_PASSWORD`, `SIGNAL_TYPE_WEAK_ROOT_PASSWORD`, `SIGNAL_TYPE_ENCRYPTION_KEY_NOT_CUSTOMER_MANAGED`, `SIGNAL_TYPE_SERVER_AUTHENTICATION_NOT_REQUIRED`, `SIGNAL_TYPE_EXPOSED_BY_OWNERSHIP_CHAINING`, `SIGNAL_TYPE_EXPOSED_TO_EXTERNAL_SCRIPTS`, `SIGNAL_TYPE_EXPOSED_TO_LOCAL_DATA_LOADS`, `SIGNAL_TYPE_CONNECTION_ATTEMPTS_NOT_LOGGED`, `SIGNAL_TYPE_DISCONNECTIONS_NOT_LOGGED`, `SIGNAL_TYPE_LOGGING_EXCESSIVE_STATEMENT_INFO`, `SIGNAL_TYPE_EXPOSED_TO_REMOTE_ACCESS`, `SIGNAL_TYPE_DATABASE_NAMES_EXPOSED`, `SIGNAL_TYPE_SENSITIVE_TRACE_INFO_NOT_MASKED`, `SIGNAL_TYPE_PUBLIC_IP_ENABLED`, `SIGNAL_TYPE_IDLE`, `SIGNAL_TYPE_OVERPROVISIONED`, `SIGNAL_TYPE_HIGH_NUMBER_OF_OPEN_TABLES`, `SIGNAL_TYPE_HIGH_NUMBER_OF_TABLES`, `SIGNAL_TYPE_HIGH_TRANSACTION_ID_UTILIZATION`, `SIGNAL_TYPE_UNDERPROVISIONED`, `SIGNAL_TYPE_OUT_OF_DISK`, `SIGNAL_TYPE_SERVER_CERTIFICATE_NEAR_EXPIRY`, `SIGNAL_TYPE_DATABASE_AUDITING_DISABLED`, `SIGNAL_TYPE_RESTRICT_AUTHORIZED_NETWORKS`, `SIGNAL_TYPE_VIOLATE_POLICY_RESTRICT_PUBLIC_IP`, `SIGNAL_TYPE_QUOTA_LIMIT`, `SIGNAL_TYPE_NO_PASSWORD_POLICY`, `SIGNAL_TYPE_CONNECTIONS_PERFORMANCE_IMPACT`, `SIGNAL_TYPE_TMP_TABLES_PERFORMANCE_IMPACT`, `SIGNAL_TYPE_TRANS_LOGS_PERFORMANCE_IMPACT`, `SIGNAL_TYPE_HIGH_JOINS_WITHOUT_INDEXES`, `SIGNAL_TYPE_SUPERUSER_WRITING_TO_USER_TABLES`, `SIGNAL_TYPE_USER_GRANTED_ALL_PERMISSIONS`, `SIGNAL_TYPE_DATA_EXPORT_TO_EXTERNAL_CLOUD_STORAGE_BUCKET`, `SIGNAL_TYPE_DATA_EXPORT_TO_PUBLIC_CLOUD_STORAGE_BUCKET`, `SIGNAL_TYPE_WEAK_PASSWORD_HASH_ALGORITHM`, `SIGNAL_TYPE_NO_USER_PASSWORD_POLICY`, `SIGNAL_TYPE_HOT_NODE`, `SIGNAL_TYPE_NO_POINT_IN_TIME_RECOVERY`, `SIGNAL_TYPE_RESOURCE_SUSPENDED`, `SIGNAL_TYPE_EXPENSIVE_COMMANDS`, `SIGNAL_TYPE_NO_MAINTENANCE_POLICY_CONFIGURED`, `SIGNAL_TYPE_NO_DELETION_PROTECTION`, `SIGNAL_TYPE_INEFFICIENT_QUERY`, `SIGNAL_TYPE_READ_INTENSIVE_WORKLOAD`, `SIGNAL_TYPE_MEMORY_LIMIT`, `SIGNAL_TYPE_MAX_SERVER_MEMORY`, `SIGNAL_TYPE_LARGE_ROWS`, `SIGNAL_TYPE_HIGH_WRITE_PRESSURE`, `SIGNAL_TYPE_HIGH_READ_PRESSURE`, `SIGNAL_TYPE_ENCRYPTION_ORG_POLICY_NOT_SATISFIED`, `SIGNAL_TYPE_LOCATION_ORG_POLICY_NOT_SATISFIED`, `SIGNAL_TYPE_OUTDATED_MINOR_VERSION`, `SIGNAL_TYPE_SCHEMA_NOT_OPTIMIZED`, `SIGNAL_TYPE_MANY_IDLE_CONNECTIONS`, `SIGNAL_TYPE_REPLICATION_LAG`, `SIGNAL_TYPE_OUTDATED_VERSION`, `SIGNAL_TYPE_OUTDATED_CLIENT`, `SIGNAL_TYPE_DATABOOST_DISABLED`, `SIGNAL_TYPE_RECOMMENDED_MAINTENANCE_POLICIES`, `SIGNAL_TYPE_EXTENDED_SUPPORT`, `SIGNAL_TYPE_PERFORMANCE_KPI_CHANGE`, `SIGNAL_TYPE_VERSION_NEARING_END_OF_LIFE`, `SIGNAL_TYPE_HIGH_MAINTENANCE_DOWNTIME_RISK`, `SIGNAL_TYPE_LOW_CACHE_HIT_AND_MAINTENANCE_DOWNTIME`, `SIGNAL_TYPE_MISSING_ENHANCED_PROTECTION`. |
| `state` | string enum | Required. The state of the signal, such as if it's ACTIVE or RESOLVED. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `RESOLVED`, `MUTED`. |

### `DatabaseResourceId`

- DatabaseResourceId will serve as primary key for any resource ingestion event.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `provider` | string enum | Required. Cloud provider name. Ex: GCP/AWS/Azure/OnPrem/SelfManaged Values: `PROVIDER_UNSPECIFIED`, `GCP`, `AWS`, `AZURE`, `ONPREM`, `SELFMANAGED`, `PROVIDER_OTHER`. |
| `providerDescription` | string | Optional. Needs to be used only when the provider is PROVIDER_OTHER. |
| `resourceType` | string | Required. The type of resource this ID is identifying. Ex (internal link) start alloydb.googleapis.com/Cluster, alloydb.googleapis.com/Instance, bigtableadmin.googleapis.com/Cluster, bigtableadmin.googleapis.com/Instance compute.googleapis.com/Instance firestore.googleapis.com/Database, memorystore.googleapis.com/Instance, redis.googleapis.com/Instance, redis.googleapis.com/Cluster, oracledatabase.googleapis.com/CloudExadataInfrastructure oracledatabase.googleapis.com/CloudVmCluster oracledatabase.googleapis.com/AutonomousDatabase spanner.googleapis.com/Instance, spanner.googleapis.com/Database, sqladmin.googleapis.com/Instance, (internal link) end REQUIRED Please refer (internal link) |
| `uniqueId` | string | Required. A service-local token that distinguishes this resource from other resources within the same service. |

### `DatabaseResourceMetadata`

- Common model for database resource instance metadata. Next ID: 35
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalMetadata` | object | Field to ingest additional metadata whichd does not support proto format. |
| `availabilityConfiguration` | AvailabilityConfiguration | Availability configuration for this instance |
| `backupConfiguration` | BackupConfiguration | Backup configuration for this instance |
| `backupRun` | BackupRun | Latest backup run information for this instance |
| `backupdrConfiguration` | BackupDRConfiguration | Optional. BackupDR Configuration for the resource. |
| `creationTime` | string (google-datetime) | The creation time of the resource, i.e. the time when resource is created and recorded in partner service. |
| `currentState` | string enum | Current state of the instance. Values: `STATE_UNSPECIFIED`, `HEALTHY`, `UNHEALTHY`, `SUSPENDED`, `DELETED`, `STATE_OTHER`, `STOPPED`. |
| `customMetadata` | CustomMetadataData | Any custom metadata associated with the resource |
| `edition` | string enum | Optional. Edition represents whether the instance is ENTERPRISE or ENTERPRISE_PLUS. This information is core to Cloud SQL only and is used to identify the edition of the instance. Values: `EDITION_UNSPECIFIED`, `EDITION_ENTERPRISE`, `EDITION_ENTERPRISE_PLUS`, `EDITION_STANDARD`. |
| `entitlements` | array<Entitlement> | Entitlements associated with the resource |
| `expectedState` | string enum | The state that the instance is expected to be in. For example, an instance state can transition to UNHEALTHY due to wrong patch update, while the expected state will remain at the HEALTHY. Values: `STATE_UNSPECIFIED`, `HEALTHY`, `UNHEALTHY`, `SUSPENDED`, `DELETED`, `STATE_OTHER`, `STOPPED`. |
| `gcbdrConfiguration` | GCBDRConfiguration | GCBDR configuration for the resource. |
| `id` | DatabaseResourceId | Required. Unique identifier for a Database resource |
| `instanceType` | string enum | The type of the instance. Specified at creation time. Values: `INSTANCE_TYPE_UNSPECIFIED`, `SUB_RESOURCE_TYPE_UNSPECIFIED`, `PRIMARY`, `SECONDARY`, `READ_REPLICA`, `OTHER`, `SUB_RESOURCE_TYPE_PRIMARY`, `SUB_RESOURCE_TYPE_SECONDARY`, `SUB_RESOURCE_TYPE_READ_REPLICA`, `SUB_RESOURCE_TYPE_EXTERNAL_PRIMARY`, `SUB_RESOURCE_TYPE_READ_POOL`, `SUB_RESOURCE_TYPE_RESERVATION`, `SUB_RESOURCE_TYPE_DATASET`, `SUB_RESOURCE_TYPE_OTHER`. |
| `internalAdditionalMetadata` | object | Field to ingest additional metadata which support proto format. |
| `ipAddress` | IpAddress | Optional. Private and public IP address of the resource. |
| `isDeletionProtectionEnabled` | boolean | Optional. Whether deletion protection is enabled for this resource. |
| `location` | string | The resource location. REQUIRED |
| `machineConfiguration` | MachineConfiguration | Machine configuration for this resource. |
| `maintenanceInfo` | ResourceMaintenanceInfo | Optional. Maintenance info for the resource. |
| `modes` | array<string> | Optional. The modes of the database resource. Values: `MODE_UNSPECIFIED`, `MODE_NATIVE`, `MODE_MONGODB_COMPATIBLE`, `MODE_DATASTORE`, `MODE_CLUSTER_ENABLED`, `MODE_CLUSTER_DISABLED`. |
| `primaryResourceId` | DatabaseResourceId | Identifier for this resource's immediate parent/primary resource if the current resource is a replica or derived form of another Database resource. Else it would be NULL. REQUIRED if the immediate parent exists when first time resource is getting ingested, otherwise optional. |
| `primaryResourceLocation` | string | Primary resource location. REQUIRED if the immediate parent exists when first time resource is getting ingested, otherwise optional. |
| `product` | Product | The product this resource represents. |
| `resourceContainer` | string | Closest parent Cloud Resource Manager container of this resource. It must be resource name of a Cloud Resource Manager project with the format of "/", such as "projects/123". For GCP provided resources, number should be project number. |
| `resourceFlags` | array<ResourceFlags> | Optional. List of resource flags for the database resource. |
| `resourceName` | string | Required. Different from DatabaseResourceId.unique_id, a resource name can be reused over time. That is, after a resource named "ABC" is deleted, the name "ABC" can be used to to create a new resource within the same source. Resource name to follow CAIS resource_name format as noted here (internal link) |
| `suspensionReason` | string enum | Optional. Suspension reason for the resource. Values: `SUSPENSION_REASON_UNSPECIFIED`, `WIPEOUT_HIDE_EVENT`, `WIPEOUT_PURGE_EVENT`, `BILLING_DISABLED`, `ABUSER_DETECTED`, `ENCRYPTION_KEY_INACCESSIBLE`, `REPLICATED_CLUSTER_ENCRYPTION_KEY_INACCESSIBLE`. |
| `tagsSet` | Tags | Optional. Tags associated with this resources. |
| `updationTime` | string (google-datetime) | The time at which the resource was updated and recorded at partner service. |
| `userLabelSet` | UserLabels | User-provided labels associated with the resource |
| `zone` | string | The resource zone. This is only applicable for zonal resources and will be empty for regional and multi-regional resources. |

### `DatabaseResourceRecommendationSignalData`

- Common model for database resource recommendation signal data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalMetadata` | object | Optional. Any other additional metadata specific to recommendation |
| `lastRefreshTime` | string (google-datetime) | Required. last time recommendationw as refreshed |
| `recommendationState` | string enum | Required. Recommendation state Values: `UNSPECIFIED`, `ACTIVE`, `CLAIMED`, `SUCCEEDED`, `FAILED`, `DISMISSED`. |
| `recommender` | string | Required. Name of recommendation. Examples: organizations/1234/locations/us-central1/recommenders/google.cloudsql.instance.PerformanceRecommender/recommendations/9876 |
| `recommenderId` | string | Required. ID of recommender. Examples: "google.cloudsql.instance.PerformanceRecommender" |
| `recommenderSubtype` | string | Required. Contains an identifier for a subtype of recommendations produced for the same recommender. Subtype is a function of content and impact, meaning a new subtype might be added when significant changes to `content` or `primary_impact.category` are introduced. See the Recommenders section to see a list of subtypes for a given Recommender. Examples: For recommender = "google.cloudsql.instance.PerformanceRecommender", recommender_subtype can be "MYSQL_HIGH_NUMBER_OF_OPEN_TABLES_BEST_PRACTICE"/"POSTGRES_HIGH_TRANSACTION_ID_UTILIZATION_BEST_PRACTICE" |
| `resourceName` | string | Required. Database resource name associated with the signal. Resource name to follow CAIS resource_name format as noted here (internal link) |
| `signalType` | string enum | Required. Type of signal, for example, `SIGNAL_TYPE_IDLE`, `SIGNAL_TYPE_HIGH_NUMBER_OF_TABLES`, etc. Values: `SIGNAL_TYPE_UNSPECIFIED`, `SIGNAL_TYPE_NOT_PROTECTED_BY_AUTOMATIC_FAILOVER`, `SIGNAL_TYPE_GROUP_NOT_REPLICATING_ACROSS_REGIONS`, `SIGNAL_TYPE_NOT_AVAILABLE_IN_MULTIPLE_ZONES`, `SIGNAL_TYPE_NOT_AVAILABLE_IN_MULTIPLE_REGIONS`, `SIGNAL_TYPE_NO_PROMOTABLE_REPLICA`, `SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY`, `SIGNAL_TYPE_SHORT_BACKUP_RETENTION`, `SIGNAL_TYPE_LAST_BACKUP_FAILED`, `SIGNAL_TYPE_LAST_BACKUP_OLD`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_2_0`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_3`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_2`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_1`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_0`, `SIGNAL_TYPE_VIOLATES_CIS_CONTROLS_V8_0`, `SIGNAL_TYPE_VIOLATES_NIST_800_53`, `SIGNAL_TYPE_VIOLATES_NIST_800_53_R5`, `SIGNAL_TYPE_VIOLATES_NIST_CYBERSECURITY_FRAMEWORK_V1_0`, `SIGNAL_TYPE_VIOLATES_ISO_27001`, `SIGNAL_TYPE_VIOLATES_ISO_27001_V2022`, `SIGNAL_TYPE_VIOLATES_PCI_DSS_V3_2_1`, `SIGNAL_TYPE_VIOLATES_PCI_DSS_V4_0`, `SIGNAL_TYPE_VIOLATES_CLOUD_CONTROLS_MATRIX_V4`, `SIGNAL_TYPE_VIOLATES_HIPAA`, `SIGNAL_TYPE_VIOLATES_SOC2_V2017`, `SIGNAL_TYPE_LOGS_NOT_OPTIMIZED_FOR_TROUBLESHOOTING`, `SIGNAL_TYPE_QUERY_DURATIONS_NOT_LOGGED`, `SIGNAL_TYPE_VERBOSE_ERROR_LOGGING`, `SIGNAL_TYPE_QUERY_LOCK_WAITS_NOT_LOGGED`, `SIGNAL_TYPE_LOGGING_MOST_ERRORS`, `SIGNAL_TYPE_LOGGING_ONLY_CRITICAL_ERRORS`, `SIGNAL_TYPE_MINIMAL_ERROR_LOGGING`, `SIGNAL_TYPE_QUERY_STATISTICS_LOGGED`, `SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_CLIENT_HOSTNAME`, `SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_PARSER_STATISTICS`, `SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_PLANNER_STATISTICS`, `SIGNAL_TYPE_NOT_LOGGING_ONLY_DDL_STATEMENTS`, `SIGNAL_TYPE_LOGGING_QUERY_STATISTICS`, `SIGNAL_TYPE_NOT_LOGGING_TEMPORARY_FILES`, `SIGNAL_TYPE_CONNECTION_MAX_NOT_CONFIGURED`, `SIGNAL_TYPE_USER_OPTIONS_CONFIGURED`, `SIGNAL_TYPE_EXPOSED_TO_PUBLIC_ACCESS`, `SIGNAL_TYPE_UNENCRYPTED_CONNECTIONS`, `SIGNAL_TYPE_NO_ROOT_PASSWORD`, `SIGNAL_TYPE_WEAK_ROOT_PASSWORD`, `SIGNAL_TYPE_ENCRYPTION_KEY_NOT_CUSTOMER_MANAGED`, `SIGNAL_TYPE_SERVER_AUTHENTICATION_NOT_REQUIRED`, `SIGNAL_TYPE_EXPOSED_BY_OWNERSHIP_CHAINING`, `SIGNAL_TYPE_EXPOSED_TO_EXTERNAL_SCRIPTS`, `SIGNAL_TYPE_EXPOSED_TO_LOCAL_DATA_LOADS`, `SIGNAL_TYPE_CONNECTION_ATTEMPTS_NOT_LOGGED`, `SIGNAL_TYPE_DISCONNECTIONS_NOT_LOGGED`, `SIGNAL_TYPE_LOGGING_EXCESSIVE_STATEMENT_INFO`, `SIGNAL_TYPE_EXPOSED_TO_REMOTE_ACCESS`, `SIGNAL_TYPE_DATABASE_NAMES_EXPOSED`, `SIGNAL_TYPE_SENSITIVE_TRACE_INFO_NOT_MASKED`, `SIGNAL_TYPE_PUBLIC_IP_ENABLED`, `SIGNAL_TYPE_IDLE`, `SIGNAL_TYPE_OVERPROVISIONED`, `SIGNAL_TYPE_HIGH_NUMBER_OF_OPEN_TABLES`, `SIGNAL_TYPE_HIGH_NUMBER_OF_TABLES`, `SIGNAL_TYPE_HIGH_TRANSACTION_ID_UTILIZATION`, `SIGNAL_TYPE_UNDERPROVISIONED`, `SIGNAL_TYPE_OUT_OF_DISK`, `SIGNAL_TYPE_SERVER_CERTIFICATE_NEAR_EXPIRY`, `SIGNAL_TYPE_DATABASE_AUDITING_DISABLED`, `SIGNAL_TYPE_RESTRICT_AUTHORIZED_NETWORKS`, `SIGNAL_TYPE_VIOLATE_POLICY_RESTRICT_PUBLIC_IP`, `SIGNAL_TYPE_QUOTA_LIMIT`, `SIGNAL_TYPE_NO_PASSWORD_POLICY`, `SIGNAL_TYPE_CONNECTIONS_PERFORMANCE_IMPACT`, `SIGNAL_TYPE_TMP_TABLES_PERFORMANCE_IMPACT`, `SIGNAL_TYPE_TRANS_LOGS_PERFORMANCE_IMPACT`, `SIGNAL_TYPE_HIGH_JOINS_WITHOUT_INDEXES`, `SIGNAL_TYPE_SUPERUSER_WRITING_TO_USER_TABLES`, `SIGNAL_TYPE_USER_GRANTED_ALL_PERMISSIONS`, `SIGNAL_TYPE_DATA_EXPORT_TO_EXTERNAL_CLOUD_STORAGE_BUCKET`, `SIGNAL_TYPE_DATA_EXPORT_TO_PUBLIC_CLOUD_STORAGE_BUCKET`, `SIGNAL_TYPE_WEAK_PASSWORD_HASH_ALGORITHM`, `SIGNAL_TYPE_NO_USER_PASSWORD_POLICY`, `SIGNAL_TYPE_HOT_NODE`, `SIGNAL_TYPE_NO_POINT_IN_TIME_RECOVERY`, `SIGNAL_TYPE_RESOURCE_SUSPENDED`, `SIGNAL_TYPE_EXPENSIVE_COMMANDS`, `SIGNAL_TYPE_NO_MAINTENANCE_POLICY_CONFIGURED`, `SIGNAL_TYPE_NO_DELETION_PROTECTION`, `SIGNAL_TYPE_INEFFICIENT_QUERY`, `SIGNAL_TYPE_READ_INTENSIVE_WORKLOAD`, `SIGNAL_TYPE_MEMORY_LIMIT`, `SIGNAL_TYPE_MAX_SERVER_MEMORY`, `SIGNAL_TYPE_LARGE_ROWS`, `SIGNAL_TYPE_HIGH_WRITE_PRESSURE`, `SIGNAL_TYPE_HIGH_READ_PRESSURE`, `SIGNAL_TYPE_ENCRYPTION_ORG_POLICY_NOT_SATISFIED`, `SIGNAL_TYPE_LOCATION_ORG_POLICY_NOT_SATISFIED`, `SIGNAL_TYPE_OUTDATED_MINOR_VERSION`, `SIGNAL_TYPE_SCHEMA_NOT_OPTIMIZED`, `SIGNAL_TYPE_MANY_IDLE_CONNECTIONS`, `SIGNAL_TYPE_REPLICATION_LAG`, `SIGNAL_TYPE_OUTDATED_VERSION`, `SIGNAL_TYPE_OUTDATED_CLIENT`, `SIGNAL_TYPE_DATABOOST_DISABLED`, `SIGNAL_TYPE_RECOMMENDED_MAINTENANCE_POLICIES`, `SIGNAL_TYPE_EXTENDED_SUPPORT`, `SIGNAL_TYPE_PERFORMANCE_KPI_CHANGE`, `SIGNAL_TYPE_VERSION_NEARING_END_OF_LIFE`, `SIGNAL_TYPE_HIGH_MAINTENANCE_DOWNTIME_RISK`, `SIGNAL_TYPE_LOW_CACHE_HIT_AND_MAINTENANCE_DOWNTIME`, `SIGNAL_TYPE_MISSING_ENHANCED_PROTECTION`. |

### `DatabaseResourceSignalData`

- Database resource signal data. This is used to send signals to Condor which are based on the DB/Instance/Fleet level configurations. These will be used to send signals for all inventory types. Next ID: 10
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupRun` | BackupRun | Deprecated: Use signal_metadata_list instead. |
| `fullResourceName` | string | Required. Full Resource name of the source resource. |
| `lastRefreshTime` | string (google-datetime) | Required. Last time signal was refreshed |
| `location` | string | Required. Resource location. |
| `resourceId` | DatabaseResourceId | Database resource id. |
| `signalBoolValue` | boolean | Deprecated: Use signal_metadata_list instead. |
| `signalMetadataList` | array<SignalMetadata> | This will support array of OneOf signal metadata information for a given signal type. |
| `signalState` | string enum | Required. Output only. Signal state of the signal Values: `SIGNAL_STATE_UNSPECIFIED`, `ACTIVE`, `INACTIVE`, `DISMISSED`. |
| `signalType` | string enum | Required. Signal type of the signal Values: `SIGNAL_TYPE_UNSPECIFIED`, `SIGNAL_TYPE_OUTDATED_MINOR_VERSION`, `SIGNAL_TYPE_DATABASE_AUDITING_DISABLED`, `SIGNAL_TYPE_NO_ROOT_PASSWORD`, `SIGNAL_TYPE_EXPOSED_TO_PUBLIC_ACCESS`, `SIGNAL_TYPE_UNENCRYPTED_CONNECTIONS`, `SIGNAL_TYPE_EXTENDED_SUPPORT`, `SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY`, `SIGNAL_TYPE_VERSION_NEARING_END_OF_LIFE`, `SIGNAL_TYPE_LAST_BACKUP_OLD`, `SIGNAL_TYPE_NOT_PROTECTED_BY_AUTOMATIC_FAILOVER`. |

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `DiscoveryEndpoint`

- Endpoints on each network, for Redis clients to connect to the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | Output only. Address of the exposed Redis endpoint used by clients to connect to the service. The address could be either IP or hostname. |
| `port` | integer (int32) | Output only. The port number of the exposed Redis endpoint. |
| `pscConfig` | PscConfig | Output only. Customer configuration for where the endpoint is created and accessed from. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EncryptionInfo`

- EncryptionInfo describes the encryption information of a cluster or a backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptionType` | string enum | Output only. Type of encryption. Values: `TYPE_UNSPECIFIED`, `GOOGLE_DEFAULT_ENCRYPTION`, `CUSTOMER_MANAGED_ENCRYPTION`. |
| `kmsKeyPrimaryState` | string enum | Output only. The state of the primary version of the KMS key perceived by the system. This field is not populated in backups. Values: `KMS_KEY_STATE_UNSPECIFIED`, `ENABLED`, `PERMISSION_DENIED`, `DISABLED`, `DESTROYED`, `DESTROY_SCHEDULED`, `EKM_KEY_UNREACHABLE_DETECTED`, `BILLING_DISABLED`, `UNKNOWN_FAILURE`. |
| `kmsKeyVersions` | array<string> | Output only. KMS key versions that are being used to protect the data at-rest. |
| `lastUpdateTime` | string (google-datetime) | Output only. The most recent time when the encryption info was updated. |

### `Entitlement`

- Proto representing the access that a user has to a specific feature/service. NextId: 3.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlementState` | string enum | The current state of user's accessibility to a feature/benefit. Values: `ENTITLEMENT_STATE_UNSPECIFIED`, `ENTITLED`, `REVOKED`. |
| `type` | string enum | An enum that represents the type of this entitlement. Values: `ENTITLEMENT_TYPE_UNSPECIFIED`, `GEMINI`, `NATIVE`, `GCA_STANDARD`. |

### `ExportBackupRequest`

- Request for `ExportBackup`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcsBucket` | string | Google Cloud Storage bucket, like "my-bucket". |

### `ExportInstanceRequest`

- Request for Export.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `outputConfig` | OutputConfig | Required. Specify data to be exported. |

### `FailoverInstanceRequest`

- Request for Failover.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataProtectionMode` | string enum | Optional. Available data protection modes that the user can choose. If it's unspecified, data protection mode will be LIMITED_DATA_LOSS by default. Values: `DATA_PROTECTION_MODE_UNSPECIFIED`, `LIMITED_DATA_LOSS`, `FORCE_DATA_LOSS`. |

### `FixedFrequencySchedule`

- This schedule allows the backup to be triggered at a fixed frequency (currently only daily is supported).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `startTime` | TimeOfDay | Required. The start time of every automated backup in UTC. It must be set to the start of an hour. This field is required. |

### `GCBDRConfiguration`

- GCBDR Configuration for the resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcbdrManaged` | boolean | Whether the resource is managed by GCBDR. |

### `GcsBackupSource`

- Backups stored in Cloud Storage buckets. The Cloud Storage buckets need to be the same region as the clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uris` | array<string> | Optional. URIs of the Cloud Storage objects to import. Example: gs://bucket1/object1, gs://bucket2/folder2/object2 |

### `GcsDestination`

- The Cloud Storage location for the output content
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | Required. Data destination URI (e.g. 'gs://my_bucket/my_object'). Existing files will be overwritten. |

### `GcsSource`

- The Cloud Storage location for the input content
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | Required. Source data URI. (e.g. 'gs://my_bucket/my_object'). |

### `GoogleCloudCommonOperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `cancelRequested` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `statusDetail` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleCloudRedisV1LocationMetadata`

- This location metadata represents additional configuration options for a given location where a Redis instance may be created. All fields are output only. It is returned as content of the `google.cloud.location.Location.metadata` field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableZones` | object | Output only. The set of available zones in the location. The map is keyed by the lowercase ID of each zone, as defined by GCE. These keys can be specified in `location_id` or `alternative_location_id` fields when creating a Redis instance. |

### `GoogleCloudRedisV1OperationMetadata`

- Represents the v1 metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | API version. |
| `cancelRequested` | boolean | Specifies if cancellation was requested for the operation. |
| `createTime` | string (google-datetime) | Creation timestamp. |
| `endTime` | string (google-datetime) | End timestamp. |
| `statusDetail` | string | Operation status details. |
| `target` | string | Operation target. |
| `verb` | string | Operation verb. |

### `GoogleCloudRedisV1ZoneMetadata`

- Defines specific information for a particular zone. Currently empty and reserved for future use only.
- Version: v1

### `GoogleCloudRedisV1beta1LocationMetadata`

- This location metadata represents additional configuration options for a given location where a Redis instance may be created. All fields are output only. It is returned as content of the `google.cloud.location.Location.metadata` field.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `availableZones` | object | Output only. The set of available zones in the location. The map is keyed by the lowercase ID of each zone, as defined by GCE. These keys can be specified in `location_id` or `alternative_location_id` fields when creating a Redis instance. |

### `GoogleCloudRedisV1beta1ZoneMetadata`

- Defines specific information for a particular zone. Currently empty and reserved for future use only.
- Version: v1beta1

### `ImportInstanceRequest`

- Request for Import.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inputConfig` | InputConfig | Required. Specify data to be imported. |

### `InputConfig`

- The input content
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcsSource` | GcsSource | Google Cloud Storage location where input content is located. |

### `Instance`

- A Memorystore for Redis instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alternativeLocationId` | string | Optional. If specified, at least one node will be provisioned in this zone in addition to the zone specified in location_id. Only applicable to standard tier. If provided, it must be a different zone from the one provided in \[location_id\]. Additional nodes beyond the first 2 will be placed in zones selected by the service. |
| `authEnabled` | boolean | Optional. Indicates whether OSS Redis AUTH is enabled for the instance. If set to "true" AUTH is enabled on the instance. Default value is "false" meaning AUTH is disabled. |
| `authorizedNetwork` | string | Optional. The full name of the Google Compute Engine network (https://cloud.google.com/vpc/docs/vpc) to which the instance is connected. If left unspecified, the `default` network will be used. |
| `availableMaintenanceVersions` | array<string> | Optional. The available maintenance versions that an instance could update to. |
| `connectMode` | string enum | Optional. The network connect mode of the Redis instance. If not provided, the connect mode defaults to DIRECT_PEERING. Values: `CONNECT_MODE_UNSPECIFIED`, `DIRECT_PEERING`, `PRIVATE_SERVICE_ACCESS`. |
| `createTime` | string (google-datetime) | Output only. The time the instance was created. |
| `currentLocationId` | string | Output only. The current zone where the Redis primary node is located. In basic tier, this will always be the same as \[location_id\]. In standard tier, this can be the zone of any node in the instance. |
| `customerManagedKey` | string | Optional. The KMS key reference that the customer provides when trying to create the instance. |
| `displayName` | string | An arbitrary and optional user-provided name for the instance. |
| `host` | string | Output only. Hostname or IP address of the exposed Redis endpoint used by clients to connect to the service. |
| `labels` | object | Resource labels to represent user provided metadata |
| `locationId` | string | Optional. The zone where the instance will be provisioned. If not provided, the service will choose a zone from the specified region for the instance. For standard tier, additional nodes will be added across multiple zones for protection against zonal failures. If specified, at least one node will be provisioned in this zone. |
| `maintenancePolicy` | MaintenancePolicy | Optional. The maintenance policy for the instance. If not provided, maintenance events can be performed at any time. |
| `maintenanceSchedule` | MaintenanceSchedule | Output only. Date and time of upcoming maintenance events which have been scheduled. |
| `maintenanceVersion` | string | Optional. The self service update maintenance version. The version is date based such as "20210712_00_00". |
| `memorySizeGb` | integer (int32) | Required. Redis memory size in GiB. |
| `name` | string | Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Redis instances are managed and addressed at regional level so location_id here refers to a GCP region; however, users may choose which specific zone (or collection of zones for cross-zone instances) an instance should be provisioned in. Refer to location_id and alternative_location_id fields for more details. |
| `nodes` | array<NodeInfo> | Output only. Info per node. |
| `persistenceConfig` | PersistenceConfig | Optional. Persistence configuration parameters |
| `persistenceIamIdentity` | string | Output only. Cloud IAM identity used by import / export operations to transfer data to/from Cloud Storage. Format is "serviceAccount:". The value may change over time for a given instance so should be checked before each import/export operation. |
| `port` | integer (int32) | Output only. The port number of the exposed Redis endpoint. |
| `readEndpoint` | string | Output only. Hostname or IP address of the exposed readonly Redis endpoint. Standard tier only. Targets all healthy replica nodes in instance. Replication is asynchronous and replica nodes will exhibit some lag behind the primary. Write requests must target 'host'. |
| `readEndpointPort` | integer (int32) | Output only. The port number of the exposed readonly redis endpoint. Standard tier only. Write requests should target 'port'. |
| `readReplicasMode` | string enum | Optional. Read replicas mode for the instance. Defaults to READ_REPLICAS_DISABLED. Values: `READ_REPLICAS_MODE_UNSPECIFIED`, `READ_REPLICAS_DISABLED`, `READ_REPLICAS_ENABLED`. |
| `redisConfigs` | object | Optional. Redis configuration parameters, according to Redis configuration (https://redis.io/docs/latest/operate/oss_and_stack/management/config/). Currently, the only supported parameters are: Redis version 3.2 and newer: \* maxmemory-policy \* notify-keyspace-events Redis version 4.0 and newer: \* activedefrag \* lfu-decay-time \* lfu-log-factor \* maxmemory-gb Redis version 5.0 and newer: \* stream-node-max-bytes \* stream-node-max-entries |
| `redisVersion` | string | Optional. The version of Redis software. If not provided, the default version will be used. Currently, the supported values are: \* `REDIS_3_2` for Redis 3.2 compatibility \* `REDIS_4_0` for Redis 4.0 compatibility \* `REDIS_5_0` for Redis 5.0 compatibility \* `REDIS_6_X` for Redis 6.x compatibility \* `REDIS_7_0` for Redis 7.0 compatibility (default) \* `REDIS_7_2` for Redis 7.2 compatibility |
| `replicaCount` | integer (int32) | Optional. The number of replica nodes. The valid range for the Standard Tier with read replicas enabled is \[1-5\] and defaults to 2. If read replicas are not enabled for a Standard Tier instance, the only valid value is 1 and the default is 1. The valid value for basic tier is 0 and the default is also 0. |
| `reservedIpRange` | string | Optional. For DIRECT_PEERING mode, the CIDR range of internal addresses that are reserved for this instance. Range must be unique and non-overlapping with existing subnets in an authorized network. For PRIVATE_SERVICE_ACCESS mode, the name of one allocated IP address ranges associated with this private service access connection. If not provided, the service will choose an unused /29 block, for example, 10.0.0.0/29 or 192.168.0.0/29. For READ_REPLICAS_ENABLED the default block size is /28. |
| `satisfiesPzi` | boolean | Optional. Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Optional. Output only. Reserved for future use. |
| `secondaryIpRange` | string | Optional. Additional IP range for node placement. Required when enabling read replicas on an existing instance. For DIRECT_PEERING mode value must be a CIDR range of size /28, or "auto". For PRIVATE_SERVICE_ACCESS mode value must be the name of an allocated address range associated with the private service access connection, or "auto". |
| `serverCaCerts` | array<TlsCertificate> | Output only. List of server CA certificates for the instance. |
| `state` | string enum | Output only. The current state of this instance. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `UPDATING`, `DELETING`, `REPAIRING`, `MAINTENANCE`, `IMPORTING`, `FAILING_OVER`. |
| `statusMessage` | string | Output only. Additional information about the current status of this instance, if available. |
| `suspensionReasons` | array<string> | Optional. reasons that causes instance in "SUSPENDED" state. Values: `SUSPENSION_REASON_UNSPECIFIED`, `CUSTOMER_MANAGED_KEY_ISSUE`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `tier` | string enum | Required. The service tier of the instance. Values: `TIER_UNSPECIFIED`, `BASIC`, `STANDARD_HA`. |
| `transitEncryptionMode` | string enum | Optional. The TLS mode of the Redis instance. If not provided, TLS is disabled for the instance. Values: `TRANSIT_ENCRYPTION_MODE_UNSPECIFIED`, `SERVER_AUTHENTICATION`, `DISABLED`. |

### `InstanceAuthString`

- Instance AUTH string details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authString` | string | AUTH string set on the instance. |

### `InternalResourceMetadata`

- Metadata for individual internal resources in an instance. e.g. spanner instance can have multiple databases with unique configuration settings. Similarly bigtable can have multiple clusters within same bigtable instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupConfiguration` | BackupConfiguration | Backup configuration for this database |
| `backupRun` | BackupRun | Information about the last backup attempt for this database |
| `isDeletionProtectionEnabled` | boolean | Whether deletion protection is enabled for this internal resource. |
| `product` | Product | The product this resource represents. |
| `resourceId` | DatabaseResourceId | — |
| `resourceName` | string | Required. internal resource name for spanner this will be database name e.g."spanner.googleapis.com/projects/123/abc/instances/inst1/databases/db1" |

### `IpAddress`

- Used to send IP address information for a database resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `privateIp` | string | The private IP address assigned to the resource within a Virtual Private Cloud (VPC). This IP is only reachable from within the same VPC network. Stored in standard string format (e.g., "10.0.0.2"). |
| `publicIp` | string | The public IP address assigned to the resource. This IP is reachable from the internet. Stored in standard string format (e.g., "34.72.1.1"). |

### `ListAclPoliciesResponse`

- Response for `ListAclPolicies`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aclPolicies` | array<AclPolicy> | A list of ACL policies in the project in the specified location, or across all locations. If the `location_id` in the parent field of the request is "-", all regions available to the project are queried, and the results aggregated. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListAclPolicyRevisionsResponse`

- Response for `ListAclPolicyRevisions`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aclPolicyRevisions` | array<AclPolicyRevision> | A list of ACL policy revisions. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListAuthTokensResponse`

- Response message for ListAuthTokens.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authTokens` | array<AuthToken> | A list of auth tokens in the project. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Unordered list. Auth tokens that could not be reached. |

### `ListBackupCollectionsResponse`

- Response for `ListBackupCollections`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupCollections` | array<BackupCollection> | A list of backupCollections in the project. If the `location_id` in the parent field of the request is "-", all regions available to the project are queried, and the results aggregated. If in such an aggregated query a location is unavailable, a placeholder backupCollection entry is included in the response with the `name` field set to a value of the form `projects/{project_id}/locations/{location_id}/backupCollections/`- and the `status` field set to ERROR and `status_message` field set to "location not available for ListBackupCollections". |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBackupsResponse`

- Response for `ListBackups`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backups` | array<Backup> | A list of backups in the project. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Backups that could not be reached. |

### `ListClustersResponse`

- Response for `ListClusters`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusters` | array<Cluster> | A list of Redis clusters in the project in the specified location, or across all locations. If the `location_id` in the parent field of the request is "-", all regions available to the project are queried, and the results aggregated. If in such an aggregated query a location is unavailable, a placeholder Redis entry is included in the response with the `name` field set to a value of the form `projects/{project_id}/locations/{location_id}/clusters/`- and the `status` field set to ERROR and `status_message` field set to "location not available for ListClusters". |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListInstancesResponse`

- Response for ListInstances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<Instance> | A list of Redis instances in the project in the specified location, or across all locations. If the `location_id` in the parent field of the request is "-", all regions available to the project are queried, and the results aggregated. If in such an aggregated query a location is unavailable, a placeholder Redis entry is included in the response with the `name` field set to a value of the form `projects/{project_id}/locations/{location_id}/instances/`- and the `status` field set to ERROR and `status_message` field set to "location not available for ListInstances". |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListTokenAuthUsersResponse`

- Response message for ListTokenAuthUsers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `tokenAuthUsers` | array<TokenAuthUser> | A list of token auth users in the project. |
| `unreachable` | array<string> | Unordered list. Token auth users that could not be reached. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | Resource ID for the region. For example: "us-east1". |
| `metadata` | object | Output only. The set of available zones in the location. The map is keyed by the lowercase ID of each zone, as defined by Compute Engine. These keys can be specified in `location_id` or `alternative_location_id` fields when creating a Redis instance. |
| `name` | string | Full resource name for the region. For example: "projects/example-project/locations/us-east1". |

### `MachineConfiguration`

- MachineConfiguration describes the configuration of a machine specific to Database Resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baselineSlots` | string (int64) | Optional. Baseline slots for BigQuery Reservations. Baseline slots are in increments of 50. |
| `cpuCount` | integer (int32) | The number of CPUs. Deprecated. Use vcpu_count instead. TODO(b/342344482) add proto validations again after bug fix. |
| `maxReservationSlots` | string (int64) | Optional. Max slots for BigQuery Reservations. Max slots are in increments of 50. |
| `memorySizeInBytes` | string (int64) | Memory size in bytes. TODO(b/342344482) add proto validations again after bug fix. |
| `shardCount` | integer (int32) | Optional. Number of shards (if applicable). |
| `vcpuCount` | number (double) | Optional. The number of vCPUs. TODO(b/342344482) add proto validations again after bug fix. |

### `MaintenancePolicy`

- Maintenance policy for an instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the policy was created. |
| `description` | string | Optional. Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512. |
| `updateTime` | string (google-datetime) | Output only. The time when the policy was last updated. |
| `weeklyMaintenanceWindow` | array<WeeklyMaintenanceWindow> | Optional. Maintenance window that is applied to resources covered by this policy. Minimum 1. For the current version, the maximum number of weekly_window is expected to be one. |

### `MaintenanceSchedule`

- Upcoming maintenance schedule. If no maintenance is scheduled, fields are not populated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canReschedule` | boolean | If the scheduled maintenance can be rescheduled, default is true. |
| `endTime` | string (google-datetime) | Output only. The end time of any upcoming scheduled maintenance for this instance. |
| `scheduleDeadlineTime` | string (google-datetime) | Output only. The deadline that the maintenance schedule start time can not go beyond, including reschedule. |
| `startTime` | string (google-datetime) | Output only. The start time of any upcoming scheduled maintenance for this instance. |

### `ManagedBackupSource`

- Backups that generated and managed by memorystore.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | string | Optional. Example: //redis.googleapis.com/projects/{project}/locations/{location}/backupCollections/{collection}/backups/{backup} A shorter version (without the prefix) of the backup name is also supported, like projects/{project}/locations/{location}/backupCollections/{collection}/backups/{backup_id} In this case, it assumes the backup is under redis.googleapis.com. |

### `ManagedCertificateAuthority`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caCerts` | array<CertChain> | The PEM encoded CA certificate chains for redis managed server authentication |

### `Membership`

- An output only view of all the member clusters participating in the cross cluster replication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `primaryCluster` | RemoteCluster | Output only. The primary cluster that acts as the source of replication for the secondary clusters. |
| `secondaryClusters` | array<RemoteCluster> | Output only. The list of secondary clusters replicating from the primary cluster. |

### `NodeInfo`

- Node specific properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. Node identifying string. e.g. 'node-0', 'node-1' |
| `zone` | string | Output only. Location of the node. |

### `ObservabilityMetricData`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationType` | string enum | Required. Type of aggregation performed on the metric. Values: `AGGREGATION_TYPE_UNSPECIFIED`, `PEAK`, `P99`, `P95`, `CURRENT`. |
| `metricType` | string enum | Required. Type of metric like CPU, Memory, etc. Values: `METRIC_TYPE_UNSPECIFIED`, `CPU_UTILIZATION`, `MEMORY_UTILIZATION`, `NETWORK_CONNECTIONS`, `STORAGE_UTILIZATION`, `STORAGE_USED_BYTES`, `NODE_COUNT`, `MEMORY_USED_BYTES`, `PROCESSING_UNIT_COUNT`. |
| `observationTime` | string (google-datetime) | Required. The time the metric value was observed. |
| `resourceName` | string | Required. Database resource name associated with the signal. Resource name to follow CAIS resource_name format as noted here (internal link) |
| `value` | TypedValue | Required. Value of the metric type. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | { `createTime`: The time the operation was created. `endTime`: The time the operation finished running. `target`: Server-defined resource path for the target of the operation. `verb`: Name of the verb executed by the operation. `statusDetail`: Human-readable status of the operation, if any. `cancelRequested`: Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. `apiVersion`: API version used to start the operation. } |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationError`

- An error that occurred during a backup creation operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string | Identifies the specific error that occurred. REQUIRED |
| `errorType` | string enum | — Values: `OPERATION_ERROR_TYPE_UNSPECIFIED`, `KMS_KEY_ERROR`, `DATABASE_ERROR`, `STOCKOUT_ERROR`, `CANCELLATION_ERROR`, `SQLSERVER_ERROR`, `INTERNAL_ERROR`. |
| `message` | string | Additional information about the error encountered. REQUIRED |

### `OperationMetadata`

- Pre-defined metadata fields.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `OutputConfig`

- The output content
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcsDestination` | GcsDestination | Google Cloud Storage destination for output content. |

### `PersistenceConfig`

- Configuration of the persistence functionality.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `persistenceMode` | string enum | Optional. Controls whether Persistence features are enabled. If not provided, the existing value will be used. Values: `PERSISTENCE_MODE_UNSPECIFIED`, `DISABLED`, `RDB`. |
| `rdbNextSnapshotTime` | string (google-datetime) | Output only. The next time that a snapshot attempt is scheduled to occur. |
| `rdbSnapshotPeriod` | string enum | Optional. Period between RDB snapshots. Snapshots will be attempted every period starting from the provided snapshot start time. For example, a start time of 01/01/2033 06:45 and SIX_HOURS snapshot period will do nothing until 01/01/2033, and then trigger snapshots every day at 06:45, 12:45, 18:45, and 00:45 the next day, and so on. If not provided, TWENTY_FOUR_HOURS will be used as default. Values: `SNAPSHOT_PERIOD_UNSPECIFIED`, `ONE_HOUR`, `SIX_HOURS`, `TWELVE_HOURS`, `TWENTY_FOUR_HOURS`. |
| `rdbSnapshotStartTime` | string (google-datetime) | Optional. Date and time that the first snapshot was/will be attempted, and to which future snapshots will be aligned. If not provided, the current time will be used. |

### `Product`

- Product specification for Condor resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `engine` | string enum | The specific engine that the underlying database is running. Values: `ENGINE_UNSPECIFIED`, `ENGINE_MYSQL`, `MYSQL`, `ENGINE_POSTGRES`, `POSTGRES`, `ENGINE_SQL_SERVER`, `SQL_SERVER`, `ENGINE_NATIVE`, `NATIVE`, `ENGINE_CLOUD_SPANNER_WITH_POSTGRES_DIALECT`, `ENGINE_CLOUD_SPANNER_WITH_GOOGLESQL_DIALECT`, `ENGINE_MEMORYSTORE_FOR_REDIS`, `ENGINE_MEMORYSTORE_FOR_REDIS_CLUSTER`, `ENGINE_MEMORYSTORE_FOR_VALKEY`, `ENGINE_OTHER`, `ENGINE_FIRESTORE_WITH_NATIVE_MODE`, `ENGINE_FIRESTORE_WITH_DATASTORE_MODE`, `ENGINE_FIRESTORE_WITH_MONGODB_COMPATIBILITY_MODE`, `ENGINE_EXADATA_ORACLE`, `ENGINE_ADB_SERVERLESS_ORACLE`. |
| `minorVersion` | string | Minor version of the underlying database engine. Example values: For MySQL, it could be "8.0.32", "5.7.32" etc.. For Postgres, it could be "14.3", "15.3" etc.. |
| `type` | string enum | Type of specific database product. It could be CloudSQL, AlloyDB etc.. Values: `PRODUCT_TYPE_UNSPECIFIED`, `PRODUCT_TYPE_CLOUD_SQL`, `CLOUD_SQL`, `PRODUCT_TYPE_ALLOYDB`, `ALLOYDB`, `PRODUCT_TYPE_SPANNER`, `PRODUCT_TYPE_ON_PREM`, `ON_PREM`, `PRODUCT_TYPE_MEMORYSTORE`, `PRODUCT_TYPE_BIGTABLE`, `PRODUCT_TYPE_FIRESTORE`, `PRODUCT_TYPE_COMPUTE_ENGINE`, `PRODUCT_TYPE_ORACLE_ON_GCP`, `PRODUCT_TYPE_BIGQUERY`, `PRODUCT_TYPE_OTHER`. |
| `version` | string | Version of the underlying database engine. Example values: For MySQL, it could be "8.0", "5.7" etc.. For Postgres, it could be "14", "15" etc.. |

### `PscAutoConnection`

- Details of consumer resources in a PSC connection that is created through Service Connectivity Automation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | Output only. The IP allocated on the consumer network for the PSC forwarding rule. |
| `connectionType` | string enum | Output only. Type of the PSC connection. Values: `CONNECTION_TYPE_UNSPECIFIED`, `CONNECTION_TYPE_DISCOVERY`, `CONNECTION_TYPE_PRIMARY`, `CONNECTION_TYPE_READER`. |
| `forwardingRule` | string | Output only. The URI of the consumer side forwarding rule. Example: projects/{projectNumOrId}/regions/us-east1/forwardingRules/{resourceId}. |
| `network` | string | Required. The consumer network where the IP address resides, in the form of projects/{project_id}/global/networks/{network_id}. |
| `projectId` | string | Required. The consumer project_id where the forwarding rule is created from. |
| `pscConnectionId` | string | Output only. The PSC connection id of the forwarding rule connected to the service attachment. |
| `pscConnectionStatus` | string enum | Output only. The status of the PSC connection. Please note that this value is updated periodically. Please use Private Service Connect APIs for the latest status. Values: `PSC_CONNECTION_STATUS_UNSPECIFIED`, `PSC_CONNECTION_STATUS_ACTIVE`, `PSC_CONNECTION_STATUS_NOT_FOUND`. |
| `serviceAttachment` | string | Output only. The service attachment which is the target of the PSC connection, in the form of projects/{project-id}/regions/{region}/serviceAttachments/{service-attachment-id}. |

### `PscConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `network` | string | Required. The network where the IP address of the discovery endpoint will be reserved, in the form of projects/{network_project}/global/networks/{network_id}. |

### `PscConnection`

- Details of consumer resources in a PSC connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | Required. The IP allocated on the consumer network for the PSC forwarding rule. |
| `connectionType` | string enum | Output only. Type of the PSC connection. Values: `CONNECTION_TYPE_UNSPECIFIED`, `CONNECTION_TYPE_DISCOVERY`, `CONNECTION_TYPE_PRIMARY`, `CONNECTION_TYPE_READER`. |
| `forwardingRule` | string | Required. The URI of the consumer side forwarding rule. Example: projects/{projectNumOrId}/regions/us-east1/forwardingRules/{resourceId}. |
| `network` | string | Required. The consumer network where the IP address resides, in the form of projects/{project_id}/global/networks/{network_id}. |
| `port` | integer (int32) | Output only. port will only be set for Primary/Reader or Discovery endpoint. |
| `projectId` | string | Optional. Project ID of the consumer project where the forwarding rule is created in. |
| `pscConnectionId` | string | Required. The PSC connection id of the forwarding rule connected to the service attachment. |
| `pscConnectionStatus` | string enum | Output only. The status of the PSC connection. Please note that this value is updated periodically. To get the latest status of a PSC connection, follow https://cloud.google.com/vpc/docs/configure-private-service-connect-services#endpoint-details. Values: `PSC_CONNECTION_STATUS_UNSPECIFIED`, `PSC_CONNECTION_STATUS_ACTIVE`, `PSC_CONNECTION_STATUS_NOT_FOUND`. |
| `serviceAttachment` | string | Required. The service attachment which is the target of the PSC connection, in the form of projects/{project-id}/regions/{region}/serviceAttachments/{service-attachment-id}. |

### `PscServiceAttachment`

- Configuration of a service attachment of the cluster, for creating PSC connections.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionType` | string enum | Output only. Type of a PSC connection targeting this service attachment. Values: `CONNECTION_TYPE_UNSPECIFIED`, `CONNECTION_TYPE_DISCOVERY`, `CONNECTION_TYPE_PRIMARY`, `CONNECTION_TYPE_READER`. |
| `serviceAttachment` | string | Output only. Service attachment URI which your self-created PscConnection should use as target |

### `RDBConfig`

- Configuration of the RDB based persistence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rdbSnapshotPeriod` | string enum | Optional. Period between RDB snapshots. Values: `SNAPSHOT_PERIOD_UNSPECIFIED`, `ONE_HOUR`, `SIX_HOURS`, `TWELVE_HOURS`, `TWENTY_FOUR_HOURS`. |
| `rdbSnapshotStartTime` | string (google-datetime) | Optional. The time that the first snapshot was/will be attempted, and to which future snapshots will be aligned. If not provided, the current time will be used. |

### `ReconciliationOperationMetadata`

- Operation metadata returned by the CLH during resource state reconciliation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleteResource` | boolean | DEPRECATED. Use exclusive_action instead. |
| `exclusiveAction` | string enum | Excluisive action returned by the CLH. Values: `UNKNOWN_REPAIR_ACTION`, `DELETE`, `RETRY`. |

### `RegionalCertChain`

- The certificates that form the CA chain, from leaf to root order.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificates` | array<string> | The certificates that form the CA chain, from leaf to root order. |

### `RegionalManagedCertificateAuthority`

- CA certificate chains for redis managed server authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caCerts` | array<RegionalCertChain> | The PEM encoded CA certificate chains for redis managed server authentication |

### `RemoteCluster`

- Details of the remote cluster associated with this cluster in a cross cluster replication setup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cluster` | string | Output only. The full resource path of the remote cluster in the format: projects//locations//clusters/ |
| `uid` | string | Output only. The unique identifier of the remote cluster. |

### `RescheduleClusterMaintenanceRequest`

- Request for rescheduling a cluster maintenance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rescheduleType` | string enum | Required. If reschedule type is SPECIFIC_TIME, must set up schedule_time as well. Values: `RESCHEDULE_TYPE_UNSPECIFIED`, `IMMEDIATE`, `SPECIFIC_TIME`. |
| `scheduleTime` | string (google-datetime) | Optional. Timestamp when the maintenance shall be rescheduled to if reschedule_type=SPECIFIC_TIME, in RFC 3339 format, for example `2012-11-15T16:19:00.094Z`. |

### `RescheduleMaintenanceRequest`

- Request for RescheduleMaintenance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rescheduleType` | string enum | Required. If reschedule type is SPECIFIC_TIME, must set up schedule_time as well. Values: `RESCHEDULE_TYPE_UNSPECIFIED`, `IMMEDIATE`, `NEXT_AVAILABLE_WINDOW`, `SPECIFIC_TIME`. |
| `scheduleTime` | string (google-datetime) | Optional. Timestamp when the maintenance shall be rescheduled to if reschedule_type=SPECIFIC_TIME, in RFC 3339 format, for example `2012-11-15T16:19:00.094Z`. |

### `ResourceFlags`

- Message type for storing resource flags.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Optional. Key of the resource flag. |
| `value` | string | Optional. Value of the resource flag. |

### `ResourceMaintenanceDenySchedule`

- Deny maintenance period for the database resource. It specifies the time range during which the maintenance cannot start. This is configured by the customer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endDate` | Date | Optional. Deny period end date. |
| `startDate` | Date | Optional. The start date of the deny maintenance period. |
| `time` | TimeOfDay | Optional. Time in UTC when the deny period starts on start_date and ends on end_date. |

### `ResourceMaintenanceInfo`

- MaintenanceInfo to capture the maintenance details of database resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentVersionReleaseDate` | Date | Optional. The date when the current maintenance version was released. |
| `denyMaintenanceSchedules` | array<ResourceMaintenanceDenySchedule> | Optional. List of Deny maintenance period for the database resource. |
| `isInstanceStopped` | boolean | Optional. Whether the instance is in stopped state. This information is temporarily being captured in maintenanceInfo, till STOPPED state is supported by DB Center. |
| `maintenanceSchedule` | ResourceMaintenanceSchedule | Optional. Maintenance window for the database resource. |
| `maintenanceState` | string enum | Output only. Current state of maintenance on the database resource. Values: `MAINTENANCE_STATE_UNSPECIFIED`, `CREATING`, `READY`, `UPDATING`, `REPAIRING`, `DELETING`, `ERROR`. |
| `maintenanceVersion` | string | Optional. Current Maintenance version of the database resource. Example: "MYSQL_8_0_41.R20250531.01_15" |
| `nextAvailableMaintenanceVersions` | array<string> | Optional. List of next available maintenance versions. |
| `upcomingMaintenance` | UpcomingMaintenance | Optional. Upcoming maintenance for the database resource. This field is populated once SLM generates and publishes upcoming maintenance window. |

### `ResourceMaintenanceSchedule`

- Maintenance window for the database resource. It specifies preferred time and day of the week and phase in some cases, when the maintenance can start. This is configured by the customer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | string enum | Optional. Preferred day of the week for maintenance, e.g. MONDAY, TUESDAY, etc. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `phase` | string enum | Optional. Phase of the maintenance window. This is to capture order of maintenance. For example, for Cloud SQL resources, this can be used to capture if the maintenance window is in Week1, Week2, Week5, etc. Non production resources are usually part of early phase. For more details, refer to Cloud SQL resources - https://cloud.google.com/sql/docs/mysql/maintenance Values: `PHASE_UNSPECIFIED`, `ANY`, `WEEK1`, `WEEK2`, `WEEK5`. |
| `time` | TimeOfDay | Optional. Preferred time to start the maintenance operation on the specified day. |

### `RetentionSettings`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `durationBasedRetention` | string (google-duration) | Duration based retention period i.e. 172800 seconds (2 days) |
| `quantityBasedRetention` | integer (int32) | Quantity based retention period i.e. 7 backups |
| `retentionUnit` | string enum | The unit that 'retained_backups' represents. Values: `RETENTION_UNIT_UNSPECIFIED`, `COUNT`, `TIME`, `DURATION`, `RETENTION_UNIT_OTHER`. |
| `timeBasedRetention` | string (google-duration) | Duration based retention period i.e. 172800 seconds (2 days) |
| `timestampBasedRetentionTime` | string (google-datetime) | Timestamp based retention period i.e. 2024-05-01T00:00:00Z |

### `SharedRegionalCertificateAuthority`

- Shared regional certificate authority
- Version: v1

| Field | Type | Description |
|---|---|---|
| `managedServerCa` | RegionalManagedCertificateAuthority | CA certificate chains for redis managed server authentication. |
| `name` | string | Identifier. Unique name of the resource in this scope including project and location using the form: `projects/{project}/locations/{location}/sharedRegionalCertificateAuthority` |

### `SignalMetadata`

- SignalMetadata contains one of the signal metadata proto messages associated with a SignalType. This proto will be mapped to SignalMetadata message in storage.proto. Next ID: 3
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupRun` | BackupRun | Signal data for backup runs. |
| `signalBoolValue` | boolean | Signal data for boolean signals. |

### `StateInfo`

- Represents additional information about the state of the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `updateInfo` | UpdateInfo | Describes ongoing update on the cluster when cluster state is UPDATING. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Tags`

- Message type for storing tags. Tags provide a way to create annotations for resources, and in some cases conditionally allow or deny policies based on whether a resource has a specific tag.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tags` | object | The Tag key/value mappings. |

### `TimeOfDay`

- Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hours` | integer (int32) | Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `nanos` | integer (int32) | Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |
| `seconds` | integer (int32) | Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |

### `TlsCertificate`

- TlsCertificate Resource
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cert` | string | PEM representation. |
| `createTime` | string (google-datetime) | Output only. The time when the certificate was created in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2020-05-18T00:00:00.094Z`. |
| `expireTime` | string (google-datetime) | Output only. The time when the certificate expires in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2020-05-18T00:00:00.094Z`. |
| `serialNumber` | string | Serial number, as extracted from the certificate. |
| `sha1Fingerprint` | string | Sha1 Fingerprint of the certificate. |

### `TokenAuthUser`

- Represents a token based auth user for the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The resource name of the token based auth user. Format: projects/{project}/locations/{location}/clusters/{cluster}/tokenAuthUsers/{token_auth_user} |
| `state` | string enum | Output only. The state of the token based auth user. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `UPDATING`, `DELETING`. |

### `TypedValue`

- TypedValue represents the value of a metric type. It can either be a double, an int64, a string or a bool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | For boolean value |
| `doubleValue` | number (double) | For double value |
| `int64Value` | string (int64) | For integer value |
| `stringValue` | string | For string value |

### `UpcomingMaintenance`

- Upcoming maintenance for the database resource. This is generated by SLM once the upcoming maintenance schedule is published.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Optional. The end time of the upcoming maintenance. |
| `startTime` | string (google-datetime) | Optional. The start time of the upcoming maintenance. |

### `UpdateInfo`

- Represents information about an updating cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetNodeType` | string enum | Target node type for redis cluster. Values: `NODE_TYPE_UNSPECIFIED`, `REDIS_SHARED_CORE_NANO`, `REDIS_HIGHMEM_MEDIUM`, `REDIS_HIGHMEM_XLARGE`, `REDIS_STANDARD_SMALL`, `REDIS_HIGHCPU_MEDIUM`, `REDIS_STANDARD_LARGE`, `REDIS_HIGHMEM_2XLARGE`. |
| `targetReplicaCount` | integer (int32) | Target number of replica nodes per shard. |
| `targetShardCount` | integer (int32) | Target number of shards for redis cluster |

### `UpgradeInstanceRequest`

- Request for UpgradeInstance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `redisVersion` | string | Required. Specifies the target version of Redis software to upgrade to. |

### `UserLabels`

- Message type for storing user labels. User labels are used to tag App Engine resources, allowing users to search for resources matching a set of labels and to aggregate usage data by labels.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | object | — |

### `WeeklyMaintenanceWindow`

- Time window in which disruptive maintenance updates occur. Non-disruptive updates can occur inside or outside this window.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | string enum | Required. The day of week that maintenance updates occur. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `duration` | string (google-duration) | Output only. Duration of the maintenance window. The current window is fixed at 1 hour. |
| `startTime` | TimeOfDay | Required. Start time of the window in UTC time. |

### `ZoneDistributionConfig`

- Zone distribution config for allocation of cluster resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeZones` | array<string> | Output only. The exact list of zones where the cluster currently has active VMs. |
| `mode` | string enum | Optional. The mode of zone distribution. Defaults to MULTI_ZONE, when not specified. Values: `ZONE_DISTRIBUTION_MODE_UNSPECIFIED`, `MULTI_ZONE`, `SINGLE_ZONE`. |
| `zone` | string | Optional. When SINGLE ZONE distribution is selected, zone field would be used to allocate all resources in that zone. This is not applicable to MULTI_ZONE, and would be ignored for MULTI_ZONE clusters. |
| `zones` | array<string> | Optional. Specify the zones of a multi-zone cluster where Redis Cluster allocates resources. This flag isn't applicable for single-zone clusters. |

### Shape of `AOFConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "appendFsync": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `redis` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Google-internal `go/` short links in the Discovery descriptions are replaced with `(internal link)`; they are not reachable outside Google.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://redis.googleapis.com/$discovery/rest?version=v1, https://redis.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
