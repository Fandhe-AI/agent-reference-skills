---
source:
  - https://dataform.googleapis.com/$discovery/rest?version=v1
  - https://dataform.googleapis.com/$discovery/rest?version=v1beta1
---

# Dataform API message schemas (dataform) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/dataform/`.

### `ActionErrorTable`

- Error table information, used to write error data into a BigQuery table.
- Version: v1

### `ActionIncrementalLoadMode`

- Load definition for incremental load modes
- Version: v1

### `ActionLoadConfig`

- Simplified load configuration for actions
- Version: v1

### `ActionSimpleLoadMode`

- Simple load definition
- Version: v1

### `ActionSqlDefinition`

- Definition of a SQL Data Preparation
- Version: v1

### `Assertion`

- Represents an assertion upon a SQL query which is required return zero rows.
- Version: v1

### `BigQueryAction`

- Represents a workflow action that will run against BigQuery.
- Version: v1

### `BigQueryUnitTest`

- Represents a BigQuery unit test.
- Version: v1

### `BigQueryUnitTestAction`

- Represents a workflow action that will run a BigQuery unit test.
- Version: v1

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

### `BranchMetadata`

- Contains metadata about a branch.
- Version: v1beta1

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CancelWorkflowInvocationRequest`

- `CancelWorkflowInvocation` request message.
- Version: v1

### `CancelWorkflowInvocationResponse`

- `CancelWorkflowInvocation` response message.
- Version: v1

### `CheckoutWorkspaceBranchRequest`

- `CheckoutWorkspaceBranch` request message.
- Version: v1beta1

### `CodeCompilationConfig`

- Configures various aspects of Dataform code compilation.
- Version: v1

### `ColumnDescriptor`

- Describes a column.
- Version: v1

### `CommitAuthor`

- Represents the author of a Git commit.
- Version: v1

### `CommitLogEntry`

- Represents a single commit log.
- Version: v1

### `CommitMetadata`

- Represents a Dataform Git commit.
- Version: v1

### `CommitRepositoryChangesRequest`

- `CommitRepositoryChanges` request message.
- Version: v1

### `CommitRepositoryChangesResponse`

- `CommitRepositoryChanges` response message.
- Version: v1

### `CommitWorkspaceChangesRequest`

- `CommitWorkspaceChanges` request message.
- Version: v1

### `CommitWorkspaceChangesResponse`

- `CommitWorkspaceChanges` response message.
- Version: v1

### `CompilationError`

- An error encountered when attempting to compile a Dataform project.
- Version: v1

### `CompilationResult`

- Represents the result of compiling a Dataform project.
- Version: v1

### `CompilationResultAction`

- Represents a single Dataform action in a compilation result.
- Version: v1

### `ComputeRepositoryAccessTokenStatusResponse`

- `ComputeRepositoryAccessTokenStatus` response message.
- Version: v1

### `Config`

- Config for all repositories in a given project and location.
- Version: v1

### `DataEncryptionState`

- Describes encryption state of a resource.
- Version: v1

### `DataPreparation`

- Defines a compiled Data Preparation entity
- Version: v1

### `DataPreparationAction`

- Represents a workflow action that will run a Data Preparation.
- Version: v1

### `Declaration`

- Represents a relation which is not managed by Dataform but which may be referenced by Dataform actions.
- Version: v1

### `DeleteBranchRequest`

- `DeleteBranch` request message.
- Version: v1beta1

### `DeleteBranchResponse`

- `DeleteBranch` response message.
- Version: v1beta1

### `DeleteFile`

- Represents the delete file operation.
- Version: v1

### `DeleteFolderTreeRequest`

- `DeleteFolderTree` request message.
- Version: v1

### `DeleteRepositoryLongRunningRequest`

- `DeleteRepositoryLongRunning` request message.
- Version: v1beta1

### `DeleteTeamFolderTreeRequest`

- `DeleteTeamFolderTree` request message.
- Version: v1

### `DirectoryEntry`

- Represents a single entry in a directory.
- Version: v1

### `DirectorySearchResult`

- Client-facing representation of a directory entry in search results.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EndUserAuthConfig`

- Includes configuration options for repository end user authentication.
- Version: v1

### `EndUserAuthenticationConfig`

- Includes configuration options for end user authentication.
- Version: v1

### `ErrorTable`

- Error table information, used to write error data into a BigQuery table.
- Version: v1

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

### `FetchCurrentWorkspaceBranchResponse`

- Response message for `FetchCurrentWorkspaceBranch` method.
- Version: v1beta1

### `FetchFileDiffResponse`

- `FetchFileDiff` response message.
- Version: v1

### `FetchFileGitStatusesResponse`

- `FetchFileGitStatuses` response message.
- Version: v1

### `FetchGitAheadBehindResponse`

- `FetchGitAheadBehind` response message.
- Version: v1

### `FetchRemoteBranchesResponse`

- `FetchRemoteBranches` response message.
- Version: v1

### `FetchRepositoryHistoryResponse`

- `FetchRepositoryHistory` response message.
- Version: v1

### `FetchWorkspaceBranchesResponse`

- Response message for `FetchWorkspaceBranches` method.
- Version: v1beta1

### `FetchWorkspaceHistoryResponse`

- `FetchWorkspaceHistory` response message.
- Version: v1beta1

### `FileOperation`

- Represents a single file operation to the repository.
- Version: v1

### `FileSearchResult`

- Client-facing representation of a file entry in search results.
- Version: v1

### `FilesystemEntryMetadata`

- Represents metadata for a single entry in a filesystem.
- Version: v1

### `Folder`

- Represents a Dataform Folder. This is a resource that is used to organize Files and other Folders and provide hierarchical access controls.
- Version: v1

### `FolderContentsEntry`

- Represents a single content entry.
- Version: v1

### `GcsRepositorySnapshotDestination`

- Configures the destination for a repository snapshot.
- Version: v1

### `GcsRepositorySnapshotMetadata`

- Metadata about a repository snapshot stored in Google Cloud Storage.
- Version: v1

### `GitRemoteSettings`

- Controls Git remote configuration for a repository.
- Version: v1

### `GitRemoteSettings` (v1beta1)

- Controls Git remote configuration for a repository.
- Version: v1beta1

### `IamPolicyOverrideView`

- Contains metadata about the IAM policy override for a given Dataform resource. If is_active is true, this the policy encoded in iam_policy_name is the source of truth for this resource. Will be provided in internal ESV2 views for: Workspaces, Repositories, Folders, TeamFolders.
- Version: v1

### `IncrementalLoadMode`

- Load definition for incremental load modes
- Version: v1

### `IncrementalTableConfig`

- Contains settings for relations of type `INCREMENTAL_TABLE`.
- Version: v1

### `InstallNpmPackagesRequest`

- `InstallNpmPackages` request message.
- Version: v1

### `InstallNpmPackagesResponse`

- `InstallNpmPackages` response message.
- Version: v1

### `Interval`

- Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.
- Version: v1

### `InvocationConfig`

- Includes various configuration options for a workflow invocation. If both `included_targets` and `included_tags` are unset, all actions will be included.
- Version: v1

### `ListCompilationResultsResponse`

- `ListCompilationResults` response message.
- Version: v1

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

### `ListReleaseConfigsResponse`

- `ListReleaseConfigs` response message.
- Version: v1

### `ListRepositoriesResponse`

- `ListRepositories` response message.
- Version: v1

### `ListWorkflowConfigsResponse`

- `ListWorkflowConfigs` response message.
- Version: v1

### `ListWorkflowInvocationsResponse`

- `ListWorkflowInvocations` response message.
- Version: v1

### `ListWorkspacesResponse`

- `ListWorkspaces` response message.
- Version: v1

### `LoadConfig`

- Simplified load configuration for actions
- Version: v1

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

### `MakeDirectoryRequest`

- `MakeDirectory` request message.
- Version: v1

### `MakeDirectoryResponse`

- `MakeDirectory` response message.
- Version: v1

### `MoveDirectoryRequest`

- `MoveDirectory` request message.
- Version: v1

### `MoveDirectoryResponse`

- `MoveDirectory` response message.
- Version: v1

### `MoveFileRequest`

- `MoveFile` request message.
- Version: v1

### `MoveFileResponse`

- `MoveFile` response message.
- Version: v1

### `MoveFolderRequest`

- `MoveFolder` request message.
- Version: v1

### `MoveRepositoryRequest`

- `MoveRepository` request message.
- Version: v1

### `Notebook`

- Represents a notebook.
- Version: v1

### `NotebookAction`

- Represents a workflow action that will run against a Notebook runtime.
- Version: v1

### `NotebookRuntimeOptions`

- Configures various aspects of Dataform notebook runtime.
- Version: v1

### `OAuthConfig`

- OAuth configuration for end user authentication.
- Version: v1

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

### `Operations`

- Represents a list of arbitrary database operations.
- Version: v1

### `PipelineConfig`

- Defines the pipeline type and path within the Git repository.
- Version: v1

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). The JSON and YAML examples of this description are shown below. For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

Adapted (not in the official docs): the JSON example of the Discovery `Policy` description, quoted as a JSON block; only the trailing comma after the `condition.expression` value is removed, so that the block is valid JSON (see Notes).

```json
{
  "bindings": [
    {
      "role": "roles/resourcemanager.organizationAdmin",
      "members": [
        "user:mike@example.com",
        "group:admins@example.com",
        "domain:google.com",
        "serviceAccount:my-project-id@appspot.gserviceaccount.com"
      ]
    },
    {
      "role": "roles/resourcemanager.organizationViewer",
      "members": [
        "user:eve@example.com"
      ],
      "condition": {
        "title": "expirable access",
        "description": "Does not grant access after Sep 2020",
        "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')"
      }
    }
  ],
  "etag": "BwWWja0YfJA=",
  "version": 3
}
```

