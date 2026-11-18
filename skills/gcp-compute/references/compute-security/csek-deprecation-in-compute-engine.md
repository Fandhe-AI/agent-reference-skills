---
source: https://docs.cloud.google.com/compute/docs/deprecations/csek-deprecation-in-compute-engine
---

# CSEK deprecation in Compute Engine

Customer-supplied encryption keys (CSEK) are deprecated for Compute Engine. This page gives the dates and the procedure to migrate CSEK-encrypted disks, instant snapshots, images, snapshots and machine images to customer-managed encryption keys (CMEK) in Cloud KMS. Do not use CSEK for new resources.

## Signature / Usage

### Migrate a CSEK-encrypted disk: create a CMEK disk from a snapshot (gcloud)

First stop the instance if the disk is its boot disk (optional), and create a standard snapshot of the CSEK-encrypted disk. Use `gcloud compute disks create`; if the CSEK of the snapshot is RSA-wrapped use `gcloud beta compute disks create`. Specify the CMEK with `--kms-key`.

Adapted (not in the official docs): `cryptoKeysKMS_KEY_NAME` in `--kms-key` corrected to `cryptoKeys/KMS_KEY_NAME`, following the REST `kmsKeyName` field in the same page.

```bash
gcloud compute disks create NEW_CMEK_DISK_NAME \
    --source-snapshot=CSEK_SNAPSHOT_NAME \
    --csek-key-file=PATH_TO_CSEK_KEY_FILE \
    --kms-key=projects/KMS_PROJECT_ID/locations/KEY_REGION/keyRings/KEY_RING/cryptoKeys/KMS_KEY_NAME \
    --no-require-csek-key-create \
    --LOCATION_FLAG=ZONE_OR_REGION \
    --type=DISK_TYPE
```

Replace `NEW_CMEK_DISK_NAME` (for example `migrated-cmek-disk`), `CSEK_SNAPSHOT_NAME`, `PATH_TO_CSEK_KEY_FILE` (file format: Key file format in the CSEK docs), `KMS_PROJECT_ID`, `KEY_REGION`, `KEY_RING`, `KMS_KEY_NAME`, `LOCATION_FLAG` (`zone` or `region`), `ZONE_OR_REGION` (for example `us-central1-a` or `us-central1`) and `DISK_TYPE` (for example `pd-balanced`).

Regional disk (`--LOCATION_FLAG=region`): the source says "To create a regional disk, specify the disk's replica zones using the `replica-zones` flag"; gcloud help: `--replica-zones=ZONE,ZONE` is "A comma-separated list of exactly 2 zones that a regional disk will be replicated to. Required when creating regional disk."

### Same, with REST

`POST` to the `disks.insert` method:

```http
POST https://compute.googleapis.com/compute/API_VERSION_TO_USE/projects/PROJECT_ID/LOCATION_TYPE/ZONE_OR_REGION/disks

{
 "name": "NEW_CMEK_DISK_NAME",
 "type": "https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/LOCATION_TYPE/ZONE_OR_REGION/diskTypes/DISK_TYPE",
 "sourceSnapshot": "projects/SNAPSHOT_PROJECT_ID/global/snapshots/CSEK_SNAPSHOT_NAME",
 "diskEncryptionKey": {
    "kmsKeyName": "projects/KMS_PROJECT_ID/locations/KEY_REGION/keyRings/KEY_RING/cryptoKeys/KMS_KEY_NAME"
 },
 "sourceSnapshotEncryptionKey": {
    "CSEK_KEY_TYPE": "RAW_OR_RSA_KEY"
 }
}
```

`API_VERSION_TO_USE` is `beta` if the CSEK key is RSA-wrapped, otherwise `v1`. `LOCATION_TYPE` is `zones` (zonal disk) or `regions` (regional disk); for a regional disk, set the replica zones in the body field `replicaZones` ("URLs of the zones where the disk should be replicated to. Only applicable for regional resources."), the REST counterpart of `--replica-zones`. `CSEK_KEY_TYPE` is `rawKey` for a raw key or `rsaEncryptedKey` for an RSA-wrapped key; `RAW_OR_RSA_KEY` is its value (do not paste real key material into shared logs or scripts).

### Migrate a CSEK-encrypted machine image (gcloud)

Create a temporary instance from the machine image with a Cloud KMS key for each disk (REST or gcloud only):

```bash
gcloud compute instances create NEW_INSTANCE_NAME \
 --project=PROJECT_ID \
 --zone=ZONE \
 --machine-type=INSTANCE_MACHINE_TYPE \
 --source-machine-image=CSEK_MACHINE_IMAGE_NAME \
 --source-machine-image-csek-key-file=PATH_TO_CSEK_KEY_FILE \
 --create-disk=device-name=BOOT_DISK_DEVICE_NAME,boot=yes,auto-delete=yes,kms-key=projects/KMS_PROJECT_ID/locations/REGION/keyRings/KEY_RING/cryptoKeys/BOOT_DISK_KMS_KEY \
 --create-disk=device-name=DEVICE_NAME_FOR_DATA_DISK_1,boot=no,kms-key=projects/KMS_PROJECT_ID/locations/REGION/keyRings/KEY_RING/cryptoKeys/KMS_KEY_FOR_DATA_DISK_1 \
 --create-disk=device-name=DEVICE_NAME_FOR_DATA_DISK_2,boot=no,kms-key=projects/KMS_PROJECT_ID/locations/REGION/keyRings/KEY_RING/cryptoKeys/KMS_KEY_FOR_DATA_DISK_2
```

