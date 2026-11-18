---
source: https://docs.cloud.google.com/kms/docs/key-rotation
---

# Key rotation

Key rotation creates new key versions to replace existing ones. Rotating on a regular schedule or after specific events limits the impact of a compromised key. Cloud KMS supports automatic rotation for symmetric keys only; asymmetric keys must be rotated manually.

## Signature / Usage

### Set an automatic rotation schedule and primary version

Per the gcloud help, the schedule automatically creates a new primary version; manual rotations don't affect the stored `--next-rotation-time`.

```bash
gcloud kms keys set-rotation-schedule frodo --location=global \
  --keyring=fellowship --rotation-period=30d \
  --next-rotation-time=2017-10-12T12:34:56.1234Z
```

```bash
gcloud kms keys set-primary-version samwise --version=9 \
  --keyring=fellowship --location=global
```

## Options / Props

### Rotation guidance

| Topic | Guidance |
|---|---|
| Symmetric keys | Periodic automatic rotation is a recommended practice; some standards (for example PCI DSS) require regular rotation. Example period: every 90 days |
| Asymmetric keys | No automatic rotation (extra steps are needed before the new version can be used) |
| Schedule | Frequency, and optionally the date and time of the first rotation; can be based on key age or on the number or volume of messages encrypted with a version |
| Manual rotation | When a key is suspected compromised or to migrate to a stronger algorithm; can be scheduled for a future time; doesn't pause or modify an existing automatic schedule |
| Irregular / manual only | Don't rely on it as a primary component of security |

### Asymmetric key rotation

| Use | What you must do |
|---|---|
| Signing | Distribute the public key of the new version, then pass the new version to `CryptoKeyVersions.asymmetricSign` and update applications |
| Encryption | Distribute and incorporate the new public key in applications that encrypt, and grant access to the private portion for applications that decrypt |

## Notes

- Rotation creates new active versions but does not re-encrypt data and does not disable or delete previous versions. Previous versions stay active and incur costs until destroyed. Re-encrypting data removes reliance on old versions so they can be destroyed.
- If you suspect a key version is compromised, disable it and revoke access as soon as possible. Validate rotation procedures before a real incident.
- Warning from the source: destroying a key version that is still in use can cause permanent data loss; it is your responsibility to confirm a version is safe to destroy, and Google isn't responsible for outages, data loss or compliance issues. Destroying is irreversible after the restore window; try on a disposable key first.
- Key lifetime recommendations depend on the algorithm and on message count or bytes encrypted (for GCM, the number of messages encrypted, per NIST SP 800-38D).
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/set-rotation-schedule and https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/set-primary-version (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/kms/docs/key-rotation (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-states.md](./key-states.md)
- [envelope-encryption.md](./envelope-encryption.md)
- [digital-signatures.md](./digital-signatures.md)
