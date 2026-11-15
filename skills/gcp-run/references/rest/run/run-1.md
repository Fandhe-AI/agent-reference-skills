---
source: https://run.googleapis.com/$discovery/rest?version=v2
---

# Cloud Run Admin API REST API (run) (part 1/2)

## Signature / Usage

Base URL: `https://run.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `run.namespaces.authorizeddomains.list`

- Versions: v1
- `GET https://run.googleapis.com/apis/domains.cloudrun.com/v1/{+parent}/authorizeddomains`
- List authorized domains.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListAuthorizedDomainsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Name of the parent Project resource. Example: `projects/myproject`. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |

### `run.namespaces.configurations.get`

- Versions: v1
- `GET https://run.googleapis.com/apis/serving.knative.dev/v1/{+name}`
- Get information about a configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `Configuration`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the configuration to retrieve. For Cloud Run, replace {namespace_id} with the project ID or number. |

### `run.namespaces.configurations.list`

- Versions: v1
- `GET https://run.googleapis.com/apis/serving.knative.dev/v1/{+parent}/configurations`
- List configurations. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListConfigurationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The namespace from which the configurations should be listed. For Cloud Run, replace {namespace_id} with the project ID or number. |
| `continue` | query | string | no | Optional. Encoded string to continue paging. |
| `fieldSelector` | query | string | no | Not supported by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Not supported by Cloud Run. |
| `labelSelector` | query | string | no | Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | Optional. The maximum number of the records that should be returned. |
| `resourceVersion` | query | string | no | Not supported by Cloud Run. |
| `watch` | query | boolean | no | Not supported by Cloud Run. |

### `run.namespaces.domainmappings.create`

- Versions: v1
- `POST https://run.googleapis.com/apis/domains.cloudrun.com/v1/{+parent}/domainmappings`
- Create a new domain mapping.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `DomainMapping`; Response: `DomainMapping`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The namespace in which the domain mapping should be created. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `run.namespaces.domainmappings.delete`

- Versions: v1
- `DELETE https://run.googleapis.com/apis/domains.cloudrun.com/v1/{+name}`
- Delete a domain mapping.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `Status`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the domain mapping to delete. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `apiVersion` | query | string | no | Cloud Run currently ignores this parameter. |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |
| `kind` | query | string | no | Cloud Run currently ignores this parameter. |
| `propagationPolicy` | query | string | no | Specifies the propagation policy of delete. Cloud Run currently ignores this setting, and deletes in the background. Please see kubernetes.io/docs/concepts/architecture/garbage-collection/ for more information. |

### `run.namespaces.domainmappings.get`

- Versions: v1
- `GET https://run.googleapis.com/apis/domains.cloudrun.com/v1/{+name}`
- Get information about a domain mapping.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `DomainMapping`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the domain mapping to retrieve. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |

### `run.namespaces.domainmappings.list`

- Versions: v1
- `GET https://run.googleapis.com/apis/domains.cloudrun.com/v1/{+parent}/domainmappings`
- List all domain mappings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListDomainMappingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The namespace from which the domain mappings should be listed. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `continue` | query | string | no | Optional. Encoded string to continue paging. |
| `fieldSelector` | query | string | no | Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Not currently used by Cloud Run. |
| `labelSelector` | query | string | no | Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | Optional. The maximum number of records that should be returned. |
| `resourceVersion` | query | string | no | The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run. |
| `watch` | query | boolean | no | Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run. |

### `run.namespaces.executions.cancel`

- Versions: v1
- `POST https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}:cancel`
- Cancel an execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `CancelExecutionRequest`; Response: `Execution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the execution to cancel. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |

### `run.namespaces.executions.delete`

- Versions: v1
- `DELETE https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}`
- Delete an execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `Status`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the execution to delete. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `apiVersion` | query | string | no | Optional. Cloud Run currently ignores this parameter. |
| `kind` | query | string | no | Optional. Cloud Run currently ignores this parameter. |
| `propagationPolicy` | query | string | no | Optional. Specifies the propagation policy of delete. Cloud Run currently ignores this setting. |

### `run.namespaces.executions.get`

- Versions: v1
- `GET https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}`
- Get information about an execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `Execution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the execution to retrieve. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |

### `run.namespaces.executions.list`

- Versions: v1
- `GET https://run.googleapis.com/apis/run.googleapis.com/v1/{+parent}/executions`
- List executions. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListExecutionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The namespace from which the executions should be listed. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `continue` | query | string | no | Optional. Optional encoded string to continue paging. |
| `fieldSelector` | query | string | no | Optional. Not supported by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Optional. Not supported by Cloud Run. |
| `labelSelector` | query | string | no | Optional. Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | Optional. The maximum number of the records that should be returned. |
| `resourceVersion` | query | string | no | Optional. Not supported by Cloud Run. |
| `watch` | query | boolean | no | Optional. Not supported by Cloud Run. |

### `run.namespaces.instances.create`

- Versions: v1
- `POST https://run.googleapis.com/apis/run.googleapis.com/v1/{+parent}/instances`
- Create an Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `Instance`; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource's parent. In Cloud Run, it may be one of the following: \* `{project_id_or_number}` \* `namespaces/{project_id_or_number}` \* `namespaces/{project_id_or_number}/instances` \* `projects/{project_id_or_number}/locations/{region}` \* `projects/{project_id_or_number}/regions/{region}` Parent resource namespace. |
| `dryRun` | query | string | no | Optional. Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `run.namespaces.instances.delete`

- Versions: v1
- `DELETE https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}`
- Delete an Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `Status`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fully qualified name of the Instance to delete. It can be any of the following forms: \* `namespaces/{project_id_or_number}/instances/{instance_name}` (only when the `endpoint` is regional) \* `projects/{project_id_or_number}/locations/{region}/instances/{instance_name}` \* `projects/{project_id_or_number}/regions/{region}/instances/{instance_name}` Parent resource namespace. |
| `apiVersion` | query | string | no | Optional. Cloud Run currently ignores this parameter. |
| `dryRun` | query | string | no | Optional. Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |
| `kind` | query | string | no | Optional. Cloud Run currently ignores this parameter. |
| `propagationPolicy` | query | string | no | Optional. Specifies the propagation policy of delete. Cloud Run currently ignores this setting, and deletes in the background. Please see kubernetes.io/docs/concepts/workloads/controllers/garbage-collection/ for more information. |

### `run.namespaces.instances.get`

