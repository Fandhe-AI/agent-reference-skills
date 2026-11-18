---
source: https://docs.cloud.google.com/kms/docs/cmek
---

# Customer-managed encryption keys (CMEK)

Overview of using Cloud KMS keys as customer-managed encryption keys (CMEK) to own and control the keys that protect data at rest in Google Cloud. CMEK can be managed manually or provisioned through Cloud KMS Autokey. Services that use your keys are said to have a CMEK integration.

## Signature / Usage

### Manual CMEK steps (typical)

1. Create or choose a key ring close to the resources (same project or a different project; a different project helps separation of duties).
2. Create or import a Cloud KMS key in that key ring. This key is the CMEK.
3. Grant `roles/cloudkms.cryptoKeyEncrypterDecrypter` on the CMEK to the service account (service agent) of the service.
4. When creating the resource, configure it to use the CMEK.

Example for step 2 (a software key for encryption):

```bash
gcloud kms keys create frodo --location=us-east1 \
    --keyring=fellowship --purpose=encryption
```

## Options / Props

### Key types compared

| Aspect | Cloud KMS Autokey | Cloud KMS customer-managed (manual) | Google-owned and Google-managed key (default encryption) |
|---|---|---|---|
| Can view key metadata | Yes | Yes | No |
| Key owner | Customer | Customer | Google |
| Manage and control keys | Key creation and assignment is automated; manual control fully supported | Customer, manual control only | Google |
| Supports regulatory requirements for customer-managed keys | Yes | Yes | No |
| Key sharing | Unique to a customer | Unique to a customer | Data from multiple customers is typically protected by shared key encryption keys (KEKs) |
| Control of key rotation | Yes | Yes | No |
| CMEK organization policies | Yes | Yes | No |
| Log administrative and data access to keys | Yes | Yes | No |
| Logical data separation through encryption | Yes | Yes | No |
| Pricing | Varies (see Cloud KMS pricing) | Varies (see Cloud KMS pricing) | Free |

### Key management tasks (footnote 2)

| Task |
|---|
| Create keys; choose the protection level; assign authority for management; control access; control usage |
| Set and modify the rotation period, or trigger a rotation |
| Change key status; destroy key versions; delete key versions, keys, and key rings |

### CMEK organization policy controls

| Control | Constraint or topic |
|---|---|
| Require CMEK usage | CMEK organization policies (`kms/docs/cmek-org-policy#require-cmek`) |
| Which Cloud KMS keys are used for CMEK protection | `kms/docs/cmek-org-policy` |
| Allowed protection levels | `kms/docs/org-policy-constraints#allowed-protection-levels` |
| Location of CMEKs | `kms/docs/org-policy-constraints#resource-locations` |
| Key version destruction | `kms/docs/control-key-destruction` |

## Notes

- Default encryption encrypts at rest with AES-256; Google owns and controls the keys, and you can't view or manage them or review key usage logs.
- CMEK integration is server-side, symmetric, envelope encryption. All keys are 256-bit AES-GCM; key material never leaves the Cloud KMS system boundary; you choose the protection level.
- You can use unlimited key versions for each key. Cloud KMS costs depend on the number of key versions and cryptographic operations; no minimum purchase or commitment (pricing: https://docs.cloud.google.com/kms/pricing).
- The principal that creates or views resources in a CMEK-integrated service does not need `roles/cloudkms.cryptoKeyEncrypterDecrypter`. The resource's service agent encrypts and decrypts; if it has permission and the key is not disabled or destroyed it works, otherwise the request fails.
- CMEK-protected resources carry a metadata field with the key name. Key usage tracking shows which resources, projects and products use a key; keys can be listed by project.
- Autokey: keys and key rings are generated on demand and the service agents are granted IAM roles automatically; it is the recommended choice if Autokey-created keys meet your requirements. Autokey can be enabled with dedicated-project key storage (formerly centralized key management) on a folder, or with same-project key storage (formerly delegated key management) on a project or all projects in a folder.
- Irreversible or disruptive: if you revoke the encrypter/decrypter role, or disable or destroy the CMEK, the data can't be accessed. Source caution: some services can experience permanent data loss when the CMEK remains disabled or inaccessible for too long. Try on a disposable resource first.
- CMEK compliance: some services offer CMEK compliance instead of integration, meaning temporary data and the ephemeral key are never written to disk (see compatible-services.md).
- Goals CMEK supports: own keys; control location, protection level, creation, access, rotation, use, destruction; generate or import key material; set policy on where keys are used; crypto-shredding (selectively delete data protected by your keys); keys unique to a customer; administrative and data access logging; regulation.
- Source: https://docs.cloud.google.com/kms/docs/cmek (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/create (gcloud 593.0.0 help).

## Related

- [cmek-recommended-practices.md](./cmek-recommended-practices.md)
- [use-keys-google-cloud.md](./use-keys-google-cloud.md)
- [compatible-services.md](./compatible-services.md)
- [autokey-overview.md](./autokey-overview.md)
