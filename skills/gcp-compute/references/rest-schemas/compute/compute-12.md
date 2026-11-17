---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 12/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `SecurityPolicyCloudArmorConfig`

- Configuration options for Cloud Armor.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `enableMl` | boolean | If set to true, enables Cloud Armor Machine Learning. |

### `SecurityPolicyDdosProtectionConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ddosAdaptiveProtection` | string enum | — Values: `DDOS_ADAPTIVE_PROTECTION_UNSPECIFIED`, `DISABLED`, `ENABLED`, `PREVIEW`, `UNSPECIFIED_ADAPTIVE_PROTECTION`. |
| `ddosImpactedBaselineThreshold` | number (float) | DDoS Protection for Network Load Balancers (and VMs with public IPs) builds DDoS mitigations that minimize collateral damage. It quantifies this as the fraction of a non-abuse baseline that's inadvertently blocked. Rules whose collateral damage exceeds ddosImpactedBaselineThreshold will not be deployed. Using a lower value will prioritize keeping collateral damage low, possibly at the cost of its effectiveness in rate limiting some or all of the attack. It should typically be unset, so Advanced DDoS (and Adaptive Protection) uses the best mitigation it can find. Setting the threshold is advised if there are logs for false positive detections with high collateral damage, and will cause Advanced DDoS to attempt to find a less aggressive rule that satisfies the constraint. If a suitable rule cannot be found, the system falls back to either no mitigation for smaller attacks or broader network throttles for larger ones. |
| `ddosProtection` | string enum | — Values: `ADVANCED`, `ADVANCED_PREVIEW`, `STANDARD`. |

### `SecurityPolicyList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<SecurityPolicy> | A list of SecurityPolicy resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#securityPolicyList for listsof securityPolicies |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `SecurityPolicyList` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<SecurityPolicy> | A list of SecurityPolicy resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#securityPolicyList for listsof securityPolicies |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `SecurityPolicyParams`

- Additional security policy parameters.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. \* Inconsistent format is not supported. For instance: {"tagKeys/333" : "tagValues/444", "123/env" : "prod"} is invalid. |

### `SecurityPolicyRecaptchaOptionsConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `redirectSiteKey` | string | An optional field to supply a reCAPTCHA site key to be used for all the rules using the redirect action with the type of GOOGLE_RECAPTCHA under the security policy. The specified site key needs to be created from the reCAPTCHA API. The user is responsible for the validity of the specified site key. If not specified, a Google-managed site key is used. This field is only supported in Global Security Policies of type CLOUD_ARMOR. |

### `SecurityPolicyReference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `securityPolicy` | string | — |

### `SecurityPolicyRule`

- Represents a rule that describes one or more match conditions along with the action to be taken when traffic matches this condition (allow or deny).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string | The Action to perform when the rule is matched. The following are the valid actions: - allow: allow access to target. - deny(STATUS): deny access to target, returns the HTTP response code specified. Valid values for `STATUS` are 403, 404, and 502. - rate_based_ban: limit client traffic to the configured threshold and ban the client if the traffic exceeds the threshold. Configure parameters for this action in RateLimitOptions. Requires rate_limit_options to be set. - redirect: redirect to a different target. This can either be an internal reCAPTCHA redirect, or an external URL-based redirect via a 302 response. Parameters for this action can be configured via redirectOptions. This action is only supported in Global Security Policies of type CLOUD_ARMOR. - throttle: limit client traffic to the configured threshold. Configure parameters for this action in rateLimitOptions. Requires rate_limit_options to be set for this. - fairshare (preview only): when traffic reaches the threshold limit, requests from the clients matching this rule begin to be rate-limited using the Fair Share algorithm. This action is only allowed in security policies of type `CLOUD_ARMOR_INTERNAL_SERVICE`. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `headerAction` | SecurityPolicyRuleHttpHeaderAction | Optional, additional actions that are performed on headers. This field is only supported in Global Security Policies of type CLOUD_ARMOR. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#securityPolicyRule for security policy rules |
| `match` | SecurityPolicyRuleMatcher | A match condition that incoming traffic is evaluated against. If it evaluates to true, the corresponding 'action' is enforced. |
| `networkMatch` | SecurityPolicyRuleNetworkMatcher | A match condition that incoming packets are evaluated against for CLOUD_ARMOR_NETWORK security policies. If it matches, the corresponding 'action' is enforced. The match criteria for a rule consists of built-in match fields (like 'srcIpRanges') and potentially multiple user-defined match fields ('userDefinedFields'). Field values may be extracted directly from the packet or derived from it (e.g. 'srcRegionCodes'). Some fields may not be present in every packet (e.g. 'srcPorts'). A user-defined field is only present if the base header is found in the packet and the entire field is in bounds. Each match field may specify which values can match it, listing one or more ranges, prefixes, or exact values that are considered a match for the field. A field value must be present in order to match a specified match field. If no match values are specified for a match field, then any field value is considered to match it, and it's not required to be present. For strings specifying '\*' is also equivalent to match all. For a packet to match a rule, all specified match fields must match the corresponding field values derived from the packet. Example: networkMatch: srcIpRanges: - "192.0.2.0/24" - "198.51.100.0/24" userDefinedFields: - name: "ipv4_fragment_offset" values: - "1-0x1fff" The above match condition matches packets with a source IP in 192.0.2.0/24 or 198.51.100.0/24 and a user-defined field named "ipv4_fragment_offset" with a value between 1 and 0x1fff inclusive. |
| `preconfiguredWafConfig` | SecurityPolicyRulePreconfiguredWafConfig | Preconfigured WAF configuration to be applied for the rule. If the rule does not evaluate preconfigured WAF rules, i.e., if evaluatePreconfiguredWaf() is not used, this field will have no effect. |
| `preview` | boolean | If set to true, the specified action is not enforced. |
| `priority` | integer (int32) | An integer indicating the priority of a rule in the list. The priority must be a positive value between 0 and 2147483647. Rules are evaluated from highest to lowest priority where 0 is the highest priority and 2147483647 is the lowest priority. |
| `rateLimitOptions` | SecurityPolicyRuleRateLimitOptions | Must be specified if the action is "rate_based_ban" or "throttle" or "fairshare". Cannot be specified for any other actions. |
| `redirectOptions` | SecurityPolicyRuleRedirectOptions | Parameters defining the redirect action. Cannot be specified for any other actions. This field is only supported in Global Security Policies of type CLOUD_ARMOR. |

### `SecurityPolicyRule` (alpha)

- Represents a rule that describes one or more match conditions along with the action to be taken when traffic matches this condition (allow or deny).
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `action` | string | The Action to perform when the rule is matched. The following are the valid actions: - allow: allow access to target. - deny(STATUS): deny access to target, returns the HTTP response code specified. Valid values for `STATUS` are 403, 404, and 502. - rate_based_ban: limit client traffic to the configured threshold and ban the client if the traffic exceeds the threshold. Configure parameters for this action in RateLimitOptions. Requires rate_limit_options to be set. - redirect: redirect to a different target. This can either be an internal reCAPTCHA redirect, or an external URL-based redirect via a 302 response. Parameters for this action can be configured via redirectOptions. This action is only supported in Global Security Policies of type CLOUD_ARMOR. - throttle: limit client traffic to the configured threshold. Configure parameters for this action in rateLimitOptions. Requires rate_limit_options to be set for this. - fairshare (preview only): when traffic reaches the threshold limit, requests from the clients matching this rule begin to be rate-limited using the Fair Share algorithm. This action is only allowed in security policies of type `CLOUD_ARMOR_INTERNAL_SERVICE`. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `direction` | string enum | The direction in which this rule applies. This field may only be specified when versioned_expr is set to FIREWALL. Values: `EGRESS`, `INGRESS`. |
| `enableLogging` | boolean | Denotes whether to enable logging for a particular rule. If logging is enabled, logs will be exported to the configured export destination in Stackdriver. Logs may be exported to BigQuery or Pub/Sub. Note: you cannot enable logging on "goto_next" rules. This field may only be specified when the versioned_expr is set to FIREWALL. |
| `headerAction` | SecurityPolicyRuleHttpHeaderAction | Optional, additional actions that are performed on headers. This field is only supported in Global Security Policies of type CLOUD_ARMOR. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#securityPolicyRule for security policy rules |
| `match` | SecurityPolicyRuleMatcher | A match condition that incoming traffic is evaluated against. If it evaluates to true, the corresponding 'action' is enforced. |
| `networkMatch` | SecurityPolicyRuleNetworkMatcher | A match condition that incoming packets are evaluated against for CLOUD_ARMOR_NETWORK security policies. If it matches, the corresponding 'action' is enforced. The match criteria for a rule consists of built-in match fields (like 'srcIpRanges') and potentially multiple user-defined match fields ('userDefinedFields'). Field values may be extracted directly from the packet or derived from it (e.g. 'srcRegionCodes'). Some fields may not be present in every packet (e.g. 'srcPorts'). A user-defined field is only present if the base header is found in the packet and the entire field is in bounds. Each match field may specify which values can match it, listing one or more ranges, prefixes, or exact values that are considered a match for the field. A field value must be present in order to match a specified match field. If no match values are specified for a match field, then any field value is considered to match it, and it's not required to be present. For strings specifying '\*' is also equivalent to match all. For a packet to match a rule, all specified match fields must match the corresponding field values derived from the packet. Example: networkMatch: srcIpRanges: - "192.0.2.0/24" - "198.51.100.0/24" userDefinedFields: - name: "ipv4_fragment_offset" values: - "1-0x1fff" The above match condition matches packets with a source IP in 192.0.2.0/24 or 198.51.100.0/24 and a user-defined field named "ipv4_fragment_offset" with a value between 1 and 0x1fff inclusive. |
| `preconfiguredWafConfig` | SecurityPolicyRulePreconfiguredWafConfig | Preconfigured WAF configuration to be applied for the rule. If the rule does not evaluate preconfigured WAF rules, i.e., if evaluatePreconfiguredWaf() is not used, this field will have no effect. |
| `preview` | boolean | If set to true, the specified action is not enforced. |
| `priority` | integer (int32) | An integer indicating the priority of a rule in the list. The priority must be a positive value between 0 and 2147483647. Rules are evaluated from highest to lowest priority where 0 is the highest priority and 2147483647 is the lowest priority. |
| `rateLimitOptions` | SecurityPolicyRuleRateLimitOptions | Must be specified if the action is "rate_based_ban" or "throttle" or "fairshare". Cannot be specified for any other actions. |
| `redirectOptions` | SecurityPolicyRuleRedirectOptions | Parameters defining the redirect action. Cannot be specified for any other actions. This field is only supported in Global Security Policies of type CLOUD_ARMOR. |
| `redirectTarget` | string | This must be specified for redirect actions. Cannot be specified for any other actions. |
| `ruleManagedProtectionTier` | string enum | Output only. \[Output Only\] The minimum Cloud Armor subscription required for this rule. \[Deprecated\] Use requiredManagedProtectionTiers instead. Values: `CAMP_PLUS_ANNUAL`, `CAMP_PLUS_PAYGO`, `CA_STANDARD`. |
| `ruleNumber` | string (int64) | Identifier for the rule. This is only unique within the given security policy. This can only be set during rule creation, if rule number is not specified it will be generated by the server. |
| `ruleTupleCount` | integer (int32) | Output only. \[Output Only\] Calculation of the complexity of a single firewall security policy rule. |
| `targetResources` | array<string> | A list of network resource URLs to which this rule applies. This field allows you to control which network's VMs get this rule. If this field is left blank, all VMs within the organization will receive the rule. This field may only be specified when versioned_expr is set to FIREWALL. |
| `targetServiceAccounts` | array<string> | A list of service accounts indicating the sets of instances that are applied with this rule. |

### `SecurityPolicyRule` (beta)

- Represents a rule that describes one or more match conditions along with the action to be taken when traffic matches this condition (allow or deny).
- Version: beta

