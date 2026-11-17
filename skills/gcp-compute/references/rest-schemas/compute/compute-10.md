---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 10/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `RegionAutoscalerList`

- Contains a list of autoscalers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Autoscaler> | A list of Autoscaler resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `RegionCommitmentsUpdateReservationsRequest`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `reservations` | array<Reservation> | A list of two reservations to transfer GPUs and Local SSD disks between. |

### `RegionDiskTypeList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<DiskType> | A list of DiskType resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#regionDiskTypeList for region disk types. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `RegionDiskUpdateKmsKeyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. The new KMS key to replace the current one on the disk. If empty, the disk will be re-encrypted using the primary version of the disk's current KMS key. The KMS key can be provided in the following formats: - projects/project_id/locations/location/keyRings/key_ring/cryptoKeys/key Where project is the project ID or project number. |

### `RegionDisksAddResourcePoliciesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourcePolicies` | array<string> | Resource policies to be added to this disk. |

### `RegionDisksRemoveResourcePoliciesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourcePolicies` | array<string> | Resource policies to be removed from this disk. |

### `RegionDisksResizeRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sizeGb` | string (int64) | The new size of the regional persistent disk, which is specified in GB. |

### `RegionDisksStartAsyncReplicationRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asyncSecondaryDisk` | string | The secondary disk to start asynchronous replication to. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - https://www.googleapis.com/compute/v1/projects/project/regions/region/disks/disk - projects/project/zones/zone/disks/disk - projects/project/regions/region/disks/disk - zones/zone/disks/disk - regions/region/disks/disk |

### `RegionInstanceGroupList`

- Contains a list of InstanceGroup resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InstanceGroup> | A list of InstanceGroup resources. |
| `kind` | string | Output only. The resource type. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | Output only. \[Output Only\] Informational warning message. |

### `RegionInstanceGroupManagerDeleteInstanceConfigReq`

- RegionInstanceGroupManagers.deletePerInstanceConfigs
- Version: v1

| Field | Type | Description |
|---|---|---|
| `names` | array<string> | The list of instance names for which we want to delete per-instance configs on this managed instance group. |

### `RegionInstanceGroupManagerList`

- Contains a list of managed instance groups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. Unique identifier for the resource; defined by the server. |
| `items` | array<InstanceGroupManager> | A list of InstanceGroupManager resources. |
| `kind` | string | Output only. The resource type, which is always compute#instanceGroupManagerList for a list of managed instance groups that exist in th regional scope. |
| `nextPageToken` | string | Output only. This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. Server-defined URL for this resource. |
| `warning` | object | Output only. Informational warning message. |

### `RegionInstanceGroupManagerPatchInstanceConfigReq`

- RegionInstanceGroupManagers.patchPerInstanceConfigs
- Version: v1

| Field | Type | Description |
|---|---|---|
| `perInstanceConfigs` | array<PerInstanceConfig> | The list of per-instance configurations to insert or patch on this managed instance group. |

### `RegionInstanceGroupManagerResizeRequestsListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | Output only. Unique identifier for the resource; defined by the server. |
| `items` | array<InstanceGroupManagerResizeRequest> | A list of Resize Request resources. |
| `kind` | string | Output only. Type of the resource. Alwayscompute#regionInstanceGroupManagerResizeRequestList for a list of Resize Requests. |
| `nextPageToken` | string | Output only. This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | Output only. Informational warning message. |

### `RegionInstanceGroupManagerUpdateInstanceConfigReq`

- RegionInstanceGroupManagers.updatePerInstanceConfigs
- Version: v1

| Field | Type | Description |
|---|---|---|
| `perInstanceConfigs` | array<PerInstanceConfig> | The list of per-instance configurations to insert or patch on this managed instance group. |

### `RegionInstanceGroupManagersAbandonInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<string> | The URLs of one or more instances to abandon. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |

### `RegionInstanceGroupManagersAdoptInstancesRequest`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `instances` | array<PerInstanceConfig> | The list of per-instance configs specifying instances to adopt. |

### `RegionInstanceGroupManagersApplyUpdatesRequest`

- RegionInstanceGroupManagers.applyUpdatesToInstances
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allInstances` | boolean | Flag to update all instances instead of specified list of "instances". If the flag is set to true then the instances may not be specified in the request. |
| `instances` | array<string> | The list of URLs of one or more instances for which you want to apply updates. Each URL can be a full URL or a partial URL, such aszones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |
| `minimalAction` | string enum | The minimal action that you want to perform on each instance during the update: - REPLACE: At minimum, delete the instance and create it again. - RESTART: Stop the instance and start it again. - REFRESH: Do not stop the instance and limit disruption as much as possible. - NONE: Do not disrupt the instance at all. By default, the minimum action is NONE. If your update requires a more disruptive action than you set with this flag, the necessary action is performed to execute the update. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`. |
| `mostDisruptiveAllowedAction` | string enum | The most disruptive action that you want to perform on each instance during the update: - REPLACE: Delete the instance and create it again. - RESTART: Stop the instance and start it again. - REFRESH: Do not stop the instance and limit disruption as much as possible. - NONE: Do not disrupt the instance at all. By default, the most disruptive allowed action is REPLACE. If your update requires a more disruptive action than you set with this flag, the update request will fail. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`. |

### `RegionInstanceGroupManagersApplyUpdatesRequest` (alpha)

- RegionInstanceGroupManagers.applyUpdatesToInstances
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `allInstances` | boolean | Flag to update all instances instead of specified list of "instances". If the flag is set to true then the instances may not be specified in the request. |
| `allowedActions` | array<string> | Actions that are allowed to update instances within MIG. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `instances` | array<string> | The list of URLs of one or more instances for which you want to apply updates. Each URL can be a full URL or a partial URL, such aszones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |
| `maximalAction` | string enum | The maximal action that should be performed on the instances. By default REPLACE. This field is deprecated, please use most_disruptive_allowed_action. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `minimalAction` | string enum | The minimal action that you want to perform on each instance during the update: - REPLACE: At minimum, delete the instance and create it again. - RESTART: Stop the instance and start it again. - REFRESH: Do not stop the instance and limit disruption as much as possible. - NONE: Do not disrupt the instance at all. By default, the minimum action is NONE. If your update requires a more disruptive action than you set with this flag, the necessary action is performed to execute the update. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `mostDisruptiveAllowedAction` | string enum | The most disruptive action that you want to perform on each instance during the update: - REPLACE: Delete the instance and create it again. - RESTART: Stop the instance and start it again. - REFRESH: Do not stop the instance and limit disruption as much as possible. - NONE: Do not disrupt the instance at all. By default, the most disruptive allowed action is REPLACE. If your update requires a more disruptive action than you set with this flag, the update request will fail. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |

### `RegionInstanceGroupManagersApplyUpdatesRequest` (preview)

- RegionInstanceGroupManagers.applyUpdatesToInstances
- Version: preview

| Field | Type | Description |
|---|---|---|
| `allInstances` | boolean | Flag to update all instances instead of specified list of "instances". If the flag is set to true then the instances may not be specified in the request. |
| `allowedActions` | array<string> | Actions that are allowed to update instances within MIG. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `instances` | array<string> | The list of URLs of one or more instances for which you want to apply updates. Each URL can be a full URL or a partial URL, such aszones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |
| `minimalAction` | string enum | The minimal action that you want to perform on each instance during the update: - REPLACE: At minimum, delete the instance and create it again. - RESTART: Stop the instance and start it again. - REFRESH: Do not stop the instance and limit disruption as much as possible. - NONE: Do not disrupt the instance at all. By default, the minimum action is NONE. If your update requires a more disruptive action than you set with this flag, the necessary action is performed to execute the update. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `mostDisruptiveAllowedAction` | string enum | The most disruptive action that you want to perform on each instance during the update: - REPLACE: Delete the instance and create it again. - RESTART: Stop the instance and start it again. - REFRESH: Do not stop the instance and limit disruption as much as possible. - NONE: Do not disrupt the instance at all. By default, the most disruptive allowed action is REPLACE. If your update requires a more disruptive action than you set with this flag, the update request will fail. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |

### `RegionInstanceGroupManagersCreateInstancesRequest`

- RegionInstanceGroupManagers.createInstances
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<PerInstanceConfig> | \[Required\] List of specifications of per-instance configs. |

### `RegionInstanceGroupManagersDeleteInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<string> | The URLs of one or more instances to delete. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |
| `skipInstancesOnValidationError` | boolean | Specifies whether the request should proceed despite the inclusion of instances that are not members of the group or that are already in the process of being deleted or abandoned. If this field is set to `false` and such an instance is specified in the request, the operation fails. The operation always fails if the request contains a malformed instance URL or a reference to an instance that exists in a zone or region other than the group's zone or region. |

### `RegionInstanceGroupManagersListErrorsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<InstanceManagedByIgmError> | \[Output Only\] The list of errors of the managed instance group. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |

### `RegionInstanceGroupManagersListInstanceConfigsResp`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<PerInstanceConfig> | Output only. \[Output Only\] The list of PerInstanceConfig. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `warning` | object | Output only. \[Output Only\] Informational warning message. |

### `RegionInstanceGroupManagersListInstancesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `managedInstances` | array<ManagedInstance> | A list of managed instances. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |

### `RegionInstanceGroupManagersRecreateRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<string> | The URLs of one or more instances to recreate. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |

