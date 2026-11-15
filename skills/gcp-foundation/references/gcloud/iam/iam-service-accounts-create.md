---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/create
---

# gcloud iam service-accounts create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam service-accounts create

```text
NAME
    gcloud iam service-accounts create - create a service account for a project

SYNOPSIS
    gcloud iam service-accounts create NAME [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a service account with the provided name. For
    subsequent commands regarding service accounts, this service account should
    be referred to by the email account in the response.

EXAMPLES
    To create a service account for your project, run:

        $ gcloud iam service-accounts create some-account-name \
            --display-name="My Service Account"

    To work with this service account in subsequent IAM commands, use the email
    resulting from this call as the IAM_ACCOUNT argument.

POSITIONAL ARGUMENTS
     NAME
        The internal name of the new service account. Used to generate an
        IAM_ACCOUNT (an IAM internal email address used as an identifier of
        service account), which must be passed to subsequent commands.

FLAGS
     --description=DESCRIPTION
        A textual description for the account.

     --display-name=DISPLAY_NAME
        A textual name to display for the account.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam service-accounts create

        $ gcloud beta iam service-accounts create
```

### gcloud beta iam service-accounts create

```text
NAME
    gcloud beta iam service-accounts create - create a service account for a
        project

SYNOPSIS
    gcloud beta iam service-accounts create NAME [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts create

```text
NAME
    gcloud alpha iam service-accounts create - create a service account for a
        project

SYNOPSIS
    gcloud alpha iam service-accounts create NAME [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
