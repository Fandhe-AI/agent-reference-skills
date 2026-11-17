---
source: https://networksecurity.googleapis.com/$discovery/rest?version=v1
---

# Network Security API message schemas (networksecurity) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/networksecurity/`.

### `AddAddressGroupItemsRequest`

- Request used by the AddAddressGroupItems method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<string> | Required. List of items to add. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `AddressGroup`

- AddressGroup is a resource that specifies how a collection of IP/DNS used in Firewall Policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `capacity` | integer (int32) | Required. Capacity of the Address Group |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. Free-text description of the resource. |
| `items` | array<string> | Optional. List of items. |
| `labels` | object | Optional. Set of label tags associated with the AddressGroup resource. |
| `name` | string | Required. Name of the AddressGroup resource. It matches pattern `projects/*/locations/{location}/addressGroups/`. |
| `purpose` | array<string> | Optional. List of supported purposes of the Address Group. Values: `PURPOSE_UNSPECIFIED`, `DEFAULT`, `CLOUD_ARMOR`. |
| `selfLink` | string | Output only. Server-defined fully-qualified URL for this resource. |
| `type` | string enum | Required. The type of the Address Group. Possible values are "IPv4" or "IPV6". Values: `TYPE_UNSPECIFIED`, `IPV4`, `IPV6`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `AntivirusOverride`

- Defines what action to take for antivirus threats per protocol.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Required. Threat action override. For some threat types, only a subset of actions applies. Values: `THREAT_ACTION_UNSPECIFIED`, `DEFAULT_ACTION`, `ALLOW`, `ALERT`, `DENY`. |
| `protocol` | string enum | Required. Protocol to match. Values: `PROTOCOL_UNSPECIFIED`, `SMTP`, `SMB`, `POP3`, `IMAP`, `HTTP2`, `HTTP`, `FTP`. |

### `AuthorizationPolicy`

- AuthorizationPolicy is a resource that specifies how a server should authorize incoming connections. This resource in itself does not change the configuration unless it's attached to a target https proxy or endpoint config selector resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Required. The action to take when a rule match is found. Possible values are "ALLOW" or "DENY". Values: `ACTION_UNSPECIFIED`, `ALLOW`, `DENY`. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. Free-text description of the resource. |
| `labels` | object | Optional. Set of label tags associated with the AuthorizationPolicy resource. |
| `name` | string | Required. Name of the AuthorizationPolicy resource. It matches pattern `projects/{project}/locations/{location}/authorizationPolicies/`. |
| `rules` | array<Rule> | Optional. List of rules to match. Note that at least one of the rules must match in order for the action specified in the 'action' field to be taken. A rule is a match if there is a matching source and destination. If left blank, the action specified in the `action` field will be applied on every request. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `AuthzPolicy`

- `AuthzPolicy` is a resource that allows to forward traffic to a callout backend designed to scan the traffic for security purposes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Required. Can be one of `ALLOW`, `DENY`, `CUSTOM`, `DENY_BY_DEFAULT`. When the action is `CUSTOM`, `customProvider` must be specified. When the action is `ALLOW`, only requests matching the policy will be allowed. When the action is `DENY`, only requests matching the policy will be denied. When the action is `DENY_BY_DEFAULT`, no `http_rules` or `network_rules` can be specified. When a request arrives, the policies are evaluated in the following order: 1. If there is a `CUSTOM` policy that matches the request, the `CUSTOM` policy is evaluated using the custom authorization providers and the request is denied if the provider rejects the request. 2. If there are any `DENY` policies that match the request, the request is denied. 3. If any of the `ALLOW` policies match the request, the request is allowed. 4. If a `DENY_BY_DEFAULT` policy is applied to the resource, the request is denied (unless it was explicitly allowed by a `CUSTOM` or `ALLOW` policy). 5. Else, the request is allowed by default if no other policies are configured. Values: `AUTHZ_ACTION_UNSPECIFIED`, `ALLOW`, `DENY`, `CUSTOM`, `DENY_BY_DEFAULT`. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `customProvider` | AuthzPolicyCustomProvider | Optional. Required if the action is `CUSTOM`. Allows delegating authorization decisions to Cloud IAP or to Service Extensions. One of `cloudIap` or `authzExtension` must be specified. |
| `description` | string | Optional. A human-readable description of the resource. |
| `httpRules` | array<AuthzPolicyAuthzRule> | Optional. A list of authorization HTTP rules to match against the incoming request. A policy match occurs when at least one HTTP rule matches the request or when no HTTP rules are specified in the policy. At least one HTTP Rule is required for Allow or Deny Action. Limited to 5 rules. |
| `labels` | object | Optional. Set of labels associated with the `AuthzPolicy` resource. The format must comply with the following requirements. |
| `name` | string | Required. Identifier. Name of the `AuthzPolicy` resource in the following format: `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`. |
| `networkRules` | array<AuthzPolicyAuthzRule> | Optional. A list of authorization network rules to match against the incoming request. A policy match occurs when at least one network rule matches the request. At least one network rule is required for Allow or Deny Action if no HTTP rules are provided. Network rules are mutually exclusive with HTTP rules. Limited to 5 rules. |
| `policyProfile` | string enum | Optional. Immutable. Defines the type of authorization being performed. If not specified, `REQUEST_AUTHZ` is applied. This field cannot be changed once AuthzPolicy is created. Values: `POLICY_PROFILE_UNSPECIFIED`, `REQUEST_AUTHZ`, `CONTENT_AUTHZ`. |
| `target` | AuthzPolicyTarget | Required. Specifies the set of resources to which this policy should be applied to. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `AuthzPolicyAuthzRule`

- Conditions to match against the incoming request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `from` | AuthzPolicyAuthzRuleFrom | Optional. Describes properties of a source of a request. |
| `to` | AuthzPolicyAuthzRuleTo | Optional. Describes properties of a target of a request. |
| `when` | string | Optional. CEL expression that describes the conditions to be satisfied for the action. The result of the CEL expression is ANDed with the from and to. Refer to the CEL language reference for a list of available attributes. |

### `AuthzPolicyAuthzRuleFrom`

- Describes properties of one or more sources of a request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `notSources` | array<AuthzPolicyAuthzRuleFromRequestSource> | Optional. Describes the negated properties of request sources. Matches requests from sources that do not match the criteria specified in this field. At least one of sources or notSources must be specified. |
| `sources` | array<AuthzPolicyAuthzRuleFromRequestSource> | Optional. Describes the properties of a request's sources. At least one of sources or notSources must be specified. Limited to 1 source. A match occurs when ANY source (in sources or notSources) matches the request. Within a single source, the match follows AND semantics across fields and OR semantics within a single field, i.e. a match occurs when ANY principal matches AND ANY ipBlocks match. |

### `AuthzPolicyAuthzRuleFromRequestSource`

- Describes the properties of a single source.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipBlocks` | array<AuthzPolicyAuthzRuleIpBlock> | Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy |
| `principals` | array<AuthzPolicyAuthzRulePrincipal> | Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh while 25 principals per Authorization Policy for global external Application Load Balancers. |
| `resources` | array<AuthzPolicyAuthzRuleRequestResource> | Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy. |

### `AuthzPolicyAuthzRuleHeaderMatch`

- Determines how a HTTP header should be matched.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Specifies the name of the header in the request. |
| `value` | AuthzPolicyAuthzRuleStringMatch | Optional. Specifies how the header match will be performed. |

### `AuthzPolicyAuthzRuleIpBlock`

- Represents a range of IP Addresses.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `length` | integer (int32) | Required. The length of the address range. |
| `prefix` | string | Required. The address prefix. |

### `AuthzPolicyAuthzRulePrincipal`

- Describes the properties of a principal to be matched against.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `principal` | AuthzPolicyAuthzRuleStringMatch | Required. A non-empty string whose value is matched against the principal value based on the principal_selector. Only exact match can be applied for CLIENT_CERT_URI_SAN, CLIENT_CERT_DNS_NAME_SAN, CLIENT_CERT_COMMON_NAME selectors. |
| `principalSelector` | string enum | Optional. An enum to decide what principal value the principal rule will match against. If not specified, the PrincipalSelector is CLIENT_CERT_URI_SAN. Values: `PRINCIPAL_SELECTOR_UNSPECIFIED`, `CLIENT_CERT_URI_SAN`, `CLIENT_CERT_DNS_NAME_SAN`, `CLIENT_CERT_COMMON_NAME`. |

### `AuthzPolicyAuthzRuleRequestResource`

- Describes the properties of a client VM resource accessing the internal application load balancers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `iamServiceAccount` | AuthzPolicyAuthzRuleStringMatch | Optional. An IAM service account to match against the source service account of the VM sending the request. |
| `tagValueIdSet` | AuthzPolicyAuthzRuleRequestResourceTagValueIdSet | Optional. A list of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request. |

### `AuthzPolicyAuthzRuleRequestResourceTagValueIdSet`

- Describes a set of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ids` | array<string> | Required. A list of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request. The match follows AND semantics which means all the ids must match. Limited to 5 ids in the Tag value id set. |

### `AuthzPolicyAuthzRuleStringMatch`

