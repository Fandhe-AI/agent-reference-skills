---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 8/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `Network`

- Represents a VPC Network resource. Networks connect resources to each other and to the internet. For more information, readVirtual Private Cloud (VPC) Network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `IPv4Range` | string | Deprecated in favor of subnet mode networks. The range of internal addresses that are legal on this network. This range is aCIDR specification, for example:192.168.0.0/16. Provided by the client when the network is created. |
| `additionalTags` | array<string> | Output only. \[Output Only\] Additional tags for this resource. |
| `autoCreateSubnetworks` | boolean | Must be set to create a VPC network. If not set, a legacy network is created. When set to true, the VPC network is created in auto mode. When set to false, the VPC network is created in custom mode. An auto mode VPC network starts with one subnet per region. Each subnet has a predetermined range as described inAuto mode VPC network IP ranges. For custom mode VPC networks, you can add subnets using the subnetworksinsert method. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this field when you create the resource. |
| `enableUlaInternalIpv6` | boolean | Enable ULA internal ipv6 on this network. Enabling this feature will assign a /48 from google defined ULA prefix fd20::/20. . |
| `firewallPolicy` | string | Output only. \[Output Only\] URL of the firewall policy the network is associated with. |
| `gatewayIPv4` | string | \[Output Only\] The gateway address for default routing out of the network, selected by Google Cloud. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `internalIpv6Range` | string | When enabling ula internal ipv6, caller optionally can specify the /48 range they want from the google defined ULA prefix fd20::/20. The input must be a valid /48 ULA IPv6 address and must be within the fd20::/20. Operation will fail if the speficied /48 is already in used by another resource. If the field is not speficied, then a /48 range will be randomly allocated from fd20::/20 and returned via this field. . |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#network for networks. |
| `mtu` | integer (int32) | Maximum Transmission Unit in bytes. The minimum value for this field is 1300 and the maximum value is 8896. The suggested value is 1500, which is the default MTU used on the Internet, or 8896 if you want to use Jumbo frames. If unspecified, the value defaults to 1460. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `networkFirewallPolicyEnforcementOrder` | string enum | The network firewall policy enforcement order. Can be either AFTER_CLASSIC_FIREWALL or BEFORE_CLASSIC_FIREWALL. Defaults to AFTER_CLASSIC_FIREWALL if the field is not specified. Values: `AFTER_CLASSIC_FIREWALL`, `BEFORE_CLASSIC_FIREWALL`. |
| `networkProfile` | string | A full or partial URL of the network profile to apply to this network. This field can be set only at resource creation time. For example, the following are valid URLs: - https://www.googleapis.com/compute/{api_version}/projects/{project_id}/global/networkProfiles/{network_profile_name} - projects/{project_id}/global/networkProfiles/{network_profile_name} |
| `params` | NetworkParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `peerings` | array<NetworkPeering> | Output only. \[Output Only\] A list of network peerings for the resource. |
| `routingConfig` | NetworkRoutingConfig | The network-level routing configuration for this network. Used by Cloud Router to determine what type of network-wide routing behavior to enforce. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `subnetworks` | array<string> | \[Output Only\] Server-defined fully-qualified URLs for all subnetworks in this VPC network. |

### `Network` (alpha)

- Represents a VPC Network resource. Networks connect resources to each other and to the internet. For more information, readVirtual Private Cloud (VPC) Network.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `IPv4Range` | string | Deprecated in favor of subnet mode networks. The range of internal addresses that are legal on this network. This range is aCIDR specification, for example:192.168.0.0/16. Provided by the client when the network is created. |
| `additionalTags` | array<string> | Output only. \[Output Only\] Additional tags for this resource. |
| `autoCreateSubnetworks` | boolean | Must be set to create a VPC network. If not set, a legacy network is created. When set to true, the VPC network is created in auto mode. When set to false, the VPC network is created in custom mode. An auto mode VPC network starts with one subnet per region. Each subnet has a predetermined range as described inAuto mode VPC network IP ranges. For custom mode VPC networks, you can add subnets using the subnetworksinsert method. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this field when you create the resource. |
| `enableUlaInternalIpv6` | boolean | Enable ULA internal ipv6 on this network. Enabling this feature will assign a /48 from google defined ULA prefix fd20::/20. . |
| `firewallPolicy` | string | Output only. \[Output Only\] URL of the firewall policy the network is associated with. |
| `gatewayIPv4` | string | \[Output Only\] The gateway address for default routing out of the network, selected by Google Cloud. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `internalIpv6Range` | string | When enabling ula internal ipv6, caller optionally can specify the /48 range they want from the google defined ULA prefix fd20::/20. The input must be a valid /48 ULA IPv6 address and must be within the fd20::/20. Operation will fail if the speficied /48 is already in used by another resource. If the field is not speficied, then a /48 range will be randomly allocated from fd20::/20 and returned via this field. . |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#network for networks. |
| `mtu` | integer (int32) | Maximum Transmission Unit in bytes. The minimum value for this field is 1300 and the maximum value is 8896. The suggested value is 1500, which is the default MTU used on the Internet, or 8896 if you want to use Jumbo frames. If unspecified, the value defaults to 1460. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `networkFirewallPolicyEnforcementOrder` | string enum | The network firewall policy enforcement order. Can be either AFTER_CLASSIC_FIREWALL or BEFORE_CLASSIC_FIREWALL. Defaults to AFTER_CLASSIC_FIREWALL if the field is not specified. Values: `AFTER_CLASSIC_FIREWALL`, `BEFORE_CLASSIC_FIREWALL`. |
| `networkProfile` | string | A full or partial URL of the network profile to apply to this network. This field can be set only at resource creation time. For example, the following are valid URLs: - https://www.googleapis.com/compute/{api_version}/projects/{project_id}/global/networkProfiles/{network_profile_name} - projects/{project_id}/global/networkProfiles/{network_profile_name} |
| `params` | NetworkParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `peerings` | array<NetworkPeering> | Output only. \[Output Only\] A list of network peerings for the resource. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional network resides. This field is not applicable to global network. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `routingConfig` | NetworkRoutingConfig | The network-level routing configuration for this network. Used by Cloud Router to determine what type of network-wide routing behavior to enforce. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `subnetworks` | array<string> | \[Output Only\] Server-defined fully-qualified URLs for all subnetworks in this VPC network. |

### `Network` (beta)

- Represents a VPC Network resource. Networks connect resources to each other and to the internet. For more information, readVirtual Private Cloud (VPC) Network.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `IPv4Range` | string | Deprecated in favor of subnet mode networks. The range of internal addresses that are legal on this network. This range is aCIDR specification, for example:192.168.0.0/16. Provided by the client when the network is created. |
| `autoCreateSubnetworks` | boolean | Must be set to create a VPC network. If not set, a legacy network is created. When set to true, the VPC network is created in auto mode. When set to false, the VPC network is created in custom mode. An auto mode VPC network starts with one subnet per region. Each subnet has a predetermined range as described inAuto mode VPC network IP ranges. For custom mode VPC networks, you can add subnets using the subnetworksinsert method. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this field when you create the resource. |
| `enableUlaInternalIpv6` | boolean | Enable ULA internal ipv6 on this network. Enabling this feature will assign a /48 from google defined ULA prefix fd20::/20. . |
| `firewallPolicy` | string | Output only. \[Output Only\] URL of the firewall policy the network is associated with. |
| `gatewayIPv4` | string | \[Output Only\] The gateway address for default routing out of the network, selected by Google Cloud. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `internalIpv6Range` | string | When enabling ula internal ipv6, caller optionally can specify the /48 range they want from the google defined ULA prefix fd20::/20. The input must be a valid /48 ULA IPv6 address and must be within the fd20::/20. Operation will fail if the speficied /48 is already in used by another resource. If the field is not speficied, then a /48 range will be randomly allocated from fd20::/20 and returned via this field. . |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#network for networks. |
| `mtu` | integer (int32) | Maximum Transmission Unit in bytes. The minimum value for this field is 1300 and the maximum value is 8896. The suggested value is 1500, which is the default MTU used on the Internet, or 8896 if you want to use Jumbo frames. If unspecified, the value defaults to 1460. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `networkFirewallPolicyEnforcementOrder` | string enum | The network firewall policy enforcement order. Can be either AFTER_CLASSIC_FIREWALL or BEFORE_CLASSIC_FIREWALL. Defaults to AFTER_CLASSIC_FIREWALL if the field is not specified. Values: `AFTER_CLASSIC_FIREWALL`, `BEFORE_CLASSIC_FIREWALL`. |
| `networkProfile` | string | A full or partial URL of the network profile to apply to this network. This field can be set only at resource creation time. For example, the following are valid URLs: - https://www.googleapis.com/compute/{api_version}/projects/{project_id}/global/networkProfiles/{network_profile_name} - projects/{project_id}/global/networkProfiles/{network_profile_name} |
| `params` | NetworkParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `peerings` | array<NetworkPeering> | Output only. \[Output Only\] A list of network peerings for the resource. |
| `routingConfig` | NetworkRoutingConfig | The network-level routing configuration for this network. Used by Cloud Router to determine what type of network-wide routing behavior to enforce. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `subnetworks` | array<string> | \[Output Only\] Server-defined fully-qualified URLs for all subnetworks in this VPC network. |

### `Network` (preview)

- Represents a VPC Network resource. Networks connect resources to each other and to the internet. For more information, readVirtual Private Cloud (VPC) Network.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `IPv4Range` | string | Deprecated in favor of subnet mode networks. The range of internal addresses that are legal on this network. This range is aCIDR specification, for example:192.168.0.0/16. Provided by the client when the network is created. |
| `autoCreateSubnetworks` | boolean | Must be set to create a VPC network. If not set, a legacy network is created. When set to true, the VPC network is created in auto mode. When set to false, the VPC network is created in custom mode. An auto mode VPC network starts with one subnet per region. Each subnet has a predetermined range as described inAuto mode VPC network IP ranges. For custom mode VPC networks, you can add subnets using the subnetworksinsert method. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this field when you create the resource. |
| `enableUlaInternalIpv6` | boolean | Enable ULA internal ipv6 on this network. Enabling this feature will assign a /48 from google defined ULA prefix fd20::/20. . |
| `firewallPolicy` | string | Output only. \[Output Only\] URL of the firewall policy the network is associated with. |
| `gatewayIPv4` | string | \[Output Only\] The gateway address for default routing out of the network, selected by Google Cloud. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `internalIpv6Range` | string | When enabling ula internal ipv6, caller optionally can specify the /48 range they want from the google defined ULA prefix fd20::/20. The input must be a valid /48 ULA IPv6 address and must be within the fd20::/20. Operation will fail if the speficied /48 is already in used by another resource. If the field is not speficied, then a /48 range will be randomly allocated from fd20::/20 and returned via this field. . |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#network for networks. |
| `mtu` | integer (int32) | Maximum Transmission Unit in bytes. The minimum value for this field is 1300 and the maximum value is 8896. The suggested value is 1500, which is the default MTU used on the Internet, or 8896 if you want to use Jumbo frames. If unspecified, the value defaults to 1460. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `networkFirewallPolicyEnforcementOrder` | string enum | The network firewall policy enforcement order. Can be either AFTER_CLASSIC_FIREWALL or BEFORE_CLASSIC_FIREWALL. Defaults to AFTER_CLASSIC_FIREWALL if the field is not specified. Values: `AFTER_CLASSIC_FIREWALL`, `BEFORE_CLASSIC_FIREWALL`. |
| `networkLocationBindings` | array<string> | Output only. \[Output Only\] List of server-defined fully-qualified URLs of regional network location bindings in this VPC network. |
| `networkProfile` | string | A full or partial URL of the network profile to apply to this network. This field can be set only at resource creation time. For example, the following are valid URLs: - https://www.googleapis.com/compute/{api_version}/projects/{project_id}/global/networkProfiles/{network_profile_name} - projects/{project_id}/global/networkProfiles/{network_profile_name} |
| `params` | NetworkParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `peerings` | array<NetworkPeering> | Output only. \[Output Only\] A list of network peerings for the resource. |
| `routingConfig` | NetworkRoutingConfig | The network-level routing configuration for this network. Used by Cloud Router to determine what type of network-wide routing behavior to enforce. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `subnetworks` | array<string> | \[Output Only\] Server-defined fully-qualified URLs for all subnetworks in this VPC network. |

### `NetworkAttachment`

