---
source: https://certificatemanager.googleapis.com/$discovery/rest?version=v1
---

# Certificate Manager API message schemas (certificatemanager)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/certificatemanager/`.

### `AllowlistedCertificate`

- Defines an allowlisted certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pemCertificate` | string | Required. PEM certificate that is allowlisted. The certificate can be up to 5k bytes, and must be a parseable X.509 certificate. |

### `AuthorizationAttemptInfo`

- State of the latest attempt to authorize a domain for certificate issuance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attemptTime` | string (google-datetime) | Output only. The timestamp, when the authorization attempt was made. |
| `details` | string | Output only. Human readable explanation for reaching the state. Provided to help address the configuration issues. Not guaranteed to be stable. For programmatic access use FailureReason enum. |
| `domain` | string | Output only. Domain name of the authorization attempt. |
| `failureReason` | string enum | Output only. Reason for failure of the authorization attempt for the domain. Values: `FAILURE_REASON_UNSPECIFIED`, `CONFIG`, `CAA`, `RATE_LIMITED`. |
| `state` | string enum | Output only. State of the domain for managed certificate issuance. Values: `STATE_UNSPECIFIED`, `AUTHORIZING`, `AUTHORIZED`, `FAILED`. |
| `troubleshooting` | Troubleshooting | Output only. Troubleshooting information for the authorization attempt. This field is only populated if the authorization attempt failed. |

### `CNAME`

