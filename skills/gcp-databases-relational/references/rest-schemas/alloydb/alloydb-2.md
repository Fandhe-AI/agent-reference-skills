---
source: https://alloydb.googleapis.com/$discovery/rest?version=v1
---

# AlloyDB API message schemas (alloydb) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/alloydb/`.

### `StorageDatabasecenterPartnerapiV1mainDatabaseResourceHealthSignalData`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalMetadata` | object | Disable validation warnings |
| `compliance` | array<StorageDatabasecenterPartnerapiV1mainCompliance> | Disable validation warnings |
| `description` | string | Disable validation warnings |
| `eventTime` | string (google-datetime) | Required. Disable validation warnings |
| `externalUri` | string | Disable validation warnings |
| `location` | string | Disable validation warnings |
| `name` | string | Required. Disable validation warnings |
| `provider` | string enum | Disable validation warnings Values: `PROVIDER_UNSPECIFIED`, `GCP`, `AWS`, `AZURE`, `ONPREM`, `SELFMANAGED`, `PROVIDER_OTHER`. |
| `resourceContainer` | string | Disable validation warnings |
| `resourceName` | string | Required. Disable validation warnings |
| `signalClass` | string enum | Required. Disable validation warnings Values: `CLASS_UNSPECIFIED`, `THREAT`, `VULNERABILITY`, `MISCONFIGURATION`, `OBSERVATION`, `ERROR`. |
| `signalId` | string | Required. Disable validation warnings |
| `signalSeverity` | string enum | Disable validation warnings Values: `SIGNAL_SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |
| `signalType` | string enum | Required. Disable validation warnings Values: `SIGNAL_TYPE_UNSPECIFIED`, `SIGNAL_TYPE_NOT_PROTECTED_BY_AUTOMATIC_FAILOVER`, `SIGNAL_TYPE_GROUP_NOT_REPLICATING_ACROSS_REGIONS`, `SIGNAL_TYPE_NOT_AVAILABLE_IN_MULTIPLE_ZONES`, `SIGNAL_TYPE_NOT_AVAILABLE_IN_MULTIPLE_REGIONS`, `SIGNAL_TYPE_NO_PROMOTABLE_REPLICA`, `SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY`, `SIGNAL_TYPE_SHORT_BACKUP_RETENTION`, `SIGNAL_TYPE_LAST_BACKUP_FAILED`, `SIGNAL_TYPE_LAST_BACKUP_OLD`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_2_0`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_3`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_2`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_1`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_0`, `SIGNAL_TYPE_VIOLATES_CIS_CONTROLS_V8_0`, `SIGNAL_TYPE_VIOLATES_NIST_800_53`, `SIGNAL_TYPE_VIOLATES_NIST_800_53_R5`, `SIGNAL_TYPE_VIOLATES_NIST_CYBERSECURITY_FRAMEWORK_V1_0`, `SIGNAL_TYPE_VIOLATES_ISO_27001`, `SIGNAL_TYPE_VIOLATES_ISO_27001_V2022`, `SIGNAL_TYPE_VIOLATES_PCI_DSS_V3_2_1`, `SIGNAL_TYPE_VIOLATES_PCI_DSS_V4_0`, `SIGNAL_TYPE_VIOLATES_CLOUD_CONTROLS_MATRIX_V4`, `SIGNAL_TYPE_VIOLATES_HIPAA`, `SIGNAL_TYPE_VIOLATES_SOC2_V2017`, `SIGNAL_TYPE_LOGS_NOT_OPTIMIZED_FOR_TROUBLESHOOTING`, `SIGNAL_TYPE_QUERY_DURATIONS_NOT_LOGGED`, `SIGNAL_TYPE_VERBOSE_ERROR_LOGGING`, `SIGNAL_TYPE_QUERY_LOCK_WAITS_NOT_LOGGED`, `SIGNAL_TYPE_LOGGING_MOST_ERRORS`, `SIGNAL_TYPE_LOGGING_ONLY_CRITICAL_ERRORS`, `SIGNAL_TYPE_MINIMAL_ERROR_LOGGING`, `SIGNAL_TYPE_QUERY_STATISTICS_LOGGED`, `SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_CLIENT_HOSTNAME`, `SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_PARSER_STATISTICS`, `SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_PLANNER_STATISTICS`, `SIGNAL_TYPE_NOT_LOGGING_ONLY_DDL_STATEMENTS`, `SIGNAL_TYPE_LOGGING_QUERY_STATISTICS`, `SIGNAL_TYPE_NOT_LOGGING_TEMPORARY_FILES`, `SIGNAL_TYPE_CONNECTION_MAX_NOT_CONFIGURED`, `SIGNAL_TYPE_USER_OPTIONS_CONFIGURED`, `SIGNAL_TYPE_EXPOSED_TO_PUBLIC_ACCESS`, `SIGNAL_TYPE_UNENCRYPTED_CONNECTIONS`, `SIGNAL_TYPE_NO_ROOT_PASSWORD`, `SIGNAL_TYPE_WEAK_ROOT_PASSWORD`, `SIGNAL_TYPE_ENCRYPTION_KEY_NOT_CUSTOMER_MANAGED`, `SIGNAL_TYPE_SERVER_AUTHENTICATION_NOT_REQUIRED`, `SIGNAL_TYPE_EXPOSED_BY_OWNERSHIP_CHAINING`, `SIGNAL_TYPE_EXPOSED_TO_EXTERNAL_SCRIPTS`, `SIGNAL_TYPE_EXPOSED_TO_LOCAL_DATA_LOADS`, `SIGNAL_TYPE_CONNECTION_ATTEMPTS_NOT_LOGGED`, `SIGNAL_TYPE_DISCONNECTIONS_NOT_LOGGED`, `SIGNAL_TYPE_LOGGING_EXCESSIVE_STATEMENT_INFO`, `SIGNAL_TYPE_EXPOSED_TO_REMOTE_ACCESS`, `SIGNAL_TYPE_DATABASE_NAMES_EXPOSED`, `SIGNAL_TYPE_SENSITIVE_TRACE_INFO_NOT_MASKED`, `SIGNAL_TYPE_PUBLIC_IP_ENABLED`, `SIGNAL_TYPE_IDLE`, `SIGNAL_TYPE_OVERPROVISIONED`, `SIGNAL_TYPE_HIGH_NUMBER_OF_OPEN_TABLES`, `SIGNAL_TYPE_HIGH_NUMBER_OF_TABLES`, `SIGNAL_TYPE_HIGH_TRANSACTION_ID_UTILIZATION`, `SIGNAL_TYPE_UNDERPROVISIONED`, `SIGNAL_TYPE_OUT_OF_DISK`, `SIGNAL_TYPE_SERVER_CERTIFICATE_NEAR_EXPIRY`, `SIGNAL_TYPE_DATABASE_AUDITING_DISABLED`, `SIGNAL_TYPE_RESTRICT_AUTHORIZED_NETWORKS`, `SIGNAL_TYPE_VIOLATE_POLICY_RESTRICT_PUBLIC_IP`, `SIGNAL_TYPE_QUOTA_LIMIT`, `SIGNAL_TYPE_NO_PASSWORD_POLICY`, `SIGNAL_TYPE_CONNECTIONS_PERFORMANCE_IMPACT`, `SIGNAL_TYPE_TMP_TABLES_PERFORMANCE_IMPACT`, `SIGNAL_TYPE_TRANS_LOGS_PERFORMANCE_IMPACT`, `SIGNAL_TYPE_HIGH_JOINS_WITHOUT_INDEXES`, `SIGNAL_TYPE_SUPERUSER_WRITING_TO_USER_TABLES`, `SIGNAL_TYPE_USER_GRANTED_ALL_PERMISSIONS`, `SIGNAL_TYPE_DATA_EXPORT_TO_EXTERNAL_CLOUD_STORAGE_BUCKET`, `SIGNAL_TYPE_DATA_EXPORT_TO_PUBLIC_CLOUD_STORAGE_BUCKET`, `SIGNAL_TYPE_WEAK_PASSWORD_HASH_ALGORITHM`, `SIGNAL_TYPE_NO_USER_PASSWORD_POLICY`, `SIGNAL_TYPE_HOT_NODE`, `SIGNAL_TYPE_NO_POINT_IN_TIME_RECOVERY`, `SIGNAL_TYPE_RESOURCE_SUSPENDED`, `SIGNAL_TYPE_EXPENSIVE_COMMANDS`, `SIGNAL_TYPE_NO_MAINTENANCE_POLICY_CONFIGURED`, `SIGNAL_TYPE_NO_DELETION_PROTECTION`, `SIGNAL_TYPE_INEFFICIENT_QUERY`, `SIGNAL_TYPE_READ_INTENSIVE_WORKLOAD`, `SIGNAL_TYPE_MEMORY_LIMIT`, `SIGNAL_TYPE_MAX_SERVER_MEMORY`, `SIGNAL_TYPE_LARGE_ROWS`, `SIGNAL_TYPE_HIGH_WRITE_PRESSURE`, `SIGNAL_TYPE_HIGH_READ_PRESSURE`, `SIGNAL_TYPE_ENCRYPTION_ORG_POLICY_NOT_SATISFIED`, `SIGNAL_TYPE_LOCATION_ORG_POLICY_NOT_SATISFIED`, `SIGNAL_TYPE_OUTDATED_MINOR_VERSION`, `SIGNAL_TYPE_SCHEMA_NOT_OPTIMIZED`, `SIGNAL_TYPE_MANY_IDLE_CONNECTIONS`, `SIGNAL_TYPE_REPLICATION_LAG`, `SIGNAL_TYPE_OUTDATED_VERSION`, `SIGNAL_TYPE_OUTDATED_CLIENT`, `SIGNAL_TYPE_DATABOOST_DISABLED`, `SIGNAL_TYPE_RECOMMENDED_MAINTENANCE_POLICIES`, `SIGNAL_TYPE_EXTENDED_SUPPORT`, `SIGNAL_TYPE_PERFORMANCE_KPI_CHANGE`, `SIGNAL_TYPE_VERSION_NEARING_END_OF_LIFE`, `SIGNAL_TYPE_HIGH_MAINTENANCE_DOWNTIME_RISK`, `SIGNAL_TYPE_LOW_CACHE_HIT_AND_MAINTENANCE_DOWNTIME`, `SIGNAL_TYPE_MISSING_ENHANCED_PROTECTION`. |
| `state` | string enum | Required. Disable validation warnings Values: `STATE_UNSPECIFIED`, `ACTIVE`, `RESOLVED`, `MUTED`. |

