---
source: https://oracledatabase.googleapis.com/$discovery/rest?version=v1
---

# Oracle Database@Google Cloud API REST API (oracledatabase)

## Signature / Usage

Base URL: `https://oracledatabase.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `oracledatabase.projects.locations.autonomousDatabaseBackups.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/autonomousDatabaseBackups`
- Lists the long-term and automatic backups of an Autonomous Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAutonomousDatabaseBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for ListAutonomousDatabaseBackups in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Only the \*\*autonomous_database_id\*\* field is supported in the following format: `autonomous_database_id="{autonomous_database_id}"`. The accepted values must be a valid Autonomous Database ID, limited to the naming restrictions of the ID: ^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$). The ID must start with a letter, end with a letter or a number, and be a maximum of 63 characters. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 Autonomous DB Backups will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.autonomousDatabaseCharacterSets.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/autonomousDatabaseCharacterSets`
- Lists Autonomous Database Character Sets in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAutonomousDatabaseCharacterSetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the Autonomous Database in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Only the \*\*character_set_type\*\* field is supported in the following format: `character_set_type="{characterSetType}"`. Accepted values include `DATABASE` and `NATIONAL`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 Autonomous DB Character Sets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.autonomousDatabases.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/autonomousDatabases`
- Creates a new Autonomous Database in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AutonomousDatabase`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent in the following format: projects/{project}/locations/{location}. |
| `autonomousDatabaseId` | query | string | yes | Required. The ID of the Autonomous Database to create. This value is restricted to (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.autonomousDatabases.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single Autonomous Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource in the following format: projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.autonomousDatabases.failover`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:failover`
- Initiates a failover to target autonomous database from the associated primary database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FailoverAutonomousDatabaseRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Autonomous Database in the following format: projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}. |

### `oracledatabase.projects.locations.autonomousDatabases.generateWallet`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:generateWallet`
- Generates a wallet for an Autonomous Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateAutonomousDatabaseWalletRequest`; Response: `GenerateAutonomousDatabaseWalletResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Autonomous Database in the following format: projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}. |

### `oracledatabase.projects.locations.autonomousDatabases.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets the details of a single Autonomous Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AutonomousDatabase`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Autonomous Database in the following format: projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}. |

### `oracledatabase.projects.locations.autonomousDatabases.getRefreshableClones`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}:getRefreshableClones`
- Gets the refreshable clones for a given Autonomous Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AutonomousDatabaseRefreshableClones`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Autonomous Database resource whose refreshable clones are to be listed. Format: projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database} |

### `oracledatabase.projects.locations.autonomousDatabases.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/autonomousDatabases`
- Lists the Autonomous Databases in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAutonomousDatabasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the Autonomous Database in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. |
| `orderBy` | query | string | no | Optional. An expression for ordering the results of the request. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 Autonomous Database will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.autonomousDatabases.patch`

- Versions: v1
- `PATCH https://oracledatabase.googleapis.com/v1/{+name}`
- Updates the parameters of a single Autonomous Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AutonomousDatabase`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the Autonomous Database resource in the following format: projects/{project}/locations/{region}/autonomousDatabases/{autonomous_database} |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Exadata resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then the service treats this as an implied field mask equivalent to all fields that are populated (have a non-empty value). To clear or unset a field, the field must be explicitly specified in the `update_mask`. |

### `oracledatabase.projects.locations.autonomousDatabases.refresh`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:refresh`
- Refreshes the refreshable clone of an Autonomous Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RefreshAutonomousDatabaseRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the AutonomousDatabase resource. Format: projects/{project}/location/{location}/autonomousDatabases/{autonomous_database} |

### `oracledatabase.projects.locations.autonomousDatabases.restart`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:restart`
- Restarts an Autonomous Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestartAutonomousDatabaseRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Autonomous Database in the following format: projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}. |

### `oracledatabase.projects.locations.autonomousDatabases.restore`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:restore`
- Restores a single Autonomous Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreAutonomousDatabaseRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Autonomous Database in the following format: projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}. |

### `oracledatabase.projects.locations.autonomousDatabases.start`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:start`
- Starts an Autonomous Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StartAutonomousDatabaseRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Autonomous Database in the following format: projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}. |

### `oracledatabase.projects.locations.autonomousDatabases.stop`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:stop`
- Stops an Autonomous Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StopAutonomousDatabaseRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Autonomous Database in the following format: projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}. |

### `oracledatabase.projects.locations.autonomousDatabases.switchover`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:switchover`
- Initiates a switchover of specified autonomous database to the associated peer database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SwitchoverAutonomousDatabaseRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Autonomous Database in the following format: projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}. |