Then verify the instance, create a CMEK-encrypted machine image from it, and delete the temporary instance.

## Options / Props

### Dates

| Date | Event |
|---|---|
| July 20, 2026 | You can no longer use a CSEK to encrypt Persistent Disks, images, machine images, standard and archive snapshots, or instant snapshots. |
| July 20, 2027 | CSEK completely removed from Compute Engine. |

### Migration paths

| Resource | Procedure (a CSEK cannot be removed or replaced in place; always make an encrypted copy) |
|---|---|
| Persistent Disk | Stop the instance (if boot disk, optional), snapshot the disk, create a new disk from the snapshot with a CMEK (`--kms-key` / `kmsKeyName`), detach the old disk and attach the new one (boot disk: detach and use the new disk as boot disk), start the instance, verify, then delete the snapshot and the original disk. |
| Instant snapshot | Create a temporary CSEK-encrypted standard snapshot from it, create a temporary CMEK-encrypted disk from that, create a CMEK-encrypted instant snapshot of the new disk, then delete the standard snapshot and temporary disk. Caveat (from instant-snapshots.md, quoted in Notes): "When you delete a disk, all instant snapshots of the disk are deleted", so keep the CMEK disk while you need the new instant snapshot, or convert the instant snapshot to a CMEK-encrypted standard snapshot and confirm it exists before you delete the disk. |
| Image, archive snapshot, instant snapshot, standard snapshot | Create a new Hyperdisk or Persistent Disk volume from the image or snapshot, create a CMEK-encrypted image or standard snapshot of that disk, delete the temporary disk. |
| Machine image | Create a temporary instance with a KMS key per disk (above), verify, create a CMEK-encrypted machine image from it, delete the temporary instance. |

## Notes

- Caution from the source: test the migration in a non-production environment first. Replacing a CSEK disk usually needs the instance stopped, so plan for downtime.
- Destructive steps: deleting the original CSEK disk, snapshots, temporary disks, machine images and the temporary instance is irreversible; try the procedure on a disposable resource first. You keep paying for disks and snapshots until they are deleted.
- You need at least one Cloud KMS key ring and key before migrating. Cloud KMS keys themselves are in `gcp-security`; CMEK for disks, snapshots and images is on https://docs.cloud.google.com/compute/docs/disks/customer-managed-encryption. CMEK also supports Hyperdisk volumes.
- Source inconsistency: this notice page (https://docs.cloud.google.com/compute/docs/deprecations/csek-deprecation-in-compute-engine) states July 20, 2026 (no longer usable for encryption) and July 20, 2027 (removed); the deprecations table (https://docs.cloud.google.com/compute/docs/deprecations) lists CSEKs as June 15, 2026 deprecated and June 16, 2027 shutdown. The dates above are those of the notice page; check both pages for the current schedule.
- Adapted from the official docs: the gcloud disk example originally read `cryptoKeysKMS_KEY_NAME` (missing slash). The source REST example for the temporary instance (`instances.insert`, `kmsKeyName` per disk) is omitted, as is its `cryptoKeys//KMS_KEY_FOR_DATA_DISK_2` double slash typo (use a single slash). The source's regional-disk flag text (`--replica-zones=^:^ZONE:REPLICA_ZONE`, with stray backticks) is not reproduced; the `--replica-zones=ZONE,ZONE` form and its "Required when creating regional disk" wording above come from the gcloud help, and `replicaZones` from the Compute API discovery document (`Disk` schema).
- Distance line: Compute Engine disk, snapshot and image encryption; persistent disks are in this skill, Cloud Storage in `gcp-storage`.
- Source (regional disk replica zones): `gcloud compute disks create --help` (gcloud 593.0.0, retrieved 2026-11-14)
- Source inconsistency: step 4 of "Migrate CSEK-encrypted instant snapshots" says "After you create the CMEK-encrypted instant snapshot, delete the CSEK-encrypted standard snapshot and the temporary disk", while instant-snapshots.md (compute-snapshots-images) says "An instant snapshot of a disk only exists until the source disk is deleted" and "When you delete a disk, all instant snapshots of the disk are deleted". Deleting the temporary disk therefore also deletes the CMEK-encrypted instant snapshot created from it; delete only the CSEK-encrypted standard snapshot until you no longer need that instant snapshot.
- Source (compared page, instant-snapshots.md): https://docs.cloud.google.com/compute/docs/disks/instant-snapshots (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/deprecations/csek-deprecation-in-compute-engine (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [access.md](./access.md)
