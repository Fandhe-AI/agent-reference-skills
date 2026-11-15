---
source: https://serviceusage.googleapis.com/$discovery/rest?version=v1
---

# Service Usage API REST API (serviceusage)

## Signature / Usage

Base URL: `https://serviceusage.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `serviceusage.operations.cancel`

- Versions: v1
- `POST https://serviceusage.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `serviceusage.operations.delete`

- Versions: v1
- `DELETE https://serviceusage.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `serviceusage.operations.get`

- Versions: v1, v1beta1
- `GET https://serviceusage.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `serviceusage.operations.list`

- Versions: v1, v1beta1
- `GET https://serviceusage.googleapis.com/v1/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `filter` | query | string | no | The standard list filter. |
| `name` | query | string | no | The name of the operation's parent resource. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `serviceusage.services.batchEnable`

- Versions: v1, v1beta1
- `POST https://serviceusage.googleapis.com/v1/{+parent}/services:batchEnable`
- Enable multiple services on a project. The operation is atomic: if enabling any service fails, then the entire batch fails, and no state changes occur. To enable a single service, use the `EnableService` method instead.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `BatchEnableServicesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Parent to enable services on. An example name would be: `projects/123` where `123` is the project number. The `BatchEnableServices` method currently only supports projects. |

### `serviceusage.services.batchGet`

- Versions: v1
- `GET https://serviceusage.googleapis.com/v1/{+parent}/services:batchGet`
- Returns the service configurations and enabled states for a given list of services.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `BatchGetServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Parent to retrieve services from. If this is set, the parent of all of the services specified in `names` must match this field. An example name would be: `projects/123` where `123` is the project number. The `BatchGetServices` method currently only supports projects. |
| `names` | query | repeated string | no | Names of the services to retrieve. An example name would be: `projects/123/services/serviceusage.googleapis.com` where `123` is the project number. A single request can get a maximum of 30 services at a time. |

### `serviceusage.services.consumerQuotaMetrics.get`

- Versions: v1beta1
- `GET https://serviceusage.googleapis.com/v1beta1/{+name}`
- Retrieves a summary of quota information for a specific quota metric
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ConsumerQuotaMetric`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the quota. An example name would be: `projects/123/services/serviceusage.googleapis.com/consumerQuotaMetrics/serviceusage.googleapis.com%2Fmutate_requests` |
| `view` | query | string enum | no | Specifies the level of detail for quota information in the response. Values: `QUOTA_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `serviceusage.services.consumerQuotaMetrics.importAdminOverrides`

- Versions: v1beta1
- `POST https://serviceusage.googleapis.com/v1beta1/{+parent}/consumerQuotaMetrics:importAdminOverrides`
- Creates or updates multiple admin overrides atomically, all on the same consumer, but on many different metrics or limits. The name field in the quota override message should not be set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `ImportAdminOverridesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the consumer. An example name would be: `projects/123/services/compute.googleapis.com` |

### `serviceusage.services.consumerQuotaMetrics.importConsumerOverrides`

- Versions: v1beta1
- `POST https://serviceusage.googleapis.com/v1beta1/{+parent}/consumerQuotaMetrics:importConsumerOverrides`
- Creates or updates multiple consumer overrides atomically, all on the same consumer, but on many different metrics or limits. The name field in the quota override message should not be set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `ImportConsumerOverridesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the consumer. An example name would be: `projects/123/services/compute.googleapis.com` |

### `serviceusage.services.consumerQuotaMetrics.limits.adminOverrides.create`

- Versions: v1beta1
- `POST https://serviceusage.googleapis.com/v1beta1/{+parent}/adminOverrides`
- Creates an admin override. An admin override is applied by an administrator of a parent folder or parent organization of the consumer receiving the override. An admin override is intended to limit the amount of quota the consumer can use out of the total quota pool allocated to all children of the folder or organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `QuotaOverride`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the parent quota limit, returned by a ListConsumerQuotaMetrics or GetConsumerQuotaMetric call. An example name would be: `projects/123/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` |
| `force` | query | boolean | no | Whether to force the creation of the quota override. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. If force is set to true, it is recommended to include a case id in "X-Goog-Request-Reason" header when sending the request. |
| `forceOnly` | query | repeated string enum | no | The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. If force_only is specified, it is recommended to include a case id in "X-Goog-Request-Reason" header when sending the request. Values: `QUOTA_SAFETY_CHECK_UNSPECIFIED`, `LIMIT_DECREASE_BELOW_USAGE`, `LIMIT_DECREASE_PERCENTAGE_TOO_HIGH`. |

