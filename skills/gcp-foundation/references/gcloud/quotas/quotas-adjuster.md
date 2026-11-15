---
source: https://docs.cloud.google.com/sdk/gcloud/reference/quotas/adjuster
---

# gcloud quotas adjuster

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud quotas adjuster settings describe

```text
NAME
    gcloud quotas adjuster settings describe - gets details of the
        QuotaAdjusterSettings for a resource container

SYNOPSIS
    gcloud quotas adjuster settings describe
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command gets the QuotaAdjusterSettings for a resource container.

EXAMPLES
    To get the QuotaAdjusterSettings for 'projects/12321', run:

        $ gcloud quotas adjuster settings describe --project=12321

    To get the QuotaAdjusterSettings for 'folders/123', run:

        $ gcloud quotas adjuster settings describe --folder=123

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the container id.

       --organization=ORGANIZATION_ID
          Organization of the container id.

       --project=PROJECT_ID_OR_NUMBER
          Project of the container id.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta quotas adjuster settings describe
```

### gcloud quotas adjuster settings update

```text
NAME
    gcloud quotas adjuster settings update - update the QuotaAdjusterSettings
        of a resource container

SYNOPSIS
    gcloud quotas adjuster settings update --enablement=ENABLEMENT
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates the enablement state of a resource container.

EXAMPLES
    To update QuotaAdjusterSettings for projects/12321, run:

        $ gcloud quotas adjuster settings update --enablement=enabled \
            --project=12321

    To update QuotaAdjusterSettings for folders/123, run:

        $ gcloud quotas adjuster settings update --enablement=inherited \
            --folder=123

REQUIRED FLAGS
     --enablement=ENABLEMENT
        Enablement state of the QuotaAdjusterSettings. ENABLEMENT must be one
        of: enabled, disabled, inherited.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the container id.

       --organization=ORGANIZATION_ID
          Organization of the container id.

       --project=PROJECT_ID_OR_NUMBER
          Project of the container id.

OPTIONAL FLAGS
     --validate-only
        If specified, only validates the request, but does not actually update.
        Note that a request being valid does not mean that the request is
        guaranteed to be fulfilled. Default is false.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta quotas adjuster settings update
```

### gcloud beta quotas adjuster settings describe

```text
NAME
    gcloud beta quotas adjuster settings describe - gets details of the
        QuotaAdjusterSettings for a resource container

SYNOPSIS
    gcloud beta quotas adjuster settings describe
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta quotas adjuster settings update

```text
NAME
    gcloud beta quotas adjuster settings update - update the
        QuotaAdjusterSettings of a resource container

SYNOPSIS
    gcloud beta quotas adjuster settings update --enablement=ENABLEMENT
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/quotas/adjuster (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
