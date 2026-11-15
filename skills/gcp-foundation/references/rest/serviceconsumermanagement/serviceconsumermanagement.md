---
source: https://serviceconsumermanagement.googleapis.com/$discovery/rest?version=v1
---

# Service Consumer Management API REST API (serviceconsumermanagement)

## Signature / Usage

Base URL: `https://serviceconsumermanagement.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `serviceconsumermanagement.operations.cancel`

- Versions: v1
- `POST https://serviceconsumermanagement.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `serviceconsumermanagement.operations.delete`

- Versions: v1
- `DELETE https://serviceconsumermanagement.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `serviceconsumermanagement.operations.get`

- Versions: v1, v1beta1
- `GET https://serviceconsumermanagement.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `serviceconsumermanagement.operations.list`

- Versions: v1
- `GET https://serviceconsumermanagement.googleapis.com/v1/{+name}`
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

### `serviceconsumermanagement.services.consumerQuotaMetrics.get`

- Versions: v1beta1
- `GET https://serviceconsumermanagement.googleapis.com/v1beta1/{+name}`
- Retrieves a summary of quota information for a specific quota metric.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `V1Beta1ConsumerQuotaMetric`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the quota metric, returned by a ListConsumerQuotaMetrics call. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus` |
| `view` | query | string enum | no | Specifies the level of detail for quota information in the response. |

### `serviceconsumermanagement.services.consumerQuotaMetrics.importProducerOverrides`

- Versions: v1beta1
- `POST https://serviceconsumermanagement.googleapis.com/v1beta1/{+parent}/consumerQuotaMetrics:importProducerOverrides`
- Create or update multiple producer overrides atomically, all on the same consumer, but on many different metrics or limits. The name field in the quota override message should not be set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `V1Beta1ImportProducerOverridesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the consumer. An example name would be: `services/compute.googleapis.com/projects/123` |

### `serviceconsumermanagement.services.consumerQuotaMetrics.importProducerQuotaPolicies`

- Versions: v1beta1
- `POST https://serviceconsumermanagement.googleapis.com/v1beta1/{+parent}/consumerQuotaMetrics:importProducerQuotaPolicies`
- Create or update multiple producer quota policies atomically, all on the same ancestor, but on many different metrics or limits. The name field in the quota policy message should not be set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `V1Beta1ImportProducerQuotaPoliciesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the consumer. An example name would be: `services/compute.googleapis.com/organizations/123` |

### `serviceconsumermanagement.services.consumerQuotaMetrics.limits.get`

- Versions: v1beta1
- `GET https://serviceconsumermanagement.googleapis.com/v1beta1/{+name}`
- Retrieves a summary of quota information for a specific quota limit.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `V1Beta1ConsumerQuotaLimit`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the quota limit, returned by a ListConsumerQuotaMetrics or GetConsumerQuotaMetric call. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` |
| `view` | query | string enum | no | Specifies the level of detail for quota information in the response. |

### `serviceconsumermanagement.services.consumerQuotaMetrics.limits.producerOverrides.create`

- Versions: v1beta1
- `POST https://serviceconsumermanagement.googleapis.com/v1beta1/{+parent}/producerOverrides`
- Creates a producer override. A producer override is applied by the owner or administrator of a service to increase or decrease the amount of quota a consumer of the service is allowed to use. To create multiple overrides at once, use ImportProducerOverrides instead. If an override with the specified dimensions already exists, this call will fail. To overwrite an existing override if one is already present ("upsert" semantics), use ImportProducerOverrides instead.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `V1Beta1QuotaOverride`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the parent quota limit, returned by a ListConsumerQuotaMetrics or GetConsumerQuotaMetric call. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` |
| `force` | query | boolean | no | Whether to force the creation of the quota override. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. |
| `forceJustification` | query | string | no | If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. |
| `forceOnly` | query | repeated string enum | no | The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. |

### `serviceconsumermanagement.services.consumerQuotaMetrics.limits.producerOverrides.delete`

- Versions: v1beta1
- `DELETE https://serviceconsumermanagement.googleapis.com/v1beta1/{+name}`
- Deletes a producer override.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the override to delete. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/producerOverrides/4a3f2c1d` |
| `force` | query | boolean | no | Whether to force the deletion of the quota override. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. |
| `forceJustification` | query | string | no | If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. |
| `forceOnly` | query | repeated string enum | no | The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. |

### `serviceconsumermanagement.services.consumerQuotaMetrics.limits.producerOverrides.list`

- Versions: v1beta1
- `GET https://serviceconsumermanagement.googleapis.com/v1beta1/{+parent}/producerOverrides`
- Lists all producer overrides on this limit.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `V1Beta1ListProducerOverridesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the parent quota limit, returned by a ListConsumerQuotaMetrics or GetConsumerQuotaMetric call. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` |
| `pageSize` | query | integer (int32) | no | Requested size of the next page of data. |
| `pageToken` | query | string | no | Token identifying which result to start with; returned by a previous list call. |

