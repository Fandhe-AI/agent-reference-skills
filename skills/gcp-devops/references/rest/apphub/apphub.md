---
source: https://apphub.googleapis.com/$discovery/rest?version=v1
---

# App Hub API REST API (apphub)

## Signature / Usage

Base URL: `https://apphub.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `apphub.projects.locations.applications.create`

- Versions: v1, v1alpha
- `POST https://apphub.googleapis.com/v1/{+parent}/applications`
- Creates an Application in a host project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Application`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location to create Application in. Expected format: `projects/{project}/locations/{location}`. |
| `applicationId` | query | string | yes | Required. The Application identifier. Must contain only lowercase letters, numbers or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `apphub.projects.locations.applications.delete`

- Versions: v1, v1alpha
- `DELETE https://apphub.googleapis.com/v1/{+name}`
- Deletes an Application in a host project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified name of the Application to delete. Expected format: `projects/{project}/locations/{location}/applications/{application}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `apphub.projects.locations.applications.get`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}`
- Gets an Application in a host project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Application`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified name of the Application to fetch. Expected format: `projects/{project}/locations/{location}/applications/{application}`. |

### `apphub.projects.locations.applications.getIamPolicy`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `apphub.projects.locations.applications.list`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+parent}/applications`
- Lists Applications in a host project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListApplicationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location to list Applications on. Expected format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `apphub.projects.locations.applications.patch`

- Versions: v1, v1alpha
- `PATCH https://apphub.googleapis.com/v1/{+name}`
- Updates an Application in a host project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Application`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of an Application. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}"` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Application resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. The API changes the values of the fields as specified in the update_mask. The API ignores the values of all fields not covered by the update_mask. You can also unset a field by not specifying it in the updated message, but adding the field to the mask. This clears whatever value the field previously had. |

### `apphub.projects.locations.applications.services.create`

- Versions: v1, v1alpha
- `POST https://apphub.googleapis.com/v1/{+parent}/services`
- Creates a Service in an Application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Service`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Fully qualified name of the parent Application to create the Service in. Expected format: `projects/{project}/locations/{location}/applications/{application}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `serviceId` | query | string | yes | Required. The Service identifier. Must contain only lowercase letters, numbers or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. |

### `apphub.projects.locations.applications.services.delete`

- Versions: v1, v1alpha
- `DELETE https://apphub.googleapis.com/v1/{+name}`
- Deletes a Service from an Application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified name of the Service to delete from an Application. Expected format: `projects/{project}/locations/{location}/applications/{application}/services/{service}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `apphub.projects.locations.applications.services.get`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}`
- Gets a Service in an Application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified name of the Service to fetch. Expected format: `projects/{project}/locations/{location}/applications/{application}/services/{service}`. |

### `apphub.projects.locations.applications.services.list`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+parent}/services`
- Lists Services in an Application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Fully qualified name of the parent Application to list Services for. Expected format: `projects/{project}/locations/{location}/applications/{application}`. |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `apphub.projects.locations.applications.services.patch`

- Versions: v1, v1alpha
- `PATCH https://apphub.googleapis.com/v1/{+name}`
- Updates a Service in an Application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Service`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of a Service. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}/services/{service-id}"` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Service resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. The API changes the values of the fields as specified in the update_mask. The API ignores the values of all fields not covered by the update_mask. You can also unset a field by not specifying it in the updated message, but adding the field to the mask. This clears whatever value the field previously had. |

### `apphub.projects.locations.applications.setIamPolicy`

- Versions: v1, v1alpha
- `POST https://apphub.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `apphub.projects.locations.applications.testIamPermissions`

- Versions: v1, v1alpha
- `POST https://apphub.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `apphub.projects.locations.applications.workloads.create`

- Versions: v1, v1alpha
- `POST https://apphub.googleapis.com/v1/{+parent}/workloads`
- Creates a Workload in an Application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Workload`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Fully qualified name of the Application to create Workload in. Expected format: `projects/{project}/locations/{location}/applications/{application}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `workloadId` | query | string | yes | Required. The Workload identifier. Must contain only lowercase letters, numbers or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. |

