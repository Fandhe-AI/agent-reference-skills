---
source: https://dataplex.googleapis.com/$discovery/rest?version=v1
---

# Cloud Dataplex API REST API (dataplex) (part 2/2)

## Signature / Usage

Base URL: `https://dataplex.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `dataplex.projects.locations.glossaries.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/glossaries`
- Lists Glossary resources in a project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListGlossariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which has this collection of Glossaries. Format: projects/{project_id_or_number}/locations/{location_id} where location_id refers to a Google Cloud region. |
| `filter` | query | string | no | Optional. Filter expression that filters Glossaries listed in the response. Filters on proto fields of Glossary are supported. Examples of using a filter are: - display_name="my-glossary" - categoryCount=1 - termCount=0 |
| `orderBy` | query | string | no | Optional. Order by expression that orders Glossaries listed in the response. Order by fields are: name or create_time for the result. If not specified, the ordering is undefined. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of Glossaries to return. The service may return fewer than this value. If unspecified, at most 50 Glossaries will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous ListGlossaries call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListGlossaries must match the call that provided the page token. |

### `dataplex.projects.locations.glossaries.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates a Glossary resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Glossary`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. The resource name of the Glossary. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. |
| `validateOnly` | query | boolean | no | Optional. Validates the request without actually updating the Glossary. Default: false. |

### `dataplex.projects.locations.glossaries.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.glossaries.terms.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/terms`
- Creates a new GlossaryTerm resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1GlossaryTerm`; Response: `GoogleCloudDataplexV1GlossaryTerm`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where the GlossaryTerm will be created. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} where location_id refers to a Google Cloud region. |
| `termId` | query | string | yes | Required. GlossaryTerm identifier. |

### `dataplex.projects.locations.glossaries.terms.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a GlossaryTerm resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the GlossaryTerm to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id} |

### `dataplex.projects.locations.glossaries.terms.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets a GlossaryTerm resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1GlossaryTerm`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the GlossaryTerm to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id} |

### `dataplex.projects.locations.glossaries.terms.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.glossaries.terms.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/terms`
- Lists GlossaryTerm resources in a Glossary.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListGlossaryTermsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which has this collection of GlossaryTerms. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} where location_id refers to a Google Cloud region. |
| `filter` | query | string | no | Optional. Filter expression that filters GlossaryTerms listed in the response. Filters are supported on the following fields: - immediate_parentExamples of using a filter are: - immediate_parent="projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}" - immediate_parent="projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}"This will only return the GlossaryTerms that are directly nested under the specified parent. |
| `orderBy` | query | string | no | Optional. Order by expression that orders GlossaryTerms listed in the response. Order by fields are: name or create_time for the result. If not specified, the ordering is undefined. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of GlossaryTerms to return. The service may return fewer than this value. If unspecified, at most 50 GlossaryTerms will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous ListGlossaryTerms call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListGlossaryTerms must match the call that provided the page token. |

### `dataplex.projects.locations.glossaries.terms.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates a GlossaryTerm resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1GlossaryTerm`; Response: `GoogleCloudDataplexV1GlossaryTerm`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. The resource name of the GlossaryTerm. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. |

### `dataplex.projects.locations.glossaries.terms.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.glossaries.terms.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.glossaries.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.governanceRules.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.governanceRules.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.governanceRules.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.lakes.actions.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/actions`
- Lists action resources in a lake.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListActionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of actions to return. The service may return fewer than this value. If unspecified, at most 10 actions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListLakeActions call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListLakeActions must match the call that provided the page token. |

