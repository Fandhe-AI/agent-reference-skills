---
source: https://secretmanager.googleapis.com/$discovery/rest?version=v1
---

# Secret Manager API REST API (secretmanager)

## Signature / Usage

Base URL: `https://secretmanager.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `secretmanager.projects.locations.get`

- Versions: v1, v1beta2, v1beta1
- `GET https://secretmanager.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `secretmanager.projects.locations.list`

- Versions: v1, v1beta2, v1beta1
- `GET https://secretmanager.googleapis.com/v1/{+name}/locations`
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

### `secretmanager.projects.locations.secrets.addVersion`

- Versions: v1, v1beta2
- `POST https://secretmanager.googleapis.com/v1/{+parent}:addVersion`
- Creates a new SecretVersion containing secret data and attaches it to an existing Secret.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddSecretVersionRequest`; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the Secret to associate with the SecretVersion in the format `projects/*/secrets/*` or `projects/*/locations/*/secrets/*`. |

### `secretmanager.projects.locations.secrets.create`

- Versions: v1, v1beta2
- `POST https://secretmanager.googleapis.com/v1/{+parent}/secrets`
- Creates a new Secret containing no SecretVersions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Secret`; Response: `Secret`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the project to associate with the Secret, in the format `projects/*` or `projects/*/locations/*`. |
| `secretId` | query | string | yes | Required. This must be unique within the project. A secret ID is a string with a maximum length of 255 characters and can contain uppercase and lowercase letters, numerals, and the hyphen (`-`) and underscore (`_`) characters. |

### `secretmanager.projects.locations.secrets.delete`

- Versions: v1, v1beta2
- `DELETE https://secretmanager.googleapis.com/v1/{+name}`
- Deletes a Secret.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Secret to delete in the format `projects/*/secrets/*`. |
| `etag` | query | string | no | Optional. Etag of the Secret. The request succeeds if it matches the etag of the currently stored secret object. If the etag is omitted, the request succeeds. |

### `secretmanager.projects.locations.secrets.enableManagedRotation`

- Versions: v1
- `POST https://secretmanager.googleapis.com/v1/{+parent}:enableManagedRotation`
- Enables the managed rotation feature for a Secret. This method can only be triggered once for a secret. In order to do further rotations, RotateSecret should be used. This method will add a secret version and update the password in Cloud SQL.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnableManagedRotationRequest`; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the Secret to associate with the SecretVersion in the format `projects/*/secrets/*` or `projects/*/locations/*/secrets/*`. |

### `secretmanager.projects.locations.secrets.get`

- Versions: v1, v1beta2
- `GET https://secretmanager.googleapis.com/v1/{+name}`
- Gets metadata for a given Secret.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Secret`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Secret, in the format `projects/*/secrets/*` or `projects/*/locations/*/secrets/*`. |

### `secretmanager.projects.locations.secrets.getIamPolicy`

- Versions: v1, v1beta2
- `GET https://secretmanager.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a secret. Returns empty policy if the secret exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `secretmanager.projects.locations.secrets.list`

- Versions: v1, v1beta2
- `GET https://secretmanager.googleapis.com/v1/{+parent}/secrets`
- Lists Secrets.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSecretsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the project associated with the Secrets, in the format `projects/*` or `projects/*/locations/*` |
| `filter` | query | string | no | Optional. Filter string, adhering to the rules in List-operation filtering (https://cloud.google.com/secret-manager/docs/filtering). List only secrets matching the filter. If filter is empty, all secrets are listed. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000. |
| `pageToken` | query | string | no | Optional. Pagination token, returned earlier via ListSecretsResponse.next_page_token. |

### `secretmanager.projects.locations.secrets.patch`

- Versions: v1, v1beta2
- `PATCH https://secretmanager.googleapis.com/v1/{+name}`
- Updates metadata of an existing Secret.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Secret`; Response: `Secret`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the Secret in the format `projects/*/secrets/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Specifies the fields to be updated. |

### `secretmanager.projects.locations.secrets.rotateSecret`

