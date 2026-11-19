---
source: https://clouddeploy.googleapis.com/$discovery/rest?version=v1
---

# Cloud Deploy API REST API (clouddeploy)

## Signature / Usage

Base URL: `https://clouddeploy.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `clouddeploy.projects.locations.customTargetTypes.create`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+parent}/customTargetTypes`
- Creates a new CustomTargetType in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CustomTargetType`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which the `CustomTargetType` must be created. The format is `projects/{project_id}/locations/{location_name}`. |
| `customTargetTypeId` | query | string | yes | Required. ID of the `CustomTargetType`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `clouddeploy.projects.locations.customTargetTypes.delete`

- Versions: v1
- `DELETE https://clouddeploy.googleapis.com/v1/{+name}`
- Deletes a single CustomTargetType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `CustomTargetType` to delete. Format must be `projects/{project_id}/locations/{location_name}/customTargetTypes/{custom_target_type}`. |
| `allowMissing` | query | boolean | no | Optional. If set to true, then deleting an already deleted or non-existing `CustomTargetType` will succeed. |
| `etag` | query | string | no | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated but no actual change is made. |

### `clouddeploy.projects.locations.customTargetTypes.get`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}`
- Gets details of a single CustomTargetType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CustomTargetType`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the `CustomTargetType`. Format must be `projects/{project_id}/locations/{location_name}/customTargetTypes/{custom_target_type}`. |

### `clouddeploy.projects.locations.customTargetTypes.getIamPolicy`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `clouddeploy.projects.locations.customTargetTypes.list`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+parent}/customTargetTypes`
- Lists CustomTargetTypes in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCustomTargetTypesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent that owns this collection of custom target types. Format must be `projects/{project_id}/locations/{location_name}`. |
| `filter` | query | string | no | Optional. Filter custom target types to be returned. See https://google.aip.dev/160 for more details. |
| `orderBy` | query | string | no | Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of `CustomTargetType` objects to return. The service may return fewer than this value. If unspecified, at most 50 `CustomTargetType` objects will be returned. The maximum value is 1000; values above 1000 will be set to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListCustomTargetTypes` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. |

### `clouddeploy.projects.locations.customTargetTypes.patch`

- Versions: v1
- `PATCH https://clouddeploy.googleapis.com/v1/{+name}`
- Updates a single CustomTargetType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CustomTargetType`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the `CustomTargetType`. Format is `projects/{project}/locations/{location}/customTargetTypes/{customTargetType}`. The `customTargetType` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` |
| `allowMissing` | query | boolean | no | Optional. If set to true, updating a `CustomTargetType` that does not exist will result in the creation of a new `CustomTargetType`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten by the update in the `CustomTargetType` resource. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it's in the mask. If the user doesn't provide a mask then all fields are overwritten. |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `clouddeploy.projects.locations.customTargetTypes.setIamPolicy`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `clouddeploy.projects.locations.deliveryPipelines.automationRuns.cancel`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+name}:cancel`
- Cancels an AutomationRun. The `state` of the `AutomationRun` after cancelling is `CANCELLED`. `CancelAutomationRun` can be called on AutomationRun in the state `IN_PROGRESS` and `PENDING`; AutomationRun in a different state returns an `FAILED_PRECONDITION` error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelAutomationRunRequest`; Response: `CancelAutomationRunResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the `AutomationRun`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{delivery_pipeline}/automationRuns/{automation_run}`. |

### `clouddeploy.projects.locations.deliveryPipelines.automationRuns.get`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}`
- Gets details of a single AutomationRun.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AutomationRun`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the `AutomationRun`. Format must be `projects/{project}/locations/{location}/deliveryPipelines/{delivery_pipeline}/automationRuns/{automation_run}`. |

### `clouddeploy.projects.locations.deliveryPipelines.automationRuns.list`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+parent}/automationRuns`
- Lists AutomationRuns in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAutomationRunsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent `Delivery Pipeline`, which owns this collection of automationRuns. Format must be `projects/{project}/locations/{location}/deliveryPipelines/{delivery_pipeline}`. |
| `filter` | query | string | no | Filter automationRuns to be returned. All fields can be used in the filter. |
| `orderBy` | query | string | no | Field to sort by. |
| `pageSize` | query | integer (int32) | no | The maximum number of automationRuns to return. The service may return fewer than this value. If unspecified, at most 50 automationRuns will be returned. The maximum value is 1000; values above 1000 will be set to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListAutomationRuns` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. |

### `clouddeploy.projects.locations.deliveryPipelines.automations.create`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+parent}/automations`
- Creates a new Automation in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Automation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which the `Automation` must be created. The format is `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}`. |
| `automationId` | query | string | yes | Required. ID of the `Automation`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `clouddeploy.projects.locations.deliveryPipelines.automations.delete`