- NetworkAttachments A network attachment resource ...
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionEndpoints` | array<NetworkAttachmentConnectedEndpoint> | Output only. \[Output Only\] An array of connections for all the producers connected to this network attachment. |
| `connectionPreference` | string enum | — Values: `ACCEPT_AUTOMATIC`, `ACCEPT_MANUAL`, `INVALID`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. An up-to-date fingerprint must be provided in order to patch. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | Output only. \[Output Only\] The URL of the network which the Network Attachment belongs to. Practically it is inferred by fetching the network of the first subnetwork associated. Because it is required that all the subnetworks must be from the same network, it is assured that the Network Attachment belongs to the same network as all the subnetworks. |
| `producerAcceptLists` | array<string> | Projects or service class ids that are allowed to connect to this network attachment. The project can be specified using its id or number. Service class id can be specified as "serviceclasses/{service_class_id}". |
| `producerRejectLists` | array<string> | Projects or service class ids that are not allowed to connect to this network attachment. The project can be specified using its id or number. Service class id can be specified as "serviceclasses/{service_class_id}". |
| `region` | string | Output only. \[Output Only\] URL of the region where the network attachment resides. This field applies only to the region resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `subnetworks` | array<string> | An array of URLs where each entry is the URL of a subnet provided by the service consumer to use for endpoints in the producers that connect to this network attachment. |

### `NetworkAttachmentAggregatedList`

- Contains a list of NetworkAttachmentsScopedList.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of NetworkAttachmentsScopedList resources. |
| `kind` | string | — |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NetworkAttachmentConnectedEndpoint`

- \[Output Only\] A connection connected to this network attachment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | The IPv4 address assigned to the producer instance network interface. This value will be a range in case of Serverless. |
| `ipv6Address` | string | The IPv6 address assigned to the producer instance network interface. This is only assigned when the stack types of both the instance network interface and the consumer subnet are IPv4_IPv6. |
| `projectIdOrNum` | string | The project id or number of the interface to which the IP was assigned. |
| `secondaryIpCidrRanges` | array<string> | Alias IP ranges from the same subnetwork. |
| `serviceClassId` | string | The service class id of the producer service to which the IP was assigned. |
| `status` | string enum | The status of a connected endpoint to this network attachment. Values: `ACCEPTED`, `CLOSED`, `NEEDS_ATTENTION`, `PENDING`, `REJECTED`, `RESERVED`, `STATUS_UNSPECIFIED`. |
| `subnetwork` | string | The subnetwork used to assign the IP to the producer instance network interface. |
| `subnetworkCidrRange` | string | Output only. \[Output Only\] The CIDR range of the subnet from which the IPv4 internal IP was allocated from. |

### `NetworkAttachmentList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<NetworkAttachment> | A list of NetworkAttachment resources. |
| `kind` | string | — |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NetworkAttachmentsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkAttachments` | array<NetworkAttachment> | A list of NetworkAttachments contained in this scope. |
| `warning` | object | Informational warning which replaces the list of network attachments when the list is empty. |

### `NetworkEdgeSecurityService`

- Represents a Google Cloud Armor network edge security service resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a NetworkEdgeSecurityService. An up-to-date fingerprint must be provided in order to update the NetworkEdgeSecurityService, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a NetworkEdgeSecurityService. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#networkEdgeSecurityService for NetworkEdgeSecurityServices |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `region` | string | Output only. \[Output Only\] URL of the region where the resource resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `securityPolicy` | string | The resource URL for the network edge security service associated with this network edge security service. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |

### `NetworkEdgeSecurityService` (preview)

- Represents a Google Cloud Armor network edge security service resource.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a NetworkEdgeSecurityService. An up-to-date fingerprint must be provided in order to update the NetworkEdgeSecurityService, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a NetworkEdgeSecurityService. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#networkEdgeSecurityService for NetworkEdgeSecurityServices |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | NetworkEdgeSecurityServiceParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | Output only. \[Output Only\] URL of the region where the resource resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `securityPolicy` | string | The resource URL for the network edge security service associated with this network edge security service. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |

### `NetworkEdgeSecurityServiceAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of NetworkEdgeSecurityServicesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#networkEdgeSecurityServiceAggregatedList for lists of Network Edge Security Services. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NetworkEdgeSecurityServiceParams`

- Additional network edge security service parameters.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. \* Inconsistent format is not supported. For instance: {"tagKeys/333" : "tagValues/444", "123/env" : "prod"} is invalid. |

### `NetworkEdgeSecurityServicesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkEdgeSecurityServices` | array<NetworkEdgeSecurityService> | A list of NetworkEdgeSecurityServices contained in this scope. |
| `warning` | object | Informational warning which replaces the list of security policies when the list is empty. |

### `NetworkEndpoint`

- The network endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional metadata defined as annotations on the network endpoint. |
| `clientDestinationPort` | integer (int32) | Represents the port number to which PSC consumer sends packets. Optional. Only valid for network endpoint groups created withGCE_VM_IP_PORTMAP endpoint type. |
| `fqdn` | string | Optional fully qualified domain name of network endpoint. This can only be specified when NetworkEndpointGroup.network_endpoint_type isNON_GCP_FQDN_PORT. |
| `instance` | string | The name or a URL of VM instance of this network endpoint. Optional, the field presence depends on the network endpoint type. The field is required for network endpoints of type GCE_VM_IP andGCE_VM_IP_PORT. The instance must be in the same zone of network endpoint group (for zonal NEGs) or in the zone within the region of the NEG (for regional NEGs). If the ipAddress is specified, it must belongs to the VM instance. The name must be 1-63 characters long, and comply withRFC1035 or be a valid URL pointing to an existing instance. |
| `ipAddress` | string | Optional IPv4 address of network endpoint. The IP address must belong to a VM in Compute Engine (either the primary IP or as part of an aliased IP range). If the IP address is not specified, then the primary IP address for the VM instance in the network that the network endpoint group belongs to will be used. This field is redundant and need not be set for network endpoints of typeGCE_VM_IP. If set, it must be set to the primary internal IP address of the attached VM instance that matches the subnetwork of the NEG. The primary internal IP address from any NIC of a multi-NIC VM instance can be added to a NEG as long as it matches the NEG subnetwork. |
| `ipv6Address` | string | Optional IPv6 address of network endpoint. |
| `port` | integer (int32) | Optional port number of network endpoint. If not specified, the defaultPort for the network endpoint group will be used. This field can not be set for network endpoints of typeGCE_VM_IP. |

### `NetworkEndpointGroup`

- Represents a collection of network endpoints. A network endpoint group (NEG) defines how a set of endpoints should be reached, whether they are reachable, and where they are located. For more information about using NEGs for different use cases, seeNetwork endpoint groups overview. Note: Use the following APIs to manage network endpoint groups: - To manage NEGs with zonal scope (such as zonal NEGs, hybrid connectivity NEGs): zonal API - To manage NEGs with regional scope (such as regional internet NEGs, serverless NEGs, Private Service Connect NEGs): regional API - To manage NEGs with global scope (such as global internet NEGs):global API
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Metadata defined as annotations on the network endpoint group. |
| `appEngine` | NetworkEndpointGroupAppEngine | Optional. Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine or cloudFunction may be set. |
| `cloudFunction` | NetworkEndpointGroupCloudFunction | Optional. Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine or cloudFunction may be set. |
| `cloudRun` | NetworkEndpointGroupCloudRun | Optional. Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine or cloudFunction may be set. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `defaultPort` | integer (int32) | The default port used if the port number is not specified in the network endpoint. Optional. If the network endpoint type is either GCE_VM_IP,SERVERLESS or PRIVATE_SERVICE_CONNECT, this field must not be specified. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#networkEndpointGroup for network endpoint group. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | The URL of the network to which all network endpoints in the NEG belong. For networkEndpointType GCE_VM_IP_PORT,GCE_VM_IP_PORTMAP or NON_GCP_PRIVATE_IP_PORT, if this field is not specified, a default network will be used. This field cannot be set for NEGs with networkEndpointType set toSERVERLESS or PRIVATE_SERVICE_CONNECT and for global NEGs. For all other network endpoint types, this field is required. |
| `networkEndpointType` | string enum | Type of network endpoints in this network endpoint group. Can be one ofGCE_VM_IP, GCE_VM_IP_PORT,NON_GCP_PRIVATE_IP_PORT, INTERNET_FQDN_PORT,INTERNET_IP_PORT, SERVERLESS,PRIVATE_SERVICE_CONNECT, GCE_VM_IP_PORTMAP. Values: `GCE_VM_IP`, `GCE_VM_IP_DEDICATED_BACKEND`, `GCE_VM_IP_PORT`, `GCE_VM_IP_PORTMAP`, `INTERNET_FQDN_PORT`, `INTERNET_IP_PORT`, `NON_GCP_PRIVATE_IP_PORT`, `PRIVATE_SERVICE_CONNECT`, `SERVERLESS`. |
| `pscData` | NetworkEndpointGroupPscData | Optional. Only valid when networkEndpointType isPRIVATE_SERVICE_CONNECT. |
| `pscTargetService` | string | The target service url used to set up private service connection to a Google API or a PSC Producer Service Attachment. An example value is: asia-northeast3-cloudkms.googleapis.com. Optional. Only valid when networkEndpointType isPRIVATE_SERVICE_CONNECT. |
| `region` | string | Output only. \[Output Only\] The URL of theregion where the network endpoint group is located. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `size` | integer (int32) | Output only. \[Output only\] Number of network endpoints in the network endpoint group. |
| `subnetwork` | string | Optional URL of the subnetwork to which all network endpoints in the NEG belong. |
| `zone` | string | Output only. \[Output Only\] The URL of thezone where the network endpoint group is located. |

### `NetworkEndpointGroup` (alpha)

- Represents a collection of network endpoints. A network endpoint group (NEG) defines how a set of endpoints should be reached, whether they are reachable, and where they are located. For more information about using NEGs for different use cases, seeNetwork endpoint groups overview. Note: Use the following APIs to manage network endpoint groups: - To manage NEGs with zonal scope (such as zonal NEGs, hybrid connectivity NEGs): zonal API - To manage NEGs with regional scope (such as regional internet NEGs, serverless NEGs, Private Service Connect NEGs): regional API - To manage NEGs with global scope (such as global internet NEGs):global API
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Metadata defined as annotations on the network endpoint group. |
| `appEngine` | NetworkEndpointGroupAppEngine | Optional. Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine or cloudFunction may be set. |
| `cloudFunction` | NetworkEndpointGroupCloudFunction | Optional. Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine or cloudFunction may be set. |
| `cloudRun` | NetworkEndpointGroupCloudRun | Optional. Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine or cloudFunction may be set. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `defaultPort` | integer (int32) | The default port used if the port number is not specified in the network endpoint. Optional. If the network endpoint type is either GCE_VM_IP,SERVERLESS or PRIVATE_SERVICE_CONNECT, this field must not be specified. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#networkEndpointGroup for network endpoint group. |
| `loadBalancer` | NetworkEndpointGroupLbNetworkEndpointGroup | This field is only valid when the network endpoint group is used for load balancing. \[Deprecated\] This field is deprecated. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | The URL of the network to which all network endpoints in the NEG belong. For networkEndpointType GCE_VM_IP_PORT,GCE_VM_IP_PORTMAP or NON_GCP_PRIVATE_IP_PORT, if this field is not specified, a default network will be used. This field cannot be set for NEGs with networkEndpointType set toSERVERLESS or PRIVATE_SERVICE_CONNECT and for global NEGs. For all other network endpoint types, this field is required. |
| `networkEndpointType` | string enum | Type of network endpoints in this network endpoint group. Can be one ofGCE_VM_IP, GCE_VM_IP_PORT,NON_GCP_PRIVATE_IP_PORT, INTERNET_FQDN_PORT,INTERNET_IP_PORT, SERVERLESS,PRIVATE_SERVICE_CONNECT, GCE_VM_IP_PORTMAP. Values: `GCE_VM_IP`, `GCE_VM_IP_DEDICATED_BACKEND`, `GCE_VM_IP_PORT`, `GCE_VM_IP_PORTMAP`, `INTERNET_FQDN_PORT`, `INTERNET_IP_PORT`, `NON_GCP_PRIVATE_IP_PORT`, `PRIVATE_SERVICE_CONNECT`, `SERVERLESS`. |
| `pscData` | NetworkEndpointGroupPscData | Optional. Only valid when networkEndpointType isPRIVATE_SERVICE_CONNECT. |
| `pscTargetService` | string | The target service url used to set up private service connection to a Google API or a PSC Producer Service Attachment. An example value is: asia-northeast3-cloudkms.googleapis.com. Optional. Only valid when networkEndpointType isPRIVATE_SERVICE_CONNECT. |
| `region` | string | Output only. \[Output Only\] The URL of theregion where the network endpoint group is located. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `serverlessDeployment` | NetworkEndpointGroupServerlessDeployment | Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine, cloudFunction orserverlessDeployment may be set. |
| `size` | integer (int32) | Output only. \[Output only\] Number of network endpoints in the network endpoint group. |
| `subnetwork` | string | Optional URL of the subnetwork to which all network endpoints in the NEG belong. |
| `type` | string enum | Specify the type of this network endpoint group. OnlyLOAD_BALANCING is valid for now. Values: `LOAD_BALANCING`. |
| `zone` | string | Output only. \[Output Only\] The URL of thezone where the network endpoint group is located. |

### `NetworkEndpointGroup` (beta)