| Field | Type | Description |
|---|---|---|
| `action` | string | The Action to perform when the rule is matched. The following are the valid actions: - allow: allow access to target. - deny(STATUS): deny access to target, returns the HTTP response code specified. Valid values for `STATUS` are 403, 404, and 502. - rate_based_ban: limit client traffic to the configured threshold and ban the client if the traffic exceeds the threshold. Configure parameters for this action in RateLimitOptions. Requires rate_limit_options to be set. - redirect: redirect to a different target. This can either be an internal reCAPTCHA redirect, or an external URL-based redirect via a 302 response. Parameters for this action can be configured via redirectOptions. This action is only supported in Global Security Policies of type CLOUD_ARMOR. - throttle: limit client traffic to the configured threshold. Configure parameters for this action in rateLimitOptions. Requires rate_limit_options to be set for this. - fairshare (preview only): when traffic reaches the threshold limit, requests from the clients matching this rule begin to be rate-limited using the Fair Share algorithm. This action is only allowed in security policies of type `CLOUD_ARMOR_INTERNAL_SERVICE`. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `direction` | string enum | The direction in which this rule applies. This field may only be specified when versioned_expr is set to FIREWALL. Values: `EGRESS`, `INGRESS`. |
| `enableLogging` | boolean | Denotes whether to enable logging for a particular rule. If logging is enabled, logs will be exported to the configured export destination in Stackdriver. Logs may be exported to BigQuery or Pub/Sub. Note: you cannot enable logging on "goto_next" rules. This field may only be specified when the versioned_expr is set to FIREWALL. |
| `headerAction` | SecurityPolicyRuleHttpHeaderAction | Optional, additional actions that are performed on headers. This field is only supported in Global Security Policies of type CLOUD_ARMOR. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#securityPolicyRule for security policy rules |
| `match` | SecurityPolicyRuleMatcher | A match condition that incoming traffic is evaluated against. If it evaluates to true, the corresponding 'action' is enforced. |
| `networkMatch` | SecurityPolicyRuleNetworkMatcher | A match condition that incoming packets are evaluated against for CLOUD_ARMOR_NETWORK security policies. If it matches, the corresponding 'action' is enforced. The match criteria for a rule consists of built-in match fields (like 'srcIpRanges') and potentially multiple user-defined match fields ('userDefinedFields'). Field values may be extracted directly from the packet or derived from it (e.g. 'srcRegionCodes'). Some fields may not be present in every packet (e.g. 'srcPorts'). A user-defined field is only present if the base header is found in the packet and the entire field is in bounds. Each match field may specify which values can match it, listing one or more ranges, prefixes, or exact values that are considered a match for the field. A field value must be present in order to match a specified match field. If no match values are specified for a match field, then any field value is considered to match it, and it's not required to be present. For strings specifying '\*' is also equivalent to match all. For a packet to match a rule, all specified match fields must match the corresponding field values derived from the packet. Example: networkMatch: srcIpRanges: - "192.0.2.0/24" - "198.51.100.0/24" userDefinedFields: - name: "ipv4_fragment_offset" values: - "1-0x1fff" The above match condition matches packets with a source IP in 192.0.2.0/24 or 198.51.100.0/24 and a user-defined field named "ipv4_fragment_offset" with a value between 1 and 0x1fff inclusive. |
| `preconfiguredWafConfig` | SecurityPolicyRulePreconfiguredWafConfig | Preconfigured WAF configuration to be applied for the rule. If the rule does not evaluate preconfigured WAF rules, i.e., if evaluatePreconfiguredWaf() is not used, this field will have no effect. |
| `preview` | boolean | If set to true, the specified action is not enforced. |
| `priority` | integer (int32) | An integer indicating the priority of a rule in the list. The priority must be a positive value between 0 and 2147483647. Rules are evaluated from highest to lowest priority where 0 is the highest priority and 2147483647 is the lowest priority. |
| `rateLimitOptions` | SecurityPolicyRuleRateLimitOptions | Must be specified if the action is "rate_based_ban" or "throttle" or "fairshare". Cannot be specified for any other actions. |
| `redirectOptions` | SecurityPolicyRuleRedirectOptions | Parameters defining the redirect action. Cannot be specified for any other actions. This field is only supported in Global Security Policies of type CLOUD_ARMOR. |
| `ruleNumber` | string (int64) | Identifier for the rule. This is only unique within the given security policy. This can only be set during rule creation, if rule number is not specified it will be generated by the server. |
| `ruleTupleCount` | integer (int32) | Output only. \[Output Only\] Calculation of the complexity of a single firewall security policy rule. |
| `targetResources` | array<string> | A list of network resource URLs to which this rule applies. This field allows you to control which network's VMs get this rule. If this field is left blank, all VMs within the organization will receive the rule. This field may only be specified when versioned_expr is set to FIREWALL. |
| `targetServiceAccounts` | array<string> | A list of service accounts indicating the sets of instances that are applied with this rule. |

### `SecurityPolicyRuleHttpHeaderAction`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestHeadersToAdds` | array<SecurityPolicyRuleHttpHeaderActionHttpHeaderOption> | The list of request headers to add or overwrite if they're already present. |

### `SecurityPolicyRuleHttpHeaderActionHttpHeaderOption`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headerName` | string | The name of the header to set. |
| `headerValue` | string | The value to set the named header to. |

### `SecurityPolicyRuleMatcher`

- Represents a match condition that incoming traffic is evaluated against. Exactly one field must be specified.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `config` | SecurityPolicyRuleMatcherConfig | The configuration options available when specifying versioned_expr. This field must be specified if versioned_expr is specified and cannot be specified if versioned_expr is not specified. |
| `expr` | Expr | User defined CEVAL expression. A CEVAL expression is used to specify match criteria such as origin.ip, source.region_code and contents in the request header. Expressions containing `evaluateThreatIntelligence` require a Cloud Armor Enterprise subscription and are not supported in Edge Policies nor in Regional Policies. Expressions containing `evaluatePreconfiguredExpr('sourceiplist-*')` require a Cloud Armor Enterprise subscription and are only supported in Global Security Policies. |
| `exprOptions` | SecurityPolicyRuleMatcherExprOptions | The configuration options available when specifying a user defined CEVAL expression (i.e., 'expr'). |
| `versionedExpr` | string enum | Preconfigured versioned expression. If this field is specified, config must also be specified. Available preconfigured expressions along with their requirements are: SRC_IPS_V1 - must specify the corresponding src_ip_range field in config. Values: `SRC_IPS_V1`. |

### `SecurityPolicyRuleMatcherConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `srcIpRanges` | array<string> | CIDR IP address range. Maximum number of src_ip_ranges allowed is 10. |

### `SecurityPolicyRuleMatcherConfig` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `destIpRanges` | array<string> | CIDR IP address range. This field may only be specified when versioned_expr is set to FIREWALL. |
| `destPorts` | array<SecurityPolicyRuleMatcherConfigDestinationPort> | Pairs of IP protocols and ports that the rule should match. This field may only be specified when versioned_expr is set to FIREWALL. |
| `layer4Configs` | array<SecurityPolicyRuleMatcherConfigLayer4Config> | Pairs of IP protocols and ports that the rule should match. This field may only be specified when versioned_expr is set to FIREWALL. |
| `srcIpRanges` | array<string> | CIDR IP address range. Maximum number of src_ip_ranges allowed is 10. |

### `SecurityPolicyRuleMatcherConfig` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `destIpRanges` | array<string> | CIDR IP address range. This field may only be specified when versioned_expr is set to FIREWALL. |
| `layer4Configs` | array<SecurityPolicyRuleMatcherConfigLayer4Config> | Pairs of IP protocols and ports that the rule should match. This field may only be specified when versioned_expr is set to FIREWALL. |
| `srcIpRanges` | array<string> | CIDR IP address range. Maximum number of src_ip_ranges allowed is 10. |

### `SecurityPolicyRuleMatcherConfigDestinationPort`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `ipProtocol` | string | The IP protocol to which this rule applies. The protocol type is required when creating a firewall rule. This value can either be one of the following well known protocol strings (tcp,udp, icmp, esp,ah, ipip, sctp), or the IP protocol number. |
| `ports` | array<string> | An optional list of ports to which this rule applies. This field is only applicable for UDP or TCP protocol. Each entry must be either an integer or a range. If not specified, this rule applies to connections through any port. Example inputs include: \["22"\],\["80","443"\], and \["12345-12349"\]. This field may only be specified when versioned_expr is set to FIREWALL. |

### `SecurityPolicyRuleMatcherConfigLayer4Config`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `ipProtocol` | string | The IP protocol to which this rule applies. The protocol type is required when creating a firewall rule. This value can either be one of the following well known protocol strings (tcp,udp, icmp, esp,ah, ipip, sctp), or the IP protocol number. |
| `ports` | array<string> | An optional list of ports to which this rule applies. This field is only applicable for UDP or TCP protocol. Each entry must be either an integer or a range. If not specified, this rule applies to connections through any port. Example inputs include: \["22"\],\["80","443"\], and \["12345-12349"\]. This field may only be specified when versioned_expr is set to FIREWALL. |

### `SecurityPolicyRuleMatcherExprOptions`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `recaptchaOptions` | SecurityPolicyRuleMatcherExprOptionsRecaptchaOptions | reCAPTCHA configuration options to be applied for the rule. If the rule does not evaluate reCAPTCHA tokens, this field has no effect. |

### `SecurityPolicyRuleMatcherExprOptionsRecaptchaOptions`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actionTokenSiteKeys` | array<string> | A list of site keys to be used during the validation of reCAPTCHA action-tokens. The provided site keys need to be created from reCAPTCHA API under the same project where the security policy is created. |
| `sessionTokenSiteKeys` | array<string> | A list of site keys to be used during the validation of reCAPTCHA session-tokens. The provided site keys need to be created from reCAPTCHA API under the same project where the security policy is created. |

### `SecurityPolicyRuleNetworkMatcher`

- Represents a match condition that incoming network traffic is evaluated against.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destIpRanges` | array<string> | Destination IPv4/IPv6 addresses or CIDR prefixes, in standard text format. |
| `destPorts` | array<string> | Destination port numbers for TCP/UDP/SCTP. Each element can be a 16-bit unsigned decimal number (e.g. "80") or range (e.g. "0-1023"). |
| `ipProtocols` | array<string> | IPv4 protocol / IPv6 next header (after extension headers). Each element can be an 8-bit unsigned decimal number (e.g. "6"), range (e.g. "253-254"), or one of the following protocol names: "tcp", "udp", "icmp", "esp", "ah", "ipip", or "sctp". |
| `srcAsns` | array<integer> | BGP Autonomous System Number associated with the source IP address. |
| `srcIpRanges` | array<string> | Source IPv4/IPv6 addresses or CIDR prefixes, in standard text format. |
| `srcPorts` | array<string> | Source port numbers for TCP/UDP/SCTP. Each element can be a 16-bit unsigned decimal number (e.g. "80") or range (e.g. "0-1023"). |
| `srcRegionCodes` | array<string> | Two-letter ISO 3166-1 alpha-2 country code associated with the source IP address. |
| `userDefinedFields` | array<SecurityPolicyRuleNetworkMatcherUserDefinedFieldMatch> | User-defined fields. Each element names a defined field and lists the matching values for that field. |

### `SecurityPolicyRuleNetworkMatcherUserDefinedFieldMatch`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the user-defined field, as given in the definition. |
| `values` | array<string> | Matching values of the field. Each element can be a 32-bit unsigned decimal or hexadecimal (starting with "0x") number (e.g. "64") or range (e.g. "0x400-0x7ff"). |

### `SecurityPolicyRulePreconfiguredWafConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exclusions` | array<SecurityPolicyRulePreconfiguredWafConfigExclusion> | A list of exclusions to apply during preconfigured WAF evaluation. |

### `SecurityPolicyRulePreconfiguredWafConfigExclusion`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestBodiesToExclude` | array<SecurityPolicyRulePreconfiguredWafConfigExclusionFieldParams> | A list of request body fields to be excluded from inspection during preconfigured WAF evaluation. |
| `requestCookiesToExclude` | array<SecurityPolicyRulePreconfiguredWafConfigExclusionFieldParams> | A list of request cookie names whose value will be excluded from inspection during preconfigured WAF evaluation. |
| `requestHeadersToExclude` | array<SecurityPolicyRulePreconfiguredWafConfigExclusionFieldParams> | A list of request header names whose value will be excluded from inspection during preconfigured WAF evaluation. |
| `requestQueryParamsToExclude` | array<SecurityPolicyRulePreconfiguredWafConfigExclusionFieldParams> | A list of request query parameter names whose value will be excluded from inspection during preconfigured WAF evaluation. Note that the parameter can be in the query string or in the POST body. |
| `requestUrisToExclude` | array<SecurityPolicyRulePreconfiguredWafConfigExclusionFieldParams> | A list of request URIs from the request line to be excluded from inspection during preconfigured WAF evaluation. When specifying this field, the query or fragment part should be excluded. |
| `targetRuleIds` | array<string> | A list of target rule IDs under the WAF rule set to apply the preconfigured WAF exclusion. If omitted, it refers to all the rule IDs under the WAF rule set. |
| `targetRuleSet` | string | Target WAF rule set to apply the preconfigured WAF exclusion. |

### `SecurityPolicyRulePreconfiguredWafConfigExclusionFieldParams`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `op` | string enum | The match operator for the field. Values: `CONTAINS`, `ENDS_WITH`, `EQUALS`, `EQUALS_ANY`, `STARTS_WITH`. |
| `val` | string | The value of the field. |

