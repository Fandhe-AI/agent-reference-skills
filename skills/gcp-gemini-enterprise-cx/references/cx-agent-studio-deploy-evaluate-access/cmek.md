---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/cmek
---

# Customer-managed encryption keys (CMEK) for CX Agent Studio

By default, CX Agent Studio encrypts customer content at rest with Google default encryption, with no action on your part. To control your own keys, use customer-managed encryption keys (CMEKs) in Cloud KMS, which gives control over protection level, location, rotation schedule, usage and access permissions, and cryptographic boundaries, plus audit logs and key lifecycle control. Instead of Google owning the symmetric key encryption keys (KEKs), you control and manage them in Cloud KMS. After setup, accessing CX Agent Studio resources is similar to Google default encryption.

## Signature / Usage

### Protected data

All agent app data-at-rest can be protected with CMEKs.

### Manage keys

The source says: "Key management (create, enable, and revoke) is handled using the Conversational Insights API", linking to the Customer Experience Insights CMEK page. That page splits the work between two APIs:

- Cloud KMS (`cloudkms`): the key lifecycle. "To create keys, you use the KMS service", and to revoke Insights access to the key you "disable the KMS key version or remove the service account's Cloud KMS CryptoKey Encrypter/Decrypter role from the KMS key".
- Customer Experience Insights (`contactcenterinsights`): the product-side encryption setting. `encryptionSpec:initialize` (InitializeEncryptionSpec) configures which KMS key a location uses, and GetEncryptionSpec checks it. Neither creates, enables or revokes a key.

Check the encryption key configured for a location with GetEncryptionSpec:

```bash
curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://contactcenterinsights.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID/encryptionSpec"
```

## Notes

### Limitations

- Key rotation is supported but data re-encryption is not: re-encrypting previously encrypted data with a new key version is not supported.
- You must use one key per project, per location (region).
- Existing resources in non-CMEK integrated projects cannot be CMEK integrated retroactively. Instead, export and restore resources in a new project for CMEK.

### Other

- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-cx/insights/cmek (the Customer Experience Insights CMEK page; this source's key management link points to https://docs.cloud.google.com/contact-center/insights/docs/cmek. The CMEK page also shows creating the service identity, granting the CCAI CMEK service agent the Cloud KMS CryptoKey Encrypter/Decrypter role and `encryptionSpec:initialize`).
- Source inconsistency: this page says key management "(create, enable, and revoke) is handled using the Conversational Insights API", while the linked Customer Experience Insights CMEK page says "To create keys, you use the KMS service" and revokes access by disabling the KMS key version or removing the role; the Conversational Insights API calls it shows (`encryptionSpec:initialize`, GetEncryptionSpec) only configure and check which key Insights uses. The page keeps the quote and follows the CMEK page for which API does what.
- The Customer Experience Insights CMEK page warns: "If you have revoked the key for more than 30 days, the Insights data encrypted by that key will be lost." Try key operations in a disposable project first.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/cmek (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [vpc-service-controls.md](./vpc-service-controls.md)
