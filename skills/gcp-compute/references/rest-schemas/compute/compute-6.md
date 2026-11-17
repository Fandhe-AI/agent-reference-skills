---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 6/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `InstanceGroupManagersDeleteInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<string> | The URLs of one or more instances to delete. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. Queued instances do not have URL and can be deleted only by name. One cannot specify both URLs and names in a single request. |
| `skipInstancesOnValidationError` | boolean | Specifies whether the request should proceed despite the inclusion of instances that are not members of the group or that are already in the process of being deleted or abandoned. If this field is set to `false` and such an instance is specified in the request, the operation fails. The operation always fails if the request contains a malformed instance URL or a reference to an instance that exists in a zone or region other than the group's zone or region. |

### `InstanceGroupManagersDeleteInstancesRequest` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `instanceNames` | array<string> | The list of instance names to delete. Queued instances do not have URL and can be deleted only by name. You cannot specify both URLs and names in a single request. |
| `instances` | array<string> | The URLs of one or more instances to delete. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. Queued instances do not have URL and can be deleted only by name. One cannot specify both URLs and names in a single request. |
| `skipInstancesOnValidationError` | boolean | Specifies whether the request should proceed despite the inclusion of instances that are not members of the group or that are already in the process of being deleted or abandoned. If this field is set to `false` and such an instance is specified in the request, the operation fails. The operation always fails if the request contains a malformed instance URL or a reference to an instance that exists in a zone or region other than the group's zone or region. |

### `InstanceGroupManagersDeletePerInstanceConfigsReq`

- InstanceGroupManagers.deletePerInstanceConfigs
- Version: v1

| Field | Type | Description |
|---|---|---|
| `names` | array<string> | The list of instance names for which we want to delete per-instance configs on this managed instance group. |

### `InstanceGroupManagersGetAvailableAcceleratorTopologiesResponse`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `acceleratorTopologiesInfo` | object | The accelerator topology information returned per id of the topology location. |
| `multiMig` | string | URL to MMIG this MIG belongs to. |

### `InstanceGroupManagersGetAvailableAcceleratorTopologiesResponseAcceleratorTopologyInfo`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `acceleratorTopology` | string | Topology in the format of: "16x16", "4x4x4", etc. |
| `acceleratorTopologyHealth` | string enum | — Values: `DEGRADED`, `HEALTHY`, `UNHEALTHY`. |
| `acceleratorTopologyState` | InstanceGroupManagersGetAvailableAcceleratorTopologiesResponseAcceleratorTopologyState | — |
| `instancesHealth` | string enum | — Values: `ALL_HEALTHY`, `UNHEALTHY_OR_MISSING`. |
| `parent` | string | Identified by the topology Id in the accelerator_topology_info map. Empty for the top-level topology |

### `InstanceGroupManagersGetAvailableAcceleratorTopologiesResponseAcceleratorTopologyState`

- Specifies the topology state
- Version: beta

| Field | Type | Description |
|---|---|---|
| `currentState` | string enum | — Values: `ACTIVATING`, `ACTIVE`, `ACTIVE_DEGRADED`, `DEACTIVATING`, `FAILED`, `INACTIVE`, `INCOMPLETE`. |
| `error` | object | Reason why the topology state change failed |
| `errorTimestamp` | string (google-datetime) | Timestamp when the last error happened |
| `externalId` | string | Identifier of the accelerator topology assigned externally to differentiate who is the owner of the topology. This is set in ConfigureAcceleratorTopologies. If it is provided on activating the sub-slice it will have to be provided on deactivating as well. This identifier is cleared on successful deform of a sub-slice. |

### `InstanceGroupManagersListErrorsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<InstanceManagedByIgmError> | Output only. The list of errors of the managed instance group. |
| `nextPageToken` | string | Output only. This token allows you to get the next page of results for list requests. If the number of results is larger than maxResults , then use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |

### `InstanceGroupManagersListManagedInstancesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `managedInstances` | array<ManagedInstance> | Output only. \[Output Only\] The list of instances in the managed instance group. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |

### `InstanceGroupManagersListPerInstanceConfigsResp`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<PerInstanceConfig> | Output only. \[Output Only\] The list of PerInstanceConfig. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `warning` | object | Output only. \[Output Only\] Informational warning message. |

### `InstanceGroupManagersPatchPerInstanceConfigsReq`

- InstanceGroupManagers.patchPerInstanceConfigs
- Version: v1

| Field | Type | Description |
|---|---|---|
| `perInstanceConfigs` | array<PerInstanceConfig> | The list of per-instance configurations to insert or patch on this managed instance group. |

### `InstanceGroupManagersRecreateInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<string> | The URLs of one or more instances to recreate. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |

### `InstanceGroupManagersResizeAdvancedRequest`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `noCreationRetries` | boolean | If this flag is true, the managed instance group attempts to create all instances initiated by this resize request only once. If there is an error during creation, the managed instance group does not retry create this instance, and we will decrease the targetSize of the request instead. If the flag is false, the group attempts to recreate each instance continuously until it succeeds. This flag matters only in the first attempt of creation of an instance. After an instance is successfully created while this flag is enabled, the instance behaves the same way as all the other instances created with a regular resize request. In particular, if a running instance dies unexpectedly at a later time and needs to be recreated, this mode does not affect the recreation behavior in that scenario. This flag is applicable only to the current resize request. It does not influence other resize requests in any way. You can see which instances is being creating in which mode by calling the get or listManagedInstances API. |
| `targetSize` | integer (int32) | The number of running instances that the managed instance group should maintain at any given time. The group automatically adds or removes instances to maintain the number of instances specified by this parameter. |

### `InstanceGroupManagersResizeAdvancedRequest` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `noCreationRetries` | boolean | If this flag is true, the managed instance group attempts to create all instances initiated by this resize request only once. If there is an error during creation, the managed instance group does not retry create this instance, and we will decrease the targetSize of the request instead. If the flag is false, the group attempts to recreate each instance continuously until it succeeds. This flag matters only in the first attempt of creation of an instance. After an instance is successfully created while this flag is enabled, the instance behaves the same way as all the other instances created with a regular resize request. In particular, if a running instance dies unexpectedly at a later time and needs to be recreated, this mode does not affect the recreation behavior in that scenario. This flag is applicable only to the current resize request. It does not influence other resize requests in any way. You can see which instances is being creating in which mode by calling the get or listManagedInstances API. |
| `scaleInProtection` | boolean | If this flag is enabled within a request to decrease a MIG's target size, then the MIG declines that request. |
| `targetSize` | integer (int32) | The number of running instances that the managed instance group should maintain at any given time. The group automatically adds or removes instances to maintain the number of instances specified by this parameter. |

### `InstanceGroupManagersResumeInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<string> | The URLs of one or more instances to resume. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |

### `InstanceGroupManagersScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceGroupManagers` | array<InstanceGroupManager> | Output only. The list of managed instance groups that are contained in the specified project and zone. |
| `warning` | object | Output only. The warning that replaces the list of managed instance groups when the list is empty. |

### `InstanceGroupManagersSetAutoHealingRequest`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `autoHealingPolicies` | array<InstanceGroupManagerAutoHealingPolicy> | — |

### `InstanceGroupManagersSetInstanceTemplateRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceTemplate` | string | The URL of the instance template that is specified for this managed instance group. The group uses this template to create all new instances in the managed instance group. The templates for existing instances in the group do not change unless you run recreateInstances, runapplyUpdatesToInstances, or set the group'supdatePolicy.type to PROACTIVE. |

### `InstanceGroupManagersSetTargetPoolsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fingerprint` | string (byte) | The fingerprint of the target pools information. Use this optional property to prevent conflicts when multiple users change the target pools settings concurrently. Obtain the fingerprint with theinstanceGroupManagers.get method. Then, include the fingerprint in your request to ensure that you do not overwrite changes that were applied from another concurrent request. |
| `targetPools` | array<string> | The list of target pool URLs that instances in this managed instance group belong to. The managed instance group applies these target pools to all of the instances in the group. Existing instances and new instances in the group all receive these target pool settings. |

### `InstanceGroupManagersStartInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<string> | The URLs of one or more instances to start. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |

### `InstanceGroupManagersStopInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `forceStop` | boolean | If this flag is set to true, the Instance Group Manager will proceed to stop the instances, skipping initialization on them. |
| `instances` | array<string> | The URLs of one or more instances to stop. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |

### `InstanceGroupManagersSuspendInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `forceSuspend` | boolean | If this flag is set to true, the Instance Group Manager will proceed to suspend the instances, skipping initialization on them. |
| `instances` | array<string> | The URLs of one or more instances to suspend. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |

### `InstanceGroupManagersUpdatePerInstanceConfigsReq`

- InstanceGroupManagers.updatePerInstanceConfigs
- Version: v1

| Field | Type | Description |
|---|---|---|
| `perInstanceConfigs` | array<PerInstanceConfig> | The list of per-instance configurations to insert or patch on this managed instance group. |

### `InstanceGroupsAddInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<InstanceReference> | The list of instances to add to the instance group. |

### `InstanceGroupsListInstances`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InstanceWithNamedPorts> | A list of InstanceWithNamedPorts resources. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#instanceGroupsListInstances for the list of instances in the specified instance group. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | Output only. \[Output Only\] Informational warning message. |

### `InstanceGroupsListInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceState` | string enum | A filter for the state of the instances in the instance group. Valid options are ALL or RUNNING. If you do not specify this parameter the list includes all instances regardless of their state. Values: `ALL`, `RUNNING`. |

### `InstanceGroupsRemoveInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<InstanceReference> | The list of instances to remove from the instance group. |

### `InstanceGroupsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceGroups` | array<InstanceGroup> | Output only. \[Output Only\] The list ofinstance groups that are contained in this scope. |
| `warning` | object | Output only. \[Output Only\] An informational warning that replaces the list of instance groups when the list is empty. |

### `InstanceGroupsSetNamedPortsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fingerprint` | string (byte) | The fingerprint of the named ports information for this instance group. Use this optional property to prevent conflicts when multiple users change the named ports settings concurrently. Obtain the fingerprint with theinstanceGroups.get method. Then, include the fingerprint in your request to ensure that you do not overwrite changes that were applied from another concurrent request. A request with an incorrect fingerprint will fail with error412 conditionNotMet. |
| `namedPorts` | array<NamedPort> | The list of named ports to set for this instance group. |

### `InstanceList`

- Contains a list of instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Instance> | A list of Instance resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#instanceList for lists of Instance resources. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InstanceListReferrers`

- Contains a list of instance referrers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Reference> | A list of Reference resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#instanceListReferrers for lists of Instance referrers. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InstanceManagedByIgmError`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | InstanceManagedByIgmErrorManagedInstanceError | Output only. Contents of the error. |
| `instanceActionDetails` | InstanceManagedByIgmErrorInstanceActionDetails | Output only. Details of the instance action that triggered this error. May be null, if the error was not caused by an action on an instance. This field is optional. |
| `timestamp` | string | Output only. The time that this error occurred. This value is in RFC3339 text format. |

### `InstanceManagedByIgmErrorInstanceActionDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Output only. Action that managed instance group was executing on the instance when the error occurred. Possible values: Values: `ABANDONING`, `CREATING`, `CREATING_WITHOUT_RETRIES`, `DELETING`, `NONE`, `RECREATING`, `REFRESHING`, `RESTARTING`, `RESUMING`, `STARTING`, `STOPPING`, `SUSPENDING`, `VERIFYING`. |
| `instance` | string | Output only. The URL of the instance. The URL can be set even if the instance has not yet been created. |
| `version` | ManagedInstanceVersion | Output only. Version this instance was created from, or was being created from, but the creation failed. Corresponds to one of the versions that were set on the Instance Group Manager resource at the time this instance was being created. |

### `InstanceManagedByIgmErrorManagedInstanceError`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string | Output only. Error code. |
| `message` | string | Output only. Error message. |

### `InstanceManagementInterface`

- Represents Out-of-Band (OOB) Host Management Interface configuration details for direct host control.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `authenticationConfig` | InstanceManagementInterfaceAuthenticationConfig | The authentication configuration for secure connection. |
| `ipv4Address` | string | The IPv4 internal IP address assigned to this management interface endpoint. This address will be used by the customer to route traffic to the management interface. |
| `ipv6Address` | string | The IPv6 internal IP address assigned to this management interface endpoint. This address will be used by the customer to route traffic to the management interface if IPv6 is supported and configured. |
| `network` | string | The URL of the VPC network to which the management interface endpoint is attached. The customer must ensure that this network is correctly configured for routing to the instance. |
| `state` | string enum | Output only. \[Output Only\] The current state of the management interface endpoint. Values: `ACTIVE`, `INACTIVE`, `PENDING`, `STATE_UNSPECIFIED`. |
| `subnetwork` | string | The URL of the subnetwork from which to assign the IP address for the endpoint. The subnetwork must belong to the specified network and have available IP addresses. |
| `type` | string enum | Required. The type of management service this interface provides. Supported types include HOST_MANAGEMENT for direct host control. Values: `HOST_MANAGEMENT`, `TYPE_UNSPECIFIED`. |

### `InstanceManagementInterfaceAuthenticationConfig`

- Authentication configuration for the management interface, typically using mTLS.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `trustConfig` | string | Required. Resource name of the Cloud Certificate Manager TrustConfig used to validate client certificates for mTLS. Format: projects/{project}/locations/{location}/trustConfigs/{trust_config} |