- Determines how a string value should be matched.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contains` | string | The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: \* ``abc`` matches the value ``xyz.abc.def`` |
| `exact` | string | The input string must match exactly the string specified here. Examples: \* ``abc`` only matches the value ``abc``. |
| `ignoreCase` | boolean | If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher ``data`` will match both input string ``Data`` and ``data`` if set to true. |
| `prefix` | string | The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: \* ``abc`` matches the value ``abc.xyz`` |
| `suffix` | string | The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: \* ``abc`` matches the value ``xyz.abc`` |

### `AuthzPolicyAuthzRuleTo`

- Describes properties of one or more targets of a request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `notOperations` | array<AuthzPolicyAuthzRuleToRequestOperation> | Optional. Describes the negated properties of the targets of a request. Matches requests for operations that do not match the criteria specified in this field. At least one of operations or notOperations must be specified. |
| `operations` | array<AuthzPolicyAuthzRuleToRequestOperation> | Optional. Describes properties of one or more targets of a request. At least one of operations or notOperations must be specified. Limited to 1 operation. A match occurs when ANY operation (in operations or notOperations) matches. Within an operation, the match follows AND semantics across fields and OR semantics within a field, i.e. a match occurs when ANY path matches AND ANY header matches and ANY method matches. |

### `AuthzPolicyAuthzRuleToRequestOperation`

- Describes properties of one or more targets of a request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headerSet` | AuthzPolicyAuthzRuleToRequestOperationHeaderSet | Optional. A list of headers to match against in http header. |
| `hosts` | array<AuthzPolicyAuthzRuleStringMatch> | Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy. |
| `mcp` | AuthzPolicyAuthzRuleToRequestOperationMCP | Optional. Defines the MCP protocol attributes to match on. If the MCP payload in the request body cannot be successfully parsed, the request will be denied. This field can be set only for AuthzPolicies targeting AgentGateway resources. |
| `methods` | array<string> | Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy. |
| `paths` | array<AuthzPolicyAuthzRuleStringMatch> | Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method. |
| `snis` | array<AuthzPolicyAuthzRuleStringMatch> | Optional. A list of SNIs to match against. The match can be one of exact, prefix, suffix, or contains (substring match). If there is no SNI (i.e. plaintext HTTP traffic), the request will be denied. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 SNIs per Authorization Policy. |

### `AuthzPolicyAuthzRuleToRequestOperationHeaderSet`

- Describes a set of HTTP headers to match against.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headers` | array<AuthzPolicyAuthzRuleHeaderMatch> | Required. A list of headers to match against in http header. The match can be one of exact, prefix, suffix, or contains (substring match). The match follows AND semantics which means all the headers must match. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 headers per Authorization Policy. |

### `AuthzPolicyAuthzRuleToRequestOperationMCP`

- Describes a set of MCP protocol attributes to match against for a given MCP request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseProtocolMethodsOption` | string enum | Optional. If specified, matches on the MCP protocol's non-access specific methods namely: \* initialize \* completion/ \* logging/ \* notifications/ \* ping Defaults to SKIP_BASE_PROTOCOL_METHODS if not specified. Values: `BASE_PROTOCOL_METHODS_OPTION_UNSPECIFIED`, `SKIP_BASE_PROTOCOL_METHODS`, `MATCH_BASE_PROTOCOL_METHODS`. |
| `methods` | array<AuthzPolicyAuthzRuleToRequestOperationMCPMethod> | Optional. A list of MCP methods and associated parameters to match on. It is recommended to use this field to match on tools, prompts and resource accesses while setting the baseProtocolMethodsOption to MATCH_BASE_PROTOCOL_METHODS to match on all the other MCP protocol methods. Limited to 10 MCP methods per Authorization Policy. |

### `AuthzPolicyAuthzRuleToRequestOperationMCPMethod`

- Describes a set of MCP methods to match against.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The MCP method to match against. Allowed values include: 1. `tools`, `prompts`, `resources` - these will match against all sub methods under the respective methods. 2. `prompts/list`, `tools/list`, `resources/list`, `resources/templates/list` 3. `prompts/get`, `tools/call`, `resources/subscribe`, `resources/unsubscribe`, `resources/read` Params cannot be specified for categories 1 and 2. |
| `params` | array<AuthzPolicyAuthzRuleStringMatch> | Optional. A list of MCP method parameters to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 MCP method parameters per Authorization Policy. |

### `AuthzPolicyCustomProvider`

- Allows delegating authorization decisions to Cloud IAP or to Service Extensions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authzExtension` | AuthzPolicyCustomProviderAuthzExtension | Optional. Delegate authorization decision to user authored Service Extension. Only one of cloudIap or authzExtension can be specified. |
| `cloudIap` | AuthzPolicyCustomProviderCloudIap | Optional. Delegates authorization decisions to Cloud IAP. Applicable only for managed load balancers. Enabling Cloud IAP at the AuthzPolicy level is not compatible with Cloud IAP settings in the BackendService. Enabling IAP in both places will result in request failure. Ensure that IAP is enabled in either the AuthzPolicy or the BackendService but not in both places. |

### `AuthzPolicyCustomProviderAuthzExtension`

- Optional. Delegate authorization decision to user authored extension. Only one of cloudIap or authzExtension can be specified.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resources` | array<string> | Required. A list of references to authorization extensions that will be invoked for requests matching this policy. Limited to 1 custom provider. |

### `AuthzPolicyCustomProviderCloudIap`

- Optional. Delegates authorization decisions to Cloud IAP. Applicable only for managed load balancers. Enabling Cloud IAP at the AuthzPolicy level is not compatible with Cloud IAP settings in the BackendService. Enabling IAP in both places will result in request failure. Ensure that IAP is enabled in either the AuthzPolicy or the BackendService but not in both places.
- Version: v1

### `AuthzPolicyTarget`

