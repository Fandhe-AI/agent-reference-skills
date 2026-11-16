---
source: https://bigtableadmin.googleapis.com/$discovery/rest?version=v2
---

# Cloud Bigtable Admin API REST API (bigtableadmin)

## Signature / Usage

Base URL: `https://bigtableadmin.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `bigtableadmin.operations.get`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `bigtableadmin.operations.projects.operations.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `bigtableadmin.projects.instances.appProfiles.create`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+parent}/appProfiles`
- Creates an app profile within an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AppProfile`; Response: `AppProfile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique name of the instance in which to create the new app profile. Values are of the form `projects/{project}/instances/{instance}`. |
| `appProfileId` | query | string | yes | Required. The ID to be used when referring to the new app profile within its instance, e.g., just `myprofile` rather than `projects/myproject/instances/myinstance/appProfiles/myprofile`. |
| `ignoreWarnings` | query | boolean | no | If true, ignore safety checks when creating the app profile. |

### `bigtableadmin.projects.instances.appProfiles.delete`

- Versions: v2
- `DELETE https://bigtableadmin.googleapis.com/v2/{+name}`
- Deletes an app profile from an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the app profile to be deleted. Values are of the form `projects/{project}/instances/{instance}/appProfiles/{app_profile}`. |
| `ignoreWarnings` | query | boolean | yes | Required. If true, ignore safety checks when deleting the app profile. |

### `bigtableadmin.projects.instances.appProfiles.get`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}`
- Gets information about an app profile.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `AppProfile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the requested app profile. Values are of the form `projects/{project}/instances/{instance}/appProfiles/{app_profile}`. |

### `bigtableadmin.projects.instances.appProfiles.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+parent}/appProfiles`
- Lists information about app profiles in an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAppProfilesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique name of the instance for which a list of app profiles is requested. Values are of the form `projects/{project}/instances/{instance}`. Use `{instance} = '-'` to list AppProfiles for all Instances in a project, e.g., `projects/myproject/instances/-`. |
| `pageSize` | query | integer (int32) | no | Maximum number of results per page. A page_size of zero lets the server choose the number of items to return. A page_size which is strictly positive will return at most that many items. A negative page_size will cause an error. Following the first request, subsequent paginated calls are not required to pass a page_size. If a page_size is set in subsequent calls, it must match the page_size given in the first request. |
| `pageToken` | query | string | no | The value of `next_page_token` returned by a previous call. |

### `bigtableadmin.projects.instances.appProfiles.patch`

- Versions: v2
- `PATCH https://bigtableadmin.googleapis.com/v2/{+name}`
- Updates an app profile within an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AppProfile`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The unique name of the app profile, up to 50 characters long. Values are of the form `projects/{project}/instances/{instance}/appProfiles/_a-zA-Z0-9*`. |
| `ignoreWarnings` | query | boolean | no | If true, ignore safety checks when updating the app profile. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The subset of app profile fields which should be replaced. If unset, all fields will be replaced. |

### `bigtableadmin.projects.instances.clusters.backups.copy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+parent}/backups:copy`
- Copy a Cloud Bigtable backup to a new backup in the destination cluster located in the destination instance and project.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CopyBackupRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the destination cluster that will contain the backup copy. The cluster must already exist. Values are of the form: `projects/{project}/instances/{instance}/clusters/{cluster}`. |

### `bigtableadmin.projects.instances.clusters.backups.create`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+parent}/backups`
- Starts creating a new Cloud Bigtable Backup. The returned backup long-running operation can be used to track creation of the backup. The metadata field type is CreateBackupMetadata. The response field type is Backup, if successful. Cancelling the returned operation will stop the creation and delete the backup.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. This must be one of the clusters in the instance in which this table is located. The backup will be stored in this cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. |
| `backupId` | query | string | yes | Required. The id of the backup to be created. The `backup_id` along with the parent `parent` are combined as {parent}/backups/{backup_id} to create the full backup name, of the form: `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup_id}`. This string must be between 1 and 50 characters in length and match the regex \_a-zA-Z0-9\*. |

