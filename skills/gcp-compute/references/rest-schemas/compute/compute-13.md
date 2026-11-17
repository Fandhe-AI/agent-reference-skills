---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 13/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `StoragePoolResourceStatus` (alpha)

- \[Output Only\] Contains output only fields.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `aggregateDiskProvisionedIops` | string (int64) | DEPRECATED -- use "total_provisioned_disk_iops". |
| `aggregateDiskSizeGb` | string (int64) | DEPRECATED -- use "total provisioned disk size gb". |
| `diskCount` | string (int64) | \[Output Only\] Number of disks used. |
| `exapoolMaxReadIops` | string (int64) | Output only. \[Output Only\] Maximum allowed read IOPS for this Exapool. |
| `exapoolMaxReadThroughput` | string (int64) | Output only. \[Output Only\] Maximum allowed read throughput in MiB/s for this Exapool. |
| `exapoolMaxWriteIops` | string (int64) | Output only. \[Output Only\] Maximum allowed write IOPS for this Exapool. |
| `exapoolMaxWriteThroughput` | string (int64) | Output only. \[Output Only\] Maximum allowed write throughput in MiB/s for this Exapool. |
| `lastResizeTimestamp` | string | Output only. \[Output Only\] Timestamp of the last successful resize inRFC3339 text format. |
| `maxAggregateDiskSizeGb` | string (int64) | DEPRECATED -- use "max provisioned disk size gb" |
| `maxTotalProvisionedDiskCapacityGb` | string (int64) | \[Output Only\] Maximum allowed aggregate disk size in GiB. |
| `numberOfDisks` | string (int64) | DEPRECATED -- use "disk count". |
| `poolUsedCapacityBytes` | string (int64) | \[Output Only\] Space used by data stored in disks within the storage pool (in bytes). This will reflect the total number of bytes written to the disks in the pool, in contrast to the capacity of those disks. |
| `poolUsedIops` | string (int64) | \[Output Only\] Sum of all the disks' provisioned IOPS, minus some amount that is allowed per disk that is not counted towards pool's IOPS capacity. For more information, see https://cloud.google.com/compute/docs/disks/storage-pools. |
| `poolUsedThroughput` | string (int64) | \[Output Only\] Sum of all the disks' provisioned throughput in MiB/s. |
| `poolUserWrittenBytes` | string (int64) | \[Output Only\] Amount of data written into the pool, before it is compacted. |
| `totalProvisionedDiskCapacityGb` | string (int64) | \[Output Only\] Sum of all the disks' provisioned capacity (in GiB) in this storage pool. A disk's provisioned capacity is the same as its total capacity. |
| `totalProvisionedDiskIops` | string (int64) | \[Output Only\] Sum of all the disks' provisioned IOPS. |
| `totalProvisionedDiskThroughput` | string (int64) | \[Output Only\] Sum of all the disks' provisioned throughput in MiB/s, minus some amount that is allowed per disk that is not counted towards pool's throughput capacity. |
| `usedBytes` | string (int64) | DEPRECATED -- use "pool used capacity". |
| `usedReducedBytes` | string (int64) | DEPRECATED -- do not use, will be removed. |
| `usedThroughput` | string (int64) | DEPRECATED -- use "pool used throughput". |

### `StoragePoolShareSettings`

- Share settings for the storage pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectMap` | object | A map of project id and project config. |

### `StoragePoolShareSettingsProjectConfig`

- Config for each project in the share settings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | The project ID, should be same as the key of this project config in the parent map. |

### `StoragePoolType`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this storage pool type. |
| `description` | string | \[Output Only\] An optional description of this resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#storagePoolType for storage pool types. |
| `maxPoolProvisionedCapacityGb` | string (int64) | \[Output Only\] Maximum storage pool size in GB. |
| `maxPoolProvisionedIops` | string (int64) | \[Output Only\] Maximum provisioned IOPS. |
| `maxPoolProvisionedThroughput` | string (int64) | \[Output Only\] Maximum provisioned throughput. |
| `minPoolProvisionedCapacityGb` | string (int64) | \[Output Only\] Minimum storage pool size in GB. |
| `minPoolProvisionedIops` | string (int64) | \[Output Only\] Minimum provisioned IOPS. |
| `minPoolProvisionedThroughput` | string (int64) | \[Output Only\] Minimum provisioned throughput. |
| `minSizeGb` | string (int64) | \[Deprecated\] This field is deprecated. Use minPoolProvisionedCapacityGb instead. |
| `name` | string | \[Output Only\] Name of the resource. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `supportedDiskTypes` | array<string> | \[Output Only\] The list of disk types supported in this storage pool type. |
| `zone` | string | \[Output Only\] URL of the zone where the storage pool type resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `StoragePoolTypeAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of StoragePoolTypesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#storagePoolTypeAggregatedList. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `StoragePoolTypeList`

- Contains a list of storage pool types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<StoragePoolType> | A list of StoragePoolType resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#storagePoolTypeList for storage pool types. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `StoragePoolTypesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `storagePoolTypes` | array<StoragePoolType> | \[Output Only\] A list of storage pool types contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of storage pool types when the list is empty. |

### `StoragePoolsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `storagePools` | array<StoragePool> | \[Output Only\] A list of storage pool contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of storage pool when the list is empty. |

### `StructuredEntries`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `entries` | object | Map of a partner metadata that belong to the same subdomain. It accepts any value including google.protobuf.Struct. |

### `Subnetwork`

