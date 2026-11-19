---
source: https://artifactregistry.googleapis.com/$discovery/rest?version=v1
---

# Artifact Registry API REST API (artifactregistry)

## Signature / Usage

Base URL: `https://artifactregistry.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `artifactregistry.projects.getProjectSettings`

- Versions: v1, v1beta2
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Retrieves the Settings for the Project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ProjectSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the projectSettings resource. |

### `artifactregistry.projects.locations.get`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `artifactregistry.projects.locations.getProjectConfig`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Retrieves the project configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ProjectConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the project's logging configuration: projects/{project}/locations/{location}/projectConfig |

### `artifactregistry.projects.locations.getVpcscConfig`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Retrieves the VPCSC Config for the Project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `VPCSCConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the VPCSCConfig resource. |

### `artifactregistry.projects.locations.list`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `artifactregistry.projects.locations.operations.cancel`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `artifactregistry.projects.locations.operations.get`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `artifactregistry.projects.locations.repositories.aptArtifacts.import`

- Versions: v1, v1beta2
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/aptArtifacts:import`
- Imports Apt artifacts. The returned Operation will complete once the resources are imported. Package, Version, and File resources are created based on the imported artifacts. Imported artifacts that conflict with existing resources are ignored.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ImportAptArtifactsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the parent resource where the artifacts will be imported. |

### `artifactregistry.projects.locations.repositories.aptArtifacts.upload`

- Versions: v1, v1beta2
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/aptArtifacts:create`
- Directly uploads an Apt artifact. The returned Operation will complete once the resources are uploaded. Package, Version, and File resources are created based on the imported artifact. Imported artifacts that conflict with existing resources are ignored.
- Media upload (simple): `POST https://artifactregistry.googleapis.com/upload/v1/{+parent}/aptArtifacts:create` with `uploadType=media` (the body is the file content only) or `uploadType=multipart` (a `multipart/related` body with the JSON metadata part followed by the content part)
- Media upload limits: accepted media types: `*/*`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UploadAptArtifactRequest`; Response: `UploadAptArtifactMediaResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the parent resource where the artifacts will be uploaded. |

### `artifactregistry.projects.locations.repositories.attachments.create`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/attachments`
- Creates an attachment. The returned Operation will finish once the attachment has been created. Its response will be the created attachment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Attachment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource where the attachment will be created. |
| `attachmentId` | query | string | yes | Required. The attachment id to use for this attachment. |

### `artifactregistry.projects.locations.repositories.attachments.delete`

- Versions: v1
- `DELETE https://artifactregistry.googleapis.com/v1/{+name}`
- Deletes an attachment. The returned Operation will finish once the attachments has been deleted. It will not have any Operation metadata and will return a `google.protobuf.Empty` response.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the attachment to delete. |

### `artifactregistry.projects.locations.repositories.attachments.get`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets an attachment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Attachment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the attachment to retrieve. |

### `artifactregistry.projects.locations.repositories.attachments.list`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+parent}/attachments`
- Lists attachments.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListAttachmentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource whose attachments will be listed. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: \* `target` \* `type` \* `attachment_namespace` |
| `pageSize` | query | integer (int32) | no | The maximum number of attachments to return. Maximum page size is 1,000. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous list request, if any. |

### `artifactregistry.projects.locations.repositories.checkPrewarmedArtifact`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+repository}:checkPrewarmedArtifact`
- Checks an artifact streaming.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `CheckPrewarmedArtifactRequest`; Response: `CheckPrewarmedArtifactResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `repository` | path | string | yes | Required. The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. If the package or version ID parts contain slashes, the slashes are escaped. |

### `artifactregistry.projects.locations.repositories.create`

- Versions: v1, v1beta2, v1beta1
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/repositories`
- Creates a repository. The returned Operation will finish once the repository has been created. Its response will be the created Repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Repository`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource where the repository will be created. |
| `repositoryId` | query | string | yes | Required. The repository id to use for this repository. |

### `artifactregistry.projects.locations.repositories.delete`

- Versions: v1, v1beta2, v1beta1
- `DELETE https://artifactregistry.googleapis.com/v1/{+name}`
- Deletes a repository and all of its contents. The returned Operation will finish once the repository has been deleted. It will not have any Operation metadata and will return a google.protobuf.Empty response.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the repository to delete. |

