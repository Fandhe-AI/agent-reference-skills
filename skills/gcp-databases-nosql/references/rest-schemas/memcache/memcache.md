---
source: https://memcache.googleapis.com/$discovery/rest?version=v1
---

# Cloud Memorystore for Memcached API message schemas (memcache)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/memcache/`.

### `ApplyParametersRequest`

- Request for ApplyParameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applyAll` | boolean | Whether to apply instance-level parameter group to all nodes. If set to true, users are restricted from specifying individual nodes, and `ApplyParameters` updates all nodes within the instance. |
| `nodeIds` | array<string> | Nodes to which the instance-level parameter group is applied. |

### `ApplySoftwareUpdateRequest`

- Request for ApplySoftwareUpdate.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `applyAll` | boolean | Whether to apply the update to all nodes. If set to true, will explicitly restrict users from specifying any nodes, and apply software update to all nodes (where applicable) within the instance. |
| `nodeIds` | array<string> | Nodes to which we should apply the update to. Note all the selected nodes are updated in parallel. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `DailyCycle`

- Time window specified for daily operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | Output only. Duration of the time window, set by service producer. |
| `startTime` | TimeOfDay | Time within the day to start the operations. |

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `DenyMaintenancePeriod`

- DenyMaintenancePeriod definition. Maintenance is forbidden within the deny period. The start_date must be less than the end_date.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endDate` | Date | Deny period end date. This can be: \* A full date, with non-zero year, month and day values. \* A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be before the end. |
| `startDate` | Date | Deny period start date. This can be: \* A full date, with non-zero year, month and day values. \* A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be the same or after the start. |
| `time` | TimeOfDay | Time in UTC when the Blackout period starts on start_date and ends on end_date. This can be: \* Full time. \* All zeros for 00:00:00 UTC |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `GetTagsRequest`

- Request message for GetTags.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The full resource name of the service resource. |

### `GetTagsResponse`

- Response message for GetTags.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | A checksum based on the current bindings. This field is always set in server responses. |
| `name` | string | Required. The full resource name of the service resource. |
| `tags` | object | Required. Tag keys/values directly bound to this resource. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" |

### `GoogleCloudMemcacheV1LocationMetadata`

- Metadata for the given google.cloud.location.Location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableZones` | object | Output only. The set of available zones in the location. The map is keyed by the lowercase ID of each zone, as defined by GCE. These keys can be specified in the `zones` field when creating a Memcached instance. |

### `GoogleCloudMemcacheV1MaintenancePolicy`

- Maintenance policy per instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the policy was created. |
| `description` | string | Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512. |
| `updateTime` | string (google-datetime) | Output only. The time when the policy was updated. |
| `weeklyMaintenanceWindow` | array<WeeklyMaintenanceWindow> | Required. Maintenance window that is applied to resources covered by this policy. Minimum 1. For the current version, the maximum number of weekly_maintenance_windows is expected to be one. |

### `GoogleCloudMemcacheV1OperationMetadata`

- Represents the metadata of a long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `cancelRequested` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | Output only. Time when the operation was created. |
| `endTime` | string (google-datetime) | Output only. Time when the operation finished running. |
| `statusDetail` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleCloudMemcacheV1UpgradeInstanceRequest`

- Request for UpgradeInstance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `memcacheVersion` | string enum | Required. Specifies the target version of memcached engine to upgrade to. Values: `MEMCACHE_VERSION_UNSPECIFIED`, `MEMCACHE_1_5`, `MEMCACHE_1_6_15`. |

### `GoogleCloudMemcacheV1ZoneMetadata`

-
- Version: v1

### `GoogleCloudMemcacheV1beta2LocationMetadata`

- Metadata for the given google.cloud.location.Location.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `availableZones` | object | Output only. The set of available zones in the location. The map is keyed by the lowercase ID of each zone, as defined by GCE. These keys can be specified in the `zones` field when creating a Memcached instance. |

### `GoogleCloudMemcacheV1beta2MaintenancePolicy`

- Maintenance policy per instance.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the policy was created. |
| `description` | string | Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512. |
| `updateTime` | string (google-datetime) | Output only. The time when the policy was updated. |
| `weeklyMaintenanceWindow` | array<WeeklyMaintenanceWindow> | Required. Maintenance window that is applied to resources covered by this policy. Minimum 1. For the current version, the maximum number of weekly_maintenance_windows is expected to be one. |

