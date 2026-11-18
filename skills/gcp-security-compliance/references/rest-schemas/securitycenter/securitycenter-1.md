---
source: https://securitycenter.googleapis.com/$discovery/rest?version=v1
---

# Security Command Center API message schemas (securitycenter) (part 1/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/securitycenter/`.

### `Access`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `callerIp` | string | — |
| `callerIpGeo` | Geolocation | — |
| `methodName` | string | — |
| `principalEmail` | string | — |
| `principalSubject` | string | — |
| `serviceAccountDelegationInfo` | array<ServiceAccountDelegationInfo> | — |
| `serviceAccountKeyName` | string | — |
| `serviceName` | string | — |
| `userAgent` | string | — |
| `userAgentFamily` | string | — |
| `userName` | string | — |

### `AccessReview`

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

### `AdaptiveProtection`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `confidence` | number (double) | — |

### `AdcApplication`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | GoogleCloudSecuritycenterV1ResourceApplicationAttributes | — |
| `name` | string | — |

### `AdcApplicationTemplateRevision`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `AdcSharedTemplateRevision`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `AffectedResources`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | — |

### `Agent`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `id` | string | — |

### `AgentAnomaly`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `confidenceScore` | number (double) | — |
| `detectorReferences` | array<DetectorReference> | — |
| `invocationReferences` | array<InvocationReference> | — |

### `AgentDataAccessEvent`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventId` | string | — |
| `eventTime` | string (google-datetime) | — |
| `operation` | string enum | — Values: `OPERATION_UNSPECIFIED`, `READ`, `MOVE`, `COPY`. |
| `principalSubject` | string | — |

### `AgentSession`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sessionId` | string | — |

### `AiModel`

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

### `Allowed`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipRules` | array<IpRule> | — |

### `Application`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseUri` | string | — |
| `fullUri` | string | — |

### `ArtifactGuardPolicies`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failingPolicies` | array<ArtifactGuardPolicy> | — |
| `resourceId` | string | — |

### `ArtifactGuardPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failureReason` | string | — |
| `policyId` | string | — |
| `type` | string enum | — Values: `ARTIFACT_GUARD_POLICY_TYPE_UNSPECIFIED`, `VULNERABILITY`. |

### `Asset`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canonicalName` | string | — |
| `createTime` | string (google-datetime) | — |
| `iamPolicy` | IamPolicy | — |
| `name` | string | — |
| `resourceProperties` | object | — |
| `securityCenterProperties` | SecurityCenterProperties | — |
| `securityMarks` | SecurityMarks | — |
| `updateTime` | string (google-datetime) | — |

### `Asset` (v1beta1)

-
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | — |
| `name` | string | — |
| `resourceProperties` | object | — |
| `securityCenterProperties` | SecurityCenterProperties | — |
| `securityMarks` | GoogleCloudSecuritycenterV1beta1SecurityMarks | — |
| `updateTime` | string (google-datetime) | — |

### `AssetDiscoveryConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `folderIds` | array<string> | — |
| `inclusionMode` | string enum | — Values: `INCLUSION_MODE_UNSPECIFIED`, `INCLUDE_ONLY`, `EXCLUDE`. |
| `projectIds` | array<string> | — |

### `AssetDiscoveryConfig` (v1beta1)

-
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `inclusionMode` | string enum | — Values: `INCLUSION_MODE_UNSPECIFIED`, `INCLUDE_ONLY`, `EXCLUDE`. |
| `projectIds` | array<string> | — |

### `Attack`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `classification` | string | — |
| `volumeBps` | integer (int32) | — |
| `volumeBpsLong` | string (int64) | — |
| `volumePps` | integer (int32) | — |
| `volumePpsLong` | string (int64) | — |

### `AttackExposure`

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

### `AttackPath`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `edges` | array<AttackPathEdge> | — |
| `name` | string | — |
| `pathNodes` | array<AttackPathNode> | — |

### `AttackPathEdge`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destination` | string | — |
| `source` | string | — |

