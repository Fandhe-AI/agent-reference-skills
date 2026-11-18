---
source: https://baremetalsolution.googleapis.com/$discovery/rest?version=v2
---

# Bare Metal Solution API REST API (baremetalsolution)

## Signature / Usage

Base URL: `https://baremetalsolution.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `baremetalsolution.projects.locations.get`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `baremetalsolution.projects.locations.instances.detachLun`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+instance}:detachLun`
- Detach LUN from Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DetachLunRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `instance` | path | string | yes | Required. Name of the instance. |

### `baremetalsolution.projects.locations.instances.disableHyperthreading`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:disableHyperthreading`
- Perform disable hyperthreading operation on a single server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DisableHyperthreadingRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` field is used to identify the instance. Format: projects/{project}/locations/{location}/instances/{instance} |

### `baremetalsolution.projects.locations.instances.disableInteractiveSerialConsole`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:disableInteractiveSerialConsole`
- Disable the interactive serial console feature on an instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DisableInteractiveSerialConsoleRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `baremetalsolution.projects.locations.instances.enableHyperthreading`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:enableHyperthreading`
- Perform enable hyperthreading operation on a single server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnableHyperthreadingRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` field is used to identify the instance. Format: projects/{project}/locations/{location}/instances/{instance} |

### `baremetalsolution.projects.locations.instances.enableInteractiveSerialConsole`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:enableInteractiveSerialConsole`
- Enable the interactive serial console feature on an instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnableInteractiveSerialConsoleRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `baremetalsolution.projects.locations.instances.get`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+name}`
- Get details about a single server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `baremetalsolution.projects.locations.instances.list`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+parent}/instances`
- List servers in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListInstancesRequest. |
| `filter` | query | string | no | List filter. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results from the server. |

### `baremetalsolution.projects.locations.instances.loadAuthInfo`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+name}:loadAuthInfo`
- Load auth info for a server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LoadInstanceAuthInfoResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the server. |

### `baremetalsolution.projects.locations.instances.patch`

- Versions: v2
- `PATCH https://baremetalsolution.googleapis.com/v2/{+name}`
- Update details of a single server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Instance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The resource name of this `Instance`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. Format: `projects/{project}/locations/{location}/instances/{instance}` |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to update. The currently supported fields are: `labels` `hyperthreading_enabled` `os_image` `ssh_keys` `kms_key_version` |

### `baremetalsolution.projects.locations.instances.reimage`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:reimage`
- Perform reimage operation on a single server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReimageInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` field is used to identify the instance. Format: projects/{project}/locations/{location}/instances/{instance} |

### `baremetalsolution.projects.locations.instances.rename`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:rename`
- RenameInstance sets a new name for an instance. Use with caution, previous names become immediately invalidated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RenameInstanceRequest`; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` field is used to identify the instance. Format: projects/{project}/locations/{location}/instances/{instance} |

### `baremetalsolution.projects.locations.instances.reset`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:reset`
- Perform an ungraceful, hard reset on a server. Equivalent to shutting the power off and then turning it back on.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResetInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `baremetalsolution.projects.locations.instances.start`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:start`
- Starts a server that was shutdown.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StartInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `baremetalsolution.projects.locations.instances.stop`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:stop`
- Stop a running server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StopInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `baremetalsolution.projects.locations.list`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+name}/locations`
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

### `baremetalsolution.projects.locations.networks.get`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+name}`
- Get details of a single network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Network`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `baremetalsolution.projects.locations.networks.list`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+parent}/networks`
- List network in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNetworksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListNetworksRequest. |
| `filter` | query | string | no | List filter. |
| `pageSize` | query | integer (int32) | no | Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results from the server. |

### `baremetalsolution.projects.locations.networks.listNetworkUsage`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+location}/networks:listNetworkUsage`
- List all Networks (and used IPs for each Network) in the vendor account associated with the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNetworkUsageResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. Parent value (project and location). |

### `baremetalsolution.projects.locations.networks.patch`

- Versions: v2
- `PATCH https://baremetalsolution.googleapis.com/v2/{+name}`
- Update details of a single network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Network`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of this `Network`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. Format: `projects/{project}/locations/{location}/networks/{network}` |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to update. The only currently supported fields are: `labels`, `reservations`, `vrf.vlan_attachments` |

### `baremetalsolution.projects.locations.networks.rename`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:rename`
- RenameNetwork sets a new name for a network. Use with caution, previous names become immediately invalidated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RenameNetworkRequest`; Response: `Network`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` field is used to identify the network. Format: projects/{project}/locations/{location}/networks/{network} |

