---
source: https://securitycenter.googleapis.com/$discovery/rest?version=v1
---

# Security Command Center API message schemas (securitycenter) (part 2/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/securitycenter/`.

### `GoogleCloudSecuritycenterV2AccessReview`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `group` | string | — |
| `name` | string | — |
| `ns` | string | — |
| `resource` | string | — |
| `subresource` | string | — |
| `verb` | string | — |
| `version` | string | — |

### `GoogleCloudSecuritycenterV2AdaptiveProtection`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `confidence` | number (double) | — |

### `GoogleCloudSecuritycenterV2AdcApplication`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | GoogleCloudSecuritycenterV2ResourceApplicationAttributes | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV2AdcApplicationTemplateRevision`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `GoogleCloudSecuritycenterV2AdcSharedTemplateRevision`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `GoogleCloudSecuritycenterV2AffectedResources`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | — |

### `GoogleCloudSecuritycenterV2Agent`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `id` | string | — |

### `GoogleCloudSecuritycenterV2AgentAnomaly`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `confidenceScore` | number (double) | — |
| `detectorReferences` | array<GoogleCloudSecuritycenterV2DetectorReference> | — |
| `invocationReferences` | array<GoogleCloudSecuritycenterV2InvocationReference> | — |

### `GoogleCloudSecuritycenterV2AgentDataAccessEvent`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventId` | string | — |
| `eventTime` | string (google-datetime) | — |
| `operation` | string enum | — Values: `OPERATION_UNSPECIFIED`, `READ`, `MOVE`, `COPY`. |
| `principalSubject` | string | — |

### `GoogleCloudSecuritycenterV2AgentSession`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sessionId` | string | — |

### `GoogleCloudSecuritycenterV2AiModel`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deploymentPlatform` | string enum | — Values: `DEPLOYMENT_PLATFORM_UNSPECIFIED`, `VERTEX_AI`, `GKE`, `GCE`, `FINE_TUNED_MODEL`. |
| `displayName` | string | — |
| `domain` | string | — |
| `library` | string | — |
| `location` | string | — |
| `name` | string | — |
| `publisher` | string | — |
| `usageCategory` | string | — |

### `GoogleCloudSecuritycenterV2Allowed`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipRules` | array<GoogleCloudSecuritycenterV2IpRule> | — |

### `GoogleCloudSecuritycenterV2Application`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseUri` | string | — |
| `fullUri` | string | — |

### `GoogleCloudSecuritycenterV2ArtifactGuardPolicies`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failingPolicies` | array<GoogleCloudSecuritycenterV2ArtifactGuardPolicy> | — |
| `resourceId` | string | — |

### `GoogleCloudSecuritycenterV2ArtifactGuardPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failureReason` | string | — |
| `policyId` | string | — |
| `type` | string enum | — Values: `ARTIFACT_GUARD_POLICY_TYPE_UNSPECIFIED`, `VULNERABILITY`. |

### `GoogleCloudSecuritycenterV2Attack`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `classification` | string | — |
| `volumeBps` | integer (int32) | — |
| `volumeBpsLong` | string (int64) | — |
| `volumePps` | integer (int32) | — |
| `volumePpsLong` | string (int64) | — |

### `GoogleCloudSecuritycenterV2AttackExposure`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attackExposureResult` | string | — |
| `exposedHighValueResourcesCount` | integer (int32) | — |
| `exposedLowValueResourcesCount` | integer (int32) | — |
| `exposedMediumValueResourcesCount` | integer (int32) | — |
| `latestCalculationTime` | string (google-datetime) | — |
| `score` | number (double) | — |
| `state` | string enum | — Values: `STATE_UNSPECIFIED`, `CALCULATED`, `NOT_CALCULATED`. |

### `GoogleCloudSecuritycenterV2AwsAccount`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV2AwsMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `account` | GoogleCloudSecuritycenterV2AwsAccount | — |
| `organization` | GoogleCloudSecuritycenterV2AwsOrganization | — |
| `organizationalUnits` | array<GoogleCloudSecuritycenterV2AwsOrganizationalUnit> | — |

### `GoogleCloudSecuritycenterV2AwsOrganization`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |

### `GoogleCloudSecuritycenterV2AwsOrganizationalUnit`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV2AzureManagementGroup`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `id` | string | — |

### `GoogleCloudSecuritycenterV2AzureMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `managementGroups` | array<GoogleCloudSecuritycenterV2AzureManagementGroup> | — |
| `resourceGroup` | GoogleCloudSecuritycenterV2AzureResourceGroup | — |
| `subscription` | GoogleCloudSecuritycenterV2AzureSubscription | — |
| `tenant` | GoogleCloudSecuritycenterV2AzureTenant | — |

### `GoogleCloudSecuritycenterV2AzureResourceGroup`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV2AzureSubscription`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `id` | string | — |

### `GoogleCloudSecuritycenterV2AzureTenant`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `id` | string | — |

### `GoogleCloudSecuritycenterV2BackupDisasterRecovery`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appliance` | string | — |
| `applications` | array<string> | — |
| `backupCreateTime` | string (google-datetime) | — |
| `backupTemplate` | string | — |
| `backupType` | string | — |
| `host` | string | — |
| `policies` | array<string> | — |
| `policyOptions` | array<string> | — |
| `profile` | string | — |
| `storagePool` | string | — |

### `GoogleCloudSecuritycenterV2BigQueryExport`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | — |
| `cryptoKeyName` | string | — |
| `dataset` | string | — |
| `deletionNotificationsEnabled` | boolean | — |
| `description` | string | — |
| `filter` | string | — |
| `mostRecentEditor` | string | — |
| `name` | string | — |
| `principal` | string | — |
| `updateTime` | string (google-datetime) | — |

### `GoogleCloudSecuritycenterV2Binding`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `ns` | string | — |
| `role` | GoogleCloudSecuritycenterV2Role | — |
| `subjects` | array<GoogleCloudSecuritycenterV2Subject> | — |

### `GoogleCloudSecuritycenterV2BulkMuteFindingsResponse`

-
- Version: v1

### `GoogleCloudSecuritycenterV2Chokepoint`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `relatedFindings` | array<string> | — |

### `GoogleCloudSecuritycenterV2CloudArmor`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adaptiveProtection` | GoogleCloudSecuritycenterV2AdaptiveProtection | — |
| `attack` | GoogleCloudSecuritycenterV2Attack | — |
| `duration` | string (google-duration) | — |
| `requests` | GoogleCloudSecuritycenterV2Requests | — |
| `securityPolicy` | GoogleCloudSecuritycenterV2SecurityPolicy | — |
| `threatVector` | string | — |

### `GoogleCloudSecuritycenterV2CloudControl`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudControlName` | string | — |
| `policyType` | string | — |
| `type` | string enum | — Values: `CLOUD_CONTROL_TYPE_UNSPECIFIED`, `BUILT_IN`, `CUSTOM`. |
| `version` | integer (int32) | — |

