---
source: https://cloudasset.googleapis.com/$discovery/rest?version=v1
---

# Cloud Asset API message schemas (cloudasset) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudasset/`.

### `AccessSelector`

- Specifies roles and/or permissions to analyze, to determine both the identities possessing them and the resources they control. If multiple values are specified, results will include roles or permissions matching any of them. The total number of roles and permissions should be equal or less than 10.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | Optional. The permissions to appear in result. |
| `roles` | array<string> | Optional. The roles to appear in result. |

### `AnalyzeIamPolicyLongrunningMetadata`

- Represents the metadata of the longrunning operation for the AnalyzeIamPolicyLongrunning RPC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |

### `AnalyzeIamPolicyLongrunningRequest`

- A request message for AssetService.AnalyzeIamPolicyLongrunning.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysisQuery` | IamPolicyAnalysisQuery | Required. The request query. |
| `outputConfig` | IamPolicyAnalysisOutputConfig | Required. Output configuration indicating where the results will be output to. |
| `savedAnalysisQuery` | string | Optional. The name of a saved query, which must be in the format of: \* projects/project_number/savedQueries/saved_query_id \* folders/folder_number/savedQueries/saved_query_id \* organizations/organization_number/savedQueries/saved_query_id If both `analysis_query` and `saved_analysis_query` are provided, they will be merged together with the `saved_analysis_query` as base and the `analysis_query` as overrides. For more details of the merge behavior, refer to the MergeFrom (https://developers.google.com/protocol-buffers/docs/reference/cpp/google.protobuf.message#Message.MergeFrom.details) doc. Note that you cannot override primitive fields with default value, such as 0 or empty string, etc., because we use proto3, which doesn't support field presence yet. |

### `AnalyzeIamPolicyLongrunningResponse`

- A response message for AssetService.AnalyzeIamPolicyLongrunning.
- Version: v1

### `AnalyzeIamPolicyResponse`

- A response message for AssetService.AnalyzeIamPolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullyExplored` | boolean | Represents whether all entries in the main_analysis and service_account_impersonation_analysis have been fully explored to answer the query in the request. |
| `mainAnalysis` | IamPolicyAnalysis | The main analysis that matches the original request. |
| `serviceAccountImpersonationAnalysis` | array<IamPolicyAnalysis> | The service account impersonation analysis if IamPolicyAnalysisQuery.Options.analyze_service_account_impersonation is enabled. |

### `AnalyzeMoveResponse`

- The response message for resource move analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `moveAnalysis` | array<MoveAnalysis> | The list of analyses returned from performing the intended resource move analysis. The analysis is grouped by different Google Cloud services. |

### `AnalyzeOrgPoliciesResponse`

- The response message for AssetService.AnalyzeOrgPolicies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constraint` | AnalyzerOrgPolicyConstraint | The definition of the constraint in the request. |
| `nextPageToken` | string | The page token to fetch the next page for AnalyzeOrgPoliciesResponse.org_policy_results. |
| `orgPolicyResults` | array<OrgPolicyResult> | The organization policies under the AnalyzeOrgPoliciesRequest.scope with the AnalyzeOrgPoliciesRequest.constraint. |

### `AnalyzeOrgPolicyGovernedAssetsResponse`

- The response message for AssetService.AnalyzeOrgPolicyGovernedAssets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constraint` | AnalyzerOrgPolicyConstraint | The definition of the constraint in the request. |
| `governedAssets` | array<GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset> | The list of the analyzed governed assets. |
| `nextPageToken` | string | The page token to fetch the next page for AnalyzeOrgPolicyGovernedAssetsResponse.governed_assets. |

### `AnalyzeOrgPolicyGovernedContainersResponse`

- The response message for AssetService.AnalyzeOrgPolicyGovernedContainers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constraint` | AnalyzerOrgPolicyConstraint | The definition of the constraint in the request. |
| `governedContainers` | array<GoogleCloudAssetV1GovernedContainer> | The list of the analyzed governed containers. |
| `nextPageToken` | string | The page token to fetch the next page for AnalyzeOrgPolicyGovernedContainersResponse.governed_containers. |

### `AnalyzerOrgPolicy`

- This organization policy message is a modified version of the one defined in the Organization Policy system. This message contains several fields defined in the original organization policy with some new fields for analysis purpose.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appliedResource` | string | The \[full resource name\] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of an organization/folder/project resource where this organization policy applies to. For any user defined org policies, this field has the same value as the \[attached_resource\] field. Only for default policy, this field has the different value. |
| `attachedResource` | string | The \[full resource name\] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of an organization/folder/project resource where this organization policy is set. Notice that some type of constraints are defined with default policy. This field will be empty for them. |
| `inheritFromParent` | boolean | If `inherit_from_parent` is true, Rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the effective root for evaluation. |
| `reset` | boolean | Ignores policies set above this resource and restores the default behavior of the constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false. |
| `rules` | array<GoogleCloudAssetV1Rule> | List of rules for this organization policy. |

### `AnalyzerOrgPolicyConstraint`

