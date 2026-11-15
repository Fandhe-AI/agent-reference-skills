---
source: https://domains.googleapis.com/$discovery/rest?version=v1
---

# Cloud Domains API message schemas (domains)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/domains/`.

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. |

### `AuthorizationCode`

- Defines an authorization code.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string | The Authorization Code in ASCII. It can be used to transfer the domain to or from another registrar. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `ConfigureContactSettingsRequest`

- Request for the `ConfigureContactSettings` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contactNotices` | array<string> | The list of contact notices that the caller acknowledges. The notices needed here depend on the values specified in `contact_settings`. |
| `contactSettings` | ContactSettings | Fields of the `ContactSettings` to update. |
| `updateMask` | string (google-fieldmask) | Required. The field mask describing which fields to update as a comma-separated list. For example, if only the registrant contact is being updated, the `update_mask` is `"registrant_contact"`. |
| `validateOnly` | boolean | Validate the request without actually updating the contact settings. |

### `ConfigureDnsSettingsRequest`

- Request for the `ConfigureDnsSettings` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsSettings` | DnsSettings | Fields of the `DnsSettings` to update. |
| `updateMask` | string (google-fieldmask) | Required. The field mask describing which fields to update as a comma-separated list. For example, if only the name servers are being updated for an existing Custom DNS configuration, the `update_mask` is `"custom_dns.name_servers"`. When changing the DNS provider from one type to another, pass the new provider's field name as part of the field mask. For example, when changing from a Google Domains DNS configuration to a Custom DNS configuration, the `update_mask` is `"custom_dns"`. // |
| `validateOnly` | boolean | Validate the request without actually updating the DNS settings. |

### `ConfigureManagementSettingsRequest`

- Request for the `ConfigureManagementSettings` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `managementSettings` | ManagementSettings | Fields of the `ManagementSettings` to update. |
| `updateMask` | string (google-fieldmask) | Required. The field mask describing which fields to update as a comma-separated list. For example, if only the transfer lock is being updated, the `update_mask` is `"transfer_lock_state"`. |
| `validateOnly` | boolean | Optional. If set, validates the request without actually updating the management settings. |

### `Contact`

- Details required for a contact associated with a `Registration`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | Required. Email address of the contact. |
| `faxNumber` | string | Fax number of the contact in international format. For example, `"+1-800-555-0123"`. |
| `phoneNumber` | string | Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`. |
| `postalAddress` | PostalAddress | Required. Postal address of the contact. |

### `ContactSettings`

- Defines the contact information associated with a `Registration`. ICANN (https://icann.org/) requires all domain names to have associated contact information. The `registrant_contact` is considered the domain's legal owner, and often the other contacts are identical.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminContact` | Contact | Required. The administrative contact for the `Registration`. |
| `privacy` | string enum | Required. Privacy setting for the contacts associated with the `Registration`. |
| `registrantContact` | Contact | Required. The registrant contact for the `Registration`. \*Caution: Anyone with access to this email address, phone number, and/or postal address can take control of the domain.\* \*Warning: For new `Registration`s, the registrant receives an email confirmation that they must complete within 15 days to avoid domain suspension.\* |
| `technicalContact` | Contact | Required. The technical contact for the `Registration`. |

### `CustomDns`

