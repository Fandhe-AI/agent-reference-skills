---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/decapsulate
---

# gcloud kms decapsulate

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms decapsulate

```text
NAME
    gcloud kms decapsulate - decapsulate an input file using a
        key-encapsulation key version

SYNOPSIS
    gcloud kms decapsulate --ciphertext-file=CIPHERTEXT_FILE
        --shared-secret-file=SHARED_SECRET_FILE [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--skip-integrity-verification]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Decapsulates the given ciphertext file using the provided key-encapsulation
    key version and saves the decapsulated shared secret to the shared secret
    file.

    By default, the command performs integrity verification on data sent to and
    received from Cloud KMS. Use --skip-integrity-verification to disable
    integrity verification.

EXAMPLES
    The following command will read the file '/tmp/my/secret.file.enc',
    decapsulate it using the key encapsulation CryptoKey my-key Version 3 and
    write the shared secret to '/tmp/my/secret.file.dec'.

        $ gcloud kms decapsulate --location=us-central1 \
            --keyring=my-keyring --key=my-key --version=3 \
            --ciphertext-file=/tmp/my/secret.file.enc \
            --shared-secret-file=/tmp/my/secret.file.dec

REQUIRED FLAGS
     --ciphertext-file=CIPHERTEXT_FILE
        File path of the ciphertext file to decapsulate.

     --shared-secret-file=SHARED_SECRET_FILE
        File path of the shared secret file to output.

OPTIONAL FLAGS
     --key=KEY
        to use for decapsulation.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

     --skip-integrity-verification
        Skip integrity verification on request and response API fields.

     --version=VERSION
        Version to use for decapsulation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms decapsulate

        $ gcloud beta kms decapsulate
```

### gcloud beta kms decapsulate

```text
NAME
    gcloud beta kms decapsulate - decapsulate an input file using a
        key-encapsulation key version

SYNOPSIS
    gcloud beta kms decapsulate --ciphertext-file=CIPHERTEXT_FILE
        --shared-secret-file=SHARED_SECRET_FILE [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--skip-integrity-verification]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms decapsulate

```text
NAME
    gcloud alpha kms decapsulate - decapsulate an input file using a
        key-encapsulation key version

SYNOPSIS
    gcloud alpha kms decapsulate --ciphertext-file=CIPHERTEXT_FILE
        --shared-secret-file=SHARED_SECRET_FILE [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--skip-integrity-verification]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/decapsulate (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
