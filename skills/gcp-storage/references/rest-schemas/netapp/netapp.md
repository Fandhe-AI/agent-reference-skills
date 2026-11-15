---
source: https://netapp.googleapis.com/$discovery/rest?version=v1
---

# NetApp API message schemas (netapp)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/netapp/`.

### `ActiveDirectory`

- ActiveDirectory is the public representation of the active directory config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `administrators` | array<string> | Optional. Users to be added to the Built-in Admininstrators group. |
| `aesEncryption` | boolean | If enabled, AES encryption will be enabled for SMB communication. |
| `backupOperators` | array<string> | Optional. Users to be added to the Built-in Backup Operator active directory group. |
| `createTime` | string (google-datetime) | Output only. Create time of the active directory. |
| `description` | string | Description of the active directory. |
| `dns` | string | Required. Comma separated list of DNS server IP addresses for the Active Directory domain. |
| `domain` | string | Required. Name of the Active Directory domain |
| `encryptDcConnections` | boolean | If enabled, traffic between the SMB server to Domain Controller (DC) will be encrypted. |
| `kdcHostname` | string | Name of the active directory machine. This optional parameter is used only while creating kerberos volume |
| `kdcIp` | string | KDC server IP address for the active directory machine. |
| `labels` | object | Labels for the active directory. |
| `ldapSigning` | boolean | Specifies whether or not the LDAP traffic needs to be signed. |
| `name` | string | Identifier. The resource name of the active directory. Format: `projects/{project_number}/locations/{location_id}/activeDirectories/{active_directory_id}`. |
| `netBiosPrefix` | string | Required. NetBIOSPrefix is used as a prefix for SMB server name. |
| `nfsUsersWithLdap` | boolean | If enabled, will allow access to local users and LDAP users. If access is needed for only LDAP users, it has to be disabled. |
| `organizationalUnit` | string | The Organizational Unit (OU) within the Windows Active Directory the user belongs to. |
| `password` | string | Required. Password of the Active Directory domain administrator. |
| `securityOperators` | array<string> | Optional. Domain users to be given the SeSecurityPrivilege. |
| `site` | string | The Active Directory site the service will limit Domain Controller discovery too. |
| `state` | string enum | Output only. The state of the AD. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `UPDATING`, `IN_USE`, `DELETING`, `ERROR`, `DIAGNOSING`. |
| `stateDetails` | string | Output only. The state details of the Active Directory. |
| `username` | string | Required. Username of the Active Directory domain administrator. |

### `Backup`

- A NetApp Backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupRegion` | string | Output only. Region in which backup is stored. Format: `projects/{project_id}/locations/{location}` |
| `backupType` | string enum | Output only. Type of backup, manually created or created by a backup policy. Values: `TYPE_UNSPECIFIED`, `MANUAL`, `SCHEDULED`. |
| `chainStorageBytes` | string (int64) | Output only. Total size of all backups in a chain in bytes = baseline backup size + sum(incremental backup size) |
| `createTime` | string (google-datetime) | Output only. The time when the backup was created. |
| `description` | string | A description of the backup with 2048 characters or less. Requests with longer descriptions will be rejected. |
| `enforcedRetentionEndTime` | string (google-datetime) | Output only. The time until which the backup is not deletable. |
| `labels` | object | Resource labels to represent user provided metadata. |
| `name` | string | Identifier. The resource name of the backup. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id}`. |
| `ontapSource` | OntapSource | Optional. Represents source details for ONTAP backups. Either source_volume or ontap_source should be provided. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use |
| `satisfiesPzs` | boolean | Output only. Reserved for future use |
| `sourceSnapshot` | string | If specified, backup will be created from the given snapshot. If not specified, there will be a new snapshot taken to initiate the backup creation. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}/snapshots/{snapshot_id}` |
| `sourceVolume` | string | The resource name of the volume that this backup belongs to. You must provide either `source_volume` or `ontap_source`. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}` |
| `state` | string enum | Output only. The backup state. Values: `STATE_UNSPECIFIED`, `CREATING`, `UPLOADING`, `READY`, `DELETING`, `ERROR`, `UPDATING`. |
| `volumeRegion` | string | Output only. Region of the volume from which the backup was created. Format: `projects/{project_id}/locations/{location}` |
| `volumeUsageBytes` | string (int64) | Output only. Size of the file system when the backup was created. When creating a new volume from the backup, the volume capacity will have to be at least as big. |

### `BackupConfig`

- BackupConfig contains backup related config on a volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupChainBytes` | string (int64) | Output only. Total size of all backups in a chain in bytes = baseline backup size + sum(incremental backup size). |
| `backupPolicies` | array<string> | Optional. When specified, schedule backups will be created based on the policy configuration. |
| `backupVault` | string | Optional. Name of backup vault. Format: projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id} |
| `scheduledBackupEnabled` | boolean | Optional. When set to true, scheduled backup is enabled on the volume. This field should be nil when there's no backup policy attached. |

### `BackupPolicy`

- Backup Policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assignedVolumeCount` | integer (int32) | Output only. The total number of volumes assigned by this backup policy. |
| `createTime` | string (google-datetime) | Output only. The time when the backup policy was created. |
| `dailyBackupLimit` | integer (int32) | Number of daily backups to keep. Note that the minimum daily backup limit is 2. |
| `description` | string | Description of the backup policy. |
| `enabled` | boolean | If enabled, make backups automatically according to the schedules. This will be applied to all volumes that have this policy attached and enforced on volume level. If not specified, default is true. |
| `labels` | object | Resource labels to represent user provided metadata. |
| `monthlyBackupLimit` | integer (int32) | Number of monthly backups to keep. Note that the sum of daily, weekly and monthly backups should be greater than 1. |
| `name` | string | Identifier. The resource name of the backup policy. Format: `projects/{project_id}/locations/{location}/backupPolicies/{backup_policy_id}`. |
| `state` | string enum | Output only. The backup policy state. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `ERROR`, `UPDATING`. |
| `weeklyBackupLimit` | integer (int32) | Number of weekly backups to keep. Note that the sum of daily, weekly and monthly backups should be greater than 1. |

### `BackupRetentionPolicy`