- Represents a collection of network endpoints. A network endpoint group (NEG) defines how a set of endpoints should be reached, whether they are reachable, and where they are located. For more information about using NEGs for different use cases, seeNetwork endpoint groups overview. Note: Use the following APIs to manage network endpoint groups: - To manage NEGs with zonal scope (such as zonal NEGs, hybrid connectivity NEGs): zonal API - To manage NEGs with regional scope (such as regional internet NEGs, serverless NEGs, Private Service Connect NEGs): regional API - To manage NEGs with global scope (such as global internet NEGs):global API
- Version: beta

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Metadata defined as annotations on the network endpoint group. |
| `appEngine` | NetworkEndpointGroupAppEngine | Optional. Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine or cloudFunction may be set. |
| `cloudFunction` | NetworkEndpointGroupCloudFunction | Optional. Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine or cloudFunction may be set. |
| `cloudRun` | NetworkEndpointGroupCloudRun | Optional. Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine or cloudFunction may be set. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `defaultPort` | integer (int32) | The default port used if the port number is not specified in the network endpoint. Optional. If the network endpoint type is either GCE_VM_IP,SERVERLESS or PRIVATE_SERVICE_CONNECT, this field must not be specified. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#networkEndpointGroup for network endpoint group. |
| `loadBalancer` | NetworkEndpointGroupLbNetworkEndpointGroup | This field is only valid when the network endpoint group is used for load balancing. \[Deprecated\] This field is deprecated. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | The URL of the network to which all network endpoints in the NEG belong. For networkEndpointType GCE_VM_IP_PORT,GCE_VM_IP_PORTMAP or NON_GCP_PRIVATE_IP_PORT, if this field is not specified, a default network will be used. This field cannot be set for NEGs with networkEndpointType set toSERVERLESS or PRIVATE_SERVICE_CONNECT and for global NEGs. For all other network endpoint types, this field is required. |
| `networkEndpointType` | string enum | Type of network endpoints in this network endpoint group. Can be one ofGCE_VM_IP, GCE_VM_IP_PORT,NON_GCP_PRIVATE_IP_PORT, INTERNET_FQDN_PORT,INTERNET_IP_PORT, SERVERLESS,PRIVATE_SERVICE_CONNECT, GCE_VM_IP_PORTMAP. Values: `GCE_VM_IP`, `GCE_VM_IP_DEDICATED_BACKEND`, `GCE_VM_IP_PORT`, `GCE_VM_IP_PORTMAP`, `INTERNET_FQDN_PORT`, `INTERNET_IP_PORT`, `NON_GCP_PRIVATE_IP_PORT`, `PRIVATE_SERVICE_CONNECT`, `SERVERLESS`. |
| `pscData` | NetworkEndpointGroupPscData | Optional. Only valid when networkEndpointType isPRIVATE_SERVICE_CONNECT. |
| `pscTargetService` | string | The target service url used to set up private service connection to a Google API or a PSC Producer Service Attachment. An example value is: asia-northeast3-cloudkms.googleapis.com. Optional. Only valid when networkEndpointType isPRIVATE_SERVICE_CONNECT. |
| `region` | string | Output only. \[Output Only\] The URL of theregion where the network endpoint group is located. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `serverlessDeployment` | NetworkEndpointGroupServerlessDeployment | Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine, cloudFunction orserverlessDeployment may be set. |
| `size` | integer (int32) | Output only. \[Output only\] Number of network endpoints in the network endpoint group. |
| `subnetwork` | string | Optional URL of the subnetwork to which all network endpoints in the NEG belong. |
| `zone` | string | Output only. \[Output Only\] The URL of thezone where the network endpoint group is located. |

### `NetworkEndpointGroup` (preview)

- Represents a collection of network endpoints. A network endpoint group (NEG) defines how a set of endpoints should be reached, whether they are reachable, and where they are located. For more information about using NEGs for different use cases, seeNetwork endpoint groups overview. Note: Use the following APIs to manage network endpoint groups: - To manage NEGs with zonal scope (such as zonal NEGs, hybrid connectivity NEGs): zonal API - To manage NEGs with regional scope (such as regional internet NEGs, serverless NEGs, Private Service Connect NEGs): regional API - To manage NEGs with global scope (such as global internet NEGs):global API
- Version: preview

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Metadata defined as annotations on the network endpoint group. |
| `appEngine` | NetworkEndpointGroupAppEngine | Optional. Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine or cloudFunction may be set. |
| `cloudFunction` | NetworkEndpointGroupCloudFunction | Optional. Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine or cloudFunction may be set. |
| `cloudRun` | NetworkEndpointGroupCloudRun | Optional. Only valid when networkEndpointType isSERVERLESS. Only one of cloudRun,appEngine or cloudFunction may be set. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `defaultPort` | integer (int32) | The default port used if the port number is not specified in the network endpoint. Optional. If the network endpoint type is either GCE_VM_IP,SERVERLESS or PRIVATE_SERVICE_CONNECT, this field must not be specified. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#networkEndpointGroup for network endpoint group. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | The URL of the network to which all network endpoints in the NEG belong. For networkEndpointType GCE_VM_IP_PORT,GCE_VM_IP_PORTMAP or NON_GCP_PRIVATE_IP_PORT, if this field is not specified, a default network will be used. This field cannot be set for NEGs with networkEndpointType set toSERVERLESS or PRIVATE_SERVICE_CONNECT and for global NEGs. For all other network endpoint types, this field is required. |
| `networkAttachment` | string | Optional. The URL of the network attachment that this resource belongs to.projects/{project}/regions/{region_name}/networkAttachments/{network_attachment_name}. |
| `networkEndpointType` | string enum | Type of network endpoints in this network endpoint group. Can be one ofGCE_VM_IP, GCE_VM_IP_PORT,NON_GCP_PRIVATE_IP_PORT, INTERNET_FQDN_PORT,INTERNET_IP_PORT, SERVERLESS,PRIVATE_SERVICE_CONNECT, GCE_VM_IP_PORTMAP. Values: `GCE_VM_IP`, `GCE_VM_IP_DEDICATED_BACKEND`, `GCE_VM_IP_PORT`, `GCE_VM_IP_PORTMAP`, `INTERNET_FQDN_PORT`, `INTERNET_IP_PORT`, `NON_GCP_PRIVATE_IP_PORT`, `PRIVATE_SERVICE_CONNECT`, `SERVERLESS`. |
| `pscData` | NetworkEndpointGroupPscData | Optional. Only valid when networkEndpointType isPRIVATE_SERVICE_CONNECT. |
| `pscTargetService` | string | The target service url used to set up private service connection to a Google API or a PSC Producer Service Attachment. An example value is: asia-northeast3-cloudkms.googleapis.com. Optional. Only valid when networkEndpointType isPRIVATE_SERVICE_CONNECT. |
| `region` | string | Output only. \[Output Only\] The URL of theregion where the network endpoint group is located. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `serviceClassId` | string | Optional. The service class ID associated with this resource. Can only be used with network_attachment. It is not possible to use on its own; however, network_attachment can be used without service_class_id. |
| `size` | integer (int32) | Output only. \[Output only\] Number of network endpoints in the network endpoint group. |
| `subnetwork` | string | Optional URL of the subnetwork to which all network endpoints in the NEG belong. |
| `zone` | string | Output only. \[Output Only\] The URL of thezone where the network endpoint group is located. |

### `NetworkEndpointGroupAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of NetworkEndpointGroupsScopedList resources. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#networkEndpointGroupAggregatedList for aggregated lists of network endpoint groups. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NetworkEndpointGroupAppEngine`

- Configuration for an App Engine network endpoint group (NEG). The service is optional, may be provided explicitly or in the URL mask. The version is optional and can only be provided explicitly or in the URL mask when service is present. Note: App Engine service must be in the same project and located in the same region as the Serverless NEG.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `service` | string | Optional serving service. The service name is case-sensitive and must be 1-63 characters long. Example value: default, my-service. |
| `urlMask` | string | An URL mask is one of the main components of the Cloud Function. A template to parse service and version fields from a request URL. URL mask allows for routing to multiple App Engine services without having to create multiple Network Endpoint Groups and backend services. For example, the request URLsfoo1-dot-appname.appspot.com/v1 andfoo1-dot-appname.appspot.com/v2 can be backed by the same Serverless NEG with URL mask<service>-dot-appname.appspot.com/<version>. The URL mask will parse them to { service = "foo1", version = "v1" } and { service = "foo1", version = "v2" } respectively. |
| `version` | string | Optional serving version. The version name is case-sensitive and must be 1-100 characters long. Example value: v1, v2. |

### `NetworkEndpointGroupCloudFunction`

- Configuration for a Cloud Function network endpoint group (NEG). The function must be provided explicitly or in the URL mask. Note: Cloud Function must be in the same project and located in the same region as the Serverless NEG.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `function` | string | A user-defined name of the Cloud Function. The function name is case-sensitive and must be 1-63 characters long. Example value: func1. |
| `urlMask` | string | An URL mask is one of the main components of the Cloud Function. A template to parse function field from a request URL. URL mask allows for routing to multiple Cloud Functions without having to create multiple Network Endpoint Groups and backend services. For example, request URLs mydomain.com/function1 andmydomain.com/function2 can be backed by the same Serverless NEG with URL mask /<function>. The URL mask will parse them to { function = "function1" } and{ function = "function2" } respectively. |

### `NetworkEndpointGroupCloudRun`

- Configuration for a Cloud Run network endpoint group (NEG). The service must be provided explicitly or in the URL mask. The tag is optional, may be provided explicitly or in the URL mask. Note: Cloud Run service must be in the same project and located in the same region as the Serverless NEG.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `service` | string | Cloud Run service is the main resource of Cloud Run. The service must be 1-63 characters long, and comply withRFC1035. Example value: "run-service". |
| `tag` | string | Optional Cloud Run tag represents the "named-revision" to provide additional fine-grained traffic routing information. The tag must be 1-63 characters long, and comply withRFC1035. Example value: "revision-0010". |
| `urlMask` | string | An URL mask is one of the main components of the Cloud Function. A template to parse <service> and<tag> fields from a request URL. URL mask allows for routing to multiple Run services without having to create multiple network endpoint groups and backend services. For example, request URLs foo1.domain.com/bar1 andfoo1.domain.com/bar2 can be backed by the same Serverless Network Endpoint Group (NEG) with URL mask<tag>.domain.com/<service>. The URL mask will parse them to { service="bar1", tag="foo1" } and { service="bar2", tag="foo2" } respectively. |

### `NetworkEndpointGroupLbNetworkEndpointGroup`

- Load balancing specific fields for network endpoint group.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `defaultPort` | integer (int32) | The default port used if the port number is not specified in the network endpoint. If the network endpoint type is either GCE_VM_IP,SERVERLESS or PRIVATE_SERVICE_CONNECT, this field must not be specified. \[Deprecated\] This field is deprecated. |
| `network` | string | The URL of the network to which all network endpoints in the NEG belong. For networkEndpointType GCE_VM_IP_PORT,GCE_VM_IP_PORTMAP or NON_GCP_PRIVATE_IP_PORT, if this field is not specified, a default network will be used. This field cannot be set for NEGs with networkEndpointType set toSERVERLESS or PRIVATE_SERVICE_CONNECT and for global NEGs. For all other network endpoint types, this field is required. \[Deprecated\] This field is deprecated. |
| `subnetwork` | string | Optional URL of the subnetwork to which all network endpoints in the NEG belong. \[Deprecated\] This field is deprecated. |
| `zone` | string | Output only. \[Output Only\] The URL of thezone where the network endpoint group is located. \[Deprecated\] This field is deprecated. |

### `NetworkEndpointGroupList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<NetworkEndpointGroup> | A list of NetworkEndpointGroup resources. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#networkEndpointGroupList for network endpoint group lists. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NetworkEndpointGroupPscData`

