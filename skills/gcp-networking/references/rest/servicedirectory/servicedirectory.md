---
source: https://servicedirectory.googleapis.com/$discovery/rest?version=v1
---

# Service Directory API REST API (servicedirectory)

## Signature / Usage

Base URL: `https://servicedirectory.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `servicedirectory.projects.locations.get`

- Versions: v1, v1beta1
- `GET https://servicedirectory.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `servicedirectory.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://servicedirectory.googleapis.com/v1/{+name}/locations`
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

### `servicedirectory.projects.locations.namespaces.create`

- Versions: v1, v1beta1
- `POST https://servicedirectory.googleapis.com/v1/{+parent}/namespaces`
- Creates a namespace, and returns the new namespace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Namespace`; Response: `Namespace`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the project and location the namespace will be created in. |
| `namespaceId` | query | string | yes | Required. The Resource ID must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |

### `servicedirectory.projects.locations.namespaces.delete`

- Versions: v1, v1beta1
- `DELETE https://servicedirectory.googleapis.com/v1/{+name}`
- Deletes a namespace. This also deletes all services and endpoints in the namespace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the namespace to delete. |

### `servicedirectory.projects.locations.namespaces.get`

- Versions: v1, v1beta1
- `GET https://servicedirectory.googleapis.com/v1/{+name}`
- Gets a namespace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Namespace`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the namespace to retrieve. |

### `servicedirectory.projects.locations.namespaces.getIamPolicy`

- Versions: v1, v1beta1
- `POST https://servicedirectory.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM Policy for a resource (namespace or service only).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicedirectory.projects.locations.namespaces.list`

- Versions: v1, v1beta1
- `GET https://servicedirectory.googleapis.com/v1/{+parent}/namespaces`
- Lists all namespaces.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNamespacesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the project and location whose namespaces you'd like to list. |
| `filter` | query | string | no | Optional. The filter to list results by. General `filter` string syntax: ` ()` \* \`\` can be `name` or `labels.` for map field \* \`\` can be `<`, `>`, `<=`, `>=`, `!=`, `=`, `:`. Of which `:` means `HAS`, and is roughly the same as `=` \* \`\` must be the same data type as field \* \`\` can be `AND`, `OR`, `NOT` Examples of valid filters: \* `labels.owner` returns namespaces that have a label with the key `owner`, this is the same as `labels:owner` \* `labels.owner=sd` returns namespaces that have key/value `owner=sd` \* `name>projects/my-project/locations/us-east1/namespaces/namespace-c` returns namespaces that have name that is alphabetically later than the string, so "namespace-e" is returned but "namespace-a" is not \* `labels.owner!=sd AND labels.foo=bar` returns namespaces that have `owner` in label key but value is not `sd` AND have key/value `foo=bar` \* `doesnotexist.foo=bar` returns an empty list. Note that namespace doesn't have a field called "doesnotexist". Since the filter does not match any namespaces, it returns no results For more information about filtering, see API Filtering (https://aip.dev/160). |
| `orderBy` | query | string | no | Optional. The order to list results by. General `order_by` string syntax: ` () (,)` \* \`\` allows value: `name` \* \`\` ascending or descending order by \`\`. If this is left blank, `asc` is used Note that an empty `order_by` string results in default order, which is order by `name` in ascending order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous List request, if any. |

### `servicedirectory.projects.locations.namespaces.patch`

- Versions: v1, v1beta1
- `PATCH https://servicedirectory.googleapis.com/v1/{+name}`
- Updates a namespace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Namespace`; Response: `Namespace`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name for the namespace in the format `projects/*/locations/*/namespaces/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. List of fields to be updated in this request. |

### `servicedirectory.projects.locations.namespaces.services.create`

- Versions: v1, v1beta1
- `POST https://servicedirectory.googleapis.com/v1/{+parent}/services`
- Creates a service, and returns the new service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Service`; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the namespace this service will belong to. |
| `serviceId` | query | string | yes | Required. The Resource ID must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |

### `servicedirectory.projects.locations.namespaces.services.delete`

- Versions: v1, v1beta1
- `DELETE https://servicedirectory.googleapis.com/v1/{+name}`
- Deletes a service. This also deletes all endpoints associated with the service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the service to delete. |

