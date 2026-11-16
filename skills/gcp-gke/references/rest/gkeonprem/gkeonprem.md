---
source: https://gkeonprem.googleapis.com/$discovery/rest?version=v1
---

# GKE On-Prem API REST API (gkeonprem)

## Signature / Usage

Base URL: `https://gkeonprem.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `gkeonprem.projects.locations.bareMetalAdminClusters.create`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/bareMetalAdminClusters`
- Creates a new bare metal admin cluster in a given project and location. The API needs to be combined with creating a bootstrap cluster to work. See: https://cloud.google.com/anthos/clusters/docs/bare-metal/latest/installing/creating-clusters/create-admin-cluster-api#prepare_bootstrap_environment
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BareMetalAdminCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location where the cluster is created in. Format: "projects/{project}/locations/{location}" |
| `allowPreflightFailure` | query | boolean | no | Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster. |
| `bareMetalAdminClusterId` | query | string | yes | Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+\[a-z0-9\]$/ |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.bareMetalAdminClusters.enroll`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/bareMetalAdminClusters:enroll`
- Enrolls an existing bare metal admin cluster to the Anthos On-Prem API within a given project and location. Through enrollment, an existing admin cluster will become Anthos On-Prem API managed. The corresponding GCP resources will be created and all future modifications to the cluster will be expected to be performed through the API.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnrollBareMetalAdminClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location where the cluster is enrolled in. Format: "projects/{project}/locations/{location}" |

### `gkeonprem.projects.locations.bareMetalAdminClusters.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets details of a single bare metal admin cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BareMetalAdminCluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the bare metal admin cluster to get. Format: "projects/{project}/locations/{location}/bareMetalAdminClusters/{bare_metal_admin_cluster}" |
| `allowMissing` | query | boolean | no | Optional. If true, return BareMetal Admin Cluster including the one that only exists in RMS. |
| `view` | query | string enum | no | View for bare metal admin cluster. When `BASIC` is specified, only the cluster resource name and membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as \`FULL', which returns the complete cluster configuration details. Values: `CLUSTER_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `gkeonprem.projects.locations.bareMetalAdminClusters.getIamPolicy`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkeonprem.projects.locations.bareMetalAdminClusters.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+parent}/bareMetalAdminClusters`
- Lists bare metal admin clusters in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBareMetalAdminClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location where the clusters are listed in. Format: "projects/{project}/locations/{location}" |
| `allowMissing` | query | boolean | no | Optional. If true, return list of BareMetal Admin Clusters including the ones that only exists in RMS. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, at most 50 clusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |
| `view` | query | string enum | no | View for bare metal admin clusters. When `BASIC` is specified, only the admin cluster resource name and membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as \`FULL', which returns the complete admin cluster configuration details. Values: `CLUSTER_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `gkeonprem.projects.locations.bareMetalAdminClusters.operations.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `gkeonprem.projects.locations.bareMetalAdminClusters.operations.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}/operations`
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

### `gkeonprem.projects.locations.bareMetalAdminClusters.patch`

- Versions: v1
- `PATCH https://gkeonprem.googleapis.com/v1/{+name}`
- Updates the parameters of a single bare metal admin cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BareMetalAdminCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The bare metal admin cluster resource name. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the BareMetalAdminCluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all populated fields in the BareMetalAdminCluster message will be updated. Empty fields will be ignored unless a field mask is used. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.bareMetalAdminClusters.queryVersionConfig`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/bareMetalAdminClusters:queryVersionConfig`
- Queries the bare metal admin cluster version config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryBareMetalAdminVersionConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location to query for version config. Format: "projects/{project}/locations/{location}" |
| `upgradeConfig.clusterName` | query | string | no | The admin cluster resource name. This is the full resource name of the admin cluster resource. Format: "projects/{project}/locations/{location}/bareMetalAdminClusters/{bare_metal_admin_cluster}" |

### `gkeonprem.projects.locations.bareMetalAdminClusters.setIamPolicy`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkeonprem.projects.locations.bareMetalAdminClusters.testIamPermissions`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkeonprem.projects.locations.bareMetalAdminClusters.unenroll`