### `StorageDatabasecenterPartnerapiV1mainDatabaseResourceId`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `provider` | string enum | Required. Disable validation warnings Values: `PROVIDER_UNSPECIFIED`, `GCP`, `AWS`, `AZURE`, `ONPREM`, `SELFMANAGED`, `PROVIDER_OTHER`. |
| `providerDescription` | string | Optional. Disable validation warnings |
| `resourceType` | string | Required. Disable validation warnings |
| `uniqueId` | string | Required. Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainDatabaseResourceMetadata`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalMetadata` | object | Disable validation warnings |
| `availabilityConfiguration` | StorageDatabasecenterPartnerapiV1mainAvailabilityConfiguration | Disable validation warnings |
| `backupConfiguration` | StorageDatabasecenterPartnerapiV1mainBackupConfiguration | Disable validation warnings |
| `backupRun` | StorageDatabasecenterPartnerapiV1mainBackupRun | Disable validation warnings |
| `backupdrConfiguration` | StorageDatabasecenterPartnerapiV1mainBackupDRConfiguration | Optional. Disable validation warnings |
| `creationTime` | string (google-datetime) | Disable validation warnings |
| `currentState` | string enum | Disable validation warnings Values: `STATE_UNSPECIFIED`, `HEALTHY`, `UNHEALTHY`, `SUSPENDED`, `DELETED`, `STATE_OTHER`, `STOPPED`. |
| `customMetadata` | StorageDatabasecenterPartnerapiV1mainCustomMetadataData | Disable validation warnings |
| `edition` | string enum | Optional. Disable validation warnings Values: `EDITION_UNSPECIFIED`, `EDITION_ENTERPRISE`, `EDITION_ENTERPRISE_PLUS`, `EDITION_STANDARD`. |
| `entitlements` | array<StorageDatabasecenterPartnerapiV1mainEntitlement> | Disable validation warnings |
| `expectedState` | string enum | Disable validation warnings Values: `STATE_UNSPECIFIED`, `HEALTHY`, `UNHEALTHY`, `SUSPENDED`, `DELETED`, `STATE_OTHER`, `STOPPED`. |
| `gcbdrConfiguration` | StorageDatabasecenterPartnerapiV1mainGCBDRConfiguration | Disable validation warnings |
| `id` | StorageDatabasecenterPartnerapiV1mainDatabaseResourceId | Required. Disable validation warnings |
| `instanceType` | string enum | Disable validation warnings Values: `INSTANCE_TYPE_UNSPECIFIED`, `SUB_RESOURCE_TYPE_UNSPECIFIED`, `PRIMARY`, `SECONDARY`, `READ_REPLICA`, `OTHER`, `SUB_RESOURCE_TYPE_PRIMARY`, `SUB_RESOURCE_TYPE_SECONDARY`, `SUB_RESOURCE_TYPE_READ_REPLICA`, `SUB_RESOURCE_TYPE_EXTERNAL_PRIMARY`, `SUB_RESOURCE_TYPE_READ_POOL`, `SUB_RESOURCE_TYPE_RESERVATION`, `SUB_RESOURCE_TYPE_DATASET`, `SUB_RESOURCE_TYPE_OTHER`. |
| `internalAdditionalMetadata` | object | Disable validation warnings |
| `ipAddress` | StorageDatabasecenterPartnerapiV1mainIpAddress | Optional. Disable validation warnings |
| `isDeletionProtectionEnabled` | boolean | Optional. Disable validation warnings |
| `location` | string | Disable validation warnings |
| `machineConfiguration` | StorageDatabasecenterPartnerapiV1mainMachineConfiguration | Disable validation warnings |
| `maintenanceInfo` | StorageDatabasecenterPartnerapiV1mainResourceMaintenanceInfo | Optional. Disable validation warnings |
| `modes` | array<string> | Optional. Disable validation warnings Values: `MODE_UNSPECIFIED`, `MODE_NATIVE`, `MODE_MONGODB_COMPATIBLE`, `MODE_DATASTORE`, `MODE_CLUSTER_ENABLED`, `MODE_CLUSTER_DISABLED`. |
| `primaryResourceId` | StorageDatabasecenterPartnerapiV1mainDatabaseResourceId | Disable validation warnings |
| `primaryResourceLocation` | string | Disable validation warnings |
| `product` | StorageDatabasecenterProtoCommonProduct | Disable validation warnings |
| `resourceContainer` | string | Disable validation warnings |
| `resourceFlags` | array<StorageDatabasecenterPartnerapiV1mainResourceFlags> | Optional. Disable validation warnings |
| `resourceName` | string | Required. Disable validation warnings |
| `suspensionReason` | string enum | Optional. Disable validation warnings Values: `SUSPENSION_REASON_UNSPECIFIED`, `WIPEOUT_HIDE_EVENT`, `WIPEOUT_PURGE_EVENT`, `BILLING_DISABLED`, `ABUSER_DETECTED`, `ENCRYPTION_KEY_INACCESSIBLE`, `REPLICATED_CLUSTER_ENCRYPTION_KEY_INACCESSIBLE`. |
| `tagsSet` | StorageDatabasecenterPartnerapiV1mainTags | Optional. Disable validation warnings |
| `updationTime` | string (google-datetime) | Disable validation warnings |
| `userLabelSet` | StorageDatabasecenterPartnerapiV1mainUserLabels | Disable validation warnings |
| `zone` | string | Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainDatabaseResourceRecommendationSignalData`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalMetadata` | object | Optional. Disable validation warnings |
| `lastRefreshTime` | string (google-datetime) | Required. Disable validation warnings |
| `recommendationState` | string enum | Required. Disable validation warnings Values: `UNSPECIFIED`, `ACTIVE`, `CLAIMED`, `SUCCEEDED`, `FAILED`, `DISMISSED`. |
| `recommender` | string | Required. Disable validation warnings |
| `recommenderId` | string | Required. Disable validation warnings |
| `recommenderSubtype` | string | Required. Disable validation warnings |
| `resourceName` | string | Required. Disable validation warnings |
| `signalType` | string enum | Required. Disable validation warnings Values: `SIGNAL_TYPE_UNSPECIFIED`, `SIGNAL_TYPE_NOT_PROTECTED_BY_AUTOMATIC_FAILOVER`, `SIGNAL_TYPE_GROUP_NOT_REPLICATING_ACROSS_REGIONS`, `SIGNAL_TYPE_NOT_AVAILABLE_IN_MULTIPLE_ZONES`, `SIGNAL_TYPE_NOT_AVAILABLE_IN_MULTIPLE_REGIONS`, `SIGNAL_TYPE_NO_PROMOTABLE_REPLICA`, `SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY`, `SIGNAL_TYPE_SHORT_BACKUP_RETENTION`, `SIGNAL_TYPE_LAST_BACKUP_FAILED`, `SIGNAL_TYPE_LAST_BACKUP_OLD`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_2_0`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_3`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_2`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_1`, `SIGNAL_TYPE_VIOLATES_CIS_GCP_FOUNDATION_1_0`, `SIGNAL_TYPE_VIOLATES_CIS_CONTROLS_V8_0`, `SIGNAL_TYPE_VIOLATES_NIST_800_53`, `SIGNAL_TYPE_VIOLATES_NIST_800_53_R5`, `SIGNAL_TYPE_VIOLATES_NIST_CYBERSECURITY_FRAMEWORK_V1_0`, `SIGNAL_TYPE_VIOLATES_ISO_27001`, `SIGNAL_TYPE_VIOLATES_ISO_27001_V2022`, `SIGNAL_TYPE_VIOLATES_PCI_DSS_V3_2_1`, `SIGNAL_TYPE_VIOLATES_PCI_DSS_V4_0`, `SIGNAL_TYPE_VIOLATES_CLOUD_CONTROLS_MATRIX_V4`, `SIGNAL_TYPE_VIOLATES_HIPAA`, `SIGNAL_TYPE_VIOLATES_SOC2_V2017`, `SIGNAL_TYPE_LOGS_NOT_OPTIMIZED_FOR_TROUBLESHOOTING`, `SIGNAL_TYPE_QUERY_DURATIONS_NOT_LOGGED`, `SIGNAL_TYPE_VERBOSE_ERROR_LOGGING`, `SIGNAL_TYPE_QUERY_LOCK_WAITS_NOT_LOGGED`, `SIGNAL_TYPE_LOGGING_MOST_ERRORS`, `SIGNAL_TYPE_LOGGING_ONLY_CRITICAL_ERRORS`, `SIGNAL_TYPE_MINIMAL_ERROR_LOGGING`, `SIGNAL_TYPE_QUERY_STATISTICS_LOGGED`, `SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_CLIENT_HOSTNAME`, `SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_PARSER_STATISTICS`, `SIGNAL_TYPE_EXCESSIVE_LOGGING_OF_PLANNER_STATISTICS`, `SIGNAL_TYPE_NOT_LOGGING_ONLY_DDL_STATEMENTS`, `SIGNAL_TYPE_LOGGING_QUERY_STATISTICS`, `SIGNAL_TYPE_NOT_LOGGING_TEMPORARY_FILES`, `SIGNAL_TYPE_CONNECTION_MAX_NOT_CONFIGURED`, `SIGNAL_TYPE_USER_OPTIONS_CONFIGURED`, `SIGNAL_TYPE_EXPOSED_TO_PUBLIC_ACCESS`, `SIGNAL_TYPE_UNENCRYPTED_CONNECTIONS`, `SIGNAL_TYPE_NO_ROOT_PASSWORD`, `SIGNAL_TYPE_WEAK_ROOT_PASSWORD`, `SIGNAL_TYPE_ENCRYPTION_KEY_NOT_CUSTOMER_MANAGED`, `SIGNAL_TYPE_SERVER_AUTHENTICATION_NOT_REQUIRED`, `SIGNAL_TYPE_EXPOSED_BY_OWNERSHIP_CHAINING`, `SIGNAL_TYPE_EXPOSED_TO_EXTERNAL_SCRIPTS`, `SIGNAL_TYPE_EXPOSED_TO_LOCAL_DATA_LOADS`, `SIGNAL_TYPE_CONNECTION_ATTEMPTS_NOT_LOGGED`, `SIGNAL_TYPE_DISCONNECTIONS_NOT_LOGGED`, `SIGNAL_TYPE_LOGGING_EXCESSIVE_STATEMENT_INFO`, `SIGNAL_TYPE_EXPOSED_TO_REMOTE_ACCESS`, `SIGNAL_TYPE_DATABASE_NAMES_EXPOSED`, `SIGNAL_TYPE_SENSITIVE_TRACE_INFO_NOT_MASKED`, `SIGNAL_TYPE_PUBLIC_IP_ENABLED`, `SIGNAL_TYPE_IDLE`, `SIGNAL_TYPE_OVERPROVISIONED`, `SIGNAL_TYPE_HIGH_NUMBER_OF_OPEN_TABLES`, `SIGNAL_TYPE_HIGH_NUMBER_OF_TABLES`, `SIGNAL_TYPE_HIGH_TRANSACTION_ID_UTILIZATION`, `SIGNAL_TYPE_UNDERPROVISIONED`, `SIGNAL_TYPE_OUT_OF_DISK`, `SIGNAL_TYPE_SERVER_CERTIFICATE_NEAR_EXPIRY`, `SIGNAL_TYPE_DATABASE_AUDITING_DISABLED`, `SIGNAL_TYPE_RESTRICT_AUTHORIZED_NETWORKS`, `SIGNAL_TYPE_VIOLATE_POLICY_RESTRICT_PUBLIC_IP`, `SIGNAL_TYPE_QUOTA_LIMIT`, `SIGNAL_TYPE_NO_PASSWORD_POLICY`, `SIGNAL_TYPE_CONNECTIONS_PERFORMANCE_IMPACT`, `SIGNAL_TYPE_TMP_TABLES_PERFORMANCE_IMPACT`, `SIGNAL_TYPE_TRANS_LOGS_PERFORMANCE_IMPACT`, `SIGNAL_TYPE_HIGH_JOINS_WITHOUT_INDEXES`, `SIGNAL_TYPE_SUPERUSER_WRITING_TO_USER_TABLES`, `SIGNAL_TYPE_USER_GRANTED_ALL_PERMISSIONS`, `SIGNAL_TYPE_DATA_EXPORT_TO_EXTERNAL_CLOUD_STORAGE_BUCKET`, `SIGNAL_TYPE_DATA_EXPORT_TO_PUBLIC_CLOUD_STORAGE_BUCKET`, `SIGNAL_TYPE_WEAK_PASSWORD_HASH_ALGORITHM`, `SIGNAL_TYPE_NO_USER_PASSWORD_POLICY`, `SIGNAL_TYPE_HOT_NODE`, `SIGNAL_TYPE_NO_POINT_IN_TIME_RECOVERY`, `SIGNAL_TYPE_RESOURCE_SUSPENDED`, `SIGNAL_TYPE_EXPENSIVE_COMMANDS`, `SIGNAL_TYPE_NO_MAINTENANCE_POLICY_CONFIGURED`, `SIGNAL_TYPE_NO_DELETION_PROTECTION`, `SIGNAL_TYPE_INEFFICIENT_QUERY`, `SIGNAL_TYPE_READ_INTENSIVE_WORKLOAD`, `SIGNAL_TYPE_MEMORY_LIMIT`, `SIGNAL_TYPE_MAX_SERVER_MEMORY`, `SIGNAL_TYPE_LARGE_ROWS`, `SIGNAL_TYPE_HIGH_WRITE_PRESSURE`, `SIGNAL_TYPE_HIGH_READ_PRESSURE`, `SIGNAL_TYPE_ENCRYPTION_ORG_POLICY_NOT_SATISFIED`, `SIGNAL_TYPE_LOCATION_ORG_POLICY_NOT_SATISFIED`, `SIGNAL_TYPE_OUTDATED_MINOR_VERSION`, `SIGNAL_TYPE_SCHEMA_NOT_OPTIMIZED`, `SIGNAL_TYPE_MANY_IDLE_CONNECTIONS`, `SIGNAL_TYPE_REPLICATION_LAG`, `SIGNAL_TYPE_OUTDATED_VERSION`, `SIGNAL_TYPE_OUTDATED_CLIENT`, `SIGNAL_TYPE_DATABOOST_DISABLED`, `SIGNAL_TYPE_RECOMMENDED_MAINTENANCE_POLICIES`, `SIGNAL_TYPE_EXTENDED_SUPPORT`, `SIGNAL_TYPE_PERFORMANCE_KPI_CHANGE`, `SIGNAL_TYPE_VERSION_NEARING_END_OF_LIFE`, `SIGNAL_TYPE_HIGH_MAINTENANCE_DOWNTIME_RISK`, `SIGNAL_TYPE_LOW_CACHE_HIT_AND_MAINTENANCE_DOWNTIME`, `SIGNAL_TYPE_MISSING_ENHANCED_PROTECTION`. |

