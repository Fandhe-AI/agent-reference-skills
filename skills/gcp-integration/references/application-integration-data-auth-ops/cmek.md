---
source: https://docs.cloud.google.com/application-integration/docs/cmek
---

# Customer-managed encryption keys (CMEK)

By default Application Integration encrypts customer content at rest with Google default encryption. With CMEK you control the symmetric key encryption keys in Cloud KMS (protection level, location, rotation schedule, usage and access permissions, audit logs, lifecycle). CMEK is enabled per Application Integration region.

## Signature / Usage

### Before you begin

1. Enable the Cloud KMS API for the project that stores the keys. Application Integration and Cloud KMS can run in the same project or different projects.
2. If keys live in a shared / key-hosting project: enable the Cloud Key Management Service API there and grant Cloud KMS CryptoKey Encrypter/Decrypter on the CMEK key to the Application Integration default service account. To enable role assignment for the default service account, you must verify the CMEK key at least once, even if the first attempt fails.
3. Assign Cloud KMS Admin to the individuals managing the keys and grant these permissions in the key project: `cloudkms.cryptoKeys.setIamPolicy`, `cloudkms.keyRings.create`, `cloudkms.cryptoKeys.create`, `cloudkms.cryptoKeyVersions.useToEncrypt`. The Cloud KMS Admin role includes key maintenance and key version destruction permissions; assign it only to people responsible for key administration.
4. Create a key ring and a key in the same region where Application Integration is set up. Only a symmetric encryption key can be used.

### Add the service account to the CMEK key

The default service account must hold the Cloud KMS CryptoKey Encrypter/Decrypter role on the key (Console: **Key Inventory** > select the key > **Add principal** > role > **Save**). Default service account email form, as shown on the access-control page:

```text
service-PROJECT_NUMBER@gcp-sa-integrations.iam.gserviceaccount.com
```

### Enable CMEK for a region

In the Console, **Regions** > **Actions** > **Edit encryption** > expand **Advanced settings** > **Use a Customer-managed encryption key (CMEK)**, select a key (listed per provisioned region), click **Verify**, and if verification fails click **Grant** to assign CryptoKey Encrypter/Decrypter to the default service account, then **Done**. To create a key: choose or create a key ring in the region, name the key, and pick protection level **Software** or **HSM**.

## Options / Props

### Encrypted data

| Resource | Encrypted data |
|---|---|
| Integration details | Task configuration parameters; task configuration descriptions |
| Integration execution information | Request parameters; response parameters; task execution details |
| Authentication profile credentials | Usernames and passwords; API keys; OAuth 2.0 authorization code / client credentials / resource owner password credentials; auth tokens; JWT tokens; service accounts; SSL/TLS client certificates; Google OIDC ID tokens |
| Approval/Suspension task details | Approval or suspension configurations |

### Cloud KMS quota use

| Key type | Quota effect |
|---|---|
| Software CMEK keys generated in Cloud KMS | No Cloud KMS quota is consumed. |
| Hardware (Cloud HSM) keys | Encryption and decryption count against Cloud HSM quotas in the project containing the key. |
| External (Cloud EKM) keys | Count against Cloud EKM quotas in the project containing the key. |

## Notes

- Enabling CMEK for a region cannot be undone: you cannot change the encryption method for a region once CMEK is enabled, and the root key resource path cannot be updated or changed dynamically on an existing resource. Try it on a disposable project first.
- Enable CMEK in a region before creating or publishing integrations in that region; otherwise errors may occur.
- Key rotation: existing data is not automatically re-encrypted with a new key version and manual re-encryption is not supported; data stays accessible as long as previous active key versions are not disabled or destroyed.
- With Google-owned and Google-managed keys, your tenant projects consume Cloud KMS cryptographic request quotas (https://docs.cloud.google.com/kms/quotas).
- The CMEK key grant is to the Application Integration default service account, as the source states. Cloud KMS keys and CMEK administration are covered by `gcp-security`.
- Snippet taken from https://docs.cloud.google.com/application-integration/docs/access-control
- Source: https://docs.cloud.google.com/application-integration/docs/access-control (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/application-integration/docs/cmek (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [configure-authentication-profiles.md](./configure-authentication-profiles.md)
- [vpc-service-controls.md](./vpc-service-controls.md)
