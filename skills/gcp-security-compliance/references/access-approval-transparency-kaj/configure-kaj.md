---
source: https://docs.cloud.google.com/assured-workloads/key-access-justifications/docs/configure-kaj
---

# Configure Key Access Justifications with Cloud KMS and Cloud HSM

Set a Key Access Justifications policy on Cloud KMS and Cloud HSM keys for the Assured Workloads Japan Data Boundary, either when creating the key or by updating it later. Usable only in folders enrolled in the Japan Regions control package in Assured Workloads.

## Signature / Usage

The REST calls below are Cloud KMS API calls (`cryptoKeys.create`, `cryptoKeys.patch`, `cryptoKeys.get`) and need an OAuth bearer token.

### Create a new key and policy

```text
POST https://cloudkms.googleapis.com/v1/projects/919698201234/locations/asia-northeast1/keyRings/my-key-ring/cryptoKeys?crypto_key_id=my-hsm-key
```

```json
{
  "purpose": "ENCRYPT_DECRYPT",
  "versionTemplate": {
    "protectionLevel": "HSM",
    "algorithm": "GOOGLE_SYMMETRIC_ENCRYPTION"
  },
  "keyAccessJustificationsPolicy": {
    "allowedAccessReasons": [
      "CUSTOMER_INITIATED_ACCESS",
      "GOOGLE_INITIATED_SYSTEM_OPERATION"
    ]
  }
}
```

### Update an existing key's policy

Adapted (not in the official docs): the source's concrete example ends with `?keyAccessJustificationsPolicy`, missing `update_mask=`; the source's own template URL uses `?update_mask=keyAccessJustificationsPolicy`, which is used here.

```text
PATCH https://cloudkms.googleapis.com/v1/projects/919698201234/locations/asia-northeast1/keyRings/my-key-ring/cryptoKeys/my-hsm-key?update_mask=keyAccessJustificationsPolicy
```

```json
{
  "purpose": "ENCRYPT_DECRYPT",
  "versionTemplate": {
    "protectionLevel": "HSM",
    "algorithm": "GOOGLE_SYMMETRIC_ENCRYPTION"
  },
  "keyAccessJustificationsPolicy": {
    "allowedAccessReasons": [
      "CUSTOMER_INITIATED_ACCESS",
      "GOOGLE_INITIATED_SYSTEM_OPERATION"
    ]
  }
}
```

### Get the policy for a key

```text
GET https://cloudkms.googleapis.com/v1/projects/919698201234/locations/asia-northeast1/keyRings/my-key-ring/cryptoKeys/my-hsm-key
```

The response contains the key metadata including `keyAccessJustificationsPolicy`:

```json
{
  "purpose": "ENCRYPT_DECRYPT",
  "versionTemplate": {
    "protectionLevel": "HSM",
    "algorithm": "GOOGLE_SYMMETRIC_ENCRYPTION"
  },
  "keyAccessJustificationsPolicy": {
    "allowedAccessReasons": [
      "CUSTOMER_INITIATED_ACCESS",
      "GOOGLE_INITIATED_SYSTEM_OPERATION"
    ]
  }
}
```

## Options / Props

### Request placeholders

| Placeholder | Meaning |
|---|---|
| `PROJECT_ID` | Project that contains the key ring (example `919698201234`). |
| `LOCATION` | Key ring location (example `asia-northeast1`). |
| `KEY_RING` | Key ring created with the Assured Workloads folder's key management project. |
| `KEY_NAME` | Key to create (example `my-hsm-key`) or update or get. |
| `PURPOSE` | Key purpose (example `ENCRYPT_DECRYPT`). |
| `PROTECTION_LEVEL` | Example `SOFTWARE` or `HSM`. |
| `ALGORITHM` | Cryptographic algorithm (example `GOOGLE_SYMMETRIC_ENCRYPTION`). |
| `ALLOWED_ACCESS_REASONS` | Zero or more allowed justification codes (example `["CUSTOMER_INITIATED_ACCESS", "GOOGLE_INITIATED_SYSTEM_OPERATION"]`). |

### Required role and permissions

| Item | Value |
|---|---|
| Role | Cloud KMS Admin (`roles/cloudkms.admin`) on the project containing the key ring |
| Permissions | `cloudkms.cryptoKeys.create`, `cloudkms.cryptoKeys.update`, `cloudkms.cryptoKeys.get` |

## Notes

- Caution from the source: Cloud KMS Admin includes permissions for key maintenance and key version destruction; assign it only to people responsible for key administration.
- Console settings: under **Key Access Justifications policy** choose **Set custom policy** > **Allow specific reason codes**. Both **Customer-initiated access** and **Google-initiated system operation** are essential for normal functioning. Selecting **Deny all reason codes** (not recommended) makes the key unusable even if the key is enabled and the requester has the required permissions; this is disruptive, so try it on a disposable key first. Clearing the policy checkbox disables the KAJ policy on the key.
- Corrected from the official docs: the concrete PATCH example was `PATCH https://cloudkms.googleapis.com/v1/projects/919698201234/locations/asia-northeast1/keyRings/my-key-ring/cryptoKeys/my-hsm-key?keyAccessJustificationsPolicy`.
- The request bodies are shown with the source's concrete examples; the source's templates contain the bare placeholder `ALLOWED_ACCESS_REASONS` inside the JSON array, which is not valid JSON until replaced. Update with `update_mask=keyAccessJustificationsPolicy` changes only that field.
- The policy can be set in the create request or added later with an update.
- Source inconsistency: the source writes the query parameters as `crypto_key_id` and `update_mask`; the Cloud KMS v1 Discovery document names them `cryptoKeyId` (`cryptoKeys.create`) and `updateMask` (`cryptoKeys.patch`). The URLs are kept as the source shows them.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/assured-workloads/key-access-justifications/docs/configure-kaj (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-default-policy.md](./set-default-policy.md)
- [key-access-justifications-overview.md](./key-access-justifications-overview.md)
- Cloud KMS key management and the `cryptoKeys` REST reference: see the `gcp-security` skill.