### `GoogleCloudSecuritycenterV2CloudDlpDataProfile`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataProfile` | string | — |
| `infoTypes` | array<GoogleCloudSecuritycenterV2InfoType> | — |
| `parentType` | string enum | — Values: `PARENT_TYPE_UNSPECIFIED`, `ORGANIZATION`, `PROJECT`. |

### `GoogleCloudSecuritycenterV2CloudDlpInspection`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullScan` | boolean | — |
| `infoType` | string | — |
| `infoTypeCount` | string (int64) | — |
| `inspectJob` | string | — |

### `GoogleCloudSecuritycenterV2CloudLoggingEntry`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `insertId` | string | — |
| `logId` | string | — |
| `resourceContainer` | string | — |
| `timestamp` | string (google-datetime) | — |

### `GoogleCloudSecuritycenterV2CloudRun`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `revisions` | array<string> | — |

### `GoogleCloudSecuritycenterV2Compliance`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ids` | array<string> | — |
| `standard` | string | — |
| `version` | string | — |

### `GoogleCloudSecuritycenterV2ComplianceDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudControl` | GoogleCloudSecuritycenterV2CloudControl | — |
| `cloudControlDeploymentNames` | array<string> | — |
| `frameworks` | array<GoogleCloudSecuritycenterV2Framework> | — |

### `GoogleCloudSecuritycenterV2Connection`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationIp` | string | — |
| `destinationPort` | integer (int32) | — |
| `protocol` | string enum | — Values: `PROTOCOL_UNSPECIFIED`, `ICMP`, `TCP`, `UDP`, `GRE`, `ESP`. |
| `sourceIp` | string | — |
| `sourcePort` | integer (int32) | — |

### `GoogleCloudSecuritycenterV2Contact`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | — |

### `GoogleCloudSecuritycenterV2ContactDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contacts` | array<GoogleCloudSecuritycenterV2Contact> | — |

### `GoogleCloudSecuritycenterV2Container`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | — |
| `imageId` | string | — |
| `labels` | array<GoogleCloudSecuritycenterV2Label> | — |
| `name` | string | — |
| `uri` | string | — |

### `GoogleCloudSecuritycenterV2Control`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlName` | string | — |
| `displayName` | string | — |

### `GoogleCloudSecuritycenterV2Cve`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cvssv3` | GoogleCloudSecuritycenterV2Cvssv3 | — |
| `exploitReleaseDate` | string (google-datetime) | — |
| `exploitationActivity` | string enum | — Values: `EXPLOITATION_ACTIVITY_UNSPECIFIED`, `WIDE`, `CONFIRMED`, `AVAILABLE`, `ANTICIPATED`, `NO_KNOWN`. |
| `firstExploitationDate` | string (google-datetime) | — |
| `id` | string | — |
| `impact` | string enum | — Values: `RISK_RATING_UNSPECIFIED`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `observedInTheWild` | boolean | — |
| `references` | array<GoogleCloudSecuritycenterV2Reference> | — |
| `upstreamFixAvailable` | boolean | — |
| `zeroDay` | boolean | — |

### `GoogleCloudSecuritycenterV2Cvssv3`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attackComplexity` | string enum | — Values: `ATTACK_COMPLEXITY_UNSPECIFIED`, `ATTACK_COMPLEXITY_LOW`, `ATTACK_COMPLEXITY_HIGH`. |
| `attackVector` | string enum | — Values: `ATTACK_VECTOR_UNSPECIFIED`, `ATTACK_VECTOR_NETWORK`, `ATTACK_VECTOR_ADJACENT`, `ATTACK_VECTOR_LOCAL`, `ATTACK_VECTOR_PHYSICAL`. |
| `availabilityImpact` | string enum | — Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`. |
| `baseScore` | number (double) | — |
| `confidentialityImpact` | string enum | — Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`. |
| `integrityImpact` | string enum | — Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`. |
| `privilegesRequired` | string enum | — Values: `PRIVILEGES_REQUIRED_UNSPECIFIED`, `PRIVILEGES_REQUIRED_NONE`, `PRIVILEGES_REQUIRED_LOW`, `PRIVILEGES_REQUIRED_HIGH`. |
| `scope` | string enum | — Values: `SCOPE_UNSPECIFIED`, `SCOPE_UNCHANGED`, `SCOPE_CHANGED`. |
| `userInteraction` | string enum | — Values: `USER_INTERACTION_UNSPECIFIED`, `USER_INTERACTION_NONE`, `USER_INTERACTION_REQUIRED`. |

### `GoogleCloudSecuritycenterV2Cwe`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |
| `references` | array<GoogleCloudSecuritycenterV2Reference> | — |

### `GoogleCloudSecuritycenterV2DataAccessEvent`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventId` | string | — |
| `eventTime` | string (google-datetime) | — |
| `operation` | string enum | — Values: `OPERATION_UNSPECIFIED`, `READ`, `MOVE`, `COPY`. |
| `principalEmail` | string | — |

### `GoogleCloudSecuritycenterV2DataFlowEvent`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventId` | string | — |
| `eventTime` | string (google-datetime) | — |
| `operation` | string enum | — Values: `OPERATION_UNSPECIFIED`, `READ`, `MOVE`, `COPY`. |
| `principalEmail` | string | — |
| `violatedLocation` | string | — |

### `GoogleCloudSecuritycenterV2DataRetentionDeletionEvent`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataObjectCount` | string (int64) | — |
| `eventDetectionTime` | string (google-datetime) | — |
| `eventType` | string enum | — Values: `EVENT_TYPE_UNSPECIFIED`, `EVENT_TYPE_MAX_TTL_EXCEEDED`, `EVENT_TYPE_MAX_TTL_FROM_CREATION`, `EVENT_TYPE_MAX_TTL_FROM_LAST_MODIFICATION`, `EVENT_TYPE_MIN_TTL_FROM_CREATION`. |
| `maxRetentionAllowed` | string (google-duration) | — |
| `minRetentionAllowed` | string (google-duration) | — |

### `GoogleCloudSecuritycenterV2Database`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `grantees` | array<string> | — |
| `name` | string | — |
| `query` | string | — |
| `userName` | string | — |
| `version` | string | — |

### `GoogleCloudSecuritycenterV2Dataset`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `name` | string | — |
| `source` | string | — |

### `GoogleCloudSecuritycenterV2Denied`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipRules` | array<GoogleCloudSecuritycenterV2IpRule> | — |

### `GoogleCloudSecuritycenterV2Detection`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `binary` | string | — |
| `percentPagesMatched` | number (double) | — |

### `GoogleCloudSecuritycenterV2DetectorReference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detectorId` | string | — |
| `displayName` | string | — |
| `explanation` | string | — |
| `recommendation` | string | — |
| `severity` | string enum | — Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |

### `GoogleCloudSecuritycenterV2DiscoveredWorkload`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `confidence` | string enum | — Values: `CONFIDENCE_UNSPECIFIED`, `CONFIDENCE_HIGH`. |
| `detectedRelevantHardware` | boolean | — |
| `detectedRelevantKeywords` | boolean | — |
| `detectedRelevantPackages` | boolean | — |
| `workloadType` | string enum | — Values: `WORKLOAD_TYPE_UNSPECIFIED`, `MCP_SERVER`, `AI_INFERENCE`, `AGENT`. |

