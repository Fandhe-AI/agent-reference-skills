---
source: https://cloudasset.googleapis.com/$discovery/rest?version=v1p7beta1
---

# Cloud Asset API REST API (cloudasset)

## Signature / Usage

Base URL: `https://cloudasset.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1p1beta1).

### `cloudasset.assets.list`

- Versions: v1, v1p5beta1
- `GET https://cloudasset.googleapis.com/v1/{+parent}/assets`
- Lists assets with time and resource types and returns paged results in response.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudasset`
- Request: —; Response: `ListAssetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the organization, folder, or project the assets belong to. Format: "organizations/\[organization-number\]" (such as "organizations/123"), "projects/\[project-id\]" (such as "projects/my-project-id"), "projects/\[project-number\]" (such as "projects/12345"), or "folders/\[folder-number\]" (such as "folders/12345"). |
| `assetTypes` | query | repeated string | no | A list of asset types to take a snapshot for. For example: "compute.googleapis.com/Disk". Regular expression is also supported. For example: \* "compute.googleapis.com.\*" snapshots resources whose asset type starts with "compute.googleapis.com". \* ".\*Instance" snapshots resources whose asset type ends with "Instance". \* ".\*Instance.\*" snapshots resources whose asset type contains "Instance". See RE2 (https://github.com/google/re2/wiki/Syntax) for all supported regular expression syntax. If the regular expression does not match any supported asset type, an INVALID_ARGUMENT error will be returned. If specified, only matching assets will be returned, otherwise, it will snapshot all asset types. See Introduction to Cloud Asset Inventory (https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types. |
| `contentType` | query | string enum | no | Asset content type. If not specified, no content but the asset name will be returned. |
| `pageSize` | query | integer (int32) | no | The maximum number of assets to be returned in a single response. Default is 100, minimum is 1, and maximum is 1000. |
| `pageToken` | query | string | no | The `next_page_token` returned from the previous `ListAssetsResponse`, or unspecified for the first `ListAssetsRequest`. It is a continuation of a prior `ListAssets` call, and the API should return the next page of assets. |
| `readTime` | query | string (google-datetime) | no | Timestamp to take an asset snapshot. This can only be set to a timestamp between the current time and the current time minus 35 days (inclusive). If not specified, the current time will be used. Due to delays in resource data collection and indexing, there is a volatile window during which running the same query may get different results. |
| `relationshipTypes` | query | repeated string | no | A list of relationship types to output, for example: `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if content_type=RELATIONSHIP. \* If specified: it snapshots specified relationships. It returns an error if any of the \[relationship_types\] doesn't belong to the supported relationship types of the \[asset_types\] or if any of the \[asset_types\] doesn't belong to the source types of the \[relationship_types\]. \* Otherwise: it snapshots the supported relationships for all \[asset_types\] or returns an error if any of the \[asset_types\] has no relationship support. An unspecified asset types field means all supported asset_types. See Introduction to Cloud Asset Inventory (https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types and relationship types. |

### `cloudasset.effectiveIamPolicies.batchGet`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+scope}/effectiveIamPolicies:batchGet`
- Gets effective IAM policies for a batch of resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BatchGetEffectiveIamPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. Only IAM policies on or below the scope will be returned. This can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). To know how to get organization ID, visit here (https://cloud.google.com/resource-manager/docs/creating-managing-organization#retrieving_your_organization_id). To know how to get folder or project ID, visit here (https://cloud.google.com/resource-manager/docs/creating-managing-folders#viewing_or_listing_folders_and_projects). |
| `names` | query | repeated string | yes | Required. The names refer to the \[full_resource_names\] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the asset types supported by search APIs (https://cloud.google.com/asset-inventory/docs/supported-asset-types). A maximum of 20 resources' effective policies can be retrieved in a batch. |

### `cloudasset.feeds.create`

- Versions: v1
- `POST https://cloudasset.googleapis.com/v1/{+parent}/feeds`
- Creates a feed in a parent project/folder/organization to listen to its asset updates.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateFeedRequest`; Response: `Feed`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project/folder/organization where this feed should be created in. It can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). |

### `cloudasset.feeds.delete`

- Versions: v1
- `DELETE https://cloudasset.googleapis.com/v1/{+name}`
- Deletes an asset feed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the feed and it must be in the format of: projects/project_number/feeds/feed_id folders/folder_number/feeds/feed_id organizations/organization_number/feeds/feed_id |

### `cloudasset.feeds.get`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+name}`
- Gets details about an asset feed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Feed`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Feed and it must be in the format of: projects/project_number/feeds/feed_id folders/folder_number/feeds/feed_id organizations/organization_number/feeds/feed_id |

### `cloudasset.feeds.list`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+parent}/feeds`
- Lists all asset feeds in a parent project/folder/organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListFeedsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent project/folder/organization whose feeds are to be listed. It can only be using project/folder/organization number (such as "folders/12345")", or a project ID (such as "projects/my-project-id"). |

### `cloudasset.feeds.patch`

- Versions: v1
- `PATCH https://cloudasset.googleapis.com/v1/{+name}`
- Updates an asset feed configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UpdateFeedRequest`; Response: `Feed`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The format will be projects/{project_number}/feeds/{client-assigned_feed_identifier} or folders/{folder_number}/feeds/{client-assigned_feed_identifier} or organizations/{organization_number}/feeds/{client-assigned_feed_identifier} The client-assigned feed identifier must be unique within the parent project/folder/organization. |

### `cloudasset.folders.exportAssets`

- Versions: v1beta1
- `POST https://cloudasset.googleapis.com/v1beta1/{+parent}:exportAssets`
- Exports assets with time and resource types to a given Cloud Storage location. The output format is newline-delimited JSON. This API implements the google.longrunning.Operation API allowing you to keep track of the export. We recommend intervals of at least 2 seconds with exponential retry to poll the export operation result. For regular-size resource parent, the export operation usually finishes within 5 minutes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportAssetsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The relative name of the root asset. This can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id"), a project number (such as "projects/12345"), or a folder number (such as "folders/123"). |

### `cloudasset.folders.operations.get`

- Versions: v1beta1
- `GET https://cloudasset.googleapis.com/v1beta1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudasset`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudasset.iamPolicies.searchAll`

- Versions: v1p1beta1
- `GET https://cloudasset.googleapis.com/v1p1beta1/{+scope}/iamPolicies:searchAll`
- Searches all the IAM policies within a given accessible Resource Manager scope (project/folder/organization). This RPC gives callers especially administrators the ability to search all the IAM policies within a scope, even if they don't have `.getIamPolicy` permission of all the IAM policies. Callers should have `cloudasset.assets.searchAllIamPolicies` permission on the requested scope, otherwise the request will be rejected.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchAllIamPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. The relative name of an asset. The search is limited to the resources within the `scope`. The allowed value must be: \* Organization number (such as "organizations/123") \* Folder number (such as "folders/1234") \* Project number (such as "projects/12345") \* Project ID (such as "projects/abc") |
| `pageSize` | query | integer (int32) | no | Optional. The page size for search result pagination. Page size is capped at 500 even if a larger value is given. If set to zero, server will pick an appropriate default. Returned results may be fewer than requested. When this happens, there could be more results as long as `next_page_token` is returned. |
| `pageToken` | query | string | no | Optional. If present, retrieve the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of all other method parameters must be identical to those in the previous call. |
| `query` | query | string | no | Optional. The query statement. Examples: \* "policy:myuser@mydomain.com" \* "policy:(myuser@mydomain.com viewer)" |

### `cloudasset.operations.get`

- Versions: v1p7beta1, v1
- `GET https://cloudasset.googleapis.com/v1p7beta1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudasset`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudasset.organizations.batchGetAssetsHistory`

- Versions: v1beta1
- `GET https://cloudasset.googleapis.com/v1beta1/{+parent}:batchGetAssetsHistory`
- Batch gets the update history of assets that overlap a time window. For IAM_POLICY content, this API outputs history when the asset and its attached IAM POLICY both exist. This can create gaps in the output history. Otherwise, this API outputs history with asset in both non-delete or deleted status. If a specified asset does not exist, this API returns an INVALID_ARGUMENT error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BatchGetAssetsHistoryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The relative name of the root asset. It can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id")", or a project number (such as "projects/12345"). |
| `assetNames` | query | repeated string | no | A list of the full names of the assets. For example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. See Resource Names (https://cloud.google.com/apis/design/resource_names#full_resource_name) for more info. The request becomes a no-op if the asset name list is empty, and the max size of the asset name list is 100 in one request. |
| `contentType` | query | string enum | no | Optional. The content type. |
| `readTimeWindow.endTime` | query | string (google-datetime) | no | End time of the time window (inclusive). If not specified, the current timestamp is used instead. |
| `readTimeWindow.startTime` | query | string (google-datetime) | no | Start time of the time window (exclusive). |

### `cloudasset.organizations.exportAssets`

- Versions: v1beta1
- `POST https://cloudasset.googleapis.com/v1beta1/{+parent}:exportAssets`
- Exports assets with time and resource types to a given Cloud Storage location. The output format is newline-delimited JSON. This API implements the google.longrunning.Operation API allowing you to keep track of the export. We recommend intervals of at least 2 seconds with exponential retry to poll the export operation result. For regular-size resource parent, the export operation usually finishes within 5 minutes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportAssetsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The relative name of the root asset. This can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id"), a project number (such as "projects/12345"), or a folder number (such as "folders/123"). |

### `cloudasset.organizations.operations.get`

- Versions: v1beta1
- `GET https://cloudasset.googleapis.com/v1beta1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudasset`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudasset.projects.batchGetAssetsHistory`

- Versions: v1beta1
- `GET https://cloudasset.googleapis.com/v1beta1/{+parent}:batchGetAssetsHistory`
- Batch gets the update history of assets that overlap a time window. For IAM_POLICY content, this API outputs history when the asset and its attached IAM POLICY both exist. This can create gaps in the output history. Otherwise, this API outputs history with asset in both non-delete or deleted status. If a specified asset does not exist, this API returns an INVALID_ARGUMENT error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BatchGetAssetsHistoryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The relative name of the root asset. It can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id")", or a project number (such as "projects/12345"). |
| `assetNames` | query | repeated string | no | A list of the full names of the assets. For example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. See Resource Names (https://cloud.google.com/apis/design/resource_names#full_resource_name) for more info. The request becomes a no-op if the asset name list is empty, and the max size of the asset name list is 100 in one request. |
| `contentType` | query | string enum | no | Optional. The content type. |
| `readTimeWindow.endTime` | query | string (google-datetime) | no | End time of the time window (inclusive). If not specified, the current timestamp is used instead. |
| `readTimeWindow.startTime` | query | string (google-datetime) | no | Start time of the time window (exclusive). |

### `cloudasset.projects.exportAssets`

- Versions: v1beta1
- `POST https://cloudasset.googleapis.com/v1beta1/{+parent}:exportAssets`
- Exports assets with time and resource types to a given Cloud Storage location. The output format is newline-delimited JSON. This API implements the google.longrunning.Operation API allowing you to keep track of the export. We recommend intervals of at least 2 seconds with exponential retry to poll the export operation result. For regular-size resource parent, the export operation usually finishes within 5 minutes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportAssetsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The relative name of the root asset. This can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id"), a project number (such as "projects/12345"), or a folder number (such as "folders/123"). |

### `cloudasset.projects.operations.get`

- Versions: v1beta1
- `GET https://cloudasset.googleapis.com/v1beta1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudasset`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudasset.resources.searchAll`

- Versions: v1p1beta1
- `GET https://cloudasset.googleapis.com/v1p1beta1/{+scope}/resources:searchAll`
- Searches all the resources within a given accessible Resource Manager scope (project/folder/organization). This RPC gives callers especially administrators the ability to search all the resources within a scope, even if they don't have `.get` permission of all the resources. Callers should have `cloudasset.assets.searchAllResources` permission on the requested scope, otherwise the request will be rejected.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchAllResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. The relative name of an asset. The search is limited to the resources within the `scope`. The allowed value must be: \* Organization number (such as "organizations/123") \* Folder number (such as "folders/1234") \* Project number (such as "projects/12345") \* Project ID (such as "projects/abc") |
| `assetTypes` | query | repeated string | no | Optional. A list of asset types that this request searches for. If empty, it will search all the supported asset types. |
| `orderBy` | query | string | no | Optional. A comma separated list of fields specifying the sorting order of the results. The default order is ascending. Add ` DESC` after the field name to indicate descending order. Redundant space characters are ignored. For example, ` location DESC , name `. |
| `pageSize` | query | integer (int32) | no | Optional. The page size for search result pagination. Page size is capped at 500 even if a larger value is given. If set to zero, server will pick an appropriate default. Returned results may be fewer than requested. When this happens, there could be more results as long as `next_page_token` is returned. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of all other method parameters, must be identical to those in the previous call. |
| `query` | query | string | no | Optional. The query statement. |

### `cloudasset.savedQueries.create`

- Versions: v1
- `POST https://cloudasset.googleapis.com/v1/{+parent}/savedQueries`
- Creates a saved query in a parent project/folder/organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SavedQuery`; Response: `SavedQuery`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project/folder/organization where this saved_query should be created in. It can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). |
| `savedQueryId` | query | string | yes | Required. The ID to use for the saved query, which must be unique in the specified parent. It will become the final component of the saved query's resource name. This value should be 4-63 characters, and valid characters are `a-z-`. Notice that this field is required in the saved query creation, and the `name` field of the `saved_query` will be ignored. |

### `cloudasset.savedQueries.delete`

- Versions: v1
- `DELETE https://cloudasset.googleapis.com/v1/{+name}`
- Deletes a saved query.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the saved query to delete. It must be in the format of: \* projects/project_number/savedQueries/saved_query_id \* folders/folder_number/savedQueries/saved_query_id \* organizations/organization_number/savedQueries/saved_query_id |

### `cloudasset.savedQueries.get`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+name}`
- Gets details about a saved query.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SavedQuery`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the saved query and it must be in the format of: \* projects/project_number/savedQueries/saved_query_id \* folders/folder_number/savedQueries/saved_query_id \* organizations/organization_number/savedQueries/saved_query_id |

### `cloudasset.savedQueries.list`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+parent}/savedQueries`
- Lists all saved queries in a parent project/folder/organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSavedQueriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent project/folder/organization whose savedQueries are to be listed. It can only be using project/folder/organization number (such as "folders/12345")", or a project ID (such as "projects/my-project-id"). |
| `filter` | query | string | no | Optional. The expression to filter resources. The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. When `AND` and `OR` are both used in the expression, parentheses must be appropriately used to group the combinations. The expression may also contain regular expressions. See https://google.aip.dev/160 for more information on the grammar. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of saved queries to return per page. The service may return fewer than this value. If unspecified, at most 50 will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListSavedQueries` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSavedQueries` must match the call that provided the page token. |

### `cloudasset.savedQueries.patch`

- Versions: v1
- `PATCH https://cloudasset.googleapis.com/v1/{+name}`
- Updates a saved query.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SavedQuery`; Response: `SavedQuery`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the saved query. The format must be: \* projects/project_number/savedQueries/saved_query_id \* folders/folder_number/savedQueries/saved_query_id \* organizations/organization_number/savedQueries/saved_query_id |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. |

### `cloudasset.analyzeIamPolicy`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+scope}:analyzeIamPolicy`
- Analyzes IAM policies to answer which identities have what accesses on which resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudasset`
- Request: —; Response: `AnalyzeIamPolicyResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. The relative name of the root asset. Only resources and IAM policies within the scope will be analyzed. This can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). To know how to get organization ID, visit here (https://cloud.google.com/resource-manager/docs/creating-managing-organization#retrieving_your_organization_id). To know how to get folder or project ID, visit here (https://cloud.google.com/resource-manager/docs/creating-managing-folders#viewing_or_listing_folders_and_projects). |
| `analysisQuery.accessSelector.permissions` | query | repeated string | no | Optional. The permissions to appear in result. |
| `analysisQuery.accessSelector.roles` | query | repeated string | no | Optional. The roles to appear in result. |
| `analysisQuery.conditionContext.accessTime` | query | string (google-datetime) | no | The hypothetical access timestamp to evaluate IAM conditions. Note that this value must not be earlier than the current time; otherwise, an INVALID_ARGUMENT error will be returned. |
| `analysisQuery.identitySelector.identity` | query | string | yes | Required. The identity appear in the form of principals in IAM policy binding (https://cloud.google.com/iam/reference/rest/v1/Binding). The examples of supported forms are: "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com". Notice that wildcard characters (such as \* and ?) are not supported. You must give a specific identity. |
| `analysisQuery.options.analyzeServiceAccountImpersonation` | query | boolean | no | Optional. If true, the response will include access analysis from identities to resources via service account impersonation. This is a very expensive operation, because many derived queries will be executed. We highly recommend you use AssetService.AnalyzeIamPolicyLongrunning RPC instead. For example, if the request analyzes for which resources user A has permission P, and there's an IAM policy states user A has iam.serviceAccounts.getAccessToken permission to a service account SA, and there's another IAM policy states service account SA has permission P to a Google Cloud folder F, then user A potentially has access to the Google Cloud folder F. And those advanced analysis results will be included in AnalyzeIamPolicyResponse.service_account_impersonation_analysis. Another example, if the request analyzes for who has permission P to a Google Cloud folder F, and there's an IAM policy states user A has iam.serviceAccounts.actAs permission to a service account SA, and there's another IAM policy states service account SA has permission P to the Google Cloud folder F, then user A potentially has access to the Google Cloud folder F. And those advanced analysis results will be included in AnalyzeIamPolicyResponse.service_account_impersonation_analysis. Only the following permissions are considered in this analysis: \* `iam.serviceAccounts.actAs` \* `iam.serviceAccounts.signBlob` \* `iam.serviceAccounts.signJwt` \* `iam.serviceAccounts.getAccessToken` \* `iam.serviceAccounts.getOpenIdToken` \* `iam.serviceAccounts.implicitDelegation` Default is false. |
| `analysisQuery.options.expandGroups` | query | boolean | no | Optional. If true, the identities section of the result will expand any Google groups appearing in an IAM policy binding. If IamPolicyAnalysisQuery.identity_selector is specified, the identity in the result will be determined by the selector, and this flag is not allowed to set. If true, the default max expansion per group is 1000 for AssetService.AnalyzeIamPolicy\]\[\]. Default is false. |
| `analysisQuery.options.expandResources` | query | boolean | no | Optional. If true and IamPolicyAnalysisQuery.resource_selector is not specified, the resource section of the result will expand any resource attached to an IAM policy to include resources lower in the resource hierarchy. For example, if the request analyzes for which resources user A has permission P, and the results include an IAM policy with P on a Google Cloud folder, the results will also include resources in that folder with permission P. If true and IamPolicyAnalysisQuery.resource_selector is specified, the resource section of the result will expand the specified resource to include resources lower in the resource hierarchy. Only project or lower resources are supported. Folder and organization resources cannot be used together with this option. For example, if the request analyzes for which users have permission P on a Google Cloud project with this option enabled, the results will include all users who have permission P on that project or any lower resource. If true, the default max expansion per resource is 1000 for AssetService.AnalyzeIamPolicy\]\[\] and 100000 for AssetService.AnalyzeIamPolicyLongrunning\]\[\]. Default is false. |
| `analysisQuery.options.expandRoles` | query | boolean | no | Optional. If true, the access section of result will expand any roles appearing in IAM policy bindings to include their permissions. If IamPolicyAnalysisQuery.access_selector is specified, the access section of the result will be determined by the selector, and this flag is not allowed to set. Default is false. |
| `analysisQuery.options.outputGroupEdges` | query | boolean | no | Optional. If true, the result will output the relevant membership relationships between groups and other groups, and between groups and principals. Default is false. |
| `analysisQuery.options.outputResourceEdges` | query | boolean | no | Optional. If true, the result will output the relevant parent/child relationships between resources. Default is false. |
| `analysisQuery.resourceSelector.fullResourceName` | query | string | yes | Required. The \[full resource name\] (https://cloud.google.com/asset-inventory/docs/resource-name-format) of a resource of supported resource types (https://cloud.google.com/asset-inventory/docs/supported-asset-types#analyzable_asset_types). |
| `executionTimeout` | query | string (google-duration) | no | Optional. Amount of time executable has to complete. See JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json). If this field is set with a value less than the RPC deadline, and the execution of your query hasn't finished in the specified execution timeout, you will get a response with partial result. Otherwise, your query's execution will continue until the RPC deadline. If it's not finished until then, you will get a DEADLINE_EXCEEDED error. Default is empty. |
| `savedAnalysisQuery` | query | string | no | Optional. The name of a saved query, which must be in the format of: \* projects/project_number/savedQueries/saved_query_id \* folders/folder_number/savedQueries/saved_query_id \* organizations/organization_number/savedQueries/saved_query_id If both `analysis_query` and `saved_analysis_query` are provided, they will be merged together with the `saved_analysis_query` as base and the `analysis_query` as overrides. For more details of the merge behavior, refer to the MergeFrom (https://developers.google.com/protocol-buffers/docs/reference/cpp/google.protobuf.message#Message.MergeFrom.details) page. Note that you cannot override primitive fields with default value, such as 0 or empty string, etc., because we use proto3, which doesn't support field presence yet. |

### `cloudasset.analyzeIamPolicyLongrunning`

- Versions: v1
- `POST https://cloudasset.googleapis.com/v1/{+scope}:analyzeIamPolicyLongrunning`
- Analyzes IAM policies asynchronously to answer which identities have what accesses on which resources, and writes the analysis results to a Google Cloud Storage or a BigQuery destination. For Cloud Storage destination, the output format is the JSON format that represents a AnalyzeIamPolicyResponse. This method implements the google.longrunning.Operation, which allows you to track the operation status. We recommend intervals of at least 2 seconds with exponential backoff retry to poll the operation result. The metadata contains the metadata for the long-running operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudasset`
- Request: `AnalyzeIamPolicyLongrunningRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. The relative name of the root asset. Only resources and IAM policies within the scope will be analyzed. This can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). To know how to get organization ID, visit here (https://cloud.google.com/resource-manager/docs/creating-managing-organization#retrieving_your_organization_id). To know how to get folder or project ID, visit here (https://cloud.google.com/resource-manager/docs/creating-managing-folders#viewing_or_listing_folders_and_projects). |

### `cloudasset.analyzeMove`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+resource}:analyzeMove`
- Analyze moving a resource to a specified destination without kicking off the actual move. The analysis is best effort depending on the user's permissions of viewing different hierarchical policies and configurations. The policies and configuration are subject to change before the actual resource migration takes place.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AnalyzeMoveResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Required. Name of the resource to perform the analysis against. Only Google Cloud projects are supported as of today. Hence, this can only be a project ID (such as "projects/my-project-id") or a project number (such as "projects/12345"). |
| `destinationParent` | query | string | yes | Required. Name of the Google Cloud folder or organization to reparent the target resource. The analysis will be performed against hypothetically moving the resource to this specified destination parent. This can only be a folder number (such as "folders/123") or an organization number (such as "organizations/123"). |
| `view` | query | string enum | no | Analysis view indicating what information should be included in the analysis response. If unspecified, the default view is FULL. |

### `cloudasset.analyzeOrgPolicies`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+scope}:analyzeOrgPolicies`
- Analyzes organization policies under a scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AnalyzeOrgPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. The organization to scope the request. Only organization policies within the scope will be analyzed. \* organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") |
| `constraint` | query | string | yes | Required. The name of the constraint to analyze organization policies for. The response only contains analyzed organization policies for the provided constraint. |
| `filter` | query | string | no | The expression to filter AnalyzeOrgPoliciesResponse.org_policy_results. Filtering is currently available for bare literal values and the following fields: \* consolidated_policy.attached_resource \* consolidated_policy.rules.enforce When filtering by a specific field, the only supported operator is `=`. For example, filtering by consolidated_policy.attached_resource="//cloudresourcemanager.googleapis.com/folders/001" will return all the Organization Policy results attached to "folders/001". |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return per page. If unspecified, AnalyzeOrgPoliciesResponse.org_policy_results will contain 20 items with a maximum of 200. |
| `pageToken` | query | string | no | The pagination token to retrieve the next page. |

### `cloudasset.analyzeOrgPolicyGovernedAssets`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+scope}:analyzeOrgPolicyGovernedAssets`
- Analyzes organization policies governed assets (Google Cloud resources or policies) under a scope. This RPC supports custom constraints and the following canned constraints: \* constraints/ainotebooks.accessMode \* constraints/ainotebooks.disableFileDownloads \* constraints/ainotebooks.disableRootAccess \* constraints/ainotebooks.disableTerminal \* constraints/ainotebooks.environmentOptions \* constraints/ainotebooks.requireAutoUpgradeSchedule \* constraints/ainotebooks.restrictVpcNetworks \* constraints/compute.disableGuestAttributesAccess \* constraints/compute.disableInstanceDataAccessApis \* constraints/compute.disableNestedVirtualization \* constraints/compute.disableSerialPortAccess \* constraints/compute.disableSerialPortLogging \* constraints/compute.disableVpcExternalIpv6 \* constraints/compute.requireOsLogin \* constraints/compute.requireShieldedVm \* constraints/compute.restrictLoadBalancerCreationForTypes \* constraints/compute.restrictProtocolForwardingCreationForTypes \* constraints/compute.restrictXpnProjectLienRemoval \* constraints/compute.setNewProjectDefaultToZonalDNSOnly \* constraints/compute.skipDefaultNetworkCreation \* constraints/compute.trustedImageProjects \* constraints/compute.vmCanIpForward \* constraints/compute.vmExternalIpAccess \* constraints/gcp.detailedAuditLoggingMode \* constraints/gcp.resourceLocations \* constraints/iam.allowedPolicyMemberDomains \* constraints/iam.automaticIamGrantsForDefaultServiceAccounts \* constraints/iam.disableServiceAccountCreation \* constraints/iam.disableServiceAccountKeyCreation \* constraints/iam.disableServiceAccountKeyUpload \* constraints/iam.restrictCrossProjectServiceAccountLienRemoval \* constraints/iam.serviceAccountKeyExpiryHours \* constraints/resourcemanager.accessBoundaries \* constraints/resourcemanager.allowedExportDestinations \* constraints/sql.restrictAuthorizedNetworks \* constraints/sql.restrictNoncompliantDiagnosticDataAccess \* constraints/sql.restrictNoncompliantResourceCreation \* constraints/sql.restrictPublicIp \* constraints/storage.publicAccessPrevention \* constraints/storage.restrictAuthTypes \* constraints/storage.uniformBucketLevelAccess This RPC only returns either resources of types supported by search APIs (https://cloud.google.com/asset-inventory/docs/supported-asset-types) or IAM policies.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AnalyzeOrgPolicyGovernedAssetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. The organization to scope the request. Only organization policies within the scope will be analyzed. The output assets will also be limited to the ones governed by those in-scope organization policies. \* organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") |
| `constraint` | query | string | yes | Required. The name of the constraint to analyze governed assets for. The analysis only contains analyzed organization policies for the provided constraint. |
| `filter` | query | string | no | The expression to filter AnalyzeOrgPolicyGovernedAssetsResponse.governed_assets. For governed resources, filtering is currently available for bare literal values and the following fields: \* governed_resource.project \* governed_resource.folders \* consolidated_policy.rules.enforce When filtering by `governed_resource.project` or `consolidated_policy.rules.enforce`, the only supported operator is `=`. When filtering by `governed_resource.folders`, the supported operators are `=` and `:`. For example, filtering by `governed_resource.project="projects/12345678"` will return all the governed resources under "projects/12345678", including the project itself if applicable. For governed IAM policies, filtering is currently available for bare literal values and the following fields: \* governed_iam_policy.project \* governed_iam_policy.folders \* consolidated_policy.rules.enforce When filtering by `governed_iam_policy.project` or `consolidated_policy.rules.enforce`, the only supported operator is `=`. When filtering by `governed_iam_policy.folders`, the supported operators are `=` and `:`. For example, filtering by `governed_iam_policy.folders:"folders/12345678"` will return all the governed IAM policies under "folders/001". |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return per page. If unspecified, AnalyzeOrgPolicyGovernedAssetsResponse.governed_assets will contain 100 items with a maximum of 200. |
| `pageToken` | query | string | no | The pagination token to retrieve the next page. |

### `cloudasset.analyzeOrgPolicyGovernedContainers`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+scope}:analyzeOrgPolicyGovernedContainers`
- Analyzes organization policies governed containers (projects, folders or organization) under a scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AnalyzeOrgPolicyGovernedContainersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. The organization to scope the request. Only organization policies within the scope will be analyzed. The output containers will also be limited to the ones governed by those in-scope organization policies. \* organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") |
| `constraint` | query | string | yes | Required. The name of the constraint to analyze governed containers for. The analysis only contains organization policies for the provided constraint. |
| `filter` | query | string | no | The expression to filter AnalyzeOrgPolicyGovernedContainersResponse.governed_containers. Filtering is currently available for bare literal values and the following fields: \* parent \* consolidated_policy.rules.enforce When filtering by a specific field, the only supported operator is `=`. For example, filtering by parent="//cloudresourcemanager.googleapis.com/folders/001" will return all the containers under "folders/001". |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return per page. If unspecified, AnalyzeOrgPolicyGovernedContainersResponse.governed_containers will contain 100 items with a maximum of 200. |
| `pageToken` | query | string | no | The pagination token to retrieve the next page. |

### `cloudasset.batchGetAssetsHistory`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+parent}:batchGetAssetsHistory`
- Batch gets the update history of assets that overlap a time window. For IAM_POLICY content, this API outputs history when the asset and its attached IAM POLICY both exist. This can create gaps in the output history. Otherwise, this API outputs history with asset in both non-delete or deleted status. If a specified asset does not exist, this API returns an INVALID_ARGUMENT error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BatchGetAssetsHistoryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The relative name of the root asset. It can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id")", or a project number (such as "projects/12345"). |
| `assetNames` | query | repeated string | no | A list of the full names of the assets. See: https://cloud.google.com/asset-inventory/docs/resource-name-format Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. The request becomes a no-op if the asset name list is empty, and the max size of the asset name list is 100 in one request. |
| `contentType` | query | string enum | no | Optional. The content type. |
| `readTimeWindow.endTime` | query | string (google-datetime) | no | End time of the time window (inclusive). If not specified, the current timestamp is used instead. |
| `readTimeWindow.startTime` | query | string (google-datetime) | no | Start time of the time window (exclusive). |
| `relationshipTypes` | query | repeated string | no | Optional. A list of relationship types to output, for example: `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if content_type=RELATIONSHIP. \* If specified: it outputs specified relationships' history on the \[asset_names\]. It returns an error if any of the \[relationship_types\] doesn't belong to the supported relationship types of the \[asset_names\] or if any of the \[asset_names\]'s types doesn't belong to the source types of the \[relationship_types\]. \* Otherwise: it outputs the supported relationships' history on the \[asset_names\] or returns an error if any of the \[asset_names\]'s types has no relationship support. See Introduction to Cloud Asset Inventory (https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types and relationship types. |

### `cloudasset.queryAssets`

- Versions: v1
- `POST https://cloudasset.googleapis.com/v1/{+parent}:queryAssets`
- Issue a job that queries assets using a SQL statement compatible with BigQuery SQL (https://cloud.google.com/bigquery/docs/introduction-sql). If the query execution finishes within timeout and there's no pagination, the full query results will be returned in the `QueryAssetsResponse`. Otherwise, full query results can be obtained by issuing extra requests with the `job_reference` from the a previous `QueryAssets` call. Note, the query result has approximately 10 GB limitation enforced by BigQuery (https://cloud.google.com/bigquery/docs/best-practices-performance-output). Queries return larger results will result in errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `QueryAssetsRequest`; Response: `QueryAssetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The relative name of the root asset. This can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"), or a folder number (such as "folders/123"). Only assets belonging to the `parent` will be returned. |

### `cloudasset.searchAllIamPolicies`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+scope}:searchAllIamPolicies`
- Searches all IAM policies within the specified scope, such as a project, folder, or organization. The caller must be granted the `cloudasset.assets.searchAllIamPolicies` permission on the desired scope, otherwise the request will be rejected.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchAllIamPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. A scope can be a project, a folder, or an organization. The search is limited to the IAM policies within the `scope`. The caller must be granted the \[`cloudasset.assets.searchAllIamPolicies`\](https://cloud.google.com/asset-inventory/docs/access-control#required_permissions) permission on the desired scope. The allowed values are: \* projects/{PROJECT_ID} (e.g., "projects/foo-bar") \* projects/{PROJECT_NUMBER} (e.g., "projects/12345678") \* folders/{FOLDER_NUMBER} (e.g., "folders/1234567") \* organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") |
| `assetTypes` | query | repeated string | no | Optional. A list of asset types that the IAM policies are attached to. If empty, it will search the IAM policies that are attached to all the asset types supported by search APIs (https://cloud.google.com/asset-inventory/docs/supported-asset-types) Regular expressions are also supported. For example: \* "compute.googleapis.com.\*" snapshots IAM policies attached to asset type starts with "compute.googleapis.com". \* ".\*Instance" snapshots IAM policies attached to asset type ends with "Instance". \* ".\*Instance.\*" snapshots IAM policies attached to asset type contains "Instance". See RE2 (https://github.com/google/re2/wiki/Syntax) for all supported regular expression syntax. If the regular expression does not match any supported asset type, an INVALID_ARGUMENT error will be returned. |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields specifying the sorting order of the results. The default order is ascending. Add " DESC" after the field name to indicate descending order. Redundant space characters are ignored. Example: "assetType DESC, resource". Only singular primitive fields in the response are sortable: \* resource \* assetType \* project All the other fields such as repeated fields (e.g., `folders`) and non-primitive fields (e.g., `policy`) are not supported. |
| `pageSize` | query | integer (int32) | no | Optional. The page size for search result pagination. Page size is capped at 500 even if a larger value is given. If set to zero or a negative value, server will pick an appropriate default. Returned results may be fewer than requested. When this happens, there could be more results as long as `next_page_token` is returned. |
| `pageToken` | query | string | no | Optional. If present, retrieve the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of all other method parameters must be identical to those in the previous call. |
| `query` | query | string | no | Optional. The query statement. See how to construct a query (https://cloud.google.com/asset-inventory/docs/searching-iam-policies#how_to_construct_a_query) for more information. If not specified or empty, it will search all the IAM policies within the specified `scope`. Note that the query string is compared against each IAM policy binding, including its principals, roles, and IAM conditions. The returned IAM policies will only contain the bindings that match your query. To learn more about the IAM policy structure, see the IAM policy documentation (https://cloud.google.com/iam/help/allow-policies/structure). Examples: \* `policy:amy@gmail.com` to find IAM policy bindings that specify user "amy@gmail.com". \* `policy:roles/compute.admin` to find IAM policy bindings that specify the Compute Admin role. \* `policy:comp*` to find IAM policy bindings that contain "comp" as a prefix of any word in the binding. \* `policy.role.permissions:storage.buckets.update` to find IAM policy bindings that specify a role containing "storage.buckets.update" permission. Note that if callers don't have `iam.roles.get` access to a role's included permissions, policy bindings that specify this role will be dropped from the search results. \* `policy.role.permissions:upd*` to find IAM policy bindings that specify a role containing "upd" as a prefix of any word in the role permission. Note that if callers don't have `iam.roles.get` access to a role's included permissions, policy bindings that specify this role will be dropped from the search results. \* `resource:organizations/123456` to find IAM policy bindings that are set on "organizations/123456". \* `resource=//cloudresourcemanager.googleapis.com/projects/myproject` to find IAM policy bindings that are set on the project named "myproject". \* `Important` to find IAM policy bindings that contain "Important" as a word in any of the searchable fields (except for the included permissions). \* `resource:(instance1 OR instance2) policy:amy` to find IAM policy bindings that are set on resources "instance1" or "instance2" and also specify user "amy". \* `roles:roles/compute.admin` to find IAM policy bindings that specify the Compute Admin role. \* `memberTypes:user` to find IAM policy bindings that contain the principal type "user". |

### `cloudasset.searchAllResources`

- Versions: v1
- `GET https://cloudasset.googleapis.com/v1/{+scope}:searchAllResources`
- Searches all Google Cloud resources within the specified scope, such as a project, folder, or organization. The caller must be granted the `cloudasset.assets.searchAllResources` permission on the desired scope, otherwise the request will be rejected.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchAllResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. A scope can be a project, a folder, or an organization. The search is limited to the resources within the `scope`. The caller must be granted the \[`cloudasset.assets.searchAllResources`\](https://cloud.google.com/asset-inventory/docs/access-control#required_permissions) permission on the desired scope. The allowed values are: \* projects/{PROJECT_ID} (e.g., "projects/foo-bar") \* projects/{PROJECT_NUMBER} (e.g., "projects/12345678") \* folders/{FOLDER_NUMBER} (e.g., "folders/1234567") \* organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") |
| `assetTypes` | query | repeated string | no | Optional. A list of asset types that this request searches for. If empty, it will search all the asset types supported by search APIs (https://cloud.google.com/asset-inventory/docs/supported-asset-types). Regular expressions are also supported. For example: \* "compute.googleapis.com.\*" snapshots resources whose asset type starts with "compute.googleapis.com". \* ".\*Instance" snapshots resources whose asset type ends with "Instance". \* ".\*Instance.\*" snapshots resources whose asset type contains "Instance". See RE2 (https://github.com/google/re2/wiki/Syntax) for all supported regular expression syntax. If the regular expression does not match any supported asset type, an INVALID_ARGUMENT error will be returned. |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields specifying the sorting order of the results. The default order is ascending. Add " DESC" after the field name to indicate descending order. Redundant space characters are ignored. Example: "location DESC, name". Only the following fields in the response are sortable: \* name \* assetType \* project \* displayName \* description \* location \* createTime \* updateTime \* state \* parentFullResourceName \* parentAssetType |
| `pageSize` | query | integer (int32) | no | Optional. The page size for search result pagination. Page size is capped at 500 even if a larger value is given. If set to zero or a negative value, server will pick an appropriate default. Returned results may be fewer than requested. When this happens, there could be more results as long as `next_page_token` is returned. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of all other method parameters, must be identical to those in the previous call. |
| `query` | query | string | no | Optional. The query statement. See how to construct a query (https://cloud.google.com/asset-inventory/docs/searching-resources#how_to_construct_a_query) for more information. If not specified or empty, it will search all the resources within the specified `scope`. Examples: \* `name:Important` to find Google Cloud resources whose name contains `Important` as a word. \* `name=Important` to find the Google Cloud resource whose name is exactly `Important`. \* `displayName:Impor*` to find Google Cloud resources whose display name contains `Impor` as a prefix of any word in the field. \* `location:us-west*` to find Google Cloud resources whose location contains both `us` and `west` as prefixes. \* `labels:prod` to find Google Cloud resources whose labels contain `prod` as a key or value. \* `labels.env:prod` to find Google Cloud resources that have a label `env` and its value is `prod`. \* `labels.env:*` to find Google Cloud resources that have a label `env`. \* `tagKeys:env` to find Google Cloud resources that have directly attached tags where the \[`TagKey.namespacedName`\](https://cloud.google.com/resource-manager/reference/rest/v3/tagKeys#resource:-tagkey) contains `env`. \* `tagValues:prod*` to find Google Cloud resources that have directly attached tags where the \[`TagValue.namespacedName`\](https://cloud.google.com/resource-manager/reference/rest/v3/tagValues#resource:-tagvalue) contains a word prefixed by `prod`. \* `tagValueIds=tagValues/123` to find Google Cloud resources that have directly attached tags where the \[`TagValue.name`\](https://cloud.google.com/resource-manager/reference/rest/v3/tagValues#resource:-tagvalue) is exactly `tagValues/123`. \* `effectiveTagKeys:env` to find Google Cloud resources that have directly attached or inherited tags where the \[`TagKey.namespacedName`\](https://cloud.google.com/resource-manager/reference/rest/v3/tagKeys#resource:-tagkey) contains `env`. \* `effectiveTagValues:prod*` to find Google Cloud resources that have directly attached or inherited tags where the \[`TagValue.namespacedName`\](https://cloud.google.com/resource-manager/reference/rest/v3/tagValues#resource:-tagvalue) contains a word prefixed by `prod`. \* `effectiveTagValueIds=tagValues/123` to find Google Cloud resources that have directly attached or inherited tags where the \[`TagValue.name`\](https://cloud.google.com/resource-manager/reference/rest/v3/tagValues#resource:-tagvalue) is exactly `tagValues/123`. \* `kmsKey:key` to find Google Cloud resources encrypted with a customer-managed encryption key whose name contains `key` as a word. This field is deprecated. Use the `kmsKeys` field to retrieve Cloud KMS key information. \* `kmsKeys:key` to find Google Cloud resources encrypted with customer-managed encryption keys whose name contains the word `key`. \* `relationships:instance-group-1` to find Google Cloud resources that have relationships with `instance-group-1` in the related resource name. \* `relationships:INSTANCE_TO_INSTANCEGROUP` to find Compute Engine instances that have relationships of type `INSTANCE_TO_INSTANCEGROUP`. \* `relationships.INSTANCE_TO_INSTANCEGROUP:instance-group-1` to find Compute Engine instances that have relationships with `instance-group-1` in the Compute Engine instance group resource name, for relationship type `INSTANCE_TO_INSTANCEGROUP`. \* `sccSecurityMarks.key=value` to find Cloud resources that are attached with security marks whose key is `key` and value is `value`. \* `sccSecurityMarks.key:*` to find Cloud resources that are attached with security marks whose key is `key`. \* `state:ACTIVE` to find Google Cloud resources whose state contains `ACTIVE` as a word. \* `NOT state:ACTIVE` to find Google Cloud resources whose state doesn't contain `ACTIVE` as a word. \* `createTime<1609459200` to find Google Cloud resources that were created before `2021-01-01 00:00:00 UTC`. `1609459200` is the epoch timestamp of `2021-01-01 00:00:00 UTC` in seconds. \* `updateTime>1609459200` to find Google Cloud resources that were updated after `2021-01-01 00:00:00 UTC`. `1609459200` is the epoch timestamp of `2021-01-01 00:00:00 UTC` in seconds. \* `Important` to find Google Cloud resources that contain `Important` as a word in any of the searchable fields. \* `Impor*` to find Google Cloud resources that contain `Impor` as a prefix of any word in any of the searchable fields. \* `Important location:(us-west1 OR global)` to find Google Cloud resources that contain `Important` as a word in any of the searchable fields and are also located in the `us-west1` region or the `global` location. |
| `readMask` | query | string (google-fieldmask) | no | Optional. A comma-separated list of fields that you want returned in the results. The following fields are returned by default if not specified: \* `name` \* `assetType` \* `project` \* `folders` \* `organization` \* `displayName` \* `description` \* `location` \* `labels` \* `tags` \* `effectiveTags` \* `networkTags` \* `kmsKeys` \* `createTime` \* `updateTime` \* `state` \* `additionalAttributes` \* `parentFullResourceName` \* `parentAssetType` Some fields of large size, such as `versionedResources`, `attachedResources`, `effectiveTags` etc., are not returned by default, but you can specify them in the `read_mask` parameter if you want to include them. If `"*"` is specified, all available fields (https://cloud.google.com/asset-inventory/docs/reference/rest/v1/TopLevel/searchAllResources#resourcesearchresult) are returned. Examples: `"name,location"`, `"name,versionedResources"`, `"*"`. Any invalid field path will trigger INVALID_ARGUMENT error. |

### `cloudasset.exportAssets`

- Versions: v1p7beta1, v1
- `POST https://cloudasset.googleapis.com/v1p7beta1/{+parent}:exportAssets`
- Exports assets with time and resource types to a given Cloud Storage location/BigQuery table. For Cloud Storage location destinations, the output format is newline-delimited JSON. Each line represents a google.cloud.asset.v1p7beta1.Asset in the JSON format; for BigQuery table destinations, the output table stores the fields in asset proto as columns. This API implements the google.longrunning.Operation API , which allows you to keep track of the export. We recommend intervals of at least 2 seconds with exponential retry to poll the export operation result. For regular-size resource parent, the export operation usually finishes within 5 minutes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudAssetV1p7beta1ExportAssetsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The relative name of the root asset. This can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"), or a folder number (such as "folders/123"). |

### Example request skeleton

Generated from the Discovery entry of `cloudasset.assets.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudasset.googleapis.com/v1/{+parent}/assets"
```

## Notes

- Generated from the Discovery document(s) v1p7beta1, v1p1beta1, v1p5beta1, v1, v1beta1 of `cloudasset` (retrieved 2026-11-14). Resources on this page: assets, effectiveIamPolicies, feeds, folders, iamPolicies, operations, organizations, projects, resources, savedQueries, v1, v1p7beta1.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives).
- Message schemas are listed under `references/rest-schemas/cloudasset/`.
- Source: https://cloudasset.googleapis.com/$discovery/rest?version=v1p7beta1, https://cloudasset.googleapis.com/$discovery/rest?version=v1p1beta1, https://cloudasset.googleapis.com/$discovery/rest?version=v1p5beta1, https://cloudasset.googleapis.com/$discovery/rest?version=v1, https://cloudasset.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
