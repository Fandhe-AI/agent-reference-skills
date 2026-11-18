---
source: https://accesscontextmanager.googleapis.com/$discovery/rest?version=v1
---

# Access Context Manager API REST API (accesscontextmanager)

## Signature / Usage

Base URL: `https://accesscontextmanager.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `accesscontextmanager.accessPolicies.accessLevels.create`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+parent}/accessLevels`
- Creates an access level. The long-running operation from this RPC has a successful status after the access level propagates to long-lasting storage. If access levels contain errors, an error response is returned for the first error encountered.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AccessLevel`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name for the access policy which owns this Access Level. Format: `accessPolicies/{policy_id}` |

### `accesscontextmanager.accessPolicies.accessLevels.delete`

- Versions: v1
- `DELETE https://accesscontextmanager.googleapis.com/v1/{+name}`
- Deletes an access level based on the resource name. The long-running operation from this RPC has a successful status after the access level has been removed from long-lasting storage.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name for the Access Level. Format: `accessPolicies/{policy_id}/accessLevels/{access_level_id}` |

### `accesscontextmanager.accessPolicies.accessLevels.get`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+name}`
- Gets an access level based on the resource name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AccessLevel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name for the Access Level. Format: `accessPolicies/{policy_id}/accessLevels/{access_level_id}` |
| `accessLevelFormat` | query | string enum | no | Whether to return `BasicLevels` in the Cloud Common Expression Language rather than as `BasicLevels`. Defaults to `AS_DEFINED`, where Access Levels are returned as `BasicLevels` or `CustomLevels` based on how they were created. If set to `CEL`, all Access Levels are returned as `CustomLevels`. In the `CEL` case, `BasicLevels` are translated to equivalent `CustomLevels`. Values: `LEVEL_FORMAT_UNSPECIFIED`, `AS_DEFINED`, `CEL`. |

### `accesscontextmanager.accessPolicies.accessLevels.list`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+parent}/accessLevels`
- Lists all access levels for an access policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAccessLevelsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name for the access policy to list Access Levels from. Format: `accessPolicies/{policy_id}` |
| `accessLevelFormat` | query | string enum | no | Whether to return `BasicLevels` in the Cloud Common Expression Language, as `CustomLevels`, rather than as `BasicLevels`. Defaults to returning `AccessLevels` in the format they were defined. Values: `LEVEL_FORMAT_UNSPECIFIED`, `AS_DEFINED`, `CEL`. |
| `pageSize` | query | integer (int32) | no | Number of Access Levels to include in the list. Default 100. |
| `pageToken` | query | string | no | Next page token for the next batch of Access Level instances. Defaults to the first page of results. |

### `accesscontextmanager.accessPolicies.accessLevels.patch`

- Versions: v1
- `PATCH https://accesscontextmanager.googleapis.com/v1/{+name}`
- Updates an access level. The long-running operation from this RPC has a successful status after the changes to the access level propagate to long-lasting storage. If access levels contain errors, an error response is returned for the first error encountered.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AccessLevel`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name for the `AccessLevel`. Format: `accessPolicies/{access_policy}/accessLevels/{access_level}`. The `access_level` component must begin with a letter, followed by alphanumeric characters or `_`. Its maximum length is 50 characters. After you create an `AccessLevel`, you cannot change its `name`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask to control which fields get updated. Must be non-empty. |

### `accesscontextmanager.accessPolicies.accessLevels.replaceAll`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+parent}/accessLevels:replaceAll`
- Replaces all existing access levels in an access policy with the access levels provided. This is done atomically. The long-running operation from this RPC has a successful status after all replacements propagate to long-lasting storage. If the replacement contains errors, an error response is returned for the first error encountered. Upon error, the replacement is cancelled, and existing access levels are not affected. The `Operation.response` field contains `ReplaceAccessLevelsResponse`. Removing access levels contained in existing service perimeters results in an error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReplaceAccessLevelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name for the access policy which owns these Access Levels. Format: `accessPolicies/{policy_id}` |

