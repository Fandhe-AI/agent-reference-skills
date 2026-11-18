---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/asymmetric-sign
---

# gcloud kms asymmetric-sign

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms asymmetric-sign

```text
NAME
    gcloud kms asymmetric-sign - sign a user input file using an
        asymmetric-signing key version

SYNOPSIS
    gcloud kms asymmetric-sign --input-file=INPUT_FILE
        --signature-file=SIGNATURE_FILE [--digest-algorithm=DIGEST_ALGORITHM]
        [--key=KEY] [--keyring=KEYRING] [--location=LOCATION]
        [--skip-integrity-verification] [--version=VERSION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a digital signature of the input file using the provided
    asymmetric-signing key version and saves the base64 encoded signature.

    The required flag signature-file indicates the path to store signature.

    By default, the command performs integrity verification on data sent to and
    received from Cloud KMS. Use --skip-integrity-verification to disable
    integrity verification.

    For the ML-DSA EXTERNAL-MU algorithms, the digest external-mu should be
    used that depends on the public key. This command will fetch the public key
    from KMS and compute the external-mu digest. Note that this requires signer
    permissions on the associated CryptoKeyVersion.

EXAMPLES
    The following command will read the file '/tmp/my/file.to.sign', digest it
    with the digest algorithm 'sha256' and sign it using the asymmetric
    CryptoKey dont-panic Version 3, and save the signature in base64 format to
    '/tmp/my/signature'.

        $ gcloud kms asymmetric-sign --location=us-central1 \
            --keyring=hitchhiker --key=dont-panic --version=3 \
            --digest-algorithm=sha256 --input-file=/tmp/my/file.to.sign \
            --signature-file=/tmp/my/signature

REQUIRED FLAGS
     --input-file=INPUT_FILE
        Path to the input file to sign.

     --signature-file=SIGNATURE_FILE
        Path to the signature file to output.

OPTIONAL FLAGS
     --digest-algorithm=DIGEST_ALGORITHM
        The algorithm to digest the input. DIGEST_ALGORITHM must be one of:
        external-mu, sha256, sha384, sha512.

     --key=KEY
        to use for signing.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

     --skip-integrity-verification
        Skip integrity verification on request and response API fields.

     --version=VERSION
        Version to use for signing.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms asymmetric-sign

        $ gcloud beta kms asymmetric-sign
```

### gcloud beta kms asymmetric-sign

```text
NAME
    gcloud beta kms asymmetric-sign - sign a user input file using an
        asymmetric-signing key version

SYNOPSIS
    gcloud beta kms asymmetric-sign --input-file=INPUT_FILE
        --signature-file=SIGNATURE_FILE [--digest-algorithm=DIGEST_ALGORITHM]
        [--key=KEY] [--keyring=KEYRING] [--location=LOCATION]
        [--skip-integrity-verification] [--version=VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms asymmetric-sign

```text
NAME
    gcloud alpha kms asymmetric-sign - sign a user input file using an
        asymmetric-signing key version

SYNOPSIS
    gcloud alpha kms asymmetric-sign --input-file=INPUT_FILE
        --signature-file=SIGNATURE_FILE [--digest-algorithm=DIGEST_ALGORITHM]
        [--key=KEY] [--keyring=KEYRING] [--location=LOCATION]
        [--skip-integrity-verification] [--version=VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/asymmetric-sign (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