YAML example from the description (line breaks and indentation restored from the source proto; see Notes):

```yaml
bindings:
- members:
  - user:mike@example.com
  - group:admins@example.com
  - domain:google.com
  - serviceAccount:my-project-id@appspot.gserviceaccount.com
  role: roles/resourcemanager.organizationAdmin
- members:
  - user:eve@example.com
  role: roles/resourcemanager.organizationViewer
  condition:
    title: expirable access
    description: Does not grant access after Sep 2020
    expression: request.time < timestamp('2020-10-01T00:00:00.000Z')
etag: BwWWja0YfJA=
version: 3
```

### `PolicyName`

- An internal name for an IAM policy, based on the resource to which the policy applies. Not to be confused with a resource's external full resource name. For more information on this distinction, see (internal link).
- Version: v1

### `PrivateResourceMetadata`

- Metadata used to identify if a resource is user scoped.
- Version: v1

### `PullGitCommitsRequest`

- `PullGitCommits` request message.
- Version: v1

### `PullGitCommitsResponse`

- `PullGitCommits` response message.
- Version: v1

### `PushGitCommitsRequest`

- `PushGitCommits` request message.
- Version: v1

### `PushGitCommitsResponse`

- `PushGitCommits` response message.
- Version: v1

### `QueryCompilationResultActionsResponse`

- `QueryCompilationResultActions` response message.
- Version: v1

### `QueryDirectoryContentsResponse`

- `QueryDirectoryContents` response message.
- Version: v1

### `QueryFolderContentsResponse`

- `QueryFolderContents` response message.
- Version: v1

### `QueryRepositoryDirectoryContentsResponse`

- `QueryRepositoryDirectoryContents` response message.
- Version: v1

### `QueryTeamFolderContentsResponse`

- `QueryTeamFolderContents` response message.
- Version: v1

### `QueryUserRootContentsResponse`

- `QueryUserRootContents` response message.
- Version: v1

### `QueryWorkflowInvocationActionsResponse`

- `QueryWorkflowInvocationActions` response message.
- Version: v1

### `ReadFileResponse`

- `ReadFile` response message.
- Version: v1

### `ReadRepositoryFileResponse`

- `ReadRepositoryFile` response message.
- Version: v1

### `Relation`

- Represents a database relation.
- Version: v1

### `RelationDescriptor`

- Describes a relation and its columns.
- Version: v1

### `ReleaseConfig`

- Represents a Dataform release configuration.
- Version: v1

### `RemoveDirectoryRequest`

- `RemoveDirectory` request message.
- Version: v1

### `RemoveDirectoryResponse`

- `RemoveDirectory` response message.
- Version: v1

### `RemoveFileRequest`

- `RemoveFile` request message.
- Version: v1

### `RemoveFileResponse`

- `RemoveFile` response message.
- Version: v1

### `Repository`

- Represents a Dataform Git repository.
- Version: v1

### `ResetWorkspaceChangesRequest`

- `ResetWorkspaceChanges` request message.
- Version: v1

### `ResetWorkspaceChangesResponse`

- `ResetWorkspaceChanges` response message.
- Version: v1

### `RootContentsEntry`

- Represents a single content entry.
- Version: v1

### `ScheduledExecutionRecord`

- A record of an attempt to create a workflow invocation for this workflow config.
- Version: v1

### `ScheduledReleaseRecord`

- A record of an attempt to create a compilation result for this release config.
- Version: v1

### `SearchFilesResponse`

- Client-facing representation of a file search response.
- Version: v1

### `SearchResult`

- Client-facing representation of a search result entry.
- Version: v1

### `SearchTeamFoldersResponse`

- `SearchTeamFolders` response message.
- Version: v1

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

### `SimpleLoadMode`

- Simple load definition
- Version: v1

### `SqlDefinition`

- Definition of a SQL Data Preparation
- Version: v1

### `SshAuthenticationConfig`

- Configures fields for performing SSH authentication.
- Version: v1

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

### `SyncWorkspaceRefsRequest`

- `SyncWorkspaceRefs` request message.
- Version: v1beta1

### `SyncWorkspaceRefsResponse`

- `SyncWorkspaceRefs` response message.
- Version: v1beta1

### `TableUpdateTrigger`

- Represents a table update trigger configuration.
- Version: v1beta1

### `Target`

- Represents an action identifier. If the action writes output, the output will be written to the referenced database object.
- Version: v1

### `TeamFolder`

- Represents a Dataform TeamFolder. This is a resource that sits at the project level and is used to organize Repositories and Folders with hierarchical access controls. They provide a team context and stricter access controls.
- Version: v1

### `TeamFolderContentsEntry`

- Represents a single content entry.
- Version: v1

### `TeamFolderSearchResult`

- Represents a single content entry.
- Version: v1

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

### `TriggerEvaluationRecord`

- A record of an attempt to evaluate trigger conditions.
- Version: v1beta1

### `UncommittedFileChange`

- Represents the Git state of a file with uncommitted changes.
- Version: v1

### `WorkflowConfig`

- Represents a Dataform workflow configuration.
- Version: v1

### `WorkflowConfig` (v1beta1)

- Represents a Dataform workflow configuration.
- Version: v1beta1

### `WorkflowInvocation`

- Represents a single invocation of a compilation result.
- Version: v1

### `WorkflowInvocationAction`

- Represents a single action in a workflow invocation.
- Version: v1

### `WorkflowTrigger`

- The trigger definition to invoke a workflow.
- Version: v1beta1

### `WorkflowTriggerConfig`

- Represents a trigger configuration for a workflow.
- Version: v1beta1

### `Workspace`

- Represents a Dataform Git workspace.
- Version: v1