### `RegionInstanceGroupManagersResizeAdvancedRequest`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `noCreationRetries` | boolean | If this flag is true, the managed instance group attempts to create all instances initiated by this resize request only once. If there is an error during creation, the managed instance group does not retry create this instance, and we will decrease the targetSize of the request instead. If the flag is false, the group attempts to recreate each instance continuously until it succeeds. This flag matters only in the first attempt of creation of an instance. After an instance is successfully created while this flag is enabled, the instance behaves the same way as all the other instances created with a regular resize request. In particular, if a running instance dies unexpectedly at a later time and needs to be recreated, this mode does not affect the recreation behavior in that scenario. This flag is applicable only to the current resize request. It does not influence other resize requests in any way. You can see which instances ar being created in which mode by calling the get or listManagedInstances API. |
| `targetSize` | integer (int32) | The number of running instances that the managed instance group should maintain at any given time. The group automatically adds or removes instances to maintain the number of instances specified by this parameter. |

### `RegionInstanceGroupManagersResizeAdvancedRequest` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `noCreationRetries` | boolean | If this flag is true, the managed instance group attempts to create all instances initiated by this resize request only once. If there is an error during creation, the managed instance group does not retry create this instance, and we will decrease the targetSize of the request instead. If the flag is false, the group attempts to recreate each instance continuously until it succeeds. This flag matters only in the first attempt of creation of an instance. After an instance is successfully created while this flag is enabled, the instance behaves the same way as all the other instances created with a regular resize request. In particular, if a running instance dies unexpectedly at a later time and needs to be recreated, this mode does not affect the recreation behavior in that scenario. This flag is applicable only to the current resize request. It does not influence other resize requests in any way. You can see which instances ar being created in which mode by calling the get or listManagedInstances API. |
| `scaleInProtection` | boolean | If this flag is enabled within a request to decrease a MIG's target size, then the MIG declines that request. |
| `targetSize` | integer (int32) | The number of running instances that the managed instance group should maintain at any given time. The group automatically adds or removes instances to maintain the number of instances specified by this parameter. |

### `RegionInstanceGroupManagersResumeInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<string> | The URLs of one or more instances to resume. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |

### `RegionInstanceGroupManagersSetAutoHealingRequest`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `autoHealingPolicies` | array<InstanceGroupManagerAutoHealingPolicy> | — |

### `RegionInstanceGroupManagersSetTargetPoolsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fingerprint` | string (byte) | Fingerprint of the target pools information, which is a hash of the contents. This field is used for optimistic locking when you update the target pool entries. This field is optional. |
| `targetPools` | array<string> | The URL of all TargetPool resources to which instances in theinstanceGroup field are added. The target pools automatically apply to all of the instances in the managed instance group. |

### `RegionInstanceGroupManagersSetTemplateRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceTemplate` | string | URL of the InstanceTemplate resource from which all new instances will be created. |

### `RegionInstanceGroupManagersStartInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<string> | The URLs of one or more instances to start. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |

### `RegionInstanceGroupManagersStopInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `forceStop` | boolean | If this flag is set to true, the Instance Group Manager will proceed to stop the instances, skipping initialization on them. |
| `instances` | array<string> | The URLs of one or more instances to stop. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |

### `RegionInstanceGroupManagersSuspendInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `forceSuspend` | boolean | If this flag is set to true, the Instance Group Manager will proceed to suspend the instances, skipping initialization on them. |
| `instances` | array<string> | The URLs of one or more instances to suspend. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |

### `RegionInstanceGroupsListInstances`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InstanceWithNamedPorts> | A list of InstanceWithNamedPorts resources. |
| `kind` | string | Output only. The resource type. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | Output only. \[Output Only\] Informational warning message. |

### `RegionInstanceGroupsListInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceState` | string enum | Instances in which state should be returned. Valid options are: 'ALL', 'RUNNING'. By default, it lists all instances. Values: `ALL`, `RUNNING`. |
| `portName` | string | Name of port user is interested in. It is optional. If it is set, only information about this ports will be returned. If it is not set, all the named ports will be returned. Always lists all instances. |

### `RegionInstanceGroupsSetNamedPortsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fingerprint` | string (byte) | The fingerprint of the named ports information for this instance group. Use this optional property to prevent conflicts when multiple users change the named ports settings concurrently. Obtain the fingerprint with theinstanceGroups.get method. Then, include the fingerprint in your request to ensure that you do not overwrite changes that were applied from another concurrent request. |
| `namedPorts` | array<NamedPort> | The list of named ports to set for this instance group. |

### `RegionList`

- Contains a list of region resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Region> | A list of Region resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#regionList for lists of regions. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `RegionNetworkEndpointGroupsAttachEndpointsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkEndpoints` | array<NetworkEndpoint> | The list of network endpoints to be attached. |

### `RegionNetworkEndpointGroupsDetachEndpointsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkEndpoints` | array<NetworkEndpoint> | The list of network endpoints to be detached. |

### `RegionNetworkFirewallPoliciesGetEffectiveFirewallsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `firewallPolicys` | array<RegionNetworkFirewallPoliciesGetEffectiveFirewallsResponseEffectiveFirewallPolicy> | Output only. \[Output only\] Effective firewalls from firewall policy. It applies to Regional Network Firewall Policies in the specified region, Global Network Firewall Policies and Hierachial Firewall Policies which are associated with the network. |
| `firewalls` | array<Firewall> | Effective firewalls on the network. |

### `RegionNetworkFirewallPoliciesGetEffectiveFirewallsResponseEffectiveFirewallPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Output only. \[Output Only\] The display name of the firewall policy. |
| `name` | string | Output only. \[Output Only\] The name of the firewall policy. |
| `packetMirroringRules` | array<FirewallPolicyRule> | Output only. \[Output only\] The packet mirroring rules that apply to the network. |
| `priority` | integer (int32) | Output only. \[Output only\] Priority of firewall policy association. Not applicable for type=HIERARCHY. |
| `rules` | array<FirewallPolicyRule> | Output only. \[Output only\] The rules that apply to the network. |
| `type` | string enum | Output only. \[Output Only\] The type of the firewall policy. Can be one of HIERARCHY, NETWORK, NETWORK_REGIONAL, SYSTEM_GLOBAL, SYSTEM_REGIONAL. Values: `HIERARCHY`, `NETWORK`, `NETWORK_REGIONAL`, `SYSTEM_GLOBAL`, `SYSTEM_REGIONAL`, `UNSPECIFIED`. |

### `RegionSetLabelsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labelFingerprint` | string (byte) | The fingerprint of the previous set of labels for this resource, used to detect conflicts. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. Make a get() request to the resource to get the latest fingerprint. |
| `labels` | object | The labels to set for this resource. |

### `RegionSetPolicyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Flatten Policy to create a backwacd compatible wire-format. Deprecated. Use 'policy' to specify bindings. |
| `etag` | string (byte) | Flatten Policy to create a backward compatible wire-format. Deprecated. Use 'policy' to specify the etag. |
| `policy` | Policy | REQUIRED: The complete policy to be applied to the 'resource'. The size of the policy is limited to a few 10s of KB. An empty policy is in general a valid policy but certain services (like Projects) might reject them. |

### `RegionSnapshotUpdateKmsKeyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. The new KMS key to replace the current one on the snapshot. If empty, the snapshot will be re-encrypted using the primary version of the snapshot's current KMS key. The KMS key can be provided in the following formats: - projects/project_id/locations/region/keyRings/region/cryptoKeys/key |

### `RegionTargetHttpsProxiesSetSslCertificatesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sslCertificates` | array<string> | New set of SslCertificate resources to associate with this TargetHttpsProxy resource. |

### `RegionUrlMapsValidateRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resource` | UrlMap | Content of the UrlMap to be validated. |

### `RegionWaitForReplicationCatchUpRequest`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `maxWaitDuration` | string (google-duration) | — |

### `ReliabilityRisk`

- Represents a ReliabilityRisk resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp in RFC3339 text format. |
| `description` | string | An optional textual description of the resource; provided when the resource is created. |
| `details` | RiskDetails | \[Output Only\] Details of the reliability risk resource |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#reliabilityRisk for reliability risks. |
| `name` | string | Name of the resource. The name must be 1-63 characters long and comply with RFC1035. |
| `recommendation` | RiskRecommendation | The recommendation to mitigate the risk. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |

### `ReliabilityRisksListResponse`

- Response message for the List method of ReliabilityRisksService.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | \[Output Only\] An ETag of the resource. |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<ReliabilityRisk> | A list of ReliabilityRisk resources. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ReplicationDetails`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `lastReplicationTime` | string (google-datetime) | Output only. The last sync time of the device pair. |
| `secondsSinceLastReplication` | string (int64) | Output only. Replication lag in seconds. This will only be populated if device is in replicating state. Note that the value is calculated sometime during request processing and at the instant the client receives the response, the current replication_lag may have changed. |

### `ReplicationDiskPair`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `primaryDisk` | string | Output only. URL of the primary disk. |
| `secondaryDisk` | string | Output only. URL of the secondary disk. |

### `RequestMirrorPolicy`

- A policy that specifies how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer doesn't wait for responses from the shadow service. Before sending traffic to the shadow service, the host or authority header is suffixed with-shadow.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendService` | string | The full or partial URL to the BackendService resource being mirrored to. The backend service configured for a mirroring policy must reference backends that are of the same type as the original backend service matched in the URL map. Serverless NEG backends are not currently supported as a mirrored backend service. |
| `mirrorPercent` | number (double) | The percentage of requests to be mirrored to `backend_service`. |

### `Reservation`