### `apphub.projects.locations.applications.workloads.delete`

- Versions: v1, v1alpha
- `DELETE https://apphub.googleapis.com/v1/{+name}`
- Deletes a Workload from an Application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified name of the Workload to delete from an Application. Expected format: `projects/{project}/locations/{location}/applications/{application}/workloads/{workload}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `apphub.projects.locations.applications.workloads.get`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}`
- Gets a Workload in an Application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Workload`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified name of the Workload to fetch. Expected format: `projects/{project}/locations/{location}/applications/{application}/workloads/{workload}`. |

### `apphub.projects.locations.applications.workloads.list`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+parent}/workloads`
- Lists Workloads in an Application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWorkloadsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Fully qualified name of the parent Application to list Workloads for. Expected format: `projects/{project}/locations/{location}/applications/{application}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `apphub.projects.locations.applications.workloads.patch`

- Versions: v1, v1alpha
- `PATCH https://apphub.googleapis.com/v1/{+name}`
- Updates a Workload in an Application.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Workload`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the Workload. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}/workloads/{workload-id}"` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Workload resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. The API changes the values of the fields as specified in the update_mask. The API ignores the values of all fields not covered by the update_mask. You can also unset a field by not specifying it in the updated message, but adding the field to the mask. This clears whatever value the field previously had. |

### `apphub.projects.locations.detachServiceProjectAttachment`

- Versions: v1, v1alpha
- `POST https://apphub.googleapis.com/v1/{+name}:detachServiceProjectAttachment`
- Detaches a service project from a host project. You can call this API from any service project without needing access to the host project that it is attached to.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DetachServiceProjectAttachmentRequest`; Response: `DetachServiceProjectAttachmentResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Service project id and location to detach from a host project. Only global location is supported. Expected format: `projects/{project}/locations/{location}`. |

### `apphub.projects.locations.discoveredServices.findUnregistered`

- Versions: v1alpha
- `GET https://apphub.googleapis.com/v1alpha/{+parent}/discoveredServices:findUnregistered`
- Finds unregistered services in a host project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FindUnregisteredServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location to find unregistered Discovered Services on. Expected format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `apphub.projects.locations.discoveredServices.get`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}`
- Gets a Discovered Service in a host project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DiscoveredService`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified name of the Discovered Service to fetch. Expected format: `projects/{project}/locations/{location}/discoveredServices/{discoveredService}`. |

### `apphub.projects.locations.discoveredServices.list`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+parent}/discoveredServices`
- Lists Discovered Services that can be added to an Application in a host project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDiscoveredServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location to list Discovered Services on. Expected format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `apphub.projects.locations.discoveredServices.lookup`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+parent}/discoveredServices:lookup`
- Lists a Discovered Service in a host project and location, with a given resource URI.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LookupDiscoveredServiceResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Host project ID and location to lookup Discovered Service in. Expected format: `projects/{project}/locations/{location}`. |
| `uri` | query | string | yes | Required. Resource URI to find DiscoveredService for. Accepts both project number and project ID and does translation when needed. |

### `apphub.projects.locations.discoveredWorkloads.findUnregistered`

- Versions: v1alpha
- `GET https://apphub.googleapis.com/v1alpha/{+parent}/discoveredWorkloads:findUnregistered`
- Finds unregistered workloads in a host project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FindUnregisteredWorkloadsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location to find unregistered Discovered Workloads on. Expected format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `apphub.projects.locations.discoveredWorkloads.get`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}`
- Gets a Discovered Workload in a host project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DiscoveredWorkload`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified name of the Discovered Workload to fetch. Expected format: `projects/{project}/locations/{location}/discoveredWorkloads/{discoveredWorkload}`. |

