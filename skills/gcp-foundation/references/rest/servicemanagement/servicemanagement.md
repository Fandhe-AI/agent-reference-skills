---
source: https://servicemanagement.googleapis.com/$discovery/rest?version=v1
---

# Service Management API REST API (servicemanagement)

## Signature / Usage

Base URL: `https://servicemanagement.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `servicemanagement.operations.get`

- Versions: v1
- `GET https://servicemanagement.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `servicemanagement.operations.list`

- Versions: v1
- `GET https://servicemanagement.googleapis.com/v1/operations`
- Lists service operations that match the specified filter in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `filter` | query | string | yes | A string for filtering Operations. The following filter fields are supported: \* serviceName: Required. Only `=` operator is allowed. \* startTime: The time this job was started, in ISO 8601 format. Allowed operators are `>=`, `>`, `<=`, and `<`. \* status: Can be `done`, `in_progress`, or `failed`. Allowed operators are `=`, and `!=`. Filter expression supports conjunction (AND) and disjunction (OR) logical operators. However, the serviceName restriction must be at the top-level and can only be combined with other restrictions via the AND logical operator. Examples: \* `serviceName={some-service}.googleapis.com` \* `serviceName={some-service}.googleapis.com AND startTime>="2017-02-01"` \* `serviceName={some-service}.googleapis.com AND status=done` \* `serviceName={some-service}.googleapis.com AND (status=done OR startTime>="2017-02-01")` |
| `name` | query | string | no | Not used. |
| `pageSize` | query | integer (int32) | no | The maximum number of operations to return. If unspecified, defaults to 50. The maximum value is 100. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `servicemanagement.services.configs.create`