- All data that is specifically relevant to only network endpoint groups of type PRIVATE_SERVICE_CONNECT.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerPscAddress` | string | Output only. \[Output Only\] Address allocated from given subnetwork for PSC. This IP address acts as a VIP for a PSC NEG, allowing it to act as an endpoint in L7 PSC-XLB. |
| `producerPort` | integer (int32) | The psc producer port is used to connect PSC NEG with specific port on the PSC Producer side; should only be used for the PRIVATE_SERVICE_CONNECT NEG type |
| `pscConnectionId` | string (uint64) | Output only. \[Output Only\] The PSC connection id of the PSC Network Endpoint Group Consumer. |
| `pscConnectionStatus` | string enum | Output only. \[Output Only\] The connection status of the PSC Forwarding Rule. Values: `ACCEPTED`, `CLOSED`, `NEEDS_ATTENTION`, `PENDING`, `REJECTED`, `STATUS_UNSPECIFIED`. |

### `NetworkEndpointGroupServerlessDeployment`

- Configuration for a serverless network endpoint group (NEG). Theplatform must be provided. Note: The target backend service must be in the same project and located in the same region as the Serverless NEG.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `platform` | string | The platform of the backend target(s) of this NEG. The only supported value is API Gateway: apigateway.googleapis.com. |
| `resource` | string | The user-defined name of the workload/instance. This value must be provided explicitly or in the urlMask. The resource identified by this value is platform-specific and is as follows: 1. API Gateway: The gateway ID 2. App Engine: The service name 3. Cloud Functions: The function name 4. Cloud Run: The service name |
| `urlMask` | string | An URL mask is one of the main components of the Cloud Function. A template to parse platform-specific fields from a request URL. URL mask allows for routing to multiple resources on the same serverless platform without having to create multiple Network Endpoint Groups and backend resources. The fields parsed by this template are platform-specific and are as follows: 1. API Gateway: The gateway ID 2. App Engine: The service and version 3. Cloud Functions: The function name 4. Cloud Run: The service and tag |
| `version` | string | The optional resource version. The version identified by this value is platform-specific and is follows: 1. API Gateway: Unused 2. App Engine: The service version 3. Cloud Functions: Unused 4. Cloud Run: The service tag |

### `NetworkEndpointGroupsAttachEndpointsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkEndpoints` | array<NetworkEndpoint> | The list of network endpoints to be attached. |

### `NetworkEndpointGroupsDetachEndpointsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkEndpoints` | array<NetworkEndpoint> | The list of network endpoints to be detached. |

### `NetworkEndpointGroupsListEndpointsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthStatus` | string enum | Optional query parameter for showing the health status of each network endpoint. Valid options are SKIP or SHOW. If you don't specify this parameter, the health status of network endpoints will not be provided. Values: `SHOW`, `SKIP`. |

### `NetworkEndpointGroupsListEndpointsRequest` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `endpointFilters` | array<NetworkEndpointGroupsListEndpointsRequestNetworkEndpointFilter> | Optional list of endpoints to query. This is a more efficient but also limited version of filter parameter. Endpoints in the filter must have ip_address and port fields populated, other fields are not supported. |
| `healthStatus` | string enum | Optional query parameter for showing the health status of each network endpoint. Valid options are SKIP or SHOW. If you don't specify this parameter, the health status of network endpoints will not be provided. Values: `SHOW`, `SKIP`. |

### `NetworkEndpointGroupsListEndpointsRequestNetworkEndpointFilter`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `networkEndpoint` | NetworkEndpoint | — |

### `NetworkEndpointGroupsListNetworkEndpoints`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<NetworkEndpointWithHealthStatus> | A list of NetworkEndpointWithHealthStatus resources. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#networkEndpointGroupsListNetworkEndpoints for the list of network endpoints in the specified network endpoint group. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NetworkEndpointGroupsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkEndpointGroups` | array<NetworkEndpointGroup> | Output only. \[Output Only\] The list ofnetwork endpoint groups that are contained in this scope. |
| `warning` | object | Output only. \[Output Only\] An informational warning that replaces the list of network endpoint groups when the list is empty. |

### `NetworkEndpointWithHealthStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healths` | array<HealthStatusForNetworkEndpoint> | Output only. \[Output only\] The health status of network endpoint. Optional. Displayed only if the network endpoint has centralized health checking configured. |
| `networkEndpoint` | NetworkEndpoint | Output only. \[Output only\] The network endpoint. |

### `NetworkFirewallPolicyAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of FirewallPoliciesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#networkFirewallPoliciesAggregatedList for lists of network firewall policies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NetworkInterface`

- A network interface resource attached to an instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessConfigs` | array<AccessConfig> | An array of configurations for this interface. Currently, only one access config, ONE_TO_ONE_NAT, is supported. If there are noaccessConfigs specified, then this instance will have no external internet access. |
| `aliasIpRanges` | array<AliasIpRange> | An array of alias IP ranges for this network interface. You can only specify this field for network interfaces in VPC networks. |
| `aliasIpv6Ranges` | array<AliasIpRange> | An array of alias IPv6 ranges for this network interface. You can only specify this field for network interfaces in VPC networks. |
| `enableVpcScopedDns` | boolean | Optional. If true, DNS resolution will be enabled over this interface. Only valid with network_attachment. |
| `fingerprint` | string (byte) | Fingerprint hash of contents stored in this network interface. This field will be ignored when inserting an Instance or adding a NetworkInterface. An up-to-date fingerprint must be provided in order to update theNetworkInterface. The request will fail with error400 Bad Request if the fingerprint is not provided, or412 Precondition Failed if the fingerprint is out of date. |
| `igmpQuery` | string enum | Indicate whether igmp query is enabled on the network interface or not. If enabled, also indicates the version of IGMP supported. Values: `IGMP_QUERY_DISABLED`, `IGMP_QUERY_V2`. |
| `internalIpv6PrefixLength` | integer (int32) | The prefix length of the primary internal IPv6 range. |
| `ipv6AccessConfigs` | array<AccessConfig> | An array of IPv6 access configurations for this interface. Currently, only one IPv6 access config, DIRECT_IPV6, is supported. If there is no ipv6AccessConfig specified, then this instance will have no external IPv6 Internet access. |
| `ipv6AccessType` | string enum | Output only. \[Output Only\] One of EXTERNAL, INTERNAL to indicate whether the IP can be accessed from the Internet. This field is always inherited from its subnetwork. Valid only if stackType is IPV4_IPV6. Values: `EXTERNAL`, `INTERNAL`. |
| `ipv6Address` | string | An IPv6 internal network address for this network interface. To use a static internal IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an internal IPv6 address from the instance's subnetwork. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#networkInterface for network interfaces. |
| `name` | string | \[Output Only\] The name of the network interface, which is generated by the server. For a VM, the network interface uses the nicN naming format. Where N is a value between 0 and7. The default interface value is nic0. |
| `network` | string | URL of the VPC network resource for this instance. When creating an instance, if neither the network nor the subnetwork is specified, the default network global/networks/default is used. If the selected project doesn't have the default network, you must specify a network or subnet. If the network is not specified but the subnetwork is specified, the network is inferred. If you specify this property, you can specify the network as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/global/networks/network - projects/project/global/networks/network - global/networks/default |
| `networkAttachment` | string | The URL of the network attachment that this interface should connect to in the following format: projects/{project_number}/regions/{region_name}/networkAttachments/{network_attachment_name}. |
| `networkIP` | string | An IPv4 internal IP address to assign to the instance for this network interface. If not specified by the user, an unused internal IP is assigned by the system. |
| `nicType` | string enum | The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet. Values: `GVNIC`, `IDPF`, `IRDMA`, `MRDMA`, `UNSPECIFIED_NIC_TYPE`, `VIRTIO_NET`. |
| `parentNicName` | string | Name of the parent network interface of a dynamic network interface. |
| `queueCount` | integer (int32) | The networking queue count that's specified by users for the network interface. Both Rx and Tx queues will be set to this number. It'll be empty if not specified by the users. |
| `serviceClassId` | string | Optional. Producer Service's Service class Id for the region of this network interface. Can only be used with network_attachment. It is not possible to use on its own however, network_attachment can be used without service_class_id. |
| `stackType` | string enum | The stack type for this network interface. To assign only IPv4 addresses, use IPV4_ONLY. To assign both IPv4 and IPv6 addresses, useIPV4_IPV6. If not specified, IPV4_ONLY is used. This field can be both set at instance creation and update network interface operations. Values: `IPV4_IPV6`, `IPV4_ONLY`, `IPV6_ONLY`. |
| `subnetwork` | string | The URL of the Subnetwork resource for this instance. If the network resource is inlegacy mode, do not specify this field. If the network is in auto subnet mode, specifying the subnetwork is optional. If the network is in custom subnet mode, specifying the subnetwork is required. If you specify this field, you can specify the subnetwork as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/regions/region/subnetworks/subnetwork - regions/region/subnetworks/subnetwork |
| `vlan` | integer (int32) | VLAN tag of a dynamic network interface, must be an integer in the range from 2 to 255 inclusively. |

### `NetworkInterface` (alpha)

- A network interface resource attached to an instance.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `accessConfigs` | array<AccessConfig> | An array of configurations for this interface. Currently, only one access config, ONE_TO_ONE_NAT, is supported. If there are noaccessConfigs specified, then this instance will have no external internet access. |
| `aliasIpRanges` | array<AliasIpRange> | An array of alias IP ranges for this network interface. You can only specify this field for network interfaces in VPC networks. |
| `aliasIpv6Ranges` | array<AliasIpRange> | An array of alias IPv6 ranges for this network interface. You can only specify this field for network interfaces in VPC networks. |
| `dns64Eligible` | boolean | If true, this network interface is eligible for DNS64. This field is only supported for dual-stack (IPV4_IPV6) network interfaces. |
| `enableVpcScopedDns` | boolean | Optional. If true, DNS resolution will be enabled over this interface. Only valid with network_attachment. |
| `fingerprint` | string (byte) | Fingerprint hash of contents stored in this network interface. This field will be ignored when inserting an Instance or adding a NetworkInterface. An up-to-date fingerprint must be provided in order to update theNetworkInterface. The request will fail with error400 Bad Request if the fingerprint is not provided, or412 Precondition Failed if the fingerprint is out of date. |
| `igmpQuery` | string enum | Indicate whether igmp query is enabled on the network interface or not. If enabled, also indicates the version of IGMP supported. Values: `IGMP_QUERY_DISABLED`, `IGMP_QUERY_V2`. |
| `internalIpv6PrefixLength` | integer (int32) | The prefix length of the primary internal IPv6 range. |
| `internalNicLoadBalancingIpv6Address` | string | \[Output Only\] This field specifies the internal IPv6 network address assigned to the CX9 Network Interface Card, which facilitates the routing of traffic between NICs. For any single CX9 Network Interface Card, the identical internalNicLoadBalancingIpv6Address is assigned across all four associated ports. |
| `internalNicLoadBalancingIpv6PrefixLength` | integer (int32) | \[Output Only\] The prefix length of the internal IPv6 Nic load balancing prefix. |
| `ipv6AccessConfigs` | array<AccessConfig> | An array of IPv6 access configurations for this interface. Currently, only one IPv6 access config, DIRECT_IPV6, is supported. If there is no ipv6AccessConfig specified, then this instance will have no external IPv6 Internet access. |
| `ipv6AccessType` | string enum | Output only. \[Output Only\] One of EXTERNAL, INTERNAL to indicate whether the IP can be accessed from the Internet. This field is always inherited from its subnetwork. Valid only if stackType is IPV4_IPV6. Values: `EXTERNAL`, `INTERNAL`. |
| `ipv6Address` | string | An IPv6 internal network address for this network interface. To use a static internal IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an internal IPv6 address from the instance's subnetwork. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#networkInterface for network interfaces. |
| `macAddress` | string | Output only. \[Output Only\] MAC address assigned to this network interface. |
| `name` | string | \[Output Only\] The name of the network interface, which is generated by the server. For a VM, the network interface uses the nicN naming format. Where N is a value between 0 and7. The default interface value is nic0. |
| `nat64Eligible` | boolean | If true, this network interface is eligible for NAT64. This field is only supported for dual-stack (IPV4_IPV6) network interfaces. |
| `network` | string | URL of the VPC network resource for this instance. When creating an instance, if neither the network nor the subnetwork is specified, the default network global/networks/default is used. If the selected project doesn't have the default network, you must specify a network or subnet. If the network is not specified but the subnetwork is specified, the network is inferred. If you specify this property, you can specify the network as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/global/networks/network - projects/project/global/networks/network - global/networks/default |
| `networkAttachment` | string | The URL of the network attachment that this interface should connect to in the following format: projects/{project_number}/regions/{region_name}/networkAttachments/{network_attachment_name}. |
| `networkIP` | string | An IPv4 internal IP address to assign to the instance for this network interface. If not specified by the user, an unused internal IP is assigned by the system. |
| `nicType` | string enum | The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet. Values: `GVNIC`, `IDPF`, `IRDMA`, `MRDMA`, `UNSPECIFIED_NIC_TYPE`, `VIRTIO_NET`. |
| `parentNicName` | string | Name of the parent network interface of a dynamic network interface. |
| `queueCount` | integer (int32) | The networking queue count that's specified by users for the network interface. Both Rx and Tx queues will be set to this number. It'll be empty if not specified by the users. |
| `serviceClassId` | string | Optional. Producer Service's Service class Id for the region of this network interface. Can only be used with network_attachment. It is not possible to use on its own however, network_attachment can be used without service_class_id. |
| `stackType` | string enum | The stack type for this network interface. To assign only IPv4 addresses, use IPV4_ONLY. To assign both IPv4 and IPv6 addresses, useIPV4_IPV6. If not specified, IPV4_ONLY is used. This field can be both set at instance creation and update network interface operations. Values: `IPV4_IPV6`, `IPV4_ONLY`, `IPV6_ONLY`. |
| `subinterfaces` | array<NetworkInterfaceSubInterface> | SubInterfaces help enable L2 communication for the instance over subnetworks that support L2. Every network interface will get a default untagged (vlan not specified) subinterface. Users can specify additional tagged subinterfaces which are sub-fields to the Network Interface. |
| `subnetwork` | string | The URL of the Subnetwork resource for this instance. If the network resource is inlegacy mode, do not specify this field. If the network is in auto subnet mode, specifying the subnetwork is optional. If the network is in custom subnet mode, specifying the subnetwork is required. If you specify this field, you can specify the subnetwork as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/regions/region/subnetworks/subnetwork - regions/region/subnetworks/subnetwork |
| `vlan` | integer (int32) | VLAN tag of a dynamic network interface, must be an integer in the range from 2 to 255 inclusively. |

### `NetworkInterface` (beta)

- A network interface resource attached to an instance.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `accessConfigs` | array<AccessConfig> | An array of configurations for this interface. Currently, only one access config, ONE_TO_ONE_NAT, is supported. If there are noaccessConfigs specified, then this instance will have no external internet access. |
| `aliasIpRanges` | array<AliasIpRange> | An array of alias IP ranges for this network interface. You can only specify this field for network interfaces in VPC networks. |
| `aliasIpv6Ranges` | array<AliasIpRange> | An array of alias IPv6 ranges for this network interface. You can only specify this field for network interfaces in VPC networks. |
| `enableVpcScopedDns` | boolean | Optional. If true, DNS resolution will be enabled over this interface. Only valid with network_attachment. |
| `fingerprint` | string (byte) | Fingerprint hash of contents stored in this network interface. This field will be ignored when inserting an Instance or adding a NetworkInterface. An up-to-date fingerprint must be provided in order to update theNetworkInterface. The request will fail with error400 Bad Request if the fingerprint is not provided, or412 Precondition Failed if the fingerprint is out of date. |
| `igmpQuery` | string enum | Indicate whether igmp query is enabled on the network interface or not. If enabled, also indicates the version of IGMP supported. Values: `IGMP_QUERY_DISABLED`, `IGMP_QUERY_V2`. |
| `internalIpv6PrefixLength` | integer (int32) | The prefix length of the primary internal IPv6 range. |
| `ipv6AccessConfigs` | array<AccessConfig> | An array of IPv6 access configurations for this interface. Currently, only one IPv6 access config, DIRECT_IPV6, is supported. If there is no ipv6AccessConfig specified, then this instance will have no external IPv6 Internet access. |
| `ipv6AccessType` | string enum | Output only. \[Output Only\] One of EXTERNAL, INTERNAL to indicate whether the IP can be accessed from the Internet. This field is always inherited from its subnetwork. Valid only if stackType is IPV4_IPV6. Values: `EXTERNAL`, `INTERNAL`. |
| `ipv6Address` | string | An IPv6 internal network address for this network interface. To use a static internal IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an internal IPv6 address from the instance's subnetwork. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#networkInterface for network interfaces. |
| `macAddress` | string | Output only. \[Output Only\] MAC address assigned to this network interface. |
| `name` | string | \[Output Only\] The name of the network interface, which is generated by the server. For a VM, the network interface uses the nicN naming format. Where N is a value between 0 and7. The default interface value is nic0. |
| `network` | string | URL of the VPC network resource for this instance. When creating an instance, if neither the network nor the subnetwork is specified, the default network global/networks/default is used. If the selected project doesn't have the default network, you must specify a network or subnet. If the network is not specified but the subnetwork is specified, the network is inferred. If you specify this property, you can specify the network as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/global/networks/network - projects/project/global/networks/network - global/networks/default |
| `networkAttachment` | string | The URL of the network attachment that this interface should connect to in the following format: projects/{project_number}/regions/{region_name}/networkAttachments/{network_attachment_name}. |
| `networkIP` | string | An IPv4 internal IP address to assign to the instance for this network interface. If not specified by the user, an unused internal IP is assigned by the system. |
| `nicType` | string enum | The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet. Values: `GVNIC`, `IDPF`, `IRDMA`, `MRDMA`, `UNSPECIFIED_NIC_TYPE`, `VIRTIO_NET`. |
| `parentNicName` | string | Name of the parent network interface of a dynamic network interface. |
| `queueCount` | integer (int32) | The networking queue count that's specified by users for the network interface. Both Rx and Tx queues will be set to this number. It'll be empty if not specified by the users. |
| `serviceClassId` | string | Optional. Producer Service's Service class Id for the region of this network interface. Can only be used with network_attachment. It is not possible to use on its own however, network_attachment can be used without service_class_id. |
| `stackType` | string enum | The stack type for this network interface. To assign only IPv4 addresses, use IPV4_ONLY. To assign both IPv4 and IPv6 addresses, useIPV4_IPV6. If not specified, IPV4_ONLY is used. This field can be both set at instance creation and update network interface operations. Values: `IPV4_IPV6`, `IPV4_ONLY`, `IPV6_ONLY`. |
| `subnetwork` | string | The URL of the Subnetwork resource for this instance. If the network resource is inlegacy mode, do not specify this field. If the network is in auto subnet mode, specifying the subnetwork is optional. If the network is in custom subnet mode, specifying the subnetwork is required. If you specify this field, you can specify the subnetwork as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/regions/region/subnetworks/subnetwork - regions/region/subnetworks/subnetwork |
| `vlan` | integer (int32) | VLAN tag of a dynamic network interface, must be an integer in the range from 2 to 255 inclusively. |

### `NetworkInterfaceSubInterface`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | An IPv4 internal IP address to assign to the instance for this subinterface. If specified, ip_allocation_mode should be set to ALLOCATE_IP. |
| `ipAllocationMode` | string enum | — Values: `ALLOCATE_IP`, `DO_NOT_ALLOCATE_IP`, `UNSPECIFIED`. |
| `subnetwork` | string | If specified, this subnetwork must belong to the same network as that of the network interface. If not specified the subnet of network interface will be used. If you specify this property, you can specify the subnetwork as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/regions/region/subnetworks/subnetwork - regions/region/subnetworks/subnetwork |
| `vlan` | integer (int32) | VLAN tag. Should match the VLAN(s) supported by the subnetwork to which this subinterface is connecting. |

### `NetworkList`

- Contains a list of networks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Network> | A list of Network resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#networkList for lists of networks. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NetworkLocationBinding`