### `InstanceMoveRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationZone` | string | The URL of the destination zone to move the instance. This can be a full or partial URL. For example, the following are all valid URLs to a zone: - https://www.googleapis.com/compute/v1/projects/project/zones/zone - projects/project/zones/zone - zones/zone |
| `targetInstance` | string | The URL of the target instance to move. This can be a full or partial URL. For example, the following are all valid URLs to an instance: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance - projects/project/zones/zone/instances/instance - zones/zone/instances/instance |

### `InstanceParams`

- Additional instance params.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestValidForDuration` | Duration | Relative deadline for waiting for capacity. Relevant only for Instances.Insert API. |
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the instance. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |

### `InstanceProperties`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advancedMachineFeatures` | AdvancedMachineFeatures | Controls for advanced machine-related behavior features. Note that for MachineImage, this is not supported yet. |
| `canIpForward` | boolean | Enables instances created based on these properties to send packets with source IP addresses other than their own and receive packets with destination IP addresses other than their own. If these instances will be used as an IP gateway or it will be set as the next-hop in a Route resource, specify true. If unsure, leave this set tofalse. See theEnable IP forwarding documentation for more information. |
| `confidentialInstanceConfig` | ConfidentialInstanceConfig | Specifies the Confidential Instance options. Note that for MachineImage, this is not supported yet. |
| `description` | string | An optional text description for the instances that are created from these properties. |
| `disks` | array<AttachedDisk> | An array of disks that are associated with the instances that are created from these properties. |
| `guestAccelerators` | array<AcceleratorConfig> | A list of guest accelerator cards' type and count to use for instances created from these properties. |
| `keyRevocationActionType` | string enum | KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified. Values: `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `NONE`, `STOP`. |
| `labels` | object | Labels to apply to instances that are created from these properties. |
| `localSsdEncryptionMode` | string enum | Specifies which method should be used for encrypting the Local SSDs attached to the VM. Values: `EPHEMERAL_KEY_ENCRYPTION`, `LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED`, `STANDARD_ENCRYPTION`. |
| `machineType` | string | The machine type to use for instances that are created from these properties. This field only accepts a machine type name, for example `n2-standard-4`. If you use the machine type full or partial URL, for example `projects/my-l7ilb-project/zones/us-central1-a/machineTypes/n2-standard-4`, the request will result in an `INTERNAL_ERROR`. |
| `metadata` | Metadata | The metadata key/value pairs to assign to instances that are created from these properties. These pairs can consist of custom metadata or predefined keys. SeeProject and instance metadata for more information. |
| `minCpuPlatform` | string | Minimum cpu/platform to be used by instances. The instance may be scheduled on the specified or newer cpu/platform. Applicable values are the friendly names of CPU platforms, such asminCpuPlatform: "Intel Haswell" orminCpuPlatform: "Intel Sandy Bridge". For more information, read Specifying a Minimum CPU Platform. |
| `networkInterfaces` | array<NetworkInterface> | An array of network access configurations for this interface. |
| `networkPerformanceConfig` | NetworkPerformanceConfig | Note that for MachineImage, this is not supported yet. |
| `privateIpv6GoogleAccess` | string enum | The private IPv6 google access type for VMs. If not specified, use INHERIT_FROM_SUBNETWORK as default. Note that for MachineImage, this is not supported yet. Values: `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE`, `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE`, `INHERIT_FROM_SUBNETWORK`. |
| `reservationAffinity` | ReservationAffinity | Specifies the reservations that instances can consume from. Note that for MachineImage, this is not supported yet. |
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the instance. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |
| `resourcePolicies` | array<string> | Resource policies (names, not URLs) applied to instances created from these properties. Note that for MachineImage, this is not supported yet. |
| `scheduling` | Scheduling | Specifies the scheduling options for the instances that are created from these properties. |
| `serviceAccounts` | array<ServiceAccount> | A list of service accounts with specified scopes. Access tokens for these service accounts are available to the instances that are created from these properties. Use metadata queries to obtain the access tokens for these instances. |
| `shieldedInstanceConfig` | ShieldedInstanceConfig | Note that for MachineImage, this is not supported yet. |
| `tags` | Tags | A list of tags to apply to the instances that are created from these properties. The tags identify valid sources or targets for network firewalls. The setTags method can modify this list of tags. Each tag within the list must comply with RFC1035. |
| `workloadIdentityConfig` | WorkloadIdentityConfig | — |

### `InstanceProperties` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `advancedMachineFeatures` | AdvancedMachineFeatures | Controls for advanced machine-related behavior features. Note that for MachineImage, this is not supported yet. |
| `canIpForward` | boolean | Enables instances created based on these properties to send packets with source IP addresses other than their own and receive packets with destination IP addresses other than their own. If these instances will be used as an IP gateway or it will be set as the next-hop in a Route resource, specify true. If unsure, leave this set tofalse. See theEnable IP forwarding documentation for more information. |
| `confidentialInstanceConfig` | ConfidentialInstanceConfig | Specifies the Confidential Instance options. Note that for MachineImage, this is not supported yet. |
| `description` | string | An optional text description for the instances that are created from these properties. |
| `disks` | array<AttachedDisk> | An array of disks that are associated with the instances that are created from these properties. |
| `displayDevice` | DisplayDevice | Display Device properties to enable support for remote display products like: Teradici, VNC and TeamViewer Note that for MachineImage, this is not supported yet. |
| `guestAccelerators` | array<AcceleratorConfig> | A list of guest accelerator cards' type and count to use for instances created from these properties. |
| `identity` | string | — |
| `identityCertificate` | boolean | — |
| `keyRevocationActionType` | string enum | KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified. Values: `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `NONE`, `STOP`. |
| `labels` | object | Labels to apply to instances that are created from these properties. |
| `localSsdEncryptionMode` | string enum | Specifies which method should be used for encrypting the Local SSDs attached to the VM. Values: `CMEK_ENCRYPTION`, `EPHEMERAL_KEY_ENCRYPTION`, `LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED`, `STANDARD_ENCRYPTION`. |
| `machineType` | string | The machine type to use for instances that are created from these properties. This field only accepts a machine type name, for example `n2-standard-4`. If you use the machine type full or partial URL, for example `projects/my-l7ilb-project/zones/us-central1-a/machineTypes/n2-standard-4`, the request will result in an `INTERNAL_ERROR`. |
| `metadata` | Metadata | The metadata key/value pairs to assign to instances that are created from these properties. These pairs can consist of custom metadata or predefined keys. SeeProject and instance metadata for more information. |
| `minCpuPlatform` | string | Minimum cpu/platform to be used by instances. The instance may be scheduled on the specified or newer cpu/platform. Applicable values are the friendly names of CPU platforms, such asminCpuPlatform: "Intel Haswell" orminCpuPlatform: "Intel Sandy Bridge". For more information, read Specifying a Minimum CPU Platform. |
| `networkInterfaces` | array<NetworkInterface> | An array of network access configurations for this interface. |
| `networkPerformanceConfig` | NetworkPerformanceConfig | Note that for MachineImage, this is not supported yet. |
| `partnerMetadata` | object | Partner Metadata assigned to the instance properties. A map from a subdomain (namespace) to entries map. |
| `postKeyRevocationActionType` | string enum | PostKeyRevocationActionType of the instance. Values: `NOOP`, `POST_KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `SHUTDOWN`. |
| `privateIpv6GoogleAccess` | string enum | The private IPv6 google access type for VMs. If not specified, use INHERIT_FROM_SUBNETWORK as default. Note that for MachineImage, this is not supported yet. Values: `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE`, `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE`, `INHERIT_FROM_SUBNETWORK`. |
| `reservationAffinity` | ReservationAffinity | Specifies the reservations that instances can consume from. Note that for MachineImage, this is not supported yet. |
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the instance. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |
| `resourcePolicies` | array<string> | Resource policies (names, not URLs) applied to instances created from these properties. Note that for MachineImage, this is not supported yet. |
| `scheduling` | Scheduling | Specifies the scheduling options for the instances that are created from these properties. |
| `secureTags` | array<string> | \[Input Only\] Secure tags to apply to this instance. Maximum number of secure tags allowed is 50. Note that for MachineImage, this is not supported yet. |
| `serviceAccounts` | array<ServiceAccount> | A list of service accounts with specified scopes. Access tokens for these service accounts are available to the instances that are created from these properties. Use metadata queries to obtain the access tokens for these instances. |
| `serviceIntegrationSpecs` | object | Mapping of user defined keys to ServiceIntegrationSpec. |
| `shieldedInstanceConfig` | ShieldedInstanceConfig | Note that for MachineImage, this is not supported yet. |
| `shieldedVmConfig` | ShieldedVmConfig | Specifies the Shielded VM options for the instances that are created from these properties. |
| `tags` | Tags | A list of tags to apply to the instances that are created from these properties. The tags identify valid sources or targets for network firewalls. The setTags method can modify this list of tags. Each tag within the list must comply with RFC1035. |
| `workloadIdentityConfig` | WorkloadIdentityConfig | — |

### `InstanceProperties` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `advancedMachineFeatures` | AdvancedMachineFeatures | Controls for advanced machine-related behavior features. Note that for MachineImage, this is not supported yet. |
| `canIpForward` | boolean | Enables instances created based on these properties to send packets with source IP addresses other than their own and receive packets with destination IP addresses other than their own. If these instances will be used as an IP gateway or it will be set as the next-hop in a Route resource, specify true. If unsure, leave this set tofalse. See theEnable IP forwarding documentation for more information. |
| `confidentialInstanceConfig` | ConfidentialInstanceConfig | Specifies the Confidential Instance options. Note that for MachineImage, this is not supported yet. |
| `description` | string | An optional text description for the instances that are created from these properties. |
| `disks` | array<AttachedDisk> | An array of disks that are associated with the instances that are created from these properties. |
| `displayDevice` | DisplayDevice | Display Device properties to enable support for remote display products like: Teradici, VNC and TeamViewer Note that for MachineImage, this is not supported yet. |
| `guestAccelerators` | array<AcceleratorConfig> | A list of guest accelerator cards' type and count to use for instances created from these properties. |
| `keyRevocationActionType` | string enum | KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified. Values: `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `NONE`, `STOP`. |
| `labels` | object | Labels to apply to instances that are created from these properties. |
| `localSsdEncryptionMode` | string enum | Specifies which method should be used for encrypting the Local SSDs attached to the VM. Values: `CMEK_ENCRYPTION`, `EPHEMERAL_KEY_ENCRYPTION`, `LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED`, `STANDARD_ENCRYPTION`. |
| `machineType` | string | The machine type to use for instances that are created from these properties. This field only accepts a machine type name, for example `n2-standard-4`. If you use the machine type full or partial URL, for example `projects/my-l7ilb-project/zones/us-central1-a/machineTypes/n2-standard-4`, the request will result in an `INTERNAL_ERROR`. |
| `metadata` | Metadata | The metadata key/value pairs to assign to instances that are created from these properties. These pairs can consist of custom metadata or predefined keys. SeeProject and instance metadata for more information. |
| `minCpuPlatform` | string | Minimum cpu/platform to be used by instances. The instance may be scheduled on the specified or newer cpu/platform. Applicable values are the friendly names of CPU platforms, such asminCpuPlatform: "Intel Haswell" orminCpuPlatform: "Intel Sandy Bridge". For more information, read Specifying a Minimum CPU Platform. |
| `networkInterfaces` | array<NetworkInterface> | An array of network access configurations for this interface. |
| `networkPerformanceConfig` | NetworkPerformanceConfig | Note that for MachineImage, this is not supported yet. |
| `partnerMetadata` | object | Partner Metadata assigned to the instance properties. A map from a subdomain (namespace) to entries map. |
| `postKeyRevocationActionType` | string enum | PostKeyRevocationActionType of the instance. Values: `NOOP`, `POST_KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `SHUTDOWN`. |
| `privateIpv6GoogleAccess` | string enum | The private IPv6 google access type for VMs. If not specified, use INHERIT_FROM_SUBNETWORK as default. Note that for MachineImage, this is not supported yet. Values: `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE`, `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE`, `INHERIT_FROM_SUBNETWORK`. |
| `reservationAffinity` | ReservationAffinity | Specifies the reservations that instances can consume from. Note that for MachineImage, this is not supported yet. |
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the instance. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |
| `resourcePolicies` | array<string> | Resource policies (names, not URLs) applied to instances created from these properties. Note that for MachineImage, this is not supported yet. |
| `scheduling` | Scheduling | Specifies the scheduling options for the instances that are created from these properties. |
| `serviceAccounts` | array<ServiceAccount> | A list of service accounts with specified scopes. Access tokens for these service accounts are available to the instances that are created from these properties. Use metadata queries to obtain the access tokens for these instances. |
| `shieldedInstanceConfig` | ShieldedInstanceConfig | Note that for MachineImage, this is not supported yet. |
| `shieldedVmConfig` | ShieldedVmConfig | Specifies the Shielded VM options for the instances that are created from these properties. |
| `tags` | Tags | A list of tags to apply to the instances that are created from these properties. The tags identify valid sources or targets for network firewalls. The setTags method can modify this list of tags. Each tag within the list must comply with RFC1035. |
| `workloadIdentityConfig` | WorkloadIdentityConfig | — |

### `InstanceProperties` (preview)

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `advancedMachineFeatures` | AdvancedMachineFeatures | Controls for advanced machine-related behavior features. Note that for MachineImage, this is not supported yet. |
| `canIpForward` | boolean | Enables instances created based on these properties to send packets with source IP addresses other than their own and receive packets with destination IP addresses other than their own. If these instances will be used as an IP gateway or it will be set as the next-hop in a Route resource, specify true. If unsure, leave this set tofalse. See theEnable IP forwarding documentation for more information. |
| `confidentialInstanceConfig` | ConfidentialInstanceConfig | Specifies the Confidential Instance options. Note that for MachineImage, this is not supported yet. |
| `deletionProtection` | boolean | Whether the resource should be protected against deletion. |
| `description` | string | An optional text description for the instances that are created from these properties. |
| `disks` | array<AttachedDisk> | An array of disks that are associated with the instances that are created from these properties. |
| `guestAccelerators` | array<AcceleratorConfig> | A list of guest accelerator cards' type and count to use for instances created from these properties. |
| `keyRevocationActionType` | string enum | KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified. Values: `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `NONE`, `STOP`. |
| `labels` | object | Labels to apply to instances that are created from these properties. |
| `localSsdEncryptionMode` | string enum | Specifies which method should be used for encrypting the Local SSDs attached to the VM. Values: `EPHEMERAL_KEY_ENCRYPTION`, `LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED`, `STANDARD_ENCRYPTION`. |
| `machineType` | string | The machine type to use for instances that are created from these properties. This field only accepts a machine type name, for example `n2-standard-4`. If you use the machine type full or partial URL, for example `projects/my-l7ilb-project/zones/us-central1-a/machineTypes/n2-standard-4`, the request will result in an `INTERNAL_ERROR`. |
| `metadata` | Metadata | The metadata key/value pairs to assign to instances that are created from these properties. These pairs can consist of custom metadata or predefined keys. SeeProject and instance metadata for more information. |
| `minCpuPlatform` | string | Minimum cpu/platform to be used by instances. The instance may be scheduled on the specified or newer cpu/platform. Applicable values are the friendly names of CPU platforms, such asminCpuPlatform: "Intel Haswell" orminCpuPlatform: "Intel Sandy Bridge". For more information, read Specifying a Minimum CPU Platform. |
| `networkInterfaces` | array<NetworkInterface> | An array of network access configurations for this interface. |
| `networkPerformanceConfig` | NetworkPerformanceConfig | Note that for MachineImage, this is not supported yet. |
| `privateIpv6GoogleAccess` | string enum | The private IPv6 google access type for VMs. If not specified, use INHERIT_FROM_SUBNETWORK as default. Note that for MachineImage, this is not supported yet. Values: `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE`, `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE`, `INHERIT_FROM_SUBNETWORK`. |
| `reservationAffinity` | ReservationAffinity | Specifies the reservations that instances can consume from. Note that for MachineImage, this is not supported yet. |
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the instance. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |
| `resourcePolicies` | array<string> | Resource policies (names, not URLs) applied to instances created from these properties. Note that for MachineImage, this is not supported yet. |
| `scheduling` | Scheduling | Specifies the scheduling options for the instances that are created from these properties. |
| `serviceAccounts` | array<ServiceAccount> | A list of service accounts with specified scopes. Access tokens for these service accounts are available to the instances that are created from these properties. Use metadata queries to obtain the access tokens for these instances. |
| `shieldedInstanceConfig` | ShieldedInstanceConfig | Note that for MachineImage, this is not supported yet. |
| `tags` | Tags | A list of tags to apply to the instances that are created from these properties. The tags identify valid sources or targets for network firewalls. The setTags method can modify this list of tags. Each tag within the list must comply with RFC1035. |
| `workloadIdentityConfig` | WorkloadIdentityConfig | — |