- Retention policy for backups in the backup vault
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupMinimumEnforcedRetentionDays` | integer (int32) | Required. Minimum retention duration in days for backups in the backup vault. |
| `dailyBackupImmutable` | boolean | Optional. Indicates if the daily backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true. |
| `manualBackupImmutable` | boolean | Optional. Indicates if the manual backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true. |
| `monthlyBackupImmutable` | boolean | Optional. Indicates if the monthly backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true. |
| `weeklyBackupImmutable` | boolean | Optional. Indicates if the weekly backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true. |

### `BackupSource`

- Represents the backup source of the restore operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | string | Required. The backup resource name. |
| `fileList` | array<string> | Optional. List of files to be restored in the form of their absolute path as in source volume. If provided, only these files will be restored. If not provided, the entire backup will be restored (Full Backup Restore) |

### `BackupVault`

- A NetApp BackupVault.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupRegion` | string | Optional. Region where the backups are stored. Format: `projects/{project_id}/locations/{location}` |
| `backupRetentionPolicy` | BackupRetentionPolicy | Optional. Backup retention policy defining the retention of backups. |
| `backupVaultType` | string enum | Optional. Type of backup vault to be created. Default is IN_REGION. Values: `BACKUP_VAULT_TYPE_UNSPECIFIED`, `IN_REGION`, `CROSS_REGION`. |
| `backupsCryptoKeyVersion` | string | Output only. The crypto key version used to encrypt the backup vault. Format: `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{crypto_key_version}` |
| `createTime` | string (google-datetime) | Output only. Create time of the backup vault. |
| `description` | string | Description of the backup vault. |
| `destinationBackupVault` | string | Output only. Name of the Backup vault created in backup region. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}` |
| `encryptionState` | string enum | Output only. Field indicating encryption state of CMEK backups. Values: `ENCRYPTION_STATE_UNSPECIFIED`, `ENCRYPTION_STATE_PENDING`, `ENCRYPTION_STATE_COMPLETED`, `ENCRYPTION_STATE_IN_PROGRESS`, `ENCRYPTION_STATE_FAILED`. |
| `kmsConfig` | string | Optional. Specifies the Key Management System (KMS) configuration to be used for backup encryption. Format: `projects/{project}/locations/{location}/kmsConfigs/{kms_config}` |
| `labels` | object | Resource labels to represent user provided metadata. |
| `name` | string | Identifier. The resource name of the backup vault. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}`. |
| `sourceBackupVault` | string | Output only. Name of the Backup vault created in source region. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}` |
| `sourceRegion` | string | Optional. Region in which the backup vault is created. Format: `projects/{project_id}/locations/{location}` |
| `state` | string enum | Output only. The backup vault state. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `ERROR`, `UPDATING`. |

### `BackupVault` (v1beta1)

- A NetApp BackupVault.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `backupRegion` | string | Optional. Region where the backups are stored. Format: `projects/{project_id}/locations/{location}` |
| `backupRetentionPolicy` | BackupRetentionPolicy | Optional. Backup retention policy defining the retention of backups. |
| `backupVaultType` | string enum | Optional. Type of backup vault to be created. Default is IN_REGION. Values: `BACKUP_VAULT_TYPE_UNSPECIFIED`, `IN_REGION`, `CROSS_REGION`. |
| `backupsCryptoKeyVersion` | string | Output only. The crypto key version used to encrypt the backup vault. Format: `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{crypto_key_version}` |
| `createTime` | string (google-datetime) | Output only. Create time of the backup vault. |
| `crossProjectVault` | boolean | Optional. Indicates if the backup vault is a cross project vault. |
| `description` | string | Description of the backup vault. |
| `destinationBackupVault` | string | Output only. Name of the Backup vault created in backup region. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}` |
| `encryptionState` | string enum | Output only. Field indicating encryption state of CMEK backups. Values: `ENCRYPTION_STATE_UNSPECIFIED`, `ENCRYPTION_STATE_PENDING`, `ENCRYPTION_STATE_COMPLETED`, `ENCRYPTION_STATE_IN_PROGRESS`, `ENCRYPTION_STATE_FAILED`. |
| `kmsConfig` | string | Optional. Specifies the Key Management System (KMS) configuration to be used for backup encryption. Format: `projects/{project}/locations/{location}/kmsConfigs/{kms_config}` |
| `labels` | object | Resource labels to represent user provided metadata. |
| `name` | string | Identifier. The resource name of the backup vault. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}`. |
| `sourceBackupVault` | string | Output only. Name of the Backup vault created in source region. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}` |
| `sourceRegion` | string | Optional. Region in which the backup vault is created. Format: `projects/{project_id}/locations/{location}` |
| `state` | string enum | Output only. The backup vault state. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `ERROR`, `UPDATING`. |

### `BlockDevice`

- Block device represents the device(s) which are stored in the block volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hostGroups` | array<string> | Optional. A list of host groups that identify hosts that can mount the block volume. Format: `projects/{project_id}/locations/{location}/hostGroups/{host_group_id}` This field can be updated after the block device is created. |
| `identifier` | string | Output only. Device identifier of the block volume. This represents `lun_serial_number` for iSCSI volumes. |
| `name` | string | Optional. User-defined name for the block device, unique within the volume. In case no user input is provided, name will be auto-generated in the backend. The name must meet the following requirements: \* Be between 1 and 255 characters long. \* Contain only uppercase or lowercase letters (A-Z, a-z), numbers (0-9), and the following special characters: "-", "\_", "}", "{", ".". \* Spaces are not allowed. |
| `osType` | string enum | Required. Immutable. The OS type of the volume. This field can't be changed after the block device is created. Values: `OS_TYPE_UNSPECIFIED`, `LINUX`, `WINDOWS`, `ESXI`. |
| `sizeGib` | string (int64) | Optional. The size of the block device in GiB. Any value provided for the `size_gib` field during volume creation is ignored. The block device's size is system-managed and will be set to match the parent Volume's `capacity_gib`. |

### `CacheConfig`

- Configuration of the cache volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cachePrePopulate` | CachePrePopulate | Optional. Pre-populate cache volume with data from the origin volume. |
| `cachePrePopulateState` | string enum | Output only. State of the prepopulation job indicating how the prepopulation is progressing. Values: `CACHE_PRE_POPULATE_STATE_UNSPECIFIED`, `NOT_NEEDED`, `IN_PROGRESS`, `COMPLETE`, `ERROR`. |
| `cifsChangeNotifyEnabled` | boolean | Optional. Flag indicating whether a CIFS change notification is enabled for the FlexCache volume. |
| `writebackEnabled` | boolean | Optional. Flag indicating whether writeback is enabled for the FlexCache volume. |

### `CacheParameters`

- Cache Parameters for the volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cacheConfig` | CacheConfig | Optional. Configuration of the cache volume. |
| `cacheState` | string enum | Output only. State of the cache volume indicating the peering status. Values: `CACHE_STATE_UNSPECIFIED`, `PENDING_CLUSTER_PEERING`, `PENDING_SVM_PEERING`, `PEERED`, `ERROR`. |
| `command` | string | Output only. Copy-paste-able commands to be used on user's ONTAP to accept peering requests. |
| `enableGlobalFileLock` | boolean | Optional. Indicates whether the cache volume has global file lock enabled. |
| `passphrase` | string | Output only. Temporary passphrase generated to accept cluster peering command. |
| `peerClusterName` | string | Required. Name of the origin volume's ONTAP cluster. |
| `peerIpAddresses` | array<string> | Required. List of IC LIF addresses of the origin volume's ONTAP cluster. |
| `peerSvmName` | string | Required. Name of the origin volume's SVM. |
| `peerVolumeName` | string | Required. Name of the origin volume for the cache volume. |
| `peeringCommandExpiryTime` | string (google-datetime) | Optional. Expiration time for the peering command to be executed on user's ONTAP. |
| `stateDetails` | string | Output only. Detailed description of the current cache state. |

### `CachePrePopulate`

- Pre-populate cache volume with data from the origin volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludePathList` | array<string> | Optional. List of directory-paths to be excluded for pre-population for the FlexCache volume. |
| `pathList` | array<string> | Optional. List of directory-paths to be pre-populated for the FlexCache volume. |
| `recursion` | boolean | Optional. Flag indicating whether the directories listed with the `path_list` need to be recursively pre-populated. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CloneDetails`

- Details about a clone volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sharedSpaceGib` | string (int64) | Output only. Shared space in GiB. Determined at volume creation time based on size of source snapshot. |
| `sourceSnapshot` | string | Output only. Specifies the full resource name of the source snapshot from which this volume was cloned. Format: projects/{project}/locations/{location}/volumes/{volume}/snapshots/{snapshot} |
| `sourceVolume` | string | Output only. Full name of the source volume resource. Format: projects/{project}/locations/{location}/volumes/{volume} |
| `splitState` | string enum | Output only. The current state of the clone split operation. Values: `SPLIT_STATE_UNSPECIFIED`, `SPLIT_STATE_NOT_SPLITTING`, `SPLIT_STATE_IN_PROGRESS`, `SPLIT_STATE_FAILED`. |