- Configuration for an arbitrary DNS provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dsRecords` | array<DsRecord> | The list of DS records for this domain, which are used to enable DNSSEC. The domain's DNS provider can provide the values to set here. If this field is empty, DNSSEC is disabled. |
| `nameServers` | array<string> | Required. A list of name servers that store the DNS zone for this domain. Each name server is a domain name, with Unicode domain names expressed in Punycode format. |

### `DnsSettings`

- Defines the DNS configuration of a `Registration`, including name servers, DNSSEC, and glue records.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customDns` | CustomDns | An arbitrary DNS provider identified by its name servers. |
| `glueRecords` | array<GlueRecord> | The list of glue records for this `Registration`. Commonly empty. |
| `googleDomainsDns` | GoogleDomainsDns | Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations). The free DNS zone provided by Google Domains (https://domains.google/). |
| `googleDomainsRedirectsDataAvailable` | boolean | Output only. Indicates if this `Registration` has configured one of the following deprecated Google Domains DNS features: \* Domain forwarding (HTTP `301` and `302` response status codes), \* Email forwarding. See https://cloud.google.com/domains/docs/deprecations/feature-deprecations for more details. If any of these features is enabled call the `RetrieveGoogleDomainsForwardingConfig` method to get details about the feature's configuration. A forwarding configuration might not work correctly if required DNS records are not present in the domain's authoritative DNS Zone. |

### `Domain`

- A domain that the calling user manages in Google Domains.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domainName` | string | The domain name. Unicode domain names are expressed in Punycode format. |
| `resourceState` | string enum | The state of this domain as a `Registration` resource. |
| `yearlyPrice` | Money | Price to renew the domain for one year. Only set when `resource_state` is `IMPORTABLE`. |

### `DomainForwarding`

- Domain forwarding configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pathForwarding` | boolean | If true, forwards the path after the domain name to the same path at the new address. |
| `pemCertificate` | string | The PEM-encoded certificate chain. |
| `redirectType` | string enum | The redirect type. |
| `sslEnabled` | boolean | If true, the forwarding works also over HTTPS. |
| `subdomain` | string | The subdomain of the registered domain that is being forwarded. E.g. `www.example.com`, `example.com` (i.e. the registered domain itself) or `*.example.com` (i.e. all subdomains). |
| `targetUri` | string | The target of the domain forwarding, i.e. the path to redirect the `subdomain` to. |

### `DsRecord`

- Defines a Delegation Signer (DS) record, which is needed to enable DNSSEC for a domain. It contains a digest (hash) of a DNSKEY record that must be present in the domain's DNS zone.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `algorithm` | string enum | The algorithm used to generate the referenced DNSKEY. |
| `digest` | string | The digest generated from the referenced DNSKEY. |
| `digestType` | string enum | The hash function used to generate the digest of the referenced DNSKEY. |
| `keyTag` | integer (int32) | The key tag of the record. Must be set in range 0 -- 65535. |

### `EmailForwarding`

- Email forwarding configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alias` | string | An alias recipient email that forwards emails to the `target_email_address`. For example, `admin@example.com` or `*@example.com` (wildcard alias forwards all the emails under the registered domain). |
| `targetEmailAddress` | string | Target email that receives emails sent to the `alias`. |

### `ExportRegistrationRequest`

- Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations). Request for the `ExportRegistration` method.
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

### `GeoPolicy`

- Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableFencing` | boolean | Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy. |
| `item` | array<GeoPolicyItem> | The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead. |

### `GeoPolicyItem`

- ResourceRecordSet data for one geo location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthCheckedTargets` | HealthCheckTargets | For A and AAAA types only. Endpoints to return in the query result only if they are healthy. These can be specified along with `rrdata` within this item. |
| `location` | string | The geo-location granularity is a GCP region. This location string should correspond to a GCP region. e.g. "us-east1", "southamerica-east1", "asia-east1", etc. |
| `rrdata` | array<string> | — |
| `signatureRrdata` | array<string> | DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item. |

### `GlueRecord`

- Defines a host on your domain that is a DNS name server for your domain and/or other domains. Glue records are a way of making the IP address of a name server known, even when it serves DNS queries for its parent domain. For example, when `ns.example.com` is a name server for `example.com`, the host `ns.example.com` must have a glue record to break the circular DNS reference.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hostName` | string | Required. Domain name of the host in Punycode format. |
| `ipv4Addresses` | array<string> | List of IPv4 addresses corresponding to this host in the standard decimal format (e.g. `198.51.100.1`). At least one of `ipv4_address` and `ipv6_address` must be set. |
| `ipv6Addresses` | array<string> | List of IPv6 addresses corresponding to this host in the standard hexadecimal format (e.g. `2001:db8::`). At least one of `ipv4_address` and `ipv6_address` must be set. |

### `GoogleDomainsDns`

- Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations). Configuration for using the free DNS zone provided by Google Domains as a `Registration`'s `dns_provider`. You cannot configure the DNS zone itself using the API. To configure the DNS zone, go to Google Domains (https://domains.google/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dsRecords` | array<DsRecord> | Output only. The list of DS records published for this domain. The list is automatically populated when `ds_state` is `DS_RECORDS_PUBLISHED`, otherwise it remains empty. |
| `dsState` | string enum | Required. The state of DS records for this domain. Used to enable or disable automatic DNSSEC. |
| `nameServers` | array<string> | Output only. A list of name servers that store the DNS zone for this domain. Each name server is a domain name, with Unicode domain names expressed in Punycode format. This field is automatically populated with the name servers assigned to the Google Domains DNS zone. |