### `dataplex.projects.locations.lakes.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/lakes`
- Creates a lake resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Lake`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the lake location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. |
| `lakeId` | query | string | yes | Required. Lake identifier. This ID will be used to generate names such as database and dataset names when publishing metadata to Hive Metastore and BigQuery. \* Must contain only lowercase letters, numbers and hyphens. \* Must start with a letter. \* Must end with a number or a letter. \* Must be between 1-63 characters. \* Must be unique within the customer project / location. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.lakes.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a lake resource. All zones within the lake must be deleted before the lake can be deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. |

### `dataplex.projects.locations.lakes.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Retrieves a lake resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1Lake`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. |

### `dataplex.projects.locations.lakes.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.lakes.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/lakes`
- Lists lake resources in a project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListLakesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the lake location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. |
| `filter` | query | string | no | Optional. Filter request. |
| `orderBy` | query | string | no | Optional. Order by fields for the result. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of Lakes to return. The service may return fewer than this value. If unspecified, at most 10 lakes will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListLakes call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListLakes must match the call that provided the page token. |

### `dataplex.projects.locations.lakes.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates a lake resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Lake`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The relative resource name of the lake, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.lakes.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.lakes.tasks.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/tasks`
- Creates a task resource within a lake.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Task`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. |
| `taskId` | query | string | yes | Required. Task identifier. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.lakes.tasks.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Delete the task resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the task: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/task/{task_id}. |

### `dataplex.projects.locations.lakes.tasks.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Get task resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1Task`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the task: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{tasks_id}. |

### `dataplex.projects.locations.lakes.tasks.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.lakes.tasks.jobs.cancel`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:cancel`
- Cancel jobs running for the task resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1CancelJobRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the job: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/task/{task_id}/job/{job_id}. |

### `dataplex.projects.locations.lakes.tasks.jobs.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Get job resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the job: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}/jobs/{job_id}. |

### `dataplex.projects.locations.lakes.tasks.jobs.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/jobs`
- Lists Jobs under the given task.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent environment: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of jobs to return. The service may return fewer than this value. If unspecified, at most 10 jobs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListJobs call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListJobs must match the call that provided the page token. |

### `dataplex.projects.locations.lakes.tasks.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/tasks`
- Lists tasks under the given lake.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListTasksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. |
| `filter` | query | string | no | Optional. Filter request. |
| `orderBy` | query | string | no | Optional. Order by fields for the result. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of tasks to return. The service may return fewer than this value. If unspecified, at most 10 tasks will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListZones call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListZones must match the call that provided the page token. |

### `dataplex.projects.locations.lakes.tasks.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Update the task resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Task`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The relative resource name of the task, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/ tasks/{task_id}. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.lakes.tasks.run`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:run`
- Run an on demand execution of a Task.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1RunTaskRequest`; Response: `GoogleCloudDataplexV1RunTaskResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the task: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}. |

### `dataplex.projects.locations.lakes.tasks.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.lakes.tasks.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.lakes.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.lakes.zones.actions.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/actions`
- Lists action resources in a zone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListActionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of actions to return. The service may return fewer than this value. If unspecified, at most 10 actions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListZoneActions call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListZoneActions must match the call that provided the page token. |

### `dataplex.projects.locations.lakes.zones.assets.actions.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/actions`
- Lists action resources in an asset.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListActionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent asset: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of actions to return. The service may return fewer than this value. If unspecified, at most 10 actions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListAssetActions call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListAssetActions must match the call that provided the page token. |

