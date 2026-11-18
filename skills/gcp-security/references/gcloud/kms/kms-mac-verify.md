---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/mac-verify
---

# gcloud kms mac-verify

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms mac-verify

```text
NAME
    gcloud kms mac-verify - verify a user signature file using a MAC key
        version

SYNOPSIS
    gcloud kms mac-verify --input-file=INPUT_FILE
        --signature-file=SIGNATURE_FILE [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--skip-integrity-verification]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Verifies a digital signature using the provided MAC signing key version.

    By default, the command performs integrity verification on data sent to and
    received from Cloud KMS. Use --skip-integrity-verification to disable
    integrity verification.

EXAMPLES
    The following command will read the file '/tmp/my/file.to.verify', and
    verify it using the symmetric MAC CryptoKey dont-panic Version 3 and the
    file used previously to generate the MAC tag
    ('/tmp/my/original.data.file').

        $ gcloud kms mac-verify --location=us-central1 \
            --keyring=hitchhiker --key=dont-panic --version=3 \
            --input-file=/tmp/my/original.data.file \
            --signature-file=/tmp/my/file.to.verify

REQUIRED FLAGS
     --input-file=INPUT_FILE
        Path to the input file to use for verification.

     --signature-file=SIGNATURE_FILE
        Path to the signature file to be verified.

OPTIONAL FLAGS
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

        $ gcloud alpha kms mac-verify

        $ gcloud beta kms mac-verify
```

### gcloud beta kms mac-verify

```text
NAME
    gcloud beta kms mac-verify - verify a user signature file using a MAC key
        version

SYNOPSIS
    gcloud beta kms mac-verify --input-file=INPUT_FILE
        --signature-file=SIGNATURE_FILE [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--skip-integrity-verification]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms mac-verify

```text
NAME
    gcloud alpha kms mac-verify - verify a user signature file using a MAC key
        version

SYNOPSIS
    gcloud alpha kms mac-verify --input-file=INPUT_FILE
        --signature-file=SIGNATURE_FILE [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--skip-integrity-verification]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/mac-verify (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
