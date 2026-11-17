---
source: https://trafficdirector.googleapis.com/$discovery/rest?version=v3
---

# Traffic Director API message schemas (trafficdirector)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/trafficdirector/`.

### `Address`

- Addresses specify either a logical or physical address and port, which are used to tell Envoy where to bind/listen, connect to upstream and find management servers.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `envoyInternalAddress` | EnvoyInternalAddress | Specifies a user-space address handled by :ref:`internal listeners `. |
| `pipe` | Pipe | — |
| `socketAddress` | SocketAddress | — |

### `Address` (v2)

- Addresses specify either a logical or physical address and port, which are used to tell Envoy where to bind/listen, connect to upstream and find management servers.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `pipe` | Pipe | — |
| `socketAddress` | SocketAddress | — |

### `BuildVersion`

- BuildVersion combines SemVer version of extension with free-form build information (i.e. 'alpha', 'private-build') as a set of strings.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `metadata` | object | Free-form build information. Envoy defines several well known keys in the source/common/version/version.h file |
| `version` | SemanticVersion | SemVer version of extension. |

### `ClientConfig`

- All xds configs for a particular client.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clientScope` | string | For xDS clients, the scope in which the data is used. For example, gRPC indicates the data plane target or that the data is associated with gRPC server(s). |
| `genericXdsConfigs` | array<GenericXdsConfig> | Represents generic xDS config and the exact config structure depends on the type URL (like Cluster if it is CDS) |
| `node` | Node | Node for a particular client. |
| `xdsConfig` | array<PerXdsConfig> | This field is deprecated in favor of generic_xds_configs which is much simpler and uniform in structure. |

### `ClientConfig` (v2)

- All xds configs for a particular client.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `node` | Node | Node for a particular client. |
| `xdsConfig` | array<PerXdsConfig> | — |

### `ClientStatusRequest`

- Request for client status of clients identified by a list of NodeMatchers.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `excludeResourceContents` | boolean | If true, the server will not include the resource contents in the response (i.e., the generic_xds_configs.xds_config field will not be populated). \[#not-implemented-hide:\] |
| `node` | Node | The node making the csds request. |
| `nodeMatchers` | array<NodeMatcher> | Management server can use these match criteria to identify clients. The match follows OR semantics. |

### `ClientStatusRequest` (v2)

- Request for client status of clients identified by a list of NodeMatchers.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nodeMatchers` | array<NodeMatcher> | Management server can use these match criteria to identify clients. The match follows OR semantics. |

### `ClientStatusResponse`

-
- Version: v3

| Field | Type | Description |
|---|---|---|
| `config` | array<ClientConfig> | Client configs for the clients specified in the ClientStatusRequest. |

### `ClustersConfigDump`

- Envoy's cluster manager fills this message with all currently known clusters. Cluster configuration information can be used to recreate an Envoy configuration by populating all clusters as static clusters or by returning them in a CDS response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `dynamicActiveClusters` | array<DynamicCluster> | The dynamically loaded active clusters. These are clusters that are available to service data plane traffic. |
| `dynamicWarmingClusters` | array<DynamicCluster> | The dynamically loaded warming clusters. These are clusters that are currently undergoing warming in preparation to service data plane traffic. Note that if attempting to recreate an Envoy configuration from a configuration dump, the warming clusters should generally be discarded. |
| `staticClusters` | array<StaticCluster> | The statically loaded cluster configs. |
| `versionInfo` | string | This is the :ref:`version_info ` in the last processed CDS discovery response. If there are only static bootstrap clusters, this field will be "". |

### `ContextParams`

- Additional parameters that can be used to select resource variants. These include any global context parameters, per-resource type client feature capabilities and per-resource type functional attributes. All per-resource type attributes will be `xds.resource.` prefixed and some of these are documented below: `xds.resource.listening_address`: The value is "IP:port" (e.g. "10.1.1.3:8080") which is the listening address of a Listener. Used in a Listener resource query.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `params` | object | — |

### `DoubleMatcher`

- Specifies the way to match a double value.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `exact` | number (double) | If specified, the input double value must be equal to the value specified here. |
| `range` | DoubleRange | If specified, the input double value must be in the range specified here. Note: The range is using half-open interval semantics \[start, end). |

### `DoubleRange`

- Specifies the double start and end of the range using half-open interval semantics \[start, end).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `end` | number (double) | end of the range (exclusive) |
| `start` | number (double) | start of the range (inclusive) |

### `DynamicCluster`

