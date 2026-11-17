---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 14/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `UsableSubnetworkSecondaryRange`

- Secondary IP range of a usable subnetwork.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipCidrRange` | string | The range of IP addresses belonging to this subnetwork secondary range. Can be Ipv4 or Ipv6 range. |
| `rangeName` | string | The name associated with this subnetwork secondary range, used when adding an alias IP range to a VM instance. The name must be 1-63 characters long, and comply withRFC1035. The name must be unique within the subnetwork. |

### `UsableSubnetworksAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `items` | array<UsableSubnetwork> | \[Output\] A list of usable subnetwork URLs. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#usableSubnetworksAggregatedList for aggregated lists of usable subnetworks. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. In special cases listUsable may return 0 subnetworks andnextPageToken which still should be used to get the next page of results. |
| `scopedWarnings` | array<SubnetworksScopedWarning> | Output only. \[Output Only\] Informational warning messages for failures encountered from scopes. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `UsageExportLocation`

- The location in Cloud Storage and naming method of the daily usage report. Contains bucket_name and report_name prefix.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucketName` | string | The name of an existing bucket in Cloud Storage where the usage report object is stored. The Google Service Account is granted write access to this bucket. This can either be the bucket name by itself, such asexample-bucket, or the bucket name with gs:// or https://storage.googleapis.com/ in front of it, such as gs://example-bucket. |
| `reportNamePrefix` | string | An optional prefix for the name of the usage report object stored inbucketName. If not supplied, defaults tousage_gce. The report is stored as a CSV file namedreport_name_prefix_gce_YYYYMMDD.csv whereYYYYMMDD is the day of the usage according to Pacific Time. If you supply a prefix, it should conform to Cloud Storageobject naming conventions. |

### `UtilizationRange`

- Represents a range of acceptable utilization values. This message is used to configure range-based scaling policies, allowing Autoscaler to maintain utilization within a specified range instead of aiming for a single target point.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `maxUtilization` | number (double) | Required. The upper bound of the utilization range. Must be greater or equal to min_utilization. This value is required when using range-based scaling. Scaling out is triggered if the utilization exceeds this value. |
| `minUtilization` | number (double) | Required. The lower bound of the utilization range. Must be smaller or equal to max_utilization. This value is required when using range-based scaling. Scaling in is considered only if the utilization drops below this value. |
| `utilizationTarget` | number (double) | The target utilization that the autoscaler aims to achieve when scaling is triggered. This value must be within the range \[min_utilization, max_utilization\]. If not specified, this will default to the average of max_utilization and min_utilization. |

### `VmEndpointNatMappings`

- Contain information of Nat mapping for a VM endpoint (i.e., NIC).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceName` | string | Output only. Name of the VM instance which the endpoint belongs to |
| `interfaceNatMappings` | array<VmEndpointNatMappingsInterfaceNatMappings> | — |

### `VmEndpointNatMappingsInterfaceNatMappings`

- Contain information of Nat mapping for an interface of this endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `drainNatIpPortRanges` | array<string> | Output only. List of all drain IP:port-range mappings assigned to this interface. These ranges are inclusive, that is, both the first and the last ports can be used for NAT. Example: \["2.2.2.2:12345-12355", "1.1.1.1:2234-2234"\]. |
| `natIpPortRanges` | array<string> | Output only. A list of all IP:port-range mappings assigned to this interface. These ranges are inclusive, that is, both the first and the last ports can be used for NAT. Example: \["2.2.2.2:12345-12355", "1.1.1.1:2234-2234"\]. |
| `numTotalDrainNatPorts` | integer (int32) | Output only. Total number of drain ports across all NAT IPs allocated to this interface. It equals to the aggregated port number in the field drain_nat_ip_port_ranges. |
| `numTotalNatPorts` | integer (int32) | Output only. Total number of ports across all NAT IPs allocated to this interface. It equals to the aggregated port number in the field nat_ip_port_ranges. |
| `ruleMappings` | array<VmEndpointNatMappingsInterfaceNatMappingsNatRuleMappings> | Output only. Information about mappings provided by rules in this NAT. |
| `sourceAliasIpRange` | string | Output only. Alias IP range for this interface endpoint. It will be a private (RFC 1918) IP range. Examples: "10.33.4.55/32", or "192.168.5.0/24". |
| `sourceVirtualIp` | string | Output only. Primary IP of the VM for this NIC. |

### `VmEndpointNatMappingsInterfaceNatMappingsNatRuleMappings`

- Contains information of NAT Mappings provided by a NAT Rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `drainNatIpPortRanges` | array<string> | Output only. List of all drain IP:port-range mappings assigned to this interface by this rule. These ranges are inclusive, that is, both the first and the last ports can be used for NAT. Example: \["2.2.2.2:12345-12355", "1.1.1.1:2234-2234"\]. |
| `natIpPortRanges` | array<string> | Output only. A list of all IP:port-range mappings assigned to this interface by this rule. These ranges are inclusive, that is, both the first and the last ports can be used for NAT. Example: \["2.2.2.2:12345-12355", "1.1.1.1:2234-2234"\]. |
| `numTotalDrainNatPorts` | integer (int32) | Output only. Total number of drain ports across all NAT IPs allocated to this interface by this rule. It equals the aggregated port number in the field drain_nat_ip_port_ranges. |
| `numTotalNatPorts` | integer (int32) | Output only. Total number of ports across all NAT IPs allocated to this interface by this rule. It equals the aggregated port number in the field nat_ip_port_ranges. |
| `ruleNumber` | integer (int32) | Output only. Rule number of the NAT Rule. |

### `VmEndpointNatMappingsList`

- Contains a list of VmEndpointNatMappings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#vmEndpointNatMappingsList for lists of Nat mappings of VM endpoints. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `result` | array<VmEndpointNatMappings> | \[Output Only\] A list of Nat mapping information of VM endpoints. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `VmExtension`

- A VM extension that can be installed on a VM.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the vm extension. |
| `versions` | array<string> | The latest 10 versions of the vm extension. |

### `VmExtensionPoliciesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vmExtensionPolicies` | array<VmExtensionPolicy> | List of VmExtensionPolicy resources contained in this scope. |
| `warning` | object | Informational warning which replaces the list of backend services when the list is empty. |

### `VmExtensionPolicy`

- Represents a VM extension policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. |
| `extensionPolicies` | object | Required. A map of extension names (for example, "ops-agent") to their corresponding policy configurations. |
| `globalResourceLink` | string | Optional. Output only. \[Output Only\] Link to the global policy that manages this zone policy, if applicable. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instanceSelectors` | array<VmExtensionPolicyInstanceSelector> | Optional. Selectors to target VMs for this policy. VMs are selected if they match \*any\* of the provided selectors (logical OR). If this list is empty, the policy applies to all VMs. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#vmExtensionPolicy. |
| `managedByGlobal` | boolean | Optional. Output only. \[Output Only\] Indicates if this policy is managed by a global policy. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `priority` | integer (int32) | Optional. Priority of this policy. Used to resolve conflicts when multiple policies apply to the same extension. The policy priority is an integer from 0 to 65535, inclusive. Lower integers indicate higher priorities. If you do not specify a priority when creating a rule, it is assigned a priority of 1000. If priorities are equal, the policy with the most recent creation timestamp takes precedence. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `state` | string enum | Optional. Output only. \[Output Only\] Current state of the policy: ACTIVE or DELETING. Values: `ACTIVE`, `DELETING`, `STATE_UNSPECIFIED`. |
| `updateTimestamp` | string | Output only. \[Output Only\] Update timestamp inRFC3339 text format. |

### `VmExtensionPolicyAggregatedListResponse`

- Response for the aggregated list of VM extension policies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of VmExtensionPoliciesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#VmExtensionPolicyAggregatedList for lists of VmExtensionPolicies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `VmExtensionPolicyExtensionPolicy`

- Configuration for a specific VM extension.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pinnedVersion` | string | Optional. The specific version of the extension to install. If not set, the latest version is used. |
| `stringConfig` | string | Optional. String-based configuration data for the extension. |