### `HealthCheckTargets`

- HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `externalEndpoints` | array<string> | The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) |
| `internalLoadBalancer` | array<LoadBalancerTarget> | Configuration for internal load balancers to be health checked. |

### `ImportDomainRequest`

- Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations). Request for the `ImportDomain` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domainName` | string | Required. The domain name. Unicode domain names must be expressed in Punycode format. |
| `labels` | object | Set of labels associated with the `Registration`. |

### `InitiatePushTransferRequest`

- Request for the `InitiatePushTransfer` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tag` | string | Required. The Tag of the new registrar. Can be found at List of registrars (https://nominet.uk/registrar-list/). |
| `validateOnly` | boolean | Optional. If set, validates the request without actually initiating the transfer. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListRegistrationsResponse`

- Response for the `ListRegistrations` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | When present, there are more results to retrieve. Set `page_token` to this value on a subsequent call to get the next page of results. |
| `registrations` | array<Registration> | A list of `Registration`s. |

### `LoadBalancerTarget`

- The configuration for an individual load balancer to health check.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | The frontend IP address of the load balancer to health check. |
| `ipProtocol` | string enum | The protocol of the load balancer to health check. |
| `loadBalancerType` | string enum | The type of load balancer specified by this target. This value must match the configuration of the load balancer located at the LoadBalancerTarget's IP address, port, and region. Use the following: - \*regionalL4ilb\*: for a regional internal passthrough Network Load Balancer. - \*regionalL7ilb\*: for a regional internal Application Load Balancer. - \*globalL7ilb\*: for a global internal Application Load Balancer. |
| `networkUrl` | string | The fully qualified URL of the network that the load balancer is attached to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`. |
| `port` | string | The configured port of the load balancer. |
| `project` | string | The project ID in which the load balancer is located. |
| `region` | string | The region in which the load balancer is located. |

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

### `ManagementSettings`

- Defines renewal, billing, and transfer settings for a `Registration`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `effectiveTransferLockState` | string enum | Output only. The actual transfer lock state for this `Registration`. |
| `preferredRenewalMethod` | string enum | Optional. The desired renewal method for this `Registration`. The actual `renewal_method` is automatically updated to reflect this choice. If unset or equal to `RENEWAL_METHOD_UNSPECIFIED`, the actual `renewalMethod` is treated as if it were set to `AUTOMATIC_RENEWAL`. You cannot use `RENEWAL_DISABLED` during resource creation, and you can update the renewal status only when the `Registration` resource has state `ACTIVE` or `SUSPENDED`. When `preferred_renewal_method` is set to `AUTOMATIC_RENEWAL`, the actual `renewal_method` can be set to `RENEWAL_DISABLED` in case of problems with the billing account or reported domain abuse. In such cases, check the `issues` field on the `Registration`. After the problem is resolved, the `renewal_method` is automatically updated to `preferred_renewal_method` in a few hours. |
| `renewalMethod` | string enum | Output only. The actual renewal method for this `Registration`. When `preferred_renewal_method` is set to `AUTOMATIC_RENEWAL`, the actual `renewal_method` can be equal to `RENEWAL_DISABLED`—for example, when there are problems with the billing account or reported domain abuse. In such cases, check the `issues` field on the `Registration`. After the problem is resolved, the `renewal_method` is automatically updated to `preferred_renewal_method` in a few hours. |
| `transferLockState` | string enum | This is the desired transfer lock state for this `Registration`. A transfer lock controls whether the domain can be transferred to another registrar. The transfer lock state of the domain is returned in the `effective_transfer_lock_state` property. The transfer lock state values might be different for the following reasons: \* `transfer_lock_state` was updated only a short time ago. \* Domains with the `TRANSFER_LOCK_UNSUPPORTED_BY_REGISTRY` state are in the list of `domain_properties`. These domains are always in the `UNLOCKED` state. |

### `Money`

- Represents an amount of money with its currency type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currencyCode` | string | The three-letter currency code defined in ISO 4217. |
| `nanos` | integer (int32) | Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. |
| `units` | string (int64) | The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. |

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

- Represents the metadata of the long-running operation. Output only.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | API version used to start the operation. |
| `createTime` | string (google-datetime) | The time the operation was created. |
| `endTime` | string (google-datetime) | The time the operation finished running. |
| `statusDetail` | string | Human-readable status of the operation, if any. |
| `target` | string | Server-defined resource path for the target of the operation. |
| `verb` | string | Name of the verb executed by the operation. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PostalAddress`

- Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addressLines` | array<string> | Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas). |
| `administrativeArea` | string | Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don't use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated. |
| `languageCode` | string | Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en". |
| `locality` | string | Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`. |
| `organization` | string | Optional. The name of the organization at the address. |
| `postalCode` | string | Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States). |
| `recipients` | array<string> | Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information. |
| `regionCode` | string | Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland. |
| `revision` | integer (int32) | The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions \*\*must\*\* be backward compatible with old revisions. |
| `sortingCode` | string | Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d'Ivoire). |
| `sublocality` | string | Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district. |

