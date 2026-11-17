---
source: https://dns.googleapis.com/$discovery/rest?version=v1
---

# Cloud DNS API message schemas (dns)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/dns/`.

### `Change`

- A Change represents a set of `ResourceRecordSet` additions and deletions applied atomically to a ManagedZone. ResourceRecordSets within a ManagedZone are modified by creating a new Change element in the Changes collection. In turn the Changes collection also records the past modifications to the `ResourceRecordSets` in a `ManagedZone`. The current state of the `ManagedZone` is the sum effect of applying all `Change` elements in the `Changes` collection in sequence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additions` | array<ResourceRecordSet> | Which ResourceRecordSets to add? |
| `deletions` | array<ResourceRecordSet> | Which ResourceRecordSets to remove? Must match existing data exactly. |
| `id` | string | Unique identifier for the resource; defined by the server (output only). |
| `isServing` | boolean | If the DNS queries for the zone will be served. |
| `kind` | string | — |
| `startTime` | string | The time that this operation was started by the server (output only). This is in RFC3339 text format. |
| `status` | string enum | Status of the operation (output only). A status of "done" means that the request to update the authoritative servers has been sent, but the servers might not be updated yet. Values: `pending`, `done`. |

### `ChangesListResponse`

- The response to a request to enumerate Changes to a ResourceRecordSets collection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changes` | array<Change> | The requested changes. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. |

### `DnsKey`

- A DNSSEC key pair.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `algorithm` | string enum | String mnemonic specifying the DNSSEC algorithm of this key. Immutable after creation time. Values: `rsasha1`, `rsasha256`, `rsasha512`, `ecdsap256sha256`, `ecdsap384sha384`. |
| `creationTime` | string | The time that this resource was created in the control plane. This is in RFC3339 text format. Output only. |
| `description` | string | A mutable string of at most 1024 characters associated with this resource for the user's convenience. Has no effect on the resource's function. |
| `digests` | array<DnsKeyDigest> | Cryptographic hashes of the DNSKEY resource record associated with this DnsKey. These digests are needed to construct a DS record that points at this DNS key. Output only. |
| `id` | string | Unique identifier for the resource; defined by the server (output only). |
| `isActive` | boolean | Active keys are used to sign subsequent changes to the ManagedZone. Inactive keys are still present as DNSKEY Resource Records for the use of resolvers validating existing signatures. |
| `keyLength` | integer (uint32) | Length of the key in bits. Specified at creation time, and then immutable. |
| `keyTag` | integer (int32) | The key tag is a non-cryptographic hash of the a DNSKEY resource record associated with this DnsKey. The key tag can be used to identify a DNSKEY more quickly (but it is not a unique identifier). In particular, the key tag is used in a parent zone's DS record to point at the DNSKEY in this child ManagedZone. The key tag is a number in the range \[0, 65535\] and the algorithm to calculate it is specified in RFC4034 Appendix B. Output only. |
| `kind` | string | — |
| `publicKey` | string | Base64 encoded public half of this key. Output only. |
| `type` | string enum | One of "KEY_SIGNING" or "ZONE_SIGNING". Keys of type KEY_SIGNING have the Secure Entry Point flag set and, when active, are used to sign only resource record sets of type DNSKEY. Otherwise, the Secure Entry Point flag is cleared, and this key is used to sign only resource record sets of other types. Immutable after creation time. Values: `keySigning`, `zoneSigning`. |

### `DnsKeyDigest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `digest` | string | The base-16 encoded bytes of this digest. Suitable for use in a DS resource record. |
| `type` | string enum | Specifies the algorithm used to calculate this digest. Values: `sha1`, `sha256`, `sha384`. |

### `DnsKeySpec`