### `dataplex.projects.locations.lakes.zones.assets.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/assets`
- Creates an asset resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Asset`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. |
| `assetId` | query | string | yes | Required. Asset identifier. This ID will be used to generate names such as table names when publishing metadata to Hive Metastore and BigQuery. \* Must contain only lowercase letters, numbers and hyphens. \* Must start with a letter. \* Must end with a number or a letter. \* Must be between 1-63 characters. \* Must be unique within the zone. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.lakes.zones.assets.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes an asset resource. The referenced storage resource is detached (default) or deleted based on the associated Lifecycle policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the asset: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}. |

### `dataplex.projects.locations.lakes.zones.assets.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Retrieves an asset resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1Asset`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the asset: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}. |

### `dataplex.projects.locations.lakes.zones.assets.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.lakes.zones.assets.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/assets`
- Lists asset resources in a zone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListAssetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. |
| `filter` | query | string | no | Optional. Filter request. |
| `orderBy` | query | string | no | Optional. Order by fields for the result. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of asset to return. The service may return fewer than this value. If unspecified, at most 10 assets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListAssets call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListAssets must match the call that provided the page token. |

### `dataplex.projects.locations.lakes.zones.assets.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates an asset resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Asset`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The relative resource name of the asset, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.lakes.zones.assets.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.lakes.zones.assets.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.lakes.zones.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/zones`
- Creates a zone resource within a lake.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Zone`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |
| `zoneId` | query | string | yes | Required. Zone identifier. This ID will be used to generate names such as database and dataset names when publishing metadata to Hive Metastore and BigQuery. \* Must contain only lowercase letters, numbers and hyphens. \* Must start with a letter. \* Must end with a number or a letter. \* Must be between 1-63 characters. \* Must be unique across all lakes from all locations in a project. \* Must not be one of the reserved IDs (i.e. "default", "global-temp") |

### `dataplex.projects.locations.lakes.zones.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a zone resource. All assets within a zone must be deleted before the zone can be deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. |

### `dataplex.projects.locations.lakes.zones.entities.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/entities`
- Create a metadata entity.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Entity`; Response: `GoogleCloudDataplexV1Entity`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.lakes.zones.entities.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Delete a metadata entity.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the entity: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}. |
| `etag` | query | string | yes | Required. The etag associated with the entity, which can be retrieved with a GetEntity request. |

### `dataplex.projects.locations.lakes.zones.entities.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Get a metadata entity.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1Entity`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the entity: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}. |
| `view` | query | string enum | no | Optional. Used to select the subset of entity information to return. Defaults to BASIC. Values: `ENTITY_VIEW_UNSPECIFIED`, `BASIC`, `SCHEMA`, `FULL`. |

### `dataplex.projects.locations.lakes.zones.entities.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/entities`
- List metadata entities in a zone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1ListEntitiesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. |
| `filter` | query | string | no | Optional. The following filter parameters can be added to the URL to limit the entities returned by the API: Entity ID: ?filter="id=entityID" Asset ID: ?filter="asset=assetID" Data path ?filter="data_path=gs://my-bucket" Is HIVE compatible: ?filter="hive_compatible=true" Is BigQuery compatible: ?filter="bigquery_compatible=true" |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of entities to return. The service may return fewer than this value. If unspecified, 100 entities will be returned by default. The maximum value is 500; larger values will will be truncated to 500. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListEntities call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListEntities must match the call that provided the page token. |
| `view` | query | string enum | yes | Required. Specify the entity view to make a partial list request. Values: `ENTITY_VIEW_UNSPECIFIED`, `TABLES`, `FILESETS`. |

### `dataplex.projects.locations.lakes.zones.entities.partitions.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/partitions`
- Create a metadata partition.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Partition`; Response: `GoogleCloudDataplexV1Partition`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.lakes.zones.entities.partitions.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Delete a metadata partition.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the partition. format: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}/partitions/{partition_value_path}. The {partition_value_path} segment consists of an ordered sequence of partition values separated by "/". All values must be provided. |
| `etag` | query | string | no | Optional. The etag associated with the partition. |

### `dataplex.projects.locations.lakes.zones.entities.partitions.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Get a metadata partition of an entity.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1Partition`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the partition: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}/partitions/{partition_value_path}. The {partition_value_path} segment consists of an ordered sequence of partition values separated by "/". All values must be provided. |

