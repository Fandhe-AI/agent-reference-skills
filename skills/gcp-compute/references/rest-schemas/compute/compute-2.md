---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 2/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `BackendService` (preview)

- Represents a Backend Service resource. A backend service defines how Google Cloud load balancers distribute traffic. The backend service configuration contains a set of values, such as the protocol used to connect to backends, various distribution and session settings, health checks, and timeouts. These settings provide fine-grained control over how your load balancer behaves. Most of the settings have default values that allow for easy configuration if you need to get started quickly. Backend services in Google Compute Engine can be either regionally or globally scoped. \* Global (https://cloud.google.com/compute/docs/reference/rest/v1/backendServices) \* Regional (https://cloud.google.com/compute/docs/reference/rest/v1/regionBackendServices) For more information, seeBackend Services.
- Version: preview

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
| `loadBalancingScheme` | string enum | Specifies the load balancer type. A backend service created for one type of load balancer cannot be used with another. For more information, refer to Backend services product and scheme table. Values: `EXTERNAL`, `EXTERNAL_MANAGED`, `INTERNAL`, `INTERNAL_MANAGED`, `INTERNAL_SELF_MANAGED`, `INVALID_LOAD_BALANCING_SCHEME`. |
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
| `protocol` | string enum | The protocol this BackendService uses to communicate with backends. Possible values are HTTP, HTTPS, HTTP2, H2C, TCP, SSL, UDP, GRPC, or UNSPECIFIED, depending on the chosen load balancer or Traffic Director configuration. Refer to Load balancing features for more information. Must be set to GRPC when the backend service is referenced by a URL map that is bound to target gRPC proxy. Values: `GRPC`, `H2C`, `HTTP`, `HTTP2`, `HTTPS`, `SSL`, `TCP`, `UDP`, `UNSPECIFIED`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional backend service resides. This field is not applicable to global backend services. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `securityPolicy` | string | \[Output Only\] The resource URL for the security policy associated with this backend service. |
| `securitySettings` | SecuritySettings | This field specifies the security settings that apply to this backend service. This field is applicable to a global backend service with the load_balancing_scheme set to INTERNAL_SELF_MANAGED. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `serviceBindings` | array<string> | URLs of networkservices.ServiceBinding resources. Can only be set if load balancing scheme is INTERNAL_SELF_MANAGED. If set, lists of backends and health checks must be both empty. |
| `serviceClassId` | string | Optional. The service class ID associated with this resource. Producer Service's Service class ID for the region of this backend service. Can only be used with network_attachment. It is not possible to use on its own; however, network_attachment can be used without service_class_id. |
| `serviceLbPolicy` | string | URL to networkservices.ServiceLbPolicy resource. Can only be set if load balancing scheme is EXTERNAL_MANAGED, INTERNAL_MANAGED or INTERNAL_SELF_MANAGED for a global backend service, and EXTERNAL_MANAGED or INTERNAL_MANAGED for a regional backend service. For a global backend service, the service lb policy must be global. For a regional backend service, the service lb policy must be regional and in the same region. |
| `sessionAffinity` | string enum | Type of session affinity to use. The default is NONE. Only NONE and HEADER_FIELD are supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. For more details, see: Session Affinity (https://cloud.google.com/load-balancing/docs/backend-service#session_affinity). sessionAffinity cannot be specified with haPolicy. Values: `CLIENT_IP`, `CLIENT_IP_NO_DESTINATION`, `CLIENT_IP_PORT_PROTO`, `CLIENT_IP_PROTO`, `GENERATED_COOKIE`, `HEADER_FIELD`, `HTTP_COOKIE`, `NONE`, `STRONG_COOKIE_AFFINITY`. |
| `strongSessionAffinityCookie` | BackendServiceHttpCookie | Describes the HTTP cookie used for stateful session affinity. This field is applicable and required if the sessionAffinity is set toSTRONG_COOKIE_AFFINITY. |
| `subsetting` | Subsetting | subsetting cannot be specified with haPolicy. |
| `timeoutSec` | integer (int32) | The backend service timeout has a different meaning depending on the type of load balancer. For more information see, Backend service settings. The default is 30 seconds. The full range of timeout values allowed goes from 1 through 2,147,483,647 seconds. This value can be overridden in the PathMatcher configuration of the UrlMap that references this backend service. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. Instead, use maxStreamDuration. |
| `tlsSettings` | BackendServiceTlsSettings | Configuration for Backend Authenticated TLS and mTLS. May only be specified when the backend protocol is SSL, HTTPS or HTTP2. |
| `usedBy` | array<BackendServiceUsedBy> | Output only. \[Output Only\] List of resources referencing given backend service. |

### `BackendServiceAggregatedList`

- Contains a list of BackendServicesScopedList.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of BackendServicesScopedList resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `BackendServiceCdnPolicy`

- Message containing Cloud CDN configuration for a backend service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bypassCacheOnRequestHeaders` | array<BackendServiceCdnPolicyBypassCacheOnRequestHeader> | Bypass the cache when the specified request headers are matched - e.g. Pragma or Authorization headers. Up to 5 headers can be specified. The cache is bypassed for all cdnPolicy.cacheMode settings. |
| `cacheKeyPolicy` | CacheKeyPolicy | The CacheKeyPolicy for this CdnPolicy. |
| `cacheMode` | string enum | Specifies the cache setting for all responses from this backend. The possible values are: USE_ORIGIN_HEADERS Requires the origin to set valid caching headers to cache content. Responses without these headers will not be cached at Google's edge, and will require a full trip to the origin on every request, potentially impacting performance and increasing load on the origin server. FORCE_CACHE_ALL Cache all content, ignoring any "private", "no-store" or "no-cache" directives in Cache-Control response headers. Warning: this may result in Cloud CDN caching private, per-user (user identifiable) content. CACHE_ALL_STATIC Automatically cache static content, including common image formats, media (video and audio), and web assets (JavaScript and CSS). Requests and responses that are marked as uncacheable, as well as dynamic content (including HTML), will not be cached. If no value is provided for cdnPolicy.cacheMode, it defaults to CACHE_ALL_STATIC. Values: `CACHE_ALL_STATIC`, `FORCE_CACHE_ALL`, `INVALID_CACHE_MODE`, `USE_ORIGIN_HEADERS`. |
| `clientTtl` | integer (int32) | Specifies a separate client (e.g. browser client) maximum TTL. This is used to clamp the max-age (or Expires) value sent to the client. With FORCE_CACHE_ALL, the lesser of client_ttl and default_ttl is used for the response max-age directive, along with a "public" directive. For cacheable content in CACHE_ALL_STATIC mode, client_ttl clamps the max-age from the origin (if specified), or else sets the response max-age directive to the lesser of the client_ttl and default_ttl, and also ensures a "public" cache-control directive is present. If a client TTL is not specified, a default value (1 hour) will be used. The maximum allowed value is 31,622,400s (1 year). |
| `defaultTtl` | integer (int32) | Specifies the default TTL for cached content served by this origin for responses that do not have an existing valid TTL (max-age or s-maxage). Setting a TTL of "0" means "always revalidate". The value of defaultTTL cannot be set to a value greater than that of maxTTL, but can be equal. When the cacheMode is set to FORCE_CACHE_ALL, the defaultTTL will overwrite the TTL set in all responses. The maximum allowed value is 31,622,400s (1 year), noting that infrequently accessed objects may be evicted from the cache before the defined TTL. |
| `maxTtl` | integer (int32) | Specifies the maximum allowed TTL for cached content served by this origin. Cache directives that attempt to set a max-age or s-maxage higher than this, or an Expires header more than maxTTL seconds in the future will be capped at the value of maxTTL, as if it were the value of an s-maxage Cache-Control directive. Headers sent to the client will not be modified. Setting a TTL of "0" means "always revalidate". The maximum allowed value is 31,622,400s (1 year), noting that infrequently accessed objects may be evicted from the cache before the defined TTL. |
| `negativeCaching` | boolean | Negative caching allows per-status code TTLs to be set, in order to apply fine-grained caching for common errors or redirects. This can reduce the load on your origin and improve end-user experience by reducing response latency. When the cache mode is set to CACHE_ALL_STATIC or USE_ORIGIN_HEADERS, negative caching applies to responses with the specified response code that lack any Cache-Control, Expires, or Pragma: no-cache directives. When the cache mode is set to FORCE_CACHE_ALL, negative caching applies to all responses with the specified response code, and override any caching headers. By default, Cloud CDN will apply the following default TTLs to these status codes: HTTP 300 (Multiple Choice), 301, 308 (Permanent Redirects): 10m HTTP 404 (Not Found), 410 (Gone), 451 (Unavailable For Legal Reasons): 120s HTTP 405 (Method Not Found), 501 (Not Implemented): 60s. These defaults can be overridden in negative_caching_policy. |
| `negativeCachingPolicy` | array<BackendServiceCdnPolicyNegativeCachingPolicy> | Sets a cache TTL for the specified HTTP status code. negative_caching must be enabled to configure negative_caching_policy. Omitting the policy and leaving negative_caching enabled will use Cloud CDN's default cache TTLs. Note that when specifying an explicit negative_caching_policy, you should take care to specify a cache TTL for all response codes that you wish to cache. Cloud CDN will not apply any default negative caching when a policy exists. |
| `requestCoalescing` | boolean | If true then Cloud CDN will combine multiple concurrent cache fill requests into a small number of requests to the origin. |
| `serveWhileStale` | integer (int32) | Serve existing content from the cache (if available) when revalidating content with the origin, or when an error is encountered when refreshing the cache. This setting defines the default "max-stale" duration for any cached responses that do not specify a max-stale directive. Stale responses that exceed the TTL configured here will not be served. The default limit (max-stale) is 86400s (1 day), which will allow stale content to be served up to this limit beyond the max-age (or s-maxage) of a cached response. The maximum allowed value is 604800 (1 week). Set this to zero (0) to disable serve-while-stale. |
| `signedUrlCacheMaxAgeSec` | string (int64) | Maximum number of seconds the response to a signed URL request will be considered fresh. After this time period, the response will be revalidated before being served. Defaults to 1hr (3600s). When serving responses to signed URL requests, Cloud CDN will internally behave as though all responses from this backend had a "Cache-Control: public, max-age=\[TTL\]" header, regardless of any existing Cache-Control header. The actual headers served in responses will not be altered. |
| `signedUrlKeyNames` | array<string> | \[Output Only\] Names of the keys for signing request URLs. |

### `BackendServiceCdnPolicyBypassCacheOnRequestHeader`

- Bypass the cache when the specified request headers are present, e.g. Pragma or Authorization headers. Values are case insensitive. The presence of such a header overrides the cache_mode setting.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headerName` | string | The header field name to match on when bypassing cache. Values are case-insensitive. |

### `BackendServiceCdnPolicyNegativeCachingPolicy`

- Specify CDN TTLs for response error codes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The HTTP status code to define a TTL against. Only HTTP status codes 300, 301, 302, 307, 308, 404, 405, 410, 421, 451 and 501 can be specified as values, and you cannot specify a status code more than once. |
| `ttl` | integer (int32) | The TTL (in seconds) for which to cache responses with the corresponding status code. The maximum allowed value is 1800s (30 minutes), noting that infrequently accessed objects may be evicted from the cache before the defined TTL. |

### `BackendServiceConnectionTrackingPolicy`

- Connection Tracking configuration for this BackendService.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionPersistenceOnUnhealthyBackends` | string enum | Specifies connection persistence when backends are unhealthy. The default value is DEFAULT_FOR_PROTOCOL. If set to DEFAULT_FOR_PROTOCOL, the existing connections persist on unhealthy backends only for connection-oriented protocols (TCP and SCTP) and only if the Tracking Mode isPER_CONNECTION (default tracking mode) or the Session Affinity is configured for 5-tuple. They do not persist forUDP. If set to NEVER_PERSIST, after a backend becomes unhealthy, the existing connections on the unhealthy backend are never persisted on the unhealthy backend. They are always diverted to newly selected healthy backends (unless all backends are unhealthy). If set to ALWAYS_PERSIST, existing connections always persist on unhealthy backends regardless of protocol and session affinity. It is generally not recommended to use this mode overriding the default. For more details, see Connection Persistence for Network Load Balancing (https://cloud.google.com/load-balancing/docs/network/networklb-backend-service#connection-persistence) and Connection Persistence for Internal TCP/UDP Load Balancing (https://cloud.google.com/load-balancing/docs/internal#connection-persistence). Values: `ALWAYS_PERSIST`, `DEFAULT_FOR_PROTOCOL`, `NEVER_PERSIST`. |
| `enableStrongAffinity` | boolean | Enable Strong Session Affinity for external passthrough Network Load Balancers. This option is not available publicly. |
| `idleTimeoutSec` | integer (int32) | Specifies how long to keep a Connection Tracking entry while there is no matching traffic (in seconds). For internal passthrough Network Load Balancers: - The minimum (default) is 10 minutes and the maximum is 16 hours. - It can be set only if Connection Tracking is less than 5-tuple (i.e. Session Affinity is CLIENT_IP_NO_DESTINATION,CLIENT_IP or CLIENT_IP_PROTO, and Tracking Mode is PER_SESSION). For external passthrough Network Load Balancers the default is 60 seconds. This option is not available publicly. |
| `trackingMode` | string enum | Specifies the key used for connection tracking. There are two options: - PER_CONNECTION: This is the default mode. The Connection Tracking is performed as per the Connection Key (default Hash Method) for the specific protocol. - PER_SESSION: The Connection Tracking is performed as per the configured Session Affinity. It matches the configured Session Affinity. For more details, see Tracking Mode for Network Load Balancing (https://cloud.google.com/load-balancing/docs/network/networklb-backend-service#tracking-mode) and Tracking Mode for Internal TCP/UDP Load Balancing (https://cloud.google.com/load-balancing/docs/internal#tracking-mode). Values: `INVALID_TRACKING_MODE`, `PER_CONNECTION`, `PER_SESSION`. |

### `BackendServiceCustomMetric`

- Custom Metrics are used for WEIGHTED_ROUND_ROBIN locality_lb_policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dryRun` | boolean | If true, the metric data is not used for load balancing. |
| `name` | string | Name of a custom utilization signal. The name must be 1-64 characters long and match the regular expression `[a-z]([-_.a-z0-9]*[a-z0-9])?` which means that the first character must be a lowercase letter, and all following characters must be a dash, period, underscore, lowercase letter, or digit, except the last character, which cannot be a dash, period, or underscore. For usage guidelines, see Custom Metrics balancing mode. This field can only be used for a global or regional backend service with the loadBalancingScheme set to EXTERNAL_MANAGED,INTERNAL_MANAGED INTERNAL_SELF_MANAGED. |

### `BackendServiceDynamicForwarding`

- Defines a dynamic forwarding configuration for the backend service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `forwardProxy` | BackendServiceDynamicForwardingForwardProxy | Dynamic Forwarding Proxy configuration. |
| `ipPortSelection` | BackendServiceDynamicForwardingIpPortSelection | IP:PORT based dynamic forwarding configuration. |

### `BackendServiceDynamicForwardingForwardProxy`

- Defines Dynamic Forwarding Proxy configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | A boolean flag enabling dynamic forwarding proxy. |
| `proxyMode` | string enum | Determines the dynamic forwarding proxy mode. Values: `CLOUD_RUN`, `DIRECT_FORWARDING`. |

### `BackendServiceDynamicForwardingIpPortSelection`

- Defines a IP:PORT based dynamic forwarding configuration for the backend service. Some ranges are restricted: Restricted ranges.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | A boolean flag enabling IP:PORT based dynamic forwarding. |

### `BackendServiceFailoverPolicy`

- For load balancers that have configurable failover: Internal passthrough Network Load Balancers (https://cloud.google.com/load-balancing/docs/internal/failover-overview) and external passthrough Network Load Balancers (https://cloud.google.com/load-balancing/docs/network/networklb-failover-overview). On failover or failback, this field indicates whether connection draining will be honored. Google Cloud has a fixed connection draining timeout of 10 minutes. A setting of true terminates existing TCP connections to the active pool during failover and failback, immediately draining traffic. A setting of false allows existing TCP connections to persist, even on VMs no longer in the active pool, for up to the duration of the connection draining timeout (10 minutes).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disableConnectionDrainOnFailover` | boolean | This can be set to true if the protocol isTCP, UDP, or UNSPECIFIED. The default is false. |
| `dropTrafficIfUnhealthy` | boolean | If set to true, connections to the load balancer are dropped when all primary and all backup backend VMs are unhealthy.If set to false, connections are distributed among all primary VMs when all primary and all backup backend VMs are unhealthy. For load balancers that have configurable failover: Internal passthrough Network Load Balancers (https://cloud.google.com/load-balancing/docs/internal/failover-overview) and external passthrough Network Load Balancers (https://cloud.google.com/load-balancing/docs/network/networklb-failover-overview). The default is false. |
| `failoverRatio` | number (float) | The value of the field must be in the range\[0, 1\]. If the value is 0, the load balancer performs a failover when the number of healthy primary VMs equals zero. For all other values, the load balancer performs a failover when the total number of healthy primary VMs is less than this ratio. For load balancers that have configurable failover: Internal TCP/UDP Load Balancing (https://cloud.google.com/load-balancing/docs/internal/failover-overview) and external TCP/UDP Load Balancing (https://cloud.google.com/load-balancing/docs/network/networklb-failover-overview). |

### `BackendServiceGroupHealth`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Metadata defined as annotations on the network endpoint group. |
| `healthStatus` | array<HealthStatus> | Health state of the backend instances or endpoints in requested instance or network endpoint group, determined based on configured health checks. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#backendServiceGroupHealth for the health of backend services. |

### `BackendServiceHAPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fastIPMove` | string enum | Specifies whether fast IP move is enabled, and if so, the mechanism to achieve it. Supported values are: - DISABLED: Fast IP Move is disabled. You can only use the haPolicy.leader API to update the leader. - >GARP_RA: Provides a method to very quickly define a new network endpoint as the leader. This method is faster than updating the leader using the haPolicy.leader API. Fast IP move works as follows: The VM hosting the network endpoint that should become the new leader sends either a Gratuitous ARP (GARP) packet (IPv4) or an ICMPv6 Router Advertisement(RA) packet (IPv6). Google Cloud immediately but temporarily associates the forwarding rule IP address with that VM, and both new and in-flight packets are quickly delivered to that VM. Note the important properties of the Fast IP Move functionality: - The GARP/RA-initiated re-routing stays active for approximately 20 minutes. After triggering fast failover, you must also appropriately set the haPolicy.leader. - The new leader instance should continue to send GARP/RA packets periodically every 10 seconds until at least 10 minutes after updating the haPolicy.leader (but stop immediately if it is no longer the leader). - After triggering a fast failover, we recommend that you wait at least 3 seconds before sending another GARP/RA packet from a different VM instance to avoid race conditions. - Don't send GARP/RA packets from different VM instances at the same time. If multiple instances continue to send GARP/RA packets, traffic might be routed to different destinations in an alternating order. This condition ceases when a single instance issues a GARP/RA packet. - The GARP/RA request always takes priority over the leader API. Using the haPolicy.leader API to change the leader to a different instance will have no effect until the GARP/RA request becomes inactive. - The GARP/RA packets should follow the GARP/RA Packet Specifications.. - When multiple forwarding rules refer to a regional backend service, you need only send a GARP or RA packet for a single forwarding rule virtual IP. The virtual IPs for all forwarding rules targeting the same backend service will also be moved to the sender of the GARP or RA packet. The following are the Fast IP Move limitations (that is, when fastIPMove is not DISABLED): - Multiple forwarding rules cannot use the same IP address if one of them refers to a regional backend service with fastIPMove. - The regional backend service must set the network field, and all NEGs must belong to that network. However, individual NEGs can belong to different subnetworks of that network. - The maximum number of network endpoints across all backends of a backend service with fastIPMove is 32. - The maximum number of backend services with fastIPMove that can have the same network endpoint attached to one of its backends is 64. - The maximum number of backend services with fastIPMove in a VPC in a region is 64. - The network endpoints that are attached to a backend of a backend service with fastIPMove cannot resolve to Gen3+ machines for IPv6. - Traffic directed to the leader by a static route next hop will not be redirected to a new leader by fast failover. Such traffic will only be redirected once an haPolicy.leader update has taken effect. Only traffic to the forwarding rule's virtual IP will be redirected to a new leader by fast failover. haPolicy.fastIPMove can be set only at backend service creation time. Once set, it cannot be updated. By default, fastIpMove is set to DISABLED. Values: `DISABLED`, `GARP_RA`. |
| `leader` | BackendServiceHAPolicyLeader | Selects one of the network endpoints attached to the backend NEGs of this service as the active endpoint (the leader) that receives all traffic. When the leader changes, there is no connection draining to persist existing connections on the old leader. You are responsible for selecting a suitable endpoint as the leader. For example, preferring a healthy endpoint over unhealthy ones. Note that this service does not track backend endpoint health, and selects the configured leader unconditionally. |

### `BackendServiceHAPolicyLeader`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendGroup` | string | A fully-qualified URL (starting with https://www.googleapis.com/) of the zonal Network Endpoint Group (NEG) with `GCE_VM_IP` endpoints that the leader is attached to. The leader's backendGroup must already be specified as a backend of this backend service. Removing a backend that is designated as the leader's backendGroup is not permitted. |
| `networkEndpoint` | BackendServiceHAPolicyLeaderNetworkEndpoint | The network endpoint within the leader.backendGroup that is designated as the leader. This network endpoint cannot be detached from the NEG specified in the haPolicy.leader.backendGroup until the leader is updated with another network endpoint, or the leader is removed from the haPolicy. |

### `BackendServiceHAPolicyLeaderNetworkEndpoint`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instance` | string | The name of the VM instance of the leader network endpoint. The instance must already be attached to the NEG specified in the haPolicy.leader.backendGroup. The value must be a valid RFC1035 name (1-63 characters) or a valid instance URL. Authorization requires the following IAM permission on the specified resource instance: compute.instances.use |

### `BackendServiceHttpCookie`

- The HTTP cookie used for stateful session affinity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the cookie. |
| `path` | string | Path to set for the cookie. |
| `ttl` | Duration | Lifetime of the cookie. |

### `BackendServiceIAP`

- Identity-Aware Proxy
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the serving infrastructure will authenticate and authorize all incoming requests. |
| `oauth2ClientId` | string | OAuth2 client ID to use for the authentication flow. |
| `oauth2ClientSecret` | string | OAuth2 client secret to use for the authentication flow. For security reasons, this value cannot be retrieved via the API. Instead, the SHA-256 hash of the value is returned in the oauth2ClientSecretSha256 field. @InputOnly |
| `oauth2ClientSecretSha256` | string | Output only. \[Output Only\] SHA256 hash value for the field oauth2_client_secret above. |

### `BackendServiceIAP` (alpha)

- Identity-Aware Proxy
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the serving infrastructure will authenticate and authorize all incoming requests. |
| `oauth2ClientId` | string | OAuth2 client ID to use for the authentication flow. |
| `oauth2ClientInfo` | BackendServiceIAPOAuth2ClientInfo | \[Input Only\] OAuth client info required to generate client id to be used for IAP. |
| `oauth2ClientSecret` | string | OAuth2 client secret to use for the authentication flow. For security reasons, this value cannot be retrieved via the API. Instead, the SHA-256 hash of the value is returned in the oauth2ClientSecretSha256 field. @InputOnly |
| `oauth2ClientSecretSha256` | string | Output only. \[Output Only\] SHA256 hash value for the field oauth2_client_secret above. |

### `BackendServiceIAPOAuth2ClientInfo`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `applicationName` | string | Application name to be used in OAuth consent screen. |
| `clientName` | string | Name of the client to be generated. Optional - If not provided, the name will be autogenerated by the backend. |
| `developerEmailAddress` | string | Developer's information to be used in OAuth consent screen. |

### `BackendServiceList`

- Contains a list of BackendService resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<BackendService> | A list of BackendService resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#backendServiceList for lists of backend services. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `BackendServiceListUsable`

- Contains a list of usable BackendService resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<BackendService> | A list of BackendService resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#usableBackendServiceList for lists of usable backend services. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `BackendServiceLocalityLoadBalancingPolicyConfig`

- Container for either a built-in LB policy supported by gRPC or Envoy or a custom one implemented by the end user.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customPolicy` | BackendServiceLocalityLoadBalancingPolicyConfigCustomPolicy | — |
| `policy` | BackendServiceLocalityLoadBalancingPolicyConfigPolicy | — |

### `BackendServiceLocalityLoadBalancingPolicyConfigCustomPolicy`

- The configuration for a custom policy implemented by the user and deployed with the client.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | string | An optional, arbitrary JSON object with configuration data, understood by a locally installed custom policy implementation. |
| `name` | string | Identifies the custom policy. The value should match the name of a custom implementation registered on the gRPC clients. It should follow protocol buffer message naming conventions and include the full path (for example, myorg.CustomLbPolicy). The maximum length is 256 characters. Do not specify the same custom policy more than once for a backend. If you do, the configuration is rejected. For an example of how to use this field, seeUse a custom policy. |

### `BackendServiceLocalityLoadBalancingPolicyConfigPolicy`

- The configuration for a built-in load balancing policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string enum | The name of a locality load-balancing policy. Valid values include ROUND_ROBIN and, for Java clients, LEAST_REQUEST. For information about these values, see the description of localityLbPolicy. Do not specify the same policy more than once for a backend. If you do, the configuration is rejected. Values: `INVALID_LB_POLICY`, `LEAST_REQUEST`, `MAGLEV`, `ORIGINAL_DESTINATION`, `RANDOM`, `RING_HASH`, `ROUND_ROBIN`, `WEIGHTED_GCP_RENDEZVOUS`, `WEIGHTED_MAGLEV`, `WEIGHTED_ROUND_ROBIN`. |

### `BackendServiceLogConfig`

- The available logging options for the load balancer traffic served by this backend service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enable` | boolean | Denotes whether to enable logging for the load balancer traffic served by this backend service. The default value is false. |
| `loggingHttpRequestHeaders` | array<BackendServiceLogConfigLoggingHttpHeader> | The list of request headers that will be logged to Stackdriver. |
| `loggingHttpResponseHeaders` | array<BackendServiceLogConfigLoggingHttpHeader> | The list of response headers that will be logged to Stackdriver. |
| `optionalFields` | array<string> | This field can only be specified if logging is enabled for this backend service and "logConfig.optionalMode" was set to CUSTOM. Contains a list of optional fields you want to include in the logs. For example: serverInstance, serverGkeDetails.cluster, serverGkeDetails.pod.podNamespace |
| `optionalMode` | string enum | This field can only be specified if logging is enabled for this backend service. Configures whether all, none or a subset of optional fields should be added to the reported logs. One of \[INCLUDE_ALL_OPTIONAL, EXCLUDE_ALL_OPTIONAL, CUSTOM\]. Default is EXCLUDE_ALL_OPTIONAL. Values: `CUSTOM`, `EXCLUDE_ALL_OPTIONAL`, `INCLUDE_ALL_OPTIONAL`. |
| `sampleRate` | number (float) | This field can only be specified if logging is enabled for this backend service. The value of the field must be in \[0, 1\]. This configures the sampling rate of requests to the load balancer where 1.0 means all logged requests are reported and 0.0 means no logged requests are reported. The default value is 1.0. |

### `BackendServiceLogConfig` (alpha)

- The available logging options for the load balancer traffic served by this backend service.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `enable` | boolean | Denotes whether to enable logging for the load balancer traffic served by this backend service. The default value is false. |
| `loggingHttpRequestHeaders` | array<BackendServiceLogConfigLoggingHttpHeader> | The list of request headers that will be logged to Stackdriver. |
| `loggingHttpResponseHeaders` | array<BackendServiceLogConfigLoggingHttpHeader> | The list of response headers that will be logged to Stackdriver. |
| `optional` | string enum | Deprecated in favor of optionalMode. This field can only be specified if logging is enabled for this backend service. Configures whether all, none or a subset of optional fields should be added to the reported logs. One of \[INCLUDE_ALL_OPTIONAL, EXCLUDE_ALL_OPTIONAL, CUSTOM\]. Default is EXCLUDE_ALL_OPTIONAL. Values: `CUSTOM`, `EXCLUDE_ALL_OPTIONAL`, `INCLUDE_ALL_OPTIONAL`, `UNSPECIFIED_OPTIONAL_MODE`. |
| `optionalFields` | array<string> | This field can only be specified if logging is enabled for this backend service and "logConfig.optionalMode" was set to CUSTOM. Contains a list of optional fields you want to include in the logs. For example: serverInstance, serverGkeDetails.cluster, serverGkeDetails.pod.podNamespace |
| `optionalMode` | string enum | This field can only be specified if logging is enabled for this backend service. Configures whether all, none or a subset of optional fields should be added to the reported logs. One of \[INCLUDE_ALL_OPTIONAL, EXCLUDE_ALL_OPTIONAL, CUSTOM\]. Default is EXCLUDE_ALL_OPTIONAL. Values: `CUSTOM`, `EXCLUDE_ALL_OPTIONAL`, `INCLUDE_ALL_OPTIONAL`, `UNSPECIFIED_OPTIONAL_MODE`. |
| `sampleRate` | number (float) | This field can only be specified if logging is enabled for this backend service. The value of the field must be in \[0, 1\]. This configures the sampling rate of requests to the load balancer where 1.0 means all logged requests are reported and 0.0 means no logged requests are reported. The default value is 1.0. |

### `BackendServiceLogConfigLoggingHttpHeader`

- Determines which HTTP headers will be logged to Stackdriver.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headerName` | string | The name of the header to be logged. |

### `BackendServiceNetworkPassThroughLbTrafficPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `zonalAffinity` | BackendServiceNetworkPassThroughLbTrafficPolicyZonalAffinity | When configured, new connections are load balanced across healthy backend endpoints in the local zone. |

### `BackendServiceNetworkPassThroughLbTrafficPolicyZonalAffinity`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `spillover` | string enum | This field indicates whether zonal affinity is enabled or not. The possible values are: - ZONAL_AFFINITY_DISABLED: Default Value. Zonal Affinity is disabled. The load balancer distributes new connections to all healthy backend endpoints across all zones. - ZONAL_AFFINITY_STAY_WITHIN_ZONE: Zonal Affinity is enabled. The load balancer distributes new connections to all healthy backend endpoints in the local zone only. If there are no healthy backend endpoints in the local zone, the load balancer distributes new connections to all backend endpoints in the local zone. - ZONAL_AFFINITY_SPILL_CROSS_ZONE: Zonal Affinity is enabled. The load balancer distributes new connections to all healthy backend endpoints in the local zone only. If there aren't enough healthy backend endpoints in the local zone, the load balancer distributes new connections to all healthy backend endpoints across all zones. Values: `ZONAL_AFFINITY_DISABLED`, `ZONAL_AFFINITY_SPILL_CROSS_ZONE`, `ZONAL_AFFINITY_STAY_WITHIN_ZONE`. |
| `spilloverRatio` | number (float) | The value of the field must be in \[0, 1\]. When the ratio of the count of healthy backend endpoints in a zone to the count of backend endpoints in that same zone is equal to or above this threshold, the load balancer distributes new connections to all healthy endpoints in the local zone only. When the ratio of the count of healthy backend endpoints in a zone to the count of backend endpoints in that same zone is below this threshold, the load balancer distributes all new connections to all healthy endpoints across all zones. |

### `BackendServiceOrchestrationInfo`

- A message containing information about the resource or system that manages the backend service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceUri` | string | The resource URI of the resource or system that manages the backend service. |

### `BackendServiceParams`

- Additional Backend Service parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. |

### `BackendServiceReference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendService` | string | — |

### `BackendServiceTlsSettings`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authenticationConfig` | string | Reference to the BackendAuthenticationConfig resource from the networksecurity.googleapis.com namespace. Can be used in authenticating TLS connections to the backend, as specified by the authenticationMode field. Can only be specified if authenticationMode is not NONE. |
| `identity` | string | Assigns the Managed Identity for the BackendService Workload. Use this property to configure the load balancer back-end to use certificates and roots of trust provisioned by the Managed Workload Identity system. The `identity` property is the fully-specified SPIFFE ID to use in the SVID presented by the Load Balancer Workload. The SPIFFE ID must be a resource starting with the `trustDomain` property value, followed by the path to the Managed Workload Identity. Supported SPIFFE ID format: - //<trust_domain>/ns/<namespace>/sa/<subject> The Trust Domain within the Managed Identity must refer to a valid Workload Identity Pool. The TrustConfig and CertificateIssuanceConfig will be inherited from the Workload Identity Pool. Restrictions: - If you set the `identity` property, you cannot manually set the following fields: - tlsSettings.sni - tlsSettings.subjectAltNames - tlsSettings.authenticationConfig When defining a `identity` for a RegionBackendServices, the corresponding Workload Identity Pool must have a ca_pool configured in the same region. The system will set up a read-onlytlsSettings.authenticationConfig for the Managed Identity. |
| `sni` | string | Server Name Indication - see RFC3546 section 3.1. If set, the load balancer sends this string as the SNI hostname in the TLS connection to the backend, and requires that this string match a Subject Alternative Name (SAN) in the backend's server certificate. With a Regional Internet NEG backend, if the SNI is specified here, the load balancer uses it regardless of whether the Regional Internet NEG is specified with FQDN or IP address and port. When both sni and subjectAltNames\[\] are specified, the load balancer matches the backend certificate's SAN only to subjectAltNames\[\]. |
| `subjectAltNames` | array<BackendServiceTlsSettingsSubjectAltName> | A list of Subject Alternative Names (SANs) that the Load Balancer verifies during a TLS handshake with the backend. When the server presents its X.509 certificate to the Load Balancer, the Load Balancer inspects the certificate's SAN field, and requires that at least one SAN match one of the subjectAltNames in the list. This field is limited to 5 entries. When both sni and subjectAltNames\[\] are specified, the load balancer matches the backend certificate's SAN only to subjectAltNames\[\]. |

### `BackendServiceTlsSettingsSubjectAltName`

- A Subject Alternative Name that the load balancer matches against the SAN field in the TLS certificate provided by the backend, specified as either a DNS name or a URI, in accordance with RFC 5280 4.2.1.6
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsName` | string | The SAN specified as a DNS Name. |
| `uniformResourceIdentifier` | string | The SAN specified as a URI. |

### `BackendServiceUsedBy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reference` | string | Output only. \[Output Only\] Server-defined URL for resources referencing given BackendService like UrlMaps, TargetTcpProxies, TargetSslProxies and ForwardingRule. |

### `BackendServicesGetEffectiveSecurityPoliciesResponse`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `securityPolicies` | array<SecurityPolicy> | Effective security policies for the backend service. |

### `BackendServicesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendServices` | array<BackendService> | A list of BackendServices contained in this scope. |
| `warning` | object | Informational warning which replaces the list of backend services when the list is empty. |

### `BfdPacket`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authenticationPresent` | boolean | The Authentication Present bit of the BFD packet. This is specified in section 4.1 ofRFC5880 |
| `controlPlaneIndependent` | boolean | The Control Plane Independent bit of the BFD packet. This is specified in section 4.1 ofRFC5880 |
| `demand` | boolean | The demand bit of the BFD packet. This is specified in section 4.1 ofRFC5880 |
| `diagnostic` | string enum | The diagnostic code specifies the local system's reason for the last change in session state. This allows remote systems to determine the reason that the previous session failed, for example. These diagnostic codes are specified in section 4.1 ofRFC5880 Values: `ADMINISTRATIVELY_DOWN`, `CONCATENATED_PATH_DOWN`, `CONTROL_DETECTION_TIME_EXPIRED`, `DIAGNOSTIC_UNSPECIFIED`, `ECHO_FUNCTION_FAILED`, `FORWARDING_PLANE_RESET`, `NEIGHBOR_SIGNALED_SESSION_DOWN`, `NO_DIAGNOSTIC`, `PATH_DOWN`, `REVERSE_CONCATENATED_PATH_DOWN`. |
| `final` | boolean | The Final bit of the BFD packet. This is specified in section 4.1 ofRFC5880 |
| `length` | integer (uint32) | The length of the BFD Control packet in bytes. This is specified in section 4.1 ofRFC5880 |
| `minEchoRxIntervalMs` | integer (uint32) | The Required Min Echo RX Interval value in the BFD packet. This is specified in section 4.1 ofRFC5880 |
| `minRxIntervalMs` | integer (uint32) | The Required Min RX Interval value in the BFD packet. This is specified in section 4.1 ofRFC5880 |
| `minTxIntervalMs` | integer (uint32) | The Desired Min TX Interval value in the BFD packet. This is specified in section 4.1 ofRFC5880 |
| `multiplier` | integer (uint32) | The detection time multiplier of the BFD packet. This is specified in section 4.1 ofRFC5880 |
| `multipoint` | boolean | The multipoint bit of the BFD packet. This is specified in section 4.1 ofRFC5880 |
| `myDiscriminator` | integer (uint32) | The My Discriminator value in the BFD packet. This is specified in section 4.1 ofRFC5880 |
| `poll` | boolean | The Poll bit of the BFD packet. This is specified in section 4.1 ofRFC5880 |
| `state` | string enum | The current BFD session state as seen by the transmitting system. These states are specified in section 4.1 ofRFC5880 Values: `ADMIN_DOWN`, `DOWN`, `INIT`, `STATE_UNSPECIFIED`, `UP`. |
| `version` | integer (uint32) | The version number of the BFD protocol, as specified in section 4.1 ofRFC5880. |
| `yourDiscriminator` | integer (uint32) | The Your Discriminator value in the BFD packet. This is specified in section 4.1 ofRFC5880 |

### `BfdStatus`

- Next free: 15
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bfdSessionInitializationMode` | string enum | The BFD session initialization mode for this BGP peer. If set to ACTIVE, the Cloud Router will initiate the BFD session for this BGP peer. If set to PASSIVE, the Cloud Router will wait for the peer router to initiate the BFD session for this BGP peer. If set to DISABLED, BFD is disabled for this BGP peer. Values: `ACTIVE`, `DISABLED`, `PASSIVE`. |
| `configUpdateTimestampMicros` | string (int64) | Unix timestamp of the most recent config update. |
| `controlPacketCounts` | BfdStatusPacketCounts | Control packet counts for the current BFD session. |
| `controlPacketIntervals` | array<PacketIntervals> | Inter-packet time interval statistics for control packets. |
| `localDiagnostic` | string enum | The diagnostic code specifies the local system's reason for the last change in session state. This allows remote systems to determine the reason that the previous session failed, for example. These diagnostic codes are specified in section 4.1 ofRFC5880 Values: `ADMINISTRATIVELY_DOWN`, `CONCATENATED_PATH_DOWN`, `CONTROL_DETECTION_TIME_EXPIRED`, `DIAGNOSTIC_UNSPECIFIED`, `ECHO_FUNCTION_FAILED`, `FORWARDING_PLANE_RESET`, `NEIGHBOR_SIGNALED_SESSION_DOWN`, `NO_DIAGNOSTIC`, `PATH_DOWN`, `REVERSE_CONCATENATED_PATH_DOWN`. |
| `localState` | string enum | The current BFD session state as seen by the transmitting system. These states are specified in section 4.1 ofRFC5880 Values: `ADMIN_DOWN`, `DOWN`, `INIT`, `STATE_UNSPECIFIED`, `UP`. |
| `negotiatedLocalControlTxIntervalMs` | integer (uint32) | Negotiated transmit interval for control packets. |
| `rxPacket` | BfdPacket | The most recent Rx control packet for this BFD session. |
| `txPacket` | BfdPacket | The most recent Tx control packet for this BFD session. |
| `uptimeMs` | string (int64) | Session uptime in milliseconds. Value will be 0 if session is not up. |

### `BfdStatus` (alpha)

- Next free: 15
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `bfdSessionInitializationMode` | string enum | The BFD session initialization mode for this BGP peer. If set to ACTIVE, the Cloud Router will initiate the BFD session for this BGP peer. If set to PASSIVE, the Cloud Router will wait for the peer router to initiate the BFD session for this BGP peer. If set to DISABLED, BFD is disabled for this BGP peer. Values: `ACTIVE`, `DISABLED`, `PASSIVE`. |
| `configUpdateTimestampMicros` | string (int64) | Unix timestamp of the most recent config update. |
| `controlPacketCounts` | BfdStatusPacketCounts | Control packet counts for the current BFD session. |
| `controlPacketIntervals` | array<PacketIntervals> | Inter-packet time interval statistics for control packets. |
| `echoPacketCounts` | BfdStatusPacketCounts | Echo packet counts for the current BFD session. |
| `echoPacketIntervals` | array<PacketIntervals> | Inter-packet time interval statistics for echo packets. |
| `localDiagnostic` | string enum | The diagnostic code specifies the local system's reason for the last change in session state. This allows remote systems to determine the reason that the previous session failed, for example. These diagnostic codes are specified in section 4.1 ofRFC5880 Values: `ADMINISTRATIVELY_DOWN`, `CONCATENATED_PATH_DOWN`, `CONTROL_DETECTION_TIME_EXPIRED`, `DIAGNOSTIC_UNSPECIFIED`, `ECHO_FUNCTION_FAILED`, `FORWARDING_PLANE_RESET`, `NEIGHBOR_SIGNALED_SESSION_DOWN`, `NO_DIAGNOSTIC`, `PATH_DOWN`, `REVERSE_CONCATENATED_PATH_DOWN`. |
| `localState` | string enum | The current BFD session state as seen by the transmitting system. These states are specified in section 4.1 ofRFC5880 Values: `ADMIN_DOWN`, `DOWN`, `INIT`, `STATE_UNSPECIFIED`, `UP`. |
| `negotiatedLocalControlTxIntervalMs` | integer (uint32) | Negotiated transmit interval for control packets. |
| `negotiatedLocalEchoTxIntervalMs` | integer (uint32) | Negotiated transmit interval for echo packets. |
| `rxPacket` | BfdPacket | The most recent Rx control packet for this BFD session. |
| `txPacket` | BfdPacket | The most recent Tx control packet for this BFD session. |
| `uptimeMs` | string (int64) | Session uptime in milliseconds. Value will be 0 if session is not up. |
| `usingEchoMode` | boolean | Indicates if echo mode is currently being used. |

### `BfdStatusPacketCounts`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `numRx` | integer (uint32) | Number of packets received since the beginning of the current BFD session. |
| `numRxRejected` | integer (uint32) | Number of packets received that were rejected because of errors since the beginning of the current BFD session. |
| `numRxSuccessful` | integer (uint32) | Number of packets received that were successfully processed since the beginning of the current BFD session. |
| `numTx` | integer (uint32) | Number of packets transmitted since the beginning of the current BFD session. |

### `BgpRoute`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asPaths` | array<BgpRouteAsPath> | Output only. \[Output only\] AS-PATH for the route |
| `communities` | array<string> | Output only. \[Output only\] BGP communities in human-readable A:B format. |
| `destination` | BgpRouteNetworkLayerReachabilityInformation | Output only. \[Output only\] Destination IP range for the route, in human-readable CIDR format |
| `med` | integer (uint32) | Output only. \[Output only\] BGP multi-exit discriminator |
| `origin` | string enum | Output only. \[Output only\] BGP origin (EGP, IGP or INCOMPLETE) Values: `BGP_ORIGIN_EGP`, `BGP_ORIGIN_IGP`, `BGP_ORIGIN_INCOMPLETE`. |

### `BgpRouteAsPath`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asns` | array<integer> | Output only. \[Output only\] ASNs in the path segment. When type is SEQUENCE, these are ordered. |
| `asns32` | array<integer> | Output only. \[Output only\] ASNs in the path segment. This field is for better support of 32 bit ASNs as the other asns field suffers from overflow when the ASN is larger. When type is SEQUENCE, these are ordered. |
| `type` | string enum | Output only. \[Output only\] Type of AS-PATH segment (SEQUENCE or SET) Values: `AS_PATH_TYPE_SEQUENCE`, `AS_PATH_TYPE_SET`. |

### `BgpRouteNetworkLayerReachabilityInformation`

- Network Layer Reachability Information (NLRI) for a route.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pathId` | integer (uint32) | If the BGP session supports multiple paths (RFC 7911), the path identifier for this route. |
| `prefix` | string | Human readable CIDR notation for a prefix. E.g. 10.42.0.0/16. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `BulkInsertDiskResource`

- A transient resource used in compute.disks.bulkInsert and compute.regionDisks.bulkInsert. It is only used to process requests and is not persisted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instantSnapshotGroupParameters` | InstantSnapshotGroupParameters | The parameters for the instant snapshot group. |
| `snapshotGroupParameters` | SnapshotGroupParameters | The parameters for the snapshot group. The usage of snapshot group feature is restricted. |
| `sourceConsistencyGroupPolicy` | string | The URL of the DiskConsistencyGroupPolicy for the group of disks to clone. This may be a full or partial URL, such as: - https://www.googleapis.com/compute/v1/projects/project/regions/region/resourcePolicies/resourcePolicy - projects/project/regions/region/resourcePolicies/resourcePolicy - regions/region/resourcePolicies/resourcePolicy |

### `BulkInsertInstanceResource`

- A transient resource used in compute.instances.bulkInsert and compute.regionInstances.bulkInsert . This resource is not persisted anywhere, it is used only for processing the requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | The maximum number of instances to create. |
| `instanceFlexibilityPolicy` | InstanceFlexibilityPolicy | A specification of alternative machine types to use when creating instances. A single bulkInsert request can create instances with multiple different machine types based on capacity and quota availability. This field is supported only for regional bulkInsert requests. For more information, see About instance flexibility for VMs created in bulk. |
| `instanceProperties` | InstanceProperties | The instance properties defining the VM instances to be created. Required if sourceInstanceTemplate is not provided. |
| `locationPolicy` | LocationPolicy | Policy for choosing target zone. For more information, seeCreate VMs in bulk. |
| `minCount` | string (int64) | The minimum number of instances to create. If no min_count is specified then count is used as the default value. Ifmin_count instances cannot be created, then no instances will be created and instances already created will be deleted. |
| `namePattern` | string | The string pattern used for the names of the VMs. Either name_pattern or per_instance_properties must be set. The pattern must contain one continuous sequence of placeholder hash characters (#) with each character corresponding to one digit of the generated instance name. Example: a name_pattern of inst-#### generates instance names such asinst-0001 and inst-0002. If existing instances in the same project and zone have names that match the name pattern then the generated instance numbers start after the biggest existing number. For example, if there exists an instance with nameinst-0050, then instance names generated using the patterninst-#### begin with inst-0051. The name pattern placeholder #...# can contain up to 18 characters. |
| `perInstanceProperties` | object | Per-instance properties to be set on individual instances. Keys of this map specify requested instance names. Can be empty if name_pattern is used. |
| `sourceInstanceTemplate` | string | Specifies the instance template from which to create instances. You may combine sourceInstanceTemplate withinstanceProperties to override specific values from an existing instance template. Bulk API follows the semantics of JSON Merge Patch described by RFC 7396. It can be a full or partial URL. For example, the following are all valid URLs to an instance template: - https://www.googleapis.com/compute/v1/projects/project/global/instanceTemplates/instanceTemplate - projects/project/global/instanceTemplates/instanceTemplate - global/instanceTemplates/instanceTemplate This field is optional. |

### `BulkInsertInstanceResourcePerInstanceProperties`

- Per-instance properties to be set on individual instances. To be extended in the future.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hostname` | string | Specifies the hostname of the instance. More details in: https://cloud.google.com/compute/docs/instances/custom-hostname-vm#naming_convention |
| `name` | string | Output only. This field is only temporary. It will be removed. Do not use it. |

### `BulkInsertOperationStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createdVmCount` | integer (int32) | \[Output Only\] Count of VMs successfully created so far. |
| `deletedVmCount` | integer (int32) | \[Output Only\] Count of VMs that got deleted during rollback. |
| `failedToCreateVmCount` | integer (int32) | \[Output Only\] Count of VMs that started creating but encountered an error. |
| `status` | string enum | \[Output Only\] Creation status of BulkInsert operation - information if the flow is rolling forward or rolling back. Values: `CREATING`, `DONE`, `ROLLING_BACK`, `STATUS_UNSPECIFIED`. |
| `targetVmCount` | integer (int32) | \[Output Only\] Count of VMs originally planned to be created. |

### `BulkSetLabelsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labelFingerprint` | string (byte) | The fingerprint of the previous set of labels for this resource, used to detect conflicts. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You may optionally provide an up-to-date fingerprint hash in order to update or change labels. Make a get() request to the resource to get the latest fingerprint. |
| `labels` | object | The labels to set for this resource. |

### `BulkZoneSetLabelsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requests` | array<BulkSetLabelsRequest> | — |

### `BundledLocalSsds`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultInterface` | string | The default disk interface if the interface is not specified. |
| `partitionCount` | integer (int32) | The number of partitions. |

### `CacheInvalidationRule`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendService` | string | If set, this invalidation rule will only apply to requests routed to the given backend service or backend bucket. For example, for a backend bucket `bb1` in the same scope as the URL map, the path would be `projects/my-project/global/backendBuckets/bb1`; and for a backend service `bs1` in the same scope as the URL map, the path would be `projects/my-project/global/backendServices/bs1`. |
| `cacheTags` | array<string> | A list of cache tags used to identify cached objects. - Cache tags are specified when the response is first cached, by setting the `Cache-Tag` response header at the origin. - Multiple cache tags in the same invalidation request are treated as Boolean `OR` - for example, `tag1 OR tag2 OR tag3`. - If other fields are also specified, these are treated as Boolean `AND` with any tags. Up to 10 tags can be specified in a single invalidation request. |
| `contentType` | string | If set, this invalidation rule will only apply to responses with the given content-type. Parameters are not allowed and are ignored from the response when matching. Wildcards are not allowed. |
| `host` | string | If set, this invalidation rule will only apply to requests with a Host header matching host. This field also accepts wildcards (\*) to replace the leftmost (or first) label of a hostname. For example, \*.example.com will match www.example.com, but not sub1.dev.example.com. |
| `httpStatus` | integer (int32) | If set, this invalidation rule will only apply to responses with the given HTTP status. Valid range is 200-599. |
| `path` | string | — |

### `CacheInvalidationRule` (preview)

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `cacheTags` | array<string> | A list of cache tags used to identify cached objects. - Cache tags are specified when the response is first cached, by setting the `Cache-Tag` response header at the origin. - Multiple cache tags in the same invalidation request are treated as Boolean `OR` - for example, `tag1 OR tag2 OR tag3`. - If other fields are also specified, these are treated as Boolean `AND` with any tags. Up to 10 tags can be specified in a single invalidation request. |
| `host` | string | If set, this invalidation rule will only apply to requests with a Host header matching host. This field also accepts wildcards (\*) to replace the leftmost (or first) label of a hostname. For example, \*.example.com will match www.example.com, but not sub1.dev.example.com. |
| `path` | string | — |

### `CacheKeyPolicy`

- Message containing what to include in the cache key for a request for Cloud CDN.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `includeHost` | boolean | If true, requests to different hosts will be cached separately. |
| `includeHttpHeaders` | array<string> | Allows HTTP request headers (by name) to be used in the cache key. |
| `includeNamedCookies` | array<string> | Allows HTTP cookies (by name) to be used in the cache key. The name=value pair will be used in the cache key Cloud CDN generates. |
| `includeProtocol` | boolean | If true, http and https requests will be cached separately. |
| `includeQueryString` | boolean | If true, include query string parameters in the cache key according to query_string_whitelist and query_string_blacklist. If neither is set, the entire query string will be included. If false, the query string will be excluded from the cache key entirely. |
| `queryStringBlacklist` | array<string> | Names of query string parameters to exclude in cache keys. All other parameters will be included. Either specify query_string_whitelist or query_string_blacklist, not both. '&' and '=' will be percent encoded and not treated as delimiters. |
| `queryStringWhitelist` | array<string> | Names of query string parameters to include in cache keys. All other parameters will be excluded. Either specify query_string_whitelist or query_string_blacklist, not both. '&' and '=' will be percent encoded and not treated as delimiters. |

### `CachePolicy`

- Message containing CachePolicy configuration for URL Map's Route Action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cacheBypassRequestHeaderNames` | array<string> | Bypass the cache when the specified request headers are matched by name, e.g. Pragma or Authorization headers. Values are case-insensitive. Up to 5 header names can be specified. The cache is bypassed for all `cacheMode` values. |
| `cacheKeyPolicy` | CachePolicyCacheKeyPolicy | The cache key configuration. If not specified, the default behavior depends on the backend type: for Backend Services, the complete request URI is used; for Backend Buckets, the request URI is used without the protocol or host, and only query parameters known to Cloud Storage are included. |
| `cacheMode` | string enum | Specifies the cache setting for all responses from this route. If not specified, Cloud CDN uses `CACHE_ALL_STATIC` mode. Values: `BYPASS_CACHE`, `CACHE_ALL_STATIC`, `FORCE_CACHE_ALL`, `USE_ORIGIN_HEADERS`. |
| `clientTtl` | Duration | Specifies a separate client (e.g. browser client) maximum TTL for cached content. This is used to clamp the max-age (or Expires) value sent to the client. With `FORCE_CACHE_ALL`, the lesser of `clientTtl` and `defaultTtl` is used for the response max-age directive, along with a "public" directive. For cacheable content in `CACHE_ALL_STATIC` mode, `clientTtl` clamps the max-age from the origin (if specified), or else sets the response max-age directive to the lesser of the `clientTtl` and `defaultTtl`, and also ensures a "public" cache-control directive is present. The maximum allowed value is 31,622,400s (1 year). If not specified, Cloud CDN uses 3600s (1 hour) for `CACHE_ALL_STATIC` mode. Cannot exceed `maxTtl`. Cannot be specified when `cacheMode` is `USE_ORIGIN_HEADERS`. |
| `defaultTtl` | Duration | Specifies the default TTL for cached content for responses that do not have an existing valid TTL (max-age or s-maxage). Setting a TTL of "0" means "always revalidate". The value of `defaultTtl` cannot be set to a value greater than that of `maxTtl`. When the `cacheMode` is set to `FORCE_CACHE_ALL`, the `defaultTtl` will overwrite the TTL set in all responses. The maximum allowed value is 31,622,400s (1 year). Infrequently accessed objects may be evicted from the cache before the defined TTL. If not specified, Cloud CDN uses 3600s (1 hour) for `CACHE_ALL_STATIC` and `FORCE_CACHE_ALL` modes. Cannot be specified when `cacheMode` is `USE_ORIGIN_HEADERS`. |
| `maxTtl` | Duration | Specifies the maximum allowed TTL for cached content. Cache directives that attempt to set a max-age or s-maxage higher than this, or an Expires header more than `maxTtl` seconds in the future will be capped at the value of `maxTtl`, as if it were the value of an s-maxage Cache-Control directive. Headers sent to the client will not be modified. Setting a TTL of "0" means "always revalidate". The maximum allowed value is 31,622,400s (1 year). Infrequently accessed objects may be evicted from the cache before the defined TTL. If not specified, Cloud CDN uses 86400s (1 day) for `CACHE_ALL_STATIC` mode. Can be specified only for `CACHE_ALL_STATIC` cache mode. |
| `negativeCaching` | boolean | Negative caching allows per-status code TTLs to be set, in order to apply fine-grained caching for common errors or redirects. This can reduce the load on your origin and improve end-user experience by reducing response latency. When the `cacheMode` is set to `CACHE_ALL_STATIC` or `USE_ORIGIN_HEADERS`, negative caching applies to responses with the specified response code that lack any Cache-Control, Expires, or Pragma: no-cache directives. When the `cacheMode` is set to `FORCE_CACHE_ALL`, negative caching applies to all responses with the specified response code, and overrides any caching headers. By default, Cloud CDN applies the following TTLs to these HTTP status codes: \* 300 (Multiple Choice), 301, 308 (Permanent Redirects): 10m \* 404 (Not Found), 410 (Gone), 451 (Unavailable For Legal Reasons): 120s \* 405 (Method Not Found), 501 (Not Implemented): 60s These defaults can be overridden in `negativeCachingPolicy`. If not specified, Cloud CDN applies negative caching by default. |
| `negativeCachingPolicy` | array<CachePolicyNegativeCachingPolicy> | Sets a cache TTL for the specified HTTP status code. `negativeCaching` must be enabled to configure `negativeCachingPolicy`. Omitting the policy and leaving `negativeCaching` enabled will use Cloud CDN's default cache TTLs. Note that when specifying an explicit `negativeCachingPolicy`, you should take care to specify a cache TTL for all response codes that you wish to cache. Cloud CDN will not apply any default negative caching when a policy exists. |
| `requestCoalescing` | boolean | If true then Cloud CDN will combine multiple concurrent cache fill requests into a small number of requests to the origin. If not specified, Cloud CDN applies request coalescing by default. |
| `serveWhileStale` | Duration | Serve existing content from the cache (if available) when revalidating content with the origin, or when an error is encountered when refreshing the cache. This setting defines the default "max-stale" duration for any cached responses that do not specify a max-stale directive. Stale responses that exceed the TTL configured here will not be served. The default limit (max-stale) is 86400s (1 day), which will allow stale content to be served up to this limit beyond the max-age (or s-maxage) of a cached response. The maximum allowed value is 604800 (1 week). Set this to zero (0) to disable serve-while-stale. |

### `CachePolicyCacheKeyPolicy`

- Message containing what to include in the cache key for a request for Cache Policy defined on Route Action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludedQueryParameters` | array<string> | Names of query string parameters to exclude in cache keys. All other parameters will be included. Either specify `excludedQueryParameters` or `includedQueryParameters`, not both. '&' and '=' will be percent encoded and not treated as delimiters. Note: This field applies to routes that use backend services. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. For routes that point to a Backend Bucket, use `includedQueryParameters` to define which parameters should be part of the cache key. |
| `includeHost` | boolean | If true, requests to different hosts will be cached separately. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket, as the host is never included in a Backend Bucket's cache key. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. |
| `includeProtocol` | boolean | If true, http and https requests will be cached separately. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket, as the protocol is never included in a Backend Bucket's cache key. Attempting to set on a route that points exclusively to Backend Buckets will result in a configuration error. |
| `includeQueryString` | boolean | If true, include query string parameters in the cache key according to `includedQueryParameters` and `excludedQueryParameters`. If neither is set, the entire query string will be included. If false, the query string will be excluded from the cache key entirely. Note: This field applies to routes that use backend services. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. For routes that point to a Backend Bucket, use `includedQueryParameters` to define which parameters should be part of the cache key. |
| `includedCookieNames` | array<string> | Allows HTTP cookies (by name) to be used in the cache key. The name=value pair will be used in the cache key Cloud CDN generates. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. Up to 5 cookie names can be specified. |
| `includedHeaderNames` | array<string> | Allows HTTP request headers (by name) to be used in the cache key. |
| `includedQueryParameters` | array<string> | Names of query string parameters to include in cache keys. All other parameters will be excluded. Either specify `includedQueryParameters` or `excludedQueryParameters`, not both. '&' and '=' will be percent encoded and not treated as delimiters. |

### `CachePolicyNegativeCachingPolicy`

- Specify CDN TTLs for response error codes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The HTTP status code to define a TTL against. Only HTTP status codes 300, 301, 302, 307, 308, 404, 405, 410, 421, 451 and 501 can be specified as values, and you cannot specify a status code more than once. |
| `ttl` | Duration | The TTL (in seconds) for which to cache responses with the corresponding status code. The maximum allowed value is 1800s (30 minutes). Infrequently accessed objects may be evicted from the cache before the defined TTL. |

### `CalendarModeAdviceRequest`

- A request to recommend the best way to consume the specified resources in the future.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `futureResourcesSpecs` | object | Specification of resources to create in the future. The key of the map is an arbitrary string specified by the caller. Value of the map is a specification of required resources and their constraints. Currently only one value is allowed in this map. |

### `CalendarModeAdviceResponse`

- A response containing the recommended way of creating the specified resources in the future. It contains (will contain) multiple recommendations that can be analyzed by the customer and the best one can be picked.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `recommendations` | array<CalendarModeRecommendation> | Recommendations where, how and when to create the requested resources in order to maximize their obtainability and minimize cost. |

### `CalendarModeExtensionAdviceRequest`

- A request to recommend the maximum duration for extending an existing future reservation in calendar mode. The recommended duration is shorter than or equal to the specified extension duration.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `endTimeNotLaterThan` | string (google-datetime) | Required. The desired end time for the extension. |
| `futureReservation` | string | Required. Reference to the future reservation, in the format: projects/{project}/zones/{zone}/futureReservations/{name} Full URIs that include hostnames (like compute.googleapis.com or www.googleapis.com) are also supported. |

### `CalendarModeExtensionAdviceResponse`

- A response that contains the recommended duration for extending a future reservation in calendar mode based on available capacity during the extension period.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The recommended end time for the extension, which is either the end time requested by the caller or the longest alternative with sufficient capacity. If the extension is not possible, this field is empty, and notRecommendedReason is populated instead. |
| `notRecommendedReason` | CalendarModeExtensionAdviceResponseNotRecommendedReason | The reason why the future reservation can't be extended. If a recommendation is provided, whether for the requested end time or an alternative, this field is empty. |
| `recommendationId` | string | The unique ID of the recommendation, which is a UUID string generated by the API. |

### `CalendarModeExtensionAdviceResponseNotRecommendedReason`

- Information about why no recommendation was provided.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `details` | string | Human-readable details describing why the recommendation wasn't provided. For example, if the status is CONDITIONS_NOT_MET, this field explains why the requested extension duration isn't possible. |
| `status` | string enum | Status of recommendation. Values: `CONDITIONS_NOT_MET`, `NOT_RECOMMENDED_REASON_STATUS_UNSPECIFIED`, `NO_CAPACITY`. |

### `CalendarModeRecommendation`

- A single recommendation to create requested resources. Contains detailed recommendations for every future resources specification specified in CalendarModeAdviceRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `recommendationsPerSpec` | object | Recommendations for every future resource specification passed in CalendarModeAdviceRequest. Keys of the map correspond to keys specified in the request. |

### `CallCredentials`

- \[Deprecated\] gRPC call credentials to access the SDS server. gRPC call credentials to access the SDS server.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `callCredentialType` | string enum | The type of call credentials to use for GRPC requests to the SDS server. This field can be set to one of the following: - GCE_VM: The local GCE VM service account credentials are used to access the SDS server. - FROM_PLUGIN: Custom authenticator credentials are used to access the SDS server. Values: `FROM_PLUGIN`, `GCE_VM`, `INVALID`. |
| `fromPlugin` | MetadataCredentialsFromPlugin | Custom authenticator credentials. Valid if callCredentialType is FROM_PLUGIN. |

### `CapacityAdviceRequest`

- A request to provide Assistant Scores. These scores determine VM obtainability and preemption likelihood.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `distributionPolicy` | CapacityAdviceRequestDistributionPolicy | Policy specifying the distribution of instances across zones within the requested region. |
| `instanceFlexibilityPolicy` | CapacityAdviceRequestInstanceFlexibilityPolicy | Policy for instance selectors. |
| `instanceProperties` | CapacityAdviceRequestInstanceProperties | Instance properties for this request. |
| `size` | integer (int32) | The number of VM instances to request. |

### `CapacityAdviceRequest` (preview)

- A request to provide Assistant Scores. These scores determine VM obtainability and preemption likelihood.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `distributionPolicy` | CapacityAdviceRequestDistributionPolicy | Policy specifying the distribution of instances across zones within the requested region. |
| `instanceFlexibilityPolicy` | CapacityAdviceRequestInstanceFlexibilityPolicy | Policy for instance selectors. |
| `instanceProperties` | CapacityAdviceRequestInstanceProperties | Instance properties for this request. |
| `sessionId` | string | Optional. Input only. Client-provided UUID correlating multiple capacity advice requests belonging to a single logical client-side fanout session. |
| `size` | integer (int32) | The number of VM instances to request. |

### `CapacityAdviceRequestDistributionPolicy`

- Distribution policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetShape` | string enum | Target distribution shape. You can specify the following values:ANY, ANY_SINGLE_ZONE, or BALANCED. Values: `ANY`, `ANY_SINGLE_ZONE`, `BALANCED`, `TARGET_SHAPE_UNSPECIFIED`. |
| `zones` | array<CapacityAdviceRequestDistributionPolicyZoneConfiguration> | Zones where Capacity Advisor looks for capacity. |

### `CapacityAdviceRequestDistributionPolicyZoneConfiguration`

- Zone configuration for the distribution policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `zone` | string | The URL of the zone. It can be a partial or full URL. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone - projects/project/zones/zone - zones/zone |

### `CapacityAdviceRequestInstanceFlexibilityPolicy`

- Specification of alternative, flexible instance configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceSelections` | object | Named instance selections to configure properties. The key is an arbitrary, unique RFC1035 string that identifies the instance selection. |

### `CapacityAdviceRequestInstanceFlexibilityPolicyInstanceSelection`

- Machine specification.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disks` | array<CapacityAdviceRequestInstanceFlexibilityPolicyInstanceSelectionAttachedDisk> | Local SSDs. |
| `guestAccelerators` | array<AcceleratorConfig> | Accelerators configuration. |
| `machineTypes` | array<string> | Full machine-type names, e.g. "n1-standard-16". |
| `rank` | string (int64) | Optional. Rank when prioritizing the shape flexibilities. The instance selections are considered in the ascending order of the rank. If not set, defaults to 0. |

### `CapacityAdviceRequestInstanceFlexibilityPolicyInstanceSelection` (beta)

- Machine specification.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `disks` | array<CapacityAdviceRequestInstanceFlexibilityPolicyInstanceSelectionAttachedDisk> | Local SSDs. |
| `guestAccelerators` | array<AcceleratorConfig> | Accelerators configuration. |
| `machineTypes` | array<string> | Full machine-type names, e.g. "n1-standard-16". |

### `CapacityAdviceRequestInstanceFlexibilityPolicyInstanceSelectionAttachedDisk`

- Attached disk configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Specifies the type of the disk. Values: `DISK_TYPE_UNSPECIFIED`, `SCRATCH`. |

### `CapacityAdviceRequestInstanceProperties`

- Instance provisioning properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scheduling` | CapacityAdviceRequestInstancePropertiesScheduling | Specifies the scheduling options. |

### `CapacityAdviceRequestInstanceProperties` (alpha)

- Instance provisioning properties.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `acceleratorTopology` | string | Input only. Specifies the topology required to create a partition for VMs that have interconnected GPUs or TPUs. Example values: 2x2 for ct5l-hightpu-4t. |
| `scheduling` | CapacityAdviceRequestInstancePropertiesScheduling | Specifies the scheduling options. |

### `CapacityAdviceRequestInstancePropertiesScheduling`

- Defines the instance scheduling options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `provisioningModel` | string enum | Specifies the provisioning model. Values: `FLEX_START`, `RESERVATION_BOUND`, `SPOT`, `STANDARD`. |

### `CapacityAdviceRequestInstancePropertiesScheduling` (alpha)

- Defines the instance scheduling options.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `maxRunDuration` | string (google-duration) | The maximum time that instances can run before Compute Engine terminates them. |
| `provisioningModel` | string enum | Specifies the provisioning model. Values: `FLEX_START`, `RESERVATION_BOUND`, `SPOT`, `STANDARD`. |

### `CapacityAdviceResponse`

- A response contains scoring recommendations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `recommendations` | array<CapacityAdviceResponseRecommendation> | Initially the API will provide one recommendation which balances the individual scores according to the service provider's preference. |

### `CapacityAdviceResponseRecommendation`

- Recommendation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scores` | CapacityAdviceResponseRecommendationScores | Scores for the recommendation. |
| `shards` | array<CapacityAdviceResponseRecommendationShard> | Shards represent blocks of uniform capacity in recommendations. |

### `CapacityAdviceResponseRecommendationScores`

- Groups information about a shard of capacity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `estimatedUptime` | string (google-duration) | The estimated run time of the majority of Spot VMs in the request before preemption. The estimate is best-effort only. It is based on historical data and current conditions. |
| `obtainability` | number (double) | The obtainability score indicates the likelihood of successfully obtaining (provisioning) the requested number of VMs. The score range is 0.0 through 1.0. Higher is better. |

### `CapacityAdviceResponseRecommendationScores` (alpha)

- Groups information about a shard of capacity.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `estimatedUptime` | string (google-duration) | The estimated run time of the majority of Spot VMs in the request before preemption. The estimate is best-effort only. It is based on historical data and current conditions. |
| `estimatedWaitDuration` | string (google-duration) | Output only. The likely maximum time that you will have to wait until Compute Engine provisions your instances. |
| `obtainability` | number (double) | The obtainability score indicates the likelihood of successfully obtaining (provisioning) the requested number of VMs. The score range is 0.0 through 1.0. Higher is better. |
| `uptimeScore` | number (double) | The uptime score indicates the likelihood that your Spot VMs will continue to run without preemption within the next few hours. For more information about the preemption process, see Preemption of Spot VMs. The score range is 0.0 through 1.0. Higher is better. |

### `CapacityAdviceResponseRecommendationShard`

- Shards represent blocks of uniform capacity in recommendations. Each shard is for a single zone and a single machine shape. Each shard defines a size expressed as the number of VMs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceCount` | integer (int32) | The number of instances. |
| `machineType` | string | The machine type corresponds to the instance selection in the request. |
| `provisioningModel` | string enum | The provisioning model that you want to view recommendations for. Values: `FLEX_START`, `RESERVATION_BOUND`, `SPOT`, `STANDARD`. |
| `zone` | string | Output only. The zone name for this shard. |

### `CapacityHistoryRequest`

- A request to get the capacity history.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceProperties` | CapacityHistoryRequestInstanceProperties | Instance properties for this request. |
| `locationPolicy` | CapacityHistoryRequestLocationPolicy | Location policy for this request. |
| `types` | array<string> | List of history types to get capacity history for. Values: `HISTORY_TYPE_UNSPECIFIED`, `PREEMPTION`, `PRICE`. |

### `CapacityHistoryRequestInstanceProperties`

- Instance properties for this request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disks` | array<CapacityHistoryRequestInstancePropertiesAttachedDisk> | Local SSDs. |
| `guestAccelerators` | array<AcceleratorConfig> | Accelerators configuration. |
| `machineType` | string | The machine type for the VM, such as `n2-standard-4`. |
| `scheduling` | CapacityHistoryRequestInstancePropertiesScheduling | Specifies the scheduling options. |

### `CapacityHistoryRequestInstanceProperties` (beta)

- Instance properties for this request.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `machineType` | string | The machine type for the VM, such as `n2-standard-4`. |
| `scheduling` | CapacityHistoryRequestInstancePropertiesScheduling | Specifies the scheduling options. |

### `CapacityHistoryRequestInstancePropertiesAttachedDisk`

- AttachedDisk modeled after Instance's AttachedDisk.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Specifies the type of the disk. Values: `DISK_TYPE_UNSPECIFIED`, `SCRATCH`. |

### `CapacityHistoryRequestInstancePropertiesScheduling`

- Scheduling options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `provisioningModel` | string enum | The provisioning model to get capacity history for. This field must be set to SPOT. For more information, see Compute Engine instances provisioning models. Values: `FLEX_START`, `RESERVATION_BOUND`, `SPOT`, `STANDARD`. |

### `CapacityHistoryRequestLocationPolicy`

- Location policy for this request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | The region or zone to get capacity history for. It can be a partial or full URL. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone - projects/project/zones/zone - zones/zone This field is optional. |

### `CapacityHistoryResponse`

- Contains the capacity history.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | Output only. The location (region or zone) for which the capacity history is returned. It is returned as a URL - For example,https://www.googleapis.com/compute/v1/projects/project/zones/zone. |
| `machineType` | string | The machine type for which the capacity history is returned. |
| `preemptionHistory` | array<CapacityHistoryResponsePreemptionRecord> | The preemption history for the requested machine type and location. |
| `priceHistory` | array<CapacityHistoryResponsePriceRecord> | The price history for the requested machine type and location. |

### `CapacityHistoryResponsePreemptionRecord`

- A record of Spot VM preemption history.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interval` | Interval | The time interval for this preemption record. |
| `preemptionRate` | number (double) | The preemption rate during the interval, representing the fraction of Spot VMs that were preempted. Range: 0.0 to 1.0. Preemption rate is calculated as (total preempted Spots) / (total Spots that stopped running). |

### `CapacityHistoryResponsePriceRecord`

- A record of price history.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interval` | Interval | The time interval for this price record. |
| `listPrice` | Money | The Spot VM list price during the interval. |

### `CapacityPool`

- Structured representation of the capacity pool.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `partitionIds` | array<string> | The list of physical topology block identifiers. |
| `resources` | array<string> | A list of fully qualified resource names that form the logical bounds. Both full and relative URIs are supported. |

### `ChannelCredentials`

- \[Deprecated\] gRPC channel credentials to access the SDS server. gRPC channel credentials to access the SDS server.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `certificates` | TlsCertificatePaths | The call credentials to access the SDS server. |
| `channelCredentialType` | string enum | The channel credentials to access the SDS server. This field can be set to one of the following: CERTIFICATES: Use TLS certificates to access the SDS server. GCE_VM: Use local GCE VM credentials to access the SDS server. Values: `CERTIFICATES`, `GCE_VM`, `INVALID`. |

### `CircuitBreakers`

- Settings controlling the volume of requests, connections and retries to this backend service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxConnections` | integer (int32) | The maximum number of connections to the backend service. If not specified, there is no limit. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |
| `maxPendingRequests` | integer (int32) | The maximum number of pending requests allowed to the backend service. If not specified, there is no limit. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |
| `maxRequests` | integer (int32) | The maximum number of parallel requests that allowed to the backend service. If not specified, there is no limit. |
| `maxRequestsPerConnection` | integer (int32) | Maximum requests for a single connection to the backend service. This parameter is respected by both the HTTP/1.1 and HTTP/2 implementations. If not specified, there is no limit. Setting this parameter to 1 will effectively disable keep alive. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |
| `maxRetries` | integer (int32) | The maximum number of parallel retries allowed to the backend cluster. If not specified, the default is 1. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |

### `CircuitBreakers` (beta)

- Settings controlling the volume of requests, connections and retries to this backend service.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `connectTimeout` | Duration | The timeout for new network connections to hosts. |
| `maxConnections` | integer (int32) | The maximum number of connections to the backend service. If not specified, there is no limit. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |
| `maxPendingRequests` | integer (int32) | The maximum number of pending requests allowed to the backend service. If not specified, there is no limit. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |
| `maxRequests` | integer (int32) | The maximum number of parallel requests that allowed to the backend service. If not specified, there is no limit. |
| `maxRequestsPerConnection` | integer (int32) | Maximum requests for a single connection to the backend service. This parameter is respected by both the HTTP/1.1 and HTTP/2 implementations. If not specified, there is no limit. Setting this parameter to 1 will effectively disable keep alive. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |
| `maxRetries` | integer (int32) | The maximum number of parallel retries allowed to the backend cluster. If not specified, the default is 1. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |

### `ClientTlsSettings`

- \[Deprecated\] The client side authentication settings for connection originating from the backend service. the backend service.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `clientTlsContext` | TlsContext | Configures the mechanism to obtain client-side security certificates and identity information. This field is only applicable when mode is set to MUTUAL. |
| `mode` | string enum | Indicates whether connections to this port should be secured using TLS. The value of this field determines how TLS is enforced. This can be set to one of the following values: DISABLE: Do not setup a TLS connection to the backends. SIMPLE: Originate a TLS connection to the backends. MUTUAL: Secure connections to the backends using mutual TLS by presenting client certificates for authentication. Values: `DISABLE`, `INVALID`, `MUTUAL`, `SIMPLE`. |
| `sni` | string | SNI string to present to the server during TLS handshake. This field is applicable only when mode is SIMPLE or MUTUAL. |
| `subjectAltNames` | array<string> | A list of alternate names to verify the subject identity in the certificate.If specified, the proxy will verify that the server certificate's subject alt name matches one of the specified values. This field is applicable only when mode is SIMPLE or MUTUAL. |

### `Commitment`

- Represents a regional resource-based commitment resource. Creating this commitment resource means that you are purchasing a resource-based committed use contract, with an explicit start and end time. You can purchase resource-based commitments for both hardware and software resources. For more information, read Resource-based committed use discounts
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoRenew` | boolean | Specifies whether to automatically renew the commitment at the end of its current term. The default value is false. If you set the field to true, each time your commitment reaches the end of its term, Compute Engine automatically renews it for another term. You can update this field anytime before the commitment expires. For example, if the commitment is set to expire at 12 AM UTC-8 on January 3, 2027, you can update this field until 11:59 PM UTC-8 on January 2, 2027. |
| `category` | string enum | The category of the commitment; specifies whether the commitment is for hardware or software resources. Category MACHINE specifies that you are committing to hardware machine resources such asVCPU or MEMORY, listed in resources. Category LICENSE specifies that you are committing to software licenses, listed in licenseResources. Note that if you specify MACHINE commitments, then you must also specify a type to indicate the machine series of the hardware resource that you are committing to. Values: `CATEGORY_UNSPECIFIED`, `LICENSE`, `MACHINE`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `customEndTimestamp` | string | \[Input Only\] Optional, specifies the requested commitment end time inRFC3339 text format. Use this option when the desired commitment's end date is later than the start date + term duration. |
| `description` | string | An optional description of the commitment. You can provide this property when you create the resource. |
| `endTimestamp` | string | Output only. \[Output Only\] Commitment end time inRFC3339 text format. |
| `existingReservations` | array<string> | — |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#commitment for commitments. |
| `licenseResource` | LicenseResourceCommitment | The license specification required as part of a license commitment. |
| `mergeSourceCommitments` | array<string> | The list of source commitments that you are merging to create the new merged commitment. For more information, see Merging commitments. |
| `name` | string | Name of the commitment. You must specify a name when you purchase the commitment. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | CommitmentParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `plan` | string enum | The minimum time duration that you commit to purchasing resources. The plan that you choose determines the preset term length of the commitment (which is 1 year or 3 years) and affects the discount rate that you receive for your resources. Committing to a longer time duration typically gives you a higher discount rate. The supported values for this field are TWELVE_MONTH (1 year), andTHIRTY_SIX_MONTH (3 years). Values: `INVALID`, `THIRTY_SIX_MONTH`, `TWELVE_MONTH`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the commitment and committed resources are located. |
| `reservations` | array<Reservation> | The list of new reservations that you want to create and attach to this commitment. You must attach reservations to your commitment if your commitment specifies any GPUs or Local SSD disks. For more information, see Attach reservations to resource-based commitments. Specify this property only if you want to create new reservations to attach. To attach existing reservations, specify theexistingReservations property instead. |
| `resourceStatus` | CommitmentResourceStatus | Output only. \[Output Only\] Status information for Commitment resource. |
| `resources` | array<ResourceCommitment> | The list of all the hardware resources, with their types and amounts, that you want to commit to. Specify as a separate entry in the list for each individual resource type. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `splitSourceCommitment` | string | The source commitment from which you are transferring resources to create the new split commitment. For more information, see Split commitments. |
| `startTimestamp` | string | Output only. \[Output Only\] Commitment start time inRFC3339 text format. |
| `status` | string enum | Output only. \[Output Only\] Status of the commitment with regards to eventual expiration (each commitment has an end date defined). Status can be one of the following values: NOT_YET_ACTIVE, ACTIVE, orEXPIRED. Values: `ACTIVE`, `CANCELLED`, `CREATING`, `EXPIRED`, `NOT_YET_ACTIVE`. |
| `statusMessage` | string | Output only. \[Output Only\] An optional, human-readable explanation of the status. |
| `type` | string enum | The type of commitment; specifies the machine series for which you want to commit to purchasing resources. The choice of machine series affects the discount rate and the eligible resource types. The type must be one of the following:ACCELERATOR_OPTIMIZED, ACCELERATOR_OPTIMIZED_A3,ACCELERATOR_OPTIMIZED_A3_MEGA,COMPUTE_OPTIMIZED, COMPUTE_OPTIMIZED_C2D, COMPUTE_OPTIMIZED_C3, COMPUTE_OPTIMIZED_C3D,COMPUTE_OPTIMIZED_H3, GENERAL_PURPOSE,GENERAL_PURPOSE_C4, GENERAL_PURPOSE_E2,GENERAL_PURPOSE_N2, GENERAL_PURPOSE_N2D,GENERAL_PURPOSE_N4, GENERAL_PURPOSE_T2D,GRAPHICS_OPTIMIZED, GRAPHICS_OPTIMIZED_G4,GRAPHICS_OPTIMIZED_G4_VGPU,MEMORY_OPTIMIZED, MEMORY_OPTIMIZED_M3,MEMORY_OPTIMIZED_X4, STORAGE_OPTIMIZED_Z3,STORAGE_OPTIMIZED_Z4DS, STORAGE_OPTIMIZED_Z4DH,STORAGE_OPTIMIZED_Z4D4T,STORAGE_OPTIMIZED_Z4M. For example, type MEMORY_OPTIMIZED specifies a commitment that applies only to eligible resources of memory optimized M1 and M2 machine series. Type GENERAL_PURPOSE specifies a commitment that applies only to eligible resources of general purpose N1 machine series. Values: `ACCELERATOR_OPTIMIZED`, `ACCELERATOR_OPTIMIZED_A3`, `ACCELERATOR_OPTIMIZED_A3_MEGA`, `ACCELERATOR_OPTIMIZED_A3_ULTRA`, `ACCELERATOR_OPTIMIZED_A4`, `COMPUTE_OPTIMIZED`, `COMPUTE_OPTIMIZED_C2D`, `COMPUTE_OPTIMIZED_C3`, `COMPUTE_OPTIMIZED_C3D`, `COMPUTE_OPTIMIZED_H3`, `COMPUTE_OPTIMIZED_H4D`, `COMPUTE_OPTIMIZED_H4D_3TB`, `GENERAL_PURPOSE`, `GENERAL_PURPOSE_C4`, `GENERAL_PURPOSE_C4A`, `GENERAL_PURPOSE_C4D`, `GENERAL_PURPOSE_E2`, `GENERAL_PURPOSE_N2`, `GENERAL_PURPOSE_N2D`, `GENERAL_PURPOSE_N4`, `GENERAL_PURPOSE_N4A`, `GENERAL_PURPOSE_N4D`, `GENERAL_PURPOSE_T2D`, `GRAPHICS_OPTIMIZED`, `GRAPHICS_OPTIMIZED_G4`, `GRAPHICS_OPTIMIZED_G4_VGPU`, `MEMORY_OPTIMIZED`, `MEMORY_OPTIMIZED_M3`, `MEMORY_OPTIMIZED_M4`, `MEMORY_OPTIMIZED_M4N`, `MEMORY_OPTIMIZED_M4N_6TB`, `MEMORY_OPTIMIZED_M4_6TB`, `MEMORY_OPTIMIZED_X4_1440_24T`, `MEMORY_OPTIMIZED_X4_16TB`, `MEMORY_OPTIMIZED_X4_1920_32T`, `MEMORY_OPTIMIZED_X4_24TB`, `MEMORY_OPTIMIZED_X4_32TB`, `MEMORY_OPTIMIZED_X4_480_6T`, `MEMORY_OPTIMIZED_X4_480_8T`, `MEMORY_OPTIMIZED_X4_960_12T`, `MEMORY_OPTIMIZED_X4_960_16T`, `MEMORY_OPTIMIZED_X5_1376_24T`, `MEMORY_OPTIMIZED_X5_1376_32T`, `MEMORY_OPTIMIZED_X5_2064_48T`, `MEMORY_OPTIMIZED_X5_688_12T`, `MEMORY_OPTIMIZED_X5_688_16T`, `NETWORK_OPTIMIZED_C4N`, `NETWORK_OPTIMIZED_U4C`, `NETWORK_OPTIMIZED_U4P`, `NETWORK_OPTIMIZED_U4S`, `STORAGE_OPTIMIZED_Z3`, `STORAGE_OPTIMIZED_Z4D4T`, `STORAGE_OPTIMIZED_Z4DH`, `STORAGE_OPTIMIZED_Z4DS`, `STORAGE_OPTIMIZED_Z4M`, `TYPE_UNSPECIFIED`. |

### `Commitment` (alpha)

- Represents a regional resource-based commitment resource. Creating this commitment resource means that you are purchasing a resource-based committed use contract, with an explicit start and end time. You can purchase resource-based commitments for both hardware and software resources. For more information, read Resource-based committed use discounts
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `autoRenew` | boolean | Specifies whether to automatically renew the commitment at the end of its current term. The default value is false. If you set the field to true, each time your commitment reaches the end of its term, Compute Engine automatically renews it for another term. You can update this field anytime before the commitment expires. For example, if the commitment is set to expire at 12 AM UTC-8 on January 3, 2027, you can update this field until 11:59 PM UTC-8 on January 2, 2027. |
| `category` | string enum | The category of the commitment; specifies whether the commitment is for hardware or software resources. Category MACHINE specifies that you are committing to hardware machine resources such asVCPU or MEMORY, listed in resources. Category LICENSE specifies that you are committing to software licenses, listed in licenseResources. Note that if you specify MACHINE commitments, then you must also specify a type to indicate the machine series of the hardware resource that you are committing to. Values: `CATEGORY_UNSPECIFIED`, `LICENSE`, `MACHINE`, `PERSISTENT_DISK`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `customEndTimestamp` | string | \[Input Only\] Optional, specifies the requested commitment end time inRFC3339 text format. Use this option when the desired commitment's end date is later than the start date + term duration. |
| `description` | string | An optional description of the commitment. You can provide this property when you create the resource. |
| `endTimestamp` | string | Output only. \[Output Only\] Commitment end time inRFC3339 text format. |
| `existingReservations` | array<string> | — |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#commitment for commitments. |
| `licenseResource` | LicenseResourceCommitment | The license specification required as part of a license commitment. |
| `mergeSourceCommitments` | array<string> | The list of source commitments that you are merging to create the new merged commitment. For more information, see Merging commitments. |
| `name` | string | Name of the commitment. You must specify a name when you purchase the commitment. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | CommitmentParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `persistentDiskResources` | array<PersistentDiskResourceCommitment> | Optional. Used when category is PERSISTENT_DISK. Each entry in the list represents a commitment to a specific Persistent Disk product type and dimension. |
| `plan` | string enum | The minimum time duration that you commit to purchasing resources. The plan that you choose determines the preset term length of the commitment (which is 1 year or 3 years) and affects the discount rate that you receive for your resources. Committing to a longer time duration typically gives you a higher discount rate. The supported values for this field are TWELVE_MONTH (1 year), andTHIRTY_SIX_MONTH (3 years). Values: `INVALID`, `SIXTY_MONTH`, `THIRTY_SIX_MONTH`, `TWELVE_MONTH`, `TWENTY_FOUR_MONTH`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the commitment and committed resources are located. |
| `reservations` | array<Reservation> | The list of new reservations that you want to create and attach to this commitment. You must attach reservations to your commitment if your commitment specifies any GPUs or Local SSD disks. For more information, see Attach reservations to resource-based commitments. Specify this property only if you want to create new reservations to attach. To attach existing reservations, specify theexistingReservations property instead. |
| `resourceStatus` | CommitmentResourceStatus | Output only. \[Output Only\] Status information for Commitment resource. |
| `resources` | array<ResourceCommitment> | The list of all the hardware resources, with their types and amounts, that you want to commit to. Specify as a separate entry in the list for each individual resource type. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `splitSourceCommitment` | string | The source commitment from which you are transferring resources to create the new split commitment. For more information, see Split commitments. |
| `startTimestamp` | string | Output only. \[Output Only\] Commitment start time inRFC3339 text format. |
| `status` | string enum | Output only. \[Output Only\] Status of the commitment with regards to eventual expiration (each commitment has an end date defined). Status can be one of the following values: NOT_YET_ACTIVE, ACTIVE, orEXPIRED. Values: `ACTIVE`, `CANCELED_EARLY_TERMINATION`, `CANCELING`, `CANCELLED`, `CREATING`, `EXPIRED`, `NOT_YET_ACTIVE`. |
| `statusMessage` | string | Output only. \[Output Only\] An optional, human-readable explanation of the status. |
| `type` | string enum | The type of commitment; specifies the machine series for which you want to commit to purchasing resources. The choice of machine series affects the discount rate and the eligible resource types. The type must be one of the following:ACCELERATOR_OPTIMIZED, ACCELERATOR_OPTIMIZED_A3,ACCELERATOR_OPTIMIZED_A3_MEGA,COMPUTE_OPTIMIZED, COMPUTE_OPTIMIZED_C2D, COMPUTE_OPTIMIZED_C3, COMPUTE_OPTIMIZED_C3D,COMPUTE_OPTIMIZED_H3, GENERAL_PURPOSE,GENERAL_PURPOSE_C4, GENERAL_PURPOSE_E2,GENERAL_PURPOSE_N2, GENERAL_PURPOSE_N2D,GENERAL_PURPOSE_N4, GENERAL_PURPOSE_T2D,GRAPHICS_OPTIMIZED, GRAPHICS_OPTIMIZED_G4,GRAPHICS_OPTIMIZED_G4_VGPU,MEMORY_OPTIMIZED, MEMORY_OPTIMIZED_M3,MEMORY_OPTIMIZED_X4, STORAGE_OPTIMIZED_Z3,STORAGE_OPTIMIZED_Z4DS, STORAGE_OPTIMIZED_Z4DH,STORAGE_OPTIMIZED_Z4D4T,STORAGE_OPTIMIZED_Z4M. For example, type MEMORY_OPTIMIZED specifies a commitment that applies only to eligible resources of memory optimized M1 and M2 machine series. Type GENERAL_PURPOSE specifies a commitment that applies only to eligible resources of general purpose N1 machine series. Values: `ACCELERATOR_OPTIMIZED`, `ACCELERATOR_OPTIMIZED_A3`, `ACCELERATOR_OPTIMIZED_A3_MEGA`, `ACCELERATOR_OPTIMIZED_A3_ULTRA`, `ACCELERATOR_OPTIMIZED_A4`, `ACCELERATOR_OPTIMIZED_A4X`, `ACCELERATOR_OPTIMIZED_A4X_MAX`, `ACCELERATOR_OPTIMIZED_A5X`, `COMPUTE_OPTIMIZED`, `COMPUTE_OPTIMIZED_C2D`, `COMPUTE_OPTIMIZED_C3`, `COMPUTE_OPTIMIZED_C3D`, `COMPUTE_OPTIMIZED_H3`, `COMPUTE_OPTIMIZED_H4D`, `COMPUTE_OPTIMIZED_H4D_3TB`, `GENERAL_PURPOSE`, `GENERAL_PURPOSE_C4`, `GENERAL_PURPOSE_C4A`, `GENERAL_PURPOSE_C4D`, `GENERAL_PURPOSE_E2`, `GENERAL_PURPOSE_N2`, `GENERAL_PURPOSE_N2D`, `GENERAL_PURPOSE_N4`, `GENERAL_PURPOSE_N4A`, `GENERAL_PURPOSE_N4D`, `GENERAL_PURPOSE_T2D`, `GRAPHICS_OPTIMIZED`, `GRAPHICS_OPTIMIZED_G4`, `GRAPHICS_OPTIMIZED_G4_VGPU`, `MEMORY_OPTIMIZED`, `MEMORY_OPTIMIZED_M3`, `MEMORY_OPTIMIZED_M4`, `MEMORY_OPTIMIZED_M4N`, `MEMORY_OPTIMIZED_M4N_6TB`, `MEMORY_OPTIMIZED_M4_6TB`, `MEMORY_OPTIMIZED_X4`, `MEMORY_OPTIMIZED_X4_1440_24T`, `MEMORY_OPTIMIZED_X4_16TB`, `MEMORY_OPTIMIZED_X4_1920_32T`, `MEMORY_OPTIMIZED_X4_24TB`, `MEMORY_OPTIMIZED_X4_32TB`, `MEMORY_OPTIMIZED_X4_480_6T`, `MEMORY_OPTIMIZED_X4_480_8T`, `MEMORY_OPTIMIZED_X4_960_12T`, `MEMORY_OPTIMIZED_X4_960_16T`, `NETWORK_OPTIMIZED_C4N`, `NETWORK_OPTIMIZED_U4C`, `NETWORK_OPTIMIZED_U4P`, `NETWORK_OPTIMIZED_U4S`, `STORAGE_OPTIMIZED_Z3`, `STORAGE_OPTIMIZED_Z4D`, `STORAGE_OPTIMIZED_Z4D4T`, `STORAGE_OPTIMIZED_Z4DH`, `STORAGE_OPTIMIZED_Z4DS`, `STORAGE_OPTIMIZED_Z4M`, `TYPE_UNSPECIFIED`. |

### `Commitment` (beta)

- Represents a regional resource-based commitment resource. Creating this commitment resource means that you are purchasing a resource-based committed use contract, with an explicit start and end time. You can purchase resource-based commitments for both hardware and software resources. For more information, read Resource-based committed use discounts
- Version: beta

| Field | Type | Description |
|---|---|---|
| `autoRenew` | boolean | Specifies whether to automatically renew the commitment at the end of its current term. The default value is false. If you set the field to true, each time your commitment reaches the end of its term, Compute Engine automatically renews it for another term. You can update this field anytime before the commitment expires. For example, if the commitment is set to expire at 12 AM UTC-8 on January 3, 2027, you can update this field until 11:59 PM UTC-8 on January 2, 2027. |
| `category` | string enum | The category of the commitment; specifies whether the commitment is for hardware or software resources. Category MACHINE specifies that you are committing to hardware machine resources such asVCPU or MEMORY, listed in resources. Category LICENSE specifies that you are committing to software licenses, listed in licenseResources. Note that if you specify MACHINE commitments, then you must also specify a type to indicate the machine series of the hardware resource that you are committing to. Values: `CATEGORY_UNSPECIFIED`, `LICENSE`, `MACHINE`, `PERSISTENT_DISK`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `customEndTimestamp` | string | \[Input Only\] Optional, specifies the requested commitment end time inRFC3339 text format. Use this option when the desired commitment's end date is later than the start date + term duration. |
| `description` | string | An optional description of the commitment. You can provide this property when you create the resource. |
| `endTimestamp` | string | Output only. \[Output Only\] Commitment end time inRFC3339 text format. |
| `existingReservations` | array<string> | — |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#commitment for commitments. |
| `licenseResource` | LicenseResourceCommitment | The license specification required as part of a license commitment. |
| `mergeSourceCommitments` | array<string> | The list of source commitments that you are merging to create the new merged commitment. For more information, see Merging commitments. |
| `name` | string | Name of the commitment. You must specify a name when you purchase the commitment. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | CommitmentParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `persistentDiskResources` | array<PersistentDiskResourceCommitment> | Optional. Used when category is PERSISTENT_DISK. Each entry in the list represents a commitment to a specific Persistent Disk product type and dimension. |
| `plan` | string enum | The minimum time duration that you commit to purchasing resources. The plan that you choose determines the preset term length of the commitment (which is 1 year or 3 years) and affects the discount rate that you receive for your resources. Committing to a longer time duration typically gives you a higher discount rate. The supported values for this field are TWELVE_MONTH (1 year), andTHIRTY_SIX_MONTH (3 years). Values: `INVALID`, `THIRTY_SIX_MONTH`, `TWELVE_MONTH`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the commitment and committed resources are located. |
| `reservations` | array<Reservation> | The list of new reservations that you want to create and attach to this commitment. You must attach reservations to your commitment if your commitment specifies any GPUs or Local SSD disks. For more information, see Attach reservations to resource-based commitments. Specify this property only if you want to create new reservations to attach. To attach existing reservations, specify theexistingReservations property instead. |
| `resourceStatus` | CommitmentResourceStatus | Output only. \[Output Only\] Status information for Commitment resource. |
| `resources` | array<ResourceCommitment> | The list of all the hardware resources, with their types and amounts, that you want to commit to. Specify as a separate entry in the list for each individual resource type. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `splitSourceCommitment` | string | The source commitment from which you are transferring resources to create the new split commitment. For more information, see Split commitments. |
| `startTimestamp` | string | Output only. \[Output Only\] Commitment start time inRFC3339 text format. |
| `status` | string enum | Output only. \[Output Only\] Status of the commitment with regards to eventual expiration (each commitment has an end date defined). Status can be one of the following values: NOT_YET_ACTIVE, ACTIVE, orEXPIRED. Values: `ACTIVE`, `CANCELLED`, `CREATING`, `EXPIRED`, `NOT_YET_ACTIVE`. |
| `statusMessage` | string | Output only. \[Output Only\] An optional, human-readable explanation of the status. |
| `type` | string enum | The type of commitment; specifies the machine series for which you want to commit to purchasing resources. The choice of machine series affects the discount rate and the eligible resource types. The type must be one of the following:ACCELERATOR_OPTIMIZED, ACCELERATOR_OPTIMIZED_A3,ACCELERATOR_OPTIMIZED_A3_MEGA,COMPUTE_OPTIMIZED, COMPUTE_OPTIMIZED_C2D, COMPUTE_OPTIMIZED_C3, COMPUTE_OPTIMIZED_C3D,COMPUTE_OPTIMIZED_H3, GENERAL_PURPOSE,GENERAL_PURPOSE_C4, GENERAL_PURPOSE_E2,GENERAL_PURPOSE_N2, GENERAL_PURPOSE_N2D,GENERAL_PURPOSE_N4, GENERAL_PURPOSE_T2D,GRAPHICS_OPTIMIZED, GRAPHICS_OPTIMIZED_G4,GRAPHICS_OPTIMIZED_G4_VGPU,MEMORY_OPTIMIZED, MEMORY_OPTIMIZED_M3,MEMORY_OPTIMIZED_X4, STORAGE_OPTIMIZED_Z3,STORAGE_OPTIMIZED_Z4DS, STORAGE_OPTIMIZED_Z4DH,STORAGE_OPTIMIZED_Z4D4T,STORAGE_OPTIMIZED_Z4M. For example, type MEMORY_OPTIMIZED specifies a commitment that applies only to eligible resources of memory optimized M1 and M2 machine series. Type GENERAL_PURPOSE specifies a commitment that applies only to eligible resources of general purpose N1 machine series. Values: `ACCELERATOR_OPTIMIZED`, `ACCELERATOR_OPTIMIZED_A3`, `ACCELERATOR_OPTIMIZED_A3_MEGA`, `ACCELERATOR_OPTIMIZED_A3_ULTRA`, `ACCELERATOR_OPTIMIZED_A4`, `COMPUTE_OPTIMIZED`, `COMPUTE_OPTIMIZED_C2D`, `COMPUTE_OPTIMIZED_C3`, `COMPUTE_OPTIMIZED_C3D`, `COMPUTE_OPTIMIZED_H3`, `COMPUTE_OPTIMIZED_H4D`, `COMPUTE_OPTIMIZED_H4D_3TB`, `GENERAL_PURPOSE`, `GENERAL_PURPOSE_C4`, `GENERAL_PURPOSE_C4A`, `GENERAL_PURPOSE_C4D`, `GENERAL_PURPOSE_E2`, `GENERAL_PURPOSE_N2`, `GENERAL_PURPOSE_N2D`, `GENERAL_PURPOSE_N4`, `GENERAL_PURPOSE_N4A`, `GENERAL_PURPOSE_N4D`, `GENERAL_PURPOSE_T2D`, `GRAPHICS_OPTIMIZED`, `GRAPHICS_OPTIMIZED_G4`, `GRAPHICS_OPTIMIZED_G4_VGPU`, `MEMORY_OPTIMIZED`, `MEMORY_OPTIMIZED_M3`, `MEMORY_OPTIMIZED_M4`, `MEMORY_OPTIMIZED_M4_6TB`, `MEMORY_OPTIMIZED_X4_1440_24T`, `MEMORY_OPTIMIZED_X4_16TB`, `MEMORY_OPTIMIZED_X4_1920_32T`, `MEMORY_OPTIMIZED_X4_24TB`, `MEMORY_OPTIMIZED_X4_32TB`, `MEMORY_OPTIMIZED_X4_480_6T`, `MEMORY_OPTIMIZED_X4_480_8T`, `MEMORY_OPTIMIZED_X4_960_12T`, `MEMORY_OPTIMIZED_X4_960_16T`, `NETWORK_OPTIMIZED_C4N`, `NETWORK_OPTIMIZED_U4C`, `NETWORK_OPTIMIZED_U4P`, `NETWORK_OPTIMIZED_U4S`, `STORAGE_OPTIMIZED_Z3`, `STORAGE_OPTIMIZED_Z4D4T`, `STORAGE_OPTIMIZED_Z4DH`, `STORAGE_OPTIMIZED_Z4DS`, `STORAGE_OPTIMIZED_Z4M`, `TYPE_UNSPECIFIED`. |

### `CommitmentAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of CommitmentsScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#commitmentAggregatedList for aggregated lists of commitments. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `CommitmentList`

- Contains a list of Commitment resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Commitment> | A list of Commitment resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#commitmentList for lists of commitments. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `CommitmentParams`

- Additional commitment params.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the commitment. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |

### `CommitmentResourceStatus`

- \[Output Only\] Contains output only fields.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customTermEligibilityEndTimestamp` | string | Output only. \[Output Only\] Indicates the end time of customer's eligibility to send custom term requests in RFC3339 text format. Term extension requests that (not the end time in the request) after this time will be rejected. |

### `CommitmentResourceStatus` (alpha)

- \[Output Only\] Contains output only fields.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `cancellationInformation` | CommitmentResourceStatusCancellationInformation | Output only. \[Output Only\] An optional, contains all the needed information of cancellation. |
| `customTermEligibilityEndTimestamp` | string | Output only. \[Output Only\] Indicates the end time of customer's eligibility to send custom term requests in RFC3339 text format. Term extension requests that (not the end time in the request) after this time will be rejected. |

### `CommitmentResourceStatusCancellationInformation`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `canceledCommitment` | Money | Output only. \[Output Only\] An optional amount of CUDs canceled so far in the last 365 days. |
| `canceledCommitmentLastUpdatedTimestamp` | string | Output only. \[Output Only\] An optional last update time of canceled_commitment.RFC3339 text format. |
| `cancellationCap` | Money | Output only. \[Output Only\] An optional,the cancellation cap for how much commitments can be canceled in a rolling 365 per billing account. |
| `cancellationFee` | Money | Output only. \[Output Only\] An optional, cancellation fee. |
| `cancellationFeeExpirationTimestamp` | string | Output only. \[Output Only\] An optional, cancellation fee expiration time.RFC3339 text format. |

### `CommitmentsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commitments` | array<Commitment> | \[Output Only\] The list of commitments contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of commitments when the list is empty. |

### `CompositeHealthCheck`

- Represents a composite health check. A composite health check resource specifies the health source resources and the health destination resource to which the aggregated health result from the health source resources is delivered.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a CompositeHealthCheck. An up-to-date fingerprint must be provided in order to patch the CompositeHealthCheck; Otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the CompositeHealthCheck. |
| `healthDestination` | string | URL to the destination resource. Must be set. Must be aForwardingRule. The ForwardingRule must have load balancing scheme INTERNAL orINTERNAL_MANAGED and must be regional and in the same region as the CompositeHealthCheck (cross-region deployment forINTERNAL_MANAGED is not supported). Can be mutated. |
| `healthSources` | array<string> | URLs to the HealthSource resources whose results are AND'ed. I.e. he aggregated result is is HEALTHY only if all sources are HEALTHY. Must have at least 1. Must not have more than 10. Must be regional and in the same region as theCompositeHealthCheck. Can be mutated. |
| `id` | string (uint64) | Output only. \[Output Only\] A unique identifier for this resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#compositeHealthCheck for composite health checks. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `region` | string | Output only. \[Output Only\] URL of the region where the composite health check resides. This field applies only to the regional resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL with id for the resource. |

### `CompositeHealthCheckAggregatedList`

- Contains a list of CompositeHealthChecksScopedList.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of CompositeHealthChecksScopedList resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `CompositeHealthCheckHealth`

- Response message for RegionCompositeHealthChecks.GetHealth
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthSources` | array<CompositeHealthChecksGetHealthResponseHealthSourceHealth> | Health sources and their corresponding health states. |
| `healthState` | string enum | Health state of the CompositeHealthCheck. Values: `HEALTHY`, `UNHEALTHY`, `UNKNOWN`. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#compositeHealthCheckHealth for the health of composite health checks. |

### `CompositeHealthCheckList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<CompositeHealthCheck> | A list of CompositeHealthCheck resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#compositeHealthCheck for composite health checks. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `CompositeHealthChecksGetHealthResponseHealthSourceHealth`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthState` | string enum | Health state of the associated HealthSource resource. Values: `HEALTHY`, `UNHEALTHY`, `UNKNOWN`. |
| `source` | string | Fully qualified URL of the associated HealthSource resource. |

### `CompositeHealthChecksScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compositeHealthChecks` | array<CompositeHealthCheck> | A list of CompositeHealthChecks contained in this scope. |
| `warning` | object | Informational warning which replaces the list of composite health checks when the list is empty. |

### `ConfidentialInstanceConfig`

- A set of Confidential Instance options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `confidentialInstanceType` | string enum | Defines the type of technology used by the confidential instance. Values: `BMSAI`, `CCA`, `CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED`, `SEV`, `SEV_SNP`, `TDX`. |
| `confidentialParavisorConfig` | ConfidentialParavisorConfig | Defines a set of Confidential Paravisor (SVSM) options. |
| `enableConfidentialCompute` | boolean | Defines whether the instance should have confidential compute enabled. When enabled, the technology used defaults to AMD SEV unless confidentialInstanceType is specified. |

### `ConfidentialInstanceConfig` (beta)

- A set of Confidential Instance options.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `confidentialInstanceType` | string enum | Defines the type of technology used by the confidential instance. Values: `BMSAI`, `CCA`, `CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED`, `SEV`, `SEV_SNP`, `TDX`. |
| `enableConfidentialCompute` | boolean | Defines whether the instance should have confidential compute enabled. When enabled, the technology used defaults to AMD SEV unless confidentialInstanceType is specified. |

### `ConfidentialParavisorConfig`

- A set of Confidential Paravisor (SVSM) options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `confidentialTpmType` | string enum | Defines the type of TPM to use for the confidential instance. Values: `CONFIDENTIAL_TPM_TYPE_UNSPECIFIED`, `EPHEMERAL`, `NO_CC_TPM`. |
| `sevSnpIrqMode` | string enum | Defines the IRQ mode to use for the confidential instance. Values: `RESTRICTED`, `SEV_SNP_IRQ_MODE_UNSPECIFIED`, `UNRESTRICTED`. |

### `ConnectionDraining`

- Message containing connection draining configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `drainingTimeoutSec` | integer (int32) | Configures a duration timeout for existing requests on a removed backend instance. For supported load balancers and protocols, as described inEnabling connection draining. |

### `ConsistentHashLoadBalancerSettings`

- This message defines settings for a consistent hash style load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `httpCookie` | ConsistentHashLoadBalancerSettingsHttpCookie | Hash is based on HTTP Cookie. This field describes a HTTP cookie that will be used as the hash key for the consistent hash load balancer. If the cookie is not present, it will be generated. This field is applicable if the sessionAffinity is set to HTTP_COOKIE. Not supported when the backend service is referenced by a URL map that is bound to target gRPC proxy that has validateForProxyless field set to true. |
| `httpHeaderName` | string | The hash based on the value of the specified header field. This field is applicable if the sessionAffinity is set toHEADER_FIELD. |
| `minimumRingSize` | string (int64) | The minimum number of virtual nodes to use for the hash ring. Defaults to 1024. Larger ring sizes result in more granular load distributions. If the number of hosts in the load balancing pool is larger than the ring size, each host will be assigned a single virtual node. |

### `ConsistentHashLoadBalancerSettingsHttpCookie`

- The information about the HTTP Cookie on which the hash function is based for load balancing policies that use a consistent hash.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the cookie. |
| `path` | string | Path to set for the cookie. |
| `ttl` | Duration | Lifetime of the cookie. |

### `CorsPolicy`

- The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowCredentials` | boolean | In response to a preflight request, setting this to true indicates that the actual request can include user credentials. This field translates to the Access-Control-Allow-Credentials header. Default is false. |
| `allowHeaders` | array<string> | Specifies the content for the Access-Control-Allow-Headers header. |
| `allowMethods` | array<string> | Specifies the content for the Access-Control-Allow-Methods header. |
| `allowOriginRegexes` | array<string> | Specifies a regular expression that matches allowed origins. For more information, see regular expression syntax. An origin is allowed if it matches either an item inallowOrigins or an item inallowOriginRegexes. Regular expressions can only be used when the loadBalancingScheme is set to INTERNAL_SELF_MANAGED. |
| `allowOrigins` | array<string> | Specifies the list of origins that is allowed to do CORS requests. An origin is allowed if it matches either an item inallowOrigins or an item inallowOriginRegexes. |
| `disabled` | boolean | If true, disables the CORS policy. The default value is false, which indicates that the CORS policy is in effect. |
| `exposeHeaders` | array<string> | Specifies the content for the Access-Control-Expose-Headers header. |
| `maxAge` | integer (int32) | Specifies how long results of a preflight request can be cached in seconds. This field translates to the Access-Control-Max-Age header. |

### `CrossSiteNetwork`

- A resource that represents a cross-site network. You can use cross-site networks to connect your on-premises networks to each other through Interconnect connections.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of the cross-site network. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#crossSiteNetwork for cross-site networks. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |

### `CrossSiteNetwork` (alpha)

- A resource that represents a cross-site network. You can use cross-site networks to connect your on-premises networks to each other through Interconnect connections.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of the cross-site network. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#crossSiteNetwork for cross-site networks. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |

### `CrossSiteNetworkList`

- Response to the list request that contains a list of cross-site networks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<CrossSiteNetwork> | A list of CrossSiteNetwork resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#crossSiteNetwork for cross-site networks. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `CustomErrorResponsePolicy`

- Specifies the custom error response policy that must be applied when the backend service or backend bucket responds with an error.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorResponseRules` | array<CustomErrorResponsePolicyCustomErrorResponseRule> | Specifies rules for returning error responses. In a given policy, if you specify rules for both a range of error codes as well as rules for specific error codes then rules with specific error codes have a higher priority. For example, assume that you configure a rule for 401 (Un-authorized) code, and another for all 4 series error codes (4XX). If the backend service returns a401, then the rule for 401 will be applied. However if the backend service returns a 403, the rule for4xx takes effect. |
| `errorService` | string | The full or partial URL to the BackendBucket resource that contains the custom error content. Examples are: - https://www.googleapis.com/compute/v1/projects/project/global/backendBuckets/myBackendBucket - compute/v1/projects/project/global/backendBuckets/myBackendBucket - global/backendBuckets/myBackendBucket If errorService is not specified at lower levels likepathMatcher, pathRule and routeRule, an errorService specified at a higher level in theUrlMap will be used. IfUrlMap.defaultCustomErrorResponsePolicy contains one or moreerrorResponseRules\[\], it must specifyerrorService. If load balancer cannot reach the backendBucket, a simple Not Found Error will be returned, with the original response code (oroverrideResponseCode if configured). errorService is not supported for internal or regionalHTTP/HTTPS load balancers. |

### `CustomErrorResponsePolicyCustomErrorResponseRule`

- Specifies the mapping between the response code that will be returned along with the custom error content and the response code returned by the backend service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `matchResponseCodes` | array<string> | Valid values include: - A number between 400 and 599: For example 401 or 503, in which case the load balancer applies the policy if the error code exactly matches this value. - 5xx: Load Balancer will apply the policy if the backend service responds with any response code in the range of 500 to 599. - 4xx: Load Balancer will apply the policy if the backend service responds with any response code in the range of 400 to 499. Values must be unique within matchResponseCodes and across allerrorResponseRules ofCustomErrorResponsePolicy. |
| `overrideResponseCode` | integer (int32) | The HTTP status code returned with the response containing the custom error content. If overrideResponseCode is not supplied, the same response code returned by the original backend bucket or backend service is returned to the client. |
| `path` | string | The full path to a file within backendBucket . For example:/errors/defaultError.html path must start with a leading slash. path cannot have trailing slashes. If the file is not available in backendBucket or the load balancer cannot reach the BackendBucket, a simpleNot Found Error is returned to the client. The value must be from 1 to 1024 characters |

### `CustomerEncryptionKey`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1 |
| `kmsKeyServiceAccount` | string | The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/ |
| `rawKey` | string | \[DEPRECATED\] CSEK is no longer supported. Use CMEK instead. Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" |
| `rsaEncryptedKey` | string | \[DEPRECATED\] CSEK is no longer supported. Use CMEK instead. Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem |
| `sha256` | string | \[DEPRECATED\] CSEK is no longer supported. Use CMEK instead. \[Output only\] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource. |

### `CustomerEncryptionKeyProtectedDisk`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskEncryptionKey` | CustomerEncryptionKey | Decrypts data associated with the disk with acustomer-supplied encryption key. |
| `source` | string | Specifies a valid partial or full URL to an existing Persistent Disk resource. This field is only applicable for persistent disks. For example: "source": "/compute/v1/projects/project_id/zones/zone/disks/ disk_name |

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `DateTime`

- Represents civil time (or occasionally physical time). This type can represent a civil time in one of a few possible ways: \* When utc_offset is set and time_zone is unset: a civil time on a calendar day with a particular offset from UTC. \* When time_zone is set and utc_offset is unset: a civil time on a calendar day in a particular time zone. \* When neither time_zone nor utc_offset is set: a civil time on a calendar day in local time. The date is relative to the Proleptic Gregorian Calendar. If year, month, or day are 0, the DateTime is considered not to have a specific year, month, or day respectively. This type may also be used to represent a physical time if all the date and time fields are set and either case of the `time_offset` oneof is set. Consider using `Timestamp` message for physical time instead. If your use case also would like to store the user's timezone, that can be done in another field. This type is more flexible than some applications may want. Make sure to document and validate your application's limitations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. |
| `hours` | integer (int32) | Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. |
| `month` | integer (int32) | Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. |
| `nanos` | integer (int32) | Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. |
| `seconds` | integer (int32) | Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. |
| `timeZone` | TimeZone | Time zone. |
| `utcOffset` | string (google-duration) | UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. |
| `year` | integer (int32) | Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. |

### `DeprecationStatus`

- Deprecation status for a public resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleted` | string | An optional RFC3339 timestamp on or after which the state of this resource is intended to change to DELETED. This is only informational and the status will not change unless the client explicitly changes it. |
| `deprecated` | string | An optional RFC3339 timestamp on or after which the state of this resource is intended to change to DEPRECATED. This is only informational and the status will not change unless the client explicitly changes it. |
| `obsolete` | string | An optional RFC3339 timestamp on or after which the state of this resource is intended to change to OBSOLETE. This is only informational and the status will not change unless the client explicitly changes it. |
| `replacement` | string | The URL of the suggested replacement for a deprecated resource. The suggested replacement resource must be the same kind of resource as the deprecated resource. |
| `state` | string enum | The deprecation state of this resource. This can be ACTIVE,DEPRECATED, OBSOLETE, or DELETED. Operations which communicate the end of life date for an image, can useACTIVE. Operations which create a new resource using aDEPRECATED resource will return successfully, but with a warning indicating the deprecated resource and recommending its replacement. Operations which use OBSOLETE orDELETED resources will be rejected and result in an error. Values: `ACTIVE`, `DELETED`, `DEPRECATED`, `OBSOLETE`. |

### `DeprecationStatus` (beta)

- Deprecation status for a public resource.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `deleted` | string | An optional RFC3339 timestamp on or after which the state of this resource is intended to change to DELETED. This is only informational and the status will not change unless the client explicitly changes it. |
| `deprecated` | string | An optional RFC3339 timestamp on or after which the state of this resource is intended to change to DEPRECATED. This is only informational and the status will not change unless the client explicitly changes it. |
| `obsolete` | string | An optional RFC3339 timestamp on or after which the state of this resource is intended to change to OBSOLETE. This is only informational and the status will not change unless the client explicitly changes it. |
| `replacement` | string | The URL of the suggested replacement for a deprecated resource. The suggested replacement resource must be the same kind of resource as the deprecated resource. |
| `state` | string enum | The deprecation state of this resource. This can be ACTIVE,DEPRECATED, OBSOLETE, or DELETED. Operations which communicate the end of life date for an image, can useACTIVE. Operations which create a new resource using aDEPRECATED resource will return successfully, but with a warning indicating the deprecated resource and recommending its replacement. Operations which use OBSOLETE orDELETED resources will be rejected and result in an error. Values: `ACTIVE`, `DELETED`, `DEPRECATED`, `OBSOLETE`. |
| `stateOverride` | RolloutPolicy | The rollout policy for this deprecation. This policy is only enforced by image family views. The rollout policy restricts the zones where the associated resource is considered in a deprecated state. When the rollout policy does not include the user specified zone, or if the zone is rolled out, the associated resource is considered in a deprecated state. The rollout policy for this deprecation is read-only, except for allowlisted users. This field might not be configured. To view the latest non-deprecated image in a specific zone, use theimageFamilyViews.get method. |

### Shape of `BackendService` (preview)

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "affinityCookieTtlSec": "integer (int32)",
  "backends": "array<Backend>",
  "cdnPolicy": "BackendServiceCdnPolicy",
  "circuitBreakers": "CircuitBreakers",
  "compressionMode": "string enum",
  "connectionDraining": "ConnectionDraining",
  "connectionTrackingPolicy": "BackendServiceConnectionTrackingPolicy",
  "consistentHash": "ConsistentHashLoadBalancerSettings",
  "creationTimestamp": "string",
  "customMetrics": "array<BackendServiceCustomMetric>",
  "customRequestHeaders": "array<string>",
  "customResponseHeaders": "array<string>",
  "description": "string",
  "edgeSecurityPolicy": "string",
  "enableCDN": "boolean",
  "externalManagedMigrationState": "string enum",
  "externalManagedMigrationTestingPercentage": "number (float)",
  "failoverPolicy": "BackendServiceFailoverPolicy",
  "fingerprint": "string (byte)",
  "haPolicy": "BackendServiceHAPolicy",
  "healthChecks": "array<string>",
  "iap": "BackendServiceIAP",
  "id": "string (uint64)",
  "ipAddressSelectionPolicy": "string enum",
  "kind": "string",
  "loadBalancingScheme": "string enum",
  "localityLbPolicies": "array<BackendServiceLocalityLoadBalancingPolicyConfig>",
  "localityLbPolicy": "string enum",
  "logConfig": "BackendServiceLogConfig",
  "maxStreamDuration": "Duration",
  "metadatas": "object",
  "name": "string",
  "network": "string",
  "networkAttachment": "string",
  "networkPassThroughLbTrafficPolicy": "BackendServiceNetworkPassThroughLbTrafficPolicy",
  "orchestrationInfo": "BackendServiceOrchestrationInfo",
  "outlierDetection": "OutlierDetection",
  "params": "BackendServiceParams",
  "port": "integer (int32)",
  "portName": "string",
  "protocol": "string enum",
  "region": "string",
  "securityPolicy": "string",
  "securitySettings": "SecuritySettings",
  "selfLink": "string",
  "serviceBindings": "array<string>",
  "serviceClassId": "string",
  "serviceLbPolicy": "string",
  "sessionAffinity": "string enum",
  "strongSessionAffinityCookie": "BackendServiceHttpCookie",
  "subsetting": "Subsetting",
  "timeoutSec": "integer (int32)",
  "tlsSettings": "BackendServiceTlsSettings",
  "usedBy": "array<BackendServiceUsedBy>"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