### `InstancePropertiesPatch`

- Represents the change that you want to make to the instance properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exposeHostTopology` | boolean | This optional flag exposes the hashed physical host ID. |
| `labels` | object | The label key-value pairs that you want to patch onto the instance. |
| `metadata` | object | The metadata key-value pairs that you want to patch onto the instance. For more information, see Project and instance metadata. |

### `InstanceReference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instance` | string | The URL for a specific instance. @required compute.instancegroups.addInstances/removeInstances |

### `InstanceSettings`

- Represents a Instance Settings resource. You can use instance settings to configure default settings for Compute Engine VM instances. For example, you can use it to configure default machine type of Compute Engine VM instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fingerprint` | string (byte) | Specifies a fingerprint for instance settings, which is essentially a hash of the instance settings resource's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update the instance settings resource. You must always provide an up-to-date fingerprint hash in order to update or change the resource, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the resource. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#instance_settings for instance settings. |
| `metadata` | InstanceSettingsMetadata | The metadata key/value pairs assigned to all the instances in the corresponding scope. |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the resource resides You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `InstanceSettings` (alpha)

- Represents a Instance Settings resource. You can use instance settings to configure default settings for Compute Engine VM instances. For example, you can use it to configure default machine type of Compute Engine VM instances.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `email` | string | Email address of the service account. |
| `fingerprint` | string (byte) | Specifies a fingerprint for instance settings, which is essentially a hash of the instance settings resource's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update the instance settings resource. You must always provide an up-to-date fingerprint hash in order to update or change the resource, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the resource. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#instance_settings for instance settings. |
| `metadata` | InstanceSettingsMetadata | The metadata key/value pairs assigned to all the instances in the corresponding scope. |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the resource resides You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `InstanceSettingsMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | object | A metadata key/value items map. The total size of all keys and values must be less than 512KB. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#metadata for metadata. |

### `InstanceTemplate`

- Represents an Instance Template resource. Google Compute Engine has two Instance Template resources: \* Global \* Regional You can reuse a global instance template in different regions whereas you can use a regional instance template in a specified region only. If you want to reduce cross-region dependency or achieve data residency, use a regional instance template. To create VMs, managed instance groups, and reservations, you can use either global or regional instance templates. For more information, readInstance Templates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] The creation timestamp for this instance template inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] A unique identifier for this instance template. The server defines this identifier. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#instanceTemplate for instance templates. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `properties` | InstanceProperties | The instance properties for this instance template. |
| `region` | string | Output only. \[Output Only\] URL of the region where the instance template resides. Only applicable for regional resources. |
| `selfLink` | string | Output only. \[Output Only\] The URL for this instance template. The server defines this URL. |
| `sourceInstance` | string | The source instance used to create the template. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance - projects/project/zones/zone/instances/instance |
| `sourceInstanceParams` | SourceInstanceParams | The source instance params to use to create this instance template. |

### `InstanceTemplate` (alpha)

- Represents an Instance Template resource. Google Compute Engine has two Instance Template resources: \* Global \* Regional You can reuse a global instance template in different regions whereas you can use a regional instance template in a specified region only. If you want to reduce cross-region dependency or achieve data residency, use a regional instance template. To create VMs, managed instance groups, and reservations, you can use either global or regional instance templates. For more information, readInstance Templates.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] The creation timestamp for this instance template inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] A unique identifier for this instance template. The server defines this identifier. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#instanceTemplate for instance templates. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `properties` | InstanceProperties | The instance properties for this instance template. |
| `region` | string | Output only. \[Output Only\] URL of the region where the instance template resides. Only applicable for regional resources. |
| `selfLink` | string | Output only. \[Output Only\] The URL for this instance template. The server defines this URL. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `sourceInstance` | string | The source instance used to create the template. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance - projects/project/zones/zone/instances/instance |
| `sourceInstanceParams` | SourceInstanceParams | The source instance params to use to create this instance template. |

### `InstanceTemplateAggregatedList`

- Contains a list of InstanceTemplatesScopedList.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of InstanceTemplatesScopedList resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InstanceTemplateList`

- A list of instance templates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InstanceTemplate> | A list of InstanceTemplate resources. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#instanceTemplatesListResponse for instance template lists. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InstanceTemplatesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceTemplates` | array<InstanceTemplate> | \[Output Only\] A list of instance templates that are contained within the specified project and zone. |
| `warning` | object | \[Output Only\] An informational warning that replaces the list of instance templates when the list is empty. |

### `InstanceWithNamedPorts`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instance` | string | Output only. \[Output Only\] The URL of the instance. |
| `namedPorts` | array<NamedPort> | Output only. \[Output Only\] The named ports that belong to this instance group. |
| `status` | string enum | Output only. \[Output Only\] The status of the instance. Values: `DEPROVISIONING`, `PENDING`, `PENDING_STOP`, `PROVISIONING`, `REPAIRING`, `RUNNING`, `STAGING`, `STOPPED`, `STOPPING`, `SUSPENDED`, `SUSPENDING`, `TERMINATED`. |

### `InstancesAddResourcePoliciesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourcePolicies` | array<string> | Resource policies to be added to this instance. |

### `InstancesBulkInsertOperationMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `perLocationStatus` | object | Status information per location (location name is key). Example key: zones/us-central1-a |

### `InstancesGetEffectiveFirewallsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `firewallPolicys` | array<InstancesGetEffectiveFirewallsResponseEffectiveFirewallPolicy> | \[Output Only\] Effective firewalls from firewall policies. |
| `firewalls` | array<Firewall> | Effective firewalls on the instance. |

### `InstancesGetEffectiveFirewallsResponse` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `firewallPolicys` | array<InstancesGetEffectiveFirewallsResponseEffectiveFirewallPolicy> | \[Output Only\] Effective firewalls from firewall policies. |
| `firewalls` | array<Firewall> | Effective firewalls on the instance. |
| `organizationFirewalls` | array<InstancesGetEffectiveFirewallsResponseOrganizationFirewallPolicy> | Effective firewalls from organization policies. |

### `InstancesGetEffectiveFirewallsResponseEffectiveFirewallPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Output only. \[Output Only\] Deprecated, please use short name instead. The display name of the firewall policy. |
| `name` | string | Output only. \[Output Only\] The name of the firewall policy. |
| `packetMirroringRules` | array<FirewallPolicyRule> | Output only. \[Output Only\] The packet mirroring rules that apply to the instance. |
| `priority` | integer (int32) | Output only. \[Output only\] Priority of firewall policy association. Not applicable for type=HIERARCHY. |
| `rules` | array<FirewallPolicyRule> | \[Output Only\] The rules that apply to the instance. Only rules that target the specific VM instance are returned if target service accounts or target secure tags are specified in the rules. |
| `shortName` | string | Output only. \[Output Only\] The short name of the firewall policy. |
| `type` | string enum | Output only. \[Output Only\] The type of the firewall policy. Can be one of HIERARCHY, NETWORK, NETWORK_REGIONAL, SYSTEM_GLOBAL, SYSTEM_REGIONAL. Values: `HIERARCHY`, `NETWORK`, `NETWORK_REGIONAL`, `SYSTEM_GLOBAL`, `SYSTEM_REGIONAL`, `UNSPECIFIED`. |

### `InstancesGetEffectiveFirewallsResponseOrganizationFirewallPolicy`

- A pruned SecurityPolicy containing ID and any applicable firewall rules.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `id` | string (uint64) | Output only. The unique identifier for the security policy. This identifier is defined by the server. |
| `rules` | array<SecurityPolicyRule> | The rules that apply to the network. |

### `InstancesRemoveResourcePoliciesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourcePolicies` | array<string> | Resource policies to be removed from this instance. |

### `InstancesReportHostAsFaultyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disruptionSchedule` | string enum | The disruption schedule for the VM. Required field, only allows IMMEDIATE. Values: `DISRUPTION_SCHEDULE_UNSPECIFIED`, `FUTURE`, `IMMEDIATE`. |
| `faultReasons` | array<InstancesReportHostAsFaultyRequestFaultReason> | — |

### `InstancesReportHostAsFaultyRequest` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `actionHint` | string enum | The action hint to report the host as faulty. Values: `ACTION_HINT_UNSPECIFIED`, `DIAGNOSE_AND_REPAIR`, `EXECUTE_ALL_RECOMMENDED_SCANS`. |
| `disruptionSchedule` | string enum | The disruption schedule for the VM. Required field, only allows IMMEDIATE. Values: `DISRUPTION_SCHEDULE_UNSPECIFIED`, `FUTURE`, `IMMEDIATE`. |
| `faultReasons` | array<InstancesReportHostAsFaultyRequestFaultReason> | — |

### `InstancesReportHostAsFaultyRequestFaultReason`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `behavior` | string enum | — Values: `BEHAVIOR_UNSPECIFIED`, `CHIP_ERROR`, `PERFORMANCE`, `SILENT_DATA_CORRUPTION`, `UNRECOVERABLE_GPU_ERROR`. |
| `description` | string | — |

### `InstancesResumeRequest`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `disks` | array<CustomerEncryptionKeyProtectedDisk> | Array of disks associated with this instance that are protected with acustomer-supplied encryption key. In order to resume the instance, the disk url and its corresponding key must be provided. If the disk is not protected with a customer-supplied encryption key it should not be specified. |
| `instanceEncryptionKey` | CustomerEncryptionKey | Decrypts data associated with an instance that is protected with acustomer-supplied encryption key. If the instance you are starting is protected with a customer-supplied encryption key, the correct key must be provided otherwise the instance resume will not succeed. |

### `InstancesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<Instance> | \[Output Only\] A list of instances contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of instances when the list is empty. |

### `InstancesSetLabelsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labelFingerprint` | string (byte) | Fingerprint of the previous set of labels for this resource, used to prevent conflicts. Provide the latest fingerprint value when making a request to add or change labels. |
| `labels` | object | — |

### `InstancesSetMachineResourcesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `guestAccelerators` | array<AcceleratorConfig> | A list of the type and count of accelerator cards attached to the instance. |

### `InstancesSetMachineTypeRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `machineType` | string | Full or partial URL of the machine type resource. See Machine Types for a full list of machine types. For example:zones/us-central1-f/machineTypes/n1-standard-1 |

### `InstancesSetMinCpuPlatformRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `minCpuPlatform` | string | Minimum cpu/platform this instance should be started at. |

### `InstancesSetNameRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentName` | string | The current name of this resource, used to prevent conflicts. Provide the latest name when making a request to change name. |
| `name` | string | The name to be applied to the instance. Needs to be RFC 1035 compliant. |

### `InstancesSetSecurityPolicyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkInterfaces` | array<string> | The network interfaces that the security policy will be applied to. Network interfaces use the nicN naming format. You can only set a security policy for network interfaces with an access config. |
| `securityPolicy` | string | A full or partial URL to a security policy to add to this instance. If this field is set to an empty string it will remove the associated security policy. |

### `InstancesSetServiceAccountRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | Email address of the service account. |
| `scopes` | array<string> | The list of scopes to be made available for this service account. |

### `InstancesStartWithEncryptionKeyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disks` | array<CustomerEncryptionKeyProtectedDisk> | Array of disks associated with this instance that are protected with acustomer-supplied encryption key. In order to start the instance, the disk url and its corresponding key must be provided. If the disk is not protected with a customer-supplied encryption key it should not be specified. |

### `InstancesStartWithEncryptionKeyRequest` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `disks` | array<CustomerEncryptionKeyProtectedDisk> | Array of disks associated with this instance that are protected with acustomer-supplied encryption key. In order to start the instance, the disk url and its corresponding key must be provided. If the disk is not protected with a customer-supplied encryption key it should not be specified. |
| `instanceEncryptionKey` | CustomerEncryptionKey | Decrypts data associated with an instance that is protected with acustomer-supplied encryption key. If the instance you are starting is protected with a customer-supplied encryption key, the correct key must be provided otherwise the instance start will not succeed. |

### `InstancesTroubleshootOperationMetadata`

- \[Output Only\] Operation metadata for instances.troubleshoot.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `troubleshootOutput` | string | Output only. \[Output Only\] Serialized output of the troubleshooting diagnostic run. |

### `InstantSnapshot`

- Represents a InstantSnapshot resource. You can use instant snapshots to create disk rollback points quickly..
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | Output only. \[Output Only\] The architecture of the instant snapshot. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `diskSizeGb` | string (int64) | Output only. \[Output Only\] Size of the source disk, specified in GB. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#instantSnapshot for InstantSnapshot resources. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this InstantSnapshot, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a InstantSnapshot. |
| `labels` | object | Labels to apply to this InstantSnapshot. These can be later modified by the setLabels method. Label values may be empty. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | InstantSnapshotParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | Output only. \[Output Only\] URL of the region where the instant snapshot resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `resourceStatus` | InstantSnapshotResourceStatus | Output only. \[Output Only\] Status information for the instant snapshot resource. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `sourceDisk` | string | URL of the source disk used to create this instant snapshot. Note that the source disk must be in the same zone/region as the instant snapshot to be created. This can be a full or valid partial URL. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - https://www.googleapis.com/compute/v1/projects/project/regions/region/disks/disk - projects/project/zones/zone/disks/disk - projects/project/regions/region/disks/disk - zones/zone/disks/disk - regions/region/disks/disk |
| `sourceDiskId` | string | Output only. \[Output Only\] The ID value of the disk used to create this InstantSnapshot. This value may be used to determine whether the InstantSnapshot was taken from the current or a previous instance of a given disk name. |
| `sourceInstantSnapshotGroup` | string | Output only. \[Output Only\] URL of the source instant snapshot this instant snapshot is part of. Note that the source instant snapshot group must be in the same zone/region as the instant snapshot to be created. This can be a full or valid partial URL. |
| `sourceInstantSnapshotGroupId` | string | Output only. \[Output Only\] The ID value of the source instant snapshot group this InstantSnapshot is part of. This value may be used to determine whether the InstantSnapshot was created as part of an InstantSnapshotGroup creation. |
| `status` | string enum | Output only. \[Output Only\] The status of the instantSnapshot. This can beCREATING, DELETING, FAILED, orREADY. Values: `CREATING`, `DELETING`, `FAILED`, `READY`, `UNAVAILABLE`. |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the instant snapshot resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `InstantSnapshot` (alpha)

- Represents a InstantSnapshot resource. You can use instant snapshots to create disk rollback points quickly..
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | Output only. \[Output Only\] The architecture of the instant snapshot. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `diskSizeGb` | string (int64) | Output only. \[Output Only\] Size of the source disk, specified in GB. |
| `guestFlush` | boolean | Whether to attempt an application consistent instant snapshot by informing the OS to prepare for the snapshot process. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#instantSnapshot for InstantSnapshot resources. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this InstantSnapshot, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a InstantSnapshot. |
| `labels` | object | Labels to apply to this InstantSnapshot. These can be later modified by the setLabels method. Label values may be empty. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | InstantSnapshotParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | Output only. \[Output Only\] URL of the region where the instant snapshot resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `resourceStatus` | InstantSnapshotResourceStatus | Output only. \[Output Only\] Status information for the instant snapshot resource. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `sourceDisk` | string | URL of the source disk used to create this instant snapshot. Note that the source disk must be in the same zone/region as the instant snapshot to be created. This can be a full or valid partial URL. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - https://www.googleapis.com/compute/v1/projects/project/regions/region/disks/disk - projects/project/zones/zone/disks/disk - projects/project/regions/region/disks/disk - zones/zone/disks/disk - regions/region/disks/disk |
| `sourceDiskId` | string | Output only. \[Output Only\] The ID value of the disk used to create this InstantSnapshot. This value may be used to determine whether the InstantSnapshot was taken from the current or a previous instance of a given disk name. |
| `sourceInstantSnapshotGroup` | string | Output only. \[Output Only\] URL of the source instant snapshot this instant snapshot is part of. Note that the source instant snapshot group must be in the same zone/region as the instant snapshot to be created. This can be a full or valid partial URL. |
| `sourceInstantSnapshotGroupId` | string | Output only. \[Output Only\] The ID value of the source instant snapshot group this InstantSnapshot is part of. This value may be used to determine whether the InstantSnapshot was created as part of an InstantSnapshotGroup creation. |
| `status` | string enum | Output only. \[Output Only\] The status of the instantSnapshot. This can beCREATING, DELETING, FAILED, orREADY. Values: `CREATING`, `DELETING`, `FAILED`, `READY`, `UNAVAILABLE`. |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the instant snapshot resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `InstantSnapshotAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of InstantSnapshotsScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#instantSnapshotAggregatedList for aggregated lists of instantSnapshots. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InstantSnapshotGroup`

- Represents an InstantSnapshotGroup resource. An instant snapshot group is a set of instant snapshots that represents a point in time state of a consistency group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | Optional. An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#instantSnapshotGroup for InstantSnapshotGroup resources. |
| `name` | string | Identifier. Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `region` | string | Output only. \[Output Only\] URL of the region where the instant snapshot group resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `resourceStatus` | InstantSnapshotGroupResourceStatus | — |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `sourceConsistencyGroup` | string | — |
| `status` | string enum | Output only. \[Output Only\] Values: `CREATING`, `DELETING`, `FAILED`, `INVALID`, `READY`, `UNKNOWN`. |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the instant snapshot group resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `InstantSnapshotGroupParameters`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sourceInstantSnapshotGroup` | string | The source instant snapshot group used to create disks. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instantSnapshotGroups/instantSnapshotGroup - projects/project/zones/zone/instantSnapshotGroups/instantSnapshotGroup - zones/zone/instantSnapshotGroups/instantSnapshotGroup |

### `InstantSnapshotGroupResourceStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consistencyMembershipResolutionTime` | string (google-datetime) | Output only. \[Output Only\] |
| `sourceInfo` | InstantSnapshotGroupSourceInfo | Output only. \[Output Only\] |

### `InstantSnapshotGroupSourceInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consistencyGroup` | string | — |
| `consistencyGroupId` | string | — |

### `InstantSnapshotList`

- Contains a list of InstantSnapshot resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InstantSnapshot> | A list of InstantSnapshot resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InstantSnapshotParams`

- Additional instant snapshot params.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the instant snapshot. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |

### `InstantSnapshotResourceStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `storageSizeBytes` | string (int64) | \[Output Only\] The storage size of this instant snapshot. |

### `InstantSnapshotsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instantSnapshots` | array<InstantSnapshot> | \[Output Only\] A list of instantSnapshots contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of instantSnapshots when the list is empty. |

### `Int64RangeMatch`

- HttpRouteRuleMatch criteria for field values that must stay within the specified integer range.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rangeEnd` | string (int64) | The end of the range (exclusive) in signed long integer format. |
| `rangeStart` | string (int64) | The start of the range (inclusive) in signed long integer format. |

### `Interconnect`

- Represents an Interconnect resource. An Interconnect resource is a dedicated connection between the Google Cloud network and your on-premises network. For more information, read the Dedicated Interconnect Overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aaiEnabled` | boolean | Enable or disable the application awareness feature on this Cloud Interconnect. |
| `adminEnabled` | boolean | Administrative status of the interconnect. When this is set to true, the Interconnect is functional and can carry traffic. When set to false, no packets can be carried over the interconnect and no BGP routes are exchanged over it. By default, the status is set to true. |
| `applicationAwareInterconnect` | InterconnectApplicationAwareInterconnect | Configuration information for application awareness on this Cloud Interconnect. |
| `availableFeatures` | array<string> | \[Output only\] List of features available for this Interconnect connection, which can take one of the following values: - IF_MACSEC: If present, then the Interconnect connection is provisioned on MACsec capable hardware ports. If not present, then the Interconnect connection is provisioned on non-MACsec capable ports. Any attempt to enable MACsec will fail. - IF_CROSS_SITE_NETWORK: If present, then the Interconnect connection is provisioned exclusively for Cross-Site Networking. Any attempt to configure VLAN attachments will fail. If not present, then the Interconnect connection is not provisioned for Cross-Site Networking. Any attempt to use it for Cross-Site Networking will fail. Values: `IF_CROSS_SITE_NETWORK`, `IF_L2_FORWARDING`, `IF_MACSEC`. |
| `circuitInfos` | array<InterconnectCircuitInfo> | Output only. \[Output Only\] A list of CircuitInfo objects, that describe the individual circuits in this LAG. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `customerName` | string | Customer name, to put in the Letter of Authorization as the party authorized to request a crossconnect. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `effectiveLocation` | string | Output only. URL of the InterconnectLocation object that represents where this connection is to be provisioned. By default it will be the same as the location field. |
| `expectedOutages` | array<InterconnectOutageNotification> | Output only. \[Output Only\] A list of outages expected for this Interconnect. |
| `googleIpAddress` | string | Output only. \[Output Only\] IP address configured on the Google side of the Interconnect link. This can be used only for ping tests. |
| `googleReferenceId` | string | Output only. \[Output Only\] Google reference ID to be used when raising support tickets with Google or otherwise to debug backend connectivity issues. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `interconnectAttachments` | array<string> | Output only. \[Output Only\] A list of the URLs of all InterconnectAttachments configured to use this Interconnect. |
| `interconnectGroups` | array<string> | Output only. \[Output Only\] URLs of InterconnectGroups that include this Interconnect. Order is arbitrary and items are unique. |
| `interconnectType` | string enum | Type of interconnect, which can take one of the following values: - PARTNER: A partner-managed interconnection shared between customers though a partner. - DEDICATED: A dedicated physical interconnection with the customer. Note that a value IT_PRIVATE has been deprecated in favor of DEDICATED. Values: `DEDICATED`, `IT_PRIVATE`, `PARTNER`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#interconnect for interconnects. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this Interconnect, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an Interconnect. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `linkType` | string enum | Type of link requested, which can take one of the following values: - LINK_TYPE_ETHERNET_10G_LR: A 10G Ethernet with LR optics - LINK_TYPE_ETHERNET_100G_LR: A 100G Ethernet with LR optics. - LINK_TYPE_ETHERNET_400G_LR4: A 400G Ethernet with LR4 optics. Note that this field indicates the speed of each of the links in the bundle, not the speed of the entire bundle. Values: `LINK_TYPE_ETHERNET_100G_LR`, `LINK_TYPE_ETHERNET_10G_LR`, `LINK_TYPE_ETHERNET_400G_LR4`. |
| `location` | string | URL of the InterconnectLocation object that represents where this connection is to be provisioned. |
| `macsec` | InterconnectMacsec | Configuration that enables Media Access Control security (MACsec) on the Cloud Interconnect connection between Google and your on-premises router. |
| `macsecEnabled` | boolean | Enable or disable MACsec on this Interconnect connection. MACsec enablement fails if the MACsec object is not specified. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `nocContactEmail` | string | Email address to contact the customer NOC for operations and maintenance notifications regarding this Interconnect. If specified, this will be used for notifications in addition to all other forms described, such as Cloud Monitoring logs alerting and Cloud Notifications. This field is required for users who sign up for Cloud Interconnect using workforce identity federation. |
| `operationalStatus` | string enum | Output only. \[Output Only\] The current status of this Interconnect's functionality, which can take one of the following values: - OS_ACTIVE: A valid Interconnect, which is turned up and is ready to use. Attachments may be provisioned on this Interconnect. - OS_UNPROVISIONED: An Interconnect that has not completed turnup. No attachments may be provisioned on this Interconnect. - OS_UNDER_MAINTENANCE: An Interconnect that is undergoing internal maintenance. No attachments may be provisioned or updated on this Interconnect. Values: `OS_ACTIVE`, `OS_UNPROVISIONED`. |
| `params` | InterconnectParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `peerIpAddress` | string | Output only. \[Output Only\] IP address configured on the customer side of the Interconnect link. The customer should configure this IP address during turnup when prompted by Google NOC. This can be used only for ping tests. |
| `provisionedLinkCount` | integer (int32) | Output only. \[Output Only\] Number of links actually provisioned in this interconnect. |
| `remoteLocation` | string | Indicates that this is a Cross-Cloud Interconnect. This field specifies the location outside of Google's network that the interconnect is connected to. |
| `requestedFeatures` | array<string> | Optional. This parameter can be provided only with Interconnect INSERT. It isn't valid for Interconnect PATCH. List of features requested for this Interconnect connection, which can take one of the following values: - IF_MACSEC: If specified, then the connection is created on MACsec capable hardware ports. If not specified, non-MACsec capable ports will also be considered. - IF_CROSS_SITE_NETWORK: If specified, then the connection is created exclusively for Cross-Site Networking. The connection can not be used for Cross-Site Networking unless this feature is specified. Values: `IF_CROSS_SITE_NETWORK`, `IF_L2_FORWARDING`, `IF_MACSEC`. |
| `requestedLinkCount` | integer (int32) | Target number of physical links in the link bundle, as requested by the customer. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. Server-defined URL for this resource with the resource id. |
| `state` | string enum | Output only. \[Output Only\] The current state of Interconnect functionality, which can take one of the following values: - ACTIVE: The Interconnect is valid, turned up and ready to use. Attachments may be provisioned on this Interconnect. - UNPROVISIONED: The Interconnect has not completed turnup. No attachments may be provisioned on this Interconnect. - UNDER_MAINTENANCE: The Interconnect is undergoing internal maintenance. No attachments may be provisioned or updated on this Interconnect. Values: `ACTIVE`, `UNPROVISIONED`. |
| `subzone` | string enum | To be deprecated. Values: `SUBZONE_A`, `SUBZONE_B`. |
| `wireGroups` | array<string> | Output only. \[Output Only\] A list of the URLs of all CrossSiteNetwork WireGroups configured to use this Interconnect. The Interconnect cannot be deleted if this list is non-empty. |