### `SecurityPolicyRuleRateLimitOptions`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `banDurationSec` | integer (int32) | Can only be specified if the action for the rule is "rate_based_ban". If specified, determines the time (in seconds) the traffic will continue to be banned by the rate limit after the rate falls below the threshold. |
| `banThreshold` | SecurityPolicyRuleRateLimitOptionsThreshold | Can only be specified if the action for the rule is "rate_based_ban". If specified, the key will be banned for the configured 'ban_duration_sec' when the number of requests that exceed the 'rate_limit_threshold' also exceed this 'ban_threshold'. |
| `conformAction` | string | Action to take for requests that are under the configured rate limit threshold. Valid option is "allow" only. |
| `enforceOnKey` | string enum | Determines the key to enforce the rate_limit_threshold on. Possible values are: - ALL: A single rate limit threshold is applied to all the requests matching this rule. This is the default value if "enforceOnKey" is not configured. - IP: The source IP address of the request is the key. Each IP has this limit enforced separately. - HTTP_HEADER: The value of the HTTP header whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the header value. If no such header is present in the request, the key type defaults toALL. - XFF_IP: The first IP address (i.e. the originating client IP address) specified in the list of IPs under X-Forwarded-For HTTP header. If no such header is present or the value is not a valid IP, the key defaults to the source IP address of the request i.e. key type IP. - HTTP_COOKIE: The value of the HTTP cookie whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the cookie value. If no such cookie is present in the request, the key type defaults toALL. - HTTP_PATH: The URL path of the HTTP request. The key value is truncated to the first 128 bytes. - SNI: Server name indication in the TLS session of the HTTPS request. The key value is truncated to the first 128 bytes. The key type defaults to ALL on a HTTP session. - REGION_CODE: The country/region from which the request originates. - TLS_JA3_FINGERPRINT: JA3 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL. - USER_IP: The IP address of the originating client, which is resolved based on "userIpRequestHeaders" configured with the security policy. If there is no "userIpRequestHeaders" configuration or an IP address cannot be resolved from it, the key type defaults toIP. - ASN: The autonomous system number of the originating client. If not available, the key type defaults toALL. - TLS_JA4_FINGERPRINT: JA4 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL. For "fairshare" action, this value is limited to ALL i.e. a single rate limit threshold is enforced for all the requests matching the rule. Values: `ALL`, `ASN`, `HTTP_COOKIE`, `HTTP_HEADER`, `HTTP_PATH`, `IP`, `REGION_CODE`, `SNI`, `TLS_JA3_FINGERPRINT`, `TLS_JA4_FINGERPRINT`, `USER_IP`, `XFF_IP`. |
| `enforceOnKeyConfigs` | array<SecurityPolicyRuleRateLimitOptionsEnforceOnKeyConfig> | If specified, any combination of values of enforce_on_key_type/enforce_on_key_name is treated as the key on which ratelimit threshold/action is enforced. You can specify up to 3 enforce_on_key_configs. If enforce_on_key_configs is specified, enforce_on_key must not be specified. |
| `enforceOnKeyName` | string | Rate limit key name applicable only for the following key types: HTTP_HEADER -- Name of the HTTP header whose value is taken as the key value. HTTP_COOKIE -- Name of the HTTP cookie whose value is taken as the key value. |
| `exceedAction` | string | Action to take for requests that are above the configured rate limit threshold, to either deny with a specified HTTP response code, or redirect to a different endpoint. Valid options are `deny(STATUS)`, where valid values for `STATUS` are 403, 404, 429, and 502, and `redirect`, where the redirect parameters come from `exceedRedirectOptions` below. The `redirect` action is only supported in Global Security Policies of type CLOUD_ARMOR. |
| `exceedRedirectOptions` | SecurityPolicyRuleRedirectOptions | Parameters defining the redirect action that is used as the exceed action. Cannot be specified if the exceed action is not redirect. This field is only supported in Global Security Policies of type CLOUD_ARMOR. |
| `rateLimitThreshold` | SecurityPolicyRuleRateLimitOptionsThreshold | Threshold at which to begin ratelimiting. |

### `SecurityPolicyRuleRateLimitOptions` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `banDurationSec` | integer (int32) | Can only be specified if the action for the rule is "rate_based_ban". If specified, determines the time (in seconds) the traffic will continue to be banned by the rate limit after the rate falls below the threshold. |
| `banThreshold` | SecurityPolicyRuleRateLimitOptionsThreshold | Can only be specified if the action for the rule is "rate_based_ban". If specified, the key will be banned for the configured 'ban_duration_sec' when the number of requests that exceed the 'rate_limit_threshold' also exceed this 'ban_threshold'. |
| `conformAction` | string | Action to take for requests that are under the configured rate limit threshold. Valid option is "allow" only. |
| `enforceOnKey` | string enum | Determines the key to enforce the rate_limit_threshold on. Possible values are: - ALL: A single rate limit threshold is applied to all the requests matching this rule. This is the default value if "enforceOnKey" is not configured. - IP: The source IP address of the request is the key. Each IP has this limit enforced separately. - HTTP_HEADER: The value of the HTTP header whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the header value. If no such header is present in the request, the key type defaults toALL. - XFF_IP: The first IP address (i.e. the originating client IP address) specified in the list of IPs under X-Forwarded-For HTTP header. If no such header is present or the value is not a valid IP, the key defaults to the source IP address of the request i.e. key type IP. - HTTP_COOKIE: The value of the HTTP cookie whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the cookie value. If no such cookie is present in the request, the key type defaults toALL. - HTTP_PATH: The URL path of the HTTP request. The key value is truncated to the first 128 bytes. - SNI: Server name indication in the TLS session of the HTTPS request. The key value is truncated to the first 128 bytes. The key type defaults to ALL on a HTTP session. - REGION_CODE: The country/region from which the request originates. - TLS_JA3_FINGERPRINT: JA3 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL. - USER_IP: The IP address of the originating client, which is resolved based on "userIpRequestHeaders" configured with the security policy. If there is no "userIpRequestHeaders" configuration or an IP address cannot be resolved from it, the key type defaults toIP. - ASN: The autonomous system number of the originating client. If not available, the key type defaults toALL. - TLS_JA4_FINGERPRINT: JA4 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL. For "fairshare" action, this value is limited to ALL i.e. a single rate limit threshold is enforced for all the requests matching the rule. Values: `ALL`, `ALL_IPS`, `ASN`, `HTTP_COOKIE`, `HTTP_HEADER`, `HTTP_PATH`, `IP`, `REGION_CODE`, `SNI`, `TLS_JA3_FINGERPRINT`, `TLS_JA4_FINGERPRINT`, `USER_IP`, `XFF_IP`. |
| `enforceOnKeyConfigs` | array<SecurityPolicyRuleRateLimitOptionsEnforceOnKeyConfig> | If specified, any combination of values of enforce_on_key_type/enforce_on_key_name is treated as the key on which ratelimit threshold/action is enforced. You can specify up to 3 enforce_on_key_configs. If enforce_on_key_configs is specified, enforce_on_key must not be specified. |
| `enforceOnKeyName` | string | Rate limit key name applicable only for the following key types: HTTP_HEADER -- Name of the HTTP header whose value is taken as the key value. HTTP_COOKIE -- Name of the HTTP cookie whose value is taken as the key value. |
| `exceedAction` | string | Action to take for requests that are above the configured rate limit threshold, to either deny with a specified HTTP response code, or redirect to a different endpoint. Valid options are `deny(STATUS)`, where valid values for `STATUS` are 403, 404, 429, and 502, and `redirect`, where the redirect parameters come from `exceedRedirectOptions` below. The `redirect` action is only supported in Global Security Policies of type CLOUD_ARMOR. |
| `exceedActionRpcStatus` | SecurityPolicyRuleRateLimitOptionsRpcStatus | Specified gRPC response status for proxyless gRPC requests that are above the configured rate limit threshold |
| `exceedRedirectOptions` | SecurityPolicyRuleRedirectOptions | Parameters defining the redirect action that is used as the exceed action. Cannot be specified if the exceed action is not redirect. This field is only supported in Global Security Policies of type CLOUD_ARMOR. |
| `rateLimitThreshold` | SecurityPolicyRuleRateLimitOptionsThreshold | Threshold at which to begin ratelimiting. |

### `SecurityPolicyRuleRateLimitOptionsEnforceOnKeyConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enforceOnKeyName` | string | Rate limit key name applicable only for the following key types: HTTP_HEADER -- Name of the HTTP header whose value is taken as the key value. HTTP_COOKIE -- Name of the HTTP cookie whose value is taken as the key value. |
| `enforceOnKeyType` | string enum | Determines the key to enforce the rate_limit_threshold on. Possible values are: - ALL: A single rate limit threshold is applied to all the requests matching this rule. This is the default value if "enforceOnKeyConfigs" is not configured. - IP: The source IP address of the request is the key. Each IP has this limit enforced separately. - HTTP_HEADER: The value of the HTTP header whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the header value. If no such header is present in the request, the key type defaults toALL. - XFF_IP: The first IP address (i.e. the originating client IP address) specified in the list of IPs under X-Forwarded-For HTTP header. If no such header is present or the value is not a valid IP, the key defaults to the source IP address of the request i.e. key type IP. - HTTP_COOKIE: The value of the HTTP cookie whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the cookie value. If no such cookie is present in the request, the key type defaults toALL. - HTTP_PATH: The URL path of the HTTP request. The key value is truncated to the first 128 bytes. - SNI: Server name indication in the TLS session of the HTTPS request. The key value is truncated to the first 128 bytes. The key type defaults to ALL on a HTTP session. - REGION_CODE: The country/region from which the request originates. - TLS_JA3_FINGERPRINT: JA3 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL. - USER_IP: The IP address of the originating client, which is resolved based on "userIpRequestHeaders" configured with the security policy. If there is no "userIpRequestHeaders" configuration or an IP address cannot be resolved from it, the key type defaults toIP. - ASN: The autonomous system number of the originating client. If not available, the key type defaults toALL. - TLS_JA4_FINGERPRINT: JA4 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL. Values: `ALL`, `ASN`, `HTTP_COOKIE`, `HTTP_HEADER`, `HTTP_PATH`, `IP`, `REGION_CODE`, `SNI`, `TLS_JA3_FINGERPRINT`, `TLS_JA4_FINGERPRINT`, `USER_IP`, `XFF_IP`. |

### `SecurityPolicyRuleRateLimitOptionsRpcStatus`

- Simplified google.rpc.Status type (omitting details).
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `message` | string | A developer-facing error message, which should be in English. |

### `SecurityPolicyRuleRateLimitOptionsThreshold`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | integer (int32) | Number of HTTP(S) requests for calculating the threshold. |
| `intervalSec` | integer (int32) | Interval over which the threshold is computed. |

### `SecurityPolicyRuleRedirectOptions`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `target` | string | Target for the redirect action. This is required if the type is EXTERNAL_302 and cannot be specified for GOOGLE_RECAPTCHA. |
| `type` | string enum | Type of the redirect action. Possible values are: - GOOGLE_RECAPTCHA: redirect to reCAPTCHA for manual challenge assessment. - EXTERNAL_302: redirect to a different URL via a 302 response. Values: `EXTERNAL_302`, `GOOGLE_RECAPTCHA`. |

### `SecurityPolicyUserDefinedField`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `base` | string enum | The base relative to which 'offset' is measured. Possible values are: - IPV4: Points to the beginning of the IPv4 header. - IPV6: Points to the beginning of the IPv6 header. - TCP: Points to the beginning of the TCP header, skipping over any IPv4 options or IPv6 extension headers. Not present for non-first fragments. - UDP: Points to the beginning of the UDP header, skipping over any IPv4 options or IPv6 extension headers. Not present for non-first fragments. required Values: `IPV4`, `IPV6`, `TCP`, `UDP`. |
| `mask` | string | If specified, apply this mask (bitwise AND) to the field to ignore bits before matching. Encoded as a hexadecimal number (starting with "0x"). The last byte of the field (in network byte order) corresponds to the least significant byte of the mask. |
| `name` | string | The name of this field. Must be unique within the policy. |
| `offset` | integer (int32) | Offset of the first byte of the field (in network byte order) relative to 'base'. |
| `size` | integer (int32) | Size of the field in bytes. Valid values: 1-4. |

### `SecuritySettings`

- The authentication and authorization settings for a BackendService.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `awsV4Authentication` | AWSV4Signature | The configuration needed to generate a signature for access to private storage buckets that support AWS's Signature Version 4 for authentication. Allowed only for INTERNET_IP_PORT and INTERNET_FQDN_PORT NEG backends. |
| `clientTlsPolicy` | string | Optional. A URL referring to a networksecurity.ClientTlsPolicy resource that describes how clients should authenticate with this service's backends. clientTlsPolicy only applies to a globalBackendService with the loadBalancingScheme set to INTERNAL_SELF_MANAGED. If left blank, communications are not encrypted. |
| `subjectAltNames` | array<string> | Optional. A list of Subject Alternative Names (SANs) that the client verifies during a mutual TLS handshake with an server/endpoint for thisBackendService. When the server presents its X.509 certificate to the client, the client inspects the certificate'ssubjectAltName field. If the field contains one of the specified values, the communication continues. Otherwise, it fails. This additional check enables the client to verify that the server is authorized to run the requested service. Note that the contents of the server certificate's subjectAltName field are configured by the Public Key Infrastructure which provisions server identities. Only applies to a global BackendService withloadBalancingScheme set to INTERNAL_SELF_MANAGED. Only applies when BackendService has an attachedclientTlsPolicy with clientCertificate (mTLS mode). |

### `SecuritySettings` (alpha)

- The authentication and authorization settings for a BackendService.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `authentication` | string | \[Deprecated\] Use clientTlsPolicy instead. |
| `authenticationPolicy` | AuthenticationPolicy | \[Deprecated\] Authentication policy defines what authentication methods can be accepted on backends, and if authenticated, which method/certificate will set the request principal. request principal. |
| `authorizationConfig` | AuthorizationConfig | \[Deprecated\] Authorization config defines the Role Based Access Control (RBAC) config. Authorization config defines the Role Based Access Control (RBAC) config. |
| `awsV4Authentication` | AWSV4Signature | The configuration needed to generate a signature for access to private storage buckets that support AWS's Signature Version 4 for authentication. Allowed only for INTERNET_IP_PORT and INTERNET_FQDN_PORT NEG backends. |
| `clientTlsPolicy` | string | Optional. A URL referring to a networksecurity.ClientTlsPolicy resource that describes how clients should authenticate with this service's backends. clientTlsPolicy only applies to a globalBackendService with the loadBalancingScheme set to INTERNAL_SELF_MANAGED. If left blank, communications are not encrypted. |
| `clientTlsSettings` | ClientTlsSettings | \[Deprecated\] TLS Settings for the backend service. |
| `subjectAltNames` | array<string> | Optional. A list of Subject Alternative Names (SANs) that the client verifies during a mutual TLS handshake with an server/endpoint for thisBackendService. When the server presents its X.509 certificate to the client, the client inspects the certificate'ssubjectAltName field. If the field contains one of the specified values, the communication continues. Otherwise, it fails. This additional check enables the client to verify that the server is authorized to run the requested service. Note that the contents of the server certificate's subjectAltName field are configured by the Public Key Infrastructure which provisions server identities. Only applies to a global BackendService withloadBalancingScheme set to INTERNAL_SELF_MANAGED. Only applies when BackendService has an attachedclientTlsPolicy with clientCertificate (mTLS mode). |