### `oracledatabase.projects.locations.autonomousDbVersions.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/autonomousDbVersions`
- Lists all the available Autonomous Database versions for a project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAutonomousDbVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the Autonomous Database in the following format: projects/{project}/locations/{location}. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 Autonomous DB Versions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.cloudExadataInfrastructures.configureExascale`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:configureExascale`
- Configures Exascale for a single Exadata Infrastructure.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConfigureExascaleCloudExadataInfrastructureRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Cloud Exadata Infrastructure in the following format: projects/{project}/locations/{location}/cloudExadataInfrastructures/{cloud_exadata_infrastructure}. |

### `oracledatabase.projects.locations.cloudExadataInfrastructures.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/cloudExadataInfrastructures`
- Creates a new Exadata Infrastructure in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CloudExadataInfrastructure`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for CloudExadataInfrastructure in the following format: projects/{project}/locations/{location}. |
| `cloudExadataInfrastructureId` | query | string | yes | Required. The ID of the Exadata Infrastructure to create. This value is restricted to (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.cloudExadataInfrastructures.dbServers.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/dbServers`
- Lists the database servers of an Exadata Infrastructure instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDbServersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for database server in the following format: projects/{project}/locations/{location}/cloudExadataInfrastructures/{cloudExadataInfrastructure}. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, a maximum of 50 db servers will be returned. The maximum value is 1000; values above 1000 will be reset to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.cloudExadataInfrastructures.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single Exadata Infrastructure.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Cloud Exadata Infrastructure in the following format: projects/{project}/locations/{location}/cloudExadataInfrastructures/{cloud_exadata_infrastructure}. |
| `force` | query | boolean | no | Optional. If set to true, all VM clusters for this Exadata Infrastructure will be deleted. An Exadata Infrastructure can only be deleted once all its VM clusters have been deleted. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.cloudExadataInfrastructures.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single Exadata Infrastructure.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CloudExadataInfrastructure`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Cloud Exadata Infrastructure in the following format: projects/{project}/locations/{location}/cloudExadataInfrastructures/{cloud_exadata_infrastructure}. |

### `oracledatabase.projects.locations.cloudExadataInfrastructures.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/cloudExadataInfrastructures`
- Lists Exadata Infrastructures in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCloudExadataInfrastructuresResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for CloudExadataInfrastructure in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. |
| `orderBy` | query | string | no | Optional. An expression for ordering the results of the request. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 Exadata infrastructures will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.cloudExadataInfrastructures.patch`

- Versions: v1
- `PATCH https://oracledatabase.googleapis.com/v1/{+name}`
- Updates the parameters of a single Exadata Infrastructure.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CloudExadataInfrastructure`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the Exadata Infrastructure resource with the format: projects/{project}/locations/{region}/cloudExadataInfrastructures/{cloud_exadata_infrastructure} |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Exadata resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then the service treats this as an implied field mask equivalent to all fields that are populated (have a non-empty value). To clear or unset a field, the field must be explicitly specified in the `update_mask`. |

### `oracledatabase.projects.locations.cloudVmClusters.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/cloudVmClusters`
- Creates a new VM Cluster in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CloudVmCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent in the following format: projects/{project}/locations/{location}. |
| `cloudVmClusterId` | query | string | yes | Required. The ID of the VM Cluster to create. This value is restricted to (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.cloudVmClusters.dbNodes.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/dbNodes`
- Lists the database nodes of a VM Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDbNodesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for database node in the following format: projects/{project}/locations/{location}/cloudVmClusters/{cloudVmCluster}. . |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 db nodes will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the node should return. |

### `oracledatabase.projects.locations.cloudVmClusters.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single VM Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Cloud VM Cluster in the following format: projects/{project}/locations/{location}/cloudVmClusters/{cloud_vm_cluster}. |
| `force` | query | boolean | no | Optional. If set to true, all child resources for the VM Cluster will be deleted. A VM Cluster can only be deleted once all its child resources have been deleted. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.cloudVmClusters.disableIdentityConnector`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:disableIdentityConnector`
- Disables the Workload Identity Connector for a Cloud VM Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DisableCloudVmClusterIdentityConnectorRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Cloud VM Cluster in the following format: projects/{project}/locations/{location}/cloudVmClusters/{cloud_vm_cluster} |

### `oracledatabase.projects.locations.cloudVmClusters.enableIdentityConnector`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:enableIdentityConnector`
- Enables the Workload Identity Connector for a Cloud VM Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnableCloudVmClusterIdentityConnectorRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Cloud VM Cluster in the following format: projects/{project}/locations/{location}/cloudVmClusters/{cloud_vm_cluster} |

### `oracledatabase.projects.locations.cloudVmClusters.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single VM Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CloudVmCluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Cloud VM Cluster in the following format: projects/{project}/locations/{location}/cloudVmClusters/{cloud_vm_cluster}. |

