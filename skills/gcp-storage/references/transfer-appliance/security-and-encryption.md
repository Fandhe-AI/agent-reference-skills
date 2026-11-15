---
source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/security-and-encryption
---

# Transfer Appliance security and encryption

How Transfer Appliance secures and encrypts data in transit, on the device and during upload, plus media sanitization and refurbishment.

## Signature / Usage

Restrict access to the appliance NFS shares with an IP filter (ask your network administrator). Example mount from an allowed host (snippet from the transfer-data page):

```bash
sudo mount -o vers=4 IP_ADDRESS:/mnt/ta_data /mnt/data
```

## Options / Props

| Stage | Protection |
|---|---|
| On the appliance | `dm-crypt` (LUKS2) or ZFS encryption, AES-256 (AES-256-XTS for dm-crypt, AES-256-GCM for ZFS) |
| Upload to Cloud Storage | TLS; inside your VPC Service Controls perimeter if used |
| In Cloud Storage | Encrypted by default |
| Export download to appliance | Encrypted in the cloud before download |
| Between your devices and the appliance | No encryption applied by Google; securing the network and physical access is your responsibility |

Key encryption key (KEK) choices: a customer-managed key, or a Google-owned and managed key (unique per session, destroyed when the session completes or is cancelled, or the appliance is lost). Google-managed KEK settings: Region Global; Protection level Software; Purpose Asymmetric decrypt; Algorithm 4096-bit RSA - OAEP Padding - SHA256 Digest. The data encryption key (DEK) is generated on the appliance, kept in memory with a TPM-sealed copy on disk; at finalize the KEK public key is applied to the DEK and the DEK is removed.

## Notes

- Destroying the KEK before the session completes results in complete data loss on the appliance.
- The attestation application validates appliance identity and state on receipt and again on return; if tampering is indicated, the transfer session is invalidated and a replacement is shipped.
- Media sanitization follows NIST 800-88 via cryptographic erasure; failed drives are physically destroyed. Request a wipe certificate within 4 weeks after the data is available in Cloud Storage (or after an export return). Refurbishment: partition, reformat, install software and updates, package.
- Google does not access or monitor the appliance while connected to your network.
- Snippet taken from https://docs.cloud.google.com/transfer-appliance/docs/4.0/transfer-data.
- Source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/security-and-encryption (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [procedure-guide.md](./procedure-guide.md)