- Versions: v1
- `DELETE https://clouddeploy.googleapis.com/v1/{+name}`
- Deletes a single Automation resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `Automation` to delete. The format is `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/automations/{automation_name}`. |
| `allowMissing` | query | boolean | no | Optional. If set to true, then deleting an already deleted or non-existing `Automation` will succeed. |
| `etag` | query | string | no | Optional. The weak etag of the request. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and verify whether the resource exists, but do not actually post it. |

### `clouddeploy.projects.locations.deliveryPipelines.automations.get`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}`
- Gets details of a single Automation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Automation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the `Automation`. Format must be `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/automations/{automation_name}`. |

### `clouddeploy.projects.locations.deliveryPipelines.automations.list`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+parent}/automations`
- Lists Automations in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAutomationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent `Delivery Pipeline`, which owns this collection of automations. Format must be `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}`. |
| `filter` | query | string | no | Filter automations to be returned. All fields can be used in the filter. |
| `orderBy` | query | string | no | Field to sort by. |
| `pageSize` | query | integer (int32) | no | The maximum number of automations to return. The service may return fewer than this value. If unspecified, at most 50 automations will be returned. The maximum value is 1000; values above 1000 will be set to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListAutomations` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. |

### `clouddeploy.projects.locations.deliveryPipelines.automations.patch`

- Versions: v1
- `PATCH https://clouddeploy.googleapis.com/v1/{+name}`
- Updates the parameters of a single Automation resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Automation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Name of the `Automation`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{delivery_pipeline}/automations/{automation}`. |
| `allowMissing` | query | boolean | no | Optional. If set to true, updating a `Automation` that does not exist will result in the creation of a new `Automation`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten by the update in the `Automation` resource. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it's in the mask. If the user doesn't provide a mask then all fields are overwritten. |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `clouddeploy.projects.locations.deliveryPipelines.create`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+parent}/deliveryPipelines`
- Creates a new DeliveryPipeline in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeliveryPipeline`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which the `DeliveryPipeline` must be created. The format is `projects/{project_id}/locations/{location_name}`. |
| `deliveryPipelineId` | query | string | yes | Required. ID of the `DeliveryPipeline`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `clouddeploy.projects.locations.deliveryPipelines.delete`

- Versions: v1
- `DELETE https://clouddeploy.googleapis.com/v1/{+name}`
- Deletes a single DeliveryPipeline.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `DeliveryPipeline` to delete. The format is `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}`. |
| `allowMissing` | query | boolean | no | Optional. If set to true, then deleting an already deleted or non-existing `DeliveryPipeline` will succeed. |
| `etag` | query | string | no | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `force` | query | boolean | no | Optional. If set to true, all child resources under this pipeline will also be deleted. Otherwise, the request will only work if the pipeline has no child resources. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not actually post it. |

