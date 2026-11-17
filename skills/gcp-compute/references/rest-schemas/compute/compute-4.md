---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 4/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `FutureReservation` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `advancedDeploymentControl` | ReservationAdvancedDeploymentControl | Advanced control for cluster management, applicable only to DENSE deployment type future reservations. |
| `aggregateReservation` | AllocationAggregateReservation | Aggregate reservation details for the future reservation. |
| `autoCreatedReservationsDeleteTime` | string | Future timestamp when the FR auto-created reservations will be deleted by Compute Engine. Format of this field must be a valid href="https://www.ietf.org/rfc/rfc3339.txt">RFC3339 value. |
| `autoCreatedReservationsDuration` | Duration | Specifies the duration of auto-created reservations. It represents relative time to future reservation start_time when auto-created reservations will be automatically deleted by Compute Engine. Duration time unit is represented as a count of seconds and fractions of seconds at nanosecond resolution. |
| `autoDeleteAutoCreatedReservations` | boolean | Setting for enabling or disabling automatic deletion for auto-created reservation. If set to true, auto-created reservations will be deleted at Future Reservation's end time (default) or at user's defined timestamp if any of the \[auto_created_reservations_delete_time, auto_created_reservations_duration\] values is specified. For keeping auto-created reservation indefinitely, this value should be set to false. |
| `colocationResource` | string | Full or partial URL of an existing future reservation to indicate intent for reserving capacity in the same cluster as the colocation resource. |
| `commitmentInfo` | FutureReservationCommitmentInfo | If not present, then FR will not deliver a new commitment or update an existing commitment. |
| `confidentialComputeType` | string enum | — Values: `CONFIDENTIAL_COMPUTE_TYPE_BMSAI`, `CONFIDENTIAL_COMPUTE_TYPE_TDX`, `CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED`. |
| `creationTimestamp` | string | Output only. \[Output Only\] The creation timestamp for this future reservation inRFC3339 text format. |
| `deploymentType` | string enum | Type of the deployment requested as part of future reservation. Values: `DENSE`, `DEPLOYMENT_TYPE_UNSPECIFIED`, `FLEXIBLE`. |
| `description` | string | An optional description of this resource. Provide this property when you create the future reservation. |
| `enableEmergentMaintenance` | boolean | Indicates if this group of VMs have emergent maintenance enabled. |
| `id` | string (uint64) | Output only. \[Output Only\] A unique identifier for this future reservation. The server defines this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#futureReservation for future reservations. |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `namePrefix` | string | Name prefix for the reservations to be created at the time of delivery. The name prefix must comply with RFC1035. Maximum allowed length for name prefix is 20. Automatically created reservations name format will be -date-####. |
| `params` | FutureReservationParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `planningStatus` | string enum | Planning state before being submitted for evaluation Values: `DRAFT`, `PLANNING_STATUS_UNSPECIFIED`, `SUBMITTED`. |
| `protectionTier` | string enum | Protection tier for the workload. Values: `CAPACITY_OPTIMIZED`, `PROTECTION_TIER_UNSPECIFIED`, `STANDARD`. |
| `reservationMode` | string enum | The reservation mode which determines reservation-termination behavior and expected pricing. Values: `CALENDAR`, `DEFAULT`, `RESERVATION_MODE_UNSPECIFIED`. |
| `reservationName` | string | Name of reservations where the capacity is provisioned at the time of delivery of future reservations. If the reservation with the given name does not exist already, it is created automatically at the time of Approval with INACTIVE state till specified start-time. Either provide the reservation_name or a name_prefix. |
| `resourceName` | string | Name of the resource intended to be delivered. Name should conform to RFC1035. This will be the name of storage pool or Exapool for persistent disk FRs. |
| `schedulingType` | string enum | Maintenance information for this reservation Values: `GROUPED`, `GROUP_MAINTENANCE_TYPE_UNSPECIFIED`, `INDEPENDENT`. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `shareSettings` | ShareSettings | List of Projects/Folders to share with. |
| `specificReservationRequired` | boolean | Indicates whether the auto-created reservation can be consumed by VMs with affinity for "any" reservation. If the field is set, then only VMs that target the reservation by name can consume from the delivered reservation. |
| `specificSkuProperties` | FutureReservationSpecificSKUProperties | Future Reservation configuration to indicate instance properties and total count. |
| `status` | FutureReservationStatus | Output only. \[Output only\] Status of the Future Reservation |
| `storagePoolProperties` | FutureReservationStoragePoolProperties | Storage pool details for the future reservation. |
| `timeWindow` | FutureReservationTimeWindow | Time window for this Future Reservation. |
| `zone` | string | Output only. \[Output Only\] URL of the Zone where this future reservation resides. |

### `FutureReservationCommitmentInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commitmentName` | string | name of the commitment where capacity is being delivered to. |
| `commitmentPlan` | string enum | Indicates if a Commitment needs to be created as part of FR delivery. If this field is not present, then no commitment needs to be created. Values: `INVALID`, `THIRTY_SIX_MONTH`, `TWELVE_MONTH`. |
| `previousCommitmentTerms` | string enum | Only applicable if FR is delivering to the same reservation. If set, all parent commitments will be extended to match the end date of the plan for this commitment. Values: `EXTEND`, `PREVIOUSCOMMITMENTTERM_UNSPECIFIED`. |

### `FutureReservationParams`

- Additional future reservation params.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the future reservation. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |

### `FutureReservationSpecificSKUProperties`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceProperties` | AllocationSpecificSKUAllocationReservedInstanceProperties | Properties of the SKU instances being reserved. |
| `sourceInstanceTemplate` | string | The instance template that will be used to populate the ReservedInstanceProperties of the future reservation |
| `totalCount` | string (int64) | Total number of instances for which capacity assurance is requested at a future time period. |

### `FutureReservationStatus`

- \[Output only\] Represents status related to the future reservation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `amendmentStatus` | string enum | Output only. \[Output Only\] The current status of the requested amendment. Values: `AMENDMENT_APPROVED`, `AMENDMENT_DECLINED`, `AMENDMENT_IN_REVIEW`, `AMENDMENT_STATUS_UNSPECIFIED`. |
| `autoCreatedReservations` | array<string> | Output only. Fully qualified urls of the automatically created reservations at start_time. |
| `exapoolProvisionedCapacityGb` | StoragePoolExapoolProvisionedCapacityGb | Output only. Exapool provisioned capacities for each SKU type. |
| `existingMatchingUsageInfo` | FutureReservationStatusExistingMatchingUsageInfo | Output only. \[Output Only\] Represents the existing matching usage for the future reservation. |
| `fulfilledCount` | string (int64) | Output only. This count indicates the fulfilled capacity so far. This is set during "PROVISIONING" state. This count also includes capacity delivered as part of existing matching reservations. |
| `lastKnownGoodState` | FutureReservationStatusLastKnownGoodState | Output only. \[Output Only\] This field represents the future reservation before an amendment was requested. If the amendment is declined, the Future Reservation will be reverted to the last known good state. The last known good state is not set when updating a future reservation whose Procurement Status is DRAFTING. |
| `lockTime` | string | Output only. Time when Future Reservation would become LOCKED, after which no modifications to Future Reservation will be allowed. Applicable only after the Future Reservation is in the APPROVED state. The lock_time is an RFC3339 string. The procurement_status will transition to PROCURING state at this time. |
| `procurementStatus` | string enum | Output only. Current state of this Future Reservation Values: `APPROVED`, `CANCELLED`, `COMMITTED`, `DECLINED`, `DRAFTING`, `FAILED`, `FAILED_PARTIALLY_FULFILLED`, `FULFILLED`, `PENDING_AMENDMENT_APPROVAL`, `PENDING_APPROVAL`, `PROCUREMENT_STATUS_UNSPECIFIED`, `PROCURING`, `PROVISIONING`. |
| `specificSkuProperties` | FutureReservationStatusSpecificSKUProperties | — |
| `storagePoolProvisionedCapacity` | FutureReservationStoragePoolProvisionedCapacity | Output only. Storage pool provisioned capacities for each SKU type. |

### `FutureReservationStatusExistingMatchingUsageInfo`

- \[Output Only\] Represents the existing matching usage for the future reservation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | Output only. Count to represent min(FR total_count, matching_reserved_capacity+matching_unreserved_instances) |
| `timestamp` | string | Output only. Timestamp when the matching usage was calculated |

### `FutureReservationStatusLastKnownGoodState`

- The state that the future reservation will be reverted to should the amendment be declined.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. \[Output Only\] The description of the FutureReservation before an amendment was requested. |
| `existingMatchingUsageInfo` | FutureReservationStatusExistingMatchingUsageInfo | Output only. \[Output Only\] Represents the matching usage for the future reservation before an amendment was requested. |
| `futureReservationSpecs` | FutureReservationStatusLastKnownGoodStateFutureReservationSpecs | — |
| `lockTime` | string | Output only. \[Output Only\] The lock time of the FutureReservation before an amendment was requested. |
| `namePrefix` | string | Output only. \[Output Only\] The name prefix of the Future Reservation before an amendment was requested. |
| `procurementStatus` | string enum | Output only. \[Output Only\] The status of the last known good state for the Future Reservation. Values: `APPROVED`, `CANCELLED`, `COMMITTED`, `DECLINED`, `DRAFTING`, `FAILED`, `FAILED_PARTIALLY_FULFILLED`, `FULFILLED`, `PENDING_AMENDMENT_APPROVAL`, `PENDING_APPROVAL`, `PROCUREMENT_STATUS_UNSPECIFIED`, `PROCURING`, `PROVISIONING`. |

### `FutureReservationStatusLastKnownGoodStateFutureReservationSpecs`

- The properties of the last known good state for the Future Reservation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `shareSettings` | ShareSettings | Output only. \[Output Only\] The previous share settings of the Future Reservation. |
| `specificSkuProperties` | FutureReservationSpecificSKUProperties | Output only. \[Output Only\] The previous instance related properties of the Future Reservation. |
| `timeWindow` | FutureReservationTimeWindow | Output only. \[Output Only\] The previous time window of the Future Reservation. |

### `FutureReservationStatusSpecificSKUProperties`

- Properties to be set for the Future Reservation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sourceInstanceTemplateId` | string | ID of the instance template used to populate the Future Reservation properties. |

### `FutureReservationStoragePoolProperties`

- Storage pool properties for the future reservation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestedExapoolProvisionedCapacityGb` | StoragePoolExapoolProvisionedCapacityGb | Requested exapool provisioned capacity in GiB. |
| `requestedStoragePoolProvisionedCapacity` | FutureReservationStoragePoolProvisionedCapacity | Requested storage pool provisioned capacity. |
| `storagePoolType` | string | Type of the storage pool. |

