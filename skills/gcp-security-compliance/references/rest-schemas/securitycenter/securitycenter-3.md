---
source: https://securitycenter.googleapis.com/$discovery/rest?version=v1
---

# Security Command Center API message schemas (securitycenter) (part 3/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/securitycenter/`.

### `GoogleCloudSecuritycenterV2ResourcePath`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodes` | array<GoogleCloudSecuritycenterV2ResourcePathNode> | — |

### `GoogleCloudSecuritycenterV2ResourcePathNode`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `id` | string | — |
| `nodeType` | string enum | — Values: `RESOURCE_PATH_NODE_TYPE_UNSPECIFIED`, `GCP_ORGANIZATION`, `GCP_FOLDER`, `GCP_PROJECT`, `AWS_ORGANIZATION`, `AWS_ORGANIZATIONAL_UNIT`, `AWS_ACCOUNT`, `AZURE_MANAGEMENT_GROUP`, `AZURE_SUBSCRIPTION`, `AZURE_RESOURCE_GROUP`. |

### `GoogleCloudSecuritycenterV2ResourceValueConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudProvider` | string enum | — Values: `CLOUD_PROVIDER_UNSPECIFIED`, `GOOGLE_CLOUD_PLATFORM`, `AMAZON_WEB_SERVICES`, `MICROSOFT_AZURE`. |
| `createTime` | string (google-datetime) | — |
| `description` | string | — |
| `name` | string | — |
| `resourceLabelsSelector` | object | — |
| `resourceType` | string | — |
| `resourceValue` | string enum | — Values: `RESOURCE_VALUE_UNSPECIFIED`, `HIGH`, `MEDIUM`, `LOW`, `NONE`. |
| `scope` | string | — |
| `sensitiveDataProtectionMapping` | GoogleCloudSecuritycenterV2SensitiveDataProtectionMapping | — |
| `tagValues` | array<string> | — |
| `updateTime` | string (google-datetime) | — |

### `GoogleCloudSecuritycenterV2Role`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string enum | — Values: `KIND_UNSPECIFIED`, `ROLE`, `CLUSTER_ROLE`. |
| `name` | string | — |
| `ns` | string | — |

### `GoogleCloudSecuritycenterV2Secret`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `environmentVariable` | GoogleCloudSecuritycenterV2SecretEnvironmentVariable | — |
| `filePath` | GoogleCloudSecuritycenterV2SecretFilePath | — |
| `status` | GoogleCloudSecuritycenterV2SecretStatus | — |
| `type` | string | — |

### `GoogleCloudSecuritycenterV2SecretEnvironmentVariable`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | — |

### `GoogleCloudSecuritycenterV2SecretFilePath`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | — |

### `GoogleCloudSecuritycenterV2SecretStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastUpdatedTime` | string (google-datetime) | — |
| `validity` | string enum | — Values: `SECRET_VALIDITY_UNSPECIFIED`, `SECRET_VALIDITY_UNSUPPORTED`, `SECRET_VALIDITY_FAILED`, `SECRET_VALIDITY_INVALID`, `SECRET_VALIDITY_VALID`. |

### `GoogleCloudSecuritycenterV2SecurityBulletin`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bulletinId` | string | — |
| `submissionTime` | string (google-datetime) | — |
| `suggestedUpgradeVersion` | string | — |

### `GoogleCloudSecuritycenterV2SecurityMarks`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canonicalName` | string | — |
| `marks` | object | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV2SecurityPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `preview` | boolean | — |
| `type` | string | — |

### `GoogleCloudSecuritycenterV2SecurityPosture`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changedPolicy` | string | — |
| `name` | string | — |
| `policy` | string | — |
| `policyDriftDetails` | array<GoogleCloudSecuritycenterV2PolicyDriftDetails> | — |
| `policySet` | string | — |
| `postureDeployment` | string | — |
| `postureDeploymentResource` | string | — |
| `revisionId` | string | — |

### `GoogleCloudSecuritycenterV2SensitiveDataProtectionMapping`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `highSensitivityMapping` | string enum | — Values: `RESOURCE_VALUE_UNSPECIFIED`, `HIGH`, `MEDIUM`, `LOW`, `NONE`. |
| `mediumSensitivityMapping` | string enum | — Values: `RESOURCE_VALUE_UNSPECIFIED`, `HIGH`, `MEDIUM`, `LOW`, `NONE`. |

### `GoogleCloudSecuritycenterV2SensitivityScore`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `score` | string enum | — Values: `SENSITIVITY_SCORE_LEVEL_UNSPECIFIED`, `SENSITIVITY_LOW`, `SENSITIVITY_UNKNOWN`, `SENSITIVITY_MODERATE`, `SENSITIVITY_HIGH`. |

### `GoogleCloudSecuritycenterV2ServiceAccountDelegationInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `principalEmail` | string | — |
| `principalSubject` | string | — |

### `GoogleCloudSecuritycenterV2StaticMute`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applyTime` | string (google-datetime) | — |
| `state` | string enum | — Values: `MUTE_UNSPECIFIED`, `MUTED`, `UNMUTED`, `UNDEFINED`. |

### `GoogleCloudSecuritycenterV2Subject`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string enum | — Values: `AUTH_TYPE_UNSPECIFIED`, `USER`, `SERVICEACCOUNT`, `GROUP`. |
| `name` | string | — |
| `ns` | string | — |

### `GoogleCloudSecuritycenterV2TicketInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assignee` | string | — |
| `description` | string | — |
| `id` | string | — |
| `status` | string | — |
| `updateTime` | string (google-datetime) | — |
| `uri` | string | — |