- The organization policy constraint definition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customConstraint` | GoogleCloudAssetV1CustomConstraint | The definition of the custom constraint. |
| `googleDefinedConstraint` | GoogleCloudAssetV1Constraint | The definition of the canned constraint defined by Google. |

### `Asset`

- An asset in Google Cloud. An asset can be any resource in the Google Cloud resource hierarchy (https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), a resource outside the Google Cloud resource hierarchy (such as Google Kubernetes Engine clusters and objects), or a policy (e.g. IAM policy), or a relationship (e.g. an INSTANCE_TO_INSTANCEGROUP relationship). See Supported asset types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevel` | GoogleIdentityAccesscontextmanagerV1AccessLevel | Also refer to the access level user guide (https://cloud.google.com/access-context-manager/docs/overview#access-levels). |
| `accessPolicy` | GoogleIdentityAccesscontextmanagerV1AccessPolicy | Also refer to the access policy user guide (https://cloud.google.com/access-context-manager/docs/overview#access-policies). |
| `ancestors` | array<string> | The ancestry path of an asset in Google Cloud resource hierarchy (https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), represented as a list of relative resource names. An ancestry path starts with the closest ancestor in the hierarchy and ends at root. If the asset is a project, folder, or organization, the ancestry path starts from the asset itself. Example: `["projects/123456789", "folders/5432", "organizations/1234"]` |
| `assetExceptions` | array<AssetException> | The exceptions of a resource. |
| `assetType` | string | The type of the asset. Example: `compute.googleapis.com/Disk` See Supported asset types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information. |
| `iamPolicy` | Policy | A representation of the IAM policy set on a Google Cloud resource. There can be a maximum of one IAM policy set on any given resource. In addition, IAM policies inherit their granted access scope from any policies set on parent resources in the resource hierarchy. Therefore, the effectively policy is the union of both the policy set on this resource and each policy set on all of the resource's ancestry resource levels in the hierarchy. See this topic (https://cloud.google.com/iam/help/allow-policies/inheritance) for more information. |
| `name` | string | The full name of the asset. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1` See Resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. |
| `orgPolicy` | array<GoogleCloudOrgpolicyV1Policy> | A representation of an organization policy (https://cloud.google.com/resource-manager/docs/organization-policy/overview#organization_policy). There can be more than one organization policy with different constraints set on a given resource. |
| `osInventory` | Inventory | A representation of runtime OS Inventory information. See this topic (https://cloud.google.com/compute/docs/instances/os-inventory-management) for more information. |
| `relatedAsset` | RelatedAsset | One related asset of the current asset. |
| `relatedAssets` | RelatedAssets | DEPRECATED. This field only presents for the purpose of backward-compatibility. The server will never generate responses with this field. The related assets of the asset of one relationship type. One asset only represents one type of relationship. |
| `resource` | Resource | A representation of the resource. |
| `servicePerimeter` | GoogleIdentityAccesscontextmanagerV1ServicePerimeter | Also refer to the service perimeter user guide (https://cloud.google.com/vpc-service-controls/docs/overview). |
| `updateTime` | string (google-datetime) | The last update timestamp of an asset. update_time is updated when create/update/delete operation is performed. |

### `Asset` (v1beta1)

- An asset in Google Cloud. An asset can be any resource in the Google Cloud resource hierarchy (https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), a resource outside the Google Cloud resource hierarchy (such as Google Kubernetes Engine clusters and objects), or a policy (e.g. IAM policy). See Supported asset types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `accessLevel` | GoogleIdentityAccesscontextmanagerV1AccessLevel | Please also refer to the access level user guide (https://cloud.google.com/access-context-manager/docs/overview#access-levels). |
| `accessPolicy` | GoogleIdentityAccesscontextmanagerV1AccessPolicy | Please also refer to the access policy user guide (https://cloud.google.com/access-context-manager/docs/overview#access-policies). |
| `assetType` | string | The type of the asset. Example: `compute.googleapis.com/Disk` See Supported asset types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information. |
| `iamPolicy` | Policy | A representation of the IAM policy set on a Google Cloud resource. There can be a maximum of one IAM policy set on any given resource. In addition, IAM policies inherit their granted access scope from any policies set on parent resources in the resource hierarchy. Therefore, the effectively policy is the union of both the policy set on this resource and each policy set on all of the resource's ancestry resource levels in the hierarchy. See this topic (https://cloud.google.com/iam/help/allow-policies/inheritance) for more information. |
| `name` | string | The full name of the asset. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1` See Resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. |
| `orgPolicy` | array<GoogleCloudOrgpolicyV1Policy> | A representation of an organization policy (https://cloud.google.com/resource-manager/docs/organization-policy/overview#organization_policy). There can be more than one organization policy with different constraints set on a given resource. |
| `resource` | Resource | A representation of the resource. |
| `servicePerimeter` | GoogleIdentityAccesscontextmanagerV1ServicePerimeter | Please also refer to the service perimeter user guide (https://cloud.google.com/vpc-service-controls/docs/overview). |

### `Asset` (v1p5beta1)

- An asset in Google Cloud. An asset can be any resource in the Google Cloud resource hierarchy (https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), a resource outside the Google Cloud resource hierarchy (such as Google Kubernetes Engine clusters and objects), or a policy (e.g. IAM policy). See Supported asset types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information.
- Version: v1p5beta1

| Field | Type | Description |
|---|---|---|
| `accessLevel` | GoogleIdentityAccesscontextmanagerV1AccessLevel | Please also refer to the access level user guide (https://cloud.google.com/access-context-manager/docs/overview#access-levels). |
| `accessPolicy` | GoogleIdentityAccesscontextmanagerV1AccessPolicy | Please also refer to the access policy user guide (https://cloud.google.com/access-context-manager/docs/overview#access-policies). |
| `ancestors` | array<string> | The ancestry path of an asset in Google Cloud resource hierarchy (https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), represented as a list of relative resource names. An ancestry path starts with the closest ancestor in the hierarchy and ends at root. If the asset is a project, folder, or organization, the ancestry path starts from the asset itself. Example: `["projects/123456789", "folders/5432", "organizations/1234"]` |
| `assetType` | string | The type of the asset. Example: `compute.googleapis.com/Disk` See Supported asset types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information. |
| `iamPolicy` | Policy | A representation of the IAM policy set on a Google Cloud resource. There can be a maximum of one IAM policy set on any given resource. In addition, IAM policies inherit their granted access scope from any policies set on parent resources in the resource hierarchy. Therefore, the effectively policy is the union of both the policy set on this resource and each policy set on all of the resource's ancestry resource levels in the hierarchy. See this topic (https://cloud.google.com/iam/help/allow-policies/inheritance) for more information. |
| `name` | string | The full name of the asset. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1` See Resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. |
| `orgPolicy` | array<GoogleCloudOrgpolicyV1Policy> | A representation of an organization policy (https://cloud.google.com/resource-manager/docs/organization-policy/overview#organization_policy). There can be more than one organization policy with different constraints set on a given resource. |
| `resource` | Resource | A representation of the resource. |
| `servicePerimeter` | GoogleIdentityAccesscontextmanagerV1ServicePerimeter | Please also refer to the service perimeter user guide (https://cloud.google.com/vpc-service-controls/docs/overview). |

### `AssetEnrichment`

- The enhanced metadata information for a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceOwners` | ResourceOwners | The resource owners for a resource. Note that this field only contains the members that have "roles/owner" role in the resource's IAM Policy. |

### `AssetException`

- An exception of an asset.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | string | The details of the exception. |
| `exceptionType` | string enum | The type of exception. Values: `EXCEPTION_TYPE_UNSPECIFIED`, `TRUNCATION`. |

### `AttachedResource`

- Attached resource representation, which is defined by the corresponding service provider. It represents an attached resource's payload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetType` | string | The type of this attached resource. Example: `osconfig.googleapis.com/Inventory` You can find the supported attached asset types of each resource in this table: `https://cloud.google.com/asset-inventory/docs/supported-asset-types` |
| `versionedResources` | array<VersionedResource> | Versioned resource representations of this attached resource. This is repeated because there could be multiple versions of the attached resource representations during version migration. |

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

### `BatchGetAssetsHistoryResponse`

- Batch get assets history response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assets` | array<TemporalAsset> | A list of assets with valid time windows. |

### `BatchGetEffectiveIamPoliciesResponse`

- A response message for AssetService.BatchGetEffectiveIamPolicies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policyResults` | array<EffectiveIamPolicy> | The effective policies for a batch of resources. Note that the results order is the same as the order of BatchGetEffectiveIamPoliciesRequest.names. When a resource does not have any effective IAM policies, its corresponding policy_result will contain empty EffectiveIamPolicy.policies. |

### `BigQueryDestination`

- A BigQuery destination for exporting assets to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataset` | string | Required. The BigQuery dataset in format "projects/projectId/datasets/datasetId", to which the snapshot result should be exported. If this dataset does not exist, the export call returns an INVALID_ARGUMENT error. Setting the `contentType` for `exportAssets` determines the schema of the BigQuery table. Setting `separateTablesPerAssetType` to `TRUE` also influences the schema. |
| `force` | boolean | If the destination table already exists and this flag is `TRUE`, the table will be overwritten by the contents of assets snapshot. If the flag is `FALSE` or unset and the destination table already exists, the export call returns an INVALID_ARGUMENT error. |
| `partitionSpec` | PartitionSpec | \[partition_spec\] determines whether to export to partitioned table(s) and how to partition the data. If \[partition_spec\] is unset or \[partition_spec.partition_key\] is unset or `PARTITION_KEY_UNSPECIFIED`, the snapshot results will be exported to non-partitioned table(s). \[force\] will decide whether to overwrite existing table(s). If \[partition_spec\] is specified. First, the snapshot results will be written to partitioned table(s) with two additional timestamp columns, readTime and requestTime, one of which will be the partition key. Secondly, in the case when any destination table already exists, it will first try to update existing table's schema as necessary by appending additional columns. Then, if \[force\] is `TRUE`, the corresponding partition will be overwritten by the snapshot results (data in different partitions will remain intact); if \[force\] is unset or `FALSE`, it will append the data. An error will be returned if the schema update or data appension fails. |
| `separateTablesPerAssetType` | boolean | If this flag is `TRUE`, the snapshot results will be written to one or multiple tables, each of which contains results of one asset type. The \[force\] and \[partition_spec\] fields will apply to each of them. Field \[table\] will be concatenated with "\_" and the asset type names (see https://cloud.google.com/asset-inventory/docs/supported-asset-types for supported asset types) to construct per-asset-type table names, in which all non-alphanumeric characters like "." and "/" will be substituted by "\_". Example: if field \[table\] is "mytable" and snapshot results contain "storage.googleapis.com/Bucket" assets, the corresponding table name will be "mytable_storage_googleapis_com_Bucket". If any of these tables does not exist, a new table with the concatenated name will be created. When \[content_type\] in the ExportAssetsRequest is `RESOURCE`, the schema of each table will include RECORD-type columns mapped to the nested fields in the Asset.resource.data field of that asset type (up to the 15 nested level BigQuery supports (https://cloud.google.com/bigquery/docs/nested-repeated#limitations)). The fields in >15 nested levels will be stored in JSON format string as a child column of its parent RECORD column. If error occurs when exporting to any table, the whole export call will return an error but the export results that already succeed will persist. Example: if exporting to table_type_A succeeds when exporting to table_type_B fails during one export call, the results in table_type_A will persist and there will not be partial results persisting in a table. |
| `table` | string | Required. The BigQuery table to which the snapshot result should be written. If this table does not exist, a new table with the given name will be created. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `ConditionContext`

- The IAM conditions context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessTime` | string (google-datetime) | The hypothetical access timestamp to evaluate IAM conditions. Note that this value must not be earlier than the current time; otherwise, an INVALID_ARGUMENT error will be returned. |

### `ConditionEvaluation`

- The condition evaluation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `evaluationValue` | string enum | The evaluation result. Values: `EVALUATION_VALUE_UNSPECIFIED`, `TRUE`, `FALSE`, `CONDITIONAL`. |

### `CreateFeedRequest`

- Create asset feed request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `feed` | Feed | Required. The feed details. The field `name` must be empty and it will be generated in the format of: projects/project_number/feeds/feed_id folders/folder_number/feeds/feed_id organizations/organization_number/feeds/feed_id |
| `feedId` | string | Required. This is the client-assigned asset feed identifier and it needs to be unique under a specific parent project/folder/organization. |

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `EffectiveIamPolicy`

- The effective IAM policies on one resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullResourceName` | string | The \[full_resource_name\] (https://cloud.google.com/asset-inventory/docs/resource-name-format) for which the policies are computed. This is one of the BatchGetEffectiveIamPoliciesRequest.names the caller provides in the request. |
| `policies` | array<PolicyInfo> | The effective policies for the full_resource_name. These policies include the policy set on the full_resource_name and those set on its parents and ancestors up to the BatchGetEffectiveIamPoliciesRequest.scope. Note that these policies are not filtered according to the resource type of the full_resource_name. These policies are hierarchically ordered by PolicyInfo.attached_resource starting from full_resource_name itself to its parents and ancestors, such that policies\[i\]'s PolicyInfo.attached_resource is the child of policies\[i+1\]'s PolicyInfo.attached_resource, if policies\[i+1\] exists. |

### `EffectiveTagDetails`

- The effective tags and the ancestor resources from which they were inherited.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachedResource` | string | The full resource name (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the ancestor from which effective_tags are inherited, according to tag inheritance (https://cloud.google.com/resource-manager/docs/tags/tags-overview#inheritance). |
| `effectiveTags` | array<Tag> | The effective tags inherited from the attached_resource. Note that tags with the same key but different values may attach to resources at a different hierarchy levels. The lower hierarchy tag value will overwrite the higher hierarchy tag value of the same tag key. In this case, the tag value at the higher hierarchy level will be removed. For more information, see tag inheritance (https://cloud.google.com/resource-manager/docs/tags/tags-overview#inheritance). |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Explanation`

- Explanation about the IAM policy search result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `matchedPermissions` | object | The map from roles to their included permissions that match the permission query (i.e., a query containing `policy.role.permissions:`). Example: if query `policy.role.permissions:compute.disk.get` matches a policy binding that contains owner role, the matched_permissions will be `{"roles/owner": ["compute.disk.get"]}`. The roles can also be found in the returned `policy` bindings. Note that the map is populated only for requests with permission queries. |

### `ExportAssetsRequest`

- Export asset request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetTypes` | array<string> | A list of asset types to take a snapshot for. For example: "compute.googleapis.com/Disk". Regular expressions are also supported. For example: \* "compute.googleapis.com.\*" snapshots resources whose asset type starts with "compute.googleapis.com". \* ".\*Instance" snapshots resources whose asset type ends with "Instance". \* ".\*Instance.\*" snapshots resources whose asset type contains "Instance". See RE2 (https://github.com/google/re2/wiki/Syntax) for all supported regular expression syntax. If the regular expression does not match any supported asset type, an INVALID_ARGUMENT error will be returned. If specified, only matching assets will be returned, otherwise, it will snapshot all asset types. See Introduction to Cloud Asset Inventory (https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types. |
| `contentType` | string enum | Asset content type. If not specified, no content but the asset name will be returned. Values: `CONTENT_TYPE_UNSPECIFIED`, `RESOURCE`, `IAM_POLICY`, `ORG_POLICY`, `ACCESS_POLICY`, `OS_INVENTORY`, `RELATIONSHIP`. |
| `outputConfig` | OutputConfig | Required. Output configuration indicating where the results will be output to. |
| `readTime` | string (google-datetime) | Timestamp to take an asset snapshot. This can only be set to a timestamp between the current time and the current time minus 35 days (inclusive). If not specified, the current time will be used. Due to delays in resource data collection and indexing, there is a volatile window during which running the same query may get different results. |
| `relationshipTypes` | array<string> | A list of relationship types to export, for example: `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if content_type=RELATIONSHIP. \* If specified: it snapshots specified relationships. It returns an error if any of the \[relationship_types\] doesn't belong to the supported relationship types of the \[asset_types\] or if any of the \[asset_types\] doesn't belong to the source types of the \[relationship_types\]. \* Otherwise: it snapshots the supported relationships for all \[asset_types\] or returns an error if any of the \[asset_types\] has no relationship support. An unspecified asset types field means all supported asset_types. See Introduction to Cloud Asset Inventory (https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types and relationship types. |

### `ExportAssetsRequest` (v1beta1)

- Export asset request.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `assetTypes` | array<string> | A list of asset types of which to take a snapshot for. For example: "google.compute.Disk". If specified, only matching assets will be returned. See Introduction to Cloud Asset Inventory (https://cloud.google.com/resource-manager/docs/cloud-asset-inventory/overview) for all supported asset types. |
| `contentType` | string enum | Asset content type. If not specified, no content but the asset name will be returned. Values: `CONTENT_TYPE_UNSPECIFIED`, `RESOURCE`, `IAM_POLICY`. |
| `outputConfig` | OutputConfig | Required. Output configuration indicating where the results will be output to. All results will be in newline delimited JSON format. |
| `readTime` | string (google-datetime) | Timestamp to take an asset snapshot. This can only be set to a timestamp between 2018-10-02 UTC (inclusive) and the current time. If not specified, the current time will be used. Due to delays in resource data collection and indexing, there is a volatile window during which running the same query may get different results. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `Feed`

- An asset feed used to export asset updates to a destinations. An asset feed filter controls what updates are exported. The asset feed must be created within a project, organization, or folder. Supported destinations are: Pub/Sub topics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetNames` | array<string> | A list of the full names of the assets to receive updates. You must specify either or both of asset_names and asset_types. Only asset updates matching specified asset_names or asset_types are exported to the feed. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. For a list of the full names for supported asset types, see Resource name format. |
| `assetTypes` | array<string> | A list of types of the assets to receive updates. You must specify either or both of asset_names and asset_types. Only asset updates matching specified asset_names or asset_types are exported to the feed. Example: `"compute.googleapis.com/Disk"` For a list of all supported asset types, see Supported asset types. |
| `condition` | Expr | A condition which determines whether an asset update should be published. If specified, an asset will be returned only when the expression evaluates to true. When set, `expression` field in the `Expr` must be a valid \[CEL expression\] (https://github.com/google/cel-spec) on a TemporalAsset with name `temporal_asset`. Example: a Feed with expression ("temporal_asset.deleted == true") will only publish Asset deletions. Other fields of `Expr` are optional. See our user guide (https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes-with-condition) for detailed instructions. |
| `contentType` | string enum | Asset content type. If not specified, no content but the asset name and type will be returned. Values: `CONTENT_TYPE_UNSPECIFIED`, `RESOURCE`, `IAM_POLICY`, `ORG_POLICY`, `ACCESS_POLICY`, `OS_INVENTORY`, `RELATIONSHIP`. |
| `feedOutputConfig` | FeedOutputConfig | Required. Feed output configuration defining where the asset updates are published to. |
| `name` | string | Required. The format will be projects/{project_number}/feeds/{client-assigned_feed_identifier} or folders/{folder_number}/feeds/{client-assigned_feed_identifier} or organizations/{organization_number}/feeds/{client-assigned_feed_identifier} The client-assigned feed identifier must be unique within the parent project/folder/organization. |
| `relationshipTypes` | array<string> | A list of relationship types to output, for example: `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if content_type=RELATIONSHIP. \* If specified: it outputs specified relationship updates on the \[asset_names\] or the \[asset_types\]. It returns an error if any of the \[relationship_types\] doesn't belong to the supported relationship types of the \[asset_names\] or \[asset_types\], or any of the \[asset_names\] or the \[asset_types\] doesn't belong to the source types of the \[relationship_types\]. \* Otherwise: it outputs the supported relationships of the types of \[asset_names\] and \[asset_types\] or returns an error if any of the \[asset_names\] or the \[asset_types\] has no replationship support. See Introduction to Cloud Asset Inventory (https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types and relationship types. |

### `FeedOutputConfig`

- Output configuration for asset feed destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pubsubDestination` | PubsubDestination | Destination on Pub/Sub. |

### `GcsDestination`

- A Cloud Storage location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | The URI of the Cloud Storage object. It's the same URI that is used by gcloud storage. Example: "gs://bucket_name/object_name". See Viewing and Editing Object Metadata (https://cloud.google.com/storage/docs/viewing-editing-metadata) for more information. If the specified Cloud Storage object already exists and there is no hold (https://cloud.google.com/storage/docs/object-holds), it will be overwritten with the exported result. |
| `uriPrefix` | string | The URI prefix of all generated Cloud Storage objects. Example: "gs://bucket_name/object_name_prefix". Each object URI is in format: "gs://bucket_name/object_name_prefix// and only contains assets for that type. starts from 0. Example: "gs://bucket_name/object_name_prefix/compute.googleapis.com/Disk/0" is the first shard of output objects containing all compute.googleapis.com/Disk assets. An INVALID_ARGUMENT error will be returned if file with the same name "gs://bucket_name/object_name_prefix" already exists. |

### `GoogleCloudAssetV1Access`

- An IAM role or permission under analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysisState` | IamPolicyAnalysisState | The analysis state of this access. |
| `permission` | string | The permission. |
| `role` | string | The role. |

### `GoogleCloudAssetV1AccessControlList`

- An access control list, derived from the above IAM policy binding, which contains a set of resources and accesses. May include one item from each set to compose an access control entry. NOTICE that there could be multiple access control lists for one IAM policy binding. The access control lists are created based on resource and access combinations. For example, assume we have the following cases in one IAM policy binding: - Permission P1 and P2 apply to resource R1 and R2; - Permission P3 applies to resource R2 and R3; This will result in the following access control lists: - AccessControlList 1: \[R1, R2\], \[P1, P2\] - AccessControlList 2: \[R2, R3\], \[P3\]
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accesses` | array<GoogleCloudAssetV1Access> | The accesses that match one of the following conditions: - The access_selector, if it is specified in request; - Otherwise, access specifiers reachable from the policy binding's role. |
| `conditionEvaluation` | ConditionEvaluation | Condition evaluation for this AccessControlList, if there is a condition defined in the above IAM policy binding. |
| `resourceEdges` | array<GoogleCloudAssetV1Edge> | Resource edges of the graph starting from the policy attached resource to any descendant resources. The Edge.source_node contains the full resource name of a parent resource and Edge.target_node contains the full resource name of a child resource. This field is present only if the output_resource_edges option is enabled in request. |
| `resources` | array<GoogleCloudAssetV1Resource> | The resources that match one of the following conditions: - The resource_selector, if it is specified in request; - Otherwise, resources reachable from the policy attached resource. |

### `GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset`

- Represents a Google Cloud asset(resource or IAM policy) governed by the organization policies of the AnalyzeOrgPolicyGovernedAssetsRequest.constraint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consolidatedPolicy` | AnalyzerOrgPolicy | The consolidated policy for the analyzed asset. The consolidated policy is computed by merging and evaluating AnalyzeOrgPolicyGovernedAssetsResponse.GovernedAsset.policy_bundle. The evaluation will respect the organization policy hierarchy rules (https://cloud.google.com/resource-manager/docs/organization-policy/understanding-hierarchy). |
| `governedIamPolicy` | GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy | An IAM policy governed by the organization policies of the AnalyzeOrgPolicyGovernedAssetsRequest.constraint. |
| `governedResource` | GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedResource | A Google Cloud resource governed by the organization policies of the AnalyzeOrgPolicyGovernedAssetsRequest.constraint. |
| `policyBundle` | array<AnalyzerOrgPolicy> | The ordered list of all organization policies from the consolidated_policy.attached_resource to the scope specified in the request. If the constraint is defined with default policy, it will also appear in the list. |

### `GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy`

- The IAM policies governed by the organization policies of the AnalyzeOrgPolicyGovernedAssetsRequest.constraint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetType` | string | The asset type of the AnalyzeOrgPolicyGovernedAssetsResponse.GovernedIamPolicy.attached_resource. Example: `cloudresourcemanager.googleapis.com/Project` See Cloud Asset Inventory Supported Asset Types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for all supported asset types. |
| `attachedResource` | string | The full resource name of the resource on which this IAM policy is set. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. See Cloud Asset Inventory Resource Name Format (https://cloud.google.com/asset-inventory/docs/resource-name-format) for more information. |
| `folders` | array<string> | The folder(s) that this IAM policy belongs to, in the format of folders/{FOLDER_NUMBER}. This field is available when the IAM policy belongs (directly or cascadingly) to one or more folders. |
| `organization` | string | The organization that this IAM policy belongs to, in the format of organizations/{ORGANIZATION_NUMBER}. This field is available when the IAM policy belongs (directly or cascadingly) to an organization. |
| `policy` | Policy | The IAM policy directly set on the given resource. |
| `project` | string | The project that this IAM policy belongs to, in the format of projects/{PROJECT_NUMBER}. This field is available when the IAM policy belongs to a project. |

### `GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedResource`

- The Google Cloud resources governed by the organization policies of the AnalyzeOrgPolicyGovernedAssetsRequest.constraint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetType` | string | The asset type of the AnalyzeOrgPolicyGovernedAssetsResponse.GovernedResource.full_resource_name Example: `cloudresourcemanager.googleapis.com/Project` See Cloud Asset Inventory Supported Asset Types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for all supported asset types. |
| `effectiveTags` | array<EffectiveTagDetails> | The effective tags on this resource. |
| `folders` | array<string> | The folder(s) that this resource belongs to, in the format of folders/{FOLDER_NUMBER}. This field is available when the resource belongs (directly or cascadingly) to one or more folders. |
| `fullResourceName` | string | The \[full resource name\] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the Google Cloud resource. |
| `organization` | string | The organization that this resource belongs to, in the format of organizations/{ORGANIZATION_NUMBER}. This field is available when the resource belongs (directly or cascadingly) to an organization. |
| `parent` | string | The \[full resource name\] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the parent of AnalyzeOrgPolicyGovernedAssetsResponse.GovernedResource.full_resource_name. |
| `project` | string | The project that this resource belongs to, in the format of projects/{PROJECT_NUMBER}. This field is available when the resource belongs to a project. |

### `GoogleCloudAssetV1BigQueryDestination`

- A BigQuery destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataset` | string | Required. The BigQuery dataset in format "projects/projectId/datasets/datasetId", to which the analysis results should be exported. If this dataset does not exist, the export call will return an INVALID_ARGUMENT error. |
| `partitionKey` | string enum | The partition key for BigQuery partitioned table. Values: `PARTITION_KEY_UNSPECIFIED`, `REQUEST_TIME`. |
| `tablePrefix` | string | Required. The prefix of the BigQuery tables to which the analysis results will be written. Tables will be created based on this table_prefix if not exist: \* \_analysis table will contain export operation's metadata. \* \_analysis_result will contain all the IamPolicyAnalysisResult. When \[partition_key\] is specified, both tables will be partitioned based on the \[partition_key\]. |
| `writeDisposition` | string | Optional. Specifies the action that occurs if the destination table or partition already exists. The following values are supported: \* WRITE_TRUNCATE: If the table or partition already exists, BigQuery overwrites the entire table or all the partitions data. \* WRITE_APPEND: If the table or partition already exists, BigQuery appends the data to the table or the latest partition. \* WRITE_EMPTY: If the table already exists and contains data, an error is returned. The default value is WRITE_APPEND. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Details are at https://cloud.google.com/bigquery/docs/loading-data-local#appending_to_or_overwriting_a_table_using_a_local_file. |

### `GoogleCloudAssetV1BooleanConstraint`

- A `Constraint` that is either enforced or not. For example a constraint `constraints/compute.disableSerialPortAccess`. If it is enforced on a VM instance, serial port connections will not be opened to that instance.
- Version: v1

### `GoogleCloudAssetV1Constraint`

- The definition of a constraint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `booleanConstraint` | GoogleCloudAssetV1BooleanConstraint | Defines this constraint as being a BooleanConstraint. |
| `constraintDefault` | string enum | The evaluation behavior of this constraint in the absence of 'Policy'. Values: `CONSTRAINT_DEFAULT_UNSPECIFIED`, `ALLOW`, `DENY`. |
| `description` | string | Detailed description of what this `Constraint` controls as well as how and where it is enforced. |
| `displayName` | string | The human readable name of the constraint. |
| `listConstraint` | GoogleCloudAssetV1ListConstraint | Defines this constraint as being a ListConstraint. |
| `name` | string | The unique name of the constraint. Format of the name should be \* `constraints/{constraint_name}` For example, `constraints/compute.disableSerialPortAccess`. |

### `GoogleCloudAssetV1CustomConstraint`

- The definition of a custom constraint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actionType` | string enum | Allow or deny type. Values: `ACTION_TYPE_UNSPECIFIED`, `ALLOW`, `DENY`. |
| `condition` | string | Organization Policy condition/expression. For example: `resource.instanceName.matches("(production\|test)_(.+_)?[\d]+")'` or, `resource.management.auto_upgrade == true` |
| `description` | string | Detailed information about this custom policy constraint. |
| `displayName` | string | One line display name for the UI. |
| `methodTypes` | array<string> | All the operations being applied for this constraint. Values: `METHOD_TYPE_UNSPECIFIED`, `CREATE`, `UPDATE`, `DELETE`, `REMOVE_GRANT`, `GOVERN_TAGS`. |
| `name` | string | Name of the constraint. This is unique within the organization. Format of the name should be \* `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example : "organizations/123/customConstraints/custom.createOnlyE2TypeVms" |
| `resourceTypes` | array<string> | The Resource Instance type on which this policy applies to. Format will be of the form : "/" Example: \* `compute.googleapis.com/Instance`. |

### `GoogleCloudAssetV1Edge`

- A directional edge.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sourceNode` | string | The source node of the edge. For example, it could be a full resource name for a resource node or an email of an identity. |
| `targetNode` | string | The target node of the edge. For example, it could be a full resource name for a resource node or an email of an identity. |

### `GoogleCloudAssetV1GcsDestination`

- A Cloud Storage location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | Required. The URI of the Cloud Storage object. It's the same URI that is used by gcloud storage. Example: "gs://bucket_name/object_name". See Viewing and Editing Object Metadata (https://cloud.google.com/storage/docs/viewing-editing-metadata) for more information. If the specified Cloud Storage object already exists and there is no hold (https://cloud.google.com/storage/docs/object-holds), it will be overwritten with the analysis result. |

### `GoogleCloudAssetV1GovernedContainer`

- The organization/folder/project resource governed by organization policies of AnalyzeOrgPolicyGovernedContainersRequest.constraint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consolidatedPolicy` | AnalyzerOrgPolicy | The consolidated organization policy for the analyzed resource. The consolidated organization policy is computed by merging and evaluating AnalyzeOrgPolicyGovernedContainersResponse.GovernedContainer.policy_bundle. The evaluation will respect the organization policy hierarchy rules (https://cloud.google.com/resource-manager/docs/organization-policy/understanding-hierarchy). |
| `effectiveTags` | array<EffectiveTagDetails> | The effective tags on this resource. |
| `folders` | array<string> | The folder(s) that this resource belongs to, in the format of folders/{FOLDER_NUMBER}. This field is available when the resource belongs (directly or cascadingly) to one or more folders. |
| `fullResourceName` | string | The \[full resource name\] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of an organization/folder/project resource. |
| `organization` | string | The organization that this resource belongs to, in the format of organizations/{ORGANIZATION_NUMBER}. This field is available when the resource belongs (directly or cascadingly) to an organization. |
| `parent` | string | The \[full resource name\] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the parent of AnalyzeOrgPolicyGovernedContainersResponse.GovernedContainer.full_resource_name. |
| `policyBundle` | array<AnalyzerOrgPolicy> | The ordered list of all organization policies from the consolidated_policy.attached_resource. to the scope specified in the request. If the constraint is defined with default policy, it will also appear in the list. |
| `project` | string | The project that this resource belongs to, in the format of projects/{PROJECT_NUMBER}. This field is available when the resource belongs to a project. |

### `GoogleCloudAssetV1Identity`

- An identity under analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysisState` | IamPolicyAnalysisState | The analysis state of this identity. |
| `name` | string | The identity of members, formatted as appear in an IAM policy binding (https://cloud.google.com/iam/reference/rest/v1/Binding). For example, they might be formatted like the following: - user:foo@google.com - group:group1@google.com - serviceAccount:s1@prj1.iam.gserviceaccount.com - projectOwner:some_project_id - domain:google.com - allUsers |

### `GoogleCloudAssetV1IdentityList`

- The identities and group edges.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `groupEdges` | array<GoogleCloudAssetV1Edge> | Group identity edges of the graph starting from the binding's group members to any node of the identities. The Edge.source_node contains a group, such as `group:parent@google.com`. The Edge.target_node contains a member of the group, such as `group:child@google.com` or `user:foo@google.com`. This field is present only if the output_group_edges option is enabled in request. |
| `identities` | array<GoogleCloudAssetV1Identity> | Only the identities that match one of the following conditions will be presented: - The identity_selector, if it is specified in request; - Otherwise, identities reachable from the policy binding's members. |

### `GoogleCloudAssetV1ListConstraint`

- A `Constraint` that allows or disallows a list of string values, which are configured by an organization's policy administrator with a `Policy`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `supportsIn` | boolean | Indicates whether values grouped into categories can be used in `Policy.allowed_values` and `Policy.denied_values`. For example, `"in:Python"` would match any value in the 'Python' group. |
| `supportsUnder` | boolean | Indicates whether subtrees of Cloud Resource Manager resource hierarchy can be used in `Policy.allowed_values` and `Policy.denied_values`. For example, `"under:folders/123"` would match any resource under the 'folders/123' folder. |

### `GoogleCloudAssetV1QueryAssetsOutputConfigBigQueryDestination`

- BigQuery destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataset` | string | Required. The BigQuery dataset where the query results will be saved. It has the format of "projects/{projectId}/datasets/{datasetId}". |
| `table` | string | Required. The BigQuery table where the query results will be saved. If this table does not exist, a new table with the given name will be created. |
| `writeDisposition` | string | Specifies the action that occurs if the destination table or partition already exists. The following values are supported: \* WRITE_TRUNCATE: If the table or partition already exists, BigQuery overwrites the entire table or all the partitions data. \* WRITE_APPEND: If the table or partition already exists, BigQuery appends the data to the table or the latest partition. \* WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_EMPTY. |

### `GoogleCloudAssetV1Resource`

- A Google Cloud resource under analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysisState` | IamPolicyAnalysisState | The analysis state of this resource. |
| `fullResourceName` | string | The full resource name (https://cloud.google.com/asset-inventory/docs/resource-name-format) |

### `GoogleCloudAssetV1Rule`

- This rule message is a customized version of the one defined in the Organization Policy system. In addition to the fields defined in the original organization policy, it contains additional field(s) under specific circumstances to support analysis results.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowAll` | boolean | Setting this to true means that all values are allowed. This field can be set only in Policies for list constraints. |
| `condition` | Expr | The evaluating condition for this rule. |
| `conditionEvaluation` | ConditionEvaluation | The condition evaluation result for this rule. Only populated if it meets all the following criteria: \* There is a condition defined for this rule. \* This rule is within AnalyzeOrgPolicyGovernedContainersResponse.GovernedContainer.consolidated_policy, or AnalyzeOrgPolicyGovernedAssetsResponse.GovernedAsset.consolidated_policy when the AnalyzeOrgPolicyGovernedAssetsResponse.GovernedAsset has AnalyzeOrgPolicyGovernedAssetsResponse.GovernedAsset.governed_resource. |
| `denyAll` | boolean | Setting this to true means that all values are denied. This field can be set only in Policies for list constraints. |
| `enforce` | boolean | If `true`, then the `Policy` is enforced. If `false`, then any configuration is acceptable. This field can be set only in Policies for boolean constraints. |
| `values` | GoogleCloudAssetV1StringValues | List of values to be used for this policy rule. This field can be set only in policies for list constraints. |

### `GoogleCloudAssetV1StringValues`

- The string values for the list constraints.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedValues` | array<string> | List of values allowed at this resource. |
| `deniedValues` | array<string> | List of values denied at this resource. |

### `GoogleCloudAssetV1p7beta1Asset`

- An asset in Google Cloud. An asset can be any resource in the Google Cloud resource hierarchy (https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), a resource outside the Google Cloud resource hierarchy (such as Google Kubernetes Engine clusters and objects), or a policy (e.g. IAM policy). See Supported asset types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevel` | GoogleIdentityAccesscontextmanagerV1AccessLevel | Please also refer to the access level user guide (https://cloud.google.com/access-context-manager/docs/overview#access-levels). |
| `accessPolicy` | GoogleIdentityAccesscontextmanagerV1AccessPolicy | Please also refer to the access policy user guide (https://cloud.google.com/access-context-manager/docs/overview#access-policies). |
| `ancestors` | array<string> | The ancestry path of an asset in Google Cloud resource hierarchy (https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), represented as a list of relative resource names. An ancestry path starts with the closest ancestor in the hierarchy and ends at root. If the asset is a project, folder, or organization, the ancestry path starts from the asset itself. Example: `["projects/123456789", "folders/5432", "organizations/1234"]` |
| `assetType` | string | The type of the asset. Example: `compute.googleapis.com/Disk` See Supported asset types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information. |
| `iamPolicy` | Policy | A representation of the IAM policy set on a Google Cloud resource. There can be a maximum of one IAM policy set on any given resource. In addition, IAM policies inherit their granted access scope from any policies set on parent resources in the resource hierarchy. Therefore, the effectively policy is the union of both the policy set on this resource and each policy set on all of the resource's ancestry resource levels in the hierarchy. See this topic (https://cloud.google.com/iam/help/allow-policies/inheritance) for more information. |
| `name` | string | The full name of the asset. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1` See Resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. |
| `orgPolicy` | array<GoogleCloudOrgpolicyV1Policy> | A representation of an organization policy (https://cloud.google.com/resource-manager/docs/organization-policy/overview#organization_policy). There can be more than one organization policy with different constraints set on a given resource. |
| `relatedAssets` | GoogleCloudAssetV1p7beta1RelatedAssets | The related assets of the asset of one relationship type. One asset only represents one type of relationship. |
| `resource` | GoogleCloudAssetV1p7beta1Resource | A representation of the resource. |
| `servicePerimeter` | GoogleIdentityAccesscontextmanagerV1ServicePerimeter | Please also refer to the service perimeter user guide (https://cloud.google.com/vpc-service-controls/docs/overview). |
| `updateTime` | string (google-datetime) | The last update timestamp of an asset. update_time is updated when create/update/delete operation is performed. |

### `GoogleCloudAssetV1p7beta1BigQueryDestination`

- A BigQuery destination for exporting assets to.
- Version: v1p7beta1

| Field | Type | Description |
|---|---|---|
| `dataset` | string | Required. The BigQuery dataset in format "projects/projectId/datasets/datasetId", to which the snapshot result should be exported. If this dataset does not exist, the export call returns an INVALID_ARGUMENT error. |
| `force` | boolean | If the destination table already exists and this flag is `TRUE`, the table will be overwritten by the contents of assets snapshot. If the flag is `FALSE` or unset and the destination table already exists, the export call returns an INVALID_ARGUMENT error. |
| `partitionSpec` | GoogleCloudAssetV1p7beta1PartitionSpec | \[partition_spec\] determines whether to export to partitioned table(s) and how to partition the data. If \[partition_spec\] is unset or \[partition_spec.partition_key\] is unset or `PARTITION_KEY_UNSPECIFIED`, the snapshot results will be exported to non-partitioned table(s). \[force\] will decide whether to overwrite existing table(s). If \[partition_spec\] is specified. First, the snapshot results will be written to partitioned table(s) with two additional timestamp columns, readTime and requestTime, one of which will be the partition key. Secondly, in the case when any destination table already exists, it will first try to update existing table's schema as necessary by appending additional columns. Then, if \[force\] is `TRUE`, the corresponding partition will be overwritten by the snapshot results (data in different partitions will remain intact); if \[force\] is unset or `FALSE`, it will append the data. An error will be returned if the schema update or data appension fails. |
| `separateTablesPerAssetType` | boolean | If this flag is `TRUE`, the snapshot results will be written to one or multiple tables, each of which contains results of one asset type. The \[force\] and \[partition_spec\] fields will apply to each of them. Field \[table\] will be concatenated with "\_" and the asset type names (see https://cloud.google.com/asset-inventory/docs/supported-asset-types for supported asset types) to construct per-asset-type table names, in which all non-alphanumeric characters like "." and "/" will be substituted by "\_". Example: if field \[table\] is "mytable" and snapshot results contain "storage.googleapis.com/Bucket" assets, the corresponding table name will be "mytable_storage_googleapis_com_Bucket". If any of these tables does not exist, a new table with the concatenated name will be created. When \[content_type\] in the ExportAssetsRequest is `RESOURCE`, the schema of each table will include RECORD-type columns mapped to the nested fields in the Asset.resource.data field of that asset type (up to the 15 nested level BigQuery supports (https://cloud.google.com/bigquery/docs/nested-repeated#limitations)). The fields in >15 nested levels will be stored in JSON format string as a child column of its parent RECORD column. If error occurs when exporting to any table, the whole export call will return an error but the export results that already succeed will persist. Example: if exporting to table_type_A succeeds when exporting to table_type_B fails during one export call, the results in table_type_A will persist and there will not be partial results persisting in a table. |
| `table` | string | Required. The BigQuery table to which the snapshot result should be written. If this table does not exist, a new table with the given name will be created. |

### `GoogleCloudAssetV1p7beta1ExportAssetsRequest`

- Export asset request.
- Version: v1p7beta1

| Field | Type | Description |
|---|---|---|
| `assetTypes` | array<string> | A list of asset types to take a snapshot for. For example: "compute.googleapis.com/Disk". Regular expressions are also supported. For example: \* "compute.googleapis.com.\*" snapshots resources whose asset type starts with "compute.googleapis.com". \* ".\*Instance" snapshots resources whose asset type ends with "Instance". \* ".\*Instance.\*" snapshots resources whose asset type contains "Instance". See RE2 (https://github.com/google/re2/wiki/Syntax) for all supported regular expression syntax. If the regular expression does not match any supported asset type, an INVALID_ARGUMENT error will be returned. If specified, only matching assets will be returned, otherwise, it will snapshot all asset types. See Introduction to Cloud Asset Inventory (https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types. |
| `contentType` | string enum | Asset content type. If not specified, no content but the asset name will be returned. Values: `CONTENT_TYPE_UNSPECIFIED`, `RESOURCE`, `IAM_POLICY`, `ORG_POLICY`, `ACCESS_POLICY`, `RELATIONSHIP`. |
| `outputConfig` | GoogleCloudAssetV1p7beta1OutputConfig | Required. Output configuration indicating where the results will be output to. |
| `readTime` | string (google-datetime) | Timestamp to take an asset snapshot. This can only be set to a timestamp between the current time and the current time minus 35 days (inclusive). If not specified, the current time will be used. Due to delays in resource data collection and indexing, there is a volatile window during which running the same query may get different results. |
| `relationshipTypes` | array<string> | A list of relationship types to export, for example: `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if content_type=RELATIONSHIP. If specified, it will snapshot \[asset_types\]' specified relationships, or give errors if any relationship_types' supported types are not in \[asset_types\]. If not specified, it will snapshot all \[asset_types\]' supported relationships. An unspecified \[asset_types\] field means all supported asset_types. See Introduction to Cloud Asset Inventory (https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types and relationship types. |

### `GoogleCloudAssetV1p7beta1GcsDestination`

- A Cloud Storage location.
- Version: v1p7beta1

| Field | Type | Description |
|---|---|---|
| `uri` | string | The URI of the Cloud Storage object. It's the same URI that is used by gcloud storage. Example: "gs://bucket_name/object_name". See Viewing and Editing Object Metadata (https://cloud.google.com/storage/docs/viewing-editing-metadata) for more information. |
| `uriPrefix` | string | The URI prefix of all generated Cloud Storage objects. Example: "gs://bucket_name/object_name_prefix". Each object URI is in format: "gs://bucket_name/object_name_prefix/{ASSET_TYPE}/{SHARD_NUMBER} and only contains assets for that type. starts from 0. Example: "gs://bucket_name/object_name_prefix/compute.googleapis.com/Disk/0" is the first shard of output objects containing all compute.googleapis.com/Disk assets. An INVALID_ARGUMENT error will be returned if file with the same name "gs://bucket_name/object_name_prefix" already exists. |

### `GoogleCloudAssetV1p7beta1OutputConfig`

- Output configuration for export assets destination.
- Version: v1p7beta1

| Field | Type | Description |
|---|---|---|
| `bigqueryDestination` | GoogleCloudAssetV1p7beta1BigQueryDestination | Destination on BigQuery. The output table stores the fields in asset proto as columns in BigQuery. |
| `gcsDestination` | GoogleCloudAssetV1p7beta1GcsDestination | Destination on Cloud Storage. |

### `GoogleCloudAssetV1p7beta1PartitionSpec`

- Specifications of BigQuery partitioned table as export destination.
- Version: v1p7beta1

| Field | Type | Description |
|---|---|---|
| `partitionKey` | string enum | The partition key for BigQuery partitioned table. Values: `PARTITION_KEY_UNSPECIFIED`, `READ_TIME`, `REQUEST_TIME`. |

### `GoogleCloudAssetV1p7beta1RelatedAsset`

- An asset identify in Google Cloud which contains its name, type and ancestors. An asset can be any resource in the Google Cloud resource hierarchy (https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), a resource outside the Google Cloud resource hierarchy (such as Google Kubernetes Engine clusters and objects), or a policy (e.g. IAM policy). See Supported asset types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ancestors` | array<string> | The ancestors of an asset in Google Cloud resource hierarchy (https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), represented as a list of relative resource names. An ancestry path starts with the closest ancestor in the hierarchy and ends at root. Example: `["projects/123456789", "folders/5432", "organizations/1234"]` |
| `asset` | string | The full name of the asset. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1` See Resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. |
| `assetType` | string | The type of the asset. Example: `compute.googleapis.com/Disk` See Supported asset types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information. |

### `GoogleCloudAssetV1p7beta1RelatedAssets`

- The detailed related assets with the `relationship_type`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assets` | array<GoogleCloudAssetV1p7beta1RelatedAsset> | The peer resources of the relationship. |
| `relationshipAttributes` | GoogleCloudAssetV1p7beta1RelationshipAttributes | The detailed relation attributes. |

### `GoogleCloudAssetV1p7beta1RelationshipAttributes`

- The relationship attributes which include `type`, `source_resource_type`, `target_resource_type` and `action`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string | The detail of the relationship, e.g. `contains`, `attaches` |
| `sourceResourceType` | string | The source asset type. Example: `compute.googleapis.com/Instance` |
| `targetResourceType` | string | The target asset type. Example: `compute.googleapis.com/Disk` |
| `type` | string | The unique identifier of the relationship type. Example: `INSTANCE_TO_INSTANCEGROUP` |

### `GoogleCloudAssetV1p7beta1Resource`

- A representation of a Google Cloud resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | object | The content of the resource, in which some sensitive fields are removed and may not be present. |
| `discoveryDocumentUri` | string | The URL of the discovery document containing the resource's JSON schema. Example: `https://www.googleapis.com/discovery/v1/apis/compute/v1/rest` This value is unspecified for resources that do not have an API based on a discovery document, such as Cloud Bigtable. |
| `discoveryName` | string | The JSON schema name listed in the discovery document. Example: `Project` This value is unspecified for resources that do not have an API based on a discovery document, such as Cloud Bigtable. |
| `location` | string | The location of the resource in Google Cloud, such as its zone and region. For more information, see https://cloud.google.com/about/locations/. |
| `parent` | string | The full name of the immediate parent of this resource. See Resource Names (https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. For Google Cloud assets, this value is the parent resource defined in the IAM policy hierarchy (https://cloud.google.com/iam/docs/overview#policy_hierarchy). Example: `//cloudresourcemanager.googleapis.com/projects/my_project_123` For third-party assets, this field may be set differently. |
| `resourceUrl` | string | The REST URL for accessing the resource. An HTTP `GET` request using this URL returns the resource itself. Example: `https://cloudresourcemanager.googleapis.com/v1/projects/my-project-123` This value is unspecified for resources without a REST API. |
| `version` | string | The API version. Example: `v1` |

### `GoogleCloudOrgpolicyV1BooleanPolicy`

- Used in `policy_type` to specify how `boolean_policy` will behave at this resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enforced` | boolean | If `true`, then the `Policy` is enforced. If `false`, then any configuration is acceptable. Suppose you have a `Constraint` `constraints/compute.disableSerialPortAccess` with `constraint_default` set to `ALLOW`. A `Policy` for that `Constraint` exhibits the following behavior: - If the `Policy` at this resource has enforced set to `false`, serial port connection attempts will be allowed. - If the `Policy` at this resource has enforced set to `true`, serial port connection attempts will be refused. - If the `Policy` at this resource is `RestoreDefault`, serial port connection attempts will be allowed. - If no `Policy` is set at this resource or anywhere higher in the resource hierarchy, serial port connection attempts will be allowed. - If no `Policy` is set at this resource, but one exists higher in the resource hierarchy, the behavior is as if the`Policy` were set at this resource. The following examples demonstrate the different possible layerings: Example 1 (nearest `Constraint` wins): `organizations/foo` has a `Policy` with: {enforced: false} `projects/bar` has no `Policy` set. The constraint at `projects/bar` and `organizations/foo` will not be enforced. Example 2 (enforcement gets replaced): `organizations/foo` has a `Policy` with: {enforced: false} `projects/bar` has a `Policy` with: {enforced: true} The constraint at `organizations/foo` is not enforced. The constraint at `projects/bar` is enforced. Example 3 (RestoreDefault): `organizations/foo` has a `Policy` with: {enforced: true} `projects/bar` has a `Policy` with: {RestoreDefault: {}} The constraint at `organizations/foo` is enforced. The constraint at `projects/bar` is not enforced, because `constraint_default` for the `Constraint` is `ALLOW`. |

### `GoogleCloudOrgpolicyV1ListPolicy`

- Used in `policy_type` to specify how `list_policy` behaves at this resource. `ListPolicy` can define specific values and subtrees of Cloud Resource Manager resource hierarchy (`Organizations`, `Folders`, `Projects`) that are allowed or denied by setting the `allowed_values` and `denied_values` fields. This is achieved by using the `under:` and optional `is:` prefixes. The `under:` prefix is used to denote resource subtree values. The `is:` prefix is used to denote specific values, and is required only if the value contains a ":". Values prefixed with "is:" are treated the same as values with no prefix. Ancestry subtrees must be in one of the following formats: - "projects/", e.g. "projects/tokyo-rain-123" - "folders/", e.g. "folders/1234" - "organizations/", e.g. "organizations/1234" The `supports_under` field of the associated `Constraint` defines whether ancestry prefixes can be used. You can set `allowed_values` and `denied_values` in the same `Policy` if `all_values` is `ALL_VALUES_UNSPECIFIED`. `ALLOW` or `DENY` are used to allow or deny all values. If `all_values` is set to either `ALLOW` or `DENY`, `allowed_values` and `denied_values` must be unset.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allValues` | string enum | The policy all_values state. Values: `ALL_VALUES_UNSPECIFIED`, `ALLOW`, `DENY`. |
| `allowedValues` | array<string> | List of values allowed at this resource. Can only be set if `all_values` is set to `ALL_VALUES_UNSPECIFIED`. |
| `deniedValues` | array<string> | List of values denied at this resource. Can only be set if `all_values` is set to `ALL_VALUES_UNSPECIFIED`. |
| `inheritFromParent` | boolean | Determines the inheritance behavior for this `Policy`. By default, a `ListPolicy` set at a resource supersedes any `Policy` set anywhere up the resource hierarchy. However, if `inherit_from_parent` is set to `true`, then the values from the effective `Policy` of the parent resource are inherited, meaning the values set in this `Policy` are added to the values inherited up the hierarchy. Setting `Policy` hierarchies that inherit both allowed values and denied values isn't recommended in most circumstances to keep the configuration simple and understandable. However, it is possible to set a `Policy` with `allowed_values` set that inherits a `Policy` with `denied_values` set. In this case, the values that are allowed must be in `allowed_values` and not present in `denied_values`. For example, suppose you have a `Constraint` `constraints/serviceuser.services`, which has a `constraint_type` of `list_constraint`, and with `constraint_default` set to `ALLOW`. Suppose that at the Organization level, a `Policy` is applied that restricts the allowed API activations to {`E1`, `E2`}. Then, if a `Policy` is applied to a project below the Organization that has `inherit_from_parent` set to `false` and field all_values set to DENY, then an attempt to activate any API will be denied. The following examples demonstrate different possible layerings for `projects/bar` parented by `organizations/foo`: Example 1 (no inherited values): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"} `projects/bar` has `inherit_from_parent` `false` and values: {allowed_values: "E3" allowed_values: "E4"} The accepted values at `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar` are `E3`, and `E4`. Example 2 (inherited values): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"} `projects/bar` has a `Policy` with values: {value: "E3" value: "E4" inherit_from_parent: true} The accepted values at `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar` are `E1`, `E2`, `E3`, and `E4`. Example 3 (inheriting both allowed and denied values): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a `Policy` with: {denied_values: "E1"} The accepted values at `organizations/foo` are `E1`, `E2`. The value accepted at `projects/bar` is `E2`. Example 4 (RestoreDefault): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"} `projects/bar` has a `Policy` with values: {RestoreDefault: {}} The accepted values at `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar` are either all or none depending on the value of `constraint_default` (if `ALLOW`, all; if `DENY`, none). Example 5 (no policy inherits parent policy): `organizations/foo` has no `Policy` set. `projects/bar` has no `Policy` set. The accepted values at both levels are either all or none depending on the value of `constraint_default` (if `ALLOW`, all; if `DENY`, none). Example 6 (ListConstraint allowing all): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a `Policy` with: {all: ALLOW} The accepted values at `organizations/foo` are `E1`, E2`. Any value is accepted at `projects/bar`. Example 7 (ListConstraint allowing none): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a `Policy` with: {all: DENY} The accepted values at `organizations/foo` are `E1`, E2`. No value is accepted at `projects/bar`. Example 10 (allowed and denied subtrees of Resource Manager hierarchy): Given the following resource hierarchy O1->{F1, F2}; F1->{P1}; F2->{P2, P3}, `organizations/foo` has a `Policy` with values: {allowed_values: "under:organizations/O1"} `projects/bar` has a `Policy` with: {allowed_values: "under:projects/P3"} {denied_values: "under:folders/F2"} The accepted values at `organizations/foo` are `organizations/O1`, `folders/F1`, `folders/F2`, `projects/P1`, `projects/P2`, `projects/P3`. The accepted values at `projects/bar` are `organizations/O1`, `folders/F1`, `projects/P1`. |
| `suggestedValue` | string | Optional. The Google Cloud Console will try to default to a configuration that matches the value specified in this `Policy`. If `suggested_value` is not set, it will inherit the value specified higher in the hierarchy, unless `inherit_from_parent` is `false`. |

### `GoogleCloudOrgpolicyV1Policy`

- Defines a Cloud Organization `Policy` which is used to specify `Constraints` for configurations of Cloud Platform resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `booleanPolicy` | GoogleCloudOrgpolicyV1BooleanPolicy | For boolean `Constraints`, whether to enforce the `Constraint` or not. |
| `constraint` | string | The name of the `Constraint` the `Policy` is configuring, for example, `constraints/serviceuser.services`. A list of available constraints is available. Immutable after creation. |
| `etag` | string (byte) | An opaque tag indicating the current version of the `Policy`, used for concurrency control. When the `Policy` is returned from either a `GetPolicy` or a `ListOrgPolicy` request, this `etag` indicates the version of the current `Policy` to use when executing a read-modify-write loop. When the `Policy` is returned from a `GetEffectivePolicy` request, the `etag` will be unset. When the `Policy` is used in a `SetOrgPolicy` method, use the `etag` value that was returned from a `GetOrgPolicy` request as part of a read-modify-write loop for concurrency control. Not setting the `etag`in a `SetOrgPolicy` request will result in an unconditional write of the `Policy`. |
| `listPolicy` | GoogleCloudOrgpolicyV1ListPolicy | List of values either allowed or disallowed. |
| `restoreDefault` | GoogleCloudOrgpolicyV1RestoreDefault | Restores the default behavior of the constraint; independent of `Constraint` type. |
| `updateTime` | string (google-datetime) | The time stamp the `Policy` was previously updated. This is set by the server, not specified by the caller, and represents the last time a call to `SetOrgPolicy` was made for that `Policy`. Any value set by the client will be ignored. |
| `version` | integer (int32) | Version of the `Policy`. Default version is 0; |

### `GoogleCloudOrgpolicyV1RestoreDefault`

- Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific `Constraint` at this resource. Suppose that `constraint_default` is set to `ALLOW` for the `Constraint` `constraints/serviceuser.services`. Suppose that organization foo.com sets a `Policy` at their Organization resource node that restricts the allowed service activations to deny all service activations. They could then set a `Policy` with the `policy_type` `restore_default` on several experimental projects, restoring the `constraint_default` enforcement of the `Constraint` for only those projects, allowing those projects to have all services activated.
- Version: v1

### `GoogleIdentityAccesscontextmanagerV1AccessLevel`

- An `AccessLevel` is a label that can be applied to requests to Google Cloud services, along with a list of requirements necessary for the label to be applied.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `basic` | GoogleIdentityAccesscontextmanagerV1BasicLevel | A `BasicLevel` composed of `Conditions`. |
| `custom` | GoogleIdentityAccesscontextmanagerV1CustomLevel | A `CustomLevel` written in the Common Expression Language. |
| `description` | string | Description of the `AccessLevel` and its use. Does not affect behavior. |
| `name` | string | Identifier. Resource name for the `AccessLevel`. Format: `accessPolicies/{access_policy}/accessLevels/{access_level}`. The `access_level` component must begin with a letter, followed by alphanumeric characters or `_`. Its maximum length is 50 characters. After you create an `AccessLevel`, you cannot change its `name`. |
| `title` | string | Human-readable title. Must be unique within the policy. |

### `GoogleIdentityAccesscontextmanagerV1AccessPolicy`

- `AccessPolicy` is a container for `AccessLevels` (which define the necessary attributes to use Google Cloud services) and `ServicePerimeters` (which define regions of services able to freely pass data within a perimeter). An access policy is globally visible within an organization, and the restrictions it specifies apply to all projects within an organization.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Output only. An opaque identifier for the current version of the `AccessPolicy`. This will always be a strongly validated etag, meaning that two access policies will be identical if and only if their etags are identical. Clients should not expect this to be in any specific format. |
| `name` | string | Output only. Identifier. Resource name of the `AccessPolicy`. Format: `accessPolicies/{access_policy}` |
| `parent` | string | Required. The parent of this `AccessPolicy` in the Cloud Resource Hierarchy. Currently immutable once created. Format: `organizations/{organization_id}` |
| `scopes` | array<string> | The scopes of the AccessPolicy. Scopes define which resources a policy can restrict and where its resources can be referenced. For example, policy A with `scopes=["folders/123"]` has the following behavior: - ServicePerimeter can only restrict projects within `folders/123`. - ServicePerimeter within policy A can only reference access levels defined within policy A. - Only one policy can include a given scope; thus, attempting to create a second policy that includes `folders/123` will result in an error. If no scopes are provided, then any resource within the organization can be restricted. Scopes cannot be modified after a policy is created. Policies can only have a single scope. Format: list of `folders/{folder_number}` or `projects/{project_number}` |
| `title` | string | Required. Human-readable title. Does not affect behavior. |

### `GoogleIdentityAccesscontextmanagerV1AddRequestHeader`

- Adds a request header to the API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | HTTP header key. |
| `value` | string | HTTP header value. |

### `GoogleIdentityAccesscontextmanagerV1ApiOperation`

- Identification for an API Operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `methodSelectors` | array<GoogleIdentityAccesscontextmanagerV1MethodSelector> | API methods or permissions to allow. Method or permission must belong to the service specified by `service_name` field. A single MethodSelector entry with `*` specified for the `method` field will allow all methods AND permissions for the service specified in `service_name`. |
| `serviceName` | string | The name of the API whose methods or permissions the IngressPolicy or EgressPolicy want to allow. A single ApiOperation with `service_name` field set to `*` will allow all methods AND permissions for all services. |

### `GoogleIdentityAccesscontextmanagerV1BasicLevel`

- `BasicLevel` is an `AccessLevel` using a set of recommended features.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `combiningFunction` | string enum | How the `conditions` list should be combined to determine if a request is granted this `AccessLevel`. If `AND` is used, each `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. If `OR` is used, at least one `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. Default behavior is `AND`. Values: `AND`, `OR`. |
| `conditions` | array<GoogleIdentityAccesscontextmanagerV1Condition> | Required. A list of requirements for the `AccessLevel` to be granted. |

### `GoogleIdentityAccesscontextmanagerV1Condition`

- A condition necessary for an `AccessLevel` to be granted. The `Condition` is an AND over its fields. A `Condition` is true if: 1) the request IP is from one of the listed subnetworks, AND 2) the originating device complies with the listed device policy, AND 3) all listed access levels are granted, AND 4) the request was sent at a time allowed by the `DateTimeRestriction`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `devicePolicy` | GoogleIdentityAccesscontextmanagerV1DevicePolicy | Device-specific restrictions. All restrictions must hold for the `Condition` to be true. If not specified, all devices are allowed. |
| `ipSubnetworks` | array<string> | CIDR block IP subnetwork specification. May be IPv4 or IPv6. Note that for a CIDR IP address block, the specified IP address portion must be properly truncated (that is, all the host bits must be zero) or the input is considered malformed. For example, `"192.0.2.0/24"` is accepted, but `"192.0.2.1/24"` is not. Similarly, for IPv6, `"2001:db8::/32"` is accepted, whereas `"2001:db8::1/32"` is not. The originating IP of a request must be in one of the listed subnets in order for this `Condition` to be true. If empty, all IP addresses are allowed. |
| `members` | array<string> | The request must be made by one of the provided user or service accounts. Groups are not supported. Syntax: `user:{emailid}` `serviceAccount:{emailid}` If not specified, a request may come from any user. |
| `negate` | boolean | Whether to negate the `Condition`. If `true`, the `Condition` becomes a NAND over its non-empty fields. Any non-empty field criteria evaluating to `false` will result in the `Condition` being satisfied. Defaults to `false`. |
| `regions` | array<string> | The request must originate from one of the provided countries/regions. Must be valid ISO 3166-1 alpha-2 codes. |
| `requiredAccessLevels` | array<string> | A list of other access levels defined in the same `Policy`, referenced by resource name. Referencing an `AccessLevel` that does not exist is an error. All access levels listed must be granted for the `Condition` to be true. Example: `"accessPolicies/MY_POLICY/accessLevels/LEVEL_NAME"` |
| `vpcNetworkSources` | array<GoogleIdentityAccesscontextmanagerV1VpcNetworkSource> | The request must originate from one of the provided VPC networks in Google Cloud. Cannot specify this field together with `ip_subnetworks`. |

### `GoogleIdentityAccesscontextmanagerV1CustomLevel`

- `CustomLevel` is an `AccessLevel` using the Cloud Common Expression Language to represent the necessary conditions for the level to apply to a request. See CEL spec at: https://github.com/google/cel-spec
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expr` | Expr | Required. A Cloud CEL expression evaluating to a boolean. |

### `GoogleIdentityAccesscontextmanagerV1DevicePolicy`

- `DevicePolicy` specifies device-specific restrictions necessary to acquire a given access level. A `DevicePolicy` specifies requirements for requests from devices to be granted access levels; it does not do any enforcement on the device. `DevicePolicy` acts as an AND over all specified fields, and each repeated field is an OR over its elements. Any unset fields are ignored. For example, if the proto is `{ os_type : DESKTOP_WINDOWS, os_type : DESKTOP_LINUX, encryption_status: ENCRYPTED}`, then the `DevicePolicy` will be true for requests originating from encrypted Linux desktops and encrypted Windows desktops.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedDeviceManagementLevels` | array<string> | Allowed device management levels. An empty list allows all management levels. Values: `MANAGEMENT_UNSPECIFIED`, `NONE`, `BASIC`, `COMPLETE`. |
| `allowedEncryptionStatuses` | array<string> | Allowed encryption statuses. An empty list allows all statuses. Values: `ENCRYPTION_UNSPECIFIED`, `ENCRYPTION_UNSUPPORTED`, `UNENCRYPTED`, `ENCRYPTED`. |
| `osConstraints` | array<GoogleIdentityAccesscontextmanagerV1OsConstraint> | Allowed OS versions. An empty list allows all types and all versions. |
| `requireAdminApproval` | boolean | Whether the device needs to be approved by the customer admin. |
| `requireCorpOwned` | boolean | Whether the device needs to be corp-owned. |
| `requireScreenlock` | boolean | Whether or not screenlock is required for the `DevicePolicy` to be true. Defaults to `false`. |

### `GoogleIdentityAccesscontextmanagerV1EgressFrom`

- Defines the conditions under which an EgressPolicy matches a request. Conditions are based on information about the source of the request. Note that if the destination of the request is also protected by a ServicePerimeter, then that ServicePerimeter must have an IngressPolicy which allows access in order for this request to succeed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `identities` | array<string> | A list of identities that are allowed access through \[EgressPolicy\]. Identities can be an individual user, service account, Google group, third-party identity, or agent identity. For the list of supported identity types, see https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities. |
| `identityType` | string enum | Specifies the type of identities that are allowed access to outside the perimeter. If left unspecified, then members of `identities` field will be allowed access. Values: `IDENTITY_TYPE_UNSPECIFIED`, `ANY_IDENTITY`, `ANY_USER_ACCOUNT`, `ANY_SERVICE_ACCOUNT`. |
| `sourceRestriction` | string enum | Whether to enforce traffic restrictions based on `sources` field. If the `sources` field is not empty, then this field must be set to `SOURCE_RESTRICTION_ENABLED`. Values: `SOURCE_RESTRICTION_UNSPECIFIED`, `SOURCE_RESTRICTION_ENABLED`, `SOURCE_RESTRICTION_DISABLED`. |
| `sources` | array<GoogleIdentityAccesscontextmanagerV1EgressSource> | Sources that this EgressPolicy authorizes access from. If this field is not empty, then `source_restriction` must be set to `SOURCE_RESTRICTION_ENABLED`. |

### `GoogleIdentityAccesscontextmanagerV1EgressPolicy`

- Policy for egress from perimeter. EgressPolicies match requests based on `egress_from` and `egress_to` stanzas. For an EgressPolicy to match, both `egress_from` and `egress_to` stanzas must be matched. If an EgressPolicy matches a request, the request is allowed to span the ServicePerimeter boundary. For example, an EgressPolicy can be used to allow VMs on networks within the ServicePerimeter to access a defined set of projects outside the perimeter in certain contexts (e.g. to read data from a Cloud Storage bucket or query against a BigQuery dataset). EgressPolicies are concerned with the \*resources\* that a request relates to, as well as the API services and API actions being used. They do not relate to the direction of data movement. More detailed documentation for this concept can be found in the descriptions of EgressFrom and EgressTo.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `egressFrom` | GoogleIdentityAccesscontextmanagerV1EgressFrom | Defines conditions on the source of a request causing this EgressPolicy to apply. |
| `egressTo` | GoogleIdentityAccesscontextmanagerV1EgressTo | Defines the conditions on the ApiOperation and destination resources that cause this EgressPolicy to apply. |
| `title` | string | Optional. Human-readable title for the egress rule. The title must be unique within the perimeter and cannot exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters. |

### `GoogleIdentityAccesscontextmanagerV1EgressSource`

- The source that EgressPolicy authorizes access from inside the ServicePerimeter to somewhere outside the ServicePerimeter boundaries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevel` | string | An AccessLevel resource name that allows protected resources inside the ServicePerimeters to access outside the ServicePerimeter boundaries. AccessLevels listed must be in the same policy as this ServicePerimeter. Referencing a nonexistent AccessLevel will cause an error. If an AccessLevel name is not specified, only resources within the perimeter can be accessed through Google Cloud calls with request origins within the perimeter. Example: `accessPolicies/MY_POLICY/accessLevels/MY_LEVEL`. If a single `*` is specified for `access_level`, then all EgressSources will be allowed. |
| `pscEndpoint` | GoogleIdentityAccesscontextmanagerV1PrivateServiceConnectEndpoint | A PrivateServiceConnectEndpoint that is allowed to access data outside the perimeter. The Private Service Connect endpoint may be in any organization, not just the organization that the perimeter is defined in. |
| `resource` | string | A Google Cloud resource from the service perimeter that you want to allow to access data outside the perimeter. This field supports projects, folders, and organizations in the form `projects/{project_number}`, `folders/{folder_id}`, and `organizations/{organization_id}`. You can't use `*` in this field to allow all Google Cloud resources. |

### `GoogleIdentityAccesscontextmanagerV1EgressTo`

- Defines the conditions under which an EgressPolicy matches a request. Conditions are based on information about the ApiOperation intended to be performed on the `resources` specified. Note that if the destination of the request is also protected by a ServicePerimeter, then that ServicePerimeter must have an IngressPolicy which allows access in order for this request to succeed. The request must match `operations` AND `resources` fields in order to be allowed egress out of the perimeter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `externalResources` | array<string> | A list of external resources that are allowed to be accessed. Only AWS and Azure resources are supported. For Amazon S3, the supported formats are `s3://BUCKET_NAME`, `s3a://BUCKET_NAME`, and `s3n://BUCKET_NAME`. For Azure Storage, the supported format is `azure://myaccount.blob.core.windows.net/CONTAINER_NAME`. A request matches if it contains an external resource in this list (Example: `s3://bucket/path`). Currently `'*'` is not allowed. |
| `operations` | array<GoogleIdentityAccesscontextmanagerV1ApiOperation> | A list of ApiOperations allowed to be performed by the sources specified in the corresponding EgressFrom. A request matches if it uses an operation/service in this list. |
| `resources` | array<string> | A list of resources, currently projects, folders, and organizations in the form `projects/{project_number}`, `folders/{folder_id}`, and `organizations/{organization_id}`, that are allowed to be accessed by sources defined in the corresponding EgressFrom. A request matches if it contains a resource in this list. If `*` is specified for `resources`, then this EgressTo rule will authorize access to all resources outside the perimeter. |
| `roles` | array<string> | IAM roles that represent the set of operations that the sources specified in the corresponding EgressFrom are allowed to perform in this ServicePerimeter. |

### `GoogleIdentityAccesscontextmanagerV1IngressFrom`

- Defines the conditions under which an IngressPolicy matches a request. Conditions are based on information about the source of the request. The request must satisfy what is defined in `sources` AND identity related fields in order to match.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `identities` | array<string> | A list of identities that are allowed access through \[IngressPolicy\]. Identities can be an individual user, service account, Google group, third-party identity, or agent identity. For the list of supported identity types, see https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities. |
| `identityType` | string enum | Specifies the type of identities that are allowed access from outside the perimeter. If left unspecified, then members of `identities` field will be allowed access. Values: `IDENTITY_TYPE_UNSPECIFIED`, `ANY_IDENTITY`, `ANY_USER_ACCOUNT`, `ANY_SERVICE_ACCOUNT`. |
| `sources` | array<GoogleIdentityAccesscontextmanagerV1IngressSource> | Sources that this IngressPolicy authorizes access from. |

### `GoogleIdentityAccesscontextmanagerV1IngressPolicy`

- Policy for ingress into ServicePerimeter. IngressPolicies match requests based on `ingress_from` and `ingress_to` stanzas. For an ingress policy to match, both the `ingress_from` and `ingress_to` stanzas must be matched. If an IngressPolicy matches a request, the request is allowed through the perimeter boundary from outside the perimeter. For example, access from the internet can be allowed either based on an AccessLevel or, for traffic hosted on Google Cloud, the project of the source network. For access from private networks, using the project of the hosting network is required. Individual ingress policies can be limited by restricting which services and/or actions they match using the `ingress_to` field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ingressFrom` | GoogleIdentityAccesscontextmanagerV1IngressFrom | Defines the conditions on the source of a request causing this IngressPolicy to apply. |
| `ingressTo` | GoogleIdentityAccesscontextmanagerV1IngressTo | Defines the conditions on the ApiOperation and request destination that cause this IngressPolicy to apply. |
| `title` | string | Optional. Human-readable title for the ingress rule. The title must be unique within the perimeter and cannot exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters. |

### `GoogleIdentityAccesscontextmanagerV1IngressSource`

- The source that IngressPolicy authorizes access from.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevel` | string | An AccessLevel resource name that allows resources within the ServicePerimeters to be accessed from the internet. AccessLevels listed must be in the same policy as this ServicePerimeter. Referencing a nonexistent AccessLevel will cause an error. If no AccessLevel names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `accessPolicies/MY_POLICY/accessLevels/MY_LEVEL`. If a single `*` is specified for `access_level`, then all IngressSources will be allowed. |
| `pscEndpoint` | GoogleIdentityAccesscontextmanagerV1PrivateServiceConnectEndpoint | A PrivateServiceConnectEndpoint that is allowed to access the perimeter. The Private Service Connect endpoint may be in any organization, not just the organization that the perimeter is defined in. |
| `resource` | string | A Google Cloud resource that is allowed to ingress the perimeter. Requests from these resources will be allowed to access perimeter data. Currently projects, folders, organizations, and VPCs are allowed. Project format: `projects/{project_number}` Folder format: `folders/{folder_id}` Organization format: `organizations/{organization_id}` VPC network format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`. The project may be in any Google Cloud organization, not just the organization that the perimeter is defined in. `*` is not allowed, the case of allowing all Google Cloud resources only is not supported. |

### `GoogleIdentityAccesscontextmanagerV1IngressTo`

- Defines the conditions under which an IngressPolicy matches a request. Conditions are based on information about the ApiOperation intended to be performed on the target resource of the request. The request must satisfy what is defined in `operations` AND `resources` in order to match.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operations` | array<GoogleIdentityAccesscontextmanagerV1ApiOperation> | A list of ApiOperations allowed to be performed by the sources specified in corresponding IngressFrom in this ServicePerimeter. |
| `resources` | array<string> | A list of resources, currently projects, folders, and organizations in the form `projects/{project_number}`, `folders/{folder_id}`, and `organizations/{organization_id}`, protected by this ServicePerimeter that are allowed to be accessed by sources defined in the corresponding IngressFrom. If a single `*` is specified, then access to all resources inside the perimeter is allowed. |
| `roles` | array<string> | IAM roles that represent the set of operations that the sources specified in the corresponding IngressFrom are allowed to perform in this ServicePerimeter. |

### `GoogleIdentityAccesscontextmanagerV1MethodSelector`

- An allowed method or permission of a service specified in ApiOperation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `method` | string | A valid method name for the corresponding `service_name` in ApiOperation. If `*` is used as the value for the `method`, then ALL methods and permissions are allowed. |
| `permission` | string | A valid Cloud IAM permission for the corresponding `service_name` in ApiOperation. |

### `GoogleIdentityAccesscontextmanagerV1Modifier`

- Modifier to apply to the API requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addRequestHeader` | GoogleIdentityAccesscontextmanagerV1AddRequestHeader | Adds an additional HTTP request header. |

### `GoogleIdentityAccesscontextmanagerV1OsConstraint`

- A restriction on the OS type and version of devices making requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `minimumVersion` | string | The minimum allowed OS version. If not set, any version of this OS satisfies the constraint. Format: `"major.minor.patch"`. Examples: `"10.5.301"`, `"9.2.1"`. |
| `osType` | string enum | Required. The allowed OS type. Values: `OS_UNSPECIFIED`, `DESKTOP_MAC`, `DESKTOP_WINDOWS`, `DESKTOP_LINUX`, `DESKTOP_CHROME_OS`, `GOOGLEBOOK_OS`, `ANDROID`, `IOS`. |
| `requireVerifiedChromeOs` | boolean | Only allows requests from devices with a verified Chrome OS. Verification includes requirements that the device is enterprise-managed, conforms to domain policies, and the caller has permission to call the API targeted by the request. |

### `GoogleIdentityAccesscontextmanagerV1PrivateServiceConnectEndpoint`

- Specifies the Private Service Connect endpoint that an API call refers to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `forwardingRule` | string | The full resource name of the global forwarding rule that identifies a Private Service Connect endpoint. Forwarding rule format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/forwardingRules/{FORWARDING_RULE_ID}`. |

### `GoogleIdentityAccesscontextmanagerV1ServicePattern`

- Service patterns used to allow access.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `modifiers` | array<GoogleIdentityAccesscontextmanagerV1Modifier> | Modifiers to apply to the requests that match the URL pattern. |
| `pattern` | string | URL pattern to allow. Only patterns of `".googleapis.com/*"`, `"www.googleapis.com//*"`, and `"*.appspot.com/*"` forms are supported, where \`\` should be an alphanumeric name. |
| `service` | string | Supported service to allow. |

### `GoogleIdentityAccesscontextmanagerV1ServicePerimeter`

- `ServicePerimeter` describes a set of Google Cloud resources which can freely import and export data amongst themselves, but not export outside of the `ServicePerimeter`. If a request with a source within this `ServicePerimeter` has a target outside of the `ServicePerimeter`, the request will be blocked. Otherwise the request is allowed. There are two types of Service Perimeter - Regular and Bridge. Regular Service Perimeters cannot overlap, a single Google Cloud project or VPC network can only belong to a single regular Service Perimeter. Service Perimeter Bridges can contain only Google Cloud projects as members, a single Google Cloud project may belong to multiple Service Perimeter Bridges.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of the `ServicePerimeter` and its use. Does not affect behavior. |
| `etag` | string | Optional. An opaque identifier for the current version of the `ServicePerimeter`. This identifier does not follow any specific format. If an etag is not provided, the operation will be performed as if a valid etag is provided. |
| `name` | string | Identifier. Resource name for the `ServicePerimeter`. Format: `accessPolicies/{access_policy}/servicePerimeters/{service_perimeter}`. The `service_perimeter` component must begin with a letter, followed by alphanumeric characters or `_`. After you create a `ServicePerimeter`, you cannot change its `name`. |
| `perimeterType` | string enum | Perimeter type indicator. A single project or VPC network is allowed to be a member of a single regular perimeter, but multiple service perimeter bridges. A project cannot be included in a perimeter bridge without being included in a regular perimeter. For perimeter bridges, the restricted service list as well as access level lists must be empty. Values: `PERIMETER_TYPE_REGULAR`, `PERIMETER_TYPE_BRIDGE`. |
| `spec` | GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig | Proposed (or dry run) ServicePerimeter configuration. This configuration allows you to specify and test ServicePerimeter configuration without enforcing actual access restrictions. Only allowed to be set when the `use_explicit_dry_run_spec` flag is set. |
| `status` | GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig | Current ServicePerimeter configuration. Specifies sets of resources, restricted services, and access levels that determine perimeter content and boundaries. |
| `title` | string | Human readable title. Must be unique within the Policy. |
| `useExplicitDryRunSpec` | boolean | Use explicit dry run spec flag. Ordinarily, a dry-run spec implicitly exists for all Service Perimeters, and that spec is identical to the status for those Service Perimeters. When this flag is set, it inhibits the generation of the implicit spec, thereby allowing the user to explicitly provide a configuration ("spec") to use in a dry-run version of the Service Perimeter. This allows the user to test changes to the enforced config ("status") without actually enforcing them. This testing is done through analyzing the differences between currently enforced and suggested restrictions. `use_explicit_dry_run_spec` must be set to `true` if any of the fields in the spec are set to non-default values. |

### `GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig`

- `ServicePerimeterConfig` specifies a set of Google Cloud resources that describe specific Service Perimeter configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevels` | array<string> | A list of `AccessLevel` resource names that allow resources within the `ServicePerimeter` to be accessed from the internet. `AccessLevels` listed must be in the same policy as this `ServicePerimeter`. Referencing a nonexistent `AccessLevel` is a syntax error. If no `AccessLevel` names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `"accessPolicies/MY_POLICY/accessLevels/MY_LEVEL"`. For Service Perimeter Bridge, must be empty. |
| `egressPolicies` | array<GoogleIdentityAccesscontextmanagerV1EgressPolicy> | List of EgressPolicies to apply to the perimeter. A perimeter may have multiple EgressPolicies, each of which is evaluated separately. Access is granted if any EgressPolicy grants it. Must be empty for a perimeter bridge. |
| `ingressPolicies` | array<GoogleIdentityAccesscontextmanagerV1IngressPolicy> | List of IngressPolicies to apply to the perimeter. A perimeter may have multiple IngressPolicies, each of which is evaluated separately. Access is granted if any Ingress Policy grants it. Must be empty for a perimeter bridge. |
| `resources` | array<string> | A list of Google Cloud resources that are inside of the service perimeter. Currently projects, folders, and VPCs are allowed. Project format: `projects/{project_number}` Folder format: `folders/{folder_id}` VPC network format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`. |
| `restrictedServices` | array<string> | Google Cloud services that are subject to the Service Perimeter restrictions. For example, if `storage.googleapis.com` is specified, access to the storage buckets inside the perimeter must meet the perimeter's access restrictions. |
| `vpcAccessibleServices` | GoogleIdentityAccesscontextmanagerV1VpcAccessibleServices | Configuration for APIs allowed within Perimeter. |

### `GoogleIdentityAccesscontextmanagerV1VpcAccessibleServices`

- Specifies how APIs are allowed to communicate within the Service Perimeter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedServicePatterns` | array<GoogleIdentityAccesscontextmanagerV1ServicePattern> | Specifies which Google services are allowed to be accessed from VPC networks in the service perimeter. |
| `allowedServices` | array<string> | The list of APIs usable within the Service Perimeter. Must be empty unless `enable_restriction` is `true`. You can specify a list of individual services, as well as include the `'RESTRICTED-SERVICES'` value, which automatically includes all of the services protected by the perimeter. |
| `enableRestriction` | boolean | Whether to restrict API calls within the Service Perimeter to the list of APIs specified in `allowed_services`. |
| `servicePatternsEnforcementScopes` | array<string> | Defines the enforcement scopes of service patterns. Values: `SERVICE_PATTERNS_ENFORCEMENT_SCOPE_UNSPECIFIED`, `GOOGLE_APIS_VIA_PRIVATE_PATH`. |

### `GoogleIdentityAccesscontextmanagerV1VpcNetworkSource`

- The originating network source in Google Cloud.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vpcSubnetwork` | GoogleIdentityAccesscontextmanagerV1VpcSubNetwork | Sub-segment ranges of a VPC network. |

### `GoogleIdentityAccesscontextmanagerV1VpcSubNetwork`

- Sub-segment ranges inside of a VPC network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `network` | string | Required. Network name. If the network is not part of the organization, the `compute.network.get` permission must be granted to the caller. Format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NETWORK_NAME}` Example: `//compute.googleapis.com/projects/my-project/global/networks/network-1` |
| `vpcIpSubnetworks` | array<string> | CIDR block IP subnetwork specification. The IP address must be an IPv4 address and can be a public or private IP address. Note that for a CIDR IP address block, the specified IP address portion must be properly truncated (that is, all the host bits must be zero) or the input is considered malformed. For example, `"192.0.2.0/24"` is accepted, but `"192.0.2.1/24"` is not. If empty, all IP addresses are allowed. |

### `IamPolicyAnalysis`

- An analysis message to group the query and results.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysisQuery` | IamPolicyAnalysisQuery | The analysis query. |
| `analysisResults` | array<IamPolicyAnalysisResult> | A list of IamPolicyAnalysisResult that matches the analysis query, or empty if no result is found. |
| `fullyExplored` | boolean | Represents whether all entries in the analysis_results have been fully explored to answer the query. |
| `nonCriticalErrors` | array<IamPolicyAnalysisState> | A list of non-critical errors happened during the query handling. |

### `IamPolicyAnalysisOutputConfig`

- Output configuration for export IAM policy analysis destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigqueryDestination` | GoogleCloudAssetV1BigQueryDestination | Destination on BigQuery. |
| `gcsDestination` | GoogleCloudAssetV1GcsDestination | Destination on Cloud Storage. |

### `IamPolicyAnalysisQuery`

- IAM policy analysis query message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessSelector` | AccessSelector | Optional. Specifies roles or permissions for analysis. This is optional. |
| `conditionContext` | ConditionContext | Optional. The hypothetical context for IAM conditions evaluation. |
| `identitySelector` | IdentitySelector | Optional. Specifies an identity for analysis. |
| `options` | Options | Optional. The query options. |
| `resourceSelector` | ResourceSelector | Optional. Specifies a resource for analysis. |
| `scope` | string | Required. The relative name of the root asset. Only resources and IAM policies within the scope will be analyzed. This can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). To know how to get organization ID, visit here (https://cloud.google.com/resource-manager/docs/creating-managing-organization#retrieving_your_organization_id). To know how to get folder or project ID, visit here (https://cloud.google.com/resource-manager/docs/creating-managing-folders#viewing_or_listing_folders_and_projects). |

### `IamPolicyAnalysisResult`

- IAM Policy analysis result, consisting of one IAM policy binding and derived access control lists.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessControlLists` | array<GoogleCloudAssetV1AccessControlList> | The access control lists derived from the iam_binding that match or potentially match resource and access selectors specified in the request. |
| `attachedResourceFullName` | string | The full resource name (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the resource to which the iam_binding policy attaches. |
| `fullyExplored` | boolean | Represents whether all analyses on the iam_binding have successfully finished. |
| `iamBinding` | Binding | The IAM policy binding under analysis. |
| `identityList` | GoogleCloudAssetV1IdentityList | The identity list derived from members of the iam_binding that match or potentially match identity selector specified in the request. |

### `IamPolicyAnalysisState`

- Represents the detailed state of an entity under analysis, such as a resource, an identity or an access.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cause` | string | The human-readable description of the cause of failure. |
| `code` | string enum | The Google standard error code that best describes the state. For example: - OK means the analysis on this entity has been successfully finished; - PERMISSION_DENIED means an access denied error is encountered; - DEADLINE_EXCEEDED means the analysis on this entity hasn't been started in time; Values: `OK`, `CANCELLED`, `UNKNOWN`, `INVALID_ARGUMENT`, `DEADLINE_EXCEEDED`, `NOT_FOUND`, `ALREADY_EXISTS`, `PERMISSION_DENIED`, `UNAUTHENTICATED`, `RESOURCE_EXHAUSTED`, `FAILED_PRECONDITION`, `ABORTED`, `OUT_OF_RANGE`, `UNIMPLEMENTED`, `INTERNAL`, `UNAVAILABLE`, `DATA_LOSS`. |

### `IamPolicySearchResult`

- A result of IAM Policy search, containing information of an IAM policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetType` | string | The type of the resource associated with this IAM policy. Example: `compute.googleapis.com/Disk`. To search against the `asset_type`: \* specify the `asset_types` field in your search request. |
| `explanation` | Explanation | Explanation about the IAM policy search result. It contains additional information to explain why the search result matches the query. |
| `folders` | array<string> | The folder(s) that the IAM policy belongs to, in the form of folders/{FOLDER_NUMBER}. This field is available when the IAM policy belongs to one or more folders. To search against `folders`: \* use a field query. Example: `folders:(123 OR 456)` \* use a free text query. Example: `123` \* specify the `scope` field as this folder in your search request. |
| `organization` | string | The organization that the IAM policy belongs to, in the form of organizations/{ORGANIZATION_NUMBER}. This field is available when the IAM policy belongs to an organization. To search against `organization`: \* use a field query. Example: `organization:123` \* use a free text query. Example: `123` \* specify the `scope` field as this organization in your search request. |
| `policy` | Policy | The IAM policy directly set on the given resource. Note that the original IAM policy can contain multiple bindings. This only contains the bindings that match the given query. For queries that don't contain a constrain on policies (e.g., an empty query), this contains all the bindings. To search against the `policy` bindings: \* use a field query: - query by the policy contained members. Example: `policy:amy@gmail.com` - query by the policy contained roles. Example: `policy:roles/compute.admin` - query by the policy contained roles' included permissions. Example: `policy.role.permissions:compute.instances.create` |
| `project` | string | The project that the associated Google Cloud resource belongs to, in the form of projects/{PROJECT_NUMBER}. If an IAM policy is set on a resource (like VM instance, Cloud Storage bucket), the project field will indicate the project that contains the resource. If an IAM policy is set on a folder or organization, this field will be empty. To search against the `project`: \* specify the `scope` field as this project in your search request. |
| `resource` | string | The full resource name of the resource associated with this IAM policy. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. See Cloud Asset Inventory Resource Name Format (https://cloud.google.com/asset-inventory/docs/resource-name-format) for more information. To search against the `resource`: \* use a field query. Example: `resource:organizations/123` |

### `IamPolicySearchResult` (v1p1beta1)

- The result for an IAM policy search.
- Version: v1p1beta1

| Field | Type | Description |
|---|---|---|
| `explanation` | Explanation | Explanation about the IAM policy search result. It contains additional information that explains why the search result matches the query. |
| `policy` | Policy | The IAM policy attached to the specified resource. Note that the original IAM policy can contain multiple bindings. This only contains the bindings that match the given query. For queries that don't contain a constraint on policies (e.g. an empty query), this contains all the bindings. |
| `project` | string | The project that the associated Google Cloud resource belongs to, in the form of `projects/{project_number}`. If an IAM policy is set on a resource -- such as a Compute Engine instance or a Cloud Storage bucket -- the project field will indicate the project that contains the resource. If an IAM policy is set on a folder or organization, the project field will be empty. |
| `resource` | string | The full resource name (https://cloud.google.com/apis/design/resource_names#full_resource_name) of the resource associated with this IAM policy. |

### `IdentitySelector`

- Specifies an identity for which to determine resource access, based on roles assigned either directly to them or to the groups they belong to, directly or indirectly.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `identity` | string | Required. The identity appear in the form of principals in IAM policy binding (https://cloud.google.com/iam/reference/rest/v1/Binding). The examples of supported forms are: "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com". Notice that wildcard characters (such as \* and ?) are not supported. You must give a specific identity. |

### `Inventory`

- This API resource represents the available inventory data for a Compute Engine virtual machine (VM) instance at a given point in time. You can use this API resource to determine the inventory data of your VM. For more information, see Information provided by OS inventory management (https://cloud.google.com/compute/docs/instances/os-inventory-management#data-collected).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | object | Inventory items related to the VM keyed by an opaque unique identifier for each inventory item. The identifier is unique to each distinct and addressable inventory item and will change, when there is a new package version. |
| `name` | string | Output only. The `Inventory` API resource name. Format: `projects/{project_number}/locations/{location}/instances/{instance_id}/inventory` |
| `osInfo` | OsInfo | Base level operating system information for the VM. |
| `updateTime` | string (google-datetime) | Output only. Timestamp of the last reported inventory for the VM. |

### `Item`

- A single piece of inventory on a VM.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availablePackage` | SoftwarePackage | Software package available to be installed on the VM instance. |
| `createTime` | string (google-datetime) | When this inventory item was first detected. |
| `id` | string | Identifier for this item, unique across items for this VM. |
| `installedPackage` | SoftwarePackage | Software package present on the VM instance. |
| `originType` | string enum | The origin of this inventory item. Values: `ORIGIN_TYPE_UNSPECIFIED`, `INVENTORY_REPORT`. |
| `type` | string enum | The specific type of inventory, correlating to its specific details. Values: `TYPE_UNSPECIFIED`, `INSTALLED_PACKAGE`, `AVAILABLE_PACKAGE`. |
| `updateTime` | string (google-datetime) | When this inventory item was last modified. |

### `ListAssetsResponse`

- ListAssets response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assets` | array<Asset> | Assets. |
| `nextPageToken` | string | Token to retrieve the next page of results. It expires 72 hours after the page token for the first page is generated. Set to empty if there are no remaining results. |
| `readTime` | string (google-datetime) | Time the snapshot was taken. |

### `ListFeedsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `feeds` | array<Feed> | A list of feeds. |

### `ListSavedQueriesResponse`

- Response of listing saved queries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `savedQueries` | array<SavedQuery> | A list of savedQueries. |

### `MoveAnalysis`

- A message to group the analysis information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysis` | MoveAnalysisResult | Analysis result of moving the target resource. |
| `displayName` | string | The user friendly display name of the analysis. E.g. IAM, organization policy etc. |
| `error` | Status | Description of error encountered when performing the analysis. |

### `MoveAnalysisResult`

- An analysis result including blockers and warnings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `blockers` | array<MoveImpact> | Blocking information that would prevent the target resource from moving to the specified destination at runtime. |
| `warnings` | array<MoveImpact> | Warning information indicating that moving the target resource to the specified destination might be unsafe. This can include important policy information and configuration changes, but will not block moves at runtime. |

### `MoveImpact`

- A message to group impacts of moving the target resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detail` | string | User friendly impact detail in a free form message. |

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

### `Options`

- Contains query options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analyzeServiceAccountImpersonation` | boolean | Optional. If true, the response will include access analysis from identities to resources via service account impersonation. This is a very expensive operation, because many derived queries will be executed. We highly recommend you use AssetService.AnalyzeIamPolicyLongrunning RPC instead. For example, if the request analyzes for which resources user A has permission P, and there's an IAM policy states user A has iam.serviceAccounts.getAccessToken permission to a service account SA, and there's another IAM policy states service account SA has permission P to a Google Cloud folder F, then user A potentially has access to the Google Cloud folder F. And those advanced analysis results will be included in AnalyzeIamPolicyResponse.service_account_impersonation_analysis. Another example, if the request analyzes for who has permission P to a Google Cloud folder F, and there's an IAM policy states user A has iam.serviceAccounts.actAs permission to a service account SA, and there's another IAM policy states service account SA has permission P to the Google Cloud folder F, then user A potentially has access to the Google Cloud folder F. And those advanced analysis results will be included in AnalyzeIamPolicyResponse.service_account_impersonation_analysis. Only the following permissions are considered in this analysis: \* `iam.serviceAccounts.actAs` \* `iam.serviceAccounts.signBlob` \* `iam.serviceAccounts.signJwt` \* `iam.serviceAccounts.getAccessToken` \* `iam.serviceAccounts.getOpenIdToken` \* `iam.serviceAccounts.implicitDelegation` Default is false. |
| `expandGroups` | boolean | Optional. If true, the identities section of the result will expand any Google groups appearing in an IAM policy binding. If IamPolicyAnalysisQuery.identity_selector is specified, the identity in the result will be determined by the selector, and this flag is not allowed to set. If true, the default max expansion per group is 1000 for AssetService.AnalyzeIamPolicy\]\[\]. Default is false. |
| `expandResources` | boolean | Optional. If true and IamPolicyAnalysisQuery.resource_selector is not specified, the resource section of the result will expand any resource attached to an IAM policy to include resources lower in the resource hierarchy. For example, if the request analyzes for which resources user A has permission P, and the results include an IAM policy with P on a Google Cloud folder, the results will also include resources in that folder with permission P. If true and IamPolicyAnalysisQuery.resource_selector is specified, the resource section of the result will expand the specified resource to include resources lower in the resource hierarchy. Only project or lower resources are supported. Folder and organization resources cannot be used together with this option. For example, if the request analyzes for which users have permission P on a Google Cloud project with this option enabled, the results will include all users who have permission P on that project or any lower resource. If true, the default max expansion per resource is 1000 for AssetService.AnalyzeIamPolicy\]\[\] and 100000 for AssetService.AnalyzeIamPolicyLongrunning\]\[\]. Default is false. |
| `expandRoles` | boolean | Optional. If true, the access section of result will expand any roles appearing in IAM policy bindings to include their permissions. If IamPolicyAnalysisQuery.access_selector is specified, the access section of the result will be determined by the selector, and this flag is not allowed to set. Default is false. |
| `outputGroupEdges` | boolean | Optional. If true, the result will output the relevant membership relationships between groups and other groups, and between groups and principals. Default is false. |
| `outputResourceEdges` | boolean | Optional. If true, the result will output the relevant parent/child relationships between resources. Default is false. |

### `OrgPolicyResult`

- The organization policy result to the query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consolidatedPolicy` | AnalyzerOrgPolicy | The consolidated organization policy for the analyzed resource. The consolidated organization policy is computed by merging and evaluating policy_bundle. The evaluation will respect the organization policy hierarchy rules (https://cloud.google.com/resource-manager/docs/organization-policy/understanding-hierarchy). |
| `folders` | array<string> | The folder(s) that this consolidated policy belongs to, in the format of folders/{FOLDER_NUMBER}. This field is available when the consolidated policy belongs (directly or cascadingly) to one or more folders. |
| `organization` | string | The organization that this consolidated policy belongs to, in the format of organizations/{ORGANIZATION_NUMBER}. This field is available when the consolidated policy belongs (directly or cascadingly) to an organization. |
| `policyBundle` | array<AnalyzerOrgPolicy> | The ordered list of all organization policies from the consolidated_policy.attached_resource. to the scope specified in the request. If the constraint is defined with default policy, it will also appear in the list. |
| `project` | string | The project that this consolidated policy belongs to, in the format of projects/{PROJECT_NUMBER}. This field is available when the consolidated policy belongs to a project. |

### `OsInfo`

- Operating system information for the VM.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string | The system architecture of the operating system. |
| `hostname` | string | The VM hostname. |
| `kernelRelease` | string | The kernel release of the operating system. |
| `kernelVersion` | string | The kernel version of the operating system. |
| `longName` | string | The operating system long name. For example 'Debian GNU/Linux 9' or 'Microsoft Window Server 2019 Datacenter'. |
| `osconfigAgentVersion` | string | The current version of the OS Config agent running on the VM. |
| `shortName` | string | The operating system short name. For example, 'windows' or 'debian'. |
| `version` | string | The version of the operating system. |

### `OutputConfig`

- Output configuration for export assets destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigqueryDestination` | BigQueryDestination | Destination on BigQuery. The output table stores the fields in asset Protobuf as columns in BigQuery. |
| `gcsDestination` | GcsDestination | Destination on Cloud Storage. |

### `OutputConfig` (v1beta1)

- Output configuration for export assets destination.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `gcsDestination` | GcsDestination | Destination on Cloud Storage. |

### `PartitionSpec`

- Specifications of BigQuery partitioned table as export destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitionKey` | string enum | The partition key for BigQuery partitioned table. Values: `PARTITION_KEY_UNSPECIFIED`, `READ_TIME`, `REQUEST_TIME`. |

### `Permissions`

- IAM permissions
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A list of permissions. A sample permission string: `compute.disk.get`. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PolicyInfo`

- The IAM policy and its attached resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachedResource` | string | The full resource name the policy is directly attached to. |
| `policy` | Policy | The IAM policy that's directly attached to the attached_resource. |

### `PubsubDestination`

- A Pub/Sub destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `topic` | string | The name of the Pub/Sub topic to publish to. Example: `projects/PROJECT_ID/topics/TOPIC_ID`. |

### `QueryAssetsOutputConfig`

- Output configuration query assets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigqueryDestination` | GoogleCloudAssetV1QueryAssetsOutputConfigBigQueryDestination | BigQuery destination where the query results will be saved. |

### `QueryAssetsRequest`

- QueryAssets request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobReference` | string | Optional. Reference to the query job, which is from the `QueryAssetsResponse` of previous `QueryAssets` call. |
| `outputConfig` | QueryAssetsOutputConfig | Optional. Destination where the query results will be saved. When this field is specified, the query results won't be saved in the \[QueryAssetsResponse.query_result\]. Instead \[QueryAssetsResponse.output_config\] will be set. Meanwhile, \[QueryAssetsResponse.job_reference\] will be set and can be used to check the status of the query job when passed to a following \[QueryAssets\] API call. |
| `pageSize` | integer (int32) | Optional. The maximum number of rows to return in the results. Responses are limited to 10 MB and 1000 rows. By default, the maximum row count is 1000. When the byte or row count limit is reached, the rest of the query results will be paginated. The field will be ignored when \[output_config\] is specified. |
| `pageToken` | string | Optional. A page token received from previous `QueryAssets`. The field will be ignored when \[output_config\] is specified. |
| `readTime` | string (google-datetime) | Optional. Queries cloud assets as they appeared at the specified point in time. |
| `readTimeWindow` | TimeWindow | Optional. \[start_time\] is required. \[start_time\] must be less than \[end_time\] Defaults \[end_time\] to now if \[start_time\] is set and \[end_time\] isn't. Maximum permitted time range is 7 days. |
| `statement` | string | Optional. A SQL statement that's compatible with BigQuery SQL (https://cloud.google.com/bigquery/docs/introduction-sql). |
| `timeout` | string (google-duration) | Optional. Specifies the maximum amount of time that the client is willing to wait for the query to complete. By default, this limit is 5 min for the first query, and 1 minute for the following queries. If the query is complete, the `done` field in the `QueryAssetsResponse` is true, otherwise false. Like BigQuery jobs.query API (https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query#queryrequest) The call is not guaranteed to wait for the specified timeout; it typically returns after around 200 seconds (200,000 milliseconds), even if the query is not complete. The field will be ignored when \[output_config\] is specified. |

### `QueryAssetsResponse`

- QueryAssets response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | The query response, which can be either an `error` or a valid `response`. If `done` == `false` and the query result is being saved in an output, the output_config field will be set. If `done` == `true`, exactly one of `error`, `query_result` or `output_config` will be set. \[done\] is unset unless the \[QueryAssetsResponse\] contains a \[QueryAssetsResponse.job_reference\]. |
| `error` | Status | Error status. |
| `jobReference` | string | Reference to a query job. |
| `outputConfig` | QueryAssetsOutputConfig | Output configuration, which indicates that instead of being returned in an API response on the fly, the query result will be saved in a specific output. |
| `queryResult` | QueryResult | Result of the query. |

### `QueryContent`

- The query content.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `iamPolicyAnalysisQuery` | IamPolicyAnalysisQuery | An IAM Policy Analysis query, which could be used in the AssetService.AnalyzeIamPolicy RPC or the AssetService.AnalyzeIamPolicyLongrunning RPC. |

### `QueryResult`

- Execution results of the query. The result is formatted as rows represented by BigQuery compatible \[schema\]. When pagination is necessary, it will contains the page token to retrieve the results of following pages.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of the results. |
| `rows` | array<object> | Each row hold a query result in the format of `Struct`. |
| `schema` | TableSchema | Describes the format of the \[rows\]. |
| `totalRows` | string (int64) | Total rows of the whole query results. |

### `RelatedAsset`

- An asset identifier in Google Cloud which contains its name, type and ancestors. An asset can be any resource in the Google Cloud resource hierarchy (https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), a resource outside the Google Cloud resource hierarchy (such as Google Kubernetes Engine clusters and objects), or a policy (e.g. IAM policy). See Supported asset types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ancestors` | array<string> | The ancestors of an asset in Google Cloud resource hierarchy (https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), represented as a list of relative resource names. An ancestry path starts with the closest ancestor in the hierarchy and ends at root. Example: `["projects/123456789", "folders/5432", "organizations/1234"]` |
| `asset` | string | The full name of the asset. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1` See Resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. |
| `assetType` | string | The type of the asset. Example: `compute.googleapis.com/Disk` See Supported asset types (https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information. |
| `relationshipType` | string | The unique identifier of the relationship type. Example: `INSTANCE_TO_INSTANCEGROUP` |

### `RelatedAssets`

- DEPRECATED. This message only presents for the purpose of backward-compatibility. The server will never populate this message in responses. The detailed related assets with the `relationship_type`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assets` | array<RelatedAsset> | The peer resources of the relationship. |
| `relationshipAttributes` | RelationshipAttributes | The detailed relationship attributes. |

### `RelatedResource`

- The detailed related resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetType` | string | The type of the asset. Example: `compute.googleapis.com/Instance` |
| `fullResourceName` | string | The full resource name of the related resource. Example: `//compute.googleapis.com/projects/my_proj_123/zones/instance/instance123` |

### `RelatedResources`

- The related resources of the primary resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `relatedResources` | array<RelatedResource> | The detailed related resources of the primary resource. |

### `RelationshipAttributes`

- DEPRECATED. This message only presents for the purpose of backward-compatibility. The server will never populate this message in responses. The relationship attributes which include `type`, `source_resource_type`, `target_resource_type` and `action`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string | The detail of the relationship, e.g. `contains`, `attaches` |
| `sourceResourceType` | string | The source asset type. Example: `compute.googleapis.com/Instance` |
| `targetResourceType` | string | The target asset type. Example: `compute.googleapis.com/Disk` |
| `type` | string | The unique identifier of the relationship type. Example: `INSTANCE_TO_INSTANCEGROUP` |

### `Resource`

- A representation of a Google Cloud resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | object | The content of the resource, in which some sensitive fields are removed and may not be present. |
| `discoveryDocumentUri` | string | The URL of the discovery document containing the resource's JSON schema. Example: `https://www.googleapis.com/discovery/v1/apis/compute/v1/rest` This value is unspecified for resources that do not have an API based on a discovery document, such as Cloud Bigtable. |
| `discoveryName` | string | The JSON schema name listed in the discovery document. Example: `Project` This value is unspecified for resources that do not have an API based on a discovery document, such as Cloud Bigtable. |
| `location` | string | The location of the resource in Google Cloud, such as its zone and region. For more information, see https://cloud.google.com/about/locations/. |
| `parent` | string | The full name of the immediate parent of this resource. See Resource Names (https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. For Google Cloud assets, this value is the parent resource defined in the IAM policy hierarchy (https://cloud.google.com/iam/docs/overview#policy_hierarchy). Example: `//cloudresourcemanager.googleapis.com/projects/my_project_123` |
| `resourceUrl` | string | The REST URL for accessing the resource. An HTTP `GET` request using this URL returns the resource itself. Example: `https://cloudresourcemanager.googleapis.com/v1/projects/my-project-123` This value is unspecified for resources without a REST API. |
| `version` | string | The API version. Example: `v1` |

### `Resource` (v1p5beta1)

- A representation of a Google Cloud resource.
- Version: v1p5beta1

| Field | Type | Description |
|---|---|---|
| `data` | object | The content of the resource, in which some sensitive fields are removed and may not be present. |
| `discoveryDocumentUri` | string | The URL of the discovery document containing the resource's JSON schema. Example: `https://www.googleapis.com/discovery/v1/apis/compute/v1/rest` This value is unspecified for resources that do not have an API based on a discovery document, such as Cloud Bigtable. |
| `discoveryName` | string | The JSON schema name listed in the discovery document. Example: `Project` This value is unspecified for resources that do not have an API based on a discovery document, such as Cloud Bigtable. |
| `parent` | string | The full name of the immediate parent of this resource. See Resource Names (https://cloud.google.com/apis/design/resource_names#full_resource_name) for more information. For Google Cloud assets, this value is the parent resource defined in the IAM policy hierarchy (https://cloud.google.com/iam/docs/overview#policy_hierarchy). Example: `//cloudresourcemanager.googleapis.com/projects/my_project_123` For third-party assets, this field may be set differently. |
| `resourceUrl` | string | The REST URL for accessing the resource. An HTTP `GET` request using this URL returns the resource itself. Example: `https://cloudresourcemanager.googleapis.com/v1/projects/my-project-123` This value is unspecified for resources without a REST API. |
| `version` | string | The API version. Example: "v1". |

### `ResourceOwners`

- The resource owners information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceOwners` | array<string> | List of resource owners. |

### `ResourceSearchResult`

- A result of Resource Search, containing information of a cloud resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalAttributes` | object | The additional searchable attributes of this resource. The attributes may vary from one resource type to another. Examples: `projectId` for Project, `dnsName` for DNS ManagedZone. This field contains a subset of the resource metadata fields that are returned by the List or Get APIs provided by the corresponding Google Cloud service (e.g., Compute Engine). see API references and supported searchable attributes (https://cloud.google.com/asset-inventory/docs/supported-asset-types) to see which fields are included. You can search values of these fields through free text search. However, you should not consume the field programically as the field names and values may change as the Google Cloud service updates to a new incompatible API version. To search against the `additional_attributes`: \* Use a free text query to match the attributes values. Example: to search `additional_attributes = { dnsName: "foobar" }`, you can issue a query `foobar`. |
| `assetType` | string | The type of this resource. Example: `compute.googleapis.com/Disk`. To search against the `asset_type`: \* Specify the `asset_type` field in your search request. |
| `attachedResources` | array<AttachedResource> | Attached resources of this resource. For example, an OSConfig Inventory is an attached resource of a Compute Instance. This field is repeated because a resource could have multiple attached resources. This `attached_resources` field is not searchable. Some attributes of the attached resources are exposed in `additional_attributes` field, so as to allow users to search on them. |
| `createTime` | string (google-datetime) | The create timestamp of this resource, at which the resource was created. The granularity is in seconds. Timestamp.nanos will always be 0. This field is available only when the resource's Protobuf contains it. To search against `create_time`: \* Use a field query. - value in seconds since unix epoch. Example: `createTime > 1609459200` - value in date string. Example: `createTime > 2021-01-01` - value in date-time string (must be quoted). Example: `createTime > "2021-01-01T00:00:00"` |
| `description` | string | One or more paragraphs of text description of this resource. Maximum length could be up to 1M bytes. This field is available only when the resource's Protobuf contains it. To search against the `description`: \* Use a field query. Example: `description:"important instance"` \* Use a free text query. Example: `"important instance"` |
| `displayName` | string | The display name of this resource. This field is available only when the resource's Protobuf contains it. To search against the `display_name`: \* Use a field query. Example: `displayName:"My Instance"` \* Use a free text query. Example: `"My Instance"` |
| `effectiveTags` | array<EffectiveTagDetails> | The effective tags on this resource. All of the tags that are both attached to and inherited by a resource are collectively called the effective tags. For more information, see tag inheritance (https://cloud.google.com/resource-manager/docs/tags/tags-overview#inheritance). To search against the `effective_tags`: \* Use a field query. Example: - `effectiveTagKeys:"123456789/env*"` - `effectiveTagKeys="123456789/env"` - `effectiveTagKeys:"env"` - `effectiveTagKeyIds="tagKeys/123"` - `effectiveTagValues:"env"` - `effectiveTagValues:"env/prod"` - `effectiveTagValues:"123456789/env/prod*"` - `effectiveTagValues="123456789/env/prod"` - `effectiveTagValueIds="tagValues/456"` |
| `enrichments` | array<AssetEnrichment> | Enrichments of the asset. Currently supported enrichment types with SearchAllResources API: \* RESOURCE_OWNERS The corresponding read masks in order to get the enrichment: \* enrichments.resource_owners The corresponding required permissions: \* cloudasset.assets.searchEnrichmentResourceOwners Example query to get resource owner enrichment: scope: "projects/my-project" query: "name: my-project" assetTypes: "cloudresourcemanager.googleapis.com/Project" readMask: { paths: "asset_type" paths: "name" paths: "enrichments.resource_owners" } |
| `folders` | array<string> | The folder(s) that this resource belongs to, in the form of folders/{FOLDER_NUMBER}. This field is available when the resource belongs to one or more folders. To search against `folders`: \* Use a field query. Example: `folders:(123 OR 456)` \* Use a free text query. Example: `123` \* Specify the `scope` field as this folder in your search request. |
| `kmsKey` | string | The Cloud KMS CryptoKey (https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys) name or CryptoKeyVersion (https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions) name. This field only presents for the purpose of backward compatibility. Use the `kms_keys` field to retrieve Cloud KMS key information. This field is available only when the resource's Protobuf contains it and will only be populated for these resource types (https://cloud.google.com/asset-inventory/docs/legacy-field-names#resource_types_with_the_to_be_deprecated_kmskey_field) for backward compatible purposes. To search against the `kms_key`: \* Use a field query. Example: `kmsKey:key` \* Use a free text query. Example: `key` |
| `kmsKeys` | array<string> | The Cloud KMS CryptoKey (https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys) names or CryptoKeyVersion (https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions) names. This field is available only when the resource's Protobuf contains it. To search against the `kms_keys`: \* Use a field query. Example: `kmsKeys:key` \* Use a free text query. Example: `key` |
| `labels` | object | User labels associated with this resource. See Labelling and grouping Google Cloud resources (https://cloud.google.com/blog/products/gcp/labelling-and-grouping-your-google-cloud-platform-resources) for more information. This field is available only when the resource's Protobuf contains it. To search against the `labels`: \* Use a field query: - query on any label's key or value. Example: `labels:prod` - query by a given label. Example: `labels.env:prod` - query by a given label's existence. Example: `labels.env:*` \* Use a free text query. Example: `prod` |
| `location` | string | Location can be `global`, regional like `us-east1`, or zonal like `us-west1-b`. This field is available only when the resource's Protobuf contains it. To search against the `location`: \* Use a field query. Example: `location:us-west*` \* Use a free text query. Example: `us-west*` |
| `name` | string | The full resource name of this resource. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. See Cloud Asset Inventory Resource Name Format (https://cloud.google.com/asset-inventory/docs/resource-name-format) for more information. To search against the `name`: \* Use a field query. Example: `name:instance1` \* Use a free text query. Example: `instance1` |
| `networkTags` | array<string> | Network tags associated with this resource. Like labels, network tags are a type of annotations used to group Google Cloud resources. See Labelling Google Cloud resources (https://cloud.google.com/blog/products/gcp/labelling-and-grouping-your-google-cloud-platform-resources) for more information. This field is available only when the resource's Protobuf contains it. To search against the `network_tags`: \* Use a field query. Example: `networkTags:internal` \* Use a free text query. Example: `internal` |
| `organization` | string | The organization that this resource belongs to, in the form of organizations/{ORGANIZATION_NUMBER}. This field is available when the resource belongs to an organization. To search against `organization`: \* Use a field query. Example: `organization:123` \* Use a free text query. Example: `123` \* Specify the `scope` field as this organization in your search request. |
| `parentAssetType` | string | The type of this resource's immediate parent, if there is one. To search against the `parent_asset_type`: \* Use a field query. Example: `parentAssetType:"cloudresourcemanager.googleapis.com/Project"` \* Use a free text query. Example: `cloudresourcemanager.googleapis.com/Project` |
| `parentFullResourceName` | string | The full resource name of this resource's parent, if it has one. To search against the `parent_full_resource_name`: \* Use a field query. Example: `parentFullResourceName:"project-name"` \* Use a free text query. Example: `project-name` |
| `project` | string | The project that this resource belongs to, in the form of projects/{PROJECT_NUMBER}. This field is available when the resource belongs to a project. To search against `project`: \* Use a field query. Example: `project:12345` \* Use a free text query. Example: `12345` \* Specify the `scope` field as this project in your search request. |
| `relationships` | object | A map of related resources of this resource, keyed by the relationship type. A relationship type is in the format of {SourceType}\_{ACTION}\_{DestType}. Example: `DISK_TO_INSTANCE`, `DISK_TO_NETWORK`, `INSTANCE_TO_INSTANCEGROUP`. See supported relationship types (https://cloud.google.com/asset-inventory/docs/supported-asset-types#supported_relationship_types). |
| `sccSecurityMarks` | object | The actual content of Security Command Center security marks associated with the asset. To search against SCC SecurityMarks field: \* Use a field query: - query by a given key value pair. Example: `sccSecurityMarks.foo=bar` - query by a given key's existence. Example: `sccSecurityMarks.foo:*` |
| `state` | string | The state of this resource. Different resources types have different state definitions that are mapped from various fields of different resource types. This field is available only when the resource's Protobuf contains it. Example: If the resource is an instance provided by Compute Engine, its state will include PROVISIONING, STAGING, RUNNING, STOPPING, SUSPENDING, SUSPENDED, REPAIRING, and TERMINATED. See `status` definition in API Reference (https://cloud.google.com/compute/docs/reference/rest/v1/instances). If the resource is a project provided by Resource Manager, its state will include LIFECYCLE_STATE_UNSPECIFIED, ACTIVE, DELETE_REQUESTED and DELETE_IN_PROGRESS. See `lifecycleState` definition in API Reference (https://cloud.google.com/resource-manager/reference/rest/v1/projects). To search against the `state`: \* Use a field query. Example: `state:RUNNING` \* Use a free text query. Example: `RUNNING` |
| `tagKeys` | array<string> | This field is only present for the purpose of backward compatibility. Use the `tags` field instead. TagKey namespaced names, in the format of {ORG_ID}/{TAG_KEY_SHORT_NAME}. To search against the `tagKeys`: \* Use a field query. Example: - `tagKeys:"123456789/env*"` - `tagKeys="123456789/env"` - `tagKeys:"env"` \* Use a free text query. Example: - `env` |
| `tagValueIds` | array<string> | This field is only present for the purpose of backward compatibility. Use the `tags` field instead. TagValue IDs, in the format of tagValues/{TAG_VALUE_ID}. To search against the `tagValueIds`: \* Use a field query. Example: - `tagValueIds="tagValues/456"` \* Use a free text query. Example: - `456` |
| `tagValues` | array<string> | This field is only present for the purpose of backward compatibility. Use the `tags` field instead. TagValue namespaced names, in the format of {ORG_ID}/{TAG_KEY_SHORT_NAME}/{TAG_VALUE_SHORT_NAME}. To search against the `tagValues`: \* Use a field query. Example: - `tagValues:"env"` - `tagValues:"env/prod"` - `tagValues:"123456789/env/prod*"` - `tagValues="123456789/env/prod"` \* Use a free text query. Example: - `prod` |
| `tags` | array<Tag> | The tags directly attached to this resource. To search against the `tags`: \* Use a field query. Example: - `tagKeys:"123456789/env*"` - `tagKeys="123456789/env"` - `tagKeys:"env"` - `tagKeyIds="tagKeys/123"` - `tagValues:"env"` - `tagValues:"env/prod"` - `tagValues:"123456789/env/prod*"` - `tagValues="123456789/env/prod"` - `tagValueIds="tagValues/456"` \* Use a free text query. Example: - `env/prod` |
| `updateTime` | string (google-datetime) | The last update timestamp of this resource, at which the resource was last modified or deleted. The granularity is in seconds. Timestamp.nanos will always be 0. This field is available only when the resource's Protobuf contains it. To search against `update_time`: \* Use a field query. - value in seconds since unix epoch. Example: `updateTime < 1609459200` - value in date string. Example: `updateTime < 2021-01-01` - value in date-time string (must be quoted). Example: `updateTime < "2021-01-01T00:00:00"` |
| `versionedResources` | array<VersionedResource> | Versioned resource representations of this resource. This is repeated because there could be multiple versions of resource representations during version migration. This `versioned_resources` field is not searchable. Some attributes of the resource representations are exposed in `additional_attributes` field, so as to allow users to search on them. |

### `ResourceSelector`

- Specifies the resource to analyze for access policies, which may be set directly on the resource, or on ancestors such as organizations, folders or projects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullResourceName` | string | Required. The \[full resource name\] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of a resource of supported resource types (https://cloud.google.com/asset-inventory/docs/supported-asset-types#analyzable_asset_types). |

### `SavedQuery`

- A saved query which can be shared with others or used later.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | QueryContent | The query content. |
| `createTime` | string (google-datetime) | Output only. The create time of this saved query. |
| `creator` | string | Output only. The account's email address who has created this saved query. |
| `description` | string | The description of this saved query. This value should be fewer than 255 characters. |
| `labels` | object | Labels applied on the resource. This value should not contain more than 10 entries. The key and value of each entry must be non-empty and fewer than 64 characters. |
| `lastUpdateTime` | string (google-datetime) | Output only. The last update time of this saved query. |
| `lastUpdater` | string | Output only. The account's email address who has updated this saved query most recently. |
| `name` | string | The resource name of the saved query. The format must be: \* projects/project_number/savedQueries/saved_query_id \* folders/folder_number/savedQueries/saved_query_id \* organizations/organization_number/savedQueries/saved_query_id |

### `SearchAllIamPoliciesResponse`

- Search all IAM policies response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Set if there are more results than those appearing in this response; to get the next set of results, call this method again, using this value as the `page_token`. |
| `results` | array<IamPolicySearchResult> | A list of IAM policies that match the search query. Related information such as the associated resource is returned along with the policy. |

### `SearchAllResourcesResponse`

- Search all resources response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there are more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `results` | array<ResourceSearchResult> | A list of Resources that match the search query. It contains the resource standard metadata information. |

### `SearchAllResourcesResponse` (v1p1beta1)

- Search all resources response.
- Version: v1p1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there are more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `results` | array<StandardResourceMetadata> | A list of resource that match the search query. |

### Shape of `AccessSelector`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "permissions": "array<string>",
  "roles": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1p7beta1, v1p5beta1, v1p1beta1, v1beta1 of `cloudasset` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://cloudasset.googleapis.com/$discovery/rest?version=v1, https://cloudasset.googleapis.com/$discovery/rest?version=v1p7beta1, https://cloudasset.googleapis.com/$discovery/rest?version=v1p5beta1, https://cloudasset.googleapis.com/$discovery/rest?version=v1p1beta1, https://cloudasset.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