### `AttackPathNode`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `associatedFindings` | array<PathNodeAssociatedFinding> | — |
| `attackSteps` | array<AttackStepNode> | — |
| `displayName` | string | — |
| `resource` | string | — |
| `resourceType` | string | — |
| `uuid` | string | — |

### `AttackStepNode`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | — |
| `displayName` | string | — |
| `labels` | object | — |
| `type` | string enum | — Values: `NODE_TYPE_UNSPECIFIED`, `NODE_TYPE_AND`, `NODE_TYPE_OR`, `NODE_TYPE_DEFENSE`, `NODE_TYPE_ATTACKER`. |
| `uuid` | string | — |

### `AuditConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | — |
| `service` | string | — |

### `AuditLogConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | — |
| `logType` | string enum | — Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `AwsAccount`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |
| `name` | string | — |

### `AwsMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `account` | AwsAccount | — |
| `organization` | AwsOrganization | — |
| `organizationalUnits` | array<AwsOrganizationalUnit> | — |

### `AwsOrganization`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |

### `AwsOrganizationalUnit`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |
| `name` | string | — |

### `AzureManagementGroup`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `id` | string | — |

### `AzureMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `managementGroups` | array<AzureManagementGroup> | — |
| `resourceGroup` | AzureResourceGroup | — |
| `subscription` | AzureSubscription | — |
| `tenant` | AzureTenant | — |

### `AzureResourceGroup`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |
| `name` | string | — |

### `AzureSubscription`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `id` | string | — |

### `AzureTenant`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `id` | string | — |

### `BackupDisasterRecovery`

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

### `BatchCreateResourceValueConfigsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requests` | array<CreateResourceValueConfigRequest> | — |

### `BatchCreateResourceValueConfigsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceValueConfigs` | array<GoogleCloudSecuritycenterV1ResourceValueConfig> | — |

### `BigQueryDestination`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataset` | string | — |

### `Binding`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | — |
| `members` | array<string> | — |
| `role` | string | — |

### `BulkMuteFindingsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filter` | string | — |
| `muteAnnotation` | string | — |
| `muteState` | string enum | — Values: `MUTE_STATE_UNSPECIFIED`, `MUTED`, `UNDEFINED`. |

### `CancelOperationRequest`

-
- Version: v1beta1

### `Chokepoint`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `relatedFindings` | array<string> | — |

### `CloudArmor`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adaptiveProtection` | AdaptiveProtection | — |
| `attack` | Attack | — |
| `duration` | string (google-duration) | — |
| `requests` | Requests | — |
| `securityPolicy` | SecurityPolicy | — |
| `threatVector` | string | — |

### `CloudControl`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudControlName` | string | — |
| `policyType` | string | — |
| `type` | string enum | — Values: `CLOUD_CONTROL_TYPE_UNSPECIFIED`, `BUILT_IN`, `CUSTOM`. |
| `version` | integer (int32) | — |

### `CloudDlpDataProfile`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataProfile` | string | — |
| `infoTypes` | array<InfoType> | — |
| `parentType` | string enum | — Values: `PARENT_TYPE_UNSPECIFIED`, `ORGANIZATION`, `PROJECT`. |

### `CloudDlpInspection`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullScan` | boolean | — |
| `infoType` | string | — |
| `infoTypeCount` | string (int64) | — |
| `inspectJob` | string | — |

### `CloudLoggingEntry`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `insertId` | string | — |
| `logId` | string | — |
| `resourceContainer` | string | — |
| `timestamp` | string (google-datetime) | — |

### `CloudRun`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `revisions` | array<string> | — |

### `Compliance`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ids` | array<string> | — |
| `standard` | string | — |
| `version` | string | — |

### `ComplianceDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudControl` | CloudControl | — |
| `cloudControlDeploymentNames` | array<string> | — |
| `frameworks` | array<Framework> | — |

### `Config`

