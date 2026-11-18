---
source: https://docs.cloud.google.com/assured-open-source-software/docs/package-signature-overview
---

# Overview of Assured OSS artifact signature

Each Assured OSS package is signed with a separate Google-issued certificate (ECDSA P256 key); package metadata and utility scripts are signed with a single Google-issued certificate (ECDSA P256). The certificates are issued with Certificate Authority Service, and the public root certificate is in a Cloud Storage bucket. This page applies to the free tier; premium-tier signatures are documented under Security Command Center.

## Signature / Usage

### Verify with aoss-verifier

```text
aoss-verifier verify-package \
   --language LANGUAGE \
   --package_id PACKAGE_ID \
   --version VERSION \
   --artifact_path ARTIFACT_PATH
```

### Verify manually (OpenSSL 3.0.1 or higher and Google Cloud CLI)

Identify the hashing algorithm (the output must name SHA-256; the source says the output must be `SHA256`, while the `digest.txt` format on the same page is `SHA-256:<hex digest>`, so `SHA-256` is the expected output):

```text
cut -d ':' -f1 digest.txt
```

Calculate the digest of the data file on Linux:

```text
sha256sum PATH_TO_DATA_FILE | cut -d ' ' -f1 > datadigest.txt
```

On macOS:

```text
shasum -a 256 PATH_TO_DATA_FILE | cut -d ' ' -f1 > datadigest.txt
```

Extract the hash from `digest.txt` and compare (no output means no difference):

```text
cut -d ':' -f2 digest.txt > signaturedigest.txt
```

```text
diff datadigest.txt signaturedigest.txt
```

Obtain the public key, then the binary signature and digest:

```text
openssl x509 -pubkey -noout -in cert.pem  > pubkey.pem
```

```text
cut -d ':' -f2 signature.txt | xxd -r -p > sig.sig
```

```text
cut -d ':' -f2 digest.txt | xxd -r -p > digest.bin
```

Verify the signature (option 1 prints `Signature Verified Successfully`):

```text
openssl pkeyutl -in digest.bin -inkey pubkey.pem -pubin -verify -sigfile sig.sig
```

Option 2 prints `Verified OK`:

```text
openssl dgst -sha256 -verify pubkey.pem -signature sig.sig PATH_TO_DATA_FILE
```

Download the root certificate first:

Adapted (not in the official docs): added `-f` so an HTTP error does not save an error page as the certificate, and wrote the output file name `ca.crt` that the next command expects.

```bash
curl -f -o PATH_TO_LOCAL_STORE/ca.crt https://privateca-content-6333d504-0000-2df7-afd6-30fd38154590.storage.googleapis.com/a2c725a592f1d586f1f8/ca.crt
```

Verify the certificate (success prints `cert.pem: OK`):

Adapted (not in the official docs): `-CAfile` reads the root certificate from `PATH_TO_LOCAL_STORE/ca.crt`, where the download above saves it.

```text
openssl verify -verbose -CAfile PATH_TO_LOCAL_STORE/ca.crt -untrusted certChain.pem cert.pem
```

### Verify with the verification script

Set up Application Default Credentials, then download the script, its `README.md` and `signature.zip`. Before running `signatureverification.sh` for the first time, verify the script itself with the OpenSSL steps above, using its signature `gs://cloud-aoss/utils/signature-verification/v1.0/signatureverification-sig.zip` (a script cannot vouch for itself):

```bash
gcloud storage cp "gs://cloud-aoss/utils/signature-verification/v1.0" PATH_TO_LOCAL_STORE --recursive
```

```bash
chmod +x signatureverification.sh
```

```bash
./signatureverification.sh --data_file_path PATH_TO_DATA_FILE \
--signature_url SIGNATURE_ZIP_URL \
--root_cert_url ROOT_CERT_URL
```

## Options / Props

### Files in `signature.zip`

| File | Content |
|------|---------|
| `digest.txt` | Hashing algorithm and package digest, hex-encoded (format `SHA-256:<hex digest>`) |
| `signature.txt` | Signature algorithm and hex-encoded signature (format `ECDSAP256_DER:<hex signature>`) |
| `cert.pem` | Public certificate |
| `certChain.pem` | Certificate chain of the public certificate |

### aoss-verifier flags

| Name | Description |
|------|-------------|
| `--language` | Package language, lowercase |
| `--package_id` | Java: `groupId:artifactId`; Python: package name; lowercase |
| `--version` | Package version |
| `--artifact_path` | Local data file: `jar` for Java, `whl` for Python |

### Verification script parameters

| Name | Description |
|------|-------------|
| `PATH_TO_DATA_FILE` | Local data file to verify |
| `SIGNATURE_ZIP_URL` | URL of the signature zip file |
| `ROOT_CERT_URL` | Public root certificate URL |

## Notes

- Success output of the script: `Signature verification successful` and `Certificate verification successful`. The script requires authenticating as a service account that has permission to access Assured OSS.
- Adapted from the official docs: `curl -o PATH_TO_LOCAL_STORE https://privateca-content-.../ca.crt` (no `-f`, and the output path without the file name), shown after the `openssl verify -CAfile ca.crt` command that needs the file; the sample downloads the root certificate first, to `PATH_TO_LOCAL_STORE/ca.crt` (as on the verify-packages page), and passes that path to `-CAfile`.
- Source inconsistency: the source refers to the root certificate as `ca.cert` once; the file used in the commands is `ca.crt`. The intro link to the root certificate uses plain `http://`; use the `https://` URL shown in the commands.
- The signature verification script is itself signed (`gs://cloud-aoss/utils/signature-verification/v1.0/signatureverification-sig.zip`); verify downloaded scripts before running them, as described in [verify-packages.md](./verify-packages.md).
- Do not commit or share downloaded certificates, keys or intermediate files beyond what verification needs.
- Source inconsistency: the manual steps say the `cut -d ':' -f1 digest.txt` output must be `SHA256`, while the source's `digest.txt` description and example use `SHA-256:<hex digest>` (for example `SHA-256:c5feab6f...`); treat either spelling as SHA-256 and reject any other algorithm.
- Source: https://docs.cloud.google.com/assured-open-source-software/docs/package-signature-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [verify-packages.md](./verify-packages.md)
- [access-metadata-using-container-analysis.md](./access-metadata-using-container-analysis.md)
- [assured-oss-overview.md](./assured-oss-overview.md)
