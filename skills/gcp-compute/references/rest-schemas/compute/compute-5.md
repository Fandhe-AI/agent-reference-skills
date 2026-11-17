---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 5/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `HttpHeaderOption`

- Specification determining how headers are added to requests or responses.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headerName` | string | The name of the header. |
| `headerValue` | string | The value of the header to add. |
| `replace` | boolean | If false, headerValue is appended to any values that already exist for the header. If true, headerValue is set for the header, discarding any values that were set for that header. The default value is true, unless a variable is present in headerValue, in which case the default value is false. . |

### `HttpHealthCheck`

- Represents a legacy HTTP Health Check resource. Legacy HTTP health checks are now only required by target pool-based network load balancers. For all other load balancers, including backend service-based network load balancers, and for managed instance group auto-healing, you must use modern (non-legacy) health checks. For more information, seeHealth checks overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checkIntervalSec` | integer (int32) | How often (in seconds) to send a health check. The default value is5 seconds. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `healthyThreshold` | integer (int32) | A so-far unhealthy instance will be marked healthy after this many consecutive successes. The default value is 2. |
| `host` | string | The value of the host header in the HTTP health check request. If left empty (default value), the public IP on behalf of which this health check is performed will be used. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#httpHealthCheck for HTTP health checks. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `port` | integer (int32) | The TCP port number for the HTTP health check request. The default value is80. |
| `requestPath` | string | The request path of the HTTP health check request. The default value is/. This field does not support query parameters. Must comply withRFC3986. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `timeoutSec` | integer (int32) | How long (in seconds) to wait before claiming failure. The default value is5 seconds. It is invalid for timeoutSec to have greater value than checkIntervalSec. |
| `unhealthyThreshold` | integer (int32) | A so-far healthy instance will be marked unhealthy after this many consecutive failures. The default value is 2. |

### `HttpHealthCheck` (alpha)

- Represents a legacy HTTP Health Check resource. Legacy HTTP health checks are now only required by target pool-based network load balancers. For all other load balancers, including backend service-based network load balancers, and for managed instance group auto-healing, you must use modern (non-legacy) health checks. For more information, seeHealth checks overview.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `checkIntervalSec` | integer (int32) | How often (in seconds) to send a health check. The default value is5 seconds. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `healthyThreshold` | integer (int32) | A so-far unhealthy instance will be marked healthy after this many consecutive successes. The default value is 2. |
| `host` | string | The value of the host header in the HTTP health check request. If left empty (default value), the public IP on behalf of which this health check is performed will be used. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#httpHealthCheck for HTTP health checks. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `port` | integer (int32) | The TCP port number for the HTTP health check request. The default value is80. |
| `requestPath` | string | The request path of the HTTP health check request. The default value is/. This field does not support query parameters. Must comply withRFC3986. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `timeoutSec` | integer (int32) | How long (in seconds) to wait before claiming failure. The default value is5 seconds. It is invalid for timeoutSec to have greater value than checkIntervalSec. |
| `unhealthyThreshold` | integer (int32) | A so-far healthy instance will be marked unhealthy after this many consecutive failures. The default value is 2. |

### `HttpHealthCheckList`

- Contains a list of HttpHealthCheck resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<HttpHealthCheck> | A list of HttpHealthCheck resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `HttpQueryParameterMatch`

- HttpRouteRuleMatch criteria for a request's query parameter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exactMatch` | string | The queryParameterMatch matches if the value of the parameter exactly matches the contents of exactMatch. Only one of presentMatch, exactMatch, orregexMatch must be set. |
| `name` | string | The name of the query parameter to match. The query parameter must exist in the request, in the absence of which the request match fails. |
| `presentMatch` | boolean | Specifies that the queryParameterMatch matches if the request contains the query parameter, irrespective of whether the parameter has a value or not. Only one of presentMatch, exactMatch, orregexMatch must be set. |
| `regexMatch` | string | The queryParameterMatch matches if the value of the parameter matches the regular expression specified byregexMatch. For more information about regular expression syntax, see Syntax. Only one of presentMatch, exactMatch, orregexMatch must be set. Regular expressions can only be used when the loadBalancingScheme is set to INTERNAL_SELF_MANAGED, EXTERNAL_MANAGED (regional scope) or INTERNAL_MANAGED. |

### `HttpRedirectAction`

- Specifies settings for an HTTP redirect.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hostRedirect` | string | The host that is used in the redirect response instead of the one that was supplied in the request. The value must be from 1 to 255 characters. |
| `httpsRedirect` | boolean | If set to true, the URL scheme in the redirected request is set to HTTPS. If set to false, the URL scheme of the redirected request remains the same as that of the request. This must only be set for URL maps used inTargetHttpProxys. Setting this true forTargetHttpsProxy is not permitted. The default is set to false. |
| `pathRedirect` | string | The path that is used in the redirect response instead of the one that was supplied in the request. pathRedirect cannot be supplied together withprefixRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters. |
| `prefixRedirect` | string | The prefix that replaces the prefixMatch specified in the HttpRouteRuleMatch, retaining the remaining portion of the URL before redirecting the request. prefixRedirect cannot be supplied together withpathRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters. |
| `redirectResponseCode` | string enum | The HTTP Status code to use for this RedirectAction. Supported values are: - MOVED_PERMANENTLY_DEFAULT, which is the default value and corresponds to 301. - FOUND, which corresponds to 302. - SEE_OTHER which corresponds to 303. - TEMPORARY_REDIRECT, which corresponds to 307. In this case, the request method is retained. - PERMANENT_REDIRECT, which corresponds to 308. In this case, the request method is retained. Values: `FOUND`, `MOVED_PERMANENTLY_DEFAULT`, `PERMANENT_REDIRECT`, `SEE_OTHER`, `TEMPORARY_REDIRECT`. |
| `stripQuery` | boolean | If set to true, any accompanying query portion of the original URL is removed before redirecting the request. If set to false, the query portion of the original URL is retained. The default is set to false. |

### `HttpRetryPolicy`

- The retry policy associates with HttpRouteRule
- Version: v1

| Field | Type | Description |
|---|---|---|
| `numRetries` | integer (uint32) | Specifies the allowed number retries. This number must be > 0. If not specified, defaults to 1. |
| `perTryTimeout` | Duration | Specifies a non-zero timeout per retry attempt. If not specified, will use the timeout set in theHttpRouteAction field. If timeout in the HttpRouteAction field is not set, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true. |
| `retryConditions` | array<string> | Specifies one or more conditions when this retry policy applies. Valid values are: - 5xx: retry is attempted if the instance or endpoint responds with any 5xx response code, or if the instance or endpoint does not respond at all. For example, disconnects, reset, read timeout, connection failure, and refused streams. - gateway-error: Similar to 5xx, but only applies to response codes 502, 503 or504. - connect-failure: a retry is attempted on failures connecting to the instance or endpoint. For example, connection timeouts. - retriable-4xx: a retry is attempted if the instance or endpoint responds with a 4xx response code. The only error that you can retry is error code 409. - refused-stream: a retry is attempted if the instance or endpoint resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. - cancelled: a retry is attempted if the gRPC status code in the response header is set to cancelled. - deadline-exceeded: a retry is attempted if the gRPC status code in the response header is set todeadline-exceeded. - internal: a retry is attempted if the gRPC status code in the response header is set tointernal. - resource-exhausted: a retry is attempted if the gRPC status code in the response header is set toresource-exhausted. - unavailable: a retry is attempted if the gRPC status code in the response header is set tounavailable. Only the following codes are supported when the URL map is bound to target gRPC proxy that has validateForProxyless field set to true. - cancelled - deadline-exceeded - internal - resource-exhausted - unavailable |

### `HttpRouteAction`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cachePolicy` | CachePolicy | Specifies the cache policy configuration for matched traffic. Available only for Global `EXTERNAL_MANAGED` load balancer schemes. At least one property must be specified. This policy cannot be specified if any target backend has Identity-Aware Proxy enabled. |
| `corsPolicy` | CorsPolicy | The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard. Not supported when the URL map is bound to a target gRPC proxy. |
| `dynamicCompressionPolicy` | DynamicCompressionPolicy | Dynamic compression policy for this URL Map's route. Available only for Global EXTERNAL_MANAGED load balancer schemes. |
| `faultInjectionPolicy` | HttpFaultInjection | The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by a load balancer on a percentage of requests before sending those requests to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.timeout and retry_policy is ignored by clients that are configured with a fault_injection_policy if: 1. The traffic is generated by fault injection AND 2. The fault injection is not a delay fault injection. Fault injection is not supported with the classic Application Load Balancer . To see which load balancers support fault injection, see Load balancing: Routing and traffic management features. |
| `imageOptimizationPolicy` | ImageOptimizationPolicy | Image optimization policy for this URL Map's route. Available only for Global EXTERNAL_MANAGED load balancer schemes. Either Cloud CDN must be enabled on the backend service or backend bucket serving the route, or cache policy must be configured on the same route |
| `maxStreamDuration` | Duration | Specifies the maximum duration (timeout) for streams on the selected route. Unlike the timeout field where the timeout duration starts from the time the request has been fully processed (known as\*end-of-stream\*), the duration in this field is computed from the beginning of the stream until the response has been processed, including all retries. A stream that does not complete in this duration is closed. If not specified, this field uses the maximummaxStreamDuration value among all backend services associated with the route. This field is only allowed if the Url map is used with backend services with loadBalancingScheme set toINTERNAL_SELF_MANAGED. |
| `requestMirrorPolicy` | RequestMirrorPolicy | Specifies the policy on how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer does not wait for responses from the shadow service. Before sending traffic to the shadow service, the host / authority header is suffixed with-shadow. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true. |
| `retryPolicy` | HttpRetryPolicy | Specifies the retry policy associated with this route. |
| `timeout` | Duration | Specifies the timeout for the selected route. Timeout is computed from the time the request has been fully processed (known as \*end-of-stream\*) up until the response has been processed. Timeout includes all retries. If not specified, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |
| `urlRewrite` | UrlRewrite | The spec to modify the URL of the request, before forwarding the request to the matched service. urlRewrite is the only action supported in UrlMaps for classic Application Load Balancers. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true. |
| `weightedBackendServices` | array<WeightedBackendService> | A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction. |

### `HttpRouteAction` (preview)

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `cachePolicy` | CachePolicy | Specifies the cache policy configuration for matched traffic. Available only for Global `EXTERNAL_MANAGED` load balancer schemes. At least one property must be specified. This policy cannot be specified if any target backend has Identity-Aware Proxy enabled. |
| `corsPolicy` | CorsPolicy | The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard. Not supported when the URL map is bound to a target gRPC proxy. |
| `faultInjectionPolicy` | HttpFaultInjection | The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by a load balancer on a percentage of requests before sending those requests to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.timeout and retry_policy is ignored by clients that are configured with a fault_injection_policy if: 1. The traffic is generated by fault injection AND 2. The fault injection is not a delay fault injection. Fault injection is not supported with the classic Application Load Balancer . To see which load balancers support fault injection, see Load balancing: Routing and traffic management features. |
| `maxStreamDuration` | Duration | Specifies the maximum duration (timeout) for streams on the selected route. Unlike the timeout field where the timeout duration starts from the time the request has been fully processed (known as\*end-of-stream\*), the duration in this field is computed from the beginning of the stream until the response has been processed, including all retries. A stream that does not complete in this duration is closed. If not specified, this field uses the maximummaxStreamDuration value among all backend services associated with the route. This field is only allowed if the Url map is used with backend services with loadBalancingScheme set toINTERNAL_SELF_MANAGED. |
| `requestMirrorPolicy` | RequestMirrorPolicy | Specifies the policy on how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer does not wait for responses from the shadow service. Before sending traffic to the shadow service, the host / authority header is suffixed with-shadow. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true. |
| `retryPolicy` | HttpRetryPolicy | Specifies the retry policy associated with this route. |
| `timeout` | Duration | Specifies the timeout for the selected route. Timeout is computed from the time the request has been fully processed (known as \*end-of-stream\*) up until the response has been processed. Timeout includes all retries. If not specified, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |
| `urlRewrite` | UrlRewrite | The spec to modify the URL of the request, before forwarding the request to the matched service. urlRewrite is the only action supported in UrlMaps for classic Application Load Balancers. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true. |
| `weightedBackendServices` | array<WeightedBackendService> | A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction. |

### `HttpRouteRule`

