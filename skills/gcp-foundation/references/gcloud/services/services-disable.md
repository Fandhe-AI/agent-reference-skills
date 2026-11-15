---
source: https://docs.cloud.google.com/sdk/gcloud/reference/services/disable
---

# gcloud services disable

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud services disable

```text
NAME
    gcloud services disable - disable a service for consumption for a project

SYNOPSIS
    gcloud services disable SERVICE [SERVICE ...] [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command disables one or more previously-enabled services for
    consumption.

    To see a list of the enabled services for a project, run:

        $ gcloud services list

    More information on listing services can be found at:
    https://cloud.google.com/service-usage/docs/list-services and on disabling
    a service at: https://cloud.google.com/service-usage/docs/enable-disable

EXAMPLES
    To disable a service called my-consumed-service for the active project,
    run:

        $ gcloud services disable my-consumed-service

    To run the same command asynchronously (non-blocking), run:

        $ gcloud services disable my-consumed-service --async

POSITIONAL ARGUMENTS
     SERVICE [SERVICE ...]
        The name of the service(s) to disable.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        If specified, the disable call will proceed even if there are enabled
        services which depend on the service to be disabled or disable the
        service used in last 30 days or was enabled in recent 3 days. Forcing
        the call means that the services which depend on the service to be
        disabled will also be disabled.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services disable

        $ gcloud beta services disable
```

### gcloud beta services disable

```text
NAME
    gcloud beta services disable - disable a service for consumption for a
        project, folder or organization

SYNOPSIS
    gcloud beta services disable SERVICE [SERVICE ...] [--async]
        [--bypass-api-usage-check] [--force] [--validate-only]
        [--bypass-dependency-service-check | --disable-dependency-services]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services disable

```text
NAME
    gcloud alpha services disable - disable a service for consumption for a
        project, folder or organization

SYNOPSIS
    gcloud alpha services disable SERVICE [SERVICE ...] [--async]
        [--bypass-api-usage-check] [--force] [--validate-only]
        [--bypass-dependency-service-check | --disable-dependency-services]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/services/disable (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
