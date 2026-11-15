---
source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/authorize
---

# gcloud transfer authorize

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud transfer authorize

```text
NAME
    gcloud transfer authorize - authorize an account for all Storage Transfer
        Service features

SYNOPSIS
    gcloud transfer authorize [--add-missing] [--creds-file=CREDS_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Authorize a Google account for all Storage Transfer Service features.

    This command provides admin and owner rights for simplicity. If that's too
    much authority for your use case, see Agent-based transfer permissions
    (https://docs.cloud.google.com/storage-transfer/docs/file-system-permissions)
    or Agentless transfer permissions
    (https://docs.cloud.google.com/storage-transfer/docs/iam-cloud) for a
    fine-grained list of roles.

EXAMPLES
    To see what Transfer Service IAM roles the account logged into gcloud may
    be missing, run:

        $ gcloud transfer authorize

    To add the missing IAM roles, run:

        $ gcloud transfer authorize --add-missing

    To check a custom service account for missing roles, run:

        $ gcloud transfer authorize \
            --creds-file=path/to/service-account-key.json

FLAGS
     --add-missing
        Add IAM roles necessary to use all Transfer Service features to the
        specified account. By default, this command just prints missing roles.

     --creds-file=CREDS_FILE
        The path to the creds file for an account to authorize. The file should
        be in JSON format and contain a "type" and "client_email", which are
        automatically generated for most creds files downloaded from Google
        (e.g. service account tokens). If this flag is not present, the command
        authorizes the user currently logged into gcloud.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer authorize
```

### gcloud alpha transfer authorize

```text
NAME
    gcloud alpha transfer authorize - authorize an account for all Storage
        Transfer Service features

SYNOPSIS
    gcloud alpha transfer authorize [--add-missing] [--creds-file=CREDS_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/authorize (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