### `GoogleCloudSecuritycenterV2Disk`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `GoogleCloudSecuritycenterV2DiskPath`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitionUuid` | string | — |
| `relativePath` | string | — |

### `GoogleCloudSecuritycenterV2DynamicMuteRecord`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `matchTime` | string (google-datetime) | — |
| `muteConfig` | string | — |

### `GoogleCloudSecuritycenterV2EnvironmentVariable`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `val` | string | — |

### `GoogleCloudSecuritycenterV2ExfilResource`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `components` | array<string> | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV2Exfiltration`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sources` | array<GoogleCloudSecuritycenterV2ExfilResource> | — |
| `targets` | array<GoogleCloudSecuritycenterV2ExfilResource> | — |
| `totalExfiltratedBytes` | string (int64) | — |

### `GoogleCloudSecuritycenterV2ExternalExposure`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendBucket` | string | — |
| `backendService` | string | — |
| `exposedApplication` | string | — |
| `exposedEndpoint` | string | — |
| `exposedService` | string | — |
| `forwardingRule` | string | — |
| `hostnameUri` | string | — |
| `httpResponse` | array<GoogleCloudSecuritycenterV2HttpResponse> | — |
| `instanceGroup` | string | — |
| `internalBackendService` | string | — |
| `loadBalancerFirewallPolicy` | string | — |
| `networkEndpointGroup` | string | — |
| `networkIngressFirewallPolicy` | string | — |
| `networkPathInsightsGenerationTime` | string (google-datetime) | — |
| `privateIpAddress` | string | — |
| `privatePort` | string | — |
| `pscNetworkAttachment` | string | — |
| `pscServiceAttachment` | string | — |
| `publicIpAddress` | string | — |
| `publicPort` | string | — |
| `serviceFirewallPolicy` | string | — |

### `GoogleCloudSecuritycenterV2ExternalSystem`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assignees` | array<string> | — |
| `caseCloseTime` | string (google-datetime) | — |
| `caseCreateTime` | string (google-datetime) | — |
| `casePriority` | string | — |
| `caseSla` | string (google-datetime) | — |
| `caseUri` | string | — |
| `externalSystemUpdateTime` | string (google-datetime) | — |
| `externalUid` | string | — |
| `name` | string | — |
| `status` | string | — |
| `ticketInfo` | GoogleCloudSecuritycenterV2TicketInfo | — |

### `GoogleCloudSecuritycenterV2File`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contents` | string | — |
| `diskPath` | GoogleCloudSecuritycenterV2DiskPath | — |
| `fileLoadState` | string enum | — Values: `FILE_LOAD_STATE_UNSPECIFIED`, `LOADED_BY_PROCESS`, `NOT_LOADED_BY_PROCESS`. |
| `hashedSize` | string (int64) | — |
| `operations` | array<GoogleCloudSecuritycenterV2FileOperation> | — |
| `partiallyHashed` | boolean | — |
| `path` | string | — |
| `sha256` | string | — |
| `size` | string (int64) | — |

### `GoogleCloudSecuritycenterV2FileOperation`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | — Values: `OPERATION_TYPE_UNSPECIFIED`, `OPEN`, `READ`, `RENAME`, `WRITE`, `EXECUTE`. |

### `GoogleCloudSecuritycenterV2Finding`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `access` | GoogleCloudSecuritycenterV2Access | — |
| `affectedResources` | GoogleCloudSecuritycenterV2AffectedResources | — |
| `agent` | GoogleCloudSecuritycenterV2Agent | — |
| `agentAnomaly` | GoogleCloudSecuritycenterV2AgentAnomaly | — |
| `agentDataAccessEvents` | array<GoogleCloudSecuritycenterV2AgentDataAccessEvent> | — |
| `agentSessions` | array<GoogleCloudSecuritycenterV2AgentSession> | — |
| `aiModel` | GoogleCloudSecuritycenterV2AiModel | — |
| `application` | GoogleCloudSecuritycenterV2Application | — |
| `artifactGuardPolicies` | GoogleCloudSecuritycenterV2ArtifactGuardPolicies | — |
| `attackExposure` | GoogleCloudSecuritycenterV2AttackExposure | — |
| `backupDisasterRecovery` | GoogleCloudSecuritycenterV2BackupDisasterRecovery | — |
| `canonicalName` | string | — |
| `category` | string | — |
| `chokepoint` | GoogleCloudSecuritycenterV2Chokepoint | — |
| `cloudArmor` | GoogleCloudSecuritycenterV2CloudArmor | — |
| `cloudDlpDataProfile` | GoogleCloudSecuritycenterV2CloudDlpDataProfile | — |
| `cloudDlpInspection` | GoogleCloudSecuritycenterV2CloudDlpInspection | — |
| `cloudRun` | GoogleCloudSecuritycenterV2CloudRun | — |
| `complianceDetails` | GoogleCloudSecuritycenterV2ComplianceDetails | — |
| `compliances` | array<GoogleCloudSecuritycenterV2Compliance> | — |
| `connections` | array<GoogleCloudSecuritycenterV2Connection> | — |
| `contacts` | object | — |
| `containers` | array<GoogleCloudSecuritycenterV2Container> | — |
| `createTime` | string (google-datetime) | — |
| `cryptoKeyName` | string | — |
| `dataAccessEvents` | array<GoogleCloudSecuritycenterV2DataAccessEvent> | — |
| `dataFlowEvents` | array<GoogleCloudSecuritycenterV2DataFlowEvent> | — |
| `dataRetentionDeletionEvents` | array<GoogleCloudSecuritycenterV2DataRetentionDeletionEvent> | — |
| `database` | GoogleCloudSecuritycenterV2Database | — |
| `description` | string | — |
| `discoveredWorkload` | GoogleCloudSecuritycenterV2DiscoveredWorkload | — |
| `disk` | GoogleCloudSecuritycenterV2Disk | — |
| `eventTime` | string (google-datetime) | — |
| `exfiltration` | GoogleCloudSecuritycenterV2Exfiltration | — |
| `externalExposure` | GoogleCloudSecuritycenterV2ExternalExposure | — |
| `externalSystems` | object | — |
| `externalUri` | string | — |
| `files` | array<GoogleCloudSecuritycenterV2File> | — |
| `findingClass` | string enum | — Values: `FINDING_CLASS_UNSPECIFIED`, `THREAT`, `VULNERABILITY`, `MISCONFIGURATION`, `OBSERVATION`, `SCC_ERROR`, `POSTURE_VIOLATION`, `TOXIC_COMBINATION`, `SENSITIVE_DATA_RISK`, `CHOKEPOINT`, `EXTERNAL_EXPOSURE`, `SECRET`. |
| `groupMemberships` | array<GoogleCloudSecuritycenterV2GroupMembership> | — |
| `iamBindings` | array<GoogleCloudSecuritycenterV2IamBinding> | — |
| `iamDetails` | GoogleCloudSecuritycenterV2IamDetails | — |
| `indicator` | GoogleCloudSecuritycenterV2Indicator | — |
| `ipRules` | GoogleCloudSecuritycenterV2IpRules | — |
| `job` | GoogleCloudSecuritycenterV2Job | — |
| `kernelRootkit` | GoogleCloudSecuritycenterV2KernelRootkit | — |
| `kubernetes` | GoogleCloudSecuritycenterV2Kubernetes | — |
| `loadBalancers` | array<GoogleCloudSecuritycenterV2LoadBalancer> | — |
| `logEntries` | array<GoogleCloudSecuritycenterV2LogEntry> | — |
| `mitreAttack` | GoogleCloudSecuritycenterV2MitreAttack | — |
| `moduleName` | string | — |
| `mute` | string enum | — Values: `MUTE_UNSPECIFIED`, `MUTED`, `UNMUTED`, `UNDEFINED`. |
| `muteInfo` | GoogleCloudSecuritycenterV2MuteInfo | — |
| `muteInitiator` | string | — |
| `muteUpdateTime` | string (google-datetime) | — |
| `name` | string | — |
| `networks` | array<GoogleCloudSecuritycenterV2Network> | — |
| `nextSteps` | string | — |
| `notebook` | GoogleCloudSecuritycenterV2Notebook | — |
| `orgPolicies` | array<GoogleCloudSecuritycenterV2OrgPolicy> | — |
| `parent` | string | — |
| `parentDisplayName` | string | — |
| `policyViolationSummary` | GoogleCloudSecuritycenterV2PolicyViolationSummary | — |
| `processes` | array<GoogleCloudSecuritycenterV2Process> | — |
| `resourceName` | string | — |
| `secret` | GoogleCloudSecuritycenterV2Secret | — |
| `securityMarks` | GoogleCloudSecuritycenterV2SecurityMarks | — |
| `securityPosture` | GoogleCloudSecuritycenterV2SecurityPosture | — |
| `severity` | string enum | — Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |
| `sourceProperties` | object | — |
| `state` | string enum | — Values: `STATE_UNSPECIFIED`, `ACTIVE`, `INACTIVE`. |
| `toxicCombination` | GoogleCloudSecuritycenterV2ToxicCombination | — |
| `vertexAi` | GoogleCloudSecuritycenterV2VertexAi | — |
| `vulnerability` | GoogleCloudSecuritycenterV2Vulnerability | — |

