---
source: https://assuredworkloads.googleapis.com/$discovery/rest?version=v1
---

# Assured Workloads API message schemas (assuredworkloads)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/assuredworkloads/`.

### `GoogleCloudAssuredworkloadsV1AcknowledgeViolationRequest`

- Request message for acknowledging a violation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acknowledgeType` | string enum | Optional. The scope of the acknowledgement for the specified violation. If not specified, `SINGLE_VIOLATION` is used. Values: `ACKNOWLEDGE_TYPE_UNSPECIFIED`, `SINGLE_VIOLATION`, `EXISTING_CHILD_RESOURCE_VIOLATIONS`. |
| `comment` | string | Required. The business justification for acknowledging the violation. The comment can't be empty or contain only whitespace characters. |
| `nonCompliantOrgPolicy` | string | Optional. Deprecated: This field is deprecated and will be removed in a future version of the API. The service identifies the violation to acknowledge by `name`, and ignores this field. Don't set this field. The name of the organization policy that was modified with a non-compliant change and resulted in this violation. Formats: \* `projects/{project_number}/policies/{constraint_name}` \* `folders/{folder_id}/policies/{constraint_name}` \* `organizations/{organization_id}/policies/{constraint_name}` |
| `view` | string enum | Optional. The violation view (`VIOLATION_VIEW_ASSURED_WORKLOADS` or `VIOLATION_VIEW_DATA_BOUNDARY`) that the violation belongs to. If not specified, `VIOLATION_VIEW_ASSURED_WORKLOADS` is used. Values: `VIOLATION_VIEW_UNSPECIFIED`, `VIOLATION_VIEW_ASSURED_WORKLOADS`, `VIOLATION_VIEW_DATA_BOUNDARY`. |

### `GoogleCloudAssuredworkloadsV1AcknowledgeViolationResponse`

- Response message for acknowledging a violation. This message is empty.
- Version: v1

### `GoogleCloudAssuredworkloadsV1AggregateDbFrameworkComplianceReportResponse`

- The response message for AggregateDbFrameworkComplianceReport.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregatedComplianceReports` | array<GoogleCloudAssuredworkloadsV1AggregatedComplianceReport> | The daily compliance reports for the requested time range. |

### `GoogleCloudAssuredworkloadsV1AggregatedComplianceReport`

- A point-in-time compliance report for a framework.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlAssessmentDetails` | GoogleCloudAssuredworkloadsV1ControlAssessmentDetails | The number of passing, failing, and not assessed controls in the framework at `report_time`. |
| `reportTime` | string (google-datetime) | The time that the compliance report represents. |

### `GoogleCloudAssuredworkloadsV1AnalyzeWorkloadMoveResponse`

- Response containing the analysis results for the hypothetical resource move.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetMoveAnalyses` | array<GoogleCloudAssuredworkloadsV1AssetMoveAnalysis> | List of analysis results for each asset in scope. |
| `nextPageToken` | string | The next page token. Is empty if the last page is reached. |

### `GoogleCloudAssuredworkloadsV1ApplyWorkloadUpdateOperationMetadata`

- Operation metadata to give request details of ApplyWorkloadUpdate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Optional. The time the operation was created. Values: `WORKLOAD_UPDATE_ACTION_UNSPECIFIED`, `APPLY`. |
| `createTime` | string (google-datetime) | Optional. Output only. The time the operation was created. |
| `updateName` | string | Required. The resource name of the update |

### `GoogleCloudAssuredworkloadsV1ApplyWorkloadUpdateRequest`

- Request to apply update to a workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | The action to be performed on the update. Values: `WORKLOAD_UPDATE_ACTION_UNSPECIFIED`, `APPLY`. |

### `GoogleCloudAssuredworkloadsV1ApplyWorkloadUpdateResponse`

