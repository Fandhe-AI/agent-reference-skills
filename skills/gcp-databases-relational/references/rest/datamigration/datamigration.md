---
source: https://datamigration.googleapis.com/$discovery/rest?version=v1
---

# Database Migration API REST API (datamigration)

## Signature / Usage

Base URL: `https://datamigration.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `datamigration.projects.locations.connectionProfiles.create`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+parent}/connectionProfiles`
- Creates a new connection profile in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConnectionProfile`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent which owns this collection of connection profiles. |
| `connectionProfileId` | query | string | yes | Required. The connection profile identifier. |
| `requestId` | query | string | no | Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |
| `skipValidation` | query | boolean | no | Optional. Create the connection profile without validating it. The default is false. Only supported for Oracle connection profiles. |
| `validateOnly` | query | boolean | no | Optional. Only validate the connection profile, but don't create any resources. The default is false. Only supported for Oracle connection profiles. |

### `datamigration.projects.locations.connectionProfiles.delete`

- Versions: v1, v1beta1
- `DELETE https://datamigration.googleapis.com/v1/{+name}`
- Deletes a single Database Migration Service connection profile. A connection profile can only be deleted if it is not in use by any active migration jobs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the connection profile resource to delete. |
| `force` | query | boolean | no | In case of force delete, the CloudSQL replica database is also deleted (only for CloudSQL connection profile). |
| `requestId` | query | string | no | A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |

### `datamigration.projects.locations.connectionProfiles.get`

- Versions: v1, v1beta1
- `GET https://datamigration.googleapis.com/v1/{+name}`
- Gets details of a single connection profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ConnectionProfile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the connection profile resource to get. |

### `datamigration.projects.locations.connectionProfiles.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://datamigration.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `datamigration.projects.locations.connectionProfiles.list`

- Versions: v1, v1beta1
- `GET https://datamigration.googleapis.com/v1/{+parent}/connectionProfiles`
- Retrieves a list of all connection profiles in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectionProfilesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent which owns this collection of connection profiles. |
| `filter` | query | string | no | Optional. A filter expression that filters connection profiles listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either =, !=, >, or <. For example, list connection profiles created this year by specifying \*\*createTime %gt; 2020-01-01T00:00:00.000000000Z\*\*. You can also filter nested fields. For example, you could specify \*\*mySql.username = %lt;my_username%gt;\*\* to list all connection profiles configured to connect with a specific username. |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields to order results according to. |
| `pageSize` | query | integer (int32) | no | The maximum number of connection profiles to return. The service may return fewer than this value. If unspecified, at most 50 connection profiles will be returned. The maximum value is 1000; values above 1000 are coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListConnectionProfiles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConnectionProfiles` must match the call that provided the page token. |

### `datamigration.projects.locations.connectionProfiles.patch`

- Versions: v1, v1beta1
- `PATCH https://datamigration.googleapis.com/v1/{+name}`
- Update the configuration of a single connection profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConnectionProfile`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of this connection profile resource in the form of projects/{project}/locations/{location}/connectionProfiles/{connectionProfile}. |
| `requestId` | query | string | no | Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |
| `skipValidation` | query | boolean | no | Optional. Update the connection profile without validating it. The default is false. Only supported for Oracle connection profiles. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten by the update in the conversion workspace resource. |
| `validateOnly` | query | boolean | no | Optional. Only validate the connection profile, but don't update any resources. The default is false. Only supported for Oracle connection profiles. |

### `datamigration.projects.locations.connectionProfiles.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `datamigration.projects.locations.connectionProfiles.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `datamigration.projects.locations.conversionWorkspaces.apply`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+name}:apply`
- Applies draft tree onto a specific destination database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApplyConversionWorkspaceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the conversion workspace resource for which to apply the draft tree. Must be in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |

### `datamigration.projects.locations.conversionWorkspaces.commit`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+name}:commit`
- Marks all the data in the conversion workspace as committed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CommitConversionWorkspaceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the conversion workspace resource to commit. |

### `datamigration.projects.locations.conversionWorkspaces.convert`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+name}:convert`
- Creates a draft tree schema for the destination database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConvertConversionWorkspaceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the conversion workspace resource to convert in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |

### `datamigration.projects.locations.conversionWorkspaces.create`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+parent}/conversionWorkspaces`
- Creates a new conversion workspace in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConversionWorkspace`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent which owns this collection of conversion workspaces. |
| `conversionWorkspaceId` | query | string | yes | Required. The ID of the conversion workspace to create. |
| `requestId` | query | string | no | Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |

### `datamigration.projects.locations.conversionWorkspaces.delete`

- Versions: v1
- `DELETE https://datamigration.googleapis.com/v1/{+name}`
- Deletes a single conversion workspace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the conversion workspace resource to delete. |
| `force` | query | boolean | no | Optional. Force delete the conversion workspace, even if there's a running migration that is using the workspace. |
| `requestId` | query | string | no | Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |

### `datamigration.projects.locations.conversionWorkspaces.describeConversionWorkspaceRevisions`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+conversionWorkspace}:describeConversionWorkspaceRevisions`
- Retrieves a list of committed revisions of a specific conversion workspace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DescribeConversionWorkspaceRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `conversionWorkspace` | path | string | yes | Required. Name of the conversion workspace resource whose revisions are listed. Must be in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |
| `commitId` | query | string | no | Optional. Optional filter to request a specific commit ID. |

### `datamigration.projects.locations.conversionWorkspaces.describeDatabaseEntities`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+conversionWorkspace}:describeDatabaseEntities`
- Describes the database entities tree for a specific conversion workspace and a specific tree type. Database entities are not resources like conversion workspaces or mapping rules, and they can't be created, updated or deleted. Instead, they are simple data objects describing the structure of the client database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DescribeDatabaseEntitiesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `conversionWorkspace` | path | string | yes | Required. Name of the conversion workspace resource whose database entities are described. Must be in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |
| `commitId` | query | string | no | Optional. Request a specific commit ID. If not specified, the entities from the latest commit are returned. |
| `filter` | query | string | no | Optional. Filter the returned entities based on AIP-160 standard. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of entities to return. The service may return fewer entities than the value specifies. |
| `pageToken` | query | string | no | Optional. The nextPageToken value received in the previous call to conversionWorkspace.describeDatabaseEntities, used in the subsequent request to retrieve the next page of results. On first call this should be left blank. When paginating, all other parameters provided to conversionWorkspace.describeDatabaseEntities must match the call that provided the page token. |
| `tree` | query | string enum | yes | Required. The tree to fetch. Values: `DB_TREE_TYPE_UNSPECIFIED`, `SOURCE_TREE`, `DRAFT_TREE`, `DESTINATION_TREE`. |
| `uncommitted` | query | boolean | no | Optional. Whether to retrieve the latest committed version of the entities or the latest version. This field is ignored if a specific commit_id is specified. |
| `view` | query | string enum | no | Optional. Results view based on AIP-157 Values: `DATABASE_ENTITY_VIEW_UNSPECIFIED`, `DATABASE_ENTITY_VIEW_BASIC`, `DATABASE_ENTITY_VIEW_FULL`, `DATABASE_ENTITY_VIEW_ROOT_SUMMARY`, `DATABASE_ENTITY_VIEW_FULL_COMPACT`. |

### `datamigration.projects.locations.conversionWorkspaces.fetchEntitiesStatusView`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+conversionWorkspace}:fetchEntitiesStatusView`
- An internal, RPC only method that returns a list of the (filtered) entities with minimal information required for the entities tree view.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchEntitiesStatusViewResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `conversionWorkspace` | path | string | yes | Required. Name of the conversion workspace resource whose database entities are described. Must be in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |
| `fetchView` | query | string enum | no | Optional. The view to fetch. If not specified, FULL is used. Values: `FETCH_VIEW_UNSPECIFIED`, `FULL`, `SUMMARY`, `FULL_WITH_DEPENDENCIES`. |
| `filter` | query | string | no | Optional. Filter the returned entities based on AIP-160 standard. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of entities to return. The service may return fewer entities than the value specifies. Default is 100000. |
| `pageToken` | query | string | no | Optional. The nextPageToken value received in the previous call to conversionWorkspace.FetchEntitiesStatusView, used in the subsequent request to retrieve the next page of results. On first call this should be left blank. When paginating, all other parameters provided to conversionWorkspace.FetchEntitiesStatusView must match the call that provided the page token, except for the page_size parameter. |
| `tree` | query | string enum | yes | Required. The tree to fetch. Values: `DB_TREE_TYPE_UNSPECIFIED`, `SOURCE_TREE`, `DRAFT_TREE`. |