- Versions: v1
- `GET https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}`
- Get an Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fully qualified name of the Instance to retrieve. It can be any of the following forms: \* `namespaces/{project_id_or_number}/instances/{instance_name}` (only when the `endpoint` is regional) \* `projects/{project_id_or_number}/locations/{region}/instances/{instance_name}` \* `projects/{project_id_or_number}/regions/{region}/instances/{instance_name}` Parent resource namespace. |

### `run.namespaces.instances.list`

- Versions: v1
- `GET https://run.googleapis.com/apis/run.googleapis.com/v1/{+parent}/instances`
- List Instances. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent from where the resources should be listed. In Cloud Run, it may be one of the following: \* `{project_id_or_number}` \* `namespaces/{project_id_or_number}` \* `namespaces/{project_id_or_number}/instances` \* `projects/{project_id_or_number}/locations/{region}` \* `projects/{project_id_or_number}/regions/{region}` Parent resource namespace. |
| `continue` | query | string | no | Optional. Optional encoded string to continue paging. |
| `fieldSelector` | query | string | no | Optional. Not supported by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Optional. Not supported by Cloud Run. |
| `labelSelector` | query | string | no | Optional. Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | Optional. The maximum number of records that should be returned. |
| `resourceVersion` | query | string | no | Optional. Not supported by Cloud Run. |
| `watch` | query | boolean | no | Optional. Not supported by Cloud Run. |

### `run.namespaces.instances.replaceInstance`

- Versions: v1
- `PUT https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}`
- Replace an Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `Instance`; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fully qualified name of the Instance being replaced. It can be any of the following forms: \* `namespaces/{project_id_or_number}/instances/{instance_name}` (only when the `endpoint` is regional) \* `projects/{project_id_or_number}/locations/{region}/instances/{instance_name}` \* `projects/{project_id_or_number}/regions/{region}/instances/{instance_name}` Parent resource namespace. |
| `dryRun` | query | string | no | Optional. Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `run.namespaces.instances.start`

- Versions: v1
- `POST https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}:start`
- Start an Instance which has been stopped.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `StartInstanceRequest`; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Instance to run. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |

### `run.namespaces.instances.stop`

- Versions: v1
- `POST https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}:stop`
- Stop an Instance that is running.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `StopInstanceRequest`; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Instance to run. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |

### `run.namespaces.jobs.create`

- Versions: v1
- `POST https://run.googleapis.com/apis/run.googleapis.com/v1/{+parent}/jobs`
- Create a job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `Job`; Response: `Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The namespace in which the job should be created. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `dryRun` | query | string | no | Optional. Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `run.namespaces.jobs.delete`

- Versions: v1
- `DELETE https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}`
- Delete a job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `Status`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the job to delete. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `apiVersion` | query | string | no | Optional. Cloud Run currently ignores this parameter. |
| `dryRun` | query | string | no | Optional. Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |
| `kind` | query | string | no | Optional. Cloud Run currently ignores this parameter. |
| `propagationPolicy` | query | string | no | Optional. Specifies the propagation policy of delete. Cloud Run currently ignores this setting, and deletes in the background. Please see kubernetes.io/docs/concepts/workloads/controllers/garbage-collection/ for more information. |

### `run.namespaces.jobs.get`

- Versions: v1
- `GET https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}`
- Get information about a job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the job to retrieve. It takes the form namespaces/{namespace}/jobs/{job_name} and the `endpoint` must be regional. Replace {namespace} with the project ID or number. |

### `run.namespaces.jobs.list`

- Versions: v1
- `GET https://run.googleapis.com/apis/run.googleapis.com/v1/{+parent}/jobs`
- List jobs. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The namespace from which the jobs should be listed. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `continue` | query | string | no | Optional. Optional encoded string to continue paging. |
| `fieldSelector` | query | string | no | Optional. Not supported by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Optional. Not supported by Cloud Run. |
| `labelSelector` | query | string | no | Optional. Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | Optional. The maximum number of records that should be returned. |
| `resourceVersion` | query | string | no | Optional. Not supported by Cloud Run. |
| `watch` | query | boolean | no | Optional. Not supported by Cloud Run. |

### `run.namespaces.jobs.replaceJob`

- Versions: v1
- `PUT https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}`
- Replace a job. Only the spec and metadata labels and annotations are modifiable. After the Replace request, Cloud Run will work to make the 'status' match the requested 'spec'. May provide metadata.resourceVersion to enforce update from last read for optimistic concurrency control.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `Job`; Response: `Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the job being replaced. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `dryRun` | query | string | no | Optional. Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `run.namespaces.jobs.run`

- Versions: v1
- `POST https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}:run`
- Trigger creation of a new execution of this job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `RunJobRequest`; Response: `Execution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the job to run. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |

### `run.namespaces.revisions.delete`

- Versions: v1
- `DELETE https://run.googleapis.com/apis/serving.knative.dev/v1/{+name}`
- Delete a revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `Status`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the revision to delete. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `apiVersion` | query | string | no | Cloud Run currently ignores this parameter. |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |
| `kind` | query | string | no | Cloud Run currently ignores this parameter. |
| `propagationPolicy` | query | string | no | Specifies the propagation policy of delete. Cloud Run currently ignores this setting, and deletes in the background. |

### `run.namespaces.revisions.get`

- Versions: v1
- `GET https://run.googleapis.com/apis/serving.knative.dev/v1/{+name}`
- Get information about a revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `Revision`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the revision to retrieve. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |

### `run.namespaces.revisions.list`

- Versions: v1
- `GET https://run.googleapis.com/apis/serving.knative.dev/v1/{+parent}/revisions`
- List revisions. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The namespace from which the revisions should be listed. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `continue` | query | string | no | Optional. Encoded string to continue paging. |
| `fieldSelector` | query | string | no | Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Not currently used by Cloud Run. |
| `labelSelector` | query | string | no | Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | Optional. The maximum number of records that should be returned. |
| `resourceVersion` | query | string | no | The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run. |
| `watch` | query | boolean | no | Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run. |

### `run.namespaces.routes.get`

- Versions: v1
- `GET https://run.googleapis.com/apis/serving.knative.dev/v1/{+name}`
- Get information about a route.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `Route`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the route to retrieve. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |

### `run.namespaces.routes.list`

- Versions: v1
- `GET https://run.googleapis.com/apis/serving.knative.dev/v1/{+parent}/routes`
- List routes. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListRoutesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The namespace from which the routes should be listed. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `continue` | query | string | no | Optional. Encoded string to continue paging. |
| `fieldSelector` | query | string | no | Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Not currently used by Cloud Run. |
| `labelSelector` | query | string | no | Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | Optional. The maximum number of records that should be returned. |
| `resourceVersion` | query | string | no | The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run. |
| `watch` | query | boolean | no | Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run. |

