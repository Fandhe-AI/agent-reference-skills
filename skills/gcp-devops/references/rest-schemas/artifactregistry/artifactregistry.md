---
source: https://artifactregistry.googleapis.com/$discovery/rest?version=v1
---

# Artifact Registry API message schemas (artifactregistry)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/artifactregistry/`.

### `AptArtifact`

- A detailed representation of an Apt artifact. Information in the record is derived from the archive's control file. See https://www.debian.org/doc/debian-policy/ch-controlfields.html
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string | Output only. Operating system architecture of the artifact. |
| `component` | string | Output only. Repository component of the artifact. |
| `controlFile` | string (byte) | Output only. Contents of the artifact's control metadata file. |
| `name` | string | Output only. The Artifact Registry resource name of the artifact. |
| `packageName` | string | Output only. The Apt package name of the artifact. |
| `packageType` | string enum | Output only. An artifact is a binary or source package. Values: `PACKAGE_TYPE_UNSPECIFIED`, `BINARY`, `SOURCE`. |

### `AptRepository`

- Configuration for an Apt remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customRepository` | GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryCustomRepository | Customer-specified remote repository. |
| `publicRepository` | GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryPublicRepository | One of the publicly available Apt repositories supported by Artifact Registry. |

### `Attachment`

- An Attachment refers to additional metadata that can be attached to artifacts in Artifact Registry. An attachment consists of one or more files.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. User annotations. These attributes can only be set and used by the user, and not by Artifact Registry. See https://google.aip.dev/128#annotations for more details such as format and size limitations. |
| `attachmentNamespace` | string | The namespace this attachment belongs to. E.g. If an attachment is created by artifact analysis, namespace is set to `artifactanalysis.googleapis.com`. |
| `createTime` | string (google-datetime) | Output only. The time when the attachment was created. |
| `files` | array<string> | Required. The files that belong to this attachment. If the file ID part contains slashes, they are escaped. E.g. `projects/p1/locations/us-central1/repositories/repo1/files/sha:`. |
| `name` | string | The name of the attachment. E.g. `projects/p1/locations/us/repositories/repo/attachments/sbom`. |
| `ociVersionName` | string | Output only. The name of the OCI version that this attachment created. Only populated for Docker attachments. E.g. `projects/p1/locations/us-central1/repositories/repo1/packages/p1/versions/v1`. |
| `target` | string | Required. The target the attachment is for, can be a Version, Package or Repository. E.g. `projects/p1/locations/us-central1/repositories/repo1/packages/p1/versions/v1`. |
| `type` | string | Type of attachment. E.g. `application/vnd.spdx+json` |
| `updateTime` | string (google-datetime) | Output only. The time when the attachment was last updated. |

### `BatchDeleteVersionsMetadata`

- The metadata of an LRO from deleting multiple versions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failedVersions` | array<string> | The versions the operation failed to delete. |

### `BatchDeleteVersionsRequest`

- The request to delete multiple versions across a repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `names` | array<string> | Required. The names of the versions to delete. The maximum number of versions deleted per batch is determined by the service and is dependent on the available resources in the region. |
| `validateOnly` | boolean | If true, the request is performed without deleting data, following AIP-163. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CheckPrewarmedArtifactRequest`

- The request for checking an artifact for streaming.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `streamLocation` | string | Optional. The location of the prewarmed artifact. multi-region is not supported for this field. |
| `tag` | string | Optional. The artifact tag Format:projects/{project}/locations/{location}/repositories/{repository}/packages/{package}/tags/{tag} |
| `version` | string | Optional. The artifact version Format: projects/{project}/locations/{location}/repositories/{repository}/packages/{package}/versions/{version} |

### `CheckPrewarmedArtifactResponse`

- The response for checking an artifact for streaming.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `prewarmedArtifact` | PrewarmedArtifact | The prewarmed artifact that was checked. |

### `CleanupPolicy`

- Artifact policy configuration for repository cleanup policies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Policy action. Values: `ACTION_UNSPECIFIED`, `DELETE`, `KEEP`. |
| `condition` | CleanupPolicyCondition | Policy condition for matching versions. |
| `id` | string | The user-provided ID of the cleanup policy. |
| `mostRecentVersions` | CleanupPolicyMostRecentVersions | Policy condition for retaining a minimum number of versions. May only be specified with a Keep action. |

### `CleanupPolicyCondition`

- CleanupPolicyCondition is a set of conditions attached to a CleanupPolicy. If multiple entries are set, all must be satisfied for the condition to be satisfied.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `newerThan` | string (google-duration) | Match versions newer than a duration. |
| `olderThan` | string (google-duration) | Match versions older than a duration. |
| `packageNamePrefixes` | array<string> | Match versions by package prefix. Applied on any prefix match. |
| `tagPrefixes` | array<string> | Match versions by tag prefix. Applied on any prefix match. |
| `tagState` | string enum | Match versions by tag status. Values: `TAG_STATE_UNSPECIFIED`, `TAGGED`, `UNTAGGED`, `ANY`. |
| `versionNamePrefixes` | array<string> | Match versions by version name prefix. Applied on any prefix match. |

### `CleanupPolicyMostRecentVersions`

- CleanupPolicyMostRecentVersions is an alternate condition of a CleanupPolicy for retaining a minimum number of versions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keepCount` | integer (int32) | Minimum number of versions to keep. |
| `packageNamePrefixes` | array<string> | List of package name prefixes that will apply this rule. |

### `CommonRemoteRepository`

- Common remote repository settings type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | Required. A common public repository base for remote repository. |

### `DockerImage`