### `serviceconsumermanagement.services.consumerQuotaMetrics.limits.producerOverrides.patch`

- Versions: v1beta1
- `PATCH https://serviceconsumermanagement.googleapis.com/v1beta1/{+name}`
- Updates a producer override.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `V1Beta1QuotaOverride`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the override to update. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/producerOverrides/4a3f2c1d` |
| `force` | query | boolean | no | Whether to force the update of the quota override. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. |
| `forceJustification` | query | string | no | If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. |
| `forceOnly` | query | repeated string enum | no | The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. |
| `updateMask` | query | string (google-fieldmask) | no | Update only the specified fields. If unset, all modifiable fields will be updated. |

### `serviceconsumermanagement.services.consumerQuotaMetrics.limits.producerQuotaPolicies.create`

- Versions: v1beta1
- `POST https://serviceconsumermanagement.googleapis.com/v1beta1/{+parent}/producerQuotaPolicies`
- Creates a producer quota policy. A producer quota policy is applied by the owner or administrator of a service at an org or folder node to set the default quota limit for all consumers under the node where the policy is created. To create multiple policies at once, use ImportProducerQuotaPolicies instead. If a policy with the specified dimensions already exists, this call will fail. To overwrite an existing policy if one is already present ("upsert" semantics), use ImportProducerQuotaPolicies instead.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `V1Beta1ProducerQuotaPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent quota limit. An example name would be: `services/compute.googleapis.com/organizations/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` |
| `force` | query | boolean | no | Whether to force the creation of the quota policy. If the policy creation would decrease the default limit of any consumer tier by more than 10 percent, the call is rejected, as a safety measure to avoid accidentally decreasing quota too quickly. Setting the force parameter to true ignores this restriction. |
| `forceJustification` | query | string | no | If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. |
| `validateOnly` | query | boolean | no | If set to true, validate the request, but do not actually update. |

### `serviceconsumermanagement.services.consumerQuotaMetrics.limits.producerQuotaPolicies.delete`

- Versions: v1beta1
- `DELETE https://serviceconsumermanagement.googleapis.com/v1beta1/{+name}`
- Deletes a producer quota policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the policy to delete. An example name would be: `services/compute.googleapis.com/organizations/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/producerQuotaPolicies/4a3f2c1d` |
| `force` | query | boolean | no | Whether to force the deletion of the quota policy. If the policy deletion would decrease the default limit of any consumer tier by more than 10 percent, the call is rejected, as a safety measure to avoid accidentally decreasing quota too quickly. Setting the force parameter to true ignores this restriction. |
| `forceJustification` | query | string | no | If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. |
| `validateOnly` | query | boolean | no | If set to true, validate the request, but do not actually update. |

### `serviceconsumermanagement.services.consumerQuotaMetrics.limits.producerQuotaPolicies.list`