### `PrimaryBackupPolicy`

- Configures a RRSetRoutingPolicy such that all queries are responded with the primary_targets if they are healthy. And if all of them are unhealthy, then we fallback to a geo localized policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupGeoTargets` | GeoPolicy | Backup targets provide a regional failover policy for the otherwise global primary targets. If serving state is set to `BACKUP`, this policy essentially becomes a geo routing policy. |
| `primaryTargets` | HealthCheckTargets | Endpoints that are health checked before making the routing decision. Unhealthy endpoints are omitted from the results. If all endpoints are unhealthy, we serve a response based on the `backup_geo_targets`. |
| `trickleTraffic` | number (double) | When serving state is `PRIMARY`, this field provides the option of sending a small percentage of the traffic to the backup targets. |

### `RRSetRoutingPolicy`

- A RRSetRoutingPolicy represents ResourceRecordSet data that is returned dynamically with the response varying based on configured properties such as geolocation or by weighted random selection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `geo` | GeoPolicy | — |
| `geoPolicy` | GeoPolicy | — |
| `healthCheck` | string | The fully qualified URL of the HealthCheck to use for this RRSetRoutingPolicy. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/healthChecks/{healthCheck}`. https://cloud.google.com/compute/docs/reference/rest/v1/healthChecks |
| `primaryBackup` | PrimaryBackupPolicy | — |
| `wrr` | WrrPolicy | — |
| `wrrPolicy` | WrrPolicy | — |

### `RegisterDomainRequest`

- Request for the `RegisterDomain` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contactNotices` | array<string> | The list of contact notices that the caller acknowledges. The notices needed here depend on the values specified in `registration.contact_settings`. |
| `domainNotices` | array<string> | The list of domain notices that you acknowledge. Call `RetrieveRegisterParameters` to see the notices that need acknowledgement. |
| `registration` | Registration | Required. The complete `Registration` resource to be created. |
| `validateOnly` | boolean | When true, only validation is performed, without actually registering the domain. Follows: https://cloud.google.com/apis/design/design_patterns#request_validation |
| `yearlyPrice` | Money | Required. Yearly price to register or renew the domain. The value that should be put here can be obtained from RetrieveRegisterParameters or SearchDomains calls. |

### `RegisterParameters`

- Parameters required to register a new domain.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availability` | string enum | Indicates whether the domain is available for registration. This value is accurate when obtained by calling `RetrieveRegisterParameters`, but is approximate when obtained by calling `SearchDomains`. |
| `domainName` | string | The domain name. Unicode domain names are expressed in Punycode format. |
| `domainNotices` | array<string> | Notices about special properties of the domain. |
| `supportedPrivacy` | array<string> | Contact privacy options that the domain supports. |
| `yearlyPrice` | Money | Price to register or renew the domain for one year. |