### `dataplex.projects.locations.lakes.zones.entities.partitions.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/partitions`
- List metadata partitions of an entity.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1ListPartitionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent entity: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}. |
| `filter` | query | string | no | Optional. Filter the partitions returned to the caller using a key value pair expression. Supported operators and syntax: logic operators: AND, OR comparison operators: <, >, >=, <= ,=, != LIKE operators: The right hand of a LIKE operator supports "." and "\*" for wildcard searches, for example "value1 LIKE ".\*oo.\*" parenthetical grouping: ( )Sample filter expression: \`?filter="key1 < value1 OR key2 > value2"Notes: Keys to the left of operators are case insensitive. Partition results are sorted first by creation time, then by lexicographic order. Up to 20 key value filter pairs are allowed, but due to performance considerations, only the first 10 will be used as a filter. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of partitions to return. The service may return fewer than this value. If unspecified, 100 partitions will be returned by default. The maximum page size is 500; larger values will will be truncated to 500. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListPartitions call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListPartitions must match the call that provided the page token. |

### `dataplex.projects.locations.lakes.zones.entities.update`

- Versions: v1
- `PUT https://dataplex.googleapis.com/v1/{+name}`
- Update a metadata entity. Only supports full resource update.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Entity`; Response: `GoogleCloudDataplexV1Entity`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the entity, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{id}. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.lakes.zones.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Retrieves a zone resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1Zone`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. |

### `dataplex.projects.locations.lakes.zones.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.lakes.zones.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/zones`
- Lists zone resources in a lake.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListZonesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. |
| `filter` | query | string | no | Optional. Filter request. |
| `orderBy` | query | string | no | Optional. Order by fields for the result. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of zones to return. The service may return fewer than this value. If unspecified, at most 10 zones will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListZones call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListZones must match the call that provided the page token. |

### `dataplex.projects.locations.lakes.zones.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates a zone resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Zone`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The relative resource name of the zone, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.lakes.zones.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.lakes.zones.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service.This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: Global locations: If name is empty, the method lists the public locations available to all projects. Project-specific locations: If name follows the format projects/{project}, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project.For gRPC and client library implementations, the resource name is passed as the name field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudLocationListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. |

### `dataplex.projects.locations.lookupContext`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:lookupContext`
- Looks up LLM Context for the specified resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: `GoogleCloudDataplexV1LookupContextRequest`; Response: `GoogleCloudDataplexV1LookupContextResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project to which the request should be attributed in the following form: projects/{project}/locations/{location}. |

### `dataplex.projects.locations.lookupEntry`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}:lookupEntry`
- Looks up an entry by name using the permission on the source system.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1Entry`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project to which the request should be attributed in the following form: projects/{project}/locations/{location}. |
| `aspectTypes` | query | repeated string | no | Optional. Limits the aspects returned to the provided aspect types. It only works for CUSTOM view. |
| `entry` | query | string | yes | Required. The resource name of the Entry: projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}. |
| `paths` | query | repeated string | no | Optional. Limits the aspects returned to those associated with the provided paths within the Entry. It only works for CUSTOM view. |
| `view` | query | string enum | no | Optional. View to control which parts of an entry the service should return. Please check the limitations on returned aspects in the Entry view documentation. Amount of returned aspects depends on the selected Entry View. Values: `ENTRY_VIEW_UNSPECIFIED`, `BASIC`, `FULL`, `CUSTOM`, `ALL`. |

### `dataplex.projects.locations.lookupEntryLinks`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}:lookupEntryLinks`
- Looks up Entry Links referencing the specified Entry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1LookupEntryLinksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project to which the request should be attributed to Format: projects/{project_id_or_number}/locations/{location_id}. |
| `entry` | query | string | yes | Required. The resource name of the referred Entry. Format: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}. Entry Links which references this entry will be returned in the response. |
| `entryLinkTypes` | query | repeated string | no | Entry link types to filter the response by. If empty, all entry link types will be returned. At most 10 entry link types can be specified. |
| `entryMode` | query | string enum | no | Mode of entry reference. Values: `ENTRY_MODE_UNSPECIFIED`, `SOURCE`, `TARGET`. |
| `pageSize` | query | integer (int32) | no | Maximum number of EntryLinks to return. The service may return fewer than this value. If unspecified, at most 10 EntryLinks will be returned. The maximum value is 10; values above 10 will be coerced to 10. |
| `pageToken` | query | string | no | Page token received from a previous LookupEntryLinks call. Provide this to retrieve the subsequent page. When paginating, all other parameters that are provided to the LookupEntryLinks request must match the call that provided the page token. |