- A regional, read-only resource that reflects the physical location(s) (i.e. clusters) to which a special-purpose VPC network is bound, across the zones of a region. Its lifecycle is managed by the service: it is created when a network using a network profile that requires location binding is created, and deleted when that network is deleted.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | Output only. \[Output Only\] An optional textual description of the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#networkLocationBinding for network location bindings. |
| `name` | string | Output only. \[Output Only\] Name of the resource. The name is generated by the server when the associated network is created. |
| `network` | string | Output only. \[Output Only\] The network this network location binding belongs to. |
| `region` | string | Output only. \[Output Only\] URL of the region where the network location binding resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `state` | string enum | Output only. \[Output Only\] State of the binding. Values: `BINDING_STATE_BOUND`, `BINDING_STATE_UNBOUND`. |
| `status` | NetworkLocationBindingStatus | Output only. \[Output Only\] Status and derived information about the network location binding. |

### `NetworkLocationBindingList`

- Response message for NetworkLocationBindings.List.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `etag` | string | Server-defined ETag for optimistic concurrency control. |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<NetworkLocationBinding> | A list of NetworkLocationBinding resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#networkLocationBindingList for a list of network location bindings. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NetworkLocationBindingStatus`

- Status and derived information about the network location binding.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `bindingType` | string enum | Output only. \[Output Only\] Indicates whether a single cluster, specific clusters, or all clusters are allowed for instance creation. Values: `BINDING_TYPE_ALL_CLUSTERS`, `BINDING_TYPE_MULTI_CLUSTERS`, `BINDING_TYPE_SINGLE_CLUSTER`. |
| `zonalBindings` | object | Output only. \[Output Only\] The mapping of zones to their binding information, keyed by the zone, e.g. zones/us-central1-a. |

### `NetworkLocationBindingZonalBinding`

- Binding information for a single zone.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `prodClusters` | array<string> | Output only. \[Output Only\] Prod cluster names in the zone that this network could schedule instances in. |

### `NetworkParams`

- Additional network parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. |

### `NetworkPeering`

- A network peering attached to a network resource. The message includes the peering name, peer network, peering state, and a flag indicating whether Google Compute Engine should automatically create routes for the peering.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoCreateRoutes` | boolean | This field will be deprecated soon. Use theexchange_subnet_routes field instead. Indicates whether full mesh connectivity is created and managed automatically between peered networks. Currently this field should always be true since Google Compute Engine will automatically create and manage subnetwork routes between two networks when peering state isACTIVE. |
| `connectionStatus` | NetworkPeeringConnectionStatus | Output only. \[Output Only\] The effective state of the peering connection as a whole. |
| `exchangeSubnetRoutes` | boolean | Indicates whether full mesh connectivity is created and managed automatically between peered networks. Currently this field should always be true since Google Compute Engine will automatically create and manage subnetwork routes between two networks when peering state isACTIVE. |
| `exportCustomRoutes` | boolean | Whether to export the custom routes to peer network. The default value is false. |
| `exportSubnetRoutesWithPublicIp` | boolean | Whether subnet routes with public IP range are exported. The default value is true, all subnet routes are exported.IPv4 special-use ranges are always exported to peers and are not controlled by this field. |
| `importCustomRoutes` | boolean | Whether to import the custom routes from peer network. The default value is false. |
| `importSubnetRoutesWithPublicIp` | boolean | Whether subnet routes with public IP range are imported. The default value is false.IPv4 special-use ranges are always imported from peers and are not controlled by this field. |
| `name` | string | Name of this peering. Provided by the client when the peering is created. The name must comply withRFC1035. Specifically, the name must be 1-63 characters long and match regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all the following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | The URL of the peer network. It can be either full URL or partial URL. The peer network may belong to a different project. If the partial URL does not contain project, it is assumed that the peer network is in the same project as the current network. |
| `peerMtu` | integer (int32) | Output only. \[Output Only\] Maximum Transmission Unit in bytes of the peer network. |
| `stackType` | string enum | Which IP version(s) of traffic and routes are allowed to be imported or exported between peer networks. The default value is IPV4_ONLY. Values: `IPV4_IPV6`, `IPV4_ONLY`. |
| `state` | string enum | Output only. \[Output Only\] State for the peering. Values: `ACTIVE`, `INACTIVE`. |
| `stateDetails` | string | Output only. \[Output Only\] Details about the current state of the peering. |
| `updateStrategy` | string enum | The update strategy determines the semantics for updates and deletes to the peering connection configuration. Values: `CONSENSUS`, `INDEPENDENT`, `UNSPECIFIED`. |

### `NetworkPeering` (alpha)

- A network peering attached to a network resource. The message includes the peering name, peer network, peering state, and a flag indicating whether Google Compute Engine should automatically create routes for the peering.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `advertisePeerSubnetsViaRouters` | boolean | Whether Cloud Routers in this network can automatically advertise subnets from the peer network. |
| `autoCreateRoutes` | boolean | This field will be deprecated soon. Use theexchange_subnet_routes field instead. Indicates whether full mesh connectivity is created and managed automatically between peered networks. Currently this field should always be true since Google Compute Engine will automatically create and manage subnetwork routes between two networks when peering state isACTIVE. |
| `connectionStatus` | NetworkPeeringConnectionStatus | Output only. \[Output Only\] The effective state of the peering connection as a whole. |
| `exchangeSubnetRoutes` | boolean | Indicates whether full mesh connectivity is created and managed automatically between peered networks. Currently this field should always be true since Google Compute Engine will automatically create and manage subnetwork routes between two networks when peering state isACTIVE. |
| `exportCustomRoutes` | boolean | Whether to export the custom routes to peer network. The default value is false. |
| `exportSubnetRoutesWithPublicIp` | boolean | Whether subnet routes with public IP range are exported. The default value is true, all subnet routes are exported.IPv4 special-use ranges are always exported to peers and are not controlled by this field. |
| `importCustomRoutes` | boolean | Whether to import the custom routes from peer network. The default value is false. |
| `importSubnetRoutesWithPublicIp` | boolean | Whether subnet routes with public IP range are imported. The default value is false.IPv4 special-use ranges are always imported from peers and are not controlled by this field. |
| `name` | string | Name of this peering. Provided by the client when the peering is created. The name must comply withRFC1035. Specifically, the name must be 1-63 characters long and match regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all the following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | string | The URL of the peer network. It can be either full URL or partial URL. The peer network may belong to a different project. If the partial URL does not contain project, it is assumed that the peer network is in the same project as the current network. |
| `peerMtu` | integer (int32) | Output only. \[Output Only\] Maximum Transmission Unit in bytes of the peer network. |
| `stackType` | string enum | Which IP version(s) of traffic and routes are allowed to be imported or exported between peer networks. The default value is IPV4_ONLY. Values: `IPV4_IPV6`, `IPV4_ONLY`. |
| `state` | string enum | Output only. \[Output Only\] State for the peering. Values: `ACTIVE`, `INACTIVE`, `NCC_MIGRATION_COMPLETE`, `NCC_MIGRATION_IN_PROGRESS`. |
| `stateDetails` | string | Output only. \[Output Only\] Details about the current state of the peering. |
| `updateStrategy` | string enum | The update strategy determines the semantics for updates and deletes to the peering connection configuration. Values: `CONSENSUS`, `INDEPENDENT`, `UNSPECIFIED`. |

### `NetworkPeeringConnectionStatus`

- \[Output Only\] Describes the state of a peering connection, not just the local peering. This field provides information about the effective settings for the connection as a whole, including pending delete/update requests for CONSENSUS peerings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consensusState` | NetworkPeeringConnectionStatusConsensusState | The consensus state contains information about the status of update and delete for a consensus peering connection. |
| `trafficConfiguration` | NetworkPeeringConnectionStatusTrafficConfiguration | The active connectivity settings for the peering connection based on the settings of the network peerings. |
| `updateStrategy` | string enum | The update strategy determines the update/delete semantics for this peering connection. Values: `CONSENSUS`, `INDEPENDENT`, `UNSPECIFIED`. |