### `artifactregistry.projects.locations.repositories.dockerImages.get`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets a docker image.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `DockerImage`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the docker images. |

### `artifactregistry.projects.locations.repositories.dockerImages.list`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+parent}/dockerImages`
- Lists docker images.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListDockerImagesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource whose docker images will be listed. |
| `orderBy` | query | string | no | The field to order the results by. |
| `pageSize` | query | integer (int32) | no | The maximum number of artifacts to return. Maximum page size is 1,000. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous list request, if any. |

### `artifactregistry.projects.locations.repositories.exportArtifact`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+repository}:exportArtifact`
- Exports an artifact to a Cloud Storage bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportArtifactRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `repository` | path | string | yes | Required. The repository of the artifact to export. Format: projects/{project}/locations/{location}/repositories/{repository} |

### `artifactregistry.projects.locations.repositories.files.delete`

- Versions: v1
- `DELETE https://artifactregistry.googleapis.com/v1/{+name}`
- Deletes a file and all of its content. It is only allowed on generic repositories. The returned operation will complete once the file has been deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the file to delete. |

### `artifactregistry.projects.locations.repositories.files.download`

- Versions: v1, v1beta2
- `GET https://artifactregistry.googleapis.com/v1/{+name}:download`
- Download a file.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `DownloadFileResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the file to download. |

### `artifactregistry.projects.locations.repositories.files.get`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets a file.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `GoogleDevtoolsArtifactregistryV1File`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the file to retrieve. |

### `artifactregistry.projects.locations.repositories.files.list`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+parent}/files`
- Lists files.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListFilesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the repository whose files will be listed. For example: "projects/p1/locations/us-central1/repositories/repo1 |
| `filter` | query | string | no | An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: \* `name` \* `owner` \* `annotations` Examples of using a filter: To filter the results of your request to files with the name `my_file.txt` in project `my-project` in the `us-central` region, in repository `my-repo`, append the following filter expression to your request: \* `name="projects/my-project/locations/us-central1/repositories/my-repo/files/my-file.txt"` You can also use wildcards to match any number of characters before or after the value: \* `name="projects/my-project/locations/us-central1/repositories/my-repo/files/my-*"` \* `name="projects/my-project/locations/us-central1/repositories/my-repo/files/*file.txt"` \* `name="projects/my-project/locations/us-central1/repositories/my-repo/files/*file*"` To filter the results of your request to files owned by the version `1.0` in package `pkg1`, append the following filter expression to your request: \* `owner="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/1.0"` To filter the results of your request to files with the annotation key-value pair \[`external_link`: `external_link_value`\], append the following filter expression to your request: \* `"annotations.external_link:external_link_value"` To filter just for a specific annotation key `external_link`, append the following filter expression to your request: \* `"annotations.external_link"` If the annotation key or value contains special characters, you can escape them by surrounding the value with backticks. For example, to filter the results of your request to files with the annotation key-value pair \[`external.link`:`https://example.com/my-file`\], append the following filter expression to your request: \* `` "annotations.`external.link`:`https://example.com/my-file`" `` You can also filter with annotations with a wildcard to match any number of characters before or after the value: \* `` "annotations.\*\_link:`*example.com*`" `` |
| `orderBy` | query | string | no | The field to order the results by. |
| `pageSize` | query | integer (int32) | no | The maximum number of files to return. Maximum page size is 1,000. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous list request, if any. |

### `artifactregistry.projects.locations.repositories.files.patch`