- DockerImage represents a docker artifact. The following fields are returned as untyped metadata in the Version resource, using camelcase keys (i.e. metadata.imageSizeBytes): \* imageSizeBytes \* mediaType \* buildTime
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactType` | string | ArtifactType of this image, e.g. "application/vnd.example+type". If the `subject_digest` is set and no `artifact_type` is given, the `media_type` will be considered as the `artifact_type`. This field is returned as the `metadata.artifactType` field in the Version resource. |
| `buildTime` | string (google-datetime) | The time this image was built. This field is returned as the 'metadata.buildTime' field in the Version resource. The build time is returned to the client as an RFC 3339 string, which can be easily used with the JavaScript Date constructor. |
| `imageManifests` | array<ImageManifest> | Optional. For multi-arch images (manifest lists), this field contains the list of image manifests. |
| `imageSizeBytes` | string (int64) | Calculated size of the image. This field is returned as the 'metadata.imageSizeBytes' field in the Version resource. |
| `mediaType` | string | Media type of this image, e.g. "application/vnd.docker.distribution.manifest.v2+json". This field is returned as the 'metadata.mediaType' field in the Version resource. |
| `name` | string | Required. registry_location, project_id, repository_name and image id forms a unique image name:`projects//locations//repositories//dockerImages/`. For example, "projects/test-project/locations/us-west4/repositories/test-repo/dockerImages/ nginx@sha256:e9954c1fc875017be1c3e36eca16be2d9e9bccc4bf072163515467d6a823c7cf", where "us-west4" is the registry_location, "test-project" is the project_id, "test-repo" is the repository_name and "nginx@sha256:e9954c1fc875017be1c3e36eca16be2d9e9bccc4bf072163515467d6a823c7cf" is the image's digest. |
| `tags` | array<string> | Tags attached to this image. |
| `updateTime` | string (google-datetime) | Output only. The time when the docker image was last updated. |
| `uploadTime` | string (google-datetime) | Time the image was uploaded. |
| `uri` | string | Required. URL to access the image. Example: us-west4-docker.pkg.dev/test-project/test-repo/nginx@sha256:e9954c1fc875017be1c3e36eca16be2d9e9bccc4bf072163515467d6a823c7cf |

### `DockerRepository`

- Configuration for a Docker remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customRepository` | GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigDockerRepositoryCustomRepository | Customer-specified remote repository. |
| `publicRepository` | string enum | One of the publicly available Docker repositories supported by Artifact Registry. Values: `PUBLIC_REPOSITORY_UNSPECIFIED`, `DOCKER_HUB`. |

### `DockerRepositoryConfig`

- DockerRepositoryConfig is docker related repository details. Provides additional configuration details for repositories of the docker format type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `immutableTags` | boolean | The repository which enabled this flag prevents all tags from being modified, moved or deleted. This does not prevent tags from being created. |

### `DownloadFileResponse`

- The response to download a file.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ExportArtifactMetadata`

- The LRO metadata for exporting an artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exportedFiles` | array<ExportedFile> | The exported artifact files. |

### `ExportArtifactRequest`

- The request for exporting an artifact to a destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcsPath` | string | The Cloud Storage path to export the artifact to. Should start with the bucket name, and optionally have a directory path. Examples: `dst_bucket`, `dst_bucket/sub_dir`. Existing objects with the same path will be overwritten. |
| `sourceTag` | string | The artifact tag to export. Format:projects/{project}/locations/{location}/repositories/{repository}/packages/{package}/tags/{tag} |
| `sourceVersion` | string | The artifact version to export. Format: projects/{project}/locations/{location}/repositories/{repository}/packages/{package}/versions/{version} |

### `ExportArtifactResponse`

- The response for exporting an artifact to a destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exportedVersion` | Version | The exported version. Should be the same as the request version with fingerprint resource name. |

### `ExportedFile`

- The exported artifact file.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcsObjectPath` | string | Cloud Storage Object path of the exported file. Examples: `dst_bucket/file1`, `dst_bucket/sub_dir/file1` |
| `hashes` | array<Hash> | The hashes of the file content. |
| `name` | string | Name of the exported artifact file. Format: `projects/p1/locations/us/repositories/repo1/files/file1` |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `File`

- Files store content that is potentially associated with Packages or Versions.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the File was created. |
| `hashes` | array<Hash> | The hashes of the file content. |
| `name` | string | The name of the file, for example: `projects/p1/locations/us-central1/repositories/repo1/files/a%2Fb%2Fc.txt`. If the file ID part contains slashes, they are escaped. |
| `owner` | string | The name of the Package or Version that owns this file, if any. |
| `sizeBytes` | string (int64) | The size of the File in bytes. |
| `updateTime` | string (google-datetime) | Output only. The time when the File was last updated. |

### `GenericArtifact`

- GenericArtifact represents a generic artifact
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the Generic module is created. |
| `name` | string | Resource name of the generic artifact. project, location, repository, package_id and version_id create a unique generic artifact. i.e. "projects/test-project/locations/us-west4/repositories/test-repo/ genericArtifacts/package_id:version_id" |
| `updateTime` | string (google-datetime) | Output only. The time when the Generic module is updated. |
| `version` | string | The version of the generic artifact. |

### `GoModule`

- GoModule represents a Go module.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the Go module is created. |
| `name` | string | The resource name of a Go module. |
| `updateTime` | string (google-datetime) | Output only. The time when the Go module is updated. |
| `version` | string | The version of the Go module. Must be a valid canonical version as defined in https://go.dev/ref/mod#glos-canonical-version. |

### `GoogetArtifact`

- A detailed representation of a GooGet artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string | Output only. Operating system architecture of the artifact. |
| `name` | string | Output only. The Artifact Registry resource name of the artifact. |
| `packageName` | string | Output only. The GooGet package name of the artifact. |

### `GoogleDevtoolsArtifactregistryV1File`

- Files store content that is potentially associated with Packages or Versions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Client specified annotations. |
| `createTime` | string (google-datetime) | Output only. The time when the File was created. |
| `fetchTime` | string (google-datetime) | Output only. The time when the last attempt to refresh the file's data was made. Only set when the repository is remote. |
| `hashes` | array<Hash> | The hashes of the file content. |
| `name` | string | The name of the file, for example: `projects/p1/locations/us-central1/repositories/repo1/files/a%2Fb%2Fc.txt`. If the file ID part contains slashes, they are escaped. |
| `owner` | string | The name of the Package or Version that owns this file, if any. |
| `sizeBytes` | string (int64) | The size of the File in bytes. |
| `updateTime` | string (google-datetime) | Output only. The time when the File was last updated. |

### `GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryCustomRepository`

- Customer-specified publicly available remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | An https uri reference to the upstream remote repository, for ex: "https://my.apt.registry/". |

### `GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigAptRepositoryPublicRepository`

- Publicly available Apt repositories constructed from a common repository base and a custom repository path.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `repositoryBase` | string enum | A common public repository base for Apt. Values: `REPOSITORY_BASE_UNSPECIFIED`, `DEBIAN`, `UBUNTU`, `DEBIAN_SNAPSHOT`. |
| `repositoryPath` | string | A custom field to define a path to a specific repository from the base. |