### `NetworkPeeringConnectionStatusConsensusState`

- The status of update/delete for a consensus peering connection. Only set when connection_status.update_strategy isCONSENSUS or a network peering is proposing to update the strategy to CONSENSUS.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleteStatus` | string enum | The status of the delete request. Values: `DELETE_ACKNOWLEDGED`, `DELETE_STATUS_UNSPECIFIED`, `LOCAL_CANCEL_REQUESTED`, `LOCAL_DELETE_REQUESTED`, `PEER_CANCEL_REQUESTED`, `PEER_DELETE_REQUESTED`. |
| `updateStatus` | string enum | The status of the update request. Values: `IN_SYNC`, `PENDING_LOCAL_ACKNOWLEDMENT`, `PENDING_PEER_ACKNOWLEDGEMENT`, `UPDATE_STATUS_UNSPECIFIED`. |

### `NetworkPeeringConnectionStatusTrafficConfiguration`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exportCustomRoutesToPeer` | boolean | Whether custom routes are being exported to the peer network. |
| `exportSubnetRoutesWithPublicIpToPeer` | boolean | Whether subnet routes with public IP ranges are being exported to the peer network. |
| `importCustomRoutesFromPeer` | boolean | Whether custom routes are being imported from the peer network. |
| `importSubnetRoutesWithPublicIpFromPeer` | boolean | Whether subnet routes with public IP ranges are being imported from the peer network. |
| `stackType` | string enum | Which IP version(s) of traffic and routes are being imported or exported between peer networks. Values: `IPV4_IPV6`, `IPV4_ONLY`. |

### `NetworkPerformanceConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `totalEgressBandwidthTier` | string enum | — Values: `DEFAULT`, `TIER_1`. |

### `NetworkPerformanceConfig` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `externalIpEgressBandwidthTier` | string enum | — Values: `DEFAULT`, `TIER_1`. |
| `totalEgressBandwidthTier` | string enum | — Values: `DEFAULT`, `TIER_1`. |

### `NetworkPoliciesScopedList`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `networkPolicies` | array<NetworkPolicy> | A list of network policies contained in this scope. |
| `warning` | object | Informational warning which replaces the list of network policies when the list is empty. |

### `NetworkPolicy`

- Represents a Network Policy resource.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `associations` | array<NetworkPolicyAssociation> | Output only. \[Output Only\] A list of associations that belong to this network policy. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#networkPolicy for network policies |
| `name` | string | Name of the resource. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional network policy resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `ruleTupleCount` | integer (int32) | Output only. \[Output Only\] Total count of all network policy rule tuples. A network policy can not exceed a set number of tuples. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `trafficClassificationRules` | array<NetworkPolicyTrafficClassificationRule> | Output only. \[Output Only\] A list of traffic classification rules that belong to this policy. |

### `NetworkPolicyAggregatedList`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of NetworkPoliciesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#networkPolicyAggregatedList for lists of network policies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NetworkPolicyAssociation`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `attachmentTarget` | string | The target that the network policy is attached to. |
| `name` | string | The name for an association. |

### `NetworkPolicyList`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<NetworkPolicy> | A list of NetworkPolicy resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#networkPolicyList for lists of network policies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NetworkPolicyTrafficClassificationRule`

- Represents a traffic classification rule that describes one or more match conditions along with the action to be taken when traffic matches this condition.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `action` | NetworkPolicyTrafficClassificationRuleAction | The Action to perform when the client connection triggers the rule. |
| `description` | string | An optional description for this resource. |
| `disabled` | boolean | Denotes whether the network policy rule is disabled. When set to true, the network policy rule is not enforced and traffic behaves as if it did not exist. If this is unspecified, the network policy rule will be enabled. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#networkPolicyTrafficClassificationRule for network policy traffic classification rules |
| `match` | NetworkPolicyTrafficClassificationRuleMatcher | A match condition that outgoing traffic is evaluated against. If it evaluates to true, the corresponding 'action' is enforced. |
| `priority` | integer (int32) | An integer indicating the priority of a rule in the list. The priority must be a positive value between 1 and 2147482647. The priority values from 2147482648 to 2147483647 (1000) are reserved for system default network policy rules. Rules are evaluated from highest to lowest priority where 1 is the highest priority and 2147483647 is the lowest priority. |
| `ruleName` | string | An optional name for the rule. This field is not a unique identifier and can be updated. |
| `ruleTupleCount` | integer (int32) | Output only. \[Output Only\] Calculation of the complexity of a single network policy rule. |
| `targetSecureTags` | array<NetworkPolicyTrafficClassificationRuleSecureTag> | A list of secure tags that controls which instances the traffic classification rule applies to. If targetSecureTag are specified, then the traffic classification rule applies only to instances in the VPC network that have one of those EFFECTIVE secure tags, if all the targetSecureTag are in INEFFECTIVE state, then this rule will be ignored. targetSecureTag may not be set at the same time as targetServiceAccounts. If neithertargetServiceAccounts nor targetSecureTag are specified, the traffic classification rule applies to all instances on the specified network. Maximum number of target label tags allowed is 256. |
| `targetServiceAccounts` | array<string> | A list of service accounts indicating the sets of instances that are applied with this rule. |

### `NetworkPolicyTrafficClassificationRuleAction`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `dscpMode` | string enum | DSCP mode. When set to AUTO, the DSCP value will be picked automatically based on selected trafficClass. Otherwise,dscpValue needs to be explicitly specified. Values: `AUTO`, `CUSTOM`. |
| `dscpValue` | integer (int32) | Custom DSCP value from 0-63 range. |
| `trafficClass` | string enum | The traffic class that should be applied to the matching packet. Values: `TC1`, `TC2`, `TC3`, `TC4`, `TC5`, `TC6`. |
| `type` | string | Always "apply_traffic_classification" for traffic classification rules. |

### `NetworkPolicyTrafficClassificationRuleMatcher`

- Represents a match condition that incoming traffic is evaluated against. Exactly one field must be specified.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `destIpRanges` | array<string> | CIDR IP address range. Maximum number of destination CIDR IP ranges allowed is 5000. |
| `layer4Configs` | array<NetworkPolicyTrafficClassificationRuleMatcherLayer4Config> | Pairs of IP protocols and ports that the rule should match. |
| `srcIpRanges` | array<string> | CIDR IP address range. Maximum number of source CIDR IP ranges allowed is 5000. |

### `NetworkPolicyTrafficClassificationRuleMatcher` (alpha)

- Represents a match condition that incoming traffic is evaluated against. Exactly one field must be specified.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `destAddressGroups` | array<string> | Address groups which should be matched against the traffic destination. Maximum number of destination address groups is 10. Example: projects//locations//addressGroups/. |
| `destIpRanges` | array<string> | CIDR IP address range. Maximum number of destination CIDR IP ranges allowed is 5000. |
| `layer4Configs` | array<NetworkPolicyTrafficClassificationRuleMatcherLayer4Config> | Pairs of IP protocols and ports that the rule should match. |
| `srcIpRanges` | array<string> | CIDR IP address range. Maximum number of source CIDR IP ranges allowed is 5000. |

### `NetworkPolicyTrafficClassificationRuleMatcherLayer4Config`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `ipProtocol` | string | The IP protocol to which this rule applies. The protocol type is required when creating a traffic classification rule. This value can either be one of the following well known protocol strings (tcp, udp, icmp,esp, ah, ipip,sctp), or the IP protocol number. |
| `ports` | array<string> | An optional list of ports to which this rule applies. This field is only applicable for UDP, TCP or SCTP protocol. Each entry must be either an integer or a range. If not specified, this rule applies to connections through any port. Example inputs include: \["22"\],\["80","443"\], and \["12345-12349"\]. |

### `NetworkPolicyTrafficClassificationRuleSecureTag`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the secure tag, created with TagManager's TagValue API. |
| `state` | string enum | Output only. \[Output Only\] State of the secure tag, either `EFFECTIVE` or `INEFFECTIVE`. A secure tag is `INEFFECTIVE` when it is deleted or its network is deleted. Values: `EFFECTIVE`, `INEFFECTIVE`, `STATE_UNSPECIFIED`. |

### `NetworkProfile`

- NetworkProfile represents a Google managed network profile resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | Output only. \[Output Only\] An optional description of this resource. |
| `features` | NetworkProfileNetworkFeatures | Output only. \[Output Only\] Features supported by the network. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#networkProfile for network profiles. |
| `location` | NetworkProfileLocation | Output only. \[Output Only\] Location to which the network is restricted. |
| `name` | string | Output only. \[Output Only\] Name of the resource. |
| `profileType` | NetworkProfileProfileType | Output only. \[Output Only\] Type of the network profile. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |

### `NetworkProfileLocation`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `scope` | string enum | — Values: `REGION`, `ZONE`. |