- Parameters for DnsKey key generation. Used for generating initial keys for a new ManagedZone and as default when adding a new DnsKey.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `algorithm` | string enum | String mnemonic specifying the DNSSEC algorithm of this key. Values: `rsasha1`, `rsasha256`, `rsasha512`, `ecdsap256sha256`, `ecdsap384sha384`. |
| `keyLength` | integer (uint32) | Length of the keys in bits. |
| `keyType` | string enum | Specifies whether this is a key signing key (KSK) or a zone signing key (ZSK). Key signing keys have the Secure Entry Point flag set and, when active, are only used to sign resource record sets of type DNSKEY. Zone signing keys do not have the Secure Entry Point flag set and are used to sign all other types of resource record sets. Values: `keySigning`, `zoneSigning`. |
| `kind` | string | — |

### `DnsKeysListResponse`

- The response to a request to enumerate DnsKeys in a ManagedZone.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsKeys` | array<DnsKey> | The requested resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. |

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

### `GoogleIamV1GetIamPolicyRequest`

- Request message for `GetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `options` | GoogleIamV1GetPolicyOptions | OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. |

### `GoogleIamV1GetPolicyOptions`

- Encapsulates settings provided to GetIamPolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestedPolicyVersion` | integer (int32) | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

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

### `GoogleLongrunningListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<GoogleLongrunningOperation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `GoogleLongrunningOperation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object (google.protobuf.Any) | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object (google.protobuf.Any) | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOutboundEndpointsResponse`

- Response message for OutboundEndpointsService.ListOutboundEndpoints
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. Set to empty if there are no remaining results. |
| `outboundEndpoints` | array<OutboundEndpoint> | The list of OutboundEndpoints. |
| `unreachable` | array<string> | Unordered list. The resource names of the unreachable locations. Format: `projects/{project}/locations/{location}` |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object (google.protobuf.Any) | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `ManagedZone`

- A zone is a subtree of the DNS namespace under one administrative responsibility. A ManagedZone is a resource that represents a DNS zone hosted by the Cloud DNS service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudLoggingConfig` | ManagedZoneCloudLoggingConfig | — |
| `creationTime` | string | The time that this resource was created on the server. This is in RFC3339 text format. Output only. |
| `description` | string | A mutable string of at most 1024 characters associated with this resource for the user's convenience. Has no effect on the managed zone's function. |
| `dnsName` | string | The DNS name of this managed zone, for instance "example.com.". |
| `dnssecConfig` | ManagedZoneDnsSecConfig | DNSSEC configuration. |
| `forwardingConfig` | ManagedZoneForwardingConfig | The presence for this field indicates that outbound forwarding is enabled for this zone. The value of this field contains the set of destinations to forward to. |
| `id` | string (uint64) | Unique identifier for the resource; defined by the server (output only) |
| `kind` | string | — |
| `labels` | object | User labels. |
| `name` | string | User assigned name for this resource. Must be unique within the project. The name must be 1-63 characters long, must begin with a letter, end with a letter or digit, and only contain lowercase letters, digits or dashes. |
| `nameServerSet` | string | Optionally specifies the NameServerSet for this ManagedZone. A NameServerSet is a set of DNS name servers that all host the same ManagedZones. Most users leave this field unset. If you need to use this field, contact your account team. |
| `nameServers` | array<string> | Delegate your managed_zone to these virtual name servers; defined by the server (output only) |
| `peeringConfig` | ManagedZonePeeringConfig | The presence of this field indicates that DNS Peering is enabled for this zone. The value of this field contains the network to peer with. |
| `privateVisibilityConfig` | ManagedZonePrivateVisibilityConfig | For privately visible zones, the set of Virtual Private Cloud resources that the zone is visible from. |
| `reverseLookupConfig` | ManagedZoneReverseLookupConfig | The presence of this field indicates that this is a managed reverse lookup zone and Cloud DNS resolves reverse lookup queries using automatically configured records for VPC resources. This only applies to networks listed under private_visibility_config. |
| `serviceDirectoryConfig` | ManagedZoneServiceDirectoryConfig | This field links to the associated service directory namespace. Do not set this field for public zones or forwarding zones. |
| `visibility` | string enum | The zone's visibility: public zones are exposed to the Internet, while private zones are visible only to Virtual Private Cloud resources. Values: `public`, `private`. |

### `ManagedZoneCloudLoggingConfig`

- Cloud Logging configurations for publicly visible zones.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableLogging` | boolean | If set, enable query logging for this ManagedZone. False by default, making logging opt-in. |
| `kind` | string | — |

### `ManagedZoneDnsSecConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultKeySpecs` | array<DnsKeySpec> | Specifies parameters for generating initial DnsKeys for this ManagedZone. Can only be changed while the state is OFF. |
| `kind` | string | — |
| `nonExistence` | string enum | Specifies the mechanism for authenticated denial-of-existence responses. Can only be changed while the state is OFF. Values: `nsec`, `nsec3`. |
| `state` | string enum | Specifies whether DNSSEC is enabled, and what mode it is in. Values: `off`, `on`, `transfer`. |

### `ManagedZoneForwardingConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `outboundEndpoints` | array<ManagedZoneForwardingConfigOutboundEndpoint> | The list of outbound endpoints to use for queries. |
| `targetNameServers` | array<ManagedZoneForwardingConfigNameServerTarget> | List of target name servers to forward to. Cloud DNS selects the best available name server if more than one target is given. |

### `ManagedZoneForwardingConfigNameServerTarget`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domainName` | string | Fully qualified domain name for the forwarding target. |
| `forwardingPath` | string enum | Forwarding path for this NameServerTarget. If unset or set to DEFAULT, Cloud DNS makes forwarding decisions based on IP address ranges; that is, RFC1918 addresses go to the VPC network, non-RFC1918 addresses go to the internet. When set to PRIVATE, Cloud DNS always sends queries through the VPC network for this target. Values: `default`, `private`. |
| `ipv4Address` | string | IPv4 address of a target name server. |
| `ipv6Address` | string | IPv6 address of a target name server. Does not accept both fields (ipv4 & ipv6) being populated. Public preview as of November 2022. |
| `kind` | string | — |

### `ManagedZoneForwardingConfigOutboundEndpoint`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `name` | string | Specified as a resource path including project and region. This should be formatted like projects/{project}/locations/{location}/outboundEndpoints/{endpoint} |

### `ManagedZoneOperationsListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. |
| `operations` | array<Operation> | The operation resources. |

### `ManagedZonePeeringConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `targetNetwork` | ManagedZonePeeringConfigTargetNetwork | The network with which to peer. |

### `ManagedZonePeeringConfigTargetNetwork`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deactivateTime` | string | The time at which the zone was deactivated, in RFC 3339 date-time format. An empty string indicates that the peering connection is active. The producer network can deactivate a zone. The zone is automatically deactivated if the producer network that the zone targeted is deleted. Output only. |
| `kind` | string | — |
| `networkUrl` | string | The fully qualified URL of the VPC network to forward queries to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}` |

### `ManagedZonePrivateVisibilityConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gkeClusters` | array<ManagedZonePrivateVisibilityConfigGKECluster> | The list of Google Kubernetes Engine clusters that can see this zone. |
| `kind` | string | — |
| `networks` | array<ManagedZonePrivateVisibilityConfigNetwork> | The list of VPC networks that can see this zone. |

### `ManagedZonePrivateVisibilityConfigGKECluster`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gkeClusterName` | string | The resource name of the cluster to bind this ManagedZone to. This should be specified in the format like: projects/\*/locations/\*/clusters/\*. This is referenced from GKE projects.locations.clusters.get API: https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/get |
| `kind` | string | — |

### `ManagedZonePrivateVisibilityConfigNetwork`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `networkUrl` | string | The fully qualified URL of the VPC network to bind to. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}` |

### `ManagedZoneReverseLookupConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |

### `ManagedZoneServiceDirectoryConfig`

- Contains information about Service Directory-backed zones.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `namespace` | ManagedZoneServiceDirectoryConfigNamespace | Contains information about the namespace associated with the zone. |

### `ManagedZoneServiceDirectoryConfigNamespace`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deletionTime` | string | The time that the namespace backing this zone was deleted; an empty string if it still exists. This is in RFC3339 text format. Output only. |
| `kind` | string | — |
| `namespaceUrl` | string | The fully qualified URL of the namespace associated with the zone. Format must be `https://servicedirectory.googleapis.com/v1/projects/{project}/locations/{location}/namespaces/{namespace}` |