- Versions: v1
- `PATCH https://artifactregistry.googleapis.com/v1/{+name}`
- Updates a file.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleDevtoolsArtifactregistryV1File`; Response: `GoogleDevtoolsArtifactregistryV1File`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the file, for example: `projects/p1/locations/us-central1/repositories/repo1/files/a%2Fb%2Fc.txt`. If the file ID part contains slashes, they are escaped. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask |

### `artifactregistry.projects.locations.repositories.files.upload`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/files:upload`
- Directly uploads a file to a repository. The returned Operation will complete once the resources are uploaded.
- Media upload (resumable): `POST https://artifactregistry.googleapis.com/upload/v1/{+parent}/files:upload` with `uploadType=resumable` (starts a resumable upload session; send the content to the session URI that the response returns); the Discovery document also lists the path `/resumable/upload/v1/{+parent}/files:upload` for this protocol
- Media upload (simple): `POST https://artifactregistry.googleapis.com/upload/v1/{+parent}/files:upload` with `uploadType=media` (the body is the file content only) or `uploadType=multipart` (a `multipart/related` body with the JSON metadata part followed by the content part)
- Media upload limits: accepted media types: `*/*`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UploadFileRequest`; Response: `UploadFileMediaResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the repository where the file will be uploaded. |

### `artifactregistry.projects.locations.repositories.genericArtifacts.upload`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/genericArtifacts:create`
- Directly uploads a Generic artifact. The returned operation will complete once the resources are uploaded. Package, version, and file resources are created based on the uploaded artifact. Uploaded artifacts that conflict with existing resources will raise an `ALREADY_EXISTS` error.
- Media upload (resumable): `POST https://artifactregistry.googleapis.com/upload/v1/{+parent}/genericArtifacts:create` with `uploadType=resumable` (starts a resumable upload session; send the content to the session URI that the response returns); the Discovery document also lists the path `/resumable/upload/v1/{+parent}/genericArtifacts:create` for this protocol
- Media upload (simple): `POST https://artifactregistry.googleapis.com/upload/v1/{+parent}/genericArtifacts:create` with `uploadType=media` (the body is the file content only) or `uploadType=multipart` (a `multipart/related` body with the JSON metadata part followed by the content part)
- Media upload limits: accepted media types: `*/*`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UploadGenericArtifactRequest`; Response: `UploadGenericArtifactMediaResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the repository where the generic artifact will be uploaded. |

### `artifactregistry.projects.locations.repositories.get`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets a repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Repository`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the repository to retrieve. |

### `artifactregistry.projects.locations.repositories.getIamPolicy`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM policy for a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `artifactregistry.projects.locations.repositories.goModules.upload`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/goModules:create`
- Directly uploads a Go module. The returned Operation will complete once the Go module is uploaded. Package, Version, and File resources are created based on the uploaded Go module.
- Media upload (simple): `POST https://artifactregistry.googleapis.com/upload/v1/{+parent}/goModules:create` with `uploadType=media` (the body is the file content only) or `uploadType=multipart` (a `multipart/related` body with the JSON metadata part followed by the content part)
- Media upload limits: accepted media types: `*/*`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UploadGoModuleRequest`; Response: `UploadGoModuleMediaResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the repository where the Go module will be uploaded. |

### `artifactregistry.projects.locations.repositories.googetArtifacts.import`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/googetArtifacts:import`
- Imports GooGet artifacts. The returned Operation will complete once the resources are imported. Package, Version, and File resources are created based on the imported artifacts. Imported artifacts that conflict with existing resources are ignored.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ImportGoogetArtifactsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the parent resource where the artifacts will be imported. |

### `artifactregistry.projects.locations.repositories.googetArtifacts.upload`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/googetArtifacts:create`
- Directly uploads a GooGet artifact. The returned Operation will complete once the resources are uploaded. Package, Version, and File resources are created based on the imported artifact. Imported artifacts that conflict with existing resources are ignored.
- Media upload (simple): `POST https://artifactregistry.googleapis.com/upload/v1/{+parent}/googetArtifacts:create` with `uploadType=media` (the body is the file content only) or `uploadType=multipart` (a `multipart/related` body with the JSON metadata part followed by the content part)
- Media upload limits: accepted media types: `*/*`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UploadGoogetArtifactRequest`; Response: `UploadGoogetArtifactMediaResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the parent resource where the artifacts will be uploaded. |