### `InterconnectApplicationAwareInterconnect`

- Configuration information for application awareness on this Cloud Interconnect.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bandwidthPercentagePolicy` | InterconnectApplicationAwareInterconnectBandwidthPercentagePolicy | — |
| `profileDescription` | string | Description for the application awareness profile on this Cloud Interconnect. |
| `shapeAveragePercentages` | array<InterconnectApplicationAwareInterconnectBandwidthPercentage> | Optional field to specify a list of shape average percentages to be applied in conjunction with StrictPriorityPolicy or BandwidthPercentagePolicy. |
| `strictPriorityPolicy` | InterconnectApplicationAwareInterconnectStrictPriorityPolicy | — |

### `InterconnectApplicationAwareInterconnectBandwidthPercentage`

- Specify bandwidth percentages \[1-100\] for various traffic classes in BandwidthPercentagePolicy. The sum of all percentages must equal 100. All traffic classes must have a percentage value specified.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `percentage` | integer (uint32) | Bandwidth percentage for a specific traffic class. |
| `trafficClass` | string enum | TrafficClass whose bandwidth percentage is being specified. Values: `TC1`, `TC2`, `TC3`, `TC4`, `TC5`, `TC6`. |

### `InterconnectApplicationAwareInterconnectBandwidthPercentagePolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bandwidthPercentages` | array<InterconnectApplicationAwareInterconnectBandwidthPercentage> | Specify bandwidth percentages for various traffic classes for queuing type Bandwidth Percent. |

### `InterconnectApplicationAwareInterconnectStrictPriorityPolicy`

- Specify configuration for StrictPriorityPolicy.
- Version: v1

### `InterconnectAttachment`

- Represents an Interconnect Attachment (VLAN) resource. You can use Interconnect attachments (VLANS) to connect your Virtual Private Cloud networks to your on-premises networks through an Interconnect. For more information, read Creating VLAN Attachments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminEnabled` | boolean | Determines whether this Attachment will carry packets. Not present for PARTNER_PROVIDER. |
| `attachmentGroup` | string | Output only. \[Output Only\] URL of the AttachmentGroup that includes this Attachment. |
| `bandwidth` | string enum | Provisioned bandwidth capacity for the interconnect attachment. For attachments of type DEDICATED, the user can set the bandwidth. For attachments of type PARTNER, the Google Partner that is operating the interconnect must set the bandwidth. Output only for PARTNER type, mutable for PARTNER_PROVIDER and DEDICATED, and can take one of the following values: - BPS_50M: 50 Mbit/s - BPS_100M: 100 Mbit/s - BPS_200M: 200 Mbit/s - BPS_300M: 300 Mbit/s - BPS_400M: 400 Mbit/s - BPS_500M: 500 Mbit/s - BPS_1G: 1 Gbit/s - BPS_2G: 2 Gbit/s - BPS_5G: 5 Gbit/s - BPS_10G: 10 Gbit/s - BPS_20G: 20 Gbit/s - BPS_50G: 50 Gbit/s - BPS_100G: 100 Gbit/s - BPS_400G: 400 Gbit/s Values: `BPS_100G`, `BPS_100M`, `BPS_10G`, `BPS_1G`, `BPS_200M`, `BPS_20G`, `BPS_2G`, `BPS_300M`, `BPS_400G`, `BPS_400M`, `BPS_500M`, `BPS_50G`, `BPS_50M`, `BPS_5G`. |
| `candidateCloudRouterIpAddress` | string | Single IPv4 address + prefix length to be configured on the cloud router interface for this interconnect attachment. - Both candidate_cloud_router_ip_address and candidate_customer_router_ip_address fields must be set or both must be unset. - Prefix length of both candidate_cloud_router_ip_address and candidate_customer_router_ip_address must be the same. - Max prefix length is 31. |
| `candidateCloudRouterIpv6Address` | string | Single IPv6 address + prefix length to be configured on the cloud router interface for this interconnect attachment. - Both candidate_cloud_router_ipv6_address and candidate_customer_router_ipv6_address fields must be set or both must be unset. - Prefix length of both candidate_cloud_router_ipv6_address and candidate_customer_router_ipv6_address must be the same. - Max prefix length is 126. |
| `candidateCustomerRouterIpAddress` | string | Single IPv4 address + prefix length to be configured on the customer router interface for this interconnect attachment. |
| `candidateCustomerRouterIpv6Address` | string | Single IPv6 address + prefix length to be configured on the customer router interface for this interconnect attachment. |
| `candidateIpv6Subnets` | array<string> | This field is not available. |
| `candidateSubnets` | array<string> | Input only. Up to 16 candidate prefixes that can be used to restrict the allocation of cloudRouterIpAddress and customerRouterIpAddress for this attachment. All prefixes must be within link-local address space (169.254.0.0/16) and must be /29 or shorter (/28, /27, etc). Google will attempt to select an unused /29 from the supplied candidate prefix(es). The request will fail if all possible /29s are in use on Google's edge. If not supplied, Google will randomly select an unused /29 from all of link-local space. |
| `cloudRouterIpAddress` | string | Output only. \[Output Only\] IPv4 address + prefix length to be configured on Cloud Router Interface for this interconnect attachment. |
| `cloudRouterIpv6Address` | string | Output only. \[Output Only\] IPv6 address + prefix length to be configured on Cloud Router Interface for this interconnect attachment. |
| `cloudRouterIpv6InterfaceId` | string | This field is not available. |
| `configurationConstraints` | InterconnectAttachmentConfigurationConstraints | Output only. \[Output Only\] Constraints for this attachment, if any. The attachment does not work if these constraints are not met. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `customerRouterIpAddress` | string | Output only. \[Output Only\] IPv4 address + prefix length to be configured on the customer router subinterface for this interconnect attachment. |
| `customerRouterIpv6Address` | string | Output only. \[Output Only\] IPv6 address + prefix length to be configured on the customer router subinterface for this interconnect attachment. |
| `customerRouterIpv6InterfaceId` | string | This field is not available. |
| `dataplaneVersion` | integer (int32) | Output only. \[Output Only\] Dataplane version for this InterconnectAttachment. This field is only present for Dataplane version 2 and higher. Absence of this field in the API output indicates that the Dataplane is version 1. |
| `description` | string | An optional description of this resource. |
| `edgeAvailabilityDomain` | string enum | Input only. Desired availability domain for the attachment. Only available for type PARTNER, at creation time, and can take one of the following values: - AVAILABILITY_DOMAIN_ANY - AVAILABILITY_DOMAIN_1 - AVAILABILITY_DOMAIN_2 For improved reliability, customers should configure a pair of attachments, one per availability domain. The selected availability domain will be provided to the Partner via the pairing key, so that the provisioned circuit will lie in the specified domain. If not specified, the value will default to AVAILABILITY_DOMAIN_ANY. Values: `AVAILABILITY_DOMAIN_1`, `AVAILABILITY_DOMAIN_2`, `AVAILABILITY_DOMAIN_ANY`. |
| `encryption` | string enum | Indicates the user-supplied encryption option of this VLAN attachment (interconnectAttachment). Can only be specified at attachment creation for PARTNER or DEDICATED attachments. Possible values are: - NONE - This is the default value, which means that the VLAN attachment carries unencrypted traffic. VMs are able to send traffic to, or receive traffic from, such a VLAN attachment. - IPSEC - The VLAN attachment carries only encrypted traffic that is encrypted by an IPsec device, such as an HA VPN gateway or third-party IPsec VPN. VMs cannot directly send traffic to, or receive traffic from, such a VLAN attachment. To use \*HA VPN over Cloud Interconnect\*, the VLAN attachment must be created with this option. Values: `IPSEC`, `NONE`. |
| `googleReferenceId` | string | Output only. \[Output Only\] Google reference ID, to be used when raising support tickets with Google or otherwise to debug backend connectivity issues. \[Deprecated\] This field is not used. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `interconnect` | string | URL of the underlying Interconnect object that this attachment's traffic will traverse through. |
| `ipsecInternalAddresses` | array<string> | A list of URLs of addresses that have been reserved for the VLAN attachment. Used only for the VLAN attachment that has the encryption option as IPSEC. The addresses must be regional internal IP address ranges. When creating an HA VPN gateway over the VLAN attachment, if the attachment is configured to use a regional internal IP address, then the VPN gateway's IP address is allocated from the IP address range specified here. For example, if the HA VPN gateway's interface 0 is paired to this VLAN attachment, then a regional internal IP address for the VPN gateway interface 0 will be allocated from the IP address specified for this VLAN attachment. If this field is not specified when creating the VLAN attachment, then later on when creating an HA VPN gateway on this VLAN attachment, the HA VPN gateway's IP address is allocated from the regional external IP address pool. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#interconnectAttachment for interconnect attachments. |
| `l2Forwarding` | InterconnectAttachmentL2Forwarding | L2 Interconnect Attachment related config. This field is required if the type is L2_DEDICATED. The configuration specifies how VLAN tags (like dot1q, qinq, or dot1ad) within L2 packets are mapped to the destination appliances IP addresses. The packet is then encapsulated with the appliance IP address and sent to the edge appliance. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this InterconnectAttachment, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an InterconnectAttachment. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `mtu` | integer (int32) | Maximum Transmission Unit (MTU), in bytes, of packets passing through this interconnect attachment. Valid values are 1440, 1460, 1500, and 8896. If not specified, the value will default to 1440. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `operationalStatus` | string enum | Output only. \[Output Only\] The current status of whether or not this interconnect attachment is functional, which can take one of the following values: - OS_ACTIVE: The attachment has been turned up and is ready to use. - OS_UNPROVISIONED: The attachment is not ready to use yet, because turnup is not complete. Values: `OS_ACTIVE`, `OS_UNPROVISIONED`. |
| `pairingKey` | string | \[Output only for type PARTNER. Input only for PARTNER_PROVIDER. Not present for DEDICATED\]. The opaque identifier of a PARTNER attachment used to initiate provisioning with a selected partner. Of the form "XXXXX/region/domain" |
| `params` | InterconnectAttachmentParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `partnerAsn` | string (int64) | Optional BGP ASN for the router supplied by a Layer 3 Partner if they configured BGP on behalf of the customer. Output only for PARTNER type, input only for PARTNER_PROVIDER, not available for DEDICATED. |
| `partnerMetadata` | InterconnectAttachmentPartnerMetadata | Informational metadata about Partner attachments from Partners to display to customers. Output only for PARTNER type, mutable for PARTNER_PROVIDER, not available for DEDICATED. |
| `privateInterconnectInfo` | InterconnectAttachmentPrivateInfo | Output only. \[Output Only\] Information specific to an InterconnectAttachment. This property is populated if the interconnect that this is attached to is of type DEDICATED. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional interconnect attachment resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `remoteService` | string | Output only. \[Output Only\] If the attachment is on a Cross-Cloud Interconnect connection, this field contains the interconnect's remote location service provider. Example values: "Amazon Web Services" "Microsoft Azure". The field is set only for attachments on Cross-Cloud Interconnect connections. Its value is copied from the InterconnectRemoteLocation remoteService field. |
| `router` | string | URL of the Cloud Router to be used for dynamic routing. This router must be in the same region as this InterconnectAttachment. The InterconnectAttachment will automatically connect the Interconnect to the network & region within which the Cloud Router is configured. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `stackType` | string enum | The stack type for this interconnect attachment to identify whether the IPv6 feature is enabled or not. If not specified, IPV4_ONLY will be used. This field can be both set at interconnect attachments creation and update interconnect attachment operations. Values: `IPV4_IPV6`, `IPV4_ONLY`. |
| `state` | string enum | Output only. \[Output Only\] The current state of this attachment's functionality. Enum values ACTIVE and UNPROVISIONED are shared by DEDICATED/PRIVATE, PARTNER, and PARTNER_PROVIDER interconnect attachments, while enum values PENDING_PARTNER, PARTNER_REQUEST_RECEIVED, and PENDING_CUSTOMER are used for only PARTNER and PARTNER_PROVIDER interconnect attachments. This state can take one of the following values: - ACTIVE: The attachment has been turned up and is ready to use. - UNPROVISIONED: The attachment is not ready to use yet, because turnup is not complete. - PENDING_PARTNER: A newly-created PARTNER attachment that has not yet been configured on the Partner side. - PARTNER_REQUEST_RECEIVED: A PARTNER attachment is in the process of provisioning after a PARTNER_PROVIDER attachment was created that references it. - PENDING_CUSTOMER: A PARTNER or PARTNER_PROVIDER attachment that is waiting for a customer to activate it. - DEFUNCT: The attachment was deleted externally and is no longer functional. This could be because the associated Interconnect was removed, or because the other side of a Partner attachment was deleted. Values: `ACTIVE`, `DEFUNCT`, `PARTNER_REQUEST_RECEIVED`, `PENDING_CUSTOMER`, `PENDING_PARTNER`, `STATE_UNSPECIFIED`, `UNPROVISIONED`. |
| `subnetLength` | integer (int32) | Input only. Length of the IPv4 subnet mask. Allowed values: - 29 (default) - 30 The default value is 29, except for Cross-Cloud Interconnect connections that use an InterconnectRemoteLocation with a constraints.subnetLengthRange.min equal to 30. For example, connections that use an Azure remote location fall into this category. In these cases, the default value is 30, and requesting 29 returns an error. Where both 29 and 30 are allowed, 29 is preferred, because it gives Google Cloud Support more debugging visibility. |
| `type` | string enum | The type of interconnect attachment this is, which can take one of the following values: - DEDICATED: an attachment to a Dedicated Interconnect. - PARTNER: an attachment to a Partner Interconnect, created by the customer. - PARTNER_PROVIDER: an attachment to a Partner Interconnect, created by the partner. - L2_DEDICATED: a L2 attachment to a Dedicated Interconnect. Values: `DEDICATED`, `L2_DEDICATED`, `PARTNER`, `PARTNER_PROVIDER`. |
| `vlanTag8021q` | integer (int32) | The IEEE 802.1Q VLAN tag for this attachment, in the range 2-4093. Only specified at creation time. |

