---
source: https://docs.cloud.google.com/kms/docs/encrypt-decrypt
---

# Encrypting and decrypting data with a symmetric key

Use Cloud KMS to encrypt text or binary content (plaintext) with a symmetric key, and to decrypt ciphertext that was encrypted with a Cloud KMS key. For asymmetric encryption see the page on encrypting and decrypting with an asymmetric key; for raw symmetric encryption see the raw symmetric encryption page.

## Signature / Usage

### Before you begin

Create a key ring and a key. The caller needs the `cloudkms.cryptoKeyVersions.useToEncrypt` and `cloudkms.cryptoKeyVersions.useToDecrypt` permissions on the key, for example through `roles/cloudkms.cryptoKeyEncrypter`, `roles/cloudkms.cryptoKeyDecrypter`, or `roles/cloudkms.cryptoKeyEncrypterDecrypter` on that key.

### Encrypt (gcloud)

```bash
gcloud kms encrypt \
    --key KEY_NAME \
    --keyring KEY_RING \
    --location LOCATION  \
    --plaintext-file FILE_TO_ENCRYPT \
    --ciphertext-file ENCRYPTED_OUTPUT
```

### Encrypt (API)

Content must be base64 encoded before Cloud KMS can encrypt it. Send a `POST` with the base64 text in the `plaintext` field.

```bash
curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY_NAME:encrypt" \
  --request "POST" \
  --header "authorization: Bearer TOKEN" \
  --header "content-type: application/json" \
  --data "{\"plaintext\": \"PLAINTEXT_TO_ENCRYPT\"}"
```

Adapted (not in the official docs): the source example payload has a trailing comma, which is invalid JSON; it is removed.

```json
{
  "plaintext": "U3VwZXIgc2VjcmV0IHRleHQgdGhhdCBtdXN0IGJlIGVuY3J5cHRlZAo="
}
```

### Decrypt (gcloud)

```bash
gcloud kms decrypt \
    --key KEY_NAME \
    --keyring KEY_RING \
    --location LOCATION  \
    --ciphertext-file FILE_TO_DECRYPT \
    --plaintext-file DECRYPTED_OUTPUT
```

### Decrypt (API)

Decrypted text returned in the JSON is base64 encoded. Send a `POST` with the ciphertext in the `ciphertext` field.

```bash
curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY_NAME:decrypt" \
  --request "POST" \
  --header "authorization: Bearer TOKEN" \
  --header "content-type: application/json" \
  --data "{\"ciphertext\": \"ENCRYPTED_DATA\"}"
```

Adapted (not in the official docs): the trailing comma (invalid JSON) is removed and the truncated ciphertext value ending in `...` is replaced with the source's `ENCRYPTED_DATA` placeholder.

```json
{
  "ciphertext": "ENCRYPTED_DATA"
}
```

## Options / Props

### Placeholders

| Name | Description |
|------|-------------|
| `KEY_NAME` | Name of the key used for encryption or decryption |
| `KEY_RING` | Name of the key ring that contains the key |
| `LOCATION` | Cloud KMS location that contains the key ring |
| `PROJECT_ID` | Project that contains the key ring and key |
| `FILE_TO_ENCRYPT` | Path of the file to encrypt |
| `ENCRYPTED_OUTPUT` | Path where the encrypted output is saved |
| `FILE_TO_DECRYPT` | Path of the file to decrypt |
| `DECRYPTED_OUTPUT` | Path where the decrypted output is saved |
| `PLAINTEXT_TO_ENCRYPT` | Plaintext, base64 encoded before calling `encrypt` |
| `ENCRYPTED_DATA` | Ciphertext to decrypt |

### Roles for encrypt and decrypt

| Role | Use |
|------|-----|
| `roles/cloudkms.cryptoKeyEncrypter` | Encrypt (`useToEncrypt`) |
| `roles/cloudkms.cryptoKeyDecrypter` | Decrypt (`useToDecrypt`) |
| `roles/cloudkms.cryptoKeyEncrypterDecrypter` | Encrypt and decrypt |
| `roles/cloudkms.admin` | Does not provide `useToEncrypt` or `useToDecrypt` |

## Notes

- The raw key material represented by a Cloud KMS key can never be viewed or exported; it can only be used by an authorized caller through the Cloud KMS API.
- Base64: use the `base64` command on Linux or macOS (`Base64.exe` on Windows) to encode and decode content for REST calls.
- The decrypted output file written by `gcloud kms decrypt --plaintext-file` contains the plaintext in clear; store it in a protected location and do not print decrypted data in shared terminals or CI logs.
- Destroying or disabling the key makes data encrypted with it undecryptable (destruction is irreversible after the scheduled for destruction period); see the destroy and restore page and try it on a disposable key first.
- The `curl` examples use `TOKEN` as a placeholder for an OAuth access token. A real token or plaintext passed on the command line (`--header`, `--data`) lands in shell history and process lists; do not paste real tokens or sensitive plaintext into shared terminals or CI logs. The gcloud form reads the plaintext from `--plaintext-file` instead.
- The source's client-library samples (C#, Go, Java, Node.js, PHP, Python, Ruby) also compute optional CRC32C checksums for end-to-end in-transit integrity verification (see the Cloud KMS data integrity guidelines); they are omitted here.
- Corrected from the official docs: the encrypt example payload was `"plaintext": "U3VwZXIgc2VjcmV0IHRleHQgdGhhdCBtdXN0IGJlIGVuY3J5cHRlZAo=",` with a trailing comma before `}`.
- Corrected from the official docs: the decrypt example payload was `"ciphertext": "CiQAhMwwBo61cHas7dDgifrUFs5zNzBJ2uZtVFq4ZPEl6fUVT4kSmQ...",` (truncated value and trailing comma).
- Source: https://docs.cloud.google.com/kms/docs/encrypt-decrypt (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-key-ring.md](./create-key-ring.md)
- [destroy-restore.md](./destroy-restore.md)
- Raw symmetric encryption: https://docs.cloud.google.com/kms/docs/raw-encryption
- Envelope encryption: https://docs.cloud.google.com/kms/docs/data-encryption-keys
- gcloud reference: https://docs.cloud.google.com/sdk/gcloud/reference/kms/encrypt and https://docs.cloud.google.com/sdk/gcloud/reference/kms/decrypt
