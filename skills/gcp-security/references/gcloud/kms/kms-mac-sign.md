---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/mac-sign
---

# gcloud kms mac-sign

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms mac-sign

```text
NAME
    gcloud kms mac-sign - sign a user input file using a MAC key version

SYNOPSIS
    gcloud kms mac-sign --input-file=INPUT_FILE --signature-file=SIGNATURE_FILE
        [--key=KEY] [--keyring=KEYRING] [--location=LOCATION]
        [--skip-integrity-verification] [--version=VERSION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a digital signature of the input file using the provided MAC
    signing key version and saves the base64 encoded signature.

    The required flag signature-file indicates the path to store signature.

    By default, the command performs integrity verification on data sent to and
    received from Cloud KMS. Use --skip-integrity-verification to disable
    integrity verification.

EXAMPLES
    The following command will read the file '/tmp/my/file.to.sign', and sign
    it using the symmetric MAC CryptoKey dont-panic Version 3, and save the
    signature in base64 format to '/tmp/my/signature'.

        $ gcloud kms mac-sign --location=us-central1 --keyring=hitchhiker \
            --key=dont-panic --version=3 --input-file=/tmp/my/file.to.sign \
            --signature-file=/tmp/my/signature

REQUIRED FLAGS
     --input-file=INPUT_FILE
        Path to the input file to sign.

     --signature-file=SIGNATURE_FILE
        Path to the signature file to output.

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

        $ gcloud alpha kms mac-sign

        $ gcloud beta kms mac-sign
```

### gcloud beta kms mac-sign

```text
NAME
    gcloud beta kms mac-sign - sign a user input file using a MAC key version

SYNOPSIS
    gcloud beta kms mac-sign --input-file=INPUT_FILE
        --signature-file=SIGNATURE_FILE [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--skip-integrity-verification]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms mac-sign

```text
NAME
    gcloud alpha kms mac-sign - sign a user input file using a MAC key version

SYNOPSIS
    gcloud alpha kms mac-sign --input-file=INPUT_FILE
        --signature-file=SIGNATURE_FILE [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--skip-integrity-verification]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/mac-sign (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