### `FutureReservationStoragePoolProvisionedCapacity`

- Storage pool provisioned capacities for each SKU type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `poolProvisionedCapacityGb` | string (int64) | Size of the storage pool in GiB. |
| `poolProvisionedIops` | string (int64) | Provisioned IOPS of the storage pool. Only relevant if the storage pool type is hyperdisk-balanced. |
| `poolProvisionedThroughput` | string (int64) | Provisioned throughput of the storage pool in MiB/s. Only relevant if the storage pool type is hyperdisk-balanced or hyperdisk-throughput. |

### `FutureReservationTimeWindow`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | Duration | — |
| `endTime` | string | — |
| `startTime` | string | Start time of the Future Reservation. The start_time is an RFC3339 string. |

### `FutureReservationsAggregatedListResponse`

- Contains a list of future reservations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of Future reservation resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#futureReservationsAggregatedListResponse for future resevation aggregated list response. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `FutureReservationsListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `items` | array<FutureReservation> | \[Output Only\] A list of future reservation resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource.Alwayscompute#FutureReservationsListResponse for lists of reservations |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `FutureReservationsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `futureReservations` | array<FutureReservation> | A list of future reservations contained in this scope. |
| `warning` | object | Informational warning which replaces the list of future reservations when the list is empty. |

### `FutureResourcesRecommendation`

- Recommendation for single resources specification, to be created in the future.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | — |
| `location` | string | The advised location for resource usage. When a zone, in format 'zones/'. If not set, it means that no location is recommended - see other_locations for details. |
| `otherLocations` | object | List of locations in the request scope that were not recommended. Keys of the map are zones, in format 'zones/'. The values are status information indicating the recommendation status. |
| `recommendationId` | string | Unique id of the recommendation, a UUID string generated by the API. |
| `recommendationType` | string enum | Type of recommendation. Currently only FUTURE_RESERVATION is supported. Values: `FUTURE_RESERVATION`, `RECOMMENDATION_TYPE_UNSPECIFIED`. |
| `startTime` | string (google-datetime) | — |

### `FutureResourcesRecommendationOtherLocation`

- Information about recommendation status for locations that were allowed but not used by the response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | string | Details (human readable) describing the situation. For example, if status is CONDITION_NOT_MET, then details contain information about the parameters of the time window that did not meet the required conditions. |
| `status` | string enum | Status of recommendation in this location. Values: `CONDITIONS_NOT_MET`, `NOT_SUPPORTED`, `NO_CAPACITY`, `OTHER_LOCATION_STATUS_UNDEFINED`, `RECOMMENDED`. |

### `FutureResourcesSpec`

- Specification of resources to be created at some time in the future within an optionally specified set of locations, and within the specified time range.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deploymentType` | string enum | Indicates if the reservation allocation strategy is static (DENSE) or dynamic (STANDARD). Defaults to DENSE. Values: `DENSE`, `DEPLOYMENT_TYPE_UNSPECIFIED`. |
| `locationPolicy` | FutureResourcesSpecLocationPolicy | Optional location policy allowing to exclude some zone(s) in which the resources must not be created. |
| `targetResources` | FutureResourcesSpecTargetResources | Specification of the reserved resources. |
| `timeRangeSpec` | FlexibleTimeRange | Specification of a time range in which the resources may be created. The time range specifies start of resource use and planned end of resource use. |

### `FutureResourcesSpecAggregateResources`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorCount` | string (int64) | Size of the request, in accelerator (chip) count. |
| `vmFamily` | string enum | The VM family that all instances scheduled against this reservation must belong to. Use for TPU reservations. Values: `VM_FAMILY_CLOUD_TPU_DEVICE_CT3`, `VM_FAMILY_CLOUD_TPU_LITE_DEVICE_CT5L`, `VM_FAMILY_CLOUD_TPU_LITE_POD_SLICE_CT5LP`, `VM_FAMILY_CLOUD_TPU_LITE_POD_SLICE_CT6E`, `VM_FAMILY_CLOUD_TPU_POD_SLICE_CT3P`, `VM_FAMILY_CLOUD_TPU_POD_SLICE_CT4P`, `VM_FAMILY_CLOUD_TPU_POD_SLICE_CT5P`, `VM_FAMILY_CLOUD_TPU_POD_SLICE_TPU7X`. |
| `workloadType` | string enum | Workload type. Use for TPU reservations. Values: `BATCH`, `SERVING`, `UNSPECIFIED`. |

### `FutureResourcesSpecLocalSsdPartition`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskInterface` | string enum | Disk interface. Defaults to SCSI. Values: `NVME`, `SCSI`. |
| `diskSizeGb` | string (int64) | The size of the disk in GB. |

### `FutureResourcesSpecLocationPolicy`

- Specification of locations to create resources in.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | object | Preferences for specified locations. Keys of the map are locations - zones, in format of 'zones/'. Values are preferences for the zones. If a zone is not specified in this map, it is ALLOWed. |

### `FutureResourcesSpecLocationPolicyLocation`

- Preference for a single specified location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `preference` | string enum | Preference for this location. Values: `ALLOW`, `DENY`, `PREFERENCE_UNSPECIFIED`. |

### `FutureResourcesSpecSpecificSKUResources`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceCount` | string (int64) | Size of the request, in instance count. |
| `localSsdPartitions` | array<FutureResourcesSpecLocalSsdPartition> | Local SSD partitions. You do not have to include SSD partitions that are built in the machine type. |
| `machineType` | string | The machine type to use for instances that will use the reservation. This field only accepts machine type names. e.g. n2-standard-4 and does not accept machine type full or partial url. e.g. projects/my-l7ilb-project/zones/us-central1-a/machineTypes/n2-standard-4. Use for GPU reservations. |

### `FutureResourcesSpecTargetResources`

- Specification of reserved resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregateResources` | FutureResourcesSpecAggregateResources | — |
| `specificSkuResources` | FutureResourcesSpecSpecificSKUResources | — |

### `GRPCHealthCheck`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `grpcServiceName` | string | The gRPC service name for the health check. This field is optional. The value of grpc_service_name has the following meanings by convention: - Empty service_name means the overall status of all services at the backend. - Non-empty service_name means the health of that gRPC service, as defined by the owner of the service. The grpc_service_name can only be ASCII. |
| `port` | integer (int32) | The TCP port number to which the health check prober sends packets. Valid values are 1 through 65535. |
| `portName` | string | Not supported. |
| `portSpecification` | string enum | Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports. Values: `USE_FIXED_PORT`, `USE_NAMED_PORT`, `USE_SERVING_PORT`. |

### `GRPCTLSHealthCheck`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `grpcServiceName` | string | The gRPC service name for the health check. This field is optional. The value of grpc_service_name has the following meanings by convention: - Empty service_name means the overall status of all services at the backend. - Non-empty service_name means the health of that gRPC service, as defined by the owner of the service. The grpc_service_name can only be ASCII. |
| `port` | integer (int32) | The TCP port number to which the health check prober sends packets. Valid values are 1 through 65535. |
| `portSpecification` | string enum | Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports. Values: `USE_FIXED_PORT`, `USE_NAMED_PORT`, `USE_SERVING_PORT`. |

### `GetAsyncReplicationStatusResponse`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `asyncReplicationStatus` | AsyncReplicationStatus | — |
| `etag` | string | end_interface: MixerGetResponseWithEtagBuilder |

### `GetHealthOperationMetadata`

- Metadata for GetHealth operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthInfo` | GetHealthOperationMetadataHealthInfo | Output only. The health information. |

### `GetHealthOperationMetadataHealthInfo`

- Health information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availabilitySloStatus` | string enum | Output only. The availability SLO status. Values: `AVAILABILITY_SLO_STATUS_IN_SLO`, `AVAILABILITY_SLO_STATUS_OUT_OF_SLO`, `AVAILABILITY_SLO_STATUS_SLO_UNKNOWN`, `AVAILABILITY_SLO_STATUS_UNSPECIFIED`. |
| `healthStatus` | string enum | Output only. The health status. Values: `HEALTH_STATUS_HEALTHY`, `HEALTH_STATUS_UNHEALTHY`, `HEALTH_STATUS_UNSPECIFIED`. |
| `repairCategory` | string enum | Output only. The repair category. Values: `REPAIR_CATEGORY_CRITICAL_FAILURE`, `REPAIR_CATEGORY_EMERGENT_MAINTENANCE`, `REPAIR_CATEGORY_PLANNED_MAINTENANCE`, `REPAIR_CATEGORY_UNSPECIFIED`, `REPAIR_CATEGORY_USER_REPORTED_FAULT`. |
| `unhealthyReason` | string enum | Output only. The reason for unhealthy status. Values: `UNHEALTHY_REASON_PENDING_USER_APPROVAL`, `UNHEALTHY_REASON_REPAIRING`, `UNHEALTHY_REASON_UNSCHEDULABLE`, `UNHEALTHY_REASON_UNSPECIFIED`. |
| `updateTime` | string (google-datetime) | Output only. The time when health info was updated. |

### `GetOwnerInstanceResponse`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `instance` | string | Full instance resource URL. |

### `GetVersionOperationMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inlineSbomInfo` | GetVersionOperationMetadataSbomInfo | — |

### `GetVersionOperationMetadataSbomInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentComponentVersions` | object | A mapping of components to their currently-applied versions or other appropriate identifiers. |
| `targetComponentVersions` | object | A mapping of components to their target versions or other appropriate identifiers. |

### `GlobalAddressesMoveRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | An optional destination address description if intended to be different from the source. |
| `destinationAddress` | string | The URL of the destination address to move to. This can be a full or partial URL. For example, the following are all valid URLs to a address: - https://www.googleapis.com/compute/v1/projects/project/global/addresses/address - projects/project/global/addresses/address Note that destination project must be different from the source project. So/global/addresses/address is not valid partial url. |

### `GlobalFrontendSettings`

- Represents the Global Frontend Bundle settings for a single project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bundleType` | string enum | Customer-settable bundle type. Values: `BUNDLE_TYPE_UNSPECIFIED`, `GLOBAL_FRONT_END`, `INDIVIDUAL`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp in RFC3339 text format. |
| `description` | string | Output only. \[Output Only\] An optional description of this resource. |
| `etag` | string | Output only. For optimistic locking. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `name` | string | Output only. OUTPUT_ONLY fields \[Output Only\] Name of the resource. Must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |

### `GlobalFrontendSettingsPatchResponse`

- Response to an UpdateGlobalFrontendSettingsRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operation` | Operation | The Operation resource for this long-running operation. |

