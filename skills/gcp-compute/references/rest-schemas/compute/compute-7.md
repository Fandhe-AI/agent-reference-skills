---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 7/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `InterconnectDiagnostics`

- Diagnostics information about the Interconnect connection, which contains detailed and current technical information about Google's side of the connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arpCaches` | array<InterconnectDiagnosticsARPEntry> | A list of InterconnectDiagnostics.ARPEntry objects, describing individual neighbors currently seen by the Google router in the ARP cache for the Interconnect. This will be empty when the Interconnect is not bundled. |
| `bundleAggregationType` | string enum | The aggregation type of the bundle interface. Values: `BUNDLE_AGGREGATION_TYPE_LACP`, `BUNDLE_AGGREGATION_TYPE_STATIC`. |
| `bundleOperationalStatus` | string enum | The operational status of the bundle interface. Values: `BUNDLE_OPERATIONAL_STATUS_DOWN`, `BUNDLE_OPERATIONAL_STATUS_UP`. |
| `links` | array<InterconnectDiagnosticsLinkStatus> | A list of InterconnectDiagnostics.LinkStatus objects, describing the status for each link on the Interconnect. |
| `macAddress` | string | The MAC address of the Interconnect's bundle interface. |

### `InterconnectDiagnosticsARPEntry`

- Describing the ARP neighbor entries seen on this link
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | The IP address of this ARP neighbor. |
| `macAddress` | string | The MAC address of this ARP neighbor. |

### `InterconnectDiagnosticsLinkLACPStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `googleSystemId` | string | System ID of the port on Google's side of the LACP exchange. |
| `neighborSystemId` | string | System ID of the port on the neighbor's side of the LACP exchange. |
| `state` | string enum | The state of a LACP link, which can take one of the following values: - ACTIVE: The link is configured and active within the bundle. - DETACHED: The link is not configured within the bundle. This means that the rest of the object should be empty. Values: `ACTIVE`, `DETACHED`. |

### `InterconnectDiagnosticsLinkOpticalPower`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | The status of the current value when compared to the warning and alarm levels for the receiving or transmitting transceiver. Possible states include: - OK: The value has not crossed a warning threshold. - LOW_WARNING: The value has crossed below the low warning threshold. - HIGH_WARNING: The value has crossed above the high warning threshold. - LOW_ALARM: The value has crossed below the low alarm threshold. - HIGH_ALARM: The value has crossed above the high alarm threshold. Values: `HIGH_ALARM`, `HIGH_WARNING`, `LOW_ALARM`, `LOW_WARNING`, `OK`. |
| `value` | number (float) | Value of the current receiving or transmitting optical power, read in dBm. Take a known good optical value, give it a 10% margin and trigger warnings relative to that value. In general, a -7dBm warning and a -11dBm alarm are good optical value estimates for most links. |

### `InterconnectDiagnosticsLinkStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arpCaches` | array<InterconnectDiagnosticsARPEntry> | A list of InterconnectDiagnostics.ARPEntry objects, describing the ARP neighbor entries seen on this link. This will be empty if the link is bundled |
| `circuitId` | string | The unique ID for this link assigned during turn up by Google. |
| `googleDemarc` | string | The Demarc address assigned by Google and provided in the LoA. |
| `lacpStatus` | InterconnectDiagnosticsLinkLACPStatus | — |
| `macsec` | InterconnectDiagnosticsMacsecStatus | Describes the status of MACsec encryption on this link. |
| `operationalStatus` | string enum | The operational status of the link. Values: `LINK_OPERATIONAL_STATUS_DOWN`, `LINK_OPERATIONAL_STATUS_UP`. |
| `receivingOpticalPower` | InterconnectDiagnosticsLinkOpticalPower | An InterconnectDiagnostics.LinkOpticalPower object, describing the current value and status of the received light level. |
| `transmittingOpticalPower` | InterconnectDiagnosticsLinkOpticalPower | An InterconnectDiagnostics.LinkOpticalPower object, describing the current value and status of the transmitted light level. |

### `InterconnectDiagnosticsMacsecStatus`

- Describes the status of MACsec encryption on the link.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ckn` | string | Indicates the Connectivity Association Key Name (CKN) currently being used if MACsec is operational. |
| `operational` | boolean | Indicates whether or not MACsec is operational on this link. |

### `InterconnectGroup`

- An interconnect group resource allows customers to create, analyze, and expand their redundant connections.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configured` | InterconnectGroupConfigured | — |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `etag` | string | Opaque system-generated token that uniquely identifies the configuration. If provided when patching a configuration in update mode, the provided token must match the current token or the update is rejected. This provides a reliable means of doing read-modify-write (optimistic locking) as described by AIP 154. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `intent` | InterconnectGroupIntent | — |
| `interconnects` | object | Interconnects in the InterconnectGroup. Keys are arbitrary user-specified strings. Users are encouraged, but not required, to use their preferred format for resource links as keys. Note that there are add-members and remove-members methods in gcloud. The size of this map is limited by an "Interconnects per group" quota. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#InterconnectGroup |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `physicalStructure` | InterconnectGroupPhysicalStructure | — |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |

### `InterconnectGroupConfigured`

- \[Output Only\] The status of the group as configured. This has the same structure as the operational field reported by the OperationalStatus method, but does not take into account the operational status of each resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `topologyCapability` | InterconnectGroupConfiguredTopologyCapability | — |

### `InterconnectGroupConfiguredTopologyCapability`

- \[Output Only\] How reliable this topology is configured to be, and why this group does or does not meet the requirements for the intended capability.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `intendedCapabilityBlockers` | array<InterconnectGroupConfiguredTopologyCapabilityIntendedCapabilityBlockers> | — |
| `supportedSla` | string enum | — Values: `NO_SLA`, `PRODUCTION_CRITICAL`, `PRODUCTION_NON_CRITICAL`, `UNSPECIFIED`. |

### `InterconnectGroupConfiguredTopologyCapabilityIntendedCapabilityBlockers`

- \[Output Only\] Reasons why configuration.topologyCapability.sla differs from intent.topologyCapability. This list is empty if and only if those are the same.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `blockerType` | string enum | — Values: `INCOMPATIBLE_METROS`, `NOT_AVAILABLE`, `NO_INTERCONNECTS`, `NO_INTERCONNECTS_IN_METRO_AND_ZONE`, `OTHER`, `UNSPECIFIED`. |
| `documentationLink` | string | Output only. \[Output Only\] The url of Google Cloud public documentation explaining this requirement. This is set for every type of requirement. |
| `explanation` | string | Output only. \[Output Only\] A human-readable explanation of this requirement and why it's not met. This is set for every type of requirement. |
| `facilities` | array<string> | Output only. \[Output Only\] Facilities used to explain this blocker in more detail. Like physicalStructure.metros.facilities.facility, this is a numeric string like "5467". |
| `interconnects` | array<string> | Output only. \[Output Only\] Interconnects used to explain this blocker in more detail. |
| `metros` | array<string> | Output only. \[Output Only\] Metros used to explain this blocker in more detail. These are three-letter lowercase strings like "iad". A blocker like INCOMPATIBLE_METROS will specify the problematic metros in this field. |
| `zones` | array<string> | Output only. \[Output Only\] Zones used to explain this blocker in more detail. Zone names are "zone1" and/or "zone2". |

### `InterconnectGroupIntent`

- The user's intent for this group. This is the only required field besides the name that must be specified on group creation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `topologyCapability` | string enum | — Values: `NO_SLA`, `PRODUCTION_CRITICAL`, `PRODUCTION_NON_CRITICAL`, `UNSPECIFIED`. |

### `InterconnectGroupInterconnect`

- An Interconnect in this InterconnectGroup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interconnect` | string | The URL of an Interconnect in this group. All Interconnects in the group are unique. |

### `InterconnectGroupPhysicalStructure`

- \[Output Only\] An analysis of the physical layout of Interconnects in this group. Every Interconnect in the group is shown once in this structure.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metros` | array<InterconnectGroupPhysicalStructureMetros> | — |

### `InterconnectGroupPhysicalStructureMetros`

- \[Output Only\] The metros Interconnects in this group are in.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `facilities` | array<InterconnectGroupPhysicalStructureMetrosFacilities> | — |
| `metro` | string | Output only. \[Output Only\] The name of the metro, as a three-letter lowercase string like "iad". This is the first component of the location of Interconnects underneath this. |

### `InterconnectGroupPhysicalStructureMetrosFacilities`

- \[Output Only\] The facilities Interconnects in this metro are present in.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `facility` | string | Output only. \[Output Only\] The ID of this facility, as a numeric string like "5467". This is the third component of the location of Interconnects in this facility. |
| `zones` | array<InterconnectGroupPhysicalStructureMetrosFacilitiesZones> | — |

### `InterconnectGroupPhysicalStructureMetrosFacilitiesZones`

- \[Output Only\] The zones that Interconnects in this facility are present in.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interconnects` | array<string> | Output only. \[Output Only\] URLs of Interconnects in this redundancy group in the given metro, facility, and zone. |
| `zone` | string | Output only. \[Output Only\] The name of the zone, either "zone1" or "zone2". This is the second component of the location of Interconnects in this facility. |

### `InterconnectGroupsCreateMembers`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `intentMismatchBehavior` | string enum | How to behave when configured.topologyCapability.supportedSLA would not equal intent.topologyCapability after this call. Values: `CREATE`, `REJECT`, `UNSPECIFIED`. |
| `interconnects` | array<InterconnectGroupsCreateMembersInterconnectInput> | — |
| `templateInterconnect` | InterconnectGroupsCreateMembersInterconnectInput | Parameters for the Interconnects to create. |

### `InterconnectGroupsCreateMembersInterconnectInput`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminEnabled` | boolean | Administrative status of the interconnect. When this is set to true, the Interconnect is functional and can carry traffic. When set to false, no packets can be carried over the interconnect and no BGP routes are exchanged over it. By default, the status is set to true. |
| `customerName` | string | Customer name, to put in the Letter of Authorization as the party authorized to request a crossconnect. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `facility` | string | A zone-free location to use for all Interconnects created in this call, like "iad-1234". |
| `interconnectType` | string enum | Type of interconnect, which can take one of the following values: - PARTNER: A partner-managed interconnection shared between customers though a partner. - DEDICATED: A dedicated physical interconnection with the customer. Note that a value IT_PRIVATE has been deprecated in favor of DEDICATED. Values: `DEDICATED`, `IT_PRIVATE`, `PARTNER`. |
| `linkType` | string enum | Type of link requested, which can take one of the following values: - LINK_TYPE_ETHERNET_10G_LR: A 10G Ethernet with LR optics - LINK_TYPE_ETHERNET_100G_LR: A 100G Ethernet with LR optics. - LINK_TYPE_ETHERNET_400G_LR4: A 400G Ethernet with LR4 optics. Note that this field indicates the speed of each of the links in the bundle, not the speed of the entire bundle. Values: `LINK_TYPE_ETHERNET_100G_LR`, `LINK_TYPE_ETHERNET_10G_LR`, `LINK_TYPE_ETHERNET_400G_LR4`. |
| `name` | string | Name of the Interconnects to be created. This must be specified on the template and/or on each individual interconnect. The name, if not empty, must be 1-63 characters long, and comply with RFC1035. Specifically, any nonempty name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `nocContactEmail` | string | Email address to contact the customer NOC for operations and maintenance notifications regarding this Interconnect. If specified, this will be used for notifications in addition to all other forms described, such as Cloud Monitoring logs alerting and Cloud Notifications. This field is required for users who sign up for Cloud Interconnect using workforce identity federation. |
| `remoteLocation` | string | Indicates that this is a Cross-Cloud Interconnect. This field specifies the location outside of Google's network that the interconnect is connected to. |
| `requestedFeatures` | array<string> | Optional. List of features requested for this Interconnect connection, which can take one of the following values: - IF_MACSEC: If specified, then the connection is created on MACsec capable hardware ports. If not specified, non-MACsec capable ports will also be considered. - IF_CROSS_SITE_NETWORK: If specified, then the connection is created exclusively for Cross-Site Networking. The connection can not be used for Cross-Site Networking unless this feature is specified. Values: `IF_CROSS_SITE_NETWORK`, `IF_L2_FORWARDING`, `IF_MACSEC`. |
| `requestedLinkCount` | integer (int32) | Target number of physical links in the link bundle, as requested by the customer. |

### `InterconnectGroupsCreateMembersRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `request` | InterconnectGroupsCreateMembers | — |

### `InterconnectGroupsGetOperationalStatusResponse`

- Response for the InterconnectGroupsGetOperationalStatusResponse.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `result` | InterconnectGroupsOperationalStatus | — |

### `InterconnectGroupsListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InterconnectGroup> | A list of InterconnectGroup resources. |
| `kind` | string | — |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InterconnectGroupsOperationalStatus`

- Request to get the status of the interconnect group with extra detail.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configured` | InterconnectGroupConfigured | Output only. The configuration analysis, as returned by Get. |
| `groupStatus` | string enum | Output only. Summarizes the status of the group. Values: `DEGRADED`, `FULLY_DOWN`, `FULLY_UP`, `GROUPS_STATUS_UNSPECIFIED`. |
| `intent` | InterconnectGroupIntent | Output only. The intent of the resource, as returned by Get. |
| `interconnectStatuses` | array<InterconnectGroupsOperationalStatusInterconnectStatus> | — |
| `operational` | InterconnectGroupConfigured | Output only. The operational state of the group, including only active Interconnects. |

### `InterconnectGroupsOperationalStatusInterconnectStatus`

- The status of one Interconnect in the group. The order is arbitrary.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminEnabled` | boolean | Output only. Whether the Interconnect is enabled. |
| `diagnostics` | InterconnectDiagnostics | Output only. The diagnostics of the Interconnect, as returned by the existing get-diagnostics method. |
| `interconnect` | string | Output only. The URL of the Interconnect being described. |
| `isActive` | string enum | Output only. Whether this interconnect is participating in the redundant configuration. Values: `ACTIVE`, `INACTIVE`, `IS_ACTIVE_UNSPECIFIED`. |

### `InterconnectList`

- Response to the list request, and contains a list of interconnects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Interconnect> | A list of Interconnect resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#interconnectList for lists of interconnects. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InterconnectLocation`

- Represents an Interconnect Attachment (VLAN) Location resource. You can use this resource to find location details about an Interconnect attachment (VLAN). For more information about interconnect attachments, read Creating VLAN Attachments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | Output only. \[Output Only\] The postal address of the Point of Presence, each line in the address is separated by a newline character. |
| `availabilityZone` | string | \[Output Only\] Availability zone for this InterconnectLocation. Within a metropolitan area (metro), maintenance will not be simultaneously scheduled in more than one availability zone. Example: "zone1" or "zone2". |
| `availableFeatures` | array<string> | \[Output only\] List of features available at this InterconnectLocation, which can take one of the following values: - IF_MACSEC - IF_CROSS_SITE_NETWORK Values: `IF_CROSS_SITE_NETWORK`, `IF_L2_FORWARDING`, `IF_MACSEC`. |
| `availableLinkTypes` | array<string> | \[Output only\] List of link types available at this InterconnectLocation, which can take one of the following values: - LINK_TYPE_ETHERNET_10G_LR - LINK_TYPE_ETHERNET_100G_LR - LINK_TYPE_ETHERNET_400G_LR4 Values: `LINK_TYPE_ETHERNET_100G_LR`, `LINK_TYPE_ETHERNET_10G_LR`, `LINK_TYPE_ETHERNET_400G_LR4`. |
| `city` | string | \[Output Only\] Metropolitan area designator that indicates which city an interconnect is located. For example: "Chicago, IL", "Amsterdam, Netherlands". |
| `continent` | string enum | \[Output Only\] Continent for this location, which can take one of the following values: - AFRICA - ASIA_PAC - EUROPE - NORTH_AMERICA - SOUTH_AMERICA Values: `AFRICA`, `ASIA_PAC`, `C_AFRICA`, `C_ASIA_PAC`, `C_EUROPE`, `C_NORTH_AMERICA`, `C_SOUTH_AMERICA`, `EUROPE`, `NORTH_AMERICA`, `SOUTH_AMERICA`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `crossSiteInterconnectInfos` | array<InterconnectLocationCrossSiteInterconnectInfo> | \[Output Only\] A list of InterconnectLocation.CrossSiteInterconnectInfo objects, that describe where Cross-Site Interconnect wires may connect to from this location and associated connection parameters. Cross-Site Interconnect isn't allowed to locations which are not listed. |
| `description` | string | Output only. \[Output Only\] An optional description of the resource. |
| `facilityProvider` | string | Output only. \[Output Only\] The name of the provider for this facility (e.g., EQUINIX). |
| `facilityProviderFacilityId` | string | Output only. \[Output Only\] A provider-assigned Identifier for this facility (e.g., Ashburn-DC1). |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#interconnectLocation for interconnect locations. |
| `name` | string | Output only. \[Output Only\] Name of the resource. |
| `peeringdbFacilityId` | string | Output only. \[Output Only\] The peeringdb identifier for this facility (corresponding with a netfac type in peeringdb). |
| `regionInfos` | array<InterconnectLocationRegionInfo> | Output only. \[Output Only\] A list of InterconnectLocation.RegionInfo objects, that describe parameters pertaining to the relation between this InterconnectLocation and various Google Cloud regions. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `singleRegionProductionCriticalPeerLocations` | array<string> | Output only. \[Output Only\] URLs of the other locations that can pair up with this location to support Single-Region 99.99% SLA. E.g. iad-zone1-1 and iad-zone2-5467 are Single-Region 99.99% peer locations of each other. |
| `status` | string enum | \[Output Only\] The status of this InterconnectLocation, which can take one of the following values: - CLOSED: The InterconnectLocation is closed and is unavailable for provisioning new Interconnects. - AVAILABLE: The InterconnectLocation is available for provisioning new Interconnects. Values: `AVAILABLE`, `CLOSED`. |
| `supportsPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |

### `InterconnectLocation` (alpha)

- Represents an Interconnect Attachment (VLAN) Location resource. You can use this resource to find location details about an Interconnect attachment (VLAN). For more information about interconnect attachments, read Creating VLAN Attachments.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `address` | string | Output only. \[Output Only\] The postal address of the Point of Presence, each line in the address is separated by a newline character. |
| `availabilityZone` | string | \[Output Only\] Availability zone for this InterconnectLocation. Within a metropolitan area (metro), maintenance will not be simultaneously scheduled in more than one availability zone. Example: "zone1" or "zone2". |
| `availableFeatures` | array<string> | \[Output only\] List of features available at this InterconnectLocation, which can take one of the following values: - IF_MACSEC - IF_CROSS_SITE_NETWORK Values: `IF_CROSS_SITE_NETWORK`, `IF_L2_FORWARDING`, `IF_MACSEC`. |
| `availableLinkTypes` | array<string> | \[Output only\] List of link types available at this InterconnectLocation, which can take one of the following values: - LINK_TYPE_ETHERNET_10G_LR - LINK_TYPE_ETHERNET_100G_LR - LINK_TYPE_ETHERNET_400G_LR4 Values: `LINK_TYPE_ETHERNET_100G_LR`, `LINK_TYPE_ETHERNET_10G_LR`, `LINK_TYPE_ETHERNET_400G_LR4`. |
| `city` | string | \[Output Only\] Metropolitan area designator that indicates which city an interconnect is located. For example: "Chicago, IL", "Amsterdam, Netherlands". |
| `continent` | string enum | \[Output Only\] Continent for this location, which can take one of the following values: - AFRICA - ASIA_PAC - EUROPE - NORTH_AMERICA - SOUTH_AMERICA Values: `AFRICA`, `ASIA_PAC`, `C_AFRICA`, `C_ASIA_PAC`, `C_EUROPE`, `C_NORTH_AMERICA`, `C_SOUTH_AMERICA`, `EUROPE`, `NORTH_AMERICA`, `SOUTH_AMERICA`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `crossSiteInterconnectInfos` | array<InterconnectLocationCrossSiteInterconnectInfo> | \[Output Only\] A list of InterconnectLocation.CrossSiteInterconnectInfo objects, that describe where Cross-Site Interconnect wires may connect to from this location and associated connection parameters. Cross-Site Interconnect isn't allowed to locations which are not listed. |
| `description` | string | Output only. \[Output Only\] An optional description of the resource. |
| `facilityProvider` | string | Output only. \[Output Only\] The name of the provider for this facility (e.g., EQUINIX). |
| `facilityProviderFacilityId` | string | Output only. \[Output Only\] A provider-assigned Identifier for this facility (e.g., Ashburn-DC1). |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#interconnectLocation for interconnect locations. |
| `name` | string | Output only. \[Output Only\] Name of the resource. |
| `peeringdbFacilityId` | string | Output only. \[Output Only\] The peeringdb identifier for this facility (corresponding with a netfac type in peeringdb). |
| `regionInfos` | array<InterconnectLocationRegionInfo> | Output only. \[Output Only\] A list of InterconnectLocation.RegionInfo objects, that describe parameters pertaining to the relation between this InterconnectLocation and various Google Cloud regions. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `singleRegionProductionCriticalPeerLocations` | array<string> | Output only. \[Output Only\] URLs of the other locations that can pair up with this location to support Single-Region 99.99% SLA. E.g. iad-zone1-1 and iad-zone2-5467 are Single-Region 99.99% peer locations of each other. |
| `status` | string enum | \[Output Only\] The status of this InterconnectLocation, which can take one of the following values: - CLOSED: The InterconnectLocation is closed and is unavailable for provisioning new Interconnects. - AVAILABLE: The InterconnectLocation is available for provisioning new Interconnects. Values: `AVAILABLE`, `CLOSED`. |
| `supportsPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |

### `InterconnectLocationCrossSiteInterconnectInfo`

- Information about Cross-Site Interconnect wires which may be created between the containing location and another remote location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `city` | string | Output only. The remote location for Cross-Site Interconnect wires. This specifies an InterconnectLocation city (metropolitan area designator), which itself may match multiple InterconnectLocations. |
| `maxDynamicPathBandwidthGbps` | string (int64) | Output only. The maximum unmetered bandwidth for dynamic paths allowable per WireGroup for this metro. |
| `maxFixedPathBandwidthGbps` | string (int64) | Output only. The maximum unmetered bandwidth for fixed paths allowable per WireGroup for this metro. |

### `InterconnectLocationCrossSiteInterconnectInfo` (alpha)

