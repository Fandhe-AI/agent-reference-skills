---
source: https://cloudkms.googleapis.com/$discovery/rest?version=v1
---

# Cloud Key Management Service (KMS) API REST API (cloudkms)

## Signature / Usage

Base URL: `https://cloudkms.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `cloudkms.folders.getAutokeyConfig`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Returns the AutokeyConfig for a folder or project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `AutokeyConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the AutokeyConfig resource, e.g. `folders/{FOLDER_NUMBER}/autokeyConfig`, `projects/{PROJECT_NUMBER}/autokeyConfig`, or `projects/{PROJECT_ID}/autokeyConfig`. |

### `cloudkms.folders.getKajPolicyConfig`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Gets the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `KeyAccessJustificationsPolicyConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Specifies the name of the KeyAccessJustificationsPolicyConfig to get. |

### `cloudkms.folders.showEffectiveAutokeyConfig`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+parent}:showEffectiveAutokeyConfig`
- Returns the effective Cloud KMS Autokey configuration for a given project or folder. Note on permissions: - If called on a project (`projects/{project}`), requires `cloudkms.projects.showEffectiveAutokeyConfig`. - If called on a folder (`folders/{folder}`), requires `cloudkms.folders.showEffectiveAutokeyConfig`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ShowEffectiveAutokeyConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the resource project or folder to show the effective Cloud KMS Autokey configuration for. This may be helpful for evaluating the effect of nested folder configurations on a given resource project. Format: \* projects/{project} \* folders/{folder} |

### `cloudkms.folders.updateAutokeyConfig`

- Versions: v1
- `PATCH https://cloudkms.googleapis.com/v1/{+name}`
- Updates the AutokeyConfig for a folder or a project. The caller must have both `cloudkms.autokeyConfigs.update` permission on the parent folder and `cloudkms.cryptoKeys.setIamPolicy` permission on the provided key project. A KeyHandle creation in the folder's descendant projects will use this configuration to determine where to create the resulting CryptoKey.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `AutokeyConfig`; Response: `AutokeyConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the AutokeyConfig resource, e.g. `folders/{FOLDER_NUMBER}/autokeyConfig`, `projects/{PROJECT_NUMBER}/autokeyConfig`, or `projects/{PROJECT_ID}/autokeyConfig`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Masks which fields of the AutokeyConfig to update, e.g. `keyProject`. |

### `cloudkms.folders.updateKajPolicyConfig`

- Versions: v1
- `PATCH https://cloudkms.googleapis.com/v1/{+name}`
- Updates the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `KeyAccessJustificationsPolicyConfig`; Response: `KeyAccessJustificationsPolicyConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Represents the resource name for this KeyAccessJustificationsPolicyConfig in the format of "{organizations\|folders\|projects}/\*/kajPolicyConfig". |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Specifies the list of fields to update. |

### `cloudkms.organizations.getKajPolicyConfig`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Gets the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `KeyAccessJustificationsPolicyConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Specifies the name of the KeyAccessJustificationsPolicyConfig to get. |

### `cloudkms.organizations.updateKajPolicyConfig`

- Versions: v1
- `PATCH https://cloudkms.googleapis.com/v1/{+name}`
- Updates the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `KeyAccessJustificationsPolicyConfig`; Response: `KeyAccessJustificationsPolicyConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Represents the resource name for this KeyAccessJustificationsPolicyConfig in the format of "{organizations\|folders\|projects}/\*/kajPolicyConfig". |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Specifies the list of fields to update. |

### `cloudkms.projects.getAutokeyConfig`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Returns the AutokeyConfig for a folder or project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `AutokeyConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the AutokeyConfig resource, e.g. `folders/{FOLDER_NUMBER}/autokeyConfig`, `projects/{PROJECT_NUMBER}/autokeyConfig`, or `projects/{PROJECT_ID}/autokeyConfig`. |

### `cloudkms.projects.getKajPolicyConfig`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Gets the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `KeyAccessJustificationsPolicyConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Specifies the name of the KeyAccessJustificationsPolicyConfig to get. |