### `SecuritySettings` (beta)

- The authentication and authorization settings for a BackendService.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `authentication` | string | \[Deprecated\] Use clientTlsPolicy instead. |
| `awsV4Authentication` | AWSV4Signature | The configuration needed to generate a signature for access to private storage buckets that support AWS's Signature Version 4 for authentication. Allowed only for INTERNET_IP_PORT and INTERNET_FQDN_PORT NEG backends. |
| `clientTlsPolicy` | string | Optional. A URL referring to a networksecurity.ClientTlsPolicy resource that describes how clients should authenticate with this service's backends. clientTlsPolicy only applies to a globalBackendService with the loadBalancingScheme set to INTERNAL_SELF_MANAGED. If left blank, communications are not encrypted. |
| `subjectAltNames` | array<string> | Optional. A list of Subject Alternative Names (SANs) that the client verifies during a mutual TLS handshake with an server/endpoint for thisBackendService. When the server presents its X.509 certificate to the client, the client inspects the certificate'ssubjectAltName field. If the field contains one of the specified values, the communication continues. Otherwise, it fails. This additional check enables the client to verify that the server is authorized to run the requested service. Note that the contents of the server certificate's subjectAltName field are configured by the Public Key Infrastructure which provisions server identities. Only applies to a global BackendService withloadBalancingScheme set to INTERNAL_SELF_MANAGED. Only applies when BackendService has an attachedclientTlsPolicy with clientCertificate (mTLS mode). |

### `SerialPortOutput`

- An instance serial console output.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contents` | string | \[Output Only\] The contents of the console output. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#serialPortOutput for serial port output. |
| `next` | string (int64) | \[Output Only\] The position of the next byte of content, regardless of whether the content exists, following the output returned in the `contents` property. Use this value in the next request as the start parameter. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `start` | string (int64) | The starting byte position of the output that was returned. This should match the start parameter sent with the request. If the serial console output exceeds the size of the buffer (1 MB), older output is overwritten by newer content. The output start value will indicate the byte position of the output that was returned, which might be different than the `start` value that was specified in the request. |

### `ServerBinding`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | — Values: `RESTART_NODE_ON_ANY_SERVER`, `RESTART_NODE_ON_MINIMAL_SERVERS`, `SERVER_BINDING_TYPE_UNSPECIFIED`. |

### `ServerTlsSettings`

- The TLS settings for the server.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `proxyTlsContext` | TlsContext | Configures the mechanism to obtain security certificates and identity information. |
| `subjectAltNames` | array<string> | A list of alternate names to verify the subject identity in the certificate presented by the client. |
| `tlsMode` | string enum | Indicates whether connections should be secured using TLS. The value of this field determines how TLS is enforced. This field can be set to one of the following: - SIMPLE Secure connections with standard TLS semantics. - MUTUAL Secure connections to the backends using mutual TLS by presenting client certificates for authentication. Values: `INVALID`, `MUTUAL`, `SIMPLE`. |

### `ServiceAccount`

- A service account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | Email address of the service account. |
| `scopes` | array<string> | The list of scopes to be made available for this service account. |

### `ServiceAttachment`

- Represents a ServiceAttachment resource. A service attachment represents a service that a producer has exposed. It encapsulates the load balancer which fronts the service runs and a list of NAT IP ranges that the producers uses to represent the consumers connecting to the service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectedEndpoints` | array<ServiceAttachmentConnectedEndpoint> | Output only. \[Output Only\] An array of connections for all the consumers connected to this service attachment. |
| `connectionPreference` | string enum | The connection preference of service attachment. The value can be set to ACCEPT_AUTOMATIC. An ACCEPT_AUTOMATIC service attachment is one that always accepts the connection from consumer forwarding rules. Values: `ACCEPT_AUTOMATIC`, `ACCEPT_MANUAL`, `CONNECTION_PREFERENCE_UNSPECIFIED`. |
| `consumerAcceptLists` | array<ServiceAttachmentConsumerProjectLimit> | Specifies which consumer projects or networks are allowed to connect to the service attachment. Each project or network has a connection limit. A given service attachment can manage connections at either the project or network level. Therefore, both the accept and reject lists for a given service attachment must contain either only projects or only networks or only endpoints. |
| `consumerRejectLists` | array<string> | Specifies a list of projects or networks that are not allowed to connect to this service attachment. The project can be specified using its project ID or project number and the network can be specified using its URL. A given service attachment can manage connections at either the project or network level. Therefore, both the reject and accept lists for a given service attachment must contain either only projects or only networks. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `domainNames` | array<string> | If specified, the domain name will be used during the integration between the PSC connected endpoints and the Cloud DNS. For example, this is a valid domain name: "p.mycompany.com.". Current max number of domain names supported is 1. |
| `enableProxyProtocol` | boolean | If true, enable the proxy protocol which is for supplying client TCP/IP address data in TCP connections that traverse proxies on their way to destination servers. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a ServiceAttachment. An up-to-date fingerprint must be provided in order to patch/update the ServiceAttachment; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the ServiceAttachment. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#serviceAttachment for service attachments. |
| `metadata` | object | Metadata of the service attachment. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `natIpsPerEndpoint` | integer (uint32) | The number of NAT IP addresses to be allocated per connected endpoint. If not specified, the default value is 1. |
| `natSubnets` | array<string> | An array of URLs where each entry is the URL of a subnet provided by the service producer to use for NAT in this service attachment. |
| `producerForwardingRule` | string | The URL of a forwarding rule with loadBalancingScheme INTERNAL\* that is serving the endpoint identified by this service attachment. |
| `propagatedConnectionLimit` | integer (uint32) | The number of consumer spokes that connected Private Service Connect endpoints can be propagated to through Network Connectivity Center. This limit lets the service producer limit how many propagated Private Service Connect connections can be established to this service attachment from a single consumer. If the connection preference of the service attachment is ACCEPT_MANUAL, the limit applies to each project or network that is listed in the consumer accept list. If the connection preference of the service attachment is ACCEPT_AUTOMATIC, the limit applies to each project that contains a connected endpoint. If unspecified, the default propagated connection limit is 250. |
| `pscServiceAttachmentId` | Uint128 | Output only. \[Output Only\] An 128-bit global unique ID of the PSC service attachment. |
| `reconcileConnections` | boolean | This flag determines whether a consumer accept/reject list change can reconcile the statuses of existing ACCEPTED or REJECTED PSC endpoints. - If false, connection policy update will only affect existing PENDING PSC endpoints. Existing ACCEPTED/REJECTED endpoints will remain untouched regardless how the connection policy is modified . - If true, update will affect both PENDING and ACCEPTED/REJECTED PSC endpoints. For example, an ACCEPTED PSC endpoint will be moved to REJECTED if its project is added to the reject list. For newly created service attachment, this boolean defaults to false. |
| `region` | string | Output only. \[Output Only\] URL of the region where the service attachment resides. This field applies only to the region resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `targetService` | string | The URL of a service serving the endpoint identified by this service attachment. |

### `ServiceAttachment` (beta)

- Represents a ServiceAttachment resource. A service attachment represents a service that a producer has exposed. It encapsulates the load balancer which fronts the service runs and a list of NAT IP ranges that the producers uses to represent the consumers connecting to the service.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `connectedEndpoints` | array<ServiceAttachmentConnectedEndpoint> | Output only. \[Output Only\] An array of connections for all the consumers connected to this service attachment. |
| `connectionPreference` | string enum | The connection preference of service attachment. The value can be set to ACCEPT_AUTOMATIC. An ACCEPT_AUTOMATIC service attachment is one that always accepts the connection from consumer forwarding rules. Values: `ACCEPT_AUTOMATIC`, `ACCEPT_MANUAL`, `CONNECTION_PREFERENCE_UNSPECIFIED`. |
| `consumerAcceptLists` | array<ServiceAttachmentConsumerProjectLimit> | Specifies which consumer projects or networks are allowed to connect to the service attachment. Each project or network has a connection limit. A given service attachment can manage connections at either the project or network level. Therefore, both the accept and reject lists for a given service attachment must contain either only projects or only networks or only endpoints. |
| `consumerRejectLists` | array<string> | Specifies a list of projects or networks that are not allowed to connect to this service attachment. The project can be specified using its project ID or project number and the network can be specified using its URL. A given service attachment can manage connections at either the project or network level. Therefore, both the reject and accept lists for a given service attachment must contain either only projects or only networks. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `domainNames` | array<string> | If specified, the domain name will be used during the integration between the PSC connected endpoints and the Cloud DNS. For example, this is a valid domain name: "p.mycompany.com.". Current max number of domain names supported is 1. |
| `enableProxyProtocol` | boolean | If true, enable the proxy protocol which is for supplying client TCP/IP address data in TCP connections that traverse proxies on their way to destination servers. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a ServiceAttachment. An up-to-date fingerprint must be provided in order to patch/update the ServiceAttachment; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the ServiceAttachment. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#serviceAttachment for service attachments. |
| `metadata` | object | Metadata of the service attachment. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `natIpsPerEndpoint` | integer (uint32) | The number of NAT IP addresses to be allocated per connected endpoint. If not specified, the default value is 1. |
| `natSubnets` | array<string> | An array of URLs where each entry is the URL of a subnet provided by the service producer to use for NAT in this service attachment. |
| `producerForwardingRule` | string | The URL of a forwarding rule with loadBalancingScheme INTERNAL\* that is serving the endpoint identified by this service attachment. |
| `propagatedConnectionLimit` | integer (uint32) | The number of consumer spokes that connected Private Service Connect endpoints can be propagated to through Network Connectivity Center. This limit lets the service producer limit how many propagated Private Service Connect connections can be established to this service attachment from a single consumer. If the connection preference of the service attachment is ACCEPT_MANUAL, the limit applies to each project or network that is listed in the consumer accept list. If the connection preference of the service attachment is ACCEPT_AUTOMATIC, the limit applies to each project that contains a connected endpoint. If unspecified, the default propagated connection limit is 250. |
| `pscServiceAttachmentId` | Uint128 | Output only. \[Output Only\] An 128-bit global unique ID of the PSC service attachment. |
| `reconcileConnections` | boolean | This flag determines whether a consumer accept/reject list change can reconcile the statuses of existing ACCEPTED or REJECTED PSC endpoints. - If false, connection policy update will only affect existing PENDING PSC endpoints. Existing ACCEPTED/REJECTED endpoints will remain untouched regardless how the connection policy is modified . - If true, update will affect both PENDING and ACCEPTED/REJECTED PSC endpoints. For example, an ACCEPTED PSC endpoint will be moved to REJECTED if its project is added to the reject list. For newly created service attachment, this boolean defaults to false. |
| `region` | string | Output only. \[Output Only\] URL of the region where the service attachment resides. This field applies only to the region resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `targetService` | string | The URL of a service serving the endpoint identified by this service attachment. |
| `tunnelingConfig` | ServiceAttachmentTunnelingConfig | When a tunneling config is set on this service attachment it will encapsulate traffic between consumer and producer. When tunneling is enabled: - nat_subnets must be unset - enable_proxy_protocol must be false - producer_forwarding_rule must be a L4 ILB. - |

### `ServiceAttachment` (preview)