### `clouddeploy.projects.locations.deliveryPipelines.get`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}`
- Gets details of a single DeliveryPipeline.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DeliveryPipeline`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the `DeliveryPipeline`. Format must be `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}`. |

### `clouddeploy.projects.locations.deliveryPipelines.getIamPolicy`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `clouddeploy.projects.locations.deliveryPipelines.list`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+parent}/deliveryPipelines`
- Lists DeliveryPipelines in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDeliveryPipelinesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of pipelines. Format must be `projects/{project_id}/locations/{location_name}`. |
| `filter` | query | string | no | Filter pipelines to be returned. See https://google.aip.dev/160 for more details. |
| `orderBy` | query | string | no | Field to sort by. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | The maximum number of pipelines to return. The service may return fewer than this value. If unspecified, at most 50 pipelines will be returned. The maximum value is 1000; values above 1000 will be set to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListDeliveryPipelines` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. |

### `clouddeploy.projects.locations.deliveryPipelines.patch`

- Versions: v1
- `PATCH https://clouddeploy.googleapis.com/v1/{+name}`
- Updates the parameters of a single DeliveryPipeline.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeliveryPipeline`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the `DeliveryPipeline`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}`. The `deliveryPipeline` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` |
| `allowMissing` | query | boolean | no | Optional. If set to true, updating a `DeliveryPipeline` that does not exist will result in the creation of a new `DeliveryPipeline`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten by the update in the `DeliveryPipeline` resource. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it's in the mask. If the user doesn't provide a mask then all fields are overwritten. |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.abandon`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+name}:abandon`
- Abandons a Release in the Delivery Pipeline.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AbandonReleaseRequest`; Response: `AbandonReleaseResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the Release. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}`. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.create`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+parent}/releases`
- Creates a new Release in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Release`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which the `Release` is created. The format is `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}`. |
| `overrideDeployPolicy` | query | repeated string | no | Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. |
| `releaseId` | query | string | yes | Required. ID of the `Release`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.get`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}`
- Gets details of a single Release.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Release`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the `Release`. Format must be `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/releases/{release_name}`. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.list`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+parent}/releases`
- Lists Releases in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListReleasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The `DeliveryPipeline` which owns this collection of `Release` objects. |
| `filter` | query | string | no | Optional. Filter releases to be returned. See https://google.aip.dev/160 for more details. |
| `orderBy` | query | string | no | Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of `Release` objects to return. The service may return fewer than this value. If unspecified, at most 50 `Release` objects will be returned. The maximum value is 1000; values above 1000 will be set to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListReleases` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.advance`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+name}:advance`
- Advances a Rollout in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AdvanceRolloutRequest`; Response: `AdvanceRolloutResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the Rollout. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.approve`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+name}:approve`
- Approves a Rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApproveRolloutRequest`; Response: `ApproveRolloutResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the Rollout. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.cancel`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+name}:cancel`
- Cancels a Rollout in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelRolloutRequest`; Response: `CancelRolloutResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the Rollout. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.create`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+parent}/rollouts`
- Creates a new Rollout in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Rollout`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which the `Rollout` must be created. The format is `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/releases/{release_name}`. |
| `overrideDeployPolicy` | query | repeated string | no | Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `rolloutId` | query | string | yes | Required. ID of the `Rollout`. |
| `startingPhaseId` | query | string | no | Optional. The starting phase ID for the `Rollout`. If empty the `Rollout` will start at the first phase. |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.get`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}`
- Gets details of a single Rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Rollout`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the `Rollout`. Format must be `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/releases/{release_name}/rollouts/{rollout_name}`. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.ignoreJob`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+rollout}:ignoreJob`
- Ignores the specified Job in a Rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `IgnoreJobRequest`; Response: `IgnoreJobResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `rollout` | path | string | yes | Required. Name of the Rollout. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.jobRuns.get`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}`
- Gets details of a single JobRun.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `JobRun`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the `JobRun`. Format must be `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/releases/{release_name}/rollouts/{rollout_name}/jobRuns/{job_run_name}`. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.jobRuns.list`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+parent}/jobRuns`
- Lists JobRuns in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListJobRunsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The `Rollout` which owns this collection of `JobRun` objects. |
| `filter` | query | string | no | Optional. Filter results to be returned. See https://google.aip.dev/160 for more details. |
| `orderBy` | query | string | no | Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of `JobRun` objects to return. The service may return fewer than this value. If unspecified, at most 50 `JobRun` objects will be returned. The maximum value is 1000; values above 1000 will be set to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListJobRuns` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.jobRuns.terminate`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+name}:terminate`
- Terminates a Job Run in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TerminateJobRunRequest`; Response: `TerminateJobRunResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the `JobRun`. Format must be `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}/jobRuns/{jobRun}`. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.list`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+parent}/rollouts`
- Lists Rollouts in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRolloutsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The `Release` which owns this collection of `Rollout` objects. |
| `filter` | query | string | no | Optional. Filter rollouts to be returned. See https://google.aip.dev/160 for more details. |
| `orderBy` | query | string | no | Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of `Rollout` objects to return. The service may return fewer than this value. If unspecified, at most 50 `Rollout` objects will be returned. The maximum value is 1000; values above 1000 will be set to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListRollouts` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. |

### `clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.retryJob`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+rollout}:retryJob`
- Retries the specified Job in a Rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RetryJobRequest`; Response: `RetryJobResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `rollout` | path | string | yes | Required. Name of the Rollout. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. |

### `clouddeploy.projects.locations.deliveryPipelines.rollbackTarget`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+name}:rollbackTarget`
- Creates a `Rollout` to roll back the specified target.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RollbackTargetRequest`; Response: `RollbackTargetResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `DeliveryPipeline` for which the rollback `Rollout` must be created. The format is `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}`. |

### `clouddeploy.projects.locations.deliveryPipelines.setIamPolicy`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `clouddeploy.projects.locations.deliveryPipelines.testIamPermissions`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `clouddeploy.projects.locations.deployPolicies.create`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+parent}/deployPolicies`
- Creates a new DeployPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeployPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which the `DeployPolicy` must be created. The format is `projects/{project_id}/locations/{location_name}`. |
| `deployPolicyId` | query | string | yes | Required. ID of the `DeployPolicy`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `clouddeploy.projects.locations.deployPolicies.delete`

- Versions: v1
- `DELETE https://clouddeploy.googleapis.com/v1/{+name}`
- Deletes a single DeployPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `DeployPolicy` to delete. The format is `projects/{project_id}/locations/{location_name}/deployPolicies/{deploy_policy_name}`. |
| `allowMissing` | query | boolean | no | Optional. If set to true, then deleting an already deleted or non-existing `DeployPolicy` will succeed. |
| `etag` | query | string | no | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not actually post it. |

