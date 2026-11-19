---
source: https://runtimeconfig.googleapis.com/$discovery/rest?version=v1
---

# Cloud Runtime Configuration API REST API (runtimeconfig)

## Signature / Usage

Base URL: `https://runtimeconfig.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `runtimeconfig.operations.cancel`

- Versions: v1
- `POST https://runtimeconfig.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `runtimeconfig.operations.delete`

- Versions: v1
- `DELETE https://runtimeconfig.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `runtimeconfig.operations.list`

- Versions: v1
- `GET https://runtimeconfig.googleapis.com/v1/{+name}`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `runtimeconfig.projects.configs.create`

- Versions: v1beta1
- `POST https://runtimeconfig.googleapis.com/v1beta1/{+parent}/configs`
- Creates a new RuntimeConfig resource. The configuration name must be unique within project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: `RuntimeConfig`; Response: `RuntimeConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The project ID (https://support.google.com/cloud/answer/6158840?hl=en&ref_topic=6158848) for this request, in the format `projects/[PROJECT_ID]`. |
| `requestId` | query | string | no | An optional but recommended unique `request_id`. If the server receives two `create()` requests with the same `request_id`, then the second request will be ignored and the first resource created and stored in the backend is returned. Empty `request_id` fields are ignored. It is responsibility of the client to ensure uniqueness of the `request_id` strings. `request_id` strings are limited to 64 characters. |

### `runtimeconfig.projects.configs.delete`

- Versions: v1beta1
- `DELETE https://runtimeconfig.googleapis.com/v1beta1/{+name}`
- Deletes a RuntimeConfig resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The RuntimeConfig resource to delete, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` |

### `runtimeconfig.projects.configs.get`

- Versions: v1beta1
- `GET https://runtimeconfig.googleapis.com/v1beta1/{+name}`
- Gets information about a RuntimeConfig resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `RuntimeConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the RuntimeConfig resource to retrieve, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` |

### `runtimeconfig.projects.configs.getIamPolicy`

- Versions: v1beta1
- `GET https://runtimeconfig.googleapis.com/v1beta1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `runtimeconfig.projects.configs.list`

- Versions: v1beta1
- `GET https://runtimeconfig.googleapis.com/v1beta1/{+parent}/configs`
- Lists all the RuntimeConfig resources within project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `ListConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The project ID (https://support.google.com/cloud/answer/6158840?hl=en&ref_topic=6158848) for this request, in the format `projects/[PROJECT_ID]`. |
| `pageSize` | query | integer (int32) | no | Specifies the number of results to return per page. If there are fewer elements than the specified number, returns all elements. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to a `nextPageToken` returned by a previous list request to get the next page of results. |

### `runtimeconfig.projects.configs.operations.get`

- Versions: v1beta1
- `GET https://runtimeconfig.googleapis.com/v1beta1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `runtimeconfig.projects.configs.operations.testIamPermissions`

- Versions: v1beta1
- `POST https://runtimeconfig.googleapis.com/v1beta1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `runtimeconfig.projects.configs.setIamPolicy`

- Versions: v1beta1
- `POST https://runtimeconfig.googleapis.com/v1beta1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `runtimeconfig.projects.configs.testIamPermissions`

- Versions: v1beta1
- `POST https://runtimeconfig.googleapis.com/v1beta1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `runtimeconfig.projects.configs.update`

- Versions: v1beta1
- `PUT https://runtimeconfig.googleapis.com/v1beta1/{+name}`
- Updates a RuntimeConfig resource. The configuration must exist beforehand.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: `RuntimeConfig`; Response: `RuntimeConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the RuntimeConfig resource to update, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` |

### `runtimeconfig.projects.configs.variables.create`

- Versions: v1beta1
- `POST https://runtimeconfig.googleapis.com/v1beta1/{+parent}/variables`
- Creates a variable within the given configuration. You cannot create a variable with a name that is a prefix of an existing variable name, or a name that has an existing variable name as a prefix. To learn more about creating a variable, read the Setting and Getting Data documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: `Variable`; Response: `Variable`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The path to the RutimeConfig resource that this variable should belong to. The configuration must exist beforehand; the path must be in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` |
| `requestId` | query | string | no | An optional but recommended unique `request_id`. If the server receives two `create()` requests with the same `request_id`, then the second request will be ignored and the first resource created and stored in the backend is returned. Empty `request_id` fields are ignored. It is responsibility of the client to ensure uniqueness of the `request_id` strings. `request_id` strings are limited to 64 characters. |

### `runtimeconfig.projects.configs.variables.delete`

- Versions: v1beta1
- `DELETE https://runtimeconfig.googleapis.com/v1beta1/{+name}`
- Deletes a variable or multiple variables. If you specify a variable name, then that variable is deleted. If you specify a prefix and `recursive` is true, then all variables with that prefix are deleted. You must set a `recursive` to true if you delete variables by prefix.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the variable to delete, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_NAME]` |
| `recursive` | query | boolean | no | Set to `true` to recursively delete multiple variables with the same prefix. |

### `runtimeconfig.projects.configs.variables.get`

- Versions: v1beta1
- `GET https://runtimeconfig.googleapis.com/v1beta1/{+name}`
- Gets information about a single variable.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `Variable`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the variable to return, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIBLE_NAME]` |

### `runtimeconfig.projects.configs.variables.list`

- Versions: v1beta1
- `GET https://runtimeconfig.googleapis.com/v1beta1/{+parent}/variables`
- Lists variables within given a configuration, matching any provided filters. This only lists variable names, not the values, unless `return_values` is true, in which case only variables that user has IAM permission to GetVariable will be returned.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `ListVariablesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The path to the RuntimeConfig resource for which you want to list variables. The configuration must exist beforehand; the path must be in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` |
| `filter` | query | string | no | Filters variables by matching the specified filter. For example: `projects/example-project/config/[CONFIG_NAME]/variables/example-variable`. |
| `pageSize` | query | integer (int32) | no | Specifies the number of results to return per page. If there are fewer elements than the specified number, returns all elements. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to a `nextPageToken` returned by a previous list request to get the next page of results. |
| `returnValues` | query | boolean | no | The flag indicates whether the user wants to return values of variables. If true, then only those variables that user has IAM GetVariable permission will be returned along with their values. |