- Represents a reservation resource. A reservation ensures that capacity is held in a specific zone even if the reserved VMs are not running. For more information, read Reserving zonal resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advancedDeploymentControl` | ReservationAdvancedDeploymentControl | Advanced control for cluster management, applicable only to DENSE deployment type reservations. |
| `aggregateReservation` | AllocationAggregateReservation | Reservation for aggregated resources, providing shape flexibility. |
| `commitment` | string | Output only. \[Output Only\] Full or partial URL to a parent commitment. This field displays for reservations that are tied to a commitment. |
| `confidentialComputeType` | string enum | — Values: `CONFIDENTIAL_COMPUTE_TYPE_BMSAI`, `CONFIDENTIAL_COMPUTE_TYPE_TDX`, `CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deleteAfterDuration` | Duration | Duration time relative to reservation creation when Compute Engine will automatically delete this resource. |
| `deleteAtTime` | string | Absolute time in future when the reservation will be auto-deleted by Compute Engine. Timestamp is represented inRFC3339 text format. |
| `deploymentType` | string enum | Specifies the deployment strategy for this reservation. Values: `DENSE`, `DEPLOYMENT_TYPE_UNSPECIFIED`. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `earlyAccessMaintenance` | string enum | Indicates the early access maintenance for the reservation. If this field is absent or set to NO_EARLY_ACCESS, the reservation is not enrolled in early access maintenance and the standard notice applies. Values: `NO_EARLY_ACCESS`, `WAVE1`, `WAVE2`. |
| `enableEmergentMaintenance` | boolean | Indicates whether Compute Engine allows unplanned maintenance for your VMs; for example, to fix hardware errors. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#reservations for reservations. |
| `linkedCommitments` | array<string> | Output only. \[Output Only\] Full or partial URL to parent commitments. This field displays for reservations that are tied to multiple commitments. |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | ReservationParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `protectionTier` | string enum | Protection tier for the workload which specifies the workload expectations in the event of infrastructure failures at data center (e.g. power and/or cooling failures). Values: `CAPACITY_OPTIMIZED`, `PROTECTION_TIER_UNSPECIFIED`, `STANDARD`. |
| `reservationSharingPolicy` | AllocationReservationSharingPolicy | Specify the reservation sharing policy. If unspecified, the reservation will not be shared with Google Cloud managed services. |
| `resourceMetadata` | ResourceMetadata | Output only. \[Output Only\] Contains standard resource metadata for an Allocation resource. It is populated for each instance of the Allocation resource, and includes the api_version the instance was retrieved through, and its canonical resource_type name. |
| `resourcePolicies` | object | Resource policies to be added to this reservation. The key is defined by user, and the value is resource policy url. This is to define placement policy with reservation. |
| `resourceStatus` | AllocationResourceStatus | Output only. \[Output Only\] Status information for Reservation resource. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `schedulingType` | string enum | The type of maintenance for the reservation. Values: `GROUPED`, `GROUP_MAINTENANCE_TYPE_UNSPECIFIED`, `INDEPENDENT`. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `shareSettings` | ShareSettings | Specify share-settings to create a shared reservation. This property is optional. For more information about the syntax and options for this field and its subfields, see the guide for creating a shared reservation. |
| `specificReservation` | AllocationSpecificSKUReservation | Reservation for instances with specific machine shapes. |
| `specificReservationRequired` | boolean | Indicates whether the reservation can be consumed by VMs with affinity for "any" reservation. If the field is set, then only VMs that target the reservation by name can consume from this reservation. |
| `status` | string enum | Output only. \[Output Only\] The status of the reservation. - CREATING: Reservation resources are being allocated. - READY: Reservation resources have been allocated, and the reservation is ready for use. - DELETING: Reservation deletion is in progress. - UPDATING: Reservation update is in progress. Values: `CREATING`, `DELETING`, `INVALID`, `READY`, `UPDATING`. |
| `zone` | string | Zone in which the reservation resides. A zone must be provided if the reservation is created within a commitment. |

### `Reservation` (alpha)

- Represents a reservation resource. A reservation ensures that capacity is held in a specific zone even if the reserved VMs are not running. For more information, read Reserving zonal resources.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `advancedDeploymentControl` | ReservationAdvancedDeploymentControl | Advanced control for cluster management, applicable only to DENSE deployment type reservations. |
| `aggregateReservation` | AllocationAggregateReservation | Reservation for aggregated resources, providing shape flexibility. |
| `commitment` | string | Output only. \[Output Only\] Full or partial URL to a parent commitment. This field displays for reservations that are tied to a commitment. |
| `confidentialComputeType` | string enum | — Values: `CONFIDENTIAL_COMPUTE_TYPE_BMSAI`, `CONFIDENTIAL_COMPUTE_TYPE_TDX`, `CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deleteAfterDuration` | Duration | Duration time relative to reservation creation when Compute Engine will automatically delete this resource. |
| `deleteAtTime` | string | Absolute time in future when the reservation will be auto-deleted by Compute Engine. Timestamp is represented inRFC3339 text format. |
| `deploymentType` | string enum | Specifies the deployment strategy for this reservation. Values: `DENSE`, `DEPLOYMENT_TYPE_UNSPECIFIED`, `FLEXIBLE`. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `earlyAccessMaintenance` | string enum | Indicates the early access maintenance for the reservation. If this field is absent or set to NO_EARLY_ACCESS, the reservation is not enrolled in early access maintenance and the standard notice applies. Values: `NO_EARLY_ACCESS`, `WAVE1`, `WAVE2`. |
| `enableEmergentMaintenance` | boolean | Indicates whether Compute Engine allows unplanned maintenance for your VMs; for example, to fix hardware errors. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#reservations for reservations. |
| `linkedCommitments` | array<string> | Output only. \[Output Only\] Full or partial URL to parent commitments. This field displays for reservations that are tied to multiple commitments. |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | ReservationParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `protectionTier` | string enum | Protection tier for the workload which specifies the workload expectations in the event of infrastructure failures at data center (e.g. power and/or cooling failures). Values: `CAPACITY_OPTIMIZED`, `PROTECTION_TIER_UNSPECIFIED`, `STANDARD`. |
| `reservationMode` | string enum | Output only. \[Output only\] Indicates the reservation mode of the reservation. Values: `CALENDAR`, `DEFAULT`, `RESERVATION_MODE_UNSPECIFIED`. |
| `reservationSharingPolicy` | AllocationReservationSharingPolicy | Specify the reservation sharing policy. If unspecified, the reservation will not be shared with Google Cloud managed services. |
| `resourcePolicies` | object | Resource policies to be added to this reservation. The key is defined by user, and the value is resource policy url. This is to define placement policy with reservation. |
| `resourceStatus` | AllocationResourceStatus | Output only. \[Output Only\] Status information for Reservation resource. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `schedulingType` | string enum | The type of maintenance for the reservation. Values: `GROUPED`, `GROUP_MAINTENANCE_TYPE_UNSPECIFIED`, `INDEPENDENT`. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `shareSettings` | ShareSettings | Specify share-settings to create a shared reservation. This property is optional. For more information about the syntax and options for this field and its subfields, see the guide for creating a shared reservation. |
| `specificReservation` | AllocationSpecificSKUReservation | Reservation for instances with specific machine shapes. |
| `specificReservationRequired` | boolean | Indicates whether the reservation can be consumed by VMs with affinity for "any" reservation. If the field is set, then only VMs that target the reservation by name can consume from this reservation. |
| `status` | string enum | Output only. \[Output Only\] The status of the reservation. - CREATING: Reservation resources are being allocated. - READY: Reservation resources have been allocated, and the reservation is ready for use. - DELETING: Reservation deletion is in progress. - UPDATING: Reservation update is in progress. Values: `CREATING`, `DELETING`, `INVALID`, `READY`, `UPDATING`. |
| `zone` | string | Zone in which the reservation resides. A zone must be provided if the reservation is created within a commitment. |

### `Reservation` (beta)

- Represents a reservation resource. A reservation ensures that capacity is held in a specific zone even if the reserved VMs are not running. For more information, read Reserving zonal resources.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `advancedDeploymentControl` | ReservationAdvancedDeploymentControl | Advanced control for cluster management, applicable only to DENSE deployment type reservations. |
| `aggregateReservation` | AllocationAggregateReservation | Reservation for aggregated resources, providing shape flexibility. |
| `commitment` | string | Output only. \[Output Only\] Full or partial URL to a parent commitment. This field displays for reservations that are tied to a commitment. |
| `confidentialComputeType` | string enum | — Values: `CONFIDENTIAL_COMPUTE_TYPE_BMSAI`, `CONFIDENTIAL_COMPUTE_TYPE_TDX`, `CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deleteAfterDuration` | Duration | Duration time relative to reservation creation when Compute Engine will automatically delete this resource. |
| `deleteAtTime` | string | Absolute time in future when the reservation will be auto-deleted by Compute Engine. Timestamp is represented inRFC3339 text format. |
| `deploymentType` | string enum | Specifies the deployment strategy for this reservation. Values: `DENSE`, `DEPLOYMENT_TYPE_UNSPECIFIED`, `FLEXIBLE`. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `earlyAccessMaintenance` | string enum | Indicates the early access maintenance for the reservation. If this field is absent or set to NO_EARLY_ACCESS, the reservation is not enrolled in early access maintenance and the standard notice applies. Values: `NO_EARLY_ACCESS`, `WAVE1`, `WAVE2`. |
| `enableEmergentMaintenance` | boolean | Indicates whether Compute Engine allows unplanned maintenance for your VMs; for example, to fix hardware errors. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#reservations for reservations. |
| `linkedCommitments` | array<string> | Output only. \[Output Only\] Full or partial URL to parent commitments. This field displays for reservations that are tied to multiple commitments. |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | ReservationParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `protectionTier` | string enum | Protection tier for the workload which specifies the workload expectations in the event of infrastructure failures at data center (e.g. power and/or cooling failures). Values: `CAPACITY_OPTIMIZED`, `PROTECTION_TIER_UNSPECIFIED`, `STANDARD`. |
| `reservationMode` | string enum | Output only. \[Output only\] Indicates the reservation mode of the reservation. Values: `CALENDAR`, `DEFAULT`, `RESERVATION_MODE_UNSPECIFIED`. |
| `reservationSharingPolicy` | AllocationReservationSharingPolicy | Specify the reservation sharing policy. If unspecified, the reservation will not be shared with Google Cloud managed services. |
| `resourcePolicies` | object | Resource policies to be added to this reservation. The key is defined by user, and the value is resource policy url. This is to define placement policy with reservation. |
| `resourceStatus` | AllocationResourceStatus | Output only. \[Output Only\] Status information for Reservation resource. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `schedulingType` | string enum | The type of maintenance for the reservation. Values: `GROUPED`, `GROUP_MAINTENANCE_TYPE_UNSPECIFIED`, `INDEPENDENT`. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `shareSettings` | ShareSettings | Specify share-settings to create a shared reservation. This property is optional. For more information about the syntax and options for this field and its subfields, see the guide for creating a shared reservation. |
| `specificReservation` | AllocationSpecificSKUReservation | Reservation for instances with specific machine shapes. |
| `specificReservationRequired` | boolean | Indicates whether the reservation can be consumed by VMs with affinity for "any" reservation. If the field is set, then only VMs that target the reservation by name can consume from this reservation. |
| `status` | string enum | Output only. \[Output Only\] The status of the reservation. - CREATING: Reservation resources are being allocated. - READY: Reservation resources have been allocated, and the reservation is ready for use. - DELETING: Reservation deletion is in progress. - UPDATING: Reservation update is in progress. Values: `CREATING`, `DELETING`, `INVALID`, `READY`, `UPDATING`. |
| `zone` | string | Zone in which the reservation resides. A zone must be provided if the reservation is created within a commitment. |

### `ReservationAdvancedDeploymentControl`

- Advance control for cluster management, applicable only to DENSE deployment type reservations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reservationOperationalMode` | string enum | Indicates chosen reservation operational mode for the reservation. Values: `ALL_CAPACITY`, `HIGHLY_AVAILABLE_CAPACITY`, `RESERVATION_OPERATIONAL_MODE_UNSPECIFIED`. |