### `accesscontextmanager.accessPolicies.accessLevels.testIamPermissions`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns the IAM permissions that the caller has on the specified Access Context Manager resource. The resource can be an AccessPolicy, AccessLevel, or ServicePerimeter. This method does not support other resources. \*\*IAM Permissions\*\*: No specific IAM permission is required to call this method. It returns the subset of the requested permissions that the caller possesses.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `accesscontextmanager.accessPolicies.authorizedOrgsDescs.create`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+parent}/authorizedOrgsDescs`
- Creates an authorized orgs desc. The long-running operation from this RPC has a successful status after the authorized orgs desc propagates to long-lasting storage. If an authorized orgs desc contains errors, an error response is returned for the first error encountered. The name of this `AuthorizedOrgsDesc` will be assigned during creation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthorizedOrgsDesc`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name for the access policy which owns this Authorized Orgs Desc. Format: `accessPolicies/{policy_id}` |

### `accesscontextmanager.accessPolicies.authorizedOrgsDescs.delete`

- Versions: v1
- `DELETE https://accesscontextmanager.googleapis.com/v1/{+name}`
- Deletes an authorized orgs desc based on the resource name. The long-running operation from this RPC has a successful status after the authorized orgs desc is removed from long-lasting storage.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name for the Authorized Orgs Desc. Format: `accessPolicies/{policy_id}/authorizedOrgsDescs/{authorized_orgs_desc_id}` |

### `accesscontextmanager.accessPolicies.authorizedOrgsDescs.get`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+name}`
- Gets an authorized orgs desc based on the resource name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuthorizedOrgsDesc`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name for the Authorized Orgs Desc. Format: `accessPolicies/{policy_id}/authorizedOrgsDescs/{authorized_orgs_desc_id}` |

### `accesscontextmanager.accessPolicies.authorizedOrgsDescs.list`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+parent}/authorizedOrgsDescs`
- Lists all authorized orgs descs for an access policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuthorizedOrgsDescsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name for the access policy to list Authorized Orgs Desc from. Format: `accessPolicies/{policy_id}` |
| `pageSize` | query | integer (int32) | no | Number of Authorized Orgs Descs to include in the list. Default 100. |
| `pageToken` | query | string | no | Next page token for the next batch of Authorized Orgs Desc instances. Defaults to the first page of results. |

### `accesscontextmanager.accessPolicies.authorizedOrgsDescs.patch`

- Versions: v1
- `PATCH https://accesscontextmanager.googleapis.com/v1/{+name}`
- Updates an authorized orgs desc. The long-running operation from this RPC has a successful status after the authorized orgs desc propagates to long-lasting storage. If an authorized orgs desc contains errors, an error response is returned for the first error encountered. Only the organization list in `AuthorizedOrgsDesc` can be updated. The `name`, `authorization_type`, `asset_type`, and `authorization_direction` cannot be updated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthorizedOrgsDesc`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name for the `AuthorizedOrgsDesc`. Format: `accessPolicies/{access_policy}/authorizedOrgsDescs/{authorized_orgs_desc}`. The `authorized_orgs_desc` component must begin with a letter, followed by alphanumeric characters or `_`. After you create an `AuthorizedOrgsDesc`, you cannot change its `name`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask to control which fields get updated. Must be non-empty. |

### `accesscontextmanager.accessPolicies.create`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/accessPolicies`
- Creates an access policy. This method fails if the organization already has an access policy. The long-running operation has a successful status after the access policy propagates to long-lasting storage. Syntactic and basic semantic errors are returned in `metadata` as a BadRequest proto.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AccessPolicy`; Response: `Operation`

### `accesscontextmanager.accessPolicies.delete`

- Versions: v1
- `DELETE https://accesscontextmanager.googleapis.com/v1/{+name}`
- Deletes an access policy based on the resource name. The long-running operation has a successful status after the access policy is removed from long-lasting storage.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name for the access policy to delete. Format: `accessPolicies/{policy_id}` |

### `accesscontextmanager.accessPolicies.get`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+name}`
- Returns an access policy based on the name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AccessPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name for the access policy to get. Format: `accessPolicies/{policy_id}` |

### `accesscontextmanager.accessPolicies.getIamPolicy`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM policy for the specified Access Context Manager access policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `accesscontextmanager.accessPolicies.list`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/accessPolicies`
- Lists all access policies in an organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAccessPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Number of AccessPolicy instances to include in the list. Default 100. |
| `pageToken` | query | string | no | Next page token for the next batch of AccessPolicy instances. Defaults to the first page of results. |
| `parent` | query | string | yes | Required. Resource name for the container to list AccessPolicy instances from. Format: `organizations/{org_id}` |

