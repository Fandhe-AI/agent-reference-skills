---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services
---

# gcloud compute backend-services (part 2/5)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute backend-services create

```text
NAME
    gcloud compute backend-services create - create a backend service

SYNOPSIS
    gcloud compute backend-services create BACKEND_SERVICE_NAME
        [--affinity-cookie-name=AFFINITY_COOKIE_NAME]
        [--affinity-cookie-path=AFFINITY_COOKIE_PATH]
        [--affinity-cookie-ttl=AFFINITY_COOKIE_TTL]
        [--bypass-cache-on-request-headers=BYPASS_CACHE_ON_REQUEST_HEADERS]
        [--no-cache-key-include-host]
        [--cache-key-include-http-header=[HEADER_FIELD_NAME,...]]
        [--cache-key-include-named-cookie=[NAMED_COOKIE,...]]
        [--no-cache-key-include-protocol] [--no-cache-key-include-query-string]
        [--cache-mode=CACHE_MODE] [--client-ttl=CLIENT_TTL]
        [--compression-mode=COMPRESSION_MODE] [--connection-drain-on-failover]
        [--connection-draining-timeout=CONNECTION_DRAINING_TIMEOUT]
        [--connection-persistence-on-unhealthy-backends=CONNECTION_PERSISTENCE_ON_UNHEALTHY_BACKENDS]
        [--consistent-hash-http-header-name=CONSISTENT_HASH_HTTP_HEADER_NAME]
        [--consistent-hash-minimum-ring-size=CONSISTENT_HASH_MINIMUM_RING_SIZE]
        [--custom-request-header=CUSTOM_REQUEST_HEADER]
        [--custom-response-header=CUSTOM_RESPONSE_HEADER]
        [--default-ttl=DEFAULT_TTL] [--description=DESCRIPTION]
        [--drop-traffic-if-unhealthy] [--[no-]enable-cdn]
        [--[no-]enable-logging] [--[no-]enable-strong-affinity]
        [--failover-ratio=FAILOVER_RATIO]
        [--ha-policy-fast-ip-move=HA_POLICY_FAST_IP_MOVE]
        [--health-checks=HEALTH_CHECK,[...]]
        [--http-health-checks=HTTP_HEALTH_CHECK,[...]]
        [--https-health-checks=HTTPS_HEALTH_CHECK,[...]]
        [--iap=disabled|enabled,[oauth2-client-id=OAUTH2-CLIENT-ID,
          oauth2-client-secret=OAUTH2-CLIENT-SECRET]]
        [--idle-timeout-sec=IDLE_TIMEOUT_SEC]
        [--ip-address-selection-policy=IP_ADDRESS_SELECTION_POLICY]
        [--load-balancing-scheme=LOAD_BALANCING_SCHEME; default="EXTERNAL"]
        [--locality-lb-policy=LOCALITY_LB_POLICY]
        [--logging-http-request-headers=[LOGGING_HTTP_REQUEST_HEADERS,...]]
        [--logging-http-response-headers=[LOGGING_HTTP_RESPONSE_HEADERS,...]]
        [--logging-optional=LOGGING_OPTIONAL]
        [--logging-optional-fields=[LOGGING_OPTIONAL_FIELDS,...]]
        [--logging-sample-rate=LOGGING_SAMPLE_RATE]
        [--max-stream-duration=MAX_STREAM_DURATION] [--max-ttl=MAX_TTL]
        [--[no-]negative-caching] [--negative-caching-policy=[[CODE=TTL],...]]
        [--network=NETWORK] [--port-name=PORT_NAME] [--protocol=PROTOCOL]
        [--[no-]request-coalescing] [--resource-manager-tags=[KEY=VALUE,...]]
        [--serve-while-stale=SERVE_WHILE_STALE]
        [--service-bindings=SERVICE_BINDING,[...]]
        [--service-lb-policy=SERVICE_LOAD_BALANCING_POLICY]
        [--session-affinity=SESSION_AFFINITY]
        [--signed-url-cache-max-age=SIGNED_URL_CACHE_MAX_AGE]
        [--subsetting-policy=SUBSETTING_POLICY; default="NONE"]
        [--timeout=TIMEOUT; default="30s"] [--tracking-mode=TRACKING_MODE]
        [--zonal-affinity-spillover=ZONAL_AFFINITY_SPILLOVER]
        [--zonal-affinity-spillover-ratio=ZONAL_AFFINITY_SPILLOVER_RATIO]
        [--cache-key-query-string-blacklist=[QUERY_STRING,...]
          | --cache-key-query-string-whitelist=QUERY_STRING,[...]]
        [--circuit-breakers-max-connections=CIRCUIT_BREAKERS_MAX_CONNECTIONS
          --circuit-breakers-max-pending-requests=CIRCUIT_BREAKERS_MAX_PENDING_REQUESTS --circuit-breakers-max-requests=CIRCUIT_BREAKERS_MAX_REQUESTS --circuit-breakers-max-requests-per-connection=CIRCUIT_BREAKERS_MAX_REQUESTS_PER_CONNECTION --circuit-breakers-max-retries=CIRCUIT_BREAKERS_MAX_RETRIES]
        [--custom-metrics=[CUSTOM_METRICS,...]
          | --custom-metrics-file=[CUSTOM_METRICS,...]]
        [--global | --region=REGION]
        [--global-health-checks | --health-checks-region=HEALTH_CHECKS_REGION]
        [--identity=IDENTITY
          | --tls-settings=[authenticationConfig=AUTHENTICATIONCONFIG],
          [sni=SNI]]
        [--network-endpoint-group=NETWORK_ENDPOINT_GROUP
          : --global-network-endpoint-group
          | --network-endpoint-group-region=NETWORK_ENDPOINT_GROUP_REGION
          | --network-endpoint-group-zone=NETWORK_ENDPOINT_GROUP_ZONE]
        [--outlier-detection-base-ejection-time=OUTLIER_DETECTION_BASE_EJECTION_TIME --outlier-detection-consecutive-errors=OUTLIER_DETECTION_CONSECUTIVE_ERRORS --outlier-detection-consecutive-gateway-failure=OUTLIER_DETECTION_CONSECUTIVE_GATEWAY_FAILURE --outlier-detection-enforcing-consecutive-errors=OUTLIER_DETECTION_ENFORCING_CONSECUTIVE_ERRORS --outlier-detection-enforcing-consecutive-gateway-failure=OUTLIER_DETECTION_ENFORCING_CONSECUTIVE_GATEWAY_FAILURE --outlier-detection-enforcing-success-rate=OUTLIER_DETECTION_ENFORCING_SUCCESS_RATE --outlier-detection-interval=OUTLIER_DETECTION_INTERVAL --outlier-detection-max-ejection-percent=OUTLIER_DETECTION_MAX_EJECTION_PERCENT --outlier-detection-success-rate-minimum-hosts=OUTLIER_DETECTION_SUCCESS_RATE_MINIMUM_HOSTS --outlier-detection-success-rate-request-volume=OUTLIER_DETECTION_SUCCESS_RATE_REQUEST_VOLUME --outlier-detection-success-rate-stdev-factor=OUTLIER_DETECTION_SUCCESS_RATE_STDEV_FACTOR]
        [--security-settings-aws-v4-access-key=SECURITY_SETTINGS_AWS_V4_ACCESS_KEY --security-settings-aws-v4-access-key-id=SECURITY_SETTINGS_AWS_V4_ACCESS_KEY_ID --security-settings-aws-v4-access-key-version=SECURITY_SETTINGS_AWS_V4_ACCESS_KEY_VERSION --security-settings-aws-v4-origin-region=SECURITY_SETTINGS_AWS_V4_ORIGIN_REGION]
        [--security-settings-client-tls-policy=SECURITY_SETTINGS_CLIENT_TLS_POLICY --security-settings-subject-alt-names=[SUBJECT_ALT_NAME,
          ...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services create creates a backend service for a
    Google Cloud load balancer or Traffic Director. A backend service defines
    how to distribute traffic to backends. Depending on the load balancing
    scheme of the backend service, backends can be instance groups (managed or
    unmanaged), zonal network endpoint groups (zonal NEGs), serverless NEGs, or
    an internet NEG. For more information, see the backend services overview
    (https://cloud.google.com/load-balancing/docs/backend-service).

    After you create a backend service, you add backends by using gcloud
    compute backend-services add-backend or gcloud compute backend-services
    edit.

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to create.

FLAGS
     --affinity-cookie-name=AFFINITY_COOKIE_NAME
        If --session-affinity is set to HTTP_COOKIE or STRONG_COOKIE_AFFINITY,
        this flag sets the name of the cookie.

     --affinity-cookie-path=AFFINITY_COOKIE_PATH
        If --session-affinity is set to HTTP_COOKIE or STRONG_COOKIE_AFFINITY,
        this flag sets the path of the cookie.

     --affinity-cookie-ttl=AFFINITY_COOKIE_TTL
        If --session-affinity is set to GENERATED_COOKIE, HTTP_COOKIE, or
        STRONG_COOKIE_AFFINITY, this flag sets the TTL, in seconds, of the
        resulting cookie. A setting of 0 indicates that the cookie should be a
        session cookie. See $ gcloud topic datetimes for information on
        duration formats.

     --bypass-cache-on-request-headers=BYPASS_CACHE_ON_REQUEST_HEADERS
        Bypass the cache when the specified request headers are matched - e.g.
        Pragma or Authorization headers. Up to 5 headers can be specified.

        The cache is bypassed for all cdnPolicy.cacheMode settings.

        Note that requests that include these headers will always fill from
        origin, and may result in a large number of cache misses if the
        specified headers are common to many requests.

        Values are case-insensitive.

        The header name must be a valid HTTP header field token (per RFC 7230).

        For the list of restricted headers, see the list of required header
        name properties in How custom headers work
        (https://cloud.google.com/load-balancing/docs/custom-headers#how_custom_headers_work).

        A header name must not appear more than once in the list of added
        headers.

     --cache-key-include-host
        Enable including host in cache key. If enabled, requests to different
        hosts will be cached separately. Can only be applied for global
        resources. Enabled by default, use --no-cache-key-include-host to
        disable.

     --cache-key-include-http-header=[HEADER_FIELD_NAME,...]
        Specifies a comma-separated list of HTTP headers, by field name, to
        include in cache keys. Only the request URL is included in the cache
        key by default.

     --cache-key-include-named-cookie=[NAMED_COOKIE,...]
        Specifies a comma-separated list of HTTP cookie names to include in
        cache keys. The name=value pair are used in the cache key Cloud CDN
        generates. Cookies are not included in cache keys by default.

     --cache-key-include-protocol
        Enable including protocol in cache key. If enabled, http and https
        requests will be cached separately. Can only be applied for global
        resources. Enabled by default, use --no-cache-key-include-protocol to
        disable.

     --cache-key-include-query-string
        Enable including query string in cache key. If enabled, the query
        string parameters will be included according to
        --cache-key-query-string-whitelist and
        --cache-key-query-string-blacklist. If neither is set, the entire query
        string will be included. If disabled, then the entire query string will
        be excluded. Can only be applied for global resources. Enabled by
        default, use --no-cache-key-include-query-string to disable.

     --cache-mode=CACHE_MODE
        Specifies the cache setting for all responses from this backend.
        CACHE_MODE must be one of:

         CACHE_ALL_STATIC
            Automatically cache static content, including common image formats,
            media (video and audio), web assets (JavaScript and CSS). Requests
            and responses that are marked as uncacheable, as well as dynamic
            content (including HTML), aren't cached.
         FORCE_CACHE_ALL
            Cache all content, ignoring any "private", "no-store" or "no-cache"
            directives in Cache-Control response headers. Warning: this may
            result in Cloud CDN caching private, per-user (user identifiable)
            content. You should only enable this on backends that are not
            serving private or dynamic content, such as storage buckets.
         USE_ORIGIN_HEADERS
            Require the origin to set valid caching headers to cache content.
            Responses without these headers aren't cached at Google's edge, and
            require a full trip to the origin on every request, potentially
            impacting performance and increasing load on the origin server.

     --client-ttl=CLIENT_TTL
        Specifies a separate client (for example, browser client) TTL, separate
        from the TTL for Cloud CDN's edge caches.

        This allows you to set a shorter TTL for browsers/clients, and to have
        those clients revalidate content against Cloud CDN on a more regular
        basis, without requiring revalidation at the origin.

        The value of clientTtl cannot be set to a value greater than that of
        maxTtl, but can be equal.

        Any cacheable response has its max-age/s-maxage directives adjusted
        down to the client TTL value if necessary; an Expires header will be
        replaced with a suitable max-age directive.

        The maximum allowed value is 31,622,400s (1 year).

        When creating a new backend with CACHE_ALL_STATIC and the field is
        unset, or when switching to that mode and the field is unset, a default
        value of 3600 is used.

        When the cache mode is set to "USE_ORIGIN_HEADERS", you must omit this
        field.

     --compression-mode=COMPRESSION_MODE
        Compress text responses using Brotli or gzip compression, based on the
        client's Accept-Encoding header. Two modes are supported: AUTOMATIC
        (recommended) - automatically uses the best compression based on the
        Accept-Encoding header sent by the client. In most cases, this will
        result in Brotli compression being favored. DISABLED - disables
        compression. Existing compressed responses cached by Cloud CDN will not
        be served to clients. COMPRESSION_MODE must be one of: DISABLED,
        AUTOMATIC.

     --connection-drain-on-failover
        Applicable only for backend service-based external and internal
        passthrough Network Load Balancers as part of a connection tracking
        policy. Only applicable when the backend service protocol is TCP. Not
        applicable to any other load balancer. Enabled by default, this option
        instructs the load balancer to allow established TCP connections to
        persist for up to 300 seconds on instances or endpoints in primary
        backends during failover, and on instances or endpoints in failover
        backends during failback. For details, see: Connection draining on
        failover and failback for internal passthrough Network Load Balancers
        (https://cloud.google.com/load-balancing/docs/internal/failover-overview#connection_draining)
        and Connection draining on failover and failback for external
        passthrough Network Load Balancers
        (https://cloud.google.com/load-balancing/docs/network/networklb-failover-overview#connection_draining).

     --connection-draining-timeout=CONNECTION_DRAINING_TIMEOUT
        Connection draining timeout to be used during removal of VMs from
        instance groups. This guarantees that for the specified time all
        existing connections to a VM will remain untouched, but no new
        connections will be accepted. Set timeout to zero to disable connection
        draining. Enable feature by specifying a timeout of up to one hour. If
        the flag is omitted API default value (0s) will be used. See $ gcloud
        topic datetimes for information on duration formats.

     --connection-persistence-on-unhealthy-backends=CONNECTION_PERSISTENCE_ON_UNHEALTHY_BACKENDS
        Specifies connection persistence when backends are unhealthy. The
        default value is DEFAULT_FOR_PROTOCOL.
        CONNECTION_PERSISTENCE_ON_UNHEALTHY_BACKENDS must be one of:
        DEFAULT_FOR_PROTOCOL, NEVER_PERSIST, ALWAYS_PERSIST.

     --consistent-hash-http-header-name=CONSISTENT_HASH_HTTP_HEADER_NAME
        The HTTP header name to use for the hash key when session affinity is
        set to HEADER_FIELD.

     --consistent-hash-minimum-ring-size=CONSISTENT_HASH_MINIMUM_RING_SIZE
        The minimum number of virtual nodes to use for the hash ring when a
        consistent hash load balancing policy or subsetting policy is in use.
        Defaults to 1024. Larger ring sizes result in more granular load
        distributions. If the number of hosts in the load balancing pool is
        larger than the ring size, each host will be assigned a single virtual
        node.

     --custom-request-header=CUSTOM_REQUEST_HEADER
        Specifies a HTTP Header to be added by your load balancer. This flag
        can be repeated to specify multiple headers. For example:

            $ gcloud compute backend-services create NAME             \
                --custom-request-header "header-name: value"             \
                --custom-request-header "another-header:"

     --custom-response-header=CUSTOM_RESPONSE_HEADER
        Custom headers that the external Application Load Balancer adds to
        proxied responses. For the list of headers, see Creating custom headers
        (https://cloud.google.com/load-balancing/docs/custom-headers).

        Variables are not case-sensitive.

     --default-ttl=DEFAULT_TTL
        Specifies the default TTL for cached content served by this origin for
        responses that do not have an existing valid TTL (max-age or s-maxage).

        The default value is 3600s for cache modes that allow a default TTL to
        be defined.

        The value of defaultTtl cannot be set to a value greater than that of
        maxTtl, but can be equal.

        When the cacheMode is set to FORCE_CACHE_ALL, the defaultTtl overwrites
        the TTL set in all responses.

        A TTL of "0" means Always revalidate.

        The maximum allowed value is 31,622,400s (1 year). Infrequently
        accessed objects may be evicted from the cache before the defined TTL.

        When creating a new backend with CACHE_ALL_STATIC or FORCE_CACHE_ALL
        and the field is unset, or when updating an existing backend to use
        these modes and the field is unset, a default value of 3600 is used.
        When the cache mode is set to "USE_ORIGIN_HEADERS", you must omit this
        field.

     --description=DESCRIPTION
        An optional, textual description for the backend service.

     --drop-traffic-if-unhealthy
        Applicable only for backend service-based external and internal
        passthrough Network Load Balancers as part of a connection tracking
        policy. Not applicable to any other load balancer. This option
        instructs the load balancer to drop packets when all instances or
        endpoints in primary and failover backends do not pass their load
        balancer health checks. For details, see: Dropping traffic when all
        backend VMs are unhealthy for internal passthrough Network Load
        Balancers
        (https://cloud.google.com/load-balancing/docs/internal/failover-overview#drop_traffic)
        and Dropping traffic when all backend VMs are unhealthy for external
        passthrough Network Load Balancers
        (https://cloud.google.com/load-balancing/docs/network/networklb-failover-overview#drop_traffic).

     --[no-]enable-cdn
        Enable or disable Cloud CDN for the backend service. Only available for
        backend services with --load-balancing-scheme=EXTERNAL or
        EXTERNAL_MANAGED that use a --protocol of HTTP, HTTPS, HTTP2 or H2C.
        Cloud CDN caches HTTP responses at the edge of Google's network. Cloud
        CDN is disabled by default. Use --enable-cdn to enable and
        --no-enable-cdn to disable.

     --[no-]enable-logging
        The logging options for the load balancer traffic served by this
        backend service. If logging is enabled, logs will be exported to Cloud
        Logging. Disabled by default. This field cannot be specified for global
        external proxy Network Load Balancers. Use --enable-logging to enable
        and --no-enable-logging to disable.

     --[no-]enable-strong-affinity
        Enable or disable strong session affinity. This is only available for
        loadbalancingScheme EXTERNAL. Use --enable-strong-affinity to enable
        and --no-enable-strong-affinity to disable.

     --failover-ratio=FAILOVER_RATIO
        Applicable only to backend service-based external passthrough Network
        load balancers and internal passthrough Network load balancers as part
        of a failover policy. Not applicable to any other load balancer. This
        option defines the ratio used to control when failover and failback
        occur. For details, see: Failover ratio for internal passthrough
        Network Load Balancers
        (https://cloud.google.com/load-balancing/docs/internal/failover-overview#failover_ratio)
        and Failover ratio for external passthrough Network Load Balancer
        overview
        (https://cloud.google.com/load-balancing/docs/network/networklb-failover-overview#failover_ratio).

     --ha-policy-fast-ip-move=HA_POLICY_FAST_IP_MOVE
        Fast IP move policy for high availability (HA). HA_POLICY_FAST_IP_MOVE
        must be one of: GARP_RA, DISABLED.

     --health-checks=HEALTH_CHECK,[...]
        Specifies a list of health check objects for checking the health of the
        backend service. Currently at most one health check can be specified.
        Health checks need not be for the same protocol as that of the backend
        service.

     --http-health-checks=HTTP_HEALTH_CHECK,[...]
        Specifies a list of legacy HTTP health check objects for checking the
        health of the backend service.

        Legacy health checks are not recommended for backend services. It is
        possible to use a legacy health check on a backend service for an
        Application Load Balancer if that backend service uses instance groups.
        For more information, refer to this guide:
        https://cloud.google.com/load-balancing/docs/health-check-concepts#lb_guide.

     --https-health-checks=HTTPS_HEALTH_CHECK,[...]
        Specifies a list of legacy HTTPS health check objects for checking the
        health of the backend service.

        Legacy health checks are not recommended for backend services. It is
        possible to use a legacy health check on a backend service for an
        Application Load Balancer if that backend service uses instance groups.
        For more information, refer to this guide:
        https://cloud.google.com/load-balancing/docs/health-check-concepts#lb_guide.

     --iap=disabled|enabled,[oauth2-client-id=OAUTH2-CLIENT-ID,oauth2-client-secret=OAUTH2-CLIENT-SECRET]
        Configure Identity Aware Proxy (IAP) for external HTTP(S) load
        balancing. You can configure IAP to be enabled or disabled (default).
        If enabled, you can provide values for oauth2-client-id and
        oauth2-client-secret. For example,
        --iap=enabled,oauth2-client-id=foo,oauth2-client-secret=bar turns IAP
        on, and --iap=disabled turns it off. For more information, see
        https://cloud.google.com/iap/.

     --idle-timeout-sec=IDLE_TIMEOUT_SEC
        Specifies how long to keep a connection tracking table entry while
        there is no matching traffic (in seconds). Applicable only for backend
        service-based external and internal passthrough Network Load Balancers
        as part of a connection tracking policy.

     --ip-address-selection-policy=IP_ADDRESS_SELECTION_POLICY
        Specifies a preference for traffic sent from the proxy to the backend
        (or from the client to the backend for proxyless gRPC).

        Can only be set if load balancing scheme is INTERNAL_SELF_MANAGED,
        INTERNAL_MANAGED or EXTERNAL_MANAGED.

        The possible values are:

            IPV4_ONLY
              Only send IPv4 traffic to the backends of the backend service,
              regardless of traffic from the client to the proxy. Only IPv4
              health checks are used to check the health of the backends.

            PREFER_IPV6
              Prioritize the connection to the endpoint's IPv6 address over its IPv4
              address (provided there is a healthy IPv6 address).

            IPV6_ONLY
              Only send IPv6 traffic to the backends of the backend service,
              regardless of traffic from the client to the proxy. Only IPv6
              health checks are used to check the health of the backends.

        IP_ADDRESS_SELECTION_POLICY must be one of: IPV4_ONLY, PREFER_IPV6,
        IPV6_ONLY.

     --load-balancing-scheme=LOAD_BALANCING_SCHEME; default="EXTERNAL"
        Specifies the load balancer type. Choose EXTERNAL for the classic
        Application Load Balancers, the external passthrough Network Load
        Balancers, and the global external proxy Network Load Balancers. Choose
        EXTERNAL_MANAGED for the Envoy-based global and regional external
        Application Load Balancers, and the regional external proxy Network
        Load Balancers. Choose INTERNAL for the internal passthrough Network
        Load Balancers. Choose INTERNAL_MANAGED for Envoy-based internal load
        balancers such as the internal Application Load Balancers and the
        internal proxy Network Load Balancers. Choose INTERNAL_SELF_MANAGED for
        Traffic Director. For more information, refer to this guide:
        https://cloud.google.com/load-balancing/docs/choosing-load-balancer.

        LOAD_BALANCING_SCHEME must be one of: INTERNAL, EXTERNAL,
        INTERNAL_SELF_MANAGED, EXTERNAL_MANAGED, INTERNAL_MANAGED.

     --locality-lb-policy=LOCALITY_LB_POLICY
        The load balancing algorithm used within the scope of the locality,
        specified as a single string enum value. This algorithm determines how
        traffic is distributed among the backend endpoints. The accepted values
        are INVALID_LB_POLICY, ROUND_ROBIN, LEAST_REQUEST, RING_HASH, RANDOM,
        ORIGINAL_DESTINATION, MAGLEV, WEIGHTED_MAGLEV, WEIGHTED_ROUND_ROBIN,
        and WEIGHTED_GCP_RENDEZVOUS. LOCALITY_LB_POLICY must be one of:
        INVALID_LB_POLICY, ROUND_ROBIN, LEAST_REQUEST, RING_HASH, RANDOM,
        ORIGINAL_DESTINATION, MAGLEV, WEIGHTED_MAGLEV, WEIGHTED_ROUND_ROBIN,
        WEIGHTED_GCP_RENDEZVOUS.

     --logging-http-request-headers=[LOGGING_HTTP_REQUEST_HEADERS,...]
        This field can only be specified if logging is enabled for the backend
        service. Contains a comma-separated list of HTTP request headers you
        want to include in the logs.

     --logging-http-response-headers=[LOGGING_HTTP_RESPONSE_HEADERS,...]
        This field can only be specified if logging is enabled for the backend
        service. Contains a comma-separated list of HTTP response headers you
        want to include in the logs.

     --logging-optional=LOGGING_OPTIONAL
        This field can only be specified if logging is enabled for the backend
        service. Configures whether all, none, or a subset of optional fields
        should be added to the reported logs. Default is EXCLUDE_ALL_OPTIONAL.
        This field can only be specified for internal and external passthrough
        Network Load Balancers. LOGGING_OPTIONAL must be one of:
        EXCLUDE_ALL_OPTIONAL, INCLUDE_ALL_OPTIONAL, CUSTOM.

     --logging-optional-fields=[LOGGING_OPTIONAL_FIELDS,...]
        This field can only be specified if logging is enabled for the backend
        service and "--logging-optional" was set to CUSTOM. Contains a
        comma-separated list of optional fields you want to include in the
        logs. For example: serverInstance, serverGkeDetails.cluster,
        serverGkeDetails.pod.podNamespace. This can only be specified for
        internal and external passthrough Network Load Balancers.

     --logging-sample-rate=LOGGING_SAMPLE_RATE
        This field can only be specified if logging is enabled for the backend
        service. The value of the field must be a float in the range [0, 1].
        This configures the sampling rate of requests to the load balancer
        where 1.0 means all logged requests are reported and 0.0 means no
        logged requests are reported. The default value is 1.0 when logging is
        enabled and 0.0 otherwise.

     --max-stream-duration=MAX_STREAM_DURATION
        Specifies the default maximum duration (timeout) for streams on this
        service. Duration is computed from the beginning of the stream until
        the response has been completely processed, including all retries. A
        stream that does not complete in this duration is closed. If not
        specified, there will be no timeout limit, i.e. the maximum duration is
        infinite. This value can be overridden in the PathMatcher configuration
        of the UrlMap referencing this backend service. This field is only
        allowed when the loadBalancingScheme of the backend service is
        INTERNAL_SELF_MANAGED. For more information about duration formats, see
        $ gcloud topic datetimes.

     --max-ttl=MAX_TTL
        Specifies the maximum allowed TTL for cached content served by this
        origin.

        The default value is 86400 for cache modes that support a max TTL.

        Cache directives that attempt to set a max-age or s-maxage higher than
        this, or an Expires header more than maxTtl seconds in the future, are
        capped at the value of maxTtl, as if it were the value of an s-maxage
        Cache-Control directive.

        A TTL of "0" means Always revalidate.

        The maximum allowed value is 31,622,400s (1 year). Infrequently
        accessed objects may be evicted from the cache before the defined TTL.

        When creating a new backend with CACHE_ALL_STATIC and the field is
        unset, or when updating an existing backend to use these modes and the
        field is unset, a default value of 86400 is used. When the cache mode
        is set to "USE_ORIGIN_HEADERS" or "FORCE_CACHE_ALL", you must omit this
        field.

     --[no-]negative-caching
        Negative caching allows per-status code cache TTLs to be set, in order
        to apply fine-grained caching for common errors or redirects. This can
        reduce the load on your origin and improve the end-user experience by
        reducing response latency.

        Negative caching applies to a set of 3xx, 4xx, and 5xx status codes
        that are typically useful to cache.

        Status codes not listed here cannot have their TTL explicitly set and
        aren't cached, in order to avoid cache poisoning attacks.

        HTTP success codes (HTTP 2xx) are handled by the values of defaultTtl
        and maxTtl.

        When the cache mode is set to CACHE_ALL_STATIC or USE_ORIGIN_HEADERS,
        these values apply to responses with the specified response code that
        lack any cache-control or expires headers.

        When the cache mode is set to FORCE_CACHE_ALL, these values apply to
        all responses with the specified response code, and override any
        caching headers.

        Cloud CDN applies the following default TTLs to these status codes:
        * HTTP 300 (Multiple Choice), 301, 308 (Permanent Redirects): 10m
        * HTTP 404 (Not Found), 410 (Gone), 451 (Unavailable For Legal
          Reasons): 120s
        * HTTP 405 (Method Not Found), 421 (Misdirected Request), 501 (Not
          Implemented): 60s

        These defaults can be overridden in cdnPolicy.negativeCachingPolicy.

        Use --negative-caching to enable and --no-negative-caching to disable.

     --negative-caching-policy=[[CODE=TTL],...]
        Sets a cache TTL for the specified HTTP status code.

        NegativeCaching must be enabled to config the negativeCachingPolicy.

        If you omit the policy and leave negativeCaching enabled, Cloud CDN's
        default cache TTLs are used.

        Note that when specifying an explicit negative caching policy, make
        sure that you specify a cache TTL for all response codes that you want
        to cache. Cloud CDN doesn't apply any default negative caching when a
        policy exists.

        CODE is the HTTP status code to define a TTL against. Only HTTP status
        codes 300, 301, 308, 404, 405, 410, 421, 451, and 501 can be specified
        as values, and you cannot specify a status code more than once.

        TTL is the time to live (in seconds) for which to cache responses for
        the specified CODE. The maximum allowed value is 1800s (30 minutes),
        noting that infrequently accessed objects may be evicted from the cache
        before the defined TTL.

     --network=NETWORK
        Network that this backend service applies to. It can only be set if the
        load-balancing-scheme is INTERNAL.

     --port-name=PORT_NAME
        Backend services for Application Load Balancers and proxy Network Load
        Balancers must reference exactly one named port if using instance group
        backends.

        Each instance group backend exports one or more named ports, which map
        a user-configurable name to a port number. The backend service's named
        port subscribes to one named port on each instance group. The resolved
        port number can differ among instance group backends, based on each
        instance group's named port list.

        When omitted, a backend service subscribes to a named port called http.

        The named port for a backend service is either ignored or cannot be set
        for these load balancing configurations:

        * For any load balancer, if the backends are not instance groups (for
          example, GCE_VM_IP_PORT NEGs).
        * For any type of backend on a backend service for internal or
          external passthrough Network Load Balancers.

        See also
        https://cloud.google.com/load-balancing/docs/backend-service#named_ports.

     --protocol=PROTOCOL
        Protocol for incoming requests.

        If the load-balancing-scheme is INTERNAL (Internal passthrough Network
        Load Balancer), the protocol must be one of: TCP, UDP, UNSPECIFIED.

        If the load-balancing-scheme is INTERNAL_SELF_MANAGED (Traffic
        Director), the protocol must be one of: HTTP, HTTPS, HTTP2, GRPC, H2C.

        If the load-balancing-scheme is INTERNAL_MANAGED (Internal Application
        Load Balancer), the protocol must be one of: HTTP, HTTPS, HTTP2, H2C.

        If the load-balancing-scheme is INTERNAL_MANAGED (Internal proxy
        Network Load Balancer), the protocol must be only TCP.

        If the load-balancing-scheme is EXTERNAL and region is not set (Classic
        Application Load Balancer and Classic proxy Network Load Balancer), the
        protocol must be one of: HTTP, HTTPS, HTTP2, TCP, SSL.

        If the load-balancing-scheme is EXTERNAL and region is set (External
        passthrough Network Load Balancer), the protocol must be one of: TCP,
        UDP, UNSPECIFIED.

        If the load-balancing-scheme is EXTERNAL_MANAGED (Global external
        Application Load Balancer and regional external Application Load
        Balancer), the protocol must be one of: HTTP, HTTPS, HTTP2, H2C.

        If the load-balancing-scheme is EXTERNAL_MANAGED (Global external proxy
        Network Load Balancer), the protocol must be one of: TCP, SSL.

        If the load-balancing-scheme is EXTERNAL_MANAGED (Regional external
        proxy Network Load Balancer), the protocol must be only TCP.

     --[no-]request-coalescing
        Enables request coalescing to the backend (recommended).

        Request coalescing (or collapsing) combines multiple concurrent cache
        fill requests into a small number of requests to the origin. This can
        improve performance by putting less load on the origin and backend
        infrastructure. However, coalescing adds a small amount of latency when
        multiple requests to the same URL are processed, so for
        latency-critical applications it may not be desirable.

        Defaults to true.

        Use --request-coalescing to enable and --no-request-coalescing to
        disable.

     --resource-manager-tags=[KEY=VALUE,...]
        A comma-separated list of Resource Manager tags to apply to the backend
        service.

     --serve-while-stale=SERVE_WHILE_STALE
        Serve existing content from the cache (if available) when revalidating
        content with the origin; this allows content to be served more quickly,
        and also allows content to continue to be served if the backend is down
        or reporting errors.

        This setting defines the default serve-stale duration for any cached
        responses that do not specify a stale-while-revalidate directive. Stale
        responses that exceed the TTL configured here will not be served
        without first being revalidated with the origin. The default limit is
        86400s (1 day), which will allow stale content to be served up to this
        limit beyond the max-age (or s-max-age) of a cached response.

        The maximum allowed value is 604800 (1 week).

        Set this to zero (0) to disable serve-while-stale.

     --service-bindings=SERVICE_BINDING,[...]
        List of service bindings to be attached to this backend service. Can
        only be set if load balancing scheme is INTERNAL_SELF_MANAGED. If set,
        lists of backends and health checks must be both empty.

     --service-lb-policy=SERVICE_LOAD_BALANCING_POLICY
        The name or URI of the service load balancing policy to apply to this
        backend service, specified as a single string identifier rather than a
        complex configuration object or list. This policy can only be
        configured if the load balancing scheme is EXTERNAL_MANAGED,
        INTERNAL_MANAGED, or INTERNAL_SELF_MANAGED. If used with a global
        backend service, must reference a global policy. If used with a
        regional backend service, must reference a regional policy.

     --session-affinity=SESSION_AFFINITY
        The type of session affinity to use. Supports both TCP and UDP.
        SESSION_AFFINITY must be one of:

         CLIENT_IP
            Route requests to instances based on the hash of the client's IP
            address.
         CLIENT_IP_NO_DESTINATION
            Directs a particular client's request to the same backend VM based
            on a hash created on the client's IP address only. This is used in
            L4 ILB as Next-Hop scenarios. It differs from the Client-IP option
            in that Client-IP uses a hash based on both client-IP's address and
            destination address.
         CLIENT_IP_PORT_PROTO
            (Applicable if --load-balancing-scheme is INTERNAL) Connections
            from the same client IP with the same IP protocol and port will go
            to the same backend VM while that VM remains healthy.
         CLIENT_IP_PROTO
            (Applicable if --load-balancing-scheme is INTERNAL) Connections
            from the same client IP with the same IP protocol will go to the
            same backend VM while that VM remains healthy.
         GENERATED_COOKIE
            (Applicable if --load-balancing-scheme is INTERNAL_MANAGED,
            INTERNAL_SELF_MANAGED, EXTERNAL_MANAGED, or EXTERNAL) If the
            --load-balancing-scheme is EXTERNAL or EXTERNAL_MANAGED, routes
            requests to backend VMs or endpoints in a NEG, based on the
            contents of the GCLB cookie set by the load balancer. Only
            applicable when --protocol is HTTP, HTTPS,HTTP2 or H2C. If the
            --load-balancing-scheme is INTERNAL_MANAGED or
            INTERNAL_SELF_MANAGED, routes requests to backend VMs or endpoints
            in a NEG, based on the contents of the GCILB cookie set by the
            proxy. (If no cookie is present, the proxy chooses a backend VM or
            endpoint and sends a Set-Cookie response for future requests.) If
            the --load-balancing-scheme is INTERNAL_SELF_MANAGED, routes
            requests to backend VMs or endpoints in a NEG, based on the
            contents of a cookie set by Traffic Director. This session affinity
            is only valid if the load balancing locality policy is either
            RING_HASH or MAGLEV.
         HEADER_FIELD
            (Applicable if --load-balancing-scheme is INTERNAL_MANAGED,
            EXTERNAL_MANAGED, or INTERNAL_SELF_MANAGED) Route requests to
            backend VMs or endpoints in a NEG based on the value of the HTTP
            header named in the --consistent-hash-http-header-name flag. Note
            that this is different from --custom-request-header, which
            specifies headers added to the request by the load balancer. This
            session affinity is only valid if the load balancing locality
            policy is either RING_HASH or MAGLEV.
         HTTP_COOKIE
            (Applicable if --load-balancing-scheme is INTERNAL_MANAGED,
            EXTERNAL_MANAGED or INTERNAL_SELF_MANAGED) Route requests to
            backend VMs or endpoints in a NEG, based on an HTTP cookie in the
            --affinity-cookie-name flag (with the optional
            --affinity-cookie-ttl flag). If the client has not provided the
            cookie, the proxy generates the cookie and returns it to the client
            in a Set-Cookie header. This session affinity is only valid if the
            load balancing locality policy is either RING_HASH or MAGLEV and
            the backend service's consistent hash specifies the HTTP cookie.
         NONE
            Session affinity is disabled.
         STRONG_COOKIE_AFFINITY
            (Applicable if --load-balancing-scheme is INTERNAL_MANAGED or
            EXTERNAL_MANAGED) Strong cookie-based affinity, based on an HTTP
            cookie named in the --affinity-cookie-name flag (with the optional
            --affinity-cookie-ttl flag). Connections bearing the same cookie
            will be served by the same backend VM while that VM remains
            healthy, as long as the cookie has not expired. If the
            --affinity-cookie-ttl flag is set to 0, the cookie will be treated
            as a session cookie.

     --signed-url-cache-max-age=SIGNED_URL_CACHE_MAX_AGE
        The amount of time up to which the response to a signed URL request
        will be cached in the CDN. After this time period, the Signed URL will
        be revalidated before being served. Cloud CDN will internally act as
        though all responses from this backend had a Cache-Control: public,
        max-age=[TTL] header, regardless of any existing Cache-Control header.
        The actual headers served in responses will not be altered. If
        unspecified, the default value is 3600s.

        For example, specifying 12h will cause the responses to signed URL
        requests to be cached in the CDN up to 12 hours. See $ gcloud topic
        datetimes for information on duration formats.

        This flag only affects signed URL requests.

     --subsetting-policy=SUBSETTING_POLICY; default="NONE"
        The algorithm used for subsetting, provided as a single string keyword
        rather than a complex object. The accepted values are NONE and
        CONSISTENT_HASH_SUBSETTING. The default value is NONE, which implies
        that subsetting is disabled. For Layer 4 internal load balancing, if
        subsetting is enabled, only the CONSISTENT_HASH_SUBSETTING algorithm
        can be specified. SUBSETTING_POLICY must be one of: NONE,
        CONSISTENT_HASH_SUBSETTING.

     --timeout=TIMEOUT; default="30s"
        Applicable to all load balancing products except passthrough Network
        Load Balancers. For internal passthrough Network Load Balancers
        (load-balancing-scheme set to INTERNAL) and external passthrough
        Network Load Balancers (global not set and load-balancing-scheme set to
        EXTERNAL), timeout is ignored.

        If the protocol is HTTP, HTTPS, HTTP2 or H2C, timeout is a
        request/response timeout for HTTP(S) traffic, meaning the amount of
        time that the load balancer waits for a backend to return a full
        response to a request. If WebSockets traffic is supported, the timeout
        parameter sets the maximum amount of time that a WebSocket can be open
        (idle or not).

        For example, for HTTP, HTTPS, HTTP2 or H2C traffic, specifying a
        timeout of 10s means that backends have 10 seconds to respond to the
        load balancer's requests. The load balancer retries the HTTP GET
        request one time if the backend closes the connection or times out
        before sending response headers to the load balancer. If the backend
        sends response headers or if the request sent to the backend is not an
        HTTP GET request, the load balancer does not retry. If the backend does
        not reply at all, the load balancer returns a 502 Bad Gateway error to
        the client.

        If the protocol is SSL or TCP, timeout is an idle timeout.

        The full range of timeout values allowed is 1 - 2,147,483,647 seconds.

     --tracking-mode=TRACKING_MODE
        Specifies the connection key used for connection tracking. The default
        value is PER_CONNECTION. Applicable only for backend service-based
        external and internal passthrough Network Load Balancers as part of a
        connection tracking policy. For details, see: Connection tracking mode
        for internal passthrough Network Load Balancers balancing
        (https://cloud.google.com/load-balancing/docs/internal#tracking-mode)
        and Connection tracking mode for external passthrough Network Load
        Balancers
        (https://cloud.google.com/load-balancing/docs/network/networklb-backend-service#tracking-mode).
        TRACKING_MODE must be one of: PER_CONNECTION, PER_SESSION.

     --zonal-affinity-spillover=ZONAL_AFFINITY_SPILLOVER
        Specifies whether zonal affinity is enabled or not. For further
        details, refer to Zonal affinity options
        (https://cloud.google.com/load-balancing/docs/internal/zonal-affinity#zonal_affinity_options).

        Can only be set if load balancing scheme is INTERNAL,

        The possible values are:

            ZONAL_AFFINITY_DISABLED
              Default Value. Zonal Affinity is disabled. The load balancer
              distributes new connections to all healthy backend VMs across all
              zones.

            ZONAL_AFFINITY_STAY_WITHIN_ZONE
              Zonal Affinity is enabled. The load balancer distributes new
              connections to all healthy backend VMs in the client VM's zone only.
              If there are no healthy backend VMs in the client VM's zone, the load
              balancer distributes new connections to all backend VMs in the client
              VM's zone.

            ZONAL_AFFINITY_SPILL_CROSS_ZONE
              Zonal Affinity is enabled. The load balancer distributes new
              connections to all healthy backend VMs in the client VM's zone only.
              If there aren't enough healthy backend VMs in the client VM's zone,
              the load balancer distributes some new connections to backend VMs in
              zones other than the client VM's zone. This distribution depends on a
              configurable spillover ratio that determines when traffic starts
              spilling over to backend VMs in other zones.

        ZONAL_AFFINITY_SPILLOVER must be one of: ZONAL_AFFINITY_DISABLED,
        ZONAL_AFFINITY_STAY_WITHIN_ZONE, ZONAL_AFFINITY_SPILL_CROSS_ZONE.

     --zonal-affinity-spillover-ratio=ZONAL_AFFINITY_SPILLOVER_RATIO
        The value of the field can range from 0.0 to 1.0, inclusive. If not
        specified, a default value of 0.0 is used.

        This ratio indicates the threshold value for keeping traffic in the
        client VM's zone. If the proportion of healthy backend VMs in a zone
        falls below the configured spillover ratio, some new connections from
        the client VM are distributed to healthy backend VMs in zones other
        than the client VM's zone.

        For further details, refer to How ZONAL_AFFINITY_SPILL_CROSS_ZONE and
        spillover ratio work
        (https://cloud.google.com/load-balancing/docs/internal/zonal-affinity#zonal-affinity-spillover-ratio).

     At most one of these can be specified:

       --cache-key-query-string-blacklist=[QUERY_STRING,...]
          A comma-separated list of query string parameters to exclude from
          cache keys (for example, session_id,utm_campaign). All other
          parameters will be included in the cache key. This flag cannot be
          specified if --cache-key-query-string-whitelist is also used. The &
          and = characters within the specified parameters will be
          percent-encoded and are not treated as list delimiters. This
          configuration can only be applied to global backend resources.

       --cache-key-query-string-whitelist=QUERY_STRING,[...]
          A comma-separated list of query string parameters (for example,
          campaign,source) to include in cache keys. All other query parameters
          will be excluded from the cache key. This flag is mutually exclusive
          with --cache-key-query-string-blacklist. The characters & and = are
          percent-encoded and are not treated as delimiters. This configuration
          can only be applied to global resources.

     Settings controlling the volume of connections, requests, and retries to
     this backend service.

     --circuit-breakers-max-connections=CIRCUIT_BREAKERS_MAX_CONNECTIONS
        The maximum number of connections to the backend service. If not
        specified, there is no limit.

     --circuit-breakers-max-pending-requests=CIRCUIT_BREAKERS_MAX_PENDING_REQUESTS
        The maximum number of pending requests allowed to the backend service.
        If not specified, there is no limit.

     --circuit-breakers-max-requests=CIRCUIT_BREAKERS_MAX_REQUESTS
        The maximum number of parallel requests that are allowed to the backend
        service. If not specified, there is no limit.

     --circuit-breakers-max-requests-per-connection=CIRCUIT_BREAKERS_MAX_REQUESTS_PER_CONNECTION
        Maximum requests for a single connection to the backend service.
        Setting this parameter to 1 will effectively disable keep alive.

     --circuit-breakers-max-retries=CIRCUIT_BREAKERS_MAX_RETRIES
        The maximum number of parallel retries allowed to the backend cluster.
        If not specified, the default is 1.

     At most one of these can be specified:

       --custom-metrics=[CUSTOM_METRICS,...]
          List of custom metrics that are used for WEIGHTED_ROUND_ROBIN
          locality load balancing policy.

          Example:

              $ gcloud compute backend-services create \
                  --custom-metrics='name=my-signal,dryRun=true'
              $ gcloud compute backend-services create \
                  --custom-metrics='name=my-signal,dryRun=true' \
                  --custom-metrics='name=my-signal2'
              $ gcloud compute backend-services create \
                  --custom-metrics='[{"name" : "my-signal", "dryRun" : true},
               {"name" : "my-signal2"}]'

          Sets custom_metrics value.

           dryRun
              Sets dryRun value.

           name
              Required, sets name value.

          Shorthand Example:

              --custom-metrics=dryRun=boolean,name=string --custom-metrics=dryRun=boolean,name=string

          JSON Example:

              --custom-metrics='[{"dryRun": boolean, "name": "string"}]'

          File Example:

              --custom-metrics=path_to_file.(yaml|json)

       --custom-metrics-file=[CUSTOM_METRICS,...]
          The path to a JSON or YAML file, an inline JSON array, or a shorthand
          key-value list defining the custom metrics used for the
          WEIGHTED_ROUND_ROBIN locality load balancing policy. Each custom
          metric object requires a name (string) and accepts an optional dryRun
          (boolean) parameter. When providing a file path, the file must
          contain a JSON or YAML array representing these metric objects. Sets
          custom_metrics_file value.

           dryRun
              Sets dryRun value.

           name
              Required, sets name value.

          Shorthand Example:

              --custom-metrics-file=dryRun=boolean,name=string --custom-metrics-file=dryRun=boolean,name=string

          JSON Example:

              --custom-metrics-file='[{"dryRun": boolean, "name": "string"}]'

          File Example:

              --custom-metrics-file=path_to_file.(yaml|json)

     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to create. Overrides the default
          compute/region property value for this command invocation.

     At most one of these can be specified:

       --global-health-checks
          The geographic scope designation for the associated health checks.
          When this boolean presence flag is included, the backend service
          treats the specified health checks as global resources rather than
          regional resources. This flag does not accept a value and is required
          when updating or attaching health checks that were created in the
          global scope.

       --health-checks-region=HEALTH_CHECKS_REGION
          Region of the health checks to operate on. If not specified, you
          might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

     At most one of these can be specified:

       --identity=IDENTITY
          Assigns the Managed Identity for the BackendService Workload. Use
          this property to configure the load balancer back-end to use
          certificates and roots of trust provisioned by the Managed Workload
          Identity system. The identity property is the scheme-less SPIFFE ID
          to use in the SVID presented by the Load Balancer Workload. The
          SPIFFE ID must be a resource starting with the trustDomain property
          value, followed by the path to the Managed Workload Identity.
          Supported SPIFFE ID format:
          //<trust_domain>/ns/<namespace>/sa/<subject> The Trust Domain within
          the Managed Identity must refer to a valid Workload Identity Pool.
          The TrustConfig and CertificateIssuanceConfig will be inherited from
          the Workload Identity Pool. Restrictions: If you set the identity
          property, you cannot manually set the following fields:
          tlsSettings.sni, tlsSettings.subjectAltNames,
          tlsSettings.authenticationConfig. When defining a identity for a
          RegionBackendServices, the corresponding Workload Identity Pool must
          have a ca_pool configured in the same region. The system will set up
          a read-only tlsSettings.authenticationConfig for the Managed
          Identity.

       --tls-settings=[authenticationConfig=AUTHENTICATIONCONFIG],[sni=SNI]
          Configuration for Backend Authenticated TLS and mTLS. May only be
          specified when the backend protocol is SSL, HTTPS or HTTP2.

          Example: $ gcloud compute backend-services create \
          --tls-settings='sni=example.com,authenticationConfig=${AUTH_CONF\
          IG_NAME}'

     --network-endpoint-group=NETWORK_ENDPOINT_GROUP
        Name of the network endpoint group to create the backend service.

     At most one of these can be specified:

       --global-network-endpoint-group
          If set, the network endpoint group is global.

       --network-endpoint-group-region=NETWORK_ENDPOINT_GROUP_REGION
          Region of the network endpoint group to create the backend service.
          If not specified, you might be prompted to select a region
          (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

       --network-endpoint-group-zone=NETWORK_ENDPOINT_GROUP_ZONE
          Zone of the network endpoint group to create the backend service. If
          not specified and the compute/zone property isn't set, you might be
          prompted to select a zone (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/zone property:

              $ gcloud config set compute/zone ZONE

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          To unset the property, run:

              $ gcloud config unset compute/zone

          Alternatively, the zone can be stored in the environment variable
          CLOUDSDK_COMPUTE_ZONE.

     Settings controlling the eviction of unhealthy hosts from the load
     balancing pool for the backend service.

     --outlier-detection-base-ejection-time=OUTLIER_DETECTION_BASE_EJECTION_TIME
        The base time during which a backend endpoint is ejected. Defaults to
        30000ms/30s.

     --outlier-detection-consecutive-errors=OUTLIER_DETECTION_CONSECUTIVE_ERRORS
        Number of consecutive errors before a backend endpoint is ejected from
        the load balancing pool. Defaults to 5.

     --outlier-detection-consecutive-gateway-failure=OUTLIER_DETECTION_CONSECUTIVE_GATEWAY_FAILURE
        The number of consecutive gateway failures (502, 503, 504) before a
        consecutive gateway failure ejection occurs. Defaults to 3.

     --outlier-detection-enforcing-consecutive-errors=OUTLIER_DETECTION_ENFORCING_CONSECUTIVE_ERRORS
        The percentage chance that a backend endpoint will be ejected when an
        outlier status is detected through consecutive 5xx. Defaults to 0.

     --outlier-detection-enforcing-consecutive-gateway-failure=OUTLIER_DETECTION_ENFORCING_CONSECUTIVE_GATEWAY_FAILURE
        The percentage chance that a backend endpoint will be ejected when an
        outlier status is detected through consecutive gateway failures.
        Defaults to 100.

     --outlier-detection-enforcing-success-rate=OUTLIER_DETECTION_ENFORCING_SUCCESS_RATE
        The percentage chance that a backend endpoint will be ejected when an
        outlier status is detected through success rate statistics. Defaults to
        100.

     --outlier-detection-interval=OUTLIER_DETECTION_INTERVAL
        Time interval between ejection analysis sweeps. Defaults to 1 second.

     --outlier-detection-max-ejection-percent=OUTLIER_DETECTION_MAX_EJECTION_PERCENT
        Maximum percentage of backend endpoints in the load balancing pool that
        can be ejected if the ejection conditions are met. Defaults to 50%.

     --outlier-detection-success-rate-minimum-hosts=OUTLIER_DETECTION_SUCCESS_RATE_MINIMUM_HOSTS
        The number of backend endpoints in the load balancing pool that must
        have enough request volume to detect success rate outliers. Defaults to
        5.

     --outlier-detection-success-rate-request-volume=OUTLIER_DETECTION_SUCCESS_RATE_REQUEST_VOLUME
        The minimum number of total requests that must be collected in one
        interval to include this backend endpoint in success rate based outlier
        detection. Defaults to 100.

     --outlier-detection-success-rate-stdev-factor=OUTLIER_DETECTION_SUCCESS_RATE_STDEV_FACTOR
        This factor is used to determine the ejection threshold for success
        rate outlier ejection. (factor divided by 1000). Defaults to 1900.

     Settings for private AWS S3 bucket Signature Version 4 authentication.

     --security-settings-aws-v4-access-key=SECURITY_SETTINGS_AWS_V4_ACCESS_KEY
        The access key used for AWS Signature Version 4 S3 bucket
        authentication.

     --security-settings-aws-v4-access-key-id=SECURITY_SETTINGS_AWS_V4_ACCESS_KEY_ID
        The identifier of an access key used for AWS Signature Version 4 s3
        bucket authentication.

     --security-settings-aws-v4-access-key-version=SECURITY_SETTINGS_AWS_V4_ACCESS_KEY_VERSION
        The optional version identifier for the AWS Signature Version 4 access
        key.

     --security-settings-aws-v4-origin-region=SECURITY_SETTINGS_AWS_V4_ORIGIN_REGION
        The name of the cloud region of your origin for AWS Signature Version 4
        authentication (e.g., 'us-east-1').

     Mutual TLS (mTLS) security settings. Applicable primarily to global
     backend services with load-balancing-scheme set to INTERNAL_SELF_MANAGED.

     --security-settings-client-tls-policy=SECURITY_SETTINGS_CLIENT_TLS_POLICY
        This URL refers to a network security.ClientTlsPolicy resource
        describing how clients should authenticate on backends for this
        service.

     --security-settings-subject-alt-names=[SUBJECT_ALT_NAME,...]
        Comma-separated list of Subject Alternative Names (SANs) verified by
        the client during mutual TLS handshake with a server/endpoint for this
        backend service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services create

        $ gcloud beta compute backend-services create
```

