---
source: https://binaryauthorization.googleapis.com/$discovery/rest?version=v1
---

# Binary Authorization API REST API (binaryauthorization)

## Signature / Usage

Base URL: `https://binaryauthorization.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `binaryauthorization.projects.attestors.create`

- Versions: v1, v1beta1
- `POST https://binaryauthorization.googleapis.com/v1/{+parent}/attestors`
- Creates an attestor, and returns a copy of the new attestor. Returns `NOT_FOUND` if the project does not exist, `INVALID_ARGUMENT` if the request is malformed, `ALREADY_EXISTS` if the attestor already exists.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Attestor`; Response: `Attestor`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of this attestor. |
| `attestorId` | query | string | yes | Required. The attestors ID. |

### `binaryauthorization.projects.attestors.delete`

- Versions: v1, v1beta1
- `DELETE https://binaryauthorization.googleapis.com/v1/{+name}`
- Deletes an attestor. Returns `NOT_FOUND` if the attestor does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the attestors to delete, in the format `projects/*/attestors/*`. |

### `binaryauthorization.projects.attestors.get`

- Versions: v1, v1beta1
- `GET https://binaryauthorization.googleapis.com/v1/{+name}`
- Gets an attestor. Returns `NOT_FOUND` if the attestor does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Attestor`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the attestor to retrieve, in the format `projects/*/attestors/*`. |

### `binaryauthorization.projects.attestors.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://binaryauthorization.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `IamPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `binaryauthorization.projects.attestors.list`

- Versions: v1, v1beta1
- `GET https://binaryauthorization.googleapis.com/v1/{+parent}/attestors`
- Lists attestors. Returns `INVALID_ARGUMENT` if the project does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAttestorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the project associated with the attestors, in the format `projects/*`. |
| `pageSize` | query | integer (int32) | no | Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. Typically, this is the value of ListAttestorsResponse.next_page_token returned from the previous call to the `ListAttestors` method. |

### `binaryauthorization.projects.attestors.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://binaryauthorization.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `IamPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `binaryauthorization.projects.attestors.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://binaryauthorization.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `binaryauthorization.projects.attestors.update`

- Versions: v1, v1beta1
- `PUT https://binaryauthorization.googleapis.com/v1/{+name}`
- Updates an attestor. Returns `NOT_FOUND` if the attestor does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Attestor`; Response: `Attestor`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name, in the format: `projects/*/attestors/*`. This field may not be updated. |

### `binaryauthorization.projects.attestors.validateAttestationOccurrence`

- Versions: v1, v1beta1
- `POST https://binaryauthorization.googleapis.com/v1/{+attestor}:validateAttestationOccurrence`
- Returns whether the given `Attestation` for the given image URI was signed by the given `Attestor`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ValidateAttestationOccurrenceRequest`; Response: `ValidateAttestationOccurrenceResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `attestor` | path | string | yes | Required. The resource name of the Attestor of the occurrence, in the format `projects/*/attestors/*`. |

### `binaryauthorization.projects.getPolicy`

- Versions: v1, v1beta1
- `GET https://binaryauthorization.googleapis.com/v1/{+name}`
- A policy specifies the attestors that must attest to a container image, before the project is allowed to deploy that image. There is at most one policy per project. All image admission requests are permitted if a project has no policy. Gets the policy for this project. Returns a default policy if the project does not have one.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the policy to retrieve, in the format `projects/*/policy`. |

### `binaryauthorization.projects.platforms.gke.policies.evaluate`

- Versions: v1
- `POST https://binaryauthorization.googleapis.com/v1/{+name}:evaluate`
- Evaluates a Kubernetes object versus a GKE platform policy. Returns `NOT_FOUND` if the policy doesn't exist, `INVALID_ARGUMENT` if the policy or request is malformed and `PERMISSION_DENIED` if the client does not have sufficient permissions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EvaluateGkePolicyRequest`; Response: `EvaluateGkePolicyResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the platform policy to evaluate in the format `projects/*/platforms/*/policies/*`. |

