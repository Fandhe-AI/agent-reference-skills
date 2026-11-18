---
source: https://beyondcorp.googleapis.com/$discovery/rest?version=v1
---

# BeyondCorp API REST API (beyondcorp)

## Signature / Usage

Base URL: `https://beyondcorp.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `beyondcorp.organizations.locations.insights.configuredInsight`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+insight}:configuredInsight`
- Gets the value for a selected particular insight based on the provided filters. Use the organization level path for fetching at org level and project level path for fetching the insight value specific to a particular project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpSaasplatformInsightsV1alphaConfiguredInsightResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `insight` | path | string | yes | Required. The resource name of the insight using the form: `organizations/{organization_id}/locations/{location_id}/insights/{insight_id}` `projects/{project_id}/locations/{location_id}/insights/{insight_id}`. |
| `aggregation` | query | string enum | yes | Required. Aggregation type. Available aggregation could be fetched by calling insight list and get APIs in `BASIC` view. Values: `AGGREGATION_UNSPECIFIED`, `HOURLY`, `DAILY`, `WEEKLY`, `MONTHLY`, `CUSTOM_DATE_RANGE`. |
| `customGrouping.fieldFilter` | query | string | no | Optional. Filterable parameters to be added to the grouping clause. Available fields could be fetched by calling insight list and get APIs in `BASIC` view. `=` is the only comparison operator supported. `AND` is the only logical operator supported. Usage: field_filter="fieldName1=fieldVal1 AND fieldName2=fieldVal2". NOTE: Only `AND` conditions are allowed. NOTE: Use the `filter_alias` from `Insight.Metadata.Field` message for the filtering the corresponding fields in this filter field. (These expressions are based on the filter language described at https://google.aip.dev/160). |
| `customGrouping.groupFields` | query | repeated string | conditional | Required. Fields to be used for grouping. NOTE: Use the `filter_alias` from `Insight.Metadata.Field` message for declaring the fields to be grouped-by here. |
| `endTime` | query | string (google-datetime) | yes | Required. Ending time for the duration for which insight is to be pulled. |
| `fieldFilter` | query | string | no | Optional. Other filterable/configurable parameters as applicable to the selected insight. Available fields could be fetched by calling insight list and get APIs in `BASIC` view. `=` is the only comparison operator supported. `AND` is the only logical operator supported. Usage: field_filter="fieldName1=fieldVal1 AND fieldName2=fieldVal2". NOTE: Only `AND` conditions are allowed. NOTE: Use the `filter_alias` from `Insight.Metadata.Field` message for the filtering the corresponding fields in this filter field. (These expressions are based on the filter language described at https://google.aip.dev/160). |
| `group` | query | string | no | Optional. Group id of the available groupings for the insight. Available groupings could be fetched by calling insight list and get APIs in `BASIC` view. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Used to fetch the page represented by the token. Fetches the first page when not set. |
| `startTime` | query | string (google-datetime) | yes | Required. Starting time for the duration for which insight is to be pulled. |

### `beyondcorp.organizations.locations.insights.get`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+name}`
- Gets the value for a selected particular insight with default configuration. The default aggregation level is 'DAILY' and no grouping will be applied or default grouping if applicable. The data will be returned for recent 7 days starting the day before. The insight data size will be limited to 50 rows. Use the organization level path for fetching at org level and project level path for fetching the insight value specific to a particular project. Setting the `view` to `BASIC` will only return the metadata for the insight.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpSaasplatformInsightsV1alphaInsight`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the insight using the form: `organizations/{organization_id}/locations/{location_id}/insights/{insight_id}` `projects/{project_id}/locations/{location_id}/insights/{insight_id}` |
| `view` | query | string enum | yes | Required. Metadata only or full data view. Values: `INSIGHT_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `beyondcorp.organizations.locations.insights.list`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+parent}/insights`
- Lists for all the available insights that could be fetched from the system. Allows to filter using category. Setting the `view` to `BASIC` will let you iterate over the list of insight metadatas.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpSaasplatformInsightsV1alphaListInsightsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of InsightMetadata using the form: `organizations/{organization_id}/locations/{location}` `projects/{project_id}/locations/{location_id}` |
| `aggregation` | query | string enum | no | Optional. Aggregation type. The default is 'DAILY'. Values: `AGGREGATION_UNSPECIFIED`, `HOURLY`, `DAILY`, `WEEKLY`, `MONTHLY`, `CUSTOM_DATE_RANGE`. |
| `endTime` | query | string (google-datetime) | no | Optional. Ending time for the duration for which insights are to be pulled. The default is the current time. |
| `filter` | query | string | no | Optional. Filter expression to restrict the insights returned. Supported filter fields: \* `type` \* `category` \* `subCategory` Examples: \* "category = application AND type = count" \* "category = application AND subCategory = iap" \* "type = status" Allowed values: \* type: \[count, latency, status, list\] \* category: \[application, device, request, security\] \* subCategory: \[iap, caa, webprotect\] NOTE: Only equality based comparison is allowed. Only `AND` conjunction is allowed. NOTE: The 'AND' in the filter field needs to be in capital letters only. NOTE: Just filtering on `subCategory` is not allowed. It should be passed in with the parent `category` too. (These expressions are based on the filter language described at https://google.aip.dev/160). |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. This is currently ignored. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. NOTE: Default page size is 50. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |
| `startTime` | query | string (google-datetime) | no | Optional. Starting time for the duration for which insights are to be pulled. The default is 7 days before the current time. |
| `view` | query | string enum | yes | Required. List only metadata or full data. Values: `INSIGHT_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `beyondcorp.organizations.locations.operations.cancel`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleLongrunningCancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `beyondcorp.organizations.locations.operations.delete`

- Versions: v1, v1alpha
- `DELETE https://beyondcorp.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `beyondcorp.organizations.locations.operations.get`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `beyondcorp.organizations.locations.operations.list`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `beyondcorp.organizations.locations.subscriptions.cancel`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+name}:cancel`
- Cancels an existing BeyondCorp Enterprise Subscription in a given organization. Location will always be global as BeyondCorp subscriptions are per organization. Returns the timestamp for when the cancellation will become effective
- Request: —; Response: `GoogleCloudBeyondcorpSaasplatformSubscriptionsV1alphaCancelSubscriptionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `beyondcorp.organizations.locations.subscriptions.create`

- Versions: v1alpha
- `POST https://beyondcorp.googleapis.com/v1alpha/{+parent}/subscriptions`
- Creates a new BeyondCorp Enterprise Subscription in a given organization. Location will always be global as BeyondCorp subscriptions are per organization.
- Request: `GoogleCloudBeyondcorpSaasplatformSubscriptionsV1alphaSubscription`; Response: `GoogleCloudBeyondcorpSaasplatformSubscriptionsV1alphaSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the subscription location using the form: `organizations/{organization_id}/locations/{location}` |

### `beyondcorp.organizations.locations.subscriptions.get`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+name}`
- Gets details of a single Subscription.
- Request: —; Response: `GoogleCloudBeyondcorpSaasplatformSubscriptionsV1alphaSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of Subscription using the form: `organizations/{organization_id}/locations/{location}/subscriptions/{subscription_id}` |

### `beyondcorp.organizations.locations.subscriptions.list`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+parent}/subscriptions`
- Lists Subscriptions in a given organization and location.
- Request: —; Response: `GoogleCloudBeyondcorpSaasplatformSubscriptionsV1alphaListSubscriptionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of Subscription using the form: `organizations/{organization_id}/locations/{location}` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous ListSubscriptionsRequest, if any. |

### `beyondcorp.organizations.locations.subscriptions.patch`

- Versions: v1alpha
- `PATCH https://beyondcorp.googleapis.com/v1alpha/{+name}`
- Updates an existing BeyondCorp Enterprise Subscription in a given organization. Location will always be global as BeyondCorp subscriptions are per organization.
- Request: `GoogleCloudBeyondcorpSaasplatformSubscriptionsV1alphaSubscription`; Response: `GoogleCloudBeyondcorpSaasplatformSubscriptionsV1alphaSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Unique resource name of the Subscription. The name is ignored when creating a subscription. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the Subscription resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. Mutable fields: seat_count. |

### `beyondcorp.organizations.locations.subscriptions.restart`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+name}:restart`
- Restarts an existing BeyondCorp Enterprise Subscription in a given organization, that is scheduled for cancellation. Location will always be global as BeyondCorp subscriptions are per organization. Returns the timestamp for when the cancellation will become effective
- Request: —; Response: `GoogleCloudBeyondcorpSaasplatformSubscriptionsV1alphaRestartSubscriptionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `beyondcorp.projects.locations.appConnections.delete`

- Versions: v1, v1alpha
- `DELETE https://beyondcorp.googleapis.com/v1/{+name}`
- Deletes a single AppConnection.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. BeyondCorp Connector name using the form: `projects/{project_id}/locations/{location_id}/appConnections/{app_connection_id}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. |

### `beyondcorp.projects.locations.appConnections.get`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+name}`
- Gets details of a single AppConnection.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpAppconnectionsV1AppConnection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. BeyondCorp AppConnection name using the form: `projects/{project_id}/locations/{location_id}/appConnections/{app_connection_id}` |

### `beyondcorp.projects.locations.appConnections.getIamPolicy`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `beyondcorp.projects.locations.appConnections.list`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+parent}/appConnections`
- Lists AppConnections in a given project and location.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpAppconnectionsV1ListAppConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the AppConnection location using the form: `projects/{project_id}/locations/{location_id}` |
| `filter` | query | string | no | Optional. A filter specifying constraints of a list operation. |
| `orderBy` | query | string | no | Optional. Specifies the ordering of results. See Sorting order (https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous ListAppConnectionsRequest, if any. |

### `beyondcorp.projects.locations.appConnections.resolve`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+parent}/appConnections:resolve`
- Resolves AppConnections details for a given AppConnector. An internal method called by a connector to find AppConnections to connect to.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the AppConnection location using the form: `projects/{project_id}/locations/{location_id}` |
| `appConnectorId` | query | string | yes | Required. BeyondCorp Connector name of the connector associated with those AppConnections using the form: `projects/{project_id}/locations/{location_id}/appConnectors/{app_connector_id}` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous ResolveAppConnectionsResponse, if any. |

### `beyondcorp.projects.locations.appConnections.setIamPolicy`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.appConnections.testIamPermissions`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.appConnectors.delete`

- Versions: v1, v1alpha
- `DELETE https://beyondcorp.googleapis.com/v1/{+name}`
- Deletes a single AppConnector.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. BeyondCorp AppConnector name using the form: `projects/{project_id}/locations/{location_id}/appConnectors/{app_connector_id}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. |

### `beyondcorp.projects.locations.appConnectors.get`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+name}`
- Gets details of a single AppConnector.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpAppconnectorsV1AppConnector`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. BeyondCorp AppConnector name using the form: `projects/{project_id}/locations/{location_id}/appConnectors/{app_connector_id}` |

### `beyondcorp.projects.locations.appConnectors.getIamPolicy`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `beyondcorp.projects.locations.appConnectors.list`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+parent}/appConnectors`
- Lists AppConnectors in a given project and location.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the AppConnector location using the form: `projects/{project_id}/locations/{location_id}` |
| `filter` | query | string | no | Optional. A filter specifying constraints of a list operation. |
| `orderBy` | query | string | no | Optional. Specifies the ordering of results. See Sorting order (https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous ListAppConnectorsRequest, if any. |

### `beyondcorp.projects.locations.appConnectors.resolveInstanceConfig`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+appConnector}:resolveInstanceConfig`
- Gets instance configuration for a given AppConnector. An internal method called by a AppConnector to get its container config.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appConnector` | path | string | yes | Required. BeyondCorp AppConnector name using the form: `projects/{project_id}/locations/{location_id}/appConnectors/{app_connector}` |

### `beyondcorp.projects.locations.appConnectors.setIamPolicy`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.appConnectors.testIamPermissions`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.appGateways.delete`

- Versions: v1, v1alpha
- `DELETE https://beyondcorp.googleapis.com/v1/{+name}`
- Deletes a single AppGateway.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. BeyondCorp AppGateway name using the form: `projects/{project_id}/locations/{location_id}/appGateways/{app_gateway_id}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. |

### `beyondcorp.projects.locations.appGateways.get`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+name}`
- Gets details of a single AppGateway.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AppGateway`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. BeyondCorp AppGateway name using the form: `projects/{project_id}/locations/{location_id}/appGateways/{app_gateway_id}` |

### `beyondcorp.projects.locations.appGateways.getIamPolicy`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `beyondcorp.projects.locations.appGateways.list`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+parent}/appGateways`
- Lists AppGateways in a given project and location.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAppGatewaysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the AppGateway location using the form: `projects/{project_id}/locations/{location_id}` |
| `filter` | query | string | no | Optional. A filter specifying constraints of a list operation. |
| `orderBy` | query | string | no | Optional. Specifies the ordering of results. See Sorting order (https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous ListAppGatewaysRequest, if any. |

### `beyondcorp.projects.locations.appGateways.setIamPolicy`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.appGateways.testIamPermissions`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.applicationDomains.getIamPolicy`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `beyondcorp.projects.locations.applicationDomains.setIamPolicy`

- Versions: v1alpha
- `POST https://beyondcorp.googleapis.com/v1alpha/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.applicationDomains.testIamPermissions`

- Versions: v1alpha
- `POST https://beyondcorp.googleapis.com/v1alpha/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.applications.getIamPolicy`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `beyondcorp.projects.locations.applications.setIamPolicy`

- Versions: v1alpha
- `POST https://beyondcorp.googleapis.com/v1alpha/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.applications.testIamPermissions`

- Versions: v1alpha
- `POST https://beyondcorp.googleapis.com/v1alpha/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.connections.delete`

- Versions: v1alpha
- `DELETE https://beyondcorp.googleapis.com/v1alpha/{+name}`
- Deletes a single Connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. BeyondCorp Connector name using the form: `projects/{project_id}/locations/{location_id}/connections/{connection_id}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. |

### `beyondcorp.projects.locations.connections.get`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+name}`
- Gets details of a single Connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Connection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. BeyondCorp Connection name using the form: `projects/{project_id}/locations/{location_id}/connections/{connection_id}` |

### `beyondcorp.projects.locations.connections.getIamPolicy`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `beyondcorp.projects.locations.connections.list`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+parent}/connections`
- Lists Connections in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the connection location using the form: `projects/{project_id}/locations/{location_id}` |
| `filter` | query | string | no | Optional. A filter specifying constraints of a list operation. |
| `orderBy` | query | string | no | Optional. Specifies the ordering of results. See Sorting order (https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous ListConnectionsRequest, if any. |

### `beyondcorp.projects.locations.connections.resolve`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+parent}/connections:resolve`
- Resolves connections details for a given connector. An internal method called by a connector to find connections to connect to.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ResolveConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the connection location using the form: `projects/{project_id}/locations/{location_id}` |
| `connectorId` | query | string | yes | Required. BeyondCorp Connector name of the connector associated with those connections using the form: `projects/{project_id}/locations/{location_id}/connectors/{connector_id}` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous ResolveConnectionsResponse, if any. |

### `beyondcorp.projects.locations.connections.setIamPolicy`

- Versions: v1alpha
- `POST https://beyondcorp.googleapis.com/v1alpha/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.connectors.delete`

- Versions: v1alpha
- `DELETE https://beyondcorp.googleapis.com/v1alpha/{+name}`
- Deletes a single Connector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. BeyondCorp Connector name using the form: `projects/{project_id}/locations/{location_id}/connectors/{connector_id}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. |

### `beyondcorp.projects.locations.connectors.get`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+name}`
- Gets details of a single Connector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Connector`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. BeyondCorp Connector name using the form: `projects/{project_id}/locations/{location_id}/connectors/{connector_id}` |

### `beyondcorp.projects.locations.connectors.getIamPolicy`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `beyondcorp.projects.locations.connectors.list`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+parent}/connectors`
- Lists Connectors in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the connector location using the form: `projects/{project_id}/locations/{location_id}` |
| `filter` | query | string | no | Optional. A filter specifying constraints of a list operation. |
| `orderBy` | query | string | no | Optional. Specifies the ordering of results. See Sorting order (https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous ListConnectorsRequest, if any. |

### `beyondcorp.projects.locations.connectors.resolveInstanceConfig`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+connector}:resolveInstanceConfig`
- Gets instance configuration for a given connector. An internal method called by a connector to get its container config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ResolveInstanceConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `connector` | path | string | yes | Required. BeyondCorp Connector name using the form: `projects/{project_id}/locations/{location_id}/connectors/{connector}` |

### `beyondcorp.projects.locations.connectors.setIamPolicy`

- Versions: v1alpha
- `POST https://beyondcorp.googleapis.com/v1alpha/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.get`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudLocationLocation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `beyondcorp.projects.locations.insights.configuredInsight`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+insight}:configuredInsight`
- Gets the value for a selected particular insight based on the provided filters. Use the organization level path for fetching at org level and project level path for fetching the insight value specific to a particular project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpSaasplatformInsightsV1alphaConfiguredInsightResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `insight` | path | string | yes | Required. The resource name of the insight using the form: `organizations/{organization_id}/locations/{location_id}/insights/{insight_id}` `projects/{project_id}/locations/{location_id}/insights/{insight_id}`. |
| `aggregation` | query | string enum | yes | Required. Aggregation type. Available aggregation could be fetched by calling insight list and get APIs in `BASIC` view. Values: `AGGREGATION_UNSPECIFIED`, `HOURLY`, `DAILY`, `WEEKLY`, `MONTHLY`, `CUSTOM_DATE_RANGE`. |
| `customGrouping.fieldFilter` | query | string | no | Optional. Filterable parameters to be added to the grouping clause. Available fields could be fetched by calling insight list and get APIs in `BASIC` view. `=` is the only comparison operator supported. `AND` is the only logical operator supported. Usage: field_filter="fieldName1=fieldVal1 AND fieldName2=fieldVal2". NOTE: Only `AND` conditions are allowed. NOTE: Use the `filter_alias` from `Insight.Metadata.Field` message for the filtering the corresponding fields in this filter field. (These expressions are based on the filter language described at https://google.aip.dev/160). |
| `customGrouping.groupFields` | query | repeated string | conditional | Required. Fields to be used for grouping. NOTE: Use the `filter_alias` from `Insight.Metadata.Field` message for declaring the fields to be grouped-by here. |
| `endTime` | query | string (google-datetime) | yes | Required. Ending time for the duration for which insight is to be pulled. |
| `fieldFilter` | query | string | no | Optional. Other filterable/configurable parameters as applicable to the selected insight. Available fields could be fetched by calling insight list and get APIs in `BASIC` view. `=` is the only comparison operator supported. `AND` is the only logical operator supported. Usage: field_filter="fieldName1=fieldVal1 AND fieldName2=fieldVal2". NOTE: Only `AND` conditions are allowed. NOTE: Use the `filter_alias` from `Insight.Metadata.Field` message for the filtering the corresponding fields in this filter field. (These expressions are based on the filter language described at https://google.aip.dev/160). |
| `group` | query | string | no | Optional. Group id of the available groupings for the insight. Available groupings could be fetched by calling insight list and get APIs in `BASIC` view. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Used to fetch the page represented by the token. Fetches the first page when not set. |
| `startTime` | query | string (google-datetime) | yes | Required. Starting time for the duration for which insight is to be pulled. |

### `beyondcorp.projects.locations.insights.get`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+name}`
- Gets the value for a selected particular insight with default configuration. The default aggregation level is 'DAILY' and no grouping will be applied or default grouping if applicable. The data will be returned for recent 7 days starting the day before. The insight data size will be limited to 50 rows. Use the organization level path for fetching at org level and project level path for fetching the insight value specific to a particular project. Setting the `view` to `BASIC` will only return the metadata for the insight.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpSaasplatformInsightsV1alphaInsight`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the insight using the form: `organizations/{organization_id}/locations/{location_id}/insights/{insight_id}` `projects/{project_id}/locations/{location_id}/insights/{insight_id}` |
| `view` | query | string enum | yes | Required. Metadata only or full data view. Values: `INSIGHT_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `beyondcorp.projects.locations.insights.list`

- Versions: v1alpha
- `GET https://beyondcorp.googleapis.com/v1alpha/{+parent}/insights`
- Lists for all the available insights that could be fetched from the system. Allows to filter using category. Setting the `view` to `BASIC` will let you iterate over the list of insight metadatas.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpSaasplatformInsightsV1alphaListInsightsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of InsightMetadata using the form: `organizations/{organization_id}/locations/{location}` `projects/{project_id}/locations/{location_id}` |
| `aggregation` | query | string enum | no | Optional. Aggregation type. The default is 'DAILY'. Values: `AGGREGATION_UNSPECIFIED`, `HOURLY`, `DAILY`, `WEEKLY`, `MONTHLY`, `CUSTOM_DATE_RANGE`. |
| `endTime` | query | string (google-datetime) | no | Optional. Ending time for the duration for which insights are to be pulled. The default is the current time. |
| `filter` | query | string | no | Optional. Filter expression to restrict the insights returned. Supported filter fields: \* `type` \* `category` \* `subCategory` Examples: \* "category = application AND type = count" \* "category = application AND subCategory = iap" \* "type = status" Allowed values: \* type: \[count, latency, status, list\] \* category: \[application, device, request, security\] \* subCategory: \[iap, caa, webprotect\] NOTE: Only equality based comparison is allowed. Only `AND` conjunction is allowed. NOTE: The 'AND' in the filter field needs to be in capital letters only. NOTE: Just filtering on `subCategory` is not allowed. It should be passed in with the parent `category` too. (These expressions are based on the filter language described at https://google.aip.dev/160). |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. This is currently ignored. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. NOTE: Default page size is 50. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |
| `startTime` | query | string (google-datetime) | no | Optional. Starting time for the duration for which insights are to be pulled. The default is 7 days before the current time. |
| `view` | query | string enum | yes | Required. List only metadata or full data. Values: `INSIGHT_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `beyondcorp.projects.locations.list`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudLocationListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `beyondcorp.projects.locations.operations.cancel`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleLongrunningCancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `beyondcorp.projects.locations.operations.delete`

- Versions: v1, v1alpha
- `DELETE https://beyondcorp.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `beyondcorp.projects.locations.operations.get`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `beyondcorp.projects.locations.operations.list`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `beyondcorp.projects.locations.securityGateways.applications.create`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+parent}/applications`
- Creates a new Application in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudBeyondcorpSecuritygatewaysV1Application`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent SecurityGateway using the form: `projects/{project_id}/locations/global/securityGateways/{security_gateway_id}` |
| `applicationId` | query | string | no | Optional. User-settable Application resource ID. \* Must start with a letter. \* Must contain between 4-63 characters from `/a-z-/`. \* Must end with a number or letter. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. |

### `beyondcorp.projects.locations.securityGateways.applications.delete`

- Versions: v1, v1alpha
- `DELETE https://beyondcorp.googleapis.com/v1/{+name}`
- Deletes a single application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. |

### `beyondcorp.projects.locations.securityGateways.applications.get`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+name}`
- Gets details of a single Application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpSecuritygatewaysV1Application`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Application using the form: `projects/{project_id}/locations/global/securityGateway/{security_gateway_id}/applications/{application_id}` |

### `beyondcorp.projects.locations.securityGateways.applications.getIamPolicy`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `beyondcorp.projects.locations.securityGateways.applications.list`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+parent}/applications`
- Lists Applications in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpSecuritygatewaysV1ListApplicationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent location to which the resources belong. `projects/{project_id}/locations/global/securityGateways/{security_gateway_id}` |
| `filter` | query | string | no | Optional. A filter specifying constraints of a list operation. All fields in the Application message are supported. For example, the following query will return the Application with displayName "test-application" For more information, please refer to https://google.aip.dev/160. |
| `orderBy` | query | string | no | Optional. Specifies the ordering of results. See Sorting order (https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous ListApplicationsRequest, if any. |

### `beyondcorp.projects.locations.securityGateways.applications.patch`

- Versions: v1, v1alpha
- `PATCH https://beyondcorp.googleapis.com/v1/{+name}`
- Updates the parameters of a single Application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudBeyondcorpSecuritygatewaysV1Application`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request timed out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Mutable fields include: display_name. |

### `beyondcorp.projects.locations.securityGateways.applications.setIamPolicy`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.securityGateways.applications.testIamPermissions`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.securityGateways.create`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+parent}/securityGateways`
- Creates a new Security Gateway in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource project name of the SecurityGateway location using the form: `projects/{project_id}/locations/{location_id}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. |
| `securityGatewayId` | query | string | no | Optional. User-settable SecurityGateway resource ID. \* Must start with a letter. \* Must contain between 4-63 characters from `/a-z-/`. \* Must end with a number or letter. |

### `beyondcorp.projects.locations.securityGateways.delete`

- Versions: v1, v1alpha
- `DELETE https://beyondcorp.googleapis.com/v1/{+name}`
- Deletes a single SecurityGateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. BeyondCorp SecurityGateway name using the form: `projects/{project_id}/locations/{location_id}/securityGateways/{security_gateway_id}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validates request by executing a dry-run which would not alter the resource in any way. |

### `beyondcorp.projects.locations.securityGateways.get`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+name}`
- Gets details of a single SecurityGateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the PartnerTenant using the form: `projects/{project_id}/locations/{location_id}/securityGateway/{security_gateway_id}` |

### `beyondcorp.projects.locations.securityGateways.getIamPolicy`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `beyondcorp.projects.locations.securityGateways.list`

- Versions: v1, v1alpha
- `GET https://beyondcorp.googleapis.com/v1/{+parent}/securityGateways`
- Lists SecurityGateways in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBeyondcorpSecuritygatewaysV1ListSecurityGatewaysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent location to which the resources belong. `projects/{project_id}/locations/{location_id}/` |
| `filter` | query | string | no | Optional. A filter specifying constraints of a list operation. All fields in the SecurityGateway message are supported. For example, the following query will return the SecurityGateway with displayName "test-security-gateway" For more information, please refer to https://google.aip.dev/160. |
| `orderBy` | query | string | no | Optional. Specifies the ordering of results. See Sorting order (https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 50 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous ListSecurityGatewayRequest, if any. |

### `beyondcorp.projects.locations.securityGateways.patch`

- Versions: v1, v1alpha
- `PATCH https://beyondcorp.googleapis.com/v1/{+name}`
- Updates the parameters of a single SecurityGateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request timed out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Mutable fields include: display_name, hubs. |

### `beyondcorp.projects.locations.securityGateways.setIamPolicy`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `beyondcorp.projects.locations.securityGateways.testIamPermissions`

- Versions: v1, v1alpha
- `POST https://beyondcorp.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `beyondcorp.organizations.locations.insights.configuredInsight` (not in the official docs); replace the `{...}` path variables and required query parameters (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://beyondcorp.googleapis.com/v1alpha/{+insight}:configuredInsight?aggregation={aggregation}&endTime={endTime}&startTime={startTime}"
```

## Notes

- Generated from the Discovery document(s) v1, v1alpha of `beyondcorp` (retrieved 2026-11-14). Resources on this page: organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/beyondcorp/`; they are the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `beyondcorp.projects.locations.appConnections.delete`, `beyondcorp.projects.locations.appConnections.get`, `beyondcorp.projects.locations.appConnections.list`, `beyondcorp.projects.locations.appConnections.resolve`, `beyondcorp.projects.locations.appConnectors.delete`, `beyondcorp.projects.locations.appConnectors.get`, `beyondcorp.projects.locations.appConnectors.list`, `beyondcorp.projects.locations.appConnectors.resolveInstanceConfig`, `beyondcorp.projects.locations.appGateways.delete`, `beyondcorp.projects.locations.appGateways.get`, `beyondcorp.projects.locations.appGateways.list`. Avoid them in new code.
- Corrected from the official docs (the Discovery text above is verbatim): the `name` path parameters of `securityGateways.get` and `securityGateways.applications.get` are described with `.../securityGateway/{security_gateway_id}` (singular), and the `securityGateways.get` description calls the resource a "PartnerTenant"; the Discovery path patterns are `projects/[^/]+/locations/[^/]+/securityGateways/[^/]+` and `projects/[^/]+/locations/[^/]+/securityGateways/[^/]+/applications/[^/]+` (`securityGateways`, plural), and `securityGateways.get` returns a `GoogleCloudBeyondcorpSecuritygatewaysV1SecurityGateway`.
- Source: https://beyondcorp.googleapis.com/$discovery/rest?version=v1, https://beyondcorp.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