### `bigtableadmin.projects.instances.clusters.backups.delete`

- Versions: v2
- `DELETE https://bigtableadmin.googleapis.com/v2/{+name}`
- Deletes a pending or completed Cloud Bigtable backup.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the backup to delete. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup}`. |

### `bigtableadmin.projects.instances.clusters.backups.get`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}`
- Gets metadata on a pending or completed Cloud Bigtable Backup.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Backup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the backup. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup}`. |

### `bigtableadmin.projects.instances.clusters.backups.getIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the access control policy for a Bigtable resource. Returns an empty policy if the resource exists but does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.clusters.backups.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+parent}/backups`
- Lists Cloud Bigtable backups. Returns both completed and pending backups.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The cluster to list backups from. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. Use `{cluster} = '-'` to list backups for all clusters in an instance, e.g., `projects/{project}/instances/{instance}/clusters/-`. |
| `filter` | query | string | no | A filter expression that filters backups listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be <, >, <=, >=, !=, =, or :. Colon ':' represents a HAS operator which is roughly synonymous with equality. Filter rules are case insensitive. The fields eligible for filtering are: \* `name` \* `source_table` \* `state` \* `start_time` (and values are of the format YYYY-MM-DDTHH:MM:SSZ) \* `end_time` (and values are of the format YYYY-MM-DDTHH:MM:SSZ) \* `expire_time` (and values are of the format YYYY-MM-DDTHH:MM:SSZ) \* `size_bytes` To filter on multiple expressions, provide each separate expression within parentheses. By default, each expression is an AND expression. However, you can include AND, OR, and NOT expressions explicitly. Some examples of using filters are: \* `name:"exact"` --> The backup's name is the string "exact". \* `name:howl` --> The backup's name contains the string "howl". \* `source_table:prod` --> The source_table's name contains the string "prod". \* `state:CREATING` --> The backup is pending creation. \* `state:READY` --> The backup is fully created and ready for use. \* `(name:howl) AND (start_time < \"2018-03-28T14:50:00Z\")` --> The backup name contains the string "howl" and start_time of the backup is before 2018-03-28T14:50:00Z. \* `size_bytes > 10000000000` --> The backup's size is greater than 10GB |
| `orderBy` | query | string | no | An expression for specifying the sort order of the results of the request. The string value should specify one or more fields in Backup. The full syntax is described at https://aip.dev/132#ordering. Fields supported are: \* name \* source_table \* expire_time \* start_time \* end_time \* size_bytes \* state For example, "start_time". The default sorting order is ascending. To specify descending order for the field, a suffix " desc" should be appended to the field name. For example, "start_time desc". Redundant space characters in the syntax are insigificant. If order_by is empty, results will be sorted by `start_time` in descending order starting from the most recently created backup. |
| `pageSize` | query | integer (int32) | no | Number of backups to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. |
| `pageToken` | query | string | no | If non-empty, `page_token` should contain a next_page_token from a previous ListBackupsResponse to the same `parent` and with the same `filter`. |

### `bigtableadmin.projects.instances.clusters.backups.patch`

- Versions: v2
- `PATCH https://bigtableadmin.googleapis.com/v2/{+name}`
- Updates a pending or completed Cloud Bigtable Backup.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `Backup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | A globally unique identifier for the backup which cannot be changed. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/ backups/_a-zA-Z0-9*` The final segment of the name must be between 1 and 50 characters in length. The backup is stored in the cluster identified by the prefix of the backup name of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A mask specifying which fields (e.g. `expire_time`) in the Backup resource should be updated. This mask is relative to the Backup resource, not to the request message. The field mask must always be specified; this prevents any future fields from being erased accidentally by clients that do not know about them. |

### `bigtableadmin.projects.instances.clusters.backups.setIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the access control policy on a Bigtable resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.clusters.backups.testIamPermissions`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that the caller has on the specified Bigtable resource.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.clusters.create`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+parent}/clusters`
- Creates a cluster within an instance. Note that exactly one of Cluster.serve_nodes and Cluster.cluster_config.cluster_autoscaling_config can be set. If serve_nodes is set to non-zero, then the cluster is manually scaled. If cluster_config.cluster_autoscaling_config is non-empty, then autoscaling is enabled.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Cluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique name of the instance in which to create the new cluster. Values are of the form `projects/{project}/instances/{instance}`. |
| `clusterId` | query | string | yes | Required. The ID to be used when referring to the new cluster within its instance, e.g., just `mycluster` rather than `projects/myproject/instances/myinstance/clusters/mycluster`. |

### `bigtableadmin.projects.instances.clusters.delete`

- Versions: v2
- `DELETE https://bigtableadmin.googleapis.com/v2/{+name}`
- Deletes a cluster from an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the cluster to be deleted. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. |

### `bigtableadmin.projects.instances.clusters.get`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}`
- Gets information about a cluster.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Cluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the requested cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. |

### `bigtableadmin.projects.instances.clusters.getMemoryLayer`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}`
- Gets information about the memory layer of a cluster.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `MemoryLayer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the requested cluster's memory layer. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/memoryLayer`. |

### `bigtableadmin.projects.instances.clusters.hotTablets.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+parent}/hotTablets`
- Lists hot tablets in a cluster, within the time range provided. Hot tablets are ordered based on CPU usage.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListHotTabletsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The cluster name to list hot tablets. Value is in the following form: `projects/{project}/instances/{instance}/clusters/{cluster}`. |
| `endTime` | query | string (google-datetime) | no | The end time to list hot tablets. |
| `pageSize` | query | integer (int32) | no | Maximum number of results per page. A page_size that is empty or zero lets the server choose the number of items to return. A page_size which is strictly positive will return at most that many items. A negative page_size will cause an error. Following the first request, subsequent paginated calls do not need a page_size field. If a page_size is set in subsequent calls, it must match the page_size given in the first request. |
| `pageToken` | query | string | no | The value of `next_page_token` returned by a previous call. |
| `startTime` | query | string (google-datetime) | no | The start time to list hot tablets. The hot tablets in the response will have start times between the requested start time and end time. Start time defaults to Now if it is unset, and end time defaults to Now - 24 hours if it is unset. The start time should be less than the end time, and the maximum allowed time range between start time and end time is 48 hours. Start time and end time should have values between Now and Now - 14 days. |

### `bigtableadmin.projects.instances.clusters.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+parent}/clusters`
- Lists information about clusters in an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique name of the instance for which a list of clusters is requested. Values are of the form `projects/{project}/instances/{instance}`. Use `{instance} = '-'` to list Clusters for all Instances in a project, e.g., `projects/myproject/instances/-`. |
| `pageToken` | query | string | no | DEPRECATED: This field is unused and ignored. |

### `bigtableadmin.projects.instances.clusters.memoryLayers.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+parent}/memoryLayers`
- Lists information about memory layers.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMemoryLayersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique name of the cluster for which a list of memory layers is requested. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. Use `{cluster} = '-'` to list MemoryLayers for all Clusters in an instance, e.g., `projects/myproject/instances/myinstance/clusters/-`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of memory layers to return. The service may return fewer than this value. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListMemoryLayers` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMemoryLayers` must match the call that provided the page token. |

### `bigtableadmin.projects.instances.clusters.partialUpdateCluster`

- Versions: v2
- `PATCH https://bigtableadmin.googleapis.com/v2/{+name}`
- Partially updates a cluster within a project. This method is the preferred way to update a Cluster. To enable and update autoscaling, set cluster_config.cluster_autoscaling_config. When autoscaling is enabled, serve_nodes is treated as an OUTPUT_ONLY field, meaning that updates to it are ignored. Note that an update cannot simultaneously set serve_nodes to non-zero and cluster_config.cluster_autoscaling_config to non-empty, and also specify both in the update_mask. To disable autoscaling, clear cluster_config.cluster_autoscaling_config, and explicitly set a serve_node count via the update_mask.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Cluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The unique name of the cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/a-z*`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The subset of Cluster fields which should be replaced. |

### `bigtableadmin.projects.instances.clusters.update`

- Versions: v2
- `PUT https://bigtableadmin.googleapis.com/v2/{+name}`
- Updates a cluster within an instance. Note that UpdateCluster does not support updating cluster_config.cluster_autoscaling_config. In order to update it, you must use PartialUpdateCluster.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Cluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The unique name of the cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/a-z*`. |

### `bigtableadmin.projects.instances.clusters.updateMemoryLayer`

- Versions: v2
- `PATCH https://bigtableadmin.googleapis.com/v2/{+name}`
- Updates the memory layer of a cluster. To enable the memory layer, set the memory_config. To disable the memory layer, unset the memory_config.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `MemoryLayer`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the memory layer. This is always: "projects/{project}/instances/{instance}/clusters/{cluster}/memoryLayer". |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `bigtableadmin.projects.instances.create`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+parent}/instances`
- Create an instance within a project. Note that exactly one of Cluster.serve_nodes and Cluster.cluster_config.cluster_autoscaling_config can be set. If serve_nodes is set to non-zero, then the cluster is manually scaled. If cluster_config.cluster_autoscaling_config is non-empty, then autoscaling is enabled.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique name of the project in which to create the new instance. Values are of the form `projects/{project}`. |

### `bigtableadmin.projects.instances.delete`

- Versions: v2
- `DELETE https://bigtableadmin.googleapis.com/v2/{+name}`
- Delete an instance from a project.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the instance to be deleted. Values are of the form `projects/{project}/instances/{instance}`. |