- Represents a Subnetwork resource. A subnetwork (also known as a subnet) is a logical partition of a Virtual Private Cloud network with one primary IP range and zero or more secondary IP ranges. For more information, read Virtual Private Cloud (VPC) Network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowSubnetCidrRoutesOverlap` | boolean | Whether this subnetwork's ranges can conflict with existing custom routes. Setting this to true allows this subnetwork's primary and secondary ranges to overlap with (and contain) custom routes that have already been configured on the corresponding network. For example if a static route has range 10.1.0.0/16, a subnet range 10.0.0.0/8 could only be created if allow_conflicting_routes=true. Overlapping is only allowed on subnetwork operations; routes whose ranges conflict with this subnetwork's ranges won't be allowed unless route.allow_conflicting_subnetworks is set to true. Typically packets destined to IPs within the subnetwork (which may contain private/sensitive data) are prevented from leaving the virtual network. Setting this field to true will disable this feature. The default value is false and applies to all existing subnetworks and automatically created subnetworks. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. This field can be set only at resource creation time. |
| `enableFlowLogs` | boolean | Whether to enable flow logging for this subnetwork. If this field is not explicitly set, it will not appear in get listings. If not set the default behavior is determined by the org policy, if there is no org policy specified, then it will default to disabled. This field isn't supported if the subnet purpose field is set toREGIONAL_MANAGED_PROXY. It is recommended to uselogConfig.enable field instead. |
| `externalIpv6Prefix` | string | The external IPv6 address range that is owned by this subnetwork. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a Subnetwork. An up-to-date fingerprint must be provided in order to update the Subnetwork, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a Subnetwork. |
| `gatewayAddress` | string | Output only. \[Output Only\] The gateway address for default routes to reach destination addresses outside this subnetwork. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `internalIpv6Prefix` | string | The internal IPv6 address range that is owned by this subnetwork. |
| `ipCidrRange` | string | The range of internal addresses that are owned by this subnetwork. Provide this property when you create the subnetwork. For example,10.0.0.0/8 or 100.64.0.0/10. Ranges must be unique and non-overlapping within a network. Only IPv4 is supported. This field is set at resource creation time. The range can be any range listed in theValid ranges list. The range can be expanded after creation usingexpandIpCidrRange. |
| `ipCollection` | string | Reference to the source of IP, like a PublicDelegatedPrefix (PDP) for BYOIP. The PDP must be a sub-PDP in EXTERNAL_IPV6_SUBNETWORK_CREATION or INTERNAL_IPV6_SUBNETWORK_CREATION mode. Use one of the following formats to specify a sub-PDP when creating a dual stack or IPv6-only subnetwork with external access using BYOIP: - Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/projectId/regions/region/publicDelegatedPrefixes/sub-pdp-name - Partial URL, as in - projects/projectId/regions/region/publicDelegatedPrefixes/sub-pdp-name - regions/region/publicDelegatedPrefixes/sub-pdp-name |
| `ipv6AccessType` | string enum | The access type of IPv6 address this subnet holds. It's immutable and can only be specified during creation or the first time the subnet is updated into IPV4_IPV6 dual stack. Values: `EXTERNAL`, `INTERNAL`. |
| `ipv6CidrRange` | string | Output only. \[Output Only\] This field is for internal use. |
| `ipv6GceEndpoint` | string enum | Output only. \[Output Only\] Possible endpoints of this subnetwork. It can be one of the following: - VM_ONLY: The subnetwork can be used for creating instances and IPv6 addresses with VM endpoint type. Such a subnetwork gets external IPv6 ranges from a public delegated prefix and cannot be used to create NetLb. - VM_AND_FR: The subnetwork can be used for creating both VM instances and Forwarding Rules. It can also be used to reserve IPv6 addresses with both VM and FR endpoint types. Such a subnetwork gets its IPv6 range from Google IP Pool directly. Values: `VM_AND_FR`, `VM_ONLY`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#subnetwork for Subnetwork resources. |
| `logConfig` | SubnetworkLogConfig | This field denotes the VPC flow logging options for this subnetwork. If logging is enabled, logs are exported to Cloud Logging. |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | The URL of the network to which this subnetwork belongs, provided by the client when initially creating the subnetwork. This field can be set only at resource creation time. |
| `params` | SubnetworkParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `privateIpGoogleAccess` | boolean | Whether the VMs in this subnet can access Google services without assigned external IP addresses. This field can be both set at resource creation time and updated using setPrivateIpGoogleAccess. |
| `privateIpv6GoogleAccess` | string enum | This field is for internal use. This field can be both set at resource creation time and updated usingpatch. Values: `DISABLE_GOOGLE_ACCESS`, `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE`, `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE`. |
| `purpose` | string enum | — Values: `GLOBAL_MANAGED_PROXY`, `INTERNAL_HTTPS_LOAD_BALANCER`, `PEER_MIGRATION`, `PRIVATE`, `PRIVATE_NAT`, `PRIVATE_RFC_1918`, `PRIVATE_SERVICE_CONNECT`, `REGIONAL_MANAGED_PROXY`. |
| `region` | string | URL of the region where the Subnetwork resides. This field can be set only at resource creation time. |
| `reservedInternalRange` | string | The URL of the reserved internal range. |
| `resolveSubnetMask` | string enum | Configures subnet mask resolution for this subnetwork. Values: `ARP_ALL_RANGES`, `ARP_BROADCAST_PRIMARY_RANGE`, `ARP_BROADCAST_PRIMARY_RANGE_WITH_LEARNING`, `ARP_PRIMARY_RANGE`. |
| `role` | string enum | The role of subnetwork. Currently, this field is only used when purpose is set to GLOBAL_MANAGED_PROXY orREGIONAL_MANAGED_PROXY. The value can be set toACTIVE or BACKUP. An ACTIVE subnetwork is one that is currently being used for Envoy-based load balancers in a region. A BACKUP subnetwork is one that is ready to be promoted to ACTIVE or is currently draining. This field can be updated with a patch request. Values: `ACTIVE`, `BACKUP`. |
| `secondaryIpRanges` | array<SubnetworkSecondaryRange> | An array of configurations for secondary IP ranges for VM instances contained in this subnetwork. The primary IP of such VM must belong to the primary ipCidrRange of the subnetwork. The alias IPs may belong to either primary or secondary ranges. This field can be updated with apatch request. Supports both IPv4 and IPv6 ranges. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `stackType` | string enum | The stack type for the subnet. If set to IPV4_ONLY, new VMs in the subnet are assigned IPv4 addresses only. If set toIPV4_IPV6, new VMs in the subnet can be assigned both IPv4 and IPv6 addresses. If not specified, IPV4_ONLY is used. This field can be both set at resource creation time and updated usingpatch. Values: `IPV4_IPV6`, `IPV4_ONLY`, `IPV6_ONLY`. |
| `state` | string enum | Output only. \[Output Only\] The state of the subnetwork, which can be one of the following values:READY: Subnetwork is created and ready to useDRAINING: only applicable to subnetworks that have the purpose set to INTERNAL_HTTPS_LOAD_BALANCER and indicates that connections to the load balancer are being drained. A subnetwork that is draining cannot be used or modified until it reaches a status ofREADY Values: `DRAINING`, `READY`. |
| `systemReservedExternalIpv6Ranges` | array<string> | Output only. \[Output Only\] The array of external IPv6 network ranges reserved from the subnetwork's external IPv6 range for system use. |
| `systemReservedInternalIpv6Ranges` | array<string> | Output only. \[Output Only\] The array of internal IPv6 network ranges reserved from the subnetwork's internal IPv6 range for system use. |
| `utilizationDetails` | SubnetworkUtilizationDetails | Output only. \[Output Only\] The current IP utilization of all subnetwork ranges. Contains the total number of allocated and free IPs in each range. |

### `Subnetwork` (alpha)

- Represents a Subnetwork resource. A subnetwork (also known as a subnet) is a logical partition of a Virtual Private Cloud network with one primary IP range and zero or more secondary IP ranges. For more information, read Virtual Private Cloud (VPC) Network.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `aggregationInterval` | string enum | Can only be specified if VPC flow logging for this subnetwork is enabled. Sets the aggregation interval for collecting flow logs. Increasing the interval time reduces the amount of generated flow logs for long-lasting connections. Default is an interval of 5 seconds per connection. Valid values: INTERVAL_5_SEC, INTERVAL_30_SEC,INTERVAL_1_MIN, INTERVAL_5_MIN,INTERVAL_10_MIN, INTERVAL_15_MIN. Values: `INTERVAL_10_MIN`, `INTERVAL_15_MIN`, `INTERVAL_1_MIN`, `INTERVAL_30_SEC`, `INTERVAL_5_MIN`, `INTERVAL_5_SEC`. |
| `allowSubnetCidrRoutesOverlap` | boolean | Whether this subnetwork's ranges can conflict with existing custom routes. Setting this to true allows this subnetwork's primary and secondary ranges to overlap with (and contain) custom routes that have already been configured on the corresponding network. For example if a static route has range 10.1.0.0/16, a subnet range 10.0.0.0/8 could only be created if allow_conflicting_routes=true. Overlapping is only allowed on subnetwork operations; routes whose ranges conflict with this subnetwork's ranges won't be allowed unless route.allow_conflicting_subnetworks is set to true. Typically packets destined to IPs within the subnetwork (which may contain private/sensitive data) are prevented from leaving the virtual network. Setting this field to true will disable this feature. The default value is false and applies to all existing subnetworks and automatically created subnetworks. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. This field can be set only at resource creation time. |
| `enableFlowLogs` | boolean | Whether to enable flow logging for this subnetwork. If this field is not explicitly set, it will not appear in get listings. If not set the default behavior is determined by the org policy, if there is no org policy specified, then it will default to disabled. This field isn't supported if the subnet purpose field is set toREGIONAL_MANAGED_PROXY. It is recommended to uselogConfig.enable field instead. |
| `enableL2` | boolean | Enables Layer2 communication on the subnetwork. |
| `enablePrivateV6Access` | boolean | Deprecated in favor of enable in PrivateIpv6GoogleAccess. Whether the VMs in this subnet can directly access Google services via internal IPv6 addresses. This field can be both set at resource creation time and updated using patch. |
| `externalIpv6Prefix` | string | The external IPv6 address range that is owned by this subnetwork. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a Subnetwork. An up-to-date fingerprint must be provided in order to update the Subnetwork, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a Subnetwork. |
| `flowSampling` | number (float) | Can only be specified if VPC flow logging for this subnetwork is enabled. The value of the field must be in \[0, 1\]. Set the sampling rate of VPC flow logs within the subnetwork where 1.0 means all collected logs are reported and 0.0 means no logs are reported. Default is0.5 unless otherwise specified by the org policy, which means half of all collected logs are reported. |
| `gatewayAddress` | string | Output only. \[Output Only\] The gateway address for default routes to reach destination addresses outside this subnetwork. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `internalIpv6Prefix` | string | The internal IPv6 address range that is owned by this subnetwork. |
| `ipCidrRange` | string | The range of internal addresses that are owned by this subnetwork. Provide this property when you create the subnetwork. For example,10.0.0.0/8 or 100.64.0.0/10. Ranges must be unique and non-overlapping within a network. Only IPv4 is supported. This field is set at resource creation time. The range can be any range listed in theValid ranges list. The range can be expanded after creation usingexpandIpCidrRange. |
| `ipCollection` | string | Reference to the source of IP, like a PublicDelegatedPrefix (PDP) for BYOIP. The PDP must be a sub-PDP in EXTERNAL_IPV6_SUBNETWORK_CREATION or INTERNAL_IPV6_SUBNETWORK_CREATION mode. Use one of the following formats to specify a sub-PDP when creating a dual stack or IPv6-only subnetwork with external access using BYOIP: - Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/projectId/regions/region/publicDelegatedPrefixes/sub-pdp-name - Partial URL, as in - projects/projectId/regions/region/publicDelegatedPrefixes/sub-pdp-name - regions/region/publicDelegatedPrefixes/sub-pdp-name |
| `ipv6AccessType` | string enum | The access type of IPv6 address this subnet holds. It's immutable and can only be specified during creation or the first time the subnet is updated into IPV4_IPV6 dual stack. Values: `EXTERNAL`, `INTERNAL`. |
| `ipv6CidrRange` | string | Output only. \[Output Only\] This field is for internal use. |
| `ipv6GceEndpoint` | string enum | Output only. \[Output Only\] Possible endpoints of this subnetwork. It can be one of the following: - VM_ONLY: The subnetwork can be used for creating instances and IPv6 addresses with VM endpoint type. Such a subnetwork gets external IPv6 ranges from a public delegated prefix and cannot be used to create NetLb. - VM_AND_FR: The subnetwork can be used for creating both VM instances and Forwarding Rules. It can also be used to reserve IPv6 addresses with both VM and FR endpoint types. Such a subnetwork gets its IPv6 range from Google IP Pool directly. Values: `VM_AND_FR`, `VM_ONLY`. |
| `ipv6NetworkTier` | string enum | Specifies the network tier for EXTERNAL IPv6. Can only be set when ipv6_access_type is EXTERNAL. Defaults to project defaultNetworkTier if not specified during the creation of the subnetwork. This field is IMMUTABLE once set with EXTERNAL IPv6. Values: `FIXED_STANDARD`, `PREMIUM`, `SELECT`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#subnetwork for Subnetwork resources. |
| `logConfig` | SubnetworkLogConfig | This field denotes the VPC flow logging options for this subnetwork. If logging is enabled, logs are exported to Cloud Logging. |
| `metadata` | string enum | Can only be specified if VPC flow logging for this subnetwork is enabled. Configures whether metadata fields should be added to the reported VPC flow logs. Options are INCLUDE_ALL_METADATA,EXCLUDE_ALL_METADATA, and CUSTOM_METADATA. Default is EXCLUDE_ALL_METADATA. Values: `EXCLUDE_ALL_METADATA`, `INCLUDE_ALL_METADATA`. |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | The URL of the network to which this subnetwork belongs, provided by the client when initially creating the subnetwork. This field can be set only at resource creation time. |
| `params` | SubnetworkParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `privateIpGoogleAccess` | boolean | Whether the VMs in this subnet can access Google services without assigned external IP addresses. This field can be both set at resource creation time and updated using setPrivateIpGoogleAccess. |
| `privateIpv6GoogleAccess` | string enum | This field is for internal use. This field can be both set at resource creation time and updated usingpatch. Values: `DISABLE_GOOGLE_ACCESS`, `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE`, `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE`. |
| `purpose` | string enum | — Values: `AGGREGATE`, `CLOUD_EXTENSION`, `CUSTOM_HARDWARE_LINK`, `GLOBAL_MANAGED_PROXY`, `INTERNAL_HTTPS_LOAD_BALANCER`, `PEER_MIGRATION`, `PRIVATE`, `PRIVATE_NAT`, `PRIVATE_RFC_1918`, `PRIVATE_SERVICE_CONNECT`, `REGIONAL_MANAGED_PROXY`. |
| `region` | string | URL of the region where the Subnetwork resides. This field can be set only at resource creation time. |
| `reservedInternalRange` | string | The URL of the reserved internal range. |
| `resolveSubnetMask` | string enum | Configures subnet mask resolution for this subnetwork. Values: `ARP_ALL_RANGES`, `ARP_BROADCAST_PRIMARY_RANGE`, `ARP_BROADCAST_PRIMARY_RANGE_WITH_LEARNING`, `ARP_PRIMARY_RANGE`. |
| `role` | string enum | The role of subnetwork. Currently, this field is only used when purpose is set to GLOBAL_MANAGED_PROXY orREGIONAL_MANAGED_PROXY. The value can be set toACTIVE or BACKUP. An ACTIVE subnetwork is one that is currently being used for Envoy-based load balancers in a region. A BACKUP subnetwork is one that is ready to be promoted to ACTIVE or is currently draining. This field can be updated with a patch request. Values: `ACTIVE`, `BACKUP`. |
| `secondaryIpRanges` | array<SubnetworkSecondaryRange> | An array of configurations for secondary IP ranges for VM instances contained in this subnetwork. The primary IP of such VM must belong to the primary ipCidrRange of the subnetwork. The alias IPs may belong to either primary or secondary ranges. This field can be updated with apatch request. Supports both IPv4 and IPv6 ranges. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `stackType` | string enum | The stack type for the subnet. If set to IPV4_ONLY, new VMs in the subnet are assigned IPv4 addresses only. If set toIPV4_IPV6, new VMs in the subnet can be assigned both IPv4 and IPv6 addresses. If not specified, IPV4_ONLY is used. This field can be both set at resource creation time and updated usingpatch. Values: `IPV4_IPV6`, `IPV4_ONLY`, `IPV6_ONLY`. |
| `state` | string enum | Output only. \[Output Only\] The state of the subnetwork, which can be one of the following values:READY: Subnetwork is created and ready to useDRAINING: only applicable to subnetworks that have the purpose set to INTERNAL_HTTPS_LOAD_BALANCER and indicates that connections to the load balancer are being drained. A subnetwork that is draining cannot be used or modified until it reaches a status ofREADY Values: `DRAINING`, `READY`. |
| `systemReservedExternalIpv6Ranges` | array<string> | Output only. \[Output Only\] The array of external IPv6 network ranges reserved from the subnetwork's external IPv6 range for system use. |
| `systemReservedInternalIpv6Ranges` | array<string> | Output only. \[Output Only\] The array of internal IPv6 network ranges reserved from the subnetwork's internal IPv6 range for system use. |
| `utilizationDetails` | SubnetworkUtilizationDetails | Output only. \[Output Only\] The current IP utilization of all subnetwork ranges. Contains the total number of allocated and free IPs in each range. |
| `vlans` | array<integer> | A repeated field indicating the VLAN IDs supported on this subnetwork. During Subnet creation, specifying vlan is valid only if enable_l2 is true. During Subnet Update, specifying vlan is allowed only for l2 enabled subnets. Restricted to only one VLAN. |

### `Subnetwork` (beta)

- Represents a Subnetwork resource. A subnetwork (also known as a subnet) is a logical partition of a Virtual Private Cloud network with one primary IP range and zero or more secondary IP ranges. For more information, read Virtual Private Cloud (VPC) Network.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `allowSubnetCidrRoutesOverlap` | boolean | Whether this subnetwork's ranges can conflict with existing custom routes. Setting this to true allows this subnetwork's primary and secondary ranges to overlap with (and contain) custom routes that have already been configured on the corresponding network. For example if a static route has range 10.1.0.0/16, a subnet range 10.0.0.0/8 could only be created if allow_conflicting_routes=true. Overlapping is only allowed on subnetwork operations; routes whose ranges conflict with this subnetwork's ranges won't be allowed unless route.allow_conflicting_subnetworks is set to true. Typically packets destined to IPs within the subnetwork (which may contain private/sensitive data) are prevented from leaving the virtual network. Setting this field to true will disable this feature. The default value is false and applies to all existing subnetworks and automatically created subnetworks. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. This field can be set only at resource creation time. |
| `enableFlowLogs` | boolean | Whether to enable flow logging for this subnetwork. If this field is not explicitly set, it will not appear in get listings. If not set the default behavior is determined by the org policy, if there is no org policy specified, then it will default to disabled. This field isn't supported if the subnet purpose field is set toREGIONAL_MANAGED_PROXY. It is recommended to uselogConfig.enable field instead. |
| `externalIpv6Prefix` | string | The external IPv6 address range that is owned by this subnetwork. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a Subnetwork. An up-to-date fingerprint must be provided in order to update the Subnetwork, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a Subnetwork. |
| `gatewayAddress` | string | Output only. \[Output Only\] The gateway address for default routes to reach destination addresses outside this subnetwork. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `internalIpv6Prefix` | string | The internal IPv6 address range that is owned by this subnetwork. |
| `ipCidrRange` | string | The range of internal addresses that are owned by this subnetwork. Provide this property when you create the subnetwork. For example,10.0.0.0/8 or 100.64.0.0/10. Ranges must be unique and non-overlapping within a network. Only IPv4 is supported. This field is set at resource creation time. The range can be any range listed in theValid ranges list. The range can be expanded after creation usingexpandIpCidrRange. |
| `ipCollection` | string | Reference to the source of IP, like a PublicDelegatedPrefix (PDP) for BYOIP. The PDP must be a sub-PDP in EXTERNAL_IPV6_SUBNETWORK_CREATION or INTERNAL_IPV6_SUBNETWORK_CREATION mode. Use one of the following formats to specify a sub-PDP when creating a dual stack or IPv6-only subnetwork with external access using BYOIP: - Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/projectId/regions/region/publicDelegatedPrefixes/sub-pdp-name - Partial URL, as in - projects/projectId/regions/region/publicDelegatedPrefixes/sub-pdp-name - regions/region/publicDelegatedPrefixes/sub-pdp-name |
| `ipv6AccessType` | string enum | The access type of IPv6 address this subnet holds. It's immutable and can only be specified during creation or the first time the subnet is updated into IPV4_IPV6 dual stack. Values: `EXTERNAL`, `INTERNAL`. |
| `ipv6CidrRange` | string | Output only. \[Output Only\] This field is for internal use. |
| `ipv6GceEndpoint` | string enum | Output only. \[Output Only\] Possible endpoints of this subnetwork. It can be one of the following: - VM_ONLY: The subnetwork can be used for creating instances and IPv6 addresses with VM endpoint type. Such a subnetwork gets external IPv6 ranges from a public delegated prefix and cannot be used to create NetLb. - VM_AND_FR: The subnetwork can be used for creating both VM instances and Forwarding Rules. It can also be used to reserve IPv6 addresses with both VM and FR endpoint types. Such a subnetwork gets its IPv6 range from Google IP Pool directly. Values: `VM_AND_FR`, `VM_ONLY`. |
| `ipv6NetworkTier` | string enum | Specifies the network tier for EXTERNAL IPv6. Can only be set when ipv6_access_type is EXTERNAL. Defaults to project defaultNetworkTier if not specified during the creation of the subnetwork. This field is IMMUTABLE once set with EXTERNAL IPv6. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#subnetwork for Subnetwork resources. |
| `logConfig` | SubnetworkLogConfig | This field denotes the VPC flow logging options for this subnetwork. If logging is enabled, logs are exported to Cloud Logging. |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | The URL of the network to which this subnetwork belongs, provided by the client when initially creating the subnetwork. This field can be set only at resource creation time. |
| `params` | SubnetworkParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `privateIpGoogleAccess` | boolean | Whether the VMs in this subnet can access Google services without assigned external IP addresses. This field can be both set at resource creation time and updated using setPrivateIpGoogleAccess. |
| `privateIpv6GoogleAccess` | string enum | This field is for internal use. This field can be both set at resource creation time and updated usingpatch. Values: `DISABLE_GOOGLE_ACCESS`, `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE`, `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE`. |
| `purpose` | string enum | — Values: `CUSTOM_HARDWARE_LINK`, `GLOBAL_MANAGED_PROXY`, `INTERNAL_HTTPS_LOAD_BALANCER`, `PEER_MIGRATION`, `PRIVATE`, `PRIVATE_NAT`, `PRIVATE_RFC_1918`, `PRIVATE_SERVICE_CONNECT`, `REGIONAL_MANAGED_PROXY`. |
| `region` | string | URL of the region where the Subnetwork resides. This field can be set only at resource creation time. |
| `reservedInternalRange` | string | The URL of the reserved internal range. |
| `resolveSubnetMask` | string enum | Configures subnet mask resolution for this subnetwork. Values: `ARP_ALL_RANGES`, `ARP_BROADCAST_PRIMARY_RANGE`, `ARP_BROADCAST_PRIMARY_RANGE_WITH_LEARNING`, `ARP_PRIMARY_RANGE`. |
| `role` | string enum | The role of subnetwork. Currently, this field is only used when purpose is set to GLOBAL_MANAGED_PROXY orREGIONAL_MANAGED_PROXY. The value can be set toACTIVE or BACKUP. An ACTIVE subnetwork is one that is currently being used for Envoy-based load balancers in a region. A BACKUP subnetwork is one that is ready to be promoted to ACTIVE or is currently draining. This field can be updated with a patch request. Values: `ACTIVE`, `BACKUP`. |
| `secondaryIpRanges` | array<SubnetworkSecondaryRange> | An array of configurations for secondary IP ranges for VM instances contained in this subnetwork. The primary IP of such VM must belong to the primary ipCidrRange of the subnetwork. The alias IPs may belong to either primary or secondary ranges. This field can be updated with apatch request. Supports both IPv4 and IPv6 ranges. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `stackType` | string enum | The stack type for the subnet. If set to IPV4_ONLY, new VMs in the subnet are assigned IPv4 addresses only. If set toIPV4_IPV6, new VMs in the subnet can be assigned both IPv4 and IPv6 addresses. If not specified, IPV4_ONLY is used. This field can be both set at resource creation time and updated usingpatch. Values: `IPV4_IPV6`, `IPV4_ONLY`, `IPV6_ONLY`. |
| `state` | string enum | Output only. \[Output Only\] The state of the subnetwork, which can be one of the following values:READY: Subnetwork is created and ready to useDRAINING: only applicable to subnetworks that have the purpose set to INTERNAL_HTTPS_LOAD_BALANCER and indicates that connections to the load balancer are being drained. A subnetwork that is draining cannot be used or modified until it reaches a status ofREADY Values: `DRAINING`, `READY`. |
| `systemReservedExternalIpv6Ranges` | array<string> | Output only. \[Output Only\] The array of external IPv6 network ranges reserved from the subnetwork's external IPv6 range for system use. |
| `systemReservedInternalIpv6Ranges` | array<string> | Output only. \[Output Only\] The array of internal IPv6 network ranges reserved from the subnetwork's internal IPv6 range for system use. |
| `utilizationDetails` | SubnetworkUtilizationDetails | Output only. \[Output Only\] The current IP utilization of all subnetwork ranges. Contains the total number of allocated and free IPs in each range. |

### `SubnetworkAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of SubnetworksScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#subnetworkAggregatedList for aggregated lists of subnetworks. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `SubnetworkList`