### `GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigDockerRepositoryCustomRepository`

- Customer-specified publicly available remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | An https uri reference to the custom remote repository, for ex: "https://registry-1.docker.io". |

### `GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigMavenRepositoryCustomRepository`

- Customer-specified publicly available remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | An https uri reference to the upstream remote repository, for ex: "https://my.maven.registry/". |

### `GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigNpmRepositoryCustomRepository`

- Customer-specified publicly available remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | An https uri reference to the upstream remote repository, for ex: "https://my.npm.registry/". |

### `GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigPythonRepositoryCustomRepository`

- Customer-specified publicly available remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | An https uri reference to the upstream remote repository, for ex: "https://my.python.registry/". |

### `GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryCustomRepository`

- Customer-specified publicly available remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | An https uri reference to the upstream remote repository, for ex: "https://my.yum.registry/". |

### `GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryPublicRepository`

- Publicly available Yum repositories constructed from a common repository base and a custom repository path.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `repositoryBase` | string enum | A common public repository base for Yum. Values: `REPOSITORY_BASE_UNSPECIFIED`, `CENTOS`, `CENTOS_DEBUG`, `CENTOS_VAULT`, `CENTOS_STREAM`, `ROCKY`, `EPEL`. |
| `repositoryPath` | string | A custom field to define a path to a specific repository from the base. |

### `GoogleDevtoolsArtifactregistryV1Rule`

- A rule defines the deny or allow action of the operation it applies to and the conditions required for the rule to apply. You can set one rule for an entire repository and one rule for each package within.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | The action this rule takes. Values: `ACTION_UNSPECIFIED`, `ALLOW`, `DENY`. |
| `condition` | Expr | Optional. A CEL expression for conditions that must be met in order for the rule to apply. If not provided, the rule matches all objects. |
| `name` | string | The name of the rule, for example: `projects/p1/locations/us-central1/repositories/repo1/rules/rule1`. |
| `operation` | string enum | — Values: `OPERATION_UNSPECIFIED`, `DOWNLOAD`. |
| `packageId` | string | The package ID the rule applies to. If empty, this rule applies to all packages inside the repository. |

### `GoogleDevtoolsArtifactregistryV1beta2File`

- Files store content that is potentially associated with Packages or Versions.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the File was created. |
| `hashes` | array<Hash> | The hashes of the file content. |
| `name` | string | The name of the file, for example: `projects/p1/locations/us-central1/repositories/repo1/files/a%2Fb%2Fc.txt`. If the file ID part contains slashes, they are escaped. |
| `owner` | string | The name of the Package or Version that owns this file, if any. |
| `sizeBytes` | string (int64) | The size of the File in bytes. |
| `updateTime` | string (google-datetime) | Output only. The time when the File was last updated. |

### `Hash`

- A hash of file content.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | The algorithm used to compute the hash value. Values: `HASH_TYPE_UNSPECIFIED`, `SHA256`, `MD5`, `DIRSUM_SHA256`. |
| `value` | string (byte) | The hash value. |

### `ImageManifest`

- Details of a single image manifest within a multi-arch image.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string | Optional. The CPU architecture of the image. Values are provided by the Docker client and are not validated by Artifact Registry. Example values include "amd64", "arm64", "ppc64le", "s390x", "riscv64", "mips64le", etc. |
| `digest` | string | Optional. The manifest digest, in the format "sha256:". |
| `mediaType` | string | Optional. The media type of the manifest, e.g., "application/vnd.docker.distribution.manifest.v2+json" |
| `os` | string | Optional. The operating system of the image. Values are provided by the Docker client and are not validated by Artifact Registry. Example values include "linux", "windows", "darwin", "aix", etc. |
| `osFeatures` | array<string> | Optional. The required OS features for the image, for example on Windows `win32k`. |
| `osVersion` | string | Optional. The OS version of the image, for example on Windows `10.0.14393.1066`. |
| `variant` | string | Optional. The variant of the CPU in the image, for example `v7` to specify ARMv7 when architecture is `arm`. |

### `ImportAptArtifactsErrorInfo`

- Error information explaining why a package was not imported.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | Status | The detailed error status. |
| `gcsSource` | ImportAptArtifactsGcsSource | Google Cloud Storage location requested. |

### `ImportAptArtifactsGcsSource`

- Google Cloud Storage location where the artifacts currently reside.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uris` | array<string> | Cloud Storage paths URI (e.g., gs://my_bucket//my_object). |
| `useWildcards` | boolean | Supports URI wildcards for matching multiple objects from a single URI. |

### `ImportAptArtifactsMetadata`

- The operation metadata for importing artifacts.
- Version: v1

### `ImportAptArtifactsRequest`

- The request to import new apt artifacts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcsSource` | ImportAptArtifactsGcsSource | Google Cloud Storage location where input content is located. |

### `ImportAptArtifactsResponse`

- The response message from importing APT artifacts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aptArtifacts` | array<AptArtifact> | The Apt artifacts imported. |
| `errors` | array<ImportAptArtifactsErrorInfo> | Detailed error info for packages that were not imported. |

### `ImportGoogetArtifactsErrorInfo`

- Error information explaining why a package was not imported.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | Status | The detailed error status. |
| `gcsSource` | ImportGoogetArtifactsGcsSource | Google Cloud Storage location requested. |

### `ImportGoogetArtifactsGcsSource`

- Google Cloud Storage location where the artifacts currently reside.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uris` | array<string> | Cloud Storage paths URI (e.g., `gs://my_bucket/my_object`). |
| `useWildcards` | boolean | Supports URI wildcards for matching multiple objects from a single URI. |

### `ImportGoogetArtifactsMetadata`

- The operation metadata for importing artifacts.
- Version: v1

### `ImportGoogetArtifactsRequest`

- The request to import new googet artifacts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcsSource` | ImportGoogetArtifactsGcsSource | Google Cloud Storage location where input content is located. |

### `ImportGoogetArtifactsResponse`

- The response message from importing artifacts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errors` | array<ImportGoogetArtifactsErrorInfo> | Detailed error info for packages that were not imported. |
| `googetArtifacts` | array<GoogetArtifact> | The GooGet artifacts updated. |

### `ImportYumArtifactsErrorInfo`

