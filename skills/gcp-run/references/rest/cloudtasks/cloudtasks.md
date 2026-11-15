---
source: https://cloudtasks.googleapis.com/$discovery/rest?version=v2
---

# Cloud Tasks API REST API (cloudtasks)

## Signature / Usage

Base URL: `https://cloudtasks.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `cloudtasks.api.queue.update`

- Versions: v2beta2
- `POST https://cloudtasks.googleapis.com/api/queue/update`
- Update queue list by uploading a queue.yaml file. The queue.yaml file is supplied in the request body as a YAML encoded string. This method was added to support gcloud clients versions before 322.0.0. New clients should use CreateQueue instead of this method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `HttpBody`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `appId` | query | string | yes | Required. The App ID is supplied as an HTTP parameter. Unlike internal usage of App ID, it does not include a region prefix. Rather, the App ID represents the Project ID against which to make the request. |

### `cloudtasks.projects.locations.get`

- Versions: v2, v2beta3, v2beta2
- `GET https://cloudtasks.googleapis.com/v2/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `cloudtasks.projects.locations.getCmekConfig`

- Versions: v2, v2beta3, v2beta2
- `GET https://cloudtasks.googleapis.com/v2/{+name}`
- Gets the CMEK config. Gets the Customer Managed Encryption Key configured with the Cloud Tasks location. By default there is no `kms_key` configured.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CmekConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The config. For example: `projects/PROJECT_ID/locations/LOCATION_ID/cmekConfig` |

### `cloudtasks.projects.locations.list`

- Versions: v2, v2beta3, v2beta2
- `GET https://cloudtasks.googleapis.com/v2/{+name}/locations`
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

### `cloudtasks.projects.locations.operations.get`

- Versions: v2, v2beta3, v2beta2
- `GET https://cloudtasks.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudtasks.projects.locations.queues.create`