### `bigtableadmin.projects.instances.get`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}`
- Gets information about an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the requested instance. Values are of the form `projects/{project}/instances/{instance}`. |

### `bigtableadmin.projects.instances.getIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the access control policy for an instance resource. Returns an empty policy if an instance exists but does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+parent}/instances`
- Lists information about instances in a project.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique name of the project for which a list of instances is requested. Values are of the form `projects/{project}`. |
| `pageToken` | query | string | no | DEPRECATED: This field is unused and ignored. |

### `bigtableadmin.projects.instances.logicalViews.create`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+parent}/logicalViews`
- Creates a logical view within an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `LogicalView`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent instance where this logical view will be created. Format: `projects/{project}/instances/{instance}`. |
| `logicalViewId` | query | string | yes | Required. The ID to use for the logical view, which will become the final component of the logical view's resource name. |

### `bigtableadmin.projects.instances.logicalViews.delete`

- Versions: v2
- `DELETE https://bigtableadmin.googleapis.com/v2/{+name}`
- Deletes a logical view from an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the logical view to be deleted. Format: `projects/{project}/instances/{instance}/logicalViews/{logical_view}`. |
| `etag` | query | string | no | Optional. The current etag of the logical view. If an etag is provided and does not match the current etag of the logical view, deletion will be blocked and an ABORTED error will be returned. |