### `Registration`

- The `Registration` resource facilitates managing and configuring domain name registrations. There are several ways to create a new `Registration` resource: To create a new `Registration` resource, find a suitable domain name by calling the `SearchDomains` method with a query to see available domain name options. After choosing a name, call `RetrieveRegisterParameters` to ensure availability and obtain information like pricing, which is needed to build a call to `RegisterDomain`. Another way to create a new `Registration` is to transfer an existing domain from another registrar (Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations)). First, go to the current registrar to unlock the domain for transfer and retrieve the domain's transfer authorization code. Then call `RetrieveTransferParameters` to confirm that the domain is unlocked and to get values needed to build a call to `TransferDomain`. Finally, you can create a new `Registration` by importing an existing domain managed with Google Domains (https://domains.google/) (Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations)). First, call `RetrieveImportableDomains` to list domains to which the calling user has sufficient access. Then call `ImportDomain` on any domain names you want to use with Cloud Domains.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contactSettings` | ContactSettings | Required. Settings for contact information linked to the `Registration`. You cannot update these with the `UpdateRegistration` method. To update these settings, use the `ConfigureContactSettings` method. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp of the `Registration` resource. |
| `dnsSettings` | DnsSettings | Settings controlling the DNS configuration of the `Registration`. You cannot update these with the `UpdateRegistration` method. To update these settings, use the `ConfigureDnsSettings` method. |
| `domainName` | string | Required. Immutable. The domain name. Unicode domain names must be expressed in Punycode format. |
| `domainProperties` | array<string> | Output only. Special properties of the domain. |
| `expireTime` | string (google-datetime) | Output only. The expiration timestamp of the `Registration`. |
| `issues` | array<string> | Output only. The set of issues with the `Registration` that require attention. |
| `labels` | object | Set of labels associated with the `Registration`. |
| `managementSettings` | ManagementSettings | Settings for management of the `Registration`, including renewal, billing, and transfer. You cannot update these with the `UpdateRegistration` method. To update these settings, use the `ConfigureManagementSettings` method. |
| `name` | string | Output only. Name of the `Registration` resource, in the format `projects/*/locations/*/registrations/`. |
| `pendingContactSettings` | ContactSettings | Output only. Pending contact settings for the `Registration`. Updates to the `contact_settings` field that change its `registrant_contact` or `privacy` fields require email confirmation by the `registrant_contact` before taking effect. This field is set only if there are pending updates to the `contact_settings` that have not been confirmed. To confirm the changes, the `registrant_contact` must follow the instructions in the email they receive. |
| `registerFailureReason` | string enum | Output only. The reason the domain registration failed. Only set for domains in REGISTRATION_FAILED state. |
| `state` | string enum | Output only. The state of the `Registration` |
| `supportedPrivacy` | array<string> | Output only. Set of options for the `contact_settings.privacy` field that this `Registration` supports. |
| `transferFailureReason` | string enum | Output only. Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations). The reason the domain transfer failed. Only set for domains in TRANSFER_FAILED state. |

### `Registration` (v1alpha2)

- The `Registration` resource facilitates managing and configuring domain name registrations. There are several ways to create a new `Registration` resource: To create a new `Registration` resource, find a suitable domain name by calling the `SearchDomains` method with a query to see available domain name options. After choosing a name, call `RetrieveRegisterParameters` to ensure availability and obtain information like pricing, which is needed to build a call to `RegisterDomain`. Another way to create a new `Registration` is to transfer an existing domain from another registrar (Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations)). First, go to the current registrar to unlock the domain for transfer and retrieve the domain's transfer authorization code. Then call `RetrieveTransferParameters` to confirm that the domain is unlocked and to get values needed to build a call to `TransferDomain`. Finally, you can create a new `Registration` by importing an existing domain managed with Google Domains (https://domains.google/) (Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations)). First, call `RetrieveImportableDomains` to list domains to which the calling user has sufficient access. Then call `ImportDomain` on any domain names you want to use with Cloud Domains.
- Version: v1alpha2