### `GoogleCloudSecuritycenterV2Folder`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceFolder` | string | — |
| `resourceFolderDisplayName` | string | — |

### `GoogleCloudSecuritycenterV2Framework`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | array<string> | — Values: `FRAMEWORK_CATEGORY_UNSPECIFIED`, `SECURITY_BENCHMARKS`, `ASSURED_WORKLOADS`, `DATA_SECURITY`, `GOOGLE_BEST_PRACTICES`, `CUSTOM_FRAMEWORK`. |
| `controls` | array<GoogleCloudSecuritycenterV2Control> | — |
| `displayName` | string | — |
| `name` | string | — |
| `type` | string enum | — Values: `FRAMEWORK_TYPE_UNSPECIFIED`, `FRAMEWORK_TYPE_BUILT_IN`, `FRAMEWORK_TYPE_CUSTOM`. |

### `GoogleCloudSecuritycenterV2Geolocation`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `regionCode` | string | — |

### `GoogleCloudSecuritycenterV2GroupMembership`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `groupId` | string | — |
| `groupType` | string enum | — Values: `GROUP_TYPE_UNSPECIFIED`, `GROUP_TYPE_TOXIC_COMBINATION`, `GROUP_TYPE_CHOKEPOINT`. |

### `GoogleCloudSecuritycenterV2HttpResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | — |
| `statusCode` | string | — |

### `GoogleCloudSecuritycenterV2IamBinding`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | — Values: `ACTION_UNSPECIFIED`, `ADD`, `REMOVE`. |
| `member` | string | — |
| `role` | string | — |

### `GoogleCloudSecuritycenterV2IamDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `iamRolePermissions` | array<GoogleCloudSecuritycenterV2IamRolePermission> | — |

### `GoogleCloudSecuritycenterV2IamRolePermission`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `role` | string | — |

### `GoogleCloudSecuritycenterV2Indicator`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domains` | array<string> | — |
| `ipAddresses` | array<string> | — |
| `signatures` | array<GoogleCloudSecuritycenterV2ProcessSignature> | — |
| `uris` | array<string> | — |

### `GoogleCloudSecuritycenterV2InfoType`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `sensitivityScore` | GoogleCloudSecuritycenterV2SensitivityScore | — |
| `version` | string | — |

### `GoogleCloudSecuritycenterV2InvocationReference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `invocationId` | string | — |

### `GoogleCloudSecuritycenterV2IpRule`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `portRanges` | array<GoogleCloudSecuritycenterV2PortRange> | — |
| `protocol` | string | — |

### `GoogleCloudSecuritycenterV2IpRules`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowed` | GoogleCloudSecuritycenterV2Allowed | — |
| `denied` | GoogleCloudSecuritycenterV2Denied | — |
| `destinationIpRanges` | array<string> | — |
| `direction` | string enum | — Values: `DIRECTION_UNSPECIFIED`, `INGRESS`, `EGRESS`. |
| `exposedServices` | array<string> | — |
| `sourceIpRanges` | array<string> | — |

### `GoogleCloudSecuritycenterV2Issue`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | — |
| `description` | string | — |
| `detection` | string | — |
| `domains` | array<GoogleCloudSecuritycenterV2IssueDomain> | — |
| `exposureScore` | number (double) | — |
| `issueType` | string enum | — Values: `ISSUE_TYPE_UNSPECIFIED`, `CHOKEPOINT`, `TOXIC_COMBINATION`, `INSIGHT`. |
| `lastObservationTime` | string (google-datetime) | — |
| `mute` | GoogleCloudSecuritycenterV2IssueMute | — |
| `name` | string | — |
| `primaryResource` | GoogleCloudSecuritycenterV2IssueResource | — |
| `relatedFindings` | array<GoogleCloudSecuritycenterV2IssueFinding> | — |
| `remediations` | array<string> | — |
| `secondaryResources` | array<GoogleCloudSecuritycenterV2IssueResource> | — |
| `securityContexts` | array<GoogleCloudSecuritycenterV2IssueSecurityContext> | — |
| `severity` | string enum | — Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |
| `state` | string enum | — Values: `STATE_UNSPECIFIED`, `ACTIVE`, `INACTIVE`. |
| `updateTime` | string (google-datetime) | — |

### `GoogleCloudSecuritycenterV2IssueDomain`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domainCategory` | string enum | — Values: `DOMAIN_CATEGORY_UNSPECIFIED`, `AI`, `CODE`, `CONTAINER`, `DATA`, `IDENTITY_AND_ACCESS`, `VULNERABILITY`, `THREAT`. |

### `GoogleCloudSecuritycenterV2IssueFinding`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cve` | GoogleCloudSecuritycenterV2IssueFindingCve | — |
| `name` | string | — |
| `securityBulletin` | GoogleCloudSecuritycenterV2IssueFindingSecurityBulletin | — |

