---
source: https://networksecurity.googleapis.com/$discovery/rest?version=v1
---

# Network Security API message schemas (networksecurity) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/networksecurity/`.

### `SACRealmSACRealmSymantecOptions`

- Fields specific to realms using Symantec Cloud SWG.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `availableSymantecSites` | array<string> | Output only. Symantec site IDs which the user can choose to connect to. |
| `secretPath` | string | Optional. API Key used to call Symantec APIs on the user's behalf. Required if using Symantec Cloud SWG. P4SA account needs permissions granted to read this secret. A secret ID, secret name, or secret URI can be specified, but it will be parsed and stored as a secret URI in the form `projects/{project_number}/secrets/my-secret`. |
| `symantecConnectionState` | string enum | Output only. Connection status to Symantec API. Values: `SYMANTEC_CONNECTION_STATE_UNSPECIFIED`, `SUCCEEDED`, `READ_SECRET_FAILED`, `REQUEST_TO_SYMANTEC_FAILED`, `UNAVAILABLE_FOR_HISTORICAL_REQUESTS`. |

### `SecurityProfile`

- A resource that defines the behavior for one of many `ProfileType` values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Resource creation timestamp. |
| `customInterceptProfile` | CustomInterceptProfile | The custom network security in-band integration configuration for the `SecurityProfile`. |
| `customMirroringProfile` | CustomMirroringProfile | The custom network security out-of-band integration configuration for the `SecurityProfile`. |
| `description` | string | Optional. An optional description of the profile. The maximum length is 512 characters. |
| `etag` | string | Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. Labels as key-value pairs. |
| `name` | string | Immutable. Identifier. Name of the `SecurityProfile` resource. Format: `organizations/{organization}/locations/{location}/securityProfiles/{security_profile}` or `projects/{project}/locations/{location}/securityProfiles/{security_profile}`. |
| `threatPreventionProfile` | ThreatPreventionProfile | The threat prevention configuration for the `SecurityProfile`. |
| `type` | string enum | Immutable. The single `ProfileType` that the `SecurityProfile` resource configures. Values: `PROFILE_TYPE_UNSPECIFIED`, `THREAT_PREVENTION`, `CUSTOM_MIRRORING`, `CUSTOM_INTERCEPT`, `URL_FILTERING`, `WILDFIRE_ANALYSIS`. |
| `updateTime` | string (google-datetime) | Output only. Last resource update timestamp. |
| `urlFilteringProfile` | UrlFilteringProfile | The URL filtering configuration for the `SecurityProfile`. |
| `wildfireAnalysisProfile` | WildfireAnalysisProfile | The Advanced malware sandbox analysis configuration for the `SecurityProfile`. |

### `SecurityProfileGroup`

- A resource that defines the behavior for various `ProfileType` values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Resource creation timestamp. |
| `customInterceptProfile` | string | Optional. Reference to a `SecurityProfile` with the custom intercept configuration. |
| `customMirroringProfile` | string | Optional. Reference to a `SecurityProfile` with the custom mirroring configuration. |
| `dataPathId` | string (uint64) | Output only. Identifier used by the data path. Unique within `{container, location}`. |
| `description` | string | Optional. An optional description of the profile group. The maximum length is 2048 characters. |
| `etag` | string | Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. Labels as key-value pairs. |
| `name` | string | Immutable. Identifier. Name of the `SecurityProfileGroup` resource. Format: `organizations/{organization}/locations/{location}/securityProfileGroups/{security_profile_group}` or `projects/{project}/locations/{location}/securityProfileGroups/{security_profile_group}`. |
| `threatPreventionProfile` | string | Optional. Reference to a `SecurityProfile` with the threat prevention configuration. |
| `updateTime` | string (google-datetime) | Output only. Last resource update timestamp. |
| `urlFilteringProfile` | string | Optional. Reference to a `SecurityProfile` with the URL filtering configuration. |
| `wildfireAnalysisProfile` | string | Optional. Reference to a `SecurityProfile` with the Advanced malware sandbox (WildFire) configuration. |