- The HttpRouteRule setting specifies how to match an HTTP request and the corresponding routing action that load balancing proxies perform.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customErrorResponsePolicy` | CustomErrorResponsePolicy | customErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. If a policy for an error code is not configured for the RouteRule, a policy for the error code configured inpathMatcher.defaultCustomErrorResponsePolicy is applied. If one is not specified inpathMatcher.defaultCustomErrorResponsePolicy, the policy configured in UrlMap.defaultCustomErrorResponsePolicy takes effect. For example, consider a UrlMap with the following configuration: - UrlMap.defaultCustomErrorResponsePolicy are configured with policies for 5xx and 4xx errors - A RouteRule for /coming_soon/ is configured for the error code 404. If the request is for www.myotherdomain.com and a404 is encountered, the policy underUrlMap.defaultCustomErrorResponsePolicy takes effect. If a404 response is encountered for the requestwww.example.com/current_events/, the pathMatcher's policy takes effect. If however, the request forwww.example.com/coming_soon/ encounters a 404, the policy in RouteRule.customErrorResponsePolicy takes effect. If any of the requests in this example encounter a 500 error code, the policy atUrlMap.defaultCustomErrorResponsePolicy takes effect. When used in conjunction withrouteRules.routeAction.retryPolicy, retries take precedence. Only once all retries are exhausted, thecustomErrorResponsePolicy is applied. While attempting a retry, if load balancer is successful in reaching the service, the customErrorResponsePolicy is ignored and the response from the service is returned to the client. customErrorResponsePolicy is supported only for global external Application Load Balancers. |
| `description` | string | The short description conveying the intent of this routeRule. The description can have a maximum length of 1024 characters. |
| `headerAction` | HttpHeaderAction | Specifies changes to request and response headers that need to take effect for the selected backendService. The headerAction value specified here is applied before the matching pathMatchers\[\].headerAction and afterpathMatchers\[\].routeRules\[\].routeAction.weightedBackendService.backendServiceWeightAction\[\].headerAction HeaderAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |
| `matchRules` | array<HttpRouteRuleMatch> | The list of criteria for matching attributes of a request to thisrouteRule. This list has OR semantics: the request matches this routeRule when any of thematchRules are satisfied. However predicates within a given matchRule have AND semantics. All predicates within a matchRule must match for the request to match the rule. |
| `priority` | integer (int32) | For routeRules within a given pathMatcher, priority determines the order in which a load balancer interpretsrouteRules. RouteRules are evaluated in order of priority, from the lowest to highest number. The priority of a rule decreases as its number increases (1, 2, 3, N+1). The first rule that matches the request is applied. You cannot configure two or more routeRules with the same priority. Priority for each rule must be set to a number from 0 to 2147483647 inclusive. Priority numbers can have gaps, which enable you to add or remove rules in the future without affecting the rest of the rules. For example, 1, 2, 3, 4, 5, 9, 12, 16 is a valid series of priority numbers to which you could add rules numbered from 6 to 8, 10 to 11, and 13 to 15 in the future without any impact on existing rules. |
| `routeAction` | HttpRouteAction | In response to a matching matchRule, the load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within a route rule'srouteAction. |
| `service` | string | The full or partial URL of the backend service resource to which traffic is directed if this rule is matched. If routeAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. |
| `urlRedirect` | HttpRedirectAction | When this rule is matched, the request is redirected to a URL specified by urlRedirect. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy. |

### `HttpRouteRule` (beta)

- The HttpRouteRule setting specifies how to match an HTTP request and the corresponding routing action that load balancing proxies perform.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `customErrorResponsePolicy` | CustomErrorResponsePolicy | customErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. If a policy for an error code is not configured for the RouteRule, a policy for the error code configured inpathMatcher.defaultCustomErrorResponsePolicy is applied. If one is not specified inpathMatcher.defaultCustomErrorResponsePolicy, the policy configured in UrlMap.defaultCustomErrorResponsePolicy takes effect. For example, consider a UrlMap with the following configuration: - UrlMap.defaultCustomErrorResponsePolicy are configured with policies for 5xx and 4xx errors - A RouteRule for /coming_soon/ is configured for the error code 404. If the request is for www.myotherdomain.com and a404 is encountered, the policy underUrlMap.defaultCustomErrorResponsePolicy takes effect. If a404 response is encountered for the requestwww.example.com/current_events/, the pathMatcher's policy takes effect. If however, the request forwww.example.com/coming_soon/ encounters a 404, the policy in RouteRule.customErrorResponsePolicy takes effect. If any of the requests in this example encounter a 500 error code, the policy atUrlMap.defaultCustomErrorResponsePolicy takes effect. When used in conjunction withrouteRules.routeAction.retryPolicy, retries take precedence. Only once all retries are exhausted, thecustomErrorResponsePolicy is applied. While attempting a retry, if load balancer is successful in reaching the service, the customErrorResponsePolicy is ignored and the response from the service is returned to the client. customErrorResponsePolicy is supported only for global external Application Load Balancers. |
| `description` | string | The short description conveying the intent of this routeRule. The description can have a maximum length of 1024 characters. |
| `headerAction` | HttpHeaderAction | Specifies changes to request and response headers that need to take effect for the selected backendService. The headerAction value specified here is applied before the matching pathMatchers\[\].headerAction and afterpathMatchers\[\].routeRules\[\].routeAction.weightedBackendService.backendServiceWeightAction\[\].headerAction HeaderAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |
| `httpFilterConfigs` | array<HttpFilterConfig> | Outbound route specific configuration fornetworkservices.HttpFilter resources enabled by Traffic Director. httpFilterConfigs only applies for load balancers with loadBalancingScheme set toINTERNAL_SELF_MANAGED. See ForwardingRule for more details. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |
| `httpFilterMetadata` | array<HttpFilterConfig> | Outbound route specific metadata supplied tonetworkservices.HttpFilter resources enabled by Traffic Director. httpFilterMetadata only applies for load balancers with loadBalancingScheme set toINTERNAL_SELF_MANAGED. See ForwardingRule for more details. The only configTypeUrl supported istype.googleapis.com/google.protobuf.Struct Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |
| `matchRules` | array<HttpRouteRuleMatch> | The list of criteria for matching attributes of a request to thisrouteRule. This list has OR semantics: the request matches this routeRule when any of thematchRules are satisfied. However predicates within a given matchRule have AND semantics. All predicates within a matchRule must match for the request to match the rule. |
| `priority` | integer (int32) | For routeRules within a given pathMatcher, priority determines the order in which a load balancer interpretsrouteRules. RouteRules are evaluated in order of priority, from the lowest to highest number. The priority of a rule decreases as its number increases (1, 2, 3, N+1). The first rule that matches the request is applied. You cannot configure two or more routeRules with the same priority. Priority for each rule must be set to a number from 0 to 2147483647 inclusive. Priority numbers can have gaps, which enable you to add or remove rules in the future without affecting the rest of the rules. For example, 1, 2, 3, 4, 5, 9, 12, 16 is a valid series of priority numbers to which you could add rules numbered from 6 to 8, 10 to 11, and 13 to 15 in the future without any impact on existing rules. |
| `routeAction` | HttpRouteAction | In response to a matching matchRule, the load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within a route rule'srouteAction. |
| `service` | string | The full or partial URL of the backend service resource to which traffic is directed if this rule is matched. If routeAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. |
| `urlRedirect` | HttpRedirectAction | When this rule is matched, the request is redirected to a URL specified by urlRedirect. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy. |

### `HttpRouteRuleMatch`

- HttpRouteRuleMatch specifies a set of criteria for matching requests to an HttpRouteRule. All specified criteria must be satisfied for a match to occur.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullPathMatch` | string | For satisfying the matchRule condition, the path of the request must exactly match the value specified infullPathMatch after removing any query parameters and anchor that may be part of the original URL. fullPathMatch must be from 1 to 1024 characters. Only one of prefixMatch, fullPathMatch,regexMatch or path_template_match must be specified. |
| `headerMatches` | array<HttpHeaderMatch> | Specifies a list of header match criteria, all of which must match corresponding headers in the request. |
| `ignoreCase` | boolean | Specifies that prefixMatch and fullPathMatch matches are case sensitive. The default value is false. ignoreCase must not be used with regexMatch. Not supported when the URL map is bound to a target gRPC proxy. |
| `metadataFilters` | array<MetadataFilter> | Opaque filter criteria used by the load balancer to restrict routing configuration to a limited set of xDS compliant clients. In their xDS requests to the load balancer, xDS clients present node metadata. When there is a match, the relevant routing configuration is made available to those proxies. For each metadataFilter in this list, if itsfilterMatchCriteria is set to MATCH_ANY, at least one of thefilterLabels must match the corresponding label provided in the metadata. If its filterMatchCriteria is set to MATCH_ALL, then all of its filterLabels must match with corresponding labels provided in the metadata. If multiple metadata filters are specified, all of them need to be satisfied in order to be considered a match. metadataFilters specified here is applied after those specified in ForwardingRule that refers to theUrlMap this HttpRouteRuleMatch belongs to. metadataFilters only applies to load balancers that haveloadBalancingScheme set toINTERNAL_SELF_MANAGED. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |
| `pathTemplateMatch` | string | If specified, this field defines a path template pattern that must match the :path header after the query string is removed. A path template pattern can include variables and wildcards. Variables are enclosed in curly braces, for example{variable_name}. Wildcards include \* that matches a single path segment, and \*\* that matches zero or more path segments. The pattern must follow these rules: - The value must be between 1 and 1024 characters. - The pattern must start with a leading slash ("/"). - No more than 5 operators (variables or wildcards) may appear in the pattern. Precisely one ofprefixMatch, fullPathMatch,regexMatch, or pathTemplateMatch must be set. |
| `prefixMatch` | string | For satisfying the matchRule condition, the request's path must begin with the specified prefixMatch.prefixMatch must begin with a /. The value must be from 1 to 1024 characters. The \* character inside a prefix match is treated as a literal character, not as a wildcard. Only one of prefixMatch, fullPathMatch,regexMatch or path_template_match can be used within a matchRule. |
| `queryParameterMatches` | array<HttpQueryParameterMatch> | Specifies a list of query parameter match criteria, all of which must match corresponding query parameters in the request. Not supported when the URL map is bound to a target gRPC proxy. |
| `regexMatch` | string | For satisfying the matchRule condition, the path of the request must satisfy the regular expression specified inregexMatch after removing any query parameters and anchor supplied with the original URL. For more information about regular expression syntax, see Syntax. Only one of prefixMatch, fullPathMatch,regexMatch or path_template_match must be specified. Regular expressions can only be used when the loadBalancingScheme is set to INTERNAL_SELF_MANAGED, EXTERNAL_MANAGED (regional scope) or INTERNAL_MANAGED. |

### `HttpsHealthCheck`

- Represents a legacy HTTPS Health Check resource. Legacy HTTPS health checks have been deprecated. If you are using a target pool-based network load balancer, you must use a legacy HTTP (not HTTPS) health check. For all other load balancers, including backend service-based network load balancers, and for managed instance group auto-healing, you must use modern (non-legacy) health checks. For more information, seeHealth checks overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checkIntervalSec` | integer (int32) | How often (in seconds) to send a health check. The default value is 5 seconds. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `healthyThreshold` | integer (int32) | A so-far unhealthy instance will be marked healthy after this many consecutive successes. The default value is 2. |
| `host` | string | The value of the host header in the HTTPS health check request. If left empty (default value), the public IP on behalf of which this health check is performed will be used. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. Type of the resource. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `port` | integer (int32) | The TCP port number for the HTTPS health check request. The default value is 443. |
| `requestPath` | string | The request path of the HTTPS health check request. The default value is "/". Must comply withRFC3986. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `timeoutSec` | integer (int32) | How long (in seconds) to wait before claiming failure. The default value is 5 seconds. It is invalid for timeoutSec to have a greater value than checkIntervalSec. |
| `unhealthyThreshold` | integer (int32) | A so-far healthy instance will be marked unhealthy after this many consecutive failures. The default value is 2. |

### `HttpsHealthCheck` (alpha)

- Represents a legacy HTTPS Health Check resource. Legacy HTTPS health checks have been deprecated. If you are using a target pool-based network load balancer, you must use a legacy HTTP (not HTTPS) health check. For all other load balancers, including backend service-based network load balancers, and for managed instance group auto-healing, you must use modern (non-legacy) health checks. For more information, seeHealth checks overview.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `checkIntervalSec` | integer (int32) | How often (in seconds) to send a health check. The default value is 5 seconds. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `healthyThreshold` | integer (int32) | A so-far unhealthy instance will be marked healthy after this many consecutive successes. The default value is 2. |
| `host` | string | The value of the host header in the HTTPS health check request. If left empty (default value), the public IP on behalf of which this health check is performed will be used. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. Type of the resource. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `port` | integer (int32) | The TCP port number for the HTTPS health check request. The default value is 443. |
| `requestPath` | string | The request path of the HTTPS health check request. The default value is "/". Must comply withRFC3986. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `timeoutSec` | integer (int32) | How long (in seconds) to wait before claiming failure. The default value is 5 seconds. It is invalid for timeoutSec to have a greater value than checkIntervalSec. |
| `unhealthyThreshold` | integer (int32) | A so-far healthy instance will be marked unhealthy after this many consecutive failures. The default value is 2. |

### `HttpsHealthCheckList`

- Contains a list of HttpsHealthCheck resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<HttpsHealthCheck> | A list of HttpsHealthCheck resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `Image`

- Represents an Image resource. You can use images to create boot disks for your VM instances. For more information, read Images.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | The architecture of the image. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `archiveSizeBytes` | string (int64) | Size of the image tar.gz archive stored in Google Cloud Storage (in bytes). |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | Output only. The deprecation status associated with this image. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `diskSizeGb` | string (int64) | Size of the image when restored onto a persistent disk (in GB). |
| `enableConfidentialCompute` | boolean | Output only. Whether this image is created from a confidential compute mode disk. \[Output Only\]: This field is not set by user, but from source disk. |
| `family` | string | The name of the image family to which this image belongs. The image family name can be from a publicly managed image family provided by Compute Engine, or from a custom image family you create. For example,centos-stream-9 is a publicly available image family. For more information, see Image family best practices. When creating disks, you can specify an image family instead of a specific image name. The image family always returns its latest image that is not deprecated. The name of the image family must comply with RFC1035. |
| `guestOsFeatures` | array<GuestOsFeature> | A list of features to enable on the guest operating system. Applicable only for bootable images. To see a list of available options, see theguestOSfeatures\[\].type parameter. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `imageEncryptionKey` | CustomerEncryptionKey | Encrypts the image using acustomer-supplied encryption key. After you encrypt an image with a customer-supplied key, you must provide the same key if you use the image later (e.g. to create a disk from the image). Customer-supplied encryption keys do not protect access to metadata of the disk. If you do not provide an encryption key when creating the image, then the disk will be encrypted using an automatically generated key and you do not need to provide a key to use the image later. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#image for images. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this image, which is essentially a hash of the labels used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an image. |
| `labels` | object | Labels to apply to this image. These can be later modified by the setLabels method. |
| `licenseCodes` | array<string> | Integer license codes indicating which licenses are attached to this image. |
| `licenses` | array<string> | Any applicable license URI. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | ImageParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `rawDisk` | object | The parameters of the raw disk image. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `shieldedInstanceInitialState` | InitialStateConfig | Set the secure boot keys of shielded instance. |
| `sourceDisk` | string | URL of the source disk used to create this image. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - projects/project/zones/zone/disks/disk - zones/zone/disks/disk In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL |
| `sourceDiskEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source disk. Required if the source disk is protected by a customer-supplied encryption key. |
| `sourceDiskId` | string | Output only. \[Output Only\] The ID value of the disk used to create this image. This value may be used to determine whether the image was taken from the current or a previous instance of a given disk name. |
| `sourceImage` | string | URL of the source image used to create this image. The following are valid formats for the URL: - https://www.googleapis.com/compute/v1/projects/project_id/global/ images/image_name - projects/project_id/global/images/image_name In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL |
| `sourceImageEncryptionKey` | CustomerEncryptionKey | The customer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key. |
| `sourceImageId` | string | Output only. \[Output Only\] The ID value of the image used to create this image. This value may be used to determine whether the image was taken from the current or a previous instance of a given image name. |
| `sourceSnapshot` | string | URL of the source snapshot used to create this image. The following are valid formats for the URL: - https://www.googleapis.com/compute/v1/projects/project_id/global/ snapshots/snapshot_name - projects/project_id/global/snapshots/snapshot_name In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL |
| `sourceSnapshotEncryptionKey` | CustomerEncryptionKey | The customer-supplied encryption key of the source snapshot. Required if the source snapshot is protected by a customer-supplied encryption key. |
| `sourceSnapshotId` | string | Output only. \[Output Only\] The ID value of the snapshot used to create this image. This value may be used to determine whether the snapshot was taken from the current or a previous instance of a given snapshot name. |
| `sourceType` | string enum | The type of the image used to create this disk. The default and only valid value is RAW. Values: `RAW`. |
| `status` | string enum | Output only. \[Output Only\] The status of the image. An image can be used to create other resources, such as instances, only after the image has been successfully created and the status is set to READY. Possible values are FAILED, PENDING, orREADY. Values: `DELETING`, `FAILED`, `PENDING`, `READY`. |
| `storageLocations` | array<string> | Cloud Storage bucket storage location of the image (regional or multi-regional). |

### `Image` (alpha)