### `accesscontextmanager.accessPolicies.patch`

- Versions: v1
- `PATCH https://accesscontextmanager.googleapis.com/v1/{+name}`
- Updates an access policy. The long-running operation from this RPC has a successful status after the changes to the access policy propagate to long-lasting storage.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AccessPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. Resource name of the `AccessPolicy`. Format: `accessPolicies/{access_policy}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask to control which fields get updated. Must be non-empty. |

### `accesscontextmanager.accessPolicies.servicePerimeters.commit`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+parent}/servicePerimeters:commit`
- Commits the dry-run specification for all the service perimeters in an access policy. A commit operation on a service perimeter involves copying its `spec` field to the `status` field of the service perimeter. Only service perimeters with `use_explicit_dry_run_spec` field set to true are affected by a commit operation. The long-running operation from this RPC has a successful status after the dry-run specifications for all the service perimeters have been committed. If a commit fails, it causes the long-running operation to return an error response and the entire commit operation is cancelled. When successful, the `Operation.response` field contains `CommitServicePerimetersResponse`. The `dry_run` and the `spec` fields are cleared after a successful commit operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CommitServicePerimetersRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name for the parent Access Policy which owns all Service Perimeters in scope for the commit operation. Format: `accessPolicies/{policy_id}` |

### `accesscontextmanager.accessPolicies.servicePerimeters.create`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+parent}/servicePerimeters`
- Creates a service perimeter. The long-running operation from this RPC has a successful status after the service perimeter propagates to long-lasting storage. If a service perimeter contains errors, an error response is returned for the first error encountered.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServicePerimeter`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name for the access policy which owns this Service Perimeter. Format: `accessPolicies/{policy_id}` |

### `accesscontextmanager.accessPolicies.servicePerimeters.delete`

- Versions: v1
- `DELETE https://accesscontextmanager.googleapis.com/v1/{+name}`
- Deletes a service perimeter based on the resource name. The long-running operation from this RPC has a successful status after the service perimeter is removed from long-lasting storage.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name for the Service Perimeter. Format: `accessPolicies/{policy_id}/servicePerimeters/{service_perimeter_id}` |

### `accesscontextmanager.accessPolicies.servicePerimeters.get`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+name}`
- Gets a service perimeter based on the resource name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ServicePerimeter`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name for the Service Perimeter. Format: `accessPolicies/{policy_id}/servicePerimeters/{service_perimeter_id}` |
| `deletedPrincipalSyntax` | query | string enum | no | Optional. If true, the response will contain the deleted principal syntax for identities that support it. Values: `DELETED_PRINCIPAL_SYNTAX_SUPPORT_UNSPECIFIED`, `DELETED_PRINCIPAL_SYNTAX_SUPPORT_DISABLED`, `DELETED_PRINCIPAL_SYNTAX_SUPPORT_ENABLED`. |

### `accesscontextmanager.accessPolicies.servicePerimeters.list`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+parent}/servicePerimeters`
- Lists all service perimeters for an access policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServicePerimetersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name for the access policy to list Service Perimeters from. Format: `accessPolicies/{policy_id}` |
| `deletedPrincipalSyntax` | query | string enum | no | Optional. If true, the response will contain the deleted principal syntax for identities that support it. Values: `DELETED_PRINCIPAL_SYNTAX_SUPPORT_UNSPECIFIED`, `DELETED_PRINCIPAL_SYNTAX_SUPPORT_DISABLED`, `DELETED_PRINCIPAL_SYNTAX_SUPPORT_ENABLED`. |
| `pageSize` | query | integer (int32) | no | Number of Service Perimeters to include in the list. Default 100. |
| `pageToken` | query | string | no | Next page token for the next batch of Service Perimeter instances. Defaults to the first page of results. |

### `accesscontextmanager.accessPolicies.servicePerimeters.patch`