### `ServerTlsPolicy`

- ServerTlsPolicy is a resource that specifies how a server should authenticate incoming requests. This resource itself does not affect configuration unless it is attached to a target HTTPS proxy or endpoint config selector resource. ServerTlsPolicy in the form accepted by Application Load Balancers can be attached only to TargetHttpsProxy with an `EXTERNAL`, `EXTERNAL_MANAGED` or `INTERNAL_MANAGED` load balancing scheme. Traffic Director compatible ServerTlsPolicies can be attached to EndpointPolicy and TargetHttpsProxy with Traffic Director `INTERNAL_SELF_MANAGED` load balancing scheme.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowOpen` | boolean | This field applies only for Traffic Director policies. It is must be set to false for Application Load Balancer policies. Determines if server allows plaintext connections. If set to true, server allows plain text connections. By default, it is set to false. This setting is not exclusive of other encryption modes. For example, if `allow_open` and `mtls_policy` are set, server allows both plain text and mTLS connections. See documentation of other encryption modes to confirm compatibility. Consider using it if you wish to upgrade in place your deployment to TLS while having mixed TLS and non-TLS traffic reaching port :80. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Free-text description of the resource. |
| `labels` | object | Set of label tags associated with the resource. |
| `mtlsPolicy` | MTLSPolicy | This field is required if the policy is used with Application Load Balancers. This field can be empty for Traffic Director. Defines a mechanism to provision peer validation certificates for peer to peer authentication (Mutual TLS - mTLS). If not specified, client certificate will not be requested. The connection is treated as TLS and not mTLS. If `allow_open` and `mtls_policy` are set, server allows both plain text and mTLS connections. |
| `name` | string | Required. Name of the ServerTlsPolicy resource. It matches the pattern `projects/*/locations/{location}/serverTlsPolicies/{server_tls_policy}` |
| `serverCertificate` | GoogleCloudNetworksecurityV1CertificateProvider | Optional if policy is to be used with Traffic Director. For Application Load Balancers must be empty. Defines a mechanism to provision server identity (public and private keys). Cannot be combined with `allow_open` as a permissive mode that allows both plain text and TLS is not supported. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `ServerTlsPolicy` (v1beta1)

- ServerTlsPolicy is a resource that specifies how a server should authenticate incoming requests. This resource itself does not affect configuration unless it is attached to a target HTTPS proxy or endpoint config selector resource. ServerTlsPolicy in the form accepted by Application Load Balancers can be attached only to TargetHttpsProxy with an `EXTERNAL`, `EXTERNAL_MANAGED` or `INTERNAL_MANAGED` load balancing scheme. Traffic Director compatible ServerTlsPolicies can be attached to EndpointPolicy and TargetHttpsProxy with Traffic Director `INTERNAL_SELF_MANAGED` load balancing scheme.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `allowOpen` | boolean | This field applies only for Traffic Director policies. It is must be set to false for Application Load Balancer policies. Determines if server allows plaintext connections. If set to true, server allows plain text connections. By default, it is set to false. This setting is not exclusive of other encryption modes. For example, if `allow_open` and `mtls_policy` are set, server allows both plain text and mTLS connections. See documentation of other encryption modes to confirm compatibility. Consider using it if you wish to upgrade in place your deployment to TLS while having mixed TLS and non-TLS traffic reaching port :80. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Free-text description of the resource. |
| `labels` | object | Set of label tags associated with the resource. |
| `mtlsPolicy` | MTLSPolicy | This field is required if the policy is used with Application Load Balancers. This field can be empty for Traffic Director. Defines a mechanism to provision peer validation certificates for peer to peer authentication (Mutual TLS - mTLS). If not specified, client certificate will not be requested. The connection is treated as TLS and not mTLS. If `allow_open` and `mtls_policy` are set, server allows both plain text and mTLS connections. |
| `name` | string | Required. Name of the ServerTlsPolicy resource. It matches the pattern `projects/*/locations/{location}/serverTlsPolicies/{server_tls_policy}` |
| `serverCertificate` | GoogleCloudNetworksecurityV1beta1CertificateProvider | Optional if policy is to be used with Traffic Director. For Application Load Balancers must be empty. Defines a mechanism to provision server identity (public and private keys). Cannot be combined with `allow_open` as a permissive mode that allows both plain text and TLS is not supported. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `SeverityOverride`

- Defines what action to take for a specific severity match.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Required. Threat action override. Values: `THREAT_ACTION_UNSPECIFIED`, `DEFAULT_ACTION`, `ALLOW`, `ALERT`, `DENY`. |
| `severity` | string enum | Required. Severity level to match. Values: `SEVERITY_UNSPECIFIED`, `INFORMATIONAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |

### `Source`

- Specification of traffic source attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipBlocks` | array<string> | Optional. List of CIDR ranges to match based on source IP address. At least one IP block should match. Single IP (e.g., "1.2.3.4") and CIDR (e.g., "1.2.3.0/24") are supported. Authorization based on source IP alone should be avoided. The IP addresses of any load balancers or proxies should be considered untrusted. |
| `principals` | array<string> | Optional. List of peer identities to match for authorization. At least one principal should match. Each peer can be an exact match, or a prefix match (example, "namespace/\*") or a suffix match (example, "\*/service-account") or a presence match "\*". Authorization based on the principal name without certificate validation (configured by ServerTlsPolicy resource) is considered insecure. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `ThreatOverride`

- Defines what action to take for a specific threat_id match.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Required. Threat action override. For some threat types, only a subset of actions applies. Values: `THREAT_ACTION_UNSPECIFIED`, `DEFAULT_ACTION`, `ALLOW`, `ALERT`, `DENY`. |
| `threatId` | string | Required. Vendor-specific ID of a threat to override. |
| `type` | string enum | Output only. Type of the threat (read only). Values: `THREAT_TYPE_UNSPECIFIED`, `UNKNOWN`, `VULNERABILITY`, `ANTIVIRUS`, `SPYWARE`, `DNS`. |

### `ThreatPreventionProfile`

- ThreatPreventionProfile defines an action for specific threat signatures or severity levels.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `antivirusOverrides` | array<AntivirusOverride> | Optional. Configuration for overriding antivirus actions per protocol. |
| `severityOverrides` | array<SeverityOverride> | Optional. Configuration for overriding threats actions by severity match. |
| `threatOverrides` | array<ThreatOverride> | Optional. Configuration for overriding threats actions by threat_id match. If a threat is matched both by configuration provided in severity_overrides and threat_overrides, the threat_overrides action is applied. |

### `TlsInspectionPolicy`

- The TlsInspectionPolicy resource contains references to CA pools in Certificate Authority Service and associated metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caPool` | string | Required. A CA pool resource used to issue interception certificates. The CA pool string has a relative resource path following the form "projects/{project}/locations/{location}/caPools/{ca_pool}". |
| `certificateIssuanceMode` | string enum | Optional. The mode used to issue certificates (local CA signing vs direct leaf). Values: `CERTIFICATE_ISSUANCE_MODE_UNSPECIFIED`, `DIRECT_LEAF_PROVISIONING`, `LOCAL_INTERMEDIATE_CA_SIGNING`. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `customTlsFeatures` | array<string> | Optional. List of custom TLS cipher suites selected. This field is valid only if the selected tls_feature_profile is CUSTOM. The compute.SslPoliciesService.ListAvailableFeatures method returns the set of features that can be specified in this list. Note that Secure Web Proxy does not yet honor this field. |
| `description` | string | Optional. Free-text description of the resource. |
| `excludePublicCaSet` | boolean | Optional. If FALSE (the default), use our default set of public CAs in addition to any CAs specified in trust_config. These public CAs are currently based on the Mozilla Root Program and are subject to change over time. If TRUE, do not accept our default set of public CAs. Only CAs specified in trust_config will be accepted. This defaults to FALSE (use public CAs in addition to trust_config) for backwards compatibility, but trusting public root CAs is \*not recommended\* unless the traffic in question is outbound to public web servers. When possible, prefer setting this to "false" and explicitly specifying trusted CAs and certificates in a TrustConfig. Note that Secure Web Proxy does not yet honor this field. |
| `minTlsVersion` | string enum | Optional. Minimum TLS version that the firewall should use when negotiating connections with both clients and servers. If this is not set, then the default value is to allow the broadest set of clients and servers (TLS 1.0 or higher). Setting this to more restrictive values may improve security, but may also prevent the firewall from connecting to some clients or servers. Note that Secure Web Proxy does not yet honor this field. Values: `TLS_VERSION_UNSPECIFIED`, `TLS_1_0`, `TLS_1_1`, `TLS_1_2`, `TLS_1_3`. |
| `name` | string | Required. Name of the resource. Name is of the form projects/{project}/locations/{location}/tlsInspectionPolicies/{tls_inspection_policy} tls_inspection_policy should match the pattern:(^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$). |
| `tlsFeatureProfile` | string enum | Optional. The selected Profile. If this is not set, then the default value is to allow the broadest set of clients and servers ("PROFILE_COMPATIBLE"). Setting this to more restrictive values may improve security, but may also prevent the TLS inspection proxy from connecting to some clients or servers. Note that Secure Web Proxy does not yet honor this field. Values: `PROFILE_UNSPECIFIED`, `PROFILE_COMPATIBLE`, `PROFILE_MODERN`, `PROFILE_RESTRICTED`, `PROFILE_CUSTOM`. |
| `trustConfig` | string | Optional. A TrustConfig resource used when making a connection to the TLS server. This is a relative resource path following the form "projects/{project}/locations/{location}/trustConfigs/{trust_config}". This is necessary to intercept TLS connections to servers with certificates signed by a private CA or self-signed certificates. Note that Secure Web Proxy does not yet honor this field. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `UrlFilter`