- Represents an Image resource. You can use images to create boot disks for your VM instances. For more information, read Images.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | The architecture of the image. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `archiveSizeBytes` | string (int64) | Size of the image tar.gz archive stored in Google Cloud Storage (in bytes). |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | Output only. The deprecation status associated with this image. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `diskSizeGb` | string (int64) | Size of the image when restored onto a persistent disk (in GB). |
| `enableConfidentialCompute` | boolean | Output only. Whether this image is created from a confidential compute mode disk. \[Output Only\]: This field is not set by user, but from source disk. |
| `family` | string | The name of the image family to which this image belongs. The image family name can be from a publicly managed image family provided by Compute Engine, or from a custom image family you create. For example,centos-stream-9 is a publicly available image family. For more information, see Image family best practices. When creating disks, you can specify an image family instead of a specific image name. The image family always returns its latest image that is not deprecated. The name of the image family must comply with RFC1035. |
| `guestOsFeatures` | array<GuestOsFeature> | A list of features to enable on the guest operating system. Applicable only for bootable images. To see a list of available options, see theguestOSfeatures\[\].type parameter. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `imageEncryptionKey` | CustomerEncryptionKey | Encrypts the image using acustomer-supplied encryption key. After you encrypt an image with a customer-supplied key, you must provide the same key if you use the image later (e.g. to create a disk from the image). Customer-supplied encryption keys do not protect access to metadata of the disk. If you do not provide an encryption key when creating the image, then the disk will be encrypted using an automatically generated key and you do not need to provide a key to use the image later. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#image for images. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this image, which is essentially a hash of the labels used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an image. |
| `labels` | object | Labels to apply to this image. These can be later modified by the setLabels method. |
| `licenseCodes` | array<string> | Integer license codes indicating which licenses are attached to this image. |
| `licenses` | array<string> | Any applicable license URI. |
| `locked` | boolean | A flag for marketplace VM disk created from the image, which is designed for marketplace VM disk to prevent the proprietary data on the disk from being accessed unwantedly. The flag will be inherited by the disk created from the image. The disk with locked flag set to true will be prohibited from performing the operations below: - R/W or R/O disk attach - Disk detach, if disk is created via create-on-create - Create images - Create snapshots - Create disk clone (create disk from the current disk) The image with the locked field set to true will be prohibited from performing the operations below: - Create images from the current image - Update the locked field for the current image The instance with at least one disk with locked flag set to true will be prohibited from performing the operations below: - Secondary disk attach - Create instant snapshot - Create machine images - Create instance template - Delete the instance with --keep-disk parameter set to true |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | ImageParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `rawDisk` | object | The parameters of the raw disk image. |
| `rolloutOverride` | RolloutPolicy | A rollout policy to apply to this image. When specified, the rollout policy overrides per-zone references to the image via the associated image family. The rollout policy restricts the zones where this image is accessible when using a zonal image family reference. When the rollout policy does not include the user specified zone, or if the zone is rolled out, this image is accessible. The rollout policy for this image is read-only, except for allowlisted users. This field might not be configured. To view the latest non-deprecated image in a specific zone, use theimageFamilyViews.get method. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `shieldedInstanceInitialState` | InitialStateConfig | Set the secure boot keys of shielded instance. |
| `sourceDisk` | string | URL of the source disk used to create this image. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - projects/project/zones/zone/disks/disk - zones/zone/disks/disk In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL |
| `sourceDiskEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source disk. Required if the source disk is protected by a customer-supplied encryption key. |
| `sourceDiskId` | string | Output only. \[Output Only\] The ID value of the disk used to create this image. This value may be used to determine whether the image was taken from the current or a previous instance of a given disk name. |
| `sourceImage` | string | URL of the source image used to create this image. The following are valid formats for the URL: - https://www.googleapis.com/compute/v1/projects/project_id/global/ images/image_name - projects/project_id/global/images/image_name In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL |
| `sourceImageEncryptionKey` | CustomerEncryptionKey | The customer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key. |
| `sourceImageId` | string | Output only. \[Output Only\] The ID value of the image used to create this image. This value may be used to determine whether the image was taken from the current or a previous instance of a given image name. |
| `sourceSnapshot` | string | URL of the source snapshot used to create this image. The following are valid formats for the URL: - https://www.googleapis.com/compute/v1/projects/project_id/global/ snapshots/snapshot_name - projects/project_id/global/snapshots/snapshot_name In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL |
| `sourceSnapshotEncryptionKey` | CustomerEncryptionKey | The customer-supplied encryption key of the source snapshot. Required if the source snapshot is protected by a customer-supplied encryption key. |
| `sourceSnapshotId` | string | Output only. \[Output Only\] The ID value of the snapshot used to create this image. This value may be used to determine whether the snapshot was taken from the current or a previous instance of a given snapshot name. |
| `sourceType` | string enum | The type of the image used to create this disk. The default and only valid value is RAW. Values: `RAW`. |
| `status` | string enum | Output only. \[Output Only\] The status of the image. An image can be used to create other resources, such as instances, only after the image has been successfully created and the status is set to READY. Possible values are FAILED, PENDING, orREADY. Values: `DELETING`, `FAILED`, `PENDING`, `READY`. |
| `storageLocations` | array<string> | Cloud Storage bucket storage location of the image (regional or multi-regional). |

### `Image` (beta)

- Represents an Image resource. You can use images to create boot disks for your VM instances. For more information, read Images.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | The architecture of the image. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `archiveSizeBytes` | string (int64) | Size of the image tar.gz archive stored in Google Cloud Storage (in bytes). |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | Output only. The deprecation status associated with this image. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `diskSizeGb` | string (int64) | Size of the image when restored onto a persistent disk (in GB). |
| `enableConfidentialCompute` | boolean | Output only. Whether this image is created from a confidential compute mode disk. \[Output Only\]: This field is not set by user, but from source disk. |
| `family` | string | The name of the image family to which this image belongs. The image family name can be from a publicly managed image family provided by Compute Engine, or from a custom image family you create. For example,centos-stream-9 is a publicly available image family. For more information, see Image family best practices. When creating disks, you can specify an image family instead of a specific image name. The image family always returns its latest image that is not deprecated. The name of the image family must comply with RFC1035. |
| `guestOsFeatures` | array<GuestOsFeature> | A list of features to enable on the guest operating system. Applicable only for bootable images. To see a list of available options, see theguestOSfeatures\[\].type parameter. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `imageEncryptionKey` | CustomerEncryptionKey | Encrypts the image using acustomer-supplied encryption key. After you encrypt an image with a customer-supplied key, you must provide the same key if you use the image later (e.g. to create a disk from the image). Customer-supplied encryption keys do not protect access to metadata of the disk. If you do not provide an encryption key when creating the image, then the disk will be encrypted using an automatically generated key and you do not need to provide a key to use the image later. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#image for images. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this image, which is essentially a hash of the labels used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an image. |
| `labels` | object | Labels to apply to this image. These can be later modified by the setLabels method. |
| `licenseCodes` | array<string> | Integer license codes indicating which licenses are attached to this image. |
| `licenses` | array<string> | Any applicable license URI. |
| `locked` | boolean | A flag for marketplace VM disk created from the image, which is designed for marketplace VM disk to prevent the proprietary data on the disk from being accessed unwantedly. The flag will be inherited by the disk created from the image. The disk with locked flag set to true will be prohibited from performing the operations below: - R/W or R/O disk attach - Disk detach, if disk is created via create-on-create - Create images - Create snapshots - Create disk clone (create disk from the current disk) The image with the locked field set to true will be prohibited from performing the operations below: - Create images from the current image - Update the locked field for the current image The instance with at least one disk with locked flag set to true will be prohibited from performing the operations below: - Secondary disk attach - Create instant snapshot - Create machine images - Create instance template - Delete the instance with --keep-disk parameter set to true |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | ImageParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `rawDisk` | object | The parameters of the raw disk image. |
| `rolloutOverride` | RolloutPolicy | A rollout policy to apply to this image. When specified, the rollout policy overrides per-zone references to the image via the associated image family. The rollout policy restricts the zones where this image is accessible when using a zonal image family reference. When the rollout policy does not include the user specified zone, or if the zone is rolled out, this image is accessible. The rollout policy for this image is read-only, except for allowlisted users. This field might not be configured. To view the latest non-deprecated image in a specific zone, use theimageFamilyViews.get method. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `shieldedInstanceInitialState` | InitialStateConfig | Set the secure boot keys of shielded instance. |
| `sourceDisk` | string | URL of the source disk used to create this image. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - projects/project/zones/zone/disks/disk - zones/zone/disks/disk In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL |
| `sourceDiskEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source disk. Required if the source disk is protected by a customer-supplied encryption key. |
| `sourceDiskId` | string | Output only. \[Output Only\] The ID value of the disk used to create this image. This value may be used to determine whether the image was taken from the current or a previous instance of a given disk name. |
| `sourceImage` | string | URL of the source image used to create this image. The following are valid formats for the URL: - https://www.googleapis.com/compute/v1/projects/project_id/global/ images/image_name - projects/project_id/global/images/image_name In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL |
| `sourceImageEncryptionKey` | CustomerEncryptionKey | The customer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key. |
| `sourceImageId` | string | Output only. \[Output Only\] The ID value of the image used to create this image. This value may be used to determine whether the image was taken from the current or a previous instance of a given image name. |
| `sourceSnapshot` | string | URL of the source snapshot used to create this image. The following are valid formats for the URL: - https://www.googleapis.com/compute/v1/projects/project_id/global/ snapshots/snapshot_name - projects/project_id/global/snapshots/snapshot_name In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL |
| `sourceSnapshotEncryptionKey` | CustomerEncryptionKey | The customer-supplied encryption key of the source snapshot. Required if the source snapshot is protected by a customer-supplied encryption key. |
| `sourceSnapshotId` | string | Output only. \[Output Only\] The ID value of the snapshot used to create this image. This value may be used to determine whether the snapshot was taken from the current or a previous instance of a given snapshot name. |
| `sourceType` | string enum | The type of the image used to create this disk. The default and only valid value is RAW. Values: `RAW`. |
| `status` | string enum | Output only. \[Output Only\] The status of the image. An image can be used to create other resources, such as instances, only after the image has been successfully created and the status is set to READY. Possible values are FAILED, PENDING, orREADY. Values: `DELETING`, `FAILED`, `PENDING`, `READY`. |
| `storageLocations` | array<string> | Cloud Storage bucket storage location of the image (regional or multi-regional). |

### `ImageFamilyView`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `image` | Image | The latest image that is part of the specified image family in the requested location, and that is not deprecated. |

### `ImageList`

- Contains a list of images.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Image> | A list of Image resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ImageOptimizationPolicy`

- The configuration for Cloud CDN's image optimization feature. This feature dynamically processes and delivers images from the network edge. Image Optimization is only available for Global External Application Load Balancers. Either Cloud CDN must be enabled on the backend service or backend bucket serving the route, or cache policy must be configured on the same route.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `queryParameterInterpretation` | string enum | Specifies whether to interpret query parameters for image optimization. Values: `DISABLED`, `ENABLED`, `QUERY_PARAMETER_INTERPRETATION_UNSPECIFIED`. |

### `ImageParams`

- Additional image params.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the image. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |

### `ImageView`

- Represents a read-only view of a global Image resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `image` | Image | The Image resource. |

### `ImageViewsListResponse`

- Response message for ImageViewsService.List
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Etag of the resource. |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<ImageView> | A list of Image resources. |
| `kind` | string | — |
| `nextPageToken` | string | — |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InitialStateConfig`

- Initial State for shielded instance, these are public keys which are safe to store in public
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbs` | array<FileContentBuffer> | The Key Database (db). |
| `dbxs` | array<FileContentBuffer> | The forbidden key database (dbx). |
| `keks` | array<FileContentBuffer> | The Key Exchange Key (KEK). |
| `pk` | FileContentBuffer | The Platform Key (PK). |

### `Instance`

- Represents an Instance resource. An instance is a virtual machine that is hosted on Google Cloud Platform. For more information, readVirtual Machine Instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advancedMachineFeatures` | AdvancedMachineFeatures | Controls for advanced machine-related behavior features. |
| `canIpForward` | boolean | Allows this instance to send and receive packets with non-matching destination or source IPs. This is required if you plan to use this instance to forward routes. For more information, seeEnabling IP Forwarding. |
| `confidentialInstanceConfig` | ConfidentialInstanceConfig | — |
| `cpuPlatform` | string | Output only. \[Output Only\] The CPU platform used by this instance. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deletionProtection` | boolean | Whether the resource should be protected against deletion. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `disks` | array<AttachedDisk> | Array of disks associated with this instance. Persistent disks must be created before you can assign them. |
| `displayDevice` | DisplayDevice | Enables display device for the instance. |
| `fingerprint` | string (byte) | Specifies a fingerprint for this resource, which is essentially a hash of the instance's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update the instance. You must always provide an up-to-date fingerprint hash in order to update the instance. To see the latest fingerprint, make get() request to the instance. |
| `guestAccelerators` | array<AcceleratorConfig> | A list of the type and count of accelerator cards attached to the instance. |
| `hostname` | string | Specifies the hostname of the instance. The specified hostname must be RFC1035 compliant. If hostname is not specified, the default hostname is \[INSTANCE_NAME\].c.\[PROJECT_ID\].internal when using the global DNS, and \[INSTANCE_NAME\].\[ZONE\].c.\[PROJECT_ID\].internal when using zonal DNS. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instanceEncryptionKey` | CustomerEncryptionKey | Encrypts suspended data for an instance with acustomer-managed encryption key. If you are creating a new instance, this field will encrypt the local SSD and in-memory contents of the instance during the suspend operation. If you do not provide an encryption key when creating the instance, then the local SSD and in-memory contents will be encrypted using an automatically generated key during the suspend operation. |
| `keyRevocationActionType` | string enum | KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified. Values: `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `NONE`, `STOP`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#instance for instances. |
| `labelFingerprint` | string (byte) | A fingerprint for this request, which is essentially a hash of the label's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the instance. |
| `labels` | object | Labels to apply to this instance. These can be later modified by the setLabels method. |
| `lastStartTimestamp` | string | Output only. \[Output Only\] Last start timestamp inRFC3339 text format. |
| `lastStopTimestamp` | string | Output only. \[Output Only\] Last stop timestamp inRFC3339 text format. |
| `lastSuspendedTimestamp` | string | Output only. \[Output Only\] Last suspended timestamp inRFC3339 text format. |
| `localSsdEncryptionMode` | string enum | Specifies which method should be used for encrypting the Local SSDs attached to the VM. Values: `EPHEMERAL_KEY_ENCRYPTION`, `LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED`, `STANDARD_ENCRYPTION`. |
| `machineType` | string | Full or partial URL of the machine type resource to use for this instance, in the format:zones/zone/machineTypes/machine-type. This is provided by the client when the instance is created. For example, the following is a valid partial url to a predefined machine type: zones/us-central1-f/machineTypes/n1-standard-1 To create acustom machine type, provide a URL to a machine type in the following format, where CPUS is 1 or an even number up to 32 (2, 4, 6, ... 24, etc), and MEMORY is the total memory for this instance. Memory must be a multiple of 256 MB and must be supplied in MB (e.g. 5 GB of memory is 5120 MB): zones/zone/machineTypes/custom-CPUS-MEMORY For example: zones/us-central1-f/machineTypes/custom-4-5120 For a full list of restrictions, read theSpecifications for custom machine types. |
| `metadata` | Metadata | The metadata key/value pairs assigned to this instance. This includes metadata keys that were explicitly defined for the instance. |
| `minCpuPlatform` | string | Specifies aminimum CPU platform for the VM instance. Applicable values are the friendly names of CPU platforms, such as minCpuPlatform: "Intel Haswell" or minCpuPlatform: "Intel Sandy Bridge". |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `networkInterfaces` | array<NetworkInterface> | An array of network configurations for this instance. These specify how interfaces are configured to interact with other network services, such as connecting to the internet. Multiple interfaces are supported per instance. |
| `networkPerformanceConfig` | NetworkPerformanceConfig | — |
| `params` | InstanceParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `privateIpv6GoogleAccess` | string enum | The private IPv6 google access type for the VM. If not specified, use INHERIT_FROM_SUBNETWORK as default. Values: `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE`, `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE`, `INHERIT_FROM_SUBNETWORK`. |
| `reservationAffinity` | ReservationAffinity | Specifies the reservations that this instance can consume from. |
| `resourcePolicies` | array<string> | Resource policies applied to this instance. |
| `resourceStatus` | ResourceStatus | Output only. \[Output Only\] Specifies values set for instance attributes as compared to the values requested by user in the corresponding input only field. |
| `satisfiesPzi` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `scheduling` | Scheduling | Sets the scheduling options for this instance. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `serviceAccounts` | array<ServiceAccount> | A list of service accounts, with their specified scopes, authorized for this instance. Only one service account per VM instance is supported. Service accounts generate access tokens that can be accessed through the metadata server and used to authenticate applications on the instance. SeeService Accounts for more information. |
| `shieldedInstanceConfig` | ShieldedInstanceConfig | — |
| `shieldedInstanceIntegrityPolicy` | ShieldedInstanceIntegrityPolicy | — |
| `sourceMachineImage` | string | Source machine image |
| `sourceMachineImageEncryptionKey` | CustomerEncryptionKey | Source machine image encryption key when creating an instance from a machine image. |
| `startRestricted` | boolean | Output only. \[Output Only\] Whether a VM has been restricted for start because Compute Engine has detected suspicious activity. |
| `status` | string enum | Output only. \[Output Only\] The status of the instance. One of the following values: PROVISIONING, STAGING,RUNNING, STOPPING, SUSPENDING,SUSPENDED, REPAIRING, andTERMINATED. For more information about the status of the instance, see Instance life cycle. Values: `DEPROVISIONING`, `PENDING`, `PENDING_STOP`, `PROVISIONING`, `REPAIRING`, `RUNNING`, `STAGING`, `STOPPED`, `STOPPING`, `SUSPENDED`, `SUSPENDING`, `TERMINATED`. |
| `statusMessage` | string | Output only. \[Output Only\] An optional, human-readable explanation of the status. |
| `tags` | Tags | Tags to apply to this instance. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during instance creation. The tags can be later modified by the setTags method. Each tag within the list must comply withRFC1035. Multiple tags can be specified via the 'tags.items' field. |
| `workloadIdentityConfig` | WorkloadIdentityConfig | — |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the instance resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `Instance` (alpha)

- Represents an Instance resource. An instance is a virtual machine that is hosted on Google Cloud Platform. For more information, readVirtual Machine Instances.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `advancedMachineFeatures` | AdvancedMachineFeatures | Controls for advanced machine-related behavior features. |
| `canIpForward` | boolean | Allows this instance to send and receive packets with non-matching destination or source IPs. This is required if you plan to use this instance to forward routes. For more information, seeEnabling IP Forwarding. |
| `confidentialInstanceConfig` | ConfidentialInstanceConfig | — |
| `cpuPlatform` | string | Output only. \[Output Only\] The CPU platform used by this instance. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deletionProtection` | boolean | Whether the resource should be protected against deletion. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `disks` | array<AttachedDisk> | Array of disks associated with this instance. Persistent disks must be created before you can assign them. |
| `displayDevice` | DisplayDevice | Enables display device for the instance. |
| `eraseWindowsVssSignature` | boolean | Specifies whether the disks restored from source snapshots or source machine image should erase Windows specific VSS signature. |
| `fingerprint` | string (byte) | Specifies a fingerprint for this resource, which is essentially a hash of the instance's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update the instance. You must always provide an up-to-date fingerprint hash in order to update the instance. To see the latest fingerprint, make get() request to the instance. |
| `guestAccelerators` | array<AcceleratorConfig> | A list of the type and count of accelerator cards attached to the instance. |
| `hostname` | string | Specifies the hostname of the instance. The specified hostname must be RFC1035 compliant. If hostname is not specified, the default hostname is \[INSTANCE_NAME\].c.\[PROJECT_ID\].internal when using the global DNS, and \[INSTANCE_NAME\].\[ZONE\].c.\[PROJECT_ID\].internal when using zonal DNS. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `identity` | string | — |
| `identityCertificate` | boolean | — |
| `instanceEncryptionKey` | CustomerEncryptionKey | Encrypts suspended data for an instance with acustomer-managed encryption key. If you are creating a new instance, this field will encrypt the local SSD and in-memory contents of the instance during the suspend operation. If you do not provide an encryption key when creating the instance, then the local SSD and in-memory contents will be encrypted using an automatically generated key during the suspend operation. |
| `keyRevocationActionType` | string enum | KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified. Values: `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `NONE`, `STOP`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#instance for instances. |
| `labelFingerprint` | string (byte) | A fingerprint for this request, which is essentially a hash of the label's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the instance. |
| `labels` | object | Labels to apply to this instance. These can be later modified by the setLabels method. |
| `lastStartTimestamp` | string | Output only. \[Output Only\] Last start timestamp inRFC3339 text format. |
| `lastStopTimestamp` | string | Output only. \[Output Only\] Last stop timestamp inRFC3339 text format. |
| `lastSuspendedTimestamp` | string | Output only. \[Output Only\] Last suspended timestamp inRFC3339 text format. |
| `localSsdEncryptionMode` | string enum | Specifies which method should be used for encrypting the Local SSDs attached to the VM. Values: `CMEK_ENCRYPTION`, `EPHEMERAL_KEY_ENCRYPTION`, `LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED`, `STANDARD_ENCRYPTION`. |
| `machineType` | string | Full or partial URL of the machine type resource to use for this instance, in the format:zones/zone/machineTypes/machine-type. This is provided by the client when the instance is created. For example, the following is a valid partial url to a predefined machine type: zones/us-central1-f/machineTypes/n1-standard-1 To create acustom machine type, provide a URL to a machine type in the following format, where CPUS is 1 or an even number up to 32 (2, 4, 6, ... 24, etc), and MEMORY is the total memory for this instance. Memory must be a multiple of 256 MB and must be supplied in MB (e.g. 5 GB of memory is 5120 MB): zones/zone/machineTypes/custom-CPUS-MEMORY For example: zones/us-central1-f/machineTypes/custom-4-5120 For a full list of restrictions, read theSpecifications for custom machine types. |
| `managementInterfaces` | object | Map of management interfaces. Keys must be valid RFC1035 names and at most 63 characters long. |
| `metadata` | Metadata | The metadata key/value pairs assigned to this instance. This includes metadata keys that were explicitly defined for the instance. |
| `minCpuPlatform` | string | Specifies aminimum CPU platform for the VM instance. Applicable values are the friendly names of CPU platforms, such as minCpuPlatform: "Intel Haswell" or minCpuPlatform: "Intel Sandy Bridge". |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `networkInterfaces` | array<NetworkInterface> | An array of network configurations for this instance. These specify how interfaces are configured to interact with other network services, such as connecting to the internet. Multiple interfaces are supported per instance. |
| `networkPerformanceConfig` | NetworkPerformanceConfig | — |
| `params` | InstanceParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `partnerMetadata` | object | Partner Metadata assigned to the instance. A map from a subdomain (namespace) to entries map. |
| `postKeyRevocationActionType` | string enum | PostKeyRevocationActionType of the instance. Values: `NOOP`, `POST_KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `SHUTDOWN`. |
| `preservedStateSizeGb` | string (int64) | Output only. Total amount of preserved state for SUSPENDED instances. Read-only in the api. |
| `privateIpv6GoogleAccess` | string enum | The private IPv6 google access type for the VM. If not specified, use INHERIT_FROM_SUBNETWORK as default. Values: `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE`, `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE`, `INHERIT_FROM_SUBNETWORK`. |
| `reservationAffinity` | ReservationAffinity | Specifies the reservations that this instance can consume from. |
| `resourcePolicies` | array<string> | Resource policies applied to this instance. |
| `resourceStatus` | ResourceStatus | Output only. \[Output Only\] Specifies values set for instance attributes as compared to the values requested by user in the corresponding input only field. |
| `satisfiesPzi` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `scheduling` | Scheduling | Sets the scheduling options for this instance. |
| `secureTags` | array<string> | \[Input Only\] Secure tags to apply to this instance. These can be later modified by the update method. Maximum number of secure tags allowed is 50. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `serviceAccounts` | array<ServiceAccount> | A list of service accounts, with their specified scopes, authorized for this instance. Only one service account per VM instance is supported. Service accounts generate access tokens that can be accessed through the metadata server and used to authenticate applications on the instance. SeeService Accounts for more information. |
| `serviceIntegrationSpecs` | object | Mapping of user-defined keys to specifications for service integrations. Currently only a single key-value pair is supported. |
| `shieldedInstanceConfig` | ShieldedInstanceConfig | — |
| `shieldedInstanceIntegrityPolicy` | ShieldedInstanceIntegrityPolicy | — |
| `shieldedVmConfig` | ShieldedVmConfig | Output only. Deprecating, please use shielded_instance_config. |
| `shieldedVmIntegrityPolicy` | ShieldedVmIntegrityPolicy | Output only. Deprecating, please use shielded_instance_integrity_policy. |
| `sourceMachineImage` | string | Source machine image |
| `sourceMachineImageEncryptionKey` | CustomerEncryptionKey | Source machine image encryption key when creating an instance from a machine image. |
| `startRestricted` | boolean | Output only. \[Output Only\] Whether a VM has been restricted for start because Compute Engine has detected suspicious activity. |
| `status` | string enum | Output only. \[Output Only\] The status of the instance. One of the following values: PROVISIONING, STAGING,RUNNING, STOPPING, SUSPENDING,SUSPENDED, REPAIRING, andTERMINATED. For more information about the status of the instance, see Instance life cycle. Values: `DEPROVISIONING`, `PENDING`, `PENDING_STOP`, `PROVISIONING`, `REPAIRING`, `RUNNING`, `STAGING`, `STOPPED`, `STOPPING`, `SUSPENDED`, `SUSPENDING`, `TERMINATED`. |
| `statusMessage` | string | Output only. \[Output Only\] An optional, human-readable explanation of the status. |
| `tags` | Tags | Tags to apply to this instance. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during instance creation. The tags can be later modified by the setTags method. Each tag within the list must comply withRFC1035. Multiple tags can be specified via the 'tags.items' field. |
| `upcomingMaintenance` | UpcomingMaintenance | Output only. \[Output Only\] DEPRECATED: Please useresource_status.upcoming_maintenance instead. Specifies upcoming maintenance for the instance. |
| `workloadIdentityConfig` | WorkloadIdentityConfig | — |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the instance resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `Instance` (beta)