| Field | Type | Description |
|---|---|---|
| `contactSettings` | ContactSettings | Required. Settings for contact information linked to the `Registration`. You cannot update these with the `UpdateRegistration` method. To update these settings, use the `ConfigureContactSettings` method. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp of the `Registration` resource. |
| `dnsSettings` | DnsSettings | Settings controlling the DNS configuration of the `Registration`. You cannot update these with the `UpdateRegistration` method. To update these settings, use the `ConfigureDnsSettings` method. |
| `domainName` | string | Required. Immutable. The domain name. Unicode domain names must be expressed in Punycode format. |
| `domainProperties` | array<string> | Output only. Special properties of the domain. |
| `expireTime` | string (google-datetime) | Output only. The expiration timestamp of the `Registration`. |
| `issues` | array<string> | Output only. The set of issues with the `Registration` that require attention. |
| `labels` | object | Set of labels associated with the `Registration`. |
| `managementSettings` | ManagementSettings | Settings for management of the `Registration`, including renewal, billing, and transfer. You cannot update these with the `UpdateRegistration` method. To update these settings, use the `ConfigureManagementSettings` method. |
| `name` | string | Output only. Name of the `Registration` resource, in the format `projects/*/locations/*/registrations/`. |
| `pendingContactSettings` | ContactSettings | Output only. Pending contact settings for the `Registration`. Updates to the `contact_settings` field that change its `registrant_contact` or `privacy` fields require email confirmation by the `registrant_contact` before taking effect. This field is set only if there are pending updates to the `contact_settings` that have not been confirmed. To confirm the changes, the `registrant_contact` must follow the instructions in the email they receive. |
| `provider` | string enum | Output only. Current domain management provider. |
| `registerFailureReason` | string enum | Output only. The reason the domain registration failed. Only set for domains in REGISTRATION_FAILED state. |
| `state` | string enum | Output only. The state of the `Registration` |
| `supportedPrivacy` | array<string> | Output only. Set of options for the `contact_settings.privacy` field that this `Registration` supports. |
| `transferFailureReason` | string enum | Output only. Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations). The reason the domain transfer failed. Only set for domains in TRANSFER_FAILED state. |

### `RenewDomainRequest`