### `oracledatabase.projects.locations.cloudVmClusters.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/cloudVmClusters`
- Lists the VM Clusters in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCloudVmClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. |
| `pageSize` | query | integer (int32) | no | Optional. The number of VM clusters to return. If unspecified, at most 50 VM clusters will be returned. The maximum value is 1,000. |
| `pageToken` | query | string | no | Optional. A token identifying the page of results the server returns. |

### `oracledatabase.projects.locations.cloudVmClusters.patch`

- Versions: v1
- `PATCH https://oracledatabase.googleapis.com/v1/{+name}`
- Updates the parameters of a single Vm Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CloudVmCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the VM Cluster resource with the format: projects/{project}/locations/{region}/cloudVmClusters/{cloud_vm_cluster} |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. A mask specifying which fields in the VM Cluster should be updated. A field specified in the mask is overwritten. If a mask isn't provided, the service treats this as an implied field mask equivalent to all fields that are populated (have a non-empty value). To clear or unset a field, the field must be explicitly specified in the `update_mask`. |

### `oracledatabase.projects.locations.databaseCharacterSets.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/databaseCharacterSets`
- List DatabaseCharacterSets for the given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDatabaseCharacterSetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for DatabaseCharacterSets in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Only the \*\*character_set_type\*\* field is supported in the following format: `character_set_type="{characterSetType}"`. Accepted values include `DATABASE` and `NATIONAL`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of DatabaseCharacterSets to return. The service may return fewer than this value. If unspecified, at most 50 DatabaseCharacterSets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListDatabaseCharacterSets` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDatabaseCharacterSets` must match the call that provided the page token. |

