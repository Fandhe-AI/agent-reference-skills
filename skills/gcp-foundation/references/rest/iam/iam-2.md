---
source: https://iam.googleapis.com/$discovery/rest?version=v1
---

# Identity and Access Management (IAM) API REST API (iam) (part 2/2)

## Signature / Usage

Base URL: `https://iam.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `iam.projects.serviceAccounts.keys.list`

- Versions: v1
- `GET https://iam.googleapis.com/v1/{+name}/keys`
- Lists every ServiceAccountKey for a service account.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServiceAccountKeysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the service account. Use one of the following formats: \* `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: \* `projects/-/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. |
| `keyTypes` | query | repeated string enum | no | Filters the types of keys the user wants to include in the list response. Duplicate key types are not allowed. If no key type is provided, all keys are returned. |

### `iam.projects.serviceAccounts.keys.upload`

- Versions: v1
- `POST https://iam.googleapis.com/v1/{+name}/keys:upload`
- Uploads the public key portion of a key pair that you manage, and associates the public key with a ServiceAccount. After you upload the public key, you can use the private key from the key pair as a service account key.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UploadServiceAccountKeyRequest`; Response: `ServiceAccountKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the service account key. Use one of the following formats: \* `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: \* `projects/-/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. |

### `iam.projects.serviceAccounts.list`

- Versions: v1
- `GET https://iam.googleapis.com/v1/{+name}/serviceAccounts`
- Lists every ServiceAccount that belongs to a specific project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServiceAccountsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the project associated with the service accounts, such as `projects/my-project-123`. |
| `pageSize` | query | integer (int32) | no | Optional limit on the number of service accounts to include in the response. Further accounts can subsequently be obtained by including the ListServiceAccountsResponse.next_page_token in a subsequent request. The default is 20, and the maximum is 100. |
| `pageToken` | query | string | no | Optional pagination token returned in an earlier ListServiceAccountsResponse.next_page_token. |

### `iam.projects.serviceAccounts.patch`

- Versions: v1
- `PATCH https://iam.googleapis.com/v1/{+name}`
- Patches a ServiceAccount.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PatchServiceAccountRequest`; Response: `ServiceAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the service account. Use one of the following formats: \* `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: \* `projects/-/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. |

### `iam.projects.serviceAccounts.setIamPolicy`