- Versions: v1
- `POST https://secretmanager.googleapis.com/v1/{+parent}:rotateSecret`
- Do a managed rotation for a Secret. This can only be triggered after Managed rotation has been enabled. This method will add a secret version and update the password in Cloud SQL.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RotateSecretRequest`; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the Secret to associate with the SecretVersion in the format `projects/*/secrets/*` or `projects/*/locations/*/secrets/*`. |

### `secretmanager.projects.locations.secrets.setIamPolicy`

- Versions: v1, v1beta2
- `POST https://secretmanager.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified secret. Replaces any existing policy. Permissions on SecretVersions are enforced according to the policy set on the associated Secret.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `secretmanager.projects.locations.secrets.testIamPermissions`

- Versions: v1, v1beta2
- `POST https://secretmanager.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has for the specified secret. If the secret does not exist, this call returns an empty set of permissions, not a NOT_FOUND error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `secretmanager.projects.locations.secrets.versions.access`

- Versions: v1, v1beta2
- `GET https://secretmanager.googleapis.com/v1/{+name}:access`
- Accesses a SecretVersion. This call returns the secret data. `projects/*/secrets/*/versions/latest` is an alias to the most recently created SecretVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AccessSecretVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the SecretVersion in the format `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*`. `projects/*/secrets/*/versions/latest` or `projects/*/locations/*/secrets/*/versions/latest` is an alias to the most recently created SecretVersion. |

### `secretmanager.projects.locations.secrets.versions.destroy`

- Versions: v1, v1beta2
- `POST https://secretmanager.googleapis.com/v1/{+name}:destroy`
- Destroys a SecretVersion. Sets the state of the SecretVersion to DESTROYED and irrevocably destroys the secret data.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DestroySecretVersionRequest`; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the SecretVersion to destroy in the format `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*`. |

### `secretmanager.projects.locations.secrets.versions.disable`

- Versions: v1, v1beta2
- `POST https://secretmanager.googleapis.com/v1/{+name}:disable`
- Disables a SecretVersion. Sets the state of the SecretVersion to DISABLED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DisableSecretVersionRequest`; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the SecretVersion to disable in the format `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*`. |

### `secretmanager.projects.locations.secrets.versions.enable`

- Versions: v1, v1beta2
- `POST https://secretmanager.googleapis.com/v1/{+name}:enable`
- Enables a SecretVersion. Sets the state of the SecretVersion to ENABLED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnableSecretVersionRequest`; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the SecretVersion to enable in the format `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*`. |

### `secretmanager.projects.locations.secrets.versions.get`

- Versions: v1, v1beta2
- `GET https://secretmanager.googleapis.com/v1/{+name}`
- Gets metadata for a SecretVersion. `projects/*/secrets/*/versions/latest` is an alias to the most recently created SecretVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the SecretVersion in the format `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*`. `projects/*/secrets/*/versions/latest` or `projects/*/locations/*/secrets/*/versions/latest` is an alias to the most recently created SecretVersion. |

### `secretmanager.projects.locations.secrets.versions.list`

- Versions: v1, v1beta2
- `GET https://secretmanager.googleapis.com/v1/{+parent}/versions`
- Lists SecretVersions. This call does not return secret data.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSecretVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the Secret associated with the SecretVersions to list, in the format `projects/*/secrets/*` or `projects/*/locations/*/secrets/*`. |
| `filter` | query | string | no | Optional. Filter string, adhering to the rules in List-operation filtering (https://cloud.google.com/secret-manager/docs/filtering). List only secret versions matching the filter. If filter is empty, all secret versions are listed. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000. |
| `pageToken` | query | string | no | Optional. Pagination token, returned earlier via ListSecretVersionsResponse.next_page_token\]\[\]. |

### `secretmanager.projects.secrets.addVersion`

- Versions: v1, v1beta2, v1beta1
- `POST https://secretmanager.googleapis.com/v1/{+parent}:addVersion`
- Creates a new SecretVersion containing secret data and attaches it to an existing Secret.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddSecretVersionRequest`; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the Secret to associate with the SecretVersion in the format `projects/*/secrets/*` or `projects/*/locations/*/secrets/*`. |

### `secretmanager.projects.secrets.create`

- Versions: v1, v1beta2, v1beta1
- `POST https://secretmanager.googleapis.com/v1/{+parent}/secrets`
- Creates a new Secret containing no SecretVersions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Secret`; Response: `Secret`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the project to associate with the Secret, in the format `projects/*` or `projects/*/locations/*`. |
| `secretId` | query | string | yes | Required. This must be unique within the project. A secret ID is a string with a maximum length of 255 characters and can contain uppercase and lowercase letters, numerals, and the hyphen (`-`) and underscore (`_`) characters. |

### `secretmanager.projects.secrets.delete`

- Versions: v1, v1beta2, v1beta1
- `DELETE https://secretmanager.googleapis.com/v1/{+name}`
- Deletes a Secret.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Secret to delete in the format `projects/*/secrets/*`. |
| `etag` | query | string | no | Optional. Etag of the Secret. The request succeeds if it matches the etag of the currently stored secret object. If the etag is omitted, the request succeeds. |

### `secretmanager.projects.secrets.enableManagedRotation`

- Versions: v1
- `POST https://secretmanager.googleapis.com/v1/{+parent}:enableManagedRotation`
- Enables the managed rotation feature for a Secret. This method can only be triggered once for a secret. In order to do further rotations, RotateSecret should be used. This method will add a secret version and update the password in Cloud SQL.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnableManagedRotationRequest`; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the Secret to associate with the SecretVersion in the format `projects/*/secrets/*` or `projects/*/locations/*/secrets/*`. |

### `secretmanager.projects.secrets.get`

- Versions: v1, v1beta2, v1beta1
- `GET https://secretmanager.googleapis.com/v1/{+name}`
- Gets metadata for a given Secret.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Secret`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Secret, in the format `projects/*/secrets/*` or `projects/*/locations/*/secrets/*`. |

### `secretmanager.projects.secrets.getIamPolicy`

- Versions: v1, v1beta2, v1beta1
- `GET https://secretmanager.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a secret. Returns empty policy if the secret exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `secretmanager.projects.secrets.list`

- Versions: v1, v1beta2, v1beta1
- `GET https://secretmanager.googleapis.com/v1/{+parent}/secrets`
- Lists Secrets.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSecretsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the project associated with the Secrets, in the format `projects/*` or `projects/*/locations/*` |
| `filter` | query | string | no | Optional. Filter string, adhering to the rules in List-operation filtering (https://cloud.google.com/secret-manager/docs/filtering). List only secrets matching the filter. If filter is empty, all secrets are listed. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000. |
| `pageToken` | query | string | no | Optional. Pagination token, returned earlier via ListSecretsResponse.next_page_token. |

### `secretmanager.projects.secrets.patch`

- Versions: v1, v1beta2, v1beta1
- `PATCH https://secretmanager.googleapis.com/v1/{+name}`
- Updates metadata of an existing Secret.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Secret`; Response: `Secret`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the Secret in the format `projects/*/secrets/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Specifies the fields to be updated. |