### `ManagedZonesListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | Output only. Type of resource. |
| `managedZones` | array<ManagedZone> | The managed zone resources. |
| `nextPageToken` | string | This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. |

### `Operation`

- An operation represents a successful mutation performed on a Cloud DNS resource. Operations provide: - An audit log of server resource mutations. - A way to recover/retry API calls in the case where the response is never received by the caller. Use the caller specified client_operation_id.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsKeyContext` | OperationDnsKeyContext | Only populated if the operation targeted a DnsKey (output only). |
| `id` | string | Unique identifier for the resource. This is the client_operation_id if the client specified it when the mutation was initiated, otherwise, it is generated by the server. The name must be 1-63 characters long and match the regular expression \[-a-z0-9\]? (output only) |
| `kind` | string | — |
| `startTime` | string | The time that this operation was started by the server. This is in RFC3339 text format (output only). |
| `status` | string enum | Status of the operation. Can be one of the following: "PENDING" or "DONE" (output only). A status of "DONE" means that the request to update the authoritative servers has been sent, but the servers might not be updated yet. Values: `pending`, `done`. |
| `type` | string | Type of the operation. Operations include insert, update, and delete (output only). |
| `user` | string | User who requested the operation, for example: user@example.com. cloud-dns-system for operations automatically done by the system. (output only) |
| `zoneContext` | OperationManagedZoneContext | Only populated if the operation targeted a ManagedZone (output only). |

### `OperationDnsKeyContext`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `newValue` | DnsKey | The post-operation DnsKey resource. |
| `oldValue` | DnsKey | The pre-operation DnsKey resource. |

### `OperationManagedZoneContext`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `newValue` | ManagedZone | The post-operation ManagedZone resource. |
| `oldValue` | ManagedZone | The pre-operation ManagedZone resource. |

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

### `OutboundEndpoint`

- An OutboundEndpoint is a regional resource to enable outbound forwarding from a private IP range in VPCs to on-premise or other networks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Annotations as key value pairs |
| `createTime` | string (google-datetime) | Output only. \[Output only\] Create time stamp |
| `description` | string | Optional. User provided description. |
| `endpointIp` | string | Optional. Immutable. User provided IP address to use for outbound DNS forwarding. This address must be a free address on the subnetwork. If omitted, a free IP address from the subnetwork is automatically allocated. |
| `labels` | object | Optional. Labels as key value pairs |
| `name` | string | Identifier. The resource name of the OutboundEndpoint. Format: `projects/{project}/locations/{location}/outboundEndpoints/{outboundEndpoint}` |
| `network` | string | Required. Immutable. The VPC network containing the outbound endpoint, specified as full path. |
| `subnetwork` | string | Required. Immutable. The subnetwork holding the endpoint_ip, specified as full path. |
| `tags` | object | Optional. Tag bindings as key value pairs |
| `updateTime` | string (google-datetime) | Output only. \[Output only\] Update time stamp |

### `PoliciesListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. |
| `policies` | array<Policy> | The policy resources. |

### `PoliciesPatchResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | — |

### `PoliciesUpdateResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | — |

### `Policy`