### `run.namespaces.services.create`

- Versions: v1
- `POST https://run.googleapis.com/apis/serving.knative.dev/v1/{+parent}/services`
- Creates a new Service. Service creation will trigger a new deployment. Use GetService, and check service.status to determine if the Service is ready.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `Service`; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource's parent. In Cloud Run, it may be one of the following: \* `{project_id_or_number}` \* `namespaces/{project_id_or_number}` \* `namespaces/{project_id_or_number}/services` \* `projects/{project_id_or_number}/locations/{region}` \* `projects/{project_id_or_number}/regions/{region}` |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `run.namespaces.services.delete`

- Versions: v1
- `DELETE https://run.googleapis.com/apis/serving.knative.dev/v1/{+name}`
- Deletes the provided service. This will cause the Service to stop serving traffic and will delete all associated Revisions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `Status`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fully qualified name of the service to delete. It can be any of the following forms: \* `namespaces/{project_id_or_number}/services/{service_name}` (only when the `endpoint` is regional) \* `projects/{project_id_or_number}/locations/{region}/services/{service_name}` \* `projects/{project_id_or_number}/regions/{region}/services/{service_name}` |
| `apiVersion` | query | string | no | Not supported, and ignored by Cloud Run. |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |
| `kind` | query | string | no | Not supported, and ignored by Cloud Run. |
| `propagationPolicy` | query | string | no | Not supported, and ignored by Cloud Run. |

### `run.namespaces.services.get`

- Versions: v1
- `GET https://run.googleapis.com/apis/serving.knative.dev/v1/{+name}`
- Gets information about a service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fully qualified name of the service to retrieve. It can be any of the following forms: \* `namespaces/{project_id_or_number}/services/{service_name}` (only when the `endpoint` is regional) \* `projects/{project_id_or_number}/locations/{region}/services/{service_name}` \* `projects/{project_id_or_number}/regions/{region}/services/{service_name}` |

### `run.namespaces.services.list`

- Versions: v1
- `GET https://run.googleapis.com/apis/serving.knative.dev/v1/{+parent}/services`
- Lists services for the given project and region. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent from where the resources should be listed. In Cloud Run, it may be one of the following: \* `{project_id_or_number}` \* `namespaces/{project_id_or_number}` \* `namespaces/{project_id_or_number}/services` \* `projects/{project_id_or_number}/locations/{region}` \* `projects/{project_id_or_number}/regions/{region}` |
| `continue` | query | string | no | Encoded string to continue paging. |
| `fieldSelector` | query | string | no | Not supported, and ignored by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Not supported, and ignored by Cloud Run. |
| `labelSelector` | query | string | no | Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | The maximum number of records that should be returned. |
| `resourceVersion` | query | string | no | Not supported, and ignored by Cloud Run. |
| `watch` | query | boolean | no | Not supported, and ignored by Cloud Run. |

### `run.namespaces.services.replaceService`

- Versions: v1
- `PUT https://run.googleapis.com/apis/serving.knative.dev/v1/{+name}`
- Replaces a service. Only the spec and metadata labels and annotations are modifiable. After the Update request, Cloud Run will work to make the 'status' match the requested 'spec'. May provide metadata.resourceVersion to enforce update from last read for optimistic concurrency control.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `Service`; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fully qualified name of the service to replace. It can be any of the following forms: \* `namespaces/{project_id_or_number}/services/{service_name}` (only when the `endpoint` is regional) \* `projects/{project_id_or_number}/locations/{region}/services/{service_name}` \* `projects/{project_id_or_number}/regions/{region}/services/{service_name}` |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `run.namespaces.tasks.get`

- Versions: v1
- `GET https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}`
- Get information about a task.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `Task`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the task to retrieve. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |

### `run.namespaces.tasks.list`

- Versions: v1
- `GET https://run.googleapis.com/apis/run.googleapis.com/v1/{+parent}/tasks`
- List tasks.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListTasksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The namespace from which the tasks should be listed. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `continue` | query | string | no | Optional. Optional encoded string to continue paging. |
| `fieldSelector` | query | string | no | Optional. Not supported by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Optional. Not supported by Cloud Run. |
| `labelSelector` | query | string | no | Optional. Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. For example, to list all tasks of execution "foo" in succeeded state: `run.googleapis.com/execution=foo,run.googleapis.com/runningState=Succeeded`. Supported states are: \* `Pending`: Initial state of all tasks. The task has not yet started but eventually will. \* `Running`: Container instances for this task are running or will be running shortly. \* `Succeeded`: No more container instances to run for the task, and the last attempt succeeded. \* `Failed`: No more container instances to run for the task, and the last attempt failed. This task has run out of retry attempts. \* `Cancelled`: Task was running but got stopped because its parent execution has been aborted. \* `Abandoned`: The task has not yet started and never will because its parent execution has been aborted. |
| `limit` | query | integer (int32) | no | Optional. The maximum number of records that should be returned. |
| `resourceVersion` | query | string | no | Optional. Not supported by Cloud Run. |
| `watch` | query | boolean | no | Optional. Not supported by Cloud Run. |

### `run.namespaces.workerpools.create`

- Versions: v1
- `POST https://run.googleapis.com/apis/run.googleapis.com/v1/{+parent}/workerpools`
- Creates a new WorkerPool. WorkerPool creation will trigger a new deployment. Use GetWorkerPool, and check worker_pool.status to determine if the WorkerPool is ready.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `WorkerPool`; Response: `WorkerPool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource's parent. In Cloud Run, it may be one of the following: \* `{project_id_or_number}` \* `namespaces/{project_id_or_number}` \* `namespaces/{project_id_or_number}/workerpools` \* `projects/{project_id_or_number}/locations/{region}` \* `projects/{project_id_or_number}/regions/{region}` |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `run.namespaces.workerpools.delete`

- Versions: v1
- `DELETE https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}`
- Deletes the provided worker pool. This will cause the WorkerPool to stop all instances and will delete all associated WorkerPoolRevisions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `Status`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fully qualified name of the worker pool to delete. It can be any of the following forms: \* `namespaces/{project_id_or_number}/workerpools/{worker_pool_name}` (only when the `endpoint` is regional) \* `projects/{project_id_or_number}/locations/{region}/workerpools/{worker_pool_name}` \* `projects/{project_id_or_number}/regions/{region}/workerpools/{worker_pool_name}` |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `run.namespaces.workerpools.get`

- Versions: v1
- `GET https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}`
- Gets information about a worker pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `WorkerPool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fully qualified name of the worker pool to retrieve. It can be any of the following forms: \* `namespaces/{project_id_or_number}/workerpools/{worker_pool_name}` (only when the `endpoint` is regional) \* `projects/{project_id_or_number}/locations/{region}/workerpools/{worker_pool_name}` \* `projects/{project_id_or_number}/regions/{region}/workerpools/{worker_pool_name}` |

