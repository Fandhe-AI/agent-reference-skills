---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/enable
---

# gcloud iam service-accounts enable

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam service-accounts enable

```text
NAME
    gcloud iam service-accounts enable - enable an IAM service account

SYNOPSIS
    gcloud iam service-accounts enable SERVICE_ACCOUNT [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enable an IAM service account.

    If the service account does not exist, this command returns a
    PERMISSION_DENIED error.

EXAMPLES
    To enable a service account from your project, run:

        $ gcloud iam service-accounts enable \
            my-iam-account@my-project.iam.gserviceaccount.com

POSITIONAL ARGUMENTS
     ServiceAccount resource - The IAM service account to enable. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument service_account on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE_ACCOUNT
          ID of the serviceAccount or fully qualified identifier for the
          serviceAccount.

          To set the service_account attribute:
          + provide the argument service_account on the command line.

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

        $ gcloud alpha iam service-accounts enable

        $ gcloud beta iam service-accounts enable
```

### gcloud beta iam service-accounts enable

```text
NAME
    gcloud beta iam service-accounts enable - enable an IAM service account

SYNOPSIS
    gcloud beta iam service-accounts enable SERVICE_ACCOUNT
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts enable

```text
NAME
    gcloud alpha iam service-accounts enable - enable an IAM service account

SYNOPSIS
    gcloud alpha iam service-accounts enable SERVICE_ACCOUNT
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/enable (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