- Contains a list of Subnetwork resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Subnetwork> | A list of Subnetwork resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#subnetworkList for lists of subnetworks. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `SubnetworkLogConfig`

- The available logging options for this subnetwork.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationInterval` | string enum | Can only be specified if VPC flow logging for this subnetwork is enabled. Toggles the aggregation interval for collecting flow logs. Increasing the interval time will reduce the amount of generated flow logs for long lasting connections. Default is an interval of 5 seconds per connection. Values: `INTERVAL_10_MIN`, `INTERVAL_15_MIN`, `INTERVAL_1_MIN`, `INTERVAL_30_SEC`, `INTERVAL_5_MIN`, `INTERVAL_5_SEC`. |
| `enable` | boolean | Whether to enable flow logging for this subnetwork. If this field is not explicitly set, it will not appear in get listings. If not set the default behavior is determined by the org policy, if there is no org policy specified, then it will default to disabled. Flow logging isn't supported if the subnet purpose field is set to REGIONAL_MANAGED_PROXY. |
| `filterExpr` | string | Can only be specified if VPC flow logs for this subnetwork is enabled. The filter expression is used to define which VPC flow logs should be exported to Cloud Logging. |
| `flowSampling` | number (float) | Can only be specified if VPC flow logging for this subnetwork is enabled. The value of the field must be in \[0, 1\]. Set the sampling rate of VPC flow logs within the subnetwork where 1.0 means all collected logs are reported and 0.0 means no logs are reported. Default is 0.5 unless otherwise specified by the org policy, which means half of all collected logs are reported. |
| `metadata` | string enum | Can only be specified if VPC flow logs for this subnetwork is enabled. Configures whether all, none or a subset of metadata fields should be added to the reported VPC flow logs. Default isEXCLUDE_ALL_METADATA. Values: `CUSTOM_METADATA`, `EXCLUDE_ALL_METADATA`, `INCLUDE_ALL_METADATA`. |
| `metadataFields` | array<string> | Can only be specified if VPC flow logs for this subnetwork is enabled and "metadata" was set to CUSTOM_METADATA. |

### `SubnetworkParams`

- Additional subnetwork parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. |

### `SubnetworkSecondaryRange`

- Represents a secondary IP range of a subnetwork.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipCidrRange` | string | The range of IP addresses belonging to this subnetwork secondary range. Provide this property when you create the subnetwork. Ranges must be unique and non-overlapping with all primary and secondary IP ranges within a network. Both IPv4 and IPv6 ranges are supported. For IPv4, the range can be any range listed in theValid ranges list. For IPv6: The range must have a /64 prefix length. The range must be omitted, for auto-allocation from Google-defined ULA IPv6 range. For BYOGUA internal IPv6 secondary range, the range may be specified along with the `ipCollection` field. If an `ipCollection` is specified, the requested ip_cidr_range must lie within the range of the PDP referenced by the `ipCollection` field for allocation. If `ipCollection` field is specified, but ip_cidr_range is not, the range is auto-allocated from the PDP referenced by the `ipCollection` field. |
| `ipCollection` | string | Reference to a Public Delegated Prefix (PDP) for BYOIP. This field should be specified for configuring BYOGUA internal IPv6 secondary range. When specified along with the ip_cidr_range, the ip_cidr_range must lie within the PDP referenced by the `ipCollection` field. When specified without the ip_cidr_range, the range is auto-allocated from the PDP referenced by the `ipCollection` field. |
| `ipVersion` | string enum | — Values: `IPV4`, `IPV6`, `IP_VERSION_UNSPECIFIED`. |
| `rangeName` | string | The name associated with this subnetwork secondary range, used when adding an alias IP/IPv6 range to a VM instance. The name must be 1-63 characters long, and comply withRFC1035. The name must be unique within the subnetwork. |
| `reservedInternalRange` | string | The URL of the reserved internal range. Only IPv4 is supported. |

### `SubnetworkUtilizationDetails`

- The current IP utilization of all subnetwork ranges. Contains the total number of allocated and free IPs in each range.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `externalIpv6InstanceUtilization` | SubnetworkUtilizationDetailsIPV6Utilization | Utilizations of external IPV6 IP range. |
| `externalIpv6LbUtilization` | SubnetworkUtilizationDetailsIPV6Utilization | Utilizations of external IPV6 IP range for NetLB. |
| `internalIpv6Utilization` | SubnetworkUtilizationDetailsIPV6Utilization | Utilizations of internal IPV6 IP range. |
| `ipv4Utilizations` | array<SubnetworkUtilizationDetailsIPV4Utilization> | Utilizations of all IPV4 IP ranges. For primary ranges, the range name will be empty. |

### `SubnetworkUtilizationDetailsIPV4Utilization`

- The IPV4 utilization of a single IP range.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rangeName` | string | Will be set for secondary range. Empty for primary IPv4 range. |
| `totalAllocatedIp` | string (int64) | — |
| `totalFreeIp` | string (int64) | — |

### `SubnetworkUtilizationDetailsIPV6Utilization`

- The IPV6 utilization of a single IP range.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `totalAllocatedIp` | Uint128 | — |
| `totalFreeIp` | Uint128 | — |

### `SubnetworksExpandIpCidrRangeRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipCidrRange` | string | The IP (in CIDR format or netmask) of internal addresses that are legal on this Subnetwork. This range should be disjoint from other subnetworks within this network. This range can only be larger than (i.e. a superset of) the range previously defined before the update. |

### `SubnetworksScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `subnetworks` | array<Subnetwork> | A list of subnetworks contained in this scope. |
| `warning` | object | An informational warning that appears when the list of addresses is empty. |

### `SubnetworksScopedWarning`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scopeName` | string | Name of the scope containing this set of Subnetworks. |
| `warning` | object | An informational warning about unreachable scope |

### `SubnetworksSetPrivateIpGoogleAccessRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `privateIpGoogleAccess` | boolean | — |

### `Subsetting`

- Subsetting configuration for this BackendService. Currently this is applicable only for Internal TCP/UDP load balancing, Internal HTTP(S) load balancing and Traffic Director.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | string enum | — Values: `CONSISTENT_HASH_SUBSETTING`, `NONE`. |

### `Subsetting` (beta)

- Subsetting configuration for this BackendService. Currently this is applicable only for Internal TCP/UDP load balancing, Internal HTTP(S) load balancing and Traffic Director.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `policy` | string enum | — Values: `CONSISTENT_HASH_SUBSETTING`, `NONE`. |
| `subsetSize` | integer (int32) | The number of backends per backend group assigned to each proxy instance or each service mesh client. An input parameter to the `CONSISTENT_HASH_SUBSETTING` algorithm. Can only be set if `policy` is set to `CONSISTENT_HASH_SUBSETTING`. Can only be set if load balancing scheme is `INTERNAL_MANAGED` or `INTERNAL_SELF_MANAGED`. `subset_size` is optional for Internal HTTP(S) load balancing and required for Traffic Director. If you do not provide this value, Cloud Load Balancing will calculate it dynamically to optimize the number of proxies/clients visible to each backend and vice versa. Must be greater than 0. If `subset_size` is larger than the number of backends/endpoints, then subsetting is disabled. |

### `TCPHealthCheck`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `port` | integer (int32) | The TCP port number to which the health check prober sends packets. The default value is 80. Valid values are 1 through65535. |
| `portName` | string | Not supported. |
| `portSpecification` | string enum | Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports. Values: `USE_FIXED_PORT`, `USE_NAMED_PORT`, `USE_SERVING_PORT`. |
| `proxyHeader` | string enum | Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE. Values: `NONE`, `PROXY_V1`. |
| `request` | string | Instructs the health check prober to send this exact ASCII string, up to 1024 bytes in length, after establishing the TCP connection. |
| `response` | string | Creates a content-based TCP health check. In addition to establishing a TCP connection, you can configure the health check to pass only when the backend sends this exact response ASCII string, up to 1024 bytes in length. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-ssl-tcp |

### `Tags`

- A set of instance tags.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fingerprint` | string (byte) | Specifies a fingerprint for this request, which is essentially a hash of the tags' contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update tags. You must always provide an up-to-date fingerprint hash in order to update or change tags. To see the latest fingerprint, make get() request to the instance. |
| `items` | array<string> | An array of tags. Each tag must be 1-63 characters long, and comply with RFC1035. |

### `TargetGrpcProxy`

- Represents a Target gRPC Proxy resource. A target gRPC proxy is a component of load balancers intended for load balancing gRPC traffic. Only global forwarding rules with load balancing scheme INTERNAL_SELF_MANAGED can reference a target gRPC proxy. The target gRPC Proxy references a URL map that specifies how traffic is routed to gRPC backend services.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a TargetGrpcProxy. An up-to-date fingerprint must be provided in order to patch/update the TargetGrpcProxy; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the TargetGrpcProxy. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#targetGrpcProxy for target grpc proxies. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL with id for the resource. |
| `urlMap` | string | URL to the UrlMap resource that defines the mapping from URL to the BackendService. The protocol field in the BackendService must be set to GRPC. |
| `validateForProxyless` | boolean | If true, indicates that the BackendServices referenced by the urlMap may be accessed by gRPC applications without using a sidecar proxy. This will enable configuration checks on urlMap and its referenced BackendServices to not allow unsupported features. A gRPC application must use "xds:///" scheme in the target URI of the service it is connecting to. If false, indicates that the BackendServices referenced by the urlMap will be accessed by gRPC applications via a sidecar proxy. In this case, a gRPC application must not use "xds:///" scheme in the target URI of the service it is connecting to |

### `TargetGrpcProxyList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<TargetGrpcProxy> | A list of TargetGrpcProxy resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#targetGrpcProxy for target grpc proxies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetHttpProxiesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetHttpProxies` | array<TargetHttpProxy> | A list of TargetHttpProxies contained in this scope. |
| `warning` | object | Informational warning which replaces the list of backend services when the list is empty. |

### `TargetHttpProxy`

- Represents a Target HTTP Proxy resource. Google Compute Engine has two Target HTTP Proxy resources: \* Global \* Regional A target HTTP proxy is a component of Google Cloud HTTP load balancers. \* targetHttpProxies are used by global external Application Load Balancers, classic Application Load Balancers, cross-region internal Application Load Balancers, and Traffic Director. \* regionTargetHttpProxies are used by regional internal Application Load Balancers and regional external Application Load Balancers. Forwarding rules reference a target HTTP proxy, and the target proxy then references a URL map. For more information, readUsing Target Proxies and Forwarding rule concepts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a TargetHttpProxy. An up-to-date fingerprint must be provided in order to patch/update the TargetHttpProxy; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the TargetHttpProxy. |
| `httpKeepAliveTimeoutSec` | integer (int32) | Specifies how long to keep a connection open, after completing a response, while there is no matching traffic (in seconds). If an HTTP keep-alive is not specified, a default value (610 seconds) will be used. For global external Application Load Balancers, the minimum allowed value is 5 seconds and the maximum allowed value is 1200 seconds. For classic Application Load Balancers, this option is not supported. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#targetHttpProxy for target HTTP proxies. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `proxyBind` | boolean | This field only applies when the forwarding rule that references this target proxy has a loadBalancingScheme set toINTERNAL_SELF_MANAGED. When this field is set to true, Envoy proxies set up inbound traffic interception and bind to the IP address and port specified in the forwarding rule. This is generally useful when using Traffic Director to configure Envoy as a gateway or middle proxy (in other words, not a sidecar proxy). The Envoy proxy listens for inbound requests and handles requests when it receives them. The default is false. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional Target HTTP Proxy resides. This field is not applicable to global Target HTTP Proxies. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `urlMap` | string | URL to the UrlMap resource that defines the mapping from URL to the BackendService. |

### `TargetHttpProxy` (alpha)