### `VmExtensionPolicyExtensionPolicy` (alpha)

- Configuration for a specific VM extension.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `installedSoftwareSelector` | VmExtensionPolicyInstalledSoftwareSelector | Optional. Only deploy this extension if the specified software is detected on the VM. For a live list of valid software values, see: https://cloud.google.com/compute/docs/vm-extensions/supported-software |
| `pinnedVersion` | string | Optional. The specific version of the extension to install. If not set, the latest version is used. |
| `stringConfig` | string | Optional. String-based configuration data for the extension. |

### `VmExtensionPolicyInstalledSoftwareSelector`

- Defines the software requirements for a VM extension policy.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `anyOfSelectors` | object | Optional. If any of these SelectorSets are satisfied, the condition is met (OR logic). The key is a user-provided name for this set. |

### `VmExtensionPolicyInstalledSoftwareSelectorSelectorSet`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `allOfSelectors` | array<string> | Optional. All software in this list must be detected (AND logic). Valid software names (e.g. "Apache Web Server"). |

### `VmExtensionPolicyInstanceSelector`

- Defines how to select VMs to apply a zone VM extension policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labelSelector` | VmExtensionPolicyLabelSelector | Optional. LabelSelector selects VMs based on their labels. |

### `VmExtensionPolicyLabelSelector`

- A LabelSelector is applied to a VM only if it matches all the specified labels.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inclusionLabels` | object | Optional. A map of key-value pairs representing VM labels. VMs must have all of the labels specified in this map to be selected (logical AND). e.g. If the `inclusion_labels` are {("key1", "value1"), ("key2", "value2")}, the VM labels must contain both ("key1", "value1") and ("key2", "value2") to be selected. If the VM labels are ("key1", "value1") and ("something", "else"), it will not be selected. If the map is empty, it's considered a match. |

### `VmExtensionPolicyList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Output only. \[Output Only\] Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a VmExtensionPolicy. An up-to-date fingerprint must be provided in order to update the VmExtensionPolicy. To see the latest value of the fingerprint, make a get() request to retrieve a VmExtensionPolicy. |
| `id` | string | Output only. \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<VmExtensionPolicy> | Output only. \[Output Only\] A list of VM extension policy resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | Output only. \[Output Only\] Informational warning message. |

### `VmExtensionState`

- State of an extension on an instance.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `enforcementMsg` | string | The status message of the extension if the extension fails to enforce. |
| `enforcementState` | string enum | The enforcement state of the extension. If the extension is not enforced yet, then the health status will not be specified. Values: `APPLYING_CONFIG`, `ENFORCEMENT_STATE_UNSPECIFIED`, `INCOMPATIBLE`, `INSTALLED`, `INSTALLING`, `INSTALL_FAILED`, `REMOVING`, `ROLLBACK_FAILED`, `ROLLED_BACK`, `ROLLING_BACK`, `SERVICE_DISABLED`. |
| `healthMsg` | string | The health status message of the extension. |
| `healthStatus` | string enum | The health status of the extension. Values: `CRASHED`, `HEALTH_STATUS_UNSPECIFIED`, `RUNNING`, `STARTING`, `STOPPED`, `STOPPING`. |
| `name` | string | The name of the extension. |
| `policyId` | string | The id of the policy that is enforced on the extension. |
| `version` | string | The version of the extension. |

### `VpnGateway`

- Represents a HA VPN gateway. HA VPN is a high-availability (HA) Cloud VPN solution that lets you securely connect your on-premises network to your Google Cloud Virtual Private Cloud network through an IPsec VPN connection in a single region. For more information about Cloud HA VPN solutions, see Cloud VPN topologies .
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `gatewayIpVersion` | string enum | The IP family of the gateway IPs for the HA-VPN gateway interfaces. If not specified, IPV4 will be used. Values: `IPV4`, `IPV6`. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#vpnGateway for VPN gateways. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this VpnGateway, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a VpnGateway. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | URL of the network to which this VPN gateway is attached. Provided by the client when the VPN gateway is created. |
| `params` | VpnGatewayParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | Output only. \[Output Only\] URL of the region where the VPN gateway resides. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `stackType` | string enum | The stack type for this VPN gateway to identify the IP protocols that are enabled. Possible values are: IPV4_ONLY,IPV4_IPV6, IPV6_ONLY. If not specified,IPV4_ONLY is used if the gateway IP version isIPV4, or IPV4_IPV6 if the gateway IP version isIPV6. Values: `IPV4_IPV6`, `IPV4_ONLY`, `IPV6_ONLY`. |
| `vpnInterfaces` | array<VpnGatewayVpnGatewayInterface> | The list of VPN interfaces associated with this VPN gateway. |

### `VpnGatewayAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of VpnGateway resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#vpnGateway for VPN gateways. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `VpnGatewayList`

- Contains a list of VpnGateway resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<VpnGateway> | A list of VpnGateway resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#vpnGateway for VPN gateways. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `VpnGatewayParams`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. \* Inconsistent format is not supported. For instance: {"tagKeys/333" : "tagValues/444", "123/env" : "prod"} is invalid. |

### `VpnGatewayStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vpnConnections` | array<VpnGatewayStatusVpnConnection> | Output only. List of VPN connection for this VpnGateway. |

### `VpnGatewayStatusHighAvailabilityRequirementState`

- Describes the high availability requirement state for the VPN connection between this Cloud VPN gateway and a peer gateway.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Indicates the high availability requirement state for the VPN connection. Valid values are CONNECTION_REDUNDANCY_MET,CONNECTION_REDUNDANCY_NOT_MET. Values: `CONNECTION_REDUNDANCY_MET`, `CONNECTION_REDUNDANCY_NOT_MET`. |
| `unsatisfiedReason` | string enum | Indicates the reason why the VPN connection does not meet the high availability redundancy criteria/requirement. Valid values is INCOMPLETE_TUNNELS_COVERAGE. Values: `INCOMPLETE_TUNNELS_COVERAGE`. |

### `VpnGatewayStatusTunnel`

- Contains some information about a VPN tunnel.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `localGatewayInterface` | integer (uint32) | Output only. The VPN gateway interface this VPN tunnel is associated with. |
| `peerGatewayInterface` | integer (uint32) | Output only. The peer gateway interface this VPN tunnel is connected to, the peer gateway could either be an external VPN gateway or a Google Cloud VPN gateway. |
| `tunnelUrl` | string | Output only. URL reference to the VPN tunnel. |

### `VpnGatewayStatusVpnConnection`

- A VPN connection contains all VPN tunnels connected from this VpnGateway to the same peer gateway. The peer gateway could either be an external VPN gateway or a Google Cloud VPN gateway.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `peerExternalGateway` | string | Output only. URL reference to the peer external VPN gateways to which the VPN tunnels in this VPN connection are connected. This field is mutually exclusive with peer_gcp_gateway. |
| `peerGcpGateway` | string | Output only. URL reference to the peer side VPN gateways to which the VPN tunnels in this VPN connection are connected. This field is mutually exclusive with peer_gcp_gateway. |
| `state` | VpnGatewayStatusHighAvailabilityRequirementState | HighAvailabilityRequirementState for the VPN connection. |
| `tunnels` | array<VpnGatewayStatusTunnel> | List of VPN tunnels that are in this VPN connection. |