- Versions: v1
- `DELETE https://gkeonprem.googleapis.com/v1/{+name}:unenroll`
- Unenrolls an existing bare metal admin cluster from the Anthos On-Prem API within a given project and location. Unenrollment removes the Cloud reference to the cluster without modifying the underlying OnPrem Resources. Clusters will continue to run; however, they will no longer be accessible through the Anthos On-Prem API or its clients.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the bare metal admin cluster to be unenrolled. Format: "projects/{project}/locations/{location}/bareMetalAdminClusters/{cluster}" |
| `allowMissing` | query | boolean | no | If set to true, and the bare metal admin cluster is not found, the request will succeed but no action will be taken on the server and return a completed LRO. |
| `etag` | query | string | no | The current etag of the bare metal admin cluster. If an etag is provided and does not match the current etag of the cluster, deletion will be blocked and an ABORTED error will be returned. |
| `ignoreErrors` | query | boolean | no | If set to true, the unenrollment of a bare metal admin cluster resource will succeed even if errors occur during unenrollment. This parameter can be used when you want to unenroll admin cluster resource and the on-prem admin cluster is disconnected / unreachable. WARNING: Using this parameter when your admin cluster still exists may result in a deleted GCP admin cluster but existing resourcelink in on-prem admin cluster and membership. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.create`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/bareMetalNodePools`
- Creates a new bare metal node pool in a given project, location and Bare Metal cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BareMetalNodePool`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this node pool will be created. projects/{project}/locations/{location}/bareMetalClusters/{cluster} |
| `bareMetalNodePoolId` | query | string | no | The ID to use for the node pool, which will become the final component of the node pool's resource name. This value must be up to 63 characters, and valid characters are /a-z-/. The value must not be permitted to be a UUID (or UUID-like: anything matching /^\[0-9a-f\]{8}(-\[0-9a-f\]{4}){3}-\[0-9a-f\]{12}$/i). |
| `validateOnly` | query | boolean | no | If set, only validate the request, but do not actually create the node pool. |

### `gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.delete`

- Versions: v1
- `DELETE https://gkeonprem.googleapis.com/v1/{+name}`
- Deletes a single bare metal node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the node pool to delete. Format: projects/{project}/locations/{location}/bareMetalClusters/{cluster}/bareMetalNodePools/{nodepool} |
| `allowMissing` | query | boolean | no | If set to true, and the bare metal node pool is not found, the request will succeed but no action will be taken on the server and return a completed LRO. |
| `etag` | query | string | no | The current etag of the BareMetalNodePool. If an etag is provided and does not match the current etag of the node pool, deletion will be blocked and an ABORTED error will be returned. |
| `ignoreErrors` | query | boolean | no | If set to true, the deletion of a bare metal node pool resource will succeed even if errors occur during deletion. This parameter can be used when you want to delete GCP's node pool resource and you've already deleted the on-prem admin cluster that hosted your node pool. WARNING: Using this parameter when your user cluster still exists may result in a deleted GCP node pool but an existing on-prem node pool. |
| `validateOnly` | query | boolean | no | If set, only validate the request, but do not actually delete the node pool. |

### `gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.enroll`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/bareMetalNodePools:enroll`
- Enrolls an existing bare metal node pool to the Anthos On-Prem API within a given project and location. Through enrollment, an existing node pool will become Anthos On-Prem API managed. The corresponding GCP resources will be created.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnrollBareMetalNodePoolRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this node pool will be created. projects/{project}/locations/{location}/bareMetalClusters/{cluster} |