- A URL filter defines an action to take for some URL match.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filteringAction` | string enum | Required. The action taken when this filter is applied. Values: `URL_FILTERING_ACTION_UNSPECIFIED`, `ALLOW`, `DENY`. |
| `priority` | integer (int32) | Required. The priority of this filter within the URL Filtering Profile. Lower integers indicate higher priorities. The priority of a filter must be unique within a URL Filtering Profile. |
| `urls` | array<string> | Required. The list of strings that a URL must match with for this filter to be applied. |

### `UrlFilteringProfile`

- UrlFilteringProfile defines filters based on URL.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `urlFilters` | array<UrlFilter> | Optional. The list of filtering configs in which each config defines an action to take for some URL match. |

### `UrlList`

- UrlList proto helps users to set reusable, independently manageable lists of hosts, host patterns, URLs, URL patterns.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time when the security policy was created. |
| `description` | string | Optional. Free-text description of the resource. |
| `name` | string | Required. Name of the resource provided by the user. Name is of the form projects/{project}/locations/{location}/urlLists/{url_list} url_list should match the pattern:(^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$). |
| `updateTime` | string (google-datetime) | Output only. Time when the security policy was updated. |
| `values` | array<string> | Required. FQDNs and URLs. |

### `ValidationCA`

- Specification of ValidationCA. Defines the mechanism to obtain the Certificate Authority certificate to validate the peer certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateProviderInstance` | CertificateProviderInstance | The certificate provider instance specification that will be passed to the data plane, which will be used to load necessary credential information. |
| `grpcEndpoint` | GoogleCloudNetworksecurityV1GrpcEndpoint | gRPC specific configuration to access the gRPC server to obtain the CA certificate. |