- Versions: v1beta1
- `GET https://serviceconsumermanagement.googleapis.com/v1beta1/{+parent}/producerQuotaPolicies`
- Lists all producer policies created at current consumer node for a limit.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `V1Beta1ListProducerQuotaPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent quota limit. An example name would be: `services/compute.googleapis.com/organizations/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` |
| `pageSize` | query | integer (int32) | no | Requested size of the next page of data. |
| `pageToken` | query | string | no | Token identifying which result to start with; returned by a previous list call. |

### `serviceconsumermanagement.services.consumerQuotaMetrics.limits.producerQuotaPolicies.patch`

- Versions: v1beta1
- `PATCH https://serviceconsumermanagement.googleapis.com/v1beta1/{+name}`
- Updates a producer quota policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `V1Beta1ProducerQuotaPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the producer policy. An example name would be: `services/compute.googleapis.com/organizations/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/producerQuotaPolicies/4a3f2c1d` |
| `force` | query | boolean | no | Whether to force the update of the quota policy. If the policy update would decrease the default limit of any consumer tier by more than 10 percent, the call is rejected, as a safety measure to avoid accidentally decreasing quota too quickly. Setting the force parameter to true ignores this restriction. |
| `forceJustification` | query | string | no | If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. |
| `updateMask` | query | string (google-fieldmask) | no | Update only the specified fields. If unset, all modifiable fields will be updated. |
| `validateOnly` | query | boolean | no | If set to true, validate the request, but do not actually update. |

### `serviceconsumermanagement.services.consumerQuotaMetrics.list`

- Versions: v1beta1
- `GET https://serviceconsumermanagement.googleapis.com/v1beta1/{+parent}/consumerQuotaMetrics`
- Retrieves a summary of all quota information about this consumer that is visible to the service producer, for each quota metric defined by the service. Each metric includes information about all of its defined limits. Each limit includes the limit configuration (quota unit, preciseness, default value), the current effective limit value, and all of the overrides applied to the limit.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `V1Beta1ListConsumerQuotaMetricsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Parent of the quotas resource. An example parent would be: `services/serviceconsumermanagement.googleapis.com/projects/123` |
| `pageSize` | query | integer (int32) | no | Requested size of the next page of data. |
| `pageToken` | query | string | no | Token identifying which result to start with; returned by a previous list call. |
| `view` | query | string enum | no | Specifies the level of detail for quota information in the response. |

### `serviceconsumermanagement.services.search`

- Versions: v1
- `GET https://serviceconsumermanagement.googleapis.com/v1/{+parent}:search`
- Search tenancy units for a managed service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchTenancyUnitsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Service for which search is performed. services/{service} {service} the name of a service, for example 'service.googleapis.com'. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results returned by this request. Currently, the default maximum is set to 256. If `page_size` <= 256, the request proceeds. Else, the request fails with an `TU_INVALID_PAGE_SIZE` error. |
| `pageToken` | query | string | no | Optional. The continuation token, which is used to page through large result sets. To get the next page of results, set this parameter to the value of `nextPageToken` from the previous response. |
| `query` | query | string | no | Optional. Set a query `{expression}` for querying tenancy units. Your `{expression}` must be in the format: `field_name=literal_string`. The `field_name` is the name of the field you want to compare. Supported fields are `tenant_resources.tag` and `tenant_resources.resource`. For example, to search tenancy units that contain at least one tenant resource with a given tag 'xyz', use the query `tenant_resources.tag=xyz`. To search tenancy units that contain at least one tenant resource with a given resource name 'projects/123456', use the query `tenant_resources.resource=projects/123456`. Multiple expressions can be joined with `AND`s. Tenancy units must match all expressions to be included in the result set. For example, `tenant_resources.tag=xyz AND tenant_resources.resource=projects/123456` |

### `serviceconsumermanagement.services.tenancyUnits.addProject`

- Versions: v1
- `POST https://serviceconsumermanagement.googleapis.com/v1/{+parent}:addProject`
- Add a new tenant project to the tenancy unit. There can be a maximum of 1024 tenant projects in a tenancy unit. If there are previously failed `AddTenantProject` calls, you might need to call `RemoveTenantProject` first to resolve them before you can make another call to `AddTenantProject` with the same tag. Operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddTenantProjectRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the tenancy unit. Such as 'services/service.googleapis.com/projects/12345/tenancyUnits/abcd'. |

### `serviceconsumermanagement.services.tenancyUnits.applyProjectConfig`

- Versions: v1
- `POST https://serviceconsumermanagement.googleapis.com/v1/{+name}:applyProjectConfig`
- Apply a configuration to an existing tenant project. This project must exist in an active state and have the original owner account. The caller must have permission to add a project to the given tenancy unit. The configuration is applied, but any existing settings on the project aren't modified. Specified policy bindings are applied. Existing bindings aren't modified. Specified services are activated. No service is deactivated. If specified, new billing configuration is applied. Omit a billing configuration to keep the existing one. A service account in the project is created if previously non existed. Specified labels will be appended to tenant project, note that the value of existing label key will be updated if the same label key is requested. The specified folder is ignored, as moving a tenant project to a different folder isn't supported. The operation fails if any of the steps fail, but no rollback of already applied configuration changes is attempted. Operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApplyTenantProjectConfigRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the tenancy unit. Such as 'services/service.googleapis.com/projects/12345/tenancyUnits/abcd'. |

### `serviceconsumermanagement.services.tenancyUnits.attachProject`

- Versions: v1
- `POST https://serviceconsumermanagement.googleapis.com/v1/{+name}:attachProject`
- Attach an existing project to the tenancy unit as a new tenant resource. The project could either be the tenant project reserved by calling `AddTenantProject` under a tenancy unit of a service producer's project of a managed service, or from a separate project. The caller is checked against a set of permissions as if calling `AddTenantProject` on the same service consumer. To trigger the attachment, the targeted tenant project must be in a folder. Make sure the ServiceConsumerManagement service account is the owner of that project. These two requirements are already met if the project is reserved by calling `AddTenantProject`. Operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AttachTenantProjectRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the tenancy unit that the project will be attached to. Such as 'services/service.googleapis.com/projects/12345/tenancyUnits/abcd'. |