### `DailySchedule`

- Make a snapshot every day e.g. at 04:00, 05:20, 23:50
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hour` | number (double) | Set the hour to start the snapshot (0-23), defaults to midnight (0). |
| `minute` | number (double) | Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0). |
| `snapshotsToKeep` | number (double) | The maximum number of Snapshots to keep for the hourly schedule |

### `DestinationVolumeParameters`

- DestinationVolumeParameters specify input parameters used for creating destination volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description for the destination volume. |
| `shareName` | string | Destination volume's share name. If not specified, source volume's share name will be used. |
| `storagePool` | string | Required. Existing destination StoragePool name. |
| `tieringPolicy` | TieringPolicy | Optional. Tiering policy for the volume. |
| `volumeId` | string | Desired destination volume resource id. If not specified, source volume's resource id will be used. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. |

### `EncryptVolumesRequest`

- EncryptVolumesRequest specifies the KMS config to encrypt existing volumes.
- Version: v1

### `EstablishPeeringRequest`

- EstablishPeeringRequest establishes cluster and svm peerings between the source and the destination replications.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `peerClusterName` | string | Required. Name of the user's local source cluster to be peered with the destination cluster. |
| `peerIpAddresses` | array<string> | Optional. List of IPv4 ip addresses to be used for peering. |
| `peerSvmName` | string | Required. Name of the user's local source vserver svm to be peered with the destination vserver svm. |
| `peerVolumeName` | string | Required. Name of the user's local source volume to be peered with the destination volume. |

### `EstablishVolumePeeringRequest`

- EstablishVolumePeeringRequest establishes cluster and svm peerings between the source and destination clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `peerClusterName` | string | Required. Name of the user's local source cluster to be peered with the destination cluster. |
| `peerIpAddresses` | array<string> | Optional. List of IPv4 IP addresses to be used for peering. |
| `peerSvmName` | string | Required. Name of the user's local source vserver svm to be peered with the destination vserver svm. |
| `peerVolumeName` | string | Required. Name of the user's local source volume to be peered with the destination volume. |

### `ExecuteOntapDeleteResponse`

- Response message for `ExecuteOntapDelete` API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | object | The raw `JSON` body of the response. |

### `ExecuteOntapGetResponse`

- Response message for `ExecuteOntapGet` API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | object | The raw `JSON` body of the response. |

### `ExecuteOntapPatchRequest`

- Request message for `ExecuteOntapPatch` API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | object | Required. The raw `JSON` body of the request. The body should be in the format of the ONTAP resource. For example: { "body": { "field1": "value1", "field2": "value2", } } |

### `ExecuteOntapPatchResponse`

- Response message for `ExecuteOntapPatch` API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | object | The raw `JSON` body of the response. |

### `ExecuteOntapPostRequest`

- Request message for `ExecuteOntapPost` API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | object | Required. The raw `JSON` body of the request. The body should be in the format of the ONTAP resource. For example: { "body": { "field1": "value1", "field2": "value2", } } |

### `ExecuteOntapPostResponse`

- Response message for `ExecuteOntapPost` API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | object | The raw `JSON` body of the response. |

### `ExportPolicy`

- Defines the export policy for the volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rules` | array<SimpleExportPolicyRule> | Required. List of export policy rules |

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `HostGroup`

- Host group is a collection of hosts that can be used for accessing a Block Volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create time of the host group. |
| `description` | string | Optional. Description of the host group. |
| `hosts` | array<string> | Required. The list of hosts associated with the host group. |
| `labels` | object | Optional. Labels of the host group. |
| `name` | string | Identifier. The resource name of the host group. Format: `projects/{project_number}/locations/{location_id}/hostGroups/{host_group_id}`. |
| `osType` | string enum | Required. The OS type of the host group. It indicates the type of operating system used by all of the hosts in the HostGroup. All hosts in a HostGroup must be of the same OS type. This can be set only when creating a HostGroup. Values: `OS_TYPE_UNSPECIFIED`, `LINUX`, `WINDOWS`, `ESXI`. |
| `state` | string enum | Output only. State of the host group. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `UPDATING`, `DELETING`, `DISABLED`. |
| `type` | string enum | Required. Type of the host group. Values: `TYPE_UNSPECIFIED`, `ISCSI_INITIATOR`. |

### `HourlySchedule`

- Make a snapshot every hour e.g. at 04:00, 05:00, 06:00.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `minute` | number (double) | Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0). |
| `snapshotsToKeep` | number (double) | The maximum number of Snapshots to keep for the hourly schedule |

### `HybridPeeringDetails`

- HybridPeeringDetails contains details about the hybrid peering.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `command` | string | Output only. Copy-paste-able commands to be used on user's ONTAP to accept peering requests. |
| `commandExpiryTime` | string (google-datetime) | Output only. Expiration time for the peering command to be executed on user's ONTAP. |
| `passphrase` | string | Output only. Temporary passphrase generated to accept cluster peering command. |
| `peerClusterName` | string | Output only. Name of the user's local source cluster to be peered with the destination cluster. |
| `peerSvmName` | string | Output only. Name of the user's local source vserver svm to be peered with the destination vserver svm. |
| `peerVolumeName` | string | Output only. Name of the user's local source volume to be peered with the destination volume. |
| `subnetIp` | string | Output only. IP address of the subnet. |

### `HybridReplicationParameters`

- The Hybrid Replication parameters for the volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterLocation` | string | Optional. Name of source cluster location associated with the Hybrid replication. This is a free-form field for the display purpose only. |
| `description` | string | Optional. Description of the replication. |
| `hybridReplicationType` | string enum | Optional. Type of the hybrid replication. Values: `VOLUME_HYBRID_REPLICATION_TYPE_UNSPECIFIED`, `MIGRATION`, `CONTINUOUS_REPLICATION`, `ONPREM_REPLICATION`, `REVERSE_ONPREM_REPLICATION`. |
| `labels` | object | Optional. Labels to be added to the replication as the key value pairs. |
| `largeVolumeConstituentCount` | integer (int32) | Optional. Constituent volume count for large volume. |
| `peerClusterName` | string | Required. Name of the user's local source cluster to be peered with the destination cluster. |
| `peerIpAddresses` | array<string> | Required. List of node ip addresses to be peered with. |
| `peerSvmName` | string | Required. Name of the user's local source vserver svm to be peered with the destination vserver svm. |
| `peerVolumeName` | string | Required. Name of the user's local source volume to be peered with the destination volume. |
| `replication` | string | Required. Desired name for the replication of this volume. |
| `replicationSchedule` | string enum | Optional. Replication Schedule for the replication created. Values: `HYBRID_REPLICATION_SCHEDULE_UNSPECIFIED`, `EVERY_10_MINUTES`, `HOURLY`, `DAILY`. |

### `KmsConfig`

- KmsConfig is the customer-managed encryption key(CMEK) configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create time of the KmsConfig. |
| `cryptoKeyName` | string | Required. Customer-managed crypto key resource full name. Format: `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}` |
| `description` | string | Description of the KmsConfig. |
| `instructions` | string | Output only. Instructions to provide the access to the customer provided encryption key. |
| `labels` | object | Labels as key value pairs |
| `name` | string | Identifier. Name of the `KmsConfig`. Format: `projects/{project}/locations/{location}/kmsConfigs/{kms_config}` |
| `serviceAccount` | string | Output only. The Service account which will have access to the customer provided encryption key. |
| `state` | string enum | Output only. State of the KmsConfig. Values: `STATE_UNSPECIFIED`, `READY`, `CREATING`, `DELETING`, `UPDATING`, `IN_USE`, `ERROR`, `KEY_CHECK_PENDING`, `KEY_NOT_REACHABLE`, `DISABLING`, `DISABLED`, `MIGRATING`. |
| `stateDetails` | string | Output only. State details of the KmsConfig. |

### `LargeCapacityConfig`

- Configuration for a Large Capacity Volume. A Large Capacity Volume supports sizes ranging from 4.8 TiB to 20 PiB; it is composed of multiple internal constituents, and must be created in a large capacity pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constituentCount` | integer (int32) | Optional. The number of internal constituents (e.g., FlexVols) for this large volume. The minimum number of constituents is 2. |