### Shape of `ActionErrorTable`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "retentionDays": "integer (int32)",
  "target": "Target"
}
```

### Example `ActionErrorTable` value

Generated from the field types (not in the official docs): a JSON value that matches the table, with empty strings, `0`, `false`, empty arrays and objects, and for an enum its first value other than `*_UNSPECIFIED`. int64 values are JSON strings, as in the Discovery `format`. It shows the JSON shape only; it is not a request to send as is (fill in the values the method needs, and omit output-only fields in requests).

```json
{
  "retentionDays": 0,
  "target": {}
}
```

## Options / Props

### `ActionErrorTable` fields

| Field | Type | Description |
|---|---|---|
| `retentionDays` | integer (int32) | Error table partition expiration in days. Only positive values are allowed. |
| `target` | Target | Error Table target. |

### `ActionIncrementalLoadMode` fields

| Field | Type | Description |
|---|---|---|
| `column` | string | Column name for incremental load modes |

### `ActionLoadConfig` fields

| Field | Type | Description |
|---|---|---|
| `append` | ActionSimpleLoadMode | Append into destination table Mutually exclusive with `replace`, `maximum`, `unique` (proto `oneof mode`; set at most one; see Notes). |
| `maximum` | ActionIncrementalLoadMode | Insert records where the value exceeds the previous maximum value for a column in the destination table Mutually exclusive with `replace`, `append`, `unique` (proto `oneof mode`; set at most one; see Notes). |
| `replace` | ActionSimpleLoadMode | Replace destination table Mutually exclusive with `append`, `maximum`, `unique` (proto `oneof mode`; set at most one; see Notes). |
| `unique` | ActionIncrementalLoadMode | Insert records where the value of a column is not already present in the destination table Mutually exclusive with `replace`, `append`, `maximum` (proto `oneof mode`; set at most one; see Notes). |

### `ActionSqlDefinition` fields

| Field | Type | Description |
|---|---|---|
| `errorTable` | ActionErrorTable | Error table configuration, |
| `loadConfig` | ActionLoadConfig | Load configuration. |
| `query` | string | The SQL query representing the data preparation steps. Formatted as a Pipe SQL query statement. |

### `Assertion` fields

| Field | Type | Description |
|---|---|---|
| `dependencyTargets` | `array<Target>` | A list of actions that this action depends on. |
| `disabled` | boolean | Whether this action is disabled (i.e. should not be run). |
| `parentAction` | Target | The parent action of this assertion. Only set if this assertion was automatically generated. |
| `relationDescriptor` | RelationDescriptor | Descriptor for the assertion's automatically-generated view and its columns. |
| `selectQuery` | string | The SELECT query which must return zero rows in order for this assertion to succeed. |
| `tags` | `array<string>` | Arbitrary, user-defined tags on this action. |

### `BigQueryAction` fields

| Field | Type | Description |
|---|---|---|
| `jobId` | string | Output only. The ID of the BigQuery job that executed the SQL in sql_script. Only set once the job has started to run. |
| `sqlScript` | string | Output only. The generated BigQuery SQL script that will be executed. |

### `BigQueryUnitTest` fields

| Field | Type | Description |
|---|---|---|
| `dependencyTargets` | `array<Target>` | A list of actions that this action depends on. |
| `disabled` | boolean | Whether this action is disabled (i.e. should not be run). |
| `displayName` | string | The name of the unit test. |
| `expectedOutputQuery` | string | Expected output query to compare against the test query. |
| `tags` | `array<string>` | Arbitrary, user-defined tags on this action. |
| `testQuery` | string | Test query to execute. |

### `BigQueryUnitTestAction` fields

| Field | Type | Description |
|---|---|---|
| `actualResultsJobId` | string | Output only. Job ID for the actual results. |
| `actualResultsSqlScript` | string | Output only. SQL script for the actual results. |
| `expectedResultsJobId` | string | Output only. Job ID for the expected results. |
| `expectedResultsSqlScript` | string | Output only. SQL script for the expected results. |
| `totalBilledBytes` | string (int64) | Output only. Total bytes billed for this action. Combined total for actual and expected jobs. |
| `totalProcessedBytes` | string (int64) | Output only. Total bytes processed for this action. Combined total for actual and expected jobs. |

### `Binding` fields

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | `array<string>` | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `BranchMetadata` fields

| Field | Type | Description |
|---|---|---|
| `branchName` | string | The branch name. |
| `lastCommit` | CommitLogEntry | The last commit on the branch. |

### `CheckoutWorkspaceBranchRequest` fields

| Field | Type | Description |
|---|---|---|
| `branch` | string | Required. The name of the branch in the Git repository to which the workspace should be checked out. |
| `createIfNotExists` | boolean | Optional. If set to true and the branch does not exist, it will be created. Otherwise, an error will be thrown. |
| `sourceBranch` | string | Optional. The name of the branch in the Git repository from which the new branch should be created. If left unset, the workspace's current branch name will be used. Accepts only branch names from FetchWorkspaceBranches response, and can only be set if `create_if_not_exists` is true. Oherwise, an error will be thrown. |

### `CodeCompilationConfig` fields

| Field | Type | Description |
|---|---|---|
| `assertionSchema` | string | Optional. The default schema (BigQuery dataset ID) for assertions. |
| `builtinAssertionNamePrefix` | string | Optional. The prefix to prepend to built-in assertion names. |
| `databaseSuffix` | string | Optional. The suffix that should be appended to all database (Google Cloud project ID) names. |
| `defaultDatabase` | string | Optional. The default database (Google Cloud project ID). |
| `defaultLocation` | string | Optional. The default BigQuery location to use. Defaults to "US". See the BigQuery docs for a full list of locations: https://cloud.google.com/bigquery/docs/locations. |
| `defaultNotebookRuntimeOptions` | NotebookRuntimeOptions | Optional. The default notebook runtime options. |
| `defaultSchema` | string | Optional. The default schema (BigQuery dataset ID). |
| `pipelineConfig` | PipelineConfig | Optional. The pipeline options which defines the pipeline type and path within the Git repository. |
| `schemaSuffix` | string | Optional. The suffix that should be appended to all schema (BigQuery dataset ID) names. |
| `tablePrefix` | string | Optional. The prefix that should be prepended to all table names. |
| `vars` | `map<string, string>` | Optional. User-defined variables that are made available to project code during compilation. |

### `ColumnDescriptor` fields

| Field | Type | Description |
|---|---|---|
| `bigqueryPolicyTags` | `array<string>` | A list of BigQuery policy tags that will be applied to the column. |
| `description` | string | A textual description of the column. |
| `path` | `array<string>` | The identifier for the column. Each entry in `path` represents one level of nesting. |

### `CommitAuthor` fields

| Field | Type | Description |
|---|---|---|
| `emailAddress` | string | Required. The commit author's email address. |
| `name` | string | Required. The commit author's name. |

### `CommitLogEntry` fields

| Field | Type | Description |
|---|---|---|
| `author` | CommitAuthor | The commit author for this commit log entry. |
| `commitMessage` | string | The commit message for this commit log entry. |
| `commitSha` | string | The commit SHA for this commit log entry. |
| `commitTime` | string (google-datetime) | Commit timestamp. |

### `CommitMetadata` fields

| Field | Type | Description |
|---|---|---|
| `author` | CommitAuthor | Required. The commit's author. |
| `commitMessage` | string | Optional. The commit's message. |

### `CommitRepositoryChangesRequest` fields

| Field | Type | Description |
|---|---|---|
| `commitMetadata` | CommitMetadata | Required. The changes to commit to the repository. |
| `fileOperations` | `map<string, FileOperation>` | Optional. A map to the path of the file to the operation. The path is the full file path including filename, from repository root. |
| `requiredHeadCommitSha` | string | Optional. The commit SHA which must be the repository's current HEAD before applying this commit; otherwise this request will fail. If unset, no validation on the current HEAD commit SHA is performed. |

### `CommitRepositoryChangesResponse` fields

| Field | Type | Description |
|---|---|---|
| `commitSha` | string | The commit SHA of the current commit. |

### `CommitWorkspaceChangesRequest` fields

| Field | Type | Description |
|---|---|---|
| `author` | CommitAuthor | Required. The commit's author. |
| `commitMessage` | string | Optional. The commit's message. |
| `paths` | `array<string>` | Optional. Full file paths to commit including filename, rooted at workspace root. If left empty, all files will be committed. |

### `CompilationError` fields

| Field | Type | Description |
|---|---|---|
| `actionTarget` | Target | Output only. The identifier of the action where this error occurred, if available. |
| `message` | string | Output only. The error's top level message. |
| `path` | string | Output only. The path of the file where this error occurred, if available, relative to the project root. |
| `stack` | string | Output only. The error's full stack trace. |

### `CompilationResult` fields

| Field | Type | Description |
|---|---|---|
| `codeCompilationConfig` | CodeCompilationConfig | Immutable. If set, fields of `code_compilation_config` override the default compilation settings that are specified in dataform.json. |
| `compilationErrors` | `array<CompilationError>` | Output only. Errors encountered during project compilation. |
| `createTime` | string (google-datetime) | Output only. The timestamp of when the compilation result was created. |
| `dataEncryptionState` | DataEncryptionState | Output only. Only set if the repository has a KMS Key. |
| `dataformCoreVersion` | string | Output only. The version of `@dataform/core` that was used for compilation. |
| `gcsRepositorySnapshotMetadata` | GcsRepositorySnapshotMetadata | Output only. Metadata about the repository snapshot used by scheduled notebooks. |
| `gitCommitish` | string | Immutable. Git commit/tag/branch name at which the repository should be compiled. Must exist in the remote repository. Examples: - a commit SHA: `12ade345` - a tag: `tag1` - a branch name: `branch1` Mutually exclusive with `workspace`, `releaseConfig` (proto `oneof source`; set at most one; see Notes). |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `name` | string | Output only. The compilation result's name. |
| `privateResourceMetadata` | PrivateResourceMetadata | Output only. Metadata indicating whether this resource is user-scoped. `CompilationResult` resource is `user_scoped` only if it is sourced from a workspace. |
| `releaseConfig` | string | Immutable. The name of the release config to compile. Must be in the format `projects/*/locations/*/repositories/*/releaseConfigs/*`. Mutually exclusive with `gitCommitish`, `workspace` (proto `oneof source`; set at most one; see Notes). |
| `resolvedGitCommitSha` | string | Output only. The fully resolved Git commit SHA of the code that was compiled. Not set for compilation results whose source is a workspace. |
| `workspace` | string | Immutable. The name of the workspace to compile. Must be in the format `projects/*/locations/*/repositories/*/workspaces/*`. Mutually exclusive with `gitCommitish`, `releaseConfig` (proto `oneof source`; set at most one; see Notes). |

### `CompilationResultAction` fields

| Field | Type | Description |
|---|---|---|
| `assertion` | Assertion | The assertion executed by this action. Mutually exclusive with `relation`, `operations`, `declaration`, `notebook`, `dataPreparation`, `bigqueryUnitTest` (proto `oneof compiled_object`; set at most one; see Notes). |
| `bigqueryUnitTest` | BigQueryUnitTest | The unit test executed by this action. Mutually exclusive with `relation`, `operations`, `assertion`, `declaration`, `notebook`, `dataPreparation` (proto `oneof compiled_object`; set at most one; see Notes). |
| `canonicalTarget` | Target | The action's identifier if the project had been compiled without any overrides configured. Unique within the compilation result. |
| `dataPreparation` | DataPreparation | The data preparation executed by this action. Mutually exclusive with `relation`, `operations`, `assertion`, `declaration`, `notebook`, `bigqueryUnitTest` (proto `oneof compiled_object`; set at most one; see Notes). |
| `declaration` | Declaration | The declaration declared by this action. Mutually exclusive with `relation`, `operations`, `assertion`, `notebook`, `dataPreparation`, `bigqueryUnitTest` (proto `oneof compiled_object`; set at most one; see Notes). |
| `filePath` | string | The full path including filename in which this action is located, relative to the workspace root. |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `notebook` | Notebook | The notebook executed by this action. Mutually exclusive with `relation`, `operations`, `assertion`, `declaration`, `dataPreparation`, `bigqueryUnitTest` (proto `oneof compiled_object`; set at most one; see Notes). |
| `operations` | Operations | The database operations executed by this action. Mutually exclusive with `relation`, `assertion`, `declaration`, `notebook`, `dataPreparation`, `bigqueryUnitTest` (proto `oneof compiled_object`; set at most one; see Notes). |
| `relation` | Relation | The database relation created/updated by this action. Mutually exclusive with `operations`, `assertion`, `declaration`, `notebook`, `dataPreparation`, `bigqueryUnitTest` (proto `oneof compiled_object`; set at most one; see Notes). |
| `target` | Target | This action's identifier. Unique within the compilation result. |

### `ComputeRepositoryAccessTokenStatusResponse` fields

| Field | Type | Description |
|---|---|---|
| `tokenStatus` | string enum | Indicates the status of the Git access token. Values: `TOKEN_STATUS_UNSPECIFIED`, `NOT_FOUND`, `INVALID`, `VALID`, `PERMISSION_DENIED`. |

### `Config` fields

| Field | Type | Description |
|---|---|---|
| `defaultKmsKeyName` | string | Optional. The default KMS key that is used if no encryption key is provided when a repository is created. |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `name` | string | Identifier. The config name. |

### `DataEncryptionState` fields

| Field | Type | Description |
|---|---|---|
| `kmsKeyVersionName` | string | Required. The KMS key version name with which data of a resource is encrypted. |

### `DataPreparation` fields

| Field | Type | Description |
|---|---|---|
| `contentsSql` | SqlDefinition | SQL definition for a Data Preparation. Contains a SQL query and additional context information. Mutually exclusive with `contentsYaml` (proto `oneof definition`; set at most one; see Notes). |
| `contentsYaml` | string | The data preparation definition, stored as a YAML string. Mutually exclusive with `contentsSql` (proto `oneof definition`; set at most one; see Notes). |
| `dependencyTargets` | `array<Target>` | A list of actions that this action depends on. |
| `disabled` | boolean | Whether this action is disabled (i.e. should not be run). |
| `tags` | `array<string>` | Arbitrary, user-defined tags on this action. |

### `DataPreparationAction` fields

| Field | Type | Description |
|---|---|---|
| `contentsSql` | ActionSqlDefinition | SQL definition for a Data Preparation. Contains a SQL query and additional context information. Mutually exclusive with `contentsYaml` (proto `oneof definition`; set at most one; see Notes). |
| `contentsYaml` | string | Output only. YAML representing the contents of the data preparation. Can be used to show the customer what the input was to their workflow. Mutually exclusive with `contentsSql` (proto `oneof definition`; set at most one; see Notes). |
| `generatedSql` | string | Output only. The generated BigQuery SQL script that will be executed. For reference only. |
| `jobId` | string | Output only. The ID of the BigQuery job that executed the SQL in sql_script. Only set once the job has started to run. |

### `Declaration` fields

| Field | Type | Description |
|---|---|---|
| `relationDescriptor` | RelationDescriptor | Descriptor for the relation and its columns. Used as documentation only, i.e. values here will result in no changes to the relation's metadata. |

### `DeleteBranchRequest` fields

| Field | Type | Description |
|---|---|---|
| `branch` | string | Required. The name of the branch in the Git repository to delete. |
| `force` | boolean | Optional. If set to true, any non-pushed commits on the branch will be deleted. Upstream branch name will be the same as the branch to delete. |

### `DeleteFolderTreeRequest` fields

| Field | Type | Description |
|---|---|---|
| `force` | boolean | Optional. If `false` (default): The operation will fail if any Repository within the folder hierarchy has associated Release Configs or Workflow Configs. If `true`: The operation will attempt to delete everything, including any Release Configs and Workflow Configs linked to Repositories within the folder hierarchy. This permanently removes schedules and resources. |

### `DeleteRepositoryLongRunningRequest` fields

| Field | Type | Description |
|---|---|---|
| `force` | boolean | Optional. If set to true, child resources of this repository (compilation results and workflow invocations) will also be deleted. Otherwise, the request will only succeed if the repository has no child resources. \*\*Note:\*\* \*This flag doesn't support deletion of workspaces, release configs or workflow configs. If any of such resources exists in the repository, the request will fail.\* |

### `DeleteTeamFolderTreeRequest` fields

| Field | Type | Description |
|---|---|---|
| `force` | boolean | Optional. If `false` (default): The operation will fail if any Repository within the folder hierarchy has associated Release Configs or Workflow Configs. If `true`: The operation will attempt to delete everything, including any Release Configs and Workflow Configs linked to Repositories within the folder hierarchy. This permanently removes schedules and resources. |

### `DirectoryEntry` fields

| Field | Type | Description |
|---|---|---|
| `directory` | string | A child directory in the directory. The path is returned including the full folder structure from the root. Mutually exclusive with `file` (proto `oneof entry`; set at most one; see Notes). |
| `file` | string | A file in the directory. The path is returned including the full folder structure from the root. Mutually exclusive with `directory` (proto `oneof entry`; set at most one; see Notes). |
| `metadata` | FilesystemEntryMetadata | Entry with metadata. |

### `DirectorySearchResult` fields

| Field | Type | Description |
|---|---|---|
| `path` | string | File system path relative to the workspace root. |

### `EndUserAuthConfig` fields

| Field | Type | Description |
|---|---|---|
| `oauthConfig` | OAuthConfig | Optional. OAuth configuration for repository end user authentication. |

### `EndUserAuthenticationConfig` fields

| Field | Type | Description |
|---|---|---|
| `oauthConfig` | OAuthConfig | Optional. OAuth configuration for end user authentication. |
| `userEmail` | string | Output only. Email address of the user to run workflow invocations under. |

### `ErrorTable` fields

| Field | Type | Description |
|---|---|---|
| `retentionDays` | integer (int32) | Error table partition expiration in days. Only positive values are allowed. |
| `target` | Target | Error Table target. |

### `Expr` fields

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FetchCurrentWorkspaceBranchResponse` fields

| Field | Type | Description |
|---|---|---|
| `branchName` | string | The name of the current branch for the workspace. |

### `FetchFileDiffResponse` fields

| Field | Type | Description |
|---|---|---|
| `formattedDiff` | string | The raw formatted Git diff for the file. |

### `FetchFileGitStatusesResponse` fields

| Field | Type | Description |
|---|---|---|
| `uncommittedFileChanges` | `array<UncommittedFileChange>` | A list of all files which have uncommitted Git changes. There will only be a single entry for any given file. |

### `FetchGitAheadBehindResponse` fields

| Field | Type | Description |
|---|---|---|
| `commitsAhead` | integer (int32) | The number of commits in the remote branch that are not in the workspace. |
| `commitsBehind` | integer (int32) | The number of commits in the workspace that are not in the remote branch. |

### `FetchRemoteBranchesResponse` fields

| Field | Type | Description |
|---|---|---|
| `branches` | `array<string>` | The remote repository's branch names. |

### `FetchRepositoryHistoryResponse` fields

| Field | Type | Description |
|---|---|---|
| `commits` | `array<CommitLogEntry>` | A list of commit logs, ordered by 'git log' default order. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |

### `FetchWorkspaceBranchesResponse` fields

| Field | Type | Description |
|---|---|---|
| `branches` | `array<BranchMetadata>` | The branches in the workspace. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |

### `FetchWorkspaceHistoryResponse` fields

| Field | Type | Description |
|---|---|---|
| `commits` | `array<CommitLogEntry>` | A list of commit logs, ordered by 'git log' default order. |
| `nextPageToken` | string | Optional. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |
| `reachesShallowBoundary` | boolean | Whether this response reaches the shallow boundary of the repository. |

### `FileOperation` fields

| Field | Type | Description |
|---|---|---|
| `deleteFile` | DeleteFile | Represents the delete operation. Mutually exclusive with `writeFile` (proto `oneof operation`; set at most one; see Notes). |
| `writeFile` | WriteFile | Represents the write operation. Mutually exclusive with `deleteFile` (proto `oneof operation`; set at most one; see Notes). |

### `FileSearchResult` fields

| Field | Type | Description |
|---|---|---|
| `path` | string | File system path relative to the file tree root. |

### `FilesystemEntryMetadata` fields

| Field | Type | Description |
|---|---|---|
| `sizeBytes` | string (int64) | Output only. Provides the size of the entry in bytes. For directories, this will be 0. |
| `updateTime` | string (google-datetime) | Output only. Represents the time of the last modification of the entry. |

### `Folder` fields

| Field | Type | Description |
|---|---|---|
| `containingFolder` | string | Optional. The containing Folder resource name. This should take the format: projects/{project}/locations/{location}/folders/{folder}, projects/{project}/locations/{location}/teamFolders/{teamFolder}, or just "" if this is a root Folder. This field can only be updated through MoveFolder. |
| `createTime` | string (google-datetime) | Output only. The timestamp of when the Folder was created. |
| `creatorIamPrincipal` | string | Output only. The IAM principal identifier of the creator of the Folder. |
| `displayName` | string | Required. The Folder's user-friendly name. |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `name` | string | Identifier. The Folder's name. |
| `teamFolderName` | string | Output only. The resource name of the TeamFolder that this Folder is associated with. This should take the format: projects/{project}/locations/{location}/teamFolders/{teamFolder}. If this is not set, the Folder is not associated with a TeamFolder and is a UserFolder. |
| `updateTime` | string (google-datetime) | Output only. The timestamp of when the Folder was last updated. |

### `FolderContentsEntry` fields

| Field | Type | Description |
|---|---|---|
| `folder` | Folder | A subfolder. Mutually exclusive with `repository` (proto `oneof entry`; set at most one; see Notes). |
| `repository` | Repository | A repository. Mutually exclusive with `folder` (proto `oneof entry`; set at most one; see Notes). |

### `GcsRepositorySnapshotDestination` fields

| Field | Type | Description |
|---|---|---|
| `repositorySnapshotUri` | string | Optional. The Google Cloud Storage destination to upload the repository snapshot to. Format: `gs://bucket-name/path/`. |

### `GcsRepositorySnapshotMetadata` fields

| Field | Type | Description |
|---|---|---|
| `crc32cChecksum` | string | Output only. The crc32c checksum of the repository snapshot, big-endian base64 encoded. |
| `generation` | string (int64) | Output only. The generation number of the Cloud Storage object. See https://cloud.google.com/storage/docs/metadata#generation-number. |
| `repositorySnapshotUri` | string | Output only. The Google Cloud Storage URI of the repository snapshot. |

### `GitRemoteSettings` fields

| Field | Type | Description |
|---|---|---|
| `authenticationTokenSecretVersion` | string | Optional. The name of the Secret Manager secret version to use as an authentication token for Git operations. Must be in the format `projects/*/secrets/*/versions/*`. |
| `defaultBranch` | string | Optional. The Git remote's default branch name. If not set, `main` will be used. |
| `effectiveDefaultBranch` | string | Output only. The Git remote's effective default branch name. This is the default branch name of the Git remote if it is set, otherwise it is `main`. |
| `gitRepositoryLink` | string | Optional. Resource name for the `GitRepositoryLink` used for machine credentials. Must be in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*` |
| `sshAuthenticationConfig` | SshAuthenticationConfig | Optional. Authentication fields for remote uris using SSH protocol. |
| `tokenStatus` | string enum | Output only. Deprecated: The field does not contain any token status information. Values: `TOKEN_STATUS_UNSPECIFIED`, `NOT_FOUND`, `INVALID`, `VALID`. |
| `url` | string | Required. The Git remote's URL. |

### `GitRemoteSettings` (v1beta1) fields

| Field | Type | Description |
|---|---|---|
| `accountConnector` | string | Optional. Resource name for the Account Connector used for personal authentication. Must be in the format `projects/*/locations/*/accountConnectors/*` |
| `authenticationTokenSecretVersion` | string | Optional. The name of the Secret Manager secret version to use as an authentication token for Git operations. Must be in the format `projects/*/secrets/*/versions/*`. |
| `defaultBranch` | string | Optional. The Git remote's default branch name. If not set, `main` will be used. |
| `effectiveDefaultBranch` | string | Output only. The Git remote's effective default branch name. This is the default branch name of the Git remote if it is set, otherwise it is `main`. |
| `gitRepositoryLink` | string | Optional. Resource name for the `GitRepositoryLink` used for machine credentials. Must be in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*` |
| `sshAuthenticationConfig` | SshAuthenticationConfig | Optional. Authentication fields for remote uris using SSH protocol. |
| `tokenStatus` | string enum | Output only. Deprecated: The field does not contain any token status information. Instead use https://cloud.google.com/dataform/reference/rest/v1beta1/projects.locations.repositories/computeAccessTokenStatus Values: `TOKEN_STATUS_UNSPECIFIED`, `NOT_FOUND`, `INVALID`, `VALID`. |
| `url` | string | Required. The Git remote's URL. |

### `IamPolicyOverrideView` fields

| Field | Type | Description |
|---|---|---|
| `iamPolicyName` | PolicyName | The IAM policy name for the resource. |
| `isActive` | boolean | Whether the IAM policy encoded in this view is active. |

### `IncrementalLoadMode` fields

| Field | Type | Description |
|---|---|---|
| `column` | string | Column name for incremental load modes |

### `IncrementalTableConfig` fields

| Field | Type | Description |
|---|---|---|
| `incrementalPostOperations` | `array<string>` | SQL statements to be executed after inserting new rows into the relation. |
| `incrementalPreOperations` | `array<string>` | SQL statements to be executed before inserting new rows into the relation. |
| `incrementalSelectQuery` | string | The SELECT query which returns rows which should be inserted into the relation if it already exists and is not being refreshed. |
| `refreshDisabled` | boolean | Whether this table should be protected from being refreshed. |
| `uniqueKeyParts` | `array<string>` | A set of columns or SQL expressions used to define row uniqueness. If any duplicates are discovered (as defined by `unique_key_parts`), only the newly selected rows (as defined by `incremental_select_query`) will be included in the relation. |
| `updatePartitionFilter` | string | A SQL expression conditional used to limit the set of existing rows considered for a merge operation (see `unique_key_parts` for more information). |

### `InstallNpmPackagesRequest` fields

| Field | Type | Description |
|---|---|---|
| `pipelineConfig` | PipelineConfig | Optional. The pipeline options which defines the pipeline type and path within the Git repository. |

### `Interval` fields

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. |
| `startTime` | string (google-datetime) | Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. |

### `InvocationConfig` fields

| Field | Type | Description |
|---|---|---|
| `concurrentActionsLimit` | integer (int32) | Optional. Maximum number of actions that can be executed concurrently. |
| `endUserAuthConfig` | EndUserAuthenticationConfig | Optional. Configuration for end user authentication. Do not set if `service_account` is used. |
| `executionMode` | string enum | Optional. Specifies the execution mode for the workflow invocation. Values: `EXECUTION_MODE_UNSPECIFIED`, `DEFAULT`, `ALL_EXCEPT_UNIT_TESTS`, `UNIT_TESTS_ONLY`. |
| `fullyRefreshIncrementalTablesEnabled` | boolean | Optional. When set to true, any incremental tables will be fully refreshed. |
| `includedTags` | `array<string>` | Optional. The set of tags to include. |
| `includedTargets` | `array<Target>` | Optional. The set of action identifiers to include. |
| `queryPriority` | string enum | Optional. Specifies the priority for query execution in BigQuery. More information can be found at https://cloud.google.com/bigquery/docs/running-queries#queries. Values: `QUERY_PRIORITY_UNSPECIFIED`, `INTERACTIVE`, `BATCH`. |
| `serviceAccount` | string | Optional. The service account to run workflow invocations under. |
| `transitiveDependenciesIncluded` | boolean | Optional. When set to true, transitive dependencies of included actions will be executed. |
| `transitiveDependentsIncluded` | boolean | Optional. When set to true, transitive dependents of included actions will be executed. |

### `ListCompilationResultsResponse` fields

| Field | Type | Description |
|---|---|---|
| `compilationResults` | `array<CompilationResult>` | List of compilation results. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |
| `unreachable` | `array<string>` | Locations which could not be reached. |

### `ListLocationsResponse` fields

| Field | Type | Description |
|---|---|---|
| `locations` | `array<Location>` | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOperationsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | `array<Operation>` | A list of operations that matches the specified filter in the request. |
| `unreachable` | `array<string>` | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListReleaseConfigsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |
| `releaseConfigs` | `array<ReleaseConfig>` | List of release configs. |
| `unreachable` | `array<string>` | Locations which could not be reached. |

### `ListRepositoriesResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |
| `repositories` | `array<Repository>` | List of repositories. |
| `unreachable` | `array<string>` | Locations which could not be reached. |

### `ListWorkflowConfigsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |
| `unreachable` | `array<string>` | Locations which could not be reached. |
| `workflowConfigs` | `array<WorkflowConfig>` (definitions by version: [`WorkflowConfig` (v1)](#workflowconfig), [`WorkflowConfig` (v1beta1)](#workflowconfig-v1beta1)) | List of workflow configs. |

### `ListWorkflowInvocationsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |
| `unreachable` | `array<string>` | Locations which could not be reached. |
| `workflowInvocations` | `array<WorkflowInvocation>` | List of workflow invocations. |

### `ListWorkspacesResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |
| `unreachable` | `array<string>` | Locations which could not be reached. |
| `workspaces` | `array<Workspace>` (definitions by version: [`Workspace` (v1)](#workspace), [`Workspace` (v1beta1)](./dataform-2.md#workspace-v1beta1)) | List of workspaces. |

### `LoadConfig` fields

| Field | Type | Description |
|---|---|---|
| `append` | SimpleLoadMode | Append into destination table Mutually exclusive with `replace`, `maximum`, `unique` (proto `oneof mode`; set at most one; see Notes). |
| `maximum` | IncrementalLoadMode | Insert records where the value exceeds the previous maximum value for a column in the destination table Mutually exclusive with `replace`, `append`, `unique` (proto `oneof mode`; set at most one; see Notes). |
| `replace` | SimpleLoadMode | Replace destination table Mutually exclusive with `append`, `maximum`, `unique` (proto `oneof mode`; set at most one; see Notes). |
| `unique` | IncrementalLoadMode | Insert records where the value of a column is not already present in the destination table Mutually exclusive with `replace`, `append`, `maximum` (proto `oneof mode`; set at most one; see Notes). |

### `Location` fields

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | `map<string, string>` | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | `map<string, any>` | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `MakeDirectoryRequest` fields

| Field | Type | Description |
|---|---|---|
| `path` | string | Required. The directory's full path including directory name, relative to the workspace root. |

### `MoveDirectoryRequest` fields

| Field | Type | Description |
|---|---|---|
| `newPath` | string | Required. The new path for the directory including directory name, rooted at workspace root. |
| `path` | string | Required. The directory's full path including directory name, relative to the workspace root. |

### `MoveFileRequest` fields

| Field | Type | Description |
|---|---|---|
| `newPath` | string | Required. The file's new path including filename, relative to the workspace root. |
| `path` | string | Required. The file's full path including filename, relative to the workspace root. |

### `MoveFolderRequest` fields

| Field | Type | Description |
|---|---|---|
| `destinationContainingFolder` | string | Optional. The name of the Folder, TeamFolder, or root location to move the Folder to. Can be in the format of: "" to move into the root User folder, `projects/*/locations/*/folders/*`, `projects/*/locations/*/teamFolders/*` |

### `MoveRepositoryRequest` fields

| Field | Type | Description |
|---|---|---|
| `destinationContainingFolder` | string | Optional. The name of the Folder, TeamFolder, or root location to move the repository to. Can be in the format of: "" to move into the root User folder, `projects/*/locations/*/folders/*`, `projects/*/locations/*/teamFolders/*` |

### `Notebook` fields

| Field | Type | Description |
|---|---|---|
| `contents` | string | The contents of the notebook. |
| `dependencyTargets` | `array<Target>` | A list of actions that this action depends on. |
| `disabled` | boolean | Whether this action is disabled (i.e. should not be run). |
| `tags` | `array<string>` | Arbitrary, user-defined tags on this action. |

### `NotebookAction` fields

| Field | Type | Description |
|---|---|---|
| `contents` | string | Output only. The code contents of a Notebook to be run. |
| `filePath` | string | Output only. The path to the notebook file in the repository. |
| `jobId` | string | Output only. The ID of the Gemini Enterprise Agent Platform job that executed the notebook in contents and also the ID used for the outputs created in Google Cloud Storage buckets. Only set once the job has started to run. |

### `NotebookRuntimeOptions` fields

| Field | Type | Description |
|---|---|---|
| `aiPlatformNotebookRuntimeTemplate` | string | Optional. The resource name of the Colab runtime template (https://cloud.google.com/colab/docs/runtimes), from which a runtime is created for notebook executions. If not specified, a runtime is created with Colab's default specifications. |
| `gcsOutputBucket` | string | Optional. The Google Cloud Storage location to upload the result to. Format: `gs://bucket-name`. |
| `gcsRepositorySnapshotDestination` | GcsRepositorySnapshotDestination | Optional. The Google Cloud Storage destination to upload the snapshot to. For empty URI it defaults to the provided gcs_output_bucket. Format: `gs://bucket-name/path/`. |

### `OAuthConfig` fields

| Field | Type | Description |
|---|---|---|
| `additionalOauthScopes` | `array<string>` | Optional. Additional OAuth scopes to use for BigQuery executions. Scopes always in use: `https://www.googleapis.com/auth/bigquery` |

### `Operation` fields

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | `map<string, any>` | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | `map<string, any>` | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata` fields

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `cancelRequested` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `statusDetail` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Operations` fields

| Field | Type | Description |
|---|---|---|
| `dependencyTargets` | `array<Target>` | A list of actions that this action depends on. |
| `disabled` | boolean | Whether this action is disabled (i.e. should not be run). |
| `hasOutput` | boolean | Whether these operations produce an output relation. |
| `queries` | `array<string>` | A list of arbitrary SQL statements that will be executed without alteration. |
| `relationDescriptor` | RelationDescriptor | Descriptor for any output relation and its columns. Only set if `has_output` is true. |
| `tags` | `array<string>` | Arbitrary, user-defined tags on this action. |

### `PipelineConfig` fields

| Field | Type | Description |
|---|---|---|
| `path` | string | Required. The relative path within the Git repository where the pipeline is defined. For example, for a Dataform pipeline, it is a path to the folder where `workflow_settings.yaml` or `dataform.json` is located. |
| `pipelineType` | string enum | Required. The type of the pipeline. Values: `PIPELINE_TYPE_UNSPECIFIED`, `DATAFORM`, `SQL`, `NOTEBOOK`. |

### `Policy` fields

| Field | Type | Description |
|---|---|---|
| `bindings` | `array<Binding>` | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PolicyName` fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Identifies an instance of the type. ID format varies by type. The ID format is defined in the IAM .service file that defines the type, either in path_mapping or in a comment. |
| `region` | string | For Cloud IAM: The location of the Policy. Must be empty or "global" for Policies owned by global IAM. Must name a region from prodspec/cloud-iam-cloudspec for Regional IAM Policies, see (internal link)#where-is-iam-currently-deployed. For Local IAM: This field should be set to "local". |
| `type` | string | Resource type. Types are defined in IAM's .service files. Valid values for type might be 'storage_buckets', 'compute_instances', 'resourcemanager_customers', 'billing_accounts', etc. |

### `PrivateResourceMetadata` fields

| Field | Type | Description |
|---|---|---|
| `userScoped` | boolean | Output only. If true, this resource is user-scoped, meaning it is either a workspace or sourced from a workspace. |

### `PullGitCommitsRequest` fields

| Field | Type | Description |
|---|---|---|
| `author` | CommitAuthor | Required. The author of any merge commit which may be created as a result of merging fetched Git commits into this workspace. |
| `remoteBranch` | string | Optional. The name of the branch in the Git remote from which to pull commits. If left unset, the repository's default branch name will be used. |

### `PushGitCommitsRequest` fields

| Field | Type | Description |
|---|---|---|
| `remoteBranch` | string | Optional. The name of the branch in the Git remote to which commits should be pushed. If left unset, the repository's default branch name will be used. |

### `QueryCompilationResultActionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `compilationResultActions` | `array<CompilationResultAction>` | List of compilation result actions. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |

### `QueryDirectoryContentsResponse` fields

| Field | Type | Description |
|---|---|---|
| `directoryEntries` | `array<DirectoryEntry>` | List of entries in the directory. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |

### `QueryFolderContentsResponse` fields

| Field | Type | Description |
|---|---|---|
| `entries` | `array<FolderContentsEntry>` | List of entries in the folder. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |

### `QueryRepositoryDirectoryContentsResponse` fields

| Field | Type | Description |
|---|---|---|
| `directoryEntries` | `array<DirectoryEntry>` | List of entries in the directory. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |

### `QueryTeamFolderContentsResponse` fields

| Field | Type | Description |
|---|---|---|
| `entries` | `array<TeamFolderContentsEntry>` | List of entries in the TeamFolder. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |

### `QueryUserRootContentsResponse` fields

| Field | Type | Description |
|---|---|---|
| `entries` | `array<RootContentsEntry>` | List of entries in the folder. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |

### `QueryWorkflowInvocationActionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |
| `workflowInvocationActions` | `array<WorkflowInvocationAction>` | List of workflow invocation actions. |

### `ReadFileResponse` fields

| Field | Type | Description |
|---|---|---|
| `fileContents` | string (byte) | The file's contents. |

### `ReadRepositoryFileResponse` fields

| Field | Type | Description |
|---|---|---|
| `contents` | string (byte) | The file's contents. |

### `Relation` fields

| Field | Type | Description |
|---|---|---|
| `additionalOptions` | `map<string, string>` | Additional options that will be provided as key/value pairs into the options clause of a create table/view statement. See https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language for more information on which options are supported. |
| `clusterExpressions` | `array<string>` | A list of columns or SQL expressions used to cluster the table. |
| `connection` | string | Optional. The connection specifying the credentials to be used to read and write to external storage, such as Cloud Storage. The connection can have the form `{project}.{location}.{connection_id}` or `projects/{project}/locations/{location}/connections/{connection_id}`, or be set to DEFAULT. |
| `dependencyTargets` | `array<Target>` | A list of actions that this action depends on. |
| `disabled` | boolean | Whether this action is disabled (i.e. should not be run). |
| `fileFormat` | string enum | Optional. The file format for the BigQuery table. Values: `FILE_FORMAT_UNSPECIFIED`, `PARQUET`. |
| `incrementalTableConfig` | IncrementalTableConfig | Configures `INCREMENTAL_TABLE` settings for this relation. Only set if `relation_type` is `INCREMENTAL_TABLE`. |
| `partitionExpirationDays` | integer (int32) | Sets the partition expiration in days. |
| `partitionExpression` | string | The SQL expression used to partition the relation. |
| `postOperations` | `array<string>` | SQL statements to be executed after creating the relation. |
| `preOperations` | `array<string>` | SQL statements to be executed before creating the relation. |
| `relationDescriptor` | RelationDescriptor | Descriptor for the relation and its columns. |
| `relationType` | string enum | The type of this relation. Values: `RELATION_TYPE_UNSPECIFIED`, `TABLE`, `VIEW`, `INCREMENTAL_TABLE`, `MATERIALIZED_VIEW`. |
| `requirePartitionFilter` | boolean | Specifies whether queries on this table must include a predicate filter that filters on the partitioning column. |
| `selectQuery` | string | The SELECT query which returns rows which this relation should contain. |
| `storageUri` | string | Optional. The fully qualified location prefix of the external folder where table data is stored. The URI should be in the format `gs://bucket/path_to_table/`. |
| `tableFormat` | string enum | Optional. The table format for the BigQuery table. Values: `TABLE_FORMAT_UNSPECIFIED`, `ICEBERG`. |
| `tags` | `array<string>` | Arbitrary, user-defined tags on this action. |

### `RelationDescriptor` fields

| Field | Type | Description |
|---|---|---|
| `bigqueryLabels` | `map<string, string>` | A set of BigQuery labels that should be applied to the relation. |
| `columns` | `array<ColumnDescriptor>` | A list of descriptions of columns within the relation. |
| `description` | string | A text description of the relation. |

### `ReleaseConfig` fields

| Field | Type | Description |
|---|---|---|
| `codeCompilationConfig` | CodeCompilationConfig | Optional. If set, fields of `code_compilation_config` override the default compilation settings that are specified in dataform.json. |
| `cronSchedule` | string | Optional. Optional schedule (in cron format) for automatic creation of compilation results. |
| `disabled` | boolean | Optional. Disables automatic creation of compilation results. |
| `gitCommitish` | string | Required. Git commit/tag/branch name at which the repository should be compiled. Must exist in the remote repository. Examples: - a commit SHA: `12ade345` - a tag: `tag1` - a branch name: `branch1` |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `name` | string | Identifier. The release config's name. |
| `recentScheduledReleaseRecords` | `array<ScheduledReleaseRecord>` | Output only. Records of the 10 most recent scheduled release attempts, ordered in descending order of `release_time`. Updated whenever automatic creation of a compilation result is triggered by cron_schedule. |
| `releaseCompilationResult` | string | Optional. The name of the currently released compilation result for this release config. This value is updated when a compilation result is automatically created from this release config (using cron_schedule), or when this resource is updated by API call (perhaps to roll back to an earlier release). The compilation result must have been created using this release config. Must be in the format `projects/*/locations/*/repositories/*/compilationResults/*`. |
| `timeZone` | string | Optional. Specifies the time zone to be used when interpreting cron_schedule. Must be a time zone name from the time zone database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). If left unspecified, the default is `UTC`. |

### `RemoveDirectoryRequest` fields

| Field | Type | Description |
|---|---|---|
| `path` | string | Required. The directory's full path including directory name, relative to the workspace root. |

### `RemoveFileRequest` fields

| Field | Type | Description |
|---|---|---|
| `path` | string | Required. The file's full path including filename, relative to the workspace root. |

### `Repository` fields

| Field | Type | Description |
|---|---|---|
| `containingFolder` | string | Optional. The name of the containing folder of the repository. The field is immutable and it can be modified via a MoveRepository operation. Format: `projects/*/locations/*/folders/*`. or `projects/*/locations/*/teamFolders/*`. |
| `createTime` | string (google-datetime) | Output only. The timestamp of when the repository was created. |
| `dataEncryptionState` | DataEncryptionState | Output only. A data encryption state of a Git repository if this Repository is protected by a KMS key. |
| `displayName` | string | Optional. The repository's user-friendly name. |
| `endUserAuthConfig` | EndUserAuthConfig | Optional. Includes configuration options for end user authentication. |
| `gitRemoteSettings` | GitRemoteSettings (definitions by version: [`GitRemoteSettings` (v1)](#gitremotesettings), [`GitRemoteSettings` (v1beta1)](#gitremotesettings-v1beta1)) | Optional. If set, configures this repository to be linked to a Git remote. |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `kmsKeyName` | string | Optional. The reference to a KMS encryption key. If provided, it will be used to encrypt user data in the repository and all child resources. It is not possible to add or update the encryption key after the repository is created. Example: `projects/{kms_project}/locations/{location}/keyRings/{key_location}/cryptoKeys/{key}` |
| `labels` | `map<string, string>` | Optional. Repository user labels. |
| `name` | string | Identifier. The repository's name. |
| `npmrcEnvironmentVariablesSecretVersion` | string | Optional. The name of the Secret Manager secret version to be used to interpolate variables into the .npmrc file for package installation operations. Must be in the format `projects/*/secrets/*/versions/*`. The file itself must be in a JSON format. |
| `serviceAccount` | string | Optional. The service account to run workflow invocations under. |
| `setAuthenticatedUserAdmin` | boolean | Optional. Input only. If set to true, the authenticated user will be granted the roles/dataform.admin role on the created repository. |
| `teamFolderName` | string | Output only. The resource name of the TeamFolder that this Repository is associated with. This should take the format: projects/{project}/locations/{location}/teamFolders/{teamFolder}. If this is not set, the Repository is not associated with a TeamFolder. |
| `workspaceCompilationOverrides` | WorkspaceCompilationOverrides | Optional. If set, fields of `workspace_compilation_overrides` override the default compilation settings that are specified in dataform.json when creating workspace-scoped compilation results. See documentation for `WorkspaceCompilationOverrides` for more information. |

### `ResetWorkspaceChangesRequest` fields

| Field | Type | Description |
|---|---|---|
| `clean` | boolean | Optional. If set to true, untracked files will be deleted. |
| `paths` | `array<string>` | Optional. Full file paths to reset back to their committed state including filename, rooted at workspace root. If left empty, all files will be reset. |

### `RootContentsEntry` fields

| Field | Type | Description |
|---|---|---|
| `folder` | Folder | A subfolder. Mutually exclusive with `repository` (proto `oneof entry`; set at most one; see Notes). |
| `repository` | Repository | A repository. Mutually exclusive with `folder` (proto `oneof entry`; set at most one; see Notes). |

### `ScheduledExecutionRecord` fields

| Field | Type | Description |
|---|---|---|
| `errorStatus` | Status | The error status encountered upon this attempt to create the workflow invocation, if the attempt was unsuccessful. Mutually exclusive with `workflowInvocation` (proto `oneof result`; set at most one; see Notes). |
| `executionTime` | string (google-datetime) | Output only. The timestamp of this execution attempt. |
| `workflowInvocation` | string | The name of the created workflow invocation, if one was successfully created. Must be in the format `projects/*/locations/*/repositories/*/workflowInvocations/*`. Mutually exclusive with `errorStatus` (proto `oneof result`; set at most one; see Notes). |

### `ScheduledReleaseRecord` fields

| Field | Type | Description |
|---|---|---|
| `compilationResult` | string | The name of the created compilation result, if one was successfully created. Must be in the format `projects/*/locations/*/repositories/*/compilationResults/*`. Mutually exclusive with `errorStatus` (proto `oneof result`; set at most one; see Notes). |
| `errorStatus` | Status | The error status encountered upon this attempt to create the compilation result, if the attempt was unsuccessful. Mutually exclusive with `compilationResult` (proto `oneof result`; set at most one; see Notes). |
| `releaseTime` | string (google-datetime) | Output only. The timestamp of this release attempt. |

### `SearchFilesResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Optional. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |
| `searchResults` | `array<SearchResult>` | List of matched results. |

### `SearchResult` fields

| Field | Type | Description |
|---|---|---|
| `directory` | DirectorySearchResult | Details when search result is a directory. Mutually exclusive with `file` (proto `oneof entry`; set at most one; see Notes). |
| `file` | FileSearchResult | Details when search result is a file. Mutually exclusive with `directory` (proto `oneof entry`; set at most one; see Notes). |

### `SearchTeamFoldersResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. In REST, pass the value as the `pageToken` parameter of the next request to the same method (`page_token` is the proto field name). |
| `results` | `array<TeamFolderSearchResult>` | List of TeamFolders that match the search query. |

### `SetIamPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |

### `SqlDefinition` fields

| Field | Type | Description |
|---|---|---|
| `errorTable` | ErrorTable | Error table configuration, |
| `load` | LoadConfig | Load configuration. |
| `query` | string | The SQL query representing the data preparation steps. Formatted as a Pipe SQL query statement. |

### `SshAuthenticationConfig` fields

| Field | Type | Description |
|---|---|---|
| `hostPublicKey` | string | Required. Content of a public SSH key to verify an identity of a remote Git host. |
| `userPrivateKeySecretVersion` | string | Required. The name of the Secret Manager secret version to use as a ssh private key for Git operations. Must be in the format `projects/*/secrets/*/versions/*`. |

### `Status` fields

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | `array<map<string, any>>` | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `SyncWorkspaceRefsRequest` fields

| Field | Type | Description |
|---|---|---|
| `deepen` | integer (int32) | Optional. Can be used to deepen the commit history of shallow clones. Git documentation: https://git-scm.com/docs/git-fetch#Documentation/git-fetch.txt---deependepth |
| `remoteBranchName` | string | Optional. The name of the branch in the Git remote to which the refs should be fetched for. If left unset, all remote branches will be fetched. |

### `TableUpdateTrigger` fields

| Field | Type | Description |
|---|---|---|
| `table` | Target | The target table to trigger the workflow. |
| `triggerUpdateTime` | string (google-datetime) | Output only. The modification time of this table that resulted in an invocation of the workflow. This would be updated by the triggering service after a successful workflow invocation. |

### `Target` fields

| Field | Type | Description |
|---|---|---|
| `database` | string | Optional. The action's database (Google Cloud project ID) . |
| `name` | string | Optional. The action's name, within `database` and `schema`. |
| `schema` | string | Optional. The action's schema (BigQuery dataset ID), within `database`. |

### `TeamFolder` fields

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp of when the TeamFolder was created. |
| `creatorIamPrincipal` | string | Output only. The IAM principal identifier of the creator of the TeamFolder. |
| `displayName` | string | Required. The TeamFolder's user-friendly name. |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `name` | string | Identifier. The TeamFolder's name. |
| `updateTime` | string (google-datetime) | Output only. The timestamp of when the TeamFolder was last updated. |

### `TeamFolderContentsEntry` fields

| Field | Type | Description |
|---|---|---|
| `folder` | Folder | A subfolder. Mutually exclusive with `repository` (proto `oneof entry`; set at most one; see Notes). |
| `repository` | Repository | A repository. Mutually exclusive with `folder` (proto `oneof entry`; set at most one; see Notes). |

### `TeamFolderSearchResult` fields

| Field | Type | Description |
|---|---|---|
| `teamFolder` | TeamFolder | A TeamFolder resource that is in the project / location. |

### `TestIamPermissionsRequest` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | A subset of `TestIamPermissionsRequest.permissions` that the caller is allowed (request type name corrected; see Notes). |

### `TriggerEvaluationRecord` fields

| Field | Type | Description |
|---|---|---|
| `evaluationTime` | string (google-datetime) | Output only. The timestamp of this trigger evaluation attempt. |
| `status` | Status | Output only. The status of the trigger evaluation. Success is indicated by a code of 0 (OK). Message will only be present if the status code is non-zero. |

### `UncommittedFileChange` fields

| Field | Type | Description |
|---|---|---|
| `path` | string | The file's full path including filename, relative to the workspace root. |
| `state` | string enum | Output only. Indicates the status of the file. Values: `STATE_UNSPECIFIED`, `ADDED`, `DELETED`, `MODIFIED`, `HAS_CONFLICTS`. |

### `WorkflowConfig` fields

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp of when the WorkflowConfig was created. |
| `cronSchedule` | string | Optional. Optional schedule (in cron format) for automatic execution of this workflow config. |
| `disabled` | boolean | Optional. Disables automatic creation of workflow invocations. |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `invocationConfig` | InvocationConfig | Optional. If left unset, a default InvocationConfig will be used. |
| `name` | string | Identifier. The workflow config's name. |
| `recentScheduledExecutionRecords` | `array<ScheduledExecutionRecord>` | Output only. Records of the 10 most recent scheduled execution attempts, ordered in descending order of `execution_time`. Updated whenever automatic creation of a workflow invocation is triggered by cron_schedule. |
| `releaseConfig` | string | Required. The name of the release config whose release_compilation_result should be executed. Must be in the format `projects/*/locations/*/repositories/*/releaseConfigs/*`. |
| `timeZone` | string | Optional. Specifies the time zone to be used when interpreting cron_schedule. Must be a time zone name from the time zone database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). If left unspecified, the default is `UTC`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp of when the WorkflowConfig was last updated. |

### `WorkflowConfig` (v1beta1) fields

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp of when the WorkflowConfig was created. |
| `cronSchedule` | string | Optional. Optional schedule (in cron format) for automatic execution of this workflow config. |
| `disabled` | boolean | Optional. Disables automatic creation of workflow invocations. |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `invocationConfig` | InvocationConfig | Optional. If left unset, a default InvocationConfig will be used. |
| `name` | string | Identifier. The workflow config's name. |
| `recentScheduledExecutionRecords` | `array<ScheduledExecutionRecord>` | Output only. Records of the 10 most recent scheduled execution attempts, ordered in descending order of `execution_time`. Updated whenever automatic creation of a workflow invocation is triggered by cron_schedule. |
| `releaseConfig` | string | Required. The name of the release config whose release_compilation_result should be executed. Must be in the format `projects/*/locations/*/repositories/*/releaseConfigs/*`. |
| `timeZone` | string | Optional. Specifies the time zone to be used when interpreting cron_schedule. Must be a time zone name from the time zone database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). If left unspecified, the default is `UTC`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp of when the WorkflowConfig was last updated. |
| `workflowTriggerConfig` | WorkflowTriggerConfig | Optional. Trigger configuration for this workflow. If present, the workflow will be triggered based on the specified triggers. |

### `WorkflowInvocation` fields

| Field | Type | Description |
|---|---|---|
| `compilationResult` | string | Immutable. The name of the compilation result to use for this invocation. Must be in the format `projects/*/locations/*/repositories/*/compilationResults/*`. Mutually exclusive with `workflowConfig` (proto `oneof compilation_source`; set at most one; see Notes). |
| `dataEncryptionState` | DataEncryptionState | Output only. Only set if the repository has a KMS Key. |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `invocationConfig` | InvocationConfig | Immutable. If left unset, a default InvocationConfig will be used. |
| `invocationTiming` | Interval | Output only. This workflow invocation's timing details. |
| `name` | string | Output only. The workflow invocation's name. |
| `pipelineConfig` | PipelineConfig | Output only. The pipeline options which defines the pipeline type and path within the Git repository. |
| `privateResourceMetadata` | PrivateResourceMetadata | Output only. Metadata indicating whether this resource is user-scoped. `WorkflowInvocation` resource is `user_scoped` only if it is sourced from a compilation result and the compilation result is user-scoped. |
| `resolvedCompilationResult` | string | Output only. The resolved compilation result that was used to create this invocation. Will be in the format `projects/*/locations/*/repositories/*/compilationResults/*`. |
| `state` | string enum | Output only. This workflow invocation's current state. Values: `STATE_UNSPECIFIED`, `RUNNING`, `SUCCEEDED`, `CANCELLED`, `FAILED`, `CANCELING`. |
| `workflowConfig` | string | Immutable. The name of the workflow config to invoke. Must be in the format `projects/*/locations/*/repositories/*/workflowConfigs/*`. Mutually exclusive with `compilationResult` (proto `oneof compilation_source`; set at most one; see Notes). |

### `WorkflowInvocationAction` fields

| Field | Type | Description |
|---|---|---|
| `bigqueryAction` | BigQueryAction | Output only. The workflow action's bigquery action details. Mutually exclusive with `notebookAction`, `dataPreparationAction`, `bigqueryUnitTestAction` (proto `oneof action`; set at most one; see Notes). |
| `bigqueryUnitTestAction` | BigQueryUnitTestAction | Output only. The workflow action's unit test details. Mutually exclusive with `bigqueryAction`, `notebookAction`, `dataPreparationAction` (proto `oneof action`; set at most one; see Notes). |
| `canonicalTarget` | Target | Output only. The action's identifier if the project had been compiled without any overrides configured. Unique within the compilation result. |
| `dataPreparationAction` | DataPreparationAction | Output only. The workflow action's data preparation action details. Mutually exclusive with `bigqueryAction`, `notebookAction`, `bigqueryUnitTestAction` (proto `oneof action`; set at most one; see Notes). |
| `failureReason` | string | Output only. If and only if action's state is FAILED a failure reason is set. |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `invocationTiming` | Interval | Output only. This action's timing details. `start_time` will be set if the action is in \[RUNNING, SUCCEEDED, CANCELLED, FAILED\] state. `end_time` will be set if the action is in \[SUCCEEDED, CANCELLED, FAILED\] state. |
| `notebookAction` | NotebookAction | Output only. The workflow action's notebook action details. Mutually exclusive with `bigqueryAction`, `dataPreparationAction`, `bigqueryUnitTestAction` (proto `oneof action`; set at most one; see Notes). |
| `state` | string enum | Output only. This action's current state. Values: `PENDING`, `RUNNING`, `SKIPPED`, `DISABLED`, `SUCCEEDED`, `CANCELLED`, `FAILED`, `QUEUED`. |
| `target` | Target | Output only. This action's identifier. Unique within the workflow invocation. |

### `WorkflowTrigger` fields

| Field | Type | Description |
|---|---|---|
| `tableUpdateTrigger` | TableUpdateTrigger | The table update trigger configuration. |

### `WorkflowTriggerConfig` fields

| Field | Type | Description |
|---|---|---|
| `condition` | string enum | Optional. The condition to use when triggering the workflow. Values: `CONDITION_UNSPECIFIED`, `ALL`, `ANY`. |
| `lastSuccessfulEvaluationTime` | string (google-datetime) | Output only. The timestamp of the last successful trigger evaluation. |
| `maxWaitDuration` | string (google-duration) | Optional. The effective maximum wait time duration for the trigger condition to be met. If not specified, the workflow won't be triggered until conditions are met. |
| `minExecutionDuration` | string (google-duration) | Optional. Minimum duration between two consecutive executions. If not specified, the workflow will be executed every time trigger conditions are met and there is no ongoing workflow execution. |
| `recentTriggerEvaluationRecords` | `array<TriggerEvaluationRecord>` | Output only. Records of the 10 most recent trigger evaluations, ordered in descending order of `evaluation_time`. Updated whenever the service evaluates the trigger conditions (via polling or upon receiving a push event). |
| `workflowTriggers` | `array<WorkflowTrigger>` | Required. The trigger definitions to invoke a workflow. |

### `Workspace` fields

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp of when the workspace was created. |
| `dataEncryptionState` | DataEncryptionState | Output only. A data encryption state of a Git repository if this Workspace is protected by a KMS key. |
| `disableMoves` | boolean | Optional. If set to true, workspaces will not be moved if its linked Repository is moved. Instead, it will be deleted. |
| `internalMetadata` | string | Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. |
| `name` | string | Identifier. The workspace's name. |
| `privateResourceMetadata` | PrivateResourceMetadata | Output only. Metadata indicating whether this resource is user-scoped. For `Workspace` resources, the `user_scoped` field is always `true`. |

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `dataform` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the Discovery document: the JSON example in the `Policy` description (the `google.iam.v1` text shared by the IAM methods) has a trailing comma after the `condition.expression` value (`"expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } }`), which is not valid JSON; the same comma is in the proto comment. This page shows the example as a JSON block without that comma. The Discovery text of the YAML example has lost its line breaks and indentation, so the YAML block is taken from the proto comment (`google/iam/v1/policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Corrected from the Discovery document: the `TestIamPermissionsResponse.permissions` description reads "A subset of `TestPermissionsRequest.permissions` that the caller is allowed."; the same text is in the `google.iam.v1` proto, where the request message of `TestIamPermissions` is `TestIamPermissionsRequest` (`google/iam/v1/iam_policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/iam_policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Google-internal `go/` short links in the Discovery descriptions are replaced with `(internal link)`; they are not reachable outside Google.
- Deprecated: `GitRemoteSettings.tokenStatus` (`deprecated: true` in the Discovery document and its description). Replacement or status stated in the description: "Deprecated: The field does not contain any token status information."
- Deprecated: `GitRemoteSettings.tokenStatus` (`deprecated: true` in the Discovery document and its description). Replacement or status stated in the description: "Deprecated: The field does not contain any token status information." "Instead use https://cloud.google.com/dataform/reference/rest/v1beta1/projects.locations.repositories/computeAccessTokenStatus"
- Mutually exclusive fields of `ActionLoadConfig`: `replace`, `append`, `maximum`, `unique` are the members of `oneof mode` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `CompilationResult`: `gitCommitish`, `workspace`, `releaseConfig` are the members of `oneof source` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `CompilationResultAction`: `relation`, `operations`, `assertion`, `declaration`, `notebook`, `dataPreparation`, `bigqueryUnitTest` are the members of `oneof compiled_object` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `DataPreparation`: `contentsYaml`, `contentsSql` are the members of `oneof definition` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `DataPreparationAction`: `contentsYaml`, `contentsSql` are the members of `oneof definition` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `DirectoryEntry`: `file`, `directory` are the members of `oneof entry` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `FileOperation`: `writeFile`, `deleteFile` are the members of `oneof operation` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `FolderContentsEntry`: `folder`, `repository` are the members of `oneof entry` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `LoadConfig`: `replace`, `append`, `maximum`, `unique` are the members of `oneof mode` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `RootContentsEntry`: `folder`, `repository` are the members of `oneof entry` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `ScheduledExecutionRecord`: `workflowInvocation`, `errorStatus` are the members of `oneof result` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `ScheduledReleaseRecord`: `compilationResult`, `errorStatus` are the members of `oneof result` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `SearchResult`: `file`, `directory` are the members of `oneof entry` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `TeamFolderContentsEntry`: `folder`, `repository` are the members of `oneof entry` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `WorkflowInvocation`: `compilationResult`, `workflowConfig` are the members of `oneof compilation_source` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `WorkflowInvocationAction`: `bigqueryAction`, `notebookAction`, `dataPreparationAction`, `bigqueryUnitTestAction` are the members of `oneof action` in the proto (`google/cloud/dataform/v1/dataform.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataform/v1/dataform.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Source: https://dataform.googleapis.com/$discovery/rest?version=v1, https://dataform.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