-
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `moduleEnablementState` | string enum | — Values: `ENABLEMENT_STATE_UNSPECIFIED`, `INHERITED`, `ENABLED`, `DISABLED`. |
| `value` | object | — |

### `Connection`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationIp` | string | — |
| `destinationPort` | integer (int32) | — |
| `protocol` | string enum | — Values: `PROTOCOL_UNSPECIFIED`, `ICMP`, `TCP`, `UDP`, `GRE`, `ESP`. |
| `sourceIp` | string | — |
| `sourcePort` | integer (int32) | — |

### `Contact`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | — |

### `ContactDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contacts` | array<Contact> | — |

### `Container`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | — |
| `imageId` | string | — |
| `labels` | array<Label> | — |
| `name` | string | — |
| `uri` | string | — |

### `ContainerThreatDetectionSettings`

-
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `modules` | object | — |
| `name` | string | — |
| `serviceAccount` | string | — |
| `serviceEnablementState` | string enum | — Values: `ENABLEMENT_STATE_UNSPECIFIED`, `INHERITED`, `ENABLED`, `DISABLED`. |
| `updateTime` | string (google-datetime) | — |

### `Control`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlName` | string | — |
| `displayName` | string | — |

### `CreateResourceValueConfigRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parent` | string | — |
| `resourceValueConfig` | GoogleCloudSecuritycenterV1ResourceValueConfig | — |

### `CustomModuleValidationError`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | — |
| `end` | Position | — |
| `fieldPath` | string | — |
| `start` | Position | — |

### `CustomModuleValidationErrors`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errors` | array<CustomModuleValidationError> | — |

### `Cve`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cvssv3` | Cvssv3 | — |
| `exploitReleaseDate` | string (google-datetime) | — |
| `exploitationActivity` | string enum | — Values: `EXPLOITATION_ACTIVITY_UNSPECIFIED`, `WIDE`, `CONFIRMED`, `AVAILABLE`, `ANTICIPATED`, `NO_KNOWN`. |
| `firstExploitationDate` | string (google-datetime) | — |
| `id` | string | — |
| `impact` | string enum | — Values: `RISK_RATING_UNSPECIFIED`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `observedInTheWild` | boolean | — |
| `references` | array<Reference> | — |
| `upstreamFixAvailable` | boolean | — |
| `zeroDay` | boolean | — |

### `Cvssv3`

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

### `Cwe`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |
| `references` | array<Reference> | — |

### `DataAccessEvent`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventId` | string | — |
| `eventTime` | string (google-datetime) | — |
| `operation` | string enum | — Values: `OPERATION_UNSPECIFIED`, `READ`, `MOVE`, `COPY`. |
| `principalEmail` | string | — |

### `DataFlowEvent`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventId` | string | — |
| `eventTime` | string (google-datetime) | — |
| `operation` | string enum | — Values: `OPERATION_UNSPECIFIED`, `READ`, `MOVE`, `COPY`. |
| `principalEmail` | string | — |
| `violatedLocation` | string | — |

### `DataRetentionDeletionEvent`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataObjectCount` | string (int64) | — |
| `eventDetectionTime` | string (google-datetime) | — |
| `eventType` | string enum | — Values: `EVENT_TYPE_UNSPECIFIED`, `EVENT_TYPE_MAX_TTL_EXCEEDED`, `EVENT_TYPE_MAX_TTL_FROM_CREATION`, `EVENT_TYPE_MAX_TTL_FROM_LAST_MODIFICATION`, `EVENT_TYPE_MIN_TTL_FROM_CREATION`. |
| `maxRetentionAllowed` | string (google-duration) | — |
| `minRetentionAllowed` | string (google-duration) | — |

### `Database`

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

### `Dataset`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | — |
| `name` | string | — |
| `source` | string | — |

### `Denied`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipRules` | array<IpRule> | — |

### `Details`