- Represents a ServiceAttachment resource. A service attachment represents a service that a producer has exposed. It encapsulates the load balancer which fronts the service runs and a list of NAT IP ranges that the producers uses to represent the consumers connecting to the service.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `connectedEndpoints` | array<ServiceAttachmentConnectedEndpoint> | Output only. \[Output Only\] An array of connections for all the consumers connected to this service attachment. |
| `connectionPreference` | string enum | The connection preference of service attachment. The value can be set to ACCEPT_AUTOMATIC. An ACCEPT_AUTOMATIC service attachment is one that always accepts the connection from consumer forwarding rules. Values: `ACCEPT_AUTOMATIC`, `ACCEPT_MANUAL`, `CONNECTION_PREFERENCE_UNSPECIFIED`. |
| `consumerAcceptLists` | array<ServiceAttachmentConsumerProjectLimit> | Specifies which consumer projects or networks are allowed to connect to the service attachment. Each project or network has a connection limit. A given service attachment can manage connections at either the project or network level. Therefore, both the accept and reject lists for a given service attachment must contain either only projects or only networks or only endpoints. |
| `consumerRejectLists` | array<string> | Specifies a list of projects or networks that are not allowed to connect to this service attachment. The project can be specified using its project ID or project number and the network can be specified using its URL. A given service attachment can manage connections at either the project or network level. Therefore, both the reject and accept lists for a given service attachment must contain either only projects or only networks. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `domainNames` | array<string> | If specified, the domain name will be used during the integration between the PSC connected endpoints and the Cloud DNS. For example, this is a valid domain name: "p.mycompany.com.". Current max number of domain names supported is 1. |
| `enableProxyProtocol` | boolean | If true, enable the proxy protocol which is for supplying client TCP/IP address data in TCP connections that traverse proxies on their way to destination servers. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a ServiceAttachment. An up-to-date fingerprint must be provided in order to patch/update the ServiceAttachment; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the ServiceAttachment. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#serviceAttachment for service attachments. |
| `metadata` | object | Metadata of the service attachment. |
| `mode` | string enum | Optional. The connection mode of the service attachment. Values: `DIRECT`, `MODE_UNSPECIFIED`, `NAT`. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `natIpsPerEndpoint` | integer (uint32) | The number of NAT IP addresses to be allocated per connected endpoint. If not specified, the default value is 1. |
| `natSubnets` | array<string> | An array of URLs where each entry is the URL of a subnet provided by the service producer to use for NAT in this service attachment. |
| `producerForwardingRule` | string | The URL of a forwarding rule with loadBalancingScheme INTERNAL\* that is serving the endpoint identified by this service attachment. |
| `propagatedConnectionLimit` | integer (uint32) | The number of consumer spokes that connected Private Service Connect endpoints can be propagated to through Network Connectivity Center. This limit lets the service producer limit how many propagated Private Service Connect connections can be established to this service attachment from a single consumer. If the connection preference of the service attachment is ACCEPT_MANUAL, the limit applies to each project or network that is listed in the consumer accept list. If the connection preference of the service attachment is ACCEPT_AUTOMATIC, the limit applies to each project that contains a connected endpoint. If unspecified, the default propagated connection limit is 250. |
| `pscServiceAttachmentId` | Uint128 | Output only. \[Output Only\] An 128-bit global unique ID of the PSC service attachment. |
| `reconcileConnections` | boolean | This flag determines whether a consumer accept/reject list change can reconcile the statuses of existing ACCEPTED or REJECTED PSC endpoints. - If false, connection policy update will only affect existing PENDING PSC endpoints. Existing ACCEPTED/REJECTED endpoints will remain untouched regardless how the connection policy is modified . - If true, update will affect both PENDING and ACCEPTED/REJECTED PSC endpoints. For example, an ACCEPTED PSC endpoint will be moved to REJECTED if its project is added to the reject list. For newly created service attachment, this boolean defaults to false. |
| `region` | string | Output only. \[Output Only\] URL of the region where the service attachment resides. This field applies only to the region resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `targetService` | string | The URL of a service serving the endpoint identified by this service attachment. |

### `ServiceAttachmentAggregatedList`

- Contains a list of ServiceAttachmentsScopedList.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of ServiceAttachmentsScopedList resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ServiceAttachmentConnectedEndpoint`

- \[Output Only\] A connection connected to this service attachment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerNetwork` | string | The url of the consumer network. |
| `endpoint` | string | The url of a connected endpoint. |
| `endpointWithId` | string | The url of a connected endpoint with resource id. |
| `natIps` | array<string> | NAT IPs of the connected PSC endpoint and those of other endpoints propagated from it. |
| `propagatedConnectionCount` | integer (uint32) | The number of consumer Network Connectivity Center spokes that the connected Private Service Connect endpoint has propagated to. |
| `pscConnectionId` | string (uint64) | The PSC connection id of the connected endpoint. |
| `status` | string enum | The status of a connected endpoint to this service attachment. Values: `ACCEPTED`, `CLOSED`, `NEEDS_ATTENTION`, `PENDING`, `REJECTED`, `STATUS_UNSPECIFIED`. |

### `ServiceAttachmentConsumerProjectLimit`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionLimit` | integer (uint32) | The value of the limit to set. For endpoint_url, the limit should be no more than 1. |
| `endpointUrl` | string | The URL for the PSC endpoint to accept |
| `networkUrl` | string | The network URL for the network to set the limit for. |
| `projectIdOrNum` | string | The project id or number for the project to set the limit for. |

### `ServiceAttachmentList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<ServiceAttachment> | A list of ServiceAttachment resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#serviceAttachment for service attachments. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ServiceAttachmentTunnelingConfig`

- Use to configure this PSC connection in tunneling mode. In tunneling mode traffic from consumer to producer will be encapsulated as it crosses the VPC boundary and traffic from producer to consumer will be decapsulated in the same manner.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `encapsulationProfile` | string enum | Specify the encapsulation protocol and what metadata to include in incoming encapsulated packet headers. Values: `GENEVE_SECURITY_V1`, `UNSPECIFIED_ENCAPSULATION_PROFILE`. |
| `routingMode` | string enum | How this Service Attachment will treat traffic sent to the tunnel_ip, destined for the consumer network. Values: `PACKET_INJECTION`, `STANDARD_ROUTING`, `UNSPECIFIED_ROUTING_MODE`. |

### `ServiceAttachmentsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceAttachments` | array<ServiceAttachment> | A list of ServiceAttachments contained in this scope. |
| `warning` | object | Informational warning which replaces the list of service attachments when the list is empty. |

### `ServiceIntegrationSpec`

- Specifies the parameters to configure an integration with instances.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `backupDr` | ServiceIntegrationSpecBackupDRSpec | — |

### `ServiceIntegrationSpecBackupDRSpec`

- Specifies parameters to Backup and DR to attach a BackupPlan to a compute instance for managed VM backup.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `plan` | string | The BackupPlan resource to attach to the instance. Specified as a resource reference in instances, and regional instance templates, and as just the plan name in global instance templates |

### `SetCommonInstanceMetadataOperationMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientOperationId` | string | \[Output Only\] The client operation id. |
| `perLocationOperations` | object | \[Output Only\] Status information per location (location name is key). Example key: zones/us-central1-a |

### `SetCommonInstanceMetadataOperationMetadataPerLocationOperationInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | Status | \[Output Only\] If state is `ABANDONED` or `FAILED`, this field is populated. |
| `state` | string enum | \[Output Only\] Status of the action, which can be one of the following: `PROPAGATING`, `PROPAGATED`, `ABANDONED`, `FAILED`, or `DONE`. Values: `ABANDONED`, `DONE`, `FAILED`, `PROPAGATED`, `PROPAGATING`, `UNSPECIFIED`. |

### `ShareSettings`

- The share setting for reservations and sole tenancy node groups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectMap` | object | A map of project id and project config. This is only valid when share_type's value is SPECIFIC_PROJECTS. |
| `shareType` | string enum | Type of sharing for this shared-reservation Values: `LOCAL`, `ORGANIZATION`, `SHARE_TYPE_UNSPECIFIED`, `SPECIFIC_PROJECTS`. |

### `ShareSettings` (beta)

- The share setting for reservations and sole tenancy node groups.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `folderMap` | object | A map of folder id and folder config to specify consumer projects for this shared-reservation. This is only valid when share_type's value is DIRECT_PROJECTS_UNDER_SPECIFIC_FOLDERS. Folder id should be a string of number, and without "folders/" prefix. |
| `projectMap` | object | A map of project id and project config. This is only valid when share_type's value is SPECIFIC_PROJECTS. |
| `projects` | array<string> | A List of Project names to specify consumer projects for this shared-reservation. This is only valid when share_type's value is SPECIFIC_PROJECTS. |
| `shareType` | string enum | Type of sharing for this shared-reservation Values: `DIRECT_PROJECTS_UNDER_SPECIFIC_FOLDERS`, `LOCAL`, `ORGANIZATION`, `SHARE_TYPE_UNSPECIFIED`, `SPECIFIC_PROJECTS`. |

### `ShareSettingsFolderConfig`

- Config for each folder in the share settings.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `folderId` | string | The folder ID, should be same as the key of this folder config in the parent map. Folder id should be a string of number, and without "folders/" prefix. |

### `ShareSettingsProjectConfig`

- Config for each project in the share settings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | The project ID, should be same as the key of this project config in the parent map. |

### `ShieldedInstanceConfig`

- A set of Shielded Instance options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableIntegrityMonitoring` | boolean | Defines whether the instance has integrity monitoring enabled.Enabled by default. |
| `enableSecureBoot` | boolean | Defines whether the instance has Secure Boot enabled.Disabled by default. |
| `enableVtpm` | boolean | Defines whether the instance has the vTPM enabled.Enabled by default. |

### `ShieldedInstanceIdentity`

- A Shielded Instance Identity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eccP256EncryptionKey` | ShieldedInstanceIdentityEntry | An Endorsement Key (EK) made by the ECC P256 algorithm issued to the Shielded Instance's vTPM. |
| `eccP256SigningKey` | ShieldedInstanceIdentityEntry | An Attestation Key (AK) made by the ECC P256 algorithm issued to the Shielded Instance's vTPM. |
| `encryptionKey` | ShieldedInstanceIdentityEntry | An Endorsement Key (EK) made by the RSA 2048 algorithm issued to the Shielded Instance's vTPM. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#shieldedInstanceIdentity for shielded Instance identity entry. |
| `signingKey` | ShieldedInstanceIdentityEntry | An Attestation Key (AK) made by the RSA 2048 algorithm issued to the Shielded Instance's vTPM. |

### `ShieldedInstanceIdentityEntry`

- A Shielded Instance Identity Entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ekCert` | string | A PEM-encoded X.509 certificate. This field can be empty. |
| `ekPub` | string | A PEM-encoded public key. |

### `ShieldedInstanceIntegrityPolicy`

- The policy describes the baseline against which Instance boot integrity is measured.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `updateAutoLearnPolicy` | boolean | Updates the integrity policy baseline using the measurements from the VM instance's most recent boot. |

### `ShieldedVmConfig`

- A set of Shielded VM options.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `enableIntegrityMonitoring` | boolean | Defines whether the instance has integrity monitoring enabled. |
| `enableSecureBoot` | boolean | Defines whether the instance has Secure Boot enabled. |
| `enableVtpm` | boolean | Defines whether the instance has the vTPM enabled. |

### `ShieldedVmIdentity`

- A Shielded VM Identity.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `encryptionKey` | ShieldedVmIdentityEntry | An Endorsement Key (EK) issued to the Shielded VM's vTPM. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#shieldedVmIdentity for shielded VM identity entry. |
| `signingKey` | ShieldedVmIdentityEntry | An Attestation Key (AK) issued to the Shielded VM's vTPM. |

### `ShieldedVmIdentityEntry`

- A Shielded Instance Identity Entry.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `ekCert` | string | A PEM-encoded X.509 certificate. This field can be empty. |
| `ekPub` | string | A PEM-encoded public key. |

### `ShieldedVmIntegrityPolicy`

- The policy describes the baseline against which VM instance boot integrity is measured.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `updateAutoLearnPolicy` | boolean | Updates the integrity policy baseline using the measurements from the VM instance's most recent boot. |

### `SignedUrlKey`