- Versions: v1
- `PATCH https://accesscontextmanager.googleapis.com/v1/{+name}`
- Updates a service perimeter. The long-running operation from this RPC has a successful status after the service perimeter propagates to long-lasting storage. If a service perimeter contains errors, an error response is returned for the first error encountered.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServicePerimeter`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name for the `ServicePerimeter`. Format: `accessPolicies/{access_policy}/servicePerimeters/{service_perimeter}`. The `service_perimeter` component must begin with a letter, followed by alphanumeric characters or `_`. After you create a `ServicePerimeter`, you cannot change its `name`. |
| `deletedPrincipalSyntax` | query | string enum | no | Optional. If true, the response will contain the deleted principal syntax for identities that support it and the request can contain identities with deleted principal syntax. Values: `DELETED_PRINCIPAL_SYNTAX_SUPPORT_UNSPECIFIED`, `DELETED_PRINCIPAL_SYNTAX_SUPPORT_DISABLED`, `DELETED_PRINCIPAL_SYNTAX_SUPPORT_ENABLED`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask to control which fields get updated. Must be non-empty. |

### `accesscontextmanager.accessPolicies.servicePerimeters.replaceAll`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+parent}/servicePerimeters:replaceAll`
- Replaces all existing service perimeters in an access policy with the service perimeters provided. This is done atomically. The long-running operation from this RPC has a successful status after all replacements propagate to long-lasting storage. Replacements containing errors result in an error response for the first error encountered. Upon an error, replacements are cancelled and existing service perimeters are not affected. The `Operation.response` field contains `ReplaceServicePerimetersResponse`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReplaceServicePerimetersRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name for the access policy which owns these Service Perimeters. Format: `accessPolicies/{policy_id}` |

### `accesscontextmanager.accessPolicies.servicePerimeters.testIamPermissions`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns the IAM permissions that the caller has on the specified Access Context Manager resource. The resource can be an AccessPolicy, AccessLevel, or ServicePerimeter. This method does not support other resources. \*\*IAM Permissions\*\*: No specific IAM permission is required to call this method. It returns the subset of the requested permissions that the caller possesses.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `accesscontextmanager.accessPolicies.setIamPolicy`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM policy for the specified Access Context Manager access policy. This method replaces the existing IAM policy on the access policy. The IAM policy controls the set of users who can perform specific operations on the Access Context Manager access policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `accesscontextmanager.accessPolicies.testIamPermissions`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns the IAM permissions that the caller has on the specified Access Context Manager resource. The resource can be an AccessPolicy, AccessLevel, or ServicePerimeter. This method does not support other resources. \*\*IAM Permissions\*\*: No specific IAM permission is required to call this method. It returns the subset of the requested permissions that the caller possesses.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `accesscontextmanager.folders.lookupConfiguredServicePerimeter`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+resource}:lookupConfiguredServicePerimeter`
- Looks up the configured service perimeter for a given resource. Format: `['projects/{projectNumber}', 'folders/{folderNumber}']`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LookupConfiguredServicePerimeterResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Required. The resource to resolve (for example, `projects/123` or `folders/456`). |

### `accesscontextmanager.operations.cancel`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `accesscontextmanager.operations.delete`

- Versions: v1
- `DELETE https://accesscontextmanager.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `accesscontextmanager.operations.get`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `accesscontextmanager.operations.list`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+name}`
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

### `accesscontextmanager.organizations.gcpUserAccessBindings.create`

- Versions: v1
- `POST https://accesscontextmanager.googleapis.com/v1/{+parent}/gcpUserAccessBindings`
- Creates a GcpUserAccessBinding. If the client specifies a name, the server ignores it. Fails if a resource already exists with the same group_key. Completion of this long-running operation does not necessarily signify that the new binding is deployed onto all affected users, which may take more time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GcpUserAccessBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Example: "organizations/256" |

### `accesscontextmanager.organizations.gcpUserAccessBindings.delete`

- Versions: v1
- `DELETE https://accesscontextmanager.googleapis.com/v1/{+name}`
- Deletes a GcpUserAccessBinding. Completion of this long-running operation does not necessarily signify that the binding deletion is deployed onto all affected users, which may take more time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Example: "organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N" |

### `accesscontextmanager.organizations.gcpUserAccessBindings.get`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+name}`
- Gets the GcpUserAccessBinding with the given name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GcpUserAccessBinding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Example: "organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N" |