### `apphub.projects.locations.discoveredWorkloads.list`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+parent}/discoveredWorkloads`
- Lists Discovered Workloads that can be added to an Application in a host project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDiscoveredWorkloadsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location to list Discovered Workloads on. Expected format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `apphub.projects.locations.discoveredWorkloads.lookup`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+parent}/discoveredWorkloads:lookup`
- Lists a Discovered Workload in a host project and location, with a given resource URI.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LookupDiscoveredWorkloadResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Host project ID and location to lookup Discovered Workload in. Expected format: `projects/{project}/locations/{location}`. |
| `uri` | query | string | yes | Required. Resource URI to find Discovered Workload for. Accepts both project number and project ID and does translation when needed. |

### `apphub.projects.locations.extendedMetadataSchemas.get`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}`
- Gets an Extended Metadata Schema.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ExtendedMetadataSchema`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Schema resource name. Format: `projects/{project}/locations/{location}/extendedMetadataSchemas/{extended_metadata_schema}`. `{extended_metadata_schema}` has the format `"apphub.googleapis.com/{SchemaName}"`. |

### `apphub.projects.locations.extendedMetadataSchemas.list`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+parent}/extendedMetadataSchemas`
- Lists Extended Metadata Schemas available in a host project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListExtendedMetadataSchemasResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location to list Extended Metadata Schemas on. Expected format: `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `apphub.projects.locations.get`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `apphub.projects.locations.getBoundary`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}`
- Gets a Boundary.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Boundary`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the boundary to retrieve. Format: `projects/{project}/locations/{location}/boundary`. |

### `apphub.projects.locations.list`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}/locations`
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

### `apphub.projects.locations.lookupServiceProjectAttachment`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}:lookupServiceProjectAttachment`
- Lists a service project attachment for a given service project. You can call this API from any project to find if it is attached to a host project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LookupServiceProjectAttachmentResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Service project ID and location to lookup service project attachment for. Only global location is supported. Expected format: `projects/{project}/locations/{location}`. |

### `apphub.projects.locations.operations.cancel`

- Versions: v1, v1alpha
- `POST https://apphub.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `apphub.projects.locations.operations.delete`

- Versions: v1, v1alpha
- `DELETE https://apphub.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `apphub.projects.locations.operations.get`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `apphub.projects.locations.operations.list`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}/operations`
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

### `apphub.projects.locations.serviceProjectAttachments.create`

- Versions: v1, v1alpha
- `POST https://apphub.googleapis.com/v1/{+parent}/serviceProjectAttachments`
- Attaches a service project to the host project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServiceProjectAttachment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Host project ID and location to which service project is being attached. Only global location is supported. Expected format: `projects/{project}/locations/{location}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `serviceProjectAttachmentId` | query | string | yes | Required. The service project attachment identifier must contain the project id of the service project specified in the service_project_attachment.service_project field. |

### `apphub.projects.locations.serviceProjectAttachments.delete`

- Versions: v1, v1alpha
- `DELETE https://apphub.googleapis.com/v1/{+name}`
- Deletes a service project attachment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified name of the service project attachment to delete. Expected format: `projects/{project}/locations/{location}/serviceProjectAttachments/{serviceProjectAttachment}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `apphub.projects.locations.serviceProjectAttachments.get`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+name}`
- Gets a service project attachment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ServiceProjectAttachment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified name of the service project attachment to retrieve. Expected format: `projects/{project}/locations/{location}/serviceProjectAttachments/{serviceProjectAttachment}`. |

### `apphub.projects.locations.serviceProjectAttachments.list`

- Versions: v1, v1alpha
- `GET https://apphub.googleapis.com/v1/{+parent}/serviceProjectAttachments`
- Lists service projects attached to the host project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServiceProjectAttachmentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Host project ID and location to list service project attachments. Only global location is supported. Expected format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `apphub.projects.locations.updateBoundary`

- Versions: v1, v1alpha
- `PATCH https://apphub.googleapis.com/v1/{+name}`
- Updates a Boundary.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Boundary`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the boundary. Format: "projects/{project}/locations/{location}/boundary" |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Boundary resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### Example request skeleton

Generated from the Discovery entry of `apphub.projects.locations.applications.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://apphub.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1alpha of `apphub` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://apphub.googleapis.com/$discovery/rest?version=v1, https://apphub.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
