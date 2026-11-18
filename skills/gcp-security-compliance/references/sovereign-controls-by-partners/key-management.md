---
source: https://docs.cloud.google.com/sovereign-controls-by-partners/docs/key-management
---

# Maintain partner-managed keys

Sovereign Controls by Partners customers use a different workflow for Cloud EKM keys: the partner manages keys and key versions in the external key manager at your request, through an Issue Tracker, while you operate directly on the key versions in Cloud KMS for disable and destroy.

## Signature / Usage

### Disable a key version

You can use the Google Cloud console, Google Cloud CLI, or a Cloud KMS client library to disable a key version in the **Enabled** state. This is the gcloud help example.

```bash
gcloud kms keys versions disable 3 --location=us-east1 \
    --keyring=fellowship --key=frodo
```

### Destroy a key version

Schedule the key version for destruction in Cloud KMS. This is the gcloud help example.

```bash
gcloud kms keys versions destroy 9 --location=us-east1 \
    --keyring=fellowship --key=frodo
```

To also destroy the key in the partner's EKM: schedule destruction in Cloud KMS, then in the Issue Tracker select **Destroy key version** in the ticket body, provide the key version resource name, and click **Create**.

## Options / Props

### Issue Tracker requests

| Operation | What to submit | Result |
|---|---|---|
| Create key version | Select **Create key version**, provide the key resource name | New version; set as primary if it's the first key version or there are no other key versions |
| Rotate key | Indicate **Rotate key** in the ticket body, provide the key resource name | Partner generates new key material in the EKM, creates a new key version in your Cloud KMS project and sets it as primary |
| Destroy key version | Select **Destroy key version**, provide the key version resource name (after scheduling destruction in Cloud KMS) | Partner confirms with you, then gives the date and time of destruction; Cloud KMS key is deleted first, then the key in the partner's EKM |

### Resource name required

| Operation | Resource name to provide |
|---|---|
| Create a version, rotate a key | Key |
| Update or destroy a key version | Key version |

## Notes

- This page applies only to manually created partner-managed keys. For a coordinated external key for Cloud EKM, rotate it by following Rotate a coordinated external key in the Cloud KMS docs.
- You need a key ring with at least one key before making key operation requests. Your organization's Issue Tracker link is in your welcome email.
- Use the Issue Tracker for routine key management operations only; expect a response from your partner within one business day.
- Rotation: newly created data is encrypted with new key material; data protected with previous key material is not re-encrypted, so the previous key material must remain available.
- Key versions in the **Disabled** state are billed as active key versions.
- Destroying a key is permanent and can cause unrecoverable data loss: once destroyed, the key is unrecoverable by you, the partner, or Google, and data encrypted with it cannot be accessed. Try it on a disposable key first. You can restore the key version before the scheduled destruction; if you restore it, both the Cloud KMS key and the key in the partner's EKM remain. The gcloud help for `destroy` states that it schedules the version for destruction in 24 hours; the source gives no duration.
- Destroying a key version is not supported if your partner uses Thales CipherTrust key manager (CCKM); you can only destroy the key and all its key versions.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/versions/disable and https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/versions/destroy (gcloud 593.0.0 help). The full KMS command set is in the `gcp-security` skill.
- Source: https://docs.cloud.google.com/sovereign-controls-by-partners/docs/key-management (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-folder.md](./create-folder.md)
- [supported-products.md](./supported-products.md)