### `gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets details of a single bare metal node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BareMetalNodePool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the node pool to retrieve. projects/{project}/locations/{location}/bareMetalClusters/{cluster}/bareMetalNodePools/{nodepool} |
| `view` | query | string enum | no | View for bare metal node pool. When `BASIC` is specified, only the node pool resource name is returned. The default/unset value `NODE_POOL_VIEW_UNSPECIFIED` is the same as \`FULL', which returns the complete node pool configuration details. Values: `NODE_POOL_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.getIamPolicy`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+parent}/bareMetalNodePools`
- Lists bare metal node pools in a given project, location and bare metal cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBareMetalNodePoolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of node pools. Format: projects/{project}/locations/{location}/bareMetalClusters/{bareMetalCluster} |
| `pageSize` | query | integer (int32) | no | The maximum number of node pools to return. The service may return fewer than this value. If unspecified, at most 50 node pools will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListBareMetalNodePools` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBareMetalNodePools` must match the call that provided the page token. |
| `view` | query | string enum | no | View for bare metal node pools. When `BASIC` is specified, only the node pool resource name is returned. The default/unset value `NODE_POOL_VIEW_UNSPECIFIED` is the same as \`FULL', which returns the complete node pool configuration details. Values: `NODE_POOL_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.operations.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.operations.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}/operations`
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

### `gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.patch`

- Versions: v1
- `PATCH https://gkeonprem.googleapis.com/v1/{+name}`
- Updates the parameters of a single bare metal node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BareMetalNodePool`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The bare metal node pool resource name. |
| `allowMissing` | query | boolean | no | If set to true, and the bare metal node pool is not found, the request will create a new bare metal node pool with the provided configuration. The user must have both create and update permission to call Update with allow_missing set to true. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the BareMetalNodePool resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all populated fields in the BareMetalNodePool message will be updated. Empty fields will be ignored unless a field mask is used. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.setIamPolicy`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.testIamPermissions`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.unenroll`

- Versions: v1
- `DELETE https://gkeonprem.googleapis.com/v1/{+name}:unenroll`
- Unenrolls a bare metal node pool from Anthos On-Prem API.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the node pool to unenroll. Format: projects/{project}/locations/{location}/bareMetalClusters/{cluster}/bareMetalNodePools/{nodepool} |
| `allowMissing` | query | boolean | no | If set to true, and the bare metal node pool is not found, the request will succeed but no action will be taken on the server and return a completed LRO. |
| `etag` | query | string | no | The current etag of the bare metal node pool. If an etag is provided and does not match the current etag of node pool, deletion will be blocked and an ABORTED error will be returned. |
| `validateOnly` | query | boolean | no | If set, only validate the request, but do not actually unenroll the node pool. |

### `gkeonprem.projects.locations.bareMetalClusters.create`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/bareMetalClusters`
- Creates a new bare metal cluster in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BareMetalCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location where the cluster is created in. Format: "projects/{project}/locations/{location}" |
| `allowPreflightFailure` | query | boolean | no | Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster. |
| `bareMetalClusterId` | query | string | yes | Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+\[a-z0-9\]$/ |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.bareMetalClusters.delete`

- Versions: v1
- `DELETE https://gkeonprem.googleapis.com/v1/{+name}`
- Deletes a single bare metal Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the bare metal user cluster to be deleted. Format: "projects/{project}/locations/{location}/bareMetalClusters/{bare_metal_cluster}" |
| `allowMissing` | query | boolean | no | If set to true, and the bare metal cluster is not found, the request will succeed but no action will be taken on the server and return a completed LRO. |
| `etag` | query | string | no | The current etag of the bare metal Cluster. If an etag is provided and does not match the current etag of the cluster, deletion will be blocked and an ABORTED error will be returned. |
| `force` | query | boolean | no | If set to true, any node pools from the cluster will also be deleted. |
| `ignoreErrors` | query | boolean | no | If set to true, the deletion of a bare metal user cluster resource will succeed even if errors occur during deletion. This parameter can be used when you want to delete GCP's cluster resource and the on-prem admin cluster that hosts your user cluster is disconnected / unreachable or deleted. WARNING: Using this parameter when your user cluster still exists may result in a deleted GCP user cluster but an existing on-prem user cluster. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.bareMetalClusters.enroll`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/bareMetalClusters:enroll`
- Enrolls an existing bare metal user cluster and its node pools to the Anthos On-Prem API within a given project and location. Through enrollment, an existing cluster will become Anthos On-Prem API managed. The corresponding GCP resources will be created and all future modifications to the cluster and/or its node pools will be expected to be performed through the API.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnrollBareMetalClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location where the cluster is enrolled in. Format: "projects/{project}/locations/{location}" |