### `GoogleCloudSecuritycenterV2IssueFindingCve`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `GoogleCloudSecuritycenterV2IssueFindingSecurityBulletin`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `GoogleCloudSecuritycenterV2IssueMute`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `muteInitiator` | string | — |
| `muteReason` | string | — |
| `muteState` | string enum | — Values: `MUTE_STATE_UNSPECIFIED`, `NOT_MUTED`, `MUTED`. |
| `muteUpdateTime` | string (google-datetime) | — |

### `GoogleCloudSecuritycenterV2IssueResource`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adcApplication` | GoogleCloudSecuritycenterV2IssueResourceAdcApplication | — |
| `adcApplicationTemplate` | GoogleCloudSecuritycenterV2IssueResourceAdcApplicationTemplateRevision | — |
| `adcSharedTemplate` | GoogleCloudSecuritycenterV2IssueResourceAdcSharedTemplateRevision | — |
| `application` | GoogleCloudSecuritycenterV2IssueResourceApplication | — |
| `awsMetadata` | GoogleCloudSecuritycenterV2IssueResourceAwsMetadata | — |
| `azureMetadata` | GoogleCloudSecuritycenterV2IssueResourceAzureMetadata | — |
| `cloudProvider` | string enum | — Values: `CLOUD_PROVIDER_UNSPECIFIED`, `GOOGLE_CLOUD`, `AMAZON_WEB_SERVICES`, `MICROSOFT_AZURE`. |
| `displayName` | string | — |
| `googleCloudMetadata` | GoogleCloudSecuritycenterV2IssueResourceGoogleCloudMetadata | — |
| `name` | string | — |
| `type` | string | — |

### `GoogleCloudSecuritycenterV2IssueResourceAdcApplication`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | GoogleCloudSecuritycenterV2IssueResourceApplicationAttributes | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV2IssueResourceAdcApplicationTemplateRevision`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `GoogleCloudSecuritycenterV2IssueResourceAdcSharedTemplateRevision`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `GoogleCloudSecuritycenterV2IssueResourceApplication`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | GoogleCloudSecuritycenterV2IssueResourceApplicationAttributes | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV2IssueResourceApplicationAttributes`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `businessOwners` | array<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo> | — |
| `criticality` | GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesCriticality | — |
| `developerOwners` | array<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo> | — |
| `environment` | GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesEnvironment | — |
| `operatorOwners` | array<GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo> | — |

### `GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesContactInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | — |

### `GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesCriticality`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | — Values: `CRITICALITY_TYPE_UNSPECIFIED`, `MISSION_CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |

### `GoogleCloudSecuritycenterV2IssueResourceApplicationAttributesEnvironment`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | — Values: `ENVIRONMENT_TYPE_UNSPECIFIED`, `PRODUCTION`, `STAGING`, `TEST`, `DEVELOPMENT`. |

### `GoogleCloudSecuritycenterV2IssueResourceAwsMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `account` | GoogleCloudSecuritycenterV2IssueResourceAwsMetadataAwsAccount | — |

### `GoogleCloudSecuritycenterV2IssueResourceAwsMetadataAwsAccount`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV2IssueResourceAzureMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `subscription` | GoogleCloudSecuritycenterV2IssueResourceAzureMetadataAzureSubscription | — |

### `GoogleCloudSecuritycenterV2IssueResourceAzureMetadataAzureSubscription`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `id` | string | — |

### `GoogleCloudSecuritycenterV2IssueResourceGoogleCloudMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | — |

### `GoogleCloudSecuritycenterV2IssueSecurityContext`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregatedCount` | GoogleCloudSecuritycenterV2IssueSecurityContextAggregatedCount | — |
| `context` | GoogleCloudSecuritycenterV2IssueSecurityContextContext | — |

### `GoogleCloudSecuritycenterV2IssueSecurityContextAggregatedCount`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | — |
| `value` | integer (int32) | — |

### `GoogleCloudSecuritycenterV2IssueSecurityContextContext`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string | — |
| `values` | array<string> | — |

### `GoogleCloudSecuritycenterV2Job`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorCode` | integer (int32) | — |
| `location` | string | — |
| `name` | string | — |
| `state` | string enum | — Values: `JOB_STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`. |

### `GoogleCloudSecuritycenterV2KernelRootkit`

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

### `GoogleCloudSecuritycenterV2Kubernetes`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessReviews` | array<GoogleCloudSecuritycenterV2AccessReview> | — |
| `bindings` | array<GoogleCloudSecuritycenterV2Binding> | — |
| `nodePools` | array<GoogleCloudSecuritycenterV2NodePool> | — |
| `nodes` | array<GoogleCloudSecuritycenterV2Node> | — |
| `objects` | array<GoogleCloudSecuritycenterV2Object> | — |
| `pods` | array<GoogleCloudSecuritycenterV2Pod> | — |
| `roles` | array<GoogleCloudSecuritycenterV2Role> | — |

### `GoogleCloudSecuritycenterV2Label`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `value` | string | — |

### `GoogleCloudSecuritycenterV2LoadBalancer`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `GoogleCloudSecuritycenterV2LogEntry`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudLoggingEntry` | GoogleCloudSecuritycenterV2CloudLoggingEntry | — |

### `GoogleCloudSecuritycenterV2MemoryHashSignature`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `binaryFamily` | string | — |
| `detections` | array<GoogleCloudSecuritycenterV2Detection> | — |