- Response for ApplyWorkloadUpdate endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appliedUpdate` | GoogleCloudAssuredworkloadsV1WorkloadUpdate | The update that was applied. |

### `GoogleCloudAssuredworkloadsV1AssetMoveAnalysis`

- Represents move analysis results for an asset.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysisGroups` | array<GoogleCloudAssuredworkloadsV1MoveAnalysisGroup> | List of eligible analyses performed for the asset. |
| `asset` | string | The full resource name of the asset being analyzed. Example: //compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1 |
| `assetType` | string | Type of the asset being analyzed. Possible values will be among the ones listed here (https://cloud.google.com/asset-inventory/docs/supported-asset-types). |

### `GoogleCloudAssuredworkloadsV1CELExpression`

- A Common Expression Language (CEL) expression that's used to create a rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expression` | string | Required. The logical expression in CEL. The maximum length of the condition is 1000 characters. For more information, see CEL expression (https://cloud.google.com/security-command-center/docs/compliance-manager-write-cel-expressions). |
| `resourceTypesValues` | GoogleCloudAssuredworkloadsV1StringList | The resource instance types on which this expression is defined. The format is `/`. For example: `compute.googleapis.com/Instance` |

### `GoogleCloudAssuredworkloadsV1CloudControlAssessmentDetails`

- The cloud control assessment details for non-manual cloud controls.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `evaluationState` | string enum | Output only. The evaluation status of the cloud control. Values: `EVALUATION_STATE_UNSPECIFIED`, `EVALUATION_STATE_PASSED`, `EVALUATION_STATE_FAILED`, `EVALUATION_STATE_NOT_ASSESSED`. |
| `findingsCount` | integer (int32) | The number of findings for the cloud control. |
| `orgPolicyFindingCount` | string (int64) | Output only. Number of organization policy findings for the cloud control. |
| `resourceFindingCount` | string (int64) | Output only. Number of resource findings for the cloud control. |

### `GoogleCloudAssuredworkloadsV1CloudControlReport`

- The cloud control report.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `categories` | array<string> | The list of categories for the cloud control. |
| `cloudControl` | string | The name of the cloud control. |
| `cloudControlAssessmentDetails` | GoogleCloudAssuredworkloadsV1CloudControlAssessmentDetails | The details of a cloud control assessment. |
| `cloudControlDeployment` | string | The name of the cloud control deployment. |
| `cloudControlType` | string enum | The type of the cloud control. Values: `TYPE_UNSPECIFIED`, `CUSTOM`, `BUILT_IN`. |
| `description` | string | The description of the cloud control. |
| `displayName` | string | The display name of the cloud control. |
| `enforcementMode` | string enum | The enforcement mode of the cloud control. Values: `ENFORCEMENT_MODE_UNSPECIFIED`, `PREVENTIVE`, `DETECTIVE`, `AUDIT`. |
| `findingCategory` | string | The category of the finding. |
| `findingSeverity` | string enum | The severity of the finding. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |
| `frameworkMajorRevisionIds` | array<string> | The major revision IDs of the frameworks that the cloud control belongs to. |
| `majorRevisionId` | string (int64) | The major revision ID of the cloud control. |
| `manualCloudControlAssessmentDetails` | GoogleCloudAssuredworkloadsV1ManualCloudControlAssessmentDetails | The details of a manual cloud control assessment. |
| `minorRevisionId` | string (int64) | The minor revision ID of the cloud control. |
| `rules` | array<GoogleCloudAssuredworkloadsV1Rule> | The list of rules that correspond to the cloud control. |
| `similarControls` | array<GoogleCloudAssuredworkloadsV1SimilarControls> | The list of similar controls. |

### `GoogleCloudAssuredworkloadsV1ControlAssessmentDetails`

- The details for a control assessment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assessedPassingControlIds` | array<string> | The list of controls that were assessed and are passing. |
| `assessedPassingControls` | integer (int32) | The number of controls that were assessed and are passing. |
| `failingControlIds` | array<string> | The list of controls that are failing. |
| `failingControls` | integer (int32) | The number of controls that are failing. |
| `notAssessedControlIds` | array<string> | The list of controls that aren't assessed because they require manual review. |
| `notAssessedControls` | integer (int32) | The number of controls that aren't assessed because they require manual review. |
| `passingControlIds` | array<string> | The list of controls that are passing or not assessed. |
| `passingControls` | integer (int32) | The number of controls that are passing or not assessed. |

### `GoogleCloudAssuredworkloadsV1CreateWorkloadOperationMetadata`

- Operation metadata to give request details of CreateWorkload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `complianceRegime` | string enum | Optional. Compliance controls that should be applied to the resources managed by the workload. Values: `COMPLIANCE_REGIME_UNSPECIFIED`, `ASSURED_WORKLOADS_FOR_PARTNERS`, `AUSTRALIA_DATA_BOUNDARY_AND_SUPPORT`, `CANADA_DATA_BOUNDARY_AND_SUPPORT`, `DATA_BOUNDARY_FOR_CANADA_CONTROLLED_GOODS`, `DATA_BOUNDARY_FOR_CANADA_PROTECTED_B`, `DATA_BOUNDARY_FOR_CJIS`, `DATA_BOUNDARY_FOR_FEDRAMP_HIGH`, `DATA_BOUNDARY_FOR_FEDRAMP_MODERATE`, `DATA_BOUNDARY_FOR_IL2`, `DATA_BOUNDARY_FOR_IL4`, `DATA_BOUNDARY_FOR_IL5`, `DATA_BOUNDARY_FOR_IRS_PUBLICATION_1075`, `DATA_BOUNDARY_FOR_ITAR`, `EU_DATA_BOUNDARY_AND_SUPPORT`, `ISRAEL_DATA_BOUNDARY_AND_SUPPORT`, `JAPAN_DATA_BOUNDARY`, `SWITZERLAND_DATA_BOUNDARY_WITH_ACCESS_JUSTIFICATIONS`, `KSA_DATA_BOUNDARY_WITH_ACCESS_JUSTIFICATIONS`, `REGIONAL_DATA_BOUNDARY`, `US_DATA_BOUNDARY_AND_SUPPORT`, `US_DATA_BOUNDARY_FOR_HEALTHCARE_AND_LIFE_SCIENCES`, `US_DATA_BOUNDARY_FOR_HEALTHCARE_AND_LIFE_SCIENCES_WITH_SUPPORT`, `AU_REGIONS_AND_US_SUPPORT`, `CA_PROTECTED_B`, `CA_REGIONS_AND_SUPPORT`, `CANADA_CONTROLLED_GOODS`, `CJIS`, `EU_REGIONS_AND_SUPPORT`, `FEDRAMP_HIGH`, `FEDRAMP_MODERATE`, `HEALTHCARE_AND_LIFE_SCIENCES_CONTROLS`, `HEALTHCARE_AND_LIFE_SCIENCES_CONTROLS_US_SUPPORT`, `HIPAA`, `HITRUST`, `IL2`, `IL4`, `IL5`, `IRS_1075`, `ISR_REGIONS`, `ISR_REGIONS_AND_SUPPORT`, `ITAR`, `JP_REGIONS_AND_SUPPORT`, `KSA_REGIONS_AND_SUPPORT_WITH_SOVEREIGNTY_CONTROLS`, `REGIONAL_CONTROLS`, `US_REGIONAL_ACCESS`. |
| `createTime` | string (google-datetime) | Optional. Time when the operation was created. |
| `displayName` | string | Optional. The display name of the workload. |
| `parent` | string | Optional. The parent of the workload. |

### `GoogleCloudAssuredworkloadsV1DbControlComplianceSummary`

- A summary of the compliance status of a control in a framework compliance report.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudControlReports` | array<GoogleCloudAssuredworkloadsV1CloudControlReport> | The list of cloud control reports. |
| `complianceFrameworks` | array<string> | The list of compliance frameworks that the control belongs to. |
| `control` | string | The name of the control. |
| `controlResponsibilityType` | string enum | The responsibility type for the control. Values: `REGULATORY_CONTROL_RESPONSIBILITY_TYPE_UNSPECIFIED`, `GOOGLE`, `CUSTOMER`, `SHARED`. |
| `description` | string | The description of the control. |
| `displayName` | string | The display name of the control. |
| `isFakeControl` | boolean | Whether the control is a fake control. Fake controls are created and mapped to cloud controls that don't belong to a control group. |
| `name` | string | Identifier. The resource name of the control compliance summary. Format: `organizations/{organization}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}/dbControlComplianceSummaries/{db_control_compliance_summary}` |
| `orgPolicyFindingCount` | string (int64) | Output only. Number of organization policy findings for this control. |
| `overallEvaluationState` | string enum | Output only. The overall evaluation status of the control. Values: `EVALUATION_STATE_UNSPECIFIED`, `EVALUATION_STATE_PASSED`, `EVALUATION_STATE_FAILED`, `EVALUATION_STATE_NOT_ASSESSED`. |
| `resourceFindingCount` | string (int64) | Output only. Number of resource findings for this control. |
| `similarControls` | array<GoogleCloudAssuredworkloadsV1SimilarControls> | The list of similar controls. |
| `totalFindingsCount` | integer (int32) | The total number of findings for the control. |

### `GoogleCloudAssuredworkloadsV1DbFindingSummary`

- A summary of the active findings for a finding category in a Data Boundary scope.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `findingCategory` | string | Output only. The category of the findings that are summarized. |
| `findingClass` | string enum | Output only. The class of the findings. Values: `FINDING_CLASS_UNSPECIFIED`, `THREAT`, `VULNERABILITY`, `MISCONFIGURATION`, `OBSERVATION`, `SCC_ERROR`, `POSTURE_VIOLATION`, `TOXIC_COMBINATION`, `SENSITIVE_DATA_RISK`, `CHOKEPOINT`. |
| `findingCount` | string (int64) | Output only. The total number of active findings in the category. |
| `name` | string | Identifier. The resource name of the finding summary. |
| `organizationPolicyFindingCount` | string (int64) | Output only. The number of active organization policy findings in the category. |
| `relatedFrameworks` | array<string> | Optional. The display names of the compliance frameworks that the findings are related to. |
| `resourceFindingCount` | string (int64) | Output only. The number of active resource findings in the category. |
| `severity` | string enum | Output only. The severity of the findings. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |
| `updateTime` | string (google-datetime) | Output only. The time when the findings in the category were last updated. |

### `GoogleCloudAssuredworkloadsV1DbFrameworkComplianceSummary`

- A summary of the compliance status of a framework that's deployed in a Data Boundary scope.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlAssessmentDetails` | GoogleCloudAssuredworkloadsV1ControlAssessmentDetails | The number of passing, failing, and not assessed controls in the framework. |
| `controlsPassingTrend` | GoogleCloudAssuredworkloadsV1Trend | Output only. The trend of passing controls over the trend duration. This field is only populated when using `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_FULL`. |
| `findingCount` | string (int64) | Output only. The number of findings that were generated against the framework. This field is only populated when using `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_FULL`. |
| `framework` | string | The resource name of the compliance framework. |
| `frameworkCategories` | array<string> | The categories of the framework. Values: `FRAMEWORK_CATEGORY_UNSPECIFIED`, `INDUSTRY_DEFINED_STANDARD`, `ASSURED_WORKLOADS`, `DATA_SECURITY`, `GOOGLE_BEST_PRACTICES`, `CUSTOM_FRAMEWORK`. |
| `frameworkDisplayName` | string | Optional. The display name of the framework. |
| `frameworkType` | string enum | The type of the framework. Values: `FRAMEWORK_TYPE_UNSPECIFIED`, `BUILT_IN`, `CUSTOM`. |
| `majorRevisionId` | string (int64) | The major revision ID of the framework. |
| `minorRevisionId` | string (int64) | The minor revision ID of the framework. |
| `name` | string | Identifier. The resource name of the framework compliance summary. |
| `supportedCloudProviders` | array<string> | The cloud providers that are supported by the framework. Values: `CLOUD_PROVIDER_UNSPECIFIED`, `AWS`, `AZURE`, `GCP`. |
| `targetResourceDetails` | array<GoogleCloudAssuredworkloadsV1TargetResourceDetails> | The details of the target resources (organizations, folders, or projects) that the framework is deployed on. |

### `GoogleCloudAssuredworkloadsV1EnableComplianceUpdatesResponse`

- Response for EnableComplianceUpdates endpoint.
- Version: v1

### `GoogleCloudAssuredworkloadsV1EnableResourceMonitoringResponse`

- Response for EnableResourceMonitoring endpoint.
- Version: v1

### `GoogleCloudAssuredworkloadsV1FetchDbFrameworkComplianceReportResponse`

- The response message for FetchDbFrameworkComplianceReport.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlAssessmentDetails` | GoogleCloudAssuredworkloadsV1ControlAssessmentDetails | The number of passing, failing, and not assessed controls in the framework. |
| `framework` | string | The resource name of the compliance framework. For example, `organizations/{organization}/locations/{location}/frameworks/{framework_id}`. |
| `frameworkCategories` | array<string> | The categories of the framework. Values: `FRAMEWORK_CATEGORY_UNSPECIFIED`, `INDUSTRY_DEFINED_STANDARD`, `ASSURED_WORKLOADS`, `DATA_SECURITY`, `GOOGLE_BEST_PRACTICES`, `CUSTOM_FRAMEWORK`. |
| `frameworkDescription` | string | The description of the framework. |
| `frameworkDisplayName` | string | Optional. The display name of the framework. |
| `frameworkType` | string enum | The type of the framework. Values: `FRAMEWORK_TYPE_UNSPECIFIED`, `BUILT_IN`, `CUSTOM`. |
| `majorRevisionId` | string (int64) | The latest major revision ID of the framework. |
| `minorRevisionId` | string (int64) | The latest minor revision ID of the latest major revision of the framework. |
| `name` | string | The resource name of the framework compliance report. |
| `supportedCloudProviders` | array<string> | The cloud providers that are supported by the framework. Values: `CLOUD_PROVIDER_UNSPECIFIED`, `AWS`, `AZURE`, `GCP`. |
| `targetResourceDetails` | array<GoogleCloudAssuredworkloadsV1TargetResourceDetails> | The details of the target resources (organizations, folders, or projects) that the framework is deployed on. |
| `updateTime` | string (google-datetime) | Output only. The time when the report was last updated. |

### `GoogleCloudAssuredworkloadsV1ListDbControlComplianceSummariesResponse`

- The response message for ListDbControlComplianceSummaries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbControlComplianceSummaries` | array<GoogleCloudAssuredworkloadsV1DbControlComplianceSummary> | The list of control compliance summaries. |
| `nextPageToken` | string | Output only. A token that can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. |

### `GoogleCloudAssuredworkloadsV1ListDbFindingSummariesResponse`

- The response message for ListDbFindingSummaries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbFindingSummaries` | array<GoogleCloudAssuredworkloadsV1DbFindingSummary> | The list of finding summaries, one for each finding category. |
| `nextPageToken` | string | Output only. A token that can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. |

### `GoogleCloudAssuredworkloadsV1ListDbFrameworkComplianceSummariesResponse`

- The response message for ListDbFrameworkComplianceSummaries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbFrameworkComplianceSummaries` | array<GoogleCloudAssuredworkloadsV1DbFrameworkComplianceSummary> | The list of framework compliance summaries. |
| `nextPageToken` | string | Output only. A token that can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. |

### `GoogleCloudAssuredworkloadsV1ListViolationsResponse`

- Response message for the `ListViolations` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. |
| `totalSize` | integer (int32) | The total number of violations that match the request, across all pages. This field might not be populated for all requests; when it's not populated, its value is `0`. |
| `violations` | array<GoogleCloudAssuredworkloadsV1Violation> | The list of violations. |

### `GoogleCloudAssuredworkloadsV1ListWorkloadUpdatesResponse`

- Response of listing the compliance updates per workload with pagination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next page token. Return empty if reached the last page. |
| `workloadUpdates` | array<GoogleCloudAssuredworkloadsV1WorkloadUpdate> | The list of workload updates for a given workload. |

### `GoogleCloudAssuredworkloadsV1ListWorkloadsResponse`

- Response of ListWorkloads endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next page token. Return empty if reached the last page. |
| `workloads` | array<GoogleCloudAssuredworkloadsV1Workload> | List of Workloads under a given parent. |

### `GoogleCloudAssuredworkloadsV1ManualCloudControlAssessmentDetails`

- The details for a manual cloud control assessment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `manualCloudControlGuide` | array<string> | The guide for assessing a cloud control manually. |

### `GoogleCloudAssuredworkloadsV1MoveAnalysisGroup`

- Represents a logical group of checks performed for an asset. If successful, the group contains the analysis result, otherwise it contains an error with the failure reason.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysisResult` | GoogleCloudAssuredworkloadsV1MoveAnalysisResult | Result of a successful analysis. |
| `displayName` | string | Name of the analysis group. |
| `error` | GoogleRpcStatus | Error details for a failed analysis. |

### `GoogleCloudAssuredworkloadsV1MoveAnalysisResult`

- Represents the successful move analysis results for a group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `blockers` | array<GoogleCloudAssuredworkloadsV1MoveImpact> | List of blockers. If not resolved, these will result in compliance violations in the target. |
| `warnings` | array<GoogleCloudAssuredworkloadsV1MoveImpact> | List of warnings. These are risks that may or may not result in compliance violations. |

### `GoogleCloudAssuredworkloadsV1MoveImpact`

- Represents the impact of moving the asset to the target.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detail` | string | Explanation of the impact. |

### `GoogleCloudAssuredworkloadsV1MutatePartnerPermissionsRequest`

- Request for updating permission settings for a partner workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The etag of the workload. If this is provided, it must match the server's etag. |
| `partnerPermissions` | GoogleCloudAssuredworkloadsV1WorkloadPartnerPermissions | Required. The partner permissions to be updated. |
| `updateMask` | string (google-fieldmask) | Required. The list of fields to be updated. E.g. update_mask { paths: "partner_permissions.data_logs_viewer"} |

### `GoogleCloudAssuredworkloadsV1OrgPolicy`

- This assured workload service object is used to represent the org policy attached to a resource. It servces the same purpose as the orgpolicy.v2.Policy object but with functionality that is limited to what is supported by Assured Workloads(e.g. only one rule under one OrgPolicy object, no conditions, etc).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constraint` | string | The constraint name of the OrgPolicy. e.g. "constraints/gcp.resourceLocations". |
| `inherit` | boolean | If `inherit` is true, policy rules of the lowest ancestor in the resource hierarchy chain are inherited. If it is false, policy rules are not inherited. |
| `reset` | boolean | Ignores policies set above this resource and restores to the `constraint_default` value. `reset` can only be true when `rules` is empty and `inherit` is false. |
| `resource` | string | Resource that the OrgPolicy attaches to. Format: folders/123" projects/123". |
| `rule` | GoogleCloudAssuredworkloadsV1OrgPolicyPolicyRule | The rule of the OrgPolicy. |

### `GoogleCloudAssuredworkloadsV1OrgPolicyPolicyRule`

- A rule used to express this policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowAll` | boolean | ListPolicy only when all values are allowed. |
| `denyAll` | boolean | ListPolicy only when all values are denied. |
| `enforce` | boolean | BooleanPolicy only. |
| `values` | GoogleCloudAssuredworkloadsV1OrgPolicyPolicyRuleStringValues | ListPolicy only when custom values are specified. |

### `GoogleCloudAssuredworkloadsV1OrgPolicyPolicyRuleStringValues`

- The values allowed for a ListPolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedValues` | array<string> | List of values allowed at this resource. |
| `deniedValues` | array<string> | List of values denied at this resource. |

### `GoogleCloudAssuredworkloadsV1OrgPolicyUpdate`

- Represents an update for an org policy control applied on an Assured Workload resource. The inherited org policy is not considered.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appliedPolicy` | GoogleCloudAssuredworkloadsV1OrgPolicy | The org policy currently applied on the assured workload resource. |
| `suggestedPolicy` | GoogleCloudAssuredworkloadsV1OrgPolicy | The suggested org policy that replaces the applied policy. |

### `GoogleCloudAssuredworkloadsV1RestrictAllowedResourcesRequest`

- Request for restricting list of available resources in Workload environment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `restrictionType` | string enum | Required. The type of restriction for using gcp products in the Workload environment. Values: `RESTRICTION_TYPE_UNSPECIFIED`, `ALLOW_ALL_GCP_RESOURCES`, `ALLOW_COMPLIANT_RESOURCES`, `APPEND_COMPLIANT_RESOURCES`. |

### `GoogleCloudAssuredworkloadsV1RestrictAllowedResourcesResponse`

- Response for restricting the list of allowed resources.
- Version: v1

### `GoogleCloudAssuredworkloadsV1Rule`

- A rule in the cloud control.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `celExpression` | GoogleCloudAssuredworkloadsV1CELExpression | The rule's logic expression in Common Expression Language (CEL). |
| `description` | string | Optional. The rule description. The maximum length is 2000 characters. |
| `ruleActionTypes` | array<string> | Required. The functionality that's enabled by the rule. Values: `RULE_ACTION_TYPE_UNSPECIFIED`, `RULE_ACTION_TYPE_PREVENTIVE`, `RULE_ACTION_TYPE_DETECTIVE`, `RULE_ACTION_TYPE_AUDIT`. |

### `GoogleCloudAssuredworkloadsV1SimilarControls`

- The similar controls.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlId` | string | The ID of the control. |
| `framework` | string | The name of the framework. |

### `GoogleCloudAssuredworkloadsV1StringList`

- A list of strings for the parameter value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<string> | Required. The strings in the list. |

### `GoogleCloudAssuredworkloadsV1TargetResourceDetails`

- The details for a target resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The create time of the target resource. |
| `frameworkDeployment` | string | The framework deployment name for the target resource. For example, `organizations/{organization_id}/locations/{location}/frameworkDeployments/{framework_deployment_id}` |
| `majorRevisionId` | string (int64) | The major revision ID of the framework for the target resource. |
| `minorRevisionId` | string (int64) | The minor revision ID of the framework for the target resource. |
| `targetResource` | string | The target resource. For example, `organizations/1234567890`, `projects/1234567890`, or `folders/1234567890`. |
| `targetResourceDisplayName` | string | The display name of the target resource. For example, `google.com`, `staging-project`, or `development-folder`. |
| `updateTime` | string (google-datetime) | The update time of the target resource. |

### `GoogleCloudAssuredworkloadsV1Trend`

- The trend of a compliance metric.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | Output only. The duration for the trend. |
| `valuePercent` | number (double) | Output only. The trend value as a percentage. The value can be positive or negative. |

### `GoogleCloudAssuredworkloadsV1UpdateDetails`

- The details of the update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `orgPolicyUpdate` | GoogleCloudAssuredworkloadsV1OrgPolicyUpdate | Update to one org policy, e.g. gcp.resourceLocation. |

### `GoogleCloudAssuredworkloadsV1Violation`

- A compliance violation that's detected by Assured Workloads monitoring. A violation is created when an organization policy or a resource in a workload (or a Data Boundary scope) changes in a way that doesn't comply with the controls of the applicable compliance regime or framework.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acknowledged` | boolean | Whether the violation has been acknowledged. |
| `acknowledgementTime` | string (google-datetime) | Optional. The time when the violation was first acknowledged. To find the most recent time that the violation was acknowledged, check `exception_contexts`. This field is absent when `acknowledged` is `false`. |
| `affectedFrameworks` | array<string> | Output only. The IDs of the compliance frameworks that are affected by this violation. For example, `builtin-fedramp-high`. This field is only populated when using `VIOLATION_VIEW_DATA_BOUNDARY`. |
| `associatedOrgPolicyViolationId` | string | Optional. Output only. For resource violations, the ID of the organization policy violation that caused this resource violation. This field is empty for organization policy violations. |
| `auditLogLink` | string | Output only. Immutable. A link to the Cloud Audit Logs entries for the violated resource. Format: `https://console.cloud.google.com/logs/query;query={logName}{protoPayload.resourceName}{timeRange}{folder}` |
| `beginTime` | string (google-datetime) | Output only. The time of the event that triggered the violation. |
| `category` | string | Output only. The category that the violation is mapped to. For example, `Location`, `Service Usage`, `Access`, or `Encryption`. |
| `childResourceViolationCount` | integer (int32) | Optional. Output only. For organization policy violations, the number of resource violations that are associated with this violation. This field is `0` for resource violations. |
| `description` | string | Output only. A description of the violation. For example, `OrgPolicy gcp.resourceLocations has non compliant value.` |
| `exceptionAuditLogLink` | string | Output only. Immutable. A link to the Cloud Audit Logs entries that contain the business justification that was provided when the violation was acknowledged. Format: `https://console.cloud.google.com/logs/query;query={logName}{protoPayload.resourceName}{protoPayload.methodName}{timeRange}{organization}` |
| `exceptionContexts` | array<GoogleCloudAssuredworkloadsV1ViolationExceptionContext> | Output only. The details of all of the acknowledgements (exceptions) for the violation. |
| `name` | string | Output only. Immutable. The resource name of the violation. Format: `organizations/{organization}/locations/{location}/workloads/{workload_id}/violations/{violations_id}` |
| `nonCompliantOrgPolicy` | string | Output only. Immutable. The name of the organization policy that was modified with a non-compliant change and resulted in this violation. Formats: \* `projects/{project_number}/policies/{constraint_name}` \* `folders/{folder_id}/policies/{constraint_name}` \* `organizations/{organization_id}/policies/{constraint_name}` |
| `orgPolicyConstraint` | string | Output only. Immutable. Deprecated: This field is deprecated and might be removed in a future version of the API. Use `non_compliant_org_policy` instead, which contains the full resource name of the organization policy, including the constraint name. The organization policy constraint that was changed in a non-compliant way, which resulted in this violation. |
| `parentProjectNumber` | string | Optional. Output only. For resource violations, the number of the project that contains the non-compliant resource. This field is empty for organization policy violations. |
| `remediation` | GoogleCloudAssuredworkloadsV1ViolationRemediation | Output only. The remediation guidance for the violation. |
| `remediationMarkdown` | string | Output only. The remediation instructions for the violation, in Markdown format. This field is only populated by `GetViolation` when using `VIOLATION_VIEW_DATA_BOUNDARY`. When this field isn't populated, see `remediation` instead. |
| `resolveTime` | string (google-datetime) | Output only. The time of the event that resolved the violation. This field is empty if the violation is unresolved. |
| `resourceName` | string | Optional. Output only. For resource violations, the full resource name of the non-compliant resource. For example, `//storage.googleapis.com/myprojectxyz-testbucket`. This field is empty for organization policy violations. |
| `resourceType` | string | Optional. Output only. For resource violations, the type of the non-compliant resource. For example, `compute.googleapis.com/Disk`. This field is empty for organization policy violations. |
| `state` | string enum | Output only. The state of the violation. Values: `STATE_UNSPECIFIED`, `RESOLVED`, `UNRESOLVED`, `EXCEPTION`. |
| `updateTime` | string (google-datetime) | Output only. The time when the violation record was last updated. |
| `violationType` | string enum | Output only. The type of the violation. Values: `VIOLATION_TYPE_UNSPECIFIED`, `ORG_POLICY`, `RESOURCE`. |

### `GoogleCloudAssuredworkloadsV1ViolationExceptionContext`

- Details about an acknowledgement (exception) of a violation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acknowledgementTime` | string (google-datetime) | The time when the violation was acknowledged. |
| `comment` | string | The business justification that was provided when the violation was acknowledged. |
| `userName` | string | The name of the user (or service account) who acknowledged the violation. |

### `GoogleCloudAssuredworkloadsV1ViolationRemediation`

- Remediation guidance to resolve a compliance violation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compliantValues` | array<string> | The values that can resolve the violation. For example, for list organization policy violations, this field contains the list of allowed or denied values. |
| `instructions` | GoogleCloudAssuredworkloadsV1ViolationRemediationInstructions | Required. The instructions to resolve the violation. |
| `remediationType` | string enum | Output only. The remediation type, which is based on the type of organization policy values that were violated. Values: `REMEDIATION_TYPE_UNSPECIFIED`, `REMEDIATION_BOOLEAN_ORG_POLICY_VIOLATION`, `REMEDIATION_LIST_ALLOWED_VALUES_ORG_POLICY_VIOLATION`, `REMEDIATION_LIST_DENIED_VALUES_ORG_POLICY_VIOLATION`, `REMEDIATION_RESTRICT_CMEK_CRYPTO_KEY_PROJECTS_ORG_POLICY_VIOLATION`, `REMEDIATION_RESOURCE_VIOLATION`, `REMEDIATION_RESOURCE_VIOLATION_NON_CMEK_SERVICES`. |

### `GoogleCloudAssuredworkloadsV1ViolationRemediationInstructions`

- Instructions to remediate a violation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consoleInstructions` | GoogleCloudAssuredworkloadsV1ViolationRemediationInstructionsConsole | Instructions to resolve the violation by using the Google Cloud console. |
| `gcloudInstructions` | GoogleCloudAssuredworkloadsV1ViolationRemediationInstructionsGcloud | Instructions to resolve the violation by using the gcloud CLI. |

### `GoogleCloudAssuredworkloadsV1ViolationRemediationInstructionsConsole`

- Instructions to remediate a violation by using the Google Cloud console.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalLinks` | array<string> | Additional URLs with more information about the steps. |
| `consoleUris` | array<string> | Links to the Google Cloud console pages where the violation can be resolved. |
| `steps` | array<string> | The steps to resolve the violation by using the Google Cloud console. |

### `GoogleCloudAssuredworkloadsV1ViolationRemediationInstructionsGcloud`

- Instructions to remediate a violation by using the Google Cloud CLI.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalLinks` | array<string> | Additional URLs with more information about the steps. |
| `gcloudCommands` | array<string> | The gcloud CLI commands that resolve the violation. |
| `steps` | array<string> | The steps to resolve the violation by using the gcloud CLI. |

### `GoogleCloudAssuredworkloadsV1Workload`

- A Workload object for managing highly regulated workloads of cloud customers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billingAccount` | string | Optional. The billing account used for the resources which are direct children of workload. This billing account is initially associated with the resources created as part of Workload creation. After the initial creation of these resources, the customer can change the assigned billing account. The resource name has the form `billingAccounts/{billing_account_id}`. For example, `billingAccounts/012345-567890-ABCDEF`. |
| `complianceRegime` | string enum | Required. Immutable. Compliance Regime associated with this workload. Values: `COMPLIANCE_REGIME_UNSPECIFIED`, `ASSURED_WORKLOADS_FOR_PARTNERS`, `AUSTRALIA_DATA_BOUNDARY_AND_SUPPORT`, `CANADA_DATA_BOUNDARY_AND_SUPPORT`, `DATA_BOUNDARY_FOR_CANADA_CONTROLLED_GOODS`, `DATA_BOUNDARY_FOR_CANADA_PROTECTED_B`, `DATA_BOUNDARY_FOR_CJIS`, `DATA_BOUNDARY_FOR_FEDRAMP_HIGH`, `DATA_BOUNDARY_FOR_FEDRAMP_MODERATE`, `DATA_BOUNDARY_FOR_IL2`, `DATA_BOUNDARY_FOR_IL4`, `DATA_BOUNDARY_FOR_IL5`, `DATA_BOUNDARY_FOR_IRS_PUBLICATION_1075`, `DATA_BOUNDARY_FOR_ITAR`, `EU_DATA_BOUNDARY_AND_SUPPORT`, `ISRAEL_DATA_BOUNDARY_AND_SUPPORT`, `JAPAN_DATA_BOUNDARY`, `SWITZERLAND_DATA_BOUNDARY_WITH_ACCESS_JUSTIFICATIONS`, `KSA_DATA_BOUNDARY_WITH_ACCESS_JUSTIFICATIONS`, `REGIONAL_DATA_BOUNDARY`, `US_DATA_BOUNDARY_AND_SUPPORT`, `US_DATA_BOUNDARY_FOR_HEALTHCARE_AND_LIFE_SCIENCES`, `US_DATA_BOUNDARY_FOR_HEALTHCARE_AND_LIFE_SCIENCES_WITH_SUPPORT`, `AU_REGIONS_AND_US_SUPPORT`, `CA_PROTECTED_B`, `CA_REGIONS_AND_SUPPORT`, `CANADA_CONTROLLED_GOODS`, `CJIS`, `EU_REGIONS_AND_SUPPORT`, `FEDRAMP_HIGH`, `FEDRAMP_MODERATE`, `HEALTHCARE_AND_LIFE_SCIENCES_CONTROLS`, `HEALTHCARE_AND_LIFE_SCIENCES_CONTROLS_US_SUPPORT`, `HIPAA`, `HITRUST`, `IL2`, `IL4`, `IL5`, `IRS_1075`, `ISR_REGIONS`, `ISR_REGIONS_AND_SUPPORT`, `ITAR`, `JP_REGIONS_AND_SUPPORT`, `KSA_REGIONS_AND_SUPPORT_WITH_SOVEREIGNTY_CONTROLS`, `REGIONAL_CONTROLS`, `US_REGIONAL_ACCESS`. |
| `complianceStatus` | GoogleCloudAssuredworkloadsV1WorkloadComplianceStatus | Output only. Count of active Violations in the Workload. |
| `compliantButDisallowedServices` | array<string> | Output only. Urls for services which are compliant for this Assured Workload, but which are currently disallowed by the ResourceUsageRestriction org policy. Invoke RestrictAllowedResources endpoint to allow your project developers to use these services in their environment. |
| `createTime` | string (google-datetime) | Output only. Immutable. The Workload creation timestamp. |
| `displayName` | string | Required. The user-assigned display name of the Workload. When present it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, and spaces. Example: My Workload |
| `ekmProvisioningResponse` | GoogleCloudAssuredworkloadsV1WorkloadEkmProvisioningResponse | Output only. Represents the Ekm Provisioning State of the given workload. |
| `enableSovereignControls` | boolean | Optional. Indicates the sovereignty status of the given workload. Currently meant to be used by Europe/Canada customers. |
| `etag` | string | Optional. ETag of the workload, it is calculated on the basis of the Workload contents. It will be used in Update & Delete operations. |
| `kajEnrollmentState` | string enum | Output only. Represents the KAJ enrollment state of the given workload. Values: `KAJ_ENROLLMENT_STATE_UNSPECIFIED`, `KAJ_ENROLLMENT_STATE_PENDING`, `KAJ_ENROLLMENT_STATE_COMPLETE`. |
| `kmsSettings` | GoogleCloudAssuredworkloadsV1WorkloadKMSSettings | Input only. Settings used to create a CMEK crypto key. When set, a project with a KMS CMEK key is provisioned. This field is deprecated as of Feb 28, 2022. In order to create a Keyring, callers should specify, ENCRYPTION_KEYS_PROJECT or KEYRING in ResourceSettings.resource_type field. |
| `labels` | object | Optional. Labels applied to the workload. |
| `name` | string | Optional. The resource name of the workload. Format: organizations/{organization}/locations/{location}/workloads/{workload} Read-only. |
| `partner` | string enum | Optional. Partner regime associated with this workload. Values: `PARTNER_UNSPECIFIED`, `LOCAL_CONTROLS_BY_S3NS`, `SOVEREIGN_CONTROLS_BY_T_SYSTEMS`, `SOVEREIGN_CONTROLS_BY_SIA_MINSAIT`, `SOVEREIGN_CONTROLS_BY_PSN`, `SOVEREIGN_CONTROLS_BY_CNTXT`, `SOVEREIGN_CONTROLS_BY_CNTXT_NO_EKM`, `SPAIN_DATA_BOUNDARY_BY_TELEFONICA`. |
| `partnerPermissions` | GoogleCloudAssuredworkloadsV1WorkloadPartnerPermissions | Optional. Permissions granted to the AW Partner SA account for the customer workload |
| `partnerServicesBillingAccount` | string | Optional. Billing account necessary for purchasing services from Sovereign Partners. This field is required for creating SIA/PSN/CNTXT/Telefonica partner workloads. The caller should have 'billing.resourceAssociations.create' IAM permission on this billing-account. The format of this string is billingAccounts/AAAAAA-BBBBBB-CCCCCC |
| `provisionedResourcesParent` | string | Input only. The parent resource for the resources managed by this Assured Workload. May be either empty or a folder resource which is a child of the Workload parent. If not specified all resources are created under the parent organization. Format: folders/{folder_id} |
| `resourceMonitoringEnabled` | boolean | Output only. Indicates whether resource monitoring is enabled for workload or not. It is true when Resource feed is subscribed to AWM topic and AWM Service Agent Role is binded to AW Service Account for resource Assured workload. |
| `resourceSettings` | array<GoogleCloudAssuredworkloadsV1WorkloadResourceSettings> | Input only. Resource properties that are used to customize workload resources. These properties (such as custom project id) will be used to create workload resources if possible. This field is optional. |
| `resources` | array<GoogleCloudAssuredworkloadsV1WorkloadResourceInfo> | Output only. The resources associated with this workload. These resources will be created when creating the workload. If any of the projects already exist, the workload creation will fail. Always read only. |
| `saaEnrollmentResponse` | GoogleCloudAssuredworkloadsV1WorkloadSaaEnrollmentResponse | Output only. Represents the SAA enrollment response of the given workload. SAA enrollment response is queried during GetWorkload call. In failure cases, user friendly error message is shown in SAA details page. |
| `violationNotificationsEnabled` | boolean | Optional. Indicates whether the e-mail notification for a violation is enabled for a workload. This value will be by default True, and if not present will be considered as true. This should only be updated via updateWorkload call. Any Changes to this field during the createWorkload call will not be honored. This will always be true while creating the workload. |
| `workloadOptions` | GoogleCloudAssuredworkloadsV1WorkloadWorkloadOptions | Optional. Options to be set for the given created workload. |

### `GoogleCloudAssuredworkloadsV1WorkloadComplianceStatus`

- Represents the Compliance Status of this workload
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acknowledgedResourceViolationCount` | integer (int32) | Number of current resource violations which are not acknowledged. |
| `acknowledgedViolationCount` | integer (int32) | Number of current orgPolicy violations which are acknowledged. |
| `activeResourceViolationCount` | integer (int32) | Number of current resource violations which are acknowledged. |
| `activeViolationCount` | integer (int32) | Number of current orgPolicy violations which are not acknowledged. |

### `GoogleCloudAssuredworkloadsV1WorkloadEkmProvisioningResponse`

- External key management systems(EKM) Provisioning response
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ekmProvisioningErrorDomain` | string enum | Indicates Ekm provisioning error if any. Values: `EKM_PROVISIONING_ERROR_DOMAIN_UNSPECIFIED`, `UNSPECIFIED_ERROR`, `GOOGLE_SERVER_ERROR`, `EXTERNAL_USER_ERROR`, `EXTERNAL_PARTNER_ERROR`, `TIMEOUT_ERROR`. |
| `ekmProvisioningErrorMapping` | string enum | Detailed error message if Ekm provisioning fails Values: `EKM_PROVISIONING_ERROR_MAPPING_UNSPECIFIED`, `INVALID_SERVICE_ACCOUNT`, `MISSING_METRICS_SCOPE_ADMIN_PERMISSION`, `MISSING_EKM_CONNECTION_ADMIN_PERMISSION`. |
| `ekmProvisioningState` | string enum | Output only. Indicates Ekm enrollment Provisioning of a given workload. Values: `EKM_PROVISIONING_STATE_UNSPECIFIED`, `EKM_PROVISIONING_STATE_PENDING`, `EKM_PROVISIONING_STATE_FAILED`, `EKM_PROVISIONING_STATE_COMPLETED`. |

### `GoogleCloudAssuredworkloadsV1WorkloadKMSSettings`

- Settings specific to the Key Management Service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextRotationTime` | string (google-datetime) | Required. Input only. Immutable. The time at which the Key Management Service will automatically create a new version of the crypto key and mark it as the primary. |
| `rotationPeriod` | string (google-duration) | Required. Input only. Immutable. \[next_rotation_time\] will be advanced by this period when the Key Management Service automatically rotates a key. Must be at least 24 hours and at most 876,000 hours. |

### `GoogleCloudAssuredworkloadsV1WorkloadPartnerPermissions`

- Permissions granted to the AW Partner SA account for the customer workload
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessTransparencyLogsSupportCaseViewer` | boolean | Optional. Allow partner to view support case details for an AXT log |
| `assuredWorkloadsMonitoring` | boolean | Optional. Allow partner to view violation alerts. |
| `dataLogsViewer` | boolean | Optional. Allow the partner to view inspectability logs and monitoring violations. |
| `serviceAccessApprover` | boolean | Optional. Allow partner to view access approval logs. |

### `GoogleCloudAssuredworkloadsV1WorkloadResourceInfo`

- Represent the resources that are children of this Workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceId` | string (int64) | Output only. Resource identifier. For a project this represents project_number. |
| `resourceType` | string enum | Indicates the type of resource. Values: `RESOURCE_TYPE_UNSPECIFIED`, `CONSUMER_PROJECT`, `CONSUMER_FOLDER`, `ENCRYPTION_KEYS_PROJECT`, `KEYRING`. |

### `GoogleCloudAssuredworkloadsV1WorkloadResourceSettings`

- Represent the custom settings for the resources to be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | User-assigned resource display name. If not empty it will be used to create a resource with the specified name. |
| `resourceId` | string | Resource identifier. For a project this represents project_id. If the project is already taken, the workload creation will fail. For KeyRing, this represents the keyring_id. For a folder, don't set this value as folder_id is assigned by Google. |
| `resourceType` | string enum | Indicates the type of resource. This field should be specified to correspond the id to the right project type (CONSUMER_PROJECT or ENCRYPTION_KEYS_PROJECT) Values: `RESOURCE_TYPE_UNSPECIFIED`, `CONSUMER_PROJECT`, `CONSUMER_FOLDER`, `ENCRYPTION_KEYS_PROJECT`, `KEYRING`. |

### `GoogleCloudAssuredworkloadsV1WorkloadSaaEnrollmentResponse`

- Signed Access Approvals (SAA) enrollment response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `setupErrors` | array<string> | Indicates SAA enrollment setup error if any. Values: `SETUP_ERROR_UNSPECIFIED`, `ERROR_INVALID_BASE_SETUP`, `ERROR_MISSING_EXTERNAL_SIGNING_KEY`, `ERROR_NOT_ALL_SERVICES_ENROLLED`, `ERROR_SETUP_CHECK_FAILED`. |
| `setupStatus` | string enum | Output only. Indicates SAA enrollment status of a given workload. Values: `SETUP_STATE_UNSPECIFIED`, `STATUS_PENDING`, `STATUS_COMPLETE`. |

### `GoogleCloudAssuredworkloadsV1WorkloadUpdate`

- A workload update is a change to the workload's compliance configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The time the update was created. |
| `details` | GoogleCloudAssuredworkloadsV1UpdateDetails | The details of the update. |
| `name` | string | Output only. Immutable. Identifier. Resource name of the WorkloadUpdate. Format: organizations/{organization}/locations/{location}/workloads/{workload}/updates/{update} |
| `state` | string enum | Output only. The state of the update. Values: `STATE_UNSPECIFIED`, `AVAILABLE`, `APPLIED`, `WITHDRAWN`. |
| `updateTime` | string (google-datetime) | The time the update was last updated. |

### `GoogleCloudAssuredworkloadsV1WorkloadWorkloadOptions`

- Options to be set for the given created workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kajEnrollmentType` | string enum | Optional. Specifies type of KAJ Enrollment if provided. Values: `KAJ_ENROLLMENT_TYPE_UNSPECIFIED`, `KEY_ACCESS_TRANSPARENCY_OFF`. |

### `GoogleCloudAssuredworkloadsV1beta1AcknowledgeViolationRequest`

- Request message for acknowledging a violation.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `acknowledgeType` | string enum | Optional. The scope of the acknowledgement for the specified violation. If not specified, `SINGLE_VIOLATION` is used. Values: `ACKNOWLEDGE_TYPE_UNSPECIFIED`, `SINGLE_VIOLATION`, `EXISTING_CHILD_RESOURCE_VIOLATIONS`. |
| `comment` | string | Required. The business justification for acknowledging the violation. The comment can't be empty or contain only whitespace characters. |
| `nonCompliantOrgPolicy` | string | Optional. Deprecated: This field is deprecated and will be removed in a future version of the API. The service identifies the violation to acknowledge by `name`, and ignores this field. Don't set this field. The name of the organization policy that was modified with a non-compliant change and resulted in this violation. Formats: \* `projects/{project_number}/policies/{constraint_name}` \* `folders/{folder_id}/policies/{constraint_name}` \* `organizations/{organization_id}/policies/{constraint_name}` |
| `view` | string enum | Optional. The violation view (`VIOLATION_VIEW_ASSURED_WORKLOADS` or `VIOLATION_VIEW_DATA_BOUNDARY`) that the violation belongs to. If not specified, `VIOLATION_VIEW_ASSURED_WORKLOADS` is used. Values: `VIOLATION_VIEW_UNSPECIFIED`, `VIOLATION_VIEW_ASSURED_WORKLOADS`, `VIOLATION_VIEW_DATA_BOUNDARY`. |

### `GoogleCloudAssuredworkloadsV1beta1AcknowledgeViolationResponse`

- Response message for acknowledging a violation. This message is empty.
- Version: v1beta1

### `GoogleCloudAssuredworkloadsV1beta1AggregateDbFrameworkComplianceReportResponse`

- The response message for AggregateDbFrameworkComplianceReport.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `aggregatedComplianceReports` | array<GoogleCloudAssuredworkloadsV1beta1AggregatedComplianceReport> | The daily compliance reports for the requested time range. |

### `GoogleCloudAssuredworkloadsV1beta1AggregatedComplianceReport`

- A point-in-time compliance report for a framework.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `controlAssessmentDetails` | GoogleCloudAssuredworkloadsV1beta1ControlAssessmentDetails | The number of passing, failing, and not assessed controls in the framework at `report_time`. |
| `reportTime` | string (google-datetime) | The time that the compliance report represents. |

### `GoogleCloudAssuredworkloadsV1beta1AnalyzeWorkloadMoveResponse`

- Response containing the analysis results for the hypothetical resource move.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `assetMoveAnalyses` | array<GoogleCloudAssuredworkloadsV1beta1AssetMoveAnalysis> | List of analysis results for each asset in scope. |
| `nextPageToken` | string | The next page token. Is empty if the last page is reached. |

### `GoogleCloudAssuredworkloadsV1beta1ApplyWorkloadUpdateOperationMetadata`

- Operation metadata to give request details of ApplyWorkloadUpdate.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Optional. The time the operation was created. Values: `WORKLOAD_UPDATE_ACTION_UNSPECIFIED`, `APPLY`. |
| `createTime` | string (google-datetime) | Optional. Output only. The time the operation was created. |
| `updateName` | string | Required. The resource name of the update |

### `GoogleCloudAssuredworkloadsV1beta1ApplyWorkloadUpdateRequest`

- Request to apply update to a workload.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | The action to be performed on the update. Values: `WORKLOAD_UPDATE_ACTION_UNSPECIFIED`, `APPLY`. |

### `GoogleCloudAssuredworkloadsV1beta1ApplyWorkloadUpdateResponse`

- Response for ApplyWorkloadUpdate endpoint.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `appliedUpdate` | GoogleCloudAssuredworkloadsV1beta1WorkloadUpdate | The update that was applied. |

### `GoogleCloudAssuredworkloadsV1beta1AssetMoveAnalysis`

- Represents move analysis results for an asset.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `analysisGroups` | array<GoogleCloudAssuredworkloadsV1beta1MoveAnalysisGroup> | List of eligible analyses performed for the asset. |
| `asset` | string | The full resource name of the asset being analyzed. Example: //compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1 |
| `assetType` | string | Type of the asset being analyzed. Possible values will be among the ones listed here (https://cloud.google.com/asset-inventory/docs/supported-asset-types). |

### `GoogleCloudAssuredworkloadsV1beta1CELExpression`

- A Common Expression Language (CEL) expression that's used to create a rule.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `expression` | string | Required. The logical expression in CEL. The maximum length of the condition is 1000 characters. For more information, see CEL expression (https://cloud.google.com/security-command-center/docs/compliance-manager-write-cel-expressions). |
| `resourceTypesValues` | GoogleCloudAssuredworkloadsV1beta1StringList | The resource instance types on which this expression is defined. The format is `/`. For example: `compute.googleapis.com/Instance` |

### `GoogleCloudAssuredworkloadsV1beta1CloudControlAssessmentDetails`

- The cloud control assessment details for non-manual cloud controls.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `evaluationState` | string enum | Output only. The evaluation status of the cloud control. Values: `EVALUATION_STATE_UNSPECIFIED`, `EVALUATION_STATE_PASSED`, `EVALUATION_STATE_FAILED`, `EVALUATION_STATE_NOT_ASSESSED`. |
| `findingsCount` | integer (int32) | The number of findings for the cloud control. |
| `orgPolicyFindingCount` | string (int64) | Output only. Number of organization policy findings for the cloud control. |
| `resourceFindingCount` | string (int64) | Output only. Number of resource findings for the cloud control. |

### `GoogleCloudAssuredworkloadsV1beta1CloudControlReport`

- The cloud control report.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `categories` | array<string> | The list of categories for the cloud control. |
| `cloudControl` | string | The name of the cloud control. |
| `cloudControlAssessmentDetails` | GoogleCloudAssuredworkloadsV1beta1CloudControlAssessmentDetails | The details of a cloud control assessment. |
| `cloudControlDeployment` | string | The name of the cloud control deployment. |
| `cloudControlType` | string enum | The type of the cloud control. Values: `TYPE_UNSPECIFIED`, `CUSTOM`, `BUILT_IN`. |
| `description` | string | The description of the cloud control. |
| `displayName` | string | The display name of the cloud control. |
| `enforcementMode` | string enum | The enforcement mode of the cloud control. Values: `ENFORCEMENT_MODE_UNSPECIFIED`, `PREVENTIVE`, `DETECTIVE`, `AUDIT`. |
| `findingCategory` | string | The category of the finding. |
| `findingSeverity` | string enum | The severity of the finding. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |
| `frameworkMajorRevisionIds` | array<string> | The major revision IDs of the frameworks that the cloud control belongs to. |
| `majorRevisionId` | string (int64) | The major revision ID of the cloud control. |
| `manualCloudControlAssessmentDetails` | GoogleCloudAssuredworkloadsV1beta1ManualCloudControlAssessmentDetails | The details of a manual cloud control assessment. |
| `minorRevisionId` | string (int64) | The minor revision ID of the cloud control. |
| `rules` | array<GoogleCloudAssuredworkloadsV1beta1Rule> | The list of rules that correspond to the cloud control. |
| `similarControls` | array<GoogleCloudAssuredworkloadsV1beta1SimilarControls> | The list of similar controls. |

### `GoogleCloudAssuredworkloadsV1beta1ControlAssessmentDetails`

- The details for a control assessment.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `assessedPassingControlIds` | array<string> | The list of controls that were assessed and are passing. |
| `assessedPassingControls` | integer (int32) | The number of controls that were assessed and are passing. |
| `failingControlIds` | array<string> | The list of controls that are failing. |
| `failingControls` | integer (int32) | The number of controls that are failing. |
| `notAssessedControlIds` | array<string> | The list of controls that aren't assessed because they require manual review. |
| `notAssessedControls` | integer (int32) | The number of controls that aren't assessed because they require manual review. |
| `passingControlIds` | array<string> | The list of controls that are passing or not assessed. |
| `passingControls` | integer (int32) | The number of controls that are passing or not assessed. |

### `GoogleCloudAssuredworkloadsV1beta1CreateWorkloadOperationMetadata`

- Operation metadata to give request details of CreateWorkload.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `complianceRegime` | string enum | Optional. Compliance controls that should be applied to the resources managed by the workload. Values: `COMPLIANCE_REGIME_UNSPECIFIED`, `ASSURED_WORKLOADS_FOR_PARTNERS`, `AUSTRALIA_DATA_BOUNDARY_AND_SUPPORT`, `CANADA_DATA_BOUNDARY_AND_SUPPORT`, `DATA_BOUNDARY_FOR_CANADA_CONTROLLED_GOODS`, `DATA_BOUNDARY_FOR_CANADA_PROTECTED_B`, `DATA_BOUNDARY_FOR_CJIS`, `DATA_BOUNDARY_FOR_FEDRAMP_HIGH`, `DATA_BOUNDARY_FOR_FEDRAMP_MODERATE`, `DATA_BOUNDARY_FOR_IL2`, `DATA_BOUNDARY_FOR_IL4`, `DATA_BOUNDARY_FOR_IL5`, `DATA_BOUNDARY_FOR_IRS_PUBLICATION_1075`, `DATA_BOUNDARY_FOR_ITAR`, `EU_DATA_BOUNDARY_AND_SUPPORT`, `ISRAEL_DATA_BOUNDARY_AND_SUPPORT`, `JAPAN_DATA_BOUNDARY`, `SWITZERLAND_DATA_BOUNDARY_WITH_ACCESS_JUSTIFICATIONS`, `KSA_DATA_BOUNDARY_WITH_ACCESS_JUSTIFICATIONS`, `REGIONAL_DATA_BOUNDARY`, `US_DATA_BOUNDARY_AND_SUPPORT`, `US_DATA_BOUNDARY_FOR_HEALTHCARE_AND_LIFE_SCIENCES`, `US_DATA_BOUNDARY_FOR_HEALTHCARE_AND_LIFE_SCIENCES_WITH_SUPPORT`, `AU_REGIONS_AND_US_SUPPORT`, `CA_PROTECTED_B`, `CA_REGIONS_AND_SUPPORT`, `CANADA_CONTROLLED_GOODS`, `CJIS`, `EU_REGIONS_AND_SUPPORT`, `FEDRAMP_HIGH`, `FEDRAMP_MODERATE`, `HEALTHCARE_AND_LIFE_SCIENCES_CONTROLS`, `HEALTHCARE_AND_LIFE_SCIENCES_CONTROLS_US_SUPPORT`, `HIPAA`, `HITRUST`, `IL2`, `IL4`, `IL5`, `IRS_1075`, `ISR_REGIONS`, `ISR_REGIONS_AND_SUPPORT`, `ITAR`, `JP_REGIONS_AND_SUPPORT`, `KSA_REGIONS_AND_SUPPORT_WITH_SOVEREIGNTY_CONTROLS`, `REGIONAL_CONTROLS`, `US_REGIONAL_ACCESS`. |
| `createTime` | string (google-datetime) | Optional. Time when the operation was created. |
| `displayName` | string | Optional. The display name of the workload. |
| `parent` | string | Optional. The parent of the workload. |
| `resourceSettings` | array<GoogleCloudAssuredworkloadsV1beta1WorkloadResourceSettings> | Optional. Resource properties in the input that are used for creating/customizing workload resources. |

### `GoogleCloudAssuredworkloadsV1beta1DbControlComplianceSummary`

- A summary of the compliance status of a control in a framework compliance report.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `cloudControlReports` | array<GoogleCloudAssuredworkloadsV1beta1CloudControlReport> | The list of cloud control reports. |
| `complianceFrameworks` | array<string> | The list of compliance frameworks that the control belongs to. |
| `control` | string | The name of the control. |
| `controlResponsibilityType` | string enum | The responsibility type for the control. Values: `REGULATORY_CONTROL_RESPONSIBILITY_TYPE_UNSPECIFIED`, `GOOGLE`, `CUSTOMER`, `SHARED`. |
| `description` | string | The description of the control. |
| `displayName` | string | The display name of the control. |
| `isFakeControl` | boolean | Whether the control is a fake control. Fake controls are created and mapped to cloud controls that don't belong to a control group. |
| `name` | string | Identifier. The resource name of the control compliance summary. Format: `organizations/{organization}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}/dbControlComplianceSummaries/{db_control_compliance_summary}` |
| `orgPolicyFindingCount` | string (int64) | Output only. Number of organization policy findings for this control. |
| `overallEvaluationState` | string enum | Output only. The overall evaluation status of the control. Values: `EVALUATION_STATE_UNSPECIFIED`, `EVALUATION_STATE_PASSED`, `EVALUATION_STATE_FAILED`, `EVALUATION_STATE_NOT_ASSESSED`. |
| `resourceFindingCount` | string (int64) | Output only. Number of resource findings for this control. |
| `similarControls` | array<GoogleCloudAssuredworkloadsV1beta1SimilarControls> | The list of similar controls. |
| `totalFindingsCount` | integer (int32) | The total number of findings for the control. |

### `GoogleCloudAssuredworkloadsV1beta1DbFindingSummary`

- A summary of the active findings for a finding category in a Data Boundary scope.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `findingCategory` | string | Output only. The category of the findings that are summarized. |
| `findingClass` | string enum | Output only. The class of the findings. Values: `FINDING_CLASS_UNSPECIFIED`, `THREAT`, `VULNERABILITY`, `MISCONFIGURATION`, `OBSERVATION`, `SCC_ERROR`, `POSTURE_VIOLATION`, `TOXIC_COMBINATION`, `SENSITIVE_DATA_RISK`, `CHOKEPOINT`. |
| `findingCount` | string (int64) | Output only. The total number of active findings in the category. |
| `name` | string | Identifier. The resource name of the finding summary. |
| `organizationPolicyFindingCount` | string (int64) | Output only. The number of active organization policy findings in the category. |
| `relatedFrameworks` | array<string> | Optional. The display names of the compliance frameworks that the findings are related to. |
| `resourceFindingCount` | string (int64) | Output only. The number of active resource findings in the category. |
| `severity` | string enum | Output only. The severity of the findings. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |
| `updateTime` | string (google-datetime) | Output only. The time when the findings in the category were last updated. |

### `GoogleCloudAssuredworkloadsV1beta1DbFrameworkComplianceSummary`

- A summary of the compliance status of a framework that's deployed in a Data Boundary scope.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `controlAssessmentDetails` | GoogleCloudAssuredworkloadsV1beta1ControlAssessmentDetails | The number of passing, failing, and not assessed controls in the framework. |
| `controlsPassingTrend` | GoogleCloudAssuredworkloadsV1beta1Trend | Output only. The trend of passing controls over the trend duration. This field is only populated when using `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_FULL`. |
| `findingCount` | string (int64) | Output only. The number of findings that were generated against the framework. This field is only populated when using `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_FULL`. |
| `framework` | string | The resource name of the compliance framework. |
| `frameworkCategories` | array<string> | The categories of the framework. Values: `FRAMEWORK_CATEGORY_UNSPECIFIED`, `INDUSTRY_DEFINED_STANDARD`, `ASSURED_WORKLOADS`, `DATA_SECURITY`, `GOOGLE_BEST_PRACTICES`, `CUSTOM_FRAMEWORK`. |
| `frameworkDisplayName` | string | Optional. The display name of the framework. |
| `frameworkType` | string enum | The type of the framework. Values: `FRAMEWORK_TYPE_UNSPECIFIED`, `BUILT_IN`, `CUSTOM`. |
| `majorRevisionId` | string (int64) | The major revision ID of the framework. |
| `minorRevisionId` | string (int64) | The minor revision ID of the framework. |
| `name` | string | Identifier. The resource name of the framework compliance summary. |
| `supportedCloudProviders` | array<string> | The cloud providers that are supported by the framework. Values: `CLOUD_PROVIDER_UNSPECIFIED`, `AWS`, `AZURE`, `GCP`. |
| `targetResourceDetails` | array<GoogleCloudAssuredworkloadsV1beta1TargetResourceDetails> | The details of the target resources (organizations, folders, or projects) that the framework is deployed on. |

### `GoogleCloudAssuredworkloadsV1beta1EnableComplianceUpdatesResponse`

- Response for EnableComplianceUpdates endpoint.
- Version: v1beta1

### `GoogleCloudAssuredworkloadsV1beta1EnableResourceMonitoringResponse`

- Response for EnableResourceMonitoring endpoint.
- Version: v1beta1

### `GoogleCloudAssuredworkloadsV1beta1FetchDbFrameworkComplianceReportResponse`

- The response message for FetchDbFrameworkComplianceReport.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `controlAssessmentDetails` | GoogleCloudAssuredworkloadsV1beta1ControlAssessmentDetails | The number of passing, failing, and not assessed controls in the framework. |
| `framework` | string | The resource name of the compliance framework. For example, `organizations/{organization}/locations/{location}/frameworks/{framework_id}`. |
| `frameworkCategories` | array<string> | The categories of the framework. Values: `FRAMEWORK_CATEGORY_UNSPECIFIED`, `INDUSTRY_DEFINED_STANDARD`, `ASSURED_WORKLOADS`, `DATA_SECURITY`, `GOOGLE_BEST_PRACTICES`, `CUSTOM_FRAMEWORK`. |
| `frameworkDescription` | string | The description of the framework. |
| `frameworkDisplayName` | string | Optional. The display name of the framework. |
| `frameworkType` | string enum | The type of the framework. Values: `FRAMEWORK_TYPE_UNSPECIFIED`, `BUILT_IN`, `CUSTOM`. |
| `majorRevisionId` | string (int64) | The latest major revision ID of the framework. |
| `minorRevisionId` | string (int64) | The latest minor revision ID of the latest major revision of the framework. |
| `name` | string | The resource name of the framework compliance report. |
| `supportedCloudProviders` | array<string> | The cloud providers that are supported by the framework. Values: `CLOUD_PROVIDER_UNSPECIFIED`, `AWS`, `AZURE`, `GCP`. |
| `targetResourceDetails` | array<GoogleCloudAssuredworkloadsV1beta1TargetResourceDetails> | The details of the target resources (organizations, folders, or projects) that the framework is deployed on. |
| `updateTime` | string (google-datetime) | Output only. The time when the report was last updated. |

### `GoogleCloudAssuredworkloadsV1beta1ListDbControlComplianceSummariesResponse`

- The response message for ListDbControlComplianceSummaries.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `dbControlComplianceSummaries` | array<GoogleCloudAssuredworkloadsV1beta1DbControlComplianceSummary> | The list of control compliance summaries. |
| `nextPageToken` | string | Output only. A token that can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. |

### `GoogleCloudAssuredworkloadsV1beta1ListDbFindingSummariesResponse`

- The response message for ListDbFindingSummaries.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `dbFindingSummaries` | array<GoogleCloudAssuredworkloadsV1beta1DbFindingSummary> | The list of finding summaries, one for each finding category. |
| `nextPageToken` | string | Output only. A token that can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. |

### `GoogleCloudAssuredworkloadsV1beta1ListDbFrameworkComplianceSummariesResponse`

- The response message for ListDbFrameworkComplianceSummaries.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `dbFrameworkComplianceSummaries` | array<GoogleCloudAssuredworkloadsV1beta1DbFrameworkComplianceSummary> | The list of framework compliance summaries. |
| `nextPageToken` | string | Output only. A token that can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. |

### `GoogleCloudAssuredworkloadsV1beta1ListViolationsResponse`

- Response message for the `ListViolations` method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. |
| `totalSize` | integer (int32) | The total number of violations that match the request, across all pages. This field might not be populated for all requests; when it's not populated, its value is `0`. |
| `violations` | array<GoogleCloudAssuredworkloadsV1beta1Violation> | The list of violations. |

### `GoogleCloudAssuredworkloadsV1beta1ListWorkloadUpdatesResponse`

- Response of listing the compliance updates per workload with pagination.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next page token. Return empty if reached the last page. |
| `workloadUpdates` | array<GoogleCloudAssuredworkloadsV1beta1WorkloadUpdate> | The list of workload updates for a given workload. |

### `GoogleCloudAssuredworkloadsV1beta1ListWorkloadsResponse`

- Response of ListWorkloads endpoint.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next page token. Return empty if reached the last page. |
| `workloads` | array<GoogleCloudAssuredworkloadsV1beta1Workload> | List of Workloads under a given parent. |

### `GoogleCloudAssuredworkloadsV1beta1ManualCloudControlAssessmentDetails`

- The details for a manual cloud control assessment.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `manualCloudControlGuide` | array<string> | The guide for assessing a cloud control manually. |

### `GoogleCloudAssuredworkloadsV1beta1MoveAnalysisGroup`

- Represents a logical group of checks performed for an asset. If successful, the group contains the analysis result, otherwise it contains an error with the failure reason.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `analysisResult` | GoogleCloudAssuredworkloadsV1beta1MoveAnalysisResult | Result of a successful analysis. |
| `displayName` | string | Name of the analysis group. |
| `error` | GoogleRpcStatus | Error details for a failed analysis. |

### `GoogleCloudAssuredworkloadsV1beta1MoveAnalysisResult`

- Represents the successful move analysis results for a group.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `blockers` | array<GoogleCloudAssuredworkloadsV1beta1MoveImpact> | List of blockers. If not resolved, these will result in compliance violations in the target. |
| `warnings` | array<GoogleCloudAssuredworkloadsV1beta1MoveImpact> | List of warnings. These are risks that may or may not result in compliance violations. |

### `GoogleCloudAssuredworkloadsV1beta1MoveImpact`

- Represents the impact of moving the asset to the target.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `detail` | string | Explanation of the impact. |

### `GoogleCloudAssuredworkloadsV1beta1OrgPolicy`

- This assured workload service object is used to represent the org policy attached to a resource. It servces the same purpose as the orgpolicy.v2.Policy object but with functionality that is limited to what is supported by Assured Workloads(e.g. only one rule under one OrgPolicy object, no conditions, etc).
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `constraint` | string | The constraint name of the OrgPolicy. e.g. "constraints/gcp.resourceLocations". |
| `inherit` | boolean | If `inherit` is true, policy rules of the lowest ancestor in the resource hierarchy chain are inherited. If it is false, policy rules are not inherited. |
| `reset` | boolean | Ignores policies set above this resource and restores to the `constraint_default` value. `reset` can only be true when `rules` is empty and `inherit` is false. |
| `resource` | string | Resource that the OrgPolicy attaches to. Format: folders/123" projects/123". |
| `rule` | GoogleCloudAssuredworkloadsV1beta1OrgPolicyPolicyRule | The rule of the OrgPolicy. |

### `GoogleCloudAssuredworkloadsV1beta1OrgPolicyPolicyRule`

- A rule used to express this policy.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `allowAll` | boolean | ListPolicy only when all values are allowed. |
| `denyAll` | boolean | ListPolicy only when all values are denied. |
| `enforce` | boolean | BooleanPolicy only. |
| `values` | GoogleCloudAssuredworkloadsV1beta1OrgPolicyPolicyRuleStringValues | ListPolicy only when custom values are specified. |

### `GoogleCloudAssuredworkloadsV1beta1OrgPolicyPolicyRuleStringValues`

- The values allowed for a ListPolicy.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `allowedValues` | array<string> | List of values allowed at this resource. |
| `deniedValues` | array<string> | List of values denied at this resource. |

### `GoogleCloudAssuredworkloadsV1beta1OrgPolicyUpdate`

- Represents an update for an org policy control applied on an Assured Workload resource. The inherited org policy is not considered.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `appliedPolicy` | GoogleCloudAssuredworkloadsV1beta1OrgPolicy | The org policy currently applied on the assured workload resource. |
| `suggestedPolicy` | GoogleCloudAssuredworkloadsV1beta1OrgPolicy | The suggested org policy that replaces the applied policy. |

### `GoogleCloudAssuredworkloadsV1beta1RestrictAllowedResourcesRequest`

- Request for restricting list of available resources in Workload environment.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `restrictionType` | string enum | Required. The type of restriction for using gcp products in the Workload environment. Values: `RESTRICTION_TYPE_UNSPECIFIED`, `ALLOW_ALL_GCP_RESOURCES`, `ALLOW_COMPLIANT_RESOURCES`, `APPEND_COMPLIANT_RESOURCES`. |

### `GoogleCloudAssuredworkloadsV1beta1RestrictAllowedResourcesResponse`

- Response for restricting the list of allowed resources.
- Version: v1beta1

### `GoogleCloudAssuredworkloadsV1beta1Rule`

- A rule in the cloud control.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `celExpression` | GoogleCloudAssuredworkloadsV1beta1CELExpression | The rule's logic expression in Common Expression Language (CEL). |
| `description` | string | Optional. The rule description. The maximum length is 2000 characters. |
| `ruleActionTypes` | array<string> | Required. The functionality that's enabled by the rule. Values: `RULE_ACTION_TYPE_UNSPECIFIED`, `RULE_ACTION_TYPE_PREVENTIVE`, `RULE_ACTION_TYPE_DETECTIVE`, `RULE_ACTION_TYPE_AUDIT`. |

### `GoogleCloudAssuredworkloadsV1beta1SimilarControls`

- The similar controls.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `controlId` | string | The ID of the control. |
| `framework` | string | The name of the framework. |

### `GoogleCloudAssuredworkloadsV1beta1StringList`

- A list of strings for the parameter value.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `values` | array<string> | Required. The strings in the list. |

### `GoogleCloudAssuredworkloadsV1beta1TargetResourceDetails`

- The details for a target resource.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The create time of the target resource. |
| `frameworkDeployment` | string | The framework deployment name for the target resource. For example, `organizations/{organization_id}/locations/{location}/frameworkDeployments/{framework_deployment_id}` |
| `majorRevisionId` | string (int64) | The major revision ID of the framework for the target resource. |
| `minorRevisionId` | string (int64) | The minor revision ID of the framework for the target resource. |
| `targetResource` | string | The target resource. For example, `organizations/1234567890`, `projects/1234567890`, or `folders/1234567890`. |
| `targetResourceDisplayName` | string | The display name of the target resource. For example, `google.com`, `staging-project`, or `development-folder`. |
| `updateTime` | string (google-datetime) | The update time of the target resource. |

### `GoogleCloudAssuredworkloadsV1beta1Trend`

- The trend of a compliance metric.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | Output only. The duration for the trend. |
| `valuePercent` | number (double) | Output only. The trend value as a percentage. The value can be positive or negative. |

### `GoogleCloudAssuredworkloadsV1beta1UpdateDetails`

- The details of the update.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `orgPolicyUpdate` | GoogleCloudAssuredworkloadsV1beta1OrgPolicyUpdate | Update to one org policy, e.g. gcp.resourceLocation. |

### `GoogleCloudAssuredworkloadsV1beta1Violation`

- A compliance violation that's detected by Assured Workloads monitoring. A violation is created when an organization policy or a resource in a workload (or a Data Boundary scope) changes in a way that doesn't comply with the controls of the applicable compliance regime or framework.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `acknowledged` | boolean | Whether the violation has been acknowledged. |
| `acknowledgementTime` | string (google-datetime) | Optional. The time when the violation was first acknowledged. To find the most recent time that the violation was acknowledged, check `exception_contexts`. This field is absent when `acknowledged` is `false`. |
| `affectedFrameworks` | array<string> | Output only. The IDs of the compliance frameworks that are affected by this violation. For example, `builtin-fedramp-high`. This field is only populated when using `VIOLATION_VIEW_DATA_BOUNDARY`. |
| `associatedOrgPolicyViolationId` | string | Optional. Output only. For resource violations, the ID of the organization policy violation that caused this resource violation. This field is empty for organization policy violations. |
| `auditLogLink` | string | Output only. Immutable. A link to the Cloud Audit Logs entries for the violated resource. Format: `https://console.cloud.google.com/logs/query;query={logName}{protoPayload.resourceName}{timeRange}{folder}` |
| `beginTime` | string (google-datetime) | Output only. The time of the event that triggered the violation. |
| `category` | string | Output only. The category that the violation is mapped to. For example, `Location`, `Service Usage`, `Access`, or `Encryption`. |
| `childResourceViolationCount` | integer (int32) | Optional. Output only. For organization policy violations, the number of resource violations that are associated with this violation. This field is `0` for resource violations. |
| `description` | string | Output only. A description of the violation. For example, `OrgPolicy gcp.resourceLocations has non compliant value.` |
| `exceptionAuditLogLink` | string | Output only. Immutable. A link to the Cloud Audit Logs entries that contain the business justification that was provided when the violation was acknowledged. Format: `https://console.cloud.google.com/logs/query;query={logName}{protoPayload.resourceName}{protoPayload.methodName}{timeRange}{organization}` |
| `exceptionContexts` | array<GoogleCloudAssuredworkloadsV1beta1ViolationExceptionContext> | Output only. The details of all of the acknowledgements (exceptions) for the violation. |
| `name` | string | Output only. Immutable. The resource name of the violation. Format: `organizations/{organization}/locations/{location}/workloads/{workload_id}/violations/{violations_id}` |
| `nonCompliantOrgPolicy` | string | Output only. Immutable. The name of the organization policy that was modified with a non-compliant change and resulted in this violation. Formats: \* `projects/{project_number}/policies/{constraint_name}` \* `folders/{folder_id}/policies/{constraint_name}` \* `organizations/{organization_id}/policies/{constraint_name}` |
| `orgPolicyConstraint` | string | Output only. Immutable. Deprecated: This field is deprecated and might be removed in a future version of the API. Use `non_compliant_org_policy` instead, which contains the full resource name of the organization policy, including the constraint name. The organization policy constraint that was changed in a non-compliant way, which resulted in this violation. |
| `parentProjectNumber` | string | Optional. Output only. For resource violations, the number of the project that contains the non-compliant resource. This field is empty for organization policy violations. |
| `remediation` | GoogleCloudAssuredworkloadsV1beta1ViolationRemediation | Output only. The remediation guidance for the violation. |
| `remediationMarkdown` | string | Output only. The remediation instructions for the violation, in Markdown format. This field is only populated by `GetViolation` when using `VIOLATION_VIEW_DATA_BOUNDARY`. When this field isn't populated, see `remediation` instead. |
| `resolveTime` | string (google-datetime) | Output only. The time of the event that resolved the violation. This field is empty if the violation is unresolved. |
| `resourceName` | string | Optional. Output only. For resource violations, the full resource name of the non-compliant resource. For example, `//storage.googleapis.com/myprojectxyz-testbucket`. This field is empty for organization policy violations. |
| `resourceType` | string | Optional. Output only. For resource violations, the type of the non-compliant resource. For example, `compute.googleapis.com/Disk`. This field is empty for organization policy violations. |
| `state` | string enum | Output only. The state of the violation. Values: `STATE_UNSPECIFIED`, `RESOLVED`, `UNRESOLVED`, `EXCEPTION`. |
| `updateTime` | string (google-datetime) | Output only. The time when the violation record was last updated. |
| `violationType` | string enum | Output only. The type of the violation. Values: `VIOLATION_TYPE_UNSPECIFIED`, `ORG_POLICY`, `RESOURCE`. |

### `GoogleCloudAssuredworkloadsV1beta1ViolationExceptionContext`

- Details about an acknowledgement (exception) of a violation.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `acknowledgementTime` | string (google-datetime) | The time when the violation was acknowledged. |
| `comment` | string | The business justification that was provided when the violation was acknowledged. |
| `userName` | string | The name of the user (or service account) who acknowledged the violation. |

### `GoogleCloudAssuredworkloadsV1beta1ViolationRemediation`

- Remediation guidance to resolve a compliance violation.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `compliantValues` | array<string> | The values that can resolve the violation. For example, for list organization policy violations, this field contains the list of allowed or denied values. |
| `instructions` | GoogleCloudAssuredworkloadsV1beta1ViolationRemediationInstructions | Required. The instructions to resolve the violation. |
| `remediationType` | string enum | Output only. The remediation type, which is based on the type of organization policy values that were violated. Values: `REMEDIATION_TYPE_UNSPECIFIED`, `REMEDIATION_BOOLEAN_ORG_POLICY_VIOLATION`, `REMEDIATION_LIST_ALLOWED_VALUES_ORG_POLICY_VIOLATION`, `REMEDIATION_LIST_DENIED_VALUES_ORG_POLICY_VIOLATION`, `REMEDIATION_RESTRICT_CMEK_CRYPTO_KEY_PROJECTS_ORG_POLICY_VIOLATION`, `REMEDIATION_RESOURCE_VIOLATION`, `REMEDIATION_RESOURCE_VIOLATION_NON_CMEK_SERVICES`. |

### `GoogleCloudAssuredworkloadsV1beta1ViolationRemediationInstructions`

- Instructions to remediate a violation.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `consoleInstructions` | GoogleCloudAssuredworkloadsV1beta1ViolationRemediationInstructionsConsole | Instructions to resolve the violation by using the Google Cloud console. |
| `gcloudInstructions` | GoogleCloudAssuredworkloadsV1beta1ViolationRemediationInstructionsGcloud | Instructions to resolve the violation by using the gcloud CLI. |

### `GoogleCloudAssuredworkloadsV1beta1ViolationRemediationInstructionsConsole`

- Instructions to remediate a violation by using the Google Cloud console.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `additionalLinks` | array<string> | Additional URLs with more information about the steps. |
| `consoleUris` | array<string> | Links to the Google Cloud console pages where the violation can be resolved. |
| `steps` | array<string> | The steps to resolve the violation by using the Google Cloud console. |

### `GoogleCloudAssuredworkloadsV1beta1ViolationRemediationInstructionsGcloud`

- Instructions to remediate a violation by using the Google Cloud CLI.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `additionalLinks` | array<string> | Additional URLs with more information about the steps. |
| `gcloudCommands` | array<string> | The gcloud CLI commands that resolve the violation. |
| `steps` | array<string> | The steps to resolve the violation by using the gcloud CLI. |

### `GoogleCloudAssuredworkloadsV1beta1Workload`

- A Workload object for managing highly regulated workloads of cloud customers.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `availableUpdates` | integer (int32) | Output only. The number of updates available for the workload. |
| `billingAccount` | string | Optional. The billing account used for the resources which are direct children of workload. This billing account is initially associated with the resources created as part of Workload creation. After the initial creation of these resources, the customer can change the assigned billing account. The resource name has the form `billingAccounts/{billing_account_id}`. For example, `billingAccounts/012345-567890-ABCDEF`. |
| `cjisSettings` | GoogleCloudAssuredworkloadsV1beta1WorkloadCJISSettings | Input only. Immutable. Settings specific to resources needed for CJIS. |
| `complianceRegime` | string enum | Required. Immutable. Compliance Regime associated with this workload. Values: `COMPLIANCE_REGIME_UNSPECIFIED`, `ASSURED_WORKLOADS_FOR_PARTNERS`, `AUSTRALIA_DATA_BOUNDARY_AND_SUPPORT`, `CANADA_DATA_BOUNDARY_AND_SUPPORT`, `DATA_BOUNDARY_FOR_CANADA_CONTROLLED_GOODS`, `DATA_BOUNDARY_FOR_CANADA_PROTECTED_B`, `DATA_BOUNDARY_FOR_CJIS`, `DATA_BOUNDARY_FOR_FEDRAMP_HIGH`, `DATA_BOUNDARY_FOR_FEDRAMP_MODERATE`, `DATA_BOUNDARY_FOR_IL2`, `DATA_BOUNDARY_FOR_IL4`, `DATA_BOUNDARY_FOR_IL5`, `DATA_BOUNDARY_FOR_IRS_PUBLICATION_1075`, `DATA_BOUNDARY_FOR_ITAR`, `EU_DATA_BOUNDARY_AND_SUPPORT`, `ISRAEL_DATA_BOUNDARY_AND_SUPPORT`, `JAPAN_DATA_BOUNDARY`, `SWITZERLAND_DATA_BOUNDARY_WITH_ACCESS_JUSTIFICATIONS`, `KSA_DATA_BOUNDARY_WITH_ACCESS_JUSTIFICATIONS`, `REGIONAL_DATA_BOUNDARY`, `US_DATA_BOUNDARY_AND_SUPPORT`, `US_DATA_BOUNDARY_FOR_HEALTHCARE_AND_LIFE_SCIENCES`, `US_DATA_BOUNDARY_FOR_HEALTHCARE_AND_LIFE_SCIENCES_WITH_SUPPORT`, `AU_REGIONS_AND_US_SUPPORT`, `CA_PROTECTED_B`, `CA_REGIONS_AND_SUPPORT`, `CANADA_CONTROLLED_GOODS`, `CJIS`, `EU_REGIONS_AND_SUPPORT`, `FEDRAMP_HIGH`, `FEDRAMP_MODERATE`, `HEALTHCARE_AND_LIFE_SCIENCES_CONTROLS`, `HEALTHCARE_AND_LIFE_SCIENCES_CONTROLS_US_SUPPORT`, `HIPAA`, `HITRUST`, `IL2`, `IL4`, `IL5`, `IRS_1075`, `ISR_REGIONS`, `ISR_REGIONS_AND_SUPPORT`, `ITAR`, `JP_REGIONS_AND_SUPPORT`, `KSA_REGIONS_AND_SUPPORT_WITH_SOVEREIGNTY_CONTROLS`, `REGIONAL_CONTROLS`, `US_REGIONAL_ACCESS`. |
| `complianceStatus` | GoogleCloudAssuredworkloadsV1beta1WorkloadComplianceStatus | Output only. Count of active Violations in the Workload. |
| `complianceUpdatesEnabled` | boolean | Output only. Indicates whether the compliance updates feature is enabled for a workload. The compliance updates feature can be enabled via the EnableComplianceUpdates endpoint. |
| `compliantButDisallowedServices` | array<string> | Output only. Urls for services which are compliant for this Assured Workload, but which are currently disallowed by the ResourceUsageRestriction org policy. Invoke RestrictAllowedResources endpoint to allow your project developers to use these services in their environment. |
| `createTime` | string (google-datetime) | Output only. Immutable. The Workload creation timestamp. |
| `displayName` | string | Required. The user-assigned display name of the Workload. When present it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, and spaces. Example: My Workload |
| `ekmProvisioningResponse` | GoogleCloudAssuredworkloadsV1beta1WorkloadEkmProvisioningResponse | Output only. Represents the Ekm Provisioning State of the given workload. |
| `enableSovereignControls` | boolean | Optional. Indicates the sovereignty status of the given workload. Currently meant to be used by Europe/Canada customers. |
| `etag` | string | Optional. ETag of the workload, it is calculated on the basis of the Workload contents. It will be used in Update & Delete operations. |
| `fedrampHighSettings` | GoogleCloudAssuredworkloadsV1beta1WorkloadFedrampHighSettings | Input only. Immutable. Settings specific to resources needed for FedRAMP High. |
| `fedrampModerateSettings` | GoogleCloudAssuredworkloadsV1beta1WorkloadFedrampModerateSettings | Input only. Immutable. Settings specific to resources needed for FedRAMP Moderate. |
| `il4Settings` | GoogleCloudAssuredworkloadsV1beta1WorkloadIL4Settings | Input only. Immutable. Settings specific to resources needed for IL4. |
| `kajEnrollmentState` | string enum | Output only. Represents the KAJ enrollment state of the given workload. Values: `KAJ_ENROLLMENT_STATE_UNSPECIFIED`, `KAJ_ENROLLMENT_STATE_PENDING`, `KAJ_ENROLLMENT_STATE_COMPLETE`. |
| `kmsSettings` | GoogleCloudAssuredworkloadsV1beta1WorkloadKMSSettings | Input only. Settings used to create a CMEK crypto key. When set, a project with a KMS CMEK key is provisioned. This field is deprecated as of Feb 28, 2022. In order to create a Keyring, callers should specify, ENCRYPTION_KEYS_PROJECT or KEYRING in ResourceSettings.resource_type field. |
| `labels` | object | Optional. Labels applied to the workload. |
| `name` | string | Optional. The resource name of the workload. Format: organizations/{organization}/locations/{location}/workloads/{workload} Read-only. |
| `partner` | string enum | Optional. Partner regime associated with this workload. Values: `PARTNER_UNSPECIFIED`, `LOCAL_CONTROLS_BY_S3NS`, `SOVEREIGN_CONTROLS_BY_T_SYSTEMS`, `SOVEREIGN_CONTROLS_BY_SIA_MINSAIT`, `SOVEREIGN_CONTROLS_BY_PSN`, `SOVEREIGN_CONTROLS_BY_CNTXT`, `SOVEREIGN_CONTROLS_BY_CNTXT_NO_EKM`, `SPAIN_DATA_BOUNDARY_BY_TELEFONICA`. |
| `partnerPermissions` | GoogleCloudAssuredworkloadsV1beta1WorkloadPartnerPermissions | Optional. Permissions granted to the AW Partner SA account for the customer workload |
| `partnerServicesBillingAccount` | string | Optional. Billing account necessary for purchasing services from Sovereign Partners. This field is required for creating SIA/PSN/CNTXT/Telefonica partner workloads. The caller should have 'billing.resourceAssociations.create' IAM permission on this billing-account. The format of this string is billingAccounts/AAAAAA-BBBBBB-CCCCCC |
| `provisionedResourcesParent` | string | Input only. The parent resource for the resources managed by this Assured Workload. May be either empty or a folder resource which is a child of the Workload parent. If not specified all resources are created under the parent organization. Format: folders/{folder_id} |
| `resourceMonitoringEnabled` | boolean | Output only. Indicates whether resource monitoring is enabled for workload or not. It is true when Resource feed is subscribed to AWM topic and AWM Service Agent Role is binded to AW Service Account for resource Assured workload. |
| `resourceSettings` | array<GoogleCloudAssuredworkloadsV1beta1WorkloadResourceSettings> | Input only. Resource properties that are used to customize workload resources. These properties (such as custom project id) will be used to create workload resources if possible. This field is optional. |
| `resources` | array<GoogleCloudAssuredworkloadsV1beta1WorkloadResourceInfo> | Output only. The resources associated with this workload. These resources will be created when creating the workload. If any of the projects already exist, the workload creation will fail. Always read only. |
| `saaEnrollmentResponse` | GoogleCloudAssuredworkloadsV1beta1WorkloadSaaEnrollmentResponse | Output only. Represents the SAA enrollment response of the given workload. SAA enrollment response is queried during GetWorkload call. In failure cases, user friendly error message is shown in SAA details page. |
| `violationNotificationsEnabled` | boolean | Optional. Indicates whether the e-mail notification for a violation is enabled for a workload. This value will be by default True, and if not present will be considered as true. This should only be updated via updateWorkload call. Any Changes to this field during the createWorkload call will not be honored. This will always be true while creating the workload. |
| `workloadOptions` | GoogleCloudAssuredworkloadsV1beta1WorkloadWorkloadOptions | Optional. Options to be set for the given created workload. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadCJISSettings`

- Settings specific to resources needed for CJIS.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `kmsSettings` | GoogleCloudAssuredworkloadsV1beta1WorkloadKMSSettings | Input only. Immutable. Settings used to create a CMEK crypto key. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadComplianceStatus`

- Represents the Compliance Status of this workload
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `acknowledgedResourceViolationCount` | integer (int32) | Number of current resource violations which are not acknowledged. |
| `acknowledgedViolationCount` | integer (int32) | Number of current orgPolicy violations which are acknowledged. |
| `activeResourceViolationCount` | integer (int32) | Number of current resource violations which are acknowledged. |
| `activeViolationCount` | integer (int32) | Number of current orgPolicy violations which are not acknowledged. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadEkmProvisioningResponse`

- External key management systems(EKM) Provisioning response
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `ekmProvisioningErrorDomain` | string enum | Indicates Ekm provisioning error if any. Values: `EKM_PROVISIONING_ERROR_DOMAIN_UNSPECIFIED`, `UNSPECIFIED_ERROR`, `GOOGLE_SERVER_ERROR`, `EXTERNAL_USER_ERROR`, `EXTERNAL_PARTNER_ERROR`, `TIMEOUT_ERROR`. |
| `ekmProvisioningErrorMapping` | string enum | Detailed error message if Ekm provisioning fails Values: `EKM_PROVISIONING_ERROR_MAPPING_UNSPECIFIED`, `INVALID_SERVICE_ACCOUNT`, `MISSING_METRICS_SCOPE_ADMIN_PERMISSION`, `MISSING_EKM_CONNECTION_ADMIN_PERMISSION`. |
| `ekmProvisioningState` | string enum | Output only. Indicates Ekm enrollment Provisioning of a given workload. Values: `EKM_PROVISIONING_STATE_UNSPECIFIED`, `EKM_PROVISIONING_STATE_PENDING`, `EKM_PROVISIONING_STATE_FAILED`, `EKM_PROVISIONING_STATE_COMPLETED`. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadFedrampHighSettings`

- Settings specific to resources needed for FedRAMP High.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `kmsSettings` | GoogleCloudAssuredworkloadsV1beta1WorkloadKMSSettings | Input only. Immutable. Settings used to create a CMEK crypto key. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadFedrampModerateSettings`

- Settings specific to resources needed for FedRAMP Moderate.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `kmsSettings` | GoogleCloudAssuredworkloadsV1beta1WorkloadKMSSettings | Input only. Immutable. Settings used to create a CMEK crypto key. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadIL4Settings`

- Settings specific to resources needed for IL4.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `kmsSettings` | GoogleCloudAssuredworkloadsV1beta1WorkloadKMSSettings | Input only. Immutable. Settings used to create a CMEK crypto key. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadKMSSettings`

- Settings specific to the Key Management Service.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextRotationTime` | string (google-datetime) | Required. Input only. Immutable. The time at which the Key Management Service will automatically create a new version of the crypto key and mark it as the primary. |
| `rotationPeriod` | string (google-duration) | Required. Input only. Immutable. \[next_rotation_time\] will be advanced by this period when the Key Management Service automatically rotates a key. Must be at least 24 hours and at most 876,000 hours. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadPartnerPermissions`

- Permissions granted to the AW Partner SA account for the customer workload
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `accessTransparencyLogsSupportCaseViewer` | boolean | Optional. Allow partner to view support case details for an AXT log |
| `assuredWorkloadsMonitoring` | boolean | Optional. Allow partner to view violation alerts. |
| `dataLogsViewer` | boolean | Optional. Allow the partner to view inspectability logs and monitoring violations. |
| `serviceAccessApprover` | boolean | Optional. Allow partner to view access approval logs. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadResourceInfo`

- Represent the resources that are children of this Workload.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `resourceId` | string (int64) | Output only. Resource identifier. For a project this represents project_number. |
| `resourceType` | string enum | Indicates the type of resource. Values: `RESOURCE_TYPE_UNSPECIFIED`, `CONSUMER_PROJECT`, `CONSUMER_FOLDER`, `ENCRYPTION_KEYS_PROJECT`, `KEYRING`. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadResourceSettings`

- Represent the custom settings for the resources to be created.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | User-assigned resource display name. If not empty it will be used to create a resource with the specified name. |
| `resourceId` | string | Resource identifier. For a project this represents project_id. If the project is already taken, the workload creation will fail. For KeyRing, this represents the keyring_id. For a folder, don't set this value as folder_id is assigned by Google. |
| `resourceType` | string enum | Indicates the type of resource. This field should be specified to correspond the id to the right project type (CONSUMER_PROJECT or ENCRYPTION_KEYS_PROJECT) Values: `RESOURCE_TYPE_UNSPECIFIED`, `CONSUMER_PROJECT`, `CONSUMER_FOLDER`, `ENCRYPTION_KEYS_PROJECT`, `KEYRING`. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadSaaEnrollmentResponse`

- Signed Access Approvals (SAA) enrollment response.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `setupErrors` | array<string> | Indicates SAA enrollment setup error if any. Values: `SETUP_ERROR_UNSPECIFIED`, `ERROR_INVALID_BASE_SETUP`, `ERROR_MISSING_EXTERNAL_SIGNING_KEY`, `ERROR_NOT_ALL_SERVICES_ENROLLED`, `ERROR_SETUP_CHECK_FAILED`. |
| `setupStatus` | string enum | Output only. Indicates SAA enrollment status of a given workload. Values: `SETUP_STATE_UNSPECIFIED`, `STATUS_PENDING`, `STATUS_COMPLETE`. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadUpdate`

- A workload update is a change to the workload's compliance configuration.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The time the update was created. |
| `details` | GoogleCloudAssuredworkloadsV1beta1UpdateDetails | The details of the update. |
| `name` | string | Output only. Immutable. Identifier. Resource name of the WorkloadUpdate. Format: organizations/{organization}/locations/{location}/workloads/{workload}/updates/{update} |
| `state` | string enum | Output only. The state of the update. Values: `STATE_UNSPECIFIED`, `AVAILABLE`, `APPLIED`, `WITHDRAWN`. |
| `updateTime` | string (google-datetime) | The time the update was last updated. |

### `GoogleCloudAssuredworkloadsV1beta1WorkloadWorkloadOptions`

- Options to be set for the given created workload.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `kajEnrollmentType` | string enum | Optional. Specifies type of KAJ Enrollment if provided. Values: `KAJ_ENROLLMENT_TYPE_UNSPECIFIED`, `KEY_ACCESS_TRANSPARENCY_OFF`. |

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

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `GoogleRpcStatus`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### Shape of `GoogleCloudAssuredworkloadsV1AcknowledgeViolationRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "acknowledgeType": "string enum",
  "comment": "string",
  "nonCompliantOrgPolicy": "string",
  "view": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `assuredworkloads` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://assuredworkloads.googleapis.com/$discovery/rest?version=v1, https://assuredworkloads.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