### `gkeonprem.projects.locations.bareMetalClusters.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets details of a single bare metal Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BareMetalCluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the bare metal user cluster to get. Format: "projects/{project}/locations/{location}/bareMetalClusters/{bare_metal_cluster}" |
| `allowMissing` | query | boolean | no | Optional. If true, return BareMetal Cluster including the one that only exists in RMS. |
| `view` | query | string enum | no | View for bare metal user cluster. When `BASIC` is specified, only the cluster resource name and admin cluster membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as \`FULL', which returns the complete cluster configuration details. Values: `CLUSTER_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `gkeonprem.projects.locations.bareMetalClusters.getIamPolicy`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkeonprem.projects.locations.bareMetalClusters.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+parent}/bareMetalClusters`
- Lists bare metal clusters in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBareMetalClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location where the clusters are listed in. Format: "projects/{project}/locations/{location}" |
| `allowMissing` | query | boolean | no | Optional. If true, return list of BareMetal Clusters including the ones that only exists in RMS. |
| `filter` | query | string | no | A resource filtering expression following https://google.aip.dev/160. When non-empty, only resource's whose attributes field matches the filter are returned. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, at most 50 clusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |
| `view` | query | string enum | no | View for bare metal Clusters. When `BASIC` is specified, only the cluster resource name and admin cluster membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as \`FULL', which returns the complete cluster configuration details. Values: `CLUSTER_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `gkeonprem.projects.locations.bareMetalClusters.operations.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `gkeonprem.projects.locations.bareMetalClusters.operations.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}/operations`
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

### `gkeonprem.projects.locations.bareMetalClusters.patch`

- Versions: v1
- `PATCH https://gkeonprem.googleapis.com/v1/{+name}`
- Updates the parameters of a single bare metal Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BareMetalCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The bare metal user cluster resource name. |
| `allowMissing` | query | boolean | no | If set to true, and the bare metal cluster is not found, the request will create a new bare metal cluster with the provided configuration. The user must have both create and update permission to call Update with allow_missing set to true. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the BareMetalCluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all populated fields in the BareMetalCluster message will be updated. Empty fields will be ignored unless a field mask is used. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.bareMetalClusters.queryVersionConfig`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/bareMetalClusters:queryVersionConfig`
- Queries the bare metal user cluster version config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryBareMetalVersionConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location to query for version config. Format: "projects/{project}/locations/{location}" |
| `createConfig.adminClusterMembership` | query | string | no | The admin cluster membership. This is the full resource name of the admin cluster's fleet membership. Format: "projects/{project}/locations/{location}/memberships/{membership}" |
| `createConfig.adminClusterName` | query | string | no | The admin cluster resource name. This is the full resource name of the admin cluster resource. Format: "projects/{project}/locations/{location}/bareMetalAdminClusters/{bare_metal_admin_cluster}" |
| `upgradeConfig.clusterName` | query | string | no | The user cluster resource name. This is the full resource name of the user cluster resource. Format: "projects/{project}/locations/{location}/bareMetalClusters/{bare_metal_cluster}" |

### `gkeonprem.projects.locations.bareMetalClusters.setIamPolicy`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkeonprem.projects.locations.bareMetalClusters.testIamPermissions`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkeonprem.projects.locations.bareMetalClusters.unenroll`

- Versions: v1
- `DELETE https://gkeonprem.googleapis.com/v1/{+name}:unenroll`
- Unenrolls an existing bare metal user cluster and its node pools from the Anthos On-Prem API within a given project and location. Unenrollment removes the Cloud reference to the cluster without modifying the underlying OnPrem Resources. Clusters and node pools will continue to run; however, they will no longer be accessible through the Anthos On-Prem API or its clients.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the bare metal user cluster to be unenrolled. Format: "projects/{project}/locations/{location}/bareMetalClusters/{cluster}" |
| `allowMissing` | query | boolean | no | If set to true, and the bare metal cluster is not found, the request will succeed but no action will be taken on the server and return a completed LRO. |
| `etag` | query | string | no | The current etag of the bare metal Cluster. If an etag is provided and does not match the current etag of the cluster, deletion will be blocked and an ABORTED error will be returned. |
| `force` | query | boolean | conditional | This is required if the cluster has any associated node pools. When set, any child node pools will also be unenrolled. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `gkeonprem.projects.locations.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}/locations`
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