### `GlobalListVmExtensionsResponse`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `etag` | string | Output only. Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a VmExtensionPolicy. An up-to-date fingerprint must be provided in order to update the VmExtensionPolicy. To see the latest value of the fingerprint, make a get() request to retrieve a VmExtensionPolicy. |
| `id` | string | Output only. Unique identifier for the resource; defined by the server. |
| `items` | array<GlobalVmExtension> | Output only. A list of VM extensions. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | Output only. This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. Unreachable resources. |
| `warning` | object | Output only. Informational warning message. |

### `GlobalNetworkEndpointGroupsAttachEndpointsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkEndpoints` | array<NetworkEndpoint> | The list of network endpoints to be attached. |

### `GlobalNetworkEndpointGroupsDetachEndpointsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkEndpoints` | array<NetworkEndpoint> | The list of network endpoints to be detached. |

### `GlobalOrganizationSetPolicyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Flatten Policy to create a backward compatible wire-format. Deprecated. Use 'policy' to specify bindings. |
| `etag` | string (byte) | Flatten Policy to create a backward compatible wire-format. Deprecated. Use 'policy' to specify the etag. |
| `policy` | Policy | REQUIRED: The complete policy to be applied to the 'resource'. The size of the policy is limited to a few 10s of KB. An empty policy is in general a valid policy but certain services (like Projects) might reject them. |

### `GlobalSetLabelsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labelFingerprint` | string (byte) | The fingerprint of the previous set of labels for this resource, used to detect conflicts. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash when updating or changing labels, otherwise the request will fail with error412 conditionNotMet. Make a get() request to the resource to get the latest fingerprint. |
| `labels` | object | A list of labels to apply for this resource. Each label must comply with the requirements for labels. For example,"webserver-frontend": "images". A label value can also be empty (e.g. "my-label": ""). |

### `GlobalSetPolicyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Flatten Policy to create a backward compatible wire-format. Deprecated. Use 'policy' to specify bindings. |
| `etag` | string (byte) | Flatten Policy to create a backward compatible wire-format. Deprecated. Use 'policy' to specify the etag. |
| `policy` | Policy | REQUIRED: The complete policy to be applied to the 'resource'. The size of the policy is limited to a few 10s of KB. An empty policy is in general a valid policy but certain services (like Projects) might reject them. |

### `GlobalVmExtension`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | Output only. \[Output Only\] An optional textual description of the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#globalVmExtension. |
| `name` | string | — |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `versions` | array<string> | — |

### `GlobalVmExtensionPolicy`

- Message describing GlobalVmExtensionPolicy object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `extensionPolicies` | object | Required. Map from extension (eg: "cloudops") to its policy configuration. The key is the name of the extension. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instanceSelectors` | array<GlobalVmExtensionPolicyInstanceSelector> | Optional. Selector to target VMs for a policy. There is a logical "AND" between instance_selectors. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#globalVmExtensionPolicy for globalVmExtensionPolicies. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `priority` | integer (int32) | Optional. Used to resolve conflicts when multiple policies are active for the same extension. Defaults to 0. Larger the number, higher the priority. When the priority is the same, the policy with the newer create time has higher priority. |
| `rolloutOperation` | GlobalVmExtensionPolicyRolloutOperation | Required. The rollout strategy and status. |
| `scopedResourceStatus` | string enum | Output only. \[Output Only\] The scoped resource status. It's only for tracking the purging status of the policy. Values: `SCOPED_RESOURCE_STATUS_DELETING`, `SCOPED_RESOURCE_STATUS_UNSPECIFIED`. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `updateTimestamp` | string | Output only. \[Output Only\] Update timestamp inRFC3339 text format. |

### `GlobalVmExtensionPolicyExtensionPolicy`

- Policy for a single extension.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pinnedVersion` | string | Optional. The version pinning for the extension. If empty, the extension will be installed with the latest version released by the extension producer. |
| `stringConfig` | string | Optional. String configuration. Any string payload that the extension understands. |

### `GlobalVmExtensionPolicyExtensionPolicy` (alpha)

- Policy for a single extension.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `installedSoftwareSelector` | GlobalVmExtensionPolicyInstalledSoftwareSelector | Optional. Only deploy this extension if the specified software is detected on the VM. For a live list of valid software values, see: https://cloud.google.com/compute/docs/vm-extensions/supported-software |
| `pinnedVersion` | string | Optional. The version pinning for the extension. If empty, the extension will be installed with the latest version released by the extension producer. |
| `stringConfig` | string | Optional. String configuration. Any string payload that the extension understands. |

### `GlobalVmExtensionPolicyInstalledSoftwareSelector`

- Defines the software requirements for a VM extension policy.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `anyOfSelectors` | object | Optional. If any of these SelectorSets are satisfied, the condition is met (OR logic). The key is a user-provided name for this set. |

### `GlobalVmExtensionPolicyInstalledSoftwareSelectorSelectorSet`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `allOfSelectors` | array<string> | Optional. All software in this list must be detected (AND logic). Valid software names (e.g. "Apache Web Server"). |

### `GlobalVmExtensionPolicyInstanceSelector`

- Selector to target VMs for a zone VM extension policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labelSelector` | GlobalVmExtensionPolicyLabelSelector | Optional. Labels within the LabelSelector are OR'd. |

### `GlobalVmExtensionPolicyLabelSelector`

- A LabelSelector is applicable for a VM only if it matches all labels in the LabelSelector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inclusionLabels` | object | Optional. Labels as key value pairs. A VM should contain all the pairs specified in this map to be selected; Labels within the LabelSelector are OR'ed. |

### `GlobalVmExtensionPolicyList`

- Response to list global VM extension policy resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<GlobalVmExtensionPolicy> | A list of GlobalVmExtensionPolicy resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `GlobalVmExtensionPolicyRolloutOperation`

- Represents the rollout operation
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rolloutInput` | GlobalVmExtensionPolicyRolloutOperationRolloutInput | Required. The rollout input which defines the rollout plan. |
| `rolloutStatus` | GlobalVmExtensionPolicyRolloutOperationRolloutStatus | Output only. \[Output Only\] The rollout status of the policy. |

### `GlobalVmExtensionPolicyRolloutOperationRolloutInput`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conflictBehavior` | string | Optional. Specifies the behavior of the rollout if a conflict is detected in a project during a rollout. This only applies to `insert` and `update` methods. A conflict occurs in the following cases: \* `insert` method: If the zonal policy already exists when the insert happens. \* `update` method: If the zonal policy was modified by a zonal API call outside of this rollout. Possible values are the following: \* `""` (empty string): If a conflict occurs, the local value is not overwritten. This is the default behavior. \* `"overwrite"`: If a conflict occurs, the local value is overwritten with the rollout value. |
| `name` | string | Optional. The name of the rollout plan. Ex. projects//locations/global/rolloutPlans/. |
| `predefinedRolloutPlan` | string enum | Optional. Specifies the predefined rollout plan for the policy. Valid values are `SLOW_ROLLOUT` and `FAST_ROLLOUT`. The recommended value is `SLOW_ROLLOUT` for progressive rollout. For more information, see Rollout plans for global policies. Values: `FAST_ROLLOUT`, `ROLLOUT_PLAN_UNSPECIFIED`, `SLOW_ROLLOUT`. |
| `retryUuid` | string | Optional. The UUID that identifies a policy rollout retry attempt for update and delete operations. Set this field only when retrying a rollout for an existing extension policy. \* `update` method: Lets you retry policy rollout without changes. An error occurs if you set retry_uuid but the policy is modified. \* `delete` method: Lets you retry policy deletion rollout if the previous deletion rollout is not finished and the policy is in the DELETING state. If you set this field when the policy is not in the DELETING state, an error occurs. |

### `GlobalVmExtensionPolicyRolloutOperationRolloutStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentRollouts` | array<GlobalVmExtensionPolicyRolloutOperationRolloutStatusRolloutMetadata> | Output only. \[Output Only\] The current rollouts for the latest version of the resource. There should be only one current rollout, but for scalability, we make it repeated. |
| `previousRollout` | GlobalVmExtensionPolicyRolloutOperationRolloutStatusRolloutMetadata | Output only. \[Output Only\] The last completed rollout resource. This field will not be populated until the first rollout is completed. |

### `GlobalVmExtensionPolicyRolloutOperationRolloutStatusRolloutMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locationRolloutStatus` | object | Output only. \[Output Only\] The rollout status for each location. The list of the locations is the same as the list of locations in the rollout plan. |
| `rollout` | string | Output only. \[Output Only\] The name of the rollout. Ex. projects//locations/global/rollouts/. |
| `rolloutPlan` | string | Output only. \[Output Only\] The name of the rollout plan. Ex. projects//locations/global/rolloutPlans/. |
| `state` | string enum | Output only. \[Output Only\] The overall state of the rollout. Values: `STATE_CANCELLED`, `STATE_COMPLETED`, `STATE_FAILED`, `STATE_PAUSED`, `STATE_PROCESSING`, `STATE_UNKNOWN`, `STATE_UNSPECIFIED`. |

### `GlobalVmExtensionPolicyRolloutOperationRolloutStatusRolloutMetadataLocationRolloutStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Output only. \[Output Only\] The state of the location rollout. Values: `LOCATION_ROLLOUT_STATE_COMPLETED`, `LOCATION_ROLLOUT_STATE_FAILED`, `LOCATION_ROLLOUT_STATE_NOT_STARTED`, `LOCATION_ROLLOUT_STATE_SKIPPED`, `LOCATION_ROLLOUT_STATE_UNSPECIFIED`. |

### `GroupMaintenanceInfo`