### `run.namespaces.workerpools.list`

- Versions: v1
- `GET https://run.googleapis.com/apis/run.googleapis.com/v1/{+parent}/workerpools`
- Lists worker pools for the given project and region. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListWorkerPoolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent from where the resources should be listed. In Cloud Run, it may be one of the following: \* `{project_id_or_number}` \* `namespaces/{project_id_or_number}` \* `namespaces/{project_id_or_number}/workerpools` \* `projects/{project_id_or_number}/locations/{region}` \* `projects/{project_id_or_number}/regions/{region}` |
| `continue` | query | string | no | Encoded string to continue paging. |
| `labelSelector` | query | string | no | =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | The maximum number of records that should be returned. |

### `run.namespaces.workerpools.replaceWorkerPool`

- Versions: v1
- `PUT https://run.googleapis.com/apis/run.googleapis.com/v1/{+name}`
- Replaces a worker pool. Only the spec and metadata labels and annotations are modifiable. After the Update request, Cloud Run will work to make the 'status' match the requested 'spec'. May provide metadata.resourceVersion to enforce update from last read for optimistic concurrency control.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `WorkerPool`; Response: `WorkerPool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fully qualified name of the worker pool to replace. It can be any of the following forms: \* `namespaces/{project_id_or_number}/workerpools/{worker_pool_name}` (only when the `endpoint` is regional) \* `projects/{project_id_or_number}/locations/{region}/workerpools/{worker_pool_name}` \* `projects/{project_id_or_number}/regions/{region}/workerpools/{worker_pool_name}` |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `run.projects.authorizeddomains.list`

- Versions: v1
- `GET https://run.googleapis.com/v1/{+parent}/authorizeddomains`
- List authorized domains.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListAuthorizedDomainsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Name of the parent Project resource. Example: `projects/myproject`. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |

### `run.projects.locations.authorizeddomains.list`

- Versions: v1
- `GET https://run.googleapis.com/v1/{+parent}/authorizeddomains`
- List authorized domains.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListAuthorizedDomainsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Name of the parent Project resource. Example: `projects/myproject`. |
| `pageSize` | query | integer (int32) | no | Maximum results to return per page. |
| `pageToken` | query | string | no | Continuation token for fetching the next page of results. |

### `run.projects.locations.builds.submit`

- Versions: v2
- `POST https://run.googleapis.com/v2/{+parent}/builds:submit`
- Submits a build in a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2SubmitBuildRequest`; Response: `GoogleCloudRunV2SubmitBuildResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location to build in. Location must be a region, e.g., 'us-central1' or 'global' if the global builder is to be used. Format: `projects/{project}/locations/{location}` |

### `run.projects.locations.configurations.get`

- Versions: v1
- `GET https://run.googleapis.com/v1/{+name}`
- Get information about a configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `Configuration`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the configuration to retrieve. For Cloud Run, replace {namespace_id} with the project ID or number. |

### `run.projects.locations.configurations.list`

- Versions: v1
- `GET https://run.googleapis.com/v1/{+parent}/configurations`
- List configurations. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListConfigurationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The namespace from which the configurations should be listed. For Cloud Run, replace {namespace_id} with the project ID or number. |
| `continue` | query | string | no | Optional. Encoded string to continue paging. |
| `fieldSelector` | query | string | no | Not supported by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Not supported by Cloud Run. |
| `labelSelector` | query | string | no | Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | Optional. The maximum number of the records that should be returned. |
| `resourceVersion` | query | string | no | Not supported by Cloud Run. |
| `watch` | query | boolean | no | Not supported by Cloud Run. |

### `run.projects.locations.domainmappings.create`

- Versions: v1
- `POST https://run.googleapis.com/v1/{+parent}/domainmappings`
- Create a new domain mapping.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `DomainMapping`; Response: `DomainMapping`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The namespace in which the domain mapping should be created. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `run.projects.locations.domainmappings.delete`

- Versions: v1
- `DELETE https://run.googleapis.com/v1/{+name}`
- Delete a domain mapping.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `Status`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the domain mapping to delete. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `apiVersion` | query | string | no | Cloud Run currently ignores this parameter. |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |
| `kind` | query | string | no | Cloud Run currently ignores this parameter. |
| `propagationPolicy` | query | string | no | Specifies the propagation policy of delete. Cloud Run currently ignores this setting, and deletes in the background. Please see kubernetes.io/docs/concepts/architecture/garbage-collection/ for more information. |

### `run.projects.locations.domainmappings.get`

- Versions: v1
- `GET https://run.googleapis.com/v1/{+name}`
- Get information about a domain mapping.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `DomainMapping`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the domain mapping to retrieve. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |

### `run.projects.locations.domainmappings.list`

- Versions: v1
- `GET https://run.googleapis.com/v1/{+parent}/domainmappings`
- List all domain mappings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListDomainMappingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The namespace from which the domain mappings should be listed. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `continue` | query | string | no | Optional. Encoded string to continue paging. |
| `fieldSelector` | query | string | no | Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Not currently used by Cloud Run. |
| `labelSelector` | query | string | no | Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | Optional. The maximum number of records that should be returned. |
| `resourceVersion` | query | string | no | The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run. |
| `watch` | query | boolean | no | Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run. |

### `run.projects.locations.exportImage`

- Versions: v2
- `POST https://run.googleapis.com/v2/{+name}:exportImage`
- Export image for a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2ExportImageRequest`; Response: `GoogleCloudRunV2ExportImageResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource of which image metadata should be exported. Format: `projects/{project_id_or_number}/locations/{location}/services/{service}/revisions/{revision}` for Revision `projects/{project_id_or_number}/locations/{location}/jobs/{job}/executions/{execution}` for Execution |