### `InterconnectAttachment` (alpha)

- Represents an Interconnect Attachment (VLAN) resource. You can use Interconnect attachments (VLANS) to connect your Virtual Private Cloud networks to your on-premises networks through an Interconnect. For more information, read Creating VLAN Attachments.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `adminEnabled` | boolean | Determines whether this Attachment will carry packets. Not present for PARTNER_PROVIDER. |
| `attachmentGroup` | string | Output only. \[Output Only\] URL of the AttachmentGroup that includes this Attachment. |
| `bandwidth` | string enum | Provisioned bandwidth capacity for the interconnect attachment. For attachments of type DEDICATED, the user can set the bandwidth. For attachments of type PARTNER, the Google Partner that is operating the interconnect must set the bandwidth. Output only for PARTNER type, mutable for PARTNER_PROVIDER and DEDICATED, and can take one of the following values: - BPS_50M: 50 Mbit/s - BPS_100M: 100 Mbit/s - BPS_200M: 200 Mbit/s - BPS_300M: 300 Mbit/s - BPS_400M: 400 Mbit/s - BPS_500M: 500 Mbit/s - BPS_1G: 1 Gbit/s - BPS_2G: 2 Gbit/s - BPS_5G: 5 Gbit/s - BPS_10G: 10 Gbit/s - BPS_20G: 20 Gbit/s - BPS_50G: 50 Gbit/s - BPS_100G: 100 Gbit/s - BPS_400G: 400 Gbit/s Values: `BPS_100G`, `BPS_100M`, `BPS_10G`, `BPS_1G`, `BPS_200M`, `BPS_20G`, `BPS_2G`, `BPS_300M`, `BPS_400G`, `BPS_400M`, `BPS_500M`, `BPS_50G`, `BPS_50M`, `BPS_5G`. |
| `candidateCloudRouterIpAddress` | string | Single IPv4 address + prefix length to be configured on the cloud router interface for this interconnect attachment. - Both candidate_cloud_router_ip_address and candidate_customer_router_ip_address fields must be set or both must be unset. - Prefix length of both candidate_cloud_router_ip_address and candidate_customer_router_ip_address must be the same. - Max prefix length is 31. |
| `candidateCloudRouterIpv6Address` | string | Single IPv6 address + prefix length to be configured on the cloud router interface for this interconnect attachment. - Both candidate_cloud_router_ipv6_address and candidate_customer_router_ipv6_address fields must be set or both must be unset. - Prefix length of both candidate_cloud_router_ipv6_address and candidate_customer_router_ipv6_address must be the same. - Max prefix length is 126. |
| `candidateCustomerRouterIpAddress` | string | Single IPv4 address + prefix length to be configured on the customer router interface for this interconnect attachment. |
| `candidateCustomerRouterIpv6Address` | string | Single IPv6 address + prefix length to be configured on the customer router interface for this interconnect attachment. |
| `candidateIpv6Subnets` | array<string> | This field is not available. |
| `candidateSubnets` | array<string> | Input only. Up to 16 candidate prefixes that can be used to restrict the allocation of cloudRouterIpAddress and customerRouterIpAddress for this attachment. All prefixes must be within link-local address space (169.254.0.0/16) and must be /29 or shorter (/28, /27, etc). Google will attempt to select an unused /29 from the supplied candidate prefix(es). The request will fail if all possible /29s are in use on Google's edge. If not supplied, Google will randomly select an unused /29 from all of link-local space. |
| `cloudRouterIpAddress` | string | Output only. \[Output Only\] IPv4 address + prefix length to be configured on Cloud Router Interface for this interconnect attachment. |
| `cloudRouterIpv6Address` | string | Output only. \[Output Only\] IPv6 address + prefix length to be configured on Cloud Router Interface for this interconnect attachment. |
| `cloudRouterIpv6InterfaceId` | string | This field is not available. |
| `configurationConstraints` | InterconnectAttachmentConfigurationConstraints | Output only. \[Output Only\] Constraints for this attachment, if any. The attachment does not work if these constraints are not met. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `customerRouterIpAddress` | string | Output only. \[Output Only\] IPv4 address + prefix length to be configured on the customer router subinterface for this interconnect attachment. |
| `customerRouterIpv6Address` | string | Output only. \[Output Only\] IPv6 address + prefix length to be configured on the customer router subinterface for this interconnect attachment. |
| `customerRouterIpv6InterfaceId` | string | This field is not available. |
| `dataplaneVersion` | integer (int32) | Output only. \[Output Only\] Dataplane version for this InterconnectAttachment. This field is only present for Dataplane version 2 and higher. Absence of this field in the API output indicates that the Dataplane is version 1. |
| `description` | string | An optional description of this resource. |
| `edgeAvailabilityDomain` | string enum | Input only. Desired availability domain for the attachment. Only available for type PARTNER, at creation time, and can take one of the following values: - AVAILABILITY_DOMAIN_ANY - AVAILABILITY_DOMAIN_1 - AVAILABILITY_DOMAIN_2 For improved reliability, customers should configure a pair of attachments, one per availability domain. The selected availability domain will be provided to the Partner via the pairing key, so that the provisioned circuit will lie in the specified domain. If not specified, the value will default to AVAILABILITY_DOMAIN_ANY. Values: `AVAILABILITY_DOMAIN_1`, `AVAILABILITY_DOMAIN_2`, `AVAILABILITY_DOMAIN_ANY`. |
| `encryption` | string enum | Indicates the user-supplied encryption option of this VLAN attachment (interconnectAttachment). Can only be specified at attachment creation for PARTNER or DEDICATED attachments. Possible values are: - NONE - This is the default value, which means that the VLAN attachment carries unencrypted traffic. VMs are able to send traffic to, or receive traffic from, such a VLAN attachment. - IPSEC - The VLAN attachment carries only encrypted traffic that is encrypted by an IPsec device, such as an HA VPN gateway or third-party IPsec VPN. VMs cannot directly send traffic to, or receive traffic from, such a VLAN attachment. To use \*HA VPN over Cloud Interconnect\*, the VLAN attachment must be created with this option. Values: `IPSEC`, `NONE`. |
| `googleReferenceId` | string | Output only. \[Output Only\] Google reference ID, to be used when raising support tickets with Google or otherwise to debug backend connectivity issues. \[Deprecated\] This field is not used. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `interconnect` | string | URL of the underlying Interconnect object that this attachment's traffic will traverse through. |
| `ipsecInternalAddresses` | array<string> | A list of URLs of addresses that have been reserved for the VLAN attachment. Used only for the VLAN attachment that has the encryption option as IPSEC. The addresses must be regional internal IP address ranges. When creating an HA VPN gateway over the VLAN attachment, if the attachment is configured to use a regional internal IP address, then the VPN gateway's IP address is allocated from the IP address range specified here. For example, if the HA VPN gateway's interface 0 is paired to this VLAN attachment, then a regional internal IP address for the VPN gateway interface 0 will be allocated from the IP address specified for this VLAN attachment. If this field is not specified when creating the VLAN attachment, then later on when creating an HA VPN gateway on this VLAN attachment, the HA VPN gateway's IP address is allocated from the regional external IP address pool. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#interconnectAttachment for interconnect attachments. |
| `l2Forwarding` | InterconnectAttachmentL2Forwarding | L2 Interconnect Attachment related config. This field is required if the type is L2_DEDICATED. The configuration specifies how VLAN tags (like dot1q, qinq, or dot1ad) within L2 packets are mapped to the destination appliances IP addresses. The packet is then encapsulated with the appliance IP address and sent to the edge appliance. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this InterconnectAttachment, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an InterconnectAttachment. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `mtu` | integer (int32) | Maximum Transmission Unit (MTU), in bytes, of packets passing through this interconnect attachment. Valid values are 1440, 1460, 1500, and 8896. If not specified, the value will default to 1440. |
| `multicastEnabled` | boolean | Whether or not to permit multicast traffic for this attachment. Multicast packets will be dropped if this is not enabled. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `operationalStatus` | string enum | Output only. \[Output Only\] The current status of whether or not this interconnect attachment is functional, which can take one of the following values: - OS_ACTIVE: The attachment has been turned up and is ready to use. - OS_UNPROVISIONED: The attachment is not ready to use yet, because turnup is not complete. Values: `OS_ACTIVE`, `OS_UNPROVISIONED`. |
| `pairingKey` | string | \[Output only for type PARTNER. Input only for PARTNER_PROVIDER. Not present for DEDICATED\]. The opaque identifier of a PARTNER attachment used to initiate provisioning with a selected partner. Of the form "XXXXX/region/domain" |
| `params` | InterconnectAttachmentParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `partnerAsn` | string (int64) | Optional BGP ASN for the router supplied by a Layer 3 Partner if they configured BGP on behalf of the customer. Output only for PARTNER type, input only for PARTNER_PROVIDER, not available for DEDICATED. |
| `partnerMetadata` | InterconnectAttachmentPartnerMetadata | Informational metadata about Partner attachments from Partners to display to customers. Output only for PARTNER type, mutable for PARTNER_PROVIDER, not available for DEDICATED. |
| `privateInterconnectInfo` | InterconnectAttachmentPrivateInfo | Output only. \[Output Only\] Information specific to an InterconnectAttachment. This property is populated if the interconnect that this is attached to is of type DEDICATED. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional interconnect attachment resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `remoteService` | string | Output only. \[Output Only\] If the attachment is on a Cross-Cloud Interconnect connection, this field contains the interconnect's remote location service provider. Example values: "Amazon Web Services" "Microsoft Azure". The field is set only for attachments on Cross-Cloud Interconnect connections. Its value is copied from the InterconnectRemoteLocation remoteService field. |
| `router` | string | URL of the Cloud Router to be used for dynamic routing. This router must be in the same region as this InterconnectAttachment. The InterconnectAttachment will automatically connect the Interconnect to the network & region within which the Cloud Router is configured. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `stackType` | string enum | The stack type for this interconnect attachment to identify whether the IPv6 feature is enabled or not. If not specified, IPV4_ONLY will be used. This field can be both set at interconnect attachments creation and update interconnect attachment operations. Values: `IPV4_IPV6`, `IPV4_ONLY`. |
| `state` | string enum | Output only. \[Output Only\] The current state of this attachment's functionality. Enum values ACTIVE and UNPROVISIONED are shared by DEDICATED/PRIVATE, PARTNER, and PARTNER_PROVIDER interconnect attachments, while enum values PENDING_PARTNER, PARTNER_REQUEST_RECEIVED, and PENDING_CUSTOMER are used for only PARTNER and PARTNER_PROVIDER interconnect attachments. This state can take one of the following values: - ACTIVE: The attachment has been turned up and is ready to use. - UNPROVISIONED: The attachment is not ready to use yet, because turnup is not complete. - PENDING_PARTNER: A newly-created PARTNER attachment that has not yet been configured on the Partner side. - PARTNER_REQUEST_RECEIVED: A PARTNER attachment is in the process of provisioning after a PARTNER_PROVIDER attachment was created that references it. - PENDING_CUSTOMER: A PARTNER or PARTNER_PROVIDER attachment that is waiting for a customer to activate it. - DEFUNCT: The attachment was deleted externally and is no longer functional. This could be because the associated Interconnect was removed, or because the other side of a Partner attachment was deleted. Values: `ACTIVE`, `DEFUNCT`, `PARTNER_REQUEST_RECEIVED`, `PENDING_CUSTOMER`, `PENDING_PARTNER`, `STATE_UNSPECIFIED`, `UNPROVISIONED`. |
| `subnetLength` | integer (int32) | Input only. Length of the IPv4 subnet mask. Allowed values: - 29 (default) - 30 The default value is 29, except for Cross-Cloud Interconnect connections that use an InterconnectRemoteLocation with a constraints.subnetLengthRange.min equal to 30. For example, connections that use an Azure remote location fall into this category. In these cases, the default value is 30, and requesting 29 returns an error. Where both 29 and 30 are allowed, 29 is preferred, because it gives Google Cloud Support more debugging visibility. |
| `type` | string enum | The type of interconnect attachment this is, which can take one of the following values: - DEDICATED: an attachment to a Dedicated Interconnect. - PARTNER: an attachment to a Partner Interconnect, created by the customer. - PARTNER_PROVIDER: an attachment to a Partner Interconnect, created by the partner. - L2_DEDICATED: a L2 attachment to a Dedicated Interconnect. Values: `DEDICATED`, `L2_DEDICATED`, `PARTNER`, `PARTNER_PROVIDER`. |
| `vlanTag8021q` | integer (int32) | The IEEE 802.1Q VLAN tag for this attachment, in the range 2-4093. Only specified at creation time. |