### `StorageDatabasecenterPartnerapiV1mainDatabaseResourceSignalData`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupRun` | StorageDatabasecenterPartnerapiV1mainBackupRun | Disable validation warnings |
| `fullResourceName` | string | Required. Disable validation warnings |
| `lastRefreshTime` | string (google-datetime) | Required. Disable validation warnings |
| `location` | string | Required. Disable validation warnings |
| `resourceId` | StorageDatabasecenterPartnerapiV1mainDatabaseResourceId | Disable validation warnings |
| `signalBoolValue` | boolean | Disable validation warnings |
| `signalMetadataList` | array<StorageDatabasecenterPartnerapiV1mainSignalMetadata> | Disable validation warnings |
| `signalState` | string enum | Required. Output only. Disable validation warnings Values: `SIGNAL_STATE_UNSPECIFIED`, `ACTIVE`, `INACTIVE`, `DISMISSED`. |
| `signalType` | string enum | Required. Disable validation warnings Values: `SIGNAL_TYPE_UNSPECIFIED`, `SIGNAL_TYPE_OUTDATED_MINOR_VERSION`, `SIGNAL_TYPE_DATABASE_AUDITING_DISABLED`, `SIGNAL_TYPE_NO_ROOT_PASSWORD`, `SIGNAL_TYPE_EXPOSED_TO_PUBLIC_ACCESS`, `SIGNAL_TYPE_UNENCRYPTED_CONNECTIONS`, `SIGNAL_TYPE_EXTENDED_SUPPORT`, `SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY`, `SIGNAL_TYPE_VERSION_NEARING_END_OF_LIFE`, `SIGNAL_TYPE_LAST_BACKUP_OLD`, `SIGNAL_TYPE_NOT_PROTECTED_BY_AUTOMATIC_FAILOVER`. |