### `accesscontextmanager.organizations.gcpUserAccessBindings.list`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+parent}/gcpUserAccessBindings`
- Lists all GcpUserAccessBindings for a Google Cloud organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGcpUserAccessBindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Example: "organizations/256" |
| `filter` | query | string | no | Optional. Filters the results by principal type. Uses the AIP-160 (https://google.aip.dev/160) filter syntax. Only the following filters are supported: \* `principal:group_key`: bindings for groups. This is the default when the filter is empty. \* `principal:service_account OR principal:service_account_project_number`: bindings for service accounts. \* `principal:federated_principal`: bindings for federated principals. Values can be in snake_case or camelCase. Whitespace and the order of `OR` terms don't matter. Any other filter returns an `INVALID_ARGUMENT` error. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return. The server may return fewer items. If left blank, the server may return any number of items. |
| `pageToken` | query | string | no | Optional. If left blank, returns the first page. To enumerate all items, use the next_page_token from your previous list operation. |

### `accesscontextmanager.organizations.gcpUserAccessBindings.patch`

- Versions: v1
- `PATCH https://accesscontextmanager.googleapis.com/v1/{+name}`
- Updates a GcpUserAccessBinding. Completion of this long-running operation does not necessarily signify that the changed binding is deployed onto all affected users, which may take more time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GcpUserAccessBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Assigned by the server during creation. The last segment has an arbitrary length and has only URI unreserved characters (as defined by RFC 3986 Section 2.3 (https://tools.ietf.org/html/rfc3986#section-2.3)). Should not be specified by the client during creation. Example: `"organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N"` |
| `append` | query | boolean | no | Optional. This field controls whether or not certain repeated settings in the update request overwrite or append to existing settings on the binding. If true, then append. Otherwise overwrite. So far, only `scoped_access_settings` with `session_settings` supports appending. Global `access_levels`, `access_levels` in `scoped_access_settings`, `dry_run_access_levels`, and `session_settings` are not compatible with append functionality, and the request will return an error if `append=true` when these settings are in the `update_mask`. The request will also return an error if `append=true` when `"scoped_access_settings"` is not set in the `update_mask`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Only the fields specified in this mask are updated. Because `name` and `group_key` cannot be changed, `update_mask` is required and may only contain the following fields: `access_levels`, `dry_run_access_levels`, `session_settings`, `scoped_access_settings`. update_mask { paths: "access_levels" } |

### `accesscontextmanager.permissions.list`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/permissions`
- Lists all supported permissions in VPC Service Controls ingress and egress rules for Granular Controls.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSupportedPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. This flag specifies the maximum number of permissions to return per page. Default value is 100. |
| `pageToken` | query | string | no | Optional. Use this token to retrieve a specific page of results. Default is the first page. |

### `accesscontextmanager.projects.lookupConfiguredServicePerimeter`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/{+resource}:lookupConfiguredServicePerimeter`
- Looks up the configured service perimeter for a given resource. Format: `['projects/{projectNumber}', 'folders/{folderNumber}']`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LookupConfiguredServicePerimeterResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Required. The resource to resolve (for example, `projects/123` or `folders/456`). |

### `accesscontextmanager.services.get`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/services/{name}`
- Returns a VPC-SC supported service based on the service name. \*\*IAM Permissions\*\*: Requires the following IAM permissions to use this method: - `serviceusage.services.use` on the project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SupportedService`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the service to get information about. The names must be in the same format as used in defining a service perimeter, for example, `storage.googleapis.com`. |

### `accesscontextmanager.services.list`

- Versions: v1
- `GET https://accesscontextmanager.googleapis.com/v1/services`
- Lists all VPC-SC supported services. \*\*IAM Permissions\*\*: Requires the following IAM permissions to use this method: - `serviceusage.services.use` on the project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSupportedServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | This flag specifies the maximum number of services to return per page. Default value is 100. |
| `pageToken` | query | string | no | Use this token to retrieve a specific page of results. Default is the first page. |

### Example request skeleton

Generated from the Discovery entry of `accesscontextmanager.accessPolicies.accessLevels.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://accesscontextmanager.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `accesscontextmanager` (retrieved 2026-11-14). Resources on this page: accessPolicies, folders, operations, organizations, permissions, projects, services.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/accesscontextmanager/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://accesscontextmanager.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