- Maintenance Info for ReservationBlocks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceMaintenanceOngoingCount` | integer (int32) | Describes number of instances that have ongoing maintenance. |
| `instanceMaintenancePendingCount` | integer (int32) | Describes number of instances that have pending maintenance. |
| `maintenanceOngoingCount` | integer (int32) | Progress for ongoing maintenance for this group of VMs/hosts. Describes number of hosts in the block that have ongoing maintenance. |
| `maintenancePendingCount` | integer (int32) | Progress for ongoing maintenance for this group of VMs/hosts. Describes number of hosts in the block that have pending maintenance. |
| `schedulingType` | string enum | The type of maintenance for the reservation. Values: `GROUPED`, `GROUP_MAINTENANCE_TYPE_UNSPECIFIED`, `INDEPENDENT`. |
| `subblockInfraMaintenanceOngoingCount` | integer (int32) | Describes number of subblock Infrastructure that has ongoing maintenance. Here, Subblock Infrastructure Maintenance pertains to upstream hardware contained in the Subblock that is necessary for a VM Family(e.g. NVLink Domains). Not all VM Families will support this field. |
| `subblockInfraMaintenancePendingCount` | integer (int32) | Describes number of subblock Infrastructure that has pending maintenance. Here, Subblock Infrastructure Maintenance pertains to upstream hardware contained in the Subblock that is necessary for a VM Family (e.g. NVLink Domains). Not all VM Families will support this field. |
| `upcomingGroupMaintenance` | UpcomingMaintenance | Maintenance information on this group of VMs. |

### `GrpcServiceConfig`

- \[Deprecated\] gRPC config to access the SDS server. gRPC config to access the SDS server.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `callCredentials` | CallCredentials | The call credentials to access the SDS server. |
| `channelCredentials` | ChannelCredentials | The channel credentials to access the SDS server. |
| `targetUri` | string | The target URI of the SDS server. |

### `GuestAttributes`

- A guest attributes entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#guestAttributes for guest attributes entry. |
| `queryPath` | string | The path to be queried. This can be the default namespace ('') or a nested namespace ('\/') or a specified key ('\/\'). |
| `queryValue` | GuestAttributesValue | Output only. \[Output Only\] The value of the requested queried path. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `variableKey` | string | The key to search for. |
| `variableValue` | string | Output only. \[Output Only\] The value found for the requested key. |

### `GuestAttributesEntry`

- A guest attributes namespace/key/value entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Key for the guest attribute entry. |
| `namespace` | string | Namespace for the guest attribute entry. |
| `value` | string | Value for the guest attribute entry. |

### `GuestAttributesValue`

- Array of guest attribute namespace/key/value tuples.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<GuestAttributesEntry> | — |

### `GuestOsFeature`

- Guest OS features.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | The ID of a supported feature. To add multiple values, use commas to separate values. Set to one or more of the following values: - VIRTIO_SCSI_MULTIQUEUE - WINDOWS - MULTI_IP_SUBNET - UEFI_COMPATIBLE - GVNIC - SEV_CAPABLE - SUSPEND_RESUME_COMPATIBLE - SEV_LIVE_MIGRATABLE_V2 - SEV_SNP_CAPABLE - TDX_CAPABLE - IDPF - SNP_SVSM_CAPABLE - CCA_CAPABLE - SUSPEND_SAFE_FPR For more information, see Enabling guest operating system features. Values: `BARE_METAL_LINUX_COMPATIBLE`, `BMSAI_CAPABLE`, `CCA_CAPABLE`, `FEATURE_TYPE_UNSPECIFIED`, `GVNIC`, `IDPF`, `MULTI_IP_SUBNET`, `SECURE_BOOT`, `SEV_CAPABLE`, `SEV_LIVE_MIGRATABLE`, `SEV_LIVE_MIGRATABLE_V2`, `SEV_SNP_CAPABLE`, `SNP_SVSM_CAPABLE`, `SUSPEND_SAFE_FPR`, `TDX_CAPABLE`, `UEFI_COMPATIBLE`, `VIRTIO_SCSI_MULTIQUEUE`, `WINDOWS`. |

### `HTTP2HealthCheck`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | The value of the host header in the HTTP/2 health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest |
| `port` | integer (int32) | The TCP port number to which the health check prober sends packets. The default value is 443. Valid values are 1 through65535. |
| `portName` | string | Not supported. |
| `portSpecification` | string enum | Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports. Values: `USE_FIXED_PORT`, `USE_NAMED_PORT`, `USE_SERVING_PORT`. |
| `proxyHeader` | string enum | Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE. Values: `NONE`, `PROXY_V1`. |
| `requestPath` | string | The request path of the HTTP/2 health check request. The default value is/. Must comply withRFC3986. |
| `response` | string | Creates a content-based HTTP/2 health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http |

### `HTTP2HealthCheck` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `host` | string | The value of the host header in the HTTP/2 health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest |
| `port` | integer (int32) | The TCP port number to which the health check prober sends packets. The default value is 443. Valid values are 1 through65535. |
| `portName` | string | Not supported. |
| `portSpecification` | string enum | Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports. Values: `USE_FIXED_PORT`, `USE_NAMED_PORT`, `USE_SERVING_PORT`. |
| `proxyHeader` | string enum | Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE. Values: `NONE`, `PROXY_V1`. |
| `requestPath` | string | The request path of the HTTP/2 health check request. The default value is/. Must comply withRFC3986. |
| `response` | string | Creates a content-based HTTP/2 health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http |
| `weightReportMode` | string enum | Weight report mode. used for weighted Load Balancing. Values: `DISABLE`, `DRY_RUN`, `ENABLE`. |

### `HTTPHealthCheck`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | The value of the host header in the HTTP health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest |
| `port` | integer (int32) | The TCP port number to which the health check prober sends packets. The default value is 80. Valid values are 1 through65535. |
| `portName` | string | Not supported. |
| `portSpecification` | string enum | Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Also supported in legacy HTTP health checks for target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example,GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for pass-through load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports. Values: `USE_FIXED_PORT`, `USE_NAMED_PORT`, `USE_SERVING_PORT`. |
| `proxyHeader` | string enum | Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE. Values: `NONE`, `PROXY_V1`. |
| `requestPath` | string | The request path of the HTTP health check request. The default value is/. Must comply withRFC3986. |
| `response` | string | Creates a content-based HTTP health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http |

### `HTTPHealthCheck` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `host` | string | The value of the host header in the HTTP health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest |
| `port` | integer (int32) | The TCP port number to which the health check prober sends packets. The default value is 80. Valid values are 1 through65535. |
| `portName` | string | Not supported. |
| `portSpecification` | string enum | Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Also supported in legacy HTTP health checks for target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example,GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for pass-through load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports. Values: `USE_FIXED_PORT`, `USE_NAMED_PORT`, `USE_SERVING_PORT`. |
| `proxyHeader` | string enum | Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE. Values: `NONE`, `PROXY_V1`. |
| `requestPath` | string | The request path of the HTTP health check request. The default value is/. Must comply withRFC3986. |
| `response` | string | Creates a content-based HTTP health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http |
| `weightReportMode` | string enum | Weight report mode. used for weighted Load Balancing. Values: `DISABLE`, `DRY_RUN`, `ENABLE`. |

### `HTTPSHealthCheck`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | The value of the host header in the HTTPS health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest |
| `port` | integer (int32) | The TCP port number to which the health check prober sends packets. The default value is 443. Valid values are 1 through65535. |
| `portName` | string | Not supported. |
| `portSpecification` | string enum | Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports. Values: `USE_FIXED_PORT`, `USE_NAMED_PORT`, `USE_SERVING_PORT`. |
| `proxyHeader` | string enum | Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE. Values: `NONE`, `PROXY_V1`. |
| `requestPath` | string | The request path of the HTTPS health check request. The default value is/. Must comply withRFC3986. |
| `response` | string | Creates a content-based HTTPS health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http |

### `HTTPSHealthCheck` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `host` | string | The value of the host header in the HTTPS health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest |
| `port` | integer (int32) | The TCP port number to which the health check prober sends packets. The default value is 443. Valid values are 1 through65535. |
| `portName` | string | Not supported. |
| `portSpecification` | string enum | Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports. Values: `USE_FIXED_PORT`, `USE_NAMED_PORT`, `USE_SERVING_PORT`. |
| `proxyHeader` | string enum | Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE. Values: `NONE`, `PROXY_V1`. |
| `requestPath` | string | The request path of the HTTPS health check request. The default value is/. Must comply withRFC3986. |
| `response` | string | Creates a content-based HTTPS health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http |
| `weightReportMode` | string enum | Weight report mode. used for weighted Load Balancing. Values: `DISABLE`, `DRY_RUN`, `ENABLE`. |

### `HaController`

- HaController handles failover for a VM Instance.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `backendServices` | array<string> | Advanced configuration option. If specified, these Backend Services need to be pre-created. Currently, only one backend service can be specified, and it must be L4 Internal Load Balancer (ILB). |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp in RFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `failoverInitiation` | string enum | Indicates how failover should be initiated. Values: `AUTOMATIC`, `FAILOVER_INITIATION_UNSPECIFIED`, `MANUAL_ONLY`. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instanceName` | string | Name of the instance that HaController is in charge of. If not specified the HaController's resource name will be used instead. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#haController for HaControllers. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `networkingAutoConfiguration` | HaControllerNetworkingAutoConfiguration | Basic networking configuration. Required backend services and forwarding rules will be automatically created with default parameters. |
| `params` | HaControllerParams | Input only. Additional parameters passed with the request, but not persisted as part of the resource. Both `params: null` and `params: {}` are treated identically as a no-op. |
| `region` | string | Output only. \[Output Only\] URL of the region where the resource resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `state` | string enum | Output only. The current state of the HA Controller. Values: `ACTIVE`, `CREATING`, `DELETING`, `FAILOVER_IN_PROGRESS`, `FAILOVER_UNAVAILABLE`, `MULTI_ZONE_FAILURE`, `PENDING_FAILOVER`, `STARTING`, `STATE_UNSPECIFIED`, `STOPPED`, `STOPPING`, `UPDATING`. |
| `status` | HaControllerStatus | Output only. \[Output Only\] Status information for the HaController resource. |
| `zoneConfigurations` | object | Map of zone configurations Key: name of the zone Value: ZoneConfiguration |

### `HaController` (alpha)