### `binaryauthorization.projects.platforms.policies.create`

- Versions: v1
- `POST https://binaryauthorization.googleapis.com/v1/{+parent}/policies`
- Creates a platform policy, and returns a copy of it. Returns `NOT_FOUND` if the project or platform doesn't exist, `INVALID_ARGUMENT` if the request is malformed, `ALREADY_EXISTS` if the policy already exists, and `INVALID_ARGUMENT` if the policy contains a platform-specific policy that does not match the platform value specified in the URL.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PlatformPolicy`; Response: `PlatformPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of this platform policy. |
| `policyId` | query | string | yes | Required. The platform policy ID. |

### `binaryauthorization.projects.platforms.policies.delete`

- Versions: v1
- `DELETE https://binaryauthorization.googleapis.com/v1/{+name}`
- Deletes a platform policy. Returns `NOT_FOUND` if the policy doesn't exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the platform policy to delete, in the format `projects/*/platforms/*/policies/*`. |
| `etag` | query | string | no | Optional. Used to prevent deleting the policy when another request has updated it since it was retrieved. |

### `binaryauthorization.projects.platforms.policies.get`

- Versions: v1
- `GET https://binaryauthorization.googleapis.com/v1/{+name}`
- Gets a platform policy. Returns `NOT_FOUND` if the policy doesn't exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PlatformPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the platform policy to retrieve in the format `projects/*/platforms/*/policies/*`. |

### `binaryauthorization.projects.platforms.policies.list`

- Versions: v1
- `GET https://binaryauthorization.googleapis.com/v1/{+parent}/policies`
- Lists platform policies owned by a project in the specified platform. Returns `INVALID_ARGUMENT` if the project or the platform doesn't exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPlatformPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the platform associated with the platform policies using the format `projects/*/platforms/*`. |
| `pageSize` | query | integer (int32) | no | Requested page size. The server may return fewer results than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. Typically, this is the value of ListPlatformPoliciesResponse.next_page_token returned from the previous call to the `ListPlatformPolicies` method. |

### `binaryauthorization.projects.platforms.policies.replacePlatformPolicy`

- Versions: v1
- `PUT https://binaryauthorization.googleapis.com/v1/{+name}`
- Replaces a platform policy. Returns `NOT_FOUND` if the policy doesn't exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PlatformPolicy`; Response: `PlatformPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The relative resource name of the Binary Authorization platform policy, in the form of `projects/*/platforms/*/policies/*`. |

### `binaryauthorization.projects.policy.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://binaryauthorization.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `IamPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `binaryauthorization.projects.policy.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://binaryauthorization.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `IamPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `binaryauthorization.projects.policy.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://binaryauthorization.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `binaryauthorization.projects.updatePolicy`

- Versions: v1, v1beta1
- `PUT https://binaryauthorization.googleapis.com/v1/{+name}`
- Creates or updates a project's policy, and returns a copy of the new policy. A policy is always updated as a whole, to avoid race conditions with concurrent policy enforcement (or management!) requests. Returns `NOT_FOUND` if the project does not exist, `INVALID_ARGUMENT` if the request is malformed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Policy`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name, in the format `projects/*/policy`. There is at most one policy per project. |

### `binaryauthorization.systempolicy.getPolicy`

- Versions: v1, v1beta1
- `GET https://binaryauthorization.googleapis.com/v1/{+name}`
- Gets the current system policy in the specified location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name, in the format `locations/*/policy`. Note that the system policy is not associated with a project. |

### Example request skeleton

Generated from the Discovery entry of `binaryauthorization.projects.attestors.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://binaryauthorization.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `binaryauthorization` (retrieved 2026-11-14). Resources on this page: projects, systempolicy.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/binaryauthorization/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://binaryauthorization.googleapis.com/$discovery/rest?version=v1, https://binaryauthorization.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