-
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | — |
| `startTime` | string (google-datetime) | — |
| `type` | string enum | — Values: `TYPE_UNSPECIFIED`, `STANDARD`, `TRIAL`, `ALPHA`, `DEMO`, `PAY_AS_YOU_GO`, `SUBSCRIPTION`, `SUB_FIXED`, `SUB_BASE_OVERAGE`. |

### `Detection`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `binary` | string | — |
| `percentPagesMatched` | number (double) | — |

### `DetectorReference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detectorId` | string | — |
| `displayName` | string | — |
| `explanation` | string | — |
| `recommendation` | string | — |
| `severity` | string enum | — Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |

### `DiscoveredWorkload`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `confidence` | string enum | — Values: `CONFIDENCE_UNSPECIFIED`, `CONFIDENCE_HIGH`. |
| `detectedRelevantHardware` | boolean | — |
| `detectedRelevantKeywords` | boolean | — |
| `detectedRelevantPackages` | boolean | — |
| `workloadType` | string enum | — Values: `WORKLOAD_TYPE_UNSPECIFIED`, `MCP_SERVER`, `AI_INFERENCE`, `AGENT`. |

### `Disk`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |

### `DiskPath`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitionUuid` | string | — |
| `relativePath` | string | — |

### `DynamicMuteRecord`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `matchTime` | string (google-datetime) | — |
| `muteConfig` | string | — |

### `EffectiveEventThreatDetectionCustomModule`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudProvider` | string enum | — Values: `CLOUD_PROVIDER_UNSPECIFIED`, `GOOGLE_CLOUD_PLATFORM`, `AMAZON_WEB_SERVICES`, `MICROSOFT_AZURE`. |
| `config` | object | — |
| `description` | string | — |
| `displayName` | string | — |
| `enablementState` | string enum | — Values: `ENABLEMENT_STATE_UNSPECIFIED`, `ENABLED`, `DISABLED`. |
| `name` | string | — |
| `type` | string | — |

### `Empty`

-
- Version: v1

### `EnvironmentVariable`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `val` | string | — |

### `EventThreatDetectionCustomModule`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ancestorModule` | string | — |
| `cloudProvider` | string enum | — Values: `CLOUD_PROVIDER_UNSPECIFIED`, `GOOGLE_CLOUD_PLATFORM`, `AMAZON_WEB_SERVICES`, `MICROSOFT_AZURE`. |
| `config` | object | — |
| `description` | string | — |
| `displayName` | string | — |
| `enablementState` | string enum | — Values: `ENABLEMENT_STATE_UNSPECIFIED`, `ENABLED`, `DISABLED`, `INHERITED`. |
| `lastEditor` | string | — |
| `name` | string | — |
| `type` | string | — |
| `updateTime` | string (google-datetime) | — |

### `EventThreatDetectionSettings`

-
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `modules` | object | — |
| `name` | string | — |
| `serviceEnablementState` | string enum | — Values: `ENABLEMENT_STATE_UNSPECIFIED`, `INHERITED`, `ENABLED`, `DISABLED`. |
| `updateTime` | string (google-datetime) | — |

### `ExfilResource`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `components` | array<string> | — |
| `name` | string | — |

### `Exfiltration`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sources` | array<ExfilResource> | — |
| `targets` | array<ExfilResource> | — |
| `totalExfiltratedBytes` | string (int64) | — |

### `ExportFindingsMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigQueryDestination` | BigQueryDestination | — |
| `exportStartTime` | string (google-datetime) | — |

### `ExportFindingsResponse`

-
- Version: v1

### `Expr`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | — |
| `expression` | string | — |
| `location` | string | — |
| `title` | string | — |

### `ExternalExposure`

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
| `httpResponse` | array<HttpResponse> | — |
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

### `File`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contents` | string | — |
| `diskPath` | DiskPath | — |
| `fileLoadState` | string enum | — Values: `FILE_LOAD_STATE_UNSPECIFIED`, `LOADED_BY_PROCESS`, `NOT_LOADED_BY_PROCESS`. |
| `hashedSize` | string (int64) | — |
| `operations` | array<FileOperation> | — |
| `partiallyHashed` | boolean | — |
| `path` | string | — |
| `sha256` | string | — |
| `size` | string (int64) | — |

