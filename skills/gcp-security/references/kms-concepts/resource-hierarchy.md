---
source: https://docs.cloud.google.com/kms/docs/resource-hierarchy
---

# Cloud KMS resources

Describes each Cloud KMS resource type: keys, key versions, key rings, key handles, Autokey configs and EKM connections. Resources can't be moved to a different location after creation. A key exists on exactly one key ring tied to a location; access is granted on keys, never on individual key versions.

## Signature / Usage

### Create a key handle (Autokey)

Creating a key handle in a resource project triggers creation of a Cloud KMS key in the key project; `--generate-key-handle-id` can replace `--key-handle-id`. Autokey creates the key in the same location as the resource to protect, so `--location` is the region of the disk (here a disk in `us-central1`).

Adapted (not in the official docs): `--location=global` is replaced with the disk's region `us-central1`.

```bash
gcloud kms key-handles create --key-handle-id=my-key-handle \
  --location=us-central1 --resource-type=compute.googleapis.com/Disk
```

## Options / Props

### Key properties

| Property | Values / behavior |
|---|---|
| Type | Symmetric or asymmetric (key pair); one component of the purpose; can't change after creation |
| Purpose | For example Symmetric encrypt/decrypt or Asymmetric signing; chosen at creation; the same for all versions; can't change |
| Protection level | `SOFTWARE`, `HSM` (Multi-tenant HSM), `HSM_SINGLE_TENANT`, `EXTERNAL`, `EXTERNAL_VPC`; can't change after creation |
| Primary version | Symmetric encryption keys only: the version used by default to encrypt. Asymmetric keys have none; specify the version |

### Key version properties

| Property | Behavior |
|---|---|
| Version number | Starts at `1`; rotating a key creates a new version |
| State | Enabled, Disabled, Scheduled for destruction, Destroyed; usable only when enabled; every state other than destroyed incurs costs |
| Algorithm | If not specified for a new version, the previous version's algorithm is used. Probabilistic encryption: the same plaintext encrypted twice with the same version gives different ciphertext |

### Resource ID formats

| Object | Resource ID format |
|---|---|
| Key ring | `projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING` |
| Key | `projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY_NAME` |
| Key version | `projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY_NAME/cryptoKeyVersions/KEY_VERSION` |
| Key handle | `projects/RESOURCE_PROJECT_ID/locations/LOCATION/keyHandles/KEY_HANDLE` |
| EKM connection | `projects/PROJECT_ID/locations/LOCATION/ekmConnections/EKM_CONNECTION` |
| Autokey config | `folders/FOLDER_NUMBER/autokeyConfig` or `projects/PROJECT_ID/autokeyConfig` |

### Other resources

| Resource | Behavior |
|---|---|
| Key ring | Groups keys in one location for access control. Name unique within a location (not across the project); no cost |
| Key handle | Lets Autokey create CMEK keys across separation of duties; holds a reference to the created key; not visible in the console; needed to use Autokey with the REST API or Terraform |
| Autokey config | Folder- or project-level resource: whether Autokey is enabled for resources in the folder and which key project holds created keys |
| EKM connection | Organizes VPC connections to on-premises EKMs in a location; can't be deleted after creation; no cost |

## Notes

- The CLI and API show properties as capital letters (`SOFTWARE`); the console shows initial capitalization (**Software**).
- The source says "Disabling or destroying a key also disables or destroys each key version." Keys themselves have no state (see the `key-states` page): the API and gcloud disable and destroy individual key versions (`gcloud kms keys versions disable` / `destroy`), and disabling only the primary version does not stop decryption with other enabled versions. To stop use of a whole key, disable or destroy every enabled version and confirm with `gcloud kms keys versions list`. To decrypt or verify, use the same key version that encrypted or signed. No principal can view or export raw key material.
- Granting access to a key grants access to all of its enabled versions. Common organization patterns: by environment (`prod`, `test`, `develop`), by work area, or by data sensitivity.
- Deleting a key ring frees its name for reuse; names of deleted keys can't be reused, so a key version's resource identifier always points to its original key material unless destroyed. Unlimited key rings, keys and key versions can be stored; see quotas and pricing.
- Irreversible: destroying a key version permanently deletes its key material, and scheduling a project shutdown permanently destroys the project's resources (including Cloud KMS resources) after the recovery window. Try on a disposable resource first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/key-handles/create (gcloud 593.0.0 help).
- Corrected from the official docs: the `gcloud kms key-handles create` help example creates a key handle in `global` for `compute.googleapis.com/Disk`, but Autokey "creates keys in the same location as the resource to be protected" (https://docs.cloud.google.com/kms/docs/autokey-overview); the sample uses the region of the disk, `us-central1`.
- Source: https://docs.cloud.google.com/kms/docs/resource-hierarchy (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-states.md](./key-states.md)
- [protection-levels.md](./protection-levels.md)
- [key-rotation.md](./key-rotation.md)
- [quotas.md](./quotas.md)