### `ListActiveDirectoriesResponse`

- ListActiveDirectoriesResponse contains all the active directories requested.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeDirectories` | array<ActiveDirectory> | The list of active directories. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBackupConfigsResponse`

- Message for response to listing BackupConfigs in an ONTAP StoragePool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token you can use to retrieve the next page of results. Not returned if there are no more results in the list. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |
| `volumeBackupConfigs` | array<VolumeBackupConfig> | A list of backup configurations for volumes in the pool. |

### `ListBackupPoliciesResponse`

- ListBackupPoliciesResponse contains all the backup policies requested.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPolicies` | array<BackupPolicy> | The list of backup policies. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBackupVaultsResponse`

- ListBackupVaultsResponse is the result of ListBackupVaultsRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupVaults` | array<BackupVault> | A list of backupVaults in the project for the specified location. |
| `nextPageToken` | string | The token you can use to retrieve the next page of results. Not returned if there are no more results in the list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBackupsResponse`

- ListBackupsResponse is the result of ListBackupsRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backups` | array<Backup> | A list of backups in the project. |
| `nextPageToken` | string | The token you can use to retrieve the next page of results. Not returned if there are no more results in the list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListHostGroupsResponse`

- ListHostGroupsResponse is the response to a ListHostGroupsRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hostGroups` | array<HostGroup> | The list of host groups. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListKmsConfigsResponse`

- ListKmsConfigsResponse is the response to a ListKmsConfigsRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsConfigs` | array<KmsConfig> | The list of KmsConfigs |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
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

### `ListQuotaRulesResponse`

- ListQuotaRulesResponse is the response to a ListQuotaRulesRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `quotaRules` | array<QuotaRule> | List of quota rules |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListReplicationsResponse`

- ListReplicationsResponse is the result of ListReplicationsRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token you can use to retrieve the next page of results. Not returned if there are no more results in the list. |
| `replications` | array<Replication> | A list of replications in the project for the specified volume. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListSnapshotsResponse`

- ListSnapshotsResponse is the result of ListSnapshotsRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token you can use to retrieve the next page of results. Not returned if there are no more results in the list. |
| `snapshots` | array<Snapshot> | A list of snapshots in the project for the specified volume. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListStoragePoolsResponse`

- ListStoragePoolsResponse is the response to a ListStoragePoolsRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `storagePools` | array<StoragePool> | The list of StoragePools |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListVolumesResponse`

- Message for response to listing Volumes
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |
| `volumes` | array<Volume> | The list of Volume |

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

- Metadata for a given google.cloud.location.Location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `flexPerformanceTier` | string enum | Output only. Indicates the flex performance tier of this location. Values: `FLEX_PERFORMANCE_TIER_UNSPECIFIED`, `LIMITED`. |
| `hasOntapProxy` | boolean | Output only. Indicates if the location has ONTAP Proxy support. |
| `hasVcp` | boolean | Output only. Indicates if the location has VCP support. |
| `supportedFlexPerformance` | array<string> | Output only. Supported flex performance in a location. Values: `FLEX_PERFORMANCE_UNSPECIFIED`, `FLEX_PERFORMANCE_DEFAULT`, `FLEX_PERFORMANCE_CUSTOM`. |
| `supportedServiceLevels` | array<string> | Output only. Supported service levels in a location. Values: `SERVICE_LEVEL_UNSPECIFIED`, `PREMIUM`, `EXTREME`, `STANDARD`, `FLEX`. |

### `MonthlySchedule`

- Make a snapshot once a month e.g. at 2nd 04:00, 7th 05:20, 24th 23:50
- Version: v1

| Field | Type | Description |
|---|---|---|
| `daysOfMonth` | string | Set the day or days of the month to make a snapshot (1-31). Accepts a comma separated number of days. Defaults to '1'. |
| `hour` | number (double) | Set the hour to start the snapshot (0-23), defaults to midnight (0). |
| `minute` | number (double) | Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0). |
| `snapshotsToKeep` | number (double) | The maximum number of Snapshots to keep for the hourly schedule |

### `MountOption`

- View only mount options for a volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `export` | string | Export string |
| `exportFull` | string | Full export string |
| `instructions` | string | Instructions for mounting |
| `ipAddress` | string | Output only. IP Address. |
| `protocol` | string enum | Protocol to mount with. Values: `PROTOCOLS_UNSPECIFIED`, `NFSV3`, `NFSV4`, `SMB`, `ISCSI`, `NVME`. |

### `OntapSource`

- Represents ONTAP source details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `snapshotUuid` | string | Optional. The UUID of the ONTAP source snapshot. |
| `storagePool` | string | Required. Name of the storage pool. This must be specified for creating backups for ONTAP mode volumes. Format: `projects/{projects_id}/locations/{location}/storagePools/{storage_pool_id}` |
| `volumeUuid` | string | Required. The UUID of the ONTAP source volume. |

### `OntapVolumeTarget`

- Represents the ONTAP volume target of the restore operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `restoreDestinationPath` | string | Optional. Absolute directory path in the destination volume. |
| `volumeUuid` | string | Required. The UUID of the ONTAP volume to restore to. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been canceled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `QuotaRule`

- QuotaRule specifies the maximum disk space a user or group can use within a volume. They can be used for creating default and individual quota rules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create time of the quota rule |
| `description` | string | Optional. Description of the quota rule |
| `diskLimitMib` | integer (int32) | Required. The maximum allowed disk space in MiB. |
| `labels` | object | Optional. Labels of the quota rule |
| `name` | string | Identifier. The resource name of the quota rule. Format: `projects/{project_number}/locations/{location_id}/volumes/volumes/{volume_id}/quotaRules/{quota_rule_id}`. |
| `state` | string enum | Output only. State of the quota rule Values: `STATE_UNSPECIFIED`, `CREATING`, `UPDATING`, `DELETING`, `READY`, `ERROR`. |
| `stateDetails` | string | Output only. State details of the quota rule |
| `target` | string | Optional. The quota rule applies to the specified user or group, identified by a Unix UID/GID, Windows SID, or null for default. |
| `type` | string enum | Required. The type of quota rule. Values: `TYPE_UNSPECIFIED`, `INDIVIDUAL_USER_QUOTA`, `INDIVIDUAL_GROUP_QUOTA`, `DEFAULT_USER_QUOTA`, `DEFAULT_GROUP_QUOTA`. |

### `Replication`

- Replication is a nested resource under Volume, that describes a cross-region replication relationship between 2 volumes in different regions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterLocation` | string | Optional. Location of the user cluster. |
| `createTime` | string (google-datetime) | Output only. Replication create time. |
| `description` | string | A description about this replication relationship. |
| `destinationVolume` | string | Output only. Full name of destination volume resource. Example : "projects/{project}/locations/{location}/volumes/{volume_id}" |
| `destinationVolumeParameters` | DestinationVolumeParameters | Required. Input only. Destination volume parameters |
| `healthy` | boolean | Output only. Condition of the relationship. Can be one of the following: - true: The replication relationship is healthy. It has not missed the most recent scheduled transfer. - false: The replication relationship is not healthy. It has missed the most recent scheduled transfer. |
| `hybridPeeringDetails` | HybridPeeringDetails | Output only. Hybrid peering details. |
| `hybridReplicationType` | string enum | Output only. Type of the hybrid replication. Values: `HYBRID_REPLICATION_TYPE_UNSPECIFIED`, `MIGRATION`, `CONTINUOUS_REPLICATION`, `ONPREM_REPLICATION`, `REVERSE_ONPREM_REPLICATION`. |
| `hybridReplicationUserCommands` | UserCommands | Output only. Copy pastable snapmirror commands to be executed on onprem cluster by the customer. |
| `labels` | object | Resource labels to represent user provided metadata. |
| `mirrorState` | string enum | Output only. Indicates the state of mirroring. Values: `MIRROR_STATE_UNSPECIFIED`, `PREPARING`, `MIRRORED`, `STOPPED`, `TRANSFERRING`, `BASELINE_TRANSFERRING`, `ABORTED`, `EXTERNALLY_MANAGED`, `PENDING_PEERING`. |
| `name` | string | Identifier. The resource name of the Replication. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}`. |
| `replicationSchedule` | string enum | Required. Indicates the schedule for replication. Values: `REPLICATION_SCHEDULE_UNSPECIFIED`, `EVERY_10_MINUTES`, `HOURLY`, `DAILY`. |
| `role` | string enum | Output only. Indicates whether this points to source or destination. Values: `REPLICATION_ROLE_UNSPECIFIED`, `SOURCE`, `DESTINATION`. |
| `sourceVolume` | string | Output only. Full name of source volume resource. Example : "projects/{project}/locations/{location}/volumes/{volume_id}" |
| `state` | string enum | Output only. State of the replication. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `UPDATING`, `DELETING`, `ERROR`, `PENDING_CLUSTER_PEERING`, `PENDING_SVM_PEERING`, `PENDING_REMOTE_RESYNC`, `EXTERNALLY_MANAGED_REPLICATION`. |
| `stateDetails` | string | Output only. State details of the replication. |
| `transferStats` | TransferStats | Output only. Replication transfer statistics. |

### `RestoreBackupFilesRequest`

- RestoreBackupFilesRequest restores files from a backup to a volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | string | Required. The backup resource name, in the format `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id}` |
| `fileList` | array<string> | Required. List of files to be restored, specified by their absolute path in the source volume. |
| `restoreDestinationPath` | string | Optional. Absolute directory path in the destination volume. This is required if the `file_list` is provided. |

### `RestoreParameters`

- The RestoreParameters if volume is created from a snapshot or backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sourceBackup` | string | Full name of the backup resource. Format for standard backup: projects/{project}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id}. Format for BackupDR backup: projects/{project}/locations/{location}/backupVaults/{backup_vault}/dataSources/{data_source}/backups/{backup} |
| `sourceSnapshot` | string | Full name of the snapshot resource. Format: projects/{project}/locations/{location}/volumes/{volume}/snapshots/{snapshot} |