- A policy is a collection of DNS rules applied to one or more Virtual Private Cloud resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alternativeNameServerConfig` | PolicyAlternativeNameServerConfig | Sets an alternative name server for the associated networks. When specified, all DNS queries are forwarded to a name server that you choose. Names such as .internal are not available when an alternative name server is specified. |
| `description` | string | A mutable string of at most 1024 characters associated with this resource for the user's convenience. Has no effect on the policy's function. |
| `dns64Config` | PolicyDns64Config | Configurations related to DNS64 for this policy. |
| `enableInboundForwarding` | boolean | Allows networks bound to this policy to receive DNS queries sent by VMs or applications over VPN connections. When enabled, a virtual IP address is allocated from each of the subnetworks that are bound to this policy. |
| `enableLogging` | boolean | Controls whether logging is enabled for the networks bound to this policy. Defaults to no logging if not set. |
| `id` | string (uint64) | Unique identifier for the resource; defined by the server (output only). |
| `kind` | string | — |
| `name` | string | User-assigned name for this policy. |
| `networks` | array<PolicyNetwork> | List of network names specifying networks to which this policy is applied. |

### `PolicyAlternativeNameServerConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `outboundEndpoints` | array<PolicyAlternativeNameServerConfigOutboundEndpoint> | The list of outbound endpoints to use for queries. |
| `targetNameServers` | array<PolicyAlternativeNameServerConfigTargetNameServer> | Sets an alternative name server for the associated networks. When specified, all DNS queries are forwarded to a name server that you choose. Names such as .internal are not available when an alternative name server is specified. |

### `PolicyAlternativeNameServerConfigOutboundEndpoint`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `name` | string | Specified as a resource path including project and region. This should be formatted like projects/{project}/locations/{location}/outboundEndpoints/{endpoint} |

### `PolicyAlternativeNameServerConfigTargetNameServer`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `forwardingPath` | string enum | Forwarding path for this TargetNameServer. If unset or set to DEFAULT, Cloud DNS makes forwarding decisions based on address ranges; that is, RFC1918 addresses go to the VPC network, non-RFC1918 addresses go to the internet. When set to PRIVATE, Cloud DNS always sends queries through the VPC network for this target. Values: `default`, `private`. |
| `ipv4Address` | string | IPv4 address to forward queries to. |
| `ipv6Address` | string | IPv6 address to forward to. Does not accept both fields (ipv4 & ipv6) being populated. Public preview as of November 2022. |
| `kind` | string | — |

### `PolicyDns64Config`

- DNS64 policies
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `scope` | PolicyDns64ConfigScope | The scope to which DNS64 config will be applied to. |

### `PolicyDns64ConfigScope`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allQueries` | boolean | Controls whether DNS64 is enabled globally for all networks bound to the policy. |
| `kind` | string | — |

### `PolicyNetwork`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `networkUrl` | string | The fully qualified URL of the VPC network to bind to. This should be formatted like https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network} |

### `Project`

- A project resource. The project is a top level container for resources including Cloud DNS ManagedZones. Projects can be created only in the APIs console.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | User assigned unique identifier for the resource (output only). |
| `kind` | string | — |
| `number` | string (uint64) | Unique numeric identifier for the resource; defined by the server (output only). |
| `quota` | Quota | Quotas assigned to this project (output only). |

### `Quota`

