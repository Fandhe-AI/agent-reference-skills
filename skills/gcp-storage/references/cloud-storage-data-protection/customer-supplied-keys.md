---
source: https://docs.cloud.google.com/storage/docs/encryption/customer-supplied-keys
---

# Customer-supplied encryption keys (CSEK)

An additional layer on top of standard encryption: you provide your own AES-256 key (standard Base64) with each operation. Cloud Storage does not permanently store the key; it keeps only a cryptographic hash of it.

## Signature / Usage

Request headers (names verbatim from the source; values are described in the table below) for JSON or XML API requests:

```text
x-goog-encryption-algorithm
x-goog-encryption-key
x-goog-encryption-key-sha256
```

For JSON API rewrites these encrypt the destination object, and these decrypt the source object:

```text
x-goog-copy-source-encryption-algorithm
x-goog-copy-source-encryption-key
x-goog-copy-source-encryption-key-sha256
```

### gcloud storage

- The specified encryption key is also used as decryption key when needed; you can optionally specify up to 100 decryption keys (used only to decrypt). For decryption the SHA256 hash in the object's metadata selects the right key.
- Adding or rotating a key on an existing object rewrites the object (also for `gcloud storage objects update`).
- List commands returning MD5 or CRC32C for such objects do an extra metadata `GET` per object (slower listing).
- If the key changes during a partially completed write or copy (for example re-running `cp` after a timeout), the operation restarts so the destination is written with the new key.

### Rotation

Rotate an object's key by rewriting it (supported by the JSON API, not the XML API). With Object Versioning delete noncurrent versions after rotating; they stay encrypted with the old key.

## Options / Props

### Headers

| Header | Description |
|---|---|
| `x-goog-encryption-algorithm` | Must be `AES256` |
| `x-goog-encryption-key` | RFC 4648 Base64 string of your AES-256 key |
| `x-goog-encryption-key-sha256` | RFC 4648 Base64 string of the SHA256 hash of the key |
| `x-goog-copy-source-encryption-algorithm` | `AES256` (rewrite source) |
| `x-goog-copy-source-encryption-key` | Base64 AES-256 key of the source object |
| `x-goog-copy-source-encryption-key-sha256` | Base64 SHA256 hash of the source key |

### Response metadata

- JSON: `customerEncryption.encryptionAlgorithm` (always `AES256`) and `customerEncryption.keySha256`.
- XML: headers `x-goog-encryption-algorithm` (always `AES256`) and `x-goog-encryption-key-sha256`.

### Restrictions

- The Google Cloud console cannot download CSEK-encrypted objects, and uploads through the console cannot use a CSEK.
- Storage Transfer Service and Cloud Dataflow do not support objects encrypted with CSEKs.
- CSEKs can be set only on individual objects, not as a bucket default.
- Compose: component objects must use the same key, provided with the compose request; the composite is encrypted by the same key.
- Cloud Storage ignores `Cache-Control` metadata and serves the object with `private, max-age=0`.
- List results for encrypted objects do not return CRC32C or MD5, even if you supply the key.

### HTTP 400 cases

- Operating on a CSEK object (other than requesting or updating most metadata, or deleting) without the key, or with an incorrect key.
- Operating on a non-CSEK object with a customer-supplied key.
- An invalid algorithm, key or SHA256 hash.

## Notes

- Warning: lost keys mean lost data; back up each key to a secure location and never share it with untrusted parties. If any file or machine holding a key is compromised, immediately rotate the key for all objects encrypted with it.
- TLS (HTTPS) is required when providing a key. If a key is accidentally used over HTTP the API returns an error warning that the key may be compromised; rotate it immediately.
- The key encrypts the object's data, CRC32C and MD5; other metadata (including the name) uses standard encryption, so you can read general metadata, list, overwrite and delete without the key (with permission). Reading metadata without the key omits CRC32C and MD5.
- Rewriting a CSEK object without supplying a new key: with a decryption key in the request it becomes encrypted with the destination bucket's default Cloud KMS key or standard encryption; without a decryption key you get an error.
- Do not put sensitive information in object or bucket metadata or names.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/encryption/customer-supplied-keys (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [default-keys.md](./default-keys.md)
- [customer-managed-keys.md](./customer-managed-keys.md)