### `datamigration.projects.locations.conversionWorkspaces.fetchIssues`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+conversionWorkspace}:fetchIssues`
- List issues of conversion workspace operations e.g. conversion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchIssuesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `conversionWorkspace` | path | string | yes | Required. Conversion workspace with issues to fetch. Must be in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |
| `allIssues` | query | boolean | no | Optional. If 'true', gets all issues matching the filter. Otherwise, for each entity only the issues matching the DdlKind chosen for application on the destination are returned. |
| `filter` | query | string | no | Optional. AIP-160 standard filter. Supporting both entity and issue fields. Supported fields: - `name` / `fullname`: The entity full name. - `type`: The entity type (e.g. `TABLE`, `VIEW`, `INDEX`, `TRIGGER`). - `ddlkind`: The kind of DDL (e.g. `DDL_KIND_SOURCE`, `DDL_KIND_AI`, `DDL_KIND_DETERMINISTIC`). - `issue.severity`: The severity of the issue (e.g. `INFO`, `WARNING`, `ERROR`). - `issue.state`: The state of the issue (e.g. `OPEN`, `RESOLVED`). - `issue.origin`: The origin of the issue (e.g. `DETERMINISTIC`, `AI`). - `issue.category_id`: The category ID of the issue. - `issue.group_id`: The group ID of the issue. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of issues to return. The service may return fewer issues than the value specifies. |
| `pageToken` | query | string | no | Optional. The FetchIssuesResponse.next_page_token value received in the previous call to FetchIssues, used in the subsequent request to retrieve the next page of results. On first call this should be left blank. When paginating, all other parameters provided to FetchIssues must match the call that provided the page token, except for the page_size parameter. |
| `tree` | query | string enum | no | Optional. The tree to fetch issues from. If not specified, source tree is assumed. Values: `DB_TREE_TYPE_UNSPECIFIED`, `SOURCE`, `DRAFT`. |

### `datamigration.projects.locations.conversionWorkspaces.get`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+name}`
- Gets details of a single conversion workspace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ConversionWorkspace`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the conversion workspace resource to get. |

### `datamigration.projects.locations.conversionWorkspaces.getIamPolicy`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `datamigration.projects.locations.conversionWorkspaces.list`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+parent}/conversionWorkspaces`
- Lists conversion workspaces in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConversionWorkspacesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent which owns this collection of conversion workspaces. |
| `filter` | query | string | no | Optional. A filter expression that filters conversion workspaces listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either =, !=, >, or <. For example, list conversion workspaces created this year by specifying \*\*createTime %gt; 2020-01-01T00:00:00.000000000Z.\*\* You can also filter nested fields. For example, you could specify \*\*source.version = "12.c.1"\*\* to select all conversion workspaces with source database version equal to 12.c.1. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of conversion workspaces to return. The service may return fewer than this value. If unspecified, at most 50 sets are returned. |
| `pageToken` | query | string | no | Optional. The nextPageToken value received in the previous call to conversionWorkspaces.list, used in the subsequent request to retrieve the next page of results. On first call this should be left blank. When paginating, all other parameters provided to conversionWorkspaces.list must match the call that provided the page token. |

### `datamigration.projects.locations.conversionWorkspaces.mappingRules.create`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+parent}/mappingRules`
- Creates a new mapping rule for a given conversion workspace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MappingRule`; Response: `MappingRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent which owns this collection of mapping rules. |
| `mappingRuleId` | query | string | yes | Required. The ID of the rule to create. |
| `requestId` | query | string | no | Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |

### `datamigration.projects.locations.conversionWorkspaces.mappingRules.delete`

- Versions: v1
- `DELETE https://datamigration.googleapis.com/v1/{+name}`
- Deletes a single mapping rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the mapping rule resource to delete. |
| `requestId` | query | string | no | Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |

### `datamigration.projects.locations.conversionWorkspaces.mappingRules.get`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+name}`
- Gets the details of a mapping rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MappingRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the mapping rule resource to get. Example: conversionWorkspaces/123/mappingRules/rule123 In order to retrieve a previous revision of the mapping rule, also provide the revision ID. Example: conversionWorkspace/123/mappingRules/rule123@c7cfa2a8c7cfa2a8c7cfa2a8c7cfa2a8 |

