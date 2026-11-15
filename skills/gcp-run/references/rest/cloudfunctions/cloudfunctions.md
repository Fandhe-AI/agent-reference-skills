---
source: https://cloudfunctions.googleapis.com/$discovery/rest?version=v2
---

# Cloud Functions API REST API (cloudfunctions)

## Signature / Usage

Base URL: `https://cloudfunctions.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `cloudfunctions.operations.get`

- Versions: v1
- `GET https://cloudfunctions.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudfunctions.operations.list`

- Versions: v1
- `GET https://cloudfunctions.googleapis.com/v1/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `filter` | query | string | no | The standard list filter. |
| `name` | query | string | no | The name of the operation's parent resource. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `cloudfunctions.projects.locations.functions.abortFunctionUpgrade`

- Versions: v2, v2beta, v2alpha
- `POST https://cloudfunctions.googleapis.com/v2/{+name}:abortFunctionUpgrade`
- Aborts generation upgrade process for a function with the given name from the specified project. Deletes all 2nd Gen copy related configuration and resources which were created during the upgrade process.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AbortFunctionUpgradeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the function for which upgrade should be aborted. |

### `cloudfunctions.projects.locations.functions.call`

- Versions: v1
- `POST https://cloudfunctions.googleapis.com/v1/{+name}:call`
- Synchronously invokes a deployed Cloud Function. To be used for testing purposes as very limited traffic is allowed. For more information on the actual limits, refer to Rate Limits (https://cloud.google.com/functions/quotas#rate_limits).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CallFunctionRequest`; Response: `CallFunctionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the function to be called. |

### `cloudfunctions.projects.locations.functions.commitFunctionUpgrade`

- Versions: v2, v2beta, v2alpha
- `POST https://cloudfunctions.googleapis.com/v2/{+name}:commitFunctionUpgrade`
- Finalizes the upgrade after which function upgrade can not be rolled back. This is the last step of the multi step process to upgrade 1st Gen functions to 2nd Gen. Deletes all original 1st Gen related configuration and resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CommitFunctionUpgradeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the function for which upgrade should be finalized. |

### `cloudfunctions.projects.locations.functions.commitFunctionUpgradeAsGen2`

- Versions: v2, v2beta, v2alpha
- `POST https://cloudfunctions.googleapis.com/v2/{+name}:commitFunctionUpgradeAsGen2`
- Commits a function upgrade from GCF Gen1 to GCF Gen2. This action deletes the Gen1 function, leaving the Gen2 function active and manageable by the GCFv2 API.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CommitFunctionUpgradeAsGen2Request`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the function for which upgrade should be committed to Gen2. |

### `cloudfunctions.projects.locations.functions.create`

- Versions: v2, v1, v2beta, v2alpha
- `POST https://cloudfunctions.googleapis.com/v2/{+parent}/functions`
- Creates a new function. If a function with the given name already exists in the specified project, the long running operation will return `ALREADY_EXISTS` error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Function`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location in which the function should be created, specified in the format `projects/*/locations/*` |
| `functionId` | query | string | no | The ID to use for the function, which will become the final component of the function's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. |

### `cloudfunctions.projects.locations.functions.delete`

- Versions: v2, v1, v2beta, v2alpha
- `DELETE https://cloudfunctions.googleapis.com/v2/{+name}`
- Deletes a function with the given name from the specified project. If the given function is used by some trigger, the trigger will be updated to remove this function.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the function which should be deleted. |

### `cloudfunctions.projects.locations.functions.detachFunction`

- Versions: v2, v2beta, v2alpha
- `POST https://cloudfunctions.googleapis.com/v2/{+name}:detachFunction`
- Detaches 2nd Gen function to Cloud Run function.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DetachFunctionRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the function for which should be detached. |

### `cloudfunctions.projects.locations.functions.generateDownloadUrl`

- Versions: v2, v1, v2beta, v2alpha
- `POST https://cloudfunctions.googleapis.com/v2/{+name}:generateDownloadUrl`
- Returns a signed URL for downloading deployed function source code. The URL is only valid for a limited period and should be used within 30 minutes of generation. For more information about the signed URL usage see: https://cloud.google.com/storage/docs/access-control/signed-urls
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateDownloadUrlRequest`; Response: `GenerateDownloadUrlResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of function for which source code Google Cloud Storage signed URL should be generated. |

### `cloudfunctions.projects.locations.functions.generateUploadUrl`

- Versions: v2, v1, v2beta, v2alpha
- `POST https://cloudfunctions.googleapis.com/v2/{+parent}/functions:generateUploadUrl`
- Returns a signed URL for uploading a function source code. For more information about the signed URL usage see: https://cloud.google.com/storage/docs/access-control/signed-urls. Once the function source code upload is complete, the used signed URL should be provided in CreateFunction or UpdateFunction request as a reference to the function source code. When uploading source code to the generated signed URL, please follow these restrictions: \* Source file type should be a zip file. \* No credentials should be attached - the signed URLs provide access to the target bucket using internal service identity; if credentials were attached, the identity from the credentials would be used, but that identity does not have permissions to upload files to the URL. When making a HTTP PUT request, specify this header: \* `content-type: application/zip` Do not specify this header: \* `Authorization: Bearer YOUR_TOKEN`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateUploadUrlRequest`; Response: `GenerateUploadUrlResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location in which the Google Cloud Storage signed URL should be generated, specified in the format `projects/*/locations/*`. |

### `cloudfunctions.projects.locations.functions.get`

- Versions: v2, v1, v2beta, v2alpha
- `GET https://cloudfunctions.googleapis.com/v2/{+name}`
- Returns a function with the given name from the requested project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Function`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the function which details should be obtained. |
| `revision` | query | string | no | Optional. The optional version of the 1st gen function whose details should be obtained. The version of a 1st gen function is an integer that starts from 1 and gets incremented on redeployments. GCF may keep historical configs for old versions of 1st gen function. This field can be specified to fetch the historical configs. This field is valid only for GCF 1st gen function. |

### `cloudfunctions.projects.locations.functions.getIamPolicy`

- Versions: v2, v1, v2beta, v2alpha
- `GET https://cloudfunctions.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `cloudfunctions.projects.locations.functions.list`

- Versions: v2, v1, v2beta, v2alpha
- `GET https://cloudfunctions.googleapis.com/v2/{+parent}/functions`
- Returns a list of functions that belong to the requested project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListFunctionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the function should be listed, specified in the format `projects/*/locations/*` If you want to list functions in all locations, use "-" in place of a location. When listing functions in all locations, if one or more location(s) are unreachable, the response will contain functions from all reachable locations along with the names of any unreachable locations. |
| `filter` | query | string | no | The filter for Functions that match the filter expression, following the syntax outlined in https://google.aip.dev/160. |
| `orderBy` | query | string | no | The sorting order of the resources returned. Value should be a comma separated list of fields. The default sorting order is ascending. See https://google.aip.dev/132#ordering. |
| `pageSize` | query | integer (int32) | no | Maximum number of functions to return per call. The largest allowed page_size is 1,000, if the page_size is omitted or specified as greater than 1,000 then it will be replaced as 1,000. The size of the list response can be less than specified when used with filters. |
| `pageToken` | query | string | no | The value returned by the last `ListFunctionsResponse`; indicates that this is a continuation of a prior `ListFunctions` call, and that the system should return the next page of data. |

### `cloudfunctions.projects.locations.functions.patch`

- Versions: v2, v1, v2beta, v2alpha
- `PATCH https://cloudfunctions.googleapis.com/v2/{+name}`
- Updates existing function.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Function`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | A user-defined name of the function. Function names must be unique globally and match pattern `projects/*/locations/*/functions/*` |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to be updated. If no field mask is provided, all fields will be updated. |

### `cloudfunctions.projects.locations.functions.redirectFunctionUpgradeTraffic`

- Versions: v2, v2beta, v2alpha
- `POST https://cloudfunctions.googleapis.com/v2/{+name}:redirectFunctionUpgradeTraffic`
- Changes the traffic target of a function from the original 1st Gen function to the 2nd Gen copy. This is the second step of the multi step process to upgrade 1st Gen functions to 2nd Gen. After this operation, all new traffic will be served by 2nd Gen copy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RedirectFunctionUpgradeTrafficRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the function for which traffic target should be changed to 2nd Gen from 1st Gen. |

### `cloudfunctions.projects.locations.functions.rollbackFunctionUpgradeTraffic`

- Versions: v2, v2beta, v2alpha
- `POST https://cloudfunctions.googleapis.com/v2/{+name}:rollbackFunctionUpgradeTraffic`
- Reverts the traffic target of a function from the 2nd Gen copy to the original 1st Gen function. After this operation, all new traffic would be served by the 1st Gen.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RollbackFunctionUpgradeTrafficRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the function for which traffic target should be changed back to 1st Gen from 2nd Gen. |

### `cloudfunctions.projects.locations.functions.setIamPolicy`

- Versions: v2, v1, v2beta, v2alpha
- `POST https://cloudfunctions.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudfunctions.projects.locations.functions.setupFunctionUpgradeConfig`

- Versions: v2, v2beta, v2alpha
- `POST https://cloudfunctions.googleapis.com/v2/{+name}:setupFunctionUpgradeConfig`
- Creates a 2nd Gen copy of the function configuration based on the 1st Gen function with the given name. This is the first step of the multi step process to upgrade 1st Gen functions to 2nd Gen. Only 2nd Gen configuration is setup as part of this request and traffic continues to be served by 1st Gen.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetupFunctionUpgradeConfigRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the function which should have configuration copied for upgrade. |

### `cloudfunctions.projects.locations.functions.testIamPermissions`

- Versions: v2, v1, v2beta, v2alpha
- `POST https://cloudfunctions.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudfunctions.projects.locations.list`

- Versions: v2, v1, v2beta, v2alpha
- `GET https://cloudfunctions.googleapis.com/v2/{+name}/locations`
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

### `cloudfunctions.projects.locations.operations.get`

- Versions: v2, v2beta, v2alpha
- `GET https://cloudfunctions.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudfunctions.projects.locations.operations.list`

- Versions: v2, v2beta, v2alpha
- `GET https://cloudfunctions.googleapis.com/v2/{+name}/operations`
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

### `cloudfunctions.projects.locations.runtimes.list`

- Versions: v2, v2beta, v2alpha
- `GET https://cloudfunctions.googleapis.com/v2/{+parent}/runtimes`
- Returns a list of runtimes that are supported for the requested project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRuntimesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the runtimes should be listed, specified in the format `projects/*/locations/*` |
| `filter` | query | string | no | The filter for Runtimes that match the filter expression, following the syntax outlined in https://google.aip.dev/160. |

### Example request skeleton

Generated from the Discovery entry of `cloudfunctions.operations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudfunctions.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v2, v1, v2beta, v2alpha of `cloudfunctions` (retrieved 2026-11-14). Resources on this page: operations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are always `yes`.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/cloudfunctions/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://cloudfunctions.googleapis.com/$discovery/rest?version=v2, https://cloudfunctions.googleapis.com/$discovery/rest?version=v1, https://cloudfunctions.googleapis.com/$discovery/rest?version=v2beta, https://cloudfunctions.googleapis.com/$discovery/rest?version=v2alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