### `NetworkProfileNetworkFeatures`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addressPurposes` | array<string> | Specifies what address purposes are supported. If empty, all address purposes are supported. Values: `DNS_RESOLVER`, `GCE_ENDPOINT`, `IPSEC_INTERCONNECT`, `NAT_AUTO`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1`, `PRIVATE_SERVICE_CONNECT`, `SERVERLESS`, `SHARED_LOADBALANCER_VIP`, `VPC_PEERING`. |
| `allowAddressCreation` | string enum | Specifies whether address creation is allowed. Values: `ADDRESS_CREATION_ALLOWED`, `ADDRESS_CREATION_BLOCKED`. |
| `allowAliasIpRanges` | string enum | Specifies whether alias IP ranges (and secondary address ranges) are allowed. Values: `ALIAS_IP_RANGES_ALLOWED`, `ALIAS_IP_RANGES_BLOCKED`. |
| `allowAutoModeSubnet` | string enum | Specifies whether auto mode subnet creation is allowed. Values: `AUTO_MODE_SUBNET_ALLOWED`, `AUTO_MODE_SUBNET_BLOCKED`. |
| `allowClassDFirewalls` | string enum | Specifies whether firewalls for Class D address ranges are supported. Values: `CLASS_D_FIREWALLS_ALLOWED`, `CLASS_D_FIREWALLS_BLOCKED`. |
| `allowCloudNat` | string enum | Specifies whether cloud NAT creation is allowed. Values: `CLOUD_NAT_ALLOWED`, `CLOUD_NAT_BLOCKED`. |
| `allowCloudRouter` | string enum | Specifies whether cloud router creation is allowed. Values: `CLOUD_ROUTER_ALLOWED`, `CLOUD_ROUTER_BLOCKED`. |
| `allowDefaultNicAttachment` | string enum | Specifies whether default NIC attachment is allowed. Values: `DEFAULT_NIC_ATTACHMENT_ALLOWED`, `DEFAULT_NIC_ATTACHMENT_BLOCKED`. |
| `allowExternalIpAccess` | string enum | Specifies whether VMs are allowed to have external IP access on network interfaces connected to this VPC. Values: `EXTERNAL_IP_ACCESS_ALLOWED`, `EXTERNAL_IP_ACCESS_BLOCKED`. |
| `allowFirewallPolicy` | string enum | Specifies whether firewall policy can be attached to the network. Values: `FIREWALL_POLICY_ALLOWED`, `FIREWALL_POLICY_BLOCKED`. |
| `allowInterconnect` | string enum | Specifies whether Cloud Interconnect creation is allowed. Values: `INTERCONNECT_ALLOWED`, `INTERCONNECT_BLOCKED`. |
| `allowIpForwarding` | string enum | Specifies whether IP forwarding is allowed. Values: `IP_FORWARDING_ALLOWED`, `IP_FORWARDING_BLOCKED`. |
| `allowLoadBalancing` | string enum | Specifies whether cloud load balancing is allowed. Values: `LOAD_BALANCING_ALLOWED`, `LOAD_BALANCING_BLOCKED`. |
| `allowMultiNicInSameNetwork` | string enum | Specifies whether multi-nic in the same network is allowed. Values: `MULTI_NIC_IN_SAME_NETWORK_ALLOWED`, `MULTI_NIC_IN_SAME_NETWORK_BLOCKED`. |
| `allowMultiNicInSameSubnetwork` | string enum | Specifies whether multi-nic in the same subnetwork is allowed. Values: `MULTI_NIC_IN_SAME_SUBNETWORK_ALLOWED`, `MULTI_NIC_IN_SAME_SUBNETWORK_BLOCKED`. |
| `allowMulticast` | string enum | Specifies whether multicast is allowed. Values: `MULTICAST_ALLOWED`, `MULTICAST_BLOCKED`. |
| `allowNcc` | string enum | Specifies whether NCC is allowed. Values: `NCC_ALLOWED`, `NCC_BLOCKED`. |
| `allowNetworkMigration` | string enum | Specifies whether VM network migration is allowed. Values: `NETWORK_MIGRATION_ALLOWED`, `NETWORK_MIGRATION_BLOCKED`. |
| `allowPacketMirroring` | string enum | Specifies whether Packet Mirroring 1.0 is supported. Values: `PACKET_MIRRORING_ALLOWED`, `PACKET_MIRRORING_BLOCKED`. |
| `allowPrivateGoogleAccess` | string enum | Specifies whether private Google access is allowed. Values: `PRIVATE_GOOGLE_ACCESS_ALLOWED`, `PRIVATE_GOOGLE_ACCESS_BLOCKED`. |
| `allowPsc` | string enum | Specifies whether PSC creation is allowed. Values: `PSC_ALLOWED`, `PSC_BLOCKED`. |
| `allowSameNetworkUnicast` | string enum | Specifies whether unicast within the same network is allowed. Values: `SAME_NETWORK_UNICAST_ALLOWED`, `SAME_NETWORK_UNICAST_BLOCKED`. |
| `allowStaticRoutes` | string enum | Specifies whether static route creation is allowed. Values: `STATIC_ROUTES_ALLOWED`, `STATIC_ROUTES_BLOCKED`. |
| `allowSubInterfaces` | string enum | Specifies whether sub interfaces are allowed. Values: `SUBINTERFACES_ALLOWED`, `SUBINTERFACES_BLOCKED`. |
| `allowSubnetworkCreation` | string enum | Specifies whether subnetwork creation is allowed. Values: `SUBNETWORK_CREATION_ALLOWED`, `SUBNETWORK_CREATION_BLOCKED`. |
| `allowVpcFirewallRules` | string enum | Specifies whether VPC firewall rules can be created under the network. Values: `VPC_FIREWALL_RULES_ALLOWED`, `VPC_FIREWALL_RULES_BLOCKED`. |
| `allowVpcPeering` | string enum | Specifies whether VPC peering is allowed. Values: `VPC_PEERING_ALLOWED`, `VPC_PEERING_BLOCKED`. |
| `allowVpn` | string enum | Specifies whether VPN creation is allowed. Values: `VPN_ALLOWED`, `VPN_BLOCKED`. |
| `firewallPolicyTypes` | array<string> | — Values: `RDMA_ROCE_POLICY`, `ULL_POLICY`, `VPC_POLICY`. |
| `interfaceTypes` | array<string> | If set, limits the interface types that the network supports. If empty, all interface types are supported. Values: `GVNIC`, `IDPF`, `IRDMA`, `MRDMA`, `UNSPECIFIED_NIC_TYPE`, `VIRTIO_NET`. |
| `multicast` | string enum | Specifies which type of multicast is supported. Values: `MULTICAST_SDN`, `MULTICAST_ULL`. |
| `predefinedNetworkInternalIpv6Range` | string | Specifies a predefined internal IPv6 range for the network. |
| `predefinedSubnetworkRanges` | array<NetworkProfileNetworkFeaturesPredefinedSubnetworkRange> | Predefined subnetwork ranges for the network. |
| `subnetPurposes` | array<string> | Specifies which subnetwork purposes are supported. Values: `SUBNET_PURPOSE_CUSTOM_HARDWARE`, `SUBNET_PURPOSE_PRIVATE`. |
| `subnetStackTypes` | array<string> | Specifies which subnetwork stack types are supported. Values: `SUBNET_STACK_TYPE_IPV4_IPV6`, `SUBNET_STACK_TYPE_IPV4_ONLY`, `SUBNET_STACK_TYPE_IPV6_ONLY`. |
| `subnetworkPurposes` | array<string> | Output only. Specifies which subnetwork purposes are supported. Values: `GLOBAL_MANAGED_PROXY`, `INTERNAL_HTTPS_LOAD_BALANCER`, `PEER_MIGRATION`, `PRIVATE`, `PRIVATE_NAT`, `PRIVATE_RFC_1918`, `PRIVATE_SERVICE_CONNECT`, `REGIONAL_MANAGED_PROXY`. |
| `subnetworkStackTypes` | array<string> | Output only. Specifies which subnetwork stack types are supported. Values: `IPV4_IPV6`, `IPV4_ONLY`, `IPV6_ONLY`. |
| `unicast` | string enum | Specifies which type of unicast is supported. Values: `UNICAST_SDN`, `UNICAST_ULL`. |

### `NetworkProfileNetworkFeaturesPredefinedSubnetworkRange`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipv6Range` | string | The IPv6 range of the predefined subnetwork. |
| `namePrefix` | string | The naming prefix of the predefined subnetwork. |

### `NetworkProfileProfileType`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkType` | string enum | — Values: `RDMA`, `ULL`, `VPC`. |
| `rdmaSubtype` | string enum | — Values: `FALCON`, `ROCE`, `ROCE_METAL`. |
| `ullSubtype` | string enum | — Values: `OPERATOR`, `PARTICIPANT`. |
| `vpcSubtype` | string enum | — Values: `REGIONAL`. |

### `NetworkProfilesListResponse`

- Contains a list of network profiles.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<NetworkProfile> | A list of NetworkProfile resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#networkProfileList for network profiles. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NetworkRoutingConfig`

- A routing configuration attached to a network resource. The message includes the list of routers associated with the network, and a flag indicating the type of routing behavior to enforce network-wide.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bgpAlwaysCompareMed` | boolean | Enable comparison of Multi-Exit Discriminators (MED) across routes with different neighbor ASNs when using the STANDARD BGP best path selection algorithm. |
| `bgpBestPathSelectionMode` | string enum | The BGP best path selection algorithm to be employed within this network for dynamic routes learned by Cloud Routers. Can be LEGACY (default) or STANDARD. Values: `LEGACY`, `STANDARD`. |
| `bgpInterRegionCost` | string enum | Allows to define a preferred approach for handling inter-region cost in the selection process when using the STANDARD BGP best path selection algorithm. Can be DEFAULT orADD_COST_TO_MED. Values: `ADD_COST_TO_MED`, `DEFAULT`. |
| `effectiveBgpAlwaysCompareMed` | boolean | Output only. \[Output Only\] Effective value of the bgp_always_compare_med field. |
| `effectiveBgpInterRegionCost` | string enum | Output only. \[Output Only\] Effective value of the bgp_inter_region_cost field. Values: `ADD_COST_TO_MED`, `DEFAULT`. |
| `routingMode` | string enum | The network-wide routing mode to use. If set to REGIONAL, this network's Cloud Routers will only advertise routes with subnets of this network in the same region as the router. If set toGLOBAL, this network's Cloud Routers will advertise routes with all subnets of this network, across regions. Values: `GLOBAL`, `REGIONAL`. |

### `NetworksAddPeeringRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoCreateRoutes` | boolean | This field will be deprecated soon. Useexchange_subnet_routes in network_peering instead. Indicates whether full mesh connectivity is created and managed automatically between peered networks. Currently this field should always be true since Google Compute Engine will automatically create and manage subnetwork routes between two networks when peering state isACTIVE. |
| `name` | string | Name of the peering, which should conform to RFC1035. |
| `networkPeering` | NetworkPeering | Network peering parameters. In order to specify route policies for peering using import and export custom routes, you must specify all peering related parameters (name, peer network,exchange_subnet_routes) in the network_peering field. The corresponding fields in NetworksAddPeeringRequest will be deprecated soon. |
| `peerNetwork` | string | URL of the peer network. It can be either full URL or partial URL. The peer network may belong to a different project. If the partial URL does not contain project, it is assumed that the peer network is in the same project as the current network. |

### `NetworksAddPeeringRequest` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `autoCreateRoutes` | boolean | This field will be deprecated soon. Useexchange_subnet_routes in network_peering instead. Indicates whether full mesh connectivity is created and managed automatically between peered networks. Currently this field should always be true since Google Compute Engine will automatically create and manage subnetwork routes between two networks when peering state isACTIVE. |
| `exportCustomRoutes` | boolean | This field will be deprecated soon. Useexport_custom_routes in network_peering instead. Whether to export the custom routes to peer network. |
| `importCustomRoutes` | boolean | This field will be deprecated soon. Useimport_custom_routes in network_peering instead. Whether to import the custom routes from peer network. |
| `name` | string | Name of the peering, which should conform to RFC1035. |
| `networkPeering` | NetworkPeering | Network peering parameters. In order to specify route policies for peering using import and export custom routes, you must specify all peering related parameters (name, peer network,exchange_subnet_routes) in the network_peering field. The corresponding fields in NetworksAddPeeringRequest will be deprecated soon. |
| `peerNetwork` | string | URL of the peer network. It can be either full URL or partial URL. The peer network may belong to a different project. If the partial URL does not contain project, it is assumed that the peer network is in the same project as the current network. |

### `NetworksCancelRequestRemovePeeringRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the peering, which should conform to RFC1035. |

### `NetworksGetEffectiveFirewallsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `firewallPolicys` | array<NetworksGetEffectiveFirewallsResponseEffectiveFirewallPolicy> | \[Output Only\] Effective firewalls from firewall policy. It returns Global Network Firewall Policies and Hierarchical Firewall Policies. UseregionNetworkFirewallPolicies.getEffectiveFirewalls to get Regional Network Firewall Policies as well. |
| `firewalls` | array<Firewall> | Effective firewalls on the network. |

### `NetworksGetEffectiveFirewallsResponse` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `firewallPolicys` | array<NetworksGetEffectiveFirewallsResponseEffectiveFirewallPolicy> | \[Output Only\] Effective firewalls from firewall policy. It returns Global Network Firewall Policies and Hierarchical Firewall Policies. UseregionNetworkFirewallPolicies.getEffectiveFirewalls to get Regional Network Firewall Policies as well. |
| `firewalls` | array<Firewall> | Effective firewalls on the network. |
| `organizationFirewalls` | array<NetworksGetEffectiveFirewallsResponseOrganizationFirewallPolicy> | Effective firewalls from organization policies. |

### `NetworksGetEffectiveFirewallsResponseEffectiveFirewallPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Output only. \[Output Only\] Deprecated, please use short name instead. The display name of the firewall policy. |
| `name` | string | Output only. \[Output Only\] The name of the firewall policy. |
| `packetMirroringRules` | array<FirewallPolicyRule> | Output only. \[Output Only\] The packet mirroring rules that apply to the network. |
| `priority` | integer (int32) | Output only. \[Output only\] Priority of firewall policy association. Not applicable for type=HIERARCHY. |
| `rules` | array<FirewallPolicyRule> | \[Output Only\] The rules that apply to the network. |
| `shortName` | string | Output only. \[Output Only\] The short name of the firewall policy. |
| `type` | string enum | Output only. \[Output Only\] The type of the firewall policy. Values: `HIERARCHY`, `NETWORK`, `SYSTEM`, `UNSPECIFIED`. |

### `NetworksGetEffectiveFirewallsResponseOrganizationFirewallPolicy`

- A pruned SecurityPolicy containing ID and any applicable firewall rules.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the security policy. This identifier is defined by the server. |
| `rules` | array<SecurityPolicyRule> | The rules that apply to the network. |

### `NetworksRemovePeeringRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the peering, which should conform to RFC1035. |

### `NetworksRequestRemovePeeringRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the peering, which should conform to RFC1035. |

### `NetworksUpdateNetworkProfileRequest`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `clearNetworkProfile` | boolean | If true, clear the network profile from the network. |
| `networkProfile` | string | A full or partial URL of the new network profile to apply to this network. For example, the following are valid URLs: - https://www.googleapis.com/compute/{api_version}/projects/{project_id}/global/networkProfiles/{network_profile_name} - projects/{project_id}/global/networkProfiles/{network_profile_name} |

### `NetworksUpdatePeeringRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkPeering` | NetworkPeering | — |

### `NodeGroup`