- Request for the `RenewDomain` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `validateOnly` | boolean | Optional. When true, only validation is performed, without actually renewing the domain. For more information, see Request validation (https://cloud.google.com/apis/design/design_patterns#request_validation) |
| `yearlyPrice` | Money | Required. Acknowledgement of the price to renew the domain for one year. To get the price, see Cloud Domains pricing (https://cloud.google.com/domains/pricing). If not provided, the expected price is returned in the error message. |

### `ResetAuthorizationCodeRequest`

- Request for the `ResetAuthorizationCode` method.
- Version: v1

### `ResourceRecordSet`

- A unit of data that is returned by the DNS servers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | For example, www.example.com. |
| `routingPolicy` | RRSetRoutingPolicy | Configures dynamic query responses based on either the geo location of the querying user or a weighted round robin based routing policy. A valid `ResourceRecordSet` contains only `rrdata` (for static resolution) or a `routing_policy` (for dynamic resolution). |
| `rrdata` | array<string> | As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples. |
| `signatureRrdata` | array<string> | As defined in RFC 4034 (section 3.2). |
| `ttl` | integer (int32) | Number of seconds that this `ResourceRecordSet` can be cached by resolvers. |
| `type` | string | The identifier of a supported record type. See the list of Supported DNS record types. |

### `RetrieveGoogleDomainsDnsRecordsResponse`

- Response for the `RetrieveGoogleDomainsDnsRecords` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | When present, there are more results to retrieve. Set `page_token` to this value on a subsequent call to get the next page of results. |
| `rrset` | array<ResourceRecordSet> | The resource record set resources (DNS Zone records). |

### `RetrieveGoogleDomainsForwardingConfigResponse`

- Response for the `RetrieveGoogleDomainsForwardingConfig` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domainForwardings` | array<DomainForwarding> | The list of domain forwarding configurations. A forwarding configuration might not work correctly if the required DNS records are not present in the domain's authoritative DNS zone. |
| `emailForwardings` | array<EmailForwarding> | The list of email forwarding configurations. A forwarding configuration might not work correctly if the required DNS records are not present in the domain's authoritative DNS zone. |

### `RetrieveImportableDomainsResponse`

- Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations). Response for the `RetrieveImportableDomains` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domains` | array<Domain> | A list of domains that the calling user manages in Google Domains. |
| `nextPageToken` | string | When present, there are more results to retrieve. Set `page_token` to this value on a subsequent call to get the next page of results. |

### `RetrieveRegisterParametersResponse`

- Response for the `RetrieveRegisterParameters` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `registerParameters` | RegisterParameters | Parameters to use when calling the `RegisterDomain` method. |

### `RetrieveTransferParametersResponse`

- Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations). Response for the `RetrieveTransferParameters` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `transferParameters` | TransferParameters | Parameters to use when calling the `TransferDomain` method. |

### `SearchDomainsResponse`

- Response for the `SearchDomains` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `registerParameters` | array<RegisterParameters> | Results of the domain name search. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `TransferDomainRequest`

- Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations). Request for the `TransferDomain` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationCode` | AuthorizationCode | The domain's transfer authorization code. You can obtain this from the domain's current registrar. |
| `contactNotices` | array<string> | The list of contact notices that you acknowledge. The notices needed here depend on the values specified in `registration.contact_settings`. |
| `registration` | Registration | Required. The complete `Registration` resource to be created. You can leave `registration.dns_settings` unset to import the domain's current DNS configuration from its current registrar. Use this option only if you are sure that the domain's current DNS service does not cease upon transfer, as is often the case for DNS services provided for free by the registrar. |
| `validateOnly` | boolean | Validate the request without actually transferring the domain. |
| `yearlyPrice` | Money | Required. Acknowledgement of the price to transfer or renew the domain for one year. Call `RetrieveTransferParameters` to obtain the price, which you must acknowledge. |

### `TransferParameters`

- Deprecated: For more information, see Cloud Domains feature deprecation (https://cloud.google.com/domains/docs/deprecations/feature-deprecations). Parameters required to transfer a domain from another registrar.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentRegistrar` | string | The registrar that currently manages the domain. |
| `currentRegistrarUri` | string | The URL of the registrar that currently manages the domain. |
| `domainName` | string | The domain name. Unicode domain names are expressed in Punycode format. |
| `nameServers` | array<string> | The name servers that currently store the configuration of the domain. |
| `supportedPrivacy` | array<string> | Contact privacy options that the domain supports. |
| `transferLockState` | string enum | Indicates whether the domain is protected by a transfer lock. For a transfer to succeed, this must show `UNLOCKED`. To unlock a domain, go to its current registrar. |
| `yearlyPrice` | Money | Price to transfer or renew the domain for one year. |

### `WrrPolicy`

- Configures a RRSetRoutingPolicy that routes in a weighted round robin fashion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `item` | array<WrrPolicyItem> | — |

### `WrrPolicyItem`

- A routing block which contains the routing information for one WRR item.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthCheckedTargets` | HealthCheckTargets | Endpoints that are health checked before making the routing decision. The unhealthy endpoints are omitted from the result. If all endpoints within a bucket are unhealthy, we choose a different bucket (sampled with respect to its weight) for responding. If DNSSEC is enabled for this zone, only one of `rrdata` or `health_checked_targets` can be set. |
| `rrdata` | array<string> | — |
| `signatureRrdata` | array<string> | DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item. |
| `weight` | number (double) | The weight corresponding to this `WrrPolicyItem` object. When multiple `WrrPolicyItem` objects are configured, the probability of returning an `WrrPolicyItem` object's data is proportional to its weight relative to the sum of weights configured for all items. This weight must be non-negative. |

### Shape of `AuditConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "auditLogConfigs": "array<AuditLogConfig>",
  "service": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1alpha2 of `domains` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://domains.googleapis.com/$discovery/rest?version=v1, https://domains.googleapis.com/$discovery/rest?version=v1alpha2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