### `baremetalsolution.projects.locations.nfsShares.create`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+parent}/nfsShares`
- Create an NFS share.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `NfsShare`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent project and location. |

### `baremetalsolution.projects.locations.nfsShares.delete`

- Versions: v2
- `DELETE https://baremetalsolution.googleapis.com/v2/{+name}`
- Delete an NFS share. The underlying volume is automatically deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the NFS share to delete. |

### `baremetalsolution.projects.locations.nfsShares.get`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+name}`
- Get details of a single NFS share.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `NfsShare`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `baremetalsolution.projects.locations.nfsShares.list`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+parent}/nfsShares`
- List NFS shares.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNfsSharesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListNfsSharesRequest. |
| `filter` | query | string | no | List filter. |
| `pageSize` | query | integer (int32) | no | Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results from the server. |

### `baremetalsolution.projects.locations.nfsShares.patch`

- Versions: v2
- `PATCH https://baremetalsolution.googleapis.com/v2/{+name}`
- Update details of a single NFS share.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `NfsShare`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The name of the NFS share. |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to update. The only currently supported fields are: `labels` `allowed_clients` |

### `baremetalsolution.projects.locations.nfsShares.rename`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:rename`
- RenameNfsShare sets a new name for an nfsshare. Use with caution, previous names become immediately invalidated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RenameNfsShareRequest`; Response: `NfsShare`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` field is used to identify the nfsshare. Format: projects/{project}/locations/{location}/nfsshares/{nfsshare} |

### `baremetalsolution.projects.locations.operations.get`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+name}`
- Get details about an operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `baremetalsolution.projects.locations.osImages.get`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+name}`
- Get details of a single OS image.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `OSImage`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the OS image. |

### `baremetalsolution.projects.locations.osImages.list`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+parent}/osImages`
- Retrieves the list of OS images which are currently approved.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOSImagesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListOSImagesRequest. |
| `pageSize` | query | integer (int32) | no | Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. Notice that page_size field is not supported and won't be respected in the API request for now, will be updated when pagination is supported. |
| `pageToken` | query | string | no | A token identifying a page of results from the server. |

### `baremetalsolution.projects.locations.provisioningConfigs.create`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+parent}/provisioningConfigs`
- Create new ProvisioningConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ProvisioningConfig`; Response: `ProvisioningConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent project and location containing the ProvisioningConfig. |
| `email` | query | string | no | Optional. Email provided to send a confirmation with provisioning config to. |

### `baremetalsolution.projects.locations.provisioningConfigs.get`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+name}`
- Get ProvisioningConfig by name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ProvisioningConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the ProvisioningConfig. |

### `baremetalsolution.projects.locations.provisioningConfigs.patch`

- Versions: v2
- `PATCH https://baremetalsolution.googleapis.com/v2/{+name}`
- Update existing ProvisioningConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ProvisioningConfig`; Response: `ProvisioningConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The system-generated name of the provisioning config. This follows the UUID format. |
| `email` | query | string | no | Optional. Email provided to send a confirmation with provisioning config to. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. |

### `baremetalsolution.projects.locations.provisioningConfigs.submit`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+parent}/provisioningConfigs:submit`
- Submit a provisioning configuration for a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SubmitProvisioningConfigRequest`; Response: `SubmitProvisioningConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent project and location containing the ProvisioningConfig. |

### `baremetalsolution.projects.locations.provisioningQuotas.list`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+parent}/provisioningQuotas`
- List the budget details to provision resources on a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListProvisioningQuotasResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListProvisioningQuotasRequest. |
| `pageSize` | query | integer (int32) | no | Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. Notice that page_size field is not supported and won't be respected in the API request for now, will be updated when pagination is supported. |
| `pageToken` | query | string | no | A token identifying a page of results from the server. |

### `baremetalsolution.projects.locations.sshKeys.create`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+parent}/sshKeys`
- Register a public SSH key in the specified project for use with the interactive serial console feature.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SSHKey`; Response: `SSHKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent containing the SSH keys. |
| `sshKeyId` | query | string | yes | Required. The ID to use for the key, which will become the final component of the key's resource name. This value must match the regex: \[a-zA-Z0-9@.\-\_\]{1,64} |

### `baremetalsolution.projects.locations.sshKeys.delete`

- Versions: v2
- `DELETE https://baremetalsolution.googleapis.com/v2/{+name}`
- Deletes a public SSH key registered in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the SSH key to delete. Currently, the only valid value for the location is "global". |