### `VpnGatewayVpnGatewayInterface`

- A VPN gateway interface.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | integer (uint32) | Output only. \[Output Only\] Numeric identifier for this VPN interface associated with the VPN gateway. |
| `interconnectAttachment` | string | URL of the VLAN attachment (interconnectAttachment) resource for this VPN gateway interface. When the value of this field is present, the VPN gateway is used for HA VPN over Cloud Interconnect; all egress or ingress traffic for this VPN gateway interface goes through the specified VLAN attachment resource. |
| `ipAddress` | string | Output only. \[Output Only\] IP address for this VPN interface associated with the VPN gateway. The IP address could be either a regional external IP address or a regional internal IP address. The two IP addresses for a VPN gateway must be all regional external or regional internal IP addresses. There cannot be a mix of regional external IP addresses and regional internal IP addresses. For HA VPN over Cloud Interconnect, the IP addresses for both interfaces could either be regional internal IP addresses or regional external IP addresses. For regular (non HA VPN over Cloud Interconnect) HA VPN tunnels, the IP address must be a regional external IP address. |
| `ipv6Address` | string | Output only. \[Output Only\] IPv6 address for this VPN interface associated with the VPN gateway. The IPv6 address must be a regional external IPv6 address. The format is RFC 5952 format (e.g. 2001:db8::2d9:51:0:0). |

### `VpnGatewaysGetStatusResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `result` | VpnGatewayStatus | — |

### `VpnGatewaysScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vpnGateways` | array<VpnGateway> | \[Output Only\] A list of VPN gateways contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of addresses when the list is empty. |

### `VpnTunnel`

- Represents a Cloud VPN Tunnel resource. For more information about VPN, read the the Cloud VPN Overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cipherSuite` | VpnTunnelCipherSuite | User specified list of ciphers to use for the phase 1 and phase 2 of the IKE protocol. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `detailedStatus` | string | \[Output Only\] Detailed status message for the VPN tunnel. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ikeVersion` | integer (int32) | IKE protocol version to use when establishing the VPN tunnel with the peer VPN gateway. Acceptable IKE versions are 1 or 2. The default version is 2. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#vpnTunnel for VPN tunnels. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this VpnTunnel, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a VpnTunnel. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `localTrafficSelector` | array<string> | Local traffic selector to use when establishing the VPN tunnel with the peer VPN gateway. The value should be a CIDR formatted string, for example: 192.168.0.0/16. The ranges must be disjoint. Only IPv4 is supported for Classic VPN tunnels. This field is output only for HA VPN tunnels. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | VpnTunnelParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `peerExternalGateway` | string | URL of the peer side external VPN gateway to which this VPN tunnel is connected. Provided by the client when the VPN tunnel is created. This field is exclusive with the field peerGcpGateway. |
| `peerExternalGatewayInterface` | integer (int32) | The interface ID of the external VPN gateway to which this VPN tunnel is connected. Provided by the client when the VPN tunnel is created. Possible values are: `0`, `1`, `2`, `3`. The number of IDs in use depends on the external VPN gateway redundancy type. |
| `peerGcpGateway` | string | URL of the peer side HA VPN gateway to which this VPN tunnel is connected. Provided by the client when the VPN tunnel is created. This field can be used when creating highly available VPN from VPC network to VPC network, the field is exclusive with the field peerExternalGateway. If provided, the VPN tunnel will automatically use the same vpnGatewayInterface ID in the peer Google Cloud VPN gateway. |
| `peerIp` | string | IP address of the peer VPN gateway. Only IPv4 is supported. This field can be set only for Classic VPN tunnels. |
| `region` | string | \[Output Only\] URL of the region where the VPN tunnel resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `remoteTrafficSelector` | array<string> | Remote traffic selectors to use when establishing the VPN tunnel with the peer VPN gateway. The value should be a CIDR formatted string, for example: 192.168.0.0/16. The ranges should be disjoint. Only IPv4 is supported for Classic VPN tunnels. This field is output only for HA VPN tunnels. |
| `router` | string | URL of the router resource to be used for dynamic routing. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `sharedSecret` | string | Shared secret used to set the secure session between the Cloud VPN gateway and the peer VPN gateway. |
| `sharedSecretHash` | string | Hash of the shared secret. |
| `status` | string enum | \[Output Only\] The status of the VPN tunnel, which can be one of the following: - PROVISIONING: Resource is being allocated for the VPN tunnel. - WAITING_FOR_FULL_CONFIG: Waiting to receive all VPN-related configs from the user. Network, TargetVpnGateway, VpnTunnel, ForwardingRule, and Route resources are needed to setup the VPN tunnel. - FIRST_HANDSHAKE: Successful first handshake with the peer VPN. - ESTABLISHED: Secure session is successfully established with the peer VPN. - NETWORK_ERROR: Deprecated, replaced by NO_INCOMING_PACKETS - AUTHORIZATION_ERROR: Auth error (for example, bad shared secret). - NEGOTIATION_FAILURE: Handshake failed. - DEPROVISIONING: Resources are being deallocated for the VPN tunnel. - FAILED: Tunnel creation has failed and the tunnel is not ready to be used. - NO_INCOMING_PACKETS: No incoming packets from peer. - REJECTED: Tunnel configuration was rejected, can be result of being denied access. - ALLOCATING_RESOURCES: Cloud VPN is in the process of allocating all required resources. - STOPPED: Tunnel is stopped due to its Forwarding Rules being deleted for Classic VPN tunnels or the project is in frozen state. - PEER_IDENTITY_MISMATCH: Peer identity does not match peer IP, probably behind NAT. - TS_NARROWING_NOT_ALLOWED: Traffic selector narrowing not allowed for an HA-VPN tunnel. Values: `ALLOCATING_RESOURCES`, `AUTHORIZATION_ERROR`, `DEPROVISIONING`, `ESTABLISHED`, `FAILED`, `FIRST_HANDSHAKE`, `NEGOTIATION_FAILURE`, `NETWORK_ERROR`, `NO_INCOMING_PACKETS`, `PROVISIONING`, `REJECTED`, `STOPPED`, `WAITING_FOR_FULL_CONFIG`. |
| `targetVpnGateway` | string | URL of the Target VPN gateway with which this VPN tunnel is associated. Provided by the client when the VPN tunnel is created. This field can be set only for Classic VPN tunnels. |
| `vpnGateway` | string | URL of the VPN gateway with which this VPN tunnel is associated. Provided by the client when the VPN tunnel is created. This must be used (instead of target_vpn_gateway) if a High Availability VPN gateway resource is created. |
| `vpnGatewayInterface` | integer (int32) | The interface ID of the VPN gateway with which this VPN tunnel is associated. Possible values are: `0`, `1`. |

### `VpnTunnel` (alpha)