- Describes a dynamically loaded cluster via the CDS API. \[#next-free-field: 6\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clientStatus` | string enum | The client status of this resource. \[#not-implemented-hide:\] Values: `UNKNOWN`, `REQUESTED`, `DOES_NOT_EXIST`, `ACKED`, `NACKED`, `RECEIVED_ERROR`, `TIMEOUT`. |
| `cluster` | object | The cluster config. |
| `errorState` | UpdateFailureState | Set if the last update failed, cleared after the next successful update. The ``error_state`` field contains the rejected version of this particular resource along with the reason and timestamp. For successfully updated or acknowledged resource, this field should be empty. \[#not-implemented-hide:\] |
| `lastUpdated` | string (google-datetime) | The timestamp when the Cluster was last updated. |
| `versionInfo` | string | This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the cluster was loaded. In the future, discrete per-cluster versions may be supported by the API. |

### `DynamicCluster` (v2)

- Describes a dynamically loaded cluster via the CDS API.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cluster` | object | The cluster config. |
| `lastUpdated` | string (google-datetime) | The timestamp when the Cluster was last updated. |
| `versionInfo` | string | This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the cluster was loaded. In the future, discrete per-cluster versions may be supported by the API. |

### `DynamicEndpointConfig`

- \[#next-free-field: 6\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clientStatus` | string enum | The client status of this resource. \[#not-implemented-hide:\] Values: `UNKNOWN`, `REQUESTED`, `DOES_NOT_EXIST`, `ACKED`, `NACKED`, `RECEIVED_ERROR`, `TIMEOUT`. |
| `endpointConfig` | object | The endpoint config. |
| `errorState` | UpdateFailureState | Set if the last update failed, cleared after the next successful update. The ``error_state`` field contains the rejected version of this particular resource along with the reason and timestamp. For successfully updated or acknowledged resource, this field should be empty. \[#not-implemented-hide:\] |
| `lastUpdated` | string (google-datetime) | \[#not-implemented-hide:\] The timestamp when the Endpoint was last updated. |
| `versionInfo` | string | \[#not-implemented-hide:\] This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the endpoint configuration was loaded. |

### `DynamicListener`

- Describes a dynamically loaded listener via the LDS API. \[#next-free-field: 7\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `activeState` | DynamicListenerState | The listener state for any active listener by this name. These are listeners that are available to service data plane traffic. |
| `clientStatus` | string enum | The client status of this resource. \[#not-implemented-hide:\] Values: `UNKNOWN`, `REQUESTED`, `DOES_NOT_EXIST`, `ACKED`, `NACKED`, `RECEIVED_ERROR`, `TIMEOUT`. |
| `drainingState` | DynamicListenerState | The listener state for any draining listener by this name. These are listeners that are currently undergoing draining in preparation to stop servicing data plane traffic. Note that if attempting to recreate an Envoy configuration from a configuration dump, the draining listeners should generally be discarded. |
| `errorState` | UpdateFailureState | Set if the last update failed, cleared after the next successful update. The ``error_state`` field contains the rejected version of this particular resource along with the reason and timestamp. For successfully updated or acknowledged resource, this field should be empty. |
| `name` | string | The name or unique id of this listener, pulled from the DynamicListenerState config. |
| `warmingState` | DynamicListenerState | The listener state for any warming listener by this name. These are listeners that are currently undergoing warming in preparation to service data plane traffic. Note that if attempting to recreate an Envoy configuration from a configuration dump, the warming listeners should generally be discarded. |

### `DynamicListener` (v2)

- Describes a dynamically loaded listener via the LDS API. \[#next-free-field: 6\]
- Version: v2

| Field | Type | Description |
|---|---|---|
| `activeState` | DynamicListenerState | The listener state for any active listener by this name. These are listeners that are available to service data plane traffic. |
| `drainingState` | DynamicListenerState | The listener state for any draining listener by this name. These are listeners that are currently undergoing draining in preparation to stop servicing data plane traffic. Note that if attempting to recreate an Envoy configuration from a configuration dump, the draining listeners should generally be discarded. |
| `errorState` | UpdateFailureState | Set if the last update failed, cleared after the next successful update. |
| `name` | string | The name or unique id of this listener, pulled from the DynamicListenerState config. |
| `warmingState` | DynamicListenerState | The listener state for any warming listener by this name. These are listeners that are currently undergoing warming in preparation to service data plane traffic. Note that if attempting to recreate an Envoy configuration from a configuration dump, the warming listeners should generally be discarded. |

### `DynamicListenerState`

-
- Version: v3

| Field | Type | Description |
|---|---|---|
| `lastUpdated` | string (google-datetime) | The timestamp when the Listener was last successfully updated. |
| `listener` | object | The listener config. |
| `versionInfo` | string | This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the listener was loaded. In the future, discrete per-listener versions may be supported by the API. |

### `DynamicRouteConfig`

- \[#next-free-field: 6\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clientStatus` | string enum | The client status of this resource. \[#not-implemented-hide:\] Values: `UNKNOWN`, `REQUESTED`, `DOES_NOT_EXIST`, `ACKED`, `NACKED`, `RECEIVED_ERROR`, `TIMEOUT`. |
| `errorState` | UpdateFailureState | Set if the last update failed, cleared after the next successful update. The ``error_state`` field contains the rejected version of this particular resource along with the reason and timestamp. For successfully updated or acknowledged resource, this field should be empty. \[#not-implemented-hide:\] |
| `lastUpdated` | string (google-datetime) | The timestamp when the Route was last updated. |
| `routeConfig` | object | The route config. |
| `versionInfo` | string | This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the route configuration was loaded. |

### `DynamicRouteConfig` (v2)

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `lastUpdated` | string (google-datetime) | The timestamp when the Route was last updated. |
| `routeConfig` | object | The route config. |
| `versionInfo` | string | This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the route configuration was loaded. |

### `DynamicScopedRouteConfigs`

- \[#next-free-field: 7\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clientStatus` | string enum | The client status of this resource. \[#not-implemented-hide:\] Values: `UNKNOWN`, `REQUESTED`, `DOES_NOT_EXIST`, `ACKED`, `NACKED`, `RECEIVED_ERROR`, `TIMEOUT`. |
| `errorState` | UpdateFailureState | Set if the last update failed, cleared after the next successful update. The ``error_state`` field contains the rejected version of this particular resource along with the reason and timestamp. For successfully updated or acknowledged resource, this field should be empty. \[#not-implemented-hide:\] |
| `lastUpdated` | string (google-datetime) | The timestamp when the scoped route config set was last updated. |
| `name` | string | The name assigned to the scoped route configurations. |
| `scopedRouteConfigs` | array<object> | The scoped route configurations. |
| `versionInfo` | string | This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the scoped routes configuration was loaded. |

### `DynamicScopedRouteConfigs` (v2)

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `lastUpdated` | string (google-datetime) | The timestamp when the scoped route config set was last updated. |
| `name` | string | The name assigned to the scoped route configurations. |
| `scopedRouteConfigs` | array<object> | The scoped route configurations. |
| `versionInfo` | string | This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the scoped routes configuration was loaded. |

### `EndpointsConfigDump`

- Envoy's admin fill this message with all currently known endpoints. Endpoint configuration information can be used to recreate an Envoy configuration by populating all endpoints as static endpoints or by returning them in an EDS response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `dynamicEndpointConfigs` | array<DynamicEndpointConfig> | The dynamically loaded endpoint configs. |
| `staticEndpointConfigs` | array<StaticEndpointConfig> | The statically loaded endpoint configs. |

### `EnvoyInternalAddress`

- The address represents an envoy internal listener. \[#comment:
- Version: v3

| Field | Type | Description |
|---|---|---|
| `endpointId` | string | Specifies an endpoint identifier to distinguish between multiple endpoints for the same internal listener in a single upstream pool. Only used in the upstream addresses for tracking changes to individual endpoints. This, for example, may be set to the final destination IP for the target internal listener. |
| `serverListenerName` | string | Specifies the :ref:`name ` of the internal listener. |

### `Extension`

- Version and identification for an Envoy extension. \[#next-free-field: 7\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `category` | string | Category of the extension. Extension category names use reverse DNS notation. For instance "envoy.filters.listener" for Envoy's built-in listener filters or "com.acme.filters.http" for HTTP filters from acme.com vendor. \[#comment: |
| `disabled` | boolean | Indicates that the extension is present but was disabled via dynamic configuration. |
| `name` | string | This is the name of the Envoy filter as specified in the Envoy configuration, e.g. envoy.filters.http.router, com.acme.widget. |
| `typeDescriptor` | string | \[#not-implemented-hide:\] Type descriptor of extension configuration proto. \[#comment: |
| `typeUrls` | array<string> | Type URLs of extension configuration protos. |
| `version` | BuildVersion | The version is a property of the extension and maintained independently of other extensions and the Envoy API. This field is not set when extension did not provide version information. |

### `Extension` (v2)

- Version and identification for an Envoy extension. \[#next-free-field: 6\]
- Version: v2

| Field | Type | Description |
|---|---|---|
| `category` | string | Category of the extension. Extension category names use reverse DNS notation. For instance "envoy.filters.listener" for Envoy's built-in listener filters or "com.acme.filters.http" for HTTP filters from acme.com vendor. \[#comment: |
| `disabled` | boolean | Indicates that the extension is present but was disabled via dynamic configuration. |
| `name` | string | This is the name of the Envoy filter as specified in the Envoy configuration, e.g. envoy.filters.http.router, com.acme.widget. |
| `typeDescriptor` | string | \[#not-implemented-hide:\] Type descriptor of extension configuration proto. \[#comment: |
| `version` | BuildVersion | The version is a property of the extension and maintained independently of other extensions and the Envoy API. This field is not set when extension did not provide version information. |

### `GenericXdsConfig`

- GenericXdsConfig is used to specify the config status and the dump of any xDS resource identified by their type URL. It is the generalized version of the now deprecated ListenersConfigDump, ClustersConfigDump etc \[#next-free-field: 10\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clientStatus` | string enum | Per xDS resource status from the view of a xDS client Values: `UNKNOWN`, `REQUESTED`, `DOES_NOT_EXIST`, `ACKED`, `NACKED`, `RECEIVED_ERROR`, `TIMEOUT`. |
| `configStatus` | string enum | Per xDS resource config status. It is generated by management servers. It will not be present if the CSDS server is an xDS client. Values: `UNKNOWN`, `SYNCED`, `NOT_SENT`, `STALE`, `ERROR`. |
| `errorState` | UpdateFailureState | Set if the last update failed, cleared after the next successful update. The \*error_state\* field contains the rejected version of this particular resource along with the reason and timestamp. For successfully updated or acknowledged resource, this field should be empty. \[#not-implemented-hide:\] |
| `isStaticResource` | boolean | Is static resource is true if it is specified in the config supplied through the file at the startup. |
| `lastUpdated` | string (google-datetime) | Timestamp when the xDS resource was last updated |
| `name` | string | Name of the xDS resource |
| `typeUrl` | string | Type_url represents the fully qualified name of xDS resource type like envoy.v3.Cluster, envoy.v3.ClusterLoadAssignment etc. |
| `versionInfo` | string | This is the :ref:`version_info ` in the last processed xDS discovery response. If there are only static bootstrap listeners, this field will be "" |
| `xdsConfig` | object | The xDS resource config. Actual content depends on the type |

### `GoogleRE2`

- Google's `RE2 `_ regex engine. The regex string must adhere to the documented `syntax `\_. The engine is designed to complete execution in linear time as well as limit the amount of memory used. Envoy supports program size checking via runtime. The runtime keys ``re2.max_program_size.error_level`` and ``re2.max_program_size.warn_level`` can be set to integers as the maximum program size or complexity that a compiled regex can have before an exception is thrown or a warning is logged, respectively. ``re2.max_program_size.error_level`` defaults to 100, and ``re2.max_program_size.warn_level`` has no default if unset (will not check/log a warning). Envoy emits two stats for tracking the program size of regexes: the histogram ``re2.program_size``, which records the program size, and the counter ``re2.exceeded_warn_level``, which is incremented each time the program size exceeds the warn level threshold.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `maxProgramSize` | integer (uint32) | This field controls the RE2 "program size" which is a rough estimate of how complex a compiled regex is to evaluate. A regex that has a program size greater than the configured value will fail to compile. In this case, the configured max program size can be increased or the regex can be simplified. If not specified, the default is 100. This field is deprecated; regexp validation should be performed on the management server instead of being done by each individual client. .. note:: Although this field is deprecated, the program size will still be checked against the global ``re2.max_program_size.error_level`` runtime value. |

### `InlineScopedRouteConfigs`

-
- Version: v3

| Field | Type | Description |
|---|---|---|
| `lastUpdated` | string (google-datetime) | The timestamp when the scoped route config set was last updated. |
| `name` | string | The name assigned to the scoped route configurations. |
| `scopedRouteConfigs` | array<object> | The scoped route configurations. |

### `ListMatcher`

- Specifies the way to match a list value.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `oneOf` | ValueMatcher | If specified, at least one of the values in the list must match the value specified. |

### `ListenersConfigDump`

- Envoy's listener manager fills this message with all currently known listeners. Listener configuration information can be used to recreate an Envoy configuration by populating all listeners as static listeners or by returning them in a LDS response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `dynamicListeners` | array<DynamicListener> | State for any warming, active, or draining listeners. |
| `staticListeners` | array<StaticListener> | The statically loaded listener configs. |
| `versionInfo` | string | This is the :ref:`version_info ` in the last processed LDS discovery response. If there are only static bootstrap listeners, this field will be "". |

### `Locality`

- Identifies location of where either Envoy runs or where upstream hosts run.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `region` | string | Region this :ref:`zone ` belongs to. |
| `subZone` | string | When used for locality of upstream hosts, this field further splits zone into smaller chunks of sub-zones so they can be load balanced independently. |
| `zone` | string | Defines the local service zone where Envoy is running. Though optional, it should be set if discovery service routing is used and the discovery service exposes :ref:`zone data `, either in this message or via :option:`--service-zone`. The meaning of zone is context dependent, e.g. `Availability Zone (AZ) `_ on AWS, `Zone `_ on GCP, etc. |

### `Node`

- Identifies a specific Envoy instance. The node identifier is presented to the management server, which may use this identifier to distinguish per Envoy configuration for serving. \[#next-free-field: 13\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clientFeatures` | array<string> | Client feature support list. These are well known features described in the Envoy API repository for a given major version of an API. Client features use reverse DNS naming scheme, for example ``com.acme.feature``. See :ref:`the list of features ` that xDS client may support. |
| `cluster` | string | Defines the local service cluster name where Envoy is running. Though optional, it should be set if any of the following features are used: :ref:`statsd `, :ref:`health check cluster verification `, :ref:`runtime override directory `, :ref:`user agent addition `, :ref:`HTTP global rate limiting `, :ref:`CDS `, and :ref:`HTTP tracing `, either in this message or via :option:`--service-cluster`. |
| `dynamicParameters` | object | Map from xDS resource type URL to dynamic context parameters. These may vary at runtime (unlike other fields in this message). For example, the xDS client may have a shard identifier that changes during the lifetime of the xDS client. In Envoy, this would be achieved by updating the dynamic context on the Server::Instance's LocalInfo context provider. The shard ID dynamic parameter then appears in this field during future discovery requests. |
| `extensions` | array<Extension> | List of extensions and their versions supported by the node. |
| `id` | string | An opaque node identifier for the Envoy node. This also provides the local service node name. It should be set if any of the following features are used: :ref:`statsd `, :ref:`CDS `, and :ref:`HTTP tracing `, either in this message or via :option:`--service-node`. |
| `listeningAddresses` | array<Address> | Known listening ports on the node as a generic hint to the management server for filtering :ref:`listeners ` to be returned. For example, if there is a listener bound to port 80, the list can optionally contain the SocketAddress ``(0.0.0.0,80)``. The field is optional and just a hint. |
| `locality` | Locality | Locality specifying where the Envoy instance is running. |
| `metadata` | object | Opaque metadata extending the node identifier. Envoy will pass this directly to the management server. |
| `userAgentBuildVersion` | BuildVersion | Structured version of the entity requesting config. |
| `userAgentName` | string | Free-form string that identifies the entity requesting config. E.g. "envoy" or "grpc" |
| `userAgentVersion` | string | Free-form string that identifies the version of the entity requesting config. E.g. "1.12.2" or "abcd1234", or "SpecialEnvoyBuild" |

### `Node` (v2)

- Identifies a specific Envoy instance. The node identifier is presented to the management server, which may use this identifier to distinguish per Envoy configuration for serving. \[#next-free-field: 12\]
- Version: v2

| Field | Type | Description |
|---|---|---|
| `buildVersion` | string | This is motivated by informing a management server during canary which version of Envoy is being tested in a heterogeneous fleet. This will be set by Envoy in management server RPCs. This field is deprecated in favor of the user_agent_name and user_agent_version values. |
| `clientFeatures` | array<string> | Client feature support list. These are well known features described in the Envoy API repository for a given major version of an API. Client features use reverse DNS naming scheme, for example `com.acme.feature`. See :ref:`the list of features ` that xDS client may support. |
| `cluster` | string | Defines the local service cluster name where Envoy is running. Though optional, it should be set if any of the following features are used: :ref:`statsd `, :ref:`health check cluster verification `, :ref:`runtime override directory `, :ref:`user agent addition `, :ref:`HTTP global rate limiting `, :ref:`CDS `, and :ref:`HTTP tracing `, either in this message or via :option:`--service-cluster`. |
| `extensions` | array<Extension> | List of extensions and their versions supported by the node. |
| `id` | string | An opaque node identifier for the Envoy node. This also provides the local service node name. It should be set if any of the following features are used: :ref:`statsd `, :ref:`CDS `, and :ref:`HTTP tracing `, either in this message or via :option:`--service-node`. |
| `listeningAddresses` | array<Address> | Known listening ports on the node as a generic hint to the management server for filtering :ref:`listeners ` to be returned. For example, if there is a listener bound to port 80, the list can optionally contain the SocketAddress `(0.0.0.0,80)`. The field is optional and just a hint. |
| `locality` | Locality | Locality specifying where the Envoy instance is running. |
| `metadata` | object | Opaque metadata extending the node identifier. Envoy will pass this directly to the management server. |
| `userAgentBuildVersion` | BuildVersion | Structured version of the entity requesting config. |
| `userAgentName` | string | Free-form string that identifies the entity requesting config. E.g. "envoy" or "grpc" |
| `userAgentVersion` | string | Free-form string that identifies the version of the entity requesting config. E.g. "1.12.2" or "abcd1234", or "SpecialEnvoyBuild" |

### `NodeMatcher`

- Specifies the way to match a Node. The match follows AND semantics.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nodeId` | StringMatcher | Specifies match criteria on the node id. |
| `nodeMetadatas` | array<StructMatcher> | Specifies match criteria on the node metadata. |

### `NullMatch`

- NullMatch is an empty message to specify a null value.
- Version: v3

### `OrMatcher`

- Specifies a list of alternatives for the match.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `valueMatchers` | array<ValueMatcher> | — |

### `PathSegment`

- Specifies the segment in a path to retrieve value from Struct.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `key` | string | If specified, use the key to retrieve the value in a Struct. |

### `PerXdsConfig`

- Detailed config (per xDS) with status. \[#next-free-field: 8\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clientStatus` | string enum | Client config status is populated by xDS clients. Will not be present if the CSDS server is an xDS server. No matter what the client config status is, xDS clients should always dump the most recent accepted xDS config. .. attention:: This field is deprecated. Use :ref:`ClientResourceStatus ` for per-resource config status instead. Values: `CLIENT_UNKNOWN`, `CLIENT_REQUESTED`, `CLIENT_ACKED`, `CLIENT_NACKED`, `CLIENT_RECEIVED_ERROR`. |
| `clusterConfig` | ClustersConfigDump | — |
| `endpointConfig` | EndpointsConfigDump | — |
| `listenerConfig` | ListenersConfigDump | — |
| `routeConfig` | RoutesConfigDump | — |
| `scopedRouteConfig` | ScopedRoutesConfigDump | — |
| `status` | string enum | Config status generated by management servers. Will not be present if the CSDS server is an xDS client. Values: `UNKNOWN`, `SYNCED`, `NOT_SENT`, `STALE`, `ERROR`. |

### `PerXdsConfig` (v2)

- Detailed config (per xDS) with status. \[#next-free-field: 6\]
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clusterConfig` | ClustersConfigDump | — |
| `listenerConfig` | ListenersConfigDump | — |
| `routeConfig` | RoutesConfigDump | — |
| `scopedRouteConfig` | ScopedRoutesConfigDump | — |
| `status` | string enum | — Values: `UNKNOWN`, `SYNCED`, `NOT_SENT`, `STALE`, `ERROR`. |

### `Pipe`

-
- Version: v3

| Field | Type | Description |
|---|---|---|
| `mode` | integer (uint32) | The mode for the Pipe. Not applicable for abstract sockets. |
| `path` | string | Unix Domain Socket path. On Linux, paths starting with '@' will use the abstract namespace. The starting '@' is replaced by a null byte by Envoy. Paths starting with '@' will result in an error in environments other than Linux. |

### `RegexMatcher`

- A regex matcher designed for safety when used with untrusted input.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `googleRe2` | GoogleRE2 | Google's RE2 regex engine. |
| `regex` | string | The regex match string. The string must be supported by the configured engine. The regex is matched against the full string, not as a partial match. |

### `RoutesConfigDump`

- Envoy's RDS implementation fills this message with all currently loaded routes, as described by their RouteConfiguration objects. Static routes that are either defined in the bootstrap configuration or defined inline while configuring listeners are separated from those configured dynamically via RDS. Route configuration information can be used to recreate an Envoy configuration by populating all routes as static routes or by returning them in RDS responses.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `dynamicRouteConfigs` | array<DynamicRouteConfig> | The dynamically loaded route configs. |
| `staticRouteConfigs` | array<StaticRouteConfig> | The statically loaded route configs. |

### `ScopedRoutesConfigDump`

- Envoy's scoped RDS implementation fills this message with all currently loaded route configuration scopes (defined via ScopedRouteConfigurationsSet protos). This message lists both the scopes defined inline with the higher order object (i.e., the HttpConnectionManager) and the dynamically obtained scopes via the SRDS API.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `dynamicScopedRouteConfigs` | array<DynamicScopedRouteConfigs> | The dynamically loaded scoped route configs. |
| `inlineScopedRouteConfigs` | array<InlineScopedRouteConfigs> | The statically loaded scoped route configs. |

### `SemanticVersion`

- Envoy uses SemVer (https://semver.org/). Major/minor versions indicate expected behaviors and APIs, the patch version field is used only for security fixes and can be generally ignored.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `majorNumber` | integer (uint32) | — |
| `minorNumber` | integer (uint32) | — |
| `patch` | integer (uint32) | — |

### `SocketAddress`

- \[#next-free-field: 8\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `address` | string | The address for this socket. :ref:`Listeners ` will bind to the address. An empty address is not allowed. Specify ``0.0.0.0`` or ``::`` to bind to any address. \[#comment:TODO(zuercher) reinstate when implemented: It is possible to distinguish a Listener address via the prefix/suffix matching in :ref:`FilterChainMatch `.\] When used within an upstream :ref:`BindConfig `, the address controls the source address of outbound connections. For :ref:`clusters `, the cluster type determines whether the address must be an IP (``STATIC`` or ``EDS`` clusters) or a hostname resolved by DNS (``STRICT_DNS`` or ``LOGICAL_DNS`` clusters). Address resolution can be customized via :ref:`resolver_name `. |
| `ipv4Compat` | boolean | When binding to an IPv6 address above, this enables `IPv4 compatibility `\_. Binding to ``::`` will allow both IPv4 and IPv6 connections, with peer IPv4 addresses mapped into IPv6 space as ``::FFFF:``. |
| `namedPort` | string | This is only valid if :ref:`resolver_name ` is specified below and the named resolver is capable of named port resolution. |
| `networkNamespaceFilepath` | string | Filepath that specifies the Linux network namespace this socket will be created in (see ``man 7 network_namespaces``). If this field is set, Envoy will create the socket in the specified network namespace. .. note:: Setting this parameter requires Envoy to run with the ``CAP_SYS_ADMIN`` capability. .. attention:: Network namespaces are only configurable on Linux. Otherwise, this field has no effect. |
| `portValue` | integer (uint32) | — |
| `protocol` | string enum | — Values: `TCP`, `UDP`. |
| `resolverName` | string | The name of the custom resolver. This must have been registered with Envoy. If this is empty, a context dependent default applies. If the address is a concrete IP address, no resolution will occur. If address is a hostname this should be set for resolution other than DNS. Specifying a custom resolver with ``STRICT_DNS`` or ``LOGICAL_DNS`` will generate an error at runtime. |

### `SocketAddress` (v2)

- \[#next-free-field: 7\]
- Version: v2

| Field | Type | Description |
|---|---|---|
| `address` | string | The address for this socket. :ref:`Listeners ` will bind to the address. An empty address is not allowed. Specify ``0.0.0.0`` or ``::`` to bind to any address. \[#comment:TODO(zuercher) reinstate when implemented: It is possible to distinguish a Listener address via the prefix/suffix matching in :ref:`FilterChainMatch `.\] When used within an upstream :ref:`BindConfig `, the address controls the source address of outbound connections. For :ref:`clusters `, the cluster type determines whether the address must be an IP (\*STATIC\* or \*EDS\* clusters) or a hostname resolved by DNS (\*STRICT_DNS\* or \*LOGICAL_DNS\* clusters). Address resolution can be customized via :ref:`resolver_name `. |
| `ipv4Compat` | boolean | When binding to an IPv6 address above, this enables `IPv4 compatibility `\_. Binding to ``::`` will allow both IPv4 and IPv6 connections, with peer IPv4 addresses mapped into IPv6 space as ``::FFFF:``. |
| `namedPort` | string | This is only valid if :ref:`resolver_name ` is specified below and the named resolver is capable of named port resolution. |
| `portValue` | integer (uint32) | — |
| `protocol` | string enum | — Values: `TCP`, `UDP`. |
| `resolverName` | string | The name of the custom resolver. This must have been registered with Envoy. If this is empty, a context dependent default applies. If the address is a concrete IP address, no resolution will occur. If address is a hostname this should be set for resolution other than DNS. Specifying a custom resolver with \*STRICT_DNS\* or \*LOGICAL_DNS\* will generate an error at runtime. |

### `StaticCluster`

- Describes a statically loaded cluster.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `cluster` | object | The cluster config. |
| `lastUpdated` | string (google-datetime) | The timestamp when the Cluster was last updated. |

### `StaticEndpointConfig`

-
- Version: v3

| Field | Type | Description |
|---|---|---|
| `endpointConfig` | object | The endpoint config. |
| `lastUpdated` | string (google-datetime) | \[#not-implemented-hide:\] The timestamp when the Endpoint was last updated. |

### `StaticListener`

- Describes a statically loaded listener.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `lastUpdated` | string (google-datetime) | The timestamp when the Listener was last successfully updated. |
| `listener` | object | The listener config. |

### `StaticRouteConfig`

-
- Version: v3

| Field | Type | Description |
|---|---|---|
| `lastUpdated` | string (google-datetime) | The timestamp when the Route was last updated. |
| `routeConfig` | object | The route config. |

### `StringMatcher`

- Specifies the way to match a string. \[#next-free-field: 9\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `contains` | string | The input string must have the substring specified here. .. note:: Empty contains match is not allowed, please use ``safe_regex`` instead. Examples: \* ``abc`` matches the value ``xyz.abc.def`` |
| `custom` | TypedExtensionConfig | Use an extension as the matcher type. \[#extension-category: envoy.string_matcher\] |
| `exact` | string | The input string must match exactly the string specified here. Examples: \* ``abc`` only matches the value ``abc``. |
| `ignoreCase` | boolean | If ``true``, indicates the exact/prefix/suffix/contains matching should be case insensitive. This has no effect for the ``safe_regex`` match. For example, the matcher ``data`` will match both input string ``Data`` and ``data`` if this option is set to ``true``. |
| `prefix` | string | The input string must have the prefix specified here. .. note:: Empty prefix match is not allowed, please use ``safe_regex`` instead. Examples: \* ``abc`` matches the value ``abc.xyz`` |
| `safeRegex` | RegexMatcher | The input string must match the regular expression specified here. |
| `suffix` | string | The input string must have the suffix specified here. .. note:: Empty suffix match is not allowed, please use ``safe_regex`` instead. Examples: \* ``abc`` matches the value ``xyz.abc`` |

### `StringMatcher` (v2)

- Specifies the way to match a string. \[#next-free-field: 7\]
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exact` | string | The input string must match exactly the string specified here. Examples: \* \*abc\* only matches the value \*abc\*. |
| `ignoreCase` | boolean | If true, indicates the exact/prefix/suffix matching should be case insensitive. This has no effect for the safe_regex match. For example, the matcher \*data\* will match both input string \*Data\* and \*data\* if set to true. |
| `prefix` | string | The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: \* \*abc\* matches the value \*abc.xyz\* |
| `regex` | string | The input string must match the regular expression specified here. The regex grammar is defined `here `\_. Examples: \* The regex ``\d{3}`` matches the value \*123\* \* The regex ``\d{3}`` does not match the value \*1234\* \* The regex ``\d{3}`` does not match the value \*123.456\* .. attention:: This field has been deprecated in favor of `safe_regex` as it is not safe for use with untrusted input in all cases. |
| `safeRegex` | RegexMatcher | The input string must match the regular expression specified here. |
| `suffix` | string | The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: \* \*abc\* matches the value \*xyz.abc\* |

### `StructMatcher`

- StructMatcher provides a general interface to check if a given value is matched in google.protobuf.Struct. It uses ``path`` to retrieve the value from the struct and then check if it's matched to the specified value. For example, for the following Struct: .. code-block:: yaml fields: a: struct_value: fields: b: struct_value: fields: c: string_value: pro t: list_value: values: - string_value: m - string_value: n The following MetadataMatcher is matched as the path \[a, b, c\] will retrieve a string value "pro" from the Metadata which is matched to the specified prefix match. .. code-block:: yaml path: - key: a - key: b - key: c value: string_match: prefix: pr The following StructMatcher is matched as the code will match one of the string values in the list at the path \[a, t\]. .. code-block:: yaml path: - key: a - key: t value: list_match: one_of: string_match: exact: m An example use of StructMatcher is to match metadata in envoy.v\*.core.Node.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `path` | array<PathSegment> | The path to retrieve the Value from the Struct. |
| `value` | ValueMatcher | The StructMatcher is matched if the value retrieved by path is matched to this value. |

### `TypedExtensionConfig`

- Message type for extension configuration.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of an extension. This is not used to select the extension, instead it serves the role of an opaque identifier. |
| `typedConfig` | object | The typed config for the extension. The type URL will be used to identify the extension. In the case that the type URL is \*xds.type.v3.TypedStruct\* (or, for historical reasons, \*udpa.type.v1.TypedStruct\*), the inner type URL of \*TypedStruct\* will be utilized. See the :ref:`extension configuration overview ` for further details. |

### `UpdateFailureState`

-
- Version: v3

| Field | Type | Description |
|---|---|---|
| `details` | string | Details about the last failed update attempt. |
| `failedConfiguration` | object | What the component configuration would have been if the update had succeeded. This field may not be populated by xDS clients due to storage overhead. |
| `lastUpdateAttempt` | string (google-datetime) | Time of the latest failed update attempt. |
| `versionInfo` | string | This is the version of the rejected resource. \[#not-implemented-hide:\] |

### `UpdateFailureState` (v2)

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `details` | string | Details about the last failed update attempt. |
| `failedConfiguration` | object | What the component configuration would have been if the update had succeeded. |
| `lastUpdateAttempt` | string (google-datetime) | Time of the latest failed update attempt. |

### `ValueMatcher`

- Specifies the way to match a Protobuf::Value. Primitive values and ListValue are supported. StructValue is not supported and is always not matched. \[#next-free-field: 8\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `boolMatch` | boolean | If specified, a match occurs if and only if the target value is a bool value and is equal to this field. |
| `doubleMatch` | DoubleMatcher | If specified, a match occurs if and only if the target value is a double value and is matched to this field. |
| `listMatch` | ListMatcher | If specified, a match occurs if and only if the target value is a list value and is matched to this field. |
| `nullMatch` | NullMatch | If specified, a match occurs if and only if the target value is a NullValue. |
| `orMatch` | OrMatcher | If specified, a match occurs if and only if any of the alternatives in the match accept the value. |
| `presentMatch` | boolean | If specified, value match will be performed based on whether the path is referring to a valid primitive value in the metadata. If the path is referring to a non-primitive value, the result is always not matched. |
| `stringMatch` | StringMatcher | If specified, a match occurs if and only if the target value is a string value and is matched to this field. |

### `ValueMatcher` (v2)

- Specifies the way to match a Protobuf::Value. Primitive values and ListValue are supported. StructValue is not supported and is always not matched. \[#next-free-field: 7\]
- Version: v2

| Field | Type | Description |
|---|---|---|
| `boolMatch` | boolean | If specified, a match occurs if and only if the target value is a bool value and is equal to this field. |
| `doubleMatch` | DoubleMatcher | If specified, a match occurs if and only if the target value is a double value and is matched to this field. |
| `listMatch` | ListMatcher | If specified, a match occurs if and only if the target value is a list value and is matched to this field. |
| `nullMatch` | NullMatch | If specified, a match occurs if and only if the target value is a NullValue. |
| `presentMatch` | boolean | If specified, value match will be performed based on whether the path is referring to a valid primitive value in the metadata. If the path is referring to a non-primitive value, the result is always not matched. |
| `stringMatch` | StringMatcher | If specified, a match occurs if and only if the target value is a string value and is matched to this field. |

### Shape of `Address`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "envoyInternalAddress": "EnvoyInternalAddress",
  "pipe": "Pipe",
  "socketAddress": "SocketAddress"
}
```

## Notes

- Generated from the Discovery document(s) v3, v2 of `trafficdirector` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://trafficdirector.googleapis.com/$discovery/rest?version=v3, https://trafficdirector.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