### `gkeonprem.projects.locations.operations.cancel`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `gkeonprem.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://gkeonprem.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `gkeonprem.projects.locations.operations.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `gkeonprem.projects.locations.operations.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}/operations`
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

### `gkeonprem.projects.locations.vmwareAdminClusters.create`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/vmwareAdminClusters`
- Creates a new VMware admin cluster in a given project and location. The API needs to be combined with creating a bootstrap cluster to work.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VmwareAdminCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location where the cluster is created in. Format: "projects/{project}/locations/{location}" |
| `allowPreflightFailure` | query | boolean | no | Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster. |
| `skipValidations` | query | repeated string | no | Optional. If set, skip the specified validations. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |
| `vmwareAdminClusterId` | query | string | yes | Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+\[a-z0-9\]$/ |

### `gkeonprem.projects.locations.vmwareAdminClusters.enroll`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/vmwareAdminClusters:enroll`
- Enrolls an existing VMware admin cluster to the Anthos On-Prem API within a given project and location. Through enrollment, an existing admin cluster will become Anthos On-Prem API managed. The corresponding GCP resources will be created and all future modifications to the cluster will be expected to be performed through the API.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnrollVmwareAdminClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location where the cluster is enrolled in. Format: "projects/{project}/locations/{location}" |

### `gkeonprem.projects.locations.vmwareAdminClusters.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets details of a single VMware admin cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `VmwareAdminCluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the VMware admin cluster to be returned. Format: "projects/{project}/locations/{location}/vmwareAdminClusters/{vmware_admin_cluster}" |
| `allowMissing` | query | boolean | no | Optional. If true, return Vmware Admin Cluster including the one that only exists in RMS. |
| `view` | query | string enum | no | View for VMware admin cluster. When `BASIC` is specified, only the cluster resource name and membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as \`FULL', which returns the complete cluster configuration details. Values: `CLUSTER_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `gkeonprem.projects.locations.vmwareAdminClusters.getIamPolicy`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkeonprem.projects.locations.vmwareAdminClusters.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+parent}/vmwareAdminClusters`
- Lists VMware admin clusters in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVmwareAdminClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location where the clusters are listed in. Format: "projects/{project}/locations/{location}" |
| `allowMissing` | query | boolean | no | Optional. If true, return list of Vmware Admin Clusters including the ones that only exists in RMS. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, at most 50 clusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |
| `view` | query | string enum | no | View for VMware admin clusters. When `BASIC` is specified, only the admin cluster resource name and membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as \`FULL', which returns the complete admin cluster configuration details. Values: `CLUSTER_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `gkeonprem.projects.locations.vmwareAdminClusters.operations.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `gkeonprem.projects.locations.vmwareAdminClusters.operations.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}/operations`
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

### `gkeonprem.projects.locations.vmwareAdminClusters.patch`

- Versions: v1
- `PATCH https://gkeonprem.googleapis.com/v1/{+name}`
- Updates the parameters of a single VMware admin cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VmwareAdminCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The VMware admin cluster resource name. |
| `skipValidations` | query | repeated string | no | Optional. If set, the server-side preflight checks will be skipped. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the VMwareAdminCluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all populated fields in the VmwareAdminCluster message will be updated. Empty fields will be ignored unless a field mask is used. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.vmwareAdminClusters.setIamPolicy`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkeonprem.projects.locations.vmwareAdminClusters.testIamPermissions`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkeonprem.projects.locations.vmwareAdminClusters.unenroll`

- Versions: v1
- `DELETE https://gkeonprem.googleapis.com/v1/{+name}:unenroll`
- Unenrolls an existing VMware admin cluster from the Anthos On-Prem API within a given project and location. Unenrollment removes the Cloud reference to the cluster without modifying the underlying OnPrem Resources. Clusters will continue to run; however, they will no longer be accessible through the Anthos On-Prem API or its clients.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the VMware admin cluster to be unenrolled. Format: "projects/{project}/locations/{location}/vmwareAdminClusters/{cluster}" |
| `allowMissing` | query | boolean | no | If set to true, and the VMware admin cluster is not found, the request will succeed but no action will be taken on the server and return a completed LRO. |
| `etag` | query | string | no | The current etag of the VMware admin cluster. If an etag is provided and does not match the current etag of the cluster, deletion will be blocked and an ABORTED error will be returned. |
| `ignoreErrors` | query | boolean | no | Optional. If set to true, the unenrollment of a vmware admin cluster resource will succeed even if errors occur during unenrollment. This parameter can be used when you want to unenroll admin cluster resource and the on-prem admin cluster is disconnected / unreachable. WARNING: Using this parameter when your admin cluster still exists may result in a deleted GCP admin cluster but existing resourcelink in on-prem admin cluster and membership. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.vmwareClusters.create`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/vmwareClusters`
- Creates a new VMware user cluster in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VmwareCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location where this cluster is created in. Format: "projects/{project}/locations/{location}" |
| `allowPreflightFailure` | query | boolean | no | Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster. |
| `skipValidations` | query | repeated string | no | Optional. List of validations to skip during cluster creation. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |
| `vmwareClusterId` | query | string | no | User provided identifier that is used as part of the resource name; This value must be up to 40 characters and follow RFC-1123 (https://tools.ietf.org/html/rfc1123) format. |

### `gkeonprem.projects.locations.vmwareClusters.delete`

- Versions: v1
- `DELETE https://gkeonprem.googleapis.com/v1/{+name}`
- Deletes a single VMware Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the VMware user cluster to be deleted. Format: "projects/{project}/locations/{location}/vmwareClusters/{vmware_cluster}" |
| `allowMissing` | query | boolean | no | If set to true, and the VMware cluster is not found, the request will succeed but no action will be taken on the server and return a completed LRO. |
| `etag` | query | string | no | The current etag of the VMware cluster. If an etag is provided and does not match the current etag of the cluster, deletion will be blocked and an ABORTED error will be returned. |
| `force` | query | boolean | no | If set to true, any node pools from the cluster will also be deleted. |
| `ignoreErrors` | query | boolean | no | If set to true, the deletion of a VMware user cluster resource will succeed even if errors occur during deletion. This parameter can be used when you want to delete GCP's cluster resource and the on-prem admin cluster that hosts your user cluster is disconnected / unreachable or deleted. WARNING: Using this parameter when your user cluster still exists may result in a deleted GCP user cluster but an existing on-prem user cluster. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.vmwareClusters.enroll`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/vmwareClusters:enroll`
- Enrolls an existing VMware user cluster and its node pools to the Anthos On-Prem API within a given project and location. Through enrollment, an existing cluster will become Anthos On-Prem API managed. The corresponding GCP resources will be created and all future modifications to the cluster and/or its node pools will be expected to be performed through the API.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnrollVmwareClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location where the cluster is Enrolled in. Format: "projects/{project}/locations/{location}" |

### `gkeonprem.projects.locations.vmwareClusters.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets details of a single VMware Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `VmwareCluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the VMware user cluster to be returned. Format: "projects/{project}/locations/{location}/vmwareClusters/{vmware_cluster}" |
| `allowMissing` | query | boolean | no | Optional. If true, return Vmware Cluster including the one that only exists in RMS. |
| `view` | query | string enum | no | View for VMware user cluster. When `BASIC` is specified, only the cluster resource name and admin cluster membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as \`FULL', which returns the complete cluster configuration details. Values: `CLUSTER_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `gkeonprem.projects.locations.vmwareClusters.getIamPolicy`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkeonprem.projects.locations.vmwareClusters.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+parent}/vmwareClusters`
- Lists VMware Clusters in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVmwareClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location where the clusters are listed in. Format: "projects/{project}/locations/{location}" |
| `allowMissing` | query | boolean | no | Optional. If true, return list of Vmware Clusters including the ones that only exists in RMS. |
| `filter` | query | string | no | A resource filtering expression following https://google.aip.dev/160. When non-empty, only resource's whose attributes field matches the filter are returned. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, at most 50 clusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |
| `view` | query | string enum | no | View for VMware clusters. When `BASIC` is specified, only the cluster resource name and admin cluster membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as \`FULL', which returns the complete cluster configuration details. Values: `CLUSTER_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `gkeonprem.projects.locations.vmwareClusters.operations.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `gkeonprem.projects.locations.vmwareClusters.operations.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}/operations`
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

### `gkeonprem.projects.locations.vmwareClusters.patch`

- Versions: v1
- `PATCH https://gkeonprem.googleapis.com/v1/{+name}`
- Updates the parameters of a single VMware cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VmwareCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The VMware user cluster resource name. |
| `skipValidations` | query | repeated string | no | — |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the VMwareCluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all populated fields in the VmwareCluster message will be updated. Empty fields will be ignored unless a field mask is used. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.vmwareClusters.queryVersionConfig`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/vmwareClusters:queryVersionConfig`
- Queries the VMware user cluster version config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryVmwareVersionConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the project and location to query for version config. Format: "projects/{project}/locations/{location}" |
| `createConfig.adminClusterMembership` | query | string | no | The admin cluster membership. This is the full resource name of the admin cluster's fleet membership. Format: "projects/{project}/locations/{location}/memberships/{membership}" |
| `createConfig.adminClusterName` | query | string | no | The admin cluster resource name. This is the full resource name of the admin cluster resource. Format: "projects/{project}/locations/{location}/vmwareAdminClusters/{vmware_admin_cluster}" |
| `upgradeConfig.clusterName` | query | string | no | The user cluster resource name. This is the full resource name of the user cluster resource. Format: "projects/{project}/locations/{location}/vmwareClusters/{vmware_cluster}" |