### `run.projects.locations.exportImageMetadata`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+name}:exportImageMetadata`
- Export image metadata for a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleCloudRunV2Metadata`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource of which image metadata should be exported. Format: `projects/{project_id_or_number}/locations/{location}/services/{service}/revisions/{revision}` for Revision `projects/{project_id_or_number}/locations/{location}/jobs/{job}/executions/{execution}` for Execution |

### `run.projects.locations.exportMetadata`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+name}:exportMetadata`
- Export generated customer metadata for a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleCloudRunV2Metadata`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource of which metadata should be exported. Format: `projects/{project_id_or_number}/locations/{location}/services/{service}` for Service `projects/{project_id_or_number}/locations/{location}/services/{service}/revisions/{revision}` for Revision `projects/{project_id_or_number}/locations/{location}/jobs/{job}/executions/{execution}` for Execution {project_id_or_number} may contains domain-scoped project IDs |

### `run.projects.locations.exportProjectMetadata`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+name}:exportProjectMetadata`
- Export generated customer metadata for a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleCloudRunV2Metadata`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the project of which metadata should be exported. Format: `projects/{project_id_or_number}/locations/{location}` for Project in a given location. |

### `run.projects.locations.instances.create`

- Versions: v2
- `POST https://run.googleapis.com/v2/{+parent}/instances`
- Creates an Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2Instance`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location and project in which this Instance should be created. |
| `instanceId` | query | string | no | Optional. The unique identifier for the Instance. It must begin with letter, and cannot end with hyphen; must contain fewer than 50 characters. The name of the instance becomes {parent}/instances/{instance_id}. If not provided, the server will generate a unique `instance_id`. |
| `validateOnly` | query | boolean | no | Optional. Indicates that the request should be validated and default values populated, without persisting the request or creating any resources. |

### `run.projects.locations.instances.delete`

- Versions: v2
- `DELETE https://run.googleapis.com/v2/{+name}`
- Deletes an Instance
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Instance to delete. |
| `etag` | query | string | no | Optional. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. |
| `validateOnly` | query | boolean | no | Optional. Indicates that the request should be validated without actually deleting any resources. |

### `run.projects.locations.instances.get`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+name}`
- Gets an Instance
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Instance to retrieve. |

### `run.projects.locations.instances.getIamPolicy`

- Versions: v2, v1
- `GET https://run.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the IAM Access Control policy currently in effect for the given Instance. This result does not include any inherited policies.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `run.projects.locations.instances.list`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+parent}/instances`
- Lists Instances. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2ListInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location and project to list resources on. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of Instances to return in this call. |
| `pageToken` | query | string | no | Optional. A page token received from a previous call to ListInstances. All other parameters must match. |
| `showDeleted` | query | boolean | no | Optional. If true, returns deleted (but unexpired) resources along with active ones. |

### `run.projects.locations.instances.patch`

- Versions: v2
- `PATCH https://run.googleapis.com/v2/{+name}`
- Updates an Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2Instance`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The fully qualified name of this Instance. In `CreateInstanceRequest`, this field is ignored, and instead composed from `CreateInstanceRequest.parent` and `CreateInstanceRequest.instance_id`. |
| `allowMissing` | query | boolean | no | Optional. If set to `true`, and if the Instance does not exist, it will create a new one. The caller must have `run.instances.create` permissions if this is set to `true` and the Instance does not exist. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to be updated. |
| `validateOnly` | query | boolean | no | Optional. Indicates that the request should be validated and default values populated, without persisting the request or updating any resources. |

### `run.projects.locations.instances.setIamPolicy`

- Versions: v2, v1
- `POST https://run.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the IAM Access control policy for the specified Instance. Overwrites any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `run.projects.locations.instances.start`

- Versions: v2
- `POST https://run.googleapis.com/v2/{+name}:start`
- Starts an Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2StartInstanceRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Instance to start. |

### `run.projects.locations.instances.stop`

- Versions: v2
- `POST https://run.googleapis.com/v2/{+name}:stop`
- Stops an Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2StopInstanceRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Instance to stop. |

### `run.projects.locations.instances.testIamPermissions`

- Versions: v2, v1
- `POST https://run.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified Project. There are no permissions required for making this API call.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `run.projects.locations.jobs.create`

- Versions: v2
- `POST https://run.googleapis.com/v2/{+parent}/jobs`
- Creates a Job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2Job`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location and project in which this Job should be created. Format: projects/{project}/locations/{location}, where {project} can be project id or number. |
| `jobId` | query | string | no | Optional. The unique identifier for the Job. The name of the job becomes {parent}/jobs/{job_id}. If not provided, the server will generate a unique `job_id`. |
| `validateOnly` | query | boolean | no | Indicates that the request should be validated and default values populated, without persisting the request or creating any resources. |

### `run.projects.locations.jobs.delete`

- Versions: v2
- `DELETE https://run.googleapis.com/v2/{+name}`
- Deletes a Job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the Job. Format: projects/{project}/locations/{location}/jobs/{job}, where {project} can be project id or number. |
| `etag` | query | string | no | A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. |
| `validateOnly` | query | boolean | no | Indicates that the request should be validated without actually deleting any resources. |

### `run.projects.locations.jobs.executions.cancel`

- Versions: v2
- `POST https://run.googleapis.com/v2/{+name}:cancel`
- Cancels an Execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2CancelExecutionRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Execution to cancel. Format: `projects/{project}/locations/{location}/jobs/{job}/executions/{execution}`, where `{project}` can be project id or number. |

### `run.projects.locations.jobs.executions.delete`

- Versions: v2
- `DELETE https://run.googleapis.com/v2/{+name}`
- Deletes an Execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Execution to delete. Format: `projects/{project}/locations/{location}/jobs/{job}/executions/{execution}`, where `{project}` can be project id or number. |
| `etag` | query | string | no | A system-generated fingerprint for this version of the resource. This may be used to detect modification conflict during updates. |
| `validateOnly` | query | boolean | no | Indicates that the request should be validated without actually deleting any resources. |

### `run.projects.locations.jobs.executions.exportStatus`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+name}/{+operationId}:exportStatus`
- Read the status of an image export operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleCloudRunV2ExportStatusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource of which image export operation status has to be fetched. Format: `projects/{project_id_or_number}/locations/{location}/services/{service}/revisions/{revision}` for Revision `projects/{project_id_or_number}/locations/{location}/jobs/{job}/executions/{execution}` for Execution |
| `operationId` | path | string | yes | Required. The operation id returned from ExportImage. |

### `run.projects.locations.jobs.executions.get`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+name}`
- Gets information about an Execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2Execution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the Execution. Format: `projects/{project}/locations/{location}/jobs/{job}/executions/{execution}`, where `{project}` can be project id or number. |

### `run.projects.locations.jobs.executions.list`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+parent}/executions`
- Lists Executions from a Job. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2ListExecutionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Execution from which the Executions should be listed. To list all Executions across Jobs, use "-" instead of Job name. Format: `projects/{project}/locations/{location}/jobs/{job}`, where `{project}` can be project id or number. |
| `pageSize` | query | integer (int32) | no | Maximum number of Executions to return in this call. |
| `pageToken` | query | string | no | A page token received from a previous call to ListExecutions. All other parameters must match. |
| `showDeleted` | query | boolean | no | If true, returns deleted (but unexpired) resources along with active ones. |