- Information about Cross-Site Interconnect wires which may be created between the containing location and another remote location.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `city` | string | Output only. The remote location for Cross-Site Interconnect wires. This specifies an InterconnectLocation city (metropolitan area designator), which itself may match multiple InterconnectLocations. |
| `maxDynamicPathBandwidthGbps` | string (int64) | Output only. The maximum unmetered bandwidth for dynamic paths allowable per WireGroup for this metro. |
| `maxFixedPathBandwidthGbps` | string (int64) | Output only. The maximum unmetered bandwidth for fixed paths allowable per WireGroup for this metro. |
| `maxSingleFlowGbps` | integer (int32) | Output only. The maximum gbps for a single flow to this metro. This limits the total bandwidth which may be configured per wire. |

### `InterconnectLocationList`

- Response to the list request, and contains a list of interconnect locations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InterconnectLocation> | A list of InterconnectLocation resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#interconnectLocationList for lists of interconnect locations. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InterconnectLocationRegionInfo`

- Information about any potential InterconnectAttachments between an Interconnect at a specific InterconnectLocation, and a specific Cloud Region.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expectedRttMs` | string (int64) | Output only. Expected round-trip time in milliseconds, from this InterconnectLocation to a VM in this region. |
| `l2ForwardingEnabled` | boolean | Output only. Identifies whether L2 Interconnect Attachments can be created in this region for interconnects that are in this location. |
| `locationPresence` | string enum | Output only. Identifies the network presence of this location. Values: `GLOBAL`, `LOCAL_REGION`, `LP_GLOBAL`, `LP_LOCAL_REGION`. |
| `region` | string | Output only. URL for the region of this location. |

### `InterconnectMacsec`

- Configuration information for enabling Media Access Control security (MACsec) on this Cloud Interconnect connection between Google and your on-premises router.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failOpen` | boolean | If set to true, the Interconnect connection is configured with ashould-secure MACsec security policy, that allows the Google router to fallback to cleartext traffic if the MKA session cannot be established. By default, the Interconnect connection is configured with amust-secure security policy that drops all traffic if the MKA session cannot be established with your router. |
| `preSharedKeys` | array<InterconnectMacsecPreSharedKey> | Required. A keychain placeholder describing a set of named key objects along with their start times. A MACsec CKN/CAK is generated for each key in the key chain. Google router automatically picks the key with the most recent startTime when establishing or re-establishing a MACsec secure link. |

### `InterconnectMacsec` (beta)

- Configuration information for enabling Media Access Control security (MACsec) on this Cloud Interconnect connection between Google and your on-premises router.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `failOpen` | boolean | If set to true, the Interconnect connection is configured with ashould-secure MACsec security policy, that allows the Google router to fallback to cleartext traffic if the MKA session cannot be established. By default, the Interconnect connection is configured with amust-secure security policy that drops all traffic if the MKA session cannot be established with your router. |
| `interconnectKeyGroup` | string | Optional. URL of the InterconnectKeyGroup resource to use for MACsec, in the format: projects/{project}/locations/{region}/interconnectKeyGroups/{interconnectKeyGroup}. |
| `preSharedKeys` | array<InterconnectMacsecPreSharedKey> | Required. A keychain placeholder describing a set of named key objects along with their start times. A MACsec CKN/CAK is generated for each key in the key chain. Google router automatically picks the key with the most recent startTime when establishing or re-establishing a MACsec secure link. |

### `InterconnectMacsecConfig`

- MACsec configuration information for the Interconnect connection. Contains the generated Connectivity Association Key Name (CKN) and the key (CAK) for this Interconnect connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `preSharedKeys` | array<InterconnectMacsecConfigPreSharedKey> | A keychain placeholder describing a set of named key objects along with their start times. A MACsec CKN/CAK is generated for each key in the key chain. Google router automatically picks the key with the most recent startTime when establishing or re-establishing a MACsec secure link. |

### `InterconnectMacsecConfigPreSharedKey`

- Describes a pre-shared key used to setup MACsec in static connectivity association key (CAK) mode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cak` | string | An auto-generated Connectivity Association Key (CAK) for this key. |
| `ckn` | string | An auto-generated Connectivity Association Key Name (CKN) for this key. |
| `name` | string | User provided name for this pre-shared key. |
| `startTime` | string | User provided timestamp on or after which this key is valid. |

### `InterconnectMacsecPreSharedKey`

- Describes a pre-shared key used to setup MACsec in static connectivity association key (CAK) mode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. A name for this pre-shared key. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `startTime` | string | A RFC3339 timestamp on or after which the key is valid. startTime can be in the future. If the keychain has a single key, startTime can be omitted. If the keychain has multiple keys, startTime is mandatory for each key. The start times of keys must be in increasing order. The start times of two consecutive keys must be at least 6 hours apart. |

### `InterconnectOutageNotification`

- Description of a planned outage on this Interconnect.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `affectedCircuits` | array<string> | If issue_type is IT_PARTIAL_OUTAGE, a list of the Google-side circuit IDs that will be affected. |
| `description` | string | A description about the purpose of the outage. |
| `endTime` | string (int64) | Scheduled end time for the outage (milliseconds since Unix epoch). |
| `issueType` | string enum | Form this outage is expected to take, which can take one of the following values: - OUTAGE: The Interconnect may be completely out of service for some or all of the specified window. - PARTIAL_OUTAGE: Some circuits comprising the Interconnect as a whole should remain up, but with reduced bandwidth. Note that the versions of this enum prefixed with "IT\_" have been deprecated in favor of the unprefixed values. Values: `IT_OUTAGE`, `IT_PARTIAL_OUTAGE`, `OUTAGE`, `PARTIAL_OUTAGE`. |
| `name` | string | Unique identifier for this outage notification. |
| `source` | string enum | The party that generated this notification, which can take the following value: - GOOGLE: this notification as generated by Google. Note that the value of NSRC_GOOGLE has been deprecated in favor of GOOGLE. Values: `GOOGLE`, `NSRC_GOOGLE`. |
| `startTime` | string (int64) | Scheduled start time for the outage (milliseconds since Unix epoch). |
| `state` | string enum | State of this notification, which can take one of the following values: - ACTIVE: This outage notification is active. The event could be in the past, present, or future. See start_time and end_time for scheduling. - CANCELLED: The outage associated with this notification was cancelled before the outage was due to start. - COMPLETED: The outage associated with this notification is complete. Note that the versions of this enum prefixed with "NS\_" have been deprecated in favor of the unprefixed values. Values: `ACTIVE`, `CANCELLED`, `COMPLETED`, `NS_ACTIVE`, `NS_CANCELED`. |

### `InterconnectParams`

- Additional interconnect parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. \* Inconsistent format is not supported. For instance: {"tagKeys/333" : "tagValues/444", "123/env" : "prod"} is invalid. |

### `InterconnectRemoteLocation`

- Represents a Cross-Cloud Interconnect Remote Location resource. You can use this resource to find remote location details about an Interconnect attachment (VLAN).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | Output only. \[Output Only\] The postal address of the Point of Presence, each line in the address is separated by a newline character. |
| `attachmentConfigurationConstraints` | InterconnectAttachmentConfigurationConstraints | Output only. \[Output Only\] Subset of fields from InterconnectAttachment's \|configurationConstraints\| field that apply to all attachments for this remote location. |
| `city` | string | Output only. \[Output Only\] Metropolitan area designator that indicates which city an interconnect is located. For example: "Chicago, IL", "Amsterdam, Netherlands". |
| `constraints` | InterconnectRemoteLocationConstraints | Output only. \[Output Only\] Constraints on the parameters for creating Cross-Cloud Interconnect and associated InterconnectAttachments. |
| `continent` | string enum | Output only. \[Output Only\] Continent for this location, which can take one of the following values: - AFRICA - ASIA_PAC - EUROPE - NORTH_AMERICA - SOUTH_AMERICA Values: `AFRICA`, `ASIA_PAC`, `EUROPE`, `NORTH_AMERICA`, `SOUTH_AMERICA`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | Output only. \[Output Only\] An optional description of the resource. |
| `facilityProvider` | string | Output only. \[Output Only\] The name of the provider for this facility (e.g., EQUINIX). |
| `facilityProviderFacilityId` | string | Output only. \[Output Only\] A provider-assigned Identifier for this facility (e.g., Ashburn-DC1). |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#interconnectRemoteLocation for interconnect remote locations. |
| `lacp` | string enum | Output only. \[Output Only\] Link Aggregation Control Protocol (LACP) constraints, which can take one of the following values: LACP_SUPPORTED, LACP_UNSUPPORTED Values: `LACP_SUPPORTED`, `LACP_UNSUPPORTED`. |
| `maxLagSize100Gbps` | integer (int32) | Output only. \[Output Only\] The maximum number of 100 Gbps ports supported in a link aggregation group (LAG). When linkType is 100 Gbps, requestedLinkCount cannot exceed max_lag_size_100_gbps. |
| `maxLagSize10Gbps` | integer (int32) | Output only. \[Output Only\] The maximum number of 10 Gbps ports supported in a link aggregation group (LAG). When linkType is 10 Gbps, requestedLinkCount cannot exceed max_lag_size_10_gbps. |
| `maxLagSize400Gbps` | integer (int32) | Output only. \[Output Only\] The maximum number of 400 Gbps ports supported in a link aggregation group (LAG). When linkType is 400 Gbps, requestedLinkCount cannot exceed max_lag_size_400_gbps. |
| `name` | string | Output only. \[Output Only\] Name of the resource. |
| `peeringdbFacilityId` | string | Output only. \[Output Only\] The peeringdb identifier for this facility (corresponding with a netfac type in peeringdb). |
| `permittedConnections` | array<InterconnectRemoteLocationPermittedConnections> | Output only. \[Output Only\] Permitted connections. |
| `remoteService` | string | Output only. \[Output Only\] Indicates the service provider present at the remote location. Example values: "Amazon Web Services", "Microsoft Azure". |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `status` | string enum | Output only. \[Output Only\] The status of this InterconnectRemoteLocation, which can take one of the following values: - CLOSED: The InterconnectRemoteLocation is closed and is unavailable for provisioning new Cross-Cloud Interconnects. - AVAILABLE: The InterconnectRemoteLocation is available for provisioning new Cross-Cloud Interconnects. Values: `AVAILABLE`, `CLOSED`. |

### `InterconnectRemoteLocation` (alpha)

- Represents a Cross-Cloud Interconnect Remote Location resource. You can use this resource to find remote location details about an Interconnect attachment (VLAN).
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `address` | string | Output only. \[Output Only\] The postal address of the Point of Presence, each line in the address is separated by a newline character. |
| `attachmentConfigurationConstraints` | InterconnectAttachmentConfigurationConstraints | Output only. \[Output Only\] Subset of fields from InterconnectAttachment's \|configurationConstraints\| field that apply to all attachments for this remote location. |
| `city` | string | Output only. \[Output Only\] Metropolitan area designator that indicates which city an interconnect is located. For example: "Chicago, IL", "Amsterdam, Netherlands". |
| `constraints` | InterconnectRemoteLocationConstraints | Output only. \[Output Only\] Constraints on the parameters for creating Cross-Cloud Interconnect and associated InterconnectAttachments. |
| `continent` | string enum | Output only. \[Output Only\] Continent for this location, which can take one of the following values: - AFRICA - ASIA_PAC - EUROPE - NORTH_AMERICA - SOUTH_AMERICA Values: `AFRICA`, `ASIA_PAC`, `EUROPE`, `NORTH_AMERICA`, `SOUTH_AMERICA`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | Output only. \[Output Only\] An optional description of the resource. |
| `facilityProvider` | string | Output only. \[Output Only\] The name of the provider for this facility (e.g., EQUINIX). |
| `facilityProviderFacilityId` | string | Output only. \[Output Only\] A provider-assigned Identifier for this facility (e.g., Ashburn-DC1). |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#interconnectRemoteLocation for interconnect remote locations. |
| `lacp` | string enum | Output only. \[Output Only\] Link Aggregation Control Protocol (LACP) constraints, which can take one of the following values: LACP_SUPPORTED, LACP_UNSUPPORTED Values: `LACP_SUPPORTED`, `LACP_UNSUPPORTED`. |
| `maxLagSize100Gbps` | integer (int32) | Output only. \[Output Only\] The maximum number of 100 Gbps ports supported in a link aggregation group (LAG). When linkType is 100 Gbps, requestedLinkCount cannot exceed max_lag_size_100_gbps. |
| `maxLagSize10Gbps` | integer (int32) | Output only. \[Output Only\] The maximum number of 10 Gbps ports supported in a link aggregation group (LAG). When linkType is 10 Gbps, requestedLinkCount cannot exceed max_lag_size_10_gbps. |
| `maxLagSize400Gbps` | integer (int32) | Output only. \[Output Only\] The maximum number of 400 Gbps ports supported in a link aggregation group (LAG). When linkType is 400 Gbps, requestedLinkCount cannot exceed max_lag_size_400_gbps. |
| `name` | string | Output only. \[Output Only\] Name of the resource. |
| `peeringdbFacilityId` | string | Output only. \[Output Only\] The peeringdb identifier for this facility (corresponding with a netfac type in peeringdb). |
| `permittedConnections` | array<InterconnectRemoteLocationPermittedConnections> | Output only. \[Output Only\] Permitted connections. |
| `remoteService` | string | Output only. \[Output Only\] Indicates the service provider present at the remote location. Example values: "Amazon Web Services", "Microsoft Azure". |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `status` | string enum | Output only. \[Output Only\] The status of this InterconnectRemoteLocation, which can take one of the following values: - CLOSED: The InterconnectRemoteLocation is closed and is unavailable for provisioning new Cross-Cloud Interconnects. - AVAILABLE: The InterconnectRemoteLocation is available for provisioning new Cross-Cloud Interconnects. Values: `AVAILABLE`, `CLOSED`. |

### `InterconnectRemoteLocationConstraints`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `portPairRemoteLocation` | string enum | Output only. \[Output Only\] Port pair remote location constraints, which can take one of the following values: PORT_PAIR_UNCONSTRAINED_REMOTE_LOCATION, PORT_PAIR_MATCHING_REMOTE_LOCATION. Google Cloud API refers only to individual ports, but the UI uses this field when ordering a pair of ports, to prevent users from accidentally ordering something that is incompatible with their cloud provider. Specifically, when ordering a redundant pair of Cross-Cloud Interconnect ports, and one of them uses a remote location with portPairMatchingRemoteLocation set to matching, the UI requires that both ports use the same remote location. Values: `PORT_PAIR_MATCHING_REMOTE_LOCATION`, `PORT_PAIR_UNCONSTRAINED_REMOTE_LOCATION`. |
| `portPairVlan` | string enum | Output only. \[Output Only\] Port pair VLAN constraints, which can take one of the following values: PORT_PAIR_UNCONSTRAINED_VLAN, PORT_PAIR_MATCHING_VLAN Values: `PORT_PAIR_MATCHING_VLAN`, `PORT_PAIR_UNCONSTRAINED_VLAN`. |
| `subnetLengthRange` | InterconnectRemoteLocationConstraintsSubnetLengthRange | Output only. \[Output Only\] \[min-length, max-length\] The minimum and maximum value (inclusive) for the IPv4 subnet length. For example, an interconnectRemoteLocation for Azure has {min: 30, max: 30} because Azure requires /30 subnets. This range specifies the values supported by both cloud providers. Interconnect currently supports /29 and /30 IPv4 subnet lengths. If a remote cloud has no constraint on IPv4 subnet length, the range would thus be {min: 29, max: 30}. |

### `InterconnectRemoteLocationConstraintsSubnetLengthRange`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `max` | integer (int32) | — |
| `min` | integer (int32) | — |

### `InterconnectRemoteLocationList`

- Response to the list request, and contains a list of interconnect remote locations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InterconnectRemoteLocation> | A list of InterconnectRemoteLocation resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#interconnectRemoteLocationList for lists of interconnect remote locations. |
| `nextPageToken` | string | \[Output Only\] This token lets you get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InterconnectRemoteLocationPermittedConnections`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interconnectLocation` | string | Output only. \[Output Only\] URL of an Interconnect location that is permitted to connect to this Interconnect remote location. |

### `InterconnectsGetDiagnosticsResponse`

- Response for the InterconnectsGetDiagnosticsRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `result` | InterconnectDiagnostics | — |

### `InterconnectsGetMacsecConfigResponse`

- Response for the InterconnectsGetMacsecConfigRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | end_interface: MixerGetResponseWithEtagBuilder |
| `result` | InterconnectMacsecConfig | — |

### `InterconnectsSetNameRequest`

- Request to rename an interconnect.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentName` | string | The current name of the interconnect. The name must be 1-63 characters long, and comply with RFC1035. |
| `name` | string | The new name of the interconnect. The name must be 1-63 characters long, and comply with RFC1035. |

