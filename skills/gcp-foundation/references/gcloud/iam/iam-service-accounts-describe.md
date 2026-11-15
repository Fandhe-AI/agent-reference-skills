---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/describe
---

# gcloud iam service-accounts describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam service-accounts describe

```text
NAME
    gcloud iam service-accounts describe - show metadata for a service account
        from a project

SYNOPSIS
    gcloud iam service-accounts describe SERVICE_ACCOUNT [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command shows metadata for a service account.

    This call can fail for the following reasons:
      o The specified service account does not exist. In this case, you
        receive a PERMISSION_DENIED error.
      o The active user does not have permission to access the given service
        account.

EXAMPLES
    To print metadata for a service account from your project, run:

        $ gcloud iam service-accounts describe \
            my-iam-account@my-project.iam.gserviceaccount.com

POSITIONAL ARGUMENTS
     SERVICE_ACCOUNT
        The service account to describe. The account should be formatted either
        as a numeric service account ID or as an email, like this:
        123456789876543212345 or my-iam-account@somedomain.com.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam service-accounts describe

        $ gcloud beta iam service-accounts describe
```

### gcloud beta iam service-accounts describe

```text
NAME
    gcloud beta iam service-accounts describe - show metadata for a service
        account from a project

SYNOPSIS
    gcloud beta iam service-accounts describe SERVICE_ACCOUNT
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts describe

```text
NAME
    gcloud alpha iam service-accounts describe - show metadata for a service
        account from a project

SYNOPSIS
    gcloud alpha iam service-accounts describe SERVICE_ACCOUNT
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
