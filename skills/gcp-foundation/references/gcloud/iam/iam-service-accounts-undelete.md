---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/undelete
---

# gcloud iam service-accounts undelete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam service-accounts undelete

```text
NAME
    gcloud iam service-accounts undelete - undelete a service account for a
        project

SYNOPSIS
    gcloud iam service-accounts undelete ACCOUNT_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Undelete a service account for a project.

    If the service account does not exist, this command returns a
    PERMISSION_DENIED error.

EXAMPLES
    The following command undeletes a service account with unique id
    103271949540120710052:

        $ gcloud iam service-accounts undelete 103271949540120710052

POSITIONAL ARGUMENTS
     ACCOUNT_ID
        The deleted service account's unique ID must be provided when using the
        undelete command. Unique IDs are a 21 digit number, such as
        103271949540120710052.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    These variants are also available:

        $ gcloud alpha iam service-accounts undelete

        $ gcloud beta iam service-accounts undelete
```

### gcloud beta iam service-accounts undelete

```text
NAME
    gcloud beta iam service-accounts undelete - undelete a service account for
        a project

SYNOPSIS
    gcloud beta iam service-accounts undelete ACCOUNT_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts undelete

```text
NAME
    gcloud alpha iam service-accounts undelete - undelete a service account for
        a project

SYNOPSIS
    gcloud alpha iam service-accounts undelete ACCOUNT_ID
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/undelete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