### `FileOperation`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | — Values: `OPERATION_TYPE_UNSPECIFIED`, `OPEN`, `READ`, `RENAME`, `WRITE`, `EXECUTE`. |

### `Finding`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `access` | Access | — |
| `affectedResources` | AffectedResources | — |
| `agent` | Agent | — |
| `agentAnomaly` | AgentAnomaly | — |
| `agentDataAccessEvents` | array<AgentDataAccessEvent> | — |
| `agentSessions` | array<AgentSession> | — |
| `aiModel` | AiModel | — |
| `application` | Application | — |
| `artifactGuardPolicies` | ArtifactGuardPolicies | — |
| `attackExposure` | AttackExposure | — |
| `backupDisasterRecovery` | BackupDisasterRecovery | — |
| `canonicalName` | string | — |
| `category` | string | — |
| `chokepoint` | Chokepoint | — |
| `cloudArmor` | CloudArmor | — |
| `cloudDlpDataProfile` | CloudDlpDataProfile | — |
| `cloudDlpInspection` | CloudDlpInspection | — |
| `cloudRun` | CloudRun | — |
| `complianceDetails` | ComplianceDetails | — |
| `compliances` | array<Compliance> | — |
| `connections` | array<Connection> | — |
| `contacts` | object | — |
| `containers` | array<Container> | — |
| `createTime` | string (google-datetime) | — |
| `dataAccessEvents` | array<DataAccessEvent> | — |
| `dataFlowEvents` | array<DataFlowEvent> | — |
| `dataRetentionDeletionEvents` | array<DataRetentionDeletionEvent> | — |
| `database` | Database | — |
| `description` | string | — |
| `discoveredWorkload` | DiscoveredWorkload | — |
| `disk` | Disk | — |
| `eventTime` | string (google-datetime) | — |
| `exfiltration` | Exfiltration | — |
| `externalExposure` | ExternalExposure | — |
| `externalSystems` | object | — |
| `externalUri` | string | — |
| `files` | array<File> | — |
| `findingClass` | string enum | — Values: `FINDING_CLASS_UNSPECIFIED`, `THREAT`, `VULNERABILITY`, `MISCONFIGURATION`, `OBSERVATION`, `SCC_ERROR`, `POSTURE_VIOLATION`, `TOXIC_COMBINATION`, `SENSITIVE_DATA_RISK`, `CHOKEPOINT`, `EXTERNAL_EXPOSURE`, `SECRET`. |
| `groupMemberships` | array<GroupMembership> | — |
| `iamBindings` | array<IamBinding> | — |
| `iamDetails` | GoogleCloudSecuritycenterV1IamDetails | — |
| `indicator` | Indicator | — |
| `ipRules` | IpRules | — |
| `job` | Job | — |
| `kernelRootkit` | KernelRootkit | — |
| `kubernetes` | Kubernetes | — |
| `loadBalancers` | array<LoadBalancer> | — |
| `logEntries` | array<LogEntry> | — |
| `mitreAttack` | MitreAttack | — |
| `moduleName` | string | — |
| `mute` | string enum | — Values: `MUTE_UNSPECIFIED`, `MUTED`, `UNMUTED`, `UNDEFINED`. |
| `muteInfo` | MuteInfo | — |
| `muteInitiator` | string | — |
| `muteUpdateTime` | string (google-datetime) | — |
| `name` | string | — |
| `networks` | array<Network> | — |
| `nextSteps` | string | — |
| `notebook` | Notebook | — |
| `orgPolicies` | array<OrgPolicy> | — |
| `parent` | string | — |
| `parentDisplayName` | string | — |
| `policyViolationSummary` | PolicyViolationSummary | — |
| `processes` | array<Process> | — |
| `resourceName` | string | — |
| `secret` | Secret | — |
| `securityMarks` | SecurityMarks | — |
| `securityPosture` | SecurityPosture | — |
| `severity` | string enum | — Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |
| `sourceProperties` | object | — |
| `state` | string enum | — Values: `STATE_UNSPECIFIED`, `ACTIVE`, `INACTIVE`. |
| `toxicCombination` | ToxicCombination | — |
| `vertexAi` | VertexAi | — |
| `vulnerability` | Vulnerability | — |