### `runtimeconfig.projects.configs.variables.testIamPermissions`

- Versions: v1beta1
- `POST https://runtimeconfig.googleapis.com/v1beta1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `runtimeconfig.projects.configs.variables.update`

- Versions: v1beta1
- `PUT https://runtimeconfig.googleapis.com/v1beta1/{+name}`
- Updates an existing variable with a new value.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: `Variable`; Response: `Variable`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the variable to update, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_NAME]` |

### `runtimeconfig.projects.configs.variables.watch`

- Versions: v1beta1
- `POST https://runtimeconfig.googleapis.com/v1beta1/{+name}:watch`
- Watches a specific variable and waits for a change in the variable's value. When there is a change, this method returns the new value or times out. If a variable is deleted while being watched, the `variableState` state is set to `DELETED` and the method returns the last known variable `value`. If you set the deadline for watching to a larger value than internal timeout (60 seconds), the current variable value is returned and the `variableState` will be `VARIABLE_STATE_UNSPECIFIED`. To learn more about creating a watcher, read the Watching a Variable for Changes documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: `WatchVariableRequest`; Response: `Variable`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the variable to watch, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` |

### `runtimeconfig.projects.configs.waiters.create`

- Versions: v1beta1
- `POST https://runtimeconfig.googleapis.com/v1beta1/{+parent}/waiters`
- Creates a Waiter resource. This operation returns a long-running Operation resource which can be polled for completion. However, a waiter with the given name will exist (and can be retrieved) prior to the operation completing. If the operation fails, the failed Waiter resource will still exist and must be deleted prior to subsequent creation attempts.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: `Waiter`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The path to the configuration that will own the waiter. The configuration must exist beforehand; the path must be in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`. |
| `requestId` | query | string | no | An optional but recommended unique `request_id`. If the server receives two `create()` requests with the same `request_id`, then the second request will be ignored and the first resource created and stored in the backend is returned. Empty `request_id` fields are ignored. It is responsibility of the client to ensure uniqueness of the `request_id` strings. `request_id` strings are limited to 64 characters. |

### `runtimeconfig.projects.configs.waiters.delete`

- Versions: v1beta1
- `DELETE https://runtimeconfig.googleapis.com/v1beta1/{+name}`
- Deletes the waiter with the specified name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The Waiter resource to delete, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]` |

### `runtimeconfig.projects.configs.waiters.get`

- Versions: v1beta1
- `GET https://runtimeconfig.googleapis.com/v1beta1/{+name}`
- Gets information about a single waiter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `Waiter`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The fully-qualified name of the Waiter resource object to retrieve, in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]` |

### `runtimeconfig.projects.configs.waiters.list`

- Versions: v1beta1
- `GET https://runtimeconfig.googleapis.com/v1beta1/{+parent}/waiters`
- List waiters within the given configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: —; Response: `ListWaitersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The path to the configuration for which you want to get a list of waiters. The configuration must exist beforehand; the path must be in the format: `projects/[PROJECT_ID]/configs/[CONFIG_NAME]` |
| `pageSize` | query | integer (int32) | no | Specifies the number of results to return per page. If there are fewer elements than the specified number, returns all elements. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to a `nextPageToken` returned by a previous list request to get the next page of results. |

### `runtimeconfig.projects.configs.waiters.testIamPermissions`

- Versions: v1beta1
- `POST https://runtimeconfig.googleapis.com/v1beta1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudruntimeconfig`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `runtimeconfig.operations.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://runtimeconfig.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `runtimeconfig` (retrieved 2026-11-14). Resources on this page: operations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/runtimeconfig/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the Discovery document: the description of `name` in `runtimeconfig.projects.configs.variables.watch` gives the resource name format `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`, but the path pattern of `name` is `^projects/[^/]+/configs/[^/]+/variables/.*$`; a value must match the pattern to reach the route.
- Source: https://runtimeconfig.googleapis.com/$discovery/rest?version=v1, https://runtimeconfig.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