### `RestoreVolumeRequest`

- Request message for `RestoreVolume` API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupSource` | BackupSource | The backup source of the restore operation. |
| `ontapVolumeTarget` | OntapVolumeTarget | The ONTAP volume target of the restore operation. |

### `ResumeReplicationRequest`

- ResumeReplicationRequest resumes a stopped replication.
- Version: v1

### `ReverseReplicationDirectionRequest`

- ReverseReplicationDirectionRequest reverses direction of replication. Source becomes destination and destination becomes source.
- Version: v1

### `RevertVolumeRequest`

- RevertVolumeRequest reverts the given volume to the specified snapshot.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `snapshotId` | string | Required. The snapshot resource ID, in the format 'my-snapshot', where the specified ID is the {snapshot_id} of the fully qualified name like projects/{project_id}/locations/{location_id}/volumes/{volume_id}/snapshots/{snapshot_id} |

### `SimpleExportPolicyRule`

- An export policy rule describing various export options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessType` | string enum | Access type (ReadWrite, ReadOnly, None) Values: `ACCESS_TYPE_UNSPECIFIED`, `READ_ONLY`, `READ_WRITE`, `READ_NONE`. |
| `allowedClients` | string | Comma separated list of allowed clients IP addresses |
| `anonUid` | string (int64) | Optional. An integer representing the anonymous user ID. Range is 0 to `4294967295`. Required when `squash_mode` is `ROOT_SQUASH` or `ALL_SQUASH`. |
| `hasRootAccess` | string | Whether Unix root access will be granted. |
| `kerberos5ReadOnly` | boolean | If enabled (true) the rule defines a read only access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'authentication' kerberos security mode. |
| `kerberos5ReadWrite` | boolean | If enabled (true) the rule defines read and write access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'authentication' kerberos security mode. The 'kerberos5ReadOnly' value be ignored if this is enabled. |
| `kerberos5iReadOnly` | boolean | If enabled (true) the rule defines a read only access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'integrity' kerberos security mode. |
| `kerberos5iReadWrite` | boolean | If enabled (true) the rule defines read and write access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'integrity' kerberos security mode. The 'kerberos5iReadOnly' value be ignored if this is enabled. |
| `kerberos5pReadOnly` | boolean | If enabled (true) the rule defines a read only access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'privacy' kerberos security mode. |
| `kerberos5pReadWrite` | boolean | If enabled (true) the rule defines read and write access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'privacy' kerberos security mode. The 'kerberos5pReadOnly' value be ignored if this is enabled. |
| `nfsv3` | boolean | NFS V3 protocol. |
| `nfsv4` | boolean | NFS V4 protocol. |
| `squashMode` | string enum | Optional. Defines how user identity squashing is applied for this export rule. This field is the preferred way to configure squashing behavior and takes precedence over `has_root_access` if both are provided. Values: `SQUASH_MODE_UNSPECIFIED`, `NO_ROOT_SQUASH`, `ROOT_SQUASH`, `ALL_SQUASH`. |

### `Snapshot`

- Snapshot is a point-in-time version of a Volume's content.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the snapshot was created. |
| `description` | string | A description of the snapshot with 2048 characters or less. Requests with longer descriptions will be rejected. |
| `labels` | object | Resource labels to represent user provided metadata. |
| `name` | string | Identifier. The resource name of the snapshot. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}/snapshots/{snapshot_id}`. |
| `state` | string enum | Output only. The snapshot state. Values: `STATE_UNSPECIFIED`, `READY`, `CREATING`, `DELETING`, `UPDATING`, `DISABLED`, `ERROR`. |
| `stateDetails` | string | Output only. State details of the storage pool |
| `usedBytes` | number (double) | Output only. Current storage usage for the snapshot in bytes. |

### `SnapshotPolicy`

- Snapshot Policy for a volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dailySchedule` | DailySchedule | Daily schedule policy. |
| `enabled` | boolean | If enabled, make snapshots automatically according to the schedules. Default is false. |
| `hourlySchedule` | HourlySchedule | Hourly schedule policy. |
| `monthlySchedule` | MonthlySchedule | Monthly schedule policy. |
| `weeklySchedule` | WeeklySchedule | Weekly schedule policy. |