### `ValidationCA` (v1beta1)

- Specification of ValidationCA. Defines the mechanism to obtain the Certificate Authority certificate to validate the peer certificate.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `certificateProviderInstance` | CertificateProviderInstance | The certificate provider instance specification that will be passed to the data plane, which will be used to load necessary credential information. |
| `grpcEndpoint` | GoogleCloudNetworksecurityV1beta1GrpcEndpoint | gRPC specific configuration to access the gRPC server to obtain the CA certificate. |

### `WildfireAnalysisProfile`

- `WildfireAnalysisProfile` defines Palo Alto Networks WildFire behavior.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `wildfireInlineCloudAnalysisRules` | array<WildfireInlineCloudAnalysisRule> | Optional. Configuration for Advanced malware sandbox inline cloud analysis. |
| `wildfireInlineMlOverrides` | array<WildfireInlineMlOverride> | Optional. Configuration for overriding inline ML Advanced malware sandbox actions per protocol. |
| `wildfireInlineMlSetting` | WildfireInlineMlSettings | Optional. Settings for Advanced malware sandbox inline ML analysis. |
| `wildfireInlineMlSettings` | array<WildfireInlineMlSettings> | Optional. Deprecated: Use `wildfire_inline_ml_setting` instead. Settings for Advanced malware sandbox inline ML analysis. |
| `wildfireOverrides` | array<WildfireOverride> | Optional. Configuration for overriding Advanced malware sandbox actions per protocol. |
| `wildfireRealtimeLookup` | boolean | Optional. Whether to hold the transfer of a file while the Advanced malware sandbox real-time signature cloud performs a signature lookup. The default value is `false`. |
| `wildfireSubmissionRules` | array<WildfireSubmissionRule> | Optional. Configurations for Advanced malware sandbox (WildFire) file submissions. |
| `wildfireThreatOverrides` | array<WildfireThreatOverride> | Optional. Configuration for overriding the Advanced malware sandbox threat action by `threat_id` match. |

### `WildfireInlineCloudAnalysisRule`

- The list of file type configurations to be scanned by Advanced malware sandbox inline cloud analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Required. Action to take when a threat is detected using Advanced malware sandbox inline cloud analysis. The default value is `DENY`. Values: `WILDFIRE_INLINE_CLOUD_ANALYSIS_ACTION_UNSPECIFIED`, `ALLOW`, `DENY`, `ALERT`. |
| `customFileTypes` | WildfireInlineCloudAnalysisRuleCustomFileTypes | Submit a custom list of file types for Advanced malware sandbox inline cloud analysis. |
| `direction` | string enum | Required. Direction for the files to be analyzed by Advanced malware sandbox inline cloud analysis. Values: `DIRECTION_UNSPECIFIED`, `UPLOAD`, `DOWNLOAD`, `BOTH`. |
| `fileSelectionMode` | string enum | Required. File selection mode for Advanced malware sandbox inline cloud analysis. Values: `FILE_SELECTION_MODE_UNSPECIFIED`, `ALL_FILE_TYPES`, `CUSTOM_FILE_TYPES`. |

### `WildfireInlineCloudAnalysisRuleCustomFileTypes`

- The options to submit a custom list of file types for scanning.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileTypes` | array<string> | Required. File types to be submitted for Advanced malware sandbox inline cloud analysis. Values: `FILE_TYPE_UNSPECIFIED`, `PE`. |

### `WildfireInlineMlFileException`

- Defines the file to exclude from Advanced malware sandbox inline ML analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filename` | string | Optional. Name of the file to exclude from Advanced malware sandbox inline ML analysis. |
| `partialHash` | string | Required. Machine learning partial hash of the file to exclude from Advanced malware sandbox inline ML analysis. |

### `WildfireInlineMlOverride`