### `bigtableadmin.projects.instances.logicalViews.get`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}`
- Gets information about a logical view.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LogicalView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the requested logical view. Values are of the form `projects/{project}/instances/{instance}/logicalViews/{logical_view}`. |

### `bigtableadmin.projects.instances.logicalViews.getIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the access control policy for an instance resource. Returns an empty policy if an instance exists but does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.logicalViews.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+parent}/logicalViews`
- Lists information about logical views in an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLogicalViewsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique name of the instance for which the list of logical views is requested. Values are of the form `projects/{project}/instances/{instance}`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of logical views to return. The service may return fewer than this value |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListLogicalViews` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListLogicalViews` must match the call that provided the page token. |

### `bigtableadmin.projects.instances.logicalViews.patch`

- Versions: v2
- `PATCH https://bigtableadmin.googleapis.com/v2/{+name}`
- Updates a logical view within an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `LogicalView`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The unique name of the logical view. Format: `projects/{project}/instances/{instance}/logicalViews/{logical_view}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `bigtableadmin.projects.instances.logicalViews.setIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the access control policy on an instance resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.logicalViews.testIamPermissions`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that the caller has on the specified instance resource.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.materializedViews.create`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+parent}/materializedViews`
- Creates a materialized view within an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `MaterializedView`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent instance where this materialized view will be created. Format: `projects/{project}/instances/{instance}`. |
| `ignoreWarnings` | query | boolean | no | Optional. If true, ignore optional safety checks when creating the materialized view. |
| `materializedViewId` | query | string | yes | Required. The ID to use for the materialized view, which will become the final component of the materialized view's resource name. |

### `bigtableadmin.projects.instances.materializedViews.delete`

- Versions: v2
- `DELETE https://bigtableadmin.googleapis.com/v2/{+name}`
- Deletes a materialized view from an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the materialized view to be deleted. Format: `projects/{project}/instances/{instance}/materializedViews/{materialized_view}`. |
| `etag` | query | string | no | Optional. The current etag of the materialized view. If an etag is provided and does not match the current etag of the materialized view, deletion will be blocked and an ABORTED error will be returned. |