### `run.projects.locations.jobs.executions.tasks.get`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+name}`
- Gets information about a Task.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2Task`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the Task. Format: projects/{project}/locations/{location}/jobs/{job}/executions/{execution}/tasks/{task} |

### `run.projects.locations.jobs.executions.tasks.list`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+parent}/tasks`
- Lists Tasks from an Execution of a Job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2ListTasksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Execution from which the Tasks should be listed. To list all Tasks across Executions of a Job, use "-" instead of Execution name. To list all Tasks across Jobs, use "-" instead of Job name. Format: projects/{project}/locations/{location}/jobs/{job}/executions/{execution} |
| `pageSize` | query | integer (int32) | no | Maximum number of Tasks to return in this call. |
| `pageToken` | query | string | no | A page token received from a previous call to ListTasks. All other parameters must match. |
| `showDeleted` | query | boolean | no | If true, returns deleted (but unexpired) resources along with active ones. |

### `run.projects.locations.jobs.get`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+name}`
- Gets information about a Job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the Job. Format: projects/{project}/locations/{location}/jobs/{job}, where {project} can be project id or number. |

### `run.projects.locations.jobs.getIamPolicy`

- Versions: v2, v1
- `GET https://run.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the IAM Access Control policy currently in effect for the given Job. This result does not include any inherited policies.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `run.projects.locations.jobs.list`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+parent}/jobs`
- Lists Jobs. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2ListJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location and project to list resources on. Format: projects/{project}/locations/{location}, where {project} can be project id or number. |
| `pageSize` | query | integer (int32) | no | Maximum number of Jobs to return in this call. |
| `pageToken` | query | string | no | A page token received from a previous call to ListJobs. All other parameters must match. |
| `showDeleted` | query | boolean | no | If true, returns deleted (but unexpired) resources along with active ones. |

### `run.projects.locations.jobs.patch`

- Versions: v2
- `PATCH https://run.googleapis.com/v2/{+name}`
- Updates a Job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2Job`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The fully qualified name of this Job. Format: projects/{project}/locations/{location}/jobs/{job} |
| `allowMissing` | query | boolean | no | Optional. If set to true, and if the Job does not exist, it will create a new one. Caller must have both create and update permissions for this call if this is set to true. |
| `validateOnly` | query | boolean | no | Indicates that the request should be validated and default values populated, without persisting the request or updating any resources. |

### `run.projects.locations.jobs.run`

- Versions: v2
- `POST https://run.googleapis.com/v2/{+name}:run`
- Triggers creation of a new Execution of this Job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2RunJobRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the Job. Format: projects/{project}/locations/{location}/jobs/{job}, where {project} can be project id or number. |

### `run.projects.locations.jobs.setIamPolicy`

- Versions: v2, v1
- `POST https://run.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the IAM Access control policy for the specified Job. Overwrites any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `run.projects.locations.jobs.testIamPermissions`

- Versions: v2, v1
- `POST https://run.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified Project. There are no permissions required for making this API call.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `run.projects.locations.list`

- Versions: v1
- `GET https://run.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `run.projects.locations.operations.delete`

- Versions: v2, v1
- `DELETE https://run.googleapis.com/v2/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `run.projects.locations.operations.get`

- Versions: v2, v1
- `GET https://run.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `run.projects.locations.operations.list`

- Versions: v2, v1
- `GET https://run.googleapis.com/v2/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. To query for all of the operations for a project. |
| `filter` | query | string | no | Optional. A filter for matching the completed or in-progress operations. The supported formats of \*filter\* are: To query for only completed operations: done:true To query for only ongoing operations: done:false Must be empty to query for all of the latest operations for the given parent project. |
| `pageSize` | query | integer (int32) | no | The maximum number of records that should be returned. Requested page size cannot exceed 100. If not set or set to less than or equal to 0, the default page size is 100. . |
| `pageToken` | query | string | no | Token identifying which result to start with, which is returned by a previous list call. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `run.projects.locations.operations.wait`

- Versions: v2, v1
- `POST https://run.googleapis.com/v2/{+name}:wait`
- Waits until the specified long-running operation is done or reaches at most a specified timeout, returning the latest state. If the operation is already done, the latest state is immediately returned. If the timeout specified is greater than the default HTTP/RPC timeout, the HTTP/RPC timeout is used. If the server does not support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort basis. It may return the latest state before the specified timeout (including immediately), meaning even an immediate response is no guarantee that the operation is done.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: `GoogleLongrunningWaitOperationRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to wait on. |

### `run.projects.locations.revisions.delete`

- Versions: v1
- `DELETE https://run.googleapis.com/v1/{+name}`
- Delete a revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `Status`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the revision to delete. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `apiVersion` | query | string | no | Cloud Run currently ignores this parameter. |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |
| `kind` | query | string | no | Cloud Run currently ignores this parameter. |
| `propagationPolicy` | query | string | no | Specifies the propagation policy of delete. Cloud Run currently ignores this setting, and deletes in the background. |

### `run.projects.locations.revisions.get`

- Versions: v1
- `GET https://run.googleapis.com/v1/{+name}`
- Get information about a revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `Revision`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the revision to retrieve. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |

### `run.projects.locations.revisions.list`

- Versions: v1
- `GET https://run.googleapis.com/v1/{+parent}/revisions`
- List revisions. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The namespace from which the revisions should be listed. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `continue` | query | string | no | Optional. Encoded string to continue paging. |
| `fieldSelector` | query | string | no | Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Not currently used by Cloud Run. |
| `labelSelector` | query | string | no | Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | Optional. The maximum number of records that should be returned. |
| `resourceVersion` | query | string | no | The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run. |
| `watch` | query | boolean | no | Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run. |

### `run.projects.locations.routes.get`

- Versions: v1
- `GET https://run.googleapis.com/v1/{+name}`
- Get information about a route.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `Route`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the route to retrieve. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |

### `run.projects.locations.routes.list`

