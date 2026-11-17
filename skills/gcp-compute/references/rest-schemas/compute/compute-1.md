---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 1/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `AWSV4Signature`

- Contains the configurations necessary to generate a signature for access to private storage buckets that support Signature Version 4 for authentication. The service name for generating the authentication header will always default to 's3'.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessKey` | string | The access key used for s3 bucket authentication. Required for updating or creating a backend that uses AWS v4 signature authentication, but will not be returned as part of the configuration when queried with a REST API GET request. @InputOnly |
| `accessKeyId` | string | The identifier of an access key used for s3 bucket authentication. |
| `accessKeyVersion` | string | The optional version identifier for the access key. You can use this to keep track of different iterations of your access key. |
| `originRegion` | string | The name of the cloud region of your origin. This is a free-form field with the name of the region your cloud uses to host your origin. For example, "us-east-1" for AWS or "us-ashburn-1" for OCI. |

### `AcceleratorConfig`

- A specification of the type and number of accelerator cards attached to the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorCount` | integer (int32) | The number of the guest accelerator cards exposed to this instance. |
| `acceleratorType` | string | Full or partial URL of the accelerator type resource to attach to this instance. For example:projects/my-project/zones/us-central1-c/acceleratorTypes/nvidia-tesla-p100 If you are creating an instance template, specify only the accelerator name. See GPUs on Compute Engine for a full list of accelerator types. |

### `AcceleratorInterconnect`

- Represents an Accelerator Interconnect resource.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `acceleratorTopology` | string | The target topology shape (e.g. "4x4x8"). |
| `annotations` | object | The annotations for the accelerator interconnect. |
| `creationTimestamp` | string | Output only. \[Output Only\] The creation time of this resource inRFC3339 text format. |
| `description` | string | An optional description of this resource. |
| `id` | string (uint64) | Output only. \[Output Only\] A unique identifier for this resource type. |
| `labels` | object | The labels for the accelerator interconnect. |
| `name` | string | The name of the resource. The name must be 1-63 characters long, and comply withRFC1035. |
| `params` | AcceleratorInterconnectParams | Input only. \[Input Only\] Additional params passed with the creation request, but not persisted as part of resource payload. |
| `reactivationMode` | string enum | The reactivation mode for the accelerator interconnect. Values: `MANUAL`, `REACTIVATION_MODE_UNSPECIFIED`. |
| `selfLink` | string | Output only. \[Output Only\] The fully-qualified URL of this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] The fully-qualified URL of this resource containing its unique identifier. |
| `status` | AcceleratorInterconnectAcceleratorInterconnectStatus | Output only. \[Output Only\] The status of the interconnect. |
| `zone` | string | Output only. \[Output Only\] The URL of azone where the interconnect resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `AcceleratorInterconnectAcceleratorInterconnectStatus`

- Detailed status information for the interconnect resource.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `acceleratorType` | string | Output only. \[Output Only\] The accelerator type (e.g., "TPU7X"). |
| `state` | string enum | Output only. \[Output Only\] The current state of the interconnect. Values: `ACTIVATING`, `ACTIVE`, `ACTIVE_DEGRADED`, `DEACTIVATING`, `FAILED`, `STATE_UNSPECIFIED`. |
| `stateDetails` | AcceleratorInterconnectAcceleratorInterconnectStatusAcceleratorInterconnectStateDetails | Output only. \[Output Only\] The result of the latest accelerator topology state check. |

### `AcceleratorInterconnectAcceleratorInterconnectStatusAcceleratorInterconnectStateDetails`

- Holds the details of the current accelerator interconnect state.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `error` | object | Output only. Encountered errors. |
| `timestamp` | string (google-datetime) | Output only. Timestamp is shown only if there is an error. |

### `AcceleratorInterconnectMemberInstance`