### `bigtableadmin.projects.instances.materializedViews.get`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}`
- Gets information about a materialized view.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MaterializedView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the requested materialized view. Values are of the form `projects/{project}/instances/{instance}/materializedViews/{materialized_view}`. |
| `view` | query | string enum | no | Optional. Describes which of the materialized view's fields should be populated in the response. Defaults to SCHEMA_VIEW. Values: `VIEW_UNSPECIFIED`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `FULL`. |

### `bigtableadmin.projects.instances.materializedViews.getIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the access control policy for an instance resource. Returns an empty policy if an instance exists but does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.materializedViews.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+parent}/materializedViews`
- Lists information about materialized views in an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMaterializedViewsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique name of the instance for which the list of materialized views is requested. Values are of the form `projects/{project}/instances/{instance}`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of materialized views to return. The service may return fewer than this value |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListMaterializedViews` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMaterializedViews` must match the call that provided the page token. |
| `view` | query | string enum | no | Optional. Describes which of the materialized view's fields should be populated in the response. For now, only the default value SCHEMA_VIEW is supported. Values: `VIEW_UNSPECIFIED`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `FULL`. |

### `bigtableadmin.projects.instances.materializedViews.patch`

- Versions: v2
- `PATCH https://bigtableadmin.googleapis.com/v2/{+name}`
- Updates a materialized view within an instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `MaterializedView`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The unique name of the materialized view. Format: `projects/{project}/instances/{instance}/materializedViews/{materialized_view}` Views: `SCHEMA_VIEW`, `REPLICATION_VIEW`, `FULL`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `bigtableadmin.projects.instances.materializedViews.setIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the access control policy on an instance resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.materializedViews.testIamPermissions`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that the caller has on the specified instance resource.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.partialUpdateInstance`

- Versions: v2
- `PATCH https://bigtableadmin.googleapis.com/v2/{+name}`
- Partially updates an instance within a project. This method can modify all fields of an Instance and is the preferred way to update an Instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Instance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The subset of Instance fields which should be replaced. Must be explicitly set. |

