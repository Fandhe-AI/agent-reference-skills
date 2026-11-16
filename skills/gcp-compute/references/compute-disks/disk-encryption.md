---
source: https://docs.cloud.google.com/compute/docs/disks/disk-encryption
---

# About disk encryption

Compute Engine encrypts customer content at rest by default with Google-owned and Google-managed keys. You can add key encryption keys (KEKs) that encrypt those keys: customer-managed encryption keys (CMEK, recommended) or customer-supplied encryption keys (CSEK, deprecated). Hyperdisk Balanced also supports Confidential mode.

## Signature / Usage

The source has no commands. To change the Cloud KMS key (CMEK) of an existing disk, run:

```bash
gcloud compute disks update-kms-key example-disk-2 \
    --zone=us-central1-a --kms-key=example-key \
    --kms-keyring=example-key-ring --kms-location=global
```

## Options / Props

### Encryption support by resource

| Resource | Google-owned and managed | CMEK | CSEK |
|----------|--------------------------|------|------|
| Persistent Disk | Yes | Yes | Yes |
| Hyperdisk | Yes | Yes | No |
| Local SSD | Yes | No | No |
| Disk clones, machine images | Yes | Yes | Yes |
| Standard and instant snapshots | Yes | Yes | Yes |

### Confidential mode for Hyperdisk Balanced

- Property set when creating a new Hyperdisk Balanced volume; adds hardware-based encryption without refactoring the application.
- Usable only with Confidential VMs on the N2D machine type, in these regions: `europe-west4`, `us-central1`, `us-east4`, `us-east5`, `us-south1`, `us-west4`.
- Not supported for Hyperdisk Extreme, Throughput, ML or Balanced High Availability.
- Cannot suspend or resume a VM that uses such volumes; cannot use Hyperdisk Storage Pools; cannot create a machine image or custom image from the volume.

## Notes

- CSEK for Compute Engine is deprecated (https://docs.cloud.google.com/compute/docs/deprecations; alternatives at https://docs.cloud.google.com/compute/docs/deprecations/csek-deprecation-in-compute-engine). This page states no dates. The CSEK deprecation notice page says "As of **July 20, 2026**, you can no longer use a CSEK to encrypt" Persistent Disks, images, machine images, standard and archive snapshots, and instant snapshots, and "CSEK will be completely removed from Compute Engine on **July 20, 2027**"; the deprecations table lists June 15, 2026 (deprecated) and June 16, 2027 (shutdown) instead. So the CSEK "Yes" cells in the table above describe resources that were already CSEK-encrypted; as of the retrieval date 2026-11-17 new CSEK encryption is blocked. Do not present CSEK as a current option.
- CMEK: keys in Cloud KMS give control of protection level, location, rotation, usage and access; usually the key need not be specified when working with a CMEK-encrypted disk. Cloud KMS Autokey (Preview) creates key rings and keys on demand and service agents with required IAM roles. Cloud KMS itself is covered by the planned `gcp-security`.
- Rotation: Google-owned keys rotate yearly; Google recommends enabling automatic rotation for CMEKs.
- Autokey and snapshots: Autokey does not create new keys for snapshots; encrypt a snapshot with the same key as its source disk. The console applies the disk's key automatically; with gcloud, Terraform or the API, look up the disk's key resource identifier and use it.
- BitLocker on Windows VMs adds a second, independent OS-level layer; Google cannot access or recover BitLocker keys. Warning from the source: if keys are lost the data is unrecoverable; store recovery keys in a regionally redundant location and never start encryption unless recovery keys are stored in Active Directory.
- Confidential Computing here means Confidential VM on Google Cloud, not Apple Private Cloud Compute (`apple-intelligence`).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/update-kms-key (gcloud 593.0.0 help).
- Source (CSEK deprecation notice): https://docs.cloud.google.com/compute/docs/deprecations/csek-deprecation-in-compute-engine (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/disks/disk-encryption (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [hyperdisks.md](./hyperdisks.md)
- [persistent-disks.md](./persistent-disks.md)
- [local-ssd.md](./local-ssd.md)