### `StorageDatabasecenterPartnerapiV1mainEntitlement`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlementState` | string enum | Disable validation warnings Values: `ENTITLEMENT_STATE_UNSPECIFIED`, `ENTITLED`, `REVOKED`. |
| `type` | string enum | Disable validation warnings Values: `ENTITLEMENT_TYPE_UNSPECIFIED`, `GEMINI`, `NATIVE`, `GCA_STANDARD`. |

### `StorageDatabasecenterPartnerapiV1mainGCBDRConfiguration`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcbdrManaged` | boolean | Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainInternalResourceMetadata`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupConfiguration` | StorageDatabasecenterPartnerapiV1mainBackupConfiguration | Disable validation warnings |
| `backupRun` | StorageDatabasecenterPartnerapiV1mainBackupRun | Disable validation warnings |
| `isDeletionProtectionEnabled` | boolean | Disable validation warnings |
| `product` | StorageDatabasecenterProtoCommonProduct | Disable validation warnings |
| `resourceId` | StorageDatabasecenterPartnerapiV1mainDatabaseResourceId | Disable validation warnings |
| `resourceName` | string | Required. Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainIpAddress`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `privateIp` | string | Disable validation warnings |
| `publicIp` | string | Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainMachineConfiguration`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baselineSlots` | string (int64) | Optional. Disable validation warnings |
| `cpuCount` | integer (int32) | Disable validation warnings |
| `maxReservationSlots` | string (int64) | Optional. Disable validation warnings |
| `memorySizeInBytes` | string (int64) | Disable validation warnings |
| `shardCount` | integer (int32) | Optional. Disable validation warnings |
| `vcpuCount` | number (double) | Optional. Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainObservabilityMetricData`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationType` | string enum | Required. Disable validation warnings Values: `AGGREGATION_TYPE_UNSPECIFIED`, `PEAK`, `P99`, `P95`, `CURRENT`. |
| `metricType` | string enum | Required. Disable validation warnings Values: `METRIC_TYPE_UNSPECIFIED`, `CPU_UTILIZATION`, `MEMORY_UTILIZATION`, `NETWORK_CONNECTIONS`, `STORAGE_UTILIZATION`, `STORAGE_USED_BYTES`, `NODE_COUNT`, `MEMORY_USED_BYTES`, `PROCESSING_UNIT_COUNT`. |
| `observationTime` | string (google-datetime) | Required. Disable validation warnings |
| `resourceName` | string | Required. Disable validation warnings |
| `value` | StorageDatabasecenterProtoCommonTypedValue | Required. Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainOperationError`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string | Disable validation warnings |
| `errorType` | string enum | Disable validation warnings Values: `OPERATION_ERROR_TYPE_UNSPECIFIED`, `KMS_KEY_ERROR`, `DATABASE_ERROR`, `STOCKOUT_ERROR`, `CANCELLATION_ERROR`, `SQLSERVER_ERROR`, `INTERNAL_ERROR`. |
| `message` | string | Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainResourceFlags`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Optional. Disable validation warnings |
| `value` | string | Optional. Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainResourceMaintenanceDenySchedule`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endDate` | GoogleTypeDate | Optional. Disable validation warnings |
| `startDate` | GoogleTypeDate | Optional. Disable validation warnings |
| `time` | GoogleTypeTimeOfDay | Optional. Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainResourceMaintenanceInfo`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentVersionReleaseDate` | GoogleTypeDate | Optional. Disable validation warnings |
| `denyMaintenanceSchedules` | array<StorageDatabasecenterPartnerapiV1mainResourceMaintenanceDenySchedule> | Optional. Disable validation warnings |
| `isInstanceStopped` | boolean | Optional. Disable validation warnings |
| `maintenanceSchedule` | StorageDatabasecenterPartnerapiV1mainResourceMaintenanceSchedule | Optional. Disable validation warnings |
| `maintenanceState` | string enum | Output only. Disable validation warnings Values: `MAINTENANCE_STATE_UNSPECIFIED`, `CREATING`, `READY`, `UPDATING`, `REPAIRING`, `DELETING`, `ERROR`. |
| `maintenanceVersion` | string | Optional. Disable validation warnings |
| `nextAvailableMaintenanceVersions` | array<string> | Optional. Disable validation warnings |
| `upcomingMaintenance` | StorageDatabasecenterPartnerapiV1mainUpcomingMaintenance | Optional. Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainResourceMaintenanceSchedule`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | string enum | Optional. Disable validation warnings Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `phase` | string enum | Optional. Disable validation warnings Values: `PHASE_UNSPECIFIED`, `ANY`, `WEEK1`, `WEEK2`, `WEEK5`. |
| `time` | GoogleTypeTimeOfDay | Optional. Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainRetentionSettings`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `durationBasedRetention` | string (google-duration) | Disable validation warnings |
| `quantityBasedRetention` | integer (int32) | Disable validation warnings |
| `retentionUnit` | string enum | Disable validation warnings Values: `RETENTION_UNIT_UNSPECIFIED`, `COUNT`, `TIME`, `DURATION`, `RETENTION_UNIT_OTHER`. |
| `timeBasedRetention` | string (google-duration) | Disable validation warnings |
| `timestampBasedRetentionTime` | string (google-datetime) | Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainSignalMetadata`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupRun` | StorageDatabasecenterPartnerapiV1mainBackupRun | Disable validation warnings |
| `signalBoolValue` | boolean | Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainTags`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tags` | object | Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainUpcomingMaintenance`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Optional. Disable validation warnings |
| `startTime` | string (google-datetime) | Optional. Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainUserLabels`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | object | Disable validation warnings |

### `StorageDatabasecenterProtoCommonProduct`

- Product specification for Condor resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `engine` | string enum | The specific engine that the underlying database is running. Values: `ENGINE_UNSPECIFIED`, `ENGINE_MYSQL`, `MYSQL`, `ENGINE_POSTGRES`, `POSTGRES`, `ENGINE_SQL_SERVER`, `SQL_SERVER`, `ENGINE_NATIVE`, `NATIVE`, `ENGINE_CLOUD_SPANNER_WITH_POSTGRES_DIALECT`, `ENGINE_CLOUD_SPANNER_WITH_GOOGLESQL_DIALECT`, `ENGINE_MEMORYSTORE_FOR_REDIS`, `ENGINE_MEMORYSTORE_FOR_REDIS_CLUSTER`, `ENGINE_MEMORYSTORE_FOR_VALKEY`, `ENGINE_OTHER`, `ENGINE_FIRESTORE_WITH_NATIVE_MODE`, `ENGINE_FIRESTORE_WITH_DATASTORE_MODE`, `ENGINE_FIRESTORE_WITH_MONGODB_COMPATIBILITY_MODE`, `ENGINE_EXADATA_ORACLE`, `ENGINE_ADB_SERVERLESS_ORACLE`. |
| `minorVersion` | string | Minor version of the underlying database engine. Example values: For MySQL, it could be "8.0.32", "5.7.32" etc.. For Postgres, it could be "14.3", "15.3" etc.. |
| `type` | string enum | Type of specific database product. It could be CloudSQL, AlloyDB etc.. Values: `PRODUCT_TYPE_UNSPECIFIED`, `PRODUCT_TYPE_CLOUD_SQL`, `CLOUD_SQL`, `PRODUCT_TYPE_ALLOYDB`, `ALLOYDB`, `PRODUCT_TYPE_SPANNER`, `PRODUCT_TYPE_ON_PREM`, `ON_PREM`, `PRODUCT_TYPE_MEMORYSTORE`, `PRODUCT_TYPE_BIGTABLE`, `PRODUCT_TYPE_FIRESTORE`, `PRODUCT_TYPE_COMPUTE_ENGINE`, `PRODUCT_TYPE_ORACLE_ON_GCP`, `PRODUCT_TYPE_BIGQUERY`, `PRODUCT_TYPE_OTHER`. |
| `version` | string | Version of the underlying database engine. Example values: For MySQL, it could be "8.0", "5.7" etc.. For Postgres, it could be "14", "15" etc.. |

### `StorageDatabasecenterProtoCommonTypedValue`

- TypedValue represents the value of a metric type. It can either be a double, an int64, a string or a bool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | For boolean value |
| `doubleValue` | number (double) | For double value |
| `int64Value` | string (int64) | For integer value |
| `stringValue` | string | For string value |

### `StringRestrictions`

- Restrictions on STRING type values
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedValues` | array<string> | The list of allowed values, if bounded. This field will be empty if there is a unbounded number of allowed values. |
| `caseAgnostic` | boolean | Output only. Whether the allowed values are case agnostic. |