- Represents a Target HTTP Proxy resource. Google Compute Engine has two Target HTTP Proxy resources: \* Global \* Regional A target HTTP proxy is a component of Google Cloud HTTP load balancers. \* targetHttpProxies are used by global external Application Load Balancers, classic Application Load Balancers, cross-region internal Application Load Balancers, and Traffic Director. \* regionTargetHttpProxies are used by regional internal Application Load Balancers and regional external Application Load Balancers. Forwarding rules reference a target HTTP proxy, and the target proxy then references a URL map. For more information, readUsing Target Proxies and Forwarding rule concepts.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a TargetHttpProxy. An up-to-date fingerprint must be provided in order to patch/update the TargetHttpProxy; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the TargetHttpProxy. |
| `httpFilters` | array<string> | URLs to networkservices.HttpFilter resources enabled for xDS clients using this configuration. For example,https://networkservices.googleapis.com/v1alpha1/projects/project/locations/locationhttpFilters/httpFilter Only filters that handle outbound connection and stream events may be specified. These filters work in conjunction with a default set of HTTP filters that may already be configured by Traffic Director. Traffic Director will determine the final location of these filters within xDS configuration based on the name of the HTTP filter. If Traffic Director positions multiple filters at the same location, those filters will be in the same order as specified in this list. httpFilters only applies for loadbalancers withloadBalancingScheme set to INTERNAL_SELF_MANAGED. See ForwardingRule for more details. |
| `httpKeepAliveTimeoutSec` | integer (int32) | Specifies how long to keep a connection open, after completing a response, while there is no matching traffic (in seconds). If an HTTP keep-alive is not specified, a default value (610 seconds) will be used. For global external Application Load Balancers, the minimum allowed value is 5 seconds and the maximum allowed value is 1200 seconds. For classic Application Load Balancers, this option is not supported. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#targetHttpProxy for target HTTP proxies. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `proxyBind` | boolean | This field only applies when the forwarding rule that references this target proxy has a loadBalancingScheme set toINTERNAL_SELF_MANAGED. When this field is set to true, Envoy proxies set up inbound traffic interception and bind to the IP address and port specified in the forwarding rule. This is generally useful when using Traffic Director to configure Envoy as a gateway or middle proxy (in other words, not a sidecar proxy). The Envoy proxy listens for inbound requests and handles requests when it receives them. The default is false. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional Target HTTP Proxy resides. This field is not applicable to global Target HTTP Proxies. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `urlMap` | string | URL to the UrlMap resource that defines the mapping from URL to the BackendService. |

### `TargetHttpProxy` (beta)

- Represents a Target HTTP Proxy resource. Google Compute Engine has two Target HTTP Proxy resources: \* Global \* Regional A target HTTP proxy is a component of Google Cloud HTTP load balancers. \* targetHttpProxies are used by global external Application Load Balancers, classic Application Load Balancers, cross-region internal Application Load Balancers, and Traffic Director. \* regionTargetHttpProxies are used by regional internal Application Load Balancers and regional external Application Load Balancers. Forwarding rules reference a target HTTP proxy, and the target proxy then references a URL map. For more information, readUsing Target Proxies and Forwarding rule concepts.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a TargetHttpProxy. An up-to-date fingerprint must be provided in order to patch/update the TargetHttpProxy; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the TargetHttpProxy. |
| `httpFilters` | array<string> | URLs to networkservices.HttpFilter resources enabled for xDS clients using this configuration. For example,https://networkservices.googleapis.com/v1alpha1/projects/project/locations/locationhttpFilters/httpFilter Only filters that handle outbound connection and stream events may be specified. These filters work in conjunction with a default set of HTTP filters that may already be configured by Traffic Director. Traffic Director will determine the final location of these filters within xDS configuration based on the name of the HTTP filter. If Traffic Director positions multiple filters at the same location, those filters will be in the same order as specified in this list. httpFilters only applies for loadbalancers withloadBalancingScheme set to INTERNAL_SELF_MANAGED. See ForwardingRule for more details. |
| `httpKeepAliveTimeoutSec` | integer (int32) | Specifies how long to keep a connection open, after completing a response, while there is no matching traffic (in seconds). If an HTTP keep-alive is not specified, a default value (610 seconds) will be used. For global external Application Load Balancers, the minimum allowed value is 5 seconds and the maximum allowed value is 1200 seconds. For classic Application Load Balancers, this option is not supported. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#targetHttpProxy for target HTTP proxies. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `proxyBind` | boolean | This field only applies when the forwarding rule that references this target proxy has a loadBalancingScheme set toINTERNAL_SELF_MANAGED. When this field is set to true, Envoy proxies set up inbound traffic interception and bind to the IP address and port specified in the forwarding rule. This is generally useful when using Traffic Director to configure Envoy as a gateway or middle proxy (in other words, not a sidecar proxy). The Envoy proxy listens for inbound requests and handles requests when it receives them. The default is false. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional Target HTTP Proxy resides. This field is not applicable to global Target HTTP Proxies. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `urlMap` | string | URL to the UrlMap resource that defines the mapping from URL to the BackendService. |

### `TargetHttpProxyAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of TargetHttpProxiesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#targetHttpProxyAggregatedList for lists of Target HTTP Proxies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |

### `TargetHttpProxyAggregatedList` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of TargetHttpProxiesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#targetHttpProxyAggregatedList for lists of Target HTTP Proxies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetHttpProxyList`

- A list of TargetHttpProxy resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<TargetHttpProxy> | A list of TargetHttpProxy resources. |
| `kind` | string | Output only. Type of resource. Always compute#targetHttpProxyList for lists of target HTTP proxies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetHttpsProxiesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetHttpsProxies` | array<TargetHttpsProxy> | A list of TargetHttpsProxies contained in this scope. |
| `warning` | object | Informational warning which replaces the list of backend services when the list is empty. |

### `TargetHttpsProxiesSetCertificateMapRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateMap` | string | URL of the Certificate Map to associate with this TargetHttpsProxy. Accepted format is//certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificateMaps/{resourceName}. |

### `TargetHttpsProxiesSetQuicOverrideRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `quicOverride` | string enum | QUIC policy for the TargetHttpsProxy resource. Values: `DISABLE`, `ENABLE`, `NONE`. |

### `TargetHttpsProxiesSetSslCertificatesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sslCertificates` | array<string> | New set of SslCertificate resources to associate with this TargetHttpsProxy resource. At least one SSL certificate must be specified. Currently, you may specify up to 15 SSL certificates. |

### `TargetHttpsProxy`