### `GoogleCloudSecuritycenterV2MitreAttack`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalTactics` | array<string> | — Values: `TACTIC_UNSPECIFIED`, `RECONNAISSANCE`, `RESOURCE_DEVELOPMENT`, `INITIAL_ACCESS`, `EXECUTION`, `PERSISTENCE`, `PRIVILEGE_ESCALATION`, `DEFENSE_EVASION`, `CREDENTIAL_ACCESS`, `DISCOVERY`, `LATERAL_MOVEMENT`, `COLLECTION`, `COMMAND_AND_CONTROL`, `EXFILTRATION`, `IMPACT`. |
| `additionalTechniques` | array<string> | — Values: `TECHNIQUE_UNSPECIFIED`, `DATA_OBFUSCATION`, `DATA_OBFUSCATION_STEGANOGRAPHY`, `OS_CREDENTIAL_DUMPING`, `OS_CREDENTIAL_DUMPING_PROC_FILESYSTEM`, `OS_CREDENTIAL_DUMPING_ETC_PASSWORD_AND_ETC_SHADOW`, `DATA_FROM_LOCAL_SYSTEM`, `AUTOMATED_EXFILTRATION`, `OBFUSCATED_FILES_OR_INFO`, `STEGANOGRAPHY`, `COMPILE_AFTER_DELIVERY`, `COMMAND_OBFUSCATION`, `SCHEDULED_TRANSFER`, `SYSTEM_OWNER_USER_DISCOVERY`, `MASQUERADING`, `MATCH_LEGITIMATE_NAME_OR_LOCATION`, `BOOT_OR_LOGON_INITIALIZATION_SCRIPTS`, `STARTUP_ITEMS`, `NETWORK_SERVICE_DISCOVERY`, `SCHEDULED_TASK_JOB`, `SCHEDULED_TASK_JOB_CRON`, `CONTAINER_ORCHESTRATION_JOB`, `PROCESS_INJECTION`, `INPUT_CAPTURE`, `INPUT_CAPTURE_KEYLOGGING`, `PROCESS_DISCOVERY`, `COMMAND_AND_SCRIPTING_INTERPRETER`, `UNIX_SHELL`, `PYTHON`, `EXPLOITATION_FOR_PRIVILEGE_ESCALATION`, `PERMISSION_GROUPS_DISCOVERY`, `CLOUD_GROUPS`, `INDICATOR_REMOVAL`, `INDICATOR_REMOVAL_CLEAR_LINUX_OR_MAC_SYSTEM_LOGS`, `INDICATOR_REMOVAL_CLEAR_COMMAND_HISTORY`, `INDICATOR_REMOVAL_FILE_DELETION`, `INDICATOR_REMOVAL_TIMESTOMP`, `INDICATOR_REMOVAL_CLEAR_MAILBOX_DATA`, `APPLICATION_LAYER_PROTOCOL`, `DNS`, `SOFTWARE_DEPLOYMENT_TOOLS`, `VALID_ACCOUNTS`, `DEFAULT_ACCOUNTS`, `LOCAL_ACCOUNTS`, `CLOUD_ACCOUNTS`, `FILE_AND_DIRECTORY_DISCOVERY`, `ACCOUNT_DISCOVERY_LOCAL_ACCOUNT`, `PROXY`, `EXTERNAL_PROXY`, `MULTI_HOP_PROXY`, `ACCOUNT_MANIPULATION`, `ADDITIONAL_CLOUD_CREDENTIALS`, `ADDITIONAL_CLOUD_ROLES`, `SSH_AUTHORIZED_KEYS`, `ADDITIONAL_CONTAINER_CLUSTER_ROLES`, `MULTI_STAGE_CHANNELS`, `INGRESS_TOOL_TRANSFER`, `NATIVE_API`, `BRUTE_FORCE`, `AUTOMATED_COLLECTION`, `SHARED_MODULES`, `DATA_ENCODING`, `STANDARD_ENCODING`, `ACCESS_TOKEN_MANIPULATION`, `TOKEN_IMPERSONATION_OR_THEFT`, `CREATE_ACCOUNT`, `LOCAL_ACCOUNT`, `DEOBFUSCATE_DECODE_FILES_OR_INFO`, `EXPLOIT_PUBLIC_FACING_APPLICATION`, `SUPPLY_CHAIN_COMPROMISE`, `COMPROMISE_SOFTWARE_DEPENDENCIES_AND_DEVELOPMENT_TOOLS`, `EXPLOITATION_FOR_CLIENT_EXECUTION`, `USER_EXECUTION`, `EXPLOITATION_FOR_CREDENTIAL_ACCESS`, `LINUX_AND_MAC_FILE_AND_DIRECTORY_PERMISSIONS_MODIFICATION`, `DOMAIN_POLICY_MODIFICATION`, `DATA_DESTRUCTION`, `DATA_ENCRYPTED_FOR_IMPACT`, `SERVICE_STOP`, `INHIBIT_SYSTEM_RECOVERY`, `FIRMWARE_CORRUPTION`, `RESOURCE_HIJACKING`, `NETWORK_DENIAL_OF_SERVICE`, `CLOUD_SERVICE_DISCOVERY`, `STEAL_APPLICATION_ACCESS_TOKEN`, `ACCOUNT_ACCESS_REMOVAL`, `TRANSFER_DATA_TO_CLOUD_ACCOUNT`, `STEAL_WEB_SESSION_COOKIE`, `CREATE_OR_MODIFY_SYSTEM_PROCESS`, `EVENT_TRIGGERED_EXECUTION`, `BOOT_OR_LOGON_AUTOSTART_EXECUTION`, `KERNEL_MODULES_AND_EXTENSIONS`, `SHORTCUT_MODIFICATION`, `ABUSE_ELEVATION_CONTROL_MECHANISM`, `ABUSE_ELEVATION_CONTROL_MECHANISM_SETUID_AND_SETGID`, `ABUSE_ELEVATION_CONTROL_MECHANISM_SUDO_AND_SUDO_CACHING`, `UNSECURED_CREDENTIALS`, `CREDENTIALS_IN_FILES`, `BASH_HISTORY`, `PRIVATE_KEYS`, `SUBVERT_TRUST_CONTROL`, `INSTALL_ROOT_CERTIFICATE`, `COMPROMISE_HOST_SOFTWARE_BINARY`, `CREDENTIALS_FROM_PASSWORD_STORES`, `MODIFY_AUTHENTICATION_PROCESS`, `PLUGGABLE_AUTHENTICATION_MODULES`, `MULTI_FACTOR_AUTHENTICATION`, `IMPAIR_DEFENSES`, `DISABLE_OR_MODIFY_TOOLS`, `INDICATOR_BLOCKING`, `DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM`, `HIDE_ARTIFACTS`, `HIDDEN_FILES_AND_DIRECTORIES`, `HIDDEN_USERS`, `EXFILTRATION_OVER_WEB_SERVICE`, `EXFILTRATION_TO_CLOUD_STORAGE`, `DYNAMIC_RESOLUTION`, `LATERAL_TOOL_TRANSFER`, `HIJACK_EXECUTION_FLOW`, `HIJACK_EXECUTION_FLOW_DYNAMIC_LINKER_HIJACKING`, `MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE`, `CREATE_SNAPSHOT`, `CLOUD_INFRASTRUCTURE_DISCOVERY`, `DEVELOP_CAPABILITIES`, `DEVELOP_CAPABILITIES_MALWARE`, `OBTAIN_CAPABILITIES`, `OBTAIN_CAPABILITIES_MALWARE`, `OBTAIN_CAPABILITIES_VULNERABILITIES`, `ACTIVE_SCANNING`, `SCANNING_IP_BLOCKS`, `STAGE_CAPABILITIES`, `UPLOAD_MALWARE`, `CONTAINER_ADMINISTRATION_COMMAND`, `DEPLOY_CONTAINER`, `ESCAPE_TO_HOST`, `CONTAINER_AND_RESOURCE_DISCOVERY`, `REFLECTIVE_CODE_LOADING`, `STEAL_OR_FORGE_AUTHENTICATION_CERTIFICATES`, `FINANCIAL_THEFT`. |
| `primaryTactic` | string enum | — Values: `TACTIC_UNSPECIFIED`, `RECONNAISSANCE`, `RESOURCE_DEVELOPMENT`, `INITIAL_ACCESS`, `EXECUTION`, `PERSISTENCE`, `PRIVILEGE_ESCALATION`, `DEFENSE_EVASION`, `CREDENTIAL_ACCESS`, `DISCOVERY`, `LATERAL_MOVEMENT`, `COLLECTION`, `COMMAND_AND_CONTROL`, `EXFILTRATION`, `IMPACT`. |
| `primaryTechniques` | array<string> | — Values: `TECHNIQUE_UNSPECIFIED`, `DATA_OBFUSCATION`, `DATA_OBFUSCATION_STEGANOGRAPHY`, `OS_CREDENTIAL_DUMPING`, `OS_CREDENTIAL_DUMPING_PROC_FILESYSTEM`, `OS_CREDENTIAL_DUMPING_ETC_PASSWORD_AND_ETC_SHADOW`, `DATA_FROM_LOCAL_SYSTEM`, `AUTOMATED_EXFILTRATION`, `OBFUSCATED_FILES_OR_INFO`, `STEGANOGRAPHY`, `COMPILE_AFTER_DELIVERY`, `COMMAND_OBFUSCATION`, `SCHEDULED_TRANSFER`, `SYSTEM_OWNER_USER_DISCOVERY`, `MASQUERADING`, `MATCH_LEGITIMATE_NAME_OR_LOCATION`, `BOOT_OR_LOGON_INITIALIZATION_SCRIPTS`, `STARTUP_ITEMS`, `NETWORK_SERVICE_DISCOVERY`, `SCHEDULED_TASK_JOB`, `SCHEDULED_TASK_JOB_CRON`, `CONTAINER_ORCHESTRATION_JOB`, `PROCESS_INJECTION`, `INPUT_CAPTURE`, `INPUT_CAPTURE_KEYLOGGING`, `PROCESS_DISCOVERY`, `COMMAND_AND_SCRIPTING_INTERPRETER`, `UNIX_SHELL`, `PYTHON`, `EXPLOITATION_FOR_PRIVILEGE_ESCALATION`, `PERMISSION_GROUPS_DISCOVERY`, `CLOUD_GROUPS`, `INDICATOR_REMOVAL`, `INDICATOR_REMOVAL_CLEAR_LINUX_OR_MAC_SYSTEM_LOGS`, `INDICATOR_REMOVAL_CLEAR_COMMAND_HISTORY`, `INDICATOR_REMOVAL_FILE_DELETION`, `INDICATOR_REMOVAL_TIMESTOMP`, `INDICATOR_REMOVAL_CLEAR_MAILBOX_DATA`, `APPLICATION_LAYER_PROTOCOL`, `DNS`, `SOFTWARE_DEPLOYMENT_TOOLS`, `VALID_ACCOUNTS`, `DEFAULT_ACCOUNTS`, `LOCAL_ACCOUNTS`, `CLOUD_ACCOUNTS`, `FILE_AND_DIRECTORY_DISCOVERY`, `ACCOUNT_DISCOVERY_LOCAL_ACCOUNT`, `PROXY`, `EXTERNAL_PROXY`, `MULTI_HOP_PROXY`, `ACCOUNT_MANIPULATION`, `ADDITIONAL_CLOUD_CREDENTIALS`, `ADDITIONAL_CLOUD_ROLES`, `SSH_AUTHORIZED_KEYS`, `ADDITIONAL_CONTAINER_CLUSTER_ROLES`, `MULTI_STAGE_CHANNELS`, `INGRESS_TOOL_TRANSFER`, `NATIVE_API`, `BRUTE_FORCE`, `AUTOMATED_COLLECTION`, `SHARED_MODULES`, `DATA_ENCODING`, `STANDARD_ENCODING`, `ACCESS_TOKEN_MANIPULATION`, `TOKEN_IMPERSONATION_OR_THEFT`, `CREATE_ACCOUNT`, `LOCAL_ACCOUNT`, `DEOBFUSCATE_DECODE_FILES_OR_INFO`, `EXPLOIT_PUBLIC_FACING_APPLICATION`, `SUPPLY_CHAIN_COMPROMISE`, `COMPROMISE_SOFTWARE_DEPENDENCIES_AND_DEVELOPMENT_TOOLS`, `EXPLOITATION_FOR_CLIENT_EXECUTION`, `USER_EXECUTION`, `EXPLOITATION_FOR_CREDENTIAL_ACCESS`, `LINUX_AND_MAC_FILE_AND_DIRECTORY_PERMISSIONS_MODIFICATION`, `DOMAIN_POLICY_MODIFICATION`, `DATA_DESTRUCTION`, `DATA_ENCRYPTED_FOR_IMPACT`, `SERVICE_STOP`, `INHIBIT_SYSTEM_RECOVERY`, `FIRMWARE_CORRUPTION`, `RESOURCE_HIJACKING`, `NETWORK_DENIAL_OF_SERVICE`, `CLOUD_SERVICE_DISCOVERY`, `STEAL_APPLICATION_ACCESS_TOKEN`, `ACCOUNT_ACCESS_REMOVAL`, `TRANSFER_DATA_TO_CLOUD_ACCOUNT`, `STEAL_WEB_SESSION_COOKIE`, `CREATE_OR_MODIFY_SYSTEM_PROCESS`, `EVENT_TRIGGERED_EXECUTION`, `BOOT_OR_LOGON_AUTOSTART_EXECUTION`, `KERNEL_MODULES_AND_EXTENSIONS`, `SHORTCUT_MODIFICATION`, `ABUSE_ELEVATION_CONTROL_MECHANISM`, `ABUSE_ELEVATION_CONTROL_MECHANISM_SETUID_AND_SETGID`, `ABUSE_ELEVATION_CONTROL_MECHANISM_SUDO_AND_SUDO_CACHING`, `UNSECURED_CREDENTIALS`, `CREDENTIALS_IN_FILES`, `BASH_HISTORY`, `PRIVATE_KEYS`, `SUBVERT_TRUST_CONTROL`, `INSTALL_ROOT_CERTIFICATE`, `COMPROMISE_HOST_SOFTWARE_BINARY`, `CREDENTIALS_FROM_PASSWORD_STORES`, `MODIFY_AUTHENTICATION_PROCESS`, `PLUGGABLE_AUTHENTICATION_MODULES`, `MULTI_FACTOR_AUTHENTICATION`, `IMPAIR_DEFENSES`, `DISABLE_OR_MODIFY_TOOLS`, `INDICATOR_BLOCKING`, `DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM`, `HIDE_ARTIFACTS`, `HIDDEN_FILES_AND_DIRECTORIES`, `HIDDEN_USERS`, `EXFILTRATION_OVER_WEB_SERVICE`, `EXFILTRATION_TO_CLOUD_STORAGE`, `DYNAMIC_RESOLUTION`, `LATERAL_TOOL_TRANSFER`, `HIJACK_EXECUTION_FLOW`, `HIJACK_EXECUTION_FLOW_DYNAMIC_LINKER_HIJACKING`, `MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE`, `CREATE_SNAPSHOT`, `CLOUD_INFRASTRUCTURE_DISCOVERY`, `DEVELOP_CAPABILITIES`, `DEVELOP_CAPABILITIES_MALWARE`, `OBTAIN_CAPABILITIES`, `OBTAIN_CAPABILITIES_MALWARE`, `OBTAIN_CAPABILITIES_VULNERABILITIES`, `ACTIVE_SCANNING`, `SCANNING_IP_BLOCKS`, `STAGE_CAPABILITIES`, `UPLOAD_MALWARE`, `CONTAINER_ADMINISTRATION_COMMAND`, `DEPLOY_CONTAINER`, `ESCAPE_TO_HOST`, `CONTAINER_AND_RESOURCE_DISCOVERY`, `REFLECTIVE_CODE_LOADING`, `STEAL_OR_FORGE_AUTHENTICATION_CERTIFICATES`, `FINANCIAL_THEFT`. |
| `version` | string | — |