### `ReservationAffinity`

- Specifies the reservations that this instance can consume from.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumeReservationType` | string enum | Specifies the type of reservation from which this instance can consume resources: ANY_RESERVATION (default),SPECIFIC_RESERVATION, or NO_RESERVATION. See Consuming reserved instances for examples. Values: `ANY_RESERVATION`, `NO_RESERVATION`, `SPECIFIC_RESERVATION`, `UNSPECIFIED`. |
| `key` | string | Corresponds to the label key of a reservation resource. To target aSPECIFIC_RESERVATION by name, specifygoogleapis.com/reservation-name as the key and specify the name of your reservation as its value. |
| `values` | array<string> | Corresponds to the label values of a reservation resource. This can be either a name to a reservation in the same project or "projects/different-project/reservations/some-reservation-name" to target a shared reservation in the same zone but in a different project. |

### `ReservationAggregatedList`

- Contains a list of reservations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of Allocation resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ReservationBlock`

- Represents a reservation block resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | integer (int32) | Output only. \[Output Only\] The number of resources that are allocated in this reservation block. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `healthInfo` | ReservationBlockHealthInfo | Output only. \[Output Only\] Health information for the reservation block. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `inUseCount` | integer (int32) | Output only. \[Output Only\] The number of instances that are currently in use on this reservation block. |
| `inUseHostCount` | integer (int32) | Output only. Number of hosts currently in use. If there is one or more Instances running on the host, it is considered in use. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#reservationBlock for reservation blocks. |
| `name` | string | Output only. \[Output Only\] The name of this reservation block generated by Google Compute Engine. The name must be 1-63 characters long, and comply with RFC1035 @pattern \[a-z\](?:\[-a-z0-9\]{0,61}\[a-z0-9\])? |
| `physicalTopology` | ReservationBlockPhysicalTopology | Output only. \[Output Only\] The physical topology of the reservation block. |
| `reservationMaintenance` | GroupMaintenanceInfo | Output only. \[Output Only\] Maintenance information for this reservation block. |
| `reservationSubBlockCount` | integer (int32) | Output only. \[Output Only\] The number of reservation subBlocks associated with this reservation block. |
| `reservationSubBlockInUseCount` | integer (int32) | Output only. \[Output Only\] The number of in-use reservation subBlocks associated with this reservation block. If at least one VM is running on a subBlock, it is considered in-use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `status` | string enum | Output only. \[Output Only\] Status of the reservation block. Values: `CREATING`, `DELETING`, `INVALID`, `READY`. |
| `zone` | string | Output only. \[Output Only\] Zone in which the reservation block resides. |

### `ReservationBlock` (alpha)

- Represents a reservation block resource.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `count` | integer (int32) | Output only. \[Output Only\] The number of resources that are allocated in this reservation block. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `healthInfo` | ReservationBlockHealthInfo | Output only. \[Output Only\] Health information for the reservation block. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `inUseCount` | integer (int32) | Output only. \[Output Only\] The number of instances that are currently in use on this reservation block. |
| `inUseHostCount` | integer (int32) | Output only. Number of hosts currently in use. If there is one or more Instances running on the host, it is considered in use. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#reservationBlock for reservation blocks. |
| `locationPrefix` | string | Output only. \[Output Only\] Obfuscated location where this reservation block physically resides in format /CCCC/GGGG. This matches the tripod specified in the VM topology information. Example: /USEAB1/0101/ is the location prefix in /USEAB1/0101/031/003 |
| `name` | string | Output only. \[Output Only\] The name of this reservation block generated by Google Compute Engine. The name must be 1-63 characters long, and comply with RFC1035 @pattern \[a-z\](?:\[-a-z0-9\]{0,61}\[a-z0-9\])? |
| `physicalTopology` | ReservationBlockPhysicalTopology | Output only. \[Output Only\] The physical topology of the reservation block. |
| `reservationMaintenance` | GroupMaintenanceInfo | Output only. \[Output Only\] Maintenance information for this reservation block. |
| `reservationSubBlockCount` | integer (int32) | Output only. \[Output Only\] The number of reservation subBlocks associated with this reservation block. |
| `reservationSubBlockInUseCount` | integer (int32) | Output only. \[Output Only\] The number of in-use reservation subBlocks associated with this reservation block. If at least one VM is running on a subBlock, it is considered in-use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `status` | string enum | Output only. \[Output Only\] Status of the reservation block. Values: `CREATING`, `DELETING`, `INVALID`, `READY`. |
| `zone` | string | Output only. \[Output Only\] Zone in which the reservation block resides. |

### `ReservationBlock` (preview)

- Represents a reservation block resource.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `blockStatus` | ReservationBlockBlockStatus | Output only. \[Output Only\] Resource status for the reservation block. |
| `count` | integer (int32) | Output only. \[Output Only\] The number of resources that are allocated in this reservation block. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `healthInfo` | ReservationBlockHealthInfo | Output only. \[Output Only\] Health information for the reservation block. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `inUseCount` | integer (int32) | Output only. \[Output Only\] The number of instances that are currently in use on this reservation block. |
| `inUseHostCount` | integer (int32) | Output only. Number of hosts currently in use. If there is one or more Instances running on the host, it is considered in use. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#reservationBlock for reservation blocks. |
| `machineCount` | integer (int32) | Output only. \[Output Only\] The number of machines in the reservation block. Only populated for families where machine to host ratio is not 1:1 such as TPU8i. |
| `name` | string | Output only. \[Output Only\] The name of this reservation block generated by Google Compute Engine. The name must be 1-63 characters long, and comply with RFC1035 @pattern \[a-z\](?:\[-a-z0-9\]{0,61}\[a-z0-9\])? |
| `physicalTopology` | ReservationBlockPhysicalTopology | Output only. \[Output Only\] The physical topology of the reservation block. |
| `reservationMaintenance` | GroupMaintenanceInfo | Output only. \[Output Only\] Maintenance information for this reservation block. |
| `reservationSubBlockCount` | integer (int32) | Output only. \[Output Only\] The number of reservation subBlocks associated with this reservation block. |
| `reservationSubBlockInUseCount` | integer (int32) | Output only. \[Output Only\] The number of in-use reservation subBlocks associated with this reservation block. If at least one VM is running on a subBlock, it is considered in-use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `status` | string enum | Output only. \[Output Only\] Status of the reservation block. Values: `CREATING`, `DELETING`, `INVALID`, `READY`. |
| `zone` | string | Output only. \[Output Only\] Zone in which the reservation block resides. |

### `ReservationBlockBlockDetailedHealthInfo`