### `oracledatabase.projects.locations.databaseConnections.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/databaseConnections`
- Creates a new DatabaseConnection in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DatabaseConnection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the DatabaseConnection in the following format: projects/{project}/locations/{location}. |
| `databaseConnectionId` | query | string | yes | Required. The ID of the DatabaseConnection to create. This value is restricted to (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.databaseConnections.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single DatabaseConnection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource in the following format: projects/{project}/locations/{location}/databaseConnections/{database_connection}. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.databaseConnections.executeSql`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:executeSql`
- Executes a SQL statement on a DatabaseConnection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExecuteSqlRequest`; Response: `ExecuteSqlResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the DatabaseConnection in the following format: projects/{project}/locations/{location}/databaseConnections/{database_connection}. |

### `oracledatabase.projects.locations.databaseConnections.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single DatabaseConnection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DatabaseConnection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the DatabaseConnection in the following format: projects/{project}/locations/{location}/databaseConnections/{database_connection}. |

### `oracledatabase.projects.locations.databaseConnections.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/databaseConnections`
- Lists DatabaseConnections in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDatabaseConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the DatabaseConnection in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. |
| `orderBy` | query | string | no | Optional. An expression for ordering the results of the request. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 DatabaseConnections will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.databaseConnections.patch`

- Versions: v1
- `PATCH https://oracledatabase.googleapis.com/v1/{+name}`
- Updates the parameters of a single DatabaseConnection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DatabaseConnection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the DatabaseConnection. Format: projects/{project}/locations/{location}/databaseConnections/{database_connection} |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. A mask specifying which fields in the DatabaseConnection should be updated. A field specified in the mask is overwritten. If a mask isn't provided then all the fields in the DatabaseConnection are overwritten. |

### `oracledatabase.projects.locations.databaseConnections.test`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:test`
- Tests connectivity of a DatabaseConnection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestDatabaseConnectionRequest`; Response: `TestDatabaseConnectionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the DatabaseConnection to test. Format: projects/{project}/locations/{location}/databaseConnections/{database_connection} |

### `oracledatabase.projects.locations.databases.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Database`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Database resource in the following format: projects/{project}/locations/{region}/databases/{database} |

### `oracledatabase.projects.locations.databases.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/databases`
- Lists all the Databases for the given project, location and DbSystem.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDatabasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name in the following format: projects/{project}/locations/{region} |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. list for container databases is supported only with a valid dbSystem (full resource name) filter in this format: `dbSystem="projects/{project}/locations/{location}/dbSystems/{dbSystemId}"` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, a maximum of 50 Databases will be returned. The maximum value is 1000; values above 1000 will be reset to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying the requested page of results to return. All fields except the filter should remain the same as in the request that provided this page token. |

### `oracledatabase.projects.locations.dbSystemComputePerformances.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/dbSystemComputePerformances`
- Lists all the DbSystemComputePerformances for the given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDbSystemComputePerformancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListDbSystemComputePerformancesRequest Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Only the `db_system_shape` field is supported in the following format: `db_system_shape="{db_system_shape}"`. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.dbSystemInitialStorageSizes.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/dbSystemInitialStorageSizes`
- Lists all the DbSystemInitialStorageSizes for the given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDbSystemInitialStorageSizesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the DbSystemInitialStorageSize resource with the format: projects/{project}/locations/{location} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, a maximum of 50 DbSystemInitialStorageSizes will be returned. The maximum value is 1000; values above 1000 will be reset to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying the requested page of results to return. All fields except the filter should remain the same as in the request that provided this page token. |

### `oracledatabase.projects.locations.dbSystemShapes.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/dbSystemShapes`
- Lists the database system shapes available for the project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDbSystemShapesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for Database System Shapes in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. The `gcp_oracle_zone_id`, `shape_family`, and `database_edition` fields are supported in the following format: `gcp_oracle_zone_id="{gcp_oracle_zone_id}" AND shape_family="{shape_family}" AND database_edition="{database_edition}"`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 database system shapes will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.dbSystems.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/dbSystems`
- Creates a new DbSystem in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DbSystem`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The value for parent of the DbSystem in the following format: projects/{project}/locations/{location}. |
| `dbSystemId` | query | string | yes | Required. The ID of the DbSystem to create. This value is restricted to (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.dbSystems.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single DbSystem.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the DbSystem in the following format: projects/{project}/locations/{location}/dbSystems/{db_system}. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.dbSystems.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single DbSystem.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DbSystem`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the DbSystem in the following format: projects/{project}/locations/{location}/dbSystems/{db_system}. |

### `oracledatabase.projects.locations.dbSystems.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/dbSystems`
- Lists all the DbSystems for the given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDbSystemsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for DbSystems in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. |
| `orderBy` | query | string | no | Optional. An expression for ordering the results of the request. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 DbSystems will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.dbSystems.patch`

- Versions: v1
- `PATCH https://oracledatabase.googleapis.com/v1/{+name}`
- Updates the `labels` of a single DbSystem.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DbSystem`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the DbSystem resource in the following format: projects/{project}/locations/{region}/dbSystems/{db_system} |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. A mask specifying which fields in the DbSystem should be updated. A field specified in the mask is updated. If a mask isn't provided, the service treats this as an implied field mask equivalent to all fields that are populated (have a non-empty value). |

### `oracledatabase.projects.locations.dbVersions.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/dbVersions`
- List DbVersions for the given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDbVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the DbVersion resource with the format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. Filter expression that matches a subset of the DbVersions to show. The supported filter for dbSystem creation is `db_system_shape = {db_system_shape} AND storage_management = {storage_management}`. If no filter is provided, all DbVersions will be returned. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, a maximum of 50 DbVersions will be returned. The maximum value is 1000; values above 1000 will be reset to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying the requested page of results to return. All fields except the filter should remain the same as in the request that provided this page token. |

### `oracledatabase.projects.locations.entitlements.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/entitlements`
- Lists the entitlements in a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEntitlementsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the entitlement in the following format: projects/{project}/locations/{location}. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, a maximum of 50 entitlements will be returned. The maximum value is 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.exadbVmClusters.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/exadbVmClusters`
- Creates a new Exadb (Exascale) VM Cluster resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExadbVmCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The value for parent of the ExadbVmCluster in the following format: projects/{project}/locations/{location}. |
| `exadbVmClusterId` | query | string | yes | Required. The ID of the ExadbVmCluster to create. This value is restricted to (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.exadbVmClusters.dbNodes.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/dbNodes`
- Lists the database nodes of a VM Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDbNodesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for database node in the following format: projects/{project}/locations/{location}/cloudVmClusters/{cloudVmCluster}. . |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 db nodes will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the node should return. |

### `oracledatabase.projects.locations.exadbVmClusters.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single Exadb (Exascale) VM Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ExadbVmCluster in the following format: projects/{project}/locations/{location}/exadbVmClusters/{exadb_vm_cluster}. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.exadbVmClusters.disableIdentityConnector`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:disableIdentityConnector`
- Disables the Workload Identity Connector for an Exadb VM Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DisableExadbVmClusterIdentityConnectorRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Exadb VM Cluster in the following format: projects/{project}/locations/{location}/exadbVmClusters/{exadb_vm_cluster} |

### `oracledatabase.projects.locations.exadbVmClusters.enableIdentityConnector`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:enableIdentityConnector`
- Enables the Workload Identity Connector for an Exadb VM Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnableExadbVmClusterIdentityConnectorRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Exadb VM Cluster in the following format: projects/{project}/locations/{location}/exadbVmClusters/{exadb_vm_cluster} |

### `oracledatabase.projects.locations.exadbVmClusters.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single Exadb (Exascale) VM Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ExadbVmCluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ExadbVmCluster in the following format: projects/{project}/locations/{location}/exadbVmClusters/{exadb_vm_cluster}. |

### `oracledatabase.projects.locations.exadbVmClusters.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/exadbVmClusters`
- Lists all the Exadb (Exascale) VM Clusters for the given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListExadbVmClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for ExadbVmClusters in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. |
| `orderBy` | query | string | no | Optional. An expression for ordering the results of the request. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 ExadbVmClusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.exadbVmClusters.patch`

- Versions: v1
- `PATCH https://oracledatabase.googleapis.com/v1/{+name}`
- Updates a single Exadb (Exascale) VM Cluster. To add virtual machines to existing exadb vm cluster, only pass the node count.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExadbVmCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the ExadbVmCluster resource in the following format: projects/{project}/locations/{region}/exadbVmClusters/{exadb_vm_cluster} |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. A mask specifying which fields in th VM Cluster should be updated. A field specified in the mask is overwritten. If a mask isn't provided then the service treats this as an implied field mask equivalent to all fields that are populated (have a non-empty value). To clear or unset a field, the field must be explicitly specified in the `update_mask`. |

### `oracledatabase.projects.locations.exadbVmClusters.removeVirtualMachine`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:removeVirtualMachine`
- Removes virtual machines from an existing exadb vm cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RemoveVirtualMachineExadbVmClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ExadbVmCluster in the following format: projects/{project}/locations/{location}/exadbVmClusters/{exadb_vm_cluster}. |

### `oracledatabase.projects.locations.exascaleDbStorageVaults.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/exascaleDbStorageVaults`
- Creates a new ExascaleDB Storage Vault resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExascaleDbStorageVault`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The value for parent of the ExascaleDbStorageVault in the following format: projects/{project}/locations/{location}. |
| `exascaleDbStorageVaultId` | query | string | yes | Required. The ID of the ExascaleDbStorageVault to create. This value is restricted to (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.exascaleDbStorageVaults.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single ExascaleDB Storage Vault.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ExascaleDbStorageVault in the following format: projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault}. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.exascaleDbStorageVaults.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single ExascaleDB Storage Vault.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ExascaleDbStorageVault`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ExascaleDbStorageVault in the following format: projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault}. |

### `oracledatabase.projects.locations.exascaleDbStorageVaults.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/exascaleDbStorageVaults`
- Lists all the ExascaleDB Storage Vaults for the given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListExascaleDbStorageVaultsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for ExascaleDbStorageVault in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Optional. An expression for ordering the results of the request. Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 ExascaleDbStorageVaults will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.exascaleDbStorageVaults.patch`

- Versions: v1
- `PATCH https://oracledatabase.googleapis.com/v1/{+name}`
- Updates the `labels` of a single ExascaleDbStorageVault.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExascaleDbStorageVault`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the ExascaleDbStorageVault. Format: projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault} |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. A mask specifying which fields in the ExascaleDbStorageVault should be updated. A field specified in the mask is updated. If a mask isn't provided, the service treats this as an implied field mask equivalent to all fields that are populated (have a non-empty value). To clear or unset a field, the field must be explicitly specified in the `update_mask`. |

### `oracledatabase.projects.locations.flexComponents.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/flexComponents`
- Lists Flex Components in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListFlexComponentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListFlexComponentsRequest Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Only the `shape` field is supported in the following format: `shape="{shape}"`. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `oracledatabase.projects.locations.giVersions.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/giVersions`
- Lists all the valid Oracle Grid Infrastructure (GI) versions for the given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGiVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for Grid Infrastructure Version in the following format: Format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Only the `shape` and `gcp_oracle_zone_id` fields are supported in the following format: `shape="{shape}" AND gcp_oracle_zone_id="{gcp_oracle_zone_id}"`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, a maximum of 50 Oracle Grid Infrastructure (GI) versions will be returned. The maximum value is 1000; values above 1000 will be reset to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.giVersions.minorVersions.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/minorVersions`
- Lists all the valid minor versions for the given project, location, gi version and shape family.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMinorVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the MinorVersion resource with the format: projects/{project}/locations/{location}/giVersions/{gi_version} |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Only the `shape_family` and `gcp_oracle_zone_id` fields are supported in the following format: `shape_family="{shape_family}" AND gcp_oracle_zone_id="{gcp_oracle_zone_id}"`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, a maximum of 50 System Versions will be returned. The maximum value is 1000; values above 1000 will be reset to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying the requested page of results to return. All fields except the filter should remain the same as in the request that provided this page token. |

### `oracledatabase.projects.locations.goldengateConnectionAssignments.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/goldengateConnectionAssignments`
- Creates a new GoldengateConnectionAssignment in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoldengateConnectionAssignment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this GoldengateConnectionAssignment will be created. Format: projects/{project}/locations/{location} |
| `goldengateConnectionAssignmentId` | query | string | yes | Required. The ID of the GoldengateConnectionAssignment to create. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.goldengateConnectionAssignments.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single GoldengateConnectionAssignment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the GoldengateConnectionAssignment to delete. Format: projects/{project}/locations/{location}/goldengateConnectionAssignments/{goldengate_connection_assignment} |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.goldengateConnectionAssignments.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single GoldengateConnectionAssignment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoldengateConnectionAssignment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the GoldengateConnectionAssignment to retrieve. Format: projects/{project}/locations/{location}/goldengateConnectionAssignments/{goldengate_connection_assignment} |

### `oracledatabase.projects.locations.goldengateConnectionAssignments.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/goldengateConnectionAssignments`
- Lists GoldengateConnectionAssignments in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGoldengateConnectionAssignmentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the GoldengateConnectionAssignments. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. A filter expression that filters GoldengateConnectionAssignments listed in the response. |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields to order by, sorted in ascending order. Use "DESC" after a field name for descending. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of GoldengateConnectionAssignments to return. The service may return fewer than this value. If unspecified, at most 50 GoldengateConnectionAssignments will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListGoldengateConnectionAssignments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListGoldengateConnectionAssignments` must match the call that provided the page token. |

### `oracledatabase.projects.locations.goldengateConnectionAssignments.patch`

- Versions: v1
- `PATCH https://oracledatabase.googleapis.com/v1/{+name}`
- Updates the `labels` of a single GoldengateConnectionAssignment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoldengateConnectionAssignment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the GoldengateConnectionAssignment resource in the following format: projects/{project}/locations/{region}/goldengateConnectionAssignments/{goldengate_connection_assignment} |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. A mask specifying which fields in the GoldengateConnectionAssignment should be updated. A field specified in the mask is updated. If a mask isn't provided, the service treats this as an implied field mask equivalent to all fields that are populated (have a non-empty value). To clear or unset a field, the field must be explicitly specified in the `update_mask`. |

### `oracledatabase.projects.locations.goldengateConnectionAssignments.test`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:test`
- Tests a single GoldengateConnectionAssignment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestGoldengateConnectionAssignmentRequest`; Response: `TestGoldengateConnectionAssignmentResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the connection assignment for which to test connection. projects/{project}/locations/{region}/goldengateConnectionAssignments/{goldengate_connection_assignment} |

### `oracledatabase.projects.locations.goldengateConnectionTypes.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/goldengateConnectionTypes`
- Lists GoldengateConnectionTypes in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGoldengateConnectionTypesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListGoldengateConnectionTypesRequest Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. The connection_type field must be specified in the format: `connection_type="ORACLE"`. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.goldengateConnections.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/goldengateConnections`
- Creates a new GoldengateConnection in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoldengateConnection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The value for parent of the GoldengateConnection in the following format: projects/{project}/locations/{location}. |
| `goldengateConnectionId` | query | string | yes | Required. The ID of the GoldengateConnection to create. This value is restricted to (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.goldengateConnections.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single GoldengateConnection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the GoldengateConnection in the following format: projects/{project}/locations/{location}/goldengateConnections/{goldengate_connection}. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.goldengateConnections.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single GoldengateConnection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoldengateConnection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the GoldengateConnection in the following format: projects/{project}/locations/{location}/goldengateConnections/{goldengate_connection}. |

### `oracledatabase.projects.locations.goldengateConnections.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/goldengateConnections`
- Lists all the GoldengateConnections for the given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGoldengateConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for GoldengateConnections in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. |
| `orderBy` | query | string | no | Optional. An expression for ordering the results of the request. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 GoldengateConnections will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous ListGoldengateConnections call. Provide this to retrieve the subsequent page. |

### `oracledatabase.projects.locations.goldengateConnections.patch`

- Versions: v1
- `PATCH https://oracledatabase.googleapis.com/v1/{+name}`
- Updates the `labels` of a single GoldengateConnection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoldengateConnection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the GoldengateConnection resource in the following format: projects/{project}/locations/{region}/goldengateConnections/{goldengate_connection} |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. A mask specifying which fields in the GoldengateConnection should be updated. A field specified in the mask is updated. If a mask isn't provided, the service treats this as an implied field mask equivalent to all fields that are populated (have a non-empty value). To clear or unset a field, the field must be explicitly specified in the `update_mask`. |

### `oracledatabase.projects.locations.goldengateDeploymentEnvironments.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/goldengateDeploymentEnvironments`
- Lists GoldengateDeploymentEnvironments in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGoldengateDeploymentEnvironmentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of GoldengateDeploymentEnvironments. Format: projects/{project}/locations/{location} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 deployment environments will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.goldengateDeploymentTypes.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/goldengateDeploymentTypes`
- Lists GoldenGateDeploymentTypes in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGoldengateDeploymentTypesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Either the deployment_type and ogg_version fields must be specified in the format: `deployment_type="DATABASE_ORACLE"` or `ogg_version="version"`. Allowed values for deployment_type are: `DATABASE_ORACLE`, `BIGDATA`, `DATABASE_MICROSOFT_SQLSERVER`, `DATABASE_MYSQL`, `DATABASE_POSTGRESQL`, `DATABASE_DB2ZOS`, `DATABASE_DB2I`, `GGSA`, `DATA_TRANSFORMS`. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.goldengateDeploymentVersions.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/goldengateDeploymentVersions`
- Lists GoldengateDeploymentVersions in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGoldengateDeploymentVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListGoldengateDeploymentVersionsRequest Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. Either the deployment_id and deployment_type fields must be specified in the format: `deployment_id="id"` or `deployment_type="DATABASE_ORACLE"`. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.goldengateDeployments.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/goldengateDeployments`
- Creates a new GoldengateDeployment in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoldengateDeployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The value for parent of the GoldengateDeployment in the following format: projects/{project}/locations/{location}. |
| `goldengateDeploymentId` | query | string | yes | Required. The ID of the GoldengateDeployment to create. This value is restricted to (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.goldengateDeployments.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single GoldengateDeployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the GoldengateDeployment in the following format: projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment}. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.goldengateDeployments.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single GoldengateDeployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoldengateDeployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the GoldengateDeployment in the following format: projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment}. |

### `oracledatabase.projects.locations.goldengateDeployments.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/goldengateDeployments`
- Lists all the GoldengateDeployments for the given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGoldengateDeploymentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for GoldengateDeployments in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. |
| `orderBy` | query | string | no | Optional. An expression for ordering the results of the request. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 GoldengateDeployments will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous ListGoldengateDeployments call. Provide this to retrieve the subsequent page. |

### `oracledatabase.projects.locations.goldengateDeployments.patch`

- Versions: v1
- `PATCH https://oracledatabase.googleapis.com/v1/{+name}`
- Updates the `labels` of a single GoldengateDeployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoldengateDeployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the GoldengateDeployment resource in the following format: projects/{project}/locations/{region}/goldengateDeployments/{goldengate_deployment} |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. A mask specifying which fields in the GoldengateDeployment should be updated. A field specified in the mask is updated. If a mask isn't provided, the service treats this as an implied field mask equivalent to all fields that are populated (have a non-empty value). To clear or unset a field, the field must be explicitly specified in the `update_mask`. |

### `oracledatabase.projects.locations.goldengateDeployments.start`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:start`
- Starts a single GoldengateDeployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StartGoldengateDeploymentRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Goldengate Deployment in the following format: projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment}. |