- Represents an Instance resource. An instance is a virtual machine that is hosted on Google Cloud Platform. For more information, readVirtual Machine Instances.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `advancedMachineFeatures` | AdvancedMachineFeatures | Controls for advanced machine-related behavior features. |
| `canIpForward` | boolean | Allows this instance to send and receive packets with non-matching destination or source IPs. This is required if you plan to use this instance to forward routes. For more information, seeEnabling IP Forwarding. |
| `confidentialInstanceConfig` | ConfidentialInstanceConfig | — |
| `cpuPlatform` | string | Output only. \[Output Only\] The CPU platform used by this instance. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deletionProtection` | boolean | Whether the resource should be protected against deletion. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `disks` | array<AttachedDisk> | Array of disks associated with this instance. Persistent disks must be created before you can assign them. |
| `displayDevice` | DisplayDevice | Enables display device for the instance. |
| `eraseWindowsVssSignature` | boolean | Specifies whether the disks restored from source snapshots or source machine image should erase Windows specific VSS signature. |
| `fingerprint` | string (byte) | Specifies a fingerprint for this resource, which is essentially a hash of the instance's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update the instance. You must always provide an up-to-date fingerprint hash in order to update the instance. To see the latest fingerprint, make get() request to the instance. |
| `guestAccelerators` | array<AcceleratorConfig> | A list of the type and count of accelerator cards attached to the instance. |
| `hostname` | string | Specifies the hostname of the instance. The specified hostname must be RFC1035 compliant. If hostname is not specified, the default hostname is \[INSTANCE_NAME\].c.\[PROJECT_ID\].internal when using the global DNS, and \[INSTANCE_NAME\].\[ZONE\].c.\[PROJECT_ID\].internal when using zonal DNS. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `instanceEncryptionKey` | CustomerEncryptionKey | Encrypts suspended data for an instance with acustomer-managed encryption key. If you are creating a new instance, this field will encrypt the local SSD and in-memory contents of the instance during the suspend operation. If you do not provide an encryption key when creating the instance, then the local SSD and in-memory contents will be encrypted using an automatically generated key during the suspend operation. |
| `keyRevocationActionType` | string enum | KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified. Values: `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `NONE`, `STOP`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#instance for instances. |
| `labelFingerprint` | string (byte) | A fingerprint for this request, which is essentially a hash of the label's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the instance. |
| `labels` | object | Labels to apply to this instance. These can be later modified by the setLabels method. |
| `lastStartTimestamp` | string | Output only. \[Output Only\] Last start timestamp inRFC3339 text format. |
| `lastStopTimestamp` | string | Output only. \[Output Only\] Last stop timestamp inRFC3339 text format. |
| `lastSuspendedTimestamp` | string | Output only. \[Output Only\] Last suspended timestamp inRFC3339 text format. |
| `localSsdEncryptionMode` | string enum | Specifies which method should be used for encrypting the Local SSDs attached to the VM. Values: `CMEK_ENCRYPTION`, `EPHEMERAL_KEY_ENCRYPTION`, `LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED`, `STANDARD_ENCRYPTION`. |
| `machineType` | string | Full or partial URL of the machine type resource to use for this instance, in the format:zones/zone/machineTypes/machine-type. This is provided by the client when the instance is created. For example, the following is a valid partial url to a predefined machine type: zones/us-central1-f/machineTypes/n1-standard-1 To create acustom machine type, provide a URL to a machine type in the following format, where CPUS is 1 or an even number up to 32 (2, 4, 6, ... 24, etc), and MEMORY is the total memory for this instance. Memory must be a multiple of 256 MB and must be supplied in MB (e.g. 5 GB of memory is 5120 MB): zones/zone/machineTypes/custom-CPUS-MEMORY For example: zones/us-central1-f/machineTypes/custom-4-5120 For a full list of restrictions, read theSpecifications for custom machine types. |
| `metadata` | Metadata | The metadata key/value pairs assigned to this instance. This includes metadata keys that were explicitly defined for the instance. |
| `minCpuPlatform` | string | Specifies aminimum CPU platform for the VM instance. Applicable values are the friendly names of CPU platforms, such as minCpuPlatform: "Intel Haswell" or minCpuPlatform: "Intel Sandy Bridge". |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `networkInterfaces` | array<NetworkInterface> | An array of network configurations for this instance. These specify how interfaces are configured to interact with other network services, such as connecting to the internet. Multiple interfaces are supported per instance. |
| `networkPerformanceConfig` | NetworkPerformanceConfig | — |
| `params` | InstanceParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `partnerMetadata` | object | Partner Metadata assigned to the instance. A map from a subdomain (namespace) to entries map. |
| `postKeyRevocationActionType` | string enum | PostKeyRevocationActionType of the instance. Values: `NOOP`, `POST_KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `SHUTDOWN`. |
| `privateIpv6GoogleAccess` | string enum | The private IPv6 google access type for the VM. If not specified, use INHERIT_FROM_SUBNETWORK as default. Values: `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE`, `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE`, `INHERIT_FROM_SUBNETWORK`. |
| `reservationAffinity` | ReservationAffinity | Specifies the reservations that this instance can consume from. |
| `resourcePolicies` | array<string> | Resource policies applied to this instance. |
| `resourceStatus` | ResourceStatus | Output only. \[Output Only\] Specifies values set for instance attributes as compared to the values requested by user in the corresponding input only field. |
| `satisfiesPzi` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `scheduling` | Scheduling | Sets the scheduling options for this instance. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `serviceAccounts` | array<ServiceAccount> | A list of service accounts, with their specified scopes, authorized for this instance. Only one service account per VM instance is supported. Service accounts generate access tokens that can be accessed through the metadata server and used to authenticate applications on the instance. SeeService Accounts for more information. |
| `shieldedInstanceConfig` | ShieldedInstanceConfig | — |
| `shieldedInstanceIntegrityPolicy` | ShieldedInstanceIntegrityPolicy | — |
| `shieldedVmConfig` | ShieldedVmConfig | Output only. Deprecating, please use shielded_instance_config. |
| `shieldedVmIntegrityPolicy` | ShieldedVmIntegrityPolicy | Output only. Deprecating, please use shielded_instance_integrity_policy. |
| `sourceMachineImage` | string | Source machine image |
| `sourceMachineImageEncryptionKey` | CustomerEncryptionKey | Source machine image encryption key when creating an instance from a machine image. |
| `startRestricted` | boolean | Output only. \[Output Only\] Whether a VM has been restricted for start because Compute Engine has detected suspicious activity. |
| `status` | string enum | Output only. \[Output Only\] The status of the instance. One of the following values: PROVISIONING, STAGING,RUNNING, STOPPING, SUSPENDING,SUSPENDED, REPAIRING, andTERMINATED. For more information about the status of the instance, see Instance life cycle. Values: `DEPROVISIONING`, `PENDING`, `PENDING_STOP`, `PROVISIONING`, `REPAIRING`, `RUNNING`, `STAGING`, `STOPPED`, `STOPPING`, `SUSPENDED`, `SUSPENDING`, `TERMINATED`. |
| `statusMessage` | string | Output only. \[Output Only\] An optional, human-readable explanation of the status. |
| `tags` | Tags | Tags to apply to this instance. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during instance creation. The tags can be later modified by the setTags method. Each tag within the list must comply withRFC1035. Multiple tags can be specified via the 'tags.items' field. |
| `workloadIdentityConfig` | WorkloadIdentityConfig | — |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the instance resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `InstanceAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | An object that contains a list of instances scoped by zone. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#instanceAggregatedList for aggregated lists of Instance resources. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `InstanceConsumptionData`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumptionInfo` | InstanceConsumptionInfo | Output only. Resources consumed by the instance. |
| `instance` | string | Output only. Server-defined URL for the instance. |

### `InstanceConsumptionInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `guestCpus` | integer (int32) | Output only. The number of virtual CPUs that are available to the instance. |
| `localSsdGb` | integer (int32) | Output only. The amount of local SSD storage available to the instance, defined in GiB. |
| `memoryMb` | integer (int32) | Output only. The amount of physical memory available to the instance, defined in MiB. |
| `minNodeCpus` | integer (int32) | Output only. The minimal guaranteed number of virtual CPUs that are reserved. |

### `InstanceFlexibilityPolicy`

- A flexible specification of machine types for instances to create.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceSelections` | object | Specifies named instance selections that define properties for instances created in bulk. Key is an arbitrary, unique RFC1035 string that identifies the instance selection. |

### `InstanceFlexibilityPolicyInstanceSelection`

- Specification of machine type to use. Every position inside this message is an alternative. The count specified in the shape flexibility must not exceed the number of entries in per_instance_properties or the capacity of the name_pattern, if used.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disks` | array<AttachedDisk> | Disks to be attached to the instances created from in this selection. They override the disks specified in the instance properties. |
| `machineTypes` | array<string> | Alternative machine types to use for instances that are created from these properties. This field only accepts a machine type names, for example `n2-standard-4` and not URLs or partial URLs. |
| `minCpuPlatform` | string | Name of the minimum CPU platform to be used by this instance selection. e.g. 'Intel Ice Lake'. |
| `rank` | string (int64) | Rank when prioritizing the shape flexibilities. The instance selections with rank are considered first, in the ascending order of the rank. If not set, defaults to 0. |

### `InstanceFlexibilityPolicyInstanceSelection` (preview)

- Specification of machine type to use. Every position inside this message is an alternative. The count specified in the shape flexibility must not exceed the number of entries in per_instance_properties or the capacity of the name_pattern, if used.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `disks` | array<AttachedDisk> | Disks to be attached to the instances created from in this selection. They override the disks specified in the instance properties. |
| `machineTypes` | array<string> | Alternative machine types to use for instances that are created from these properties. This field only accepts a machine type names, for example `n2-standard-4` and not URLs or partial URLs. |
| `metadataOverrides` | array<object> | Metadata key/value pairs assigned to instances created from this selection. Key/value pairs specified here override keys specified in the instance properties on a key-by-key basis. |
| `minCpuPlatform` | string | Name of the minimum CPU platform to be used by this instance selection. e.g. 'Intel Ice Lake'. |
| `rank` | string (int64) | Rank when prioritizing the shape flexibilities. The instance selections with rank are considered first, in the ascending order of the rank. If not set, defaults to 0. |

### `InstanceGroup`

- Represents an Instance Group resource. Instance Groups can be used to configure a target forload balancing. Instance groups can either be managed or unmanaged. To create managed instance groups, use the instanceGroupManager orregionInstanceGroupManager resource instead. Use zonal unmanaged instance groups if you need to applyload balancing to groups of heterogeneous instances or if you need to manage the instances yourself. You cannot create regional unmanaged instance groups. For more information, readInstance groups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] The creation timestamp for this instance group inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Output only. \[Output Only\] The fingerprint of the named ports. The system uses this fingerprint to detect conflicts when multiple users change the named ports concurrently. |
| `id` | string (uint64) | Output only. \[Output Only\] A unique identifier for this instance group, generated by the server. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#instanceGroup for instance groups. |
| `name` | string | The name of the instance group. The name must be 1-63 characters long, and comply withRFC1035. |
| `namedPorts` | array<NamedPort> | Optional. Assigns a name to a port number. For example:{name: "http", port: 80} This allows the system to reference ports by the assigned name instead of a port number. Named ports can also contain multiple ports. For example:\[{name: "app1", port: 8080}, {name: "app1", port: 8081}, {name: "app2", port: 8082}\] Named ports apply to all instances in this instance group. |
| `network` | string | \[Output Only\] The URL of the network to which all instances in the instance group belong. If your instance has multiple network interfaces, then the network and subnetwork fields only refer to the network and subnet used by your primary interface (nic0). |
| `region` | string | Output only. \[Output Only\] The URL of theregion where the instance group is located (for regional resources). |
| `selfLink` | string | Output only. \[Output Only\] The URL for this instance group. The server generates this URL. |
| `size` | integer (int32) | Output only. \[Output Only\] The total number of instances in the instance group. |
| `subnetwork` | string | Output only. \[Output Only\] The URL of the subnetwork to which all instances in the instance group belong. If your instance has multiple network interfaces, then the network and subnetwork fields only refer to the network and subnet used by your primary interface (nic0). |
| `zone` | string | Output only. \[Output Only\] The URL of thezone where the instance group is located (for zonal resources). |

### `InstanceGroup` (alpha)

