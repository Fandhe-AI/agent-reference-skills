---
source: https://docs.cloud.google.com/sdk/gcloud/reference/publicca/external-account-keys
---

# gcloud publicca external-account-keys

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud publicca external-account-keys create

```text
NAME
    gcloud publicca external-account-keys create - create a new external
        account key

SYNOPSIS
    gcloud publicca external-account-keys create
        [--key-output-file=KEY_OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create an external account key:

        $ gcloud publicca external-account-keys create

    To create an external account key and save it to a file:

        $ gcloud publicca external-account-keys create \
          --key-output-file=./external_account_key.txt

FLAGS
     --key-output-file=KEY_OUTPUT_FILE
        The path where the generated external account key is written.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha publicca external-account-keys create

        $ gcloud beta publicca external-account-keys create
```

### gcloud beta publicca external-account-keys create

```text
NAME
    gcloud beta publicca external-account-keys create - create a new external
        account key

SYNOPSIS
    gcloud beta publicca external-account-keys create
        [--key-output-file=KEY_OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha publicca external-account-keys create

```text
NAME
    gcloud alpha publicca external-account-keys create - create a new external
        account key

SYNOPSIS
    gcloud alpha publicca external-account-keys create
        [--key-output-file=KEY_OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/publicca/external-account-keys (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
