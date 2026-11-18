---
source: https://docs.cloud.google.com/assured-open-source-software/docs/verify-packages
---

# Verify signatures in the Assured OSS free tier

Confirm the integrity of curated packages, security metadata and utility scripts by verifying their signatures, using the `aoss-verifier` tool (needs Go) or the verification script. Package signatures are stored separately from the package, in zip format in a Cloud Storage bucket. This page applies to the free tier only; the premium tier is documented under Security Command Center.

## Signature / Usage

### Verify a package with aoss-verifier

Install the tool, export `$(go env GOPATH)/bin`, then run:

```text
aoss-verifier verify-package \
   --language LANGUAGE \
   --package_id PACKAGE_ID \
   --version VERSION \
   --artifact_path ARTIFACT_PATH \
   [--disable_certificate_verification] \
   [--temp_downloads_path TEMP_DOWNLOADS_DIR_PATH] \
   [--disable_deletes]
```

### Verify a package with the script

Download the signature zip (set up Application Default Credentials first); its URL is in the package's security metadata (`description: digestUrl` in Container Analysis metadata, or `externalRefs` / `referenceLocator` in `buildInfo.json`):

```bash
gcloud storage cp SIGNATURE_ZIP_URL PATH_TO_LOCAL_STORE --recursive
```

Adapted (not in the official docs): added `-f` so an HTTP error does not save an error page as the root certificate.

```bash
curl -f -o PATH_TO_LOCAL_STORE/ca.crt https://privateca-content-6333d504-0000-2df7-afd6-30fd38154590.storage.googleapis.com/a2c725a592f1d586f1f8/ca.crt
```

Download the verification script:

```bash
gcloud storage cp "gs://cloud-aoss/utils/signature-verification/v1.0/signatureverification.sh" . --recursive
chmod +x signatureverification.sh
```

Run it (remote URLs or local paths are accepted for the signature zip and root certificate; the data file is the `.jar` for Java or `.whl` for Python):

```bash
./signatureverification.sh --data_file_path PATH_TO_DATA_FILE --signature_url SIGNATURE_ZIP_URL --root_cert_url ROOT_CERT_URL
```

### Verify metadata with aoss-verifier

```text
aoss-verifier verify-metadata \
   --metadata_type TYPE \
   --language LANGUAGE \
   --package_id PACKAGE_ID \
   --version VERSION \
   [--disable_certificate_verification] \
   [--temp_downloads_path TEMP_DOWNLOADS_DIR_PATH] \
   [--disable_deletes]
```

### Verify metadata with the script

Use the local path of the signature zip (from `buildInfo.zip`, which contains `buildInfo.json` and `signature.zip`):

```bash
./signatureverification.sh --data_file_path PATH_TO_DATA_FILE --signature_local_path SIGNATURE_LOCAL_PATH --root_cert_url ROOT_CERT_URL
```

### Verify a utility script (signature verification script)

```bash
./signatureverification.sh --data_file_path PATH_TO_DATA_FILE --signature_url "gs://cloud-aoss/utils/signature-verification/v1.0/signatureverification-sig.zip" --root_cert_url ROOT_CERT_URL
```

## Options / Props

### aoss-verifier flags

| Name | Description |
|------|-------------|
| `--language` | `java` or `python`, lowercase |
| `--package_id` | Java: `groupId:artifactId`; Python: `packageName`; lowercase |
| `--version` | Package version |
| `--artifact_path` | Data file to verify (`jar` for Java, `whl` for Python); `verify-package` only |
| `--metadata_type` | `buildinfo`, `vexinfo` or `healthinfo`; `verify-metadata` only |
| `--disable_certificate_verification` | Optional; skips matching the leaf certificate to the root certificate through the certificate chain |
| `--temp_downloads_path` | Optional; download directory (default: `tmp_downloads` in the current directory) |
| `--disable_deletes` | Optional; keeps downloaded files (default: cleaned up) |

### Signature locations of utility scripts

| Script | Signature zip |
|--------|---------------|
| Python `requirements.txt` generator | `gs://cloud-aoss/utils/python-requirements-txt/v1.0/generator-sig.zip` |
| Signature verification script | `gs://cloud-aoss/utils/signature-verification/v1.0/signatureverification-sig.zip` |
| Download metadata script | `gs://cloud-aoss/utils/python-download-metadata/v1.1/download_metadata-sig.zip` |

## Notes

- Metadata files to verify: `buildInfo.json`, `vexInfo.json`, `healthInfo.json`. For a local root certificate use `--root_cert_local ROOT_CERT_LOCAL` instead of `--root_cert_url`.
- `--disable_certificate_verification` weakens the check (the certificate chain is not matched to the root); do not use it when you need to confirm provenance.
- The scripts are downloaded and executed: verify each utility script's own signature (the three entries above) before running it, in the order download, inspect, run.
- The root certificate URL is the trust anchor; fetch it over `https://` only.
- Sample Container Analysis and SPDX metadata snippets are omitted; see the source page. The manual verification steps are in [package-signature-overview.md](./package-signature-overview.md).
- Adapted from the official docs: `curl -o PATH_TO_LOCAL_STORE/ca.crt https://privateca-content-.../ca.crt` without `-f`.
- Source: https://docs.cloud.google.com/assured-open-source-software/docs/verify-packages (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [package-signature-overview.md](./package-signature-overview.md)
- [access-metadata-using-container-analysis.md](./access-metadata-using-container-analysis.md)
- [download-python-packages.md](./download-python-packages.md)