### `GoogleCloudSecuritycenterV2ToxicCombination`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attackExposureScore` | number (double) | — |
| `relatedFindings` | array<string> | — |

### `GoogleCloudSecuritycenterV2VertexAi`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `datasets` | array<GoogleCloudSecuritycenterV2Dataset> | — |
| `pipelines` | array<GoogleCloudSecuritycenterV2Pipeline> | — |

### `GoogleCloudSecuritycenterV2Vulnerability`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cve` | GoogleCloudSecuritycenterV2Cve | — |
| `cwes` | array<GoogleCloudSecuritycenterV2Cwe> | — |
| `fixedPackage` | GoogleCloudSecuritycenterV2Package | — |
| `offendingPackage` | GoogleCloudSecuritycenterV2Package | — |
| `providerRiskScore` | string (int64) | — |
| `reachable` | boolean | — |
| `securityBulletin` | GoogleCloudSecuritycenterV2SecurityBulletin | — |

### `GoogleCloudSecuritycenterV2YaraRuleSignature`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `yaraRule` | string | — |

### `GroupAssetsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compareDuration` | string (google-duration) | — |
| `filter` | string | — |
| `groupBy` | string | — |
| `pageSize` | integer (int32) | — |
| `pageToken` | string | — |
| `readTime` | string (google-datetime) | — |

### `GroupAssetsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `groupByResults` | array<GroupResult> | — |
| `nextPageToken` | string | — |
| `readTime` | string (google-datetime) | — |
| `totalSize` | integer (int32) | — |

### `GroupAssetsResponse` (v1beta1)

-
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `groupByResults` | array<GroupResult> | — |
| `nextPageToken` | string | — |
| `readTime` | string (google-datetime) | — |

### `GroupFindingsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compareDuration` | string (google-duration) | — |
| `filter` | string | — |
| `groupBy` | string | — |
| `pageSize` | integer (int32) | — |
| `pageToken` | string | — |
| `readTime` | string (google-datetime) | — |

### `GroupFindingsRequest` (v1beta1)

-
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `filter` | string | — |
| `groupBy` | string | — |
| `pageSize` | integer (int32) | — |
| `pageToken` | string | — |
| `readTime` | string (google-datetime) | — |

### `GroupFindingsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `groupByResults` | array<GroupResult> | — |
| `nextPageToken` | string | — |
| `readTime` | string (google-datetime) | — |
| `totalSize` | integer (int32) | — |

### `GroupFindingsResponse` (v1beta1)

-
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `groupByResults` | array<GroupResult> | — |
| `nextPageToken` | string | — |
| `readTime` | string (google-datetime) | — |

### `GroupMembership`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `groupId` | string | — |
| `groupType` | string enum | — Values: `GROUP_TYPE_UNSPECIFIED`, `GROUP_TYPE_TOXIC_COMBINATION`, `GROUP_TYPE_CHOKEPOINT`. |

### `GroupResult`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | — |
| `properties` | object | — |

### `HttpResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | — |
| `statusCode` | string | — |

### `IamBinding`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | — Values: `ACTION_UNSPECIFIED`, `ADD`, `REMOVE`. |
| `member` | string | — |
| `role` | string | — |

### `IamPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policyBlob` | string | — |

### `Indicator`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domains` | array<string> | — |
| `ipAddresses` | array<string> | — |
| `signatures` | array<ProcessSignature> | — |
| `uris` | array<string> | — |

### `InfoType`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `sensitivityScore` | SensitivityScore | — |
| `version` | string | — |

### `InvocationReference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `invocationId` | string | — |

### `IpRule`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `portRanges` | array<PortRange> | — |
| `protocol` | string | — |

### `IpRules`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowed` | Allowed | — |
| `denied` | Denied | — |
| `destinationIpRanges` | array<string> | — |
| `direction` | string enum | — Values: `DIRECTION_UNSPECIFIED`, `INGRESS`, `EGRESS`. |
| `exposedServices` | array<string> | — |
| `sourceIpRanges` | array<string> | — |

### `Job`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorCode` | integer (int32) | — |
| `location` | string | — |
| `name` | string | — |
| `state` | string enum | — Values: `JOB_STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`. |

### `KernelRootkit`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `unexpectedCodeModification` | boolean | — |
| `unexpectedFtraceHandler` | boolean | — |
| `unexpectedInterruptHandler` | boolean | — |
| `unexpectedKernelCodePages` | boolean | — |
| `unexpectedKprobeHandler` | boolean | — |
| `unexpectedProcessesInRunqueue` | boolean | — |
| `unexpectedReadOnlyDataModification` | boolean | — |
| `unexpectedSystemCallHandler` | boolean | — |

### `Kubernetes`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessReviews` | array<AccessReview> | — |
| `bindings` | array<GoogleCloudSecuritycenterV1Binding> | — |
| `nodePools` | array<NodePool> | — |
| `nodes` | array<Node> | — |
| `objects` | array<Object> | — |
| `pods` | array<Pod> | — |
| `roles` | array<Role> | — |

### `Label`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `value` | string | — |

### `ListAssetsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `listAssetsResults` | array<ListAssetsResult> | — |
| `nextPageToken` | string | — |
| `readTime` | string (google-datetime) | — |
| `totalSize` | integer (int32) | — |

### `ListAssetsResult`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asset` | Asset | — |
| `stateChange` | string enum | — Values: `UNUSED`, `ADDED`, `REMOVED`, `ACTIVE`. |

### `ListAssetsResult` (v1beta1)

-
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `asset` | Asset | — |
| `state` | string enum | — Values: `STATE_UNSPECIFIED`, `UNUSED`, `ADDED`, `REMOVED`, `ACTIVE`. |