- Represents a Cloud VPN Tunnel resource. For more information about VPN, read the the Cloud VPN Overview.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `capacityTier` | string enum | Capacity tier of the VPN tunnel. This is used for IPsec over Interconnect tunnels to indicate different bandwidth limits. Values: `DEFAULT`, `HIGH`. |
| `cipherSuite` | VpnTunnelCipherSuite | User specified list of ciphers to use for the phase 1 and phase 2 of the IKE protocol. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `detailedStatus` | string | \[Output Only\] Detailed status message for the VPN tunnel. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ikeVersion` | integer (int32) | IKE protocol version to use when establishing the VPN tunnel with the peer VPN gateway. Acceptable IKE versions are 1 or 2. The default version is 2. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#vpnTunnel for VPN tunnels. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this VpnTunnel, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a VpnTunnel. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `localTrafficSelector` | array<string> | Local traffic selector to use when establishing the VPN tunnel with the peer VPN gateway. The value should be a CIDR formatted string, for example: 192.168.0.0/16. The ranges must be disjoint. Only IPv4 is supported for Classic VPN tunnels. This field is output only for HA VPN tunnels. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | VpnTunnelParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `peerExternalGateway` | string | URL of the peer side external VPN gateway to which this VPN tunnel is connected. Provided by the client when the VPN tunnel is created. This field is exclusive with the field peerGcpGateway. |
| `peerExternalGatewayInterface` | integer (int32) | The interface ID of the external VPN gateway to which this VPN tunnel is connected. Provided by the client when the VPN tunnel is created. Possible values are: `0`, `1`, `2`, `3`. The number of IDs in use depends on the external VPN gateway redundancy type. |
| `peerGcpGateway` | string | URL of the peer side HA VPN gateway to which this VPN tunnel is connected. Provided by the client when the VPN tunnel is created. This field can be used when creating highly available VPN from VPC network to VPC network, the field is exclusive with the field peerExternalGateway. If provided, the VPN tunnel will automatically use the same vpnGatewayInterface ID in the peer Google Cloud VPN gateway. |
| `peerIp` | string | IP address of the peer VPN gateway. Only IPv4 is supported. This field can be set only for Classic VPN tunnels. |
| `pqcPhase1` | VpnTunnelPqc | User specified list of PQC key exchange mechanisms (KEMs) to use for the phase 1 of the IKE protocol. |
| `pqcPhase2` | VpnTunnelPqc | User specified list of PQC key exchange mechanisms (KEMs) to use for the phase 2 of the IKE protocol. |
| `region` | string | \[Output Only\] URL of the region where the VPN tunnel resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `remoteTrafficSelector` | array<string> | Remote traffic selectors to use when establishing the VPN tunnel with the peer VPN gateway. The value should be a CIDR formatted string, for example: 192.168.0.0/16. The ranges should be disjoint. Only IPv4 is supported for Classic VPN tunnels. This field is output only for HA VPN tunnels. |
| `router` | string | URL of the router resource to be used for dynamic routing. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `sharedSecret` | string | Shared secret used to set the secure session between the Cloud VPN gateway and the peer VPN gateway. |
| `sharedSecretHash` | string | Hash of the shared secret. |
| `status` | string enum | \[Output Only\] The status of the VPN tunnel, which can be one of the following: - PROVISIONING: Resource is being allocated for the VPN tunnel. - WAITING_FOR_FULL_CONFIG: Waiting to receive all VPN-related configs from the user. Network, TargetVpnGateway, VpnTunnel, ForwardingRule, and Route resources are needed to setup the VPN tunnel. - FIRST_HANDSHAKE: Successful first handshake with the peer VPN. - ESTABLISHED: Secure session is successfully established with the peer VPN. - NETWORK_ERROR: Deprecated, replaced by NO_INCOMING_PACKETS - AUTHORIZATION_ERROR: Auth error (for example, bad shared secret). - NEGOTIATION_FAILURE: Handshake failed. - DEPROVISIONING: Resources are being deallocated for the VPN tunnel. - FAILED: Tunnel creation has failed and the tunnel is not ready to be used. - NO_INCOMING_PACKETS: No incoming packets from peer. - REJECTED: Tunnel configuration was rejected, can be result of being denied access. - ALLOCATING_RESOURCES: Cloud VPN is in the process of allocating all required resources. - STOPPED: Tunnel is stopped due to its Forwarding Rules being deleted for Classic VPN tunnels or the project is in frozen state. - PEER_IDENTITY_MISMATCH: Peer identity does not match peer IP, probably behind NAT. - TS_NARROWING_NOT_ALLOWED: Traffic selector narrowing not allowed for an HA-VPN tunnel. Values: `ALLOCATING_RESOURCES`, `AUTHORIZATION_ERROR`, `DEPROVISIONING`, `ESTABLISHED`, `FAILED`, `FIRST_HANDSHAKE`, `NEGOTIATION_FAILURE`, `NETWORK_ERROR`, `NO_INCOMING_PACKETS`, `PROVISIONING`, `REJECTED`, `STOPPED`, `WAITING_FOR_FULL_CONFIG`. |
| `targetVpnGateway` | string | URL of the Target VPN gateway with which this VPN tunnel is associated. Provided by the client when the VPN tunnel is created. This field can be set only for Classic VPN tunnels. |
| `vpnGateway` | string | URL of the VPN gateway with which this VPN tunnel is associated. Provided by the client when the VPN tunnel is created. This must be used (instead of target_vpn_gateway) if a High Availability VPN gateway resource is created. |
| `vpnGatewayInterface` | integer (int32) | The interface ID of the VPN gateway with which this VPN tunnel is associated. Possible values are: `0`, `1`. |

### `VpnTunnel` (beta)

- Represents a Cloud VPN Tunnel resource. For more information about VPN, read the the Cloud VPN Overview.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `capacityTier` | string enum | Capacity tier of the VPN tunnel. This is used for IPsec over Interconnect tunnels to indicate different bandwidth limits. Values: `DEFAULT`, `HIGH`. |
| `cipherSuite` | VpnTunnelCipherSuite | User specified list of ciphers to use for the phase 1 and phase 2 of the IKE protocol. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `detailedStatus` | string | \[Output Only\] Detailed status message for the VPN tunnel. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ikeVersion` | integer (int32) | IKE protocol version to use when establishing the VPN tunnel with the peer VPN gateway. Acceptable IKE versions are 1 or 2. The default version is 2. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#vpnTunnel for VPN tunnels. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this VpnTunnel, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a VpnTunnel. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `localTrafficSelector` | array<string> | Local traffic selector to use when establishing the VPN tunnel with the peer VPN gateway. The value should be a CIDR formatted string, for example: 192.168.0.0/16. The ranges must be disjoint. Only IPv4 is supported for Classic VPN tunnels. This field is output only for HA VPN tunnels. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | VpnTunnelParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `peerExternalGateway` | string | URL of the peer side external VPN gateway to which this VPN tunnel is connected. Provided by the client when the VPN tunnel is created. This field is exclusive with the field peerGcpGateway. |
| `peerExternalGatewayInterface` | integer (int32) | The interface ID of the external VPN gateway to which this VPN tunnel is connected. Provided by the client when the VPN tunnel is created. Possible values are: `0`, `1`, `2`, `3`. The number of IDs in use depends on the external VPN gateway redundancy type. |
| `peerGcpGateway` | string | URL of the peer side HA VPN gateway to which this VPN tunnel is connected. Provided by the client when the VPN tunnel is created. This field can be used when creating highly available VPN from VPC network to VPC network, the field is exclusive with the field peerExternalGateway. If provided, the VPN tunnel will automatically use the same vpnGatewayInterface ID in the peer Google Cloud VPN gateway. |
| `peerIp` | string | IP address of the peer VPN gateway. Only IPv4 is supported. This field can be set only for Classic VPN tunnels. |
| `region` | string | \[Output Only\] URL of the region where the VPN tunnel resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `remoteTrafficSelector` | array<string> | Remote traffic selectors to use when establishing the VPN tunnel with the peer VPN gateway. The value should be a CIDR formatted string, for example: 192.168.0.0/16. The ranges should be disjoint. Only IPv4 is supported for Classic VPN tunnels. This field is output only for HA VPN tunnels. |
| `router` | string | URL of the router resource to be used for dynamic routing. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `sharedSecret` | string | Shared secret used to set the secure session between the Cloud VPN gateway and the peer VPN gateway. |
| `sharedSecretHash` | string | Hash of the shared secret. |
| `status` | string enum | \[Output Only\] The status of the VPN tunnel, which can be one of the following: - PROVISIONING: Resource is being allocated for the VPN tunnel. - WAITING_FOR_FULL_CONFIG: Waiting to receive all VPN-related configs from the user. Network, TargetVpnGateway, VpnTunnel, ForwardingRule, and Route resources are needed to setup the VPN tunnel. - FIRST_HANDSHAKE: Successful first handshake with the peer VPN. - ESTABLISHED: Secure session is successfully established with the peer VPN. - NETWORK_ERROR: Deprecated, replaced by NO_INCOMING_PACKETS - AUTHORIZATION_ERROR: Auth error (for example, bad shared secret). - NEGOTIATION_FAILURE: Handshake failed. - DEPROVISIONING: Resources are being deallocated for the VPN tunnel. - FAILED: Tunnel creation has failed and the tunnel is not ready to be used. - NO_INCOMING_PACKETS: No incoming packets from peer. - REJECTED: Tunnel configuration was rejected, can be result of being denied access. - ALLOCATING_RESOURCES: Cloud VPN is in the process of allocating all required resources. - STOPPED: Tunnel is stopped due to its Forwarding Rules being deleted for Classic VPN tunnels or the project is in frozen state. - PEER_IDENTITY_MISMATCH: Peer identity does not match peer IP, probably behind NAT. - TS_NARROWING_NOT_ALLOWED: Traffic selector narrowing not allowed for an HA-VPN tunnel. Values: `ALLOCATING_RESOURCES`, `AUTHORIZATION_ERROR`, `DEPROVISIONING`, `ESTABLISHED`, `FAILED`, `FIRST_HANDSHAKE`, `NEGOTIATION_FAILURE`, `NETWORK_ERROR`, `NO_INCOMING_PACKETS`, `PROVISIONING`, `REJECTED`, `STOPPED`, `WAITING_FOR_FULL_CONFIG`. |
| `targetVpnGateway` | string | URL of the Target VPN gateway with which this VPN tunnel is associated. Provided by the client when the VPN tunnel is created. This field can be set only for Classic VPN tunnels. |
| `vpnGateway` | string | URL of the VPN gateway with which this VPN tunnel is associated. Provided by the client when the VPN tunnel is created. This must be used (instead of target_vpn_gateway) if a High Availability VPN gateway resource is created. |
| `vpnGatewayInterface` | integer (int32) | The interface ID of the VPN gateway with which this VPN tunnel is associated. Possible values are: `0`, `1`. |