- Represents a Target HTTPS Proxy resource. Google Compute Engine has two Target HTTPS Proxy resources: \* Global \* Regional A target HTTPS proxy is a component of Google Cloud HTTPS load balancers. \* targetHttpsProxies are used by global external Application Load Balancers, classic Application Load Balancers, cross-region internal Application Load Balancers, and Traffic Director. \* regionTargetHttpsProxies are used by regional internal Application Load Balancers and regional external Application Load Balancers. Forwarding rules reference a target HTTPS proxy, and the target proxy then references a URL map. For more information, readUsing Target Proxies and Forwarding rule concepts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationPolicy` | string | Optional. A URL referring to a networksecurity.AuthorizationPolicy resource that describes how the proxy should authorize inbound traffic. If left blank, access will not be restricted by an authorization policy. Refer to the AuthorizationPolicy resource for additional details. authorizationPolicy only applies to a globalTargetHttpsProxy attached toglobalForwardingRules with theloadBalancingScheme set to INTERNAL_SELF_MANAGED. Note: This field currently has no impact. |
| `certificateMap` | string | URL of a certificate map that identifies a certificate map associated with the given target proxy. This field can only be set for Global external Application Load Balancer or Classic Application Load Balancer. For other products use Certificate Manager Certificates instead. If set, sslCertificates will be ignored. Accepted format is//certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificateMaps/{resourceName}. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a TargetHttpsProxy. An up-to-date fingerprint must be provided in order to patch the TargetHttpsProxy; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the TargetHttpsProxy. |
| `httpKeepAliveTimeoutSec` | integer (int32) | Specifies how long to keep a connection open, after completing a response, while there is no matching traffic (in seconds). If an HTTP keep-alive is not specified, a default value (610 seconds) will be used. For global external Application Load Balancers, the minimum allowed value is 5 seconds and the maximum allowed value is 1200 seconds. For classic Application Load Balancers, this option is not supported. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#targetHttpsProxy for target HTTPS proxies. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `proxyBind` | boolean | This field only applies when the forwarding rule that references this target proxy has a loadBalancingScheme set toINTERNAL_SELF_MANAGED. When this field is set to true, Envoy proxies set up inbound traffic interception and bind to the IP address and port specified in the forwarding rule. This is generally useful when using Traffic Director to configure Envoy as a gateway or middle proxy (in other words, not a sidecar proxy). The Envoy proxy listens for inbound requests and handles requests when it receives them. The default is false. |
| `quicOverride` | string enum | Specifies the QUIC override policy for this TargetHttpsProxy resource. This setting determines whether the load balancer attempts to negotiate QUIC with clients. You can specify NONE, ENABLE, orDISABLE. - When quic-override is set to NONE, Google manages whether QUIC is used. - When quic-override is set to ENABLE, the load balancer uses QUIC when possible. - When quic-override is set to DISABLE, the load balancer doesn't use QUIC. - If the quic-override flag is not specified,NONE is implied. Values: `DISABLE`, `ENABLE`, `NONE`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional TargetHttpsProxy resides. This field is not applicable to global TargetHttpsProxies. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `serverTlsPolicy` | string | Optional. A URL referring to a networksecurity.ServerTlsPolicy resource that describes how the proxy should authenticate inbound traffic. serverTlsPolicy only applies to a globalTargetHttpsProxy attached toglobalForwardingRules with theloadBalancingScheme set to INTERNAL_SELF_MANAGED or EXTERNAL orEXTERNAL_MANAGED or INTERNAL_MANAGED. It also applies to a regional TargetHttpsProxy attached to regional forwardingRules with theloadBalancingScheme set to EXTERNAL_MANAGED orINTERNAL_MANAGED. For details whichServerTlsPolicy resources are accepted withINTERNAL_SELF_MANAGED and which with EXTERNAL,INTERNAL_MANAGED, EXTERNAL_MANAGEDloadBalancingScheme consult ServerTlsPolicy documentation. If left blank, communications are not encrypted. |
| `sslCertificates` | array<string> | URLs to SslCertificate resources that are used to authenticate connections between users and the load balancer. At least one SSL certificate must be specified. SslCertificates do not apply when the load balancing scheme is set to INTERNAL_SELF_MANAGED. The URLs should refer to a SSL Certificate resource or Certificate Manager Certificate resource. Mixing Classic Certificates and Certificate Manager Certificates is not allowed. Certificate Manager Certificates must include the certificatemanager API namespace. Using Certificate Manager Certificates in this field is not supported by Global external Application Load Balancer or Classic Application Load Balancer, use certificate_map instead. Currently, you may specify up to 15 Classic SSL Certificates or up to 100 Certificate Manager Certificates. Certificate Manager Certificates accepted formats are: - //certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificates/{resourceName}. - https://certificatemanager.{universeDomain}/v1alpha1/projects/{project}/locations/{location}/certificates/{resourceName}. |
| `sslPolicy` | string | URL of SslPolicy resource that will be associated with the TargetHttpsProxy resource. If not set, the TargetHttpsProxy resource has no SSL policy configured. |
| `tlsEarlyData` | string enum | Specifies whether TLS 1.3 0-RTT Data ("Early Data") should be accepted for this service. Early Data allows a TLS resumption handshake to include the initial application payload (a HTTP request) alongside the handshake, reducing the effective round trips to "zero". This applies to TLS 1.3 connections over TCP (HTTP/2) as well as over UDP (QUIC/h3). This can improve application performance, especially on networks where interruptions may be common, such as on mobile. Requests with Early Data will have the "Early-Data" HTTP header set on the request, with a value of "1", to allow the backend to determine whether Early Data was included. Note: TLS Early Data may allow requests to be replayed, as the data is sent to the backend before the handshake has fully completed. Applications that allow idempotent HTTP methods to make non-idempotent changes, such as a GET request updating a database, should not accept Early Data on those requests, and reject requests with the "Early-Data: 1" HTTP header by returning a HTTP 425 (Too Early) status code, in order to remain RFC compliant. The default value is DISABLED. Values: `DISABLED`, `PERMISSIVE`, `STRICT`, `UNRESTRICTED`. |
| `urlMap` | string | A fully-qualified or valid partial URL to the UrlMap resource that defines the mapping from URL to the BackendService. For example, the following are all valid URLs for specifying a URL map: - https://www.googleapis.compute/v1/projects/project/global/urlMaps/url-map - projects/project/global/urlMaps/url-map - global/urlMaps/url-map |

### `TargetHttpsProxy` (alpha)

- Represents a Target HTTPS Proxy resource. Google Compute Engine has two Target HTTPS Proxy resources: \* Global \* Regional A target HTTPS proxy is a component of Google Cloud HTTPS load balancers. \* targetHttpsProxies are used by global external Application Load Balancers, classic Application Load Balancers, cross-region internal Application Load Balancers, and Traffic Director. \* regionTargetHttpsProxies are used by regional internal Application Load Balancers and regional external Application Load Balancers. Forwarding rules reference a target HTTPS proxy, and the target proxy then references a URL map. For more information, readUsing Target Proxies and Forwarding rule concepts.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `authentication` | string | \[Deprecated\] Use serverTlsPolicy instead. |
| `authorization` | string | \[Deprecated\] Use authorizationPolicy instead. |
| `authorizationPolicy` | string | Optional. A URL referring to a networksecurity.AuthorizationPolicy resource that describes how the proxy should authorize inbound traffic. If left blank, access will not be restricted by an authorization policy. Refer to the AuthorizationPolicy resource for additional details. authorizationPolicy only applies to a globalTargetHttpsProxy attached toglobalForwardingRules with theloadBalancingScheme set to INTERNAL_SELF_MANAGED. Note: This field currently has no impact. |
| `certificateMap` | string | URL of a certificate map that identifies a certificate map associated with the given target proxy. This field can only be set for Global external Application Load Balancer or Classic Application Load Balancer. For other products use Certificate Manager Certificates instead. If set, sslCertificates will be ignored. Accepted format is//certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificateMaps/{resourceName}. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a TargetHttpsProxy. An up-to-date fingerprint must be provided in order to patch the TargetHttpsProxy; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the TargetHttpsProxy. |
| `httpFilters` | array<string> | URLs to networkservices.HttpFilter resources enabled for xDS clients using this configuration. For example,https://networkservices.googleapis.com/beta/projects/project/locations/location/httpFilters/httpFilter Only filters that handle outbound connection and stream events may be specified. These filters work in conjunction with a default set of HTTP filters that may already be configured by Traffic Director. Traffic Director will determine the final location of these filters within xDS configuration based on the name of the HTTP filter. If Traffic Director positions multiple filters at the same location, those filters will be in the same order as specified in this list. httpFilters only applies for loadbalancers withloadBalancingScheme set to INTERNAL_SELF_MANAGED. See ForwardingRule for more details. |
| `httpKeepAliveTimeoutSec` | integer (int32) | Specifies how long to keep a connection open, after completing a response, while there is no matching traffic (in seconds). If an HTTP keep-alive is not specified, a default value (610 seconds) will be used. For global external Application Load Balancers, the minimum allowed value is 5 seconds and the maximum allowed value is 1200 seconds. For classic Application Load Balancers, this option is not supported. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#targetHttpsProxy for target HTTPS proxies. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `proxyBind` | boolean | This field only applies when the forwarding rule that references this target proxy has a loadBalancingScheme set toINTERNAL_SELF_MANAGED. When this field is set to true, Envoy proxies set up inbound traffic interception and bind to the IP address and port specified in the forwarding rule. This is generally useful when using Traffic Director to configure Envoy as a gateway or middle proxy (in other words, not a sidecar proxy). The Envoy proxy listens for inbound requests and handles requests when it receives them. The default is false. |
| `quicOverride` | string enum | Specifies the QUIC override policy for this TargetHttpsProxy resource. This setting determines whether the load balancer attempts to negotiate QUIC with clients. You can specify NONE, ENABLE, orDISABLE. - When quic-override is set to NONE, Google manages whether QUIC is used. - When quic-override is set to ENABLE, the load balancer uses QUIC when possible. - When quic-override is set to DISABLE, the load balancer doesn't use QUIC. - If the quic-override flag is not specified,NONE is implied. Values: `DISABLE`, `ENABLE`, `NONE`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional TargetHttpsProxy resides. This field is not applicable to global TargetHttpsProxies. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `serverTlsPolicy` | string | Optional. A URL referring to a networksecurity.ServerTlsPolicy resource that describes how the proxy should authenticate inbound traffic. serverTlsPolicy only applies to a globalTargetHttpsProxy attached toglobalForwardingRules with theloadBalancingScheme set to INTERNAL_SELF_MANAGED or EXTERNAL orEXTERNAL_MANAGED or INTERNAL_MANAGED. It also applies to a regional TargetHttpsProxy attached to regional forwardingRules with theloadBalancingScheme set to EXTERNAL_MANAGED orINTERNAL_MANAGED. For details whichServerTlsPolicy resources are accepted withINTERNAL_SELF_MANAGED and which with EXTERNAL,INTERNAL_MANAGED, EXTERNAL_MANAGEDloadBalancingScheme consult ServerTlsPolicy documentation. If left blank, communications are not encrypted. |
| `sslCertificates` | array<string> | URLs to SslCertificate resources that are used to authenticate connections between users and the load balancer. At least one SSL certificate must be specified. SslCertificates do not apply when the load balancing scheme is set to INTERNAL_SELF_MANAGED. The URLs should refer to a SSL Certificate resource or Certificate Manager Certificate resource. Mixing Classic Certificates and Certificate Manager Certificates is not allowed. Certificate Manager Certificates must include the certificatemanager API namespace. Using Certificate Manager Certificates in this field is not supported by Global external Application Load Balancer or Classic Application Load Balancer, use certificate_map instead. Currently, you may specify up to 15 Classic SSL Certificates or up to 100 Certificate Manager Certificates. Certificate Manager Certificates accepted formats are: - //certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificates/{resourceName}. - https://certificatemanager.{universeDomain}/v1alpha1/projects/{project}/locations/{location}/certificates/{resourceName}. |
| `sslPolicy` | string | URL of SslPolicy resource that will be associated with the TargetHttpsProxy resource. If not set, the TargetHttpsProxy resource has no SSL policy configured. |
| `tlsEarlyData` | string enum | Specifies whether TLS 1.3 0-RTT Data ("Early Data") should be accepted for this service. Early Data allows a TLS resumption handshake to include the initial application payload (a HTTP request) alongside the handshake, reducing the effective round trips to "zero". This applies to TLS 1.3 connections over TCP (HTTP/2) as well as over UDP (QUIC/h3). This can improve application performance, especially on networks where interruptions may be common, such as on mobile. Requests with Early Data will have the "Early-Data" HTTP header set on the request, with a value of "1", to allow the backend to determine whether Early Data was included. Note: TLS Early Data may allow requests to be replayed, as the data is sent to the backend before the handshake has fully completed. Applications that allow idempotent HTTP methods to make non-idempotent changes, such as a GET request updating a database, should not accept Early Data on those requests, and reject requests with the "Early-Data: 1" HTTP header by returning a HTTP 425 (Too Early) status code, in order to remain RFC compliant. The default value is DISABLED. Values: `DISABLED`, `PERMISSIVE`, `STRICT`, `UNRESTRICTED`. |
| `urlMap` | string | A fully-qualified or valid partial URL to the UrlMap resource that defines the mapping from URL to the BackendService. For example, the following are all valid URLs for specifying a URL map: - https://www.googleapis.compute/v1/projects/project/global/urlMaps/url-map - projects/project/global/urlMaps/url-map - global/urlMaps/url-map |

### `TargetHttpsProxy` (beta)

- Represents a Target HTTPS Proxy resource. Google Compute Engine has two Target HTTPS Proxy resources: \* Global \* Regional A target HTTPS proxy is a component of Google Cloud HTTPS load balancers. \* targetHttpsProxies are used by global external Application Load Balancers, classic Application Load Balancers, cross-region internal Application Load Balancers, and Traffic Director. \* regionTargetHttpsProxies are used by regional internal Application Load Balancers and regional external Application Load Balancers. Forwarding rules reference a target HTTPS proxy, and the target proxy then references a URL map. For more information, readUsing Target Proxies and Forwarding rule concepts.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `authentication` | string | \[Deprecated\] Use serverTlsPolicy instead. |
| `authorization` | string | \[Deprecated\] Use authorizationPolicy instead. |
| `authorizationPolicy` | string | Optional. A URL referring to a networksecurity.AuthorizationPolicy resource that describes how the proxy should authorize inbound traffic. If left blank, access will not be restricted by an authorization policy. Refer to the AuthorizationPolicy resource for additional details. authorizationPolicy only applies to a globalTargetHttpsProxy attached toglobalForwardingRules with theloadBalancingScheme set to INTERNAL_SELF_MANAGED. Note: This field currently has no impact. |
| `certificateMap` | string | URL of a certificate map that identifies a certificate map associated with the given target proxy. This field can only be set for Global external Application Load Balancer or Classic Application Load Balancer. For other products use Certificate Manager Certificates instead. If set, sslCertificates will be ignored. Accepted format is//certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificateMaps/{resourceName}. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a TargetHttpsProxy. An up-to-date fingerprint must be provided in order to patch the TargetHttpsProxy; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the TargetHttpsProxy. |
| `httpFilters` | array<string> | URLs to networkservices.HttpFilter resources enabled for xDS clients using this configuration. For example,https://networkservices.googleapis.com/beta/projects/project/locations/location/httpFilters/httpFilter Only filters that handle outbound connection and stream events may be specified. These filters work in conjunction with a default set of HTTP filters that may already be configured by Traffic Director. Traffic Director will determine the final location of these filters within xDS configuration based on the name of the HTTP filter. If Traffic Director positions multiple filters at the same location, those filters will be in the same order as specified in this list. httpFilters only applies for loadbalancers withloadBalancingScheme set to INTERNAL_SELF_MANAGED. See ForwardingRule for more details. |
| `httpKeepAliveTimeoutSec` | integer (int32) | Specifies how long to keep a connection open, after completing a response, while there is no matching traffic (in seconds). If an HTTP keep-alive is not specified, a default value (610 seconds) will be used. For global external Application Load Balancers, the minimum allowed value is 5 seconds and the maximum allowed value is 1200 seconds. For classic Application Load Balancers, this option is not supported. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#targetHttpsProxy for target HTTPS proxies. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `proxyBind` | boolean | This field only applies when the forwarding rule that references this target proxy has a loadBalancingScheme set toINTERNAL_SELF_MANAGED. When this field is set to true, Envoy proxies set up inbound traffic interception and bind to the IP address and port specified in the forwarding rule. This is generally useful when using Traffic Director to configure Envoy as a gateway or middle proxy (in other words, not a sidecar proxy). The Envoy proxy listens for inbound requests and handles requests when it receives them. The default is false. |
| `quicOverride` | string enum | Specifies the QUIC override policy for this TargetHttpsProxy resource. This setting determines whether the load balancer attempts to negotiate QUIC with clients. You can specify NONE, ENABLE, orDISABLE. - When quic-override is set to NONE, Google manages whether QUIC is used. - When quic-override is set to ENABLE, the load balancer uses QUIC when possible. - When quic-override is set to DISABLE, the load balancer doesn't use QUIC. - If the quic-override flag is not specified,NONE is implied. Values: `DISABLE`, `ENABLE`, `NONE`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional TargetHttpsProxy resides. This field is not applicable to global TargetHttpsProxies. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `serverTlsPolicy` | string | Optional. A URL referring to a networksecurity.ServerTlsPolicy resource that describes how the proxy should authenticate inbound traffic. serverTlsPolicy only applies to a globalTargetHttpsProxy attached toglobalForwardingRules with theloadBalancingScheme set to INTERNAL_SELF_MANAGED or EXTERNAL orEXTERNAL_MANAGED or INTERNAL_MANAGED. It also applies to a regional TargetHttpsProxy attached to regional forwardingRules with theloadBalancingScheme set to EXTERNAL_MANAGED orINTERNAL_MANAGED. For details whichServerTlsPolicy resources are accepted withINTERNAL_SELF_MANAGED and which with EXTERNAL,INTERNAL_MANAGED, EXTERNAL_MANAGEDloadBalancingScheme consult ServerTlsPolicy documentation. If left blank, communications are not encrypted. |
| `sslCertificates` | array<string> | URLs to SslCertificate resources that are used to authenticate connections between users and the load balancer. At least one SSL certificate must be specified. SslCertificates do not apply when the load balancing scheme is set to INTERNAL_SELF_MANAGED. The URLs should refer to a SSL Certificate resource or Certificate Manager Certificate resource. Mixing Classic Certificates and Certificate Manager Certificates is not allowed. Certificate Manager Certificates must include the certificatemanager API namespace. Using Certificate Manager Certificates in this field is not supported by Global external Application Load Balancer or Classic Application Load Balancer, use certificate_map instead. Currently, you may specify up to 15 Classic SSL Certificates or up to 100 Certificate Manager Certificates. Certificate Manager Certificates accepted formats are: - //certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificates/{resourceName}. - https://certificatemanager.{universeDomain}/v1alpha1/projects/{project}/locations/{location}/certificates/{resourceName}. |
| `sslPolicy` | string | URL of SslPolicy resource that will be associated with the TargetHttpsProxy resource. If not set, the TargetHttpsProxy resource has no SSL policy configured. |
| `tlsEarlyData` | string enum | Specifies whether TLS 1.3 0-RTT Data ("Early Data") should be accepted for this service. Early Data allows a TLS resumption handshake to include the initial application payload (a HTTP request) alongside the handshake, reducing the effective round trips to "zero". This applies to TLS 1.3 connections over TCP (HTTP/2) as well as over UDP (QUIC/h3). This can improve application performance, especially on networks where interruptions may be common, such as on mobile. Requests with Early Data will have the "Early-Data" HTTP header set on the request, with a value of "1", to allow the backend to determine whether Early Data was included. Note: TLS Early Data may allow requests to be replayed, as the data is sent to the backend before the handshake has fully completed. Applications that allow idempotent HTTP methods to make non-idempotent changes, such as a GET request updating a database, should not accept Early Data on those requests, and reject requests with the "Early-Data: 1" HTTP header by returning a HTTP 425 (Too Early) status code, in order to remain RFC compliant. The default value is DISABLED. Values: `DISABLED`, `PERMISSIVE`, `STRICT`, `UNRESTRICTED`. |
| `urlMap` | string | A fully-qualified or valid partial URL to the UrlMap resource that defines the mapping from URL to the BackendService. For example, the following are all valid URLs for specifying a URL map: - https://www.googleapis.compute/v1/projects/project/global/urlMaps/url-map - projects/project/global/urlMaps/url-map - global/urlMaps/url-map |

### `TargetHttpsProxyAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of TargetHttpsProxiesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#targetHttpsProxyAggregatedList for lists of Target HTTP Proxies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetHttpsProxyList`

- Contains a list of TargetHttpsProxy resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<TargetHttpsProxy> | A list of TargetHttpsProxy resources. |
| `kind` | string | Output only. Type of resource. Always compute#targetHttpsProxyList for lists of target HTTPS proxies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetInstance`

- Represents a Target Instance resource. You can use a target instance to handle traffic for one or more forwarding rules, which is ideal for forwarding protocol traffic that is managed by a single source. For example, ESP, AH, TCP, or UDP. For more information, readTarget instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instance` | string | A URL to the virtual machine instance that handles traffic for this target instance. When creating a target instance, you can provide the fully-qualified URL or a valid partial URL to the desired virtual machine. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance - projects/project/zones/zone/instances/instance - zones/zone/instances/instance |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#targetInstance for target instances. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `natPolicy` | string enum | Must have a value of NO_NAT. Protocol forwarding delivers packets while preserving the destination IP address of the forwarding rule referencing the target instance. Values: `NO_NAT`. |
| `network` | string | The URL of the network this target instance uses to forward traffic. If not specified, the traffic will be forwarded to the network that the default network interface belongs to. |
| `securityPolicy` | string | \[Output Only\] The resource URL for the security policy associated with this target instance. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the target instance resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `TargetInstance` (alpha)

- Represents a Target Instance resource. You can use a target instance to handle traffic for one or more forwarding rules, which is ideal for forwarding protocol traffic that is managed by a single source. For example, ESP, AH, TCP, or UDP. For more information, readTarget instances.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instance` | string | A URL to the virtual machine instance that handles traffic for this target instance. When creating a target instance, you can provide the fully-qualified URL or a valid partial URL to the desired virtual machine. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance - projects/project/zones/zone/instances/instance - zones/zone/instances/instance |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#targetInstance for target instances. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `natPolicy` | string enum | Must have a value of NO_NAT. Protocol forwarding delivers packets while preserving the destination IP address of the forwarding rule referencing the target instance. Values: `NO_NAT`. |
| `network` | string | The URL of the network this target instance uses to forward traffic. If not specified, the traffic will be forwarded to the network that the default network interface belongs to. |
| `securityPolicy` | string | \[Output Only\] The resource URL for the security policy associated with this target instance. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the target instance resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `TargetInstance` (preview)

