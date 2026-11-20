---
source: https://analyticshub.googleapis.com/$discovery/rest?version=v1
---

# Analytics Hub API REST API (analyticshub)

## Signature / Usage

Base URL: `https://analyticshub.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1). The URL, parameters and request / response types shown for a method come from the first version on its `Versions` line; for another version, see the Discovery document of that version under Source in Notes.

### `analyticshub.organizations.locations.dataExchanges.list`

- Versions: v1, v1beta1
- `GET https://analyticshub.googleapis.com/v1/{+organization}/dataExchanges`
- Lists all data exchanges from projects in a given organization and location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOrgDataExchangesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `organization` | path | string | yes | Required. The organization resource path of the projects containing DataExchanges. e.g. `organizations/myorg/locations/us`. |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. |
| `pageToken` | query | string | no | Page token, returned by a previous call, to request the next page of results. |

### `analyticshub.projects.locations.dataExchanges.create`

- Versions: v1, v1beta1
- `POST https://analyticshub.googleapis.com/v1/{+parent}/dataExchanges`
- Creates a new data exchange.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `DataExchange`; Response: `DataExchange`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource path of the data exchange. e.g. `projects/myproject/locations/us`. |
| `dataExchangeId` | query | string | yes | Required. The ID of the data exchange. Must contain only Unicode letters, numbers (0-9), underscores (\_). Max length: 100 bytes. |

### `analyticshub.projects.locations.dataExchanges.delete`

- Versions: v1, v1beta1
- `DELETE https://analyticshub.googleapis.com/v1/{+name}`
- Deletes an existing data exchange.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the data exchange resource that you want to delete. For example, `projects/myproject/locations/us/dataExchanges/123`. |

### `analyticshub.projects.locations.dataExchanges.get`

- Versions: v1, v1beta1
- `GET https://analyticshub.googleapis.com/v1/{+name}`
- Gets the details of a data exchange.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DataExchange`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the data exchange. e.g. `projects/myproject/locations/us/dataExchanges/123`. |

### `analyticshub.projects.locations.dataExchanges.getIamPolicy`

- Versions: v1, v1beta1
- `POST https://analyticshub.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM policy.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `analyticshub.projects.locations.dataExchanges.list`

- Versions: v1, v1beta1
- `GET https://analyticshub.googleapis.com/v1/{+parent}/dataExchanges`
- Lists all data exchanges in a given project and location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDataExchangesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource path of the data exchanges. e.g. `projects/myproject/locations/us`. |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. |
| `pageToken` | query | string | no | Page token, returned by a previous call, to request the next page of results. |

### `analyticshub.projects.locations.dataExchanges.listSubscriptions`

- Versions: v1
- `GET https://analyticshub.googleapis.com/v1/{+resource}:listSubscriptions`
- Lists all subscriptions on a given Data Exchange or Listing.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSharedResourceSubscriptionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Required. Resource name of the requested target. This resource may be either a Listing or a DataExchange. e.g. projects/123/locations/us/dataExchanges/456 OR e.g. projects/123/locations/us/dataExchanges/456/listings/789 |
| `includeDeletedSubscriptions` | query | boolean | no | If selected, includes deleted subscriptions in the response (up to 63 days after deletion). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return in a single response page. |
| `pageToken` | query | string | no | Page token, returned by a previous call. |

### `analyticshub.projects.locations.dataExchanges.listings.create`

- Versions: v1, v1beta1
- `POST https://analyticshub.googleapis.com/v1/{+parent}/listings`
- Creates a new listing.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Listing`; Response: `Listing`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource path of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123`. |
| `listingId` | query | string | yes | Required. The ID of the listing to create. Must contain only Unicode letters, numbers (0-9), underscores (\_). Max length: 100 bytes. |

### `analyticshub.projects.locations.dataExchanges.listings.delete`

- Versions: v1, v1beta1
- `DELETE https://analyticshub.googleapis.com/v1/{+name}`
- Deletes a listing.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the listing to delete. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456`. |
| `deleteCommercial` | query | boolean | conditional | Optional. If the listing is commercial then this field must be set to true, otherwise a failure is thrown. This acts as a safety guard to avoid deleting commercial listings accidentally. |

### `analyticshub.projects.locations.dataExchanges.listings.get`

- Versions: v1, v1beta1
- `GET https://analyticshub.googleapis.com/v1/{+name}`
- Gets the details of a listing.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Listing`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456`. |

### `analyticshub.projects.locations.dataExchanges.listings.getIamPolicy`