- Represents a customer-supplied Signing Key used by Cloud CDN Signed URLs
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyName` | string | Name of the key. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `keyValue` | string | 128-bit key value used for signing the URL. The key value must be a validRFC 4648 Section 5 base64url encoded string. |

### `Snapshot`

- Represents a Persistent Disk Snapshot resource. You can use snapshots to back up data on a regular interval. For more information, read Creating persistent disk snapshots.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | Output only. \[Output Only\] The architecture of the snapshot. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `autoCreated` | boolean | Output only. \[Output Only\] Set to true if snapshots are automatically created by applying resource policy on the target disk. |
| `chainName` | string | Creates the new snapshot in the snapshot chain labeled with the specified name. The chain name must be 1-63 characters long and comply with RFC1035. This is an uncommon option only for advanced service owners who needs to create separate snapshot chains, for example, for chargeback tracking. When you describe your snapshot resource, this field is visible only if it has a non-empty value. |
| `creationSizeBytes` | string (int64) | Output only. \[Output Only\] Size in bytes of the snapshot at creation time. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `diskSizeGb` | string (int64) | Output only. \[Output Only\] Size of the source disk, specified in GB. |
| `downloadBytes` | string (int64) | Output only. \[Output Only\] Number of bytes downloaded to restore a snapshot to a disk. |
| `enableConfidentialCompute` | boolean | Output only. Whether this snapshot is created from a confidential compute mode disk. \[Output Only\]: This field is not set by user, but from source disk. |
| `guestFlush` | boolean | \[Input Only\] Whether to attempt an application consistent snapshot by informing the OS to prepare for the snapshot process. |
| `guestOsFeatures` | array<GuestOsFeature> | Output only. \[Output Only\] A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#snapshot for Snapshot resources. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this snapshot, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a snapshot. |
| `labels` | object | Labels to apply to this snapshot. These can be later modified by the setLabels method. Label values may be empty. |
| `licenseCodes` | array<string> | Output only. \[Output Only\] Integer license codes indicating which licenses are attached to this snapshot. |
| `licenses` | array<string> | Output only. \[Output Only\] A list of public visible licenses that apply to this snapshot. This can be because the original image had licenses attached (such as a Windows image). |
| `locationHint` | string | An opaque location hint used to place the snapshot close to other resources. This field is for use by internal tools that use the public API. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | SnapshotParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | Output only. \[Output Only\] URL of the region where the snapshot resides. Only applicable for regional snapshots. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `snapshotEncryptionKey` | CustomerEncryptionKey | Encrypts the snapshot using acustomer-supplied encryption key. After you encrypt a snapshot using a customer-supplied key, you must provide the same key if you use the snapshot later. For example, you must provide the encryption key when you create a disk from the encrypted snapshot in a future request. Customer-supplied encryption keys do not protect access to metadata of the snapshot. If you do not provide an encryption key when creating the snapshot, then the snapshot will be encrypted using an automatically generated key and you do not need to provide a key to use the snapshot later. |
| `snapshotGroupId` | string | Output only. \[Output Only\] The unique ID of the snapshot group that this snapshot belongs to. The usage of snapshot group feature is restricted. |
| `snapshotGroupName` | string | Output only. \[Output only\] The snapshot group that this snapshot belongs to. The usage of snapshot group feature is restricted. |
| `snapshotType` | string enum | Indicates the type of the snapshot. Valid values are ARCHIVE or STANDARD. The default is STANDARD. Values: `ARCHIVE`, `STANDARD`. |
| `sourceDisk` | string | The source disk used to create this snapshot. |
| `sourceDiskEncryptionKey` | CustomerEncryptionKey | The customer-supplied encryption key of the source disk. Required if the source disk is protected by a customer-supplied encryption key. |
| `sourceDiskForRecoveryCheckpoint` | string | The source disk whose recovery checkpoint will be used to create this snapshot. |
| `sourceDiskId` | string | Output only. \[Output Only\] The ID value of the disk used to create this snapshot. This value may be used to determine whether the snapshot was taken from the current or a previous instance of a given disk name. |
| `sourceInstantSnapshot` | string | The source instant snapshot used to create this snapshot. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instantSnapshots/instantSnapshot - projects/project/zones/zone/instantSnapshots/instantSnapshot - zones/zone/instantSnapshots/instantSnapshot |
| `sourceInstantSnapshotEncryptionKey` | CustomerEncryptionKey | Customer provided encryption key when creating Snapshot from Instant Snapshot. |
| `sourceInstantSnapshotId` | string | Output only. \[Output Only\] The unique ID of the instant snapshot used to create this snapshot. This value identifies the exact instant snapshot that was used to create this snapshot. For example, if you created the snapshot from an instant snapshot that was later deleted and recreated under the same name, the source instant snapshot ID would identify the exact instant snapshot that was used. |
| `sourceSnapshotSchedulePolicy` | string | Output only. \[Output Only\] URL of the resource policy which created this scheduled snapshot. |
| `sourceSnapshotSchedulePolicyId` | string | Output only. \[Output Only\] ID of the resource policy which created this scheduled snapshot. |
| `status` | string enum | Output only. \[Output Only\] The status of the snapshot. This can beCREATING, DELETING, FAILED,READY, or UPLOADING. Values: `CREATING`, `DELETING`, `FAILED`, `READY`, `UPLOADING`. |
| `storageBytes` | string (int64) | Output only. \[Output Only\] A size of the storage used by the snapshot. As snapshots share storage, this number is expected to change with snapshot creation/deletion. |
| `storageBytesStatus` | string enum | Output only. \[Deprecated\] Instead, check the storageBytes field. After snapshot creation, the storageBytesStatus field is alwaysUP_TO_DATE. \[Output Only\] An indicator whether storageBytes is in a stable state or it is being adjusted as a result of shared storage reallocation. This status can either be unset, meaning the snapshot is being created, or UP_TO_DATE, meaning the size of the snapshot is up-to-date. Values: `UPDATING`, `UP_TO_DATE`. |
| `storageLocations` | array<string> | Cloud Storage bucket storage location of the snapshot (regional or multi-regional). |

### `Snapshot` (alpha)

- Represents a Persistent Disk Snapshot resource. You can use snapshots to back up data on a regular interval. For more information, read Creating persistent disk snapshots.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | Output only. \[Output Only\] The architecture of the snapshot. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `autoCreated` | boolean | Output only. \[Output Only\] Set to true if snapshots are automatically created by applying resource policy on the target disk. |
| `chainName` | string | Creates the new snapshot in the snapshot chain labeled with the specified name. The chain name must be 1-63 characters long and comply with RFC1035. This is an uncommon option only for advanced service owners who needs to create separate snapshot chains, for example, for chargeback tracking. When you describe your snapshot resource, this field is visible only if it has a non-empty value. |
| `creationSizeBytes` | string (int64) | Output only. \[Output Only\] Size in bytes of the snapshot at creation time. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `diskSizeGb` | string (int64) | Output only. \[Output Only\] Size of the source disk, specified in GB. |
| `downloadBytes` | string (int64) | Output only. \[Output Only\] Number of bytes downloaded to restore a snapshot to a disk. |
| `enableConfidentialCompute` | boolean | Output only. Whether this snapshot is created from a confidential compute mode disk. \[Output Only\]: This field is not set by user, but from source disk. |
| `guestFlush` | boolean | \[Input Only\] Whether to attempt an application consistent snapshot by informing the OS to prepare for the snapshot process. |
| `guestOsFeatures` | array<GuestOsFeature> | Output only. \[Output Only\] A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#snapshot for Snapshot resources. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this snapshot, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a snapshot. |
| `labels` | object | Labels to apply to this snapshot. These can be later modified by the setLabels method. Label values may be empty. |
| `licenseCodes` | array<string> | Output only. \[Output Only\] Integer license codes indicating which licenses are attached to this snapshot. |
| `licenses` | array<string> | Output only. \[Output Only\] A list of public visible licenses that apply to this snapshot. This can be because the original image had licenses attached (such as a Windows image). |
| `locationHint` | string | An opaque location hint used to place the snapshot close to other resources. This field is for use by internal tools that use the public API. |
| `maxRetentionDays` | integer (int32) | Number of days the snapshot should be retained before being deleted automatically. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | SnapshotParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | Output only. \[Output Only\] URL of the region where the snapshot resides. Only applicable for regional snapshots. |
| `resourceStatus` | SnapshotResourceStatus | Output only. \[Output only\] ResourceStatus of the Snapshot resource |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `snapshotEncryptionKey` | CustomerEncryptionKey | Encrypts the snapshot using acustomer-supplied encryption key. After you encrypt a snapshot using a customer-supplied key, you must provide the same key if you use the snapshot later. For example, you must provide the encryption key when you create a disk from the encrypted snapshot in a future request. Customer-supplied encryption keys do not protect access to metadata of the snapshot. If you do not provide an encryption key when creating the snapshot, then the snapshot will be encrypted using an automatically generated key and you do not need to provide a key to use the snapshot later. |
| `snapshotGroupId` | string | Output only. \[Output Only\] The unique ID of the snapshot group that this snapshot belongs to. The usage of snapshot group feature is restricted. |
| `snapshotGroupName` | string | Output only. \[Output only\] The snapshot group that this snapshot belongs to. The usage of snapshot group feature is restricted. |
| `snapshotType` | string enum | Indicates the type of the snapshot. Valid values are ARCHIVE or STANDARD. The default is STANDARD. Values: `ARCHIVE`, `STANDARD`. |
| `sourceDisk` | string | The source disk used to create this snapshot. |
| `sourceDiskEncryptionKey` | CustomerEncryptionKey | The customer-supplied encryption key of the source disk. Required if the source disk is protected by a customer-supplied encryption key. |
| `sourceDiskForRecoveryCheckpoint` | string | The source disk whose recovery checkpoint will be used to create this snapshot. |
| `sourceDiskId` | string | Output only. \[Output Only\] The ID value of the disk used to create this snapshot. This value may be used to determine whether the snapshot was taken from the current or a previous instance of a given disk name. |
| `sourceInstantSnapshot` | string | The source instant snapshot used to create this snapshot. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instantSnapshots/instantSnapshot - projects/project/zones/zone/instantSnapshots/instantSnapshot - zones/zone/instantSnapshots/instantSnapshot |
| `sourceInstantSnapshotEncryptionKey` | CustomerEncryptionKey | Customer provided encryption key when creating Snapshot from Instant Snapshot. |
| `sourceInstantSnapshotId` | string | Output only. \[Output Only\] The unique ID of the instant snapshot used to create this snapshot. This value identifies the exact instant snapshot that was used to create this snapshot. For example, if you created the snapshot from an instant snapshot that was later deleted and recreated under the same name, the source instant snapshot ID would identify the exact instant snapshot that was used. |
| `sourceSnapshotSchedulePolicy` | string | Output only. \[Output Only\] URL of the resource policy which created this scheduled snapshot. |
| `sourceSnapshotSchedulePolicyId` | string | Output only. \[Output Only\] ID of the resource policy which created this scheduled snapshot. |
| `status` | string enum | Output only. \[Output Only\] The status of the snapshot. This can beCREATING, DELETING, FAILED,READY, or UPLOADING. Values: `CREATING`, `DELETING`, `FAILED`, `READY`, `UPLOADING`. |
| `storageBytes` | string (int64) | Output only. \[Output Only\] A size of the storage used by the snapshot. As snapshots share storage, this number is expected to change with snapshot creation/deletion. |
| `storageBytesStatus` | string enum | Output only. \[Deprecated\] Instead, check the storageBytes field. After snapshot creation, the storageBytesStatus field is alwaysUP_TO_DATE. \[Output Only\] An indicator whether storageBytes is in a stable state or it is being adjusted as a result of shared storage reallocation. This status can either be unset, meaning the snapshot is being created, or UP_TO_DATE, meaning the size of the snapshot is up-to-date. Values: `UPDATING`, `UP_TO_DATE`. |
| `storageLocations` | array<string> | Cloud Storage bucket storage location of the snapshot (regional or multi-regional). |

### `SnapshotAggregatedList`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of SnapshotsScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#snapshotAggregatedList for aggregated lists of snapshots. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `SnapshotGroup`

- Represents a SnapshotGroup resource. A snapshot group is a set of snapshots that represents a point in time state of a consistency group.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | Optional. An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#snapshotGroup for SnapshotGroup resources. |
| `name` | string | Identifier. Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `sourceInfo` | SnapshotGroupSourceInfo | Output only. \[Output Only\] |
| `sourceInstantSnapshotGroup` | string | Input field for the source instant snapshot group. |
| `sourceInstantSnapshotGroupInfo` | SnapshotGroupSourceInstantSnapshotGroupInfo | Output only. \[Output Only\] |
| `status` | string enum | Output only. \[Output Only\] Values: `CREATING`, `DELETING`, `FAILED`, `INVALID`, `READY`, `UNKNOWN`, `UPLOADING`. |

### `SnapshotGroupParameters`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `replicaZones` | array<string> | URLs of the zones where disks should be replicated to. Only applicable for regional resources. |
| `sourceSnapshotGroup` | string | The source snapshot group used to create disks. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/global/snapshotGroups/snapshotGroup - projects/project/global/snapshotGroups/snapshotGroup - global/snapshotGroups/snapshotGroup |
| `type` | string | URL of the disk type resource describing which disk type to use to create disks. Provide this when creating the disk. For example:projects/project/zones/zone/diskTypes/pd-ssd. See Persistent disk types. |

### `SnapshotGroupSourceInfo`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `consistencyGroup` | string | — |
| `consistencyGroupId` | string | — |

### `SnapshotGroupSourceInstantSnapshotGroupInfo`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `instantSnapshotGroup` | string | — |
| `instantSnapshotGroupId` | string | — |

### `SnapshotList`

- Contains a list of Snapshot resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Snapshot> | A list of Snapshot resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `SnapshotParams`

- Additional snapshot params.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the snapshot. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |

### `SnapshotRecycleBinPolicy`

- Represents the singleton resource Snapshot Recycle Bin Policy that configures the retention duration for snapshots in the recycle bin. You can configure the retention duration for snapshots in the recycle bin at the project or organization level. If you configure the policy at the organization level, all projects in that organization will share the same policy. If you configure the policy at the project level it will be merged with org level policy (if any) and the snapshots in that project will use that policy.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `rules` | object | The rules for the snapshot recycle bin policy. The key is either 'default' or namespacedName of the TagValue which can be in the format: `{organization_id}/{tag_key_short_name}/{tag_value_short_name}` or `{project_id}/{tag_key_short_name}/{tag_value_short_name}` or `{project_number}/{tag_key_short_name}/{tag_value_short_name}`. The default rule is applied if snapshots do not have any of these tags. The value is the rule for the key. |
| `systemRules` | object | Output only. The system rules for snapshot recycle bin policy. Defines the default rule that applies if no customer-defined rule matches. |

### `SnapshotRecycleBinPolicyRule`

- A rule that defines the retention policy for snapshots in the recycle bin.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `standardSnapshots` | SnapshotRecycleBinPolicyRuleRuleConfig | The rule config for standard snapshots. |

### `SnapshotRecycleBinPolicyRuleRuleConfig`

- The rule config for snapshots in the recycle bin.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `retentionDurationDays` | string (int64) | The retention duration for snapshots in the recycle bin after which the snapshots are automatically deleted from recycle bin. |

### `SnapshotResourceStatus`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `scheduledDeletionTime` | string (google-datetime) | Output only. \[Output only\] Scheduled deletion time of the snapshot. The snapshot will be deleted by the at any point within one hour after the deletion time. |

### `SnapshotSettings`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLocation` | SnapshotSettingsAccessLocation | (Regional snapshots use only)Policy of which location is allowed to access snapshot. |
| `storageLocation` | SnapshotSettingsStorageLocationSettings | Policy of which storage location is going to be resolved, and additional data that particularizes how the policy is going to be carried out. |