- Represents an Instance Group resource. Instance Groups can be used to configure a target forload balancing. Instance groups can either be managed or unmanaged. To create managed instance groups, use the instanceGroupManager orregionInstanceGroupManager resource instead. Use zonal unmanaged instance groups if you need to applyload balancing to groups of heterogeneous instances or if you need to manage the instances yourself. You cannot create regional unmanaged instance groups. For more information, readInstance groups.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] The creation timestamp for this instance group inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Output only. \[Output Only\] The fingerprint of the named ports. The system uses this fingerprint to detect conflicts when multiple users change the named ports concurrently. |
| `id` | string (uint64) | Output only. \[Output Only\] A unique identifier for this instance group, generated by the server. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#instanceGroup for instance groups. |
| `name` | string | The name of the instance group. The name must be 1-63 characters long, and comply withRFC1035. |
| `namedPorts` | array<NamedPort> | Optional. Assigns a name to a port number. For example:{name: "http", port: 80} This allows the system to reference ports by the assigned name instead of a port number. Named ports can also contain multiple ports. For example:\[{name: "app1", port: 8080}, {name: "app1", port: 8081}, {name: "app2", port: 8082}\] Named ports apply to all instances in this instance group. |
| `network` | string | \[Output Only\] The URL of the network to which all instances in the instance group belong. If your instance has multiple network interfaces, then the network and subnetwork fields only refer to the network and subnet used by your primary interface (nic0). |
| `region` | string | Output only. \[Output Only\] The URL of theregion where the instance group is located (for regional resources). |
| `selfLink` | string | Output only. \[Output Only\] The URL for this instance group. The server generates this URL. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `size` | integer (int32) | Output only. \[Output Only\] The total number of instances in the instance group. |
| `subnetwork` | string | Output only. \[Output Only\] The URL of the subnetwork to which all instances in the instance group belong. If your instance has multiple network interfaces, then the network and subnetwork fields only refer to the network and subnet used by your primary interface (nic0). |
| `zone` | string | Output only. \[Output Only\] The URL of thezone where the instance group is located (for zonal resources). |

### `InstanceGroupAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of InstanceGroupsScopedList resources. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#instanceGroupAggregatedList for aggregated lists of instance groups. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | Output only. \[Output Only\] Informational warning message. |

### `InstanceGroupList`

- A list of InstanceGroup resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<InstanceGroup> | A list of InstanceGroup resources. |
| `kind` | string | Output only. \[Output Only\] The resource type, which is alwayscompute#instanceGroupList for instance group lists. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | Output only. \[Output Only\] Informational warning message. |

### `InstanceGroupManager`

- Represents a Managed Instance Group resource. An instance group is a collection of VM instances that you can manage as a single entity. For more information, readInstance groups. For zonal Managed Instance Group, use the instanceGroupManagers resource. For regional Managed Instance Group, use theregionInstanceGroupManagers resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allInstancesConfig` | InstanceGroupManagerAllInstancesConfig | Specifies configuration that overrides the instance template configuration for the group. |
| `autoHealingPolicies` | array<InstanceGroupManagerAutoHealingPolicy> | The autohealing policy for this managed instance group. You can specify only one value. |
| `baseInstanceName` | string | The base instance name is a prefix that you want to attach to the names of all VMs in a MIG. The maximum character length is 58 and the name must comply with RFC1035 format. When a VM is created in the group, the MIG appends a hyphen and a random four-character string to the base instance name. If you want the MIG to assign sequential numbers instead of a random string, then end the base instance name with a hyphen followed by one or more hash symbols. The hash symbols indicate the number of digits. For example, a base instance name of "vm-###" results in "vm-001" as a VM name. @pattern \[a-z\]((\[-a-z0-9\]{0,57})\|(\[-a-z0-9\]{0,51}-#{1,10}(\\\[\[0-9\]{1,10}\\\])?)) |
| `creationTimestamp` | string | Output only. The creation timestamp for this managed instance group inRFC3339 text format. |
| `currentActions` | InstanceGroupManagerActionsSummary | Output only. The list of instance actions and the number of instances in this managed instance group that are scheduled for each of those actions. |
| `description` | string | An optional description of this resource. |
| `distributionPolicy` | DistributionPolicy | Policy specifying the intended distribution of managed instances across zones in a regional managed instance group. |
| `fingerprint` | string (byte) | Fingerprint of this resource. This field may be used in optimistic locking. It will be ignored when inserting an InstanceGroupManager. An up-to-date fingerprint must be provided in order to update the InstanceGroupManager, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an InstanceGroupManager. |
| `id` | string (uint64) | Output only. A unique identifier for this resource type. The server generates this identifier. |
| `instanceFlexibilityPolicy` | InstanceGroupManagerInstanceFlexibilityPolicy | Instance flexibility allowing MIG to create VMs from multiple types of machines. Instance flexibility configuration on MIG overrides instance template configuration. |
| `instanceGroup` | string | Output only. The URL of the Instance Group resource. |
| `instanceLifecyclePolicy` | InstanceGroupManagerInstanceLifecyclePolicy | The repair policy for this managed instance group. |
| `instanceTemplate` | string | The URL of the instance template that is specified for this managed instance group. The group uses this template to create all new instances in the managed instance group. The templates for existing instances in the group do not change unless you run recreateInstances, runapplyUpdatesToInstances, or set the group'supdatePolicy.type to PROACTIVE. |
| `kind` | string | Output only. The resource type, which is alwayscompute#instanceGroupManager for managed instance groups. |
| `listManagedInstancesResults` | string enum | Pagination behavior of the listManagedInstances API method for this managed instance group. Values: `PAGELESS`, `PAGINATED`. |
| `name` | string | The name of the managed instance group. The name must be 1-63 characters long, and comply withRFC1035. |
| `namedPorts` | array<NamedPort> | \[Output Only\] Named ports configured on the Instance Groups complementary to this Instance Group Manager. |
| `region` | string | Output only. \[Output Only\] The URL of theregion where the managed instance group resides (for regional resources). |
| `resourcePolicies` | InstanceGroupManagerResourcePolicies | Resource policies for this managed instance group. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `selfLink` | string | Output only. The URL for this managed instance group. The server defines this URL. |
| `standbyPolicy` | InstanceGroupManagerStandbyPolicy | Standby policy for stopped and suspended instances. |
| `statefulPolicy` | StatefulPolicy | Stateful configuration for this Instanced Group Manager |
| `status` | InstanceGroupManagerStatus | Output only. The status of this managed instance group. |
| `targetPools` | array<string> | The URLs for all TargetPool resources to which instances in theinstanceGroup field are added. The target pools automatically apply to all of the instances in the managed instance group. |
| `targetSize` | integer (int32) | The target number of running instances for this managed instance group. You can reduce this number by using the instanceGroupManager deleteInstances or abandonInstances methods. Resizing the group also changes this number. |
| `targetSizePolicy` | InstanceGroupManagerTargetSizePolicy | The policy that specifies how the MIG creates its VMs to achieve the target size. |
| `targetStoppedSize` | integer (int32) | The target number of stopped instances for this managed instance group. This number changes when you: - Stop instance using the stopInstances method or start instances using the startInstances method. - Manually change the targetStoppedSize using the update method. |
| `targetSuspendedSize` | integer (int32) | The target number of suspended instances for this managed instance group. This number changes when you: - Suspend instance using the suspendInstances method or resume instances using the resumeInstances method. - Manually change the targetSuspendedSize using the update method. |
| `updatePolicy` | InstanceGroupManagerUpdatePolicy | The update policy for this managed instance group. |
| `versions` | array<InstanceGroupManagerVersion> | Specifies the instance templates used by this managed instance group to create instances. Each version is defined by an instanceTemplate and aname. Every version can appear at most once per instance group. This field overrides the top-level instanceTemplate field. Read more about therelationships between these fields. Exactly one version must leave thetargetSize field unset. That version will be applied to all remaining instances. For more information, read aboutcanary updates. |
| `zone` | string | Output only. The URL of azone where the managed instance group is located (for zonal resources). |

### `InstanceGroupManager` (alpha)

- Represents a Managed Instance Group resource. An instance group is a collection of VM instances that you can manage as a single entity. For more information, readInstance groups. For zonal Managed Instance Group, use the instanceGroupManagers resource. For regional Managed Instance Group, use theregionInstanceGroupManagers resource.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `allInstancesConfig` | InstanceGroupManagerAllInstancesConfig | Specifies configuration that overrides the instance template configuration for the group. |
| `autoHealingPolicies` | array<InstanceGroupManagerAutoHealingPolicy> | The autohealing policy for this managed instance group. You can specify only one value. |
| `baseInstanceName` | string | The base instance name is a prefix that you want to attach to the names of all VMs in a MIG. The maximum character length is 58 and the name must comply with RFC1035 format. When a VM is created in the group, the MIG appends a hyphen and a random four-character string to the base instance name. If you want the MIG to assign sequential numbers instead of a random string, then end the base instance name with a hyphen followed by one or more hash symbols. The hash symbols indicate the number of digits. For example, a base instance name of "vm-###" results in "vm-001" as a VM name. @pattern \[a-z\]((\[-a-z0-9\]{0,57})\|(\[-a-z0-9\]{0,51}-#{1,10}(\\\[\[0-9\]{1,10}\\\])?)) |
| `creationTimestamp` | string | Output only. The creation timestamp for this managed instance group inRFC3339 text format. |
| `currentActions` | InstanceGroupManagerActionsSummary | Output only. The list of instance actions and the number of instances in this managed instance group that are scheduled for each of those actions. |
| `description` | string | An optional description of this resource. |
| `distributionPolicy` | DistributionPolicy | Policy specifying the intended distribution of managed instances across zones in a regional managed instance group. |
| `failoverAction` | string enum | The action to perform in case of zone failure. Only one value is supported,NO_FAILOVER. The default is NO_FAILOVER. Values: `NO_FAILOVER`, `UNKNOWN`. |
| `fingerprint` | string (byte) | Fingerprint of this resource. This field may be used in optimistic locking. It will be ignored when inserting an InstanceGroupManager. An up-to-date fingerprint must be provided in order to update the InstanceGroupManager, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an InstanceGroupManager. |
| `id` | string (uint64) | Output only. A unique identifier for this resource type. The server generates this identifier. |
| `instanceFlexibilityPolicy` | InstanceGroupManagerInstanceFlexibilityPolicy | Instance flexibility allowing MIG to create VMs from multiple types of machines. Instance flexibility configuration on MIG overrides instance template configuration. |
| `instanceGroup` | string | Output only. The URL of the Instance Group resource. |
| `instanceLifecyclePolicy` | InstanceGroupManagerInstanceLifecyclePolicy | The repair policy for this managed instance group. |
| `instanceTemplate` | string | The URL of the instance template that is specified for this managed instance group. The group uses this template to create all new instances in the managed instance group. The templates for existing instances in the group do not change unless you run recreateInstances, runapplyUpdatesToInstances, or set the group'supdatePolicy.type to PROACTIVE. |
| `kind` | string | Output only. The resource type, which is alwayscompute#instanceGroupManager for managed instance groups. |
| `listManagedInstancesResults` | string enum | Pagination behavior of the listManagedInstances API method for this managed instance group. Values: `PAGELESS`, `PAGINATED`. |
| `multiMig` | string | URL to the multi-MIG that this Managed Instance Group belongs to. |
| `name` | string | The name of the managed instance group. The name must be 1-63 characters long, and comply withRFC1035. |
| `namedPorts` | array<NamedPort> | \[Output Only\] Named ports configured on the Instance Groups complementary to this Instance Group Manager. |
| `params` | InstanceGroupManagerParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | Output only. \[Output Only\] The URL of theregion where the managed instance group resides (for regional resources). |
| `resourcePolicies` | InstanceGroupManagerResourcePolicies | Resource policies for this managed instance group. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `selfLink` | string | Output only. The URL for this managed instance group. The server defines this URL. |
| `selfLinkWithId` | string | Output only. Server-defined URL for this resource with the resource id. |
| `serviceAccount` | string | The service account to be used as credentials for all operations performed by the managed instance group on instances. The service accounts needs all permissions required to create and delete instances. By default, the service account {projectNumber}@cloudservices.gserviceaccount.com is used. |
| `standbyPolicy` | InstanceGroupManagerStandbyPolicy | Standby policy for stopped and suspended instances. |
| `statefulPolicy` | StatefulPolicy | Stateful configuration for this Instanced Group Manager |
| `status` | InstanceGroupManagerStatus | Output only. The status of this managed instance group. |
| `targetPools` | array<string> | The URLs for all TargetPool resources to which instances in theinstanceGroup field are added. The target pools automatically apply to all of the instances in the managed instance group. |
| `targetSize` | integer (int32) | The target number of running instances for this managed instance group. You can reduce this number by using the instanceGroupManager deleteInstances or abandonInstances methods. Resizing the group also changes this number. |
| `targetSizePolicy` | InstanceGroupManagerTargetSizePolicy | The policy that specifies how the MIG creates its VMs to achieve the target size. |
| `targetSizeUnit` | string enum | The unit of measure for the target size. Values: `INSTANCE`, `VCPU`. |
| `targetStoppedSize` | integer (int32) | The target number of stopped instances for this managed instance group. This number changes when you: - Stop instance using the stopInstances method or start instances using the startInstances method. - Manually change the targetStoppedSize using the update method. |
| `targetSuspendedSize` | integer (int32) | The target number of suspended instances for this managed instance group. This number changes when you: - Suspend instance using the suspendInstances method or resume instances using the resumeInstances method. - Manually change the targetSuspendedSize using the update method. |
| `updatePolicy` | InstanceGroupManagerUpdatePolicy | The update policy for this managed instance group. |
| `versions` | array<InstanceGroupManagerVersion> | Specifies the instance templates used by this managed instance group to create instances. Each version is defined by an instanceTemplate and aname. Every version can appear at most once per instance group. This field overrides the top-level instanceTemplate field. Read more about therelationships between these fields. Exactly one version must leave thetargetSize field unset. That version will be applied to all remaining instances. For more information, read aboutcanary updates. |
| `zone` | string | Output only. The URL of azone where the managed instance group is located (for zonal resources). |

### `InstanceGroupManager` (beta)

- Represents a Managed Instance Group resource. An instance group is a collection of VM instances that you can manage as a single entity. For more information, readInstance groups. For zonal Managed Instance Group, use the instanceGroupManagers resource. For regional Managed Instance Group, use theregionInstanceGroupManagers resource.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `allInstancesConfig` | InstanceGroupManagerAllInstancesConfig | Specifies configuration that overrides the instance template configuration for the group. |
| `autoHealingPolicies` | array<InstanceGroupManagerAutoHealingPolicy> | The autohealing policy for this managed instance group. You can specify only one value. |
| `baseInstanceName` | string | The base instance name is a prefix that you want to attach to the names of all VMs in a MIG. The maximum character length is 58 and the name must comply with RFC1035 format. When a VM is created in the group, the MIG appends a hyphen and a random four-character string to the base instance name. If you want the MIG to assign sequential numbers instead of a random string, then end the base instance name with a hyphen followed by one or more hash symbols. The hash symbols indicate the number of digits. For example, a base instance name of "vm-###" results in "vm-001" as a VM name. @pattern \[a-z\]((\[-a-z0-9\]{0,57})\|(\[-a-z0-9\]{0,51}-#{1,10}(\\\[\[0-9\]{1,10}\\\])?)) |
| `creationTimestamp` | string | Output only. The creation timestamp for this managed instance group inRFC3339 text format. |
| `currentActions` | InstanceGroupManagerActionsSummary | Output only. The list of instance actions and the number of instances in this managed instance group that are scheduled for each of those actions. |
| `description` | string | An optional description of this resource. |
| `distributionPolicy` | DistributionPolicy | Policy specifying the intended distribution of managed instances across zones in a regional managed instance group. |
| `failoverAction` | string enum | The action to perform in case of zone failure. Only one value is supported,NO_FAILOVER. The default is NO_FAILOVER. Values: `NO_FAILOVER`, `UNKNOWN`. |
| `fingerprint` | string (byte) | Fingerprint of this resource. This field may be used in optimistic locking. It will be ignored when inserting an InstanceGroupManager. An up-to-date fingerprint must be provided in order to update the InstanceGroupManager, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an InstanceGroupManager. |
| `id` | string (uint64) | Output only. A unique identifier for this resource type. The server generates this identifier. |
| `instanceFlexibilityPolicy` | InstanceGroupManagerInstanceFlexibilityPolicy | Instance flexibility allowing MIG to create VMs from multiple types of machines. Instance flexibility configuration on MIG overrides instance template configuration. |
| `instanceGroup` | string | Output only. The URL of the Instance Group resource. |
| `instanceLifecyclePolicy` | InstanceGroupManagerInstanceLifecyclePolicy | The repair policy for this managed instance group. |
| `instanceTemplate` | string | The URL of the instance template that is specified for this managed instance group. The group uses this template to create all new instances in the managed instance group. The templates for existing instances in the group do not change unless you run recreateInstances, runapplyUpdatesToInstances, or set the group'supdatePolicy.type to PROACTIVE. |
| `kind` | string | Output only. The resource type, which is alwayscompute#instanceGroupManager for managed instance groups. |
| `listManagedInstancesResults` | string enum | Pagination behavior of the listManagedInstances API method for this managed instance group. Values: `PAGELESS`, `PAGINATED`. |
| `multiMig` | string | URL to the multi-MIG that this Managed Instance Group belongs to. |
| `name` | string | The name of the managed instance group. The name must be 1-63 characters long, and comply withRFC1035. |
| `namedPorts` | array<NamedPort> | \[Output Only\] Named ports configured on the Instance Groups complementary to this Instance Group Manager. |
| `params` | InstanceGroupManagerParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | Output only. \[Output Only\] The URL of theregion where the managed instance group resides (for regional resources). |
| `resourcePolicies` | InstanceGroupManagerResourcePolicies | Resource policies for this managed instance group. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `selfLink` | string | Output only. The URL for this managed instance group. The server defines this URL. |
| `serviceAccount` | string | The service account to be used as credentials for all operations performed by the managed instance group on instances. The service accounts needs all permissions required to create and delete instances. By default, the service account {projectNumber}@cloudservices.gserviceaccount.com is used. |
| `standbyPolicy` | InstanceGroupManagerStandbyPolicy | Standby policy for stopped and suspended instances. |
| `statefulPolicy` | StatefulPolicy | Stateful configuration for this Instanced Group Manager |
| `status` | InstanceGroupManagerStatus | Output only. The status of this managed instance group. |
| `targetPools` | array<string> | The URLs for all TargetPool resources to which instances in theinstanceGroup field are added. The target pools automatically apply to all of the instances in the managed instance group. |
| `targetSize` | integer (int32) | The target number of running instances for this managed instance group. You can reduce this number by using the instanceGroupManager deleteInstances or abandonInstances methods. Resizing the group also changes this number. |
| `targetSizePolicy` | InstanceGroupManagerTargetSizePolicy | The policy that specifies how the MIG creates its VMs to achieve the target size. |
| `targetStoppedSize` | integer (int32) | The target number of stopped instances for this managed instance group. This number changes when you: - Stop instance using the stopInstances method or start instances using the startInstances method. - Manually change the targetStoppedSize using the update method. |
| `targetSuspendedSize` | integer (int32) | The target number of suspended instances for this managed instance group. This number changes when you: - Suspend instance using the suspendInstances method or resume instances using the resumeInstances method. - Manually change the targetSuspendedSize using the update method. |
| `updatePolicy` | InstanceGroupManagerUpdatePolicy | The update policy for this managed instance group. |
| `versions` | array<InstanceGroupManagerVersion> | Specifies the instance templates used by this managed instance group to create instances. Each version is defined by an instanceTemplate and aname. Every version can appear at most once per instance group. This field overrides the top-level instanceTemplate field. Read more about therelationships between these fields. Exactly one version must leave thetargetSize field unset. That version will be applied to all remaining instances. For more information, read aboutcanary updates. |
| `zone` | string | Output only. The URL of azone where the managed instance group is located (for zonal resources). |

### `InstanceGroupManagerActionsSummary`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `abandoning` | integer (int32) | Output only. The total number of instances in the managed instance group that are scheduled to be abandoned. Abandoning an instance removes it from the managed instance group without deleting it. |
| `creating` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be created or are currently being created. If the group fails to create any of these instances, it tries again until it creates the instance successfully. If you have disabled creation retries, this field will not be populated; instead, the creatingWithoutRetries field will be populated. |
| `creatingWithoutRetries` | integer (int32) | Output only. The number of instances that the managed instance group will attempt to create. The group attempts to create each instance only once. If the group fails to create any of these instances, it decreases the group's targetSize value accordingly. |
| `deleting` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be deleted or are currently being deleted. |
| `none` | integer (int32) | Output only. The number of instances in the managed instance group that are running and have no scheduled actions. |
| `recreating` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be recreated or are currently being being recreated. Recreating an instance deletes the existing root persistent disk and creates a new disk from the image that is defined in the instance template. |
| `refreshing` | integer (int32) | Output only. The number of instances in the managed instance group that are being reconfigured with properties that do not require a restart or a recreate action. For example, setting or removing target pools for the instance. |
| `restarting` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be restarted or are currently being restarted. |
| `resuming` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be resumed or are currently being resumed. |
| `starting` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be started or are currently being started. |
| `stopping` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be stopped or are currently being stopped. |
| `suspending` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be suspended or are currently being suspended. |
| `verifying` | integer (int32) | Output only. The number of instances in the managed instance group that are being verified. See the managedInstances\[\].currentAction property in the listManagedInstances method documentation. |

### `InstanceGroupManagerActionsSummary` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `abandoning` | integer (int32) | Output only. The total number of instances in the managed instance group that are scheduled to be abandoned. Abandoning an instance removes it from the managed instance group without deleting it. |
| `adopting` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be adopted or are currently being adopted. |
| `creating` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be created or are currently being created. If the group fails to create any of these instances, it tries again until it creates the instance successfully. If you have disabled creation retries, this field will not be populated; instead, the creatingWithoutRetries field will be populated. |
| `creatingAtomically` | integer (int32) | Output only. The number of instances that the managed instance group will attempt to create atomically, in a batch mode. If the desired count of instances can not be created, entire batch will be deleted and the group will decrease its targetSize value accordingly. |
| `creatingWithoutRetries` | integer (int32) | Output only. The number of instances that the managed instance group will attempt to create. The group attempts to create each instance only once. If the group fails to create any of these instances, it decreases the group's targetSize value accordingly. |
| `deleting` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be deleted or are currently being deleted. |
| `none` | integer (int32) | Output only. The number of instances in the managed instance group that are running and have no scheduled actions. |
| `queuing` | integer (int32) | Output only. The number of instances that the managed instance group is currently queuing. |
| `recreating` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be recreated or are currently being being recreated. Recreating an instance deletes the existing root persistent disk and creates a new disk from the image that is defined in the instance template. |
| `refreshing` | integer (int32) | Output only. The number of instances in the managed instance group that are being reconfigured with properties that do not require a restart or a recreate action. For example, setting or removing target pools for the instance. |
| `restarting` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be restarted or are currently being restarted. |
| `restartingInPlace` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be restarted or are currently being restarted. |
| `resuming` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be resumed or are currently being resumed. |
| `starting` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be started or are currently being started. |
| `stopping` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be stopped or are currently being stopped. |
| `suspending` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be suspended or are currently being suspended. |
| `verifying` | integer (int32) | Output only. The number of instances in the managed instance group that are being verified. See the managedInstances\[\].currentAction property in the listManagedInstances method documentation. |

### `InstanceGroupManagerActionsSummary` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `abandoning` | integer (int32) | Output only. The total number of instances in the managed instance group that are scheduled to be abandoned. Abandoning an instance removes it from the managed instance group without deleting it. |
| `adopting` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be adopted or are currently being adopted. |
| `creating` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be created or are currently being created. If the group fails to create any of these instances, it tries again until it creates the instance successfully. If you have disabled creation retries, this field will not be populated; instead, the creatingWithoutRetries field will be populated. |
| `creatingWithoutRetries` | integer (int32) | Output only. The number of instances that the managed instance group will attempt to create. The group attempts to create each instance only once. If the group fails to create any of these instances, it decreases the group's targetSize value accordingly. |
| `deleting` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be deleted or are currently being deleted. |
| `none` | integer (int32) | Output only. The number of instances in the managed instance group that are running and have no scheduled actions. |
| `recreating` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be recreated or are currently being being recreated. Recreating an instance deletes the existing root persistent disk and creates a new disk from the image that is defined in the instance template. |
| `refreshing` | integer (int32) | Output only. The number of instances in the managed instance group that are being reconfigured with properties that do not require a restart or a recreate action. For example, setting or removing target pools for the instance. |
| `restarting` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be restarted or are currently being restarted. |
| `restartingInPlace` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be restarted or are currently being restarted. |
| `resuming` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be resumed or are currently being resumed. |
| `starting` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be started or are currently being started. |
| `stopping` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be stopped or are currently being stopped. |
| `suspending` | integer (int32) | Output only. The number of instances in the managed instance group that are scheduled to be suspended or are currently being suspended. |
| `verifying` | integer (int32) | Output only. The number of instances in the managed instance group that are being verified. See the managedInstances\[\].currentAction property in the listManagedInstances method documentation. |

### `InstanceGroupManagerAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. Unique identifier for the resource; defined by the server. |
| `items` | object | A list of InstanceGroupManagersScopedList resources. |
| `kind` | string | Output only. The resource type, which is alwayscompute#instanceGroupManagerAggregatedList for an aggregated list of managed instance groups. |
| `nextPageToken` | string | Output only. This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. Unreachable resources. |
| `warning` | object | Output only. Informational warning message. |

### `InstanceGroupManagerAllInstancesConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `properties` | InstancePropertiesPatch | Properties to set on all instances in the group. You can add or modify properties using theinstanceGroupManagers.patch orregionInstanceGroupManagers.patch. After settingallInstancesConfig on the group, you must update the group's instances to apply the configuration. To apply the configuration, set the group's updatePolicy.type field to use proactive updates or use the applyUpdatesToInstances method. |

### `InstanceGroupManagerAutoHealingPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthCheck` | string | The URL for the health check that signals autohealing. |
| `initialDelaySec` | integer (int32) | The initial delay is the number of seconds that a new VM takes to initialize and run its startup script. During a VM's initial delay period, the MIG ignores unsuccessful health checks because the VM might be in the startup process. This prevents the MIG from prematurely recreating a VM. If the health check receives a healthy response during the initial delay, it indicates that the startup process is complete and the VM is ready. The value of initial delay must be between 0 and 3600 seconds. The default value is 0. |

### `InstanceGroupManagerAutoHealingPolicy` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `autoHealingTriggers` | InstanceGroupManagerAutoHealingPolicyAutoHealingTriggers | Restricts what triggers autohealing. |
| `healthCheck` | string | The URL for the health check that signals autohealing. |
| `initialDelaySec` | integer (int32) | The initial delay is the number of seconds that a new VM takes to initialize and run its startup script. During a VM's initial delay period, the MIG ignores unsuccessful health checks because the VM might be in the startup process. This prevents the MIG from prematurely recreating a VM. If the health check receives a healthy response during the initial delay, it indicates that the startup process is complete and the VM is ready. The value of initial delay must be between 0 and 3600 seconds. The default value is 0. |
| `maxUnavailable` | FixedOrPercent | Maximum number of instances that can be unavailable when autohealing. When 'percent' is used, the value is rounded if necessary. The instance is considered available if all of the following conditions are satisfied: 1. Instance's status is RUNNING. 2. Instance's currentAction is NONE (in particular its liveness health check result was observed to be HEALTHY at least once as it passed VERIFYING). 3. There is no outgoing action on an instance triggered by IGM. By default, number of concurrently autohealed instances is smaller than the managed instance group target size. However, if a zonal managed instance group has only one instance, or a regional managed instance group has only one instance per zone, autohealing will recreate these instances when they become unhealthy. |

### `InstanceGroupManagerAutoHealingPolicyAutoHealingTriggers`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `onHealthCheck` | string enum | If you have configured an application-based health check for the group, this field controls whether to trigger VM autohealing based on a failed health check. Valid values are: - ON (default): The group recreates running VMs that fail the application-based health check. - OFF: When set to OFF, you can still observe instance health state, but the group does not recreate VMs that fail the application-based health check. This is useful for troubleshooting and setting up your health check configuration. Values: `OFF`, `ON`. |

### `InstanceGroupManagerInstanceFlexibilityPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceSelections` | object | Named instance selections configuring properties that the group will use when creating new VMs. |

### `InstanceGroupManagerInstanceFlexibilityPolicy` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `constraints` | InstanceGroupManagerInstanceFlexibilityPolicyConstraints | Constraints applied to instance flexibility spreading and selection. |
| `instanceSelectionLists` | object | Named instance selections configuring properties that the group will use when creating new VMs. |
| `instanceSelections` | object | Named instance selections configuring properties that the group will use when creating new VMs. |
| `provisioningModelMix` | InstanceGroupManagerInstanceFlexibilityPolicyProvisioningModelMix | Provisioning model configuration used by this managed instance group to create instances. |

### `InstanceGroupManagerInstanceFlexibilityPolicy` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `constraints` | InstanceGroupManagerInstanceFlexibilityPolicyConstraints | Constraints applied to instance flexibility spreading and selection. |
| `instanceSelections` | object | Named instance selections configuring properties that the group will use when creating new VMs. |
| `provisioningModelMix` | InstanceGroupManagerInstanceFlexibilityPolicyProvisioningModelMix | Provisioning model configuration used by this managed instance group to create instances. |

### `InstanceGroupManagerInstanceFlexibilityPolicyConstraints`

- Constraints applied to instance flexibility spreading and selection.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `singleMachineType` | boolean | When set to true, all instances in the group will be provisioned with the exact same machine type, ensuring cluster homogeneity across zones. Defaults to false. |

### `InstanceGroupManagerInstanceFlexibilityPolicyInstanceSelection`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disks` | array<AttachedDisk> | List of disks to be attached to the instances created from this selection. |
| `machineTypes` | array<string> | Full machine-type names, e.g. "n1-standard-16". |
| `minCpuPlatform` | string | Name of the minimum CPU platform to be used by this instance selection. e.g. 'Intel Ice Lake'. |
| `rank` | integer (int32) | Preference of this instance selection. Lower number means higher preference. MIG will first try to create a VM based on the machine-type with lowest rank and fallback to next rank based on availability. Machine types and instance selections with the same rank have the same preference. |

### `InstanceGroupManagerInstanceFlexibilityPolicyProvisioningModelMix`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `standardCapacityBase` | integer (int32) | The base capacity that will always use Standard VMs to avoid risk of more preemption than the minimum capacity user needs. MIG will create only Standard VMs until it reaches standard_capacity_base and only then will start using standard_capacity_percent_above_base to mix Spot with Standard VMs. |
| `standardCapacityPercentAboveBase` | integer (int32) | The percentage of target capacity that should use Standard VM. The remaining percentage will use Spot VMs. The percentage applies only to the capacity above standard_capacity_base. |

### `InstanceGroupManagerInstanceLifecyclePolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultActionOnFailure` | string enum | The action that a MIG performs on a failed VM. If the value of the onFailedHealthCheck field is `DEFAULT_ACTION`, then the same action also applies to the VMs on which your application fails a health check. Valid values are - REPAIR (default): MIG automatically repairs a failed VM by recreating it. For more information, see About repairing VMs in a MIG. - DO_NOTHING: MIG does not repair a failed VM. Values: `DO_NOTHING`, `REPAIR`. |
| `forceUpdateOnRepair` | string enum | A bit indicating whether to forcefully apply the group's latest configuration when repairing a VM. Valid options are: - NO (default): If configuration updates are available, they are not forcefully applied during repair. Instead, configuration updates are applied according to the group's update policy. - YES: If configuration updates are available, they are applied during repair. Values: `NO`, `YES`. |
| `onFailedHealthCheck` | string enum | The action that a MIG performs on an unhealthy VM. A VM is marked as unhealthy when the application running on that VM fails a health check. Valid values are: - DEFAULT_ACTION (default): MIG uses the same action configured for instanceLifecyclePolicy.defaultActionOnFailure field. - REPAIR: MIG automatically repairs an unhealthy VM by recreating it. - DO_NOTHING: MIG doesn't repair an unhealthy VM. For more information, see About repairing VMs in a MIG. Values: `DEFAULT_ACTION`, `DO_NOTHING`, `REPAIR`. |
| `onRepair` | InstanceGroupManagerInstanceLifecyclePolicyOnRepair | Configuration for VM repairs in the MIG. |

### `InstanceGroupManagerInstanceLifecyclePolicy` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `defaultActionOnFailure` | string enum | The action that a MIG performs on a failed VM. If the value of the onFailedHealthCheck field is `DEFAULT_ACTION`, then the same action also applies to the VMs on which your application fails a health check. Valid values are - REPAIR (default): MIG automatically repairs a failed VM by recreating it. For more information, see About repairing VMs in a MIG. - DO_NOTHING: MIG does not repair a failed VM. Values: `DELETE`, `DO_NOTHING`, `REPAIR`. |
| `forceUpdateOnRepair` | string enum | A bit indicating whether to forcefully apply the group's latest configuration when repairing a VM. Valid options are: - NO (default): If configuration updates are available, they are not forcefully applied during repair. Instead, configuration updates are applied according to the group's update policy. - YES: If configuration updates are available, they are applied during repair. Values: `NO`, `YES`. |
| `metadataBasedReadinessSignal` | InstanceGroupManagerInstanceLifecyclePolicyMetadataBasedReadinessSignal | The configuration for metadata based readiness signal sent by the instance during initialization when stopping / suspending an instance. The Instance Group Manager will wait for a signal that indicates successful initialization before stopping / suspending an instance. If a successful readiness signal is not sent before timeout, the corresponding instance will not be stopped / suspended. Instead, an error will be visible in the lastAttempt.errors field of the managed instance in the listmanagedinstances method. If metadataBasedReadinessSignal.timeoutSec is unset, the Instance Group Manager will directly proceed to suspend / stop instances, skipping initialization on them. |
| `onFailedHealthCheck` | string enum | The action that a MIG performs on an unhealthy VM. A VM is marked as unhealthy when the application running on that VM fails a health check. Valid values are: - DEFAULT_ACTION (default): MIG uses the same action configured for instanceLifecyclePolicy.defaultActionOnFailure field. - REPAIR: MIG automatically repairs an unhealthy VM by recreating it. - DO_NOTHING: MIG doesn't repair an unhealthy VM. For more information, see About repairing VMs in a MIG. Values: `DEFAULT_ACTION`, `DO_NOTHING`, `REPAIR`. |
| `onRepair` | InstanceGroupManagerInstanceLifecyclePolicyOnRepair | Configuration for VM repairs in the MIG. |

### `InstanceGroupManagerInstanceLifecyclePolicyMetadataBasedReadinessSignal`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `timeoutSec` | integer (int32) | The number of seconds to wait for a readiness signal during initialization before timing out. |