- Defines what action to take for Advanced malware sandbox inline ML threats per protocol.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Required. The action to take for Advanced malware sandbox inline ML override. Values: `WILDFIRE_THREAT_ACTION_UNSPECIFIED`, `WILDFIRE_DEFAULT_ACTION`, `WILDFIRE_ALLOW`, `WILDFIRE_ALERT`, `WILDFIRE_DENY`. |
| `protocol` | string enum | Required. Protocol to match for Advanced malware sandbox inline ML override. Values: `WILDFIRE_PROTOCOL_UNSPECIFIED`, `WILDFIRE_SMTP`, `WILDFIRE_SMB`, `WILDFIRE_POP3`, `WILDFIRE_IMAP`, `WILDFIRE_HTTP2`, `WILDFIRE_HTTP`, `WILDFIRE_FTP`. |

### `WildfireInlineMlSettings`

- Defines the settings for Advanced malware sandbox inline ML analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileExceptions` | array<WildfireInlineMlFileException> | Optional. List of files to exclude from Advanced malware sandbox inline ML analysis. |
| `inlineMlConfigs` | array<WildfireInlineMlSettingsInlineMlConfig> | Optional. List of inline ML configurations to enable in Advanced malware sandbox inline ML analysis. |

### `WildfireInlineMlSettingsInlineMlConfig`

- Configuration for Advanced malware sandbox inline ML analysis per file type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Required. Action to take when a threat is detected using inline ML. Values: `INLINE_ML_ACTION_UNSPECIFIED`, `DISABLE`, `ALERT`, `ENABLE`. |
| `fileType` | string enum | Required. File type to configure inline ML for. Values: `INLINE_ML_CONFIG_UNSPECIFIED`, `WINDOWS_EXECUTABLE`, `POWERSHELL_SCRIPT1`, `POWERSHELL_SCRIPT2`, `ELF`, `MS_OFFICE`, `SHELL`, `OOXML`, `MACHO`. |

### `WildfireOverride`

- Defines what action to take for Advanced malware sandbox threats per protocol.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Required. Threat action override. For some threat types, only a subset of actions applies. Values: `WILDFIRE_THREAT_ACTION_UNSPECIFIED`, `WILDFIRE_DEFAULT_ACTION`, `WILDFIRE_ALLOW`, `WILDFIRE_ALERT`, `WILDFIRE_DENY`. |
| `protocol` | string enum | Required. Protocol to match. Values: `WILDFIRE_PROTOCOL_UNSPECIFIED`, `WILDFIRE_SMTP`, `WILDFIRE_SMB`, `WILDFIRE_POP3`, `WILDFIRE_IMAP`, `WILDFIRE_HTTP2`, `WILDFIRE_HTTP`, `WILDFIRE_FTP`. |

### `WildfireSubmissionRule`

- Defines the file types to be submitted for Advanced malware sandbox analysis and the direction of the traffic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFileTypes` | WildfireSubmissionRuleCustomFileTypes | Submit a custom list of file types for Advanced malware sandbox analysis. |
| `direction` | string enum | Required. Direction for the files to be analyzed by Advanced malware sandbox. Values: `DIRECTION_UNSPECIFIED`, `UPLOAD`, `DOWNLOAD`, `BOTH`. |
| `fileSelectionMode` | string enum | Required. File selection mode for Advanced malware sandbox analysis. Values: `FILE_SELECTION_MODE_UNSPECIFIED`, `ALL_FILE_TYPES`, `CUSTOM_FILE_TYPES`. |

### `WildfireSubmissionRuleCustomFileTypes`