- Limits associated with a Project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsKeysPerManagedZone` | integer (int32) | Maximum allowed number of DnsKeys per ManagedZone. |
| `gkeClustersPerManagedZone` | integer (int32) | Maximum allowed number of GKE clusters to which a privately scoped zone can be attached. |
| `gkeClustersPerPolicy` | integer (int32) | Maximum allowed number of GKE clusters per policy. |
| `gkeClustersPerResponsePolicy` | integer (int32) | Maximum allowed number of GKE clusters per response policy. |
| `internetHealthChecksPerManagedZone` | integer (int32) | — |
| `itemsPerRoutingPolicy` | integer (int32) | Maximum allowed number of items per routing policy. |
| `kind` | string | — |
| `managedZones` | integer (int32) | Maximum allowed number of managed zones in the project. |
| `managedZonesPerGkeCluster` | integer (int32) | Maximum allowed number of managed zones which can be attached to a GKE cluster. |
| `managedZonesPerNetwork` | integer (int32) | Maximum allowed number of managed zones which can be attached to a network. |
| `nameserversPerDelegation` | integer (int32) | Maximum number of nameservers per delegation, meant to prevent abuse |
| `networksPerManagedZone` | integer (int32) | Maximum allowed number of networks to which a privately scoped zone can be attached. |
| `networksPerPolicy` | integer (int32) | Maximum allowed number of networks per policy. |
| `networksPerResponsePolicy` | integer (int32) | Maximum allowed number of networks per response policy. |
| `outboundEndpointsPerManagedZone` | integer (int32) | Maximum allowed number of outbound endpoints per managed zone. |
| `outboundEndpointsPerPolicy` | integer (int32) | Maximum allowed number of outbound endpoints per policy. |
| `peeringZonesPerTargetNetwork` | integer (int32) | Maximum allowed number of consumer peering zones per target network owned by this producer project |
| `policies` | integer (int32) | Maximum allowed number of policies per project. |
| `resourceRecordsPerRrset` | integer (int32) | Maximum allowed number of ResourceRecords per ResourceRecordSet. |
| `responsePolicies` | integer (int32) | Maximum allowed number of response policies per project. |
| `responsePolicyRulesPerResponsePolicy` | integer (int32) | Maximum allowed number of rules per response policy. |
| `rrsetAdditionsPerChange` | integer (int32) | Maximum allowed number of ResourceRecordSets to add per ChangesCreateRequest. |
| `rrsetDeletionsPerChange` | integer (int32) | Maximum allowed number of ResourceRecordSets to delete per ChangesCreateRequest. |
| `rrsetsPerManagedZone` | integer (int32) | Maximum allowed number of ResourceRecordSets per zone in the project. |
| `targetNameServersPerManagedZone` | integer (int32) | Maximum allowed number of target name servers per managed forwarding zone. |
| `targetNameServersPerPolicy` | integer (int32) | Maximum allowed number of alternative target name servers per policy. |
| `totalRrdataSizePerChange` | integer (int32) | Maximum allowed size for total rrdata in one ChangesCreateRequest in bytes. |
| `whitelistedKeySpecs` | array<DnsKeySpec> | DNSSEC algorithm and key length types that can be used for DnsKeys. |

### `RRSetRoutingPolicy`

- A RRSetRoutingPolicy represents ResourceRecordSet data that is returned dynamically with the response varying based on configured properties such as geolocation or by weighted random selection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `geo` | RRSetRoutingPolicyGeoPolicy | — |
| `healthCheck` | string | The fully qualified URL of the HealthCheck to use for this RRSetRoutingPolicy. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/healthChecks/{healthCheck}`. https://cloud.google.com/compute/docs/reference/rest/v1/healthChecks |
| `kind` | string | — |
| `primaryBackup` | RRSetRoutingPolicyPrimaryBackupPolicy | — |
| `wrr` | RRSetRoutingPolicyWrrPolicy | — |

### `RRSetRoutingPolicy` (v1beta2)

- A RRSetRoutingPolicy represents ResourceRecordSet data that is returned dynamically with the response varying based on configured properties such as geolocation or by weighted random selection.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `geo` | RRSetRoutingPolicyGeoPolicy | — |
| `geoPolicy` | RRSetRoutingPolicyGeoPolicy | — |
| `healthCheck` | string | The fully qualified URL of the HealthCheck to use for this RRSetRoutingPolicy. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/healthChecks/{healthCheck}`. https://cloud.google.com/compute/docs/reference/rest/v1/healthChecks |
| `kind` | string | — |
| `primaryBackup` | RRSetRoutingPolicyPrimaryBackupPolicy | — |
| `wrr` | RRSetRoutingPolicyWrrPolicy | — |
| `wrrPolicy` | RRSetRoutingPolicyWrrPolicy | — |

### `RRSetRoutingPolicyGeoPolicy`

- Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableFencing` | boolean | Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy. |
| `items` | array<RRSetRoutingPolicyGeoPolicyGeoPolicyItem> | The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead. |
| `kind` | string | — |

### `RRSetRoutingPolicyGeoPolicyGeoPolicyItem`