### `InternalIpAddress`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `cidr` | string | IP CIDR address or range. |
| `owner` | string | The owner of the internal IP address. |
| `purpose` | string | The purpose of the internal IP address if applicable. |
| `region` | string | The region of the internal IP address if applicable. |
| `type` | string enum | The type of the internal IP address. Values: `PEER_RESERVED`, `PEER_USED`, `REMOTE_RESERVED`, `REMOTE_USED`, `RESERVED`, `SUBNETWORK`, `TYPE_UNSPECIFIED`. |

### `InternalIpOwner`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `ipCidrRange` | string | IP CIDR range being owned. |
| `owners` | array<string> | URLs of the IP owners of the IP CIDR range. |
| `systemOwned` | boolean | Whether this IP CIDR range is reserved for system use. |

### `Interval`

- Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. |
| `startTime` | string (google-datetime) | Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. |

### `IpAddressesList`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InternalIpAddress> | A list of InternalIpAddress resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#ipAddressesList for IP addresses lists. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `IpOwnerList`

- Contains a list of IP owners.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InternalIpOwner> | A list of InternalIpOwner resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#ipOwnerList for lists of IP owners. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `Jwt`

- \[Deprecated\] JWT configuration for origin authentication. JWT configuration for origin authentication.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `audiences` | array<string> | A JWT containing any of these audiences will be accepted. The service name will be accepted if audiences is empty. Examples: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com |
| `issuer` | string | Identifies the issuer that issued the JWT, which is usually a URL or an email address. Examples: https://securetoken.google.com, 1234567-compute@developer.gserviceaccount.com |
| `jwksPublicKeys` | string | The provider's public key set to validate the signature of the JWT. |
| `jwtHeaders` | array<JwtHeader> | jwt_headers and jwt_params define where to extract the JWT from an HTTP request. If no explicit location is specified, the following default locations are tried in order: 1. The Authorization header using the Bearer schema. See `here `\_. Example: Authorization: Bearer . 2. `access_token` query parameter. See `this `_ Multiple JWTs can be verified for a request. Each JWT has to be extracted from the locations its issuer specified or from the default locations. This field is set if JWT is sent in a request header. This field specifies the header name. For example, if `header=x-goog-iap-jwt-assertion`, the header format will be x-goog-iap-jwt-assertion: . |
| `jwtParams` | array<string> | This field is set if JWT is sent in a query parameter. This field specifies the query parameter name. For example, if jwt_params\[0\] is jwt_token, the JWT format in the query parameter is /path?jwt_token=. |

### `JwtHeader`

- \[Deprecated\] This message specifies a header location to extract JWT token. This message specifies a header location to extract JWT token.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `name` | string | The HTTP header name. |
| `valuePrefix` | string | The value prefix. The value format is "value_prefix" For example, for "Authorization: Bearer ", value_prefix="Bearer " with a space at the end. |

### `License`

- Represents a License resource. A License represents billing and aggregate usage data forpublic andmarketplace images. \*Caution\* This resource is intended for use only by third-party partners who are creatingCloud Marketplace images.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedReplacementLicenses` | array<string> | Specifies licenseCodes of licenses that can replace this license. Note: such replacements are allowed even if removable_from_disk is false. |
| `appendableToDisk` | boolean | If true, this license can be appended to an existing disk's set of licenses. |
| `chargesUseFee` | boolean | \[Output Only\] Deprecated. This field no longer reflects whether a license charges a usage fee. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional textual description of the resource; provided by the client when the resource is created. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `incompatibleLicenses` | array<string> | Specifies licenseCodes of licenses that are incompatible with this license. If a license is incompatible with this license, it cannot be attached to the same disk or image. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#license for licenses. |
| `licenseCode` | string (uint64) | \[Output Only\] The unique code used to attach this license to images, snapshots, and disks. |
| `minimumRetention` | Duration | If set, this license will be unable to be removed or replaced once attached to a disk until the minimum_retention period has passed. |
| `multiTenantOnly` | boolean | If true, this license can only be used on VMs on multi tenant nodes. |
| `name` | string | Name of the resource. The name must be 1-63 characters long and comply withRFC1035. |
| `osLicense` | boolean | If true, indicates this is an OS license. Only one OS license can be attached to a disk or image at a time. |
| `params` | LicenseParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `removableFromDisk` | boolean | If true, this license can be removed from a disk's set of licenses, with no replacement license needed. |
| `requiredCoattachedLicenses` | array<string> | Specifies the set of permissible coattached licenseCodes of licenses that satisfy the coattachment requirement of this license. At least one license from the set must be attached to the same disk or image as this license. |
| `resourceRequirements` | LicenseResourceRequirements | \[Input Only\] Deprecated. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `soleTenantOnly` | boolean | If true, this license can only be used on VMs on sole tenant nodes. |
| `transferable` | boolean | If false, licenses will not be copied from the source resource when creating an image from a disk, disk from snapshot, or snapshot from disk. |
| `updateTimestamp` | string | Output only. \[Output Only\] Last update timestamp inRFC3339 text format. |

### `LicenseCode`

- Represents a License Code resource. A License Code is a unique identifier used to represent alicense resource. \*Caution\* This resource is intended for use only by third-party partners who are creatingCloud Marketplace images.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedReplacementLicenses` | array<string> | Specifies licenseCodes of licenses that can replace this license. Note: such replacements are allowed even if removable_from_disk is false. |
| `appendableToDisk` | boolean | If true, this license can be appended to an existing disk's set of licenses. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | Output only. \[Output Only\] Description of this License Code. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `incompatibleLicenses` | array<string> | Specifies licenseCodes of licenses that are incompatible with this license. If a license is incompatible with this license, it cannot be attached to the same disk or image. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#licenseCode for licenses. |
| `licenseAlias` | array<LicenseCodeLicenseAlias> | \[Output Only\] URL and description aliases of Licenses with the same License Code. |
| `minimumRetention` | Duration | If set, this license will be unable to be removed or replaced once attached to a disk until the minimum_retention period has passed. |
| `multiTenantOnly` | boolean | If true, this license can only be used on VMs on multi tenant nodes. |
| `name` | string | Output only. \[Output Only\] Name of the resource. The name is 1-20 characters long and must be a valid 64 bit integer. |
| `osLicense` | boolean | If true, indicates this is an OS license. Only one OS license can be attached to a disk or image at a time. |
| `removableFromDisk` | boolean | If true, this license can be removed from a disk's set of licenses, with no replacement license needed. |
| `requiredCoattachedLicenses` | array<string> | Specifies the set of permissible coattached licenseCodes of licenses that satisfy the coattachment requirement of this license. At least one license from the set must be attached to the same disk or image as this license. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `soleTenantOnly` | boolean | If true, this license can only be used on VMs on sole tenant nodes. |
| `state` | string enum | Output only. \[Output Only\] Current state of this License Code. Values: `DISABLED`, `ENABLED`, `RESTRICTED`, `STATE_UNSPECIFIED`, `TERMINATED`. |
| `transferable` | boolean | Output only. \[Output Only\] If true, the license will remain attached when creating images or snapshots from disks. Otherwise, the license is not transferred. |
| `updateTimestamp` | string | Output only. \[Output Only\] Last update timestamp inRFC3339 text format. |