### `SnapshotSettingsAccessLocation`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | object | List of regions that can restore a regional snapshot from the current region |
| `policy` | string enum | Policy of which location is allowed to access snapshot. Values: `ALL_REGIONS`, `POLICY_UNSPECIFIED`, `SPECIFIC_REGIONS`. |

### `SnapshotSettingsAccessLocationAccessLocationPreference`

- A structure for specifying an allowed target region.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `region` | string | Accessible region name |

### `SnapshotSettingsStorageLocationSettings`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | object | When the policy is SPECIFIC_LOCATIONS, snapshots will be stored in the locations listed in this field. Keys are Cloud Storage bucket locations. Only one location can be specified. |
| `policy` | string enum | The chosen location policy. Values: `LOCAL_REGION`, `NEAREST_MULTI_REGION`, `SPECIFIC_LOCATIONS`, `STORAGE_LOCATION_POLICY_UNSPECIFIED`. |

### `SnapshotSettingsStorageLocationSettingsStorageLocationPreference`

- A structure for specifying storage locations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the location. It should be one of the Cloud Storage buckets. Only one location can be specified. |

### `SnapshotUpdateKmsKeyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. The new KMS key to replace the current one on the snapshot. If empty, the snapshot will be re-encrypted using the primary version of the snapshot's current KMS key. The KMS key can be provided in the following formats: - projects/project_id/locations/region/keyRings/key_ring/cryptoKeys/key |

### `SnapshotsGetEffectiveRecycleBinRuleResponse`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `retentionDurationDays` | string (int64) | The retention duration of the snapshot in recycle bin. |

### `SnapshotsScopedList`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `snapshots` | array<Snapshot> | \[Output Only\] A list of snapshots contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of snapshots when the list is empty. |

### `SourceDiskEncryptionKey`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source disk. Required if the source disk is protected by a customer-supplied encryption key. |
| `sourceDisk` | string | URL of the disk attached to the source instance. This can be a full or valid partial URL. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - projects/project/zones/zone/disks/disk - zones/zone/disks/disk |

### `SourceInstanceParams`

- A specification of the parameters to use when creating the instance template from a source instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskConfigs` | array<DiskInstantiationConfig> | Attached disks configuration. If not provided, defaults are applied: For boot disk and any other R/W disks, the source images for each disk will be used. For read-only disks, they will be attached in read-only mode. Local SSD disks will be created as blank volumes. |

### `SourceInstanceProperties`

- DEPRECATED: Please use compute#instanceProperties instead. New properties will not be added to this field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canIpForward` | boolean | Enables instances created based on this machine image to send packets with source IP addresses other than their own and receive packets with destination IP addresses other than their own. If these instances will be used as an IP gateway or it will be set as the next-hop in a Route resource, specify true. If unsure, leave this set tofalse. See theEnable IP forwarding documentation for more information. |
| `deletionProtection` | boolean | Whether the instance created from this machine image should be protected against deletion. |
| `description` | string | An optional text description for the instances that are created from this machine image. |
| `disks` | array<SavedAttachedDisk> | An array of disks that are associated with the instances that are created from this machine image. |
| `guestAccelerators` | array<AcceleratorConfig> | A list of guest accelerator cards' type and count to use for instances created from this machine image. |
| `keyRevocationActionType` | string enum | KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified. Values: `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `NONE`, `STOP`. |
| `labels` | object | Labels to apply to instances that are created from this machine image. |
| `machineType` | string | The machine type to use for instances that are created from this machine image. |
| `metadata` | Metadata | The metadata key/value pairs to assign to instances that are created from this machine image. These pairs can consist of custom metadata or predefined keys. SeeProject and instance metadata for more information. |
| `minCpuPlatform` | string | Minimum cpu/platform to be used by instances created from this machine image. The instance may be scheduled on the specified or newer cpu/platform. Applicable values are the friendly names of CPU platforms, such as minCpuPlatform: "Intel Haswell" orminCpuPlatform: "Intel Sandy Bridge". For more information, read Specifying a Minimum CPU Platform. |
| `networkInterfaces` | array<NetworkInterface> | An array of network access configurations for this interface. |
| `postKeyRevocationActionType` | string enum | PostKeyRevocationActionType of the instance. Values: `NOOP`, `POST_KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED`, `SHUTDOWN`. |
| `scheduling` | Scheduling | Specifies the scheduling options for the instances that are created from this machine image. |
| `serviceAccounts` | array<ServiceAccount> | A list of service accounts with specified scopes. Access tokens for these service accounts are available to the instances that are created from this machine image. Use metadata queries to obtain the access tokens for these instances. |
| `tags` | Tags | A list of tags to apply to the instances that are created from this machine image. The tags identify valid sources or targets for network firewalls. The setTags method can modify this list of tags. Each tag within the list must comply withRFC1035. |

### `SslCertificate`

- Represents an SSL certificate resource. Google Compute Engine has two SSL certificate resources: \* Global \* Regional The global SSL certificates (sslCertificates) are used by: - Global external Application Load Balancers - Classic Application Load Balancers - Proxy Network Load Balancers (with target SSL proxies) The regional SSL certificates (regionSslCertificates) are used by: - Regional external Application Load Balancers - Regional internal Application Load Balancers Optionally, certificate file contents that you upload can contain a set of up to five PEM-encoded certificates. The API call creates an object (sslCertificate) that holds this data. You can use SSL keys and certificates to secure connections to a load balancer. For more information, read Creating and using SSL certificates,SSL certificates quotas and limits, and Troubleshooting SSL certificates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificate` | string | A value read into memory from a certificate file. The certificate file must be in PEM format. The certificate chain must be no greater than 5 certs long. The chain must include at least one intermediate cert. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `expireTime` | string | Output only. \[Output Only\] Expire time of the certificate. RFC3339 |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#sslCertificate for SSL certificates. |
| `managed` | SslCertificateManagedSslCertificate | Configuration and status of a managed SSL certificate. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `privateKey` | string | A value read into memory from a write-only private key file. The private key file must be in PEM format. For security, only insert requests include this field. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional SSL Certificate resides. This field is not applicable to global SSL Certificate. |
| `selfLink` | string | \[Output only\] Server-defined URL for the resource. |
| `selfManaged` | SslCertificateSelfManagedSslCertificate | Configuration and status of a self-managed SSL certificate. |
| `subjectAlternativeNames` | array<string> | Output only. \[Output Only\] Domains associated with the certificate via Subject Alternative Name. |
| `type` | string enum | (Optional) Specifies the type of SSL certificate, either "SELF_MANAGED" or "MANAGED". If not specified, the certificate is self-managed and the fieldscertificate and private_key are used. Values: `MANAGED`, `SELF_MANAGED`, `TYPE_UNSPECIFIED`. |

### `SslCertificate` (alpha)