### `ListAttackPathsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attackPaths` | array<AttackPath> | — |
| `nextPageToken` | string | — |

### `ListBigQueryExportsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigQueryExports` | array<GoogleCloudSecuritycenterV1BigQueryExport> | — |
| `nextPageToken` | string | — |

### `ListDescendantEventThreatDetectionCustomModulesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventThreatDetectionCustomModules` | array<EventThreatDetectionCustomModule> | — |
| `nextPageToken` | string | — |

### `ListDescendantSecurityHealthAnalyticsCustomModulesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | — |
| `securityHealthAnalyticsCustomModules` | array<GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule> | — |

### `ListEffectiveEventThreatDetectionCustomModulesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `effectiveEventThreatDetectionCustomModules` | array<EffectiveEventThreatDetectionCustomModule> | — |
| `nextPageToken` | string | — |

### `ListEffectiveSecurityHealthAnalyticsCustomModulesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `effectiveSecurityHealthAnalyticsCustomModules` | array<GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule> | — |
| `nextPageToken` | string | — |

### `ListEventThreatDetectionCustomModulesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventThreatDetectionCustomModules` | array<EventThreatDetectionCustomModule> | — |
| `nextPageToken` | string | — |

### `ListFindingsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `listFindingsResults` | array<ListFindingsResult> | — |
| `nextPageToken` | string | — |
| `readTime` | string (google-datetime) | — |
| `totalSize` | integer (int32) | — |

### `ListFindingsResponse` (v1beta1)

-
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `findings` | array<GoogleCloudSecuritycenterV1beta1Finding> | — |
| `nextPageToken` | string | — |
| `readTime` | string (google-datetime) | — |
| `totalSize` | integer (int32) | — |

### `ListFindingsResult`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `finding` | Finding | — |
| `resource` | Resource | — |
| `stateChange` | string enum | — Values: `UNUSED`, `CHANGED`, `UNCHANGED`, `ADDED`, `REMOVED`. |

### `ListMuteConfigsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `muteConfigs` | array<GoogleCloudSecuritycenterV1MuteConfig> | — |
| `nextPageToken` | string | — |

### `ListNotificationConfigsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | — |
| `notificationConfigs` | array<NotificationConfig> | — |

### `ListOperationsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | — |
| `operations` | array<Operation> | — |
| `unreachable` | array<string> | — |

### `ListResourceValueConfigsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | — |
| `resourceValueConfigs` | array<GoogleCloudSecuritycenterV1ResourceValueConfig> | — |

### `ListSecurityHealthAnalyticsCustomModulesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | — |
| `securityHealthAnalyticsCustomModules` | array<GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule> | — |

### `ListSourcesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | — |
| `sources` | array<Source> | — |

### `ListValuedResourcesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | — |
| `totalSize` | integer (int32) | — |
| `valuedResources` | array<ValuedResource> | — |

### `LoadBalancer`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `LogEntry`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudLoggingEntry` | CloudLoggingEntry | — |

### `MemoryHashSignature`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `binaryFamily` | string | — |
| `detections` | array<Detection> | — |