- ResourceRecordSet data for one geo location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthCheckedTargets` | RRSetRoutingPolicyHealthCheckTargets | For A and AAAA types only. Endpoints to return in the query result only if they are healthy. These can be specified along with `rrdata` within this item. |
| `kind` | string | — |
| `location` | string | The geo-location granularity is a GCP region. This location string should correspond to a GCP region. e.g. "us-east1", "southamerica-east1", "asia-east1", etc. |
| `rrdatas` | array<string> | — |
| `signatureRrdatas` | array<string> | DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item. |

### `RRSetRoutingPolicyHealthCheckTargets`

- HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `externalEndpoints` | array<string> | The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) |
| `internalLoadBalancers` | array<RRSetRoutingPolicyLoadBalancerTarget> | Configuration for internal load balancers to be health checked. |

### `RRSetRoutingPolicyLoadBalancerTarget`

- The configuration for an individual load balancer to health check.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | The frontend IP address of the load balancer to health check. |
| `ipProtocol` | string enum | The protocol of the load balancer to health check. Values: `undefined`, `tcp`, `udp`. |
| `kind` | string | — |
| `loadBalancerType` | string enum | The type of load balancer specified by this target. This value must match the configuration of the load balancer located at the LoadBalancerTarget's IP address, port, and region. Use the following: - \*regionalL4ilb\*: for a regional internal passthrough Network Load Balancer. - \*regionalL7ilb\*: for a regional internal Application Load Balancer. - \*globalL7ilb\*: for a global internal Application Load Balancer. Values: `none`, `globalL7ilb`, `regionalL4ilb`, `regionalL7ilb`. |
| `networkUrl` | string | The fully qualified URL of the network that the load balancer is attached to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`. |
| `port` | string | The configured port of the load balancer. |
| `project` | string | The project ID in which the load balancer is located. |
| `region` | string | The region in which the load balancer is located. |

### `RRSetRoutingPolicyPrimaryBackupPolicy`

- Configures a RRSetRoutingPolicy such that all queries are responded with the primary_targets if they are healthy. And if all of them are unhealthy, then we fallback to a geo localized policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupGeoTargets` | RRSetRoutingPolicyGeoPolicy | Backup targets provide a regional failover policy for the otherwise global primary targets. If serving state is set to `BACKUP`, this policy essentially becomes a geo routing policy. |
| `kind` | string | — |
| `primaryTargets` | RRSetRoutingPolicyHealthCheckTargets | Endpoints that are health checked before making the routing decision. Unhealthy endpoints are omitted from the results. If all endpoints are unhealthy, we serve a response based on the `backup_geo_targets`. |
| `trickleTraffic` | number (double) | When serving state is `PRIMARY`, this field provides the option of sending a small percentage of the traffic to the backup targets. |

### `RRSetRoutingPolicyWrrPolicy`

- Configures a RRSetRoutingPolicy that routes in a weighted round robin fashion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<RRSetRoutingPolicyWrrPolicyWrrPolicyItem> | — |
| `kind` | string | — |

### `RRSetRoutingPolicyWrrPolicyWrrPolicyItem`

- A routing block which contains the routing information for one WRR item.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `healthCheckedTargets` | RRSetRoutingPolicyHealthCheckTargets | Endpoints that are health checked before making the routing decision. The unhealthy endpoints are omitted from the result. If all endpoints within a bucket are unhealthy, we choose a different bucket (sampled with respect to its weight) for responding. If DNSSEC is enabled for this zone, only one of `rrdata` or `health_checked_targets` can be set. |
| `kind` | string | — |
| `rrdatas` | array<string> | — |
| `signatureRrdatas` | array<string> | DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item. |
| `weight` | number (double) | The weight corresponding to this `WrrPolicyItem` object. When multiple `WrrPolicyItem` objects are configured, the probability of returning an `WrrPolicyItem` object's data is proportional to its weight relative to the sum of weights configured for all items. This weight must be non-negative. |

### `ResourceRecordSet`

- A unit of data that is returned by the DNS servers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `name` | string | For example, www.example.com. |
| `routingPolicy` | RRSetRoutingPolicy | Configures dynamic query responses based on either the geo location of the querying user or a weighted round robin based routing policy. A valid `ResourceRecordSet` contains only `rrdata` (for static resolution) or a `routing_policy` (for dynamic resolution). |
| `rrdatas` | array<string> | As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples. |
| `signatureRrdatas` | array<string> | — |
| `ttl` | integer (int32) | Number of seconds that this `ResourceRecordSet` can be cached by resolvers. |
| `type` | string | The identifier of a supported record type. See the list of Supported DNS record types. |

### `ResourceRecordSetsDeleteResponse`

-
- Version: v1

### `ResourceRecordSetsListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. |
| `rrsets` | array<ResourceRecordSet> | The resource record set resources. |