### `VpnTunnel` (preview)

- Represents a Cloud VPN Tunnel resource. For more information about VPN, read the the Cloud VPN Overview.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `cipherSuite` | VpnTunnelCipherSuite | User specified list of ciphers to use for the phase 1 and phase 2 of the IKE protocol. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `detailedStatus` | string | \[Output Only\] Detailed status message for the VPN tunnel. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ikeVersion` | integer (int32) | IKE protocol version to use when establishing the VPN tunnel with the peer VPN gateway. Acceptable IKE versions are 1 or 2. The default version is 2. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#vpnTunnel for VPN tunnels. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this VpnTunnel, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a VpnTunnel. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `localTrafficSelector` | array<string> | Local traffic selector to use when establishing the VPN tunnel with the peer VPN gateway. The value should be a CIDR formatted string, for example: 192.168.0.0/16. The ranges must be disjoint. Only IPv4 is supported for Classic VPN tunnels. This field is output only for HA VPN tunnels. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | VpnTunnelParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `peerExternalGateway` | string | URL of the peer side external VPN gateway to which this VPN tunnel is connected. Provided by the client when the VPN tunnel is created. This field is exclusive with the field peerGcpGateway. |
| `peerExternalGatewayInterface` | integer (int32) | The interface ID of the external VPN gateway to which this VPN tunnel is connected. Provided by the client when the VPN tunnel is created. Possible values are: `0`, `1`, `2`, `3`. The number of IDs in use depends on the external VPN gateway redundancy type. |
| `peerGcpGateway` | string | URL of the peer side HA VPN gateway to which this VPN tunnel is connected. Provided by the client when the VPN tunnel is created. This field can be used when creating highly available VPN from VPC network to VPC network, the field is exclusive with the field peerExternalGateway. If provided, the VPN tunnel will automatically use the same vpnGatewayInterface ID in the peer Google Cloud VPN gateway. |
| `peerIp` | string | IP address of the peer VPN gateway. Only IPv4 is supported. This field can be set only for Classic VPN tunnels. |
| `pqcPhase1` | VpnTunnelPqc | User specified list of PQC key exchange mechanisms (KEMs) to use for the phase 1 of the IKE protocol. |
| `pqcPhase2` | VpnTunnelPqc | User specified list of PQC key exchange mechanisms (KEMs) to use for the phase 2 of the IKE protocol. |
| `region` | string | \[Output Only\] URL of the region where the VPN tunnel resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `remoteTrafficSelector` | array<string> | Remote traffic selectors to use when establishing the VPN tunnel with the peer VPN gateway. The value should be a CIDR formatted string, for example: 192.168.0.0/16. The ranges should be disjoint. Only IPv4 is supported for Classic VPN tunnels. This field is output only for HA VPN tunnels. |
| `router` | string | URL of the router resource to be used for dynamic routing. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `sharedSecret` | string | Shared secret used to set the secure session between the Cloud VPN gateway and the peer VPN gateway. |
| `sharedSecretHash` | string | Hash of the shared secret. |
| `status` | string enum | \[Output Only\] The status of the VPN tunnel, which can be one of the following: - PROVISIONING: Resource is being allocated for the VPN tunnel. - WAITING_FOR_FULL_CONFIG: Waiting to receive all VPN-related configs from the user. Network, TargetVpnGateway, VpnTunnel, ForwardingRule, and Route resources are needed to setup the VPN tunnel. - FIRST_HANDSHAKE: Successful first handshake with the peer VPN. - ESTABLISHED: Secure session is successfully established with the peer VPN. - NETWORK_ERROR: Deprecated, replaced by NO_INCOMING_PACKETS - AUTHORIZATION_ERROR: Auth error (for example, bad shared secret). - NEGOTIATION_FAILURE: Handshake failed. - DEPROVISIONING: Resources are being deallocated for the VPN tunnel. - FAILED: Tunnel creation has failed and the tunnel is not ready to be used. - NO_INCOMING_PACKETS: No incoming packets from peer. - REJECTED: Tunnel configuration was rejected, can be result of being denied access. - ALLOCATING_RESOURCES: Cloud VPN is in the process of allocating all required resources. - STOPPED: Tunnel is stopped due to its Forwarding Rules being deleted for Classic VPN tunnels or the project is in frozen state. - PEER_IDENTITY_MISMATCH: Peer identity does not match peer IP, probably behind NAT. - TS_NARROWING_NOT_ALLOWED: Traffic selector narrowing not allowed for an HA-VPN tunnel. Values: `ALLOCATING_RESOURCES`, `AUTHORIZATION_ERROR`, `DEPROVISIONING`, `ESTABLISHED`, `FAILED`, `FIRST_HANDSHAKE`, `NEGOTIATION_FAILURE`, `NETWORK_ERROR`, `NO_INCOMING_PACKETS`, `PROVISIONING`, `REJECTED`, `STOPPED`, `WAITING_FOR_FULL_CONFIG`. |
| `targetVpnGateway` | string | URL of the Target VPN gateway with which this VPN tunnel is associated. Provided by the client when the VPN tunnel is created. This field can be set only for Classic VPN tunnels. |
| `vpnGateway` | string | URL of the VPN gateway with which this VPN tunnel is associated. Provided by the client when the VPN tunnel is created. This must be used (instead of target_vpn_gateway) if a High Availability VPN gateway resource is created. |
| `vpnGatewayInterface` | integer (int32) | The interface ID of the VPN gateway with which this VPN tunnel is associated. Possible values are: `0`, `1`. |

### `VpnTunnelAdditionalKeyExchanges`

- User specified list of PQC key exchanges.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `ke1s` | array<string> | — Values: `KEY_ENCAPSULATION_MECHANISM_UNSPECIFIED`, `KE_NONE`, `ML_KEM_1024`, `ML_KEM_768`. |
| `ke2s` | array<string> | — Values: `KEY_ENCAPSULATION_MECHANISM_UNSPECIFIED`, `KE_NONE`, `ML_KEM_1024`, `ML_KEM_768`. |
| `ke3s` | array<string> | — Values: `KEY_ENCAPSULATION_MECHANISM_UNSPECIFIED`, `KE_NONE`, `ML_KEM_1024`, `ML_KEM_768`. |
| `ke4s` | array<string> | — Values: `KEY_ENCAPSULATION_MECHANISM_UNSPECIFIED`, `KE_NONE`, `ML_KEM_1024`, `ML_KEM_768`. |
| `ke5s` | array<string> | — Values: `KEY_ENCAPSULATION_MECHANISM_UNSPECIFIED`, `KE_NONE`, `ML_KEM_1024`, `ML_KEM_768`. |
| `ke6s` | array<string> | — Values: `KEY_ENCAPSULATION_MECHANISM_UNSPECIFIED`, `KE_NONE`, `ML_KEM_1024`, `ML_KEM_768`. |
| `ke7s` | array<string> | — Values: `KEY_ENCAPSULATION_MECHANISM_UNSPECIFIED`, `KE_NONE`, `ML_KEM_1024`, `ML_KEM_768`. |

### `VpnTunnelAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of VpnTunnelsScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#vpnTunnel for VPN tunnels. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `VpnTunnelCipherSuite`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `phase1` | VpnTunnelPhase1Algorithms | Cipher algorithms for IKE phase 1. |
| `phase2` | VpnTunnelPhase2Algorithms | Cipher algorithms for IKE phase 2. |