- Error information explaining why a package was not imported.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | Status | The detailed error status. |
| `gcsSource` | ImportYumArtifactsGcsSource | Google Cloud Storage location requested. |

### `ImportYumArtifactsGcsSource`

- Google Cloud Storage location where the artifacts currently reside.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uris` | array<string> | Cloud Storage paths URI (e.g., gs://my_bucket//my_object). |
| `useWildcards` | boolean | Supports URI wildcards for matching multiple objects from a single URI. |

### `ImportYumArtifactsMetadata`

- The operation metadata for importing artifacts.
- Version: v1

### `ImportYumArtifactsRequest`

- The request to import new yum artifacts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcsSource` | ImportYumArtifactsGcsSource | Google Cloud Storage location where input content is located. |

### `ImportYumArtifactsResponse`

- The response message from importing YUM artifacts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errors` | array<ImportYumArtifactsErrorInfo> | Detailed error info for packages that were not imported. |
| `yumArtifacts` | array<YumArtifact> | The yum artifacts imported. |

### `KfpArtifact`

- A detailed representation of a KFP artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. Resource name of the KFP artifact. Since users don't directly interact with this resource, the name will be derived from the associated version. For example, when version = ".../versions/sha256:abcdef...", the name will be ".../kfpArtifacts/sha256:abcdef...". |
| `version` | string | The version associated with the KFP artifact. Must follow the Semantic Versioning standard. |

### `ListAttachmentsResponse`

- The response from listing attachments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachments` | array<Attachment> | The attachments returned. |
| `nextPageToken` | string | The token to retrieve the next page of attachments, or empty if there are no more attachments to return. |

### `ListDockerImagesResponse`

- The response from listing docker images.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dockerImages` | array<DockerImage> | The docker images returned. |
| `nextPageToken` | string | The token to retrieve the next page of artifacts, or empty if there are no more artifacts to return. |

### `ListFilesResponse`

- The response from listing files.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `files` | array<GoogleDevtoolsArtifactregistryV1File> | The files returned. |
| `nextPageToken` | string | The token to retrieve the next page of files, or empty if there are no more files to return. |

### `ListFilesResponse` (v1beta1)

- The response from listing files.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `files` | array<File> | The files returned. |
| `nextPageToken` | string | The token to retrieve the next page of files, or empty if there are no more files to return. |

### `ListFilesResponse` (v1beta2)

- The response from listing files.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `files` | array<GoogleDevtoolsArtifactregistryV1beta2File> | The files returned. |
| `nextPageToken` | string | The token to retrieve the next page of files, or empty if there are no more files to return. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListMavenArtifactsResponse`

- The response from listing maven artifacts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mavenArtifacts` | array<MavenArtifact> | The maven artifacts returned. |
| `nextPageToken` | string | The token to retrieve the next page of artifacts, or empty if there are no more artifacts to return. |

### `ListNpmPackagesResponse`

- The response from listing npm packages.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token to retrieve the next page of artifacts, or empty if there are no more artifacts to return. |
| `npmPackages` | array<NpmPackage> | The npm packages returned. |

### `ListPackagesResponse`

- The response from listing packages.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token to retrieve the next page of packages, or empty if there are no more packages to return. |
| `packages` | array<Package> | The packages returned. |

### `ListPrewarmedArtifactsResponse`

- The response for listing artifacts for streaming.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token to retrieve the next page of prewarmed artifacts, or empty if there are no more streamings to return. |
| `prewarmedArtifacts` | array<PrewarmedArtifact> | The prewarmed artifacts. |

### `ListPythonPackagesResponse`

- The response from listing python packages.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token to retrieve the next page of artifacts, or empty if there are no more artifacts to return. |
| `pythonPackages` | array<PythonPackage> | The python packages returned. |

### `ListRepositoriesResponse`

- The response from listing repositories.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token to retrieve the next page of repositories, or empty if there are no more repositories to return. |
| `repositories` | array<Repository> | The repositories returned. |

### `ListRulesResponse`

- The response from listing rules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token to retrieve the next page of rules, or empty if there are no more rules to return. |
| `rules` | array<GoogleDevtoolsArtifactregistryV1Rule> | The rules returned. |

### `ListTagsResponse`

- The response from listing tags.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token to retrieve the next page of tags, or empty if there are no more tags to return. |
| `tags` | array<Tag> | The tags returned. |

### `ListVersionsResponse`

- The response from listing versions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token to retrieve the next page of versions, or empty if there are no more versions to return. |
| `versions` | array<Version> | The versions returned. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `MavenArtifact`

- MavenArtifact represents a maven artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactId` | string | Artifact ID for the artifact. |
| `createTime` | string (google-datetime) | Output only. Time the artifact was created. |
| `groupId` | string | Group ID for the artifact. Example: com.google.guava |
| `name` | string | Required. registry_location, project_id, repository_name and maven_artifact forms a unique artifact For example, "projects/test-project/locations/us-west4/repositories/test-repo/mavenArtifacts/ com.google.guava:guava:31.0-jre", where "us-west4" is the registry_location, "test-project" is the project_id, "test-repo" is the repository_name and "com.google.guava:guava:31.0-jre" is the maven artifact. |
| `pomUri` | string | Required. URL to access the pom file of the artifact. Example: us-west4-maven.pkg.dev/test-project/test-repo/com/google/guava/guava/31.0/guava-31.0.pom |
| `updateTime` | string (google-datetime) | Output only. Time the artifact was updated. |
| `version` | string | Version of this artifact. |

### `MavenRepository`

- Configuration for a Maven remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customRepository` | GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigMavenRepositoryCustomRepository | Customer-specified remote repository. |
| `publicRepository` | string enum | One of the publicly available Maven repositories supported by Artifact Registry. Values: `PUBLIC_REPOSITORY_UNSPECIFIED`, `MAVEN_CENTRAL`. |

### `MavenRepositoryConfig`

- MavenRepositoryConfig is maven related repository details. Provides additional configuration details for repositories of the maven format type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowSnapshotOverwrites` | boolean | The repository with this flag will allow publishing the same snapshot versions. |
| `versionPolicy` | string enum | Version policy defines the versions that the registry will accept. Values: `VERSION_POLICY_UNSPECIFIED`, `RELEASE`, `SNAPSHOT`. |

### `NoCacheFetching`

- The configuration for the no-cache fetching mode, which acts as a non-caching proxy.
- Version: v1

