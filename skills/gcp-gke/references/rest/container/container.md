---
source: https://container.googleapis.com/$discovery/rest?version=v1
---

# Kubernetes Engine API REST API (container)

## Signature / Usage

Base URL: `https://container.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `container.projects.aggregated.usableSubnetworks.list`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+parent}/aggregated/usableSubnetworks`
- Lists subnetworks that are usable for creating clusters in a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `ListUsableSubnetworksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent project where subnetworks are usable. Specified in the format `projects/*`. |
| `filter` | query | string | no | Filtering currently only supports equality on the networkProjectId and must be in the form: "networkProjectId=\[PROJECTID\]", where `networkProjectId` is the project which owns the listed subnetworks. This defaults to the parent project ID. |
| `pageSize` | query | integer (int32) | no | The max number of results per page that should be returned. If the number of available results is larger than `page_size`, a `next_page_token` is returned which can be used to get the next page of results in subsequent requests. Acceptable values are 0 to 500, inclusive. (Default: 500) |
| `pageToken` | query | string | no | Specifies a page token to use. Set this to the nextPageToken returned by previous list requests to get the next page of results. |

### `container.projects.locations.clusters.checkAutopilotCompatibility`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+name}:checkAutopilotCompatibility`
- Checks the cluster compatibility with Autopilot mode, and returns a list of compatibility issues.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `CheckAutopilotCompatibilityResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster) of the cluster to retrieve. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.completeControlPlaneUpgrade`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:completeControlPlaneUpgrade`
- CompleteControlPlaneUpgrade completes the rollback-safe upgrade by performing the step two upgrade for a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `CompleteControlPlaneUpgradeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name (project, location, cluster) of the cluster to complete upgrade. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.completeIpRotation`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:completeIpRotation`
- Completes master IP rotation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `CompleteIPRotationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster name) of the cluster to complete IP rotation. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.create`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+parent}/clusters`
- Creates a cluster, consisting of the specified number and type of Google Compute Engine instances. By default, the cluster is created in the project's default network (https://cloud.google.com/compute/docs/networks-and-firewalls#networks). One firewall is added for the cluster. After cluster creation, the kubelet creates routes for each node to allow the containers on that node to communicate with all other instances in the cluster. Finally, an entry is added to the project's global metadata indicating which CIDR range the cluster is using.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `CreateClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent (project and location) where the cluster will be created. Specified in the format `projects/*/locations/*`. |

### `container.projects.locations.clusters.delete`

- Versions: v1, v1beta1
- `DELETE https://container.googleapis.com/v1/{+name}`
- Deletes the cluster, including the Kubernetes endpoint and all worker nodes. Firewalls and routes that were configured during cluster creation are also deleted. Other Google Compute Engine resources that might be in use by the cluster, such as load balancer resources, are not deleted if they weren't present when the cluster was initially created.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster) of the cluster to delete. Specified in the format `projects/*/locations/*/clusters/*`. |
| `clusterId` | query | string | no | Deprecated. The name of the cluster to delete. This field has been deprecated and replaced by the name field. |
| `projectId` | query | string | no | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | query | string | no | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |

### `container.projects.locations.clusters.fetchClusterUpgradeInfo`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+name}:fetchClusterUpgradeInfo`
- Fetch upgrade information of a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `ClusterUpgradeInfo`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name (project, location, cluster) of the cluster to get. Specified in the format `projects/*/locations/*/clusters/*` or `projects/*/zones/*/clusters/*`. |
| `version` | query | string | no | API request version that initiates this operation. |

### `container.projects.locations.clusters.get`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+name}`
- Gets the details of a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `Cluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster) of the cluster to retrieve. Specified in the format `projects/*/locations/*/clusters/*`. |
| `clusterId` | query | string | no | Deprecated. The name of the cluster to retrieve. This field has been deprecated and replaced by the name field. |
| `projectId` | query | string | no | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | query | string | no | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |

### `container.projects.locations.clusters.getJwks`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+parent}/jwks`
- Gets the public component of the cluster signing keys in JSON Web Key format.
- Request: —; Response: `GetJSONWebKeysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The cluster (project, location, cluster name) to get keys for. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.list`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+parent}/clusters`
- Lists all clusters owned by a project in either the specified zone or all zones.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `ListClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent (project and location) where the clusters will be listed. Specified in the format `projects/*/locations/*`. Location "-" matches all zones and all regions. |
| `projectId` | query | string | no | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. |
| `zone` | query | string | no | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides, or "-" for all zones. This field has been deprecated and replaced by the parent field. |

### `container.projects.locations.clusters.nodePools.completeUpgrade`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:completeUpgrade`
- CompleteNodePoolUpgrade will signal an on-going node pool upgrade to complete.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `CompleteNodePoolUpgradeRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster, node pool id) of the node pool to complete upgrade. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`. |

### `container.projects.locations.clusters.nodePools.create`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+parent}/nodePools`
- Creates a node pool for a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `CreateNodePoolRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent (project, location, cluster name) where the node pool will be created. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.nodePools.delete`

- Versions: v1, v1beta1
- `DELETE https://container.googleapis.com/v1/{+name}`
- Deletes a node pool from a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster, node pool id) of the node pool to delete. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`. |
| `clusterId` | query | string | no | Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. |
| `nodePoolId` | query | string | no | Deprecated. The name of the node pool to delete. This field has been deprecated and replaced by the name field. |
| `projectId` | query | string | no | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | query | string | no | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |

### `container.projects.locations.clusters.nodePools.fetchNodePoolUpgradeInfo`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+name}:fetchNodePoolUpgradeInfo`
- Fetch upgrade information of a specific node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `NodePoolUpgradeInfo`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name (project, location, cluster, node pool) of the node pool to get. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*` or `projects/*/zones/*/clusters/*/nodePools/*`. |
| `version` | query | string | no | API request version that initiates this operation. |

### `container.projects.locations.clusters.nodePools.get`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+name}`
- Retrieves the requested node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `NodePool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster, node pool id) of the node pool to get. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`. |
| `clusterId` | query | string | no | Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. |
| `nodePoolId` | query | string | no | Deprecated. The name of the node pool. This field has been deprecated and replaced by the name field. |
| `projectId` | query | string | no | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | query | string | no | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |

### `container.projects.locations.clusters.nodePools.list`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+parent}/nodePools`
- Lists the node pools for a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `ListNodePoolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent (project, location, cluster name) where the node pools will be listed. Specified in the format `projects/*/locations/*/clusters/*`. |
| `clusterId` | query | string | no | Deprecated. The name of the cluster. This field has been deprecated and replaced by the parent field. |
| `projectId` | query | string | no | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. |
| `zone` | query | string | no | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field. |

### `container.projects.locations.clusters.nodePools.rollback`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:rollback`
- Rolls back a previously Aborted or Failed NodePool upgrade. This makes no changes if the last upgrade successfully completed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `RollbackNodePoolUpgradeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster, node pool id) of the node poll to rollback upgrade. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`. |

### `container.projects.locations.clusters.nodePools.setAutoscaling`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:setAutoscaling`
- Sets the autoscaling settings for the specified node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetNodePoolAutoscalingRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster, node pool) of the node pool to set autoscaler settings. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`. |

### `container.projects.locations.clusters.nodePools.setManagement`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:setManagement`
- Sets the NodeManagement options for a node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetNodePoolManagementRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster, node pool id) of the node pool to set management properties. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`. |

### `container.projects.locations.clusters.nodePools.setSize`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:setSize`
- Sets the size for a specific node pool. The new size will be used for all replicas, including future replicas created by modifying NodePool.locations.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetNodePoolSizeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster, node pool id) of the node pool to set size. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`. |

### `container.projects.locations.clusters.nodePools.update`

- Versions: v1, v1beta1
- `PUT https://container.googleapis.com/v1/{+name}`
- Updates the version and/or image type for the specified node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `UpdateNodePoolRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster, node pool) of the node pool to update. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`. |

### `container.projects.locations.clusters.setAddons`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:setAddons`
- Sets the addons for a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetAddonsConfigRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster) of the cluster to set addons. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.setLegacyAbac`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:setLegacyAbac`
- Enables or disables the ABAC authorization mechanism on a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetLegacyAbacRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster name) of the cluster to set legacy abac. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.setLocations`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:setLocations`
- Sets the locations for a specific cluster. Deprecated. Use projects.locations.clusters.update (https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/update) instead.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetLocationsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster) of the cluster to set locations. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.setLogging`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:setLogging`
- Sets the logging service for a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetLoggingServiceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster) of the cluster to set logging. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.setMaintenancePolicy`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:setMaintenancePolicy`
- Sets the maintenance policy for a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetMaintenancePolicyRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster name) of the cluster to set maintenance policy. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.setMasterAuth`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:setMasterAuth`
- Sets master auth materials. Currently supports changing the admin password or a specific cluster, either via password generation or explicitly setting the password.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetMasterAuthRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster) of the cluster to set auth. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.setMonitoring`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:setMonitoring`
- Sets the monitoring service for a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetMonitoringServiceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster) of the cluster to set monitoring. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.setNetworkPolicy`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:setNetworkPolicy`
- Enables or disables Network Policy for a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetNetworkPolicyRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster name) of the cluster to set networking policy. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.setResourceLabels`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:setResourceLabels`
- Sets labels on a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetLabelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster name) of the cluster to set labels. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.startIpRotation`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:startIpRotation`
- Starts master IP rotation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `StartIPRotationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster name) of the cluster to start IP rotation. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.update`

- Versions: v1, v1beta1
- `PUT https://container.googleapis.com/v1/{+name}`
- Updates the settings of a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `UpdateClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster) of the cluster to update. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.updateMaster`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:updateMaster`
- Updates the master for a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `UpdateMasterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, cluster) of the cluster to update. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.clusters.well-known.getOpenid-configuration`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+parent}/.well-known/openid-configuration`
- Gets the OIDC discovery document for the cluster. See the OpenID Connect Discovery 1.0 specification (https://openid.net/specs/openid-connect-discovery-1_0.html) for details.
- Request: —; Response: `GetOpenIDConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The cluster (project, location, cluster name) to get the discovery document for. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.locations.getServerConfig`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+name}/serverConfig`
- Returns configuration info about the Google Kubernetes Engine service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `ServerConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project and location) of the server config to get, specified in the format `projects/*/locations/*`. |
| `projectId` | query | string | no | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | query | string | no | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) to return operations for. This field has been deprecated and replaced by the name field. |

### `container.projects.locations.list`

- Versions: v1beta1
- `GET https://container.googleapis.com/v1beta1/{+parent}/locations`
- Fetches locations that offer Google Kubernetes Engine.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Contains the name of the resource requested. Specified in the format `projects/*`. |

### `container.projects.locations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:cancel`
- Cancels the specified operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, operation id) of the operation to cancel. Specified in the format `projects/*/locations/*/operations/*`. |

### `container.projects.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+name}`
- Gets the specified operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name (project, location, operation id) of the operation to get. Specified in the format `projects/*/locations/*/operations/*`. |
| `operationId` | query | string | no | Deprecated. The server-assigned `name` of the operation. This field has been deprecated and replaced by the name field. |
| `projectId` | query | string | no | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | query | string | no | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |

### `container.projects.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+parent}/operations`
- Lists all operations in a project in a specific zone or all zones.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent (project and location) where the operations will be listed. Specified in the format `projects/*/locations/*`. Location "-" matches all zones and all regions. |
| `projectId` | query | string | no | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. |
| `zone` | query | string | no | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) to return operations for, or `-` for all zones. This field has been deprecated and replaced by the parent field. |

### `container.projects.zones.clusters.addons`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/addons`
- Sets the addons for a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetAddonsConfigRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.completeControlPlaneUpgrade`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/{+name}:completeControlPlaneUpgrade`
- CompleteControlPlaneUpgrade completes the rollback-safe upgrade by performing the step two upgrade for a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `CompleteControlPlaneUpgradeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name (project, location, cluster) of the cluster to complete upgrade. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.zones.clusters.completeIpRotation`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}:completeIpRotation`
- Completes master IP rotation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `CompleteIPRotationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.create`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters`
- Creates a cluster, consisting of the specified number and type of Google Compute Engine instances. By default, the cluster is created in the project's default network (https://cloud.google.com/compute/docs/networks-and-firewalls#networks). One firewall is added for the cluster. After cluster creation, the kubelet creates routes for each node to allow the containers on that node to communicate with all other instances in the cluster. Finally, an entry is added to the project's global metadata indicating which CIDR range the cluster is using.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `CreateClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field. |

### `container.projects.zones.clusters.delete`

- Versions: v1, v1beta1
- `DELETE https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}`
- Deletes the cluster, including the Kubernetes endpoint and all worker nodes. Firewalls and routes that were configured during cluster creation are also deleted. Other Google Compute Engine resources that might be in use by the cluster, such as load balancer resources, are not deleted if they weren't present when the cluster was initially created.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to delete. This field has been deprecated and replaced by the name field. |
| `name` | query | string | no | The name (project, location, cluster) of the cluster to delete. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.zones.clusters.fetchClusterUpgradeInfo`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+name}:fetchClusterUpgradeInfo`
- Fetch upgrade information of a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `ClusterUpgradeInfo`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name (project, location, cluster) of the cluster to get. Specified in the format `projects/*/locations/*/clusters/*` or `projects/*/zones/*/clusters/*`. |
| `version` | query | string | no | API request version that initiates this operation. |

### `container.projects.zones.clusters.get`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}`
- Gets the details of a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `Cluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to retrieve. This field has been deprecated and replaced by the name field. |
| `name` | query | string | no | The name (project, location, cluster) of the cluster to retrieve. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.zones.clusters.legacyAbac`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/legacyAbac`
- Enables or disables the ABAC authorization mechanism on a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetLegacyAbacRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to update. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.list`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters`
- Lists all clusters owned by a project in either the specified zone or all zones.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `ListClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides, or "-" for all zones. This field has been deprecated and replaced by the parent field. |
| `parent` | query | string | no | The parent (project and location) where the clusters will be listed. Specified in the format `projects/*/locations/*`. Location "-" matches all zones and all regions. |

### `container.projects.zones.clusters.locations`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/locations`
- Sets the locations for a specific cluster. Deprecated. Use projects.locations.clusters.update (https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/update) instead.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetLocationsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.logging`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/logging`
- Sets the logging service for a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetLoggingServiceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.master`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/master`
- Updates the master for a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `UpdateMasterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.monitoring`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/monitoring`
- Sets the monitoring service for a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetMonitoringServiceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.nodePools.autoscaling`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}/autoscaling`
- Sets the autoscaling settings for the specified node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetNodePoolAutoscalingRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. |
| `nodePoolId` | path | string | yes | Deprecated. The name of the node pool to upgrade. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.nodePools.create`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools`
- Creates a node pool for a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `CreateNodePoolRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster. This field has been deprecated and replaced by the parent field. |

### `container.projects.zones.clusters.nodePools.delete`

- Versions: v1, v1beta1
- `DELETE https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}`
- Deletes a node pool from a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. |
| `nodePoolId` | path | string | yes | Deprecated. The name of the node pool to delete. This field has been deprecated and replaced by the name field. |
| `name` | query | string | no | The name (project, location, cluster, node pool id) of the node pool to delete. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`. |

### `container.projects.zones.clusters.nodePools.fetchNodePoolUpgradeInfo`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/{+name}:fetchNodePoolUpgradeInfo`
- Fetch upgrade information of a specific node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `NodePoolUpgradeInfo`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name (project, location, cluster, node pool) of the node pool to get. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*` or `projects/*/zones/*/clusters/*/nodePools/*`. |
| `version` | query | string | no | API request version that initiates this operation. |

### `container.projects.zones.clusters.nodePools.get`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}`
- Retrieves the requested node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `NodePool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. |
| `nodePoolId` | path | string | yes | Deprecated. The name of the node pool. This field has been deprecated and replaced by the name field. |
| `name` | query | string | no | The name (project, location, cluster, node pool id) of the node pool to get. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`. |

### `container.projects.zones.clusters.nodePools.list`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools`
- Lists the node pools for a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `ListNodePoolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster. This field has been deprecated and replaced by the parent field. |
| `parent` | query | string | no | The parent (project, location, cluster name) where the node pools will be listed. Specified in the format `projects/*/locations/*/clusters/*`. |

### `container.projects.zones.clusters.nodePools.rollback`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}:rollback`
- Rolls back a previously Aborted or Failed NodePool upgrade. This makes no changes if the last upgrade successfully completed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `RollbackNodePoolUpgradeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to rollback. This field has been deprecated and replaced by the name field. |
| `nodePoolId` | path | string | yes | Deprecated. The name of the node pool to rollback. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.nodePools.setManagement`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}/setManagement`
- Sets the NodeManagement options for a node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetNodePoolManagementRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to update. This field has been deprecated and replaced by the name field. |
| `nodePoolId` | path | string | yes | Deprecated. The name of the node pool to update. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.nodePools.setSize`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}/setSize`
- Sets the size for a specific node pool. The new size will be used for all replicas, including future replicas created by modifying NodePool.locations.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetNodePoolSizeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to update. This field has been deprecated and replaced by the name field. |
| `nodePoolId` | path | string | yes | Deprecated. The name of the node pool to update. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.nodePools.update`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}/update`
- Updates the version and/or image type for the specified node pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `UpdateNodePoolRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. |
| `nodePoolId` | path | string | yes | Deprecated. The name of the node pool to upgrade. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.resourceLabels`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/resourceLabels`
- Sets labels on a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetLabelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.setMaintenancePolicy`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}:setMaintenancePolicy`
- Sets the maintenance policy for a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetMaintenancePolicyRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). |
| `zone` | path | string | yes | Required. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. |
| `clusterId` | path | string | yes | Required. The name of the cluster to update. |

### `container.projects.zones.clusters.setMasterAuth`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}:setMasterAuth`
- Sets master auth materials. Currently supports changing the admin password or a specific cluster, either via password generation or explicitly setting the password.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetMasterAuthRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.setNetworkPolicy`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}:setNetworkPolicy`
- Enables or disables Network Policy for a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `SetNetworkPolicyRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.startIpRotation`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}:startIpRotation`
- Starts master IP rotation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `StartIPRotationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.clusters.update`

- Versions: v1, v1beta1
- `PUT https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}`
- Updates the settings of a specific cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `UpdateClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `clusterId` | path | string | yes | Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.getServerconfig`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/serverconfig`
- Returns configuration info about the Google Kubernetes Engine service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `ServerConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) to return operations for. This field has been deprecated and replaced by the name field. |
| `name` | query | string | no | The name (project and location) of the server config to get, specified in the format `projects/*/locations/*`. |

### `container.projects.zones.operations.cancel`

- Versions: v1, v1beta1
- `POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/operations/{operationId}:cancel`
- Cancels the specified operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the operation resides. This field has been deprecated and replaced by the name field. |
| `operationId` | path | string | yes | Deprecated. The server-assigned `name` of the operation. This field has been deprecated and replaced by the name field. |

### `container.projects.zones.operations.get`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/operations/{operationId}`
- Gets the specified operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |
| `operationId` | path | string | yes | Deprecated. The server-assigned `name` of the operation. This field has been deprecated and replaced by the name field. |
| `name` | query | string | no | The name (project, location, operation id) of the operation to get. Specified in the format `projects/*/locations/*/operations/*`. |

### `container.projects.zones.operations.list`

- Versions: v1, v1beta1
- `GET https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/operations`
- Lists all operations in a project in a specific zone or all zones.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/container`, `https://www.googleapis.com/auth/container.read-only`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. |
| `zone` | path | string | yes | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) to return operations for, or `-` for all zones. This field has been deprecated and replaced by the parent field. |
| `parent` | query | string | no | The parent (project and location) where the operations will be listed. Specified in the format `projects/*/locations/*`. Location "-" matches all zones and all regions. |

### Example request skeleton

Generated from the Discovery entry of `container.projects.aggregated.usableSubnetworks.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://container.googleapis.com/v1/{+parent}/aggregated/usableSubnetworks"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `container` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/container/`; they are the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `container.projects.locations.clusters.setLocations`, `container.projects.zones.clusters.locations`. Avoid them in new code.
- Source: https://container.googleapis.com/$discovery/rest?version=v1, https://container.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