### `oracledatabase.projects.locations.goldengateDeployments.stop`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:stop`
- Stops a single GoldengateDeployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StopGoldengateDeploymentRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Goldengate Deployment in the following format: projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment}. |

### `oracledatabase.projects.locations.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}/locations`
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

### `oracledatabase.projects.locations.odbNetworks.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/odbNetworks`
- Creates a new ODB Network in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `OdbNetwork`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the OdbNetwork in the following format: projects/{project}/locations/{location}. |
| `odbNetworkId` | query | string | yes | Required. The ID of the OdbNetwork to create. This value is restricted to (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.odbNetworks.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single ODB Network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource in the following format: projects/{project}/locations/{location}/odbNetworks/{odb_network}. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.odbNetworks.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single ODB Network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `OdbNetwork`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the OdbNetwork in the following format: projects/{project}/locations/{location}/odbNetworks/{odb_network}. |

### `oracledatabase.projects.locations.odbNetworks.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/odbNetworks`
- Lists the ODB Networks in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOdbNetworksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the ODB Network in the following format: projects/{project}/locations/{location}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. |
| `orderBy` | query | string | no | Optional. An expression for ordering the results of the request. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 ODB Networks will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.odbNetworks.odbDnsZones.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/odbDnsZones`
- Creates a new ODB DNS Zone in a given ODB Network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `OdbDnsZone`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the OdbDnsZone in the following format: projects/{project}/locations/{location}/odbNetworks/{odb_network}. |
| `odbDnsZoneId` | query | string | yes | Required. The ID of the OdbDnsZone to create. This value is restricted to (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.odbNetworks.odbDnsZones.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single ODB DNS Zone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource in the following format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbDnsZones/{odb_dns_zone}. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.odbNetworks.odbDnsZones.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single ODB DNS Zone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `OdbDnsZone`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the OdbDnsZone in the following format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbDnsZones/{odb_dns_zone}. |

### `oracledatabase.projects.locations.odbNetworks.odbDnsZones.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/odbDnsZones`
- Lists all the ODB DNS Zones in a given ODB Network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOdbDnsZonesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the OdbDnsZone in the following format: projects/{project}/locations/{location}/odbNetworks/{odb_network}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. |
| `orderBy` | query | string | no | Optional. An expression for ordering the results of the request. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 OdbDnsZones will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.odbNetworks.odbSubnets.create`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+parent}/odbSubnets`
- Creates a new ODB Subnet in a given ODB Network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `OdbSubnet`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the OdbSubnet in the following format: projects/{project}/locations/{location}/odbNetworks/{odb_network}. |
| `odbSubnetId` | query | string | yes | Required. The ID of the OdbSubnet to create. This value is restricted to (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.odbNetworks.odbSubnets.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a single ODB Subnet.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource in the following format: projects/{project}/locations/{region}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}. |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `oracledatabase.projects.locations.odbNetworks.odbSubnets.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single ODB Subnet.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `OdbSubnet`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the OdbSubnet in the following format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}. |