- Versions: v1, v1beta1
- `POST https://analyticshub.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM policy.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `analyticshub.projects.locations.dataExchanges.listings.list`

- Versions: v1, v1beta1
- `GET https://analyticshub.googleapis.com/v1/{+parent}/listings`
- Lists all listings in a given project and location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListListingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource path of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123`. |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. |
| `pageToken` | query | string | no | Page token, returned by a previous call, to request the next page of results. |

### `analyticshub.projects.locations.dataExchanges.listings.listSubscriptions`

- Versions: v1
- `GET https://analyticshub.googleapis.com/v1/{+resource}:listSubscriptions`
- Lists all subscriptions on a given Data Exchange or Listing.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSharedResourceSubscriptionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Required. Resource name of the requested target. This resource may be either a Listing or a DataExchange. e.g. projects/123/locations/us/dataExchanges/456 OR e.g. projects/123/locations/us/dataExchanges/456/listings/789 |
| `includeDeletedSubscriptions` | query | boolean | no | If selected, includes deleted subscriptions in the response (up to 63 days after deletion). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return in a single response page. |
| `pageToken` | query | string | no | Page token, returned by a previous call. |

### `analyticshub.projects.locations.dataExchanges.listings.patch`

- Versions: v1, v1beta1
- `PATCH https://analyticshub.googleapis.com/v1/{+name}`
- Updates an existing listing.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Listing`; Response: `Listing`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask specifies the fields to update in the listing resource. The fields specified in the `updateMask` are relative to the resource and are not a full request. |

### `analyticshub.projects.locations.dataExchanges.listings.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://analyticshub.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM policy.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `analyticshub.projects.locations.dataExchanges.listings.subscribe`

- Versions: v1, v1beta1
- `POST https://analyticshub.googleapis.com/v1/{+name}:subscribe`
- Subscribes to a listing. Currently, with Analytics Hub, you can create listings that reference only BigQuery datasets. Upon subscription to a listing for a BigQuery dataset, Analytics Hub creates a linked dataset in the subscriber's project.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SubscribeListingRequest`; Response: `SubscribeListingResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the listing that you want to subscribe to. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456`. |

### `analyticshub.projects.locations.dataExchanges.listings.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://analyticshub.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns the permissions that a caller has.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `analyticshub.projects.locations.dataExchanges.patch`

- Versions: v1, v1beta1
- `PATCH https://analyticshub.googleapis.com/v1/{+name}`
- Updates an existing data exchange.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `DataExchange`; Response: `DataExchange`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the data exchange. e.g. `projects/myproject/locations/us/dataExchanges/123`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask specifies the fields to update in the data exchange resource. The fields specified in the `updateMask` are relative to the resource and are not a full request. |

### `analyticshub.projects.locations.dataExchanges.queryTemplates.approve`

- Versions: v1
- `POST https://analyticshub.googleapis.com/v1/{+name}:approve`
- Approves a query template.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApproveQueryTemplateRequest`; Response: `QueryTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource path of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/myqueryTemplate`. |

### `analyticshub.projects.locations.dataExchanges.queryTemplates.create`

- Versions: v1
- `POST https://analyticshub.googleapis.com/v1/{+parent}/queryTemplates`
- Creates a new QueryTemplate
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `QueryTemplate`; Response: `QueryTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource path of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/myQueryTemplate`. |
| `queryTemplateId` | query | string | yes | Required. The ID of the QueryTemplate to create. Must contain only Unicode letters, numbers (0-9), underscores (\_). Max length: 100 bytes. |

### `analyticshub.projects.locations.dataExchanges.queryTemplates.delete`

- Versions: v1
- `DELETE https://analyticshub.googleapis.com/v1/{+name}`
- Deletes a query template.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource path of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/myqueryTemplate`. |

### `analyticshub.projects.locations.dataExchanges.queryTemplates.get`

- Versions: v1
- `GET https://analyticshub.googleapis.com/v1/{+name}`
- Gets a QueryTemplate
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The parent resource path of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/myqueryTemplate`. |

### `analyticshub.projects.locations.dataExchanges.queryTemplates.list`

- Versions: v1
- `GET https://analyticshub.googleapis.com/v1/{+parent}/queryTemplates`
- Lists all QueryTemplates in a given project and location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListQueryTemplatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource path of the QueryTemplates. e.g. `projects/myproject/locations/us/dataExchanges/123`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. |
| `pageToken` | query | string | no | Optional. Page token, returned by a previous call, to request the next page of results. |

### `analyticshub.projects.locations.dataExchanges.queryTemplates.patch`