### gcloud compute backend-services delete

```text
NAME
    gcloud compute backend-services delete - delete backend services

SYNOPSIS
    gcloud compute backend-services delete BACKEND_SERVICE_NAME
        [BACKEND_SERVICE_NAME ...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services delete deletes one or more backend
    services.

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME [BACKEND_SERVICE_NAME ...]
        Names of the backend services to delete.

FLAGS
     At most one of these can be specified:

       --global
          If set, the backend services are global.

       --region=REGION
          Region of the backend services to delete. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services delete

        $ gcloud beta compute backend-services delete
```

### gcloud compute backend-services delete-signed-url-key

```text
NAME
    gcloud compute backend-services delete-signed-url-key - delete Cloud CDN
        Signed URL key from a backend service

SYNOPSIS
    gcloud compute backend-services delete-signed-url-key BACKEND_SERVICE_NAME
        --key-name=KEY_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services delete-signed-url-key is used to delete an
    existing Cloud CDN Signed URL key from a backend service.

    Cloud CDN Signed URLs give you a way to serve responses from the globally
    distributed CDN cache, even if the request needs to be authorized.

    Signed URLs are a mechanism to temporarily give a client access to a
    private resource without requiring additional authorization. To achieve
    this, the full request URL that should be allowed is hashed and
    cryptographically signed. By using the signed URL you give it, that one
    request will be considered authorized to receive the requested content.

    Generally, a signed URL can be used by anyone who has it. However, it is
    usually only intended to be used by the client that was directly given the
    URL. To mitigate this, they expire at a time chosen by the issuer. To
    minimize the risk of a signed URL being shared, it is recommended that the
    signed URL be set to expire as soon as possible.

    A 128-bit secret key is used for signing the URLs.

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

REQUIRED FLAGS
     --key-name=KEY_NAME
        Name of the Cloud CDN Signed URL key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services delete-signed-url-key

        $ gcloud beta compute backend-services delete-signed-url-key
```