- Represents an SSL certificate resource. Google Compute Engine has two SSL certificate resources: \* Global \* Regional The global SSL certificates (sslCertificates) are used by: - Global external Application Load Balancers - Classic Application Load Balancers - Proxy Network Load Balancers (with target SSL proxies) The regional SSL certificates (regionSslCertificates) are used by: - Regional external Application Load Balancers - Regional internal Application Load Balancers Optionally, certificate file contents that you upload can contain a set of up to five PEM-encoded certificates. The API call creates an object (sslCertificate) that holds this data. You can use SSL keys and certificates to secure connections to a load balancer. For more information, read Creating and using SSL certificates,SSL certificates quotas and limits, and Troubleshooting SSL certificates.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `certificate` | string | A value read into memory from a certificate file. The certificate file must be in PEM format. The certificate chain must be no greater than 5 certs long. The chain must include at least one intermediate cert. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `expireTime` | string | Output only. \[Output Only\] Expire time of the certificate. RFC3339 |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#sslCertificate for SSL certificates. |
| `managed` | SslCertificateManagedSslCertificate | Configuration and status of a managed SSL certificate. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `privateKey` | string | A value read into memory from a write-only private key file. The private key file must be in PEM format. For security, only insert requests include this field. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional SSL Certificate resides. This field is not applicable to global SSL Certificate. |
| `selfLink` | string | \[Output only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `selfManaged` | SslCertificateSelfManagedSslCertificate | Configuration and status of a self-managed SSL certificate. |
| `subjectAlternativeNames` | array<string> | Output only. \[Output Only\] Domains associated with the certificate via Subject Alternative Name. |
| `type` | string enum | (Optional) Specifies the type of SSL certificate, either "SELF_MANAGED" or "MANAGED". If not specified, the certificate is self-managed and the fieldscertificate and private_key are used. Values: `MANAGED`, `SELF_MANAGED`, `TYPE_UNSPECIFIED`. |

### `SslCertificateAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of SslCertificatesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#sslCertificateAggregatedList for lists of SSL Certificates. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `SslCertificateList`

- Contains a list of SslCertificate resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<SslCertificate> | A list of SslCertificate resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `SslCertificateManagedSslCertificate`

- Configuration and status of a managed SSL certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domainStatus` | object | Output only. \[Output only\] Detailed statuses of the domains specified for managed certificate resource. |
| `domains` | array<string> | The domains for which a managed SSL certificate will be generated. Each Google-managed SSL certificate supports up to the maximum number of domains per Google-managed SSL certificate. |
| `status` | string enum | Output only. \[Output only\] Status of the managed certificate resource. Values: `ACTIVE`, `MANAGED_CERTIFICATE_STATUS_UNSPECIFIED`, `PROVISIONING`, `PROVISIONING_FAILED`, `PROVISIONING_FAILED_PERMANENTLY`, `RENEWAL_FAILED`. |

### `SslCertificateSelfManagedSslCertificate`

- Configuration and status of a self-managed SSL certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificate` | string | A local certificate file. The certificate must be in PEM format. The certificate chain must be no greater than 5 certs long. The chain must include at least one intermediate cert. |
| `privateKey` | string | A write-only private key in PEM format. Only insert requests will include this field. |

### `SslCertificateSelfManagedSslCertificate` (preview)

- Configuration and status of a self-managed SSL certificate.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `certificate` | string | A local certificate file. The certificate must be in PEM format. The certificate chain must be no greater than 5 certs long. The chain must include at least one intermediate cert. |
| `encryptedPemPrivateKey` | string (byte) | A value read into memory from a write-only private key file whose contents have been encrypted using the appropriate HPKE key distributed by Google. The underlying plaintext MUST be a PEM format private key. For security, only insert requests include this field. Exactly one of privateKey or encryptedPemPrivateKey MUST be specified when creating a self-managed certificate. |
| `privateKey` | string | A write-only private key in PEM format. Only insert requests will include this field. |

### `SslCertificatesFetchEncryptionKeyResponse`

- Response for `SslCertificatesService.FetchEncryptionKey` and `RegionSslCertificatesService.FetchEncryptionKey` methods.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `publicKeyset` | string | The Tink public keyset serialized in JSON format. |

### `SslCertificatesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sslCertificates` | array<SslCertificate> | List of SslCertificates contained in this scope. |
| `warning` | object | Informational warning which replaces the list of backend services when the list is empty. |

### `SslPoliciesAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of SslPoliciesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#sslPolicyAggregatedList for lists of SSL Policies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `SslPoliciesList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<SslPolicy> | Output only. A list of SslPolicy resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#sslPoliciesList for lists of sslPolicies. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `SslPoliciesListAvailableFeaturesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `features` | array<string> | — |

### `SslPoliciesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sslPolicies` | array<SslPolicy> | A list of SslPolicies contained in this scope. |
| `warning` | object | Informational warning which replaces the list of SSL policies when the list is empty. |

### `SslPolicy`

- Represents an SSL Policy resource. Use SSL policies to control SSL features, such as versions and cipher suites, that are offered by Application Load Balancers and proxy Network Load Balancers. For more information, read SSL policies overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `customFeatures` | array<string> | A list of features enabled when the selected profile is CUSTOM. The method returns the set of features that can be specified in this list. This field must be empty if the profile is notCUSTOM. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `enabledFeatures` | array<string> | Output only. \[Output Only\] The list of features enabled in the SSL policy. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a SslPolicy. An up-to-date fingerprint must be provided in order to update the SslPolicy, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an SslPolicy. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#sslPolicyfor SSL policies. |
| `minTlsVersion` | string enum | The minimum version of SSL protocol that can be used by the clients to establish a connection with the load balancer. This can be one ofTLS_1_0, TLS_1_1, TLS_1_2,TLS_1_3. When set to TLS_1_3, the profile field must be set to RESTRICTED. Values: `TLS_1_0`, `TLS_1_1`, `TLS_1_2`, `TLS_1_3`. |
| `name` | string | Name of the resource. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `postQuantumKeyExchange` | string enum | One of DEFAULT, ENABLED, orDEFERRED. Controls whether the load balancer negotiates X25519MLKEM768 key exchange when clients advertise support for it. When set to DEFAULT, or if no SSL Policy is attached to the target proxy, the load balancer disallows X25519MLKEM768 key exchange before October 2026, and allows it afterward. When set to ENABLED, the load balancer allows X25519MLKEM768 key exchange. When set toDEFERRED, the load balancer disallows X25519MLKEM768 key exchange until October 2027, and allows it afterward. Values: `DEFAULT`, `DEFERRED`, `ENABLED`. |
| `profile` | string enum | Profile specifies the set of SSL features that can be used by the load balancer when negotiating SSL with clients. This can be one ofCOMPATIBLE, MODERN, RESTRICTED,FIPS_202205, or CUSTOM. If usingCUSTOM, the set of SSL features to enable must be specified in the customFeatures field. If using FIPS_202205, the min_tls_version field must be set to TLS_1_2. Values: `COMPATIBLE`, `CUSTOM`, `FIPS_202205`, `MODERN`, `RESTRICTED`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional SSL policy resides. This field is not applicable to global SSL policies. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `warnings` | array<object> | Output only. \[Output Only\] If potential misconfigurations are detected for this SSL policy, this field will be populated with warning messages. |

### `SslPolicy` (alpha)

- Represents an SSL Policy resource. Use SSL policies to control SSL features, such as versions and cipher suites, that are offered by Application Load Balancers and proxy Network Load Balancers. For more information, read SSL policies overview.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `customFeatures` | array<string> | A list of features enabled when the selected profile is CUSTOM. The method returns the set of features that can be specified in this list. This field must be empty if the profile is notCUSTOM. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `enabledFeatures` | array<string> | Output only. \[Output Only\] The list of features enabled in the SSL policy. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a SslPolicy. An up-to-date fingerprint must be provided in order to update the SslPolicy, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an SslPolicy. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#sslPolicyfor SSL policies. |
| `minTlsVersion` | string enum | The minimum version of SSL protocol that can be used by the clients to establish a connection with the load balancer. This can be one ofTLS_1_0, TLS_1_1, TLS_1_2,TLS_1_3. When set to TLS_1_3, the profile field must be set to RESTRICTED. Values: `TLS_1_0`, `TLS_1_1`, `TLS_1_2`, `TLS_1_3`. |
| `name` | string | Name of the resource. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `postQuantumKeyExchange` | string enum | One of DEFAULT, ENABLED, orDEFERRED. Controls whether the load balancer negotiates X25519MLKEM768 key exchange when clients advertise support for it. When set to DEFAULT, or if no SSL Policy is attached to the target proxy, the load balancer disallows X25519MLKEM768 key exchange before October 2026, and allows it afterward. When set to ENABLED, the load balancer allows X25519MLKEM768 key exchange. When set toDEFERRED, the load balancer disallows X25519MLKEM768 key exchange until October 2027, and allows it afterward. Values: `DEFAULT`, `DEFERRED`, `ENABLED`. |
| `profile` | string enum | Profile specifies the set of SSL features that can be used by the load balancer when negotiating SSL with clients. This can be one ofCOMPATIBLE, MODERN, RESTRICTED,FIPS_202205, or CUSTOM. If usingCUSTOM, the set of SSL features to enable must be specified in the customFeatures field. If using FIPS_202205, the min_tls_version field must be set to TLS_1_2. Values: `COMPATIBLE`, `CUSTOM`, `FIPS_202205`, `MODERN`, `RESTRICTED`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional SSL policy resides. This field is not applicable to global SSL policies. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `tlsSettings` | ServerTlsSettings | Security settings for the proxy. This field is only applicable to a global backend service with the loadBalancingScheme set toINTERNAL_SELF_MANAGED. |
| `warnings` | array<object> | Output only. \[Output Only\] If potential misconfigurations are detected for this SSL policy, this field will be populated with warning messages. |

### `SslPolicyReference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sslPolicy` | string | — |

### `StatefulPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `preservedState` | StatefulPolicyPreservedState | — |

### `StatefulPolicyPreservedState`

- Configuration of preserved resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disks` | object | Disks created on the instances that will be preserved on instance delete, update, etc. This map is keyed with the device names of the disks. |
| `externalIPs` | object | External network IPs assigned to the instances that will be preserved on instance delete, update, etc. This map is keyed with the network interface name. |
| `internalIPs` | object | Internal network IPs assigned to the instances that will be preserved on instance delete, update, etc. This map is keyed with the network interface name. |

### `StatefulPolicyPreservedStateDiskDevice`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoDelete` | string enum | These stateful disks will never be deleted during autohealing, update or VM instance recreate operations. This flag is used to configure if the disk should be deleted after it is no longer used by the group, e.g. when the given instance or the whole group is deleted. Note: disks attached inREAD_ONLY mode cannot be auto-deleted. Values: `NEVER`, `ON_PERMANENT_INSTANCE_DELETION`. |

### `StatefulPolicyPreservedStateNetworkIp`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoDelete` | string enum | These stateful IPs will never be released during autohealing, update or VM instance recreate operations. This flag is used to configure if the IP reservation should be deleted after it is no longer used by the group, e.g. when the given instance or the whole group is deleted. Values: `NEVER`, `ON_PERMANENT_INSTANCE_DELETION`. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StoragePool`

- Represents a zonal storage pool resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `capacityProvisioningType` | string enum | Provisioning type of the byte capacity of the pool. Values: `ADVANCED`, `STANDARD`, `UNSPECIFIED`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `exapoolProvisionedCapacityGb` | StoragePoolExapoolProvisionedCapacityGb | Provisioned capacities for each SKU for this Exapool in GiB |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#storagePool for storage pools. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this storage pool, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a storage pool. |
| `labels` | object | Labels to apply to this storage pool. These can be later modified by the setLabels method. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | StoragePoolParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `performanceProvisioningType` | string enum | Provisioning type of the performance-related parameters of the pool, such as throughput and IOPS. Values: `ADVANCED`, `STANDARD`, `UNSPECIFIED`. |
| `poolProvisionedCapacityGb` | string (int64) | Size of the storage pool in GiB. For more information about the size limits, see https://cloud.google.com/compute/docs/disks/storage-pools. |
| `poolProvisionedIops` | string (int64) | Provisioned IOPS of the storage pool. Only relevant if the storage pool type is hyperdisk-balanced. |
| `poolProvisionedThroughput` | string (int64) | Provisioned throughput of the storage pool in MiB/s. Only relevant if the storage pool type is hyperdisk-balanced or hyperdisk-throughput. |
| `resourceStatus` | StoragePoolResourceStatus | Output only. \[Output Only\] Status information for the storage pool resource. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `shareSettings` | StoragePoolShareSettings | Share settings for the storage pool. |
| `state` | string enum | Output only. \[Output Only\] The status of storage pool creation. - CREATING: Storage pool is provisioning. storagePool. - FAILED: Storage pool creation failed. - READY: Storage pool is ready for use. - DELETING: Storage pool is deleting. Values: `CREATING`, `DELETING`, `FAILED`, `READY`. |
| `status` | StoragePoolResourceStatus | Output only. \[Output Only\] Status information for the storage pool resource. |
| `storagePoolType` | string | Type of the storage pool. |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the storage pool resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `StoragePool` (alpha)

- Represents a zonal storage pool resource.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `capacityProvisioningType` | string enum | Provisioning type of the byte capacity of the pool. Values: `ADVANCED`, `STANDARD`, `UNSPECIFIED`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `exapoolProvisionedCapacityGb` | StoragePoolExapoolProvisionedCapacityGb | Provisioned capacities for each SKU for this Exapool in GiB |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#storagePool for storage pools. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this storage pool, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a storage pool. |
| `labels` | object | Labels to apply to this storage pool. These can be later modified by the setLabels method. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | StoragePoolParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `performanceProvisioningType` | string enum | Provisioning type of the performance-related parameters of the pool, such as throughput and IOPS. Values: `ADVANCED`, `STANDARD`, `UNSPECIFIED`. |
| `poolProvisionedCapacityGb` | string (int64) | Size of the storage pool in GiB. For more information about the size limits, see https://cloud.google.com/compute/docs/disks/storage-pools. |
| `poolProvisionedIops` | string (int64) | Provisioned IOPS of the storage pool. Only relevant if the storage pool type is hyperdisk-balanced. |
| `poolProvisionedThroughput` | string (int64) | Provisioned throughput of the storage pool in MiB/s. Only relevant if the storage pool type is hyperdisk-balanced or hyperdisk-throughput. |
| `provisionedIops` | string (int64) | DEPRECATED -- use "pool provisioned IOPS". |
| `provisionedThroughput` | string (int64) | DEPRECATED -- use "pool provisioned throughput". |
| `resourceStatus` | StoragePoolResourceStatus | Output only. \[Output Only\] Status information for the storage pool resource. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `shareSettings` | StoragePoolShareSettings | Share settings for the storage pool. |
| `sizeGb` | string (int64) | DEPRECATED -- use "pool provisioned capacity gb". |
| `state` | string enum | Output only. \[Output Only\] The status of storage pool creation. - CREATING: Storage pool is provisioning. storagePool. - FAILED: Storage pool creation failed. - READY: Storage pool is ready for use. - DELETING: Storage pool is deleting. Values: `CREATING`, `DELETING`, `FAILED`, `READY`. |
| `status` | StoragePoolResourceStatus | Output only. \[Output Only\] Status information for the storage pool resource. |
| `storagePoolType` | string | Type of the storage pool. |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the storage pool resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `StoragePoolAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of StoragePoolsScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#storagePoolAggregatedList for aggregated lists of storage pools. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `StoragePoolDisk`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachedInstances` | array<string> | Output only. \[Output Only\] Instances this disk is attached to. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `disk` | string | Output only. \[Output Only\] The URL of the disk. |
| `name` | string | Output only. \[Output Only\] The name of the disk. |
| `provisionedIops` | string (int64) | Output only. \[Output Only\] The number of IOPS provisioned for the disk. |
| `provisionedThroughput` | string (int64) | Output only. \[Output Only\] The throughput provisioned for the disk. |
| `resourcePolicies` | array<string> | Output only. \[Output Only\] Resource policies applied to disk for automatic snapshot creations. |
| `sizeGb` | string (int64) | Output only. \[Output Only\] The disk size, in GB. |
| `status` | string enum | Output only. \[Output Only\] The disk status. Values: `CREATING`, `DELETING`, `FAILED`, `READY`, `RESTORING`, `UNAVAILABLE`. |
| `type` | string | Output only. \[Output Only\] The disk type. |
| `usedBytes` | string (int64) | Output only. \[Output Only\] Amount of disk space used. |

### `StoragePoolExapoolProvisionedCapacityGb`

- Exapool provisioned capacities for each SKU type
- Version: v1

| Field | Type | Description |
|---|---|---|
| `capacityOptimized` | string (int64) | Size, in GiB, of provisioned capacity-optimized capacity for this Exapool |
| `readOptimized` | string (int64) | Size, in GiB, of provisioned read-optimized capacity for this Exapool |
| `writeOptimized` | string (int64) | Size, in GiB, of provisioned write-optimized capacity for this Exapool |

### `StoragePoolList`

- A list of StoragePool resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<StoragePool> | A list of StoragePool resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#storagePoolList for lists of storagePools. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `StoragePoolListDisks`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | Output only. \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<StoragePoolDisk> | A list of StoragePoolDisk resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#storagePoolListDisks for lists of disks in a storagePool. |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | Output only. \[Output Only\] Informational warning message. |

### `StoragePoolParams`

- Additional storage pool params.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the storage pool. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |

### `StoragePoolResourceStatus`

- \[Output Only\] Contains output only fields.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskCount` | string (int64) | \[Output Only\] Number of disks used. |
| `exapoolMaxReadIops` | string (int64) | Output only. \[Output Only\] Maximum allowed read IOPS for this Exapool. |
| `exapoolMaxReadThroughput` | string (int64) | Output only. \[Output Only\] Maximum allowed read throughput in MiB/s for this Exapool. |
| `exapoolMaxWriteIops` | string (int64) | Output only. \[Output Only\] Maximum allowed write IOPS for this Exapool. |
| `exapoolMaxWriteThroughput` | string (int64) | Output only. \[Output Only\] Maximum allowed write throughput in MiB/s for this Exapool. |
| `lastResizeTimestamp` | string | Output only. \[Output Only\] Timestamp of the last successful resize inRFC3339 text format. |
| `maxTotalProvisionedDiskCapacityGb` | string (int64) | \[Output Only\] Maximum allowed aggregate disk size in GiB. |
| `poolUsedCapacityBytes` | string (int64) | \[Output Only\] Space used by data stored in disks within the storage pool (in bytes). This will reflect the total number of bytes written to the disks in the pool, in contrast to the capacity of those disks. |
| `poolUsedIops` | string (int64) | \[Output Only\] Sum of all the disks' provisioned IOPS, minus some amount that is allowed per disk that is not counted towards pool's IOPS capacity. For more information, see https://cloud.google.com/compute/docs/disks/storage-pools. |
| `poolUsedThroughput` | string (int64) | \[Output Only\] Sum of all the disks' provisioned throughput in MiB/s. |
| `poolUserWrittenBytes` | string (int64) | \[Output Only\] Amount of data written into the pool, before it is compacted. |
| `totalProvisionedDiskCapacityGb` | string (int64) | \[Output Only\] Sum of all the disks' provisioned capacity (in GiB) in this storage pool. A disk's provisioned capacity is the same as its total capacity. |
| `totalProvisionedDiskIops` | string (int64) | \[Output Only\] Sum of all the disks' provisioned IOPS. |
| `totalProvisionedDiskThroughput` | string (int64) | \[Output Only\] Sum of all the disks' provisioned throughput in MiB/s, minus some amount that is allowed per disk that is not counted towards pool's throughput capacity. |

### Shape of `SecurityPolicyCloudArmorConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "enableMl": "boolean"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