- Versions: v1
- `PATCH https://analyticshub.googleapis.com/v1/{+name}`
- Updates an existing QueryTemplate
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `QueryTemplate`; Response: `QueryTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/456` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask specifies the fields to update in the query template resource. The fields specified in the `updateMask` are relative to the resource and are not a full request. |

### `analyticshub.projects.locations.dataExchanges.queryTemplates.submit`

- Versions: v1
- `POST https://analyticshub.googleapis.com/v1/{+name}:submit`
- Submits a query template for approval.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SubmitQueryTemplateRequest`; Response: `QueryTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource path of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/myqueryTemplate`. |

### `analyticshub.projects.locations.dataExchanges.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://analyticshub.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM policy.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `analyticshub.projects.locations.dataExchanges.subscribe`

- Versions: v1
- `POST https://analyticshub.googleapis.com/v1/{+name}:subscribe`
- Creates a Subscription to a Data Clean Room. This is a long-running operation as it will create one or more linked datasets. Throws a Bad Request error if the Data Exchange does not contain any listings.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SubscribeDataExchangeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Data Exchange. e.g. `projects/publisherproject/locations/us/dataExchanges/123` |

### `analyticshub.projects.locations.dataExchanges.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://analyticshub.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns the permissions that a caller has.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `analyticshub.projects.locations.subscriptions.delete`

- Versions: v1
- `DELETE https://analyticshub.googleapis.com/v1/{+name}`
- Deletes a subscription.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the subscription to delete. e.g. projects/123/locations/us/subscriptions/456 |

### `analyticshub.projects.locations.subscriptions.get`

- Versions: v1
- `GET https://analyticshub.googleapis.com/v1/{+name}`
- Gets the details of a Subscription.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Subscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the subscription. e.g. projects/123/locations/us/subscriptions/456 |

### `analyticshub.projects.locations.subscriptions.getIamPolicy`

- Versions: v1
- `POST https://analyticshub.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM policy.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `analyticshub.projects.locations.subscriptions.list`

- Versions: v1
- `GET https://analyticshub.googleapis.com/v1/{+parent}/subscriptions`
- Lists all subscriptions in a given project and location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSubscriptionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource path of the subscription. e.g. projects/myproject/locations/us |
| `filter` | query | string | no | An expression for filtering the results of the request. Eligible fields for filtering are: + `listing` + `data_exchange` Alternatively, a literal wrapped in double quotes may be provided. This will be checked for an exact match against both fields above. In all cases, the full Data Exchange or Listing resource name must be provided. Some example of using filters: + data_exchange="projects/myproject/locations/us/dataExchanges/123" + listing="projects/123/locations/us/dataExchanges/456/listings/789" + "projects/myproject/locations/us/dataExchanges/123" |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return in a single response page. |
| `pageToken` | query | string | no | Page token, returned by a previous call. |

### `analyticshub.projects.locations.subscriptions.refresh`

- Versions: v1
- `POST https://analyticshub.googleapis.com/v1/{+name}:refresh`
- Refreshes a Subscription to a Data Exchange. A Data Exchange can become stale when a publisher adds or removes data. This is a long-running operation as it may create many linked datasets.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RefreshSubscriptionRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Subscription to refresh. e.g. `projects/subscriberproject/locations/us/subscriptions/123` |

### `analyticshub.projects.locations.subscriptions.revoke`

- Versions: v1
- `POST https://analyticshub.googleapis.com/v1/{+name}:revoke`
- Revokes a given subscription.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RevokeSubscriptionRequest`; Response: `RevokeSubscriptionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the subscription to revoke. e.g. projects/123/locations/us/subscriptions/456 |

### `analyticshub.projects.locations.subscriptions.setIamPolicy`

- Versions: v1
- `POST https://analyticshub.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM policy.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `analyticshub.organizations.locations.dataExchanges.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://analyticshub.googleapis.com/v1/{+organization}/dataExchanges"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `analyticshub` (retrieved 2026-11-14). Resources on this page: organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Path variables whose description starts with "Output only" are still required in the URL: they name the resource that the method acts on, so they are `yes` in the Required column: `name` in `analyticshub.projects.locations.dataExchanges.listings.patch`, `name` in `analyticshub.projects.locations.dataExchanges.patch`, `name` in `analyticshub.projects.locations.dataExchanges.queryTemplates.patch`. The Discovery document gives them the description of the resource field of the same name, and "Output only" applies to that field of the resource, not to the URL.
- Source: https://analyticshub.googleapis.com/$discovery/rest?version=v1, https://analyticshub.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