- Versions: v2, v2beta3, v2beta2
- `POST https://cloudtasks.googleapis.com/v2/{+parent}/queues`
- Creates a queue. Queues created with this method allow tasks to live for a maximum of 31 days. After a task is 31 days old, the task will be deleted regardless of whether it was dispatched or not. WARNING: Using this method may have unintended side effects if you are using an App Engine `queue.yaml` or `queue.xml` file to manage your queues. Read Overview of Queue Management and queue.yaml (https://cloud.google.com/tasks/docs/queue-yaml) before using this method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Queue`; Response: `Queue`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location name in which the queue will be created. For example: `projects/PROJECT_ID/locations/LOCATION_ID` The list of allowed locations can be obtained by calling Cloud Tasks' implementation of ListLocations. |

### `cloudtasks.projects.locations.queues.delete`

- Versions: v2, v2beta3, v2beta2
- `DELETE https://cloudtasks.googleapis.com/v2/{+name}`
- Deletes a queue. This command will delete the queue even if it has tasks in it. Note: If you delete a queue, you may be prevented from creating a new queue with the same name as the deleted queue for a tombstone window of up to 3 days. During this window, the CreateQueue operation may appear to recreate the queue, but this can be misleading. If you attempt to create a queue with the same name as one that is in the tombstone window, run GetQueue to confirm that the queue creation was successful. If GetQueue returns 200 response code, your queue was successfully created with the name of the previously deleted queue. Otherwise, your queue did not successfully recreate. WARNING: Using this method may have unintended side effects if you are using an App Engine `queue.yaml` or `queue.xml` file to manage your queues. Read Overview of Queue Management and queue.yaml (https://cloud.google.com/tasks/docs/queue-yaml) before using this method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` |

### `cloudtasks.projects.locations.queues.get`

- Versions: v2, v2beta3, v2beta2
- `GET https://cloudtasks.googleapis.com/v2/{+name}`
- Gets a queue.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Queue`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the queue. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` |

### `cloudtasks.projects.locations.queues.getIamPolicy`

- Versions: v2, v2beta3, v2beta2
- `POST https://cloudtasks.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the access control policy for a Queue. Returns an empty policy if the resource exists and does not have a policy set. Authorization requires the following Google IAM (https://cloud.google.com/iam) permission on the specified resource parent: \* `cloudtasks.queues.getIamPolicy`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudtasks.projects.locations.queues.list`

- Versions: v2, v2beta3, v2beta2
- `GET https://cloudtasks.googleapis.com/v2/{+parent}/queues`
- Lists queues. Queues are returned in lexicographical order.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListQueuesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID` |
| `filter` | query | string | no | `filter` can be used to specify a subset of queues. Any Queue field can be used as a filter and several operators as supported. For example: `<=, <, >=, >, !=, =, :`. The filter syntax is the same as described in Stackdriver's Advanced Logs Filters (https://cloud.google.com/logging/docs/view/advanced_filters). Sample filter "state: PAUSED". Note that using filters might cause fewer queues than the requested page_size to be returned. |
| `pageSize` | query | integer (int32) | no | Requested page size. The maximum page size is 9800. If unspecified, the page size will be the maximum. Fewer queues than requested might be returned, even if more queues exist; use the next_page_token in the response to determine if more queues exist. |
| `pageToken` | query | string | no | A token identifying the page of results to return. To request the first page results, page_token must be empty. To request the next page of results, page_token must be the value of next_page_token returned from the previous call to ListQueues method. It is an error to switch the value of the filter while iterating through pages. |

### `cloudtasks.projects.locations.queues.patch`

- Versions: v2, v2beta3, v2beta2
- `PATCH https://cloudtasks.googleapis.com/v2/{+name}`
- Updates a queue. This method creates the queue if it does not exist and updates the queue if it does exist. Queues created with this method allow tasks to live for a maximum of 31 days. After a task is 31 days old, the task will be deleted regardless of whether it was dispatched or not. WARNING: Using this method may have unintended side effects if you are using an App Engine `queue.yaml` or `queue.xml` file to manage your queues. Read Overview of Queue Management and queue.yaml (https://cloud.google.com/tasks/docs/queue-yaml) before using this method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Queue`; Response: `Queue`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Caller-specified and required in CreateQueue, after which it becomes output only. The queue name. The queue name must have the following format: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` \* `PROJECT_ID` can contain letters (\[A-Za-z\]), numbers (\[0-9\]), hyphens (-), colons (:), or periods (.). For more information, see Identifying projects (https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) \* `LOCATION_ID` is the canonical ID for the queue's location. The list of available locations can be obtained by calling ListLocations. For more information, see https://cloud.google.com/about/locations/. \* `QUEUE_ID` can contain letters (\[A-Za-z\]), numbers (\[0-9\]), or hyphens (-). The maximum length is 100 characters. |
| `updateMask` | query | string (google-fieldmask) | no | A mask used to specify which fields of the queue are being updated. If empty, then all fields will be updated. |

### `cloudtasks.projects.locations.queues.pause`

- Versions: v2, v2beta3, v2beta2
- `POST https://cloudtasks.googleapis.com/v2/{+name}:pause`
- Pauses the queue. If a queue is paused then the system will stop dispatching tasks until the queue is resumed via ResumeQueue. Tasks can still be added when the queue is paused. A queue is paused if its state is PAUSED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PauseQueueRequest`; Response: `Queue`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The queue name. For example: `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID` |

### `cloudtasks.projects.locations.queues.purge`

- Versions: v2, v2beta3, v2beta2
- `POST https://cloudtasks.googleapis.com/v2/{+name}:purge`
- Purges a queue by deleting all of its tasks. All tasks created before this method is called are permanently deleted. Purge operations can take up to one minute to take effect. Tasks might be dispatched before the purge takes effect. A purge is irreversible.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PurgeQueueRequest`; Response: `Queue`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The queue name. For example: `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID` |

### `cloudtasks.projects.locations.queues.resume`

- Versions: v2, v2beta3, v2beta2
- `POST https://cloudtasks.googleapis.com/v2/{+name}:resume`
- Resume a queue. This method resumes a queue after it has been PAUSED or DISABLED. The state of a queue is stored in the queue's state; after calling this method it will be set to RUNNING. WARNING: Resuming many high-QPS queues at the same time can lead to target overloading. If you are resuming high-QPS queues, follow the 500/50/5 pattern described in Managing Cloud Tasks Scaling Risks (https://cloud.google.com/tasks/docs/manage-cloud-task-scaling).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResumeQueueRequest`; Response: `Queue`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The queue name. For example: `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID` |

### `cloudtasks.projects.locations.queues.setIamPolicy`

- Versions: v2, v2beta3, v2beta2
- `POST https://cloudtasks.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the access control policy for a Queue. Replaces any existing policy. Note: The Cloud Console does not check queue-level IAM permissions yet. Project-level permissions are required to use the Cloud Console. Authorization requires the following Google IAM (https://cloud.google.com/iam) permission on the specified resource parent: \* `cloudtasks.queues.setIamPolicy`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudtasks.projects.locations.queues.tasks.acknowledge`

- Versions: v2beta2
- `POST https://cloudtasks.googleapis.com/v2beta2/{+name}:acknowledge`
- Acknowledges a pull task. The worker, that is, the entity that leased this task must call this method to indicate that the work associated with the task has finished. The worker must acknowledge a task within the lease_duration or the lease will expire and the task will become available to be leased again. After the task is acknowledged, it will not be returned by a later LeaseTasks, GetTask, or ListTasks.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AcknowledgeTaskRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID` |

### `cloudtasks.projects.locations.queues.tasks.batchCreate`

- Versions: v2, v2beta3, v2beta2
- `POST https://cloudtasks.googleapis.com/v2/{+parent}/tasks:batchCreate`
- Creates a batch of tasks and adds them to a queue. All tasks must be for the same queue. A maximum of 100 tasks can be created in a single batch.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchCreateTasksRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` The queue must already exist. |

### `cloudtasks.projects.locations.queues.tasks.batchDelete`

- Versions: v2, v2beta3, v2beta2
- `POST https://cloudtasks.googleapis.com/v2/{+parent}/tasks:batchDelete`
- Deletes a batch of tasks. This is a non-atomic operation: if deletion fails for some tasks, it can still succeed for others. The metadata field of google.longrunning.Operation contains details of failed deletions. A maximum of 1000 tasks can be deleted in a batch.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchDeleteTasksRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The queue name. For example: Format: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` |

### `cloudtasks.projects.locations.queues.tasks.buffer`

- Versions: v2, v2beta3, v2beta2
- `POST https://cloudtasks.googleapis.com/v2/{+queue}/tasks/{taskId}:buffer`
- Creates and buffers a new task without the need to explicitly define a Task message. The queue must have HTTP target. To create the task with a custom ID, use the following format and set TASK_ID to your desired ID: projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID:buffer To create the task with an automatically generated ID, use the following format: projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks:buffer.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BufferTaskRequest`; Response: `BufferTaskResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `queue` | path | string | yes | Required. The parent queue name. For example: projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID\` The queue must already exist. |
| `taskId` | path | string | conditional | Optional. Task ID for the task being created. If not provided, Cloud Tasks generates an ID for the task. |

### `cloudtasks.projects.locations.queues.tasks.cancelLease`

- Versions: v2beta2
- `POST https://cloudtasks.googleapis.com/v2beta2/{+name}:cancelLease`
- Cancel a pull task's lease. The worker can use this method to cancel a task's lease by setting its schedule_time to now. This will make the task available to be leased to the next caller of LeaseTasks.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelLeaseRequest`; Response: `Task`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID` |

### `cloudtasks.projects.locations.queues.tasks.create`

- Versions: v2, v2beta3, v2beta2
- `POST https://cloudtasks.googleapis.com/v2/{+parent}/tasks`
- Creates a task and adds it to a queue. Tasks cannot be updated after creation; there is no UpdateTask command. \* The maximum task size is 100KB.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateTaskRequest`; Response: `Task`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` The queue must already exist. |

### `cloudtasks.projects.locations.queues.tasks.delete`

- Versions: v2, v2beta3, v2beta2
- `DELETE https://cloudtasks.googleapis.com/v2/{+name}`
- Deletes a task. A task can be deleted if it is scheduled or dispatched. A task cannot be deleted if it has executed successfully or permanently failed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID` |

### `cloudtasks.projects.locations.queues.tasks.get`

- Versions: v2, v2beta3, v2beta2
- `GET https://cloudtasks.googleapis.com/v2/{+name}`
- Gets a task. After a task is successfully executed or has exhausted its retry attempts, the task is deleted. A `GetTask` request for a deleted task returns a `NOT_FOUND` error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Task`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID` |
| `responseView` | query | string enum | no | The response_view specifies which subset of the Task will be returned. By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains. Authorization for FULL requires `cloudtasks.tasks.fullView` Google IAM (https://cloud.google.com/iam/) permission on the Task resource. Values: `VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `cloudtasks.projects.locations.queues.tasks.lease`

- Versions: v2beta2
- `POST https://cloudtasks.googleapis.com/v2beta2/{+parent}/tasks:lease`
- Leases tasks from a pull queue for lease_duration. This method is invoked by the worker to obtain a lease. The worker must acknowledge the task via AcknowledgeTask after they have performed the work associated with the task. The payload is intended to store data that the worker needs to perform the work associated with the task. To return the payloads in the response, set response_view to FULL. A maximum of 10 qps of LeaseTasks requests are allowed per queue. RESOURCE_EXHAUSTED is returned when this limit is exceeded. RESOURCE_EXHAUSTED is also returned when max_tasks_dispatched_per_second is exceeded.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LeaseTasksRequest`; Response: `LeaseTasksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` |

### `cloudtasks.projects.locations.queues.tasks.list`

- Versions: v2, v2beta3, v2beta2
- `GET https://cloudtasks.googleapis.com/v2/{+parent}/tasks`
- Lists the tasks in a queue. By default, only the BASIC view is retrieved due to performance considerations; response_view controls the subset of information which is returned. The tasks may be returned in any order. The ordering may change at any time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTasksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` |
| `pageSize` | query | integer (int32) | no | Maximum page size. Fewer tasks than requested might be returned, even if more tasks exist; use next_page_token in the response to determine if more tasks exist. The maximum page size is 1000. If unspecified, the page size will be the maximum. |
| `pageToken` | query | string | no | A token identifying the page of results to return. To request the first page results, page_token must be empty. To request the next page of results, page_token must be the value of next_page_token returned from the previous call to ListTasks method. The page token is valid for only 2 hours. |
| `responseView` | query | string enum | no | The response_view specifies which subset of the Task will be returned. By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains. Authorization for FULL requires `cloudtasks.tasks.fullView` Google IAM (https://cloud.google.com/iam/) permission on the Task resource. Values: `VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `cloudtasks.projects.locations.queues.tasks.renewLease`

- Versions: v2beta2
- `POST https://cloudtasks.googleapis.com/v2beta2/{+name}:renewLease`
- Renew the current lease of a pull task. The worker can use this method to extend the lease by a new duration, starting from now. The new task lease will be returned in the task's schedule_time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RenewLeaseRequest`; Response: `Task`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID` |

### `cloudtasks.projects.locations.queues.tasks.run`

- Versions: v2, v2beta3, v2beta2
- `POST https://cloudtasks.googleapis.com/v2/{+name}:run`
- Forces a task to run now. When this method is called, Cloud Tasks will dispatch the task, even if the task is already running, the queue has reached its RateLimits or is PAUSED. This command is meant to be used for manual debugging. For example, RunTask can be used to retry a failed task after a fix has been made or to manually force a task to be dispatched now. If Cloud Tasks receives a successful response from the task's target, then the task will be deleted; otherwise the task's schedule_time will be reset to the time that RunTask was called plus the retry delay specified in the queue's RetryConfig. RunTask returns NOT_FOUND when it is called on a task that has already succeeded or permanently failed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RunTaskRequest`; Response: `Task`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID` |

### `cloudtasks.projects.locations.queues.testIamPermissions`

- Versions: v2, v2beta3, v2beta2
- `POST https://cloudtasks.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that a caller has on a Queue. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudtasks.projects.locations.updateCmekConfig`

- Versions: v2, v2beta3, v2beta2
- `PATCH https://cloudtasks.googleapis.com/v2/{+name}`
- Creates or Updates a CMEK config. Updates the Customer Managed Encryption Key associated with the Cloud Tasks location (Creates if the key does not already exist). All new tasks created in the location will be encrypted at-rest with the KMS-key provided in the config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CmekConfig`; Response: `CmekConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The config resource name which includes the project and location and must end in 'cmekConfig', in the format `projects/PROJECT_ID/locations/LOCATION_ID/cmekConfig` |
| `updateMask` | query | string (google-fieldmask) | no | List of fields to be updated in this request. |

### Example request skeleton

Generated from the Discovery entry of `cloudtasks.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudtasks.googleapis.com/v2/{+name}"
```

## Notes

- Generated from the Discovery document(s) v2, v2beta3, v2beta2 of `cloudtasks` (retrieved 2026-11-14). Resources on this page: api, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives) or when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof.
- Message schemas are listed under `references/rest-schemas/cloudtasks/`.
- Source: https://cloudtasks.googleapis.com/$discovery/rest?version=v2, https://cloudtasks.googleapis.com/$discovery/rest?version=v2beta3, https://cloudtasks.googleapis.com/$discovery/rest?version=v2beta2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