- Represents a Target Instance resource. You can use a target instance to handle traffic for one or more forwarding rules, which is ideal for forwarding protocol traffic that is managed by a single source. For example, ESP, AH, TCP, or UDP. For more information, readTarget instances.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instance` | string | A URL to the virtual machine instance that handles traffic for this target instance. When creating a target instance, you can provide the fully-qualified URL or a valid partial URL to the desired virtual machine. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance - projects/project/zones/zone/instances/instance - zones/zone/instances/instance |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#targetInstance for target instances. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `natPolicy` | string enum | Must have a value of NO_NAT. Protocol forwarding delivers packets while preserving the destination IP address of the forwarding rule referencing the target instance. Values: `NO_NAT`. |
| `network` | string | The URL of the network this target instance uses to forward traffic. If not specified, the traffic will be forwarded to the network that the default network interface belongs to. |
| `params` | TargetInstanceParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `securityPolicy` | string | \[Output Only\] The resource URL for the security policy associated with this target instance. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the target instance resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `TargetInstanceAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of TargetInstance resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetInstanceList`

- Contains a list of TargetInstance resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<TargetInstance> | A list of TargetInstance resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetInstanceParams`

- Additional target instance parameters.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format are not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. \* Inconsistent format is not supported. For instance: {"tagKeys/333" : "tagValues/444", "123/env" : "prod"} is invalid. |

### `TargetInstancesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetInstances` | array<TargetInstance> | A list of target instances contained in this scope. |
| `warning` | object | Informational warning which replaces the list of addresses when the list is empty. |

### `TargetPool`

- Represents a Target Pool resource. Target pools are used with external passthrough Network Load Balancers. A target pool references member instances, an associated legacy HttpHealthCheck resource, and, optionally, a backup target pool. For more information, readUsing target pools.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupPool` | string | The server-defined URL for the resource. This field is applicable only when the containing target pool is serving a forwarding rule as the primary pool, and its failoverRatio field is properly set to a value between \[0, 1\]. backupPool and failoverRatio together define the fallback behavior of the primary target pool: if the ratio of the healthy instances in the primary pool is at or belowfailoverRatio, traffic arriving at the load-balanced IP will be directed to the backup pool. In case where failoverRatio and backupPool are not set, or all the instances in the backup pool are unhealthy, the traffic will be directed back to the primary pool in the "force" mode, where traffic will be spread to the healthy instances with the best effort, or to all instances when no instance is healthy. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `failoverRatio` | number (float) | This field is applicable only when the containing target pool is serving a forwarding rule as the primary pool (i.e., not as a backup pool to some other target pool). The value of the field must be in \[0, 1\]. If set, backupPool must also be set. They together define the fallback behavior of the primary target pool: if the ratio of the healthy instances in the primary pool is at or below this number, traffic arriving at the load-balanced IP will be directed to the backup pool. In case where failoverRatio is not set or all the instances in the backup pool are unhealthy, the traffic will be directed back to the primary pool in the "force" mode, where traffic will be spread to the healthy instances with the best effort, or to all instances when no instance is healthy. |
| `healthChecks` | array<string> | The URL of the HttpHealthCheck resource. A member instance in this pool is considered healthy if and only if the health checks pass. Only legacy HttpHealthChecks are supported. Only one health check may be specified. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instances` | array<string> | A list of resource URLs to the virtual machine instances serving this pool. They must live in zones contained in the same region as this pool. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#targetPool for target pools. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `region` | string | Output only. \[Output Only\] URL of the region where the target pool resides. |
| `securityPolicy` | string | \[Output Only\] The resource URL for the security policy associated with this target pool. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `sessionAffinity` | string enum | Session affinity option, must be one of the following values: NONE: Connections from the same client IP may go to any instance in the pool. CLIENT_IP: Connections from the same client IP will go to the same instance in the pool while that instance remains healthy. CLIENT_IP_PROTO: Connections from the same client IP with the same IP protocol will go to the same instance in the pool while that instance remains healthy. Values: `CLIENT_IP`, `CLIENT_IP_NO_DESTINATION`, `CLIENT_IP_PORT_PROTO`, `CLIENT_IP_PROTO`, `GENERATED_COOKIE`, `HEADER_FIELD`, `HTTP_COOKIE`, `NONE`, `STRONG_COOKIE_AFFINITY`. |

### `TargetPool` (alpha)

- Represents a Target Pool resource. Target pools are used with external passthrough Network Load Balancers. A target pool references member instances, an associated legacy HttpHealthCheck resource, and, optionally, a backup target pool. For more information, readUsing target pools.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `backupPool` | string | The server-defined URL for the resource. This field is applicable only when the containing target pool is serving a forwarding rule as the primary pool, and its failoverRatio field is properly set to a value between \[0, 1\]. backupPool and failoverRatio together define the fallback behavior of the primary target pool: if the ratio of the healthy instances in the primary pool is at or belowfailoverRatio, traffic arriving at the load-balanced IP will be directed to the backup pool. In case where failoverRatio and backupPool are not set, or all the instances in the backup pool are unhealthy, the traffic will be directed back to the primary pool in the "force" mode, where traffic will be spread to the healthy instances with the best effort, or to all instances when no instance is healthy. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `failoverRatio` | number (float) | This field is applicable only when the containing target pool is serving a forwarding rule as the primary pool (i.e., not as a backup pool to some other target pool). The value of the field must be in \[0, 1\]. If set, backupPool must also be set. They together define the fallback behavior of the primary target pool: if the ratio of the healthy instances in the primary pool is at or below this number, traffic arriving at the load-balanced IP will be directed to the backup pool. In case where failoverRatio is not set or all the instances in the backup pool are unhealthy, the traffic will be directed back to the primary pool in the "force" mode, where traffic will be spread to the healthy instances with the best effort, or to all instances when no instance is healthy. |
| `healthChecks` | array<string> | The URL of the HttpHealthCheck resource. A member instance in this pool is considered healthy if and only if the health checks pass. Only legacy HttpHealthChecks are supported. Only one health check may be specified. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instances` | array<string> | A list of resource URLs to the virtual machine instances serving this pool. They must live in zones contained in the same region as this pool. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#targetPool for target pools. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `region` | string | Output only. \[Output Only\] URL of the region where the target pool resides. |
| `securityPolicy` | string | \[Output Only\] The resource URL for the security policy associated with this target pool. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `sessionAffinity` | string enum | Session affinity option, must be one of the following values: NONE: Connections from the same client IP may go to any instance in the pool. CLIENT_IP: Connections from the same client IP will go to the same instance in the pool while that instance remains healthy. CLIENT_IP_PROTO: Connections from the same client IP with the same IP protocol will go to the same instance in the pool while that instance remains healthy. Values: `CLIENT_IP`, `CLIENT_IP_NO_DESTINATION`, `CLIENT_IP_PORT_PROTO`, `CLIENT_IP_PROTO`, `GENERATED_COOKIE`, `HEADER_FIELD`, `HTTP_COOKIE`, `NONE`, `STRONG_COOKIE_AFFINITY`. |

### `TargetPool` (preview)

- Represents a Target Pool resource. Target pools are used with external passthrough Network Load Balancers. A target pool references member instances, an associated legacy HttpHealthCheck resource, and, optionally, a backup target pool. For more information, readUsing target pools.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `backupPool` | string | The server-defined URL for the resource. This field is applicable only when the containing target pool is serving a forwarding rule as the primary pool, and its failoverRatio field is properly set to a value between \[0, 1\]. backupPool and failoverRatio together define the fallback behavior of the primary target pool: if the ratio of the healthy instances in the primary pool is at or belowfailoverRatio, traffic arriving at the load-balanced IP will be directed to the backup pool. In case where failoverRatio and backupPool are not set, or all the instances in the backup pool are unhealthy, the traffic will be directed back to the primary pool in the "force" mode, where traffic will be spread to the healthy instances with the best effort, or to all instances when no instance is healthy. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `failoverRatio` | number (float) | This field is applicable only when the containing target pool is serving a forwarding rule as the primary pool (i.e., not as a backup pool to some other target pool). The value of the field must be in \[0, 1\]. If set, backupPool must also be set. They together define the fallback behavior of the primary target pool: if the ratio of the healthy instances in the primary pool is at or below this number, traffic arriving at the load-balanced IP will be directed to the backup pool. In case where failoverRatio is not set or all the instances in the backup pool are unhealthy, the traffic will be directed back to the primary pool in the "force" mode, where traffic will be spread to the healthy instances with the best effort, or to all instances when no instance is healthy. |
| `healthChecks` | array<string> | The URL of the HttpHealthCheck resource. A member instance in this pool is considered healthy if and only if the health checks pass. Only legacy HttpHealthChecks are supported. Only one health check may be specified. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instances` | array<string> | A list of resource URLs to the virtual machine instances serving this pool. They must live in zones contained in the same region as this pool. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#targetPool for target pools. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | TargetPoolParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | Output only. \[Output Only\] URL of the region where the target pool resides. |
| `securityPolicy` | string | \[Output Only\] The resource URL for the security policy associated with this target pool. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `sessionAffinity` | string enum | Session affinity option, must be one of the following values: NONE: Connections from the same client IP may go to any instance in the pool. CLIENT_IP: Connections from the same client IP will go to the same instance in the pool while that instance remains healthy. CLIENT_IP_PROTO: Connections from the same client IP with the same IP protocol will go to the same instance in the pool while that instance remains healthy. Values: `CLIENT_IP`, `CLIENT_IP_NO_DESTINATION`, `CLIENT_IP_PORT_PROTO`, `CLIENT_IP_PROTO`, `GENERATED_COOKIE`, `HEADER_FIELD`, `HTTP_COOKIE`, `NONE`, `STRONG_COOKIE_AFFINITY`. |

### `TargetPoolAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of TargetPool resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#targetPoolAggregatedList for aggregated lists of target pools. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetPoolInstanceHealth`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthStatus` | array<HealthStatus> | — |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#targetPoolInstanceHealth when checking the health of an instance. |

### `TargetPoolList`

- Contains a list of TargetPool resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<TargetPool> | A list of TargetPool resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#targetPoolList for lists of target pools. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetPoolParams`

- Additional target pool parameters.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format are not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. \* Inconsistent format is not supported. For instance: {"tagKeys/333" : "tagValues/444", "123/env" : "prod"} is invalid. |

### `TargetPoolsAddHealthCheckRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthChecks` | array<HealthCheckReference> | The HttpHealthCheck to add to the target pool. |

### `TargetPoolsAddInstanceRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<InstanceReference> | A full or partial URL to an instance to add to this target pool. This can be a full or partial URL. For example, the following are valid URLs: - https://www.googleapis.com/compute/v1/projects/project-id/zones/zone/instances/instance-name - projects/project-id/zones/zone/instances/instance-name - zones/zone/instances/instance-name |

### `TargetPoolsRemoveHealthCheckRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthChecks` | array<HealthCheckReference> | Health check URL to be removed. This can be a full or valid partial URL. For example, the following are valid URLs: - https://www.googleapis.com/compute/beta/projects/project/global/httpHealthChecks/health-check - projects/project/global/httpHealthChecks/health-check - global/httpHealthChecks/health-check |

### `TargetPoolsRemoveInstanceRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<InstanceReference> | URLs of the instances to be removed from target pool. |

### `TargetPoolsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetPools` | array<TargetPool> | A list of target pools contained in this scope. |
| `warning` | object | Informational warning which replaces the list of addresses when the list is empty. |

### `TargetReference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `target` | string | — |

### `TargetSslProxiesSetBackendServiceRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `service` | string | The URL of the new BackendService resource for the targetSslProxy. |

### `TargetSslProxiesSetCertificateMapRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateMap` | string | URL of the Certificate Map to associate with this TargetSslProxy. Accepted format is//certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificateMaps/{resourceName}. |

### `TargetSslProxiesSetProxyHeaderRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `proxyHeader` | string enum | The new type of proxy header to append before sending data to the backend. NONE or PROXY_V1 are allowed. Values: `NONE`, `PROXY_V1`. |

### `TargetSslProxiesSetSslCertificatesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sslCertificates` | array<string> | New set of URLs to SslCertificate resources to associate with this TargetSslProxy. At least one SSL certificate must be specified. Currently, you may specify up to 15 SSL certificates. |

### `TargetSslProxy`

- Represents a Target SSL Proxy resource. A target SSL proxy is a component of a Proxy Network Load Balancer. The forwarding rule references the target SSL proxy, and the target proxy then references a backend service. For more information, readProxy Network Load Balancer overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateMap` | string | URL of a certificate map that identifies a certificate map associated with the given target proxy. This field can only be set for global target proxies. If set, sslCertificates will be ignored. Accepted format is//certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificateMaps/{resourceName}. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#targetSslProxy for target SSL proxies. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `proxyHeader` | string enum | Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE. Values: `NONE`, `PROXY_V1`. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `service` | string | URL to the BackendService resource. |
| `sslCertificates` | array<string> | URLs to SslCertificate resources that are used to authenticate connections to Backends. At least one SSL certificate must be specified. Currently, you may specify up to 15 SSL certificates. sslCertificates do not apply when the load balancing scheme is set to INTERNAL_SELF_MANAGED. |
| `sslPolicy` | string | URL of SslPolicy resource that will be associated with the TargetSslProxy resource. If not set, the TargetSslProxy resource will not have any SSL policy configured. |

### `TargetSslProxyList`

- Contains a list of TargetSslProxy resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<TargetSslProxy> | A list of TargetSslProxy resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetTcpProxiesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetTcpProxies` | array<TargetTcpProxy> | A list of TargetTcpProxies contained in this scope. |
| `warning` | object | Informational warning which replaces the list of backend services when the list is empty. |

### `TargetTcpProxiesSetBackendServiceRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `service` | string | The URL of the new BackendService resource for the targetTcpProxy. |

### `TargetTcpProxiesSetProxyHeaderRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `proxyHeader` | string enum | The new type of proxy header to append before sending data to the backend. NONE or PROXY_V1 are allowed. Values: `NONE`, `PROXY_V1`. |

### `TargetTcpProxy`

- Represents a Target TCP Proxy resource. A target TCP proxy is a component of a Proxy Network Load Balancer. The forwarding rule references the target TCP proxy, and the target proxy then references a backend service. For more information, readProxy Network Load Balancer overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#targetTcpProxy for target TCP proxies. |
| `loadBalancingScheme` | string enum | Specifies the type of load balancing scheme used by this target proxy. Values: `EXTERNAL`, `EXTERNAL_MANAGED`, `INTERNAL_MANAGED`, `LOAD_BALANCING_SCHEME_UNSPECIFIED`. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `proxyBind` | boolean | This field only applies when the forwarding rule that references this target proxy has a loadBalancingScheme set toINTERNAL_SELF_MANAGED. When this field is set to true, Envoy proxies set up inbound traffic interception and bind to the IP address and port specified in the forwarding rule. This is generally useful when using Traffic Director to configure Envoy as a gateway or middle proxy (in other words, not a sidecar proxy). The Envoy proxy listens for inbound requests and handles requests when it receives them. The default is false. |
| `proxyHeader` | string enum | Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE. Values: `NONE`, `PROXY_V1`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional TCP proxy resides. This field is not applicable to global TCP proxy. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `service` | string | URL to the BackendService resource. |