### `MitreAttack`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalTactics` | array<string> | — Values: `TACTIC_UNSPECIFIED`, `RECONNAISSANCE`, `RESOURCE_DEVELOPMENT`, `INITIAL_ACCESS`, `EXECUTION`, `PERSISTENCE`, `PRIVILEGE_ESCALATION`, `DEFENSE_EVASION`, `CREDENTIAL_ACCESS`, `DISCOVERY`, `LATERAL_MOVEMENT`, `COLLECTION`, `COMMAND_AND_CONTROL`, `EXFILTRATION`, `IMPACT`. |
| `additionalTechniques` | array<string> | — Values: `TECHNIQUE_UNSPECIFIED`, `DATA_OBFUSCATION`, `DATA_OBFUSCATION_STEGANOGRAPHY`, `OS_CREDENTIAL_DUMPING`, `OS_CREDENTIAL_DUMPING_PROC_FILESYSTEM`, `OS_CREDENTIAL_DUMPING_ETC_PASSWORD_AND_ETC_SHADOW`, `DATA_FROM_LOCAL_SYSTEM`, `AUTOMATED_EXFILTRATION`, `OBFUSCATED_FILES_OR_INFO`, `STEGANOGRAPHY`, `COMPILE_AFTER_DELIVERY`, `COMMAND_OBFUSCATION`, `SCHEDULED_TRANSFER`, `SYSTEM_OWNER_USER_DISCOVERY`, `MASQUERADING`, `MATCH_LEGITIMATE_NAME_OR_LOCATION`, `BOOT_OR_LOGON_INITIALIZATION_SCRIPTS`, `STARTUP_ITEMS`, `NETWORK_SERVICE_DISCOVERY`, `SCHEDULED_TASK_JOB`, `SCHEDULED_TASK_JOB_CRON`, `CONTAINER_ORCHESTRATION_JOB`, `PROCESS_INJECTION`, `INPUT_CAPTURE`, `INPUT_CAPTURE_KEYLOGGING`, `PROCESS_DISCOVERY`, `COMMAND_AND_SCRIPTING_INTERPRETER`, `UNIX_SHELL`, `PYTHON`, `EXPLOITATION_FOR_PRIVILEGE_ESCALATION`, `PERMISSION_GROUPS_DISCOVERY`, `CLOUD_GROUPS`, `INDICATOR_REMOVAL`, `INDICATOR_REMOVAL_CLEAR_LINUX_OR_MAC_SYSTEM_LOGS`, `INDICATOR_REMOVAL_CLEAR_COMMAND_HISTORY`, `INDICATOR_REMOVAL_FILE_DELETION`, `INDICATOR_REMOVAL_TIMESTOMP`, `INDICATOR_REMOVAL_CLEAR_MAILBOX_DATA`, `APPLICATION_LAYER_PROTOCOL`, `DNS`, `SOFTWARE_DEPLOYMENT_TOOLS`, `VALID_ACCOUNTS`, `DEFAULT_ACCOUNTS`, `LOCAL_ACCOUNTS`, `CLOUD_ACCOUNTS`, `FILE_AND_DIRECTORY_DISCOVERY`, `ACCOUNT_DISCOVERY_LOCAL_ACCOUNT`, `PROXY`, `EXTERNAL_PROXY`, `MULTI_HOP_PROXY`, `ACCOUNT_MANIPULATION`, `ADDITIONAL_CLOUD_CREDENTIALS`, `ADDITIONAL_CLOUD_ROLES`, `SSH_AUTHORIZED_KEYS`, `ADDITIONAL_CONTAINER_CLUSTER_ROLES`, `MULTI_STAGE_CHANNELS`, `INGRESS_TOOL_TRANSFER`, `NATIVE_API`, `BRUTE_FORCE`, `AUTOMATED_COLLECTION`, `SHARED_MODULES`, `DATA_ENCODING`, `STANDARD_ENCODING`, `ACCESS_TOKEN_MANIPULATION`, `TOKEN_IMPERSONATION_OR_THEFT`, `CREATE_ACCOUNT`, `LOCAL_ACCOUNT`, `DEOBFUSCATE_DECODE_FILES_OR_INFO`, `EXPLOIT_PUBLIC_FACING_APPLICATION`, `SUPPLY_CHAIN_COMPROMISE`, `COMPROMISE_SOFTWARE_DEPENDENCIES_AND_DEVELOPMENT_TOOLS`, `EXPLOITATION_FOR_CLIENT_EXECUTION`, `USER_EXECUTION`, `EXPLOITATION_FOR_CREDENTIAL_ACCESS`, `LINUX_AND_MAC_FILE_AND_DIRECTORY_PERMISSIONS_MODIFICATION`, `DOMAIN_POLICY_MODIFICATION`, `DATA_DESTRUCTION`, `DATA_ENCRYPTED_FOR_IMPACT`, `SERVICE_STOP`, `INHIBIT_SYSTEM_RECOVERY`, `FIRMWARE_CORRUPTION`, `RESOURCE_HIJACKING`, `NETWORK_DENIAL_OF_SERVICE`, `CLOUD_SERVICE_DISCOVERY`, `STEAL_APPLICATION_ACCESS_TOKEN`, `ACCOUNT_ACCESS_REMOVAL`, `TRANSFER_DATA_TO_CLOUD_ACCOUNT`, `STEAL_WEB_SESSION_COOKIE`, `CREATE_OR_MODIFY_SYSTEM_PROCESS`, `EVENT_TRIGGERED_EXECUTION`, `BOOT_OR_LOGON_AUTOSTART_EXECUTION`, `KERNEL_MODULES_AND_EXTENSIONS`, `SHORTCUT_MODIFICATION`, `ABUSE_ELEVATION_CONTROL_MECHANISM`, `ABUSE_ELEVATION_CONTROL_MECHANISM_SETUID_AND_SETGID`, `ABUSE_ELEVATION_CONTROL_MECHANISM_SUDO_AND_SUDO_CACHING`, `UNSECURED_CREDENTIALS`, `CREDENTIALS_IN_FILES`, `BASH_HISTORY`, `PRIVATE_KEYS`, `SUBVERT_TRUST_CONTROL`, `INSTALL_ROOT_CERTIFICATE`, `COMPROMISE_HOST_SOFTWARE_BINARY`, `CREDENTIALS_FROM_PASSWORD_STORES`, `MODIFY_AUTHENTICATION_PROCESS`, `PLUGGABLE_AUTHENTICATION_MODULES`, `MULTI_FACTOR_AUTHENTICATION`, `IMPAIR_DEFENSES`, `DISABLE_OR_MODIFY_TOOLS`, `INDICATOR_BLOCKING`, `DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM`, `HIDE_ARTIFACTS`, `HIDDEN_FILES_AND_DIRECTORIES`, `HIDDEN_USERS`, `EXFILTRATION_OVER_WEB_SERVICE`, `EXFILTRATION_TO_CLOUD_STORAGE`, `DYNAMIC_RESOLUTION`, `LATERAL_TOOL_TRANSFER`, `HIJACK_EXECUTION_FLOW`, `HIJACK_EXECUTION_FLOW_DYNAMIC_LINKER_HIJACKING`, `MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE`, `CREATE_SNAPSHOT`, `CLOUD_INFRASTRUCTURE_DISCOVERY`, `DEVELOP_CAPABILITIES`, `DEVELOP_CAPABILITIES_MALWARE`, `OBTAIN_CAPABILITIES`, `OBTAIN_CAPABILITIES_MALWARE`, `OBTAIN_CAPABILITIES_VULNERABILITIES`, `ACTIVE_SCANNING`, `SCANNING_IP_BLOCKS`, `STAGE_CAPABILITIES`, `UPLOAD_MALWARE`, `CONTAINER_ADMINISTRATION_COMMAND`, `DEPLOY_CONTAINER`, `ESCAPE_TO_HOST`, `CONTAINER_AND_RESOURCE_DISCOVERY`, `REFLECTIVE_CODE_LOADING`, `STEAL_OR_FORGE_AUTHENTICATION_CERTIFICATES`, `FINANCIAL_THEFT`. |
| `primaryTactic` | string enum | — Values: `TACTIC_UNSPECIFIED`, `RECONNAISSANCE`, `RESOURCE_DEVELOPMENT`, `INITIAL_ACCESS`, `EXECUTION`, `PERSISTENCE`, `PRIVILEGE_ESCALATION`, `DEFENSE_EVASION`, `CREDENTIAL_ACCESS`, `DISCOVERY`, `LATERAL_MOVEMENT`, `COLLECTION`, `COMMAND_AND_CONTROL`, `EXFILTRATION`, `IMPACT`. |
| `primaryTechniques` | array<string> | — Values: `TECHNIQUE_UNSPECIFIED`, `DATA_OBFUSCATION`, `DATA_OBFUSCATION_STEGANOGRAPHY`, `OS_CREDENTIAL_DUMPING`, `OS_CREDENTIAL_DUMPING_PROC_FILESYSTEM`, `OS_CREDENTIAL_DUMPING_ETC_PASSWORD_AND_ETC_SHADOW`, `DATA_FROM_LOCAL_SYSTEM`, `AUTOMATED_EXFILTRATION`, `OBFUSCATED_FILES_OR_INFO`, `STEGANOGRAPHY`, `COMPILE_AFTER_DELIVERY`, `COMMAND_OBFUSCATION`, `SCHEDULED_TRANSFER`, `SYSTEM_OWNER_USER_DISCOVERY`, `MASQUERADING`, `MATCH_LEGITIMATE_NAME_OR_LOCATION`, `BOOT_OR_LOGON_INITIALIZATION_SCRIPTS`, `STARTUP_ITEMS`, `NETWORK_SERVICE_DISCOVERY`, `SCHEDULED_TASK_JOB`, `SCHEDULED_TASK_JOB_CRON`, `CONTAINER_ORCHESTRATION_JOB`, `PROCESS_INJECTION`, `INPUT_CAPTURE`, `INPUT_CAPTURE_KEYLOGGING`, `PROCESS_DISCOVERY`, `COMMAND_AND_SCRIPTING_INTERPRETER`, `UNIX_SHELL`, `PYTHON`, `EXPLOITATION_FOR_PRIVILEGE_ESCALATION`, `PERMISSION_GROUPS_DISCOVERY`, `CLOUD_GROUPS`, `INDICATOR_REMOVAL`, `INDICATOR_REMOVAL_CLEAR_LINUX_OR_MAC_SYSTEM_LOGS`, `INDICATOR_REMOVAL_CLEAR_COMMAND_HISTORY`, `INDICATOR_REMOVAL_FILE_DELETION`, `INDICATOR_REMOVAL_TIMESTOMP`, `INDICATOR_REMOVAL_CLEAR_MAILBOX_DATA`, `APPLICATION_LAYER_PROTOCOL`, `DNS`, `SOFTWARE_DEPLOYMENT_TOOLS`, `VALID_ACCOUNTS`, `DEFAULT_ACCOUNTS`, `LOCAL_ACCOUNTS`, `CLOUD_ACCOUNTS`, `FILE_AND_DIRECTORY_DISCOVERY`, `ACCOUNT_DISCOVERY_LOCAL_ACCOUNT`, `PROXY`, `EXTERNAL_PROXY`, `MULTI_HOP_PROXY`, `ACCOUNT_MANIPULATION`, `ADDITIONAL_CLOUD_CREDENTIALS`, `ADDITIONAL_CLOUD_ROLES`, `SSH_AUTHORIZED_KEYS`, `ADDITIONAL_CONTAINER_CLUSTER_ROLES`, `MULTI_STAGE_CHANNELS`, `INGRESS_TOOL_TRANSFER`, `NATIVE_API`, `BRUTE_FORCE`, `AUTOMATED_COLLECTION`, `SHARED_MODULES`, `DATA_ENCODING`, `STANDARD_ENCODING`, `ACCESS_TOKEN_MANIPULATION`, `TOKEN_IMPERSONATION_OR_THEFT`, `CREATE_ACCOUNT`, `LOCAL_ACCOUNT`, `DEOBFUSCATE_DECODE_FILES_OR_INFO`, `EXPLOIT_PUBLIC_FACING_APPLICATION`, `SUPPLY_CHAIN_COMPROMISE`, `COMPROMISE_SOFTWARE_DEPENDENCIES_AND_DEVELOPMENT_TOOLS`, `EXPLOITATION_FOR_CLIENT_EXECUTION`, `USER_EXECUTION`, `EXPLOITATION_FOR_CREDENTIAL_ACCESS`, `LINUX_AND_MAC_FILE_AND_DIRECTORY_PERMISSIONS_MODIFICATION`, `DOMAIN_POLICY_MODIFICATION`, `DATA_DESTRUCTION`, `DATA_ENCRYPTED_FOR_IMPACT`, `SERVICE_STOP`, `INHIBIT_SYSTEM_RECOVERY`, `FIRMWARE_CORRUPTION`, `RESOURCE_HIJACKING`, `NETWORK_DENIAL_OF_SERVICE`, `CLOUD_SERVICE_DISCOVERY`, `STEAL_APPLICATION_ACCESS_TOKEN`, `ACCOUNT_ACCESS_REMOVAL`, `TRANSFER_DATA_TO_CLOUD_ACCOUNT`, `STEAL_WEB_SESSION_COOKIE`, `CREATE_OR_MODIFY_SYSTEM_PROCESS`, `EVENT_TRIGGERED_EXECUTION`, `BOOT_OR_LOGON_AUTOSTART_EXECUTION`, `KERNEL_MODULES_AND_EXTENSIONS`, `SHORTCUT_MODIFICATION`, `ABUSE_ELEVATION_CONTROL_MECHANISM`, `ABUSE_ELEVATION_CONTROL_MECHANISM_SETUID_AND_SETGID`, `ABUSE_ELEVATION_CONTROL_MECHANISM_SUDO_AND_SUDO_CACHING`, `UNSECURED_CREDENTIALS`, `CREDENTIALS_IN_FILES`, `BASH_HISTORY`, `PRIVATE_KEYS`, `SUBVERT_TRUST_CONTROL`, `INSTALL_ROOT_CERTIFICATE`, `COMPROMISE_HOST_SOFTWARE_BINARY`, `CREDENTIALS_FROM_PASSWORD_STORES`, `MODIFY_AUTHENTICATION_PROCESS`, `PLUGGABLE_AUTHENTICATION_MODULES`, `MULTI_FACTOR_AUTHENTICATION`, `IMPAIR_DEFENSES`, `DISABLE_OR_MODIFY_TOOLS`, `INDICATOR_BLOCKING`, `DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM`, `HIDE_ARTIFACTS`, `HIDDEN_FILES_AND_DIRECTORIES`, `HIDDEN_USERS`, `EXFILTRATION_OVER_WEB_SERVICE`, `EXFILTRATION_TO_CLOUD_STORAGE`, `DYNAMIC_RESOLUTION`, `LATERAL_TOOL_TRANSFER`, `HIJACK_EXECUTION_FLOW`, `HIJACK_EXECUTION_FLOW_DYNAMIC_LINKER_HIJACKING`, `MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE`, `CREATE_SNAPSHOT`, `CLOUD_INFRASTRUCTURE_DISCOVERY`, `DEVELOP_CAPABILITIES`, `DEVELOP_CAPABILITIES_MALWARE`, `OBTAIN_CAPABILITIES`, `OBTAIN_CAPABILITIES_MALWARE`, `OBTAIN_CAPABILITIES_VULNERABILITIES`, `ACTIVE_SCANNING`, `SCANNING_IP_BLOCKS`, `STAGE_CAPABILITIES`, `UPLOAD_MALWARE`, `CONTAINER_ADMINISTRATION_COMMAND`, `DEPLOY_CONTAINER`, `ESCAPE_TO_HOST`, `CONTAINER_AND_RESOURCE_DISCOVERY`, `REFLECTIVE_CODE_LOADING`, `STEAL_OR_FORGE_AUTHENTICATION_CERTIFICATES`, `FINANCIAL_THEFT`. |
| `version` | string | — |

