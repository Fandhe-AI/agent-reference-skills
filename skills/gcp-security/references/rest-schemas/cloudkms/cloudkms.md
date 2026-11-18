---
source: https://cloudkms.googleapis.com/$discovery/rest?version=v1
---

# Cloud Key Management Service (KMS) API message schemas (cloudkms)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudkms/`.

### `AddQuorumMember`

- Add a quorum member to the SingleTenantHsmInstance. This will increase the total_approver_count by 1. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `twoFactorPublicKeyPem` | string | Required. The public key associated with the 2FA key for the new quorum member to add. Public keys must be associated with RSA 2048 keys. |

### `ApproveSingleTenantHsmInstanceProposalRequest`

- Request message for HsmManagement.ApproveSingleTenantHsmInstanceProposal.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `quorumReply` | QuorumReply | Required. The reply to QuorumParameters for approving the proposal. |
| `requiredActionQuorumReply` | RequiredActionQuorumReply | Required. The reply to RequiredActionQuorumParameters for approving the proposal. |

### `ApproveSingleTenantHsmInstanceProposalResponse`

- Response message for HsmManagement.ApproveSingleTenantHsmInstanceProposal.
- Version: v1

### `AsymmetricDecryptRequest`

- Request message for KeyManagementService.AsymmetricDecrypt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ciphertext` | string (byte) | Required. The data encrypted with the named CryptoKeyVersion's public key using OAEP. |
| `ciphertextCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the AsymmetricDecryptRequest.ciphertext. If specified, KeyManagementService will verify the integrity of the received AsymmetricDecryptRequest.ciphertext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(AsymmetricDecryptRequest.ciphertext) is equal to AsymmetricDecryptRequest.ciphertext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |

### `AsymmetricDecryptResponse`

- Response message for KeyManagementService.AsymmetricDecrypt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `plaintext` | string (byte) | The decrypted data originally encrypted with the matching public key. |
| `plaintextCrc32c` | string (int64) | Integrity verification field. A CRC32C checksum of the returned AsymmetricDecryptResponse.plaintext. An integrity check of AsymmetricDecryptResponse.plaintext can be performed by computing the CRC32C checksum of AsymmetricDecryptResponse.plaintext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `protectionLevel` | string enum | The ProtectionLevel of the CryptoKeyVersion used in decryption. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |
| `verifiedCiphertextCrc32c` | boolean | Integrity verification field. A flag indicating whether AsymmetricDecryptRequest.ciphertext_crc32c was received by KeyManagementService and used for the integrity verification of the ciphertext. A false value of this field indicates either that AsymmetricDecryptRequest.ciphertext_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set AsymmetricDecryptRequest.ciphertext_crc32c but this field is still false, discard the response and perform a limited number of retries. |

### `AsymmetricSignRequest`

- Request message for KeyManagementService.AsymmetricSign.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | string (byte) | Optional. The data to sign. It can't be supplied if AsymmetricSignRequest.digest is supplied. |
| `dataCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the AsymmetricSignRequest.data. If specified, KeyManagementService will verify the integrity of the received AsymmetricSignRequest.data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(AsymmetricSignRequest.data) is equal to AsymmetricSignRequest.data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `digest` | Digest | Optional. The digest of the data to sign. The digest must be produced with the same digest algorithm as specified by the key version's algorithm. This field may not be supplied if AsymmetricSignRequest.data is supplied. |
| `digestCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the AsymmetricSignRequest.digest. If specified, KeyManagementService will verify the integrity of the received AsymmetricSignRequest.digest using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(AsymmetricSignRequest.digest) is equal to AsymmetricSignRequest.digest_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |

### `AsymmetricSignResponse`

- Response message for KeyManagementService.AsymmetricSign.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The resource name of the CryptoKeyVersion used for signing. Check this field to verify that the intended resource was used for signing. |
| `protectionLevel` | string enum | The ProtectionLevel of the CryptoKeyVersion used for signing. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |
| `signature` | string (byte) | The created signature. |
| `signatureCrc32c` | string (int64) | Integrity verification field. A CRC32C checksum of the returned AsymmetricSignResponse.signature. An integrity check of AsymmetricSignResponse.signature can be performed by computing the CRC32C checksum of AsymmetricSignResponse.signature and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `verifiedDataCrc32c` | boolean | Integrity verification field. A flag indicating whether AsymmetricSignRequest.data_crc32c was received by KeyManagementService and used for the integrity verification of the data. A false value of this field indicates either that AsymmetricSignRequest.data_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set AsymmetricSignRequest.data_crc32c but this field is still false, discard the response and perform a limited number of retries. |
| `verifiedDigestCrc32c` | boolean | Integrity verification field. A flag indicating whether AsymmetricSignRequest.digest_crc32c was received by KeyManagementService and used for the integrity verification of the digest. A false value of this field indicates either that AsymmetricSignRequest.digest_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set AsymmetricSignRequest.digest_crc32c but this field is still false, discard the response and perform a limited number of retries. |

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

### `AutokeyConfig`

- Cloud KMS Autokey configuration for a project or folder.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. A checksum computed by the server based on the value of other fields. This may be sent on update requests to ensure that the client has an up-to-date value before proceeding. The request will be rejected with an ABORTED error on a mismatched etag. |
| `keyProject` | string | Optional. Name of the key project, e.g. `projects/{PROJECT_ID}` or `projects/{PROJECT_NUMBER}`, where Cloud KMS Autokey will provision a new CryptoKey when a KeyHandle is created. On UpdateAutokeyConfig, the caller will require `cloudkms.cryptoKeys.setIamPolicy` permission on this key project. Once configured, for Cloud KMS Autokey to function properly, this key project must have the Cloud KMS API activated and the Cloud KMS Service Agent for this key project must be granted the `cloudkms.admin` role (or pertinent permissions). A request with an empty key project field will clear the configuration. |
| `keyProjectResolutionMode` | string enum | Optional. KeyProjectResolutionMode for the AutokeyConfig. Valid values are `DEDICATED_KEY_PROJECT`, `RESOURCE_PROJECT`, or `DISABLED`. Values: `KEY_PROJECT_RESOLUTION_MODE_UNSPECIFIED`, `DEDICATED_KEY_PROJECT`, `RESOURCE_PROJECT`, `DISABLED`. |
| `name` | string | Identifier. Name of the AutokeyConfig resource, e.g. `folders/{FOLDER_NUMBER}/autokeyConfig`, `projects/{PROJECT_NUMBER}/autokeyConfig`, or `projects/{PROJECT_ID}/autokeyConfig`. |
| `state` | string enum | Output only. The state for the AutokeyConfig. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `KEY_PROJECT_DELETED`, `UNINITIALIZED`, `KEY_PROJECT_PERMISSION_DENIED`. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `Certificate`

- A Certificate represents an X.509 certificate used to authenticate HTTPS connections to EKM replicas.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `issuer` | string | Output only. The issuer distinguished name in RFC 2253 format. Only present if parsed is true. |
| `notAfterTime` | string (google-datetime) | Output only. The certificate is not valid after this time. Only present if parsed is true. |
| `notBeforeTime` | string (google-datetime) | Output only. The certificate is not valid before this time. Only present if parsed is true. |
| `parsed` | boolean | Output only. True if the certificate was parsed successfully. |
| `rawDer` | string (byte) | Required. The raw certificate bytes in DER format. |
| `serialNumber` | string | Output only. The certificate serial number as a hex string. Only present if parsed is true. |
| `sha256Fingerprint` | string | Output only. The SHA-256 certificate fingerprint as a hex string. Only present if parsed is true. |
| `subject` | string | Output only. The subject distinguished name in RFC 2253 format. Only present if parsed is true. |
| `subjectAlternativeDnsNames` | array<string> | Output only. The subject Alternative DNS names. Only present if parsed is true. |

### `CertificateChains`

- Certificate chains needed to verify the attestation. Certificates in chains are PEM-encoded and are ordered based on https://tools.ietf.org/html/rfc5246#section-7.4.2.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caviumCerts` | array<string> | Cavium certificate chain corresponding to the attestation. |
| `googleCardCerts` | array<string> | Google card certificate chain corresponding to the attestation. |
| `googlePartitionCerts` | array<string> | Google partition certificate chain corresponding to the attestation. |

### `Challenge`

- A challenge to be signed by a 2FA key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `challenge` | string (byte) | Output only. The challenge to be signed by the 2FA key indicated by the public key. |
| `publicKeyPem` | string | Output only. The public key associated with the 2FA key that should sign the challenge. |

### `ChallengeReply`

- A reply to a challenge signed by a 2FA key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `publicKeyPem` | string | Required. The public key associated with the 2FA key. |
| `signedChallenge` | string (byte) | Required. The signed challenge associated with the 2FA key. The signature must be RSASSA-PKCS1 v1.5 with a SHA256 digest. |

### `ChecksummedData`

- Data with integrity verification field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `crc32cChecksum` | string (int64) | Integrity verification field. A CRC32C checksum of the returned ChecksummedData.data. An integrity check of ChecksummedData.data can be performed by computing the CRC32C checksum of ChecksummedData.data and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed `2^32-1`, and can be safely downconverted to uint32 in languages that support this type. |
| `data` | string (byte) | Raw Data. |

### `CryptoKey`