### `InstanceGroupManagerInstanceLifecyclePolicyOnRepair`

- Configuration for VM repairs in the MIG.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowChangingZone` | string enum | Specifies whether the MIG can change a VM's zone during a repair. Valid values are: - NO (default): MIG cannot change a VM's zone during a repair. - YES: MIG can select a different zone for the VM during a repair. Values: `NO`, `YES`. |

### `InstanceGroupManagerList`

- \[Output Only\] A list of managed instance groups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. Unique identifier for the resource; defined by the server. |
| `items` | array<InstanceGroupManager> | A list of InstanceGroupManager resources. |
| `kind` | string | Output only. The resource type, which is always compute#instanceGroupManagerList for a list of managed instance groups. |
| `nextPageToken` | string | Output only. This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. Server-defined URL for this resource. |
| `warning` | object | Output only. Informational warning message. |

### `InstanceGroupManagerParams`

- Input only additional params for instance group manager creation.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Input only. Resource manager tags to bind to the managed instance group. The tags are key-value pairs. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/456` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. For more information, seeManage tags for resources. |

### `InstanceGroupManagerResizeRequest`

- InstanceGroupManagerResizeRequest represents a request to create a number of VMs: either immediately or by queuing the request for the specified time. This resize request is nested under InstanceGroupManager and the VMs created by this request are added to the owning InstanceGroupManager.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. The creation timestamp for this resize request inRFC3339 text format. |
| `description` | string | An optional description of this resource. |
| `id` | string (uint64) | Output only. A unique identifier for this resource type. The server generates this identifier. |
| `instances` | array<PerInstanceConfig> | The names of instances to be created by this resize request. The number of names specified determines the number of instances to create. The group's target size will be increased by this number. This field cannot be used together with 'resize_by'. |
| `kind` | string | Output only. The resource type, which is alwayscompute#instanceGroupManagerResizeRequest for resize requests. |
| `name` | string | The name of this resize request. The name must be 1-63 characters long, and comply withRFC1035. |
| `region` | string | Output only. The URL of a region where the resize request is located. Populated only for regional resize requests. |
| `requestedRunDuration` | Duration | Requested run duration for instances that will be created by this request. At the end of the run duration instance will be deleted. |
| `resizeBy` | integer (int32) | The number of instances to be created by this resize request. The group's target size will be increased by this number. This field cannot be used together with 'instances'. |
| `selfLink` | string | Output only. The URL for this resize request. The server defines this URL. |
| `selfLinkWithId` | string | Output only. Server-defined URL for this resource with the resource id. |
| `state` | string enum | Output only. Current state of the request. Values: `ACCEPTED`, `CANCELLED`, `CREATING`, `FAILED`, `STATE_UNSPECIFIED`, `SUCCEEDED`. |
| `status` | InstanceGroupManagerResizeRequestStatus | Output only. Status of the request. |
| `zone` | string | Output only. The URL of a zone where the resize request is located. Populated only for zonal resize requests. |

### `InstanceGroupManagerResizeRequest` (alpha)

- InstanceGroupManagerResizeRequest represents a request to create a number of VMs: either immediately or by queuing the request for the specified time. This resize request is nested under InstanceGroupManager and the VMs created by this request are added to the owning InstanceGroupManager.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `count` | integer (int32) | This field is deprecated, please use resize_by instead. The count of instances to create as part of this resize request. |
| `creationTimestamp` | string | Output only. The creation timestamp for this resize request inRFC3339 text format. |
| `description` | string | An optional description of this resource. |
| `id` | string (uint64) | Output only. A unique identifier for this resource type. The server generates this identifier. |
| `instances` | array<PerInstanceConfig> | The names of instances to be created by this resize request. The number of names specified determines the number of instances to create. The group's target size will be increased by this number. This field cannot be used together with 'resize_by'. |
| `kind` | string | Output only. The resource type, which is alwayscompute#instanceGroupManagerResizeRequest for resize requests. |
| `name` | string | The name of this resize request. The name must be 1-63 characters long, and comply withRFC1035. |
| `queuingPolicy` | QueuingPolicy | This field is deprecated, ResizeRequests would not be provisioned immediately and would stay in the queue until explicitly cancelled. When set, defines queing parameters for the requested deferred capacity. When unset, the request starts provisioning immediately, or fails if immediate provisioning is not possible. |
| `region` | string | Output only. The URL of a region where the resize request is located. Populated only for regional resize requests. |
| `requestedRunDuration` | Duration | Requested run duration for instances that will be created by this request. At the end of the run duration instance will be deleted. |
| `resizeBy` | integer (int32) | The number of instances to be created by this resize request. The group's target size will be increased by this number. This field cannot be used together with 'instances'. |
| `selfLink` | string | Output only. The URL for this resize request. The server defines this URL. |
| `selfLinkWithId` | string | Output only. Server-defined URL for this resource with the resource id. |
| `state` | string enum | Output only. Current state of the request. Values: `ACCEPTED`, `CANCELLED`, `CREATING`, `DELETING`, `FAILED`, `PROVISIONING`, `STATE_UNSPECIFIED`, `SUCCEEDED`. |
| `status` | InstanceGroupManagerResizeRequestStatus | Output only. Status of the request. |
| `zone` | string | Output only. The URL of a zone where the resize request is located. Populated only for zonal resize requests. |

### `InstanceGroupManagerResizeRequest` (beta)

- InstanceGroupManagerResizeRequest represents a request to create a number of VMs: either immediately or by queuing the request for the specified time. This resize request is nested under InstanceGroupManager and the VMs created by this request are added to the owning InstanceGroupManager.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `count` | integer (int32) | This field is deprecated, please use resize_by instead. The count of instances to create as part of this resize request. |
| `creationTimestamp` | string | Output only. The creation timestamp for this resize request inRFC3339 text format. |
| `description` | string | An optional description of this resource. |
| `id` | string (uint64) | Output only. A unique identifier for this resource type. The server generates this identifier. |
| `instances` | array<PerInstanceConfig> | The names of instances to be created by this resize request. The number of names specified determines the number of instances to create. The group's target size will be increased by this number. This field cannot be used together with 'resize_by'. |
| `kind` | string | Output only. The resource type, which is alwayscompute#instanceGroupManagerResizeRequest for resize requests. |
| `name` | string | The name of this resize request. The name must be 1-63 characters long, and comply withRFC1035. |
| `region` | string | Output only. The URL of a region where the resize request is located. Populated only for regional resize requests. |
| `requestedRunDuration` | Duration | Requested run duration for instances that will be created by this request. At the end of the run duration instance will be deleted. |
| `resizeBy` | integer (int32) | The number of instances to be created by this resize request. The group's target size will be increased by this number. This field cannot be used together with 'instances'. |
| `selfLink` | string | Output only. The URL for this resize request. The server defines this URL. |
| `selfLinkWithId` | string | Output only. Server-defined URL for this resource with the resource id. |
| `state` | string enum | Output only. Current state of the request. Values: `ACCEPTED`, `CANCELLED`, `CREATING`, `FAILED`, `PROVISIONING`, `STATE_UNSPECIFIED`, `SUCCEEDED`. |
| `status` | InstanceGroupManagerResizeRequestStatus | Output only. Status of the request. |
| `zone` | string | Output only. The URL of a zone where the resize request is located. Populated only for zonal resize requests. |

### `InstanceGroupManagerResizeRequestStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | object | Output only. Fatal errors encountered during the queueing or provisioning phases of the ResizeRequest that caused the transition to the FAILED state. Contrary to the last_attempt errors, this field is final and errors are never removed from here, as the ResizeRequest is not going to retry. |
| `lastAttempt` | InstanceGroupManagerResizeRequestStatusLastAttempt | Output only. Information about the last attempt to fulfill the request. The value is temporary since the ResizeRequest can retry, as long as it's still active and the last attempt value can either be cleared or replaced with a different error. Since ResizeRequest retries infrequently, the value may be stale and no longer show an active problem. The value is cleared when ResizeRequest transitions to the final state (becomes inactive). If the final state is FAILED the error describing it will be stored in the "error" field only. |

### `InstanceGroupManagerResizeRequestStatus` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `error` | object | Output only. Fatal errors encountered during the queueing or provisioning phases of the ResizeRequest that caused the transition to the FAILED state. Contrary to the last_attempt errors, this field is final and errors are never removed from here, as the ResizeRequest is not going to retry. |
| `lastAttempt` | InstanceGroupManagerResizeRequestStatusLastAttempt | Output only. Information about the last attempt to fulfill the request. The value is temporary since the ResizeRequest can retry, as long as it's still active and the last attempt value can either be cleared or replaced with a different error. Since ResizeRequest retries infrequently, the value may be stale and no longer show an active problem. The value is cleared when ResizeRequest transitions to the final state (becomes inactive). If the final state is FAILED the error describing it will be stored in the "error" field only. |
| `queuingPolicy` | QueuingPolicy | Output only. This field is deprecated, setting queueing policy is no longer supported. Constraints for the time when the instances start provisioning. Always exposed as absolute time. |

### `InstanceGroupManagerResizeRequestStatusLastAttempt`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | object | Output only. Errors that prevented the ResizeRequest to be fulfilled. |

### `InstanceGroupManagerResizeRequestsListResponse`

- \[Output Only\] A list of resize requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. Unique identifier for the resource; defined by the server. |
| `items` | array<InstanceGroupManagerResizeRequest> | A list of resize request resources. |
| `kind` | string | Output only. Type of the resource. Alwayscompute#instanceGroupManagerResizeRequestList for a list of resize requests. |
| `nextPageToken` | string | Output only. This token allows you to get the next page of results for list requests. If the number of results is larger than maxResults, use thenextPageToken as a value for the query parameterpageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. Server-defined URL for this resource. |
| `warning` | object | Output only. Informational warning message. |

### `InstanceGroupManagerResourcePolicies`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `workloadPolicy` | string | The URL of the workload policy that is specified for this managed instance group. It can be a full or partial URL. For example, the following are all valid URLs to a workload policy: - https://www.googleapis.com/compute/v1/projects/project/regions/region/resourcePolicies/resourcePolicy - projects/project/regions/region/resourcePolicies/resourcePolicy - regions/region/resourcePolicies/resourcePolicy |

### `InstanceGroupManagerStandbyPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `initialDelaySec` | integer (int32) | Specifies the number of seconds that the MIG should wait to suspend or stop a VM after that VM was created. The initial delay gives the initialization script the time to prepare your VM for a quick scale out. The value of initial delay must be between 0 and 3600 seconds. The default value is 0. |
| `mode` | string enum | Defines how a MIG resumes or starts VMs from a standby pool when the group scales out. The default mode is `MANUAL`. Values: `MANUAL`, `SCALE_OUT_POOL`. |

### `InstanceGroupManagerStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allInstancesConfig` | InstanceGroupManagerStatusAllInstancesConfig | Output only. Status of all-instances configuration on the group. |
| `appliedAcceleratorTopologies` | array<InstanceGroupManagerStatusAcceleratorTopology> | Output only. The accelerator topology applied to this MIG. Currently only one accelerator topology is supported. |
| `autoscaler` | string | Output only. The URL of theAutoscaler that targets this instance group manager. |
| `bulkInstanceOperation` | InstanceGroupManagerStatusBulkInstanceOperation | Output only. The status of bulk instance operation. |
| `currentInstanceStatuses` | InstanceGroupManagerStatusInstanceStatusSummary | Output only. The list of instance statuses and the number of instances in this managed instance group that have the status. Currently only shown for TPU MIGs |
| `isStable` | boolean | Output only. A bit indicating whether the managed instance group is in a stable state. A stable state means that: none of the instances in the managed instance group is currently undergoing any type of change (for example, creation, restart, or deletion); no future changes are scheduled for instances in the managed instance group; and the managed instance group itself is not being modified. |
| `stateful` | InstanceGroupManagerStatusStateful | Output only. Stateful status of the given Instance Group Manager. |
| `versionTarget` | InstanceGroupManagerStatusVersionTarget | Output only. A status of consistency of Instances' versions with their target version specified by version field on Instance Group Manager. |

### `InstanceGroupManagerStatusAcceleratorTopology`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorTopology` | string | Output only. Topology in the format of: "16x16", "4x4x4", etc. The value is the same as configured in the WorkloadPolicy. |
| `state` | string enum | Output only. The state of the accelerator topology. Values: `ACTIVATING`, `ACTIVE`, `ACTIVE_DEGRADED`, `DEACTIVATING`, `FAILED`, `INCOMPLETE`, `REACTIVATING`. |
| `stateDetails` | InstanceGroupManagerStatusAcceleratorTopologyAcceleratorTopologyStateDetails | Output only. The result of the latest accelerator topology state check. |

### `InstanceGroupManagerStatusAcceleratorTopologyAcceleratorTopologyStateDetails`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | object | Output only. Encountered errors. |
| `timestamp` | string (google-datetime) | Output only. Timestamp is shown only if there is an error. The field has // RFC3339 // text format. |

### `InstanceGroupManagerStatusAllInstancesConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentRevision` | string | Output only. Current all-instances configuration revision. This value is in RFC3339 text format. |
| `effective` | boolean | Output only. A bit indicating whether this configuration has been applied to all managed instances in the group. |

### `InstanceGroupManagerStatusBulkInstanceOperation`

- Bulk instance operation is the creation of VMs in a MIG when the targetSizePolicy.mode is set to BULK.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inProgress` | boolean | Output only. Informs whether bulk instance operation is in progress. |
| `lastProgressCheck` | InstanceGroupManagerStatusBulkInstanceOperationLastProgressCheck | Output only. Information from the last progress check of bulk instance operation. |

### `InstanceGroupManagerStatusBulkInstanceOperationLastProgressCheck`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | object | Output only. Errors encountered during bulk instance operation. |
| `timestamp` | string (google-datetime) | Output only. Timestamp of the last progress check of bulk instance operation. Timestamp is in RFC3339 text format. |

### `InstanceGroupManagerStatusInstanceStatusSummary`

- The list of instance statuses and the number of instances in this managed instance group that have the status. For more information about how to interpret each status check the instance lifecycle documentation. Currently only shown for TPU MIGs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deprovisioning` | integer (int32) | Output only. The number of instances in the managed instance group that have DEPROVISIONING status. |
| `nonExistent` | integer (int32) | Output only. The number of instances that have not been created yet or have been deleted. Includes only instances that would be shown in the listManagedInstances method and not all instances that have been deleted in the lifetime of the MIG. Does not include FlexStart instances that are waiting for the resources availability, they are considered as 'pending'. |
| `pending` | integer (int32) | Output only. The number of instances in the managed instance group that have PENDING status, that is FlexStart instances that are waiting for resources. Instances that do not exist because of the other reasons are counted as 'non_existent'. |
| `pendingStop` | integer (int32) | Output only. The number of instances in the managed instance group that have PENDING_STOP status. |
| `provisioning` | integer (int32) | Output only. The number of instances in the managed instance group that have PROVISIONING status. |
| `repairing` | integer (int32) | Output only. The number of instances in the managed instance group that have REPAIRING status. |
| `running` | integer (int32) | Output only. The number of instances in the managed instance group that have RUNNING status. |
| `staging` | integer (int32) | Output only. The number of instances in the managed instance group that have STAGING status. |
| `stopped` | integer (int32) | Output only. The number of instances in the managed instance group that have STOPPED status. |
| `stopping` | integer (int32) | Output only. The number of instances in the managed instance group that have STOPPING status. |
| `suspended` | integer (int32) | Output only. The number of instances in the managed instance group that have SUSPENDED status. |
| `suspending` | integer (int32) | Output only. The number of instances in the managed instance group that have SUSPENDING status. |
| `terminated` | integer (int32) | Output only. The number of instances in the managed instance group that have TERMINATED status. |

### `InstanceGroupManagerStatusStateful`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hasStatefulConfig` | boolean | Output only. A bit indicating whether the managed instance group has stateful configuration, that is, if you have configured any items in a stateful policy or in per-instance configs. The group might report that it has no stateful configuration even when there is still some preserved state on a managed instance, for example, if you have deleted all PICs but not yet applied those deletions. |
| `perInstanceConfigs` | InstanceGroupManagerStatusStatefulPerInstanceConfigs | Output only. Status of per-instance configurations on the instances. |

### `InstanceGroupManagerStatusStateful` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `hasStatefulConfig` | boolean | Output only. A bit indicating whether the managed instance group has stateful configuration, that is, if you have configured any items in a stateful policy or in per-instance configs. The group might report that it has no stateful configuration even when there is still some preserved state on a managed instance, for example, if you have deleted all PICs but not yet applied those deletions. |
| `isStateful` | boolean | Output only. A bit indicating whether the managed instance group has stateful configuration, that is, if you have configured any items in a stateful policy or in per-instance configs. The group might report that it has no stateful configuration even when there is still some preserved state on a managed instance, for example, if you have deleted all PICs but not yet applied those deletions. This field is deprecated in favor of has_stateful_config. |
| `perInstanceConfigs` | InstanceGroupManagerStatusStatefulPerInstanceConfigs | Output only. Status of per-instance configurations on the instances. |

### `InstanceGroupManagerStatusStatefulPerInstanceConfigs`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allEffective` | boolean | Output only. A bit indicating if all of the group's per-instance configurations (listed in the output of a listPerInstanceConfigs API call) have status EFFECTIVE or there are no per-instance-configs. |

