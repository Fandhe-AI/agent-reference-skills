---
source: https://hypercomputecluster.googleapis.com/$discovery/rest?version=v1
---

# Cluster Director API message schemas (hypercomputecluster)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/hypercomputecluster/`.

### `BootDisk`

- A Persistent disk (https://cloud.google.com/compute/docs/disks) used as the boot disk for a Compute Engine VM instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sizeGb` | string (int64) | Optional. The size of the disk in gigabytes (GB), which must be at least 40 GB. |
| `type` | string | Optional. Persistent disk type (https://cloud.google.com/compute/docs/disks#disk-types), in the format `projects/{project}/zones/{zone}/diskTypes/{disk_type}`. |

### `BucketReference`

- A reference to a Google Cloud Storage (https://cloud.google.com/storage) bucket.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Output only. Name of the bucket. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CheckClusterHealth`

- When set in OperationStep, indicates that cluster health check should be performed.
- Version: v1

### `Cluster`

- A collection of virtual machines and connected resources forming a high-performance computing cluster capable of running large-scale, tightly coupled workloads. A cluster combines a set a compute resources that perform computations, storage resources that contain inputs and store outputs, an orchestrator that is responsible for assigning jobs to compute resources, and network resources that connect everything together.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `computeResources` | object | Optional. Compute resources available to the cluster. Keys specify the ID of the compute resource by which it can be referenced elsewhere, and must conform to RFC-1034 (https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters). |
| `createTime` | string (google-datetime) | Output only. Time that the cluster was originally created. |
| `description` | string | Optional. A description for your cluster. You can use up to 2,048 characters. |
| `labels` | object | Optional. Labels (https://cloud.google.com/compute/docs/labeling-resources) applied to the cluster. Labels can be used to organize clusters and to filter them in queries. |
| `name` | string | Identifier. Relative resource name (https://google.aip.dev/122) of the cluster, in the format `projects/{project}/locations/{location}/clusters/{cluster}`. |
| `networkResources` | object | Optional. Network resources available to the cluster. Must contain exactly one value. Keys specify the ID of the network resource by which it can be referenced elsewhere, and must conform to RFC-1034 (https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters). |
| `orchestrator` | Orchestrator | Optional. Orchestrator that is responsible for scheduling and running jobs on the cluster. |
| `reconciling` | boolean | Output only. Indicates whether changes to the cluster are currently in flight. If this is `true`, then the current state might not match the cluster's intended state. |
| `storageResources` | object | Optional. Storage resources available to the cluster. Keys specify the ID of the storage resource by which it can be referenced elsewhere, and must conform to RFC-1034 (https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters). |
| `uid` | string | Output only. The globally unique identifier for this Cluster. |
| `updateTime` | string (google-datetime) | Output only. Time that the cluster was most recently updated. |

### `ComputeInstance`

- Details about a Compute Engine instance (https://cloud.google.com/compute/docs/instances).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instance` | string | Output only. Name of the VM instance, in the format `projects/{project}/zones/{zone}/instances/{instance}`. |

### `ComputeInstanceSlurmNodeSet`

- When set in a SlurmNodeSet, indicates that the nodeset should be backed by Compute Engine VM instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bootDisk` | BootDisk | Optional. Boot disk for the compute instance |
| `labels` | object | Optional. Labels (https://cloud.google.com/compute/docs/labeling-resources) that should be applied to each VM instance in the nodeset. |
| `startupScript` | string | Optional. Startup script (https://cloud.google.com/compute/docs/instances/startup-scripts/linux) to be run on each VM instance in the nodeset. Max 256KB. |

### `ComputeResource`

- A resource defining how virtual machines and accelerators should be provisioned for the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `config` | ComputeResourceConfig | Required. Immutable. Configuration for this compute resource, which describes how it should be created at runtime. |

### `ComputeResourceConfig`

- Describes how a compute resource should be created at runtime.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `newFlexStartInstances` | NewFlexStartInstancesConfig | Optional. Immutable. If set, indicates that this resource should use flex-start VMs. |
| `newOnDemandInstances` | NewOnDemandInstancesConfig | Optional. Immutable. If set, indicates that this resource should use on-demand VMs. |
| `newReservedInstances` | NewReservedInstancesConfig | Optional. Immutable. If set, indicates that this resource should use reserved VMs. |
| `newSpotInstances` | NewSpotInstancesConfig | Optional. Immutable. If set, indicates that this resource should use spot VMs. |

### `CreateFilestoreInstance`

- When set in OperationStep, indicates that a new filestore instance should be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filestore` | string | Output only. Name of the Filestore instance, in the format `projects/{project}/locations/{location}/instances/{instance}` |

### `CreateLoginNode`

- When set in OperationStep, indicates that a login node should be created.
- Version: v1

### `CreateLustreInstance`

- When set in OperationStep, indicates that a new lustre instance should be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lustre` | string | Output only. Name of the Managed Lustre instance, in the format `projects/{project}/locations/{location}/instances/{instance}` |

### `CreateNetwork`

- When set in OperationStep, indicates that a new network should be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `network` | string | Output only. Name of the network to create, in the format `projects/{project}/global/networks/{network}`. |

### `CreateNodeset`

- When set in OperationStep, indicates that a nodeset should be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodesets` | array<string> | Output only. Name of the nodeset to create |

### `CreateOrchestrator`

- When set in OperationStep, indicates that an orchestrator should be created.
- Version: v1

### `CreatePartition`

- When set in OperationStep, indicates that a partition should be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitions` | array<string> | Output only. Name of the partition to create |

### `CreatePrivateServiceAccess`

- When set in OperationStep, indicates that a new private service access should be created.
- Version: v1

### `CreateStorageBucket`

- When set in OperationStep, indicates that a new storage bucket should be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Output only. Name of the bucket. |

### `DeleteFilestoreInstance`

- When set in OperationStep, indicates that a Filestore instance should be deleted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filestore` | string | Output only. Name of the Filestore instance, in the format `projects/{project}/locations/{location}/instances/{instance}` |

### `DeleteLoginNode`

- When set in OperationStep, indicates that a login node should be deleted.
- Version: v1

### `DeleteLustreInstance`

- When set in OperationStep, indicates that a Lustre instance should be deleted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lustre` | string | Output only. Name of the Managed Lustre instance, in the format `projects/{project}/locations/{location}/instances/{instance}` |

### `DeleteNetwork`

- When set in OperationStep, indicates network deletion step with the resource name.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `network` | string | Output only. Name of the network to delete, in the format `projects/{project}/global/networks/{network}`. |

### `DeleteNodeset`

- When set in OperationStep, indicates that a nodeset should be deleted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodesets` | array<string> | Output only. Name of the nodeset to delete |

### `DeleteOrchestrator`

- When set in OperationStep, indicates that an orchestrator should be deleted.
- Version: v1

### `DeletePartition`

- When set in OperationStep, indicates that a partition should be deleted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitions` | array<string> | Output only. Name of the partition to delete |

### `DeletePrivateServiceAccess`

- When set in OperationStep, indicates private service access deletion step.
- Version: v1

### `DeleteStorageBucket`

- When set in OperationStep, indicates that Cloud Storage bucket should be deleted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Output only. Name of the bucket. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ExistingBucketConfig`

- When set in a StorageResourceConfig, indicates that an existing Google Cloud Storage (https://cloud.google.com/storage) bucket should be imported.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Required. Immutable. Name of the Cloud Storage bucket to import. |

### `ExistingFilestoreConfig`

- When set in a StorageResourceConfig, indicates that an existing Filestore (https://cloud.google.com/filestore) instance should be imported.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filestore` | string | Required. Immutable. Name of the Filestore instance to import, in the format `projects/{project}/locations/{location}/instances/{instance}` |

### `ExistingLustreConfig`

- When set in a StorageResourceConfig, indicates that an existing Managed Lustre (https://cloud.google.com/products/managed-lustre) instance should be imported.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lustre` | string | Required. Immutable. Name of the Managed Lustre instance to import, in the format `projects/{project}/locations/{location}/instances/{instance}` |

### `ExistingNetworkConfig`

- When set in a NetworkResourceConfig, indicates that an existing network should be imported.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `network` | string | Required. Immutable. Name of the network to import, in the format `projects/{project}/global/networks/{network}`. |
| `subnetwork` | string | Required. Immutable. Particular subnetwork to use, in the format `projects/{project}/regions/{region}/subnetworks/{subnetwork}`. |

### `FileShareConfig`

- Message describing filestore configuration
- Version: v1

| Field | Type | Description |
|---|---|---|
| `capacityGb` | string (int64) | Required. Size of the filestore in GB. Must be between 1024 and 102400, and must meet scalability requirements described at https://cloud.google.com/filestore/docs/service-tiers. |
| `fileShare` | string | Required. Filestore share location |

### `FilestoreReference`

- A reference to a Filestore (https://cloud.google.com/filestore) instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filestore` | string | Output only. Name of the Filestore instance, in the format `projects/{project}/locations/{location}/instances/{instance}` |

### `GcsAutoclassConfig`

- Message describing Google Cloud Storage autoclass configuration
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Required. Enables Auto-class feature. |
| `terminalStorageClass` | string enum | Optional. Terminal storage class of the autoclass bucket Values: `TERMINAL_STORAGE_CLASS_UNSPECIFIED`, `NEARLINE`, `ARCHIVE`. |

### `GcsHierarchicalNamespaceConfig`

- Message describing Google Cloud Storage hierarchical namespace configuration
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Required. Enables hierarchical namespace setup for the bucket. |

### `ListClustersResponse`

- Response message for ListClusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusters` | array<Cluster> | Clusters in the specified location. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is absent, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `LustreReference`

- A reference to a Managed Lustre (https://cloud.google.com/products/managed-lustre) instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lustre` | string | Output only. Name of the Managed Lustre instance, in the format `projects/{project}/locations/{location}/instances/{instance}` |

### `NetworkReference`

- A reference to a VPC network (https://cloud.google.com/vpc/docs/vpc) in Google Compute Engine.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `network` | string | Output only. Name of the network, in the format `projects/{project}/global/networks/{network}`. |
| `subnetwork` | string | Output only. Name of the particular subnetwork being used by the cluster, in the format `projects/{project}/regions/{region}/subnetworks/{subnetwork}`. |

### `NetworkResource`

- A resource representing a network that connects the various components of a cluster together.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `config` | NetworkResourceConfig | Immutable. Configuration for this network resource, which describes how it should be created or imported. This field only controls how the network resource is initially created or imported. Subsequent changes to the network resource should be made via the resource's API and will not be reflected in the configuration. |
| `network` | NetworkReference | Output only. A reference to a network in Google Compute Engine. |

### `NetworkResourceConfig`

- Describes how a network resource should be initialized. Each network resource can either be imported from an existing Google Cloud resource or initialized when the cluster is created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `existingNetwork` | ExistingNetworkConfig | Optional. Immutable. If set, indicates that an existing network should be imported. |
| `newNetwork` | NewNetworkConfig | Optional. Immutable. If set, indicates that a new network should be created. |

### `NewBucketConfig`

- When set in a StorageResourceConfig, indicates that a new Google Cloud Storage (https://cloud.google.com/storage) bucket should be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoclass` | GcsAutoclassConfig | Optional. Immutable. If set, indicates that the bucket should use Autoclass (https://cloud.google.com/storage/docs/autoclass). |
| `bucket` | string | Required. Immutable. Name of the Cloud Storage bucket to create. |
| `hierarchicalNamespace` | GcsHierarchicalNamespaceConfig | Optional. Immutable. If set, indicates that the bucket should use hierarchical namespaces (https://cloud.google.com/storage/docs/hns-overview). |
| `storageClass` | string enum | Optional. Immutable. If set, uses the provided storage class as the bucket's default storage class. Values: `STORAGE_CLASS_UNSPECIFIED`, `STANDARD`, `NEARLINE`, `COLDLINE`, `ARCHIVE`, `RAPID`. |

### `NewFilestoreConfig`

- When set in a StorageResourceConfig, indicates that a new Filestore (https://cloud.google.com/filestore) instance should be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Immutable. Description of the instance. Maximum of 2048 characters. |
| `fileShares` | array<FileShareConfig> | Required. Immutable. File system shares on the instance. Exactly one file share must be specified. |
| `filestore` | string | Required. Immutable. Name of the Filestore instance to create, in the format `projects/{project}/locations/{location}/instances/{instance}`. |
| `protocol` | string enum | Optional. Immutable. Access protocol to use for all file shares in the instance. Defaults to NFS V3 if not set. Values: `PROTOCOL_UNSPECIFIED`, `NFSV3`, `NFSV41`. |
| `tier` | string enum | Required. Immutable. Service tier to use for the instance. Values: `TIER_UNSPECIFIED`, `ZONAL`, `REGIONAL`. |

### `NewFlexStartInstancesConfig`

- When set in a ComputeResourceConfig, indicates that VM instances should be created using Flex Start (https://cloud.google.com/compute/docs/instances/provisioning-models).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `machineType` | string | Required. Immutable. Name of the Compute Engine machine type (https://cloud.google.com/compute/docs/machine-resource) to use, e.g. `n2-standard-2`. |
| `maxDuration` | string (google-duration) | Required. Immutable. Specifies the time limit for created instances. Instances will be terminated at the end of this duration. |
| `zone` | string | Required. Immutable. Name of the zone in which VM instances should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster. |

### `NewLustreConfig`

- When set in a StorageResourceConfig, indicates that a new Managed Lustre (https://cloud.google.com/products/managed-lustre) instance should be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `capacityGb` | string (int64) | Required. Immutable. Storage capacity of the instance in gibibytes (GiB). Allowed values are between 18000 and 7632000. |
| `description` | string | Optional. Immutable. Description of the Managed Lustre instance. Maximum of 2048 characters. |
| `filesystem` | string | Required. Immutable. Filesystem name for this instance. This name is used by client-side tools, including when mounting the instance. Must be 8 characters or less and can only contain letters and numbers. |
| `lustre` | string | Required. Immutable. Name of the Managed Lustre instance to create, in the format `projects/{project}/locations/{location}/instances/{instance}` |
| `perUnitStorageThroughput` | string (int64) | Optional. Immutable. Throughput of the instance in MB/s/TiB. Valid values are 125, 250, 500, 1000. See Performance tiers and maximum storage capacities (https://cloud.google.com/managed-lustre/docs/create-instance#performance-tiers) for more information. |

### `NewNetworkConfig`

- When set in a NetworkResourceConfig, indicates that a new network should be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Immutable. Description of the network. Maximum of 2048 characters. |
| `network` | string | Required. Immutable. Name of the network to create, in the format `projects/{project}/global/networks/{network}`. |

### `NewOnDemandInstancesConfig`

- When set in a ComputeResourceConfig, indicates that on-demand (i.e., using the standard provisioning model) VM instances should be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `machineType` | string | Required. Immutable. Name of the Compute Engine machine type (https://cloud.google.com/compute/docs/machine-resource) to use, e.g. `n2-standard-2`. |
| `zone` | string | Required. Immutable. Name of the zone in which VM instances should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster. |

### `NewReservedInstancesConfig`

- When set in a ComputeResourceConfig, indicates that VM instances should be created from a reservation (https://cloud.google.com/compute/docs/instances/reservations-overview).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reservation` | string | Optional. Immutable. Name of the reservation from which VM instances should be created, in the format `projects/{project}/zones/{zone}/reservations/{reservation}`. |

### `NewSpotInstancesConfig`

- When set in a ComputeResourceConfig, indicates that spot VM (https://cloud.google.com/compute/docs/instances/spot) instances should be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `machineType` | string | Required. Immutable. Name of the Compute Engine machine type (https://cloud.google.com/compute/docs/machine-resource) to use, e.g. `n2-standard-2`. |
| `terminationAction` | string enum | Optional. Termination action for the instance. If not specified, Compute Engine sets the termination action to DELETE. Values: `TERMINATION_ACTION_UNSPECIFIED`, `STOP`, `DELETE`. |
| `zone` | string | Required. Immutable. Name of the zone in which VM instances should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `progress` | OperationProgress | Output only. Progress of the operation. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `OperationProgress`

- Message describing the progress of a cluster mutation long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `steps` | array<OperationStep> | Output only. Steps and status of the operation. |

### `OperationStep`

- Message describing the status of a single step in a cluster mutation long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checkClusterHealth` | CheckClusterHealth | Output only. If set, indicates that cluster health check is part of the operation. |
| `createFilestoreInstance` | CreateFilestoreInstance | Output only. If set, indicates that new Filestore instance creation is part of the operation. |
| `createLoginNode` | CreateLoginNode | Output only. If set, indicates that new login node creation is part of the operation. |
| `createLustreInstance` | CreateLustreInstance | Output only. If set, indicates that new Lustre instance creation is part of the operation. |
| `createNetwork` | CreateNetwork | Output only. If set, indicates that new network creation is part of the operation. |
| `createNodeset` | CreateNodeset | Output only. If set, indicates that new nodeset creation is part of the operation. |
| `createOrchestrator` | CreateOrchestrator | Output only. If set, indicates that orchestrator creation is part of the operation. |
| `createPartition` | CreatePartition | Output only. If set, indicates that new partition creation is part of the operation. |
| `createPrivateServiceAccess` | CreatePrivateServiceAccess | Output only. If set, indicates that new private service access creation is part of the operation. |
| `createStorageBucket` | CreateStorageBucket | Output only. If set, indicates that new Cloud Storage bucket creation is part of the operation. |
| `deleteFilestoreInstance` | DeleteFilestoreInstance | Output only. If set, indicates that Filestore instance deletion is part of the operation. |
| `deleteLoginNode` | DeleteLoginNode | Output only. If set, indicates that login node deletion is part of the operation. |
| `deleteLustreInstance` | DeleteLustreInstance | Output only. If set, indicates that Lustre instance deletion is part of the operation. |
| `deleteNetwork` | DeleteNetwork | Output only. If set, indicates that network deletion is part of the operation. |
| `deleteNodeset` | DeleteNodeset | Output only. If set, indicates that nodeset deletion is part of the operation. |
| `deleteOrchestrator` | DeleteOrchestrator | Output only. If set, indicates that orchestrator deletion is part of the operation. |
| `deletePartition` | DeletePartition | Output only. If set, indicates that partition deletion is part of the operation. |
| `deletePrivateServiceAccess` | DeletePrivateServiceAccess | Output only. If set, indicates that private service access deletion is part of the operation. |
| `deleteStorageBucket` | DeleteStorageBucket | Output only. If set, indicates that Cloud Storage bucket deletion is part of the operation. |
| `state` | string enum | Output only. State of the operation step. Values: `STATE_UNSPECIFIED`, `WAITING`, `IN_PROGRESS`, `DONE`. |
| `updateLoginNode` | UpdateLoginNode | Output only. If set, indicates that login node update is part of the operation. |
| `updateNodeset` | UpdateNodeset | Output only. If set, indicates that nodeset update is part of the operation. |
| `updateOrchestrator` | UpdateOrchestrator | Output only. If set, indicates that an orchestrator update is part of the operation. |
| `updatePartition` | UpdatePartition | Output only. If set, indicates that partition update is part of the operation. |

### `Orchestrator`

- The component responsible for scheduling and running workloads on the cluster as well as providing the user interface for interacting with the cluster at runtime.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `slurm` | SlurmOrchestrator | Optional. If set, indicates that the cluster should use Slurm as the orchestrator. |

### `SlurmLoginNodes`

- Configuration for Slurm login nodes (https://slurm.schedmd.com/quickstart_admin.html#login) in the cluster. Login nodes are Compute Engine VM instances that allow users to access the cluster over SSH.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bootDisk` | BootDisk | Optional. Boot disk for the login node. |
| `count` | string (int64) | Required. Number of login node instances to create. |
| `enableOsLogin` | boolean | Optional. Whether OS Login (https://cloud.google.com/compute/docs/oslogin) should be enabled on login node instances. |
| `enablePublicIps` | boolean | Optional. Whether login node instances should be assigned external IP addresses (https://cloud.google.com/compute/docs/ip-addresses#externaladdresses). |
| `instances` | array<ComputeInstance> | Output only. Information about the login node instances that were created in Compute Engine. |
| `labels` | object | Optional. Labels (https://cloud.google.com/compute/docs/labeling-resources) that should be applied to each login node instance. |
| `machineType` | string | Required. Name of the Compute Engine machine type (https://cloud.google.com/compute/docs/machine-resource) to use for login nodes, e.g. `n2-standard-2`. |
| `startupScript` | string | Optional. Startup script (https://cloud.google.com/compute/docs/instances/startup-scripts/linux) to be run on each login node instance. Max 256KB. The script must complete within the system-defined default timeout of 5 minutes. For tasks that require more time, consider running them in the background using methods such as `&` or `nohup`. |
| `storageConfigs` | array<StorageConfig> | Optional. How storage resources should be mounted on each login node. |
| `zone` | string | Required. Name of the zone in which login nodes should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster. |

### `SlurmNodeSet`

- Configuration for Slurm nodesets in the cluster. Nodesets are groups of compute nodes used by Slurm that are responsible for running workloads submitted to the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `computeId` | string | Required. The ID of the compute resource on which this nodeset runs. Must match a key in the cluster's compute_resources. |
| `computeInstance` | ComputeInstanceSlurmNodeSet | Optional. If set, indicates that the nodeset should be backed by Compute Engine instances. |
| `id` | string | Required. The ID for the nodeset, which allows it to be referenced by cluster partitions. The nodeset ID must start with a lowercase letter (`a`-`z`), use only lowercase letters or numbers, and contain up to 15 characters. For example, specify `nodeset001`. |
| `maxDynamicNodeCount` | string (int64) | Optional. Controls how many additional nodes a cluster can bring online to handle workloads. Set this value to enable dynamic node creation and limit the number of additional nodes the cluster can bring online. Leave empty if you do not want the cluster to create nodes dynamically, and instead rely only on static nodes. |
| `staticNodeCount` | string (int64) | Optional. Number of nodes to be statically created for this nodeset. The cluster will attempt to ensure that at least this many nodes exist at all times. |
| `storageConfigs` | array<StorageConfig> | Optional. How storage resources should be mounted on each compute node. |

### `SlurmOrchestrator`

- When set in Orchestrator, indicates that the cluster should use Slurm (https://slurm.schedmd.com/) as the orchestrator.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultPartition` | string | Optional. Default partition to use for submitted jobs that do not explicitly specify a partition. Required if and only if there is more than one partition, in which case it must match the id of one of the partitions. |
| `epilogBashScripts` | array<string> | Optional. Slurm epilog scripts (https://slurm.schedmd.com/prolog_epilog.html), which will be executed by compute nodes whenever a node finishes running a job. Values must not be empty. |
| `loginNodes` | SlurmLoginNodes | Required. Configuration for login nodes, which allow users to access the cluster over SSH. |
| `nodeSets` | array<SlurmNodeSet> | Optional. Compute resource configuration for the Slurm nodesets in your cluster. If not specified, the cluster won't create any nodes. |
| `partitions` | array<SlurmPartition> | Optional. Configuration for the Slurm partitions in your cluster. Each partition can contain one or more nodesets, and you can submit separate jobs on each partition. If you don't specify at least one partition in your cluster, you can't submit jobs to the cluster. |
| `prologBashScripts` | array<string> | Optional. Slurm prolog scripts (https://slurm.schedmd.com/prolog_epilog.html), which will be executed by compute nodes before a node begins running a new job. Values must not be empty. |

### `SlurmPartition`

- Configuration for Slurm partitions in the cluster. Partitions are groups of nodesets, and are how clients specify where their workloads should be run.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Required. ID of the partition, which is how users will identify it. Must conform to RFC-1034 (https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters). |
| `nodeSetIds` | array<string> | Required. IDs of the nodesets that make up this partition. Values must match SlurmNodeSet.id. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StorageConfig`

- Description of how a storage resource should be mounted on a VM instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Required. ID of the storage resource to mount, which must match a key in the cluster's storage_resources. |
| `localMount` | string | Required. A directory inside the VM instance's file system where the storage resource should be mounted (e.g., `/mnt/share`). |

### `StorageResource`

- Represents a form of persistent storage that you can mount onto compute resources in the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | BucketReference | Output only. A reference to a Google Cloud Storage bucket. Populated if and only if the storage resource was configured to use Google Cloud Storage. |
| `config` | StorageResourceConfig | Required. Immutable. Configuration for this storage resource, which describes how it should be created or imported. This field only controls how the storage resource is initially created or imported. Subsequent changes to the storage resource should be made via the resource's API and will not be reflected in the configuration. |
| `filestore` | FilestoreReference | Output only. A reference to a Filestore instance. Populated if and only if the storage resource was configured to use Filestore. |
| `lustre` | LustreReference | Output only. A reference to a Managed Lustre instance. Populated if and only if the storage resource was configured to use Managed Lustre. |

### `StorageResourceConfig`

- Describes how a storage resource should be initialized. Each storage resource can either be imported from an existing Google Cloud resource or initialized when the cluster is created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `existingBucket` | ExistingBucketConfig | Optional. Immutable. If set, indicates that an existing Cloud Storage bucket should be imported. |
| `existingFilestore` | ExistingFilestoreConfig | Optional. Immutable. If set, indicates that an existing Filestore instance should be imported. |
| `existingLustre` | ExistingLustreConfig | Optional. Immutable. If set, indicates that an existing Managed Lustre instance should be imported. |
| `newBucket` | NewBucketConfig | Optional. Immutable. If set, indicates that a new Cloud Storage bucket should be created. |
| `newFilestore` | NewFilestoreConfig | Optional. Immutable. If set, indicates that a new Filestore instance should be created. |
| `newLustre` | NewLustreConfig | Optional. Immutable. If set, indicates that a new Managed Lustre instance should be created. |

### `UpdateLoginNode`

- When set in OperationStep, indicates that a login node should be updated.
- Version: v1

### `UpdateNodeset`

- When set in OperationStep, indicates that a nodeset should be updated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodesets` | array<string> | Output only. Name of the nodeset to update |

### `UpdateOrchestrator`

- When set in OperationStep, indicates that an orchestrator should be updated.
- Version: v1

### `UpdatePartition`

- When set in OperationStep, indicates that a partition should be updated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitions` | array<string> | Output only. Name of the partition to update |

### Shape of `BootDisk`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "sizeGb": "string (int64)",
  "type": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `hypercomputecluster` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://hypercomputecluster.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
