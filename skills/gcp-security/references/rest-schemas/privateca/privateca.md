---
source: https://privateca.googleapis.com/$discovery/rest?version=v1
---

# Certificate Authority API message schemas (privateca)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/privateca/`.

### `AccessUrls`

- URLs where a CertificateAuthority will publish content.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caCertificateAccessUrl` | string | The URL where this CertificateAuthority's CA certificate is published. This will only be set for CAs that have been activated. |
| `crlAccessUrls` | array<string> | The URLs where this CertificateAuthority's CRLs are published. This will only be set for CAs that have been activated. |

### `ActivateCertificateAuthorityRequest`

- Request message for CertificateAuthorityService.ActivateCertificateAuthority.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pemCaCertificate` | string | Required. The signed CA certificate issued from FetchCertificateAuthorityCsrResponse.pem_csr. |
| `requestId` | string | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `subordinateConfig` | SubordinateConfig | Required. Must include information about the issuer of 'pem_ca_certificate', and any further issuers until the self-signed CA. |

### `AllowedKeyType`

- Describes a "type" of key that may be used in a Certificate issued from a CaPool. Note that a single AllowedKeyType may refer to either a fully-qualified key algorithm, such as RSA 4096, or a family of key algorithms, such as any RSA key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ellipticCurve` | EcKeyType | Represents an allowed Elliptic Curve key type. |
| `rsa` | RsaKeyType | Represents an allowed RSA key type. |

### `AttributeTypeAndValue`

- AttributeTypeAndValue specifies an attribute type and value. It can use either a OID or enum value to specify the attribute type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `objectId` | ObjectId | Object ID for an attribute type of an attribute and value pair. |
| `type` | string enum | The attribute type of the attribute and value pair. Values: `ATTRIBUTE_TYPE_UNSPECIFIED`, `COMMON_NAME`, `COUNTRY_CODE`, `ORGANIZATION`, `ORGANIZATIONAL_UNIT`, `LOCALITY`, `PROVINCE`, `STREET_ADDRESS`, `POSTAL_CODE`. |
| `value` | string | The value for the attribute type. |

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
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CaOptions`