### `servicedirectory.projects.locations.namespaces.services.endpoints.create`

- Versions: v1, v1beta1
- `POST https://servicedirectory.googleapis.com/v1/{+parent}/endpoints`
- Creates an endpoint, and returns the new endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Endpoint`; Response: `Endpoint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the service that this endpoint provides. |
| `endpointId` | query | string | yes | Required. The Resource ID must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |

### `servicedirectory.projects.locations.namespaces.services.endpoints.delete`

- Versions: v1, v1beta1
- `DELETE https://servicedirectory.googleapis.com/v1/{+name}`
- Deletes an endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the endpoint to delete. |

### `servicedirectory.projects.locations.namespaces.services.endpoints.get`

- Versions: v1, v1beta1
- `GET https://servicedirectory.googleapis.com/v1/{+name}`
- Gets an endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Endpoint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the endpoint to get. |

### `servicedirectory.projects.locations.namespaces.services.endpoints.list`

- Versions: v1, v1beta1
- `GET https://servicedirectory.googleapis.com/v1/{+parent}/endpoints`
- Lists all endpoints.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEndpointsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the service whose endpoints you'd like to list. |
| `filter` | query | string | no | Optional. The filter to list results by. General `filter` string syntax: ` ()` \* \`\` can be `name`, `address`, `port`, or `annotations.` for map field \* \`\` can be `<`, `>`, `<=`, `>=`, `!=`, `=`, `:`. Of which `:` means `HAS`, and is roughly the same as `=` \* \`\` must be the same data type as field \* \`\` can be `AND`, `OR`, `NOT` Examples of valid filters: \* `annotations.owner` returns endpoints that have a annotation with the key `owner`, this is the same as `annotations:owner` \* `annotations.protocol=gRPC` returns endpoints that have key/value `protocol=gRPC` \* `address=192.108.1.105` returns endpoints that have this address \* `port>8080` returns endpoints that have port number larger than 8080 \* `name>projects/my-project/locations/us-east1/namespaces/my-namespace/services/my-service/endpoints/endpoint-c` returns endpoints that have name that is alphabetically later than the string, so "endpoint-e" is returned but "endpoint-a" is not \* `annotations.owner!=sd AND annotations.foo=bar` returns endpoints that have `owner` in annotation key but value is not `sd` AND have key/value `foo=bar` \* `doesnotexist.foo=bar` returns an empty list. Note that endpoint doesn't have a field called "doesnotexist". Since the filter does not match any endpoints, it returns no results For more information about filtering, see API Filtering (https://aip.dev/160). |
| `orderBy` | query | string | no | Optional. The order to list results by. General `order_by` string syntax: ` () (,)` \* \`\` allows values: `name`, `address`, `port` \* \`\` ascending or descending order by \`\`. If this is left blank, `asc` is used Note that an empty `order_by` string results in default order, which is order by `name` in ascending order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous List request, if any. |

### `servicedirectory.projects.locations.namespaces.services.endpoints.patch`

- Versions: v1, v1beta1
- `PATCH https://servicedirectory.googleapis.com/v1/{+name}`
- Updates an endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Endpoint`; Response: `Endpoint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name for the endpoint in the format `projects/*/locations/*/namespaces/*/services/*/endpoints/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. List of fields to be updated in this request. |

### `servicedirectory.projects.locations.namespaces.services.get`

- Versions: v1, v1beta1
- `GET https://servicedirectory.googleapis.com/v1/{+name}`
- Gets a service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the service to get. |

### `servicedirectory.projects.locations.namespaces.services.getIamPolicy`

- Versions: v1, v1beta1
- `POST https://servicedirectory.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM Policy for a resource (namespace or service only).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicedirectory.projects.locations.namespaces.services.list`