- CNAME troubleshooting information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expectedData` | string | Output only. The expected value of the CNAME record for the domain, equals to `dns_resource_record.data` in the corresponding `DnsAuthorization`. |
| `name` | string | Output only. The name of the CNAME record for the domain, equals to `dns_resource_record.name` in the corresponding `DnsAuthorization`. |
| `resolvedData` | array<string> | Output only. The resolved CNAME chain. Empty list if the CNAME record for `CNAME.name` is not found. Otherwise the first item is the value of the CNAME record for `CNAME.name`. If the CNAME chain is longer, the second item is the value of the CNAME record for the first item, and so on. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `Certificate`

- Defines TLS certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation timestamp of a Certificate. |
| `description` | string | Optional. One or more paragraphs of text description of a certificate. |
| `expireTime` | string (google-datetime) | Output only. The expiry timestamp of a Certificate. |
| `labels` | object | Optional. Set of labels associated with a Certificate. |
| `managed` | ManagedCertificate | If set, contains configuration and state of a managed certificate. |
| `managedIdentity` | ManagedIdentityCertificate | If set, contains configuration and state of a managed identity certificate. |
| `name` | string | Identifier. A user-defined name of the certificate. Certificate names must be unique globally and match pattern `projects/*/locations/*/certificates/*`. |
| `pemCertificate` | string | Output only. The PEM-encoded certificate chain. |
| `sanDnsnames` | array<string> | Output only. The list of Subject Alternative Names of dnsName type defined in the certificate (see RFC 5280 4.2.1.6). Managed certificates that haven't been provisioned yet have this field populated with a value of the managed.domains field. |
| `scope` | string enum | Optional. Immutable. The scope of the certificate. Values: `DEFAULT`, `EDGE_CACHE`, `ALL_REGIONS`, `CLIENT_AUTH`. |
| `selfManaged` | SelfManagedCertificate | If set, defines data of a self-managed certificate. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of a Certificate. |
| `usedBy` | array<UsedBy> | Output only. The list of resources that use this Certificate. |

### `CertificateAuthorityConfig`

- The CA that issues the workload certificate. It includes CA address, type, authentication to CA service, etc.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateAuthorityServiceConfig` | CertificateAuthorityServiceConfig | Defines a CertificateAuthorityServiceConfig. |

### `CertificateAuthorityServiceConfig`

- Contains information required to contact CA service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caPool` | string | Required. A CA pool resource used to issue a certificate. The CA pool string has a relative resource path following the form "projects/{project}/locations/{location}/caPools/{ca_pool}". |

### `CertificateIssuanceConfig`

- CertificateIssuanceConfig specifies how to issue and manage a certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateAuthorityConfig` | CertificateAuthorityConfig | Required. The CA that issues the workload certificate. It includes the CA address, type, authentication to CA service, etc. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp of a CertificateIssuanceConfig. |
| `description` | string | Optional. One or more paragraphs of text description of a CertificateIssuanceConfig. |
| `keyAlgorithm` | string enum | Required. The key algorithm to use when generating the private key. Values: `KEY_ALGORITHM_UNSPECIFIED`, `RSA_2048`, `ECDSA_P256`. |
| `labels` | object | Optional. Set of labels associated with a CertificateIssuanceConfig. |
| `lifetime` | string (google-duration) | Required. Workload certificate lifetime requested. |
| `name` | string | Identifier. A user-defined name of the certificate issuance config. CertificateIssuanceConfig names must be unique globally and match pattern `projects/*/locations/*/certificateIssuanceConfigs/*`. |
| `rotationWindowPercentage` | integer (int32) | Required. Specifies the percentage of elapsed time of the certificate lifetime to wait before renewing the certificate. Must be a number between 1-99, inclusive. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of a CertificateIssuanceConfig. |

### `CertificateMap`

- Defines a collection of certificate configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation timestamp of a Certificate Map. |
| `description` | string | Optional. One or more paragraphs of text description of a certificate map. |
| `gclbTargets` | array<GclbTarget> | Output only. A list of GCLB targets that use this Certificate Map. A Target Proxy is only present on this list if it's attached to a Forwarding Rule. |
| `labels` | object | Optional. Set of labels associated with a Certificate Map. |
| `name` | string | Identifier. A user-defined name of the Certificate Map. Certificate Map names must be unique globally and match pattern `projects/*/locations/*/certificateMaps/*`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `updateTime` | string (google-datetime) | Output only. The update timestamp of a Certificate Map. |

### `CertificateMapEntry`

- Defines a certificate map entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificates` | array<string> | Optional. A set of Certificates defines for the given `hostname`. There can be defined up to four certificates in each Certificate Map Entry. Each certificate must match pattern `projects/*/locations/*/certificates/*`. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp of a Certificate Map Entry. |
| `description` | string | Optional. One or more paragraphs of text description of a certificate map entry. |
| `hostname` | string | A Hostname (FQDN, e.g. `example.com`) or a wildcard hostname expression (`*.example.com`) for a set of hostnames with common suffix. Used as Server Name Indication (SNI) for selecting a proper certificate. |
| `labels` | object | Optional. Set of labels associated with a Certificate Map Entry. |
| `matcher` | string enum | A predefined matcher for particular cases, other than SNI selection. Values: `MATCHER_UNSPECIFIED`, `PRIMARY`. |
| `name` | string | Identifier. A user-defined name of the Certificate Map Entry. Certificate Map Entry names must be unique globally and match pattern `projects/*/locations/*/certificateMaps/*/certificateMapEntries/*`. |
| `state` | string enum | Output only. A serving state of this Certificate Map Entry. Values: `SERVING_STATE_UNSPECIFIED`, `ACTIVE`, `PENDING`. |
| `updateTime` | string (google-datetime) | Output only. The update timestamp of a Certificate Map Entry. |

### `DnsAuthorization`

- A DnsAuthorization resource describes a way to perform domain authorization for certificate issuance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation timestamp of a DnsAuthorization. |
| `description` | string | Optional. One or more paragraphs of text description of a DnsAuthorization. |
| `dnsResourceRecord` | DnsResourceRecord | Output only. DNS Resource Record that needs to be added to DNS configuration. |
| `domain` | string | Required. Immutable. A domain that is being authorized. A DnsAuthorization resource covers a single domain and its wildcard, e.g. authorization for `example.com` can be used to issue certificates for `example.com` and `*.example.com`. |
| `labels` | object | Optional. Set of labels associated with a DnsAuthorization. |
| `name` | string | Identifier. A user-defined name of the dns authorization. DnsAuthorization names must be unique globally and match pattern `projects/*/locations/*/dnsAuthorizations/*`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `type` | string enum | Optional. Immutable. Type of DnsAuthorization. If unset during resource creation the following default will be used: - in location `global`: FIXED_RECORD, - in other locations: PER_PROJECT_RECORD. Values: `TYPE_UNSPECIFIED`, `FIXED_RECORD`, `PER_PROJECT_RECORD`. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of a DnsAuthorization. |

### `DnsResourceRecord`

- The structure describing the DNS Resource Record that needs to be added to DNS configuration for the authorization to be usable by certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | string | Output only. Data of the DNS Resource Record. |
| `name` | string | Output only. Fully qualified name of the DNS Resource Record. e.g. `_acme-challenge.example.com` |
| `type` | string | Output only. Type of the DNS Resource Record. Currently always set to "CNAME". |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `GclbTarget`

- Describes a Target Proxy that uses this Certificate Map.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipConfigs` | array<IpConfig> | Output only. IP configurations for this Target Proxy where the Certificate Map is serving. |
| `targetHttpsProxy` | string | Output only. This field returns the resource name in the following format: `//compute.googleapis.com/projects/*/global/targetHttpsProxies/*`. |
| `targetSslProxy` | string | Output only. This field returns the resource name in the following format: `//compute.googleapis.com/projects/*/global/targetSslProxies/*`. |

### `IPs`

- IPs troubleshooting information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resolved` | array<string> | Output only. The list of IP addresses resolved from the domain's A/AAAA records. Can contain both ipv4 and ipv6 addresses. |
| `serving` | array<string> | Output only. The list of IP addresses, where the certificate is attached and port 443 is open. |
| `servingOnAltPorts` | array<string> | Output only. The list of IP addresses, where the certificate is attached, but port 443 is not open. |

### `IntermediateCA`

- Defines an intermediate CA.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pemCertificate` | string | PEM intermediate certificate used for building up paths for validation. Each certificate provided in PEM format may occupy up to 5kB. |

### `IpConfig`

- Defines IP configuration where this Certificate Map is serving.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | Output only. An external IP address. |
| `ports` | array<integer> | Output only. Ports. |

### `ListCertificateIssuanceConfigsResponse`

- Response for the `ListCertificateIssuanceConfigs` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateIssuanceConfigs` | array<CertificateIssuanceConfig> | A list of certificate configs for the parent resource. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListCertificateMapEntriesResponse`

- Response for the `ListCertificateMapEntries` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateMapEntries` | array<CertificateMapEntry> | A list of certificate map entries for the parent resource. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListCertificateMapsResponse`

- Response for the `ListCertificateMaps` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateMaps` | array<CertificateMap> | A list of certificate maps for the parent resource. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListCertificatesResponse`

- Response for the `ListCertificates` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificates` | array<Certificate> | A list of certificates for the parent resource. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | A list of locations that could not be reached. |

### `ListDnsAuthorizationsResponse`

- Response for the `ListDnsAuthorizations` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsAuthorizations` | array<DnsAuthorization> | A list of dns authorizations for the parent resource. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Locations that could not be reached. |

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

### `ListTrustConfigsResponse`

- Response for the `ListTrustConfigs` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `trustConfigs` | array<TrustConfig> | A list of TrustConfigs for the parent resource. |
| `unreachable` | array<string> | Locations that could not be reached. |

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

### `ManagedCertificate`

- Configuration and state of a Managed Certificate. Certificate Manager provisions and renews Managed Certificates automatically, for as long as it's authorized to do so.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationAttemptInfo` | array<AuthorizationAttemptInfo> | Output only. Detailed state of the latest authorization attempt for each domain specified for managed certificate resource. |
| `dnsAuthorizations` | array<string> | Optional. Immutable. Authorizations that will be used for performing domain authorization. |
| `domains` | array<string> | Optional. Immutable. The domains for which a managed SSL certificate will be generated. Wildcard domains are only supported with DNS challenge resolution. |
| `issuanceConfig` | string | Optional. Immutable. The resource name for a CertificateIssuanceConfig used to configure private PKI certificates in the format `projects/*/locations/*/certificateIssuanceConfigs/*`. If this field is not set, the certificates will instead be publicly signed as documented at https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs#caa. |
| `provisioningIssue` | ProvisioningIssue | Output only. Information about issues with provisioning a Managed Certificate. |
| `state` | string enum | Output only. State of the managed certificate resource. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `FAILED`, `ACTIVE`. |

### `ManagedIdentityCertificate`

- Configuration and state of a Managed Identity Certificate. Certificate Manager provisions and renews Managed Identity Certificates automatically, for as long as it's authorized to do so.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `identity` | string | Required. Immutable. SPIFFE ID of the Managed Identity used for this certificate. |
| `provisioningIssue` | ProvisioningIssue | Output only. Information about issues with provisioning a managed certificate. |
| `state` | string enum | Output only. State of the managed certificate resource. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `FAILED`, `ACTIVE`. |

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
| `requestedCancellation` | boolean | Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Human-readable status of the operation, if any. |
| `target` | string | Server-defined resource path for the target of the operation. |
| `verb` | string | Name of the verb executed by the operation. |

### `ProvisioningIssue`

- Information about issues with provisioning a Managed Certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | string | Output only. Human readable explanation about the issue. Provided to help address the configuration issues. Not guaranteed to be stable. For programmatic access use Reason enum. |
| `reason` | string enum | Output only. Reason for provisioning failures. Values: `REASON_UNSPECIFIED`, `AUTHORIZATION_ISSUE`, `RATE_LIMITED`. |

### `SelfManagedCertificate`

- Certificate data for a SelfManaged Certificate. SelfManaged Certificates are uploaded by the user. Updating such certificates before they expire remains the user's responsibility.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pemCertificate` | string | Optional. Input only. The PEM-encoded certificate chain. Leaf certificate comes first, followed by intermediate ones if any. |
| `pemPrivateKey` | string | Optional. Input only. The PEM-encoded private key of the leaf certificate. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Troubleshooting`

- Troubleshooting information for the authorization attempt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cname` | CNAME | Output only. CNAME troubleshooting information. |
| `ips` | IPs | Output only. IPs troubleshooting information. |
| `issues` | array<string> | Output only. The list of issues discovered during the authorization attempt. Values: `ISSUE_UNSPECIFIED`, `CNAME_MISMATCH`, `RESOLVED_TO_NOT_SERVING`, `RESOLVED_TO_SERVING_ON_ALT_PORTS`, `NO_RESOLVED_IPS`, `CERTIFICATE_NOT_ATTACHED`. |

### `TrustAnchor`

- Defines a trust anchor.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pemCertificate` | string | PEM root certificate of the PKI used for validation. Each certificate provided in PEM format may occupy up to 5kB. |

### `TrustConfig`

- Defines a trust config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowlistedCertificates` | array<AllowlistedCertificate> | Optional. A certificate matching an allowlisted certificate is always considered valid as long as the certificate is parseable, proof of private key possession is established, and constraints on the certificate's SAN field are met. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp of a TrustConfig. |
| `description` | string | Optional. One or more paragraphs of text description of a TrustConfig. |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. Set of labels associated with a TrustConfig. |
| `name` | string | Identifier. A user-defined name of the trust config. TrustConfig names must be unique globally and match pattern `projects/*/locations/*/trustConfigs/*`. |
| `spiffeTrustStores` | object | Optional. Defines a mapping from a trust domain to a TrustStore. This is used for SPIFFE certificate validation. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `trustStores` | array<TrustStore> | Optional. Set of trust stores to perform validation against. This field is supported when TrustConfig is configured with Load Balancers, currently not supported for SPIFFE certificate validation. Only one TrustStore specified is currently allowed. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of a TrustConfig. |

### `TrustStore`

- Defines a trust store.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `intermediateCas` | array<IntermediateCA> | Optional. Set of intermediate CA certificates used for the path building phase of chain validation. The field is currently not supported if TrustConfig is used for the workload certificate feature. |
| `trustAnchors` | array<TrustAnchor> | Optional. List of Trust Anchors to be used while performing validation against a given TrustStore. |

### `UsedBy`

- Defines a resource that uses the certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. Full name of the resource https://google.aip.dev/122#full-resource-names, e.g. `//certificatemanager.googleapis.com/projects/*/locations/*/certificateMaps/*/certificateMapEntries/*` or `//compute.googleapis.com/projects/*/locations/*/targetHttpsProxies/*`. |

### Shape of `AllowlistedCertificate`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "pemCertificate": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `certificatemanager` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://certificatemanager.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