- Versions: v1
- `POST https://iam.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM policy that is attached to a ServiceAccount. Use this method to grant or revoke access to the service account. For example, you could grant a principal the ability to impersonate the service account. This method does not enable the service account to access other resources. To grant roles to a service account on a resource, follow these steps: 1. Call the resource's `getIamPolicy` method to get its current IAM policy. 2. Edit the policy so that it binds the service account to an IAM role for the resource. 3. Call the resource's `setIamPolicy` method to update its IAM policy. For detailed instructions, see Manage access to project, folders, and organizations (https://cloud.google.com/iam/help/service-accounts/granting-access-to-service-accounts) or Manage access to other resources (https://cloud.google.com/iam/help/access/manage-other-resources).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `iam.projects.serviceAccounts.signBlob`

- Versions: v1
- `POST https://iam.googleapis.com/v1/{+name}:signBlob`
- Signs a blob using the system-managed private key for a ServiceAccount.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SignBlobRequest`; Response: `SignBlobResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Deprecated. Migrate to Service Account Credentials API (https://cloud.google.com/iam/help/credentials/migrate-api). The resource name of the service account. Use one of the following formats: \* `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: \* `projects/-/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. |

### `iam.projects.serviceAccounts.signJwt`

- Versions: v1
- `POST https://iam.googleapis.com/v1/{+name}:signJwt`
- Signs a JSON Web Token (JWT) using the system-managed private key for a ServiceAccount.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SignJwtRequest`; Response: `SignJwtResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Deprecated. Migrate to Service Account Credentials API (https://cloud.google.com/iam/help/credentials/migrate-api). The resource name of the service account. Use one of the following formats: \* `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: \* `projects/-/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. |

### `iam.projects.serviceAccounts.testIamPermissions`

- Versions: v1
- `POST https://iam.googleapis.com/v1/{+resource}:testIamPermissions`
- Tests whether the caller has the specified permissions on a ServiceAccount.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `iam.projects.serviceAccounts.undelete`

- Versions: v1
- `POST https://iam.googleapis.com/v1/{+name}:undelete`
- Restores a deleted ServiceAccount. \*\*Important:\*\* It is not always possible to restore a deleted service account. Use this method only as a last resort. After you delete a service account, IAM permanently removes the service account 30 days later. There is no way to restore a deleted service account that has been permanently removed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UndeleteServiceAccountRequest`; Response: `UndeleteServiceAccountResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the service account. Use one of the following formats: \* `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: \* `projects/-/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. |

### `iam.projects.serviceAccounts.update`

- Versions: v1
- `PUT https://iam.googleapis.com/v1/{+name}`
- \*\*Note:\*\* We are in the process of deprecating this method. Use PatchServiceAccount instead. Updates a ServiceAccount. You can update only the `display_name` field.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServiceAccount`; Response: `ServiceAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the service account. Use one of the following formats: \* `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: \* `projects/-/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. |

### `iam.roles.get`

- Versions: v1
- `GET https://iam.googleapis.com/v1/{+name}`
- Gets the definition of a Role.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Role`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The `name` parameter's value depends on the target resource for the request, namely roles (https://cloud.google.com/iam/docs/reference/rest/v1/roles), projects (https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles), or organizations (https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below: \* roles.get (https://cloud.google.com/iam/docs/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`. This method returns results from all predefined roles (https://cloud.google.com/iam/docs/understanding-roles#predefined_roles) in IAM. Example request URL: `https://iam.googleapis.com/v1/roles/{ROLE_NAME}` \* projects.roles.get (https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/get): `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only custom roles (https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the project level. Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}` \* organizations.roles.get (https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/get): `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only custom roles (https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the organization level. Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}` Note: Wildcard (\*) values are invalid; you must specify a complete project ID or organization ID. |

### `iam.roles.list`

- Versions: v1
- `GET https://iam.googleapis.com/v1/roles`
- Lists every predefined Role that IAM supports, or every custom role that is defined for an organization or project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRolesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional limit on the number of roles to include in the response. The default is 300, and the maximum is 1,000. |
| `pageToken` | query | string | no | Optional pagination token returned in an earlier ListRolesResponse. |
| `parent` | query | string | no | The `parent` parameter's value depends on the target resource for the request, namely roles (https://cloud.google.com/iam/docs/reference/rest/v1/roles), projects (https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles), or organizations (https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below: \* roles.list (https://cloud.google.com/iam/docs/reference/rest/v1/roles/list): An empty string. This method doesn't require a resource; it simply returns all predefined roles (https://cloud.google.com/iam/docs/understanding-roles#predefined_roles) in IAM. Example request URL: `https://iam.googleapis.com/v1/roles` \* projects.roles.list (https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/list): `projects/{PROJECT_ID}`. This method lists all project-level custom roles (https://cloud.google.com/iam/docs/understanding-custom-roles). Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles` \* organizations.roles.list (https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/list): `organizations/{ORGANIZATION_ID}`. This method lists all organization-level custom roles (https://cloud.google.com/iam/docs/understanding-custom-roles). Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles` Note: Wildcard (\*) values are invalid; you must specify a complete project ID or organization ID. |
| `showDeleted` | query | boolean | no | Include Roles that have been deleted. |
| `view` | query | string enum | no | Optional view for the returned Role objects. When `FULL` is specified, the `includedPermissions` field is returned, which includes a list of all permissions in the role. The default value is `BASIC`, which does not return the `includedPermissions` field. |

### `iam.roles.queryGrantableRoles`

- Versions: v1
- `POST https://iam.googleapis.com/v1/roles:queryGrantableRoles`
- Lists roles that can be granted on a Google Cloud resource. A role is grantable if the IAM policy for the resource can contain bindings to the role.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `QueryGrantableRolesRequest`; Response: `QueryGrantableRolesResponse`

### Example request skeleton

Generated from the Discovery entry of `iam.projects.locations.oauthClients.credentials.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://iam.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `iam` (retrieved 2026-11-14). Resources on this page: projects, roles.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives).
- Message schemas are listed under `references/rest-schemas/iam/`.
- Source: https://iam.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
