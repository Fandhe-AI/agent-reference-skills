---
source: https://tpu.googleapis.com/$discovery/rest?version=v2
---

# Cloud TPU API message schemas (tpu)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/tpu/`.

### `AcceleratorConfig`

- A TPU accelerator configuration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `topology` | string | Required. Topology of TPU in chips. |
| `type` | string enum | Required. Type of TPU. Values: `TYPE_UNSPECIFIED`, `V2`, `V3`, `V4`, `V5LITE_POD`, `V5P`, `V6E`. |

### `AcceleratorType`

- A accelerator type that a Node can be configured with.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `acceleratorConfigs` | array<AcceleratorConfig> | The accelerator config. |
| `name` | string | The resource name. |
| `type` | string | The accelerator type. |

### `AcceleratorType` (v1)

- A accelerator type that a Node can be configured with.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The resource name. |
| `type` | string | the accelerator type. |

### `AcceptedData`

- Further data for the accepted state.
- Version: v2

### `AccessConfig`

- An access config attached to the TPU worker.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `externalIp` | string | Output only. An external IP address associated with the TPU worker. |

### `ActiveData`

- Further data for the active state.
- Version: v2

### `AttachedDisk`

- A node-attached disk resource. Next ID: 8;
- Version: v2

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | The mode in which to attach this disk. If not specified, the default is READ_WRITE mode. Only applicable to data_disks. Values: `DISK_MODE_UNSPECIFIED`, `READ_WRITE`, `READ_ONLY`. |
| `sourceDisk` | string | Specifies the full path to an existing disk. For example: "projects/my-project/zones/us-central1-c/disks/my-disk". |

### `AttachedDisk` (v2alpha1)

- A node-attached disk resource.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | The mode in which to attach this disk. If not specified, the default is READ_WRITE mode. Only applicable to data_disks. Values: `DISK_MODE_UNSPECIFIED`, `READ_WRITE`, `READ_ONLY`. |
| `sourceDisk` | string | Specifies the full path to an existing disk. For example: "projects/my-project/zones/us-central1-c/disks/my-disk". |
| `workerIds` | array<string> | Optional. The list of worker IDs this disk is attached to. |

### `BestEffort`

- BestEffort tier definition.
- Version: v2alpha1

### `BootDiskConfig`

- Sets the boot disk configuration for the TPU node.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `customerEncryptionKey` | CustomerEncryptionKey | Optional. Customer encryption key for boot disk. |

### `BootDiskConfig` (v2alpha1)

