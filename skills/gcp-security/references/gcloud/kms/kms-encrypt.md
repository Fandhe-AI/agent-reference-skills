---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/encrypt
---

# gcloud kms encrypt

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms encrypt

```text
NAME
    gcloud kms encrypt - encrypt a plaintext file using a key

SYNOPSIS
    gcloud kms encrypt --ciphertext-file=CIPHERTEXT_FILE
        --plaintext-file=PLAINTEXT_FILE
        [--additional-authenticated-data-file=ADDITIONAL_AUTHENTICATED_DATA_FILE]
        [--key=KEY] [--keyring=KEYRING] [--location=LOCATION]
        [--skip-integrity-verification] [--version=VERSION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Encrypts the given plaintext file using the given CryptoKey and writes the
    result to the named ciphertext file. The plaintext file must not be larger
    than 64KiB.

    If an additional authenticated data file is provided, its contents must
    also be provided during decryption. The file must not be larger than 64KiB.

    The flag --version indicates the version of the key to use for encryption.
    By default, the primary version is used.

    If --plaintext-file or --additional-authenticated-data-file is set to '-',
    that file is read from stdin. Similarly, if --ciphertext-file is set to
    '-', the ciphertext is written to stdout.

    By default, the command performs integrity verification on data sent to and
    received from Cloud KMS. Use --skip-integrity-verification to disable
    integrity verification.

EXAMPLES
    The following command will read the file 'path/to/plaintext', encrypt it
    using the CryptoKey frodo with the KeyRing fellowship and Location global,
    and write the ciphertext to 'path/to/ciphertext'.

        $ gcloud kms encrypt --key=frodo --keyring=fellowship \
            --location=global --plaintext-file=path/to/input/plaintext \
            --ciphertext-file=path/to/output/ciphertext

REQUIRED FLAGS
     --ciphertext-file=CIPHERTEXT_FILE
        File path of the ciphertext file to output.

     --plaintext-file=PLAINTEXT_FILE
        File path of the plaintext file to encrypt.

OPTIONAL FLAGS
     --additional-authenticated-data-file=ADDITIONAL_AUTHENTICATED_DATA_FILE
        File path to the optional file containing the additional authenticated
        data.

     --key=KEY
        The key to use for encryption.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

     --skip-integrity-verification
        Skip integrity verification on request and response API fields.

     --version=VERSION
        Version to use for encryption.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms encrypt

        $ gcloud beta kms encrypt
```

### gcloud beta kms encrypt

```text
NAME
    gcloud beta kms encrypt - encrypt a plaintext file using a key

SYNOPSIS
    gcloud beta kms encrypt --ciphertext-file=CIPHERTEXT_FILE
        --plaintext-file=PLAINTEXT_FILE
        [--additional-authenticated-data-file=ADDITIONAL_AUTHENTICATED_DATA_FILE]
        [--key=KEY] [--keyring=KEYRING] [--location=LOCATION]
        [--skip-integrity-verification] [--version=VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms encrypt

```text
NAME
    gcloud alpha kms encrypt - encrypt a plaintext file using a key

SYNOPSIS
    gcloud alpha kms encrypt --ciphertext-file=CIPHERTEXT_FILE
        --plaintext-file=PLAINTEXT_FILE
        [--additional-authenticated-data-file=ADDITIONAL_AUTHENTICATED_DATA_FILE]
        [--key=KEY] [--keyring=KEYRING] [--location=LOCATION]
        [--skip-integrity-verification] [--version=VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/encrypt (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