### `ResponsePoliciesListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. |
| `responsePolicies` | array<ResponsePolicy> | The Response Policy resources. |

### `ResponsePoliciesPatchResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `responsePolicy` | ResponsePolicy | — |

### `ResponsePoliciesUpdateResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `responsePolicy` | ResponsePolicy | — |

### `ResponsePolicy`

- A Response Policy is a collection of selectors that apply to queries made against one or more Virtual Private Cloud networks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | User-provided description for this Response Policy. |
| `gkeClusters` | array<ResponsePolicyGKECluster> | The list of Google Kubernetes Engine clusters to which this response policy is applied. |
| `id` | string (int64) | Unique identifier for the resource; defined by the server (output only). |
| `kind` | string | — |
| `labels` | object | User labels. |
| `networks` | array<ResponsePolicyNetwork> | List of network names specifying networks to which this policy is applied. |
| `responsePolicyName` | string | User assigned name for this Response Policy. |

### `ResponsePolicyGKECluster`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gkeClusterName` | string | The resource name of the cluster to bind this response policy to. This should be specified in the format like: projects/\*/locations/\*/clusters/\*. This is referenced from GKE projects.locations.clusters.get API: https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/get |
| `kind` | string | — |

### `ResponsePolicyNetwork`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | — |
| `networkUrl` | string | The fully qualified URL of the VPC network to bind to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}` |

### `ResponsePolicyRule`

- A Response Policy Rule is a selector that applies its behavior to queries that match the selector. Selectors are DNS names, which may be wildcards or exact matches. Each DNS query subject to a Response Policy matches at most one ResponsePolicyRule, as identified by the dns_name field with the longest matching suffix.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `behavior` | string enum | Answer this query with a behavior rather than DNS data. Values: `behaviorUnspecified`, `bypassResponsePolicy`. |
| `dnsName` | string | The DNS name (wildcard or exact) to apply this rule to. Must be unique within the Response Policy Rule. |
| `kind` | string | — |
| `localData` | ResponsePolicyRuleLocalData | Answer this query directly with DNS data. These ResourceRecordSets override any other DNS behavior for the matched name; in particular they override private zones, the public internet, and GCP internal DNS. No SOA nor NS types are allowed. |
| `ruleName` | string | An identifier for this rule. Must be unique with the ResponsePolicy. |

### `ResponsePolicyRuleLocalData`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `localDatas` | array<ResourceRecordSet> | All resource record sets for this selector, one per resource record type. The name must match the dns_name. |

### `ResponsePolicyRulesListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | This field indicates that more results are available beyond the last page displayed. To fetch the results, make another list request and use this value as your page token. This lets you retrieve the complete contents of a very large collection one page at a time. However, if the contents of the collection change between the first and last paginated list request, the set of all elements returned are an inconsistent view of the collection. You can't retrieve a consistent snapshot of a collection larger than the maximum page size. |
| `responsePolicyRules` | array<ResponsePolicyRule> | The Response Policy Rule resources. |

### `ResponsePolicyRulesPatchResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `responsePolicyRule` | ResponsePolicyRule | — |

### `ResponsePolicyRulesUpdateResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `responsePolicyRule` | ResponsePolicyRule | — |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### Shape of `Change`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "additions": "array<ResourceRecordSet>",
  "deletions": "array<ResourceRecordSet>",
  "id": "string",
  "isServing": "boolean",
  "kind": "string",
  "startTime": "string",
  "status": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2 of `dns` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://dns.googleapis.com/$discovery/rest?version=v1, https://dns.googleapis.com/$discovery/rest?version=v1beta2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