- Boot disk configurations.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `customerEncryptionKey` | CustomerEncryptionKey | Optional. Customer encryption key for boot disk. |
| `diskSizeGb` | string (int64) | Optional. Size of the boot disk in GB. It must be larger than or equal to the size of the image. |
| `enableConfidentialCompute` | boolean | Optional. Whether the boot disk will be created with confidential compute mode. |
| `provisionedIops` | string (int64) | Optional. Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. To learn more about IOPS, see Provisioning persistent disk performance (https://cloud.google.com/compute/docs/disks/performance#provisioned-iops). |
| `provisionedThroughput` | string (int64) | Optional. Indicates how much throughput to provision for the disk. This sets the number of throughput MB per second that the disk can handle. |
| `sourceImage` | string | Optional. Image from which boot disk is to be created. If not specified, the default image for the runtime version will be used. Example: `projects/$PROJECT_ID/global/images/$IMAGE_NAME`. |
| `storagePool` | string | Optional. The storage pool in which the boot disk is created. You can provide this as a partial or full URL to the resource. |

### `CreatingData`

- Further data for the creating state.
- Version: v2

### `CustomerEncryptionKey`

- Defines the customer encryption key for disk encryption.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/KMS_PROJECT_ID/locations/REGION/keyRings/KEY_REGION/cryptoKeys/KEY The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/KMS_PROJECT_ID/locations/REGION/keyRings/KEY_REGION/cryptoKeys/KEY/cryptoKeyVersions/1 |

### `DeletingData`

- Further data for the deleting state.
- Version: v2

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `FailedData`

- Further data for the failed state.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `error` | Status | Output only. The error that caused the queued resource to enter the FAILED state. |

### `GenerateServiceIdentityRequest`

- Request for GenerateServiceIdentity.
- Version: v2

### `GenerateServiceIdentityResponse`

- Response for GenerateServiceIdentity.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `identity` | ServiceIdentity | ServiceIdentity that was created or retrieved. |

### `GetGuestAttributesRequest`

- Request for GetGuestAttributes.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `queryPath` | string | The guest attributes path to be queried. |
| `workerIds` | array<string> | The 0-based worker ID. If it is empty, all workers' GuestAttributes will be returned. |

### `GetGuestAttributesResponse`

- Response for GetGuestAttributes.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `guestAttributes` | array<GuestAttributes> | The guest attributes for the TPU workers. |

### `GetMaintenanceInfoResponse`

- Response for GetMaintenanceInfo.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `nodeUpcomingMaintenances` | array<NodeUpcomingMaintenanceInfo> | The list of upcoming maintenance entries. |

### `Guaranteed`

- Guaranteed tier definition.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `minDuration` | string (google-duration) | Optional. Defines the minimum duration of the guarantee. If specified, the requested resources will only be provisioned if they can be allocated for at least the given duration. |

### `Guaranteed` (v2alpha1)

- Guaranteed tier definition.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `minDuration` | string (google-duration) | Optional. Defines the minimum duration of the guarantee. If specified, the requested resources will only be provisioned if they can be allocated for at least the given duration. |
| `reserved` | boolean | Optional. Specifies the request should be scheduled on reserved capacity. |

### `GuestAttributes`

- A guest attributes.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `queryPath` | string | The path to be queried. This can be the default namespace ('/') or a nested namespace ('/\/') or a specified key ('/\/\') |
| `queryValue` | GuestAttributesValue | The value of the requested queried path. |

### `GuestAttributesEntry`

- A guest attributes namespace/key/value entry.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `key` | string | Key for the guest attribute entry. |
| `namespace` | string | Namespace for the guest attribute entry. |
| `value` | string | Value for the guest attribute entry. |

### `GuestAttributesValue`

- Array of guest attribute namespace/key/value tuples.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `items` | array<GuestAttributesEntry> | The list of guest attributes entries. |

### `Interval`

- Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. |
| `startTime` | string (google-datetime) | Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. |

### `ListAcceleratorTypesResponse`

- Response for ListAcceleratorTypes.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `acceleratorTypes` | array<AcceleratorType> | The listed nodes. |
| `nextPageToken` | string | The next page token or empty if none. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListNodesResponse`

- Response for ListNodes.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next page token or empty if none. |
| `nodes` | array<Node> | The listed nodes. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListQueuedResourcesResponse`

- Response for ListQueuedResources.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next page token or empty if none. |
| `queuedResources` | array<QueuedResource> | The listed queued resources. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListReservationsResponse`

- Response for ListReservations.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next page token or empty if none. |
| `reservations` | array<Reservation> | The listed reservations. |

### `ListRuntimeVersionsResponse`

- Response for ListRuntimeVersions.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next page token or empty if none. |
| `runtimeVersions` | array<RuntimeVersion> | The listed nodes. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListTensorFlowVersionsResponse`

- Response for ListTensorFlowVersions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next page token or empty if none. |
| `tensorflowVersions` | array<TensorFlowVersion> | The listed nodes. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `MultiNodeParams`

- Parameters to specify for multi-node QueuedResource requests. This field must be populated in case of multi-node requests instead of node_id. It's an error to specify both node_id and multi_node_params.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `nodeCount` | integer (int32) | Required. Number of nodes with this spec. The system will attempt to provison "node_count" nodes as part of the request. This needs to be > 1. |
| `nodeIdPrefix` | string | Prefix of node_ids in case of multi-node request Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format. If node_count = 3 and node_id_prefix = "np", node ids of nodes created will be "np-0", "np-1", "np-2". If this field is not provided we use queued_resource_id as the node_id_prefix. |
| `workloadType` | string enum | Optional. The workload type for the multi-node request. Values: `WORKLOAD_TYPE_UNSPECIFIED`, `THROUGHPUT_OPTIMIZED`, `AVAILABILITY_OPTIMIZED`. |

### `MultisliceParams`

- Parameters to specify for multislice QueuedResource requests. This message must be populated in case of multislice requests instead of node_id.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nodeCount` | integer (int32) | Required. Number of nodes with this spec. The system will attempt to provision "node_count" nodes as part of the request. This needs to be > 1. |
| `nodeIdPrefix` | string | Optional. Prefix of node_ids in case of multislice request. Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format. If node_count = 3 and node_id_prefix = "np", node ids of nodes created will be "np-0", "np-1", "np-2". If this field is not provided we use queued_resource_id as the node_id_prefix. |

### `NetworkConfig`

- Network related configurations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `canIpForward` | boolean | Allows the TPU node to send and receive packets with non-matching destination or source IPs. This is required if you plan to use the TPU workers to forward routes. |
| `enableExternalIps` | boolean | Indicates that external IP addresses would be associated with the TPU workers. If set to false, the specified subnetwork or network should have Private Google Access enabled. |
| `network` | string | The name of the network for the TPU node. It must be a preexisting Google Compute Engine network. If none is provided, "default" will be used. |
| `queueCount` | integer (int32) | Optional. Specifies networking queue count for TPU VM instance's network interface. |
| `subnetwork` | string | The name of the subnetwork for the TPU node. It must be a preexisting Google Compute Engine subnetwork. If none is provided, "default" will be used. |

### `NetworkEndpoint`

- A network endpoint over which a TPU worker can be reached.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `accessConfig` | AccessConfig | The access config for the TPU worker. |
| `ipAddress` | string | The internal IP address of this network endpoint. |
| `port` | integer (int32) | The port of this network endpoint. |

### `NetworkEndpoint` (v1)

- A network endpoint over which a TPU worker can be reached.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | The IP address of this network endpoint. |
| `port` | integer (int32) | The port of this network endpoint. |

### `Node`

- A TPU instance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `acceleratorConfig` | AcceleratorConfig | The AccleratorConfig for the TPU Node. |
| `acceleratorType` | string | Optional. The type of hardware accelerators associated with this node. |
| `apiVersion` | string enum | Output only. The API version that created this Node. Values: `API_VERSION_UNSPECIFIED`, `V1_ALPHA1`, `V1`, `V2_ALPHA1`, `V2`. |
| `bootDiskConfig` | BootDiskConfig | Optional. Boot disk configuration. |
| `cidrBlock` | string | The CIDR block that the TPU node will use when selecting an IP address. This CIDR block must be a /29 block; the Compute Engine networks API forbids a smaller block, and using a larger block would be wasteful (a node can only consume one IP address). Errors will occur if the CIDR block has already been used for a currently existing TPU node, the CIDR block conflicts with any subnetworks in the user's provided network, or the provided network is peered with another network that is using that CIDR block. |
| `createTime` | string (google-datetime) | Output only. The time when the node was created. |
| `dataDisks` | array<AttachedDisk> | The additional data disks for the Node. |
| `description` | string | The user-supplied description of the TPU. Maximum of 512 characters. |
| `health` | string enum | The health status of the TPU node. Values: `HEALTH_UNSPECIFIED`, `HEALTHY`, `TIMEOUT`, `UNHEALTHY_TENSORFLOW`, `UNHEALTHY_MAINTENANCE`. |
| `healthDescription` | string | Output only. If this field is populated, it contains a description of why the TPU Node is unhealthy. |
| `id` | string (int64) | Output only. The unique identifier for the TPU Node. |
| `labels` | object | Resource labels to represent user-provided metadata. |
| `metadata` | object | Custom metadata to apply to the TPU Node. Can set startup-script and shutdown-script |
| `multisliceNode` | boolean | Output only. Whether the Node belongs to a Multislice group. |
| `name` | string | Output only. Immutable. The name of the TPU. |
| `networkConfig` | NetworkConfig | Network configurations for the TPU node. network_config and network_configs are mutually exclusive, you can only specify one of them. If both are specified, an error will be returned. |
| `networkConfigs` | array<NetworkConfig> | Optional. Repeated network configurations for the TPU node. This field is used to specify multiple networks configs for the TPU node. network_config and network_configs are mutually exclusive, you can only specify one of them. If both are specified, an error will be returned. |
| `networkEndpoints` | array<NetworkEndpoint> | Output only. The network endpoints where TPU workers can be accessed and sent work. It is recommended that runtime clients of the node reach out to the 0th entry in this map first. |
| `protectionTier` | string enum | Output only. Protection tier for the workload which specifies the workload expectations in the event of infrastructure failures at data center (e.g. power and/or cooling failures). Values: `PROTECTION_TIER_UNSPECIFIED`, `STANDARD`, `CAPACITY_OPTIMIZED`. |
| `queuedResource` | string | Output only. The qualified name of the QueuedResource that requested this Node. |
| `runtimeVersion` | string | Required. The runtime version running in the Node. |
| `schedulingConfig` | SchedulingConfig | The scheduling options for this node. |
| `serviceAccount` | ServiceAccount | The Google Cloud Platform Service Account to be used by the TPU node VMs. If None is specified, the default compute service account will be used. |
| `shieldedInstanceConfig` | ShieldedInstanceConfig | Shielded Instance options. |
| `state` | string enum | Output only. The current state for the TPU Node. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `RESTARTING`, `REIMAGING`, `DELETING`, `REPAIRING`, `STOPPED`, `STOPPING`, `STARTING`, `PREEMPTED`, `TERMINATED`, `HIDING`, `HIDDEN`, `UNHIDING`, `UNKNOWN`. |
| `symptoms` | array<Symptom> | Output only. The Symptoms that have occurred to the TPU Node. |
| `tags` | array<string> | Tags to apply to the TPU Node. Tags are used to identify valid sources or targets for network firewalls. |
| `upcomingMaintenance` | UpcomingMaintenance | Output only. Upcoming maintenance on this TPU node. |

### `Node` (v1)

- A TPU instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorType` | string | Required. The type of hardware accelerators associated with this node. |
| `apiVersion` | string enum | Output only. The API version that created this Node. Values: `API_VERSION_UNSPECIFIED`, `V1_ALPHA1`, `V1`, `V2_ALPHA1`. |
| `cidrBlock` | string | The CIDR block that the TPU node will use when selecting an IP address. This CIDR block must be a /29 block; the Compute Engine networks API forbids a smaller block, and using a larger block would be wasteful (a node can only consume one IP address). Errors will occur if the CIDR block has already been used for a currently existing TPU node, the CIDR block conflicts with any subnetworks in the user's provided network, or the provided network is peered with another network that is using that CIDR block. |
| `createTime` | string (google-datetime) | Output only. The time when the node was created. |
| `description` | string | The user-supplied description of the TPU. Maximum of 512 characters. |
| `health` | string enum | The health status of the TPU node. Values: `HEALTH_UNSPECIFIED`, `HEALTHY`, `DEPRECATED_UNHEALTHY`, `TIMEOUT`, `UNHEALTHY_TENSORFLOW`, `UNHEALTHY_MAINTENANCE`. |
| `healthDescription` | string | Output only. If this field is populated, it contains a description of why the TPU Node is unhealthy. |
| `ipAddress` | string | Output only. DEPRECATED! Use network_endpoints instead. The network address for the TPU Node as visible to Compute Engine instances. |
| `labels` | object | Resource labels to represent user-provided metadata. |
| `name` | string | Output only. Immutable. The name of the TPU |
| `network` | string | The name of a network they wish to peer the TPU node to. It must be a preexisting Compute Engine network inside of the project on which this API has been activated. If none is provided, "default" will be used. |
| `networkEndpoints` | array<NetworkEndpoint> | Output only. The network endpoints where TPU workers can be accessed and sent work. It is recommended that Tensorflow clients of the node reach out to the 0th entry in this map first. |
| `port` | string | Output only. DEPRECATED! Use network_endpoints instead. The network port for the TPU Node as visible to Compute Engine instances. |
| `schedulingConfig` | SchedulingConfig | The scheduling options for this node. |
| `serviceAccount` | string | Output only. The service account used to run the tensor flow services within the node. To share resources, including Google Cloud Storage data, with the Tensorflow job running in the Node, this account must have permissions to that data. |
| `state` | string enum | Output only. The current state for the TPU Node. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `RESTARTING`, `REIMAGING`, `DELETING`, `REPAIRING`, `STOPPED`, `STOPPING`, `STARTING`, `PREEMPTED`, `TERMINATED`, `HIDING`, `HIDDEN`, `UNHIDING`, `UNKNOWN`. |
| `symptoms` | array<Symptom> | Output only. The Symptoms that have occurred to the TPU Node. |
| `tensorflowVersion` | string | Required. The version of Tensorflow running in the Node. |
| `useServiceNetworking` | boolean | Whether the VPC peering for the node is set up through Service Networking API. The VPC Peering should be set up before provisioning the node. If this field is set, cidr_block field should not be specified. If the network, that you want to peer the TPU Node to, is Shared VPC networks, the node must be created with this this field enabled. |

### `Node` (v2alpha1)

- A TPU instance.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `acceleratorConfig` | AcceleratorConfig | The AccleratorConfig for the TPU Node. |
| `acceleratorType` | string | The type of hardware accelerators associated with this node. |
| `apiVersion` | string enum | Output only. The API version that created this Node. Values: `API_VERSION_UNSPECIFIED`, `V1_ALPHA1`, `V1`, `V2_ALPHA1`. |
| `autocheckpointEnabled` | boolean | Optional. Whether Autocheckpoint is enabled. |
| `bootDiskConfig` | BootDiskConfig | Optional. Boot disk configuration. |
| `cidrBlock` | string | The CIDR block that the TPU node will use when selecting an IP address. This CIDR block must be a /29 block; the Compute Engine networks API forbids a smaller block, and using a larger block would be wasteful (a node can only consume one IP address). Errors will occur if the CIDR block has already been used for a currently existing TPU node, the CIDR block conflicts with any subnetworks in the user's provided network, or the provided network is peered with another network that is using that CIDR block. |
| `createTime` | string (google-datetime) | Output only. The time when the node was created. |
| `dataDisks` | array<AttachedDisk> | The additional data disks for the Node. |
| `description` | string | The user-supplied description of the TPU. Maximum of 512 characters. |
| `health` | string enum | The health status of the TPU node. Values: `HEALTH_UNSPECIFIED`, `HEALTHY`, `TIMEOUT`, `UNHEALTHY_TENSORFLOW`, `UNHEALTHY_MAINTENANCE`. |
| `healthDescription` | string | Output only. If this field is populated, it contains a description of why the TPU Node is unhealthy. |
| `id` | string (int64) | Output only. The unique identifier for the TPU Node. |
| `labels` | object | Resource labels to represent user-provided metadata. |
| `metadata` | object | Custom metadata to apply to the TPU Node. Can set startup-script and shutdown-script |
| `multisliceNode` | boolean | Output only. Whether the Node belongs to a Multislice group. |
| `name` | string | Output only. Immutable. The name of the TPU. |
| `networkConfig` | NetworkConfig | Network configurations for the TPU node. network_config and network_configs are mutually exclusive, you can only specify one of them. If both are specified, an error will be returned. |
| `networkConfigs` | array<NetworkConfig> | Optional. Repeated network configurations for the TPU node. This field is used to specify multiple networks configs for the TPU node. network_config and network_configs are mutually exclusive, you can only specify one of them. If both are specified, an error will be returned. |
| `networkEndpoints` | array<NetworkEndpoint> | Output only. The network endpoints where TPU workers can be accessed and sent work. It is recommended that runtime clients of the node reach out to the 0th entry in this map first. |
| `queuedResource` | string | Output only. The qualified name of the QueuedResource that requested this Node. |
| `runtimeVersion` | string | Required. The runtime version running in the Node. |
| `schedulingConfig` | SchedulingConfig | The scheduling options for this node. |
| `serviceAccount` | ServiceAccount | The Google Cloud Platform Service Account to be used by the TPU node VMs. If None is specified, the default compute service account will be used. |
| `shieldedInstanceConfig` | ShieldedInstanceConfig | Shielded Instance options. |
| `state` | string enum | Output only. The current state for the TPU Node. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `RESTARTING`, `REIMAGING`, `DELETING`, `REPAIRING`, `STOPPED`, `STOPPING`, `STARTING`, `PREEMPTED`, `TERMINATED`, `HIDING`, `HIDDEN`, `UNHIDING`, `UNKNOWN`. |
| `symptoms` | array<Symptom> | Output only. The Symptoms that have occurred to the TPU Node. |
| `tags` | array<string> | Tags to apply to the TPU Node. Tags are used to identify valid sources or targets for network firewalls. |
| `upcomingMaintenance` | UpcomingMaintenance | Output only. Upcoming maintenance on this TPU node. |

### `NodeSpec`

- Details of the TPU node(s) being requested. Users can request either a single node or multiple nodes. NodeSpec provides the specification for node(s) to be created.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `multisliceParams` | MultisliceParams | Optional. Fields to specify in case of multislice request. |
| `node` | Node | Required. The node. |
| `nodeId` | string | Optional. The unqualified resource name. Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format. This is only specified when requesting a single node. In case of multislice requests, multislice_params must be populated instead. |
| `parent` | string | Required. The parent resource name. |

### `NodeSpec` (v2alpha1)

- Details of the TPU node(s) being requested. Users can request either a single node or multiple nodes. NodeSpec provides the specification for node(s) to be created.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `multiNodeParams` | MultiNodeParams | Optional. Fields to specify in case of multi-node request. |
| `node` | Node | Required. The node. |
| `nodeId` | string | The unqualified resource name. Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format. This is only specified when requesting a single node. In case of multi-node requests, multi_node_params must be populated instead. It's an error to specify both node_id and multi_node_params. |
| `parent` | string | Required. The parent resource name. |

### `NodeUpcomingMaintenanceInfo`

- A tuple containing node name / ID and maintenance info.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `nodeName` | string | Unqualified node name. |
| `nodeUid` | string (int64) | UID of this node. |
| `upcomingMaintenance` | UpcomingMaintenance | Upcoming maintenance info for this node. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Metadata describing an Operation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | API version. |
| `cancelRequested` | boolean | Specifies if cancellation was requested for the operation. |
| `createTime` | string (google-datetime) | The time the operation was created. |
| `endTime` | string (google-datetime) | The time the operation finished running. |
| `statusDetail` | string | Human-readable status of the operation, if any. |
| `target` | string | Target of the operation - for example projects/project-1/connectivityTests/test-1 |
| `verb` | string | Name of the verb executed by the operation. |

### `PerformMaintenanceQueuedResourceRequest`

- Request for PerformMaintenanceQueuedResource.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `nodeNames` | array<string> | The names of the nodes to perform maintenance on. |

### `PerformMaintenanceRequest`

- Request for PerformMaintenance.
- Version: v2alpha1

### `ProvisioningData`

- Further data for the provisioning state.
- Version: v2

### `QueuedResource`

- A QueuedResource represents a request for resources that will be placed in a queue and fulfilled when the necessary resources are available.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the QueuedResource was created. |
| `guaranteed` | Guaranteed | Optional. The Guaranteed tier |
| `name` | string | Output only. Immutable. The name of the QueuedResource. |
| `queueingPolicy` | QueueingPolicy | Optional. The queueing policy of the QueuedRequest. |
| `reservationName` | string | Optional. Name of the reservation in which the resource should be provisioned. Format: projects/{project}/locations/{zone}/reservations/{reservation} |
| `spot` | Spot | Optional. The Spot tier. |
| `state` | QueuedResourceState | Output only. State of the QueuedResource request. |
| `tpu` | Tpu | Optional. Defines a TPU resource. |

### `QueuedResource` (v2alpha1)

- A QueuedResource represents a request for resources that will be placed in a queue and fulfilled when the necessary resources are available.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `bestEffort` | BestEffort | The BestEffort tier. |
| `createTime` | string (google-datetime) | Output only. The time when the QueuedResource was created. |
| `guaranteed` | Guaranteed | The Guaranteed tier. |
| `name` | string | Output only. Immutable. The name of the QueuedResource. |
| `provisioningModel` | string enum | Optional. The provisioning model for the resource. Values: `PROVISIONING_MODEL_UNSPECIFIED`, `STANDARD`, `SPOT`, `RESERVATION_BOUND`, `FLEX_START`. |
| `queueingPolicy` | QueueingPolicy | The queueing policy of the QueuedRequest. |
| `reservationName` | string | Name of the reservation in which the resource should be provisioned. Format: projects/{project}/locations/{zone}/reservations/{reservation} |
| `runDuration` | RunDuration | Optional. The duration of the requested resource. |
| `spot` | Spot | Optional. The Spot tier. |
| `state` | QueuedResourceState | Output only. State of the QueuedResource request. |
| `tpu` | Tpu | Defines a TPU resource. |

### `QueuedResourceState`

- QueuedResourceState defines the details of the QueuedResource request.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `acceptedData` | AcceptedData | Output only. Further data for the accepted state. |
| `activeData` | ActiveData | Output only. Further data for the active state. |
| `creatingData` | CreatingData | Output only. Further data for the creating state. |
| `deletingData` | DeletingData | Output only. Further data for the deleting state. |
| `failedData` | FailedData | Output only. Further data for the failed state. |
| `provisioningData` | ProvisioningData | Output only. Further data for the provisioning state. |
| `state` | string enum | Output only. State of the QueuedResource request. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACCEPTED`, `PROVISIONING`, `FAILED`, `DELETING`, `ACTIVE`, `SUSPENDING`, `SUSPENDED`, `WAITING_FOR_RESOURCES`. |
| `stateInitiator` | string enum | Output only. The initiator of the QueuedResources's current state. Used to indicate whether the SUSPENDING/SUSPENDED state was initiated by the user or the service. Values: `STATE_INITIATOR_UNSPECIFIED`, `USER`, `SERVICE`. |
| `suspendedData` | SuspendedData | Output only. Further data for the suspended state. |
| `suspendingData` | SuspendingData | Output only. Further data for the suspending state. |

### `QueueingPolicy`

- Defines the policy of the QueuedRequest.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `validAfterDuration` | string (google-duration) | Optional. A relative time after which resources may be created. |
| `validAfterTime` | string (google-datetime) | Optional. An absolute time after which resources may be created. |
| `validInterval` | Interval | Optional. An absolute time interval within which resources may be created. |
| `validUntilDuration` | string (google-duration) | Optional. A relative time after which resources should not be created. If the request cannot be fulfilled by this time the request will be failed. |
| `validUntilTime` | string (google-datetime) | Optional. An absolute time after which resources should not be created. If the request cannot be fulfilled by this time the request will be failed. |

### `ReimageNodeRequest`

- Request for ReimageNode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tensorflowVersion` | string | The version for reimage to create. |

### `Reservation`

- A reservation describes the amount of a resource 'allotted' for a defined period of time.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `name` | string | The reservation name with the format: projects/{projectID}/locations/{location}/reservations/{reservationID} |
| `standard` | Standard | A standard reservation. |
| `state` | string enum | Output only. The state of the Reservation. Values: `STATE_UNSPECIFIED`, `APPROVED`, `PROVISIONING`, `ACTIVE`, `DEPROVISIONING`, `EXPIRED`, `FAILED`. |

### `ResetQueuedResourceRequest`

- Request for ResetQueuedResource.
- Version: v2

### `RunDuration`

- Defines the maximum lifetime of the requested resource.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `maxRunDuration` | string (google-duration) | The maximum duration of the requested resource. |
| `terminationTime` | string (google-datetime) | The time at which the requested resource will be terminated. |

### `RuntimeVersion`

- A runtime version that a Node can be configured with.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | The resource name. |
| `version` | string | The runtime version. |

### `SchedulingConfig`

- Sets the scheduling options for this node.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `preemptible` | boolean | Defines whether the node is preemptible. |
| `reserved` | boolean | Whether the node is created under a reservation. |
| `spot` | boolean | Optional. Defines whether the node is Spot VM. |

### `SchedulingConfig` (v1)

- Sets the scheduling options for this node.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `preemptible` | boolean | Defines whether the node is preemptible. |
| `reserved` | boolean | Whether the node is created under a reservation. |

### `SchedulingConfig` (v2alpha1)

- Sets the scheduling options for this node.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `preemptible` | boolean | Defines whether the node is preemptible. |
| `provisioningModel` | string enum | Optional. Defines the provisioning model for the node. Values: `PROVISIONING_MODEL_UNSPECIFIED`, `STANDARD`, `SPOT`, `RESERVATION_BOUND`. |
| `reservationName` | string | Optional. Name of the reservation in which the node should be provisioned. |
| `reserved` | boolean | Whether the node is created under a reservation. |
| `spot` | boolean | Optional. Defines whether the node is Spot VM. |
| `terminationTimestamp` | string (google-datetime) | Output only. The time at which the node will be terminated. |

### `ServiceAccount`

- A service account.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `email` | string | Email address of the service account. If empty, default Compute service account will be used. |
| `scope` | array<string> | The list of scopes to be made available for this service account. If empty, access to all Cloud APIs will be allowed. |

### `ServiceIdentity`

- The per-product per-project service identity for Cloud TPU service.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `email` | string | The email address of the service identity. |

### `ShieldedInstanceConfig`

- A set of Shielded Instance options.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enableSecureBoot` | boolean | Defines whether the instance has Secure Boot enabled. |

### `SimulateMaintenanceEventRequest`

- Request for SimulateMaintenanceEvent.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `workerIds` | array<string> | The 0-based worker ID. If it is empty, worker ID 0 will be selected for maintenance event simulation. A maintenance event will only be fired on the first specified worker ID. Future implementations may support firing on multiple workers. |

### `Spot`

- Spot tier definition.
- Version: v2

### `Standard`

- Details of a standard reservation.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `capacityUnits` | string enum | Capacity units this reservation is measured in. Values: `CAPACITY_UNITS_UNSPECIFIED`, `CORES`, `CHIPS`. |
| `interval` | Interval | The start and end time of the reservation. |
| `resourceType` | string | The resource type of the reservation. |
| `size` | integer (int32) | The size of the reservation, in the units specified in the 'capacity_units' field. |
| `usage` | Usage | The current usage of the reservation. |

### `StartNodeRequest`

- Request for StartNode.
- Version: v2

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StopNodeRequest`

- Request for StopNode.
- Version: v2

### `SuspendedData`

- Further data for the suspended state.
- Version: v2

### `SuspendingData`

- Further data for the suspending state.
- Version: v2

### `Symptom`

- A Symptom instance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Timestamp when the Symptom is created. |
| `details` | string | Detailed information of the current Symptom. |
| `symptomType` | string enum | Type of the Symptom. Values: `SYMPTOM_TYPE_UNSPECIFIED`, `LOW_MEMORY`, `OUT_OF_MEMORY`, `EXECUTE_TIMED_OUT`, `MESH_BUILD_FAIL`, `HBM_OUT_OF_MEMORY`, `PROJECT_ABUSE`. |
| `workerId` | string | A string used to uniquely distinguish a worker within a TPU node. |

### `TensorFlowVersion`

- A tensorflow version that a Node can be configured with.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The resource name. |
| `version` | string | the tensorflow version. |

### `Tpu`

- Details of the TPU resource(s) being requested.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nodeSpec` | array<NodeSpec> | Optional. The TPU node(s) being requested. |

### `UpcomingMaintenance`

- Upcoming Maintenance notification information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `canReschedule` | boolean | Indicates if the maintenance can be customer triggered. |
| `latestWindowStartTime` | string | The latest time for the planned maintenance window to start. This timestamp value is in RFC3339 text format. |
| `maintenanceStatus` | string enum | The status of the maintenance. Values: `UNKNOWN`, `PENDING`, `ONGOING`. |
| `type` | string enum | Defines the type of maintenance. Values: `UNKNOWN_TYPE`, `SCHEDULED`, `UNSCHEDULED`. |
| `windowEndTime` | string | The time by which the maintenance disruption will be completed. This timestamp value is in RFC3339 text format. |
| `windowStartTime` | string | The current start time of the maintenance window. This timestamp value is in RFC3339 text format. |

### `Usage`

- Usage details of a reservation.
- Version: v2alpha1

| Field | Type | Description |
|---|---|---|
| `total` | string (int64) | The real-time value of usage within the reservation, with the unit specified in field capacity_units. |

### Shape of `AcceleratorConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "topology": "string",
  "type": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1, v2alpha1 of `tpu` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://tpu.googleapis.com/$discovery/rest?version=v2, https://tpu.googleapis.com/$discovery/rest?version=v1, https://tpu.googleapis.com/$discovery/rest?version=v2alpha1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