### `clouddeploy.projects.locations.deployPolicies.get`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}`
- Gets details of a single DeployPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DeployPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the `DeployPolicy`. Format must be `projects/{project_id}/locations/{location_name}/deployPolicies/{deploy_policy_name}`. |

### `clouddeploy.projects.locations.deployPolicies.getIamPolicy`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `clouddeploy.projects.locations.deployPolicies.list`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+parent}/deployPolicies`
- Lists DeployPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDeployPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of deploy policies. Format must be `projects/{project_id}/locations/{location_name}`. |
| `filter` | query | string | no | Filter deploy policies to be returned. See https://google.aip.dev/160 for more details. All fields can be used in the filter. |
| `orderBy` | query | string | no | Field to sort by. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | The maximum number of deploy policies to return. The service may return fewer than this value. If unspecified, at most 50 deploy policies will be returned. The maximum value is 1000; values above 1000 will be set to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListDeployPolicies` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. |

### `clouddeploy.projects.locations.deployPolicies.patch`

- Versions: v1
- `PATCH https://clouddeploy.googleapis.com/v1/{+name}`
- Updates the parameters of a single DeployPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeployPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Name of the `DeployPolicy`. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. The `deployPolicy` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` |
| `allowMissing` | query | boolean | no | Optional. If set to true, updating a `DeployPolicy` that does not exist will result in the creation of a new `DeployPolicy`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten by the update in the `DeployPolicy` resource. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it's in the mask. If the user doesn't provide a mask then all fields are overwritten. |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `clouddeploy.projects.locations.deployPolicies.setIamPolicy`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `clouddeploy.projects.locations.get`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `clouddeploy.projects.locations.getConfig`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}`
- Gets the configuration for a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Config`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of requested configuration. |

### `clouddeploy.projects.locations.list`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}/locations`
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

### `clouddeploy.projects.locations.operations.cancel`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `clouddeploy.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://clouddeploy.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `clouddeploy.projects.locations.operations.get`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `clouddeploy.projects.locations.operations.list`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}/operations`
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

### `clouddeploy.projects.locations.targets.create`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+parent}/targets`
- Creates a new Target in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Target`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which the `Target` must be created. The format is `projects/{project_id}/locations/{location_name}`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `targetId` | query | string | yes | Required. ID of the `Target`. |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `clouddeploy.projects.locations.targets.delete`

- Versions: v1
- `DELETE https://clouddeploy.googleapis.com/v1/{+name}`
- Deletes a single Target.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `Target` to delete. The format is `projects/{project_id}/locations/{location_name}/targets/{target_name}`. |
| `allowMissing` | query | boolean | no | Optional. If set to true, then deleting an already deleted or non-existing `Target` will succeed. |
| `etag` | query | string | no | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not actually post it. |

### `clouddeploy.projects.locations.targets.get`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+name}`
- Gets details of a single Target.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Target`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the `Target`. Format must be `projects/{project_id}/locations/{location_name}/targets/{target_name}`. |

### `clouddeploy.projects.locations.targets.getIamPolicy`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `clouddeploy.projects.locations.targets.list`

- Versions: v1
- `GET https://clouddeploy.googleapis.com/v1/{+parent}/targets`
- Lists Targets in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTargetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of targets. Format must be `projects/{project_id}/locations/{location_name}`. |
| `filter` | query | string | no | Optional. Filter targets to be returned. See https://google.aip.dev/160 for more details. |
| `orderBy` | query | string | no | Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of `Target` objects to return. The service may return fewer than this value. If unspecified, at most 50 `Target` objects will be returned. The maximum value is 1000; values above 1000 will be set to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListTargets` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. |

### `clouddeploy.projects.locations.targets.patch`

- Versions: v1
- `PATCH https://clouddeploy.googleapis.com/v1/{+name}`
- Updates the parameters of a single Target.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Target`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the `Target`. Format is `projects/{project}/locations/{location}/targets/{target}`. The `target` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` |
| `allowMissing` | query | boolean | no | Optional. If set to true, updating a `Target` that does not exist will result in the creation of a new `Target`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten by the update in the `Target` resource. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it's in the mask. If the user doesn't provide a mask then all fields are overwritten. |
| `validateOnly` | query | boolean | no | Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `clouddeploy.projects.locations.targets.setIamPolicy`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `clouddeploy.projects.locations.targets.testIamPermissions`

- Versions: v1
- `POST https://clouddeploy.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `clouddeploy.projects.locations.customTargetTypes.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://clouddeploy.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `clouddeploy` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`clouddeploy` v1, revision 20260722) also lists 12 endpoints of the form `https://clouddeploy.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `asia-south1`, `asia-south2`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://clouddeploy.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://clouddeploy.asia-south1.rep.googleapis.com/`) and keep the path.
- Source: https://clouddeploy.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