- The options to submit a custom list of file types for scanning.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileTypes` | array<string> | Required. File types to be submitted for Advanced malware sandbox analysis. Values: `FILE_TYPE_UNSPECIFIED`, `APK`, `ARCHIVE`, `EMAIL_LINK`, `FLASH`, `JAR`, `LINUX`, `MS_OFFICE`, `PDF`, `PE`, `SCRIPT`. |

### `WildfireThreatOverride`

- Defines what action to take for a specific Advanced malware sandbox `threat_id` match.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Required. Threat action override. Values: `WILDFIRE_THREAT_ACTION_UNSPECIFIED`, `WILDFIRE_DEFAULT_ACTION`, `WILDFIRE_ALLOW`, `WILDFIRE_ALERT`, `WILDFIRE_DENY`. |
| `threatId` | string | Required. Threat ID to match. |

### `WildfireVerdictChangeRequest`

- Message for an Advanced malware sandbox verdict change request (`WildfireVerdictChangeRequest`).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `comment` | string | Required. The justification for the verdict change request. The maximum length is 2048 characters. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the `WildfireVerdictChangeRequest` was created. |
| `fileName` | string | Output only. The file name of the malware sample. |
| `fileType` | string | Output only. The file type of the malware sample. |
| `finalVerdict` | string enum | Output only. The final verdict of the malware sample. Values: `WILDFIRE_SAMPLE_VERDICT_UNKNOWN`, `BENIGN`, `MALWARE`, `GRAYWARE`, `PHISHING`. |
| `name` | string | Output only. Identifier. The relative name of the `WildfireVerdictChangeRequest`. This is a unique identifier generated by the third-party API. Format: `organizations/{organization}/locations/{location}/firewallEndpoints/{firewall_endpoint}/wildfireVerdictChangeRequests/{wildfire_verdict_change_request_id}` or `projects/{project}/locations/{location}/firewallEndpoints/{firewall_endpoint}/wildfireVerdictChangeRequests/{wildfire_verdict_change_request_id}`. Where `{wildfire_verdict_change_request_id}` is an ID in the format `^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`. |
| `newVerdict` | string enum | Required. The suggested verdict to apply to the malware sample. Values: `WILDFIRE_SAMPLE_VERDICT_UNKNOWN`, `BENIGN`, `MALWARE`, `GRAYWARE`, `PHISHING`. |
| `oldVerdict` | string enum | Output only. The original verdict of the malware sample. Values: `WILDFIRE_SAMPLE_VERDICT_UNKNOWN`, `BENIGN`, `MALWARE`, `GRAYWARE`, `PHISHING`. |
| `resolutionTime` | string (google-datetime) | Output only. The timestamp when the `WildfireVerdictChangeRequest` was resolved. |
| `sha256` | string | Required. The SHA256 hash (FIPS 180-4 (https://csrc.nist.gov/publications/detail/fips/180/4/final)) of the malware sample that requires a verdict change. |
| `sourceRegion` | string | Output only. The region of the file associated with the malware sample. |
| `state` | string enum | Output only. The review state of the `WildfireVerdictChangeRequest`. Values: `VERDICT_CHANGE_REQUEST_STATE_UNSPECIFIED`, `OPEN`, `CLOSED`, `PENDING`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the `WildfireVerdictChangeRequest` was last updated. |
| `wildfireVerdictChangeRequestId` | string | Output only. The ID of the `WildfireVerdictChangeRequest`. This is a unique identifier generated by the third-party API. Format: `^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`. |

### Shape of `SACRealmSACRealmSymantecOptions`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "availableSymantecSites": "array<string>",
  "secretPath": "string",
  "symantecConnectionState": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `networksecurity` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the `TlsInspectionPolicy.excludePublicCaSet` description says "If TRUE, do not accept our default set of public CAs. Only CAs specified in trust_config will be accepted" and that trusting public root CAs is not recommended, but then says "prefer setting this to \"false\" and explicitly specifying trusted CAs and certificates in a TrustConfig". By the same description, `false` keeps the public CAs trusted in addition to the TrustConfig; to accept only the CAs in the TrustConfig, set `excludePublicCaSet` to `true`.
- Source: https://networksecurity.googleapis.com/$discovery/rest?version=v1, https://networksecurity.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