### `NpmPackage`

- NpmPackage represents an npm artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time the package was created. |
| `name` | string | Required. registry_location, project_id, repository_name and npm_package forms a unique package For example, "projects/test-project/locations/us-west4/repositories/test-repo/npmPackages/ npm_test:1.0.0", where "us-west4" is the registry_location, "test-project" is the project_id, "test-repo" is the repository_name and npm_test:1.0.0" is the npm package. |
| `packageName` | string | Package for the artifact. |
| `tags` | array<string> | Tags attached to this package. |
| `updateTime` | string (google-datetime) | Output only. Time the package was updated. |
| `version` | string | Version of this package. |

### `NpmRepository`

- Configuration for a Npm remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customRepository` | GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigNpmRepositoryCustomRepository | Customer-specified remote repository. |
| `publicRepository` | string enum | One of the publicly available Npm repositories supported by Artifact Registry. Values: `PUBLIC_REPOSITORY_UNSPECIFIED`, `NPMJS`. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Metadata type for longrunning-operations, currently empty.
- Version: v1

### `Package`

- Packages are named collections of versions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Client specified annotations. |
| `createTime` | string (google-datetime) | The time when the package was created. |
| `displayName` | string | The display name of the package. |
| `name` | string | The name of the package, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1`. If the package ID part contains slashes, the slashes are escaped. |
| `updateTime` | string (google-datetime) | The time when the package was last updated. This includes publishing a new version of the package. |

### `Package` (v1beta1)

- Packages are named collections of versions.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The time when the package was created. |
| `displayName` | string | The display name of the package. |
| `name` | string | The name of the package, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1`. If the package ID part contains slashes, the slashes are escaped. |
| `updateTime` | string (google-datetime) | The time when the package was last updated. This includes publishing a new version of the package. |

### `PlatformLogsConfig`

- The platform logs config for a project or a repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `loggingState` | string enum | Optional. The state of the platform logs: enabled or disabled. Values: `LOGGING_STATE_UNSPECIFIED`, `ENABLED`, `DISABLED`. |
| `severityLevel` | string enum | Optional. The severity level for the logs. Logs will be generated if their severity level is >= than the value of the severity level mentioned here. Values: `SEVERITY_LEVEL_UNSPECIFIED`, `DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY`. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PrewarmArtifactRequest`

- The request for prewarming an artifact for streaming.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `force` | boolean | Optional. If true, old artifact will be evicted to make room for the new artifact. |
| `platform` | PrewarmPlatform | Optional. The platform (architecture and OS) of the image or tag. |
| `retentionDays` | string (int64) | Optional. The retention days of the prewarmed artifact. If not specified, the artifact will be cached for 3 days. |
| `streamLocation` | string | Optional. The location to cache the artifact in. If not specified, the artifact will be cached in the same location as the artifact. multi-region is not supported for this field. |
| `tag` | string | Optional. The artifact tag Format:projects/{project}/locations/{location}/repositories/{repository}/packages/{package}/tags/{tag} |
| `version` | string | Optional. The artifact version Format: projects/{project}/locations/{location}/repositories/{repository}/packages/{package}/versions/{version} |

### `PrewarmArtifactResponse`

- The response for prewarming an artifact for streaming.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `prewarmedArtifact` | PrewarmedArtifact | The prewarmed artifact that was prewarmed. |

### `PrewarmPlatform`

- The platform (architecture and OS) of the image. This is a sub-message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string | Optional. The architecture of the image or tag. For example, "arm64" or "amd64". |
| `os` | string | Optional. The OS of the image or tag. For example, "linux" or "windows". |

### `PrewarmedArtifact`

- PrewarmedArtifact represents a streamed artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the artifact was first prewarmed. |
| `errorMessage` | string | Output only. The error message if the state is `FAILED`. |
| `expirationTime` | string (google-datetime) | The expiration time of the prewarmed artifact. |
| `location` | string | The location of the prewarmed artifact. |
| `sizeBytes` | string (int64) | Output only. The compressed size of the prewarmed artifact in bytes. This is the size counted against the prewarm storage quota. |
| `state` | string enum | Output only. The caching state of the prewarmed artifact. Values: `STATE_UNSPECIFIED`, `CACHING`, `ACTIVE`, `FAILED`. |
| `uri` | string | URL to access the image. Example: us-west4-docker.pkg.dev/test-project/test-repo/nginx@sha256:e9954c1fc875017be1c3e36eca16be2d9e9bccc4bf072163515467d6a823c7cf |

### `ProjectConfig`

- The Artifact Registry logging configurations that apply to a Project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The name of the project's configuration. Always of the form: projects/{project}/locations/{location}/projectConfig |
| `platformLogsConfig` | PlatformLogsConfig | Optional. Configuration for platform logs. |

### `ProjectSettings`

- The Artifact Registry settings that apply to a Project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `legacyRedirectionState` | string enum | The redirection state of the legacy repositories in this project. Values: `REDIRECTION_STATE_UNSPECIFIED`, `REDIRECTION_FROM_GCR_IO_DISABLED`, `REDIRECTION_FROM_GCR_IO_ENABLED`, `REDIRECTION_FROM_GCR_IO_FINALIZED`, `REDIRECTION_FROM_GCR_IO_ENABLED_AND_COPYING`, `REDIRECTION_FROM_GCR_IO_PARTIAL_AND_COPYING`. |
| `name` | string | The name of the project's settings. Always of the form: projects/{project-id}/projectSettings In update request: never set In response: always set |
| `pullPercent` | integer (int32) | The percentage of pull traffic to redirect from GCR to AR when using partial redirection. |

### `PythonPackage`

- PythonPackage represents a python artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time the package was created. |
| `name` | string | Required. registry_location, project_id, repository_name and python_package forms a unique package name:`projects//locations//repository//pythonPackages/`. For example, "projects/test-project/locations/us-west4/repositories/test-repo/pythonPackages/ python_package:1.0.0", where "us-west4" is the registry_location, "test-project" is the project_id, "test-repo" is the repository_name and python_package:1.0.0" is the python package. |
| `packageName` | string | Package for the artifact. |
| `updateTime` | string (google-datetime) | Output only. Time the package was updated. |
| `uri` | string | Required. URL to access the package. Example: us-west4-python.pkg.dev/test-project/test-repo/python_package/file-name-1.0.0.tar.gz |
| `version` | string | Version of this package. |