- Versions: v1
- `POST https://servicemanagement.googleapis.com/v1/services/{serviceName}/configs`
- Creates a new service configuration (version) for a managed service. This method only stores the service configuration. To roll out the service configuration to backend systems please call CreateServiceRollout. Only the 100 most recent service configurations and ones referenced by existing rollouts are kept for each service. The rest will be deleted eventually.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `Service`; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | Required. The name of the service. See the overview (https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. |

### `servicemanagement.services.configs.get`

- Versions: v1
- `GET https://servicemanagement.googleapis.com/v1/services/{serviceName}/configs/{configId}`
- Gets a service configuration (version) for a managed service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/service.management`, `https://www.googleapis.com/auth/service.management.readonly`
- Request: —; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | Required. The name of the service. See the overview (https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. |
| `configId` | path | string | yes | Required. The id of the service configuration resource. This field must be specified for the server to return all fields, including `SourceInfo`. |
| `view` | query | string enum | no | Specifies which parts of the Service Config should be returned in the response. Values: `BASIC`, `FULL`. |

### `servicemanagement.services.configs.list`

- Versions: v1
- `GET https://servicemanagement.googleapis.com/v1/services/{serviceName}/configs`
- Lists the history of the service configuration for a managed service, from the newest to the oldest.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/service.management`, `https://www.googleapis.com/auth/service.management.readonly`
- Request: —; Response: `ListServiceConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | Required. The name of the service. See the overview (https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. |
| `pageSize` | query | integer (int32) | no | The max number of items to include in the response list. Page size is 50 if not specified. Maximum value is 100. |
| `pageToken` | query | string | no | The token of the page to retrieve. |

### `servicemanagement.services.configs.submit`

- Versions: v1
- `POST https://servicemanagement.googleapis.com/v1/services/{serviceName}/configs:submit`
- Creates a new service configuration (version) for a managed service based on user-supplied configuration source files (for example: OpenAPI Specification). This method stores the source configurations as well as the generated service configuration. To rollout the service configuration to other services, please call CreateServiceRollout. Only the 100 most recent configuration sources and ones referenced by existing service configurtions are kept for each service. The rest will be deleted eventually. Operation
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `SubmitConfigSourceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | Required. The name of the service. See the overview (https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. |

### `servicemanagement.services.consumers.getIamPolicy`

- Versions: v1
- `POST https://servicemanagement.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/service.management`, `https://www.googleapis.com/auth/service.management.readonly`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicemanagement.services.consumers.setIamPolicy`

- Versions: v1
- `POST https://servicemanagement.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicemanagement.services.consumers.testIamPermissions`

- Versions: v1
- `POST https://servicemanagement.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/service.management`, `https://www.googleapis.com/auth/service.management.readonly`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicemanagement.services.create`

- Versions: v1
- `POST https://servicemanagement.googleapis.com/v1/services`
- Creates a new managed service. A managed service is immutable, and is subject to mandatory 30-day data retention. You cannot move a service or recreate it within 30 days after deletion. One producer project can own no more than 500 services. For security and reliability purposes, a production service should be hosted in a dedicated producer project. Operation
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `ManagedService`; Response: `Operation`

### `servicemanagement.services.delete`

- Versions: v1
- `DELETE https://servicemanagement.googleapis.com/v1/services/{serviceName}`
- Deletes a managed service. This method will change the service to the `Soft-Delete` state for 30 days. Within this period, service producers may call UndeleteService to restore the service. After 30 days, the service will be permanently deleted. Operation
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | Required. The name of the service. See the overview (https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. |

### `servicemanagement.services.generateConfigReport`

- Versions: v1
- `POST https://servicemanagement.googleapis.com/v1/services:generateConfigReport`
- Generates and returns a report (errors, warnings and changes from existing configurations) associated with GenerateConfigReportRequest.new_value If GenerateConfigReportRequest.old_value is specified, GenerateConfigReportRequest will contain a single ChangeReport based on the comparison between GenerateConfigReportRequest.new_value and GenerateConfigReportRequest.old_value. If GenerateConfigReportRequest.old_value is not specified, this method will compare GenerateConfigReportRequest.new_value with the last pushed service configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `GenerateConfigReportRequest`; Response: `GenerateConfigReportResponse`

### `servicemanagement.services.get`

- Versions: v1
- `GET https://servicemanagement.googleapis.com/v1/services/{serviceName}`
- Gets a managed service. Authentication is required unless the service is public.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/service.management`, `https://www.googleapis.com/auth/service.management.readonly`
- Request: —; Response: `ManagedService`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | Required. The name of the service. See the `ServiceManager` overview for naming requirements. For example: `example.googleapis.com`. |

### `servicemanagement.services.getConfig`

- Versions: v1
- `GET https://servicemanagement.googleapis.com/v1/services/{serviceName}/config`
- Gets a service configuration (version) for a managed service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/service.management`, `https://www.googleapis.com/auth/service.management.readonly`
- Request: —; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | Required. The name of the service. See the overview (https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. |
| `configId` | query | string | yes | Required. The id of the service configuration resource. This field must be specified for the server to return all fields, including `SourceInfo`. |
| `view` | query | string enum | no | Specifies which parts of the Service Config should be returned in the response. Values: `BASIC`, `FULL`. |

### `servicemanagement.services.getIamPolicy`

- Versions: v1
- `POST https://servicemanagement.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/service.management`, `https://www.googleapis.com/auth/service.management.readonly`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicemanagement.services.list`

- Versions: v1
- `GET https://servicemanagement.googleapis.com/v1/services`
- Lists managed services. Returns all public services. For authenticated users, also returns all services the calling user has "servicemanagement.services.get" permission for.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/service.management`, `https://www.googleapis.com/auth/service.management.readonly`
- Request: —; Response: `ListServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `consumerId` | query | string | no | Include services consumed by the specified consumer. The Google Service Management implementation accepts the following forms: - project: |
| `pageSize` | query | integer (int32) | no | The max number of items to include in the response list. Page size is 50 if not specified. Maximum value is 500. |
| `pageToken` | query | string | no | Token identifying which result to start with; returned by a previous list call. |
| `producerProjectId` | query | string | no | Include services produced by the specified project. |

### `servicemanagement.services.rollouts.create`

- Versions: v1
- `POST https://servicemanagement.googleapis.com/v1/services/{serviceName}/rollouts`
- Creates a new service configuration rollout. Based on rollout, the Google Service Management will roll out the service configurations to different backend services. For example, the logging configuration will be pushed to Google Cloud Logging. Please note that any previous pending and running Rollouts and associated Operations will be automatically cancelled so that the latest Rollout will not be blocked by previous Rollouts. Only the 100 most recent (in any state) and the last 10 successful (if not already part of the set of 100 most recent) rollouts are kept for each service. The rest will be deleted eventually. Operation
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `Rollout`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | Required. The name of the service. See the overview (https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. |

### `servicemanagement.services.rollouts.get`

- Versions: v1
- `GET https://servicemanagement.googleapis.com/v1/services/{serviceName}/rollouts/{rolloutId}`
- Gets a service configuration rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/service.management`, `https://www.googleapis.com/auth/service.management.readonly`
- Request: —; Response: `Rollout`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | Required. The name of the service. See the overview (https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. |
| `rolloutId` | path | string | yes | Required. The id of the rollout resource. |

### `servicemanagement.services.rollouts.list`

- Versions: v1
- `GET https://servicemanagement.googleapis.com/v1/services/{serviceName}/rollouts`
- Lists the history of the service configuration rollouts for a managed service, from the newest to the oldest.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/service.management`, `https://www.googleapis.com/auth/service.management.readonly`
- Request: —; Response: `ListServiceRolloutsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | Required. The name of the service. See the overview (https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. |
| `filter` | query | string | yes | Required. Use `filter` to return subset of rollouts. The following filters are supported: -- By status. For example, `filter='status=SUCCESS'` -- By strategy. For example, `filter='strategy=TrafficPercentStrategy'` |
| `pageSize` | query | integer (int32) | no | The max number of items to include in the response list. Page size is 50 if not specified. Maximum value is 100. |
| `pageToken` | query | string | no | The token of the page to retrieve. |

### `servicemanagement.services.setIamPolicy`

- Versions: v1
- `POST https://servicemanagement.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicemanagement.services.testIamPermissions`

- Versions: v1
- `POST https://servicemanagement.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/service.management`, `https://www.googleapis.com/auth/service.management.readonly`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicemanagement.services.undelete`

- Versions: v1
- `POST https://servicemanagement.googleapis.com/v1/services/{serviceName}:undelete`
- Revives a previously deleted managed service. The method restores the service using the configuration at the time the service was deleted. The target service must exist and must have been deleted within the last 30 days. Operation
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | Required. The name of the service. See the overview (https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. |

### Example request skeleton

Generated from the Discovery entry of `servicemanagement.operations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://servicemanagement.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `servicemanagement` (retrieved 2026-11-14). Resources on this page: operations, services.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/servicemanagement/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://servicemanagement.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
