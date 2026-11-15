---
source: https://docs.cloud.google.com/storage/docs/encryption/customer-managed-keys
---

# Customer-managed encryption keys (CMEK)

CMEK lets you control the Cloud KMS keys that protect Cloud Storage data (protection level, location, rotation, usage and access permissions). Only symmetric keys can be used.

## Signature / Usage

Object metadata field that identifies the Cloud KMS key used (verbatim from the source), useful for finding objects encrypted with a key you plan to destroy:

```text
kmsKeyName
```

### Key use and service agent

- With a CMEK on an object, Cloud Storage uses the key to encrypt the object's data, CRC32C checksum and MD5 hash. Remaining metadata, including the object name, uses standard server-side keys, so with permission you can read most metadata, list and delete objects even after disabling or destroying the CMEK.
- Each project has a Cloud Storage service agent that encrypts and decrypts with CMEKs once you give it access to the key. It encrypts objects added to a bucket whose default key is that key and objects you specify. If both a bucket default key and a specific key are in the request, the specific key is used.
- Reads work as usual while the service agent can still decrypt with the key and the key is not disabled or destroyed; otherwise requests fail.
- Autokey: key rings and keys are generated on demand, with service agents created and granted roles; Autokey does not create keys for objects (objects use the bucket default key unless you create a CMEK manually and use it when creating the object).

### Key rotation and replacement

- After rotation Cloud Storage uses the new version for operations that encrypt with the key; earlier versions are not disabled or destroyed, so existing objects stay decryptable.
- To replace a key: (1) replace it as default key on buckets that use it; (2) update source code that uses the key in operations; (3) find objects encrypted with the old key and re-encrypt with the Rewrite Object method (Storage batch operations for millions or billions of objects); (4) disable all old key versions and monitor logs for failures.

## Options / Props

### Restrictions

| Restriction | Detail |
|---|---|
| Setting a CMEK | Cannot be set by updating metadata; include the key in a rewrite (`gcloud storage` `objects update` rewrites the object) |
| Key ring location | Must match the data location (for example `US-EAST1` bucket needs a `US-EAST1` key ring). Dual-region: key ring location must match the location code (configurable pair `US-EAST1` + `US-WEST1` needs the `US` multi-region; predefined `NAM4` needs `NAM4`) |
| Listing | CRC32C and MD5 of CMEK objects are not returned when listing with the JSON API; some tools (such as `gcloud storage`) make an extra metadata `GET` per object, making listing substantially slower |
| Key type | Only symmetric encryption keys |

### Cloud KMS quotas

| Key type | Quota effect |
|---|---|
| Software CMEK keys generated in Cloud KMS | No Cloud KMS quota consumed |
| Hardware (Cloud HSM) keys | Count against Cloud HSM quotas in the key's project |
| External (Cloud EKM) keys | Count against Cloud EKM quotas in the key's project |

### CMEK vs CSEK

A single object is encrypted by one method at a time. If a bucket has a default CMEK and a request specifies a customer-supplied key, the customer-supplied key is used.

### Disabling or destroying key versions

- Disabling or destroying a version makes objects encrypted with it undecryptable (cannot download, copy or rewrite). A disabled version can be re-enabled; destroying is permanent.
- Disabling or destroying the primary version blocks encryption with the key until a new primary version exists (no uploads, copies or rewrites naming the key, or into a bucket with it as default unless another valid key is specified). Rotate first or remove the key from use (server-side keys are then used).
- Locked objects (locked bucket retention policy or locked object retention configuration): the key version can be destroyed only if the retention expiration time is in the past and no object holds exist; afterwards affected data is permanently inaccessible.

## Notes

- Warning: destroying a key that encrypts existing objects makes the data unrecoverable, yet you keep paying storage until you delete the objects. Identify objects with `kmsKeyName` and delete them. Except for certain locked-object cases you can destroy a key version even while it is in use, so permanent data loss can occur. Practice on a disposable key and bucket first.
- There is a delay between disabling a key and the key no longer working; see Cloud KMS resource consistency.
- Do not put sensitive information in object or bucket metadata or names, since most metadata is readable regardless of encryption method.
- Key and KMS IAM concepts are in `gcp-foundation` and the Cloud KMS docs; setup steps are at https://docs.cloud.google.com/storage/docs/encryption/using-customer-managed-keys and https://docs.cloud.google.com/kms/docs/autokey-overview.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/encryption/customer-managed-keys (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [default-keys.md](./default-keys.md)
- [customer-supplied-keys.md](./customer-supplied-keys.md)
- [bucket-lock.md](./bucket-lock.md)
- [object-lock.md](./object-lock.md)