### `LicenseCodeLicenseAlias`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. \[Output Only\] Description of this License Code. |
| `selfLink` | string | Output only. \[Output Only\] URL of license corresponding to this License Code. |

### `LicenseParams`

- Additional license params.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the license. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |

### `LicenseResourceCommitment`

- Commitment for a particular license resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `amount` | string (int64) | The number of licenses you plan to purchase. |
| `coresPerLicense` | string | The number of cores per license. |
| `license` | string | The applicable license URI. |

### `LicenseResourceRequirements`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `minGuestCpuCount` | integer (int32) | \[Input Only\] Deprecated. This field no longer reflects the minimum number of guest cpus required to use the Instance. |
| `minMemoryMb` | integer (int32) | \[Input Only\] Deprecated. This field no longer reflects the minimum memory required to use the Instance. |

### `LicensesListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<License> | A list of License resources. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ListInstantSnapshotGroups`

- Contains a list of InstantSnapshotGroup resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InstantSnapshotGroup> | A list of InstantSnapshotGroup resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ListSnapshotGroups`

- Contains a list of SnapshotGroup resources.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<SnapshotGroup> | A list of SnapshotGroup resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ListVmExtensionStatesResponse`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `etag` | string | Output only. Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a VmExtensionPolicy. An up-to-date fingerprint must be provided in order to update the VmExtensionPolicy. To see the latest value of the fingerprint, make a get() request to retrieve a VmExtensionPolicy. |
| `id` | string | Output only. Unique identifier for the resource; defined by the server. |
| `items` | array<VmExtensionState> | Output only. A list of VM extension policy resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | Output only. This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. Unreachable resources. |
| `warning` | object | Output only. Informational warning message. |

### `ListVmExtensionsResponse`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `etag` | string | Output only. Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a VmExtensionPolicy. An up-to-date fingerprint must be provided in order to update the VmExtensionPolicy. To see the latest value of the fingerprint, make a get() request to retrieve a VmExtensionPolicy. |
| `id` | string | Output only. Unique identifier for the resource; defined by the server. |
| `items` | array<VmExtension> | Output only. A list of VM extensions. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | Output only. This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. Unreachable resources. |
| `warning` | object | Output only. Informational warning message. |

### `LocalDisk`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskCount` | integer (int32) | Specifies the number of such disks. |
| `diskSizeGb` | integer (int32) | Specifies the size of the disk in base-2 GB. |
| `diskType` | string | Specifies the desired disk type on the node. This disk type must be a local storage type (e.g.: local-ssd). Note that for nodeTemplates, this should be the name of the disk type and not its URL. |

### `LocalizedMessage`

- Provides a localized error message that is safe to return to the user which can be attached to an RPC error.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locale` | string | The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX" |
| `message` | string | The localized error message in the above locale. |

### `LocationPolicy`

- Configuration for location policy among multiple possible locations (e.g. preferences for zone selection among zones in a single region).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | object | Location configurations mapped by location name. Currently only zone names are supported and must be represented as valid internal URLs, such as zones/us-central1-a. The bulkInsert operation doesn't create instances in an AI zone, even if an AI zone is available in the specified region. For example, if you set a DENY preference for us-central1-a, Compute Engine will consider us-central1-b and us-central1-c for instance creation, but not us-central1-ai1a. Also, you can't use the locations\[\] configuration to allow instance creation in an AI zone. To include an AI zone in bulkInsert operations, use the locationPolicy.zones\[\] field. |
| `targetShape` | string enum | Strategy for distributing VMs across zones in a region. Values: `ANY`, `ANY_SINGLE_ZONE`, `BALANCED`. |
| `zones` | array<LocationPolicyZoneConfiguration> | The bulkInsert operation applies any preferences set in the locations field to the specific zones listed in the zones field if the same zones are specified in both fields. |

### `LocationPolicyLocation`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constraints` | LocationPolicyLocationConstraints | Constraints that the caller requires on the result distribution in this zone. |
| `preference` | string enum | Preference for a given location. Set to either ALLOW orDENY. Values: `ALLOW`, `DENY`, `PREFERENCE_UNSPECIFIED`. |

### `LocationPolicyLocation` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `constraints` | LocationPolicyLocationConstraints | Constraints that the caller requires on the result distribution in this zone. |
| `names` | array<string> | Names of resources to be put in the location. Must contain unique, correct resource names. If used, targetShape must be left unset. |
| `preference` | string enum | Preference for a given location. Set to either ALLOW orDENY. Values: `ALLOW`, `DENY`, `PREFERENCE_UNSPECIFIED`. |

### `LocationPolicyLocationConstraints`

- Per-zone constraints on location policy for this zone.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxCount` | integer (int32) | Maximum number of items that are allowed to be placed in this zone. The value must be non-negative. |

### `LocationPolicyZoneConfiguration`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `zone` | string | The URL of the zone. The zone must exist in the region where the request is called. Zones must be represented as valid partial URLs, such as zones/us-central1-a. |

### `MachineImage`

- Represents a machine image resource. A machine image is a Compute Engine resource that stores all the configuration, metadata, permissions, and data from one or more disks required to create a Virtual machine (VM) instance. For more information, seeMachine images.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] The creation timestamp for this machine image inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `guestFlush` | boolean | \[Input Only\] Whether to attempt an application consistent machine image by informing the OS to prepare for the snapshot process. |
| `id` | string (uint64) | Output only. \[Output Only\] A unique identifier for this machine image. The server defines this identifier. |
| `instanceProperties` | InstanceProperties | \[Output Only\] Properties of source instance |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#machineImage for machine image. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this machine image, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the machine image. |
| `labels` | object | Labels to apply to this machine image. These can be later modified by the setLabels method. |
| `machineImageEncryptionKey` | CustomerEncryptionKey | Encrypts the machine image using acustomer-supplied encryption key. After you encrypt a machine image using a customer-supplied key, you must provide the same key if you use the machine image later. For example, you must provide the encryption key when you create an instance from the encrypted machine image in a future request. Customer-supplied encryption keys do not protect access to metadata of the machine image. If you do not provide an encryption key when creating the machine image, then the machine image will be encrypted using an automatically generated key and you do not need to provide a key to use the machine image later. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | MachineImageParams | Input only. \[Input Only\] Additional parameters that are passed in the request, but are not persisted in the resource. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `savedDisks` | array<SavedDisk> | Output only. An array of Machine Image specific properties for disks attached to the source instance |
| `selfLink` | string | Output only. \[Output Only\] The URL for this machine image. The server defines this URL. |
| `sourceDiskEncryptionKeys` | array<SourceDiskEncryptionKey> | \[Input Only\] Thecustomer-supplied encryption key of the disks attached to the source instance. Required if the source disk is protected by a customer-supplied encryption key. |
| `sourceInstance` | string | The source instance used to create the machine image. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance - projects/project/zones/zone/instances/instance |
| `sourceInstanceProperties` | SourceInstanceProperties | Output only. \[Output Only\] DEPRECATED: Please use instance_properties instead for source instance related properties. New properties will not be added to this field. |
| `status` | string enum | Output only. \[Output Only\] The status of the machine image. One of the following values:INVALID, CREATING, READY,DELETING, and UPLOADING. Values: `CREATING`, `DELETING`, `INVALID`, `READY`, `UPLOADING`. |
| `storageLocations` | array<string> | The regional or multi-regional Cloud Storage bucket location where themachine image is stored. |
| `totalStorageBytes` | string (int64) | Output only. \[Output Only\] Total size of the storage used by the machine image. |

### `MachineImage` (alpha)

- Represents a machine image resource. A machine image is a Compute Engine resource that stores all the configuration, metadata, permissions, and data from one or more disks required to create a Virtual machine (VM) instance. For more information, seeMachine images.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] The creation timestamp for this machine image inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `guestFlush` | boolean | \[Input Only\] Whether to attempt an application consistent machine image by informing the OS to prepare for the snapshot process. |
| `id` | string (uint64) | Output only. \[Output Only\] A unique identifier for this machine image. The server defines this identifier. |
| `instanceProperties` | InstanceProperties | \[Output Only\] Properties of source instance |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#machineImage for machine image. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this machine image, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the machine image. |
| `labels` | object | Labels to apply to this machine image. These can be later modified by the setLabels method. |
| `machineImageEncryptionKey` | CustomerEncryptionKey | Encrypts the machine image using acustomer-supplied encryption key. After you encrypt a machine image using a customer-supplied key, you must provide the same key if you use the machine image later. For example, you must provide the encryption key when you create an instance from the encrypted machine image in a future request. Customer-supplied encryption keys do not protect access to metadata of the machine image. If you do not provide an encryption key when creating the machine image, then the machine image will be encrypted using an automatically generated key and you do not need to provide a key to use the machine image later. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | MachineImageParams | Input only. \[Input Only\] Additional parameters that are passed in the request, but are not persisted in the resource. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `savedDisks` | array<SavedDisk> | Output only. An array of Machine Image specific properties for disks attached to the source instance |
| `selfLink` | string | Output only. \[Output Only\] The URL for this machine image. The server defines this URL. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `sourceDiskEncryptionKeys` | array<SourceDiskEncryptionKey> | \[Input Only\] Thecustomer-supplied encryption key of the disks attached to the source instance. Required if the source disk is protected by a customer-supplied encryption key. |
| `sourceInstance` | string | The source instance used to create the machine image. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance - projects/project/zones/zone/instances/instance |
| `sourceInstanceProperties` | SourceInstanceProperties | Output only. \[Output Only\] DEPRECATED: Please use instance_properties instead for source instance related properties. New properties will not be added to this field. |
| `status` | string enum | Output only. \[Output Only\] The status of the machine image. One of the following values:INVALID, CREATING, READY,DELETING, and UPLOADING. Values: `CREATING`, `DELETING`, `INVALID`, `READY`, `UPLOADING`. |
| `storageLocations` | array<string> | The regional or multi-regional Cloud Storage bucket location where themachine image is stored. |
| `totalStorageBytes` | string (int64) | Output only. \[Output Only\] Total size of the storage used by the machine image. |

### `MachineImageList`

- A list of machine images.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<MachineImage> | A list of MachineImage resources. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#machineImagesListResponse for machine image lists. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `MachineImageParams`

- Machine Image parameters
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludedDisks` | array<string> | Input only. Specifies the list of disk device names that must be excluded from the new machine image. |
| `includedDisks` | array<string> | Input only. Specifies the list of disk device names that must be included with the new machine image. |
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the machine image. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |

### `MachineImageParams` (preview)

- Machine Image parameters
- Version: preview

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the machine image. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |

### `MachineType`

- Represents a Machine Type resource. You can use specific machine types for your VM instances based on performance and pricing requirements. For more information, readMachine Types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<object> | \[Output Only\] A list of accelerator configurations assigned to this machine type. |
| `architecture` | string enum | \[Output Only\] The architecture of the machine type. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `bundledLocalSsds` | BundledLocalSsds | \[Output Only\] The configuration of bundled local SSD for the machine type. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this machine type. Only applicable if the machine type is unavailable. |
| `description` | string | \[Output Only\] An optional textual description of the resource. |
| `guestCpus` | integer (int32) | \[Output Only\] The number of virtual CPUs that are available to the instance. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `imageSpaceGb` | integer (int32) | \[Deprecated\] This property is deprecated and will never be populated with any relevant values. |
| `isSharedCpu` | boolean | \[Output Only\] Whether this machine type has a shared CPU. SeeShared-core machine types for more information. |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#machineType for machine types. |
| `maximumPersistentDisks` | integer (int32) | \[Output Only\] Maximum persistent disks allowed. |
| `maximumPersistentDisksSizeGb` | string (int64) | \[Output Only\] Maximum total persistent disks size (GB) allowed. |
| `memoryMb` | integer (int32) | \[Output Only\] The amount of physical memory available to the instance, defined in MB. |
| `name` | string | \[Output Only\] Name of the resource. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `zone` | string | \[Output Only\] The name of the zone where the machine type resides, such as us-central1-a. |

### `MachineType` (alpha)

- Represents a Machine Type resource. You can use specific machine types for your VM instances based on performance and pricing requirements. For more information, readMachine Types.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<object> | \[Output Only\] A list of accelerator configurations assigned to this machine type. |
| `architecture` | string enum | \[Output Only\] The architecture of the machine type. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `bundledLocalSsds` | BundledLocalSsds | \[Output Only\] The configuration of bundled local SSD for the machine type. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this machine type. Only applicable if the machine type is unavailable. |
| `description` | string | \[Output Only\] An optional textual description of the resource. |
| `guestCpus` | integer (int32) | \[Output Only\] The number of virtual CPUs that are available to the instance. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `isSharedCpu` | boolean | \[Output Only\] Whether this machine type has a shared CPU. SeeShared-core machine types for more information. |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#machineType for machine types. |
| `maximumPersistentDisks` | integer (int32) | \[Output Only\] Maximum persistent disks allowed. |
| `maximumPersistentDisksSizeGb` | string (int64) | \[Output Only\] Maximum total persistent disks size (GB) allowed. |
| `memoryMb` | integer (int32) | \[Output Only\] The amount of physical memory available to the instance, defined in MB. |
| `name` | string | \[Output Only\] Name of the resource. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `zone` | string | \[Output Only\] The name of the zone where the machine type resides, such as us-central1-a. |

### `MachineType` (beta)

- Represents a Machine Type resource. You can use specific machine types for your VM instances based on performance and pricing requirements. For more information, readMachine Types.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<object> | \[Output Only\] A list of accelerator configurations assigned to this machine type. |
| `architecture` | string enum | \[Output Only\] The architecture of the machine type. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `bundledLocalSsds` | BundledLocalSsds | \[Output Only\] The configuration of bundled local SSD for the machine type. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this machine type. Only applicable if the machine type is unavailable. |
| `description` | string | \[Output Only\] An optional textual description of the resource. |
| `guestCpus` | integer (int32) | \[Output Only\] The number of virtual CPUs that are available to the instance. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `isSharedCpu` | boolean | \[Output Only\] Whether this machine type has a shared CPU. SeeShared-core machine types for more information. |
| `kind` | string | Output only. \[Output Only\] The type of the resource. Alwayscompute#machineType for machine types. |
| `maximumPersistentDisks` | integer (int32) | \[Output Only\] Maximum persistent disks allowed. |
| `maximumPersistentDisksSizeGb` | string (int64) | \[Output Only\] Maximum total persistent disks size (GB) allowed. |
| `memoryMb` | integer (int32) | \[Output Only\] The amount of physical memory available to the instance, defined in MB. |
| `name` | string | \[Output Only\] Name of the resource. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `zone` | string | \[Output Only\] The name of the zone where the machine type resides, such as us-central1-a. |

### `MachineTypeAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of MachineTypesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#machineTypeAggregatedList for aggregated lists of machine types. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `MachineTypeList`

- Contains a list of machine types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<MachineType> | A list of MachineType resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#machineTypeList for lists of machine types. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `MachineTypesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `machineTypes` | array<MachineType> | \[Output Only\] A list of machine types contained in this scope. |
| `warning` | object | \[Output Only\] An informational warning that appears when the machine types list is empty. |

### `ManagedInstance`