### `oracledatabase.projects.locations.odbNetworks.odbSubnets.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/odbSubnets`
- Lists all the ODB Subnets in a given ODB Network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOdbSubnetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for the OdbSubnet in the following format: projects/{project}/locations/{location}/odbNetworks/{odb_network}. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. |
| `orderBy` | query | string | no | Optional. An expression for ordering the results of the request. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If unspecified, at most 50 ODB Networks will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `oracledatabase.projects.locations.odbNetworks.odbSubnets.patch`

- Versions: v1
- `PATCH https://oracledatabase.googleapis.com/v1/{+name}`
- Updates the `labels` of a single ODB Subnet.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `OdbSubnet`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the OdbSubnet resource in the following format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet} |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. A mask specifying which fields in the OdbSubnet should be updated. A field specified in the mask is updated. If a mask isn't provided, the service treats this as an implied field mask equivalent to all fields that are populated (have a non-empty value). To clear or unset a field, the field must be explicitly specified in the `update_mask`. |

### `oracledatabase.projects.locations.odbNetworks.patch`

- Versions: v1
- `PATCH https://oracledatabase.googleapis.com/v1/{+name}`
- Updates the `labels` and `service_connectivity_config` of a single OdbNetwork.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `OdbNetwork`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the OdbNetwork resource in the following format: projects/{project}/locations/{region}/odbNetworks/{odb_network} |
| `requestId` | query | string | no | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. A mask specifying which fields in the OdbNetwork should be updated. A field specified in the mask is updated. If a mask isn't provided, the service treats this as an implied field mask equivalent to all fields that are populated (have a non-empty value). To clear or unset a field, the field must be explicitly specified in the `update_mask`. |