### `MuteInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dynamicMuteRecords` | array<DynamicMuteRecord> | — |
| `staticMute` | StaticMute | — |

### `Network`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `Node`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `NodePool`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `nodes` | array<Node> | — |

### `Notebook`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastAuthor` | string | — |
| `name` | string | — |
| `notebookUpdateTime` | string (google-datetime) | — |
| `service` | string | — |

### `NotificationConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deletionNotificationsEnabled` | boolean | — |
| `description` | string | — |
| `name` | string | — |
| `pubsubTopic` | string | — |
| `serviceAccount` | string | — |
| `streamingConfig` | StreamingConfig | — |

### `Object`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containers` | array<Container> | — |
| `group` | string | — |
| `kind` | string | — |
| `name` | string | — |
| `ns` | string | — |

### `Operation`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | — |
| `error` | Status | — |
| `metadata` | object | — |
| `name` | string | — |
| `response` | object | — |

### `OrgPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `OrganizationSettings`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetDiscoveryConfig` | AssetDiscoveryConfig | — |
| `enableAssetDiscovery` | boolean | — |
| `name` | string | — |

### `Package`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpeUri` | string | — |
| `packageName` | string | — |
| `packageType` | string | — |
| `packageVersion` | string | — |

### `PathNodeAssociatedFinding`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canonicalFinding` | string | — |
| `findingCategory` | string | — |
| `name` | string | — |