### `datamigration.projects.locations.conversionWorkspaces.mappingRules.import`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+parent}/mappingRules:import`
- Imports the mapping rules for a given conversion workspace. Supports various formats of external rules files.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ImportMappingRulesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the conversion workspace resource to import the rules to in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |

### `datamigration.projects.locations.conversionWorkspaces.mappingRules.list`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+parent}/mappingRules`
- Lists the mapping rules for a specific conversion workspace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMappingRulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the conversion workspace resource whose mapping rules are listed in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of rules to return. The service may return fewer than this value. |
| `pageToken` | query | string | no | Optional. The nextPageToken value received in the previous call to mappingRules.list, used in the subsequent request to retrieve the next page of results. On first call this should be left blank. When paginating, all other parameters provided to mappingRules.list must match the call that provided the page token. |

### `datamigration.projects.locations.conversionWorkspaces.patch`

- Versions: v1
- `PATCH https://datamigration.googleapis.com/v1/{+name}`
- Updates the parameters of a single conversion workspace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConversionWorkspace`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Full name of the workspace resource, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |
| `requestId` | query | string | no | Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten by the update in the conversion workspace resource. |

### `datamigration.projects.locations.conversionWorkspaces.rollback`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+name}:rollback`
- Rolls back a conversion workspace to the last committed snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RollbackConversionWorkspaceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the conversion workspace resource to roll back to. |

### `datamigration.projects.locations.conversionWorkspaces.searchBackgroundJobs`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+conversionWorkspace}:searchBackgroundJobs`
- Searches/lists the background jobs for a specific conversion workspace. The background jobs are not resources like conversion workspaces or mapping rules, and they can't be created, updated or deleted. Instead, they are a way to expose the data plane jobs log.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchBackgroundJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `conversionWorkspace` | path | string | yes | Required. Name of the conversion workspace resource whose jobs are listed, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |
| `completedUntilTime` | query | string (google-datetime) | no | Optional. If provided, only returns jobs that completed until (not including) the given timestamp. |
| `maxSize` | query | integer (int32) | no | Optional. The maximum number of jobs to return. The service may return fewer than this value. If unspecified, at most 100 jobs are returned. The maximum value is 100; values above 100 are coerced to 100. |
| `returnMostRecentPerJobType` | query | boolean | no | Optional. Whether or not to return just the most recent job per job type, |

### `datamigration.projects.locations.conversionWorkspaces.seed`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+name}:seed`
- Imports a snapshot of the source database into the conversion workspace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SeedConversionWorkspaceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the conversion workspace resource to seed with new database structure, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |

### `datamigration.projects.locations.conversionWorkspaces.setDraftEntityDdl`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+conversionWorkspace}:setDraftEntityDdl`
- Updates the draft DDL of an entity.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetDraftEntityDdlRequest`; Response: `SetDraftEntityDdlResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `conversionWorkspace` | path | string | yes | Required. Name of the conversion workspace resource in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |

### `datamigration.projects.locations.conversionWorkspaces.setIamPolicy`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `datamigration.projects.locations.conversionWorkspaces.testIamPermissions`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `datamigration.projects.locations.fetchStaticIps`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+name}:fetchStaticIps`
- Fetches a set of static IP addresses that need to be allowlisted by the customer when using the static-IP connectivity method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchStaticIpsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for the location for which static IPs should be returned. Must be in the format `projects/*/locations/*`. |
| `fetchReservedPublicIps` | query | boolean | no | Optional. Indicates whether to fetch the reserved public IP addresses allocated for private connections in this location. If false or not set, fetches the shared external static IP addresses instead. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of IPs to return. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `FetchStaticIps` call. |

### `datamigration.projects.locations.get`

- Versions: v1, v1beta1
- `GET https://datamigration.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `datamigration.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://datamigration.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `datamigration.projects.locations.migrationJobs.create`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+parent}/migrationJobs`
- Creates a new migration job in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MigrationJob`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent which owns this collection of migration jobs. |
| `migrationJobId` | query | string | yes | Required. The ID of the instance to create. |
| `requestId` | query | string | no | Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |

### `datamigration.projects.locations.migrationJobs.delete`

- Versions: v1, v1beta1
- `DELETE https://datamigration.googleapis.com/v1/{+name}`
- Deletes a single migration job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the migration job resource to delete. |
| `force` | query | boolean | no | Optional. The destination CloudSQL connection profile is always deleted with the migration job. In case of force delete, the destination CloudSQL replica database is also deleted. |
| `requestId` | query | string | no | Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |

### `datamigration.projects.locations.migrationJobs.demoteDestination`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+name}:demoteDestination`
- Demotes the destination database to become a read replica of the source. This is applicable for the following migrations: 1. MySQL to Cloud SQL for MySQL 2. PostgreSQL to Cloud SQL for PostgreSQL 3. PostgreSQL to AlloyDB for PostgreSQL.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DemoteDestinationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the migration job resource to demote its destination. |

### `datamigration.projects.locations.migrationJobs.fetchSourceObjects`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+name}:fetchSourceObjects`
- Retrieves objects from the source database that can be selected for data migration. This is applicable for the following migrations: 1. PostgreSQL to Cloud SQL for PostgreSQL 2. PostgreSQL to AlloyDB for PostgreSQL.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for the migration job for which source objects should be returned. |

### `datamigration.projects.locations.migrationJobs.generateSshScript`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+migrationJob}:generateSshScript`
- Generate a SSH configuration script to configure the reverse SSH connectivity.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateSshScriptRequest`; Response: `SshScript`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `migrationJob` | path | string | yes | Name of the migration job resource to generate the SSH script. |

### `datamigration.projects.locations.migrationJobs.generateTcpProxyScript`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+migrationJob}:generateTcpProxyScript`
- Generate a TCP Proxy configuration script to configure a cloud-hosted VM running a TCP Proxy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateTcpProxyScriptRequest`; Response: `TcpProxyScript`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `migrationJob` | path | string | yes | Name of the migration job resource to generate the TCP Proxy script. |

### `datamigration.projects.locations.migrationJobs.get`

- Versions: v1, v1beta1
- `GET https://datamigration.googleapis.com/v1/{+name}`
- Gets details of a single migration job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MigrationJob`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the migration job resource to get. |

### `datamigration.projects.locations.migrationJobs.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://datamigration.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `datamigration.projects.locations.migrationJobs.list`

- Versions: v1, v1beta1
- `GET https://datamigration.googleapis.com/v1/{+parent}/migrationJobs`
- Lists migration jobs in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMigrationJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent which owns this collection of migrationJobs. |
| `filter` | query | string | no | Optional. A filter expression that filters migration jobs listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either =, !=, >, or <. For example, list migration jobs created this year by specifying \*\*createTime %gt; 2020-01-01T00:00:00.000000000Z.\*\* You can also filter nested fields. For example, you could specify \*\*reverseSshConnectivity.vmIp = "1.2.3.4"\*\* to select all migration jobs connecting through the specific SSH tunnel bastion. |
| `orderBy` | query | string | no | Optional. Sort the results based on the migration job name. Valid values are: "name", "name asc", and "name desc". |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of migration jobs to return. The service may return fewer than this value. If unspecified, at most 50 migration jobs will be returned. The maximum value is 1000; values above 1000 are coerced to 1000. |
| `pageToken` | query | string | no | Optional. The nextPageToken value received in the previous call to migrationJobs.list, used in the subsequent request to retrieve the next page of results. On first call this should be left blank. When paginating, all other parameters provided to migrationJobs.list must match the call that provided the page token. |

### `datamigration.projects.locations.migrationJobs.objects.get`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+name}`
- Use this method to get details about a migration job object.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MigrationJobObject`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the migration job object resource to get. |

### `datamigration.projects.locations.migrationJobs.objects.getIamPolicy`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `datamigration.projects.locations.migrationJobs.objects.list`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+parent}/objects`
- Use this method to list the objects of a specific migration job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMigrationJobObjectsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent migration job that owns the collection of objects. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of objects to return. Default is 50. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `ListMigrationJObObjectsRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMigrationJobObjectsRequest` must match the call that provided the page token. |