### `SplitStatus`

- Message for SplitStatus.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `progressPercent` | integer (int32) | Output only. The estimated progress percentage of the split operation (0-100). This is meaningful primarily when split_state is IN_PROGRESS. |
| `splitState` | string enum | Output only. The current state of the clone split operation. Values: `SPLIT_STATE_UNSPECIFIED`, `SPLIT_STATE_NOT_SPLITTING`, `SPLIT_STATE_IN_PROGRESS`, `SPLIT_STATE_FAILED`. |
| `stateDetails` | string | Output only. Human-readable details about the current state. Mostly used for displaying error messages during split failure Examples: "Split in progress", "Error: insufficient capacity". |

### `StartSplitRequest`

- Request message for splitting a volume.
- Version: v1

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StopReplicationRequest`

- StopReplicationRequest stops a replication until resumed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `force` | boolean | Indicates whether to stop replication forcefully while data transfer is in progress. Warning! if force is true, this will abort any current transfers and can lead to data loss due to partial transfer. If force is false, stop replication will fail while data transfer is in progress and you will need to retry later. |

### `StoragePool`

- StoragePool is a container for volumes with a service level and capacity. Volumes can be created in a pool of sufficient available capacity. StoragePool capacity is what you are billed for.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeDirectory` | string | Optional. Specifies the Active Directory to be used for creating a SMB volume. |
| `allowAutoTiering` | boolean | Optional. True if the storage pool supports Auto Tiering enabled volumes. Default is false. Auto-tiering can be enabled after storage pool creation but it can't be disabled once enabled. |
| `availableThroughputMibps` | number (double) | Output only. Available throughput of the storage pool (in MiB/s). |
| `capacityGib` | string (int64) | Required. Capacity in GIB of the pool |
| `coldTierSizeUsedGib` | string (int64) | Output only. Total cold tier data rounded down to the nearest GiB used by the storage pool. |
| `createTime` | string (google-datetime) | Output only. Create time of the storage pool |
| `customPerformanceEnabled` | boolean | Optional. True if using Independent Scaling of capacity and performance (Hyperdisk) By default set to false |
| `description` | string | Optional. Description of the storage pool |
| `enableHotTierAutoResize` | boolean | Optional. Flag indicating that the hot-tier threshold will be auto-increased by 10% of the hot-tier when it hits 100%. Default is true. The increment will kick in only if the new size after increment is still less than or equal to storage pool size. |
| `encryptionType` | string enum | Output only. Specifies the current pool encryption key source. Values: `ENCRYPTION_TYPE_UNSPECIFIED`, `SERVICE_MANAGED`, `CLOUD_KMS`. |
| `globalAccessAllowed` | boolean | Deprecated. Used to allow SO pool to access AD or DNS server from other regions. |
| `hotTierSizeGib` | string (int64) | Optional. Total hot tier capacity for the Storage Pool. It is applicable only to Flex service level. It should be less than the minimum storage pool size and cannot be more than the current storage pool size. It cannot be decreased once set. |
| `hotTierSizeUsedGib` | string (int64) | Output only. Total hot tier data rounded down to the nearest GiB used by the storage pool. |
| `kmsConfig` | string | Optional. Specifies the KMS config to be used for volume encryption. |
| `labels` | object | Optional. Labels as key value pairs |
| `ldapEnabled` | boolean | Optional. Flag indicating if the pool is NFS LDAP enabled or not. |
| `mode` | string enum | Optional. Mode of the storage pool. This field is used to control whether the user can perform ONTAP operations on the storage pool using the GCNV ONTAP Mode APIs. If not specified during creation, it defaults to `DEFAULT`. Values: `MODE_UNSPECIFIED`, `DEFAULT`, `ONTAP`. |
| `name` | string | Identifier. Name of the storage pool |
| `network` | string | Required. VPC Network name. Format: projects/{project}/global/networks/{network} |
| `psaRange` | string | Optional. This field is not implemented. The values provided in this field are ignored. |
| `qosType` | string enum | Optional. QoS (Quality of Service) Type of the storage pool Values: `QOS_TYPE_UNSPECIFIED`, `AUTO`, `MANUAL`. |
| `replicaZone` | string | Optional. Specifies the replica zone for regional storagePool. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use |
| `satisfiesPzs` | boolean | Output only. Reserved for future use |
| `scaleType` | string enum | Optional. The scale type of the storage pool. Defaults to `SCALE_TYPE_DEFAULT` if not specified. Values: `SCALE_TYPE_UNSPECIFIED`, `SCALE_TYPE_DEFAULT`, `SCALE_TYPE_SCALEOUT`. |
| `serviceLevel` | string enum | Required. Service level of the storage pool Values: `SERVICE_LEVEL_UNSPECIFIED`, `PREMIUM`, `EXTREME`, `STANDARD`, `FLEX`. |
| `state` | string enum | Output only. State of the storage pool Values: `STATE_UNSPECIFIED`, `READY`, `CREATING`, `DELETING`, `UPDATING`, `RESTORING`, `DISABLED`, `ERROR`. |
| `stateDetails` | string | Output only. State details of the storage pool |
| `totalIops` | string (int64) | Optional. Custom Performance Total IOPS of the pool if not provided, it will be calculated based on the total_throughput_mibps |
| `totalThroughputMibps` | string (int64) | Optional. Custom Performance Total Throughput of the pool (in MiBps) |
| `type` | string enum | Optional. Type of the storage pool. This field is used to control whether the pool supports `FILE` based volumes only or `UNIFIED` (both `FILE` and `BLOCK`) volumes. If not specified during creation, it defaults to `FILE`. Values: `STORAGE_POOL_TYPE_UNSPECIFIED`, `FILE`, `UNIFIED`. |
| `volumeCapacityGib` | string (int64) | Output only. Allocated size of all volumes in GIB in the storage pool |
| `volumeCount` | integer (int32) | Output only. Volume count of the storage pool |
| `zone` | string | Optional. Specifies the active zone for regional storagePool. |

### `StoragePool` (v1beta1)