### `gkeonprem.projects.locations.vmwareClusters.setIamPolicy`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkeonprem.projects.locations.vmwareClusters.testIamPermissions`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkeonprem.projects.locations.vmwareClusters.unenroll`

- Versions: v1
- `DELETE https://gkeonprem.googleapis.com/v1/{+name}:unenroll`
- Unenrolls an existing VMware user cluster and its node pools from the Anthos On-Prem API within a given project and location. Unenrollment removes the Cloud reference to the cluster without modifying the underlying OnPrem Resources. Clusters and node pools will continue to run; however, they will no longer be accessible through the Anthos On-Prem API or UI.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the VMware user cluster to be unenrolled. Format: "projects/{project}/locations/{location}/vmwareClusters/{vmware_cluster}" |
| `allowMissing` | query | boolean | no | If set to true, and the VMware cluster is not found, the request will succeed but no action will be taken on the server and return a completed LRO. |
| `etag` | query | string | no | The current etag of the VMware Cluster. If an etag is provided and does not match the current etag of the cluster, deletion will be blocked and an ABORTED error will be returned. |
| `force` | query | boolean | conditional | This is required if the cluster has any associated node pools. When set, any child node pools will also be unenrolled. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.create`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/vmwareNodePools`
- Creates a new VMware node pool in a given project, location and VMWare cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VmwareNodePool`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this node pool will be created. projects/{project}/locations/{location}/vmwareClusters/{cluster} |
| `validateOnly` | query | boolean | no | If set, only validate the request, but do not actually create the node pool. |
| `vmwareNodePoolId` | query | string | no | The ID to use for the node pool, which will become the final component of the node pool's resource name. This value must be up to 40 characters and follow RFC-1123 (https://tools.ietf.org/html/rfc1123) format. The value must not be permitted to be a UUID (or UUID-like: anything matching /^\[0-9a-f\]{8}(-\[0-9a-f\]{4}){3}-\[0-9a-f\]{12}$/i). |

### `gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.delete`

- Versions: v1
- `DELETE https://gkeonprem.googleapis.com/v1/{+name}`
- Deletes a single VMware node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the node pool to delete. Format: projects/{project}/locations/{location}/vmwareClusters/{cluster}/vmwareNodePools/{nodepool} |
| `allowMissing` | query | boolean | no | If set to true, and the VMware node pool is not found, the request will succeed but no action will be taken on the server and return a completed LRO. |
| `etag` | query | string | no | The current etag of the VmwareNodePool. If an etag is provided and does not match the current etag of the node pool, deletion will be blocked and an ABORTED error will be returned. |
| `ignoreErrors` | query | boolean | no | If set to true, the deletion of a VMware node pool resource will succeed even if errors occur during deletion. This parameter can be used when you want to delete GCP's node pool resource and you've already deleted the on-prem admin cluster that hosted your node pool. WARNING: Using this parameter when your user cluster still exists may result in a deleted GCP node pool but an existing on-prem node pool. |
| `validateOnly` | query | boolean | no | If set, only validate the request, but do not actually delete the node pool. |