- Versions: v1
- `GET https://run.googleapis.com/v1/{+parent}/routes`
- List routes. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `ListRoutesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The namespace from which the routes should be listed. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID |
| `continue` | query | string | no | Optional. Encoded string to continue paging. |
| `fieldSelector` | query | string | no | Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run. |
| `includeUninitialized` | query | boolean | no | Not currently used by Cloud Run. |
| `labelSelector` | query | string | no | Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. |
| `limit` | query | integer (int32) | no | Optional. The maximum number of records that should be returned. |
| `resourceVersion` | query | string | no | The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run. |
| `watch` | query | boolean | no | Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run. |

### `run.projects.locations.services.create`

- Versions: v2, v1
- `POST https://run.googleapis.com/v2/{+parent}/services`
- Creates a new Service in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2Service`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location and project in which this service should be created. Format: projects/{project}/locations/{location}, where {project} can be project id or number. Only lowercase characters, digits, and hyphens. |
| `serviceId` | query | string | no | Optional. The unique identifier for the Service. It must begin with letter, and cannot end with hyphen; must contain fewer than 50 characters. The name of the service becomes {parent}/services/{service_id}. If not provided, the server will generate a unique `service_id`. |
| `validateOnly` | query | boolean | no | Indicates that the request should be validated and default values populated, without persisting the request or creating any resources. |

### `run.projects.locations.services.delete`

- Versions: v2, v1
- `DELETE https://run.googleapis.com/v2/{+name}`
- Deletes a Service. This will cause the Service to stop serving traffic and will delete all revisions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the Service. Format: projects/{project}/locations/{location}/services/{service}, where {project} can be project id or number. |
| `etag` | query | string | no | A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. |
| `validateOnly` | query | boolean | no | Indicates that the request should be validated without actually deleting any resources. |

### `run.projects.locations.services.get`

- Versions: v2, v1
- `GET https://run.googleapis.com/v2/{+name}`
- Gets information about a Service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the Service. Format: projects/{project}/locations/{location}/services/{service}, where {project} can be project id or number. |

### `run.projects.locations.services.getIamPolicy`

- Versions: v2, v1
- `GET https://run.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the IAM Access Control policy currently in effect for the given Cloud Run Service. This result does not include any inherited policies.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `run.projects.locations.services.list`

- Versions: v2, v1
- `GET https://run.googleapis.com/v2/{+parent}/services`
- Lists Services. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2ListServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location and project to list resources on. Location must be a valid Google Cloud region, and cannot be the "-" wildcard. Format: projects/{project}/locations/{location}, where {project} can be project id or number. |
| `pageSize` | query | integer (int32) | no | Maximum number of Services to return in this call. |
| `pageToken` | query | string | no | A page token received from a previous call to ListServices. All other parameters must match. |
| `showDeleted` | query | boolean | no | If true, returns deleted (but unexpired) resources along with active ones. |

### `run.projects.locations.services.patch`

- Versions: v2
- `PATCH https://run.googleapis.com/v2/{+name}`
- Updates a Service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2Service`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The fully qualified name of this Service. In CreateServiceRequest, this field is ignored, and instead composed from CreateServiceRequest.parent and CreateServiceRequest.service_id. Format: projects/{project}/locations/{location}/services/{service_id} |
| `allowMissing` | query | boolean | no | Optional. If set to true, and if the Service does not exist, it will create a new one. The caller must have 'run.services.create' permissions if this is set to true and the Service does not exist. |
| `forceNewRevision` | query | boolean | no | Optional. If set to true, a new revision will be created from the template even if the system doesn't detect any changes from the previously deployed revision. This may be useful for cases where the underlying resources need to be recreated or reinitialized. For example if the image is specified by label, but the underlying image digest has changed) or if the container performs deployment initialization work that needs to be performed again. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to be updated. |
| `validateOnly` | query | boolean | no | Indicates that the request should be validated and default values populated, without persisting the request or updating any resources. |

### `run.projects.locations.services.replaceService`

- Versions: v1
- `PUT https://run.googleapis.com/v1/{+name}`
- Replaces a service. Only the spec and metadata labels and annotations are modifiable. After the Update request, Cloud Run will work to make the 'status' match the requested 'spec'. May provide metadata.resourceVersion to enforce update from last read for optimistic concurrency control.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `Service`; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fully qualified name of the service to replace. It can be any of the following forms: \* `namespaces/{project_id_or_number}/services/{service_name}` (only when the `endpoint` is regional) \* `projects/{project_id_or_number}/locations/{region}/services/{service_name}` \* `projects/{project_id_or_number}/regions/{region}/services/{service_name}` |
| `dryRun` | query | string | no | Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `run.projects.locations.services.revisions.delete`

- Versions: v2
- `DELETE https://run.googleapis.com/v2/{+name}`
- Deletes a Revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Revision to delete. Format: projects/{project}/locations/{location}/services/{service}/revisions/{revision} |
| `etag` | query | string | no | A system-generated fingerprint for this version of the resource. This may be used to detect modification conflict during updates. |
| `validateOnly` | query | boolean | no | Indicates that the request should be validated without actually deleting any resources. |

### `run.projects.locations.services.revisions.exportStatus`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+name}/{+operationId}:exportStatus`
- Read the status of an image export operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleCloudRunV2ExportStatusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource of which image export operation status has to be fetched. Format: `projects/{project_id_or_number}/locations/{location}/services/{service}/revisions/{revision}` for Revision `projects/{project_id_or_number}/locations/{location}/jobs/{job}/executions/{execution}` for Execution |
| `operationId` | path | string | yes | Required. The operation id returned from ExportImage. |

### `run.projects.locations.services.revisions.get`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+name}`
- Gets information about a Revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2Revision`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the Revision. Format: projects/{project}/locations/{location}/services/{service}/revisions/{revision} |

### `run.projects.locations.services.revisions.list`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+parent}/revisions`
- Lists Revisions from a given Service, or from a given location. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2ListRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Service from which the Revisions should be listed. To list all Revisions across Services, use "-" instead of Service name. Format: projects/{project}/locations/{location}/services/{service} |
| `pageSize` | query | integer (int32) | no | Maximum number of revisions to return in this call. |
| `pageToken` | query | string | no | A page token received from a previous call to ListRevisions. All other parameters must match. |
| `showDeleted` | query | boolean | no | If true, returns deleted (but unexpired) resources along with active ones. |

### `run.projects.locations.services.setIamPolicy`

- Versions: v2, v1
- `POST https://run.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the IAM Access control policy for the specified Service. Overwrites any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `run.projects.locations.services.testIamPermissions`

- Versions: v2, v1
- `POST https://run.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified Project. There are no permissions required for making this API call.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `run.projects.locations.sourceUploads.upload`