### `Folder`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceFolder` | string | — |
| `resourceFolderDisplayName` | string | — |

### `Framework`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | array<string> | — Values: `FRAMEWORK_CATEGORY_UNSPECIFIED`, `SECURITY_BENCHMARKS`, `ASSURED_WORKLOADS`, `DATA_SECURITY`, `GOOGLE_BEST_PRACTICES`, `CUSTOM_FRAMEWORK`. |
| `controls` | array<Control> | — |
| `displayName` | string | — |
| `name` | string | — |
| `type` | string enum | — Values: `FRAMEWORK_TYPE_UNSPECIFIED`, `FRAMEWORK_TYPE_BUILT_IN`, `FRAMEWORK_TYPE_CUSTOM`. |

### `GcpMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `folders` | array<GoogleCloudSecuritycenterV2Folder> | — |
| `organization` | string | — |
| `parent` | string | — |
| `parentDisplayName` | string | — |
| `project` | string | — |
| `projectDisplayName` | string | — |

### `Geolocation`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `regionCode` | string | — |

### `GetIamPolicyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `options` | GetPolicyOptions | — |

### `GetPolicyOptions`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestedPolicyVersion` | integer (int32) | — |

### `GoogleCloudSecuritycenterV1BigQueryExport`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | — |
| `dataset` | string | — |
| `deletionNotificationsEnabled` | boolean | — |
| `description` | string | — |
| `filter` | string | — |
| `mostRecentEditor` | string | — |
| `name` | string | — |
| `principal` | string | — |
| `updateTime` | string (google-datetime) | — |

### `GoogleCloudSecuritycenterV1Binding`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `ns` | string | — |
| `role` | Role | — |
| `subjects` | array<Subject> | — |

### `GoogleCloudSecuritycenterV1BulkMuteFindingsResponse`

-
- Version: v1

### `GoogleCloudSecuritycenterV1CustomConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customOutput` | GoogleCloudSecuritycenterV1CustomOutputSpec | — |
| `description` | string | — |
| `predicate` | Expr | — |
| `recommendation` | string | — |
| `resourceSelector` | GoogleCloudSecuritycenterV1ResourceSelector | — |
| `severity` | string enum | — Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |

### `GoogleCloudSecuritycenterV1CustomOutputSpec`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `properties` | array<GoogleCloudSecuritycenterV1Property> | — |

### `GoogleCloudSecuritycenterV1EffectiveSecurityHealthAnalyticsCustomModule`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudProvider` | string enum | — Values: `CLOUD_PROVIDER_UNSPECIFIED`, `GOOGLE_CLOUD_PLATFORM`, `AMAZON_WEB_SERVICES`, `MICROSOFT_AZURE`. |
| `customConfig` | GoogleCloudSecuritycenterV1CustomConfig | — |
| `displayName` | string | — |
| `enablementState` | string enum | — Values: `ENABLEMENT_STATE_UNSPECIFIED`, `ENABLED`, `DISABLED`. |
| `name` | string | — |

### `GoogleCloudSecuritycenterV1ExternalSystem`

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
| `ticketInfo` | TicketInfo | — |

### `GoogleCloudSecuritycenterV1IamDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `iamRolePermissions` | array<GoogleCloudSecuritycenterV1IamRolePermission> | — |

### `GoogleCloudSecuritycenterV1IamRolePermission`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `role` | string | — |