### `Pipeline`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `name` | string | — |

### `Pod`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containers` | array<Container> | — |
| `labels` | array<Label> | — |
| `name` | string | — |
| `ns` | string | — |

### `Policy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | — |
| `bindings` | array<Binding> | — |
| `etag` | string (byte) | — |
| `version` | integer (int32) | — |

### `PolicyDriftDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detectedValue` | string | — |
| `expectedValue` | string | — |
| `field` | string | — |

### `PolicyViolationSummary`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conformantResourcesCount` | string (int64) | — |
| `evaluationErrorsCount` | string (int64) | — |
| `outOfScopeResourcesCount` | string (int64) | — |
| `policyViolationsCount` | string (int64) | — |

### `PortRange`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `max` | string (int64) | — |
| `min` | string (int64) | — |

### `Position`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columnNumber` | integer (int32) | — |
| `lineNumber` | integer (int32) | — |

### `Process`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | — |
| `argumentsTruncated` | boolean | — |
| `binary` | File | — |
| `envVariables` | array<EnvironmentVariable> | — |
| `envVariablesTruncated` | boolean | — |
| `libraries` | array<File> | — |
| `name` | string | — |
| `parentPid` | string (int64) | — |
| `pid` | string (int64) | — |
| `script` | File | — |
| `userId` | string (int64) | — |

### `ProcessSignature`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `memoryHashSignature` | MemoryHashSignature | — |
| `signatureType` | string enum | — Values: `SIGNATURE_TYPE_UNSPECIFIED`, `SIGNATURE_TYPE_PROCESS`, `SIGNATURE_TYPE_FILE`. |
| `yaraRuleSignature` | YaraRuleSignature | — |