### `PythonRepository`

- Configuration for a Python remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customRepository` | GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigPythonRepositoryCustomRepository | Customer-specified remote repository. |
| `publicRepository` | string enum | One of the publicly available Python repositories supported by Artifact Registry. Values: `PUBLIC_REPOSITORY_UNSPECIFIED`, `PYPI`. |

### `RemoteRepositoryConfig`

- Remote repository configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aptRepository` | AptRepository | Specific settings for an Apt remote repository. |
| `commonRepository` | CommonRemoteRepository | Common remote repository settings. Used as the remote repository upstream URL. |
| `description` | string | The description of the remote source. |
| `disableUpstreamValidation` | boolean | Input only. A create/update remote repo option to avoid making a HEAD/GET request to validate a remote repo and any supplied upstream credentials. |
| `dockerRepository` | DockerRepository | Specific settings for a Docker remote repository. |
| `mavenRepository` | MavenRepository | Specific settings for a Maven remote repository. |
| `noCache` | NoCacheFetching | The remote repository will act as a non-caching proxy. |
| `npmRepository` | NpmRepository | Specific settings for an Npm remote repository. |
| `pythonRepository` | PythonRepository | Specific settings for a Python remote repository. |
| `upstreamCredentials` | UpstreamCredentials | Optional. The credentials used to access the remote repository. |
| `yumRepository` | YumRepository | Specific settings for a Yum remote repository. |

### `RemovePrewarmedArtifactRequest`

- The request for removing an artifact from streaming.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `streamLocation` | string | Optional. The location of the prewarmed artifact. multi-region is not supported for this field. |
| `tag` | string | Optional. The artifact tag Format:projects/{project}/locations/{location}/repositories/{repository}/packages/{package}/tags/{tag} |
| `version` | string | Optional. The artifact version Format: projects/{project}/locations/{location}/repositories/{repository}/packages/{package}/versions/{version} |

### `RemovePrewarmedArtifactResponse`

- The response for removing an artifact from streaming.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `prewarmedArtifact` | PrewarmedArtifact | The prewarmed artifact that was removed. |

### `Repository`

- A Repository for storing artifacts with a specific format.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cleanupPolicies` | object | Optional. Cleanup policies for this repository. Cleanup policies indicate when certain package versions can be automatically deleted. Map keys are policy IDs supplied by users during policy creation. They must unique within a repository and be under 128 characters in length. |
| `cleanupPolicyDryRun` | boolean | Optional. If true, the cleanup pipeline is prevented from deleting versions in this repository. |
| `createTime` | string (google-datetime) | Output only. The time when the repository was created. |
| `description` | string | The user-provided description of the repository. |
| `disallowUnspecifiedMode` | boolean | Optional. If this is true, an unspecified repo type will be treated as error rather than defaulting to standard. |
| `dockerConfig` | DockerRepositoryConfig | Docker repository config contains repository level configuration for the repositories of docker type. |
| `format` | string enum | Optional. The format of packages that are stored in the repository. Values: `FORMAT_UNSPECIFIED`, `DOCKER`, `MAVEN`, `NPM`, `APT`, `YUM`, `GOOGET`, `PYTHON`, `KFP`, `GO`, `GENERIC`, `RUBY`, `CONDA`. |
| `kmsKeyName` | string | The Cloud KMS resource name of the customer managed encryption key that's used to encrypt the contents of the Repository. Has the form: `projects/my-project/locations/my-region/keyRings/my-kr/cryptoKeys/my-key`. This value may not be changed after the Repository has been created. |
| `labels` | object | Labels with user-defined metadata. This field may contain up to 64 entries. Label keys and values may be no longer than 63 characters. Label keys must begin with a lowercase letter and may only contain lowercase letters, numeric characters, underscores, and dashes. |
| `mavenConfig` | MavenRepositoryConfig | Maven repository config contains repository level configuration for the repositories of maven type. |
| `mode` | string enum | Optional. The mode of the repository. Values: `MODE_UNSPECIFIED`, `STANDARD_REPOSITORY`, `VIRTUAL_REPOSITORY`, `REMOTE_REPOSITORY`, `AOSS_REPOSITORY`, `ASSURED_OSS_REPOSITORY`. |
| `name` | string | The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. For each location in a project, repository names must be unique. |
| `platformLogsConfig` | PlatformLogsConfig | Optional. Configuration for platform logs. |
| `registryUri` | string | Output only. The repository endpoint, for example: `us-docker.pkg.dev/my-proj/my-repo`. |
| `remoteRepositoryConfig` | RemoteRepositoryConfig | Configuration specific for a Remote Repository. |
| `satisfiesPzi` | boolean | Output only. Whether or not this repository satisfies PZI. |
| `satisfiesPzs` | boolean | Output only. Whether or not this repository satisfies PZS. |
| `sizeBytes` | string (int64) | Output only. The size, in bytes, of all artifact storage in this repository. Repositories that are generally available or in public preview use this to calculate storage costs. |
| `updateTime` | string (google-datetime) | Output only. The time when the repository was last updated. |
| `virtualRepositoryConfig` | VirtualRepositoryConfig | Configuration specific for a Virtual Repository. |
| `vulnerabilityScanningConfig` | VulnerabilityScanningConfig | Optional. Config and state for vulnerability scanning of resources within this Repository. |

### `Repository` (v1beta1)

- A Repository for storing artifacts with a specific format.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the repository was created. |
| `description` | string | The user-provided description of the repository. |
| `format` | string enum | Optional. The format of packages that are stored in the repository. Values: `FORMAT_UNSPECIFIED`, `DOCKER`, `MAVEN`, `NPM`, `APT`, `YUM`, `GOOGET`, `PYTHON`. |
| `kmsKeyName` | string | The Cloud KMS resource name of the customer managed encryption key that's used to encrypt the contents of the Repository. Has the form: `projects/my-project/locations/my-region/keyRings/my-kr/cryptoKeys/my-key`. This value may not be changed after the Repository has been created. |
| `labels` | object | Labels with user-defined metadata. This field may contain up to 64 entries. Label keys and values may be no longer than 63 characters. Label keys must begin with a lowercase letter and may only contain lowercase letters, numeric characters, underscores, and dashes. |
| `name` | string | The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. For each location in a project, repository names must be unique. |
| `satisfiesPzi` | boolean | Output only. Whether or not this repository satisfies PZI. |
| `satisfiesPzs` | boolean | Output only. Whether or not this repository satisfies PZS. |
| `sizeBytes` | string (int64) | Output only. The size, in bytes, of all artifact storage in this repository. Repositories that are generally available or in public preview use this to calculate storage costs. |
| `updateTime` | string (google-datetime) | Output only. The time when the repository was last updated. |

### `Repository` (v1beta2)

- A Repository for storing artifacts with a specific format.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the repository was created. |
| `description` | string | The user-provided description of the repository. |
| `format` | string enum | Optional. The format of packages that are stored in the repository. Values: `FORMAT_UNSPECIFIED`, `DOCKER`, `MAVEN`, `NPM`, `APT`, `YUM`, `GOOGET`, `PYTHON`. |
| `kmsKeyName` | string | The Cloud KMS resource name of the customer managed encryption key that's used to encrypt the contents of the Repository. Has the form: `projects/my-project/locations/my-region/keyRings/my-kr/cryptoKeys/my-key`. This value may not be changed after the Repository has been created. |
| `labels` | object | Labels with user-defined metadata. This field may contain up to 64 entries. Label keys and values may be no longer than 63 characters. Label keys must begin with a lowercase letter and may only contain lowercase letters, numeric characters, underscores, and dashes. |
| `mavenConfig` | MavenRepositoryConfig | Maven repository config contains repository level configuration for the repositories of maven type. |
| `name` | string | The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. For each location in a project, repository names must be unique. |
| `satisfiesPzi` | boolean | Output only. Whether or not this repository satisfies PZI. |
| `satisfiesPzs` | boolean | Output only. Whether or not this repository satisfies PZS. |
| `sizeBytes` | string (int64) | Output only. The size, in bytes, of all artifact storage in this repository. Repositories that are generally available or in public preview use this to calculate storage costs. |
| `updateTime` | string (google-datetime) | Output only. The time when the repository was last updated. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Tag`