### `bigtableadmin.projects.instances.setIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the access control policy on an instance resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.tables.authorizedViews.create`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+parent}/authorizedViews`
- Creates a new AuthorizedView in a table.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthorizedView`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. This is the name of the table the AuthorizedView belongs to. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. |
| `authorizedViewId` | query | string | yes | Required. The id of the AuthorizedView to create. This AuthorizedView must not already exist. The `authorized_view_id` appended to `parent` forms the full AuthorizedView name of the form `projects/{project}/instances/{instance}/tables/{table}/authorizedView/{authorized_view}`. |

### `bigtableadmin.projects.instances.tables.authorizedViews.delete`

- Versions: v2
- `DELETE https://bigtableadmin.googleapis.com/v2/{+name}`
- Permanently deletes a specified AuthorizedView.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the AuthorizedView to be deleted. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/authorizedViews/{authorized_view}`. |
| `etag` | query | string | no | Optional. The current etag of the AuthorizedView. If an etag is provided and does not match the current etag of the AuthorizedView, deletion will be blocked and an ABORTED error will be returned. |

### `bigtableadmin.projects.instances.tables.authorizedViews.get`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}`
- Gets information from a specified AuthorizedView.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuthorizedView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the requested AuthorizedView. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/authorizedViews/{authorized_view}`. |
| `view` | query | string enum | no | Optional. The resource_view to be applied to the returned AuthorizedView's fields. Default to BASIC. Values: `RESPONSE_VIEW_UNSPECIFIED`, `NAME_ONLY`, `BASIC`, `FULL`. |

### `bigtableadmin.projects.instances.tables.authorizedViews.getIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the access control policy for a Bigtable resource. Returns an empty policy if the resource exists but does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.tables.authorizedViews.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+parent}/authorizedViews`
- Lists all AuthorizedViews from a specific table.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuthorizedViewsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique name of the table for which AuthorizedViews should be listed. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of results per page. A page_size of zero lets the server choose the number of items to return. A page_size which is strictly positive will return at most that many items. A negative page_size will cause an error. Following the first request, subsequent paginated calls are not required to pass a page_size. If a page_size is set in subsequent calls, it must match the page_size given in the first request. |
| `pageToken` | query | string | no | Optional. The value of `next_page_token` returned by a previous call. |
| `view` | query | string enum | no | Optional. The resource_view to be applied to the returned AuthorizedViews' fields. Default to NAME_ONLY. Values: `RESPONSE_VIEW_UNSPECIFIED`, `NAME_ONLY`, `BASIC`, `FULL`. |

### `bigtableadmin.projects.instances.tables.authorizedViews.patch`

- Versions: v2
- `PATCH https://bigtableadmin.googleapis.com/v2/{+name}`
- Updates an AuthorizedView in a table.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthorizedView`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of this AuthorizedView. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/authorizedViews/{authorized_view}` |
| `ignoreWarnings` | query | boolean | no | Optional. If true, ignore the safety checks when updating the AuthorizedView. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. A mask specifying which fields in the AuthorizedView resource should be updated. This mask is relative to the AuthorizedView resource, not to the request message. A field will be overwritten if it is in the mask. If empty, all fields set in the request will be overwritten. A special value `*` means to overwrite all fields (including fields not set in the request). |

### `bigtableadmin.projects.instances.tables.authorizedViews.setIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the access control policy on a Bigtable resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.tables.authorizedViews.testIamPermissions`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that the caller has on the specified Bigtable resource.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.tables.checkConsistency`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+name}:checkConsistency`
- Checks replication consistency based on a consistency token, that is, if replication has caught up based on the conditions specified in the token and the check request.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CheckConsistencyRequest`; Response: `CheckConsistencyResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the Table for which to check replication consistency. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. |

### `bigtableadmin.projects.instances.tables.create`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+parent}/tables`
- Creates a new table in the specified instance. The table can be created with a full set of initial column families, specified in the request.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateTableRequest`; Response: `Table`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique name of the instance in which to create the table. Values are of the form `projects/{project}/instances/{instance}`. |

### `bigtableadmin.projects.instances.tables.delete`

- Versions: v2
- `DELETE https://bigtableadmin.googleapis.com/v2/{+name}`
- Permanently deletes a specified table and all of its data.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the table to be deleted. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. |