### `RapidVulnerabilityDetectionSettings`

-
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `modules` | object | — |
| `name` | string | — |
| `serviceEnablementState` | string enum | — Values: `ENABLEMENT_STATE_UNSPECIFIED`, `INHERITED`, `ENABLED`, `DISABLED`. |
| `updateTime` | string (google-datetime) | — |

### `Reference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `source` | string | — |
| `uri` | string | — |

### `Requests`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `longTermAllowed` | integer (int32) | — |
| `longTermDenied` | integer (int32) | — |
| `ratio` | number (double) | — |
| `shortTermAllowed` | integer (int32) | — |

### `Resource`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adcApplication` | AdcApplication | — |
| `adcApplicationTemplate` | AdcApplicationTemplateRevision | — |
| `adcSharedTemplate` | AdcSharedTemplateRevision | — |
| `application` | GoogleCloudSecuritycenterV1ResourceApplication | — |
| `awsMetadata` | AwsMetadata | — |
| `azureMetadata` | AzureMetadata | — |
| `cloudProvider` | string enum | — Values: `CLOUD_PROVIDER_UNSPECIFIED`, `GOOGLE_CLOUD_PLATFORM`, `AMAZON_WEB_SERVICES`, `MICROSOFT_AZURE`. |
| `displayName` | string | — |
| `folders` | array<Folder> | — |
| `location` | string | — |
| `name` | string | — |
| `organization` | string | — |
| `parentDisplayName` | string | — |
| `parentName` | string | — |
| `projectDisplayName` | string | — |
| `projectName` | string | — |
| `resourcePath` | ResourcePath | — |
| `resourcePathString` | string | — |
| `service` | string | — |
| `type` | string | — |

### `ResourcePath`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodes` | array<ResourcePathNode> | — |

### `ResourcePathNode`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `id` | string | — |
| `nodeType` | string enum | — Values: `RESOURCE_PATH_NODE_TYPE_UNSPECIFIED`, `GCP_ORGANIZATION`, `GCP_FOLDER`, `GCP_PROJECT`, `AWS_ORGANIZATION`, `AWS_ORGANIZATIONAL_UNIT`, `AWS_ACCOUNT`, `AZURE_MANAGEMENT_GROUP`, `AZURE_SUBSCRIPTION`, `AZURE_RESOURCE_GROUP`. |

### `ResourceValueConfigMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `Role`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string enum | — Values: `KIND_UNSPECIFIED`, `ROLE`, `CLUSTER_ROLE`. |
| `name` | string | — |
| `ns` | string | — |

### `RunAssetDiscoveryRequest`

-
- Version: v1

### `Secret`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `environmentVariable` | SecretEnvironmentVariable | — |
| `filePath` | SecretFilePath | — |
| `status` | SecretStatus | — |
| `type` | string | — |

### `SecretEnvironmentVariable`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | — |

### `SecretFilePath`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | — |

### `SecretStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastUpdatedTime` | string (google-datetime) | — |
| `validity` | string enum | — Values: `SECRET_VALIDITY_UNSPECIFIED`, `SECRET_VALIDITY_UNSUPPORTED`, `SECRET_VALIDITY_FAILED`, `SECRET_VALIDITY_INVALID`, `SECRET_VALIDITY_VALID`. |

### `SecurityBulletin`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bulletinId` | string | — |
| `submissionTime` | string (google-datetime) | — |
| `suggestedUpgradeVersion` | string | — |

### `SecurityCenterProperties`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `folders` | array<Folder> | — |
| `resourceDisplayName` | string | — |
| `resourceName` | string | — |
| `resourceOwners` | array<string> | — |
| `resourceParent` | string | — |
| `resourceParentDisplayName` | string | — |
| `resourceProject` | string | — |
| `resourceProjectDisplayName` | string | — |
| `resourceType` | string | — |

### `SecurityCenterProperties` (v1beta1)

-
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `resourceName` | string | — |
| `resourceOwners` | array<string> | — |
| `resourceParent` | string | — |
| `resourceProject` | string | — |
| `resourceType` | string | — |

### `SecurityCenterSettings`

-
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `cryptoKeyName` | string | — |
| `logSinkProject` | string | — |
| `name` | string | — |
| `onboardingTime` | string (google-datetime) | — |
| `orgServiceAccount` | string | — |

### `SecurityHealthAnalyticsSettings`

-
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `modules` | object | — |
| `name` | string | — |
| `serviceAccount` | string | — |
| `serviceEnablementState` | string enum | — Values: `ENABLEMENT_STATE_UNSPECIFIED`, `INHERITED`, `ENABLED`, `DISABLED`. |
| `updateTime` | string (google-datetime) | — |

### `SecurityMarks`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canonicalName` | string | — |
| `marks` | object | — |
| `name` | string | — |

### `SecurityPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `preview` | boolean | — |
| `type` | string | — |

### `SecurityPosture`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changedPolicy` | string | — |
| `name` | string | — |
| `policy` | string | — |
| `policyDriftDetails` | array<PolicyDriftDetails> | — |
| `policySet` | string | — |
| `postureDeployment` | string | — |
| `postureDeploymentResource` | string | — |
| `revisionId` | string | — |

### `SensitivityScore`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `score` | string enum | — Values: `SENSITIVITY_SCORE_LEVEL_UNSPECIFIED`, `SENSITIVITY_LOW`, `SENSITIVITY_UNKNOWN`, `SENSITIVITY_MODERATE`, `SENSITIVITY_HIGH`. |

### `ServiceAccountDelegationInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `principalEmail` | string | — |
| `principalSubject` | string | — |

