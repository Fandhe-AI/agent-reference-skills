---
source: https://docs.cloud.google.com/kms/docs/formatting-keys-for-import
---

# Formatting keys for import

How to check and convert key material into the format Cloud KMS expects for import as a new key version. Symmetric keys must be raw binary; asymmetric keys must be unencrypted PKCS #8, DER-encoded.

## Signature / Usage

### Check a symmetric key

```bash
wc -c /path/to/unwrapped-key
```

```bash
file /path/to/unwrapped-key
```

`data` means the format is correct. `ASCII text`: inspect the content. A string of letters and numbers ending in `=` may be base64 (decode with `base64`, `Base64.exe` on Windows); hexadecimal lines may be hex (decode with `xxd -r -p`).

### Format an asymmetric key

Check the format:

```bash
file /path/to/unwrapped-key
```

If `PEM` (or probably `ASCII text`), convert to PKCS #8 DER:

```bash
openssl pkcs8 -topk8 -nocrypt -inform PEM -outform DER \
    -in /path/to/asymmetric-key-pem \
    -out /path/to/formatted-key
```

If `data` (likely DER, maybe not PKCS #8), run this (no effect if already correct; `diff` input and output to confirm):

```bash
openssl pkcs8 -topk8 -nocrypt -inform DER -outform DER \
    -in /path/to/asymmetric-key-der \
    -out /path/to/formatted-key
```

## Options / Props

| Key type | Requirement |
|----------|-------------|
| Symmetric encryption | 16 bytes (raw symmetric encryption only) or 32 bytes of binary data, not encoded; other lengths can't be imported |
| Symmetric signing (MAC) | Length equal to the hash output length (HMAC-SHA256: 32 bytes), not encoded |
| Asymmetric | PKCS #8 (RFC 5208), DER (ITU X.680), supported algorithm and length |
| RSA public exponent | 65,537 or higher (FIPS PUB 186-4 B.3.1) |

## Notes

- Command output examples in the source (`data`, `PEM`, `ASCII text`) are file(1) results; the source recommends running the asymmetric commands on each key before importing, as the algorithm is hard to determine afterward.
- The source shows an example base64-encoded key value; it is not reproduced here.
- `-nocrypt` writes the private key unencrypted. Restrict permissions on the output file, don't commit or share it, and delete it after import.
- If import still fails, check the Google Cloud console errors and see Troubleshooting failed imports (https://docs.cloud.google.com/kms/docs/troubleshooting-failed-imports).
- Corrected from the official docs: the source suggests `xxd` "or the `Format-Hex` PowerShell command" for hex-encoded keys. `Format-Hex` only displays input as hex and does not decode a hex string back to bytes, so it is omitted; `xxd` decodes a plain hex string only in reverse mode, `xxd -r -p`.
- Source: https://docs.cloud.google.com/kms/docs/formatting-keys-for-import (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-import.md](./key-import.md)
- [key-wrapping.md](./key-wrapping.md)