### `cloudkms.projects.locations.ekmConfig.getIamPolicy`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `cloudkms.projects.locations.ekmConfig.setIamPolicy`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudkms.projects.locations.ekmConfig.testIamPermissions`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudkms.projects.locations.ekmConnections.create`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+parent}/ekmConnections`
- Creates a new EkmConnection in a given Project and Location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `EkmConnection`; Response: `EkmConnection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the location associated with the EkmConnection, in the format `projects/*/locations/*`. |
| `ekmConnectionId` | query | string | yes | Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`. |

### `cloudkms.projects.locations.ekmConnections.get`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Returns metadata for a given EkmConnection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `EkmConnection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the EkmConnection to get. |

### `cloudkms.projects.locations.ekmConnections.getIamPolicy`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `cloudkms.projects.locations.ekmConnections.list`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+parent}/ekmConnections`
- Lists EkmConnections.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ListEkmConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the location associated with the EkmConnections to list, in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Only include resources that match the filter in the response. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `orderBy` | query | string | no | Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `pageSize` | query | integer (int32) | no | Optional. Optional limit on the number of EkmConnections to include in the response. Further EkmConnections can subsequently be obtained by including the ListEkmConnectionsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Optional pagination token, returned earlier via ListEkmConnectionsResponse.next_page_token. |

### `cloudkms.projects.locations.ekmConnections.patch`

- Versions: v1
- `PATCH https://cloudkms.googleapis.com/v1/{+name}`
- Updates an EkmConnection's metadata.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `EkmConnection`; Response: `EkmConnection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name for the EkmConnection in the format `projects/*/locations/*/ekmConnections/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. List of fields to be updated in this request. |

### `cloudkms.projects.locations.ekmConnections.setIamPolicy`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudkms.projects.locations.ekmConnections.testIamPermissions`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudkms.projects.locations.ekmConnections.verifyConnectivity`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}:verifyConnectivity`
- Verifies that Cloud KMS can successfully connect to the external key manager specified by an EkmConnection. If there is an error connecting to the EKM, this method returns a FAILED_PRECONDITION status containing structured information as described at https://cloud.google.com/kms/docs/reference/ekm_errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `VerifyConnectivityResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the EkmConnection to verify. |

### `cloudkms.projects.locations.generateRandomBytes`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+location}:generateRandomBytes`
- Generate random bytes using the Cloud KMS randomness source in the provided location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `GenerateRandomBytesRequest`; Response: `GenerateRandomBytesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | The project-specific location in which to generate random bytes. For example, "projects/my-project/locations/us-central1". |

### `cloudkms.projects.locations.get`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `cloudkms.projects.locations.getEkmConfig`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Returns the EkmConfig singleton resource for a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `EkmConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the EkmConfig to get. |

### `cloudkms.projects.locations.keyHandles.create`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+parent}/keyHandles`
- Creates a new KeyHandle, triggering the provisioning of a new CryptoKey for CMEK use with the given resource type in the configured key project and the same location. GetOperation should be used to resolve the resulting long-running operation and get the resulting KeyHandle and CryptoKey.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `KeyHandle`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the resource project and location to create the KeyHandle in, e.g. `projects/{PROJECT_ID}/locations/{LOCATION}`. |
| `keyHandleId` | query | string | no | Optional. Id of the KeyHandle. Must be unique to the resource project and location. If not provided by the caller, a new UUID is used. |

### `cloudkms.projects.locations.keyHandles.get`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Returns the KeyHandle.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `KeyHandle`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the KeyHandle resource, e.g. `projects/{PROJECT_ID}/locations/{LOCATION}/keyHandles/{KEY_HANDLE_ID}`. |

### `cloudkms.projects.locations.keyHandles.list`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+parent}/keyHandles`
- Lists KeyHandles.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ListKeyHandlesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the resource project and location from which to list KeyHandles, e.g. `projects/{PROJECT_ID}/locations/{LOCATION}`. |
| `filter` | query | string | no | Optional. Filter to apply when listing KeyHandles, e.g. `resource_type_selector="{SERVICE}.googleapis.com/{TYPE}"`. |
| `pageSize` | query | integer (int32) | no | Optional. Optional limit on the number of KeyHandles to include in the response. The service may return fewer than this value. Further KeyHandles can subsequently be obtained by including the ListKeyHandlesResponse.next_page_token in a subsequent request. If unspecified, at most 100 KeyHandles will be returned. |
| `pageToken` | query | string | no | Optional. Optional pagination token, returned earlier via ListKeyHandlesResponse.next_page_token. |

### `cloudkms.projects.locations.keyRings.create`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+parent}/keyRings`
- Create a new KeyRing in a given Project and Location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `KeyRing`; Response: `KeyRing`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the location associated with the KeyRings, in the format `projects/*/locations/*`. |
| `keyRingId` | query | string | yes | Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}` |

### `cloudkms.projects.locations.keyRings.cryptoKeys.create`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+parent}/cryptoKeys`
- Create a new CryptoKey within a KeyRing. CryptoKey.purpose and CryptoKey.version_template.algorithm are required.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `CryptoKey`; Response: `CryptoKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the KeyRing associated with the CryptoKeys. |
| `cryptoKeyId` | query | string | yes | Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}` |
| `skipInitialVersionCreation` | query | boolean | no | If set to true, the request will create a CryptoKey without any CryptoKeyVersions. You must manually call CreateCryptoKeyVersion or ImportCryptoKeyVersion before you can use this CryptoKey. |
| `trustedWrappingEnabled` | query | boolean | no | Optional. Whether trusted wrapping will be enabled on the first CryptoKeyVersions created for this CryptoKey. This field is only supported for keys with CryptoKeyVersionTemplate.protection_level HSM_SINGLE_TENANT. This field is supported for all CryptoKeyPurposes except ENCRYPT_DECRYPT. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.asymmetricDecrypt`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:asymmetricDecrypt`
- Decrypts data that was encrypted with a public key retrieved from GetPublicKey corresponding to a CryptoKeyVersion with CryptoKey.purpose ASYMMETRIC_DECRYPT.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `AsymmetricDecryptRequest`; Response: `AsymmetricDecryptResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKeyVersion to use for decryption. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.asymmetricSign`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:asymmetricSign`
- Signs data using a CryptoKeyVersion with CryptoKey.purpose ASYMMETRIC_SIGN, producing a signature that can be verified with the public key retrieved from GetPublicKey.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `AsymmetricSignRequest`; Response: `AsymmetricSignResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKeyVersion to use for signing. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.create`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+parent}/cryptoKeyVersions`
- Create a new CryptoKeyVersion in a CryptoKey. The server will assign the next sequential id. If unset, state will be set to ENABLED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `CryptoKeyVersion`; Response: `CryptoKeyVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the CryptoKey associated with the CryptoKeyVersions. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.decapsulate`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:decapsulate`
- Decapsulates data that was encapsulated with a public key retrieved from GetPublicKey corresponding to a CryptoKeyVersion with CryptoKey.purpose KEY_ENCAPSULATION.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `DecapsulateRequest`; Response: `DecapsulateResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKeyVersion to use for decapsulation. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.delete`

- Versions: v1
- `DELETE https://cloudkms.googleapis.com/v1/{+name}`
- Permanently deletes the given CryptoKeyVersion. Only possible if the version has not been previously imported and if its state is one of DESTROYED, IMPORT_FAILED, or GENERATION_FAILED. Successfully imported CryptoKeyVersions cannot be deleted at this time. The specified version will be immediately and permanently deleted upon calling this method. This action cannot be undone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CryptoKeyVersion to delete. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.destroy`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:destroy`
- Schedule a CryptoKeyVersion for destruction. Upon calling this method, CryptoKeyVersion.state will be set to DESTROY_SCHEDULED, and destroy_time will be set to the time destroy_scheduled_duration in the future. At that time, the state will automatically change to DESTROYED, and the key material will be irrevocably destroyed. Before the destroy_time is reached, RestoreCryptoKeyVersion may be called to reverse the process.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `DestroyCryptoKeyVersionRequest`; Response: `CryptoKeyVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKeyVersion to destroy. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.exportTrustedKeyWrappedCryptoKeyVersion`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}:exportTrustedKeyWrappedCryptoKeyVersion`
- Exports a CryptoKeyVersion with a trusted key. The CryptoKeyVersion must have trusted_wrapping_enabled set to true. The CryptoKeyVersion of the \[wrapping_key\] must have the AES_WRAPPING purpose. The \[wrapping_key\] must have the AES_256_KWP algorithm.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ExportTrustedKeyWrappedCryptoKeyVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CryptoKeyVersion to export. The CryptoKeyVersion must have trusted_wrapping_enabled set to true. |
| `wrappingKey` | query | string | yes | Required. The name of the CryptoKeyVersion to use as a wrapping key. The CryptoKeyVersion must have hsm_trusted set to true. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.get`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Returns metadata for a given CryptoKeyVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `CryptoKeyVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CryptoKeyVersion to get. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.getPublicKey`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}/publicKey`
- Returns the public key for the given CryptoKeyVersion. The CryptoKey.purpose must be ASYMMETRIC_SIGN or ASYMMETRIC_DECRYPT.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `PublicKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CryptoKeyVersion public key to get. |
| `publicKeyFormat` | query | string enum | no | Optional. The PublicKey format specified by the user. This field is required for PQC algorithms. If specified, the public key will be exported through the public_key field in the requested format. Otherwise, the pem field will be populated for non-PQC algorithms, and an error will be returned for PQC algorithms. Values: `PUBLIC_KEY_FORMAT_UNSPECIFIED`, `PEM`, `DER`, `NIST_PQC`, `XWING_RAW_BYTES`. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.import`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+parent}/cryptoKeyVersions:import`
- Import wrapped key material into a CryptoKeyVersion. All requests must specify a CryptoKey. If a CryptoKeyVersion is additionally specified in the request, key material will be reimported into that version. Otherwise, a new version will be created, and will be assigned the next sequential id within the CryptoKey.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `ImportCryptoKeyVersionRequest`; Response: `CryptoKeyVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the CryptoKey to be imported into. The create permission is only required on this key when creating a new CryptoKeyVersion. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.importTrustedKeyWrappedCryptoKeyVersion`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+parent}/cryptoKeyVersions:importTrustedKeyWrappedCryptoKeyVersion`
- Import wrapped key material into a CryptoKeyVersion with a trusted key. All requests must specify a CryptoKey. If a CryptoKeyVersion is additionally specified in the request, key material will be reimported into that version. Otherwise, a new version will be created, and will be assigned the next sequential id within the CryptoKey. The CryptoKeyVersion will have trusted_wrapping_enabled set to true.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `ImportTrustedKeyWrappedCryptoKeyVersionRequest`; Response: `CryptoKeyVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the CryptoKey to be imported into. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.list`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+parent}/cryptoKeyVersions`
- Lists CryptoKeyVersions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ListCryptoKeyVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the CryptoKey to list, in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`. |
| `filter` | query | string | no | Optional. Only include resources that match the filter in the response. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `orderBy` | query | string | no | Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `pageSize` | query | integer (int32) | no | Optional. Optional limit on the number of CryptoKeyVersions to include in the response. Further CryptoKeyVersions can subsequently be obtained by including the ListCryptoKeyVersionsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Optional pagination token, returned earlier via ListCryptoKeyVersionsResponse.next_page_token. |
| `view` | query | string enum | no | The fields to include in the response. Values: `CRYPTO_KEY_VERSION_VIEW_UNSPECIFIED`, `FULL`. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.macSign`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:macSign`
- Signs data using a CryptoKeyVersion with CryptoKey.purpose MAC, producing a tag that can be verified by another source with the same key.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `MacSignRequest`; Response: `MacSignResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKeyVersion to use for signing. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.macVerify`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:macVerify`
- Verifies MAC tag using a CryptoKeyVersion with CryptoKey.purpose MAC, and returns a response that indicates whether or not the verification was successful.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `MacVerifyRequest`; Response: `MacVerifyResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKeyVersion to use for verification. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.patch`

- Versions: v1
- `PATCH https://cloudkms.googleapis.com/v1/{+name}`
- Update a CryptoKeyVersion's metadata. state may be changed between ENABLED and DISABLED using this method. See DestroyCryptoKeyVersion and RestoreCryptoKeyVersion to move between other states.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `CryptoKeyVersion`; Response: `CryptoKeyVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name for this CryptoKeyVersion in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*/cryptoKeyVersions/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. List of fields to be updated in this request. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.rawDecrypt`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:rawDecrypt`
- Decrypts data that was originally encrypted using a raw cryptographic mechanism. The CryptoKey.purpose must be RAW_ENCRYPT_DECRYPT.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `RawDecryptRequest`; Response: `RawDecryptResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKeyVersion to use for decryption. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.rawEncrypt`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:rawEncrypt`
- Encrypts data using portable cryptographic primitives. Most users should choose Encrypt and Decrypt rather than their raw counterparts. The CryptoKey.purpose must be RAW_ENCRYPT_DECRYPT.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `RawEncryptRequest`; Response: `RawEncryptResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKeyVersion to use for encryption. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.restore`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:restore`
- Restore a CryptoKeyVersion in the DESTROY_SCHEDULED state. Upon restoration of the CryptoKeyVersion, state will be set to DISABLED, and destroy_time will be cleared.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `RestoreCryptoKeyVersionRequest`; Response: `CryptoKeyVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKeyVersion to restore. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.decrypt`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:decrypt`
- Decrypts data that was protected by Encrypt. The CryptoKey.purpose must be ENCRYPT_DECRYPT.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `DecryptRequest`; Response: `DecryptResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKey to use for decryption. The server will choose the appropriate version. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.delete`

- Versions: v1
- `DELETE https://cloudkms.googleapis.com/v1/{+name}`
- Permanently deletes the given CryptoKey. All child CryptoKeyVersions must have been previously deleted using KeyManagementService.DeleteCryptoKeyVersion. The specified crypto key will be immediately and permanently deleted upon calling this method. This action cannot be undone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CryptoKey to delete. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.encrypt`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:encrypt`
- Encrypts data, so that it can only be recovered by a call to Decrypt. The CryptoKey.purpose must be ENCRYPT_DECRYPT.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `EncryptRequest`; Response: `EncryptResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKey or CryptoKeyVersion to use for encryption. If a CryptoKey is specified, the server will use its primary version. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.get`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Returns metadata for a given CryptoKey, as well as its primary CryptoKeyVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `CryptoKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CryptoKey to get. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.getIamPolicy`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `cloudkms.projects.locations.keyRings.cryptoKeys.list`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+parent}/cryptoKeys`
- Lists CryptoKeys.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ListCryptoKeysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the KeyRing to list, in the format `projects/*/locations/*/keyRings/*`. |
| `filter` | query | string | no | Optional. Only include resources that match the filter in the response. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `orderBy` | query | string | no | Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `pageSize` | query | integer (int32) | no | Optional. Optional limit on the number of CryptoKeys to include in the response. Further CryptoKeys can subsequently be obtained by including the ListCryptoKeysResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Optional pagination token, returned earlier via ListCryptoKeysResponse.next_page_token. |
| `versionView` | query | string enum | no | The fields of the primary version to include in the response. Values: `CRYPTO_KEY_VERSION_VIEW_UNSPECIFIED`, `FULL`. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.patch`

- Versions: v1
- `PATCH https://cloudkms.googleapis.com/v1/{+name}`
- Update a CryptoKey.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `CryptoKey`; Response: `CryptoKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name for this CryptoKey in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. List of fields to be updated in this request. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.setIamPolicy`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.testIamPermissions`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudkms.projects.locations.keyRings.cryptoKeys.updatePrimaryVersion`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:updatePrimaryVersion`
- Update the version of a CryptoKey that will be used in Encrypt. Returns an error if called on a key whose purpose is not ENCRYPT_DECRYPT.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `UpdateCryptoKeyPrimaryVersionRequest`; Response: `CryptoKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKey to update. |

### `cloudkms.projects.locations.keyRings.delete`

- Versions: v1
- `DELETE https://cloudkms.googleapis.com/v1/{+name}`
- Permanently deletes the given KeyRing. All child resources of the KeyRing must have been previously deleted using their corresponding Delete operations. The specified key ring will be immediately and permanently deleted upon calling this method. This action cannot be undone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the KeyRing to delete. |

### `cloudkms.projects.locations.keyRings.get`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Returns metadata for a given KeyRing.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `KeyRing`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the KeyRing to get. |

### `cloudkms.projects.locations.keyRings.getIamPolicy`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `cloudkms.projects.locations.keyRings.importJobs.create`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+parent}/importJobs`
- Create a new ImportJob within a KeyRing. ImportJob.import_method is required.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `ImportJob`; Response: `ImportJob`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the KeyRing associated with the ImportJobs. |
| `importJobId` | query | string | yes | Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}` |

### `cloudkms.projects.locations.keyRings.importJobs.get`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Returns metadata for a given ImportJob.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ImportJob`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ImportJob to get. |
| `publicKeyFormat` | query | string enum | no | Optional. Specifies the WrappingPublicKey format. If not specified: \* For RSA-based import methods, the wrapping key will be returned in PEM format \* For pure ML-KEM-based import methods, the wrapping key will be returned in the raw bytes format specified in FIPS-203 \* For X-Wing-based import methods, the wrapping key will be returned in the raw bytes format specified in https://datatracker.ietf.org/doc/draft-connolly-cfrg-xwing-kem. Values: `PUBLIC_KEY_FORMAT_UNSPECIFIED`, `PEM`, `DER`, `NIST_PQC`, `XWING_RAW_BYTES`. |

### `cloudkms.projects.locations.keyRings.importJobs.getIamPolicy`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `cloudkms.projects.locations.keyRings.importJobs.list`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+parent}/importJobs`
- Lists ImportJobs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ListImportJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the KeyRing to list, in the format `projects/*/locations/*/keyRings/*`. |
| `filter` | query | string | no | Optional. Only include resources that match the filter in the response. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `orderBy` | query | string | no | Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `pageSize` | query | integer (int32) | no | Optional. Optional limit on the number of ImportJobs to include in the response. Further ImportJobs can subsequently be obtained by including the ListImportJobsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Optional pagination token, returned earlier via ListImportJobsResponse.next_page_token. |

### `cloudkms.projects.locations.keyRings.importJobs.setIamPolicy`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudkms.projects.locations.keyRings.importJobs.testIamPermissions`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudkms.projects.locations.keyRings.list`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+parent}/keyRings`
- Lists KeyRings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ListKeyRingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the location associated with the KeyRings, in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Only include resources that match the filter in the response. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `orderBy` | query | string | no | Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `pageSize` | query | integer (int32) | no | Optional. Optional limit on the number of KeyRings to include in the response. Further KeyRings can subsequently be obtained by including the ListKeyRingsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Optional pagination token, returned earlier via ListKeyRingsResponse.next_page_token. |

### `cloudkms.projects.locations.keyRings.setIamPolicy`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudkms.projects.locations.keyRings.testIamPermissions`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudkms.projects.locations.list`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `cloudkms.projects.locations.operations.get`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudkms.projects.locations.retiredResources.get`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Retrieves a specific RetiredResource resource, which represents the record of a deleted CryptoKey.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `RetiredResource`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the RetiredResource to get. |

### `cloudkms.projects.locations.retiredResources.list`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+parent}/retiredResources`
- Lists the RetiredResources which are the records of deleted CryptoKeys. RetiredResources prevent the reuse of these resource names after deletion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ListRetiredResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project-specific location holding the RetiredResources, in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Optional. Optional limit on the number of RetiredResources to be included in the response. Further RetiredResources can subsequently be obtained by including the ListRetiredResourcesResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Optional pagination token, returned earlier via ListRetiredResourcesResponse.next_page_token. |

### `cloudkms.projects.locations.singleTenantHsmInstances.create`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+parent}/singleTenantHsmInstances`
- Creates a new SingleTenantHsmInstance in a given Project and Location. User must create a RegisterTwoFactorAuthKeys proposal with this single-tenant HSM instance to finish setup of the instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `SingleTenantHsmInstance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the location associated with the SingleTenantHsmInstance, in the format `projects/*/locations/*`. |
| `singleTenantHsmInstanceId` | query | string | no | Optional. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`. |

### `cloudkms.projects.locations.singleTenantHsmInstances.get`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Returns metadata for a given SingleTenantHsmInstance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `SingleTenantHsmInstance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the SingleTenantHsmInstance to get. |

### `cloudkms.projects.locations.singleTenantHsmInstances.list`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+parent}/singleTenantHsmInstances`
- Lists SingleTenantHsmInstances.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ListSingleTenantHsmInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the location associated with the SingleTenantHsmInstances to list, in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Only include resources that match the filter in the response. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `orderBy` | query | string | no | Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `pageSize` | query | integer (int32) | no | Optional. Optional limit on the number of SingleTenantHsmInstances to include in the response. Further SingleTenantHsmInstances can subsequently be obtained by including the ListSingleTenantHsmInstancesResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Optional pagination token, returned earlier via ListSingleTenantHsmInstancesResponse.next_page_token. |
| `showDeleted` | query | boolean | no | Optional. If set to true, HsmManagement.ListSingleTenantHsmInstances will also return SingleTenantHsmInstances in DELETED state. |

### `cloudkms.projects.locations.singleTenantHsmInstances.proposals.approve`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:approve`
- Approves a SingleTenantHsmInstanceProposal for a given SingleTenantHsmInstance. The proposal must be in the PENDING state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `ApproveSingleTenantHsmInstanceProposalRequest`; Response: `ApproveSingleTenantHsmInstanceProposalResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the SingleTenantHsmInstanceProposal to approve. |

### `cloudkms.projects.locations.singleTenantHsmInstances.proposals.create`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+parent}/proposals`
- Creates a new SingleTenantHsmInstanceProposal for a given SingleTenantHsmInstance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `SingleTenantHsmInstanceProposal`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the SingleTenantHsmInstance associated with the SingleTenantHsmInstanceProposals. |
| `singleTenantHsmInstanceProposalId` | query | string | no | Optional. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`. |

### `cloudkms.projects.locations.singleTenantHsmInstances.proposals.delete`

- Versions: v1
- `DELETE https://cloudkms.googleapis.com/v1/{+name}`
- Deletes a SingleTenantHsmInstanceProposal.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the SingleTenantHsmInstanceProposal to delete. |

### `cloudkms.projects.locations.singleTenantHsmInstances.proposals.execute`

- Versions: v1
- `POST https://cloudkms.googleapis.com/v1/{+name}:execute`
- Executes a SingleTenantHsmInstanceProposal for a given SingleTenantHsmInstance. The proposal must be in the APPROVED state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `ExecuteSingleTenantHsmInstanceProposalRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the SingleTenantHsmInstanceProposal to execute. |

### `cloudkms.projects.locations.singleTenantHsmInstances.proposals.get`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+name}`
- Returns metadata for a given SingleTenantHsmInstanceProposal.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `SingleTenantHsmInstanceProposal`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the SingleTenantHsmInstanceProposal to get. |

### `cloudkms.projects.locations.singleTenantHsmInstances.proposals.list`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+parent}/proposals`
- Lists SingleTenantHsmInstanceProposals.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ListSingleTenantHsmInstanceProposalsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the single tenant HSM instance associated with the SingleTenantHsmInstanceProposals to list, in the format `projects/*/locations/*/singleTenantHsmInstances/*`. |
| `filter` | query | string | no | Optional. Only include resources that match the filter in the response. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `orderBy` | query | string | no | Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see Sorting and filtering list results (https://cloud.google.com/kms/docs/sorting-and-filtering). |
| `pageSize` | query | integer (int32) | no | Optional. Optional limit on the number of SingleTenantHsmInstanceProposals to include in the response. Further SingleTenantHsmInstanceProposals can subsequently be obtained by including the ListSingleTenantHsmInstanceProposalsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Optional pagination token, returned earlier via ListSingleTenantHsmInstanceProposalsResponse.next_page_token. |
| `showDeleted` | query | boolean | no | Optional. If set to true, HsmManagement.ListSingleTenantHsmInstanceProposals will also return SingleTenantHsmInstanceProposals in DELETED state. |

### `cloudkms.projects.locations.updateEkmConfig`

- Versions: v1
- `PATCH https://cloudkms.googleapis.com/v1/{+name}`
- Updates the EkmConfig singleton resource for a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `EkmConfig`; Response: `EkmConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name for the EkmConfig in the format `projects/*/locations/*/ekmConfig`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. List of fields to be updated in this request. |

### `cloudkms.projects.showEffectiveAutokeyConfig`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+parent}:showEffectiveAutokeyConfig`
- Returns the effective Cloud KMS Autokey configuration for a given project or folder. Note on permissions: - If called on a project (`projects/{project}`), requires `cloudkms.projects.showEffectiveAutokeyConfig`. - If called on a folder (`folders/{folder}`), requires `cloudkms.folders.showEffectiveAutokeyConfig`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ShowEffectiveAutokeyConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the resource project or folder to show the effective Cloud KMS Autokey configuration for. This may be helpful for evaluating the effect of nested folder configurations on a given resource project. Format: \* projects/{project} \* folders/{folder} |

### `cloudkms.projects.showEffectiveKeyAccessJustificationsEnrollmentConfig`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+project}:showEffectiveKeyAccessJustificationsEnrollmentConfig`
- Returns the KeyAccessJustificationsEnrollmentConfig of the resource closest to the given project in hierarchy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ShowEffectiveKeyAccessJustificationsEnrollmentConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Specifies the number or id of the project to get the effective KeyAccessJustificationsEnrollmentConfig for. |

### `cloudkms.projects.showEffectiveKeyAccessJustificationsPolicyConfig`

- Versions: v1
- `GET https://cloudkms.googleapis.com/v1/{+project}:showEffectiveKeyAccessJustificationsPolicyConfig`
- Returns the KeyAccessJustificationsPolicyConfig of the resource closest to the given project in hierarchy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: —; Response: `ShowEffectiveKeyAccessJustificationsPolicyConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Specifies the number or id of the project to get the effective KeyAccessJustificationsPolicyConfig. In the format of "projects/{\|}" |

### `cloudkms.projects.updateAutokeyConfig`

- Versions: v1
- `PATCH https://cloudkms.googleapis.com/v1/{+name}`
- Updates the AutokeyConfig for a folder or a project. The caller must have both `cloudkms.autokeyConfigs.update` permission on the parent folder and `cloudkms.cryptoKeys.setIamPolicy` permission on the provided key project. A KeyHandle creation in the folder's descendant projects will use this configuration to determine where to create the resulting CryptoKey.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `AutokeyConfig`; Response: `AutokeyConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the AutokeyConfig resource, e.g. `folders/{FOLDER_NUMBER}/autokeyConfig`, `projects/{PROJECT_NUMBER}/autokeyConfig`, or `projects/{PROJECT_ID}/autokeyConfig`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Masks which fields of the AutokeyConfig to update, e.g. `keyProject`. |

### `cloudkms.projects.updateKajPolicyConfig`

- Versions: v1
- `PATCH https://cloudkms.googleapis.com/v1/{+name}`
- Updates the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloudkms`
- Request: `KeyAccessJustificationsPolicyConfig`; Response: `KeyAccessJustificationsPolicyConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Represents the resource name for this KeyAccessJustificationsPolicyConfig in the format of "{organizations\|folders\|projects}/\*/kajPolicyConfig". |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Specifies the list of fields to update. |

### Example request skeleton

Generated from the Discovery entry of `cloudkms.folders.getAutokeyConfig` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudkms.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `cloudkms` (retrieved 2026-11-14). Resources on this page: folders, organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://cloudkms.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