### `artifactregistry.projects.locations.repositories.kfpArtifacts.upload`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/kfpArtifacts:create`
- Directly uploads a KFP artifact. The returned Operation will complete once the resource is uploaded. Package, Version, and File resources will be created based on the uploaded artifact. Uploaded artifacts that conflict with existing resources will be overwritten.
- Media upload (simple): `POST https://artifactregistry.googleapis.com/upload/v1/{+parent}/kfpArtifacts:create` with `uploadType=media` (the body is the file content only) or `uploadType=multipart` (a `multipart/related` body with the JSON metadata part followed by the content part)
- Media upload limits: accepted media types: `*/*`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UploadKfpArtifactRequest`; Response: `UploadKfpArtifactMediaResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The resource name of the repository where the KFP artifact will be uploaded. |

### `artifactregistry.projects.locations.repositories.list`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+parent}/repositories`
- Lists repositories.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListRepositoriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource whose repositories will be listed. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: \* `name` Examples of using a filter: To filter the results of your request to repositories with the name `my-repo` in project `my-project` in the `us-central` region, append the following filter expression to your request: \* `name="projects/my-project/locations/us-central1/repositories/my-repo"` You can also use wildcards to match any number of characters before or after the value: \* `name="projects/my-project/locations/us-central1/repositories/my-*"` \* `name="projects/my-project/locations/us-central1/repositories/*repo"` \* `name="projects/my-project/locations/us-central1/repositories/*repo*"` |
| `orderBy` | query | string | no | Optional. The field to order the results by. |
| `pageSize` | query | integer (int32) | no | The maximum number of repositories to return. Maximum page size is 1,000. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous list request, if any. |

### `artifactregistry.projects.locations.repositories.mavenArtifacts.get`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets a maven artifact.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `MavenArtifact`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the maven artifact. |

### `artifactregistry.projects.locations.repositories.mavenArtifacts.list`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+parent}/mavenArtifacts`
- Lists maven artifacts.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListMavenArtifactsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource whose maven artifacts will be listed. |
| `pageSize` | query | integer (int32) | no | The maximum number of artifacts to return. Maximum page size is 1,000. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous list request, if any. |

### `artifactregistry.projects.locations.repositories.npmPackages.get`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets a npm package.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `NpmPackage`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the npm package. |

### `artifactregistry.projects.locations.repositories.npmPackages.list`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+parent}/npmPackages`
- Lists npm packages.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListNpmPackagesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource whose npm packages will be listed. |
| `pageSize` | query | integer (int32) | no | The maximum number of artifacts to return. Maximum page size is 1,000. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous list request, if any. |

### `artifactregistry.projects.locations.repositories.packages.delete`

- Versions: v1, v1beta2, v1beta1
- `DELETE https://artifactregistry.googleapis.com/v1/{+name}`
- Deletes a package and all of its versions and tags. The returned operation will complete once the package has been deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the package to delete. |

### `artifactregistry.projects.locations.repositories.packages.get`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets a package.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Package`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the package to retrieve. |

### `artifactregistry.projects.locations.repositories.packages.list`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+parent}/packages`
- Lists packages.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListPackagesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource whose packages will be listed. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: \* `name` \* `annotations` Examples of using a filter: To filter the results of your request to packages with the name `my-package` in project `my-project` in the `us-central` region, in repository `my-repo`, append the following filter expression to your request: \* `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package"` You can also use wildcards to match any number of characters before or after the value: \* `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-*"` \* `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/*package"` \* `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/*pack*"` To filter the results of your request to packages with the annotation key-value pair \[`external_link`: `external_link_value`\], append the following filter expression to your request": \* `"annotations.external_link:external_link_value"` To filter the results just for a specific annotation key `external_link`, append the following filter expression to your request: \* `"annotations.external_link"` If the annotation key or value contains special characters, you can escape them by surrounding the value with backticks. For example, to filter the results of your request to packages with the annotation key-value pair \[`external.link`:`https://example.com/my-package`\], append the following filter expression to your request: \* `` "annotations.`external.link`:`https://example.com/my-package`" `` You can also filter with annotations with a wildcard to match any number of characters before or after the value: \* `` "annotations.\*\_link:`*example.com*`" `` |
| `orderBy` | query | string | no | Optional. The field to order the results by. |
| `pageSize` | query | integer (int32) | no | The maximum number of packages to return. Maximum page size is 1,000. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous list request, if any. |

### `artifactregistry.projects.locations.repositories.packages.patch`