- StoragePool is a container for volumes with a service level and capacity. Volumes can be created in a pool of sufficient available capacity. StoragePool capacity is what you are billed for.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `activeDirectory` | string | Optional. Specifies the Active Directory to be used for creating a SMB volume. |
| `allowAutoTiering` | boolean | Optional. True if the storage pool supports Auto Tiering enabled volumes. Default is false. Auto-tiering can be enabled after storage pool creation but it can't be disabled once enabled. |
| `availableThroughputMibps` | number (double) | Output only. Available throughput of the storage pool (in MiB/s). |
| `capacityGib` | string (int64) | Required. Capacity in GIB of the pool |
| `coldTierSizeUsedGib` | string (int64) | Output only. Total cold tier data rounded down to the nearest GiB used by the storage pool. |
| `createTime` | string (google-datetime) | Output only. Create time of the storage pool |
| `customPerformanceEnabled` | boolean | Optional. True if using Independent Scaling of capacity and performance (Hyperdisk) By default set to false |
| `description` | string | Optional. Description of the storage pool |
| `enableHotTierAutoResize` | boolean | Optional. Flag indicating that the hot-tier threshold will be auto-increased by 10% of the hot-tier when it hits 100%. Default is true. The increment will kick in only if the new size after increment is still less than or equal to storage pool size. |
| `encryptionType` | string enum | Output only. Specifies the current pool encryption key source. Values: `ENCRYPTION_TYPE_UNSPECIFIED`, `SERVICE_MANAGED`, `CLOUD_KMS`. |
| `globalAccessAllowed` | boolean | Deprecated. Used to allow SO pool to access AD or DNS server from other regions. |
| `hotTierSizeGib` | string (int64) | Optional. Total hot tier capacity for the Storage Pool. It is applicable only to Flex service level. It should be less than the minimum storage pool size and cannot be more than the current storage pool size. It cannot be decreased once set. |
| `hotTierSizeUsedGib` | string (int64) | Output only. Total hot tier data rounded down to the nearest GiB used by the storage pool. |
| `kmsConfig` | string | Optional. Specifies the KMS config to be used for volume encryption. |
| `labels` | object | Optional. Labels as key value pairs |
| `ldapEnabled` | boolean | Optional. Flag indicating if the pool is NFS LDAP enabled or not. |
| `mode` | string enum | Optional. Mode of the storage pool. This field is used to control whether the user can perform ONTAP operations on the storage pool using the GCNV ONTAP Mode APIs. If not specified during creation, it defaults to `DEFAULT`. Values: `MODE_UNSPECIFIED`, `DEFAULT`, `ONTAP`. |
| `name` | string | Identifier. Name of the storage pool |
| `network` | string | Required. VPC Network name. Format: projects/{project}/global/networks/{network} |
| `psaRange` | string | Optional. This field is not implemented. The values provided in this field are ignored. |
| `qosType` | string enum | Optional. QoS (Quality of Service) Type of the storage pool Values: `QOS_TYPE_UNSPECIFIED`, `AUTO`, `MANUAL`. |
| `replicaZone` | string | Optional. Specifies the replica zone for regional storagePool. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use |
| `satisfiesPzs` | boolean | Output only. Reserved for future use |
| `scaleTier` | string enum | Optional. Deprecated: Use scale_type instead. The effective scale tier of the storage pool. If `scale_tier` is not specified during creation, this defaults to `SCALE_TIER_STANDARD`. Values: `SCALE_TIER_UNSPECIFIED`, `SCALE_TIER_STANDARD`, `SCALE_TIER_ENTERPRISE`. |
| `scaleType` | string enum | Optional. The scale type of the storage pool. Defaults to `SCALE_TYPE_DEFAULT` if not specified. Values: `SCALE_TYPE_UNSPECIFIED`, `SCALE_TYPE_DEFAULT`, `SCALE_TYPE_SCALEOUT`. |
| `serviceLevel` | string enum | Required. Service level of the storage pool Values: `SERVICE_LEVEL_UNSPECIFIED`, `PREMIUM`, `EXTREME`, `STANDARD`, `FLEX`. |
| `state` | string enum | Output only. State of the storage pool Values: `STATE_UNSPECIFIED`, `READY`, `CREATING`, `DELETING`, `UPDATING`, `RESTORING`, `DISABLED`, `ERROR`. |
| `stateDetails` | string | Output only. State details of the storage pool |
| `totalIops` | string (int64) | Optional. Custom Performance Total IOPS of the pool if not provided, it will be calculated based on the total_throughput_mibps |
| `totalThroughputMibps` | string (int64) | Optional. Custom Performance Total Throughput of the pool (in MiBps) |
| `type` | string enum | Optional. Type of the storage pool. This field is used to control whether the pool supports `FILE` based volumes only or `UNIFIED` (both `FILE` and `BLOCK`) volumes. If not specified during creation, it defaults to `FILE`. Values: `STORAGE_POOL_TYPE_UNSPECIFIED`, `FILE`, `UNIFIED`. |
| `volumeCapacityGib` | string (int64) | Output only. Allocated size of all volumes in GIB in the storage pool |
| `volumeCount` | integer (int32) | Output only. Volume count of the storage pool |
| `zone` | string | Optional. Specifies the active zone for regional storagePool. |

### `SwitchActiveReplicaZoneRequest`

- SwitchActiveReplicaZoneRequest switch the active/replica zone for a regional storagePool.
- Version: v1

### `SyncReplicationRequest`

- SyncReplicationRequest syncs the replication from source to destination.
- Version: v1

### `TieringPolicy`

- Defines tiering policy for the volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `coolingThresholdDays` | integer (int32) | Optional. Time in days to mark the volume's data block as cold and make it eligible for tiering, can be range from 2-183. Default is 31. |
| `hotTierBypassModeEnabled` | boolean | Optional. Flag indicating that the hot tier bypass mode is enabled. Default is false. This is only applicable to Flex service level. |
| `tierAction` | string enum | Optional. Flag indicating if the volume has tiering policy enable/pause. Default is PAUSED. Values: `TIER_ACTION_UNSPECIFIED`, `ENABLED`, `PAUSED`. |

### `TransferStats`

- TransferStats reports all statistics related to replication transfer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lagDuration` | string (google-duration) | Lag duration indicates the duration by which Destination region volume content lags behind the primary region volume content. |
| `lastTransferBytes` | string (int64) | Last transfer size in bytes. |
| `lastTransferDuration` | string (google-duration) | Time taken during last transfer. |
| `lastTransferEndTime` | string (google-datetime) | Time when last transfer completed. |
| `lastTransferError` | string | A message describing the cause of the last transfer failure. |
| `totalTransferDuration` | string (google-duration) | Cumulative time taken across all transfers for the replication relationship. |
| `transferBytes` | string (int64) | Cumulative bytes transferred so far for the replication relationship. |
| `updateTime` | string (google-datetime) | Time when progress was updated last. |

### `UpdateBackupConfigRequest`

- Request message for UpdateBackupConfig
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupConfig` | BackupConfig | Required. Backup configuration to apply. |
| `updateMask` | string (google-fieldmask) | Required. Field mask is used to specify the fields to be overwritten in the BackupConfig for the Volume. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. |
| `volumeUuid` | string | Required. The UUID of the ONTAP-mode volume. |

### `UserCommands`

- UserCommands contains the commands to be executed by the customer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commands` | array<string> | Output only. List of commands to be executed by the customer. |

### `ValidateDirectoryServiceRequest`

- ValidateDirectoryServiceRequest validates the directory service policy attached to the storage pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `directoryServiceType` | string enum | Type of directory service policy attached to the storage pool. Values: `DIRECTORY_SERVICE_TYPE_UNSPECIFIED`, `ACTIVE_DIRECTORY`. |

### `VerifyKmsConfigRequest`

- VerifyKmsConfigRequest specifies the KMS config to be validated.
- Version: v1

### `VerifyKmsConfigResponse`

- VerifyKmsConfigResponse contains the information if the config is correctly and error message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthError` | string | Output only. Error message if config is not healthy. |
| `healthy` | boolean | Output only. If the customer key configured correctly to the encrypt volume. |
| `instructions` | string | Output only. Instructions for the customers to provide the access to the encryption key. |

### `Volume`