### `VpnTunnelList`

- Contains a list of VpnTunnel resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<VpnTunnel> | A list of VpnTunnel resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#vpnTunnel for VPN tunnels. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `VpnTunnelParams`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. \* Inconsistent format is not supported. For instance: {"tagKeys/333" : "tagValues/444", "123/env" : "prod"} is invalid. |

### `VpnTunnelPhase1Algorithms`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dh` | array<string> | Diffie-Hellman groups for IKE phase 1. |
| `encryption` | array<string> | Encryption algorithms for IKE phase 1. |
| `integrity` | array<string> | Integrity algorithms for IKE phase 1. |
| `prf` | array<string> | Pseudo-random functions (PRF) for IKE phase 1. |

### `VpnTunnelPhase2Algorithms`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryption` | array<string> | Encryption algorithms for IKE phase 2. |
| `integrity` | array<string> | Integrity algorithms for IKE phase 2. |
| `pfs` | array<string> | Perfect Forward Secrecy (PFS) groups for IKE phase 2. |

### `VpnTunnelPqc`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `keys` | VpnTunnelAdditionalKeyExchanges | — |
| `mode` | string enum | — Values: `DISABLED`, `ENABLED`, `PQC_MODE_UNSPECIFIED`. |

### `VpnTunnelsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vpnTunnels` | array<VpnTunnel> | A list of VPN tunnels contained in this scope. |
| `warning` | object | Informational warning which replaces the list of addresses when the list is empty. |

### `WafExpressionSet`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aliases` | array<string> | A list of alternate IDs. The format should be: - E.g. XSS-stable Generic suffix like "stable" is particularly useful if a policy likes to avail newer set of expressions without having to change the policy. A given alias name can't be used for more than one entity set. |
| `expressions` | array<WafExpressionSetExpression> | List of available expressions. |
| `id` | string | Google specified expression set ID. The format should be: - E.g. XSS-20170329 required |

### `WafExpressionSetExpression`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Expression ID should uniquely identify the origin of the expression. E.g. owasp-crs-v020901-id973337 identifies Owasp core rule set version 2.9.1 rule id 973337. The ID could be used to determine the individual attack definition that has been detected. It could also be used to exclude it from the policy in case of false positive. required |
| `sensitivity` | integer (int32) | The sensitivity value associated with the WAF rule ID. This corresponds to the ModSecurity paranoia level, ranging from 1 to 4. 0 is reserved for opt-in only rules. |

### `WaitForReplicationCatchUpRequest`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `maxWaitDuration` | string (google-duration) | — |

### `WeightedBackendService`

- In contrast to a single BackendService in HttpRouteAction to which all matching traffic is directed to,WeightedBackendService allows traffic to be split across multiple backend services. The volume of traffic for each backend service is proportional to the weight specified in each WeightedBackendService
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendService` | string | The full or partial URL to the default BackendService resource. Before forwarding the request to backendService, the load balancer applies any relevant headerActions specified as part of thisbackendServiceWeight. |
| `headerAction` | HttpHeaderAction | Specifies changes to request and response headers that need to take effect for the selected backendService. headerAction specified here take effect beforeheaderAction in the enclosing HttpRouteRule,PathMatcher and UrlMap. headerAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |
| `weight` | integer (uint32) | Specifies the fraction of traffic sent to a backend service, computed asweight / (sum of all weightedBackendService weights in routeAction). The selection of a backend service is determined only for new traffic. Once a user's request has been directed to a backend service, subsequent requests are sent to the same backend service as determined by the backend service's session affinity policy. Don't configure session affinity if you're using weighted traffic splitting. If you do, the weighted traffic splitting configuration takes precedence. The value must be from 0 to 1000. |

### `Wire`

- A pseudowire that connects two Interconnect connections.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminEnabled` | boolean | Output only. \[Output Only\] Indicates whether the wire is enabled. When false, the wire is disabled. When true and when the wire group of the wire is also enabled, the wire is enabled. Defaults to true. |
| `endpoints` | array<WireEndpoint> | Output only. Wire endpoints are specific Interconnect connections. |
| `label` | string | Output only. \[Output Only\] A label that identifies the wire. The format of this label combines the existing labels of the wire group endpoints and Interconnect connections used by this wire in alphabetical order as follows: `ENDPOINT_A+CONNECTION_A1,ENDPOINT_B+CONNECTION_B1`, where: - ENDPOINT_A and ENDPOINT_B: are the labels that you entered as map keys when you specified the wire group endpoint objects. - CONNECTION_A1 and CONNECTION_B1: are the labels that you entered as map keys when you specified the wire group Interconnect objects. |
| `wireProperties` | WireProperties | Output only. \[Output Only\] Properties of the wire. |