- Specifies the set of targets to which this policy should be applied to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `loadBalancingScheme` | string enum | Optional. All gateways and forwarding rules referenced by this policy and extensions must share the same load balancing scheme. Required only when targeting forwarding rules. If targeting Secure Web Proxy, this field must be `INTERNAL_MANAGED` or not specified. Must not be specified when targeting Agent Gateway. Supported values include `INTERNAL_MANAGED` and `EXTERNAL_MANAGED`. For more information, refer to Backend services overview (https://cloud.google.com/load-balancing/docs/backend-service). Values: `LOAD_BALANCING_SCHEME_UNSPECIFIED`, `INTERNAL_MANAGED`, `EXTERNAL_MANAGED`, `INTERNAL_SELF_MANAGED`. |
| `resources` | array<string> | Required. A list of references to the Forwarding Rules, Secure Web Proxy Gateways, or Agent Gateways on which this policy will be applied. |

### `BackendAuthenticationConfig`

- BackendAuthenticationConfig message groups the TrustConfig together with other settings that control how the load balancer authenticates, and expresses its identity to, the backend: \* `trustConfig` is the attached TrustConfig. \* `wellKnownRoots` indicates whether the load balance should trust backend server certificates that are issued by public certificate authorities, in addition to certificates trusted by the TrustConfig. \* `clientCertificate` is a client certificate that the load balancer uses to express its identity to the backend, if the connection to the backend uses mTLS. You can attach the BackendAuthenticationConfig to the load balancer's BackendService directly determining how that BackendService negotiates TLS.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientCertificate` | string | Optional. A reference to a certificatemanager.googleapis.com.Certificate resource. This is a relative resource path following the form "projects/{project}/locations/{location}/certificates/{certificate}". Used by a BackendService to negotiate mTLS when the backend connection uses TLS and the backend requests a client certificate. Must have a CLIENT_AUTH scope. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. Free-text description of the resource. |
| `etag` | string | Output only. Etag of the resource. |
| `labels` | object | Set of label tags associated with the resource. |
| `name` | string | Required. Name of the BackendAuthenticationConfig resource. It matches the pattern `projects/*/locations/{location}/backendAuthenticationConfigs/{backend_authentication_config}` |
| `trustConfig` | string | Optional. A reference to a TrustConfig resource from the certificatemanager.googleapis.com namespace. This is a relative resource path following the form "projects/{project}/locations/{location}/trustConfigs/{trust_config}". A BackendService uses the chain of trust represented by this TrustConfig, if specified, to validate the server certificates presented by the backend. Required unless wellKnownRoots is set to PUBLIC_ROOTS. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |
| `wellKnownRoots` | string enum | Well known roots to use for server certificate validation. Values: `WELL_KNOWN_ROOTS_UNSPECIFIED`, `NONE`, `PUBLIC_ROOTS`. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CertificateProviderInstance`

- Specification of a TLS certificate provider instance. Workloads may have one or more CertificateProvider instances (plugins) and one of them is enabled and configured by specifying this message. Workloads use the values from this message to locate and load the CertificateProvider instance configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pluginInstance` | string | Required. Plugin instance name, used to locate and load CertificateProvider instance configuration. Set to "google_cloud_private_spiffe" to use Certificate Authority Service certificate provider instance. |

### `ClientTlsPolicy`

- ClientTlsPolicy is a resource that specifies how a client should authenticate connections to backends of a service. This resource itself does not affect configuration unless it is attached to a backend service resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientCertificate` | GoogleCloudNetworksecurityV1CertificateProvider | Optional. Defines a mechanism to provision client identity (public and private keys) for peer to peer authentication. The presence of this dictates mTLS. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. Free-text description of the resource. |
| `labels` | object | Optional. Set of label tags associated with the resource. |
| `name` | string | Required. Name of the ClientTlsPolicy resource. It matches the pattern `projects/{project}/locations/{location}/clientTlsPolicies/{client_tls_policy}` |
| `serverValidationCa` | array<ValidationCA> | Optional. Defines the mechanism to obtain the Certificate Authority certificate to validate the server certificate. If empty, client does not validate the server certificate. |
| `sni` | string | Optional. Server Name Indication string to present to the server during TLS handshake. E.g: "secure.example.com". |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `ClientTlsPolicy` (v1beta1)

- ClientTlsPolicy is a resource that specifies how a client should authenticate connections to backends of a service. This resource itself does not affect configuration unless it is attached to a backend service resource.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `clientCertificate` | GoogleCloudNetworksecurityV1beta1CertificateProvider | Optional. Defines a mechanism to provision client identity (public and private keys) for peer to peer authentication. The presence of this dictates mTLS. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. Free-text description of the resource. |
| `labels` | object | Optional. Set of label tags associated with the resource. |
| `name` | string | Required. Name of the ClientTlsPolicy resource. It matches the pattern `projects/{project}/locations/{location}/clientTlsPolicies/{client_tls_policy}` |
| `serverValidationCa` | array<ValidationCA> | Optional. Defines the mechanism to obtain the Certificate Authority certificate to validate the server certificate. If empty, client does not validate the server certificate. |
| `sni` | string | Optional. Server Name Indication string to present to the server during TLS handshake. E.g: "secure.example.com". |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `CloneAddressGroupItemsRequest`

- Request used by the CloneAddressGroupItems method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `sourceAddressGroup` | string | Required. Source address group to clone items from. |

### `CustomInterceptProfile`

- CustomInterceptProfile defines in-band integration behavior (intercept). It is used by firewall rules with an APPLY_SECURITY_PROFILE_GROUP action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interceptEndpointGroup` | string | Required. The target InterceptEndpointGroup. When a firewall rule with this security profile attached matches a packet, the packet will be intercepted to the location-local target in this group. |

### `CustomMirroringProfile`

- CustomMirroringProfile defines out-of-band integration behavior (mirroring). It is used by mirroring rules with a MIRROR action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mirroringEndpointGroup` | string | Required. Immutable. The target MirroringEndpointGroup. When a mirroring rule with this security profile attached matches a packet, a replica will be mirrored to the location-local target in this group. |

### `Destination`

- Specification of traffic destination attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hosts` | array<string> | Required. List of host names to match. Matched against the ":authority" header in http requests. At least one host should match. Each host can be an exact match, or a prefix match (example "mydomain.\*") or a suffix match (example "\*.myorg.com") or a presence (any) match "\*". |
| `httpHeaderMatch` | HttpHeaderMatch | Optional. Match against key:value pair in http header. Provides a flexible match based on HTTP headers, for potentially advanced use cases. At least one header should match. Avoid using header matches to make authorization decisions unless there is a strong guarantee that requests arrive through a trusted client or proxy. |
| `methods` | array<string> | Optional. A list of HTTP methods to match. At least one method should match. Should not be set for gRPC services. |
| `ports` | array<integer> | Required. List of destination ports to match. At least one port should match. |

### `DnsThreatDetector`

- A DNS threat detector sends DNS query logs to a \_provider\_ that then analyzes the logs to identify threat events in the DNS queries. By default, all VPC networks in your projects are included. You can exclude specific networks by supplying `excluded_networks`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create time stamp. |
| `excludedNetworks` | array<string> | Optional. A list of network resource names which aren't monitored by this DnsThreatDetector. Example: `projects/PROJECT_ID/global/networks/NETWORK_NAME`. |
| `labels` | object | Optional. Any labels associated with the DnsThreatDetector, listed as key value pairs. |
| `name` | string | Immutable. Identifier. Name of the DnsThreatDetector resource. |
| `provider` | string enum | Required. The provider used for DNS threat analysis. Values: `PROVIDER_UNSPECIFIED`, `INFOBLOX`. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FirewallEndpoint`

- Message describing a firewall endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `associatedNetworks` | array<string> | Output only. Deprecated: Use the `network` field in the `associations` message instead. List of networks that are associated with this endpoint in the local zone. This is a projection of the firewall endpoint association resources pointing at this endpoint. A network only appears in this list after traffic routing is fully configured. Format: `projects/{project}/global/networks/{name}`. |
| `associations` | array<FirewallEndpointAssociationReference> | Output only. List of firewall endpoint association resources that are associated with this endpoint. An association only appears in this list after traffic routing is fully configured. |
| `billingProjectId` | string | Optional. Project to charge for the deployed firewall endpoint. This field must be specified when creating the endpoint in the organization scope, and should be omitted otherwise. |
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `description` | string | Optional. Description of the firewall endpoint. The maximum length is 2048 characters. |
| `endpointSettings` | FirewallEndpointEndpointSettings | Optional. Settings for the endpoint. |
| `labels` | object | Optional. Labels as key-value pairs. |
| `name` | string | Immutable. Identifier. The name of the resource. |
| `reconciling` | boolean | Output only. Whether reconciling is in progress, recommended per https://google.aip.dev/128. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `state` | string enum | Output only. Current state of the endpoint. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `INACTIVE`. |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. |
| `wildfireSettings` | FirewallEndpointWildfireSettings | Optional. Settings for Advanced malware sandbox (WildFire) analysis. |

### `FirewallEndpoint` (v1beta1)

- Message describing a firewall endpoint.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `associatedNetworks` | array<string> | Output only. Deprecated: Use the `network` field in the `associations` message instead. List of networks that are associated with this endpoint in the local zone. This is a projection of the firewall endpoint association resources pointing at this endpoint. A network only appears in this list after traffic routing is fully configured. Format: `projects/{project}/global/networks/{name}`. |
| `associations` | array<FirewallEndpointAssociationReference> | Output only. List of firewall endpoint association resources that are associated with this endpoint. An association only appears in this list after traffic routing is fully configured. |
| `billingProjectId` | string | Optional. Project to charge for the deployed firewall endpoint. This field must be specified when creating the endpoint in the organization scope, and should be omitted otherwise. |
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `description` | string | Optional. Description of the firewall endpoint. The maximum length is 2048 characters. |
| `endpointSettings` | FirewallEndpointEndpointSettings | Optional. Settings for the endpoint. |
| `explicitPrivateServiceConnectAttachment` | string | Output only. The resource name of the explicit Private Service Connect (PSC) attachment. Format: `projects/{project}/regions/{region}/serviceAttachments/{id}`. |
| `labels` | object | Optional. Labels as key-value pairs. |
| `name` | string | Immutable. Identifier. The name of the resource. |
| `reconciling` | boolean | Output only. Whether reconciling is in progress, recommended per https://google.aip.dev/128. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `state` | string enum | Output only. Current state of the endpoint. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `INACTIVE`. |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. |
| `wildfireSettings` | FirewallEndpointWildfireSettings | Optional. Settings for Advanced malware sandbox (WildFire) analysis. |

### `FirewallEndpointAssociation`

- Message describing a firewall endpoint association.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `disabled` | boolean | Optional. Whether the association is disabled. Setting this to `true` indicates that traffic isn't intercepted. The default value is `false`. |
| `firewallEndpoint` | string | Required. The URL of the `FirewallEndpoint` that is being associated. |
| `labels` | object | Optional. Labels as key-value pairs. |
| `name` | string | Immutable. Identifier. The name of the resource. |
| `network` | string | Required. The URL of the network that is being associated. |
| `reconciling` | boolean | Output only. Whether reconciliation is in progress. |
| `state` | string enum | Output only. Current state of the association. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `INACTIVE`, `ORPHAN`. |
| `tlsInspectionPolicy` | string | Optional. The URL of the `TlsInspectionPolicy` that is being associated. |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. |

### `FirewallEndpointAssociationReference`

- A subset of the `FirewallEndpointAssociation` message, containing fields to be used by the consumer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The resource name of the `FirewallEndpointAssociation`. Format: `projects/{project}/locations/{location}/firewallEndpointAssociations/{id}`. |
| `network` | string | Output only. The associated VPC network. Format: `projects/{project}/global/networks/{name}`. |

### `FirewallEndpointEndpointSettings`

- Settings for the endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contentCloudRegion` | string enum | Optional. The content cloud region of the endpoint. Values: `CONTENT_CLOUD_REGION_UNSPECIFIED`, `US_CENTRAL`, `APAC`, `INDIA`, `UK`, `FRANCE`, `JAPAN`, `AUSTRALIA`, `CANADA`, `SWITZERLAND`, `NETHERLANDS`, `INDONESIA`, `QATAR`, `TAIWAN`, `POLAND`, `SOUTH_KOREA`, `SAUDI_ARABIA`, `ITALY`. |
| `httpPartialResponseBlocked` | boolean | Optional. Whether to block HTTP partial responses for the endpoint. When set to `true`, the firewall blocks the resumption of HTTP file downloads. Setting this to `false` provides maximum availability, while `true` provides maximum security. |
| `jumboFramesEnabled` | boolean | Optional. Immutable. Indicates whether jumbo frames are enabled. The default value is `false`. |

### `FirewallEndpointWildfireSettings`

- Settings for Advanced malware sandbox analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Indicates whether Advanced malware sandbox analysis is enabled. The default value is `false`. |
| `wildfireInlineCloudAnalysisSettings` | FirewallEndpointWildfireSettingsWildfireInlineCloudAnalysisSettings | Optional. Settings for Advanced malware sandbox inline cloud analysis. |
| `wildfireRealtimeLookupDuration` | string (google-duration) | Optional. The duration that a file is held while the Advanced malware sandbox real-time signature cloud performs a signature lookup. Valid values are from 1 to 5000 milliseconds. In canonical JSON encoding, this is represented as a string ending in `s` (for example, `"0.001s"` to `"5s"`). The default value is `1000` milliseconds (`"1s"` in JSON). |
| `wildfireRealtimeLookupTimeoutAction` | string enum | Optional. The action to take on an Advanced malware sandbox real-time signature lookup timeout. The default value is `ALLOW`. Values: `WILDFIRE_REALTIME_SIGNATURE_LOOKUP_TIMEOUT_ACTION_UNSPECIFIED`, `ALLOW`, `DENY`. |
| `wildfireRegion` | string enum | Optional. The region where Advanced malware sandbox analysis is performed. For a list of Palo Alto Networks supported regions, see Advanced WildFire global cloud (https://docs.paloaltonetworks.com/advanced-wildfire/administration/advanced-wildfire-overview/advanced-wildfire-deployments/advanced-wildfire-global-cloud). Values: `WILDFIRE_REGION_UNSPECIFIED`, `CANADA`, `UNITED_STATES`, `JAPAN`, `SINGAPORE`, `UNITED_KINGDOM`, `AUSTRALIA`, `GERMANY`, `INDIA`, `SWITZERLAND`, `POLAND`, `INDONESIA`, `TAIWAN`, `FRANCE`, `QATAR`, `SOUTH_KOREA`, `ISRAEL`, `SAUDI_ARABIA`, `SPAIN`. |

### `FirewallEndpointWildfireSettingsWildfireInlineCloudAnalysisSettings`

- Settings for Advanced malware sandbox inline cloud analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxAnalysisDuration` | string (google-duration) | Optional. The timeout that a file is held while Advanced malware sandbox inline cloud analysis is performed. Valid values are from 1 to 240000 milliseconds. In canonical JSON encoding, this is represented as a string ending in `s` (for example, `"0.001s"` to `"240s"`). The default value is `30000` milliseconds (`"30s"` in JSON). |
| `submissionTimeoutLoggingDisabled` | boolean | Optional. Whether to disable Advanced malware sandbox submission log generation for files that time out during Advanced malware sandbox inline cloud analysis. |
| `timeoutAction` | string enum | Optional. The action to take when Advanced malware sandbox inline cloud analysis times out. The default value is `ALLOW`. Values: `WILDFIRE_INLINE_CLOUD_ANALYSIS_TIMEOUT_ACTION_UNSPECIFIED`, `ALLOW`, `DENY`. |

### `GatewaySecurityPolicy`

- The GatewaySecurityPolicy resource contains a collection of GatewaySecurityPolicyRules and associated metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. Free-text description of the resource. |
| `name` | string | Required. Name of the resource. Name is of the form projects/{project}/locations/{location}/gatewaySecurityPolicies/{gateway_security_policy} gateway_security_policy should match the pattern:(^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$). |
| `tlsInspectionPolicy` | string | Optional. Name of a TLS Inspection Policy resource that defines how TLS inspection will be performed for any rule(s) which enables it. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `GatewaySecurityPolicyRule`

- The GatewaySecurityPolicyRule resource is in a nested collection within a GatewaySecurityPolicy and represents a traffic matching condition and associated action to perform.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applicationMatcher` | string | Optional. CEL expression for matching on L7/application level criteria. |
| `basicProfile` | string enum | Required. Profile which tells what the primitive action should be. Values: `BASIC_PROFILE_UNSPECIFIED`, `ALLOW`, `DENY`. |
| `createTime` | string (google-datetime) | Output only. Time when the rule was created. |
| `description` | string | Optional. Free-text description of the resource. |
| `enabled` | boolean | Required. Whether the rule is enforced. |
| `name` | string | Required. Immutable. Name of the resource. ame is the full resource name so projects/{project}/locations/{location}/gatewaySecurityPolicies/{gateway_security_policy}/rules/{rule} rule should match the pattern: (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$). |
| `priority` | integer (int32) | Required. Priority of the rule. Lower number corresponds to higher precedence. |
| `sessionMatcher` | string | Required. CEL expression for matching on session criteria. |
| `tlsInspectionEnabled` | boolean | Optional. Flag to enable TLS inspection of traffic matching on , can only be true if the parent GatewaySecurityPolicy references a TLSInspectionConfig. |
| `updateTime` | string (google-datetime) | Output only. Time when the rule was updated. |

### `GoogleCloudNetworksecurityV1CertificateProvider`

- Specification of certificate provider. Defines the mechanism to obtain the certificate and private key for peer to peer authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateProviderInstance` | CertificateProviderInstance | The certificate provider instance specification that will be passed to the data plane, which will be used to load necessary credential information. |
| `grpcEndpoint` | GoogleCloudNetworksecurityV1GrpcEndpoint | gRPC specific configuration to access the gRPC server to obtain the cert and private key. |

### `GoogleCloudNetworksecurityV1GrpcEndpoint`

- Specification of the GRPC Endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetUri` | string | Required. The target URI of the gRPC endpoint. Only UDS path is supported, and should start with "unix:". |

### `GoogleCloudNetworksecurityV1beta1CertificateProvider`

- Specification of certificate provider. Defines the mechanism to obtain the certificate and private key for peer to peer authentication.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `certificateProviderInstance` | CertificateProviderInstance | The certificate provider instance specification that will be passed to the data plane, which will be used to load necessary credential information. |
| `grpcEndpoint` | GoogleCloudNetworksecurityV1beta1GrpcEndpoint | gRPC specific configuration to access the gRPC server to obtain the cert and private key. |

### `GoogleCloudNetworksecurityV1beta1GrpcEndpoint`

- Specification of the GRPC Endpoint.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `targetUri` | string | Required. The target URI of the gRPC endpoint. Only UDS path is supported, and should start with "unix:". |

### `GoogleIamV1AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<GoogleIamV1AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `GoogleIamV1AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `GoogleIamV1Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `GoogleIamV1Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<GoogleIamV1AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<GoogleIamV1Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `GoogleIamV1SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | GoogleIamV1Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `GoogleIamV1TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `GoogleIamV1TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `HttpHeaderMatch`

- Specification of HTTP header match attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headerName` | string | Required. The name of the HTTP header to match. For matching against the HTTP request's authority, use a headerMatch with the header name ":authority". For matching a request's method, use the headerName ":method". |
| `regexMatch` | string | Required. The value of the header must match the regular expression specified in regexMatch. For regular expression grammar, please see: en.cppreference.com/w/cpp/regex/ecmascript For matching against a port specified in the HTTP request, use a headerMatch with headerName set to Host and a regular expression that satisfies the RFC2616 Host header's port specifier. |

### `InterceptDeployment`

- A deployment represents a zonal intercept backend ready to accept GENEVE-encapsulated traffic, e.g. a zonal instance group fronted by an internal passthrough load balancer. Deployments are always part of a global deployment group which represents a global intercept service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. |
| `description` | string | Optional. User-provided description of the deployment. Used as additional context for the deployment. |
| `forwardingRule` | string | Required. Immutable. The regional forwarding rule that fronts the interceptors, for example: `projects/123456789/regions/us-central1/forwardingRules/my-rule`. See https://google.aip.dev/124. |
| `interceptDeploymentGroup` | string | Required. Immutable. The deployment group that this deployment is a part of, for example: `projects/123456789/locations/global/interceptDeploymentGroups/my-dg`. See https://google.aip.dev/124. |
| `labels` | object | Optional. Labels are key/value pairs that help to organize and filter resources. |
| `name` | string | Immutable. Identifier. The resource name of this deployment, for example: `projects/123456789/locations/us-central1-a/interceptDeployments/my-dep`. See https://google.aip.dev/122 for more details. |
| `reconciling` | boolean | Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This part of the normal operation (e.g. linking a new association to the parent group). See https://google.aip.dev/128. |
| `state` | string enum | Output only. The current state of the deployment. See https://google.aip.dev/216. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `OUT_OF_SYNC`, `DELETE_FAILED`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. |

### `InterceptDeploymentGroup`

- A deployment group aggregates many zonal intercept backends (deployments) into a single global intercept service. Consumers can connect this service using an endpoint group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectedEndpointGroups` | array<InterceptDeploymentGroupConnectedEndpointGroup> | Output only. The list of endpoint groups that are connected to this resource. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. |
| `description` | string | Optional. User-provided description of the deployment group. Used as additional context for the deployment group. |
| `labels` | object | Optional. Labels are key/value pairs that help to organize and filter resources. |
| `locations` | array<InterceptLocation> | Output only. The list of locations where the deployment group is present. |
| `name` | string | Immutable. Identifier. The resource name of this deployment group, for example: `projects/123456789/locations/global/interceptDeploymentGroups/my-dg`. See https://google.aip.dev/122 for more details. |
| `nestedDeployments` | array<InterceptDeploymentGroupDeployment> | Output only. The list of Intercept Deployments that belong to this group. |
| `network` | string | Required. Immutable. The network that will be used for all child deployments, for example: `projects/{project}/global/networks/{network}`. See https://google.aip.dev/124. |
| `reconciling` | boolean | Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This is part of the normal operation (e.g. adding a new deployment to the group) See https://google.aip.dev/128. |
| `state` | string enum | Output only. The current state of the deployment group. See https://google.aip.dev/216. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. |

### `InterceptDeploymentGroupConnectedEndpointGroup`

- An endpoint group connected to this deployment group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The connected endpoint group's resource name, for example: `projects/123456789/locations/global/interceptEndpointGroups/my-eg`. See https://google.aip.dev/124. |

### `InterceptDeploymentGroupDeployment`

- A deployment belonging to this deployment group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The name of the Intercept Deployment, in the format: `projects/{project}/locations/{location}/interceptDeployments/{intercept_deployment}`. |
| `state` | string enum | Output only. Most recent known state of the deployment. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `OUT_OF_SYNC`, `DELETE_FAILED`. |

### `InterceptEndpointGroup`

- An endpoint group is a consumer frontend for a deployment group (backend). In order to configure intercept for a network, consumers must create: - An association between their network and the endpoint group. - A security profile that points to the endpoint group. - A firewall rule that references the security profile (group).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `associations` | array<InterceptEndpointGroupAssociationDetails> | Output only. List of associations to this endpoint group. |
| `connectedDeploymentGroup` | InterceptEndpointGroupConnectedDeploymentGroup | Output only. Details about the connected deployment group to this endpoint group. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. |
| `description` | string | Optional. User-provided description of the endpoint group. Used as additional context for the endpoint group. |
| `interceptDeploymentGroup` | string | Required. Immutable. The deployment group that this endpoint group is connected to, for example: `projects/123456789/locations/global/interceptDeploymentGroups/my-dg`. See https://google.aip.dev/124. |
| `labels` | object | Optional. Labels are key/value pairs that help to organize and filter resources. |
| `name` | string | Immutable. Identifier. The resource name of this endpoint group, for example: `projects/123456789/locations/global/interceptEndpointGroups/my-eg`. See https://google.aip.dev/122 for more details. |
| `reconciling` | boolean | Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This is part of the normal operation (e.g. adding a new association to the group). See https://google.aip.dev/128. |
| `state` | string enum | Output only. The current state of the endpoint group. See https://google.aip.dev/216. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CLOSED`, `CREATING`, `DELETING`, `OUT_OF_SYNC`, `DELETE_FAILED`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. |

### `InterceptEndpointGroupAssociation`

- An endpoint group association represents a link between a network and an endpoint group in the organization. Creating an association creates the networking infrastructure linking the network to the endpoint group, but does not enable intercept by itself. To enable intercept, the user must also create a network firewall policy containing intercept rules and associate it with the network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. |
| `interceptEndpointGroup` | string | Required. Immutable. The endpoint group that this association is connected to, for example: `projects/123456789/locations/global/interceptEndpointGroups/my-eg`. See https://google.aip.dev/124. |
| `labels` | object | Optional. Labels are key/value pairs that help to organize and filter resources. |
| `locations` | array<InterceptLocation> | Output only. The list of locations where the association is configured. This information is retrieved from the linked endpoint group. |
| `locationsDetails` | array<InterceptEndpointGroupAssociationLocationDetails> | Output only. The list of locations where the association is present. This information is retrieved from the linked endpoint group, and not configured as part of the association itself. |
| `name` | string | Immutable. Identifier. The resource name of this endpoint group association, for example: `projects/123456789/locations/global/interceptEndpointGroupAssociations/my-eg-association`. See https://google.aip.dev/122 for more details. |
| `network` | string | Required. Immutable. The VPC network that is associated. for example: `projects/123456789/global/networks/my-network`. See https://google.aip.dev/124. |
| `networkCookie` | integer (uint32) | Output only. Identifier used by the data-path. See the NSI GENEVE format for more details: https://docs.cloud.google.com/network-security-integration/docs/understand-geneve#network_id |
| `reconciling` | boolean | Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This part of the normal operation (e.g. adding a new location to the target deployment group). See https://google.aip.dev/128. |
| `state` | string enum | Output only. Current state of the endpoint group association. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `CLOSED`, `OUT_OF_SYNC`, `DELETE_FAILED`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. |

### `InterceptEndpointGroupAssociationDetails`

- The endpoint group's view of a connected association.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The connected association's resource name, for example: `projects/123456789/locations/global/interceptEndpointGroupAssociations/my-ega`. See https://google.aip.dev/124. |
| `network` | string | Output only. The associated network, for example: projects/123456789/global/networks/my-network. See https://google.aip.dev/124. |
| `state` | string enum | Output only. Most recent known state of the association. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `CLOSED`, `OUT_OF_SYNC`, `DELETE_FAILED`. |

### `InterceptEndpointGroupAssociationLocationDetails`

- Contains details about the state of an association in a specific cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | Output only. The cloud location, e.g. "us-central1-a" or "asia-south1". |
| `state` | string enum | Output only. The current state of the association in this location. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `OUT_OF_SYNC`. |

### `InterceptEndpointGroupConnectedDeploymentGroup`

- The endpoint group's view of a connected deployment group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<InterceptLocation> | Output only. The list of locations where the deployment group is present. |
| `name` | string | Output only. The connected deployment group's resource name, for example: `projects/123456789/locations/global/interceptDeploymentGroups/my-dg`. See https://google.aip.dev/124. |

### `InterceptLocation`

- Details about intercept in a specific cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | Output only. The cloud location, e.g. "us-central1-a" or "asia-south1". |
| `state` | string enum | Output only. The current state of the association in this location. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `OUT_OF_SYNC`. |

### `ListAddressGroupReferencesResponse`

- Response of the ListAddressGroupReferences method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addressGroupReferences` | array<ListAddressGroupReferencesResponseAddressGroupReference> | A list of references that matches the specified filter in the request. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |

### `ListAddressGroupReferencesResponseAddressGroupReference`

- The Reference of AddressGroup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `firewallPolicy` | string | FirewallPolicy that is using the Address Group. |
| `rulePriority` | integer (int32) | Rule priority of the FirewallPolicy that is using the Address Group. |
| `securityPolicy` | string | Cloud Armor SecurityPolicy that is using the Address Group. |

### `ListAddressGroupsResponse`

- Response returned by the ListAddressGroups method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addressGroups` | array<AddressGroup> | List of AddressGroups resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListAuthorizationPoliciesResponse`

- Response returned by the ListAuthorizationPolicies method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationPolicies` | array<AuthorizationPolicy> | List of AuthorizationPolicies resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |

### `ListAuthzPoliciesResponse`

- Message for response to listing `AuthzPolicy` resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authzPolicies` | array<AuthzPolicy> | The list of `AuthzPolicy` resources. |
| `nextPageToken` | string | A token identifying a page of results that the server returns. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBackendAuthenticationConfigsResponse`

- Response returned by the ListBackendAuthenticationConfigs method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendAuthenticationConfigs` | array<BackendAuthenticationConfig> | List of BackendAuthenticationConfig resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListClientTlsPoliciesResponse`

- Response returned by the ListClientTlsPolicies method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientTlsPolicies` | array<ClientTlsPolicy> | List of ClientTlsPolicy resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |

### `ListDnsThreatDetectorsResponse`

- The response message to requesting a list of DnsThreatDetectors.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsThreatDetectors` | array<DnsThreatDetector> | The list of DnsThreatDetector resources. |
| `nextPageToken` | string | A token, which can be sent as `page_token`, to retrieve the next page. |
| `unreachable` | array<string> | Unordered list. Unreachable `DnsThreatDetector` resources. |

### `ListFirewallEndpointAssociationsResponse`

- Message for response to listing associations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `firewallEndpointAssociations` | array<FirewallEndpointAssociation> | The list of associations. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. The list of unreachable locations might expand in the future. |

### `ListFirewallEndpointsResponse`

- Message for response to listing endpoints.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `firewallEndpoints` | array<FirewallEndpoint> | The list of endpoints. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. The list of unreachable locations might expand in the future. |

### `ListGatewaySecurityPoliciesResponse`

- Response returned by the ListGatewaySecurityPolicies method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gatewaySecurityPolicies` | array<GatewaySecurityPolicy> | List of GatewaySecurityPolicies resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then 'next_page_token' is included. To get the next set of results, call this method again using the value of 'next_page_token' as 'page_token'. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListGatewaySecurityPolicyRulesResponse`

- Response returned by the ListGatewaySecurityPolicyRules method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gatewaySecurityPolicyRules` | array<GatewaySecurityPolicyRule> | List of GatewaySecurityPolicyRule resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then 'next_page_token' is included. To get the next set of results, call this method again using the value of 'next_page_token' as 'page_token'. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListInterceptDeploymentGroupsResponse`

- Response message for ListInterceptDeploymentGroups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interceptDeploymentGroups` | array<InterceptDeploymentGroup> | The deployment groups from the specified parent. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. |

### `ListInterceptDeploymentsResponse`

- Response message for ListInterceptDeployments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interceptDeployments` | array<InterceptDeployment> | The deployments from the specified parent. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListInterceptEndpointGroupAssociationsResponse`

- Response message for ListInterceptEndpointGroupAssociations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interceptEndpointGroupAssociations` | array<InterceptEndpointGroupAssociation> | The associations from the specified parent. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. |

### `ListInterceptEndpointGroupsResponse`

- Response message for ListInterceptEndpointGroups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `interceptEndpointGroups` | array<InterceptEndpointGroup> | The endpoint groups from the specified parent. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListMirroringDeploymentGroupsResponse`

- Response message for ListMirroringDeploymentGroups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mirroringDeploymentGroups` | array<MirroringDeploymentGroup> | The deployment groups from the specified parent. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. |

### `ListMirroringDeploymentsResponse`

- Response message for ListMirroringDeployments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mirroringDeployments` | array<MirroringDeployment> | The deployments from the specified parent. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. See https://google.aip.dev/217 for more details. |

### `ListMirroringEndpointGroupAssociationsResponse`

- Response message for ListMirroringEndpointGroupAssociations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mirroringEndpointGroupAssociations` | array<MirroringEndpointGroupAssociation> | The associations from the specified parent. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. |

### `ListMirroringEndpointGroupsResponse`

- Response message for ListMirroringEndpointGroups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mirroringEndpointGroups` | array<MirroringEndpointGroup> | The endpoint groups from the specified parent. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. See https://google.aip.dev/158 for more details. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListRateLimitPoliciesResponse`

- Contains a response to listing `RateLimitPolicy` resources.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Identifies a token for a page of results the server should return. |
| `rateLimitPolicies` | array<RateLimitPolicy> | Contains a list of `RateLimitPolicy` resources. |
| `unreachable` | array<string> | Unordered list. Lists locations that could not be reached. |

### `ListSACAttachmentsResponse`

- Response for `ListSACAttachments` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `sacAttachments` | array<SACAttachment> | The list of SACAttachments. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListSACRealmsResponse`

- Response for `ListSACRealms` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `sacRealms` | array<SACRealm> | The list of SACRealms. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListSecurityProfileGroupsResponse`

- Response returned by the `ListSecurityProfileGroups` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `securityProfileGroups` | array<SecurityProfileGroup> | List of `SecurityProfileGroup` resources. |

### `ListSecurityProfilesResponse`

- Response returned by the `ListSecurityProfiles` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `securityProfiles` | array<SecurityProfile> | List of `SecurityProfile` resources. |

### `ListServerTlsPoliciesResponse`

- Response returned by the ListServerTlsPolicies method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `serverTlsPolicies` | array<ServerTlsPolicy> | List of ServerTlsPolicy resources. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request opts into `return_partial_success` and reading across collections e.g. when attempting to list all resources across all supported locations. |

### `ListTlsInspectionPoliciesResponse`

- Response returned by the ListTlsInspectionPolicies method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then 'next_page_token' is included. To get the next set of results, call this method again using the value of 'next_page_token' as 'page_token'. |
| `tlsInspectionPolicies` | array<TlsInspectionPolicy> | List of TlsInspectionPolicies resources. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListUrlListsResponse`

- Response returned by the ListUrlLists method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Locations that could not be reached. |
| `urlLists` | array<UrlList> | List of UrlList resources. |

### `ListWildfireVerdictChangeRequestsResponse`

- Message for response to listing `WildfireVerdictChangeRequest` resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |
| `wildfireVerdictChangeRequests` | array<WildfireVerdictChangeRequest> | The list of `WildfireVerdictChangeRequest` resources. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `MTLSPolicy`

- Specification of the MTLSPolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientValidationCa` | array<ValidationCA> | Required if the policy is to be used with Traffic Director. For Application Load Balancers it must be empty. Defines the mechanism to obtain the Certificate Authority certificate to validate the client certificate. |
| `clientValidationMode` | string enum | When the client presents an invalid certificate or no certificate to the load balancer, the `client_validation_mode` specifies how the client connection is handled. Required if the policy is to be used with the Application Load Balancers. For Traffic Director it must be empty. Values: `CLIENT_VALIDATION_MODE_UNSPECIFIED`, `ALLOW_INVALID_OR_MISSING_CLIENT_CERT`, `REJECT_INVALID`, `ALLOW_VALIDATION_RELAXATIONS`. |
| `clientValidationRelaxations` | array<string> | A list of validation relaxations to apply when `client_validation_mode` is set to ALLOW_VALIDATION_RELAXATIONS. Values: `CLIENT_VALIDATION_RELAXATION_UNSPECIFIED`, `ALLOW_MISSING_EKU`, `ALLOW_SHA1_HASHING`, `ALLOW_EXPIRED_LEAF_CERTIFICATE`. |
| `clientValidationTrustConfig` | string | Reference to the TrustConfig from certificatemanager.googleapis.com namespace. If specified, the chain validation will be performed against certificates configured in the given TrustConfig. Allowed only if the policy is to be used with Application Load Balancers. |

### `MirroringDeployment`

- A deployment represents a zonal mirroring backend ready to accept GENEVE-encapsulated replica traffic, e.g. a zonal instance group fronted by an internal passthrough load balancer. Deployments are always part of a global deployment group which represents a global mirroring service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. |
| `description` | string | Optional. User-provided description of the deployment. Used as additional context for the deployment. |
| `forwardingRule` | string | Required. Immutable. The regional forwarding rule that fronts the mirroring collectors, for example: `projects/123456789/regions/us-central1/forwardingRules/my-rule`. See https://google.aip.dev/124. |
| `labels` | object | Optional. Labels are key/value pairs that help to organize and filter resources. |
| `mirroringDeploymentGroup` | string | Required. Immutable. The deployment group that this deployment is a part of, for example: `projects/123456789/locations/global/mirroringDeploymentGroups/my-dg`. See https://google.aip.dev/124. |
| `name` | string | Immutable. Identifier. The resource name of this deployment, for example: `projects/123456789/locations/us-central1-a/mirroringDeployments/my-dep`. See https://google.aip.dev/122 for more details. |
| `reconciling` | boolean | Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This part of the normal operation (e.g. linking a new association to the parent group). See https://google.aip.dev/128. |
| `state` | string enum | Output only. The current state of the deployment. See https://google.aip.dev/216. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `OUT_OF_SYNC`, `DELETE_FAILED`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. |

### `MirroringDeploymentGroup`

- A deployment group aggregates many zonal mirroring backends (deployments) into a single global mirroring service. Consumers can connect this service using an endpoint group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectedEndpointGroups` | array<MirroringDeploymentGroupConnectedEndpointGroup> | Output only. The list of endpoint groups that are connected to this resource. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. |
| `description` | string | Optional. User-provided description of the deployment group. Used as additional context for the deployment group. |
| `labels` | object | Optional. Labels are key/value pairs that help to organize and filter resources. |
| `locations` | array<MirroringLocation> | Output only. The list of locations where the deployment group is present. |
| `name` | string | Immutable. Identifier. The resource name of this deployment group, for example: `projects/123456789/locations/global/mirroringDeploymentGroups/my-dg`. See https://google.aip.dev/122 for more details. |
| `nestedDeployments` | array<MirroringDeploymentGroupDeployment> | Output only. The list of Mirroring Deployments that belong to this group. |
| `network` | string | Required. Immutable. The network that will be used for all child deployments, for example: `projects/{project}/global/networks/{network}`. See https://google.aip.dev/124. |
| `reconciling` | boolean | Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This is part of the normal operation (e.g. adding a new deployment to the group) See https://google.aip.dev/128. |
| `state` | string enum | Output only. The current state of the deployment group. See https://google.aip.dev/216. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `CLOSED`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. |

### `MirroringDeploymentGroupConnectedEndpointGroup`

- An endpoint group connected to this deployment group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The connected endpoint group's resource name, for example: `projects/123456789/locations/global/mirroringEndpointGroups/my-eg`. See https://google.aip.dev/124. |

### `MirroringDeploymentGroupDeployment`

- A deployment belonging to this deployment group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The name of the Mirroring Deployment, in the format: `projects/{project}/locations/{location}/mirroringDeployments/{mirroring_deployment}`. |
| `state` | string enum | Output only. Most recent known state of the deployment. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `OUT_OF_SYNC`, `DELETE_FAILED`. |

### `MirroringEndpointGroup`

- An endpoint group is a consumer frontend for a deployment group (backend). In order to configure mirroring for a network, consumers must create: - An association between their network and the endpoint group. - A security profile that points to the endpoint group. - A mirroring rule that references the security profile (group).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `associations` | array<MirroringEndpointGroupAssociationDetails> | Output only. List of associations to this endpoint group. |
| `connectedDeploymentGroups` | array<MirroringEndpointGroupConnectedDeploymentGroup> | Output only. List of details about the connected deployment groups to this endpoint group. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. |
| `description` | string | Optional. User-provided description of the endpoint group. Used as additional context for the endpoint group. |
| `labels` | object | Optional. Labels are key/value pairs that help to organize and filter resources. |
| `mirroringDeploymentGroup` | string | Immutable. The deployment group that this DIRECT endpoint group is connected to, for example: `projects/123456789/locations/global/mirroringDeploymentGroups/my-dg`. See https://google.aip.dev/124. |
| `name` | string | Immutable. Identifier. The resource name of this endpoint group, for example: `projects/123456789/locations/global/mirroringEndpointGroups/my-eg`. See https://google.aip.dev/122 for more details. |
| `reconciling` | boolean | Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This is part of the normal operation (e.g. adding a new association to the group). See https://google.aip.dev/128. |
| `state` | string enum | Output only. The current state of the endpoint group. See https://google.aip.dev/216. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CLOSED`, `CREATING`, `DELETING`, `OUT_OF_SYNC`, `DELETE_FAILED`. |
| `type` | string enum | Immutable. The type of the endpoint group. If left unspecified, defaults to DIRECT. Values: `TYPE_UNSPECIFIED`, `DIRECT`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. |

### `MirroringEndpointGroupAssociation`

- An endpoint group association represents a link between a network and an endpoint group in the organization. Creating an association creates the networking infrastructure linking the network to the endpoint group, but does not enable mirroring by itself. To enable mirroring, the user must also create a network firewall policy containing mirroring rules and associate it with the network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. See https://google.aip.dev/148#timestamps. |
| `labels` | object | Optional. Labels are key/value pairs that help to organize and filter resources. |
| `locations` | array<MirroringLocation> | Output only. The list of locations where the association is configured. This information is retrieved from the linked endpoint group. |
| `locationsDetails` | array<MirroringEndpointGroupAssociationLocationDetails> | Output only. The list of locations where the association is present. This information is retrieved from the linked endpoint group, and not configured as part of the association itself. |
| `mirroringEndpointGroup` | string | Immutable. The endpoint group that this association is connected to, for example: `projects/123456789/locations/global/mirroringEndpointGroups/my-eg`. See https://google.aip.dev/124. |
| `name` | string | Immutable. Identifier. The resource name of this endpoint group association, for example: `projects/123456789/locations/global/mirroringEndpointGroupAssociations/my-eg-association`. See https://google.aip.dev/122 for more details. |
| `network` | string | Immutable. The VPC network that is associated. for example: `projects/123456789/global/networks/my-network`. See https://google.aip.dev/124. |
| `networkCookie` | integer (uint32) | Output only. Identifier used by the data-path. See the NSI GENEVE format for more details: https://docs.cloud.google.com/network-security-integration/docs/understand-geneve#network_id |
| `reconciling` | boolean | Output only. The current state of the resource does not match the user's intended state, and the system is working to reconcile them. This part of the normal operation (e.g. adding a new location to the target deployment group). See https://google.aip.dev/128. |
| `state` | string enum | Output only. Current state of the endpoint group association. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `CLOSED`, `OUT_OF_SYNC`, `DELETE_FAILED`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was most recently updated. See https://google.aip.dev/148#timestamps. |

### `MirroringEndpointGroupAssociationDetails`

- The endpoint group's view of a connected association.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The connected association's resource name, for example: `projects/123456789/locations/global/mirroringEndpointGroupAssociations/my-ega`. See https://google.aip.dev/124. |
| `network` | string | Output only. The associated network, for example: projects/123456789/global/networks/my-network. See https://google.aip.dev/124. |
| `state` | string enum | Output only. Most recent known state of the association. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `CLOSED`, `OUT_OF_SYNC`, `DELETE_FAILED`. |

### `MirroringEndpointGroupAssociationLocationDetails`

- Contains details about the state of an association in a specific cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | Output only. The cloud location, e.g. "us-central1-a" or "asia-south1". |
| `state` | string enum | Output only. The current state of the association in this location. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `OUT_OF_SYNC`. |

### `MirroringEndpointGroupConnectedDeploymentGroup`

- The endpoint group's view of a connected deployment group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<MirroringLocation> | Output only. The list of locations where the deployment group is present. |
| `name` | string | Output only. The connected deployment group's resource name, for example: `projects/123456789/locations/global/mirroringDeploymentGroups/my-dg`. See https://google.aip.dev/124. |

### `MirroringLocation`

- Details about mirroring in a specific cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | Output only. The cloud location, e.g. "us-central1-a" or "asia-south1". |
| `state` | string enum | Output only. The current state of the association in this location. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `OUT_OF_SYNC`. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `RateLimitPolicy`

- Describes a `RateLimitPolicy` object.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Represents the create timestamp. |
| `description` | string | Optional. Provides a human-readable description of the resource. |
| `httpRules` | array<RateLimitPolicyRateLimitRule> | Optional. Specifies a list of rate limit HTTP rules to match against the incoming request. |
| `labels` | object | Optional. Stores labels as key value pairs. |
| `name` | string | Identifier. Specifies the name of the `RateLimitPolicy` resource. |
| `rateLimitBuckets` | array<RateLimitPolicyRateLimitBucket> | Optional. Specifies a list of rate limit buckets to be used for rate limiting. Rate limit buckets will be referenced by the rate limit actions by name. |
| `targets` | array<RateLimitPolicyTarget> | Required. Specifies a list of targets to which this policy applies. |
| `updateTime` | string (google-datetime) | Output only. Represents the update timestamp. |

### `RateLimitPolicyRateLimitBucket`

- Describes properties of a rate limit bucket.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `defaultLimit` | RateLimitPolicyRateLimitBucketLimit | Required. Specifies the default limit to apply for this rate limit bucket. |
| `dryRun` | boolean | Optional. Specifies whether the rate limit bucket is in dry-run mode. |
| `keys` | array<RateLimitPolicyRateLimitBucketKey> | Required. Specifies the keys to use for rate limiting. At least one key is required. If multiple keys are specified, the keys will be combined and used as a single key. |
| `name` | string | Required. Specifies the name of the rate limit bucket. Name will be used to reference the bucket in the RateLimitAction. |
| `userOverrides` | array<RateLimitPolicyRateLimitBucketUserOverride> | Optional. Specifies a list of user overrides to apply to the rate limit bucket. |

### `RateLimitPolicyRateLimitBucketCountLimit`

- Describes the count limit for enforcement.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | Required. Specifies the maximum number of costs allowed in the specified interval. Must be non-negative. |
| `interval` | string (int64) | Required. Specifies the interval in units for which the count limit is enforced. Must be positive. |
| `intervalUnit` | string enum | Required. Specifies the unit of the interval. Defaults to MINUTES. Values: `INTERVAL_UNIT_UNSPECIFIED`, `SECONDS`, `MINUTES`, `HOURS`, `DAYS`. |

### `RateLimitPolicyRateLimitBucketKey`

- Describes properties of a key to use for rate limiting.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `header` | string | Optional. Specifies the header name if key_type is HTTP_HEADER. |
| `keyType` | string enum | Required. Specifies the type of key to use for rate limiting. Values: `KEY_TYPE_UNSPECIFIED`, `ALL`, `SOURCE_IP`, `HTTP_HEADER`, `HTTP_PATH`, `PRINCIPAL`, `MCP_TOOL`. |
| `principalType` | string enum | Optional. Specifies the principal type if key_type is PRINCIPAL. Values: `PRINCIPAL_TYPE_UNSPECIFIED`, `CLIENT_CERT_COMMON_NAME`. |

### `RateLimitPolicyRateLimitBucketLimit`

- Describes a limit for enforcement.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `countLimit` | RateLimitPolicyRateLimitBucketCountLimit | Required. Defines the count limit to enforce. |

### `RateLimitPolicyRateLimitBucketUserOverride`

- Describes properties of a user override for the rate limit bucket.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `limit` | RateLimitPolicyRateLimitBucketLimit | Required. Specifies the limit to apply for this specific key. |
| `overrideKey` | RateLimitPolicyRateLimitBucketUserOverrideOverrideKey | Required. Specifies the key to override. |

### `RateLimitPolicyRateLimitBucketUserOverrideOverrideKey`

- Specifies the key to override. Key fields must match the key types specified in the rate limit bucket. Key type ALL does not support overrides.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `httpHeaders` | array<RateLimitPolicyRateLimitBucketUserOverrideOverrideKeyHttpHeader> | Optional. Specifies the HTTP headers if the rate limit bucket keys contain keys of type HTTP_HEADER. Number of headers and header names must match the rate limit bucket key. |
| `httpPath` | string | Optional. Specifies the HTTP path if the rate limit bucket keys contain a key of type HTTP_PATH. |
| `mcpTool` | string | Optional. Specifies the MCP tool if the rate limit bucket keys contain a key of type MCP_TOOL. |
| `principals` | array<RateLimitPolicyRateLimitBucketUserOverrideOverrideKeyPrincipal> | Optional. Specifies the principals if the rate limit bucket keys contain keys of PRINCIPAL. Number of principals and principal types must match the rate limit bucket key. |
| `sourceIp` | string | Optional. Specifies the source IP if the rate limit bucket keys contain a key of type SOURCE_IP. |

### `RateLimitPolicyRateLimitBucketUserOverrideOverrideKeyHttpHeader`

- Specifies the key in the type HTTP header to override.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `header` | string | Required. Specifies the header name of the key. |
| `value` | string | Required. Specifies the header value of the key. |

### `RateLimitPolicyRateLimitBucketUserOverrideOverrideKeyPrincipal`

- Specifies the key in the type PRINCIPAL to override.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `principal` | string | Required. Specifies the principal value of the key. |
| `principalType` | string enum | Required. Specifies the principal type of the key. Values: `PRINCIPAL_TYPE_UNSPECIFIED`, `CLIENT_CERT_COMMON_NAME`. |

### `RateLimitPolicyRateLimitRule`

- Specifies conditions to match against the incoming request.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `from` | RateLimitPolicyRateLimitRuleFrom | Optional. Describes properties of a source of a request. |
| `rateLimitActions` | array<RateLimitPolicyRateLimitRuleRateLimitAction> | Optional. Specifies the actions to take when this rule is matched. |
| `to` | RateLimitPolicyRateLimitRuleTo | Optional. Describes properties of a target of a request. |

### `RateLimitPolicyRateLimitRuleFrom`

- Describes properties of the sources of a request.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `notSource` | RateLimitPolicyRateLimitRuleFromSource | Optional. Describes the negated properties of request source. Matches requests from source that does not match the criteria specified in this field. At least one of source or not_source must be specified. |
| `source` | RateLimitPolicyRateLimitRuleFromSource | Optional. Describes the properties of a request's source. At least one of source or not_source must be specified. A match occurs when ANY fields in either source or not_source matches the request. Within a single source, the match follows OR semantics across fields and AND semantics within a single field. |

### `RateLimitPolicyRateLimitRuleFromSource`

- Describes the properties of a request source.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `principals` | array<RateLimitPolicyRateLimitRulePrincipal> | Required. Contains a list of identities derived from the client's certificate. This field does not match on a request unless frontend mutual TLS is enabled for the Gateway and the client certificate is successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. |

### `RateLimitPolicyRateLimitRuleHeaderMatch`

- Determines how an HTTP header is matched.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Specifies the name of the header in the request. |
| `value` | RateLimitPolicyRateLimitRuleStringMatch | Optional. Specifies how the header match is performed. |

### `RateLimitPolicyRateLimitRulePrincipal`

- Describes the properties of a principal for matching.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `principal` | RateLimitPolicyRateLimitRuleStringMatch | Required. Matches a non-empty string against the principal value based on the principal_selector. |
| `principalSelector` | string enum | Optional. Decides what principal value the principal rule will match against. If not specified, defaults to CLIENT_CERT_URI_SAN. Values: `PRINCIPAL_SELECTOR_UNSPECIFIED`, `CLIENT_CERT_URI_SAN`, `CLIENT_CERT_DNS_NAME_SAN`, `CLIENT_CERT_COMMON_NAME`. |

### `RateLimitPolicyRateLimitRuleRateLimitAction`

- Describes the action to take when the rate limit rule is matched.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `rateLimitBucket` | string | Required. Specifies the name of the rate limit bucket to apply when this rule is matched. |

### `RateLimitPolicyRateLimitRuleStringMatch`

- Determines how a string value is matched.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `contains` | string | Checks if the input string contains the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: \* ``abc`` matches the value ``xyz.abc.def`` |
| `exact` | string | Matches the input string exactly to the string specified here. Examples: \* ``abc`` only matches the value ``abc``. |
| `ignoreCase` | boolean | Optional. Indicates if the exact/prefix/suffix/contains matching should be case insensitive. For example, when true, the matcher ``data`` matches both input strings ``Data`` and ``data``. |
| `prefix` | string | Checks if the input string has the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: \* ``abc`` matches the value ``abc.xyz`` |
| `suffix` | string | Checks if the input string has the suffix specified here. Note: empty suffix is not allowed, please use regex instead. Examples: \* ``abc`` matches the value ``xyz.abc`` |

### `RateLimitPolicyRateLimitRuleTo`

- Describes properties of the targets of a request.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `destination` | RateLimitPolicyRateLimitRuleToDestination | Optional. Describes properties of a request's destination. At least one of destination or not_destination must be specified. A match occurs when ANY fields in either destination or not_destination matches the request. Within a destination, the match follows OR semantics across fields and AND semantics within a single field. |
| `notDestination` | RateLimitPolicyRateLimitRuleToDestination | Optional. Describes the negated properties of a request's destination. Matches requests for destination that does not match the criteria specified in this field. At least one of destination or not_destination must be specified. |

### `RateLimitPolicyRateLimitRuleToDestination`

- Describes properties of a request target.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `headerSet` | RateLimitPolicyRateLimitRuleToDestinationHeaderSet | Optional. Specifies a list of headers to match against in http header. |
| `hosts` | array<RateLimitPolicyRateLimitRuleStringMatch> | Optional. Specifies a list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. The match follows OR semantics which means that if any of the hosts match, the operation is considered to be matched. |
| `mcp` | RateLimitPolicyRateLimitRuleToDestinationMCP | Optional. Specifies the MCP protocol attributes to match against. This field is only valid if the targeted Gateway or Forwarding Rule has an Agent Gateway attached to it. |
| `methods` | array<string> | Optional. Specifies a list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. The match follows OR semantics which means that if any of the methods match, the operation is considered to be matched. |
| `paths` | array<RateLimitPolicyRateLimitRuleStringMatch> | Optional. Specifies a list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. The match follows OR semantics which means that if any of the paths match, the operation is considered to be matched. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method. |

### `RateLimitPolicyRateLimitRuleToDestinationHeaderSet`

- Describes a set of HTTP headers to match against.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `headers` | array<RateLimitPolicyRateLimitRuleHeaderMatch> | Required. Contains a list of headers to match against in http header. The match can be one of exact, prefix, suffix, or contains (substring match). The match follows AND semantics which means all the headers must match. Matches are always case sensitive unless the ignoreCase is set. |

### `RateLimitPolicyRateLimitRuleToDestinationMCP`

- Describes a set of MCP protocol attributes to match against for a given MCP request. This field is only valid if the targeted Gateway or Forwarding Rule has an Agent Gateway attached to it.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `baseProtocolMethodsOption` | string enum | Optional. If specified, matches on the MCP protocol’s non-access specific methods namely: \* initialize \* completion/ \* logging/ \* notifications/ \* ping Defaults to SKIP_BASE_PROTOCOL_METHODS if not specified. Values: `BASE_PROTOCOL_METHODS_OPTION_UNSPECIFIED`, `SKIP_BASE_PROTOCOL_METHODS`, `MATCH_BASE_PROTOCOL_METHODS`. |
| `methods` | array<RateLimitPolicyRateLimitRuleToDestinationMCPMethod> | Optional. A list of MCP methods and associated parameter names to match on. It is recommended to use this field to match on tools, prompts and resource accesses while setting the baseProtocolMethodsOption to MATCH_BASE_PROTOCOL_METHODS to match on all the other MCP protocol methods. Limited to 10 MCP methods per Rate Limit Policy. |

### `RateLimitPolicyRateLimitRuleToDestinationMCPMethod`

- Describes a set of MCP methods to match against. This field is only valid if the targeted Gateway or Forwarding Rule has an Agent Gateway attached to it.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Specifies the MCP method to match against. Allowed values are as follows: 1. `tools`, `prompts`, `resources` - these will match against all sub methods under the respective methods. 2. `prompts/list`, `tools/list`, `resources/list`, `resources/templates/list` 3. `prompts/get`, `tools/call`, `resources/subscribe`, `resources/unsubscribe`, `resources/read` Params cannot be specified for categories 1 and 2. |
| `params` | array<RateLimitPolicyRateLimitRuleStringMatch> | Optional. Specifies a list of MCP method parameter names to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. |

### `RateLimitPolicyTarget`

- Specifies the target to which this policy applies.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `resource` | string | Required. Reference to a Gateway or Forwarding Rule resource on which this policy will be applied. |

### `RemoveAddressGroupItemsRequest`

- Request used by the RemoveAddressGroupItems method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<string> | Required. List of items to remove. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `Rule`

- Specification of rules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinations` | array<Destination> | Optional. List of attributes for the traffic destination. All of the destinations must match. A destination is a match if a request matches all the specified hosts, ports, methods and headers. If not set, the action specified in the 'action' field will be applied without any rule checks for the destination. |
| `sources` | array<Source> | Optional. List of attributes for the traffic source. All of the sources must match. A source is a match if both principals and ip_blocks match. If not set, the action specified in the 'action' field will be applied without any rule checks for the source. |

### `SACAttachment`

- Represents a Secure Access Connect (SAC) attachment resource. A Secure Access Connect attachment enables NCC Gateway to process traffic with an SSE product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Timestamp when the attachment was created. |
| `labels` | object | Optional. Optional list of labels applied to the resource. |
| `name` | string | Identifier. Resource name, in the form `projects/{project}/locations/{location}/sacAttachments/{sac_attachment}`. |
| `nccGateway` | string | Required. NCC Gateway associated with the attachment. This can be input as an ID or a full resource name. The output always has the form `projects/{project_number}/locations/{location}/spokes/{ncc_gateway}`. |
| `sacRealm` | string | Required. SAC Realm which owns the attachment. This can be input as an ID or a full resource name. The output always has the form `projects/{project_number}/locations/{location}/sacRealms/{sac_realm}`. |
| `state` | string enum | Output only. State of the attachment. Values: `STATE_UNSPECIFIED`, `PENDING_PARTNER_ATTACHMENT`, `PARTNER_ATTACHED`, `PARTNER_DETACHED`. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the attachment was last updated. |

### `SACAttachment` (v1beta1)

- Represents a Secure Access Connect (SAC) attachment resource. A Secure Access Connect attachment enables NCC Gateway to process traffic with an SSE product.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `country` | string | Optional. Case-insensitive ISO-3166 alpha-2 country code used for localization. Only valid for Symantec attachments. |
| `createTime` | string (google-datetime) | Output only. Timestamp when the attachment was created. |
| `labels` | object | Optional. Optional list of labels applied to the resource. |
| `name` | string | Identifier. Resource name, in the form `projects/{project}/locations/{location}/sacAttachments/{sac_attachment}`. |
| `nccGateway` | string | Required. NCC Gateway associated with the attachment. This can be input as an ID or a full resource name. The output always has the form `projects/{project_number}/locations/{location}/spokes/{ncc_gateway}`. |
| `sacRealm` | string | Required. SAC Realm which owns the attachment. This can be input as an ID or a full resource name. The output always has the form `projects/{project_number}/locations/{location}/sacRealms/{sac_realm}`. |
| `state` | string enum | Output only. State of the attachment. Values: `STATE_UNSPECIFIED`, `PENDING_PARTNER_ATTACHMENT`, `PARTNER_ATTACHED`, `PARTNER_DETACHED`. |
| `symantecOptions` | SACAttachmentSACAttachmentSymantecOptions | Optional. Configuration required for Symantec attachments. |
| `timeZone` | string | Optional. Case-sensitive tzinfo identifier used for localization. Only valid for Symantec attachments. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the attachment was last updated. |

### `SACAttachmentSACAttachmentSymantecOptions`

- Fields specific to attachments associated with Symantec Cloud SWG.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `symantecLocationName` | string | Immutable. Name to be used when creating a location on the customer's behalf in Symantec's Location API. Not to be confused with Google Cloud locations. |
| `symantecSite` | string | Immutable. Symantec data center identifier that this attachment will connect to. |

### `SACRealm`

- Represents a Secure Access Connect (SAC) realm resource. A Secure Access Connect realm establishes a connection between your Google Cloud project and an SSE service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Timestamp when the realm was created. |
| `labels` | object | Optional. Optional list of labels applied to the resource. |
| `name` | string | Identifier. Resource name, in the form `projects/{project}/locations/global/sacRealms/{sacRealm}`. |
| `pairingKey` | SACRealmPairingKey | Output only. Key to be shared with SSE service provider during pairing. |
| `securityService` | string enum | Immutable. SSE service provider associated with the realm. Values: `SECURITY_SERVICE_UNSPECIFIED`, `PALO_ALTO_PRISMA_ACCESS`. |
| `state` | string enum | Output only. State of the realm. Values: `STATE_UNSPECIFIED`, `PENDING_PARTNER_ATTACHMENT`, `PARTNER_ATTACHED`, `PARTNER_DETACHED`, `KEY_EXPIRED`. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the realm was last updated. |

### `SACRealm` (v1beta1)

- Represents a Secure Access Connect (SAC) realm resource. A Secure Access Connect realm establishes a connection between your Google Cloud project and an SSE service.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Timestamp when the realm was created. |
| `labels` | object | Optional. Optional list of labels applied to the resource. |
| `name` | string | Identifier. Resource name, in the form `projects/{project}/locations/global/sacRealms/{sacRealm}`. |
| `pairingKey` | SACRealmPairingKey | Output only. Key to be shared with SSE service provider during pairing. |
| `securityService` | string enum | Immutable. SSE service provider associated with the realm. Values: `SECURITY_SERVICE_UNSPECIFIED`, `PALO_ALTO_PRISMA_ACCESS`, `SYMANTEC_CLOUD_SWG`. |
| `state` | string enum | Output only. State of the realm. Values: `STATE_UNSPECIFIED`, `PENDING_PARTNER_ATTACHMENT`, `PARTNER_ATTACHED`, `PARTNER_DETACHED`, `KEY_EXPIRED`. |
| `symantecOptions` | SACRealmSACRealmSymantecOptions | Optional. Configuration required for Symantec realms. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the realm was last updated. |

### `SACRealmPairingKey`

- Key to be shared with SSE service provider to establish global handshake.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | Output only. Timestamp in UTC of when this resource is considered expired. It expires 7 days after creation. |
| `key` | string | Output only. Key value. |

### Shape of `AddAddressGroupItemsRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "items": "array<string>",
  "requestId": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `networksecurity` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the AddressGroup `name` (the resource field, and the path parameter of `addressGroups.patch` for projects and organizations) is described as matching `projects/*/locations/{location}/addressGroups/`, which lacks the address group ID; the Discovery path patterns are `projects/[^/]+/locations/[^/]+/addressGroups/[^/]+` and `organizations/[^/]+/locations/[^/]+/addressGroups/[^/]+`, so the name is `projects/{project}/locations/{location}/addressGroups/{address_group}` (or `organizations/{organization}/...`).
- Corrected from the official docs (the Discovery text above is verbatim): the AuthorizationPolicy `name` (the resource field, and the path parameter of `authorizationPolicies.patch`) is described as matching `projects/{project}/locations/{location}/authorizationPolicies/`, which lacks the policy ID; the Discovery path pattern is `projects/[^/]+/locations/[^/]+/authorizationPolicies/[^/]+`, so the name is `projects/{project}/locations/{location}/authorizationPolicies/{authorization_policy}`.
- Source: https://networksecurity.googleapis.com/$discovery/rest?version=v1, https://networksecurity.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