- Volume provides a filesystem that you can mount.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeDirectory` | string | Output only. Specifies the ActiveDirectory name of a SMB volume. |
| `backupConfig` | BackupConfig | BackupConfig of the volume. |
| `blockDevices` | array<BlockDevice> | Optional. Block devices for the volume. Currently, only one block device is permitted per Volume. |
| `cacheParameters` | CacheParameters | Optional. Cache parameters for the volume. |
| `capacityGib` | string (int64) | Required. Capacity in GIB of the volume |
| `cloneDetails` | CloneDetails | Output only. If this volume is a clone, this field contains details about the clone. |
| `coldTierSizeGib` | string (int64) | Output only. Size of the volume cold tier data rounded down to the nearest GiB. |
| `createTime` | string (google-datetime) | Output only. Create time of the volume |
| `description` | string | Optional. Description of the volume |
| `encryptionType` | string enum | Output only. Specified the current volume encryption key source. Values: `ENCRYPTION_TYPE_UNSPECIFIED`, `SERVICE_MANAGED`, `CLOUD_KMS`. |
| `exportPolicy` | ExportPolicy | Optional. Export policy of the volume |
| `hasReplication` | boolean | Output only. Indicates whether the volume is part of a replication relationship. |
| `hotTierSizeUsedGib` | string (int64) | Output only. Total hot tier data rounded down to the nearest GiB used by the Volume. This field is only used for flex Service Level |
| `hybridReplicationParameters` | HybridReplicationParameters | Optional. The Hybrid Replication parameters for the volume. |
| `kerberosEnabled` | boolean | Optional. Flag indicating if the volume is a kerberos volume or not, export policy rules control kerberos security modes (krb5, krb5i, krb5p). |
| `kmsConfig` | string | Output only. Specifies the KMS config to be used for volume encryption. |
| `labels` | object | Optional. Labels as key value pairs |
| `largeCapacity` | boolean | Optional. Flag indicating if the volume will be a large capacity volume or a regular volume. This field is used for legacy FILE pools. For Unified pools, use the `large_capacity_config` field instead. This field and `large_capacity_config` are mutually exclusive. |
| `largeCapacityConfig` | LargeCapacityConfig | Optional. Large capacity config for the volume. Enables and configures large capacity for volumes in Unified pools with File protocols. Not applicable for Block protocols in Unified pools. This field and the legacy `large_capacity` boolean field are mutually exclusive. |
| `ldapEnabled` | boolean | Output only. Flag indicating if the volume is NFS LDAP enabled or not. |
| `mountOptions` | array<MountOption> | Output only. Mount options of this volume |
| `multipleEndpoints` | boolean | Optional. Flag indicating if the volume will have an IP address per node for volumes supporting multiple IP endpoints. Only the volume with large_capacity will be allowed to have multiple endpoints. |
| `name` | string | Identifier. Name of the volume |
| `network` | string | Output only. VPC Network name. Format: projects/{project}/global/networks/{network} |
| `protocols` | array<string> | Required. Protocols required for the volume Values: `PROTOCOLS_UNSPECIFIED`, `NFSV3`, `NFSV4`, `SMB`, `ISCSI`, `NVME`. |
| `psaRange` | string | Output only. This field is not implemented. The values provided in this field are ignored. |
| `replicaZone` | string | Output only. Specifies the replica zone for regional volume. |
| `restoreParameters` | RestoreParameters | Optional. Specifies the source of the volume to be created from. |
| `restrictedActions` | array<string> | Optional. List of actions that are restricted on this volume. Values: `RESTRICTED_ACTION_UNSPECIFIED`, `DELETE`. |
| `securityStyle` | string enum | Optional. Security Style of the Volume Values: `SECURITY_STYLE_UNSPECIFIED`, `NTFS`, `UNIX`. |
| `serviceLevel` | string enum | Output only. Service level of the volume Values: `SERVICE_LEVEL_UNSPECIFIED`, `PREMIUM`, `EXTREME`, `STANDARD`, `FLEX`. |
| `shareName` | string | Required. Share name of the volume |
| `smbSettings` | array<string> | Optional. SMB share settings for the volume. Values: `SMB_SETTINGS_UNSPECIFIED`, `ENCRYPT_DATA`, `BROWSABLE`, `CHANGE_NOTIFY`, `NON_BROWSABLE`, `OPLOCKS`, `SHOW_SNAPSHOT`, `SHOW_PREVIOUS_VERSIONS`, `ACCESS_BASED_ENUMERATION`, `CONTINUOUSLY_AVAILABLE`. |
| `snapReserve` | number (double) | Optional. Snap_reserve specifies percentage of volume storage reserved for snapshot storage. Default is 0 percent. |
| `snapshotDirectory` | boolean | Optional. Snapshot_directory if enabled (true) the volume will contain a read-only .snapshot directory which provides access to each of the volume's snapshots. |
| `snapshotPolicy` | SnapshotPolicy | Optional. SnapshotPolicy for a volume. |
| `state` | string enum | Output only. State of the volume Values: `STATE_UNSPECIFIED`, `READY`, `CREATING`, `DELETING`, `UPDATING`, `RESTORING`, `DISABLED`, `ERROR`, `PREPARING`, `READ_ONLY`. |
| `stateDetails` | string | Output only. State details of the volume |
| `storagePool` | string | Required. StoragePool name of the volume |
| `throughputMibps` | number (double) | Optional. Throughput of the volume (in MiB/s) |
| `tieringPolicy` | TieringPolicy | Tiering policy for the volume. |
| `unixPermissions` | string | Optional. Default unix style permission (e.g. 777) the mount point will be created with. Applicable for NFS protocol types only. |
| `usedGib` | string (int64) | Output only. Used capacity in GIB of the volume. This is computed periodically and it does not represent the realtime usage. |
| `zone` | string | Output only. Specifies the active zone for regional volume. |

### `VolumeBackupConfig`

- Backup configuration for a volume in a pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupConfig` | BackupConfig | Backup configuration for the volume. |
| `volumeUuid` | string | Provides the Ontap UUID of the volume within the pool. |

### `WeeklySchedule`

- Make a snapshot every week e.g. at Monday 04:00, Wednesday 05:20, Sunday 23:50
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | string | Set the day or days of the week to make a snapshot. Accepts a comma separated days of the week. Defaults to 'Sunday'. |
| `hour` | number (double) | Set the hour to start the snapshot (0-23), defaults to midnight (0). |
| `minute` | number (double) | Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0). |
| `snapshotsToKeep` | number (double) | The maximum number of Snapshots to keep for the hourly schedule |

### Shape of `ActiveDirectory`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "administrators": "array<string>",
  "aesEncryption": "boolean",
  "backupOperators": "array<string>",
  "createTime": "string (google-datetime)",
  "description": "string",
  "dns": "string",
  "domain": "string",
  "encryptDcConnections": "boolean",
  "kdcHostname": "string",
  "kdcIp": "string",
  "labels": "object",
  "ldapSigning": "boolean",
  "name": "string",
  "netBiosPrefix": "string",
  "nfsUsersWithLdap": "boolean",
  "organizationalUnit": "string",
  "password": "string",
  "securityOperators": "array<string>",
  "site": "string",
  "state": "string enum",
  "stateDetails": "string",
  "username": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `netapp` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the `name` format of the quota rule methods repeats `volumes` (`.../volumes/volumes/{volume_id}/quotaRules/{quota_rule_id}`); the path pattern in Discovery is `projects/{project_number}/locations/{location_id}/volumes/{volume_id}/quotaRules/{quota_rule_id}`.
- Source: https://netapp.googleapis.com/$discovery/rest?version=v1, https://netapp.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