- Tags point to a version and represent an alternative name that can be used to access the version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the tag, for example: "projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/tags/tag1". If the package part contains slashes, the slashes are escaped. The tag part can only have characters in \[a-zA-Z0-9\-.\_~:@\], anything else must be URL encoded. |
| `version` | string | The name of the version the tag refers to, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/sha256:5243811` If the package or version ID parts contain slashes, the slashes are escaped. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `UploadAptArtifactMediaResponse`

- The response to upload an artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operation` | Operation | Operation to be returned to the user. |

### `UploadAptArtifactMetadata`

- The operation metadata for uploading artifacts.
- Version: v1

### `UploadAptArtifactRequest`

- The request to upload an artifact.
- Version: v1

### `UploadAptArtifactResponse`

- The response of the completed artifact upload operation. This response is contained in the Operation and available to users.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aptArtifacts` | array<AptArtifact> | The Apt artifacts updated. |

### `UploadFileMediaResponse`

- The response to upload a generic artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operation` | Operation | Operation that will be returned to the user. |

### `UploadFileRequest`

- The request to upload a file.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileId` | string | Optional. The ID of the file. If left empty will default to sha256 digest of the content uploaded. |
| `fileType` | string enum | Optional. The type of the file to upload. Defaulting to ATTACHMENT if not specified. Values: `ATTACHMENT`, `ARTIFACT`. |

### `UploadGenericArtifactMediaResponse`

- The response to upload a generic artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operation` | Operation | Operation that will be returned to the user. |

### `UploadGenericArtifactMetadata`

- The operation metadata for uploading generic artifacts.
- Version: v1

### `UploadGenericArtifactRequest`

- The request to upload a generic artifact. The created GenericArtifact will have the resource name {parent}/genericArtifacts/package_id:version_id. The created file will have the resource name {parent}/files/package_id:version_id:filename.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filename` | string | The name of the file of the generic artifact to be uploaded. E.g. `example-file.zip` The filename is limited to letters, numbers, and url safe characters, i.e. \[a-zA-Z0-9-\_.~@\]. |
| `packageId` | string | The ID of the package of the generic artifact. If the package does not exist, a new package will be created. The `package_id` should start and end with a letter or number, only contain letters, numbers, hyphens, underscores, and periods, and not exceed 256 characters. |
| `versionAnnotations` | object | Optional. Client specified annotations to attach to the version upon creation. This field is only applied if the Version is created during this upload. If the Version already exists and this field is set, the request will fail. |
| `versionId` | string | The ID of the version of the generic artifact. If the version does not exist, a new version will be created. The version_id must start and end with a letter or number, can only contain lowercase letters, numbers, the following characters \[-.+~:\], i.e.\[a-z0-9-.+~:\] and cannot exceed a total of 128 characters. Creating a version called `latest` is not allowed. |

### `UploadGoModuleMediaResponse`

- The response to upload a Go module.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operation` | Operation | Operation to be returned to the user. |

### `UploadGoModuleMetadata`

- The operation metadata for uploading go modules.
- Version: v1

### `UploadGoModuleRequest`

- The request to upload a Go module.
- Version: v1

### `UploadGoogetArtifactMediaResponse`

- The response to upload an artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operation` | Operation | Operation to be returned to the user. |

### `UploadGoogetArtifactMetadata`

- The operation metadata for uploading artifacts.
- Version: v1

### `UploadGoogetArtifactRequest`

- The request to upload an artifact.
- Version: v1

### `UploadGoogetArtifactResponse`

- The response of the completed artifact upload operation. This response is contained in the Operation and available to users.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `googetArtifacts` | array<GoogetArtifact> | The GooGet artifacts updated. |

### `UploadKfpArtifactMediaResponse`

- The response to upload an artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operation` | Operation | Operation that will be returned to the user. |

### `UploadKfpArtifactMetadata`

- The operation metadata for uploading KFP artifacts.
- Version: v1

### `UploadKfpArtifactRequest`

- The request to upload an artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of the package version. |
| `tags` | array<string> | Tags to be created with the version. |

### `UploadYumArtifactMediaResponse`