### `serviceusage.services.consumerQuotaMetrics.limits.adminOverrides.delete`

- Versions: v1beta1
- `DELETE https://serviceusage.googleapis.com/v1beta1/{+name}`
- Deletes an admin override.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the override to delete. An example name would be: `projects/123/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/adminOverrides/4a3f2c1d` |
| `force` | query | boolean | no | Whether to force the deletion of the quota override. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. If force is set to true, it is recommended to include a case id in "X-Goog-Request-Reason" header when sending the request. |
| `forceOnly` | query | repeated string enum | no | The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. If force_only is specified, it is recommended to include a case id in "X-Goog-Request-Reason" header when sending the request. Values: `QUOTA_SAFETY_CHECK_UNSPECIFIED`, `LIMIT_DECREASE_BELOW_USAGE`, `LIMIT_DECREASE_PERCENTAGE_TOO_HIGH`. |

### `serviceusage.services.consumerQuotaMetrics.limits.adminOverrides.list`

- Versions: v1beta1
- `GET https://serviceusage.googleapis.com/v1beta1/{+parent}/adminOverrides`
- Lists all admin overrides on this limit.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListAdminOverridesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the parent quota limit, returned by a ListConsumerQuotaMetrics or GetConsumerQuotaMetric call. An example name would be: `projects/123/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` |
| `pageSize` | query | integer (int32) | no | Requested size of the next page of data. |
| `pageToken` | query | string | no | Token identifying which result to start with; returned by a previous list call. |

### `serviceusage.services.consumerQuotaMetrics.limits.adminOverrides.patch`

- Versions: v1beta1
- `PATCH https://serviceusage.googleapis.com/v1beta1/{+name}`
- Updates an admin override.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `QuotaOverride`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the override to update. An example name would be: `projects/123/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/adminOverrides/4a3f2c1d` |
| `force` | query | boolean | no | Whether to force the update of the quota override. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. If force is set to true, it is recommended to include a case id in "X-Goog-Request-Reason" header when sending the request. |
| `forceOnly` | query | repeated string enum | no | The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. If force_only is specified, it is recommended to include a case id in "X-Goog-Request-Reason" header when sending the request. Values: `QUOTA_SAFETY_CHECK_UNSPECIFIED`, `LIMIT_DECREASE_BELOW_USAGE`, `LIMIT_DECREASE_PERCENTAGE_TOO_HIGH`. |
| `updateMask` | query | string (google-fieldmask) | no | Update only the specified fields of the override. If unset, all fields will be updated. |

### `serviceusage.services.consumerQuotaMetrics.limits.consumerOverrides.create`

- Versions: v1beta1
- `POST https://serviceusage.googleapis.com/v1beta1/{+parent}/consumerOverrides`
- Creates a consumer override. A consumer override is applied to the consumer on its own authority to limit its own quota usage. Consumer overrides cannot be used to grant more quota than would be allowed by admin overrides, producer overrides, or the default limit of the service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `QuotaOverride`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the parent quota limit, returned by a ListConsumerQuotaMetrics or GetConsumerQuotaMetric call. An example name would be: `projects/123/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` |
| `force` | query | boolean | no | Whether to force the creation of the quota override. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. If force is set to true, it is recommended to include a case id in "X-Goog-Request-Reason" header when sending the request. |
| `forceOnly` | query | repeated string enum | no | The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. If force_only is specified, it is recommended to include a case id in "X-Goog-Request-Reason" header when sending the request. Values: `QUOTA_SAFETY_CHECK_UNSPECIFIED`, `LIMIT_DECREASE_BELOW_USAGE`, `LIMIT_DECREASE_PERCENTAGE_TOO_HIGH`. |