### `serviceconsumermanagement.services.tenancyUnits.create`

- Versions: v1
- `POST https://serviceconsumermanagement.googleapis.com/v1/{+parent}/tenancyUnits`
- Creates a tenancy unit with no tenant resources. If tenancy unit already exists, it will be returned, however, in this case, returned TenancyUnit does not have tenant_resources field set and ListTenancyUnits has to be used to get a complete TenancyUnit with all fields populated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateTenancyUnitRequest`; Response: `TenancyUnit`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. services/{service}/{collection id}/{resource id} {collection id} is the cloud resource collection type representing the service consumer, for example 'projects', or 'organizations'. {resource id} is the consumer numeric id, such as project number: '123456'. {service} the name of a managed service, such as 'service.googleapis.com'. Enables service binding using the new tenancy unit. |

### `serviceconsumermanagement.services.tenancyUnits.delete`

- Versions: v1
- `DELETE https://serviceconsumermanagement.googleapis.com/v1/{+name}`
- Delete a tenancy unit. Before you delete the tenancy unit, there should be no tenant resources in it that aren't in a DELETED state. Operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the tenancy unit to be deleted. |

### `serviceconsumermanagement.services.tenancyUnits.deleteProject`

- Versions: v1
- `POST https://serviceconsumermanagement.googleapis.com/v1/{+name}:deleteProject`
- Deletes the specified project resource identified by a tenant resource tag. The mothod removes a project lien with a 'TenantManager' origin if that was added. It will then attempt to delete the project. If that operation fails, this method also fails. After the project has been deleted, the tenant resource state is set to DELETED. To permanently remove resource metadata, call the `RemoveTenantProject` method. New resources with the same tag can't be added if there are existing resources in a DELETED state. Operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeleteTenantProjectRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the tenancy unit. Such as 'services/service.googleapis.com/projects/12345/tenancyUnits/abcd'. |

### `serviceconsumermanagement.services.tenancyUnits.list`

- Versions: v1
- `GET https://serviceconsumermanagement.googleapis.com/v1/{+parent}/tenancyUnits`
- Find the tenancy unit for a managed service and service consumer. This method shouldn't be used in a service producer's runtime path, for example to find the tenant project number when creating VMs. Service producers must persist the tenant project's information after the project is created.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTenancyUnitsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Managed service and service consumer. Required. services/{service}/{collection id}/{resource id} {collection id} is the cloud resource collection type representing the service consumer, for example 'projects', or 'organizations'. {resource id} is the consumer numeric id, such as project number: '123456'. {service} the name of a service, such as 'service.googleapis.com'. |
| `filter` | query | string | no | Optional. Filter expression over tenancy resources field. Optional. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results returned by this request. |
| `pageToken` | query | string | no | Optional. The continuation token, which is used to page through large result sets. To get the next page of results, set this parameter to the value of `nextPageToken` from the previous response. |

### `serviceconsumermanagement.services.tenancyUnits.removeProject`

- Versions: v1
- `POST https://serviceconsumermanagement.googleapis.com/v1/{+name}:removeProject`
- Removes the specified project resource identified by a tenant resource tag. The method removes the project lien with 'TenantManager' origin if that was added. It then attempts to delete the project. If that operation fails, this method also fails. Calls to remove already removed or non-existent tenant project succeed. After the project has been deleted, or if was already in a DELETED state, resource metadata is permanently removed from the tenancy unit. Operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RemoveTenantProjectRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the tenancy unit. Such as 'services/service.googleapis.com/projects/12345/tenancyUnits/abcd'. |

### `serviceconsumermanagement.services.tenancyUnits.undeleteProject`

- Versions: v1
- `POST https://serviceconsumermanagement.googleapis.com/v1/{+name}:undeleteProject`
- Attempts to undelete a previously deleted tenant project. The project must be in a DELETED state. There are no guarantees that an undeleted project will be in a fully restored and functional state. Call the `ApplyTenantProjectConfig` method to update its configuration and then validate all managed service resources. Operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UndeleteTenantProjectRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the tenancy unit. Such as 'services/service.googleapis.com/projects/12345/tenancyUnits/abcd'. |

### Example request skeleton

Generated from the Discovery entry of `serviceconsumermanagement.operations.get` (not in the official docs); replace the `{...}` path variables:

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://serviceconsumermanagement.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `serviceconsumermanagement` (retrieved 2026-11-14). Resources on this page: operations, services.
- Message schemas are listed under `references/rest-schemas/serviceconsumermanagement/`.
- Source: https://serviceconsumermanagement.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