- Versions: v1, v1beta1
- `GET https://servicedirectory.googleapis.com/v1/{+parent}/services`
- Lists all services belonging to a namespace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the namespace whose services you'd like to list. |
| `filter` | query | string | no | Optional. The filter to list results by. General `filter` string syntax: ` ()` \* \`\` can be `name` or `annotations.` for map field \* \`\` can be `<`, `>`, `<=`, `>=`, `!=`, `=`, `:`. Of which `:` means `HAS`, and is roughly the same as `=` \* \`\` must be the same data type as field \* \`\` can be `AND`, `OR`, `NOT` Examples of valid filters: \* `annotations.owner` returns services that have a annotation with the key `owner`, this is the same as `annotations:owner` \* `annotations.protocol=gRPC` returns services that have key/value `protocol=gRPC` \* `name>projects/my-project/locations/us-east1/namespaces/my-namespace/services/service-c` returns services that have name that is alphabetically later than the string, so "service-e" is returned but "service-a" is not \* `annotations.owner!=sd AND annotations.foo=bar` returns services that have `owner` in annotation key but value is not `sd` AND have key/value `foo=bar` \* `doesnotexist.foo=bar` returns an empty list. Note that service doesn't have a field called "doesnotexist". Since the filter does not match any services, it returns no results For more information about filtering, see API Filtering (https://aip.dev/160). |
| `orderBy` | query | string | no | Optional. The order to list results by. General `order_by` string syntax: ` () (,)` \* \`\` allows value: `name` \* \`\` ascending or descending order by \`\`. If this is left blank, `asc` is used Note that an empty `order_by` string results in default order, which is order by `name` in ascending order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous List request, if any. |

### `servicedirectory.projects.locations.namespaces.services.patch`

- Versions: v1, v1beta1
- `PATCH https://servicedirectory.googleapis.com/v1/{+name}`
- Updates a service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Service`; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name for the service in the format `projects/*/locations/*/namespaces/*/services/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. List of fields to be updated in this request. |

### `servicedirectory.projects.locations.namespaces.services.resolve`

- Versions: v1, v1beta1
- `POST https://servicedirectory.googleapis.com/v1/{+name}:resolve`
- Returns a service and its associated endpoints. Resolving a service is not considered an active developer method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResolveServiceRequest`; Response: `ResolveServiceResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the service to resolve. |

### `servicedirectory.projects.locations.namespaces.services.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://servicedirectory.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM Policy for a resource (namespace or service only).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicedirectory.projects.locations.namespaces.services.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://servicedirectory.googleapis.com/v1/{+resource}:testIamPermissions`
- Tests IAM permissions for a resource (namespace or service only).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicedirectory.projects.locations.namespaces.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://servicedirectory.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM Policy for a resource (namespace or service only).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicedirectory.projects.locations.namespaces.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://servicedirectory.googleapis.com/v1/{+resource}:testIamPermissions`
- Tests IAM permissions for a resource (namespace or service only).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicedirectory.projects.locations.namespaces.workloads.getIamPolicy`

- Versions: v1beta1
- `POST https://servicedirectory.googleapis.com/v1beta1/{+resource}:getIamPolicy`
- Gets the IAM Policy for a resource
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicedirectory.projects.locations.namespaces.workloads.setIamPolicy`

- Versions: v1beta1
- `POST https://servicedirectory.googleapis.com/v1beta1/{+resource}:setIamPolicy`
- Sets the IAM Policy for a resource
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `servicedirectory.projects.locations.namespaces.workloads.testIamPermissions`

- Versions: v1beta1
- `POST https://servicedirectory.googleapis.com/v1beta1/{+resource}:testIamPermissions`
- Tests IAM permissions for a resource (namespace, service or service workload only).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `servicedirectory.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://servicedirectory.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `servicedirectory` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/servicedirectory/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`servicedirectory` v1, revision 20260916) also lists 42 endpoints of the form `https://servicedirectory.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://servicedirectory.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://servicedirectory.africa-south1.rep.googleapis.com/`) and keep the path.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://servicedirectory.googleapis.com/$discovery/rest?version=v1, https://servicedirectory.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