- HaController handles failover for a VM Instance.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `backendServices` | array<string> | Advanced configuration option. If specified, these Backend Services need to be pre-created. Currently, only one backend service can be specified, and it must be L4 Internal Load Balancer (ILB). |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp in RFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `failoverInitiation` | string enum | Indicates how failover should be initiated. Values: `AUTOMATIC`, `FAILOVER_INITIATION_UNSPECIFIED`, `MANUAL_ONLY`. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instanceName` | string | Name of the instance that HaController is in charge of. If not specified the HaController's resource name will be used instead. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#haController for HaControllers. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `networkingAutoConfiguration` | HaControllerNetworkingAutoConfiguration | Basic networking configuration. Required backend services and forwarding rules will be automatically created with default parameters. |
| `region` | string | Output only. \[Output Only\] URL of the region where the resource resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `state` | string enum | Output only. The current state of the HA Controller. Values: `ACTIVE`, `CREATING`, `DELETING`, `FAILOVER_IN_PROGRESS`, `FAILOVER_UNAVAILABLE`, `MULTI_ZONE_FAILURE`, `PENDING_FAILOVER`, `STARTING`, `STATE_UNSPECIFIED`, `STOPPED`, `STOPPING`, `UPDATING`. |
| `status` | HaControllerStatus | Output only. \[Output Only\] Status information for the HaController resource. |
| `zoneConfigurations` | object | Map of zone configurations Key: name of the zone Value: ZoneConfiguration |

### `HaControllerInstanceNetworkInterface`

- The network interface configuration of the VM instance.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `ipv6Address` | string | Optional. Optional IPv6 address to assign to the instance's network interface. If omitted, an ephemeral IP may be assigned depending on the instance's network interface stack type. |
| `networkIP` | string | Optional. Optional IPv4 address to assign to the instance's network interface. If omitted, an ephemeral IP may be assigned depending on the instance's network interface stack type. |

### `HaControllerNetworkingAutoConfiguration`

- Basic networking configuration. Required backend services and forwarding rules will be automatically created with default parameters.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `internal` | HaControllerNetworkingAutoConfigurationInternal | Internal networking configuration |

### `HaControllerNetworkingAutoConfigurationInternal`

- Internal networking configuration
- Version: preview

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | Optional. IP addresses will be automatically allocated according to StackType if not provided. |
| `ipv6Address` | string | — |
| `stackType` | string enum | Determine which IP addresses to automatically create. Field and option naming consistent with NetworkInterface configuration on Instances. Values: `IPV4_IPV6`, `IPV4_ONLY`, `IPV6_ONLY`. |

### `HaControllerParams`

- Additional HA Controller params.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `migrateDisksToRegional` | boolean | Specifies whether to automatically migrate all disks of an instance from zonal to regional before attempting to create the HaController. |

### `HaControllerStatus`

- Contains information about current status of the HaController.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `failoverProgress` | HaControllerStatusFailoverProgress | Output only. \[Output Only\] Contains the details of the ongoing failover. This message is not displayed if failover is NOT in progress. |
| `lastFailoverInfo` | HaControllerStatusFailoverProgress | Output only. \[Output Only\] Contains the details of the last successful failover. |
| `ongoingFailover` | boolean | Output only. \[Output Only\] Indicates if the failover is currently in-progress. |
| `primaryInstance` | string | Output only. \[Output Only\] The URL to the instance that is intended to be primary at this moment. Primary instance will be changed at the very beginning of a failover operation. |
| `primaryZone` | string | Output only. \[Output Only\] The name of the zone that is intended to be primary at this moment. Primary zone will be changed at the very beginning of a failover operation. The zone may not be operational in the middle of a failover operation. |
| `readyForFailover` | boolean | Output only. \[Output Only\] Indicates if the resource is ready for initiating a failover to the secondary zone. |
| `zoneStatus` | object | Output only. \[Output Only\] Map of zone statuses. Key: name of the zone Value: ZoneStatus |

### `HaControllerStatusFailoverProgress`

- Contains information about the current failover operation.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `failoverCompleteTimestamp` | string (google-datetime) | Output only. \[Output Only\] Timestamp of the failover completion. Filled only if the failover is completed, in lastFailoverInfo. |
| `failoverDuration` | string (google-duration) | Output only. The duration of the last failover. |
| `failoverTrigger` | string enum | Output only. \[Output Only\] Indicates if failover has been triggered automatically or manually. Values: `AUTOMATIC`, `FAILOVER_TRIGGER_UNSPECIFIED`, `MANUAL`. |
| `failoverTriggerTimestamp` | string (google-datetime) | Output only. \[Output Only\] Timestamp of the last failover trigger. |
| `lastFailoverAttempt` | HaControllerStatusFailoverProgressLastFailoverAttempt | Output only. \[Output Only\] Contains details of the last failed failover. This field is filled only if the current failover is failing |

### `HaControllerStatusFailoverProgressLastFailoverAttempt`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `errors` | object | Output only. \[Output Only\] Encountered errors during the last attempt to process failover. |
| `timestamp` | string (google-datetime) | Output only. \[Output Only\] Show timestamp only if there is an error.RFC3339 text format. |

### `HaControllerStatusZoneStatus`

- Contains the status of a specific zone.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `isPrimary` | boolean | Output only. \[Output Only\] Indicates if the zone is primary at this moment. |
| `isZoneReady` | boolean | Output only. \[Output Only\] Indicates if the zone is ready for initiating a failover. |
| `lastError` | HaControllerStatusZoneStatusLastError | Output only. \[Output Only\] This field is filled only if the current operation is failing. |

### `HaControllerStatusZoneStatusLastError`

- Contains details of the last failed operation.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `errors` | object | Output only. \[Output Only\] Encountered errors. |
| `timestamp` | string (google-datetime) | Output only. \[Output Only\] Show timestamp only if there is an error.RFC3339 text format. |

### `HaControllerZoneConfiguration`

- Config for a zone that the HaController may use for running the VM instance.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `instanceNetworkInterfaces` | object | Optional. The network interface configuration of a VM instance in this zone, keyed by the name of the network interface. A VM network interface uses the nicN naming format, where N is a value between 0 and 7. The default interface is nic0. Use this field to choose the internal IP addresses of the VM instance in this zone instead of letting Compute Engine assign them automatically. - Each key must be a name of a network interface that exists on the VM instance. Otherwise, the request fails. - Network interfaces that are omitted are assigned an ephemeral internal IP address. - Every zone must configure the same network interfaces and the same IP address families. - For the zone that currently holds the VM instance, this field is populated automatically, and any addresses you specify must match the instance's current addresses. - Only internal IP addresses are supported, and this field can only be set when the HA Controller is created. |
| `nodeAffinities` | array<HaControllerZoneConfigurationNodeAffinity> | A set of node affinity configurations. Refer toConfiguring node affinity for more information. Overrides reservationAffinity. |
| `reservationAffinity` | HaControllerZoneConfigurationReservationAffinity | Specifies the reservations that the instance can consume from. |

### `HaControllerZoneConfiguration` (alpha)

- Config for a zone that the HaController may use for running the VM instance.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `nodeAffinities` | array<HaControllerZoneConfigurationNodeAffinity> | A set of node affinity configurations. Refer toConfiguring node affinity for more information. Overrides reservationAffinity. |
| `reservationAffinity` | HaControllerZoneConfigurationReservationAffinity | Specifies the reservations that the instance can consume from. |

### `HaControllerZoneConfigurationNodeAffinity`

- Node Affinity: the configuration of desired nodes onto which the Instance could be scheduled. This message should be an exact copy of the Instances representation of NodeAffinity.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `key` | string | Corresponds to the label key of Node resource. |
| `operator` | string enum | Defines the operation of node selection. Valid operators areIN for affinity and NOT_IN for anti-affinity. Values: `IN`, `NOT_IN`, `OPERATOR_UNSPECIFIED`. |
| `values` | array<string> | Corresponds to the label values of Node resource. |

### `HaControllerZoneConfigurationReservationAffinity`

- Specifies the reservations that this instance can consume from. This message should be an exact copy of the Instances representation of AllocationAffinity.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `consumeReservationType` | string enum | Specifies the type of reservation from which this instance can consume resources: ANY_RESERVATION (default),SPECIFIC_RESERVATION, or NO_RESERVATION. See Consuming reserved instances for examples. Values: `ANY_RESERVATION`, `ANY_RESERVATION_THEN_FAIL`, `NO_RESERVATION`, `SPECIFIC_RESERVATION`, `SPECIFIC_THEN_ANY_RESERVATION`, `SPECIFIC_THEN_NO_RESERVATION`, `UNSPECIFIED`. |
| `key` | string | Corresponds to the label key of a reservation resource. To target aSPECIFIC_RESERVATION by name, specifygoogleapis.com/reservation-name as the key and specify the name of your reservation as its value. |
| `values` | array<string> | Corresponds to the label values of a reservation resource. This can be either a name to a reservation in the same project or "projects/different-project/reservations/some-reservation-name" to target a shared reservation in the same zone but in a different project. |

### `HaControllersAggregatedList`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of HaControllersScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#haControllersAggregatedList for lists of HaControllers. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `HaControllersFailoverRequest`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `failoverToZone` | string | Name of the destination zone for the failover. |

### `HaControllersList`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | Unique identifier for the resource; defined by the server. |
| `items` | array<HaController> | A list of HaControllers in the specified project and region. |
| `nextPageToken` | string | This token allows you to get the next page of results formaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output only\] Unreachable resources. |
| `warning` | object | Informational warning message. |

### `HaControllersScopedList`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `haControllers` | array<HaController> | List of HaControllers contained in this scope. |
| `warning` | object | Informational warning which replaces the list of backend services when the list is empty. |

### `HealthAggregationPoliciesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthAggregationPolicies` | array<HealthAggregationPolicy> | A list of HealthAggregationPolicys contained in this scope. |
| `warning` | object | Informational warning which replaces the list of health aggregation policies when the list is empty. |

### `HealthAggregationPolicy`

- Represents a health aggregation policy. A health aggregation policy resource defines a policy to aggregate health. For more information, see Health checks overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a HealthAggregationPolicy. An up-to-date fingerprint must be provided in order to patch the HealthAggregationPolicy; Otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the HealthAggregationPolicy. |
| `healthyPercentThreshold` | integer (uint32) | Can only be set if the policyType field isBACKEND_SERVICE_POLICY. Specifies the threshold (as a percentage) of healthy endpoints required in order to consider the aggregated health result HEALTHY. Defaults to 60. Must be in range \[0, 100\]. Not applicable if the policyType field isDNB_PUBLIC_IP_POLICY. Can be mutated. This field is optional, and will be set to the default if unspecified. Note that both this threshold and minHealthyThreshold must be satisfied in order for HEALTHY to be the aggregated result. "Endpoints" refers to network endpoints within a Network Endpoint Group or instances within an Instance Group. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#healthAggregationPolicy for health aggregation policies. |
| `minHealthyThreshold` | integer (uint32) | Can only be set if the policyType field isBACKEND_SERVICE_POLICY. Specifies the minimum number of healthy endpoints required in order to consider the aggregated health result HEALTHY. Defaults to 1. Must be positive. Not applicable if the policyType field isDNB_PUBLIC_IP_POLICY. Can be mutated. This field is optional, and will be set to the default if unspecified. Note that both this threshold and healthyPercentThreshold must be satisfied in order for HEALTHY to be the aggregated result. "Endpoints" refers to network endpoints within a Network Endpoint Group or instances within an Instance Group. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `policyType` | string enum | Specifies the type of the healthAggregationPolicy. The only allowed value for global resources is DNS_PUBLIC_IP_POLICY. The only allowed value for regional resources is BACKEND_SERVICE_POLICY. Must be specified when the healthAggregationPolicy is created, and cannot be mutated. Values: `BACKEND_SERVICE_POLICY`, `DNS_PUBLIC_IP_POLICY`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the health aggregation policy resides. This field applies only to the regional resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL with id for the resource. |

### `HealthAggregationPolicyAggregatedList`

- Contains a list of HealthAggregationPoliciesScopedList.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of HealthAggregationPoliciesScopedList resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `HealthAggregationPolicyList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<HealthAggregationPolicy> | A list of HealthAggregationPolicy resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#healthAggregationPolicy for health aggregation policies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `HealthCheck`