### `datamigration.projects.locations.migrationJobs.objects.lookup`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+parent}/objects:lookup`
- Use this method to look up a migration job object by its source object identifier.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LookupMigrationJobObjectRequest`; Response: `MigrationJobObject`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent migration job that owns the collection of objects. |

### `datamigration.projects.locations.migrationJobs.objects.setIamPolicy`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `datamigration.projects.locations.migrationJobs.objects.testIamPermissions`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `datamigration.projects.locations.migrationJobs.patch`

- Versions: v1, v1beta1
- `PATCH https://datamigration.googleapis.com/v1/{+name}`
- Updates the parameters of a single migration job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MigrationJob`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (URI) of this migration job resource, in the form of: projects/{project}/locations/{location}/migrationJobs/{migrationJob}. |
| `requestId` | query | string | no | Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten by the update in the conversion workspace resource. |

### `datamigration.projects.locations.migrationJobs.promote`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+name}:promote`
- Promote a migration job, stopping replication to the destination and promoting the destination to be a standalone database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PromoteMigrationJobRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the migration job resource to promote. |

### `datamigration.projects.locations.migrationJobs.restart`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+name}:restart`
- Restart a stopped or failed migration job, resetting the destination instance to its original state and starting the migration process from scratch.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestartMigrationJobRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the migration job resource to restart. |

### `datamigration.projects.locations.migrationJobs.resume`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+name}:resume`
- Resume a migration job that is currently stopped and is resumable (was stopped during CDC phase).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResumeMigrationJobRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the migration job resource to resume. |

### `datamigration.projects.locations.migrationJobs.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `datamigration.projects.locations.migrationJobs.start`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+name}:start`
- Start an already created migration job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StartMigrationJobRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the migration job resource to start. |

### `datamigration.projects.locations.migrationJobs.stop`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+name}:stop`
- Stops a running migration job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StopMigrationJobRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the migration job resource to stop. |

### `datamigration.projects.locations.migrationJobs.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `datamigration.projects.locations.migrationJobs.verify`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+name}:verify`
- Verify a migration job, making sure the destination can reach the source and that all configuration and prerequisites are met.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VerifyMigrationJobRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the migration job resource to verify. |

### `datamigration.projects.locations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://datamigration.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `datamigration.projects.locations.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://datamigration.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `datamigration.projects.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://datamigration.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `datamigration.projects.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://datamigration.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `datamigration.projects.locations.privateConnections.create`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+parent}/privateConnections`
- Creates a new private connection in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PrivateConnection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent that owns the collection of PrivateConnections. |
| `privateConnectionId` | query | string | yes | Required. The private connection identifier. |
| `requestId` | query | string | no | Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |
| `skipValidation` | query | boolean | no | Optional. If set to true, will skip validations. |
| `validateOnly` | query | boolean | no | Optional. For PSC Interface only - get the tenant project before creating the resource. |

### `datamigration.projects.locations.privateConnections.delete`

- Versions: v1
- `DELETE https://datamigration.googleapis.com/v1/{+name}`
- Deletes a single Database Migration Service private connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the private connection to delete. |
| `requestId` | query | string | no | Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), and hyphens (-). The maximum length is 40 characters. |

### `datamigration.projects.locations.privateConnections.get`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+name}`
- Gets details of a single private connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PrivateConnection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the private connection to get. |

### `datamigration.projects.locations.privateConnections.getIamPolicy`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `datamigration.projects.locations.privateConnections.list`

- Versions: v1
- `GET https://datamigration.googleapis.com/v1/{+parent}/privateConnections`
- Retrieves a list of private connections in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPrivateConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent that owns the collection of private connections. |
| `filter` | query | string | no | Optional. A filter expression that filters private connections listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either =, !=, >, or <. For example, list private connections created this year by specifying \*\*createTime %gt; 2021-01-01T00:00:00.000000000Z\*\*. |
| `orderBy` | query | string | no | Optional. Order by fields for the result. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of private connections to return. If unspecified, at most 50 private connections that are returned. The maximum value is 1000; values above 1000 are coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `ListPrivateConnections` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPrivateConnections` must match the call that provided the page token. |

### `datamigration.projects.locations.privateConnections.setIamPolicy`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `datamigration.projects.locations.privateConnections.testIamPermissions`

- Versions: v1
- `POST https://datamigration.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `datamigration.projects.locations.connectionProfiles.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://datamigration.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `datamigration` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/datamigration/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`datamigration` v1, revision 20261103) also lists 47 endpoints of the form `https://datamigration.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west15`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://datamigration.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://datamigration.africa-south1.rep.googleapis.com/`) and keep the path.
- Source: https://datamigration.googleapis.com/$discovery/rest?version=v1, https://datamigration.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