### `GoogleCloudMemcacheV1beta2OperationMetadata`

- Represents the metadata of a long-running operation.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `cancelRequested` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | Output only. Time when the operation was created. |
| `endTime` | string (google-datetime) | Output only. Time when the operation finished running. |
| `statusDetail` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleCloudMemcacheV1beta2UpgradeInstanceRequest`

- Request for UpgradeInstance.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `memcacheVersion` | string enum | Required. Specifies the target version of memcached engine to upgrade to. Values: `MEMCACHE_VERSION_UNSPECIFIED`, `MEMCACHE_1_5`, `MEMCACHE_1_6_15`. |

### `GoogleCloudMemcacheV1beta2ZoneMetadata`

-
- Version: v1beta2

### `GoogleCloudSaasacceleratorManagementProvidersV1Instance`

- Instance represents the interface for SLM services to actuate the state of control plane resources. Example Instance in JSON, where consumer-project-number=123456, producer-project-id=cloud-sql: Instance: { "name": "projects/123456/locations/us-east1/instances/prod-instance", "create_time": { "seconds": 1526406431, }, "labels": { "env": "prod", "foo": "bar" }, "state": READY, "software_versions": { "software_update": "cloud-sql-09-28-2018", }, "maintenance_policy_names": { "UpdatePolicy": "projects/123456/locations/us-east1/maintenancePolicies/prod-update-policy", } "tenant_project_id": "cloud-sql-test-tenant", "producer_metadata": { "cloud-sql-tier": "basic", "cloud-sql-instance-size": "1G", }, "provisioned_resources": \[ { "resource-type": "compute-instance", "resource-url": "https://www.googleapis.com/compute/v1/projects/cloud-sql/zones/us-east1-b/instances/vm-1", } \], "maintenance_schedules": { "csa_rollout": { "start_time": { "seconds": 1526406431, }, "end_time": { "seconds": 1535406431, }, }, "ncsa_rollout": { "start_time": { "seconds": 1526406431, }, "end_time": { "seconds": 1535406431, }, } }, "consumer_defined_name": "my-sql-instance1", } LINT.IfChange
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerDefinedName` | string | consumer_defined_name is the name of the instance set by the service consumers. Generally this is different from the `name` field which reperesents the system-assigned id of the instance which the service consumers do not recognize. This is a required field for tenants onboarding to Maintenance Window notifications ((internal link)#prerequisites). |
| `consumerProjectNumber` | string | Optional. The consumer_project_number associated with this Apigee instance. This field is added specifically to support Apigee integration with SLM Rollout and UMM. It represents the numerical project ID of the GCP project that consumes this Apigee instance. It is used for SLM rollout notifications and UMM integration, enabling proper mapping to customer projects and log delivery for Apigee instances. This field complements consumer_project_id and may be used for specific Apigee scenarios where the numerical ID is required. |
| `createTime` | string (google-datetime) | Output only. Timestamp when the resource was created. |
| `instanceType` | string | Optional. The instance_type of this instance of format: projects/{project_number}/locations/{location_id}/instanceTypes/{instance_type_id}. Instance Type represents a high-level tier or SKU of the service that this instance belong to. When enabled(eg: Maintenance Rollout), Rollout uses 'instance_type' along with 'software_versions' to determine whether instance needs an update or not. |
| `labels` | object | Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. |
| `maintenancePolicyNames` | object | Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the referenced policy must define the same policy type. For details, please refer to (internal link). Should not be set if maintenance_settings.maintenance_policies is set. |
| `maintenanceSchedules` | object | The MaintenanceSchedule contains the scheduling information of published maintenance schedule with same key as software_versions. |
| `maintenanceSettings` | GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings | Optional. The MaintenanceSettings associated with instance. |
| `name` | string | Unique name of the resource. It uses the form: `projects/{project_number}/locations/{location_id}/instances/{instance_id}` Note: This name is passed, stored and logged across the rollout system. So use of consumer project_id or any other consumer PII in the name is strongly discouraged for wipeout ((internal link)) compliance. See (internal link)#storage-guidance for more details. |
| `notificationParameters` | object | Optional. notification_parameter are information that service producers may like to include that is not relevant to Rollout. This parameter will only be passed to Gamma and Cloud Logging for notification/logging purpose. |
| `producerMetadata` | object | Output only. Custom string attributes used primarily to expose producer-specific information in monitoring dashboards. See (internal link). |
| `provisionedResources` | array<GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource> | Output only. The list of data plane resources provisioned for this instance, e.g. compute VMs. See (internal link). |
| `slmInstanceTemplate` | string | Link to the SLM instance template. Only populated when updating SLM instances via SSA's Actuation service adaptor. Service producers with custom control plane (e.g. Cloud SQL) doesn't need to populate this field. Instead they should use software_versions. |
| `sloMetadata` | GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata | Output only. SLO metadata for instance classification in the Standardized dataplane SLO platform. See (internal link) for feature description. |
| `softwareVersions` | object | Software versions that are used to deploy this instance. This can be mutated by rollout services. |
| `state` | string enum | Output only. Current lifecycle state of the resource (e.g. if it's being created or ready to use). Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `UPDATING`, `REPAIRING`, `DELETING`, `ERROR`. |
| `tenantProjectId` | string | Output only. ID of the associated GCP tenant project. See (internal link). |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the resource was last modified. |

### `GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule`

- Maintenance schedule which is exposed to customer and potentially end user, indicating published upcoming future maintenance schedule
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canReschedule` | boolean | This field is deprecated, and will be always set to true since reschedule can happen multiple times now. This field should not be removed until all service producers remove this for their customers. |
| `endTime` | string (google-datetime) | The scheduled end time for the maintenance. |
| `rolloutManagementPolicy` | string | The rollout management policy this maintenance schedule is associated with. When doing reschedule update request, the reschedule should be against this given policy. |
| `scheduleDeadlineTime` | string (google-datetime) | schedule_deadline_time is the time deadline any schedule start time cannot go beyond, including reschedule. It's normally the initial schedule start time plus maintenance window length (1 day or 1 week). Maintenance cannot be scheduled to start beyond this deadline. |
| `startTime` | string (google-datetime) | The scheduled start time for the maintenance. |

### `GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings`

- Maintenance settings associated with instance. Allows service producers and end users to assign settings that controls maintenance on this instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exclude` | boolean | Optional. Exclude instance from maintenance. When true, rollout service will not attempt maintenance on the instance. Rollout service will include the instance in reported rollout progress as not attempted. |
| `isRollback` | boolean | Optional. If the update call is triggered from rollback, set the value as true. |
| `maintenancePolicies` | object | Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the embedded policy must define the same policy type. For details, please refer to (internal link). Should not be set if maintenance_policy_names is set. If only the name is needed, then only populate MaintenancePolicy.name. |

### `GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata`

- Node information for custom per-node SLO implementations. SSA does not support per-node SLO, but producers can populate per-node information in SloMetadata for custom precomputations. SSA Eligibility Exporter will emit per-node metric based on this information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | The location of the node, if different from instance location. |
| `nodeId` | string | The id of the node. This should be equal to SaasInstanceNode.node_id. |
| `perSliEligibility` | GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility | If present, this will override eligibility for the node coming from instance or exclusions for specified SLIs. |

### `GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter`

- Contains notification related data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<string> | Optional. Array of string values. e.g. instance's replica information. |

### `GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility`

- PerSliSloEligibility is a mapping from an SLI name to eligibility.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eligibilities` | object | An entry in the eligibilities map specifies an eligibility for a particular SLI for the given instance. The SLI key in the name must be a valid SLI name specified in the Eligibility Exporter binary flags otherwise an error will be emitted by Eligibility Exporter and the oncaller will be alerted. If an SLI has been defined in the binary flags but the eligibilities map does not contain it, the corresponding SLI time series will not be emitted by the Eligibility Exporter. This ensures a smooth rollout and compatibility between the data produced by different versions of the Eligibility Exporters. If eligibilities map contains a key for an SLI which has not been declared in the binary flags, there will be an error message emitted in the Eligibility Exporter log and the metric for the SLI in question will not be emitted. |

### `GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource`

- Describes provisioned dataplane resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceType` | string | Type of the resource. This can be either a GCP resource or a custom one (e.g. another cloud provider's VM). For GCP compute resources use singular form of the names listed in GCP compute API documentation (https://cloud.google.com/compute/docs/reference/rest/v1/), prefixed with 'compute-', for example: 'compute-instance', 'compute-disk', 'compute-autoscaler'. |
| `resourceUrl` | string | URL identifying the resource, e.g. "https://www.googleapis.com/compute/v1/projects/...)". |

### `GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility`

- SloEligibility is a tuple containing eligibility value: true if an instance is eligible for SLO calculation or false if it should be excluded from all SLO-related calculations along with a user-defined reason.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eligible` | boolean | Whether an instance is eligible or ineligible. |
| `reason` | string | User-defined reason for the current value of instance eligibility. Usually, this can be directly mapped to the internal state. An empty reason is allowed. |

### `GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata`

- SloMetadata contains resources required for proper SLO classification of the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodes` | array<GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata> | Optional. List of nodes. Some producers need to use per-node metadata to calculate SLO. This field allows such producers to publish per-node SLO meta data, which will be consumed by SSA Eligibility Exporter and published in the form of per node metric to Monarch. |
| `perSliEligibility` | GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility | Optional. Multiple per-instance SLI eligibilities which apply for individual SLIs. |
| `tier` | string | Name of the SLO tier the Instance belongs to. This name will be expected to match the tiers specified in the service SLO configuration. Field is mandatory and must not be empty. |

### `Instance`

- A Memorystore for Memcached instance
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizedNetwork` | string | The full name of the Google Compute Engine network to which the instance is connected. If left unspecified, the `default` network will be used. |
| `availableMaintenanceVersions` | array<string> | Output only. The available maintenance versions that can be applied to the instance. |
| `createTime` | string (google-datetime) | Output only. The time the instance was created. |
| `discoveryEndpoint` | string | Output only. Endpoint for the Discovery API. |
| `displayName` | string | User provided name for the instance, which is only used for display purposes. Cannot be more than 80 characters. |
| `effectiveMaintenanceVersion` | string | Output only. The effective maintenance version of the instance. |
| `instanceMessages` | array<InstanceMessage> | List of messages that describe the current state of the Memcached instance. |
| `labels` | object | Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources |
| `maintenancePolicy` | GoogleCloudMemcacheV1MaintenancePolicy | The maintenance policy for the instance. If not provided, the maintenance event will be performed based on Memorystore internal rollout schedule. |
| `maintenanceSchedule` | MaintenanceSchedule | Output only. Published maintenance schedule. |
| `maintenanceVersion` | string | Optional. Last self service update maintenance version triggered by the customer. If it is empty, it means that the maintenance version is not set by the user. |
| `memcacheFullVersion` | string | Output only. The full version of memcached server running on this instance. System automatically determines the full memcached version for an instance based on the input MemcacheVersion. The full version format will be "memcached-1.5.16". |
| `memcacheNodes` | array<Node> | Output only. List of Memcached nodes. Refer to Node message for more details. |
| `memcacheVersion` | string enum | The major version of Memcached software. If not provided, latest supported version will be used. Currently the latest supported major version is `MEMCACHE_1_5`. The minor version will be automatically determined by our system based on the latest supported minor version. Values: `MEMCACHE_VERSION_UNSPECIFIED`, `MEMCACHE_1_5`, `MEMCACHE_1_6_15`. |
| `name` | string | Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Memcached instances are managed and addressed at the regional level so `location_id` here refers to a Google Cloud region; however, users may choose which zones Memcached nodes should be provisioned in within an instance. Refer to zones field for more details. |
| `nodeConfig` | NodeConfig | Required. Configuration for Memcached nodes. |
| `nodeCount` | integer (int32) | Required. Number of nodes in the Memcached instance. |
| `parameters` | MemcacheParameters | User defined parameters to apply to the memcached process on each node. |
| `reservedIpRangeId` | array<string> | Optional. Contains the id of allocated IP address ranges associated with the private service access connection for example, "test-default" associated with IP range 10.0.0.0/29. |
| `satisfiesPzi` | boolean | Optional. Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Optional. Output only. Reserved for future use. |
| `state` | string enum | Output only. The state of this Memcached instance. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `UPDATING`, `DELETING`, `PERFORMING_MAINTENANCE`, `MEMCACHE_VERSION_UPGRADING`. |
| `updateTime` | string (google-datetime) | Output only. The time the instance was updated. |
| `zones` | array<string> | Zones in which Memcached nodes should be provisioned. Memcached nodes will be equally distributed across these zones. If not provided, the service will by default create nodes in all zones in the region for the instance. |

### `Instance` (v1beta2)

- A Memorystore for Memcached instance
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `authorizedNetwork` | string | The full name of the Google Compute Engine network (https://cloud.google.com/vpc/docs/vpc) to which the instance is connected. If left unspecified, the `default` network will be used. |
| `availableMaintenanceVersions` | array<string> | Output only. The available maintenance versions that can be applied to the instance. |
| `createTime` | string (google-datetime) | Output only. The time the instance was created. |
| `discoveryEndpoint` | string | Output only. Endpoint for the Discovery API. |
| `displayName` | string | User provided name for the instance, which is only used for display purposes. Cannot be more than 80 characters. |
| `effectiveMaintenanceVersion` | string | Output only. The effective maintenance version of the instance. |
| `instanceMessages` | array<InstanceMessage> | List of messages that describe the current state of the Memcached instance. |
| `labels` | object | Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources |
| `maintenancePolicy` | GoogleCloudMemcacheV1beta2MaintenancePolicy | The maintenance policy for the instance. If not provided, the maintenance event will be performed based on Memorystore internal rollout schedule. |
| `maintenanceSchedule` | MaintenanceSchedule | Output only. Published maintenance schedule. |
| `maintenanceVersion` | string | Optional. Last self service update maintenance version triggered by the customer. If it is empty, it means that the maintenance version is not set by the user. |
| `memcacheFullVersion` | string | Output only. The full version of memcached server running on this instance. System automatically determines the full memcached version for an instance based on the input MemcacheVersion. The full version format will be "memcached-1.5.16". |
| `memcacheNodes` | array<Node> | Output only. List of Memcached nodes. Refer to Node message for more details. |
| `memcacheVersion` | string enum | The major version of Memcached software. If not provided, latest supported version will be used. Currently the latest supported major version is `MEMCACHE_1_5`. The minor version will be automatically determined by our system based on the latest supported minor version. Values: `MEMCACHE_VERSION_UNSPECIFIED`, `MEMCACHE_1_5`, `MEMCACHE_1_6_15`. |
| `name` | string | Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Memcached instances are managed and addressed at the regional level so `location_id` here refers to a Google Cloud region; however, users may choose which zones Memcached nodes should be provisioned in within an instance. Refer to zones field for more details. |
| `nodeConfig` | NodeConfig | Required. Configuration for Memcached nodes. |
| `nodeCount` | integer (int32) | Required. Number of nodes in the Memcached instance. |
| `parameters` | MemcacheParameters | User defined parameters to apply to the memcached process on each node. |
| `reservedIpRangeId` | array<string> | Optional. Contains the id of allocated IP address ranges associated with the private service access connection for example, "test-default" associated with IP range 10.0.0.0/29. |
| `satisfiesPzi` | boolean | Optional. Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Optional. Output only. Reserved for future use. |
| `state` | string enum | Output only. The state of this Memcached instance. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `UPDATING`, `DELETING`, `PERFORMING_MAINTENANCE`, `MEMCACHE_VERSION_UPGRADING`. |
| `updateAvailable` | boolean | Output only. Returns true if there is an update waiting to be applied |
| `updateTime` | string (google-datetime) | Output only. The time the instance was updated. |
| `zones` | array<string> | Zones in which Memcached nodes should be provisioned. Memcached nodes will be equally distributed across these zones. If not provided, the service will by default create nodes in all zones in the region for the instance. |

### `InstanceMessage`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | A code that correspond to one type of user-facing message. Values: `CODE_UNSPECIFIED`, `ZONE_DISTRIBUTION_UNBALANCED`. |
| `message` | string | Message on memcached instance which will be exposed to users. |

### `ListInstancesResponse`

- Response for ListInstances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<Instance> | A list of Memcached instances in the project in the specified location, or across all locations. If the `location_id` in the parent field of the request is "-", all regions available to the project are queried, and the results aggregated. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListInstancesResponse` (v1beta2)

- Response for ListInstances.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `resources` | array<Instance> | A list of Memcached instances in the project in the specified location, or across all locations. If the `location_id` in the parent field of the request is "-", all regions available to the project are queried, and the results aggregated. |
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

### `LocationMetadata`

- Metadata for the given google.cloud.location.Location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableZones` | object | Output only. The set of available zones in the location. The map is keyed by the lowercase ID of each zone, as defined by GCE. These keys can be specified in the `zones` field when creating a Memcached instance. |

### `MaintenancePolicy`

- Defines policies to service maintenance events.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the resource was created. |
| `description` | string | Optional. Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512. |
| `labels` | object | Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. |
| `name` | string | Required. MaintenancePolicy name using the form: `projects/{project_id}/locations/{location_id}/maintenancePolicies/{maintenance_policy_id}` where {project_id} refers to a GCP consumer project ID, {location_id} refers to a GCP region/zone, {maintenance_policy_id} must be 1-63 characters long and match the regular expression `[a-z0-9]([-a-z0-9]*[a-z0-9])?`. |
| `state` | string enum | Optional. The state of the policy. Values: `STATE_UNSPECIFIED`, `READY`, `DELETING`. |
| `updatePolicy` | UpdatePolicy | Maintenance policy applicable to instance update. |
| `updateTime` | string (google-datetime) | Output only. The time when the resource was updated. |

### `MaintenanceSchedule`

- Upcoming maintenance schedule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Output only. The end time of any upcoming scheduled maintenance for this instance. |
| `scheduleDeadlineTime` | string (google-datetime) | Output only. The deadline that the maintenance schedule start time can not go beyond, including reschedule. |
| `startTime` | string (google-datetime) | Output only. The start time of any upcoming scheduled maintenance for this instance. |

### `MaintenanceWindow`

- MaintenanceWindow definition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dailyCycle` | DailyCycle | Daily cycle. |
| `weeklyCycle` | WeeklyCycle | Weekly cycle. |

### `MemcacheParameters`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. The unique ID associated with this set of parameters. Users can use this id to determine if the parameters associated with the instance differ from the parameters associated with the nodes. A discrepancy between parameter ids can inform users that they may need to take action to apply parameters on nodes. |
| `params` | object | User defined set of parameters to use in the memcached process. |

### `Node`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | Output only. Hostname or IP address of the Memcached node used by the clients to connect to the Memcached server on this node. |
| `memcacheFullVersion` | string | Output only. The full version of memcached server running on this node. e.g. - memcached-1.5.16 |
| `memcacheVersion` | string enum | Output only. Major version of memcached server running on this node, e.g. MEMCACHE_1_5 Values: `MEMCACHE_VERSION_UNSPECIFIED`, `MEMCACHE_1_5`, `MEMCACHE_1_6_15`. |
| `nodeId` | string | Output only. Identifier of the Memcached node. The node id does not include project or location like the Memcached instance name. |
| `parameters` | MemcacheParameters | User defined parameters currently applied to the node. |
| `port` | integer (int32) | Output only. The port number of the Memcached server on this node. |
| `state` | string enum | Output only. Current state of the Memcached node. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `UPDATING`. |
| `zone` | string | Output only. Location (GCP Zone) for the Memcached node. |

### `Node` (v1beta2)

-
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `host` | string | Output only. Hostname or IP address of the Memcached node used by the clients to connect to the Memcached server on this node. |
| `memcacheFullVersion` | string | Output only. The full version of memcached server running on this node. e.g. - memcached-1.5.16 |
| `memcacheVersion` | string enum | Output only. Major version of memcached server running on this node, e.g. MEMCACHE_1_5 Values: `MEMCACHE_VERSION_UNSPECIFIED`, `MEMCACHE_1_5`, `MEMCACHE_1_6_15`. |
| `nodeId` | string | Output only. Identifier of the Memcached node. The node id does not include project or location like the Memcached instance name. |
| `parameters` | MemcacheParameters | User defined parameters currently applied to the node. |
| `port` | integer (int32) | Output only. The port number of the Memcached server on this node. |
| `state` | string enum | Output only. Current state of the Memcached node. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `UPDATING`. |
| `updateAvailable` | boolean | Output only. Returns true if there is an update waiting to be applied |
| `zone` | string | Output only. Location (GCP Zone) for the Memcached node. |

### `NodeConfig`

- Configuration for a Memcached Node.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpuCount` | integer (int32) | Required. Number of cpus per Memcached node. |
| `memorySizeMb` | integer (int32) | Required. Memory size in MiB for each Memcached node. |

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

- Represents the metadata of a long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `cancelRequested` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | Output only. Time when the operation was created. |
| `endTime` | string (google-datetime) | Output only. Time when the operation finished running. |
| `statusDetail` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `RescheduleMaintenanceRequest`

- Request for RescheduleMaintenance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rescheduleType` | string enum | Required. If reschedule type is SPECIFIC_TIME, must set up schedule_time as well. Values: `RESCHEDULE_TYPE_UNSPECIFIED`, `IMMEDIATE`, `NEXT_AVAILABLE_WINDOW`, `SPECIFIC_TIME`. |
| `scheduleTime` | string (google-datetime) | Timestamp when the maintenance shall be rescheduled to if reschedule_type=SPECIFIC_TIME, in RFC 3339 format, for example `2012-11-15T16:19:00.094Z`. |

### `Schedule`

- Configure the schedule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | string enum | Allows to define schedule that runs specified day of the week. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `duration` | string (google-duration) | Output only. Duration of the time window, set by service producer. |
| `startTime` | TimeOfDay | Time within the window to start the operations. |

### `SetTagsRequest`

- Request message for SetTags.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. A checksum based on the current bindings which can be passed to prevent race conditions. If not passed, etag check would be skipped. |
| `name` | string | Required. The full resource name of the service resource. |
| `requestId` | string | Optional. A unique identifier for this request. Must be a valid UUID. This request is only idempotent if a `request_id` is provided. |
| `tags` | object | Required. These bindings will override any bindings previously set and will be effective immediately. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" |

### `SetTagsResponse`

- Response message for SetTags.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | A checksum based on the current bindings. This field is always set in server responses. |
| `name` | string | Required. The full resource name of the service resource. |
| `tags` | object | Required. Tag keys/values directly bound to this resource. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TimeOfDay`

- Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hours` | integer (int32) | Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `nanos` | integer (int32) | Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |
| `seconds` | integer (int32) | Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |

### `UpdateParametersRequest`

- Request for UpdateParameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameters` | MemcacheParameters | The parameters to apply to the instance. |
| `updateMask` | string (google-fieldmask) | Required. Mask of fields to update. |

### `UpdatePolicy`

- Maintenance policy applicable to instance updates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channel` | string enum | Optional. Relative scheduling channel applied to resource. Values: `UPDATE_CHANNEL_UNSPECIFIED`, `EARLIER`, `LATER`, `WEEK1`, `WEEK2`, `WEEK5`. |
| `denyMaintenancePeriods` | array<DenyMaintenancePeriod> | Deny Maintenance Period that is applied to resource to indicate when maintenance is forbidden. The protocol supports zero-to-many such periods, but the current SLM Rollout implementation only supports zero-to-one. |
| `window` | MaintenanceWindow | Optional. Maintenance window that is applied to resources covered by this policy. |

### `WeeklyCycle`

- Time window specified for weekly operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `schedule` | array<Schedule> | User can specify multiple windows in a week. Minimum of 1 window. |

### `WeeklyMaintenanceWindow`

- Time window specified for weekly operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | string enum | Required. Allows to define schedule that runs specified day of the week. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `duration` | string (google-duration) | Required. Duration of the time window. |
| `startTime` | TimeOfDay | Required. Start time of the window in UTC. |

### `ZoneMetadata`

-
- Version: v1

### Shape of `ApplyParametersRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "applyAll": "boolean",
  "nodeIds": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2 of `memcache` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Google-internal `go/` short links in the Discovery descriptions are replaced with `(internal link)`; they are not reachable outside Google.
- Source: https://memcache.googleapis.com/$discovery/rest?version=v1, https://memcache.googleapis.com/$discovery/rest?version=v1beta2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