- Detailed health information for the reservation block.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `criticalSubBlockCount` | integer (int32) | Output only. The number of subBlocks that are critical. Critical subBlocks are completely unhealthy and cannot be used. |
| `degradedSubBlockCount` | integer (int32) | Output only. The number of subBlocks that are degraded. Degraded subBlocks are within SLO and can be used with some performance degradation. |
| `healthySubBlockCount` | integer (int32) | Output only. The number of subBlocks that are healthy. Healthy subBlocks are within SLO and can be used without performance degradation. |
| `unhealthySubBlockCount` | integer (int32) | Output only. The number of subBlocks that are unhealthy. Unhealthy subBlocks cannot be used in full. |

### `ReservationBlockBlockStatus`

- \[Output Only\] Status for the reservation block.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `blockDetailedHealthInfo` | ReservationBlockBlockDetailedHealthInfo | Output only. Detailed health information for the reservation block. |

### `ReservationBlockHealthInfo`

- Health information for the reservation block.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `degradedSubBlockCount` | integer (int32) | The number of subBlocks that are degraded. |
| `healthStatus` | string enum | The health status of the reservation block. Values: `DEGRADED`, `HEALTHY`, `HEALTH_STATUS_UNSPECIFIED`. |
| `healthySubBlockCount` | integer (int32) | The number of subBlocks that are healthy. |

### `ReservationBlockPhysicalTopology`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `block` | string | The hash of the capacity block within the cluster. |
| `cluster` | string | The cluster name of the reservation block. |
| `instances` | array<ReservationBlockPhysicalTopologyInstance> | Output only. The detailed instances information for a given Block |

### `ReservationBlockPhysicalTopologyInstance`

- The instances information for a given Block
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceId` | string (uint64) | The InstanceId of the instance |
| `physicalHostTopology` | ReservationBlockPhysicalTopologyInstancePhysicalHostTopology | Output only. The PhysicalHostTopology of instances within a Block resource. |
| `projectId` | string (uint64) | Project where the instance lives |

### `ReservationBlockPhysicalTopologyInstancePhysicalHostTopology`

- The PhysicalHostTopology of the instance within a Block resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | Host hash for a given instance |
| `subBlock` | string | Sub block hash for a given instance |

### `ReservationBlockPhysicalTopologyInstancePhysicalHostTopology` (preview)

- The PhysicalHostTopology of the instance within a Block resource.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `host` | string | Host hash for a given instance |
| `machine` | string | Machine hash for a given instance. Only populated for families where machine-to-host ratio is not 1:1 such as TPU8i. |
| `subBlock` | string | Sub block hash for a given instance |

### `ReservationBlocksGetResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resource` | ReservationBlock | — |

### `ReservationBlocksListResponse`

- A list of reservation blocks under a single reservation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier for the resource; defined by the server. |
| `items` | array<ReservationBlock> | A list of reservation block resources. |
| `kind` | string | Type of the resource. Alwayscompute#reservationBlock for a list of reservation blocks. |
| `nextPageToken` | string | This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Server-defined URL for this resource. |
| `warning` | object | Informational warning message. |

### `ReservationConsumedInstance`

- ReservationConsumedInstance represents a consumed instance.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `instance` | string | The full URI of the instance resource. |
| `service` | string | The service to which the instance belongs. Typically "COMPUTE". |
| `status` | ReservationConsumedInstanceStatus | Output only. \[Output Only\] The status of the consumed instance. |

### `ReservationConsumedInstanceStatus`

- Status information for the instance's consumption of the reservation.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `linkageErrors` | object | A list of issues related to this instance's linkage to the reservation. |

### `ReservationConsumedInstancesListResponse`

- Response message for listing reservation consumed instances.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `id` | string | Uniquely identifies the type of this resource. |
| `items` | array<ReservationConsumedInstance> | A list of ReservationConsumedInstance resources. |
| `kind` | string | Identifies the resource as a list of reservation consumed instances. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning which replaces the result in some cases. |

### `ReservationList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `items` | array<Reservation> | \[Output Only\] A list of Allocation resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource.Always compute#reservationsList for listsof reservations |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ReservationParams`

- Additional reservation params.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the reservation. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |

### `ReservationSlot`

- Represents a reservation slot resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] The creation timestamp, formatted asRFC3339 text. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for this resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] The type of resource. Alwayscompute#reservationSlot for reservation slots. |
| `name` | string | Output only. \[Output Only\] The name of the reservation slot. |
| `physicalTopology` | ReservationSlotPhysicalTopology | Output only. \[Output Only\] The physical topology of the reservation slot. |
| `selfLink` | string | Output only. \[Output Only\] A server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] A server-defined URL for this resource with the resource ID. |
| `shareSettings` | ShareSettings | Specify share settings to create a shared slot. Set to empty to inherit the share settings from a parent resource. |
| `state` | string enum | Output only. \[Output Only\] The state of the reservation slot. Values: `ACTIVE`, `CREATING`, `DELETING`, `STATE_UNSPECIFIED`, `UNAVAILABLE`. |
| `status` | ReservationSlotStatus | Output only. \[Output Only\] The status of the reservation slot. |
| `zone` | string | Output only. \[Output Only\] The zone in which the reservation slot resides. |

### `ReservationSlotPhysicalTopology`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `block` | string | The unique identifier of the capacity block within the cluster. |
| `cluster` | string | The cluster name of the reservation sub-block. |
| `host` | string | The unique identifier of the capacity host within the capacity sub-block. |
| `subBlock` | string | The unique identifier of the capacity sub-block within the capacity block. |

### `ReservationSlotStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `physicalTopology` | ReservationSlotPhysicalTopology | Output only. \[Output Only\] The physical topology of the reservation sub-block. |
| `rdmaIpAddresses` | array<string> | Output only. The RDMA IP address of the physical host. |
| `runningInstances` | array<string> | Output only. The URIs of the instances currently running on this slot. |

### `ReservationSlotsGetResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resource` | ReservationSlot | — |

### `ReservationSlotsGetVersionRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sbomSelections` | array<string> | The SBOM selection to return. Duplicate values in the list will be ignored. Values: `SBOM_SELECTION_CURRENT`, `SBOM_SELECTION_TARGET`, `SBOM_SELECTION_UNSPECIFIED`. |

### `ReservationSlotsListResponse`

- A list of reservation slots within a single reservation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | The unique identifier for the resource; defined by the server. |
| `items` | array<ReservationSlot> | A list of reservation slot resources. |
| `kind` | string | The type of resource. Alwayscompute#reservationSlot for a list of reservation slots. |
| `nextPageToken` | string | This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | The server-defined URL for this resource. |
| `warning` | object | An informational warning message. |

### `ReservationSubBlock`

