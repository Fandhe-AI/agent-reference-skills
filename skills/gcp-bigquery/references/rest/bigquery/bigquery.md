---
source: https://bigquery.googleapis.com/$discovery/rest?version=v2
---

# BigQuery API REST API (bigquery)

## Signature / Usage

Base URL: `https://bigquery.googleapis.com/bigquery/v2`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2). The URL and parameters shown for a method come from the first version on its `Versions` line; a request or response type marked with a version, such as `Type` (v1), applies to that version and links to the definition of that version, a type marked "same fields in ..." has one definition for those versions, but the types it references differ by version, and an unmarked type is the same in every listed version, including the types it references. For the URL and parameters of another version, see the Discovery document of that version under Source in Notes.

### `bigquery.datasets.delete`

- Versions: v2
- `DELETE https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}`
- Deletes the dataset specified by the datasetId value. Before you can delete a dataset, you must delete all its tables, either manually or by specifying deleteContents. Immediately after deletion, you can create another dataset with the same name. # IAM Permissions Requires the `bigquery.datasets.delete` permission on the dataset.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`

### `bigquery.datasets.get`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}`
- Returns the dataset specified by datasetID. # IAM Permissions Requires the `bigquery.datasets.get` permission on the dataset.
- IAM permissions by setting (from https://docs.cloud.google.com/bigquery/docs/dataset-access-control; see `references/access-control-iam/dataset-access-control.md`): without fine-grained dataset ACL permissions (the default), the IAM permissions in the description above apply. When the `enable_fine_grained_dataset_acls_option` configuration setting is `TRUE`, these replace them: `datasetView` unspecified or `FULL` needs `bigquery.datasets.get` and `bigquery.datasets.getIamPolicy`; `METADATA` needs only `bigquery.datasets.get`; `ACL` needs only `bigquery.datasets.getIamPolicy`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Dataset`

### `bigquery.datasets.insert`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets`
- Creates a new empty dataset. # IAM Permissions Requires the `bigquery.datasets.create` permission on the project.
- IAM permissions by setting (from https://docs.cloud.google.com/bigquery/docs/dataset-access-control; see `references/access-control-iam/dataset-access-control.md`): without fine-grained dataset ACL permissions (the default), the IAM permissions in the description above apply. When the `enable_fine_grained_dataset_acls_option` configuration setting is `TRUE`, these replace them: creating a dataset with access controls (the `access` field) needs `bigquery.datasets.create` and `bigquery.datasets.setIamPolicy`; without access controls, only `bigquery.datasets.create`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Dataset`; Response: `Dataset`

### `bigquery.datasets.list`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets`
- Lists all datasets in the specified project. IAM permissions: requires no specific IAM permission to use this method; results are filtered to only include datasets on which the caller has the `bigquery.datasets.get` permission. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `DatasetList`

### `bigquery.datasets.patch`

- Versions: v2
- `PATCH https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}`
- Updates information in an existing dataset. The update method replaces the entire dataset resource, whereas the patch method only replaces fields that are provided in the submitted dataset resource. This method supports RFC5789 patch semantics. # IAM Permissions Requires the following IAM permission(s) to use this method: - `bigquery.datasets.update` on the dataset. - `bigquery.datasets.get` on the dataset.
- IAM permissions by setting (from https://docs.cloud.google.com/bigquery/docs/dataset-access-control; see `references/access-control-iam/dataset-access-control.md`): without fine-grained dataset ACL permissions (the default), the IAM permissions in the description above apply. When the `enable_fine_grained_dataset_acls_option` configuration setting is `TRUE`, these replace them: `updateMode` unspecified or `UPDATE_FULL` needs `bigquery.datasets.update` and `bigquery.datasets.setIamPolicy`; `UPDATE_METADATA` needs only `bigquery.datasets.update`; `UPDATE_ACL` needs only `bigquery.datasets.setIamPolicy`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Dataset`; Response: `Dataset`

### `bigquery.datasets.undelete`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}:undelete`
- Undeletes a dataset which is within time travel window based on datasetId. If a time is specified, the dataset version deleted at that time is undeleted, else the last live version is undeleted. # IAM Permissions Requires the following IAM permission(s) to use this method: - `bigquery.datasets.create` on the project. - `bigquery.datasets.get` on the dataset.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `UndeleteDatasetRequest`; Response: `Dataset`

### `bigquery.datasets.update`

- Versions: v2
- `PUT https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}`
- Updates information in an existing dataset. The update method replaces the entire dataset resource, whereas the patch method only replaces fields that are provided in the submitted dataset resource. # IAM Permissions Requires the `bigquery.datasets.update` permission on the dataset.
- IAM permissions by setting (from https://docs.cloud.google.com/bigquery/docs/dataset-access-control; see `references/access-control-iam/dataset-access-control.md`): without fine-grained dataset ACL permissions (the default), the IAM permissions in the description above apply. When the `enable_fine_grained_dataset_acls_option` configuration setting is `TRUE`, these replace them: `updateMode` unspecified, `UPDATE_ACL` or `UPDATE_FULL` needs `bigquery.datasets.update` and `bigquery.datasets.setIamPolicy`; `UPDATE_METADATA` needs only `bigquery.datasets.update`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Dataset`; Response: `Dataset`

### `bigquery.jobs.cancel`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/jobs/{+jobId}/cancel`
- Requests that a job be cancelled. This call will return immediately, and the client will need to poll for the job status to see if the cancel completed successfully. Cancelled jobs may still incur costs. # IAM Permissions Requires the `bigquery.jobs.update` permission on the job resource. If the user matches the creator of the job, the `bigquery.jobs.create` permission on the project is required instead.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `JobCancelResponse`

### `bigquery.jobs.delete`

- Versions: v2
- `DELETE https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/jobs/{+jobId}/delete`
- Requests the deletion of the metadata of a job. This call returns when the job's metadata is deleted. # IAM Permissions Requires the `bigquery.jobs.delete` permission on the job resource.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`

### `bigquery.jobs.get`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/jobs/{+jobId}`
- Returns information about a specific job. Job information is available for a six month period after creation. IAM permissions: requires the `bigquery.jobs.get` permission on the job resource; if the user matches the creator of the job, the `bigquery.jobs.create` permission on the project is required instead. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Job`

### `bigquery.jobs.getQueryResults`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/queries/{+jobId}`
- RPC to get the results of a query job. # IAM Permissions Requires the following IAM permission(s) to use this method: - `bigquery.jobs.get` on the job. - `bigquery.tables.getData` on the destination table. If the user matches the creator of the job, the following IAM permission(s) are required instead: - `bigquery.jobs.create` on the project. - `bigquery.tables.getData` on the destination table.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `GetQueryResultsResponse`

### `bigquery.jobs.insert`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/jobs`
- Starts a new asynchronous job. This API has two different kinds of endpoint URIs, as this method supports a variety of use cases. \* The \*Metadata\* URI is used for most interactions, as it accepts the job configuration directly. \* The \*Upload\* URI is ONLY for the case when you're sending both a load job configuration and a data stream together. In this case, with `uploadType=multipart`, the Upload URI accepts the job configuration and the data as two distinct multipart MIME parts; with `uploadType=resumable`, the request that starts the session sends only the job configuration as its JSON body, and the data is sent to the session URI that the response returns. # IAM Permissions Requires the `bigquery.jobs.create` permission on the project resource. Additional permissions are required depending on the job type: - \*\*Load, Export, and Copy jobs\*\*: Generally require data-level permissions such as `bigquery.tables.export` or access to external storage. - \*\*Query jobs\*\*: Permissions are dependent on the SQL statement. Complex queries (DDL, DCL) may require additional permissions to create reservations, modify IAM policies, or update project settings.
- Upload URI: the two MIME parts described above are the `uploadType=multipart` form. With `uploadType=resumable`, the request that starts the session carries the `Job` configuration as its JSON body, and the data is sent to the session URI that the response returns (see the Media upload lines below).
- Media upload (resumable): `POST https://bigquery.googleapis.com/upload/bigquery/v2/projects/{+projectId}/jobs` with `uploadType=resumable` (starts a resumable upload session; the request that starts the session carries the `Job` JSON in its body; send the content to the session URI that the response returns); the Discovery document also lists the path `/resumable/upload/bigquery/v2/projects/{+projectId}/jobs` for this protocol
- Media upload (multipart; the Discovery `simple` protocol): `POST https://bigquery.googleapis.com/upload/bigquery/v2/projects/{+projectId}/jobs` with `uploadType=multipart` (a `multipart/related` body with the `Job` JSON part followed by the content part; `uploadType=media` sends only the file and cannot carry the `Job` configuration this method needs)
- Media upload limits: accepted media types: `*/*`
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `Job`; Response: `Job`

### `bigquery.jobs.list`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/jobs`
- Lists all jobs that you started in the specified project. Job information is available for a six month period after creation. The job list is sorted in reverse chronological order, by job creation time. IAM permissions: no specific permission is needed to list the jobs that you created; with `bigquery.jobs.listAll` you can list all jobs with all metadata, and with `bigquery.jobs.list` all jobs, with redacted information for jobs that you did not create (set `allUsers=true` to include other users' jobs). (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `JobList`

### `bigquery.jobs.query`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/queries`
- Runs a BigQuery SQL query synchronously and returns query results if the query completes within a specified timeout. # IAM Permissions Requires the `bigquery.jobs.create` permission on the project resource. Data-level permissions are highly dependent on the SQL statement being executed. While standard queries require data access (such as `bigquery.tables.getData`), complex operations like DDL or DCL may require permissions to manage reservations, IAM policies, or project settings.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `QueryRequest`; Response: `QueryResponse`

### `bigquery.models.delete`

- Versions: v2
- `DELETE https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/models/{+modelId}`
- Deletes the model specified by modelId from the dataset. # IAM Permissions Requires the `bigquery.models.delete` permission on the model.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`

### `bigquery.models.get`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/models/{+modelId}`
- Gets the specified model resource by model ID. # IAM Permissions Requires the `bigquery.models.getMetadata` permission on the model.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Model`

### `bigquery.models.list`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/models`
- Lists all models in the specified dataset. After retrieving the list of models, you can get information about a particular model by calling the models.get method. IAM permissions: requires the `bigquery.models.list` permission on the dataset. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListModelsResponse`

### `bigquery.models.patch`

- Versions: v2
- `PATCH https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/models/{+modelId}`
- Patch specific fields in the specified model. # IAM Permissions Requires the `bigquery.models.updateMetadata` permission on the model.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Model`; Response: `Model`

### `bigquery.projects.getServiceAccount`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/serviceAccount`
- RPC to get the service account for a project used for interactions with Google Cloud KMS. Requires the `bigquery.jobs.create` permission on the project resource. This permission is required to authorize the retrieval of the project's service identity for technical management tasks like encryption configuration.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `GetServiceAccountResponse`

### `bigquery.projects.list`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects`
- RPC to list projects to which the user has been granted any project role. Users of this method are encouraged to consider the Resource Manager (https://cloud.google.com/resource-manager/docs/) API, which provides the underlying data for this method and has more capabilities. # IAM Permissions Requires no specific IAM permission(s) to use this method. The results are filtered to only include projects on which the caller has been granted a project-level role such as a BigQuery predefined IAM role or a basic role such as Viewer or Owner.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ProjectList`

### `bigquery.routines.delete`

- Versions: v2
- `DELETE https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/routines/{+routineId}`
- Deletes the routine specified by routineId from the dataset. # IAM Permissions Requires the `bigquery.routines.delete` permission on the routine.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`

### `bigquery.routines.get`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/routines/{+routineId}`
- Gets the specified routine resource by routine ID. # IAM Permissions Requires the `bigquery.routines.get` permission on the routine.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Routine`

### `bigquery.routines.getIamPolicy`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetIamPolicyRequest`; Response: `Policy`

### `bigquery.routines.insert`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/routines`
- Creates a new routine in the dataset. # IAM Permissions Requires the `bigquery.routines.create` permission on the dataset.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Routine`; Response: `Routine`

### `bigquery.routines.list`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/routines`
- Lists all routines in the specified dataset. IAM permissions: requires the `bigquery.routines.list` permission on the dataset. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListRoutinesResponse`

### `bigquery.routines.setIamPolicy`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

### `bigquery.routines.testIamPermissions`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### `bigquery.routines.update`

- Versions: v2
- `PUT https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/routines/{+routineId}`
- Updates information in an existing routine. The update method replaces the entire Routine resource. # IAM Permissions Requires the `bigquery.routines.update` permission on the routine.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Routine`; Response: `Routine`

### `bigquery.rowAccessPolicies.batchDelete`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/rowAccessPolicies:batchDelete`
- Deletes provided row access policies. # IAM Permissions Requires the following IAM permission(s) on the table: - `bigquery.rowAccessPolicies.delete` - `bigquery.rowAccessPolicies.setIamPolicy`
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchDeleteRowAccessPoliciesRequest`; Response: —

### `bigquery.rowAccessPolicies.delete`

- Versions: v2
- `DELETE https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/rowAccessPolicies/{+policyId}`
- Deletes a row access policy. # IAM Permissions Requires the following IAM permission(s) on the table: - `bigquery.rowAccessPolicies.delete` - `bigquery.rowAccessPolicies.setIamPolicy`
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`

### `bigquery.rowAccessPolicies.get`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/rowAccessPolicies/{+policyId}`
- Gets the specified row access policy by policy ID. # IAM Permissions Requires the `bigquery.rowAccessPolicies.get` permission on the table.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `RowAccessPolicy`

### `bigquery.rowAccessPolicies.getIamPolicy`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetIamPolicyRequest`; Response: `Policy`

### `bigquery.rowAccessPolicies.insert`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/rowAccessPolicies`
- Creates a row access policy. # IAM Permissions Requires the following IAM permission(s) on the table: - `bigquery.rowAccessPolicies.create` - `bigquery.rowAccessPolicies.setIamPolicy` - `bigquery.tables.getData`
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RowAccessPolicy`; Response: `RowAccessPolicy`

### `bigquery.rowAccessPolicies.list`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/rowAccessPolicies`
- Lists all row access policies on the specified table. # IAM Permissions Requires the `bigquery.rowAccessPolicies.list` permission on the table.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListRowAccessPoliciesResponse`

### `bigquery.rowAccessPolicies.testIamPermissions`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### `bigquery.rowAccessPolicies.update`

- Versions: v2
- `PUT https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/rowAccessPolicies/{+policyId}`
- Updates a row access policy. # IAM Permissions Requires the following IAM permission(s) on the table: - `bigquery.rowAccessPolicies.update` - `bigquery.rowAccessPolicies.setIamPolicy` - `bigquery.tables.getData`
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RowAccessPolicy`; Response: `RowAccessPolicy`

### `bigquery.tabledata.insertAll`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/insertAll`
- Streams data into BigQuery one record at a time without needing to run a load job. # IAM Permissions Requires the following IAM permission(s) to use this method: - `bigquery.tables.updateData` on the table. - `bigquery.tables.get` on the table. - `bigquery.datasets.get` on the dataset.
- Rows per request: `rows` in `TableDataInsertAllRequest` is an array (each element's `json` is "Data for a single row."), so one request can stream several rows; "one record at a time" in the description refers to streaming rows without a load job, not to one row per request. Template tables: when `templateSuffix` makes BigQuery create the instance table, the caller also needs `bigquery.tables.create` ("Required if a template table creates the table automatically" in the Required permissions table of https://docs.cloud.google.com/bigquery/docs/write-api-rest; the IAM permissions in the Discovery description above do not list it).
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/bigquery.insertdata`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TableDataInsertAllRequest`; Response: `TableDataInsertAllResponse`

### `bigquery.tabledata.list`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/data`
- List the content of a table in rows. # IAM Permissions Requires the `bigquery.tables.getData` permission on the table.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TableDataList`

### `bigquery.tables.delete`

- Versions: v2
- `DELETE https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}`
- Deletes the table specified by tableId from the dataset. If the table contains data, all the data will be deleted. # IAM Permissions Requires the `bigquery.tables.delete` permission on the table.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`

### `bigquery.tables.get`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}`
- Gets the specified table resource by table ID. This method does not return the data in the table, it only returns the table resource, which describes the structure of this table. # IAM Permissions Requires the `bigquery.tables.get` permission on the table.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Table`

### `bigquery.tables.getIamPolicy`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetIamPolicyRequest`; Response: `Policy`

### `bigquery.tables.insert`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables`
- Creates a new, empty table in the dataset. # IAM Permissions Requires the `bigquery.tables.create` permission on the dataset.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Table`; Response: `Table`

### `bigquery.tables.list`

- Versions: v2
- `GET https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables`
- Lists all tables in the specified dataset. IAM permissions: requires the `bigquery.tables.list` permission on the dataset. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TableList`

### `bigquery.tables.patch`

- Versions: v2
- `PATCH https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}`
- Updates information in an existing table. The update method replaces the entire table resource, whereas the patch method only replaces fields that are provided in the submitted table resource. This method supports RFC5789 patch semantics. # IAM Permissions Requires the following IAM permission(s) on the table: - `bigquery.tables.update` - `bigquery.tables.get`
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Table`; Response: `Table`

### `bigquery.tables.setIamPolicy`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

### `bigquery.tables.testIamPermissions`

- Versions: v2
- `POST https://bigquery.googleapis.com/bigquery/v2/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### `bigquery.tables.update`

- Versions: v2
- `PUT https://bigquery.googleapis.com/bigquery/v2/projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}`
- Updates information in an existing table. The update method replaces the entire Table resource, whereas the patch method only replaces fields that are provided in the submitted Table resource. # IAM Permissions Requires the `bigquery.tables.update` permission on the table.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Table`; Response: `Table`

### Example request

Generated from the Discovery entry of `bigquery.datasets.get` (not in the official docs); replace the upper-case placeholders (path variables from the method's `flatPath`; URL-encode query values) and `ACCESS_TOKEN`. `datasetView=METADATA` reads only metadata, which needs only `bigquery.datasets.get` when fine-grained dataset ACL permissions are enabled. `ACCESS_TOKEN` is an OAuth 2.0 access token for a principal allowed to call the method; the Google Cloud client libraries (the gcp-client-libraries skill) obtain and send it:

```http
GET /bigquery/v2/projects/PROJECT/datasets/DATASET?datasetView=METADATA HTTP/1.1
Host: bigquery.googleapis.com
Authorization: Bearer ACCESS_TOKEN
```

## Options / Props

### `bigquery.datasets.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the dataset being deleted |
| `datasetId` | path | string | yes | Required. Dataset ID of dataset being deleted |
| `deleteContents` | query | boolean | no | If True, delete all the tables in the dataset. If False and the dataset contains tables, the request will fail. Default is False |

### `bigquery.datasets.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the requested dataset |
| `datasetId` | path | string | yes | Required. Dataset ID of the requested dataset |
| `accessPolicyVersion` | query | integer (int32) | conditional | Optional. The version of the access policy schema to fetch. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for conditional access policy binding in datasets must specify version 3. Dataset with no conditional role bindings in access policy may specify any valid value or leave the field unset. This field will be mapped to IAM Policy version (https://cloud.google.com/iam/docs/policies#versions) and will be used to fetch policy from IAM. If unset or if 0 or 1 value is used for dataset with conditional bindings, access entry with condition will have role string appended by 'withcond' string followed by a hash value. For example : { "access": \[ { "role": "roles/bigquery.dataViewer_with_conditionalbinding_7a34awqsda", "userByEmail": "user@example.com", } \] } Please refer https://cloud.google.com/iam/docs/troubleshooting-withcond for more details. |
| `datasetView` | query | string enum | no | Optional. Specifies the view that determines which dataset information is returned. By default, metadata and ACL information are returned. Without fine-grained dataset ACL permissions, `METADATA` and `ACL` are accepted, and `FULL` or unspecified keep the previous behavior (`bigquery.datasets.get` returns both metadata and access controls). (from `references/access-control-iam/dataset-access-control.md`; permissions by value: see the IAM permissions by setting line of the method above). Values: `DATASET_VIEW_UNSPECIFIED`, `METADATA`, `ACL`, `FULL`. |

### `bigquery.datasets.insert` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the new dataset |
| `accessPolicyVersion` | query | integer (int32) | conditional | Optional. The version of the provided access policy schema. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. This version refers to the schema version of the access policy and not the version of access policy. This field's value can be equal or more than the access policy schema provided in the request. For example, \* Requests with conditional access policy binding in datasets must specify version 3. \* But dataset with no conditional role bindings in access policy may specify any valid value or leave the field unset. If unset or if 0 or 1 value is used for dataset with conditional bindings, request will be rejected. This field will be mapped to IAM Policy version (https://cloud.google.com/iam/docs/policies#versions) and will be used to set policy in IAM. |

### `bigquery.datasets.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the datasets to be listed |
| `all` | query | boolean | no | Whether to list all datasets, including hidden ones |
| `filter` | query | string | no | An expression for filtering the results of the request by label. The syntax is `labels.<name>[:<value>]`. Multiple filters can be AND-ed together by connecting with a space. Example: `labels.department:receiving labels.active`. See Filtering datasets using labels (https://cloud.google.com/bigquery/docs/filtering-labels#filtering_datasets_using_labels) for details. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. |
| `pageToken` | query | string | no | Page token, returned by a previous call, to request the next page of results |

### `bigquery.datasets.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the dataset being updated |
| `datasetId` | path | string | yes | Required. Dataset ID of the dataset being updated |
| `accessPolicyVersion` | query | integer (int32) | conditional | Optional. The version of the provided access policy schema. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. This version refers to the schema version of the access policy and not the version of access policy. This field's value can be equal or more than the access policy schema provided in the request. For example, \* Operations updating conditional access policy binding in datasets must specify version 3. Some of the operations are : - Adding a new access policy entry with condition. - Removing an access policy entry with condition. - Updating an access policy entry with condition. \* But dataset with no conditional role bindings in access policy may specify any valid value or leave the field unset. If unset or if 0 or 1 value is used for dataset with conditional bindings, request will be rejected. This field will be mapped to IAM Policy version (https://cloud.google.com/iam/docs/policies#versions) and will be used to set policy in IAM. |
| `updateMode` | query | string enum | no | Optional. Specifies the fields of dataset that update/patch operation is targeting By default, both metadata and ACL fields are updated. Selecting the update scope takes effect only when fine-grained dataset ACL permissions are enabled (the `enable_fine_grained_dataset_acls_option` configuration setting is `TRUE`). Without the opt-in, BigQuery keeps the previous behavior whatever this value is: `datasets.patch` replaces only the fields provided in the submitted dataset resource (method description), so the access controls change only when the request body includes the `access` field; to leave them unchanged, omit `access` from the body (`UPDATE_METADATA` alone does not protect them). (from `references/access-control-iam/dataset-access-control.md`; permissions by value: see the IAM permissions by setting line of the method above). Values: `UPDATE_MODE_UNSPECIFIED`, `UPDATE_METADATA`, `UPDATE_ACL`, `UPDATE_FULL`. |

### `bigquery.datasets.undelete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the dataset to be undeleted |
| `datasetId` | path | string | yes | Required. Dataset ID of the dataset to restore. (Corrected from the Discovery document; the original description is quoted in Notes.) |

### `bigquery.datasets.update` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the dataset being updated |
| `datasetId` | path | string | yes | Required. Dataset ID of the dataset being updated |
| `accessPolicyVersion` | query | integer (int32) | conditional | Optional. The version of the provided access policy schema. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. This version refers to the schema version of the access policy and not the version of access policy. This field's value can be equal or more than the access policy schema provided in the request. For example, \* Operations updating conditional access policy binding in datasets must specify version 3. Some of the operations are : - Adding a new access policy entry with condition. - Removing an access policy entry with condition. - Updating an access policy entry with condition. \* But dataset with no conditional role bindings in access policy may specify any valid value or leave the field unset. If unset or if 0 or 1 value is used for dataset with conditional bindings, request will be rejected. This field will be mapped to IAM Policy version (https://cloud.google.com/iam/docs/policies#versions) and will be used to set policy in IAM. |
| `updateMode` | query | string enum | no | Optional. Specifies the fields of dataset that update/patch operation is targeting By default, both metadata and ACL fields are updated. Selecting the update scope takes effect only when fine-grained dataset ACL permissions are enabled (the `enable_fine_grained_dataset_acls_option` configuration setting is `TRUE`). Without the opt-in, BigQuery keeps the previous behavior: the request updates both metadata and access controls whatever this value is, so `UPDATE_METADATA` does not keep the access controls unchanged. `datasets.update` replaces the entire dataset resource (method description), so in that case the access controls are replaced too. (from `references/access-control-iam/dataset-access-control.md`; permissions by value: see the IAM permissions by setting line of the method above). Values: `UPDATE_MODE_UNSPECIFIED`, `UPDATE_METADATA`, `UPDATE_ACL`, `UPDATE_FULL`. |

### `bigquery.jobs.cancel` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the job to cancel |
| `jobId` | path | string | yes | Required. Job ID of the job to cancel |
| `location` | query | string | conditional | The geographic location of the job. You must specify the location (https://cloud.google.com/bigquery/docs/locations#specify_locations) to run the job for the following scenarios: \* If the location to run a job is not in the `us` or the `eu` multi-regional location \* If the job's location is in a single region (for example, `us-central1`) |

### `bigquery.jobs.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the job for which metadata is to be deleted. |
| `jobId` | path | string | yes | Required. Job ID of the job for which metadata is to be deleted. If this is a parent job which has child jobs, the metadata from all child jobs will be deleted as well. Direct deletion of the metadata of child jobs is not allowed. |
| `location` | query | string | yes | The geographic location of the job. Required. For more information, see how to specify locations (https://cloud.google.com/bigquery/docs/locations#specify_locations). |

### `bigquery.jobs.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the requested job. |
| `jobId` | path | string | yes | Required. Job ID of the requested job. |
| `location` | query | string | conditional | The geographic location of the job. You must specify the location to run the job for the following scenarios: \* If the location to run a job is not in the `us` or the `eu` multi-regional location \* If the job's location is in a single region (for example, `us-central1`) For more information, see how to specify locations (https://cloud.google.com/bigquery/docs/locations#specify_locations). |

### `bigquery.jobs.getQueryResults` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the query job. |
| `jobId` | path | string | yes | Required. Job ID of the query job. |
| `formatOptions.timestampOutputFormat` | query | string enum | no | Optional. The API output format for a timestamp. This offers more explicit control over the timestamp output format as compared to the existing `use_int64_timestamp` option. Values: `TIMESTAMP_OUTPUT_FORMAT_UNSPECIFIED`, `FLOAT64`, `INT64`, `ISO8601_STRING`. |
| `formatOptions.useInt64Timestamp` | query | boolean | no | Optional. Output timestamp as usec int64. Default is false. |
| `location` | query | string | conditional | The geographic location of the job. You must specify the location to run the job for the following scenarios: \* If the location to run a job is not in the `us` or the `eu` multi-regional location \* If the job's location is in a single region (for example, `us-central1`) For more information, see how to specify locations (https://cloud.google.com/bigquery/docs/locations#specify_locations). |
| `maxResults` | query | integer (uint32) | no | Maximum number of results to read. |
| `pageToken` | query | string | no | Page token, returned by a previous call, to request the next page of results. |
| `startIndex` | query | string (uint64) | no | Zero-based index of the starting row. |
| `timeoutMs` | query | integer (uint32) | no | Optional: Specifies the maximum amount of time, in milliseconds, that the client is willing to wait for the query to complete. By default, this limit is 10 seconds (10,000 milliseconds). If the query is complete, the jobComplete field in the response is true. If the query has not yet completed, jobComplete is false. You can request a longer timeout period in the timeoutMs field. However, the call is not guaranteed to wait for the specified timeout; it typically returns after around 200 seconds (200,000 milliseconds), even if the query is not complete. If jobComplete is false, you can continue to wait for the query to complete by calling the getQueryResults method until the jobComplete field in the getQueryResults response is true. |

### `bigquery.jobs.insert` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Project ID of project that will be billed for the job. |

### `bigquery.jobs.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Project ID of the jobs to list. |
| `allUsers` | query | boolean | no | Whether to display jobs owned by all users in the project. Default False. |
| `maxCreationTime` | query | string (uint64) | no | Max value for job creation time, in milliseconds since the POSIX epoch. If set, only jobs created before or at this timestamp are returned. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. |
| `minCreationTime` | query | string (uint64) | no | Min value for job creation time, in milliseconds since the POSIX epoch. If set, only jobs created after or at this timestamp are returned. |
| `pageToken` | query | string | no | Page token, returned by a previous call, to request the next page of results. |
| `parentJobId` | query | string | no | If set, show only child jobs of the specified parent. Otherwise, show all top-level jobs. |
| `projection` | query | string enum | no | Restrict information returned to a set of selected fields Values: `full`, `minimal`. |
| `stateFilter` | query | repeated string enum | no | Filter for job state Values: `done`, `pending`, `running`. |

### `bigquery.jobs.query` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the query request. |

### `bigquery.models.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the model to delete. |
| `datasetId` | path | string | yes | Required. Dataset ID of the model to delete. |
| `modelId` | path | string | yes | Required. Model ID of the model to delete. |

### `bigquery.models.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the requested model. |
| `datasetId` | path | string | yes | Required. Dataset ID of the requested model. |
| `modelId` | path | string | yes | Required. Model ID of the requested model. |

### `bigquery.models.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the models to list. |
| `datasetId` | path | string | yes | Required. Dataset ID of the models to list. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. |
| `pageToken` | query | string | no | Page token, returned by a previous call to request the next page of results |

### `bigquery.models.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the model to patch. |
| `datasetId` | path | string | yes | Required. Dataset ID of the model to patch. |
| `modelId` | path | string | yes | Required. Model ID of the model to patch. |

### `bigquery.projects.getServiceAccount` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the project. |

### `bigquery.projects.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `maxResults` | query | integer (uint32) | no | `maxResults` unset returns all results, up to 50 per page. Additionally, the number of projects in a page may be fewer than `maxResults` because projects are retrieved and then filtered to only projects with the BigQuery API enabled. |
| `pageToken` | query | string | no | Page token, returned by a previous call, to request the next page of results. If not present, no further pages are present. |

### `bigquery.routines.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the routine to delete |
| `datasetId` | path | string | yes | Required. Dataset ID of the routine to delete |
| `routineId` | path | string | yes | Required. Routine ID of the routine to delete |

### `bigquery.routines.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the requested routine |
| `datasetId` | path | string | yes | Required. Dataset ID of the requested routine |
| `routineId` | path | string | yes | Required. Routine ID of the requested routine |
| `readMask` | query | string (google-fieldmask) | no | If set, only the Routine fields in the field mask are returned in the response. If unset, all Routine fields are returned. |

### `bigquery.routines.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/datasets/{datasetsId}/routines/{routinesId}`. |

### `bigquery.routines.insert` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the new routine |
| `datasetId` | path | string | yes | Required. Dataset ID of the new routine |

### `bigquery.routines.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the routines to list |
| `datasetId` | path | string | yes | Required. Dataset ID of the routines to list |
| `filter` | query | string | no | If set, then only the Routines matching this filter are returned. The supported format is `routineType:{RoutineType}`, where `{RoutineType}` is a RoutineType enum. For example: `routineType:SCALAR_FUNCTION`. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. |
| `pageToken` | query | string | no | Page token, returned by a previous call, to request the next page of results |
| `readMask` | query | string (google-fieldmask) | no | If set, then only the Routine fields in the field mask, as well as project_id, dataset_id and routine_id, are returned in the response. If unset, then the following Routine fields are returned: etag, project_id, dataset_id, routine_id, routine_type, creation_time, last_modified_time, and language. |

### `bigquery.routines.setIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/datasets/{datasetsId}/routines/{routinesId}`. |

### `bigquery.routines.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/datasets/{datasetsId}/routines/{routinesId}`. |

### `bigquery.routines.update` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the routine to update |
| `datasetId` | path | string | yes | Required. Dataset ID of the routine to update |
| `routineId` | path | string | yes | Required. Routine ID of the routine to update |

### `bigquery.rowAccessPolicies.batchDelete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the table to delete the row access policies. |
| `datasetId` | path | string | yes | Required. Dataset ID of the table to delete the row access policies. |
| `tableId` | path | string | yes | Required. Table ID of the table to delete the row access policies. |

### `bigquery.rowAccessPolicies.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the table to delete the row access policy. |
| `datasetId` | path | string | yes | Required. Dataset ID of the table to delete the row access policy. |
| `tableId` | path | string | yes | Required. Table ID of the table to delete the row access policy. |
| `policyId` | path | string | yes | Required. Policy ID of the row access policy. |
| `force` | query | boolean | no | If set to true, it deletes the row access policy even if it's the last row access policy on the table and the deletion will widen the access rather narrowing it. |

### `bigquery.rowAccessPolicies.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the table to get the row access policy. |
| `datasetId` | path | string | yes | Required. Dataset ID of the table to get the row access policy. |
| `tableId` | path | string | yes | Required. Table ID of the table to get the row access policy. |
| `policyId` | path | string | yes | Required. Policy ID of the row access policy. |

### `bigquery.rowAccessPolicies.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}/rowAccessPolicies/{rowAccessPoliciesId}`. |

### `bigquery.rowAccessPolicies.insert` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the table of the row access policy to create. (Corrected from the Discovery document; the original description is quoted in Notes.) |
| `datasetId` | path | string | yes | Required. Dataset ID of the table of the row access policy to create. (Corrected from the Discovery document; the original description is quoted in Notes.) |
| `tableId` | path | string | yes | Required. Table ID of the table of the row access policy to create. (Corrected from the Discovery document; the original description is quoted in Notes.) |

### `bigquery.rowAccessPolicies.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the row access policies to list. |
| `datasetId` | path | string | yes | Required. Dataset ID of row access policies to list. |
| `tableId` | path | string | yes | Required. Table ID of the table to list row access policies. |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. |
| `pageToken` | query | string | no | Page token, returned by a previous call, to request the next page of results. |

### `bigquery.rowAccessPolicies.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}/rowAccessPolicies/{rowAccessPoliciesId}`. |

### `bigquery.rowAccessPolicies.update` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the table of the row access policy to update. (Corrected from the Discovery document; the original description is quoted in Notes.) |
| `datasetId` | path | string | yes | Required. Dataset ID of the table of the row access policy to update. (Corrected from the Discovery document; the original description is quoted in Notes.) |
| `tableId` | path | string | yes | Required. Table ID of the table of the row access policy to update. (Corrected from the Discovery document; the original description is quoted in Notes.) |
| `policyId` | path | string | yes | Required. Policy ID of the row access policy. |

### `bigquery.tabledata.insertAll` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the destination. |
| `datasetId` | path | string | yes | Required. Dataset ID of the destination. |
| `tableId` | path | string | yes | Required. Table ID of the destination. |

### `bigquery.tabledata.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project id of the table to list. |
| `datasetId` | path | string | yes | Required. Dataset id of the table to list. |
| `tableId` | path | string | yes | Required. Table id of the table to list. |
| `formatOptions.timestampOutputFormat` | query | string enum | no | Optional. The API output format for a timestamp. This offers more explicit control over the timestamp output format as compared to the existing `use_int64_timestamp` option. Values: `TIMESTAMP_OUTPUT_FORMAT_UNSPECIFIED`, `FLOAT64`, `INT64`, `ISO8601_STRING`. |
| `formatOptions.useInt64Timestamp` | query | boolean | no | Optional. Output timestamp as usec int64. Default is false. |
| `maxResults` | query | integer (uint32) | no | Row limit of the table. |
| `pageToken` | query | string | no | To retrieve the next page of table data, set this field to the string provided in the pageToken field of the response body from your previous call to tabledata.list. |
| `selectedFields` | query | string | no | Subset of fields to return, supports select into sub fields. Example: `selectedFields=a%2Ce.d.f` (the value `a,e.d.f`, URL-encoded in the query string); |
| `startIndex` | query | string (uint64) | no | Start row index of the table. |

### `bigquery.tables.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the table to delete |
| `datasetId` | path | string | yes | Required. Dataset ID of the table to delete |
| `tableId` | path | string | yes | Required. Table ID of the table to delete |

### `bigquery.tables.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the requested table |
| `datasetId` | path | string | yes | Required. Dataset ID of the requested table |
| `tableId` | path | string | yes | Required. Table ID of the requested table |
| `selectedFields` | query | string | no | List of table schema fields to return (comma-separated). If unspecified, all fields are returned. A fieldMask cannot be used here because the fields will automatically be converted from camelCase to snake_case and the conversion will fail if there are underscores. Since these are fields in BigQuery table schemas, underscores are allowed. |
| `view` | query | string enum | no | Optional. Specifies the view that determines which table information is returned. By default, basic table information and storage statistics (STORAGE_STATS) are returned. Values: `TABLE_METADATA_VIEW_UNSPECIFIED`, `BASIC`, `STORAGE_STATS`, `FULL`. |

### `bigquery.tables.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}`. |

### `bigquery.tables.insert` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the new table |
| `datasetId` | path | string | yes | Required. Dataset ID of the new table |

### `bigquery.tables.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the tables to list |
| `datasetId` | path | string | yes | Required. Dataset ID of the tables to list |
| `maxResults` | query | integer (uint32) | no | The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. |
| `pageToken` | query | string | no | Page token, returned by a previous call, to request the next page of results |

### `bigquery.tables.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the table to update |
| `datasetId` | path | string | yes | Required. Dataset ID of the table to update |
| `tableId` | path | string | yes | Required. Table ID of the table to update |
| `autodetect_schema` | query | boolean | no | Optional. When true will autodetect schema, else will keep original schema |

### `bigquery.tables.setIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}`. |

### `bigquery.tables.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}`. |

### `bigquery.tables.update` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID of the table to update |
| `datasetId` | path | string | yes | Required. Dataset ID of the table to update |
| `tableId` | path | string | yes | Required. Table ID of the table to update |
| `autodetect_schema` | query | boolean | no | Optional. When true will autodetect schema, else will keep original schema |

## Notes

- Generated from the Discovery document(s) v2 of `bigquery` (retrieved 2026-11-14). Resources on this page: datasets, jobs, models, projects, routines, rowAccessPolicies, tabledata, tables.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when the description says that some requests must specify it (for example, `options.requestedPolicyVersion` must be 3 to get a policy with conditional role bindings). Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/bigquery/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`bigquery` v2, revision 20261009) also lists 25 endpoints of the form `https://bigquery.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `asia-south1`, `asia-south2`, `europe-west1`, `europe-west10`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central2`, `northamerica-northeast1`, `northamerica-northeast2`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://bigquery.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://bigquery.asia-south1.rep.googleapis.com/`) and keep the path.
- Corrected from the Discovery document: the `datasetId` description of `bigquery.datasets.undelete` reads "Required. Dataset ID of dataset being deleted", and the `projectId` / `datasetId` / `tableId` descriptions of `bigquery.rowAccessPolicies.insert` and `.update` read "Required. Project ID of the table to get the row access policy." (likewise Dataset ID / Table ID), the text of `rowAccessPolicies.get`; the table describes the dataset to restore and the table of the row access policy to create or update.
- Corrected from the Discovery document: the `bigquery.datasets.list`, `models.list`, `routines.list` and `tables.list` descriptions also state legacy dataset-role requirements, "Lists all datasets in the specified project to which the user has been granted the READER dataset role." (datasets.list) and "Requires the READER dataset role." (models.list, routines.list, tables.list); the summaries above omit them and keep the "IAM Permissions" part of the same descriptions (roles such as `roles/bigquery.metadataViewer` contain these permissions without data access; see `references/iam/`).
- Corrected from the Discovery document: the `bigquery.jobs.get` and `bigquery.jobs.list` descriptions also state legacy project-role requirements, "Requires that you're the person who ran the job, or have the Is Owner project role." (jobs.get) and "Requires the Can View project role, or the Is Owner project role if you set the allUsers property." (jobs.list); the summaries above omit them and keep the "IAM Permissions" part of the same descriptions, whose permissions roles other than Owner also contain (see `references/iam/`).
- Restored from the source proto: the Discovery document shows the label filter syntax in the `filter` description of `bigquery.datasets.list` as `labels.[:]` because it drops angle-bracket placeholders; this page shows it as the proto comment reads: "The syntax is `labels.<name>[:<value>]`." (`google/cloud/bigquery/v2/dataset.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/dataset.proto, commit `5ce0245`, retrieved 2026-11-19).
- Corrected from the Discovery document: the `selectedFields` example of `bigquery.tabledata.list` reads `selected_fields = "a,e.d.f";`, the proto field name; the REST query parameter is `selectedFields`, so this page shows `selectedFields=a%2Ce.d.f`.
- Adapted from the Discovery document: the `bigquery.jobs.insert` description says only "In this case, the Upload URI accepts the job configuration and the data as two distinct multipart MIME parts."; the summary names `uploadType=multipart` for that form and adds the `uploadType=resumable` session start, which the media upload protocols of the same Discovery document define (see the Media upload lines).
- Source: https://bigquery.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