### `GoogleCloudSecuritycenterV1MuteConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | — |
| `description` | string | — |
| `displayName` | string | — |
| `expiryTime` | string (google-datetime) | — |
| `filter` | string | — |
| `mostRecentEditor` | string | — |
| `name` | string | — |
| `type` | string enum | — Values: `MUTE_CONFIG_TYPE_UNSPECIFIED`, `STATIC`, `DYNAMIC`. |
| `updateTime` | string (google-datetime) | — |

### `GoogleCloudSecuritycenterV1NotificationMessage`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deletedFinding` | boolean | — |
| `finding` | Finding | — |
| `notificationConfigName` | string | — |
| `resource` | GoogleCloudSecuritycenterV1Resource | — |

### `GoogleCloudSecuritycenterV1Property`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `valueExpression` | Expr | — |

### `GoogleCloudSecuritycenterV1Resource`

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
| `parent` | string | — |
| `parentDisplayName` | string | — |
| `project` | string | — |
| `projectDisplayName` | string | — |
| `resourcePath` | ResourcePath | — |
| `resourcePathString` | string | — |
| `service` | string | — |
| `type` | string | — |

### `GoogleCloudSecuritycenterV1ResourceApplication`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | GoogleCloudSecuritycenterV1ResourceApplicationAttributes | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV1ResourceApplicationAttributes`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `businessOwners` | array<GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo> | — |
| `criticality` | GoogleCloudSecuritycenterV1ResourceApplicationAttributesCriticality | — |
| `developerOwners` | array<GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo> | — |
| `environment` | GoogleCloudSecuritycenterV1ResourceApplicationAttributesEnvironment | — |
| `operatorOwners` | array<GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo> | — |

### `GoogleCloudSecuritycenterV1ResourceApplicationAttributesContactInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | — |

### `GoogleCloudSecuritycenterV1ResourceApplicationAttributesCriticality`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | — Values: `CRITICALITY_TYPE_UNSPECIFIED`, `MISSION_CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |

### `GoogleCloudSecuritycenterV1ResourceApplicationAttributesEnvironment`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | — Values: `ENVIRONMENT_TYPE_UNSPECIFIED`, `PRODUCTION`, `STAGING`, `TEST`, `DEVELOPMENT`. |

### `GoogleCloudSecuritycenterV1ResourceSelector`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceTypes` | array<string> | — |

### `GoogleCloudSecuritycenterV1ResourceValueConfig`

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
| `sensitiveDataProtectionMapping` | GoogleCloudSecuritycenterV1SensitiveDataProtectionMapping | — |
| `tagValues` | array<string> | — |
| `updateTime` | string (google-datetime) | — |

### `GoogleCloudSecuritycenterV1RunAssetDiscoveryResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | — |
| `state` | string enum | — Values: `STATE_UNSPECIFIED`, `COMPLETED`, `SUPERSEDED`, `TERMINATED`. |

### `GoogleCloudSecuritycenterV1SecurityHealthAnalyticsCustomModule`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ancestorModule` | string | — |
| `cloudProvider` | string enum | — Values: `CLOUD_PROVIDER_UNSPECIFIED`, `GOOGLE_CLOUD_PLATFORM`, `AMAZON_WEB_SERVICES`, `MICROSOFT_AZURE`. |
| `customConfig` | GoogleCloudSecuritycenterV1CustomConfig | — |
| `displayName` | string | — |
| `enablementState` | string enum | — Values: `ENABLEMENT_STATE_UNSPECIFIED`, `ENABLED`, `DISABLED`, `INHERITED`. |
| `lastEditor` | string | — |
| `name` | string | — |
| `updateTime` | string (google-datetime) | — |

### `GoogleCloudSecuritycenterV1SensitiveDataProtectionMapping`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `highSensitivityMapping` | string enum | — Values: `RESOURCE_VALUE_UNSPECIFIED`, `HIGH`, `MEDIUM`, `LOW`, `NONE`. |
| `mediumSensitivityMapping` | string enum | — Values: `RESOURCE_VALUE_UNSPECIFIED`, `HIGH`, `MEDIUM`, `LOW`, `NONE`. |

