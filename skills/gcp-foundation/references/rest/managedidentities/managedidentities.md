---
source: https://managedidentities.googleapis.com/$discovery/rest?version=v1
---

# Managed Service for Microsoft Active Directory API REST API (managedidentities)

## Signature / Usage

Base URL: `https://managedidentities.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `managedidentities.projects.locations.get`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `managedidentities.projects.locations.global.domains.attachTrust`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+name}:attachTrust`
- Adds an AD trust to a domain.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AttachTrustRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource domain name, project name and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |

### `managedidentities.projects.locations.global.domains.backups.create`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+parent}/backups`
- Creates a Backup for a domain.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |
| `backupId` | query | string | yes | Required. Backup Id, unique name to identify the backups with the following restrictions: \* Must be lowercase letters, numbers, and hyphens \* Must start with a letter. \* Must contain between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the domain. |

### `managedidentities.projects.locations.global.domains.backups.delete`

- Versions: v1, v1beta1, v1alpha1
- `DELETE https://managedidentities.googleapis.com/v1/{+name}`
- Deletes identified Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The backup resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}/backups/{backup_id}` |

### `managedidentities.projects.locations.global.domains.backups.get`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+name}`
- Gets details of a single Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Backup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The backup resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}/backups/{backup_id}` |

### `managedidentities.projects.locations.global.domains.backups.getIamPolicy`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `managedidentities.projects.locations.global.domains.backups.list`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+parent}/backups`
- Lists Backup in a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |
| `filter` | query | string | no | Optional. Filter specifying constraints of a list operation. |
| `orderBy` | query | string | no | Optional. Specifies the ordering of results following syntax at https://cloud.google.com/apis/design/design_patterns#sorting_order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The `next_page_token` value returned from a previous List request, if any. |

### `managedidentities.projects.locations.global.domains.backups.patch`

- Versions: v1, v1beta1, v1alpha1
- `PATCH https://managedidentities.googleapis.com/v1/{+name}`
- Updates the labels for specified Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The unique name of the Backup in the form of `projects/{project_id}/locations/global/domains/{domain_name}/backups/{name}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields from Backup: \* `labels` |

### `managedidentities.projects.locations.global.domains.backups.setIamPolicy`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `managedidentities.projects.locations.global.domains.backups.testIamPermissions`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `managedidentities.projects.locations.global.domains.checkMigrationPermission`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+domain}:checkMigrationPermission`
- CheckMigrationPermission API gets the current state of DomainMigration
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CheckMigrationPermissionRequest`; Response: `CheckMigrationPermissionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `domain` | path | string | yes | Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |

### `managedidentities.projects.locations.global.domains.create`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+parent}/domains`
- Creates a Microsoft AD domain.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Domain`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource project name and location using the form: `projects/{project_id}/locations/global` |
| `domainName` | query | string | yes | Required. The fully qualified domain name. e.g. mydomain.myorganization.com, with the following restrictions: \* Must contain only lowercase letters, numbers, periods and hyphens. \* Must start with a letter. \* Must contain between 2-64 characters. \* Must end with a number or a letter. \* Must not start with period. \* First segment length (mydomain for example above) shouldn't exceed 15 chars. \* The last segment cannot be fully numeric. \* Must be unique within the customer project. |

### `managedidentities.projects.locations.global.domains.delete`

- Versions: v1, v1beta1, v1alpha1
- `DELETE https://managedidentities.googleapis.com/v1/{+name}`
- Deletes a domain.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |

### `managedidentities.projects.locations.global.domains.detachTrust`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+name}:detachTrust`
- Removes an AD trust.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DetachTrustRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource domain name, project name, and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |

### `managedidentities.projects.locations.global.domains.disableMigration`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+domain}:disableMigration`
- Disable Domain Migration
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DisableMigrationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `domain` | path | string | yes | Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |

### `managedidentities.projects.locations.global.domains.domainJoinMachine`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+domain}:domainJoinMachine`
- DomainJoinMachine API joins a Compute Engine VM to the domain
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DomainJoinMachineRequest`; Response: `DomainJoinMachineResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `domain` | path | string | yes | Required. The domain resource name using the form: projects/{project_id}/locations/global/domains/{domain_name} |

### `managedidentities.projects.locations.global.domains.enableMigration`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+domain}:enableMigration`
- Enable Domain Migration
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnableMigrationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `domain` | path | string | yes | Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |

### `managedidentities.projects.locations.global.domains.extendSchema`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+domain}:extendSchema`
- Extend Schema for Domain
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExtendSchemaRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `domain` | path | string | yes | Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |

### `managedidentities.projects.locations.global.domains.get`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+name}`
- Gets information about a domain.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Domain`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |

### `managedidentities.projects.locations.global.domains.getIamPolicy`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `managedidentities.projects.locations.global.domains.getLdapssettings`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+name}/ldapssettings`
- Gets the domain ldaps settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LDAPSSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |

### `managedidentities.projects.locations.global.domains.list`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+parent}/domains`
- Lists domains in a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDomainsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the domain location using the form: `projects/{project_id}/locations/global` |
| `filter` | query | string | no | Optional. A filter specifying constraints of a list operation. For example, `Domain.fqdn="mydomain.myorginization"`. |
| `orderBy` | query | string | no | Optional. Specifies the ordering of results. See Sorting order (https://cloud.google.com/apis/design/design_patterns#sorting_order) for more information. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 1000 will be used. Regardless of the page_size value, the response may include a partial list. Callers should rely on a response's next_page_token to determine if there are additional results to list. |
| `pageToken` | query | string | no | Optional. The `next_page_token` value returned from a previous ListDomainsRequest request, if any. |

### `managedidentities.projects.locations.global.domains.patch`

- Versions: v1, v1beta1, v1alpha1
- `PATCH https://managedidentities.googleapis.com/v1/{+name}`
- Updates the metadata and configuration of a domain.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Domain`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the domain using the form: `projects/{project_id}/locations/global/domains/{domain_name}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include fields from Domain: \* `labels` \* `locations` \* `authorized_networks` \* `audit_logs_enabled` |

### `managedidentities.projects.locations.global.domains.reconfigureTrust`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+name}:reconfigureTrust`
- Updates the DNS conditional forwarder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReconfigureTrustRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource domain name, project name and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |

### `managedidentities.projects.locations.global.domains.resetAdminPassword`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+name}:resetAdminPassword`
- Resets a domain's administrator password.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResetAdminPasswordRequest`; Response: `ResetAdminPasswordResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |

### `managedidentities.projects.locations.global.domains.restore`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+name}:restore`
- RestoreDomain restores domain backup mentioned in the RestoreDomainRequest
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreDomainRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name for the domain to which the backup belongs |

### `managedidentities.projects.locations.global.domains.setIamPolicy`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `managedidentities.projects.locations.global.domains.sqlIntegrations.get`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+name}`
- Gets details of a single sqlIntegration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SqlIntegration`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. SQLIntegration resource name using the form: `projects/{project_id}/locations/global/domains/{domain}/sqlIntegrations/{name}` |

### `managedidentities.projects.locations.global.domains.sqlIntegrations.list`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+parent}/sqlIntegrations`
- Lists SqlIntegrations in a given domain.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSqlIntegrationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the SqlIntegrations using the form: `projects/{project_id}/locations/global/domains/*` |
| `filter` | query | string | no | Optional. Filter specifying constraints of a list operation. For example, `SqlIntegration.name="sql"`. |
| `orderBy` | query | string | no | Optional. Specifies the ordering of results following syntax at https://cloud.google.com/apis/design/design_patterns#sorting_order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response'ANIZATIONs next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous List request, if any. |

### `managedidentities.projects.locations.global.domains.testIamPermissions`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `managedidentities.projects.locations.global.domains.updateLdapssettings`

- Versions: v1, v1beta1, v1alpha1
- `PATCH https://managedidentities.googleapis.com/v1/{+name}/ldapssettings`
- Patches a single ldaps settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LDAPSSettings`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the LDAPS settings. Uses the form: `projects/{project}/locations/{location}/domains/{domain}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask |

### `managedidentities.projects.locations.global.domains.validateTrust`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+name}:validateTrust`
- Validates a trust state, that the target domain is reachable, and that the target domain is able to accept incoming trust requests.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ValidateTrustRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource domain name, project name, and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}` |

### `managedidentities.projects.locations.global.operations.cancel`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `managedidentities.projects.locations.global.operations.delete`

- Versions: v1, v1beta1, v1alpha1
- `DELETE https://managedidentities.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `managedidentities.projects.locations.global.operations.get`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `managedidentities.projects.locations.global.operations.list`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+name}`
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

### `managedidentities.projects.locations.global.peerings.create`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+parent}/peerings`
- Creates a Peering for Managed AD instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Peering`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource project name and location using the form: `projects/{project_id}/locations/global` |
| `peeringId` | query | string | yes | Required. Peering Id, unique name to identify peering. It should follow the regex format "^(?:\[a-z\](?:\[-a-z0-9\]{0,61}\[a-z0-9\])?)$" |

### `managedidentities.projects.locations.global.peerings.delete`

- Versions: v1, v1beta1, v1alpha1
- `DELETE https://managedidentities.googleapis.com/v1/{+name}`
- Deletes identified Peering.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Peering resource name using the form: `projects/{project_id}/locations/global/peerings/{peering_id}` |

### `managedidentities.projects.locations.global.peerings.get`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+name}`
- Gets details of a single Peering.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Peering`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Peering resource name using the form: `projects/{project_id}/locations/global/peerings/{peering_id}` |

### `managedidentities.projects.locations.global.peerings.getIamPolicy`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `managedidentities.projects.locations.global.peerings.list`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+parent}/peerings`
- Lists Peerings in a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPeeringsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the peering location using the form: `projects/{project_id}/locations/global` |
| `filter` | query | string | no | Optional. Filter specifying constraints of a list operation. For example, `peering.authorized_network="projects/myprojectid/global/networks/mynetwork"`. |
| `orderBy` | query | string | no | Optional. Specifies the ordering of results following syntax at https://cloud.google.com/apis/design/design_patterns#sorting_order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous List request, if any. |

### `managedidentities.projects.locations.global.peerings.patch`

- Versions: v1, v1beta1, v1alpha1
- `PATCH https://managedidentities.googleapis.com/v1/{+name}`
- Updates the labels for specified Peering.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Peering`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Unique name of the peering in this scope including projects and location using the form: `projects/{project_id}/locations/global/peerings/{peering_id}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields from Peering: \* `labels` |

### `managedidentities.projects.locations.global.peerings.setIamPolicy`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `managedidentities.projects.locations.global.peerings.testIamPermissions`

- Versions: v1, v1beta1, v1alpha1
- `POST https://managedidentities.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `managedidentities.projects.locations.list`

- Versions: v1, v1beta1, v1alpha1
- `GET https://managedidentities.googleapis.com/v1/{+name}/locations`
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

### Example request skeleton

Generated from the Discovery entry of `managedidentities.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://managedidentities.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1, v1alpha1 of `managedidentities` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are always `yes`.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/managedidentities/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://managedidentities.googleapis.com/$discovery/rest?version=v1, https://managedidentities.googleapis.com/$discovery/rest?version=v1beta1, https://managedidentities.googleapis.com/$discovery/rest?version=v1alpha1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