- Represents a health check resource. Google Compute Engine has two health check resources: \* Regional \* Global These health check resources can be used for load balancing and for autohealing VMs in a managed instance group (MIG). \*\*Load balancing\*\* Health check requirements vary depending on the type of load balancer. For details about the type of health check supported for each load balancer and corresponding backend type, see Health checks overview: Load balancer guide. \*\*Autohealing in MIGs\*\* The health checks that you use for autohealing VMs in a MIG can be either regional or global. For more information, see Set up an application health check and autohealing. For more information, seeHealth checks overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checkIntervalSec` | integer (int32) | How often (in seconds) to send a health check. The default value is 5 seconds. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp in3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `grpcHealthCheck` | GRPCHealthCheck | — |
| `grpcTlsHealthCheck` | GRPCTLSHealthCheck | — |
| `healthyThreshold` | integer (int32) | A so-far unhealthy instance will be marked healthy after this many consecutive successes. The default value is 2. |
| `http2HealthCheck` | HTTP2HealthCheck | — |
| `httpHealthCheck` | HTTPHealthCheck | — |
| `httpsHealthCheck` | HTTPSHealthCheck | — |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. Type of the resource. |
| `logConfig` | HealthCheckLogConfig | Configure logging on this health check. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. For example, a name that is 1-63 characters long, matches the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`, and otherwise complies with RFC1035. This regular expression describes a name where the first character is a lowercase letter, and all following characters are a dash, lowercase letter, or digit, except the last character, which isn't a dash. |
| `region` | string | Output only. \[Output Only\] Region where the health check resides. Not applicable to global health checks. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `sourceRegions` | array<string> | The list of cloud regions from which health checks are performed. If any regions are specified, then exactly 3 regions should be specified. The region names must be valid names of Google Cloud regions. This can only be set for global health check. If this list is non-empty, then there are restrictions on what other health check fields are supported and what other resources can use this health check: - SSL, HTTP2, GRPC, and GRPC_WITH_TLS protocols are not supported. - The TCP request field is not supported. - The proxyHeader field for HTTP, HTTPS, and TCP is not supported. - The checkIntervalSec field must be at least 30. - The health check cannot be used with BackendService nor with managed instance group auto-healing. |
| `sslHealthCheck` | SSLHealthCheck | — |
| `tcpHealthCheck` | TCPHealthCheck | — |
| `timeoutSec` | integer (int32) | How long (in seconds) to wait before claiming failure. The default value is 5 seconds. It is invalid for timeoutSec to have greater value than checkIntervalSec. |
| `type` | string enum | Specifies the type of the healthCheck, either TCP,SSL, HTTP, HTTPS,HTTP2, GRPC or GRPC_WITH_TLS. Exactly one of the protocol-specific health check fields must be specified, which must match type field. Values: `GRPC`, `GRPC_WITH_TLS`, `HTTP`, `HTTP2`, `HTTPS`, `INVALID`, `SSL`, `TCP`. |
| `unhealthyThreshold` | integer (int32) | A so-far healthy instance will be marked unhealthy after this many consecutive failures. The default value is 2. |

### `HealthCheck` (alpha)

- Represents a health check resource. Google Compute Engine has two health check resources: \* Regional \* Global These health check resources can be used for load balancing and for autohealing VMs in a managed instance group (MIG). \*\*Load balancing\*\* Health check requirements vary depending on the type of load balancer. For details about the type of health check supported for each load balancer and corresponding backend type, see Health checks overview: Load balancer guide. \*\*Autohealing in MIGs\*\* The health checks that you use for autohealing VMs in a MIG can be either regional or global. For more information, see Set up an application health check and autohealing. For more information, seeHealth checks overview.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `checkIntervalSec` | integer (int32) | How often (in seconds) to send a health check. The default value is 5 seconds. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp in3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `grpcHealthCheck` | GRPCHealthCheck | — |
| `grpcTlsHealthCheck` | GRPCTLSHealthCheck | — |
| `healthyThreshold` | integer (int32) | A so-far unhealthy instance will be marked healthy after this many consecutive successes. The default value is 2. |
| `http2HealthCheck` | HTTP2HealthCheck | — |
| `httpHealthCheck` | HTTPHealthCheck | — |
| `httpsHealthCheck` | HTTPSHealthCheck | — |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. Type of the resource. |
| `logConfig` | HealthCheckLogConfig | Configure logging on this health check. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. For example, a name that is 1-63 characters long, matches the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`, and otherwise complies with RFC1035. This regular expression describes a name where the first character is a lowercase letter, and all following characters are a dash, lowercase letter, or digit, except the last character, which isn't a dash. |
| `region` | string | Output only. \[Output Only\] Region where the health check resides. Not applicable to global health checks. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `sourceRegions` | array<string> | The list of cloud regions from which health checks are performed. If any regions are specified, then exactly 3 regions should be specified. The region names must be valid names of Google Cloud regions. This can only be set for global health check. If this list is non-empty, then there are restrictions on what other health check fields are supported and what other resources can use this health check: - SSL, HTTP2, GRPC, and GRPC_WITH_TLS protocols are not supported. - The TCP request field is not supported. - The proxyHeader field for HTTP, HTTPS, and TCP is not supported. - The checkIntervalSec field must be at least 30. - The health check cannot be used with BackendService nor with managed instance group auto-healing. |
| `sslHealthCheck` | SSLHealthCheck | — |
| `tcpHealthCheck` | TCPHealthCheck | — |
| `timeoutSec` | integer (int32) | How long (in seconds) to wait before claiming failure. The default value is 5 seconds. It is invalid for timeoutSec to have greater value than checkIntervalSec. |
| `type` | string enum | Specifies the type of the healthCheck, either TCP,SSL, HTTP, HTTPS,HTTP2, GRPC or GRPC_WITH_TLS. Exactly one of the protocol-specific health check fields must be specified, which must match type field. Values: `GRPC`, `GRPC_WITH_TLS`, `HTTP`, `HTTP2`, `HTTPS`, `INVALID`, `SSL`, `TCP`, `UDP`. |
| `udpHealthCheck` | UDPHealthCheck | — |
| `unhealthyThreshold` | integer (int32) | A so-far healthy instance will be marked unhealthy after this many consecutive failures. The default value is 2. |

### `HealthCheckList`

- Contains a list of HealthCheck resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<HealthCheck> | A list of HealthCheck resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `HealthCheckLogConfig`

- Configuration of logging on a health check. If logging is enabled, logs will be exported to Stackdriver.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enable` | boolean | Indicates whether or not to export logs. This is false by default, which means no health check logging will be done. |

### `HealthCheckReference`