### `InstanceGroupManagerStatusVersionTarget`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isReached` | boolean | Output only. A bit indicating whether version target has been reached in this managed instance group, i.e. all instances are in their target version. Instances' target version are specified byversion field on Instance Group Manager. |

### `InstanceGroupManagerTargetSizePolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | The mode of target size policy based on which the MIG creates its VMs individually or all at once. Values: `BULK`, `INDIVIDUAL`, `UNSPECIFIED_MODE`. |

### `InstanceGroupManagerUpdatePolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceRedistributionType` | string enum | The instance redistribution policy for regional managed instance groups. Valid values are: - PROACTIVE (default): The group attempts to maintain an even distribution of VM instances across zones in the region. - NONE: For non-autoscaled groups, proactive redistribution is disabled. Values: `NONE`, `PROACTIVE`. |
| `maxSurge` | FixedOrPercent | The maximum number of instances that can be created above the specifiedtargetSize during the update process. This value can be either a fixed number or, if the group has 10 or more instances, a percentage. If you set a percentage, the number of instances is rounded if necessary. The default value for maxSurge is a fixed value equal to the number of zones in which the managed instance group operates. At least one of either maxSurge ormaxUnavailable must be greater than 0. Learn more about maxSurge. |
| `maxUnavailable` | FixedOrPercent | The maximum number of instances that can be unavailable during the update process. An instance is considered available if all of the following conditions are satisfied: - The instance's status is RUNNING. - If there is a health check on the instance group, the instance's health check status must be HEALTHY at least once. If there is no health check on the group, then the instance only needs to have a status of RUNNING to be considered available. This value can be either a fixed number or, if the group has 10 or more instances, a percentage. If you set a percentage, the number of instances is rounded if necessary. The default value formaxUnavailable is a fixed value equal to the number of zones in which the managed instance group operates. At least one of either maxSurge ormaxUnavailable must be greater than 0. Learn more about maxUnavailable. |
| `minimalAction` | string enum | Minimal action to be taken on an instance. Use this option to minimize disruption as much as possible or to apply a more disruptive action than is necessary. - To limit disruption as much as possible, set the minimal action toREFRESH. If your update requires a more disruptive action, Compute Engine performs the necessary action to execute the update. - To apply a more disruptive action than is strictly necessary, set the minimal action to RESTART or REPLACE. For example, Compute Engine does not need to restart a VM to change its metadata. But if your application reads instance metadata only when a VM is restarted, you can set the minimal action to RESTART in order to pick up metadata changes. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`. |
| `mostDisruptiveAllowedAction` | string enum | Most disruptive action that is allowed to be taken on an instance. You can specify either NONE to forbid any actions,REFRESH to avoid restarting the VM and to limit disruption as much as possible. RESTART to allow actions that can be applied without instance replacing or REPLACE to allow all possible actions. If the Updater determines that the minimal update action needed is more disruptive than most disruptive allowed action you specify it will not perform the update at all. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`. |
| `replacementMethod` | string enum | What action should be used to replace instances. See minimal_action.REPLACE Values: `RECREATE`, `SUBSTITUTE`. |
| `type` | string enum | The type of update process. You can specify either PROACTIVE so that the MIG automatically updates VMs to the latest configurations orOPPORTUNISTIC so that you can select the VMs that you want to update. Values: `OPPORTUNISTIC`, `PROACTIVE`. |

### `InstanceGroupManagerUpdatePolicy` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `allowedActions` | array<string> | Actions that are allowed to update instances within MIG. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `instanceRedistributionType` | string enum | The instance redistribution policy for regional managed instance groups. Valid values are: - PROACTIVE (default): The group attempts to maintain an even distribution of VM instances across zones in the region. - NONE: For non-autoscaled groups, proactive redistribution is disabled. Values: `NONE`, `PROACTIVE`. |
| `maxSurge` | FixedOrPercent | The maximum number of instances that can be created above the specifiedtargetSize during the update process. This value can be either a fixed number or, if the group has 10 or more instances, a percentage. If you set a percentage, the number of instances is rounded if necessary. The default value for maxSurge is a fixed value equal to the number of zones in which the managed instance group operates. At least one of either maxSurge ormaxUnavailable must be greater than 0. Learn more about maxSurge. |
| `maxUnavailable` | FixedOrPercent | The maximum number of instances that can be unavailable during the update process. An instance is considered available if all of the following conditions are satisfied: - The instance's status is RUNNING. - If there is a health check on the instance group, the instance's health check status must be HEALTHY at least once. If there is no health check on the group, then the instance only needs to have a status of RUNNING to be considered available. This value can be either a fixed number or, if the group has 10 or more instances, a percentage. If you set a percentage, the number of instances is rounded if necessary. The default value formaxUnavailable is a fixed value equal to the number of zones in which the managed instance group operates. At least one of either maxSurge ormaxUnavailable must be greater than 0. Learn more about maxUnavailable. |
| `minReadySec` | integer (int32) | Minimum number of seconds to wait for after a newly created instance becomes available. This value must be from range \[0, 3600\]. |
| `minimalAction` | string enum | Minimal action to be taken on an instance. Use this option to minimize disruption as much as possible or to apply a more disruptive action than is necessary. - To limit disruption as much as possible, set the minimal action toREFRESH. If your update requires a more disruptive action, Compute Engine performs the necessary action to execute the update. - To apply a more disruptive action than is strictly necessary, set the minimal action to RESTART or REPLACE. For example, Compute Engine does not need to restart a VM to change its metadata. But if your application reads instance metadata only when a VM is restarted, you can set the minimal action to RESTART in order to pick up metadata changes. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `mostDisruptiveAllowedAction` | string enum | Most disruptive action that is allowed to be taken on an instance. You can specify either NONE to forbid any actions,REFRESH to avoid restarting the VM and to limit disruption as much as possible. RESTART to allow actions that can be applied without instance replacing or REPLACE to allow all possible actions. If the Updater determines that the minimal update action needed is more disruptive than most disruptive allowed action you specify it will not perform the update at all. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `replacementMethod` | string enum | What action should be used to replace instances. See minimal_action.REPLACE Values: `RECREATE`, `SUBSTITUTE`. |
| `type` | string enum | The type of update process. You can specify either PROACTIVE so that the MIG automatically updates VMs to the latest configurations orOPPORTUNISTIC so that you can select the VMs that you want to update. Values: `OPPORTUNISTIC`, `PROACTIVE`. |

### `InstanceGroupManagerUpdatePolicy` (preview)

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `allowedActions` | array<string> | Actions that are allowed to update instances within MIG. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `instanceRedistributionType` | string enum | The instance redistribution policy for regional managed instance groups. Valid values are: - PROACTIVE (default): The group attempts to maintain an even distribution of VM instances across zones in the region. - NONE: For non-autoscaled groups, proactive redistribution is disabled. Values: `NONE`, `PROACTIVE`. |
| `maxSurge` | FixedOrPercent | The maximum number of instances that can be created above the specifiedtargetSize during the update process. This value can be either a fixed number or, if the group has 10 or more instances, a percentage. If you set a percentage, the number of instances is rounded if necessary. The default value for maxSurge is a fixed value equal to the number of zones in which the managed instance group operates. At least one of either maxSurge ormaxUnavailable must be greater than 0. Learn more about maxSurge. |
| `maxUnavailable` | FixedOrPercent | The maximum number of instances that can be unavailable during the update process. An instance is considered available if all of the following conditions are satisfied: - The instance's status is RUNNING. - If there is a health check on the instance group, the instance's health check status must be HEALTHY at least once. If there is no health check on the group, then the instance only needs to have a status of RUNNING to be considered available. This value can be either a fixed number or, if the group has 10 or more instances, a percentage. If you set a percentage, the number of instances is rounded if necessary. The default value formaxUnavailable is a fixed value equal to the number of zones in which the managed instance group operates. At least one of either maxSurge ormaxUnavailable must be greater than 0. Learn more about maxUnavailable. |
| `minimalAction` | string enum | Minimal action to be taken on an instance. Use this option to minimize disruption as much as possible or to apply a more disruptive action than is necessary. - To limit disruption as much as possible, set the minimal action toREFRESH. If your update requires a more disruptive action, Compute Engine performs the necessary action to execute the update. - To apply a more disruptive action than is strictly necessary, set the minimal action to RESTART or REPLACE. For example, Compute Engine does not need to restart a VM to change its metadata. But if your application reads instance metadata only when a VM is restarted, you can set the minimal action to RESTART in order to pick up metadata changes. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `mostDisruptiveAllowedAction` | string enum | Most disruptive action that is allowed to be taken on an instance. You can specify either NONE to forbid any actions,REFRESH to avoid restarting the VM and to limit disruption as much as possible. RESTART to allow actions that can be applied without instance replacing or REPLACE to allow all possible actions. If the Updater determines that the minimal update action needed is more disruptive than most disruptive allowed action you specify it will not perform the update at all. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `replacementMethod` | string enum | What action should be used to replace instances. See minimal_action.REPLACE Values: `RECREATE`, `SUBSTITUTE`. |
| `type` | string enum | The type of update process. You can specify either PROACTIVE so that the MIG automatically updates VMs to the latest configurations orOPPORTUNISTIC so that you can select the VMs that you want to update. Values: `OPPORTUNISTIC`, `PROACTIVE`. |

### `InstanceGroupManagerVersion`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceTemplate` | string | The URL of the instance template that is specified for this managed instance group. The group uses this template to create new instances in the managed instance group until the `targetSize` for this version is reached. The templates for existing instances in the group do not change unless you run recreateInstances, runapplyUpdatesToInstances, or set the group'supdatePolicy.type to PROACTIVE; in those cases, existing instances are updated until the `targetSize` for this version is reached. |
| `name` | string | Name of the version. Unique among all versions in the scope of this managed instance group. |
| `targetSize` | FixedOrPercent | Specifies the intended number of instances to be created from theinstanceTemplate. The final number of instances created from the template will be equal to: - If expressed as a fixed number, the minimum of either targetSize.fixed or instanceGroupManager.targetSize is used. - if expressed as a percent, the targetSize would be (targetSize.percent/100 \* InstanceGroupManager.targetSize) If there is a remainder, the number is rounded. If unset, this version will update any remaining instances not updated by another version. ReadStarting a canary update for more information. |

### `InstanceGroupManagerVersion` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `instanceTemplate` | string | The URL of the instance template that is specified for this managed instance group. The group uses this template to create new instances in the managed instance group until the `targetSize` for this version is reached. The templates for existing instances in the group do not change unless you run recreateInstances, runapplyUpdatesToInstances, or set the group'supdatePolicy.type to PROACTIVE; in those cases, existing instances are updated until the `targetSize` for this version is reached. |
| `name` | string | Name of the version. Unique among all versions in the scope of this managed instance group. |
| `tag` | string | Tag describing the version. Used to trigger rollout of a target version even if instance_template remains unchanged. Deprecated in favor of 'name'. |
| `targetSize` | FixedOrPercent | Specifies the intended number of instances to be created from theinstanceTemplate. The final number of instances created from the template will be equal to: - If expressed as a fixed number, the minimum of either targetSize.fixed or instanceGroupManager.targetSize is used. - if expressed as a percent, the targetSize would be (targetSize.percent/100 \* InstanceGroupManager.targetSize) If there is a remainder, the number is rounded. If unset, this version will update any remaining instances not updated by another version. ReadStarting a canary update for more information. |

### `InstanceGroupManagersAbandonInstancesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<string> | The URLs of one or more instances to abandon. This can be a full URL or a partial URL, such as zones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |

### `InstanceGroupManagersApplyUpdatesRequest`

- InstanceGroupManagers.applyUpdatesToInstances
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allInstances` | boolean | Flag to update all instances instead of specified list of "instances". If the flag is set to true then the instances may not be specified in the request. |
| `instances` | array<string> | The list of URLs of one or more instances for which you want to apply updates. Each URL can be a full URL or a partial URL, such aszones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |
| `minimalAction` | string enum | The minimal action that you want to perform on each instance during the update: - REPLACE: At minimum, delete the instance and create it again. - RESTART: Stop the instance and start it again. - REFRESH: Do not stop the instance and limit disruption as much as possible. - NONE: Do not disrupt the instance at all. By default, the minimum action is NONE. If your update requires a more disruptive action than you set with this flag, the necessary action is performed to execute the update. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`. |
| `mostDisruptiveAllowedAction` | string enum | The most disruptive action that you want to perform on each instance during the update: - REPLACE: Delete the instance and create it again. - RESTART: Stop the instance and start it again. - REFRESH: Do not stop the instance and limit disruption as much as possible. - NONE: Do not disrupt the instance at all. By default, the most disruptive allowed action is REPLACE. If your update requires a more disruptive action than you set with this flag, the update request will fail. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`. |

### `InstanceGroupManagersApplyUpdatesRequest` (alpha)

- InstanceGroupManagers.applyUpdatesToInstances
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `allInstances` | boolean | Flag to update all instances instead of specified list of "instances". If the flag is set to true then the instances may not be specified in the request. |
| `allowedActions` | array<string> | Actions that are allowed to update instances within MIG. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `instances` | array<string> | The list of URLs of one or more instances for which you want to apply updates. Each URL can be a full URL or a partial URL, such aszones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |
| `maximalAction` | string enum | The maximal action that should be performed on the instances. By default REPLACE. This field is deprecated, please use most_disruptive_allowed_action. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `minimalAction` | string enum | The minimal action that you want to perform on each instance during the update: - REPLACE: At minimum, delete the instance and create it again. - RESTART: Stop the instance and start it again. - REFRESH: Do not stop the instance and limit disruption as much as possible. - NONE: Do not disrupt the instance at all. By default, the minimum action is NONE. If your update requires a more disruptive action than you set with this flag, the necessary action is performed to execute the update. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `mostDisruptiveAllowedAction` | string enum | The most disruptive action that you want to perform on each instance during the update: - REPLACE: Delete the instance and create it again. - RESTART: Stop the instance and start it again. - REFRESH: Do not stop the instance and limit disruption as much as possible. - NONE: Do not disrupt the instance at all. By default, the most disruptive allowed action is REPLACE. If your update requires a more disruptive action than you set with this flag, the update request will fail. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |

### `InstanceGroupManagersApplyUpdatesRequest` (preview)

- InstanceGroupManagers.applyUpdatesToInstances
- Version: preview

| Field | Type | Description |
|---|---|---|
| `allInstances` | boolean | Flag to update all instances instead of specified list of "instances". If the flag is set to true then the instances may not be specified in the request. |
| `allowedActions` | array<string> | Actions that are allowed to update instances within MIG. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `instances` | array<string> | The list of URLs of one or more instances for which you want to apply updates. Each URL can be a full URL or a partial URL, such aszones/\[ZONE\]/instances/\[INSTANCE_NAME\]. |
| `minimalAction` | string enum | The minimal action that you want to perform on each instance during the update: - REPLACE: At minimum, delete the instance and create it again. - RESTART: Stop the instance and start it again. - REFRESH: Do not stop the instance and limit disruption as much as possible. - NONE: Do not disrupt the instance at all. By default, the minimum action is NONE. If your update requires a more disruptive action than you set with this flag, the necessary action is performed to execute the update. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |
| `mostDisruptiveAllowedAction` | string enum | The most disruptive action that you want to perform on each instance during the update: - REPLACE: Delete the instance and create it again. - RESTART: Stop the instance and start it again. - REFRESH: Do not stop the instance and limit disruption as much as possible. - NONE: Do not disrupt the instance at all. By default, the most disruptive allowed action is REPLACE. If your update requires a more disruptive action than you set with this flag, the update request will fail. Values: `NONE`, `REFRESH`, `REPLACE`, `RESTART`, `RESTART_IN_PLACE`. |

### `InstanceGroupManagersConfigureAcceleratorTopologiesRequest`

- InstanceGroupManagers.ConfigureAcceleratorTopologies
- Version: beta

| Field | Type | Description |
|---|---|---|
| `acceleratorTopologyActions` | object | Map of accelerator topologies that should have their state changed to the specified value. The key is the hashed topology locus id. It can be obtained from the GetAvailableAcceleratorTopologies rpc. |
| `acceleratorTopologyConfigurations` | object | Map of accelerator topologies that should have their state changed to the specified configuration. The map key is the hashed topology locus id. It can be obtained from the GetAvailableAcceleratorTopologies rpc. |

### `InstanceGroupManagersConfigureAcceleratorTopologiesRequestAcceleratorTopologyConfiguration`

- Configuration for a single accelerator topology.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `action` | string enum | — Values: `ACCELERATOR_TOPOLOGY_ACTION_UNSPECIFIED`, `ACTIVATE`, `DEACTIVATE`. |
| `externalId` | string | Identifier of the accelerator topology assigned externally to differentiate who is the owner of the topology. The format needs to conform to RFC1035 and be unique. The uniqueness is guaranteed by the requestor. If it is provided on activating the sub-slice it will have to be provided on deactivating as well. This identifier is cleared on successful deform of a sub-slice. |

### `InstanceGroupManagersCreateInstancesRequest`

- InstanceGroupManagers.createInstances
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<PerInstanceConfig> | \[Required\] List of specifications of per-instance configs. |

### Shape of `HttpHeaderOption`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "headerName": "string",
  "headerValue": "string",
  "replace": "boolean"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