### `GoogleCloudSecuritycenterV2MuteConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | — |
| `cryptoKeyName` | string | — |
| `description` | string | — |
| `expiryTime` | string (google-datetime) | — |
| `filter` | string | — |
| `mostRecentEditor` | string | — |
| `name` | string | — |
| `type` | string enum | — Values: `MUTE_CONFIG_TYPE_UNSPECIFIED`, `STATIC`, `DYNAMIC`. |
| `updateTime` | string (google-datetime) | — |

### `GoogleCloudSecuritycenterV2MuteInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dynamicMuteRecords` | array<GoogleCloudSecuritycenterV2DynamicMuteRecord> | — |
| `staticMute` | GoogleCloudSecuritycenterV2StaticMute | — |

### `GoogleCloudSecuritycenterV2Network`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `GoogleCloudSecuritycenterV2Node`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `GoogleCloudSecuritycenterV2NodePool`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `nodes` | array<GoogleCloudSecuritycenterV2Node> | — |

### `GoogleCloudSecuritycenterV2Notebook`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastAuthor` | string | — |
| `name` | string | — |
| `notebookUpdateTime` | string (google-datetime) | — |
| `service` | string | — |

### `GoogleCloudSecuritycenterV2NotificationMessage`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deletedFinding` | boolean | — |
| `finding` | GoogleCloudSecuritycenterV2Finding | — |
| `notificationConfigName` | string | — |
| `resource` | GoogleCloudSecuritycenterV2Resource | — |