### `TargetTcpProxyAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of TargetTcpProxiesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#targetTcpProxyAggregatedList for lists of Target TCP Proxies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetTcpProxyList`

- Contains a list of TargetTcpProxy resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<TargetTcpProxy> | A list of TargetTcpProxy resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetVpnGateway`

- Represents a Target VPN Gateway resource. The target VPN gateway resource represents a Classic Cloud VPN gateway. For more information, read thethe Cloud VPN Overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `forwardingRules` | array<string> | \[Output Only\] A list of URLs to the ForwardingRule resources. ForwardingRules are created usingcompute.forwardingRules.insert and associated with a VPN gateway. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#targetVpnGateway for target VPN gateways. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this TargetVpnGateway, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a TargetVpnGateway. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | URL of the network to which this VPN gateway is attached. Provided by the client when the VPN gateway is created. |
| `params` | TargetVpnGatewayParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | \[Output Only\] URL of the region where the target VPN gateway resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `status` | string enum | \[Output Only\] The status of the VPN gateway, which can be one of the following: CREATING, READY, FAILED, or DELETING. Values: `CREATING`, `DELETING`, `FAILED`, `READY`. |
| `tunnels` | array<string> | \[Output Only\] A list of URLs to VpnTunnel resources. VpnTunnels are created using the compute.vpntunnels.insert method and associated with a VPN gateway. |

### `TargetVpnGatewayAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of TargetVpnGateway resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#targetVpnGateway for target VPN gateways. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetVpnGatewayList`

- Contains a list of TargetVpnGateway resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<TargetVpnGateway> | A list of TargetVpnGateway resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#targetVpnGateway for target VPN gateways. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `TargetVpnGatewayParams`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. \* Inconsistent format is not supported. For instance: {"tagKeys/333" : "tagValues/444", "123/env" : "prod"} is invalid. |

### `TargetVpnGatewaysScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetVpnGateways` | array<TargetVpnGateway> | \[Output Only\] A list of target VPN gateways contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of addresses when the list is empty. |

### `TestFailure`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actualOutputUrl` | string | The actual output URL evaluated by a load balancer containing the scheme, host, path and query parameters. |
| `actualRedirectResponseCode` | integer (int32) | Actual HTTP status code for rule with `urlRedirect` calculated by load balancer |
| `actualService` | string | BackendService or BackendBucket returned by load balancer. |
| `expectedOutputUrl` | string | The expected output URL evaluated by a load balancer containing the scheme, host, path and query parameters. |
| `expectedRedirectResponseCode` | integer (int32) | Expected HTTP status code for rule with `urlRedirect` calculated by load balancer |
| `expectedService` | string | Expected BackendService or BackendBucket resource the given URL should be mapped to. |
| `headers` | array<UrlMapTestHeader> | HTTP headers of the request. |
| `host` | string | Host portion of the URL. |
| `path` | string | Path portion including query parameters in the URL. |

### `TestPermissionsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the 'resource'. Permissions with wildcards (such as '\*' or 'storage.\*') are not allowed. |

### `TestPermissionsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `TimeZone`