- Represents a reservation subBlock resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorTopologiesInfo` | AcceleratorTopologiesInfo | Output only. \[Output Only\] Slice info for the reservation subBlock. |
| `count` | integer (int32) | Output only. \[Output Only\] The number of hosts that are allocated in this reservation subBlock. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `healthInfo` | ReservationSubBlockHealthInfo | Output only. \[Output Only\] Health information for the reservation subBlock. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `inUseCount` | integer (int32) | Output only. \[Output Only\] The number of instances that are currently in use on this reservation subBlock. |
| `inUseHostCount` | integer (int32) | Output only. Number of hosts currently in use. If there is one or more Instances running on the host, it is considered in use. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#reservationSubBlock for reservation subBlocks. |
| `name` | string | Output only. \[Output Only\] The name of this reservation subBlock generated by Google Compute Engine. The name must be 1-63 characters long, and comply with RFC1035 @pattern \[a-z\](?:\[-a-z0-9\]{0,61}\[a-z0-9\])? |
| `physicalTopology` | ReservationSubBlockPhysicalTopology | Output only. \[Output Only\] The physical topology of the reservation subBlock. |
| `reservationSubBlockMaintenance` | GroupMaintenanceInfo | Output only. Maintenance information for this reservation subBlock. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `status` | string enum | Output only. \[Output Only\] Status of the reservation subBlock. Values: `CREATING`, `DELETING`, `INVALID`, `READY`. |
| `zone` | string | Output only. \[Output Only\] Zone in which the reservation subBlock resides. |

### `ReservationSubBlock` (alpha)

- Represents a reservation subBlock resource.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `acceleratorTopologiesInfo` | AcceleratorTopologiesInfo | Output only. \[Output Only\] Slice info for the reservation subBlock. |
| `count` | integer (int32) | Output only. \[Output Only\] The number of hosts that are allocated in this reservation subBlock. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `healthInfo` | ReservationSubBlockHealthInfo | Output only. \[Output Only\] Health information for the reservation subBlock. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `inUseCount` | integer (int32) | Output only. \[Output Only\] The number of instances that are currently in use on this reservation subBlock. |
| `inUseHostCount` | integer (int32) | Output only. Number of hosts currently in use. If there is one or more Instances running on the host, it is considered in use. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#reservationSubBlock for reservation subBlocks. |
| `name` | string | Output only. \[Output Only\] The name of this reservation subBlock generated by Google Compute Engine. The name must be 1-63 characters long, and comply with RFC1035 @pattern \[a-z\](?:\[-a-z0-9\]{0,61}\[a-z0-9\])? |
| `physicalTopology` | ReservationSubBlockPhysicalTopology | Output only. \[Output Only\] The physical topology of the reservation subBlock. |
| `reservationSubBlockMaintenance` | GroupMaintenanceInfo | Output only. Maintenance information for this reservation subBlock. |
| `retentionPriority` | integer (int32) | Customer specified retention priority for power shedding events. Used to determine priority of the subBlock relative to others during a power shedding event. Higher priorities are retained over lower ones. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `status` | string enum | Output only. \[Output Only\] Status of the reservation subBlock. Values: `CREATING`, `DELETING`, `INVALID`, `READY`, `UPDATING`. |
| `zone` | string | Output only. \[Output Only\] Zone in which the reservation subBlock resides. |

### `ReservationSubBlock` (preview)

- Represents a reservation subBlock resource.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `acceleratorTopologiesInfo` | AcceleratorTopologiesInfo | Output only. \[Output Only\] Slice info for the reservation subBlock. |
| `count` | integer (int32) | Output only. \[Output Only\] The number of hosts that are allocated in this reservation subBlock. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `healthInfo` | ReservationSubBlockHealthInfo | Output only. \[Output Only\] Health information for the reservation subBlock. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `inUseCount` | integer (int32) | Output only. \[Output Only\] The number of instances that are currently in use on this reservation subBlock. |
| `inUseHostCount` | integer (int32) | Output only. Number of hosts currently in use. If there is one or more Instances running on the host, it is considered in use. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#reservationSubBlock for reservation subBlocks. |
| `machineCount` | integer (int32) | Output only. \[Output Only\] The number of machines in the reservation subBlock. Only populated for families where machine to host ratio is not 1:1 such as TPU8i. |
| `name` | string | Output only. \[Output Only\] The name of this reservation subBlock generated by Google Compute Engine. The name must be 1-63 characters long, and comply with RFC1035 @pattern \[a-z\](?:\[-a-z0-9\]{0,61}\[a-z0-9\])? |
| `physicalTopology` | ReservationSubBlockPhysicalTopology | Output only. \[Output Only\] The physical topology of the reservation subBlock. |
| `reservationSubBlockMaintenance` | GroupMaintenanceInfo | Output only. Maintenance information for this reservation subBlock. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `status` | string enum | Output only. \[Output Only\] Status of the reservation subBlock. Values: `CREATING`, `DELETING`, `INVALID`, `READY`. |
| `subBlockStatus` | ReservationSubBlockSubBlockStatus | Output only. \[Output Only\] Resource status for the reservation subBlock. |
| `zone` | string | Output only. \[Output Only\] Zone in which the reservation subBlock resides. |

### `ReservationSubBlockHealthInfo`

- Health information for the reservation subBlock.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `degradedHostCount` | integer (int32) | The number of degraded hosts in the reservation subBlock. |
| `degradedInfraCount` | integer (int32) | The number of degraded infrastructure (e.g NV link domain) in the reservation subblock. |
| `healthStatus` | string enum | The health status of the reservation subBlock. Values: `DEGRADED`, `HEALTHY`, `HEALTH_STATUS_UNSPECIFIED`. |
| `healthyHostCount` | integer (int32) | The number of healthy hosts in the reservation subBlock. |
| `healthyInfraCount` | integer (int32) | The number of healthy infrastructure (e.g NV link domain) in the reservation subblock. |

### `ReservationSubBlockPhysicalTopology`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `block` | string | The hash of the capacity block within the cluster. |
| `cluster` | string | The cluster name of the reservation subBlock. |
| `subBlock` | string | The hash of the capacity sub-block within the capacity block. |

### `ReservationSubBlockSubBlockDetailedHealthInfo`

- Detailed health information for the reservation subBlock.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `detailedHealthStatus` | string enum | Output only. The detailed health status of the reservation subBlock. Values: `DETAILED_HEALTH_STATUS_CRITICAL`, `DETAILED_HEALTH_STATUS_DEGRADED`, `DETAILED_HEALTH_STATUS_HEALTHY`, `DETAILED_HEALTH_STATUS_UNHEALTHY`, `DETAILED_HEALTH_STATUS_UNSPECIFIED`. |
| `healthyHostCount` | integer (int32) | Output only. The number of healthy hosts in the reservation subBlock. |
| `unhealthyHostCount` | integer (int32) | Output only. The number of unhealthy hosts in the reservation subBlock. Unhealthy hosts cannot be used in full. |

### `ReservationSubBlockSubBlockStatus`

- \[Output Only\] Status for the reservation subBlock.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `subBlockDetailedHealthInfo` | ReservationSubBlockSubBlockDetailedHealthInfo | Output only. Detailed health information for the reservation subBlock. |

### `ReservationSubBlocksGetResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resource` | ReservationSubBlock | — |

### `ReservationSubBlocksGetVersionRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sbomSelections` | array<string> | The SBOM selection to return. Values: `SBOM_SELECTION_CURRENT`, `SBOM_SELECTION_TARGET`, `SBOM_SELECTION_UNSPECIFIED`. |

### `ReservationSubBlocksListResponse`

- A list of reservation subBlocks under a single reservation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier for the resource; defined by the server. |
| `items` | array<ReservationSubBlock> | A list of reservation subBlock resources. |
| `kind` | string | Type of the resource. Alwayscompute#reservationSubBlock for a list of reservation subBlocks. |
| `nextPageToken` | string | This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Server-defined URL for this resource. |
| `warning` | object | Informational warning message. |

### `ReservationSubBlocksReportFaultyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disruptionSchedule` | string enum | The disruption schedule for the subBlock. Values: `DISRUPTION_SCHEDULE_UNSPECIFIED`, `IMMEDIATE`. |
| `failureComponent` | string enum | The component that experienced the fault. Values: `FAILURE_COMPONENT_UNSPECIFIED`, `MULTIPLE_FAULTY_HOSTS`, `NVLINK_SWITCH`. |
| `faultReasons` | array<ReservationSubBlocksReportFaultyRequestFaultReason> | The reasons for the fault experienced with the subBlock. |

### `ReservationSubBlocksReportFaultyRequestFaultReason`

- The reason for the fault experienced with the subBlock.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `behavior` | string enum | The behavior of the fault experienced with the subBlock. Values: `FAULT_BEHAVIOR_UNSPECIFIED`, `GPU_ERROR`, `NVSWITCH_FAULT_CONTROLLER_ERROR`, `NVSWITCH_FAULT_DEGRADED_BANDWIDTH`, `NVSWITCH_FAULT_SWITCH_ERROR`, `PERFORMANCE`, `SILENT_DATA_CORRUPTION`, `SWITCH_FAILURE`. |
| `description` | string | The description of the fault experienced with the subBlock. |

### `ReservationSubBlocksReportFaultyRequestFaultReason` (preview)

- The reason for the fault experienced with the subBlock.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `behavior` | string enum | The behavior of the fault experienced with the subBlock. Values: `FAULT_BEHAVIOR_UNSPECIFIED`, `GPU_ERROR`, `NVSWITCH_FAULT_CONTROLLER_ERROR`, `NVSWITCH_FAULT_DEGRADED_BANDWIDTH`, `NVSWITCH_FAULT_SWITCH_ERROR`, `PERFORMANCE`, `SILENT_DATA_CORRUPTION`, `SWITCH_FAILURE`. |
| `componentId` | string | The identifier of the specific faulty sub-component (e.g., NVSwitch ID). Optional. If not specified, all switches in the sub-block are targeted for triage. |
| `description` | string | The description of the fault experienced with the subBlock. |

### `ReservationsBlocksPerformMaintenanceRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maintenanceScope` | string enum | Specifies if all, running or unused hosts are in scope for this request. Values: `ALL`, `MAINTENANCE_SCOPE_UNSPECIFIED`, `RUNNING_VMS`, `UNUSED_CAPACITY`. |

### `ReservationsPerformMaintenanceRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maintenanceScope` | string enum | Specifies if all, running or unused hosts are in scope for this request. Values: `ALL`, `MAINTENANCE_SCOPE_UNSPECIFIED`, `RUNNING_VMS`, `UNUSED_CAPACITY`. |

### `ReservationsResizeRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `specificSkuCount` | string (int64) | Number of allocated resources can be resized with minimum = 1 and maximum = 1000. |

### `ReservationsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reservations` | array<Reservation> | A list of reservations contained in this scope. |
| `warning` | object | Informational warning which replaces the list of reservations when the list is empty. |

### `ResourceCommitment`

- Commitment for a particular hardware resource (a commitment is composed of one or more of these).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorType` | string | Name of the accelerator type or GPU resource. Specify this field only when the type of hardware resource is ACCELERATOR. |
| `amount` | string (int64) | The quantity of the hardware resource that you want to commit to purchasing (in a type-dependent unit). - For vCPUs, you must specify an integer value. - For memory, you specify the amount of MB that you want. The value you specify must be a multiple of 256 MB, with up to 6.5 GB of memory per every vCPU. - For GPUs, you must specify an integer value. - For Local SSD disks, you must specify the amount in GB. The size of a single Local SSD disk is 375 GB. |
| `type` | string enum | The type of hardware resource that you want to specify. You can specify any of the following values: - VCPU - MEMORY - LOCAL_SSD - ACCELERATOR Specify as a separate entry in the list for each individual resource type. Values: `ACCELERATOR`, `LOCAL_SSD`, `MEMORY`, `UNSPECIFIED`, `VCPU`. |

### `ResourceGroupReference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `group` | string | A URI referencing one of the instance groups or network endpoint groups listed in the backend service. |

### `ResourceMetadata`