### `serviceusage.services.consumerQuotaMetrics.limits.consumerOverrides.delete`

- Versions: v1beta1
- `DELETE https://serviceusage.googleapis.com/v1beta1/{+name}`
- Deletes a consumer override.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the override to delete. An example name would be: `projects/123/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/consumerOverrides/4a3f2c1d` |
| `force` | query | boolean | no | Whether to force the deletion of the quota override. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. If force is set to true, it is recommended to include a case id in "X-Goog-Request-Reason" header when sending the request. |
| `forceOnly` | query | repeated string enum | no | The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. If force_only is specified, it is recommended to include a case id in "X-Goog-Request-Reason" header when sending the request. Values: `QUOTA_SAFETY_CHECK_UNSPECIFIED`, `LIMIT_DECREASE_BELOW_USAGE`, `LIMIT_DECREASE_PERCENTAGE_TOO_HIGH`. |

### `serviceusage.services.consumerQuotaMetrics.limits.consumerOverrides.list`

- Versions: v1beta1
- `GET https://serviceusage.googleapis.com/v1beta1/{+parent}/consumerOverrides`
- Lists all consumer overrides on this limit.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListConsumerOverridesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the parent quota limit, returned by a ListConsumerQuotaMetrics or GetConsumerQuotaMetric call. An example name would be: `projects/123/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` |
| `pageSize` | query | integer (int32) | no | Requested size of the next page of data. |
| `pageToken` | query | string | no | Token identifying which result to start with; returned by a previous list call. |

### `serviceusage.services.consumerQuotaMetrics.limits.consumerOverrides.patch`

- Versions: v1beta1
- `PATCH https://serviceusage.googleapis.com/v1beta1/{+name}`
- Updates a consumer override.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `QuotaOverride`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the override to update. An example name would be: `projects/123/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/consumerOverrides/4a3f2c1d` |
| `force` | query | boolean | no | Whether to force the update of the quota override. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. If force is set to true, it is recommended to include a case id in "X-Goog-Request-Reason" header when sending the request. |
| `forceOnly` | query | repeated string enum | no | The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. If force_only is specified, it is recommended to include a case id in "X-Goog-Request-Reason" header when sending the request. Values: `QUOTA_SAFETY_CHECK_UNSPECIFIED`, `LIMIT_DECREASE_BELOW_USAGE`, `LIMIT_DECREASE_PERCENTAGE_TOO_HIGH`. |
| `updateMask` | query | string (google-fieldmask) | no | Update only the specified fields of the override. If unset, all fields will be updated. |

### `serviceusage.services.consumerQuotaMetrics.limits.get`

- Versions: v1beta1
- `GET https://serviceusage.googleapis.com/v1beta1/{+name}`
- Retrieves a summary of quota information for a specific quota limit.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ConsumerQuotaLimit`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the quota limit. Use the quota limit resource name returned by previous ListConsumerQuotaMetrics and GetConsumerQuotaMetric API calls. |
| `view` | query | string enum | no | Specifies the level of detail for quota information in the response. Values: `QUOTA_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `serviceusage.services.consumerQuotaMetrics.list`