### `SupportedDatabaseFlag`

- SupportedDatabaseFlag gives general information about a database flag, like type and allowed values. This is a static value that is defined on the server side, and it cannot be modified by callers. To set the Database flags on a particular Instance, a caller should modify the Instance.database_flags field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceptsMultipleValues` | boolean | Whether the database flag accepts multiple values. If true, a comma-separated list of stringified values may be specified. |
| `flagName` | string | The name of the database flag, e.g. "max_allowed_packets". The is a possibly key for the Instance.database_flags map field. |
| `integerRestrictions` | IntegerRestrictions | Restriction on INTEGER type value. |
| `name` | string | The name of the flag resource, following Google Cloud conventions, e.g.: \* projects/{project}/locations/{location}/flags/{flag} This field currently has no semantic meaning. |
| `recommendedIntegerValue` | string (int64) | The recommended value for an INTEGER flag. |
| `recommendedStringValue` | string | The recommended value for a STRING flag. |
| `requiresDbRestart` | boolean | Whether setting or updating this flag on an Instance requires a database restart. If a flag that requires database restart is set, the backend will automatically restart the database (making sure to satisfy any availability SLO's). |
| `scope` | string enum | The scope of the flag. Values: `SCOPE_UNSPECIFIED`, `DATABASE`, `CONNECTION_POOL`. |
| `stringRestrictions` | StringRestrictions | Restriction on STRING type value. |
| `supportedDbVersions` | array<string> | Major database engine versions for which this flag is supported. Values: `DATABASE_VERSION_UNSPECIFIED`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`. |
| `valueType` | string enum | — Values: `VALUE_TYPE_UNSPECIFIED`, `STRING`, `INTEGER`, `FLOAT`, `NONE`. |