### `dataplex.projects.locations.metadataFeeds.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/metadataFeeds`
- Creates a MetadataFeed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1MetadataFeed`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent location, in the format projects/{project_id_or_number}/locations/{location_id} |
| `metadataFeedId` | query | string | no | Optional. The metadata job ID. If not provided, a unique ID is generated with the prefix metadata-job-. |
| `validateOnly` | query | boolean | no | Optional. The service validates the request without performing any mutations. The default is false. |

### `dataplex.projects.locations.metadataFeeds.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a MetadataFeed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the metadata feed, in the format projects/{project_id_or_number}/locations/{location_id}/metadataFeeds/{metadata_feed_id}. |

### `dataplex.projects.locations.metadataFeeds.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets a MetadataFeed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1MetadataFeed`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the metadata feed, in the format projects/{project_id_or_number}/locations/{location_id}/metadataFeeds/{metadata_feed_id}. |

### `dataplex.projects.locations.metadataFeeds.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/metadataFeeds`
- Retrieve a list of MetadataFeeds.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1ListMetadataFeedsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent location, in the format projects/{project_id_or_number}/locations/{location_id} |
| `filter` | query | string | no | Optional. Filter request. Filters are case-sensitive. The service supports the following formats: labels.key1 = "value1" labels:key1 name = "value"You can combine filters with AND, OR, and NOT operators. |
| `orderBy` | query | string | no | Optional. The field to sort the results by, either name or create_time. If not specified, the ordering is undefined. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of metadata feeds to return. The service might return fewer feeds than this value. If unspecified, at most 10 feeds are returned. The maximum value is 1,000. |
| `pageToken` | query | string | no | Optional. The page token received from a previous ListMetadataFeeds call. Provide this token to retrieve the subsequent page of results. When paginating, all other parameters that are provided to the ListMetadataFeeds request must match the call that provided the page token. |

### `dataplex.projects.locations.metadataFeeds.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates a MetadataFeed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1MetadataFeed`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the metadata feed, in the format projects/{project_id_or_number}/locations/{location_id}/metadataFeeds/{metadata_feed_id}. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Mask of fields to update. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.metadataJobs.cancel`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:cancel`
- Cancels a metadata job.If you cancel a metadata import job that is in progress, the changes in the job might be partially applied. We recommend that you reset the state of the entry groups in your project by running another metadata job that reverts the changes from the canceled job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1CancelMetadataJobRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the job, in the format projects/{project_id_or_number}/locations/{location_id}/metadataJobs/{metadata_job_id} |

### `dataplex.projects.locations.metadataJobs.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/metadataJobs`
- Creates a metadata job. For example, use a metadata job to import metadata from a third-party system into Dataplex Universal Catalog.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1MetadataJob`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent location, in the format projects/{project_id_or_number}/locations/{location_id} |
| `metadataJobId` | query | string | no | Optional. The metadata job ID. If not provided, a unique ID is generated with the prefix metadata-job-. |
| `validateOnly` | query | boolean | no | Optional. The service validates the request without performing any mutations. The default is false. |

### `dataplex.projects.locations.metadataJobs.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets a metadata job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1MetadataJob`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the metadata job, in the format projects/{project_id_or_number}/locations/{location_id}/metadataJobs/{metadata_job_id}. |

### `dataplex.projects.locations.metadataJobs.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/metadataJobs`
- Lists metadata jobs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1ListMetadataJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent location, in the format projects/{project_id_or_number}/locations/{location_id} |
| `filter` | query | string | no | Optional. Filter request. Filters are case-sensitive. The service supports the following formats: labels.key1 = "value1" labels:key1 name = "value"You can combine filters with AND, OR, and NOT operators. |
| `orderBy` | query | string | no | Optional. The field to sort the results by, either name or create_time. If not specified, the ordering is undefined. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of metadata jobs to return. The service might return fewer jobs than this value. If unspecified, at most 10 jobs are returned. The maximum value is 1,000. |
| `pageToken` | query | string | no | Optional. The page token received from a previous ListMetadataJobs call. Provide this token to retrieve the subsequent page of results. When paginating, all other parameters that are provided to the ListMetadataJobs request must match the call that provided the page token. |

### `dataplex.projects.locations.modifyEntry`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:modifyEntry`
- Modifies an entry using the permission on the source system.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1ModifyEntryRequest`; Response: `GoogleCloudDataplexV1Entry`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project to which the request should be attributed in the following form: projects/{project}/locations/{location}. |

### `dataplex.projects.locations.operations.cancel`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleLongrunningCancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `dataplex.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `dataplex.projects.locations.operations.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `dataplex.projects.locations.operations.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. |