- Represents an Accelerator Interconnect Member Instance.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `instance` | string | Output only. \[Output Only\] The VM instance resource URL (e.g., https://.../instances/my-vm). |
| `instanceId` | string (uint64) | Output only. \[Output Only\] The unique server-defined ID of the VM instance. |

### `AcceleratorInterconnectMemberInstancesListResponse`

- Response message for AcceleratorInterconnectMemberInstances.List.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `items` | array<AcceleratorInterconnectMemberInstance> | The list of AcceleratorInterconnectMemberInstances. |
| `nextPageToken` | string | Token to retrieve the next page of results. |

### `AcceleratorInterconnectParams`

- Additional accelerator interconnect creation params.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `capacityPool` | CapacityPool | The capacity pool to use for the accelerator interconnect. |

### `AcceleratorInterconnectsInsertRequest`

- Insert an Accelerator Interconnect resource.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `resource` | AcceleratorInterconnect | Required. The accelerator interconnect resource to insert. |

### `AcceleratorInterconnectsList`

- Response message for AcceleratorInterconnects.List.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `items` | array<AcceleratorInterconnect> | A list of AcceleratorInterconnect resources. |
| `nextPageToken` | string | This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |

### `AcceleratorPodController`

- Represents a controller for managing out-of-band access to an accelerator domain (e.g., NVLink Domain).
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | — |
| `managementInterfaces` | object | Map of management interfaces. Keys must be valid RFC1035 names and at most 63 characters long. For TYPE_NVLINK_SWITCH_MONITORING interfaces, keys must match the pattern "gnmi-nvswitch-\[0-8\]" (e.g., "gnmi-nvswitch-0" through "gnmi-nvswitch-8"). For TYPE_NVLINK_SWITCH_DEBUG interfaces, keys must match the pattern "gnoi-nvswitch-\[0-8\]" (e.g., "gnoi-nvswitch-0" through "gnoi-nvswitch-8"). |
| `name` | string | Required. The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for the resource with the resource ID. |
| `target` | string | Required. The target accelerator domain this controller manages. This must be a resolvable identifier for the specific NVLink Domain or TPU system (e.g., a Reservation Sub-block URI). Example: "projects/my-project/reservations/my-reservation/subBlocks/subblock-1". |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the accelerator pod controller resides. |

### `AcceleratorPodControllersListResponse`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `items` | array<AcceleratorPodController> | — |
| `kind` | string | — |
| `nextPageToken` | string | — |
| `selfLink` | string | — |
| `warning` | object | — |

### `AcceleratorTopologiesInfo`

- Info for accelerator topologies within a densely packed reservation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorTopologyInfos` | array<AcceleratorTopologiesInfoAcceleratorTopologyInfo> | Info for each accelerator topology. |

### `AcceleratorTopologiesInfoAcceleratorTopologyInfo`

- Info for a slice of a given topology.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorTopology` | string | The accelerator topology. |
| `infoPerTopologyStates` | array<AcceleratorTopologiesInfoAcceleratorTopologyInfoInfoPerTopologyState> | Info for each topology state. |

### `AcceleratorTopologiesInfoAcceleratorTopologyInfoInfoPerTopologyState`

- Info for each topology state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | integer (int32) | The number of accelerator topologies in this state. |
| `state` | string enum | The state of the accelerator topology. Values: `AVAILABLE`, `DEGRADED`, `RUNNING`, `TOPOLOGY_STATE_UNSPECIFIED`, `UNHEALTHY`. |

### `AcceleratorType`

- Represents an Accelerator Type resource. Google Cloud Platform provides graphics processing units (accelerators) that you can add to VM instances to improve or accelerate performance when working with intensive workloads. For more information, readGPUs on Compute Engine.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this accelerator type. |
| `description` | string | \[Output Only\] An optional textual description of the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#acceleratorType for accelerator types. |
| `maximumCardsPerInstance` | integer (int32) | \[Output Only\] Maximum number of accelerator cards allowed per instance. |
| `name` | string | \[Output Only\] Name of the resource. |
| `resourceMetadata` | ResourceMetadata | Output only. Contains standard resource metadata for an AcceleratorType resource. It is populated for each instance of the AcceleratorType resource, and includes the api_version the instance was retrieved through, and its canonical resource_type name. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined, fully qualified URL for this resource. |
| `zone` | string | \[Output Only\] The name of the zone where the accelerator type resides, such as us-central1-a. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `AcceleratorType` (alpha)

- Represents an Accelerator Type resource. Google Cloud Platform provides graphics processing units (accelerators) that you can add to VM instances to improve or accelerate performance when working with intensive workloads. For more information, readGPUs on Compute Engine.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this accelerator type. |
| `description` | string | \[Output Only\] An optional textual description of the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#acceleratorType for accelerator types. |
| `maximumCardsPerInstance` | integer (int32) | \[Output Only\] Maximum number of accelerator cards allowed per instance. |
| `name` | string | \[Output Only\] Name of the resource. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined, fully qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `zone` | string | \[Output Only\] The name of the zone where the accelerator type resides, such as us-central1-a. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `AcceleratorType` (beta)

- Represents an Accelerator Type resource. Google Cloud Platform provides graphics processing units (accelerators) that you can add to VM instances to improve or accelerate performance when working with intensive workloads. For more information, readGPUs on Compute Engine.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this accelerator type. |
| `description` | string | \[Output Only\] An optional textual description of the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#acceleratorType for accelerator types. |
| `maximumCardsPerInstance` | integer (int32) | \[Output Only\] Maximum number of accelerator cards allowed per instance. |
| `name` | string | \[Output Only\] Name of the resource. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined, fully qualified URL for this resource. |
| `zone` | string | \[Output Only\] The name of the zone where the accelerator type resides, such as us-central1-a. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `AcceleratorTypeAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of AcceleratorTypesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#acceleratorTypeAggregatedList for aggregated lists of accelerator types. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `AcceleratorTypeList`

- Contains a list of accelerator types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<AcceleratorType> | A list of AcceleratorType resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#acceleratorTypeList for lists of accelerator types. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `AcceleratorTypesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorTypes` | array<AcceleratorType> | \[Output Only\] A list of accelerator types contained in this scope. |
| `warning` | object | \[Output Only\] An informational warning that appears when the accelerator types list is empty. |

### `AccessConfig`

- An access configuration attached to an instance's network interface. Only one access config per instance is supported.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `externalIpv6` | string | Applies to ipv6AccessConfigs only. The first IPv6 address of the external IPv6 range associated with this instance, prefix length is stored inexternalIpv6PrefixLength in ipv6AccessConfig. To use a static external IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an external IPv6 address from the instance's subnetwork. |
| `externalIpv6PrefixLength` | integer (int32) | Applies to ipv6AccessConfigs only. The prefix length of the external IPv6 range. |
| `ipCollection` | string | Reference to the source of external IPv4 addresses, like a PublicDelegatedPrefix (PDP) for BYOIP. The PDP must support enhanced IPv4 allocations. Use one of the following formats to specify a PDP when allocating an external IPv4 address using BYOIP. - Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/projectId/regions/region/publicDelegatedPrefixes/pdp-name - Partial URL, as in - projects/projectId/regions/region/publicDelegatedPrefixes/pdp-name - regions/region/publicDelegatedPrefixes/pdp-name |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#accessConfig for access configs. |
| `name` | string | The name of this access configuration. In accessConfigs (IPv4), the default and recommended name is External NAT, but you can use any arbitrary string, such as My external IP orNetwork Access. In ipv6AccessConfigs, the recommend name is External IPv6. |
| `natIP` | string | Applies to accessConfigs (IPv4) only. Anexternal IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance. |
| `networkTier` | string enum | This signifies the networking tier used for configuring this access configuration and can only take the following values: PREMIUM,STANDARD. If an AccessConfig is specified without a valid external IP address, an ephemeral IP will be created with this networkTier. If an AccessConfig with a valid external IP address is specified, it must match that of the networkTier associated with the Address resource owning that IP. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `publicPtrDomainName` | string | The DNS domain name for the public PTR record. You can set this field only if the `setPublicPtr` field is enabled inaccessConfig. If this field is unspecified inipv6AccessConfig, a default PTR record will be created for first IP in associated external IPv6 range. |
| `securityPolicy` | string | The resource URL for the security policy associated with this access config. |
| `setPublicPtr` | boolean | Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name. This field is not used in ipv6AccessConfig. A default PTR record will be created if the VM has external IPv6 range associated. |
| `type` | string enum | The type of configuration. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. Inipv6AccessConfigs, the default and only option isDIRECT_IPV6. Values: `DIRECT_IPV6`, `ONE_TO_ONE_NAT`. |

### `AccessConfig` (alpha)

- An access configuration attached to an instance's network interface. Only one access config per instance is supported.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `externalIpv6` | string | Applies to ipv6AccessConfigs only. The first IPv6 address of the external IPv6 range associated with this instance, prefix length is stored inexternalIpv6PrefixLength in ipv6AccessConfig. To use a static external IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an external IPv6 address from the instance's subnetwork. |
| `externalIpv6PrefixLength` | integer (int32) | Applies to ipv6AccessConfigs only. The prefix length of the external IPv6 range. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#accessConfig for access configs. |
| `name` | string | The name of this access configuration. In accessConfigs (IPv4), the default and recommended name is External NAT, but you can use any arbitrary string, such as My external IP orNetwork Access. In ipv6AccessConfigs, the recommend name is External IPv6. |
| `natIP` | string | Applies to accessConfigs (IPv4) only. Anexternal IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance. |
| `networkTier` | string enum | This signifies the networking tier used for configuring this access configuration and can only take the following values: PREMIUM,STANDARD. If an AccessConfig is specified without a valid external IP address, an ephemeral IP will be created with this networkTier. If an AccessConfig with a valid external IP address is specified, it must match that of the networkTier associated with the Address resource owning that IP. Values: `FIXED_STANDARD`, `PREMIUM`, `SELECT`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `publicDnsName` | string | Output only. \[Output Only\] The public DNS domain name for the instance. |
| `publicPtrDomainName` | string | The DNS domain name for the public PTR record. You can set this field only if the `setPublicPtr` field is enabled inaccessConfig. If this field is unspecified inipv6AccessConfig, a default PTR record will be created for first IP in associated external IPv6 range. |
| `securityPolicy` | string | The resource URL for the security policy associated with this access config. |
| `setPublicDns` | boolean | Specifies whether a public DNS 'A' record should be created for the external IP address of this access configuration. |
| `setPublicPtr` | boolean | Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name. This field is not used in ipv6AccessConfig. A default PTR record will be created if the VM has external IPv6 range associated. |
| `type` | string enum | The type of configuration. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. Inipv6AccessConfigs, the default and only option isDIRECT_IPV6. Values: `DIRECT_IPV6`, `ONE_TO_ONE_NAT`. |

### `AccessConfig` (beta)

- An access configuration attached to an instance's network interface. Only one access config per instance is supported.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `externalIpv6` | string | Applies to ipv6AccessConfigs only. The first IPv6 address of the external IPv6 range associated with this instance, prefix length is stored inexternalIpv6PrefixLength in ipv6AccessConfig. To use a static external IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an external IPv6 address from the instance's subnetwork. |
| `externalIpv6PrefixLength` | integer (int32) | Applies to ipv6AccessConfigs only. The prefix length of the external IPv6 range. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#accessConfig for access configs. |
| `name` | string | The name of this access configuration. In accessConfigs (IPv4), the default and recommended name is External NAT, but you can use any arbitrary string, such as My external IP orNetwork Access. In ipv6AccessConfigs, the recommend name is External IPv6. |
| `natIP` | string | Applies to accessConfigs (IPv4) only. Anexternal IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance. |
| `networkTier` | string enum | This signifies the networking tier used for configuring this access configuration and can only take the following values: PREMIUM,STANDARD. If an AccessConfig is specified without a valid external IP address, an ephemeral IP will be created with this networkTier. If an AccessConfig with a valid external IP address is specified, it must match that of the networkTier associated with the Address resource owning that IP. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `publicPtrDomainName` | string | The DNS domain name for the public PTR record. You can set this field only if the `setPublicPtr` field is enabled inaccessConfig. If this field is unspecified inipv6AccessConfig, a default PTR record will be created for first IP in associated external IPv6 range. |
| `securityPolicy` | string | The resource URL for the security policy associated with this access config. |
| `setPublicPtr` | boolean | Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name. This field is not used in ipv6AccessConfig. A default PTR record will be created if the VM has external IPv6 range associated. |
| `type` | string enum | The type of configuration. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. Inipv6AccessConfigs, the default and only option isDIRECT_IPV6. Values: `DIRECT_IPV6`, `ONE_TO_ONE_NAT`. |

### `Address`

- Represents an IP Address resource. Google Compute Engine has two IP Address resources: \* Global (external and internal) (https://cloud.google.com/compute/docs/reference/rest/v1/globalAddresses) \* Regional (external and internal) (https://cloud.google.com/compute/docs/reference/rest/v1/addresses) For more information, see Reserving a static external IP address.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | The static IP address represented by this resource. |
| `addressType` | string enum | The type of address to reserve, either INTERNAL orEXTERNAL. If unspecified, defaults to EXTERNAL. Values: `EXTERNAL`, `INTERNAL`, `UNSPECIFIED_TYPE`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this field when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ipCollection` | string | Reference to the source of IP addresses. It supports the following cases: - Case 1: PublicDelegatedPrefix (PDP) for BYOIP external addresses. If an IPv4 PDP is used, the PDP must support enhanced IPv4 allocations. If an IPv6 PDP is used, the PDP must be in EXTERNAL_IPV6_FORWARDING_RULE_CREATION mode. - Case 2: Internal Range for global internal addresses. Use one of the following formats to specify the resource: For a Public Delegated Prefix: - Full resource URL:https://www.googleapis.com/compute/v1/projects/projectId/regions/region/publicDelegatedPrefixes/pdp - Partial URL: - projects/projectId/regions/region/publicDelegatedPrefixes/pdp-name - regions/region/publicDelegatedPrefixes/pdp-name For an Internal Range: - Full URL:https://networkconnectivity.googleapis.com/v1/projects/project/locations/global/internalRanges/internal-range - Partial URL:projects/project/locations/global/internalRanges/internal-range |
| `ipVersion` | string enum | The IP version that will be used by this address. Valid options areIPV4 or IPV6. Values: `IPV4`, `IPV6`, `UNSPECIFIED_VERSION`. |
| `ipv6EndpointType` | string enum | The endpoint type of this address, which should be VM or NETLB. This is used for deciding which type of endpoint this address can be used after the external IPv6 address reservation. Values: `NETLB`, `VM`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#address for addresses. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this Address, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an Address. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `network` | string | The URL of the network in which to reserve the address. This field can only be used with INTERNAL type with theVPC_PEERING purpose. |
| `networkAttachment` | string | Optional. The URL of the network attachment that this address comes from in the following format: projects/{project}/regions/{region_name}/networkAttachments/{network_attachment_name}. |
| `networkTier` | string enum | This signifies the networking tier used for configuring this address and can only take the following values: PREMIUM orSTANDARD. Internal IP addresses are always Premium Tier; global external IP addresses are always Premium Tier; regional external IP addresses can be either Standard or Premium Tier. If this field is not specified, it is assumed to be PREMIUM. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `prefixLength` | integer (int32) | The prefix length if the resource represents an IP range. |
| `purpose` | string enum | The purpose of this resource, which can be one of the following values: - GCE_ENDPOINT for addresses that are used by VM instances, alias IP ranges, load balancers, and similar resources. - DNS_RESOLVER for a DNS resolver address in a subnetwork for a Cloud DNS inbound forwarder IP addresses (regional internal IP address in a subnet of a VPC network) - VPC_PEERING for global internal IP addresses used for private services access allocated ranges. - NAT_AUTO for the regional external IP addresses used by Cloud NAT when allocating addresses using automatic NAT IP address allocation. - IPSEC_INTERCONNECT for addresses created from a private IP range that are reserved for a VLAN attachment in an \*HA VPN over Cloud Interconnect\* configuration. These addresses are regional resources. - `SHARED_LOADBALANCER_VIP` for an internal IP address that is assigned to multiple internal forwarding rules. - `PRIVATE_SERVICE_CONNECT` for a private network address that is used to configure Private Service Connect. Only global internal addresses can use this purpose. - `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0` for addresses that can only be assigned to global external Passthrough Network Load Balancer forwarding rules, as an Availability Group 0 address. - `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1` for addresses that can only be assigned to global external Passthrough Network Load Balancer forwarding rules, as an Availability Group 1 address. Values: `DNS_RESOLVER`, `GCE_ENDPOINT`, `IPSEC_INTERCONNECT`, `NAT_AUTO`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1`, `PRIVATE_SERVICE_CONNECT`, `SERVERLESS`, `SHARED_LOADBALANCER_VIP`, `VPC_PEERING`. |
| `region` | string | Output only. \[Output Only\] The URL of the region where a regional address resides. For regional addresses, you must specify the region as a path parameter in the HTTP request URL. \*This field is not applicable to global addresses.\* |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `serviceClassId` | string | Optional. Producer Service's Service class ID for the region of this address. Can only be used with network_attachment. It is not possible to use on its own; however, network_attachment can be used without service_class_id. |
| `status` | string enum | Output only. \[Output Only\] The status of the address, which can be one ofRESERVING, RESERVED, or IN_USE. An address that is RESERVING is currently in the process of being reserved. A RESERVED address is currently reserved and available to use. An IN_USE address is currently being used by another resource and is not available. Values: `IN_USE`, `RESERVED`, `RESERVING`. |
| `subnetwork` | string | The URL of the subnetwork in which to reserve the address. If an IP address is specified, it must be within the subnetwork's IP range. This field can only be used with INTERNAL type with aGCE_ENDPOINT or DNS_RESOLVER purpose. |
| `users` | array<string> | \[Output Only\] The URLs of the resources that are using this address. |

### `Address` (alpha)

- Represents an IP Address resource. Google Compute Engine has two IP Address resources: \* Global (external and internal) (https://cloud.google.com/compute/docs/reference/rest/alpha/globalAddresses) \* Regional (external and internal) (https://cloud.google.com/compute/docs/reference/rest/alpha/addresses) For more information, see Reserving a static external IP address.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `address` | string | The static IP address represented by this resource. |
| `addressType` | string enum | The type of address to reserve, either INTERNAL orEXTERNAL. If unspecified, defaults to EXTERNAL. Values: `DNS_FORWARDING`, `EXTERNAL`, `INTERNAL`, `UNSPECIFIED_TYPE`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this field when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ipCollection` | string | Reference to the source of IP addresses. It supports the following cases: - Case 1: PublicDelegatedPrefix (PDP) for BYOIP external addresses. If an IPv4 PDP is used, the PDP must support enhanced IPv4 allocations. If an IPv6 PDP is used, the PDP must be in EXTERNAL_IPV6_FORWARDING_RULE_CREATION mode. - Case 2: Internal Range for global internal addresses. Use one of the following formats to specify the resource: For a Public Delegated Prefix: - Full resource URL:https://www.googleapis.com/compute/v1/projects/projectId/regions/region/publicDelegatedPrefixes/pdp - Partial URL: - projects/projectId/regions/region/publicDelegatedPrefixes/pdp-name - regions/region/publicDelegatedPrefixes/pdp-name For an Internal Range: - Full URL:https://networkconnectivity.googleapis.com/v1/projects/project/locations/global/internalRanges/internal-range - Partial URL:projects/project/locations/global/internalRanges/internal-range |
| `ipVersion` | string enum | The IP version that will be used by this address. Valid options areIPV4 or IPV6. Values: `IPV4`, `IPV6`, `UNSPECIFIED_VERSION`. |
| `ipv6EndpointType` | string enum | The endpoint type of this address, which should be VM or NETLB. This is used for deciding which type of endpoint this address can be used after the external IPv6 address reservation. Values: `NETLB`, `VM`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#address for addresses. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this Address, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an Address. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `network` | string | The URL of the network in which to reserve the address. This field can only be used with INTERNAL type with theVPC_PEERING purpose. |
| `networkAttachment` | string | Optional. The URL of the network attachment that this address comes from in the following format: projects/{project}/regions/{region_name}/networkAttachments/{network_attachment_name}. |
| `networkTier` | string enum | This signifies the networking tier used for configuring this address and can only take the following values: PREMIUM orSTANDARD. Internal IP addresses are always Premium Tier; global external IP addresses are always Premium Tier; regional external IP addresses can be either Standard or Premium Tier. If this field is not specified, it is assumed to be PREMIUM. Values: `FIXED_STANDARD`, `PREMIUM`, `SELECT`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `prefixLength` | integer (int32) | The prefix length if the resource represents an IP range. |
| `ptrDomainName` | string | The public DNS PTR record to be configured for this external IP. |
| `ptrDomainNameTtl` | integer (int32) | The TTL in seconds for public DNS PTR record. |
| `purpose` | string enum | The purpose of this resource, which can be one of the following values: - GCE_ENDPOINT for addresses that are used by VM instances, alias IP ranges, load balancers, and similar resources. - DNS_RESOLVER for a DNS resolver address in a subnetwork for a Cloud DNS inbound forwarder IP addresses (regional internal IP address in a subnet of a VPC network) - VPC_PEERING for global internal IP addresses used for private services access allocated ranges. - NAT_AUTO for the regional external IP addresses used by Cloud NAT when allocating addresses using automatic NAT IP address allocation. - IPSEC_INTERCONNECT for addresses created from a private IP range that are reserved for a VLAN attachment in an \*HA VPN over Cloud Interconnect\* configuration. These addresses are regional resources. - `SHARED_LOADBALANCER_VIP` for an internal IP address that is assigned to multiple internal forwarding rules. - `PRIVATE_SERVICE_CONNECT` for a private network address that is used to configure Private Service Connect. Only global internal addresses can use this purpose. - `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0` for addresses that can only be assigned to global external Passthrough Network Load Balancer forwarding rules, as an Availability Group 0 address. - `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1` for addresses that can only be assigned to global external Passthrough Network Load Balancer forwarding rules, as an Availability Group 1 address. Values: `APPLICATION_AND_PROXY_LOAD_BALANCERS`, `DNS_RESOLVER`, `GCE_ENDPOINT`, `IPSEC_INTERCONNECT`, `NAT_AUTO`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1`, `PRIVATE_SERVICE_CONNECT`, `SERVERLESS`, `SHARED_LOADBALANCER_VIP`, `SYSTEM_MANAGED`, `VPC_PEERING`. |
| `region` | string | Output only. \[Output Only\] The URL of the region where a regional address resides. For regional addresses, you must specify the region as a path parameter in the HTTP request URL. \*This field is not applicable to global addresses.\* |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `serviceClassId` | string | Optional. Producer Service's Service class ID for the region of this address. Can only be used with network_attachment. It is not possible to use on its own; however, network_attachment can be used without service_class_id. |
| `status` | string enum | Output only. \[Output Only\] The status of the address, which can be one ofRESERVING, RESERVED, or IN_USE. An address that is RESERVING is currently in the process of being reserved. A RESERVED address is currently reserved and available to use. An IN_USE address is currently being used by another resource and is not available. Values: `IN_USE`, `RESERVED`, `RESERVING`. |
| `subnetwork` | string | The URL of the subnetwork in which to reserve the address. If an IP address is specified, it must be within the subnetwork's IP range. This field can only be used with INTERNAL type with aGCE_ENDPOINT or DNS_RESOLVER purpose. |
| `users` | array<string> | \[Output Only\] The URLs of the resources that are using this address. |

### `Address` (beta)

- Represents an IP Address resource. Google Compute Engine has two IP Address resources: \* Global (external and internal) (https://cloud.google.com/compute/docs/reference/rest/beta/globalAddresses) \* Regional (external and internal) (https://cloud.google.com/compute/docs/reference/rest/beta/addresses) For more information, see Reserving a static external IP address.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `address` | string | The static IP address represented by this resource. |
| `addressType` | string enum | The type of address to reserve, either INTERNAL orEXTERNAL. If unspecified, defaults to EXTERNAL. Values: `EXTERNAL`, `INTERNAL`, `UNSPECIFIED_TYPE`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this field when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ipCollection` | string | Reference to the source of IP addresses. It supports the following cases: - Case 1: PublicDelegatedPrefix (PDP) for BYOIP external addresses. If an IPv4 PDP is used, the PDP must support enhanced IPv4 allocations. If an IPv6 PDP is used, the PDP must be in EXTERNAL_IPV6_FORWARDING_RULE_CREATION mode. - Case 2: Internal Range for global internal addresses. Use one of the following formats to specify the resource: For a Public Delegated Prefix: - Full resource URL:https://www.googleapis.com/compute/v1/projects/projectId/regions/region/publicDelegatedPrefixes/pdp - Partial URL: - projects/projectId/regions/region/publicDelegatedPrefixes/pdp-name - regions/region/publicDelegatedPrefixes/pdp-name For an Internal Range: - Full URL:https://networkconnectivity.googleapis.com/v1/projects/project/locations/global/internalRanges/internal-range - Partial URL:projects/project/locations/global/internalRanges/internal-range |
| `ipVersion` | string enum | The IP version that will be used by this address. Valid options areIPV4 or IPV6. Values: `IPV4`, `IPV6`, `UNSPECIFIED_VERSION`. |
| `ipv6EndpointType` | string enum | The endpoint type of this address, which should be VM or NETLB. This is used for deciding which type of endpoint this address can be used after the external IPv6 address reservation. Values: `NETLB`, `VM`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#address for addresses. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this Address, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an Address. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `network` | string | The URL of the network in which to reserve the address. This field can only be used with INTERNAL type with theVPC_PEERING purpose. |
| `networkTier` | string enum | This signifies the networking tier used for configuring this address and can only take the following values: PREMIUM orSTANDARD. Internal IP addresses are always Premium Tier; global external IP addresses are always Premium Tier; regional external IP addresses can be either Standard or Premium Tier. If this field is not specified, it is assumed to be PREMIUM. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `prefixLength` | integer (int32) | The prefix length if the resource represents an IP range. |
| `purpose` | string enum | The purpose of this resource, which can be one of the following values: - GCE_ENDPOINT for addresses that are used by VM instances, alias IP ranges, load balancers, and similar resources. - DNS_RESOLVER for a DNS resolver address in a subnetwork for a Cloud DNS inbound forwarder IP addresses (regional internal IP address in a subnet of a VPC network) - VPC_PEERING for global internal IP addresses used for private services access allocated ranges. - NAT_AUTO for the regional external IP addresses used by Cloud NAT when allocating addresses using automatic NAT IP address allocation. - IPSEC_INTERCONNECT for addresses created from a private IP range that are reserved for a VLAN attachment in an \*HA VPN over Cloud Interconnect\* configuration. These addresses are regional resources. - `SHARED_LOADBALANCER_VIP` for an internal IP address that is assigned to multiple internal forwarding rules. - `PRIVATE_SERVICE_CONNECT` for a private network address that is used to configure Private Service Connect. Only global internal addresses can use this purpose. - `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0` for addresses that can only be assigned to global external Passthrough Network Load Balancer forwarding rules, as an Availability Group 0 address. - `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1` for addresses that can only be assigned to global external Passthrough Network Load Balancer forwarding rules, as an Availability Group 1 address. Values: `DNS_RESOLVER`, `GCE_ENDPOINT`, `IPSEC_INTERCONNECT`, `NAT_AUTO`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1`, `PRIVATE_SERVICE_CONNECT`, `SERVERLESS`, `SHARED_LOADBALANCER_VIP`, `SYSTEM_MANAGED`, `VPC_PEERING`. |
| `region` | string | Output only. \[Output Only\] The URL of the region where a regional address resides. For regional addresses, you must specify the region as a path parameter in the HTTP request URL. \*This field is not applicable to global addresses.\* |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `status` | string enum | Output only. \[Output Only\] The status of the address, which can be one ofRESERVING, RESERVED, or IN_USE. An address that is RESERVING is currently in the process of being reserved. A RESERVED address is currently reserved and available to use. An IN_USE address is currently being used by another resource and is not available. Values: `IN_USE`, `RESERVED`, `RESERVING`. |
| `subnetwork` | string | The URL of the subnetwork in which to reserve the address. If an IP address is specified, it must be within the subnetwork's IP range. This field can only be used with INTERNAL type with aGCE_ENDPOINT or DNS_RESOLVER purpose. |
| `users` | array<string> | \[Output Only\] The URLs of the resources that are using this address. |

### `AddressAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of AddressesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#addressAggregatedList for aggregated lists of addresses. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `AddressList`

- Contains a list of addresses.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Address> | A list of Address resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#addressList for lists of addresses. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `AddressesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addresses` | array<Address> | \[Output Only\] A list of addresses contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of addresses when the list is empty. |

### `AdvancedMachineFeatures`

- Specifies options for controlling advanced machine features. Options that would traditionally be configured in a BIOS belong here. Features that require operating system support may have corresponding entries in the GuestOsFeatures of anImage (e.g., whether or not the OS in theImage supports nested virtualization being enabled or disabled).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableNestedVirtualization` | boolean | Whether to enable nested virtualization or not (default is false). |
| `enableUefiNetworking` | boolean | Whether to enable UEFI networking for instance creation. |
| `performanceMonitoringUnit` | string enum | Type of Performance Monitoring Unit requested on instance. Values: `ARCHITECTURAL`, `ENHANCED`, `PERFORMANCE_MONITORING_UNIT_UNSPECIFIED`, `STANDARD`. |
| `threadsPerCore` | integer (int32) | The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed. |
| `turboMode` | string | Turbo frequency mode to use for the instance. Supported modes include: \* ALL_CORE_MAX Using empty string or not setting this field will use the platform-specific default turbo mode. |
| `visibleCoreCount` | integer (int32) | The number of physical cores to expose to an instance. Multiply by the number of threads per core to compute the total number of virtual CPUs to expose to the instance. If unset, the number of cores is inferred from the instance's nominal CPU count and the underlying platform's SMT width. |

### `AdvancedMachineFeatures` (alpha)

- Specifies options for controlling advanced machine features. Options that would traditionally be configured in a BIOS belong here. Features that require operating system support may have corresponding entries in the GuestOsFeatures of anImage (e.g., whether or not the OS in theImage supports nested virtualization being enabled or disabled).
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `enableNestedVirtualization` | boolean | Whether to enable nested virtualization or not (default is false). |
| `enableUefiNetworking` | boolean | Whether to enable UEFI networking for instance creation. |
| `enableWatchdogTimer` | boolean | Whether to enable the watchdog timer. |
| `numaNodeCount` | integer (int32) | The number of vNUMA nodes. |
| `performanceMonitoringUnit` | string enum | Type of Performance Monitoring Unit requested on instance. Values: `ARCHITECTURAL`, `ENHANCED`, `PERFORMANCE_MONITORING_UNIT_UNSPECIFIED`, `STANDARD`. |
| `threadsPerCore` | integer (int32) | The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed. |
| `turboMode` | string | Turbo frequency mode to use for the instance. Supported modes include: \* ALL_CORE_MAX Using empty string or not setting this field will use the platform-specific default turbo mode. |
| `visibleCoreCount` | integer (int32) | The number of physical cores to expose to an instance. Multiply by the number of threads per core to compute the total number of virtual CPUs to expose to the instance. If unset, the number of cores is inferred from the instance's nominal CPU count and the underlying platform's SMT width. |

### `AliasIpRange`

- An alias IP range attached to an instance's network interface.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipCidrRange` | string | The IP alias ranges to allocate for this interface. This IP CIDR range must belong to the specified subnetwork and cannot contain IP addresses reserved by system or used by other network interfaces. This range may be a single IP address (such as 10.2.3.4), a netmask (such as/24) or a CIDR-formatted string (such as10.1.2.0/24). |
| `subnetworkRangeName` | string | The name of a subnetwork secondary IP range from which to allocate an IP alias range. If not specified, the primary range of the subnetwork is used. |

### `AliasIpRange` (beta)

- An alias IP range attached to an instance's network interface.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `candidateSubnetworkRangeNames` | array<string> | Identifies the candidate subnetwork range names for the alias IPs to be allocated from. When it is set, the IP would be allocated from any subnetwork range defined here if the IPs are available. Only one of subnetwork_range_name or candidate_subnetwork_range_names should be set. |
| `effectiveSubnetworkRangeName` | string | Output only. \[Output Only\] The subnetwork range name where the IP is allocated. It will be set to the subnetwork range where the IP is allocated only. |
| `ipCidrRange` | string | The IP alias ranges to allocate for this interface. This IP CIDR range must belong to the specified subnetwork and cannot contain IP addresses reserved by system or used by other network interfaces. This range may be a single IP address (such as 10.2.3.4), a netmask (such as/24) or a CIDR-formatted string (such as10.1.2.0/24). |
| `subnetworkRangeName` | string | The name of a subnetwork secondary IP range from which to allocate an IP alias range. If not specified, the primary range of the subnetwork is used. |

### `AliasNetworkEndpoint`

- Represents an Alias Network Endpoint resource. To be used for GKE pod-native endpoints in Andromeda.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `aliases` | object | Required. The map of network aliases allocated for the AliasNetworkEndpoint. This map is keyed with user-provided alias names. |
| `annotations` | object | Optional. The annotations map for the AliasNetworkEndpoint. Keys and values must follow Kubernetes limits. Keys must be a maximum of 253 characters. Keys should be dot-namespaced, following the Kubernetes annotation key format: `([DNS subdomain]/)?[RFC 1123 name]`. Values must be a maximum of 256 characters. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp in RFC3339 text format. |
| `description` | string | Optional. An optional description of this resource. Provide this field when you create the resource. |
| `host` | AliasNetworkEndpointHost | Required. The host that the alias network endpoint is bound to. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `labels` | object | Optional. The labels map for the AliasNetworkEndpoint. |
| `name` | string | Identifier. Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. |
| `securityTagInheritance` | string enum | Optional. The security tag inheritance setting for the AliasNetworkEndpoint. Values: `INHERITED`, `NOT_INHERITED`, `SECURITY_TAG_INHERITANCE_UNSPECIFIED`. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `status` | AliasNetworkEndpointStatus | Output only. \[Output Only\] Current status of the alias network endpoint. |
| `subnetwork` | string | Required. The URL of the subnetwork that this alias network endpoint belongs to. |
| `updateTime` | string | Output only. \[Output Only\] Update timestamp in RFC3339 text format. |

### `AliasNetworkEndpointAlias`

- Configuration for an IP alias.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `effectiveIpAddress` | string | Output only. \[Output Only\] The actual IP address allocated by the system. |
| `effectiveSubnetworkRangeName` | string | Output only. \[Output Only\] The actual secondary range used for allocation. |
| `ipAddress` | string | Input only. The IP address of the network endpoint. If specified, the server performs a validation check for uniqueness. If the field is omitted, the system automatically allocates an IP and populates the effective_ip_address field. |
| `ipVersion` | string enum | Required. The IP version of the IP. It is IPv4 or IPv6. Values: `IPV4`, `IPV6`, `IP_VERSION_UNSPECIFIED`. |
| `subnetworkRangeNames` | array<string> | Input only. Defines candidate secondary ranges for allocating the alias IPs. If it is empty, the IP would be allocated from the primary range of the subnetwork. This field is INPUT_ONLY and used only during resource creation, hence a repeated field is acceptable as per AIP-2825. It is not mutable. |

### `AliasNetworkEndpointHost`

- Information about the host instance.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `instance` | string | Required. The URL to the instance that this alias network endpoint is bound to. |

### `AliasNetworkEndpointList`

- Response message for AliasNetworkEndpoints.List.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `etag` | string | ETag of the resource list. |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<AliasNetworkEndpoint> | A list of AliasNetworkEndpoint resources. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `AliasNetworkEndpointStatus`

- Represents the current status of the AliasNetworkEndpoint.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `network` | string | Output only. \[Output Only\] The URL of the network that this alias network endpoint belongs to. |
| `state` | string enum | Output only. \[Output Only\] The state of the alias network endpoint. Values: `ACTIVE`, `CREATING`, `DELETING`, `FROZEN`, `STATE_UNSPECIFIED`. |

### `AllocationAggregateReservation`

- This reservation type is specified by total resource amounts (e.g. total count of CPUs) and can account for multiple instance SKUs. In other words, one can create instances of varying shapes against this reservation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inUseResources` | array<AllocationAggregateReservationReservedResourceInfo> | Output only. \[Output only\] List of resources currently in use. |
| `reservedResources` | array<AllocationAggregateReservationReservedResourceInfo> | List of reserved resources (CPUs, memory, accelerators). |
| `vmFamily` | string enum | The VM family that all instances scheduled against this reservation must belong to. Values: `VM_FAMILY_CLOUD_TPU_DEVICE_CT3`, `VM_FAMILY_CLOUD_TPU_LITE_DEVICE_CT5L`, `VM_FAMILY_CLOUD_TPU_LITE_POD_SLICE_CT5LP`, `VM_FAMILY_CLOUD_TPU_LITE_POD_SLICE_CT6E`, `VM_FAMILY_CLOUD_TPU_POD_SLICE_CT3P`, `VM_FAMILY_CLOUD_TPU_POD_SLICE_CT4P`, `VM_FAMILY_CLOUD_TPU_POD_SLICE_CT5P`, `VM_FAMILY_CLOUD_TPU_POD_SLICE_TPU7X`. |
| `workloadType` | string enum | The workload type of the instances that will target this reservation. Values: `BATCH`, `SERVING`, `UNSPECIFIED`. |

### `AllocationAggregateReservation` (beta)

- This reservation type is specified by total resource amounts (e.g. total count of CPUs) and can account for multiple instance SKUs. In other words, one can create instances of varying shapes against this reservation.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `hostCount` | integer (int32) | Count of reserved hosts of specified VM family. The host has fixed number of accelerators based on the accelerator/vm-family selected. |
| `inUseHostCount` | integer (int32) | Output only. Number of hosts currently in use. If there is one or more Instances running on the host, it is considered in use. |
| `inUseInstanceCount` | integer (int32) | Output only. Number of instances currently in use in this reservation. |
| `inUseResources` | array<AllocationAggregateReservationReservedResourceInfo> | Output only. \[Output only\] List of resources currently in use. |
| `reservedResources` | array<AllocationAggregateReservationReservedResourceInfo> | List of reserved resources (CPUs, memory, accelerators). |
| `vmFamily` | string enum | The VM family that all instances scheduled against this reservation must belong to. Values: `VM_FAMILY_CLOUD_TPU_DEVICE_CT3`, `VM_FAMILY_CLOUD_TPU_LITE_DEVICE_CT5L`, `VM_FAMILY_CLOUD_TPU_LITE_POD_SLICE_CT5LP`, `VM_FAMILY_CLOUD_TPU_LITE_POD_SLICE_CT6E`, `VM_FAMILY_CLOUD_TPU_POD_SLICE_CT3P`, `VM_FAMILY_CLOUD_TPU_POD_SLICE_CT4P`, `VM_FAMILY_CLOUD_TPU_POD_SLICE_CT5P`, `VM_FAMILY_CLOUD_TPU_POD_SLICE_TPU7X`. |
| `workloadType` | string enum | The workload type of the instances that will target this reservation. Values: `BATCH`, `SERVING`, `UNSPECIFIED`. |

### `AllocationAggregateReservationReservedResourceInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accelerator` | AllocationAggregateReservationReservedResourceInfoAccelerator | Properties of accelerator resources in this reservation. |

### `AllocationAggregateReservationReservedResourceInfoAccelerator`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorCount` | integer (int32) | Number of accelerators of specified type. |
| `acceleratorType` | string | Full or partial URL to accelerator type. e.g. "projects/{PROJECT}/zones/{ZONE}/acceleratorTypes/ct4l" |

### `AllocationReservationSharingPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceShareType` | string enum | Sharing config for all Google Cloud services. Values: `ALLOW_ALL`, `DISALLOW_ALL`, `SERVICE_SHARE_TYPE_UNSPECIFIED`. |

### `AllocationResourceStatus`

- \[Output Only\] Contains output only fields.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthInfo` | AllocationResourceStatusHealthInfo | \[Output only\] Health information for the reservation. |
| `reservationBlockCount` | integer (int32) | The number of reservation blocks associated with this reservation. |
| `reservationMaintenance` | GroupMaintenanceInfo | Maintenance information for this reservation |
| `specificSkuAllocation` | AllocationResourceStatusSpecificSKUAllocation | Allocation Properties of this reservation. |

### `AllocationResourceStatus` (alpha)

- \[Output Only\] Contains output only fields.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `aggregateAllocation` | AllocationResourceStatusAggregateAllocation | Properties of this aggregatereservation. |
| `healthInfo` | AllocationResourceStatusHealthInfo | \[Output only\] Health information for the reservation. |
| `reservationBlockCount` | integer (int32) | The number of reservation blocks associated with this reservation. |
| `reservationMaintenance` | GroupMaintenanceInfo | Maintenance information for this reservation |
| `specificSkuAllocation` | AllocationResourceStatusSpecificSKUAllocation | Allocation Properties of this reservation. |

### `AllocationResourceStatus` (preview)

- \[Output Only\] Contains output only fields.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `healthInfo` | AllocationResourceStatusHealthInfo | \[Output only\] Health information for the reservation. |
| `machineCount` | integer (int32) | The number of machines in the reservation. Only populated for families where machine to host ratio is not 1:1 such as TPU8i. |
| `reservationBlockCount` | integer (int32) | The number of reservation blocks associated with this reservation. |
| `reservationMaintenance` | GroupMaintenanceInfo | Maintenance information for this reservation |
| `specificSkuAllocation` | AllocationResourceStatusSpecificSKUAllocation | Allocation Properties of this reservation. |

### `AllocationResourceStatusAggregateAllocation`

- Contains Properties set for the aggregate reservation.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `utilizations` | object | Per service utilization breakdown. The Key is the Google Cloud managed service name. |

### `AllocationResourceStatusHealthInfo`

- Health information for the reservation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `degradedBlockCount` | integer (int32) | The number of reservation blocks that are degraded. |
| `healthStatus` | string enum | The health status of the reservation. Values: `DEGRADED`, `HEALTHY`, `HEALTH_STATUS_UNSPECIFIED`. |
| `healthyBlockCount` | integer (int32) | The number of reservation blocks that are healthy. |

### `AllocationResourceStatusSpecificSKUAllocation`

- Contains Properties set for the reservation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sourceInstanceTemplateId` | string | ID of the instance template used to populate reservation properties. |
| `utilizations` | object | Per service utilization breakdown. The Key is the Google Cloud managed service name. |

### `AllocationSpecificSKUAllocationAllocatedInstancePropertiesReservedDisk`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskSizeGb` | string (int64) | Specifies the size of the disk in base-2 GB. |
| `interface` | string enum | Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. The default isSCSI. For performance characteristics of SCSI over NVMe, seeLocal SSD performance. Values: `NVME`, `SCSI`. |

### `AllocationSpecificSKUAllocationReservedInstanceProperties`

- Properties of the SKU instances being reserved. Next ID: 10
- Version: v1

| Field | Type | Description |
|---|---|---|
| `guestAccelerators` | array<AcceleratorConfig> | Specifies accelerator type and count. |
| `localSsds` | array<AllocationSpecificSKUAllocationAllocatedInstancePropertiesReservedDisk> | Specifies amount of local ssd to reserve with each instance. The type of disk is local-ssd. |
| `locationHint` | string | An opaque location hint used to place the allocation close to other resources. This field is for use by internal tools that use the public API. |
| `machineType` | string | Specifies type of machine (name only) which has fixed number of vCPUs and fixed amount of memory. This also includes specifying custom machine type following custom-NUMBER_OF_CPUS-AMOUNT_OF_MEMORY pattern. |
| `minCpuPlatform` | string | Minimum cpu platform the reservation. |

### `AllocationSpecificSKUAllocationReservedInstanceProperties` (beta)

- Properties of the SKU instances being reserved. Next ID: 10
- Version: beta

| Field | Type | Description |
|---|---|---|
| `guestAccelerators` | array<AcceleratorConfig> | Specifies accelerator type and count. |
| `localSsds` | array<AllocationSpecificSKUAllocationAllocatedInstancePropertiesReservedDisk> | Specifies amount of local ssd to reserve with each instance. The type of disk is local-ssd. |
| `locationHint` | string | An opaque location hint used to place the allocation close to other resources. This field is for use by internal tools that use the public API. |
| `machineType` | string | Specifies type of machine (name only) which has fixed number of vCPUs and fixed amount of memory. This also includes specifying custom machine type following custom-NUMBER_OF_CPUS-AMOUNT_OF_MEMORY pattern. |
| `maintenanceFreezeDurationHours` | integer (int32) | Specifies the number of hours after reservation creation where instances using the reservation won't be scheduled for maintenance. |
| `maintenanceInterval` | string enum | Specifies the frequency of planned maintenance events. The accepted values are: `PERIODIC`. Values: `AS_NEEDED`, `PERIODIC`, `RECURRENT`. |
| `minCpuPlatform` | string | Minimum cpu platform the reservation. |

### `AllocationSpecificSKUReservation`

- This reservation type allows to pre allocate specific instance configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assuredCount` | string (int64) | Output only. \[Output Only\] Indicates how many instances are actually usable currently. |
| `count` | string (int64) | Specifies the number of resources that are allocated. |
| `inUseCount` | string (int64) | Output only. \[Output Only\] Indicates how many instances are in use. |
| `instanceProperties` | AllocationSpecificSKUAllocationReservedInstanceProperties | The instance properties for the reservation. |
| `sourceInstanceTemplate` | string | Specifies the instance template to create the reservation. If you use this field, you must exclude the instanceProperties field. This field is optional, and it can be a full or partial URL. For example, the following are all valid URLs to an instance template: - https://www.googleapis.com/compute/v1/projects/project/global/instanceTemplates/instanceTemplate - projects/project/global/instanceTemplates/instanceTemplate - global/instanceTemplates/instanceTemplate |

### `AsyncReplicationStatus`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `diskPairReplicationState` | DiskPairReplicationState | — |
| `lastReplicationDetails` | ReplicationDetails | — |

### `AttachedDisk`

- An instance-attached disk resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | Output only. \[Output Only\] The architecture of the attached disk. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `autoDelete` | boolean | Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance). |
| `boot` | boolean | Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem. |
| `deviceName` | string | Specifies a unique device name of your choice that is reflected into the/dev/disk/by-id/google-\* tree of a Linux operating system running within the instance. This name can be used to reference the device for mounting, resizing, and so on, from within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks. |
| `diskEncryptionKey` | CustomerEncryptionKey | Encrypts or decrypts a disk using acustomer-supplied encryption key. If you are creating a new disk, this field encrypts the new disk using an encryption key that you provide. If you are attaching an existing disk that is already encrypted, this field decrypts the disk using the customer-supplied encryption key. If you encrypt a disk using a customer-supplied key, you must provide the same key again when you attempt to use this resource at a later time. For example, you must provide the key when you create a snapshot or an image from the disk or when you attach the disk to a virtual machine instance. If you do not provide an encryption key, then the disk will be encrypted using an automatically generated key and you do not need to provide a key to use the disk later. Note: Instance templates do not storecustomer-supplied encryption keys, so you cannot use your own keys to encrypt disks in amanaged instance group. You cannot create VMs that have disks with customer-supplied keys using the bulk insert method. |
| `diskSizeGb` | string (int64) | The size of the disk in GB. |
| `forceAttach` | boolean | \[Input Only\] Whether to force attach the regional disk even if it's currently attached to another instance. If you try to force attach a zonal disk to an instance, you will receive an error. |
| `guestOsFeatures` | array<GuestOsFeature> | A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options. |
| `index` | integer (int32) | Output only. \[Output Only\] A zero-based index to this disk, where 0 is reserved for the boot disk. If you have many disks attached to an instance, each disk would have a unique index number. |
| `initializeParams` | AttachedDiskInitializeParams | \[Input Only\] Specifies the parameters for a new disk that will be created alongside the new instance. Use initialization parameters to create boot disks or local SSDs attached to the new instance. This property is mutually exclusive with the source property; you can only define one or the other, but not both. |
| `interface` | string enum | Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. For most machine types, the default is SCSI. Local SSDs can use either NVME or SCSI. In certain configurations, persistent disks can use NVMe. For more information, seeAbout persistent disks. Values: `NVME`, `SCSI`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#attachedDisk for attached disks. |
| `licenses` | array<string> | Output only. \[Output Only\] Any valid publicly visible licenses. |
| `mode` | string enum | The mode in which to attach this disk, either READ_WRITE orREAD_ONLY. If not specified, the default is to attach the disk in READ_WRITE mode. Values: `READ_ONLY`, `READ_WRITE`. |
| `savedState` | string enum | Output only. For LocalSSD disks on VM Instances in STOPPED or SUSPENDED state, this field is set to PRESERVED if the LocalSSD data has been saved to a persistent location by customer request. (see the discard_local_ssd option on Stop/Suspend). Read-only in the api. Values: `DISK_SAVED_STATE_UNSPECIFIED`, `PRESERVED`. |
| `shieldedInstanceInitialState` | InitialStateConfig | Output only. \[Output Only\] shielded vm initial state stored on disk |
| `source` | string | Specifies a valid partial or full URL to an existing Persistent Disk resource. When creating a new instance boot disk, one ofinitializeParams.sourceImage orinitializeParams.sourceSnapshot or disks.source is required. If desired, you can also attach existing non-root persistent disks using this property. This field is only applicable for persistent disks. Note that for InstanceTemplate, specify the disk name for zonal disk, and the URL for regional disk. |
| `type` | string enum | Specifies the type of the disk, either SCRATCH orPERSISTENT. If not specified, the default isPERSISTENT. Values: `PERSISTENT`, `SCRATCH`. |

### `AttachedDisk` (beta)

- An instance-attached disk resource.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | Output only. \[Output Only\] The architecture of the attached disk. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `autoDelete` | boolean | Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance). |
| `boot` | boolean | Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem. |
| `deviceName` | string | Specifies a unique device name of your choice that is reflected into the/dev/disk/by-id/google-\* tree of a Linux operating system running within the instance. This name can be used to reference the device for mounting, resizing, and so on, from within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks. |
| `diskEncryptionKey` | CustomerEncryptionKey | Encrypts or decrypts a disk using acustomer-supplied encryption key. If you are creating a new disk, this field encrypts the new disk using an encryption key that you provide. If you are attaching an existing disk that is already encrypted, this field decrypts the disk using the customer-supplied encryption key. If you encrypt a disk using a customer-supplied key, you must provide the same key again when you attempt to use this resource at a later time. For example, you must provide the key when you create a snapshot or an image from the disk or when you attach the disk to a virtual machine instance. If you do not provide an encryption key, then the disk will be encrypted using an automatically generated key and you do not need to provide a key to use the disk later. Note: Instance templates do not storecustomer-supplied encryption keys, so you cannot use your own keys to encrypt disks in amanaged instance group. You cannot create VMs that have disks with customer-supplied keys using the bulk insert method. |
| `diskSizeGb` | string (int64) | The size of the disk in GB. |
| `forceAttach` | boolean | \[Input Only\] Whether to force attach the regional disk even if it's currently attached to another instance. If you try to force attach a zonal disk to an instance, you will receive an error. |
| `guestOsFeatures` | array<GuestOsFeature> | A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options. |
| `index` | integer (int32) | Output only. \[Output Only\] A zero-based index to this disk, where 0 is reserved for the boot disk. If you have many disks attached to an instance, each disk would have a unique index number. |
| `initializeParams` | AttachedDiskInitializeParams | \[Input Only\] Specifies the parameters for a new disk that will be created alongside the new instance. Use initialization parameters to create boot disks or local SSDs attached to the new instance. This property is mutually exclusive with the source property; you can only define one or the other, but not both. |
| `interface` | string enum | Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. For most machine types, the default is SCSI. Local SSDs can use either NVME or SCSI. In certain configurations, persistent disks can use NVMe. For more information, seeAbout persistent disks. Values: `NVME`, `SCSI`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#attachedDisk for attached disks. |
| `licenses` | array<string> | Output only. \[Output Only\] Any valid publicly visible licenses. |
| `locked` | boolean | Output only. \[Output Only\] Whether to indicate the attached disk is locked. The locked disk is not allowed to be detached from the instance, or to be used as the source of the snapshot creation, and the image creation. The instance with at least one locked attached disk is not allow to be used as source of machine image creation, instant snapshot creation, and not allowed to be deleted with --keep-disk parameter set to true for locked disks. |
| `mode` | string enum | The mode in which to attach this disk, either READ_WRITE orREAD_ONLY. If not specified, the default is to attach the disk in READ_WRITE mode. Values: `READ_ONLY`, `READ_WRITE`. |
| `savedState` | string enum | Output only. For LocalSSD disks on VM Instances in STOPPED or SUSPENDED state, this field is set to PRESERVED if the LocalSSD data has been saved to a persistent location by customer request. (see the discard_local_ssd option on Stop/Suspend). Read-only in the api. Values: `DISK_SAVED_STATE_UNSPECIFIED`, `PRESERVED`. |
| `shieldedInstanceInitialState` | InitialStateConfig | Output only. \[Output Only\] shielded vm initial state stored on disk |
| `source` | string | Specifies a valid partial or full URL to an existing Persistent Disk resource. When creating a new instance boot disk, one ofinitializeParams.sourceImage orinitializeParams.sourceSnapshot or disks.source is required. If desired, you can also attach existing non-root persistent disks using this property. This field is only applicable for persistent disks. Note that for InstanceTemplate, specify the disk name for zonal disk, and the URL for regional disk. |
| `type` | string enum | Specifies the type of the disk, either SCRATCH orPERSISTENT. If not specified, the default isPERSISTENT. Values: `PERSISTENT`, `SCRATCH`. |

### `AttachedDiskInitializeParams`

- \[Input Only\] Specifies the parameters for a new disk that will be created alongside the new instance. Use initialization parameters to create boot disks or local SSDs attached to the new instance. This field is persisted and returned for instanceTemplate and not returned in the context of instance. This property is mutually exclusive with the source property; you can only define one or the other, but not both.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | The architecture of the attached disk. Valid values are arm64 or x86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `description` | string | An optional description. Provide this property when creating the disk. |
| `diskName` | string | Specifies the disk name. If not specified, the default is to use the name of the instance. If a disk with the same name already exists in the given region, the existing disk is attached to the new instance and the new disk is not created. |
| `diskSizeGb` | string (int64) | Specifies the size of the disk in base-2 GB. The size must be at least 10 GB. If you specify a sourceImage, which is required for boot disks, the default size is the size of the sourceImage. If you do not specify a sourceImage, the default disk size is 500 GB. |
| `diskType` | string | Specifies the disk type used for the boot disk or an additional data disk. For valid disk type values, see Supported types for Hyperdisk volumes and Persistent Disk type variables. When creating a single instance, you must provide either the full or partial URL of the disk type. For example, the following values are valid: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/diskTypes/diskType - projects/project/zones/zone/diskTypes/diskType - zones/zone/diskTypes/diskType When creating an instance template, instance flexibility policy, or when creating or updating an all-instances configuration, you specify the disk type without a URL, for example, hyperdisk-balanced. If you omit this field for a disk, the default disk type depends on the instance's machine series, as follows. - For first- and second-generation machine series like N1, N2, T2, and M1, the default disk type is Standard Persistent Disk (pd-standard). - For C3, C3D, and M3 the default is Balanced Persistent Disk (pd-balanced). - For other third-generation machine series like A3, H3, Z3, all fourth-generation types like C4, N4, M4, and newer machine series, the default is Hyperdisk Balanced (hyperdisk-balanced). The disk type you specify must be compatible with the instance's machine series. For a list of machine series that support Persistent Disk, see Machine series support for Persistent Disk. For a list of machine series that support Hyperdisk, seeMachine series support for Hyperdisk. |
| `enableConfidentialCompute` | boolean | Whether this disk is using confidential compute mode. |
| `labels` | object | Labels to apply to this disk. These can be later modified by thedisks.setLabels method. This field is only applicable for persistent disks. |
| `licenses` | array<string> | A list of publicly visible licenses. Reserved for Google's use. |
| `onUpdateAction` | string enum | Specifies which action to take on instance update with this disk. Default is to use the existing disk. Values: `RECREATE_DISK`, `RECREATE_DISK_IF_SOURCE_CHANGED`, `USE_EXISTING_DISK`. |
| `provisionedIops` | string (int64) | Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see theExtreme persistent disk documentation. |
| `provisionedThroughput` | string (int64) | Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must greater than or equal to 1. |
| `replicaZones` | array<string> | Required for each regional disk associated with the instance. Specify the URLs of the zones where the disk should be replicated to. You must provide exactly two replica zones, and one zone must be the same as the instance zone. |
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the disk. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |
| `resourcePolicies` | array<string> | Resource policies applied to this disk for automatic snapshot creations. Specified using the full or partial URL. For instance template, specify only the resource policy name. |
| `sourceImage` | string | The source image to create this disk. When creating a new instance boot disk, one of initializeParams.sourceImage orinitializeParams.sourceSnapshot or disks.source is required. To create a disk with one of the public operating system images, specify the image by its family name. For example, specifyfamily/debian-9 to use the latest Debian 9 image: projects/debian-cloud/global/images/family/debian-9 Alternatively, use a specific version of a public operating system image: projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD To create a disk with a custom image that you created, specify the image name in the following format: global/images/my-custom-image You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with family/family-name: global/images/family/my-image-family If the source image is deleted later, this field will not be set. |
| `sourceImageEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key. InstanceTemplate and InstancePropertiesPatch do not storecustomer-supplied encryption keys, so you cannot create disks for instances in a managed instance group if the source images are encrypted with your own keys. |
| `sourceSnapshot` | string | The source snapshot to create this disk. When creating a new instance boot disk, one of initializeParams.sourceSnapshot orinitializeParams.sourceImage or disks.source is required. To create a disk with a snapshot that you created, specify the snapshot name in the following format: global/snapshots/my-backup If the source snapshot is deleted later, this field will not be set. Note: You cannot create VMs in bulk using a snapshot as the source. Use an image instead when you create VMs using the bulk insert method. |
| `sourceSnapshotEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source snapshot. |
| `storagePool` | string | The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool - projects/project/zones/zone/storagePools/storagePool - zones/zone/storagePools/storagePool |

### `AttachedDiskInitializeParams` (alpha)

- \[Input Only\] Specifies the parameters for a new disk that will be created alongside the new instance. Use initialization parameters to create boot disks or local SSDs attached to the new instance. This field is persisted and returned for instanceTemplate and not returned in the context of instance. This property is mutually exclusive with the source property; you can only define one or the other, but not both.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | The architecture of the attached disk. Valid values are arm64 or x86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `description` | string | An optional description. Provide this property when creating the disk. |
| `diskName` | string | Specifies the disk name. If not specified, the default is to use the name of the instance. If a disk with the same name already exists in the given region, the existing disk is attached to the new instance and the new disk is not created. |
| `diskSizeGb` | string (int64) | Specifies the size of the disk in base-2 GB. The size must be at least 10 GB. If you specify a sourceImage, which is required for boot disks, the default size is the size of the sourceImage. If you do not specify a sourceImage, the default disk size is 500 GB. |
| `diskType` | string | Specifies the disk type used for the boot disk or an additional data disk. For valid disk type values, see Supported types for Hyperdisk volumes and Persistent Disk type variables. When creating a single instance, you must provide either the full or partial URL of the disk type. For example, the following values are valid: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/diskTypes/diskType - projects/project/zones/zone/diskTypes/diskType - zones/zone/diskTypes/diskType When creating an instance template, instance flexibility policy, or when creating or updating an all-instances configuration, you specify the disk type without a URL, for example, hyperdisk-balanced. If you omit this field for a disk, the default disk type depends on the instance's machine series, as follows. - For first- and second-generation machine series like N1, N2, T2, and M1, the default disk type is Standard Persistent Disk (pd-standard). - For C3, C3D, and M3 the default is Balanced Persistent Disk (pd-balanced). - For other third-generation machine series like A3, H3, Z3, all fourth-generation types like C4, N4, M4, and newer machine series, the default is Hyperdisk Balanced (hyperdisk-balanced). The disk type you specify must be compatible with the instance's machine series. For a list of machine series that support Persistent Disk, see Machine series support for Persistent Disk. For a list of machine series that support Hyperdisk, seeMachine series support for Hyperdisk. |
| `enableConfidentialCompute` | boolean | Whether this disk is using confidential compute mode. |
| `guestOsFeatures` | array<GuestOsFeature> | A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options. Guest OS features are applied by merginginitializeParams.guestOsFeatures anddisks.guestOsFeatures |
| `interface` | string enum | \[Deprecated\] Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. The default isSCSI. Values: `NVME`, `SCSI`, `UNSPECIFIED`. |
| `labels` | object | Labels to apply to this disk. These can be later modified by thedisks.setLabels method. This field is only applicable for persistent disks. |
| `licenseCodes` | array<string> | Integer license codes indicating which licenses are attached to this disk. |
| `licenses` | array<string> | A list of publicly visible licenses. Reserved for Google's use. |
| `multiWriter` | boolean | Indicates whether or not the disk can be read/write attached to more than one instance. |
| `onUpdateAction` | string enum | Specifies which action to take on instance update with this disk. Default is to use the existing disk. Values: `RECREATE_DISK`, `RECREATE_DISK_IF_SOURCE_CHANGED`, `USE_EXISTING_DISK`. |
| `provisionedIops` | string (int64) | Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see theExtreme persistent disk documentation. |
| `provisionedThroughput` | string (int64) | Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must greater than or equal to 1. |
| `replicaZones` | array<string> | Required for each regional disk associated with the instance. Specify the URLs of the zones where the disk should be replicated to. You must provide exactly two replica zones, and one zone must be the same as the instance zone. |
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the disk. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |
| `resourcePolicies` | array<string> | Resource policies applied to this disk for automatic snapshot creations. Specified using the full or partial URL. For instance template, specify only the resource policy name. |
| `sourceImage` | string | The source image to create this disk. When creating a new instance boot disk, one of initializeParams.sourceImage orinitializeParams.sourceSnapshot or disks.source is required. To create a disk with one of the public operating system images, specify the image by its family name. For example, specifyfamily/debian-9 to use the latest Debian 9 image: projects/debian-cloud/global/images/family/debian-9 Alternatively, use a specific version of a public operating system image: projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD To create a disk with a custom image that you created, specify the image name in the following format: global/images/my-custom-image You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with family/family-name: global/images/family/my-image-family If the source image is deleted later, this field will not be set. |
| `sourceImageEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key. InstanceTemplate and InstancePropertiesPatch do not storecustomer-supplied encryption keys, so you cannot create disks for instances in a managed instance group if the source images are encrypted with your own keys. |
| `sourceInstantSnapshot` | string | The source instant-snapshot to create this disk. When creating a new instance boot disk, one of initializeParams.sourceSnapshot or initializeParams.sourceInstantSnapshotinitializeParams.sourceImage or disks.source is required. To create a disk with a snapshot that you created, specify the snapshot name in the following format: us-central1-a/instantSnapshots/my-backup If the source instant-snapshot is deleted later, this field will not be set. |
| `sourceSnapshot` | string | The source snapshot to create this disk. When creating a new instance boot disk, one of initializeParams.sourceSnapshot orinitializeParams.sourceImage or disks.source is required. To create a disk with a snapshot that you created, specify the snapshot name in the following format: global/snapshots/my-backup If the source snapshot is deleted later, this field will not be set. Note: You cannot create VMs in bulk using a snapshot as the source. Use an image instead when you create VMs using the bulk insert method. |
| `sourceSnapshotEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source snapshot. |
| `storagePool` | string | The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool - projects/project/zones/zone/storagePools/storagePool - zones/zone/storagePools/storagePool |

### `AttachedDiskInitializeParams` (beta)

- \[Input Only\] Specifies the parameters for a new disk that will be created alongside the new instance. Use initialization parameters to create boot disks or local SSDs attached to the new instance. This field is persisted and returned for instanceTemplate and not returned in the context of instance. This property is mutually exclusive with the source property; you can only define one or the other, but not both.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | The architecture of the attached disk. Valid values are arm64 or x86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `description` | string | An optional description. Provide this property when creating the disk. |
| `diskName` | string | Specifies the disk name. If not specified, the default is to use the name of the instance. If a disk with the same name already exists in the given region, the existing disk is attached to the new instance and the new disk is not created. |
| `diskSizeGb` | string (int64) | Specifies the size of the disk in base-2 GB. The size must be at least 10 GB. If you specify a sourceImage, which is required for boot disks, the default size is the size of the sourceImage. If you do not specify a sourceImage, the default disk size is 500 GB. |
| `diskType` | string | Specifies the disk type used for the boot disk or an additional data disk. For valid disk type values, see Supported types for Hyperdisk volumes and Persistent Disk type variables. When creating a single instance, you must provide either the full or partial URL of the disk type. For example, the following values are valid: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/diskTypes/diskType - projects/project/zones/zone/diskTypes/diskType - zones/zone/diskTypes/diskType When creating an instance template, instance flexibility policy, or when creating or updating an all-instances configuration, you specify the disk type without a URL, for example, hyperdisk-balanced. If you omit this field for a disk, the default disk type depends on the instance's machine series, as follows. - For first- and second-generation machine series like N1, N2, T2, and M1, the default disk type is Standard Persistent Disk (pd-standard). - For C3, C3D, and M3 the default is Balanced Persistent Disk (pd-balanced). - For other third-generation machine series like A3, H3, Z3, all fourth-generation types like C4, N4, M4, and newer machine series, the default is Hyperdisk Balanced (hyperdisk-balanced). The disk type you specify must be compatible with the instance's machine series. For a list of machine series that support Persistent Disk, see Machine series support for Persistent Disk. For a list of machine series that support Hyperdisk, seeMachine series support for Hyperdisk. |
| `enableConfidentialCompute` | boolean | Whether this disk is using confidential compute mode. |
| `guestOsFeatures` | array<GuestOsFeature> | A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options. Guest OS features are applied by merginginitializeParams.guestOsFeatures anddisks.guestOsFeatures |
| `labels` | object | Labels to apply to this disk. These can be later modified by thedisks.setLabels method. This field is only applicable for persistent disks. |
| `licenses` | array<string> | A list of publicly visible licenses. Reserved for Google's use. |
| `multiWriter` | boolean | Indicates whether or not the disk can be read/write attached to more than one instance. |
| `onUpdateAction` | string enum | Specifies which action to take on instance update with this disk. Default is to use the existing disk. Values: `RECREATE_DISK`, `RECREATE_DISK_IF_SOURCE_CHANGED`, `USE_EXISTING_DISK`. |
| `provisionedIops` | string (int64) | Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see theExtreme persistent disk documentation. |
| `provisionedThroughput` | string (int64) | Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must greater than or equal to 1. |
| `replicaZones` | array<string> | Required for each regional disk associated with the instance. Specify the URLs of the zones where the disk should be replicated to. You must provide exactly two replica zones, and one zone must be the same as the instance zone. |
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the disk. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |
| `resourcePolicies` | array<string> | Resource policies applied to this disk for automatic snapshot creations. Specified using the full or partial URL. For instance template, specify only the resource policy name. |
| `sourceImage` | string | The source image to create this disk. When creating a new instance boot disk, one of initializeParams.sourceImage orinitializeParams.sourceSnapshot or disks.source is required. To create a disk with one of the public operating system images, specify the image by its family name. For example, specifyfamily/debian-9 to use the latest Debian 9 image: projects/debian-cloud/global/images/family/debian-9 Alternatively, use a specific version of a public operating system image: projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD To create a disk with a custom image that you created, specify the image name in the following format: global/images/my-custom-image You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with family/family-name: global/images/family/my-image-family If the source image is deleted later, this field will not be set. |
| `sourceImageEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key. InstanceTemplate and InstancePropertiesPatch do not storecustomer-supplied encryption keys, so you cannot create disks for instances in a managed instance group if the source images are encrypted with your own keys. |
| `sourceInstantSnapshot` | string | The source instant-snapshot to create this disk. When creating a new instance boot disk, one of initializeParams.sourceSnapshot or initializeParams.sourceInstantSnapshotinitializeParams.sourceImage or disks.source is required. To create a disk with a snapshot that you created, specify the snapshot name in the following format: us-central1-a/instantSnapshots/my-backup If the source instant-snapshot is deleted later, this field will not be set. |
| `sourceSnapshot` | string | The source snapshot to create this disk. When creating a new instance boot disk, one of initializeParams.sourceSnapshot orinitializeParams.sourceImage or disks.source is required. To create a disk with a snapshot that you created, specify the snapshot name in the following format: global/snapshots/my-backup If the source snapshot is deleted later, this field will not be set. Note: You cannot create VMs in bulk using a snapshot as the source. Use an image instead when you create VMs using the bulk insert method. |
| `sourceSnapshotEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source snapshot. |
| `storagePool` | string | The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool - projects/project/zones/zone/storagePools/storagePool - zones/zone/storagePools/storagePool |

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `ADMIN_READ`, `DATA_READ`, `DATA_WRITE`, `LOG_TYPE_UNSPECIFIED`. |

### `AuthenticationConfig`

- Authentication configuration for the management interface, typically using mTLS.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `trustConfig` | string | Required. Resource name of the Cloud Certificate Manager TrustConfig used to validate client certificates for mTLS. Format: projects/{project}/locations/{location}/trustConfigs/{trust_config} |

### `AuthenticationPolicy`

- \[Deprecated\] The authentication settings for the backend service. The authentication settings for the backend service.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `origins` | array<OriginAuthenticationMethod> | List of authentication methods that can be used for origin authentication. Similar to peers, these will be evaluated in order the first valid one will be used to set origin identity. If none of these methods pass, the request will be rejected with authentication failed error (401). Leave the list empty if origin authentication is not required. |
| `peers` | array<PeerAuthenticationMethod> | List of authentication methods that can be used for peer authentication. They will be evaluated in order the first valid one will be used to set peer identity. If none of these methods pass, the request will be rejected with authentication failed error (401). Leave the list empty if peer authentication is not required. |
| `principalBinding` | string enum | Define whether peer or origin identity should be used for principal. Default value is USE_PEER. If peer (or origin) identity is not available, either because peer/origin authentication is not defined, or failed, principal will be left unset. In other words, binding rule does not affect the decision to accept or reject request. This field can be set to one of the following: USE_PEER: Principal will be set to the identity from peer authentication. USE_ORIGIN: Principal will be set to the identity from origin authentication. Values: `INVALID`, `USE_ORIGIN`, `USE_PEER`. |
| `serverTlsContext` | TlsContext | Configures the mechanism to obtain server-side security certificates and identity information. |

### `AuthorizationConfig`

- \[Deprecated\] Authorization configuration provides service-level and method-level access control for a service. control for a service.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `policies` | array<RbacPolicy> | List of RbacPolicies. |

### `Autoscaler`

- Represents an Autoscaler resource. Google Compute Engine has two Autoscaler resources: \* Zonal \* Regional Use autoscalers to automatically add or delete instances from a managed instance group according to your defined autoscaling policy. For more information, read Autoscaling Groups of Instances. For zonal managed instance groups resource, use the autoscaler resource. For regional managed instance groups, use theregionAutoscalers resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoscalingPolicy` | AutoscalingPolicy | The configuration parameters for the autoscaling algorithm. You can define one or more signals for an autoscaler: cpuUtilization,customMetricUtilizations, andloadBalancingUtilization. If none of these are specified, the default will be to autoscale based oncpuUtilization to 0.6 or 60%. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#autoscaler for autoscalers. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `recommendedSize` | integer (int32) | Output only. \[Output Only\] Target recommended MIG size (number of instances) computed by autoscaler. Autoscaler calculates the recommended MIG size even when the autoscaling policy mode is different from ON. This field is empty when autoscaler is not connected to an existing managed instance group or autoscaler did not generate its prediction. |
| `region` | string | Output only. \[Output Only\] URL of theregion where the instance group resides (for autoscalers living in regional scope). |
| `scalingScheduleStatus` | object | Output only. \[Output Only\] Status information of existing scaling schedules. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `status` | string enum | \[Output Only\] The status of the autoscaler configuration. Current set of possible values: - PENDING: Autoscaler backend hasn't read new/updated configuration. - DELETING: Configuration is being deleted. - ACTIVE: Configuration is acknowledged to be effective. Some warnings might be present in the statusDetails field. - ERROR: Configuration has errors. Actionable for users. Details are present in the statusDetails field. New values might be added in the future. Values: `ACTIVE`, `DELETING`, `ERROR`, `PENDING`. |
| `statusDetails` | array<AutoscalerStatusDetails> | \[Output Only\] Human-readable details about the current state of the autoscaler. Read the documentation forCommonly returned status messages for examples of status messages you might encounter. |
| `target` | string | URL of the managed instance group that this autoscaler will scale. This field is required when creating an autoscaler. |
| `zone` | string | Output only. \[Output Only\] URL of thezone where the instance group resides (for autoscalers living in zonal scope). |

### `Autoscaler` (alpha)

- Represents an Autoscaler resource. Google Compute Engine has two Autoscaler resources: \* Zonal \* Regional Use autoscalers to automatically add or delete instances from a managed instance group according to your defined autoscaling policy. For more information, read Autoscaling Groups of Instances. For zonal managed instance groups resource, use the autoscaler resource. For regional managed instance groups, use theregionAutoscalers resource.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `autoscalingPolicy` | AutoscalingPolicy | The configuration parameters for the autoscaling algorithm. You can define one or more signals for an autoscaler: cpuUtilization,customMetricUtilizations, andloadBalancingUtilization. If none of these are specified, the default will be to autoscale based oncpuUtilization to 0.6 or 60%. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#autoscaler for autoscalers. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `recommendedSize` | integer (int32) | Output only. \[Output Only\] Target recommended MIG size (number of instances) computed by autoscaler. Autoscaler calculates the recommended MIG size even when the autoscaling policy mode is different from ON. This field is empty when autoscaler is not connected to an existing managed instance group or autoscaler did not generate its prediction. |
| `region` | string | Output only. \[Output Only\] URL of theregion where the instance group resides (for autoscalers living in regional scope). |
| `scalingScheduleStatus` | object | Output only. \[Output Only\] Status information of existing scaling schedules. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `status` | string enum | \[Output Only\] The status of the autoscaler configuration. Current set of possible values: - PENDING: Autoscaler backend hasn't read new/updated configuration. - DELETING: Configuration is being deleted. - ACTIVE: Configuration is acknowledged to be effective. Some warnings might be present in the statusDetails field. - ERROR: Configuration has errors. Actionable for users. Details are present in the statusDetails field. New values might be added in the future. Values: `ACTIVE`, `DELETING`, `ERROR`, `PENDING`. |
| `statusDetails` | array<AutoscalerStatusDetails> | \[Output Only\] Human-readable details about the current state of the autoscaler. Read the documentation forCommonly returned status messages for examples of status messages you might encounter. |
| `target` | string | URL of the managed instance group that this autoscaler will scale. This field is required when creating an autoscaler. |
| `zone` | string | Output only. \[Output Only\] URL of thezone where the instance group resides (for autoscalers living in zonal scope). |

### `AutoscalerAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of AutoscalersScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#autoscalerAggregatedList for aggregated lists of autoscalers. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `AutoscalerList`

- Contains a list of Autoscaler resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Autoscaler> | A list of Autoscaler resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#autoscalerList for lists of autoscalers. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `AutoscalerStatusDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | The status message. |
| `type` | string enum | The type of error, warning, or notice returned. Current set of possible values: - ALL_INSTANCES_UNHEALTHY (WARNING): All instances in the instance group are unhealthy (not in RUNNING state). - BACKEND_SERVICE_DOES_NOT_EXIST (ERROR): There is no backend service attached to the instance group. - CAPPED_AT_MAX_NUM_REPLICAS (WARNING): Autoscaler recommends a size greater than maxNumReplicas. - CUSTOM_METRIC_DATA_POINTS_TOO_SPARSE (WARNING): The custom metric samples are not exported often enough to be a credible base for autoscaling. - CUSTOM_METRIC_INVALID (ERROR): The custom metric that was specified does not exist or does not have the necessary labels. - MIN_EQUALS_MAX (WARNING): The minNumReplicas is equal to maxNumReplicas. This means the autoscaler cannot add or remove instances from the instance group. - MISSING_CUSTOM_METRIC_DATA_POINTS (WARNING): The autoscaler did not receive any data from the custom metric configured for autoscaling. - MISSING_LOAD_BALANCING_DATA_POINTS (WARNING): The autoscaler is configured to scale based on a load balancing signal but the instance group has not received any requests from the load balancer. - MODE_OFF (WARNING): Autoscaling is turned off. The number of instances in the group won't change automatically. The autoscaling configuration is preserved. - MODE_ONLY_UP (WARNING): Autoscaling is in the "Autoscale only out" mode. The autoscaler can add instances but not remove any. - MORE_THAN_ONE_BACKEND_SERVICE (ERROR): The instance group cannot be autoscaled because it has more than one backend service attached to it. - NOT_ENOUGH_QUOTA_AVAILABLE (ERROR): There is insufficient quota for the necessary resources, such as CPU or number of instances. - REGION_RESOURCE_STOCKOUT (ERROR): Shown only for regional autoscalers: there is a resource stockout in the chosen region. - SCALING_TARGET_DOES_NOT_EXIST (ERROR): The target to be scaled does not exist. - UNSUPPORTED_MAX_RATE_LOAD_BALANCING_CONFIGURATION (ERROR): Autoscaling does not work with an HTTP/S load balancer that has been configured for maxRate. - ZONE_RESOURCE_STOCKOUT (ERROR): For zonal autoscalers: there is a resource stockout in the chosen zone. For regional autoscalers: in at least one of the zones you're using there is a resource stockout. New values might be added in the future. Some of the values might not be available in all API versions. Values: `ALL_INSTANCES_UNHEALTHY`, `BACKEND_SERVICE_DOES_NOT_EXIST`, `CAPPED_AT_MAX_NUM_REPLICAS`, `CUSTOM_METRIC_DATA_POINTS_TOO_SPARSE`, `CUSTOM_METRIC_INVALID`, `MIN_EQUALS_MAX`, `MISSING_CUSTOM_METRIC_DATA_POINTS`, `MISSING_LOAD_BALANCING_DATA_POINTS`, `MODE_OFF`, `MODE_ONLY_SCALE_OUT`, `MODE_ONLY_UP`, `MORE_THAN_ONE_BACKEND_SERVICE`, `NOT_ENOUGH_QUOTA_AVAILABLE`, `REGION_RESOURCE_STOCKOUT`, `SCALING_TARGET_DOES_NOT_EXIST`, `SCHEDULED_INSTANCES_GREATER_THAN_AUTOSCALER_MAX`, `SCHEDULED_INSTANCES_LESS_THAN_AUTOSCALER_MIN`, `UNKNOWN`, `UNSUPPORTED_MAX_RATE_LOAD_BALANCING_CONFIGURATION`, `ZONE_RESOURCE_STOCKOUT`. |

### `AutoscalersScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoscalers` | array<Autoscaler> | \[Output Only\] A list of autoscalers contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of autoscalers when the list is empty. |

### `AutoscalingPolicy`

- Cloud Autoscaler policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `coolDownPeriodSec` | integer (int32) | The number of seconds that your application takes to initialize on a VM instance. This is referred to as the initialization period. Specifying an accurate initialization period improves autoscaler decisions. For example, when scaling out, the autoscaler ignores data from VMs that are still initializing because those VMs might not yet represent normal usage of your application. The default initialization period is 60 seconds. Initialization periods might vary because of numerous factors. We recommend that you test how long your application takes to initialize. To do this, create a VM and time your application's startup process. |
| `cpuUtilization` | AutoscalingPolicyCpuUtilization | Defines the CPU utilization policy that allows the autoscaler to scale based on the average CPU utilization of a managed instance group. |
| `customMetricUtilizations` | array<AutoscalingPolicyCustomMetricUtilization> | Configuration parameters of autoscaling based on a custom metric. |
| `loadBalancingUtilization` | AutoscalingPolicyLoadBalancingUtilization | Configuration parameters of autoscaling based on load balancer. |
| `maxNumReplicas` | integer (int32) | The maximum number of instances that the autoscaler can scale out to. This is required when creating or updating an autoscaler. The maximum number of replicas must not be lower than minimal number of replicas. |
| `minNumReplicas` | integer (int32) | The minimum number of replicas that the autoscaler can scale in to. This cannot be less than 0. If not provided, autoscaler chooses a default value depending on maximum number of instances allowed. |
| `mode` | string enum | Defines the operating mode for this policy. The following modes are available: - OFF: Disables the autoscaler but maintains its configuration. - ONLY_SCALE_OUT: Restricts the autoscaler to add VM instances only. - ON: Enables all autoscaler activities according to its policy. For more information, see "Turning off or restricting an autoscaler" Values: `OFF`, `ON`, `ONLY_SCALE_OUT`, `ONLY_UP`. |
| `scaleInControl` | AutoscalingPolicyScaleInControl | — |
| `scalingSchedules` | object | Scaling schedules defined for an autoscaler. Multiple schedules can be set on an autoscaler, and they can overlap. During overlapping periods the greatest min_required_replicas of all scaling schedules is applied. Up to 128 scaling schedules are allowed. |
| `stabilizationPeriodSec` | integer (int32) | The number of seconds that autoscaler waits for load stabilization before making scale-in decisions. This is referred to as the stabilization period. This might appear as a delay in scaling in but it is an important mechanism for your application to not have fluctuating size due to short term load fluctuations. The default stabilization period is 600 seconds. |

### `AutoscalingPolicy` (beta)

- Cloud Autoscaler policy.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `coolDownPeriodSec` | integer (int32) | The number of seconds that your application takes to initialize on a VM instance. This is referred to as the initialization period. Specifying an accurate initialization period improves autoscaler decisions. For example, when scaling out, the autoscaler ignores data from VMs that are still initializing because those VMs might not yet represent normal usage of your application. The default initialization period is 60 seconds. Initialization periods might vary because of numerous factors. We recommend that you test how long your application takes to initialize. To do this, create a VM and time your application's startup process. |
| `cpuUtilization` | AutoscalingPolicyCpuUtilization | Defines the CPU utilization policy that allows the autoscaler to scale based on the average CPU utilization of a managed instance group. |
| `customMetricUtilizations` | array<AutoscalingPolicyCustomMetricUtilization> | Configuration parameters of autoscaling based on a custom metric. |
| `loadBalancingUtilization` | AutoscalingPolicyLoadBalancingUtilization | Configuration parameters of autoscaling based on load balancer. |
| `maxNumReplicas` | integer (int32) | The maximum number of instances that the autoscaler can scale out to. This is required when creating or updating an autoscaler. The maximum number of replicas must not be lower than minimal number of replicas. |
| `minNumReplicas` | integer (int32) | The minimum number of replicas that the autoscaler can scale in to. This cannot be less than 0. If not provided, autoscaler chooses a default value depending on maximum number of instances allowed. |
| `mode` | string enum | Defines the operating mode for this policy. The following modes are available: - OFF: Disables the autoscaler but maintains its configuration. - ONLY_SCALE_OUT: Restricts the autoscaler to add VM instances only. - ON: Enables all autoscaler activities according to its policy. For more information, see "Turning off or restricting an autoscaler" Values: `OFF`, `ON`, `ONLY_SCALE_OUT`, `ONLY_UP`. |
| `scaleDownControl` | AutoscalingPolicyScaleDownControl | — |
| `scaleInControl` | AutoscalingPolicyScaleInControl | — |
| `scalingSchedules` | object | Scaling schedules defined for an autoscaler. Multiple schedules can be set on an autoscaler, and they can overlap. During overlapping periods the greatest min_required_replicas of all scaling schedules is applied. Up to 128 scaling schedules are allowed. |
| `stabilizationPeriodSec` | integer (int32) | The number of seconds that autoscaler waits for load stabilization before making scale-in decisions. This is referred to as the stabilization period. This might appear as a delay in scaling in but it is an important mechanism for your application to not have fluctuating size due to short term load fluctuations. The default stabilization period is 600 seconds. |

### `AutoscalingPolicyCpuUtilization`

- CPU utilization policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `predictiveMethod` | string enum | Indicates whether predictive autoscaling based on CPU metric is enabled. Valid values are: \* NONE (default). No predictive method is used. The autoscaler scales the group to meet current demand based on real-time metrics. \* OPTIMIZE_AVAILABILITY. Predictive autoscaling improves availability by monitoring daily and weekly load patterns and scaling out ahead of anticipated demand. Values: `NONE`, `OPTIMIZE_AVAILABILITY`. |
| `utilizationTarget` | number (double) | The target CPU utilization that the autoscaler maintains. Must be a float value in the range (0, 1\]. If not specified, the default is0.6. If the CPU level is below the target utilization, the autoscaler scales in the number of instances until it reaches the minimum number of instances you specified or until the average CPU of your instances reaches the target utilization. If the average CPU is above the target utilization, the autoscaler scales out until it reaches the maximum number of instances you specified or until the average utilization reaches the target utilization. |

### `AutoscalingPolicyCpuUtilization` (alpha)

- CPU utilization policy.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `predictiveMethod` | string enum | Indicates whether predictive autoscaling based on CPU metric is enabled. Valid values are: \* NONE (default). No predictive method is used. The autoscaler scales the group to meet current demand based on real-time metrics. \* OPTIMIZE_AVAILABILITY. Predictive autoscaling improves availability by monitoring daily and weekly load patterns and scaling out ahead of anticipated demand. Values: `NONE`, `OPTIMIZE_AVAILABILITY`, `PREDICTIVE_METHOD_UNSPECIFIED`, `STANDARD`. |
| `signalAggregation` | AutoscalingPolicySignalAggregation | Defines how CPU utilization is aggregated in a group. Operates on the results from the `time_aggregation`, reducing the per-instance values down to a single aggregate value across the entire instance group if samples are available. |
| `timeAggregation` | AutoscalingPolicyTimeAggregation | Defines how CPU utilization is aggregated over time. Operates on all CPU utilization samples produced by each instance over the `time_aggregation.time_window_sec`, reducing them to exactly one value per instance if samples are available. |
| `utilizationMax` | number (double) | The upper bound of the utilization range. Must be a float value in the range ('utilization_min', 1\]. A value of 0.0 is equivalent to leaving the field unset. |
| `utilizationMin` | number (double) | The lower bound of the utilization range. Must be a float value in the range (0, 'utilization_max'\]. A value of 0.0 is equivalent to leaving the field unset. |
| `utilizationRange` | UtilizationRange | Defines a target range for CPU utilization. The values of `min_utilization` and `max_utilization` must be in the range (0.0, 1.0\]. If the average CPU is between `min_utilization` and `max_utilization`, the autoscaler maintains the current size unless another configured metric requires scaling out. If the average CPU is above `max_utilization`, the autoscaler scales out until the average utilization reaches the `utilization_range.utilization_target`. If the average CPU is below `min_utilization`, the autoscaler considers scaling in until the average utilization reaches the `utilization_range.utilization_target`. Scaling in can occur only if all other configured scaling metrics also suggest scaling in. At most one of CpuUtilization.utilization_target or CpuUtilization.utilization_range can be set. |
| `utilizationTarget` | number (double) | The target CPU utilization that the autoscaler maintains. Must be a float value in the range (0, 1\]. If not specified, the default is0.6. If the CPU level is below the target utilization, the autoscaler scales in the number of instances until it reaches the minimum number of instances you specified or until the average CPU of your instances reaches the target utilization. If the average CPU is above the target utilization, the autoscaler scales out until it reaches the maximum number of instances you specified or until the average utilization reaches the target utilization. |

### `AutoscalingPolicyCpuUtilization` (preview)

- CPU utilization policy.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `predictiveMethod` | string enum | Indicates whether predictive autoscaling based on CPU metric is enabled. Valid values are: \* NONE (default). No predictive method is used. The autoscaler scales the group to meet current demand based on real-time metrics. \* OPTIMIZE_AVAILABILITY. Predictive autoscaling improves availability by monitoring daily and weekly load patterns and scaling out ahead of anticipated demand. Values: `NONE`, `OPTIMIZE_AVAILABILITY`. |
| `utilizationMax` | number (double) | The upper bound of the utilization range. Must be a float value in the range ('utilization_min', 1\]. A value of 0.0 is equivalent to leaving the field unset. |
| `utilizationMin` | number (double) | The lower bound of the utilization range. Must be a float value in the range (0, 'utilization_max'\]. A value of 0.0 is equivalent to leaving the field unset. |
| `utilizationTarget` | number (double) | The target CPU utilization that the autoscaler maintains. Must be a float value in the range (0, 1\]. If not specified, the default is0.6. If the CPU level is below the target utilization, the autoscaler scales in the number of instances until it reaches the minimum number of instances you specified or until the average CPU of your instances reaches the target utilization. If the average CPU is above the target utilization, the autoscaler scales out until it reaches the maximum number of instances you specified or until the average utilization reaches the target utilization. |

### `AutoscalingPolicyCustomMetricUtilization`

- Custom utilization metric policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filter` | string | A filter string, compatible with a Stackdriver Monitoringfilter string forTimeSeries.list API call. This filter is used to select a specific TimeSeries for the purpose of autoscaling and to determine whether the metric is exporting per-instance or per-group data. For the filter to be valid for autoscaling purposes, the following rules apply: - You can only use the AND operator for joining selectors. - You can only use direct equality comparison operator (=) without any functions for each selector. - You can specify the metric in both the filter string and in the metric field. However, if specified in both places, the metric must be identical. - The monitored resource type determines what kind of values are expected for the metric. If it is a gce_instance, the autoscaler expects the metric to include a separate TimeSeries for each instance in a group. In such a case, you cannot filter on resource labels. If the resource type is any other value, the autoscaler expects this metric to contain values that apply to the entire autoscaled instance group and resource label filtering can be performed to point autoscaler at the correct TimeSeries to scale upon. This is called a \*per-group metric\* for the purpose of autoscaling. If not specified, the type defaults to gce_instance. Try to provide a filter that is selective enough to pick just one TimeSeries for the autoscaled group or for each of the instances (if you are using gce_instance resource type). If multiple TimeSeries are returned upon the query execution, the autoscaler will sum their respective values to obtain its scaling value. |
| `metric` | string | The identifier (type) of the Stackdriver Monitoring metric. The metric cannot have negative values. The metric must have a value type of INT64 orDOUBLE. |
| `singleInstanceAssignment` | number (double) | If scaling is based on a per-group metric value that represents the total amount of work to be done or resource usage, set this value to an amount assigned for a single instance of the scaled group. Autoscaler keeps the number of instances proportional to the value of this metric. The metric itself does not change value due to group resizing. A good metric to use with the target is for examplepubsub.googleapis.com/subscription/num_undelivered_messages or a custom metric exporting the total number of requests coming to your instances. A bad example would be a metric exporting an average or median latency, since this value can't include a chunk assignable to a single instance, it could be better used with utilization_target instead. |
| `utilizationTarget` | number (double) | The target value of the metric that autoscaler maintains. This must be a positive value. A utilization metric scales number of virtual machines handling requests to increase or decrease proportionally to the metric. For example, a good metric to use as a utilization_target ishttps://www.googleapis.com/compute/v1/instance/network/received_bytes_count. The autoscaler works to keep this value constant for each of the instances. |
| `utilizationTargetType` | string enum | Defines how target utilization value is expressed for a Stackdriver Monitoring metric. Either GAUGE,DELTA_PER_SECOND, or DELTA_PER_MINUTE. Values: `DELTA_PER_MINUTE`, `DELTA_PER_SECOND`, `GAUGE`. |

### `AutoscalingPolicyLoadBalancingUtilization`

- Configuration parameters of autoscaling based on load balancing.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `utilizationTarget` | number (double) | Fraction of backend capacity utilization (set in HTTP(S) load balancing configuration) that the autoscaler maintains. Must be a positive float value. If not defined, the default is 0.8. |

### `AutoscalingPolicyScaleDownControl`

- Configuration that allows for slower scale in so that even if Autoscaler recommends an abrupt scale in of a MIG, it will be throttled as specified by the parameters below.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `maxScaledDownReplicas` | FixedOrPercent | Maximum allowed number (or %) of VMs that can be deducted from the peak recommendation during the window autoscaler looks at when computing recommendations. Possibly all these VMs can be deleted at once so user service needs to be prepared to lose that many VMs in one step. |
| `timeWindowSec` | integer (int32) | How far back autoscaling looks when computing recommendations to include directives regarding slower scale in, as described above. |

### `AutoscalingPolicyScaleInControl`

- Configuration that allows for slower scale in so that even if Autoscaler recommends an abrupt scale in of a MIG, it will be throttled as specified by the parameters below.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxScaledInReplicas` | FixedOrPercent | Maximum allowed number (or %) of VMs that can be deducted from the peak recommendation during the window autoscaler looks at when computing recommendations. Possibly all these VMs can be deleted at once so user service needs to be prepared to lose that many VMs in one step. |
| `timeWindowSec` | integer (int32) | How far back autoscaling looks when computing recommendations to include directives regarding slower scale in, as described above. |

### `AutoscalingPolicyScalingSchedule`

- Scaling based on user-defined schedule. The message describes a single scaling schedule. A scaling schedule changes the minimum number of VM instances an autoscaler can recommend, which can trigger scaling out.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | A description of a scaling schedule. |
| `disabled` | boolean | A boolean value that specifies whether a scaling schedule can influence autoscaler recommendations. If set to true, then a scaling schedule has no effect. This field is optional, and its value is false by default. |
| `durationSec` | integer (int32) | The duration of time intervals, in seconds, for which this scaling schedule is to run. The minimum allowed value is 300. This field is required. |
| `minRequiredReplicas` | integer (int32) | The minimum number of VM instances that the autoscaler will recommend in time intervals starting according to schedule. This field is required. |
| `schedule` | string | The start timestamps of time intervals when this scaling schedule is to provide a scaling signal. This field uses the extended cron format (with an optional year field). The expression can describe a single timestamp if the optional year is set, in which case the scaling schedule runs once. The schedule is interpreted with respect to time_zone. This field is required. Note: These timestamps only describe when autoscaler starts providing the scaling signal. The VMs need additional time to become serving. |
| `timeZone` | string | The time zone to use when interpreting the schedule. The value of this field must be a time zone name from the tz database: https://en.wikipedia.org/wiki/Tz_database. This field is assigned a default value of "UTC" if left empty. |

### `AutoscalingPolicySignalAggregation`

- Defines how scaling signal is aggregated in a group. Operates on the results of the `TimeAggregation`, reducing the per-instance values down to a single aggregate value across the entire instance group.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `percentile` | integer (int32) | If statistic is PERCENTILE, percentile must be defined. This value is used only when statistic is PERCENTILE. |
| `statistic` | string enum | Required. The aggregator used to aggregate signal samples across the entire instance group. This field is required. Values: `AGGREGATOR_UNSPECIFIED`, `AVERAGE`, `MAX`, `MIN`, `PERCENTILE`. |

### `AutoscalingPolicyTimeAggregation`

- Defines how scaling signal is aggregated over a time window. Operates on all signal samples produced over the `time_window_sec`, reducing them to exactly one value.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `percentile` | integer (int32) | If statistic is PERCENTILE, percentile must be defined. This value is used only when statistic is PERCENTILE. |
| `statistic` | string enum | Required. The aggregator used to aggregate signal samples over the `time_window_sec`. This field is required. Values: `AGGREGATOR_UNSPECIFIED`, `AVERAGE`, `LAST_VALUE`, `MAX`, `MIN`, `PERCENTILE`. |
| `timeWindowSec` | integer (int32) | Required. The duration of the time window over which the signal samples are aggregated. This field is required. |

### `Backend`

- Message containing information of one individual backend.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `balancingMode` | string enum | Specifies how to determine whether the backend of a load balancer can handle additional traffic or is fully loaded. For usage guidelines, see Connection balancing mode. Backends must use compatible balancing modes. Backends of a backend service may use different balancing modes. For more information, see Supported balancing modes and target capacity settings and Restrictions and guidance for instance groups. Note: Currently, if you use the API to configure incompatible balancing modes, the configuration might be accepted even though it has no impact and is ignored. Specifically, Backend.maxUtilization is ignored when Backend.balancingMode is RATE. In the future, this incompatible combination will be rejected. Values: `CONNECTION`, `CUSTOM_METRICS`, `IN_FLIGHT`, `RATE`, `UTILIZATION`. |
| `capacityScaler` | number (float) | A multiplier applied to the backend's target capacity of its balancing mode. The default value is 1, which means the group serves up to 100% of its configured capacity (depending onbalancingMode). A setting of 0 means the group is completely drained, offering 0% of its available capacity. The valid ranges are 0.0 and \[0.1,1.0\]. You cannot configure a setting larger than 0 and smaller than0.1. You cannot configure a setting of 0 when there is only one backend attached to the backend service. Not available with backends that don't support using abalancingMode. This includes backends such as global internet NEGs, regional serverless NEGs, and PSC NEGs. |
| `customMetrics` | array<BackendCustomMetric> | List of custom metrics that are used for CUSTOM_METRICS BalancingMode. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `failover` | boolean | This field designates whether this is a failover backend. More than one failover backend can be configured for a given BackendService. This field can only be used for a regional external Passthrough Network Load Balancer or a regional internal Passthrough Network Load Balancer. |
| `group` | string | The fully-qualified URL of aninstance group or network endpoint group (NEG) resource. To determine what types of backends a load balancer supports, see the Backend services overview (https://cloud.google.com/load-balancing/docs/backend-service#backends). You must use the \*fully-qualified\* URL (starting withhttps://www.googleapis.com/) to specify the instance group or NEG. Partial URLs are not supported. If haPolicy is specified, backends must refer to NEG resources of type GCE_VM_IP. |
| `maxConnections` | integer (int32) | Defines a target maximum number of simultaneous connections. For usage guidelines, seeConnection balancing mode and Utilization balancing mode. Not available if the backend'sbalancingMode is RATE. |
| `maxConnectionsPerEndpoint` | integer (int32) | Defines a target maximum number of simultaneous connections. For usage guidelines, seeConnection balancing mode and Utilization balancing mode. Not available if the backend's balancingMode isRATE. |
| `maxConnectionsPerInstance` | integer (int32) | Defines a target maximum number of simultaneous connections. For usage guidelines, seeConnection balancing mode and Utilization balancing mode. Not available if the backend's balancingMode isRATE. |
| `maxInFlightRequests` | integer (int32) | Defines a maximum number of in-flight requests for the whole NEG or instance group. Not available if backend's balancingMode isRATE or CONNECTION. |
| `maxInFlightRequestsPerEndpoint` | integer (int32) | Defines a maximum number of in-flight requests for a single endpoint. Not available if backend's balancingMode is RATE or CONNECTION. |
| `maxInFlightRequestsPerInstance` | integer (int32) | Defines a maximum number of in-flight requests for a single VM. Not available if backend's balancingMode is RATE or CONNECTION. |
| `maxRate` | integer (int32) | Defines a maximum number of HTTP requests per second (RPS). For usage guidelines, seeRate balancing mode and Utilization balancing mode. Not available if the backend's balancingMode isCONNECTION. |
| `maxRatePerEndpoint` | number (float) | Defines a maximum target for requests per second (RPS). For usage guidelines, seeRate balancing mode and Utilization balancing mode. Not available if the backend's balancingMode isCONNECTION. |
| `maxRatePerInstance` | number (float) | Defines a maximum target for requests per second (RPS). For usage guidelines, seeRate balancing mode and Utilization balancing mode. Not available if the backend's balancingMode isCONNECTION. |
| `maxUtilization` | number (float) | Optional parameter to define a target capacity for theUTILIZATION balancing mode. The valid range is\[0.0, 1.0\]. For usage guidelines, seeUtilization balancing mode. |
| `orchestrationInfo` | BackendBackendOrchestrationInfo | Information about the resource or system that manages the backend. |
| `preference` | string enum | This field indicates whether this backend should be fully utilized before sending traffic to backends with default preference. The possible values are: - PREFERRED: Backends with this preference level will be filled up to their capacity limits first, based on RTT. - DEFAULT: If preferred backends don't have enough capacity, backends in this layer would be used and traffic would be assigned based on the load balancing algorithm you use. This is the default For global external Passthrough Network Load Balancers, the following restrictions apply: - At most one backend can be marked as PREFERRED. - PREFERRED and DEFAULT backends cannot reside in the same Cloud region. Values: `DEFAULT`, `PREFERENCE_UNSPECIFIED`, `PREFERRED`. |
| `trafficDuration` | string enum | — Values: `LONG`, `SHORT`, `TRAFFIC_DURATION_UNSPECIFIED`. |

### `Backend` (beta)

- Message containing information of one individual backend.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `balancingMode` | string enum | Specifies how to determine whether the backend of a load balancer can handle additional traffic or is fully loaded. For usage guidelines, see Connection balancing mode. Backends must use compatible balancing modes. Backends of a backend service may use different balancing modes. For more information, see Supported balancing modes and target capacity settings and Restrictions and guidance for instance groups. Note: Currently, if you use the API to configure incompatible balancing modes, the configuration might be accepted even though it has no impact and is ignored. Specifically, Backend.maxUtilization is ignored when Backend.balancingMode is RATE. In the future, this incompatible combination will be rejected. Values: `CONNECTION`, `CUSTOM_METRICS`, `IN_FLIGHT`, `RATE`, `UTILIZATION`. |
| `capacityScaler` | number (float) | A multiplier applied to the backend's target capacity of its balancing mode. The default value is 1, which means the group serves up to 100% of its configured capacity (depending onbalancingMode). A setting of 0 means the group is completely drained, offering 0% of its available capacity. The valid ranges are 0.0 and \[0.1,1.0\]. You cannot configure a setting larger than 0 and smaller than0.1. You cannot configure a setting of 0 when there is only one backend attached to the backend service. Not available with backends that don't support using abalancingMode. This includes backends such as global internet NEGs, regional serverless NEGs, and PSC NEGs. |
| `customMetrics` | array<BackendCustomMetric> | List of custom metrics that are used for CUSTOM_METRICS BalancingMode. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `failover` | boolean | This field designates whether this is a failover backend. More than one failover backend can be configured for a given BackendService. This field can only be used for a regional external Passthrough Network Load Balancer or a regional internal Passthrough Network Load Balancer. |
| `group` | string | The fully-qualified URL of aninstance group or network endpoint group (NEG) resource. To determine what types of backends a load balancer supports, see the Backend services overview (https://cloud.google.com/load-balancing/docs/backend-service#backends). You must use the \*fully-qualified\* URL (starting withhttps://www.googleapis.com/) to specify the instance group or NEG. Partial URLs are not supported. If haPolicy is specified, backends must refer to NEG resources of type GCE_VM_IP. |
| `maxConnections` | integer (int32) | Defines a target maximum number of simultaneous connections. For usage guidelines, seeConnection balancing mode and Utilization balancing mode. Not available if the backend'sbalancingMode is RATE. |
| `maxConnectionsPerEndpoint` | integer (int32) | Defines a target maximum number of simultaneous connections. For usage guidelines, seeConnection balancing mode and Utilization balancing mode. Not available if the backend's balancingMode isRATE. |
| `maxConnectionsPerInstance` | integer (int32) | Defines a target maximum number of simultaneous connections. For usage guidelines, seeConnection balancing mode and Utilization balancing mode. Not available if the backend's balancingMode isRATE. |
| `maxInFlightRequests` | integer (int32) | Defines a maximum number of in-flight requests for the whole NEG or instance group. Not available if backend's balancingMode isRATE or CONNECTION. |
| `maxInFlightRequestsPerEndpoint` | integer (int32) | Defines a maximum number of in-flight requests for a single endpoint. Not available if backend's balancingMode is RATE or CONNECTION. |
| `maxInFlightRequestsPerInstance` | integer (int32) | Defines a maximum number of in-flight requests for a single VM. Not available if backend's balancingMode is RATE or CONNECTION. |
| `maxRate` | integer (int32) | Defines a maximum number of HTTP requests per second (RPS). For usage guidelines, seeRate balancing mode and Utilization balancing mode. Not available if the backend's balancingMode isCONNECTION. |
| `maxRatePerEndpoint` | number (float) | Defines a maximum target for requests per second (RPS). For usage guidelines, seeRate balancing mode and Utilization balancing mode. Not available if the backend's balancingMode isCONNECTION. |
| `maxRatePerInstance` | number (float) | Defines a maximum target for requests per second (RPS). For usage guidelines, seeRate balancing mode and Utilization balancing mode. Not available if the backend's balancingMode isCONNECTION. |
| `maxUtilization` | number (float) | Optional parameter to define a target capacity for theUTILIZATION balancing mode. The valid range is\[0.0, 1.0\]. For usage guidelines, seeUtilization balancing mode. |
| `orchestrationInfo` | BackendBackendOrchestrationInfo | Information about the resource or system that manages the backend. |
| `preference` | string enum | This field indicates whether this backend should be fully utilized before sending traffic to backends with default preference. The possible values are: - PREFERRED: Backends with this preference level will be filled up to their capacity limits first, based on RTT. - DEFAULT: If preferred backends don't have enough capacity, backends in this layer would be used and traffic would be assigned based on the load balancing algorithm you use. This is the default For global external Passthrough Network Load Balancers, the following restrictions apply: - At most one backend can be marked as PREFERRED. - PREFERRED and DEFAULT backends cannot reside in the same Cloud region. Values: `DEFAULT`, `PREFERENCE_UNSPECIFIED`, `PREFERRED`. |
| `service` | string | Represents a service backend (e.g., Cloud Run service, PSC Service Attachment). e.g. "run.googleapis.com/projects/123456789/locations/us-central1/services/my-service" for Cloud Run service. "compute.googleapis.com/projects/123456789/regions/us-central1/serviceAttachments/my-service-attachment" for PSC Service Attachment. |
| `trafficDuration` | string enum | — Values: `LONG`, `SHORT`, `TRAFFIC_DURATION_UNSPECIFIED`. |

### `BackendBackendOrchestrationInfo`

- A message containing information about the resource or system that manages the backend.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceUri` | string | The URI of the resource or system that manages the backend. |

### `BackendBucket`

- Represents a Cloud Storage Bucket resource. This Cloud Storage bucket resource is referenced by a URL map of a load balancer. For more information, readBackend Buckets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucketName` | string | Cloud Storage bucket name. |
| `cdnPolicy` | BackendBucketCdnPolicy | Cloud CDN configuration for this BackendBucket. |
| `compressionMode` | string enum | Compress text responses using Brotli or gzip compression, based on the client's Accept-Encoding header. Values: `AUTOMATIC`, `DISABLED`. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `customResponseHeaders` | array<string> | Headers that the Application Load Balancer should add to proxied responses. |
| `description` | string | An optional textual description of the resource; provided by the client when the resource is created. |
| `edgeSecurityPolicy` | string | \[Output Only\] The resource URL for the edge security policy associated with this backend bucket. |
| `enableCdn` | boolean | If true, enable Cloud CDN for this BackendBucket. |
| `id` | string (uint64) | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `kind` | string | Output only. Type of the resource. |
| `loadBalancingScheme` | string enum | The value can only be INTERNAL_MANAGED for cross-region internal layer 7 load balancer. If loadBalancingScheme is not specified, the backend bucket can be used by classic global external load balancers, or global application external load balancers, or both. Values: `EXTERNAL_MANAGED`, `INTERNAL_MANAGED`. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | BackendBucketParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional backend bucket resides. This field is not applicable to global backend buckets. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `usedBy` | array<BackendBucketUsedBy> | Output only. \[Output Only\] List of resources referencing that backend bucket. |

### `BackendBucket` (alpha)

- Represents a Cloud Storage Bucket resource. This Cloud Storage bucket resource is referenced by a URL map of a load balancer. For more information, readBackend Buckets.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `bucketName` | string | Cloud Storage bucket name. |
| `cdnPolicy` | BackendBucketCdnPolicy | Cloud CDN configuration for this BackendBucket. |
| `compressionMode` | string enum | Compress text responses using Brotli or gzip compression, based on the client's Accept-Encoding header. Values: `AUTOMATIC`, `DISABLED`. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `customResponseHeaders` | array<string> | Headers that the Application Load Balancer should add to proxied responses. |
| `description` | string | An optional textual description of the resource; provided by the client when the resource is created. |
| `edgeSecurityPolicy` | string | \[Output Only\] The resource URL for the edge security policy associated with this backend bucket. |
| `enableCdn` | boolean | If true, enable Cloud CDN for this BackendBucket. |
| `id` | string (uint64) | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `kind` | string | Output only. Type of the resource. |
| `loadBalancingScheme` | string enum | The value can only be INTERNAL_MANAGED for cross-region internal layer 7 load balancer. If loadBalancingScheme is not specified, the backend bucket can be used by classic global external load balancers, or global application external load balancers, or both. Values: `EXTERNAL_MANAGED`, `INTERNAL_MANAGED`. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | BackendBucketParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional backend bucket resides. This field is not applicable to global backend buckets. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `usedBy` | array<BackendBucketUsedBy> | Output only. \[Output Only\] List of resources referencing that backend bucket. |

### `BackendBucketAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of BackendBucketsScopedList resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `BackendBucketCdnPolicy`

- Message containing Cloud CDN configuration for a backend bucket.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bypassCacheOnRequestHeaders` | array<BackendBucketCdnPolicyBypassCacheOnRequestHeader> | Bypass the cache when the specified request headers are matched - e.g. Pragma or Authorization headers. Up to 5 headers can be specified. The cache is bypassed for all cdnPolicy.cacheMode settings. |
| `cacheKeyPolicy` | BackendBucketCdnPolicyCacheKeyPolicy | The CacheKeyPolicy for this CdnPolicy. |
| `cacheMode` | string enum | Specifies the cache setting for all responses from this backend. The possible values are: USE_ORIGIN_HEADERS Requires the origin to set valid caching headers to cache content. Responses without these headers will not be cached at Google's edge, and will require a full trip to the origin on every request, potentially impacting performance and increasing load on the origin server. FORCE_CACHE_ALL Cache all content, ignoring any "private", "no-store" or "no-cache" directives in Cache-Control response headers. Warning: this may result in Cloud CDN caching private, per-user (user identifiable) content. CACHE_ALL_STATIC Automatically cache static content, including common image formats, media (video and audio), and web assets (JavaScript and CSS). Requests and responses that are marked as uncacheable, as well as dynamic content (including HTML), will not be cached. If no value is provided for cdnPolicy.cacheMode, it defaults to CACHE_ALL_STATIC. Values: `CACHE_ALL_STATIC`, `FORCE_CACHE_ALL`, `INVALID_CACHE_MODE`, `USE_ORIGIN_HEADERS`. |
| `clientTtl` | integer (int32) | Specifies a separate client (e.g. browser client) maximum TTL. This is used to clamp the max-age (or Expires) value sent to the client. With FORCE_CACHE_ALL, the lesser of client_ttl and default_ttl is used for the response max-age directive, along with a "public" directive. For cacheable content in CACHE_ALL_STATIC mode, client_ttl clamps the max-age from the origin (if specified), or else sets the response max-age directive to the lesser of the client_ttl and default_ttl, and also ensures a "public" cache-control directive is present. If a client TTL is not specified, a default value (1 hour) will be used. The maximum allowed value is 31,622,400s (1 year). |
| `defaultTtl` | integer (int32) | Specifies the default TTL for cached content served by this origin for responses that do not have an existing valid TTL (max-age or s-maxage). Setting a TTL of "0" means "always revalidate". The value of defaultTTL cannot be set to a value greater than that of maxTTL, but can be equal. When the cacheMode is set to FORCE_CACHE_ALL, the defaultTTL will overwrite the TTL set in all responses. The maximum allowed value is 31,622,400s (1 year), noting that infrequently accessed objects may be evicted from the cache before the defined TTL. |
| `maxTtl` | integer (int32) | Specifies the maximum allowed TTL for cached content served by this origin. Cache directives that attempt to set a max-age or s-maxage higher than this, or an Expires header more than maxTTL seconds in the future will be capped at the value of maxTTL, as if it were the value of an s-maxage Cache-Control directive. Headers sent to the client will not be modified. Setting a TTL of "0" means "always revalidate". The maximum allowed value is 31,622,400s (1 year), noting that infrequently accessed objects may be evicted from the cache before the defined TTL. |
| `negativeCaching` | boolean | Negative caching allows per-status code TTLs to be set, in order to apply fine-grained caching for common errors or redirects. This can reduce the load on your origin and improve end-user experience by reducing response latency. When the cache mode is set to CACHE_ALL_STATIC or USE_ORIGIN_HEADERS, negative caching applies to responses with the specified response code that lack any Cache-Control, Expires, or Pragma: no-cache directives. When the cache mode is set to FORCE_CACHE_ALL, negative caching applies to all responses with the specified response code, and override any caching headers. By default, Cloud CDN will apply the following default TTLs to these status codes: HTTP 300 (Multiple Choice), 301, 308 (Permanent Redirects): 10m HTTP 404 (Not Found), 410 (Gone), 451 (Unavailable For Legal Reasons): 120s HTTP 405 (Method Not Found), 501 (Not Implemented): 60s. These defaults can be overridden in negative_caching_policy. |
| `negativeCachingPolicy` | array<BackendBucketCdnPolicyNegativeCachingPolicy> | Sets a cache TTL for the specified HTTP status code. negative_caching must be enabled to configure negative_caching_policy. Omitting the policy and leaving negative_caching enabled will use Cloud CDN's default cache TTLs. Note that when specifying an explicit negative_caching_policy, you should take care to specify a cache TTL for all response codes that you wish to cache. Cloud CDN will not apply any default negative caching when a policy exists. |
| `requestCoalescing` | boolean | If true then Cloud CDN will combine multiple concurrent cache fill requests into a small number of requests to the origin. |
| `serveWhileStale` | integer (int32) | Serve existing content from the cache (if available) when revalidating content with the origin, or when an error is encountered when refreshing the cache. This setting defines the default "max-stale" duration for any cached responses that do not specify a max-stale directive. Stale responses that exceed the TTL configured here will not be served. The default limit (max-stale) is 86400s (1 day), which will allow stale content to be served up to this limit beyond the max-age (or s-maxage) of a cached response. The maximum allowed value is 604800 (1 week). Set this to zero (0) to disable serve-while-stale. |
| `signedUrlCacheMaxAgeSec` | string (int64) | Maximum number of seconds the response to a signed URL request will be considered fresh. After this time period, the response will be revalidated before being served. Defaults to 1hr (3600s). When serving responses to signed URL requests, Cloud CDN will internally behave as though all responses from this backend had a "Cache-Control: public, max-age=\[TTL\]" header, regardless of any existing Cache-Control header. The actual headers served in responses will not be altered. |
| `signedUrlKeyNames` | array<string> | \[Output Only\] Names of the keys for signing request URLs. |

### `BackendBucketCdnPolicyBypassCacheOnRequestHeader`

- Bypass the cache when the specified request headers are present, e.g. Pragma or Authorization headers. Values are case insensitive. The presence of such a header overrides the cache_mode setting.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headerName` | string | The header field name to match on when bypassing cache. Values are case-insensitive. |

### `BackendBucketCdnPolicyCacheKeyPolicy`

- Message containing what to include in the cache key for a request for Cloud CDN.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `includeHttpHeaders` | array<string> | Allows HTTP request headers (by name) to be used in the cache key. |
| `queryStringWhitelist` | array<string> | Names of query string parameters to include in cache keys. Default parameters are always included. '&' and '=' will be percent encoded and not treated as delimiters. |

### `BackendBucketCdnPolicyNegativeCachingPolicy`

- Specify CDN TTLs for response error codes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The HTTP status code to define a TTL against. Only HTTP status codes 300, 301, 302, 307, 308, 404, 405, 410, 421, 451 and 501 can be specified as values, and you cannot specify a status code more than once. |
| `ttl` | integer (int32) | The TTL (in seconds) for which to cache responses with the corresponding status code. The maximum allowed value is 1800s (30 minutes), noting that infrequently accessed objects may be evicted from the cache before the defined TTL. |

### `BackendBucketList`

- Contains a list of BackendBucket resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<BackendBucket> | A list of BackendBucket resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `BackendBucketListUsable`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<BackendBucket> | A list of BackendBucket resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#usableBackendBucketList for lists of usable backend buckets. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `BackendBucketParams`

- Additional Backend Bucket parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. |

### `BackendBucketUsedBy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reference` | string | Output only. \[Output Only\] Server-defined URL for UrlMaps referencing that BackendBucket. |

### `BackendBucketsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendBuckets` | array<BackendBucket> | A list of BackendBuckets contained in this scope. |
| `warning` | object | Informational warning which replaces the list of backend services when the list is empty. |

### `BackendCustomMetric`

- Custom Metrics are used for CUSTOM_METRICS balancing_mode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dryRun` | boolean | If true, the metric data is collected and reported to Cloud Monitoring, but is not used for load balancing. |
| `maxUtilization` | number (float) | Optional parameter to define a target utilization for the Custom Metrics balancing mode. The valid range is \[0.0, 1.0\]. |
| `name` | string | Name of a custom utilization signal. The name must be 1-64 characters long and match the regular expression `[a-z]([-_.a-z0-9]*[a-z0-9])?` which means that the first character must be a lowercase letter, and all following characters must be a dash, period, underscore, lowercase letter, or digit, except the last character, which cannot be a dash, period, or underscore. For usage guidelines, see Custom Metrics balancing mode. This field can only be used for a global or regional backend service with the loadBalancingScheme set to EXTERNAL_MANAGED,INTERNAL_MANAGED INTERNAL_SELF_MANAGED. |

### `BackendService`

- Represents a Backend Service resource. A backend service defines how Google Cloud load balancers distribute traffic. The backend service configuration contains a set of values, such as the protocol used to connect to backends, various distribution and session settings, health checks, and timeouts. These settings provide fine-grained control over how your load balancer behaves. Most of the settings have default values that allow for easy configuration if you need to get started quickly. Backend services in Google Compute Engine can be either regionally or globally scoped. \* Global (https://cloud.google.com/compute/docs/reference/rest/v1/backendServices) \* Regional (https://cloud.google.com/compute/docs/reference/rest/v1/regionBackendServices) For more information, seeBackend Services.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `affinityCookieTtlSec` | integer (int32) | Lifetime of cookies in seconds. This setting is applicable to Application Load Balancers and Traffic Director and requires GENERATED_COOKIE or HTTP_COOKIE session affinity. If set to 0, the cookie is non-persistent and lasts only until the end of the browser session (or equivalent). The maximum allowed value is two weeks (1,209,600). Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |
| `backends` | array<Backend> | The list of backends that serve this BackendService. |
| `cdnPolicy` | BackendServiceCdnPolicy | Cloud CDN configuration for this BackendService. Only available for specified load balancer types. |
| `circuitBreakers` | CircuitBreakers | — |
| `compressionMode` | string enum | Compress text responses using Brotli or gzip compression, based on the client's Accept-Encoding header. Values: `AUTOMATIC`, `DISABLED`. |
| `connectionDraining` | ConnectionDraining | connectionDraining cannot be specified with haPolicy. |
| `connectionTrackingPolicy` | BackendServiceConnectionTrackingPolicy | Connection Tracking configuration for this BackendService. Connection tracking policy settings are only available for external passthrough Network Load Balancers and internal passthrough Network Load Balancers. connectionTrackingPolicy cannot be specified with haPolicy. |
| `consistentHash` | ConsistentHashLoadBalancerSettings | Consistent Hash-based load balancing can be used to provide soft session affinity based on HTTP headers, cookies or other properties. This load balancing policy is applicable only for HTTP connections. The affinity to a particular destination host will be lost when one or more hosts are added/removed from the destination service. This field specifies parameters that control consistent hashing. This field is only applicable whenlocalityLbPolicy is set to MAGLEV orRING_HASH. This field is applicable to either: - A regional backend service with the service protocol set to HTTP, HTTPS, HTTP2 or H2C, and load_balancing_scheme set to INTERNAL_MANAGED. - A global backend service with the load_balancing_scheme set to INTERNAL_SELF_MANAGED. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `customMetrics` | array<BackendServiceCustomMetric> | List of custom metrics that are used for theWEIGHTED_ROUND_ROBIN locality_lb_policy. |
| `customRequestHeaders` | array<string> | Headers that the load balancer adds to proxied requests. See Creating custom headers (https://cloud.google.com/load-balancing/docs/custom-headers). |
| `customResponseHeaders` | array<string> | Headers that the load balancer adds to proxied responses. See Creating custom headers (https://cloud.google.com/load-balancing/docs/custom-headers). |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `dynamicForwarding` | BackendServiceDynamicForwarding | Dynamic forwarding configuration. This field is used to configure the backend service with dynamic forwarding feature which together with Service Extension allows customized and complex routing logic. |
| `edgeSecurityPolicy` | string | \[Output Only\] The resource URL for the edge security policy associated with this backend service. |
| `enableCDN` | boolean | If true, enables Cloud CDN for the backend service of a global external Application Load Balancer. |
| `externalManagedMigrationState` | string enum | Specifies the canary migration state. Possible values are PREPARE, TEST_BY_PERCENTAGE, and TEST_ALL_TRAFFIC. To begin the migration from EXTERNAL to EXTERNAL_MANAGED, the state must be changed to PREPARE. The state must be changed to TEST_ALL_TRAFFIC before the loadBalancingScheme can be changed to EXTERNAL_MANAGED. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate traffic by percentage using externalManagedMigrationTestingPercentage. Rolling back a migration requires the states to be set in reverse order. So changing the scheme from EXTERNAL_MANAGED to EXTERNAL requires the state to be set to TEST_ALL_TRAFFIC at the same time. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate some traffic back to EXTERNAL or PREPARE can be used to migrate all traffic back to EXTERNAL. Values: `PREPARE`, `TEST_ALL_TRAFFIC`, `TEST_BY_PERCENTAGE`. |
| `externalManagedMigrationTestingPercentage` | number (float) | Determines the fraction of requests that should be processed by the Global external Application Load Balancer. The value of this field must be in the range \[0, 100\]. Session affinity options will slightly affect this routing behavior, for more details, see:Session Affinity. This value can only be set if the loadBalancingScheme in the BackendService is set to EXTERNAL (when using the classic Application Load Balancer) and the migration state is TEST_BY_PERCENTAGE. |
| `failoverPolicy` | BackendServiceFailoverPolicy | Requires at least one backend instance group to be defined as a backup (failover) backend. For load balancers that have configurable failover: Internal passthrough Network Load Balancers (https://cloud.google.com/load-balancing/docs/internal/failover-overview) and external passthrough Network Load Balancers (https://cloud.google.com/load-balancing/docs/network/networklb-failover-overview). failoverPolicy cannot be specified with haPolicy.failoverPolicy cannot be used by global external Passthrough Network Load Balancers. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a BackendService. An up-to-date fingerprint must be provided in order to update the BackendService, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a BackendService. |
| `haPolicy` | BackendServiceHAPolicy | Configures self-managed High Availability (HA) for External and Internal Protocol Forwarding. The backends of this regional backend service must only specify zonal network endpoint groups (NEGs) of type GCE_VM_IP. When haPolicy is set for an Internal Passthrough Network Load Balancer, the regional backend service must set the network field. All zonal NEGs must belong to the same network. However, individual NEGs can belong to different subnetworks of that network. When haPolicy is specified, the set of attached network endpoints across all backends comprise an High Availability domain from which one endpoint is selected as the active endpoint (the leader) that receives all traffic. haPolicy can be added only at backend service creation time. Once set up, it cannot be deleted. Note that haPolicy is not for load balancing, and therefore cannot be specified with sessionAffinity, connectionTrackingPolicy, and failoverPolicy. haPolicy requires customers to be responsible for tracking backend endpoint health and electing a leader among the healthy endpoints. Therefore, haPolicy cannot be specified with healthChecks. haPolicy can only be specified for External Passthrough Network Load Balancers and Internal Passthrough Network Load Balancers.haPolicy cannot be used by global external Passthrough Network Load Balancers. |
| `healthChecks` | array<string> | The list of URLs to the healthChecks, httpHealthChecks (legacy), or httpsHealthChecks (legacy) resource for health checking this backend service. Not all backend services support legacy health checks. See Load balancer guide. Currently, at most one health check can be specified for each backend service. Backend services with instance group or zonal NEG backends must have a health check unless haPolicy is specified. Backend services with internet or serverless NEG backends must not have a health check. healthChecks\[\] cannot be specified with haPolicy. |
| `iap` | BackendServiceIAP | The configurations for Identity-Aware Proxy on this resource. Not available for internal passthrough Network Load Balancers and external passthrough Network Load Balancers. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ipAddressSelectionPolicy` | string enum | Specifies a preference for traffic sent from the proxy to the backend (or from the client to the backend for proxyless gRPC). The possible values are: - IPV4_ONLY: Only send IPv4 traffic to the backends of the backend service (Instance Group, Managed Instance Group, Network Endpoint Group), regardless of traffic from the client to the proxy. Only IPv4 health checks are used to check the health of the backends. This is the default setting. - PREFER_IPV6: Prioritize the connection to the endpoint's IPv6 address over its IPv4 address (provided there is a healthy IPv6 address). - IPV6_ONLY: Only send IPv6 traffic to the backends of the backend service (Instance Group, Managed Instance Group, Network Endpoint Group), regardless of traffic from the client to the proxy. Only IPv6 health checks are used to check the health of the backends. This field is applicable to either: - Advanced global external Application Load Balancer (load balancing scheme EXTERNAL_MANAGED), - Regional external Application Load Balancer, - Internal proxy Network Load Balancer (load balancing scheme INTERNAL_MANAGED), - Regional internal Application Load Balancer (load balancing scheme INTERNAL_MANAGED), - Traffic Director with Envoy proxies and proxyless gRPC (load balancing scheme INTERNAL_SELF_MANAGED). Values: `IPV4_ONLY`, `IPV6_ONLY`, `IP_ADDRESS_SELECTION_POLICY_UNSPECIFIED`, `PREFER_IPV6`. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#backendService for backend services. |
| `loadBalancingScheme` | string enum | Specifies the load balancer type. A backend service created for one type of load balancer cannot be used with another. For more information, refer to Backend services product and scheme table. Values: `EXTERNAL`, `EXTERNAL_MANAGED`, `EXTERNAL_PASSTHROUGH`, `INTERNAL`, `INTERNAL_MANAGED`, `INTERNAL_SELF_MANAGED`, `INVALID_LOAD_BALANCING_SCHEME`. |
| `localityLbPolicies` | array<BackendServiceLocalityLoadBalancingPolicyConfig> | A list of locality load-balancing policies to be used in order of preference. When you use localityLbPolicies, you must set at least one value for either the localityLbPolicies\[\].policy or the localityLbPolicies\[\].customPolicy field. localityLbPolicies overrides any value set in the localityLbPolicy field. For an example of how to use this field, seeDefine a list of preferred policies. Caution: This field and its children are intended for use in a service mesh that includes gRPC clients only. Envoy proxies can't use backend services that have this configuration. |
| `localityLbPolicy` | string enum | The load balancing algorithm used within the scope of the locality. The possible values are: - ROUND_ROBIN: This is a simple policy in which each healthy backend is selected in round robin order. This is the default. - LEAST_REQUEST: An O(1) algorithm which selects two random healthy hosts and picks the host which has fewer active requests. - RING_HASH: The ring/modulo hash load balancer implements consistent hashing to backends. The algorithm has the property that the addition/removal of a host from a set of N hosts only affects 1/N of the requests. - RANDOM: The load balancer selects a random healthy host. - ORIGINAL_DESTINATION: Backend host is selected based on the client connection metadata, i.e., connections are opened to the same address as the destination address of the incoming connection before the connection was redirected to the load balancer. - MAGLEV: used as a drop in replacement for the ring hash load balancer. Maglev is not as stable as ring hash but has faster table lookup build times and host selection times. For more information about Maglev, see Maglev: A Fast and Reliable Software Network Load Balancer. - WEIGHTED_ROUND_ROBIN: Per-endpoint Weighted Round Robin Load Balancing using weights computed from Backend reported Custom Metrics. If set, the Backend Service responses are expected to contain non-standard HTTP response header field Endpoint-Load-Metrics. The reported metrics to use for computing the weights are specified via thecustomMetrics field. - WEIGHTED_MAGLEV: Per-endpoint weighted load balancing via health check reported weights. If set, the backend service must configure an HTTP-based Health Check, and health check replies are expected to contain the non-standard HTTP response header fieldX-Load-Balancing-Endpoint-Weight to specify the per-endpoint weights. If set, load balancing is weighted based on the per-endpoint weights reported in the last processed health check replies, as long as every instance either reported a valid weight or had UNAVAILABLE_WEIGHT. Otherwise, load balancing remains equal-weight. This field is applicable to either: - A regional backend service with the service protocol set to HTTP, HTTPS, HTTP2 or H2C, and load_balancing_scheme set to INTERNAL_MANAGED. - A global backend service with the load_balancing_scheme set to INTERNAL_SELF_MANAGED, INTERNAL_MANAGED, or EXTERNAL_MANAGED. If sessionAffinity is not configured—that is, if session affinity remains at the default value of NONE—then the default value for localityLbPolicy is ROUND_ROBIN. If session affinity is set to a value other than NONE, then the default value for localityLbPolicy isMAGLEV. Only ROUND_ROBIN and RING_HASH are supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. localityLbPolicy cannot be specified with haPolicy. Values: `INVALID_LB_POLICY`, `LEAST_REQUEST`, `MAGLEV`, `ORIGINAL_DESTINATION`, `RANDOM`, `RING_HASH`, `ROUND_ROBIN`, `WEIGHTED_GCP_RENDEZVOUS`, `WEIGHTED_MAGLEV`, `WEIGHTED_ROUND_ROBIN`. |
| `logConfig` | BackendServiceLogConfig | This field denotes the logging options for the load balancer traffic served by this backend service. If logging is enabled, logs will be exported to Stackdriver. |
| `maxStreamDuration` | Duration | Specifies the default maximum duration (timeout) for streams to this service. Duration is computed from the beginning of the stream until the response has been completely processed, including all retries. A stream that does not complete in this duration is closed. If not specified, there will be no timeout limit, i.e. the maximum duration is infinite. This value can be overridden in the PathMatcher configuration of the UrlMap that references this backend service. This field is only allowed when the loadBalancingScheme of the backend service is INTERNAL_SELF_MANAGED. |
| `metadatas` | object | Deployment metadata associated with the resource to be set by a GKE hub controller and read by the backend RCTH |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | The URL of the network to which this backend service belongs. This field must be set for Internal Passthrough Network Load Balancers when the haPolicy is enabled, and for External Passthrough Network Load Balancers when the haPolicy fastIpMove is enabled. This field can only be specified when the load balancing scheme is set toINTERNAL, or when the load balancing scheme is set toEXTERNAL and haPolicy fastIpMove is enabled. |
| `networkPassThroughLbTrafficPolicy` | BackendServiceNetworkPassThroughLbTrafficPolicy | Configures traffic steering properties of internal passthrough Network Load Balancers. networkPassThroughLbTrafficPolicy cannot be specified with haPolicy. |
| `orchestrationInfo` | BackendServiceOrchestrationInfo | Information about the resource or system that manages the backend service. |
| `outlierDetection` | OutlierDetection | Settings controlling the ejection of unhealthy backend endpoints from the load balancing pool of each individual proxy instance that processes the traffic for the given backend service. If not set, this feature is considered disabled. Results of the outlier detection algorithm (ejection of endpoints from the load balancing pool and returning them back to the pool) are executed independently by each proxy instance of the load balancer. In most cases, more than one proxy instance handles the traffic received by a backend service. Thus, it is possible that an unhealthy endpoint is detected and ejected by only some of the proxies, and while this happens, other proxies may continue to send requests to the same unhealthy endpoint until they detect and eject the unhealthy endpoint. Applicable backend endpoints can be: - VM instances in an Instance Group - Endpoints in a Zonal NEG (GCE_VM_IP, GCE_VM_IP_PORT) - Endpoints in a Hybrid Connectivity NEG (NON_GCP_PRIVATE_IP_PORT) - Serverless NEGs, that resolve to Cloud Run, App Engine, or Cloud Functions Services - Private Service Connect NEGs, that resolve to Google-managed regional API endpoints or managed services published using Private Service Connect Applicable backend service types can be: - A global backend service with the loadBalancingScheme set to INTERNAL_SELF_MANAGED or EXTERNAL_MANAGED. - A regional backend service with the service protocol set to HTTP, HTTPS, HTTP2 or H2C, and loadBalancingScheme set to INTERNAL_MANAGED or EXTERNAL_MANAGED. Not supported for Serverless NEGs. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |
| `params` | BackendServiceParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `port` | integer (int32) | Deprecated in favor of portName. The TCP port to connect on the backend. The default value is 80. For internal passthrough Network Load Balancers and external passthrough Network Load Balancers, omit port. |
| `portName` | string | A named port on a backend instance group representing the port for communication to the backend VMs in that group. The named port must be defined on each backend instance group (https://cloud.google.com/load-balancing/docs/backend-service#named_ports). This parameter has no meaning if the backends are NEGs. For internal passthrough Network Load Balancers and external passthrough Network Load Balancers, omit port_name. |
| `protocol` | string enum | The protocol this BackendService uses to communicate with backends. Possible values are HTTP, HTTPS, HTTP2, H2C, TCP, SSL, UDP, GRPC, or UNSPECIFIED, depending on the chosen load balancer or Traffic Director configuration. Refer to Load balancing features for more information. Must be set to GRPC when the backend service is referenced by a URL map that is bound to target gRPC proxy. Values: `GRPC`, `H2C`, `HTTP`, `HTTP2`, `HTTPS`, `SSL`, `TCP`, `UDP`, `UNSPECIFIED`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional backend service resides. This field is not applicable to global backend services. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `securityPolicy` | string | \[Output Only\] The resource URL for the security policy associated with this backend service. |
| `securitySettings` | SecuritySettings | This field specifies the security settings that apply to this backend service. This field is applicable to a global backend service with the load_balancing_scheme set to INTERNAL_SELF_MANAGED. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `serviceBindings` | array<string> | URLs of networkservices.ServiceBinding resources. Can only be set if load balancing scheme is INTERNAL_SELF_MANAGED. If set, lists of backends and health checks must be both empty. |
| `serviceLbPolicy` | string | URL to networkservices.ServiceLbPolicy resource. Can only be set if load balancing scheme is EXTERNAL_MANAGED, INTERNAL_MANAGED or INTERNAL_SELF_MANAGED for a global backend service, and EXTERNAL_MANAGED or INTERNAL_MANAGED for a regional backend service. For a global backend service, the service lb policy must be global. For a regional backend service, the service lb policy must be regional and in the same region. |
| `sessionAffinity` | string enum | Type of session affinity to use. The default is NONE. Only NONE and HEADER_FIELD are supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. For more details, see: Session Affinity (https://cloud.google.com/load-balancing/docs/backend-service#session_affinity). sessionAffinity cannot be specified with haPolicy. Values: `CLIENT_IP`, `CLIENT_IP_NO_DESTINATION`, `CLIENT_IP_PORT_PROTO`, `CLIENT_IP_PROTO`, `GENERATED_COOKIE`, `HEADER_FIELD`, `HTTP_COOKIE`, `NONE`, `STRONG_COOKIE_AFFINITY`. |
| `strongSessionAffinityCookie` | BackendServiceHttpCookie | Describes the HTTP cookie used for stateful session affinity. This field is applicable and required if the sessionAffinity is set toSTRONG_COOKIE_AFFINITY. |
| `subsetting` | Subsetting | subsetting cannot be specified with haPolicy. |
| `timeoutSec` | integer (int32) | The backend service timeout has a different meaning depending on the type of load balancer. For more information see, Backend service settings. The default is 30 seconds. The full range of timeout values allowed goes from 1 through 2,147,483,647 seconds. This value can be overridden in the PathMatcher configuration of the UrlMap that references this backend service. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. Instead, use maxStreamDuration. |
| `tlsSettings` | BackendServiceTlsSettings | Configuration for Backend Authenticated TLS and mTLS. May only be specified when the backend protocol is SSL, HTTPS or HTTP2. |
| `usedBy` | array<BackendServiceUsedBy> | Output only. \[Output Only\] List of resources referencing given backend service. |

### `BackendService` (alpha)

- Represents a Backend Service resource. A backend service defines how Google Cloud load balancers distribute traffic. The backend service configuration contains a set of values, such as the protocol used to connect to backends, various distribution and session settings, health checks, and timeouts. These settings provide fine-grained control over how your load balancer behaves. Most of the settings have default values that allow for easy configuration if you need to get started quickly. Backend services in Google Compute Engine can be either regionally or globally scoped. \* Global (https://cloud.google.com/compute/docs/reference/rest/alpha/backendServices) \* Regional (https://cloud.google.com/compute/docs/reference/rest/alpha/regionBackendServices) For more information, seeBackend Services.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `affinityCookieTtlSec` | integer (int32) | Lifetime of cookies in seconds. This setting is applicable to Application Load Balancers and Traffic Director and requires GENERATED_COOKIE or HTTP_COOKIE session affinity. If set to 0, the cookie is non-persistent and lasts only until the end of the browser session (or equivalent). The maximum allowed value is two weeks (1,209,600). Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |
| `allowMultinetwork` | boolean | A boolean flag enabling multi-network mesh. This field is only allowed with load balancing scheme set to INTERNAL_SELF_MANAGED. |
| `backends` | array<Backend> | The list of backends that serve this BackendService. |
| `cdnPolicy` | BackendServiceCdnPolicy | Cloud CDN configuration for this BackendService. Only available for specified load balancer types. |
| `circuitBreakers` | CircuitBreakers | — |
| `compressionMode` | string enum | Compress text responses using Brotli or gzip compression, based on the client's Accept-Encoding header. Values: `AUTOMATIC`, `DISABLED`. |
| `connectionDraining` | ConnectionDraining | connectionDraining cannot be specified with haPolicy. |
| `connectionTrackingPolicy` | BackendServiceConnectionTrackingPolicy | Connection Tracking configuration for this BackendService. Connection tracking policy settings are only available for external passthrough Network Load Balancers and internal passthrough Network Load Balancers. connectionTrackingPolicy cannot be specified with haPolicy. |
| `consistentHash` | ConsistentHashLoadBalancerSettings | Consistent Hash-based load balancing can be used to provide soft session affinity based on HTTP headers, cookies or other properties. This load balancing policy is applicable only for HTTP connections. The affinity to a particular destination host will be lost when one or more hosts are added/removed from the destination service. This field specifies parameters that control consistent hashing. This field is only applicable whenlocalityLbPolicy is set to MAGLEV orRING_HASH. This field is applicable to either: - A regional backend service with the service protocol set to HTTP, HTTPS, HTTP2 or H2C, and load_balancing_scheme set to INTERNAL_MANAGED. - A global backend service with the load_balancing_scheme set to INTERNAL_SELF_MANAGED. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `customMetrics` | array<BackendServiceCustomMetric> | List of custom metrics that are used for theWEIGHTED_ROUND_ROBIN locality_lb_policy. |
| `customRequestHeaders` | array<string> | Headers that the load balancer adds to proxied requests. See Creating custom headers (https://cloud.google.com/load-balancing/docs/custom-headers). |
| `customResponseHeaders` | array<string> | Headers that the load balancer adds to proxied responses. See Creating custom headers (https://cloud.google.com/load-balancing/docs/custom-headers). |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `dynamicForwarding` | BackendServiceDynamicForwarding | Dynamic forwarding configuration. This field is used to configure the backend service with dynamic forwarding feature which together with Service Extension allows customized and complex routing logic. |
| `edgeSecurityPolicy` | string | \[Output Only\] The resource URL for the edge security policy associated with this backend service. |
| `enableCDN` | boolean | If true, enables Cloud CDN for the backend service of a global external Application Load Balancer. |
| `externalManagedMigrationState` | string enum | Specifies the canary migration state. Possible values are PREPARE, TEST_BY_PERCENTAGE, and TEST_ALL_TRAFFIC. To begin the migration from EXTERNAL to EXTERNAL_MANAGED, the state must be changed to PREPARE. The state must be changed to TEST_ALL_TRAFFIC before the loadBalancingScheme can be changed to EXTERNAL_MANAGED. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate traffic by percentage using externalManagedMigrationTestingPercentage. Rolling back a migration requires the states to be set in reverse order. So changing the scheme from EXTERNAL_MANAGED to EXTERNAL requires the state to be set to TEST_ALL_TRAFFIC at the same time. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate some traffic back to EXTERNAL or PREPARE can be used to migrate all traffic back to EXTERNAL. Values: `PREPARE`, `TEST_ALL_TRAFFIC`, `TEST_BY_PERCENTAGE`. |
| `externalManagedMigrationTestingPercentage` | number (float) | Determines the fraction of requests that should be processed by the Global external Application Load Balancer. The value of this field must be in the range \[0, 100\]. Session affinity options will slightly affect this routing behavior, for more details, see:Session Affinity. This value can only be set if the loadBalancingScheme in the BackendService is set to EXTERNAL (when using the classic Application Load Balancer) and the migration state is TEST_BY_PERCENTAGE. |
| `failoverPolicy` | BackendServiceFailoverPolicy | Requires at least one backend instance group to be defined as a backup (failover) backend. For load balancers that have configurable failover: Internal passthrough Network Load Balancers (https://cloud.google.com/load-balancing/docs/internal/failover-overview) and external passthrough Network Load Balancers (https://cloud.google.com/load-balancing/docs/network/networklb-failover-overview). failoverPolicy cannot be specified with haPolicy.failoverPolicy cannot be used by global external Passthrough Network Load Balancers. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a BackendService. An up-to-date fingerprint must be provided in order to update the BackendService, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a BackendService. |
| `haPolicy` | BackendServiceHAPolicy | Configures self-managed High Availability (HA) for External and Internal Protocol Forwarding. The backends of this regional backend service must only specify zonal network endpoint groups (NEGs) of type GCE_VM_IP. When haPolicy is set for an Internal Passthrough Network Load Balancer, the regional backend service must set the network field. All zonal NEGs must belong to the same network. However, individual NEGs can belong to different subnetworks of that network. When haPolicy is specified, the set of attached network endpoints across all backends comprise an High Availability domain from which one endpoint is selected as the active endpoint (the leader) that receives all traffic. haPolicy can be added only at backend service creation time. Once set up, it cannot be deleted. Note that haPolicy is not for load balancing, and therefore cannot be specified with sessionAffinity, connectionTrackingPolicy, and failoverPolicy. haPolicy requires customers to be responsible for tracking backend endpoint health and electing a leader among the healthy endpoints. Therefore, haPolicy cannot be specified with healthChecks. haPolicy can only be specified for External Passthrough Network Load Balancers and Internal Passthrough Network Load Balancers.haPolicy cannot be used by global external Passthrough Network Load Balancers. |
| `healthChecks` | array<string> | The list of URLs to the healthChecks, httpHealthChecks (legacy), or httpsHealthChecks (legacy) resource for health checking this backend service. Not all backend services support legacy health checks. See Load balancer guide. Currently, at most one health check can be specified for each backend service. Backend services with instance group or zonal NEG backends must have a health check unless haPolicy is specified. Backend services with internet or serverless NEG backends must not have a health check. healthChecks\[\] cannot be specified with haPolicy. |
| `iap` | BackendServiceIAP | The configurations for Identity-Aware Proxy on this resource. Not available for internal passthrough Network Load Balancers and external passthrough Network Load Balancers. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ipAddressSelectionPolicy` | string enum | Specifies a preference for traffic sent from the proxy to the backend (or from the client to the backend for proxyless gRPC). The possible values are: - IPV4_ONLY: Only send IPv4 traffic to the backends of the backend service (Instance Group, Managed Instance Group, Network Endpoint Group), regardless of traffic from the client to the proxy. Only IPv4 health checks are used to check the health of the backends. This is the default setting. - PREFER_IPV6: Prioritize the connection to the endpoint's IPv6 address over its IPv4 address (provided there is a healthy IPv6 address). - IPV6_ONLY: Only send IPv6 traffic to the backends of the backend service (Instance Group, Managed Instance Group, Network Endpoint Group), regardless of traffic from the client to the proxy. Only IPv6 health checks are used to check the health of the backends. This field is applicable to either: - Advanced global external Application Load Balancer (load balancing scheme EXTERNAL_MANAGED), - Regional external Application Load Balancer, - Internal proxy Network Load Balancer (load balancing scheme INTERNAL_MANAGED), - Regional internal Application Load Balancer (load balancing scheme INTERNAL_MANAGED), - Traffic Director with Envoy proxies and proxyless gRPC (load balancing scheme INTERNAL_SELF_MANAGED). Values: `IPV4_ONLY`, `IPV6_ONLY`, `IP_ADDRESS_SELECTION_POLICY_UNSPECIFIED`, `PREFER_IPV6`. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#backendService for backend services. |
| `loadBalancingScheme` | string enum | Specifies the load balancer type. A backend service created for one type of load balancer cannot be used with another. For more information, refer to Backend services product and scheme table. Values: `EXTERNAL`, `EXTERNAL_MANAGED`, `EXTERNAL_PASSTHROUGH`, `INTERNAL`, `INTERNAL_MANAGED`, `INTERNAL_SELF_MANAGED`, `INVALID_LOAD_BALANCING_SCHEME`. |
| `localityLbPolicies` | array<BackendServiceLocalityLoadBalancingPolicyConfig> | A list of locality load-balancing policies to be used in order of preference. When you use localityLbPolicies, you must set at least one value for either the localityLbPolicies\[\].policy or the localityLbPolicies\[\].customPolicy field. localityLbPolicies overrides any value set in the localityLbPolicy field. For an example of how to use this field, seeDefine a list of preferred policies. Caution: This field and its children are intended for use in a service mesh that includes gRPC clients only. Envoy proxies can't use backend services that have this configuration. |
| `localityLbPolicy` | string enum | The load balancing algorithm used within the scope of the locality. The possible values are: - ROUND_ROBIN: This is a simple policy in which each healthy backend is selected in round robin order. This is the default. - LEAST_REQUEST: An O(1) algorithm which selects two random healthy hosts and picks the host which has fewer active requests. - RING_HASH: The ring/modulo hash load balancer implements consistent hashing to backends. The algorithm has the property that the addition/removal of a host from a set of N hosts only affects 1/N of the requests. - RANDOM: The load balancer selects a random healthy host. - ORIGINAL_DESTINATION: Backend host is selected based on the client connection metadata, i.e., connections are opened to the same address as the destination address of the incoming connection before the connection was redirected to the load balancer. - MAGLEV: used as a drop in replacement for the ring hash load balancer. Maglev is not as stable as ring hash but has faster table lookup build times and host selection times. For more information about Maglev, see Maglev: A Fast and Reliable Software Network Load Balancer. - WEIGHTED_ROUND_ROBIN: Per-endpoint Weighted Round Robin Load Balancing using weights computed from Backend reported Custom Metrics. If set, the Backend Service responses are expected to contain non-standard HTTP response header field Endpoint-Load-Metrics. The reported metrics to use for computing the weights are specified via thecustomMetrics field. - WEIGHTED_MAGLEV: Per-endpoint weighted load balancing via health check reported weights. If set, the backend service must configure an HTTP-based Health Check, and health check replies are expected to contain the non-standard HTTP response header fieldX-Load-Balancing-Endpoint-Weight to specify the per-endpoint weights. If set, load balancing is weighted based on the per-endpoint weights reported in the last processed health check replies, as long as every instance either reported a valid weight or had UNAVAILABLE_WEIGHT. Otherwise, load balancing remains equal-weight. This field is applicable to either: - A regional backend service with the service protocol set to HTTP, HTTPS, HTTP2 or H2C, and load_balancing_scheme set to INTERNAL_MANAGED. - A global backend service with the load_balancing_scheme set to INTERNAL_SELF_MANAGED, INTERNAL_MANAGED, or EXTERNAL_MANAGED. If sessionAffinity is not configured—that is, if session affinity remains at the default value of NONE—then the default value for localityLbPolicy is ROUND_ROBIN. If session affinity is set to a value other than NONE, then the default value for localityLbPolicy isMAGLEV. Only ROUND_ROBIN and RING_HASH are supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. localityLbPolicy cannot be specified with haPolicy. Values: `INVALID_LB_POLICY`, `LEAST_REQUEST`, `MAGLEV`, `ORIGINAL_DESTINATION`, `RANDOM`, `RING_HASH`, `ROUND_ROBIN`, `WEIGHTED_GCP_RENDEZVOUS`, `WEIGHTED_MAGLEV`, `WEIGHTED_ROUND_ROBIN`. |
| `logConfig` | BackendServiceLogConfig | This field denotes the logging options for the load balancer traffic served by this backend service. If logging is enabled, logs will be exported to Stackdriver. |
| `maxStreamDuration` | Duration | Specifies the default maximum duration (timeout) for streams to this service. Duration is computed from the beginning of the stream until the response has been completely processed, including all retries. A stream that does not complete in this duration is closed. If not specified, there will be no timeout limit, i.e. the maximum duration is infinite. This value can be overridden in the PathMatcher configuration of the UrlMap that references this backend service. This field is only allowed when the loadBalancingScheme of the backend service is INTERNAL_SELF_MANAGED. |
| `metadatas` | object | Deployment metadata associated with the resource to be set by a GKE hub controller and read by the backend RCTH |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | The URL of the network to which this backend service belongs. This field must be set for Internal Passthrough Network Load Balancers when the haPolicy is enabled, and for External Passthrough Network Load Balancers when the haPolicy fastIpMove is enabled. This field can only be specified when the load balancing scheme is set toINTERNAL, or when the load balancing scheme is set toEXTERNAL and haPolicy fastIpMove is enabled. |
| `networkAttachment` | string | Optional. The URL of the network attachment that this resource belongs to.projects/{project}/regions/{region_name}/networkAttachments/{network_attachment_name}. |
| `networkPassThroughLbTrafficPolicy` | BackendServiceNetworkPassThroughLbTrafficPolicy | Configures traffic steering properties of internal passthrough Network Load Balancers. networkPassThroughLbTrafficPolicy cannot be specified with haPolicy. |
| `orchestrationInfo` | BackendServiceOrchestrationInfo | Information about the resource or system that manages the backend service. |
| `outlierDetection` | OutlierDetection | Settings controlling the ejection of unhealthy backend endpoints from the load balancing pool of each individual proxy instance that processes the traffic for the given backend service. If not set, this feature is considered disabled. Results of the outlier detection algorithm (ejection of endpoints from the load balancing pool and returning them back to the pool) are executed independently by each proxy instance of the load balancer. In most cases, more than one proxy instance handles the traffic received by a backend service. Thus, it is possible that an unhealthy endpoint is detected and ejected by only some of the proxies, and while this happens, other proxies may continue to send requests to the same unhealthy endpoint until they detect and eject the unhealthy endpoint. Applicable backend endpoints can be: - VM instances in an Instance Group - Endpoints in a Zonal NEG (GCE_VM_IP, GCE_VM_IP_PORT) - Endpoints in a Hybrid Connectivity NEG (NON_GCP_PRIVATE_IP_PORT) - Serverless NEGs, that resolve to Cloud Run, App Engine, or Cloud Functions Services - Private Service Connect NEGs, that resolve to Google-managed regional API endpoints or managed services published using Private Service Connect Applicable backend service types can be: - A global backend service with the loadBalancingScheme set to INTERNAL_SELF_MANAGED or EXTERNAL_MANAGED. - A regional backend service with the service protocol set to HTTP, HTTPS, HTTP2 or H2C, and loadBalancingScheme set to INTERNAL_MANAGED or EXTERNAL_MANAGED. Not supported for Serverless NEGs. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |
| `params` | BackendServiceParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `port` | integer (int32) | Deprecated in favor of portName. The TCP port to connect on the backend. The default value is 80. For internal passthrough Network Load Balancers and external passthrough Network Load Balancers, omit port. |
| `portName` | string | A named port on a backend instance group representing the port for communication to the backend VMs in that group. The named port must be defined on each backend instance group (https://cloud.google.com/load-balancing/docs/backend-service#named_ports). This parameter has no meaning if the backends are NEGs. For internal passthrough Network Load Balancers and external passthrough Network Load Balancers, omit port_name. |
| `protocol` | string enum | The protocol this BackendService uses to communicate with backends. Possible values are HTTP, HTTPS, HTTP2, H2C, TCP, SSL, UDP, GRPC, or UNSPECIFIED, depending on the chosen load balancer or Traffic Director configuration. Refer to Load balancing features for more information. Must be set to GRPC when the backend service is referenced by a URL map that is bound to target gRPC proxy. Values: `ALL`, `GRPC`, `H2C`, `HTTP`, `HTTP2`, `HTTPS`, `SSL`, `TCP`, `UDP`, `UNSPECIFIED`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional backend service resides. This field is not applicable to global backend services. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `securityPolicy` | string | \[Output Only\] The resource URL for the security policy associated with this backend service. |
| `securitySettings` | SecuritySettings | This field specifies the security settings that apply to this backend service. This field is applicable to a global backend service with the load_balancing_scheme set to INTERNAL_SELF_MANAGED. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `serviceBindings` | array<string> | URLs of networkservices.ServiceBinding resources. Can only be set if load balancing scheme is INTERNAL_SELF_MANAGED. If set, lists of backends and health checks must be both empty. |
| `serviceClassId` | string | Optional. The service class ID associated with this resource. Producer Service's Service class ID for the region of this backend service. Can only be used with network_attachment. It is not possible to use on its own; however, network_attachment can be used without service_class_id. |
| `serviceLbPolicy` | string | URL to networkservices.ServiceLbPolicy resource. Can only be set if load balancing scheme is EXTERNAL_MANAGED, INTERNAL_MANAGED or INTERNAL_SELF_MANAGED for a global backend service, and EXTERNAL_MANAGED or INTERNAL_MANAGED for a regional backend service. For a global backend service, the service lb policy must be global. For a regional backend service, the service lb policy must be regional and in the same region. |
| `sessionAffinity` | string enum | Type of session affinity to use. The default is NONE. Only NONE and HEADER_FIELD are supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. For more details, see: Session Affinity (https://cloud.google.com/load-balancing/docs/backend-service#session_affinity). sessionAffinity cannot be specified with haPolicy. Values: `CLIENT_IP`, `CLIENT_IP_NO_DESTINATION`, `CLIENT_IP_PORT_PROTO`, `CLIENT_IP_PROTO`, `GENERATED_COOKIE`, `HEADER_FIELD`, `HTTP_COOKIE`, `NONE`, `STRONG_COOKIE_AFFINITY`. |
| `strongSessionAffinityCookie` | BackendServiceHttpCookie | Describes the HTTP cookie used for stateful session affinity. This field is applicable and required if the sessionAffinity is set toSTRONG_COOKIE_AFFINITY. |
| `subsetting` | Subsetting | subsetting cannot be specified with haPolicy. |
| `timeoutSec` | integer (int32) | The backend service timeout has a different meaning depending on the type of load balancer. For more information see, Backend service settings. The default is 30 seconds. The full range of timeout values allowed goes from 1 through 2,147,483,647 seconds. This value can be overridden in the PathMatcher configuration of the UrlMap that references this backend service. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. Instead, use maxStreamDuration. |
| `tlsSettings` | BackendServiceTlsSettings | Configuration for Backend Authenticated TLS and mTLS. May only be specified when the backend protocol is SSL, HTTPS or HTTP2. |
| `usedBy` | array<BackendServiceUsedBy> | Output only. \[Output Only\] List of resources referencing given backend service. |

### Shape of `AWSV4Signature`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "accessKey": "string",
  "accessKeyId": "string",
  "accessKeyVersion": "string",
  "originRegion": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
