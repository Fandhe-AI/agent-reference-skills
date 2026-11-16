---
source: https://gkebackup.googleapis.com/$discovery/rest?version=v1
---

# Backup for GKE API message schemas (gkebackup)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/gkebackup/`.

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

### `BDRBackupPlanJobLog`

- Log entry for BDRBackupPlanJobLog for resources using BackupPlan based protection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlanName` | string | Canonical resource name for Backup Plan Plan of the job. |
| `endTime` | string (google-datetime) | End time of the job. |
| `errorCode` | integer (int32) | The error code. Only populated in error scenarios. |
| `errorMessage` | string | The user readable error message. Only populated in error scenarios. |
| `errorType` | string | The name of the error type eg. PERMISSION_DENIED. Only populated in error scenarios. |
| `jobCategory` | string | The category field displays the category of the job. Can be one of \[UPDATE_BACKUP_PLAN\]. |
| `jobId` | string | The job_id field displays the identifier of the job being reported. |
| `jobStatus` | string | The status field displays the status of the job. Can be one of \[RUNNING,SUCCESSFUL, FAILED\]. |
| `newBackupPlanRevisionId` | string | User friendly revision id e.g. v0, v1 etc. |
| `newBackupPlanRevisionName` | string | Full resource name for new backup plan revision |
| `previousBackupPlanRevisionId` | string | User friendly revision id e.g. v0, v1 etc. |
| `previousBackupPlanRevisionName` | string | Full resource name for previous backup plan revision |
| `previousBackupRules` | array<BackupRuleDetail> | Previous Backup Plan rules. |
| `resourceType` | string | The resource_type field displays the type of the protected resource. |
| `revisedBackupRules` | array<BackupRuleDetail> | Revised Backup Plan rules. |
| `startTime` | string (google-datetime) | Start time of the job. |
| `workloadsAffectedCount` | integer (int32) | The total number of workloads affected by the job. |

### `BDRBackupRestoreJobLog`

- Log entry for Backup and Restore Job for resources using BackupPlan based protection. Next Id: 28
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoProtectionPolicy` | string | The auto-protection policy that created the backup. |
| `autoProtectionPolicyBinding` | string | The auto-protection policy binding that created the backup. |
| `backupConsistencyTime` | string (google-datetime) | Backup consistency time. |
| `backupName` | string | Full resource name of the backup created in backup jobs and used in restore jobs. |
| `backupPlanName` | string | Full resource name for Backup Plan of the job. Only populated for Scheduled Backup and Adhoc Backup. |
| `backupRetentionDays` | integer (int32) | Backup retention in days. |
| `backupRule` | string | Name of the backup rule. Only populated for Scheduled Backup and Adhoc Backup. |
| `backupVaultName` | string | Full resource name backup vault name |
| `dataSourceName` | string | Canonical Data Source Name |
| `endTime` | string (google-datetime) | End time of the job. |
| `errorCode` | integer (int32) | The error code. Only populated in error scenarios. |
| `errorMessage` | string | The user readable error message. Only populated in error scenarios. |
| `errorType` | string | The name of the error type eg. PERMISSION_DENIED. Only populated in error scenarios. |
| `incrementalBackupSizeGib` | number (double) | The amount of incremental backup data copied. |
| `jobCategory` | string | The category field displays the category of the job. |
| `jobId` | string | The job_id field displays the identifier of the job being logged. |
| `jobStatus` | string | The status field displays the status of the job. |
| `recoveryPointTime` | string (google-datetime) | Recovery point time. |
| `resourceType` | string | The resource_type field displays the type of the protected resource. |
| `restoreResourceLocation` | string | Restore resource location. |
| `restoreResourceName` | string | Full resource name of the restore resource. Only populated in restore jobs. |
| `sourceResourceId` | string | The source resource ID. |
| `sourceResourceLocation` | string | Source resource location. |
| `sourceResourceName` | string | Full resource name of the protected resource. |
| `startTime` | string (google-datetime) | Start time of the job. |
| `storageTier` | string | The storage tier associated with the backup. |
| `targetResourceType` | string | The target resource type for restore jobs. |

### `Backup`