- Versions: v1, v1beta2
- `PATCH https://artifactregistry.googleapis.com/v1/{+name}`
- Updates a package.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Package`; Response: `Package`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the package, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1`. If the package ID part contains slashes, the slashes are escaped. |
| `updateMask` | query | string (google-fieldmask) | no | The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask |

### `artifactregistry.projects.locations.repositories.packages.tags.create`

- Versions: v1, v1beta2, v1beta1
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/tags`
- Creates a tag.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Tag`; Response: `Tag`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the parent resource where the tag will be created. |
| `tagId` | query | string | no | The tag id to use for this repository. |

### `artifactregistry.projects.locations.repositories.packages.tags.delete`

- Versions: v1, v1beta2, v1beta1
- `DELETE https://artifactregistry.googleapis.com/v1/{+name}`
- Deletes a tag.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the tag to delete. |

### `artifactregistry.projects.locations.repositories.packages.tags.get`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets a tag.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Tag`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the tag to retrieve. |

### `artifactregistry.projects.locations.repositories.packages.tags.list`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+parent}/tags`
- Lists tags.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTagsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the parent package whose tags will be listed. For example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1`. |
| `filter` | query | string | no | An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: \* `name` \* `version` Examples of using a filter: To filter the results of your request to tags with the name `my-tag` in package `my-package` in repository `my-repo` in project "`y-project` in the us-central region, append the following filter expression to your request: \* `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/my-tag"` You can also use wildcards to match any number of characters before or after the value: \* `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/my*"` \* `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/*tag"` \* `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/*tag*"` To filter the results of your request to tags applied to the version `1.0` in package `my-package`, append the following filter expression to your request: \* `version="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/1.0"` |
| `pageSize` | query | integer (int32) | no | The maximum number of tags to return. Maximum page size is 1,000. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous list request, if any. |

### `artifactregistry.projects.locations.repositories.packages.tags.patch`

- Versions: v1, v1beta2, v1beta1
- `PATCH https://artifactregistry.googleapis.com/v1/{+name}`
- Updates a tag.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Tag`; Response: `Tag`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the tag, for example: "projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/tags/tag1". If the package part contains slashes, the slashes are escaped. The tag part can only have characters in \[a-zA-Z0-9\-.\_~:@\], anything else must be URL encoded. |
| `updateMask` | query | string (google-fieldmask) | no | The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask |

### `artifactregistry.projects.locations.repositories.packages.versions.batchDelete`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/versions:batchDelete`
- Deletes multiple versions across a repository. The returned operation will complete once the versions have been deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchDeleteVersionsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the repository holding all requested versions. |

### `artifactregistry.projects.locations.repositories.packages.versions.delete`

- Versions: v1, v1beta2, v1beta1
- `DELETE https://artifactregistry.googleapis.com/v1/{+name}`
- Deletes a version and all of its content. The returned operation will complete once the version has been deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the version to delete. |
| `force` | query | boolean | no | By default, a version that is tagged may not be deleted. If force=true, the version and any tags pointing to the version are deleted. |

### `artifactregistry.projects.locations.repositories.packages.versions.get`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets a version
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Version`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the version to retrieve. |
| `view` | query | string enum | no | The view that should be returned in the response. Values: `VERSION_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `artifactregistry.projects.locations.repositories.packages.versions.list`

- Versions: v1, v1beta2, v1beta1
- `GET https://artifactregistry.googleapis.com/v1/{+parent}/versions`
- Lists versions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the parent resource whose versions will be listed. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: \* `name` \* `annotations` Examples of using a filter: To filter the results of your request to versions with the name `my-version` in project `my-project` in the `us-central` region, in repository `my-repo`, append the following filter expression to your request: \* `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/my-version"` You can also use wildcards to match any number of characters before or after the value: \* `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/*version"` \* `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/my*"` \* `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/*version*"` To filter the results of your request to versions with the annotation key-value pair \[`external_link`: `external_link_value`\], append the following filter expression to your request: \* `"annotations.external_link:external_link_value"` To filter just for a specific annotation key `external_link`, append the following filter expression to your request: \* `"annotations.external_link"` If the annotation key or value contains special characters, you can escape them by surrounding the value with backticks. For example, to filter the results of your request to versions with the annotation key-value pair \[`external.link`:`https://example.com/my-version`\], append the following filter expression to your request: \* `` "annotations.`external.link`:`https://example.com/my-version`" `` You can also filter with annotations with a wildcard to match any number of characters before or after the value: \* `` "annotations.\*\_link:`*example.com*`" `` |
| `orderBy` | query | string | no | Optional. The field to order the results by. |
| `pageSize` | query | integer (int32) | no | The maximum number of versions to return. Maximum page size is 1,000. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous list request, if any. |
| `view` | query | string enum | no | The view that should be returned in the response. Values: `VERSION_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `artifactregistry.projects.locations.repositories.packages.versions.patch`

- Versions: v1
- `PATCH https://artifactregistry.googleapis.com/v1/{+name}`
- Updates a version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Version`; Response: `Version`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the version, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/art1`. If the package or version ID parts contain slashes, the slashes are escaped. |
| `updateMask` | query | string (google-fieldmask) | no | The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask |

### `artifactregistry.projects.locations.repositories.patch`

- Versions: v1, v1beta2, v1beta1
- `PATCH https://artifactregistry.googleapis.com/v1/{+name}`
- Updates a repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Repository`; Response: `Repository`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. For each location in a project, repository names must be unique. |
| `updateMask` | query | string (google-fieldmask) | no | The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask |

### `artifactregistry.projects.locations.repositories.prewarmArtifact`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+repository}:prewarmArtifact`
- Prewarms an artifact for streaming.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `PrewarmArtifactRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `repository` | path | string | yes | Required. The repository name, for example: `projects/p1/locations/us-central1/repositories/repo1`. If the package or version ID parts contain slashes, the slashes are escaped. |

### `artifactregistry.projects.locations.repositories.prewarmedArtifacts.list`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+parent}/prewarmedArtifacts`
- Lists all streamed artifacts in a repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListPrewarmedArtifactsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository of the artifact to list. Format: projects/{project}/locations/{location}/repositories/{repository} |
| `filter` | query | string | no | Optional. Filter should only support The location of the prewarmed artifacts. multi-region is not supported for this field. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of prewarmed artifacts to return. Maximum page size is 1,000. Default page size is 100. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous list request, if any. |

### `artifactregistry.projects.locations.repositories.pythonPackages.get`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets a python package.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `PythonPackage`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the python package. |

### `artifactregistry.projects.locations.repositories.pythonPackages.list`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+parent}/pythonPackages`
- Lists python packages.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListPythonPackagesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource whose python packages will be listed. |
| `pageSize` | query | integer (int32) | no | The maximum number of artifacts to return. Maximum page size is 1,000. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous list request, if any. |

### `artifactregistry.projects.locations.repositories.removePrewarmedArtifact`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+repository}:removePrewarmedArtifact`
- Removes an artifact from streaming.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `RemovePrewarmedArtifactRequest`; Response: `RemovePrewarmedArtifactResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `repository` | path | string | yes | Required. The repository name, for example: `projects/p1/locations/us-central1/repositories/repo1`. |

### `artifactregistry.projects.locations.repositories.rules.create`

- Versions: v1
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/rules`
- Creates a rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleDevtoolsArtifactregistryV1Rule`; Response: `GoogleDevtoolsArtifactregistryV1Rule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource where the rule will be created. |
| `ruleId` | query | string | no | The rule id to use for this repository. |

### `artifactregistry.projects.locations.repositories.rules.delete`

- Versions: v1
- `DELETE https://artifactregistry.googleapis.com/v1/{+name}`
- Deletes a rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the rule to delete. |

### `artifactregistry.projects.locations.repositories.rules.get`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+name}`
- Gets a rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `GoogleDevtoolsArtifactregistryV1Rule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the rule to retrieve. |

### `artifactregistry.projects.locations.repositories.rules.list`

- Versions: v1
- `GET https://artifactregistry.googleapis.com/v1/{+parent}/rules`
- Lists rules.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListRulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent repository whose rules will be listed. For example: `projects/p1/locations/us-central1/repositories/repo1`. |
| `pageSize` | query | integer (int32) | no | The maximum number of rules to return. Maximum page size is 1,000. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous list request, if any. |

### `artifactregistry.projects.locations.repositories.rules.patch`

- Versions: v1
- `PATCH https://artifactregistry.googleapis.com/v1/{+name}`
- Updates a rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleDevtoolsArtifactregistryV1Rule`; Response: `GoogleDevtoolsArtifactregistryV1Rule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the rule, for example: `projects/p1/locations/us-central1/repositories/repo1/rules/rule1`. |
| `updateMask` | query | string (google-fieldmask) | no | The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask |

### `artifactregistry.projects.locations.repositories.setIamPolicy`

- Versions: v1, v1beta2, v1beta1
- `POST https://artifactregistry.googleapis.com/v1/{+resource}:setIamPolicy`
- Updates the IAM policy for a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `artifactregistry.projects.locations.repositories.testIamPermissions`

- Versions: v1, v1beta2, v1beta1
- `POST https://artifactregistry.googleapis.com/v1/{+resource}:testIamPermissions`
- Tests if the caller has a list of permissions on a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `artifactregistry.projects.locations.repositories.yumArtifacts.import`

- Versions: v1, v1beta2
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/yumArtifacts:import`
- Imports Yum (RPM) artifacts. The returned Operation will complete once the resources are imported. Package, Version, and File resources are created based on the imported artifacts. Imported artifacts that conflict with existing resources are ignored.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ImportYumArtifactsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the parent resource where the artifacts will be imported. |

### `artifactregistry.projects.locations.repositories.yumArtifacts.upload`

- Versions: v1, v1beta2
- `POST https://artifactregistry.googleapis.com/v1/{+parent}/yumArtifacts:create`
- Directly uploads a Yum artifact. The returned Operation will complete once the resources are uploaded. Package, Version, and File resources are created based on the imported artifact. Imported artifacts that conflict with existing resources are ignored.
- Media upload (simple): `POST https://artifactregistry.googleapis.com/upload/v1/{+parent}/yumArtifacts:create` with `uploadType=media` (the body is the file content only) or `uploadType=multipart` (a `multipart/related` body with the JSON metadata part followed by the content part)
- Media upload limits: accepted media types: `*/*`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UploadYumArtifactRequest`; Response: `UploadYumArtifactMediaResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the parent resource where the artifacts will be uploaded. |

### `artifactregistry.projects.locations.updateProjectConfig`

- Versions: v1
- `PATCH https://artifactregistry.googleapis.com/v1/{+name}`
- Updates the project configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ProjectConfig`; Response: `ProjectConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the project's configuration. Always of the form: projects/{project}/locations/{location}/projectConfig |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask to support partial updates. See https://protobuf.dev/reference/protobuf/google.protobuf/#field-mask for more details. |