### `oracledatabase.projects.locations.operations.cancel`

- Versions: v1
- `POST https://oracledatabase.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `oracledatabase.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://oracledatabase.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `oracledatabase.projects.locations.operations.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `oracledatabase.projects.locations.operations.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}/operations`
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

### `oracledatabase.projects.locations.pluggableDatabases.get`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+name}`
- Gets details of a single PluggableDatabase.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PluggableDatabase`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the PluggableDatabase resource in the following format: projects/{project}/locations/{region}/pluggableDatabases/{pluggable_database} |

### `oracledatabase.projects.locations.pluggableDatabases.list`

- Versions: v1
- `GET https://oracledatabase.googleapis.com/v1/{+parent}/pluggableDatabases`
- Lists all the PluggableDatabases for the given project, location and Container Database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPluggableDatabasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of PluggableDatabases. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. An expression for filtering the results of the request. List for pluggable databases is supported only with a valid container database (full resource name) filter in this format: `database="projects/{project}/locations/{location}/databases/{database}"` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of PluggableDatabases to return. The service may return fewer than this value. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListPluggableDatabases` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPluggableDatabases` must match the call that provided the page token. |

### Example request skeleton

Generated from the Discovery entry of `oracledatabase.projects.locations.autonomousDatabaseBackups.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://oracledatabase.googleapis.com/v1/{+parent}/autonomousDatabaseBackups"
```