### `InterconnectAttachmentAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of InterconnectAttachmentsScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#interconnectAttachmentAggregatedList for aggregated lists of interconnect attachments. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InterconnectAttachmentConfigurationConstraints`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bgpMd5` | string enum | Output only. \[Output Only\] Whether the attachment's BGP session requires/allows/disallows BGP MD5 authentication. This can take one of the following values: MD5_OPTIONAL, MD5_REQUIRED, MD5_UNSUPPORTED. For example, a Cross-Cloud Interconnect connection to a remote cloud provider that requires BGP MD5 authentication has the interconnectRemoteLocation attachment_configuration_constraints.bgp_md5 field set to MD5_REQUIRED, and that property is propagated to the attachment. Similarly, if BGP MD5 is MD5_UNSUPPORTED, an error is returned if MD5 is requested. Values: `MD5_OPTIONAL`, `MD5_REQUIRED`, `MD5_UNSUPPORTED`. |
| `bgpPeerAsnRanges` | array<InterconnectAttachmentConfigurationConstraintsBgpPeerASNRange> | Output only. \[Output Only\] List of ASN ranges that the remote location is known to support. Formatted as an array of inclusive ranges {min: min-value, max: max-value}. For example, \[{min: 123, max: 123}, {min: 64512, max: 65534}\] allows the peer ASN to be 123 or anything in the range 64512-65534. This field is only advisory. Although the API accepts other ranges, these are the ranges that we recommend. |

### `InterconnectAttachmentConfigurationConstraintsBgpPeerASNRange`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `max` | integer (uint32) | — |
| `min` | integer (uint32) | — |

### `InterconnectAttachmentGroup`

- An interconnect attachment group resource allows customers to create, analyze, and expand highly available deployments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachments` | object | Attachments in the AttachmentGroup. Keys are arbitrary user-specified strings. Users are encouraged, but not required, to use their preferred format for resource links as keys. Note that there are add-members and remove-members methods in gcloud. The size of this map is limited by an "Attachments per group" quota. |
| `configured` | InterconnectAttachmentGroupConfigured | — |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `etag` | string | Opaque system-generated token that uniquely identifies the configuration. If provided when patching a configuration in update mode, the provided token must match the current token or the update is rejected. This provides a reliable means of doing read-modify-write (optimistic locking) as described byAIP 154. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `intent` | InterconnectAttachmentGroupIntent | — |
| `interconnectGroup` | string | The URL of an InterconnectGroup that groups these Attachments' Interconnects. Customers do not need to set this unless directed by Google Support. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#interconnectAttachmentGroup. |
| `logicalStructure` | InterconnectAttachmentGroupLogicalStructure | — |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |

### `InterconnectAttachmentGroupAttachment`

- An Attachment in this AttachmentGroup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachment` | string | — |

### `InterconnectAttachmentGroupConfigured`

- \[Output Only\] The redundancy this group is configured to support. The way a user queries what SLA their Attachment gets is by looking at this field of the Attachment's AttachmentGroup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availabilitySla` | InterconnectAttachmentGroupConfiguredAvailabilitySLA | — |

### `InterconnectAttachmentGroupConfiguredAvailabilitySLA`

- \[Output Only\] Which SLA this group is configured to support, and why this group does or does not meet that SLA's requirements.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `effectiveSla` | string enum | — Values: `EFFECTIVE_SLA_UNSPECIFIED`, `NO_SLA`, `PRODUCTION_CRITICAL`, `PRODUCTION_NON_CRITICAL`. |
| `intendedSlaBlockers` | array<InterconnectAttachmentGroupConfiguredAvailabilitySLAIntendedSlaBlockers> | — |

### `InterconnectAttachmentGroupConfiguredAvailabilitySLAIntendedSlaBlockers`

- \[Output Only\] Reasons why configuration.availabilitySLA.sla differs from intent.availabilitySLA. This list is empty if and only if those are the same.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachments` | array<string> | Output only. \[Output Only\] URLs of any particular Attachments to explain this blocker in more detail. |
| `blockerType` | string enum | — Values: `BLOCKER_TYPE_UNSPECIFIED`, `INCOMPATIBLE_METROS`, `INCOMPATIBLE_REGIONS`, `MISSING_GLOBAL_ROUTING`, `NO_ATTACHMENTS`, `NO_ATTACHMENTS_IN_METRO_AND_ZONE`, `OTHER`. |
| `documentationLink` | string | Output only. \[Output Only\] The url of Google Cloud public documentation explaining this requirement. This is set for every type of requirement. |
| `explanation` | string | Output only. \[Output Only\] A human-readable explanation of this requirement and why it's not met. This is set for every type of requirement. |
| `metros` | array<string> | Output only. \[Output Only\] Metros used to explain this blocker in more detail. These are three-letter lowercase strings like "iad". This will be set for some blockers (like NO_ATTACHMENTS_IN_METRO_AND_ZONE) but does not apply to others. |
| `regions` | array<string> | Output only. \[Output Only\] Regions used to explain this blocker in more detail. These are region names formatted like "us-central1". This will be set for some blockers (like INCOMPATIBLE_REGIONS) but does not apply to others. |
| `zones` | array<string> | Output only. \[Output Only\] Zones used to explain this blocker in more detail. Format is "zone1" and/or "zone2". This will be set for some blockers (like MISSING_ZONE) but does not apply to others. |

### `InterconnectAttachmentGroupIntent`

- The user's intent for this AttachmentGroup. This is the only required field besides the name that must be specified on group creation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availabilitySla` | string enum | — Values: `AVAILABILITY_SLA_UNSPECIFIED`, `NO_SLA`, `PRODUCTION_CRITICAL`, `PRODUCTION_NON_CRITICAL`. |

### `InterconnectAttachmentGroupLogicalStructure`

- \[Output Only\] An analysis of the logical layout of Attachments in this group. Every Attachment in the group is shown once in this structure.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `regions` | array<InterconnectAttachmentGroupLogicalStructureRegion> | — |

### `InterconnectAttachmentGroupLogicalStructureRegion`

- \[Output Only\] The regions Attachments in this group are in.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metros` | array<InterconnectAttachmentGroupLogicalStructureRegionMetro> | — |
| `region` | string | Output only. \[Output Only\] The name of a region, like "us-central1". |

### `InterconnectAttachmentGroupLogicalStructureRegionMetro`

- \[Output Only\] The metros of Attachments in this group in this region.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `facilities` | array<InterconnectAttachmentGroupLogicalStructureRegionMetroFacility> | — |
| `metro` | string | Output only. \[Output Only\] The name of the metro, as a three-letter lowercase string like "iad". This is the first component of the location of an Interconnect. |

### `InterconnectAttachmentGroupLogicalStructureRegionMetroFacility`

- \[Output Only\] The facilities used for this group's Attachments' Interconnects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `facility` | string | Output only. \[Output Only\] The name of a facility, like "iad-1234". |
| `zones` | array<InterconnectAttachmentGroupLogicalStructureRegionMetroFacilityZone> | — |

### `InterconnectAttachmentGroupLogicalStructureRegionMetroFacilityZone`

- \[Output Only\] The zones that Attachments in this group are present in, in the given facilities. This is inherited from their Interconnects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachments` | array<string> | Output only. \[Output Only\] URLs of Attachments in the given zone, to the given region, on Interconnects in the given facility and metro. Every Attachment in the AG has such an entry. |
| `zone` | string | Output only. \[Output Only\] The name of a zone, either "zone1" or "zone2". |

### `InterconnectAttachmentGroupsCreateMembers`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `attachments` | array<InterconnectAttachmentGroupsCreateMembersInterconnectAttachmentInput> | Parameters for the specific Attachments to create. |
| `intentMismatchBehavior` | string enum | How to behave when configured.availabilitySLA.effectiveSLA would not equal intent.availabilitySLA after this call. Values: `CREATE`, `REJECT`, `UNSPECIFIED`. |
| `templateAttachment` | InterconnectAttachmentGroupsCreateMembersInterconnectAttachmentInput | Default parameters for the Attachments to create in this call. |

### `InterconnectAttachmentGroupsCreateMembersInterconnectAttachmentInput`