- Represents a time zone from the IANA Time Zone Database (https://www.iana.org/time-zones).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | IANA Time Zone Database time zone. For example "America/New_York". |
| `version` | string | Optional. IANA Time Zone Database version number. For example "2019a". |

### `TlsCertificateContext`

- \[Deprecated\] Defines the mechanism to obtain the client or server certificate. Defines the mechanism to obtain the client or server certificate.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `certificatePaths` | TlsCertificatePaths | Specifies the certificate and private key paths. This field is applicable only if tlsCertificateSource is set to USE_PATH. |
| `certificateSource` | string enum | Defines how TLS certificates are obtained. Values: `INVALID`, `USE_PATH`, `USE_SDS`. |
| `sdsConfig` | SdsConfig | Specifies the config to retrieve certificates through SDS. This field is applicable only if tlsCertificateSource is set to USE_SDS. |

### `TlsCertificatePaths`

- \[Deprecated\] The paths to the mounted TLS Certificates and private key. The paths to the mounted TLS Certificates and private key.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `certificatePath` | string | The path to the file holding the client or server TLS certificate to use. |
| `privateKeyPath` | string | The path to the file holding the client or server private key. |

### `TlsContext`

- \[Deprecated\] The TLS settings for the client or server. The TLS settings for the client or server.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `certificateContext` | TlsCertificateContext | Defines the mechanism to obtain the client or server certificate. |
| `validationContext` | TlsValidationContext | Defines the mechanism to obtain the Certificate Authority certificate to validate the client/server certificate. If omitted, the proxy will not validate the server or client certificate. |

### `TlsValidationContext`

- \[Deprecated\] Defines the mechanism to obtain the Certificate Authority certificate to validate the client/server certificate. validate the client/server certificate.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `certificatePath` | string | The path to the file holding the CA certificate to validate the client or server certificate. |
| `sdsConfig` | SdsConfig | Specifies the config to retrieve certificates through SDS. This field is applicable only if tlsCertificateSource is set to USE_SDS. |
| `validationSource` | string enum | Defines how TLS certificates are obtained. Values: `INVALID`, `USE_PATH`, `USE_SDS`. |

### `UDPHealthCheck`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `port` | integer (int32) | The UDP port number to which the health check prober sends packets. Valid values are 1 through 65535. |
| `portName` | string | Not supported. |
| `request` | string | Raw data of request to send in payload of UDP packet. It is an error if this is empty. The request data can only be ASCII. |
| `response` | string | The bytes to match against the beginning of the response data. It is an error if this is empty. The response data can only be ASCII. |

### `Uint128`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `high` | string (uint64) | — |
| `low` | string (uint64) | — |

### `UpcomingMaintenance`

- Upcoming Maintenance notification information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canReschedule` | boolean | Indicates if the maintenance can be customer triggered. |
| `latestWindowStartTime` | string | The latest time for the planned maintenance window to start. This timestamp value is in RFC3339 text format. |
| `maintenanceOnShutdown` | boolean | Indicates whether the UpcomingMaintenance will be triggered on VM shutdown. |
| `maintenanceReasons` | array<string> | The reasons for the maintenance. Only valid for vms. Values: `FAILURE_CUSTOMER_REPORTED`, `FAILURE_DISK`, `FAILURE_GPU`, `FAILURE_GPU_MULTIPLE_FAULTY_HOSTS_CUSTOMER_REPORTED`, `FAILURE_GPU_NVLINK_SWITCH_CUSTOMER_REPORTED`, `FAILURE_GPU_TEMPERATURE`, `FAILURE_GPU_XID`, `FAILURE_INFRA`, `FAILURE_INTERFACE`, `FAILURE_MEMORY`, `FAILURE_NETWORK`, `FAILURE_NVLINK`, `FAILURE_REDUNDANT_HARDWARE_FAULT`, `FAILURE_TPU`, `INFRASTRUCTURE_RELOCATION`, `MAINTENANCE_REASON_UNKNOWN`, `PLANNED_NETWORK_UPDATE`, `PLANNED_UPDATE`. |
| `maintenanceStatus` | string enum | — Values: `ONGOING`, `PENDING`, `UNKNOWN`. |
| `type` | string enum | Defines the type of maintenance. Values: `MULTIPLE`, `SCHEDULED`, `UNKNOWN_TYPE`, `UNSCHEDULED`. |
| `windowEndTime` | string | The time by which the maintenance disruption will be completed. This timestamp value is in RFC3339 text format. |
| `windowStartTime` | string | The current start time of the maintenance window. This timestamp value is in RFC3339 text format. |

### `UpcomingMaintenance` (alpha)

- Upcoming Maintenance notification information.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `canReschedule` | boolean | Indicates if the maintenance can be customer triggered. |
| `date` | string | \[Output Only\] The date when the maintenance will take place. This value is inRFC3339 text format. DEPRECATED: Use window_start_time instead. |
| `latestWindowStartTime` | string | The latest time for the planned maintenance window to start. This timestamp value is in RFC3339 text format. |
| `maintenanceMethod` | string enum | Output only. Maintenance method for the upcoming maintenance. Values: `LIVE_UPDATE`, `MAINTENANCE_METHOD_UNSPECIFIED`, `TERMINATION`. |
| `maintenanceOnShutdown` | boolean | Indicates whether the UpcomingMaintenance will be triggered on VM shutdown. |
| `maintenanceReasons` | array<string> | The reasons for the maintenance. Only valid for vms. Values: `FAILURE_DISK`, `FAILURE_GPU`, `FAILURE_GPU_MULTIPLE_FAULTY_HOSTS_CUSTOMER_REPORTED`, `FAILURE_GPU_NVLINK_SWITCH_CUSTOMER_REPORTED`, `FAILURE_GPU_TEMPERATURE`, `FAILURE_GPU_XID`, `FAILURE_INFRA`, `FAILURE_INTERFACE`, `FAILURE_MEMORY`, `FAILURE_NETWORK`, `FAILURE_NVLINK`, `FAILURE_REDUNDANT_HARDWARE_FAULT`, `FAILURE_TPU`, `INFRASTRUCTURE_RELOCATION`, `MAINTENANCE_REASON_UNKNOWN`, `PLANNED_NETWORK_UPDATE`, `PLANNED_UPDATE`. |
| `maintenanceStatus` | string enum | — Values: `ONGOING`, `PENDING`, `UNKNOWN`. |
| `startTimeWindow` | UpcomingMaintenanceTimeWindow | \[Output Only\] The start time window of the maintenance disruption. DEPRECATED: Use window_start_time instead. TimeWindow is a container for two strings that represent timestamps in "yyyy-MM-dd'T'HH:mm:ssZ" text format. |
| `time` | string | \[Output Only\] The time when the maintenance will take place. This value is inRFC3339 text format. DEPRECATED: Use window_start_time instead. |
| `type` | string enum | Defines the type of maintenance. Values: `MULTIPLE`, `SCHEDULED`, `UNKNOWN_TYPE`, `UNSCHEDULED`. |
| `windowEndTime` | string | The time by which the maintenance disruption will be completed. This timestamp value is in RFC3339 text format. |
| `windowStartTime` | string | The current start time of the maintenance window. This timestamp value is in RFC3339 text format. |

### `UpcomingMaintenanceTimeWindow`

- Represents a window of time using two timestamps: `earliest` and `latest`.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `earliest` | string | — |
| `latest` | string | — |

### `UrlMap`

- Represents a URL Map resource. Compute Engine has two URL Map resources: \* Global \* Regional A URL map resource is a component of certain types of cloud load balancers and Traffic Director: \* urlMaps are used by global external Application Load Balancers, classic Application Load Balancers, and cross-region internal Application Load Balancers. \* regionUrlMaps are used by internal Application Load Balancers, regional external Application Load Balancers and regional internal Application Load Balancers. For a list of supported URL map features by the load balancer type, see the Load balancing features: Routing and traffic management table. For a list of supported URL map features for Traffic Director, see the Traffic Director features: Routing and traffic management table. This resource defines mappings from hostnames and URL paths to either a backend service or a backend bucket. To use the global urlMaps resource, the backend service must have a loadBalancingScheme of either EXTERNAL,EXTERNAL_MANAGED, or INTERNAL_SELF_MANAGED. To use the regionUrlMaps resource, the backend service must have aloadBalancingScheme of INTERNAL_MANAGED. For more information, read URL Map Concepts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `defaultCustomErrorResponsePolicy` | CustomErrorResponsePolicy | defaultCustomErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. This policy takes effect at the load balancer level and applies only when no policy has been defined for the error code at lower levels like PathMatcher, RouteRule and PathRule within this UrlMap. For example, consider a UrlMap with the following configuration: - defaultCustomErrorResponsePolicy containing policies for responding to 5xx and 4xx errors - A PathMatcher configured for \*.example.com has defaultCustomErrorResponsePolicy for 4xx. If a request for http://www.example.com/ encounters a404, the policy inpathMatcher.defaultCustomErrorResponsePolicy will be enforced. When the request for http://www.example.com/ encounters a502, the policy inUrlMap.defaultCustomErrorResponsePolicy will be enforced. When a request that does not match any host in \*.example.com such as http://www.myotherexample.com/, encounters a404, UrlMap.defaultCustomErrorResponsePolicy takes effect. When used in conjunction withdefaultRouteAction.retryPolicy, retries take precedence. Only once all retries are exhausted, thedefaultCustomErrorResponsePolicy is applied. While attempting a retry, if load balancer is successful in reaching the service, the defaultCustomErrorResponsePolicy is ignored and the response from the service is returned to the client. defaultCustomErrorResponsePolicy is supported only for global external Application Load Balancers. |
| `defaultRouteAction` | HttpRouteAction | defaultRouteAction takes effect when none of the hostRules match. The load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within defaultRouteAction. defaultRouteAction has no effect when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true. |
| `defaultService` | string | The full or partial URL of the defaultService resource to which traffic is directed if none of the hostRules match. If defaultRouteAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. defaultService has no effect when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true. |
| `defaultUrlRedirect` | HttpRedirectAction | When none of the specified hostRules match, the request is redirected to a URL specified by defaultUrlRedirect. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field is ignored when inserting a UrlMap. An up-to-date fingerprint must be provided in order to update the UrlMap, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a UrlMap. |
| `headerAction` | HttpHeaderAction | Specifies changes to request and response headers that need to take effect for the selected backendService. The headerAction specified here take effect afterheaderAction specified under pathMatcher. headerAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |
| `hostRules` | array<HostRule> | The list of host rules to use against the URL. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#urlMaps for url maps. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `pathMatchers` | array<PathMatcher> | The list of named PathMatchers to use against the URL. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional URL map resides. This field is not applicable to global URL maps. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `status` | UrlMapStatus | Output only. \[Output Only\] The status of the URL map. |
| `tests` | array<UrlMapTest> | The list of expected URL mapping tests. Request to update theUrlMap succeeds only if all test cases pass. You can specify a maximum of 100 tests per UrlMap. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |

### `UrlMap` (preview)

- Represents a URL Map resource. Compute Engine has two URL Map resources: \* Global \* Regional A URL map resource is a component of certain types of cloud load balancers and Traffic Director: \* urlMaps are used by global external Application Load Balancers, classic Application Load Balancers, and cross-region internal Application Load Balancers. \* regionUrlMaps are used by internal Application Load Balancers, regional external Application Load Balancers and regional internal Application Load Balancers. For a list of supported URL map features by the load balancer type, see the Load balancing features: Routing and traffic management table. For a list of supported URL map features for Traffic Director, see the Traffic Director features: Routing and traffic management table. This resource defines mappings from hostnames and URL paths to either a backend service or a backend bucket. To use the global urlMaps resource, the backend service must have a loadBalancingScheme of either EXTERNAL,EXTERNAL_MANAGED, or INTERNAL_SELF_MANAGED. To use the regionUrlMaps resource, the backend service must have aloadBalancingScheme of INTERNAL_MANAGED. For more information, read URL Map Concepts.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `defaultCustomErrorResponsePolicy` | CustomErrorResponsePolicy | defaultCustomErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. This policy takes effect at the load balancer level and applies only when no policy has been defined for the error code at lower levels like PathMatcher, RouteRule and PathRule within this UrlMap. For example, consider a UrlMap with the following configuration: - defaultCustomErrorResponsePolicy containing policies for responding to 5xx and 4xx errors - A PathMatcher configured for \*.example.com has defaultCustomErrorResponsePolicy for 4xx. If a request for http://www.example.com/ encounters a404, the policy inpathMatcher.defaultCustomErrorResponsePolicy will be enforced. When the request for http://www.example.com/ encounters a502, the policy inUrlMap.defaultCustomErrorResponsePolicy will be enforced. When a request that does not match any host in \*.example.com such as http://www.myotherexample.com/, encounters a404, UrlMap.defaultCustomErrorResponsePolicy takes effect. When used in conjunction withdefaultRouteAction.retryPolicy, retries take precedence. Only once all retries are exhausted, thedefaultCustomErrorResponsePolicy is applied. While attempting a retry, if load balancer is successful in reaching the service, the defaultCustomErrorResponsePolicy is ignored and the response from the service is returned to the client. defaultCustomErrorResponsePolicy is supported only for global external Application Load Balancers. |
| `defaultRouteAction` | HttpRouteAction | defaultRouteAction takes effect when none of the hostRules match. The load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within defaultRouteAction. defaultRouteAction has no effect when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true. |
| `defaultService` | string | The full or partial URL of the defaultService resource to which traffic is directed if none of the hostRules match. If defaultRouteAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. defaultService has no effect when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true. |
| `defaultUrlRedirect` | HttpRedirectAction | When none of the specified hostRules match, the request is redirected to a URL specified by defaultUrlRedirect. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field is ignored when inserting a UrlMap. An up-to-date fingerprint must be provided in order to update the UrlMap, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a UrlMap. |
| `headerAction` | HttpHeaderAction | Specifies changes to request and response headers that need to take effect for the selected backendService. The headerAction specified here take effect afterheaderAction specified under pathMatcher. headerAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |
| `hostRules` | array<HostRule> | The list of host rules to use against the URL. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#urlMaps for url maps. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `pathMatchers` | array<PathMatcher> | The list of named PathMatchers to use against the URL. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional URL map resides. This field is not applicable to global URL maps. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `tests` | array<UrlMapTest> | The list of expected URL mapping tests. Request to update theUrlMap succeeds only if all test cases pass. You can specify a maximum of 100 tests per UrlMap. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |

### `UrlMapList`

- Contains a list of UrlMap resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<UrlMap> | A list of UrlMap resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `UrlMapQuotaUsage`

- Message representing the quota usage for a UrlMap.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `forwardingRules` | integer (int32) | Output only. The number of forwarding rules that uses this UrlMap. |
| `units` | string (int64) | Output only. The number of quota units calculated for this UrlMap. |

### `UrlMapReference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `urlMap` | string | — |

### `UrlMapStatus`

- \[Output Only\] The status of the URL map.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `quotaUsage` | UrlMapQuotaUsage | Output only. Summary of quota usage for given UrlMap. |

### `UrlMapTest`

- Message for the expected URL mappings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of this test case. |
| `expectedOutputUrl` | string | The expected output URL evaluated by the load balancer containing the scheme, host, path and query parameters. For rules that forward requests to backends, the test passes only whenexpectedOutputUrl matches the request forwarded by the load balancer to backends. For rules with urlRewrite, the test verifies that the forwarded request matcheshostRewrite and pathPrefixRewrite in theurlRewrite action. When service is specified,expectedOutputUrl\`s scheme is ignored. For rules with urlRedirect, the test passes only ifexpectedOutputUrl matches the URL in the load balancer's redirect response. If urlRedirect specifieshttps_redirect, the test passes only if the scheme inexpectedOutputUrl is also set to HTTPS. If urlRedirect specifies strip_query, the test passes only if expectedOutputUrl does not contain any query parameters. expectedOutputUrl is optional whenservice is specified. |
| `expectedRedirectResponseCode` | integer (int32) | For rules with urlRedirect, the test passes only ifexpectedRedirectResponseCode matches the HTTP status code in load balancer's redirect response. expectedRedirectResponseCode cannot be set whenservice is set. |
| `headers` | array<UrlMapTestHeader> | HTTP headers for this request. If headers contains a host header, then host must also match the header value. |
| `host` | string | Host portion of the URL. If headers contains a host header, then host must also match the header value. |
| `path` | string | Path portion of the URL. |
| `service` | string | Expected BackendService or BackendBucket resource the given URL should be mapped to. The service field cannot be set if expectedRedirectResponseCode is set. |

### `UrlMapTest` (alpha)

- Message for the expected URL mappings.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `backendServiceWeight` | integer (uint32) | The weight to use for the supplied host and path when using advanced routing rules that involve traffic splitting. |
| `description` | string | Description of this test case. |
| `expectedOutputUrl` | string | The expected output URL evaluated by the load balancer containing the scheme, host, path and query parameters. For rules that forward requests to backends, the test passes only whenexpectedOutputUrl matches the request forwarded by the load balancer to backends. For rules with urlRewrite, the test verifies that the forwarded request matcheshostRewrite and pathPrefixRewrite in theurlRewrite action. When service is specified,expectedOutputUrl\`s scheme is ignored. For rules with urlRedirect, the test passes only ifexpectedOutputUrl matches the URL in the load balancer's redirect response. If urlRedirect specifieshttps_redirect, the test passes only if the scheme inexpectedOutputUrl is also set to HTTPS. If urlRedirect specifies strip_query, the test passes only if expectedOutputUrl does not contain any query parameters. expectedOutputUrl is optional whenservice is specified. |
| `expectedRedirectResponseCode` | integer (int32) | For rules with urlRedirect, the test passes only ifexpectedRedirectResponseCode matches the HTTP status code in load balancer's redirect response. expectedRedirectResponseCode cannot be set whenservice is set. |
| `expectedUrlRedirect` | string | The expected URL that should be redirected to for the host and path being tested. \[Deprecated\] This field is deprecated. Use expected_output_url instead. |
| `headers` | array<UrlMapTestHeader> | HTTP headers for this request. If headers contains a host header, then host must also match the header value. |
| `host` | string | Host portion of the URL. If headers contains a host header, then host must also match the header value. |
| `path` | string | Path portion of the URL. |
| `service` | string | Expected BackendService or BackendBucket resource the given URL should be mapped to. The service field cannot be set if expectedRedirectResponseCode is set. |

### `UrlMapTestHeader`

- HTTP headers used in UrlMapTests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Header name. |
| `value` | string | Header value. |

### `UrlMapValidationResult`

- Message representing the validation result for a UrlMap.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `loadErrors` | array<string> | — |
| `loadSucceeded` | boolean | Whether the given UrlMap can be successfully loaded. If false, 'loadErrors' indicates the reasons. |
| `quotaUsage` | UrlMapQuotaUsage | Output only. Summary of quota usage for given UrlMap. |
| `testFailures` | array<TestFailure> | — |
| `testPassed` | boolean | If successfully loaded, this field indicates whether the test passed. If false, 'testFailures's indicate the reason of failure. |

### `UrlMapValidationResult` (preview)

- Message representing the validation result for a UrlMap.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `loadErrors` | array<string> | — |
| `loadSucceeded` | boolean | Whether the given UrlMap can be successfully loaded. If false, 'loadErrors' indicates the reasons. |
| `testFailures` | array<TestFailure> | — |
| `testPassed` | boolean | If successfully loaded, this field indicates whether the test passed. If false, 'testFailures's indicate the reason of failure. |

### `UrlMapsAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of UrlMapsScopedList resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `UrlMapsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `urlMaps` | array<UrlMap> | A list of UrlMaps contained in this scope. |
| `warning` | object | Informational warning which replaces the list of backend services when the list is empty. |

### `UrlMapsValidateRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `loadBalancingSchemes` | array<string> | Specifies the load balancer type(s) this validation request is for. UseEXTERNAL_MANAGED for global external Application Load Balancers and regional external Application Load Balancers. Use EXTERNAL for classic Application Load Balancers. Use INTERNAL_MANAGED for internal Application Load Balancers. For more information, refer to Choosing a load balancer. If unspecified, the load balancing scheme will be inferred from the backend service resources this URL map references. If that can not be inferred (for example, this URL map only references backend buckets, or this Url map is for rewrites and redirects only and doesn't reference any backends),EXTERNAL will be used as the default type. If specified, the scheme(s) must not conflict with the load balancing scheme of the backend service resources this Url map references. Values: `EXTERNAL`, `EXTERNAL_MANAGED`, `LOAD_BALANCING_SCHEME_UNSPECIFIED`. |
| `resource` | UrlMap | Content of the UrlMap to be validated. |

### `UrlMapsValidateResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `result` | UrlMapValidationResult | — |

### `UrlRewrite`

- The spec for modifying the path before sending the request to the matched backend service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hostRewrite` | string | Before forwarding the request to the selected service, the request's host header is replaced with contents of hostRewrite. The value must be from 1 to 255 characters. |
| `pathPrefixRewrite` | string | Before forwarding the request to the selected backend service, the matching portion of the request's path is replaced bypathPrefixRewrite. The value must be from 1 to 1024 characters. |
| `pathTemplateRewrite` | string | If specified, the pattern rewrites the URL path (based on the :path header) using the HTTP template syntax. A corresponding path_template_match must be specified. Any template variables must exist in the path_template_match field. - -At least one variable must be specified in the path_template_match field - You can omit variables from the rewritten URL - The \* and \*\* operators cannot be matched unless they have a corresponding variable name - e.g. {format=\*} or {var=\*\*}. For example, a path_template_match of /static/{format=\*\*} could be rewritten as /static/content/{format} to prefix/content to the URL. Variables can also be re-ordered in a rewrite, so that /{country}/{format}/{suffix=\*\*} can be rewritten as /content/{format}/{country}/{suffix}. At least one non-empty routeRules\[\].matchRules\[\].path_template_match is required. Only one of path_prefix_rewrite orpath_template_rewrite may be specified. |
| `regexRewrite` | RegexRewrite | The regex rewrite to be applied to the URL. Only one ofpathPrefixRewrite, pathTemplateRewrite, orregexRewrite may be specified. |

### `UsableSubnetwork`

- Subnetwork which the current user has compute.subnetworks.use permission on.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `externalIpv6Prefix` | string | Output only. \[Output Only\] The external IPv6 address range that is assigned to this subnetwork. |
| `internalIpv6Prefix` | string | Output only. \[Output Only\] The internal IPv6 address range that is assigned to this subnetwork. |
| `ipCidrRange` | string | The range of internal addresses that are owned by this subnetwork. |
| `ipv6AccessType` | string enum | The access type of IPv6 address this subnet holds. It's immutable and can only be specified during creation or the first time the subnet is updated into IPV4_IPV6 dual stack. Values: `EXTERNAL`, `INTERNAL`. |
| `network` | string | Network URL. |
| `purpose` | string enum | — Values: `GLOBAL_MANAGED_PROXY`, `INTERNAL_HTTPS_LOAD_BALANCER`, `PEER_MIGRATION`, `PRIVATE`, `PRIVATE_NAT`, `PRIVATE_RFC_1918`, `PRIVATE_SERVICE_CONNECT`, `REGIONAL_MANAGED_PROXY`. |
| `role` | string enum | The role of subnetwork. Currently, this field is only used when purpose is set to GLOBAL_MANAGED_PROXY orREGIONAL_MANAGED_PROXY. The value can be set toACTIVE or BACKUP. An ACTIVE subnetwork is one that is currently being used for Envoy-based load balancers in a region. A BACKUP subnetwork is one that is ready to be promoted to ACTIVE or is currently draining. This field can be updated with a patch request. Values: `ACTIVE`, `BACKUP`. |
| `secondaryIpRanges` | array<UsableSubnetworkSecondaryRange> | Secondary IP ranges. |
| `stackType` | string enum | The stack type for the subnet. If set to IPV4_ONLY, new VMs in the subnet are assigned IPv4 addresses only. If set toIPV4_IPV6, new VMs in the subnet can be assigned both IPv4 and IPv6 addresses. If not specified, IPV4_ONLY is used. This field can be both set at resource creation time and updated usingpatch. Values: `IPV4_IPV6`, `IPV4_ONLY`, `IPV6_ONLY`. |
| `subnetwork` | string | Subnetwork URL. |

### Shape of `StoragePoolResourceStatus` (alpha)

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "aggregateDiskProvisionedIops": "string (int64)",
  "aggregateDiskSizeGb": "string (int64)",
  "diskCount": "string (int64)",
  "exapoolMaxReadIops": "string (int64)",
  "exapoolMaxReadThroughput": "string (int64)",
  "exapoolMaxWriteIops": "string (int64)",
  "exapoolMaxWriteThroughput": "string (int64)",
  "lastResizeTimestamp": "string",
  "maxAggregateDiskSizeGb": "string (int64)",
  "maxTotalProvisionedDiskCapacityGb": "string (int64)",
  "numberOfDisks": "string (int64)",
  "poolUsedCapacityBytes": "string (int64)",
  "poolUsedIops": "string (int64)",
  "poolUsedThroughput": "string (int64)",
  "poolUserWrittenBytes": "string (int64)",
  "totalProvisionedDiskCapacityGb": "string (int64)",
  "totalProvisionedDiskIops": "string (int64)",
  "totalProvisionedDiskThroughput": "string (int64)",
  "usedBytes": "string (int64)",
  "usedReducedBytes": "string (int64)",
  "usedThroughput": "string (int64)"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
