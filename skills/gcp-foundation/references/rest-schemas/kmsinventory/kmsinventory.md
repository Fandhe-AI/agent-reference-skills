---
source: https://kmsinventory.googleapis.com/$discovery/rest?version=v1
---

# KMS Inventory API message schemas (kmsinventory)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/kmsinventory/`.

### `GoogleCloudKmsInventoryV1ListCryptoKeysResponse`

- Response message for KeyDashboardService.ListCryptoKeys.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cryptoKeys` | array<GoogleCloudKmsV1CryptoKey> | The list of CryptoKeys. |
| `nextPageToken` | string | The page token returned from the previous response if the next page is desired. |

### `GoogleCloudKmsInventoryV1ProtectedResource`

- Metadata about a resource protected by a Cloud KMS key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudProduct` | string | The Cloud product that owns the resource. Example: `compute` |
| `createTime` | string (google-datetime) | Output only. The time at which this resource was created. The granularity is in seconds. Timestamp.nanos will always be 0. |
| `cryptoKeyVersion` | string | The name of the Cloud KMS CryptoKeyVersion (https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions?hl=en) used to protect this resource via CMEK. This field is empty if the Google Cloud product owning the resource does not provide key version data to Asset Inventory. If there are multiple key versions protecting the resource, then this is same value as the first element of crypto_key_versions. |
| `cryptoKeyVersions` | array<string> | The names of the Cloud KMS CryptoKeyVersion (https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions?hl=en) used to protect this resource via CMEK. This field is empty if the Google Cloud product owning the resource does not provide key versions data to Asset Inventory. The first element of this field is stored in crypto_key_version. |
| `labels` | object | A key-value pair of the resource's labels (v1) to their values. |
| `location` | string | Location can be `global`, regional like `us-east1`, or zonal like `us-west1-b`. |
| `name` | string | The full resource name of the resource. Example: `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`. |
| `project` | string | Format: `projects/{PROJECT_NUMBER}`. |
| `projectId` | string | The ID of the project that owns the resource. |
| `resourceType` | string | Example: `compute.googleapis.com/Disk` |

### `GoogleCloudKmsInventoryV1ProtectedResourcesSummary`

- Aggregate information about the resources protected by a Cloud KMS key in the same Cloud organization/project as the key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudProducts` | object | The number of resources protected by the key grouped by Cloud product. |
| `locations` | object | The number of resources protected by the key grouped by region. |
| `name` | string | The full name of the ProtectedResourcesSummary resource. Example: projects/test-project/locations/us/keyRings/test-keyring/cryptoKeys/test-key/protectedResourcesSummary |
| `projectCount` | integer (int32) | The number of distinct Cloud projects in the same Cloud organization as the key that have resources protected by the key. |
| `resourceCount` | string (int64) | The total number of protected resources in the same Cloud organization as the key. |
| `resourceTypes` | object | The number of resources protected by the key grouped by resource type. |
| `warnings` | array<GoogleCloudKmsInventoryV1Warning> | Warning messages for the state of response ProtectedResourcesSummary For example, if the organization service account is not configured, INSUFFICIENT_PERMISSIONS_PARTIAL_DATA warning will be returned. |

### `GoogleCloudKmsInventoryV1SearchProtectedResourcesResponse`

- Response message for KeyTrackingService.SearchProtectedResources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `protectedResources` | array<GoogleCloudKmsInventoryV1ProtectedResource> | Protected resources for this page. |

### `GoogleCloudKmsInventoryV1Warning`

- A warning message that indicates potential problems with the response data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayMessage` | string | The literal message providing context and details about the warnings. |
| `warningCode` | string enum | The specific warning code for the displayed message. |

### `GoogleCloudKmsV1CryptoKey`

