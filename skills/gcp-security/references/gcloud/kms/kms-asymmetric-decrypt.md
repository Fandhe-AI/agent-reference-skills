---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/asymmetric-decrypt
---

# gcloud kms asymmetric-decrypt

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms asymmetric-decrypt

```text
NAME
    gcloud kms asymmetric-decrypt - decrypt an input file using an
        asymmetric-encryption key version

SYNOPSIS
    gcloud kms asymmetric-decrypt --ciphertext-file=CIPHERTEXT_FILE
        --plaintext-file=PLAINTEXT_FILE [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--skip-integrity-verification]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Decrypts the given ciphertext file using the provided asymmetric-encryption
    key version and saves the decrypted data to the plaintext file.

    By default, the command performs integrity verification on data sent to and
    received from Cloud KMS. Use --skip-integrity-verification to disable
    integrity verification.

EXAMPLES
    The following command will read the file '/tmp/my/secret.file.enc', decrypt
    it using the asymmetric CryptoKey dont-panic Version 3 and write the
    plaintext to '/tmp/my/secret.file.dec'.

        $ gcloud kms asymmetric-decrypt --location=us-central1 \
            --keyring=hitchhiker --key=dont-panic --version=3 \
            --ciphertext-file=/tmp/my/secret.file.enc \
            --plaintext-file=/tmp/my/secret.file.dec

REQUIRED FLAGS
     --ciphertext-file=CIPHERTEXT_FILE
        File path of the ciphertext file to decrypt.

     --plaintext-file=PLAINTEXT_FILE
        File path of the plaintext file to output.

OPTIONAL FLAGS
     --key=KEY
        to use for asymmetric-decryption.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

     --skip-integrity-verification
        Skip integrity verification on request and response API fields.

     --version=VERSION
        Version to use for asymmetric-decryption.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms asymmetric-decrypt

        $ gcloud beta kms asymmetric-decrypt
```

### gcloud beta kms asymmetric-decrypt

```text
NAME
    gcloud beta kms asymmetric-decrypt - decrypt an input file using an
        asymmetric-encryption key version

SYNOPSIS
    gcloud beta kms asymmetric-decrypt --ciphertext-file=CIPHERTEXT_FILE
        --plaintext-file=PLAINTEXT_FILE [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--skip-integrity-verification]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms asymmetric-decrypt

```text
NAME
    gcloud alpha kms asymmetric-decrypt - decrypt an input file using an
        asymmetric-encryption key version

SYNOPSIS
    gcloud alpha kms asymmetric-decrypt --ciphertext-file=CIPHERTEXT_FILE
        --plaintext-file=PLAINTEXT_FILE [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--skip-integrity-verification]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/asymmetric-decrypt (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