### `secretmanager.projects.secrets.rotateSecret`

- Versions: v1
- `POST https://secretmanager.googleapis.com/v1/{+parent}:rotateSecret`
- Do a managed rotation for a Secret. This can only be triggered after Managed rotation has been enabled. This method will add a secret version and update the password in Cloud SQL.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RotateSecretRequest`; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the Secret to associate with the SecretVersion in the format `projects/*/secrets/*` or `projects/*/locations/*/secrets/*`. |

### `secretmanager.projects.secrets.setIamPolicy`

- Versions: v1, v1beta2, v1beta1
- `POST https://secretmanager.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified secret. Replaces any existing policy. Permissions on SecretVersions are enforced according to the policy set on the associated Secret.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `secretmanager.projects.secrets.testIamPermissions`

- Versions: v1, v1beta2, v1beta1
- `POST https://secretmanager.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has for the specified secret. If the secret does not exist, this call returns an empty set of permissions, not a NOT_FOUND error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `secretmanager.projects.secrets.versions.access`

- Versions: v1, v1beta2, v1beta1
- `GET https://secretmanager.googleapis.com/v1/{+name}:access`
- Accesses a SecretVersion. This call returns the secret data. `projects/*/secrets/*/versions/latest` is an alias to the most recently created SecretVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AccessSecretVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the SecretVersion in the format `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*`. `projects/*/secrets/*/versions/latest` or `projects/*/locations/*/secrets/*/versions/latest` is an alias to the most recently created SecretVersion. |

### `secretmanager.projects.secrets.versions.destroy`

- Versions: v1, v1beta2, v1beta1
- `POST https://secretmanager.googleapis.com/v1/{+name}:destroy`
- Destroys a SecretVersion. Sets the state of the SecretVersion to DESTROYED and irrevocably destroys the secret data.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DestroySecretVersionRequest`; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the SecretVersion to destroy in the format `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*`. |

### `secretmanager.projects.secrets.versions.disable`

- Versions: v1, v1beta2, v1beta1
- `POST https://secretmanager.googleapis.com/v1/{+name}:disable`
- Disables a SecretVersion. Sets the state of the SecretVersion to DISABLED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DisableSecretVersionRequest`; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the SecretVersion to disable in the format `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*`. |

### `secretmanager.projects.secrets.versions.enable`

- Versions: v1, v1beta2, v1beta1
- `POST https://secretmanager.googleapis.com/v1/{+name}:enable`
- Enables a SecretVersion. Sets the state of the SecretVersion to ENABLED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnableSecretVersionRequest`; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the SecretVersion to enable in the format `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*`. |

### `secretmanager.projects.secrets.versions.get`

- Versions: v1, v1beta2, v1beta1
- `GET https://secretmanager.googleapis.com/v1/{+name}`
- Gets metadata for a SecretVersion. `projects/*/secrets/*/versions/latest` is an alias to the most recently created SecretVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SecretVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the SecretVersion in the format `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*`. `projects/*/secrets/*/versions/latest` or `projects/*/locations/*/secrets/*/versions/latest` is an alias to the most recently created SecretVersion. |

### `secretmanager.projects.secrets.versions.list`

- Versions: v1, v1beta2, v1beta1
- `GET https://secretmanager.googleapis.com/v1/{+parent}/versions`
- Lists SecretVersions. This call does not return secret data.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSecretVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the Secret associated with the SecretVersions to list, in the format `projects/*/secrets/*` or `projects/*/locations/*/secrets/*`. |
| `filter` | query | string | no | Optional. Filter string, adhering to the rules in List-operation filtering (https://cloud.google.com/secret-manager/docs/filtering). List only secret versions matching the filter. If filter is empty, all secret versions are listed. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000. |
| `pageToken` | query | string | no | Optional. Pagination token, returned earlier via ListSecretVersionsResponse.next_page_token\]\[\]. |

### Example request skeleton

Generated from the Discovery entry of `secretmanager.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://secretmanager.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2, v1beta1 of `secretmanager` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://secretmanager.googleapis.com/$discovery/rest?version=v1, https://secretmanager.googleapis.com/$discovery/rest?version=v1beta2, https://secretmanager.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