- A Managed Instance resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentAction` | string enum | Output only. \[Output Only\] The current action that the managed instance group has scheduled for the instance. Possible values: - NONE The instance is running, and the managed instance group does not have any scheduled actions for this instance. - CREATING The managed instance group is creating this instance. If the group fails to create this instance, it will try again until it is successful. - CREATING_WITHOUT_RETRIES The managed instance group is attempting to create this instance only once. If the group fails to create this instance, it does not try again and the group'stargetSize value is decreased instead. - RECREATING The managed instance group is recreating this instance. - DELETING The managed instance group is permanently deleting this instance. - ABANDONING The managed instance group is abandoning this instance. The instance will be removed from the instance group and from any target pools that are associated with this group. - RESTARTING The managed instance group is restarting the instance. - REFRESHING The managed instance group is applying configuration changes to the instance without stopping it. For example, the group can update the target pool list for an instance without stopping that instance. - VERIFYING The managed instance group has created the instance and it is in the process of being verified. Values: `ABANDONING`, `CREATING`, `CREATING_WITHOUT_RETRIES`, `DELETING`, `NONE`, `RECREATING`, `REFRESHING`, `RESTARTING`, `RESUMING`, `STARTING`, `STOPPING`, `SUSPENDING`, `VERIFYING`. |
| `id` | string (uint64) | Output only. \[Output only\] The unique identifier for this resource. This field is empty when instance does not exist. |
| `instance` | string | Output only. \[Output Only\] The URL of the instance. The URL can exist even if the instance has not yet been created. |
| `instanceHealth` | array<ManagedInstanceInstanceHealth> | Output only. \[Output Only\] Health state of the instance per health-check. |
| `instanceStatus` | string enum | Output only. \[Output Only\] The status of the instance. This field is empty when the instance does not exist. Values: `DEPROVISIONING`, `PENDING`, `PENDING_STOP`, `PROVISIONING`, `REPAIRING`, `RUNNING`, `STAGING`, `STOPPED`, `STOPPING`, `SUSPENDED`, `SUSPENDING`, `TERMINATED`. |
| `lastAttempt` | ManagedInstanceLastAttempt | Output only. \[Output Only\] Information about the last attempt to create or delete the instance. |
| `name` | string | Output only. \[Output Only\] The name of the instance. The name always exists even if the instance has not yet been created. |
| `preservedStateFromConfig` | PreservedState | Output only. \[Output Only\] Preserved state applied from per-instance config for this instance. |
| `preservedStateFromPolicy` | PreservedState | Output only. \[Output Only\] Preserved state generated based on stateful policy for this instance. |
| `propertiesFromFlexibilityPolicy` | ManagedInstancePropertiesFromFlexibilityPolicy | Output only. \[Output Only\] Instance properties selected for this instance resulting from InstanceFlexibilityPolicy. |
| `scheduling` | ManagedInstanceScheduling | Output only. Information about the termination timestamp of the instance, if applicable. |
| `shutdownDetails` | ManagedInstanceShutdownDetails | Output only. Specifies the graceful shutdown details if the instance is in `PENDING_STOP` state or there is a programmed stop scheduled. |
| `targetStatus` | string enum | Output only. The eventual status of the instance. The instance group manager will not be identified as stable till each managed instance reaches its targetStatus. Values: `ABANDONED`, `DELETED`, `INVALID`, `RUNNING`, `STOPPED`, `SUSPENDED`. |
| `version` | ManagedInstanceVersion | Output only. \[Output Only\] Intended version of this instance. |

### `ManagedInstance` (alpha)

- A Managed Instance resource.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `allInstancesConfig` | ManagedInstanceAllInstancesConfig | Output only. \[Output Only\] Current all-instances configuration revision applied to this instance. |
| `currentAction` | string enum | Output only. \[Output Only\] The current action that the managed instance group has scheduled for the instance. Possible values: - NONE The instance is running, and the managed instance group does not have any scheduled actions for this instance. - CREATING The managed instance group is creating this instance. If the group fails to create this instance, it will try again until it is successful. - CREATING_WITHOUT_RETRIES The managed instance group is attempting to create this instance only once. If the group fails to create this instance, it does not try again and the group'stargetSize value is decreased instead. - RECREATING The managed instance group is recreating this instance. - DELETING The managed instance group is permanently deleting this instance. - ABANDONING The managed instance group is abandoning this instance. The instance will be removed from the instance group and from any target pools that are associated with this group. - RESTARTING The managed instance group is restarting the instance. - REFRESHING The managed instance group is applying configuration changes to the instance without stopping it. For example, the group can update the target pool list for an instance without stopping that instance. - VERIFYING The managed instance group has created the instance and it is in the process of being verified. Values: `ABANDONING`, `ADOPTING`, `CREATING`, `CREATING_ATOMICALLY`, `CREATING_WITHOUT_RETRIES`, `DELETING`, `NONE`, `QUEUING`, `RECREATING`, `REFRESHING`, `RESTARTING`, `RESTARTING_IN_PLACE`, `RESUMING`, `STARTING`, `STOPPING`, `SUSPENDING`, `VERIFYING`. |
| `currentActionDetails` | ManagedInstanceCurrentActionDetails | — |
| `id` | string (uint64) | Output only. \[Output only\] The unique identifier for this resource. This field is empty when instance does not exist. |
| `instance` | string | Output only. \[Output Only\] The URL of the instance. The URL can exist even if the instance has not yet been created. |
| `instanceFlexibilityOverride` | ManagedInstanceInstanceFlexibilityOverride | Output only. \[Output Only\] The overrides to instance properties resulting from InstanceFlexibilityPolicy. |
| `instanceHealth` | array<ManagedInstanceInstanceHealth> | Output only. \[Output Only\] Health state of the instance per health-check. |
| `instanceStatus` | string enum | Output only. \[Output Only\] The status of the instance. This field is empty when the instance does not exist. Values: `DEPROVISIONING`, `PENDING`, `PENDING_STOP`, `PROVISIONING`, `REPAIRING`, `RUNNING`, `STAGING`, `STOPPED`, `STOPPING`, `SUSPENDED`, `SUSPENDING`, `TERMINATED`. |
| `instanceTemplate` | string | Output only. \[Output Only\] The intended template of the instance. This field is empty when current_action is one of { DELETING, ABANDONING }. |
| `lastAttempt` | ManagedInstanceLastAttempt | Output only. \[Output Only\] Information about the last attempt to create or delete the instance. |
| `name` | string | Output only. \[Output Only\] The name of the instance. The name always exists even if the instance has not yet been created. |
| `preservedStateFromConfig` | PreservedState | Output only. \[Output Only\] Preserved state applied from per-instance config for this instance. |
| `preservedStateFromPolicy` | PreservedState | Output only. \[Output Only\] Preserved state generated based on stateful policy for this instance. |
| `propertiesFromFlexibilityPolicy` | ManagedInstancePropertiesFromFlexibilityPolicy | Output only. \[Output Only\] Instance properties selected for this instance resulting from InstanceFlexibilityPolicy. |
| `scheduling` | ManagedInstanceScheduling | Output only. Information about the termination timestamp of the instance, if applicable. |
| `shutdownDetails` | ManagedInstanceShutdownDetails | Output only. Specifies the graceful shutdown details if the instance is in `PENDING_STOP` state or there is a programmed stop scheduled. |
| `sizeInUnit` | number (float) | Output only. \[Output only\] The size of the VM represented by this Managed Instance. This is how much this Managed Instance contributes to the size of the group. |
| `tag` | string | Output only. \[Output Only\] Tag describing the version. |
| `targetStatus` | string enum | Output only. The eventual status of the instance. The instance group manager will not be identified as stable till each managed instance reaches its targetStatus. Values: `ABANDONED`, `DELETED`, `INVALID`, `RUNNING`, `STOPPED`, `SUSPENDED`. |
| `version` | ManagedInstanceVersion | Output only. \[Output Only\] Intended version of this instance. |

### `ManagedInstance` (beta)

- A Managed Instance resource.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `allInstancesConfig` | ManagedInstanceAllInstancesConfig | Output only. \[Output Only\] Current all-instances configuration revision applied to this instance. |
| `currentAction` | string enum | Output only. \[Output Only\] The current action that the managed instance group has scheduled for the instance. Possible values: - NONE The instance is running, and the managed instance group does not have any scheduled actions for this instance. - CREATING The managed instance group is creating this instance. If the group fails to create this instance, it will try again until it is successful. - CREATING_WITHOUT_RETRIES The managed instance group is attempting to create this instance only once. If the group fails to create this instance, it does not try again and the group'stargetSize value is decreased instead. - RECREATING The managed instance group is recreating this instance. - DELETING The managed instance group is permanently deleting this instance. - ABANDONING The managed instance group is abandoning this instance. The instance will be removed from the instance group and from any target pools that are associated with this group. - RESTARTING The managed instance group is restarting the instance. - REFRESHING The managed instance group is applying configuration changes to the instance without stopping it. For example, the group can update the target pool list for an instance without stopping that instance. - VERIFYING The managed instance group has created the instance and it is in the process of being verified. Values: `ABANDONING`, `ADOPTING`, `CREATING`, `CREATING_WITHOUT_RETRIES`, `DELETING`, `NONE`, `RECREATING`, `REFRESHING`, `RESTARTING`, `RESTARTING_IN_PLACE`, `RESUMING`, `STARTING`, `STOPPING`, `SUSPENDING`, `VERIFYING`. |
| `id` | string (uint64) | Output only. \[Output only\] The unique identifier for this resource. This field is empty when instance does not exist. |
| `instance` | string | Output only. \[Output Only\] The URL of the instance. The URL can exist even if the instance has not yet been created. |
| `instanceHealth` | array<ManagedInstanceInstanceHealth> | Output only. \[Output Only\] Health state of the instance per health-check. |
| `instanceStatus` | string enum | Output only. \[Output Only\] The status of the instance. This field is empty when the instance does not exist. Values: `DEPROVISIONING`, `PENDING`, `PENDING_STOP`, `PROVISIONING`, `REPAIRING`, `RUNNING`, `STAGING`, `STOPPED`, `STOPPING`, `SUSPENDED`, `SUSPENDING`, `TERMINATED`. |
| `lastAttempt` | ManagedInstanceLastAttempt | Output only. \[Output Only\] Information about the last attempt to create or delete the instance. |
| `name` | string | Output only. \[Output Only\] The name of the instance. The name always exists even if the instance has not yet been created. |
| `preservedStateFromConfig` | PreservedState | Output only. \[Output Only\] Preserved state applied from per-instance config for this instance. |
| `preservedStateFromPolicy` | PreservedState | Output only. \[Output Only\] Preserved state generated based on stateful policy for this instance. |
| `propertiesFromFlexibilityPolicy` | ManagedInstancePropertiesFromFlexibilityPolicy | Output only. \[Output Only\] Instance properties selected for this instance resulting from InstanceFlexibilityPolicy. |
| `scheduling` | ManagedInstanceScheduling | Output only. Information about the termination timestamp of the instance, if applicable. |
| `shutdownDetails` | ManagedInstanceShutdownDetails | Output only. Specifies the graceful shutdown details if the instance is in `PENDING_STOP` state or there is a programmed stop scheduled. |
| `targetStatus` | string enum | Output only. The eventual status of the instance. The instance group manager will not be identified as stable till each managed instance reaches its targetStatus. Values: `ABANDONED`, `DELETED`, `INVALID`, `RUNNING`, `STOPPED`, `SUSPENDED`. |
| `version` | ManagedInstanceVersion | Output only. \[Output Only\] Intended version of this instance. |

### `ManagedInstanceAllInstancesConfig`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `revision` | string | Output only. \[Output Only\] Current all-instances configuration revision. This value is in RFC3339 text format. |

### `ManagedInstanceCurrentActionDetails`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `methodName` | string | — |
| `trigger` | string enum | Output only. \[Output Only\] Details of the current action that the managed instance group has scheduled for the instance. Contains trigger for the current action, and methodName in case it was triggered by API call. Possible values for trigger: - API Any API call. - PROACTIVE_UPDATE Proactive updater scheduled an update on this managed instance. - AUTOSCALING Instance being deleted/created after a decision from the Autoscaler. - REDISTRIBUTION The regional managed instance group is moving instances between zones to restore balance. - STANDBY_REFILL The managed instance group is refilling the Standby Pool (stopped/suspended virtual machines) after scale up. - MAINTENANCE Manual maintenance. - FAILED_CREATION The managed instance group is handling failed instance creation. - INSTANCE_FAILURE The managed instance group is handling instance failure, according to the Instance Lifecycle Policy. - FAILED_HEALTH_CHECK The managed instance group is handling failed health check, according to the Instance Lifecycle Policy. - TERMINATION_TIMESTAMP Instance reached termination time, thus managed instance group stops/deletes it. - GRACEFUL_SHUTDOWN_TIMESTAMP Instance reached graceful shutdown time, thus managed instance group stops/deletes it to gracefully shut it down. Values: `API`, `AUTOSCALING`, `FAILED_CREATION`, `FAILED_HEALTH_CHECK`, `INSTANCE_FAILURE`, `MAINTENANCE`, `NONE`, `PROACTIVE_UPDATE`, `REDISTRIBUTION`, `STANDBY_REFILL`, `TERMINATION_TIMESTAMP`. |

### `ManagedInstanceInstanceFlexibilityOverride`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `disks` | array<AttachedDisk> | List of disks to be attached to the instance. |
| `machineType` | string | The machine type to be used for this instance. |
| `minCpuPlatform` | string | Name of the minimum CPU platform to be used by this instance. e.g. 'Intel Ice Lake'. |
| `provisioningModel` | string enum | The provisioning model to be used for this instance. Values: `FLEX_START`, `RESERVATION_BOUND`, `SPOT`, `STANDARD`. |

### `ManagedInstanceInstanceHealth`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detailedHealthState` | string enum | Output only. \[Output Only\] The current detailed instance health state. Values: `DRAINING`, `HEALTHY`, `TIMEOUT`, `UNHEALTHY`, `UNKNOWN`. |
| `healthCheck` | string | Output only. \[Output Only\] The URL for the health check that verifies whether the instance is healthy. |

### `ManagedInstanceInstanceHealth` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `detailedHealthState` | string enum | Output only. \[Output Only\] The current detailed instance health state. Values: `DRAINING`, `HEALTHY`, `TIMEOUT`, `UNHEALTHY`, `UNKNOWN`. |
| `healthCheck` | string | Output only. \[Output Only\] The URL for the health check that verifies whether the instance is healthy. |
| `healthState` | string enum | Output only. \[Output Only\] The current instance health state. This field will not get promoted to beta/GA and might be removed from alpha APIs after 01/12/2019. Please use detailed_health_state field instead. Values: `HEALTHY`, `UNHEALTHY`. |

### `ManagedInstanceLastAttempt`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errors` | object | Output only. \[Output Only\] Encountered errors during the last attempt to create or delete the instance. |

### `ManagedInstanceLastAttempt` (preview)

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `errors` | object | Output only. \[Output Only\] Encountered errors during the last attempt to create or delete the instance. |
| `timestamp` | string (google-datetime) | Output only. Show timestamp only if there is an error. The field value should match corresponding timestamp in listErrors.RFC3339 text format. |

### `ManagedInstancePropertiesFromFlexibilityPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disks` | array<AttachedDisk> | List of disks to be attached to the instance. |
| `machineType` | string | Output only. The machine type to be used for this instance. |
| `minCpuPlatform` | string | Name of the minimum CPU platform to be used by this instance. e.g. 'Intel Ice Lake'. |

### `ManagedInstancePropertiesFromFlexibilityPolicy` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `disks` | array<AttachedDisk> | List of disks to be attached to the instance. |
| `machineType` | string | Output only. The machine type to be used for this instance. |
| `minCpuPlatform` | string | Name of the minimum CPU platform to be used by this instance. e.g. 'Intel Ice Lake'. |
| `provisioningModel` | string enum | Output only. The provisioning model to be used for this instance. Values: `FLEX_START`, `RESERVATION_BOUND`, `SPOT`, `STANDARD`. |

### `ManagedInstanceScheduling`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gracefulShutdownTimestamp` | string (google-datetime) | Output only. The timestamp at which the underlying instance will be triggered for graceful shutdown if it is configured. This is in RFC3339 text format. |
| `terminationTimestamp` | string (google-datetime) | Output only. The timestamp at which the managed instance will be terminated. This is in RFC3339 text format. |

### `ManagedInstanceShutdownDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxDuration` | Duration | Output only. The duration for graceful shutdown. Only applicable when the instance is in `PENDING_STOP` state. |
| `requestTimestamp` | string (google-datetime) | Output only. Past timestamp indicating the beginning of `PENDING_STOP` state of instance in RFC3339 text format. |

### `ManagedInstanceVersion`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceTemplate` | string | Output only. \[Output Only\] The intended template of the instance. This field is empty when current_action is one of { DELETING, ABANDONING }. |
| `name` | string | Output only. \[Output Only\] Name of the version. |

### `ManagedRuleset`