### `WireEndpoint`

- Wire endpoints are specific Interconnect connections.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interconnect` | string | — |
| `vlanTag` | integer (int32) | — |

### `WireGroup`

- A resource that represents a group of redundant wires.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminEnabled` | boolean | Indicates whether the wires in the wire group are enabled. When false, the wires in the wire group are disabled. When true and when there is simultaneously no wire-specific override of `adminEnabled` to false, a given wire is enabled. Defaults to true. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of the wire group. |
| `endpoints` | object | A map that contains the logical endpoints of the wire group. Specify key-value pairs for the map as follows: - Key: an RFC1035 user-specified label. - Value: an Endpoint object. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#wireGroups for wire groups. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `reconciling` | boolean | Output only. \[Output Only\] Indicates whether there are wire changes yet to be processed. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `topology` | WireGroupTopology | Output only. Topology details for the wire group configuration. |
| `wireProperties` | WireProperties | Properties for all wires in the wire group. |
| `wires` | array<Wire> | Output only. The single/redundant wire(s) managed by the wire group. |

### `WireGroup` (alpha)

- A resource that represents a group of redundant wires.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `adminEnabled` | boolean | Indicates whether the wires in the wire group are enabled. When false, the wires in the wire group are disabled. When true and when there is simultaneously no wire-specific override of `adminEnabled` to false, a given wire is enabled. Defaults to true. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of the wire group. |
| `endpoints` | object | A map that contains the logical endpoints of the wire group. Specify key-value pairs for the map as follows: - Key: an RFC1035 user-specified label. - Value: an Endpoint object. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#wireGroups for wire groups. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `reconciling` | boolean | Output only. \[Output Only\] Indicates whether there are wire changes yet to be processed. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | — |
| `serviceLevel` | WireGroupServiceLevel | Output only. Service level details determined for the wire group configuration. |
| `topology` | WireGroupTopology | Output only. Topology details for the wire group configuration. |
| `wireGroupProperties` | WireGroupProperties | Properties of the wire group. |
| `wireInputs` | object | A map that contains optional settings for individual wires. Specify key-value pairs for the map as follows: - Key: the label of an existing wire. To view a wire label and its format, see the wires\[\].label field. - Value: a WireInputs object. |
| `wireProperties` | WireProperties | Properties for all wires in the wire group. |
| `wires` | array<Wire> | Output only. The single/redundant wire(s) managed by the wire group. |

### `WireGroup` (beta)

- A resource that represents a group of redundant wires.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `adminEnabled` | boolean | Indicates whether the wires in the wire group are enabled. When false, the wires in the wire group are disabled. When true and when there is simultaneously no wire-specific override of `adminEnabled` to false, a given wire is enabled. Defaults to true. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of the wire group. |
| `endpoints` | object | A map that contains the logical endpoints of the wire group. Specify key-value pairs for the map as follows: - Key: an RFC1035 user-specified label. - Value: an Endpoint object. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#wireGroups for wire groups. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `reconciling` | boolean | Output only. \[Output Only\] Indicates whether there are wire changes yet to be processed. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `topology` | WireGroupTopology | Output only. Topology details for the wire group configuration. |
| `wireGroupProperties` | WireGroupProperties | Properties of the wire group. |
| `wireProperties` | WireProperties | Properties for all wires in the wire group. |
| `wires` | array<Wire> | Output only. The single/redundant wire(s) managed by the wire group. |

### `WireGroupEndpoint`

- A logical endpoint for the wire group. An endpoint represents a metro that contains redundant Interconnect connections. A wire group is created between two endpoints.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interconnects` | object | A map that contains the redundant Interconnect connections. Specify key-value pairs for the map as follows: - Key: an RFC1035 user-specified label. - Value: an Interconnect object. |

### `WireGroupEndpointInterconnect`

- The redundant Interconnect connections for this endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interconnect` | string | Required. An Interconnect connection. You can specify the connection as a partial or full URL. If the connection is in a different project from the cross-site network, use a format that specifies the project. See the following examples of partial and full URLs: global/interconnects/NAME projects/PROJECT_ID/global/interconnects/NAME - https://compute.googleapis.com/compute/projects/PROJECT_ID/global/interconnects/NAME |
| `vlanTags` | array<integer> | Required. To configure the wire group for VLAN mode, enter a VLAN tag, which is a number from `2` to `4093`. You can autoallocate a tag by entering `0`. To configure the wire group for port mode, enter `-1`. Review the following guidelines: - A VLAN tag must be unique for an Interconnect connection across all attachments and wire groups. - Both endpoints of a wire must use the same VLAN tag value. - Single wire and redundant type wire groups must have only one VLAN tag. - Port mode pseudowires must have a single VLAN tag with a value of `-1` for both endpoints. - Box and cross type wire groups must have two VLAN tags. The first is for the same-zone pseudowire, and the second is for the cross-zone pseudowire. |

### `WireGroupList`

- Response for the list request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<WireGroup> | A list of wire group resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#wireGroups for wire groups. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `WireGroupProperties`

- The properties of a wire group. These properties determine how a group of redundant wires are created and managed.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `type` | string enum | The type of the wire group, one of the following: - WIRE: a single pseudowire over two Interconnect connections with no redundancy. - REDUNDANT: two pseudowires over four Interconnect connections, with two connections in one metro and two connections in another metro. Each redundant pair of Interconnect connections spans both edge availability domains of the metro. Each pseudowire connects Interconnect connections in matching edge availability domains of the two metros. - BOX_AND_CROSS: four pseudowires over four Interconnect connections, with two connections in one metro and two connections in another metro. Each redundant pair of Interconnect connections spans both edge availability domains of the metro. Two pseudowires connect Interconnect connections in matching edge availability domains of the two metros. Two additional pseudowires connect the non-matching edge availability domains of the two metros. Values: `BOX_AND_CROSS`, `REDUNDANT`, `WIRE`. |

### `WireGroupServiceLevel`

- Service level details determined for the wire group configuration.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `availabilityClass` | string enum | Output only. \[Output Only\] The availability SLA that the wire group qualifies for. One of the following: `NO_AVAILABILITY_SLA`, `AVAILABILITY_99`, `AVAILABILITY_999`, or `AVAILABILITY_9995`. Values: `AVAILABILITY_99`, `AVAILABILITY_999`, `AVAILABILITY_9995`, `NO_AVAILABILITY_SLA`. |

### `WireGroupTopology`