- Versions: v1beta1
- `GET https://serviceusage.googleapis.com/v1beta1/{+parent}/consumerQuotaMetrics`
- Retrieves a summary of all quota information visible to the service consumer, organized by service metric. Each metric includes information about all of its defined limits. Each limit includes the limit configuration (quota unit, preciseness, default value), the current effective limit value, and all of the overrides applied to the limit.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListConsumerQuotaMetricsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Parent of the quotas resource. Some example names would be: `projects/123/services/serviceconsumermanagement.googleapis.com` `folders/345/services/serviceconsumermanagement.googleapis.com` `organizations/456/services/serviceconsumermanagement.googleapis.com` |
| `pageSize` | query | integer (int32) | no | Requested size of the next page of data. |
| `pageToken` | query | string | no | Token identifying which result to start with; returned by a previous list call. |
| `view` | query | string enum | no | Specifies the level of detail for quota information in the response. Values: `QUOTA_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `serviceusage.services.disable`

- Versions: v1, v1beta1
- `POST https://serviceusage.googleapis.com/v1/{+name}:disable`
- Disable a service so that it can no longer be used with a project. This prevents unintended usage that may cause unexpected billing charges or security leaks. It is not valid to call the disable method on a service that is not currently enabled. Callers will receive a `FAILED_PRECONDITION` status if the target service is not currently enabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `DisableServiceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the consumer and service to disable the service on. The enable and disable methods currently only support projects. An example name would be: `projects/123/services/serviceusage.googleapis.com` where `123` is the project number. |

### `serviceusage.services.enable`

- Versions: v1, v1beta1
- `POST https://serviceusage.googleapis.com/v1/{+name}:enable`
- Enable a service so that it can be used with a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: `EnableServiceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the consumer and service to enable the service on. The `EnableService` and `DisableService` methods currently only support projects. Enabling a service requires that the service is public or is shared with the user enabling the service. An example name would be: `projects/123/services/serviceusage.googleapis.com` where `123` is the project number. |

### `serviceusage.services.generateServiceIdentity`

- Versions: v1beta1
- `POST https://serviceusage.googleapis.com/v1beta1/{+parent}:generateServiceIdentity`
- Generates service identity for service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/service.management`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Name of the consumer and service to generate an identity for. The `GenerateServiceIdentity` methods currently support projects, folders, organizations. Example parents would be: `projects/123/services/example.googleapis.com` `folders/123/services/example.googleapis.com` `organizations/123/services/example.googleapis.com` |

### `serviceusage.services.get`

- Versions: v1, v1beta1
- `GET https://serviceusage.googleapis.com/v1/{+name}`
- Returns the service configuration and enabled state for a given service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `GoogleApiServiceusageV1Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the consumer and service to get the `ConsumerState` for. An example name would be: `projects/123/services/serviceusage.googleapis.com` where `123` is the project number. |

### `serviceusage.services.list`

- Versions: v1, v1beta1
- `GET https://serviceusage.googleapis.com/v1/{+parent}/services`
- List all services available to the specified project, and the current state of those services with respect to the project. The list includes all public services, all services for which the calling user has the `servicemanagement.services.bind` permission, and all services that have already been enabled on the project. The list can be filtered to only include services in a specific state, for example to only include services enabled on the project. WARNING: If you need to query enabled services frequently or across an organization, you should use Cloud Asset Inventory API (https://cloud.google.com/asset-inventory/docs/apis), which provides higher throughput and richer filtering capability.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Parent to search for services on. An example name would be: `projects/123` where `123` is the project number. |
| `filter` | query | string | no | Only list services that conform to the given filter. The allowed filter strings are `state:ENABLED` and `state:DISABLED`. |
| `pageSize` | query | integer (int32) | no | Requested size of the next page of data. Requested page size cannot exceed 200. If not set, the default page size is 50. |
| `pageToken` | query | string | no | Token identifying which result to start with, which is returned by a previous list call. |

### Example request skeleton

Generated from the Discovery entry of `serviceusage.operations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://serviceusage.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `serviceusage` (retrieved 2026-11-14). Resources on this page: operations, services.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/serviceusage/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://serviceusage.googleapis.com/$discovery/rest?version=v1, https://serviceusage.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