- The response to upload an artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operation` | Operation | Operation to be returned to the user. |

### `UploadYumArtifactMetadata`

- The operation metadata for uploading artifacts.
- Version: v1

### `UploadYumArtifactRequest`

- The request to upload an artifact.
- Version: v1

### `UploadYumArtifactResponse`

- The response of the completed artifact upload operation. This response is contained in the Operation and available to users.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `yumArtifacts` | array<YumArtifact> | The Yum artifacts updated. |

### `UpstreamCredentials`

- The credentials to access the remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `usernamePasswordCredentials` | UsernamePasswordCredentials | Use username and password to access the remote repository. |

### `UpstreamPolicy`

- Artifact policy configuration for the repository contents.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | The user-provided ID of the upstream policy. |
| `priority` | integer (int32) | Entries with a greater priority value take precedence in the pull order. |
| `repository` | string | A reference to the repository resource, for example: `projects/p1/locations/us-central1/repositories/repo1`. |

### `UsernamePasswordCredentials`

- Username and password credentials.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `passwordSecretVersion` | string | The Secret Manager key version that holds the password to access the remote repository. Must be in the format of `projects/{project}/secrets/{secret}/versions/{version}`. |
| `username` | string | The username to access the remote repository. |

### `VPCSCConfig`

- The Artifact Registry VPC SC config that apply to a Project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the project's VPC SC Config. Always of the form: projects/{projectID}/locations/{location}/vpcscConfig In update request: never set In response: always set |
| `vpcscPolicy` | string enum | The project per location VPC SC policy that defines the VPC SC behavior for the Remote Repository (Allow/Deny). Values: `VPCSC_POLICY_UNSPECIFIED`, `DENY`, `ALLOW`. |

### `Version`

- The body of a version resource. A version resource represents a collection of components, such as files and other data. This may correspond to a version in many package management schemes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Client specified annotations. |
| `createTime` | string (google-datetime) | The time when the version was created. |
| `description` | string | Optional. Description of the version, as specified in its metadata. |
| `fingerprints` | array<Hash> | Output only. Immutable reference for the version, calculated based on the version's content. Currently we only support dirsum_sha256 hash algorithm. Additional hash algorithms may be added in the future. |
| `metadata` | object | Output only. Repository-specific Metadata stored against this version. The fields returned are defined by the underlying repository-specific resource. Currently, the resources could be: DockerImage MavenArtifact |
| `name` | string | The name of the version, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/art1`. If the package or version ID parts contain slashes, the slashes are escaped. |
| `relatedTags` | array<Tag> | Output only. A list of related tags. Will contain up to 100 tags that reference this version. |
| `updateTime` | string (google-datetime) | The time when the version was last updated. |

### `Version` (v1beta1)

- The body of a version resource. A version resource represents a collection of components, such as files and other data. This may correspond to a version in many package management schemes.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The time when the version was created. |
| `description` | string | Optional. Description of the version, as specified in its metadata. |
| `name` | string | The name of the version, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/art1`. If the package or version ID parts contain slashes, the slashes are escaped. |
| `relatedTags` | array<Tag> | Output only. A list of related tags. Will contain up to 100 tags that reference this version. |
| `updateTime` | string (google-datetime) | The time when the version was last updated. |

### `Version` (v1beta2)

- The body of a version resource. A version resource represents a collection of components, such as files and other data. This may correspond to a version in many package management schemes.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The time when the version was created. |
| `description` | string | Optional. Description of the version, as specified in its metadata. |
| `metadata` | object | Output only. Repository-specific Metadata stored against this version. The fields returned are defined by the underlying repository-specific resource. Currently, the resources could be: DockerImage MavenArtifact |
| `name` | string | The name of the version, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/art1`. If the package or version ID parts contain slashes, the slashes are escaped. |
| `relatedTags` | array<Tag> | Output only. A list of related tags. Will contain up to 100 tags that reference this version. |
| `updateTime` | string (google-datetime) | The time when the version was last updated. |

### `VirtualRepositoryConfig`

- Virtual repository configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `upstreamPolicies` | array<UpstreamPolicy> | Policies that configure the upstream artifacts distributed by the Virtual Repository. Upstream policies cannot be set on a standard repository. |

### `VulnerabilityScanningConfig`

- Config on whether to perform vulnerability scanning for resources in this repository, as well as output fields describing current state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enablementConfig` | string enum | Optional. Config for whether this repository has vulnerability scanning disabled. When unset (ENABLEMENT_CONFIG_UNSPECIFIED), this is treated as INHERITED for Docker repositories and DISABLED for non-Docker repositories. Values: `ENABLEMENT_CONFIG_UNSPECIFIED`, `INHERITED`, `DISABLED`. |
| `enablementState` | string enum | Output only. State of feature enablement, combining repository enablement config and API enablement state. Values: `ENABLEMENT_STATE_UNSPECIFIED`, `SCANNING_UNSUPPORTED`, `SCANNING_DISABLED`, `SCANNING_ACTIVE`. |
| `enablementStateReason` | string | Output only. Reason for the repository state. |
| `lastEnableTime` | string (google-datetime) | Output only. The last time this repository config was enabled. |

### `YumArtifact`

- A detailed representation of a Yum artifact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string | Output only. Operating system architecture of the artifact. |
| `name` | string | Output only. The Artifact Registry resource name of the artifact. |
| `packageName` | string | Output only. The yum package name of the artifact. |
| `packageType` | string enum | Output only. An artifact is a binary or source package. Values: `PACKAGE_TYPE_UNSPECIFIED`, `BINARY`, `SOURCE`. |

### `YumRepository`

- Configuration for a Yum remote repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customRepository` | GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryCustomRepository | Customer-specified remote repository. |
| `publicRepository` | GoogleDevtoolsArtifactregistryV1RemoteRepositoryConfigYumRepositoryPublicRepository | One of the publicly available Yum repositories supported by Artifact Registry. |

### Shape of `AptArtifact`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "architecture": "string",
  "component": "string",
  "controlFile": "string (byte)",
  "name": "string",
  "packageName": "string",
  "packageType": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2, v1beta1 of `artifactregistry` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the `PythonPackage.name` description gives the format `projects//locations//repository//pythonPackages/` (placeholders dropped, see below); the collection is `repositories`, as in the example of the same description and the artifactregistry.v1 Discovery path pattern `projects/[^/]+/locations/[^/]+/repositories/[^/]+/pythonPackages/[^/]+`.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://artifactregistry.googleapis.com/$discovery/rest?version=v1, https://artifactregistry.googleapis.com/$discovery/rest?version=v1beta2, https://artifactregistry.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