### `gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.enroll`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+parent}/vmwareNodePools:enroll`
- Enrolls a VMware node pool to Anthos On-Prem API
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnrollVmwareNodePoolRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where the node pool is enrolled in. |

### `gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets details of a single VMware node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `VmwareNodePool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the node pool to retrieve. projects/{project}/locations/{location}/vmwareClusters/{cluster}/vmwareNodePools/{nodepool} |
| `view` | query | string enum | no | View for VMware node pool. When `BASIC` is specified, only the node pool resource name is returned. The default/unset value `NODE_POOL_VIEW_UNSPECIFIED` is the same as \`FULL', which returns the complete node pool configuration details. Values: `NODE_POOL_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.getIamPolicy`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+parent}/vmwareNodePools`
- Lists VMware node pools in a given project, location and VMWare cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVmwareNodePoolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of node pools. Format: projects/{project}/locations/{location}/vmwareClusters/{vmwareCluster} |
| `pageSize` | query | integer (int32) | no | The maximum number of node pools to return. The service may return fewer than this value. If unspecified, at most 50 node pools will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListVmwareNodePools` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListVmwareNodePools` must match the call that provided the page token. |
| `view` | query | string enum | no | View for VMware node pools. When `BASIC` is specified, only the node pool resource name is returned. The default/unset value `NODE_POOL_VIEW_UNSPECIFIED` is the same as \`FULL', which returns the complete node pool configuration details. Values: `NODE_POOL_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.operations.get`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.operations.list`

