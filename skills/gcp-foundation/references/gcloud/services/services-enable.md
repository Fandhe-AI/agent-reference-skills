---
source: https://docs.cloud.google.com/sdk/gcloud/reference/services/enable
---

# gcloud services enable

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud services enable

```text
NAME
    gcloud services enable - enables a service for consumption for a project

SYNOPSIS
    gcloud services enable SERVICE [SERVICE ...] [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command enables a service for consumption for a project.

        To see a list of available services for a project, run:

        $ gcloud services list --available

    More information on listing services can be found at:
    https://cloud.google.com/service-usage/docs/list-services and on disabling
    a service at: https://cloud.google.com/service-usage/docs/enable-disable

EXAMPLES
    To enable a service called my-consumed-service on the current project, run:

        $ gcloud services enable my-consumed-service

    To run the same command asynchronously (non-blocking), run:

        $ gcloud services enable my-consumed-service --async

    To enable services called service1, service2, and service3 on the current
    project, run:

        $ gcloud services enable service1 service2 service3

POSITIONAL ARGUMENTS
     SERVICE [SERVICE ...]
        The name of the service(s) to enable.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services enable

        $ gcloud beta services enable
```

### gcloud beta services enable

```text
NAME
    gcloud beta services enable - enables a service for consumption for a
        project, folder or organization

SYNOPSIS
    gcloud beta services enable SERVICE [SERVICE ...] [--async]
        [--group=GROUP; default="dependencies"] [--skip-dependency]
        [--validate-only]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services enable

```text
NAME
    gcloud alpha services enable - enables a service for consumption for a
        project, folder or organization

SYNOPSIS
    gcloud alpha services enable SERVICE [SERVICE ...] [--async]
        [--group=GROUP; default="dependencies"] [--skip-dependency]
        [--validate-only]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/services/enable (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