- Versions: v2
- `POST https://run.googleapis.com/v2/{+parent}:uploadSource`
- Uploads a source archive to a Google Cloud Storage bucket through Cloud Run. The uploaded source object should be used for Cloud Run resource deployments. User is responsible for managing the lifecycle of the uploaded object. If uploading through the Cloud Run API to Cloud Storage is not desired, you can use the IAM Deny Policy to deny the `run.locations.uploadSource` permission for all principals.
- Media upload (simple): `POST https://run.googleapis.com/upload/v2/{+parent}:uploadSource` with `uploadType=media` (the body is the file content only) or `uploadType=multipart` (a `multipart/related` body with the JSON metadata part followed by the content part)
- Media upload limits: accepted media types: `*/*`; maximum size: 262144000 bytes
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2UploadSourceRequest`; Response: `GoogleCloudRunV2UploadSourceResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location in which the source archive should be uploaded to, specified in the format `projects/*/locations/*`. |

### `run.projects.locations.workerPools.create`

- Versions: v2
- `POST https://run.googleapis.com/v2/{+parent}/workerPools`
- Creates a new WorkerPool in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2WorkerPool`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location and project in which this worker pool should be created. Format: `projects/{project}/locations/{location}`, where `{project}` can be project id or number. Only lowercase characters, digits, and hyphens. |
| `validateOnly` | query | boolean | no | Optional. Indicates that the request should be validated and default values populated, without persisting the request or creating any resources. |
| `workerPoolId` | query | string | no | Optional. The unique identifier for the WorkerPool. It must begin with letter, and cannot end with hyphen; must contain fewer than 50 characters. The name of the worker pool becomes `{parent}/workerPools/{worker_pool_id}`. If not provided, the server will generate a unique `worker_pool_id`. |

### `run.projects.locations.workerPools.delete`

- Versions: v2
- `DELETE https://run.googleapis.com/v2/{+name}`
- Deletes a WorkerPool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the WorkerPool. Format: `projects/{project}/locations/{location}/workerPools/{worker_pool}`, where `{project}` can be project id or number. |
| `etag` | query | string | no | A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. |
| `validateOnly` | query | boolean | no | Optional. Indicates that the request should be validated without actually deleting any resources. |

### `run.projects.locations.workerPools.get`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+name}`
- Gets information about a WorkerPool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2WorkerPool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the WorkerPool. Format: `projects/{project}/locations/{location}/workerPools/{worker_pool}`, where `{project}` can be project id or number. |

### `run.projects.locations.workerPools.getIamPolicy`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the IAM Access Control policy currently in effect for the given Cloud Run WorkerPool. This result does not include any inherited policies.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `run.projects.locations.workerPools.list`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+parent}/workerPools`
- Lists WorkerPools. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2ListWorkerPoolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location and project to list resources on. Location must be a valid Google Cloud region, and cannot be the "-" wildcard. Format: `projects/{project}/locations/{location}`, where `{project}` can be project id or number. |
| `pageSize` | query | integer (int32) | no | Maximum number of WorkerPools to return in this call. |
| `pageToken` | query | string | no | A page token received from a previous call to ListWorkerPools. All other parameters must match. |
| `showDeleted` | query | boolean | no | If true, returns deleted (but unexpired) resources along with active ones. |

### `run.projects.locations.workerPools.patch`

- Versions: v2
- `PATCH https://run.googleapis.com/v2/{+name}`
- Updates a WorkerPool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleCloudRunV2WorkerPool`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The fully qualified name of this WorkerPool. In CreateWorkerPoolRequest, this field is ignored, and instead composed from CreateWorkerPoolRequest.parent and CreateWorkerPoolRequest.worker_id. Format: `projects/{project}/locations/{location}/workerPools/{worker_id}` |
| `allowMissing` | query | boolean | no | Optional. If set to true, and if the WorkerPool does not exist, it will create a new one. The caller must have 'run.workerpools.create' permissions if this is set to true and the WorkerPool does not exist. |
| `forceNewRevision` | query | boolean | no | Optional. If set to true, a new revision will be created from the template even if the system doesn't detect any changes from the previously deployed revision. This may be useful for cases where the underlying resources need to be recreated or reinitialized. For example if the image is specified by label, but the underlying image digest has changed) or if the container performs deployment initialization work that needs to be performed again. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to be updated. |
| `validateOnly` | query | boolean | no | Optional. Indicates that the request should be validated and default values populated, without persisting the request or updating any resources. |

### `run.projects.locations.workerPools.revisions.delete`

- Versions: v2
- `DELETE https://run.googleapis.com/v2/{+name}`
- Deletes a Revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Revision to delete. Format: projects/{project}/locations/{location}/services/{service}/revisions/{revision} |
| `etag` | query | string | no | A system-generated fingerprint for this version of the resource. This may be used to detect modification conflict during updates. |
| `validateOnly` | query | boolean | no | Indicates that the request should be validated without actually deleting any resources. |

### `run.projects.locations.workerPools.revisions.get`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+name}`
- Gets information about a Revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2Revision`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the Revision. Format: projects/{project}/locations/{location}/services/{service}/revisions/{revision} |

### `run.projects.locations.workerPools.revisions.list`

- Versions: v2
- `GET https://run.googleapis.com/v2/{+parent}/revisions`
- Lists Revisions from a given Service, or from a given location. Results are sorted by creation time, descending.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `GoogleCloudRunV2ListRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Service from which the Revisions should be listed. To list all Revisions across Services, use "-" instead of Service name. Format: projects/{project}/locations/{location}/services/{service} |
| `pageSize` | query | integer (int32) | no | Maximum number of revisions to return in this call. |
| `pageToken` | query | string | no | A page token received from a previous call to ListRevisions. All other parameters must match. |
| `showDeleted` | query | boolean | no | If true, returns deleted (but unexpired) resources along with active ones. |

### `run.projects.locations.workerPools.setIamPolicy`

- Versions: v2
- `POST https://run.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the IAM Access control policy for the specified WorkerPool. Overwrites any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `run.projects.locations.workerPools.testIamPermissions`

- Versions: v2
- `POST https://run.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified Project. There are no permissions required for making this API call.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `run.projects.locations.workerpools.getIamPolicy`

- Versions: v1
- `GET https://run.googleapis.com/v1/{+resource}:getIamPolicy`
- Get the IAM Access Control policy currently in effect for the given worker pool. This result does not include any inherited policies.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### Example request skeleton

Generated from the Discovery entry of `run.namespaces.authorizeddomains.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://run.googleapis.com/apis/domains.cloudrun.com/v1/{+parent}/authorizeddomains"
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `run` (retrieved 2026-11-14). Resources on this page: namespaces, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when a path variable is described as optional (the method then also accepts the URL without that segment, as its description says).
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/run/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://run.googleapis.com/$discovery/rest?version=v2, https://run.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