### `SwitchoverClusterRequest`

- Message for switching over to a cluster
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | boolean | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `TimeBasedRetention`

- A time based retention policy specifies that all backups within a certain time period should be retained.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `retentionPeriod` | string (google-duration) | The retention period. |

### `TrialMetadata`

- Contains information and all metadata related to TRIAL clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | End time of the trial cluster. |
| `graceEndTime` | string (google-datetime) | grace end time of the cluster. |
| `startTime` | string (google-datetime) | start time of the trial cluster. |
| `upgradeTime` | string (google-datetime) | Upgrade time of trial cluster to Standard cluster. |

### `UpdatePolicy`

- Policy to be used while updating the instance.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | Mode for updating the instance. Values: `MODE_UNSPECIFIED`, `DEFAULT`, `FORCE_APPLY`. |

### `UpgradeClusterRequest`

- Upgrades a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The current etag of the Cluster. If an etag is provided and does not match the current etag of the Cluster, upgrade will be blocked and an ABORTED error will be returned. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | boolean | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |
| `version` | string enum | Required. The version the cluster is going to be upgraded to. Values: `DATABASE_VERSION_UNSPECIFIED`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`. |

### `UpgradeClusterResponse`

- UpgradeClusterResponse contains the response for upgrade cluster operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterUpgradeDetails` | array<ClusterUpgradeDetails> | Array of upgrade details for the current cluster and all the secondary clusters associated with this cluster. |
| `message` | string | A user friendly message summarising the upgrade operation details and the next steps for the user if there is any. |
| `status` | string enum | Status of upgrade operation. Values: `STATUS_UNSPECIFIED`, `NOT_STARTED`, `IN_PROGRESS`, `SUCCESS`, `FAILED`, `PARTIAL_SUCCESS`, `CANCEL_IN_PROGRESS`, `CANCELLED`. |