### `SetFindingStateRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `startTime` | string (google-datetime) | — |
| `state` | string enum | — Values: `STATE_UNSPECIFIED`, `ACTIVE`, `INACTIVE`. |

### `SetIamPolicyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | — |
| `updateMask` | string (google-fieldmask) | — |

### `SetMuteRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mute` | string enum | — Values: `MUTE_UNSPECIFIED`, `MUTED`, `UNMUTED`, `UNDEFINED`. |

### `SimulateSecurityHealthAnalyticsCustomModuleRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customConfig` | GoogleCloudSecuritycenterV1CustomConfig | — |
| `resource` | SimulatedResource | — |

### `SimulateSecurityHealthAnalyticsCustomModuleResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `result` | SimulatedResult | — |

### `SimulatedResource`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `iamPolicyData` | Policy | — |
| `resourceData` | object | — |
| `resourceType` | string | — |

### `SimulatedResult`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | Status | — |
| `finding` | Finding | — |
| `noViolation` | Empty | — |

### `Simulation`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudProvider` | string enum | — Values: `CLOUD_PROVIDER_UNSPECIFIED`, `GOOGLE_CLOUD_PLATFORM`, `AMAZON_WEB_SERVICES`, `MICROSOFT_AZURE`. |
| `createTime` | string (google-datetime) | — |
| `name` | string | — |
| `resourceValueConfigsMetadata` | array<ResourceValueConfigMetadata> | — |

### `Source`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canonicalName` | string | — |
| `description` | string | — |
| `displayName` | string | — |
| `name` | string | — |

### `Source` (v1beta1)

-
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `description` | string | — |
| `displayName` | string | — |
| `name` | string | — |

### `StaticMute`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applyTime` | string (google-datetime) | — |
| `state` | string enum | — Values: `MUTE_UNSPECIFIED`, `MUTED`, `UNMUTED`, `UNDEFINED`. |

### `Status`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | — |
| `details` | array<object> | — |
| `message` | string | — |

### `StreamingConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filter` | string | — |

### `Subject`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string enum | — Values: `AUTH_TYPE_UNSPECIFIED`, `USER`, `SERVICEACCOUNT`, `GROUP`. |
| `name` | string | — |
| `ns` | string | — |

### `Subscription`

-
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `details` | Details | — |
| `name` | string | — |
| `tier` | string enum | — Values: `TIER_UNSPECIFIED`, `STANDARD`, `PREMIUM`, `ENTERPRISE`, `ENTERPRISE_MC`. |

### `TestIamPermissionsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | — |

### `TestIamPermissionsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | — |

### `TicketInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assignee` | string | — |
| `description` | string | — |
| `id` | string | — |
| `status` | string | — |
| `updateTime` | string (google-datetime) | — |
| `uri` | string | — |

### `ToxicCombination`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attackExposureScore` | number (double) | — |
| `relatedFindings` | array<string> | — |

### `ValidateEventThreatDetectionCustomModuleRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rawText` | string | — |
| `type` | string | — |

### `ValidateEventThreatDetectionCustomModuleResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errors` | CustomModuleValidationErrors | — |

### `ValuedResource`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `exposedScore` | number (double) | — |
| `name` | string | — |
| `resource` | string | — |
| `resourceType` | string | — |
| `resourceValue` | string enum | — Values: `RESOURCE_VALUE_UNSPECIFIED`, `RESOURCE_VALUE_LOW`, `RESOURCE_VALUE_MEDIUM`, `RESOURCE_VALUE_HIGH`. |
| `resourceValueConfigsUsed` | array<ResourceValueConfigMetadata> | — |

### `VertexAi`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `datasets` | array<Dataset> | — |
| `pipelines` | array<Pipeline> | — |

### `VirtualMachineThreatDetectionSettings`

-
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `modules` | object | — |
| `name` | string | — |
| `serviceAccount` | string | — |
| `serviceEnablementState` | string enum | — Values: `ENABLEMENT_STATE_UNSPECIFIED`, `INHERITED`, `ENABLED`, `DISABLED`. |
| `updateTime` | string (google-datetime) | — |

### `Vulnerability`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cve` | Cve | — |
| `cwes` | array<Cwe> | — |
| `fixedPackage` | Package | — |
| `offendingPackage` | Package | — |
| `providerRiskScore` | string (int64) | — |
| `reachable` | boolean | — |
| `securityBulletin` | SecurityBulletin | — |

### `VulnerabilityCountBySeverity`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `severityToFindingCount` | object | — |

### `VulnerabilitySnapshot`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudProvider` | string enum | — Values: `CLOUD_PROVIDER_UNSPECIFIED`, `GOOGLE_CLOUD_PLATFORM`, `AMAZON_WEB_SERVICES`, `MICROSOFT_AZURE`. |
| `findingCount` | VulnerabilityCountBySeverity | — |
| `name` | string | — |
| `snapshotTime` | string (google-datetime) | — |

### `WebSecurityScannerSettings`

-
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `modules` | object | — |
| `name` | string | — |
| `serviceEnablementState` | string enum | — Values: `ENABLEMENT_STATE_UNSPECIFIED`, `INHERITED`, `ENABLED`, `DISABLED`. |
| `updateTime` | string (google-datetime) | — |

### `YaraRuleSignature`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `yaraRule` | string | — |

### Shape of `GoogleCloudSecuritycenterV2ResourcePath`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "nodes": "array<GoogleCloudSecuritycenterV2ResourcePathNode>"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2, v1beta1 of `securitycenter` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://securitycenter.googleapis.com/$discovery/rest?version=v1, https://securitycenter.googleapis.com/$discovery/rest?version=v1beta2, https://securitycenter.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