- A CryptoKey represents a logical key that can be used for cryptographic operations. A CryptoKey is made up of zero or more versions, which represent the actual key material used in cryptographic operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which this CryptoKey was created. |
| `cryptoKeyBackend` | string | Immutable. The resource name of the backend environment where the key material for all CryptoKeyVersions associated with this CryptoKey reside and where all related cryptographic operations are performed. Only applicable if CryptoKeyVersions have a ProtectionLevel of EXTERNAL_VPC, with the resource name in the format `projects/*/locations/*/ekmConnections/*`. Only applicable if CryptoKeyVersions have a ProtectionLevel of HSM_SINGLE_TENANT, with the resource name in the format `projects/*/locations/*/singleTenantHsmInstances/*`. Note, this list is non-exhaustive and may apply to additional ProtectionLevels in the future. |
| `destroyScheduledDuration` | string (google-duration) | Immutable. The period of time that versions of this key spend in the DESTROY_SCHEDULED state before transitioning to DESTROYED. If not specified at creation time, the default duration is 30 days. |
| `importOnly` | boolean | Immutable. Whether this key may contain imported versions only. |
| `keyAccessJustificationsPolicy` | GoogleCloudKmsV1KeyAccessJustificationsPolicy | Optional. The policy used for Key Access Justifications Policy Enforcement. If this field is present and this key is enrolled in Key Access Justifications Policy Enforcement, the policy will be evaluated in encrypt, decrypt, and sign operations, and the operation will fail if rejected by the policy. The policy is defined by specifying zero or more allowed justification codes. https://cloud.google.com/assured-workloads/key-access-justifications/docs/justification-codes By default, this field is absent, and all justification codes are allowed. If the `key_access_justifications_policy.allowed_access_reasons` is empty (zero allowed justification code), all encrypt, decrypt, and sign operations will fail. |
| `labels` | object | Labels with user-defined metadata. For more information, see Labeling Keys (https://cloud.google.com/kms/docs/labeling-keys). |
| `name` | string | Output only. The resource name for this CryptoKey in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`. |
| `nextRotationTime` | string (google-datetime) | At next_rotation_time, the Key Management Service will automatically: 1. Create a new version of this CryptoKey. 2. Mark the new version as primary. Key rotations performed manually via CreateCryptoKeyVersion and UpdateCryptoKeyPrimaryVersion do not affect next_rotation_time. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted. |
| `primary` | GoogleCloudKmsV1CryptoKeyVersion | Output only. A copy of the "primary" CryptoKeyVersion that will be used by Encrypt when this CryptoKey is given in EncryptRequest.name. The CryptoKey's primary version can be updated via UpdateCryptoKeyPrimaryVersion. Keys with purpose ENCRYPT_DECRYPT may have a primary. For other keys, this field will be omitted. |
| `purpose` | string enum | Immutable. The immutable purpose of this CryptoKey. |
| `rotationPeriod` | string (google-duration) | next_rotation_time will be advanced by this period when the service automatically rotates a key. Must be at least 24 hours and at most 876,000 hours. If rotation_period is set, next_rotation_time must also be set. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted. |
| `versionTemplate` | GoogleCloudKmsV1CryptoKeyVersionTemplate | A template describing settings for new CryptoKeyVersion instances. The properties of new CryptoKeyVersion instances created by either CreateCryptoKeyVersion or auto-rotation are controlled by this template. |

### `GoogleCloudKmsV1CryptoKeyVersion`

- A CryptoKeyVersion represents an individual cryptographic key, and the associated key material. An ENABLED version can be used for cryptographic operations. For security reasons, the raw cryptographic key material represented by a CryptoKeyVersion can never be viewed or exported. It can only be used to encrypt, decrypt, or sign data when an authorized user or application invokes Cloud KMS.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `algorithm` | string enum | Output only. The CryptoKeyVersionAlgorithm that this CryptoKeyVersion supports. |
| `attestation` | GoogleCloudKmsV1KeyOperationAttestation | Output only. Statement that was generated and signed by the HSM at key creation time. Use this statement to verify attributes of the key as stored on the HSM, independently of Google. Only provided for key versions with protection_level HSM. |
| `createTime` | string (google-datetime) | Output only. The time at which this CryptoKeyVersion was created. |
| `destroyEventTime` | string (google-datetime) | Output only. The time this CryptoKeyVersion's key material was destroyed. Only present if state is DESTROYED. |
| `destroyTime` | string (google-datetime) | Output only. The time this CryptoKeyVersion's key material is scheduled for destruction. Only present if state is DESTROY_SCHEDULED. |
| `externalDestructionFailureReason` | string | Output only. The root cause of the most recent external destruction failure. Only present if state is EXTERNAL_DESTRUCTION_FAILED. |
| `externalProtectionLevelOptions` | GoogleCloudKmsV1ExternalProtectionLevelOptions | ExternalProtectionLevelOptions stores a group of additional fields for configuring a CryptoKeyVersion that are specific to the EXTERNAL protection level and EXTERNAL_VPC protection levels. |
| `generateTime` | string (google-datetime) | Output only. The time this CryptoKeyVersion's key material was generated. |
| `generationFailureReason` | string | Output only. The root cause of the most recent generation failure. Only present if state is GENERATION_FAILED. |
| `hsmTrusted` | boolean | Output only. Field indicating that the key wrapping key is trusted. This field is only valid for key purpose AES_256_WRAPPING, and protection level HSM_SINGLE_TENANT. |
| `importFailureReason` | string | Output only. The root cause of the most recent import failure. Only present if state is IMPORT_FAILED. |
| `importJob` | string | Output only. The name of the ImportJob used in the most recent import of this CryptoKeyVersion. Only present if the underlying key material was imported. |
| `importTime` | string (google-datetime) | Output only. The time at which this CryptoKeyVersion's key material was most recently imported. |
| `name` | string | Output only. The resource name for this CryptoKeyVersion in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*/cryptoKeyVersions/*`. |
| `protectionLevel` | string enum | Output only. The ProtectionLevel describing how crypto operations are performed with this CryptoKeyVersion. |
| `reimportEligible` | boolean | Output only. Whether or not this key version is eligible for reimport, by being specified as a target in ImportCryptoKeyVersionRequest.crypto_key_version. |
| `state` | string enum | The current state of the CryptoKeyVersion. |
| `trustedWrappingEnabled` | boolean | Optional. Immutable. Field indicating that the key may be wrapped by a trusted key. This field can be set for all key purposes except ENCRYPT_DECRYPT, and is only valid for keys with protection level HSM_SINGLE_TENANT. This field can only be set at creation or import time via CreateCryptoKeyVersion, or ImportCryptoKeyVersion. |

### `GoogleCloudKmsV1CryptoKeyVersionTemplate`

- A CryptoKeyVersionTemplate specifies the properties to use when creating a new CryptoKeyVersion, either manually with CreateCryptoKeyVersion or automatically as a result of auto-rotation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `algorithm` | string enum | Required. Algorithm to use when creating a CryptoKeyVersion based on this template. For backwards compatibility, GOOGLE_SYMMETRIC_ENCRYPTION is implied if both this field is omitted and CryptoKey.purpose is ENCRYPT_DECRYPT. |
| `protectionLevel` | string enum | ProtectionLevel to use when creating a CryptoKeyVersion based on this template. Immutable. Defaults to SOFTWARE. |

### `GoogleCloudKmsV1ExternalProtectionLevelOptions`

- ExternalProtectionLevelOptions stores a group of additional fields for configuring a CryptoKeyVersion that are specific to the EXTERNAL protection level and EXTERNAL_VPC protection levels.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ekmConnectionBackendOverride` | string | Optional. The resource name of the backend environment where the key material of CryptoKeyVersions is associated with. Setting this field overrides the crypto_key_backend. This field may be set when CryptoKeyVersions is set to EXTERNAL_VPC. Format: `projects/*/locations/*/ekmConnections/*`. |
| `ekmConnectionKeyPath` | string | Optional. The path to the external key material on the EKM when using EkmConnection e.g., "v0/my/key". Set this field instead of external_key_uri when using an EkmConnection. |
| `externalKeyUri` | string | Optional. The URI for an external resource that this CryptoKeyVersion represents. |

### `GoogleCloudKmsV1KeyAccessJustificationsPolicy`

- A KeyAccessJustificationsPolicy specifies zero or more allowed AccessReason values for encrypt, decrypt, and sign operations on a CryptoKey or KeyAccessJustificationsPolicyConfig (the default Key Access Justifications policy).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedAccessReasons` | array<string> | The list of allowed reasons for access to a CryptoKey. Note that empty allowed_access_reasons has a different meaning depending on where this message appears. If this is under KeyAccessJustificationsPolicyConfig, it means allow-all. If this is under CryptoKey, it means deny-all. |

### `GoogleCloudKmsV1KeyOperationAttestation`

- Contains an HSM-generated attestation about a key operation. For more information, see \[Verifying attestations\] (https://cloud.google.com/kms/docs/attest-key).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certChains` | GoogleCloudKmsV1KeyOperationAttestationCertificateChains | Output only. The certificate chains needed to validate the attestation |
| `content` | string (byte) | Output only. The attestation data provided by the HSM when the key operation was performed. |
| `format` | string enum | Output only. The format of the attestation data. |

### `GoogleCloudKmsV1KeyOperationAttestationCertificateChains`

- Certificate chains needed to verify the attestation. Certificates in chains are PEM-encoded and are ordered based on https://tools.ietf.org/html/rfc5246#section-7.4.2.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caviumCerts` | array<string> | Cavium certificate chain corresponding to the attestation. |
| `googleCardCerts` | array<string> | Google card certificate chain corresponding to the attestation. |
| `googlePartitionCerts` | array<string> | Google partition certificate chain corresponding to the attestation. |

### Shape of `GoogleCloudKmsInventoryV1ListCryptoKeysResponse`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "cryptoKeys": "array<GoogleCloudKmsV1CryptoKey>",
  "nextPageToken": "string"
}
```

## Notes

- Generated from the Discovery document(s) of `kmsinventory` (retrieved 2026-11-14); a type shared by several versions shows the preferred version.
- Source: https://kmsinventory.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