### `dataplex.projects.locations.searchEntries`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:searchEntries`
- Searches for Entries matching the given query and scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1SearchEntriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project to which the request should be attributed in the following form: projects/{project}/locations/global. |
| `contexts` | query | repeated string | no | Optional. Specifies the scope of the context in which the search will be performed. This scope will also be used to perform IAM checks, which if passing, will return all resources in the scope. |
| `orderBy` | query | string | no | Optional. Specifies the ordering of results. Supported values are: relevance last_modified_timestamp last_modified_timestamp asc |
| `pageSize` | query | integer (int32) | no | Optional. Number of results in the search page. If <=0, then defaults to 10. Max limit for page_size is 1000. Throws an invalid argument for page_size > 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous SearchEntries call. Provide this to retrieve the subsequent page. |
| `query` | query | string | yes | Required. The query against which entries in scope should be matched. The query syntax is defined in Search syntax for Dataplex Universal Catalog (https://cloud.google.com/dataplex/docs/search-syntax). |
| `scope` | query | string | no | Optional. The scope under which the search should be operating. It must either be organizations/ or projects/. If it is unspecified, it defaults to the organization where the project provided in name is located. |
| `semanticSearch` | query | boolean | no | Optional. Specifies whether the search should understand the meaning and intent behind the query, rather than just matching keywords. |

### Example request skeleton

Generated from the Discovery entry of `dataplex.projects.locations.glossaries.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://dataplex.googleapis.com/v1/{+parent}/glossaries"
```

## Notes

- Generated from the Discovery document(s) v1 of `dataplex` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/dataplex/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`dataplex` v1, revision 20261106) also lists 50 endpoints of the form `https://dataplex.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `asia-southeast4`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west15`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://dataplex.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://dataplex.africa-south1.rep.googleapis.com/`) and keep the path.
- Corrected from the official docs (the Discovery text above is verbatim): the `name` descriptions of `dataplex.projects.locations.lakes.tasks.delete` and `dataplex.projects.locations.lakes.tasks.jobs.cancel` give `projects/{project_number}/locations/{location_id}/lakes/{lake_id}/task/{task_id}` and `.../lakes/{lake_id}/task/{task_id}/job/{job_id}` (singular; the proto comments in `google/cloud/dataplex/v1/service.proto` at googleapis commit `5ce0245` have the same text); the Discovery path patterns are `projects/[^/]+/locations/[^/]+/lakes/[^/]+/tasks/[^/]+` and `projects/[^/]+/locations/[^/]+/lakes/[^/]+/tasks/[^/]+/jobs/[^/]+` (`tasks` and `jobs`, plural), so the names have the forms `projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}` and `projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}/jobs/{job_id}`, as in `tasks.run` and `tasks.jobs.get`.
- Corrected from the source proto: the `scope` forms `organizations/` and `projects/` of `dataplex.projects.locations.searchEntries` lost their placeholders in the Discovery document; the proto comment reads "It must either be `organizations/<org_id>` or `projects/<project_ref>`." (`google/cloud/dataplex/v1/catalog.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataplex/v1/catalog.proto, commit `5ce0245`, retrieved 2026-11-19).
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://dataplex.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