- Represents a request to perform a single point-in-time capture of some portion of the state of a GKE cluster, the record of the backup operation itself, and an anchor for the underlying artifacts that comprise the Backup (the config backup and VolumeBackups).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allNamespaces` | boolean | Output only. If True, all namespaces were included in the Backup. |
| `clusterMetadata` | ClusterMetadata | Output only. Information about the GKE cluster from which this Backup was created. |
| `completeTime` | string (google-datetime) | Output only. Completion time of the Backup |
| `configBackupSizeBytes` | string (int64) | Output only. The size of the config backup in bytes. |
| `containsSecrets` | boolean | Output only. Whether or not the Backup contains Kubernetes Secrets. Controlled by the parent BackupPlan's include_secrets value. |
| `containsVolumeData` | boolean | Output only. Whether or not the Backup contains volume data. Controlled by the parent BackupPlan's include_volume_data value. |
| `createTime` | string (google-datetime) | Output only. The timestamp when this Backup resource was created. |
| `deleteLockDays` | integer (int32) | Optional. Minimum age for this Backup (in days). If this field is set to a non-zero value, the Backup will be "locked" against deletion (either manual or automatic deletion) for the number of days provided (measured from the creation time of the Backup). MUST be an integer value between 0-90 (inclusive). Defaults to parent BackupPlan's backup_delete_lock_days setting and may only be increased (either at creation time or in a subsequent update). |
| `deleteLockExpireTime` | string (google-datetime) | Output only. The time at which an existing delete lock will expire for this backup (calculated from create_time + delete_lock_days). |
| `description` | string | Optional. User specified descriptive string for this Backup. |
| `encryptionKey` | EncryptionKey | Output only. The customer managed encryption key that was used to encrypt the Backup's artifacts. Inherited from the parent BackupPlan's encryption_key value. |
| `etag` | string | Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a backup from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform backup updates in order to avoid race conditions: An `etag` is returned in the response to `GetBackup`, and systems are expected to put that etag in the request to `UpdateBackup` or `DeleteBackup` to ensure that their change will be applied to the same version of the resource. |
| `labels` | object | Optional. A set of custom labels supplied by user. |
| `manual` | boolean | Output only. This flag indicates whether this Backup resource was created manually by a user or via a schedule in the BackupPlan. A value of True means that the Backup was created manually. |
| `name` | string | Output only. Identifier. The fully qualified name of the Backup. `projects/*/locations/*/backupPlans/*/backups/*` |
| `namespaceCount` | integer (int32) | Output only. The total number of user managed namespaces contained in the Backup. |
| `permissiveMode` | boolean | Output only. If false, Backup will fail when Backup for GKE detects Kubernetes configuration that is non-standard or requires additional setup to restore. Inherited from the parent BackupPlan's permissive_mode value. |
| `podCount` | integer (int32) | Output only. The total number of Kubernetes Pods contained in the Backup. |
| `resourceCount` | integer (int32) | Output only. The total number of Kubernetes resources included in the Backup. |
| `retainDays` | integer (int32) | Optional. The age (in days) after which this Backup will be automatically deleted. Must be an integer value >= 0: - If 0, no automatic deletion will occur for this Backup. - If not 0, this must be >= delete_lock_days and <= 365. Once a Backup is created, this value may only be increased. Defaults to the parent BackupPlan's backup_retain_days value. |
| `retainExpireTime` | string (google-datetime) | Output only. The time at which this Backup will be automatically deleted (calculated from create_time + retain_days). |
| `satisfiesPzi` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selectedApplications` | NamespacedNames | Output only. If set, the list of ProtectedApplications whose resources were included in the Backup. |
| `selectedNamespaceLabels` | ResourceLabels | Output only. If set, the list of labels whose constituent namespaces were included in the Backup. |
| `selectedNamespaces` | Namespaces | Output only. If set, the list of namespaces that were included in the Backup. |
| `sizeBytes` | string (int64) | Output only. The total size of the Backup in bytes = config backup size + sum(volume backup sizes) |
| `state` | string enum | Output only. Current state of the Backup Values: `STATE_UNSPECIFIED`, `CREATING`, `IN_PROGRESS`, `SUCCEEDED`, `FAILED`, `DELETING`. |
| `stateReason` | string | Output only. Human-readable description of why the backup is in the current `state`. This field is only meant for human readability and should not be used programmatically as this field is not guaranteed to be consistent. |
| `troubleshootingInfo` | TroubleshootingInfo | Output only. Information about the troubleshooting steps which will provide debugging information to the end users. |
| `uid` | string | Output only. Server generated global unique identifier of UUID4 (https://en.wikipedia.org/wiki/Universally_unique_identifier) |
| `updateTime` | string (google-datetime) | Output only. The timestamp when this Backup resource was last updated. |
| `volumeCount` | integer (int32) | Output only. The total number of volume backups contained in the Backup. |

### `BackupChannel`

- A BackupChannel imposes constraints on where clusters can be backed up. The BackupChannel should be in the same project and region as the cluster being backed up. The backup can be created only in destination_project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when this BackupChannel resource was created. |
| `description` | string | Optional. User specified descriptive string for this BackupChannel. |
| `destinationProject` | string | Required. Immutable. The project where Backups are allowed to be stored. The format is `projects/{projectId}` or `projects/{projectNumber}`. |
| `destinationProjectId` | string | Output only. The project_id where Backups are allowed to be stored. Example Project ID: "my-project-id". This will be an OUTPUT_ONLY field to return the project_id of the destination project. |
| `etag` | string | Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a BackupChannel from overwriting each other. It is strongly suggested that systems make use of the 'etag' in the read-modify-write cycle to perform BackupChannel updates in order to avoid race conditions: An `etag` is returned in the response to `GetBackupChannel`, and systems are expected to put that etag in the request to `UpdateBackupChannel` or `DeleteBackupChannel` to ensure that their change will be applied to the same version of the resource. |
| `labels` | object | Optional. A set of custom labels supplied by user. |
| `name` | string | Identifier. The fully qualified name of the BackupChannel. `projects/*/locations/*/backupChannels/*` |
| `uid` | string | Output only. Server generated global unique identifier of UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier) format. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when this BackupChannel resource was last updated. |

### `BackupConfig`

- BackupConfig defines the configuration of Backups created via this BackupPlan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allNamespaces` | boolean | If True, include all namespaced resources |
| `encryptionKey` | EncryptionKey | Optional. This defines a customer managed encryption key that will be used to encrypt the "config" portion (the Kubernetes resources) of Backups created via this plan. Default (empty): Config backup artifacts will not be encrypted. |
| `includeSecrets` | boolean | Optional. This flag specifies whether Kubernetes Secret resources should be included when they fall into the scope of Backups. Default: False |
| `includeVolumeData` | boolean | Optional. This flag specifies whether volume data should be backed up when PVCs are included in the scope of a Backup. Default: False |
| `permissiveMode` | boolean | Optional. If false, Backups will fail when Backup for GKE detects Kubernetes configuration that is non-standard or requires additional setup to restore. Default: False |
| `selectedApplications` | NamespacedNames | If set, include just the resources referenced by the listed ProtectedApplications. |
| `selectedNamespaceLabels` | ResourceLabels | If set, the list of labels whose constituent namespaces were included in the Backup. |
| `selectedNamespaces` | Namespaces | If set, include just the resources in the listed namespaces. |

### `BackupConfigDetails`

- BackupConfigDetails defines the configuration of Backups created via this BackupPlan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allNamespaces` | boolean | Output only. If True, include all namespaced resources |
| `encryptionKey` | EncryptionKey | Output only. This defines a customer managed encryption key that will be used to encrypt the "config" portion (the Kubernetes resources) of Backups created via this plan. Default (empty): Config backup artifacts will not be encrypted. |
| `includeSecrets` | boolean | Output only. This flag specifies whether Kubernetes Secret resources should be included when they fall into the scope of Backups. Default: False |
| `includeVolumeData` | boolean | Output only. This flag specifies whether volume data should be backed up when PVCs are included in the scope of a Backup. Default: False |
| `selectedApplications` | NamespacedNames | Output only. If set, include just the resources referenced by the listed ProtectedApplications. |
| `selectedNamespaces` | Namespaces | Output only. If set, include just the resources in the listed namespaces. |

### `BackupPlan`

- Defines the configuration and scheduling for a "line" of Backups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupChannel` | string | Output only. The fully qualified name of the BackupChannel to be used to create a backup. This field is set only if the cluster being backed up is in a different project. `projects/*/locations/*/backupChannels/*` |
| `backupConfig` | BackupConfig | Optional. Defines the configuration of Backups created via this BackupPlan. |
| `backupSchedule` | Schedule | Optional. Defines a schedule for automatic Backup creation via this BackupPlan. |
| `cluster` | string | Required. Immutable. The source cluster from which Backups will be created via this BackupPlan. Valid formats: - `projects/*/locations/*/clusters/*` - `projects/*/zones/*/clusters/*` |
| `createTime` | string (google-datetime) | Output only. The timestamp when this BackupPlan resource was created. |
| `deactivated` | boolean | Optional. This flag indicates whether this BackupPlan has been deactivated. Setting this field to True locks the BackupPlan such that no further updates will be allowed (except deletes), including the deactivated field itself. It also prevents any new Backups from being created via this BackupPlan (including scheduled Backups). Default: False |
| `description` | string | Optional. User specified descriptive string for this BackupPlan. |
| `etag` | string | Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a backup plan from overwriting each other. It is strongly suggested that systems make use of the 'etag' in the read-modify-write cycle to perform BackupPlan updates in order to avoid race conditions: An `etag` is returned in the response to `GetBackupPlan`, and systems are expected to put that etag in the request to `UpdateBackupPlan` or `DeleteBackupPlan` to ensure that their change will be applied to the same version of the resource. |
| `labels` | object | Optional. A set of custom labels supplied by user. |
| `lastSuccessfulBackupTime` | string (google-datetime) | Output only. Completion time of the last successful Backup. This is sourced from a successful Backup's complete_time field. This field is added to maintain consistency with BackupPlanBinding to display last successful backup time. |
| `name` | string | Output only. Identifier. The full name of the BackupPlan resource. Format: `projects/*/locations/*/backupPlans/*` |
| `protectedNamespaceCount` | integer (int32) | Output only. The number of user managed namespaces backed up in the last successful Backup created via this BackupPlan. |
| `protectedPodCount` | integer (int32) | Output only. The number of Kubernetes Pods backed up in the last successful Backup created via this BackupPlan. |
| `retentionPolicy` | RetentionPolicy | Optional. RetentionPolicy governs lifecycle of Backups created under this plan. |
| `rpoRiskLevel` | integer (int32) | Output only. A number that represents the current risk level of this BackupPlan from RPO perspective with 1 being no risk and 5 being highest risk. |
| `rpoRiskReason` | string | Output only. Human-readable description of why the BackupPlan is in the current rpo_risk_level and action items if any. |
| `state` | string enum | Output only. State of the BackupPlan. This State field reflects the various stages a BackupPlan can be in during the Create operation. It will be set to "DEACTIVATED" if the BackupPlan is deactivated on an Update Values: `STATE_UNSPECIFIED`, `CLUSTER_PENDING`, `PROVISIONING`, `READY`, `FAILED`, `DEACTIVATED`, `DELETING`. |
| `stateReason` | string | Output only. Human-readable description of why BackupPlan is in the current `state`. This field is only meant for human readability and should not be used programmatically as this field is not guaranteed to be consistent. |
| `uid` | string | Output only. Server generated global unique identifier of UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier) format. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when this BackupPlan resource was last updated. |

### `BackupPlanBinding`

- A BackupPlanBinding binds a BackupPlan with a BackupChannel. This resource is created automatically when a BackupPlan is created using a BackupChannel. This also serves as a holder for cross-project fields that need to be displayed in the current project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlan` | string | Output only. Immutable. The fully qualified name of the BackupPlan bound with the parent BackupChannel. `projects/*/locations/*/backupPlans/{backup_plan}` |
| `backupPlanDetails` | BackupPlanDetails | Output only. Contains details about the backup plan/backup. |
| `cluster` | string | Output only. Immutable. The fully qualified name of the cluster that is being backed up Valid formats: - `projects/*/locations/*/clusters/*` - `projects/*/zones/*/clusters/*` |
| `createTime` | string (google-datetime) | Output only. The timestamp when this binding was created. |
| `etag` | string | Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a BackupPlanBinding from overwriting each other. It is strongly suggested that systems make use of the 'etag' in the read-modify-write cycle to perform BackupPlanBinding updates in order to avoid race conditions: An `etag` is returned in the response to `GetBackupPlanBinding`, and systems are expected to put that etag in the request to `UpdateBackupPlanBinding` or `DeleteBackupPlanBinding` to ensure that their change will be applied to the same version of the resource. |
| `name` | string | Identifier. The fully qualified name of the BackupPlanBinding. `projects/*/locations/*/backupChannels/*/backupPlanBindings/*` |
| `uid` | string | Output only. Server generated global unique identifier of UUID4 (https://en.wikipedia.org/wiki/Universally_unique_identifier) |
| `updateTime` | string (google-datetime) | Output only. The timestamp when this binding was created. |

### `BackupPlanDetails`

- Contains metadata about the backup plan/backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupConfigDetails` | BackupConfigDetails | Output only. Contains details about the BackupConfig of Backups created via this BackupPlan. |
| `lastSuccessfulBackup` | string | Output only. The fully qualified name of the last successful Backup created under this BackupPlan. `projects/*/locations/*/backupPlans/*/backups/*` |
| `lastSuccessfulBackupTime` | string (google-datetime) | Output only. Completion time of the last successful Backup. This is sourced from a successful Backup's complete_time field. |
| `nextScheduledBackupTime` | string (google-datetime) | Output only. Start time of next scheduled backup under this BackupPlan by either cron_schedule or rpo config. This is sourced from BackupPlan. |
| `protectedPodCount` | integer (int32) | Output only. The number of Kubernetes Pods backed up in the last successful Backup created via this BackupPlan. |
| `retentionPolicyDetails` | RetentionPolicyDetails | Output only. Contains details about the RetentionPolicy of Backups created via this BackupPlan. |
| `rpoRiskLevel` | integer (int32) | Output only. A number that represents the current risk level of this BackupPlan from RPO perspective with 1 being no risk and 5 being highest risk. |
| `state` | string enum | Output only. State of the BackupPlan. Values: `STATE_UNSPECIFIED`, `CLUSTER_PENDING`, `PROVISIONING`, `READY`, `FAILED`, `DEACTIVATED`, `DELETING`. |

### `BackupRuleDetail`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupWindow` | string | Backup Window For Eg. “00:00 to 06:00” |
| `backupWindowTimezone` | string | Backup Window Timezone in IANA format. For Eg. “America/Los_Angeles” |
| `recurrence` | string | Recurrence Type. For Eg. “Weekly”,” Monthly” or “Daily”. |
| `recurrenceSchedule` | string | Recurrence Repeat Schedule. For Eg. “1st and 25th day of the month.” |
| `retentionDays` | integer (int32) | Backup Retention in Days. |
| `ruleName` | string | Backup Rule Name. |
| `storageTier` | string | The storage tier of the BackupRule. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `ClusterMetadata`

- Information about the GKE cluster from which this Backup was created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `anthosVersion` | string | Output only. Anthos version |
| `backupCrdVersions` | object | Output only. A list of the Backup for GKE CRD versions found in the cluster. |
| `cluster` | string | Output only. The source cluster from which this Backup was created. Valid formats: - `projects/*/locations/*/clusters/*` - `projects/*/zones/*/clusters/*` This is inherited from the parent BackupPlan's cluster field. |
| `gkeVersion` | string | Output only. GKE version |
| `k8sVersion` | string | Output only. The Kubernetes server version of the source cluster. |

### `ClusterResourceRestoreScope`

- Defines the scope of cluster-scoped resources to restore. Some group kinds are not reasonable choices for a restore, and will cause an error if selected here. Any scope selection that would restore "all valid" resources automatically excludes these group kinds. - Node - ComponentStatus - gkebackup.gke.io/BackupJob - gkebackup.gke.io/RestoreJob - metrics.k8s.io/NodeMetrics - migration.k8s.io/StorageState - migration.k8s.io/StorageVersionMigration - snapshot.storage.k8s.io/VolumeSnapshotContent - storage.k8s.io/CSINode - storage.k8s.io/VolumeAttachment Some group kinds are driven by restore configuration elsewhere, and will cause an error if selected here. - Namespace - PersistentVolume
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allGroupKinds` | boolean | Optional. If True, all valid cluster-scoped resources will be restored. Mutually exclusive to any other field in the message. |
| `excludedGroupKinds` | array<GroupKind> | Optional. A list of cluster-scoped resource group kinds to NOT restore from the backup. If specified, all valid cluster-scoped resources will be restored except for those specified in the list. Mutually exclusive to any other field in the message. |
| `noGroupKinds` | boolean | Optional. If True, no cluster-scoped resources will be restored. This has the same restore scope as if the message is not defined. Mutually exclusive to any other field in the message. |
| `selectedGroupKinds` | array<GroupKind> | Optional. A list of cluster-scoped resource group kinds to restore from the backup. If specified, only the selected resources will be restored. Mutually exclusive to any other field in the message. |

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `DayOfWeekList`

- Holds repeated DaysOfWeek values as a container.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `daysOfWeek` | array<string> | Optional. A list of days of week. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EncryptionKey`

- Defined a customer managed encryption key that will be used to encrypt Backup artifacts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcpKmsEncryptionKey` | string | Optional. Google Cloud KMS encryption key. Format: `projects/*/locations/*/keyRings/*/cryptoKeys/*` |

### `ExclusionWindow`

- Defines a time window during which no backup should happen. All time and date are in UTC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `daily` | boolean | The exclusion window occurs every day if set to "True". Specifying this field to "False" is an error. |
| `daysOfWeek` | DayOfWeekList | The exclusion window occurs on these days of each week in UTC. |
| `duration` | string (google-duration) | Required. Specifies duration of the window. Duration must be >= 5 minutes and < (target RPO - 20 minutes). Additional restrictions based on the recurrence type to allow some time for backup to happen: - single_occurrence_date: no restriction, but UI may warn about this when duration >= target RPO - daily window: duration < 24 hours - weekly window: - days of week includes all seven days of a week: duration < 24 hours - all other weekly window: duration < 168 hours (i.e., 24 \* 7 hours) |
| `singleOccurrenceDate` | Date | No recurrence. The exclusion window occurs only once and on this date in UTC. |
| `startTime` | TimeOfDay | Optional. Specifies the start time of the window using time of the day in UTC. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `Filter`

- Defines the filter for `Restore`. This filter can be used to further refine the resource selection of the `Restore` beyond the coarse-grained scope defined in the `RestorePlan`. `exclusion_filters` take precedence over `inclusion_filters`. If a resource matches both `inclusion_filters` and `exclusion_filters`, it will not be restored.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exclusionFilters` | array<ResourceSelector> | Optional. Excludes resources from restoration. If specified, a resource will not be restored if it matches any `ResourceSelector` of the `exclusion_filters`. |
| `inclusionFilters` | array<ResourceSelector> | Optional. Selects resources for restoration. If specified, only resources which match `inclusion_filters` will be selected for restoration. A resource will be selected if it matches any `ResourceSelector` of the `inclusion_filters`. |

### `GetBackupIndexDownloadUrlResponse`

- Response message for GetBackupIndexDownloadUrl.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `signedUrl` | string | Required. The signed URL for downloading the backup index. |

### `GetTagsRequest`

- Request message for GetTags.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The full resource name of the service resource. |

### `GetTagsResponse`

- Response message for GetTags.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | A checksum based on the current bindings. This field is always set in server responses. |
| `name` | string | Required. The full resource name of the service resource. |
| `tags` | object | Required. Tag keys/values directly bound to this resource. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" |

### `GoogleLongrunningCancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `GoogleLongrunningListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<GoogleLongrunningOperation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `GoogleLongrunningOperation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | GoogleRpcStatus | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `GoogleRpcStatus`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `GroupKind`

- This is a direct map to the Kubernetes GroupKind type GroupKind (https://godoc.org/k8s.io/apimachinery/pkg/runtime/schema#GroupKind) and is used for identifying specific "types" of resources to restore.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceGroup` | string | Optional. API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io", "storage.k8s.io", etc. Note: use empty string for core API group. |
| `resourceKind` | string | Optional. Kind of a Kubernetes resource, must be in UpperCamelCase (PascalCase) and singular form. E.g. "CustomResourceDefinition", "StorageClass", etc. |

### `GroupKindDependency`

- Defines a dependency between two group kinds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requiring` | GroupKind | Required. The requiring group kind requires that the other group kind be restored first. |
| `satisfying` | GroupKind | Required. The satisfying group kind must be restored first in order to satisfy the dependency. |

### `Label`

- A single Kubernetes label-value pair.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Optional. The key/name of the label. |
| `value` | string | Optional. The value of the label. |

### `ListBackupChannelsResponse`

- Response message for ListBackupChannels.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupChannels` | array<BackupChannel> | The list of BackupChannels matching the given criteria. |
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListBackupChannels` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBackupPlanBindingsResponse`

- Response message for ListBackupPlanBindings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlanBindings` | array<BackupPlanBinding> | The list of BackupPlanBindings matching the given criteria. |
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListBackupPlanBindingss` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBackupPlansResponse`

- Response message for ListBackupPlans.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlans` | array<BackupPlan> | The list of BackupPlans matching the given criteria. |
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListBackupPlans` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBackupsResponse`

- Response message for ListBackups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backups` | array<Backup> | The list of Backups matching the given criteria. |
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListBackups` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListRestoreChannelsResponse`

- Response message for ListRestoreChannels.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListRestoreChannels` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `restoreChannels` | array<RestoreChannel> | The list of RestoreChannels matching the given criteria. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListRestorePlanBindingsResponse`

- Response message for ListRestorePlanBindings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListRestorePlanBindings` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `restorePlanBindings` | array<RestorePlanBinding> | The list of RestorePlanBindings matching the given criteria. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListRestorePlansResponse`

- Response message for ListRestorePlans.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListRestorePlans` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `restorePlans` | array<RestorePlan> | The list of RestorePlans matching the given criteria. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListRestoresResponse`

- Response message for ListRestores.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListRestores` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `restores` | array<Restore> | The list of Restores matching the given criteria. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListVolumeBackupsResponse`

- Response message for ListVolumeBackups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListVolumeBackups` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `volumeBackups` | array<VolumeBackup> | The list of VolumeBackups matching the given criteria. |

### `ListVolumeRestoresResponse`

- Response message for ListVolumeRestores.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token which may be sent as page_token in a subsequent `ListVolumeRestores` call to retrieve the next page of results. If this field is omitted or empty, then there are no more results to return. |
| `volumeRestores` | array<VolumeRestore> | The list of VolumeRestores matching the given criteria. |

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

### `NamespacedName`

- A reference to a namespaced resource in Kubernetes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. The name of the Kubernetes resource. |
| `namespace` | string | Optional. The Namespace of the Kubernetes resource. |

### `NamespacedNames`

- A list of namespaced Kubernetes resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `namespacedNames` | array<NamespacedName> | Optional. A list of namespaced Kubernetes resources. |

### `Namespaces`

- A list of Kubernetes Namespaces.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `namespaces` | array<string> | Optional. A list of Kubernetes Namespaces. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `ResourceFilter`

- ResourceFilter specifies matching criteria to limit the scope of a change to a specific set of kubernetes resources that are selected for restoration from a backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `groupKinds` | array<GroupKind> | Optional. (Filtering parameter) Any resource subject to transformation must belong to one of the listed "types". If this field is not provided, no type filtering will be performed (all resources of all types matching previous filtering parameters will be candidates for transformation). |
| `jsonPath` | string | Optional. This is a \[JSONPath\] (https://github.com/json-path/JsonPath/blob/master/README.md) expression that matches specific fields of candidate resources and it operates as a filtering parameter (resources that are not matched with this expression will not be candidates for transformation). |
| `namespaces` | array<string> | Optional. (Filtering parameter) Any resource subject to transformation must be contained within one of the listed Kubernetes Namespace in the Backup. If this field is not provided, no namespace filtering will be performed (all resources in all Namespaces, including all cluster-scoped resources, will be candidates for transformation). |

### `ResourceLabels`

- A list of Kubernetes labels.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceLabels` | array<Label> | Optional. A list of Kubernetes label-value pairs. |

### `ResourceSelector`

- Defines a selector to identify a single or a group of resources. Conditions in the selector are optional, but at least one field should be set to a non-empty value. If a condition is not specified, no restrictions will be applied on that dimension. If more than one condition is specified, a resource will be selected if and only if all conditions are met.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `groupKind` | GroupKind | Optional. Selects resources using their Kubernetes GroupKinds. If specified, only resources of provided GroupKind will be selected. |
| `labels` | object | Optional. Selects resources using Kubernetes labels (https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/). If specified, a resource will be selected if and only if the resource has all of the provided labels and all the label values match. |
| `name` | string | Optional. Selects resources using their resource names. If specified, only resources with the provided name will be selected. |
| `namespace` | string | Optional. Selects resources using their namespaces. This only applies to namespace scoped resources and cannot be used for selecting cluster scoped resources. If specified, only resources in the provided namespace will be selected. If not specified, the filter will apply to both cluster scoped and namespace scoped resources (e.g. name or label). The Namespace (https://pkg.go.dev/k8s.io/api/core/v1#Namespace) resource itself will be restored if and only if any resources within the namespace are restored. |

### `Restore`

- Represents both a request to Restore some portion of a Backup into a target GKE cluster and a record of the restore operation itself.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | string | Required. Immutable. A reference to the Backup used as the source from which this Restore will restore. Note that this Backup must be a sub-resource of the RestorePlan's backup_plan. Format: `projects/*/locations/*/backupPlans/*/backups/*`. |
| `cluster` | string | Output only. The target cluster into which this Restore will restore data. Valid formats: - `projects/*/locations/*/clusters/*` - `projects/*/zones/*/clusters/*` Inherited from parent RestorePlan's cluster value. |
| `completeTime` | string (google-datetime) | Output only. Timestamp of when the restore operation completed. |
| `createTime` | string (google-datetime) | Output only. The timestamp when this Restore resource was created. |
| `description` | string | Optional. User specified descriptive string for this Restore. |
| `etag` | string | Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a restore from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform restore updates in order to avoid race conditions: An `etag` is returned in the response to `GetRestore`, and systems are expected to put that etag in the request to `UpdateRestore` or `DeleteRestore` to ensure that their change will be applied to the same version of the resource. |
| `filter` | Filter | Optional. Immutable. Filters resources for `Restore`. If not specified, the scope of the restore will remain the same as defined in the `RestorePlan`. If this is specified and no resources are matched by the `inclusion_filters` or everything is excluded by the `exclusion_filters`, nothing will be restored. This filter can only be specified if the value of namespaced_resource_restore_mode is set to `MERGE_SKIP_ON_CONFLICT`, `MERGE_REPLACE_VOLUME_ON_CONFLICT` or `MERGE_REPLACE_ON_CONFLICT`. |
| `labels` | object | A set of custom labels supplied by user. |
| `name` | string | Output only. Identifier. The full name of the Restore resource. Format: `projects/*/locations/*/restorePlans/*/restores/*` |
| `resourcesExcludedCount` | integer (int32) | Output only. Number of resources excluded during the restore execution. |
| `resourcesFailedCount` | integer (int32) | Output only. Number of resources that failed to be restored during the restore execution. |
| `resourcesRestoredCount` | integer (int32) | Output only. Number of resources restored during the restore execution. |
| `restoreConfig` | RestoreConfig | Output only. Configuration of the Restore. Inherited from parent RestorePlan's restore_config. |
| `state` | string enum | Output only. The current state of the Restore. Values: `STATE_UNSPECIFIED`, `CREATING`, `IN_PROGRESS`, `SUCCEEDED`, `FAILED`, `DELETING`, `VALIDATING`. |
| `stateReason` | string | Output only. Human-readable description of why the Restore is in its current state. This field is only meant for human readability and should not be used programmatically as this field is not guaranteed to be consistent. |
| `troubleshootingInfo` | TroubleshootingInfo | Output only. Information about the troubleshooting steps which will provide debugging information to the end users. |
| `uid` | string | Output only. Server generated global unique identifier of UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier) format. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when this Restore resource was last updated. |
| `volumeDataRestorePolicyOverrides` | array<VolumeDataRestorePolicyOverride> | Optional. Immutable. Overrides the volume data restore policies selected in the Restore Config for override-scoped resources. |
| `volumesRestoredCount` | integer (int32) | Output only. Number of volumes restored during the restore execution. |

### `RestoreChannel`

- A RestoreChannel imposes constraints on where backups can be restored. The RestoreChannel should be in the same project and region as the backups. The backups can only be restored in the `destination_project`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when this RestoreChannel was created. |
| `description` | string | Optional. User specified descriptive string for this RestoreChannel. |
| `destinationProject` | string | Required. Immutable. The project into which the backups will be restored. The format is `projects/{projectId}` or `projects/{projectNumber}`. |
| `destinationProjectId` | string | Output only. The project_id where backups will be restored. Example Project ID: "my-project-id". This will be an OUTPUT_ONLY field to return the project_id of the destination project. |
| `etag` | string | Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a RestoreChannel from overwriting each other. It is strongly suggested that systems make use of the 'etag' in the read-modify-write cycle to perform RestoreChannel updates in order to avoid race conditions: An `etag` is returned in the response to `GetRestoreChannel`, and systems are expected to put that etag in the request to `UpdateRestoreChannel` or `DeleteRestoreChannel` to ensure that their change will be applied to the same version of the resource. |
| `labels` | object | Optional. A set of custom labels supplied by user. |
| `name` | string | Identifier. The fully qualified name of the RestoreChannel. `projects/*/locations/*/restoreChannels/*` |
| `uid` | string | Output only. Server generated global unique identifier of UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier) format. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when this RestoreChannel was last updated. |

### `RestoreConfig`

- Configuration of a restore.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allNamespaces` | boolean | Restore all namespaced resources in the Backup if set to "True". Specifying this field to "False" is an error. |
| `clusterResourceConflictPolicy` | string enum | Optional. Defines the behavior for handling the situation where cluster-scoped resources being restored already exist in the target cluster. This MUST be set to a value other than CLUSTER_RESOURCE_CONFLICT_POLICY_UNSPECIFIED if cluster_resource_restore_scope is not empty. Values: `CLUSTER_RESOURCE_CONFLICT_POLICY_UNSPECIFIED`, `USE_EXISTING_VERSION`, `USE_BACKUP_VERSION`. |
| `clusterResourceRestoreScope` | ClusterResourceRestoreScope | Optional. Identifies the cluster-scoped resources to restore from the Backup. Not specifying it means NO cluster resource will be restored. |
| `excludedNamespaces` | Namespaces | A list of selected namespaces excluded from restoration. All namespaces except those in this list will be restored. |
| `namespacedResourceRestoreMode` | string enum | Optional. Defines the behavior for handling the situation where sets of namespaced resources being restored already exist in the target cluster. This MUST be set to a value other than NAMESPACED_RESOURCE_RESTORE_MODE_UNSPECIFIED. Values: `NAMESPACED_RESOURCE_RESTORE_MODE_UNSPECIFIED`, `DELETE_AND_RESTORE`, `FAIL_ON_CONFLICT`, `MERGE_SKIP_ON_CONFLICT`, `MERGE_REPLACE_VOLUME_ON_CONFLICT`, `MERGE_REPLACE_ON_CONFLICT`. |
| `noNamespaces` | boolean | Do not restore any namespaced resources if set to "True". Specifying this field to "False" is not allowed. |
| `restoreOrder` | RestoreOrder | Optional. RestoreOrder contains custom ordering to use on a Restore. |
| `selectedApplications` | NamespacedNames | A list of selected ProtectedApplications to restore. The listed ProtectedApplications and all the resources to which they refer will be restored. |
| `selectedNamespaces` | Namespaces | A list of selected Namespaces to restore from the Backup. The listed Namespaces and all resources contained in them will be restored. |
| `substitutionRules` | array<SubstitutionRule> | Optional. A list of transformation rules to be applied against Kubernetes resources as they are selected for restoration from a Backup. Rules are executed in order defined - this order matters, as changes made by a rule may impact the filtering logic of subsequent rules. An empty list means no substitution will occur. |
| `transformationRules` | array<TransformationRule> | Optional. A list of transformation rules to be applied against Kubernetes resources as they are selected for restoration from a Backup. Rules are executed in order defined - this order matters, as changes made by a rule may impact the filtering logic of subsequent rules. An empty list means no transformation will occur. |
| `volumeDataRestorePolicy` | string enum | Optional. Specifies the mechanism to be used to restore volume data. Default: VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED (will be treated as NO_VOLUME_DATA_RESTORATION). Values: `VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED`, `RESTORE_VOLUME_DATA_FROM_BACKUP`, `REUSE_VOLUME_HANDLE_FROM_BACKUP`, `NO_VOLUME_DATA_RESTORATION`. |
| `volumeDataRestorePolicyBindings` | array<VolumeDataRestorePolicyBinding> | Optional. A table that binds volumes by their scope to a restore policy. Bindings must have a unique scope. Any volumes not scoped in the bindings are subject to the policy defined in volume_data_restore_policy. |

### `RestoreOrder`

- Allows customers to specify dependencies between resources that Backup for GKE can use to compute a resasonable restore order.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `groupKindDependencies` | array<GroupKindDependency> | Optional. Contains a list of group kind dependency pairs provided by the customer, that is used by Backup for GKE to generate a group kind restore order. |

### `RestorePlan`

- The configuration of a potential series of Restore operations to be performed against Backups belong to a particular BackupPlan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlan` | string | Required. Immutable. A reference to the BackupPlan from which Backups may be used as the source for Restores created via this RestorePlan. Format: `projects/*/locations/*/backupPlans/*`. |
| `cluster` | string | Required. Immutable. The target cluster into which Restores created via this RestorePlan will restore data. NOTE: the cluster's region must be the same as the RestorePlan. Valid formats: - `projects/*/locations/*/clusters/*` - `projects/*/zones/*/clusters/*` |
| `createTime` | string (google-datetime) | Output only. The timestamp when this RestorePlan resource was created. |
| `description` | string | Optional. User specified descriptive string for this RestorePlan. |
| `etag` | string | Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a restore from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform restore updates in order to avoid race conditions: An `etag` is returned in the response to `GetRestorePlan`, and systems are expected to put that etag in the request to `UpdateRestorePlan` or `DeleteRestorePlan` to ensure that their change will be applied to the same version of the resource. |
| `labels` | object | Optional. A set of custom labels supplied by user. |
| `name` | string | Output only. Identifier. The full name of the RestorePlan resource. Format: `projects/*/locations/*/restorePlans/*`. |
| `restoreChannel` | string | Output only. The fully qualified name of the RestoreChannel to be used to create a RestorePlan. This field is set only if the `backup_plan` is in a different project than the RestorePlan. Format: `projects/*/locations/*/restoreChannels/*` |
| `restoreConfig` | RestoreConfig | Required. Configuration of Restores created via this RestorePlan. |
| `state` | string enum | Output only. State of the RestorePlan. This State field reflects the various stages a RestorePlan can be in during the Create operation. Values: `STATE_UNSPECIFIED`, `CLUSTER_PENDING`, `READY`, `FAILED`, `DELETING`. |
| `stateReason` | string | Output only. Human-readable description of why RestorePlan is in the current `state`. This field is only meant for human readability and should not be used programmatically as this field is not guaranteed to be consistent. |
| `uid` | string | Output only. Server generated global unique identifier of UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier) format. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when this RestorePlan resource was last updated. |

### `RestorePlanBinding`

- A RestorePlanBinding binds a RestorePlan with a RestoreChannel. This resource is created automatically when a RestorePlan is created using a RestoreChannel. This also serves as a holder for cross-project fields that need to be displayed in the current project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPlan` | string | Output only. The fully qualified name of the BackupPlan bound to the specified RestorePlan. `projects/*/locations/*/backukpPlans/{backup_plan}` |
| `createTime` | string (google-datetime) | Output only. The timestamp when this binding was created. |
| `etag` | string | Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a RestorePlanBinding from overwriting each other. It is strongly suggested that systems make use of the 'etag' in the read-modify-write cycle to perform RestorePlanBinding updates in order to avoid race conditions: An `etag` is returned in the response to `GetRestorePlanBinding`, and systems are expected to put that etag in the request to `UpdateRestorePlanBinding` or `DeleteRestorePlanBinding` to ensure that their change will be applied to the same version of the resource. |
| `name` | string | Identifier. The fully qualified name of the RestorePlanBinding. `projects/*/locations/*/restoreChannels/*/restorePlanBindings/*` |
| `restorePlan` | string | Output only. The fully qualified name of the RestorePlan bound to this RestoreChannel. `projects/*/locations/*/restorePlans/{restore_plan}` |
| `uid` | string | Output only. Server generated global unique identifier of UUID4 (https://en.wikipedia.org/wiki/Universally_unique_identifier) |
| `updateTime` | string (google-datetime) | Output only. The timestamp when this binding was created. |

### `RetentionPolicy`

- RetentionPolicy defines a Backup retention policy for a BackupPlan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupDeleteLockDays` | integer (int32) | Optional. Minimum age for Backups created via this BackupPlan (in days). This field MUST be an integer value between 0-90 (inclusive). A Backup created under this BackupPlan will NOT be deletable until it reaches Backup's (create_time + backup_delete_lock_days). Updating this field of a BackupPlan does NOT affect existing Backups under it. Backups created AFTER a successful update will inherit the new value. Default: 0 (no delete blocking) |
| `backupRetainDays` | integer (int32) | Optional. The default maximum age of a Backup created via this BackupPlan. This field MUST be an integer value >= 0 and <= 365. If specified, a Backup created under this BackupPlan will be automatically deleted after its age reaches (create_time + backup_retain_days). If not specified, Backups created under this BackupPlan will NOT be subject to automatic deletion. Updating this field does NOT affect existing Backups under it. Backups created AFTER a successful update will automatically pick up the new value. NOTE: backup_retain_days must be >= backup_delete_lock_days. If cron_schedule is defined, then this must be <= 360 \* the creation interval. If rpo_config is defined, then this must be <= 360 \* target_rpo_minutes / (1440minutes/day). Default: 0 (no automatic deletion) |
| `locked` | boolean | Optional. This flag denotes whether the retention policy of this BackupPlan is locked. If set to True, no further update is allowed on this policy, including the `locked` field itself. Default: False |

### `RetentionPolicyDetails`

- RetentionPolicyDetails defines a Backup retention policy for a BackupPlan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupDeleteLockDays` | integer (int32) | Optional. Minimum age for Backups created via this BackupPlan (in days). This field MUST be an integer value between 0-90 (inclusive). A Backup created under this BackupPlan will NOT be deletable until it reaches Backup's (create_time + backup_delete_lock_days). Updating this field of a BackupPlan does NOT affect existing Backups under it. Backups created AFTER a successful update will inherit the new value. Default: 0 (no delete blocking) |
| `backupRetainDays` | integer (int32) | Optional. The default maximum age of a Backup created via this BackupPlan. This field MUST be an integer value >= 0 and <= 365. If specified, a Backup created under this BackupPlan will be automatically deleted after its age reaches (create_time + backup_retain_days). If not specified, Backups created under this BackupPlan will NOT be subject to automatic deletion. Default: 0 (no automatic deletion) |

### `RpoConfig`

- Defines RPO scheduling configuration for automatically creating Backups via this BackupPlan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exclusionWindows` | array<ExclusionWindow> | Optional. User specified time windows during which backup can NOT happen for this BackupPlan - backups should start and finish outside of any given exclusion window. Note: backup jobs will be scheduled to start and finish outside the duration of the window as much as possible, but running jobs will not get canceled when it runs into the window. All the time and date values in exclusion_windows entry in the API are in UTC. We only allow <=1 recurrence (daily or weekly) exclusion window for a BackupPlan while no restriction on number of single occurrence windows. |
| `targetRpoMinutes` | integer (int32) | Required. Defines the target RPO for the BackupPlan in minutes, which means the target maximum data loss in time that is acceptable for this BackupPlan. This must be at least 60, i.e., 1 hour, and at most 86400, i.e., 60 days. |

### `Schedule`

- Defines scheduling parameters for automatically creating Backups via this BackupPlan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cronSchedule` | string | Optional. A standard cron (https://wikipedia.com/wiki/cron) string that defines a repeating schedule for creating Backups via this BackupPlan. This is mutually exclusive with the rpo_config field since at most one schedule can be defined for a BackupPlan. If this is defined, then backup_retain_days must also be defined. Default (empty): no automatic backup creation will occur. |
| `nextScheduledBackupTime` | string (google-datetime) | Output only. Start time of next scheduled backup under this BackupPlan by either cron_schedule or rpo config. |
| `paused` | boolean | Optional. This flag denotes whether automatic Backup creation is paused for this BackupPlan. Default: False |
| `rpoConfig` | RpoConfig | Optional. Defines the RPO schedule configuration for this BackupPlan. This is mutually exclusive with the cron_schedule field since at most one schedule can be defined for a BackupPLan. If this is defined, then backup_retain_days must also be defined. Default (empty): no automatic backup creation will occur. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `SetTagsRequest`

- Request message for SetTags.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. A checksum based on the current bindings which can be passed to prevent race conditions. If not passed, etag check would be skipped. |
| `name` | string | Required. The full resource name of the service resource. |
| `requestId` | string | Optional. A unique identifier for this request. Must be a valid UUID. This request is only idempotent if a `request_id` is provided. |
| `tags` | object | Required. These bindings will override any bindings previously set and will be effective immediately. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" |

### `SetTagsResponse`

- Response message for SetTags.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | A checksum based on the current bindings. This field is always set in server responses. |
| `name` | string | Required. The full resource name of the service resource. |
| `tags` | object | Required. Tag keys/values directly bound to this resource. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" |

### `SubstitutionRule`

- A transformation rule to be applied against Kubernetes resources as they are selected for restoration from a Backup. A rule contains both filtering logic (which resources are subject to substitution) and substitution logic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `newValue` | string | Optional. This is the new value to set for any fields that pass the filtering and selection criteria. To remove a value from a Kubernetes resource, either leave this field unspecified, or set it to the empty string (""). |
| `originalValuePattern` | string | Optional. (Filtering parameter) This is a \[regular expression\] (https://en.wikipedia.org/wiki/Regular_expression) that is compared against the fields matched by the target_json_path expression (and must also have passed the previous filters). Substitution will not be performed against fields whose value does not match this expression. If this field is NOT specified, then ALL fields matched by the target_json_path expression will undergo substitution. Note that an empty (e.g., "", rather than unspecified) value for this field will only match empty fields. |
| `targetGroupKinds` | array<GroupKind> | Optional. (Filtering parameter) Any resource subject to substitution must belong to one of the listed "types". If this field is not provided, no type filtering will be performed (all resources of all types matching previous filtering parameters will be candidates for substitution). |
| `targetJsonPath` | string | Required. This is a \[JSONPath\] (https://kubernetes.io/docs/reference/kubectl/jsonpath/) expression that matches specific fields of candidate resources and it operates as both a filtering parameter (resources that are not matched with this expression will not be candidates for substitution) as well as a field identifier (identifies exactly which fields out of the candidate resources will be modified). |
| `targetNamespaces` | array<string> | Optional. (Filtering parameter) Any resource subject to substitution must be contained within one of the listed Kubernetes Namespace in the Backup. If this field is not provided, no namespace filtering will be performed (all resources in all Namespaces, including all cluster-scoped resources, will be candidates for substitution). To mix cluster-scoped and namespaced resources in the same rule, use an empty string ("") as one of the target namespaces. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `TimeOfDay`

- Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hours` | integer (int32) | Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `nanos` | integer (int32) | Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |
| `seconds` | integer (int32) | Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |

### `TransformationRule`

- A transformation rule to be applied against Kubernetes resources as they are selected for restoration from a Backup. A rule contains both filtering logic (which resources are subject to transform) and transformation logic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. The description is a user specified string description of the transformation rule. |
| `fieldActions` | array<TransformationRuleAction> | Required. A list of transformation rule actions to take against candidate resources. Actions are executed in order defined - this order matters, as they could potentially interfere with each other and the first operation could affect the outcome of the second operation. |
| `resourceFilter` | ResourceFilter | Optional. This field is used to specify a set of fields that should be used to determine which resources in backup should be acted upon by the supplied transformation rule actions, and this will ensure that only specific resources are affected by transformation rule actions. |

### `TransformationRuleAction`

- TransformationRuleAction defines a TransformationRule action based on the JSON Patch RFC (https://www.rfc-editor.org/rfc/rfc6902)
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fromPath` | string | Optional. A string containing a JSON Pointer value that references the location in the target document to move the value from. |
| `op` | string enum | Required. op specifies the operation to perform. Values: `OP_UNSPECIFIED`, `REMOVE`, `MOVE`, `COPY`, `ADD`, `TEST`, `REPLACE`. |
| `path` | string | Optional. A string containing a JSON-Pointer value that references a location within the target document where the operation is performed. |
| `value` | string | Optional. A string that specifies the desired value in string format to use for transformation. |

### `TroubleshootingInfo`

- Stores information about troubleshooting doc for debugging a particular state of an operation (eg - backup/restore). This will be used by the end user to debug their operation failure scenario easily.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `stateReasonCode` | string | Output only. Unique code for each backup/restore operation failure message which helps user identify the failure. |
| `stateReasonUri` | string | Output only. URL for the troubleshooting doc which will help the user fix the failing backup/restore operation. |

### `VolumeBackup`

- Represents the backup of a specific persistent volume as a component of a Backup - both the record of the operation and a pointer to the underlying storage-specific artifacts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completeTime` | string (google-datetime) | Output only. The timestamp when the associated underlying volume backup operation completed. |
| `createTime` | string (google-datetime) | Output only. The timestamp when this VolumeBackup resource was created. |
| `diskSizeBytes` | string (int64) | Output only. The minimum size of the disk to which this VolumeBackup can be restored. |
| `etag` | string | Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a volume backup from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform volume backup updates in order to avoid race conditions. |
| `format` | string enum | Output only. The format used for the volume backup. Values: `VOLUME_BACKUP_FORMAT_UNSPECIFIED`, `GCE_PERSISTENT_DISK`. |
| `name` | string | Output only. The full name of the VolumeBackup resource. Format: `projects/*/locations/*/backupPlans/*/backups/*/volumeBackups/*`. |
| `satisfiesPzi` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `sourcePvc` | NamespacedName | Output only. A reference to the source Kubernetes PVC from which this VolumeBackup was created. |
| `state` | string enum | Output only. The current state of this VolumeBackup. Values: `STATE_UNSPECIFIED`, `CREATING`, `SNAPSHOTTING`, `UPLOADING`, `SUCCEEDED`, `FAILED`, `DELETING`, `CLEANED_UP`. |
| `stateMessage` | string | Output only. A human readable message explaining why the VolumeBackup is in its current state. This field is only meant for human consumption and should not be used programmatically as this field is not guaranteed to be consistent. |
| `storageBytes` | string (int64) | Output only. The aggregate size of the underlying artifacts associated with this VolumeBackup in the backup storage. This may change over time when multiple backups of the same volume share the same backup storage location. In particular, this is likely to increase in size when the immediately preceding backup of the same volume is deleted. |
| `uid` | string | Output only. Server generated global unique identifier of UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier) format. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when this VolumeBackup resource was last updated. |
| `volumeBackupHandle` | string | Output only. A storage system-specific opaque handle to the underlying volume backup. |

### `VolumeDataRestorePolicyBinding`

- Binds resources in the scope to the given VolumeDataRestorePolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | string enum | Required. The VolumeDataRestorePolicy to apply when restoring volumes in scope. Values: `VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED`, `RESTORE_VOLUME_DATA_FROM_BACKUP`, `REUSE_VOLUME_HANDLE_FROM_BACKUP`, `NO_VOLUME_DATA_RESTORATION`. |
| `volumeType` | string enum | The volume type, as determined by the PVC's bound PV, to apply the policy to. Values: `VOLUME_TYPE_UNSPECIFIED`, `GCE_PERSISTENT_DISK`. |

### `VolumeDataRestorePolicyOverride`

- Defines an override to apply a VolumeDataRestorePolicy for scoped resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | string enum | Required. The VolumeDataRestorePolicy to apply when restoring volumes in scope. Values: `VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED`, `RESTORE_VOLUME_DATA_FROM_BACKUP`, `REUSE_VOLUME_HANDLE_FROM_BACKUP`, `NO_VOLUME_DATA_RESTORATION`. |
| `selectedPvcs` | NamespacedNames | A list of PVCs to apply the policy override to. |

### `VolumeRestore`

- Represents the operation of restoring a volume from a VolumeBackup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completeTime` | string (google-datetime) | Output only. The timestamp when the associated underlying volume restoration completed. |
| `createTime` | string (google-datetime) | Output only. The timestamp when this VolumeRestore resource was created. |
| `etag` | string | Output only. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a volume restore from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform volume restore updates in order to avoid race conditions. |
| `name` | string | Output only. Full name of the VolumeRestore resource. Format: `projects/*/locations/*/restorePlans/*/restores/*/volumeRestores/*` |
| `state` | string enum | Output only. The current state of this VolumeRestore. Values: `STATE_UNSPECIFIED`, `CREATING`, `RESTORING`, `SUCCEEDED`, `FAILED`, `DELETING`. |
| `stateMessage` | string | Output only. A human readable message explaining why the VolumeRestore is in its current state. |
| `targetPvc` | NamespacedName | Output only. The reference to the target Kubernetes PVC to be restored. |
| `uid` | string | Output only. Server generated global unique identifier of UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier) format. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when this VolumeRestore resource was last updated. |
| `volumeBackup` | string | Output only. The full name of the VolumeBackup from which the volume will be restored. Format: `projects/*/locations/*/backupPlans/*/backups/*/volumeBackups/*`. |
| `volumeHandle` | string | Output only. A storage system-specific opaque handler to the underlying volume created for the target PVC from the volume backup. |
| `volumeType` | string enum | Output only. The type of volume provisioned Values: `VOLUME_TYPE_UNSPECIFIED`, `GCE_PERSISTENT_DISK`. |

### Shape of `AuditConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "auditLogConfigs": "array<AuditLogConfig>",
  "service": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `gkebackup` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://gkebackup.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
