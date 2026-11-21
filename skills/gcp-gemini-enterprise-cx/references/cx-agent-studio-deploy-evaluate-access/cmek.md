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
- Customer Experience Insights (`contactcenterinsights`): the Insights encryption setting. On the Insights CMEK page, `encryptionSpec:initialize` (InitializeEncryptionSpec) configures which KMS key Insights uses in a location, and GetEncryptionSpec checks it. Neither creates, enables or revokes a key.

How to verify that CX Agent Studio (`ces`) data is protected with CMEK is not described in the official docs: this page gives no check, and the `ces` Discovery documents (`v1` and `v1beta`) have no encryption or KMS key field or method. Do not treat the Insights result below as a check of CX Agent Studio agent app data.

The following request applies to Customer Experience Insights only. It returns the Insights `encryptionSpec` of a location (the key Insights uses for Insights data), not a CX Agent Studio setting:

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments; the command runs in a subshell that starts with `set +x`, so a shell trace (`set -x`) does not print the token and `TOKEN` does not stay in your shell. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero.

```bash
( set +x; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl --fail-with-body -X GET \
    -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
    "https://contactcenterinsights.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID/encryptionSpec" )
```

## Notes

### Limitations

- Key rotation is supported but data re-encryption is not: re-encrypting previously encrypted data with a new key version is not supported.
- You must use one key per project, per location (region).
- Existing resources in non-CMEK integrated projects cannot be CMEK integrated retroactively. Instead, export and restore resources in a new project for CMEK.

### Other

- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-cx/insights/cmek (the Customer Experience Insights CMEK page; this source's key management link points to https://docs.cloud.google.com/contact-center/insights/docs/cmek. The CMEK page also shows creating the service identity, granting the CCAI CMEK service agent the Cloud KMS CryptoKey Encrypter/Decrypter role and `encryptionSpec:initialize`).
- The request above is the Insights CMEK page's "Check CMEK Settings" example ("Use GetEncryptionSpec API to check the encryption key configured for a location."); that page is about Insights data. A successful response shows only the Insights setting.
- Source inconsistency: this page says key management "(create, enable, and revoke) is handled using the Conversational Insights API", while the linked Customer Experience Insights CMEK page says "To create keys, you use the KMS service" and revokes access by disabling the KMS key version or removing the role; the Conversational Insights API calls it shows (`encryptionSpec:initialize`, GetEncryptionSpec) only configure and check which key Insights uses. The page keeps the quote and follows the CMEK page for which API does what.
- The Customer Experience Insights CMEK page warns: "If you have revoked the key for more than 30 days, the Insights data encrypted by that key will be lost." Try key operations in a disposable project first.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). The subshell with `set +x` keeps the token out of `set -x` / `bash -x` traces. `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/cmek (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://ces.googleapis.com/$discovery/rest?version=v1 (Discovery document `ces.v1`, revision 20261016)
- Source: https://ces.googleapis.com/$discovery/rest?version=v1beta (Discovery document `ces.v1beta`, revision 20261016)

## Related

- [access-control.md](./access-control.md)
- [vpc-service-controls.md](./vpc-service-controls.md)