### `bigtableadmin.projects.instances.tables.dropRowRange`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+name}:dropRowRange`
- Permanently drop/delete a row range from a specified table. The request can specify whether to delete all rows in a table, or only those that match a particular prefix. Note that row key prefixes used here are treated as service data. For more information about how service data is handled, see the Google Cloud Privacy Notice (https://cloud.google.com/terms/cloud-privacy-notice).
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `DropRowRangeRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the table on which to drop a range of rows. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. |

### `bigtableadmin.projects.instances.tables.generateConsistencyToken`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+name}:generateConsistencyToken`
- Generates a consistency token for a Table, which can be used in CheckConsistency to check whether mutations to the table that finished before this call started have been replicated. The tokens will be available for 90 days.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateConsistencyTokenRequest`; Response: `GenerateConsistencyTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the Table for which to create a consistency token. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. |

### `bigtableadmin.projects.instances.tables.get`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}`
- Gets metadata information about the specified table.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Table`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the requested table. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. |
| `view` | query | string enum | no | The view to be applied to the returned table's fields. Defaults to `SCHEMA_VIEW` if unspecified. Values: `VIEW_UNSPECIFIED`, `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `ENCRYPTION_VIEW`, `STATS_VIEW`, `FULL`. |

### `bigtableadmin.projects.instances.tables.getIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the access control policy for a Bigtable resource. Returns an empty policy if the resource exists but does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.tables.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+parent}/tables`
- Lists all tables served from a specified instance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTablesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique name of the instance for which tables should be listed. Values are of the form `projects/{project}/instances/{instance}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of results per page. A page_size of zero lets the server choose the number of items to return. A page_size which is strictly positive will return at most that many items. A negative page_size will cause an error. Following the first request, subsequent paginated calls are not required to pass a page_size. If a page_size is set in subsequent calls, it must match the page_size given in the first request. |
| `pageToken` | query | string | no | The value of `next_page_token` returned by a previous call. |
| `view` | query | string enum | no | The view to be applied to the returned tables' fields. Only NAME_ONLY view (default), REPLICATION_VIEW and ENCRYPTION_VIEW are supported. Values: `VIEW_UNSPECIFIED`, `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `ENCRYPTION_VIEW`, `STATS_VIEW`, `FULL`. |

### `bigtableadmin.projects.instances.tables.modifyColumnFamilies`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+name}:modifyColumnFamilies`
- Performs a series of column family modifications on the specified table. Either all or none of the modifications will occur before this method returns, but data requests received prior to that point may see a table where only some modifications have taken effect.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `ModifyColumnFamiliesRequest`; Response: `Table`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the table whose families should be modified. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. |

### `bigtableadmin.projects.instances.tables.patch`

- Versions: v2
- `PATCH https://bigtableadmin.googleapis.com/v2/{+name}`
- Updates a specified table.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Table`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The unique name of the table. Values are of the form `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`. Views: `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `STATS_VIEW`, `FULL` |
| `ignoreWarnings` | query | boolean | no | Optional. If true, ignore safety checks when updating the table. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. A mask specifying which fields (e.g. `change_stream_config`) in the `table` field should be updated. This mask is relative to the `table` field, not to the request message. The wildcard (\*) path is currently not supported. Currently UpdateTable is only supported for the following fields: \* `change_stream_config` \* `change_stream_config.retention_period` \* `deletion_protection` \* `automated_backup_policy` \* `automated_backup_policy.retention_period` \* `automated_backup_policy.frequency` \* `automated_backup_policy.locations` \* `row_key_schema` If `column_families` is set in `update_mask`, it will return an UNIMPLEMENTED error. |

### `bigtableadmin.projects.instances.tables.restore`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+parent}/tables:restore`
- Create a new table by restoring from a completed backup. The returned table long-running operation can be used to track the progress of the operation, and to cancel it. The metadata field type is RestoreTableMetadata. The response type is Table, if successful.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreTableRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the instance in which to create the restored table. Values are of the form `projects//instances/`. |

### `bigtableadmin.projects.instances.tables.schemaBundles.create`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+parent}/schemaBundles`
- Creates a new schema bundle in the specified table.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SchemaBundle`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this schema bundle will be created. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. |
| `schemaBundleId` | query | string | yes | Required. The unique ID to use for the schema bundle, which will become the final component of the schema bundle's resource name. |

### `bigtableadmin.projects.instances.tables.schemaBundles.delete`

- Versions: v2
- `DELETE https://bigtableadmin.googleapis.com/v2/{+name}`
- Deletes a schema bundle in the specified table.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the schema bundle to delete. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/{schema_bundle}` |
| `etag` | query | string | no | Optional. The etag of the schema bundle. If this is provided, it must match the server's etag. The server returns an ABORTED error on a mismatched etag. |

### `bigtableadmin.projects.instances.tables.schemaBundles.get`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}`
- Gets metadata information about the specified schema bundle.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SchemaBundle`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the schema bundle to retrieve. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/{schema_bundle}` |

### `bigtableadmin.projects.instances.tables.schemaBundles.getIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the access control policy for a Bigtable resource. Returns an empty policy if the resource exists but does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.tables.schemaBundles.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+parent}/schemaBundles`
- Lists all schema bundles associated with the specified table.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSchemaBundlesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of schema bundles. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. |
| `pageSize` | query | integer (int32) | no | The maximum number of schema bundles to return. If the value is positive, the server may return at most this value. If unspecified, the server will return the maximum allowed page size. |
| `pageToken` | query | string | no | A page token, received from a previous `ListSchemaBundles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSchemaBundles` must match the call that provided the page token. |
| `view` | query | string enum | no | Optional. The resource_view to be applied to the returned SchemaBundles' fields. Defaults to NAME_ONLY. Values: `SCHEMA_BUNDLE_VIEW_UNSPECIFIED`, `NAME_ONLY`, `BASIC`, `FULL`. |

### `bigtableadmin.projects.instances.tables.schemaBundles.patch`

- Versions: v2
- `PATCH https://bigtableadmin.googleapis.com/v2/{+name}`
- Updates a schema bundle in the specified table.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SchemaBundle`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The unique name identifying this schema bundle. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/{schema_bundle}` |
| `ignoreWarnings` | query | boolean | no | Optional. If set, ignore the safety checks when updating the Schema Bundle. The safety checks are: - The new Schema Bundle is backwards compatible with the existing Schema Bundle. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `bigtableadmin.projects.instances.tables.schemaBundles.setIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the access control policy on a Bigtable resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.tables.schemaBundles.testIamPermissions`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that the caller has on the specified Bigtable resource.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.tables.setIamPolicy`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the access control policy on a Bigtable resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.tables.testIamPermissions`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that the caller has on the specified Bigtable resource.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.tables.undelete`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+name}:undelete`
- Restores a specified table which was accidentally deleted.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.table`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `UndeleteTableRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique name of the table to be restored. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. |

### `bigtableadmin.projects.instances.testIamPermissions`

- Versions: v2
- `POST https://bigtableadmin.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that the caller has on the specified instance resource.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `bigtableadmin.projects.instances.update`

- Versions: v2
- `PUT https://bigtableadmin.googleapis.com/v2/{+name}`
- Updates an instance within a project. This method updates only the display name and type for an Instance. To update other Instance properties, such as labels, use PartialUpdateInstance.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Instance`; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`. |

### `bigtableadmin.projects.locations.list`

- Versions: v2
- `GET https://bigtableadmin.googleapis.com/v2/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/bigtable.admin`, `https://www.googleapis.com/auth/bigtable.admin.cluster`, `https://www.googleapis.com/auth/bigtable.admin.instance`, `https://www.googleapis.com/auth/cloud-bigtable.admin`, `https://www.googleapis.com/auth/cloud-bigtable.admin.cluster`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### Example request skeleton

Generated from the Discovery entry of `bigtableadmin.operations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://bigtableadmin.googleapis.com/v2/{+name}"
```

## Notes

- Generated from the Discovery document(s) v2 of `bigtableadmin` (retrieved 2026-11-14). Resources on this page: operations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/bigtableadmin/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped bracket expressions from the instance name format; in google/bigtable/admin/v2/instance.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/bigtable/admin/v2/instance.proto) it is `projects/{project}/instances/[a-z][a-z0-9\\-]+[a-z0-9]` (shown above as `instances/a-z+[a-z0-9]`).
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the cluster name format; in google/bigtable/admin/v2/instance.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/bigtable/admin/v2/instance.proto) it is `projects/{project}/instances/{instance}/clusters/[a-z][-a-z0-9]*` (shown above as `clusters/a-z*`).
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the backup ID regular expression; in google/bigtable/admin/v2/bigtable_table_admin.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/bigtable/admin/v2/bigtable_table_admin.proto) it is `[_a-zA-Z0-9][-_.a-zA-Z0-9]*` (shown above as `_a-zA-Z0-9*`).
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://bigtableadmin.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