- Represents a ManagedRuleset resource. Managed internally by Cloud Armor CLH for Managed Rules features. Customers can only view these resources to modify their Security Policies. For more information, see https://cloud.google.com/armor/docs/.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changeLog` | string | Output only. \[Output Only\] The change log for this managed ruleset. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp in RFC3339 text format. |
| `description` | string | \[Output Only\] An optional description of this resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `name` | string | Name of the resource. Generated internally when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `ruleIds` | array<string> | Output only. \[Output Only\] The list of managed rule IDs that are included in this managed ruleset. |
| `rulesetId` | string | Output only. \[Output Only\] The managed ruleset identifier that can be configured in Security Policy rules. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |

### `ManagedRulesetList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | — |
| `items` | array<ManagedRuleset> | The list of managed rulesets. |
| `nextPageToken` | string | — |
| `warning` | object | — |

### `ManagementInterface`

- Represents a managed interface for an accelerator domain. It defines the network endpoint and authentication configuration needed to access specific management services like NMX-C or gNMI.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `authenticationConfig` | AuthenticationConfig | — |
| `ipv4Address` | string | The IPv4 internal IP address assigned to this management interface endpoint. This address will be used by the customer to route traffic to the management interface. |
| `ipv6Address` | string | The IPv6 internal IP address assigned to this management interface endpoint. This address will be used by the customer to route traffic to the management interface if IPv6 is supported and configured. |
| `network` | string | The URL of the VPC network to which the management interface endpoint is attached. The customer must ensure that this network is correctly configured for routing to the accelerator domain. |
| `state` | string enum | — Values: `ACTIVE`, `INACTIVE`, `PENDING`, `STATE_UNSPECIFIED`. |
| `subnetwork` | string | The URL of the subnetwork from which to assign the IP address for the endpoint. The subnetwork must belong to the specified network and have available IP addresses. |
| `type` | string enum | Required. The type of management service this interface provides. Supported types include NMX-C for partition management and gNMI for switch monitoring. Values: `TYPE_NVLINK_PARTITION_MANAGEMENT`, `TYPE_NVLINK_SWITCH_DEBUG`, `TYPE_NVLINK_SWITCH_MONITORING`, `TYPE_UNSPECIFIED`. |

### `Metadata`

- A metadata key/value entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fingerprint` | string (byte) | Specifies a fingerprint for this request, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the resource. |
| `items` | array<object> | Array of key/value pairs. The total size of all keys and values must be less than 512 KB. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#metadata for metadata. |

### `MetadataCredentialsFromPlugin`

- \[Deprecated\] Custom authenticator credentials. Custom authenticator credentials.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `name` | string | Plugin name. |
| `structConfig` | string | A text proto that conforms to a Struct type definition interpreted by the plugin. |

### `MetadataFilter`

- Opaque filter criteria used by load balancers to restrict routing configuration to a limited set of load balancing proxies. Proxies and sidecars involved in load balancing would typically present metadata to the load balancers that need to match criteria specified here. If a match takes place, the relevant configuration is made available to those proxies. For each metadataFilter in this list, if itsfilterMatchCriteria is set to MATCH_ANY, at least one of thefilterLabels must match the corresponding label provided in the metadata. If its filterMatchCriteria is set to MATCH_ALL, then all of its filterLabels must match with corresponding labels provided in the metadata. An example for using metadataFilters would be: if load balancing involves Envoys, they receive routing configuration when values inmetadataFilters match values supplied in of their XDS requests to loadbalancers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filterLabels` | array<MetadataFilterLabelMatch> | The list of label value pairs that must match labels in the provided metadata based on filterMatchCriteria This list must not be empty and can have at the most 64 entries. |
| `filterMatchCriteria` | string enum | Specifies how individual filter label matches within the list of filterLabels and contributes toward the overall metadataFilter match. Supported values are: - MATCH_ANY: at least one of the filterLabels must have a matching label in the provided metadata. - MATCH_ALL: all filterLabels must have matching labels in the provided metadata. Values: `MATCH_ALL`, `MATCH_ANY`, `NOT_SET`. |

### `MetadataFilterLabelMatch`

- MetadataFilter label name value pairs that are expected to match corresponding labels presented as metadata to the load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of metadata label. The name can have a maximum length of 1024 characters and must be at least 1 character long. |
| `value` | string | The value of the label must match the specified value. value can have a maximum length of 1024 characters. |

### `Money`

- Represents an amount of money with its currency type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currencyCode` | string | The three-letter currency code defined in ISO 4217. |
| `nanos` | integer (int32) | Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. |
| `units` | string (int64) | The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. |

### `MultiMig`

- Multi-MIG represents a group of managed instance groups.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output only\] The creation timestamp of this multi-MIG in RFC3339 text format. |
| `description` | string | An optional description of this resource. |
| `id` | string (uint64) | Output only. \[Output only\] The unique identifier for this resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#multiMig for multi-MIGs. |
| `name` | string | The name of the multi-MIG. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `region` | string | Output only. \[Output only\] The URL of the region where the resource resides. You must specify this field as part of the HTTP request URL. You cannot set the region as a field in the request body. |
| `resourcePolicies` | MultiMigResourcePolicies | Resource policies for this multi-MIG. |
| `selfLink` | string | Output only. \[Output only\] Server-defined URL for the resource. |
| `status` | MultiMigStatus | — |

### `MultiMigMember`

- Represents a Multi-MIG member resource.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp of this multi-MIG member inRFC3339 text format. |
| `id` | string (uint64) | Output only. \[Output only\] The unique identifier for this resource type. The server generates this identifier. |
| `kind` | string | Output only. Type of the resource. Alwayscompute#multiMigMember for a list of multi-MIG members. |
| `name` | string | Output only. \[Output Only\] Server-defined name for the multi-MIG member. |
| `region` | string | Output only. \[Output Only\] The URL of the region where the multi-MIG resides. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `status` | MultiMigMemberStatus | Output only. \[Output Only\] The status of this multi-MIG member |

### `MultiMigMemberList`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier for the resource; defined by the server. |
| `items` | array<MultiMigMember> | A list of multi-MIG member resources. |
| `kind` | string | Output only. Type of the resource. Alwayscompute#multiMigMember for a list of multi-MIG members. |
| `nextPageToken` | string | This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output only\] Server-defined URL for this resource. |
| `warning` | object | Informational warning message. |

### `MultiMigMemberStatus`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `instanceGroupManager` | string | \[Output Only\] URL of member instance group manager |

### `MultiMigResourcePolicies`

- Resource policies message for a multi-MIG. Specifies the workload policy configuration of the multi-MIG.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `workloadPolicy` | string | The URL of the workload policy for this multi-MIG. It can be a full or partial URL. For example, the following are all valid URLs to a workload policy: - https://www.googleapis.com/compute/v1/projects/project/regions/region/resourcePolicies/resourcePolicy - projects/project/regions/region/resourcePolicies/resourcePolicy - regions/region/resourcePolicies/resourcePolicy |

### `MultiMigStatus`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `appliedAcceleratorTopologies` | array<MultiMigStatusAcceleratorTopology> | Output only. \[Output Only\] The accelerator topology applied to this multi-MIG. Currently only one accelerator topology is supported. |
| `membersCount` | integer (int32) | Output only. \[Output Only\] The number of instance group manager members in this multi-MIG. |

### `MultiMigStatus` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `appliedAcceleratorTopologies` | array<MultiMigStatusAcceleratorTopology> | Output only. \[Output Only\] The accelerator topology applied to this multi-MIG. Currently only one accelerator topology is supported. |
| `memberInstanceGroupManagers` | array<string> | — |
| `membersCount` | integer (int32) | Output only. \[Output Only\] The number of instance group manager members in this multi-MIG. |

### `MultiMigStatusAcceleratorTopology`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `acceleratorTopology` | string | Output only. \[Output Only\] Topology in the format of: "16x16", "4x4x4", etc. The value is the same as configured in the WorkloadPolicy. |
| `acceleratorTopologyState` | string enum | Output only. \[Output Only\] The state of the accelerator topology. Values: `ACTIVATING`, `ACTIVE`, `ACTIVE_DEGRADED`, `DEACTIVATING`, `FAILED`, `INCOMPLETE`. |
| `acceleratorTopologyStateLastCheck` | MultiMigStatusAcceleratorTopologyAcceleratorTopologyStateLastCheck | Output only. \[Output Only\] The result of the latest accelerator topology state check. |

### `MultiMigStatusAcceleratorTopologyAcceleratorTopologyStateLastCheck`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `error` | object | Output only. \[Output Only\] Encountered errors on the last state check. |
| `timestamp` | string (google-datetime) | Output only. \[Output Only\] Timestamp is shown only if there is an error. The field has // RFC3339 // text format. |

### `MultiMigsList`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier for the resource; defined by the server. |
| `items` | array<MultiMig> | A list of multi-MIGs in the specified project and region. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | This token allows you to get the next page of results formaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output only\] Server-defined URL for this resource. |
| `warning` | object | Informational warning message. |

### `MutualTls`

- \[Deprecated\] Configuration for the mutual Tls mode for peer authentication. Configuration for the mutual Tls mode for peer authentication.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | Specifies if the server TLS is configured to be strict or permissive. This field can be set to one of the following: STRICT: Client certificate must be presented, connection is in TLS. PERMISSIVE: Client certificate can be omitted, connection can be either plaintext or TLS. Values: `INVALID`, `PERMISSIVE`, `STRICT`. |

### `NamedPort`

- The named port. For example: <"http", 80>.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name for this named port. The name must be 1-63 characters long, and comply withRFC1035. |
| `port` | integer (int32) | The port number, which can be a value between 1 and 65535. |

### `NamedSet`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | An optional description of named set. |
| `elements` | array<Expr> | CEL expressions that are comparable to constructs of this set's type (see Policy Language). |
| `fingerprint` | string (byte) | A fingerprint for the Named Set being applied to this Router, which is essentially a hash of the Named Set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update the Named Set. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make a getNamedSet() request to retrieve a Named Set. |
| `name` | string | This set's name, which must be a resource ID segment and unique within all named sets owned by the Router. Name should conform to RFC1035. |
| `type` | string enum | This named set's type Values: `NAMED_SET_TYPE_COMMUNITY`, `NAMED_SET_TYPE_PREFIX`. |

### `NatIpInfo`

- Contains NAT IP information of a NAT config (i.e. usage status, mode).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `natIpInfoMappings` | array<NatIpInfoNatIpInfoMapping> | Output only. A list of all NAT IPs assigned to this NAT config. |
| `natName` | string | Output only. Name of the NAT config which the NAT IP belongs to. |

### `NatIpInfoNatIpInfoMapping`

- Contains information of a NAT IP.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | Output only. Specifies whether NAT IP is auto or manual. Values: `AUTO`, `MANUAL`. |
| `natIp` | string | Output only. NAT IP address. For example: 203.0.113.11. |
| `usage` | string enum | Output only. Specifies whether NAT IP is currently serving at least one endpoint or not. Values: `IN_USE`, `UNUSED`. |

### `NatIpInfoResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `result` | array<NatIpInfo> | \[Output Only\] A list of NAT IP information. |

### Shape of `InterconnectDiagnostics`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "arpCaches": "array<InterconnectDiagnosticsARPEntry>",
  "bundleAggregationType": "string enum",
  "bundleOperationalStatus": "string enum",
  "links": "array<InterconnectDiagnosticsLinkStatus>",
  "macAddress": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