### `baremetalsolution.projects.locations.sshKeys.list`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+parent}/sshKeys`
- Lists the public SSH keys registered for the specified project. These SSH keys are used only for the interactive serial console feature.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSSHKeysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent containing the SSH keys. Currently, the only valid value for the location is "global". |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### `baremetalsolution.projects.locations.volumes.evict`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:evict`
- Skips volume's cooloff and deletes it now. Volume must be in cooloff state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EvictVolumeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Volume. |

### `baremetalsolution.projects.locations.volumes.get`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+name}`
- Get details of a single storage volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Volume`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `baremetalsolution.projects.locations.volumes.list`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+parent}/volumes`
- List storage volumes in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVolumesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListVolumesRequest. |
| `filter` | query | string | no | List filter. |
| `pageSize` | query | integer (int32) | no | Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results from the server. |

### `baremetalsolution.projects.locations.volumes.luns.evict`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:evict`
- Skips lun's cooloff and deletes it now. Lun must be in cooloff state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EvictLunRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the lun. |

### `baremetalsolution.projects.locations.volumes.luns.get`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+name}`
- Get details of a single storage logical unit number(LUN).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Lun`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `baremetalsolution.projects.locations.volumes.luns.list`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+parent}/luns`
- List storage volume luns for given storage volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLunsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListLunsRequest. |
| `pageSize` | query | integer (int32) | no | Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results from the server. |

### `baremetalsolution.projects.locations.volumes.patch`

- Versions: v2
- `PATCH https://baremetalsolution.googleapis.com/v2/{+name}`
- Update details of a single storage volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Volume`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of this `Volume`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. Format: `projects/{project}/locations/{location}/volumes/{volume}` |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to update. The only currently supported fields are: 'labels' |

### `baremetalsolution.projects.locations.volumes.rename`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+name}:rename`
- RenameVolume sets a new name for a volume. Use with caution, previous names become immediately invalidated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RenameVolumeRequest`; Response: `Volume`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` field is used to identify the volume. Format: projects/{project}/locations/{location}/volumes/{volume} |

### `baremetalsolution.projects.locations.volumes.resize`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+volume}:resize`
- Emergency Volume resize.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResizeVolumeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `volume` | path | string | yes | Required. Volume to resize. |

### `baremetalsolution.projects.locations.volumes.snapshots.create`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+parent}/snapshots`
- Takes a snapshot of a boot volume. Returns INVALID_ARGUMENT if called for a non-boot volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VolumeSnapshot`; Response: `VolumeSnapshot`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The volume to snapshot. |

### `baremetalsolution.projects.locations.volumes.snapshots.delete`

- Versions: v2
- `DELETE https://baremetalsolution.googleapis.com/v2/{+name}`
- Deletes a volume snapshot. Returns INVALID_ARGUMENT if called for a non-boot volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the snapshot to delete. |

### `baremetalsolution.projects.locations.volumes.snapshots.get`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+name}`
- Returns the specified snapshot resource. Returns INVALID_ARGUMENT if called for a non-boot volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `VolumeSnapshot`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the snapshot. |

### `baremetalsolution.projects.locations.volumes.snapshots.list`

- Versions: v2
- `GET https://baremetalsolution.googleapis.com/v2/{+parent}/snapshots`
- Retrieves the list of snapshots for the specified volume. Returns a response with an empty list of snapshots if called for a non-boot volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVolumeSnapshotsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListVolumesRequest. |
| `pageSize` | query | integer (int32) | no | Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results from the server. |

### `baremetalsolution.projects.locations.volumes.snapshots.restoreVolumeSnapshot`

- Versions: v2
- `POST https://baremetalsolution.googleapis.com/v2/{+volumeSnapshot}:restoreVolumeSnapshot`
- Uses the specified snapshot to restore its parent volume. Returns INVALID_ARGUMENT if called for a non-boot volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreVolumeSnapshotRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `volumeSnapshot` | path | string | yes | Required. Name of the snapshot which will be used to restore its parent volume. |

### Example request skeleton

Generated from the Discovery entry of `baremetalsolution.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://baremetalsolution.googleapis.com/v2/{+name}"
```

## Notes

- Generated from the Discovery document(s) v2 of `baremetalsolution` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/baremetalsolution/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the Discovery document: the description of `name` in `baremetalsolution.projects.locations.nfsShares.rename` gives the resource name format `projects/{project}/locations/{location}/nfsshares/{nfsshare}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/nfsShares/[^/]+$`; a value must match the pattern to reach the route.
- Source: https://baremetalsolution.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
