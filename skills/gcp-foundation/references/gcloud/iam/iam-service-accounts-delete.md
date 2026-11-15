---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/delete
---

# gcloud iam service-accounts delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam service-accounts delete

```text
NAME
    gcloud iam service-accounts delete - delete a service account from a
        project

SYNOPSIS
    gcloud iam service-accounts delete SERVICE_ACCOUNT [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    If the service account does not exist, this command returns a
    PERMISSION_DENIED error.

EXAMPLES
    To delete an service account from your project, run:

        $ gcloud iam service-accounts delete \
            my-iam-account@my-project.iam.gserviceaccount.com

POSITIONAL ARGUMENTS
     SERVICE_ACCOUNT
        The service account to delete. The account should be formatted either
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

        $ gcloud alpha iam service-accounts delete

        $ gcloud beta iam service-accounts delete
```

### gcloud beta iam service-accounts delete

```text
NAME
    gcloud beta iam service-accounts delete - delete a service account from a
        project

SYNOPSIS
    gcloud beta iam service-accounts delete SERVICE_ACCOUNT
        [--recommend=BOOLEAN_VALUE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts delete

```text
NAME
    gcloud alpha iam service-accounts delete - delete a service account from a
        project

SYNOPSIS
    gcloud alpha iam service-accounts delete SERVICE_ACCOUNT
        [--recommend=BOOLEAN_VALUE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