- Represents a sole-tenant Node Group resource. A sole-tenant node is a physical server that is dedicated to hosting VM instances only for your specific project. Use sole-tenant nodes to keep your instances physically separated from instances in other projects, or to group your instances together on the same host hardware. For more information, readSole-tenant nodes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoscalingPolicy` | NodeGroupAutoscalingPolicy | Specifies how autoscaling should behave. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | — |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#nodeGroup for node group. |
| `locationHint` | string | An opaque location hint used to place the Node close to other resources. This field is for use by internal tools that use the public API. The location hint here on the NodeGroup overrides any location_hint present in the NodeTemplate. |
| `maintenanceInterval` | string enum | Specifies the frequency of planned maintenance events. The accepted values are: `AS_NEEDED` and `RECURRENT`. Values: `AS_NEEDED`, `RECURRENT`. |
| `maintenancePolicy` | string enum | Specifies how to handle instances when a node in the group undergoes maintenance. Set to one of: DEFAULT,RESTART_IN_PLACE, or MIGRATE_WITHIN_NODE_GROUP. The default value is DEFAULT. For more information, see Maintenance policies. Values: `DEFAULT`, `MAINTENANCE_POLICY_UNSPECIFIED`, `MIGRATE_WITHIN_NODE_GROUP`, `RESTART_IN_PLACE`. |
| `maintenanceWindow` | NodeGroupMaintenanceWindow | — |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `nodeTemplate` | string | URL of the node template to create the node group from. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `shareSettings` | ShareSettings | Share-settings for the node group |
| `size` | integer (int32) | Output only. \[Output Only\] The total number of nodes in the node group. |
| `status` | string enum | — Values: `CREATING`, `DELETING`, `INVALID`, `READY`. |
| `zone` | string | Output only. \[Output Only\] The name of the zone where the node group resides, such as us-central1-a. |

### `NodeGroup` (alpha)

- Represents a sole-tenant Node Group resource. A sole-tenant node is a physical server that is dedicated to hosting VM instances only for your specific project. Use sole-tenant nodes to keep your instances physically separated from instances in other projects, or to group your instances together on the same host hardware. For more information, readSole-tenant nodes.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `autoscalingPolicy` | NodeGroupAutoscalingPolicy | Specifies how autoscaling should behave. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | — |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#nodeGroup for node group. |
| `locationHint` | string | An opaque location hint used to place the Node close to other resources. This field is for use by internal tools that use the public API. The location hint here on the NodeGroup overrides any location_hint present in the NodeTemplate. |
| `maintenanceInterval` | string enum | Specifies the frequency of planned maintenance events. The accepted values are: `AS_NEEDED` and `RECURRENT`. Values: `AS_NEEDED`, `PERIODIC`, `RECURRENT`. |
| `maintenancePolicy` | string enum | Specifies how to handle instances when a node in the group undergoes maintenance. Set to one of: DEFAULT,RESTART_IN_PLACE, or MIGRATE_WITHIN_NODE_GROUP. The default value is DEFAULT. For more information, see Maintenance policies. Values: `DEFAULT`, `MAINTENANCE_POLICY_UNSPECIFIED`, `MIGRATE_WITHIN_NODE_GROUP`, `RESTART_IN_PLACE`. |
| `maintenanceWindow` | NodeGroupMaintenanceWindow | — |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `nodeTemplate` | string | URL of the node template to create the node group from. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `shareSettings` | ShareSettings | Share-settings for the node group |
| `size` | integer (int32) | Output only. \[Output Only\] The total number of nodes in the node group. |
| `status` | string enum | — Values: `CREATING`, `DELETING`, `INVALID`, `READY`. |
| `zone` | string | Output only. \[Output Only\] The name of the zone where the node group resides, such as us-central1-a. |

### `NodeGroupAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of NodeGroupsScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource.Alwayscompute#nodeGroupAggregatedList for aggregated lists of node groups. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NodeGroupAutoscalingPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxNodes` | integer (int32) | The maximum number of nodes that the group should have. Must be set if autoscaling is enabled. Maximum value allowed is 100. |
| `minNodes` | integer (int32) | The minimum number of nodes that the group should have. |
| `mode` | string enum | The autoscaling mode. Set to one of: ON, OFF, or ONLY_SCALE_OUT. For more information, see Autoscaler modes. Values: `MODE_UNSPECIFIED`, `OFF`, `ON`, `ONLY_SCALE_OUT`. |

### `NodeGroupList`

- Contains a list of nodeGroups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<NodeGroup> | A list of NodeGroup resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource.Always compute#nodeGroupList for lists of node groups. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NodeGroupMaintenanceWindow`

- Time window specified for daily maintenance operations. GCE's internal maintenance will be performed within this window.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maintenanceDuration` | Duration | Output only. \[Output only\] A predetermined duration for the window, automatically chosen to be the smallest possible in the given scenario. |
| `startTime` | string | Start time of the window. This must be in UTC format that resolves to one of 00:00, 04:00, 08:00,12:00, 16:00, or 20:00. For example, both 13:00-5 and 08:00 are valid. |

### `NodeGroupMaintenanceWindow` (alpha)

- Time window specified for daily maintenance operations. GCE's internal maintenance will be performed within this window.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `duration` | string | Output only. \[Output only\] A predetermined duration for the window, automatically chosen to be the smallest possible in the given scenario. |
| `maintenanceDuration` | Duration | Output only. \[Output only\] A predetermined duration for the window, automatically chosen to be the smallest possible in the given scenario. |
| `startTime` | string | Start time of the window. This must be in UTC format that resolves to one of 00:00, 04:00, 08:00,12:00, 16:00, or 20:00. For example, both 13:00-5 and 08:00 are valid. |

### `NodeGroupNode`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<AcceleratorConfig> | Accelerators for this node. |
| `consumedResources` | InstanceConsumptionInfo | Output only. Node resources that are reserved by all instances. |
| `cpuOvercommitType` | string enum | CPU overcommit. Values: `CPU_OVERCOMMIT_TYPE_UNSPECIFIED`, `ENABLED`, `NONE`. |
| `disks` | array<LocalDisk> | Local disk configurations. |
| `instanceConsumptionData` | array<InstanceConsumptionData> | Output only. Instance data that shows consumed resources on the node. |
| `instances` | array<string> | Instances scheduled on this node. |
| `name` | string | The name of the node. |
| `nodeType` | string | The type of this node. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `serverBinding` | ServerBinding | Binding properties for the physical server. |
| `serverId` | string | Server ID associated with this node. |
| `status` | string enum | — Values: `CREATING`, `DELETING`, `INVALID`, `READY`, `REPAIRING`. |
| `totalResources` | InstanceConsumptionInfo | Output only. Total amount of available resources on the node. |
| `upcomingMaintenance` | UpcomingMaintenance | Output only. \[Output Only\] The information about an upcoming maintenance event. |

### `NodeGroupsAddNodesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalNodeCount` | integer (int32) | Count of additional nodes to be added to the node group. |

### `NodeGroupsDeleteNodesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodes` | array<string> | Names of the nodes to delete. |

### `NodeGroupsListNodes`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<NodeGroupNode> | A list of Node resources. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute.nodeGroupsListNodes for the list of nodes in the specified node group. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | Output only. \[Output Only\] Informational warning message. |

### `NodeGroupsPerformMaintenanceRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodes` | array<string> | \[Required\] List of nodes affected by the call. |
| `startTime` | string | The start time of the schedule. The timestamp is an RFC3339 string. |

### `NodeGroupsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeGroups` | array<NodeGroup> | \[Output Only\] A list of node groups contained in this scope. |
| `warning` | object | \[Output Only\] An informational warning that appears when the nodeGroup list is empty. |

### `NodeGroupsSetNodeTemplateRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeTemplate` | string | Full or partial URL of the node template resource to be updated for this node group. |

### `NodeGroupsSimulateMaintenanceEventRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodes` | array<string> | Names of the nodes to go under maintenance simulation. |

### `NodeTemplate`

- Represent a sole-tenant Node Template resource. You can use a template to define properties for nodes in a node group. For more information, readCreating node groups and instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<AcceleratorConfig> | — |
| `cpuOvercommitType` | string enum | CPU overcommit. Values: `CPU_OVERCOMMIT_TYPE_UNSPECIFIED`, `ENABLED`, `NONE`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `disks` | array<LocalDisk> | — |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#nodeTemplate for node templates. |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `nodeAffinityLabels` | object | Labels to use for node affinity, which will be used in instance scheduling. |
| `nodeType` | string | The node type to use for nodes group that are created from this template. |
| `nodeTypeFlexibility` | NodeTemplateNodeTypeFlexibility | Do not use. Instead, use the node_type property. |
| `region` | string | Output only. \[Output Only\] The name of the region where the node template resides, such as us-central1. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `serverBinding` | ServerBinding | Sets the binding properties for the physical server. Valid values include: - \*\[Default\]\* RESTART_NODE_ON_ANY_SERVER: Restarts VMs on any available physical server - RESTART_NODE_ON_MINIMAL_SERVER: Restarts VMs on the same physical server whenever possible See Sole-tenant node options for more information. |
| `status` | string enum | Output only. \[Output Only\] The status of the node template. One of the following values:CREATING, READY, and DELETING. Values: `CREATING`, `DELETING`, `INVALID`, `READY`. |
| `statusMessage` | string | Output only. \[Output Only\] An optional, human-readable explanation of the status. |

### `NodeTemplate` (alpha)

- Represent a sole-tenant Node Template resource. You can use a template to define properties for nodes in a node group. For more information, readCreating node groups and instances.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<AcceleratorConfig> | — |
| `cpuOvercommitType` | string enum | CPU overcommit. Values: `CPU_OVERCOMMIT_TYPE_UNSPECIFIED`, `ENABLED`, `NONE`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `disks` | array<LocalDisk> | — |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#nodeTemplate for node templates. |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `nodeAffinityLabels` | object | Labels to use for node affinity, which will be used in instance scheduling. |
| `nodeType` | string | The node type to use for nodes group that are created from this template. |
| `nodeTypeFlexibility` | NodeTemplateNodeTypeFlexibility | Do not use. Instead, use the node_type property. |
| `region` | string | Output only. \[Output Only\] The name of the region where the node template resides, such as us-central1. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `serverBinding` | ServerBinding | Sets the binding properties for the physical server. Valid values include: - \*\[Default\]\* RESTART_NODE_ON_ANY_SERVER: Restarts VMs on any available physical server - RESTART_NODE_ON_MINIMAL_SERVER: Restarts VMs on the same physical server whenever possible See Sole-tenant node options for more information. |
| `status` | string enum | Output only. \[Output Only\] The status of the node template. One of the following values:CREATING, READY, and DELETING. Values: `CREATING`, `DELETING`, `INVALID`, `READY`. |
| `statusMessage` | string | Output only. \[Output Only\] An optional, human-readable explanation of the status. |

### `NodeTemplateAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of NodeTemplatesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource.Alwayscompute#nodeTemplateAggregatedList for aggregated lists of node templates. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NodeTemplateList`

- Contains a list of node templates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<NodeTemplate> | A list of NodeTemplate resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource.Always compute#nodeTemplateList for lists of node templates. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NodeTemplateNodeTypeFlexibility`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpus` | string | — |
| `localSsd` | string | — |
| `memory` | string | — |

### `NodeTemplatesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeTemplates` | array<NodeTemplate> | \[Output Only\] A list of node templates contained in this scope. |
| `warning` | object | \[Output Only\] An informational warning that appears when the node templates list is empty. |

### `NodeType`

- Represent a sole-tenant Node Type resource. Each node within a node group must have a node type. A node type specifies the total amount of cores and memory for that node. Currently, the only available node type is n1-node-96-624 node type that has 96 vCPUs and 624 GB of memory, available in multiple zones. For more information readNode types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpuPlatform` | string | \[Output Only\] The CPU platform used by this node type. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this node type. |
| `description` | string | \[Output Only\] An optional textual description of the resource. |
| `guestCpus` | integer (int32) | \[Output Only\] The number of virtual CPUs that are available to the node type. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#nodeType for node types. |
| `localSsdGb` | integer (int32) | \[Output Only\] Local SSD available to the node type, defined in GB. |
| `maxVms` | integer (int32) | Output only. \[Output Only\] Maximum number of VMs that can be created for this node type. |
| `memoryMb` | integer (int32) | \[Output Only\] The amount of physical memory available to the node type, defined in MB. |
| `name` | string | \[Output Only\] Name of the resource. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `zone` | string | Output only. \[Output Only\] The name of the zone where the node type resides, such as us-central1-a. |

### `NodeType` (alpha)

- Represent a sole-tenant Node Type resource. Each node within a node group must have a node type. A node type specifies the total amount of cores and memory for that node. Currently, the only available node type is n1-node-96-624 node type that has 96 vCPUs and 624 GB of memory, available in multiple zones. For more information readNode types.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `cpuPlatform` | string | \[Output Only\] The CPU platform used by this node type. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this node type. |
| `description` | string | \[Output Only\] An optional textual description of the resource. |
| `guestCpus` | integer (int32) | \[Output Only\] The number of virtual CPUs that are available to the node type. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#nodeType for node types. |
| `localSsdGb` | integer (int32) | \[Output Only\] Local SSD available to the node type, defined in GB. |
| `maxVms` | integer (int32) | Output only. \[Output Only\] Maximum number of VMs that can be created for this node type. |
| `memoryMb` | integer (int32) | \[Output Only\] The amount of physical memory available to the node type, defined in MB. |
| `name` | string | \[Output Only\] Name of the resource. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `zone` | string | Output only. \[Output Only\] The name of the zone where the node type resides, such as us-central1-a. |

### Shape of `Network`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "IPv4Range": "string",
  "additionalTags": "array<string>",
  "autoCreateSubnetworks": "boolean",
  "creationTimestamp": "string",
  "description": "string",
  "enableUlaInternalIpv6": "boolean",
  "firewallPolicy": "string",
  "gatewayIPv4": "string",
  "id": "string (uint64)",
  "internalIpv6Range": "string",
  "kind": "string",
  "mtu": "integer (int32)",
  "name": "string",
  "networkFirewallPolicyEnforcementOrder": "string enum",
  "networkProfile": "string",
  "params": "NetworkParams",
  "peerings": "array<NetworkPeering>",
  "routingConfig": "NetworkRoutingConfig",
  "selfLink": "string",
  "selfLinkWithId": "string",
  "subnetworks": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