- Parameters used to create an InterconnectAttachment. This is similar to InterconnectAttachment, but the region field used here is not output only and all other output only fields are excluded.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `adminEnabled` | boolean | Determines whether this Attachment will carry packets. Not present for PARTNER_PROVIDER. |
| `bandwidth` | string enum | Provisioned bandwidth capacity for the interconnect attachment. For attachments of type DEDICATED, the user can set the bandwidth. For attachments of type PARTNER, the Google Partner that is operating the interconnect must set the bandwidth. Output only for PARTNER type, mutable for PARTNER_PROVIDER and DEDICATED, and can take one of the following values: - BPS_50M: 50 Mbit/s - BPS_100M: 100 Mbit/s - BPS_200M: 200 Mbit/s - BPS_300M: 300 Mbit/s - BPS_400M: 400 Mbit/s - BPS_500M: 500 Mbit/s - BPS_1G: 1 Gbit/s - BPS_2G: 2 Gbit/s - BPS_5G: 5 Gbit/s - BPS_10G: 10 Gbit/s - BPS_20G: 20 Gbit/s - BPS_50G: 50 Gbit/s - BPS_100G: 100 Gbit/s - BPS_400G: 400 Gbit/s Values: `BPS_100G`, `BPS_100M`, `BPS_10G`, `BPS_1G`, `BPS_200M`, `BPS_20G`, `BPS_2G`, `BPS_300M`, `BPS_400G`, `BPS_400M`, `BPS_500M`, `BPS_50G`, `BPS_50M`, `BPS_5G`. |
| `candidateCloudRouterIpAddress` | string | Single IPv4 address + prefix length to be configured on the cloud router interface for this interconnect attachment. - Both candidate_cloud_router_ip_address and candidate_customer_router_ip_address fields must be set or both must be unset. - Prefix length of both candidate_cloud_router_ip_address and candidate_customer_router_ip_address must be the same. - Max prefix length is 31. |
| `candidateCloudRouterIpv6Address` | string | Single IPv6 address + prefix length to be configured on the cloud router interface for this interconnect attachment. - Both candidate_cloud_router_ipv6_address and candidate_customer_router_ipv6_address fields must be set or both must be unset. - Prefix length of both candidate_cloud_router_ipv6_address and candidate_customer_router_ipv6_address must be the same. - Max prefix length is 126. |
| `candidateCustomerRouterIpAddress` | string | Single IPv4 address + prefix length to be configured on the customer router interface for this interconnect attachment. |
| `candidateCustomerRouterIpv6Address` | string | Single IPv6 address + prefix length to be configured on the customer router interface for this interconnect attachment. |
| `candidateIpv6Subnets` | array<string> | This field is not available. |
| `candidateSubnets` | array<string> | Input only. Up to 16 candidate prefixes that can be used to restrict the allocation of cloudRouterIpAddress and customerRouterIpAddress for this attachment. All prefixes must be within link-local address space (169.254.0.0/16) and must be /29 or shorter (/28, /27, etc). Google will attempt to select an unused /29 from the supplied candidate prefix(es). The request will fail if all possible /29s are in use on Google's edge. If not supplied, Google will randomly select an unused /29 from all of link-local space. |
| `cloudRouterIpv6InterfaceId` | string | This field is not available. |
| `customerRouterIpv6InterfaceId` | string | This field is not available. |
| `description` | string | An optional description of this resource. |
| `edgeAvailabilityDomain` | string enum | Input only. Desired availability domain for the attachment. Only available for type PARTNER, at creation time, and can take one of the following values: - AVAILABILITY_DOMAIN_ANY - AVAILABILITY_DOMAIN_1 - AVAILABILITY_DOMAIN_2 For improved reliability, customers should configure a pair of attachments, one per availability domain. The selected availability domain will be provided to the Partner via the pairing key, so that the provisioned circuit will lie in the specified domain. If not specified, the value will default to AVAILABILITY_DOMAIN_ANY. Values: `AVAILABILITY_DOMAIN_1`, `AVAILABILITY_DOMAIN_2`, `AVAILABILITY_DOMAIN_ANY`. |
| `encryption` | string enum | Indicates the user-supplied encryption option of this VLAN attachment (interconnectAttachment). Can only be specified at attachment creation for PARTNER or DEDICATED attachments. Possible values are: - alpha - This is the default value, which means that the VLAN attachment carries unencrypted traffic. VMs are able to send traffic to, or receive traffic from, such a VLAN attachment. - IPSEC - The VLAN attachment carries only encrypted traffic that is encrypted by an IPsec device, such as an HA VPN gateway or third-party IPsec VPN. VMs cannot directly send traffic to, or receive traffic from, such a VLAN attachment. To use \*HA VPN over Cloud Interconnect\*, the VLAN attachment must be created with this option. Values: `IPSEC`, `NONE`. |
| `interconnect` | string | URL of the underlying Interconnect object that this attachment's traffic will traverse through. |
| `ipsecInternalAddresses` | array<string> | A list of URLs of addresses that have been reserved for the VLAN attachment. Used only for the VLAN attachment that has the encryption option as IPSEC. The addresses must be regional internal IP address ranges. When creating an HA VPN gateway over the VLAN attachment, if the attachment is configured to use a regional internal IP address, then the VPN gateway's IP address is allocated from the IP address range specified here. For example, if the HA VPN gateway's interface 0 is paired to this VLAN attachment, then a regional internal IP address for the VPN gateway interface 0 will be allocated from the IP address specified for this VLAN attachment. If this field is not specified when creating the VLAN attachment, then later on when creating an HA VPN gateway on this VLAN attachment, the HA VPN gateway's IP address is allocated from the regional external IP address pool. |
| `l2Forwarding` | InterconnectAttachmentL2Forwarding | L2 Interconnect Attachment related config. This field is required if the type is L2_DEDICATED. The configuration specifies how VLAN tags (like dot1q, qinq, or dot1ad) within L2 packets are mapped to the destination appliances IP addresses. The packet is then encapsulated with the appliance IP address and sent to the edge appliance. |
| `mtu` | integer (int32) | Maximum Transmission Unit (MTU), in bytes, of packets passing through this interconnect attachment. Valid values are 1440, 1460, 1500, or 8896. If not specified, the value will default to 1440. |
| `multicastEnabled` | boolean | Whether or not to permit multicast traffic for this attachment. Multicast packets will be dropped if this is not enabled. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. Must be set on either the template_attachment or on each specific attachment. If set, the name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `pairingKey` | string | \[Output only for type PARTNER. Input only for PARTNER_PROVIDER. Not present for DEDICATED\]. The opaque identifier of a PARTNER attachment used to initiate provisioning with a selected partner. Of the form "XXXXX/region/domain" |
| `partnerAsn` | string (int64) | Optional BGP ASN for the router supplied by a Layer 3 Partner if they configured BGP on behalf of the customer. Output only for PARTNER type, input only for PARTNER_PROVIDER, not available for DEDICATED. |
| `partnerMetadata` | InterconnectAttachmentPartnerMetadata | Informational metadata about Partner attachments from Partners to display to customers. Output only for PARTNER type, mutable for PARTNER_PROVIDER, not available for DEDICATED. |
| `region` | string | The region that the Attachment is in. |
| `router` | string | URL of the Cloud Router to be used for dynamic routing. This router must be in the same region as this InterconnectAttachment. The InterconnectAttachment will automatically connect the Interconnect to the network & region within which the Cloud Router is configured. |
| `stackType` | string enum | The stack type for this interconnect attachment to identify whether the IPv6 feature is enabled or not. If not specified, IPV4_ONLY will be used. This field can be both set at interconnect attachments creation and update interconnect attachment operations. Values: `IPV4_IPV6`, `IPV4_ONLY`. |
| `subnetLength` | integer (int32) | Input only. Length of the IPv4 subnet mask. Allowed values: - 29 (default) - 30 The default value is 29, except for Cross-Cloud Interconnect connections that use an InterconnectRemoteLocation with a constraints.subnetLengthRange.min equal to 30. For example, connections that use an Azure remote location fall into this category. In these cases, the default value is 30, and requesting 29 returns an error. Where both 29 and 30 are allowed, 29 is preferred, because it gives Google Cloud Support more debugging visibility. |
| `type` | string enum | The type of interconnect attachment this is, which can take one of the following values: - DEDICATED: an attachment to a Dedicated Interconnect. - PARTNER: an attachment to a Partner Interconnect, created by the customer. - PARTNER_PROVIDER: an attachment to a Partner Interconnect, created by the partner. Values: `DEDICATED`, `L2_DEDICATED`, `PARTNER`, `PARTNER_PROVIDER`. |
| `vlanTag8021q` | integer (int32) | The IEEE 802.1Q VLAN tag for this attachment, in the range 2-4093. Only specified at creation time. |

### `InterconnectAttachmentGroupsCreateMembersRequest`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `request` | InterconnectAttachmentGroupsCreateMembers | — |

### `InterconnectAttachmentGroupsGetOperationalStatusResponse`

- Response for the InterconnectAttachmentGroupsGetOperationalStatusResponse.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `result` | InterconnectAttachmentGroupsOperationalStatus | — |

### `InterconnectAttachmentGroupsListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InterconnectAttachmentGroup> | A list of InterconnectAttachmentGroup resources. |
| `kind` | string | — |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InterconnectAttachmentGroupsOperationalStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachmentStatuses` | array<InterconnectAttachmentGroupsOperationalStatusAttachmentStatus> | — |
| `configured` | InterconnectAttachmentGroupConfigured | — |
| `groupStatus` | string enum | Output only. Summarizes the status of the group. Values: `DEGRADED`, `FULLY_DOWN`, `FULLY_UP`, `UNSPECIFIED`. |
| `intent` | InterconnectAttachmentGroupIntent | — |
| `operational` | InterconnectAttachmentGroupConfigured | Output only. The operational state of the group, including only active Attachments. |

### `InterconnectAttachmentGroupsOperationalStatusAttachmentStatus`

- The status of one Attachment in the group. List order is arbitrary.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminEnabled` | boolean | Output only. Whether this Attachment is enabled. This becomes false when the customer drains their Attachment. |
| `attachment` | string | Output only. The URL of the Attachment being described. |
| `isActive` | string enum | Output only. Whether this Attachment is participating in the redundant configuration. This will be ACTIVE if and only if the status below is CONNECTION_UP. Any INACTIVE Attachments are excluded from the analysis that generates operational.availabilitySLA. Values: `ACTIVE`, `INACTIVE`, `UNSPECIFIED`. |
| `status` | string enum | Output only. Whether this Attachment is active, and if so, whether BGP is up. Values: `ATTACHMENT_STATUS_UNKNOWN`, `CONNECTION_DISABLED`, `CONNECTION_DOWN`, `CONNECTION_UP`, `DEFUNCT`, `IPSEC_CONFIGURATION_NEEDED_STATUS`, `IPSEC_READY_TO_RESUME_FLOW_STATUS`, `IPV4_DOWN_IPV6_UP`, `IPV4_UP_IPV6_DOWN`, `PARTNER_REQUEST_RECEIVED`, `PENDING_CUSTOMER`, `PENDING_PARTNER`, `PROVISIONED`, `ROUTER_CONFIGURATION_BROKEN`, `UNPROVISIONED`. |

### `InterconnectAttachmentL2Forwarding`

- L2 Interconnect Attachment related configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applianceMappings` | object | Optional. A map of VLAN tags to appliances and optional inner mapping rules. If VLANs are not explicitly mapped to any appliance, the defaultApplianceIpAddress is used. Each VLAN tag can be a single number or a range of numbers in the range of 1 to 4094, e.g., "1" or "4001-4094". Non-empty and non-overlapping VLAN tag ranges are enforced, and violating operations will be rejected. The VLAN tags in the Ethernet header must use an ethertype value of 0x88A8 or 0x8100. |
| `defaultApplianceIpAddress` | string | Optional. A single IPv4 or IPv6 address used as the default destination IP when there is no VLAN mapping result found. Unset field (null-value) indicates the unmatched packet should be dropped. |
| `geneveHeader` | InterconnectAttachmentL2ForwardingGeneveHeader | Optional. It represents the structure of a Geneve (Generic Network Virtualization Encapsulation) header, as defined in RFC8926. It encapsulates packets from various protocols (e.g., Ethernet, IPv4, IPv6) for use in network virtualization environments. |
| `network` | string | Required. Resource URL of the network to which this attachment belongs. |
| `tunnelEndpointIpAddress` | string | Required. A single IPv4 or IPv6 address. This address will be used as the source IP address for packets sent to the appliances, and must be used as the destination IP address for packets that should be sent out through this attachment. |

### `InterconnectAttachmentL2ForwardingApplianceMapping`

- Two-level VLAN-to-Appliance mapping rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applianceIpAddress` | string | Optional. A single IPv4 or IPv6 address used as the destination IP address for ingress packets that match on a VLAN tag, but do not match a more specific inner VLAN tag. Unset field (null-value) indicates both VLAN tags are required to be mapped. Otherwise, defaultApplianceIpAddress is used. |
| `innerVlanToApplianceMappings` | array<InterconnectAttachmentL2ForwardingApplianceMappingInnerVlanToApplianceMapping> | Optional. Used to match against the inner VLAN when the packet contains two VLAN tags. A list of mapping rules from inner VLAN tags to IP addresses. If the inner VLAN is not explicitly mapped to an IP address range, the applianceIpAddress is used. |
| `name` | string | Optional. The name of this appliance mapping rule. |

### `InterconnectAttachmentL2ForwardingApplianceMappingInnerVlanToApplianceMapping`

- The inner VLAN-to-Appliance mapping.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `innerApplianceIpAddress` | string | Required in this object. A single IPv4 or IPv6 address used as the destination IP address for ingress packets that match on both VLAN tags. |
| `innerVlanTags` | array<string> | Required in this object. Used to match the inner VLAN tag on the packet. Each entry can be a single number or a range of numbers in the range of 1 to 4094, e.g., \["1", "4001-4094"\] is valid. Non-empty and Non-overlapping VLAN tag ranges are enforced, and violating operations will be rejected. The inner VLAN tags must have an ethertype value of 0x8100. |

### `InterconnectAttachmentL2ForwardingGeneveHeader`

- GeneveHeader related configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vni` | integer (uint32) | Optional. VNI is a 24-bit unique virtual network identifier, from 0 to 16,777,215. |

### `InterconnectAttachmentList`

- Response to the list request, and contains a list of interconnect attachments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InterconnectAttachment> | A list of InterconnectAttachment resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#interconnectAttachmentList for lists of interconnect attachments. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InterconnectAttachmentParams`

- Additional interconnect attachment parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. \* Inconsistent format is not supported. For instance: {"tagKeys/333" : "tagValues/444", "123/env" : "prod"} is invalid. |

### `InterconnectAttachmentPartnerMetadata`

- Informational metadata about Partner attachments from Partners to display to customers. These fields are propagated from PARTNER_PROVIDER attachments to their corresponding PARTNER attachments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interconnectName` | string | Plain text name of the Interconnect this attachment is connected to, as displayed in the Partner's portal. For instance "Chicago 1". This value may be validated to match approved Partner values. |
| `partnerName` | string | Plain text name of the Partner providing this attachment. This value may be validated to match approved Partner values. |
| `portalUrl` | string | URL of the Partner's portal for this Attachment. Partners may customise this to be a deep link to the specific resource on the Partner portal. This value may be validated to match approved Partner values. |

### `InterconnectAttachmentPrivateInfo`

- Information for an interconnect attachment when this belongs to an interconnect of type DEDICATED.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tag8021q` | integer (uint32) | \[Output Only\] 802.1q encapsulation tag to be used for traffic between Google and the customer, going to and from this network and region. |

### `InterconnectAttachmentsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interconnectAttachments` | array<InterconnectAttachment> | A list of interconnect attachments contained in this scope. |
| `warning` | object | Informational warning which replaces the list of addresses when the list is empty. |

### `InterconnectCircuitInfo`

- Describes a single physical circuit between the Customer and Google. CircuitInfo objects are created by Google, so all fields are output only.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customerDemarcId` | string | Customer-side demarc ID for this circuit. |
| `googleCircuitId` | string | Google-assigned unique ID for this circuit. Assigned at circuit turn-up. |
| `googleDemarcId` | string | Google-side demarc ID for this circuit. Assigned at circuit turn-up and provided by Google to the customer in the LOA. |

### Shape of `InstanceGroupManagersDeleteInstancesRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "instances": "array<string>",
  "skipInstancesOnValidationError": "boolean"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