- A full or valid partial URL to a health check. For example, the following are valid URLs: - https://www.googleapis.com/compute/beta/projects/project-id/global/httpHealthChecks/health-check - projects/project-id/global/httpHealthChecks/health-check - global/httpHealthChecks/health-check
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthCheck` | string | — |

### `HealthCheckService`

- Represents a Health-Check as a Service resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a HealthCheckService. An up-to-date fingerprint must be provided in order to patch/update the HealthCheckService; Otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the HealthCheckService. |
| `healthChecks` | array<string> | A list of URLs to the HealthCheck resources. Must have at least one HealthCheck, and not more than 10 for regionalHealthCheckService, and not more than 1 for globalHealthCheckService.HealthCheck resources must haveportSpecification=USE_SERVING_PORT orportSpecification=USE_FIXED_PORT. For regional HealthCheckService, theHealthCheck must be regional and in the same region. For global HealthCheckService,HealthCheck must be global. Mix of regional and globalHealthChecks is not supported. Multiple regionalHealthChecks must belong to the same region. RegionalHealthChecks must belong to the same region as zones ofNetworkEndpointGroups. For globalHealthCheckService using globalINTERNET_IP_PORT NetworkEndpointGroups, the global HealthChecks must specify sourceRegions, and HealthChecks that specify sourceRegions can only be used with global INTERNET_IP_PORTNetworkEndpointGroups. |
| `healthStatusAggregationPolicy` | string enum | Optional. Policy for how the results from multiple health checks for the same endpoint are aggregated. Defaults to NO_AGGREGATION if unspecified. - NO_AGGREGATION. An EndpointHealth message is returned for each pair in the health check service. - AND. If any health check of an endpoint reportsUNHEALTHY, then UNHEALTHY is theHealthState of the endpoint. If all health checks reportHEALTHY, the HealthState of the endpoint isHEALTHY. . This is only allowed with regional HealthCheckService. Values: `AND`, `NO_AGGREGATION`. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#healthCheckServicefor health check services. |
| `name` | string | Name of the resource. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `networkEndpointGroups` | array<string> | A list of URLs to the NetworkEndpointGroup resources. Must not have more than 100. For regionalHealthCheckService, NEGs must be in zones in the region of the HealthCheckService. For globalHealthCheckServices, the NetworkEndpointGroups must be global INTERNET_IP_PORT. |
| `notificationEndpoints` | array<string> | A list of URLs to the NotificationEndpoint resources. Must not have more than 10. A list of endpoints for receiving notifications of change in health status. For regionalHealthCheckService,NotificationEndpoint must be regional and in the same region. For global HealthCheckService,NotificationEndpoint must be global. |
| `region` | string | Output only. \[Output Only\] URL of the region where the health check service resides. This field is not applicable to global health check services. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |

### `HealthCheckService` (alpha)

- Represents a Health-Check as a Service resource.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a HealthCheckService. An up-to-date fingerprint must be provided in order to patch/update the HealthCheckService; Otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the HealthCheckService. |
| `healthChecks` | array<string> | A list of URLs to the HealthCheck resources. Must have at least one HealthCheck, and not more than 10 for regionalHealthCheckService, and not more than 1 for globalHealthCheckService.HealthCheck resources must haveportSpecification=USE_SERVING_PORT orportSpecification=USE_FIXED_PORT. For regional HealthCheckService, theHealthCheck must be regional and in the same region. For global HealthCheckService,HealthCheck must be global. Mix of regional and globalHealthChecks is not supported. Multiple regionalHealthChecks must belong to the same region. RegionalHealthChecks must belong to the same region as zones ofNetworkEndpointGroups. For globalHealthCheckService using globalINTERNET_IP_PORT NetworkEndpointGroups, the global HealthChecks must specify sourceRegions, and HealthChecks that specify sourceRegions can only be used with global INTERNET_IP_PORTNetworkEndpointGroups. |
| `healthStatusAggregationPolicy` | string enum | Optional. Policy for how the results from multiple health checks for the same endpoint are aggregated. Defaults to NO_AGGREGATION if unspecified. - NO_AGGREGATION. An EndpointHealth message is returned for each pair in the health check service. - AND. If any health check of an endpoint reportsUNHEALTHY, then UNHEALTHY is theHealthState of the endpoint. If all health checks reportHEALTHY, the HealthState of the endpoint isHEALTHY. . This is only allowed with regional HealthCheckService. Values: `AND`, `NO_AGGREGATION`. |
| `healthStatusAggregationStrategy` | string enum | This field is deprecated. Use health_status_aggregation_policy instead. Policy for how the results from multiple health checks for the same endpoint are aggregated. - NO_AGGREGATION. An EndpointHealth message is returned for each backend in the health check service. - AND. If any backend's health check reportsUNHEALTHY, then UNHEALTHY is theHealthState of the entire health check service. If all backend's are healthy, the HealthState of the health check service is HEALTHY. . Values: `AND`, `NO_AGGREGATION`. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#healthCheckServicefor health check services. |
| `name` | string | Name of the resource. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `networkEndpointGroups` | array<string> | A list of URLs to the NetworkEndpointGroup resources. Must not have more than 100. For regionalHealthCheckService, NEGs must be in zones in the region of the HealthCheckService. For globalHealthCheckServices, the NetworkEndpointGroups must be global INTERNET_IP_PORT. |
| `notificationEndpoints` | array<string> | A list of URLs to the NotificationEndpoint resources. Must not have more than 10. A list of endpoints for receiving notifications of change in health status. For regionalHealthCheckService,NotificationEndpoint must be regional and in the same region. For global HealthCheckService,NotificationEndpoint must be global. |
| `region` | string | Output only. \[Output Only\] URL of the region where the health check service resides. This field is not applicable to global health check services. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL with id for the resource. |

### `HealthCheckService` (beta)

- Represents a Health-Check as a Service resource.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a HealthCheckService. An up-to-date fingerprint must be provided in order to patch/update the HealthCheckService; Otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the HealthCheckService. |
| `healthChecks` | array<string> | A list of URLs to the HealthCheck resources. Must have at least one HealthCheck, and not more than 10 for regionalHealthCheckService, and not more than 1 for globalHealthCheckService.HealthCheck resources must haveportSpecification=USE_SERVING_PORT orportSpecification=USE_FIXED_PORT. For regional HealthCheckService, theHealthCheck must be regional and in the same region. For global HealthCheckService,HealthCheck must be global. Mix of regional and globalHealthChecks is not supported. Multiple regionalHealthChecks must belong to the same region. RegionalHealthChecks must belong to the same region as zones ofNetworkEndpointGroups. For globalHealthCheckService using globalINTERNET_IP_PORT NetworkEndpointGroups, the global HealthChecks must specify sourceRegions, and HealthChecks that specify sourceRegions can only be used with global INTERNET_IP_PORTNetworkEndpointGroups. |
| `healthStatusAggregationPolicy` | string enum | Optional. Policy for how the results from multiple health checks for the same endpoint are aggregated. Defaults to NO_AGGREGATION if unspecified. - NO_AGGREGATION. An EndpointHealth message is returned for each pair in the health check service. - AND. If any health check of an endpoint reportsUNHEALTHY, then UNHEALTHY is theHealthState of the endpoint. If all health checks reportHEALTHY, the HealthState of the endpoint isHEALTHY. . This is only allowed with regional HealthCheckService. Values: `AND`, `NO_AGGREGATION`. |
| `healthStatusAggregationStrategy` | string enum | This field is deprecated. Use health_status_aggregation_policy instead. Policy for how the results from multiple health checks for the same endpoint are aggregated. - NO_AGGREGATION. An EndpointHealth message is returned for each backend in the health check service. - AND. If any backend's health check reportsUNHEALTHY, then UNHEALTHY is theHealthState of the entire health check service. If all backend's are healthy, the HealthState of the health check service is HEALTHY. . Values: `AND`, `NO_AGGREGATION`. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#healthCheckServicefor health check services. |
| `name` | string | Name of the resource. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `networkEndpointGroups` | array<string> | A list of URLs to the NetworkEndpointGroup resources. Must not have more than 100. For regionalHealthCheckService, NEGs must be in zones in the region of the HealthCheckService. For globalHealthCheckServices, the NetworkEndpointGroups must be global INTERNET_IP_PORT. |
| `notificationEndpoints` | array<string> | A list of URLs to the NotificationEndpoint resources. Must not have more than 10. A list of endpoints for receiving notifications of change in health status. For regionalHealthCheckService,NotificationEndpoint must be regional and in the same region. For global HealthCheckService,NotificationEndpoint must be global. |
| `region` | string | Output only. \[Output Only\] URL of the region where the health check service resides. This field is not applicable to global health check services. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |

### `HealthCheckServiceAggregatedList`

- Contains a list of HealthCheckServicesScopedList.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of HealthCheckServicesScopedList resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `HealthCheckServiceReference`

- A full or valid partial URL to a health check service. For example, the following are valid URLs: - https://www.googleapis.com/compute/beta/projects/project-id/regions/us-west1/healthCheckServices/health-check-service - projects/project-id/regions/us-west1/healthCheckServices/health-check-service - regions/us-west1/healthCheckServices/health-check-service
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthCheckService` | string | — |

### `HealthCheckServicesList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<HealthCheckService> | Output only. A list of HealthCheckService resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#healthCheckServicesList for lists of HealthCheckServices. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `HealthCheckServicesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resources` | array<HealthCheckService> | A list of HealthCheckServices contained in this scope. |
| `warning` | object | Informational warning which replaces the list of backend services when the list is empty. |

### `HealthChecksAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of HealthChecksScopedList resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `HealthChecksScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthChecks` | array<HealthCheck> | A list of HealthChecks contained in this scope. |
| `warning` | object | Informational warning which replaces the list of backend services when the list is empty. |

### `HealthSource`

- Represents a health source. A health source resource specifies the source resources and the health aggregation policy applied to the source resources to determine the aggregated health status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a HealthSource. An up-to-date fingerprint must be provided in order to patch the HealthSource; Otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the HealthSource. |
| `healthAggregationPolicy` | string | URL to the HealthAggregationPolicy resource. Must be set. Must be regional and in the same region as the HealthSource. Can be mutated. |
| `id` | string (uint64) | Output only. \[Output Only\] A unique identifier for this resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#healthSource for health sources. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `region` | string | Output only. \[Output Only\] URL of the region where the health source resides. This field applies only to the regional resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL with id for the resource. |
| `sourceType` | string enum | Specifies the type of the HealthSource. The only allowed value is BACKEND_SERVICE. Must be specified when theHealthSource is created, and cannot be mutated. Values: `BACKEND_SERVICE`. |
| `sources` | array<string> | URLs to the source resources. Must be size 1. Must be aBackendService if the sourceType is BACKEND_SERVICE. TheBackendService must have load balancing schemeINTERNAL or INTERNAL_MANAGED and must be regional and in the same region as the HealthSource (cross-region deployment for INTERNAL_MANAGED is not supported). TheBackendService may use only IGs, MIGs, or NEGs of typeGCE_VM_IP or GCE_VM_IP_PORT. TheBackendService may not use haPolicy. Can be mutated. |

### `HealthSourceAggregatedList`

- Contains a list of HealthSourcesScopedList.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of HealthSourcesScopedList resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `HealthSourceHealth`

- Response message for RegionHealthSources.GetHealth
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthState` | string enum | Health state of the HealthSource. Values: `HEALTHY`, `UNHEALTHY`, `UNKNOWN`. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#healthSourceHealth for the health of health sources. |
| `sources` | array<HealthSourcesGetHealthResponseSourceInfo> | Health state details of the sources. |

### `HealthSourceList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<HealthSource> | A list of HealthSource resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#healthSource for health sources. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `HealthSourcesGetHealthResponseSourceInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backends` | array<HealthSourcesGetHealthResponseSourceInfoBackendInfo> | Represents an instance group or network endpoint group behind the source backend service. Only used if the sourceType of the regionHealthSource is BACKEND_SERVICE. |
| `forwardingRule` | string | Fully qualified URL of the forwarding rule associated with the source resource if it is a L4ILB backend service. |
| `source` | string | Fully qualified URL of the associated source resource. This is always a backend service URL. |

### `HealthSourcesGetHealthResponseSourceInfoBackendInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpointCount` | integer (int32) | Total number of endpoints when determining the health of the regionHealthSource. |
| `group` | string | Fully qualified URL of an instance group or network endpoint group behind the source backend service. |
| `healthyEndpointCount` | integer (int32) | Number of endpoints considered healthy when determining health of the regionHealthSource. |

### `HealthSourcesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthSources` | array<HealthSource> | A list of HealthSources contained in this scope. |
| `warning` | object | Informational warning which replaces the list of health sources when the list is empty. |

### `HealthStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Metadata defined as annotations for network endpoint. |
| `forwardingRule` | string | URL of the forwarding rule associated with the health status of the instance. |
| `forwardingRuleIp` | string | A forwarding rule IP address assigned to this instance. |
| `healthState` | string enum | Health state of the IPv4 address of the instance. Values: `HEALTHY`, `UNHEALTHY`. |
| `instance` | string | URL of the instance resource. |
| `ipAddress` | string | For target pool based Network Load Balancing, it indicates the forwarding rule's IP address assigned to this instance. For other types of load balancing, the field indicates VM internal ip. |
| `ipv6Address` | string | — |
| `ipv6HealthState` | string enum | Health state of the IPv6 address of the instance. Values: `HEALTHY`, `UNHEALTHY`. |
| `port` | integer (int32) | The named port of the instance group, not necessarily the port that is health-checked. |
| `weight` | string | — |
| `weightError` | string enum | — Values: `INVALID_WEIGHT`, `MISSING_WEIGHT`, `UNAVAILABLE_WEIGHT`, `WEIGHT_NONE`. |