- Versions: v1
- `GET https://gkeonprem.googleapis.com/v1/{+name}/operations`
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

### `gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.patch`

- Versions: v1
- `PATCH https://gkeonprem.googleapis.com/v1/{+name}`
- Updates the parameters of a single VMware node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VmwareNodePool`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The resource name of this node pool. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the VMwareNodePool resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all populated fields in the VMwareNodePool message will be updated. Empty fields will be ignored unless a field mask is used. |
| `validateOnly` | query | boolean | no | Validate the request without actually doing any updates. |

### `gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.setIamPolicy`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.testIamPermissions`

- Versions: v1
- `POST https://gkeonprem.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.unenroll`

- Versions: v1
- `DELETE https://gkeonprem.googleapis.com/v1/{+name}:unenroll`
- Unenrolls a VMware node pool to Anthos On-Prem API
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the node pool to unenroll. Format: projects/{project}/locations/{location}/vmwareClusters/{cluster}/vmwareNodePools/{nodepool} |
| `allowMissing` | query | boolean | no | If set to true, and the VMware node pool is not found, the request will succeed but no action will be taken on the server and return a completed LRO. |
| `etag` | query | string | no | The current etag of the VMware node pool. If an etag is provided and does not match the current etag of node pool, deletion will be blocked and an ABORTED error will be returned. |
| `validateOnly` | query | boolean | no | If set, only validate the request, but do not actually unenroll the node pool. |

### Example request skeleton

Generated from the Discovery entry of `gkeonprem.projects.locations.bareMetalAdminClusters.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://gkeonprem.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `gkeonprem` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://gkeonprem.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