- Topology details for the wire group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpoints` | array<WireGroupTopologyEndpoint> | Output only. Topology details for all endpoints in the wire group. |

### `WireGroupTopologyEndpoint`

- Topology details for a single wire group endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `city` | string | Output only. The InterconnectLocation.city (metropolitan area designator) that all interconnects are located in. |
| `label` | string | Output only. Endpoint label from the wire group. |

### `WireGroupWireInputs`

- Optional settings for individual wires. Allows wire-level control that can be useful for migration purposes. If you use this field, you opt-out of the SLA for the wire group.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `adminEnabled` | boolean | Indicates whether the wire is enabled. When false, the wire is disabled. When true and when the wire group of the wire is also enabled, the wire is enabled. Defaults to true. |
| `wirePropertyOverrides` | WireProperties | The overridden properties for the wire. Any properties that are not overridden are omitted from the object. Review the following guidelines: - If you apply wire overrides to a wire and its wire group bandwidth configuration is set to `SHARED_WITH_WIRE_GROUP`, the `meteredBandwidth` and `unmeteredBandwidth` properties must not differ from the wire group. - Overrides generate a `configurationNotice`. Ensure that differences in wire configuration are temporary. An example use case for wire overrides is slowly rolling out configuration changes to individual wires in a wire group. |

### `WireProperties`

- The properties of a wire.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bandwidthAllocation` | string enum | The configuration of the bandwidth allocation, one of the following: - ALLOCATE_PER_WIRE: configures a separate unmetered bandwidth allocation (and associated charges) for each wire in the group. - SHARED_WITH_WIRE_GROUP: this is the default behavior, which configures one unmetered bandwidth allocation for the wire group. The unmetered bandwidth is divided equally across each wire in the group, but dynamic throttling reallocates unused unmetered bandwidth from unused or underused wires to other wires in the group. Values: `ALLOCATE_PER_WIRE`, `SHARED_WITH_WIRE_GROUP`. |
| `bandwidthUnmetered` | string (int64) | The unmetered bandwidth in Gigabits per second, using decimal units. `10` is 10 Gbps, `100` is 100 Gbps. The bandwidth must be greater than 0. |
| `faultResponse` | string enum | Response when a fault is detected in a pseudowire: - NONE: default. - DISABLE_PORT: set the port line protocol down when inline probes detect a fault. This setting is only permitted on port mode pseudowires. Values: `DISABLE_PORT`, `NONE`. |
| `flowManagement` | string enum | The flow management configuration for the wire. Values: `DYNAMIC_PATH`, `FIXED_PATH`. |

### `WireProperties` (alpha)

- The properties of a wire.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `bandwidthAllocation` | string enum | The configuration of the bandwidth allocation, one of the following: - ALLOCATE_PER_WIRE: configures a separate unmetered bandwidth allocation (and associated charges) for each wire in the group. - SHARED_WITH_WIRE_GROUP: this is the default behavior, which configures one unmetered bandwidth allocation for the wire group. The unmetered bandwidth is divided equally across each wire in the group, but dynamic throttling reallocates unused unmetered bandwidth from unused or underused wires to other wires in the group. Values: `ALLOCATE_PER_WIRE`, `SHARED_WITH_WIRE_GROUP`. |
| `bandwidthMetered` | string (int64) | The metered bandwidth in Gigabits per second, using decimal units. `10` is 10 Gbps, `100` is 100 Gbps. The default value is `0`. You can specify unlimited bandwidth by entering `-1`. However, actual data transfer is limited by the port speed. |
| `bandwidthUnmetered` | string (int64) | The unmetered bandwidth in Gigabits per second, using decimal units. `10` is 10 Gbps, `100` is 100 Gbps. The bandwidth must be greater than 0. |
| `faultResponse` | string enum | Response when a fault is detected in a pseudowire: - NONE: default. - DISABLE_PORT: set the port line protocol down when inline probes detect a fault. This setting is only permitted on port mode pseudowires. Values: `DISABLE_PORT`, `NONE`. |
| `flowManagement` | string enum | The flow management configuration for the wire. Values: `DYNAMIC_PATH`, `FIXED_PATH`. |
| `networkServiceClass` | string enum | The network service class. Values: `BRONZE`, `GOLD`. |

### `WireProperties` (beta)

- The properties of a wire.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `bandwidthAllocation` | string enum | The configuration of the bandwidth allocation, one of the following: - ALLOCATE_PER_WIRE: configures a separate unmetered bandwidth allocation (and associated charges) for each wire in the group. - SHARED_WITH_WIRE_GROUP: this is the default behavior, which configures one unmetered bandwidth allocation for the wire group. The unmetered bandwidth is divided equally across each wire in the group, but dynamic throttling reallocates unused unmetered bandwidth from unused or underused wires to other wires in the group. Values: `ALLOCATE_PER_WIRE`, `SHARED_WITH_WIRE_GROUP`. |
| `bandwidthUnmetered` | string (int64) | The unmetered bandwidth in Gigabits per second, using decimal units. `10` is 10 Gbps, `100` is 100 Gbps. The bandwidth must be greater than 0. |
| `faultResponse` | string enum | Response when a fault is detected in a pseudowire: - NONE: default. - DISABLE_PORT: set the port line protocol down when inline probes detect a fault. This setting is only permitted on port mode pseudowires. Values: `DISABLE_PORT`, `NONE`. |

### `WorkloadIdentityConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `identity` | string | — |
| `identityCertificateEnabled` | boolean | — |
| `identityType` | string enum | — Values: `AGENT_IDENTITY`, `IDENTITY_TYPE_UNSPECIFIED`, `SERVICE_ACCOUNT`. |

### `XpnHostList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Project> | \[Output Only\] A list of shared VPC host project URLs. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#xpnHostList for lists of shared VPC hosts. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `XpnResourceId`

- Service resource (a.k.a service project) ID.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | The ID of the service resource. In the case of projects, this field supports project id (e.g., my-project-123) and project number (e.g. 12345678). |
| `type` | string enum | The type of the service resource. Values: `PROJECT`, `XPN_RESOURCE_TYPE_UNSPECIFIED`. |

### `Zone`

- Represents a Zone resource. A zone is a deployment area. These deployment areas are subsets of a region. For example the zone us-east1-b is located in theus-east1 region. For more information, readRegions and Zones.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableCpuPlatforms` | array<string> | \[Output Only\] Available cpu/platform selections for the zone. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this zone. |
| `description` | string | \[Output Only\] Textual description of the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#zone for zones. |
| `name` | string | \[Output Only\] Name of the resource. |
| `region` | string | \[Output Only\] Full URL reference to the region which hosts the zone. |
| `resourceStatus` | ZoneResourceStatus | — |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `status` | string enum | \[Output Only\] Status of the zone, either UP orDOWN. Values: `DOWN`, `UP`. |
| `supportsPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |

### `ZoneList`

- Contains a list of zone resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Zone> | A list of Zone resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ZoneResourceStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `upcomingMaintenances` | array<PeriodicPartialMaintenanceSchedule> | Output only. \[Output Only\] The upcoming maintenance schedule. |

### `ZoneSetLabelsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labelFingerprint` | string (byte) | The fingerprint of the previous set of labels for this resource, used to detect conflicts. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. Make a get() request to the resource to get the latest fingerprint. |
| `labels` | object | The labels to set for this resource. |

### `ZoneSetNestedPolicyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Flatten Policy to create a backwacd compatible wire-format. Deprecated. Use 'policy' to specify bindings. |
| `etag` | string (byte) | Flatten Policy to create a backward compatible wire-format. Deprecated. Use 'policy' to specify the etag. |
| `policy` | Policy | REQUIRED: The complete policy to be applied to the 'resource'. The size of the policy is limited to a few 10s of KB. An empty policy is in general a valid policy but certain services (like Projects) might reject them. |

### `ZoneSetPolicyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Flatten Policy to create a backwacd compatible wire-format. Deprecated. Use 'policy' to specify bindings. |
| `etag` | string (byte) | Flatten Policy to create a backward compatible wire-format. Deprecated. Use 'policy' to specify the etag. |
| `policy` | Policy | REQUIRED: The complete policy to be applied to the 'resource'. The size of the policy is limited to a few 10s of KB. An empty policy is in general a valid policy but certain services (like Projects) might reject them. |

### Shape of `UsableSubnetworkSecondaryRange`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "ipCidrRange": "string",
  "rangeName": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