### `artifactregistry.projects.locations.updateVpcscConfig`

- Versions: v1
- `PATCH https://artifactregistry.googleapis.com/v1/{+name}`
- Updates the VPCSC Config for the Project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VPCSCConfig`; Response: `VPCSCConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the project's VPC SC Config. Always of the form: projects/{projectID}/locations/{location}/vpcscConfig In update request: never set In response: always set |
| `updateMask` | query | string (google-fieldmask) | no | Field mask to support partial updates. |

### `artifactregistry.projects.updateProjectSettings`

- Versions: v1, v1beta2
- `PATCH https://artifactregistry.googleapis.com/v1/{+name}`
- Updates the Settings for the Project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ProjectSettings`; Response: `ProjectSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the project's settings. Always of the form: projects/{project-id}/projectSettings In update request: never set In response: always set |
| `updateMask` | query | string (google-fieldmask) | no | Field mask to support partial updates. |

### Example request skeleton

Generated from the Discovery entry of `artifactregistry.projects.getProjectSettings` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://artifactregistry.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2, v1beta1 of `artifactregistry` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`artifactregistry` v1, revision 20261031) also lists 47 endpoints of the form `https://artifactregistry.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://artifactregistry.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://artifactregistry.africa-south1.rep.googleapis.com/`) and keep the path.
- Source: https://artifactregistry.googleapis.com/$discovery/rest?version=v1, https://artifactregistry.googleapis.com/$discovery/rest?version=v1beta2, https://artifactregistry.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
