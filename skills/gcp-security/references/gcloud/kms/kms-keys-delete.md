---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/delete
---

# gcloud kms keys delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms keys delete

```text
NAME
    gcloud kms keys delete - delete a key

SYNOPSIS
    gcloud kms keys delete KEY [--keyring=KEYRING] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The following command deletes key frodo within keyring fellowship and
    location us-east1:

        $ gcloud kms keys delete frodo --location=us-east1 \
            --keyring=fellowship

POSITIONAL ARGUMENTS
     KEY
        Name of the key to delete.

FLAGS
     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys delete

        $ gcloud beta kms keys delete
```

### gcloud beta kms keys delete

```text
NAME
    gcloud beta kms keys delete - delete a key

SYNOPSIS
    gcloud beta kms keys delete KEY [--keyring=KEYRING] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys delete

```text
NAME
    gcloud alpha kms keys delete - delete a key

SYNOPSIS
    gcloud alpha kms keys delete KEY [--keyring=KEYRING] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