### `UpgradeClusterStatus`

- Message for current status of the Major Version Upgrade operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancellable` | boolean | Whether the operation is cancellable. |
| `sourceVersion` | string enum | Source database major version. Values: `DATABASE_VERSION_UNSPECIFIED`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`. |
| `stages` | array<StageStatus> | Status of all upgrade stages. |
| `state` | string enum | Cluster Major Version Upgrade state. Values: `STATUS_UNSPECIFIED`, `NOT_STARTED`, `IN_PROGRESS`, `SUCCESS`, `FAILED`, `PARTIAL_SUCCESS`, `CANCEL_IN_PROGRESS`, `CANCELLED`. |
| `targetVersion` | string enum | Target database major version. Values: `DATABASE_VERSION_UNSPECIFIED`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`. |

### `User`

- Message describing User object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseRoles` | array<string> | Optional. List of database roles this user has. The database role strings are subject to the PostgreSQL naming conventions. |
| `keepExtraRoles` | boolean | Input only. If the user already exists and it has additional roles, keep them granted. |
| `name` | string | Output only. Name of the resource in the form of projects/{project}/locations/{location}/cluster/{cluster}/users/{user}. |
| `password` | string | Input only. Password for the user. |
| `userType` | string enum | Optional. Type of this user. Values: `USER_TYPE_UNSPECIFIED`, `ALLOYDB_BUILT_IN`, `ALLOYDB_IAM_USER`, `ALLOYDB_IAM_GROUP`, `ALLOYDB_IAM_GROUP_USER`, `ALLOYDB_IAM_GROUP_SERVICE_ACCOUNT`. |