### `HealthStatusForNetworkEndpoint`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendService` | BackendServiceReference | URL of the backend service associated with the health state of the network endpoint. |
| `forwardingRule` | ForwardingRuleReference | URL of the forwarding rule associated with the health state of the network endpoint. |
| `healthCheck` | HealthCheckReference | URL of the health check associated with the health state of the network endpoint. |
| `healthCheckService` | HealthCheckServiceReference | URL of the health check service associated with the health state of the network endpoint. |
| `healthState` | string enum | Health state of the network endpoint determined based on the health checks configured. Values: `DRAINING`, `HEALTHY`, `UNHEALTHY`, `UNKNOWN`. |
| `ipv6HealthState` | string enum | Health state of the ipv6 network endpoint determined based on the health checks configured. Values: `DRAINING`, `HEALTHY`, `UNHEALTHY`, `UNKNOWN`. |

### `Help`

- Provides links to documentation or for performing an out of band action. For example, if a quota check failed with an error indicating the calling project hasn't enabled the accessed service, this can contain a URL pointing directly to the right place in the developer console to flip the bit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `links` | array<HelpLink> | URL(s) pointing to additional information on handling the current error. |

### `HelpLink`

- Describes a URL link.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Describes what the link offers. |
| `url` | string | The URL of the link. |

### `Host`

- Represents a host resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aliasLinks` | array<string> | Output only. All aliases for this resource. e.g. projects/123/zones/us-centra1-a/reservation/r1/reservationBlock/b1/hosts/h1 |
| `creationTimestamp` | string | Output only. The creation timestamp, formatted asRFC3339 text. |
| `description` | string | An optional description of this resource. |
| `id` | string (uint64) | Output only. The unique identifier for this resource. This identifier is defined by the server. |
| `kind` | string | Output only. The type of resource. Alwayscompute#host for hosts. |
| `name` | string | Output only. The name of the host. |
| `selfLink` | string | Output only. The self link of the host. |
| `selfLinkWithId` | string | Output only. The self link with id of the host. |
| `state` | string enum | Output only. The state of the host. Values: `ACTIVE`, `CREATING`, `DELETING`, `STATE_UNSPECIFIED`, `UNAVAILABLE`. |
| `status` | HostStatus | Output only. The status of the host |
| `zone` | string | Output only. The zone in which the host resides. |

### `HostPhysicalTopology`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `block` | string | The unique identifier of the capacity block within the cluster. |
| `cluster` | string | The cluster name of the reservation sub-block. |
| `host` | string | The unique identifier of the capacity host within the capacity sub-block. |
| `subBlock` | string | The unique identifier of the capacity sub-block within the capacity block. |

### `HostRule`

- UrlMaps A host-matching rule for a URL. If matched, will use the namedPathMatcher to select the BackendService.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `hosts` | array<string> | The list of host patterns to match. They must be valid hostnames with optional port numbers in the format host:port.\* matches any string of (\[a-z0-9-.\]\*). In that case, \* must be the first character, and if followed by anything, the immediate following character must be either - or .. \* based matching is not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true. |
| `pathMatcher` | string | The name of the PathMatcher to use to match the path portion of the URL if the hostRule matches the URL's host portion. |

### `HostStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `physicalTopology` | HostPhysicalTopology | Output only. The physical topology of the reservation sub-block, if present |
| `runningInstances` | array<string> | Output only. The URIs of the instances currently running on this host. |

### `HostsGetVersionRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sbomSelections` | array<string> | The SBOM selection to return. Duplicate values in the list will be ignored. Values: `SBOM_SELECTION_CURRENT`, `SBOM_SELECTION_TARGET`, `SBOM_SELECTION_UNSPECIFIED`. |

### `HostsListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | The unique identifier for the resource; defined by the server. |
| `items` | array<Host> | A list of host resources. |
| `kind` | string | The type of resource. Always compute#host for a list of hosts. |
| `nextPageToken` | string | This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | The server-defined URL for this resource. |
| `unreachables` | array<string> | Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | An informational warning message. |

### `HttpFaultAbort`

- Specification for how requests are aborted as part of fault injection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `httpStatus` | integer (uint32) | The HTTP status code used to abort the request. The value must be from 200 to 599 inclusive. For gRPC protocol, the gRPC status code is mapped to HTTP status code according to this mapping table. HTTP status 200 is mapped to gRPC status UNKNOWN. Injecting an OK status is currently not supported by Traffic Director. |
| `percentage` | number (double) | The percentage of traffic for connections, operations, or requests that is aborted as part of fault injection. The value must be from 0.0 to 100.0 inclusive. |

### `HttpFaultDelay`

- Specifies the delay introduced by the load balancer before forwarding the request to the backend service as part of fault injection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fixedDelay` | Duration | Specifies the value of the fixed delay interval. |
| `percentage` | number (double) | The percentage of traffic for connections, operations, or requests for which a delay is introduced as part of fault injection. The value must be from 0.0 to 100.0 inclusive. |

### `HttpFaultInjection`

- The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by the load balancer on a percentage of requests before sending those request to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `abort` | HttpFaultAbort | The specification for how client requests are aborted as part of fault injection. |
| `delay` | HttpFaultDelay | The specification for how client requests are delayed as part of fault injection, before being sent to a backend service. |

### `HttpFilterConfig`

- HttpFilterConfiguration supplies additional contextual settings for networkservices.HttpFilter resources enabled by Traffic Director.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `config` | string | The configuration needed to enable thenetworkservices.HttpFilter resource. The configuration must be YAML formatted and only contain fields defined in the protobuf identified in configTypeUrl |
| `configTypeUrl` | string | The fully qualified versioned proto3 type url of the protobuf that the filter expects for its contextual settings, for example:type.googleapis.com/google.protobuf.Struct |
| `filterName` | string | Name of the networkservices.HttpFilter resource this configuration belongs to. This name must be known to the xDS client. Example: envoy.wasm |

### `HttpHeaderAction`

- The request and response header transformations that take effect before the request is passed along to the selected backendService.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestHeadersToAdd` | array<HttpHeaderOption> | Headers to add to a matching request before forwarding the request to thebackendService. |
| `requestHeadersToRemove` | array<string> | A list of header names for headers that need to be removed from the request before forwarding the request to the backendService. |
| `responseHeadersToAdd` | array<HttpHeaderOption> | Headers to add the response before sending the response back to the client. |
| `responseHeadersToRemove` | array<string> | A list of header names for headers that need to be removed from the response before sending the response back to the client. |

### `HttpHeaderMatch`

- matchRule criteria for request header matches.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exactMatch` | string | The value should exactly match contents of exactMatch. Only one of exactMatch, prefixMatch,suffixMatch, regexMatch,presentMatch or rangeMatch must be set. |
| `headerName` | string | The name of the HTTP header to match. For matching against the HTTP request's authority, use a headerMatch with the header name ":authority". For matching a request's method, use the headerName ":method". When the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true, only non-binary user-specified custom metadata and the `content-type` header are supported. The following transport-level headers cannot be used in header matching rules: `:authority`, `:method`, `:path`, `:scheme`, `user-agent`, `accept-encoding`, `content-encoding`, `grpc-accept-encoding`, `grpc-encoding`, `grpc-previous-rpc-attempts`, `grpc-tags-bin`, `grpc-timeout` and `grpc-trace-bin`. |
| `invertMatch` | boolean | If set to false, the headerMatch is considered a match if the preceding match criteria are met. If set to true, the headerMatch is considered a match if the preceding match criteria are NOT met. The default setting is false. |
| `prefixMatch` | string | The value of the header must start with the contents ofprefixMatch. Only one of exactMatch, prefixMatch,suffixMatch, regexMatch,presentMatch or rangeMatch must be set. |
| `presentMatch` | boolean | A header with the contents of headerName must exist. The match takes place whether or not the request's header has a value. Only one of exactMatch, prefixMatch,suffixMatch, regexMatch,presentMatch or rangeMatch must be set. |
| `rangeMatch` | Int64RangeMatch | The header value must be an integer and its value must be in the range specified in rangeMatch. If the header does not contain an integer, number or is empty, the match fails. For example for a range \[-5, 0\] - -3 will match. - 0 will not match. - 0.25 will not match. - -3someString will not match. Only one of exactMatch, prefixMatch,suffixMatch, regexMatch,presentMatch or rangeMatch must be set. rangeMatch is not supported for load balancers that have loadBalancingScheme set to EXTERNAL. |
| `regexMatch` | string | The value of the header must match the regular expression specified inregexMatch. For more information about regular expression syntax, see Syntax. For matching against a port specified in the HTTP request, use a headerMatch with headerName set to PORT and a regular expression that satisfies the RFC2616 Host header's port specifier. Only one of exactMatch, prefixMatch,suffixMatch, regexMatch,presentMatch or rangeMatch must be set. Regular expressions can only be used when the loadBalancingScheme is set to INTERNAL_SELF_MANAGED, EXTERNAL_MANAGED (regional scope) or INTERNAL_MANAGED. |
| `suffixMatch` | string | The value of the header must end with the contents ofsuffixMatch. Only one of exactMatch, prefixMatch,suffixMatch, regexMatch,presentMatch or rangeMatch must be set. |

### Shape of `FutureReservation` (beta)

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "advancedDeploymentControl": "ReservationAdvancedDeploymentControl",
  "aggregateReservation": "AllocationAggregateReservation",
  "autoCreatedReservationsDeleteTime": "string",
  "autoCreatedReservationsDuration": "Duration",
  "autoDeleteAutoCreatedReservations": "boolean",
  "colocationResource": "string",
  "commitmentInfo": "FutureReservationCommitmentInfo",
  "confidentialComputeType": "string enum",
  "creationTimestamp": "string",
  "deploymentType": "string enum",
  "description": "string",
  "enableEmergentMaintenance": "boolean",
  "id": "string (uint64)",
  "kind": "string",
  "name": "string",
  "namePrefix": "string",
  "params": "FutureReservationParams",
  "planningStatus": "string enum",
  "protectionTier": "string enum",
  "reservationMode": "string enum",
  "reservationName": "string",
  "resourceName": "string",
  "schedulingType": "string enum",
  "selfLink": "string",
  "selfLinkWithId": "string",
  "shareSettings": "ShareSettings",
  "specificReservationRequired": "boolean",
  "specificSkuProperties": "FutureReservationSpecificSKUProperties",
  "status": "FutureReservationStatus",
  "storagePoolProperties": "FutureReservationStoragePoolProperties",
  "timeWindow": "FutureReservationTimeWindow",
  "zone": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