### gcloud compute backend-services describe

```text
NAME
    gcloud compute backend-services describe - display detailed information
        about a backend service

SYNOPSIS
    gcloud compute backend-services describe BACKEND_SERVICE_NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services describe displays all data associated with
    a backend service in a project.

EXAMPLES
    To get details about a global backend service, run:

        $ gcloud compute backend-services describe --global

    To get details about a regional backend service in the us-central1 regions,
    run:

        $ gcloud compute backend-services describe --region=us-central1

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to describe.

FLAGS
     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to describe. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services describe

        $ gcloud beta compute backend-services describe
```

### gcloud compute backend-services edit

```text
NAME
    gcloud compute backend-services edit - modify a backend service

SYNOPSIS
    gcloud compute backend-services edit BACKEND_SERVICE_NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services edit modifies a backend service of a Google
    Cloud load balancer or Traffic Director. The backend service resource is
    fetched from the server and presented in a text editor that displays the
    configurable fields.

    The specific editor is defined by the EDITOR environment variable.

    The name of each backend corresponds to the name of an instance group,
    zonal NEG, serverless NEG, or internet NEG.

    To add, remove, or swap backends, use the gcloud compute backend-services
    remove-backend and gcloud compute backend-services add-backend commands.

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

FLAGS
     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services edit

        $ gcloud beta compute backend-services edit
```

### gcloud compute backend-services export

```text
NAME
    gcloud compute backend-services export - export a backend service

SYNOPSIS
    gcloud compute backend-services export BACKEND_SERVICE_NAME
        [--destination=DESTINATION] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Exports a backend service's configuration to a file. This configuration can
    be imported at a later time.

EXAMPLES
    A backend service can be exported by running:

        $ gcloud compute backend-services export NAME \
            --destination=<path-to-file> --global

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to export.

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported.
        Alternatively, you may omit this flag to write to standard output. For
        a schema describing the export/import format, see:
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/compute/v1/BackendService.yaml.

     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to export. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services export

        $ gcloud beta compute backend-services export
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute backend-services export NAME \
    --destination=PATH_TO_FILE \
    --global
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