### `GoogleCloudSecuritycenterV1beta1Finding`

-
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `category` | string | — |
| `createTime` | string (google-datetime) | — |
| `eventTime` | string (google-datetime) | — |
| `externalUri` | string | — |
| `name` | string | — |
| `parent` | string | — |
| `resourceName` | string | — |
| `securityMarks` | GoogleCloudSecuritycenterV1beta1SecurityMarks | — |
| `sourceProperties` | object | — |
| `state` | string enum | — Values: `STATE_UNSPECIFIED`, `ACTIVE`, `INACTIVE`. |

### `GoogleCloudSecuritycenterV1beta1RunAssetDiscoveryResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | — |
| `state` | string enum | — Values: `STATE_UNSPECIFIED`, `COMPLETED`, `SUPERSEDED`, `TERMINATED`. |

### `GoogleCloudSecuritycenterV1beta1SecurityMarks`

-
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `marks` | object | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV1p1beta1Finding`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canonicalName` | string | — |
| `category` | string | — |
| `createTime` | string (google-datetime) | — |
| `eventTime` | string (google-datetime) | — |
| `externalUri` | string | — |
| `name` | string | — |
| `parent` | string | — |
| `resourceName` | string | — |
| `securityMarks` | GoogleCloudSecuritycenterV1p1beta1SecurityMarks | — |
| `severity` | string enum | — Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |
| `sourceProperties` | object | — |
| `state` | string enum | — Values: `STATE_UNSPECIFIED`, `ACTIVE`, `INACTIVE`. |

### `GoogleCloudSecuritycenterV1p1beta1Folder`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceFolder` | string | — |
| `resourceFolderDisplayName` | string | — |

### `GoogleCloudSecuritycenterV1p1beta1NotificationMessage`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `finding` | GoogleCloudSecuritycenterV1p1beta1Finding | — |
| `notificationConfigName` | string | — |
| `resource` | GoogleCloudSecuritycenterV1p1beta1Resource | — |

### `GoogleCloudSecuritycenterV1p1beta1Resource`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `folders` | array<GoogleCloudSecuritycenterV1p1beta1Folder> | — |
| `name` | string | — |
| `parent` | string | — |
| `parentDisplayName` | string | — |
| `project` | string | — |
| `projectDisplayName` | string | — |

### `GoogleCloudSecuritycenterV1p1beta1RunAssetDiscoveryResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | — |
| `state` | string enum | — Values: `STATE_UNSPECIFIED`, `COMPLETED`, `SUPERSEDED`, `TERMINATED`. |

### `GoogleCloudSecuritycenterV1p1beta1SecurityMarks`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canonicalName` | string | — |
| `marks` | object | — |
| `name` | string | — |

### `GoogleCloudSecuritycenterV2Access`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `callerIp` | string | — |
| `callerIpGeo` | GoogleCloudSecuritycenterV2Geolocation | — |
| `methodName` | string | — |
| `principalEmail` | string | — |
| `principalSubject` | string | — |
| `serviceAccountDelegationInfo` | array<GoogleCloudSecuritycenterV2ServiceAccountDelegationInfo> | — |
| `serviceAccountKeyName` | string | — |
| `serviceName` | string | — |
| `userAgent` | string | — |
| `userAgentFamily` | string | — |
| `userName` | string | — |

### Shape of `Access`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "callerIp": "string",
  "callerIpGeo": "Geolocation",
  "methodName": "string",
  "principalEmail": "string",
  "principalSubject": "string",
  "serviceAccountDelegationInfo": "array<ServiceAccountDelegationInfo>",
  "serviceAccountKeyName": "string",
  "serviceName": "string",
  "userAgent": "string",
  "userAgentFamily": "string",
  "userName": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2, v1beta1 of `securitycenter` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://securitycenter.googleapis.com/$discovery/rest?version=v1, https://securitycenter.googleapis.com/$discovery/rest?version=v1beta2, https://securitycenter.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