### `GoogleCloudSecuritycenterV2Object`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containers` | array<GoogleCloudSecuritycenterV2Container> | — |
| `group` | string | — |
| `kind` | string | — |
| `name` | string | — |
| `ns` | string | — |

### `GoogleCloudSecuritycenterV2OrgPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `GoogleCloudSecuritycenterV2Package`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpeUri` | string | — |
| `packageName` | string | — |
| `packageType` | string | — |
| `packageVersion` | string | — |

### `GoogleCloudSecuritycenterV2Pipeline`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV2Pod`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containers` | array<GoogleCloudSecuritycenterV2Container> | — |
| `labels` | array<GoogleCloudSecuritycenterV2Label> | — |
| `name` | string | — |
| `ns` | string | — |

### `GoogleCloudSecuritycenterV2PolicyDriftDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detectedValue` | string | — |
| `expectedValue` | string | — |
| `field` | string | — |

### `GoogleCloudSecuritycenterV2PolicyViolationSummary`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conformantResourcesCount` | string (int64) | — |
| `evaluationErrorsCount` | string (int64) | — |
| `outOfScopeResourcesCount` | string (int64) | — |
| `policyViolationsCount` | string (int64) | — |

### `GoogleCloudSecuritycenterV2PortRange`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `max` | string (int64) | — |
| `min` | string (int64) | — |

### `GoogleCloudSecuritycenterV2Process`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | — |
| `argumentsTruncated` | boolean | — |
| `binary` | GoogleCloudSecuritycenterV2File | — |
| `envVariables` | array<GoogleCloudSecuritycenterV2EnvironmentVariable> | — |
| `envVariablesTruncated` | boolean | — |
| `libraries` | array<GoogleCloudSecuritycenterV2File> | — |
| `name` | string | — |
| `parentPid` | string (int64) | — |
| `pid` | string (int64) | — |
| `script` | GoogleCloudSecuritycenterV2File | — |
| `userId` | string (int64) | — |

### `GoogleCloudSecuritycenterV2ProcessSignature`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `memoryHashSignature` | GoogleCloudSecuritycenterV2MemoryHashSignature | — |
| `signatureType` | string enum | — Values: `SIGNATURE_TYPE_UNSPECIFIED`, `SIGNATURE_TYPE_PROCESS`, `SIGNATURE_TYPE_FILE`. |
| `yaraRuleSignature` | GoogleCloudSecuritycenterV2YaraRuleSignature | — |

### `GoogleCloudSecuritycenterV2Reference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `source` | string | — |
| `uri` | string | — |

### `GoogleCloudSecuritycenterV2Requests`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `longTermAllowed` | integer (int32) | — |
| `longTermDenied` | integer (int32) | — |
| `ratio` | number (double) | — |
| `shortTermAllowed` | integer (int32) | — |

### `GoogleCloudSecuritycenterV2Resource`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adcApplication` | GoogleCloudSecuritycenterV2AdcApplication | — |
| `adcApplicationTemplate` | GoogleCloudSecuritycenterV2AdcApplicationTemplateRevision | — |
| `adcSharedTemplate` | GoogleCloudSecuritycenterV2AdcSharedTemplateRevision | — |
| `application` | GoogleCloudSecuritycenterV2ResourceApplication | — |
| `awsMetadata` | GoogleCloudSecuritycenterV2AwsMetadata | — |
| `azureMetadata` | GoogleCloudSecuritycenterV2AzureMetadata | — |
| `cloudProvider` | string enum | — Values: `CLOUD_PROVIDER_UNSPECIFIED`, `GOOGLE_CLOUD_PLATFORM`, `AMAZON_WEB_SERVICES`, `MICROSOFT_AZURE`. |
| `displayName` | string | — |
| `gcpMetadata` | GcpMetadata | — |
| `location` | string | — |
| `name` | string | — |
| `resourcePath` | GoogleCloudSecuritycenterV2ResourcePath | — |
| `resourcePathString` | string | — |
| `service` | string | — |
| `type` | string | — |

### `GoogleCloudSecuritycenterV2ResourceApplication`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | GoogleCloudSecuritycenterV2ResourceApplicationAttributes | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV2ResourceApplicationAttributes`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `businessOwners` | array<GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo> | — |
| `criticality` | GoogleCloudSecuritycenterV2ResourceApplicationAttributesCriticality | — |
| `developerOwners` | array<GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo> | — |
| `environment` | GoogleCloudSecuritycenterV2ResourceApplicationAttributesEnvironment | — |
| `operatorOwners` | array<GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo> | — |

### `GoogleCloudSecuritycenterV2ResourceApplicationAttributesContactInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | — |

### `GoogleCloudSecuritycenterV2ResourceApplicationAttributesCriticality`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | — Values: `CRITICALITY_TYPE_UNSPECIFIED`, `MISSION_CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |

### `GoogleCloudSecuritycenterV2ResourceApplicationAttributesEnvironment`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | — Values: `ENVIRONMENT_TYPE_UNSPECIFIED`, `PRODUCTION`, `STAGING`, `TEST`, `DEVELOPMENT`. |

### Shape of `GoogleCloudSecuritycenterV2AccessReview`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "group": "string",
  "name": "string",
  "ns": "string",
  "resource": "string",
  "subresource": "string",
  "verb": "string",
  "version": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `securitycenter` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://securitycenter.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