- A CryptoKey represents a logical key that can be used for cryptographic operations. A CryptoKey is made up of zero or more versions, which represent the actual key material used in cryptographic operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which this CryptoKey was created. |
| `cryptoKeyBackend` | string | Immutable. The resource name of the backend environment where the key material for all CryptoKeyVersions associated with this CryptoKey reside and where all related cryptographic operations are performed. Only applicable if CryptoKeyVersions have a ProtectionLevel of EXTERNAL_VPC, with the resource name in the format `projects/*/locations/*/ekmConnections/*`. Only applicable if CryptoKeyVersions have a ProtectionLevel of HSM_SINGLE_TENANT, with the resource name in the format `projects/*/locations/*/singleTenantHsmInstances/*`. Note, this list is non-exhaustive and may apply to additional ProtectionLevels in the future. |
| `destroyScheduledDuration` | string (google-duration) | Immutable. The period of time that versions of this key spend in the DESTROY_SCHEDULED state before transitioning to DESTROYED. If not specified at creation time, the default duration is 30 days. |
| `importOnly` | boolean | Immutable. Whether this key may contain imported versions only. |
| `keyAccessJustificationsPolicy` | KeyAccessJustificationsPolicy | Optional. The policy used for Key Access Justifications Policy Enforcement. If this field is present and this key is enrolled in Key Access Justifications Policy Enforcement, the policy will be evaluated in encrypt, decrypt, and sign operations, and the operation will fail if rejected by the policy. The policy is defined by specifying zero or more allowed justification codes. https://cloud.google.com/assured-workloads/key-access-justifications/docs/justification-codes By default, this field is absent, and all justification codes are allowed. If the `key_access_justifications_policy.allowed_access_reasons` is empty (zero allowed justification code), all encrypt, decrypt, and sign operations will fail. |
| `labels` | object | Labels with user-defined metadata. For more information, see Labeling Keys (https://cloud.google.com/kms/docs/labeling-keys). |
| `name` | string | Output only. The resource name for this CryptoKey in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`. |
| `nextRotationTime` | string (google-datetime) | At next_rotation_time, the Key Management Service will automatically: 1. Create a new version of this CryptoKey. 2. Mark the new version as primary. Key rotations performed manually via CreateCryptoKeyVersion and UpdateCryptoKeyPrimaryVersion do not affect next_rotation_time. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted. |
| `primary` | CryptoKeyVersion | Output only. A copy of the "primary" CryptoKeyVersion that will be used by Encrypt when this CryptoKey is given in EncryptRequest.name. The CryptoKey's primary version can be updated via UpdateCryptoKeyPrimaryVersion. Keys with purpose ENCRYPT_DECRYPT may have a primary. For other keys, this field will be omitted. |
| `purpose` | string enum | Immutable. The immutable purpose of this CryptoKey. Values: `CRYPTO_KEY_PURPOSE_UNSPECIFIED`, `ENCRYPT_DECRYPT`, `ASYMMETRIC_SIGN`, `ASYMMETRIC_DECRYPT`, `RAW_ENCRYPT_DECRYPT`, `MAC`, `KEY_ENCAPSULATION`, `AES_WRAPPING`. |
| `rotationPeriod` | string (google-duration) | next_rotation_time will be advanced by this period when the service automatically rotates a key. Must be at least 24 hours and at most 876,000 hours. If rotation_period is set, next_rotation_time must also be set. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted. |
| `versionTemplate` | CryptoKeyVersionTemplate | A template describing settings for new CryptoKeyVersion instances. The properties of new CryptoKeyVersion instances created by either CreateCryptoKeyVersion or auto-rotation are controlled by this template. |

### `CryptoKeyVersion`

- A CryptoKeyVersion represents an individual cryptographic key, and the associated key material. An ENABLED version can be used for cryptographic operations. For security reasons, the raw cryptographic key material represented by a CryptoKeyVersion can never be viewed or exported. It can only be used to encrypt, decrypt, or sign data when an authorized user or application invokes Cloud KMS.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `algorithm` | string enum | Output only. The CryptoKeyVersionAlgorithm that this CryptoKeyVersion supports. Values: `CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED`, `GOOGLE_SYMMETRIC_ENCRYPTION`, `AES_128_GCM`, `AES_256_GCM`, `AES_128_CBC`, `AES_256_CBC`, `AES_128_CTR`, `AES_256_CTR`, `RSA_SIGN_PSS_2048_SHA256`, `RSA_SIGN_PSS_3072_SHA256`, `RSA_SIGN_PSS_4096_SHA256`, `RSA_SIGN_PSS_4096_SHA512`, `RSA_SIGN_PKCS1_2048_SHA256`, `RSA_SIGN_PKCS1_3072_SHA256`, `RSA_SIGN_PKCS1_4096_SHA256`, `RSA_SIGN_PKCS1_4096_SHA512`, `RSA_SIGN_RAW_PKCS1_2048`, `RSA_SIGN_RAW_PKCS1_3072`, `RSA_SIGN_RAW_PKCS1_4096`, `RSA_DECRYPT_OAEP_2048_SHA256`, `RSA_DECRYPT_OAEP_3072_SHA256`, `RSA_DECRYPT_OAEP_4096_SHA256`, `RSA_DECRYPT_OAEP_4096_SHA512`, `RSA_DECRYPT_OAEP_2048_SHA1`, `RSA_DECRYPT_OAEP_3072_SHA1`, `RSA_DECRYPT_OAEP_4096_SHA1`, `EC_SIGN_P256_SHA256`, `EC_SIGN_P384_SHA384`, `EC_SIGN_SECP256K1_SHA256`, `EC_SIGN_ED25519`, `HMAC_SHA256`, `HMAC_SHA1`, `HMAC_SHA384`, `HMAC_SHA512`, `HMAC_SHA224`, `EXTERNAL_SYMMETRIC_ENCRYPTION`, `ML_KEM_768`, `ML_KEM_1024`, `KEM_XWING`, `PQ_SIGN_ML_DSA_44`, `PQ_SIGN_ML_DSA_65`, `PQ_SIGN_ML_DSA_87`, `PQ_SIGN_SLH_DSA_SHA2_128S`, `PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256`, `PQ_SIGN_ML_DSA_44_EXTERNAL_MU`, `PQ_SIGN_ML_DSA_65_EXTERNAL_MU`, `PQ_SIGN_ML_DSA_87_EXTERNAL_MU`, `KEM_ECDH_P256`, `KEM_ECDH_P384`, `AES_256_KWP`. |
| `attestation` | KeyOperationAttestation | Output only. Statement that was generated and signed by the HSM at key creation time. Use this statement to verify attributes of the key as stored on the HSM, independently of Google. Only provided for key versions with protection_level HSM. |
| `createTime` | string (google-datetime) | Output only. The time at which this CryptoKeyVersion was created. |
| `destroyEventTime` | string (google-datetime) | Output only. The time this CryptoKeyVersion's key material was destroyed. Only present if state is DESTROYED. |
| `destroyTime` | string (google-datetime) | Output only. The time this CryptoKeyVersion's key material is scheduled for destruction. Only present if state is DESTROY_SCHEDULED. |
| `externalDestructionFailureReason` | string | Output only. The root cause of the most recent external destruction failure. Only present if state is EXTERNAL_DESTRUCTION_FAILED. |
| `externalProtectionLevelOptions` | ExternalProtectionLevelOptions | ExternalProtectionLevelOptions stores a group of additional fields for configuring a CryptoKeyVersion that are specific to the EXTERNAL protection level and EXTERNAL_VPC protection levels. |
| `generateTime` | string (google-datetime) | Output only. The time this CryptoKeyVersion's key material was generated. |
| `generationFailureReason` | string | Output only. The root cause of the most recent generation failure. Only present if state is GENERATION_FAILED. |
| `hsmTrusted` | boolean | Output only. Field indicating that the key wrapping key is trusted. This field is only valid for key purpose AES_256_WRAPPING, and protection level HSM_SINGLE_TENANT. |
| `importFailureReason` | string | Output only. The root cause of the most recent import failure. Only present if state is IMPORT_FAILED. |
| `importJob` | string | Output only. The name of the ImportJob used in the most recent import of this CryptoKeyVersion. Only present if the underlying key material was imported. |
| `importTime` | string (google-datetime) | Output only. The time at which this CryptoKeyVersion's key material was most recently imported. |
| `name` | string | Output only. The resource name for this CryptoKeyVersion in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*/cryptoKeyVersions/*`. |
| `protectionLevel` | string enum | Output only. The ProtectionLevel describing how crypto operations are performed with this CryptoKeyVersion. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |
| `reimportEligible` | boolean | Output only. Whether or not this key version is eligible for reimport, by being specified as a target in ImportCryptoKeyVersionRequest.crypto_key_version. |
| `state` | string enum | The current state of the CryptoKeyVersion. Values: `CRYPTO_KEY_VERSION_STATE_UNSPECIFIED`, `PENDING_GENERATION`, `ENABLED`, `DISABLED`, `DESTROYED`, `DESTROY_SCHEDULED`, `PENDING_IMPORT`, `IMPORT_FAILED`, `GENERATION_FAILED`, `PENDING_EXTERNAL_DESTRUCTION`, `EXTERNAL_DESTRUCTION_FAILED`. |
| `trustedWrappingEnabled` | boolean | Optional. Immutable. Field indicating that the key may be wrapped by a trusted key. This field can be set for all key purposes except ENCRYPT_DECRYPT, and is only valid for keys with protection level HSM_SINGLE_TENANT. This field can only be set at creation or import time via CreateCryptoKeyVersion, or ImportCryptoKeyVersion. |

### `CryptoKeyVersionTemplate`

- A CryptoKeyVersionTemplate specifies the properties to use when creating a new CryptoKeyVersion, either manually with CreateCryptoKeyVersion or automatically as a result of auto-rotation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `algorithm` | string enum | Required. Algorithm to use when creating a CryptoKeyVersion based on this template. For backwards compatibility, GOOGLE_SYMMETRIC_ENCRYPTION is implied if both this field is omitted and CryptoKey.purpose is ENCRYPT_DECRYPT. Values: `CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED`, `GOOGLE_SYMMETRIC_ENCRYPTION`, `AES_128_GCM`, `AES_256_GCM`, `AES_128_CBC`, `AES_256_CBC`, `AES_128_CTR`, `AES_256_CTR`, `RSA_SIGN_PSS_2048_SHA256`, `RSA_SIGN_PSS_3072_SHA256`, `RSA_SIGN_PSS_4096_SHA256`, `RSA_SIGN_PSS_4096_SHA512`, `RSA_SIGN_PKCS1_2048_SHA256`, `RSA_SIGN_PKCS1_3072_SHA256`, `RSA_SIGN_PKCS1_4096_SHA256`, `RSA_SIGN_PKCS1_4096_SHA512`, `RSA_SIGN_RAW_PKCS1_2048`, `RSA_SIGN_RAW_PKCS1_3072`, `RSA_SIGN_RAW_PKCS1_4096`, `RSA_DECRYPT_OAEP_2048_SHA256`, `RSA_DECRYPT_OAEP_3072_SHA256`, `RSA_DECRYPT_OAEP_4096_SHA256`, `RSA_DECRYPT_OAEP_4096_SHA512`, `RSA_DECRYPT_OAEP_2048_SHA1`, `RSA_DECRYPT_OAEP_3072_SHA1`, `RSA_DECRYPT_OAEP_4096_SHA1`, `EC_SIGN_P256_SHA256`, `EC_SIGN_P384_SHA384`, `EC_SIGN_SECP256K1_SHA256`, `EC_SIGN_ED25519`, `HMAC_SHA256`, `HMAC_SHA1`, `HMAC_SHA384`, `HMAC_SHA512`, `HMAC_SHA224`, `EXTERNAL_SYMMETRIC_ENCRYPTION`, `ML_KEM_768`, `ML_KEM_1024`, `KEM_XWING`, `PQ_SIGN_ML_DSA_44`, `PQ_SIGN_ML_DSA_65`, `PQ_SIGN_ML_DSA_87`, `PQ_SIGN_SLH_DSA_SHA2_128S`, `PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256`, `PQ_SIGN_ML_DSA_44_EXTERNAL_MU`, `PQ_SIGN_ML_DSA_65_EXTERNAL_MU`, `PQ_SIGN_ML_DSA_87_EXTERNAL_MU`, `KEM_ECDH_P256`, `KEM_ECDH_P384`, `AES_256_KWP`. |
| `protectionLevel` | string enum | ProtectionLevel to use when creating a CryptoKeyVersion based on this template. Immutable. Defaults to SOFTWARE. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |

### `DecapsulateRequest`

- Request message for KeyManagementService.Decapsulate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ciphertext` | string (byte) | Required. The ciphertext produced from encapsulation with the named CryptoKeyVersion public key(s). |
| `ciphertextCrc32c` | string (int64) | Optional. A CRC32C checksum of the DecapsulateRequest.ciphertext. If specified, KeyManagementService will verify the integrity of the received DecapsulateRequest.ciphertext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(DecapsulateRequest.ciphertext) is equal to DecapsulateRequest.ciphertext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |

### `DecapsulateResponse`

- Response message for KeyManagementService.Decapsulate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The resource name of the CryptoKeyVersion used for decapsulation. Check this field to verify that the intended resource was used for decapsulation. |
| `protectionLevel` | string enum | The ProtectionLevel of the CryptoKeyVersion used in decapsulation. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |
| `sharedSecret` | string (byte) | The decapsulated shared_secret originally encapsulated with the matching public key. |
| `sharedSecretCrc32c` | string (int64) | Integrity verification field. A CRC32C checksum of the returned DecapsulateResponse.shared_secret. An integrity check of DecapsulateResponse.shared_secret can be performed by computing the CRC32C checksum of DecapsulateResponse.shared_secret and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: receiving this response message indicates that KeyManagementService is able to successfully decrypt the ciphertext. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `verifiedCiphertextCrc32c` | boolean | Integrity verification field. A flag indicating whether DecapsulateRequest.ciphertext_crc32c was received by KeyManagementService and used for the integrity verification of the ciphertext. A false value of this field indicates either that DecapsulateRequest.ciphertext_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set DecapsulateRequest.ciphertext_crc32c but this field is still false, discard the response and perform a limited number of retries. |

### `DecryptRequest`

- Request message for KeyManagementService.Decrypt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalAuthenticatedData` | string (byte) | Optional. Optional data that must match the data originally supplied in EncryptRequest.additional_authenticated_data. |
| `additionalAuthenticatedDataCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the DecryptRequest.additional_authenticated_data. If specified, KeyManagementService will verify the integrity of the received DecryptRequest.additional_authenticated_data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(DecryptRequest.additional_authenticated_data) is equal to DecryptRequest.additional_authenticated_data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `ciphertext` | string (byte) | Required. The encrypted data originally returned in EncryptResponse.ciphertext. |
| `ciphertextCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the DecryptRequest.ciphertext. If specified, KeyManagementService will verify the integrity of the received DecryptRequest.ciphertext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(DecryptRequest.ciphertext) is equal to DecryptRequest.ciphertext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |

### `DecryptResponse`

- Response message for KeyManagementService.Decrypt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `plaintext` | string (byte) | The decrypted data originally supplied in EncryptRequest.plaintext. |
| `plaintextCrc32c` | string (int64) | Integrity verification field. A CRC32C checksum of the returned DecryptResponse.plaintext. An integrity check of DecryptResponse.plaintext can be performed by computing the CRC32C checksum of DecryptResponse.plaintext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: receiving this response message indicates that KeyManagementService is able to successfully decrypt the ciphertext. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `protectionLevel` | string enum | The ProtectionLevel of the CryptoKeyVersion used in decryption. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |
| `usedPrimary` | boolean | Whether the Decryption was performed using the primary key version. |

### `DeleteSingleTenantHsmInstance`

- Delete the SingleTenantHsmInstance. Deleting a SingleTenantHsmInstance will make all CryptoKeys attached to the SingleTenantHsmInstance unusable. The SingleTenantHsmInstance must not be in the DELETING or DELETED state to perform this operation.
- Version: v1

### `DestroyCryptoKeyVersionRequest`

- Request message for KeyManagementService.DestroyCryptoKeyVersion.
- Version: v1

### `Digest`

- A Digest holds a cryptographic message digest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `externalMu` | string (byte) | A message digest produced with SHAKE-256, to be used with ML-DSA external-μ algorithms only. See "message representative" note in section 6.2, algorithm 7 of the FIPS-204 standard: https://doi.org/10.6028/nist.fips.204 |
| `sha256` | string (byte) | A message digest produced with the SHA-256 algorithm. |
| `sha384` | string (byte) | A message digest produced with the SHA-384 algorithm. |
| `sha512` | string (byte) | A message digest produced with the SHA-512 algorithm. |

### `DisableSingleTenantHsmInstance`

- Disable the SingleTenantHsmInstance. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation.
- Version: v1

### `EkmConfig`

- An EkmConfig is a singleton resource that represents configuration parameters that apply to all CryptoKeys and CryptoKeyVersions with a ProtectionLevel of EXTERNAL_VPC in a given project and location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultEkmConnection` | string | Optional. Resource name of the default EkmConnection. Setting this field to the empty string removes the default. |
| `name` | string | Output only. The resource name for the EkmConfig in the format `projects/*/locations/*/ekmConfig`. |

### `EkmConnection`

- An EkmConnection represents an individual EKM connection. It can be used for creating CryptoKeys and CryptoKeyVersions with a ProtectionLevel of EXTERNAL_VPC, as well as performing cryptographic operations using keys created within the EkmConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which the EkmConnection was created. |
| `cryptoSpacePath` | string | Optional. Identifies the EKM Crypto Space that this EkmConnection maps to. Note: This field is required if KeyManagementMode is CLOUD_KMS. |
| `etag` | string | Optional. Etag of the currently stored EkmConnection. |
| `keyManagementMode` | string enum | Optional. Describes who can perform control plane operations on the EKM. If unset, this defaults to MANUAL. Values: `KEY_MANAGEMENT_MODE_UNSPECIFIED`, `MANUAL`, `CLOUD_KMS`. |
| `name` | string | Output only. The resource name for the EkmConnection in the format `projects/*/locations/*/ekmConnections/*`. |
| `serviceResolvers` | array<ServiceResolver> | Optional. A list of ServiceResolvers where the EKM can be reached. There should be one ServiceResolver per EKM replica. Currently, only a single ServiceResolver is supported. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EnableSingleTenantHsmInstance`

- Enable the SingleTenantHsmInstance. The SingleTenantHsmInstance must be in the DISABLED state to perform this operation.
- Version: v1

### `EncryptRequest`

- Request message for KeyManagementService.Encrypt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalAuthenticatedData` | string (byte) | Optional. Optional data that, if specified, must also be provided during decryption through DecryptRequest.additional_authenticated_data. The maximum size depends on the key version's protection_level. For SOFTWARE, EXTERNAL, and EXTERNAL_VPC keys the AAD must be no larger than 64KiB. For HSM keys, the combined length of the plaintext and additional_authenticated_data fields must be no larger than 8KiB. |
| `additionalAuthenticatedDataCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the EncryptRequest.additional_authenticated_data. If specified, KeyManagementService will verify the integrity of the received EncryptRequest.additional_authenticated_data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(EncryptRequest.additional_authenticated_data) is equal to EncryptRequest.additional_authenticated_data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `plaintext` | string (byte) | Required. The data to encrypt. Must be no larger than 64KiB. The maximum size depends on the key version's protection_level. For SOFTWARE, EXTERNAL, and EXTERNAL_VPC keys, the plaintext must be no larger than 64KiB. For HSM keys, the combined length of the plaintext and additional_authenticated_data fields must be no larger than 8KiB. |
| `plaintextCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the EncryptRequest.plaintext. If specified, KeyManagementService will verify the integrity of the received EncryptRequest.plaintext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(EncryptRequest.plaintext) is equal to EncryptRequest.plaintext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |

### `EncryptResponse`

- Response message for KeyManagementService.Encrypt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ciphertext` | string (byte) | The encrypted data. |
| `ciphertextCrc32c` | string (int64) | Integrity verification field. A CRC32C checksum of the returned EncryptResponse.ciphertext. An integrity check of EncryptResponse.ciphertext can be performed by computing the CRC32C checksum of EncryptResponse.ciphertext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `name` | string | The resource name of the CryptoKeyVersion used in encryption. Check this field to verify that the intended resource was used for encryption. |
| `protectionLevel` | string enum | The ProtectionLevel of the CryptoKeyVersion used in encryption. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |
| `verifiedAdditionalAuthenticatedDataCrc32c` | boolean | Integrity verification field. A flag indicating whether EncryptRequest.additional_authenticated_data_crc32c was received by KeyManagementService and used for the integrity verification of the AAD. A false value of this field indicates either that EncryptRequest.additional_authenticated_data_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set EncryptRequest.additional_authenticated_data_crc32c but this field is still false, discard the response and perform a limited number of retries. |
| `verifiedPlaintextCrc32c` | boolean | Integrity verification field. A flag indicating whether EncryptRequest.plaintext_crc32c was received by KeyManagementService and used for the integrity verification of the plaintext. A false value of this field indicates either that EncryptRequest.plaintext_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set EncryptRequest.plaintext_crc32c but this field is still false, discard the response and perform a limited number of retries. |

### `ExecuteSingleTenantHsmInstanceProposalRequest`

- Request message for HsmManagement.ExecuteSingleTenantHsmInstanceProposal.
- Version: v1

### `ExportTrustedKeyWrappedCryptoKeyVersionResponse`

- Response message for KeyManagementService.ExportTrustedKeyWrappedCryptoKeyVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `wrappedKey` | string (byte) | The wrapped key material. |
| `wrappedKeyCrc32c` | string (int64) | Integrity verification field. A CRC32C checksum of the returned ExportTrustedKeyWrappedCryptoKeyVersionResponse.wrapped_key. An integrity check of ExportTrustedKeyWrappedCryptoKeyVersionResponse.wrapped_key can be performed by computing the CRC32C checksum of ExportTrustedKeyWrappedCryptoKeyVersionResponse.wrapped_key and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `ExternalProtectionLevelOptions`

- ExternalProtectionLevelOptions stores a group of additional fields for configuring a CryptoKeyVersion that are specific to the EXTERNAL protection level and EXTERNAL_VPC protection levels.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ekmConnectionBackendOverride` | string | Optional. The resource name of the backend environment where the key material of CryptoKeyVersions is associated with. Setting this field overrides the crypto_key_backend. This field may be set when CryptoKeyVersions is set to EXTERNAL_VPC. Format: `projects/*/locations/*/ekmConnections/*`. |
| `ekmConnectionKeyPath` | string | Optional. The path to the external key material on the EKM when using EkmConnection e.g., "v0/my/key". Set this field instead of external_key_uri when using an EkmConnection. |
| `externalKeyUri` | string | Optional. The URI for an external resource that this CryptoKeyVersion represents. |

### `GenerateRandomBytesRequest`

- Request message for KeyManagementService.GenerateRandomBytes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lengthBytes` | integer (int32) | The length in bytes of the amount of randomness to retrieve. Minimum 8 bytes, maximum 1024 bytes. |
| `protectionLevel` | string enum | The ProtectionLevel to use when generating the random data. Currently, only HSM protection level is supported. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |

### `GenerateRandomBytesResponse`

- Response message for KeyManagementService.GenerateRandomBytes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | string (byte) | The generated data. |
| `dataCrc32c` | string (int64) | Integrity verification field. A CRC32C checksum of the returned GenerateRandomBytesResponse.data. An integrity check of GenerateRandomBytesResponse.data can be performed by computing the CRC32C checksum of GenerateRandomBytesResponse.data and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |

### `ImportCryptoKeyVersionRequest`

- Request message for KeyManagementService.ImportCryptoKeyVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `algorithm` | string enum | Required. The algorithm of the key being imported. This does not need to match the version_template of the CryptoKey this version imports into. Values: `CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED`, `GOOGLE_SYMMETRIC_ENCRYPTION`, `AES_128_GCM`, `AES_256_GCM`, `AES_128_CBC`, `AES_256_CBC`, `AES_128_CTR`, `AES_256_CTR`, `RSA_SIGN_PSS_2048_SHA256`, `RSA_SIGN_PSS_3072_SHA256`, `RSA_SIGN_PSS_4096_SHA256`, `RSA_SIGN_PSS_4096_SHA512`, `RSA_SIGN_PKCS1_2048_SHA256`, `RSA_SIGN_PKCS1_3072_SHA256`, `RSA_SIGN_PKCS1_4096_SHA256`, `RSA_SIGN_PKCS1_4096_SHA512`, `RSA_SIGN_RAW_PKCS1_2048`, `RSA_SIGN_RAW_PKCS1_3072`, `RSA_SIGN_RAW_PKCS1_4096`, `RSA_DECRYPT_OAEP_2048_SHA256`, `RSA_DECRYPT_OAEP_3072_SHA256`, `RSA_DECRYPT_OAEP_4096_SHA256`, `RSA_DECRYPT_OAEP_4096_SHA512`, `RSA_DECRYPT_OAEP_2048_SHA1`, `RSA_DECRYPT_OAEP_3072_SHA1`, `RSA_DECRYPT_OAEP_4096_SHA1`, `EC_SIGN_P256_SHA256`, `EC_SIGN_P384_SHA384`, `EC_SIGN_SECP256K1_SHA256`, `EC_SIGN_ED25519`, `HMAC_SHA256`, `HMAC_SHA1`, `HMAC_SHA384`, `HMAC_SHA512`, `HMAC_SHA224`, `EXTERNAL_SYMMETRIC_ENCRYPTION`, `ML_KEM_768`, `ML_KEM_1024`, `KEM_XWING`, `PQ_SIGN_ML_DSA_44`, `PQ_SIGN_ML_DSA_65`, `PQ_SIGN_ML_DSA_87`, `PQ_SIGN_SLH_DSA_SHA2_128S`, `PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256`, `PQ_SIGN_ML_DSA_44_EXTERNAL_MU`, `PQ_SIGN_ML_DSA_65_EXTERNAL_MU`, `PQ_SIGN_ML_DSA_87_EXTERNAL_MU`, `KEM_ECDH_P256`, `KEM_ECDH_P384`, `AES_256_KWP`. |
| `cryptoKeyVersion` | string | Optional. The optional name of an existing CryptoKeyVersion to target for an import operation. If this field is not present, a new CryptoKeyVersion containing the supplied key material is created. If this field is present, the supplied key material is imported into the existing CryptoKeyVersion. To import into an existing CryptoKeyVersion, the CryptoKeyVersion must be a child of ImportCryptoKeyVersionRequest.parent, have been previously created via ImportCryptoKeyVersion, and be in DESTROYED or IMPORT_FAILED state. The key material and algorithm must match the previous CryptoKeyVersion exactly if the CryptoKeyVersion has ever contained key material. |
| `importJob` | string | Required. The name of the ImportJob that was used to wrap this key material. |
| `rsaAesWrappedKey` | string (byte) | Optional. This field has the same meaning as wrapped_key. Prefer to use that field in new work. Either that field or this field (but not both) must be specified. |
| `trustedWrappingEnabled` | boolean | Optional. Whether trusted wrapping will be enabled on the imported \[CryptoKeyVersion\]. This field is only supported for keys with CryptoKeyVersionTemplate.protection_level HSM_SINGLE_TENANT. This field is supported for all CryptoKeyPurposes besides ENCRYPT_DECRYPT. |
| `wrappedKey` | string (byte) | Optional. The wrapped key material to import. Before wrapping, key material must be formatted. If importing symmetric key material, the expected key material format is plain bytes. If importing asymmetric key material, the expected key material format is PKCS#8-encoded DER (the PrivateKeyInfo structure from RFC 5208). When wrapping with import methods (RSA_OAEP_3072_SHA1_AES_256 or RSA_OAEP_4096_SHA1_AES_256 or RSA_OAEP_3072_SHA256_AES_256 or RSA_OAEP_4096_SHA256_AES_256), this field must contain the concatenation of: 1. An ephemeral AES-256 wrapping key wrapped with the public_key using RSAES-OAEP with SHA-1/SHA-256, MGF1 with SHA-1/SHA-256, and an empty label. 2. The formatted key to be imported, wrapped with the ephemeral AES-256 key using AES-KWP (RFC 5649). This format is the same as the format produced by PKCS#11 mechanism CKM_RSA_AES_KEY_WRAP. When wrapping with import methods (RSA_OAEP_3072_SHA256 or RSA_OAEP_4096_SHA256), this field must contain the formatted key to be imported, wrapped with the public_key using RSAES-OAEP with SHA-256, MGF1 with SHA-256, and an empty label. |

### `ImportJob`

- An ImportJob can be used to create CryptoKeys and CryptoKeyVersions using pre-existing key material, generated outside of Cloud KMS. When an ImportJob is created, Cloud KMS will generate a "wrapping key", which is a public/private key pair. You use the wrapping key to encrypt (also known as wrap) the pre-existing key material to protect it during the import process. The nature of the wrapping key depends on the choice of import_method. When the wrapping key generation is complete, the state will be set to ACTIVE and the public_key can be fetched. The fetched public key can then be used to wrap your pre-existing key material. Once the key material is wrapped, it can be imported into a new CryptoKeyVersion in an existing CryptoKey by calling ImportCryptoKeyVersion. Multiple CryptoKeyVersions can be imported with a single ImportJob. Cloud KMS uses the private key portion of the wrapping key to unwrap the key material. Only Cloud KMS has access to the private key. An ImportJob expires 3 days after it is created. Once expired, Cloud KMS will no longer be able to import or unwrap any key material that was wrapped with the ImportJob's public key. For more information, see Importing a key (https://cloud.google.com/kms/docs/importing-a-key).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attestation` | KeyOperationAttestation | Output only. Statement that was generated and signed by the key creator (for example, an HSM) at key creation time. Use this statement to verify attributes of the key as stored on the HSM, independently of Google. Only present if the chosen ImportMethod is one with a protection level of HSM. |
| `createTime` | string (google-datetime) | Output only. The time at which this ImportJob was created. |
| `cryptoKeyBackend` | string | Immutable. The resource name of the backend environment where the key material for the wrapping key resides and where all related cryptographic operations are performed. Currently, this field is only populated for keys stored in HSM_SINGLE_TENANT. Note, this list is non-exhaustive and may apply to additional ProtectionLevels in the future. Supported resources: \* `"projects/*/locations/*/singleTenantHsmInstances/*"` |
| `expireEventTime` | string (google-datetime) | Output only. The time this ImportJob expired. Only present if state is EXPIRED. |
| `expireTime` | string (google-datetime) | Output only. The time at which this ImportJob is scheduled for expiration and can no longer be used to import key material. |
| `generateTime` | string (google-datetime) | Output only. The time this ImportJob's key material was generated. |
| `importMethod` | string enum | Required. Immutable. The wrapping method to be used for incoming key material. Values: `IMPORT_METHOD_UNSPECIFIED`, `RSA_OAEP_3072_SHA1_AES_256`, `RSA_OAEP_4096_SHA1_AES_256`, `RSA_OAEP_3072_SHA256_AES_256`, `RSA_OAEP_4096_SHA256_AES_256`, `RSA_OAEP_3072_SHA256`, `RSA_OAEP_4096_SHA256`, `HPKE_KEM_ML_KEM_768_HKDF_SHA256_AES_256_GCM`, `HPKE_KEM_ML_KEM_1024_HKDF_SHA256_AES_256_GCM`, `HPKE_KEM_XWING_HKDF_SHA256_AES_256_GCM`. |
| `name` | string | Output only. The resource name for this ImportJob in the format `projects/*/locations/*/keyRings/*/importJobs/*`. |
| `protectionLevel` | string enum | Required. Immutable. The protection level of the ImportJob. This must match the protection_level of the version_template on the CryptoKey you attempt to import into. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |
| `publicKey` | WrappingPublicKey | Output only. The public key with which to wrap key material prior to import. Only returned if state is ACTIVE. |
| `publicKeyFormat` | string enum | Output only. Specifies the WrappingPublicKey format provided by the customer in the KeyManagementService.GetImportJob request. Values: `PUBLIC_KEY_FORMAT_UNSPECIFIED`, `PEM`, `DER`, `NIST_PQC`, `XWING_RAW_BYTES`. |
| `state` | string enum | Output only. The current state of the ImportJob, indicating if it can be used. Values: `IMPORT_JOB_STATE_UNSPECIFIED`, `PENDING_GENERATION`, `ACTIVE`, `EXPIRED`. |

### `ImportTrustedKeyWrappedCryptoKeyVersionRequest`

- Request message for KeyManagementService.ImportTrustedKeyWrappedCryptoKeyVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `algorithm` | string enum | Required. Required - The algorithm of the key being imported. This does not need to match the version_template of the CryptoKey this version imports into. Values: `CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED`, `GOOGLE_SYMMETRIC_ENCRYPTION`, `AES_128_GCM`, `AES_256_GCM`, `AES_128_CBC`, `AES_256_CBC`, `AES_128_CTR`, `AES_256_CTR`, `RSA_SIGN_PSS_2048_SHA256`, `RSA_SIGN_PSS_3072_SHA256`, `RSA_SIGN_PSS_4096_SHA256`, `RSA_SIGN_PSS_4096_SHA512`, `RSA_SIGN_PKCS1_2048_SHA256`, `RSA_SIGN_PKCS1_3072_SHA256`, `RSA_SIGN_PKCS1_4096_SHA256`, `RSA_SIGN_PKCS1_4096_SHA512`, `RSA_SIGN_RAW_PKCS1_2048`, `RSA_SIGN_RAW_PKCS1_3072`, `RSA_SIGN_RAW_PKCS1_4096`, `RSA_DECRYPT_OAEP_2048_SHA256`, `RSA_DECRYPT_OAEP_3072_SHA256`, `RSA_DECRYPT_OAEP_4096_SHA256`, `RSA_DECRYPT_OAEP_4096_SHA512`, `RSA_DECRYPT_OAEP_2048_SHA1`, `RSA_DECRYPT_OAEP_3072_SHA1`, `RSA_DECRYPT_OAEP_4096_SHA1`, `EC_SIGN_P256_SHA256`, `EC_SIGN_P384_SHA384`, `EC_SIGN_SECP256K1_SHA256`, `EC_SIGN_ED25519`, `HMAC_SHA256`, `HMAC_SHA1`, `HMAC_SHA384`, `HMAC_SHA512`, `HMAC_SHA224`, `EXTERNAL_SYMMETRIC_ENCRYPTION`, `ML_KEM_768`, `ML_KEM_1024`, `KEM_XWING`, `PQ_SIGN_ML_DSA_44`, `PQ_SIGN_ML_DSA_65`, `PQ_SIGN_ML_DSA_87`, `PQ_SIGN_SLH_DSA_SHA2_128S`, `PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256`, `PQ_SIGN_ML_DSA_44_EXTERNAL_MU`, `PQ_SIGN_ML_DSA_65_EXTERNAL_MU`, `PQ_SIGN_ML_DSA_87_EXTERNAL_MU`, `KEM_ECDH_P256`, `KEM_ECDH_P384`, `AES_256_KWP`. |
| `cryptoKeyVersion` | string | Optional. The optional name of an existing CryptoKeyVersion to target for an import operation. If this field is not present, a new CryptoKeyVersion containing the supplied key material is created. If this field is present, the supplied key material is imported into the existing CryptoKeyVersion. To import into an existing CryptoKeyVersion, the CryptoKeyVersion must be a child of ImportTrustedKeyWrappedCryptoKeyVersionRequest.parent, have been previously created via ImportTrustedKeyWrappedCryptoKeyVersion, and be in DESTROYED or IMPORT_FAILED state. The key material and algorithm must match the previous CryptoKeyVersion exactly if the CryptoKeyVersion has ever contained key material |
| `importingKey` | string | Required. Required - the CKV of the trusted key used to import. This can be the name of a CryptoKeyVersion or a CryptoKey. |
| `wrappedKey` | string (byte) | Required. The target key pre-wrapped on premises. |

### `KeyAccessJustificationsEnrollmentConfig`

- Represents the configuration of a protection level for a project's Key Access Justifications enrollment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogging` | boolean | Indicates whether the project has KAJ logging enabled. |
| `policyEnforcement` | boolean | Indicates whether the project is enrolled in KAJ policy enforcement. |

### `KeyAccessJustificationsPolicy`

- A KeyAccessJustificationsPolicy specifies zero or more allowed AccessReason values for encrypt, decrypt, and sign operations on a CryptoKey or KeyAccessJustificationsPolicyConfig (the default Key Access Justifications policy).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedAccessReasons` | array<string> | The list of allowed reasons for access to a CryptoKey. Note that empty allowed_access_reasons has a different meaning depending on where this message appears. If this is under KeyAccessJustificationsPolicyConfig, it means allow-all. If this is under CryptoKey, it means deny-all. Values: `REASON_UNSPECIFIED`, `CUSTOMER_INITIATED_SUPPORT`, `GOOGLE_INITIATED_SERVICE`, `THIRD_PARTY_DATA_REQUEST`, `GOOGLE_INITIATED_REVIEW`, `CUSTOMER_INITIATED_ACCESS`, `GOOGLE_INITIATED_SYSTEM_OPERATION`, `REASON_NOT_EXPECTED`, `MODIFIED_CUSTOMER_INITIATED_ACCESS`, `MODIFIED_GOOGLE_INITIATED_SYSTEM_OPERATION`, `GOOGLE_RESPONSE_TO_PRODUCTION_ALERT`, `CUSTOMER_AUTHORIZED_WORKFLOW_SERVICING`. |

### `KeyAccessJustificationsPolicyConfig`

- Represents a singleton configuration for Key Access Justifications policies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultKeyAccessJustificationPolicy` | KeyAccessJustificationsPolicy | Optional. Specifies the default key access justifications (KAJ) policy used when a CryptoKey is created in this folder. This is only used when a Key Access Justifications policy is not provided in the CreateCryptoKeyRequest. This overrides any default policies in its ancestry. If this field is unset, or is set but contains an empty allowed_access_reasons list, no default Key Access Justifications (KAJ) policy configuration is active. In this scenario, all newly created keys will default to an "allow-all" policy. |
| `defaultPolicyAvailable` | boolean | Output only. Indicates whether this parent resource is available to default policy feature. Please consult the prerequisite of default policy feature (https://cloud.google.com/assured-workloads/key-access-justifications/docs/set-default-policy#before) for more details. |
| `name` | string | Identifier. Represents the resource name for this KeyAccessJustificationsPolicyConfig in the format of "{organizations\|folders\|projects}/\*/kajPolicyConfig". |

### `KeyHandle`

- Resource-oriented representation of a request to Cloud KMS Autokey and the resulting provisioning of a CryptoKey.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKey` | string | Output only. Name of a CryptoKey that has been provisioned for Customer Managed Encryption Key (CMEK) use in the KeyHandle project and location for the requested resource type. The CryptoKey project will reflect the value configured in the AutokeyConfig on the resource project's ancestor folder at the time of the KeyHandle creation. If more than one ancestor folder has a configured AutokeyConfig, the nearest of these configurations is used. |
| `name` | string | Identifier. Name of the KeyHandle resource, e.g. `projects/{PROJECT_ID}/locations/{LOCATION}/keyHandles/{KEY_HANDLE_ID}`. |
| `resourceTypeSelector` | string | Required. Indicates the resource type that the resulting CryptoKey is meant to protect, e.g. `{SERVICE}.googleapis.com/{TYPE}`. See documentation for supported resource types. |

### `KeyOperationAttestation`

- Contains an HSM-generated attestation about a key operation. For more information, see \[Verifying attestations\] (https://cloud.google.com/kms/docs/attest-key).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certChains` | CertificateChains | Output only. The certificate chains needed to validate the attestation |
| `content` | string (byte) | Output only. The attestation data provided by the HSM when the key operation was performed. |
| `format` | string enum | Output only. The format of the attestation data. Values: `ATTESTATION_FORMAT_UNSPECIFIED`, `CAVIUM_V1_COMPRESSED`, `CAVIUM_V2_COMPRESSED`, `CAVIUM_V209`. |

### `KeyRing`

- A KeyRing is a toplevel logical grouping of CryptoKeys.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which this KeyRing was created. |
| `name` | string | Output only. The resource name for the KeyRing in the format `projects/*/locations/*/keyRings/*`. |

### `ListCryptoKeyVersionsResponse`

- Response message for KeyManagementService.ListCryptoKeyVersions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cryptoKeyVersions` | array<CryptoKeyVersion> | The list of CryptoKeyVersions. |
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListCryptoKeyVersionsRequest.page_token to retrieve the next page of results. |
| `totalSize` | integer (int32) | The total number of CryptoKeyVersions that matched the query. This field is not populated if ListCryptoKeyVersionsRequest.filter is applied. |

### `ListCryptoKeysResponse`

- Response message for KeyManagementService.ListCryptoKeys.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cryptoKeys` | array<CryptoKey> | The list of CryptoKeys. |
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListCryptoKeysRequest.page_token to retrieve the next page of results. |
| `totalSize` | integer (int32) | The total number of CryptoKeys that matched the query. This field is not populated if ListCryptoKeysRequest.filter is applied. |

### `ListEkmConnectionsResponse`

- Response message for EkmService.ListEkmConnections.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ekmConnections` | array<EkmConnection> | The list of EkmConnections. |
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListEkmConnectionsRequest.page_token to retrieve the next page of results. |
| `totalSize` | integer (int32) | The total number of EkmConnections that matched the query. This field is not populated if ListEkmConnectionsRequest.filter is applied. |

### `ListImportJobsResponse`

- Response message for KeyManagementService.ListImportJobs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `importJobs` | array<ImportJob> | The list of ImportJobs. |
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListImportJobsRequest.page_token to retrieve the next page of results. |
| `totalSize` | integer (int32) | The total number of ImportJobs that matched the query. This field is not populated if ListImportJobsRequest.filter is applied. |

### `ListKeyHandlesResponse`

- Response message for Autokey.ListKeyHandles.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyHandles` | array<KeyHandle> | Resulting KeyHandles. |
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListKeyHandlesRequest.page_token to retrieve the next page of results. |

### `ListKeyRingsResponse`

- Response message for KeyManagementService.ListKeyRings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyRings` | array<KeyRing> | The list of KeyRings. |
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListKeyRingsRequest.page_token to retrieve the next page of results. |
| `totalSize` | integer (int32) | The total number of KeyRings that matched the query. This field is not populated if ListKeyRingsRequest.filter is applied. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListRetiredResourcesResponse`

- Response message for KeyManagementService.ListRetiredResources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. Pass this value in ListRetiredResourcesRequest.page_token to retrieve the next page of results. |
| `retiredResources` | array<RetiredResource> | The list of RetiredResources. |
| `totalSize` | string (int64) | The total number of RetiredResources that matched the query. |

### `ListSingleTenantHsmInstanceProposalsResponse`

- Response message for HsmManagement.ListSingleTenantHsmInstanceProposals.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListSingleTenantHsmInstanceProposalsRequest.page_token to retrieve the next page of results. |
| `singleTenantHsmInstanceProposals` | array<SingleTenantHsmInstanceProposal> | The list of SingleTenantHsmInstanceProposals. |
| `totalSize` | integer (int32) | The total number of SingleTenantHsmInstanceProposals that matched the query. This field is not populated if ListSingleTenantHsmInstanceProposalsRequest.filter is applied. |

### `ListSingleTenantHsmInstancesResponse`

- Response message for HsmManagement.ListSingleTenantHsmInstances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in ListSingleTenantHsmInstancesRequest.page_token to retrieve the next page of results. |
| `singleTenantHsmInstances` | array<SingleTenantHsmInstance> | The list of SingleTenantHsmInstances. |
| `totalSize` | integer (int32) | The total number of SingleTenantHsmInstances that matched the query. This field is not populated if ListSingleTenantHsmInstancesRequest.filter is applied. |

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

### `LocationMetadata`

- Cloud KMS metadata for the given google.cloud.location.Location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ekmAvailable` | boolean | Indicates whether CryptoKeys with protection_level EXTERNAL can be created in this location. |
| `hsmAvailable` | boolean | Indicates whether CryptoKeys with protection_level HSM can be created in this location. |
| `hsmSingleTenantAvailable` | boolean | Indicates whether CryptoKeys with protection_level HSM_SINGLE_TENANT can be created in this location. |

### `MacSignRequest`

- Request message for KeyManagementService.MacSign.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | string (byte) | Required. The data to sign. The MAC tag is computed over this data field based on the specific algorithm. |
| `dataCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the MacSignRequest.data. If specified, KeyManagementService will verify the integrity of the received MacSignRequest.data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(MacSignRequest.data) is equal to MacSignRequest.data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |

### `MacSignResponse`

- Response message for KeyManagementService.MacSign.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mac` | string (byte) | The created signature. |
| `macCrc32c` | string (int64) | Integrity verification field. A CRC32C checksum of the returned MacSignResponse.mac. An integrity check of MacSignResponse.mac can be performed by computing the CRC32C checksum of MacSignResponse.mac and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `name` | string | The resource name of the CryptoKeyVersion used for signing. Check this field to verify that the intended resource was used for signing. |
| `protectionLevel` | string enum | The ProtectionLevel of the CryptoKeyVersion used for signing. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |
| `verifiedDataCrc32c` | boolean | Integrity verification field. A flag indicating whether MacSignRequest.data_crc32c was received by KeyManagementService and used for the integrity verification of the data. A false value of this field indicates either that MacSignRequest.data_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set MacSignRequest.data_crc32c but this field is still false, discard the response and perform a limited number of retries. |

### `MacVerifyRequest`

- Request message for KeyManagementService.MacVerify.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | string (byte) | Required. The data used previously as a MacSignRequest.data to generate the MAC tag. |
| `dataCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the MacVerifyRequest.data. If specified, KeyManagementService will verify the integrity of the received MacVerifyRequest.data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(MacVerifyRequest.data) is equal to MacVerifyRequest.data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `mac` | string (byte) | Required. The signature to verify. |
| `macCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the MacVerifyRequest.mac. If specified, KeyManagementService will verify the integrity of the received MacVerifyRequest.mac using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(MacVerifyRequest.mac) is equal to MacVerifyRequest.mac_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |

### `MacVerifyResponse`

- Response message for KeyManagementService.MacVerify.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The resource name of the CryptoKeyVersion used for verification. Check this field to verify that the intended resource was used for verification. |
| `protectionLevel` | string enum | The ProtectionLevel of the CryptoKeyVersion used for verification. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |
| `success` | boolean | This field indicates whether or not the verification operation for MacVerifyRequest.mac over MacVerifyRequest.data was successful. |
| `verifiedDataCrc32c` | boolean | Integrity verification field. A flag indicating whether MacVerifyRequest.data_crc32c was received by KeyManagementService and used for the integrity verification of the data. A false value of this field indicates either that MacVerifyRequest.data_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set MacVerifyRequest.data_crc32c but this field is still false, discard the response and perform a limited number of retries. |
| `verifiedMacCrc32c` | boolean | Integrity verification field. A flag indicating whether MacVerifyRequest.mac_crc32c was received by KeyManagementService and used for the integrity verification of the data. A false value of this field indicates either that MacVerifyRequest.mac_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set MacVerifyRequest.mac_crc32c but this field is still false, discard the response and perform a limited number of retries. |
| `verifiedSuccessIntegrity` | boolean | Integrity verification field. This value is used for the integrity verification of \[MacVerifyResponse.success\]. If the value of this field contradicts the value of \[MacVerifyResponse.success\], discard the response and perform a limited number of retries. |

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

- The public keys for a given CryptoKeyVersion. Obtained via GetPublicKey.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `algorithm` | string enum | The Algorithm associated with this key. Values: `CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED`, `GOOGLE_SYMMETRIC_ENCRYPTION`, `AES_128_GCM`, `AES_256_GCM`, `AES_128_CBC`, `AES_256_CBC`, `AES_128_CTR`, `AES_256_CTR`, `RSA_SIGN_PSS_2048_SHA256`, `RSA_SIGN_PSS_3072_SHA256`, `RSA_SIGN_PSS_4096_SHA256`, `RSA_SIGN_PSS_4096_SHA512`, `RSA_SIGN_PKCS1_2048_SHA256`, `RSA_SIGN_PKCS1_3072_SHA256`, `RSA_SIGN_PKCS1_4096_SHA256`, `RSA_SIGN_PKCS1_4096_SHA512`, `RSA_SIGN_RAW_PKCS1_2048`, `RSA_SIGN_RAW_PKCS1_3072`, `RSA_SIGN_RAW_PKCS1_4096`, `RSA_DECRYPT_OAEP_2048_SHA256`, `RSA_DECRYPT_OAEP_3072_SHA256`, `RSA_DECRYPT_OAEP_4096_SHA256`, `RSA_DECRYPT_OAEP_4096_SHA512`, `RSA_DECRYPT_OAEP_2048_SHA1`, `RSA_DECRYPT_OAEP_3072_SHA1`, `RSA_DECRYPT_OAEP_4096_SHA1`, `EC_SIGN_P256_SHA256`, `EC_SIGN_P384_SHA384`, `EC_SIGN_SECP256K1_SHA256`, `EC_SIGN_ED25519`, `HMAC_SHA256`, `HMAC_SHA1`, `HMAC_SHA384`, `HMAC_SHA512`, `HMAC_SHA224`, `EXTERNAL_SYMMETRIC_ENCRYPTION`, `ML_KEM_768`, `ML_KEM_1024`, `KEM_XWING`, `PQ_SIGN_ML_DSA_44`, `PQ_SIGN_ML_DSA_65`, `PQ_SIGN_ML_DSA_87`, `PQ_SIGN_SLH_DSA_SHA2_128S`, `PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256`, `PQ_SIGN_ML_DSA_44_EXTERNAL_MU`, `PQ_SIGN_ML_DSA_65_EXTERNAL_MU`, `PQ_SIGN_ML_DSA_87_EXTERNAL_MU`, `KEM_ECDH_P256`, `KEM_ECDH_P384`, `AES_256_KWP`. |
| `name` | string | The name of the CryptoKeyVersion public key. Provided here for verification. |
| `pem` | string | The public key, encoded in PEM format. For more information, see the RFC 7468 (https://tools.ietf.org/html/rfc7468) sections for General Considerations (https://tools.ietf.org/html/rfc7468#section-2) and \[Textual Encoding of Subject Public Key Info\] (https://tools.ietf.org/html/rfc7468#section-13). |
| `pemCrc32c` | string (int64) | Integrity verification field. A CRC32C checksum of the returned PublicKey.pem. An integrity check of PublicKey.pem can be performed by computing the CRC32C checksum of PublicKey.pem and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed `2^32-1`, and can be safely downconverted to uint32 in languages that support this type. |
| `protectionLevel` | string enum | The ProtectionLevel of the CryptoKeyVersion public key. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |
| `publicKey` | ChecksummedData | This field contains the public key (with integrity verification), formatted according to the public_key_format field. |
| `publicKeyFormat` | string enum | The PublicKey format specified by the customer through the public_key_format field. Values: `PUBLIC_KEY_FORMAT_UNSPECIFIED`, `PEM`, `DER`, `NIST_PQC`, `XWING_RAW_BYTES`. |

### `QuorumAuth`

- Configuration for M of N quorum auth.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requiredApproverCount` | integer (int32) | Output only. The required numbers of approvers. The M value used for M of N quorum auth. Must be greater than or equal to 2 and less than or equal to total_approver_count - 1. |
| `totalApproverCount` | integer (int32) | Required. The total number of approvers. This is the N value used for M of N quorum auth. Must be greater than or equal to 3 and less than or equal to 16. |
| `twoFactorPublicKeyPems` | array<string> | Output only. The public keys associated with the 2FA keys for M of N quorum auth. |

### `QuorumParameters`

- Parameters of quorum approval for the SingleTenantHsmInstanceProposal.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvedTwoFactorPublicKeyPems` | array<string> | Output only. The public keys associated with the 2FA keys that have already approved the SingleTenantHsmInstanceProposal by signing the challenge. |
| `challenges` | array<Challenge> | Output only. The challenges to be signed by 2FA keys for quorum auth. M of N of these challenges are required to be signed to approve the operation. |
| `requiredApproverCount` | integer (int32) | Output only. The required numbers of approvers. This is the M value used for M of N quorum auth. It is less than the number of public keys. |

### `QuorumReply`

- The reply to QuorumParameters for approving the proposal.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `challengeReplies` | array<ChallengeReply> | Required. The challenge replies to approve the proposal. Challenge replies can be sent across multiple requests. The proposal will be approved when required_approver_count challenge replies are provided. |

### `RawDecryptRequest`

- Request message for KeyManagementService.RawDecrypt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalAuthenticatedData` | string (byte) | Optional. Optional data that must match the data originally supplied in RawEncryptRequest.additional_authenticated_data. |
| `additionalAuthenticatedDataCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the RawDecryptRequest.additional_authenticated_data. If specified, KeyManagementService will verify the integrity of the received additional_authenticated_data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(additional_authenticated_data) is equal to additional_authenticated_data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `ciphertext` | string (byte) | Required. The encrypted data originally returned in RawEncryptResponse.ciphertext. |
| `ciphertextCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the RawDecryptRequest.ciphertext. If specified, KeyManagementService will verify the integrity of the received ciphertext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(ciphertext) is equal to ciphertext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `initializationVector` | string (byte) | Required. The initialization vector (IV) used during encryption, which must match the data originally provided in RawEncryptResponse.initialization_vector. |
| `initializationVectorCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the RawDecryptRequest.initialization_vector. If specified, KeyManagementService will verify the integrity of the received initialization_vector using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(initialization_vector) is equal to initialization_vector_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `tagLength` | integer (int32) | The length of the authentication tag that is appended to the end of the ciphertext. If unspecified (0), the default value for the key's algorithm will be used (for AES-GCM, the default value is 16). |

### `RawDecryptResponse`

- Response message for KeyManagementService.RawDecrypt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `plaintext` | string (byte) | The decrypted data. |
| `plaintextCrc32c` | string (int64) | Integrity verification field. A CRC32C checksum of the returned RawDecryptResponse.plaintext. An integrity check of plaintext can be performed by computing the CRC32C checksum of plaintext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: receiving this response message indicates that KeyManagementService is able to successfully decrypt the ciphertext. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `protectionLevel` | string enum | The ProtectionLevel of the CryptoKeyVersion used in decryption. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |
| `verifiedAdditionalAuthenticatedDataCrc32c` | boolean | Integrity verification field. A flag indicating whether RawDecryptRequest.additional_authenticated_data_crc32c was received by KeyManagementService and used for the integrity verification of additional_authenticated_data. A false value of this field indicates either that // RawDecryptRequest.additional_authenticated_data_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set RawDecryptRequest.additional_authenticated_data_crc32c but this field is still false, discard the response and perform a limited number of retries. |
| `verifiedCiphertextCrc32c` | boolean | Integrity verification field. A flag indicating whether RawDecryptRequest.ciphertext_crc32c was received by KeyManagementService and used for the integrity verification of the ciphertext. A false value of this field indicates either that RawDecryptRequest.ciphertext_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set RawDecryptRequest.ciphertext_crc32c but this field is still false, discard the response and perform a limited number of retries. |
| `verifiedInitializationVectorCrc32c` | boolean | Integrity verification field. A flag indicating whether RawDecryptRequest.initialization_vector_crc32c was received by KeyManagementService and used for the integrity verification of initialization_vector. A false value of this field indicates either that RawDecryptRequest.initialization_vector_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set RawDecryptRequest.initialization_vector_crc32c but this field is still false, discard the response and perform a limited number of retries. |

### `RawEncryptRequest`

- Request message for KeyManagementService.RawEncrypt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalAuthenticatedData` | string (byte) | Optional. Optional data that, if specified, must also be provided during decryption through RawDecryptRequest.additional_authenticated_data. This field may only be used in conjunction with an algorithm that accepts additional authenticated data (for example, AES-GCM). The maximum size depends on the key version's protection_level. For SOFTWARE keys, the plaintext must be no larger than 64KiB. For HSM keys, the combined length of the plaintext and additional_authenticated_data fields must be no larger than 8KiB. |
| `additionalAuthenticatedDataCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the RawEncryptRequest.additional_authenticated_data. If specified, KeyManagementService will verify the integrity of the received additional_authenticated_data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(additional_authenticated_data) is equal to additional_authenticated_data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `initializationVector` | string (byte) | Optional. A customer-supplied initialization vector that will be used for encryption. If it is not provided for AES-CBC and AES-CTR, one will be generated. It will be returned in RawEncryptResponse.initialization_vector. |
| `initializationVectorCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the RawEncryptRequest.initialization_vector. If specified, KeyManagementService will verify the integrity of the received initialization_vector using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(initialization_vector) is equal to initialization_vector_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `plaintext` | string (byte) | Required. The data to encrypt. Must be no larger than 64KiB. The maximum size depends on the key version's protection_level. For SOFTWARE keys, the plaintext must be no larger than 64KiB. For HSM keys, the combined length of the plaintext and additional_authenticated_data fields must be no larger than 8KiB. |
| `plaintextCrc32c` | string (int64) | Optional. An optional CRC32C checksum of the RawEncryptRequest.plaintext. If specified, KeyManagementService will verify the integrity of the received plaintext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(plaintext) is equal to plaintext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |

### `RawEncryptResponse`

- Response message for KeyManagementService.RawEncrypt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ciphertext` | string (byte) | The encrypted data. In the case of AES-GCM, the authentication tag is the tag_length bytes at the end of this field. |
| `ciphertextCrc32c` | string (int64) | Integrity verification field. A CRC32C checksum of the returned RawEncryptResponse.ciphertext. An integrity check of ciphertext can be performed by computing the CRC32C checksum of ciphertext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `initializationVector` | string (byte) | The initialization vector (IV) generated by the service during encryption. This value must be stored and provided in RawDecryptRequest.initialization_vector at decryption time. |
| `initializationVectorCrc32c` | string (int64) | Integrity verification field. A CRC32C checksum of the returned RawEncryptResponse.initialization_vector. An integrity check of initialization_vector can be performed by computing the CRC32C checksum of initialization_vector and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. |
| `name` | string | The resource name of the CryptoKeyVersion used in encryption. Check this field to verify that the intended resource was used for encryption. |
| `protectionLevel` | string enum | The ProtectionLevel of the CryptoKeyVersion used in encryption. Values: `PROTECTION_LEVEL_UNSPECIFIED`, `SOFTWARE`, `HSM`, `EXTERNAL`, `EXTERNAL_VPC`, `HSM_SINGLE_TENANT`. |
| `tagLength` | integer (int32) | The length of the authentication tag that is appended to the end of the ciphertext. |
| `verifiedAdditionalAuthenticatedDataCrc32c` | boolean | Integrity verification field. A flag indicating whether RawEncryptRequest.additional_authenticated_data_crc32c was received by KeyManagementService and used for the integrity verification of additional_authenticated_data. A false value of this field indicates either that // RawEncryptRequest.additional_authenticated_data_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set RawEncryptRequest.additional_authenticated_data_crc32c but this field is still false, discard the response and perform a limited number of retries. |
| `verifiedInitializationVectorCrc32c` | boolean | Integrity verification field. A flag indicating whether RawEncryptRequest.initialization_vector_crc32c was received by KeyManagementService and used for the integrity verification of initialization_vector. A false value of this field indicates either that RawEncryptRequest.initialization_vector_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set RawEncryptRequest.initialization_vector_crc32c but this field is still false, discard the response and perform a limited number of retries. |
| `verifiedPlaintextCrc32c` | boolean | Integrity verification field. A flag indicating whether RawEncryptRequest.plaintext_crc32c was received by KeyManagementService and used for the integrity verification of the plaintext. A false value of this field indicates either that RawEncryptRequest.plaintext_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set RawEncryptRequest.plaintext_crc32c but this field is still false, discard the response and perform a limited number of retries. |

### `RefreshSingleTenantHsmInstance`

- Refreshes the SingleTenantHsmInstance. This operation must be performed periodically to keep the SingleTenantHsmInstance active. This operation must be performed before unrefreshed_duration_until_disable has passed. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation.
- Version: v1

### `RegisterTwoFactorAuthKeys`

- Register 2FA keys for the SingleTenantHsmInstance. This operation requires all Challenges to be signed by 2FA keys. The SingleTenantHsmInstance must be in the PENDING_TWO_FACTOR_AUTH_REGISTRATION state to perform this operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requiredApproverCount` | integer (int32) | Required. The required numbers of approvers to set for the SingleTenantHsmInstance. This is the M value used for M of N quorum auth. Must be greater than or equal to 2 and less than or equal to total_approver_count - 1. |
| `twoFactorPublicKeyPems` | array<string> | Required. The public keys associated with the 2FA keys for M of N quorum auth. Public keys must be associated with RSA 2048 keys. |

### `RemoveQuorumMember`

- Remove a quorum member from the SingleTenantHsmInstance. This will reduce total_approver_count by 1. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `twoFactorPublicKeyPem` | string | Required. The public key associated with the 2FA key for the quorum member to remove. Public keys must be associated with RSA 2048 keys. |

### `RequiredActionQuorumParameters`

- Parameters for an approval that has both required challenges and a quorum.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvedTwoFactorPublicKeyPems` | array<string> | Output only. The public keys associated with the 2FA keys that have already approved the SingleTenantHsmInstanceProposal by signing the challenge. |
| `quorumChallenges` | array<Challenge> | Output only. The challenges to be signed by 2FA keys for quorum auth. M of N of these challenges are required to be signed to approve the operation. |
| `requiredApproverCount` | integer (int32) | Output only. The required number of quorum approvers. This is the M value used for M of N quorum auth. It is less than the number of public keys. |
| `requiredChallenges` | array<Challenge> | Output only. A list of specific challenges that must be signed. For some operations, this will contain a single challenge. |

### `RequiredActionQuorumReply`

- The reply to RequiredActionQuorumParameters for approving the proposal.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `quorumChallengeReplies` | array<ChallengeReply> | Required. Quorum members' signed challenge replies. These can be provided across multiple requests. The proposal will be approved when required_approver_count quorum_challenge_replies are provided and when all required_challenge_replies are provided. |
| `requiredChallengeReplies` | array<ChallengeReply> | Required. All required challenges must be signed for the proposal to be approved. These can be sent across multiple requests. |

### `RestoreCryptoKeyVersionRequest`

- Request message for KeyManagementService.RestoreCryptoKeyVersion.
- Version: v1

### `RetiredResource`

- A RetiredResource resource represents the record of a deleted CryptoKey. Its purpose is to provide visibility into retained user data and to prevent reuse of these names for new CryptoKeys.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleteTime` | string (google-datetime) | Output only. The time at which the original resource was deleted and this RetiredResource record was created. |
| `name` | string | Output only. Identifier. The resource name for this RetiredResource in the format `projects/*/locations/*/retiredResources/*`. |
| `originalResource` | string | Output only. The full resource name of the original CryptoKey that was deleted in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`. |
| `resourceType` | string | Output only. The resource type of the original deleted resource. |

### `ServiceResolver`

- A ServiceResolver represents an EKM replica that can be reached within an EkmConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpointFilter` | string | Optional. The filter applied to the endpoints of the resolved service. If no filter is specified, all endpoints will be considered. An endpoint will be chosen arbitrarily from the filtered list for each request. For endpoint filter syntax and examples, see https://cloud.google.com/service-directory/docs/reference/rpc/google.cloud.servicedirectory.v1#resolveservicerequest. |
| `hostname` | string | Required. The hostname of the EKM replica used at TLS and HTTP layers. |
| `serverCertificates` | array<Certificate> | Required. A list of leaf server certificates used to authenticate HTTPS connections to the EKM replica. Currently, a maximum of 10 Certificate is supported. |
| `serviceDirectoryService` | string | Required. The resource name of the Service Directory service pointing to an EKM replica, in the format `projects/*/locations/*/namespaces/*/services/*`. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `ShowEffectiveAutokeyConfigResponse`

- Response message for ShowEffectiveAutokeyConfig
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyProject` | string | Name of the key project configured in the ancestry of the project or folder. |
| `keyProjectResolutionMode` | string enum | The KeyProjectResolutionMode for the AutokeyConfig. Values: `KEY_PROJECT_RESOLUTION_MODE_UNSPECIFIED`, `DEDICATED_KEY_PROJECT`, `RESOURCE_PROJECT`, `DISABLED`. |
| `source` | Source | Source of the effective AutokeyConfig. |

### `ShowEffectiveKeyAccessJustificationsEnrollmentConfigResponse`

- Represents a response message for KeyAccessJustificationsConfig.ShowEffectiveKeyAccessJustificationsEnrollmentConfig
- Version: v1

| Field | Type | Description |
|---|---|---|
| `externalConfig` | KeyAccessJustificationsEnrollmentConfig | Contains the effective KeyAccessJustificationsEnrollmentConfig for external keys. |
| `hardwareConfig` | KeyAccessJustificationsEnrollmentConfig | Contains the effective KeyAccessJustificationsEnrollmentConfig for hardware keys. |
| `softwareConfig` | KeyAccessJustificationsEnrollmentConfig | Contains the effective KeyAccessJustificationsEnrollmentConfig for software keys. |

### `ShowEffectiveKeyAccessJustificationsPolicyConfigResponse`

- Represents a response message for KeyAccessJustificationsConfig.ShowEffectiveKeyAccessJustificationsPolicyConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `effectiveKajPolicy` | KeyAccessJustificationsPolicyConfig | Contains the effective KeyAccessJustificationsPolicyConfig. |

### `SingleTenantHsmInstance`

- A SingleTenantHsmInstance represents a single-tenant HSM instance. It can be used for creating CryptoKeys with a ProtectionLevel of HSM_SINGLE_TENANT, as well as performing cryptographic operations using keys created within the SingleTenantHsmInstance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which the SingleTenantHsmInstance was created. |
| `deleteTime` | string (google-datetime) | Output only. The time at which the SingleTenantHsmInstance was deleted. |
| `disableTime` | string (google-datetime) | Output only. The time at which the instance will be automatically disabled if not refreshed. This field is updated upon creation and after each successful refresh operation and enable. A RefreshSingleTenantHsmInstance operation must be made via a SingleTenantHsmInstanceProposal before this time otherwise the SingleTenantHsmInstance will become disabled. |
| `keyPortabilityEnabled` | boolean | Optional. Immutable. Indicates whether key portability is enabled for the SingleTenantHsmInstance. This can only be set at creation time. Key portability features are disabled by default. |
| `name` | string | Identifier. The resource name for this SingleTenantHsmInstance in the format `projects/*/locations/*/singleTenantHsmInstances/*`. |
| `quorumAuth` | QuorumAuth | Required. The quorum auth configuration for the SingleTenantHsmInstance. |
| `state` | string enum | Output only. The state of the SingleTenantHsmInstance. Values: `STATE_UNSPECIFIED`, `CREATING`, `PENDING_TWO_FACTOR_AUTH_REGISTRATION`, `ACTIVE`, `DISABLING`, `DISABLED`, `DELETING`, `DELETED`, `FAILED`. |
| `unrefreshedDurationUntilDisable` | string (google-duration) | Output only. The system-defined duration that an instance can remain unrefreshed until it is automatically disabled. This will have a value of 730 days. |

### `SingleTenantHsmInstanceProposal`

- A SingleTenantHsmInstanceProposal represents a proposal to perform an operation on a SingleTenantHsmInstance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addQuorumMember` | AddQuorumMember | Add a quorum member to the SingleTenantHsmInstance. This will increase the total_approver_count by 1. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation. |
| `createTime` | string (google-datetime) | Output only. The time at which the SingleTenantHsmInstanceProposal was created. |
| `deleteSingleTenantHsmInstance` | DeleteSingleTenantHsmInstance | Delete the SingleTenantHsmInstance. Deleting a SingleTenantHsmInstance will make all CryptoKeys attached to the SingleTenantHsmInstance unusable. The SingleTenantHsmInstance must be in the DISABLED or PENDING_TWO_FACTOR_AUTH_REGISTRATION state to perform this operation. |
| `deleteTime` | string (google-datetime) | Output only. The time at which the SingleTenantHsmInstanceProposal was deleted. |
| `disableSingleTenantHsmInstance` | DisableSingleTenantHsmInstance | Disable the SingleTenantHsmInstance. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation. |
| `enableSingleTenantHsmInstance` | EnableSingleTenantHsmInstance | Enable the SingleTenantHsmInstance. The SingleTenantHsmInstance must be in the DISABLED state to perform this operation. |
| `expireTime` | string (google-datetime) | The time at which the SingleTenantHsmInstanceProposal will expire if not approved and executed. |
| `failureReason` | string | Output only. The root cause of the most recent failure. Only present if state is FAILED. |
| `name` | string | Identifier. The resource name for this SingleTenantHsmInstance in the format `projects/*/locations/*/singleTenantHsmInstances/*/proposals/*`. |
| `purgeTime` | string (google-datetime) | Output only. The time at which the soft-deleted SingleTenantHsmInstanceProposal will be permanently purged. This field is only populated when the state is DELETED and will be set a time after expiration of the proposal, i.e. >= expire_time or (create_time + ttl). |
| `quorumParameters` | QuorumParameters | Output only. The quorum approval parameters for the SingleTenantHsmInstanceProposal. |
| `refreshSingleTenantHsmInstance` | RefreshSingleTenantHsmInstance | Refreshes the SingleTenantHsmInstance. This operation must be performed periodically to keep the SingleTenantHsmInstance active. This operation must be performed before unrefreshed_duration_until_disable has passed. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation. |
| `registerTwoFactorAuthKeys` | RegisterTwoFactorAuthKeys | Register 2FA keys for the SingleTenantHsmInstance. This operation requires all N Challenges to be signed by 2FA keys. The SingleTenantHsmInstance must be in the PENDING_TWO_FACTOR_AUTH_REGISTRATION state to perform this operation. |
| `removeQuorumMember` | RemoveQuorumMember | Remove a quorum member from the SingleTenantHsmInstance. This will reduce total_approver_count by 1. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation. |
| `requiredActionQuorumParameters` | RequiredActionQuorumParameters | Output only. Parameters for an approval of a SingleTenantHsmInstanceProposal that has both required challenges and a quorum. |
| `state` | string enum | Output only. The state of the SingleTenantHsmInstanceProposal. Values: `STATE_UNSPECIFIED`, `CREATING`, `PENDING`, `APPROVED`, `RUNNING`, `SUCCEEDED`, `FAILED`, `DELETED`. |
| `ttl` | string (google-duration) | Input only. The TTL for the SingleTenantHsmInstanceProposal. Proposals will expire after this duration. |
| `upgradeKeyTrust` | UpgradeKeyTrust | Promotes a key with the AES_WRAPPING purpose to a trusted wrapping key. The key must be in the ACTIVE state to perform this operation. |

### `Source`

- Source of the effective AutokeyConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Contains the resource name of the AutokeyConfig that is effective, for example, `folders/{FOLDER_NUMBER}` or `projects/{PROJECT_NUMBER}` or `organizations/{ORGANIZATION_NUMBER}`. |

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

### `UpdateCryptoKeyPrimaryVersionRequest`

- Request message for KeyManagementService.UpdateCryptoKeyPrimaryVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cryptoKeyVersionId` | string | Required. The id of the child CryptoKeyVersion to use as primary. |

### `UpgradeKeyTrust`

- Promotes a key with the AES_WRAPPING purpose to a trusted wrapping key. The key must be in the ACTIVE state to perform this operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The name of the CryptoKeyVersion to promote. |
| `twoFactorPublicKeyPem` | string | Required. The public key associated with the 2FA key that will sign the login nonce for this operation. |

### `VerifyConnectivityResponse`

- Response message for EkmService.VerifyConnectivity.
- Version: v1

### `WrappingPublicKey`

- The public key component of the wrapping key. For details of the type of key this public key corresponds to, see the ImportMethod.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | string (byte) | Output only. Contains the public key, formatted according to the PublicKey.PublicKeyFormat specified in the KeyManagementService.GetImportJob request. |
| `pem` | string | The public key, encoded in PEM format. For more information, see the RFC 7468 (https://tools.ietf.org/html/rfc7468) sections for General Considerations (https://tools.ietf.org/html/rfc7468#section-2) and \[Textual Encoding of Subject Public Key Info\] (https://tools.ietf.org/html/rfc7468#section-13). This field gets populated by default for RSA-based import methods, if no public_key_format is specified in the request. If you want to retrieve the wrapping key of an ImportJob in some other format, use KeyManagementService.GetImportJob and set the public_key_format to the desired public key format. |

### Shape of `AddQuorumMember`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "twoFactorPublicKeyPem": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `cloudkms` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://cloudkms.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