### `UserPassword`

- The username/password for a database user. Used for specifying initial users at cluster creation time.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `password` | string | The initial password for the user. |
| `user` | string | The database username. |

### `WeeklySchedule`

- A weekly schedule starts a backup at prescribed start times within a day, for the specified days of the week. The weekly schedule message is flexible and can be used to create many types of schedules. For example, to have a daily backup that starts at 22:00, configure the `start_times` field to have one element "22:00" and the `days_of_week` field to have all seven days of the week.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `daysOfWeek` | array<string> | The days of the week to perform a backup. If this field is left empty, the default of every day of the week is used. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `startTimes` | array<GoogleTypeTimeOfDay> | The times during the day to start a backup. The start times are assumed to be in UTC and to be an exact hour (e.g., 04:00:00). If no start times are provided, a single fixed start time is chosen arbitrarily. |

### Shape of `StorageDatabasecenterPartnerapiV1mainDatabaseResourceHealthSignalData`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "additionalMetadata": "object",
  "compliance": "array<StorageDatabasecenterPartnerapiV1mainCompliance>",
  "description": "string",
  "eventTime": "string (google-datetime)",
  "externalUri": "string",
  "location": "string",
  "name": "string",
  "provider": "string enum",
  "resourceContainer": "string",
  "resourceName": "string",
  "signalClass": "string enum",
  "signalId": "string",
  "signalSeverity": "string enum",
  "signalType": "string enum",
  "state": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `alloydb` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://alloydb.googleapis.com/$discovery/rest?version=v1, https://alloydb.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