## Notes

- Generated from the Discovery document(s) v1 of `oracledatabase` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/oracledatabase/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`oracledatabase` v1, revision 20261104) also lists 6 endpoints of the form `https://oracledatabase.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `asia-northeast2`, `asia-south1`, `asia-south2`, `australia-southeast2`, `europe-west8`, `northamerica-northeast2`. The method URLs above use the global host `https://oracledatabase.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://oracledatabase.asia-northeast2.rep.googleapis.com/`) and keep the path.
- Corrected from the official docs (the Discovery text above is verbatim): the `name` of `oracledatabase.projects.locations.autonomousDatabases.refresh` is described as `projects/{project}/location/{location}/autonomousDatabases/{autonomous_database}`; the Discovery path pattern is `projects/[^/]+/locations/[^/]+/autonomousDatabases/[^/]+` (`locations`, plural).
- Corrected from the official docs (the Discovery text above is verbatim): the `parent` of `oracledatabase.projects.locations.exadbVmClusters.dbNodes.list` repeats the `cloudVmClusters` format of `cloudVmClusters.dbNodes.list`; its Discovery path pattern is `projects/[^/]+/locations/[^/]+/exadbVmClusters/[^/]+`, so use `projects/{project}/locations/{location}/exadbVmClusters/{exadbVmCluster}`.
- Source: https://oracledatabase.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