- Describes the X.509 basic constraints extension, per RFC 5280 section 4.2.1.9 (https://tools.ietf.org/html/rfc5280#section-4.2.1.9)
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isCa` | boolean | Optional. Refers to the "CA" boolean field in the X.509 extension. When this value is missing, the basic constraints extension will be omitted from the certificate. |
| `maxIssuerPathLength` | integer (int32) | Optional. Refers to the path length constraint field in the X.509 extension. For a CA certificate, this value describes the depth of subordinate CA certificates that are allowed. If this value is less than 0, the request will fail. If this value is missing, the max path length will be omitted from the certificate. |

### `CaPool`

- A CaPool represents a group of CertificateAuthorities that form a trust anchor. A CaPool can be used to manage issuance policies for one or more CertificateAuthority resources and to rotate CA certificates in and out of the trust anchor.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptionSpec` | EncryptionSpec | Optional. When EncryptionSpec is provided, the Subject, SubjectAltNames, and the PEM-encoded certificate fields will be encrypted at rest. |
| `issuancePolicy` | IssuancePolicy | Optional. The IssuancePolicy to control how Certificates will be issued from this CaPool. |
| `labels` | object | Optional. Labels with user-defined metadata. |
| `name` | string | Identifier. The resource name for this CaPool in the format `projects/*/locations/*/caPools/*`. |
| `publishingOptions` | PublishingOptions | Optional. The PublishingOptions to follow when issuing Certificates from any CertificateAuthority in this CaPool. |
| `tier` | string enum | Required. Immutable. The Tier of this CaPool. Values: `TIER_UNSPECIFIED`, `ENTERPRISE`, `DEVOPS`. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CertChain`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificates` | array<string> | The certificates that form the CA chain, from leaf to root order. |

### `Certificate`

- A Certificate corresponds to a signed X.509 certificate issued by a CertificateAuthority.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateDescription` | CertificateDescription | Output only. A structured description of the issued X.509 certificate. |
| `certificateTemplate` | string | Immutable. The resource name for a CertificateTemplate used to issue this certificate, in the format `projects/*/locations/*/certificateTemplates/*`. If this is specified, the caller must have the necessary permission to use this template. If this is omitted, no template will be used. This template must be in the same location as the Certificate. |
| `config` | CertificateConfig | Immutable. A description of the certificate and key that does not require X.509 or ASN.1. |
| `createTime` | string (google-datetime) | Output only. The time at which this Certificate was created. |
| `issuerCertificateAuthority` | string | Output only. The resource name of the issuing CertificateAuthority in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`. |
| `labels` | object | Optional. Labels with user-defined metadata. |
| `lifetime` | string (google-duration) | Required. Immutable. The desired lifetime of a certificate. Used to create the "not_before_time" and "not_after_time" fields inside an X.509 certificate. Note that the lifetime may be truncated if it would extend past the life of any certificate authority in the issuing chain. |
| `name` | string | Identifier. The resource name for this Certificate in the format `projects/*/locations/*/caPools/*/certificates/*`. |
| `pemCertificate` | string | Output only. The pem-encoded, signed X.509 certificate. |
| `pemCertificateChain` | array<string> | Output only. The chain that may be used to verify the X.509 certificate. Expected to be in issuer-to-root order according to RFC 5246. |
| `pemCsr` | string | Immutable. A pem-encoded X.509 certificate signing request (CSR). |
| `requestedNotBeforeTime` | string (google-datetime) | Optional. The requested not_before_time of this Certificate. This field may only be set if the CaPool.IssuancePolicy.allow_requester_specified_not_before_time field is set to true for the issuing CaPool. If this field is specified, the certificate will be issued with this 'not_before_time'. If this is not specified, the 'not_before_time' will be set to the issuance time or issuance time minus backdate_duration depending on the CaPool configuration. |
| `revocationDetails` | RevocationDetails | Output only. Details regarding the revocation of this Certificate. This Certificate is considered revoked if and only if this field is present. |
| `subjectMode` | string enum | Immutable. Specifies how the Certificate's identity fields are to be decided. If this is omitted, the `DEFAULT` subject mode will be used. Values: `SUBJECT_REQUEST_MODE_UNSPECIFIED`, `DEFAULT`, `RDN_SEQUENCE`, `REFLECTED_SPIFFE`. |
| `updateTime` | string (google-datetime) | Output only. The time at which this Certificate was updated. |

### `CertificateAuthority`

- A CertificateAuthority represents an individual Certificate Authority. A CertificateAuthority can be used to create Certificates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessUrls` | AccessUrls | Output only. URLs for accessing content published by this CA, such as the CA certificate and CRLs. |
| `caCertificateDescriptions` | array<CertificateDescription> | Output only. A structured description of this CertificateAuthority's CA certificate and its issuers. Ordered as self-to-root. |
| `config` | CertificateConfig | Required. Immutable. The config used to create a self-signed X.509 certificate or CSR. |
| `createTime` | string (google-datetime) | Output only. The time at which this CertificateAuthority was created. |
| `deleteTime` | string (google-datetime) | Output only. The time at which this CertificateAuthority was soft deleted, if it is in the DELETED state. |
| `expireTime` | string (google-datetime) | Output only. The time at which this CertificateAuthority will be permanently purged, if it is in the DELETED state. |
| `gcsBucket` | string | Immutable. The name of a Cloud Storage bucket where this CertificateAuthority will publish content, such as the CA certificate and CRLs. This must be a bucket name, without any prefixes (such as `gs://`) or suffixes (such as `.googleapis.com`). For example, to use a bucket named `my-bucket`, you would simply specify `my-bucket`. If not specified, a managed bucket will be created. |
| `keySpec` | KeyVersionSpec | Required. Immutable. Used when issuing certificates for this CertificateAuthority. If this CertificateAuthority is a self-signed CertificateAuthority, this key is also used to sign the self-signed CA certificate. Otherwise, it is used to sign a CSR. |
| `labels` | object | Optional. Labels with user-defined metadata. |
| `lifetime` | string (google-duration) | Required. Immutable. The desired lifetime of the CA certificate. Used to create the "not_before_time" and "not_after_time" fields inside an X.509 certificate. |
| `name` | string | Identifier. The resource name for this CertificateAuthority in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`. |
| `pemCaCertificates` | array<string> | Output only. This CertificateAuthority's certificate chain, including the current CertificateAuthority's certificate. Ordered such that the root issuer is the final element (consistent with RFC 5246). For a self-signed CA, this will only list the current CertificateAuthority's certificate. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `state` | string enum | Output only. The State for this CertificateAuthority. Values: `STATE_UNSPECIFIED`, `ENABLED`, `DISABLED`, `STAGED`, `AWAITING_USER_ACTIVATION`, `DELETED`. |
| `subordinateConfig` | SubordinateConfig | Optional. If this is a subordinate CertificateAuthority, this field will be set with the subordinate configuration, which describes its issuers. This may be updated, but this CertificateAuthority must continue to validate. |
| `tier` | string enum | Output only. The CaPool.Tier of the CaPool that includes this CertificateAuthority. Values: `TIER_UNSPECIFIED`, `ENTERPRISE`, `DEVOPS`. |
| `type` | string enum | Required. Immutable. The Type of this CertificateAuthority. Values: `TYPE_UNSPECIFIED`, `SELF_SIGNED`, `SUBORDINATE`. |
| `updateTime` | string (google-datetime) | Output only. The time at which this CertificateAuthority was last updated. |
| `userDefinedAccessUrls` | UserDefinedAccessUrls | Optional. User-defined URLs for CA certificate and CRLs. The service does not publish content to these URLs. It is up to the user to mirror content to these URLs. |

### `CertificateConfig`

- A CertificateConfig describes an X.509 certificate or CSR that is to be created, as an alternative to using ASN.1.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `publicKey` | PublicKey | Optional. The public key that corresponds to this config. This is, for example, used when issuing Certificates, but not when creating a self-signed CertificateAuthority or CertificateAuthority CSR. |
| `subjectConfig` | SubjectConfig | Required. Specifies some of the values in a certificate that are related to the subject. |
| `subjectKeyId` | CertificateConfigKeyId | Optional. When specified this provides a custom SKI to be used in the certificate. This should only be used to maintain a SKI of an existing CA originally created outside CA service, which was not generated using method (1) described in RFC 5280 section 4.2.1.2. |
| `x509Config` | X509Parameters | Required. Describes how some of the technical X.509 fields in a certificate should be populated. |

### `CertificateConfigKeyId`

- A KeyId identifies a specific public key, usually by hashing the public key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyId` | string | Required. The value of this KeyId encoded in lowercase hexadecimal. This is most likely the 160 bit SHA-1 hash of the public key. |

### `CertificateDescription`

- A CertificateDescription describes an X.509 certificate or CSR that has been issued, as an alternative to using ASN.1 / X.509.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aiaIssuingCertificateUrls` | array<string> | Describes lists of issuer CA certificate URLs that appear in the "Authority Information Access" extension in the certificate. |
| `authorityKeyId` | KeyId | Identifies the subject_key_id of the parent certificate, per https://tools.ietf.org/html/rfc5280#section-4.2.1.1 |
| `certFingerprint` | CertificateFingerprint | The hash of the x.509 certificate. |
| `crlDistributionPoints` | array<string> | Describes a list of locations to obtain CRL information, i.e. the DistributionPoint.fullName described by https://tools.ietf.org/html/rfc5280#section-4.2.1.13 |
| `publicKey` | PublicKey | The public key that corresponds to an issued certificate. |
| `subjectDescription` | SubjectDescription | Describes some of the values in a certificate that are related to the subject and lifetime. |
| `subjectKeyId` | KeyId | Provides a means of identifiying certificates that contain a particular public key, per https://tools.ietf.org/html/rfc5280#section-4.2.1.2. |
| `tbsCertificateDigest` | string | The hash of the pre-signed certificate, which will be signed by the CA. Corresponds to the TBS Certificate in https://tools.ietf.org/html/rfc5280#section-4.1.2. The field will always be populated. |
| `x509Description` | X509Parameters | Describes some of the technical X.509 fields in a certificate. |

### `CertificateExtensionConstraints`

- Describes a set of X.509 extensions that may be part of some certificate issuance controls.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalExtensions` | array<ObjectId> | Optional. A set of ObjectIds identifying custom X.509 extensions. Will be combined with known_extensions to determine the full set of X.509 extensions. |
| `knownExtensions` | array<string> | Optional. A set of named X.509 extensions. Will be combined with additional_extensions to determine the full set of X.509 extensions. Values: `KNOWN_CERTIFICATE_EXTENSION_UNSPECIFIED`, `BASE_KEY_USAGE`, `EXTENDED_KEY_USAGE`, `CA_OPTIONS`, `POLICY_IDS`, `AIA_OCSP_SERVERS`, `NAME_CONSTRAINTS`. |

### `CertificateFingerprint`

- A group of fingerprints for the x509 certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sha256Hash` | string | The SHA 256 hash, encoded in hexadecimal, of the DER x509 certificate. |

### `CertificateIdentityConstraints`

- Describes constraints on a Certificate's Subject and SubjectAltNames.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowSubjectAltNamesPassthrough` | boolean | Required. If this is true, the SubjectAltNames extension may be copied from a certificate request into the signed certificate. Otherwise, the requested SubjectAltNames will be discarded. |
| `allowSubjectPassthrough` | boolean | Required. If this is true, the Subject field may be copied from a certificate request into the signed certificate. Otherwise, the requested Subject will be discarded. |
| `celExpression` | Expr | Optional. A CEL expression that may be used to validate the resolved X.509 Subject and/or Subject Alternative Name before a certificate is signed. To see the full allowed syntax and some examples, see https://cloud.google.com/certificate-authority-service/docs/using-cel |

### `CertificateRevocationList`

- A CertificateRevocationList corresponds to a signed X.509 certificate Revocation List (CRL). A CRL contains the serial numbers of certificates that should no longer be trusted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessUrl` | string | Output only. The location where 'pem_crl' can be accessed. |
| `createTime` | string (google-datetime) | Output only. The time at which this CertificateRevocationList was created. |
| `labels` | object | Optional. Labels with user-defined metadata. |
| `name` | string | Identifier. The resource name for this CertificateRevocationList in the format `projects/*/locations/*/caPools/*certificateAuthorities/*/ certificateRevocationLists/*`. |
| `pemCrl` | string | Output only. The PEM-encoded X.509 CRL. |
| `revisionId` | string | Output only. The revision ID of this CertificateRevocationList. A new revision is committed whenever a new CRL is published. The format is an 8-character hexadecimal string. |
| `revokedCertificates` | array<RevokedCertificate> | Output only. The revoked serial numbers that appear in pem_crl. |
| `sequenceNumber` | string (int64) | Output only. The CRL sequence number that appears in pem_crl. |
| `state` | string enum | Output only. The State for this CertificateRevocationList. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `SUPERSEDED`. |
| `updateTime` | string (google-datetime) | Output only. The time at which this CertificateRevocationList was updated. |

### `CertificateTemplate`

- A CertificateTemplate refers to a managed template for certificate issuance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which this CertificateTemplate was created. |
| `description` | string | Optional. A human-readable description of scenarios this template is intended for. |
| `identityConstraints` | CertificateIdentityConstraints | Optional. Describes constraints on identities that may be appear in Certificates issued using this template. If this is omitted, then this template will not add restrictions on a certificate's identity. |
| `labels` | object | Optional. Labels with user-defined metadata. |
| `maximumLifetime` | string (google-duration) | Optional. The maximum lifetime allowed for issued Certificates that use this template. If the issuing CaPool resource's IssuancePolicy specifies a maximum_lifetime the minimum of the two durations will be the maximum lifetime for issued Certificates. Note that if the issuing CertificateAuthority expires before a Certificate's requested maximum_lifetime, the effective lifetime will be explicitly truncated to match it. |
| `name` | string | Identifier. The resource name for this CertificateTemplate in the format `projects/*/locations/*/certificateTemplates/*`. |
| `passthroughExtensions` | CertificateExtensionConstraints | Optional. Describes the set of X.509 extensions that may appear in a Certificate issued using this CertificateTemplate. If a certificate request sets extensions that don't appear in the passthrough_extensions, those extensions will be dropped. If the issuing CaPool's IssuancePolicy defines baseline_values that don't appear here, the certificate issuance request will fail. If this is omitted, then this template will not add restrictions on a certificate's X.509 extensions. These constraints do not apply to X.509 extensions set in this CertificateTemplate's predefined_values. |
| `predefinedValues` | X509Parameters | Optional. A set of X.509 values that will be applied to all issued certificates that use this template. If the certificate request includes conflicting values for the same properties, they will be overwritten by the values defined here. If the issuing CaPool's IssuancePolicy defines conflicting baseline_values for the same properties, the certificate issuance request will fail. |
| `updateTime` | string (google-datetime) | Output only. The time at which this CertificateTemplate was updated. |

### `DisableCertificateAuthorityRequest`

- Request message for CertificateAuthorityService.DisableCertificateAuthority.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ignoreDependentResources` | boolean | Optional. This field allows this CA to be disabled even if it's being depended on by another resource. However, doing so may result in unintended and unrecoverable effects on any dependent resources since the CA will no longer be able to issue certificates. |
| `requestId` | string | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `EcKeyType`

- Describes an Elliptic Curve key that may be used in a Certificate issued from a CaPool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `signatureAlgorithm` | string enum | Optional. A signature algorithm that must be used. If this is omitted, any EC-based signature algorithm will be allowed. Values: `EC_SIGNATURE_ALGORITHM_UNSPECIFIED`, `ECDSA_P256`, `ECDSA_P384`, `EDDSA_25519`. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EnableCertificateAuthorityRequest`

- Request message for CertificateAuthorityService.EnableCertificateAuthority.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `EncryptionSpec`

- The configuration used for encrypting data at rest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudKmsKey` | string | The resource name for a Cloud KMS key in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `ExtendedKeyUsageOptions`

- KeyUsage.ExtendedKeyUsageOptions has fields that correspond to certain common OIDs that could be specified as an extended key usage value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientAuth` | boolean | Corresponds to OID 1.3.6.1.5.5.7.3.2. Officially described as "TLS WWW client authentication", though regularly used for non-WWW TLS. |
| `codeSigning` | boolean | Corresponds to OID 1.3.6.1.5.5.7.3.3. Officially described as "Signing of downloadable executable code client authentication". |
| `emailProtection` | boolean | Corresponds to OID 1.3.6.1.5.5.7.3.4. Officially described as "Email protection". |
| `ocspSigning` | boolean | Corresponds to OID 1.3.6.1.5.5.7.3.9. Officially described as "Signing OCSP responses". |
| `serverAuth` | boolean | Corresponds to OID 1.3.6.1.5.5.7.3.1. Officially described as "TLS WWW server authentication", though regularly used for non-WWW TLS. |
| `timeStamping` | boolean | Corresponds to OID 1.3.6.1.5.5.7.3.8. Officially described as "Binding the hash of an object to a time". |

### `FetchCaCertsRequest`

- Request message for CertificateAuthorityService.FetchCaCerts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `FetchCaCertsResponse`

- Response message for CertificateAuthorityService.FetchCaCerts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caCerts` | array<CertChain> | The PEM encoded CA certificate chains of all certificate authorities in this CaPool in the ENABLED, DISABLED, or STAGED states. |

### `FetchCertificateAuthorityCsrResponse`

- Response message for CertificateAuthorityService.FetchCertificateAuthorityCsr.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pemCsr` | string | Output only. The PEM-encoded signed certificate signing request (CSR). |

### `IssuanceModes`

- IssuanceModes specifies the allowed ways in which Certificates may be requested from this CaPool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowConfigBasedIssuance` | boolean | Optional. When true, allows callers to create Certificates by specifying a CertificateConfig. |
| `allowCsrBasedIssuance` | boolean | Optional. When true, allows callers to create Certificates by specifying a CSR. |

### `IssuancePolicy`

- Defines controls over all certificate issuance within a CaPool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowRequesterSpecifiedNotBeforeTime` | boolean | Optional. If set to true, allows requesters to specify the requested_not_before_time field when creating a Certificate. Certificates requested with this option enabled will have a 'not_before_time' equal to the value specified in the request. The 'not_after_time' will be adjusted to preserve the requested lifetime. The maximum time that a certificate can be backdated with these options is 48 hours in the past. This option cannot be set if backdate_duration is set. |
| `allowedIssuanceModes` | IssuanceModes | Optional. If specified, then only methods allowed in the IssuanceModes may be used to issue Certificates. |
| `allowedKeyTypes` | array<AllowedKeyType> | Optional. If any AllowedKeyType is specified, then the certificate request's public key must match one of the key types listed here. Otherwise, any key may be used. |
| `backdateDuration` | string (google-duration) | Optional. If set, all certificates issued from this CaPool will be backdated by this duration. The 'not_before_time' will be the issuance time minus this backdate_duration, and the 'not_after_time' will be adjusted to preserve the requested lifetime. The maximum duration that a certificate can be backdated with these options is 48 hours in the past. This option cannot be set if allow_requester_specified_not_before_time is set. |
| `baselineValues` | X509Parameters | Optional. A set of X.509 values that will be applied to all certificates issued through this CaPool. If a certificate request includes conflicting values for the same properties, they will be overwritten by the values defined here. If a certificate request uses a CertificateTemplate that defines conflicting predefined_values for the same properties, the certificate issuance request will fail. |
| `identityConstraints` | CertificateIdentityConstraints | Optional. Describes constraints on identities that may appear in Certificates issued through this CaPool. If this is omitted, then this CaPool will not add restrictions on a certificate's identity. |
| `maximumLifetime` | string (google-duration) | Optional. The maximum lifetime allowed for issued Certificates. Note that if the issuing CertificateAuthority expires before a Certificate resource's requested maximum_lifetime, the effective lifetime will be explicitly truncated to match it. |
| `passthroughExtensions` | CertificateExtensionConstraints | Optional. Describes the set of X.509 extensions that may appear in a Certificate issued through this CaPool. If a certificate request sets extensions that don't appear in the passthrough_extensions, those extensions will be dropped. If a certificate request uses a CertificateTemplate with predefined_values that don't appear here, the certificate issuance request will fail. If this is omitted, then this CaPool will not add restrictions on a certificate's X.509 extensions. These constraints do not apply to X.509 extensions set in this CaPool's baseline_values. |

### `KeyId`

- A KeyId identifies a specific public key, usually by hashing the public key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyId` | string | Optional. The value of this KeyId encoded in lowercase hexadecimal. This is most likely the 160 bit SHA-1 hash of the public key. |

### `KeyUsage`

- A KeyUsage describes key usage values that may appear in an X.509 certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseKeyUsage` | KeyUsageOptions | Describes high-level ways in which a key may be used. |
| `extendedKeyUsage` | ExtendedKeyUsageOptions | Detailed scenarios in which a key may be used. |
| `unknownExtendedKeyUsages` | array<ObjectId> | Used to describe extended key usages that are not listed in the KeyUsage.ExtendedKeyUsageOptions message. |

### `KeyUsageOptions`

- KeyUsage.KeyUsageOptions corresponds to the key usage values described in https://tools.ietf.org/html/rfc5280#section-4.2.1.3.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certSign` | boolean | The key may be used to sign certificates. |
| `contentCommitment` | boolean | The key may be used for cryptographic commitments. Note that this may also be referred to as "non-repudiation". |
| `crlSign` | boolean | The key may be used sign certificate revocation lists. |
| `dataEncipherment` | boolean | The key may be used to encipher data. |
| `decipherOnly` | boolean | The key may be used to decipher only. |
| `digitalSignature` | boolean | The key may be used for digital signatures. |
| `encipherOnly` | boolean | The key may be used to encipher only. |
| `keyAgreement` | boolean | The key may be used in a key agreement protocol. |
| `keyEncipherment` | boolean | The key may be used to encipher other keys. |

### `KeyVersionSpec`

- A Cloud KMS key configuration that a CertificateAuthority will use.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `algorithm` | string enum | The algorithm to use for creating a managed Cloud KMS key for a for a simplified experience. All managed keys will be have their ProtectionLevel as `HSM`. Values: `SIGN_HASH_ALGORITHM_UNSPECIFIED`, `RSA_PSS_2048_SHA256`, `RSA_PSS_3072_SHA256`, `RSA_PSS_4096_SHA256`, `RSA_PKCS1_2048_SHA256`, `RSA_PKCS1_3072_SHA256`, `RSA_PKCS1_4096_SHA256`, `EC_P256_SHA256`, `EC_P384_SHA384`. |
| `cloudKmsKeyVersion` | string | The resource name for an existing Cloud KMS CryptoKeyVersion in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*/cryptoKeyVersions/*`. This option enables full flexibility in the key's capabilities and properties. |

### `ListCaPoolsResponse`

- Response message for CertificateAuthorityService.ListCaPools.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caPools` | array<CaPool> | The list of CaPools. |
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListCertificateAuthoritiesRequest.page_token to retrieve the next page of results. |
| `unreachable` | array<string> | A list of locations (e.g. "us-west1") that could not be reached. |

### `ListCertificateAuthoritiesResponse`

- Response message for CertificateAuthorityService.ListCertificateAuthorities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateAuthorities` | array<CertificateAuthority> | The list of CertificateAuthorities. |
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListCertificateAuthoritiesRequest.page_token to retrieve the next page of results. |
| `unreachable` | array<string> | A list of locations (e.g. "us-west1") that could not be reached. |

### `ListCertificateRevocationListsResponse`

- Response message for CertificateAuthorityService.ListCertificateRevocationLists.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateRevocationLists` | array<CertificateRevocationList> | The list of CertificateRevocationLists. |
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListCertificateRevocationListsRequest.page_token to retrieve the next page of results. |
| `unreachable` | array<string> | A list of locations (e.g. "us-west1") that could not be reached. |

### `ListCertificateTemplatesResponse`

- Response message for CertificateAuthorityService.ListCertificateTemplates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateTemplates` | array<CertificateTemplate> | The list of CertificateTemplates. |
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListCertificateTemplatesRequest.page_token to retrieve the next page of results. |
| `unreachable` | array<string> | A list of locations (e.g. "us-west1") that could not be reached. |

### `ListCertificatesResponse`

- Response message for CertificateAuthorityService.ListCertificates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificates` | array<Certificate> | The list of Certificates. |
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListCertificatesRequest.page_token to retrieve the next page of results. |
| `unreachable` | array<string> | A list of locations (e.g. "us-west1") that could not be reached. |

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

### `NameConstraints`

- Describes the X.509 name constraints extension, per https://tools.ietf.org/html/rfc5280#section-4.2.1.10
- Version: v1

| Field | Type | Description |
|---|---|---|
| `critical` | boolean | Indicates whether or not the name constraints are marked critical. |
| `excludedDnsNames` | array<string> | Contains excluded DNS names. Any DNS name that can be constructed by simply adding zero or more labels to the left-hand side of the name satisfies the name constraint. For example, `example.com`, `www.example.com`, `www.sub.example.com` would satisfy `example.com` while `example1.com` does not. |
| `excludedEmailAddresses` | array<string> | Contains the excluded email addresses. The value can be a particular email address, a hostname to indicate all email addresses on that host or a domain with a leading period (e.g. `.example.com`) to indicate all email addresses in that domain. |
| `excludedIpRanges` | array<string> | Contains the excluded IP ranges. For IPv4 addresses, the ranges are expressed using CIDR notation as specified in RFC 4632. For IPv6 addresses, the ranges are expressed in similar encoding as IPv4 addresses. |
| `excludedUris` | array<string> | Contains the excluded URIs that apply to the host part of the name. The value can be a hostname or a domain with a leading period (like `.example.com`) |
| `permittedDnsNames` | array<string> | Contains permitted DNS names. Any DNS name that can be constructed by simply adding zero or more labels to the left-hand side of the name satisfies the name constraint. For example, `example.com`, `www.example.com`, `www.sub.example.com` would satisfy `example.com` while `example1.com` does not. |
| `permittedEmailAddresses` | array<string> | Contains the permitted email addresses. The value can be a particular email address, a hostname to indicate all email addresses on that host or a domain with a leading period (e.g. `.example.com`) to indicate all email addresses in that domain. |
| `permittedIpRanges` | array<string> | Contains the permitted IP ranges. For IPv4 addresses, the ranges are expressed using CIDR notation as specified in RFC 4632. For IPv6 addresses, the ranges are expressed in similar encoding as IPv4 addresses. |
| `permittedUris` | array<string> | Contains the permitted URIs that apply to the host part of the name. The value can be a hostname or a domain with a leading period (like `.example.com`) |

### `ObjectId`

- An ObjectId specifies an object identifier (OID). These provide context and describe types in ASN.1 messages.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `objectIdPath` | array<integer> | Required. The parts of an OID path. The most significant parts of the path come first. |

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
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PublicKey`

- A PublicKey describes a public key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `format` | string enum | Required. The format of the public key. Values: `KEY_FORMAT_UNSPECIFIED`, `PEM`. |
| `key` | string (byte) | Required. A public key. The padding and encoding must match with the `KeyFormat` value specified for the `format` field. |

### `PublishingOptions`

- Options relating to the publication of each CertificateAuthority's CA certificate and CRLs and their inclusion as extensions in issued Certificates. The options set here apply to certificates issued by any CertificateAuthority in the CaPool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encodingFormat` | string enum | Optional. Specifies the encoding format of each CertificateAuthority resource's CA certificate and CRLs. If this is omitted, CA certificates and CRLs will be published in PEM. Values: `ENCODING_FORMAT_UNSPECIFIED`, `PEM`, `DER`. |
| `publishCaCert` | boolean | Optional. When true, publishes each CertificateAuthority's CA certificate and includes its URL in the "Authority Information Access" X.509 extension in all issued Certificates. If this is false, the CA certificate will not be published and the corresponding X.509 extension will not be written in issued certificates. |
| `publishCrl` | boolean | Optional. When true, publishes each CertificateAuthority's CRL and includes its URL in the "CRL Distribution Points" X.509 extension in all issued Certificates. If this is false, CRLs will not be published and the corresponding X.509 extension will not be written in issued certificates. CRLs will expire 7 days from their creation. However, we will rebuild daily. CRLs are also rebuilt shortly after a certificate is revoked. |

### `RelativeDistinguishedName`

- RelativeDistinguishedName specifies a relative distinguished name which will be used to build a distinguished name.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | array<AttributeTypeAndValue> | Attributes describes the attribute value assertions in the RDN. |

### `RevocationDetails`

- Describes fields that are relavent to the revocation of a Certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `revocationState` | string enum | Indicates why a Certificate was revoked. Values: `REVOCATION_REASON_UNSPECIFIED`, `KEY_COMPROMISE`, `CERTIFICATE_AUTHORITY_COMPROMISE`, `AFFILIATION_CHANGED`, `SUPERSEDED`, `CESSATION_OF_OPERATION`, `CERTIFICATE_HOLD`, `PRIVILEGE_WITHDRAWN`, `ATTRIBUTE_AUTHORITY_COMPROMISE`. |
| `revocationTime` | string (google-datetime) | The time at which this Certificate was revoked. |

### `RevokeCertificateRequest`

- Request message for CertificateAuthorityService.RevokeCertificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reason` | string enum | Required. The RevocationReason for revoking this certificate. Values: `REVOCATION_REASON_UNSPECIFIED`, `KEY_COMPROMISE`, `CERTIFICATE_AUTHORITY_COMPROMISE`, `AFFILIATION_CHANGED`, `SUPERSEDED`, `CESSATION_OF_OPERATION`, `CERTIFICATE_HOLD`, `PRIVILEGE_WITHDRAWN`, `ATTRIBUTE_AUTHORITY_COMPROMISE`. |
| `requestId` | string | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `RevokedCertificate`

- Describes a revoked Certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificate` | string | The resource name for the Certificate in the format `projects/*/locations/*/caPools/*/certificates/*`. |
| `hexSerialNumber` | string | The serial number of the Certificate. |
| `revocationReason` | string enum | The reason the Certificate was revoked. Values: `REVOCATION_REASON_UNSPECIFIED`, `KEY_COMPROMISE`, `CERTIFICATE_AUTHORITY_COMPROMISE`, `AFFILIATION_CHANGED`, `SUPERSEDED`, `CESSATION_OF_OPERATION`, `CERTIFICATE_HOLD`, `PRIVILEGE_WITHDRAWN`, `ATTRIBUTE_AUTHORITY_COMPROMISE`. |

### `RsaKeyType`

- Describes an RSA key that may be used in a Certificate issued from a CaPool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxModulusSize` | string (int64) | Optional. The maximum allowed RSA modulus size (inclusive), in bits. If this is not set, or if set to zero, the service will not enforce an explicit upper bound on RSA modulus sizes. |
| `minModulusSize` | string (int64) | Optional. The minimum allowed RSA modulus size (inclusive), in bits. If this is not set, or if set to zero, the service-level min RSA modulus size will continue to apply. |

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

### `Subject`

- Subject describes parts of a distinguished name that, in turn, describes the subject of the certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commonName` | string | The "common name" of the subject. |
| `countryCode` | string | The country code of the subject. |
| `locality` | string | The locality or city of the subject. |
| `organization` | string | The organization of the subject. |
| `organizationalUnit` | string | The organizational_unit of the subject. |
| `postalCode` | string | The postal code of the subject. |
| `province` | string | The province, territory, or regional state of the subject. |
| `rdnSequence` | array<RelativeDistinguishedName> | This field can be used in place of the named subject fields. |
| `streetAddress` | string | The street address of the subject. |

### `SubjectAltNames`

- SubjectAltNames corresponds to a more modern way of listing what the asserted identity is in a certificate (i.e., compared to the "common name" in the distinguished name).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customSans` | array<X509Extension> | Contains additional subject alternative name values. For each custom_san, the `value` field must contain an ASN.1 encoded UTF8String. |
| `dnsNames` | array<string> | Contains only valid, fully-qualified host names. |
| `emailAddresses` | array<string> | Contains only valid RFC 2822 E-mail addresses. |
| `ipAddresses` | array<string> | Contains only valid 32-bit IPv4 addresses or RFC 4291 IPv6 addresses. |
| `uris` | array<string> | Contains only valid RFC 3986 URIs. |

### `SubjectConfig`

- These values are used to create the distinguished name and subject alternative name fields in an X.509 certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `subject` | Subject | Optional. Contains distinguished name fields such as the common name, location and organization. |
| `subjectAltName` | SubjectAltNames | Optional. The subject alternative name fields. |

### `SubjectDescription`

- These values describe fields in an issued X.509 certificate such as the distinguished name, subject alternative names, serial number, and lifetime.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hexSerialNumber` | string | The serial number encoded in lowercase hexadecimal. |
| `lifetime` | string (google-duration) | For convenience, the actual lifetime of an issued certificate. |
| `notAfterTime` | string (google-datetime) | The time after which the certificate is expired. Per RFC 5280, the validity period for a certificate is the period of time from not_before_time through not_after_time, inclusive. Corresponds to 'not_before_time' + 'lifetime' - 1 second. |
| `notBeforeTime` | string (google-datetime) | The time at which the certificate becomes valid. |
| `subject` | Subject | Contains distinguished name fields such as the common name, location and / organization. |
| `subjectAltName` | SubjectAltNames | The subject alternative name fields. |

### `SubordinateConfig`

- Describes a subordinate CA's issuers. This is either a resource name to a known issuing CertificateAuthority, or a PEM issuer certificate chain.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateAuthority` | string | Required. This can refer to a CertificateAuthority that was used to create a subordinate CertificateAuthority. This field is used for information and usability purposes only. The resource name is in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`. |
| `pemIssuerChain` | SubordinateConfigChain | Required. Contains the PEM certificate chain for the issuers of this CertificateAuthority, but not pem certificate for this CA itself. |

### `SubordinateConfigChain`

- This message describes a subordinate CA's issuer certificate chain. This wrapper exists for compatibility reasons.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pemCertificates` | array<string> | Required. Expected to be in leaf-to-root order according to RFC 5246. |

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

### `UndeleteCertificateAuthorityRequest`

- Request message for CertificateAuthorityService.UndeleteCertificateAuthority.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `UserDefinedAccessUrls`

- User-defined URLs for accessing content published by this CertificateAuthority.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aiaIssuingCertificateUrls` | array<string> | Optional. A list of URLs where the issuer CA certificate may be downloaded, which appears in the "Authority Information Access" extension in the certificate. If specified, the default Cloud Storage URLs will be omitted. |
| `crlAccessUrls` | array<string> | Optional. A list of URLs where to obtain CRL information, i.e. the DistributionPoint.fullName described by https://tools.ietf.org/html/rfc5280#section-4.2.1.13. If specified, the default Cloud Storage URLs will be omitted. |

### `X509Extension`

- An X509Extension specifies an X.509 extension, which may be used in different parts of X.509 objects like certificates, CSRs, and CRLs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `critical` | boolean | Optional. Indicates whether or not this extension is critical (i.e., if the client does not know how to handle this extension, the client should consider this to be an error). |
| `objectId` | ObjectId | Required. The OID for this X.509 extension. |
| `value` | string (byte) | Required. The value of this X.509 extension. |

### `X509Parameters`

- An X509Parameters is used to describe certain fields of an X.509 certificate, such as the key usage fields, fields specific to CA certificates, certificate policy extensions and custom extensions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalExtensions` | array<X509Extension> | Optional. Describes custom X.509 extensions. |
| `aiaOcspServers` | array<string> | Optional. Describes Online Certificate Status Protocol (OCSP) endpoint addresses that appear in the "Authority Information Access" extension in the certificate. |
| `caOptions` | CaOptions | Optional. Describes options in this X509Parameters that are relevant in a CA certificate. If not specified, a default basic constraints extension with `is_ca=false` will be added for leaf certificates. |
| `keyUsage` | KeyUsage | Optional. Indicates the intended use for keys that correspond to a certificate. |
| `nameConstraints` | NameConstraints | Optional. Describes the X.509 name constraints extension. |
| `policyIds` | array<ObjectId> | Optional. Describes the X.509 certificate policy object identifiers, per https://tools.ietf.org/html/rfc5280#section-4.2.1.4. |

### Shape of `AccessUrls`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "caCertificateAccessUrl": "string",
  "crlAccessUrls": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `privateca` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the `CertificateRevocationList` `name` format is written `projects/*/locations/*/caPools/*certificateAuthorities/*/ certificateRevocationLists/*` (no `/` after `caPools/*`, and a space before `certificateRevocationLists`); the Discovery path pattern of `certificateRevocationLists.patch` is `projects/[^/]+/locations/[^/]+/caPools/[^/]+/certificateAuthorities/[^/]+/certificateRevocationLists/[^/]+`.
- Source: https://privateca.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