- Standardized resource metadata common to all compute resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The version of the API interface that this resource was retrieved through. For example, `"2025-01-01"` or `"2025-01-01-preview"`. |
| `resourceType` | string | The canonical resource type name in the format of a resource type as defined by AIP-123 (https://google.aip.dev/123). For example, `"compute.googleapis.com/Instance"`. |

### `ResourcePoliciesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourcePolicies` | array<ResourcePolicy> | A list of resourcePolicies contained in this scope. |
| `warning` | object | Informational warning which replaces the list of resourcePolicies when the list is empty. |

### `ResourcePolicy`

- Represents a Resource Policy resource. You can use resource policies to schedule actions for some Compute Engine resources. For example, you can use them toschedule persistent disk snapshots.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | — |
| `diskConsistencyGroupPolicy` | ResourcePolicyDiskConsistencyGroupPolicy | Resource policy for disk consistency groups. |
| `groupPlacementPolicy` | ResourcePolicyGroupPlacementPolicy | Resource policy for instances for placement configuration. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instanceSchedulePolicy` | ResourcePolicyInstanceSchedulePolicy | Resource policy for scheduling instance operations. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#resource_policies for resource policies. |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `region` | string | — |
| `resourceStatus` | ResourcePolicyResourceStatus | Output only. \[Output Only\] The system status of the resource policy. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `snapshotSchedulePolicy` | ResourcePolicySnapshotSchedulePolicy | Resource policy for persistent disks for creating snapshots. |
| `status` | string enum | Output only. \[Output Only\] The status of resource policy creation. Values: `CREATING`, `DELETING`, `EXPIRED`, `INVALID`, `READY`. |
| `workloadPolicy` | ResourcePolicyWorkloadPolicy | Resource policy for defining instance placement for MIGs. |

### `ResourcePolicy` (alpha)

- Represents a Resource Policy resource. You can use resource policies to schedule actions for some Compute Engine resources. For example, you can use them toschedule persistent disk snapshots.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | — |
| `diskConsistencyGroupPolicy` | ResourcePolicyDiskConsistencyGroupPolicy | Resource policy for disk consistency groups. |
| `groupPlacementPolicy` | ResourcePolicyGroupPlacementPolicy | Resource policy for instances for placement configuration. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instanceSchedulePolicy` | ResourcePolicyInstanceSchedulePolicy | Resource policy for scheduling instance operations. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#resource_policies for resource policies. |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `region` | string | — |
| `resourceStatus` | ResourcePolicyResourceStatus | Output only. \[Output Only\] The system status of the resource policy. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `snapshotSchedulePolicy` | ResourcePolicySnapshotSchedulePolicy | Resource policy for persistent disks for creating snapshots. |
| `status` | string enum | Output only. \[Output Only\] The status of resource policy creation. Values: `CREATING`, `DELETING`, `EXPIRED`, `INVALID`, `READY`. |
| `vmMaintenancePolicy` | ResourcePolicyVmMaintenancePolicy | Resource policy applicable to VMs for infrastructure maintenance. |
| `workloadPolicy` | ResourcePolicyWorkloadPolicy | Resource policy for defining instance placement for MIGs. |

### `ResourcePolicyAggregatedList`

- Contains a list of resourcePolicies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of ResourcePolicy resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ResourcePolicyDailyCycle`

- Time window specified for daily operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `daysInCycle` | integer (int32) | Defines a schedule with units measured in days. The value determines how many days pass between the start of each cycle. |
| `duration` | string | Output only. \[Output only\] A predetermined duration for the window, automatically chosen to be the smallest possible in the given scenario. |
| `startTime` | string | Start time of the window. This must be in UTC format that resolves to one of 00:00, 04:00, 08:00,12:00, 16:00, or 20:00. For example, both 13:00-5 and 08:00 are valid. |

### `ResourcePolicyDiskConsistencyGroupPolicy`

- Resource policy for disk consistency groups.
- Version: v1

### `ResourcePolicyGroupPlacementPolicy`

- A GroupPlacementPolicy specifies resource placement configuration. It specifies the failure bucket separation
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorTopologyMode` | string enum | Specifies the connection mode for the accelerator topology. If not specified, the default is AUTO_CONNECT. Values: `AUTO_CONNECT`, `PROVISION_ONLY`. |
| `availabilityDomainCount` | integer (int32) | The number of availability domains to spread instances across. If two instances are in different availability domain, they are not in the same low latency network. |
| `collocation` | string enum | Specifies network collocation Values: `COLLOCATED`, `UNSPECIFIED_COLLOCATION`. |
| `gpuTopology` | string | Specifies the shape of the GPU slice, in slice based GPU families eg. A4X. |
| `vmCount` | integer (int32) | Number of VMs in this placement group. Google does not recommend that you use this field unless you use a compact policy and you want your policy to work only if it contains this exact number of VMs. |

### `ResourcePolicyGroupPlacementPolicy` (alpha)

- A GroupPlacementPolicy specifies resource placement configuration. It specifies the failure bucket separation
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `acceleratorTopologyMode` | string enum | Specifies the connection mode for the accelerator topology. If not specified, the default is AUTO_CONNECT. Values: `AUTO_CONNECT`, `PROVISION_ONLY`. |
| `availabilityDomainCount` | integer (int32) | The number of availability domains to spread instances across. If two instances are in different availability domain, they are not in the same low latency network. |
| `collocation` | string enum | Specifies network collocation Values: `CLUSTERED`, `COLLOCATED`, `MAX_SPREAD`, `UNSPECIFIED_COLLOCATION`. |
| `gpuTopology` | string | Specifies the shape of the GPU slice, in slice based GPU families eg. A4X. |
| `maxDistance` | integer (int32) | Specifies the number of max logical switches. |
| `scope` | string enum | Scope specifies the availability domain to which the VMs should be spread. Values: `HOST`, `UNSPECIFIED_SCOPE`. |
| `sliceCount` | integer (int32) | Specifies the number of slices in a multislice workload. |
| `tpuTopology` | string | Specifies the shape of the TPU slice |
| `vmCount` | integer (int32) | Number of VMs in this placement group. Google does not recommend that you use this field unless you use a compact policy and you want your policy to work only if it contains this exact number of VMs. |

### `ResourcePolicyGroupPlacementPolicy` (beta)

- A GroupPlacementPolicy specifies resource placement configuration. It specifies the failure bucket separation
- Version: beta

| Field | Type | Description |
|---|---|---|
| `acceleratorTopologyMode` | string enum | Specifies the connection mode for the accelerator topology. If not specified, the default is AUTO_CONNECT. Values: `AUTO_CONNECT`, `PROVISION_ONLY`. |
| `availabilityDomainCount` | integer (int32) | The number of availability domains to spread instances across. If two instances are in different availability domain, they are not in the same low latency network. |
| `collocation` | string enum | Specifies network collocation Values: `COLLOCATED`, `UNSPECIFIED_COLLOCATION`. |
| `gpuTopology` | string | Specifies the shape of the GPU slice, in slice based GPU families eg. A4X. |
| `maxDistance` | integer (int32) | Specifies the number of max logical switches. |
| `sliceCount` | integer (int32) | Specifies the number of slices in a multislice workload. |
| `tpuTopology` | string | Specifies the shape of the TPU slice |
| `vmCount` | integer (int32) | Number of VMs in this placement group. Google does not recommend that you use this field unless you use a compact policy and you want your policy to work only if it contains this exact number of VMs. |

### `ResourcePolicyHourlyCycle`

- Time window specified for hourly operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string | Output only. \[Output only\] Duration of the time window, automatically chosen to be smallest possible in the given scenario. |
| `hoursInCycle` | integer (int32) | Defines a schedule with units measured in hours. The value determines how many hours pass between the start of each cycle. |
| `startTime` | string | Time within the window to start the operations. It must be in format "HH:MM", where HH : \[00-23\] and MM : \[00-00\] GMT. |

### `ResourcePolicyInstanceSchedulePolicy`

- An InstanceSchedulePolicy specifies when and how frequent certain operations are performed on the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expirationTime` | string | The expiration time of the schedule. The timestamp is an RFC3339 string. |
| `startTime` | string | The start time of the schedule. The timestamp is an RFC3339 string. |
| `timeZone` | string | Specifies the time zone to be used in interpreting Schedule.schedule. The value of this field must be a time zone name from the tz database: https://wikipedia.org/wiki/Tz_database. |
| `vmStartSchedule` | ResourcePolicyInstanceSchedulePolicySchedule | Specifies the schedule for starting instances. |
| `vmStopSchedule` | ResourcePolicyInstanceSchedulePolicySchedule | Specifies the schedule for stopping instances. |

### `ResourcePolicyInstanceSchedulePolicySchedule`

- Schedule for an instance operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `schedule` | string | Specifies the frequency for the operation, using the unix-cron format. |

### `ResourcePolicyList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `items` | array<ResourcePolicy> | \[Output Only\] A list of ResourcePolicy resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource.Alwayscompute#resourcePoliciesList for listsof resourcePolicies |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ResourcePolicyResourceStatus`

- Contains output only fields. Use this sub-message for all output fields set on ResourcePolicy. The internal structure of this "status" field should mimic the structure of ResourcePolicy proto specification.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceSchedulePolicy` | ResourcePolicyResourceStatusInstanceSchedulePolicyStatus | Output only. \[Output Only\] Specifies a set of output values reffering to the instance_schedule_policy system status. This field should have the same name as corresponding policy field. |

### `ResourcePolicyResourceStatusInstanceSchedulePolicyStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastRunStartTime` | string | Output only. \[Output Only\] The last time the schedule successfully ran. The timestamp is an RFC3339 string. |
| `nextRunStartTime` | string | Output only. \[Output Only\] The next time the schedule is planned to run. The actual time might be slightly different. The timestamp is an RFC3339 string. |

### `ResourcePolicySnapshotSchedulePolicy`

- A snapshot schedule policy specifies when and how frequently snapshots are to be created for the target disk. Also specifies how many and how long these scheduled snapshots should be retained.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `retentionPolicy` | ResourcePolicySnapshotSchedulePolicyRetentionPolicy | Retention policy applied to snapshots created by this resource policy. |
| `schedule` | ResourcePolicySnapshotSchedulePolicySchedule | A Vm Maintenance Policy specifies what kind of infrastructure maintenance we are allowed to perform on this VM and when. Schedule that is applied to disks covered by this policy. |
| `snapshotProperties` | ResourcePolicySnapshotSchedulePolicySnapshotProperties | Properties with which snapshots are created such as labels, encryption keys. |

### `ResourcePolicySnapshotSchedulePolicyRetentionPolicy`

- Policy for retention of scheduled snapshots.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxRetentionDays` | integer (int32) | Maximum age of the snapshot that is allowed to be kept. |
| `onSourceDiskDelete` | string enum | Specifies the behavior to apply to scheduled snapshots when the source disk is deleted. Values: `APPLY_RETENTION_POLICY`, `KEEP_AUTO_SNAPSHOTS`, `UNSPECIFIED_ON_SOURCE_DISK_DELETE`. |

### `ResourcePolicySnapshotSchedulePolicyRetentionPolicy` (alpha)

- Policy for retention of scheduled snapshots.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `maxRetentionDays` | integer (int32) | Maximum age of the snapshot that is allowed to be kept. |
| `onPolicySwitch` | string enum | — Values: `DO_NOT_RETROACTIVELY_APPLY`, `RETROACTIVELY_APPLY`, `UNSPECIFIED_ON_POLICY_SWITCH`. |
| `onSourceDiskDelete` | string enum | Specifies the behavior to apply to scheduled snapshots when the source disk is deleted. Values: `APPLY_RETENTION_POLICY`, `KEEP_AUTO_SNAPSHOTS`, `UNSPECIFIED_ON_SOURCE_DISK_DELETE`. |

### `ResourcePolicySnapshotSchedulePolicySchedule`

- A schedule for disks where the schedueled operations are performed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dailySchedule` | ResourcePolicyDailyCycle | — |
| `hourlySchedule` | ResourcePolicyHourlyCycle | — |
| `weeklySchedule` | ResourcePolicyWeeklyCycle | — |

### `ResourcePolicySnapshotSchedulePolicySnapshotProperties`

- Specified snapshot properties for scheduled snapshots created by this policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `chainName` | string | Chain name that the snapshot is created in. |
| `guestFlush` | boolean | Indication to perform a 'guest aware' snapshot. |
| `labels` | object | Labels to apply to scheduled snapshots. These can be later modified by the setLabels method. Label values may be empty. |
| `storageLocations` | array<string> | Cloud Storage bucket storage location of the auto snapshot (regional or multi-regional). |

### `ResourcePolicySnapshotSchedulePolicySnapshotProperties` (beta)

- Specified snapshot properties for scheduled snapshots created by this policy.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `chainName` | string | Chain name that the snapshot is created in. |
| `guestFlush` | boolean | Indication to perform a 'guest aware' snapshot. |
| `labels` | object | Labels to apply to scheduled snapshots. These can be later modified by the setLabels method. Label values may be empty. |
| `region` | string | Region where the snapshot is scoped to. |
| `storageLocations` | array<string> | Cloud Storage bucket storage location of the auto snapshot (regional or multi-regional). |

### `ResourcePolicyVmMaintenancePolicy`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `concurrencyControlGroup` | ResourcePolicyVmMaintenancePolicyConcurrencyControl | — |
| `maintenanceWindow` | ResourcePolicyVmMaintenancePolicyMaintenanceWindow | Maintenance windows that are applied to VMs covered by this policy. |

### `ResourcePolicyVmMaintenancePolicyConcurrencyControl`

- A concurrency control configuration. Defines a group config that, when attached to an instance, recognizes that instance as part of a group of instances where only up the concurrency_limit of instances in that group can undergo simultaneous maintenance. For more information: (internal link)
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `concurrencyLimit` | integer (int32) | — |

### `ResourcePolicyVmMaintenancePolicyMaintenanceWindow`

- A maintenance window for VMs. When set, we restrict our maintenance operations to this window.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `dailyMaintenanceWindow` | ResourcePolicyDailyCycle | — |

### `ResourcePolicyWeeklyCycle`

- Time window specified for weekly operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dayOfWeeks` | array<ResourcePolicyWeeklyCycleDayOfWeek> | Up to 7 intervals/windows, one for each day of the week. |

### `ResourcePolicyWeeklyCycleDayOfWeek`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | string enum | Defines a schedule that runs on specific days of the week. Specify one or more days. The following options are available: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY. Values: `FRIDAY`, `INVALID`, `MONDAY`, `SATURDAY`, `SUNDAY`, `THURSDAY`, `TUESDAY`, `WEDNESDAY`. |
| `duration` | string | Output only. \[Output only\] Duration of the time window, automatically chosen to be smallest possible in the given scenario. |
| `startTime` | string | Time within the window to start the operations. It must be in format "HH:MM", where HH : \[00-23\] and MM : \[00-00\] GMT. |

### `ResourcePolicyWorkloadPolicy`

- Represents the workload policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorTopology` | string | Specifies the topology required to create a partition for VMs that have interconnected GPUs. |
| `acceleratorTopologyMode` | string enum | Specifies the connection mode for the accelerator topology. If not specified, the default is AUTO_CONNECT. Values: `AUTO_CONNECT`, `PROVISION_ONLY`. |
| `maxTopologyDistance` | string enum | Specifies the maximum distance between instances. Values: `BLOCK`, `CLUSTER`, `SUBBLOCK`. |
| `type` | string enum | Specifies the intent of the instance placement in the MIG. Values: `HIGH_AVAILABILITY`, `HIGH_THROUGHPUT`. |

### `ResourceStatus`

- Contains output only fields. Use this sub-message for actual values set on Instance attributes as compared to the value requested by the user (intent) in their instance CRUD calls.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `effectiveInstanceMetadata` | ResourceStatusEffectiveInstanceMetadata | Output only. \[Output Only\] Effective metadata is a field that consolidates project, zonal instance settings, and instance-level predefined metadata keys to provide the overridden value for those metadata keys at the instance level. |
| `physicalHost` | string | Output only. \[Output Only\] The precise location of your instance within the zone's data center, including the block, sub-block, and host. The field is formatted as follows: blockId/subBlockId/hostId. |
| `physicalHostTopology` | ResourceStatusPhysicalHostTopology | Output only. \[Output Only\] A series of fields containing the global name of the Compute Engine cluster, as well as the ID of the block, sub-block, and host on which the running instance is located. |
| `reservationConsumptionInfo` | ResourceStatusReservationConsumptionInfo | Output only. \[Output Only\] Reservation information that the instance is consuming from. |
| `scheduling` | ResourceStatusScheduling | — |
| `shutdownDetails` | ResourceStatusShutdownDetails | Output only. \[Output Only\] Details about the instance stopping state. |
| `upcomingMaintenance` | UpcomingMaintenance | — |

### `ResourceStatus` (alpha)

- Contains output only fields. Use this sub-message for actual values set on Instance attributes as compared to the value requested by the user (intent) in their instance CRUD calls.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `acceleratorStatus` | array<ResourceStatusAcceleratorStatus> | Output only. \[Output Only\] Accelerators status show results of GPU scans. These scans are specialized diagnostic tests designed to uncover latent manufacturing defects or other issues that could potentially lead to data corruption or impede the customer's ability to efficiently execute GPU workloads. |
| `consumedReservation` | string | Output only. \[Output Only\] The full resource name of the reservation that this instance is consuming from. |
| `consumedReservationBlock` | string | Output only. \[Output Only\] The full resource name of the reservation block that this instance is consuming from. |
| `effectiveInstanceMetadata` | ResourceStatusEffectiveInstanceMetadata | Output only. \[Output Only\] Effective metadata is a field that consolidates project, zonal instance settings, and instance-level predefined metadata keys to provide the overridden value for those metadata keys at the instance level. |
| `lastInstanceTerminationDetails` | ResourceStatusLastInstanceTerminationDetails | Output only. \[Output Only\] Contains last termination details why the instance was terminated. |
| `physicalHost` | string | Output only. \[Output Only\] The precise location of your instance within the zone's data center, including the block, sub-block, and host. The field is formatted as follows: blockId/subBlockId/hostId. |
| `physicalHostTopology` | ResourceStatusPhysicalHostTopology | Output only. \[Output Only\] A series of fields containing the global name of the Compute Engine cluster, as well as the ID of the block, sub-block, and host on which the running instance is located. |
| `reservationConsumptionInfo` | ResourceStatusReservationConsumptionInfo | Output only. \[Output Only\] Reservation information that the instance is consuming from. |
| `scheduling` | ResourceStatusScheduling | — |
| `serviceIntegrationStatuses` | object | \[Output Only\] Represents the status of the service integration specs defined by the user in instance.serviceIntegrationSpecs. |
| `shutdownDetails` | ResourceStatusShutdownDetails | Output only. \[Output Only\] Details about the instance stopping state. |
| `upcomingMaintenance` | UpcomingMaintenance | — |

### Shape of `RegionAutoscalerList`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "id": "string",
  "items": "array<Autoscaler>",
  "kind": "string",
  "nextPageToken": "string",
  "selfLink": "string",
  "warning": "object"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Google-internal `go/` short links in the Discovery descriptions are replaced with `(internal link)`; they are not reachable outside Google.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
