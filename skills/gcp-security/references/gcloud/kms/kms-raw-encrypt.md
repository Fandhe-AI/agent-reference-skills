---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/raw-encrypt
---

# gcloud kms raw-encrypt

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms raw-encrypt

```text
NAME
    gcloud kms raw-encrypt - encrypt a plaintext file using a raw key

SYNOPSIS
    gcloud kms raw-encrypt --ciphertext-file=CIPHERTEXT_FILE
        --plaintext-file=PLAINTEXT_FILE --version=VERSION
        [--additional-authenticated-data-file=ADDITIONAL_AUTHENTICATED_DATA_FILE]
        [--initialization-vector-file=INITIALIZATION_VECTOR_FILE] [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION]
        [--skip-integrity-verification] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Encrypts the given plaintext file using the given CryptoKey containing a
    raw key and writes the result to the named ciphertext file. The plaintext
    file must not be larger than 64KiB. For the AES-CBC algorithms, no
    server-side padding is being done, so the plaintext must be a multiple of
    the block size.

    The supported algorithms are: AES-128-GCM, AES-256-GCM, AES-128-CBC,
    AES-256-CBC, AES-128-CTR, and AES-256-CTR.

    AES-GCM provides authentication which means that it accepts additional
    authenticated data (AAD). So, the flag --additional-authenticated-data-file
    is only valid with AES-128-GCM and AES-256-GCM algorithms.

    The initialization vector (flag --initialization-vector-file) is only
    supported for AES-CBC and AES-CTR algorithms, and must be 16B in length.

    Therefore, both additional authenticated data and initialization vector
    can't be provided during encryption. If an additional authenticated data
    file is provided, its contents must also be provided during decryption. The
    file must not be larger than 64KiB.

    The flag --version indicates the version of the key to use for encryption.

    If --plaintext-file or --additional-authenticated-data-file or
    --initialization-vector-file is set to '-', that file is read from stdin.
    Similarly, if --ciphertext-file is set to '-', the ciphertext is written to
    stdout.

    By default, the command performs integrity verification on data sent to and
    received from Cloud KMS. Use --skip-integrity-verification to disable
    integrity verification.

EXAMPLES
    The following command reads and encrypts the file path/to/input/plaintext.
    The file will be encrypted using the AES-GCM CryptoKey KEYNAME from the
    KeyRing KEYRING in the global location using the additional authenticated
    data file path/to/input/aad. The resulting ciphertext will be written to
    path/to/output/ciphertext.

        $ gcloud kms raw-encrypt --key=KEYNAME --keyring=KEYRING \
            --location=global --plaintext-file=path/to/input/plaintext \
            --additional-authenticated-data-file=path/to/input/aad \
            --ciphertext-file=path/to/output/ciphertext

    The following command reads and encrypts the file path/to/input/plaintext.
    The file will be encrypted using the AES-CBC CryptoKey KEYNAME from the
    KeyRing KEYRING in the global location using the initialization vector
    stored at path/to/input/aad. The resulting ciphertext will be written to
    path/to/output/ciphertext.

        $ gcloud kms raw-encrypt --key=KEYNAME --keyring=KEYRING \
            --location=global --plaintext-file=path/to/input/plaintext \
            --initialization-vector-file=path/to/input/iv \
            --ciphertext-file=path/to/output/ciphertext

REQUIRED FLAGS
     --ciphertext-file=CIPHERTEXT_FILE
        File path of the ciphertext file to output.

     --plaintext-file=PLAINTEXT_FILE
        File path of the plaintext file to encrypt.

     --version=VERSION
        Version to use for encryption.

OPTIONAL FLAGS
     --additional-authenticated-data-file=ADDITIONAL_AUTHENTICATED_DATA_FILE
        File path to the optional file containing the additional authenticated
        data.

     --initialization-vector-file=INITIALIZATION_VECTOR_FILE
        File path to the optional file containing the initialization vector for
        encryption.

     --key=KEY
        The key to use for encryption.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

     --skip-integrity-verification
        Skip integrity verification on request and response API fields.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms raw-encrypt

        $ gcloud beta kms raw-encrypt
```

### gcloud beta kms raw-encrypt

```text
NAME
    gcloud beta kms raw-encrypt - encrypt a plaintext file using a raw key

SYNOPSIS
    gcloud beta kms raw-encrypt --ciphertext-file=CIPHERTEXT_FILE
        --plaintext-file=PLAINTEXT_FILE --version=VERSION
        [--additional-authenticated-data-file=ADDITIONAL_AUTHENTICATED_DATA_FILE]
        [--initialization-vector-file=INITIALIZATION_VECTOR_FILE] [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION]
        [--skip-integrity-verification] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms raw-encrypt

```text
NAME
    gcloud alpha kms raw-encrypt - encrypt a plaintext file using a raw key

SYNOPSIS
    gcloud alpha kms raw-encrypt --ciphertext-file=CIPHERTEXT_FILE
        --plaintext-file=PLAINTEXT_FILE --version=VERSION
        [--additional-authenticated-data-file=ADDITIONAL_AUTHENTICATED_DATA_FILE]
        [--initialization-vector-file=INITIALIZATION_VECTOR_FILE] [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION]
        [--skip-integrity-verification] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the examples omit `--version`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --version: Must be specified."). Add the required flag (see FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/raw-encrypt (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
