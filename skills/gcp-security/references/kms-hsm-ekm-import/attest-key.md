---
source: https://docs.cloud.google.com/kms/docs/attest-key
---

# Verify attestations

An attestation is a machine-readable, signed statement produced by the HSM hardware (signed by certificates owned by Google and by the HSM manufacturer, Marvell, formerly Cavium) proving a key version was created inside an HSM. This applies to both Multi-tenant Cloud HSM and Single-tenant Cloud HSM keys (protection levels `HSM` and `HSM_SINGLE_TENANT`). You download the attestation and certificate chains, then parse or verify them. The examples target Linux (including Cloud Shell).

## Signature / Usage

### Prerequisites

Download the Marvell scripts `verify_pubkey.py`, `parse_v1.py` and `parse_v2.py` (not `verify_attest.py`; use Google's open source verification script `verify_attestation_chains.py` from GoogleCloudPlatform/python-docs-samples, `kms/attestations`).

### Download the attestation and certificate chains

Adapted (not in the official docs): removed the trailing `\` after the last flag, which continued the command onto a blank line.

```bash
gcloud kms keys versions describe KEY_VERSION \
 --key KEY_NAME \
 --location LOCATION \
 --keyring KEY_RING \
 --attestation-file ATTESTATION_FILE_PATH
```

Adapted (not in the official docs): removed the trailing `\` after the last flag.

```bash
gcloud kms keys versions get-certificate-chain KEY_VERSION \
 --key KEY_NAME \
 --location LOCATION \
 --keyring KEY_RING \
 --output-file CERTIFICATE_FILE_PATH
```

The console path (Key Management > key > More > Verify attestation) either opens Cloud Shell pre-populated with the whole verification snippet or downloads an attestation bundle zip.

### Parse the attestation

Decompress first:

```bash
gzip -d < compressed_attestation.dat > attestation.dat
```

### Verify the key version ID

```bash
gcloud kms keys versions list \
   --location LOCATION \
   --keyring KEY_RING \
   --key KEY_NAME
```

```bash
RESOURCE_NAME="projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY_NAME/cryptoKeyVersions/KEY_VERSION"
```

Adapted (not in the official docs): quoted `"${RESOURCE_NAME}"` so the value is not word-split.

```bash
RESOURCE_NAME_HEX="$(echo -n "${RESOURCE_NAME}" | openssl dgst -sha256 -hex | awk '{print $2}')"
```

```bash
KEYID_HEX=$(grep -m 1 0x0102 /path/to/parsed/attestation.dat | awk '{print $2}' | xxd -p -r)
```

Adapted (not in the official docs): quoted both variables and used a single `=` in `test` (the unquoted `==` form is not portable and breaks on empty values).

```bash
test "${RESOURCE_NAME_HEX}" = "${KEYID_HEX:(-64)}" || echo "Values don't match"
```

### Verify other key properties

```bash
grep '0x0162:' /path/to/parsed/attestation.dat
```

```bash
grep '0x0163:' /path/to/parsed/attestation.dat
```

```bash
grep '0x0100:' /path/to/parsed/attestation.dat
```

## Options / Props

| Field | Meaning | Values |
|-------|---------|--------|
| `0x0102` | Key ID: two concatenated SHA-256 hex digests; the second matches the key version resource name (hex-encoded twice in the parsed output) | |
| `0x0162` | Whether the key is extractable | `\x01` true, `\x00` false; Cloud HSM keys are not extractable |
| `0x0163` | How the key got into the HSM | `\x01` created locally on the HSM; `\x00` imported |
| `0x0100` | Key type (PKCS #11 `CKK_*`) | For example AES is `\x1f` |

## Notes

- Created in Cloud HSM means the key was never stored unencrypted outside an HSM; imported means it was protected in transit by the import job wrapping key and then stayed in Cloud HSM.
- Source inconsistency: the source's "extractable" bullet says the value is stored in the `0x0102` field but then says to examine the `0x0162` field; the table follows `0x0162`.
- Corrected from the official docs: the trailing `\` on the last flag of both gcloud commands, unquoted `${RESOURCE_NAME}` in `echo -n`, and `test ${RESOURCE_NAME_HEX} == ${KEYID_HEX:(-64)}` were quoted or fixed as shown.
- The source also shows Console steps. Attestation and certificate-chain files are not secrets but treat downloaded scripts as untrusted code: inspect `verify_attestation_chains.py` before running it.
- The attestation process verifies whether a key version was created inside an HSM.
- Source: https://docs.cloud.google.com/kms/docs/attest-key (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [single-tenant-hsm.md](./single-tenant-hsm.md)
- [key-import.md](./key-import.md)
